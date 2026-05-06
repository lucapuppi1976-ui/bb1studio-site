import { NextResponse, type NextRequest } from "next/server";

import {
  createBlockedInterventionReadinessReport,
  createInterventionReadinessReport,
  createReadyInterventionReadinessReport,
  defaultInterventionReadinessInput,
  formatInterventionReadinessReport,
  type InterventionReadinessInput,
} from "../../../../lib/ai/aiInterventionReadiness";

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
  const report =
    sample === "ready"
      ? createReadyInterventionReadinessReport()
      : sample === "blocked"
        ? createBlockedInterventionReadinessReport()
        : createInterventionReadinessReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-intervention-readiness-dry-run",
    mode: "intervention-readiness-dry-run",
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
    productPrescriptionAllowed: false,
    dosageAdviceAllowed: false,
    humanReviewRequired: true,
    manualConversionOnly: true,
    localAnalysisOnly: true,
    report,
    textReport: formatInterventionReadinessReport(report),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: InterventionReadinessInput = defaultInterventionReadinessInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
  } catch {
    input = defaultInterventionReadinessInput;
  }

  const report = createInterventionReadinessReport(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-intervention-readiness-dry-run",
    mode: "intervention-readiness-dry-run",
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
    productPrescriptionAllowed: false,
    dosageAdviceAllowed: false,
    humanReviewRequired: true,
    manualConversionOnly: true,
    localAnalysisOnly: true,
    report,
    textReport: formatInterventionReadinessReport(report),
  });
}
