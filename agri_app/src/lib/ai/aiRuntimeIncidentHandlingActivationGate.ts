export type RuntimeIncidentHandlingMode = "dry-run" | "handling-board-review";

export type RuntimeIncidentHandlingSeverity = "info" | "watch" | "elevated" | "critical";

export type RuntimeIncidentHandlingPriority = "low" | "medium" | "high" | "urgent";

export type RuntimeIncidentHandlingReadinessBand =
  | "blocked"
  | "handling-gate-design-ready"
  | "manual-board-review-ready"
  | "zero-write-handling-plan-ready";

export type RuntimeIncidentHandlingLane =
  | "incident-handling-gate"
  | "incident-write-approval"
  | "operator-notification-boundary"
  | "incident-escalation-board"
  | "provider-incident-boundary"
  | "rollback-incident-plan"
  | "incident-closure-checklist"
  | "human-signoff";

export interface RuntimeIncidentHandlingGuardrail {
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
  incidentHandlingAllowed: false;
  incidentHandlingPerformed: false;
  incidentWriteAllowed: false;
  incidentWritePerformed: false;
  incidentEscalationAllowed: false;
  incidentEscalationPerformed: false;
  incidentClosureAllowed: false;
  incidentClosurePerformed: false;
  incidentNotificationAllowed: false;
  incidentNotificationPerformed: false;
  runtimeIncidentHandlingGateReady: true;
  incidentWriteApprovalLockReady: true;
  incidentEscalationBoardReady: true;
  incidentClosureChecklistReady: true;
}

export interface RuntimeIncidentHandlingInput {
  handlingGateItemCount?: number;
  incidentWriteApprovalItemCount?: number;
  operatorNotificationItemCount?: number;
  escalationBoardItemCount?: number;
  providerBoundaryItemCount?: number;
  closureChecklistItemCount?: number;
  openHandlingGapCount?: number;
  onlineReadinessScore?: number;
  incidentResponseScore?: number;
  providerCanaryScore?: number;
  manualDispatchScore?: number;
  writeApprovalScore?: number;
  escalationScore?: number;
  closureScore?: number;
  handlingLeadRole?: string;
}

