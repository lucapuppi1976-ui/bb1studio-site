export type PersistentHumanReviewMode = "dry-run" | "review-workflow-board";

export type PersistentHumanReviewSeverity = "info" | "watch" | "elevated" | "critical";

export type PersistentHumanReviewPriority = "low" | "medium" | "high" | "urgent";

export type PersistentHumanReviewReadinessBand =
  | "blocked"
  | "workflow-design-ready"
  | "manual-gate-review-ready"
  | "review-operating-model-ready";

export type PersistentHumanReviewLane =
  | "review-state-machine"
  | "reviewer-ownership"
  | "reason-requirement"
  | "audit-trail-design"
  | "manual-conversion-gate"
  | "correction-path"
  | "go-no-go"
  | "human-signoff";

export type PersistentHumanReviewState =
  | "DRAFT"
  | "PROVIDER_STAGING_HOLD"
  | "REVIEW_REQUIRED"
  | "REVIEW_IN_PROGRESS"
  | "APPROVED_FOR_MANUAL_CONVERSION"
  | "REJECTED"
  | "ARCHIVED";

export interface PersistentHumanReviewGuardrail {
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
  providerActivationAllowed: false;
  casePersistenceActivationAllowed: false;
  casePersistencePerformed: false;
  migrationExecutionAllowed: false;
  migrationExecutionPerformed: false;
  schemaWriteAllowed: false;
  schemaWritePerformed: false;
  automationActivationAllowed: false;
  reviewPersistenceAllowed: false;
  reviewPersistencePerformed: false;
  manualConversionAllowed: false;
  manualConversionPerformed: false;
  persistentHumanReviewPlanReady: true;
  reviewStateMachineReady: true;
  manualConversionGateReady: true;
  reviewerAccountabilityPlanReady: true;
}

export interface PersistentHumanReviewInput {
  reviewStateCount?: number;
  reviewerOwnershipItemCount?: number;
  reasonRequirementItemCount?: number;
  auditTrailItemCount?: number;
  conversionGateItemCount?: number;
  correctionPathItemCount?: number;
  openReviewGapCount?: number;
  onlineReadinessScore?: number;
  providerGatewayScore?: number;
  storageBlueprintScore?: number;
  reviewMaturityScore?: number;
  reviewerAccountabilityScore?: number;
  manualGateDesignScore?: number;
  correctionReadinessScore?: number;
  reviewLeadRole?: string;
}

