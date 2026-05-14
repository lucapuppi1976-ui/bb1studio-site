export type ProviderRuntimeCanaryExecutionMode = "dry-run" | "canary-board-review";

export type ProviderCanarySeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderCanaryPriority = "low" | "medium" | "high" | "urgent";

export type ProviderCanaryReadinessBand =
  | "blocked"
  | "canary-gate-design-ready"
  | "manual-board-review-ready"
  | "zero-call-canary-plan-ready";

export type ProviderCanaryLane =
  | "canary-execution-gate"
  | "provider-zero-call"
  | "canary-case-criteria"
  | "budget-envelope"
  | "reviewer-canary-approval"
  | "provider-result-boundary"
  | "canary-stop-plan"
  | "human-signoff";

export interface ProviderRuntimeCanaryGuardrail {
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
  providerStagingActivationAllowed: false;
  providerStagingActivationPerformed: false;
  providerRuntimeBetaAllowed: false;
  providerRuntimeBetaPerformed: false;
  providerRuntimeCanaryAllowed: false;
  providerRuntimeCanaryPerformed: false;
  providerCanaryCallAllowed: false;
  providerCanaryCallPerformed: false;
  canaryExecutionAllowed: false;
  canaryExecutionPerformed: false;
  canaryResultPersistenceAllowed: false;
  canaryResultPersistencePerformed: false;
  explicitActivationApprovalAllowed: false;
  explicitActivationApprovalPerformed: false;
  productionRuntimeAllowed: false;
  productionRuntimePerformed: false;
  providerRegistryWriteAllowed: false;
  providerRegistryWritePerformed: false;
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
  manualDispatchActivationAllowed: false;
  manualDispatchActivationPerformed: false;
  providerRuntimeCanaryExecutionGateReady: true;
  providerZeroCallLockReady: true;
  canaryStopPlanReady: true;
  canaryNoGoReady: true;
}

export interface ProviderRuntimeCanaryInput {
  canaryGateItemCount?: number;
  zeroCallLockItemCount?: number;
  caseCriteriaItemCount?: number;
  budgetEnvelopeItemCount?: number;
  reviewerApprovalItemCount?: number;
  resultBoundaryItemCount?: number;
  openCanaryGapCount?: number;
  onlineReadinessScore?: number;
  stagedProviderScore?: number;
  manualDispatchScore?: number;
  incidentBoardScore?: number;
  providerContractScore?: number;
  budgetEnvelopeScore?: number;
  reviewerApprovalScore?: number;
  canaryLeadRole?: string;
}

export interface ProviderCanarySourceNode {
  id: string;
  lane: ProviderCanaryLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderCanarySeverity;
  priority: ProviderCanaryPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface CanaryExecutionGateItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  gateScore: number;
  severity: ProviderCanarySeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ProviderZeroCallLockItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  lockScore: number;
  severity: ProviderCanarySeverity;
  lockRule: string;
  blockedOutcome: string;
}

export interface CanaryCaseCriteriaItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  criteriaScore: number;
  priority: ProviderCanaryPriority;
  criteriaQuestion: string;
  requiredControls: string[];
  blockedOutcome: string;
}

export interface CanaryBudgetEnvelopeItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  budgetScore: number;
  priority: ProviderCanaryPriority;
  budgetQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface ReviewerCanaryApprovalItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  approvalScore: number;
  severity: ProviderCanarySeverity;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ProviderResultBoundaryItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  boundaryScore: number;
  severity: ProviderCanarySeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface CanaryStopPlanItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  stopScore: number;
  priority: ProviderCanaryPriority;
  stopQuestion: string;
  safeFallback: string;
}

export interface CanaryNoGoItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  goNoGoState: "no-go" | "design-only" | "zero-call-plan-ready";
  score: number;
  severity: ProviderCanarySeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface CanaryGateCheckItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  passed: boolean;
  score: number;
  severity: ProviderCanarySeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface CanaryBoardPackItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface CanaryFindingItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  severity: ProviderCanarySeverity;
  reason: string;
  manualResolution: string;
  blocksCanaryActivation: boolean;
}

