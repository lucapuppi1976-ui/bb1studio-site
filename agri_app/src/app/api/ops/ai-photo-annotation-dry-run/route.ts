import { NextResponse, type NextRequest } from "next/server";

import {
  createIncompletePhotoSymptomAnnotationFixture,
  createPhotoSymptomAnnotationFixture,
  createPhotoSymptomAnnotationMap,
  formatPhotoSymptomAnnotationMap,
  type PhotoSymptomAnnotationInput,
} from "../../../../lib/ai/photoSymptomAnnotation";

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
      ? createIncompletePhotoSymptomAnnotationFixture()
      : createPhotoSymptomAnnotationFixture();

  const annotationMap = createPhotoSymptomAnnotationMap(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-photo-annotation-dry-run",
    mode: "photo-symptom-annotation-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    automaticTaskCreationPerformed: false,
    automaticInterventionCreationPerformed: false,
    allowedToExecute: false,
    humanReviewRequired: true,
    annotationMap,
    report: formatPhotoSymptomAnnotationMap(annotationMap),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: PhotoSymptomAnnotationInput = createPhotoSymptomAnnotationFixture();

  try {
    const payload = await request.json();
    input = payload?.input || payload || input;
  } catch {
    input = createPhotoSymptomAnnotationFixture();
  }

  const annotationMap = createPhotoSymptomAnnotationMap(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-photo-annotation-dry-run",
    mode: "photo-symptom-annotation-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    automaticTaskCreationPerformed: false,
    automaticInterventionCreationPerformed: false,
    allowedToExecute: false,
    humanReviewRequired: true,
    annotationMap,
    report: formatPhotoSymptomAnnotationMap(annotationMap),
  });
}
