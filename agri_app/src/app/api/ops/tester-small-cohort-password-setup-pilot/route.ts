import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  SMALL_COHORT_PASSWORD_SETUP_CONFIRM,
  buildTesterSmallCohortPasswordSetupPilotReport,
  type TesterSmallCohortPasswordSetupPilotInput,
} from "@/lib/ops/testerSmallCohortPasswordSetupPilot";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type SmallCohortPasswordSetupBody = {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  targetCohortSize?: number;
  candidateEmails?: string[];
  candidatePasswords?: string[];
  dryRun?: boolean;
  confirm?: string;
  previousAccountWritePilotClosed?: boolean;
  writePathsClosedConfirmed?: boolean;
  passwordWriteOnlyConfirmed?: boolean;
  noAccountCreateConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  noEvidencePersistenceConfirmed?: boolean;
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

type PasswordHashModule = {
  hash?: (password: string, saltOrRounds: number) => Promise<string>;
  default?: {
    hash?: (password: string, saltOrRounds: number) => Promise<string>;
  };
};

type CandidateProbe = {
  redactedEmail: string;
  existingUserDetected: boolean;
  role: string | null;
  roleCompatible: boolean;
  hasPasswordHash: boolean;
};

const prisma = new PrismaClient();

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
  const runtimeData = prisma as unknown as { _runtimeDataModel?: RuntimeDataModel };
  const fields = runtimeData._runtimeDataModel?.models?.[modelName]?.fields ?? [];
  return new Set(fields.map((field) => field.name).filter(Boolean) as string[]);
}

function modelExists(modelName: string): boolean {
  const runtimeData = prisma as unknown as { _runtimeDataModel?: RuntimeDataModel };
  return Boolean(runtimeData._runtimeDataModel?.models?.[modelName]);
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

function normalizeCandidateEmails(input: unknown): string[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => String(item ?? "").trim().toLowerCase())
    .filter((email) => isValidEmail(email))
    .slice(0, 5);
}

