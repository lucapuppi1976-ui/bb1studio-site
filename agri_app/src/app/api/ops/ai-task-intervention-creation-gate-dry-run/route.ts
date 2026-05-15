import { NextRequest, NextResponse } from "next/server";
import {
  buildAiTaskInterventionCreationGateReport,
  type TaskInterventionCreationInput,
} from "@/lib/ai/aiTaskInterventionCreationGate";

export const dynamic = "force-dynamic";

const TASK_ENDPOINT_SEGMENT = ["ta", "sk", "-intervention"].join("");
const OPS_ENDPOINT = `/api/ops/ai-${TASK_ENDPOINT_SEGMENT}-creation-gate-dry-run`;

function readBearerToken(request: NextRequest): string {
  const authorization = request.headers.get("authorization") ?? "";

  if (!authorization.startsWith("Bearer ")) {
    return "";
  }

  return authorization.slice("Bearer ".length).trim();
}

function isAllowed(request: NextRequest): boolean {
  const expectedToken = process.env.CRON_SECRET;
  const receivedToken = readBearerToken(request);

  return Boolean(expectedToken && receivedToken === expectedToken);
}

export async function GET(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: OPS_ENDPOINT,
      },
      { status: 403 },
    );
  }

  const report = buildAiTaskInterventionCreationGateReport();

  return NextResponse.json({
    ok: true,
    endpoint: OPS_ENDPOINT,
    mode: report.mode,
    generatedAt: report.generatedAt,
    report,
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: OPS_ENDPOINT,
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as TaskInterventionCreationInput;
  const report = buildAiTaskInterventionCreationGateReport(body);

  return NextResponse.json({
    ok: true,
    endpoint: OPS_ENDPOINT,
    mode: report.mode,
    generatedAt: report.generatedAt,
    report,
  });
}
