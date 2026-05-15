export type IncidentHandlingWritePathMode = "dry-run" | "incident-governance-board-review";

export type IncidentWriteSeverity = "info" | "watch" | "elevated" | "critical";

export type IncidentWritePriority = "low" | "medium" | "high" | "urgent";

export type IncidentWriteReadinessBand =
  | "blocked"
  | "incident-write-design-ready"
  | "manual-board-review-ready"
  | "zero-write-plan-ready";

export type IncidentWriteLane =
  | "incident_write_path_gate"
  | "incident_governance_approval"
  | "incident_record_boundary"
  | "escalation_write_boundary"
  | "closure_write_boundary"
  | "notification_boundary"
  | "rollback_incident_write"
  | "human_signoff";

export interface IncidentHandlingWritePathGuardrail {
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
  incidentHandlingWritePathAllowed: false;
  incidentHandlingWritePathPerformed: false;
  incidentGovernanceApprovalAllowed: false;
  incidentGovernanceApprovalPerformed: false;
  incidentRecordWriteAllowed: false;
  incidentRecordWritePerformed: false;
  incidentEscalationWriteAllowed: false;
  incidentEscalationWritePerformed: false;
  incidentClosureWriteAllowed: false;
  incidentClosureWritePerformed: false;
  incidentTimelineWriteAllowed: false;
  incidentTimelineWritePerformed: false;
  incidentWriteAuditAllowed: false;
  incidentWriteAuditPerformed: false;
  incidentNotificationAllowed: false;
  incidentNotificationPerformed: false;
  incidentHandlingWritePathGateReady: true;
  incidentGovernanceApprovalLockReady: true;
  incidentRecordBoundaryReady: true;
  incidentWriteNoGoReady: true;
}

export interface IncidentHandlingWritePathInput {
  writeGateItemCount?: number;
  governanceApprovalItemCount?: number;
  recordBoundaryItemCount?: number;
  escalationBoundaryItemCount?: number;
  closureBoundaryItemCount?: number;
  notificationBoundaryItemCount?: number;
  openIncidentWriteGapCount?: number;
  onlineReadinessScore?: number;
  incidentHandlingGateScore?: number;
  providerCallGateScore?: number;
  manualWritePathScore?: number;
  governanceApprovalScore?: number;
  recordBoundaryScore?: number;
  closureReadinessScore?: number;
  incidentWriteLeadRole?: string;
}

