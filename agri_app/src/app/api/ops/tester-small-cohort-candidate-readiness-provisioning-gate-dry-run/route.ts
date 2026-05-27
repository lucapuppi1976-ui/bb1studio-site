import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  buildTesterSmallCohortCandidateReadinessProvisioningReport,
  type TesterSmallCohortCandidateReadinessProvisioningInput,
} from "@/lib/ops/testerSmallCohortCandidateReadinessProvisioningGate";

export const dynamic = "force-dynamic";

type SmallCohortCandidateReadinessBody = Omit<
  TesterSmallCohortCandidateReadinessProvisioningInput,
  | "firstTesterDetected"
  | "firstTesterRoleCompatible"
  | "firstTesterHasPasswordHash"
  | "secondTesterDetected"
  | "secondTesterRoleValue"
  | "secondTesterRoleCompatible"
  | "secondTesterHasPasswordHash"
  | "candidateExistingUserCount"
  | "duplicateCandidateEmailDetected"
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
  hasPasswordHash: boolean;
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

async function buildCandidateReadinessReport(body: SmallCohortCandidateReadinessBody) {
  const firstTesterEmail = (body.firstTesterEmail ?? "").trim().toLowerCase();
  const secondTesterEmail = (body.secondTesterEmail ?? "").trim().toLowerCase();
  const candidateEmails = normalizeCandidateEmails(body.candidateEmails);

  const userFields = getFieldNames("User");

  const firstTester = await findUserByEmail(firstTesterEmail, userFields);
  const secondTester = await findUserByEmail(secondTesterEmail, userFields);

  const firstTesterRoleValue = String(firstTester?.role ?? firstTester?.userRole ?? "").trim();
  const secondTesterRoleValue = String(secondTester?.role ?? secondTester?.userRole ?? "").trim();

  const candidateUsers = await Promise.all(
    candidateEmails.map((email) => findUserByEmail(email, userFields)),
  );

  const candidateProbes: CandidateProbe[] = candidateEmails.map((email, index) => {
    const user = candidateUsers[index];
    const roleValue = String(user?.role ?? user?.userRole ?? "").trim();

    return {
      redactedEmail: redactedEmail(email),
      existingUserDetected: Boolean(user),
      role: roleValue || null,
      hasPasswordHash: Boolean(user?.passwordHash),
    };
  });

  const input: TesterSmallCohortCandidateReadinessProvisioningInput = {
    ...body,
    firstTesterEmail,
    secondTesterEmail,
    firstTesterDetected: Boolean(firstTester),
    firstTesterRoleCompatible: firstTester ? isRoleCompatible(firstTesterRoleValue) : false,
    firstTesterHasPasswordHash: Boolean(firstTester?.passwordHash),
    secondTesterDetected: Boolean(secondTester),
    secondTesterRoleValue,
    secondTesterRoleCompatible: secondTester ? isRoleCompatible(secondTesterRoleValue) : false,
    secondTesterHasPasswordHash: Boolean(secondTester?.passwordHash),
    candidateEmailCount: candidateEmails.length || body.candidateEmailCount || 0,
    candidateExistingUserCount: candidateUsers.filter(Boolean).length,
    duplicateCandidateEmailDetected: hasDuplicate(candidateEmails),
  };

  const report = buildTesterSmallCohortCandidateReadinessProvisioningReport(input);

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
        endpoint: "/api/ops/tester-small-cohort-candidate-readiness-provisioning-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const result = await buildCandidateReadinessReport({
    firstTesterEmail: request.nextUrl.searchParams.get("firstTesterEmail") ?? "",
    secondTesterEmail: request.nextUrl.searchParams.get("secondTesterEmail") ?? "",
    candidateEmails: candidateEmailsFromParam(request.nextUrl.searchParams.get("candidateEmails")),
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-small-cohort-candidate-readiness-provisioning-gate-dry-run",
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
        endpoint: "/api/ops/tester-small-cohort-candidate-readiness-provisioning-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as SmallCohortCandidateReadinessBody;
  const result = await buildCandidateReadinessReport(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-small-cohort-candidate-readiness-provisioning-gate-dry-run",
    mode: "dry-run",
    writePerformed: false,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    secondTester: serializeUser(result.secondTester, result.secondTesterRoleValue),
    candidateProbes: result.candidateProbes,
    report: result.report,
  });
}
