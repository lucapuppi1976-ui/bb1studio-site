export type AgronomicDecisionSimulationMode = "dry-run" | "decision-board-review";

export type AgronomicDecisionSeverity = "info" | "watch" | "elevated" | "critical";

export type AgronomicDecisionPriority = "low" | "medium" | "high" | "urgent";

export type AgronomicDecisionReadinessBand =
  | "blocked"
  | "simulation-ready"
  | "review-ready"
  | "board-simulation-ready";

export type AgronomicDecisionLane =
  | "decision-simulation"
  | "option-scenario"
  | "uncertainty-map"
  | "non-execution"
  | "review-evidence"
  | "board-strategy"
  | "audit-replay"
  | "human-signoff";

export interface AgronomicDecisionSimulationGuardrail {
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
  decisionSimulationReady: true;
  strategyPackReady: true;
  nonExecutionCertificateReady: true;
  humanStrategySignoffReady: true;
}

export interface AgronomicDecisionSimulationInput {
  scenarioCount?: number;
  unresolvedReviewHoldCount?: number;
  uncertaintySignalCount?: number;
  nonExecutionReasonCount?: number;
  strategyQuestionCount?: number;
  missionControlScore?: number;
  consensusCalibrationScore?: number;
  evidenceIntegrityScore?: number;
  rationaleLedgerScore?: number;
  boardPackScore?: number;
  qualityAssuranceScore?: number;
  complianceAttestationScore?: number;
  simulationRubricScore?: number;
  reviewerConfidenceScore?: number;
  strategyLeadRole?: string;
}

