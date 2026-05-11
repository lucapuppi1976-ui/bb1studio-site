export type HumanReviewComplianceMode = "dry-run" | "compliance-board-review";

export type HumanReviewComplianceSeverity = "info" | "watch" | "elevated" | "critical";

export type HumanReviewCompliancePriority = "low" | "medium" | "high" | "urgent";

export type HumanReviewComplianceReadinessBand =
  | "blocked"
  | "simulation-ready"
  | "review-ready"
  | "attestation-ready";

export type HumanReviewComplianceLane =
  | "compliance-attestation"
  | "accountability-ledger"
  | "governance-evidence"
  | "attestation-gate"
  | "exception-register"
  | "decision-freeze"
  | "audit-replay"
  | "human-signoff";

export interface HumanReviewComplianceAttestationGuardrail {
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
  humanComplianceAttestationReady: true;
  accountabilityLedgerReady: true;
  governanceEvidencePackReady: true;
  humanComplianceSignoffReady: true;
}

export interface HumanReviewComplianceAttestationInput {
  attestationItemCount?: number;
  unresolvedComplianceQuestionCount?: number;
  accountabilityGapCount?: number;
  governanceExceptionCount?: number;
  signoffVarianceCount?: number;
  missionControlScore?: number;
  consensusCalibrationScore?: number;
  evidenceIntegrityScore?: number;
  rationaleLedgerScore?: number;
  boardPackScore?: number;
  qualityAssuranceScore?: number;
  complianceRubricScore?: number;
  accountabilityConfidenceScore?: number;
  complianceLeadRole?: string;
}

