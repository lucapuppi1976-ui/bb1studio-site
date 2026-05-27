import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  buildTesterControlledSmallCohortExpansionPlanningReport,
  type TesterControlledSmallCohortExpansionPlanningInput,
} from "@/lib/ops/testerControlledSmallCohortExpansionPlanningGate";

export const dynamic = "force-dynamic";

type ControlledSmallCohortExpansionPlanningBody = Omit<
  TesterControlledSmallCohortExpansionPlanningInput,
  | "firstTesterDetected"
  | "firstTesterRoleCompatible"
  | "firstTesterHasPasswordHash"
  | "firstTesterOauthAccountCount"
  | "firstTesterActiveSessionCount"
  | "secondTesterDetected"
  | "secondTesterRoleValue"
  | "secondTesterRoleCompatible"
  | "secondTesterHasPasswordHash"
  | "secondTesterOauthAccountCount"
  | "secondTesterActiveSessionCount"
>;

type RuntimeField = {
  name?: string;
};

type RuntimeModel = {
  fields?: RuntimeField[];
};

type RuntimeDataModel = {
  models?: Record<string, RuntimeModel>;
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

async function buildPlanningReport(body: ControlledSmallCohortExpansionPlanningBody) {
  const firstTesterEmail = (body.firstTesterEmail ?? "").trim().toLowerCase();
  const secondTesterEmail = (body.secondTesterEmail ?? "").trim().toLowerCase();

  const userFields = getFieldNames("User");
  const accountFields = getFieldNames("Account");
  const sessionFields = getFieldNames("Session");

  const firstTester = await findUserByEmail(firstTesterEmail, userFields);
  const secondTester = await findUserByEmail(secondTesterEmail, userFields);

  const firstTesterRoleValue = String(firstTester?.role ?? firstTester?.userRole ?? "").trim();
  const secondTesterRoleValue = String(secondTester?.role ?? secondTester?.userRole ?? "").trim();

  const firstTesterId = typeof firstTester?.id === "string" ? firstTester.id : "";
  const secondTesterId = typeof secondTester?.id === "string" ? secondTester.id : "";

  const accountDelegate = (prisma as unknown as { account?: unknown }).account;
  const sessionDelegate = (prisma as unknown as { session?: unknown }).session;

  const firstTesterOauthAccountCount =
    firstTesterId && modelExists("Account") && accountFields.has("userId")
      ? await safeCount(accountDelegate, { userId: firstTesterId })
      : 0;

  const firstTesterActiveSessionCount =
    firstTesterId && modelExists("Session") && sessionFields.has("userId")
      ? await safeCount(sessionDelegate, { userId: firstTesterId })
      : 0;

  const secondTesterOauthAccountCount =
    secondTesterId && modelExists("Account") && accountFields.has("userId")
      ? await safeCount(accountDelegate, { userId: secondTesterId })
      : 0;

  const secondTesterActiveSessionCount =
    secondTesterId && modelExists("Session") && sessionFields.has("userId")
      ? await safeCount(sessionDelegate, { userId: secondTesterId })
      : 0;

  const input: TesterControlledSmallCohortExpansionPlanningInput = {
    ...body,
    firstTesterEmail,
    secondTesterEmail,
    firstTesterDetected: Boolean(firstTester),
    firstTesterRoleCompatible: firstTester ? isRoleCompatible(firstTesterRoleValue) : false,
    firstTesterHasPasswordHash: Boolean(firstTester?.passwordHash),
    firstTesterOauthAccountCount,
    firstTesterActiveSessionCount,
    secondTesterDetected: Boolean(secondTester),
    secondTesterRoleValue,
    secondTesterRoleCompatible: secondTester ? isRoleCompatible(secondTesterRoleValue) : false,
    secondTesterHasPasswordHash: Boolean(secondTester?.passwordHash),
    secondTesterOauthAccountCount,
    secondTesterActiveSessionCount,
  };

  const report = buildTesterControlledSmallCohortExpansionPlanningReport(input);

  return {
    firstTester,
    secondTester,
    firstTesterRoleValue,
    secondTesterRoleValue,
    report,
  };
}

export async function GET(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-controlled-small-cohort-expansion-planning-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const result = await buildPlanningReport({
    firstTesterEmail: request.nextUrl.searchParams.get("firstTesterEmail") ?? "",
    secondTesterEmail: request.nextUrl.searchParams.get("secondTesterEmail") ?? "",
    firstTesterName: request.nextUrl.searchParams.get("firstTesterName") ?? "",
    secondTesterName: request.nextUrl.searchParams.get("secondTesterName") ?? "",
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-controlled-small-cohort-expansion-planning-gate-dry-run",
    mode: "dry-run",
    writePerformed: false,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    secondTester: serializeUser(result.secondTester, result.secondTesterRoleValue),
    report: result.report,
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-controlled-small-cohort-expansion-planning-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as ControlledSmallCohortExpansionPlanningBody;
  const result = await buildPlanningReport(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-controlled-small-cohort-expansion-planning-gate-dry-run",
    mode: "dry-run",
    writePerformed: false,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    secondTester: serializeUser(result.secondTester, result.secondTesterRoleValue),
    report: result.report,
  });
}
