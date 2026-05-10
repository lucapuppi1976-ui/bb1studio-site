export type EvidenceIntegrityMode = "dry-run" | "custody-board-review";

export type EvidenceIntegritySeverity = "info" | "watch" | "elevated" | "critical";

export type EvidenceIntegrityPriority = "low" | "medium" | "high" | "urgent";

export type EvidenceIntegrityReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "custody-ready";

export type EvidenceIntegrityLane =
  | "custody-chain"
  | "integrity-gate"
  | "tamper-review"
  | "redaction-ledger"
  | "audit-replay"
  | "evidence-lock"
  | "escalation-board"
  | "human-signoff";

export interface EvidenceIntegrityCustodyGuardrail {
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
  evidenceIntegrityReady: true;
  custodyChainReady: true;
  auditReplayReady: true;
  humanCustodySignoffReady: true;
}

export interface EvidenceIntegrityCustodyInput {
  evidenceItemCount?: number;
  unresolvedCustodyGapCount?: number;
  tamperReviewFlagCount?: number;
  redactionConcernCount?: number;
  replayAuditItemCount?: number;
  evidenceQualityScore?: number;
  custodyCompletenessScore?: number;
  chainContinuityScore?: number;
  replayAuditScore?: number;
  reviewerConfidenceScore?: number;
  consensusCalibrationScore?: number;
  missionControlScore?: number;
  leadReviewerRole?: string;
}