export interface AgronomicDecisionSourceNode {
  id: string;
  lane: AgronomicDecisionLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: AgronomicDecisionSeverity;
  priority: AgronomicDecisionPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface DecisionSimulationScenario {
  id: string;
  label: string;
  lane: AgronomicDecisionLane;
  simulationScore: number;
  severity: AgronomicDecisionSeverity;
  scenarioQuestion: string;
  safeInterpretation: string;
  blockedOutcome: string;
}

export interface AgronomicOptionScenario {
  id: string;
  label: string;
  lane: AgronomicDecisionLane;
  optionScore: number;
  priority: AgronomicDecisionPriority;
  reviewerQuestion: string;
  allowedUse: string;
  blockedUse: string;
}

export interface UncertaintyMapItem {
  id: string;
  label: string;
  lane: AgronomicDecisionLane;
  uncertaintyScore: number;
  severity: AgronomicDecisionSeverity;
  uncertaintyReason: string;
  reviewerAction: string;
}

export interface NonExecutionCertificateItem {
  id: string;
  label: string;
  lane: AgronomicDecisionLane;
  freezeEnforced: true;
  severity: AgronomicDecisionSeverity;
  certificateReason: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface StrategyGateItem {
  id: string;
  label: string;
  lane: AgronomicDecisionLane;
  passed: boolean;
  score: number;
  severity: AgronomicDecisionSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface BoardStrategyPackItem {
  id: string;
  label: string;
  lane: AgronomicDecisionLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface DecisionAuditReplayItem {
  id: string;
  label: string;
  lane: AgronomicDecisionLane;
  replayReady: boolean;
  replayScore: number;
  severity: AgronomicDecisionSeverity;
  replayQuestion: string;
  manualResolution: string;
}

export interface StrategySignoffItem {
  id: string;
  label: string;
  lane: AgronomicDecisionLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface StrategyRiskItem {
  id: string;
  label: string;
  lane: AgronomicDecisionLane;
  severity: AgronomicDecisionSeverity;
  reason: string;
  manualResolution: string;
  blocksStrategyBoard: boolean;
}

export interface AgronomicDecisionSimulationReport {
  generatedAt: string;
  mode: AgronomicDecisionSimulationMode;
  context: Required<AgronomicDecisionSimulationInput>;
  readiness: AgronomicDecisionSimulationGuardrail;
  strategySimulationScore: number;
  strategySimulationStatus: AgronomicDecisionReadinessBand;
  overallSeverity: AgronomicDecisionSeverity;
  sourceNodes: AgronomicDecisionSourceNode[];
  decisionSimulationBoard: DecisionSimulationScenario[];
  optionScenarioMatrix: AgronomicOptionScenario[];
  agronomicUncertaintyMap: UncertaintyMapItem[];
  nonExecutionCertificate: NonExecutionCertificateItem[];
  strategyGateMatrix: StrategyGateItem[];
  boardStrategyPack: BoardStrategyPackItem[];
  auditReplay: DecisionAuditReplayItem[];
  strategySignoff: StrategySignoffItem[];
  strategyRiskRegister: StrategyRiskItem[];
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

export const AGRONOMIC_DECISION_SIMULATION_READINESS: AgronomicDecisionSimulationGuardrail = {
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
  decisionSimulationReady: true,
  strategyPackReady: true,
  nonExecutionCertificateReady: true,
  humanStrategySignoffReady: true,
};

const priorityWeight: Record<AgronomicDecisionPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: AgronomicDecisionSimulationInput): Required<AgronomicDecisionSimulationInput> {
  return {
    scenarioCount: input.scenarioCount ?? 6,
    unresolvedReviewHoldCount: input.unresolvedReviewHoldCount ?? 5,
    uncertaintySignalCount: input.uncertaintySignalCount ?? 6,
    nonExecutionReasonCount: input.nonExecutionReasonCount ?? 4,
    strategyQuestionCount: input.strategyQuestionCount ?? 5,
    missionControlScore: input.missionControlScore ?? 73,
    consensusCalibrationScore: input.consensusCalibrationScore ?? 72,
    evidenceIntegrityScore: input.evidenceIntegrityScore ?? 73,
    rationaleLedgerScore: input.rationaleLedgerScore ?? 71,
    boardPackScore: input.boardPackScore ?? 72,
    qualityAssuranceScore: input.qualityAssuranceScore ?? 72,
    complianceAttestationScore: input.complianceAttestationScore ?? 72,
    simulationRubricScore: input.simulationRubricScore ?? 71,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    strategyLeadRole: input.strategyLeadRole ?? "agronomic strategy board lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): AgronomicDecisionSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: AgronomicDecisionSeverity): AgronomicDecisionPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): AgronomicDecisionReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "board-simulation-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: AgronomicDecisionLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): AgronomicDecisionSourceNode {
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
            "Agronomic decision simulation is below board threshold.",
            "Strategy board must resolve review holds, uncertainty signals and non-execution reasons.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<AgronomicDecisionSimulationInput>): AgronomicDecisionSourceNode[] {
  const holdPressure = context.unresolvedReviewHoldCount * 4;
  const uncertaintyPressure = context.uncertaintySignalCount * 4;
  const freezePressure = context.nonExecutionReasonCount * 5;
  const strategyPressure = context.strategyQuestionCount * 4;

  return [
    buildSourceNode(
      "ADSB_NODE_001",
      "review-evidence",
      "Mission control review input",
      "V13.0",
      context.missionControlScore,
      context.reviewerConfidenceScore,
      holdPressure,
      "Bring mission-control review queue into non-execution strategy simulation.",
    ),
    buildSourceNode(
      "ADSB_NODE_002",
      "review-evidence",
      "Consensus calibration input",
      "V13.1",
      context.consensusCalibrationScore,
      context.reviewerConfidenceScore,
      uncertaintyPressure,
      "Bring consensus and dissent context into option scenario review.",
    ),
    buildSourceNode(
      "ADSB_NODE_003",
      "uncertainty-map",
      "Evidence integrity input",
      "V13.2",
      context.evidenceIntegrityScore,
      context.reviewerConfidenceScore,
      uncertaintyPressure,
      "Map evidence integrity findings into uncertainty context.",
    ),
    buildSourceNode(
      "ADSB_NODE_004",
      "board-strategy",
      "Rationale ledger input",
      "V13.3",
      context.rationaleLedgerScore,
      context.reviewerConfidenceScore,
      holdPressure,
      "Connect reviewer rationale to board strategy notes.",
    ),
    buildSourceNode(
      "ADSB_NODE_005",
      "non-execution",
      "Human board pack input",
      "V13.4",
      context.boardPackScore,
      context.reviewerConfidenceScore,
      freezePressure,
      "Confirm decision freeze remains active in every scenario.",
    ),
    buildSourceNode(
      "ADSB_NODE_006",
      "board-strategy",
      "Human QA input",
      "V13.5",
      context.qualityAssuranceScore,
      context.simulationRubricScore,
      strategyPressure,
      "Use QA findings to calibrate strategy board packet.",
    ),
    buildSourceNode(
      "ADSB_NODE_007",
      "non-execution",
      "Compliance attestation input",
      "V13.6",
      context.complianceAttestationScore,
      context.simulationRubricScore,
      freezePressure + strategyPressure / 2,
      "Carry compliance attestation into non-execution certificate.",
    ),
    buildSourceNode(
      "ADSB_NODE_008",
      "human-signoff",
      "V14 strategy simulation signoff",
      "V14.0",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      strategyPressure,
      "Confirm strategy simulation remains a manual board note only.",
    ),
  ];
}

function buildDecisionSimulationBoard(context: Required<AgronomicDecisionSimulationInput>): DecisionSimulationScenario[] {
  return [
    {
      id: "ADSB_SCENARIO_001",
      label: "Hold and observe scenario",
      lane: "decision-simulation",
      simulationScore: clampScore(context.simulationRubricScore - context.uncertaintySignalCount * 2),
      severity: severityFromConcern(context.uncertaintySignalCount * 10),
      scenarioQuestion: "What can reviewers learn if the case remains in observation-only mode?",
      safeInterpretation: "Observation-only scenario for human discussion.",
      blockedOutcome: "No scouting dispatch, task, intervention or execution.",
    },
    {
      id: "ADSB_SCENARIO_002",
      label: "Evidence strengthening scenario",
      lane: "decision-simulation",
      simulationScore: clampScore(context.evidenceIntegrityScore - context.unresolvedReviewHoldCount * 2),
      severity: severityFromConcern(context.unresolvedReviewHoldCount * 10),
      scenarioQuestion: "Which evidence gaps would reviewers discuss before any future actionability phase?",
      safeInterpretation: "Evidence gap note for manual review.",
      blockedOutcome: "No automatic evidence request or field task.",
    },
    {
      id: "ADSB_SCENARIO_003",
      label: "Board escalation scenario",
      lane: "board-strategy",
      simulationScore: clampScore(context.boardPackScore - context.strategyQuestionCount * 2),
      severity: severityFromConcern(context.strategyQuestionCount * 9),
      scenarioQuestion: "Which strategic questions require board escalation?",
      safeInterpretation: "Manual board escalation note only.",
      blockedOutcome: "No formal approval, public share or operational order.",
    },
  ];
}

function buildOptionScenarioMatrix(context: Required<AgronomicDecisionSimulationInput>): AgronomicOptionScenario[] {
  return [
    {
      id: "ADSB_OPTION_001",
      label: "Low-disruption monitoring option",
      lane: "option-scenario",
      optionScore: clampScore(context.reviewerConfidenceScore - context.uncertaintySignalCount * 2),
      priority: context.uncertaintySignalCount >= 6 ? "high" : "medium",
      reviewerQuestion: "Would reviewers prefer a low-disruption monitoring discussion?",
      allowedUse: "Board discussion only.",
      blockedUse: "No work creation or scheduling.",
    },
    {
      id: "ADSB_OPTION_002",
      label: "Evidence reinforcement option",
      lane: "option-scenario",
      optionScore: clampScore(context.evidenceIntegrityScore - context.unresolvedReviewHoldCount * 2),
      priority: context.unresolvedReviewHoldCount >= 5 ? "urgent" : "high",
      reviewerQuestion: "Which evidence reinforcement themes should remain open for human review?",
      allowedUse: "Human review planning note only.",
      blockedUse: "No automatic photo request or field mission.",
    },
    {
      id: "ADSB_OPTION_003",
      label: "Risk communication option",
      lane: "option-scenario",
      optionScore: clampScore(context.complianceAttestationScore),
      priority: "medium",
      reviewerQuestion: "Which risk statements are safe as internal board language?",
      allowedUse: "Redacted internal board summary only.",
      blockedUse: "No public share or formal recommendation.",
    },
  ];
}

function buildUncertaintyMap(context: Required<AgronomicDecisionSimulationInput>): UncertaintyMapItem[] {
  return [
    {
      id: "ADSB_UNCERTAINTY_001",
      label: "Evidence sufficiency uncertainty",
      lane: "uncertainty-map",
      uncertaintyScore: clampScore(context.uncertaintySignalCount * 14),
      severity: severityFromConcern(context.uncertaintySignalCount * 12),
      uncertaintyReason: "Evidence remains insufficient for any operational conclusion.",
      reviewerAction: "Keep as manual uncertainty note.",
    },
    {
      id: "ADSB_UNCERTAINTY_002",
      label: "Reviewer hold uncertainty",
      lane: "review-evidence",
      uncertaintyScore: clampScore(context.unresolvedReviewHoldCount * 14),
      severity: severityFromConcern(context.unresolvedReviewHoldCount * 12),
      uncertaintyReason: "Reviewer holds remain unresolved across the V13 review chain.",
      reviewerAction: "Route unresolved holds to strategy board.",
    },
    {
      id: "ADSB_UNCERTAINTY_003",
      label: "Compliance actionability uncertainty",
      lane: "non-execution",
      uncertaintyScore: clampScore(context.nonExecutionReasonCount * 16),
      severity: "critical",
      uncertaintyReason: "Compliance path blocks any actionability in this phase.",
      reviewerAction: "Maintain non-execution certificate.",
    },
  ];
}

function buildNonExecutionCertificate(): NonExecutionCertificateItem[] {
  return [
    {
      id: "ADSB_NON_EXEC_001",
      label: "Provider output freeze",
      lane: "non-execution",
      freezeEnforced: true,
      severity: "critical",
      certificateReason: "Decision simulation cannot call or use provider output.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "ADSB_NON_EXEC_002",
      label: "Operational action freeze",
      lane: "non-execution",
      freezeEnforced: true,
      severity: "critical",
      certificateReason: "Decision simulation cannot create or dispatch agronomic work.",
      blockedOutcome: "No task, intervention, scheduling or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "ADSB_NON_EXEC_003",
      label: "Prescriptive output freeze",
      lane: "non-execution",
      freezeEnforced: true,
      severity: "critical",
      certificateReason: "Decision simulation cannot generate product, dosage or production guidance.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildStrategyGateMatrix(
  context: Required<AgronomicDecisionSimulationInput>,
  sourceNodes: AgronomicDecisionSourceNode[],
): StrategyGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "ADSB_GATE_001",
      label: "Review holds are controlled",
      lane: "review-evidence" as AgronomicDecisionLane,
      score: context.reviewerConfidenceScore - context.unresolvedReviewHoldCount * 4,
      reviewer: "human review board lead",
      requiredEvidence: ["mission control", "board pack", "compliance attestation"],
      hardStop: "Do not simulate strategy closure with unresolved review holds.",
    },
    {
      id: "ADSB_GATE_002",
      label: "Uncertainty map is explicit enough",
      lane: "uncertainty-map" as AgronomicDecisionLane,
      score: context.simulationRubricScore - context.uncertaintySignalCount * 3,
      reviewer: "uncertainty reviewer",
      requiredEvidence: ["evidence integrity", "rationale ledger", "QA board"],
      hardStop: "Do not present a strategy packet without uncertainty language.",
    },
    {
      id: "ADSB_GATE_003",
      label: "Non-execution certificate is enforced",
      lane: "non-execution" as AgronomicDecisionLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-execution certificate", "decision freeze", "guardrails"],
      hardStop: "No operational output is allowed.",
    },
    {
      id: "ADSB_GATE_004",
      label: "Strategy pack is board-review only",
      lane: "board-strategy" as AgronomicDecisionLane,
      score: context.boardPackScore - context.strategyQuestionCount * 3,
      reviewer: context.strategyLeadRole,
      requiredEvidence: ["board strategy pack", "option scenario matrix", "audit replay"],
      hardStop: "Do not turn a strategy scenario into a recommendation.",
    },
    {
      id: "ADSB_GATE_005",
      label: "Compliance carry-forward is complete enough",
      lane: "audit-replay" as AgronomicDecisionLane,
      score: context.complianceAttestationScore - context.nonExecutionReasonCount * 3,
      reviewer: "compliance reviewer",
      requiredEvidence: ["compliance attestation", "human signoff", "non-actionable export"],
      hardStop: "Do not close strategy simulation if compliance carry-forward is unclear.",
    },
    {
      id: "ADSB_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "human-signoff" as AgronomicDecisionLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before board-simulation-ready state.",
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

function buildBoardStrategyPack(context: Required<AgronomicDecisionSimulationInput>): BoardStrategyPackItem[] {
  return [
    {
      id: "ADSB_PACK_001",
      label: "Decision simulation briefing",
      lane: "board-strategy",
      packReady: context.boardPackScore >= 70,
      readinessScore: clampScore(context.boardPackScore),
      reviewerCheck: "Confirm board pack contains only simulation language.",
      includedSections: ["scenario summary", "uncertainty map", "review holds"],
      blockedSections: ["operational instruction", "field dispatch", "provider material"],
    },
    {
      id: "ADSB_PACK_002",
      label: "Non-execution certificate packet",
      lane: "non-execution",
      packReady: true,
      readinessScore: 100,
      reviewerCheck: "Confirm every scenario carries non-execution language.",
      includedSections: ["blocked outcomes", "guardrails", "manual signoff markers"],
      blockedSections: ["task creation", "intervention creation", "execution path"],
    },
    {
      id: "ADSB_PACK_003",
      label: "Human strategy signoff packet",
      lane: "human-signoff",
      packReady: context.unresolvedReviewHoldCount < 6,
      readinessScore: clampScore(100 - context.unresolvedReviewHoldCount * 10),
      reviewerCheck: "Confirm strategy signoff remains a manual board note only.",
      includedSections: ["human signoff", "strategy gates", "risk register"],
      blockedSections: ["stored approval", "public share", "product or dosage output"],
    },
  ];
}

function buildAuditReplay(context: Required<AgronomicDecisionSimulationInput>): DecisionAuditReplayItem[] {
  return [
    {
      id: "ADSB_REPLAY_001",
      label: "Human review chain replay",
      lane: "audit-replay",
      replayReady: context.missionControlScore >= 70 && context.consensusCalibrationScore >= 70,
      replayScore: clampScore((context.missionControlScore + context.consensusCalibrationScore) / 2),
      severity: severityFromConcern(100 - context.missionControlScore + context.unresolvedReviewHoldCount * 4),
      replayQuestion: "Can mission control and reviewer consensus be replayed for strategy context?",
      manualResolution: "Attach human review replay note to strategy pack.",
    },
    {
      id: "ADSB_REPLAY_002",
      label: "Evidence and rationale replay",
      lane: "audit-replay",
      replayReady: context.evidenceIntegrityScore >= 70 && context.rationaleLedgerScore >= 70,
      replayScore: clampScore((context.evidenceIntegrityScore + context.rationaleLedgerScore) / 2),
      severity: severityFromConcern(100 - context.evidenceIntegrityScore + context.uncertaintySignalCount * 4),
      replayQuestion: "Can evidence and rationale be replayed without actionability?",
      manualResolution: "Attach evidence and rationale replay note.",
    },
    {
      id: "ADSB_REPLAY_003",
      label: "Compliance and QA replay",
      lane: "audit-replay",
      replayReady: context.qualityAssuranceScore >= 70 && context.complianceAttestationScore >= 70,
      replayScore: clampScore((context.qualityAssuranceScore + context.complianceAttestationScore) / 2),
      severity: severityFromConcern(100 - context.complianceAttestationScore + context.nonExecutionReasonCount * 5),
      replayQuestion: "Can QA and compliance attestation be replayed for non-execution assurance?",
      manualResolution: "Attach QA and compliance replay note.",
    },
  ];
}

function buildStrategySignoff(
  context: Required<AgronomicDecisionSimulationInput>,
  gates: StrategyGateItem[],
): StrategySignoffItem[] {
  return [
    {
      id: "ADSB_SIGNOFF_001",
      label: "Scenario simulation signoff",
      lane: "human-signoff",
      signoffReady: context.scenarioCount > 0 && context.unresolvedReviewHoldCount < 6,
      reviewer: "strategy simulation reviewer",
      requiredEvidence: ["decision simulation board", "option scenario matrix", "uncertainty map"],
      safeOutcome: "Manual scenario simulation note only.",
    },
    {
      id: "ADSB_SIGNOFF_002",
      label: "Non-execution signoff",
      lane: "human-signoff",
      signoffReady: true,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-execution certificate", "strategy gates", "guardrails"],
      safeOutcome: "Manual non-execution signoff only.",
    },
    {
      id: "ADSB_SIGNOFF_003",
      label: "Strategy board signoff",
      lane: "human-signoff",
      signoffReady: gates.every((gate) => gate.passed),
      reviewer: context.strategyLeadRole,
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual strategy board signoff packet only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<AgronomicDecisionSimulationInput>,
  sourceNodes: AgronomicDecisionSourceNode[],
  gates: StrategyGateItem[],
  signoff: StrategySignoffItem[],
): StrategyRiskItem[] {
  const risks: StrategyRiskItem[] = [];

  if (context.unresolvedReviewHoldCount > 0) {
    risks.push({
      id: "ADSB_RISK_001",
      label: "Unresolved review holds",
      lane: "review-evidence",
      severity: context.unresolvedReviewHoldCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedReviewHoldCount} review holds remain open.`,
      manualResolution: "Resolve review holds manually before strategy board closure.",
      blocksStrategyBoard: context.unresolvedReviewHoldCount >= 5,
    });
  }

  if (context.uncertaintySignalCount > 0) {
    risks.push({
      id: "ADSB_RISK_002",
      label: "High uncertainty signals",
      lane: "uncertainty-map",
      severity: context.uncertaintySignalCount >= 6 ? "critical" : "elevated",
      reason: `${context.uncertaintySignalCount} uncertainty signals require board language.`,
      manualResolution: "Document uncertainty explicitly in the strategy packet.",
      blocksStrategyBoard: context.uncertaintySignalCount >= 7,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `ADSB_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksStrategyBoard: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `ADSB_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Strategy gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksStrategyBoard: gate.severity === "critical" || gate.score < 60,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `ADSB_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Strategy signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksStrategyBoard: true,
      });
    });

  return risks;
}

export function buildAiAgronomicDecisionSimulationBoardReport(
  input: AgronomicDecisionSimulationInput = {},
): AgronomicDecisionSimulationReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const decisionSimulationBoard = buildDecisionSimulationBoard(context);
  const optionScenarioMatrix = buildOptionScenarioMatrix(context);
  const agronomicUncertaintyMap = buildUncertaintyMap(context);
  const nonExecutionCertificate = buildNonExecutionCertificate();
  const strategyGateMatrix = buildStrategyGateMatrix(context, sourceNodes);
  const boardStrategyPack = buildBoardStrategyPack(context);
  const auditReplay = buildAuditReplay(context);
  const strategySignoff = buildStrategySignoff(context, strategyGateMatrix);
  const strategyRiskRegister = buildRiskRegister(context, sourceNodes, strategyGateMatrix, strategySignoff);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const scenarioAverage =
    decisionSimulationBoard.reduce((sum, item) => sum + item.simulationScore, 0) /
    Math.max(1, decisionSimulationBoard.length);

  const optionAverage =
    optionScenarioMatrix.reduce((sum, item) => sum + item.optionScore, 0) /
    Math.max(1, optionScenarioMatrix.length);

  const gateAverage =
    strategyGateMatrix.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, strategyGateMatrix.length);

  const riskPenalty = strategyRiskRegister.filter((item) => item.blocksStrategyBoard).length * 10;
  const optionPressure =
    optionScenarioMatrix.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, optionScenarioMatrix.length * 3);

  const strategySimulationScore = clampScore(
    sourceAverage / 4 +
      scenarioAverage / 4 +
      optionAverage / 4 +
      gateAverage / 4 +
      optionPressure -
      riskPenalty -
      context.unresolvedReviewHoldCount -
      context.uncertaintySignalCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.scenarioCount * 3 +
        context.unresolvedReviewHoldCount * 8 +
        context.uncertaintySignalCount * 8 +
        context.nonExecutionReasonCount * 9 +
        context.strategyQuestionCount * 6,
    ),
  );

  const strategySimulationStatus = bandFromScore(
    strategySimulationScore,
    strategyRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_DECISION_SIMULATION_READINESS,
    strategySimulationScore,
    strategySimulationStatus,
    overallSeverity,
    sourceNodes,
    decisionSimulationBoard,
    optionScenarioMatrix,
    agronomicUncertaintyMap,
    nonExecutionCertificate,
    strategyGateMatrix,
    boardStrategyPack,
    auditReplay,
    strategySignoff,
    strategyRiskRegister,
    redactedExportBundle: {
      exportId: "agronomic_decision_simulation_board_v14_0_redacted_dry_run",
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
        "decision simulation board",
        "option scenario matrix",
        "agronomic uncertainty map",
        "non-execution certificate",
        "strategy gate matrix",
        "board strategy pack",
        "audit replay",
        "strategy signoff",
        "strategy risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Agronomic decision simulation board is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Decision scenarios, option matrix and strategy pack are review concepts only.",
      "Every simulated strategy remains behind human review, non-execution certificate and manual signoff.",
    ],
  };
}

export const aiAgronomicDecisionSimulationBoardVersion = "V14.0";
