export type ManualDispatchActivationMode = "dry-run" | "dispatch-board-review";

export type ManualDispatchSeverity = "info" | "watch" | "elevated" | "critical";

export type ManualDispatchPriority = "low" | "medium" | "high" | "urgent";

export type ManualDispatchReadinessBand =
  | "blocked"
  | "dispatch-gate-design-ready"
  | "manual-board-review-ready"
  | "dispatch-plan-ready";

export type ManualDispatchLane =
  | "dispatch-activation-gate"
  | "operator-approval"
  | "agronomic-safety"
  | "work-conversion-boundary"
  | "reviewer-signoff"
  | "dispatch-no-go"
  | "rollback-dispatch"
  | "human-signoff";

export interface ManualDispatchActivationGuardrail {
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
  complianceExportActivationAllowed: false;
  complianceExportActivationPerformed: false;
  manualDispatchActivationAllowed: false;
  manualDispatchActivationPerformed: false;
  operationalApprovalAllowed: false;
  operationalApprovalPerformed: false;
  dispatchTicketWriteAllowed: false;
  dispatchTicketWritePerformed: false;
  workOrderDispatchAllowed: false;
  workOrderDispatchPerformed: false;
  dispatchNotificationAllowed: false;
  dispatchNotificationPerformed: false;
  manualDispatchActivationGateReady: true;
  operationalApprovalLockReady: true;
  dispatchNoGoReady: true;
  workConversionBoundaryReady: true;
}

export interface ManualDispatchActivationInput {
  dispatchGateItemCount?: number;
  operatorApprovalItemCount?: number;
  agronomicSafetyItemCount?: number;
  conversionBoundaryItemCount?: number;
  reviewerSignoffItemCount?: number;
  rollbackDispatchItemCount?: number;
  openDispatchGapCount?: number;
  onlineReadinessScore?: number;
  operationsCockpitScore?: number;
  complianceExportScore?: number;
  incidentBoardScore?: number;
  operatorApprovalScore?: number;
  safetyChecklistScore?: number;
  conversionBoundaryScore?: number;
  dispatchLeadRole?: string;
}

