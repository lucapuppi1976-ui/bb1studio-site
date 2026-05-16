export type ProviderRuntimeUatMode = "dry-run" | "provider-runtime-uat-readiness";
export type ProviderRuntimeUatSeverity = "info" | "watch" | "elevated" | "critical";
export type ProviderRuntimeUatPriority = "low" | "medium" | "high" | "urgent";
export type ProviderRuntimeUatStatus =
  | "blocked"
  | "provider-readiness-design-ready"
  | "provider-approval-review-ready"
  | "zero-call-provider-uat-ready";

export type ProviderRuntimeUatLane =
  | "provider_runtime_uat_readiness"
  | "explicit_provider_approval_proof"
  | "provider_request_boundary"
  | "provider_response_boundary"
  | "provider_rollback_proof"
  | "provider_no_go_board"
  | "pass_fail_criteria"
  | "human_signoff";

export interface ProviderRuntimeUatInput {
  approvalProofScore?: number;
  requestBoundaryScore?: number;
  responseBoundaryScore?: number;
  rollbackProofScore?: number;
  passFailScore?: number;
  scenarioCount?: number;
  reviewedScenarioCount?: number;
  openCriticalIssueCount?: number;
  openMajorIssueCount?: number;
  unresolvedGuardrailFindingCount?: number;
  reviewerRole?: string;
}

