export type HumanReviewQualityMode = "dry-run" | "qa-board-review";

export type HumanReviewQualitySeverity = "info" | "watch" | "elevated" | "critical";

export type HumanReviewQualityPriority = "low" | "medium" | "high" | "urgent";

export type HumanReviewQualityReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "qa-ready";

export type HumanReviewQualityLane =
  | "qa-board"
  | "peer-calibration"
  | "rubric-quality"
  | "reviewer-drift"
  | "exception-register"
  | "decision-freeze"
  | "audit-replay"
  | "human-signoff";

export interface HumanReviewQualityAssuranceGuardrail {
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
  humanReviewQaReady: true;
  peerCalibrationReady: true;
  reviewerDriftWatchReady: true;
  humanQaSignoffReady: true;
}

export interface HumanReviewQualityAssuranceInput {
  qaCaseCount?: number;
  peerReviewGapCount?: number;
  rubricDeviationCount?: number;
  reviewerDriftSignalCount?: number;
  qaExceptionCount?: number;
  missionControlScore?: number;
  consensusCalibrationScore?: number;
  evidenceIntegrityScore?: number;
  rationaleLedgerScore?: number;
  boardPackScore?: number;
  rubricQualityScore?: number;
  reviewerCalibrationScore?: number;
  qaLeadRole?: string;
}