export interface HumanReviewComplianceSourceNode {
  id: string;
  lane: HumanReviewComplianceLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: HumanReviewComplianceSeverity;
  priority: HumanReviewCompliancePriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ComplianceAttestationItem {
  id: string;
  label: string;
  lane: HumanReviewComplianceLane;
  attestationScore: number;
  severity: HumanReviewComplianceSeverity;
  attestationQuestion: string;
  manualResolution: string;
}

export interface AccountabilityLedgerItem {
  id: string;
  label: string;
  lane: HumanReviewComplianceLane;
  ownerRole: string;
  accountabilityScore: number;
  severity: HumanReviewComplianceSeverity;
  accountabilityQuestion: string;
  requiredEvidence: string[];
}

export interface GovernanceEvidencePackItem {
  id: string;
  label: string;
  lane: HumanReviewComplianceLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ComplianceGateItem {
  id: string;
  label: string;
  lane: HumanReviewComplianceLane;
  passed: boolean;
  score: number;
  severity: HumanReviewComplianceSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface GovernanceExceptionItem {
  id: string;
  label: string;
  lane: HumanReviewComplianceLane;
  priority: HumanReviewCompliancePriority;
  severity: HumanReviewComplianceSeverity;
  exceptionReason: string;
  manualResolution: string;
  blocksAttestation: boolean;
}

export interface ComplianceDecisionFreezeItem {
  id: string;
  label: string;
  lane: HumanReviewComplianceLane;
  freezeEnforced: true;
  severity: HumanReviewComplianceSeverity;
  freezeReason: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface ComplianceAuditReplayItem {
  id: string;
  label: string;
  lane: HumanReviewComplianceLane;
  replayReady: boolean;
  replayScore: number;
  severity: HumanReviewComplianceSeverity;
  replayQuestion: string;
  manualResolution: string;
}

export interface ComplianceSignoffItem {
  id: string;
  label: string;
  lane: HumanReviewComplianceLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface ComplianceRiskItem {
  id: string;
  label: string;
  lane: HumanReviewComplianceLane;
  severity: HumanReviewComplianceSeverity;
  reason: string;
  manualResolution: string;
  blocksAttestation: boolean;
}

export interface HumanReviewComplianceAttestationReport {
  generatedAt: string;
  mode: HumanReviewComplianceMode;
  context: Required<HumanReviewComplianceAttestationInput>;
  readiness: HumanReviewComplianceAttestationGuardrail;
  attestationScore: number;
  attestationStatus: HumanReviewComplianceReadinessBand;
  overallSeverity: HumanReviewComplianceSeverity;
  sourceNodes: HumanReviewComplianceSourceNode[];
  complianceAttestationBoard: ComplianceAttestationItem[];
  accountabilityLedger: AccountabilityLedgerItem[];
  governanceEvidencePack: GovernanceEvidencePackItem[];
  complianceGateMatrix: ComplianceGateItem[];
  governanceExceptionRegister: GovernanceExceptionItem[];
  decisionFreezeAssurance: ComplianceDecisionFreezeItem[];
  auditReplay: ComplianceAuditReplayItem[];
  complianceSignoff: ComplianceSignoffItem[];
  complianceRiskRegister: ComplianceRiskItem[];
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

export const HUMAN_REVIEW_COMPLIANCE_ATTESTATION_READINESS: HumanReviewComplianceAttestationGuardrail = {
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
  humanComplianceAttestationReady: true,
  accountabilityLedgerReady: true,
  governanceEvidencePackReady: true,
  humanComplianceSignoffReady: true,
};

const priorityWeight: Record<HumanReviewCompliancePriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: HumanReviewComplianceAttestationInput): Required<HumanReviewComplianceAttestationInput> {
  return {
    attestationItemCount: input.attestationItemCount ?? 18,
    unresolvedComplianceQuestionCount: input.unresolvedComplianceQuestionCount ?? 5,
    accountabilityGapCount: input.accountabilityGapCount ?? 5,
    governanceExceptionCount: input.governanceExceptionCount ?? 4,
    signoffVarianceCount: input.signoffVarianceCount ?? 4,
    missionControlScore: input.missionControlScore ?? 73,
    consensusCalibrationScore: input.consensusCalibrationScore ?? 72,
    evidenceIntegrityScore: input.evidenceIntegrityScore ?? 73,
    rationaleLedgerScore: input.rationaleLedgerScore ?? 71,
    boardPackScore: input.boardPackScore ?? 72,
    qualityAssuranceScore: input.qualityAssuranceScore ?? 72,
    complianceRubricScore: input.complianceRubricScore ?? 71,
    accountabilityConfidenceScore: input.accountabilityConfidenceScore ?? 72,
    complianceLeadRole: input.complianceLeadRole ?? "human review compliance lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): HumanReviewComplianceSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: HumanReviewComplianceSeverity): HumanReviewCompliancePriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): HumanReviewComplianceReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "attestation-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: HumanReviewComplianceLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): HumanReviewComplianceSourceNode {
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
            "Human review compliance attestation is below signoff threshold.",
            "Compliance board must resolve governance questions, accountability gaps and signoff variance.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<HumanReviewComplianceAttestationInput>): HumanReviewComplianceSourceNode[] {
  const questionPressure = context.unresolvedComplianceQuestionCount * 4;
  const accountabilityPressure = context.accountabilityGapCount * 5;
  const governancePressure = context.governanceExceptionCount * 5;
  const signoffPressure = context.signoffVarianceCount * 5;

  return [
    buildSourceNode(
      "HRCA_NODE_001",
      "compliance-attestation",
      "Mission control compliance input",
      "V13.0",
      context.missionControlScore,
      context.accountabilityConfidenceScore,
      questionPressure,
      "Confirm mission-control findings are represented in compliance attestation.",
    ),
    buildSourceNode(
      "HRCA_NODE_002",
      "accountability-ledger",
      "Consensus calibration compliance input",
      "V13.1",
      context.consensusCalibrationScore,
      context.accountabilityConfidenceScore,
      accountabilityPressure,
      "Confirm consensus responsibilities are assigned to reviewers.",
    ),
    buildSourceNode(
      "HRCA_NODE_003",
      "governance-evidence",
      "Evidence integrity compliance input",
      "V13.2",
      context.evidenceIntegrityScore,
      context.complianceRubricScore,
      governancePressure,
      "Confirm evidence integrity is included in governance evidence pack.",
    ),
    buildSourceNode(
      "HRCA_NODE_004",
      "audit-replay",
      "Rationale ledger compliance input",
      "V13.3",
      context.rationaleLedgerScore,
      context.accountabilityConfidenceScore,
      questionPressure,
      "Confirm reviewer rationale can be replayed for compliance review.",
    ),
    buildSourceNode(
      "HRCA_NODE_005",
      "decision-freeze",
      "Board pack compliance input",
      "V13.4",
      context.boardPackScore,
      context.complianceRubricScore,
      governancePressure,
      "Confirm board pack remains non-operational and manually held.",
    ),
    buildSourceNode(
      "HRCA_NODE_006",
      "attestation-gate",
      "Quality assurance compliance input",
      "V13.5",
      context.qualityAssuranceScore,
      context.complianceRubricScore,
      signoffPressure,
      "Confirm QA findings are included in compliance gates.",
    ),
    buildSourceNode(
      "HRCA_NODE_007",
      "exception-register",
      "Governance exception register",
      "V13.6",
      context.complianceRubricScore,
      context.accountabilityConfidenceScore,
      governancePressure,
      "Resolve governance exceptions manually before attestation.",
    ),
    buildSourceNode(
      "HRCA_NODE_008",
      "human-signoff",
      "Compliance signoff board",
      "V13.6",
      context.accountabilityConfidenceScore,
      context.accountabilityConfidenceScore,
      signoffPressure,
      "Confirm compliance signoff remains manual.",
    ),
  ];
}

function buildComplianceAttestationBoard(context: Required<HumanReviewComplianceAttestationInput>): ComplianceAttestationItem[] {
  return [
    {
      id: "HRCA_ATTEST_001",
      label: "Human review completeness attestation",
      lane: "compliance-attestation",
      attestationScore: clampScore(context.qualityAssuranceScore - context.unresolvedComplianceQuestionCount * 3),
      severity: severityFromConcern(context.unresolvedComplianceQuestionCount * 12),
      attestationQuestion: "Can reviewers attest that the human review packet is complete enough for a manual note?",
      manualResolution: "Resolve open compliance questions manually.",
    },
    {
      id: "HRCA_ATTEST_002",
      label: "Evidence governance attestation",
      lane: "governance-evidence",
      attestationScore: clampScore(context.evidenceIntegrityScore - context.governanceExceptionCount * 3),
      severity: severityFromConcern(context.governanceExceptionCount * 12),
      attestationQuestion: "Can reviewers attest that evidence governance is review-only and traceable?",
      manualResolution: "Resolve governance exceptions manually.",
    },
    {
      id: "HRCA_ATTEST_003",
      label: "Decision freeze attestation",
      lane: "decision-freeze",
      attestationScore: 100,
      severity: "critical",
      attestationQuestion: "Can reviewers attest that all operational outcomes remain frozen?",
      manualResolution: "Keep every operational path frozen.",
    },
  ];
}

function buildAccountabilityLedger(context: Required<HumanReviewComplianceAttestationInput>): AccountabilityLedgerItem[] {
  return [
    {
      id: "HRCA_ACCOUNT_001",
      label: "Mission control owner",
      lane: "accountability-ledger",
      ownerRole: "mission control reviewer",
      accountabilityScore: clampScore(context.missionControlScore - context.accountabilityGapCount * 2),
      severity: severityFromConcern(context.accountabilityGapCount * 10),
      accountabilityQuestion: "Who owns mission-control findings in the attestation packet?",
      requiredEvidence: ["mission control board", "review queue", "decision locks"],
    },
    {
      id: "HRCA_ACCOUNT_002",
      label: "Consensus and QA owner",
      lane: "accountability-ledger",
      ownerRole: "peer calibration reviewer",
      accountabilityScore: clampScore((context.consensusCalibrationScore + context.qualityAssuranceScore) / 2),
      severity: severityFromConcern(context.signoffVarianceCount * 10),
      accountabilityQuestion: "Who owns consensus calibration and QA variance?",
      requiredEvidence: ["consensus calibration", "QA board", "peer calibration"],
    },
    {
      id: "HRCA_ACCOUNT_003",
      label: "Compliance signoff owner",
      lane: "human-signoff",
      ownerRole: context.complianceLeadRole,
      accountabilityScore: clampScore(context.accountabilityConfidenceScore),
      severity: severityFromConcern(100 - context.accountabilityConfidenceScore + context.signoffVarianceCount * 6),
      accountabilityQuestion: "Who owns final human compliance signoff?",
      requiredEvidence: ["compliance gates", "governance evidence pack", "exception register"],
    },
  ];
}

function buildGovernanceEvidencePack(context: Required<HumanReviewComplianceAttestationInput>): GovernanceEvidencePackItem[] {
  return [
    {
      id: "HRCA_GOV_001",
      label: "Human review governance pack",
      lane: "governance-evidence",
      packReady: context.missionControlScore >= 70,
      readinessScore: clampScore(context.missionControlScore),
      reviewerCheck: "Confirm mission-control evidence is included and redacted.",
      includedSections: ["mission control", "review queue", "decision locks"],
      blockedSections: ["operational instruction", "provider material", "private note"],
    },
    {
      id: "HRCA_GOV_002",
      label: "Evidence and rationale governance pack",
      lane: "governance-evidence",
      packReady: context.evidenceIntegrityScore >= 70 && context.rationaleLedgerScore >= 70,
      readinessScore: clampScore((context.evidenceIntegrityScore + context.rationaleLedgerScore) / 2),
      reviewerCheck: "Confirm evidence custody and rationale traceability are represented.",
      includedSections: ["evidence integrity", "rationale ledger", "audit replay"],
      blockedSections: ["field identifier", "private rationale note", "execution path"],
    },
    {
      id: "HRCA_GOV_003",
      label: "QA and board pack governance pack",
      lane: "governance-evidence",
      packReady: context.qualityAssuranceScore >= 70 && context.boardPackScore >= 70,
      readinessScore: clampScore((context.qualityAssuranceScore + context.boardPackScore) / 2),
      reviewerCheck: "Confirm QA and board pack stay non-actionable.",
      includedSections: ["QA board", "board pack", "decision freeze certificate"],
      blockedSections: ["stored approval", "task creation", "product or dosage output"],
    },
  ];
}

function buildComplianceGateMatrix(
  context: Required<HumanReviewComplianceAttestationInput>,
  sourceNodes: HumanReviewComplianceSourceNode[],
): ComplianceGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "HRCA_GATE_001",
      label: "Compliance questions are controlled",
      lane: "compliance-attestation" as HumanReviewComplianceLane,
      score: context.complianceRubricScore - context.unresolvedComplianceQuestionCount * 4,
      reviewer: "compliance reviewer",
      requiredEvidence: ["compliance attestation board", "governance evidence pack"],
      hardStop: "Do not attest while compliance questions remain unresolved.",
    },
    {
      id: "HRCA_GATE_002",
      label: "Accountability ledger is complete enough",
      lane: "accountability-ledger" as HumanReviewComplianceLane,
      score: context.accountabilityConfidenceScore - context.accountabilityGapCount * 4,
      reviewer: context.complianceLeadRole,
      requiredEvidence: ["accountability ledger", "owner roles", "signoff packet"],
      hardStop: "Do not attest without accountability owner clarity.",
    },
    {
      id: "HRCA_GATE_003",
      label: "Governance exceptions are controlled",
      lane: "exception-register" as HumanReviewComplianceLane,
      score: 100 - context.governanceExceptionCount * 12,
      reviewer: "governance reviewer",
      requiredEvidence: ["exception register", "governance evidence pack", "QA replay"],
      hardStop: "Do not attest with unresolved governance exceptions.",
    },
    {
      id: "HRCA_GATE_004",
      label: "Decision freeze assurance is active",
      lane: "decision-freeze" as HumanReviewComplianceLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["decision freeze assurance", "board pack", "guardrails"],
      hardStop: "No operational output is allowed.",
    },
    {
      id: "HRCA_GATE_005",
      label: "Audit replay is reviewable",
      lane: "audit-replay" as HumanReviewComplianceLane,
      score: context.qualityAssuranceScore - context.signoffVarianceCount * 3,
      reviewer: "compliance audit reviewer",
      requiredEvidence: ["audit replay", "QA board", "rationale ledger"],
      hardStop: "Do not attest if audit replay path is unclear.",
    },
    {
      id: "HRCA_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "attestation-gate" as HumanReviewComplianceLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before attestation-ready state.",
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

function buildGovernanceExceptionRegister(context: Required<HumanReviewComplianceAttestationInput>): GovernanceExceptionItem[] {
  return [
    {
      id: "HRCA_EXCEPTION_001",
      label: "Open compliance question exception",
      lane: "exception-register",
      priority: context.unresolvedComplianceQuestionCount >= 5 ? "urgent" : "high",
      severity: context.unresolvedComplianceQuestionCount >= 5 ? "critical" : "elevated",
      exceptionReason: `${context.unresolvedComplianceQuestionCount} compliance questions remain open.`,
      manualResolution: "Resolve compliance questions manually.",
      blocksAttestation: context.unresolvedComplianceQuestionCount >= 5,
    },
    {
      id: "HRCA_EXCEPTION_002",
      label: "Accountability owner exception",
      lane: "accountability-ledger",
      priority: context.accountabilityGapCount >= 5 ? "urgent" : "high",
      severity: context.accountabilityGapCount >= 5 ? "critical" : "elevated",
      exceptionReason: `${context.accountabilityGapCount} accountability gaps require owner review.`,
      manualResolution: "Assign and document human owners manually.",
      blocksAttestation: context.accountabilityGapCount >= 5,
    },
    {
      id: "HRCA_EXCEPTION_003",
      label: "Governance pack exception",
      lane: "governance-evidence",
      priority: context.governanceExceptionCount >= 4 ? "urgent" : "high",
      severity: context.governanceExceptionCount >= 4 ? "elevated" : "watch",
      exceptionReason: `${context.governanceExceptionCount} governance evidence exceptions remain open.`,
      manualResolution: "Resolve governance exceptions manually.",
      blocksAttestation: context.governanceExceptionCount >= 5,
    },
  ];
}

function buildDecisionFreezeAssurance(): ComplianceDecisionFreezeItem[] {
  return [
    {
      id: "HRCA_FREEZE_001",
      label: "Provider output compliance freeze",
      lane: "decision-freeze",
      freezeEnforced: true,
      severity: "critical",
      freezeReason: "Compliance attestation cannot create or accept provider output.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "HRCA_FREEZE_002",
      label: "Operational compliance freeze",
      lane: "decision-freeze",
      freezeEnforced: true,
      severity: "critical",
      freezeReason: "Compliance attestation cannot create operational work.",
      blockedOutcome: "No task, intervention, dispatch or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "HRCA_FREEZE_003",
      label: "Prescriptive compliance freeze",
      lane: "decision-freeze",
      freezeEnforced: true,
      severity: "critical",
      freezeReason: "Compliance attestation cannot create product, dosage or production guidance.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildAuditReplay(context: Required<HumanReviewComplianceAttestationInput>): ComplianceAuditReplayItem[] {
  return [
    {
      id: "HRCA_REPLAY_001",
      label: "Human review phase replay",
      lane: "audit-replay",
      replayReady: context.missionControlScore >= 70 && context.consensusCalibrationScore >= 70,
      replayScore: clampScore((context.missionControlScore + context.consensusCalibrationScore) / 2),
      severity: severityFromConcern(100 - context.missionControlScore + context.unresolvedComplianceQuestionCount * 4),
      replayQuestion: "Can mission control and consensus calibration be replayed for attestation?",
      manualResolution: "Attach human review replay note to compliance packet.",
    },
    {
      id: "HRCA_REPLAY_002",
      label: "Evidence and rationale replay",
      lane: "audit-replay",
      replayReady: context.evidenceIntegrityScore >= 70 && context.rationaleLedgerScore >= 70,
      replayScore: clampScore((context.evidenceIntegrityScore + context.rationaleLedgerScore) / 2),
      severity: severityFromConcern(100 - context.evidenceIntegrityScore + context.accountabilityGapCount * 4),
      replayQuestion: "Can evidence custody and rationale traceability be replayed manually?",
      manualResolution: "Attach evidence and rationale replay note.",
    },
    {
      id: "HRCA_REPLAY_003",
      label: "Board pack and QA replay",
      lane: "audit-replay",
      replayReady: context.boardPackScore >= 70 && context.qualityAssuranceScore >= 70,
      replayScore: clampScore((context.boardPackScore + context.qualityAssuranceScore) / 2),
      severity: severityFromConcern(100 - context.qualityAssuranceScore + context.signoffVarianceCount * 5),
      replayQuestion: "Can board pack and QA signoff path be followed without actionability?",
      manualResolution: "Attach board pack and QA replay note.",
    },
  ];
}

function buildComplianceSignoff(
  context: Required<HumanReviewComplianceAttestationInput>,
  gates: ComplianceGateItem[],
): ComplianceSignoffItem[] {
  return [
    {
      id: "HRCA_SIGNOFF_001",
      label: "Governance evidence signoff",
      lane: "human-signoff",
      signoffReady: context.governanceExceptionCount < 5,
      reviewer: "governance reviewer",
      requiredEvidence: ["governance evidence pack", "exception register", "audit replay"],
      safeOutcome: "Manual governance evidence signoff only.",
    },
    {
      id: "HRCA_SIGNOFF_002",
      label: "Accountability signoff",
      lane: "human-signoff",
      signoffReady: context.accountabilityGapCount < 5,
      reviewer: context.complianceLeadRole,
      requiredEvidence: ["accountability ledger", "owner roles", "attestation board"],
      safeOutcome: "Manual accountability signoff only.",
    },
    {
      id: "HRCA_SIGNOFF_003",
      label: "Compliance attestation signoff",
      lane: "human-signoff",
      signoffReady: gates.every((gate) => gate.passed),
      reviewer: context.complianceLeadRole,
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual compliance attestation packet only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<HumanReviewComplianceAttestationInput>,
  sourceNodes: HumanReviewComplianceSourceNode[],
  gates: ComplianceGateItem[],
  exceptions: GovernanceExceptionItem[],
  signoff: ComplianceSignoffItem[],
): ComplianceRiskItem[] {
  const risks: ComplianceRiskItem[] = [];

  if (context.unresolvedComplianceQuestionCount > 0) {
    risks.push({
      id: "HRCA_RISK_001",
      label: "Unresolved compliance questions",
      lane: "compliance-attestation",
      severity: context.unresolvedComplianceQuestionCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedComplianceQuestionCount} compliance questions remain open.`,
      manualResolution: "Resolve compliance questions manually.",
      blocksAttestation: context.unresolvedComplianceQuestionCount >= 5,
    });
  }

  if (context.accountabilityGapCount > 0) {
    risks.push({
      id: "HRCA_RISK_002",
      label: "Accountability gaps",
      lane: "accountability-ledger",
      severity: context.accountabilityGapCount >= 5 ? "critical" : "elevated",
      reason: `${context.accountabilityGapCount} accountability gaps remain open.`,
      manualResolution: "Assign ownership and document accountability manually.",
      blocksAttestation: context.accountabilityGapCount >= 5,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `HRCA_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksAttestation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `HRCA_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Compliance gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksAttestation: gate.severity === "critical" || gate.score < 60,
      });
    });

  exceptions
    .filter((item) => item.blocksAttestation)
    .forEach((item, index) => {
      risks.push({
        id: `HRCA_EXCEPTION_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.exceptionReason,
        manualResolution: item.manualResolution,
        blocksAttestation: true,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `HRCA_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Compliance signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksAttestation: true,
      });
    });

  return risks;
}

export function buildAiHumanReviewComplianceAttestationReport(
  input: HumanReviewComplianceAttestationInput = {},
): HumanReviewComplianceAttestationReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const complianceAttestationBoard = buildComplianceAttestationBoard(context);
  const accountabilityLedger = buildAccountabilityLedger(context);
  const governanceEvidencePack = buildGovernanceEvidencePack(context);
  const complianceGateMatrix = buildComplianceGateMatrix(context, sourceNodes);
  const governanceExceptionRegister = buildGovernanceExceptionRegister(context);
  const decisionFreezeAssurance = buildDecisionFreezeAssurance();
  const auditReplay = buildAuditReplay(context);
  const complianceSignoff = buildComplianceSignoff(context, complianceGateMatrix);
  const complianceRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    complianceGateMatrix,
    governanceExceptionRegister,
    complianceSignoff,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const attestationAverage =
    complianceAttestationBoard.reduce((sum, item) => sum + item.attestationScore, 0) /
    Math.max(1, complianceAttestationBoard.length);

  const accountabilityAverage =
    accountabilityLedger.reduce((sum, item) => sum + item.accountabilityScore, 0) /
    Math.max(1, accountabilityLedger.length);

  const gateAverage =
    complianceGateMatrix.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, complianceGateMatrix.length);

  const riskPenalty = complianceRiskRegister.filter((item) => item.blocksAttestation).length * 10;
  const exceptionPressure =
    governanceExceptionRegister.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, governanceExceptionRegister.length * 3);

  const attestationScore = clampScore(
    sourceAverage / 4 +
      attestationAverage / 4 +
      accountabilityAverage / 4 +
      gateAverage / 4 +
      exceptionPressure -
      riskPenalty -
      context.unresolvedComplianceQuestionCount -
      context.accountabilityGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.attestationItemCount * 2 +
        context.unresolvedComplianceQuestionCount * 8 +
        context.accountabilityGapCount * 8 +
        context.governanceExceptionCount * 8 +
        context.signoffVarianceCount * 7,
    ),
  );

  const attestationStatus = bandFromScore(
    attestationScore,
    complianceRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: HUMAN_REVIEW_COMPLIANCE_ATTESTATION_READINESS,
    attestationScore,
    attestationStatus,
    overallSeverity,
    sourceNodes,
    complianceAttestationBoard,
    accountabilityLedger,
    governanceEvidencePack,
    complianceGateMatrix,
    governanceExceptionRegister,
    decisionFreezeAssurance,
    auditReplay,
    complianceSignoff,
    complianceRiskRegister,
    redactedExportBundle: {
      exportId: "human_review_compliance_attestation_v13_6_redacted_dry_run",
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
        "compliance attestation board",
        "accountability ledger",
        "governance evidence pack",
        "compliance gate matrix",
        "governance exception register",
        "decision freeze assurance",
        "audit replay",
        "compliance signoff",
        "compliance risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Human review compliance attestation is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Compliance attestation, accountability ledger and governance evidence pack are review concepts only.",
      "Every attestation conclusion remains behind human review, decision freeze and manual signoff.",
    ],
  };
}

export const aiHumanReviewComplianceAttestationVersion = "V13.6";
