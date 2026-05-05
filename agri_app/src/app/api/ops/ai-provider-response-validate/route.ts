import { NextResponse, type NextRequest } from "next/server";

import {
  createInvalidProviderResponseFixture,
  createValidProviderResponseFixture,
  formatProviderValidationReport,
  validateProviderDiagnosisResponse,
  type ProviderDiagnosisResponseCandidate,
} from "../../../../lib/ai/photoDiagnosisProviderResponse";

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

  const fixture =
    request.nextUrl.searchParams.get("sample") === "invalid"
      ? createInvalidProviderResponseFixture()
      : createValidProviderResponseFixture();

  const validation = validateProviderDiagnosisResponse(fixture);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-provider-response-validate",
    mode: "response-contract-validation",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    humanReviewRequired: true,
    validation,
    report: formatProviderValidationReport(validation),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let candidate: ProviderDiagnosisResponseCandidate = createValidProviderResponseFixture();

  try {
    const payload = await request.json();
    candidate = payload?.candidate || payload || candidate;
  } catch {
    candidate = createValidProviderResponseFixture();
  }

  const validation = validateProviderDiagnosisResponse(candidate);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-provider-response-validate",
    mode: "response-contract-validation",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    humanReviewRequired: true,
    validation,
    report: formatProviderValidationReport(validation),
  });
}
