import { NextResponse, type NextRequest } from "next/server";

import {
  createBlockedTemporalTrendReport,
  createReadyTemporalTrendReport,
  createTemporalTrendReport,
  defaultTemporalTrendInput,
  formatTemporalTrendReport,
  type TemporalTrendInput,
} from "../../../../lib/ai/aiTemporalTrend";

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
      ? createReadyTemporalTrendReport()
      : sample === "blocked"
        ? createBlockedTemporalTrendReport()
        : createTemporalTrendReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-temporal-trend-dry-run",
    mode: "temporal-field-trend-dry-run",
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
    localAnalysisOnly: true,
    report,
    textReport: formatTemporalTrendReport(report),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: TemporalTrendInput = defaultTemporalTrendInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
  } catch {
    input = defaultTemporalTrendInput;
  }

  const report = createTemporalTrendReport(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-temporal-trend-dry-run",
    mode: "temporal-field-trend-dry-run",
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
    localAnalysisOnly: true,
    report,
    textReport: formatTemporalTrendReport(report),
  });
}
