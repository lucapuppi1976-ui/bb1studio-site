import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  buildTesterPasswordSetupReport,
  TESTER_PASSWORD_SETUP_CONFIRM,
} from "@/lib/ops/testerPasswordSetupPilot";

export const dynamic = "force-dynamic";

type PasswordSetupBody = {
  email?: string;
  temporaryPassword?: string;
  dryRun?: boolean;
  confirm?: string;
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

const prisma = new PrismaClient();
const TESTER_PASSWORD_SETUP_CONFIRM_LITERAL = "CONFIRM_V20_1_TESTER_PASSWORD_SETUP";

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

async function buildPasswordSetupPreview(body: PasswordSetupBody) {
  const fields = getFieldNames("User");
  const email = body.email?.trim().toLowerCase() ?? "";
  const temporaryPassword = body.temporaryPassword ?? "";
  const userDelegate = (prisma as unknown as { user?: { findUnique?: Function } }).user;

  let user: Record<string, unknown> | null = null;

  if (email && isValidEmail(email) && userDelegate?.findUnique && fields.has("email")) {
    const select: Record<string, boolean> = {};
    for (const field of ["id", "email", "name", "emailVerified", "passwordHash", "role", "userRole", "roles"]) {
      if (fields.has(field)) select[field] = true;
    }

    user = await userDelegate.findUnique({
      where: { email },
      select,
    });
  }

  const roleValue = String(user?.role ?? user?.userRole ?? "").trim();

  const report = buildTesterPasswordSetupReport({
    email,
    userDetected: Boolean(user),
    roleValue,
    roleCompatible: user ? isRoleCompatible(roleValue) : false,
    emailVerified: Boolean(user?.emailVerified),
    hasPasswordHash: Boolean(user?.passwordHash),
    passwordCandidateProvided: temporaryPassword.length > 0,
    passwordLengthOk: temporaryPassword.length >= 12,
    dryRun: body.dryRun ?? true,
    confirm: body.confirm ?? "",
    serverWriteEnabled: process.env.AGRI_TESTER_PASSWORD_WRITE_ENABLED === "true",
    serverConfirmConfigured:
      process.env.AGRI_TESTER_PASSWORD_WRITE_CONFIRM === TESTER_PASSWORD_SETUP_CONFIRM_LITERAL &&
      TESTER_PASSWORD_SETUP_CONFIRM === TESTER_PASSWORD_SETUP_CONFIRM_LITERAL,
  });

  return {
    email,
    temporaryPassword,
    user,
    fields,
    report,
  };
}

export async function GET(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-password-setup-pilot",
      },
      { status: 403 },
    );
  }

  const email = request.nextUrl.searchParams.get("email") ?? "";
  const result = await buildPasswordSetupPreview({
    email,
    temporaryPassword: "",
    dryRun: true,
    confirm: "",
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-password-setup-pilot",
    mode: "dry-run",
    writePerformed: false,
    redactedEmail: result.email ? redactedEmail(result.email) : "",
    report: result.report,
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-password-setup-pilot",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as PasswordSetupBody;
  const result = await buildPasswordSetupPreview(body);

  if (body.dryRun !== false) {
    return NextResponse.json({
      ok: true,
      endpoint: "/api/ops/tester-password-setup-pilot",
      mode: "dry-run",
      writePerformed: false,
      redactedEmail: result.email ? redactedEmail(result.email) : "",
      report: result.report,
    });
  }

  if (result.report.decision !== "PASSWORD_WRITE_CANDIDATE") {
    return NextResponse.json(
      {
        ok: false,
        endpoint: "/api/ops/tester-password-setup-pilot",
        mode: "blocked",
        writePerformed: false,
        redactedEmail: result.email ? redactedEmail(result.email) : "",
        report: result.report,
      },
      { status: 409 },
    );
  }

  const userDelegate = (prisma as unknown as { user?: { update?: Function } }).user;

  if (!userDelegate?.update || !result.fields.has("passwordHash")) {
    return NextResponse.json(
      {
        ok: false,
        endpoint: "/api/ops/tester-password-setup-pilot",
        mode: "blocked",
        writePerformed: false,
        error: "User update delegate or passwordHash field unavailable.",
        report: result.report,
      },
      { status: 409 },
    );
  }

  try {
    const passwordHash = await bcrypt.hash(result.temporaryPassword, 12);
    const select: Record<string, boolean> = {};

    for (const field of ["id", "email", "role", "emailVerified"]) {
      if (result.fields.has(field)) select[field] = true;
    }

    const updated = await userDelegate.update({
      where: { email: result.email },
      data: { passwordHash },
      select,
    });

    return NextResponse.json({
      ok: true,
      endpoint: "/api/ops/tester-password-setup-pilot",
      mode: "protected-tester-password-setup",
      writePerformed: true,
      passwordHashWritten: true,
      redactedEmail: redactedEmail(result.email),
      updated,
      report: result.report,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown tester password setup error.";

    return NextResponse.json(
      {
        ok: false,
        endpoint: "/api/ops/tester-password-setup-pilot",
        mode: "write-error",
        writePerformed: false,
        redactedEmail: redactedEmail(result.email),
        error: message,
        report: result.report,
      },
      { status: 500 },
    );
  }
}
