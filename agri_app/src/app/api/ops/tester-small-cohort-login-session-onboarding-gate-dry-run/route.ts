import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  buildTesterSmallCohortLoginSessionOnboardingReport,
  type TesterSmallCohortLoginSessionOnboardingInput,
} from "@/lib/ops/testerSmallCohortLoginSessionOnboardingGate";

export const dynamic = "force-dynamic";

type SmallCohortLoginSessionOnboardingBody = Omit<
  TesterSmallCohortLoginSessionOnboardingInput,
  | "firstTesterDetected"
  | "firstTesterRoleCompatible"
  | "firstTesterHasPasswordHash"
  | "secondTesterDetected"
  | "secondTesterRoleValue"
  | "secondTesterRoleCompatible"
  | "secondTesterHasPasswordHash"
  | "candidateEmailCount"
  | "duplicateCandidateEmailDetected"
  | "candidateExistingUserCount"
  | "candidateRoleCompatibleCount"
  | "candidatePasswordHashCount"
  | "candidateActiveSessionCount"
> & {
  candidateEmails?: string[];
};

type RuntimeField = {
  name?: string;
};

type RuntimeModel = {
  fields?: RuntimeField[];
};

type RuntimeDataModel = {
  models?: Record<string, RuntimeModel>;
};

type CandidateProbe = {
  redactedEmail: string;
  existingUserDetected: boolean;
  role: string | null;
  roleCompatible: boolean;
  hasPasswordHash: boolean;
  activeSessionCount: number;
};

const prisma = new PrismaClient();

function readBearerToken(request: NextRequest): string {
  const authorization = request.headers.get("authorization") ?? "";
  if (!authorization.startsWith("Bearer ")) return "";
  return authorization.slice("Bearer ".length).trim();
}

function isAllowed(request: NextRequest): boolean {
  const expectedValue = process.env.CRON_SECRET;
  const receivedValue = readBearerToken(request);
  return Boolean(expectedValue && receivedValue === expectedValue);
}

function getFieldNames(modelName: string): Set<string> {
  const runtime = prisma as unknown as { _runtimeDataModel?: RuntimeDataModel };
  const fields = runtime._runtimeDataModel?.models?.[modelName]?.fields ?? [];
  return new Set(fields.map((field) => field.name).filter(Boolean) as string[]);
}

function modelExists(modelName: string): boolean {
  const runtime = prisma as unknown as { _runtimeDataModel?: RuntimeDataModel };
  return Boolean(runtime._runtimeDataModel?.models?.[modelName]);
}

function isValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function redactedEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "[invalid-email]";
  return `${localPart.slice(0, 2)}***@${domain}`;
}

function isRoleCompatible(roleValue: string): boolean {
  return roleValue === "OPERATOR" || roleValue === "SUPER_ADMIN";
}

function normalizeCandidateEmails(input: unknown): string[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => String(item ?? "").trim().toLowerCase())
    .filter((email) => isValidEmail(email))
    .slice(0, 5);
}

function hasDuplicate(values: string[]): boolean {
  return new Set(values).size !== values.length;
}

function selectUserFields(fields: Set<string>): Record<string, boolean> {
  const select: Record<string, boolean> = {};

  for (const field of [
    "id",
    "email",
    "name",
    "emailVerified",
    "passwordHash",
    "role",
    "userRole",
    "roles",
  ]) {
    if (fields.has(field)) select[field] = true;
  }

  return select;
}

async function findUserByEmail(
  email: string,
  fields: Set<string>,
): Promise<Record<string, unknown> | null> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!isValidEmail(normalizedEmail) || !modelExists("User") || !fields.has("email")) {
    return null;
  }

  const userDelegate = (prisma as unknown as {
    user?: {
      findUnique?: (args: {
        where: { email: string };
        select: Record<string, boolean>;
      }) => Promise<Record<string, unknown> | null>;
    };
  }).user;

  if (!userDelegate?.findUnique) {
    return null;
  }

  return userDelegate.findUnique({
    where: { email: normalizedEmail },
    select: selectUserFields(fields),
  });
}

async function safeCount(delegate: unknown, where: Record<string, unknown>): Promise<number> {
  const counter = delegate as {
    count?: (args: { where: Record<string, unknown> }) => Promise<number>;
  };

  if (!counter.count) return 0;

  try {
    return await counter.count({ where });
  } catch {
    return 0;
  }
}

function roleValueForUser(user: Record<string, unknown> | null): string {
  return String(user?.role ?? user?.userRole ?? "").trim();
}

function serializeUser(user: Record<string, unknown> | null, roleValueFallback = "") {
  if (!user) return null;

  const roleValue = String(user.role ?? user.userRole ?? roleValueFallback ?? "").trim();

  return {
    id: user.id ?? null,
    email: user.email ? redactedEmail(String(user.email)) : "",
    name: user.name ?? null,
    role: roleValue || null,
    emailVerified: Boolean(user.emailVerified),
    hasPasswordHash: Boolean(user.passwordHash),
  };
}

