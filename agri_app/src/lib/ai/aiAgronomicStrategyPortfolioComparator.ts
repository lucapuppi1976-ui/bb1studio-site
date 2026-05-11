export type AgronomicStrategyPortfolioMode = "dry-run" | "portfolio-board-review";

export type AgronomicStrategyPortfolioSeverity = "info" | "watch" | "elevated" | "critical";

export type AgronomicStrategyPortfolioPriority = "low" | "medium" | "high" | "urgent";

export type AgronomicStrategyPortfolioReadinessBand =
  | "blocked"
  | "simulation-ready"
  | "review-ready"
  | "portfolio-ready";

export type AgronomicStrategyPortfolioLane =
  | "portfolio-comparison"
  | "tradeoff-board"
  | "option-ranking"
  | "uncertainty-budget"
  | "non-execution"
  | "review-evidence"
  | "audit-replay"
  | "human-signoff";

export interface AgronomicStrategyPortfolioGuardrail {
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
  strategyPortfolioReady: true;
  tradeoffBoardReady: true;
  nonExecutionBoundaryReady: true;
  humanPortfolioSignoffReady: true;
}

export interface AgronomicStrategyPortfolioInput {
  portfolioOptionCount?: number;
  tradeoffQuestionCount?: number;
  unresolvedConstraintCount?: number;
  uncertaintyBudgetCount?: number;
  nonExecutionBoundaryCount?: number;
  decisionSimulationScore?: number;
  scenarioStressScore?: number;
  evidenceIntegrityScore?: number;
  rationaleLedgerScore?: number;
  qualityAssuranceScore?: number;
  complianceAttestationScore?: number;
  portfolioRubricScore?: number;
  reviewerConfidenceScore?: number;
  strategyLeadRole?: string;
}

