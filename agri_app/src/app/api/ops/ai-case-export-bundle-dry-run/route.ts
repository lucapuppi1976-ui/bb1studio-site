import { NextResponse, type NextRequest } from "next/server";

import {
  createAiCaseExportBundle,
  createAiCaseExportBundleFromInput,
  createBlockedAiCaseExportBundle,
  createReadyAiCaseExportBundle,
  defaultCaseExportBundleInput,
  formatAiCaseExportBundle,
  type CaseExportBundleInput,
} from "../../../../lib/ai/aiCaseExportBundle";
import {
  defaultManualConversionAuditInput,
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
  const bundle =
    sample === "ready"
      ? createReadyAiCaseExportBundle()
      : sample === "blocked"
        ? createBlockedAiCaseExportBundle()
        : createAiCaseExportBundle();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-case-export-bundle-dry-run",
    mode: "case-export-bundle-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    taskCreated: false,
    interventionCreated: false,
    automaticExecutionPerformed: false,
    publicSharePerformed: false,
    productPrescriptionPerformed: false,
    dosageAdvicePerformed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    automaticExecutionAllowed: false,
    dbPersistenceAllowed: false,
    publicShareAllowed: false,
    manualExportOnly: true,
    humanReviewRequired: true,
    bundle,
    textBundle: formatAiCaseExportBundle(bundle),
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
  let bundleInput: CaseExportBundleInput = defaultCaseExportBundleInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
    gateInput = payload?.gateInput || gateInput;
    auditInput = payload?.auditInput || auditInput;
    bundleInput = payload?.bundleInput || bundleInput;
  } catch {
    input = createPhotoSymptomAnnotationFixture();
    gateInput = defaultExecutionGateInput;
  }

  const bundle = createAiCaseExportBundleFromInput(input, gateInput, auditInput, bundleInput);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-case-export-bundle-dry-run",
    mode: "case-export-bundle-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    taskCreated: false,
    interventionCreated: false,
    automaticExecutionPerformed: false,
    publicSharePerformed: false,
    productPrescriptionPerformed: false,
    dosageAdvicePerformed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    automaticExecutionAllowed: false,
    dbPersistenceAllowed: false,
    publicShareAllowed: false,
    manualExportOnly: true,
    humanReviewRequired: true,
    bundle,
    textBundle: formatAiCaseExportBundle(bundle),
  });
}
