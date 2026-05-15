export type OperationalExecutionMode = "dry-run" | "execution-board-review";

export type OperationalExecutionSeverity = "info" | "watch" | "elevated" | "critical";

export type OperationalExecutionPriority = "low" | "medium" | "high" | "urgent";

export type OperationalExecutionReadinessBand =
  | "blocked"
  | "execution-design-ready"
  | "manual-board-review-ready"
  | "zero-execution-plan-ready";

export type OperationalExecutionLane =
  | "operational_execution_gate"
  | "explicit_human_approval"
  | "execution_preflight_boundary"
  | "execution_command_boundary"
  | "notification_boundary"
  | "emergency_stop_board"
  | "rollback_execution_plan"
  | "human_signoff";

export interface OperationalExecutionGuardrail {
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
  publicExportArtifactWriteAllowed: false;
  publicExportArtifactWritePerformed: false;
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
  incidentRecordWriteAllowed: false;
  incidentRecordWritePerformed: false;
  operationalExecutionAllowed: false;
  operationalExecutionPerformed: false;
  executionPreflightAllowed: false;
  executionPreflightPerformed: false;
  executionCommandAllowed: false;
  executionCommandPerformed: false;
  executionNotificationAllowed: false;
  executionNotificationPerformed: false;
  emergencyStopConfigured: false;
  emergencyStopPerformed: false;
  humanExecutionApprovalAllowed: false;
  humanExecutionApprovalPerformed: false;
  operationalExecutionGateReady: true;
  explicitHumanApprovalLockReady: true;
  executionCommandBoundaryReady: true;
  executionNoGoReady: true;
}

export interface OperationalExecutionInput {
  executionGateItemCount?: number;
  humanApprovalItemCount?: number;
  preflightBoundaryItemCount?: number;
  commandBoundaryItemCount?: number;
  notificationBoundaryItemCount?: number;
  emergencyStopItemCount?: number;
  openExecutionGapCount?: number;
  onlineReadinessScore?: number;
  creationGateScore?: number;
  providerCallGateScore?: number;
  artifactGateScore?: number;
  humanApprovalScore?: number;
  commandBoundaryScore?: number;
  emergencyStopScore?: number;
  executionLeadRole?: string;
}

