import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  buildTesterAccountWritePilotReport,
  TESTER_ACCOUNT_WRITE_CONFIRM,
  type TesterAccountLanguage,
  type TesterAccountRole,
} from "@/lib/ops/testerAccountWritePilot";

export const dynamic = "force-dynamic";

type TesterAccountWritePilotBody = {
  dryRun?: boolean;
  confirm?: string;
  acceptLimitations?: boolean;
  tester?: {
    email?: string;
    displayName?: string;
    role?: TesterAccountRole;
    preferredLanguage?: TesterAccountLanguage;
  };
};

type RuntimeUserField = {
  name?: string;
};

type RuntimeUserModel = {
  fields?: RuntimeUserField[];
};

type RuntimeDataModel = {
  models?: Record<string, RuntimeUserModel>;
};

const prisma = new PrismaClient();
const TESTER_ACCOUNT_WRITE_CONFIRM_LITERAL = "CONFIRM_V19_8_TESTER_ACCOUNT_WRITE";

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

function getUserFieldNames(): Set<string> {
  const runtime = prisma as unknown as { _runtimeDataModel?: RuntimeDataModel };
  const fields = runtime._runtimeDataModel?.models?.User?.fields ?? [];
  return new Set(fields.map((field) => field.name).filter(Boolean) as string[]);
}

function pickRoleField(fields: Set<string>): string | null {
  for (const candidate of ["role", "userRole", "roles"]) {
    if (fields.has(candidate)) return candidate;
  }
  return null;
}

function pickLanguageField(fields: Set<string>): string | null {
  for (const candidate of ["preferredLanguage", "language", "locale"]) {
    if (fields.has(candidate)) return candidate;
  }
  return null;
}


function mapTesterPilotRoleToDbRole(role: TesterAccountRole): string {
  // V19.8F: lo schema corrente espone User.role come enum UserRole con valori SUPER_ADMIN / OPERATOR.
  // I ruoli UAT restano semantici lato app, ma il pilot DB scrive il valore sicuro OPERATOR.
  switch (role) {
    case "uat_reviewer":
    case "uat_operator":
    case "uat_observer":
    default:
      return "OPERATOR";
  }
}

function isValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function redactedEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "[invalid-email]";
  return `${localPart.slice(0, 2)}***@${domain}`;
}

async function buildPreview(body: TesterAccountWritePilotBody) {
  const fields = getUserFieldNames();
  const email = body.tester?.email?.trim().toLowerCase() ?? "";
  const roleField = pickRoleField(fields);
  const languageField = pickLanguageField(fields);
  const userDelegate = (prisma as unknown as { user?: { findFirst: Function } }).user;

  let existingUserDetected = false;

  if (email && isValidEmail(email) && userDelegate) {
    const existing = await userDelegate.findFirst({ where: { email } });
    existingUserDetected = Boolean(existing);
  }

  const report = buildTesterAccountWritePilotReport({
    email,
    displayName: body.tester?.displayName ?? "",
    role: body.tester?.role ?? "uat_observer",
    preferredLanguage: body.tester?.preferredLanguage ?? "it",
    dryRun: body.dryRun ?? true,
    acceptLimitations: body.acceptLimitations ?? false,
    confirm: body.confirm ?? "",
    schemaHasRoleField: Boolean(roleField),
    schemaHasLanguageField: Boolean(languageField),
    existingUserDetected,
    serverWriteEnabled: process.env.AGRI_TESTER_ACCOUNT_WRITE_ENABLED === "true",
    serverConfirmConfigured:
      process.env.AGRI_TESTER_ACCOUNT_WRITE_CONFIRM === TESTER_ACCOUNT_WRITE_CONFIRM_LITERAL && TESTER_ACCOUNT_WRITE_CONFIRM === TESTER_ACCOUNT_WRITE_CONFIRM_LITERAL,
  });

  return {
    fields,
    roleField,
    languageField,
    report,
  };
}

export async function GET(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-account-write-pilot",
      },
      { status: 403 },
    );
  }

  const { report } = await buildPreview({
    dryRun: true,
    tester: {
      email: "",
      displayName: "",
      role: "uat_observer",
      preferredLanguage: "it",
    },
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-account-write-pilot",
    mode: "dry-run",
    writePerformed: false,
    report,
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-account-write-pilot",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as TesterAccountWritePilotBody;
  const { fields, roleField, languageField, report } = await buildPreview(body);
  const email = body.tester?.email?.trim().toLowerCase() ?? "";

  if (body.dryRun !== false) {
    return NextResponse.json({
      ok: true,
      endpoint: "/api/ops/tester-account-write-pilot",
      mode: "dry-run",
      writePerformed: false,
      redactedEmail: email ? redactedEmail(email) : "",
      report,
    });
  }

  if (report.decision !== "WRITE_CANDIDATE") {
    return NextResponse.json(
      {
        ok: false,
        endpoint: "/api/ops/tester-account-write-pilot",
        mode: "blocked",
        writePerformed: false,
        redactedEmail: email ? redactedEmail(email) : "",
        report,
      },
      { status: 409 },
    );
  }

  const userDelegate = (
    prisma as unknown as {
      user?: {
        create: Function;
      };
    }
  ).user;

  if (!userDelegate || !fields.has("email")) {
    return NextResponse.json(
      {
        ok: false,
        endpoint: "/api/ops/tester-account-write-pilot",
        mode: "blocked",
        writePerformed: false,
        error: "User model or email field unavailable.",
        report,
      },
      { status: 409 },
    );
  }

  const createData: Record<string, unknown> = {
    email,
  };

  if (fields.has("name")) {
    createData.name = body.tester?.displayName || email;
  }

  if (roleField) {
    createData[roleField] = mapTesterPilotRoleToDbRole(body.tester?.role ?? "uat_observer");
  }

  if (languageField) {
    createData[languageField] = body.tester?.preferredLanguage ?? "it";
  }

  try {
    const created = await userDelegate.create({
      data: createData,
      select: fields.has("id")
        ? {
            id: true,
            email: true,
          }
        : {
            email: true,
          },
    });

    return NextResponse.json({
      ok: true,
      endpoint: "/api/ops/tester-account-write-pilot",
      mode: "single-tester-write-pilot",
      writePerformed: true,
      redactedEmail: redactedEmail(email),
      created,
      dbRoleWritten: roleField ? createData[roleField] : null,
      languageWritten: languageField ? createData[languageField] : null,
      report,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown tester account write error.";

    return NextResponse.json(
      {
        ok: false,
        endpoint: "/api/ops/tester-account-write-pilot",
        mode: "write-error",
        writePerformed: false,
        redactedEmail: redactedEmail(email),
        error: message,
        attemptedDataKeys: Object.keys(createData),
        roleField,
        languageField,
        dbRoleAttempted: roleField ? createData[roleField] : null,
        report,
      },
      { status: 500 },
    );
  }
}
