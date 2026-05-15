export type ProviderCallExecutionMode = "dry-run" | "provider-approval-board-review";

export type ProviderCallExecutionSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderCallExecutionPriority = "low" | "medium" | "high" | "urgent";

export type ProviderCallExecutionReadinessBand =
  | "blocked"
  | "provider-call-design-ready"
  | "manual-board-review-ready"
  | "zero-call-runtime-plan-ready";

export type ProviderCallExecutionLane =
  | "provider_call_execution_gate"
  | "explicit_provider_approval"
  | "request_dispatch_boundary"
  | "response_intake_boundary"
  | "budget_runtime_boundary"
  | "reviewer_approval_evidence"
  | "rollback_provider_call"
  | "human_signoff";

export interface ProviderCallExecutionGuardrail {
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
  providerCallExecutionAllowed: false;
  providerCallExecutionPerformed: false;
  explicitProviderApprovalAllowed: false;
  explicitProviderApprovalPerformed: false;
  providerRequestDispatchAllowed: false;
  providerRequestDispatchPerformed: false;
  providerResponseIntakeAllowed: false;
  providerResponseIntakePerformed: false;
  providerResponseReviewAllowed: false;
  providerResponseReviewPerformed: false;
  providerResultPersistenceAllowed: false;
  providerResultPersistencePerformed: false;
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
  publicExportPackageWriteAllowed: false;
  publicExportPackageWritePerformed: false;
  manualDispatchActivationAllowed: false;
  manualDispatchActivationPerformed: false;
  manualDispatchWritePathAllowed: false;
  manualDispatchWritePathPerformed: false;
  taskInterventionCreationAllowed: false;
  taskInterventionCreationPerformed: false;
  incidentHandlingAllowed: false;
  incidentHandlingPerformed: false;
  incidentWriteAllowed: false;
  incidentWritePerformed: false;
  incidentHandlingWritePathAllowed: false;
  incidentHandlingWritePathPerformed: false;
  providerCallExecutionGateReady: true;
  explicitProviderApprovalRuntimeLockReady: true;
  responseIntakeBoundaryReady: true;
  providerCallNoGoReady: true;
}

export interface ProviderCallExecutionInput {
  providerCallGateItemCount?: number;
  providerApprovalItemCount?: number;
  dispatchBoundaryItemCount?: number;
  responseBoundaryItemCount?: number;
  budgetBoundaryItemCount?: number;
  reviewerEvidenceItemCount?: number;
  openProviderCallGapCount?: number;
  onlineReadinessScore?: number;
  canaryCallGateScore?: number;
  creationGateScore?: number;
  incidentWriteGateScore?: number;
  providerContractScore?: number;
  budgetRuntimeScore?: number;
  reviewerApprovalScore?: number;
  providerCallLeadRole?: string;
}

