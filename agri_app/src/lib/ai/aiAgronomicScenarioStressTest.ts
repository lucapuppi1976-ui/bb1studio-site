export type AgronomicScenarioStressMode = "dry-run" | "stress-board-review";

export type AgronomicScenarioStressSeverity = "info" | "watch" | "elevated" | "critical";

export type AgronomicScenarioStressPriority = "low" | "medium" | "high" | "urgent";

export type AgronomicScenarioStressReadinessBand =
  | "blocked"
  | "simulation-ready"
  | "review-ready"
  | "stress-test-ready";

export type AgronomicScenarioStressLane =
  | "scenario-stress"
  | "failure-mode"
  | "fragility-map"
  | "contingency-hold"
  | "non-execution"
  | "strategy-resilience"
  | "audit-replay"
  | "human-signoff";

export interface AgronomicScenarioStressGuardrail {
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
  scenarioStressTestReady: true;
  failureModeSandboxReady: true;
  nonExecutionEnvelopeReady: true;
  humanStressSignoffReady: true;
}

export interface AgronomicScenarioStressInput {
  stressScenarioCount?: number;
  failureModeCount?: number;
  fragilitySignalCount?: number;
  contingencyHoldCount?: number;
  unresolvedStressQuestionCount?: number;
  decisionSimulationScore?: number;
  evidenceIntegrityScore?: number;
  rationaleLedgerScore?: number;
  qualityAssuranceScore?: number;
  complianceAttestationScore?: number;
  stressRubricScore?: number;
  resilienceConfidenceScore?: number;
  strategyLeadRole?: string;
}