export interface ProviderRuntimeCanaryExecutionReport {
  generatedAt: string;
  mode: ProviderRuntimeCanaryExecutionMode;
  context: Required<ProviderRuntimeCanaryInput>;
  readiness: ProviderRuntimeCanaryGuardrail;
  canaryGateScore: number;
  canaryGateStatus: ProviderCanaryReadinessBand;
  overallSeverity: ProviderCanarySeverity;
  sourceNodes: ProviderCanarySourceNode[];
  canaryExecutionGate: CanaryExecutionGateItem[];
  providerZeroCallLocks: ProviderZeroCallLockItem[];
  canaryCaseCriteria: CanaryCaseCriteriaItem[];
  canaryBudgetEnvelope: CanaryBudgetEnvelopeItem[];
  reviewerCanaryApproval: ReviewerCanaryApprovalItem[];
  providerResultBoundary: ProviderResultBoundaryItem[];
  canaryStopPlan: CanaryStopPlanItem[];
  canaryNoGoBoard: CanaryNoGoItem[];
  canaryGateChecks: CanaryGateCheckItem[];
  canaryBoardPack: CanaryBoardPackItem[];
  canaryFindings: CanaryFindingItem[];
  stagedRoadmap: {
    v168: string;
    v169: string;
    v170: string;
    v171: string;
    v172: string;
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

export const PROVIDER_RUNTIME_CANARY_GUARDRAIL: ProviderRuntimeCanaryGuardrail = {
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
  providerStagingActivationAllowed: false,
  providerStagingActivationPerformed: false,
  providerRuntimeBetaAllowed: false,
  providerRuntimeBetaPerformed: false,
  providerRuntimeCanaryAllowed: false,
  providerRuntimeCanaryPerformed: false,
  providerCanaryCallAllowed: false,
  providerCanaryCallPerformed: false,
  canaryExecutionAllowed: false,
  canaryExecutionPerformed: false,
  canaryResultPersistenceAllowed: false,
  canaryResultPersistencePerformed: false,
  explicitActivationApprovalAllowed: false,
  explicitActivationApprovalPerformed: false,
  productionRuntimeAllowed: false,
  productionRuntimePerformed: false,
  providerRegistryWriteAllowed: false,
  providerRegistryWritePerformed: false,
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
  manualDispatchActivationAllowed: false,
  manualDispatchActivationPerformed: false,
  providerRuntimeCanaryExecutionGateReady: true,
  providerZeroCallLockReady: true,
  canaryStopPlanReady: true,
  canaryNoGoReady: true,
};

const priorityWeight: Record<ProviderCanaryPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderRuntimeCanaryInput): Required<ProviderRuntimeCanaryInput> {
  return {
    canaryGateItemCount: input.canaryGateItemCount ?? 8,
    zeroCallLockItemCount: input.zeroCallLockItemCount ?? 8,
    caseCriteriaItemCount: input.caseCriteriaItemCount ?? 7,
    budgetEnvelopeItemCount: input.budgetEnvelopeItemCount ?? 7,
    reviewerApprovalItemCount: input.reviewerApprovalItemCount ?? 7,
    resultBoundaryItemCount: input.resultBoundaryItemCount ?? 7,
    openCanaryGapCount: input.openCanaryGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    stagedProviderScore: input.stagedProviderScore ?? 70,
    manualDispatchScore: input.manualDispatchScore ?? 70,
    incidentBoardScore: input.incidentBoardScore ?? 70,
    providerContractScore: input.providerContractScore ?? 66,
    budgetEnvelopeScore: input.budgetEnvelopeScore ?? 64,
    reviewerApprovalScore: input.reviewerApprovalScore ?? 68,
    canaryLeadRole: input.canaryLeadRole ?? "provider runtime canary reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderCanarySeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderCanarySeverity): ProviderCanaryPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderCanaryReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-call-canary-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "canary-gate-design-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderCanaryLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderCanarySourceNode {
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
            "Provider runtime canary execution gate remains below activation threshold.",
            "Canary board must resolve zero-call lock, case criteria, budget envelope, reviewer approval and result boundary gaps before any later provider canary release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderRuntimeCanaryInput>): ProviderCanarySourceNode[] {
  const canaryPressure = context.canaryGateItemCount;
  const zeroCallPressure = context.zeroCallLockItemCount;
  const criteriaPressure = context.caseCriteriaItemCount * 2;
  const budgetPressure = context.budgetEnvelopeItemCount * 2;
  const approvalPressure = context.reviewerApprovalItemCount;
  const gapPressure = context.openCanaryGapCount * 2;

  return [
    buildSourceNode(
      "PRCE_NODE_001",
      "canary-execution-gate",
      "Staged provider runtime beta gate",
      "V16.4",
      context.stagedProviderScore,
      context.providerContractScore,
      canaryPressure,
      "Connect staged provider runtime beta to canary execution design.",
    ),
    buildSourceNode(
      "PRCE_NODE_002",
      "provider-zero-call",
      "Provider zero-call lock",
      "V16.8",
      100,
      context.onlineReadinessScore,
      zeroCallPressure,
      "Keep every provider canary call disabled.",
    ),
    buildSourceNode(
      "PRCE_NODE_003",
      "canary-case-criteria",
      "Manual dispatch activation gate",
      "V16.7",
      context.manualDispatchScore,
      context.reviewerApprovalScore,
      criteriaPressure,
      "Define future canary case criteria without dispatch or work creation.",
    ),
    buildSourceNode(
      "PRCE_NODE_004",
      "budget-envelope",
      "Budget envelope readiness",
      "V16.8",
      context.budgetEnvelopeScore,
      context.providerContractScore,
      budgetPressure,
      "Prepare provider budget envelope without provider calls.",
    ),
    buildSourceNode(
      "PRCE_NODE_005",
      "reviewer-canary-approval",
      "Reviewer approval board",
      "V16.8",
      context.reviewerApprovalScore,
      context.stagedProviderScore,
      approvalPressure,
      "Require human approval for any later provider canary release.",
    ),
    buildSourceNode(
      "PRCE_NODE_006",
      "provider-result-boundary",
      "Runtime incident response board",
      "V16.5",
      context.incidentBoardScore,
      context.providerContractScore,
      context.resultBoundaryItemCount,
      "Prepare provider result boundary and failure routing without result persistence.",
    ),
    buildSourceNode(
      "PRCE_NODE_007",
      "canary-stop-plan",
      "Provider stop plan",
      "V16.1",
      context.incidentBoardScore,
      context.budgetEnvelopeScore,
      gapPressure,
      "Keep rollback and stop path design-only.",
    ),
    buildSourceNode(
      "PRCE_NODE_008",
      "human-signoff",
      "Provider canary human signoff",
      "V16.8",
      context.reviewerApprovalScore,
      context.budgetEnvelopeScore,
      gapPressure,
      "Keep canary execution blocked until a separate explicit provider canary release.",
    ),
  ];
}

function buildCanaryExecutionGate(context: Required<ProviderRuntimeCanaryInput>): CanaryExecutionGateItem[] {
  return [
    {
      id: "PRCE_GATEPLAN_001",
      label: "Provider canary execution lock",
      lane: "canary-execution-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep provider runtime canary execution disabled in V16.8.",
      requiredEvidence: ["providerRuntimeCanaryAllowed=false", "providerCanaryCallAllowed=false", "canaryExecutionAllowed=false"],
      blockedOutcome: "No provider canary execution.",
    },
    {
      id: "PRCE_GATEPLAN_002",
      label: "Zero-call canary plan",
      lane: "canary-execution-gate",
      gateScore: clampScore(context.stagedProviderScore),
      severity: severityFromConcern(100 - context.stagedProviderScore + context.canaryGateItemCount * 4),
      gatePurpose: "Prepare canary plan without a provider call.",
      requiredEvidence: ["case criteria", "budget envelope", "reviewer approval", "stop plan"],
      blockedOutcome: "No provider request is sent.",
    },
    {
      id: "PRCE_GATEPLAN_003",
      label: "Explicit canary approval lock",
      lane: "canary-execution-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require explicit approval in a separate future release.",
      requiredEvidence: ["explicitActivationApprovalAllowed=false", "providerRuntimeBetaAllowed=false"],
      blockedOutcome: "No activation approval.",
    },
  ];
}

function buildProviderZeroCallLocks(): ProviderZeroCallLockItem[] {
  return [
    {
      id: "PRCE_ZERO_001",
      label: "Provider call lock",
      lane: "provider-zero-call",
      lockScore: 100,
      severity: "critical",
      lockRule: "No provider call can occur.",
      blockedOutcome: "providerCalled=false",
    },
    {
      id: "PRCE_ZERO_002",
      label: "Provider canary call lock",
      lane: "provider-zero-call",
      lockScore: 100,
      severity: "critical",
      lockRule: "No canary call can occur.",
      blockedOutcome: "providerCanaryCallAllowed=false",
    },
    {
      id: "PRCE_ZERO_003",
      label: "Provider result persistence lock",
      lane: "provider-zero-call",
      lockScore: 100,
      severity: "critical",
      lockRule: "No provider canary result is persisted.",
      blockedOutcome: "canaryResultPersistenceAllowed=false",
    },
  ];
}

function buildCanaryCaseCriteria(context: Required<ProviderRuntimeCanaryInput>): CanaryCaseCriteriaItem[] {
  return [
    {
      id: "PRCE_CRITERIA_001",
      label: "Reviewer-approved case criteria",
      lane: "canary-case-criteria",
      criteriaScore: clampScore(context.reviewerApprovalScore),
      priority: context.reviewerApprovalScore < 70 ? "urgent" : "high",
      criteriaQuestion: "Can future canary cases require reviewer approval?",
      requiredControls: ["reviewer role", "case caveat", "manual board note"],
      blockedOutcome: "No case is sent to provider.",
    },
    {
      id: "PRCE_CRITERIA_002",
      label: "Non-operational case criteria",
      lane: "canary-case-criteria",
      criteriaScore: 100,
      priority: "urgent",
      criteriaQuestion: "Can future canary cases remain non-operational?",
      requiredControls: ["no dispatch", "no task creation", "no intervention creation", "human review"],
      blockedOutcome: "No operational canary.",
    },
    {
      id: "PRCE_CRITERIA_003",
      label: "Safety caveat criteria",
      lane: "canary-case-criteria",
      criteriaScore: clampScore(context.manualDispatchScore),
      priority: "high",
      criteriaQuestion: "Can unsafe output classes remain excluded?",
      requiredControls: ["no product advice", "no dosage guidance", "no execution instruction"],
      blockedOutcome: "No unsafe output path.",
    },
  ];
}

function buildCanaryBudgetEnvelope(context: Required<ProviderRuntimeCanaryInput>): CanaryBudgetEnvelopeItem[] {
  return [
    {
      id: "PRCE_BUDGET_001",
      label: "Daily canary envelope",
      lane: "budget-envelope",
      budgetScore: clampScore(context.budgetEnvelopeScore),
      priority: context.budgetEnvelopeScore < 70 ? "urgent" : "high",
      budgetQuestion: "Can a future canary be capped by day?",
      requiredControls: ["daily cap", "manual approval", "stop path"],
      manualResolution: "Keep budget as dry-run design.",
    },
    {
      id: "PRCE_BUDGET_002",
      label: "Per-case canary envelope",
      lane: "budget-envelope",
      budgetScore: clampScore(context.budgetEnvelopeScore - context.budgetEnvelopeItemCount),
      priority: "urgent",
      budgetQuestion: "Can individual future canary cases be capped?",
      requiredControls: ["case cap", "attempt reason", "review hold"],
      manualResolution: "No canary attempt in V16.8.",
    },
    {
      id: "PRCE_BUDGET_003",
      label: "Budget anomaly stop",
      lane: "budget-envelope",
      budgetScore: clampScore(context.incidentBoardScore),
      priority: "high",
      budgetQuestion: "Can a future budget anomaly stop provider canary work?",
      requiredControls: ["anomaly class", "provider stop", "fallback board"],
      manualResolution: "Return to local dry-run.",
    },
  ];
}

function buildReviewerCanaryApproval(context: Required<ProviderRuntimeCanaryInput>): ReviewerCanaryApprovalItem[] {
  return [
    {
      id: "PRCE_APPROVAL_001",
      label: "Reviewer canary approval design",
      lane: "reviewer-canary-approval",
      approvalScore: clampScore(context.reviewerApprovalScore),
      severity: severityFromConcern(100 - context.reviewerApprovalScore + context.reviewerApprovalItemCount * 4),
      approvalQuestion: "Can future canary execution require reviewer approval?",
      requiredEvidence: ["reviewer role", "approval board note", "zero-call state"],
      blockedOutcome: "No approval persistence.",
    },
    {
      id: "PRCE_APPROVAL_002",
      label: "Provider contract approval design",
      lane: "reviewer-canary-approval",
      approvalScore: clampScore(context.providerContractScore),
      severity: "elevated",
      approvalQuestion: "Can provider contract be reviewed before future canary execution?",
      requiredEvidence: ["response contract", "failure hold", "fallback route"],
      blockedOutcome: "No provider contract activation.",
    },
    {
      id: "PRCE_APPROVAL_003",
      label: "Safety canary approval design",
      lane: "reviewer-canary-approval",
      approvalScore: 100,
      severity: "critical",
      approvalQuestion: "Can safety locks be confirmed before any later canary?",
      requiredEvidence: ["product locked", "dosage locked", "execution locked"],
      blockedOutcome: "No safety approval activation.",
    },
  ];
}

function buildProviderResultBoundary(): ProviderResultBoundaryItem[] {
  return [
    {
      id: "PRCE_BOUNDARY_001",
      label: "Provider result persistence boundary",
      lane: "provider-result-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider canary result can be persisted.",
      blockedOutcome: "canaryResultPersistencePerformed=false",
    },
    {
      id: "PRCE_BOUNDARY_002",
      label: "Provider output safety boundary",
      lane: "provider-result-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider output can create product, dosage or execution content.",
      blockedOutcome: "productPrescriptionPerformed=false",
    },
    {
      id: "PRCE_BOUNDARY_003",
      label: "Provider work conversion boundary",
      lane: "provider-result-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider output can create task or intervention work.",
      blockedOutcome: "taskCreated=false",
    },
  ];
}

function buildCanaryStopPlan(context: Required<ProviderRuntimeCanaryInput>): CanaryStopPlanItem[] {
  return [
    {
      id: "PRCE_STOP_001",
      label: "Provider canary stop plan",
      lane: "canary-stop-plan",
      stopScore: clampScore(context.incidentBoardScore),
      priority: context.incidentBoardScore < 70 ? "urgent" : "high",
      stopQuestion: "Can a later provider canary return to zero-call state?",
      safeFallback: "Return to local dry-run report and reviewer hold.",
    },
    {
      id: "PRCE_STOP_002",
      label: "Budget stop plan",
      lane: "canary-stop-plan",
      stopScore: clampScore(context.budgetEnvelopeScore),
      priority: "urgent",
      stopQuestion: "Can abnormal future provider cost stop canary execution?",
      safeFallback: "Stop canary and hold for human board.",
    },
    {
      id: "PRCE_STOP_003",
      label: "Unsafe output stop plan",
      lane: "canary-stop-plan",
      stopScore: 100,
      priority: "urgent",
      stopQuestion: "Can unsafe future output stop canary execution?",
      safeFallback: "Block output and require human review.",
    },
  ];
}

function buildCanaryNoGoBoard(): CanaryNoGoItem[] {
  return [
    {
      id: "PRCE_GONOGO_001",
      label: "Provider canary execution plan",
      lane: "human-signoff",
      goNoGoState: "zero-call-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["zero-call lock", "case criteria", "budget envelope", "reviewer approval"],
      safeOutcome: "Canary execution plan only.",
    },
    {
      id: "PRCE_GONOGO_002",
      label: "Actual provider canary execution",
      lane: "canary-execution-gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate provider canary release", "explicit activation approval", "runtime proof"],
      safeOutcome: "Provider canary execution remains blocked.",
    },
    {
      id: "PRCE_GONOGO_003",
      label: "Production provider runtime",
      lane: "provider-zero-call",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate production release", "provider proof", "rollback proof"],
      safeOutcome: "Production provider runtime remains blocked.",
    },
  ];
}

function buildCanaryGateChecks(
  context: Required<ProviderRuntimeCanaryInput>,
  sourceNodes: ProviderCanarySourceNode[],
): CanaryGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PRCE_CHECK_001",
      label: "Canary gate remains zero-call",
      lane: "canary-execution-gate" as ProviderCanaryLane,
      score: 100,
      reviewer: "provider runtime canary reviewer",
      requiredEvidence: ["providerCalled=false", "providerCanaryCallAllowed=false", "canaryExecutionAllowed=false"],
      hardStop: "Do not activate provider canary execution in V16.8.",
    },
    {
      id: "PRCE_CHECK_002",
      label: "Zero-call locks are complete",
      lane: "provider-zero-call" as ProviderCanaryLane,
      score: 100,
      reviewer: "provider zero-call reviewer",
      requiredEvidence: ["provider call lock", "canary call lock", "result persistence lock"],
      hardStop: "Zero-call locks must remain active.",
    },
    {
      id: "PRCE_CHECK_003",
      label: "Canary case criteria are complete enough",
      lane: "canary-case-criteria" as ProviderCanaryLane,
      score: context.reviewerApprovalScore - context.caseCriteriaItemCount * 3,
      reviewer: context.canaryLeadRole,
      requiredEvidence: ["reviewer criteria", "non-operational criteria", "safety caveat criteria"],
      hardStop: "Do not proceed without canary case criteria.",
    },
    {
      id: "PRCE_CHECK_004",
      label: "Budget envelope is complete enough",
      lane: "budget-envelope" as ProviderCanaryLane,
      score: context.budgetEnvelopeScore - context.budgetEnvelopeItemCount * 3,
      reviewer: "canary budget reviewer",
      requiredEvidence: ["daily envelope", "per-case envelope", "budget anomaly stop"],
      hardStop: "Do not proceed without budget envelope board.",
    },
    {
      id: "PRCE_CHECK_005",
      label: "Reviewer canary approval is complete enough",
      lane: "reviewer-canary-approval" as ProviderCanaryLane,
      score: context.reviewerApprovalScore - context.reviewerApprovalItemCount * 3,
      reviewer: "reviewer canary approval board",
      requiredEvidence: ["reviewer approval", "contract approval", "safety approval"],
      hardStop: "Do not proceed without reviewer canary approval.",
    },
    {
      id: "PRCE_CHECK_006",
      label: "Source blockers are within canary tolerance",
      lane: "human-signoff" as ProviderCanaryLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before zero-call-canary-plan-ready state.",
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

function buildBoardPack(context: Required<ProviderRuntimeCanaryInput>): CanaryBoardPackItem[] {
  return [
    {
      id: "PRCE_PACK_001",
      label: "Provider canary gate packet",
      lane: "canary-execution-gate",
      packReady: context.stagedProviderScore >= 60,
      readinessScore: clampScore(context.stagedProviderScore),
      reviewerCheck: "Confirm provider canary remains zero-call and design-only.",
      includedSections: ["canary gate", "zero-call locks", "canary no-go"],
      blockedSections: ["provider call", "provider result persistence", "runtime activation"],
    },
    {
      id: "PRCE_PACK_002",
      label: "Criteria and budget packet",
      lane: "canary-case-criteria",
      packReady: context.reviewerApprovalScore >= 60 && context.budgetEnvelopeScore >= 60,
      readinessScore: clampScore((context.reviewerApprovalScore + context.budgetEnvelopeScore) / 2),
      reviewerCheck: "Confirm criteria and budget remain dry-run.",
      includedSections: ["case criteria", "budget envelope", "reviewer approval"],
      blockedSections: ["provider request send", "case storage", "budget use"],
    },
    {
      id: "PRCE_PACK_003",
      label: "Boundary and stop packet",
      lane: "provider-result-boundary",
      packReady: context.incidentBoardScore >= 60,
      readinessScore: clampScore(context.incidentBoardScore),
      reviewerCheck: "Confirm result boundaries and stop plan are ready before any later release.",
      includedSections: ["result boundary", "stop plan", "unsafe output stop"],
      blockedSections: ["task creation", "intervention creation", "product or dosage guidance"],
    },
  ];
}

function buildFindings(
  context: Required<ProviderRuntimeCanaryInput>,
  sourceNodes: ProviderCanarySourceNode[],
  gates: CanaryGateCheckItem[],
  goNoGo: CanaryNoGoItem[],
): CanaryFindingItem[] {
  const findings: CanaryFindingItem[] = [];

  if (context.openCanaryGapCount > 0) {
    findings.push({
      id: "PRCE_FINDING_001",
      label: "Open provider canary gaps",
      lane: "human-signoff",
      severity: context.openCanaryGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openCanaryGapCount} provider canary gaps remain before any later activation.`,
      manualResolution: "Resolve zero-call, criteria, budget, approval and stop gaps in a later gated release.",
      blocksCanaryActivation: true,
    });
  }

  if (context.providerContractScore < 70) {
    findings.push({
      id: "PRCE_FINDING_002",
      label: "Provider contract below threshold",
      lane: "reviewer-canary-approval",
      severity: "critical",
      reason: "Provider contract readiness is not mature enough for canary activation.",
      manualResolution: "Complete response contract, failure hold and fallback route review.",
      blocksCanaryActivation: true,
    });
  }

  if (context.budgetEnvelopeScore < 70) {
    findings.push({
      id: "PRCE_FINDING_003",
      label: "Budget envelope below threshold",
      lane: "budget-envelope",
      severity: "critical",
      reason: "Budget envelope is not mature enough for canary activation.",
      manualResolution: "Complete daily, per-case and anomaly budget controls.",
      blocksCanaryActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `PRCE_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksCanaryActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `PRCE_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Canary gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksCanaryActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `PRCE_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksCanaryActivation: true,
      });
    });

