import { NextResponse, type NextRequest } from "next/server";

import {
  createDryRunProviderRequest,
  createDryRunProviderResult,
  dryRunAcceptedImageTypes,
  dryRunMaxImageSizeMb,
  type DryRunDiagnosisInput,
} from "../../../../lib/ai/photoDiagnosisDryRun";

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

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-provider-dry-run",
    mode: "dry-run",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    humanReviewRequired: true,
    acceptedImageTypes: dryRunAcceptedImageTypes,
    maxImageSizeMb: dryRunMaxImageSizeMb,
    note: "Endpoint operativo dry-run: nessuna chiamata provider AI viene eseguita.",
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let payload: DryRunDiagnosisInput = {};

  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const providerRequest = createDryRunProviderRequest(payload);
  const providerResult = createDryRunProviderResult(payload);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-provider-dry-run",
    providerRequest,
    providerResult,
    guardrails: {
      providerCallsEnabled: false,
      externalProviderCalled: false,
      noClientProviderCalls: true,
      noAutomaticDbWrites: true,
      noAutomaticTaskCreation: true,
      noAutomaticInterventionCreation: true,
      humanReviewRequired: true,
    },
  });
}