export interface ProviderCallExecutionSourceNode {
  id: string;
  lane: ProviderCallExecutionLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderCallExecutionSeverity;
  priority: ProviderCallExecutionPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ProviderCallExecutionGateItem {
  id: string;
  label: string;
  lane: ProviderCallExecutionLane;
  gateScore: number;
  severity: ProviderCallExecutionSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ExplicitProviderApprovalRuntimeItem {
  id: string;
  label: string;
  lane: ProviderCallExecutionLane;
  approvalScore: number;
  priority: ProviderCallExecutionPriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface RequestDispatchBoundaryItem {
  id: string;
  label: string;
  lane: ProviderCallExecutionLane;
  boundaryScore: number;
  severity: ProviderCallExecutionSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface ResponseIntakeBoundaryItem {
  id: string;
  label: string;
  lane: ProviderCallExecutionLane;
  boundaryScore: number;
  severity: ProviderCallExecutionSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface BudgetRuntimeBoundaryItem {
  id: string;
  label: string;
  lane: ProviderCallExecutionLane;
  budgetScore: number;
  priority: ProviderCallExecutionPriority;
  budgetQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface ReviewerApprovalEvidenceItem {
  id: string;
  label: string;
  lane: ProviderCallExecutionLane;
  evidenceScore: number;
  severity: ProviderCallExecutionSeverity;
  evidenceQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface RollbackProviderCallItem {
  id: string;
  label: string;
  lane: ProviderCallExecutionLane;
  rollbackScore: number;
  priority: ProviderCallExecutionPriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface ProviderCallNoGoItem {
  id: string;
  label: string;
  lane: ProviderCallExecutionLane;
  goNoGoState: "no-go" | "design-only" | "zero-call-runtime-plan-ready";
  score: number;
  severity: ProviderCallExecutionSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface ProviderCallExecutionGateCheckItem {
  id: string;
  label: string;
  lane: ProviderCallExecutionLane;
  passed: boolean;
  score: number;
  severity: ProviderCallExecutionSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ProviderCallExecutionBoardPackItem {
  id: string;
  label: string;
  lane: ProviderCallExecutionLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ProviderCallExecutionFindingItem {
  id: string;
  label: string;
  lane: ProviderCallExecutionLane;
  severity: ProviderCallExecutionSeverity;
  reason: string;
  manualResolution: string;
  blocksProviderCallActivation: boolean;
}

export interface ProviderCallExecutionReport {
  generatedAt: string;
  mode: ProviderCallExecutionMode;
  context: Required<ProviderCallExecutionInput>;
  readiness: ProviderCallExecutionGuardrail;
  providerCallScore: number;
  providerCallStatus: ProviderCallExecutionReadinessBand;
  overallSeverity: ProviderCallExecutionSeverity;
  sourceNodes: ProviderCallExecutionSourceNode[];
  providerCallExecutionGate: ProviderCallExecutionGateItem[];
  explicitProviderApprovalRuntimeLock: ExplicitProviderApprovalRuntimeItem[];
  requestDispatchBoundary: RequestDispatchBoundaryItem[];
  responseIntakeBoundary: ResponseIntakeBoundaryItem[];
  budgetRuntimeBoundary: BudgetRuntimeBoundaryItem[];
  reviewerApprovalEvidence: ReviewerApprovalEvidenceItem[];
  rollbackProviderCallPlan: RollbackProviderCallItem[];
  providerCallNoGoBoard: ProviderCallNoGoItem[];
  providerCallGateChecks: ProviderCallExecutionGateCheckItem[];
  providerCallBoardPack: ProviderCallExecutionBoardPackItem[];
  providerCallFindings: ProviderCallExecutionFindingItem[];
  stagedRoadmap: {
    v176: string;
    v177: string;
    v178: string;
    v179: string;
    v180: string;
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

export const PROVIDER_CALL_EXECUTION_GUARDRAIL: ProviderCallExecutionGuardrail = {
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
  publicExportPackageWriteAllowed: false,
  publicExportPackageWritePerformed: false,
  manualDispatchActivationAllowed: false,
  manualDispatchActivationPerformed: false,
  manualDispatchWritePathAllowed: false,
  manualDispatchWritePathPerformed: false,
  taskInterventionCreationAllowed: false,
  taskInterventionCreationPerformed: false,
  incidentHandlingAllowed: false,
  incidentHandlingPerformed: false,
  incidentWriteAllowed: false,
  incidentWritePerformed: false,
  incidentHandlingWritePathAllowed: false,
  incidentHandlingWritePathPerformed: false,
  providerCallExecutionGateReady: true,
  explicitProviderApprovalRuntimeLockReady: true,
  responseIntakeBoundaryReady: true,
  providerCallNoGoReady: true,
};

const priorityWeight: Record<ProviderCallExecutionPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderCallExecutionInput): Required<ProviderCallExecutionInput> {
  return {
    providerCallGateItemCount: input.providerCallGateItemCount ?? 8,
    providerApprovalItemCount: input.providerApprovalItemCount ?? 8,
    dispatchBoundaryItemCount: input.dispatchBoundaryItemCount ?? 8,
    responseBoundaryItemCount: input.responseBoundaryItemCount ?? 8,
    budgetBoundaryItemCount: input.budgetBoundaryItemCount ?? 7,
    reviewerEvidenceItemCount: input.reviewerEvidenceItemCount ?? 7,
    openProviderCallGapCount: input.openProviderCallGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    canaryCallGateScore: input.canaryCallGateScore ?? 70,
    creationGateScore: input.creationGateScore ?? 70,
    incidentWriteGateScore: input.incidentWriteGateScore ?? 70,
    providerContractScore: input.providerContractScore ?? 66,
    budgetRuntimeScore: input.budgetRuntimeScore ?? 64,
    reviewerApprovalScore: input.reviewerApprovalScore ?? 68,
    providerCallLeadRole: input.providerCallLeadRole ?? "provider call execution reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderCallExecutionSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderCallExecutionSeverity): ProviderCallExecutionPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderCallExecutionReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-call-runtime-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "provider-call-design-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderCallExecutionLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderCallExecutionSourceNode {
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
            "Provider call execution gate remains below activation threshold.",
            "Provider board must resolve approval, request dispatch, response intake, budget and rollback gaps before any later call release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderCallExecutionInput>): ProviderCallExecutionSourceNode[] {
  const callPressure = context.providerCallGateItemCount;
  const approvalPressure = context.providerApprovalItemCount * 2;
  const dispatchPressure = context.dispatchBoundaryItemCount;
  const responsePressure = context.responseBoundaryItemCount;
  const budgetPressure = context.budgetBoundaryItemCount * 2;
  const gapPressure = context.openProviderCallGapCount * 2;

  return [
    buildSourceNode(
      "PCEX_NODE_001",
      "provider_call_execution_gate",
      "Provider canary call execution gate",
      "V17.2",
      context.canaryCallGateScore,
      context.providerContractScore,
      callPressure,
      "Connect canary provider call design to future provider runtime execution.",
    ),
    buildSourceNode(
      "PCEX_NODE_002",
      "explicit_provider_approval",
      "Explicit provider approval runtime lock",
      "V17.6",
      context.reviewerApprovalScore,
      context.providerContractScore,
      approvalPressure,
      "Prepare provider approval runtime evidence without enabling calls.",
    ),
    buildSourceNode(
      "PCEX_NODE_003",
      "request_dispatch_boundary",
      "Provider request dispatch boundary",
      "V17.6",
      100,
      context.onlineReadinessScore,
      dispatchPressure,
      "Keep provider request dispatch blocked.",
    ),
    buildSourceNode(
      "PCEX_NODE_004",
      "response_intake_boundary",
      "Provider response intake boundary",
      "V17.6",
      context.providerContractScore,
      context.reviewerApprovalScore,
      responsePressure,
      "Keep provider response intake and review blocked.",
    ),
    buildSourceNode(
      "PCEX_NODE_005",
      "budget_runtime_boundary",
      "Provider budget runtime boundary",
      "V17.6",
      context.budgetRuntimeScore,
      context.providerContractScore,
      budgetPressure,
      "Prepare runtime budget checks without call execution.",
    ),
    buildSourceNode(
      "PCEX_NODE_006",
      "reviewer_approval_evidence",
      "Task and intervention creation gate",
      "V17.5",
      context.creationGateScore,
      context.reviewerApprovalScore,
      context.reviewerEvidenceItemCount,
      "Ensure provider response cannot create work records.",
    ),
    buildSourceNode(
      "PCEX_NODE_007",
      "rollback_provider_call",
      "Incident handling write path gate",
      "V17.3",
      context.incidentWriteGateScore,
      context.budgetRuntimeScore,
      gapPressure,
      "Prepare rollback provider call plan without runtime activity.",
    ),
    buildSourceNode(
      "PCEX_NODE_008",
      "human_signoff",
      "Provider call human signoff",
      "V17.6",
      context.reviewerApprovalScore,
      context.budgetRuntimeScore,
      gapPressure,
      "Keep provider call execution blocked until a separate explicit provider release.",
    ),
  ];
}

function buildProviderCallExecutionGate(context: Required<ProviderCallExecutionInput>): ProviderCallExecutionGateItem[] {
  return [
    {
      id: "PCEX_GATE_001",
      label: "Provider call execution lock",
      lane: "provider_call_execution_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep provider call execution disabled in V17.6.",
      requiredEvidence: ["providerCallExecutionAllowed=false", "providerCalled=false", "providerRequestDispatchAllowed=false"],
      blockedOutcome: "No provider call execution.",
    },
    {
      id: "PCEX_GATE_002",
      label: "Zero-call runtime plan",
      lane: "provider_call_execution_gate",
      gateScore: clampScore(context.canaryCallGateScore),
      severity: severityFromConcern(100 - context.canaryCallGateScore + context.providerCallGateItemCount * 4),
      gatePurpose: "Prepare provider call runtime flow without dispatching any request.",
      requiredEvidence: ["approval lock", "dispatch boundary", "response boundary", "budget boundary"],
      blockedOutcome: "No provider request dispatch.",
    },
    {
      id: "PCEX_GATE_003",
      label: "Provider approval runtime lock",
      lane: "provider_call_execution_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require a separate future release before runtime provider approval.",
      requiredEvidence: ["explicitProviderApprovalAllowed=false", "providerCallAllowed=false"],
      blockedOutcome: "No provider approval activation.",
    },
  ];
}

function buildExplicitProviderApprovalRuntimeLock(context: Required<ProviderCallExecutionInput>): ExplicitProviderApprovalRuntimeItem[] {
  return [
    {
      id: "PCEX_APPROVAL_001",
      label: "Provider runtime approval design",
      lane: "explicit_provider_approval",
      approvalScore: clampScore(context.reviewerApprovalScore),
      priority: context.reviewerApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can provider runtime approval be reviewed without enabling calls?",
      requiredEvidence: ["reviewer role", "approval hold", "call no-go state"],
      blockedOutcome: "No provider runtime approval is performed.",
    },
    {
      id: "PCEX_APPROVAL_002",
      label: "Provider contract approval design",
      lane: "explicit_provider_approval",
      approvalScore: clampScore(context.providerContractScore),
      priority: context.providerContractScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can provider contract be checked before any later runtime call?",
      requiredEvidence: ["response contract", "fallback route", "unsafe output hold"],
      blockedOutcome: "No provider contract activation.",
    },
    {
      id: "PCEX_APPROVAL_003",
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

function buildRequestDispatchBoundary(): RequestDispatchBoundaryItem[] {
  return [
    {
      id: "PCEX_DISPATCH_001",
      label: "Provider request dispatch boundary",
      lane: "request_dispatch_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider request can be dispatched.",
      blockedOutcome: "providerRequestDispatchAllowed=false",
    },
    {
      id: "PCEX_DISPATCH_002",
      label: "Provider request send boundary",
      lane: "request_dispatch_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider request can be sent.",
      blockedOutcome: "providerRequestSendAllowed=false",
    },
    {
      id: "PCEX_DISPATCH_003",
      label: "Provider call runtime boundary",
      lane: "request_dispatch_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider runtime call can occur.",
      blockedOutcome: "providerCalled=false",
    },
  ];
}

function buildResponseIntakeBoundary(): ResponseIntakeBoundaryItem[] {
  return [
    {
      id: "PCEX_RESPONSE_001",
      label: "Provider response intake boundary",
      lane: "response_intake_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider response intake can be activated.",
      blockedOutcome: "providerResponseIntakeAllowed=false",
    },
    {
      id: "PCEX_RESPONSE_002",
      label: "Provider response review boundary",
      lane: "response_intake_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider response review can be activated.",
      blockedOutcome: "providerResponseReviewAllowed=false",
    },
    {
      id: "PCEX_RESPONSE_003",
      label: "Provider result persistence boundary",
      lane: "response_intake_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider result can be persisted.",
      blockedOutcome: "providerResultPersistenceAllowed=false",
    },
  ];
}

function buildBudgetRuntimeBoundary(context: Required<ProviderCallExecutionInput>): BudgetRuntimeBoundaryItem[] {
  return [
    {
      id: "PCEX_BUDGET_001",
      label: "Provider runtime daily budget",
      lane: "budget_runtime_boundary",
      budgetScore: clampScore(context.budgetRuntimeScore),
      priority: context.budgetRuntimeScore < 70 ? "urgent" : "high",
      budgetQuestion: "Can future provider runtime calls be capped by day?",
      requiredControls: ["daily cap", "manual approval", "rollback route"],
      manualResolution: "Keep budget runtime as dry-run design.",
    },
    {
      id: "PCEX_BUDGET_002",
      label: "Provider runtime per-case budget",
      lane: "budget_runtime_boundary",
      budgetScore: clampScore(context.budgetRuntimeScore - context.budgetBoundaryItemCount),
      priority: "urgent",
      budgetQuestion: "Can each future provider runtime call be capped?",
      requiredControls: ["case cap", "review reason", "fallback route"],
      manualResolution: "No provider runtime call attempt in V17.6.",
    },
    {
      id: "PCEX_BUDGET_003",
      label: "Provider runtime cost stop plan",
      lane: "budget_runtime_boundary",
      budgetScore: clampScore(context.incidentWriteGateScore),
      priority: "high",
      budgetQuestion: "Can abnormal future cost stop provider runtime calls?",
      requiredControls: ["cost anomaly", "provider stop", "human board"],
      manualResolution: "Return to local dry-run.",
    },
  ];
}

function buildReviewerApprovalEvidence(context: Required<ProviderCallExecutionInput>): ReviewerApprovalEvidenceItem[] {
  return [
    {
      id: "PCEX_EVIDENCE_001",
      label: "Reviewer approval evidence design",
      lane: "reviewer_approval_evidence",
      evidenceScore: clampScore(context.reviewerApprovalScore),
      severity: severityFromConcern(100 - context.reviewerApprovalScore + context.reviewerEvidenceItemCount * 4),
      evidenceQuestion: "Can reviewer approval evidence be represented without persistence?",
      requiredChecks: ["reviewer role", "approval hold", "zero-call state"],
      manualResolution: "Keep reviewer approval evidence local and dry-run.",
    },
    {
      id: "PCEX_EVIDENCE_002",
      label: "No work conversion evidence",
      lane: "reviewer_approval_evidence",
      evidenceScore: 100,
      severity: "critical",
      evidenceQuestion: "Can provider response avoid work conversion?",
      requiredChecks: ["taskCreated=false", "interventionCreated=false", "taskInterventionCreationAllowed=false"],
      manualResolution: "Block any work conversion wording.",
    },
    {
      id: "PCEX_EVIDENCE_003",
      label: "Provider response safety evidence",
      lane: "reviewer_approval_evidence",
      evidenceScore: 100,
      severity: "critical",
      evidenceQuestion: "Can provider response safety exclusions remain active?",
      requiredChecks: ["productPrescriptionAllowed=false", "dosageAdviceAllowed=false", "automaticExecutionAllowed=false"],
      manualResolution: "Block unsafe output classes.",
    },
  ];
}

function buildRollbackProviderCallPlan(context: Required<ProviderCallExecutionInput>): RollbackProviderCallItem[] {
  return [
    {
      id: "PCEX_ROLLBACK_001",
      label: "Provider call rollback plan",
      lane: "rollback_provider_call",
      rollbackScore: clampScore(context.incidentWriteGateScore),
      priority: context.incidentWriteGateScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future provider call release return to zero-call state?",
      safeFallback: "Return to local dry-run and provider call no-go board.",
    },
    {
      id: "PCEX_ROLLBACK_002",
      label: "Request dispatch rollback plan",
      lane: "rollback_provider_call",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can provider request dispatch remain blocked?",
      safeFallback: "No request dispatch path exists in V17.6.",
    },
    {
      id: "PCEX_ROLLBACK_003",
      label: "Response intake rollback plan",
      lane: "rollback_provider_call",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can provider response intake remain blocked?",
      safeFallback: "No response intake path exists in V17.6.",
    },
  ];
}

function buildProviderCallNoGoBoard(): ProviderCallNoGoItem[] {
  return [
    {
      id: "PCEX_GONOGO_001",
      label: "Provider runtime call plan",
      lane: "human_signoff",
      goNoGoState: "zero-call-runtime-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["provider approval", "dispatch boundary", "response boundary", "budget boundary"],
      safeOutcome: "Provider runtime call plan only.",
    },
    {
      id: "PCEX_GONOGO_002",
      label: "Actual provider runtime call",
      lane: "provider_call_execution_gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate provider runtime release", "explicit provider approval", "runtime proof"],
      safeOutcome: "Provider runtime call remains blocked.",
    },
    {
      id: "PCEX_GONOGO_003",
      label: "Provider response intake or result persistence",
      lane: "response_intake_boundary",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate response intake release", "budget proof", "rollback proof"],
      safeOutcome: "Provider response intake and result persistence remain blocked.",
    },
  ];
}

function buildProviderCallGateChecks(
  context: Required<ProviderCallExecutionInput>,
  sourceNodes: ProviderCallExecutionSourceNode[],
): ProviderCallExecutionGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PCEX_CHECK_001",
      label: "Provider call gate remains zero-call",
      lane: "provider_call_execution_gate" as ProviderCallExecutionLane,
      score: 100,
      reviewer: "provider call execution reviewer",
      requiredEvidence: ["providerCallExecutionAllowed=false", "providerCalled=false", "providerRequestDispatchAllowed=false"],
      hardStop: "Do not activate provider call execution in V17.6.",
    },
    {
      id: "PCEX_CHECK_002",
      label: "Explicit provider approval is complete enough",
      lane: "explicit_provider_approval" as ProviderCallExecutionLane,
      score: context.reviewerApprovalScore - context.providerApprovalItemCount * 3,
      reviewer: context.providerCallLeadRole,
      requiredEvidence: ["runtime approval", "contract approval", "safety hold"],
      hardStop: "Do not proceed without explicit provider approval board.",
    },
    {
      id: "PCEX_CHECK_003",
      label: "Request dispatch boundary is complete",
      lane: "request_dispatch_boundary" as ProviderCallExecutionLane,
      score: 100,
      reviewer: "request dispatch boundary reviewer",
      requiredEvidence: ["dispatch boundary", "send boundary", "call boundary"],
      hardStop: "Request dispatch boundaries must remain active.",
    },
    {
      id: "PCEX_CHECK_004",
      label: "Response intake boundary is complete",
      lane: "response_intake_boundary" as ProviderCallExecutionLane,
      score: 100,
      reviewer: "response intake boundary reviewer",
      requiredEvidence: ["response intake boundary", "response review boundary", "result persistence boundary"],
      hardStop: "Response intake boundaries must remain active.",
    },
    {
      id: "PCEX_CHECK_005",
      label: "Budget runtime boundary is complete enough",
      lane: "budget_runtime_boundary" as ProviderCallExecutionLane,
      score: context.budgetRuntimeScore - context.budgetBoundaryItemCount * 3,
      reviewer: "provider budget runtime reviewer",
      requiredEvidence: ["daily budget", "per-case budget", "cost stop plan"],
      hardStop: "Do not proceed without budget runtime board.",
    },
    {
      id: "PCEX_CHECK_006",
      label: "Source blockers are within provider call tolerance",
      lane: "human_signoff" as ProviderCallExecutionLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before zero-call-runtime-plan-ready state.",
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

function buildBoardPack(context: Required<ProviderCallExecutionInput>): ProviderCallExecutionBoardPackItem[] {
  return [
    {
      id: "PCEX_PACK_001",
      label: "Provider call execution packet",
      lane: "provider_call_execution_gate",
      packReady: context.canaryCallGateScore >= 60,
      readinessScore: clampScore(context.canaryCallGateScore),
      reviewerCheck: "Confirm provider call execution remains zero-call and design-only.",
      includedSections: ["provider call gate", "approval lock", "provider call no-go"],
      blockedSections: ["request dispatch", "provider call", "response intake"],
    },
    {
      id: "PCEX_PACK_002",
      label: "Approval and budget packet",
      lane: "explicit_provider_approval",
      packReady: context.reviewerApprovalScore >= 60 && context.budgetRuntimeScore >= 60,
      readinessScore: clampScore((context.reviewerApprovalScore + context.budgetRuntimeScore) / 2),
      reviewerCheck: "Confirm approval and budget remain locked.",
      includedSections: ["approval evidence", "budget runtime", "provider contract"],
      blockedSections: ["approval performed", "budget consumed", "provider request dispatched"],
    },
    {
      id: "PCEX_PACK_003",
      label: "Response and rollback packet",
      lane: "response_intake_boundary",
      packReady: context.incidentWriteGateScore >= 60,
      readinessScore: clampScore(context.incidentWriteGateScore),
      reviewerCheck: "Confirm response intake and rollback remain dry-run.",
      includedSections: ["response boundary", "rollback plan", "incident fallback"],
      blockedSections: ["response persistence", "task creation", "intervention creation"],
    },
  ];
}

function buildFindings(
  context: Required<ProviderCallExecutionInput>,
  sourceNodes: ProviderCallExecutionSourceNode[],
  gates: ProviderCallExecutionGateCheckItem[],
  goNoGo: ProviderCallNoGoItem[],
): ProviderCallExecutionFindingItem[] {
  const findings: ProviderCallExecutionFindingItem[] = [];

  if (context.openProviderCallGapCount > 0) {
    findings.push({
      id: "PCEX_FINDING_001",
      label: "Open provider runtime call gaps",
      lane: "human_signoff",
      severity: context.openProviderCallGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openProviderCallGapCount} provider call gaps remain before any later provider runtime release.`,
      manualResolution: "Resolve provider approval, request dispatch, response intake, budget and rollback gaps in a later gated release.",
      blocksProviderCallActivation: true,
    });
  }

  if (context.providerContractScore < 70) {
    findings.push({
      id: "PCEX_FINDING_002",
      label: "Provider contract below threshold",
      lane: "explicit_provider_approval",
      severity: "critical",
      reason: "Provider contract readiness is not mature enough for provider call activation.",
      manualResolution: "Complete provider response, unsafe output hold and fallback route review.",
      blocksProviderCallActivation: true,
    });
  }

  if (context.budgetRuntimeScore < 70) {
    findings.push({
      id: "PCEX_FINDING_003",
      label: "Budget runtime below threshold",
      lane: "budget_runtime_boundary",
      severity: "critical",
      reason: "Budget runtime boundary is not mature enough for provider call activation.",
      manualResolution: "Complete daily, per-case and cost stop controls.",
      blocksProviderCallActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `PCEX_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
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
        id: `PCEX_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
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
        id: `PCEX_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
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

export function buildAiProviderCallExecutionGateReport(
  input: ProviderCallExecutionInput = {},
): ProviderCallExecutionReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const providerCallExecutionGate = buildProviderCallExecutionGate(context);
  const explicitProviderApprovalRuntimeLock = buildExplicitProviderApprovalRuntimeLock(context);
  const requestDispatchBoundary = buildRequestDispatchBoundary();
  const responseIntakeBoundary = buildResponseIntakeBoundary();
  const budgetRuntimeBoundary = buildBudgetRuntimeBoundary(context);
  const reviewerApprovalEvidence = buildReviewerApprovalEvidence(context);
  const rollbackProviderCallPlan = buildRollbackProviderCallPlan(context);
  const providerCallNoGoBoard = buildProviderCallNoGoBoard();
  const providerCallGateChecks = buildProviderCallGateChecks(context, sourceNodes);
  const providerCallBoardPack = buildBoardPack(context);
  const providerCallFindings = buildFindings(context, sourceNodes, providerCallGateChecks, providerCallNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    providerCallExecutionGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, providerCallExecutionGate.length);

  const approvalAverage =
    explicitProviderApprovalRuntimeLock.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, explicitProviderApprovalRuntimeLock.length);

  const gateAverage =
    providerCallGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, providerCallGateChecks.length);

  const findingPenalty = providerCallFindings.filter((item) => item.blocksProviderCallActivation).length * 7;
  const budgetPressure =
    budgetRuntimeBoundary.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, budgetRuntimeBoundary.length * 4);

  const providerCallScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      approvalAverage / 4 +
      gateAverage / 4 +
      budgetPressure -
      findingPenalty -
      context.openProviderCallGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openProviderCallGapCount * 8 +
        context.providerApprovalItemCount * 6 +
        context.dispatchBoundaryItemCount * 5 +
        context.responseBoundaryItemCount * 5 +
        context.budgetBoundaryItemCount * 6,
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
    readiness: PROVIDER_CALL_EXECUTION_GUARDRAIL,
    providerCallScore,
    providerCallStatus,
    overallSeverity,
    sourceNodes,
    providerCallExecutionGate,
    explicitProviderApprovalRuntimeLock,
    requestDispatchBoundary,
    responseIntakeBoundary,
    budgetRuntimeBoundary,
    reviewerApprovalEvidence,
    rollbackProviderCallPlan,
    providerCallNoGoBoard,
    providerCallGateChecks,
    providerCallBoardPack,
    providerCallFindings,
    stagedRoadmap: {
      v176: "Provider call execution gate in zero-call dry-run.",
      v177: "Incident record write only after explicit incident governance approval.",
      v178: "Public export artifact write only after explicit legal and privacy approval.",
      v179: "Operational execution only after explicit human approval.",
      v180: "Provider runtime activation only after explicit provider approval and rollback proof.",
    },
    redactedExportBundle: {
      exportId: "provider_call_execution_gate_v17_6_redacted_dry_run",
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
        "provider call execution gate",
        "explicit provider approval runtime lock",
        "request dispatch boundary",
        "response intake boundary",
        "budget runtime boundary",
        "reviewer approval evidence",
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
      "Provider call execution gate is local dry-run only.",
      "No provider call, request dispatch, response intake, response review, result persistence, storage activation, task creation, intervention creation or execution is performed.",
      "Explicit provider approval remains locked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V17.6 prepares provider call execution governance only.",
    ],
  };
}

export const aiProviderCallExecutionGateVersion = "V17.6";
