export type AgronomicSensitivityRobustnessMode = "dry-run" | "robustness-board-review";

export type AgronomicSensitivitySeverity = "info" | "watch" | "elevated" | "critical";

export type AgronomicSensitivityPriority = "low" | "medium" | "high" | "urgent";

export type AgronomicSensitivityReadinessBand =
  | "blocked"
  | "simulation-ready"
  | "review-ready"
  | "robustness-ready";

export type AgronomicSensitivityLane =
  | "sensitivity-map"
  | "perturbation-matrix"
  | "robustness-boundary"
  | "fragile-assumption"
  | "uncertainty-lever"
  | "non-execution"
  | "audit-replay"
  | "human-signoff";

export interface AgronomicSensitivityRobustnessGuardrail {
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
  sensitivityMapReady: true;
  robustnessBoundaryReady: true;
  nonExecutionBoundaryReady: true;
  humanRobustnessSignoffReady: true;
}

export interface AgronomicSensitivityRobustnessInput {
  sensitivityDriverCount?: number;
  perturbationScenarioCount?: number;
  fragileAssumptionCount?: number;
  uncertaintyLeverCount?: number;
  unresolvedRobustnessQuestionCount?: number;
  decisionSimulationScore?: number;
  scenarioStressScore?: number;
  portfolioComparatorScore?: number;
  evidenceIntegrityScore?: number;
  rationaleLedgerScore?: number;
  qualityAssuranceScore?: number;
  complianceAttestationScore?: number;
  robustnessRubricScore?: number;
  reviewerConfidenceScore?: number;
  robustnessLeadRole?: string;
}

