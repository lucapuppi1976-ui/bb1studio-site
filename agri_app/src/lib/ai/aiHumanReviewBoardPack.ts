export type HumanReviewBoardPackMode = "dry-run" | "board-pack-review";

export type HumanReviewBoardSeverity = "info" | "watch" | "elevated" | "critical";

export type HumanReviewBoardPriority = "low" | "medium" | "high" | "urgent";

export type HumanReviewBoardReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "board-pack-ready";

export type HumanReviewBoardLane =
  | "board-briefing"
  | "decision-freeze"
  | "review-outcome"
  | "escalation-hold"
  | "rationale-link"
  | "evidence-link"
  | "non-actionable-export"
  | "human-signoff";

export interface HumanReviewBoardPackGuardrail {
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
  humanBoardPackReady: true;
  decisionFreezeCertificateReady: true;
  nonActionableExportReady: true;
  humanBoardSignoffReady: true;
}

export interface HumanReviewBoardPackInput {
  boardItemCount?: number;
  unresolvedBoardQuestionCount?: number;
  unresolvedFreezeReasonCount?: number;
  escalationHoldCount?: number;
  signoffGapCount?: number;
  missionControlScore?: number;
  consensusCalibrationScore?: number;
  evidenceIntegrityScore?: number;
  rationaleLedgerScore?: number;
  boardBriefingScore?: number;
  freezeConfidenceScore?: number;
  reviewerConfidenceScore?: number;
  leadReviewerRole?: string;
}

