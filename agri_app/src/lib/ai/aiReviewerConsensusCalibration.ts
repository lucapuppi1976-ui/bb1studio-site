export type ReviewerConsensusMode = "dry-run" | "consensus-board-review";

export type ReviewerConsensusSeverity = "info" | "watch" | "elevated" | "critical";

export type ReviewerConsensusPriority = "low" | "medium" | "high" | "urgent";

export type ReviewerConsensusReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "consensus-ready";

export type ReviewerConsensusLane =
  | "consensus-board"
  | "evidence-weighting"
  | "dissent-register"
  | "calibration"
  | "dispute-resolution"
  | "decision-hold"
  | "reviewer-audit"
  | "human-signoff";

export interface ReviewerConsensusCalibrationGuardrail {
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
  reviewerConsensusReady: true;
  evidenceWeightingReady: true;
  disputeResolutionReady: true;
  humanConsensusSignoffReady: true;
}

export interface ReviewerConsensusCalibrationInput {
  reviewerCount?: number;
  pendingConsensusCaseCount?: number;
  evidenceWeightConflictCount?: number;
  dissentItemCount?: number;
  unresolvedDisputeCount?: number;
  evidenceWeightingScore?: number;
  reviewerAlignmentScore?: number;
  calibrationScore?: number;
  disputeResolutionScore?: number;
  decisionHoldScore?: number;
  missionControlScore?: number;
  leadReviewerRole?: string;
}

