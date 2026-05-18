import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  buildTesterLoginSessionOnboardingUatReport,
  type TesterLoginSessionOnboardingInput,
} from "@/lib/ops/testerLoginSessionOnboardingUatGate";

export const dynamic = "force-dynamic";

type ManualUatGateBody = {
  email?: string;
  manualLoginObserved?: boolean;
  onboardingPageObserved?: boolean;
  protectedRouteObserved?: boolean;
  localeFallbackObserved?: boolean;
  logoutObserved?: boolean;
  openCriticalUatIssueCount?: number;
  openMajorUatIssueCount?: number;
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

async function safeCount(delegate: unknown, where: Record<string, unknown>): Promise<number> {
  const counter = delegate as { count?: Function };
  if (!counter.count) return 0;

  try {
    return await counter.count({ where });
  } catch {
    return 0;
  }
}

function isRoleCompatible(roleValue: string): boolean {
  return roleValue === "OPERATOR" || roleValue === "SUPER_ADMIN";
}

async function buildManualUatReport(body: ManualUatGateBody) {
  const email = (body.email ?? "").trim().toLowerCase();
  const userFields = getFieldNames("User");
  const accountFields = getFieldNames("Account");
  const sessionFields = getFieldNames("Session");

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

  const userId = typeof user?.id === "string" ? user.id : "";
  const accountDelegate = (prisma as unknown as { account?: unknown }).account;
  const sessionDelegate = (prisma as unknown as { session?: unknown }).session;

  const oauthAccountCount =
    userId && accountFields.has("userId")
      ? await safeCount(accountDelegate, { userId })
      : 0;

  const activeSessionCount =
    userId && sessionFields.has("userId")
      ? await safeCount(sessionDelegate, { userId })
      : 0;

  const roleValue = String(user?.role ?? user?.userRole ?? "").trim();

  const input: TesterLoginSessionOnboardingInput = {
    email,
    userDetected: Boolean(user),
    roleValue,
    roleCompatible: user ? isRoleCompatible(roleValue) : false,
    hasPasswordHash: Boolean(user?.passwordHash),
    emailVerified: Boolean(user?.emailVerified),
    oauthAccountCount,
    activeSessionCount,
    manualLoginObserved: body.manualLoginObserved ?? false,
    onboardingPageObserved: body.onboardingPageObserved ?? false,
    protectedRouteObserved: body.protectedRouteObserved ?? false,
    localeFallbackObserved: body.localeFallbackObserved ?? false,
    logoutObserved: body.logoutObserved ?? false,
    openCriticalUatIssueCount: body.openCriticalUatIssueCount ?? 0,
    openMajorUatIssueCount: body.openMajorUatIssueCount ?? 0,
  };

  const report = buildTesterLoginSessionOnboardingUatReport(input);

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
          oauthAccountCount,
          activeSessionCount,
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
        endpoint: "/api/ops/tester-login-session-onboarding-uat-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const result = await buildManualUatReport({
    email: request.nextUrl.searchParams.get("email") ?? "",
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-login-session-onboarding-uat-gate-dry-run",
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
        endpoint: "/api/ops/tester-login-session-onboarding-uat-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as ManualUatGateBody;
  const result = await buildManualUatReport(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-login-session-onboarding-uat-gate-dry-run",
    mode: "dry-run",
    writePerformed: false,
    redactedEmail: result.email ? redactedEmail(result.email) : "",
    user: result.user,
    report: result.report,
  });
}