export interface ManualDispatchSourceNode {
  id: string;
  lane: ManualDispatchLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ManualDispatchSeverity;
  priority: ManualDispatchPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface DispatchActivationGateItem {
  id: string;
  label: string;
  lane: ManualDispatchLane;
  gateScore: number;
  severity: ManualDispatchSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface OperatorApprovalItem {
  id: string;
  label: string;
  lane: ManualDispatchLane;
  approvalScore: number;
  priority: ManualDispatchPriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface AgronomicSafetyChecklistItem {
  id: string;
  label: string;
  lane: ManualDispatchLane;
  safetyScore: number;
  severity: ManualDispatchSeverity;
  safetyQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface WorkConversionBoundaryItem {
  id: string;
  label: string;
  lane: ManualDispatchLane;
  boundaryScore: number;
  severity: ManualDispatchSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface ReviewerSignoffItem {
  id: string;
  label: string;
  lane: ManualDispatchLane;
  signoffScore: number;
  priority: ManualDispatchPriority;
  signoffQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface RollbackDispatchPlanItem {
  id: string;
  label: string;
  lane: ManualDispatchLane;
  rollbackScore: number;
  priority: ManualDispatchPriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface DispatchNoGoItem {
  id: string;
  label: string;
  lane: ManualDispatchLane;
  goNoGoState: "no-go" | "design-only" | "dispatch-plan-ready";
  score: number;
  severity: ManualDispatchSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface DispatchGateCheckItem {
  id: string;
  label: string;
  lane: ManualDispatchLane;
  passed: boolean;
  score: number;
  severity: ManualDispatchSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface DispatchBoardPackItem {
  id: string;
  label: string;
  lane: ManualDispatchLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface DispatchFindingItem {
  id: string;
  label: string;
  lane: ManualDispatchLane;
  severity: ManualDispatchSeverity;
  reason: string;
  manualResolution: string;
  blocksDispatchActivation: boolean;
}

export interface ManualDispatchActivationReport {
  generatedAt: string;
  mode: ManualDispatchActivationMode;
  context: Required<ManualDispatchActivationInput>;
  readiness: ManualDispatchActivationGuardrail;
  dispatchGateScore: number;
  dispatchGateStatus: ManualDispatchReadinessBand;
  overallSeverity: ManualDispatchSeverity;
  sourceNodes: ManualDispatchSourceNode[];
  dispatchActivationGate: DispatchActivationGateItem[];
  operatorApprovalBoard: OperatorApprovalItem[];
  agronomicSafetyChecklist: AgronomicSafetyChecklistItem[];
  workConversionBoundary: WorkConversionBoundaryItem[];
  reviewerSignoffBoard: ReviewerSignoffItem[];
  rollbackDispatchPlan: RollbackDispatchPlanItem[];
  dispatchNoGoBoard: DispatchNoGoItem[];
  dispatchGateChecks: DispatchGateCheckItem[];
  dispatchBoardPack: DispatchBoardPackItem[];
  dispatchFindings: DispatchFindingItem[];
  stagedRoadmap: {
    v167: string;
    v168: string;
    v169: string;
    v170: string;
    v171: string;
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

export const MANUAL_DISPATCH_ACTIVATION_GUARDRAIL: ManualDispatchActivationGuardrail = {
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
  complianceExportActivationAllowed: false,
  complianceExportActivationPerformed: false,
  manualDispatchActivationAllowed: false,
  manualDispatchActivationPerformed: false,
  operationalApprovalAllowed: false,
  operationalApprovalPerformed: false,
  dispatchTicketWriteAllowed: false,
  dispatchTicketWritePerformed: false,
  workOrderDispatchAllowed: false,
  workOrderDispatchPerformed: false,
  dispatchNotificationAllowed: false,
  dispatchNotificationPerformed: false,
  manualDispatchActivationGateReady: true,
  operationalApprovalLockReady: true,
  dispatchNoGoReady: true,
  workConversionBoundaryReady: true,
};

const priorityWeight: Record<ManualDispatchPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ManualDispatchActivationInput): Required<ManualDispatchActivationInput> {
  return {
    dispatchGateItemCount: input.dispatchGateItemCount ?? 8,
    operatorApprovalItemCount: input.operatorApprovalItemCount ?? 8,
    agronomicSafetyItemCount: input.agronomicSafetyItemCount ?? 7,
    conversionBoundaryItemCount: input.conversionBoundaryItemCount ?? 7,
    reviewerSignoffItemCount: input.reviewerSignoffItemCount ?? 7,
    rollbackDispatchItemCount: input.rollbackDispatchItemCount ?? 7,
    openDispatchGapCount: input.openDispatchGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    operationsCockpitScore: input.operationsCockpitScore ?? 70,
    complianceExportScore: input.complianceExportScore ?? 70,
    incidentBoardScore: input.incidentBoardScore ?? 70,
    operatorApprovalScore: input.operatorApprovalScore ?? 66,
    safetyChecklistScore: input.safetyChecklistScore ?? 66,
    conversionBoundaryScore: input.conversionBoundaryScore ?? 68,
    dispatchLeadRole: input.dispatchLeadRole ?? "manual dispatch activation reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ManualDispatchSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ManualDispatchSeverity): ManualDispatchPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ManualDispatchReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "dispatch-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "dispatch-gate-design-ready";
}

function buildSourceNode(
  id: string,
  lane: ManualDispatchLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ManualDispatchSourceNode {
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
            "Manual dispatch activation gate remains below activation threshold.",
            "Dispatch board must resolve operator approval, agronomic safety, conversion boundary and rollback gaps before any later dispatch activation.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ManualDispatchActivationInput>): ManualDispatchSourceNode[] {
  const dispatchPressure = context.dispatchGateItemCount;
  const approvalPressure = context.operatorApprovalItemCount * 2;
  const safetyPressure = context.agronomicSafetyItemCount * 2;
  const boundaryPressure = context.conversionBoundaryItemCount;
  const signoffPressure = context.reviewerSignoffItemCount;
  const gapPressure = context.openDispatchGapCount * 2;

  return [
    buildSourceNode(
      "MDAG_NODE_001",
      "dispatch-activation-gate",
      "Human-supervised operations cockpit",
      "V16.3",
      context.operationsCockpitScore,
      context.operatorApprovalScore,
      dispatchPressure,
      "Connect operations cockpit to dispatch activation gate design.",
    ),
    buildSourceNode(
      "MDAG_NODE_002",
      "operator-approval",
      "Operator approval board",
      "V16.7",
      context.operatorApprovalScore,
      context.operationsCockpitScore,
      approvalPressure,
      "Prepare operator approval without creating dispatch tickets.",
    ),
    buildSourceNode(
      "MDAG_NODE_003",
      "agronomic-safety",
      "Agronomic safety checklist",
      "V16.7",
      context.safetyChecklistScore,
      context.conversionBoundaryScore,
      safetyPressure,
      "Keep safety review mandatory before any later dispatch activation.",
    ),
    buildSourceNode(
      "MDAG_NODE_004",
      "work-conversion-boundary",
      "Work conversion boundary",
      "V16.3",
      context.conversionBoundaryScore,
      context.operationsCockpitScore,
      boundaryPressure,
      "Keep task and intervention creation blocked.",
    ),
    buildSourceNode(
      "MDAG_NODE_005",
      "reviewer-signoff",
      "Compliance export activation gate",
      "V16.6",
      context.complianceExportScore,
      context.operatorApprovalScore,
      signoffPressure,
      "Use reviewer signoff design without approval persistence.",
    ),
    buildSourceNode(
      "MDAG_NODE_006",
      "rollback-dispatch",
      "Runtime incident response board",
      "V16.5",
      context.incidentBoardScore,
      context.conversionBoundaryScore,
      context.rollbackDispatchItemCount,
      "Prepare rollback dispatch plan without runtime action.",
    ),
    buildSourceNode(
      "MDAG_NODE_007",
      "dispatch-no-go",
      "Dispatch no-go lock",
      "V16.7",
      100,
      context.onlineReadinessScore,
      gapPressure,
      "Keep all dispatch, task, intervention and execution routes blocked.",
    ),
    buildSourceNode(
      "MDAG_NODE_008",
      "human-signoff",
      "Manual dispatch human signoff",
      "V16.7",
      context.operatorApprovalScore,
      context.safetyChecklistScore,
      gapPressure,
      "Keep dispatch activation blocked until a separate explicit operational approval release.",
    ),
  ];
}

function buildDispatchActivationGate(context: Required<ManualDispatchActivationInput>): DispatchActivationGateItem[] {
  return [
    {
      id: "MDAG_GATEPLAN_001",
      label: "Manual dispatch activation lock",
      lane: "dispatch-activation-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep dispatch activation disabled in V16.7.",
      requiredEvidence: ["manualDispatchActivationAllowed=false", "dispatchTicketWriteAllowed=false", "workOrderDispatchAllowed=false"],
      blockedOutcome: "No dispatch activation.",
    },
    {
      id: "MDAG_GATEPLAN_002",
      label: "Manual dispatch readiness plan",
      lane: "dispatch-activation-gate",
      gateScore: clampScore(context.operationsCockpitScore),
      severity: severityFromConcern(100 - context.operationsCockpitScore + context.dispatchGateItemCount * 4),
      gatePurpose: "Prepare dispatch readiness without creating work.",
      requiredEvidence: ["operator approval board", "agronomic safety checklist", "conversion boundary"],
      blockedOutcome: "No dispatch ticket write.",
    },
    {
      id: "MDAG_GATEPLAN_003",
      label: "Operational approval lock",
      lane: "dispatch-activation-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require explicit operational approval in a separate later release.",
      requiredEvidence: ["operationalApprovalAllowed=false", "operationalApprovalPerformed=false"],
      blockedOutcome: "No operational approval.",
    },
  ];
}

function buildOperatorApprovalBoard(context: Required<ManualDispatchActivationInput>): OperatorApprovalItem[] {
  return [
    {
      id: "MDAG_APPROVAL_001",
      label: "Operator approval design",
      lane: "operator-approval",
      approvalScore: clampScore(context.operatorApprovalScore),
      priority: context.operatorApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can operator approval be reviewed without activating dispatch?",
      requiredEvidence: ["operator role", "manual approval note", "dispatch no-go state"],
      blockedOutcome: "No approval persistence.",
    },
    {
      id: "MDAG_APPROVAL_002",
      label: "Operational manager approval design",
      lane: "operator-approval",
      approvalScore: clampScore(context.operatorApprovalScore - context.operatorApprovalItemCount),
      priority: "urgent",
      approvalQuestion: "Can later dispatch require manager approval?",
      requiredEvidence: ["manager role", "safety caveat", "rollback plan"],
      blockedOutcome: "No operational approval.",
    },
    {
      id: "MDAG_APPROVAL_003",
      label: "Fallback approval hold",
      lane: "operator-approval",
      approvalScore: clampScore(context.incidentBoardScore),
      priority: "high",
      approvalQuestion: "Can unclear dispatch cases be held for incident or safety review?",
      requiredEvidence: ["hold state", "fallback route", "reviewer reason"],
      blockedOutcome: "No dispatch escalation action.",
    },
  ];
}

function buildAgronomicSafetyChecklist(context: Required<ManualDispatchActivationInput>): AgronomicSafetyChecklistItem[] {
  return [
    {
      id: "MDAG_SAFETY_001",
      label: "Product safety boundary",
      lane: "agronomic-safety",
      safetyScore: 100,
      severity: "critical",
      safetyQuestion: "Can product recommendation remain blocked?",
      requiredChecks: ["productPrescriptionAllowed=false", "productPrescriptionPerformed=false"],
      manualResolution: "Block any product recommendation wording.",
    },
    {
      id: "MDAG_SAFETY_002",
      label: "Dosage safety boundary",
      lane: "agronomic-safety",
      safetyScore: 100,
      severity: "critical",
      safetyQuestion: "Can dosage guidance remain blocked?",
      requiredChecks: ["dosageAdviceAllowed=false", "dosageAdvicePerformed=false"],
      manualResolution: "Block any dosage instruction wording.",
    },
    {
      id: "MDAG_SAFETY_003",
      label: "Agronomic evidence sufficiency",
      lane: "agronomic-safety",
      safetyScore: clampScore(context.safetyChecklistScore),
      severity: severityFromConcern(100 - context.safetyChecklistScore + context.agronomicSafetyItemCount * 4),
      safetyQuestion: "Can evidence sufficiency be reviewed before dispatch activation?",
      requiredChecks: ["evidence bundle", "human review", "uncertainty note"],
      manualResolution: "Hold for reviewer if evidence is incomplete.",
    },
  ];
}

function buildWorkConversionBoundary(): WorkConversionBoundaryItem[] {
  return [
    {
      id: "MDAG_BOUNDARY_001",
      label: "Task creation boundary",
      lane: "work-conversion-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "AI cannot create tasks.",
      blockedOutcome: "taskCreated=false",
    },
    {
      id: "MDAG_BOUNDARY_002",
      label: "Intervention creation boundary",
      lane: "work-conversion-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "AI cannot create interventions.",
      blockedOutcome: "interventionCreated=false",
    },
    {
      id: "MDAG_BOUNDARY_003",
      label: "Work order dispatch boundary",
      lane: "work-conversion-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "AI cannot dispatch work orders.",
      blockedOutcome: "workOrderDispatchAllowed=false",
    },
  ];
}

function buildReviewerSignoffBoard(context: Required<ManualDispatchActivationInput>): ReviewerSignoffItem[] {
  return [
    {
      id: "MDAG_SIGNOFF_001",
      label: "Reviewer signoff design",
      lane: "reviewer-signoff",
      signoffScore: clampScore(context.operatorApprovalScore),
      priority: "high",
      signoffQuestion: "Can reviewer signoff be represented without persistence?",
      requiredEvidence: ["reviewer role", "signoff note", "dispatch no-go"],
      blockedOutcome: "No signoff persistence.",
    },
    {
      id: "MDAG_SIGNOFF_002",
      label: "Safety signoff design",
      lane: "reviewer-signoff",
      signoffScore: 100,
      priority: "urgent",
      signoffQuestion: "Can safety locks be confirmed before later dispatch?",
      requiredEvidence: ["product locked", "dosage locked", "execution locked"],
      blockedOutcome: "No safety approval activation.",
    },
    {
      id: "MDAG_SIGNOFF_003",
      label: "Evidence signoff design",
      lane: "reviewer-signoff",
      signoffScore: clampScore(context.complianceExportScore),
      priority: "high",
      signoffQuestion: "Can audit evidence support future dispatch review?",
      requiredEvidence: ["audit package", "redaction state", "manual caveat"],
      blockedOutcome: "No audit write.",
    },
  ];
}

function buildRollbackDispatchPlan(context: Required<ManualDispatchActivationInput>): RollbackDispatchPlanItem[] {
  return [
    {
      id: "MDAG_ROLLBACK_001",
      label: "Dispatch rollback plan",
      lane: "rollback-dispatch",
      rollbackScore: clampScore(context.incidentBoardScore),
      priority: context.incidentBoardScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future dispatch activation return to no-dispatch state?",
      safeFallback: "Return to local dry-run and dispatch no-go board.",
    },
    {
      id: "MDAG_ROLLBACK_002",
      label: "Work conversion rollback plan",
      lane: "rollback-dispatch",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can task and intervention routes remain blocked?",
      safeFallback: "No work conversion exists in V16.7.",
    },
    {
      id: "MDAG_ROLLBACK_003",
      label: "Operator communication rollback plan",
      lane: "rollback-dispatch",
      rollbackScore: clampScore(context.operatorApprovalScore),
      priority: "high",
      rollbackQuestion: "Can future operator communication be stopped?",
      safeFallback: "No dispatch notification is sent in V16.7.",
    },
  ];
}

function buildDispatchNoGoBoard(): DispatchNoGoItem[] {
  return [
    {
      id: "MDAG_GONOGO_001",
      label: "Manual dispatch activation plan",
      lane: "human-signoff",
      goNoGoState: "dispatch-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["operator approval", "safety checklist", "conversion boundary"],
      safeOutcome: "Dispatch activation plan only.",
    },
    {
      id: "MDAG_GONOGO_002",
      label: "Actual manual dispatch activation",
      lane: "dispatch-no-go",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate dispatch activation release", "operational approval", "work conversion proof"],
      safeOutcome: "Manual dispatch activation remains blocked.",
    },
    {
      id: "MDAG_GONOGO_003",
      label: "Automatic dispatch or execution",
      lane: "dispatch-no-go",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate automation release", "manual dispatch policy", "human approval"],
      safeOutcome: "Automation remains blocked.",
    },
  ];
}

function buildDispatchGateChecks(
  context: Required<ManualDispatchActivationInput>,
  sourceNodes: ManualDispatchSourceNode[],
): DispatchGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "MDAG_CHECK_001",
      label: "Dispatch gate remains no-write",
      lane: "dispatch-activation-gate" as ManualDispatchLane,
      score: 100,
      reviewer: "manual dispatch activation reviewer",
      requiredEvidence: ["manualDispatchActivationAllowed=false", "dispatchTicketWriteAllowed=false", "taskCreated=false"],
      hardStop: "Do not activate dispatch in V16.7.",
    },
    {
      id: "MDAG_CHECK_002",
      label: "Operator approval is complete enough",
      lane: "operator-approval" as ManualDispatchLane,
      score: context.operatorApprovalScore - context.operatorApprovalItemCount * 3,
      reviewer: context.dispatchLeadRole,
      requiredEvidence: ["operator approval", "manager approval", "fallback approval hold"],
      hardStop: "Do not proceed without operator approval board.",
    },
    {
      id: "MDAG_CHECK_003",
      label: "Agronomic safety checklist is complete enough",
      lane: "agronomic-safety" as ManualDispatchLane,
      score: context.safetyChecklistScore - context.agronomicSafetyItemCount * 3,
      reviewer: "agronomic safety reviewer",
      requiredEvidence: ["product boundary", "dosage boundary", "evidence sufficiency"],
      hardStop: "Do not proceed without agronomic safety checklist.",
    },
    {
      id: "MDAG_CHECK_004",
      label: "Work conversion boundary is complete enough",
      lane: "work-conversion-boundary" as ManualDispatchLane,
      score: context.conversionBoundaryScore - context.conversionBoundaryItemCount * 3,
      reviewer: "work conversion boundary reviewer",
      requiredEvidence: ["task boundary", "intervention boundary", "dispatch boundary"],
      hardStop: "Do not proceed without work conversion boundary.",
    },
    {
      id: "MDAG_CHECK_005",
      label: "Reviewer signoff is complete enough",
      lane: "reviewer-signoff" as ManualDispatchLane,
      score: context.operatorApprovalScore - context.reviewerSignoffItemCount * 3,
      reviewer: "reviewer signoff board",
      requiredEvidence: ["reviewer signoff", "safety signoff", "evidence signoff"],
      hardStop: "Do not proceed without reviewer signoff board.",
    },
    {
      id: "MDAG_CHECK_006",
      label: "Source blockers are within dispatch tolerance",
      lane: "human-signoff" as ManualDispatchLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before dispatch-plan-ready state.",
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

function buildBoardPack(context: Required<ManualDispatchActivationInput>): DispatchBoardPackItem[] {
  return [
    {
      id: "MDAG_PACK_001",
      label: "Dispatch activation packet",
      lane: "dispatch-activation-gate",
      packReady: context.operationsCockpitScore >= 60,
      readinessScore: clampScore(context.operationsCockpitScore),
      reviewerCheck: "Confirm dispatch activation remains design-only and no-write.",
      includedSections: ["dispatch gate", "operator approval", "dispatch no-go"],
      blockedSections: ["dispatch ticket write", "task creation", "intervention creation"],
    },
    {
      id: "MDAG_PACK_002",
      label: "Safety and conversion packet",
      lane: "agronomic-safety",
      packReady: context.safetyChecklistScore >= 60 && context.conversionBoundaryScore >= 60,
      readinessScore: clampScore((context.safetyChecklistScore + context.conversionBoundaryScore) / 2),
      reviewerCheck: "Confirm safety and conversion boundaries remain locked.",
      includedSections: ["safety checklist", "work conversion boundary", "reviewer signoff"],
      blockedSections: ["product prescription", "dosage guidance", "work dispatch"],
    },
    {
      id: "MDAG_PACK_003",
      label: "Rollback dispatch packet",
      lane: "rollback-dispatch",
      packReady: context.incidentBoardScore >= 60,
      readinessScore: clampScore(context.incidentBoardScore),
      reviewerCheck: "Confirm rollback plan remains no-runtime.",
      includedSections: ["dispatch rollback", "conversion rollback", "communication rollback"],
      blockedSections: ["dispatch notification", "automatic rollback"],
    },
  ];
}

function buildFindings(
  context: Required<ManualDispatchActivationInput>,
  sourceNodes: ManualDispatchSourceNode[],
  gates: DispatchGateCheckItem[],
  goNoGo: DispatchNoGoItem[],
): DispatchFindingItem[] {
  const findings: DispatchFindingItem[] = [];

  if (context.openDispatchGapCount > 0) {
    findings.push({
      id: "MDAG_FINDING_001",
      label: "Open dispatch activation gaps",
      lane: "human-signoff",
      severity: context.openDispatchGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openDispatchGapCount} dispatch activation gaps remain before any later activation.`,
      manualResolution: "Resolve operator approval, safety, conversion and rollback gaps in a later gated release.",
      blocksDispatchActivation: true,
    });
  }

  if (context.operatorApprovalScore < 70) {
    findings.push({
      id: "MDAG_FINDING_002",
      label: "Operator approval below threshold",
      lane: "operator-approval",
      severity: "critical",
      reason: "Operator approval board is not mature enough for dispatch activation.",
      manualResolution: "Complete operator, manager and fallback approval controls.",
      blocksDispatchActivation: true,
    });
  }

  if (context.safetyChecklistScore < 70) {
    findings.push({
      id: "MDAG_FINDING_003",
      label: "Agronomic safety below threshold",
      lane: "agronomic-safety",
      severity: "critical",
      reason: "Agronomic safety checklist is not mature enough for dispatch activation.",
      manualResolution: "Complete product, dosage and evidence sufficiency boundaries.",
      blocksDispatchActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `MDAG_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksDispatchActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `MDAG_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Dispatch gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksDispatchActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `MDAG_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksDispatchActivation: true,
      });
    });

  return findings;
}

export function buildAiManualDispatchActivationGateReport(
  input: ManualDispatchActivationInput = {},
): ManualDispatchActivationReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const dispatchActivationGate = buildDispatchActivationGate(context);
  const operatorApprovalBoard = buildOperatorApprovalBoard(context);
  const agronomicSafetyChecklist = buildAgronomicSafetyChecklist(context);
  const workConversionBoundary = buildWorkConversionBoundary();
  const reviewerSignoffBoard = buildReviewerSignoffBoard(context);
  const rollbackDispatchPlan = buildRollbackDispatchPlan(context);
  const dispatchNoGoBoard = buildDispatchNoGoBoard();
  const dispatchGateChecks = buildDispatchGateChecks(context, sourceNodes);
  const dispatchBoardPack = buildBoardPack(context);
  const dispatchFindings = buildFindings(context, sourceNodes, dispatchGateChecks, dispatchNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    dispatchActivationGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, dispatchActivationGate.length);

  const approvalAverage =
    operatorApprovalBoard.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, operatorApprovalBoard.length);

  const gateAverage =
    dispatchGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, dispatchGateChecks.length);

  const findingPenalty = dispatchFindings.filter((item) => item.blocksDispatchActivation).length * 7;
  const rollbackPressure =
    rollbackDispatchPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, rollbackDispatchPlan.length * 4);

  const dispatchGateScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      approvalAverage / 4 +
      gateAverage / 4 +
      rollbackPressure -
      findingPenalty -
      context.openDispatchGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openDispatchGapCount * 8 +
        context.operatorApprovalItemCount * 6 +
        context.agronomicSafetyItemCount * 6 +
        context.conversionBoundaryItemCount * 5 +
        context.reviewerSignoffItemCount * 5,
    ),
  );

  const dispatchGateStatus = bandFromScore(
    dispatchGateScore,
    dispatchFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: MANUAL_DISPATCH_ACTIVATION_GUARDRAIL,
    dispatchGateScore,
    dispatchGateStatus,
    overallSeverity,
    sourceNodes,
    dispatchActivationGate,
    operatorApprovalBoard,
    agronomicSafetyChecklist,
    workConversionBoundary,
    reviewerSignoffBoard,
    rollbackDispatchPlan,
    dispatchNoGoBoard,
    dispatchGateChecks,
    dispatchBoardPack,
    dispatchFindings,
    stagedRoadmap: {
      v167: "Manual dispatch activation gate in zero-activation dry-run.",
      v168: "Provider runtime canary execution only after explicit approval.",
      v169: "Runtime incident handling only after explicit activation approval.",
      v170: "Public compliance export only after explicit legal and privacy approval.",
      v171: "Manual dispatch write path only after explicit operational approval.",
    },
    redactedExportBundle: {
      exportId: "manual_dispatch_activation_gate_v16_7_redacted_dry_run",
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
        "dispatch activation gate",
        "operator approval board",
        "agronomic safety checklist",
        "work conversion boundary",
        "reviewer signoff board",
        "rollback dispatch plan",
        "dispatch no-go board",
        "dispatch gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Manual dispatch activation gate is local dry-run only.",
      "No manual dispatch activation, dispatch ticket write, work order dispatch, notification, task creation, intervention creation or execution is performed.",
      "Operator approval and operational approval remain blocked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V16.7 prepares manual dispatch activation governance only.",
    ],
  };
}

export const aiManualDispatchActivationGateVersion = "V16.7";