export interface PersistentHumanReviewSourceNode {
  id: string;
  lane: PersistentHumanReviewLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: PersistentHumanReviewSeverity;
  priority: PersistentHumanReviewPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ReviewStateMachineItem {
  id: string;
  label: PersistentHumanReviewState;
  lane: PersistentHumanReviewLane;
  stateScore: number;
  severity: PersistentHumanReviewSeverity;
  statePurpose: string;
  allowedTransitions: PersistentHumanReviewState[];
  blockedOutcome: string;
}

export interface ReviewerOwnershipItem {
  id: string;
  label: string;
  lane: PersistentHumanReviewLane;
  ownershipScore: number;
  priority: PersistentHumanReviewPriority;
  ownerRole: string;
  requiredBeforeUse: string[];
  blockedOutcome: string;
}

export interface ReviewReasonRequirementItem {
  id: string;
  label: string;
  lane: PersistentHumanReviewLane;
  reasonScore: number;
  severity: PersistentHumanReviewSeverity;
  reasonQuestion: string;
  requiredReasonFields: string[];
  manualResolution: string;
}

export interface ReviewAuditTrailDesignItem {
  id: string;
  label: string;
  lane: PersistentHumanReviewLane;
  trailScore: number;
  severity: PersistentHumanReviewSeverity;
  trailQuestion: string;
  eventFields: string[];
  blockedOutcome: string;
}

export interface ManualConversionGateItem {
  id: string;
  label: string;
  lane: PersistentHumanReviewLane;
  gateScore: number;
  priority: PersistentHumanReviewPriority;
  conversionQuestion: string;
  requiredBeforeConversion: string[];
  blockedOutcome: string;
}

export interface CorrectionPathItem {
  id: string;
  label: string;
  lane: PersistentHumanReviewLane;
  correctionScore: number;
  severity: PersistentHumanReviewSeverity;
  correctionQuestion: string;
  manualResolution: string;
}

export interface ReviewGoNoGoItem {
  id: string;
  label: string;
  lane: PersistentHumanReviewLane;
  goNoGoState: "no-go" | "design-only" | "manual-review-ready";
  score: number;
  severity: PersistentHumanReviewSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface PersistentHumanReviewGateItem {
  id: string;
  label: string;
  lane: PersistentHumanReviewLane;
  passed: boolean;
  score: number;
  severity: PersistentHumanReviewSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface PersistentHumanReviewBoardPackItem {
  id: string;
  label: string;
  lane: PersistentHumanReviewLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface PersistentHumanReviewRiskItem {
  id: string;
  label: string;
  lane: PersistentHumanReviewLane;
  severity: PersistentHumanReviewSeverity;
  reason: string;
  manualResolution: string;
  blocksReviewActivation: boolean;
}

export interface PersistentHumanReviewReport {
  generatedAt: string;
  mode: PersistentHumanReviewMode;
  context: Required<PersistentHumanReviewInput>;
  readiness: PersistentHumanReviewGuardrail;
  reviewWorkflowScore: number;
  reviewWorkflowStatus: PersistentHumanReviewReadinessBand;
  overallSeverity: PersistentHumanReviewSeverity;
  sourceNodes: PersistentHumanReviewSourceNode[];
  reviewStateMachine: ReviewStateMachineItem[];
  reviewerOwnershipPlan: ReviewerOwnershipItem[];
  reasonRequirementPlan: ReviewReasonRequirementItem[];
  auditTrailDesign: ReviewAuditTrailDesignItem[];
  manualConversionGatePlan: ManualConversionGateItem[];
  correctionPathPlan: CorrectionPathItem[];
  reviewGoNoGoBoard: ReviewGoNoGoItem[];
  reviewWorkflowGates: PersistentHumanReviewGateItem[];
  reviewBoardPack: PersistentHumanReviewBoardPackItem[];
  reviewRiskRegister: PersistentHumanReviewRiskItem[];
  stagedRoadmap: {
    v153: string;
    v154: string;
    v155: string;
    v156: string;
    v160: string;
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

export const PERSISTENT_HUMAN_REVIEW_GUARDRAIL: PersistentHumanReviewGuardrail = {
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
  providerActivationAllowed: false,
  casePersistenceActivationAllowed: false,
  casePersistencePerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  automationActivationAllowed: false,
  reviewPersistenceAllowed: false,
  reviewPersistencePerformed: false,
  manualConversionAllowed: false,
  manualConversionPerformed: false,
  persistentHumanReviewPlanReady: true,
  reviewStateMachineReady: true,
  manualConversionGateReady: true,
  reviewerAccountabilityPlanReady: true,
};

const priorityWeight: Record<PersistentHumanReviewPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: PersistentHumanReviewInput): Required<PersistentHumanReviewInput> {
  return {
    reviewStateCount: input.reviewStateCount ?? 7,
    reviewerOwnershipItemCount: input.reviewerOwnershipItemCount ?? 7,
    reasonRequirementItemCount: input.reasonRequirementItemCount ?? 6,
    auditTrailItemCount: input.auditTrailItemCount ?? 7,
    conversionGateItemCount: input.conversionGateItemCount ?? 7,
    correctionPathItemCount: input.correctionPathItemCount ?? 6,
    openReviewGapCount: input.openReviewGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 78,
    providerGatewayScore: input.providerGatewayScore ?? 68,
    storageBlueprintScore: input.storageBlueprintScore ?? 66,
    reviewMaturityScore: input.reviewMaturityScore ?? 74,
    reviewerAccountabilityScore: input.reviewerAccountabilityScore ?? 68,
    manualGateDesignScore: input.manualGateDesignScore ?? 60,
    correctionReadinessScore: input.correctionReadinessScore ?? 58,
    reviewLeadRole: input.reviewLeadRole ?? "AI human review workflow reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): PersistentHumanReviewSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: PersistentHumanReviewSeverity): PersistentHumanReviewPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): PersistentHumanReviewReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "review-operating-model-ready";
  if (score >= 74) return "manual-gate-review-ready";
  return "workflow-design-ready";
}

function buildSourceNode(
  id: string,
  lane: PersistentHumanReviewLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): PersistentHumanReviewSourceNode {
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
            "Persistent human review workflow remains below activation threshold.",
            "Review board must resolve state, ownership, reason, trail, conversion and correction gaps before operational activation.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<PersistentHumanReviewInput>): PersistentHumanReviewSourceNode[] {
  const statePressure = context.reviewStateCount;
  const ownerPressure = context.reviewerOwnershipItemCount;
  const reasonPressure = context.reasonRequirementItemCount * 2;
  const trailPressure = context.auditTrailItemCount;
  const conversionPressure = context.conversionGateItemCount * 2;
  const gapPressure = context.openReviewGapCount * 2;

  return [
    buildSourceNode(
      "PHRW_NODE_001",
      "review-state-machine",
      "Online operational readiness baseline",
      "V15.0",
      context.onlineReadinessScore,
      context.reviewMaturityScore,
      statePressure,
      "Carry V15.0 readiness into persistent human review design.",
    ),
    buildSourceNode(
      "PHRW_NODE_002",
      "reviewer-ownership",
      "Provider gateway staging baseline",
      "V15.1",
      context.providerGatewayScore,
      context.reviewMaturityScore,
      ownerPressure,
      "Connect provider staging holds to reviewer ownership.",
    ),
    buildSourceNode(
      "PHRW_NODE_003",
      "audit-trail-design",
      "Case persistence blueprint baseline",
      "V15.2",
      context.storageBlueprintScore,
      context.reviewMaturityScore,
      trailPressure,
      "Connect storage blueprint to future review event trace.",
    ),
    buildSourceNode(
      "PHRW_NODE_004",
      "reason-requirement",
      "Reviewer accountability plan",
      "V15.3",
      context.reviewerAccountabilityScore,
      context.reviewMaturityScore,
      reasonPressure,
      "Require reviewer reason before approval, hold, rejection or archive.",
    ),
    buildSourceNode(
      "PHRW_NODE_005",
      "manual-conversion-gate",
      "Manual conversion gate design",
      "V15.3",
      context.manualGateDesignScore,
      context.reviewMaturityScore,
      conversionPressure,
      "Design preview and confirmation before any future work creation.",
    ),
    buildSourceNode(
      "PHRW_NODE_006",
      "correction-path",
      "Correction and rollback path",
      "V15.3",
      context.correctionReadinessScore,
      context.reviewerAccountabilityScore,
      gapPressure,
      "Define correction path before manual conversion can become operational.",
    ),
    buildSourceNode(
      "PHRW_NODE_007",
      "go-no-go",
      "Review activation go/no-go",
      "V15.3",
      context.manualGateDesignScore,
      context.reviewerAccountabilityScore,
      gapPressure,
      "Keep review persistence and conversion blocked in this version.",
    ),
    buildSourceNode(
      "PHRW_NODE_008",
      "human-signoff",
      "Human review board signoff",
      "V15.3",
      context.reviewMaturityScore,
      context.reviewerAccountabilityScore,
      gapPressure,
      "Keep operational review activation blocked until human signoff.",
    ),
  ];
}

function buildReviewStateMachine(context: Required<PersistentHumanReviewInput>): ReviewStateMachineItem[] {
  return [
    {
      id: "PHRW_STATE_001",
      label: "DRAFT",
      lane: "review-state-machine",
      stateScore: clampScore(context.reviewMaturityScore),
      severity: "info",
      statePurpose: "Initial non-operational review record concept.",
      allowedTransitions: ["PROVIDER_STAGING_HOLD", "REVIEW_REQUIRED", "ARCHIVED"],
      blockedOutcome: "No storage or conversion in V15.3.",
    },
    {
      id: "PHRW_STATE_002",
      label: "PROVIDER_STAGING_HOLD",
      lane: "review-state-machine",
      stateScore: clampScore(context.providerGatewayScore),
      severity: "elevated",
      statePurpose: "Holds cases that would later depend on provider staging output.",
      allowedTransitions: ["REVIEW_REQUIRED", "REJECTED", "ARCHIVED"],
      blockedOutcome: "No provider result processing in V15.3.",
    },
    {
      id: "PHRW_STATE_003",
      label: "REVIEW_REQUIRED",
      lane: "review-state-machine",
      stateScore: clampScore(context.reviewMaturityScore - context.openReviewGapCount),
      severity: severityFromConcern(100 - context.reviewMaturityScore + context.openReviewGapCount * 4),
      statePurpose: "Mandatory human review before any future conversion.",
      allowedTransitions: ["REVIEW_IN_PROGRESS", "REJECTED", "ARCHIVED"],
      blockedOutcome: "No automatic approval.",
    },
    {
      id: "PHRW_STATE_004",
      label: "REVIEW_IN_PROGRESS",
      lane: "review-state-machine",
      stateScore: clampScore(context.reviewerAccountabilityScore),
      severity: "elevated",
      statePurpose: "Reviewer-owned evaluation state with reason requirement.",
      allowedTransitions: ["APPROVED_FOR_MANUAL_CONVERSION", "REJECTED", "ARCHIVED"],
      blockedOutcome: "No persistence in V15.3.",
    },
    {
      id: "PHRW_STATE_005",
      label: "APPROVED_FOR_MANUAL_CONVERSION",
      lane: "manual-conversion-gate",
      stateScore: clampScore(context.manualGateDesignScore),
      severity: "critical",
      statePurpose: "Future state that can only open a manual preview gate.",
      allowedTransitions: ["ARCHIVED"],
      blockedOutcome: "No task or intervention creation in V15.3.",
    },
    {
      id: "PHRW_STATE_006",
      label: "REJECTED",
      lane: "review-state-machine",
      stateScore: clampScore(context.reviewerAccountabilityScore),
      severity: "watch",
      statePurpose: "Reviewer rejects AI case output as unsafe, insufficient or not useful.",
      allowedTransitions: ["ARCHIVED"],
      blockedOutcome: "No operational follow-up.",
    },
    {
      id: "PHRW_STATE_007",
      label: "ARCHIVED",
      lane: "review-state-machine",
      stateScore: clampScore(context.correctionReadinessScore),
      severity: "watch",
      statePurpose: "Closed record concept for future storage lifecycle.",
      allowedTransitions: [],
      blockedOutcome: "No archive persistence in V15.3.",
    },
  ];
}

function buildReviewerOwnershipPlan(context: Required<PersistentHumanReviewInput>): ReviewerOwnershipItem[] {
  return [
    {
      id: "PHRW_OWNER_001",
      label: "Primary reviewer owner",
      lane: "reviewer-ownership",
      ownershipScore: clampScore(context.reviewerAccountabilityScore),
      priority: context.reviewerAccountabilityScore < 75 ? "urgent" : "high",
      ownerRole: "primary agronomic reviewer",
      requiredBeforeUse: ["reviewer identity", "review state", "review reason", "timestamped event"],
      blockedOutcome: "No anonymous approval.",
    },
    {
      id: "PHRW_OWNER_002",
      label: "Safety reviewer owner",
      lane: "reviewer-ownership",
      ownershipScore: clampScore(context.reviewMaturityScore - context.openReviewGapCount),
      priority: "high",
      ownerRole: "agronomic safety reviewer",
      requiredBeforeUse: ["unsafe output hold", "conversion blocker review", "non-operational guard"],
      blockedOutcome: "No unsafe output conversion.",
    },
    {
      id: "PHRW_OWNER_003",
      label: "Conversion reviewer owner",
      lane: "reviewer-ownership",
      ownershipScore: clampScore(context.manualGateDesignScore),
      priority: "urgent",
      ownerRole: "manual conversion reviewer",
      requiredBeforeUse: ["conversion preview", "manual confirmation", "reason required", "correction path"],
      blockedOutcome: "No task or intervention creation in V15.3.",
    },
  ];
}

function buildReasonRequirementPlan(context: Required<PersistentHumanReviewInput>): ReviewReasonRequirementItem[] {
  return [
    {
      id: "PHRW_REASON_001",
      label: "Approval reason requirement",
      lane: "reason-requirement",
      reasonScore: clampScore(context.reviewerAccountabilityScore - context.reasonRequirementItemCount),
      severity: severityFromConcern(100 - context.reviewerAccountabilityScore + context.reasonRequirementItemCount * 4),
      reasonQuestion: "What reason is required before approval for manual conversion?",
      requiredReasonFields: ["review basis", "evidence caveat", "safety caveat", "manual conversion note"],
      manualResolution: "Require explicit human rationale before future conversion gate.",
    },
    {
      id: "PHRW_REASON_002",
      label: "Rejection reason requirement",
      lane: "reason-requirement",
      reasonScore: clampScore(context.reviewMaturityScore - context.reasonRequirementItemCount),
      severity: "elevated",
      reasonQuestion: "What reason is required when AI output is rejected?",
      requiredReasonFields: ["reject reason", "unsafe marker", "insufficient evidence marker", "archive note"],
      manualResolution: "Require rejection reason before closure.",
    },
    {
      id: "PHRW_REASON_003",
      label: "Hold reason requirement",
      lane: "reason-requirement",
      reasonScore: clampScore(context.correctionReadinessScore),
      severity: "elevated",
      reasonQuestion: "What reason is required when review cannot proceed?",
      requiredReasonFields: ["hold reason", "missing evidence note", "reviewer follow-up note"],
      manualResolution: "Hold remains non-operational.",
    },
  ];
}

function buildAuditTrailDesign(context: Required<PersistentHumanReviewInput>): ReviewAuditTrailDesignItem[] {
  return [
    {
      id: "PHRW_TRAIL_001",
      label: "Review state transition event",
      lane: "audit-trail-design",
      trailScore: clampScore(context.storageBlueprintScore),
      severity: severityFromConcern(100 - context.storageBlueprintScore + context.auditTrailItemCount * 4),
      trailQuestion: "How will review state transitions be replayed later?",
      eventFields: ["case reference", "from state", "to state", "reviewer", "reason", "created at"],
      blockedOutcome: "No audit event persistence in V15.3.",
    },
    {
      id: "PHRW_TRAIL_002",
      label: "Manual conversion preview event",
      lane: "audit-trail-design",
      trailScore: clampScore(context.manualGateDesignScore),
      severity: "critical",
      trailQuestion: "How will conversion preview be captured before future work creation?",
      eventFields: ["case reference", "preview type", "reviewer", "reason", "blocked outputs"],
      blockedOutcome: "No conversion event persistence in V15.3.",
    },
    {
      id: "PHRW_TRAIL_003",
      label: "Correction event",
      lane: "audit-trail-design",
      trailScore: clampScore(context.correctionReadinessScore),
      severity: "elevated",
      trailQuestion: "How will later corrections be linked back to review decisions?",
      eventFields: ["case reference", "correction reason", "reviewer", "related work item reference"],
      blockedOutcome: "No correction event persistence in V15.3.",
    },
  ];
}

function buildManualConversionGatePlan(context: Required<PersistentHumanReviewInput>): ManualConversionGateItem[] {
  return [
    {
      id: "PHRW_CONVERSION_001",
      label: "Manual task conversion preview",
      lane: "manual-conversion-gate",
      gateScore: clampScore(context.manualGateDesignScore),
      priority: "urgent",
      conversionQuestion: "Can a reviewed AI case become a task only through manual preview?",
      requiredBeforeConversion: ["approved review state", "task preview", "reviewer reason", "manual confirmation"],
      blockedOutcome: "No task creation in V15.3.",
    },
    {
      id: "PHRW_CONVERSION_002",
      label: "Manual intervention conversion preview",
      lane: "manual-conversion-gate",
      gateScore: clampScore(context.manualGateDesignScore - context.conversionGateItemCount),
      priority: "urgent",
      conversionQuestion: "Can a reviewed AI case become an intervention only through manual preview?",
      requiredBeforeConversion: ["approved review state", "intervention preview", "safety caveat", "manual confirmation"],
      blockedOutcome: "No intervention creation in V15.3.",
    },
    {
      id: "PHRW_CONVERSION_003",
      label: "No execution conversion",
      lane: "manual-conversion-gate",
      gateScore: 100,
      priority: "urgent",
      conversionQuestion: "Can any conversion trigger execution?",
      requiredBeforeConversion: ["manual dispatch only", "no automatic execution", "no product guidance", "no dosage guidance"],
      blockedOutcome: "No automatic execution, product prescription or dosage advice.",
    },
  ];
}

function buildCorrectionPathPlan(context: Required<PersistentHumanReviewInput>): CorrectionPathItem[] {
  return [
    {
      id: "PHRW_CORRECTION_001",
      label: "Reviewer correction path",
      lane: "correction-path",
      correctionScore: clampScore(context.correctionReadinessScore),
      severity: severityFromConcern(100 - context.correctionReadinessScore + context.correctionPathItemCount * 4),
      correctionQuestion: "How can a reviewer correct a prior review decision?",
      manualResolution: "Require correction reason and audit trail design before activation.",
    },
    {
      id: "PHRW_CORRECTION_002",
      label: "Manual work correction path",
      lane: "correction-path",
      correctionScore: clampScore(context.correctionReadinessScore - context.openReviewGapCount),
      severity: "critical",
      correctionQuestion: "How can a future manually converted work item be corrected?",
      manualResolution: "Require linked review case and correction event before conversion activation.",
    },
    {
      id: "PHRW_CORRECTION_003",
      label: "Archive correction path",
      lane: "correction-path",
      correctionScore: clampScore(context.reviewMaturityScore - context.correctionPathItemCount),
      severity: "watch",
      correctionQuestion: "How can archived AI cases be reopened or annotated?",
      manualResolution: "Design archive note and reviewer ownership before storage activation.",
    },
  ];
}

function buildReviewGoNoGoBoard(context: Required<PersistentHumanReviewInput>): ReviewGoNoGoItem[] {
  return [
    {
      id: "PHRW_GONOGO_001",
      label: "Persistent review design",
      lane: "go-no-go",
      goNoGoState: "design-only",
      score: clampScore(context.reviewMaturityScore),
      severity: "watch",
      requiredBeforeGo: ["state machine", "owner roles", "reason requirement", "audit trail"],
      safeOutcome: "Design only in V15.3.",
    },
    {
      id: "PHRW_GONOGO_002",
      label: "Manual conversion activation",
      lane: "go-no-go",
      goNoGoState: "no-go",
      score: clampScore(context.manualGateDesignScore),
      severity: "critical",
      requiredBeforeGo: ["persistent review records", "case storage", "preview UI", "correction path"],
      safeOutcome: "Blocked in V15.3.",
    },
    {
      id: "PHRW_GONOGO_003",
      label: "Operational AI beta conversion",
      lane: "go-no-go",
      goNoGoState: "no-go",
      score: clampScore(context.correctionReadinessScore),
      severity: "critical",
      requiredBeforeGo: ["provider staging", "case persistence", "human review persistence", "manual gate rehearsal"],
      safeOutcome: "Blocked until later controlled beta.",
    },
  ];
}

function buildReviewWorkflowGates(
  context: Required<PersistentHumanReviewInput>,
  sourceNodes: PersistentHumanReviewSourceNode[],
): PersistentHumanReviewGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PHRW_GATE_001",
      label: "Review workflow remains dry-run design",
      lane: "review-state-machine" as PersistentHumanReviewLane,
      score: 100,
      reviewer: "review workflow reviewer",
      requiredEvidence: ["state machine", "guardrails", "no persistence"],
      hardStop: "Do not persist review records in V15.3.",
    },
    {
      id: "PHRW_GATE_002",
      label: "Reviewer ownership is defined enough",
      lane: "reviewer-ownership" as PersistentHumanReviewLane,
      score: context.reviewerAccountabilityScore - context.reviewerOwnershipItemCount * 3,
      reviewer: "review ownership reviewer",
      requiredEvidence: ["owner roles", "reviewer reason", "accountability path"],
      hardStop: "Do not activate review workflow without reviewer ownership.",
    },
    {
      id: "PHRW_GATE_003",
      label: "Reason requirement is defined enough",
      lane: "reason-requirement" as PersistentHumanReviewLane,
      score: context.reviewerAccountabilityScore - context.reasonRequirementItemCount * 3,
      reviewer: context.reviewLeadRole,
      requiredEvidence: ["approval reason", "rejection reason", "hold reason"],
      hardStop: "Do not approve AI output without reviewer reason.",
    },
    {
      id: "PHRW_GATE_004",
      label: "Manual conversion gate remains blocked",
      lane: "manual-conversion-gate" as PersistentHumanReviewLane,
      score: 100 - context.conversionGateItemCount * 6,
      reviewer: "conversion gate reviewer",
      requiredEvidence: ["conversion preview", "manual confirmation", "no automatic execution"],
      hardStop: "Do not create tasks or interventions in V15.3.",
    },
    {
      id: "PHRW_GATE_005",
      label: "Correction path is designed enough",
      lane: "correction-path" as PersistentHumanReviewLane,
      score: context.correctionReadinessScore - context.correctionPathItemCount * 3,
      reviewer: "correction reviewer",
      requiredEvidence: ["correction reason", "linked case concept", "manual correction path"],
      hardStop: "Do not enable manual conversion without correction path.",
    },
    {
      id: "PHRW_GATE_006",
      label: "Source blockers are within review design tolerance",
      lane: "human-signoff" as PersistentHumanReviewLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before review-operating-model-ready state.",
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

function buildReviewBoardPack(context: Required<PersistentHumanReviewInput>): PersistentHumanReviewBoardPackItem[] {
  return [
    {
      id: "PHRW_PACK_001",
      label: "Review state machine packet",
      lane: "review-state-machine",
      packReady: context.reviewMaturityScore >= 65,
      readinessScore: clampScore(context.reviewMaturityScore),
      reviewerCheck: "Confirm review state machine remains planning-only in V15.3.",
      includedSections: ["states", "transitions", "owner roles"],
      blockedSections: ["review record persistence", "automatic approval"],
    },
    {
      id: "PHRW_PACK_002",
      label: "Manual conversion gate packet",
      lane: "manual-conversion-gate",
      packReady: context.manualGateDesignScore >= 55,
      readinessScore: clampScore(context.manualGateDesignScore),
      reviewerCheck: "Confirm conversion gate blocks task and intervention creation.",
      includedSections: ["task preview", "intervention preview", "manual confirmation"],
      blockedSections: ["automatic task creation", "automatic intervention creation", "execution"],
    },
    {
      id: "PHRW_PACK_003",
      label: "Correction and accountability packet",
      lane: "correction-path",
      packReady: context.correctionReadinessScore >= 55,
      readinessScore: clampScore((context.correctionReadinessScore + context.reviewerAccountabilityScore) / 2),
      reviewerCheck: "Confirm reviewer accountability and correction path before activation.",
      includedSections: ["reviewer reason", "correction reason", "audit trail design"],
      blockedSections: ["anonymous review", "untraceable conversion"],
    },
  ];
}

function buildReviewRiskRegister(
  context: Required<PersistentHumanReviewInput>,
  sourceNodes: PersistentHumanReviewSourceNode[],
  gates: PersistentHumanReviewGateItem[],
  goNoGo: ReviewGoNoGoItem[],
): PersistentHumanReviewRiskItem[] {
  const risks: PersistentHumanReviewRiskItem[] = [];

  if (context.openReviewGapCount > 0) {
    risks.push({
      id: "PHRW_RISK_001",
      label: "Open review workflow gaps",
      lane: "go-no-go",
      severity: context.openReviewGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openReviewGapCount} review workflow gaps remain before persistent review activation.`,
      manualResolution: "Resolve through V15.x review, storage and conversion rehearsal work.",
      blocksReviewActivation: true,
    });
  }

  if (context.manualGateDesignScore < 70) {
    risks.push({
      id: "PHRW_RISK_002",
      label: "Manual conversion gate not ready",
      lane: "manual-conversion-gate",
      severity: "critical",
      reason: "Manual conversion gate design is below activation threshold.",
      manualResolution: "Complete conversion preview, confirmation and correction path before activation.",
      blocksReviewActivation: true,
    });
  }

  if (context.reviewerAccountabilityScore < 75) {
    risks.push({
      id: "PHRW_RISK_003",
      label: "Reviewer accountability incomplete",
      lane: "reviewer-ownership",
      severity: "elevated",
      reason: "Reviewer accountability plan is not mature enough for persistent workflow activation.",
      manualResolution: "Complete reviewer ownership, reason requirements and audit event design.",
      blocksReviewActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `PHRW_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksReviewActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `PHRW_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Review workflow gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksReviewActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      risks.push({
        id: `PHRW_GONOGO_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksReviewActivation: true,
      });
    });

  return risks;
}

export function buildAiPersistentHumanReviewWorkflowReport(
  input: PersistentHumanReviewInput = {},
): PersistentHumanReviewReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const reviewStateMachine = buildReviewStateMachine(context);
  const reviewerOwnershipPlan = buildReviewerOwnershipPlan(context);
  const reasonRequirementPlan = buildReasonRequirementPlan(context);
  const auditTrailDesign = buildAuditTrailDesign(context);
  const manualConversionGatePlan = buildManualConversionGatePlan(context);
  const correctionPathPlan = buildCorrectionPathPlan(context);
  const reviewGoNoGoBoard = buildReviewGoNoGoBoard(context);
  const reviewWorkflowGates = buildReviewWorkflowGates(context, sourceNodes);
  const reviewBoardPack = buildReviewBoardPack(context);
  const reviewRiskRegister = buildReviewRiskRegister(
    context,
    sourceNodes,
    reviewWorkflowGates,
    reviewGoNoGoBoard,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const stateAverage =
    reviewStateMachine.reduce((sum, item) => sum + item.stateScore, 0) /
    Math.max(1, reviewStateMachine.length);

  const ownershipAverage =
    reviewerOwnershipPlan.reduce((sum, item) => sum + item.ownershipScore, 0) /
    Math.max(1, reviewerOwnershipPlan.length);

  const gateAverage =
    reviewWorkflowGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, reviewWorkflowGates.length);

  const riskPenalty = reviewRiskRegister.filter((item) => item.blocksReviewActivation).length * 7;
  const ownershipPressure =
    reviewerOwnershipPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, reviewerOwnershipPlan.length * 4);

  const reviewWorkflowScore = clampScore(
    sourceAverage / 4 +
      stateAverage / 4 +
      ownershipAverage / 4 +
      gateAverage / 4 +
      ownershipPressure -
      riskPenalty -
      context.openReviewGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openReviewGapCount * 8 +
        context.reviewerOwnershipItemCount * 5 +
        context.reasonRequirementItemCount * 5 +
        context.conversionGateItemCount * 7 +
        context.correctionPathItemCount * 6,
    ),
  );

