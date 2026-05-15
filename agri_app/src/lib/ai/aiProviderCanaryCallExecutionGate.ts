export type ProviderCanaryCallMode = "dry-run" | "provider-board-review";

export type ProviderCanaryCallSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderCanaryCallPriority = "low" | "medium" | "high" | "urgent";

export type ProviderCanaryCallReadinessBand =
  | "blocked"
  | "call-gate-design-ready"
  | "manual-board-review-ready"
  | "zero-call-plan-ready";

export type ProviderCanaryCallLane =
  | "provider_call_gate"
  | "explicit_provider_approval"
  | "provider_request_boundary"
  | "budget_envelope"
  | "reviewer_approval"
  | "provider_result_boundary"
  | "rollback_call_plan"
  | "human_signoff";

export interface ProviderCanaryCallGuardrail {
  providerAiReady: false;
  persistenceReady: false;
  memoryPersistenceReady: false;
  automaticTaskCreationReady: false;
  automaticInterventionCreationReady: false;
  automaticExecutionReady: false;
  providerCalled: false;
  persistencePerformed: false;
  memoryPersistencePerformed: false;
  taskCreated: false;
  interventionCreated: false;
  automaticExecutionPerformed: false;
  publicSharePerformed: false;
  productPrescriptionPerformed: false;
  dosageAdvicePerformed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
  automaticExecutionAllowed: false;
  dbPersistenceAllowed: false;
  memoryPersistenceAllowed: false;
  publicShareAllowed: false;
  productPrescriptionAllowed: false;
  dosageAdviceAllowed: false;
  manualDispatchOnly: true;
  humanReviewRequired: true;
  localAnalysisOnly: true;
  redactedOutputOnly: true;
  localMemoryOnly: true;
  localLearningOnly: true;
  localPromotionOnly: true;
  localQualityOnly: true;
  memoryPromotionAllowed: false;
  memoryQualityWriteAllowed: false;
  memoryPromotionPerformed: false;
  memoryQualityWritePerformed: false;
  onlineControlledReady: true;
  operationalAiReady: false;
  controlledBetaAllowed: false;
  controlledBetaPerformed: false;
  productionBetaAllowed: false;
  productionBetaPerformed: false;
  zeroActivationMode: true;
  providerActivationAllowed: false;
  providerActivationPerformed: false;
  providerRuntimeBetaAllowed: false;
  providerRuntimeBetaPerformed: false;
  providerRuntimeCanaryAllowed: false;
  providerRuntimeCanaryPerformed: false;
  providerCanaryCallAllowed: false;
  providerCanaryCallPerformed: false;
  providerCanaryCallExecutionAllowed: false;
  providerCanaryCallExecutionPerformed: false;
  explicitProviderApprovalAllowed: false;
  explicitProviderApprovalPerformed: false;
  providerRequestSendAllowed: false;
  providerRequestSendPerformed: false;
  providerResultReviewAllowed: false;
  providerResultReviewPerformed: false;
  canaryExecutionAllowed: false;
  canaryExecutionPerformed: false;
  canaryResultPersistenceAllowed: false;
  canaryResultPersistencePerformed: false;
  explicitActivationApprovalAllowed: false;
  explicitActivationApprovalPerformed: false;
  productionRuntimeAllowed: false;
  productionRuntimePerformed: false;
  casePersistenceActivationAllowed: false;
  casePersistencePerformed: false;
  storageActivationAllowed: false;
  storageActivationPerformed: false;
  liveMigrationExecutionAllowed: false;
  liveMigrationExecutionPerformed: false;
  migrationExecutionAllowed: false;
  migrationExecutionPerformed: false;
  schemaWriteAllowed: false;
  schemaWritePerformed: false;
  automationActivationAllowed: false;
  reviewPersistenceAllowed: false;
  reviewPersistencePerformed: false;
  manualConversionAllowed: false;
  manualConversionPerformed: false;
  providerCallAllowed: false;
  providerCallPerformed: false;
  complianceExportAllowed: false;
  complianceExportPerformed: false;
  publicComplianceExportPublicationAllowed: false;
  publicComplianceExportPublicationPerformed: false;
  manualDispatchActivationAllowed: false;
  manualDispatchActivationPerformed: false;
  manualDispatchWritePathAllowed: false;
  manualDispatchWritePathPerformed: false;
  incidentHandlingAllowed: false;
  incidentHandlingPerformed: false;
  incidentWriteAllowed: false;
  incidentWritePerformed: false;
  providerCanaryCallExecutionGateReady: true;
  explicitProviderApprovalLockReady: true;
  providerResultBoundaryReady: true;
  canaryCallNoGoReady: true;
}

