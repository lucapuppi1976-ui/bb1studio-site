import { NextResponse, type NextRequest } from "next/server";

import {
  createDifferentialDiagnosisMatrix,
  createIncompleteDifferentialDiagnosisMatrix,
  formatDifferentialDiagnosisMatrix,
} from "../../../../lib/ai/photoDifferentialDiagnosis";
import {
  createPhotoSymptomAnnotationFixture,
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
  const matrix =
    sample === "incomplete"
      ? createIncompleteDifferentialDiagnosisMatrix()
      : createDifferentialDiagnosisMatrix(createPhotoSymptomAnnotationFixture());

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-differential-diagnosis-dry-run",
    mode: "differential-diagnosis-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    automaticTaskCreationPerformed: false,
    automaticInterventionCreationPerformed: false,
    allowedToExecute: false,
    humanReviewRequired: true,
    matrix,
    report: formatDifferentialDiagnosisMatrix(matrix),
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

  const matrix = createDifferentialDiagnosisMatrix(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-differential-diagnosis-dry-run",
    mode: "differential-diagnosis-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    automaticTaskCreationPerformed: false,
    automaticInterventionCreationPerformed: false,
    allowedToExecute: false,
    humanReviewRequired: true,
    matrix,
    report: formatDifferentialDiagnosisMatrix(matrix),
  });
}
