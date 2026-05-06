import { NextResponse, type NextRequest } from "next/server";

import {
  createBlockedFollowUpSchedulerReport,
  createFollowUpSchedulerReport,
  createReadyFollowUpSchedulerReport,
  defaultFollowUpSchedulerInput,
  formatFollowUpSchedulerReport,
  type FollowUpSchedulerInput,
} from "../../../../lib/ai/aiFollowUpScheduler";

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
      ? createReadyFollowUpSchedulerReport()
      : sample === "blocked"
        ? createBlockedFollowUpSchedulerReport()
        : createFollowUpSchedulerReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-follow-up-scheduler-dry-run",
    mode: "follow-up-scheduler-dry-run",
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
    humanReviewRequired: true,
    manualConversionOnly: true,
    localAnalysisOnly: true,
    report,
    textReport: formatFollowUpSchedulerReport(report),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: FollowUpSchedulerInput = defaultFollowUpSchedulerInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
  } catch {
    input = defaultFollowUpSchedulerInput;
  }

  const report = createFollowUpSchedulerReport(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-follow-up-scheduler-dry-run",
    mode: "follow-up-scheduler-dry-run",
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
    humanReviewRequired: true,
    manualConversionOnly: true,
    localAnalysisOnly: true,
    report,
    textReport: formatFollowUpSchedulerReport(report),
  });
}