export interface ProviderRuntimeUatBoardItem {
  id: string;
  label: string;
  lane: ProviderRuntimeUatLane;
  score: number;
  priority: ProviderRuntimeUatPriority;
  severity: ProviderRuntimeUatSeverity;
  question: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface ProviderRuntimeUatFindingItem {
  id: string;
  label: string;
  lane: ProviderRuntimeUatLane;
  severity: ProviderRuntimeUatSeverity;
  reason: string;
  manualResolution: string;
  blocksProviderUat: boolean;
}

export const PROVIDER_RUNTIME_UAT_GUARDRAIL = {
  providerRuntimeUatReadinessReady: true,
  explicitProviderApprovalProofReady: true,
  providerRequestBoundaryReady: true,
  providerResponseBoundaryReady: true,
  providerRollbackProofReady: true,
  providerNoGoBoardReady: true,
  liveUatReady: true,
  onlineControlledGo: true,
  controlledDryRunProductionReady: true,
  providerAiReady: false,
  providerCalled: false,
  providerActivationAllowed: false,
  providerActivationPerformed: false,
  providerRuntimeBetaAllowed: false,
  providerRuntimeBetaPerformed: false,
  providerRuntimeCanaryAllowed: false,
  providerRuntimeCanaryPerformed: false,
  providerCanaryCallAllowed: false,
  providerCanaryCallPerformed: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  providerCallExecutionAllowed: false,
  providerCallExecutionPerformed: false,
  explicitProviderApprovalAllowed: false,
  explicitProviderApprovalPerformed: false,
  providerRequestDispatchAllowed: false,
  providerRequestDispatchPerformed: false,
  providerResponseIntakeAllowed: false,
  providerResponseIntakePerformed: false,
  providerResponseReviewAllowed: false,
  providerResponseReviewPerformed: false,
  providerResultPersistenceAllowed: false,
  providerResultPersistencePerformed: false,
  persistenceReady: false,
  memoryPersistenceReady: false,
  persistencePerformed: false,
  memoryPersistencePerformed: false,
  automaticTaskCreationReady: false,
  automaticInterventionCreationReady: false,
  automaticExecutionReady: false,
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
  incidentRecordPersistenceAllowed: false,
  incidentRecordPersistencePerformed: false,
  incidentRecordWriteAllowed: false,
  incidentRecordWritePerformed: false,
  reviewPersistenceAllowed: false,
  reviewPersistencePerformed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  operationalExecutionAllowed: false,
  operationalExecutionPerformed: false,
  executionCommandAllowed: false,
  executionCommandPerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  storageActivationAllowed: false,
  storageActivationPerformed: false,
  manualDispatchOnly: true,
  humanReviewRequired: true,
  localAnalysisOnly: true,
  redactedOutputOnly: true,
  localMemoryOnly: true,
  localLearningOnly: true,
  localPromotionOnly: true,
  localQualityOnly: true,
} as const;

export interface ProviderRuntimeUatReport {
  generatedAt: string;
  mode: ProviderRuntimeUatMode;
  context: Required<ProviderRuntimeUatInput>;
  readiness: typeof PROVIDER_RUNTIME_UAT_GUARDRAIL;
  providerUatScore: number;
  providerUatStatus: ProviderRuntimeUatStatus;
  overallSeverity: ProviderRuntimeUatSeverity;
  approvalProofBoard: ProviderRuntimeUatBoardItem[];
  requestBoundaryBoard: ProviderRuntimeUatBoardItem[];
  responseBoundaryBoard: ProviderRuntimeUatBoardItem[];
  rollbackProofBoard: ProviderRuntimeUatBoardItem[];
  noGoBoard: ProviderRuntimeUatBoardItem[];
  passFailCriteriaBoard: ProviderRuntimeUatBoardItem[];
  findings: ProviderRuntimeUatFindingItem[];
  stagedRoadmap: Record<"v184" | "v185" | "v186" | "v187" | "v188", string>;
  redactedExportBundle: {
    exportId: string;
    includesFieldIdentifiers: false;
    includesPrivateNotes: false;
    includesProviderPayloads: false;
    includesOperationalInternalData: false;
    includesProductionForecasts: false;
    includesProductRecommendations: false;
    includesDosageGuidance: false;
    sections: string[];
  };
  safetySummary: string[];
}

function normalizeInput(input: ProviderRuntimeUatInput): Required<ProviderRuntimeUatInput> {
  return {
    approvalProofScore: input.approvalProofScore ?? 84,
    requestBoundaryScore: input.requestBoundaryScore ?? 92,
    responseBoundaryScore: input.responseBoundaryScore ?? 90,
    rollbackProofScore: input.rollbackProofScore ?? 86,
    passFailScore: input.passFailScore ?? 88,
    scenarioCount: input.scenarioCount ?? 8,
    reviewedScenarioCount: input.reviewedScenarioCount ?? 0,
    openCriticalIssueCount: input.openCriticalIssueCount ?? 0,
    openMajorIssueCount: input.openMajorIssueCount ?? 0,
    unresolvedGuardrailFindingCount: input.unresolvedGuardrailFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "provider runtime UAT reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderRuntimeUatSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): ProviderRuntimeUatPriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: ProviderRuntimeUatLane,
  score: number,
  question: string,
  expectedEvidence: string[],
  safeOutcome: string,
): ProviderRuntimeUatBoardItem {
  const normalized = clampScore(score);

  return {
    id,
    label,
    lane,
    score: normalized,
    priority: priorityFromScore(normalized),
    severity: severityFromConcern(100 - normalized),
    question,
    expectedEvidence,
    safeOutcome,
  };
}

export function buildAiProviderRuntimeUatReadinessReport(
  input: ProviderRuntimeUatInput = {},
): ProviderRuntimeUatReport {
  const context = normalizeInput(input);

  const approvalProofBoard = [
    boardItem(
      "PRU_APPROVAL_001",
      "Explicit provider approval proof draft",
      "explicit_provider_approval_proof",
      context.approvalProofScore,
      "Can provider approval be reviewed without enabling runtime?",
      ["explicitProviderApprovalAllowed=false", "providerActivationAllowed=false", "human reviewer"],
      "Provider approval remains proof-only.",
    ),
    boardItem(
      "PRU_APPROVAL_002",
      "Runtime activation hold",
      "explicit_provider_approval_proof",
      100,
      "Can runtime activation remain blocked?",
      ["providerRuntimeBetaAllowed=false", "providerRuntimeCanaryAllowed=false"],
      "No provider runtime is activated.",
    ),
  ];

  const requestBoundaryBoard = [
    boardItem(
      "PRU_REQUEST_001",
      "Provider request dispatch boundary",
      "provider_request_boundary",
      100,
      "Can provider request dispatch remain blocked?",
      ["providerRequestDispatchAllowed=false", "providerCalled=false"],
      "No provider request is sent.",
    ),
    boardItem(
      "PRU_REQUEST_002",
      "Canary call boundary",
      "provider_request_boundary",
      context.requestBoundaryScore,
      "Can canary provider calls remain blocked?",
      ["providerCanaryCallAllowed=false", "providerCallAllowed=false"],
      "No canary or live provider call is made.",
    ),
  ];

  const responseBoundaryBoard = [
    boardItem(
      "PRU_RESPONSE_001",
      "Provider response intake boundary",
      "provider_response_boundary",
      context.responseBoundaryScore,
      "Can response intake remain blocked?",
      ["providerResponseIntakeAllowed=false", "providerResponseReviewAllowed=false"],
      "No provider response is received.",
    ),
    boardItem(
      "PRU_RESPONSE_002",
      "Provider result persistence boundary",
      "provider_response_boundary",
      100,
      "Can provider result persistence remain blocked?",
      ["providerResultPersistenceAllowed=false", "persistencePerformed=false"],
      "No provider result is persisted.",
    ),
  ];

  const rollbackProofBoard = [
    boardItem(
      "PRU_ROLLBACK_001",
      "Provider runtime rollback proof",
      "provider_rollback_proof",
      context.rollbackProofScore,
      "Can a future provider runtime release return to zero-call state?",
      ["rollback checkpoint", "provider call blocked", "result persistence blocked"],
      "Rollback remains available before any provider activation.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "PRU_NOGO_001",
      "Actual provider call",
      "provider_no_go_board",
      0,
      "Can actual provider calls run in V18.4?",
      ["separate release required", "explicit approval required", "rollback proof required"],
      "No-go: provider calls remain blocked.",
    ),
    boardItem(
      "PRU_NOGO_002",
      "Provider result write",
      "provider_no_go_board",
      0,
      "Can provider results be persisted in V18.4?",
      ["providerResultPersistenceAllowed=false", "dbPersistenceAllowed=false"],
      "No-go: provider result writes remain blocked.",
    ),
  ];

  const passFailCriteriaBoard = [
    boardItem(
      "PRU_PASSFAIL_001",
      "No provider call pass criterion",
      "pass_fail_criteria",
      context.passFailScore,
      "Does UAT pass only if provider calls remain absent?",
      ["providerCalled=false", "providerCallPerformed=false"],
      "Pass requires zero provider calls.",
    ),
    boardItem(
      "PRU_PASSFAIL_002",
      "No result persistence pass criterion",
      "pass_fail_criteria",
      100,
      "Does UAT pass only if result persistence remains absent?",
      ["providerResultPersistencePerformed=false", "persistencePerformed=false"],
      "Pass requires zero provider result writes.",
    ),
  ];

  const findings: ProviderRuntimeUatFindingItem[] = [];

  if (context.openCriticalIssueCount > 0) {
    findings.push({
      id: "PRU_FINDING_001",
      label: "Open critical provider UAT issue",
      lane: "provider_runtime_uat_readiness",
      severity: "critical",
      reason: String(context.openCriticalIssueCount) + " critical provider UAT issues remain open.",
      manualResolution: "Resolve critical provider readiness issues before expanding testing.",
      blocksProviderUat: true,
    });
  }

  if (context.unresolvedGuardrailFindingCount > 0) {
    findings.push({
      id: "PRU_FINDING_002",
      label: "Unresolved provider guardrail finding",
      lane: "provider_request_boundary",
      severity: "critical",
      reason: String(context.unresolvedGuardrailFindingCount) + " provider guardrail findings remain open.",
      manualResolution: "Keep provider calls, response intake and result persistence locked.",
      blocksProviderUat: true,
    });
  }

  const scenarioRatio = context.scenarioCount > 0 ? context.reviewedScenarioCount / context.scenarioCount : 0;

  const providerUatScore = clampScore(
    (context.approvalProofScore +
      context.requestBoundaryScore +
      context.responseBoundaryScore +
      context.rollbackProofScore +
      context.passFailScore) /
      5 +
      scenarioRatio * 10 -
      findings.length * 15,
  );

  const providerUatStatus: ProviderRuntimeUatStatus =
    findings.length > 0
      ? "blocked"
      : providerUatScore >= 88
        ? "zero-call-provider-uat-ready"
        : providerUatScore >= 80
          ? "provider-approval-review-ready"
          : "provider-readiness-design-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_RUNTIME_UAT_GUARDRAIL,
    providerUatScore,
    providerUatStatus,
    overallSeverity: severityFromConcern(
      context.openCriticalIssueCount * 40 +
        context.openMajorIssueCount * 20 +
        context.unresolvedGuardrailFindingCount * 45,
    ),
    approvalProofBoard,
    requestBoundaryBoard,
    responseBoundaryBoard,
    rollbackProofBoard,
    noGoBoard,
    passFailCriteriaBoard,
    findings,
    stagedRoadmap: {
      v184: "Provider runtime UAT readiness and explicit provider approval proof board.",
      v185: "Data persistence activation only after schema and rollback governance proof.",
      v186: "Live UAT expansion only after pass/fail evidence review.",
      v187: "Execution activation only after human approval, emergency stop and command audit proof.",
      v188: "Provider runtime activation only after explicit provider approval, zero-call rehearsal and rollback proof.",
    },
    redactedExportBundle: {
      exportId: "provider_runtime_uat_readiness_v18_4_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "approval proof",
        "request boundary",
        "response boundary",
        "rollback proof",
        "provider no-go board",
        "pass fail criteria",
        "findings",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider runtime UAT readiness is dry-run only.",
      "No provider call, response intake, result persistence, AI persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Explicit provider approval remains proof-only in V18.4.",
      "Human review remains mandatory.",
      "V18.4 tests provider readiness without expanding activation scope.",
    ],
  };
}

export const aiProviderRuntimeUatReadinessVersion = "V18.4";
