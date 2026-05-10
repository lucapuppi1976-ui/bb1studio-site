export type HumanReviewMissionControlMode = "dry-run" | "human-review-board";

export type HumanReviewSeverity = "info" | "watch" | "elevated" | "critical";

export type HumanReviewPriority = "low" | "medium" | "high" | "urgent";

export type HumanReviewReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "mission-control-ready";

export type HumanReviewLane =
  | "review-queue"
  | "evidence-arbitration"
  | "reviewer-disagreement"
  | "confidence-calibration"
  | "decision-lock"
  | "escalation-board"
  | "audit-packet"
  | "human-signoff";

export interface HumanReviewMissionControlGuardrail {
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
  humanMissionControlReady: true;
  evidenceArbitrationReady: true;
  reviewerDisagreementReady: true;
  humanSignoffPacketReady: true;
}

export interface HumanReviewMissionControlInput {
  pendingReviewCaseCount?: number;
  highPriorityReviewCount?: number;
  evidenceConflictCount?: number;
  reviewerDisagreementCount?: number;
  unresolvedEscalationCount?: number;
  evidenceQualityScore?: number;
  reviewerConfidenceScore?: number;
  arbitrationCoverageScore?: number;
  decisionLockScore?: number;
  auditPacketScore?: number;
  finalReadinessAuditScore?: number;
  missionLeadRole?: string;
}

