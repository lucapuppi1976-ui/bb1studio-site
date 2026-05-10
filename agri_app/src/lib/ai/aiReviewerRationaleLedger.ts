export type ReviewerRationaleLedgerMode = "dry-run" | "rationale-board-review";

export type ReviewerRationaleSeverity = "info" | "watch" | "elevated" | "critical";

export type ReviewerRationalePriority = "low" | "medium" | "high" | "urgent";

export type ReviewerRationaleReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "rationale-ready";

export type ReviewerRationaleLane =
  | "rationale-ledger"
  | "evidence-trace"
  | "decision-hold"
  | "reviewer-rationale"
  | "custody-link"
  | "consensus-link"
  | "audit-replay"
  | "human-signoff";

export interface ReviewerRationaleLedgerGuardrail {
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
  reviewerRationaleReady: true;
  evidenceDecisionTraceReady: true;
  rationaleAuditReplayReady: true;
  humanRationaleSignoffReady: true;
}

export interface ReviewerRationaleLedgerInput {
  rationaleItemCount?: number;
  missingRationaleCount?: number;
  unlinkedEvidenceCount?: number;
  reviewerDissentLinkCount?: number;
  escalationHoldCount?: number;
  evidenceTraceabilityScore?: number;
  rationaleCompletenessScore?: number;
  decisionHoldScore?: number;
  custodyIntegrityScore?: number;
  consensusCalibrationScore?: number;
  missionControlScore?: number;
  reviewerConfidenceScore?: number;
  leadReviewerRole?: string;
}

