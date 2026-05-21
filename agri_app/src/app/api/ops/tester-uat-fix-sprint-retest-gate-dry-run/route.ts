import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  buildTesterUatFixSprintRetestGateReport,
  type TesterUatFixSprintRetestGateInput,
} from "@/lib/ops/testerUatFixSprintRetestGate";

export const dynamic = "force-dynamic";

type UatFixSprintRetestBody = Omit<
  TesterUatFixSprintRetestGateInput,
  "userDetected" | "roleValue" | "roleCompatible" | "hasPasswordHash"
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

async function buildFixSprintRetestReport(body: UatFixSprintRetestBody) {
  const email = (body.email ?? "").trim().toLowerCase();
  const userFields = getFieldNames("User");

  let user: Record<string, unknown> | null = null;

  if (isValidEmail(email) && modelExists("User") && userFields.has("email")) {
    const select: Record<string, boolean> = {};

    for (const field of ["id", "email", "name", "emailVerified", "passwordHash", "role", "userRole", "roles"]) {
      if (userFields.has(field)) select[field] = true;
    }

    const userDelegate = (prisma as unknown as { user?: { findUnique?: Function } }).user;

    if (userDelegate?.findUnique) {
      user = await userDelegate.findUnique({
        where: { email },
        select,
      });
    }
  }

  const roleValue = String(user?.role ?? user?.userRole ?? "").trim();

  const input: TesterUatFixSprintRetestGateInput = {
    ...body,
    email,
    userDetected: Boolean(user),
    roleValue,
    roleCompatible: user ? isRoleCompatible(roleValue) : false,
    hasPasswordHash: Boolean(user?.passwordHash),
  };

  const report = buildTesterUatFixSprintRetestGateReport(input);

  return {
    email,
    report,
    user: user
      ? {
          id: user.id ?? null,
          email: user.email ? redactedEmail(String(user.email)) : "",
          name: user.name ?? null,
          role: roleValue || null,
          emailVerified: Boolean(user.emailVerified),
          hasPasswordHash: Boolean(user.passwordHash),
        }
      : null,
  };
}

export async function GET(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-uat-fix-sprint-retest-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const result = await buildFixSprintRetestReport({
    email: request.nextUrl.searchParams.get("email") ?? "",
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-uat-fix-sprint-retest-gate-dry-run",
    mode: "dry-run",
    writePerformed: false,
    redactedEmail: result.email ? redactedEmail(result.email) : "",
    user: result.user,
    report: result.report,
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-uat-fix-sprint-retest-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as UatFixSprintRetestBody;
  const result = await buildFixSprintRetestReport(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-uat-fix-sprint-retest-gate-dry-run",
    mode: "dry-run",
    writePerformed: false,
    redactedEmail: result.email ? redactedEmail(result.email) : "",
    user: result.user,
    report: result.report,
  });
}
