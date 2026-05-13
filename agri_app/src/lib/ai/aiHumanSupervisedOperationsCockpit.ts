export type HumanSupervisedOperationsCockpitMode = "dry-run" | "operator-board-review";

export type HumanSupervisedOperationsSeverity = "info" | "watch" | "elevated" | "critical";

export type HumanSupervisedOperationsPriority = "low" | "medium" | "high" | "urgent";

export type HumanSupervisedOperationsReadinessBand =
  | "blocked"
  | "cockpit-design-ready"
  | "manual-board-review-ready"
  | "supervision-plan-ready";

export type HumanSupervisedOperationsLane =
  | "operator-board"
  | "manual-dispatch"
  | "reviewer-queue"
  | "escalation-path"
  | "safety-boundary"
  | "operational-evidence"
  | "execution-no-go"
  | "human-signoff";

export interface HumanSupervisedOperationsGuardrail {
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
  humanSupervisedCockpitReady: true;
  manualDispatchReadinessReady: true;
  escalationPathReady: true;
  executionNoGoReady: true;
}

export interface HumanSupervisedOperationsInput {
  operatorBoardItemCount?: number;
  manualDispatchItemCount?: number;
  reviewerQueueItemCount?: number;
  escalationPathItemCount?: number;
  safetyBoundaryItemCount?: number;
  operationalEvidenceItemCount?: number;
  openOperationsGapCount?: number;
  onlineReadinessScore?: number;
  auditPackageScore?: number;
  hardeningScore?: number;
  reviewerReadinessScore?: number;
  dispatchDesignScore?: number;
  escalationScore?: number;
  safetyBoundaryScore?: number;
  operationsLeadRole?: string;
}

