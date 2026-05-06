import { NextResponse, type NextRequest } from "next/server";

import {
  createAiCaseExportArchive,
  createAiCaseExportArchiveFromInput,
  createBlockedAiCaseExportArchive,
  createReadyAiCaseExportArchive,
  defaultCaseExportArchiveInput,
  formatAiCaseExportArchive,
  type CaseExportArchiveInput,
} from "../../../../lib/ai/aiCaseExportArchive";
import {
  defaultCaseExportBundleInput,
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
  const archive =
    sample === "ready"
      ? createReadyAiCaseExportArchive()
      : sample === "blocked"
        ? createBlockedAiCaseExportArchive()
        : createAiCaseExportArchive();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-case-export-archive-dry-run",
    mode: "case-export-archive-dry-run",
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
    manualDownloadOnly: true,
    manualExportOnly: true,
    humanReviewRequired: true,
    archive,
    textArchive: formatAiCaseExportArchive(archive),
    jsonArchive: archive.jsonArchive,
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
  let archiveInput: CaseExportArchiveInput = defaultCaseExportArchiveInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
    gateInput = payload?.gateInput || gateInput;
    auditInput = payload?.auditInput || auditInput;
    bundleInput = payload?.bundleInput || bundleInput;
    archiveInput = payload?.archiveInput || archiveInput;
  } catch {
    input = createPhotoSymptomAnnotationFixture();
    gateInput = defaultExecutionGateInput;
  }

  const archive = createAiCaseExportArchiveFromInput(
    input,
    gateInput,
    auditInput,
    bundleInput,
    archiveInput,
  );

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-case-export-archive-dry-run",
    mode: "case-export-archive-dry-run",
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
    manualDownloadOnly: true,
    manualExportOnly: true,
    humanReviewRequired: true,
    archive,
    textArchive: formatAiCaseExportArchive(archive),
    jsonArchive: archive.jsonArchive,
  });
}