function normalizeCandidatePasswords(input: unknown, candidateCount: number): string[] {
  const values = Array.isArray(input)
    ? input.map((item) => String(item ?? ""))
    : [];

  return values.slice(0, candidateCount);
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

  const delegate = userDelegate();

  if (!delegate?.findUnique) {
    return null;
  }

  return delegate.findUnique({
    where: { email: normalizedEmail },
    select: selectUserFields(fields),
  });
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

function serializeCandidateProbe(email: string, user: Record<string, unknown> | null): CandidateProbe {
  const roleValue = roleValueForUser(user);

  return {
    redactedEmail: redactedEmail(email),
    existingUserDetected: Boolean(user),
    role: roleValue || null,
    roleCompatible: user ? isRoleCompatible(roleValue) : false,
    hasPasswordHash: Boolean(user?.passwordHash),
  };
}

async function buildSmallCohortPasswordSetup(body: SmallCohortPasswordSetupBody) {
  const firstTesterEmail = (body.firstTesterEmail ?? "").trim().toLowerCase();
  const secondTesterEmail = (body.secondTesterEmail ?? "").trim().toLowerCase();
  const targetCohortSize = body.targetCohortSize ?? 3;
  const candidateEmails = normalizeCandidateEmails(body.candidateEmails);
  const candidatePasswords = normalizeCandidatePasswords(body.candidatePasswords, candidateEmails.length);

  const userFields = getFieldNames("User");

  const firstTester = await findUserByEmail(firstTesterEmail, userFields);
  const secondTester = await findUserByEmail(secondTesterEmail, userFields);
  const candidateUsers = await Promise.all(
    candidateEmails.map((email) => findUserByEmail(email, userFields)),
  );

  const firstTesterRoleValue = roleValueForUser(firstTester);
  const secondTesterRoleValue = roleValueForUser(secondTester);

  const candidateRoleCompatibleCount = candidateUsers.filter((user) => {
    if (!user) return false;
    return isRoleCompatible(roleValueForUser(user));
  }).length;

  const candidatePasswordHashCount = candidateUsers.filter((user) => Boolean(user?.passwordHash)).length;

  const serverWriteEnabled =
    process.env.AGRI_SMALL_COHORT_PASSWORD_SETUP_ENABLED === "true";
  const serverConfirmConfigured =
    process.env.AGRI_SMALL_COHORT_PASSWORD_SETUP_CONFIRM ===
    SMALL_COHORT_PASSWORD_SETUP_CONFIRM;

  const dryRun = body.dryRun ?? true;

  const input: TesterSmallCohortPasswordSetupPilotInput = {
    firstTesterEmail,
    secondTesterEmail,
    targetCohortSize,
    candidateEmails,
    dryRun,
    confirm: body.confirm ?? "",
    firstTesterDetected: Boolean(firstTester),
    firstTesterRoleCompatible: firstTester ? isRoleCompatible(firstTesterRoleValue) : false,
    firstTesterHasPasswordHash: Boolean(firstTester?.passwordHash),
    secondTesterDetected: Boolean(secondTester),
    secondTesterRoleValue,
    secondTesterRoleCompatible: secondTester ? isRoleCompatible(secondTesterRoleValue) : false,
    secondTesterHasPasswordHash: Boolean(secondTester?.passwordHash),
    previousAccountWritePilotClosed: body.previousAccountWritePilotClosed ?? false,
    writePathsClosedConfirmed: body.writePathsClosedConfirmed ?? false,
    candidateEmailCount: candidateEmails.length,
    duplicateCandidateEmailDetected: hasDuplicate(candidateEmails),
    candidateExistingUserCount: candidateUsers.filter(Boolean).length,
    candidateRoleCompatibleCount,
    candidatePasswordHashCount,
    candidatePasswordCount: candidatePasswords.filter((password) => password.length > 0).length,
    candidatePasswordLengthOkCount: candidatePasswords.filter((password) => password.length >= 12).length,
    schemaHasPasswordHashField: userFields.has("passwordHash"),
    serverWriteEnabled,
    serverConfirmConfigured,
    passwordWriteOnlyConfirmed: body.passwordWriteOnlyConfirmed ?? false,
    noAccountCreateConfirmed: body.noAccountCreateConfirmed ?? false,
    noInviteEmailConfirmed: body.noInviteEmailConfirmed ?? false,
    noPublicSignupConfirmed: body.noPublicSignupConfirmed ?? false,
    noSchemaMigrationConfirmed: body.noSchemaMigrationConfirmed ?? false,
    noAiProviderCallConfirmed: body.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: body.noExecutionConfirmed ?? false,
    noEvidencePersistenceConfirmed: body.noEvidencePersistenceConfirmed ?? false,
  };

  const report = buildTesterSmallCohortPasswordSetupPilotReport(input);

  let updatedUsers: Array<Record<string, unknown> | null> = [];
  let writePerformed = false;
  let writeError = "";

  if (report.decision === "WRITE_CANDIDATES") {
    const delegate = userDelegate();

    if (!delegate?.update) {
      writeError = "User delegate update not available.";
    } else {
      const updateUserDelegate: Required<Pick<UserDelegate, "update">> = {
        update: delegate.update.bind(delegate) as NonNullable<UserDelegate["update"]>,
      };

      try {
        const passwordHashes = await Promise.all(candidatePasswords.map((password) => createPasswordHash(password)));

        const updateOperations: Array<Promise<Record<string, unknown> | null>> = candidateEmails.map((email, index) =>
          updateUserDelegate.update({
            where: { email },
            data: { passwordHash: passwordHashes[index] },
            select: selectUserFields(userFields),
          }),
        );

        const transactionClient = prisma as unknown as {
          $transaction?: (
            operations: Array<Promise<Record<string, unknown> | null>>,
          ) => Promise<unknown[]>;
        };

        if (typeof transactionClient.$transaction === "function") {
          const transactionResult = await transactionClient.$transaction(updateOperations);
          updatedUsers = transactionResult as Array<Record<string, unknown> | null>;
        } else {
          updatedUsers = [];

          for (const operation of updateOperations) {
            updatedUsers.push(await operation);
          }
        }

        writePerformed =
          updatedUsers.length === candidateEmails.length &&
          updatedUsers.every((user) => Boolean(user));
      } catch (error) {
        writeError =
          error instanceof Error
            ? error.message
            : "Unknown cohort password setup error.";
      }
    }
  }

  return {
    firstTester,
    secondTester,
    firstTesterRoleValue,
    secondTesterRoleValue,
    candidateEmails,
    candidateUsers,
    candidateProbes: candidateEmails.map((email, index) => serializeCandidateProbe(email, candidateUsers[index])),
    updatedUsers,
    writePerformed,
    writeError,
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
        endpoint: "/api/ops/tester-small-cohort-password-setup-pilot",
      },
      { status: 403 },
    );
  }

  const result = await buildSmallCohortPasswordSetup({
    firstTesterEmail: request.nextUrl.searchParams.get("firstTesterEmail") ?? "",
    secondTesterEmail: request.nextUrl.searchParams.get("secondTesterEmail") ?? "",
    candidateEmails: candidateEmailsFromParam(request.nextUrl.searchParams.get("candidateEmails")),
    dryRun: true,
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-small-cohort-password-setup-pilot",
    mode: "dry-run",
    writePerformed: false,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    secondTester: serializeUser(result.secondTester, result.secondTesterRoleValue),
    candidateProbes: result.candidateProbes,
    updatedUsers: [],
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
        endpoint: "/api/ops/tester-small-cohort-password-setup-pilot",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as SmallCohortPasswordSetupBody;
  const result = await buildSmallCohortPasswordSetup(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-small-cohort-password-setup-pilot",
    mode: body.dryRun === false ? "protected-small-cohort-password-setup-pilot" : "dry-run",
    writePerformed: result.writePerformed,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    secondTester: serializeUser(result.secondTester, result.secondTesterRoleValue),
    candidateProbes: result.candidateProbes,
    updatedUsers: result.updatedUsers.map((user) => serializeUser(user)),
    writeError: result.writeError,
    report: result.report,
  });
}
