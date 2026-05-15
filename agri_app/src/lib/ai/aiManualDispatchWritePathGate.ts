export type ManualDispatchWritePathMode = "dry-run" | "write-path-board-review";

export type ManualDispatchWriteSeverity = "info" | "watch" | "elevated" | "critical";

export type ManualDispatchWritePriority = "low" | "medium" | "high" | "urgent";

export type ManualDispatchWriteReadinessBand =
  | "blocked"
  | "write-path-design-ready"
  | "manual-board-review-ready"
  | "zero-write-plan-ready";

export type ManualDispatchWriteLane =
  | "dispatch-write-path-gate"
  | "task_write_approval"
  | "intervention-write-approval"
  | "work-order-boundary"
  | "operator-write-attestation"
  | "rollback-write-plan"
  | "write-no-go"
  | "human-signoff";

export interface ManualDispatchWritePathGuardrail {
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
  canaryExecutionAllowed: false;
  canaryExecutionPerformed: false;
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
  complianceExportActivationAllowed: false;
  complianceExportActivationPerformed: false;
  publicComplianceExportPublicationAllowed: false;
  publicComplianceExportPublicationPerformed: false;
  manualDispatchActivationAllowed: false;
  manualDispatchActivationPerformed: false;
  manualDispatchWritePathAllowed: false;
  manualDispatchWritePathPerformed: false;
  dispatchDraftWriteAllowed: false;
  dispatchDraftWritePerformed: false;
  dispatchTicketWriteAllowed: false;
  dispatchTicketWritePerformed: false;
  workOrderDispatchAllowed: false;
  workOrderDispatchPerformed: false;
  taskWriteApprovalAllowed: false;
  taskWriteApprovalPerformed: false;
  interventionWriteApprovalAllowed: false;
  interventionWriteApprovalPerformed: false;
  workOrderPersistenceAllowed: false;
  workOrderPersistencePerformed: false;
  operatorWriteAttestationAllowed: false;
  operatorWriteAttestationPerformed: false;
  dispatchNotificationAllowed: false;
  dispatchNotificationPerformed: false;
  manualDispatchWritePathGateReady: true;
  taskInterventionApprovalLockReady: true;
  workOrderBoundaryReady: true;
  writeNoGoReady: true;
}

export interface ManualDispatchWritePathInput {
  writeGateItemCount?: number;
  taskApprovalItemCount?: number;
  interventionApprovalItemCount?: number;
  workBoundaryItemCount?: number;
  operatorAttestationItemCount?: number;
  rollbackWriteItemCount?: number;
  openWritePathGapCount?: number;
  onlineReadinessScore?: number;
  manualDispatchGateScore?: number;
  publicationGateScore?: number;
  incidentHandlingScore?: number;
  taskApprovalScore?: number;
  interventionApprovalScore?: number;
  workBoundaryScore?: number;
  writeLeadRole?: string;
}