export interface HumanReviewQualitySourceNode {
  id: string;
  lane: HumanReviewQualityLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: HumanReviewQualitySeverity;
  priority: HumanReviewQualityPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface PeerCalibrationItem {
  id: string;
  label: string;
  lane: HumanReviewQualityLane;
  calibrationScore: number;
  reviewerPair: string;
  severity: HumanReviewQualitySeverity;
  calibrationQuestion: string;
  manualResolution: string;
}

export interface RubricQualityItem {
  id: string;
  label: string;
  lane: HumanReviewQualityLane;
  rubricScore: number;
  deviationCount: number;
  severity: HumanReviewQualitySeverity;
  reviewerCheck: string;
  manualResolution: string;
}

export interface ReviewerDriftWatchItem {
  id: string;
  label: string;
  lane: HumanReviewQualityLane;
  driftScore: number;
  severity: HumanReviewQualitySeverity;
  driftReason: string;
  manualResolution: string;
  blocksQaSignoff: boolean;
}

export interface QaGateItem {
  id: string;
  label: string;
  lane: HumanReviewQualityLane;
  passed: boolean;
  score: number;
  severity: HumanReviewQualitySeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface QaExceptionItem {
  id: string;
  label: string;
  lane: HumanReviewQualityLane;
  priority: HumanReviewQualityPriority;
  severity: HumanReviewQualitySeverity;
  exceptionReason: string;
  manualResolution: string;
  blocksQaBoard: boolean;
}

export interface QaDecisionFreezeItem {
  id: string;
  label: string;
  lane: HumanReviewQualityLane;
  freezeEnforced: true;
  severity: HumanReviewQualitySeverity;
  freezeReason: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface QaAuditReplayItem {
  id: string;
  label: string;
  lane: HumanReviewQualityLane;
  replayReady: boolean;
  replayScore: number;
  severity: HumanReviewQualitySeverity;
  replayQuestion: string;
  manualResolution: string;
}

export interface QaSignoffItem {
  id: string;
  label: string;
  lane: HumanReviewQualityLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface QaRiskItem {
  id: string;
  label: string;
  lane: HumanReviewQualityLane;
  severity: HumanReviewQualitySeverity;
  reason: string;
  manualResolution: string;
  blocksQaBoard: boolean;
}

export interface HumanReviewQualityAssuranceReport {
  generatedAt: string;
  mode: HumanReviewQualityMode;
  context: Required<HumanReviewQualityAssuranceInput>;
  readiness: HumanReviewQualityAssuranceGuardrail;
  qaScore: number;
  qaStatus: HumanReviewQualityReadinessBand;
  overallSeverity: HumanReviewQualitySeverity;
  sourceNodes: HumanReviewQualitySourceNode[];
  peerCalibrationBoard: PeerCalibrationItem[];
  rubricQualityMatrix: RubricQualityItem[];
  reviewerDriftWatch: ReviewerDriftWatchItem[];
  qaGateMatrix: QaGateItem[];
  qaExceptionRegister: QaExceptionItem[];
  decisionFreezeCertificate: QaDecisionFreezeItem[];
  auditReplay: QaAuditReplayItem[];
  qaSignoff: QaSignoffItem[];
  qaRiskRegister: QaRiskItem[];
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

export const HUMAN_REVIEW_QUALITY_ASSURANCE_READINESS: HumanReviewQualityAssuranceGuardrail = {
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
  humanReviewQaReady: true,
  peerCalibrationReady: true,
  reviewerDriftWatchReady: true,
  humanQaSignoffReady: true,
};

const priorityWeight: Record<HumanReviewQualityPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: HumanReviewQualityAssuranceInput): Required<HumanReviewQualityAssuranceInput> {
  return {
    qaCaseCount: input.qaCaseCount ?? 20,
    peerReviewGapCount: input.peerReviewGapCount ?? 5,
    rubricDeviationCount: input.rubricDeviationCount ?? 5,
    reviewerDriftSignalCount: input.reviewerDriftSignalCount ?? 4,
    qaExceptionCount: input.qaExceptionCount ?? 4,
    missionControlScore: input.missionControlScore ?? 73,
    consensusCalibrationScore: input.consensusCalibrationScore ?? 72,
    evidenceIntegrityScore: input.evidenceIntegrityScore ?? 73,
    rationaleLedgerScore: input.rationaleLedgerScore ?? 71,
    boardPackScore: input.boardPackScore ?? 72,
    rubricQualityScore: input.rubricQualityScore ?? 71,
    reviewerCalibrationScore: input.reviewerCalibrationScore ?? 72,
    qaLeadRole: input.qaLeadRole ?? "human review qa lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): HumanReviewQualitySeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: HumanReviewQualitySeverity): HumanReviewQualityPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): HumanReviewQualityReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "qa-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: HumanReviewQualityLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): HumanReviewQualitySourceNode {
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
        ? ["Human review QA is below signoff threshold.", "QA board must resolve peer review gaps, rubric deviations and reviewer drift signals."]
        : [],
  };
}

function buildSourceNodes(context: Required<HumanReviewQualityAssuranceInput>): HumanReviewQualitySourceNode[] {
  const peerPressure = context.peerReviewGapCount * 5;
  const rubricPressure = context.rubricDeviationCount * 5;
  const driftPressure = context.reviewerDriftSignalCount * 5;
  const exceptionPressure = context.qaExceptionCount * 5;

  return [
    buildSourceNode(
      "HRQA_NODE_001",
      "qa-board",
      "Mission control QA input",
      "V13.0",
      context.missionControlScore,
      context.reviewerCalibrationScore,
      peerPressure,
      "Review mission-control outputs through QA board.",
    ),
    buildSourceNode(
      "HRQA_NODE_002",
      "peer-calibration",
      "Consensus calibration QA input",
      "V13.1",
      context.consensusCalibrationScore,
      context.reviewerCalibrationScore,
      peerPressure + driftPressure / 2,
      "Review consensus calibration quality and peer alignment.",
    ),
    buildSourceNode(
      "HRQA_NODE_003",
      "rubric-quality",
      "Evidence integrity QA input",
      "V13.2",
      context.evidenceIntegrityScore,
      context.rubricQualityScore,
      rubricPressure,
      "Review evidence custody against QA rubric.",
    ),
    buildSourceNode(
      "HRQA_NODE_004",
      "reviewer-drift",
      "Rationale ledger QA input",
      "V13.3",
      context.rationaleLedgerScore,
      context.reviewerCalibrationScore,
      driftPressure,
      "Review rationale quality and reviewer drift watch.",
    ),
    buildSourceNode(
      "HRQA_NODE_005",
      "decision-freeze",
      "Human board pack QA input",
      "V13.4",
      context.boardPackScore,
      context.rubricQualityScore,
      exceptionPressure,
      "Confirm board pack remains non-operational.",
    ),
    buildSourceNode(
      "HRQA_NODE_006",
      "exception-register",
      "QA exception register",
      "V13.5",
      context.rubricQualityScore,
      context.reviewerCalibrationScore,
      exceptionPressure,
      "Resolve QA exceptions manually before signoff.",
    ),
    buildSourceNode(
      "HRQA_NODE_007",
      "audit-replay",
      "QA audit replay",
      "V13.5",
      context.reviewerCalibrationScore,
      context.rubricQualityScore,
      context.qaCaseCount,
      "Replay QA path without producing operational outcomes.",
    ),
    buildSourceNode(
      "HRQA_NODE_008",
      "human-signoff",
      "QA signoff board",
      "V13.5",
      context.reviewerCalibrationScore,
      context.reviewerCalibrationScore,
      context.qaExceptionCount * 4,
      "Confirm QA signoff remains manual.",
    ),
  ];
}

function buildPeerCalibrationBoard(context: Required<HumanReviewQualityAssuranceInput>): PeerCalibrationItem[] {
  return [
    {
      id: "HRQA_PEER_001",
      label: "Agronomic reviewer versus evidence reviewer",
      lane: "peer-calibration",
      calibrationScore: clampScore(context.reviewerCalibrationScore - context.peerReviewGapCount * 3),
      reviewerPair: "agronomic reviewer / evidence reviewer",
      severity: severityFromConcern(context.peerReviewGapCount * 12),
      calibrationQuestion: "Are reviewer judgments aligned enough for a QA note?",
      manualResolution: "Run peer calibration manually and document variance.",
    },
    {
      id: "HRQA_PEER_002",
      label: "Consensus reviewer versus safety reviewer",
      lane: "peer-calibration",
      calibrationScore: clampScore(context.consensusCalibrationScore - context.reviewerDriftSignalCount * 3),
      reviewerPair: "consensus reviewer / safety reviewer",
      severity: severityFromConcern(context.reviewerDriftSignalCount * 12),
      calibrationQuestion: "Does safety rationale align with consensus rationale?",
      manualResolution: "Route variance to QA board if unresolved.",
    },
    {
      id: "HRQA_PEER_003",
      label: "Custody reviewer versus board reviewer",
      lane: "peer-calibration",
      calibrationScore: clampScore(context.evidenceIntegrityScore - context.peerReviewGapCount * 2),
      reviewerPair: "custody reviewer / board reviewer",
      severity: severityFromConcern(context.peerReviewGapCount * 10),
      calibrationQuestion: "Does evidence custody support the board pack note?",
      manualResolution: "Keep custody concerns in QA exception register.",
    },
  ];
}

function buildRubricQualityMatrix(context: Required<HumanReviewQualityAssuranceInput>): RubricQualityItem[] {
  return [
    {
      id: "HRQA_RUBRIC_001",
      label: "Evidence sufficiency rubric",
      lane: "rubric-quality",
      rubricScore: clampScore(context.rubricQualityScore),
      deviationCount: context.rubricDeviationCount,
      severity: severityFromConcern(context.rubricDeviationCount * 12),
      reviewerCheck: "Confirm evidence sufficiency was assessed with a consistent rubric.",
      manualResolution: "Resolve rubric deviations manually.",
    },
    {
      id: "HRQA_RUBRIC_002",
      label: "Rationale completeness rubric",
      lane: "rubric-quality",
      rubricScore: clampScore(context.rationaleLedgerScore),
      deviationCount: Math.max(1, Math.round(context.rubricDeviationCount / 2)),
      severity: severityFromConcern(context.rubricDeviationCount * 9),
      reviewerCheck: "Confirm reviewer rationale is complete and traceable.",
      manualResolution: "Send incomplete rationale to reviewer for manual correction.",
    },
    {
      id: "HRQA_RUBRIC_003",
      label: "Decision freeze rubric",
      lane: "decision-freeze",
      rubricScore: clampScore(context.boardPackScore),
      deviationCount: context.qaExceptionCount,
      severity: severityFromConcern(context.qaExceptionCount * 10),
      reviewerCheck: "Confirm no review outcome is actionable.",
      manualResolution: "Keep every output behind decision freeze.",
    },
  ];
}

function buildReviewerDriftWatch(context: Required<HumanReviewQualityAssuranceInput>): ReviewerDriftWatchItem[] {
  return [
    {
      id: "HRQA_DRIFT_001",
      label: "Reviewer severity drift",
      lane: "reviewer-drift",
      driftScore: clampScore(context.reviewerDriftSignalCount * 18),
      severity: severityFromConcern(context.reviewerDriftSignalCount * 15),
      driftReason: "Reviewer severity ratings may be diverging.",
      manualResolution: "Run manual peer calibration review.",
      blocksQaSignoff: context.reviewerDriftSignalCount >= 4,
    },
    {
      id: "HRQA_DRIFT_002",
      label: "Rubric application drift",
      lane: "reviewer-drift",
      driftScore: clampScore(context.rubricDeviationCount * 16),
      severity: severityFromConcern(context.rubricDeviationCount * 12),
      driftReason: "Reviewers may be applying rubric criteria inconsistently.",
      manualResolution: "Re-apply rubric manually on sample cases.",
      blocksQaSignoff: context.rubricDeviationCount >= 5,
    },
    {
      id: "HRQA_DRIFT_003",
      label: "Decision hold drift",
      lane: "decision-freeze",
      driftScore: clampScore(context.qaExceptionCount * 14),
      severity: severityFromConcern(context.qaExceptionCount * 11),
      driftReason: "Some QA cases require re-checking non-actionability.",
      manualResolution: "Confirm decision freeze and blocked outcomes manually.",
      blocksQaSignoff: context.qaExceptionCount >= 5,
    },
  ];
}

function buildQaGateMatrix(
  context: Required<HumanReviewQualityAssuranceInput>,
  sourceNodes: HumanReviewQualitySourceNode[],
): QaGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "HRQA_GATE_001",
      label: "Peer calibration is complete enough",
      lane: "peer-calibration" as HumanReviewQualityLane,
      score: context.reviewerCalibrationScore - context.peerReviewGapCount * 4,
      reviewer: "peer calibration reviewer",
      requiredEvidence: ["peer calibration board", "reviewer drift watch", "QA exceptions"],
      hardStop: "Do not sign off QA with unresolved peer calibration gaps.",
    },
    {
      id: "HRQA_GATE_002",
      label: "Rubric quality is complete enough",
      lane: "rubric-quality" as HumanReviewQualityLane,
      score: context.rubricQualityScore - context.rubricDeviationCount * 4,
      reviewer: "rubric reviewer",
      requiredEvidence: ["rubric matrix", "rationale ledger", "evidence integrity board"],
      hardStop: "Do not sign off QA with unresolved rubric deviations.",
    },
    {
      id: "HRQA_GATE_003",
      label: "Reviewer drift is controlled",
      lane: "reviewer-drift" as HumanReviewQualityLane,
      score: 100 - context.reviewerDriftSignalCount * 12,
      reviewer: context.qaLeadRole,
      requiredEvidence: ["reviewer drift watch", "peer calibration notes"],
      hardStop: "Do not close QA while reviewer drift signals remain unresolved.",
    },
    {
      id: "HRQA_GATE_004",
      label: "Decision freeze remains active",
      lane: "decision-freeze" as HumanReviewQualityLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["decision freeze certificate", "board pack", "guardrails"],
      hardStop: "No operational output is allowed.",
    },
    {
      id: "HRQA_GATE_005",
      label: "QA audit replay is reviewable",
      lane: "audit-replay" as HumanReviewQualityLane,
      score: context.reviewerCalibrationScore - context.qaExceptionCount * 3,
      reviewer: "QA audit reviewer",
      requiredEvidence: ["audit replay", "source nodes", "exception register"],
      hardStop: "Do not close QA if replay path is unclear.",
    },
    {
      id: "HRQA_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "qa-board" as HumanReviewQualityLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before QA-ready state.",
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

function buildQaExceptionRegister(context: Required<HumanReviewQualityAssuranceInput>): QaExceptionItem[] {
  return [
    {
      id: "HRQA_EXCEPTION_001",
      label: "Peer review gap exception",
      lane: "exception-register",
      priority: context.peerReviewGapCount >= 5 ? "urgent" : "high",
      severity: context.peerReviewGapCount >= 5 ? "critical" : "elevated",
      exceptionReason: `${context.peerReviewGapCount} peer review gaps require QA review.`,
      manualResolution: "Resolve peer review gaps manually.",
      blocksQaBoard: context.peerReviewGapCount >= 5,
    },
    {
      id: "HRQA_EXCEPTION_002",
      label: "Rubric deviation exception",
      lane: "exception-register",
      priority: context.rubricDeviationCount >= 5 ? "urgent" : "high",
      severity: context.rubricDeviationCount >= 5 ? "critical" : "elevated",
      exceptionReason: `${context.rubricDeviationCount} rubric deviations require QA review.`,
      manualResolution: "Resolve rubric deviations manually.",
      blocksQaBoard: context.rubricDeviationCount >= 5,
    },
    {
      id: "HRQA_EXCEPTION_003",
      label: "QA board exception",
      lane: "qa-board",
      priority: context.qaExceptionCount >= 4 ? "urgent" : "high",
      severity: context.qaExceptionCount >= 4 ? "elevated" : "watch",
      exceptionReason: `${context.qaExceptionCount} QA exceptions remain open.`,
      manualResolution: "Close QA exceptions manually before signoff.",
      blocksQaBoard: context.qaExceptionCount >= 5,
    },
  ];
}

function buildDecisionFreezeCertificate(): QaDecisionFreezeItem[] {
  return [
    {
      id: "HRQA_FREEZE_001",
      label: "Provider output QA freeze",
      lane: "decision-freeze",
      freezeEnforced: true,
      severity: "critical",
      freezeReason: "QA output cannot create or accept provider output.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "HRQA_FREEZE_002",
      label: "Operational QA freeze",
      lane: "decision-freeze",
      freezeEnforced: true,
      severity: "critical",
      freezeReason: "QA output cannot create operational work.",
      blockedOutcome: "No task, intervention, dispatch or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "HRQA_FREEZE_003",
      label: "Prescriptive QA freeze",
      lane: "decision-freeze",
      freezeEnforced: true,
      severity: "critical",
      freezeReason: "QA output cannot create product, dosage or production guidance.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildAuditReplay(context: Required<HumanReviewQualityAssuranceInput>): QaAuditReplayItem[] {
  return [
    {
      id: "HRQA_REPLAY_001",
      label: "Mission control QA replay",
      lane: "audit-replay",
      replayReady: context.missionControlScore >= 70,
      replayScore: clampScore(context.missionControlScore),
      severity: severityFromConcern(100 - context.missionControlScore),
      replayQuestion: "Can mission-control QA decisions be replayed manually?",
      manualResolution: "Attach mission-control replay note to QA packet.",
    },
    {
      id: "HRQA_REPLAY_002",
      label: "Consensus calibration QA replay",
      lane: "audit-replay",
      replayReady: context.consensusCalibrationScore >= 70,
      replayScore: clampScore(context.consensusCalibrationScore),
      severity: severityFromConcern(100 - context.consensusCalibrationScore),
      replayQuestion: "Can peer calibration outcomes be replayed manually?",
      manualResolution: "Attach consensus calibration replay note.",
    },
    {
      id: "HRQA_REPLAY_003",
      label: "Board pack QA replay",
      lane: "audit-replay",
      replayReady: context.boardPackScore >= 70,
      replayScore: clampScore(context.boardPackScore),
      severity: severityFromConcern(100 - context.boardPackScore),
      replayQuestion: "Can the board pack QA path be followed without actionability?",
      manualResolution: "Attach board pack replay note and keep decision freeze active.",
    },
  ];
}

function buildQaSignoff(
  context: Required<HumanReviewQualityAssuranceInput>,
  gates: QaGateItem[],
): QaSignoffItem[] {
  return [
    {
      id: "HRQA_SIGNOFF_001",
      label: "Peer calibration signoff",
      lane: "human-signoff",
      signoffReady: context.peerReviewGapCount < 5,
      reviewer: "peer calibration reviewer",
      requiredEvidence: ["peer calibration board", "reviewer drift watch"],
      safeOutcome: "Manual peer calibration signoff only.",
    },
    {
      id: "HRQA_SIGNOFF_002",
      label: "Rubric QA signoff",
      lane: "human-signoff",
      signoffReady: context.rubricDeviationCount < 5,
      reviewer: "rubric reviewer",
      requiredEvidence: ["rubric quality matrix", "QA exceptions"],
      safeOutcome: "Manual rubric QA signoff only.",
    },
    {
      id: "HRQA_SIGNOFF_003",
      label: "QA board signoff",
      lane: "human-signoff",
      signoffReady: gates.every((gate) => gate.passed),
      reviewer: context.qaLeadRole,
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual QA board signoff packet only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<HumanReviewQualityAssuranceInput>,
  sourceNodes: HumanReviewQualitySourceNode[],
  gates: QaGateItem[],
  driftWatch: ReviewerDriftWatchItem[],
  exceptions: QaExceptionItem[],
  signoff: QaSignoffItem[],
): QaRiskItem[] {
  const risks: QaRiskItem[] = [];

  if (context.peerReviewGapCount > 0) {
    risks.push({
      id: "HRQA_RISK_001",
      label: "Peer review gaps",
      lane: "peer-calibration",
      severity: context.peerReviewGapCount >= 5 ? "critical" : "elevated",
      reason: `${context.peerReviewGapCount} peer review gaps remain open.`,
      manualResolution: "Resolve peer review gaps manually.",
      blocksQaBoard: context.peerReviewGapCount >= 5,
    });
  }

  if (context.rubricDeviationCount > 0) {
    risks.push({
      id: "HRQA_RISK_002",
      label: "Rubric deviations",
      lane: "rubric-quality",
      severity: context.rubricDeviationCount >= 5 ? "critical" : "elevated",
      reason: `${context.rubricDeviationCount} rubric deviations remain open.`,
      manualResolution: "Resolve rubric deviations manually.",
      blocksQaBoard: context.rubricDeviationCount >= 5,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `HRQA_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksQaBoard: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `HRQA_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `QA gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksQaBoard: gate.severity === "critical" || gate.score < 60,
      });
    });

  driftWatch
    .filter((item) => item.blocksQaSignoff)
    .forEach((item, index) => {
      risks.push({
        id: `HRQA_DRIFT_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.driftReason,
        manualResolution: item.manualResolution,
        blocksQaBoard: true,
      });
    });

  exceptions
    .filter((item) => item.blocksQaBoard)
    .forEach((item, index) => {
      risks.push({
        id: `HRQA_EXCEPTION_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.exceptionReason,
        manualResolution: item.manualResolution,
        blocksQaBoard: true,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `HRQA_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "QA signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksQaBoard: true,
      });
    });

  return risks;
}

export function buildAiHumanReviewQualityAssuranceReport(
  input: HumanReviewQualityAssuranceInput = {},
): HumanReviewQualityAssuranceReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const peerCalibrationBoard = buildPeerCalibrationBoard(context);
  const rubricQualityMatrix = buildRubricQualityMatrix(context);
  const reviewerDriftWatch = buildReviewerDriftWatch(context);
  const qaGateMatrix = buildQaGateMatrix(context, sourceNodes);
  const qaExceptionRegister = buildQaExceptionRegister(context);
  const decisionFreezeCertificate = buildDecisionFreezeCertificate();
  const auditReplay = buildAuditReplay(context);
  const qaSignoff = buildQaSignoff(context, qaGateMatrix);
  const qaRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    qaGateMatrix,
    reviewerDriftWatch,
    qaExceptionRegister,
    qaSignoff,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const peerAverage =
    peerCalibrationBoard.reduce((sum, item) => sum + item.calibrationScore, 0) /
    Math.max(1, peerCalibrationBoard.length);

  const rubricAverage =
    rubricQualityMatrix.reduce((sum, item) => sum + item.rubricScore, 0) /
    Math.max(1, rubricQualityMatrix.length);

  const gateAverage =
    qaGateMatrix.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, qaGateMatrix.length);

  const riskPenalty = qaRiskRegister.filter((item) => item.blocksQaBoard).length * 10;
  const exceptionPressure =
    qaExceptionRegister.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, qaExceptionRegister.length * 3);

  const qaScore = clampScore(
    sourceAverage / 4 +
      peerAverage / 4 +
      rubricAverage / 4 +
      gateAverage / 4 +
      exceptionPressure -
      riskPenalty -
      context.peerReviewGapCount -
      context.rubricDeviationCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.qaCaseCount * 2 +
        context.peerReviewGapCount * 8 +
        context.rubricDeviationCount * 8 +
        context.reviewerDriftSignalCount * 9 +
        context.qaExceptionCount * 7,
    ),
  );

  const qaStatus = bandFromScore(
    qaScore,
    qaRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: HUMAN_REVIEW_QUALITY_ASSURANCE_READINESS,
    qaScore,
    qaStatus,
    overallSeverity,
    sourceNodes,
    peerCalibrationBoard,
    rubricQualityMatrix,
    reviewerDriftWatch,
    qaGateMatrix,
    qaExceptionRegister,
    decisionFreezeCertificate,
    auditReplay,
    qaSignoff,
    qaRiskRegister,
    redactedExportBundle: {
      exportId: "human_review_quality_assurance_v13_5_redacted_dry_run",
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
        "peer calibration board",
        "rubric quality matrix",
        "reviewer drift watch",
        "QA gate matrix",
        "QA exception register",
        "decision freeze certificate",
        "audit replay",
        "QA signoff",
        "QA risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Human review quality assurance is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Peer calibration, rubric review and QA signoff are review concepts only.",
      "Every QA conclusion remains behind human review, decision freeze and manual signoff.",
    ],
  };
}

export const aiHumanReviewQualityAssuranceVersion = "V13.5";