  const reviewWorkflowStatus = bandFromScore(
    reviewWorkflowScore,
    reviewRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PERSISTENT_HUMAN_REVIEW_GUARDRAIL,
    reviewWorkflowScore,
    reviewWorkflowStatus,
    overallSeverity,
    sourceNodes,
    reviewStateMachine,
    reviewerOwnershipPlan,
    reasonRequirementPlan,
    auditTrailDesign,
    manualConversionGatePlan,
    correctionPathPlan,
    reviewGoNoGoBoard,
    reviewWorkflowGates,
    reviewBoardPack,
    reviewRiskRegister,
    stagedRoadmap: {
      v153: "Persistent human review workflow and manual conversion gate design only.",
      v154: "Provider staging shadow run with no production activation.",
      v155: "Migration rehearsal and storage gate validation in staging only.",
      v156: "Manual conversion rehearsal with no automatic execution.",
      v160: "Controlled production beta only after provider, storage, review and conversion gates pass.",
    },
    redactedExportBundle: {
      exportId: "persistent_human_review_workflow_v15_3_redacted_dry_run",
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
        "review state machine",
        "reviewer ownership plan",
        "reason requirement plan",
        "audit trail design",
        "manual conversion gate plan",
        "correction path plan",
        "review go/no-go board",
        "review workflow gates",
        "review board pack",
        "risk register",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Persistent human review workflow is local dry-run only.",
      "No review record persistence, schema write, case storage, memory write, task creation, intervention creation or execution is performed.",
      "Manual conversion is designed but remains blocked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V15.3 prepares review workflow and manual conversion gate design only.",
    ],
  };
}

export const aiPersistentHumanReviewWorkflowVersion = "V15.3";
