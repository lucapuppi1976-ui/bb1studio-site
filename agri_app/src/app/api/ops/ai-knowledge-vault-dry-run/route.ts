import { NextRequest, NextResponse } from "next/server";
import { buildAiKnowledgeVaultGovernanceReport } from "@/lib/ai/aiKnowledgeVaultGovernance";

export const dynamic = "force-dynamic";

function readBearerToken(request: NextRequest): string {
  const authorization = request.headers.get("authorization") ?? "";

  if (!authorization.startsWith("Bearer ")) {
    return "";
  }

  return authorization.slice("Bearer ".length).trim();
}

export async function GET(request: NextRequest) {
  const expectedToken = process.env.CRON_SECRET;
  const receivedToken = readBearerToken(request);

  if (!expectedToken || receivedToken !== expectedToken) {
    return NextResponse.json(
      {
        ok: false,
        error: "Accesso non consentito.",
        endpoint: "/api/ops/ai-knowledge-vault-dry-run",
      },
      { status: 403 },
    );
  }

  const report = buildAiKnowledgeVaultGovernanceReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-knowledge-vault-dry-run",
    mode: report.mode,
    generatedAt: report.generatedAt,
    report,
  });
}
