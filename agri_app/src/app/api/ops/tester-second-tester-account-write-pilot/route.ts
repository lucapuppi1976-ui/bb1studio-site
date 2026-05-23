import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  SECOND_TESTER_ACCOUNT_WRITE_CONFIRM,
  buildTesterSecondTesterAccountWritePilotReport,
  type TesterSecondTesterAccountWritePilotInput,
} from "@/lib/ops/testerSecondTesterAccountWritePilot";

export const dynamic = "force-dynamic";

type SecondTesterAccountWritePilotBody = {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  secondTesterName?: string;
  secondTesterRole?: string;
  secondTesterLanguage?: string;
  dryRun?: boolean;
  acceptLimitations?: boolean;
  confirm?: string;
  previousAccessGateCleared?: boolean;
  noPublicSignupConfirmed?: boolean;
  noPasswordWriteConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
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

type UserDelegate = {
  findUnique?: (args: {
    where: { email: string };
    select: Record<string, boolean>;
  }) => Promise<Record<string, unknown> | null>;
  create?: (args: {
    data: Record<string, unknown>;
    select: Record<string, boolean>;
  }) => Promise<Record<string, unknown> | null>;
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

function userDelegate(): UserDelegate | undefined {
  return (prisma as unknown as { user?: UserDelegate }).user;
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

  for (const field of ["id", "email", "name", "emailVerified", "passwordHash", "role", "userRole", "roles"]) {
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

  const delegate = userDelegate();

  if (!delegate?.findUnique) {
    return null;
  }

  return delegate.findUnique({
    where: { email: normalizedEmail },
    select: selectUserFields(fields),
  });
}

function buildCreateData(
  email: string,
  name: string,
  fields: Set<string>,
): Record<string, unknown> {
  const data: Record<string, unknown> = {
    email,
  };

  if (fields.has("name")) {
    data.name = name || null;
  }

  if (fields.has("role")) {
    data.role = "OPERATOR";
  } else if (fields.has("userRole")) {
    data.userRole = "OPERATOR";
  }

  return data;
}

async function buildSecondTesterWritePilot(body: SecondTesterAccountWritePilotBody) {
  const firstTesterEmail = (body.firstTesterEmail ?? "").trim().toLowerCase();
  const secondTesterEmail = (body.secondTesterEmail ?? "").trim().toLowerCase();
  const secondTesterName = (body.secondTesterName ?? "").trim();
  const secondTesterRole = (body.secondTesterRole ?? "OPERATOR").trim();
  const secondTesterLanguage = (body.secondTesterLanguage ?? "it").trim();

  const userFields = getFieldNames("User");
  const firstTester = await findUserByEmail(firstTesterEmail, userFields);
  const existingSecondTester = await findUserByEmail(secondTesterEmail, userFields);

  const firstTesterRoleValue = String(firstTester?.role ?? firstTester?.userRole ?? "").trim();

  const serverWriteEnabled =
    process.env.AGRI_SECOND_TESTER_ACCOUNT_WRITE_ENABLED === "true";
  const serverConfirmConfigured =
    process.env.AGRI_SECOND_TESTER_ACCOUNT_WRITE_CONFIRM ===
    SECOND_TESTER_ACCOUNT_WRITE_CONFIRM;

  const dryRun = body.dryRun ?? true;

  const input: TesterSecondTesterAccountWritePilotInput = {
    firstTesterEmail,
    secondTesterEmail,
    secondTesterName,
    secondTesterRole,
    secondTesterLanguage,
    dryRun,
    acceptLimitations: body.acceptLimitations ?? false,
    confirm: body.confirm ?? "",
    previousAccessGateCleared: body.previousAccessGateCleared ?? false,
    firstTesterDetected: Boolean(firstTester),
    firstTesterRoleCompatible: firstTester ? isRoleCompatible(firstTesterRoleValue) : false,
    firstTesterHasPasswordHash: Boolean(firstTester?.passwordHash),
    secondTesterExistingUserDetected: Boolean(existingSecondTester),
    schemaHasRoleField: userFields.has("role") || userFields.has("userRole") || userFields.has("roles"),
    schemaHasLanguageField:
      userFields.has("language") ||
      userFields.has("locale") ||
      userFields.has("preferredLanguage"),
    serverWriteEnabled,
    serverConfirmConfigured,
    noPublicSignupConfirmed: body.noPublicSignupConfirmed ?? false,
    noPasswordWriteConfirmed: body.noPasswordWriteConfirmed ?? false,
    noInviteEmailConfirmed: body.noInviteEmailConfirmed ?? false,
    noSchemaMigrationConfirmed: body.noSchemaMigrationConfirmed ?? false,
    noAiProviderCallConfirmed: body.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: body.noExecutionConfirmed ?? false,
  };

  const report = buildTesterSecondTesterAccountWritePilotReport(input);

  let createdUser: Record<string, unknown> | null = null;
  let writePerformed = false;

  if (report.decision === "WRITE_CANDIDATE") {
    const delegate = userDelegate();

    if (!delegate?.create) {
      return {
        report: buildTesterSecondTesterAccountWritePilotReport({
          ...input,
          serverWriteEnabled: false,
        }),
        firstTester,
        existingSecondTester,
        createdUser,
        writePerformed,
        writeError: "User delegate create not available.",
        firstTesterRoleValue,
      };
    }

    createdUser = await delegate.create({
      data: buildCreateData(secondTesterEmail, secondTesterName, userFields),
      select: selectUserFields(userFields),
    });

    writePerformed = Boolean(createdUser);
  }

  return {
    report,
    firstTester,
    existingSecondTester,
    createdUser,
    writePerformed,
    writeError: "",
    firstTesterRoleValue,
  };
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

export async function GET(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-second-tester-account-write-pilot",
      },
      { status: 403 },
    );
  }

  const result = await buildSecondTesterWritePilot({
    firstTesterEmail: request.nextUrl.searchParams.get("firstTesterEmail") ?? "",
    secondTesterEmail: request.nextUrl.searchParams.get("secondTesterEmail") ?? "",
    secondTesterName: request.nextUrl.searchParams.get("secondTesterName") ?? "",
    secondTesterRole: request.nextUrl.searchParams.get("secondTesterRole") ?? "OPERATOR",
    secondTesterLanguage: request.nextUrl.searchParams.get("secondTesterLanguage") ?? "it",
    dryRun: true,
    acceptLimitations: true,
    previousAccessGateCleared: false,
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-second-tester-account-write-pilot",
    mode: "dry-run",
    writePerformed: false,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    existingSecondTester: serializeUser(result.existingSecondTester),
    createdUser: null,
    writeError: result.writeError,
    report: result.report,
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-second-tester-account-write-pilot",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as SecondTesterAccountWritePilotBody;
  const result = await buildSecondTesterWritePilot(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-second-tester-account-write-pilot",
    mode: body.dryRun === false ? "protected-second-tester-account-write-pilot" : "dry-run",
    writePerformed: result.writePerformed,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    existingSecondTester: serializeUser(result.existingSecondTester),
    createdUser: serializeUser(result.createdUser),
    writeError: result.writeError,
    report: result.report,
  });
}
