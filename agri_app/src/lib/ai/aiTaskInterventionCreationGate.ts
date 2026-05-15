export type TaskInterventionCreationMode = "dry-run" | "creation-board-review";

export type TaskInterventionCreationSeverity = "info" | "watch" | "elevated" | "critical";

export type TaskInterventionCreationPriority = "low" | "medium" | "high" | "urgent";

export type TaskInterventionCreationReadinessBand =
  | "blocked"
  | "creation-gate-design-ready"
  | "manual-board-review-ready"
  | "zero-write-creation-plan-ready";

export type TaskInterventionCreationLane =
  | "task_intervention_creation_gate"
  | "operational_write_approval"
  | "task_creation_boundary"
  | "intervention_creation_boundary"
  | "work_order_materialization_boundary"
  | "safety_execution_boundary"
  | "rollback_creation_plan"
  | "human_signoff";

export interface TaskInterventionCreationGuardrail {
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
  publicExportPackageWriteAllowed: false;
  publicExportPackageWritePerformed: false;
  manualDispatchActivationAllowed: false;
  manualDispatchActivationPerformed: false;
  manualDispatchWritePathAllowed: false;
  manualDispatchWritePathPerformed: false;
  incidentHandlingAllowed: false;
  incidentHandlingPerformed: false;
  incidentWriteAllowed: false;
  incidentWritePerformed: false;
  incidentHandlingWritePathAllowed: false;
  incidentHandlingWritePathPerformed: false;
  taskInterventionCreationAllowed: false;
  taskInterventionCreationPerformed: false;
  taskCreationApprovalAllowed: false;
  taskCreationApprovalPerformed: false;
  interventionCreationApprovalAllowed: false;
  interventionCreationApprovalPerformed: false;
  taskRecordWriteAllowed: false;
  taskRecordWritePerformed: false;
  interventionRecordWriteAllowed: false;
  interventionRecordWritePerformed: false;
  workOrderMaterializationAllowed: false;
  workOrderMaterializationPerformed: false;
  operationWriteApprovalAllowed: false;
  operationWriteApprovalPerformed: false;
  dispatchNotificationAllowed: false;
  dispatchNotificationPerformed: false;
  taskInterventionCreationGateReady: true;
  operationalWriteApprovalLockReady: true;
  workOrderMaterializationBoundaryReady: true;
  creationNoGoReady: true;
}

export interface TaskInterventionCreationInput {
  creationGateItemCount?: number;
  operationalApprovalItemCount?: number;
  taskBoundaryItemCount?: number;
  interventionBoundaryItemCount?: number;
  workOrderBoundaryItemCount?: number;
  safetyBoundaryItemCount?: number;
  openCreationGapCount?: number;
  onlineReadinessScore?: number;
  manualWritePathScore?: number;
  packageWriteScore?: number;
  providerCallGateScore?: number;
  operationalApprovalScore?: number;
  taskBoundaryScore?: number;
  interventionBoundaryScore?: number;
  creationLeadRole?: string;
}

