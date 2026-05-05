import { NextResponse, type NextRequest } from "next/server";

import {
  assessPhotoQuality,
  createInvalidPhotoQualityFixture,
  createValidPhotoQualityFixture,
  formatPhotoQualityAssessment,
  type PhotoQualityInput,
} from "../../../../lib/ai/photoQualityGate";

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

  const sample =
    request.nextUrl.searchParams.get("sample") === "invalid"
      ? createInvalidPhotoQualityFixture()
      : createValidPhotoQualityFixture();

  const assessment = assessPhotoQuality(sample);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-photo-quality-gate",
    mode: "photo-quality-gate",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    humanReviewRequired: true,
    assessment,
    report: formatPhotoQualityAssessment(assessment),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: PhotoQualityInput = createValidPhotoQualityFixture();

  try {
    const payload = await request.json();
    input = payload?.input || payload || input;
  } catch {
    input = createValidPhotoQualityFixture();
  }

  const assessment = assessPhotoQuality(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-photo-quality-gate",
    mode: "photo-quality-gate",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    humanReviewRequired: true,
    assessment,
    report: formatPhotoQualityAssessment(assessment),
  });
}
