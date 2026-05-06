import { NextResponse, type NextRequest } from "next/server";

import {
  createAiWorkOrderPreview,
  createAiWorkOrderPreviewFromInput,
  createIncompleteAiWorkOrderPreview,
  formatAiWorkOrderPreview,
} from "../../../../lib/ai/aiWorkOrderPreview";
import { createPhotoSymptomAnnotationFixture } from "../../../../lib/ai/photoSymptomAnnotation";

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
  const preview =
    sample === "incomplete" ? createIncompleteAiWorkOrderPreview() : createAiWorkOrderPreview();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-work-order-preview-dry-run",
    mode: "work-order-preview-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    taskCreated: false,
    interventionCreated: false,
    productPrescriptionPerformed: false,
    dosageAdvicePerformed: false,
    allowedToCreateTask: false,
    allowedToCreateIntervention: false,
    allowedToExecute: false,
    humanReviewRequired: true,
    preview,
    textWorkOrder: formatAiWorkOrderPreview(preview),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input = createPhotoSymptomAnnotationFixture();

  try {
    const payload = await request.json();
    input = payload?.input || payload || input;
  } catch {
    input = createPhotoSymptomAnnotationFixture();
  }

  const preview = createAiWorkOrderPreviewFromInput(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-work-order-preview-dry-run",
    mode: "work-order-preview-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    taskCreated: false,
    interventionCreated: false,
    productPrescriptionPerformed: false,
    dosageAdvicePerformed: false,
    allowedToCreateTask: false,
    allowedToCreateIntervention: false,
    allowedToExecute: false,
    humanReviewRequired: true,
    preview,
    textWorkOrder: formatAiWorkOrderPreview(preview),
  });
}
