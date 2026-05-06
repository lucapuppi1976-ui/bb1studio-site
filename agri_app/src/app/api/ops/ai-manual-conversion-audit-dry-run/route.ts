import { NextResponse, type NextRequest } from "next/server";

import {
  createAiManualConversionAudit,
  createAiManualConversionAuditFromInput,
  createBlockedAiManualConversionAudit,
  createReadyAiManualConversionAudit,
  defaultManualConversionAuditInput,
  formatAiManualConversionAudit,
  type ManualConversionAuditInput,
} from "../../../../lib/ai/aiManualConversionAudit";
import {
  approvedExecutionGateInput,
  defaultExecutionGateInput,
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
  const audit =
    sample === "ready"
      ? createReadyAiManualConversionAudit()
      : sample === "blocked"
        ? createBlockedAiManualConversionAudit()
        : createAiManualConversionAudit();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-manual-conversion-audit-dry-run",
    mode: "manual-conversion-audit-dry-run",
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
    dbPersistenceAllowed: false,
    manualConversionOnly: true,
    humanReviewRequired: true,
    audit,
    textAudit: formatAiManualConversionAudit(audit),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input = createPhotoSymptomAnnotationFixture();
  let gateInput: ExecutionGateInput = approvedExecutionGateInput;
  let auditInput: ManualConversionAuditInput = defaultManualConversionAuditInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
    gateInput = payload?.gateInput || gateInput;
    auditInput = payload?.auditInput || auditInput;
  } catch {
    input = createPhotoSymptomAnnotationFixture();
    gateInput = defaultExecutionGateInput;
  }

  const audit = createAiManualConversionAuditFromInput(input, gateInput, auditInput);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-manual-conversion-audit-dry-run",
    mode: "manual-conversion-audit-dry-run",
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
    dbPersistenceAllowed: false,
    manualConversionOnly: true,
    humanReviewRequired: true,
    audit,
    textAudit: formatAiManualConversionAudit(audit),
  });
}