export interface HumanSupervisedSourceNode {
  id: string;
  lane: HumanSupervisedOperationsLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: HumanSupervisedOperationsSeverity;
  priority: HumanSupervisedOperationsPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface OperatorBoardItem {
  id: string;
  label: string;
  lane: HumanSupervisedOperationsLane;
  boardScore: number;
  severity: HumanSupervisedOperationsSeverity;
  boardPurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ManualDispatchReadinessItem {
  id: string;
  label: string;
  lane: HumanSupervisedOperationsLane;
  dispatchScore: number;
  priority: HumanSupervisedOperationsPriority;
  dispatchQuestion: string;
  requiredControls: string[];
  blockedOutcome: string;
}

export interface ReviewerQueueItem {
  id: string;
  label: string;
  lane: HumanSupervisedOperationsLane;
  queueScore: number;
  severity: HumanSupervisedOperationsSeverity;
  queueQuestion: string;
  requiredEvidence: string[];
  manualResolution: string;
}

export interface EscalationPathItem {
  id: string;
  label: string;
  lane: HumanSupervisedOperationsLane;
  escalationScore: number;
  severity: HumanSupervisedOperationsSeverity;
  escalationQuestion: string;
  safeFallback: string;
}

export interface SafetyBoundaryItem {
  id: string;
  label: string;
  lane: HumanSupervisedOperationsLane;
  boundaryScore: number;
  severity: HumanSupervisedOperationsSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface OperationalEvidenceItem {
  id: string;
  label: string;
  lane: HumanSupervisedOperationsLane;
  evidenceScore: number;
  priority: HumanSupervisedOperationsPriority;
  evidenceQuestion: string;
  evidenceFields: string[];
  blockedOutcome: string;
}

export interface ExecutionNoGoItem {
  id: string;
  label: string;
  lane: HumanSupervisedOperationsLane;
  goNoGoState: "no-go" | "design-only" | "supervision-ready";
  score: number;
  severity: HumanSupervisedOperationsSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface HumanSupervisedGateItem {
  id: string;
  label: string;
  lane: HumanSupervisedOperationsLane;
  passed: boolean;
  score: number;
  severity: HumanSupervisedOperationsSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface HumanSupervisedBoardPackItem {
  id: string;
  label: string;
  lane: HumanSupervisedOperationsLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface HumanSupervisedFindingItem {
  id: string;
  label: string;
  lane: HumanSupervisedOperationsLane;
  severity: HumanSupervisedOperationsSeverity;
  reason: string;
  manualResolution: string;
  blocksOperationalActivation: boolean;
}

export interface HumanSupervisedOperationsCockpitReport {
  generatedAt: string;
  mode: HumanSupervisedOperationsCockpitMode;
  context: Required<HumanSupervisedOperationsInput>;
  readiness: HumanSupervisedOperationsGuardrail;
  cockpitScore: number;
  cockpitStatus: HumanSupervisedOperationsReadinessBand;
  overallSeverity: HumanSupervisedOperationsSeverity;
  sourceNodes: HumanSupervisedSourceNode[];
  operatorBoard: OperatorBoardItem[];
  manualDispatchReadiness: ManualDispatchReadinessItem[];
  reviewerQueue: ReviewerQueueItem[];
  escalationPathPlan: EscalationPathItem[];
  safetyBoundary: SafetyBoundaryItem[];
  operationalEvidencePack: OperationalEvidenceItem[];
  executionNoGoBoard: ExecutionNoGoItem[];
  cockpitGates: HumanSupervisedGateItem[];
  cockpitBoardPack: HumanSupervisedBoardPackItem[];
  cockpitFindings: HumanSupervisedFindingItem[];
  stagedRoadmap: {
    v163: string;
    v164: string;
    v165: string;
    v166: string;
    v167: string;
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

export const HUMAN_SUPERVISED_OPERATIONS_GUARDRAIL: HumanSupervisedOperationsGuardrail = {
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
  humanSupervisedCockpitReady: true,
  manualDispatchReadinessReady: true,
  escalationPathReady: true,
  executionNoGoReady: true,
};

const priorityWeight: Record<HumanSupervisedOperationsPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: HumanSupervisedOperationsInput): Required<HumanSupervisedOperationsInput> {
  return {
    operatorBoardItemCount: input.operatorBoardItemCount ?? 8,
    manualDispatchItemCount: input.manualDispatchItemCount ?? 8,
    reviewerQueueItemCount: input.reviewerQueueItemCount ?? 7,
    escalationPathItemCount: input.escalationPathItemCount ?? 7,
    safetyBoundaryItemCount: input.safetyBoundaryItemCount ?? 7,
    operationalEvidenceItemCount: input.operationalEvidenceItemCount ?? 7,
    openOperationsGapCount: input.openOperationsGapCount ?? 8,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    auditPackageScore: input.auditPackageScore ?? 70,
    hardeningScore: input.hardeningScore ?? 70,
    reviewerReadinessScore: input.reviewerReadinessScore ?? 70,
    dispatchDesignScore: input.dispatchDesignScore ?? 64,
    escalationScore: input.escalationScore ?? 66,
    safetyBoundaryScore: input.safetyBoundaryScore ?? 68,
    operationsLeadRole: input.operationsLeadRole ?? "human supervised operations reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): HumanSupervisedOperationsSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: HumanSupervisedOperationsSeverity): HumanSupervisedOperationsPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): HumanSupervisedOperationsReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "supervision-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "cockpit-design-ready";
}

function buildSourceNode(
  id: string,
  lane: HumanSupervisedOperationsLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): HumanSupervisedSourceNode {
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
            "Human supervised operations cockpit remains below activation threshold.",
            "Operations board must resolve manual dispatch, reviewer queue, escalation, evidence and execution no-go gaps before any later runtime work.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<HumanSupervisedOperationsInput>): HumanSupervisedSourceNode[] {
  const boardPressure = context.operatorBoardItemCount;
  const dispatchPressure = context.manualDispatchItemCount * 2;
  const queuePressure = context.reviewerQueueItemCount;
  const escalationPressure = context.escalationPathItemCount * 2;
  const boundaryPressure = context.safetyBoundaryItemCount;
  const gapPressure = context.openOperationsGapCount * 2;

  return [
    buildSourceNode(
      "HSOC_NODE_001",
      "operator-board",
      "Operational audit package baseline",
      "V16.2",
      context.auditPackageScore,
      context.reviewerReadinessScore,
      boardPressure,
      "Translate audit package into human operator board design.",
    ),
    buildSourceNode(
      "HSOC_NODE_002",
      "manual-dispatch",
      "Manual dispatch design",
      "V16.3",
      context.dispatchDesignScore,
      context.reviewerReadinessScore,
      dispatchPressure,
      "Keep manual dispatch readiness as design only.",
    ),
    buildSourceNode(
      "HSOC_NODE_003",
      "reviewer-queue",
      "Reviewer evidence baseline",
      "V16.2",
      context.reviewerReadinessScore,
      context.auditPackageScore,
      queuePressure,
      "Prepare reviewer queue without persistence.",
    ),
    buildSourceNode(
      "HSOC_NODE_004",
      "escalation-path",
      "Post-beta fallback baseline",
      "V16.1",
      context.escalationScore,
      context.hardeningScore,
      escalationPressure,
      "Prepare escalation routes without runtime.",
    ),
    buildSourceNode(
      "HSOC_NODE_005",
      "safety-boundary",
      "Runtime lock baseline",
      "V16.1",
      context.safetyBoundaryScore,
      context.onlineReadinessScore,
      boundaryPressure,
      "Keep provider, storage, conversion and execution locked.",
    ),
    buildSourceNode(
      "HSOC_NODE_006",
      "operational-evidence",
      "Operational evidence baseline",
      "V16.2",
      context.auditPackageScore,
      context.safetyBoundaryScore,
      context.operationalEvidenceItemCount,
      "Prepare operational evidence pack without writes.",
    ),
    buildSourceNode(
      "HSOC_NODE_007",
      "execution-no-go",
      "Execution no-go boundary",
      "V16.3",
      100,
      context.safetyBoundaryScore,
      gapPressure,
      "Keep all execution routes blocked.",
    ),
    buildSourceNode(
      "HSOC_NODE_008",
      "human-signoff",
      "Human operations signoff",
      "V16.3",
      context.reviewerReadinessScore,
      context.escalationScore,
      gapPressure,
      "Keep later operational activation blocked until explicit release.",
    ),
  ];
}

function buildOperatorBoard(context: Required<HumanSupervisedOperationsInput>): OperatorBoardItem[] {
  return [
    {
      id: "HSOC_BOARD_001",
      label: "Human operator board",
      lane: "operator-board",
      boardScore: clampScore(context.auditPackageScore),
      severity: severityFromConcern(100 - context.auditPackageScore + context.operatorBoardItemCount * 4),
      boardPurpose: "Represent agronomic operator supervision without activating operations.",
      requiredEvidence: ["reviewer queue", "manual dispatch design", "execution no-go board"],
      blockedOutcome: "No operational activation.",
    },
    {
      id: "HSOC_BOARD_002",
      label: "Case supervision board",
      lane: "operator-board",
      boardScore: clampScore(context.reviewerReadinessScore),
      severity: "elevated",
      boardPurpose: "Design how cases would be supervised by humans later.",
      requiredEvidence: ["case summary", "review note", "escalation route"],
      blockedOutcome: "No case persistence.",
    },
    {
      id: "HSOC_BOARD_003",
      label: "Safety posture board",
      lane: "operator-board",
      boardScore: 100,
      severity: "critical",
      boardPurpose: "Keep runtime locks visible to operators.",
      requiredEvidence: ["provider lock", "storage lock", "conversion lock", "execution lock"],
      blockedOutcome: "No runtime path.",
    },
  ];
}

function buildManualDispatchReadiness(context: Required<HumanSupervisedOperationsInput>): ManualDispatchReadinessItem[] {
  return [
    {
      id: "HSOC_DISPATCH_001",
      label: "Manual dispatch design",
      lane: "manual-dispatch",
      dispatchScore: clampScore(context.dispatchDesignScore),
      priority: context.dispatchDesignScore < 70 ? "urgent" : "high",
      dispatchQuestion: "Can manual dispatch readiness be reviewed without dispatch activation?",
      requiredControls: ["human review", "operator note", "execution no-go", "correction path"],
      blockedOutcome: "No dispatch activation.",
    },
    {
      id: "HSOC_DISPATCH_002",
      label: "Operator confirmation design",
      lane: "manual-dispatch",
      dispatchScore: clampScore(context.reviewerReadinessScore),
      priority: "high",
      dispatchQuestion: "Can future operators confirm decisions manually?",
      requiredControls: ["reviewer role", "reason note", "board hold"],
      blockedOutcome: "No manual conversion activation.",
    },
    {
      id: "HSOC_DISPATCH_003",
      label: "Dispatch fallback design",
      lane: "manual-dispatch",
      dispatchScore: clampScore(context.escalationScore),
      priority: "urgent",
      dispatchQuestion: "Can unclear decisions fall back to human board?",
      requiredControls: ["hold state", "escalation path", "no execution"],
      blockedOutcome: "No automatic dispatch.",
    },
  ];
}

function buildReviewerQueue(context: Required<HumanSupervisedOperationsInput>): ReviewerQueueItem[] {
  return [
    {
      id: "HSOC_QUEUE_001",
      label: "Reviewer queue design",
      lane: "reviewer-queue",
      queueScore: clampScore(context.reviewerReadinessScore),
      severity: severityFromConcern(100 - context.reviewerReadinessScore + context.reviewerQueueItemCount * 4),
      queueQuestion: "Can reviewer queue be designed without persistence?",
      requiredEvidence: ["review reason", "priority label", "board note"],
      manualResolution: "Keep queue local and dry-run only.",
    },
    {
      id: "HSOC_QUEUE_002",
      label: "Escalation queue design",
      lane: "reviewer-queue",
      queueScore: clampScore(context.escalationScore),
      severity: "elevated",
      queueQuestion: "Can escalations be routed to human board?",
      requiredEvidence: ["escalation reason", "fallback route", "no-go outcome"],
      manualResolution: "Keep escalation route as design only.",
    },
    {
      id: "HSOC_QUEUE_003",
      label: "Correction queue design",
      lane: "reviewer-queue",
      queueScore: clampScore(context.auditPackageScore),
      severity: "elevated",
      queueQuestion: "Can corrections be represented before activation?",
      requiredEvidence: ["correction note", "reviewer role", "audit section"],
      manualResolution: "No correction persistence in V16.3.",
    },
  ];
}

function buildEscalationPathPlan(context: Required<HumanSupervisedOperationsInput>): EscalationPathItem[] {
  return [
    {
      id: "HSOC_ESCALATION_001",
      label: "Agronomic uncertainty escalation",
      lane: "escalation-path",
      escalationScore: clampScore(context.escalationScore),
      severity: severityFromConcern(100 - context.escalationScore + context.escalationPathItemCount * 4),
      escalationQuestion: "Can uncertain cases be held for human agronomic review?",
      safeFallback: "Hold case in local board and block dispatch.",
    },
    {
      id: "HSOC_ESCALATION_002",
      label: "Safety escalation",
      lane: "escalation-path",
      escalationScore: 100,
      severity: "critical",
      escalationQuestion: "Can unsafe product, dose or execution language be escalated?",
      safeFallback: "Block output and require human safety board.",
    },
    {
      id: "HSOC_ESCALATION_003",
      label: "Evidence escalation",
      lane: "escalation-path",
      escalationScore: clampScore(context.auditPackageScore),
      severity: "elevated",
      escalationQuestion: "Can insufficient evidence be escalated?",
      safeFallback: "Request more evidence and keep local dry-run.",
    },
  ];
}

function buildSafetyBoundary(): SafetyBoundaryItem[] {
  return [
    {
      id: "HSOC_BOUNDARY_001",
      label: "Provider boundary",
      lane: "safety-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider call can occur.",
      blockedOutcome: "providerCalled=false",
    },
    {
      id: "HSOC_BOUNDARY_002",
      label: "Storage boundary",
      lane: "safety-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No AI case, review or memory storage can occur.",
      blockedOutcome: "persistencePerformed=false",
    },
    {
      id: "HSOC_BOUNDARY_003",
      label: "Execution boundary",
      lane: "safety-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No work creation, execution, product or dosage route can occur.",
      blockedOutcome: "automaticExecutionPerformed=false",
    },
  ];
}

function buildOperationalEvidencePack(context: Required<HumanSupervisedOperationsInput>): OperationalEvidenceItem[] {
  return [
    {
      id: "HSOC_EVIDENCE_001",
      label: "Operator review evidence",
      lane: "operational-evidence",
      evidenceScore: clampScore(context.reviewerReadinessScore),
      priority: "high",
      evidenceQuestion: "Can operator review evidence be represented without writes?",
      evidenceFields: ["operator role", "review reason", "board note"],
      blockedOutcome: "No review persistence.",
    },
    {
      id: "HSOC_EVIDENCE_002",
      label: "Safety boundary evidence",
      lane: "operational-evidence",
      evidenceScore: 100,
      priority: "urgent",
      evidenceQuestion: "Can safety locks be represented clearly?",
      evidenceFields: ["provider lock", "storage lock", "execution lock"],
      blockedOutcome: "No runtime activation.",
    },
    {
      id: "HSOC_EVIDENCE_003",
      label: "Dispatch readiness evidence",
      lane: "operational-evidence",
      evidenceScore: clampScore(context.dispatchDesignScore),
      priority: context.dispatchDesignScore < 70 ? "urgent" : "high",
      evidenceQuestion: "Can manual dispatch readiness be audited without activation?",
      evidenceFields: ["manual note", "dispatch hold", "fallback route"],
      blockedOutcome: "No dispatch.",
    },
  ];
}

function buildExecutionNoGoBoard(): ExecutionNoGoItem[] {
  return [
    {
      id: "HSOC_GONOGO_001",
      label: "Cockpit supervision design",
      lane: "human-signoff",
      goNoGoState: "supervision-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["operator board", "reviewer queue", "safety boundary"],
      safeOutcome: "Cockpit design only.",
    },
    {
      id: "HSOC_GONOGO_002",
      label: "Manual dispatch activation",
      lane: "manual-dispatch",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate activation release", "human board approval", "runtime proof"],
      safeOutcome: "Manual dispatch activation remains blocked.",
    },
    {
      id: "HSOC_GONOGO_003",
      label: "Automated execution",
      lane: "execution-no-go",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate operations release", "human approval", "manual dispatch policy"],
      safeOutcome: "Automation remains blocked.",
    },
  ];
}

function buildCockpitGates(
  context: Required<HumanSupervisedOperationsInput>,
  sourceNodes: HumanSupervisedSourceNode[],
): HumanSupervisedGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "HSOC_GATE_001",
      label: "Cockpit remains no-dispatch",
      lane: "execution-no-go" as HumanSupervisedOperationsLane,
      score: 100,
      reviewer: "human supervised operations reviewer",
      requiredEvidence: ["manualConversionAllowed=false", "taskCreated=false", "interventionCreated=false"],
      hardStop: "Do not activate dispatch or execution in V16.3.",
    },
    {
      id: "HSOC_GATE_002",
      label: "Operator board is complete enough",
      lane: "operator-board" as HumanSupervisedOperationsLane,
      score: context.auditPackageScore - context.operatorBoardItemCount * 3,
      reviewer: context.operationsLeadRole,
      requiredEvidence: ["operator board", "case supervision board", "safety posture board"],
      hardStop: "Do not proceed without operator board review.",
    },
    {
      id: "HSOC_GATE_003",
      label: "Manual dispatch design is complete enough",
      lane: "manual-dispatch" as HumanSupervisedOperationsLane,
      score: context.dispatchDesignScore - context.manualDispatchItemCount * 3,
      reviewer: "manual dispatch reviewer",
      requiredEvidence: ["manual dispatch design", "operator confirmation", "fallback design"],
      hardStop: "Do not proceed without dispatch readiness review.",
    },
    {
      id: "HSOC_GATE_004",
      label: "Reviewer queue is complete enough",
      lane: "reviewer-queue" as HumanSupervisedOperationsLane,
      score: context.reviewerReadinessScore - context.reviewerQueueItemCount * 3,
      reviewer: "reviewer queue board",
      requiredEvidence: ["reviewer queue", "escalation queue", "correction queue"],
      hardStop: "Do not proceed without reviewer queue review.",
    },
    {
      id: "HSOC_GATE_005",
      label: "Escalation path is complete enough",
      lane: "escalation-path" as HumanSupervisedOperationsLane,
      score: context.escalationScore - context.escalationPathItemCount * 3,
      reviewer: "escalation reviewer",
      requiredEvidence: ["uncertainty escalation", "safety escalation", "evidence escalation"],
      hardStop: "Do not proceed without escalation path review.",
    },
    {
      id: "HSOC_GATE_006",
      label: "Source blockers are within operations cockpit tolerance",
      lane: "human-signoff" as HumanSupervisedOperationsLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before supervision-plan-ready state.",
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

function buildBoardPack(context: Required<HumanSupervisedOperationsInput>): HumanSupervisedBoardPackItem[] {
  return [
    {
      id: "HSOC_PACK_001",
      label: "Operator board packet",
      lane: "operator-board",
      packReady: context.auditPackageScore >= 60,
      readinessScore: clampScore(context.auditPackageScore),
      reviewerCheck: "Confirm operator board remains design-only and no-write.",
      includedSections: ["operator board", "case supervision board", "safety posture board"],
      blockedSections: ["dispatch activation", "runtime activation"],
    },
    {
      id: "HSOC_PACK_002",
      label: "Manual dispatch packet",
      lane: "manual-dispatch",
      packReady: context.dispatchDesignScore >= 60,
      readinessScore: clampScore(context.dispatchDesignScore),
      reviewerCheck: "Confirm dispatch readiness is no-go in this release.",
      includedSections: ["dispatch design", "operator confirmation", "fallback route"],
      blockedSections: ["manual conversion activation", "task creation", "intervention creation"],
    },
    {
      id: "HSOC_PACK_003",
      label: "Escalation and evidence packet",
      lane: "escalation-path",
      packReady: context.escalationScore >= 60 && context.reviewerReadinessScore >= 60,
      readinessScore: clampScore((context.escalationScore + context.reviewerReadinessScore) / 2),
      reviewerCheck: "Confirm escalation and evidence remain local dry-run.",
      includedSections: ["escalation paths", "operational evidence", "execution no-go"],
      blockedSections: ["automatic escalation", "persistent review queue"],
    },
  ];
}

function buildFindings(
  context: Required<HumanSupervisedOperationsInput>,
  sourceNodes: HumanSupervisedSourceNode[],
  gates: HumanSupervisedGateItem[],
  goNoGo: ExecutionNoGoItem[],
): HumanSupervisedFindingItem[] {
  const findings: HumanSupervisedFindingItem[] = [];

  if (context.openOperationsGapCount > 0) {
    findings.push({
      id: "HSOC_FINDING_001",
      label: "Open operations cockpit gaps",
      lane: "human-signoff",
      severity: context.openOperationsGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openOperationsGapCount} operations cockpit gaps remain before later activation.`,
      manualResolution: "Resolve dispatch, queue, escalation and evidence gaps in a later gated release.",
      blocksOperationalActivation: true,
    });
  }

  if (context.dispatchDesignScore < 70) {
    findings.push({
      id: "HSOC_FINDING_002",
      label: "Manual dispatch readiness below threshold",
      lane: "manual-dispatch",
      severity: "critical",
      reason: "Manual dispatch readiness is not mature enough for activation.",
      manualResolution: "Complete dispatch controls and operator confirmation design.",
      blocksOperationalActivation: true,
    });
  }

  if (context.escalationScore < 70) {
    findings.push({
      id: "HSOC_FINDING_003",
      label: "Escalation path below threshold",
      lane: "escalation-path",
      severity: "critical",
      reason: "Escalation routes are not mature enough for operational activation.",
      manualResolution: "Complete uncertainty, safety and evidence escalation routes.",
      blocksOperationalActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `HSOC_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksOperationalActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `HSOC_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Cockpit gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksOperationalActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `HSOC_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksOperationalActivation: true,
      });
    });

  return findings;
}

export function buildAiHumanSupervisedOperationsCockpitReport(
  input: HumanSupervisedOperationsInput = {},
): HumanSupervisedOperationsCockpitReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const operatorBoard = buildOperatorBoard(context);
  const manualDispatchReadiness = buildManualDispatchReadiness(context);
  const reviewerQueue = buildReviewerQueue(context);
  const escalationPathPlan = buildEscalationPathPlan(context);
  const safetyBoundary = buildSafetyBoundary();
  const operationalEvidencePack = buildOperationalEvidencePack(context);
  const executionNoGoBoard = buildExecutionNoGoBoard();
  const cockpitGates = buildCockpitGates(context, sourceNodes);
  const cockpitBoardPack = buildBoardPack(context);
  const cockpitFindings = buildFindings(context, sourceNodes, cockpitGates, executionNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const boardAverage =
    operatorBoard.reduce((sum, item) => sum + item.boardScore, 0) /
    Math.max(1, operatorBoard.length);

  const dispatchAverage =
    manualDispatchReadiness.reduce((sum, item) => sum + item.dispatchScore, 0) /
    Math.max(1, manualDispatchReadiness.length);

  const gateAverage =
    cockpitGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, cockpitGates.length);

  const findingPenalty = cockpitFindings.filter((item) => item.blocksOperationalActivation).length * 7;
  const evidencePressure =
    operationalEvidencePack.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, operationalEvidencePack.length * 4);

  const cockpitScore = clampScore(
    sourceAverage / 4 +
      boardAverage / 4 +
      dispatchAverage / 4 +
      gateAverage / 4 +
      evidencePressure -
      findingPenalty -
      context.openOperationsGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openOperationsGapCount * 8 +
        context.manualDispatchItemCount * 6 +
        context.escalationPathItemCount * 6 +
        context.reviewerQueueItemCount * 5 +
        context.safetyBoundaryItemCount * 5,
    ),
  );

  const cockpitStatus = bandFromScore(
    cockpitScore,
    cockpitFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: HUMAN_SUPERVISED_OPERATIONS_GUARDRAIL,
    cockpitScore,
    cockpitStatus,
    overallSeverity,
    sourceNodes,
    operatorBoard,
    manualDispatchReadiness,
    reviewerQueue,
    escalationPathPlan,
    safetyBoundary,
    operationalEvidencePack,
    executionNoGoBoard,
    cockpitGates,
    cockpitBoardPack,
    cockpitFindings,
    stagedRoadmap: {
      v163: "Human-supervised agronomic operations cockpit in zero-activation dry-run.",
      v164: "Staged provider runtime beta only after explicit activation approval.",
      v165: "Runtime incident response board after explicit activation approval.",
      v166: "Compliance export activation only after explicit approval.",
      v167: "Manual dispatch activation only after explicit operational approval.",
    },
    redactedExportBundle: {
      exportId: "human_supervised_operations_cockpit_v16_3_redacted_dry_run",
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
        "operator board",
        "manual dispatch readiness",
        "reviewer queue",
        "escalation path plan",
        "safety boundary",
        "operational evidence pack",
        "execution no-go board",
        "cockpit gates",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Human-supervised operations cockpit is local dry-run only.",
      "No provider call, storage activation, review storage, manual dispatch activation, task creation, intervention creation or execution is performed.",
      "Runtime locks remain active and zero-activation mode remains true.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V16.3 prepares human operations cockpit governance only.",
    ],
  };
}

export const aiHumanSupervisedOperationsCockpitVersion = "V16.3";
