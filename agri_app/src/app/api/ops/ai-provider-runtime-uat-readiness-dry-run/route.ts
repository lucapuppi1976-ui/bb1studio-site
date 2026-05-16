import { NextRequest, NextResponse } from "next/server";
import {
  buildAiProviderRuntimeUatReadinessReport,
  type ProviderRuntimeUatInput,
} from "@/lib/ai/aiProviderRuntimeUatReadiness";

export const dynamic = "force-dynamic";

function readBearerToken(request: NextRequest): string {
  const authorization = request.headers.get("authorization") ?? "";

  if (!authorization.startsWith("Bearer ")) {
    return "";
  }

  return authorization.slice("Bearer ".length).trim();
}

function isAllowed(request: NextRequest): boolean {
  const expectedValue = process.env.CRON_SECRET;
  const receivedValue = readBearerToken(request);

  return Boolean(expectedValue && receivedValue === expectedValue);
}

export async function GET(request: NextRequest) {
  if (!isAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/ai-provider-runtime-uat-readiness-dry-run",
      },
      { status: 403 },
    );
  }

  const report = buildAiProviderRuntimeUatReadinessReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-provider-runtime-uat-readiness-dry-run",
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
        endpoint: "/api/ops/ai-provider-runtime-uat-readiness-dry-run",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as ProviderRuntimeUatInput;
  const report = buildAiProviderRuntimeUatReadinessReport(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-provider-runtime-uat-readiness-dry-run",
    mode: report.mode,
    generatedAt: report.generatedAt,
    report,
  });
}