export interface AgronomicStrategyPortfolioSourceNode {
  id: string;
  lane: AgronomicStrategyPortfolioLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: AgronomicStrategyPortfolioSeverity;
  priority: AgronomicStrategyPortfolioPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface StrategyPortfolioOption {
  id: string;
  label: string;
  lane: AgronomicStrategyPortfolioLane;
  optionScore: number;
  severity: AgronomicStrategyPortfolioSeverity;
  strategicQuestion: string;
  boardUse: string;
  blockedOutcome: string;
}

export interface StrategyTradeoffItem {
  id: string;
  label: string;
  lane: AgronomicStrategyPortfolioLane;
  tradeoffScore: number;
  priority: AgronomicStrategyPortfolioPriority;
  tradeoffQuestion: string;
  reviewerAction: string;
  blockedOutcome: string;
}

export interface OptionRankingItem {
  id: string;
  label: string;
  lane: AgronomicStrategyPortfolioLane;
  rankBucket: "hold" | "watch" | "board-discussion";
  rankingScore: number;
  severity: AgronomicStrategyPortfolioSeverity;
  rankingReason: string;
  manualResolution: string;
}

export interface UncertaintyBudgetItem {
  id: string;
  label: string;
  lane: AgronomicStrategyPortfolioLane;
  budgetScore: number;
  severity: AgronomicStrategyPortfolioSeverity;
  uncertaintyReason: string;
  reviewerAction: string;
}

export interface NonExecutionBoundaryItem {
  id: string;
  label: string;
  lane: AgronomicStrategyPortfolioLane;
  boundaryEnforced: true;
  severity: AgronomicStrategyPortfolioSeverity;
  boundaryReason: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface PortfolioGateItem {
  id: string;
  label: string;
  lane: AgronomicStrategyPortfolioLane;
  passed: boolean;
  score: number;
  severity: AgronomicStrategyPortfolioSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface BoardPortfolioPackItem {
  id: string;
  label: string;
  lane: AgronomicStrategyPortfolioLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface PortfolioAuditReplayItem {
  id: string;
  label: string;
  lane: AgronomicStrategyPortfolioLane;
  replayReady: boolean;
  replayScore: number;
  severity: AgronomicStrategyPortfolioSeverity;
  replayQuestion: string;
  manualResolution: string;
}

export interface PortfolioSignoffItem {
  id: string;
  label: string;
  lane: AgronomicStrategyPortfolioLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface PortfolioRiskItem {
  id: string;
  label: string;
  lane: AgronomicStrategyPortfolioLane;
  severity: AgronomicStrategyPortfolioSeverity;
  reason: string;
  manualResolution: string;
  blocksPortfolioBoard: boolean;
}

export interface AgronomicStrategyPortfolioReport {
  generatedAt: string;
  mode: AgronomicStrategyPortfolioMode;
  context: Required<AgronomicStrategyPortfolioInput>;
  readiness: AgronomicStrategyPortfolioGuardrail;
  portfolioScore: number;
  portfolioStatus: AgronomicStrategyPortfolioReadinessBand;
  overallSeverity: AgronomicStrategyPortfolioSeverity;
  sourceNodes: AgronomicStrategyPortfolioSourceNode[];
  strategyPortfolioOptions: StrategyPortfolioOption[];
  tradeoffBoard: StrategyTradeoffItem[];
  optionRankingMatrix: OptionRankingItem[];
  uncertaintyBudget: UncertaintyBudgetItem[];
  nonExecutionBoundary: NonExecutionBoundaryItem[];
  portfolioGateMatrix: PortfolioGateItem[];
  boardPortfolioPack: BoardPortfolioPackItem[];
  auditReplay: PortfolioAuditReplayItem[];
  portfolioSignoff: PortfolioSignoffItem[];
  portfolioRiskRegister: PortfolioRiskItem[];
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

export const AGRONOMIC_STRATEGY_PORTFOLIO_READINESS: AgronomicStrategyPortfolioGuardrail = {
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
  strategyPortfolioReady: true,
  tradeoffBoardReady: true,
  nonExecutionBoundaryReady: true,
  humanPortfolioSignoffReady: true,
};

const priorityWeight: Record<AgronomicStrategyPortfolioPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: AgronomicStrategyPortfolioInput): Required<AgronomicStrategyPortfolioInput> {
  return {
    portfolioOptionCount: input.portfolioOptionCount ?? 5,
    tradeoffQuestionCount: input.tradeoffQuestionCount ?? 6,
    unresolvedConstraintCount: input.unresolvedConstraintCount ?? 5,
    uncertaintyBudgetCount: input.uncertaintyBudgetCount ?? 6,
    nonExecutionBoundaryCount: input.nonExecutionBoundaryCount ?? 4,
    decisionSimulationScore: input.decisionSimulationScore ?? 72,
    scenarioStressScore: input.scenarioStressScore ?? 71,
    evidenceIntegrityScore: input.evidenceIntegrityScore ?? 73,
    rationaleLedgerScore: input.rationaleLedgerScore ?? 71,
    qualityAssuranceScore: input.qualityAssuranceScore ?? 72,
    complianceAttestationScore: input.complianceAttestationScore ?? 72,
    portfolioRubricScore: input.portfolioRubricScore ?? 71,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    strategyLeadRole: input.strategyLeadRole ?? "agronomic portfolio board lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): AgronomicStrategyPortfolioSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: AgronomicStrategyPortfolioSeverity): AgronomicStrategyPortfolioPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): AgronomicStrategyPortfolioReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "portfolio-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: AgronomicStrategyPortfolioLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): AgronomicStrategyPortfolioSourceNode {
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
            "Agronomic strategy portfolio comparator is below board threshold.",
            "Portfolio board must resolve trade-offs, constraints and uncertainty budget.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<AgronomicStrategyPortfolioInput>): AgronomicStrategyPortfolioSourceNode[] {
  const tradeoffPressure = context.tradeoffQuestionCount * 4;
  const constraintPressure = context.unresolvedConstraintCount * 5;
  const uncertaintyPressure = context.uncertaintyBudgetCount * 4;
  const boundaryPressure = context.nonExecutionBoundaryCount * 5;

  return [
    buildSourceNode(
      "ASPC_NODE_001",
      "portfolio-comparison",
      "Decision simulation board input",
      "V14.0",
      context.decisionSimulationScore,
      context.reviewerConfidenceScore,
      tradeoffPressure,
      "Compare V14.0 strategy scenarios without making recommendations.",
    ),
    buildSourceNode(
      "ASPC_NODE_002",
      "tradeoff-board",
      "Scenario stress test input",
      "V14.1",
      context.scenarioStressScore,
      context.reviewerConfidenceScore,
      constraintPressure,
      "Carry failure modes into portfolio trade-off review.",
    ),
    buildSourceNode(
      "ASPC_NODE_003",
      "review-evidence",
      "Evidence integrity input",
      "V13.2",
      context.evidenceIntegrityScore,
      context.reviewerConfidenceScore,
      uncertaintyPressure,
      "Use evidence integrity as context for uncertainty budget.",
    ),
    buildSourceNode(
      "ASPC_NODE_004",
      "option-ranking",
      "Rationale ledger input",
      "V13.3",
      context.rationaleLedgerScore,
      context.reviewerConfidenceScore,
      tradeoffPressure,
      "Connect reviewer rationale to option ranking notes.",
    ),
    buildSourceNode(
      "ASPC_NODE_005",
      "portfolio-comparison",
      "Quality assurance input",
      "V13.5",
      context.qualityAssuranceScore,
      context.portfolioRubricScore,
      constraintPressure,
      "Apply QA findings to portfolio comparison.",
    ),
    buildSourceNode(
      "ASPC_NODE_006",
      "non-execution",
      "Compliance attestation input",
      "V13.6",
      context.complianceAttestationScore,
      context.portfolioRubricScore,
      boundaryPressure,
      "Carry compliance attestation into non-execution boundary.",
    ),
    buildSourceNode(
      "ASPC_NODE_007",
      "uncertainty-budget",
      "Portfolio uncertainty budget",
      "V14.2",
      context.portfolioRubricScore,
      context.reviewerConfidenceScore,
      uncertaintyPressure + constraintPressure / 2,
      "Make uncertainty budget visible for board-only discussion.",
    ),
    buildSourceNode(
      "ASPC_NODE_008",
      "human-signoff",
      "Portfolio board signoff",
      "V14.2",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      tradeoffPressure,
      "Confirm portfolio signoff remains manual.",
    ),
  ];
}

function buildStrategyPortfolioOptions(context: Required<AgronomicStrategyPortfolioInput>): StrategyPortfolioOption[] {
  return [
    {
      id: "ASPC_OPTION_001",
      label: "Conservative observation portfolio",
      lane: "portfolio-comparison",
      optionScore: clampScore(context.decisionSimulationScore - context.uncertaintyBudgetCount * 2),
      severity: severityFromConcern(context.uncertaintyBudgetCount * 10),
      strategicQuestion: "How does an observation-heavy portfolio perform under uncertainty?",
      boardUse: "Internal board discussion only.",
      blockedOutcome: "No task creation, scheduling or field dispatch.",
    },
    {
      id: "ASPC_OPTION_002",
      label: "Evidence strengthening portfolio",
      lane: "portfolio-comparison",
      optionScore: clampScore(context.evidenceIntegrityScore - context.unresolvedConstraintCount * 2),
      severity: severityFromConcern(context.unresolvedConstraintCount * 10),
      strategicQuestion: "How does an evidence-focused portfolio compare against review constraints?",
      boardUse: "Manual evidence strategy note only.",
      blockedOutcome: "No automatic evidence request or scouting mission.",
    },
    {
      id: "ASPC_OPTION_003",
      label: "Risk communication portfolio",
      lane: "portfolio-comparison",
      optionScore: clampScore(context.complianceAttestationScore - context.tradeoffQuestionCount),
      severity: severityFromConcern(context.tradeoffQuestionCount * 8),
      strategicQuestion: "How should risk language be framed without becoming actionable?",
      boardUse: "Redacted internal strategy note only.",
      blockedOutcome: "No public share, formal recommendation or operational order.",
    },
  ];
}

function buildTradeoffBoard(context: Required<AgronomicStrategyPortfolioInput>): StrategyTradeoffItem[] {
  return [
    {
      id: "ASPC_TRADEOFF_001",
      label: "Certainty versus speed",
      lane: "tradeoff-board",
      tradeoffScore: clampScore(100 - context.uncertaintyBudgetCount * 11),
      priority: context.uncertaintyBudgetCount >= 6 ? "urgent" : "high",
      tradeoffQuestion: "How much uncertainty must remain visible before any future phase?",
      reviewerAction: "Keep speed-related language out of the packet.",
      blockedOutcome: "No timeline commitment or execution trigger.",
    },
    {
      id: "ASPC_TRADEOFF_002",
      label: "Evidence depth versus operational load",
      lane: "tradeoff-board",
      tradeoffScore: clampScore(100 - context.unresolvedConstraintCount * 12),
      priority: context.unresolvedConstraintCount >= 5 ? "urgent" : "high",
      tradeoffQuestion: "Which evidence themes are useful without creating work?",
      reviewerAction: "Keep evidence themes as board discussion only.",
      blockedOutcome: "No work order, task or intervention.",
    },
    {
      id: "ASPC_TRADEOFF_003",
      label: "Risk clarity versus overstatement",
      lane: "tradeoff-board",
      tradeoffScore: clampScore(context.portfolioRubricScore - context.tradeoffQuestionCount * 3),
      priority: "medium",
      tradeoffQuestion: "How can risk be stated clearly without diagnosis finality?",
      reviewerAction: "Use cautious board wording.",
      blockedOutcome: "No diagnosis finalization or product guidance.",
    },
  ];
}

function buildOptionRankingMatrix(options: StrategyPortfolioOption[]): OptionRankingItem[] {
  return options.map((option, index) => {
    const bucket: OptionRankingItem["rankBucket"] =
      option.optionScore >= 78 ? "board-discussion" : option.optionScore >= 64 ? "watch" : "hold";

    return {
      id: `ASPC_RANK_${String(index + 1).padStart(3, "0")}`,
      label: `${option.label} ranking`,
      lane: "option-ranking",
      rankBucket: bucket,
      rankingScore: option.optionScore,
      severity: option.severity,
      rankingReason: `Portfolio option is categorized as ${bucket}.`,
      manualResolution: "Ranking is for manual board comparison only.",
    };
  });
}

function buildUncertaintyBudget(context: Required<AgronomicStrategyPortfolioInput>): UncertaintyBudgetItem[] {
  return [
    {
      id: "ASPC_BUDGET_001",
      label: "Evidence uncertainty budget",
      lane: "uncertainty-budget",
      budgetScore: clampScore(context.uncertaintyBudgetCount * 14),
      severity: severityFromConcern(context.uncertaintyBudgetCount * 12),
      uncertaintyReason: "Evidence uncertainty must remain visible across all portfolio options.",
      reviewerAction: "Attach explicit uncertainty notes to board packet.",
    },
    {
      id: "ASPC_BUDGET_002",
      label: "Trade-off uncertainty budget",
      lane: "uncertainty-budget",
      budgetScore: clampScore(context.tradeoffQuestionCount * 13),
      severity: severityFromConcern(context.tradeoffQuestionCount * 11),
      uncertaintyReason: "Trade-off questions may alter the preferred portfolio discussion.",
      reviewerAction: "Keep option ranking provisional.",
    },
    {
      id: "ASPC_BUDGET_003",
      label: "Constraint uncertainty budget",
      lane: "uncertainty-budget",
      budgetScore: clampScore(context.unresolvedConstraintCount * 15),
      severity: severityFromConcern(context.unresolvedConstraintCount * 12),
      uncertaintyReason: "Unresolved constraints prevent any operational strategy conclusion.",
      reviewerAction: "Maintain non-execution boundary.",
    },
  ];
}

function buildNonExecutionBoundary(): NonExecutionBoundaryItem[] {
  return [
    {
      id: "ASPC_BOUNDARY_001",
      label: "Provider output boundary",
      lane: "non-execution",
      boundaryEnforced: true,
      severity: "critical",
      boundaryReason: "Portfolio comparison cannot call or use provider output.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "ASPC_BOUNDARY_002",
      label: "Operational action boundary",
      lane: "non-execution",
      boundaryEnforced: true,
      severity: "critical",
      boundaryReason: "Portfolio comparison cannot create or dispatch agronomic work.",
      blockedOutcome: "No task, intervention, scheduling or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "ASPC_BOUNDARY_003",
      label: "Prescriptive output boundary",
      lane: "non-execution",
      boundaryEnforced: true,
      severity: "critical",
      boundaryReason: "Portfolio comparison cannot generate product, dosage or production guidance.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildPortfolioGateMatrix(
  context: Required<AgronomicStrategyPortfolioInput>,
  sourceNodes: AgronomicStrategyPortfolioSourceNode[],
): PortfolioGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "ASPC_GATE_001",
      label: "Trade-offs are explicit enough",
      lane: "tradeoff-board" as AgronomicStrategyPortfolioLane,
      score: context.portfolioRubricScore - context.tradeoffQuestionCount * 4,
      reviewer: "trade-off reviewer",
      requiredEvidence: ["tradeoff board", "scenario stress test", "rationale ledger"],
      hardStop: "Do not close portfolio board while trade-off questions remain unclear.",
    },
    {
      id: "ASPC_GATE_002",
      label: "Constraints are controlled",
      lane: "portfolio-comparison" as AgronomicStrategyPortfolioLane,
      score: context.reviewerConfidenceScore - context.unresolvedConstraintCount * 4,
      reviewer: context.strategyLeadRole,
      requiredEvidence: ["portfolio options", "uncertainty budget", "QA board"],
      hardStop: "Do not present portfolio comparison as a final strategy.",
    },
    {
      id: "ASPC_GATE_003",
      label: "Uncertainty budget is visible",
      lane: "uncertainty-budget" as AgronomicStrategyPortfolioLane,
      score: 100 - context.uncertaintyBudgetCount * 10,
      reviewer: "uncertainty reviewer",
      requiredEvidence: ["uncertainty budget", "evidence integrity", "stress test"],
      hardStop: "Do not rank portfolios without uncertainty budget language.",
    },
    {
      id: "ASPC_GATE_004",
      label: "Non-execution boundary is enforced",
      lane: "non-execution" as AgronomicStrategyPortfolioLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-execution boundary", "guardrails"],
      hardStop: "No operational output is allowed.",
    },
    {
      id: "ASPC_GATE_005",
      label: "Audit replay is reviewable",
      lane: "audit-replay" as AgronomicStrategyPortfolioLane,
      score: context.scenarioStressScore - context.nonExecutionBoundaryCount * 3,
      reviewer: "portfolio audit reviewer",
      requiredEvidence: ["audit replay", "source nodes", "option ranking"],
      hardStop: "Do not close portfolio board if replay path is unclear.",
    },
    {
      id: "ASPC_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "human-signoff" as AgronomicStrategyPortfolioLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before portfolio-ready state.",
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

function buildBoardPortfolioPack(context: Required<AgronomicStrategyPortfolioInput>): BoardPortfolioPackItem[] {
  return [
    {
      id: "ASPC_PACK_001",
      label: "Portfolio comparison packet",
      lane: "portfolio-comparison",
      packReady: context.portfolioRubricScore >= 70,
      readinessScore: clampScore(context.portfolioRubricScore),
      reviewerCheck: "Confirm portfolio packet contains only board comparison language.",
      includedSections: ["portfolio options", "trade-offs", "option ranking"],
      blockedSections: ["operational instruction", "field dispatch", "provider material"],
    },
    {
      id: "ASPC_PACK_002",
      label: "Uncertainty budget packet",
      lane: "uncertainty-budget",
      packReady: context.uncertaintyBudgetCount <= 6,
      readinessScore: clampScore(100 - context.uncertaintyBudgetCount * 10),
      reviewerCheck: "Confirm uncertainty budget is explicit and non-final.",
      includedSections: ["uncertainty budget", "constraint list", "review caveats"],
      blockedSections: ["diagnosis finality", "formal recommendation", "execution path"],
    },
    {
      id: "ASPC_PACK_003",
      label: "Portfolio signoff packet",
      lane: "human-signoff",
      packReady: context.unresolvedConstraintCount < 6,
      readinessScore: clampScore(100 - context.unresolvedConstraintCount * 10),
      reviewerCheck: "Confirm portfolio signoff remains a manual board note only.",
      includedSections: ["human signoff", "portfolio gates", "risk register"],
      blockedSections: ["stored approval", "public share", "product or dosage output"],
    },
  ];
}

function buildAuditReplay(context: Required<AgronomicStrategyPortfolioInput>): PortfolioAuditReplayItem[] {
  return [
    {
      id: "ASPC_REPLAY_001",
      label: "Decision simulation replay",
      lane: "audit-replay",
      replayReady: context.decisionSimulationScore >= 70,
      replayScore: clampScore(context.decisionSimulationScore),
      severity: severityFromConcern(100 - context.decisionSimulationScore + context.tradeoffQuestionCount * 4),
      replayQuestion: "Can V14.0 decision simulation be replayed for portfolio comparison?",
      manualResolution: "Attach decision simulation replay note.",
    },
    {
      id: "ASPC_REPLAY_002",
      label: "Stress test replay",
      lane: "audit-replay",
      replayReady: context.scenarioStressScore >= 70,
      replayScore: clampScore(context.scenarioStressScore),
      severity: severityFromConcern(100 - context.scenarioStressScore + context.unresolvedConstraintCount * 4),
      replayQuestion: "Can V14.1 stress test be replayed for trade-off review?",
      manualResolution: "Attach stress test replay note.",
    },
    {
      id: "ASPC_REPLAY_003",
      label: "Compliance and QA replay",
      lane: "audit-replay",
      replayReady: context.qualityAssuranceScore >= 70 && context.complianceAttestationScore >= 70,
      replayScore: clampScore((context.qualityAssuranceScore + context.complianceAttestationScore) / 2),
      severity: severityFromConcern(100 - context.complianceAttestationScore + context.nonExecutionBoundaryCount * 5),
      replayQuestion: "Can QA and compliance be replayed for non-execution boundary assurance?",
      manualResolution: "Attach QA and compliance replay note.",
    },
  ];
}

function buildPortfolioSignoff(
  context: Required<AgronomicStrategyPortfolioInput>,
  gates: PortfolioGateItem[],
): PortfolioSignoffItem[] {
  return [
    {
      id: "ASPC_SIGNOFF_001",
      label: "Portfolio comparison signoff",
      lane: "human-signoff",
      signoffReady: context.portfolioOptionCount > 0 && context.unresolvedConstraintCount < 6,
      reviewer: "portfolio comparison reviewer",
      requiredEvidence: ["strategy portfolio options", "option ranking matrix", "tradeoff board"],
      safeOutcome: "Manual portfolio comparison signoff only.",
    },
    {
      id: "ASPC_SIGNOFF_002",
      label: "Non-execution boundary signoff",
      lane: "human-signoff",
      signoffReady: true,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-execution boundary", "portfolio gates", "guardrails"],
      safeOutcome: "Manual non-execution boundary signoff only.",
    },
    {
      id: "ASPC_SIGNOFF_003",
      label: "Portfolio board signoff",
      lane: "human-signoff",
      signoffReady: gates.every((gate) => gate.passed),
      reviewer: context.strategyLeadRole,
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual portfolio board signoff packet only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<AgronomicStrategyPortfolioInput>,
  sourceNodes: AgronomicStrategyPortfolioSourceNode[],
  gates: PortfolioGateItem[],
  ranking: OptionRankingItem[],
  signoff: PortfolioSignoffItem[],
): PortfolioRiskItem[] {
  const risks: PortfolioRiskItem[] = [];

  if (context.tradeoffQuestionCount > 0) {
    risks.push({
      id: "ASPC_RISK_001",
      label: "Trade-off questions require review",
      lane: "tradeoff-board",
      severity: context.tradeoffQuestionCount >= 6 ? "critical" : "elevated",
      reason: `${context.tradeoffQuestionCount} trade-off questions require board review.`,
      manualResolution: "Resolve trade-off language manually before portfolio closure.",
      blocksPortfolioBoard: context.tradeoffQuestionCount >= 7,
    });
  }

  if (context.unresolvedConstraintCount > 0) {
    risks.push({
      id: "ASPC_RISK_002",
      label: "Unresolved portfolio constraints",
      lane: "portfolio-comparison",
      severity: context.unresolvedConstraintCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedConstraintCount} constraints remain open.`,
      manualResolution: "Keep portfolio options provisional.",
      blocksPortfolioBoard: context.unresolvedConstraintCount >= 5,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `ASPC_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksPortfolioBoard: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `ASPC_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Portfolio gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksPortfolioBoard: gate.severity === "critical" || gate.score < 60,
      });
    });

  ranking
    .filter((item) => item.rankBucket === "hold")
    .forEach((item, index) => {
      risks.push({
        id: `ASPC_RANK_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.rankingReason,
        manualResolution: item.manualResolution,
        blocksPortfolioBoard: true,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `ASPC_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Portfolio signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksPortfolioBoard: true,
      });
    });

  return risks;
}

export function buildAiAgronomicStrategyPortfolioComparatorReport(
  input: AgronomicStrategyPortfolioInput = {},
): AgronomicStrategyPortfolioReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const strategyPortfolioOptions = buildStrategyPortfolioOptions(context);
  const tradeoffBoard = buildTradeoffBoard(context);
  const optionRankingMatrix = buildOptionRankingMatrix(strategyPortfolioOptions);
  const uncertaintyBudget = buildUncertaintyBudget(context);
  const nonExecutionBoundary = buildNonExecutionBoundary();
  const portfolioGateMatrix = buildPortfolioGateMatrix(context, sourceNodes);
  const boardPortfolioPack = buildBoardPortfolioPack(context);
  const auditReplay = buildAuditReplay(context);
  const portfolioSignoff = buildPortfolioSignoff(context, portfolioGateMatrix);
  const portfolioRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    portfolioGateMatrix,
    optionRankingMatrix,
    portfolioSignoff,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const optionAverage =
    strategyPortfolioOptions.reduce((sum, item) => sum + item.optionScore, 0) /
    Math.max(1, strategyPortfolioOptions.length);

  const tradeoffAverage =
    tradeoffBoard.reduce((sum, item) => sum + item.tradeoffScore, 0) /
    Math.max(1, tradeoffBoard.length);

  const gateAverage =
    portfolioGateMatrix.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, portfolioGateMatrix.length);

  const riskPenalty = portfolioRiskRegister.filter((item) => item.blocksPortfolioBoard).length * 10;
  const tradeoffPressure =
    tradeoffBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, tradeoffBoard.length * 3);

  const portfolioScore = clampScore(
    sourceAverage / 4 +
      optionAverage / 4 +
      tradeoffAverage / 4 +
      gateAverage / 4 +
      tradeoffPressure -
      riskPenalty -
      context.tradeoffQuestionCount -
      context.unresolvedConstraintCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.portfolioOptionCount * 3 +
        context.tradeoffQuestionCount * 8 +
        context.unresolvedConstraintCount * 8 +
        context.uncertaintyBudgetCount * 7 +
        context.nonExecutionBoundaryCount * 9,
    ),
  );

  const portfolioStatus = bandFromScore(
    portfolioScore,
    portfolioRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_STRATEGY_PORTFOLIO_READINESS,
    portfolioScore,
    portfolioStatus,
    overallSeverity,
    sourceNodes,
    strategyPortfolioOptions,
    tradeoffBoard,
    optionRankingMatrix,
    uncertaintyBudget,
    nonExecutionBoundary,
    portfolioGateMatrix,
    boardPortfolioPack,
    auditReplay,
    portfolioSignoff,
    portfolioRiskRegister,
    redactedExportBundle: {
      exportId: "agronomic_strategy_portfolio_comparator_v14_2_redacted_dry_run",
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
        "strategy portfolio options",
        "tradeoff board",
        "option ranking matrix",
        "uncertainty budget",
        "non-execution boundary",
        "portfolio gate matrix",
        "board portfolio pack",
        "audit replay",
        "portfolio signoff",
        "portfolio risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Agronomic strategy portfolio comparator is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Portfolio options, trade-offs and ranking matrix are review concepts only.",
      "Every portfolio conclusion remains behind human review, non-execution boundary and manual signoff.",
    ],
  };
}

export const aiAgronomicStrategyPortfolioComparatorVersion = "V14.2";
