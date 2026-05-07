import { NextResponse, type NextRequest } from "next/server";

import {
  createBlockedCaseOutcomeLearningReport,
  createCaseOutcomeLearningReport,
  createReadyCaseOutcomeLearningReport,
  defaultCaseOutcomeLearningInput,
  formatCaseOutcomeLearningReport,
  type CaseOutcomeLearningInput,
} from "../../../../lib/ai/aiCaseOutcomeLearning";

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
      ? createReadyCaseOutcomeLearningReport()
      : sample === "blocked"
        ? createBlockedCaseOutcomeLearningReport()
        : createCaseOutcomeLearningReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-case-outcome-learning-dry-run",
    mode: "case-outcome-learning-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    memoryPersistencePerformed: false,
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
    memoryPersistenceAllowed: false,
    publicShareAllowed: false,
    productPrescriptionAllowed: false,
    dosageAdviceAllowed: false,
    manualDispatchOnly: true,
    humanReviewRequired: true,
    localAnalysisOnly: true,
    localLearningOnly: true,
    localMemoryOnly: true,
    report,
    textReport: formatCaseOutcomeLearningReport(report),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: CaseOutcomeLearningInput = defaultCaseOutcomeLearningInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
  } catch {
    input = defaultCaseOutcomeLearningInput;
  }

  const report = createCaseOutcomeLearningReport(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-case-outcome-learning-dry-run",
    mode: "case-outcome-learning-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    memoryPersistencePerformed: false,
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
    memoryPersistenceAllowed: false,
    publicShareAllowed: false,
    productPrescriptionAllowed: false,
    dosageAdviceAllowed: false,
    manualDispatchOnly: true,
    humanReviewRequired: true,
    localAnalysisOnly: true,
    localLearningOnly: true,
    localMemoryOnly: true,
    report,
    textReport: formatCaseOutcomeLearningReport(report),
  });
}
