import { NextResponse, type NextRequest } from "next/server";

import {
  createAiFieldIntelligenceReport,
  createBlockedAiFieldIntelligenceReport,
  createReadyAiFieldIntelligenceReport,
  defaultFieldIntelligenceInput,
  formatAiFieldIntelligenceReport,
  type FieldIntelligenceCaseInput,
} from "../../../../lib/ai/aiFieldIntelligence";

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
      ? createReadyAiFieldIntelligenceReport()
      : sample === "blocked"
        ? createBlockedAiFieldIntelligenceReport()
        : createAiFieldIntelligenceReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-field-intelligence-dry-run",
    mode: "field-intelligence-dry-run",
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
    textReport: formatAiFieldIntelligenceReport(report),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: FieldIntelligenceCaseInput = defaultFieldIntelligenceInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
  } catch {
    input = defaultFieldIntelligenceInput;
  }

  const report = createAiFieldIntelligenceReport(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-field-intelligence-dry-run",
    mode: "field-intelligence-dry-run",
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
    textReport: formatAiFieldIntelligenceReport(report),
  });
}
