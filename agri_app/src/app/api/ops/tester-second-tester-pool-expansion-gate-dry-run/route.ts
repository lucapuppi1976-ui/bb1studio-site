import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  buildTesterSecondTesterPoolExpansionReport,
  type TesterSecondTesterPoolExpansionInput,
} from "@/lib/ops/testerSecondTesterPoolExpansionGate";

export const dynamic = "force-dynamic";

type SecondTesterPoolExpansionBody = Omit<
  TesterSecondTesterPoolExpansionInput,
  | "firstTesterDetected"
  | "firstTesterRoleCompatible"
  | "firstTesterHasPasswordHash"
  | "candidateExistingUserDetected"
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

async function findUserByEmail(email: string, fields: Set<string>): Promise<Record<string, unknown> | null> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!isValidEmail(normalizedEmail) || !modelExists("User") || !fields.has("email")) {
    return null;
  }

  const select: Record<string, boolean> = {};
  for (const field of ["id", "email", "name", "emailVerified", "passwordHash", "role", "userRole", "roles"]) {
    if (fields.has(field)) select[field] = true;
  }

  const userDelegate = (prisma as unknown as { user?: { findUnique?: Function } }).user;

  if (!userDelegate?.findUnique) {
    return null;
  }

  return userDelegate.findUnique({
    where: { email: normalizedEmail },
    select,
  });
}

async function buildExpansionReport(body: SecondTesterPoolExpansionBody) {
  const firstTesterEmail = (body.firstTesterEmail ?? "").trim().toLowerCase();
  const candidateEmail = (body.candidateEmail ?? "").trim().toLowerCase();
  const userFields = getFieldNames("User");

  const firstTester = await findUserByEmail(firstTesterEmail, userFields);
  const candidate = await findUserByEmail(candidateEmail, userFields);

  const firstTesterRoleValue = String(firstTester?.role ?? firstTester?.userRole ?? "").trim();
  const candidateRoleValue = String(candidate?.role ?? candidate?.userRole ?? "").trim();

  const input: TesterSecondTesterPoolExpansionInput = {
    ...body,
    firstTesterEmail,
    candidateEmail,
    firstTesterDetected: Boolean(firstTester),
    firstTesterRoleCompatible: firstTester ? isRoleCompatible(firstTesterRoleValue) : false,
    firstTesterHasPasswordHash: Boolean(firstTester?.passwordHash),
    candidateExistingUserDetected: Boolean(candidate),
  };

  const report = buildTesterSecondTesterPoolExpansionReport(input);

  return {
    firstTester,
    candidate,
    report,
    firstTesterEmail,
    candidateEmail,
    firstTesterRoleValue,
    candidateRoleValue,
  };
}

export async function GET(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-second-tester-pool-expansion-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const result = await buildExpansionReport({
    firstTesterEmail: request.nextUrl.searchParams.get("firstTesterEmail") ?? "",
    candidateEmail: request.nextUrl.searchParams.get("candidateEmail") ?? "",
    candidateName: request.nextUrl.searchParams.get("candidateName") ?? "",
    candidateRole: request.nextUrl.searchParams.get("candidateRole") ?? "OPERATOR",
    candidateLanguage: request.nextUrl.searchParams.get("candidateLanguage") ?? "it",
  });

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-second-tester-pool-expansion-gate-dry-run",
    mode: "dry-run",
    writePerformed: false,
    firstTester: result.firstTester
      ? {
          id: result.firstTester.id ?? null,
          email: result.firstTester.email ? redactedEmail(String(result.firstTester.email)) : "",
          role: result.firstTesterRoleValue || null,
          hasPasswordHash: Boolean(result.firstTester.passwordHash),
        }
      : null,
    candidate: result.candidate
      ? {
          id: result.candidate.id ?? null,
          email: result.candidate.email ? redactedEmail(String(result.candidate.email)) : "",
          role: result.candidateRoleValue || null,
          hasPasswordHash: Boolean(result.candidate.passwordHash),
        }
      : null,
    report: result.report,
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/tester-second-tester-pool-expansion-gate-dry-run",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as SecondTesterPoolExpansionBody;
  const result = await buildExpansionReport(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/tester-second-tester-pool-expansion-gate-dry-run",
    mode: "dry-run",
    writePerformed: false,
    firstTester: result.firstTester
      ? {
          id: result.firstTester.id ?? null,
          email: result.firstTester.email ? redactedEmail(String(result.firstTester.email)) : "",
          role: result.firstTesterRoleValue || null,
          hasPasswordHash: Boolean(result.firstTester.passwordHash),
        }
      : null,
    candidate: result.candidate
      ? {
          id: result.candidate.id ?? null,
          email: result.candidate.email ? redactedEmail(String(result.candidate.email)) : "",
          role: result.candidateRoleValue || null,
          hasPasswordHash: Boolean(result.candidate.passwordHash),
        }
      : null,
    report: result.report,
  });
}