export interface ReviewerRationaleSourceNode {
  id: string;
  lane: ReviewerRationaleLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ReviewerRationaleSeverity;
  priority: ReviewerRationalePriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface EvidenceDecisionTraceItem {
  id: string;
  label: string;
  lane: ReviewerRationaleLane;
  traceScore: number;
  evidenceAnchor: string;
  rationaleAnchor: string;
  severity: ReviewerRationaleSeverity;
  traceQuestion: string;
  manualResolution: string;
}

export interface ReviewerRationaleItem {
  id: string;
  label: string;
  lane: ReviewerRationaleLane;
  completenessScore: number;
  reviewerRole: string;
  rationaleQuestion: string;
  requiredEvidence: string[];
  severity: ReviewerRationaleSeverity;
}

export interface DecisionHoldReasonItem {
  id: string;
  label: string;
  lane: ReviewerRationaleLane;
  holdEnforced: true;
  severity: ReviewerRationaleSeverity;
  holdReason: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface RationaleTraceabilityGate {
  id: string;
  label: string;
  lane: ReviewerRationaleLane;
  passed: boolean;
  score: number;
  severity: ReviewerRationaleSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface RationaleDissentLinkItem {
  id: string;
  label: string;
  lane: ReviewerRationaleLane;
  dissentLinkScore: number;
  dissentSource: string;
  rationaleImpact: string;
  severity: ReviewerRationaleSeverity;
  manualResolution: string;
}

export interface RationaleAuditReplayItem {
  id: string;
  label: string;
  lane: ReviewerRationaleLane;
  replayReady: boolean;
  replayScore: number;
  severity: ReviewerRationaleSeverity;
  replayQuestion: string;
  manualResolution: string;
}

export interface RationaleEscalationQuestion {
  id: string;
  priority: ReviewerRationalePriority;
  reviewer: string;
  question: string;
  requiredEvidence: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface RationaleSignoffItem {
  id: string;
  label: string;
  lane: ReviewerRationaleLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface RationaleRiskItem {
  id: string;
  label: string;
  lane: ReviewerRationaleLane;
  severity: ReviewerRationaleSeverity;
  reason: string;
  manualResolution: string;
  blocksRationaleBoard: boolean;
}

export interface ReviewerRationaleLedgerReport {
  generatedAt: string;
  mode: ReviewerRationaleLedgerMode;
  context: Required<ReviewerRationaleLedgerInput>;
  readiness: ReviewerRationaleLedgerGuardrail;
  rationaleScore: number;
  rationaleStatus: ReviewerRationaleReadinessBand;
  overallSeverity: ReviewerRationaleSeverity;
  sourceNodes: ReviewerRationaleSourceNode[];
  evidenceDecisionTrace: EvidenceDecisionTraceItem[];
  reviewerRationaleLedger: ReviewerRationaleItem[];
  decisionHoldReasons: DecisionHoldReasonItem[];
  traceabilityGates: RationaleTraceabilityGate[];
  dissentLinks: RationaleDissentLinkItem[];
  auditReplay: RationaleAuditReplayItem[];
  escalationBoard: RationaleEscalationQuestion[];
  rationaleSignoff: RationaleSignoffItem[];
  rationaleRiskRegister: RationaleRiskItem[];
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

export const REVIEWER_RATIONALE_LEDGER_READINESS: ReviewerRationaleLedgerGuardrail = {
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
  reviewerRationaleReady: true,
  evidenceDecisionTraceReady: true,
  rationaleAuditReplayReady: true,
  humanRationaleSignoffReady: true,
};

const priorityWeight: Record<ReviewerRationalePriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ReviewerRationaleLedgerInput): Required<ReviewerRationaleLedgerInput> {
  return {
    rationaleItemCount: input.rationaleItemCount ?? 16,
    missingRationaleCount: input.missingRationaleCount ?? 5,
    unlinkedEvidenceCount: input.unlinkedEvidenceCount ?? 5,
    reviewerDissentLinkCount: input.reviewerDissentLinkCount ?? 4,
    escalationHoldCount: input.escalationHoldCount ?? 4,
    evidenceTraceabilityScore: input.evidenceTraceabilityScore ?? 72,
    rationaleCompletenessScore: input.rationaleCompletenessScore ?? 71,
    decisionHoldScore: input.decisionHoldScore ?? 78,
    custodyIntegrityScore: input.custodyIntegrityScore ?? 73,
    consensusCalibrationScore: input.consensusCalibrationScore ?? 72,
    missionControlScore: input.missionControlScore ?? 73,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    leadReviewerRole: input.leadReviewerRole ?? "reviewer rationale lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ReviewerRationaleSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ReviewerRationaleSeverity): ReviewerRationalePriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ReviewerRationaleReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "rationale-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ReviewerRationaleLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ReviewerRationaleSourceNode {
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
        ? ["Reviewer rationale traceability is below signoff threshold.", "Rationale board must resolve missing rationale, unlinked evidence and escalation holds."]
        : [],
  };
}

function buildSourceNodes(context: Required<ReviewerRationaleLedgerInput>): ReviewerRationaleSourceNode[] {
  const rationalePressure = context.missingRationaleCount * 5;
  const evidencePressure = context.unlinkedEvidenceCount * 5;
  const dissentPressure = context.reviewerDissentLinkCount * 4;
  const escalationPressure = context.escalationHoldCount * 5;

  return [
    buildSourceNode(
      "RRL_NODE_001",
      "reviewer-rationale",
      "Mission control rationale baseline",
      "V13.0",
      context.missionControlScore,
      context.reviewerConfidenceScore,
      rationalePressure,
      "Connect mission-control review reasons to rationale ledger.",
    ),
    buildSourceNode(
      "RRL_NODE_002",
      "consensus-link",
      "Consensus calibration rationale baseline",
      "V13.1",
      context.consensusCalibrationScore,
      context.reviewerConfidenceScore,
      dissentPressure,
      "Connect reviewer consensus and dissent rationale to traceability matrix.",
    ),
    buildSourceNode(
      "RRL_NODE_003",
      "custody-link",
      "Evidence custody baseline",
      "V13.2",
      context.custodyIntegrityScore,
      context.reviewerConfidenceScore,
      evidencePressure,
      "Connect evidence custody to rationale ledger.",
    ),
    buildSourceNode(
      "RRL_NODE_004",
      "evidence-trace",
      "Evidence-to-rationale trace",
      "V13.3",
      context.evidenceTraceabilityScore,
      context.rationaleCompletenessScore,
      evidencePressure + rationalePressure / 2,
      "Resolve evidence links before rationale signoff.",
    ),
    buildSourceNode(
      "RRL_NODE_005",
      "rationale-ledger",
      "Reviewer rationale ledger",
      "V13.3",
      context.rationaleCompletenessScore,
      context.reviewerConfidenceScore,
      rationalePressure,
      "Review missing rationale items manually.",
    ),
    buildSourceNode(
      "RRL_NODE_006",
      "decision-hold",
      "Decision hold rationale",
      "V13.3",
      context.decisionHoldScore,
      context.reviewerConfidenceScore,
      escalationPressure,
      "Keep operational outcomes locked while rationale is incomplete.",
    ),
    buildSourceNode(
      "RRL_NODE_007",
      "audit-replay",
      "Rationale audit replay",
      "V13.3",
      context.evidenceTraceabilityScore,
      context.custodyIntegrityScore,
      context.rationaleItemCount,
      "Replay evidence-to-rationale path manually.",
    ),
    buildSourceNode(
      "RRL_NODE_008",
      "human-signoff",
      "Rationale signoff board",
      "V13.3",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      escalationPressure,
      "Confirm rationale signoff remains manual.",
    ),
  ];
}

function buildEvidenceDecisionTrace(context: Required<ReviewerRationaleLedgerInput>): EvidenceDecisionTraceItem[] {
  return [
    {
      id: "RRL_TRACE_001",
      label: "Photo evidence to reviewer rationale",
      lane: "evidence-trace",
      traceScore: clampScore(context.evidenceTraceabilityScore),
      evidenceAnchor: "photo evidence bundle",
      rationaleAnchor: "reviewer rationale note",
      severity: severityFromConcern(100 - context.evidenceTraceabilityScore + context.unlinkedEvidenceCount * 8),
      traceQuestion: "Which reviewer rationale is supported by photo evidence?",
      manualResolution: "Link evidence to rationale manually; do not create an action.",
    },
    {
      id: "RRL_TRACE_002",
      label: "Consensus rationale to custody packet",
      lane: "consensus-link",
      traceScore: clampScore(context.consensusCalibrationScore),
      evidenceAnchor: "consensus calibration board",
      rationaleAnchor: "consensus rationale note",
      severity: severityFromConcern(100 - context.consensusCalibrationScore + context.reviewerDissentLinkCount * 7),
      traceQuestion: "Does consensus rationale reference dissent and calibration outcomes?",
      manualResolution: "Attach consensus reasoning to rationale audit replay.",
    },
    {
      id: "RRL_TRACE_003",
      label: "Custody record to final hold reason",
      lane: "custody-link",
      traceScore: clampScore(context.custodyIntegrityScore),
      evidenceAnchor: "evidence custody board",
      rationaleAnchor: "decision hold reason",
      severity: severityFromConcern(100 - context.custodyIntegrityScore + context.unlinkedEvidenceCount * 6),
      traceQuestion: "Does custody status explain the decision hold?",
      manualResolution: "Keep hold active until custody linkage is reviewed.",
    },
  ];
}

function buildReviewerRationaleLedger(context: Required<ReviewerRationaleLedgerInput>): ReviewerRationaleItem[] {
  return [
    {
      id: "RRL_LEDGER_001",
      label: "Primary agronomic interpretation rationale",
      lane: "rationale-ledger",
      completenessScore: clampScore(context.rationaleCompletenessScore),
      reviewerRole: "agronomic reviewer",
      rationaleQuestion: "Why is this interpretation plausible, and what remains uncertain?",
      requiredEvidence: ["photo evidence", "temporal trend", "custody status"],
      severity: severityFromConcern(100 - context.rationaleCompletenessScore + context.missingRationaleCount * 6),
    },
    {
      id: "RRL_LEDGER_002",
      label: "Evidence sufficiency rationale",
      lane: "reviewer-rationale",
      completenessScore: clampScore(context.evidenceTraceabilityScore - context.unlinkedEvidenceCount * 3),
      reviewerRole: "evidence reviewer",
      rationaleQuestion: "Which evidence is sufficient, weak or missing?",
      requiredEvidence: ["evidence trace", "redaction ledger", "audit replay"],
      severity: severityFromConcern(context.unlinkedEvidenceCount * 12),
    },
    {
      id: "RRL_LEDGER_003",
      label: "Decision hold rationale",
      lane: "decision-hold",
      completenessScore: clampScore(context.decisionHoldScore),
      reviewerRole: "safety reviewer",
      rationaleQuestion: "Why must the case remain non-operational?",
      requiredEvidence: ["decision hold reasons", "guardrails", "human signoff status"],
      severity: "critical",
    },
  ];
}

function buildDecisionHoldReasons(): DecisionHoldReasonItem[] {
  return [
    {
      id: "RRL_HOLD_001",
      label: "Provider output hold",
      lane: "decision-hold",
      holdEnforced: true,
      severity: "critical",
      holdReason: "No provider output exists or can become a decision.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "RRL_HOLD_002",
      label: "Operational action hold",
      lane: "decision-hold",
      holdEnforced: true,
      severity: "critical",
      holdReason: "Rationale ledger cannot create work.",
      blockedOutcome: "No task, intervention, dispatch or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "RRL_HOLD_003",
      label: "Prescriptive output hold",
      lane: "decision-hold",
      holdEnforced: true,
      severity: "critical",
      holdReason: "Rationale ledger cannot produce product, dosage or production guidance.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildTraceabilityGates(
  context: Required<ReviewerRationaleLedgerInput>,
  sourceNodes: ReviewerRationaleSourceNode[],
): RationaleTraceabilityGate[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "RRL_GATE_001",
      label: "Evidence-to-rationale trace is complete enough",
      lane: "evidence-trace" as ReviewerRationaleLane,
      score: context.evidenceTraceabilityScore - context.unlinkedEvidenceCount * 4,
      reviewer: "traceability reviewer",
      requiredEvidence: ["evidence trace", "rationale ledger", "custody board"],
      hardStop: "Do not sign off rationale with unlinked evidence.",
    },
    {
      id: "RRL_GATE_002",
      label: "Reviewer rationale is complete enough",
      lane: "rationale-ledger" as ReviewerRationaleLane,
      score: context.rationaleCompletenessScore - context.missingRationaleCount * 4,
      reviewer: "rationale reviewer",
      requiredEvidence: ["reviewer rationale ledger", "audit replay", "human signoff"],
      hardStop: "Do not close rationale with missing reviewer reasoning.",
    },
    {
      id: "RRL_GATE_003",
      label: "Dissent links are explained",
      lane: "consensus-link" as ReviewerRationaleLane,
      score: context.consensusCalibrationScore - context.reviewerDissentLinkCount * 4,
      reviewer: "consensus reviewer",
      requiredEvidence: ["dissent links", "consensus calibration", "dispute board"],
      hardStop: "Do not close rationale with unresolved dissent linkage.",
    },
    {
      id: "RRL_GATE_004",
      label: "Decision holds remain active",
      lane: "decision-hold" as ReviewerRationaleLane,
      score: context.decisionHoldScore,
      reviewer: "safety reviewer",
      requiredEvidence: ["decision hold reasons", "guardrails", "human signoff status"],
      hardStop: "No operational output is allowed.",
    },
    {
      id: "RRL_GATE_005",
      label: "Audit replay is reviewable",
      lane: "audit-replay" as ReviewerRationaleLane,
      score: context.evidenceTraceabilityScore - context.escalationHoldCount * 3,
      reviewer: "audit replay reviewer",
      requiredEvidence: ["audit replay", "evidence trace", "custody link"],
      hardStop: "Do not close rationale if replay path is unclear.",
    },
    {
      id: "RRL_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "human-signoff" as ReviewerRationaleLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before rationale-ready state.",
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

function buildDissentLinks(context: Required<ReviewerRationaleLedgerInput>): RationaleDissentLinkItem[] {
  return [
    {
      id: "RRL_DISSENT_001",
      label: "Consensus dissent to rationale link",
      lane: "consensus-link",
      dissentLinkScore: clampScore(context.consensusCalibrationScore - context.reviewerDissentLinkCount * 5),
      dissentSource: "reviewer consensus calibration",
      rationaleImpact: "Requires explicit rationale note before signoff.",
      severity: severityFromConcern(context.reviewerDissentLinkCount * 14),
      manualResolution: "Attach dissent rationale manually.",
    },
    {
      id: "RRL_DISSENT_002",
      label: "Evidence weighting dissent to hold link",
      lane: "decision-hold",
      dissentLinkScore: clampScore(context.evidenceTraceabilityScore - context.unlinkedEvidenceCount * 4),
      dissentSource: "evidence weighting board",
      rationaleImpact: "Keeps decision hold active until evidence link is reviewed.",
      severity: severityFromConcern(context.unlinkedEvidenceCount * 12),
      manualResolution: "Resolve evidence link before rationale signoff.",
    },
  ];
}

function buildAuditReplay(context: Required<ReviewerRationaleLedgerInput>): RationaleAuditReplayItem[] {
  return [
    {
      id: "RRL_REPLAY_001",
      label: "Mission control rationale replay",
      lane: "audit-replay",
      replayReady: context.missionControlScore >= 70,
      replayScore: clampScore(context.missionControlScore),
      severity: severityFromConcern(100 - context.missionControlScore),
      replayQuestion: "Can mission-control rationale be replayed manually?",
      manualResolution: "Attach mission-control rationale to replay packet.",
    },
    {
      id: "RRL_REPLAY_002",
      label: "Consensus rationale replay",
      lane: "audit-replay",
      replayReady: context.consensusCalibrationScore >= 70,
      replayScore: clampScore(context.consensusCalibrationScore),
      severity: severityFromConcern(100 - context.consensusCalibrationScore),
      replayQuestion: "Can consensus rationale and dissent links be replayed manually?",
      manualResolution: "Attach consensus rationale to replay packet.",
    },
    {
      id: "RRL_REPLAY_003",
      label: "Custody rationale replay",
      lane: "audit-replay",
      replayReady: context.custodyIntegrityScore >= 70,
      replayScore: clampScore(context.custodyIntegrityScore),
      severity: severityFromConcern(100 - context.custodyIntegrityScore),
      replayQuestion: "Can custody linkage explain the final hold reason?",
      manualResolution: "Attach custody board rationale to replay packet.",
    },
  ];
}

function buildEscalationBoard(
  context: Required<ReviewerRationaleLedgerInput>,
  gates: RationaleTraceabilityGate[],
): RationaleEscalationQuestion[] {
  return [
    {
      id: "RRL_ESCALATION_001",
      priority: context.missingRationaleCount >= 5 ? "urgent" : "high",
      reviewer: "rationale reviewer",
      question: "Which missing rationale items block human signoff?",
      requiredEvidence: ["reviewer rationale ledger", "traceability gates", "audit replay"],
      safeOutcome: "Manual rationale board note only.",
      manualOnly: true,
    },
    {
      id: "RRL_ESCALATION_002",
      priority: context.unlinkedEvidenceCount >= 5 ? "urgent" : "high",
      reviewer: "traceability reviewer",
      question: "Which evidence links must be resolved before rationale closure?",
      requiredEvidence: ["evidence trace", "custody link", "redacted export packet"],
      safeOutcome: "Manual evidence-to-rationale note only.",
      manualOnly: true,
    },
    {
      id: "RRL_ESCALATION_003",
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      reviewer: context.leadReviewerRole,
      question: "Can the rationale ledger proceed without any automatic or operational output?",
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual rationale signoff packet only.",
      manualOnly: true,
    },
  ];
}

function buildRationaleSignoff(
  context: Required<ReviewerRationaleLedgerInput>,
  gates: RationaleTraceabilityGate[],
): RationaleSignoffItem[] {
  return [
    {
      id: "RRL_SIGNOFF_001",
      label: "Evidence trace signoff",
      lane: "human-signoff",
      signoffReady: context.unlinkedEvidenceCount < 5,
      reviewer: "traceability reviewer",
      requiredEvidence: ["evidence trace", "custody board", "audit replay"],
      safeOutcome: "Manual evidence trace signoff only.",
    },
    {
      id: "RRL_SIGNOFF_002",
      label: "Reviewer rationale signoff",
      lane: "human-signoff",
      signoffReady: context.missingRationaleCount < 5,
      reviewer: "rationale reviewer",
      requiredEvidence: ["reviewer rationale ledger", "dissent links", "decision holds"],
      safeOutcome: "Manual reviewer rationale signoff only.",
    },
    {
      id: "RRL_SIGNOFF_003",
      label: "Lead rationale board signoff",
      lane: "human-signoff",
      signoffReady: gates.every((gate) => gate.passed),
      reviewer: context.leadReviewerRole,
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual rationale board signoff packet only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<ReviewerRationaleLedgerInput>,
  sourceNodes: ReviewerRationaleSourceNode[],
  gates: RationaleTraceabilityGate[],
  signoff: RationaleSignoffItem[],
): RationaleRiskItem[] {
  const risks: RationaleRiskItem[] = [];

  if (context.missingRationaleCount > 0) {
    risks.push({
      id: "RRL_RISK_001",
      label: "Missing rationale items",
      lane: "rationale-ledger",
      severity: context.missingRationaleCount >= 5 ? "critical" : "elevated",
      reason: `${context.missingRationaleCount} rationale items require reviewer completion.`,
      manualResolution: "Complete rationale notes manually before signoff.",
      blocksRationaleBoard: context.missingRationaleCount >= 5,
    });
  }

  if (context.unlinkedEvidenceCount > 0) {
    risks.push({
      id: "RRL_RISK_002",
      label: "Unlinked evidence items",
      lane: "evidence-trace",
      severity: context.unlinkedEvidenceCount >= 5 ? "critical" : "elevated",
      reason: `${context.unlinkedEvidenceCount} evidence items are not linked to rationale.`,
      manualResolution: "Link evidence to rationale manually.",
      blocksRationaleBoard: context.unlinkedEvidenceCount >= 5,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `RRL_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksRationaleBoard: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `RRL_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksRationaleBoard: gate.severity === "critical" || gate.score < 60,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `RRL_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Rationale signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksRationaleBoard: true,
      });
    });

  return risks;
}

export function buildAiReviewerRationaleLedgerReport(
  input: ReviewerRationaleLedgerInput = {},
): ReviewerRationaleLedgerReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const evidenceDecisionTrace = buildEvidenceDecisionTrace(context);
  const reviewerRationaleLedger = buildReviewerRationaleLedger(context);
  const decisionHoldReasons = buildDecisionHoldReasons();
  const traceabilityGates = buildTraceabilityGates(context, sourceNodes);
  const dissentLinks = buildDissentLinks(context);
  const auditReplay = buildAuditReplay(context);
  const escalationBoard = buildEscalationBoard(context, traceabilityGates);
  const rationaleSignoff = buildRationaleSignoff(context, traceabilityGates);
  const rationaleRiskRegister = buildRiskRegister(context, sourceNodes, traceabilityGates, rationaleSignoff);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const traceAverage =
    evidenceDecisionTrace.reduce((sum, item) => sum + item.traceScore, 0) /
    Math.max(1, evidenceDecisionTrace.length);

  const rationaleAverage =
    reviewerRationaleLedger.reduce((sum, item) => sum + item.completenessScore, 0) /
    Math.max(1, reviewerRationaleLedger.length);

  const gateAverage =
    traceabilityGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, traceabilityGates.length);

  const riskPenalty = rationaleRiskRegister.filter((item) => item.blocksRationaleBoard).length * 10;
  const escalationPressure =
    escalationBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, escalationBoard.length * 3);

  const rationaleScore = clampScore(
    sourceAverage / 4 +
      traceAverage / 4 +
      rationaleAverage / 4 +
      gateAverage / 4 +
      escalationPressure -
      riskPenalty -
      context.missingRationaleCount -
      context.unlinkedEvidenceCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.rationaleItemCount * 2 +
        context.missingRationaleCount * 9 +
        context.unlinkedEvidenceCount * 9 +
        context.reviewerDissentLinkCount * 7 +
        context.escalationHoldCount * 7,
    ),
  );

  const rationaleStatus = bandFromScore(
    rationaleScore,
    rationaleRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: REVIEWER_RATIONALE_LEDGER_READINESS,
    rationaleScore,
    rationaleStatus,
    overallSeverity,
    sourceNodes,
    evidenceDecisionTrace,
    reviewerRationaleLedger,
    decisionHoldReasons,
    traceabilityGates,
    dissentLinks,
    auditReplay,
    escalationBoard,
    rationaleSignoff,
    rationaleRiskRegister,
    redactedExportBundle: {
      exportId: "reviewer_rationale_ledger_v13_3_redacted_dry_run",
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
        "evidence decision trace",
        "reviewer rationale ledger",
        "decision hold reasons",
        "traceability gates",
        "dissent links",
        "audit replay",
        "escalation board",
        "rationale signoff",
        "risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Reviewer rationale ledger is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Evidence-to-decision traceability, rationale ledger and audit replay are review concepts only.",
      "Every rationale conclusion remains behind human signoff, traceability gates and decision holds.",
    ],
  };
}

export const aiReviewerRationaleLedgerVersion = "V13.3";
