import { NextResponse, type NextRequest } from "next/server";

import {
  createBlockedCaseMemoryGraphReport,
  createCaseMemoryGraphReport,
  createReadyCaseMemoryGraphReport,
  defaultCaseMemoryGraphInput,
  formatCaseMemoryGraphReport,
  type CaseMemoryGraphInput,
} from "../../../../lib/ai/aiCaseMemoryGraph";

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
      ? createReadyCaseMemoryGraphReport()
      : sample === "blocked"
        ? createBlockedCaseMemoryGraphReport()
        : createCaseMemoryGraphReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-case-memory-graph-dry-run",
    mode: "case-memory-graph-dry-run",
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
    localMemoryOnly: true,
    report,
    textReport: formatCaseMemoryGraphReport(report),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: CaseMemoryGraphInput = defaultCaseMemoryGraphInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
  } catch {
    input = defaultCaseMemoryGraphInput;
  }

  const report = createCaseMemoryGraphReport(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-case-memory-graph-dry-run",
    mode: "case-memory-graph-dry-run",
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
    localMemoryOnly: true,
    report,
    textReport: formatCaseMemoryGraphReport(report),
  });
}