export interface AgronomicSensitivitySourceNode {
  id: string;
  lane: AgronomicSensitivityLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: AgronomicSensitivitySeverity;
  priority: AgronomicSensitivityPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface SensitivityDriverItem {
  id: string;
  label: string;
  lane: AgronomicSensitivityLane;
  sensitivityScore: number;
  severity: AgronomicSensitivitySeverity;
  driverQuestion: string;
  boardUse: string;
  blockedOutcome: string;
}

export interface PerturbationScenarioItem {
  id: string;
  label: string;
  lane: AgronomicSensitivityLane;
  perturbationScore: number;
  priority: AgronomicSensitivityPriority;
  perturbationQuestion: string;
  reviewerAction: string;
  blockedOutcome: string;
}

export interface RobustnessBoundaryItem {
  id: string;
  label: string;
  lane: AgronomicSensitivityLane;
  boundaryScore: number;
  severity: AgronomicSensitivitySeverity;
  boundaryReason: string;
  manualResolution: string;
}

export interface FragileAssumptionItem {
  id: string;
  label: string;
  lane: AgronomicSensitivityLane;
  fragilityScore: number;
  severity: AgronomicSensitivitySeverity;
  assumptionReason: string;
  reviewerAction: string;
  blocksRobustnessClosure: boolean;
}

export interface UncertaintyLeverItem {
  id: string;
  label: string;
  lane: AgronomicSensitivityLane;
  leverScore: number;
  priority: AgronomicSensitivityPriority;
  uncertaintyReason: string;
  manualResolution: string;
}

export interface NonExecutionBoundaryItem {
  id: string;
  label: string;
  lane: AgronomicSensitivityLane;
  boundaryEnforced: true;
  severity: AgronomicSensitivitySeverity;
  boundaryReason: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface RobustnessGateItem {
  id: string;
  label: string;
  lane: AgronomicSensitivityLane;
  passed: boolean;
  score: number;
  severity: AgronomicSensitivitySeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface RobustnessBoardPackItem {
  id: string;
  label: string;
  lane: AgronomicSensitivityLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface RobustnessAuditReplayItem {
  id: string;
  label: string;
  lane: AgronomicSensitivityLane;
  replayReady: boolean;
  replayScore: number;
  severity: AgronomicSensitivitySeverity;
  replayQuestion: string;
  manualResolution: string;
}

export interface RobustnessSignoffItem {
  id: string;
  label: string;
  lane: AgronomicSensitivityLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface RobustnessRiskItem {
  id: string;
  label: string;
  lane: AgronomicSensitivityLane;
  severity: AgronomicSensitivitySeverity;
  reason: string;
  manualResolution: string;
  blocksRobustnessBoard: boolean;
}

export interface AgronomicSensitivityRobustnessReport {
  generatedAt: string;
  mode: AgronomicSensitivityRobustnessMode;
  context: Required<AgronomicSensitivityRobustnessInput>;
  readiness: AgronomicSensitivityRobustnessGuardrail;
  robustnessScore: number;
  robustnessStatus: AgronomicSensitivityReadinessBand;
  overallSeverity: AgronomicSensitivitySeverity;
  sourceNodes: AgronomicSensitivitySourceNode[];
  sensitivityDrivers: SensitivityDriverItem[];
  perturbationMatrix: PerturbationScenarioItem[];
  robustnessBoundaries: RobustnessBoundaryItem[];
  fragileAssumptionRegister: FragileAssumptionItem[];
  uncertaintyLevers: UncertaintyLeverItem[];
  nonExecutionBoundary: NonExecutionBoundaryItem[];
  robustnessGateMatrix: RobustnessGateItem[];
  robustnessBoardPack: RobustnessBoardPackItem[];
  auditReplay: RobustnessAuditReplayItem[];
  robustnessSignoff: RobustnessSignoffItem[];
  robustnessRiskRegister: RobustnessRiskItem[];
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

export const AGRONOMIC_SENSITIVITY_ROBUSTNESS_READINESS: AgronomicSensitivityRobustnessGuardrail = {
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
  sensitivityMapReady: true,
  robustnessBoundaryReady: true,
  nonExecutionBoundaryReady: true,
  humanRobustnessSignoffReady: true,
};

const priorityWeight: Record<AgronomicSensitivityPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: AgronomicSensitivityRobustnessInput): Required<AgronomicSensitivityRobustnessInput> {
  return {
    sensitivityDriverCount: input.sensitivityDriverCount ?? 6,
    perturbationScenarioCount: input.perturbationScenarioCount ?? 7,
    fragileAssumptionCount: input.fragileAssumptionCount ?? 6,
    uncertaintyLeverCount: input.uncertaintyLeverCount ?? 6,
    unresolvedRobustnessQuestionCount: input.unresolvedRobustnessQuestionCount ?? 5,
    decisionSimulationScore: input.decisionSimulationScore ?? 72,
    scenarioStressScore: input.scenarioStressScore ?? 71,
    portfolioComparatorScore: input.portfolioComparatorScore ?? 71,
    evidenceIntegrityScore: input.evidenceIntegrityScore ?? 73,
    rationaleLedgerScore: input.rationaleLedgerScore ?? 71,
    qualityAssuranceScore: input.qualityAssuranceScore ?? 72,
    complianceAttestationScore: input.complianceAttestationScore ?? 72,
    robustnessRubricScore: input.robustnessRubricScore ?? 71,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    robustnessLeadRole: input.robustnessLeadRole ?? "agronomic robustness board lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): AgronomicSensitivitySeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: AgronomicSensitivitySeverity): AgronomicSensitivityPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): AgronomicSensitivityReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "robustness-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: AgronomicSensitivityLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): AgronomicSensitivitySourceNode {
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
            "Agronomic sensitivity robustness board is below review threshold.",
            "Robustness board must resolve sensitivity drivers, fragile assumptions and uncertainty levers.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<AgronomicSensitivityRobustnessInput>): AgronomicSensitivitySourceNode[] {
  const sensitivityPressure = context.sensitivityDriverCount * 4;
  const perturbationPressure = context.perturbationScenarioCount * 3;
  const fragilityPressure = context.fragileAssumptionCount * 4;
  const uncertaintyPressure = context.uncertaintyLeverCount * 4;
  const questionPressure = context.unresolvedRobustnessQuestionCount * 4;

  return [
    buildSourceNode(
      "ASRB_NODE_001",
      "sensitivity-map",
      "Decision simulation input",
      "V14.0",
      context.decisionSimulationScore,
      context.reviewerConfidenceScore,
      sensitivityPressure,
      "Map how V14.0 decision simulations shift under sensitivity drivers.",
    ),
    buildSourceNode(
      "ASRB_NODE_002",
      "perturbation-matrix",
      "Scenario stress test input",
      "V14.1",
      context.scenarioStressScore,
      context.reviewerConfidenceScore,
      perturbationPressure + fragilityPressure / 2,
      "Use stress-test cases as perturbation anchors.",
    ),
    buildSourceNode(
      "ASRB_NODE_003",
      "robustness-boundary",
      "Portfolio comparator input",
      "V14.2",
      context.portfolioComparatorScore,
      context.reviewerConfidenceScore,
      uncertaintyPressure,
      "Map portfolio comparison into robustness boundaries.",
    ),
    buildSourceNode(
      "ASRB_NODE_004",
      "fragile-assumption",
      "Evidence integrity input",
      "V13.2",
      context.evidenceIntegrityScore,
      context.reviewerConfidenceScore,
      fragilityPressure,
      "Identify evidence assumptions that can break scenario robustness.",
    ),
    buildSourceNode(
      "ASRB_NODE_005",
      "fragile-assumption",
      "Rationale ledger input",
      "V13.3",
      context.rationaleLedgerScore,
      context.reviewerConfidenceScore,
      fragilityPressure,
      "Identify rationale assumptions that require human caution.",
    ),
    buildSourceNode(
      "ASRB_NODE_006",
      "audit-replay",
      "QA and compliance input",
      "V13.5-V13.6",
      (context.qualityAssuranceScore + context.complianceAttestationScore) / 2,
      context.robustnessRubricScore,
      questionPressure,
      "Replay QA and compliance conditions for robustness review.",
    ),
    buildSourceNode(
      "ASRB_NODE_007",
      "non-execution",
      "Non-execution boundary",
      "V14.3",
      context.complianceAttestationScore,
      context.robustnessRubricScore,
      uncertaintyPressure,
      "Keep every sensitivity output non-actionable.",
    ),
    buildSourceNode(
      "ASRB_NODE_008",
      "human-signoff",
      "Robustness board signoff",
      "V14.3",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      questionPressure,
      "Confirm robustness signoff remains manual.",
    ),
  ];
}

function buildSensitivityDrivers(context: Required<AgronomicSensitivityRobustnessInput>): SensitivityDriverItem[] {
  return [
    {
      id: "ASRB_DRIVER_001",
      label: "Evidence confidence driver",
      lane: "sensitivity-map",
      sensitivityScore: clampScore(100 - context.evidenceIntegrityScore + context.sensitivityDriverCount * 8),
      severity: severityFromConcern(100 - context.evidenceIntegrityScore + context.sensitivityDriverCount * 9),
      driverQuestion: "How much does the board interpretation shift if evidence confidence weakens?",
      boardUse: "Board sensitivity note only.",
      blockedOutcome: "No evidence request or field task.",
    },
    {
      id: "ASRB_DRIVER_002",
      label: "Reviewer rationale driver",
      lane: "sensitivity-map",
      sensitivityScore: clampScore(100 - context.rationaleLedgerScore + context.fragileAssumptionCount * 7),
      severity: severityFromConcern(100 - context.rationaleLedgerScore + context.fragileAssumptionCount * 8),
      driverQuestion: "How much does the strategy change if reviewer rationale is less stable?",
      boardUse: "Manual rationale sensitivity note only.",
      blockedOutcome: "No diagnosis finalization or strategy recommendation.",
    },
    {
      id: "ASRB_DRIVER_003",
      label: "Stress-test pressure driver",
      lane: "sensitivity-map",
      sensitivityScore: clampScore(100 - context.scenarioStressScore + context.perturbationScenarioCount * 6),
      severity: severityFromConcern(100 - context.scenarioStressScore + context.perturbationScenarioCount * 7),
      driverQuestion: "How much does the portfolio shift under additional stress pressure?",
      boardUse: "Internal stress sensitivity discussion only.",
      blockedOutcome: "No contingency task or operational escalation.",
    },
  ];
}

function buildPerturbationMatrix(context: Required<AgronomicSensitivityRobustnessInput>): PerturbationScenarioItem[] {
  return [
    {
      id: "ASRB_PERTURB_001",
      label: "Lower evidence confidence perturbation",
      lane: "perturbation-matrix",
      perturbationScore: clampScore(context.evidenceIntegrityScore - context.perturbationScenarioCount * 3),
      priority: context.perturbationScenarioCount >= 7 ? "urgent" : "high",
      perturbationQuestion: "Does the portfolio remain reviewable if evidence confidence drops?",
      reviewerAction: "Keep as manual perturbation result.",
      blockedOutcome: "No automatic evidence follow-up.",
    },
    {
      id: "ASRB_PERTURB_002",
      label: "Higher uncertainty budget perturbation",
      lane: "perturbation-matrix",
      perturbationScore: clampScore(context.portfolioComparatorScore - context.uncertaintyLeverCount * 3),
      priority: context.uncertaintyLeverCount >= 6 ? "urgent" : "high",
      perturbationQuestion: "Does option ranking remain stable if uncertainty budget expands?",
      reviewerAction: "Keep ranking provisional.",
      blockedOutcome: "No final option selection.",
    },
    {
      id: "ASRB_PERTURB_003",
      label: "Compliance tightening perturbation",
      lane: "non-execution",
      perturbationScore: clampScore(context.complianceAttestationScore - context.unresolvedRobustnessQuestionCount * 2),
      priority: "urgent",
      perturbationQuestion: "Does every scenario remain non-actionable under stricter compliance language?",
      reviewerAction: "Tighten non-execution boundary text.",
      blockedOutcome: "No public share, task, intervention, product, dosage or forecast.",
    },
  ];
}

function buildRobustnessBoundaries(context: Required<AgronomicSensitivityRobustnessInput>): RobustnessBoundaryItem[] {
  return [
    {
      id: "ASRB_BOUNDARY_001",
      label: "Evidence robustness boundary",
      lane: "robustness-boundary",
      boundaryScore: clampScore(context.evidenceIntegrityScore - context.fragileAssumptionCount * 3),
      severity: severityFromConcern(context.fragileAssumptionCount * 12),
      boundaryReason: "Evidence assumptions define the lower boundary for board confidence.",
      manualResolution: "Keep boundary visible in the board pack.",
    },
    {
      id: "ASRB_BOUNDARY_002",
      label: "Strategy ranking robustness boundary",
      lane: "robustness-boundary",
      boundaryScore: clampScore(context.portfolioComparatorScore - context.uncertaintyLeverCount * 3),
      severity: severityFromConcern(context.uncertaintyLeverCount * 11),
      boundaryReason: "Ranking stability is limited by the uncertainty budget.",
      manualResolution: "Keep ranking provisional and non-operational.",
    },
    {
      id: "ASRB_BOUNDARY_003",
      label: "Compliance robustness boundary",
      lane: "non-execution",
      boundaryScore: 100,
      severity: "critical",
      boundaryReason: "Compliance boundary prevents all actionability in this phase.",
      manualResolution: "Maintain non-execution language across every output.",
    },
  ];
}

function buildFragileAssumptionRegister(context: Required<AgronomicSensitivityRobustnessInput>): FragileAssumptionItem[] {
  return [
    {
      id: "ASRB_ASSUMPTION_001",
      label: "Evidence completeness assumption",
      lane: "fragile-assumption",
      fragilityScore: clampScore(context.fragileAssumptionCount * 14),
      severity: severityFromConcern(context.fragileAssumptionCount * 12),
      assumptionReason: "Evidence completeness may not hold under perturbation.",
      reviewerAction: "Flag as manual board caveat.",
      blocksRobustnessClosure: context.fragileAssumptionCount >= 7,
    },
    {
      id: "ASRB_ASSUMPTION_002",
      label: "Reviewer alignment assumption",
      lane: "fragile-assumption",
      fragilityScore: clampScore(100 - context.reviewerConfidenceScore + context.unresolvedRobustnessQuestionCount * 6),
      severity: severityFromConcern(100 - context.reviewerConfidenceScore + context.unresolvedRobustnessQuestionCount * 7),
      assumptionReason: "Reviewer alignment may weaken under additional uncertainty.",
      reviewerAction: "Require human robustness board signoff.",
      blocksRobustnessClosure: context.unresolvedRobustnessQuestionCount >= 6,
    },
    {
      id: "ASRB_ASSUMPTION_003",
      label: "Portfolio stability assumption",
      lane: "fragile-assumption",
      fragilityScore: clampScore(100 - context.portfolioComparatorScore + context.uncertaintyLeverCount * 6),
      severity: severityFromConcern(100 - context.portfolioComparatorScore + context.uncertaintyLeverCount * 7),
      assumptionReason: "Portfolio ordering may not be stable under uncertainty levers.",
      reviewerAction: "Keep option ordering non-final.",
      blocksRobustnessClosure: context.uncertaintyLeverCount >= 7,
    },
  ];
}

function buildUncertaintyLevers(context: Required<AgronomicSensitivityRobustnessInput>): UncertaintyLeverItem[] {
  return [
    {
      id: "ASRB_LEVER_001",
      label: "Evidence confidence lever",
      lane: "uncertainty-lever",
      leverScore: clampScore(context.uncertaintyLeverCount * 13),
      priority: context.uncertaintyLeverCount >= 6 ? "urgent" : "high",
      uncertaintyReason: "Evidence confidence is a primary lever for robustness interpretation.",
      manualResolution: "Discuss only as an uncertainty lever.",
    },
    {
      id: "ASRB_LEVER_002",
      label: "Stress intensity lever",
      lane: "uncertainty-lever",
      leverScore: clampScore(context.perturbationScenarioCount * 12),
      priority: context.perturbationScenarioCount >= 7 ? "urgent" : "high",
      uncertaintyReason: "Stress intensity changes how robust the scenario appears.",
      manualResolution: "Keep stress intensity labels visible.",
    },
    {
      id: "ASRB_LEVER_003",
      label: "Compliance strictness lever",
      lane: "uncertainty-lever",
      leverScore: clampScore(context.unresolvedRobustnessQuestionCount * 12),
      priority: "urgent",
      uncertaintyReason: "Compliance strictness can override all strategy comparisons.",
      manualResolution: "Keep non-execution boundary active.",
    },
  ];
}

function buildNonExecutionBoundary(): NonExecutionBoundaryItem[] {
  return [
    {
      id: "ASRB_NON_EXEC_001",
      label: "Provider output boundary",
      lane: "non-execution",
      boundaryEnforced: true,
      severity: "critical",
      boundaryReason: "Sensitivity robustness board cannot call or use provider output.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "ASRB_NON_EXEC_002",
      label: "Operational action boundary",
      lane: "non-execution",
      boundaryEnforced: true,
      severity: "critical",
      boundaryReason: "Sensitivity robustness board cannot create or dispatch agronomic work.",
      blockedOutcome: "No task, intervention, scheduling or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "ASRB_NON_EXEC_003",
      label: "Prescriptive output boundary",
      lane: "non-execution",
      boundaryEnforced: true,
      severity: "critical",
      boundaryReason: "Sensitivity robustness board cannot generate product, dosage or production guidance.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildRobustnessGateMatrix(
  context: Required<AgronomicSensitivityRobustnessInput>,
  sourceNodes: AgronomicSensitivitySourceNode[],
): RobustnessGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "ASRB_GATE_001",
      label: "Sensitivity drivers are explicit enough",
      lane: "sensitivity-map" as AgronomicSensitivityLane,
      score: context.robustnessRubricScore - context.sensitivityDriverCount * 4,
      reviewer: "sensitivity reviewer",
      requiredEvidence: ["sensitivity drivers", "decision simulation", "portfolio comparator"],
      hardStop: "Do not close robustness board while sensitivity drivers remain unclear.",
    },
    {
      id: "ASRB_GATE_002",
      label: "Perturbation matrix is reviewable",
      lane: "perturbation-matrix" as AgronomicSensitivityLane,
      score: context.reviewerConfidenceScore - context.perturbationScenarioCount * 3,
      reviewer: "perturbation reviewer",
      requiredEvidence: ["perturbation matrix", "scenario stress test", "audit replay"],
      hardStop: "Do not present robustness results as stable without perturbation caveats.",
    },
    {
      id: "ASRB_GATE_003",
      label: "Fragile assumptions are controlled",
      lane: "fragile-assumption" as AgronomicSensitivityLane,
      score: 100 - context.fragileAssumptionCount * 11,
      reviewer: context.robustnessLeadRole,
      requiredEvidence: ["fragile assumption register", "uncertainty levers"],
      hardStop: "Do not close robustness board while fragile assumptions remain unresolved.",
    },
    {
      id: "ASRB_GATE_004",
      label: "Non-execution boundary is enforced",
      lane: "non-execution" as AgronomicSensitivityLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-execution boundary", "guardrails"],
      hardStop: "No operational output is allowed.",
    },
    {
      id: "ASRB_GATE_005",
      label: "Audit replay is reviewable",
      lane: "audit-replay" as AgronomicSensitivityLane,
      score: context.portfolioComparatorScore - context.unresolvedRobustnessQuestionCount * 3,
      reviewer: "robustness audit reviewer",
      requiredEvidence: ["audit replay", "source nodes", "robustness boundaries"],
      hardStop: "Do not close robustness board if replay path is unclear.",
    },
    {
      id: "ASRB_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "human-signoff" as AgronomicSensitivityLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before robustness-ready state.",
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

function buildRobustnessBoardPack(context: Required<AgronomicSensitivityRobustnessInput>): RobustnessBoardPackItem[] {
  return [
    {
      id: "ASRB_PACK_001",
      label: "Sensitivity map packet",
      lane: "sensitivity-map",
      packReady: context.robustnessRubricScore >= 70,
      readinessScore: clampScore(context.robustnessRubricScore),
      reviewerCheck: "Confirm sensitivity packet contains only board review language.",
      includedSections: ["sensitivity drivers", "perturbation matrix", "uncertainty levers"],
      blockedSections: ["operational instruction", "field dispatch", "provider material"],
    },
    {
      id: "ASRB_PACK_002",
      label: "Robustness boundary packet",
      lane: "robustness-boundary",
      packReady: context.fragileAssumptionCount <= 6,
      readinessScore: clampScore(100 - context.fragileAssumptionCount * 10),
      reviewerCheck: "Confirm robustness boundary is explicit and non-final.",
      includedSections: ["robustness boundaries", "fragile assumptions", "review caveats"],
      blockedSections: ["diagnosis finality", "formal recommendation", "execution path"],
    },
    {
      id: "ASRB_PACK_003",
      label: "Robustness signoff packet",
      lane: "human-signoff",
      packReady: context.unresolvedRobustnessQuestionCount < 6,
      readinessScore: clampScore(100 - context.unresolvedRobustnessQuestionCount * 10),
      reviewerCheck: "Confirm robustness signoff remains a manual board note only.",
      includedSections: ["human signoff", "robustness gates", "risk register"],
      blockedSections: ["stored approval", "public share", "product or dosage output"],
    },
  ];
}

function buildAuditReplay(context: Required<AgronomicSensitivityRobustnessInput>): RobustnessAuditReplayItem[] {
  return [
    {
      id: "ASRB_REPLAY_001",
      label: "Decision simulation replay",
      lane: "audit-replay",
      replayReady: context.decisionSimulationScore >= 70,
      replayScore: clampScore(context.decisionSimulationScore),
      severity: severityFromConcern(100 - context.decisionSimulationScore + context.sensitivityDriverCount * 4),
      replayQuestion: "Can V14.0 decision simulation be replayed for sensitivity context?",
      manualResolution: "Attach decision simulation replay note.",
    },
    {
      id: "ASRB_REPLAY_002",
      label: "Stress and portfolio replay",
      lane: "audit-replay",
      replayReady: context.scenarioStressScore >= 70 && context.portfolioComparatorScore >= 70,
      replayScore: clampScore((context.scenarioStressScore + context.portfolioComparatorScore) / 2),
      severity: severityFromConcern(100 - context.scenarioStressScore + context.perturbationScenarioCount * 4),
      replayQuestion: "Can V14.1 and V14.2 be replayed for robustness boundaries?",
      manualResolution: "Attach stress and portfolio replay note.",
    },
    {
      id: "ASRB_REPLAY_003",
      label: "QA and compliance replay",
      lane: "audit-replay",
      replayReady: context.qualityAssuranceScore >= 70 && context.complianceAttestationScore >= 70,
      replayScore: clampScore((context.qualityAssuranceScore + context.complianceAttestationScore) / 2),
      severity: severityFromConcern(100 - context.complianceAttestationScore + context.unresolvedRobustnessQuestionCount * 5),
      replayQuestion: "Can QA and compliance be replayed for non-execution boundary assurance?",
      manualResolution: "Attach QA and compliance replay note.",
    },
  ];
}

function buildRobustnessSignoff(
  context: Required<AgronomicSensitivityRobustnessInput>,
  gates: RobustnessGateItem[],
): RobustnessSignoffItem[] {
  return [
    {
      id: "ASRB_SIGNOFF_001",
      label: "Sensitivity map signoff",
      lane: "human-signoff",
      signoffReady: context.sensitivityDriverCount > 0 && context.fragileAssumptionCount < 7,
      reviewer: "sensitivity reviewer",
      requiredEvidence: ["sensitivity drivers", "perturbation matrix", "uncertainty levers"],
      safeOutcome: "Manual sensitivity map signoff only.",
    },
    {
      id: "ASRB_SIGNOFF_002",
      label: "Non-execution boundary signoff",
      lane: "human-signoff",
      signoffReady: true,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-execution boundary", "robustness gates", "guardrails"],
      safeOutcome: "Manual non-execution boundary signoff only.",
    },
    {
      id: "ASRB_SIGNOFF_003",
      label: "Robustness board signoff",
      lane: "human-signoff",
      signoffReady: gates.every((gate) => gate.passed),
      reviewer: context.robustnessLeadRole,
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual robustness board signoff packet only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<AgronomicSensitivityRobustnessInput>,
  sourceNodes: AgronomicSensitivitySourceNode[],
  gates: RobustnessGateItem[],
  assumptions: FragileAssumptionItem[],
  signoff: RobustnessSignoffItem[],
): RobustnessRiskItem[] {
  const risks: RobustnessRiskItem[] = [];

  if (context.fragileAssumptionCount > 0) {
    risks.push({
      id: "ASRB_RISK_001",
      label: "Fragile assumptions require review",
      lane: "fragile-assumption",
      severity: context.fragileAssumptionCount >= 6 ? "critical" : "elevated",
      reason: `${context.fragileAssumptionCount} fragile assumptions require board review.`,
      manualResolution: "Review fragile assumptions manually before robustness closure.",
      blocksRobustnessBoard: context.fragileAssumptionCount >= 7,
    });
  }

  if (context.uncertaintyLeverCount > 0) {
    risks.push({
      id: "ASRB_RISK_002",
      label: "Uncertainty levers remain high",
      lane: "uncertainty-lever",
      severity: context.uncertaintyLeverCount >= 6 ? "critical" : "elevated",
      reason: `${context.uncertaintyLeverCount} uncertainty levers require explicit language.`,
      manualResolution: "Document uncertainty levers explicitly in robustness pack.",
      blocksRobustnessBoard: context.uncertaintyLeverCount >= 7,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `ASRB_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksRobustnessBoard: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `ASRB_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Robustness gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksRobustnessBoard: gate.severity === "critical" || gate.score < 60,
      });
    });

  assumptions
    .filter((item) => item.blocksRobustnessClosure)
    .forEach((item, index) => {
      risks.push({
        id: `ASRB_ASSUMPTION_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.assumptionReason,
        manualResolution: item.reviewerAction,
        blocksRobustnessBoard: true,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `ASRB_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Robustness signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksRobustnessBoard: true,
      });
    });

  return risks;
}

export function buildAiAgronomicSensitivityRobustnessReport(
  input: AgronomicSensitivityRobustnessInput = {},
): AgronomicSensitivityRobustnessReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const sensitivityDrivers = buildSensitivityDrivers(context);
  const perturbationMatrix = buildPerturbationMatrix(context);
  const robustnessBoundaries = buildRobustnessBoundaries(context);
  const fragileAssumptionRegister = buildFragileAssumptionRegister(context);
  const uncertaintyLevers = buildUncertaintyLevers(context);
  const nonExecutionBoundary = buildNonExecutionBoundary();
  const robustnessGateMatrix = buildRobustnessGateMatrix(context, sourceNodes);
  const robustnessBoardPack = buildRobustnessBoardPack(context);
  const auditReplay = buildAuditReplay(context);
  const robustnessSignoff = buildRobustnessSignoff(context, robustnessGateMatrix);
  const robustnessRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    robustnessGateMatrix,
    fragileAssumptionRegister,
    robustnessSignoff,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const sensitivityAverage =
    sensitivityDrivers.reduce((sum, item) => sum + (100 - item.sensitivityScore), 0) /
    Math.max(1, sensitivityDrivers.length);

  const perturbationAverage =
    perturbationMatrix.reduce((sum, item) => sum + item.perturbationScore, 0) /
    Math.max(1, perturbationMatrix.length);

  const gateAverage =
    robustnessGateMatrix.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, robustnessGateMatrix.length);

  const riskPenalty = robustnessRiskRegister.filter((item) => item.blocksRobustnessBoard).length * 10;
  const perturbationPressure =
    perturbationMatrix.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, perturbationMatrix.length * 3);

  const robustnessScore = clampScore(
    sourceAverage / 4 +
      sensitivityAverage / 4 +
      perturbationAverage / 4 +
      gateAverage / 4 +
      perturbationPressure -
      riskPenalty -
      context.fragileAssumptionCount -
      context.uncertaintyLeverCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.sensitivityDriverCount * 3 +
        context.perturbationScenarioCount * 6 +
        context.fragileAssumptionCount * 8 +
        context.uncertaintyLeverCount * 8 +
        context.unresolvedRobustnessQuestionCount * 7,
    ),
  );

  const robustnessStatus = bandFromScore(
    robustnessScore,
    robustnessRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_SENSITIVITY_ROBUSTNESS_READINESS,
    robustnessScore,
    robustnessStatus,
    overallSeverity,
    sourceNodes,
    sensitivityDrivers,
    perturbationMatrix,
    robustnessBoundaries,
    fragileAssumptionRegister,
    uncertaintyLevers,
    nonExecutionBoundary,
    robustnessGateMatrix,
    robustnessBoardPack,
    auditReplay,
    robustnessSignoff,
    robustnessRiskRegister,
    redactedExportBundle: {
      exportId: "agronomic_sensitivity_robustness_v14_3_redacted_dry_run",
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
        "sensitivity drivers",
        "perturbation matrix",
        "robustness boundaries",
        "fragile assumption register",
        "uncertainty levers",
        "non-execution boundary",
        "robustness gate matrix",
        "robustness board pack",
        "audit replay",
        "robustness signoff",
        "robustness risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Agronomic sensitivity robustness board is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Sensitivity drivers, perturbation matrix and robustness boundaries are review concepts only.",
      "Every robustness conclusion remains behind human review, non-execution boundary and manual signoff.",
    ],
  };
}

export const aiAgronomicSensitivityRobustnessVersion = "V14.3";