export interface EvidenceIntegritySourceNode {
  id: string;
  lane: EvidenceIntegrityLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: EvidenceIntegritySeverity;
  priority: EvidenceIntegrityPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface CustodyTimelineItem {
  id: string;
  label: string;
  lane: EvidenceIntegrityLane;
  sequenceIndex: number;
  continuityScore: number;
  severity: EvidenceIntegritySeverity;
  custodyQuestion: string;
  manualResolution: string;
}

export interface IntegrityGateMatrixItem {
  id: string;
  label: string;
  lane: EvidenceIntegrityLane;
  passed: boolean;
  score: number;
  severity: EvidenceIntegritySeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface TamperReviewItem {
  id: string;
  label: string;
  lane: EvidenceIntegrityLane;
  flagScore: number;
  severity: EvidenceIntegritySeverity;
  reviewReason: string;
  manualResolution: string;
  blocksCustodySignoff: boolean;
}

export interface RedactionLedgerItem {
  id: string;
  label: string;
  lane: EvidenceIntegrityLane;
  redactionScore: number;
  severity: EvidenceIntegritySeverity;
  reviewerCheck: string;
  blockedContent: string[];
}

export interface AuditReplayItem {
  id: string;
  label: string;
  lane: EvidenceIntegrityLane;
  replayReady: boolean;
  replayScore: number;
  severity: EvidenceIntegritySeverity;
  replayQuestion: string;
  manualResolution: string;
}

export interface EvidenceLockItem {
  id: string;
  label: string;
  lane: EvidenceIntegrityLane;
  lockEnforced: true;
  severity: EvidenceIntegritySeverity;
  lockStatement: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface CustodyEscalationQuestion {
  id: string;
  priority: EvidenceIntegrityPriority;
  reviewer: string;
  question: string;
  requiredEvidence: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface CustodySignoffItem {
  id: string;
  label: string;
  lane: EvidenceIntegrityLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface EvidenceIntegrityRiskItem {
  id: string;
  label: string;
  lane: EvidenceIntegrityLane;
  severity: EvidenceIntegritySeverity;
  reason: string;
  manualResolution: string;
  blocksCustodyBoard: boolean;
}

export interface EvidenceIntegrityCustodyReport {
  generatedAt: string;
  mode: EvidenceIntegrityMode;
  context: Required<EvidenceIntegrityCustodyInput>;
  readiness: EvidenceIntegrityCustodyGuardrail;
  integrityScore: number;
  integrityStatus: EvidenceIntegrityReadinessBand;
  overallSeverity: EvidenceIntegritySeverity;
  sourceNodes: EvidenceIntegritySourceNode[];
  custodyTimeline: CustodyTimelineItem[];
  integrityGateMatrix: IntegrityGateMatrixItem[];
  tamperReviewBoard: TamperReviewItem[];
  redactionLedger: RedactionLedgerItem[];
  auditReplayTrail: AuditReplayItem[];
  evidenceLocks: EvidenceLockItem[];
  escalationBoard: CustodyEscalationQuestion[];
  custodySignoff: CustodySignoffItem[];
  integrityRiskRegister: EvidenceIntegrityRiskItem[];
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

export const EVIDENCE_INTEGRITY_CUSTODY_READINESS: EvidenceIntegrityCustodyGuardrail = {
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
  evidenceIntegrityReady: true,
  custodyChainReady: true,
  auditReplayReady: true,
  humanCustodySignoffReady: true,
};

const priorityWeight: Record<EvidenceIntegrityPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: EvidenceIntegrityCustodyInput): Required<EvidenceIntegrityCustodyInput> {
  return {
    evidenceItemCount: input.evidenceItemCount ?? 18,
    unresolvedCustodyGapCount: input.unresolvedCustodyGapCount ?? 5,
    tamperReviewFlagCount: input.tamperReviewFlagCount ?? 4,
    redactionConcernCount: input.redactionConcernCount ?? 4,
    replayAuditItemCount: input.replayAuditItemCount ?? 8,
    evidenceQualityScore: input.evidenceQualityScore ?? 74,
    custodyCompletenessScore: input.custodyCompletenessScore ?? 72,
    chainContinuityScore: input.chainContinuityScore ?? 71,
    replayAuditScore: input.replayAuditScore ?? 73,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    consensusCalibrationScore: input.consensusCalibrationScore ?? 72,
    missionControlScore: input.missionControlScore ?? 73,
    leadReviewerRole: input.leadReviewerRole ?? "evidence custody lead reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): EvidenceIntegritySeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: EvidenceIntegritySeverity): EvidenceIntegrityPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): EvidenceIntegrityReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "custody-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: EvidenceIntegrityLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): EvidenceIntegritySourceNode {
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
        ? ["Evidence custody review is below signoff threshold.", "Custody board must resolve gaps, replay questions and redaction concerns."]
        : [],
  };
}

function buildSourceNodes(context: Required<EvidenceIntegrityCustodyInput>): EvidenceIntegritySourceNode[] {
  const evidencePressure = context.evidenceItemCount * 1.5;
  const gapPressure = context.unresolvedCustodyGapCount * 5;
  const tamperPressure = context.tamperReviewFlagCount * 5;
  const redactionPressure = context.redactionConcernCount * 4;
  const replayPressure = context.replayAuditItemCount * 2;

  return [
    buildSourceNode(
      "EIC_NODE_001",
      "custody-chain",
      "Mission control evidence baseline",
      "V13.0",
      context.missionControlScore,
      context.reviewerConfidenceScore,
      evidencePressure,
      "Connect mission-control evidence queue to custody review.",
    ),
    buildSourceNode(
      "EIC_NODE_002",
      "integrity-gate",
      "Consensus calibration baseline",
      "V13.1",
      context.consensusCalibrationScore,
      context.reviewerConfidenceScore,
      gapPressure,
      "Connect consensus findings to evidence custody gates.",
    ),
    buildSourceNode(
      "EIC_NODE_003",
      "custody-chain",
      "Custody continuity board",
      "V13.2",
      context.chainContinuityScore,
      context.custodyCompletenessScore,
      gapPressure,
      "Resolve custody gaps manually before signoff.",
    ),
    buildSourceNode(
      "EIC_NODE_004",
      "tamper-review",
      "Tamper review board",
      "V13.2",
      context.evidenceQualityScore,
      context.reviewerConfidenceScore,
      tamperPressure,
      "Review potential integrity flags without deleting or altering evidence.",
    ),
    buildSourceNode(
      "EIC_NODE_005",
      "redaction-ledger",
      "Redaction ledger",
      "V13.2",
      context.evidenceQualityScore,
      context.custodyCompletenessScore,
      redactionPressure,
      "Confirm export packet remains redacted and review-only.",
    ),
    buildSourceNode(
      "EIC_NODE_006",
      "audit-replay",
      "Audit replay trail",
      "V13.2",
      context.replayAuditScore,
      context.reviewerConfidenceScore,
      replayPressure,
      "Replay the review path without producing operational outputs.",
    ),
    buildSourceNode(
      "EIC_NODE_007",
      "evidence-lock",
      "Evidence lock layer",
      "V13.2",
      context.custodyCompletenessScore,
      context.reviewerConfidenceScore,
      tamperPressure + redactionPressure,
      "Keep evidence locked for dry-run review.",
    ),
    buildSourceNode(
      "EIC_NODE_008",
      "human-signoff",
      "Custody signoff board",
      "V13.2",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      context.unresolvedCustodyGapCount * 4,
      "Confirm custody signoff remains manual.",
    ),
  ];
}

function buildCustodyTimeline(context: Required<EvidenceIntegrityCustodyInput>): CustodyTimelineItem[] {
  return [
    {
      id: "EIC_TIMELINE_001",
      label: "Evidence intake registered",
      lane: "custody-chain",
      sequenceIndex: 1,
      continuityScore: clampScore(context.chainContinuityScore),
      severity: severityFromConcern(100 - context.chainContinuityScore),
      custodyQuestion: "Is the evidence intake trace complete enough for review?",
      manualResolution: "Document intake continuity manually.",
    },
    {
      id: "EIC_TIMELINE_002",
      label: "Reviewer handoff traced",
      lane: "custody-chain",
      sequenceIndex: 2,
      continuityScore: clampScore(context.custodyCompletenessScore - context.unresolvedCustodyGapCount * 3),
      severity: severityFromConcern(context.unresolvedCustodyGapCount * 12),
      custodyQuestion: "Are reviewer handoffs clear and non-operational?",
      manualResolution: "Resolve handoff gaps before signoff.",
    },
    {
      id: "EIC_TIMELINE_003",
      label: "Consensus board linkage traced",
      lane: "audit-replay",
      sequenceIndex: 3,
      continuityScore: clampScore(context.consensusCalibrationScore),
      severity: severityFromConcern(100 - context.consensusCalibrationScore),
      custodyQuestion: "Does consensus calibration link back to evidence review?",
      manualResolution: "Attach consensus rationale to audit replay.",
    },
    {
      id: "EIC_TIMELINE_004",
      label: "Final custody review held",
      lane: "human-signoff",
      sequenceIndex: 4,
      continuityScore: clampScore(context.reviewerConfidenceScore - context.unresolvedCustodyGapCount * 2),
      severity: severityFromConcern(context.unresolvedCustodyGapCount * 10),
      custodyQuestion: "Can the board sign off custody without producing a decision?",
      manualResolution: "Keep custody signoff as a manual note only.",
    },
  ];
}

function buildIntegrityGateMatrix(
  context: Required<EvidenceIntegrityCustodyInput>,
  sourceNodes: EvidenceIntegritySourceNode[],
): IntegrityGateMatrixItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "EIC_GATE_001",
      label: "Evidence custody is reviewable",
      lane: "custody-chain" as EvidenceIntegrityLane,
      score: context.custodyCompletenessScore - context.unresolvedCustodyGapCount * 4,
      reviewer: "custody reviewer",
      requiredEvidence: ["Custody timeline", "Reviewer handoff trace", "Evidence packet"],
      hardStop: "Do not approve custody with unresolved handoff gaps.",
    },
    {
      id: "EIC_GATE_002",
      label: "Evidence integrity flags are reviewed",
      lane: "tamper-review" as EvidenceIntegrityLane,
      score: context.evidenceQualityScore - context.tamperReviewFlagCount * 5,
      reviewer: "integrity reviewer",
      requiredEvidence: ["Tamper review board", "Evidence locks", "Audit replay trail"],
      hardStop: "Do not sign off evidence with unresolved integrity flags.",
    },
    {
      id: "EIC_GATE_003",
      label: "Redaction ledger is complete enough",
      lane: "redaction-ledger" as EvidenceIntegrityLane,
      score: context.evidenceQualityScore - context.redactionConcernCount * 5,
      reviewer: "redaction reviewer",
      requiredEvidence: ["Redaction ledger", "Export packet", "Blocked content list"],
      hardStop: "Do not export review packet with open redaction concerns.",
    },
    {
      id: "EIC_GATE_004",
      label: "Audit replay is reproducible",
      lane: "audit-replay" as EvidenceIntegrityLane,
      score: context.replayAuditScore - context.replayAuditItemCount,
      reviewer: "audit replay reviewer",
      requiredEvidence: ["Replay trail", "Consensus calibration", "Mission control trace"],
      hardStop: "Do not close custody board if replay cannot be followed.",
    },
    {
      id: "EIC_GATE_005",
      label: "Evidence locks remain active",
      lane: "evidence-lock" as EvidenceIntegrityLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["Evidence locks", "Decision locks", "Manual signoff state"],
      hardStop: "No evidence output can become an operational decision.",
    },
    {
      id: "EIC_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "integrity-gate" as EvidenceIntegrityLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before custody-ready state.",
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

function buildTamperReviewBoard(context: Required<EvidenceIntegrityCustodyInput>): TamperReviewItem[] {
  return [
    {
      id: "EIC_TAMPER_001",
      label: "Image evidence continuity flag",
      lane: "tamper-review",
      flagScore: clampScore(context.tamperReviewFlagCount * 18),
      severity: severityFromConcern(context.tamperReviewFlagCount * 15),
      reviewReason: "Potential continuity concern in evidence sequence.",
      manualResolution: "Require human integrity reviewer note.",
      blocksCustodySignoff: context.tamperReviewFlagCount >= 4,
    },
    {
      id: "EIC_TAMPER_002",
      label: "Reviewer handoff anomaly flag",
      lane: "tamper-review",
      flagScore: clampScore(context.unresolvedCustodyGapCount * 16),
      severity: severityFromConcern(context.unresolvedCustodyGapCount * 13),
      reviewReason: "Custody handoff gap requires manual explanation.",
      manualResolution: "Resolve handoff gap before custody signoff.",
      blocksCustodySignoff: context.unresolvedCustodyGapCount >= 5,
    },
    {
      id: "EIC_TAMPER_003",
      label: "Replay mismatch flag",
      lane: "audit-replay",
      flagScore: clampScore((100 - context.replayAuditScore) + context.replayAuditItemCount * 2),
      severity: severityFromConcern((100 - context.replayAuditScore) + context.replayAuditItemCount * 4),
      reviewReason: "Replay trail needs reviewer confirmation.",
      manualResolution: "Replay audit trail manually and document outcome.",
      blocksCustodySignoff: context.replayAuditScore < 65,
    },
  ];
}

function buildRedactionLedger(context: Required<EvidenceIntegrityCustodyInput>): RedactionLedgerItem[] {
  return [
    {
      id: "EIC_REDACTION_001",
      label: "Field identity redaction",
      lane: "redaction-ledger",
      redactionScore: clampScore(100 - context.redactionConcernCount * 10),
      severity: severityFromConcern(context.redactionConcernCount * 12),
      reviewerCheck: "Confirm field identity is not exposed in export packet.",
      blockedContent: ["field identifier", "private note", "operator detail"],
    },
    {
      id: "EIC_REDACTION_002",
      label: "Provider material absence",
      lane: "redaction-ledger",
      redactionScore: 100,
      severity: "info",
      reviewerCheck: "Confirm no provider payload exists in this dry-run evidence packet.",
      blockedContent: ["provider payload", "external model material", "runtime call trace"],
    },
    {
      id: "EIC_REDACTION_003",
      label: "Operational data redaction",
      lane: "redaction-ledger",
      redactionScore: clampScore(100 - context.redactionConcernCount * 8),
      severity: severityFromConcern(context.redactionConcernCount * 10),
      reviewerCheck: "Confirm operational internal details remain out of the packet.",
      blockedContent: ["operational internal data", "dispatch instruction", "execution instruction"],
    },
  ];
}

function buildAuditReplayTrail(context: Required<EvidenceIntegrityCustodyInput>): AuditReplayItem[] {
  return [
    {
      id: "EIC_REPLAY_001",
      label: "Mission control replay",
      lane: "audit-replay",
      replayReady: context.missionControlScore >= 70,
      replayScore: clampScore(context.missionControlScore),
      severity: severityFromConcern(100 - context.missionControlScore),
      replayQuestion: "Can the mission-control review path be replayed manually?",
      manualResolution: "Attach mission-control rationale to custody board.",
    },
    {
      id: "EIC_REPLAY_002",
      label: "Consensus calibration replay",
      lane: "audit-replay",
      replayReady: context.consensusCalibrationScore >= 70,
      replayScore: clampScore(context.consensusCalibrationScore),
      severity: severityFromConcern(100 - context.consensusCalibrationScore),
      replayQuestion: "Can the consensus calibration path be replayed manually?",
      manualResolution: "Attach consensus rationale to custody board.",
    },
    {
      id: "EIC_REPLAY_003",
      label: "Evidence lock replay",
      lane: "audit-replay",
      replayReady: true,
      replayScore: 100,
      severity: "info",
      replayQuestion: "Are evidence locks visible across replay?",
      manualResolution: "Keep locks active in all review packets.",
    },
  ];
}

function buildEvidenceLocks(): EvidenceLockItem[] {
  return [
    {
      id: "EIC_LOCK_001",
      label: "Provider evidence lock",
      lane: "evidence-lock",
      lockEnforced: true,
      severity: "critical",
      lockStatement: "No provider-generated evidence exists or can be introduced.",
      blockedOutcome: "No provider call or provider payload.",
      reviewer: "safety reviewer",
    },
    {
      id: "EIC_LOCK_002",
      label: "Evidence mutation lock",
      lane: "evidence-lock",
      lockEnforced: true,
      severity: "critical",
      lockStatement: "Evidence packet is review-only and cannot be written or promoted.",
      blockedOutcome: "No persistence or memory write.",
      reviewer: "custody reviewer",
    },
    {
      id: "EIC_LOCK_003",
      label: "Operational decision lock",
      lane: "evidence-lock",
      lockEnforced: true,
      severity: "critical",
      lockStatement: "Evidence integrity output cannot trigger work or recommendations.",
      blockedOutcome: "No task, intervention, execution, product, dosage or forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildEscalationBoard(
  context: Required<EvidenceIntegrityCustodyInput>,
  gates: IntegrityGateMatrixItem[],
): CustodyEscalationQuestion[] {
  return [
    {
      id: "EIC_ESCALATION_001",
      priority: context.unresolvedCustodyGapCount >= 5 ? "urgent" : "high",
      reviewer: "custody reviewer",
      question: "Which custody gaps block evidence signoff?",
      requiredEvidence: ["Custody timeline", "Integrity gate matrix", "Audit replay trail"],
      safeOutcome: "Manual custody board note only.",
      manualOnly: true,
    },
    {
      id: "EIC_ESCALATION_002",
      priority: context.tamperReviewFlagCount >= 4 ? "urgent" : "high",
      reviewer: "integrity reviewer",
      question: "Which integrity flags require board review?",
      requiredEvidence: ["Tamper review board", "Evidence locks", "Replay trail"],
      safeOutcome: "Manual integrity review note only.",
      manualOnly: true,
    },
    {
      id: "EIC_ESCALATION_003",
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      reviewer: context.leadReviewerRole,
      question: "Can custody signoff proceed without any automatic or operational output?",
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual custody signoff packet only.",
      manualOnly: true,
    },
  ];
}

function buildCustodySignoff(
  context: Required<EvidenceIntegrityCustodyInput>,
  gates: IntegrityGateMatrixItem[],
): CustodySignoffItem[] {
  return [
    {
      id: "EIC_SIGNOFF_001",
      label: "Custody continuity signoff",
      lane: "human-signoff",
      signoffReady: context.unresolvedCustodyGapCount < 5,
      reviewer: "custody reviewer",
      requiredEvidence: ["Custody timeline", "Handoff trace", "Source nodes"],
      safeOutcome: "Manual custody continuity note only.",
    },
    {
      id: "EIC_SIGNOFF_002",
      label: "Integrity review signoff",
      lane: "human-signoff",
      signoffReady: context.tamperReviewFlagCount < 4,
      reviewer: "integrity reviewer",
      requiredEvidence: ["Tamper review board", "Evidence locks", "Redaction ledger"],
      safeOutcome: "Manual integrity signoff note only.",
    },
    {
      id: "EIC_SIGNOFF_003",
      label: "Audit replay signoff",
      lane: "human-signoff",
      signoffReady: gates.every((gate) => gate.passed),
      reviewer: context.leadReviewerRole,
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual audit replay signoff packet only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<EvidenceIntegrityCustodyInput>,
  sourceNodes: EvidenceIntegritySourceNode[],
  gates: IntegrityGateMatrixItem[],
  tamperBoard: TamperReviewItem[],
  signoff: CustodySignoffItem[],
): EvidenceIntegrityRiskItem[] {
  const risks: EvidenceIntegrityRiskItem[] = [];

  if (context.unresolvedCustodyGapCount > 0) {
    risks.push({
      id: "EIC_RISK_001",
      label: "Custody gaps remain open",
      lane: "custody-chain",
      severity: context.unresolvedCustodyGapCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedCustodyGapCount} custody gaps require board review.`,
      manualResolution: "Resolve custody gaps manually before signoff.",
      blocksCustodyBoard: context.unresolvedCustodyGapCount >= 5,
    });
  }

  if (context.redactionConcernCount > 0) {
    risks.push({
      id: "EIC_RISK_002",
      label: "Redaction concerns remain open",
      lane: "redaction-ledger",
      severity: context.redactionConcernCount >= 4 ? "elevated" : "watch",
      reason: `${context.redactionConcernCount} redaction concerns require review.`,
      manualResolution: "Resolve redaction concerns manually before export.",
      blocksCustodyBoard: context.redactionConcernCount >= 5,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `EIC_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksCustodyBoard: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `EIC_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksCustodyBoard: gate.severity === "critical" || gate.score < 60,
      });
    });

  tamperBoard
    .filter((item) => item.blocksCustodySignoff)
    .forEach((item, index) => {
      risks.push({
        id: `EIC_TAMPER_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.reviewReason,
        manualResolution: item.manualResolution,
        blocksCustodyBoard: true,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `EIC_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Custody signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksCustodyBoard: true,
      });
    });

  return risks;
}

export function buildAiEvidenceIntegrityCustodyReport(
  input: EvidenceIntegrityCustodyInput = {},
): EvidenceIntegrityCustodyReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const custodyTimeline = buildCustodyTimeline(context);
  const integrityGateMatrix = buildIntegrityGateMatrix(context, sourceNodes);
  const tamperReviewBoard = buildTamperReviewBoard(context);
  const redactionLedger = buildRedactionLedger(context);
  const auditReplayTrail = buildAuditReplayTrail(context);
  const evidenceLocks = buildEvidenceLocks();
  const escalationBoard = buildEscalationBoard(context, integrityGateMatrix);
  const custodySignoff = buildCustodySignoff(context, integrityGateMatrix);
  const integrityRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    integrityGateMatrix,
    tamperReviewBoard,
    custodySignoff,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const timelineAverage =
    custodyTimeline.reduce((sum, item) => sum + item.continuityScore, 0) /
    Math.max(1, custodyTimeline.length);

  const gateAverage =
    integrityGateMatrix.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, integrityGateMatrix.length);

  const replayAverage =
    auditReplayTrail.reduce((sum, item) => sum + item.replayScore, 0) /
    Math.max(1, auditReplayTrail.length);

  const riskPenalty = integrityRiskRegister.filter((item) => item.blocksCustodyBoard).length * 10;
  const escalationPressure =
    escalationBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, escalationBoard.length * 3);

  const integrityScore = clampScore(
    sourceAverage / 4 +
      timelineAverage / 4 +
      gateAverage / 4 +
      replayAverage / 4 +
      escalationPressure -
      riskPenalty -
      context.unresolvedCustodyGapCount -
      context.tamperReviewFlagCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.evidenceItemCount * 2 +
        context.unresolvedCustodyGapCount * 8 +
        context.tamperReviewFlagCount * 9 +
        context.redactionConcernCount * 6 +
        context.replayAuditItemCount * 3,
    ),
  );

  const integrityStatus = bandFromScore(
    integrityScore,
    integrityRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: EVIDENCE_INTEGRITY_CUSTODY_READINESS,
    integrityScore,
    integrityStatus,
    overallSeverity,
    sourceNodes,
    custodyTimeline,
    integrityGateMatrix,
    tamperReviewBoard,
    redactionLedger,
    auditReplayTrail,
    evidenceLocks,
    escalationBoard,
    custodySignoff,
    integrityRiskRegister,
    redactedExportBundle: {
      exportId: "evidence_integrity_custody_v13_2_redacted_dry_run",
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
        "custody timeline",
        "integrity gate matrix",
        "tamper review board",
        "redaction ledger",
        "audit replay trail",
        "evidence locks",
        "escalation board",
        "custody signoff",
        "risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Evidence integrity custody board is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Custody chain, tamper review and audit replay are review concepts only.",
      "Every evidence integrity conclusion remains behind human custody review and evidence locks.",
    ],
  };
}

export const aiEvidenceIntegrityCustodyVersion = "V13.2";
