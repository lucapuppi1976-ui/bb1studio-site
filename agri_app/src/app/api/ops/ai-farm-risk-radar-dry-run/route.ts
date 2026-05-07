import { NextResponse, type NextRequest } from "next/server";

import {
  createBlockedFarmRiskRadarReport,
  createFarmRiskRadarReport,
  createReadyFarmRiskRadarReport,
  defaultFarmRiskRadarInput,
  formatFarmRiskRadarReport,
  type FarmRiskRadarInput,
} from "../../../../lib/ai/aiFarmRiskRadar";

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
      ? createReadyFarmRiskRadarReport()
      : sample === "blocked"
        ? createBlockedFarmRiskRadarReport()
        : createFarmRiskRadarReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-farm-risk-radar-dry-run",
    mode: "farm-risk-radar-dry-run",
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
    manualDispatchOnly: true,
    humanReviewRequired: true,
    localAnalysisOnly: true,
    report,
    textReport: formatFarmRiskRadarReport(report),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: FarmRiskRadarInput = defaultFarmRiskRadarInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
  } catch {
    input = defaultFarmRiskRadarInput;
  }

  const report = createFarmRiskRadarReport(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-farm-risk-radar-dry-run",
    mode: "farm-risk-radar-dry-run",
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
    manualDispatchOnly: true,
    humanReviewRequired: true,
    localAnalysisOnly: true,
    report,
    textReport: formatFarmRiskRadarReport(report),
  });
}