export interface IncidentWriteSourceNode {
  id: string;
  lane: IncidentWriteLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: IncidentWriteSeverity;
  priority: IncidentWritePriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface IncidentWritePathGateItem {
  id: string;
  label: string;
  lane: IncidentWriteLane;
  gateScore: number;
  severity: IncidentWriteSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface IncidentGovernanceApprovalItem {
  id: string;
  label: string;
  lane: IncidentWriteLane;
  approvalScore: number;
  priority: IncidentWritePriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface IncidentRecordBoundaryItem {
  id: string;
  label: string;
  lane: IncidentWriteLane;
  boundaryScore: number;
  severity: IncidentWriteSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface IncidentEscalationBoundaryItem {
  id: string;
  label: string;
  lane: IncidentWriteLane;
  boundaryScore: number;
  priority: IncidentWritePriority;
  escalationQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface IncidentClosureBoundaryItem {
  id: string;
  label: string;
  lane: IncidentWriteLane;
  closureScore: number;
  severity: IncidentWriteSeverity;
  closureQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface IncidentNotificationBoundaryItem {
  id: string;
  label: string;
  lane: IncidentWriteLane;
  boundaryScore: number;
  severity: IncidentWriteSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface RollbackIncidentWritePlanItem {
  id: string;
  label: string;
  lane: IncidentWriteLane;
  rollbackScore: number;
  priority: IncidentWritePriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface IncidentWriteNoGoItem {
  id: string;
  label: string;
  lane: IncidentWriteLane;
  goNoGoState: "no-go" | "design-only" | "zero-write-plan-ready";
  score: number;
  severity: IncidentWriteSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface IncidentWriteGateCheckItem {
  id: string;
  label: string;
  lane: IncidentWriteLane;
  passed: boolean;
  score: number;
  severity: IncidentWriteSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface IncidentWriteBoardPackItem {
  id: string;
  label: string;
  lane: IncidentWriteLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface IncidentWriteFindingItem {
  id: string;
  label: string;
  lane: IncidentWriteLane;
  severity: IncidentWriteSeverity;
  reason: string;
  manualResolution: string;
  blocksIncidentWriteActivation: boolean;
}

export interface IncidentHandlingWritePathReport {
  generatedAt: string;
  mode: IncidentHandlingWritePathMode;
  context: Required<IncidentHandlingWritePathInput>;
  readiness: IncidentHandlingWritePathGuardrail;
  incidentWritePathScore: number;
  incidentWritePathStatus: IncidentWriteReadinessBand;
  overallSeverity: IncidentWriteSeverity;
  sourceNodes: IncidentWriteSourceNode[];
  incidentWritePathGate: IncidentWritePathGateItem[];
  incidentGovernanceApprovalLock: IncidentGovernanceApprovalItem[];
  incidentRecordBoundary: IncidentRecordBoundaryItem[];
  incidentEscalationBoundary: IncidentEscalationBoundaryItem[];
  incidentClosureBoundary: IncidentClosureBoundaryItem[];
  incidentNotificationBoundary: IncidentNotificationBoundaryItem[];
  rollbackIncidentWritePlan: RollbackIncidentWritePlanItem[];
  incidentWriteNoGoBoard: IncidentWriteNoGoItem[];
  incidentWriteGateChecks: IncidentWriteGateCheckItem[];
  incidentWriteBoardPack: IncidentWriteBoardPackItem[];
  incidentWriteFindings: IncidentWriteFindingItem[];
  stagedRoadmap: {
    v173: string;
    v174: string;
    v175: string;
    v176: string;
    v177: string;
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

export const INCIDENT_HANDLING_WRITE_PATH_GUARDRAIL: IncidentHandlingWritePathGuardrail = {
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
  incidentHandlingWritePathAllowed: false,
  incidentHandlingWritePathPerformed: false,
  incidentGovernanceApprovalAllowed: false,
  incidentGovernanceApprovalPerformed: false,
  incidentRecordWriteAllowed: false,
  incidentRecordWritePerformed: false,
  incidentEscalationWriteAllowed: false,
  incidentEscalationWritePerformed: false,
  incidentClosureWriteAllowed: false,
  incidentClosureWritePerformed: false,
  incidentTimelineWriteAllowed: false,
  incidentTimelineWritePerformed: false,
  incidentWriteAuditAllowed: false,
  incidentWriteAuditPerformed: false,
  incidentNotificationAllowed: false,
  incidentNotificationPerformed: false,
  incidentHandlingWritePathGateReady: true,
  incidentGovernanceApprovalLockReady: true,
  incidentRecordBoundaryReady: true,
  incidentWriteNoGoReady: true,
};

const priorityWeight: Record<IncidentWritePriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: IncidentHandlingWritePathInput): Required<IncidentHandlingWritePathInput> {
  return {
    writeGateItemCount: input.writeGateItemCount ?? 8,
    governanceApprovalItemCount: input.governanceApprovalItemCount ?? 8,
    recordBoundaryItemCount: input.recordBoundaryItemCount ?? 8,
    escalationBoundaryItemCount: input.escalationBoundaryItemCount ?? 7,
    closureBoundaryItemCount: input.closureBoundaryItemCount ?? 7,
    notificationBoundaryItemCount: input.notificationBoundaryItemCount ?? 7,
    openIncidentWriteGapCount: input.openIncidentWriteGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    incidentHandlingGateScore: input.incidentHandlingGateScore ?? 70,
    providerCallGateScore: input.providerCallGateScore ?? 70,
    manualWritePathScore: input.manualWritePathScore ?? 70,
    governanceApprovalScore: input.governanceApprovalScore ?? 66,
    recordBoundaryScore: input.recordBoundaryScore ?? 68,
    closureReadinessScore: input.closureReadinessScore ?? 66,
    incidentWriteLeadRole: input.incidentWriteLeadRole ?? "incident handling write path reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): IncidentWriteSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: IncidentWriteSeverity): IncidentWritePriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): IncidentWriteReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-write-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "incident-write-design-ready";
}

function buildSourceNode(
  id: string,
  lane: IncidentWriteLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): IncidentWriteSourceNode {
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
            "Incident handling write path gate remains below activation threshold.",
            "Incident governance board must resolve approval, record boundary, escalation, closure and rollback gaps before any later write release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<IncidentHandlingWritePathInput>): IncidentWriteSourceNode[] {
  const writePressure = context.writeGateItemCount;
  const approvalPressure = context.governanceApprovalItemCount * 2;
  const recordPressure = context.recordBoundaryItemCount;
  const escalationPressure = context.escalationBoundaryItemCount * 2;
  const closurePressure = context.closureBoundaryItemCount;
  const gapPressure = context.openIncidentWriteGapCount * 2;

  return [
    buildSourceNode(
      "IHWP_NODE_001",
      "incident_write_path_gate",
      "Runtime incident handling activation gate",
      "V16.9",
      context.incidentHandlingGateScore,
      context.governanceApprovalScore,
      writePressure,
      "Connect runtime incident handling design to future incident write path governance.",
    ),
    buildSourceNode(
      "IHWP_NODE_002",
      "incident_governance_approval",
      "Incident governance approval lock",
      "V17.3",
      context.governanceApprovalScore,
      context.incidentHandlingGateScore,
      approvalPressure,
      "Prepare incident governance approval without record writes.",
    ),
    buildSourceNode(
      "IHWP_NODE_003",
      "incident_record_boundary",
      "Incident record boundary",
      "V17.3",
      context.recordBoundaryScore,
      context.governanceApprovalScore,
      recordPressure,
      "Keep incident record, timeline and audit writes blocked.",
    ),
    buildSourceNode(
      "IHWP_NODE_004",
      "escalation_write_boundary",
      "Manual dispatch write path gate",
      "V17.1",
      context.manualWritePathScore,
      context.recordBoundaryScore,
      escalationPressure,
      "Ensure incident escalation cannot create work or dispatch records.",
    ),
    buildSourceNode(
      "IHWP_NODE_005",
      "closure_write_boundary",
      "Incident closure boundary",
      "V17.3",
      context.closureReadinessScore,
      context.governanceApprovalScore,
      closurePressure,
      "Prepare closure checks without closure writes.",
    ),
    buildSourceNode(
      "IHWP_NODE_006",
      "notification_boundary",
      "Provider canary call execution gate",
      "V17.2",
      context.providerCallGateScore,
      context.onlineReadinessScore,
      context.notificationBoundaryItemCount,
      "Keep provider calls and notifications blocked during incident write design.",
    ),
    buildSourceNode(
      "IHWP_NODE_007",
      "rollback_incident_write",
      "Incident write rollback design",
      "V17.3",
      context.incidentHandlingGateScore,
      context.closureReadinessScore,
      gapPressure,
      "Prepare rollback incident write plan without runtime action.",
    ),
    buildSourceNode(
      "IHWP_NODE_008",
      "human_signoff",
      "Incident write human signoff",
      "V17.3",
      context.governanceApprovalScore,
      context.closureReadinessScore,
      gapPressure,
      "Keep incident write activation blocked until a separate incident governance release.",
    ),
  ];
}

function buildIncidentWritePathGate(context: Required<IncidentHandlingWritePathInput>): IncidentWritePathGateItem[] {
  return [
    {
      id: "IHWP_GATE_001",
      label: "Incident handling write path lock",
      lane: "incident_write_path_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep incident handling write path disabled in V17.3.",
      requiredEvidence: ["incidentHandlingWritePathAllowed=false", "incidentRecordWriteAllowed=false", "incidentWriteAllowed=false"],
      blockedOutcome: "No incident write path activation.",
    },
    {
      id: "IHWP_GATE_002",
      label: "Zero-write incident plan",
      lane: "incident_write_path_gate",
      gateScore: clampScore(context.incidentHandlingGateScore),
      severity: severityFromConcern(100 - context.incidentHandlingGateScore + context.writeGateItemCount * 4),
      gatePurpose: "Prepare incident write flow without persisting incident records.",
      requiredEvidence: ["governance approval lock", "record boundary", "closure boundary", "notification boundary"],
      blockedOutcome: "No incident record write.",
    },
    {
      id: "IHWP_GATE_003",
      label: "Incident governance approval lock",
      lane: "incident_write_path_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require a separate future release before any incident write approval.",
      requiredEvidence: ["incidentGovernanceApprovalAllowed=false", "incidentWriteAuditAllowed=false"],
      blockedOutcome: "No incident governance approval.",
    },
  ];
}

function buildIncidentGovernanceApprovalLock(context: Required<IncidentHandlingWritePathInput>): IncidentGovernanceApprovalItem[] {
  return [
    {
      id: "IHWP_GOV_001",
      label: "Incident governance approval design",
      lane: "incident_governance_approval",
      approvalScore: clampScore(context.governanceApprovalScore),
      priority: context.governanceApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can incident governance approval be reviewed without writing records?",
      requiredEvidence: ["governance reviewer", "write hold", "board note"],
      blockedOutcome: "No governance approval is performed.",
    },
    {
      id: "IHWP_GOV_002",
      label: "Incident write audit approval design",
      lane: "incident_governance_approval",
      approvalScore: clampScore(context.recordBoundaryScore),
      priority: "urgent",
      approvalQuestion: "Can incident audit approval remain blocked?",
      requiredEvidence: ["incidentWriteAuditAllowed=false", "incidentWriteAuditPerformed=false"],
      blockedOutcome: "No incident audit write.",
    },
    {
      id: "IHWP_GOV_003",
      label: "Incident retention review design",
      lane: "incident_governance_approval",
      approvalScore: clampScore(context.closureReadinessScore),
      priority: "high",
      approvalQuestion: "Can incident retention be reviewed before any later write release?",
      requiredEvidence: ["record boundary", "closure boundary", "redacted output"],
      blockedOutcome: "No retention write.",
    },
  ];
}

function buildIncidentRecordBoundary(): IncidentRecordBoundaryItem[] {
  return [
    {
      id: "IHWP_RECORD_001",
      label: "Incident record write boundary",
      lane: "incident_record_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No incident record can be written.",
      blockedOutcome: "incidentRecordWriteAllowed=false",
    },
    {
      id: "IHWP_RECORD_002",
      label: "Incident timeline write boundary",
      lane: "incident_record_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No incident timeline can be written.",
      blockedOutcome: "incidentTimelineWriteAllowed=false",
    },
    {
      id: "IHWP_RECORD_003",
      label: "Incident audit write boundary",
      lane: "incident_record_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No incident audit entry can be written.",
      blockedOutcome: "incidentWriteAuditAllowed=false",
    },
  ];
}

function buildIncidentEscalationBoundary(context: Required<IncidentHandlingWritePathInput>): IncidentEscalationBoundaryItem[] {
  return [
    {
      id: "IHWP_ESCALATION_001",
      label: "Incident escalation write boundary",
      lane: "escalation_write_boundary",
      boundaryScore: 100,
      priority: "urgent",
      escalationQuestion: "Can incident escalation writes remain blocked?",
      requiredControls: ["incidentEscalationWriteAllowed=false", "incidentEscalationWritePerformed=false"],
      manualResolution: "Keep escalation write path locked.",
    },
    {
      id: "IHWP_ESCALATION_002",
      label: "Provider escalation boundary",
      lane: "escalation_write_boundary",
      boundaryScore: 100,
      priority: "urgent",
      escalationQuestion: "Can escalation avoid provider calls?",
      requiredControls: ["providerCalled=false", "providerCallAllowed=false", "providerRequestSendAllowed=false"],
      manualResolution: "Keep provider routes blocked.",
    },
    {
      id: "IHWP_ESCALATION_003",
      label: "Operational escalation boundary",
      lane: "escalation_write_boundary",
      boundaryScore: clampScore(context.manualWritePathScore),
      priority: "high",
      escalationQuestion: "Can escalation avoid task, intervention and dispatch writes?",
      requiredControls: ["taskCreated=false", "interventionCreated=false", "manualDispatchWritePathAllowed=false"],
      manualResolution: "Hold for human board.",
    },
  ];
}

function buildIncidentClosureBoundary(context: Required<IncidentHandlingWritePathInput>): IncidentClosureBoundaryItem[] {
  return [
    {
      id: "IHWP_CLOSURE_001",
      label: "Incident closure write boundary",
      lane: "closure_write_boundary",
      closureScore: 100,
      severity: "critical",
      closureQuestion: "Can closure writes remain blocked?",
      requiredChecks: ["incidentClosureWriteAllowed=false", "incidentClosureWritePerformed=false"],
      manualResolution: "Keep closure write path locked.",
    },
    {
      id: "IHWP_CLOSURE_002",
      label: "Closure safety boundary",
      lane: "closure_write_boundary",
      closureScore: 100,
      severity: "critical",
      closureQuestion: "Can closure avoid product, dosage and execution content?",
      requiredChecks: ["productPrescriptionAllowed=false", "dosageAdviceAllowed=false", "automaticExecutionAllowed=false"],
      manualResolution: "Block unsafe closure wording.",
    },
    {
      id: "IHWP_CLOSURE_003",
      label: "Closure readiness review",
      lane: "closure_write_boundary",
      closureScore: clampScore(context.closureReadinessScore),
      severity: severityFromConcern(100 - context.closureReadinessScore + context.closureBoundaryItemCount * 4),
      closureQuestion: "Can closure readiness be reviewed before later write activation?",
      requiredChecks: ["governance note", "rollback note", "redacted output"],
      manualResolution: "Hold for reviewer if evidence is incomplete.",
    },
  ];
}

function buildIncidentNotificationBoundary(): IncidentNotificationBoundaryItem[] {
  return [
    {
      id: "IHWP_NOTIFY_001",
      label: "Incident notification boundary",
      lane: "notification_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No incident notification can be sent.",
      blockedOutcome: "incidentNotificationAllowed=false",
    },
    {
      id: "IHWP_NOTIFY_002",
      label: "Dispatch notification boundary",
      lane: "notification_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No dispatch notification can be sent.",
      blockedOutcome: "dispatchNotificationAllowed=false",
    },
    {
      id: "IHWP_NOTIFY_003",
      label: "Public share boundary",
      lane: "notification_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No incident write output can be shared publicly.",
      blockedOutcome: "publicShareAllowed=false",
    },
  ];
}

function buildRollbackIncidentWritePlan(context: Required<IncidentHandlingWritePathInput>): RollbackIncidentWritePlanItem[] {
  return [
    {
      id: "IHWP_ROLLBACK_001",
      label: "Incident write rollback plan",
      lane: "rollback_incident_write",
      rollbackScore: clampScore(context.incidentHandlingGateScore),
      priority: context.incidentHandlingGateScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future incident write path return to zero-write state?",
      safeFallback: "Return to local dry-run and incident write no-go board.",
    },
    {
      id: "IHWP_ROLLBACK_002",
      label: "Record write rollback plan",
      lane: "rollback_incident_write",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can incident record writes remain blocked?",
      safeFallback: "No incident record write path exists in V17.3.",
    },
    {
      id: "IHWP_ROLLBACK_003",
      label: "Closure write rollback plan",
      lane: "rollback_incident_write",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can closure writes remain blocked?",
      safeFallback: "No closure write path exists in V17.3.",
    },
  ];
}

function buildIncidentWriteNoGoBoard(): IncidentWriteNoGoItem[] {
  return [
    {
      id: "IHWP_GONOGO_001",
      label: "Incident handling write path plan",
      lane: "human_signoff",
      goNoGoState: "zero-write-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["governance approval", "record boundary", "escalation boundary", "closure boundary"],
      safeOutcome: "Incident write path plan only.",
    },
    {
      id: "IHWP_GONOGO_002",
      label: "Actual incident write path",
      lane: "incident_write_path_gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate incident write release", "governance approval", "rollback proof"],
      safeOutcome: "Incident write path remains blocked.",
    },
    {
      id: "IHWP_GONOGO_003",
      label: "Incident record, escalation or closure write",
      lane: "incident_record_boundary",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate write path release", "audit proof", "retention review"],
      safeOutcome: "Incident record, escalation and closure writes remain blocked.",
    },
  ];
}

function buildIncidentWriteGateChecks(
  context: Required<IncidentHandlingWritePathInput>,
  sourceNodes: IncidentWriteSourceNode[],
): IncidentWriteGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "IHWP_CHECK_001",
      label: "Incident write path remains zero-write",
      lane: "incident_write_path_gate" as IncidentWriteLane,
      score: 100,
      reviewer: "incident handling write path reviewer",
      requiredEvidence: ["incidentHandlingWritePathAllowed=false", "incidentRecordWriteAllowed=false", "incidentWriteAllowed=false"],
      hardStop: "Do not activate incident write path in V17.3.",
    },
    {
      id: "IHWP_CHECK_002",
      label: "Incident governance approval is complete enough",
      lane: "incident_governance_approval" as IncidentWriteLane,
      score: context.governanceApprovalScore - context.governanceApprovalItemCount * 3,
      reviewer: context.incidentWriteLeadRole,
      requiredEvidence: ["governance approval", "audit approval", "retention review"],
      hardStop: "Do not proceed without incident governance approval board.",
    },
    {
      id: "IHWP_CHECK_003",
      label: "Incident record boundary is complete",
      lane: "incident_record_boundary" as IncidentWriteLane,
      score: 100,
      reviewer: "incident record boundary reviewer",
      requiredEvidence: ["record boundary", "timeline boundary", "audit boundary"],
      hardStop: "Incident record boundaries must remain active.",
    },
    {
      id: "IHWP_CHECK_004",
      label: "Escalation boundary is complete enough",
      lane: "escalation_write_boundary" as IncidentWriteLane,
      score: context.manualWritePathScore - context.escalationBoundaryItemCount * 3,
      reviewer: "incident escalation boundary reviewer",
      requiredEvidence: ["escalation write boundary", "provider escalation boundary", "operational escalation boundary"],
      hardStop: "Do not proceed without escalation boundary board.",
    },
    {
      id: "IHWP_CHECK_005",
      label: "Closure boundary is complete enough",
      lane: "closure_write_boundary" as IncidentWriteLane,
      score: context.closureReadinessScore - context.closureBoundaryItemCount * 3,
      reviewer: "incident closure boundary reviewer",
      requiredEvidence: ["closure write boundary", "closure safety boundary", "closure readiness review"],
      hardStop: "Do not proceed without closure boundary board.",
    },
    {
      id: "IHWP_CHECK_006",
      label: "Source blockers are within incident write tolerance",
      lane: "human_signoff" as IncidentWriteLane,
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

function buildBoardPack(context: Required<IncidentHandlingWritePathInput>): IncidentWriteBoardPackItem[] {
  return [
    {
      id: "IHWP_PACK_001",
      label: "Incident write path packet",
      lane: "incident_write_path_gate",
      packReady: context.incidentHandlingGateScore >= 60,
      readinessScore: clampScore(context.incidentHandlingGateScore),
      reviewerCheck: "Confirm incident write path remains zero-write and design-only.",
      includedSections: ["write path gate", "governance approval", "write no-go"],
      blockedSections: ["incident record write", "incident timeline write", "incident audit write"],
    },
    {
      id: "IHWP_PACK_002",
      label: "Record and escalation boundary packet",
      lane: "incident_record_boundary",
      packReady: context.recordBoundaryScore >= 60 && context.manualWritePathScore >= 60,
      readinessScore: clampScore((context.recordBoundaryScore + context.manualWritePathScore) / 2),
      reviewerCheck: "Confirm record and escalation boundaries remain locked.",
      includedSections: ["record boundary", "escalation boundary", "notification boundary"],
      blockedSections: ["provider call", "work creation", "notification send"],
    },
    {
      id: "IHWP_PACK_003",
      label: "Closure and rollback packet",
      lane: "closure_write_boundary",
      packReady: context.closureReadinessScore >= 60,
      readinessScore: clampScore(context.closureReadinessScore),
      reviewerCheck: "Confirm closure and rollback are dry-run only.",
      includedSections: ["closure boundary", "rollback plan", "safety closure"],
      blockedSections: ["closure write", "automatic rollback", "runtime action"],
    },
  ];
}

function buildFindings(
  context: Required<IncidentHandlingWritePathInput>,
  sourceNodes: IncidentWriteSourceNode[],
  gates: IncidentWriteGateCheckItem[],
  goNoGo: IncidentWriteNoGoItem[],
): IncidentWriteFindingItem[] {
  const findings: IncidentWriteFindingItem[] = [];

  if (context.openIncidentWriteGapCount > 0) {
    findings.push({
      id: "IHWP_FINDING_001",
      label: "Open incident write gaps",
      lane: "human_signoff",
      severity: context.openIncidentWriteGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openIncidentWriteGapCount} incident write gaps remain before any later activation.`,
      manualResolution: "Resolve governance approval, record boundary, escalation, closure and rollback gaps in a later gated release.",
      blocksIncidentWriteActivation: true,
    });
  }

  if (context.governanceApprovalScore < 70) {
    findings.push({
      id: "IHWP_FINDING_002",
      label: "Incident governance approval below threshold",
      lane: "incident_governance_approval",
      severity: "critical",
      reason: "Incident governance approval is not mature enough for write path activation.",
      manualResolution: "Complete governance approval, audit approval and retention review.",
      blocksIncidentWriteActivation: true,
    });
  }

  if (context.closureReadinessScore < 70) {
    findings.push({
      id: "IHWP_FINDING_003",
      label: "Incident closure readiness below threshold",
      lane: "closure_write_boundary",
      severity: "critical",
      reason: "Incident closure readiness is not mature enough for write path activation.",
      manualResolution: "Complete closure boundary, safety closure and evidence review.",
      blocksIncidentWriteActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `IHWP_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksIncidentWriteActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `IHWP_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Incident write gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksIncidentWriteActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `IHWP_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksIncidentWriteActivation: true,
      });
    });

  return findings;
}

export function buildAiIncidentHandlingWritePathGateReport(
  input: IncidentHandlingWritePathInput = {},
): IncidentHandlingWritePathReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const incidentWritePathGate = buildIncidentWritePathGate(context);
  const incidentGovernanceApprovalLock = buildIncidentGovernanceApprovalLock(context);
  const incidentRecordBoundary = buildIncidentRecordBoundary();
  const incidentEscalationBoundary = buildIncidentEscalationBoundary(context);
  const incidentClosureBoundary = buildIncidentClosureBoundary(context);
  const incidentNotificationBoundary = buildIncidentNotificationBoundary();
  const rollbackIncidentWritePlan = buildRollbackIncidentWritePlan(context);
  const incidentWriteNoGoBoard = buildIncidentWriteNoGoBoard();
  const incidentWriteGateChecks = buildIncidentWriteGateChecks(context, sourceNodes);
  const incidentWriteBoardPack = buildBoardPack(context);
  const incidentWriteFindings = buildFindings(context, sourceNodes, incidentWriteGateChecks, incidentWriteNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    incidentWritePathGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, incidentWritePathGate.length);

  const approvalAverage =
    incidentGovernanceApprovalLock.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, incidentGovernanceApprovalLock.length);

  const gateAverage =
    incidentWriteGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, incidentWriteGateChecks.length);

  const findingPenalty = incidentWriteFindings.filter((item) => item.blocksIncidentWriteActivation).length * 7;
  const rollbackPressure =
    rollbackIncidentWritePlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, rollbackIncidentWritePlan.length * 4);

  const incidentWritePathScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      approvalAverage / 4 +
      gateAverage / 4 +
      rollbackPressure -
      findingPenalty -
      context.openIncidentWriteGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openIncidentWriteGapCount * 8 +
        context.governanceApprovalItemCount * 6 +
        context.recordBoundaryItemCount * 5 +
        context.escalationBoundaryItemCount * 5 +
        context.closureBoundaryItemCount * 6,
    ),
  );

  const incidentWritePathStatus = bandFromScore(
    incidentWritePathScore,
    incidentWriteFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: INCIDENT_HANDLING_WRITE_PATH_GUARDRAIL,
    incidentWritePathScore,
    incidentWritePathStatus,
    overallSeverity,
    sourceNodes,
    incidentWritePathGate,
    incidentGovernanceApprovalLock,
    incidentRecordBoundary,
    incidentEscalationBoundary,
    incidentClosureBoundary,
    incidentNotificationBoundary,
    rollbackIncidentWritePlan,
    incidentWriteNoGoBoard,
    incidentWriteGateChecks,
    incidentWriteBoardPack,
    incidentWriteFindings,
    stagedRoadmap: {
      v173: "Incident handling write path gate in zero-write dry-run.",
      v174: "Public export package write only after explicit legal and privacy approval.",
      v175: "Task and intervention creation only after explicit operational write approval.",
      v176: "Provider call execution only after explicit provider approval.",
      v177: "Incident record write only after explicit incident governance approval.",
    },
    redactedExportBundle: {
      exportId: "incident_handling_write_path_gate_v17_3_redacted_dry_run",
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
        "incident write path gate",
        "incident governance approval lock",
        "incident record boundary",
        "incident escalation boundary",
        "incident closure boundary",
        "incident notification boundary",
        "rollback incident write plan",
        "incident write no-go board",
        "incident write gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Incident handling write path gate is local dry-run only.",
      "No incident record write, timeline write, audit write, escalation write, closure write, notification, provider call, storage activation, task creation, intervention creation or execution is performed.",
      "Incident governance approval remains locked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V17.3 prepares incident handling write path governance only.",
    ],
  };
}

export const aiIncidentHandlingWritePathGateVersion = "V17.3";
