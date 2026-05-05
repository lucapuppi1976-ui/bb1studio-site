import { NextResponse, type NextRequest } from "next/server";

import {
  createDiagnosisOrchestratorDryRun,
  formatDiagnosisOrchestratorDryRun,
} from "../../../../lib/ai/photoDiagnosisOrchestratorDryRun";
import {
  createIncompleteEvidenceBundleFixture,
  createValidEvidenceBundleFixture,
} from "../../../../lib/ai/photoEvidenceBundle";
import type { AiProviderRequestPreviewInput } from "../../../../lib/ai/photoDiagnosisProviderRequest";

export const dynamic = "force-dynamic";

function hasSecretAccess(request: NextRequest) {
  const expected = (process.env.CRON_SECRET || "").trim();

  if (!expected) {
    return false;
  }

  const provided = (request.nextUrl.searchParams.get("secret") || "").trim();
  return provided === expected;
}

function forbidden(request: NextRequest) {
  if (hasSecretAccess(request)) {
    return null;
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Accesso non consentito.",
    },
    { status: 403 },
  );
}

export async function GET(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  const sample = request.nextUrl.searchParams.get("sample");
  const input =
    sample === "incomplete"
      ? createIncompleteEvidenceBundleFixture()
      : createValidEvidenceBundleFixture();

  const dryRun = createDiagnosisOrchestratorDryRun(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-diagnosis-orchestrator-dry-run",
    mode: "diagnosis-orchestrator-dry-run",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    clientProviderCallsAllowed: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    humanReviewRequired: true,
    dryRun,
    report: formatDiagnosisOrchestratorDryRun(dryRun),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: AiProviderRequestPreviewInput = createValidEvidenceBundleFixture();

  try {
    const payload = await request.json();
    input = payload?.input || payload || input;
  } catch {
    input = createValidEvidenceBundleFixture();
  }

  const dryRun = createDiagnosisOrchestratorDryRun(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-diagnosis-orchestrator-dry-run",
    mode: "diagnosis-orchestrator-dry-run",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    clientProviderCallsAllowed: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    humanReviewRequired: true,
    dryRun,
    report: formatDiagnosisOrchestratorDryRun(dryRun),
  });
}