export interface ReviewerConsensusSourceNode {
  id: string;
  lane: ReviewerConsensusLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ReviewerConsensusSeverity;
  priority: ReviewerConsensusPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface EvidenceWeightingItem {
  id: string;
  label: string;
  lane: ReviewerConsensusLane;
  evidenceWeight: number;
  conflictPressure: number;
  severity: ReviewerConsensusSeverity;
  reviewerQuestion: string;
  manualResolution: string;
}

export interface DissentRegisterItem {
  id: string;
  label: string;
  lane: ReviewerConsensusLane;
  dissentScore: number;
  dissentingRole: string;
  opposingRole: string;
  severity: ReviewerConsensusSeverity;
  dissentReason: string;
  resolutionProtocol: string;
}

export interface CalibrationBoardItem {
  id: string;
  label: string;
  lane: ReviewerConsensusLane;
  currentScore: number;
  targetScore: number;
  severity: ReviewerConsensusSeverity;
  calibrationQuestion: string;
  manualAction: string;
}

export interface DisputeResolutionGate {
  id: string;
  label: string;
  lane: ReviewerConsensusLane;
  passed: boolean;
  score: number;
  severity: ReviewerConsensusSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ConsensusDecisionHold {
  id: string;
  label: string;
  lane: ReviewerConsensusLane;
  holdEnforced: true;
  severity: ReviewerConsensusSeverity;
  holdStatement: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface ConsensusBoardQuestion {
  id: string;
  priority: ReviewerConsensusPriority;
  reviewer: string;
  question: string;
  requiredEvidence: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface ReviewerAuditTrailItem {
  id: string;
  label: string;
  lane: ReviewerConsensusLane;
  auditReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ConsensusSignoffItem {
  id: string;
  label: string;
  lane: ReviewerConsensusLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface ConsensusRiskItem {
  id: string;
  label: string;
  lane: ReviewerConsensusLane;
  severity: ReviewerConsensusSeverity;
  reason: string;
  manualResolution: string;
  blocksConsensus: boolean;
}

export interface ReviewerConsensusCalibrationReport {
  generatedAt: string;
  mode: ReviewerConsensusMode;
  context: Required<ReviewerConsensusCalibrationInput>;
  readiness: ReviewerConsensusCalibrationGuardrail;
  consensusScore: number;
  consensusStatus: ReviewerConsensusReadinessBand;
  overallSeverity: ReviewerConsensusSeverity;
  sourceNodes: ReviewerConsensusSourceNode[];
  evidenceWeighting: EvidenceWeightingItem[];
  dissentRegister: DissentRegisterItem[];
  calibrationBoard: CalibrationBoardItem[];
  disputeResolutionGates: DisputeResolutionGate[];
  decisionHolds: ConsensusDecisionHold[];
  consensusBoard: ConsensusBoardQuestion[];
  reviewerAuditTrail: ReviewerAuditTrailItem[];
  consensusSignoff: ConsensusSignoffItem[];
  consensusRiskRegister: ConsensusRiskItem[];
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

export const REVIEWER_CONSENSUS_CALIBRATION_READINESS: ReviewerConsensusCalibrationGuardrail = {
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
  reviewerConsensusReady: true,
  evidenceWeightingReady: true,
  disputeResolutionReady: true,
  humanConsensusSignoffReady: true,
};

const priorityWeight: Record<ReviewerConsensusPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ReviewerConsensusCalibrationInput): Required<ReviewerConsensusCalibrationInput> {
  return {
    reviewerCount: input.reviewerCount ?? 4,
    pendingConsensusCaseCount: input.pendingConsensusCaseCount ?? 10,
    evidenceWeightConflictCount: input.evidenceWeightConflictCount ?? 6,
    dissentItemCount: input.dissentItemCount ?? 5,
    unresolvedDisputeCount: input.unresolvedDisputeCount ?? 4,
    evidenceWeightingScore: input.evidenceWeightingScore ?? 72,
    reviewerAlignmentScore: input.reviewerAlignmentScore ?? 71,
    calibrationScore: input.calibrationScore ?? 73,
    disputeResolutionScore: input.disputeResolutionScore ?? 70,
    decisionHoldScore: input.decisionHoldScore ?? 78,
    missionControlScore: input.missionControlScore ?? 72,
    leadReviewerRole: input.leadReviewerRole ?? "reviewer consensus lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ReviewerConsensusSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ReviewerConsensusSeverity): ReviewerConsensusPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ReviewerConsensusReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "consensus-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ReviewerConsensusLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ReviewerConsensusSourceNode {
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
        ? ["Reviewer consensus is below signoff threshold.", "Consensus board must resolve dissent, evidence weighting and dispute context."]
        : [],
  };
}

function buildSourceNodes(context: Required<ReviewerConsensusCalibrationInput>): ReviewerConsensusSourceNode[] {
  const pendingPressure = context.pendingConsensusCaseCount * 2;
  const evidencePressure = context.evidenceWeightConflictCount * 4;
  const dissentPressure = context.dissentItemCount * 4;
  const disputePressure = context.unresolvedDisputeCount * 5;

  return [
    buildSourceNode(
      "RCC_NODE_001",
      "consensus-board",
      "Mission control baseline",
      "V13.0",
      context.missionControlScore,
      context.reviewerAlignmentScore,
      pendingPressure,
      "Link mission control into consensus board review.",
    ),
    buildSourceNode(
      "RCC_NODE_002",
      "evidence-weighting",
      "Evidence weighting board",
      "V13.1",
      context.evidenceWeightingScore,
      context.calibrationScore,
      evidencePressure,
      "Resolve weighted evidence conflicts manually.",
    ),
    buildSourceNode(
      "RCC_NODE_003",
      "dissent-register",
      "Reviewer dissent register",
      "V13.1",
      context.reviewerAlignmentScore,
      context.calibrationScore,
      dissentPressure,
      "Record reviewer dissent and route to dispute board.",
    ),
    buildSourceNode(
      "RCC_NODE_004",
      "calibration",
      "Reviewer calibration board",
      "V13.1",
      context.calibrationScore,
      context.reviewerAlignmentScore,
      evidencePressure / 2 + dissentPressure / 2,
      "Calibrate reviewer scoring without producing automatic decisions.",
    ),
    buildSourceNode(
      "RCC_NODE_005",
      "dispute-resolution",
      "Dispute resolution gate",
      "V13.1",
      context.disputeResolutionScore,
      context.reviewerAlignmentScore,
      disputePressure,
      "Resolve unresolved disputes before signoff packet.",
    ),
    buildSourceNode(
      "RCC_NODE_006",
      "decision-hold",
      "Consensus decision hold",
      "V13.1",
      context.decisionHoldScore,
      context.reviewerAlignmentScore,
      pendingPressure,
      "Hold every operational outcome until manual signoff.",
    ),
    buildSourceNode(
      "RCC_NODE_007",
      "reviewer-audit",
      "Reviewer audit trail",
      "V13.1",
      context.calibrationScore,
      context.evidenceWeightingScore,
      evidencePressure + disputePressure / 2,
      "Prepare redacted reviewer audit trail.",
    ),
    buildSourceNode(
      "RCC_NODE_008",
      "human-signoff",
      "Human consensus signoff",
      "V13.1",
      context.reviewerAlignmentScore,
      context.calibrationScore,
      context.reviewerCount * 4,
      "Confirm all consensus signoffs remain manual.",
    ),
  ];
}

function buildEvidenceWeighting(context: Required<ReviewerConsensusCalibrationInput>): EvidenceWeightingItem[] {
  return [
    {
      id: "RCC_WEIGHT_001",
      label: "Photo evidence weighting",
      lane: "evidence-weighting",
      evidenceWeight: clampScore(context.evidenceWeightingScore),
      conflictPressure: context.evidenceWeightConflictCount,
      severity: severityFromConcern(context.evidenceWeightConflictCount * 10),
      reviewerQuestion: "Does photo evidence outweigh contradictory temporal or memory signals?",
      manualResolution: "Document weighting rationale manually; do not finalize diagnosis.",
    },
    {
      id: "RCC_WEIGHT_002",
      label: "Temporal trend weighting",
      lane: "evidence-weighting",
      evidenceWeight: clampScore(context.evidenceWeightingScore - context.evidenceWeightConflictCount * 2),
      conflictPressure: Math.max(1, Math.round(context.evidenceWeightConflictCount / 2)),
      severity: severityFromConcern(context.evidenceWeightConflictCount * 8),
      reviewerQuestion: "Does the temporal signal support or weaken the current case interpretation?",
      manualResolution: "Route unresolved weighting issues to dispute board.",
    },
    {
      id: "RCC_WEIGHT_003",
      label: "Memory pattern weighting",
      lane: "evidence-weighting",
      evidenceWeight: clampScore(context.missionControlScore),
      conflictPressure: Math.max(1, Math.round(context.evidenceWeightConflictCount / 3)),
      severity: severityFromConcern(context.evidenceWeightConflictCount * 7),
      reviewerQuestion: "Does memory pattern similarity create useful context without becoming a decision?",
      manualResolution: "Keep memory evidence contextual and manual.",
    },
  ];
}

function buildDissentRegister(context: Required<ReviewerConsensusCalibrationInput>): DissentRegisterItem[] {
  return [
    {
      id: "RCC_DISSENT_001",
      label: "Diagnosis interpretation dissent",
      lane: "dissent-register",
      dissentScore: clampScore(context.dissentItemCount * 16),
      dissentingRole: "evidence reviewer",
      opposingRole: "agronomic reviewer",
      severity: severityFromConcern(context.dissentItemCount * 12),
      dissentReason: "Reviewers disagree on the leading interpretation.",
      resolutionProtocol: "Require consensus board note and hold all outputs.",
    },
    {
      id: "RCC_DISSENT_002",
      label: "Evidence sufficiency dissent",
      lane: "dissent-register",
      dissentScore: clampScore(context.evidenceWeightConflictCount * 12),
      dissentingRole: "case memory reviewer",
      opposingRole: "photo reviewer",
      severity: severityFromConcern(context.evidenceWeightConflictCount * 10),
      dissentReason: "Reviewers disagree on whether evidence is sufficient for signoff.",
      resolutionProtocol: "Require additional reviewer rationale and audit packet update.",
    },
    {
      id: "RCC_DISSENT_003",
      label: "Escalation threshold dissent",
      lane: "dispute-resolution",
      dissentScore: clampScore(context.unresolvedDisputeCount * 18),
      dissentingRole: "mission lead",
      opposingRole: "safety reviewer",
      severity: severityFromConcern(context.unresolvedDisputeCount * 14),
      dissentReason: "Reviewers disagree on whether dispute board escalation is required.",
      resolutionProtocol: "Escalate to consensus board and keep decision locks active.",
    },
  ];
}

function buildCalibrationBoard(context: Required<ReviewerConsensusCalibrationInput>): CalibrationBoardItem[] {
  return [
    {
      id: "RCC_CALIBRATION_001",
      label: "Reviewer alignment calibration",
      lane: "calibration",
      currentScore: clampScore(context.reviewerAlignmentScore),
      targetScore: 86,
      severity: severityFromConcern((86 - context.reviewerAlignmentScore) * 4),
      calibrationQuestion: "Are reviewer ratings aligned enough for a manual consensus packet?",
      manualAction: "Run human calibration discussion and document the rationale.",
    },
    {
      id: "RCC_CALIBRATION_002",
      label: "Evidence weighting calibration",
      lane: "calibration",
      currentScore: clampScore(context.evidenceWeightingScore),
      targetScore: 86,
      severity: severityFromConcern((86 - context.evidenceWeightingScore) * 4 + context.evidenceWeightConflictCount * 4),
      calibrationQuestion: "Are evidence weights consistent across reviewers?",
      manualAction: "Reconcile weights manually through evidence arbitration.",
    },
    {
      id: "RCC_CALIBRATION_003",
      label: "Dispute resolution calibration",
      lane: "dispute-resolution",
      currentScore: clampScore(context.disputeResolutionScore),
      targetScore: 84,
      severity: severityFromConcern((84 - context.disputeResolutionScore) * 4 + context.unresolvedDisputeCount * 6),
      calibrationQuestion: "Are disputes resolvable without any automatic decision?",
      manualAction: "Hold unresolved disputes and escalate to board.",
    },
  ];
}

function buildDisputeResolutionGates(
  context: Required<ReviewerConsensusCalibrationInput>,
  sourceNodes: ReviewerConsensusSourceNode[],
): DisputeResolutionGate[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "RCC_GATE_001",
      label: "Decision holds remain active",
      lane: "decision-hold" as ReviewerConsensusLane,
      score: context.decisionHoldScore,
      reviewer: "safety reviewer",
      requiredEvidence: ["Decision holds", "Mission control locks", "Human signoff packet"],
      hardStop: "No automatic decision is allowed.",
    },
    {
      id: "RCC_GATE_002",
      label: "Evidence weighting is reviewable",
      lane: "evidence-weighting" as ReviewerConsensusLane,
      score: context.evidenceWeightingScore - context.evidenceWeightConflictCount * 4,
      reviewer: "evidence arbitration reviewer",
      requiredEvidence: ["Evidence weighting board", "Arbitration packet"],
      hardStop: "Do not sign off with unresolved evidence conflicts.",
    },
    {
      id: "RCC_GATE_003",
      label: "Reviewer dissent is controlled",
      lane: "dissent-register" as ReviewerConsensusLane,
      score: context.reviewerAlignmentScore - context.dissentItemCount * 4,
      reviewer: context.leadReviewerRole,
      requiredEvidence: ["Dissent register", "Reviewer rationale", "Dispute protocol"],
      hardStop: "Do not bypass dissent review.",
    },
    {
      id: "RCC_GATE_004",
      label: "Disputes are resolved or held",
      lane: "dispute-resolution" as ReviewerConsensusLane,
      score: context.disputeResolutionScore - context.unresolvedDisputeCount * 5,
      reviewer: "dispute board reviewer",
      requiredEvidence: ["Dispute gates", "Escalation notes", "Consensus board"],
      hardStop: "Do not close consensus while disputes remain unresolved.",
    },
    {
      id: "RCC_GATE_005",
      label: "Human signoff is complete enough",
      lane: "human-signoff" as ReviewerConsensusLane,
      score: context.calibrationScore - context.pendingConsensusCaseCount * 2,
      reviewer: context.leadReviewerRole,
      requiredEvidence: ["Human signoff", "Audit trail", "Decision holds"],
      hardStop: "Do not produce any final operational outcome.",
    },
    {
      id: "RCC_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "reviewer-audit" as ReviewerConsensusLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before consensus-ready state.",
    },
  ];

  return rows.map((row) => {
    const score = clampScore(row.score);
    const severity = severityFromConcern(100 - score);

    return {
      ...row,
      score,
      severity,
      passed: score >= 70,
    };
  });
}

function buildDecisionHolds(): ConsensusDecisionHold[] {
  return [
    {
      id: "RCC_HOLD_001",
      label: "Provider output hold",
      lane: "decision-hold",
      holdEnforced: true,
      severity: "critical",
      holdStatement: "No provider output exists or can become a decision.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "RCC_HOLD_002",
      label: "Operational action hold",
      lane: "decision-hold",
      holdEnforced: true,
      severity: "critical",
      holdStatement: "No reviewer consensus output can create work.",
      blockedOutcome: "No task, intervention, dispatch or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "RCC_HOLD_003",
      label: "Prescriptive output hold",
      lane: "decision-hold",
      holdEnforced: true,
      severity: "critical",
      holdStatement: "No consensus packet can prescribe products, dosages or production estimates.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildConsensusBoard(
  context: Required<ReviewerConsensusCalibrationInput>,
  gates: DisputeResolutionGate[],
): ConsensusBoardQuestion[] {
  return [
    {
      id: "RCC_BOARD_001",
      priority: context.evidenceWeightConflictCount >= 6 ? "urgent" : "high",
      reviewer: "evidence arbitration reviewer",
      question: "Which evidence weights prevent consensus?",
      requiredEvidence: ["Evidence weighting", "Calibration board", "Audit trail"],
      safeOutcome: "Manual evidence consensus note only.",
      manualOnly: true,
    },
    {
      id: "RCC_BOARD_002",
      priority: context.dissentItemCount >= 5 ? "urgent" : "high",
      reviewer: context.leadReviewerRole,
      question: "Which reviewer dissent items require board resolution?",
      requiredEvidence: ["Dissent register", "Reviewer rationale", "Decision holds"],
      safeOutcome: "Manual dissent board note only.",
      manualOnly: true,
    },
    {
      id: "RCC_BOARD_003",
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      reviewer: context.leadReviewerRole,
      question: "Can a consensus packet be prepared without any automatic or operational output?",
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual consensus packet review only.",
      manualOnly: true,
    },
  ];
}

function buildReviewerAuditTrail(context: Required<ReviewerConsensusCalibrationInput>): ReviewerAuditTrailItem[] {
  return [
    {
      id: "RCC_AUDIT_001",
      label: "Evidence weighting audit",
      lane: "reviewer-audit",
      auditReady: context.evidenceWeightingScore >= 70,
      readinessScore: clampScore(context.evidenceWeightingScore),
      reviewerCheck: "Confirm weighted evidence rationale is redacted and manual.",
      includedSections: ["Evidence weights", "Conflict notes", "Reviewer rationale"],
      blockedSections: ["Private notes", "Provider payload", "Operational instruction"],
    },
    {
      id: "RCC_AUDIT_002",
      label: "Dissent audit",
      lane: "reviewer-audit",
      auditReady: context.reviewerAlignmentScore >= 70,
      readinessScore: clampScore(context.reviewerAlignmentScore),
      reviewerCheck: "Confirm dissent is recorded without coercing a final outcome.",
      includedSections: ["Dissent reasons", "Opposing rationale", "Escalation status"],
      blockedSections: ["Automatic decision", "Stored approval", "Execution path"],
    },
    {
      id: "RCC_AUDIT_003",
      label: "Consensus signoff audit",
      lane: "reviewer-audit",
      auditReady: context.calibrationScore >= 70,
      readinessScore: clampScore(context.calibrationScore),
      reviewerCheck: "Confirm signoff is manual, dry-run and non-operational.",
      includedSections: ["Manual signoff status", "Decision holds", "Audit packet"],
      blockedSections: ["Task creation", "Intervention creation", "Product or dosage output"],
    },
  ];
}

function buildConsensusSignoff(
  context: Required<ReviewerConsensusCalibrationInput>,
  gates: DisputeResolutionGate[],
): ConsensusSignoffItem[] {
  return [
    {
      id: "RCC_SIGNOFF_001",
      label: "Evidence consensus signoff",
      lane: "human-signoff",
      signoffReady: context.evidenceWeightConflictCount < 6,
      reviewer: "evidence arbitration reviewer",
      requiredEvidence: ["Evidence weighting", "Calibration board", "Audit trail"],
      safeOutcome: "Manual evidence consensus note only.",
    },
    {
      id: "RCC_SIGNOFF_002",
      label: "Dispute board signoff",
      lane: "human-signoff",
      signoffReady: context.unresolvedDisputeCount < 4,
      reviewer: "dispute board reviewer",
      requiredEvidence: ["Dissent register", "Dispute gates", "Consensus board"],
      safeOutcome: "Manual dispute board note only.",
    },
    {
      id: "RCC_SIGNOFF_003",
      label: "Mission lead consensus signoff",
      lane: "human-signoff",
      signoffReady: gates.every((gate) => gate.passed),
      reviewer: context.leadReviewerRole,
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual consensus signoff packet only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<ReviewerConsensusCalibrationInput>,
  sourceNodes: ReviewerConsensusSourceNode[],
  gates: DisputeResolutionGate[],
  signoff: ConsensusSignoffItem[],
): ConsensusRiskItem[] {
  const risks: ConsensusRiskItem[] = [];

  if (context.evidenceWeightConflictCount > 0) {
    risks.push({
      id: "RCC_RISK_001",
      label: "Evidence weighting conflicts",
      lane: "evidence-weighting",
      severity: context.evidenceWeightConflictCount >= 6 ? "critical" : "elevated",
      reason: `${context.evidenceWeightConflictCount} evidence weighting conflicts remain open.`,
      manualResolution: "Resolve weighting conflicts through evidence arbitration.",
      blocksConsensus: context.evidenceWeightConflictCount >= 6,
    });
  }

  if (context.unresolvedDisputeCount > 0) {
    risks.push({
      id: "RCC_RISK_002",
      label: "Unresolved reviewer disputes",
      lane: "dispute-resolution",
      severity: context.unresolvedDisputeCount >= 4 ? "critical" : "elevated",
      reason: `${context.unresolvedDisputeCount} reviewer disputes remain unresolved.`,
      manualResolution: "Resolve disputes through consensus board.",
      blocksConsensus: context.unresolvedDisputeCount >= 4,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `RCC_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksConsensus: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `RCC_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksConsensus: gate.severity === "critical" || gate.score < 60,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `RCC_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Consensus signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksConsensus: true,
      });
    });

  return risks;
}

export function buildAiReviewerConsensusCalibrationReport(
  input: ReviewerConsensusCalibrationInput = {},
): ReviewerConsensusCalibrationReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const evidenceWeighting = buildEvidenceWeighting(context);
  const dissentRegister = buildDissentRegister(context);
  const calibrationBoard = buildCalibrationBoard(context);
  const disputeResolutionGates = buildDisputeResolutionGates(context, sourceNodes);
  const decisionHolds = buildDecisionHolds();
  const consensusBoard = buildConsensusBoard(context, disputeResolutionGates);
  const reviewerAuditTrail = buildReviewerAuditTrail(context);
  const consensusSignoff = buildConsensusSignoff(context, disputeResolutionGates);
  const consensusRiskRegister = buildRiskRegister(context, sourceNodes, disputeResolutionGates, consensusSignoff);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const weightingAverage =
    evidenceWeighting.reduce((sum, item) => sum + item.evidenceWeight, 0) /
    Math.max(1, evidenceWeighting.length);

  const calibrationAverage =
    calibrationBoard.reduce((sum, item) => sum + item.currentScore, 0) /
    Math.max(1, calibrationBoard.length);

  const gateAverage =
    disputeResolutionGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, disputeResolutionGates.length);

  const riskPenalty = consensusRiskRegister.filter((item) => item.blocksConsensus).length * 10;
  const boardPressure =
    consensusBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, consensusBoard.length * 3);

  const consensusScore = clampScore(
    sourceAverage / 4 +
      weightingAverage / 4 +
      calibrationAverage / 4 +
      gateAverage / 4 +
      boardPressure -
      riskPenalty -
      context.evidenceWeightConflictCount -
      context.unresolvedDisputeCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.pendingConsensusCaseCount * 3 +
        context.evidenceWeightConflictCount * 8 +
        context.dissentItemCount * 7 +
        context.unresolvedDisputeCount * 9,
    ),
  );

  const consensusStatus = bandFromScore(
    consensusScore,
    consensusRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: REVIEWER_CONSENSUS_CALIBRATION_READINESS,
    consensusScore,
    consensusStatus,
    overallSeverity,
    sourceNodes,
    evidenceWeighting,
    dissentRegister,
    calibrationBoard,
    disputeResolutionGates,
    decisionHolds,
    consensusBoard,
    reviewerAuditTrail,
    consensusSignoff,
    consensusRiskRegister,
    redactedExportBundle: {
      exportId: "reviewer_consensus_calibration_v13_1_redacted_dry_run",
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
        "evidence weighting",
        "dissent register",
        "calibration board",
        "dispute resolution gates",
        "decision holds",
        "consensus board",
        "reviewer audit trail",
        "consensus signoff",
        "risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Reviewer consensus calibration is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Evidence weighting, dissent resolution and consensus signoff are review concepts only.",
      "Every output remains behind human consensus, decision holds and manual signoff.",
    ],
  };
}

export const aiReviewerConsensusCalibrationVersion = "V13.1";