export interface ManualDispatchWriteSourceNode {
  id: string;
  lane: ManualDispatchWriteLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ManualDispatchWriteSeverity;
  priority: ManualDispatchWritePriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface DispatchWritePathGateItem {
  id: string;
  label: string;
  lane: ManualDispatchWriteLane;
  gateScore: number;
  severity: ManualDispatchWriteSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface TaskWriteApprovalItem {
  id: string;
  label: string;
  lane: ManualDispatchWriteLane;
  approvalScore: number;
  priority: ManualDispatchWritePriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface InterventionWriteApprovalItem {
  id: string;
  label: string;
  lane: ManualDispatchWriteLane;
  approvalScore: number;
  severity: ManualDispatchWriteSeverity;
  approvalQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface WorkOrderBoundaryItem {
  id: string;
  label: string;
  lane: ManualDispatchWriteLane;
  boundaryScore: number;
  severity: ManualDispatchWriteSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface OperatorWriteAttestationItem {
  id: string;
  label: string;
  lane: ManualDispatchWriteLane;
  attestationScore: number;
  priority: ManualDispatchWritePriority;
  attestationQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface RollbackWritePlanItem {
  id: string;
  label: string;
  lane: ManualDispatchWriteLane;
  rollbackScore: number;
  priority: ManualDispatchWritePriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface WriteNoGoItem {
  id: string;
  label: string;
  lane: ManualDispatchWriteLane;
  goNoGoState: "no-go" | "design-only" | "zero-write-plan-ready";
  score: number;
  severity: ManualDispatchWriteSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface WriteGateCheckItem {
  id: string;
  label: string;
  lane: ManualDispatchWriteLane;
  passed: boolean;
  score: number;
  severity: ManualDispatchWriteSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface WriteBoardPackItem {
  id: string;
  label: string;
  lane: ManualDispatchWriteLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface WritePathFindingItem {
  id: string;
  label: string;
  lane: ManualDispatchWriteLane;
  severity: ManualDispatchWriteSeverity;
  reason: string;
  manualResolution: string;
  blocksWritePathActivation: boolean;
}

export interface ManualDispatchWritePathReport {
  generatedAt: string;
  mode: ManualDispatchWritePathMode;
  context: Required<ManualDispatchWritePathInput>;
  readiness: ManualDispatchWritePathGuardrail;
  writePathScore: number;
  writePathStatus: ManualDispatchWriteReadinessBand;
  overallSeverity: ManualDispatchWriteSeverity;
  sourceNodes: ManualDispatchWriteSourceNode[];
  dispatchWritePathGate: DispatchWritePathGateItem[];
  taskWriteApprovalLock: TaskWriteApprovalItem[];
  interventionWriteApprovalLock: InterventionWriteApprovalItem[];
  workOrderBoundary: WorkOrderBoundaryItem[];
  operatorWriteAttestation: OperatorWriteAttestationItem[];
  rollbackWritePlan: RollbackWritePlanItem[];
  writeNoGoBoard: WriteNoGoItem[];
  writeGateChecks: WriteGateCheckItem[];
  writeBoardPack: WriteBoardPackItem[];
  writeFindings: WritePathFindingItem[];
  stagedRoadmap: {
    v171: string;
    v172: string;
    v173: string;
    v174: string;
    v175: string;
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

export const MANUAL_DISPATCH_WRITE_PATH_GUARDRAIL: ManualDispatchWritePathGuardrail = {
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
  canaryExecutionAllowed: false,
  canaryExecutionPerformed: false,
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
  complianceExportActivationAllowed: false,
  complianceExportActivationPerformed: false,
  publicComplianceExportPublicationAllowed: false,
  publicComplianceExportPublicationPerformed: false,
  manualDispatchActivationAllowed: false,
  manualDispatchActivationPerformed: false,
  manualDispatchWritePathAllowed: false,
  manualDispatchWritePathPerformed: false,
  dispatchDraftWriteAllowed: false,
  dispatchDraftWritePerformed: false,
  dispatchTicketWriteAllowed: false,
  dispatchTicketWritePerformed: false,
  workOrderDispatchAllowed: false,
  workOrderDispatchPerformed: false,
  taskWriteApprovalAllowed: false,
  taskWriteApprovalPerformed: false,
  interventionWriteApprovalAllowed: false,
  interventionWriteApprovalPerformed: false,
  workOrderPersistenceAllowed: false,
  workOrderPersistencePerformed: false,
  operatorWriteAttestationAllowed: false,
  operatorWriteAttestationPerformed: false,
  dispatchNotificationAllowed: false,
  dispatchNotificationPerformed: false,
  manualDispatchWritePathGateReady: true,
  taskInterventionApprovalLockReady: true,
  workOrderBoundaryReady: true,
  writeNoGoReady: true,
};

const priorityWeight: Record<ManualDispatchWritePriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ManualDispatchWritePathInput): Required<ManualDispatchWritePathInput> {
  return {
    writeGateItemCount: input.writeGateItemCount ?? 8,
    taskApprovalItemCount: input.taskApprovalItemCount ?? 8,
    interventionApprovalItemCount: input.interventionApprovalItemCount ?? 8,
    workBoundaryItemCount: input.workBoundaryItemCount ?? 7,
    operatorAttestationItemCount: input.operatorAttestationItemCount ?? 7,
    rollbackWriteItemCount: input.rollbackWriteItemCount ?? 7,
    openWritePathGapCount: input.openWritePathGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    manualDispatchGateScore: input.manualDispatchGateScore ?? 70,
    publicationGateScore: input.publicationGateScore ?? 70,
    incidentHandlingScore: input.incidentHandlingScore ?? 70,
    taskApprovalScore: input.taskApprovalScore ?? 66,
    interventionApprovalScore: input.interventionApprovalScore ?? 66,
    workBoundaryScore: input.workBoundaryScore ?? 68,
    writeLeadRole: input.writeLeadRole ?? "manual dispatch write path reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ManualDispatchWriteSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ManualDispatchWriteSeverity): ManualDispatchWritePriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ManualDispatchWriteReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-write-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "write-path-design-ready";
}

function buildSourceNode(
  id: string,
  lane: ManualDispatchWriteLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ManualDispatchWriteSourceNode {
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
            "Manual dispatch write path gate remains below activation threshold.",
            "Write path board must resolve task approval, intervention approval, work order boundary and rollback gaps before any later write path release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ManualDispatchWritePathInput>): ManualDispatchWriteSourceNode[] {
  const writePressure = context.writeGateItemCount;
  const taskPressure = context.taskApprovalItemCount * 2;
  const interventionPressure = context.interventionApprovalItemCount * 2;
  const boundaryPressure = context.workBoundaryItemCount;
  const attestationPressure = context.operatorAttestationItemCount;
  const gapPressure = context.openWritePathGapCount * 2;

  return [
    buildSourceNode(
      "MDWP_NODE_001",
      "dispatch-write-path-gate",
      "Manual dispatch activation gate",
      "V16.7",
      context.manualDispatchGateScore,
      context.taskApprovalScore,
      writePressure,
      "Connect manual dispatch activation design to a future write path gate.",
    ),
    buildSourceNode(
      "MDWP_NODE_002",
      "task_write_approval",
      "Task write approval lock",
      "V17.1",
      context.taskApprovalScore,
      context.manualDispatchGateScore,
      taskPressure,
      "Prepare task write approval without task creation.",
    ),
    buildSourceNode(
      "MDWP_NODE_003",
      "intervention-write-approval",
      "Intervention write approval lock",
      "V17.1",
      context.interventionApprovalScore,
      context.manualDispatchGateScore,
      interventionPressure,
      "Prepare intervention write approval without intervention creation.",
    ),
    buildSourceNode(
      "MDWP_NODE_004",
      "work-order-boundary",
      "Work order persistence boundary",
      "V17.1",
      context.workBoundaryScore,
      context.taskApprovalScore,
      boundaryPressure,
      "Keep work order persistence blocked.",
    ),
    buildSourceNode(
      "MDWP_NODE_005",
      "operator-write-attestation",
      "Public compliance export publication gate",
      "V17.0",
      context.publicationGateScore,
      context.interventionApprovalScore,
      attestationPressure,
      "Prepare operator write attestation without approval persistence.",
    ),
    buildSourceNode(
      "MDWP_NODE_006",
      "rollback-write-plan",
      "Runtime incident handling gate",
      "V16.9",
      context.incidentHandlingScore,
      context.workBoundaryScore,
      context.rollbackWriteItemCount,
      "Prepare write rollback plan without runtime action.",
    ),
    buildSourceNode(
      "MDWP_NODE_007",
      "write-no-go",
      "Manual dispatch write no-go",
      "V17.1",
      100,
      context.onlineReadinessScore,
      gapPressure,
      "Keep all draft, task, intervention and work order writes blocked.",
    ),
    buildSourceNode(
      "MDWP_NODE_008",
      "human-signoff",
      "Manual dispatch write human signoff",
      "V17.1",
      context.taskApprovalScore,
      context.interventionApprovalScore,
      gapPressure,
      "Keep write path activation blocked until a separate explicit operational release.",
    ),
  ];
}

function buildDispatchWritePathGate(context: Required<ManualDispatchWritePathInput>): DispatchWritePathGateItem[] {
  return [
    {
      id: "MDWP_GATE_001",
      label: "Manual dispatch write path lock",
      lane: "dispatch-write-path-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep manual dispatch write path disabled in V17.1.",
      requiredEvidence: ["manualDispatchWritePathAllowed=false", "dispatchDraftWriteAllowed=false", "workOrderPersistenceAllowed=false"],
      blockedOutcome: "No write path activation.",
    },
    {
      id: "MDWP_GATE_002",
      label: "Zero-write dispatch plan",
      lane: "dispatch-write-path-gate",
      gateScore: clampScore(context.manualDispatchGateScore),
      severity: severityFromConcern(100 - context.manualDispatchGateScore + context.writeGateItemCount * 4),
      gatePurpose: "Prepare dispatch write flow without writing records.",
      requiredEvidence: ["task approval", "intervention approval", "work boundary", "operator attestation"],
      blockedOutcome: "No dispatch draft write.",
    },
    {
      id: "MDWP_GATE_003",
      label: "Operational write approval lock",
      lane: "dispatch-write-path-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require a separate future release before any write path approval.",
      requiredEvidence: ["taskWriteApprovalAllowed=false", "interventionWriteApprovalAllowed=false"],
      blockedOutcome: "No write approval.",
    },
  ];
}

function buildTaskWriteApprovalLock(context: Required<ManualDispatchWritePathInput>): TaskWriteApprovalItem[] {
  return [
    {
      id: "MDWP_TASK_001",
      label: "Task write approval design",
      lane: "task_write_approval",
      approvalScore: clampScore(context.taskApprovalScore),
      priority: context.taskApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can task write approval be reviewed without creating tasks?",
      requiredEvidence: ["reviewer role", "task write hold", "manual board note"],
      blockedOutcome: "No task write approval.",
    },
    {
      id: "MDWP_TASK_002",
      label: "Task draft write lock",
      lane: "task_write_approval",
      approvalScore: 100,
      priority: "urgent",
      approvalQuestion: "Can task draft writes remain blocked?",
      requiredEvidence: ["taskCreated=false", "dispatchDraftWriteAllowed=false"],
      blockedOutcome: "No task draft write.",
    },
    {
      id: "MDWP_TASK_003",
      label: "Task notification lock",
      lane: "task_write_approval",
      approvalScore: 100,
      priority: "urgent",
      approvalQuestion: "Can task notifications remain blocked?",
      requiredEvidence: ["dispatchNotificationAllowed=false", "automaticExecutionAllowed=false"],
      blockedOutcome: "No dispatch notification.",
    },
  ];
}

function buildInterventionWriteApprovalLock(context: Required<ManualDispatchWritePathInput>): InterventionWriteApprovalItem[] {
  return [
    {
      id: "MDWP_INTERVENTION_001",
      label: "Intervention write approval design",
      lane: "intervention-write-approval",
      approvalScore: clampScore(context.interventionApprovalScore),
      severity: severityFromConcern(100 - context.interventionApprovalScore + context.interventionApprovalItemCount * 4),
      approvalQuestion: "Can intervention write approval be reviewed without creating interventions?",
      requiredChecks: ["reviewer role", "intervention write hold", "manual board note"],
      manualResolution: "Keep intervention write approval locked.",
    },
    {
      id: "MDWP_INTERVENTION_002",
      label: "Product prescription boundary",
      lane: "intervention-write-approval",
      approvalScore: 100,
      severity: "critical",
      approvalQuestion: "Can intervention approval avoid product prescription?",
      requiredChecks: ["productPrescriptionAllowed=false", "productPrescriptionPerformed=false"],
      manualResolution: "Block product prescription wording.",
    },
    {
      id: "MDWP_INTERVENTION_003",
      label: "Dosage advice boundary",
      lane: "intervention-write-approval",
      approvalScore: 100,
      severity: "critical",
      approvalQuestion: "Can intervention approval avoid dosage guidance?",
      requiredChecks: ["dosageAdviceAllowed=false", "dosageAdvicePerformed=false"],
      manualResolution: "Block dosage guidance wording.",
    },
  ];
}

function buildWorkOrderBoundary(): WorkOrderBoundaryItem[] {
  return [
    {
      id: "MDWP_BOUNDARY_001",
      label: "Work order persistence boundary",
      lane: "work-order-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No work order can be persisted.",
      blockedOutcome: "workOrderPersistenceAllowed=false",
    },
    {
      id: "MDWP_BOUNDARY_002",
      label: "Task creation boundary",
      lane: "work-order-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No task can be created.",
      blockedOutcome: "taskCreated=false",
    },
    {
      id: "MDWP_BOUNDARY_003",
      label: "Intervention creation boundary",
      lane: "work-order-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No intervention can be created.",
      blockedOutcome: "interventionCreated=false",
    },
  ];
}

function buildOperatorWriteAttestation(context: Required<ManualDispatchWritePathInput>): OperatorWriteAttestationItem[] {
  return [
    {
      id: "MDWP_ATTEST_001",
      label: "Operator write attestation design",
      lane: "operator-write-attestation",
      attestationScore: clampScore(context.taskApprovalScore),
      priority: "high",
      attestationQuestion: "Can operator write attestation be represented without persistence?",
      requiredEvidence: ["operator role", "write hold", "board note"],
      blockedOutcome: "No operator attestation persistence.",
    },
    {
      id: "MDWP_ATTEST_002",
      label: "Safety attestation design",
      lane: "operator-write-attestation",
      attestationScore: 100,
      priority: "urgent",
      attestationQuestion: "Can operator attestation confirm no unsafe write?",
      requiredEvidence: ["no product advice", "no dosage guidance", "no execution"],
      blockedOutcome: "No safety approval activation.",
    },
    {
      id: "MDWP_ATTEST_003",
      label: "Publication caveat attestation",
      lane: "operator-write-attestation",
      attestationScore: clampScore(context.publicationGateScore),
      priority: "high",
      attestationQuestion: "Can publication caveats remain separate from write path?",
      requiredEvidence: ["public share locked", "publication package locked", "redacted output"],
      blockedOutcome: "No publication coupling.",
    },
  ];
}

function buildRollbackWritePlan(context: Required<ManualDispatchWritePathInput>): RollbackWritePlanItem[] {
  return [
    {
      id: "MDWP_ROLLBACK_001",
      label: "Write path rollback plan",
      lane: "rollback-write-plan",
      rollbackScore: clampScore(context.incidentHandlingScore),
      priority: context.incidentHandlingScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future write path activation return to zero-write state?",
      safeFallback: "Return to local dry-run and write no-go board.",
    },
    {
      id: "MDWP_ROLLBACK_002",
      label: "Task write rollback plan",
      lane: "rollback-write-plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can task writes remain blocked?",
      safeFallback: "No task write path exists in V17.1.",
    },
    {
      id: "MDWP_ROLLBACK_003",
      label: "Intervention write rollback plan",
      lane: "rollback-write-plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can intervention writes remain blocked?",
      safeFallback: "No intervention write path exists in V17.1.",
    },
  ];
}

function buildWriteNoGoBoard(): WriteNoGoItem[] {
  return [
    {
      id: "MDWP_GONOGO_001",
      label: "Manual dispatch write path plan",
      lane: "human-signoff",
      goNoGoState: "zero-write-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["task approval", "intervention approval", "work boundary", "operator attestation"],
      safeOutcome: "Write path plan only.",
    },
    {
      id: "MDWP_GONOGO_002",
      label: "Actual manual dispatch write path",
      lane: "dispatch-write-path-gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate write path release", "operational approval", "rollback proof"],
      safeOutcome: "Manual dispatch write path remains blocked.",
    },
    {
      id: "MDWP_GONOGO_003",
      label: "Task or intervention creation",
      lane: "write-no-go",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate creation release", "human approval", "write audit proof"],
      safeOutcome: "Task and intervention creation remain blocked.",
    },
  ];
}

function buildWriteGateChecks(
  context: Required<ManualDispatchWritePathInput>,
  sourceNodes: ManualDispatchWriteSourceNode[],
): WriteGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "MDWP_CHECK_001",
      label: "Write path remains zero-write",
      lane: "dispatch-write-path-gate" as ManualDispatchWriteLane,
      score: 100,
      reviewer: "manual dispatch write path reviewer",
      requiredEvidence: ["manualDispatchWritePathAllowed=false", "taskCreated=false", "interventionCreated=false"],
      hardStop: "Do not activate write path in V17.1.",
    },
    {
      id: "MDWP_CHECK_002",
      label: "Task write approval is complete enough",
      lane: "task_write_approval" as ManualDispatchWriteLane,
      score: context.taskApprovalScore - context.taskApprovalItemCount * 3,
      reviewer: context.writeLeadRole,
      requiredEvidence: ["task approval", "task draft lock", "task notification lock"],
      hardStop: "Do not proceed without task write approval board.",
    },
    {
      id: "MDWP_CHECK_003",
      label: "Intervention write approval is complete enough",
      lane: "intervention-write-approval" as ManualDispatchWriteLane,
      score: context.interventionApprovalScore - context.interventionApprovalItemCount * 3,
      reviewer: "intervention write approval board",
      requiredEvidence: ["intervention approval", "product boundary", "dosage boundary"],
      hardStop: "Do not proceed without intervention write approval board.",
    },
    {
      id: "MDWP_CHECK_004",
      label: "Work order boundary is complete",
      lane: "work-order-boundary" as ManualDispatchWriteLane,
      score: 100,
      reviewer: "work order boundary reviewer",
      requiredEvidence: ["work order boundary", "task boundary", "intervention boundary"],
      hardStop: "Work boundaries must remain active.",
    },
    {
      id: "MDWP_CHECK_005",
      label: "Operator write attestation is complete enough",
      lane: "operator-write-attestation" as ManualDispatchWriteLane,
      score: context.taskApprovalScore - context.operatorAttestationItemCount * 3,
      reviewer: "operator write attestation board",
      requiredEvidence: ["operator attestation", "safety attestation", "publication caveat"],
      hardStop: "Do not proceed without operator attestation board.",
    },
    {
      id: "MDWP_CHECK_006",
      label: "Source blockers are within write path tolerance",
      lane: "human-signoff" as ManualDispatchWriteLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before zero-write-plan-ready state.",
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

function buildBoardPack(context: Required<ManualDispatchWritePathInput>): WriteBoardPackItem[] {
  return [
    {
      id: "MDWP_PACK_001",
      label: "Dispatch write path packet",
      lane: "dispatch-write-path-gate",
      packReady: context.manualDispatchGateScore >= 60,
      readinessScore: clampScore(context.manualDispatchGateScore),
      reviewerCheck: "Confirm write path remains zero-write and design-only.",
      includedSections: ["write path gate", "write no-go", "work boundary"],
      blockedSections: ["dispatch draft write", "task creation", "intervention creation"],
    },
    {
      id: "MDWP_PACK_002",
      label: "Task and intervention approval packet",
      lane: "task_write_approval",
      packReady: context.taskApprovalScore >= 60 && context.interventionApprovalScore >= 60,
      readinessScore: clampScore((context.taskApprovalScore + context.interventionApprovalScore) / 2),
      reviewerCheck: "Confirm task and intervention write approvals remain locked.",
      includedSections: ["task approval", "intervention approval", "safety boundaries"],
      blockedSections: ["product prescription", "dosage guidance", "write approval performed"],
    },
    {
      id: "MDWP_PACK_003",
      label: "Rollback write packet",
      lane: "rollback-write-plan",
      packReady: context.incidentHandlingScore >= 60,
      readinessScore: clampScore(context.incidentHandlingScore),
      reviewerCheck: "Confirm rollback plan remains dry-run only.",
      includedSections: ["write rollback", "task rollback", "intervention rollback"],
      blockedSections: ["automatic rollback", "runtime write", "notification"],
    },
  ];
}

function buildFindings(
  context: Required<ManualDispatchWritePathInput>,
  sourceNodes: ManualDispatchWriteSourceNode[],
  gates: WriteGateCheckItem[],
  goNoGo: WriteNoGoItem[],
): WritePathFindingItem[] {
  const findings: WritePathFindingItem[] = [];

  if (context.openWritePathGapCount > 0) {
    findings.push({
      id: "MDWP_FINDING_001",
      label: "Open write path gaps",
      lane: "human-signoff",
      severity: context.openWritePathGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openWritePathGapCount} write path gaps remain before any later activation.`,
      manualResolution: "Resolve task approval, intervention approval, work boundary and rollback gaps in a later gated release.",
      blocksWritePathActivation: true,
    });
  }

  if (context.taskApprovalScore < 70) {
    findings.push({
      id: "MDWP_FINDING_002",
      label: "Task write approval below threshold",
      lane: "task_write_approval",
      severity: "critical",
      reason: "Task write approval is not mature enough for write path activation.",
      manualResolution: "Complete task approval, draft lock and notification lock review.",
      blocksWritePathActivation: true,
    });
  }

  if (context.interventionApprovalScore < 70) {
    findings.push({
      id: "MDWP_FINDING_003",
      label: "Intervention write approval below threshold",
      lane: "intervention-write-approval",
      severity: "critical",
      reason: "Intervention write approval is not mature enough for write path activation.",
      manualResolution: "Complete intervention approval, product boundary and dosage boundary review.",
      blocksWritePathActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `MDWP_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksWritePathActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `MDWP_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Write gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksWritePathActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `MDWP_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksWritePathActivation: true,
      });
    });

  return findings;
}

export function buildAiManualDispatchWritePathGateReport(
  input: ManualDispatchWritePathInput = {},
): ManualDispatchWritePathReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const dispatchWritePathGate = buildDispatchWritePathGate(context);
  const taskWriteApprovalLock = buildTaskWriteApprovalLock(context);
  const interventionWriteApprovalLock = buildInterventionWriteApprovalLock(context);
  const workOrderBoundary = buildWorkOrderBoundary();
  const operatorWriteAttestation = buildOperatorWriteAttestation(context);
  const rollbackWritePlan = buildRollbackWritePlan(context);
  const writeNoGoBoard = buildWriteNoGoBoard();
  const writeGateChecks = buildWriteGateChecks(context, sourceNodes);
  const writeBoardPack = buildBoardPack(context);
  const writeFindings = buildFindings(context, sourceNodes, writeGateChecks, writeNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    dispatchWritePathGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, dispatchWritePathGate.length);

  const taskAverage =
    taskWriteApprovalLock.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, taskWriteApprovalLock.length);

  const gateAverage =
    writeGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, writeGateChecks.length);

  const findingPenalty = writeFindings.filter((item) => item.blocksWritePathActivation).length * 7;
  const rollbackPressure =
    rollbackWritePlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, rollbackWritePlan.length * 4);

  const writePathScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      taskAverage / 4 +
      gateAverage / 4 +
      rollbackPressure -
      findingPenalty -
      context.openWritePathGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openWritePathGapCount * 8 +
        context.taskApprovalItemCount * 6 +
        context.interventionApprovalItemCount * 6 +
        context.workBoundaryItemCount * 5 +
        context.operatorAttestationItemCount * 5,
    ),
  );

  const writePathStatus = bandFromScore(
    writePathScore,
    writeFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: MANUAL_DISPATCH_WRITE_PATH_GUARDRAIL,
    writePathScore,
    writePathStatus,
    overallSeverity,
    sourceNodes,
    dispatchWritePathGate,
    taskWriteApprovalLock,
    interventionWriteApprovalLock,
    workOrderBoundary,
    operatorWriteAttestation,
    rollbackWritePlan,
    writeNoGoBoard,
    writeGateChecks,
    writeBoardPack,
    writeFindings,
    stagedRoadmap: {
      v171: "Manual dispatch write path gate in zero-write dry-run.",
      v172: "Provider canary call execution only after explicit provider approval.",
      v173: "Incident handling write path only after explicit incident governance approval.",
      v174: "Public export package write only after explicit legal and privacy approval.",
      v175: "Task and intervention creation only after explicit operational write approval.",
    },
    redactedExportBundle: {
      exportId: "manual_dispatch_write_path_gate_v17_1_redacted_dry_run",
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
        "dispatch write path gate",
        "task write approval lock",
        "intervention write approval lock",
        "work order boundary",
        "operator write attestation",
        "rollback write plan",
        "write no-go board",
        "write gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Manual dispatch write path gate is local dry-run only.",
      "No dispatch draft write, dispatch ticket write, task creation, intervention creation, work order persistence, notification, provider call, storage activation or execution is performed.",
      "Task and intervention write approvals remain locked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V17.1 prepares manual dispatch write path governance only.",
    ],
  };
}

export const aiManualDispatchWritePathGateVersion = "V17.1";