export interface AgronomicScenarioStressSourceNode {
  id: string;
  lane: AgronomicScenarioStressLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: AgronomicScenarioStressSeverity;
  priority: AgronomicScenarioStressPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ScenarioStressCase {
  id: string;
  label: string;
  lane: AgronomicScenarioStressLane;
  stressScore: number;
  severity: AgronomicScenarioStressSeverity;
  stressQuestion: string;
  safeUse: string;
  blockedOutcome: string;
}

export interface FailureModeItem {
  id: string;
  label: string;
  lane: AgronomicScenarioStressLane;
  failurePressureScore: number;
  priority: AgronomicScenarioStressPriority;
  failureQuestion: string;
  reviewerAction: string;
  blockedOutcome: string;
}

export interface FragilityMapItem {
  id: string;
  label: string;
  lane: AgronomicScenarioStressLane;
  fragilityScore: number;
  severity: AgronomicScenarioStressSeverity;
  fragilityReason: string;
  manualResolution: string;
}

export interface ContingencyHoldItem {
  id: string;
  label: string;
  lane: AgronomicScenarioStressLane;
  priority: AgronomicScenarioStressPriority;
  severity: AgronomicScenarioStressSeverity;
  holdReason: string;
  manualResolution: string;
  blocksStressClosure: boolean;
}

export interface NonExecutionEnvelopeItem {
  id: string;
  label: string;
  lane: AgronomicScenarioStressLane;
  freezeEnforced: true;
  severity: AgronomicScenarioStressSeverity;
  envelopeReason: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface StressGateItem {
  id: string;
  label: string;
  lane: AgronomicScenarioStressLane;
  passed: boolean;
  score: number;
  severity: AgronomicScenarioStressSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ResilienceStrategyPackItem {
  id: string;
  label: string;
  lane: AgronomicScenarioStressLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface StressAuditReplayItem {
  id: string;
  label: string;
  lane: AgronomicScenarioStressLane;
  replayReady: boolean;
  replayScore: number;
  severity: AgronomicScenarioStressSeverity;
  replayQuestion: string;
  manualResolution: string;
}

export interface StressSignoffItem {
  id: string;
  label: string;
  lane: AgronomicScenarioStressLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface StressRiskItem {
  id: string;
  label: string;
  lane: AgronomicScenarioStressLane;
  severity: AgronomicScenarioStressSeverity;
  reason: string;
  manualResolution: string;
  blocksStressBoard: boolean;
}

export interface AgronomicScenarioStressReport {
  generatedAt: string;
  mode: AgronomicScenarioStressMode;
  context: Required<AgronomicScenarioStressInput>;
  readiness: AgronomicScenarioStressGuardrail;
  stressTestScore: number;
  stressTestStatus: AgronomicScenarioStressReadinessBand;
  overallSeverity: AgronomicScenarioStressSeverity;
  sourceNodes: AgronomicScenarioStressSourceNode[];
  scenarioStressCases: ScenarioStressCase[];
  failureModeSandbox: FailureModeItem[];
  fragilityMap: FragilityMapItem[];
  contingencyHolds: ContingencyHoldItem[];
  nonExecutionEnvelope: NonExecutionEnvelopeItem[];
  stressGateMatrix: StressGateItem[];
  resilienceStrategyPack: ResilienceStrategyPackItem[];
  auditReplay: StressAuditReplayItem[];
  stressSignoff: StressSignoffItem[];
  stressRiskRegister: StressRiskItem[];
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

export const AGRONOMIC_SCENARIO_STRESS_READINESS: AgronomicScenarioStressGuardrail = {
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
  scenarioStressTestReady: true,
  failureModeSandboxReady: true,
  nonExecutionEnvelopeReady: true,
  humanStressSignoffReady: true,
};

const priorityWeight: Record<AgronomicScenarioStressPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: AgronomicScenarioStressInput): Required<AgronomicScenarioStressInput> {
  return {
    stressScenarioCount: input.stressScenarioCount ?? 7,
    failureModeCount: input.failureModeCount ?? 6,
    fragilitySignalCount: input.fragilitySignalCount ?? 6,
    contingencyHoldCount: input.contingencyHoldCount ?? 5,
    unresolvedStressQuestionCount: input.unresolvedStressQuestionCount ?? 5,
    decisionSimulationScore: input.decisionSimulationScore ?? 72,
    evidenceIntegrityScore: input.evidenceIntegrityScore ?? 73,
    rationaleLedgerScore: input.rationaleLedgerScore ?? 71,
    qualityAssuranceScore: input.qualityAssuranceScore ?? 72,
    complianceAttestationScore: input.complianceAttestationScore ?? 72,
    stressRubricScore: input.stressRubricScore ?? 71,
    resilienceConfidenceScore: input.resilienceConfidenceScore ?? 72,
    strategyLeadRole: input.strategyLeadRole ?? "agronomic stress board lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): AgronomicScenarioStressSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: AgronomicScenarioStressSeverity): AgronomicScenarioStressPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): AgronomicScenarioStressReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "stress-test-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: AgronomicScenarioStressLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): AgronomicScenarioStressSourceNode {
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
            "Agronomic scenario stress test is below board threshold.",
            "Stress board must resolve failure modes, fragility signals and contingency holds.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<AgronomicScenarioStressInput>): AgronomicScenarioStressSourceNode[] {
  const failurePressure = context.failureModeCount * 4;
  const fragilityPressure = context.fragilitySignalCount * 4;
  const holdPressure = context.contingencyHoldCount * 5;
  const questionPressure = context.unresolvedStressQuestionCount * 4;

  return [
    buildSourceNode(
      "ASST_NODE_001",
      "scenario-stress",
      "Decision simulation input",
      "V14.0",
      context.decisionSimulationScore,
      context.resilienceConfidenceScore,
      questionPressure,
      "Stress-test the V14.0 strategy scenarios without actionability.",
    ),
    buildSourceNode(
      "ASST_NODE_002",
      "fragility-map",
      "Evidence integrity input",
      "V13.2",
      context.evidenceIntegrityScore,
      context.resilienceConfidenceScore,
      fragilityPressure,
      "Map evidence fragility into stress board review.",
    ),
    buildSourceNode(
      "ASST_NODE_003",
      "failure-mode",
      "Rationale ledger input",
      "V13.3",
      context.rationaleLedgerScore,
      context.resilienceConfidenceScore,
      failurePressure,
      "Stress-test rationale gaps and failure modes.",
    ),
    buildSourceNode(
      "ASST_NODE_004",
      "strategy-resilience",
      "Quality assurance input",
      "V13.5",
      context.qualityAssuranceScore,
      context.stressRubricScore,
      questionPressure,
      "Use QA findings to calibrate strategy resilience.",
    ),
    buildSourceNode(
      "ASST_NODE_005",
      "non-execution",
      "Compliance attestation input",
      "V13.6",
      context.complianceAttestationScore,
      context.stressRubricScore,
      holdPressure,
      "Carry compliance attestation into non-execution envelope.",
    ),
    buildSourceNode(
      "ASST_NODE_006",
      "contingency-hold",
      "Failure mode sandbox",
      "V14.1",
      context.stressRubricScore,
      context.resilienceConfidenceScore,
      failurePressure + holdPressure / 2,
      "Review contingency holds without creating follow-up work.",
    ),
    buildSourceNode(
      "ASST_NODE_007",
      "audit-replay",
      "Stress audit replay",
      "V14.1",
      context.resilienceConfidenceScore,
      context.stressRubricScore,
      context.stressScenarioCount * 3,
      "Replay stress board reasoning manually.",
    ),
    buildSourceNode(
      "ASST_NODE_008",
      "human-signoff",
      "Stress board signoff",
      "V14.1",
      context.resilienceConfidenceScore,
      context.resilienceConfidenceScore,
      questionPressure,
      "Confirm stress test signoff remains manual.",
    ),
  ];
}

function buildScenarioStressCases(context: Required<AgronomicScenarioStressInput>): ScenarioStressCase[] {
  return [
    {
      id: "ASST_CASE_001",
      label: "Worst-case evidence weakness",
      lane: "scenario-stress",
      stressScore: clampScore(context.evidenceIntegrityScore - context.fragilitySignalCount * 3),
      severity: severityFromConcern(context.fragilitySignalCount * 12),
      stressQuestion: "What happens to the strategy if evidence strength is lower than expected?",
      safeUse: "Manual stress discussion only.",
      blockedOutcome: "No evidence request, task or field mission.",
    },
    {
      id: "ASST_CASE_002",
      label: "Reviewer disagreement reopens",
      lane: "scenario-stress",
      stressScore: clampScore(context.rationaleLedgerScore - context.failureModeCount * 2),
      severity: severityFromConcern(context.failureModeCount * 10),
      stressQuestion: "What if reviewer rationale diverges during board review?",
      safeUse: "Manual rationale stress note only.",
      blockedOutcome: "No automatic escalation or approval.",
    },
    {
      id: "ASST_CASE_003",
      label: "Compliance hold dominates strategy",
      lane: "non-execution",
      stressScore: clampScore(context.complianceAttestationScore - context.contingencyHoldCount * 3),
      severity: "critical",
      stressQuestion: "What if compliance holds override all strategy options?",
      safeUse: "Manual non-execution discussion only.",
      blockedOutcome: "No operational order, product output or dosage output.",
    },
  ];
}

function buildFailureModeSandbox(context: Required<AgronomicScenarioStressInput>): FailureModeItem[] {
  return [
    {
      id: "ASST_FAILURE_001",
      label: "Evidence ambiguity failure mode",
      lane: "failure-mode",
      failurePressureScore: clampScore(context.fragilitySignalCount * 14),
      priority: context.fragilitySignalCount >= 6 ? "urgent" : "high",
      failureQuestion: "Could ambiguity make the strategy misleading?",
      reviewerAction: "Keep ambiguity as explicit board caveat.",
      blockedOutcome: "No diagnostic finalization.",
    },
    {
      id: "ASST_FAILURE_002",
      label: "Rationale incompleteness failure mode",
      lane: "failure-mode",
      failurePressureScore: clampScore(context.failureModeCount * 13),
      priority: context.failureModeCount >= 6 ? "urgent" : "high",
      failureQuestion: "Could missing rationale weaken the option matrix?",
      reviewerAction: "Route to manual rationale review.",
      blockedOutcome: "No strategy recommendation.",
    },
    {
      id: "ASST_FAILURE_003",
      label: "Non-execution breach failure mode",
      lane: "non-execution",
      failurePressureScore: clampScore(context.contingencyHoldCount * 16),
      priority: "urgent",
      failureQuestion: "Could any scenario be misread as actionable?",
      reviewerAction: "Tighten non-execution language.",
      blockedOutcome: "No task, intervention, dispatch, product, dosage or forecast.",
    },
  ];
}

function buildFragilityMap(context: Required<AgronomicScenarioStressInput>): FragilityMapItem[] {
  return [
    {
      id: "ASST_FRAGILITY_001",
      label: "Evidence chain fragility",
      lane: "fragility-map",
      fragilityScore: clampScore(context.fragilitySignalCount * 14),
      severity: severityFromConcern(context.fragilitySignalCount * 12),
      fragilityReason: "Evidence chain remains vulnerable to interpretation gaps.",
      manualResolution: "Keep scenario language conditional and manual.",
    },
    {
      id: "ASST_FRAGILITY_002",
      label: "Reviewer confidence fragility",
      lane: "fragility-map",
      fragilityScore: clampScore(100 - context.resilienceConfidenceScore + context.unresolvedStressQuestionCount * 5),
      severity: severityFromConcern(100 - context.resilienceConfidenceScore + context.unresolvedStressQuestionCount * 6),
      fragilityReason: "Reviewer confidence may not support strategy closure.",
      manualResolution: "Require human stress board signoff.",
    },
    {
      id: "ASST_FRAGILITY_003",
      label: "Strategy communication fragility",
      lane: "strategy-resilience",
      fragilityScore: clampScore(context.unresolvedStressQuestionCount * 13),
      severity: severityFromConcern(context.unresolvedStressQuestionCount * 11),
      fragilityReason: "Strategy wording may be interpreted as a recommendation.",
      manualResolution: "Use non-actionable board language only.",
    },
  ];
}

function buildContingencyHolds(context: Required<AgronomicScenarioStressInput>): ContingencyHoldItem[] {
  return [
    {
      id: "ASST_HOLD_001",
      label: "Evidence fragility hold",
      lane: "contingency-hold",
      priority: context.fragilitySignalCount >= 6 ? "urgent" : "high",
      severity: context.fragilitySignalCount >= 6 ? "critical" : "elevated",
      holdReason: `${context.fragilitySignalCount} fragility signals require manual review.`,
      manualResolution: "Resolve or carry forward as board caveat.",
      blocksStressClosure: context.fragilitySignalCount >= 7,
    },
    {
      id: "ASST_HOLD_002",
      label: "Failure mode hold",
      lane: "failure-mode",
      priority: context.failureModeCount >= 6 ? "urgent" : "high",
      severity: context.failureModeCount >= 6 ? "critical" : "elevated",
      holdReason: `${context.failureModeCount} failure modes require stress board review.`,
      manualResolution: "Review failure modes manually.",
      blocksStressClosure: context.failureModeCount >= 6,
    },
    {
      id: "ASST_HOLD_003",
      label: "Non-execution hold",
      lane: "non-execution",
      priority: "urgent",
      severity: "critical",
      holdReason: `${context.contingencyHoldCount} contingency holds require non-execution protection.`,
      manualResolution: "Keep all scenario outputs non-actionable.",
      blocksStressClosure: false,
    },
  ];
}

function buildNonExecutionEnvelope(): NonExecutionEnvelopeItem[] {
  return [
    {
      id: "ASST_ENVELOPE_001",
      label: "Provider output envelope",
      lane: "non-execution",
      freezeEnforced: true,
      severity: "critical",
      envelopeReason: "Scenario stress test cannot call or use provider output.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "ASST_ENVELOPE_002",
      label: "Operational action envelope",
      lane: "non-execution",
      freezeEnforced: true,
      severity: "critical",
      envelopeReason: "Scenario stress test cannot create or dispatch agronomic work.",
      blockedOutcome: "No task, intervention, scheduling or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "ASST_ENVELOPE_003",
      label: "Prescriptive output envelope",
      lane: "non-execution",
      freezeEnforced: true,
      severity: "critical",
      envelopeReason: "Scenario stress test cannot generate product, dosage or production guidance.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildStressGateMatrix(
  context: Required<AgronomicScenarioStressInput>,
  sourceNodes: AgronomicScenarioStressSourceNode[],
): StressGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "ASST_GATE_001",
      label: "Failure modes are explicit enough",
      lane: "failure-mode" as AgronomicScenarioStressLane,
      score: context.stressRubricScore - context.failureModeCount * 4,
      reviewer: "failure mode reviewer",
      requiredEvidence: ["failure mode sandbox", "rationale ledger", "strategy simulation"],
      hardStop: "Do not close stress board if failure modes remain unclear.",
    },
    {
      id: "ASST_GATE_002",
      label: "Fragility map is explicit enough",
      lane: "fragility-map" as AgronomicScenarioStressLane,
      score: context.resilienceConfidenceScore - context.fragilitySignalCount * 3,
      reviewer: "fragility reviewer",
      requiredEvidence: ["fragility map", "evidence integrity", "QA board"],
      hardStop: "Do not present scenario pack without fragility language.",
    },
    {
      id: "ASST_GATE_003",
      label: "Contingency holds are controlled",
      lane: "contingency-hold" as AgronomicScenarioStressLane,
      score: 100 - context.contingencyHoldCount * 10,
      reviewer: context.strategyLeadRole,
      requiredEvidence: ["contingency holds", "non-execution envelope", "human signoff"],
      hardStop: "Do not bypass contingency holds.",
    },
    {
      id: "ASST_GATE_004",
      label: "Non-execution envelope is enforced",
      lane: "non-execution" as AgronomicScenarioStressLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-execution envelope", "guardrails"],
      hardStop: "No operational output is allowed.",
    },
    {
      id: "ASST_GATE_005",
      label: "Audit replay is reviewable",
      lane: "audit-replay" as AgronomicScenarioStressLane,
      score: context.resilienceConfidenceScore - context.unresolvedStressQuestionCount * 3,
      reviewer: "stress audit reviewer",
      requiredEvidence: ["audit replay", "source nodes", "stress cases"],
      hardStop: "Do not close stress test if replay path is unclear.",
    },
    {
      id: "ASST_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "human-signoff" as AgronomicScenarioStressLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before stress-test-ready state.",
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

function buildResilienceStrategyPack(context: Required<AgronomicScenarioStressInput>): ResilienceStrategyPackItem[] {
  return [
    {
      id: "ASST_PACK_001",
      label: "Scenario stress pack",
      lane: "strategy-resilience",
      packReady: context.stressRubricScore >= 70,
      readinessScore: clampScore(context.stressRubricScore),
      reviewerCheck: "Confirm stress pack contains only board review language.",
      includedSections: ["stress cases", "failure modes", "fragility map"],
      blockedSections: ["operational instruction", "field dispatch", "provider material"],
    },
    {
      id: "ASST_PACK_002",
      label: "Non-execution envelope pack",
      lane: "non-execution",
      packReady: true,
      readinessScore: 100,
      reviewerCheck: "Confirm every stress case carries non-execution protection.",
      includedSections: ["blocked outcomes", "guardrails", "manual signoff markers"],
      blockedSections: ["task creation", "intervention creation", "execution path"],
    },
    {
      id: "ASST_PACK_003",
      label: "Resilience board signoff pack",
      lane: "human-signoff",
      packReady: context.failureModeCount < 7,
      readinessScore: clampScore(100 - context.failureModeCount * 10),
      reviewerCheck: "Confirm resilience signoff remains a manual board note only.",
      includedSections: ["human signoff", "stress gates", "risk register"],
      blockedSections: ["stored approval", "public share", "product or dosage output"],
    },
  ];
}

function buildAuditReplay(context: Required<AgronomicScenarioStressInput>): StressAuditReplayItem[] {
  return [
    {
      id: "ASST_REPLAY_001",
      label: "Decision simulation replay",
      lane: "audit-replay",
      replayReady: context.decisionSimulationScore >= 70,
      replayScore: clampScore(context.decisionSimulationScore),
      severity: severityFromConcern(100 - context.decisionSimulationScore + context.unresolvedStressQuestionCount * 4),
      replayQuestion: "Can V14.0 decision simulation be replayed for stress test context?",
      manualResolution: "Attach decision simulation replay note.",
    },
    {
      id: "ASST_REPLAY_002",
      label: "Evidence and rationale replay",
      lane: "audit-replay",
      replayReady: context.evidenceIntegrityScore >= 70 && context.rationaleLedgerScore >= 70,
      replayScore: clampScore((context.evidenceIntegrityScore + context.rationaleLedgerScore) / 2),
      severity: severityFromConcern(100 - context.evidenceIntegrityScore + context.fragilitySignalCount * 4),
      replayQuestion: "Can evidence and rationale fragility be replayed manually?",
      manualResolution: "Attach evidence and rationale replay note.",
    },
    {
      id: "ASST_REPLAY_003",
      label: "QA and compliance replay",
      lane: "audit-replay",
      replayReady: context.qualityAssuranceScore >= 70 && context.complianceAttestationScore >= 70,
      replayScore: clampScore((context.qualityAssuranceScore + context.complianceAttestationScore) / 2),
      severity: severityFromConcern(100 - context.complianceAttestationScore + context.contingencyHoldCount * 5),
      replayQuestion: "Can QA and compliance be replayed for non-execution assurance?",
      manualResolution: "Attach QA and compliance replay note.",
    },
  ];
}

function buildStressSignoff(
  context: Required<AgronomicScenarioStressInput>,
  gates: StressGateItem[],
): StressSignoffItem[] {
  return [
    {
      id: "ASST_SIGNOFF_001",
      label: "Failure mode signoff",
      lane: "human-signoff",
      signoffReady: context.failureModeCount < 7,
      reviewer: "failure mode reviewer",
      requiredEvidence: ["failure mode sandbox", "fragility map", "stress gates"],
      safeOutcome: "Manual failure mode signoff only.",
    },
    {
      id: "ASST_SIGNOFF_002",
      label: "Non-execution signoff",
      lane: "human-signoff",
      signoffReady: true,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-execution envelope", "guardrails"],
      safeOutcome: "Manual non-execution signoff only.",
    },
    {
      id: "ASST_SIGNOFF_003",
      label: "Stress board signoff",
      lane: "human-signoff",
      signoffReady: gates.every((gate) => gate.passed),
      reviewer: context.strategyLeadRole,
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual stress board signoff packet only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<AgronomicScenarioStressInput>,
  sourceNodes: AgronomicScenarioStressSourceNode[],
  gates: StressGateItem[],
  holds: ContingencyHoldItem[],
  signoff: StressSignoffItem[],
): StressRiskItem[] {
  const risks: StressRiskItem[] = [];

  if (context.failureModeCount > 0) {
    risks.push({
      id: "ASST_RISK_001",
      label: "Failure modes require review",
      lane: "failure-mode",
      severity: context.failureModeCount >= 6 ? "critical" : "elevated",
      reason: `${context.failureModeCount} failure modes require board review.`,
      manualResolution: "Review failure modes manually before stress board closure.",
      blocksStressBoard: context.failureModeCount >= 6,
    });
  }

  if (context.fragilitySignalCount > 0) {
    risks.push({
      id: "ASST_RISK_002",
      label: "Fragility signals remain high",
      lane: "fragility-map",
      severity: context.fragilitySignalCount >= 6 ? "critical" : "elevated",
      reason: `${context.fragilitySignalCount} fragility signals require explicit language.`,
      manualResolution: "Document fragility explicitly in stress pack.",
      blocksStressBoard: context.fragilitySignalCount >= 7,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `ASST_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksStressBoard: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `ASST_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Stress gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksStressBoard: gate.severity === "critical" || gate.score < 60,
      });
    });

  holds
    .filter((item) => item.blocksStressClosure)
    .forEach((item, index) => {
      risks.push({
        id: `ASST_HOLD_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.holdReason,
        manualResolution: item.manualResolution,
        blocksStressBoard: true,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `ASST_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Stress signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksStressBoard: true,
      });
    });

  return risks;
}

export function buildAiAgronomicScenarioStressTestReport(
  input: AgronomicScenarioStressInput = {},
): AgronomicScenarioStressReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const scenarioStressCases = buildScenarioStressCases(context);
  const failureModeSandbox = buildFailureModeSandbox(context);
  const fragilityMap = buildFragilityMap(context);
  const contingencyHolds = buildContingencyHolds(context);
  const nonExecutionEnvelope = buildNonExecutionEnvelope();
  const stressGateMatrix = buildStressGateMatrix(context, sourceNodes);
  const resilienceStrategyPack = buildResilienceStrategyPack(context);
  const auditReplay = buildAuditReplay(context);
  const stressSignoff = buildStressSignoff(context, stressGateMatrix);
  const stressRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    stressGateMatrix,
    contingencyHolds,
    stressSignoff,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const scenarioAverage =
    scenarioStressCases.reduce((sum, item) => sum + item.stressScore, 0) /
    Math.max(1, scenarioStressCases.length);

  const failureAverage =
    failureModeSandbox.reduce((sum, item) => sum + (100 - item.failurePressureScore), 0) /
    Math.max(1, failureModeSandbox.length);

  const gateAverage =
    stressGateMatrix.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, stressGateMatrix.length);

  const riskPenalty = stressRiskRegister.filter((item) => item.blocksStressBoard).length * 10;
  const failurePressure =
    failureModeSandbox.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, failureModeSandbox.length * 3);

  const stressTestScore = clampScore(
    sourceAverage / 4 +
      scenarioAverage / 4 +
      failureAverage / 4 +
      gateAverage / 4 +
      failurePressure -
      riskPenalty -
      context.failureModeCount -
      context.fragilitySignalCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.stressScenarioCount * 3 +
        context.failureModeCount * 8 +
        context.fragilitySignalCount * 8 +
        context.contingencyHoldCount * 8 +
        context.unresolvedStressQuestionCount * 6,
    ),
  );

  const stressTestStatus = bandFromScore(
    stressTestScore,
    stressRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_SCENARIO_STRESS_READINESS,
    stressTestScore,
    stressTestStatus,
    overallSeverity,
    sourceNodes,
    scenarioStressCases,
    failureModeSandbox,
    fragilityMap,
    contingencyHolds,
    nonExecutionEnvelope,
    stressGateMatrix,
    resilienceStrategyPack,
    auditReplay,
    stressSignoff,
    stressRiskRegister,
    redactedExportBundle: {
      exportId: "agronomic_scenario_stress_test_v14_1_redacted_dry_run",
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
        "scenario stress cases",
        "failure mode sandbox",
        "fragility map",
        "contingency holds",
        "non-execution envelope",
        "stress gate matrix",
        "resilience strategy pack",
        "audit replay",
        "stress signoff",
        "stress risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Agronomic scenario stress test is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Failure modes, fragility map and resilience pack are review concepts only.",
      "Every stress-test conclusion remains behind human review, non-execution envelope and manual signoff.",
    ],
  };
}

export const aiAgronomicScenarioStressTestVersion = "V14.1";
