import { NextResponse, type NextRequest } from "next/server";

import {
  approvedExecutionGateInput,
  createAiWorkOrderExecutionGate,
  createAiWorkOrderExecutionGateFromInput,
  defaultExecutionGateInput,
  formatAiWorkOrderExecutionGate,
  type ExecutionGateInput,
} from "../../../../lib/ai/aiWorkOrderExecutionGate";
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
  const gateInput = sample === "approved" ? approvedExecutionGateInput : defaultExecutionGateInput;
  const gate = createAiWorkOrderExecutionGate(undefined, gateInput);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-work-order-execution-gate-dry-run",
    mode: "work-order-execution-gate-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    taskCreated: false,
    interventionCreated: false,
    automaticExecutionPerformed: false,
    productPrescriptionPerformed: false,
    dosageAdvicePerformed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    automaticExecutionAllowed: false,
    manualConversionAllowed: gate.manualConversionAllowed,
    humanReviewRequired: true,
    gate,
    textGate: formatAiWorkOrderExecutionGate(gate),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input = createPhotoSymptomAnnotationFixture();
  let gateInput: ExecutionGateInput = defaultExecutionGateInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
    gateInput = payload?.gateInput || gateInput;
  } catch {
    input = createPhotoSymptomAnnotationFixture();
  }

  const gate = createAiWorkOrderExecutionGateFromInput(input, gateInput);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-work-order-execution-gate-dry-run",
    mode: "work-order-execution-gate-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    taskCreated: false,
    interventionCreated: false,
    automaticExecutionPerformed: false,
    productPrescriptionPerformed: false,
    dosageAdvicePerformed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    automaticExecutionAllowed: false,
    manualConversionAllowed: gate.manualConversionAllowed,
    humanReviewRequired: true,
    gate,
    textGate: formatAiWorkOrderExecutionGate(gate),
  });
}