export interface TaskInterventionCreationSourceNode {
  id: string;
  lane: TaskInterventionCreationLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: TaskInterventionCreationSeverity;
  priority: TaskInterventionCreationPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface CreationGateItem {
  id: string;
  label: string;
  lane: TaskInterventionCreationLane;
  gateScore: number;
  severity: TaskInterventionCreationSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface OperationalWriteApprovalItem {
  id: string;
  label: string;
  lane: TaskInterventionCreationLane;
  approvalScore: number;
  priority: TaskInterventionCreationPriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface TaskCreationBoundaryItem {
  id: string;
  label: string;
  lane: TaskInterventionCreationLane;
  boundaryScore: number;
  severity: TaskInterventionCreationSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface InterventionCreationBoundaryItem {
  id: string;
  label: string;
  lane: TaskInterventionCreationLane;
  boundaryScore: number;
  severity: TaskInterventionCreationSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface WorkOrderMaterializationBoundaryItem {
  id: string;
  label: string;
  lane: TaskInterventionCreationLane;
  boundaryScore: number;
  priority: TaskInterventionCreationPriority;
  materializationQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface SafetyExecutionBoundaryItem {
  id: string;
  label: string;
  lane: TaskInterventionCreationLane;
  safetyScore: number;
  severity: TaskInterventionCreationSeverity;
  safetyQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface RollbackCreationPlanItem {
  id: string;
  label: string;
  lane: TaskInterventionCreationLane;
  rollbackScore: number;
  priority: TaskInterventionCreationPriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface CreationNoGoItem {
  id: string;
  label: string;
  lane: TaskInterventionCreationLane;
  goNoGoState: "no-go" | "design-only" | "zero-write-creation-plan-ready";
  score: number;
  severity: TaskInterventionCreationSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface CreationGateCheckItem {
  id: string;
  label: string;
  lane: TaskInterventionCreationLane;
  passed: boolean;
  score: number;
  severity: TaskInterventionCreationSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface CreationBoardPackItem {
  id: string;
  label: string;
  lane: TaskInterventionCreationLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface CreationFindingItem {
  id: string;
  label: string;
  lane: TaskInterventionCreationLane;
  severity: TaskInterventionCreationSeverity;
  reason: string;
  manualResolution: string;
  blocksCreationActivation: boolean;
}

export interface TaskInterventionCreationReport {
  generatedAt: string;
  mode: TaskInterventionCreationMode;
  context: Required<TaskInterventionCreationInput>;
  readiness: TaskInterventionCreationGuardrail;
  creationScore: number;
  creationStatus: TaskInterventionCreationReadinessBand;
  overallSeverity: TaskInterventionCreationSeverity;
  sourceNodes: TaskInterventionCreationSourceNode[];
  creationGate: CreationGateItem[];
  operationalWriteApprovalLock: OperationalWriteApprovalItem[];
  taskCreationBoundary: TaskCreationBoundaryItem[];
  interventionCreationBoundary: InterventionCreationBoundaryItem[];
  workOrderMaterializationBoundary: WorkOrderMaterializationBoundaryItem[];
  safetyExecutionBoundary: SafetyExecutionBoundaryItem[];
  rollbackCreationPlan: RollbackCreationPlanItem[];
  creationNoGoBoard: CreationNoGoItem[];
  creationGateChecks: CreationGateCheckItem[];
  creationBoardPack: CreationBoardPackItem[];
  creationFindings: CreationFindingItem[];
  stagedRoadmap: {
    v175: string;
    v176: string;
    v177: string;
    v178: string;
    v179: string;
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

export const TASK_INTERVENTION_CREATION_GUARDRAIL: TaskInterventionCreationGuardrail = {
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
  publicExportPackageWriteAllowed: false,
  publicExportPackageWritePerformed: false,
  manualDispatchActivationAllowed: false,
  manualDispatchActivationPerformed: false,
  manualDispatchWritePathAllowed: false,
  manualDispatchWritePathPerformed: false,
  incidentHandlingAllowed: false,
  incidentHandlingPerformed: false,
  incidentWriteAllowed: false,
  incidentWritePerformed: false,
  incidentHandlingWritePathAllowed: false,
  incidentHandlingWritePathPerformed: false,
  taskInterventionCreationAllowed: false,
  taskInterventionCreationPerformed: false,
  taskCreationApprovalAllowed: false,
  taskCreationApprovalPerformed: false,
  interventionCreationApprovalAllowed: false,
  interventionCreationApprovalPerformed: false,
  taskRecordWriteAllowed: false,
  taskRecordWritePerformed: false,
  interventionRecordWriteAllowed: false,
  interventionRecordWritePerformed: false,
  workOrderMaterializationAllowed: false,
  workOrderMaterializationPerformed: false,
  operationWriteApprovalAllowed: false,
  operationWriteApprovalPerformed: false,
  dispatchNotificationAllowed: false,
  dispatchNotificationPerformed: false,
  taskInterventionCreationGateReady: true,
  operationalWriteApprovalLockReady: true,
  workOrderMaterializationBoundaryReady: true,
  creationNoGoReady: true,
};

const priorityWeight: Record<TaskInterventionCreationPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: TaskInterventionCreationInput): Required<TaskInterventionCreationInput> {
  return {
    creationGateItemCount: input.creationGateItemCount ?? 8,
    operationalApprovalItemCount: input.operationalApprovalItemCount ?? 8,
    taskBoundaryItemCount: input.taskBoundaryItemCount ?? 8,
    interventionBoundaryItemCount: input.interventionBoundaryItemCount ?? 8,
    workOrderBoundaryItemCount: input.workOrderBoundaryItemCount ?? 7,
    safetyBoundaryItemCount: input.safetyBoundaryItemCount ?? 7,
    openCreationGapCount: input.openCreationGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    manualWritePathScore: input.manualWritePathScore ?? 70,
    packageWriteScore: input.packageWriteScore ?? 70,
    providerCallGateScore: input.providerCallGateScore ?? 70,
    operationalApprovalScore: input.operationalApprovalScore ?? 66,
    taskBoundaryScore: input.taskBoundaryScore ?? 68,
    interventionBoundaryScore: input.interventionBoundaryScore ?? 66,
    creationLeadRole: input.creationLeadRole ?? "task intervention creation reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TaskInterventionCreationSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: TaskInterventionCreationSeverity): TaskInterventionCreationPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): TaskInterventionCreationReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-write-creation-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "creation-gate-design-ready";
}

function buildSourceNode(
  id: string,
  lane: TaskInterventionCreationLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): TaskInterventionCreationSourceNode {
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
            "Creation gate remains below activation threshold.",
            "Creation board must resolve operational approval, record boundary, materialization and rollback gaps before any later write release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<TaskInterventionCreationInput>): TaskInterventionCreationSourceNode[] {
  const creationPressure = context.creationGateItemCount;
  const approvalPressure = context.operationalApprovalItemCount * 2;
  const taskPressure = context.taskBoundaryItemCount;
  const interventionPressure = context.interventionBoundaryItemCount * 2;
  const workPressure = context.workOrderBoundaryItemCount;
  const gapPressure = context.openCreationGapCount * 2;

  return [
    buildSourceNode(
      "TICG_NODE_001",
      "task_intervention_creation_gate",
      "Manual dispatch write path gate",
      "V17.1",
      context.manualWritePathScore,
      context.operationalApprovalScore,
      creationPressure,
      "Connect manual dispatch write path design to future creation governance.",
    ),
    buildSourceNode(
      "TICG_NODE_002",
      "operational_write_approval",
      "Operational write approval lock",
      "V17.5",
      context.operationalApprovalScore,
      context.manualWritePathScore,
      approvalPressure,
      "Prepare operational approval without creating records.",
    ),
    buildSourceNode(
      "TICG_NODE_003",
      "task_creation_boundary",
      "Task creation boundary",
      "V17.5",
      context.taskBoundaryScore,
      context.operationalApprovalScore,
      taskPressure,
      "Keep task record writes blocked.",
    ),
    buildSourceNode(
      "TICG_NODE_004",
      "intervention_creation_boundary",
      "Intervention creation boundary",
      "V17.5",
      context.interventionBoundaryScore,
      context.operationalApprovalScore,
      interventionPressure,
      "Keep intervention record writes blocked.",
    ),
    buildSourceNode(
      "TICG_NODE_005",
      "work_order_materialization_boundary",
      "Public export package write path gate",
      "V17.4",
      context.packageWriteScore,
      context.taskBoundaryScore,
      workPressure,
      "Keep work order materialization separated from public export artifacts.",
    ),
    buildSourceNode(
      "TICG_NODE_006",
      "safety_execution_boundary",
      "Provider canary call execution gate",
      "V17.2",
      context.providerCallGateScore,
      context.onlineReadinessScore,
      context.safetyBoundaryItemCount,
      "Keep provider output, unsafe action and execution blocked.",
    ),
    buildSourceNode(
      "TICG_NODE_007",
      "rollback_creation_plan",
      "Creation rollback plan",
      "V17.5",
      context.manualWritePathScore,
      context.interventionBoundaryScore,
      gapPressure,
      "Prepare rollback creation plan without runtime writes.",
    ),
    buildSourceNode(
      "TICG_NODE_008",
      "human_signoff",
      "Creation human signoff",
      "V17.5",
      context.operationalApprovalScore,
      context.interventionBoundaryScore,
      gapPressure,
      "Keep creation activation blocked until a separate operational release.",
    ),
  ];
}

function buildCreationGate(context: Required<TaskInterventionCreationInput>): CreationGateItem[] {
  return [
    {
      id: "TICG_GATE_001",
      label: "Task and intervention creation lock",
      lane: "task_intervention_creation_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep task and intervention creation disabled in V17.5.",
      requiredEvidence: ["taskInterventionCreationAllowed=false", "taskCreated=false", "interventionCreated=false"],
      blockedOutcome: "No task or intervention creation.",
    },
    {
      id: "TICG_GATE_002",
      label: "Zero-write creation plan",
      lane: "task_intervention_creation_gate",
      gateScore: clampScore(context.manualWritePathScore),
      severity: severityFromConcern(100 - context.manualWritePathScore + context.creationGateItemCount * 4),
      gatePurpose: "Prepare creation flow without writing records.",
      requiredEvidence: ["operational approval lock", "task boundary", "intervention boundary", "rollback plan"],
      blockedOutcome: "No record write.",
    },
    {
      id: "TICG_GATE_003",
      label: "Operational approval lock",
      lane: "task_intervention_creation_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require a separate future release before operational approval.",
      requiredEvidence: ["operationWriteApprovalAllowed=false", "taskCreationApprovalAllowed=false", "interventionCreationApprovalAllowed=false"],
      blockedOutcome: "No operational write approval.",
    },
  ];
}

function buildOperationalWriteApprovalLock(context: Required<TaskInterventionCreationInput>): OperationalWriteApprovalItem[] {
  return [
    {
      id: "TICG_APPROVAL_001",
      label: "Operational write approval design",
      lane: "operational_write_approval",
      approvalScore: clampScore(context.operationalApprovalScore),
      priority: context.operationalApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can operational approval be reviewed without record writes?",
      requiredEvidence: ["operator role", "approval hold", "creation no-go state"],
      blockedOutcome: "No operational approval is performed.",
    },
    {
      id: "TICG_APPROVAL_002",
      label: "Task creation approval design",
      lane: "operational_write_approval",
      approvalScore: clampScore(context.taskBoundaryScore),
      priority: "urgent",
      approvalQuestion: "Can task approval remain locked?",
      requiredEvidence: ["taskCreationApprovalAllowed=false", "taskRecordWriteAllowed=false"],
      blockedOutcome: "No task approval.",
    },
    {
      id: "TICG_APPROVAL_003",
      label: "Intervention creation approval design",
      lane: "operational_write_approval",
      approvalScore: clampScore(context.interventionBoundaryScore),
      priority: "urgent",
      approvalQuestion: "Can intervention approval remain locked?",
      requiredEvidence: ["interventionCreationApprovalAllowed=false", "interventionRecordWriteAllowed=false"],
      blockedOutcome: "No intervention approval.",
    },
  ];
}

function buildTaskCreationBoundary(): TaskCreationBoundaryItem[] {
  return [
    {
      id: "TICG_TASK_001",
      label: "Task record write boundary",
      lane: "task_creation_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No task record can be written.",
      blockedOutcome: "taskRecordWriteAllowed=false",
    },
    {
      id: "TICG_TASK_002",
      label: "Task creation runtime boundary",
      lane: "task_creation_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No task can be created.",
      blockedOutcome: "taskCreated=false",
    },
    {
      id: "TICG_TASK_003",
      label: "Task automation boundary",
      lane: "task_creation_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No automatic task creation can run.",
      blockedOutcome: "automaticTaskCreationAllowed=false",
    },
  ];
}

function buildInterventionCreationBoundary(): InterventionCreationBoundaryItem[] {
  return [
    {
      id: "TICG_INTERVENTION_001",
      label: "Intervention record write boundary",
      lane: "intervention_creation_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No intervention record can be written.",
      blockedOutcome: "interventionRecordWriteAllowed=false",
    },
    {
      id: "TICG_INTERVENTION_002",
      label: "Intervention creation runtime boundary",
      lane: "intervention_creation_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No intervention can be created.",
      blockedOutcome: "interventionCreated=false",
    },
    {
      id: "TICG_INTERVENTION_003",
      label: "Intervention automation boundary",
      lane: "intervention_creation_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No automatic intervention creation can run.",
      blockedOutcome: "automaticInterventionCreationAllowed=false",
    },
  ];
}

function buildWorkOrderMaterializationBoundary(context: Required<TaskInterventionCreationInput>): WorkOrderMaterializationBoundaryItem[] {
  return [
    {
      id: "TICG_WORK_001",
      label: "Work order materialization boundary",
      lane: "work_order_materialization_boundary",
      boundaryScore: 100,
      priority: "urgent",
      materializationQuestion: "Can work order materialization remain blocked?",
      requiredControls: ["workOrderMaterializationAllowed=false", "workOrderMaterializationPerformed=false"],
      manualResolution: "Keep materialization locked.",
    },
    {
      id: "TICG_WORK_002",
      label: "Dispatch notification boundary",
      lane: "work_order_materialization_boundary",
      boundaryScore: 100,
      priority: "urgent",
      materializationQuestion: "Can dispatch notifications remain blocked?",
      requiredControls: ["dispatchNotificationAllowed=false", "dispatchNotificationPerformed=false"],
      manualResolution: "No notification is sent.",
    },
    {
      id: "TICG_WORK_003",
      label: "Package separation boundary",
      lane: "work_order_materialization_boundary",
      boundaryScore: clampScore(context.packageWriteScore),
      priority: "high",
      materializationQuestion: "Can work creation remain isolated from export package writes?",
      requiredControls: ["publicExportPackageWriteAllowed=false", "publicShareAllowed=false"],
      manualResolution: "Keep public export write path locked.",
    },
  ];
}

function buildSafetyExecutionBoundary(): SafetyExecutionBoundaryItem[] {
  return [
    {
      id: "TICG_SAFETY_001",
      label: "Execution boundary",
      lane: "safety_execution_boundary",
      safetyScore: 100,
      severity: "critical",
      safetyQuestion: "Can execution remain blocked?",
      requiredChecks: ["automaticExecutionAllowed=false", "automaticExecutionPerformed=false"],
      manualResolution: "No execution path is active.",
    },
    {
      id: "TICG_SAFETY_002",
      label: "Product prescription boundary",
      lane: "safety_execution_boundary",
      safetyScore: 100,
      severity: "critical",
      safetyQuestion: "Can product prescription remain blocked?",
      requiredChecks: ["productPrescriptionAllowed=false", "productPrescriptionPerformed=false"],
      manualResolution: "Block product recommendation wording.",
    },
    {
      id: "TICG_SAFETY_003",
      label: "Dosage guidance boundary",
      lane: "safety_execution_boundary",
      safetyScore: 100,
      severity: "critical",
      safetyQuestion: "Can dosage guidance remain blocked?",
      requiredChecks: ["dosageAdviceAllowed=false", "dosageAdvicePerformed=false"],
      manualResolution: "Block dosage guidance wording.",
    },
  ];
}

function buildRollbackCreationPlan(context: Required<TaskInterventionCreationInput>): RollbackCreationPlanItem[] {
  return [
    {
      id: "TICG_ROLLBACK_001",
      label: "Creation rollback plan",
      lane: "rollback_creation_plan",
      rollbackScore: clampScore(context.manualWritePathScore),
      priority: context.manualWritePathScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future creation release return to zero-write state?",
      safeFallback: "Return to local dry-run and creation no-go board.",
    },
    {
      id: "TICG_ROLLBACK_002",
      label: "Task rollback plan",
      lane: "rollback_creation_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can task record writes remain blocked?",
      safeFallback: "No task record write path exists in V17.5.",
    },
    {
      id: "TICG_ROLLBACK_003",
      label: "Intervention rollback plan",
      lane: "rollback_creation_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can intervention record writes remain blocked?",
      safeFallback: "No intervention record write path exists in V17.5.",
    },
  ];
}

function buildCreationNoGoBoard(): CreationNoGoItem[] {
  return [
    {
      id: "TICG_GONOGO_001",
      label: "Task and intervention creation plan",
      lane: "human_signoff",
      goNoGoState: "zero-write-creation-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["operational approval", "task boundary", "intervention boundary", "safety boundary"],
      safeOutcome: "Creation plan only.",
    },
    {
      id: "TICG_GONOGO_002",
      label: "Actual task and intervention creation",
      lane: "task_intervention_creation_gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate creation release", "operational approval", "rollback proof"],
      safeOutcome: "Task and intervention creation remains blocked.",
    },
    {
      id: "TICG_GONOGO_003",
      label: "Work order materialization or execution",
      lane: "work_order_materialization_boundary",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate materialization release", "human approval", "execution proof"],
      safeOutcome: "Work order materialization and execution remain blocked.",
    },
  ];
}

function buildCreationGateChecks(
  context: Required<TaskInterventionCreationInput>,
  sourceNodes: TaskInterventionCreationSourceNode[],
): CreationGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "TICG_CHECK_001",
      label: "Creation gate remains zero-write",
      lane: "task_intervention_creation_gate" as TaskInterventionCreationLane,
      score: 100,
      reviewer: "task intervention creation reviewer",
      requiredEvidence: ["taskInterventionCreationAllowed=false", "taskCreated=false", "interventionCreated=false"],
      hardStop: "Do not activate task or intervention creation in V17.5.",
    },
    {
      id: "TICG_CHECK_002",
      label: "Operational write approval is complete enough",
      lane: "operational_write_approval" as TaskInterventionCreationLane,
      score: context.operationalApprovalScore - context.operationalApprovalItemCount * 3,
      reviewer: context.creationLeadRole,
      requiredEvidence: ["operational approval", "task approval", "intervention approval"],
      hardStop: "Do not proceed without operational approval board.",
    },
    {
      id: "TICG_CHECK_003",
      label: "Task creation boundary is complete",
      lane: "task_creation_boundary" as TaskInterventionCreationLane,
      score: 100,
      reviewer: "task boundary reviewer",
      requiredEvidence: ["task record boundary", "task runtime boundary", "task automation boundary"],
      hardStop: "Task creation boundaries must remain active.",
    },
    {
      id: "TICG_CHECK_004",
      label: "Intervention creation boundary is complete",
      lane: "intervention_creation_boundary" as TaskInterventionCreationLane,
      score: 100,
      reviewer: "intervention boundary reviewer",
      requiredEvidence: ["intervention record boundary", "intervention runtime boundary", "intervention automation boundary"],
      hardStop: "Intervention creation boundaries must remain active.",
    },
    {
      id: "TICG_CHECK_005",
      label: "Safety execution boundary is complete",
      lane: "safety_execution_boundary" as TaskInterventionCreationLane,
      score: 100,
      reviewer: "safety execution reviewer",
      requiredEvidence: ["execution boundary", "product boundary", "dosage boundary"],
      hardStop: "Safety execution boundaries must remain active.",
    },
    {
      id: "TICG_CHECK_006",
      label: "Source blockers are within creation tolerance",
      lane: "human_signoff" as TaskInterventionCreationLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before zero-write-creation-plan-ready state.",
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

function buildBoardPack(context: Required<TaskInterventionCreationInput>): CreationBoardPackItem[] {
  return [
    {
      id: "TICG_PACK_001",
      label: "Creation gate packet",
      lane: "task_intervention_creation_gate",
      packReady: context.manualWritePathScore >= 60,
      readinessScore: clampScore(context.manualWritePathScore),
      reviewerCheck: "Confirm creation gate remains zero-write and design-only.",
      includedSections: ["creation gate", "creation no-go", "task boundary"],
      blockedSections: ["task creation", "intervention creation", "work order materialization"],
    },
    {
      id: "TICG_PACK_002",
      label: "Operational and safety packet",
      lane: "operational_write_approval",
      packReady: context.operationalApprovalScore >= 60,
      readinessScore: clampScore(context.operationalApprovalScore),
      reviewerCheck: "Confirm operational approval and safety boundaries remain locked.",
      includedSections: ["operational approval", "intervention boundary", "safety boundary"],
      blockedSections: ["approval performed", "product prescription", "dosage guidance"],
    },
    {
      id: "TICG_PACK_003",
      label: "Rollback creation packet",
      lane: "rollback_creation_plan",
      packReady: context.manualWritePathScore >= 60,
      readinessScore: clampScore(context.manualWritePathScore),
      reviewerCheck: "Confirm rollback creation plan is dry-run only.",
      includedSections: ["creation rollback", "task rollback", "intervention rollback"],
      blockedSections: ["runtime rollback", "record deletion", "notification"],
    },
  ];
}

function buildFindings(
  context: Required<TaskInterventionCreationInput>,
  sourceNodes: TaskInterventionCreationSourceNode[],
  gates: CreationGateCheckItem[],
  goNoGo: CreationNoGoItem[],
): CreationFindingItem[] {
  const findings: CreationFindingItem[] = [];

  if (context.openCreationGapCount > 0) {
    findings.push({
      id: "TICG_FINDING_001",
      label: "Open creation gaps",
      lane: "human_signoff",
      severity: context.openCreationGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openCreationGapCount} creation gaps remain before any later activation.`,
      manualResolution: "Resolve operational approval, record boundary, materialization and rollback gaps in a later gated release.",
      blocksCreationActivation: true,
    });
  }

  if (context.operationalApprovalScore < 70) {
    findings.push({
      id: "TICG_FINDING_002",
      label: "Operational approval below threshold",
      lane: "operational_write_approval",
      severity: "critical",
      reason: "Operational approval is not mature enough for creation activation.",
      manualResolution: "Complete operational, task and intervention approval review.",
      blocksCreationActivation: true,
    });
  }

  if (context.interventionBoundaryScore < 70) {
    findings.push({
      id: "TICG_FINDING_003",
      label: "Intervention boundary below threshold",
      lane: "intervention_creation_boundary",
      severity: "critical",
      reason: "Intervention creation boundary is not mature enough for creation activation.",
      manualResolution: "Complete intervention record, runtime and automation boundary review.",
      blocksCreationActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `TICG_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksCreationActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `TICG_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Creation gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksCreationActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `TICG_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksCreationActivation: true,
      });
    });

  return findings;
}

export function buildAiTaskInterventionCreationGateReport(
  input: TaskInterventionCreationInput = {},
): TaskInterventionCreationReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const creationGate = buildCreationGate(context);
  const operationalWriteApprovalLock = buildOperationalWriteApprovalLock(context);
  const taskCreationBoundary = buildTaskCreationBoundary();
  const interventionCreationBoundary = buildInterventionCreationBoundary();
  const workOrderMaterializationBoundary = buildWorkOrderMaterializationBoundary(context);
  const safetyExecutionBoundary = buildSafetyExecutionBoundary();
  const rollbackCreationPlan = buildRollbackCreationPlan(context);
  const creationNoGoBoard = buildCreationNoGoBoard();
  const creationGateChecks = buildCreationGateChecks(context, sourceNodes);
  const creationBoardPack = buildBoardPack(context);
  const creationFindings = buildFindings(context, sourceNodes, creationGateChecks, creationNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    creationGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, creationGate.length);

  const approvalAverage =
    operationalWriteApprovalLock.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, operationalWriteApprovalLock.length);

  const gateAverage =
    creationGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, creationGateChecks.length);

  const findingPenalty = creationFindings.filter((item) => item.blocksCreationActivation).length * 7;
  const rollbackPressure =
    rollbackCreationPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, rollbackCreationPlan.length * 4);

  const creationScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      approvalAverage / 4 +
      gateAverage / 4 +
      rollbackPressure -
      findingPenalty -
      context.openCreationGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openCreationGapCount * 8 +
        context.operationalApprovalItemCount * 6 +
        context.taskBoundaryItemCount * 5 +
        context.interventionBoundaryItemCount * 6 +
        context.workOrderBoundaryItemCount * 5,
    ),
  );

  const creationStatus = bandFromScore(
    creationScore,
    creationFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: TASK_INTERVENTION_CREATION_GUARDRAIL,
    creationScore,
    creationStatus,
    overallSeverity,
    sourceNodes,
    creationGate,
    operationalWriteApprovalLock,
    taskCreationBoundary,
    interventionCreationBoundary,
    workOrderMaterializationBoundary,
    safetyExecutionBoundary,
    rollbackCreationPlan,
    creationNoGoBoard,
    creationGateChecks,
    creationBoardPack,
    creationFindings,
    stagedRoadmap: {
      v175: "Task and intervention creation gate in zero-write dry-run.",
      v176: "Provider call execution only after explicit provider approval.",
      v177: "Incident record write only after explicit incident governance approval.",
      v178: "Public export artifact write only after explicit legal and privacy approval.",
      v179: "Operational execution only after explicit human approval.",
    },
    redactedExportBundle: {
      exportId: "task_intervention_creation_gate_v17_5_redacted_dry_run",
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
        "creation gate",
        "operational write approval lock",
        "task creation boundary",
        "intervention creation boundary",
        "work order materialization boundary",
        "safety execution boundary",
        "rollback creation plan",
        "creation no-go board",
        "creation gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Task and intervention creation gate is local dry-run only.",
      "No task record write, intervention record write, work order materialization, notification, provider call, storage activation or execution is performed.",
      "Operational write approval remains locked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V17.5 prepares task and intervention creation governance only.",
    ],
  };
}

export const aiTaskInterventionCreationGateVersion = "V17.5";
