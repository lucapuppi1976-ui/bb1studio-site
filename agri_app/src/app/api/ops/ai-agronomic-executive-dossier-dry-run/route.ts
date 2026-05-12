import { NextRequest, NextResponse } from "next/server";
import {
  buildAiAgronomicExecutiveDossierReport,
  type AgronomicExecutiveDossierInput,
} from "@/lib/ai/aiAgronomicExecutiveDossier";

export const dynamic = "force-dynamic";

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
        endpoint: "/api/ops/ai-agronomic-executive-dossier-dry-run",
      },
      { status: 403 },
    );
  }

  const report = buildAiAgronomicExecutiveDossierReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-agronomic-executive-dossier-dry-run",
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
        endpoint: "/api/ops/ai-agronomic-executive-dossier-dry-run",
      },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as AgronomicExecutiveDossierInput;
  const report = buildAiAgronomicExecutiveDossierReport(body);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-agronomic-executive-dossier-dry-run",
    mode: report.mode,
    generatedAt: report.generatedAt,
    report,
  });
}
