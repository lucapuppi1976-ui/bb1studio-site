import { NextResponse, type NextRequest } from "next/server";

import {
  createAiProviderRequestPreview,
  formatAiProviderRequestPreview,
  type AiProviderRequestPreviewInput,
} from "../../../../lib/ai/photoDiagnosisProviderRequest";
import {
  createIncompleteEvidenceBundleFixture,
  createValidEvidenceBundleFixture,
} from "../../../../lib/ai/photoEvidenceBundle";

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

  const requestPreview = createAiProviderRequestPreview(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-provider-request-preview",
    mode: "provider-request-preview",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    clientProviderCallsAllowed: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    humanReviewRequired: true,
    requestPreview,
    report: formatAiProviderRequestPreview(requestPreview),
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

  const requestPreview = createAiProviderRequestPreview(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-provider-request-preview",
    mode: "provider-request-preview",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    clientProviderCallsAllowed: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    humanReviewRequired: true,
    requestPreview,
    report: formatAiProviderRequestPreview(requestPreview),
  });
}
