import { NextResponse, type NextRequest } from "next/server";

import {
  createAiDiagnosisPipelineDryRun,
  type AiDiagnosisPipelineInput,
} from "../../../../lib/ai/photoDiagnosisPipelineDryRun";

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

const sampleInput: AiDiagnosisPipelineInput = {
  imageFileName: "dry-run-leaf.webp",
  imageMimeType: "image/webp",
  plantContext: "vite in filare",
  locationHint: "serra nord",
  observedSymptoms: ["macchie fogliari", "ingiallimento"],
  severity: "medium",
  operatorNotes: "sample operativo pipeline dry-run",
  requestedBy: "ops-check",
  reviewMode: "human-review-required",
};

export async function GET(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  const pipeline = createAiDiagnosisPipelineDryRun(sampleInput);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-diagnosis-pipeline-dry-run",
    mode: "pipeline-dry-run",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    humanReviewRequired: true,
    pipeline,
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: AiDiagnosisPipelineInput = sampleInput;

  try {
    const payload = await request.json();
    input = payload?.input || payload || sampleInput;
  } catch {
    input = sampleInput;
  }

  const pipeline = createAiDiagnosisPipelineDryRun(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-diagnosis-pipeline-dry-run",
    mode: "pipeline-dry-run",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    humanReviewRequired: true,
    pipeline,
  });
}