async function buildCandidateProbe(
  email: string,
  user: Record<string, unknown> | null,
  sessionFields: Set<string>,
): Promise<CandidateProbe> {
  const roleValue = roleValueForUser(user);
  const userId = typeof user?.id === "string" ? user.id : "";
  const sessionDelegate = (prisma as unknown as { session?: unknown }).session;
  const activeSessionCount =
    userId && modelExists("Session") && sessionFields.has("userId")
      ? await safeCount(sessionDelegate, { userId })
      : 0;

  return {
    redactedEmail: redactedEmail(email),
    existingUserDetected: Boolean(user),
    role: roleValue || null,
    roleCompatible: user ? isRoleCompatible(roleValue) : false,
    hasPasswordHash: Boolean(user?.passwordHash),
    activeSessionCount,
  };
}

async function buildSmallCohortLoginSessionOnboardingReport(
  body: SmallCohortLoginSessionOnboardingBody,
) {
  const firstTesterEmail = (body.firstTesterEmail ?? "").trim().toLowerCase();
  const secondTesterEmail = (body.secondTesterEmail ?? "").trim().toLowerCase();
  const targetCohortSize = body.targetCohortSize ?? 3;
  const candidateEmails = normalizeCandidateEmails(body.candidateEmails);

  const userFields = getFieldNames("User");
  const sessionFields = getFieldNames("Session");

  const firstTester = await findUserByEmail(firstTesterEmail, userFields);
  const secondTester = await findUserByEmail(secondTesterEmail, userFields);
  const candidateUsers = await Promise.all(
    candidateEmails.map((email) => findUserByEmail(email, userFields)),
  );

  const candidateProbes = await Promise.all(
    candidateEmails.map((email, index) => buildCandidateProbe(email, candidateUsers[index], sessionFields)),
  );

  const firstTesterRoleValue = roleValueForUser(firstTester);
  const secondTesterRoleValue = roleValueForUser(secondTester);

  const input: TesterSmallCohortLoginSessionOnboardingInput = {
    ...body,
    firstTesterEmail,
    secondTesterEmail,
    targetCohortSize,
    candidateEmails,
    firstTesterDetected: Boolean(firstTester),
    firstTesterRoleCompatible: firstTester ? isRoleCompatible(firstTesterRoleValue) : false,
    firstTesterHasPasswordHash: Boolean(firstTester?.passwordHash),
    secondTesterDetected: Boolean(secondTester),
    secondTesterRoleValue,
    secondTesterRoleCompatible: secondTester ? isRoleCompatible(secondTesterRoleValue) : false,
    secondTesterHasPasswordHash: Boolean(secondTester?.passwordHash),
    candidateEmailCount: candidateEmails.length,
    duplicateCandidateEmailDetected: hasDuplicate(candidateEmails),
    candidateExistingUserCount: candidateUsers.filter(Boolean).length,
    candidateRoleCompatibleCount: candidateProbes.filter((probe) => probe.roleCompatible).length,
    candidatePasswordHashCount: candidateProbes.filter((probe) => probe.hasPasswordHash).length,
    candidateActiveSessionCount: candidateProbes.reduce((sum, probe) => sum + probe.activeSessionCount, 0),
  };

  const report = buildTesterSmallCohortLoginSessionOnboardingReport(input);

  return {
    firstTester,
    secondTester,
    firstTesterRoleValue,
    secondTesterRoleValue,
    candidateProbes,
    report,
  };
}

function candidateEmailsFromParam(value: string | null): string[] {
  if (!value) return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export async function GET(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-small-cohort-login-session-onboarding-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const result = await buildSmallCohortLoginSessionOnboardingReport({
    firstTesterEmail: request.nextUrl.searchParams.get("firstTesterEmail") ?? "",
    secondTesterEmail: request.nextUrl.searchParams.get("secondTesterEmail") ?? "",
    candidateEmails: candidateEmailsFromParam(request.nextUrl.searchParams.get("candidateEmails")),
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-small-cohort-login-session-onboarding-gate-dry-run",
    mode: "dry-run",
    writePerformed: false,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    secondTester: serializeUser(result.secondTester, result.secondTesterRoleValue),
    candidateProbes: result.candidateProbes,
    report: result.report,
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-small-cohort-login-session-onboarding-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as SmallCohortLoginSessionOnboardingBody;
  const result = await buildSmallCohortLoginSessionOnboardingReport(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-small-cohort-login-session-onboarding-gate-dry-run",
    mode: "dry-run",
    writePerformed: false,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    secondTester: serializeUser(result.secondTester, result.secondTesterRoleValue),
    candidateProbes: result.candidateProbes,
    report: result.report,
  });
}