export interface ProviderCanaryCallInput {
  callGateItemCount?: number;
  providerApprovalItemCount?: number;
  requestBoundaryItemCount?: number;
  budgetEnvelopeItemCount?: number;
  reviewerApprovalItemCount?: number;
  resultBoundaryItemCount?: number;
  openCallGapCount?: number;
  onlineReadinessScore?: number;
  canaryExecutionScore?: number;
  manualWritePathScore?: number;
  incidentHandlingScore?: number;
  providerContractScore?: number;
  budgetEnvelopeScore?: number;
  reviewerApprovalScore?: number;
  providerLeadRole?: string;
}

export interface ProviderCanaryCallSourceNode {
  id: string;
  lane: ProviderCanaryCallLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderCanaryCallSeverity;
  priority: ProviderCanaryCallPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ProviderCallGateItem {
  id: string;
  label: string;
  lane: ProviderCanaryCallLane;
  gateScore: number;
  severity: ProviderCanaryCallSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ExplicitProviderApprovalItem {
  id: string;
  label: string;
  lane: ProviderCanaryCallLane;
  approvalScore: number;
  priority: ProviderCanaryCallPriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ProviderRequestBoundaryItem {
  id: string;
  label: string;
  lane: ProviderCanaryCallLane;
  boundaryScore: number;
  severity: ProviderCanaryCallSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface CanaryCallBudgetEnvelopeItem {
  id: string;
  label: string;
  lane: ProviderCanaryCallLane;
  budgetScore: number;
  priority: ProviderCanaryCallPriority;
  budgetQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface ReviewerProviderApprovalItem {
  id: string;
  label: string;
  lane: ProviderCanaryCallLane;
  approvalScore: number;
  severity: ProviderCanaryCallSeverity;
  approvalQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface ProviderResultBoundaryItem {
  id: string;
  label: string;
  lane: ProviderCanaryCallLane;
  boundaryScore: number;
  severity: ProviderCanaryCallSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface RollbackProviderCallPlanItem {
  id: string;
  label: string;
  lane: ProviderCanaryCallLane;
  rollbackScore: number;
  priority: ProviderCanaryCallPriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface ProviderCallNoGoItem {
  id: string;
  label: string;
  lane: ProviderCanaryCallLane;
  goNoGoState: "no-go" | "design-only" | "zero-call-plan-ready";
  score: number;
  severity: ProviderCanaryCallSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface ProviderCallGateCheckItem {
  id: string;
  label: string;
  lane: ProviderCanaryCallLane;
  passed: boolean;
  score: number;
  severity: ProviderCanaryCallSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ProviderCallBoardPackItem {
  id: string;
  label: string;
  lane: ProviderCanaryCallLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ProviderCallFindingItem {
  id: string;
  label: string;
  lane: ProviderCanaryCallLane;
  severity: ProviderCanaryCallSeverity;
  reason: string;
  manualResolution: string;
  blocksProviderCallActivation: boolean;
}

export interface ProviderCanaryCallExecutionReport {
  generatedAt: string;
  mode: ProviderCanaryCallMode;
  context: Required<ProviderCanaryCallInput>;
  readiness: ProviderCanaryCallGuardrail;
  providerCallScore: number;
  providerCallStatus: ProviderCanaryCallReadinessBand;
  overallSeverity: ProviderCanaryCallSeverity;
  sourceNodes: ProviderCanaryCallSourceNode[];
  providerCallGate: ProviderCallGateItem[];
  explicitProviderApprovalLock: ExplicitProviderApprovalItem[];
  providerRequestBoundary: ProviderRequestBoundaryItem[];
  canaryCallBudgetEnvelope: CanaryCallBudgetEnvelopeItem[];
  reviewerProviderApproval: ReviewerProviderApprovalItem[];
  providerResultBoundary: ProviderResultBoundaryItem[];
  rollbackProviderCallPlan: RollbackProviderCallPlanItem[];
  providerCallNoGoBoard: ProviderCallNoGoItem[];
  providerCallGateChecks: ProviderCallGateCheckItem[];
  providerCallBoardPack: ProviderCallBoardPackItem[];
  providerCallFindings: ProviderCallFindingItem[];
  stagedRoadmap: {
    v172: string;
    v173: string;
    v174: string;
    v175: string;
    v176: string;
  };
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

export const PROVIDER_CANARY_CALL_GUARDRAIL: ProviderCanaryCallGuardrail = {
  providerAiReady: false,
  persistenceReady: false,
  memoryPersistenceReady: false,
  automaticTaskCreationReady: false,
  automaticInterventionCreationReady: false,
  automaticExecutionReady: false,
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
  redactedOutputOnly: true,
  localMemoryOnly: true,
  localLearningOnly: true,
  localPromotionOnly: true,
  localQualityOnly: true,
  memoryPromotionAllowed: false,
  memoryQualityWriteAllowed: false,
  memoryPromotionPerformed: false,
  memoryQualityWritePerformed: false,
  onlineControlledReady: true,
  operationalAiReady: false,
  controlledBetaAllowed: false,
  controlledBetaPerformed: false,
  productionBetaAllowed: false,
  productionBetaPerformed: false,
  zeroActivationMode: true,
  providerActivationAllowed: false,
  providerActivationPerformed: false,
  providerRuntimeBetaAllowed: false,
  providerRuntimeBetaPerformed: false,
  providerRuntimeCanaryAllowed: false,
  providerRuntimeCanaryPerformed: false,
  providerCanaryCallAllowed: false,
  providerCanaryCallPerformed: false,
  providerCanaryCallExecutionAllowed: false,
  providerCanaryCallExecutionPerformed: false,
  explicitProviderApprovalAllowed: false,
  explicitProviderApprovalPerformed: false,
  providerRequestSendAllowed: false,
  providerRequestSendPerformed: false,
  providerResultReviewAllowed: false,
  providerResultReviewPerformed: false,
  canaryExecutionAllowed: false,
  canaryExecutionPerformed: false,
  canaryResultPersistenceAllowed: false,
  canaryResultPersistencePerformed: false,
  explicitActivationApprovalAllowed: false,
  explicitActivationApprovalPerformed: false,
  productionRuntimeAllowed: false,
  productionRuntimePerformed: false,
  casePersistenceActivationAllowed: false,
  casePersistencePerformed: false,
  storageActivationAllowed: false,
  storageActivationPerformed: false,
  liveMigrationExecutionAllowed: false,
  liveMigrationExecutionPerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  automationActivationAllowed: false,
  reviewPersistenceAllowed: false,
  reviewPersistencePerformed: false,
  manualConversionAllowed: false,
  manualConversionPerformed: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  complianceExportAllowed: false,
  complianceExportPerformed: false,
  publicComplianceExportPublicationAllowed: false,
  publicComplianceExportPublicationPerformed: false,
  manualDispatchActivationAllowed: false,
  manualDispatchActivationPerformed: false,
  manualDispatchWritePathAllowed: false,
  manualDispatchWritePathPerformed: false,
  incidentHandlingAllowed: false,
  incidentHandlingPerformed: false,
  incidentWriteAllowed: false,
  incidentWritePerformed: false,
  providerCanaryCallExecutionGateReady: true,
  explicitProviderApprovalLockReady: true,
  providerResultBoundaryReady: true,
  canaryCallNoGoReady: true,
};

const priorityWeight: Record<ProviderCanaryCallPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderCanaryCallInput): Required<ProviderCanaryCallInput> {
  return {
    callGateItemCount: input.callGateItemCount ?? 8,
    providerApprovalItemCount: input.providerApprovalItemCount ?? 8,
    requestBoundaryItemCount: input.requestBoundaryItemCount ?? 8,
    budgetEnvelopeItemCount: input.budgetEnvelopeItemCount ?? 7,
    reviewerApprovalItemCount: input.reviewerApprovalItemCount ?? 7,
    resultBoundaryItemCount: input.resultBoundaryItemCount ?? 7,
    openCallGapCount: input.openCallGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    canaryExecutionScore: input.canaryExecutionScore ?? 70,
    manualWritePathScore: input.manualWritePathScore ?? 70,
    incidentHandlingScore: input.incidentHandlingScore ?? 70,
    providerContractScore: input.providerContractScore ?? 66,
    budgetEnvelopeScore: input.budgetEnvelopeScore ?? 64,
    reviewerApprovalScore: input.reviewerApprovalScore ?? 68,
    providerLeadRole: input.providerLeadRole ?? "provider canary call execution reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderCanaryCallSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderCanaryCallSeverity): ProviderCanaryCallPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderCanaryCallReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-call-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "call-gate-design-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderCanaryCallLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderCanaryCallSourceNode {
  const readinessScore = clampScore(readinessBase - pressure);
  const confidenceScore = clampScore(confidenceBase - pressure / 2);
  const concernScore = clampScore(100 - readinessScore + pressure);
  const severity = severityFromConcern(concernScore);

  return {
    id,
    lane,
    title,
    sourceVersion,
    readinessScore,
    confidenceScore,
    severity,
    priority: priorityFromSeverity(severity),
    reviewerFocus,
    blockers:
      readinessScore < 62 || confidenceScore < 62 || severity === "critical"
        ? [
            "Provider canary call execution gate remains below activation threshold.",
            "Provider board must resolve approval, request boundary, budget, review and rollback gaps before any later provider call release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderCanaryCallInput>): ProviderCanaryCallSourceNode[] {
  const callPressure = context.callGateItemCount;
  const approvalPressure = context.providerApprovalItemCount * 2;
  const requestPressure = context.requestBoundaryItemCount;
  const budgetPressure = context.budgetEnvelopeItemCount * 2;
  const reviewPressure = context.reviewerApprovalItemCount;
  const gapPressure = context.openCallGapCount * 2;

  return [
    buildSourceNode(
      "PCCG_NODE_001",
      "provider_call_gate",
      "Provider runtime canary execution gate",
      "V16.8",
      context.canaryExecutionScore,
      context.providerContractScore,
      callPressure,
      "Connect zero-call canary plan to a future provider call execution gate.",
    ),
    buildSourceNode(
      "PCCG_NODE_002",
      "explicit_provider_approval",
      "Explicit provider approval lock",
      "V17.2",
      context.reviewerApprovalScore,
      context.providerContractScore,
      approvalPressure,
      "Prepare provider approval board without allowing provider calls.",
    ),
    buildSourceNode(
      "PCCG_NODE_003",
      "provider_request_boundary",
      "Provider request boundary",
      "V17.2",
      100,
      context.onlineReadinessScore,
      requestPressure,
      "Keep provider request sending blocked.",
    ),
    buildSourceNode(
      "PCCG_NODE_004",
      "budget_envelope",
      "Provider budget envelope",
      "V17.2",
      context.budgetEnvelopeScore,
      context.providerContractScore,
      budgetPressure,
      "Prepare cost envelope without call execution.",
    ),
    buildSourceNode(
      "PCCG_NODE_005",
      "reviewer_approval",
      "Manual dispatch write path gate",
      "V17.1",
      context.manualWritePathScore,
      context.reviewerApprovalScore,
      reviewPressure,
      "Ensure provider results cannot create work records.",
    ),
    buildSourceNode(
      "PCCG_NODE_006",
      "provider_result_boundary",
      "Runtime incident handling gate",
      "V16.9",
      context.incidentHandlingScore,
      context.providerContractScore,
      context.resultBoundaryItemCount,
      "Prepare result review boundary without persistence.",
    ),
    buildSourceNode(
      "PCCG_NODE_007",
      "rollback_call_plan",
      "Provider rollback call design",
      "V17.2",
      context.incidentHandlingScore,
      context.budgetEnvelopeScore,
      gapPressure,
      "Prepare rollback plan without provider activity.",
    ),
    buildSourceNode(
      "PCCG_NODE_008",
      "human_signoff",
      "Provider canary call human signoff",
      "V17.2",
      context.reviewerApprovalScore,
      context.budgetEnvelopeScore,
      gapPressure,
      "Keep provider call execution blocked until a separate explicit provider approval release.",
    ),
  ];
}

function buildProviderCallGate(context: Required<ProviderCanaryCallInput>): ProviderCallGateItem[] {
  return [
    {
      id: "PCCG_GATE_001",
      label: "Provider canary call execution lock",
      lane: "provider_call_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep provider canary call execution disabled in V17.2.",
      requiredEvidence: ["providerCanaryCallExecutionAllowed=false", "providerCalled=false", "providerRequestSendAllowed=false"],
      blockedOutcome: "No provider canary call execution.",
    },
    {
      id: "PCCG_GATE_002",
      label: "Zero-call provider plan",
      lane: "provider_call_gate",
      gateScore: clampScore(context.canaryExecutionScore),
      severity: severityFromConcern(100 - context.canaryExecutionScore + context.callGateItemCount * 4),
      gatePurpose: "Prepare provider call flow without sending any request.",
      requiredEvidence: ["approval lock", "request boundary", "budget envelope", "result boundary"],
      blockedOutcome: "No provider request is sent.",
    },
    {
      id: "PCCG_GATE_003",
      label: "Explicit provider approval lock",
      lane: "provider_call_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require a separate future release before provider approval.",
      requiredEvidence: ["explicitProviderApprovalAllowed=false", "providerCallAllowed=false"],
      blockedOutcome: "No provider approval.",
    },
  ];
}

function buildExplicitProviderApprovalLock(context: Required<ProviderCanaryCallInput>): ExplicitProviderApprovalItem[] {
  return [
    {
      id: "PCCG_APPROVAL_001",
      label: "Provider approval board design",
      lane: "explicit_provider_approval",
      approvalScore: clampScore(context.reviewerApprovalScore),
      priority: context.reviewerApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can provider approval be reviewed without enabling calls?",
      requiredEvidence: ["reviewer role", "provider approval hold", "call no-go state"],
      blockedOutcome: "No provider approval is performed.",
    },
    {
      id: "PCCG_APPROVAL_002",
      label: "Provider contract approval design",
      lane: "explicit_provider_approval",
      approvalScore: clampScore(context.providerContractScore),
      priority: context.providerContractScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can provider contract be checked before any later call?",
      requiredEvidence: ["response contract", "unsafe output hold", "fallback route"],
      blockedOutcome: "No provider contract activation.",
    },
    {
      id: "PCCG_APPROVAL_003",
      label: "Provider safety approval hold",
      lane: "explicit_provider_approval",
      approvalScore: 100,
      priority: "urgent",
      approvalQuestion: "Can safety approval remain blocked?",
      requiredEvidence: ["productPrescriptionAllowed=false", "dosageAdviceAllowed=false", "automaticExecutionAllowed=false"],
      blockedOutcome: "No safety approval activation.",
    },
  ];
}

function buildProviderRequestBoundary(): ProviderRequestBoundaryItem[] {
  return [
    {
      id: "PCCG_BOUNDARY_001",
      label: "Provider request send boundary",
      lane: "provider_request_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider request can be sent.",
      blockedOutcome: "providerRequestSendAllowed=false",
    },
    {
      id: "PCCG_BOUNDARY_002",
      label: "Provider call boundary",
      lane: "provider_request_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider call can occur.",
      blockedOutcome: "providerCalled=false",
    },
    {
      id: "PCCG_BOUNDARY_003",
      label: "Provider canary result persistence boundary",
      lane: "provider_request_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider canary result can be persisted.",
      blockedOutcome: "canaryResultPersistenceAllowed=false",
    },
  ];
}

function buildCanaryCallBudgetEnvelope(context: Required<ProviderCanaryCallInput>): CanaryCallBudgetEnvelopeItem[] {
  return [
    {
      id: "PCCG_BUDGET_001",
      label: "Provider call daily envelope",
      lane: "budget_envelope",
      budgetScore: clampScore(context.budgetEnvelopeScore),
      priority: context.budgetEnvelopeScore < 70 ? "urgent" : "high",
      budgetQuestion: "Can future provider calls be capped by day?",
      requiredControls: ["daily cap", "manual approval", "stop route"],
      manualResolution: "Keep budget envelope as dry-run design.",
    },
    {
      id: "PCCG_BUDGET_002",
      label: "Provider call per-case envelope",
      lane: "budget_envelope",
      budgetScore: clampScore(context.budgetEnvelopeScore - context.budgetEnvelopeItemCount),
      priority: "urgent",
      budgetQuestion: "Can each future provider call be capped?",
      requiredControls: ["case cap", "review reason", "fallback route"],
      manualResolution: "No provider call attempt in V17.2.",
    },
    {
      id: "PCCG_BUDGET_003",
      label: "Provider cost stop plan",
      lane: "budget_envelope",
      budgetScore: clampScore(context.incidentHandlingScore),
      priority: "high",
      budgetQuestion: "Can abnormal future cost stop provider calls?",
      requiredControls: ["cost anomaly", "provider stop", "human board"],
      manualResolution: "Return to local dry-run.",
    },
  ];
}

function buildReviewerProviderApproval(context: Required<ProviderCanaryCallInput>): ReviewerProviderApprovalItem[] {
  return [
    {
      id: "PCCG_REVIEW_001",
      label: "Reviewer provider approval design",
      lane: "reviewer_approval",
      approvalScore: clampScore(context.reviewerApprovalScore),
      severity: severityFromConcern(100 - context.reviewerApprovalScore + context.reviewerApprovalItemCount * 4),
      approvalQuestion: "Can reviewer approval be represented without persistence?",
      requiredChecks: ["reviewer role", "approval hold", "zero-call state"],
      manualResolution: "Keep reviewer approval local and dry-run.",
    },
    {
      id: "PCCG_REVIEW_002",
      label: "Reviewer no-work conversion check",
      lane: "reviewer_approval",
      approvalScore: 100,
      severity: "critical",
      approvalQuestion: "Can provider call review avoid work conversion?",
      requiredChecks: ["taskCreated=false", "interventionCreated=false", "manualDispatchWritePathAllowed=false"],
      manualResolution: "Block any work conversion wording.",
    },
    {
      id: "PCCG_REVIEW_003",
      label: "Reviewer incident fallback check",
      lane: "reviewer_approval",
      approvalScore: clampScore(context.incidentHandlingScore),
      severity: "elevated",
      approvalQuestion: "Can provider failure return to incident board?",
      requiredChecks: ["incidentHandlingAllowed=false", "incidentWriteAllowed=false", "humanReviewRequired=true"],
      manualResolution: "Hold for human board.",
    },
  ];
}

function buildProviderResultBoundary(): ProviderResultBoundaryItem[] {
  return [
    {
      id: "PCCG_RESULT_001",
      label: "Provider result review boundary",
      lane: "provider_result_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider result review can be activated.",
      blockedOutcome: "providerResultReviewAllowed=false",
    },
    {
      id: "PCCG_RESULT_002",
      label: "Provider result storage boundary",
      lane: "provider_result_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider result can be stored.",
      blockedOutcome: "canaryResultPersistencePerformed=false",
    },
    {
      id: "PCCG_RESULT_003",
      label: "Provider result action boundary",
      lane: "provider_result_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider result can create task, intervention, product, dosage or execution content.",
      blockedOutcome: "automaticExecutionPerformed=false",
    },
  ];
}

function buildRollbackProviderCallPlan(context: Required<ProviderCanaryCallInput>): RollbackProviderCallPlanItem[] {
  return [
    {
      id: "PCCG_ROLLBACK_001",
      label: "Provider call rollback plan",
      lane: "rollback_call_plan",
      rollbackScore: clampScore(context.incidentHandlingScore),
      priority: context.incidentHandlingScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future provider call release return to zero-call state?",
      safeFallback: "Return to local dry-run and provider call no-go board.",
    },
    {
      id: "PCCG_ROLLBACK_002",
      label: "Provider request rollback plan",
      lane: "rollback_call_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can provider request sending remain blocked?",
      safeFallback: "No request sending path exists in V17.2.",
    },
    {
      id: "PCCG_ROLLBACK_003",
      label: "Provider result rollback plan",
      lane: "rollback_call_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can provider result storage remain blocked?",
      safeFallback: "No result storage path exists in V17.2.",
    },
  ];
}

function buildProviderCallNoGoBoard(): ProviderCallNoGoItem[] {
  return [
    {
      id: "PCCG_GONOGO_001",
      label: "Provider canary call plan",
      lane: "human_signoff",
      goNoGoState: "zero-call-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["provider approval", "request boundary", "budget envelope", "result boundary"],
      safeOutcome: "Provider canary call plan only.",
    },
    {
      id: "PCCG_GONOGO_002",
      label: "Actual provider canary call",
      lane: "provider_call_gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate provider call release", "explicit provider approval", "runtime proof"],
      safeOutcome: "Provider canary call remains blocked.",
    },
    {
      id: "PCCG_GONOGO_003",
      label: "Provider request send or result storage",
      lane: "provider_request_boundary",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate request release", "budget proof", "rollback proof"],
      safeOutcome: "Provider request and result storage remain blocked.",
    },
  ];
}

function buildProviderCallGateChecks(
  context: Required<ProviderCanaryCallInput>,
  sourceNodes: ProviderCanaryCallSourceNode[],
): ProviderCallGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PCCG_CHECK_001",
      label: "Provider call gate remains zero-call",
      lane: "provider_call_gate" as ProviderCanaryCallLane,
      score: 100,
      reviewer: "provider canary call execution reviewer",
      requiredEvidence: ["providerCalled=false", "providerRequestSendAllowed=false", "providerCanaryCallExecutionAllowed=false"],
      hardStop: "Do not activate provider canary call execution in V17.2.",
    },
    {
      id: "PCCG_CHECK_002",
      label: "Explicit provider approval is complete enough",
      lane: "explicit_provider_approval" as ProviderCanaryCallLane,
      score: context.reviewerApprovalScore - context.providerApprovalItemCount * 3,
      reviewer: context.providerLeadRole,
      requiredEvidence: ["provider approval", "contract approval", "safety approval hold"],
      hardStop: "Do not proceed without explicit provider approval board.",
    },
    {
      id: "PCCG_CHECK_003",
      label: "Provider request boundary is complete",
      lane: "provider_request_boundary" as ProviderCanaryCallLane,
      score: 100,
      reviewer: "provider request boundary reviewer",
      requiredEvidence: ["request send boundary", "call boundary", "result persistence boundary"],
      hardStop: "Provider request boundaries must remain active.",
    },
    {
      id: "PCCG_CHECK_004",
      label: "Budget envelope is complete enough",
      lane: "budget_envelope" as ProviderCanaryCallLane,
      score: context.budgetEnvelopeScore - context.budgetEnvelopeItemCount * 3,
      reviewer: "provider budget reviewer",
      requiredEvidence: ["daily envelope", "per-case envelope", "cost stop"],
      hardStop: "Do not proceed without budget envelope board.",
    },
    {
      id: "PCCG_CHECK_005",
      label: "Result boundary is complete",
      lane: "provider_result_boundary" as ProviderCanaryCallLane,
      score: 100,
      reviewer: "provider result boundary reviewer",
      requiredEvidence: ["result review boundary", "storage boundary", "action boundary"],
      hardStop: "Result boundaries must remain active.",
    },
    {
      id: "PCCG_CHECK_006",
      label: "Source blockers are within provider call tolerance",
      lane: "human_signoff" as ProviderCanaryCallLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before zero-call-plan-ready state.",
    },
  ];

  return rows.map((row) => {
    const score = clampScore(row.score);
    const severity = severityFromConcern(100 - score);

    return {
      ...row,
      score,
      severity,
      passed: score >= 60,
    };
  });
}

function buildBoardPack(context: Required<ProviderCanaryCallInput>): ProviderCallBoardPackItem[] {
  return [
    {
      id: "PCCG_PACK_001",
      label: "Provider call gate packet",
      lane: "provider_call_gate",
      packReady: context.canaryExecutionScore >= 60,
      readinessScore: clampScore(context.canaryExecutionScore),
      reviewerCheck: "Confirm provider call gate remains zero-call and design-only.",
      includedSections: ["provider call gate", "approval lock", "call no-go"],
      blockedSections: ["provider request send", "provider call", "result storage"],
    },
    {
      id: "PCCG_PACK_002",
      label: "Provider approval and budget packet",
      lane: "explicit_provider_approval",
      packReady: context.reviewerApprovalScore >= 60 && context.budgetEnvelopeScore >= 60,
      readinessScore: clampScore((context.reviewerApprovalScore + context.budgetEnvelopeScore) / 2),
      reviewerCheck: "Confirm approval and budget remain locked.",
      includedSections: ["approval board", "budget envelope", "provider contract review"],
      blockedSections: ["approval performed", "budget consumed", "request sent"],
    },
    {
      id: "PCCG_PACK_003",
      label: "Result boundary and rollback packet",
      lane: "provider_result_boundary",
      packReady: context.incidentHandlingScore >= 60,
      readinessScore: clampScore(context.incidentHandlingScore),
      reviewerCheck: "Confirm provider result and rollback routes remain dry-run.",
      includedSections: ["result boundary", "rollback plan", "incident fallback"],
      blockedSections: ["result persistence", "task creation", "intervention creation"],
    },
  ];
}

function buildFindings(
  context: Required<ProviderCanaryCallInput>,
  sourceNodes: ProviderCanaryCallSourceNode[],
  gates: ProviderCallGateCheckItem[],
  goNoGo: ProviderCallNoGoItem[],
): ProviderCallFindingItem[] {
  const findings: ProviderCallFindingItem[] = [];

  if (context.openCallGapCount > 0) {
    findings.push({
      id: "PCCG_FINDING_001",
      label: "Open provider call gaps",
      lane: "human_signoff",
      severity: context.openCallGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openCallGapCount} provider call gaps remain before any later provider call release.`,
      manualResolution: "Resolve provider approval, request boundary, budget, result boundary and rollback gaps in a later gated release.",
      blocksProviderCallActivation: true,
    });
  }

  if (context.providerContractScore < 70) {
    findings.push({
      id: "PCCG_FINDING_002",
      label: "Provider contract below threshold",
      lane: "explicit_provider_approval",
      severity: "critical",
      reason: "Provider contract readiness is not mature enough for provider call activation.",
      manualResolution: "Complete provider response, unsafe output hold and fallback route review.",
      blocksProviderCallActivation: true,
    });
  }

  if (context.budgetEnvelopeScore < 70) {
    findings.push({
      id: "PCCG_FINDING_003",
      label: "Budget envelope below threshold",
      lane: "budget_envelope",
      severity: "critical",
      reason: "Budget envelope is not mature enough for provider call activation.",
      manualResolution: "Complete daily, per-case and cost stop controls.",
      blocksProviderCallActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `PCCG_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksProviderCallActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `PCCG_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Provider call gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksProviderCallActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `PCCG_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksProviderCallActivation: true,
      });
    });

  return findings;
}

export function buildAiProviderCanaryCallExecutionGateReport(
  input: ProviderCanaryCallInput = {},
): ProviderCanaryCallExecutionReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const providerCallGate = buildProviderCallGate(context);
  const explicitProviderApprovalLock = buildExplicitProviderApprovalLock(context);
  const providerRequestBoundary = buildProviderRequestBoundary();
  const canaryCallBudgetEnvelope = buildCanaryCallBudgetEnvelope(context);
  const reviewerProviderApproval = buildReviewerProviderApproval(context);
  const providerResultBoundary = buildProviderResultBoundary();
  const rollbackProviderCallPlan = buildRollbackProviderCallPlan(context);
  const providerCallNoGoBoard = buildProviderCallNoGoBoard();
  const providerCallGateChecks = buildProviderCallGateChecks(context, sourceNodes);
  const providerCallBoardPack = buildBoardPack(context);
  const providerCallFindings = buildFindings(context, sourceNodes, providerCallGateChecks, providerCallNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    providerCallGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, providerCallGate.length);

  const approvalAverage =
    explicitProviderApprovalLock.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, explicitProviderApprovalLock.length);

  const gateAverage =
    providerCallGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, providerCallGateChecks.length);

  const findingPenalty = providerCallFindings.filter((item) => item.blocksProviderCallActivation).length * 7;
  const budgetPressure =
    canaryCallBudgetEnvelope.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, canaryCallBudgetEnvelope.length * 4);

  const providerCallScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      approvalAverage / 4 +
      gateAverage / 4 +
      budgetPressure -
      findingPenalty -
      context.openCallGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openCallGapCount * 8 +
        context.providerApprovalItemCount * 6 +
        context.requestBoundaryItemCount * 5 +
        context.budgetEnvelopeItemCount * 6 +
        context.resultBoundaryItemCount * 5,
    ),
  );

  const providerCallStatus = bandFromScore(
    providerCallScore,
    providerCallFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_CANARY_CALL_GUARDRAIL,
    providerCallScore,
    providerCallStatus,
    overallSeverity,
    sourceNodes,
    providerCallGate,
    explicitProviderApprovalLock,
    providerRequestBoundary,
    canaryCallBudgetEnvelope,
    reviewerProviderApproval,
    providerResultBoundary,
    rollbackProviderCallPlan,
    providerCallNoGoBoard,
    providerCallGateChecks,
    providerCallBoardPack,
    providerCallFindings,
    stagedRoadmap: {
      v172: "Provider canary call execution gate in zero-call dry-run.",
      v173: "Incident handling write path only after explicit incident governance approval.",
      v174: "Public export package write only after explicit legal and privacy approval.",
      v175: "Task and intervention creation only after explicit operational write approval.",
      v176: "Provider call execution only after explicit provider approval.",
    },
    redactedExportBundle: {
      exportId: "provider_canary_call_execution_gate_v17_2_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "source nodes",
        "provider call gate",
        "explicit provider approval lock",
        "provider request boundary",
        "canary call budget envelope",
        "reviewer provider approval",
        "provider result boundary",
        "rollback provider call plan",
        "provider call no-go board",
        "provider call gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider canary call execution gate is local dry-run only.",
      "No provider call, provider request send, provider canary call execution, result review, result persistence, storage activation, task creation, intervention creation or execution is performed.",
      "Explicit provider approval remains locked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V17.2 prepares provider canary call execution governance only.",
    ],
  };
}

export const aiProviderCanaryCallExecutionGateVersion = "V17.2";