export interface HumanReviewSourceNode {
  id: string;
  lane: HumanReviewLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: HumanReviewSeverity;
  priority: HumanReviewPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ReviewQueueItem {
  id: string;
  label: string;
  lane: HumanReviewLane;
  priority: HumanReviewPriority;
  severity: HumanReviewSeverity;
  reviewReason: string;
  requiredReviewer: string;
  safeOutcome: string;
}

export interface EvidenceArbitrationItem {
  id: string;
  label: string;
  lane: HumanReviewLane;
  evidenceScore: number;
  conflictCount: number;
  severity: HumanReviewSeverity;
  arbitrationQuestion: string;
  manualResolution: string;
}

export interface ReviewerDisagreementItem {
  id: string;
  label: string;
  lane: HumanReviewLane;
  disagreementScore: number;
  reviewerA: string;
  reviewerB: string;
  severity: HumanReviewSeverity;
  resolutionProtocol: string;
}

export interface ConfidenceCalibrationItem {
  id: string;
  label: string;
  lane: HumanReviewLane;
  currentScore: number;
  targetScore: number;
  severity: HumanReviewSeverity;
  reviewerQuestion: string;
}

export interface DecisionLockItem {
  id: string;
  label: string;
  lane: HumanReviewLane;
  lockEnforced: true;
  severity: HumanReviewSeverity;
  lockStatement: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface EscalationBoardItem {
  id: string;
  priority: HumanReviewPriority;
  reviewer: string;
  escalationQuestion: string;
  requiredEvidence: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface AuditPacketItem {
  id: string;
  label: string;
  lane: HumanReviewLane;
  packetReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface HumanSignoffItem {
  id: string;
  label: string;
  lane: HumanReviewLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface HumanReviewRiskItem {
  id: string;
  label: string;
  lane: HumanReviewLane;
  severity: HumanReviewSeverity;
  reason: string;
  manualResolution: string;
  blocksMissionControl: boolean;
}

export interface HumanReviewMissionControlReport {
  generatedAt: string;
  mode: HumanReviewMissionControlMode;
  context: Required<HumanReviewMissionControlInput>;
  readiness: HumanReviewMissionControlGuardrail;
  missionControlScore: number;
  missionControlStatus: HumanReviewReadinessBand;
  overallSeverity: HumanReviewSeverity;
  sourceNodes: HumanReviewSourceNode[];
  reviewQueue: ReviewQueueItem[];
  evidenceArbitration: EvidenceArbitrationItem[];
  reviewerDisagreements: ReviewerDisagreementItem[];
  confidenceCalibration: ConfidenceCalibrationItem[];
  decisionLocks: DecisionLockItem[];
  escalationBoard: EscalationBoardItem[];
  auditPacket: AuditPacketItem[];
  humanSignoff: HumanSignoffItem[];
  missionRiskRegister: HumanReviewRiskItem[];
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

export const HUMAN_REVIEW_MISSION_CONTROL_READINESS: HumanReviewMissionControlGuardrail = {
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
  humanMissionControlReady: true,
  evidenceArbitrationReady: true,
  reviewerDisagreementReady: true,
  humanSignoffPacketReady: true,
};

const priorityWeight: Record<HumanReviewPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: HumanReviewMissionControlInput): Required<HumanReviewMissionControlInput> {
  return {
    pendingReviewCaseCount: input.pendingReviewCaseCount ?? 14,
    highPriorityReviewCount: input.highPriorityReviewCount ?? 5,
    evidenceConflictCount: input.evidenceConflictCount ?? 6,
    reviewerDisagreementCount: input.reviewerDisagreementCount ?? 4,
    unresolvedEscalationCount: input.unresolvedEscalationCount ?? 5,
    evidenceQualityScore: input.evidenceQualityScore ?? 73,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    arbitrationCoverageScore: input.arbitrationCoverageScore ?? 72,
    decisionLockScore: input.decisionLockScore ?? 78,
    auditPacketScore: input.auditPacketScore ?? 71,
    finalReadinessAuditScore: input.finalReadinessAuditScore ?? 70,
    missionLeadRole: input.missionLeadRole ?? "human review mission lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): HumanReviewSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: HumanReviewSeverity): HumanReviewPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): HumanReviewReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "mission-control-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: HumanReviewLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): HumanReviewSourceNode {
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
        ? ["Human review mission control is below reviewer threshold.", "Reviewer must resolve evidence conflicts, disagreements and escalation context."]
        : [],
  };
}

function buildSourceNodes(context: Required<HumanReviewMissionControlInput>): HumanReviewSourceNode[] {
  const queuePressure = context.pendingReviewCaseCount * 2;
  const conflictPressure = context.evidenceConflictCount * 4;
  const disagreementPressure = context.reviewerDisagreementCount * 5;
  const escalationPressure = context.unresolvedEscalationCount * 4;

  return [
    buildSourceNode(
      "HRMC_NODE_001",
      "review-queue",
      "Review queue pressure",
      "V13.0",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      queuePressure,
      "Prioritize pending review cases and confirm no automatic decision is made.",
    ),
    buildSourceNode(
      "HRMC_NODE_002",
      "evidence-arbitration",
      "Evidence arbitration readiness",
      "V13.0",
      context.arbitrationCoverageScore,
      context.evidenceQualityScore,
      conflictPressure,
      "Resolve conflicting evidence through human arbitration.",
    ),
    buildSourceNode(
      "HRMC_NODE_003",
      "reviewer-disagreement",
      "Reviewer disagreement protocol",
      "V13.0",
      context.reviewerConfidenceScore,
      context.arbitrationCoverageScore,
      disagreementPressure,
      "Route reviewer disagreements to escalation board.",
    ),
    buildSourceNode(
      "HRMC_NODE_004",
      "confidence-calibration",
      "Confidence calibration",
      "V13.0",
      context.evidenceQualityScore,
      context.reviewerConfidenceScore,
      conflictPressure / 2,
      "Calibrate evidence confidence without finalizing decisions.",
    ),
    buildSourceNode(
      "HRMC_NODE_005",
      "decision-lock",
      "Decision lock enforcement",
      "V13.0",
      context.decisionLockScore,
      context.reviewerConfidenceScore,
      escalationPressure,
      "Confirm all operational outcomes remain locked.",
    ),
    buildSourceNode(
      "HRMC_NODE_006",
      "audit-packet",
      "Audit packet readiness",
      "V13.0",
      context.auditPacketScore,
      context.evidenceQualityScore,
      escalationPressure,
      "Prepare a redacted audit packet for manual board review.",
    ),
    buildSourceNode(
      "HRMC_NODE_007",
      "human-signoff",
      "Final readiness audit linkage",
      "V12.9",
      context.finalReadinessAuditScore,
      context.reviewerConfidenceScore,
      escalationPressure + disagreementPressure / 2,
      "Link provider readiness audit into human review mission control.",
    ),
    buildSourceNode(
      "HRMC_NODE_008",
      "escalation-board",
      "Escalation board capacity",
      "V13.0",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      context.highPriorityReviewCount * 5,
      "Confirm high-priority cases remain manual and review-only.",
    ),
  ];
}

function buildReviewQueue(context: Required<HumanReviewMissionControlInput>): ReviewQueueItem[] {
  return [
    {
      id: "HRMC_QUEUE_001",
      label: "High-priority evidence conflict",
      lane: "review-queue",
      priority: context.evidenceConflictCount >= 6 ? "urgent" : "high",
      severity: context.evidenceConflictCount >= 6 ? "critical" : "elevated",
      reviewReason: `${context.evidenceConflictCount} evidence conflicts require arbitration.`,
      requiredReviewer: "evidence arbitration reviewer",
      safeOutcome: "Manual evidence review only.",
    },
    {
      id: "HRMC_QUEUE_002",
      label: "Reviewer disagreement queue",
      lane: "reviewer-disagreement",
      priority: context.reviewerDisagreementCount >= 4 ? "urgent" : "high",
      severity: context.reviewerDisagreementCount >= 4 ? "elevated" : "watch",
      reviewReason: `${context.reviewerDisagreementCount} reviewer disagreements require board routing.`,
      requiredReviewer: "mission lead reviewer",
      safeOutcome: "Manual disagreement resolution only.",
    },
    {
      id: "HRMC_QUEUE_003",
      label: "Escalation board queue",
      lane: "escalation-board",
      priority: context.unresolvedEscalationCount >= 5 ? "urgent" : "high",
      severity: context.unresolvedEscalationCount >= 5 ? "critical" : "elevated",
      reviewReason: `${context.unresolvedEscalationCount} escalation topics remain unresolved.`,
      requiredReviewer: context.missionLeadRole,
      safeOutcome: "Manual escalation board note only.",
    },
  ];
}

function buildEvidenceArbitration(context: Required<HumanReviewMissionControlInput>): EvidenceArbitrationItem[] {
  return [
    {
      id: "HRMC_ARBITRATION_001",
      label: "Photo evidence versus temporal trend",
      lane: "evidence-arbitration",
      evidenceScore: clampScore(context.evidenceQualityScore),
      conflictCount: Math.max(1, Math.round(context.evidenceConflictCount / 2)),
      severity: severityFromConcern(context.evidenceConflictCount * 10),
      arbitrationQuestion: "Which evidence source is strongest and what remains uncertain?",
      manualResolution: "Document reviewer arbitration manually; do not finalize diagnosis.",
    },
    {
      id: "HRMC_ARBITRATION_002",
      label: "Memory pattern versus current case",
      lane: "evidence-arbitration",
      evidenceScore: clampScore(context.arbitrationCoverageScore),
      conflictCount: Math.max(1, Math.round(context.evidenceConflictCount / 3)),
      severity: severityFromConcern(context.evidenceConflictCount * 8),
      arbitrationQuestion: "Does case memory support or contradict the current evidence?",
      manualResolution: "Route conflict to human review packet.",
    },
    {
      id: "HRMC_ARBITRATION_003",
      label: "Action readiness versus safety locks",
      lane: "decision-lock",
      evidenceScore: clampScore(context.decisionLockScore),
      conflictCount: Math.max(1, context.highPriorityReviewCount),
      severity: "critical",
      arbitrationQuestion: "Are any operational suggestions safely locked?",
      manualResolution: "Keep all execution, task and intervention paths locked.",
    },
  ];
}

function buildReviewerDisagreements(context: Required<HumanReviewMissionControlInput>): ReviewerDisagreementItem[] {
  return [
    {
      id: "HRMC_DISAGREE_001",
      label: "Diagnosis interpretation disagreement",
      lane: "reviewer-disagreement",
      disagreementScore: clampScore(context.reviewerDisagreementCount * 18),
      reviewerA: "agronomic reviewer",
      reviewerB: "evidence reviewer",
      severity: severityFromConcern(context.reviewerDisagreementCount * 15),
      resolutionProtocol: "Escalate to mission lead and require written rationale.",
    },
    {
      id: "HRMC_DISAGREE_002",
      label: "Evidence sufficiency disagreement",
      lane: "reviewer-disagreement",
      disagreementScore: clampScore(context.evidenceConflictCount * 12),
      reviewerA: "photo evidence reviewer",
      reviewerB: "case memory reviewer",
      severity: severityFromConcern(context.evidenceConflictCount * 10),
      resolutionProtocol: "Compare evidence packets and hold all operational outcomes.",
    },
  ];
}

function buildConfidenceCalibration(context: Required<HumanReviewMissionControlInput>): ConfidenceCalibrationItem[] {
  return [
    {
      id: "HRMC_CALIBRATION_001",
      label: "Evidence confidence calibration",
      lane: "confidence-calibration",
      currentScore: clampScore(context.evidenceQualityScore),
      targetScore: 86,
      severity: severityFromConcern((86 - context.evidenceQualityScore) * 4),
      reviewerQuestion: "Is evidence strong enough for reviewer confidence, not for automatic action?",
    },
    {
      id: "HRMC_CALIBRATION_002",
      label: "Reviewer agreement calibration",
      lane: "confidence-calibration",
      currentScore: clampScore(context.reviewerConfidenceScore - context.reviewerDisagreementCount * 4),
      targetScore: 84,
      severity: severityFromConcern((84 - context.reviewerConfidenceScore) * 4 + context.reviewerDisagreementCount * 8),
      reviewerQuestion: "Do reviewers agree enough to prepare a signoff packet?",
    },
    {
      id: "HRMC_CALIBRATION_003",
      label: "Decision lock calibration",
      lane: "decision-lock",
      currentScore: clampScore(context.decisionLockScore),
      targetScore: 92,
      severity: severityFromConcern((92 - context.decisionLockScore) * 3),
      reviewerQuestion: "Are all automatic and operational pathways locked?",
    },
  ];
}

function buildDecisionLocks(): DecisionLockItem[] {
  return [
    {
      id: "HRMC_LOCK_001",
      label: "Provider decision lock",
      lane: "decision-lock",
      lockEnforced: true,
      severity: "critical",
      lockStatement: "No provider output can become a decision.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "HRMC_LOCK_002",
      label: "Operational decision lock",
      lane: "decision-lock",
      lockEnforced: true,
      severity: "critical",
      lockStatement: "No review output can create work.",
      blockedOutcome: "No task, intervention, dispatch or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "HRMC_LOCK_003",
      label: "Prescriptive decision lock",
      lane: "decision-lock",
      lockEnforced: true,
      severity: "critical",
      lockStatement: "No review output can prescribe products, dosages or production estimates.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildEscalationBoard(
  context: Required<HumanReviewMissionControlInput>,
  sourceNodes: HumanReviewSourceNode[],
): EscalationBoardItem[] {
  return [
    {
      id: "HRMC_ESCALATION_001",
      priority: context.evidenceConflictCount >= 6 ? "urgent" : "high",
      reviewer: "evidence arbitration reviewer",
      escalationQuestion: "Which evidence conflicts must be resolved before signoff?",
      requiredEvidence: ["Evidence arbitration board", "Confidence calibration", "Decision locks"],
      safeOutcome: "Manual arbitration note only.",
      manualOnly: true,
    },
    {
      id: "HRMC_ESCALATION_002",
      priority: context.reviewerDisagreementCount >= 4 ? "urgent" : "high",
      reviewer: context.missionLeadRole,
      escalationQuestion: "Which reviewer disagreements require mission lead review?",
      requiredEvidence: ["Reviewer disagreement register", "Audit packet", "Human signoff packet"],
      safeOutcome: "Manual disagreement note only.",
      manualOnly: true,
    },
    {
      id: "HRMC_ESCALATION_003",
      priority: sourceNodes.some((node) => node.blockers.length > 0) ? "urgent" : "medium",
      reviewer: context.missionLeadRole,
      escalationQuestion: "Can the case proceed to human signoff packet without automatic action?",
      requiredEvidence: sourceNodes.map((node) => node.title),
      safeOutcome: "Human signoff packet review only.",
      manualOnly: true,
    },
  ];
}

function buildAuditPacket(context: Required<HumanReviewMissionControlInput>): AuditPacketItem[] {
  return [
    {
      id: "HRMC_PACKET_001",
      label: "Evidence arbitration packet",
      lane: "audit-packet",
      packetReady: context.arbitrationCoverageScore >= 70,
      readinessScore: clampScore(context.arbitrationCoverageScore),
      reviewerCheck: "Confirm evidence arbitration is documented and redacted.",
      includedSections: ["Evidence conflicts", "Reviewer notes", "Uncertainty status"],
      blockedSections: ["Provider payload", "Private notes", "Operational instruction"],
    },
    {
      id: "HRMC_PACKET_002",
      label: "Decision lock packet",
      lane: "audit-packet",
      packetReady: context.decisionLockScore >= 70,
      readinessScore: clampScore(context.decisionLockScore),
      reviewerCheck: "Confirm locks block provider, persistence, automation and execution.",
      includedSections: ["Decision locks", "Boundary notes", "Manual review markers"],
      blockedSections: ["Task creation", "Intervention creation", "Execution pathway"],
    },
    {
      id: "HRMC_PACKET_003",
      label: "Final readiness linkage packet",
      lane: "audit-packet",
      packetReady: context.finalReadinessAuditScore >= 70,
      readinessScore: clampScore(context.finalReadinessAuditScore),
      reviewerCheck: "Confirm provider readiness audit remains freeze-only.",
      includedSections: ["Final readiness audit", "Activation freeze", "Non-activation evidence"],
      blockedSections: ["Provider activation", "Runtime adapter activation", "Stored approval"],
    },
  ];
}

function buildHumanSignoff(
  context: Required<HumanReviewMissionControlInput>,
  queue: ReviewQueueItem[],
): HumanSignoffItem[] {
  return [
    {
      id: "HRMC_SIGNOFF_001",
      label: "Evidence signoff",
      lane: "human-signoff",
      signoffReady: context.evidenceConflictCount < 6,
      reviewer: "evidence arbitration reviewer",
      requiredEvidence: queue.map((item) => item.label),
      safeOutcome: "Manual evidence signoff note only.",
    },
    {
      id: "HRMC_SIGNOFF_002",
      label: "Mission lead signoff",
      lane: "human-signoff",
      signoffReady: context.unresolvedEscalationCount < 5,
      reviewer: context.missionLeadRole,
      requiredEvidence: ["Escalation board", "Reviewer disagreement register", "Decision locks"],
      safeOutcome: "Manual mission lead note only.",
    },
    {
      id: "HRMC_SIGNOFF_003",
      label: "Safety signoff",
      lane: "human-signoff",
      signoffReady: true,
      reviewer: "agronomic safety reviewer",
      requiredEvidence: ["Decision locks", "Audit packet", "Provider non-call state"],
      safeOutcome: "Manual safety signoff note only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<HumanReviewMissionControlInput>,
  sourceNodes: HumanReviewSourceNode[],
  queue: ReviewQueueItem[],
  signoff: HumanSignoffItem[],
): HumanReviewRiskItem[] {
  const risks: HumanReviewRiskItem[] = [];

  if (context.evidenceConflictCount > 0) {
    risks.push({
      id: "HRMC_RISK_001",
      label: "Evidence conflicts remain open",
      lane: "evidence-arbitration",
      severity: context.evidenceConflictCount >= 6 ? "critical" : "elevated",
      reason: `${context.evidenceConflictCount} evidence conflicts require arbitration.`,
      manualResolution: "Resolve evidence conflicts manually before signoff.",
      blocksMissionControl: context.evidenceConflictCount >= 6,
    });
  }

  if (context.unresolvedEscalationCount > 0) {
    risks.push({
      id: "HRMC_RISK_002",
      label: "Escalation board load",
      lane: "escalation-board",
      severity: context.unresolvedEscalationCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedEscalationCount} escalation items remain open.`,
      manualResolution: "Close escalation board items manually.",
      blocksMissionControl: context.unresolvedEscalationCount >= 5,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `HRMC_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksMissionControl: node.severity === "critical",
      });
    });

  queue
    .filter((item) => item.priority === "urgent")
    .forEach((item, index) => {
      risks.push({
        id: `HRMC_QUEUE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.reviewReason,
        manualResolution: item.safeOutcome,
        blocksMissionControl: item.severity === "critical",
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `HRMC_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Human signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksMissionControl: true,
      });
    });

  return risks;
}

export function buildAiHumanReviewMissionControlReport(
  input: HumanReviewMissionControlInput = {},
): HumanReviewMissionControlReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const reviewQueue = buildReviewQueue(context);
  const evidenceArbitration = buildEvidenceArbitration(context);
  const reviewerDisagreements = buildReviewerDisagreements(context);
  const confidenceCalibration = buildConfidenceCalibration(context);
  const decisionLocks = buildDecisionLocks();
  const escalationBoard = buildEscalationBoard(context, sourceNodes);
  const auditPacket = buildAuditPacket(context);
  const humanSignoff = buildHumanSignoff(context, reviewQueue);
  const missionRiskRegister = buildRiskRegister(context, sourceNodes, reviewQueue, humanSignoff);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const arbitrationAverage =
    evidenceArbitration.reduce((sum, item) => sum + item.evidenceScore, 0) /
    Math.max(1, evidenceArbitration.length);

  const packetAverage =
    auditPacket.reduce((sum, item) => sum + item.readinessScore, 0) / Math.max(1, auditPacket.length);

  const lockAverage = decisionLocks.length > 0 ? 100 : 0;
  const riskPenalty = missionRiskRegister.filter((item) => item.blocksMissionControl).length * 10;
  const escalationPressure =
    escalationBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, escalationBoard.length * 3);

  const missionControlScore = clampScore(
    sourceAverage / 4 +
      arbitrationAverage / 4 +
      packetAverage / 4 +
      lockAverage / 4 +
      escalationPressure -
      riskPenalty -
      context.evidenceConflictCount -
      context.unresolvedEscalationCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.pendingReviewCaseCount * 3 +
        context.highPriorityReviewCount * 6 +
        context.evidenceConflictCount * 8 +
        context.reviewerDisagreementCount * 8 +
        context.unresolvedEscalationCount * 8,
    ),
  );

  const missionControlStatus = bandFromScore(
    missionControlScore,
    missionRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: HUMAN_REVIEW_MISSION_CONTROL_READINESS,
    missionControlScore,
    missionControlStatus,
    overallSeverity,
    sourceNodes,
    reviewQueue,
    evidenceArbitration,
    reviewerDisagreements,
    confidenceCalibration,
    decisionLocks,
    escalationBoard,
    auditPacket,
    humanSignoff,
    missionRiskRegister,
    redactedExportBundle: {
      exportId: "human_review_mission_control_v13_0_redacted_dry_run",
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
        "review queue",
        "evidence arbitration",
        "reviewer disagreements",
        "confidence calibration",
        "decision locks",
        "escalation board",
        "audit packet",
        "human signoff",
        "risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Human review mission control is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Evidence arbitration, reviewer disagreement handling and signoff packets are review concepts only.",
      "Every decision remains behind human review, decision locks and manual mission control.",
    ],
  };
}

export const aiHumanReviewMissionControlVersion = "V13.0";
