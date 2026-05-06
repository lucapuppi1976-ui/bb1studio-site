import { NextResponse, type NextRequest } from "next/server";

import {
  createBlockedInterventionProtocolReport,
  createInterventionProtocolReport,
  createReadyInterventionProtocolReport,
  defaultInterventionProtocolInput,
  formatInterventionProtocolReport,
  type InterventionProtocolInput,
} from "../../../../lib/ai/aiInterventionProtocol";

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
      ? createReadyInterventionProtocolReport()
      : sample === "blocked"
        ? createBlockedInterventionProtocolReport()
        : createInterventionProtocolReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-intervention-protocol-dry-run",
    mode: "intervention-protocol-dry-run",
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
    textReport: formatInterventionProtocolReport(report),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: InterventionProtocolInput = defaultInterventionProtocolInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
  } catch {
    input = defaultInterventionProtocolInput;
  }

  const report = createInterventionProtocolReport(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-intervention-protocol-dry-run",
    mode: "intervention-protocol-dry-run",
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
    textReport: formatInterventionProtocolReport(report),
  });
}
