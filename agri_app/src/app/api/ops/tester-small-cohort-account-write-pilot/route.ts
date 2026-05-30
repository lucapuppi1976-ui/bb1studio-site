import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  SMALL_COHORT_ACCOUNT_WRITE_CONFIRM,
  buildTesterSmallCohortAccountWritePilotReport,
  type TesterSmallCohortAccountWritePilotInput,
} from "@/lib/ops/testerSmallCohortAccountWritePilot";

export const dynamic = "force-dynamic";

type SmallCohortAccountWriteBody = {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  targetCohortSize?: number;
  candidateEmails?: string[];
  candidateNames?: string[];
  dryRun?: boolean;
  acceptLimitations?: boolean;
  confirm?: string;
  previousCandidateReadinessCleared?: boolean;
  writePathsClosedConfirmed?: boolean;
  noPasswordWriteConfirmed?: boolean;
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

function normalizeCandidateEmails(input: unknown): string[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => String(item ?? "").trim().toLowerCase())
    .filter((email) => isValidEmail(email))
    .slice(0, 5);
}

function normalizeCandidateNames(input: unknown, candidateCount: number): string[] {
  const names = Array.isArray(input)
    ? input.map((item) => String(item ?? "").trim()).filter(Boolean)
    : [];

  return Array.from({ length: candidateCount }, (_, index) => names[index] || `UAT Tester ${index + 1}`);
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

async function buildSmallCohortWritePilot(body: SmallCohortAccountWriteBody) {
  const firstTesterEmail = (body.firstTesterEmail ?? "").trim().toLowerCase();
  const secondTesterEmail = (body.secondTesterEmail ?? "").trim().toLowerCase();
  const targetCohortSize = body.targetCohortSize ?? 3;
  const candidateEmails = normalizeCandidateEmails(body.candidateEmails);
  const candidateNames = normalizeCandidateNames(body.candidateNames, candidateEmails.length);

  const userFields = getFieldNames("User");

  const firstTester = await findUserByEmail(firstTesterEmail, userFields);
  const secondTester = await findUserByEmail(secondTesterEmail, userFields);
  const candidateUsers = await Promise.all(
    candidateEmails.map((email) => findUserByEmail(email, userFields)),
  );

  const firstTesterRoleValue = String(firstTester?.role ?? firstTester?.userRole ?? "").trim();
  const secondTesterRoleValue = String(secondTester?.role ?? secondTester?.userRole ?? "").trim();

  const serverWriteEnabled =
    process.env.AGRI_SMALL_COHORT_ACCOUNT_WRITE_ENABLED === "true";
  const serverConfirmConfigured =
    process.env.AGRI_SMALL_COHORT_ACCOUNT_WRITE_CONFIRM ===
    SMALL_COHORT_ACCOUNT_WRITE_CONFIRM;

  const dryRun = body.dryRun ?? true;

  const input: TesterSmallCohortAccountWritePilotInput = {
    firstTesterEmail,
    secondTesterEmail,
    targetCohortSize,
    candidateEmails,
    candidateNames,
    dryRun,
    acceptLimitations: body.acceptLimitations ?? false,
    confirm: body.confirm ?? "",
    firstTesterDetected: Boolean(firstTester),
    firstTesterRoleCompatible: firstTester ? isRoleCompatible(firstTesterRoleValue) : false,
    firstTesterHasPasswordHash: Boolean(firstTester?.passwordHash),
    secondTesterDetected: Boolean(secondTester),
    secondTesterRoleValue,
    secondTesterRoleCompatible: secondTester ? isRoleCompatible(secondTesterRoleValue) : false,
    secondTesterHasPasswordHash: Boolean(secondTester?.passwordHash),
    previousCandidateReadinessCleared: body.previousCandidateReadinessCleared ?? false,
    writePathsClosedConfirmed: body.writePathsClosedConfirmed ?? false,
    candidateEmailCount: candidateEmails.length,
    candidateNameCount: candidateNames.length,
    duplicateCandidateEmailDetected: hasDuplicate(candidateEmails),
    candidateExistingUserCount: candidateUsers.filter(Boolean).length,
    schemaHasNameField: userFields.has("name"),
    schemaHasRoleField: userFields.has("role") || userFields.has("userRole") || userFields.has("roles"),
    schemaHasLanguageField:
      userFields.has("language") ||
      userFields.has("locale") ||
      userFields.has("preferredLanguage"),
    serverWriteEnabled,
    serverConfirmConfigured,
    noPasswordWriteConfirmed: body.noPasswordWriteConfirmed ?? false,
    noInviteEmailConfirmed: body.noInviteEmailConfirmed ?? false,
    noPublicSignupConfirmed: body.noPublicSignupConfirmed ?? false,
    noSchemaMigrationConfirmed: body.noSchemaMigrationConfirmed ?? false,
    noAiProviderCallConfirmed: body.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: body.noExecutionConfirmed ?? false,
    noEvidencePersistenceConfirmed: body.noEvidencePersistenceConfirmed ?? false,
  };

  const report = buildTesterSmallCohortAccountWritePilotReport(input);

  let createdUsers: Array<Record<string, unknown> | null> = [];
  let writePerformed = false;
  let writeError = "";

  if (report.decision === "WRITE_CANDIDATES") {
    const delegate = userDelegate();

    if (!delegate?.create) {
      writeError = "User delegate create not available.";
    } else {
      const createUserDelegate: Required<Pick<UserDelegate, "create">> = {
        create: delegate.create.bind(delegate) as NonNullable<UserDelegate["create"]>,
      };

      const createOperations: Array<Promise<Record<string, unknown> | null>> = candidateEmails.map((email, index) =>
        createUserDelegate.create({
          data: buildCreateData(email, candidateNames[index] || `UAT Tester ${index + 1}`, userFields),
          select: selectUserFields(userFields),
        }),
      );

      const transactionClient = prisma as unknown as {
        $transaction?: (
          operations: Array<Promise<Record<string, unknown> | null>>,
        ) => Promise<unknown[]>;
      };

      try {
        if (typeof transactionClient.$transaction === "function") {
          const transactionResult = await transactionClient.$transaction(createOperations);
          createdUsers = transactionResult as Array<Record<string, unknown> | null>;
        } else {
          createdUsers = [];

          for (const operation of createOperations) {
            createdUsers.push(await operation);
          }
        }

        writePerformed =
          createdUsers.length === candidateEmails.length &&
          createdUsers.every((user) => Boolean(user));
      } catch (error) {
        writeError =
          error instanceof Error
            ? error.message
            : "Unknown cohort account write error.";
      }
    }
  }

  return {
    firstTester,
    secondTester,
    firstTesterRoleValue,
    secondTesterRoleValue,
    existingCandidateUsers: candidateUsers,
    candidateEmails,
    candidateNames,
    createdUsers,
    writePerformed,
    writeError,
    report,
  };
}

function serializeCandidateProbe(email: string, user: Record<string, unknown> | null) {
  const roleValue = String(user?.role ?? user?.userRole ?? "").trim();

  return {
    redactedEmail: redactedEmail(email),
    existingUserDetected: Boolean(user),
    role: roleValue || null,
    hasPasswordHash: Boolean(user?.passwordHash),
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
        endpoint: "/api/ops/tester-small-cohort-account-write-pilot",
      },
      { status: 403 },
    );
  }

  const result = await buildSmallCohortWritePilot({
    firstTesterEmail: request.nextUrl.searchParams.get("firstTesterEmail") ?? "",
    secondTesterEmail: request.nextUrl.searchParams.get("secondTesterEmail") ?? "",
    candidateEmails: candidateEmailsFromParam(request.nextUrl.searchParams.get("candidateEmails")),
    dryRun: true,
    acceptLimitations: true,
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-small-cohort-account-write-pilot",
    mode: "dry-run",
    writePerformed: false,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    secondTester: serializeUser(result.secondTester, result.secondTesterRoleValue),
    candidateProbes: result.candidateEmails.map((email, index) =>
      serializeCandidateProbe(email, result.existingCandidateUsers[index]),
    ),
    createdUsers: [],
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
        endpoint: "/api/ops/tester-small-cohort-account-write-pilot",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as SmallCohortAccountWriteBody;
  const result = await buildSmallCohortWritePilot(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-small-cohort-account-write-pilot",
    mode: body.dryRun === false ? "protected-small-cohort-account-write-pilot" : "dry-run",
    writePerformed: result.writePerformed,
    firstTester: serializeUser(result.firstTester, result.firstTesterRoleValue),
    secondTester: serializeUser(result.secondTester, result.secondTesterRoleValue),
    candidateProbes: result.candidateEmails.map((email, index) =>
      serializeCandidateProbe(email, result.existingCandidateUsers[index]),
    ),
    createdUsers: result.createdUsers.map((user) => serializeUser(user)),
    writeError: result.writeError,
    report: result.report,
  });
}
