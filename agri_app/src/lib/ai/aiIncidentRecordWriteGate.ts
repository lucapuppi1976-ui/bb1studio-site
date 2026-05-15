export type IncidentRecordWriteMode = "dry-run" | "incident-record-board-review";

export type IncidentRecordSeverity = "info" | "watch" | "elevated" | "critical";

export type IncidentRecordPriority = "low" | "medium" | "high" | "urgent";

export type IncidentRecordReadinessBand =
  | "blocked"
  | "record-write-design-ready"
  | "manual-board-review-ready"
  | "zero-write-record-plan-ready";

export type IncidentRecordLane =
  | "incident_record_write_gate"
  | "governance_final_approval"
  | "timeline_write_boundary"
  | "audit_write_boundary"
  | "retention_boundary"
  | "closure_eligibility_board"
  | "rollback_record_plan"
  | "human_signoff";

export interface IncidentRecordWriteGuardrail {
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
  incidentRecordWriteAllowed: false;
  incidentRecordWritePerformed: false;
  incidentTimelineWriteAllowed: false;
  incidentTimelineWritePerformed: false;
  incidentAuditWriteAllowed: false;
  incidentAuditWritePerformed: false;
  incidentRetentionWriteAllowed: false;
  incidentRetentionWritePerformed: false;
  incidentClosureEligibilityWriteAllowed: false;
  incidentClosureEligibilityWritePerformed: false;
  incidentClosureWriteAllowed: false;
  incidentClosureWritePerformed: false;
  incidentNotificationAllowed: false;
  incidentNotificationPerformed: false;
  incidentGovernanceFinalApprovalAllowed: false;
  incidentGovernanceFinalApprovalPerformed: false;
  incidentRecordWriteGateReady: true;
  incidentGovernanceFinalApprovalLockReady: true;
  incidentTimelineAuditBoundaryReady: true;
  incidentRecordNoGoReady: true;
}

export interface IncidentRecordWriteInput {
  recordGateItemCount?: number;
  governanceApprovalItemCount?: number;
  timelineBoundaryItemCount?: number;
  auditBoundaryItemCount?: number;
  retentionBoundaryItemCount?: number;
  closureEligibilityItemCount?: number;
  openRecordWriteGapCount?: number;
  onlineReadinessScore?: number;
  incidentWriteGateScore?: number;
  providerCallGateScore?: number;
  creationGateScore?: number;
  governanceApprovalScore?: number;
  auditBoundaryScore?: number;
  closureEligibilityScore?: number;
  recordWriteLeadRole?: string;
}