export interface HumanReviewBoardSourceNode {
  id: string;
  lane: HumanReviewBoardLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: HumanReviewBoardSeverity;
  priority: HumanReviewBoardPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface BoardBriefingItem {
  id: string;
  label: string;
  lane: HumanReviewBoardLane;
  briefingScore: number;
  severity: HumanReviewBoardSeverity;
  reviewerQuestion: string;
  manualResolution: string;
}

export interface DecisionFreezeCertificateItem {
  id: string;
  label: string;
  lane: HumanReviewBoardLane;
  freezeEnforced: true;
  severity: HumanReviewBoardSeverity;
  freezeReason: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface ReviewOutcomeMatrixItem {
  id: string;
  label: string;
  lane: HumanReviewBoardLane;
  outcomeStatus: "hold" | "review-only" | "ready-for-human-note";
  score: number;
  severity: HumanReviewBoardSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface EscalationHoldItem {
  id: string;
  label: string;
  lane: HumanReviewBoardLane;
  priority: HumanReviewBoardPriority;
  severity: HumanReviewBoardSeverity;
  holdReason: string;
  manualResolution: string;
  blocksBoardPack: boolean;
}

export interface NonActionableExportItem {
  id: string;
  label: string;
  lane: HumanReviewBoardLane;
  exportReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface HumanBoardSignoffItem {
  id: string;
  label: string;
  lane: HumanReviewBoardLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface HumanBoardRiskItem {
  id: string;
  label: string;
  lane: HumanReviewBoardLane;
  severity: HumanReviewBoardSeverity;
  reason: string;
  manualResolution: string;
  blocksBoardPack: boolean;
}

export interface HumanReviewBoardPackReport {
  generatedAt: string;
  mode: HumanReviewBoardPackMode;
  context: Required<HumanReviewBoardPackInput>;
  readiness: HumanReviewBoardPackGuardrail;
  boardPackScore: number;
  boardPackStatus: HumanReviewBoardReadinessBand;
  overallSeverity: HumanReviewBoardSeverity;
  sourceNodes: HumanReviewBoardSourceNode[];
  boardBriefing: BoardBriefingItem[];
  decisionFreezeCertificate: DecisionFreezeCertificateItem[];
  reviewOutcomeMatrix: ReviewOutcomeMatrixItem[];
  escalationHolds: EscalationHoldItem[];
  nonActionableExportPacket: NonActionableExportItem[];
  humanBoardSignoff: HumanBoardSignoffItem[];
  boardRiskRegister: HumanBoardRiskItem[];
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

export const HUMAN_REVIEW_BOARD_PACK_READINESS: HumanReviewBoardPackGuardrail = {
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
  humanBoardPackReady: true,
  decisionFreezeCertificateReady: true,
  nonActionableExportReady: true,
  humanBoardSignoffReady: true,
};

const priorityWeight: Record<HumanReviewBoardPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: HumanReviewBoardPackInput): Required<HumanReviewBoardPackInput> {
  return {
    boardItemCount: input.boardItemCount ?? 18,
    unresolvedBoardQuestionCount: input.unresolvedBoardQuestionCount ?? 5,
    unresolvedFreezeReasonCount: input.unresolvedFreezeReasonCount ?? 4,
    escalationHoldCount: input.escalationHoldCount ?? 4,
    signoffGapCount: input.signoffGapCount ?? 4,
    missionControlScore: input.missionControlScore ?? 73,
    consensusCalibrationScore: input.consensusCalibrationScore ?? 72,
    evidenceIntegrityScore: input.evidenceIntegrityScore ?? 73,
    rationaleLedgerScore: input.rationaleLedgerScore ?? 71,
    boardBriefingScore: input.boardBriefingScore ?? 72,
    freezeConfidenceScore: input.freezeConfidenceScore ?? 78,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    leadReviewerRole: input.leadReviewerRole ?? "human review board lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): HumanReviewBoardSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: HumanReviewBoardSeverity): HumanReviewBoardPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): HumanReviewBoardReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "board-pack-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: HumanReviewBoardLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): HumanReviewBoardSourceNode {
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
        ? ["Human review board pack is below signoff threshold.", "Board must resolve open questions, freeze reasons and signoff gaps."]
        : [],
  };
}

function buildSourceNodes(context: Required<HumanReviewBoardPackInput>): HumanReviewBoardSourceNode[] {
  const boardPressure = context.unresolvedBoardQuestionCount * 4;
  const freezePressure = context.unresolvedFreezeReasonCount * 5;
  const escalationPressure = context.escalationHoldCount * 5;
  const signoffPressure = context.signoffGapCount * 5;

  return [
    buildSourceNode(
      "HRBP_NODE_001",
      "board-briefing",
      "Mission control board input",
      "V13.0",
      context.missionControlScore,
      context.reviewerConfidenceScore,
      boardPressure,
      "Summarize mission-control findings for the human board.",
    ),
    buildSourceNode(
      "HRBP_NODE_002",
      "review-outcome",
      "Consensus calibration board input",
      "V13.1",
      context.consensusCalibrationScore,
      context.reviewerConfidenceScore,
      boardPressure + signoffPressure / 2,
      "Summarize consensus state and unresolved disagreements.",
    ),
    buildSourceNode(
      "HRBP_NODE_003",
      "evidence-link",
      "Evidence integrity board input",
      "V13.2",
      context.evidenceIntegrityScore,
      context.reviewerConfidenceScore,
      boardPressure,
      "Summarize custody and integrity status.",
    ),
    buildSourceNode(
      "HRBP_NODE_004",
      "rationale-link",
      "Rationale ledger board input",
      "V13.3",
      context.rationaleLedgerScore,
      context.reviewerConfidenceScore,
      signoffPressure,
      "Summarize evidence-to-rationale traceability.",
    ),
    buildSourceNode(
      "HRBP_NODE_005",
      "decision-freeze",
      "Decision freeze certificate",
      "V13.4",
      context.freezeConfidenceScore,
      context.reviewerConfidenceScore,
      freezePressure,
      "Confirm every output remains non-operational.",
    ),
    buildSourceNode(
      "HRBP_NODE_006",
      "non-actionable-export",
      "Non-actionable export packet",
      "V13.4",
      context.boardBriefingScore,
      context.reviewerConfidenceScore,
      boardPressure + escalationPressure / 2,
      "Prepare redacted board packet with no operational instruction.",
    ),
    buildSourceNode(
      "HRBP_NODE_007",
      "escalation-hold",
      "Escalation hold register",
      "V13.4",
      context.reviewerConfidenceScore,
      context.freezeConfidenceScore,
      escalationPressure,
      "Hold all unresolved escalations for manual board review.",
    ),
    buildSourceNode(
      "HRBP_NODE_008",
      "human-signoff",
      "Human board signoff packet",
      "V13.4",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      signoffPressure,
      "Confirm board pack signoff remains manual.",
    ),
  ];
}

function buildBoardBriefing(context: Required<HumanReviewBoardPackInput>): BoardBriefingItem[] {
  return [
    {
      id: "HRBP_BRIEF_001",
      label: "Mission control summary",
      lane: "board-briefing",
      briefingScore: clampScore(context.missionControlScore),
      severity: severityFromConcern(100 - context.missionControlScore + context.unresolvedBoardQuestionCount * 5),
      reviewerQuestion: "What should the board understand about review queue, arbitration and decision locks?",
      manualResolution: "Keep summary as human briefing only.",
    },
    {
      id: "HRBP_BRIEF_002",
      label: "Consensus and rationale summary",
      lane: "review-outcome",
      briefingScore: clampScore((context.consensusCalibrationScore + context.rationaleLedgerScore) / 2),
      severity: severityFromConcern(100 - context.consensusCalibrationScore + context.signoffGapCount * 6),
      reviewerQuestion: "Which consensus and rationale gaps remain open?",
      manualResolution: "Route gaps to human signoff discussion.",
    },
    {
      id: "HRBP_BRIEF_003",
      label: "Evidence integrity and custody summary",
      lane: "evidence-link",
      briefingScore: clampScore(context.evidenceIntegrityScore),
      severity: severityFromConcern(100 - context.evidenceIntegrityScore + context.unresolvedBoardQuestionCount * 4),
      reviewerQuestion: "Does evidence custody support a board note without becoming a decision?",
      manualResolution: "Keep custody status review-only.",
    },
  ];
}

function buildDecisionFreezeCertificate(): DecisionFreezeCertificateItem[] {
  return [
    {
      id: "HRBP_FREEZE_001",
      label: "Provider output freeze",
      lane: "decision-freeze",
      freezeEnforced: true,
      severity: "critical",
      freezeReason: "No provider output exists or can be introduced by this board pack.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "HRBP_FREEZE_002",
      label: "Operational action freeze",
      lane: "decision-freeze",
      freezeEnforced: true,
      severity: "critical",
      freezeReason: "Board pack cannot create operational work.",
      blockedOutcome: "No task, intervention, dispatch or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "HRBP_FREEZE_003",
      label: "Prescriptive output freeze",
      lane: "decision-freeze",
      freezeEnforced: true,
      severity: "critical",
      freezeReason: "Board pack cannot produce product, dosage or production guidance.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildReviewOutcomeMatrix(
  context: Required<HumanReviewBoardPackInput>,
  sourceNodes: HumanReviewBoardSourceNode[],
): ReviewOutcomeMatrixItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "HRBP_OUTCOME_001",
      label: "Mission control outcome",
      lane: "review-outcome" as HumanReviewBoardLane,
      score: context.missionControlScore - context.unresolvedBoardQuestionCount * 3,
      reviewer: "mission control reviewer",
      requiredEvidence: ["mission control", "review queue", "decision locks"],
      hardStop: "Do not close board pack with unresolved mission-control questions.",
    },
    {
      id: "HRBP_OUTCOME_002",
      label: "Consensus and rationale outcome",
      lane: "rationale-link" as HumanReviewBoardLane,
      score: (context.consensusCalibrationScore + context.rationaleLedgerScore) / 2 - context.signoffGapCount * 4,
      reviewer: "rationale reviewer",
      requiredEvidence: ["consensus calibration", "rationale ledger", "human signoff"],
      hardStop: "Do not close board pack with unresolved rationale or consensus gaps.",
    },
    {
      id: "HRBP_OUTCOME_003",
      label: "Evidence integrity outcome",
      lane: "evidence-link" as HumanReviewBoardLane,
      score: context.evidenceIntegrityScore - context.unresolvedBoardQuestionCount * 3,
      reviewer: "evidence custody reviewer",
      requiredEvidence: ["evidence custody", "audit replay", "evidence locks"],
      hardStop: "Do not close board pack if evidence integrity is unclear.",
    },
    {
      id: "HRBP_OUTCOME_004",
      label: "Decision freeze outcome",
      lane: "decision-freeze" as HumanReviewBoardLane,
      score: context.freezeConfidenceScore - context.unresolvedFreezeReasonCount * 4,
      reviewer: "safety reviewer",
      requiredEvidence: ["decision freeze certificate", "non-actionable export", "guardrails"],
      hardStop: "Do not allow any actionability path.",
    },
    {
      id: "HRBP_OUTCOME_005",
      label: "Escalation hold outcome",
      lane: "escalation-hold" as HumanReviewBoardLane,
      score: 100 - context.escalationHoldCount * 12,
      reviewer: context.leadReviewerRole,
      requiredEvidence: ["escalation holds", "board questions", "signoff packet"],
      hardStop: "Do not bypass unresolved escalation holds.",
    },
    {
      id: "HRBP_OUTCOME_006",
      label: "Source blockers are within tolerance",
      lane: "human-signoff" as HumanReviewBoardLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before board-pack-ready state.",
    },
  ];

  return rows.map((row) => {
    const score = clampScore(row.score);
    const severity = severityFromConcern(100 - score);
    const outcomeStatus =
      score >= 84 ? "ready-for-human-note" : score >= 70 ? "review-only" : "hold";

    return {
      ...row,
      score,
      severity,
      outcomeStatus,
    };
  });
}

function buildEscalationHolds(context: Required<HumanReviewBoardPackInput>): EscalationHoldItem[] {
  return [
    {
      id: "HRBP_HOLD_001",
      label: "Open board questions",
      lane: "escalation-hold",
      priority: context.unresolvedBoardQuestionCount >= 5 ? "urgent" : "high",
      severity: context.unresolvedBoardQuestionCount >= 5 ? "critical" : "elevated",
      holdReason: `${context.unresolvedBoardQuestionCount} board questions remain open.`,
      manualResolution: "Resolve board questions manually before signoff.",
      blocksBoardPack: context.unresolvedBoardQuestionCount >= 5,
    },
    {
      id: "HRBP_HOLD_002",
      label: "Open freeze reasons",
      lane: "decision-freeze",
      priority: context.unresolvedFreezeReasonCount >= 4 ? "urgent" : "high",
      severity: context.unresolvedFreezeReasonCount >= 4 ? "critical" : "elevated",
      holdReason: `${context.unresolvedFreezeReasonCount} freeze reasons require reviewer review.`,
      manualResolution: "Confirm decision freeze reasons manually.",
      blocksBoardPack: context.unresolvedFreezeReasonCount >= 4,
    },
    {
      id: "HRBP_HOLD_003",
      label: "Open signoff gaps",
      lane: "human-signoff",
      priority: context.signoffGapCount >= 4 ? "urgent" : "high",
      severity: context.signoffGapCount >= 4 ? "elevated" : "watch",
      holdReason: `${context.signoffGapCount} signoff gaps remain open.`,
      manualResolution: "Close human signoff gaps manually.",
      blocksBoardPack: context.signoffGapCount >= 5,
    },
  ];
}

function buildNonActionableExportPacket(context: Required<HumanReviewBoardPackInput>): NonActionableExportItem[] {
  return [
    {
      id: "HRBP_EXPORT_001",
      label: "Executive board briefing packet",
      lane: "non-actionable-export",
      exportReady: context.boardBriefingScore >= 70,
      readinessScore: clampScore(context.boardBriefingScore),
      reviewerCheck: "Confirm briefing contains only review context.",
      includedSections: ["board briefing", "source summary", "open questions"],
      blockedSections: ["operational instruction", "private notes", "provider material"],
    },
    {
      id: "HRBP_EXPORT_002",
      label: "Decision freeze certificate packet",
      lane: "decision-freeze",
      exportReady: context.freezeConfidenceScore >= 70,
      readinessScore: clampScore(context.freezeConfidenceScore),
      reviewerCheck: "Confirm decision freeze certificate blocks every actionability path.",
      includedSections: ["freeze reasons", "blocked outcomes", "manual signoff markers"],
      blockedSections: ["task creation", "intervention creation", "execution path"],
    },
    {
      id: "HRBP_EXPORT_003",
      label: "Human signoff packet",
      lane: "human-signoff",
      exportReady: context.signoffGapCount < 5,
      readinessScore: clampScore(100 - context.signoffGapCount * 12),
      reviewerCheck: "Confirm signoff remains a manual board note only.",
      includedSections: ["human signoff", "escalation holds", "risk register"],
      blockedSections: ["stored approval", "public share", "product or dosage output"],
    },
  ];
}

function buildHumanBoardSignoff(
  context: Required<HumanReviewBoardPackInput>,
  matrix: ReviewOutcomeMatrixItem[],
): HumanBoardSignoffItem[] {
  return [
    {
      id: "HRBP_SIGNOFF_001",
      label: "Board briefing signoff",
      lane: "human-signoff",
      signoffReady: context.unresolvedBoardQuestionCount < 5,
      reviewer: context.leadReviewerRole,
      requiredEvidence: ["board briefing", "review outcome matrix", "source nodes"],
      safeOutcome: "Manual board briefing note only.",
    },
    {
      id: "HRBP_SIGNOFF_002",
      label: "Decision freeze signoff",
      lane: "human-signoff",
      signoffReady: context.unresolvedFreezeReasonCount < 4,
      reviewer: "safety reviewer",
      requiredEvidence: ["decision freeze certificate", "non-actionable export", "guardrails"],
      safeOutcome: "Manual decision freeze note only.",
    },
    {
      id: "HRBP_SIGNOFF_003",
      label: "Final human board signoff",
      lane: "human-signoff",
      signoffReady: matrix.every((item) => item.outcomeStatus !== "hold"),
      reviewer: context.leadReviewerRole,
      requiredEvidence: matrix.map((item) => item.label),
      safeOutcome: "Manual board pack signoff only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<HumanReviewBoardPackInput>,
  sourceNodes: HumanReviewBoardSourceNode[],
  matrix: ReviewOutcomeMatrixItem[],
  holds: EscalationHoldItem[],
  signoff: HumanBoardSignoffItem[],
): HumanBoardRiskItem[] {
  const risks: HumanBoardRiskItem[] = [];

  if (context.unresolvedBoardQuestionCount > 0) {
    risks.push({
      id: "HRBP_RISK_001",
      label: "Open board questions",
      lane: "board-briefing",
      severity: context.unresolvedBoardQuestionCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedBoardQuestionCount} board questions remain unresolved.`,
      manualResolution: "Resolve open board questions manually.",
      blocksBoardPack: context.unresolvedBoardQuestionCount >= 5,
    });
  }

  if (context.unresolvedFreezeReasonCount > 0) {
    risks.push({
      id: "HRBP_RISK_002",
      label: "Open decision freeze reasons",
      lane: "decision-freeze",
      severity: context.unresolvedFreezeReasonCount >= 4 ? "critical" : "elevated",
      reason: `${context.unresolvedFreezeReasonCount} decision freeze reasons require review.`,
      manualResolution: "Resolve freeze reasons manually before board signoff.",
      blocksBoardPack: context.unresolvedFreezeReasonCount >= 4,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `HRBP_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksBoardPack: node.severity === "critical",
      });
    });

  matrix
    .filter((item) => item.outcomeStatus === "hold")
    .forEach((item, index) => {
      risks.push({
        id: `HRBP_OUTCOME_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Review outcome score is ${item.score}/100.`,
        manualResolution: item.hardStop,
        blocksBoardPack: true,
      });
    });

  holds
    .filter((item) => item.blocksBoardPack)
    .forEach((item, index) => {
      risks.push({
        id: `HRBP_HOLD_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.holdReason,
        manualResolution: item.manualResolution,
        blocksBoardPack: true,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `HRBP_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Human board signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksBoardPack: true,
      });
    });

  return risks;
}

export function buildAiHumanReviewBoardPackReport(
  input: HumanReviewBoardPackInput = {},
): HumanReviewBoardPackReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const boardBriefing = buildBoardBriefing(context);
  const decisionFreezeCertificate = buildDecisionFreezeCertificate();
  const reviewOutcomeMatrix = buildReviewOutcomeMatrix(context, sourceNodes);
  const escalationHolds = buildEscalationHolds(context);
  const nonActionableExportPacket = buildNonActionableExportPacket(context);
  const humanBoardSignoff = buildHumanBoardSignoff(context, reviewOutcomeMatrix);
  const boardRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    reviewOutcomeMatrix,
    escalationHolds,
    humanBoardSignoff,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const briefingAverage =
    boardBriefing.reduce((sum, item) => sum + item.briefingScore, 0) /
    Math.max(1, boardBriefing.length);

  const outcomeAverage =
    reviewOutcomeMatrix.reduce((sum, item) => sum + item.score, 0) /
    Math.max(1, reviewOutcomeMatrix.length);

  const exportAverage =
    nonActionableExportPacket.reduce((sum, item) => sum + item.readinessScore, 0) /
    Math.max(1, nonActionableExportPacket.length);

  const riskPenalty = boardRiskRegister.filter((item) => item.blocksBoardPack).length * 10;
  const holdPressure =
    escalationHolds.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, escalationHolds.length * 3);

  const boardPackScore = clampScore(
    sourceAverage / 4 +
      briefingAverage / 4 +
      outcomeAverage / 4 +
      exportAverage / 4 +
      holdPressure -
      riskPenalty -
      context.unresolvedBoardQuestionCount -
      context.unresolvedFreezeReasonCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.boardItemCount * 2 +
        context.unresolvedBoardQuestionCount * 8 +
        context.unresolvedFreezeReasonCount * 9 +
        context.escalationHoldCount * 8 +
        context.signoffGapCount * 7,
    ),
  );

  const boardPackStatus = bandFromScore(
    boardPackScore,
    boardRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: HUMAN_REVIEW_BOARD_PACK_READINESS,
    boardPackScore,
    boardPackStatus,
    overallSeverity,
    sourceNodes,
    boardBriefing,
    decisionFreezeCertificate,
    reviewOutcomeMatrix,
    escalationHolds,
    nonActionableExportPacket,
    humanBoardSignoff,
    boardRiskRegister,
    redactedExportBundle: {
      exportId: "human_review_board_pack_v13_4_redacted_dry_run",
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
        "board briefing",
        "decision freeze certificate",
        "review outcome matrix",
        "escalation holds",
        "non actionable export packet",
        "human board signoff",
        "board risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Human review board pack is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Board briefing, decision freeze certificate and human signoff are review concepts only.",
      "Every conclusion remains behind human board review, decision freeze and non-actionable export controls.",
    ],
  };
}

export const aiHumanReviewBoardPackVersion = "V13.4";