export interface OperationalExecutionSourceNode {
  id: string;
  lane: OperationalExecutionLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: OperationalExecutionSeverity;
  priority: OperationalExecutionPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface OperationalExecutionGateItem {
  id: string;
  label: string;
  lane: OperationalExecutionLane;
  gateScore: number;
  severity: OperationalExecutionSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ExplicitHumanApprovalItem {
  id: string;
  label: string;
  lane: OperationalExecutionLane;
  approvalScore: number;
  priority: OperationalExecutionPriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ExecutionPreflightBoundaryItem {
  id: string;
  label: string;
  lane: OperationalExecutionLane;
  boundaryScore: number;
  severity: OperationalExecutionSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface ExecutionCommandBoundaryItem {
  id: string;
  label: string;
  lane: OperationalExecutionLane;
  boundaryScore: number;
  severity: OperationalExecutionSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface ExecutionNotificationBoundaryItem {
  id: string;
  label: string;
  lane: OperationalExecutionLane;
  boundaryScore: number;
  severity: OperationalExecutionSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface EmergencyStopBoardItem {
  id: string;
  label: string;
  lane: OperationalExecutionLane;
  stopScore: number;
  priority: OperationalExecutionPriority;
  stopQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface RollbackExecutionPlanItem {
  id: string;
  label: string;
  lane: OperationalExecutionLane;
  rollbackScore: number;
  priority: OperationalExecutionPriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface ExecutionNoGoItem {
  id: string;
  label: string;
  lane: OperationalExecutionLane;
  goNoGoState: "no-go" | "design-only" | "zero-execution-plan-ready";
  score: number;
  severity: OperationalExecutionSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface OperationalExecutionGateCheckItem {
  id: string;
  label: string;
  lane: OperationalExecutionLane;
  passed: boolean;
  score: number;
  severity: OperationalExecutionSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface OperationalExecutionBoardPackItem {
  id: string;
  label: string;
  lane: OperationalExecutionLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface OperationalExecutionFindingItem {
  id: string;
  label: string;
  lane: OperationalExecutionLane;
  severity: OperationalExecutionSeverity;
  reason: string;
  manualResolution: string;
  blocksExecutionActivation: boolean;
}

export interface OperationalExecutionReport {
  generatedAt: string;
  mode: OperationalExecutionMode;
  context: Required<OperationalExecutionInput>;
  readiness: OperationalExecutionGuardrail;
  executionScore: number;
  executionStatus: OperationalExecutionReadinessBand;
  overallSeverity: OperationalExecutionSeverity;
  sourceNodes: OperationalExecutionSourceNode[];
  operationalExecutionGate: OperationalExecutionGateItem[];
  explicitHumanApprovalLock: ExplicitHumanApprovalItem[];
  executionPreflightBoundary: ExecutionPreflightBoundaryItem[];
  executionCommandBoundary: ExecutionCommandBoundaryItem[];
  executionNotificationBoundary: ExecutionNotificationBoundaryItem[];
  emergencyStopBoard: EmergencyStopBoardItem[];
  rollbackExecutionPlan: RollbackExecutionPlanItem[];
  executionNoGoBoard: ExecutionNoGoItem[];
  executionGateChecks: OperationalExecutionGateCheckItem[];
  executionBoardPack: OperationalExecutionBoardPackItem[];
  executionFindings: OperationalExecutionFindingItem[];
  stagedRoadmap: {
    v179: string;
    v180: string;
    v181: string;
    v182: string;
    v183: string;
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

export const OPERATIONAL_EXECUTION_GUARDRAIL: OperationalExecutionGuardrail = {
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
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
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
  incidentRecordWriteAllowed: false,
  incidentRecordWritePerformed: false,
  operationalExecutionAllowed: false,
  operationalExecutionPerformed: false,
  executionPreflightAllowed: false,
  executionPreflightPerformed: false,
  executionCommandAllowed: false,
  executionCommandPerformed: false,
  executionNotificationAllowed: false,
  executionNotificationPerformed: false,
  emergencyStopConfigured: false,
  emergencyStopPerformed: false,
  humanExecutionApprovalAllowed: false,
  humanExecutionApprovalPerformed: false,
  operationalExecutionGateReady: true,
  explicitHumanApprovalLockReady: true,
  executionCommandBoundaryReady: true,
  executionNoGoReady: true,
};

const priorityWeight: Record<OperationalExecutionPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: OperationalExecutionInput): Required<OperationalExecutionInput> {
  return {
    executionGateItemCount: input.executionGateItemCount ?? 8,
    humanApprovalItemCount: input.humanApprovalItemCount ?? 8,
    preflightBoundaryItemCount: input.preflightBoundaryItemCount ?? 8,
    commandBoundaryItemCount: input.commandBoundaryItemCount ?? 8,
    notificationBoundaryItemCount: input.notificationBoundaryItemCount ?? 7,
    emergencyStopItemCount: input.emergencyStopItemCount ?? 7,
    openExecutionGapCount: input.openExecutionGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    creationGateScore: input.creationGateScore ?? 70,
    providerCallGateScore: input.providerCallGateScore ?? 70,
    artifactGateScore: input.artifactGateScore ?? 70,
    humanApprovalScore: input.humanApprovalScore ?? 66,
    commandBoundaryScore: input.commandBoundaryScore ?? 68,
    emergencyStopScore: input.emergencyStopScore ?? 66,
    executionLeadRole: input.executionLeadRole ?? "operational execution reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): OperationalExecutionSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: OperationalExecutionSeverity): OperationalExecutionPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): OperationalExecutionReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-execution-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "execution-design-ready";
}

function buildSourceNode(
  id: string,
  lane: OperationalExecutionLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): OperationalExecutionSourceNode {
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
            "Operational execution gate remains below activation threshold.",
            "Execution board must resolve human approval, preflight, command, notification, emergency stop and rollback gaps before any later execution release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<OperationalExecutionInput>): OperationalExecutionSourceNode[] {
  const executionPressure = context.executionGateItemCount;
  const approvalPressure = context.humanApprovalItemCount * 2;
  const preflightPressure = context.preflightBoundaryItemCount;
  const commandPressure = context.commandBoundaryItemCount * 2;
  const notificationPressure = context.notificationBoundaryItemCount;
  const gapPressure = context.openExecutionGapCount * 2;

  return [
    buildSourceNode(
      "OEX_NODE_001",
      "operational_execution_gate",
      "Task and intervention creation gate",
      "V17.5",
      context.creationGateScore,
      context.humanApprovalScore,
      executionPressure,
      "Connect creation governance to future operational execution.",
    ),
    buildSourceNode(
      "OEX_NODE_002",
      "explicit_human_approval",
      "Explicit human approval lock",
      "V17.9",
      context.humanApprovalScore,
      context.creationGateScore,
      approvalPressure,
      "Prepare human execution approval without enabling execution.",
    ),
    buildSourceNode(
      "OEX_NODE_003",
      "execution_preflight_boundary",
      "Execution preflight boundary",
      "V17.9",
      context.commandBoundaryScore,
      context.humanApprovalScore,
      preflightPressure,
      "Keep execution preflight blocked.",
    ),
    buildSourceNode(
      "OEX_NODE_004",
      "execution_command_boundary",
      "Execution command boundary",
      "V17.9",
      context.commandBoundaryScore,
      context.humanApprovalScore,
      commandPressure,
      "Keep operational commands blocked.",
    ),
    buildSourceNode(
      "OEX_NODE_005",
      "notification_boundary",
      "Public export artifact write gate",
      "V17.8",
      context.artifactGateScore,
      context.onlineReadinessScore,
      notificationPressure,
      "Keep notification and public outputs blocked.",
    ),
    buildSourceNode(
      "OEX_NODE_006",
      "emergency_stop_board",
      "Provider call execution gate",
      "V17.6",
      context.providerCallGateScore,
      context.emergencyStopScore,
      context.emergencyStopItemCount,
      "Keep provider output and runtime paths away from execution.",
    ),
    buildSourceNode(
      "OEX_NODE_007",
      "rollback_execution_plan",
      "Operational execution rollback design",
      "V17.9",
      context.emergencyStopScore,
      context.commandBoundaryScore,
      gapPressure,
      "Prepare execution rollback without runtime action.",
    ),
    buildSourceNode(
      "OEX_NODE_008",
      "human_signoff",
      "Operational execution human signoff",
      "V17.9",
      context.humanApprovalScore,
      context.emergencyStopScore,
      gapPressure,
      "Keep operational execution blocked until a separate explicit human approval release.",
    ),
  ];
}

function buildOperationalExecutionGate(context: Required<OperationalExecutionInput>): OperationalExecutionGateItem[] {
  return [
    {
      id: "OEX_GATE_001",
      label: "Operational execution lock",
      lane: "operational_execution_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep operational execution disabled in V17.9.",
      requiredEvidence: ["operationalExecutionAllowed=false", "executionCommandAllowed=false", "automaticExecutionAllowed=false"],
      blockedOutcome: "No operational execution.",
    },
    {
      id: "OEX_GATE_002",
      label: "Zero-execution operational plan",
      lane: "operational_execution_gate",
      gateScore: clampScore(context.creationGateScore),
      severity: severityFromConcern(100 - context.creationGateScore + context.executionGateItemCount * 4),
      gatePurpose: "Prepare execution flow without runtime action.",
      requiredEvidence: ["human approval lock", "preflight boundary", "command boundary", "emergency stop board"],
      blockedOutcome: "No execution preflight or command.",
    },
    {
      id: "OEX_GATE_003",
      label: "Human execution approval lock",
      lane: "operational_execution_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require a separate future release before human execution approval.",
      requiredEvidence: ["humanExecutionApprovalAllowed=false", "explicitActivationApprovalAllowed=false"],
      blockedOutcome: "No execution approval.",
    },
  ];
}

function buildExplicitHumanApprovalLock(context: Required<OperationalExecutionInput>): ExplicitHumanApprovalItem[] {
  return [
    {
      id: "OEX_APPROVAL_001",
      label: "Human execution approval design",
      lane: "explicit_human_approval",
      approvalScore: clampScore(context.humanApprovalScore),
      priority: context.humanApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can execution approval be reviewed without enabling execution?",
      requiredEvidence: ["reviewer role", "approval hold", "execution no-go state"],
      blockedOutcome: "No human execution approval.",
    },
    {
      id: "OEX_APPROVAL_002",
      label: "Preflight approval hold",
      lane: "explicit_human_approval",
      approvalScore: clampScore(context.commandBoundaryScore),
      priority: "urgent",
      approvalQuestion: "Can preflight approval remain blocked?",
      requiredEvidence: ["executionPreflightAllowed=false", "executionPreflightPerformed=false"],
      blockedOutcome: "No preflight approval.",
    },
    {
      id: "OEX_APPROVAL_003",
      label: "Final operational release hold",
      lane: "explicit_human_approval",
      approvalScore: 100,
      priority: "urgent",
      approvalQuestion: "Can final operational release remain blocked?",
      requiredEvidence: ["operationalExecutionAllowed=false", "productionRuntimeAllowed=false"],
      blockedOutcome: "No operational release.",
    },
  ];
}

function buildExecutionPreflightBoundary(): ExecutionPreflightBoundaryItem[] {
  return [
    {
      id: "OEX_PREFLIGHT_001",
      label: "Execution preflight boundary",
      lane: "execution_preflight_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No execution preflight can run.",
      blockedOutcome: "executionPreflightAllowed=false",
    },
    {
      id: "OEX_PREFLIGHT_002",
      label: "Operational readiness preflight boundary",
      lane: "execution_preflight_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No operational readiness preflight can be performed.",
      blockedOutcome: "executionPreflightPerformed=false",
    },
    {
      id: "OEX_PREFLIGHT_003",
      label: "Provider-derived preflight boundary",
      lane: "execution_preflight_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No provider output can trigger preflight.",
      blockedOutcome: "providerCalled=false",
    },
  ];
}

function buildExecutionCommandBoundary(): ExecutionCommandBoundaryItem[] {
  return [
    {
      id: "OEX_COMMAND_001",
      label: "Execution command boundary",
      lane: "execution_command_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No operational command can be issued.",
      blockedOutcome: "executionCommandAllowed=false",
    },
    {
      id: "OEX_COMMAND_002",
      label: "Automatic execution boundary",
      lane: "execution_command_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No automatic execution can run.",
      blockedOutcome: "automaticExecutionAllowed=false",
    },
    {
      id: "OEX_COMMAND_003",
      label: "Field execution boundary",
      lane: "execution_command_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No field action is dispatched.",
      blockedOutcome: "operationalExecutionPerformed=false",
    },
  ];
}

function buildExecutionNotificationBoundary(): ExecutionNotificationBoundaryItem[] {
  return [
    {
      id: "OEX_NOTIFY_001",
      label: "Execution notification boundary",
      lane: "notification_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No execution notification can be sent.",
      blockedOutcome: "executionNotificationAllowed=false",
    },
    {
      id: "OEX_NOTIFY_002",
      label: "Dispatch notification boundary",
      lane: "notification_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No dispatch notification can be sent.",
      blockedOutcome: "dispatchNotificationAllowed=false",
    },
    {
      id: "OEX_NOTIFY_003",
      label: "Public share boundary",
      lane: "notification_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No operational execution output can be shared publicly.",
      blockedOutcome: "publicShareAllowed=false",
    },
  ];
}

function buildEmergencyStopBoard(context: Required<OperationalExecutionInput>): EmergencyStopBoardItem[] {
  return [
    {
      id: "OEX_STOP_001",
      label: "Emergency stop design",
      lane: "emergency_stop_board",
      stopScore: clampScore(context.emergencyStopScore),
      priority: context.emergencyStopScore < 70 ? "urgent" : "high",
      stopQuestion: "Can emergency stop be designed without configuring runtime execution?",
      requiredControls: ["stop owner", "manual hold", "rollback note"],
      manualResolution: "Keep emergency stop as board-only design.",
    },
    {
      id: "OEX_STOP_002",
      label: "Execution kill-switch hold",
      lane: "emergency_stop_board",
      stopScore: 100,
      priority: "urgent",
      stopQuestion: "Can runtime kill-switch remain unconfigured?",
      requiredControls: ["emergencyStopConfigured=false", "emergencyStopPerformed=false"],
      manualResolution: "No runtime stop path is configured in V17.9.",
    },
    {
      id: "OEX_STOP_003",
      label: "Unsafe output stop rule",
      lane: "emergency_stop_board",
      stopScore: 100,
      priority: "urgent",
      stopQuestion: "Can unsafe output classes stop execution design?",
      requiredControls: ["productPrescriptionAllowed=false", "dosageAdviceAllowed=false", "automaticExecutionAllowed=false"],
      manualResolution: "Block product, dosage and execution wording.",
    },
  ];
}

function buildRollbackExecutionPlan(context: Required<OperationalExecutionInput>): RollbackExecutionPlanItem[] {
  return [
    {
      id: "OEX_ROLLBACK_001",
      label: "Execution rollback plan",
      lane: "rollback_execution_plan",
      rollbackScore: clampScore(context.emergencyStopScore),
      priority: context.emergencyStopScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future execution release return to zero-execution state?",
      safeFallback: "Return to local dry-run and execution no-go board.",
    },
    {
      id: "OEX_ROLLBACK_002",
      label: "Command rollback plan",
      lane: "rollback_execution_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can execution commands remain blocked?",
      safeFallback: "No execution command path exists in V17.9.",
    },
    {
      id: "OEX_ROLLBACK_003",
      label: "Notification rollback plan",
      lane: "rollback_execution_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can notifications remain blocked?",
      safeFallback: "No execution notification path exists in V17.9.",
    },
  ];
}

function buildExecutionNoGoBoard(): ExecutionNoGoItem[] {
  return [
    {
      id: "OEX_GONOGO_001",
      label: "Operational execution plan",
      lane: "human_signoff",
      goNoGoState: "zero-execution-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["human approval", "preflight boundary", "command boundary", "emergency stop board"],
      safeOutcome: "Execution plan only.",
    },
    {
      id: "OEX_GONOGO_002",
      label: "Actual operational execution",
      lane: "operational_execution_gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate execution release", "explicit human approval", "rollback proof"],
      safeOutcome: "Operational execution remains blocked.",
    },
    {
      id: "OEX_GONOGO_003",
      label: "Command, notification or field action",
      lane: "execution_command_boundary",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate command release", "human approval", "emergency stop proof"],
      safeOutcome: "Command, notification and field actions remain blocked.",
    },
  ];
}

function buildExecutionGateChecks(
  context: Required<OperationalExecutionInput>,
  sourceNodes: OperationalExecutionSourceNode[],
): OperationalExecutionGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "OEX_CHECK_001",
      label: "Execution gate remains zero-execution",
      lane: "operational_execution_gate" as OperationalExecutionLane,
      score: 100,
      reviewer: "operational execution reviewer",
      requiredEvidence: ["operationalExecutionAllowed=false", "executionCommandAllowed=false", "automaticExecutionAllowed=false"],
      hardStop: "Do not activate operational execution in V17.9.",
    },
    {
      id: "OEX_CHECK_002",
      label: "Human approval is complete enough",
      lane: "explicit_human_approval" as OperationalExecutionLane,
      score: context.humanApprovalScore - context.humanApprovalItemCount * 3,
      reviewer: context.executionLeadRole,
      requiredEvidence: ["human approval", "preflight hold", "final release hold"],
      hardStop: "Do not proceed without explicit human approval board.",
    },
    {
      id: "OEX_CHECK_003",
      label: "Execution preflight boundary is complete",
      lane: "execution_preflight_boundary" as OperationalExecutionLane,
      score: 100,
      reviewer: "execution preflight reviewer",
      requiredEvidence: ["preflight boundary", "readiness preflight boundary", "provider preflight boundary"],
      hardStop: "Preflight boundaries must remain active.",
    },
    {
      id: "OEX_CHECK_004",
      label: "Execution command boundary is complete",
      lane: "execution_command_boundary" as OperationalExecutionLane,
      score: 100,
      reviewer: "execution command reviewer",
      requiredEvidence: ["command boundary", "automatic execution boundary", "field execution boundary"],
      hardStop: "Command boundaries must remain active.",
    },
    {
      id: "OEX_CHECK_005",
      label: "Emergency stop design is complete enough",
      lane: "emergency_stop_board" as OperationalExecutionLane,
      score: context.emergencyStopScore - context.emergencyStopItemCount * 3,
      reviewer: "emergency stop reviewer",
      requiredEvidence: ["emergency stop design", "kill-switch hold", "unsafe output stop rule"],
      hardStop: "Do not proceed without emergency stop board.",
    },
    {
      id: "OEX_CHECK_006",
      label: "Source blockers are within execution tolerance",
      lane: "human_signoff" as OperationalExecutionLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before zero-execution-plan-ready state.",
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

function buildBoardPack(context: Required<OperationalExecutionInput>): OperationalExecutionBoardPackItem[] {
  return [
    {
      id: "OEX_PACK_001",
      label: "Execution gate packet",
      lane: "operational_execution_gate",
      packReady: context.creationGateScore >= 60,
      readinessScore: clampScore(context.creationGateScore),
      reviewerCheck: "Confirm execution gate remains zero-execution and design-only.",
      includedSections: ["execution gate", "human approval", "execution no-go"],
      blockedSections: ["execution command", "automatic execution", "field action"],
    },
    {
      id: "OEX_PACK_002",
      label: "Approval and command packet",
      lane: "explicit_human_approval",
      packReady: context.humanApprovalScore >= 60 && context.commandBoundaryScore >= 60,
      readinessScore: clampScore((context.humanApprovalScore + context.commandBoundaryScore) / 2),
      reviewerCheck: "Confirm human approval and command boundaries remain locked.",
      includedSections: ["human approval", "preflight boundary", "command boundary"],
      blockedSections: ["approval performed", "preflight performed", "command issued"],
    },
    {
      id: "OEX_PACK_003",
      label: "Emergency stop and rollback packet",
      lane: "emergency_stop_board",
      packReady: context.emergencyStopScore >= 60,
      readinessScore: clampScore(context.emergencyStopScore),
      reviewerCheck: "Confirm emergency stop and rollback are dry-run only.",
      includedSections: ["emergency stop", "rollback execution", "notification boundary"],
      blockedSections: ["emergency stop runtime", "runtime rollback", "notification send"],
    },
  ];
}

function buildFindings(
  context: Required<OperationalExecutionInput>,
  sourceNodes: OperationalExecutionSourceNode[],
  gates: OperationalExecutionGateCheckItem[],
  goNoGo: ExecutionNoGoItem[],
): OperationalExecutionFindingItem[] {
  const findings: OperationalExecutionFindingItem[] = [];

  if (context.openExecutionGapCount > 0) {
    findings.push({
      id: "OEX_FINDING_001",
      label: "Open execution gaps",
      lane: "human_signoff",
      severity: context.openExecutionGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openExecutionGapCount} execution gaps remain before any later activation.`,
      manualResolution: "Resolve human approval, preflight, command, notification, emergency stop and rollback gaps in a later gated release.",
      blocksExecutionActivation: true,
    });
  }

  if (context.humanApprovalScore < 70) {
    findings.push({
      id: "OEX_FINDING_002",
      label: "Human approval below threshold",
      lane: "explicit_human_approval",
      severity: "critical",
      reason: "Human approval is not mature enough for operational execution activation.",
      manualResolution: "Complete human approval, preflight hold and final release hold review.",
      blocksExecutionActivation: true,
    });
  }

  if (context.emergencyStopScore < 70) {
    findings.push({
      id: "OEX_FINDING_003",
      label: "Emergency stop design below threshold",
      lane: "emergency_stop_board",
      severity: "critical",
      reason: "Emergency stop design is not mature enough for operational execution activation.",
      manualResolution: "Complete emergency stop, kill-switch hold and unsafe output stop review.",
      blocksExecutionActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `OEX_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksExecutionActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `OEX_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Execution gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksExecutionActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `OEX_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksExecutionActivation: true,
      });
    });

  return findings;
}

export function buildAiOperationalExecutionGateReport(
  input: OperationalExecutionInput = {},
): OperationalExecutionReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const operationalExecutionGate = buildOperationalExecutionGate(context);
  const explicitHumanApprovalLock = buildExplicitHumanApprovalLock(context);
  const executionPreflightBoundary = buildExecutionPreflightBoundary();
  const executionCommandBoundary = buildExecutionCommandBoundary();
  const executionNotificationBoundary = buildExecutionNotificationBoundary();
  const emergencyStopBoard = buildEmergencyStopBoard(context);
  const rollbackExecutionPlan = buildRollbackExecutionPlan(context);
  const executionNoGoBoard = buildExecutionNoGoBoard();
  const executionGateChecks = buildExecutionGateChecks(context, sourceNodes);
  const executionBoardPack = buildBoardPack(context);
  const executionFindings = buildFindings(context, sourceNodes, executionGateChecks, executionNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    operationalExecutionGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, operationalExecutionGate.length);

  const approvalAverage =
    explicitHumanApprovalLock.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, explicitHumanApprovalLock.length);

  const gateAverage =
    executionGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, executionGateChecks.length);

  const findingPenalty = executionFindings.filter((item) => item.blocksExecutionActivation).length * 7;
  const rollbackPressure =
    rollbackExecutionPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, rollbackExecutionPlan.length * 4);

  const executionScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      approvalAverage / 4 +
      gateAverage / 4 +
      rollbackPressure -
      findingPenalty -
      context.openExecutionGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openExecutionGapCount * 8 +
        context.humanApprovalItemCount * 6 +
        context.preflightBoundaryItemCount * 5 +
        context.commandBoundaryItemCount * 6 +
        context.emergencyStopItemCount * 6,
    ),
  );

  const executionStatus = bandFromScore(
    executionScore,
    executionFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: OPERATIONAL_EXECUTION_GUARDRAIL,
    executionScore,
    executionStatus,
    overallSeverity,
    sourceNodes,
    operationalExecutionGate,
    explicitHumanApprovalLock,
    executionPreflightBoundary,
    executionCommandBoundary,
    executionNotificationBoundary,
    emergencyStopBoard,
    rollbackExecutionPlan,
    executionNoGoBoard,
    executionGateChecks,
    executionBoardPack,
    executionFindings,
    stagedRoadmap: {
      v179: "Operational execution gate in zero-execution dry-run.",
      v180: "Provider runtime activation only after explicit provider approval and rollback proof.",
      v181: "Incident record persistence only after explicit governance final approval.",
      v182: "Public export artifact write only after explicit legal and privacy final approval.",
      v183: "Operational execution only after explicit human approval and emergency stop proof.",
    },
    redactedExportBundle: {
      exportId: "operational_execution_gate_v17_9_redacted_dry_run",
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
        "operational execution gate",
        "explicit human approval lock",
        "execution preflight boundary",
        "execution command boundary",
        "execution notification boundary",
        "emergency stop board",
        "rollback execution plan",
        "execution no-go board",
        "execution gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Operational execution gate is local dry-run only.",
      "No execution preflight, command, notification, provider call, storage activation, task creation, intervention creation, product prescription, dosage advice or field action is performed.",
      "Explicit human approval remains locked.",
      "No public sharing, formal approval, production forecast or runtime execution is produced.",
      "V17.9 prepares operational execution governance only.",
    ],
  };
}

export const aiOperationalExecutionGateVersion = "V17.9";
