import { NextResponse, type NextRequest } from "next/server";

import {
  createBlockedMemoryPromotionGovernanceReport,
  createMemoryPromotionGovernanceReport,
  createReadyMemoryPromotionGovernanceReport,
  defaultMemoryPromotionInput,
  formatMemoryPromotionGovernanceReport,
  type MemoryPromotionInput,
} from "../../../../lib/ai/aiMemoryPromotionGovernance";

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
      ? createReadyMemoryPromotionGovernanceReport()
      : sample === "blocked"
        ? createBlockedMemoryPromotionGovernanceReport()
        : createMemoryPromotionGovernanceReport();

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-memory-promotion-dry-run",
    mode: "memory-promotion-governance-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    memoryPersistencePerformed: false,
    memoryPromotionPerformed: false,
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
    memoryPromotionAllowed: false,
    publicShareAllowed: false,
    productPrescriptionAllowed: false,
    dosageAdviceAllowed: false,
    manualDispatchOnly: true,
    humanReviewRequired: true,
    localAnalysisOnly: true,
    localPromotionOnly: true,
    localMemoryOnly: true,
    report,
    textReport: formatMemoryPromotionGovernanceReport(report),
  });
}

export async function POST(request: NextRequest) {
  const denied = forbidden(request);

  if (denied) {
    return denied;
  }

  let input: MemoryPromotionInput = defaultMemoryPromotionInput;

  try {
    const payload = await request.json();
    input = payload?.input || input;
  } catch {
    input = defaultMemoryPromotionInput;
  }

  const report = createMemoryPromotionGovernanceReport(input);

  return NextResponse.json({
    ok: true,
    endpoint: "/api/ops/ai-memory-promotion-dry-run",
    mode: "memory-promotion-governance-dry-run",
    providerCalled: false,
    persistencePerformed: false,
    memoryPersistencePerformed: false,
    memoryPromotionPerformed: false,
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
    memoryPromotionAllowed: false,
    publicShareAllowed: false,
    productPrescriptionAllowed: false,
    dosageAdviceAllowed: false,
    manualDispatchOnly: true,
    humanReviewRequired: true,
    localAnalysisOnly: true,
    localPromotionOnly: true,
    localMemoryOnly: true,
    report,
    textReport: formatMemoryPromotionGovernanceReport(report),
  });
}