  return findings;
}

export function buildAiProviderRuntimeCanaryExecutionReport(
  input: ProviderRuntimeCanaryInput = {},
): ProviderRuntimeCanaryExecutionReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const canaryExecutionGate = buildCanaryExecutionGate(context);
  const providerZeroCallLocks = buildProviderZeroCallLocks();
  const canaryCaseCriteria = buildCanaryCaseCriteria(context);
  const canaryBudgetEnvelope = buildCanaryBudgetEnvelope(context);
  const reviewerCanaryApproval = buildReviewerCanaryApproval(context);
  const providerResultBoundary = buildProviderResultBoundary();
  const canaryStopPlan = buildCanaryStopPlan(context);
  const canaryNoGoBoard = buildCanaryNoGoBoard();
  const canaryGateChecks = buildCanaryGateChecks(context, sourceNodes);
  const canaryBoardPack = buildBoardPack(context);
  const canaryFindings = buildFindings(context, sourceNodes, canaryGateChecks, canaryNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    canaryExecutionGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, canaryExecutionGate.length);

  const criteriaAverage =
    canaryCaseCriteria.reduce((sum, item) => sum + item.criteriaScore, 0) /
    Math.max(1, canaryCaseCriteria.length);

  const gateAverage =
    canaryGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, canaryGateChecks.length);

  const findingPenalty = canaryFindings.filter((item) => item.blocksCanaryActivation).length * 7;
  const budgetPressure =
    canaryBudgetEnvelope.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, canaryBudgetEnvelope.length * 4);

  const canaryGateScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      criteriaAverage / 4 +
      gateAverage / 4 +
      budgetPressure -
      findingPenalty -
      context.openCanaryGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openCanaryGapCount * 8 +
        context.canaryGateItemCount * 6 +
        context.caseCriteriaItemCount * 5 +
        context.budgetEnvelopeItemCount * 6 +
        context.reviewerApprovalItemCount * 5,
    ),
  );

  const canaryGateStatus = bandFromScore(
    canaryGateScore,
    canaryFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_RUNTIME_CANARY_GUARDRAIL,
    canaryGateScore,
    canaryGateStatus,
    overallSeverity,
    sourceNodes,
    canaryExecutionGate,
    providerZeroCallLocks,
    canaryCaseCriteria,
    canaryBudgetEnvelope,
    reviewerCanaryApproval,
    providerResultBoundary,
    canaryStopPlan,
    canaryNoGoBoard,
    canaryGateChecks,
    canaryBoardPack,
    canaryFindings,
    stagedRoadmap: {
      v168: "Provider runtime canary execution gate in zero-call dry-run.",
      v169: "Runtime incident handling only after explicit activation approval.",
      v170: "Public compliance export only after explicit legal and privacy approval.",
      v171: "Manual dispatch write path only after explicit operational approval.",
      v172: "Provider canary call execution only after explicit provider approval.",
    },
    redactedExportBundle: {
      exportId: "provider_runtime_canary_execution_v16_8_redacted_dry_run",
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
        "canary execution gate",
        "provider zero-call locks",
        "canary case criteria",
        "canary budget envelope",
        "reviewer canary approval",
        "provider result boundary",
        "canary stop plan",
        "canary no-go board",
        "canary gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider runtime canary execution gate is local dry-run only.",
      "No provider call, provider canary call, canary execution, provider result persistence, storage activation, task creation, intervention creation or execution is performed.",
      "Provider zero-call lock remains active.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V16.8 prepares provider canary execution governance only.",
    ],
  };
}

export const aiProviderRuntimeCanaryExecutionVersion = "V16.8";
