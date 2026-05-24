import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  SECOND_TESTER_PASSWORD_SETUP_CONFIRM,
  buildTesterSecondTesterPasswordSetupPilotReport,
  type TesterSecondTesterPasswordSetupPilotInput,
} from "@/lib/ops/testerSecondTesterPasswordSetupPilot";

export const dynamic = "force-dynamic";

type SecondTesterPasswordSetupBody = {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  temporaryPassword?: string;
  dryRun?: boolean;
  confirm?: string;
  previousAccountWriteCleared?: boolean;
  passwordWriteOnlyConfirmed?: boolean;
  noAccountCreateConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
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
  update?: (args: {
    where: { email: string };
    data: Record<string, unknown>;
    select: Record<string, boolean>;
  }) => Promise<Record<string, unknown> | null>;
};

const prisma = new PrismaClient();

type PasswordHashModule = {
  hash?: (password: string, saltOrRounds: number) => Promise<string>;
  default?: {
    hash?: (password: string, saltOrRounds: number) => Promise<string>;
  };
};

async function createPasswordHash(temporaryPassword: string): Promise<string> {
  const moduleCandidate = (await import("bcryptjs")) as unknown as PasswordHashModule;
  const hashFunction = moduleCandidate.hash ?? moduleCandidate.default?.hash;

  if (typeof hashFunction !== "function") {
    throw new Error("Password hash module not available.");
  }

  return hashFunction(temporaryPassword, 12);
}


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

  const delegate = userDelegate();

  if (!delegate?.findUnique) {
    return null;
  }

  return delegate.findUnique({
    where: { email: normalizedEmail },
    select: selectUserFields(fields),
  });
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

async function buildSecondTesterPasswordSetup(body: SecondTesterPasswordSetupBody) {
  const firstTesterEmail = (body.firstTesterEmail ?? "").trim().toLowerCase();
  const secondTesterEmail = (body.secondTesterEmail ?? "").trim().toLowerCase();
  const temporaryPassword = body.temporaryPassword ?? "";

  const userFields = getFieldNames("User");
  const firstTester = await findUserByEmail(firstTesterEmail, userFields);
  const secondTester = await findUserByEmail(secondTesterEmail, userFields);

  const firstTesterRoleValue = String(firstTester?.role ?? firstTester?.userRole ?? "").trim();
  const secondTesterRoleValue = String(secondTester?.role ?? secondTester?.userRole ?? "").trim();

  const serverWriteEnabled =
    process.env.AGRI_SECOND_TESTER_PASSWORD_SETUP_ENABLED === "true";
  const serverConfirmConfigured =
    process.env.AGRI_SECOND_TESTER_PASSWORD_SETUP_CONFIRM ===
    SECOND_TESTER_PASSWORD_SETUP_CONFIRM;

  const dryRun = body.dryRun ?? true;

  const input: TesterSecondTesterPasswordSetupPilotInput = {
    firstTesterEmail,
    secondTesterEmail,
    dryRun,
    confirm: body.confirm ?? "",
    previousAccountWriteCleared: body.previousAccountWriteCleared ?? false,
    firstTesterDetected: Boolean(firstTester),
    firstTesterRoleCompatible: firstTester ? isRoleCompatible(firstTesterRoleValue) : false,
    firstTesterHasPasswordHash: Boolean(firstTester?.passwordHash),
    secondTesterDetected: Boolean(secondTester),
    secondTesterRoleValue,
    secondTesterRoleCompatible: secondTester ? isRoleCompatible(secondTesterRoleValue) : false,
    secondTesterHasPasswordHash: Boolean(secondTester?.passwordHash),
    schemaHasPasswordHashField: userFields.has("passwordHash"),
    passwordCandidateProvided: temporaryPassword.length > 0,
    passwordLengthOk: temporaryPassword.length >= 12,
    serverWriteEnabled,
    serverConfirmConfigured,
    passwordWriteOnlyConfirmed: body.passwordWriteOnlyConfirmed ?? false,
    noAccountCreateConfirmed: body.noAccountCreateConfirmed ?? false,
    noInviteEmailConfirmed: body.noInviteEmailConfirmed ?? false,
    noPublicSignupConfirmed: body.noPublicSignupConfirmed ?? false,
    noSchemaMigrationConfirmed: body.noSchemaMigrationConfirmed ?? false,
    noAiProviderCallConfirmed: body.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: body.noExecutionConfirmed ?? false,
  };

  const report = buildTesterSecondTesterPasswordSetupPilotReport(input);

  let updatedUser: Record<string, unknown> | null = null;
  let writePerformed = false;
  let writeError = "";

  if (report.decision === "WRITE_CANDIDATE") {
    const delegate = userDelegate();

    if (!delegate?.update) {
      writeError = "User delegate update not available.";
    } else if (!userFields.has("passwordHash")) {
      writeError = "User.passwordHash field not available.";
    } else {
      const passwordHash = await createPasswordHash(temporaryPassword);

      updatedUser = await delegate.update({
        where: { email: secondTesterEmail },
        data: { passwordHash },
        select: selectUserFields(userFields),
      });

      writePerformed = Boolean(updatedUser);
    }
  }

  return {
    report,
    firstTester,
    secondTester,
    updatedUser,
    writePerformed,
    writeError,
    firstTesterRoleValue,
    secondTesterRoleValue,
  };
}

export async function GET(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-second-tester-password-setup-pilot",
      },
      { status: 403 },
    );
  }

  const result = await buildSecondTesterPasswordSetup({
    firstTesterEmail: request.nextUrl.searchParams.get("firstTesterEmail") ?? "",
    secondTesterEmail: request.nextUrl.searchParams.get("secondTesterEmail") ?? "",
    temporaryPassword: "",
    dryRun: true,
    previousAccountWriteCleared: false,
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-second-tester-password-setup-pilot",
    mode: "dry-run",
    writePerformed: false,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    secondTester: serializeUser(result.secondTester, result.secondTesterRoleValue),
    updatedUser: null,
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
        endpoint: "/api/ops/tester-second-tester-password-setup-pilot",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as SecondTesterPasswordSetupBody;
  const result = await buildSecondTesterPasswordSetup(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-second-tester-password-setup-pilot",
    mode: body.dryRun === false ? "protected-second-tester-password-setup-pilot" : "dry-run",
    writePerformed: result.writePerformed,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    secondTester: serializeUser(result.secondTester, result.secondTesterRoleValue),
    updatedUser: serializeUser(result.updatedUser, result.secondTesterRoleValue),
    writeError: result.writeError,
    report: result.report,
  });
}