export interface RuntimeIncidentHandlingSourceNode {
  id: string;
  lane: RuntimeIncidentHandlingLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: RuntimeIncidentHandlingSeverity;
  priority: RuntimeIncidentHandlingPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface IncidentHandlingGateItem {
  id: string;
  label: string;
  lane: RuntimeIncidentHandlingLane;
  gateScore: number;
  severity: RuntimeIncidentHandlingSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface IncidentWriteApprovalItem {
  id: string;
  label: string;
  lane: RuntimeIncidentHandlingLane;
  approvalScore: number;
  severity: RuntimeIncidentHandlingSeverity;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface OperatorNotificationBoundaryItem {
  id: string;
  label: string;
  lane: RuntimeIncidentHandlingLane;
  boundaryScore: number;
  severity: RuntimeIncidentHandlingSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface IncidentEscalationBoardItem {
  id: string;
  label: string;
  lane: RuntimeIncidentHandlingLane;
  escalationScore: number;
  priority: RuntimeIncidentHandlingPriority;
  escalationQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface ProviderIncidentBoundaryItem {
  id: string;
  label: string;
  lane: RuntimeIncidentHandlingLane;
  boundaryScore: number;
  severity: RuntimeIncidentHandlingSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface RollbackIncidentPlanItem {
  id: string;
  label: string;
  lane: RuntimeIncidentHandlingLane;
  rollbackScore: number;
  priority: RuntimeIncidentHandlingPriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface IncidentClosureChecklistItem {
  id: string;
  label: string;
  lane: RuntimeIncidentHandlingLane;
  closureScore: number;
  severity: RuntimeIncidentHandlingSeverity;
  closureQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface IncidentHandlingNoGoItem {
  id: string;
  label: string;
  lane: RuntimeIncidentHandlingLane;
  goNoGoState: "no-go" | "design-only" | "zero-write-plan-ready";
  score: number;
  severity: RuntimeIncidentHandlingSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface RuntimeIncidentHandlingGateCheckItem {
  id: string;
  label: string;
  lane: RuntimeIncidentHandlingLane;
  passed: boolean;
  score: number;
  severity: RuntimeIncidentHandlingSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface RuntimeIncidentHandlingBoardPackItem {
  id: string;
  label: string;
  lane: RuntimeIncidentHandlingLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface RuntimeIncidentHandlingFindingItem {
  id: string;
  label: string;
  lane: RuntimeIncidentHandlingLane;
  severity: RuntimeIncidentHandlingSeverity;
  reason: string;
  manualResolution: string;
  blocksHandlingActivation: boolean;
}

export interface RuntimeIncidentHandlingActivationReport {
  generatedAt: string;
  mode: RuntimeIncidentHandlingMode;
  context: Required<RuntimeIncidentHandlingInput>;
  readiness: RuntimeIncidentHandlingGuardrail;
  handlingGateScore: number;
  handlingGateStatus: RuntimeIncidentHandlingReadinessBand;
  overallSeverity: RuntimeIncidentHandlingSeverity;
  sourceNodes: RuntimeIncidentHandlingSourceNode[];
  incidentHandlingGate: IncidentHandlingGateItem[];
  incidentWriteApprovalLock: IncidentWriteApprovalItem[];
  operatorNotificationBoundary: OperatorNotificationBoundaryItem[];
  incidentEscalationBoard: IncidentEscalationBoardItem[];
  providerIncidentBoundary: ProviderIncidentBoundaryItem[];
  rollbackIncidentPlan: RollbackIncidentPlanItem[];
  incidentClosureChecklist: IncidentClosureChecklistItem[];
  incidentHandlingNoGoBoard: IncidentHandlingNoGoItem[];
  handlingGateChecks: RuntimeIncidentHandlingGateCheckItem[];
  handlingBoardPack: RuntimeIncidentHandlingBoardPackItem[];
  handlingFindings: RuntimeIncidentHandlingFindingItem[];
  stagedRoadmap: {
    v169: string;
    v170: string;
    v171: string;
    v172: string;
    v173: string;
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

export const RUNTIME_INCIDENT_HANDLING_GUARDRAIL: RuntimeIncidentHandlingGuardrail = {
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
  incidentHandlingAllowed: false,
  incidentHandlingPerformed: false,
  incidentWriteAllowed: false,
  incidentWritePerformed: false,
  incidentEscalationAllowed: false,
  incidentEscalationPerformed: false,
  incidentClosureAllowed: false,
  incidentClosurePerformed: false,
  incidentNotificationAllowed: false,
  incidentNotificationPerformed: false,
  runtimeIncidentHandlingGateReady: true,
  incidentWriteApprovalLockReady: true,
  incidentEscalationBoardReady: true,
  incidentClosureChecklistReady: true,
};

const priorityWeight: Record<RuntimeIncidentHandlingPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: RuntimeIncidentHandlingInput): Required<RuntimeIncidentHandlingInput> {
  return {
    handlingGateItemCount: input.handlingGateItemCount ?? 8,
    incidentWriteApprovalItemCount: input.incidentWriteApprovalItemCount ?? 8,
    operatorNotificationItemCount: input.operatorNotificationItemCount ?? 7,
    escalationBoardItemCount: input.escalationBoardItemCount ?? 7,
    providerBoundaryItemCount: input.providerBoundaryItemCount ?? 7,
    closureChecklistItemCount: input.closureChecklistItemCount ?? 7,
    openHandlingGapCount: input.openHandlingGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    incidentResponseScore: input.incidentResponseScore ?? 70,
    providerCanaryScore: input.providerCanaryScore ?? 70,
    manualDispatchScore: input.manualDispatchScore ?? 70,
    writeApprovalScore: input.writeApprovalScore ?? 66,
    escalationScore: input.escalationScore ?? 64,
    closureScore: input.closureScore ?? 66,
    handlingLeadRole: input.handlingLeadRole ?? "runtime incident handling reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): RuntimeIncidentHandlingSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: RuntimeIncidentHandlingSeverity): RuntimeIncidentHandlingPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): RuntimeIncidentHandlingReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-write-handling-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "handling-gate-design-ready";
}

function buildSourceNode(
  id: string,
  lane: RuntimeIncidentHandlingLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): RuntimeIncidentHandlingSourceNode {
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
            "Runtime incident handling gate remains below activation threshold.",
            "Handling board must resolve write approval, operator notification, escalation, provider boundary and closure gaps before any later incident handling release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<RuntimeIncidentHandlingInput>): RuntimeIncidentHandlingSourceNode[] {
  const handlingPressure = context.handlingGateItemCount;
  const writePressure = context.incidentWriteApprovalItemCount * 2;
  const notificationPressure = context.operatorNotificationItemCount;
  const escalationPressure = context.escalationBoardItemCount * 2;
  const providerPressure = context.providerBoundaryItemCount;
  const gapPressure = context.openHandlingGapCount * 2;

  return [
    buildSourceNode(
      "RIHG_NODE_001",
      "incident-handling-gate",
      "Runtime incident response board",
      "V16.5",
      context.incidentResponseScore,
      context.writeApprovalScore,
      handlingPressure,
      "Connect incident response board to runtime handling design.",
    ),
    buildSourceNode(
      "RIHG_NODE_002",
      "incident-write-approval",
      "Incident write approval lock",
      "V16.9",
      context.writeApprovalScore,
      context.incidentResponseScore,
      writePressure,
      "Prepare incident write approval without writing incident records.",
    ),
    buildSourceNode(
      "RIHG_NODE_003",
      "operator-notification-boundary",
      "Manual dispatch activation gate",
      "V16.7",
      context.manualDispatchScore,
      context.writeApprovalScore,
      notificationPressure,
      "Keep incident operator notifications blocked.",
    ),
    buildSourceNode(
      "RIHG_NODE_004",
      "incident-escalation-board",
      "Incident escalation readiness",
      "V16.9",
      context.escalationScore,
      context.incidentResponseScore,
      escalationPressure,
      "Prepare escalation board without escalation writes.",
    ),
    buildSourceNode(
      "RIHG_NODE_005",
      "provider-incident-boundary",
      "Provider canary zero-call gate",
      "V16.8",
      context.providerCanaryScore,
      context.onlineReadinessScore,
      providerPressure,
      "Keep provider incident handling and provider calls blocked.",
    ),
    buildSourceNode(
      "RIHG_NODE_006",
      "rollback-incident-plan",
      "Incident rollback design",
      "V16.5",
      context.incidentResponseScore,
      context.closureScore,
      context.closureChecklistItemCount,
      "Prepare rollback incident plan without runtime action.",
    ),
    buildSourceNode(
      "RIHG_NODE_007",
      "incident-closure-checklist",
      "Incident closure checklist",
      "V16.9",
      context.closureScore,
      context.writeApprovalScore,
      gapPressure,
      "Prepare closure checklist without closure persistence.",
    ),
    buildSourceNode(
      "RIHG_NODE_008",
      "human-signoff",
      "Incident handling human signoff",
      "V16.9",
      context.writeApprovalScore,
      context.escalationScore,
      gapPressure,
      "Keep incident handling activation blocked until a separate explicit release.",
    ),
  ];
}

function buildIncidentHandlingGate(context: Required<RuntimeIncidentHandlingInput>): IncidentHandlingGateItem[] {
  return [
    {
      id: "RIHG_GATEPLAN_001",
      label: "Runtime incident handling lock",
      lane: "incident-handling-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep runtime incident handling disabled in V16.9.",
      requiredEvidence: ["incidentHandlingAllowed=false", "incidentWriteAllowed=false", "incidentNotificationAllowed=false"],
      blockedOutcome: "No incident handling activation.",
    },
    {
      id: "RIHG_GATEPLAN_002",
      label: "Zero-write incident handling plan",
      lane: "incident-handling-gate",
      gateScore: clampScore(context.incidentResponseScore),
      severity: severityFromConcern(100 - context.incidentResponseScore + context.handlingGateItemCount * 4),
      gatePurpose: "Prepare handling flow without incident writes.",
      requiredEvidence: ["write approval lock", "escalation board", "closure checklist"],
      blockedOutcome: "No incident record write.",
    },
    {
      id: "RIHG_GATEPLAN_003",
      label: "Human incident board lock",
      lane: "incident-handling-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require human review before any later incident handling activation.",
      requiredEvidence: ["humanReviewRequired=true", "zeroActivationMode=true"],
      blockedOutcome: "No runtime incident action.",
    },
  ];
}

function buildIncidentWriteApprovalLock(context: Required<RuntimeIncidentHandlingInput>): IncidentWriteApprovalItem[] {
  return [
    {
      id: "RIHG_WRITE_001",
      label: "Incident write approval design",
      lane: "incident-write-approval",
      approvalScore: clampScore(context.writeApprovalScore),
      severity: severityFromConcern(100 - context.writeApprovalScore + context.incidentWriteApprovalItemCount * 4),
      approvalQuestion: "Can incident write approval be reviewed without writing records?",
      requiredEvidence: ["reviewer role", "write hold", "board note"],
      blockedOutcome: "No incident write approval.",
    },
    {
      id: "RIHG_WRITE_002",
      label: "Incident escalation write lock",
      lane: "incident-write-approval",
      approvalScore: 100,
      severity: "critical",
      approvalQuestion: "Can escalation writes remain blocked?",
      requiredEvidence: ["incidentEscalationAllowed=false", "incidentEscalationPerformed=false"],
      blockedOutcome: "No escalation write.",
    },
    {
      id: "RIHG_WRITE_003",
      label: "Incident closure write lock",
      lane: "incident-write-approval",
      approvalScore: 100,
      severity: "critical",
      approvalQuestion: "Can closure writes remain blocked?",
      requiredEvidence: ["incidentClosureAllowed=false", "incidentClosurePerformed=false"],
      blockedOutcome: "No closure write.",
    },
  ];
}

function buildOperatorNotificationBoundary(): OperatorNotificationBoundaryItem[] {
  return [
    {
      id: "RIHG_NOTIFY_001",
      label: "Operator notification boundary",
      lane: "operator-notification-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No incident notification can be sent.",
      blockedOutcome: "incidentNotificationAllowed=false",
    },
    {
      id: "RIHG_NOTIFY_002",
      label: "Dispatch notification boundary",
      lane: "operator-notification-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No dispatch notification can be sent.",
      blockedOutcome: "dispatchNotificationAllowed=false",
    },
    {
      id: "RIHG_NOTIFY_003",
      label: "Public sharing boundary",
      lane: "operator-notification-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No incident output can be publicly shared.",
      blockedOutcome: "publicShareAllowed=false",
    },
  ];
}

function buildIncidentEscalationBoard(context: Required<RuntimeIncidentHandlingInput>): IncidentEscalationBoardItem[] {
  return [
    {
      id: "RIHG_ESCALATION_001",
      label: "Human escalation board design",
      lane: "incident-escalation-board",
      escalationScore: clampScore(context.escalationScore),
      priority: context.escalationScore < 70 ? "urgent" : "high",
      escalationQuestion: "Can unresolved incident handling route to human board?",
      requiredControls: ["human review", "manual note", "no-write state"],
      manualResolution: "Hold incident locally and keep runtime locked.",
    },
    {
      id: "RIHG_ESCALATION_002",
      label: "Provider incident escalation design",
      lane: "incident-escalation-board",
      escalationScore: clampScore(context.providerCanaryScore),
      priority: "urgent",
      escalationQuestion: "Can provider-related incidents remain zero-call?",
      requiredControls: ["provider call lock", "provider result lock", "fallback route"],
      manualResolution: "Return to local dry-run review.",
    },
    {
      id: "RIHG_ESCALATION_003",
      label: "Operational escalation design",
      lane: "incident-escalation-board",
      escalationScore: clampScore(context.manualDispatchScore),
      priority: "high",
      escalationQuestion: "Can operational incidents avoid dispatch or execution?",
      requiredControls: ["dispatch lock", "task lock", "intervention lock", "execution lock"],
      manualResolution: "Keep all work conversion locked.",
    },
  ];
}

function buildProviderIncidentBoundary(): ProviderIncidentBoundaryItem[] {
  return [
    {
      id: "RIHG_PROVIDER_001",
      label: "Provider call boundary",
      lane: "provider-incident-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "Incident handling cannot call provider.",
      blockedOutcome: "providerCalled=false",
    },
    {
      id: "RIHG_PROVIDER_002",
      label: "Provider canary boundary",
      lane: "provider-incident-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "Incident handling cannot trigger provider canary.",
      blockedOutcome: "providerCanaryCallAllowed=false",
    },
    {
      id: "RIHG_PROVIDER_003",
      label: "Provider result boundary",
      lane: "provider-incident-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "Incident handling cannot persist provider result.",
      blockedOutcome: "canaryResultPersistenceAllowed=false",
    },
  ];
}

function buildRollbackIncidentPlan(context: Required<RuntimeIncidentHandlingInput>): RollbackIncidentPlanItem[] {
  return [
    {
      id: "RIHG_ROLLBACK_001",
      label: "Incident handling rollback plan",
      lane: "rollback-incident-plan",
      rollbackScore: clampScore(context.incidentResponseScore),
      priority: context.incidentResponseScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future incident handling return to zero-write state?",
      safeFallback: "Return to local dry-run incident board.",
    },
    {
      id: "RIHG_ROLLBACK_002",
      label: "Notification rollback plan",
      lane: "rollback-incident-plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can notification actions remain blocked?",
      safeFallback: "No notification path exists in V16.9.",
    },
    {
      id: "RIHG_ROLLBACK_003",
      label: "Provider incident rollback plan",
      lane: "rollback-incident-plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can provider incident routes remain zero-call?",
      safeFallback: "No provider path exists in V16.9.",
    },
  ];
}

function buildIncidentClosureChecklist(context: Required<RuntimeIncidentHandlingInput>): IncidentClosureChecklistItem[] {
  return [
    {
      id: "RIHG_CLOSURE_001",
      label: "Closure checklist design",
      lane: "incident-closure-checklist",
      closureScore: clampScore(context.closureScore),
      severity: severityFromConcern(100 - context.closureScore + context.closureChecklistItemCount * 4),
      closureQuestion: "Can incident closure checklist be reviewed without closure writes?",
      requiredChecks: ["root cause note", "rollback note", "human review note"],
      manualResolution: "Keep closure checklist local and dry-run only.",
    },
    {
      id: "RIHG_CLOSURE_002",
      label: "Safety closure checklist",
      lane: "incident-closure-checklist",
      closureScore: 100,
      severity: "critical",
      closureQuestion: "Can closure confirm no product, dosage or execution action?",
      requiredChecks: ["no product advice", "no dosage guidance", "no execution"],
      manualResolution: "Block closure if unsafe action is present.",
    },
    {
      id: "RIHG_CLOSURE_003",
      label: "Evidence closure checklist",
      lane: "incident-closure-checklist",
      closureScore: clampScore(context.writeApprovalScore),
      severity: "elevated",
      closureQuestion: "Can evidence be checked before later closure activation?",
      requiredChecks: ["reviewer role", "board status", "redacted output"],
      manualResolution: "Hold for reviewer if evidence is incomplete.",
    },
  ];
}

function buildIncidentHandlingNoGoBoard(): IncidentHandlingNoGoItem[] {
  return [
    {
      id: "RIHG_GONOGO_001",
      label: "Incident handling activation plan",
      lane: "human-signoff",
      goNoGoState: "zero-write-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["write approval lock", "notification boundary", "escalation board", "closure checklist"],
      safeOutcome: "Incident handling plan only.",
    },
    {
      id: "RIHG_GONOGO_002",
      label: "Actual incident handling activation",
      lane: "incident-handling-gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate incident handling release", "write approval proof", "notification approval proof"],
      safeOutcome: "Incident handling activation remains blocked.",
    },
    {
      id: "RIHG_GONOGO_003",
      label: "Incident write, notification or closure",
      lane: "incident-write-approval",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate write path release", "human approval", "retention review"],
      safeOutcome: "Incident write, notification and closure remain blocked.",
    },
  ];
}

function buildHandlingGateChecks(
  context: Required<RuntimeIncidentHandlingInput>,
  sourceNodes: RuntimeIncidentHandlingSourceNode[],
): RuntimeIncidentHandlingGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "RIHG_CHECK_001",
      label: "Handling gate remains zero-write",
      lane: "incident-handling-gate" as RuntimeIncidentHandlingLane,
      score: 100,
      reviewer: "runtime incident handling reviewer",
      requiredEvidence: ["incidentHandlingAllowed=false", "incidentWriteAllowed=false", "incidentNotificationAllowed=false"],
      hardStop: "Do not activate incident handling in V16.9.",
    },
    {
      id: "RIHG_CHECK_002",
      label: "Incident write approval is complete enough",
      lane: "incident-write-approval" as RuntimeIncidentHandlingLane,
      score: context.writeApprovalScore - context.incidentWriteApprovalItemCount * 3,
      reviewer: context.handlingLeadRole,
      requiredEvidence: ["write approval", "escalation write lock", "closure write lock"],
      hardStop: "Do not proceed without incident write approval board.",
    },
    {
      id: "RIHG_CHECK_003",
      label: "Notification boundary is complete",
      lane: "operator-notification-boundary" as RuntimeIncidentHandlingLane,
      score: 100,
      reviewer: "notification boundary reviewer",
      requiredEvidence: ["operator notification boundary", "dispatch notification boundary", "public share boundary"],
      hardStop: "Notification boundaries must remain active.",
    },
    {
      id: "RIHG_CHECK_004",
      label: "Escalation board is complete enough",
      lane: "incident-escalation-board" as RuntimeIncidentHandlingLane,
      score: context.escalationScore - context.escalationBoardItemCount * 3,
      reviewer: "incident escalation reviewer",
      requiredEvidence: ["human escalation", "provider escalation", "operational escalation"],
      hardStop: "Do not proceed without escalation board.",
    },
    {
      id: "RIHG_CHECK_005",
      label: "Closure checklist is complete enough",
      lane: "incident-closure-checklist" as RuntimeIncidentHandlingLane,
      score: context.closureScore - context.closureChecklistItemCount * 3,
      reviewer: "incident closure reviewer",
      requiredEvidence: ["closure checklist", "safety closure", "evidence closure"],
      hardStop: "Do not proceed without closure checklist.",
    },
    {
      id: "RIHG_CHECK_006",
      label: "Source blockers are within handling tolerance",
      lane: "human-signoff" as RuntimeIncidentHandlingLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before zero-write-handling-plan-ready state.",
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

function buildBoardPack(context: Required<RuntimeIncidentHandlingInput>): RuntimeIncidentHandlingBoardPackItem[] {
  return [
    {
      id: "RIHG_PACK_001",
      label: "Incident handling gate packet",
      lane: "incident-handling-gate",
      packReady: context.incidentResponseScore >= 60,
      readinessScore: clampScore(context.incidentResponseScore),
      reviewerCheck: "Confirm incident handling remains zero-write and design-only.",
      includedSections: ["handling gate", "write approval lock", "incident no-go"],
      blockedSections: ["incident write", "incident notification", "incident closure"],
    },
    {
      id: "RIHG_PACK_002",
      label: "Escalation and boundary packet",
      lane: "incident-escalation-board",
      packReady: context.escalationScore >= 60,
      readinessScore: clampScore(context.escalationScore),
      reviewerCheck: "Confirm escalation and provider boundaries remain locked.",
      includedSections: ["escalation board", "provider boundary", "operator boundary"],
      blockedSections: ["provider call", "dispatch notification", "public share"],
    },
    {
      id: "RIHG_PACK_003",
      label: "Rollback and closure packet",
      lane: "rollback-incident-plan",
      packReady: context.closureScore >= 60,
      readinessScore: clampScore(context.closureScore),
      reviewerCheck: "Confirm rollback and closure remain dry-run only.",
      includedSections: ["rollback incident plan", "closure checklist", "safety closure"],
      blockedSections: ["closure write", "automatic rollback", "runtime action"],
    },
  ];
}

function buildFindings(
  context: Required<RuntimeIncidentHandlingInput>,
  sourceNodes: RuntimeIncidentHandlingSourceNode[],
  gates: RuntimeIncidentHandlingGateCheckItem[],
  goNoGo: IncidentHandlingNoGoItem[],
): RuntimeIncidentHandlingFindingItem[] {
  const findings: RuntimeIncidentHandlingFindingItem[] = [];

  if (context.openHandlingGapCount > 0) {
    findings.push({
      id: "RIHG_FINDING_001",
      label: "Open incident handling gaps",
      lane: "human-signoff",
      severity: context.openHandlingGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openHandlingGapCount} incident handling gaps remain before any later activation.`,
      manualResolution: "Resolve write approval, notification, escalation, provider boundary and closure gaps in a later gated release.",
      blocksHandlingActivation: true,
    });
  }

  if (context.writeApprovalScore < 70) {
    findings.push({
      id: "RIHG_FINDING_002",
      label: "Incident write approval below threshold",
      lane: "incident-write-approval",
      severity: "critical",
      reason: "Incident write approval is not mature enough for activation.",
      manualResolution: "Complete write approval, escalation write lock and closure write lock review.",
      blocksHandlingActivation: true,
    });
  }

  if (context.escalationScore < 70) {
    findings.push({
      id: "RIHG_FINDING_003",
      label: "Escalation board below threshold",
      lane: "incident-escalation-board",
      severity: "critical",
      reason: "Incident escalation board is not mature enough for activation.",
      manualResolution: "Complete human, provider and operational escalation controls.",
      blocksHandlingActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `RIHG_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksHandlingActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `RIHG_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Handling gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksHandlingActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `RIHG_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksHandlingActivation: true,
      });
    });

  return findings;
}

export function buildAiRuntimeIncidentHandlingActivationGateReport(
  input: RuntimeIncidentHandlingInput = {},
): RuntimeIncidentHandlingActivationReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const incidentHandlingGate = buildIncidentHandlingGate(context);
  const incidentWriteApprovalLock = buildIncidentWriteApprovalLock(context);
  const operatorNotificationBoundary = buildOperatorNotificationBoundary();
  const incidentEscalationBoard = buildIncidentEscalationBoard(context);
  const providerIncidentBoundary = buildProviderIncidentBoundary();
  const rollbackIncidentPlan = buildRollbackIncidentPlan(context);
  const incidentClosureChecklist = buildIncidentClosureChecklist(context);
  const incidentHandlingNoGoBoard = buildIncidentHandlingNoGoBoard();
  const handlingGateChecks = buildHandlingGateChecks(context, sourceNodes);
  const handlingBoardPack = buildBoardPack(context);
  const handlingFindings = buildFindings(context, sourceNodes, handlingGateChecks, incidentHandlingNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    incidentHandlingGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, incidentHandlingGate.length);

  const writeAverage =
    incidentWriteApprovalLock.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, incidentWriteApprovalLock.length);

  const gateAverage =
    handlingGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, handlingGateChecks.length);

  const findingPenalty = handlingFindings.filter((item) => item.blocksHandlingActivation).length * 7;
  const escalationPressure =
    incidentEscalationBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, incidentEscalationBoard.length * 4);

  const handlingGateScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      writeAverage / 4 +
      gateAverage / 4 +
      escalationPressure -
      findingPenalty -
      context.openHandlingGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openHandlingGapCount * 8 +
        context.incidentWriteApprovalItemCount * 6 +
        context.operatorNotificationItemCount * 5 +
        context.escalationBoardItemCount * 6 +
        context.providerBoundaryItemCount * 5,
    ),
  );

  const handlingGateStatus = bandFromScore(
    handlingGateScore,
    handlingFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: RUNTIME_INCIDENT_HANDLING_GUARDRAIL,
    handlingGateScore,
    handlingGateStatus,
    overallSeverity,
    sourceNodes,
    incidentHandlingGate,
    incidentWriteApprovalLock,
    operatorNotificationBoundary,
    incidentEscalationBoard,
    providerIncidentBoundary,
    rollbackIncidentPlan,
    incidentClosureChecklist,
    incidentHandlingNoGoBoard,
    handlingGateChecks,
    handlingBoardPack,
    handlingFindings,
    stagedRoadmap: {
      v169: "Runtime incident handling activation gate in zero-write dry-run.",
      v170: "Public compliance export only after explicit legal and privacy approval.",
      v171: "Manual dispatch write path only after explicit operational approval.",
      v172: "Provider canary call execution only after explicit provider approval.",
      v173: "Incident handling write path only after explicit incident governance approval.",
    },
    redactedExportBundle: {
      exportId: "runtime_incident_handling_activation_gate_v16_9_redacted_dry_run",
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
        "incident handling gate",
        "incident write approval lock",
        "operator notification boundary",
        "incident escalation board",
        "provider incident boundary",
        "rollback incident plan",
        "incident closure checklist",
        "incident handling no-go board",
        "handling gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Runtime incident handling activation gate is local dry-run only.",
      "No incident handling activation, incident write, incident escalation, incident closure, notification, provider call, storage activation, task creation, intervention creation or execution is performed.",
      "Incident handling remains zero-write and zero-call.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V16.9 prepares runtime incident handling governance only.",
    ],
  };
}

export const aiRuntimeIncidentHandlingActivationGateVersion = "V16.9";