export interface IncidentRecordSourceNode {
  id: string;
  lane: IncidentRecordLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: IncidentRecordSeverity;
  priority: IncidentRecordPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface IncidentRecordWriteGateItem {
  id: string;
  label: string;
  lane: IncidentRecordLane;
  gateScore: number;
  severity: IncidentRecordSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface IncidentGovernanceFinalApprovalItem {
  id: string;
  label: string;
  lane: IncidentRecordLane;
  approvalScore: number;
  priority: IncidentRecordPriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface IncidentTimelineBoundaryItem {
  id: string;
  label: string;
  lane: IncidentRecordLane;
  boundaryScore: number;
  severity: IncidentRecordSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface IncidentAuditBoundaryItem {
  id: string;
  label: string;
  lane: IncidentRecordLane;
  boundaryScore: number;
  severity: IncidentRecordSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface IncidentRetentionBoundaryItem {
  id: string;
  label: string;
  lane: IncidentRecordLane;
  retentionScore: number;
  priority: IncidentRecordPriority;
  retentionQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface IncidentClosureEligibilityItem {
  id: string;
  label: string;
  lane: IncidentRecordLane;
  eligibilityScore: number;
  severity: IncidentRecordSeverity;
  eligibilityQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface RollbackIncidentRecordPlanItem {
  id: string;
  label: string;
  lane: IncidentRecordLane;
  rollbackScore: number;
  priority: IncidentRecordPriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface IncidentRecordNoGoItem {
  id: string;
  label: string;
  lane: IncidentRecordLane;
  goNoGoState: "no-go" | "design-only" | "zero-write-record-plan-ready";
  score: number;
  severity: IncidentRecordSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface IncidentRecordGateCheckItem {
  id: string;
  label: string;
  lane: IncidentRecordLane;
  passed: boolean;
  score: number;
  severity: IncidentRecordSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface IncidentRecordBoardPackItem {
  id: string;
  label: string;
  lane: IncidentRecordLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface IncidentRecordFindingItem {
  id: string;
  label: string;
  lane: IncidentRecordLane;
  severity: IncidentRecordSeverity;
  reason: string;
  manualResolution: string;
  blocksRecordWriteActivation: boolean;
}

export interface IncidentRecordWriteReport {
  generatedAt: string;
  mode: IncidentRecordWriteMode;
  context: Required<IncidentRecordWriteInput>;
  readiness: IncidentRecordWriteGuardrail;
  recordWriteScore: number;
  recordWriteStatus: IncidentRecordReadinessBand;
  overallSeverity: IncidentRecordSeverity;
  sourceNodes: IncidentRecordSourceNode[];
  incidentRecordWriteGate: IncidentRecordWriteGateItem[];
  incidentGovernanceFinalApprovalLock: IncidentGovernanceFinalApprovalItem[];
  incidentTimelineBoundary: IncidentTimelineBoundaryItem[];
  incidentAuditBoundary: IncidentAuditBoundaryItem[];
  incidentRetentionBoundary: IncidentRetentionBoundaryItem[];
  incidentClosureEligibilityBoard: IncidentClosureEligibilityItem[];
  rollbackIncidentRecordPlan: RollbackIncidentRecordPlanItem[];
  incidentRecordNoGoBoard: IncidentRecordNoGoItem[];
  incidentRecordGateChecks: IncidentRecordGateCheckItem[];
  incidentRecordBoardPack: IncidentRecordBoardPackItem[];
  incidentRecordFindings: IncidentRecordFindingItem[];
  stagedRoadmap: {
    v177: string;
    v178: string;
    v179: string;
    v180: string;
    v181: string;
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

export const INCIDENT_RECORD_WRITE_GUARDRAIL: IncidentRecordWriteGuardrail = {
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
  incidentRecordWriteAllowed: false,
  incidentRecordWritePerformed: false,
  incidentTimelineWriteAllowed: false,
  incidentTimelineWritePerformed: false,
  incidentAuditWriteAllowed: false,
  incidentAuditWritePerformed: false,
  incidentRetentionWriteAllowed: false,
  incidentRetentionWritePerformed: false,
  incidentClosureEligibilityWriteAllowed: false,
  incidentClosureEligibilityWritePerformed: false,
  incidentClosureWriteAllowed: false,
  incidentClosureWritePerformed: false,
  incidentNotificationAllowed: false,
  incidentNotificationPerformed: false,
  incidentGovernanceFinalApprovalAllowed: false,
  incidentGovernanceFinalApprovalPerformed: false,
  incidentRecordWriteGateReady: true,
  incidentGovernanceFinalApprovalLockReady: true,
  incidentTimelineAuditBoundaryReady: true,
  incidentRecordNoGoReady: true,
};

const priorityWeight: Record<IncidentRecordPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: IncidentRecordWriteInput): Required<IncidentRecordWriteInput> {
  return {
    recordGateItemCount: input.recordGateItemCount ?? 8,
    governanceApprovalItemCount: input.governanceApprovalItemCount ?? 8,
    timelineBoundaryItemCount: input.timelineBoundaryItemCount ?? 8,
    auditBoundaryItemCount: input.auditBoundaryItemCount ?? 8,
    retentionBoundaryItemCount: input.retentionBoundaryItemCount ?? 7,
    closureEligibilityItemCount: input.closureEligibilityItemCount ?? 7,
    openRecordWriteGapCount: input.openRecordWriteGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    incidentWriteGateScore: input.incidentWriteGateScore ?? 70,
    providerCallGateScore: input.providerCallGateScore ?? 70,
    creationGateScore: input.creationGateScore ?? 70,
    governanceApprovalScore: input.governanceApprovalScore ?? 66,
    auditBoundaryScore: input.auditBoundaryScore ?? 68,
    closureEligibilityScore: input.closureEligibilityScore ?? 66,
    recordWriteLeadRole: input.recordWriteLeadRole ?? "incident record write reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): IncidentRecordSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: IncidentRecordSeverity): IncidentRecordPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): IncidentRecordReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-write-record-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "record-write-design-ready";
}

function buildSourceNode(
  id: string,
  lane: IncidentRecordLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): IncidentRecordSourceNode {
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
            "Incident record write gate remains below activation threshold.",
            "Incident governance board must resolve final approval, timeline, audit, retention and rollback gaps before any later record write release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<IncidentRecordWriteInput>): IncidentRecordSourceNode[] {
  const recordPressure = context.recordGateItemCount;
  const approvalPressure = context.governanceApprovalItemCount * 2;
  const timelinePressure = context.timelineBoundaryItemCount;
  const auditPressure = context.auditBoundaryItemCount * 2;
  const retentionPressure = context.retentionBoundaryItemCount;
  const gapPressure = context.openRecordWriteGapCount * 2;

  return [
    buildSourceNode(
      "IRWG_NODE_001",
      "incident_record_write_gate",
      "Incident handling write path gate",
      "V17.3",
      context.incidentWriteGateScore,
      context.governanceApprovalScore,
      recordPressure,
      "Connect incident write design to future incident record governance.",
    ),
    buildSourceNode(
      "IRWG_NODE_002",
      "governance_final_approval",
      "Incident governance final approval lock",
      "V17.7",
      context.governanceApprovalScore,
      context.incidentWriteGateScore,
      approvalPressure,
      "Prepare incident governance final approval without record writes.",
    ),
    buildSourceNode(
      "IRWG_NODE_003",
      "timeline_write_boundary",
      "Incident timeline boundary",
      "V17.7",
      100,
      context.auditBoundaryScore,
      timelinePressure,
      "Keep incident timeline writes blocked.",
    ),
    buildSourceNode(
      "IRWG_NODE_004",
      "audit_write_boundary",
      "Incident audit boundary",
      "V17.7",
      context.auditBoundaryScore,
      context.governanceApprovalScore,
      auditPressure,
      "Keep incident audit writes blocked.",
    ),
    buildSourceNode(
      "IRWG_NODE_005",
      "retention_boundary",
      "Retention boundary",
      "V17.7",
      context.closureEligibilityScore,
      context.governanceApprovalScore,
      retentionPressure,
      "Prepare retention board without retention writes.",
    ),
    buildSourceNode(
      "IRWG_NODE_006",
      "closure_eligibility_board",
      "Task and intervention creation gate",
      "V17.5",
      context.creationGateScore,
      context.closureEligibilityScore,
      context.closureEligibilityItemCount,
      "Ensure incident record write cannot create work or execution records.",
    ),
    buildSourceNode(
      "IRWG_NODE_007",
      "rollback_record_plan",
      "Provider call execution gate",
      "V17.6",
      context.providerCallGateScore,
      context.onlineReadinessScore,
      gapPressure,
      "Prepare record rollback without provider call or storage activation.",
    ),
    buildSourceNode(
      "IRWG_NODE_008",
      "human_signoff",
      "Incident record write human signoff",
      "V17.7",
      context.governanceApprovalScore,
      context.closureEligibilityScore,
      gapPressure,
      "Keep incident record write activation blocked until a separate incident governance release.",
    ),
  ];
}

function buildIncidentRecordWriteGate(context: Required<IncidentRecordWriteInput>): IncidentRecordWriteGateItem[] {
  return [
    {
      id: "IRWG_GATE_001",
      label: "Incident record write lock",
      lane: "incident_record_write_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep incident record writes disabled in V17.7.",
      requiredEvidence: ["incidentRecordWriteAllowed=false", "incidentTimelineWriteAllowed=false", "incidentAuditWriteAllowed=false"],
      blockedOutcome: "No incident record write.",
    },
    {
      id: "IRWG_GATE_002",
      label: "Zero-write incident record plan",
      lane: "incident_record_write_gate",
      gateScore: clampScore(context.incidentWriteGateScore),
      severity: severityFromConcern(100 - context.incidentWriteGateScore + context.recordGateItemCount * 4),
      gatePurpose: "Prepare incident record write flow without persisting incident records.",
      requiredEvidence: ["governance approval lock", "timeline boundary", "audit boundary", "retention boundary"],
      blockedOutcome: "No timeline or audit write.",
    },
    {
      id: "IRWG_GATE_003",
      label: "Governance final approval lock",
      lane: "incident_record_write_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require a separate future release before governance final approval.",
      requiredEvidence: ["incidentGovernanceFinalApprovalAllowed=false", "incidentClosureEligibilityWriteAllowed=false"],
      blockedOutcome: "No governance final approval.",
    },
  ];
}

function buildIncidentGovernanceFinalApprovalLock(
  context: Required<IncidentRecordWriteInput>,
): IncidentGovernanceFinalApprovalItem[] {
  return [
    {
      id: "IRWG_APPROVAL_001",
      label: "Governance final approval design",
      lane: "governance_final_approval",
      approvalScore: clampScore(context.governanceApprovalScore),
      priority: context.governanceApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can governance final approval be reviewed without incident writes?",
      requiredEvidence: ["governance reviewer", "record write hold", "record no-go state"],
      blockedOutcome: "No governance final approval is performed.",
    },
    {
      id: "IRWG_APPROVAL_002",
      label: "Record retention approval design",
      lane: "governance_final_approval",
      approvalScore: clampScore(context.closureEligibilityScore),
      priority: "high",
      approvalQuestion: "Can record retention approval remain blocked?",
      requiredEvidence: ["retention boundary", "timeline boundary", "audit boundary"],
      blockedOutcome: "No retention approval.",
    },
    {
      id: "IRWG_APPROVAL_003",
      label: "Final incident closure approval hold",
      lane: "governance_final_approval",
      approvalScore: clampScore(context.auditBoundaryScore),
      priority: "urgent",
      approvalQuestion: "Can incident closure approval remain blocked?",
      requiredEvidence: ["incidentClosureWriteAllowed=false", "incidentClosureEligibilityWriteAllowed=false"],
      blockedOutcome: "No closure approval.",
    },
  ];
}

function buildIncidentTimelineBoundary(): IncidentTimelineBoundaryItem[] {
  return [
    {
      id: "IRWG_TIMELINE_001",
      label: "Timeline record boundary",
      lane: "timeline_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No incident timeline record can be written.",
      blockedOutcome: "incidentTimelineWriteAllowed=false",
    },
    {
      id: "IRWG_TIMELINE_002",
      label: "Timeline event append boundary",
      lane: "timeline_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No incident timeline event can be appended.",
      blockedOutcome: "incidentTimelineWritePerformed=false",
    },
    {
      id: "IRWG_TIMELINE_003",
      label: "Notification timeline boundary",
      lane: "timeline_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No notification can be generated from timeline design.",
      blockedOutcome: "incidentNotificationAllowed=false",
    },
  ];
}

function buildIncidentAuditBoundary(): IncidentAuditBoundaryItem[] {
  return [
    {
      id: "IRWG_AUDIT_001",
      label: "Audit record write boundary",
      lane: "audit_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No incident audit record can be written.",
      blockedOutcome: "incidentAuditWriteAllowed=false",
    },
    {
      id: "IRWG_AUDIT_002",
      label: "Audit trail append boundary",
      lane: "audit_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No audit trail entry can be appended.",
      blockedOutcome: "incidentAuditWritePerformed=false",
    },
    {
      id: "IRWG_AUDIT_003",
      label: "Review persistence audit boundary",
      lane: "audit_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No review persistence can be activated from audit design.",
      blockedOutcome: "reviewPersistenceAllowed=false",
    },
  ];
}

function buildIncidentRetentionBoundary(context: Required<IncidentRecordWriteInput>): IncidentRetentionBoundaryItem[] {
  return [
    {
      id: "IRWG_RETENTION_001",
      label: "Incident retention boundary",
      lane: "retention_boundary",
      retentionScore: clampScore(context.closureEligibilityScore),
      priority: context.closureEligibilityScore < 70 ? "urgent" : "high",
      retentionQuestion: "Can incident retention be reviewed without retention writes?",
      requiredControls: ["retention hold", "governance approval lock", "record no-go"],
      manualResolution: "Keep retention local and dry-run.",
    },
    {
      id: "IRWG_RETENTION_002",
      label: "Incident deletion rollback design",
      lane: "retention_boundary",
      retentionScore: 100,
      priority: "urgent",
      retentionQuestion: "Can deletion rollback remain design-only?",
      requiredControls: ["no record write", "no deletion", "rollback note"],
      manualResolution: "No incident record exists in V17.7.",
    },
    {
      id: "IRWG_RETENTION_003",
      label: "Private data retention caveat",
      lane: "retention_boundary",
      retentionScore: 100,
      priority: "urgent",
      retentionQuestion: "Can private data remain excluded from record write design?",
      requiredControls: ["redacted output", "no field identifiers", "no private notes"],
      manualResolution: "Block record write if private data appears.",
    },
  ];
}

function buildIncidentClosureEligibilityBoard(
  context: Required<IncidentRecordWriteInput>,
): IncidentClosureEligibilityItem[] {
  return [
    {
      id: "IRWG_CLOSURE_001",
      label: "Closure eligibility design",
      lane: "closure_eligibility_board",
      eligibilityScore: clampScore(context.closureEligibilityScore),
      severity: severityFromConcern(100 - context.closureEligibilityScore + context.closureEligibilityItemCount * 4),
      eligibilityQuestion: "Can closure eligibility be reviewed without closure writes?",
      requiredChecks: ["closure hold", "retention board", "governance note"],
      manualResolution: "Keep closure eligibility local and dry-run.",
    },
    {
      id: "IRWG_CLOSURE_002",
      label: "No work conversion closure check",
      lane: "closure_eligibility_board",
      eligibilityScore: 100,
      severity: "critical",
      eligibilityQuestion: "Can closure eligibility avoid task and intervention creation?",
      requiredChecks: ["taskCreated=false", "interventionCreated=false", "taskInterventionCreationAllowed=false"],
      manualResolution: "Block any work conversion wording.",
    },
    {
      id: "IRWG_CLOSURE_003",
      label: "No provider closure check",
      lane: "closure_eligibility_board",
      eligibilityScore: 100,
      severity: "critical",
      eligibilityQuestion: "Can closure eligibility avoid provider calls?",
      requiredChecks: ["providerCalled=false", "providerCallExecutionAllowed=false", "providerRequestDispatchAllowed=false"],
      manualResolution: "Keep provider routes blocked.",
    },
  ];
}

function buildRollbackIncidentRecordPlan(context: Required<IncidentRecordWriteInput>): RollbackIncidentRecordPlanItem[] {
  return [
    {
      id: "IRWG_ROLLBACK_001",
      label: "Incident record write rollback plan",
      lane: "rollback_record_plan",
      rollbackScore: clampScore(context.incidentWriteGateScore),
      priority: context.incidentWriteGateScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future incident record write release return to zero-write state?",
      safeFallback: "Return to local dry-run and incident record no-go board.",
    },
    {
      id: "IRWG_ROLLBACK_002",
      label: "Timeline rollback plan",
      lane: "rollback_record_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can timeline writes remain blocked?",
      safeFallback: "No timeline write path exists in V17.7.",
    },
    {
      id: "IRWG_ROLLBACK_003",
      label: "Audit rollback plan",
      lane: "rollback_record_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can audit writes remain blocked?",
      safeFallback: "No audit write path exists in V17.7.",
    },
  ];
}

function buildIncidentRecordNoGoBoard(): IncidentRecordNoGoItem[] {
  return [
    {
      id: "IRWG_GONOGO_001",
      label: "Incident record write plan",
      lane: "human_signoff",
      goNoGoState: "zero-write-record-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["governance final approval", "timeline boundary", "audit boundary", "retention boundary"],
      safeOutcome: "Incident record write plan only.",
    },
    {
      id: "IRWG_GONOGO_002",
      label: "Actual incident record write",
      lane: "incident_record_write_gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate incident record release", "governance final approval", "rollback proof"],
      safeOutcome: "Incident record write remains blocked.",
    },
    {
      id: "IRWG_GONOGO_003",
      label: "Timeline, audit or retention write",
      lane: "audit_write_boundary",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate write path release", "retention proof", "audit proof"],
      safeOutcome: "Timeline, audit and retention writes remain blocked.",
    },
  ];
}

function buildIncidentRecordGateChecks(
  context: Required<IncidentRecordWriteInput>,
  sourceNodes: IncidentRecordSourceNode[],
): IncidentRecordGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "IRWG_CHECK_001",
      label: "Record write gate remains zero-write",
      lane: "incident_record_write_gate" as IncidentRecordLane,
      score: 100,
      reviewer: "incident record write reviewer",
      requiredEvidence: ["incidentRecordWriteAllowed=false", "incidentTimelineWriteAllowed=false", "incidentAuditWriteAllowed=false"],
      hardStop: "Do not activate incident record write in V17.7.",
    },
    {
      id: "IRWG_CHECK_002",
      label: "Governance final approval is complete enough",
      lane: "governance_final_approval" as IncidentRecordLane,
      score: context.governanceApprovalScore - context.governanceApprovalItemCount * 3,
      reviewer: context.recordWriteLeadRole,
      requiredEvidence: ["governance approval", "retention approval", "closure approval hold"],
      hardStop: "Do not proceed without governance final approval board.",
    },
    {
      id: "IRWG_CHECK_003",
      label: "Timeline boundary is complete",
      lane: "timeline_write_boundary" as IncidentRecordLane,
      score: 100,
      reviewer: "timeline boundary reviewer",
      requiredEvidence: ["timeline boundary", "event append boundary", "notification boundary"],
      hardStop: "Timeline boundaries must remain active.",
    },
    {
      id: "IRWG_CHECK_004",
      label: "Audit boundary is complete",
      lane: "audit_write_boundary" as IncidentRecordLane,
      score: 100,
      reviewer: "audit boundary reviewer",
      requiredEvidence: ["audit record boundary", "audit trail boundary", "review persistence boundary"],
      hardStop: "Audit boundaries must remain active.",
    },
    {
      id: "IRWG_CHECK_005",
      label: "Closure eligibility is complete enough",
      lane: "closure_eligibility_board" as IncidentRecordLane,
      score: context.closureEligibilityScore - context.closureEligibilityItemCount * 3,
      reviewer: "closure eligibility reviewer",
      requiredEvidence: ["closure eligibility", "no work conversion", "no provider closure"],
      hardStop: "Do not proceed without closure eligibility board.",
    },
    {
      id: "IRWG_CHECK_006",
      label: "Source blockers are within record write tolerance",
      lane: "human_signoff" as IncidentRecordLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before zero-write-record-plan-ready state.",
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

function buildBoardPack(context: Required<IncidentRecordWriteInput>): IncidentRecordBoardPackItem[] {
  return [
    {
      id: "IRWG_PACK_001",
      label: "Incident record write packet",
      lane: "incident_record_write_gate",
      packReady: context.incidentWriteGateScore >= 60,
      readinessScore: clampScore(context.incidentWriteGateScore),
      reviewerCheck: "Confirm incident record write remains zero-write and design-only.",
      includedSections: ["record write gate", "governance approval", "record no-go"],
      blockedSections: ["record write", "timeline write", "audit write"],
    },
    {
      id: "IRWG_PACK_002",
      label: "Timeline and audit packet",
      lane: "timeline_write_boundary",
      packReady: context.auditBoundaryScore >= 60,
      readinessScore: clampScore(context.auditBoundaryScore),
      reviewerCheck: "Confirm timeline and audit boundaries remain locked.",
      includedSections: ["timeline boundary", "audit boundary", "review persistence boundary"],
      blockedSections: ["timeline append", "audit append", "review persistence"],
    },
    {
      id: "IRWG_PACK_003",
      label: "Retention and rollback packet",
      lane: "retention_boundary",
      packReady: context.closureEligibilityScore >= 60,
      readinessScore: clampScore(context.closureEligibilityScore),
      reviewerCheck: "Confirm retention and rollback are dry-run only.",
      includedSections: ["retention boundary", "closure eligibility", "rollback plan"],
      blockedSections: ["retention write", "closure write", "runtime rollback"],
    },
  ];
}

function buildFindings(
  context: Required<IncidentRecordWriteInput>,
  sourceNodes: IncidentRecordSourceNode[],
  gates: IncidentRecordGateCheckItem[],
  goNoGo: IncidentRecordNoGoItem[],
): IncidentRecordFindingItem[] {
  const findings: IncidentRecordFindingItem[] = [];

  if (context.openRecordWriteGapCount > 0) {
    findings.push({
      id: "IRWG_FINDING_001",
      label: "Open record write gaps",
      lane: "human_signoff",
      severity: context.openRecordWriteGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openRecordWriteGapCount} record write gaps remain before any later activation.`,
      manualResolution: "Resolve governance approval, timeline, audit, retention and rollback gaps in a later gated release.",
      blocksRecordWriteActivation: true,
    });
  }

  if (context.governanceApprovalScore < 70) {
    findings.push({
      id: "IRWG_FINDING_002",
      label: "Governance final approval below threshold",
      lane: "governance_final_approval",
      severity: "critical",
      reason: "Governance final approval is not mature enough for record write activation.",
      manualResolution: "Complete governance, retention and closure approval review.",
      blocksRecordWriteActivation: true,
    });
  }

  if (context.closureEligibilityScore < 70) {
    findings.push({
      id: "IRWG_FINDING_003",
      label: "Closure eligibility below threshold",
      lane: "closure_eligibility_board",
      severity: "critical",
      reason: "Closure eligibility is not mature enough for record write activation.",
      manualResolution: "Complete closure eligibility, no work conversion and no provider closure review.",
      blocksRecordWriteActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `IRWG_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksRecordWriteActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `IRWG_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Record write gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksRecordWriteActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `IRWG_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksRecordWriteActivation: true,
      });
    });

  return findings;
}

export function buildAiIncidentRecordWriteGateReport(
  input: IncidentRecordWriteInput = {},
): IncidentRecordWriteReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const incidentRecordWriteGate = buildIncidentRecordWriteGate(context);
  const incidentGovernanceFinalApprovalLock = buildIncidentGovernanceFinalApprovalLock(context);
  const incidentTimelineBoundary = buildIncidentTimelineBoundary();
  const incidentAuditBoundary = buildIncidentAuditBoundary();
  const incidentRetentionBoundary = buildIncidentRetentionBoundary(context);
  const incidentClosureEligibilityBoard = buildIncidentClosureEligibilityBoard(context);
  const rollbackIncidentRecordPlan = buildRollbackIncidentRecordPlan(context);
  const incidentRecordNoGoBoard = buildIncidentRecordNoGoBoard();
  const incidentRecordGateChecks = buildIncidentRecordGateChecks(context, sourceNodes);
  const incidentRecordBoardPack = buildBoardPack(context);
  const incidentRecordFindings = buildFindings(context, sourceNodes, incidentRecordGateChecks, incidentRecordNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    incidentRecordWriteGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, incidentRecordWriteGate.length);

  const approvalAverage =
    incidentGovernanceFinalApprovalLock.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, incidentGovernanceFinalApprovalLock.length);

  const gateAverage =
    incidentRecordGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, incidentRecordGateChecks.length);

  const findingPenalty = incidentRecordFindings.filter((item) => item.blocksRecordWriteActivation).length * 7;
  const rollbackPressure =
    rollbackIncidentRecordPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, rollbackIncidentRecordPlan.length * 4);

  const recordWriteScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      approvalAverage / 4 +
      gateAverage / 4 +
      rollbackPressure -
      findingPenalty -
      context.openRecordWriteGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openRecordWriteGapCount * 8 +
        context.governanceApprovalItemCount * 6 +
        context.timelineBoundaryItemCount * 5 +
        context.auditBoundaryItemCount * 6 +
        context.retentionBoundaryItemCount * 5,
    ),
  );

  const recordWriteStatus = bandFromScore(
    recordWriteScore,
    incidentRecordFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: INCIDENT_RECORD_WRITE_GUARDRAIL,
    recordWriteScore,
    recordWriteStatus,
    overallSeverity,
    sourceNodes,
    incidentRecordWriteGate,
    incidentGovernanceFinalApprovalLock,
    incidentTimelineBoundary,
    incidentAuditBoundary,
    incidentRetentionBoundary,
    incidentClosureEligibilityBoard,
    rollbackIncidentRecordPlan,
    incidentRecordNoGoBoard,
    incidentRecordGateChecks,
    incidentRecordBoardPack,
    incidentRecordFindings,
    stagedRoadmap: {
      v177: "Incident record write gate in zero-write dry-run.",
      v178: "Public export artifact write only after explicit legal and privacy approval.",
      v179: "Operational execution only after explicit human approval.",
      v180: "Provider runtime activation only after explicit provider approval and rollback proof.",
      v181: "Incident record persistence only after explicit governance final approval.",
    },
    redactedExportBundle: {
      exportId: "incident_record_write_gate_v17_7_redacted_dry_run",
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
        "incident record write gate",
        "governance final approval lock",
        "timeline boundary",
        "audit boundary",
        "retention boundary",
        "closure eligibility board",
        "rollback record plan",
        "record no-go board",
        "record gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Incident record write gate is local dry-run only.",
      "No incident record write, timeline write, audit write, retention write, closure eligibility write, notification, provider call, storage activation, task creation, intervention creation or execution is performed.",
      "Incident governance final approval remains locked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V17.7 prepares incident record write governance only.",
    ],
  };
}

export const aiIncidentRecordWriteGateVersion = "V17.7";
