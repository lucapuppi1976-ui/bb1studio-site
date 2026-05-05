import { NextResponse, type NextRequest } from "next/server";

import {
  createIncompleteEvidenceBundleFixture,
  createPhotoEvidenceBundle,
  createValidEvidenceBundleFixture,
  formatPhotoEvidenceBundle,
  type PhotoEvidenceBundleInput,
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

  const fixture =
    request.nextUrl.searchParams.get("sample") === "incomplete"
      ? createIncompleteEvidenceBundleFixture()
      : createValidEvidenceBundleFixture();

  const bundle = createPhotoEvidenceBundle(fixture);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-photo-evidence-bundle",
    mode: "photo-evidence-bundle",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    humanReviewRequired: true,
    bundle,
    report: formatPhotoEvidenceBundle(bundle),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: PhotoEvidenceBundleInput = createValidEvidenceBundleFixture();

  try {
    const payload = await request.json();
    input = payload?.input || payload || input;
  } catch {
    input = createValidEvidenceBundleFixture();
  }

  const bundle = createPhotoEvidenceBundle(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-photo-evidence-bundle",
    mode: "photo-evidence-bundle",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    humanReviewRequired: true,
    bundle,
    report: formatPhotoEvidenceBundle(bundle),
  });
}
