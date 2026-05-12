export type AgronomicGovernanceFreezeMode = "dry-run" | "governance-board-review";

export type AgronomicGovernanceSeverity = "info" | "watch" | "elevated" | "critical";

export type AgronomicGovernancePriority = "low" | "medium" | "high" | "urgent";

export type AgronomicGovernanceReadinessBand =
  | "blocked"
  | "simulation-ready"
  | "review-ready"
  | "governance-freeze-ready";

export type AgronomicGovernanceLane =
  | "governance-freeze"
  | "signoff-registry"
  | "actionability-trap"
  | "scenario-closure"
  | "decision-boundary"
  | "non-execution"
  | "audit-replay"
  | "human-signoff";

export interface AgronomicGovernanceFreezeGuardrail {
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
  governanceFreezeReady: true;
  signoffRegistryReady: true;
  actionabilityTrapBoardReady: true;
  humanGovernanceSignoffReady: true;
}

export interface AgronomicGovernanceFreezeInput {
  governanceItemCount?: number;
  openSignoffCount?: number;
  actionabilityTrapCount?: number;
  unresolvedClosureQuestionCount?: number;
  decisionBoundaryGapCount?: number;
  decisionSimulationScore?: number;
  scenarioStressScore?: number;
  portfolioComparatorScore?: number;
  sensitivityRobustnessScore?: number;
  evidenceIntegrityScore?: number;
  qualityAssuranceScore?: number;
  complianceAttestationScore?: number;
  governanceRubricScore?: number;
  reviewerConfidenceScore?: number;
  governanceLeadRole?: string;
}

export interface AgronomicGovernanceSourceNode {
  id: string;
  lane: AgronomicGovernanceLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: AgronomicGovernanceSeverity;
  priority: AgronomicGovernancePriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface GovernanceFreezeItem {
  id: string;
  label: string;
  lane: AgronomicGovernanceLane;
  freezeScore: number;
  severity: AgronomicGovernanceSeverity;
  freezeQuestion: string;
  boardUse: string;
  blockedOutcome: string;
}

export interface SignoffRegistryItem {
  id: string;
  label: string;
  lane: AgronomicGovernanceLane;
  ownerRole: string;
  signoffState: "open" | "held" | "ready-for-manual-note";
  signoffScore: number;
  severity: AgronomicGovernanceSeverity;
  requiredEvidence: string[];
}

export interface ActionabilityTrapItem {
  id: string;
  label: string;
  lane: AgronomicGovernanceLane;
  trapScore: number;
  priority: AgronomicGovernancePriority;
  trapQuestion: string;
  reviewerAction: string;
  blockedOutcome: string;
}

export interface ScenarioClosureItem {
  id: string;
  label: string;
  lane: AgronomicGovernanceLane;
  closureScore: number;
  severity: AgronomicGovernanceSeverity;
  closureReason: string;
  manualResolution: string;
}

export interface DecisionBoundaryItem {
  id: string;
  label: string;
  lane: AgronomicGovernanceLane;
  boundaryScore: number;
  severity: AgronomicGovernanceSeverity;
  boundaryReason: string;
  reviewerAction: string;
  blocksClosure: boolean;
}

export interface NonExecutionCertificateItem {
  id: string;
  label: string;
  lane: AgronomicGovernanceLane;
  freezeEnforced: true;
  severity: AgronomicGovernanceSeverity;
  certificateReason: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface GovernanceGateItem {
  id: string;
  label: string;
  lane: AgronomicGovernanceLane;
  passed: boolean;
  score: number;
  severity: AgronomicGovernanceSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface GovernanceBoardPackItem {
  id: string;
  label: string;
  lane: AgronomicGovernanceLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface GovernanceAuditReplayItem {
  id: string;
  label: string;
  lane: AgronomicGovernanceLane;
  replayReady: boolean;
  replayScore: number;
  severity: AgronomicGovernanceSeverity;
  replayQuestion: string;
  manualResolution: string;
}

export interface GovernanceSignoffItem {
  id: string;
  label: string;
  lane: AgronomicGovernanceLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface GovernanceRiskItem {
  id: string;
  label: string;
  lane: AgronomicGovernanceLane;
  severity: AgronomicGovernanceSeverity;
  reason: string;
  manualResolution: string;
  blocksGovernanceBoard: boolean;
}

export interface AgronomicGovernanceFreezeReport {
  generatedAt: string;
  mode: AgronomicGovernanceFreezeMode;
  context: Required<AgronomicGovernanceFreezeInput>;
  readiness: AgronomicGovernanceFreezeGuardrail;
  governanceScore: number;
  governanceStatus: AgronomicGovernanceReadinessBand;
  overallSeverity: AgronomicGovernanceSeverity;
  sourceNodes: AgronomicGovernanceSourceNode[];
  governanceFreezeBoard: GovernanceFreezeItem[];
  signoffRegistry: SignoffRegistryItem[];
  actionabilityTrapBoard: ActionabilityTrapItem[];
  scenarioClosureMap: ScenarioClosureItem[];
  decisionBoundaryLedger: DecisionBoundaryItem[];
  nonExecutionCertificate: NonExecutionCertificateItem[];
  governanceGateMatrix: GovernanceGateItem[];
  governanceBoardPack: GovernanceBoardPackItem[];
  auditReplay: GovernanceAuditReplayItem[];
  governanceSignoff: GovernanceSignoffItem[];
  governanceRiskRegister: GovernanceRiskItem[];
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

export const AGRONOMIC_GOVERNANCE_FREEZE_READINESS: AgronomicGovernanceFreezeGuardrail = {
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
  governanceFreezeReady: true,
  signoffRegistryReady: true,
  actionabilityTrapBoardReady: true,
  humanGovernanceSignoffReady: true,
};

const priorityWeight: Record<AgronomicGovernancePriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: AgronomicGovernanceFreezeInput): Required<AgronomicGovernanceFreezeInput> {
  return {
    governanceItemCount: input.governanceItemCount ?? 18,
    openSignoffCount: input.openSignoffCount ?? 5,
    actionabilityTrapCount: input.actionabilityTrapCount ?? 6,
    unresolvedClosureQuestionCount: input.unresolvedClosureQuestionCount ?? 5,
    decisionBoundaryGapCount: input.decisionBoundaryGapCount ?? 5,
    decisionSimulationScore: input.decisionSimulationScore ?? 72,
    scenarioStressScore: input.scenarioStressScore ?? 71,
    portfolioComparatorScore: input.portfolioComparatorScore ?? 71,
    sensitivityRobustnessScore: input.sensitivityRobustnessScore ?? 71,
    evidenceIntegrityScore: input.evidenceIntegrityScore ?? 73,
    qualityAssuranceScore: input.qualityAssuranceScore ?? 72,
    complianceAttestationScore: input.complianceAttestationScore ?? 72,
    governanceRubricScore: input.governanceRubricScore ?? 71,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    governanceLeadRole: input.governanceLeadRole ?? "agronomic governance board lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): AgronomicGovernanceSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: AgronomicGovernanceSeverity): AgronomicGovernancePriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): AgronomicGovernanceReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "governance-freeze-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: AgronomicGovernanceLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): AgronomicGovernanceSourceNode {
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
            "Agronomic governance freeze is below board threshold.",
            "Governance board must resolve signoff gaps, actionability traps and decision boundary gaps.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<AgronomicGovernanceFreezeInput>): AgronomicGovernanceSourceNode[] {
  const signoffPressure = context.openSignoffCount * 4;
  const trapPressure = context.actionabilityTrapCount * 4;
  const closurePressure = context.unresolvedClosureQuestionCount * 4;
  const boundaryPressure = context.decisionBoundaryGapCount * 5;

  return [
    buildSourceNode(
      "AGF_NODE_001",
      "scenario-closure",
      "Decision simulation input",
      "V14.0",
      context.decisionSimulationScore,
      context.reviewerConfidenceScore,
      closurePressure,
      "Close V14.0 simulation language without allowing actionability.",
    ),
    buildSourceNode(
      "AGF_NODE_002",
      "actionability-trap",
      "Scenario stress input",
      "V14.1",
      context.scenarioStressScore,
      context.reviewerConfidenceScore,
      trapPressure,
      "Catch any stress-test wording that could be misread as operational.",
    ),
    buildSourceNode(
      "AGF_NODE_003",
      "decision-boundary",
      "Portfolio comparator input",
      "V14.2",
      context.portfolioComparatorScore,
      context.reviewerConfidenceScore,
      boundaryPressure,
      "Freeze portfolio comparison as a board-only view.",
    ),
    buildSourceNode(
      "AGF_NODE_004",
      "decision-boundary",
      "Sensitivity robustness input",
      "V14.3",
      context.sensitivityRobustnessScore,
      context.reviewerConfidenceScore,
      boundaryPressure + closurePressure / 2,
      "Carry robustness boundaries into governance freeze.",
    ),
    buildSourceNode(
      "AGF_NODE_005",
      "audit-replay",
      "Evidence integrity input",
      "V13.2",
      context.evidenceIntegrityScore,
      context.reviewerConfidenceScore,
      signoffPressure,
      "Replay evidence integrity before governance freeze.",
    ),
    buildSourceNode(
      "AGF_NODE_006",
      "governance-freeze",
      "QA and compliance input",
      "V13.5-V13.6",
      (context.qualityAssuranceScore + context.complianceAttestationScore) / 2,
      context.governanceRubricScore,
      trapPressure,
      "Confirm QA and compliance remain embedded in freeze board.",
    ),
    buildSourceNode(
      "AGF_NODE_007",
      "signoff-registry",
      "Strategy signoff registry",
      "V14.4",
      context.governanceRubricScore,
      context.reviewerConfidenceScore,
      signoffPressure,
      "Map human signoff gaps and board owners.",
    ),
    buildSourceNode(
      "AGF_NODE_008",
      "human-signoff",
      "Governance board signoff",
      "V14.4",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      closurePressure,
      "Confirm governance signoff remains manual.",
    ),
  ];
}

function buildGovernanceFreezeBoard(context: Required<AgronomicGovernanceFreezeInput>): GovernanceFreezeItem[] {
  return [
    {
      id: "AGF_FREEZE_001",
      label: "Strategy language freeze",
      lane: "governance-freeze",
      freezeScore: clampScore(context.governanceRubricScore - context.unresolvedClosureQuestionCount * 3),
      severity: severityFromConcern(context.unresolvedClosureQuestionCount * 11),
      freezeQuestion: "Is every strategy statement framed as board-only simulation?",
      boardUse: "Internal governance freeze note only.",
      blockedOutcome: "No strategy recommendation, approval, task or dispatch.",
    },
    {
      id: "AGF_FREEZE_002",
      label: "Portfolio ranking freeze",
      lane: "governance-freeze",
      freezeScore: clampScore(context.portfolioComparatorScore - context.decisionBoundaryGapCount * 3),
      severity: severityFromConcern(context.decisionBoundaryGapCount * 12),
      freezeQuestion: "Is portfolio ranking clearly non-final and non-operational?",
      boardUse: "Manual portfolio freeze note only.",
      blockedOutcome: "No selected option or operational portfolio.",
    },
    {
      id: "AGF_FREEZE_003",
      label: "Robustness conclusion freeze",
      lane: "governance-freeze",
      freezeScore: clampScore(context.sensitivityRobustnessScore - context.actionabilityTrapCount * 2),
      severity: severityFromConcern(context.actionabilityTrapCount * 10),
      freezeQuestion: "Can robustness wording be read without implying action?",
      boardUse: "Robustness caveat note only.",
      blockedOutcome: "No formal agronomic conclusion or field action.",
    },
  ];
}

function buildSignoffRegistry(context: Required<AgronomicGovernanceFreezeInput>): SignoffRegistryItem[] {
  return [
    {
      id: "AGF_SIGNOFF_REG_001",
      label: "Simulation board owner",
      lane: "signoff-registry",
      ownerRole: "decision simulation reviewer",
      signoffState: context.openSignoffCount >= 5 ? "held" : "ready-for-manual-note",
      signoffScore: clampScore(context.decisionSimulationScore - context.openSignoffCount * 3),
      severity: severityFromConcern(context.openSignoffCount * 10),
      requiredEvidence: ["decision simulation board", "strategy gates", "non-execution certificate"],
    },
    {
      id: "AGF_SIGNOFF_REG_002",
      label: "Stress and robustness owner",
      lane: "signoff-registry",
      ownerRole: "stress and robustness reviewer",
      signoffState: context.actionabilityTrapCount >= 6 ? "held" : "ready-for-manual-note",
      signoffScore: clampScore((context.scenarioStressScore + context.sensitivityRobustnessScore) / 2),
      severity: severityFromConcern(context.actionabilityTrapCount * 10),
      requiredEvidence: ["stress test", "robustness boundaries", "actionability trap board"],
    },
    {
      id: "AGF_SIGNOFF_REG_003",
      label: "Governance freeze owner",
      lane: "signoff-registry",
      ownerRole: context.governanceLeadRole,
      signoffState: context.decisionBoundaryGapCount >= 5 ? "held" : "ready-for-manual-note",
      signoffScore: clampScore(context.governanceRubricScore - context.decisionBoundaryGapCount * 3),
      severity: severityFromConcern(context.decisionBoundaryGapCount * 12),
      requiredEvidence: ["governance freeze board", "decision boundary ledger", "audit replay"],
    },
  ];
}

function buildActionabilityTrapBoard(context: Required<AgronomicGovernanceFreezeInput>): ActionabilityTrapItem[] {
  return [
    {
      id: "AGF_TRAP_001",
      label: "Recommendation wording trap",
      lane: "actionability-trap",
      trapScore: clampScore(context.actionabilityTrapCount * 14),
      priority: context.actionabilityTrapCount >= 6 ? "urgent" : "high",
      trapQuestion: "Could any strategy text be read as an instruction?",
      reviewerAction: "Rewrite as non-actionable board language.",
      blockedOutcome: "No recommendation or dispatch.",
    },
    {
      id: "AGF_TRAP_002",
      label: "Portfolio choice trap",
      lane: "actionability-trap",
      trapScore: clampScore(context.decisionBoundaryGapCount * 14),
      priority: context.decisionBoundaryGapCount >= 5 ? "urgent" : "high",
      trapQuestion: "Could any portfolio comparison be read as a selected option?",
      reviewerAction: "Keep all rankings provisional.",
      blockedOutcome: "No selected plan or work order.",
    },
    {
      id: "AGF_TRAP_003",
      label: "Follow-up implication trap",
      lane: "actionability-trap",
      trapScore: clampScore(context.openSignoffCount * 13),
      priority: "urgent",
      trapQuestion: "Could any closure statement imply follow-up work?",
      reviewerAction: "Keep follow-up implications out of the packet.",
      blockedOutcome: "No task, intervention, product, dosage or forecast.",
    },
  ];
}

function buildScenarioClosureMap(context: Required<AgronomicGovernanceFreezeInput>): ScenarioClosureItem[] {
  return [
    {
      id: "AGF_CLOSURE_001",
      label: "Decision simulation closure",
      lane: "scenario-closure",
      closureScore: clampScore(context.decisionSimulationScore - context.unresolvedClosureQuestionCount * 3),
      severity: severityFromConcern(context.unresolvedClosureQuestionCount * 10),
      closureReason: "Decision simulation can close only as a non-executive board note.",
      manualResolution: "Keep simulation closure manual and redacted.",
    },
    {
      id: "AGF_CLOSURE_002",
      label: "Stress and robustness closure",
      lane: "scenario-closure",
      closureScore: clampScore((context.scenarioStressScore + context.sensitivityRobustnessScore) / 2 - context.actionabilityTrapCount * 2),
      severity: severityFromConcern(context.actionabilityTrapCount * 10),
      closureReason: "Stress and robustness results must close with caveats.",
      manualResolution: "Carry forward caveats into governance pack.",
    },
    {
      id: "AGF_CLOSURE_003",
      label: "Portfolio comparator closure",
      lane: "scenario-closure",
      closureScore: clampScore(context.portfolioComparatorScore - context.decisionBoundaryGapCount * 3),
      severity: severityFromConcern(context.decisionBoundaryGapCount * 12),
      closureReason: "Portfolio comparison must close without option selection.",
      manualResolution: "Keep all options non-final.",
    },
  ];
}

function buildDecisionBoundaryLedger(context: Required<AgronomicGovernanceFreezeInput>): DecisionBoundaryItem[] {
  return [
    {
      id: "AGF_BOUNDARY_001",
      label: "Simulation boundary",
      lane: "decision-boundary",
      boundaryScore: clampScore(context.decisionSimulationScore - context.unresolvedClosureQuestionCount * 3),
      severity: severityFromConcern(context.unresolvedClosureQuestionCount * 10),
      boundaryReason: "Simulation output cannot become a recommendation.",
      reviewerAction: "Retain board-only caveat.",
      blocksClosure: context.unresolvedClosureQuestionCount >= 6,
    },
    {
      id: "AGF_BOUNDARY_002",
      label: "Portfolio boundary",
      lane: "decision-boundary",
      boundaryScore: clampScore(context.portfolioComparatorScore - context.decisionBoundaryGapCount * 4),
      severity: severityFromConcern(context.decisionBoundaryGapCount * 12),
      boundaryReason: "Portfolio comparison cannot become option selection.",
      reviewerAction: "Hold selection language.",
      blocksClosure: context.decisionBoundaryGapCount >= 5,
    },
    {
      id: "AGF_BOUNDARY_003",
      label: "Execution boundary",
      lane: "non-execution",
      boundaryScore: 100,
      severity: "critical",
      boundaryReason: "Execution boundary blocks every operational path.",
      reviewerAction: "Keep non-execution certificate active.",
      blocksClosure: false,
    },
  ];
}

function buildNonExecutionCertificate(): NonExecutionCertificateItem[] {
  return [
    {
      id: "AGF_NON_EXEC_001",
      label: "Provider output freeze",
      lane: "non-execution",
      freezeEnforced: true,
      severity: "critical",
      certificateReason: "Governance freeze cannot call or use provider output.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "AGF_NON_EXEC_002",
      label: "Operational action freeze",
      lane: "non-execution",
      freezeEnforced: true,
      severity: "critical",
      certificateReason: "Governance freeze cannot create or dispatch agronomic work.",
      blockedOutcome: "No task, intervention, scheduling or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "AGF_NON_EXEC_003",
      label: "Prescriptive output freeze",
      lane: "non-execution",
      freezeEnforced: true,
      severity: "critical",
      certificateReason: "Governance freeze cannot generate product, dosage or production guidance.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildGovernanceGateMatrix(
  context: Required<AgronomicGovernanceFreezeInput>,
  sourceNodes: AgronomicGovernanceSourceNode[],
): GovernanceGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "AGF_GATE_001",
      label: "Governance freeze language is controlled",
      lane: "governance-freeze" as AgronomicGovernanceLane,
      score: context.governanceRubricScore - context.unresolvedClosureQuestionCount * 4,
      reviewer: "governance reviewer",
      requiredEvidence: ["governance freeze board", "scenario closure map", "signoff registry"],
      hardStop: "Do not close governance if closure wording may imply action.",
    },
    {
      id: "AGF_GATE_002",
      label: "Signoff registry is complete enough",
      lane: "signoff-registry" as AgronomicGovernanceLane,
      score: context.reviewerConfidenceScore - context.openSignoffCount * 4,
      reviewer: context.governanceLeadRole,
      requiredEvidence: ["signoff registry", "owner roles", "board pack"],
      hardStop: "Do not close governance with unresolved signoff owners.",
    },
    {
      id: "AGF_GATE_003",
      label: "Actionability traps are controlled",
      lane: "actionability-trap" as AgronomicGovernanceLane,
      score: 100 - context.actionabilityTrapCount * 11,
      reviewer: "actionability reviewer",
      requiredEvidence: ["actionability trap board", "non-execution certificate"],
      hardStop: "Do not close governance while actionability traps remain.",
    },
    {
      id: "AGF_GATE_004",
      label: "Decision boundaries are explicit",
      lane: "decision-boundary" as AgronomicGovernanceLane,
      score: 100 - context.decisionBoundaryGapCount * 10,
      reviewer: "decision boundary reviewer",
      requiredEvidence: ["decision boundary ledger", "portfolio comparator", "robustness board"],
      hardStop: "Do not close governance without explicit decision boundaries.",
    },
    {
      id: "AGF_GATE_005",
      label: "Non-execution certificate is enforced",
      lane: "non-execution" as AgronomicGovernanceLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-execution certificate", "guardrails"],
      hardStop: "No operational output is allowed.",
    },
    {
      id: "AGF_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "human-signoff" as AgronomicGovernanceLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before governance-freeze-ready state.",
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

function buildGovernanceBoardPack(context: Required<AgronomicGovernanceFreezeInput>): GovernanceBoardPackItem[] {
  return [
    {
      id: "AGF_PACK_001",
      label: "Governance freeze packet",
      lane: "governance-freeze",
      packReady: context.governanceRubricScore >= 70,
      readinessScore: clampScore(context.governanceRubricScore),
      reviewerCheck: "Confirm governance packet contains only board freeze language.",
      includedSections: ["governance freeze board", "scenario closure map", "decision boundaries"],
      blockedSections: ["operational instruction", "field dispatch", "provider material"],
    },
    {
      id: "AGF_PACK_002",
      label: "Signoff registry packet",
      lane: "signoff-registry",
      packReady: context.openSignoffCount <= 5,
      readinessScore: clampScore(100 - context.openSignoffCount * 10),
      reviewerCheck: "Confirm signoff registry is owner-mapped and manual.",
      includedSections: ["signoff registry", "owner roles", "manual notes"],
      blockedSections: ["stored approval", "automatic approval", "execution path"],
    },
    {
      id: "AGF_PACK_003",
      label: "Governance non-execution packet",
      lane: "non-execution",
      packReady: true,
      readinessScore: 100,
      reviewerCheck: "Confirm non-execution certificate blocks all actionability.",
      includedSections: ["non-execution certificate", "actionability traps", "guardrails"],
      blockedSections: ["task creation", "intervention creation", "product or dosage output"],
    },
  ];
}

function buildAuditReplay(context: Required<AgronomicGovernanceFreezeInput>): GovernanceAuditReplayItem[] {
  return [
    {
      id: "AGF_REPLAY_001",
      label: "Decision simulation and stress replay",
      lane: "audit-replay",
      replayReady: context.decisionSimulationScore >= 70 && context.scenarioStressScore >= 70,
      replayScore: clampScore((context.decisionSimulationScore + context.scenarioStressScore) / 2),
      severity: severityFromConcern(100 - context.scenarioStressScore + context.unresolvedClosureQuestionCount * 4),
      replayQuestion: "Can V14.0 and V14.1 be replayed for governance freeze context?",
      manualResolution: "Attach simulation and stress replay note.",
    },
    {
      id: "AGF_REPLAY_002",
      label: "Portfolio and robustness replay",
      lane: "audit-replay",
      replayReady: context.portfolioComparatorScore >= 70 && context.sensitivityRobustnessScore >= 70,
      replayScore: clampScore((context.portfolioComparatorScore + context.sensitivityRobustnessScore) / 2),
      severity: severityFromConcern(100 - context.sensitivityRobustnessScore + context.decisionBoundaryGapCount * 4),
      replayQuestion: "Can V14.2 and V14.3 be replayed for decision boundary closure?",
      manualResolution: "Attach portfolio and robustness replay note.",
    },
    {
      id: "AGF_REPLAY_003",
      label: "QA and compliance replay",
      lane: "audit-replay",
      replayReady: context.qualityAssuranceScore >= 70 && context.complianceAttestationScore >= 70,
      replayScore: clampScore((context.qualityAssuranceScore + context.complianceAttestationScore) / 2),
      severity: severityFromConcern(100 - context.complianceAttestationScore + context.actionabilityTrapCount * 5),
      replayQuestion: "Can QA and compliance be replayed for non-execution assurance?",
      manualResolution: "Attach QA and compliance replay note.",
    },
  ];
}

function buildGovernanceSignoff(
  context: Required<AgronomicGovernanceFreezeInput>,
  gates: GovernanceGateItem[],
): GovernanceSignoffItem[] {
  return [
    {
      id: "AGF_SIGNOFF_001",
      label: "Governance freeze signoff",
      lane: "human-signoff",
      signoffReady: context.unresolvedClosureQuestionCount < 6,
      reviewer: "governance reviewer",
      requiredEvidence: ["governance freeze board", "scenario closure map"],
      safeOutcome: "Manual governance freeze signoff only.",
    },
    {
      id: "AGF_SIGNOFF_002",
      label: "Non-execution signoff",
      lane: "human-signoff",
      signoffReady: true,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-execution certificate", "actionability trap board", "guardrails"],
      safeOutcome: "Manual non-execution signoff only.",
    },
    {
      id: "AGF_SIGNOFF_003",
      label: "Final governance board signoff",
      lane: "human-signoff",
      signoffReady: gates.every((gate) => gate.passed),
      reviewer: context.governanceLeadRole,
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual governance board signoff packet only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<AgronomicGovernanceFreezeInput>,
  sourceNodes: AgronomicGovernanceSourceNode[],
  gates: GovernanceGateItem[],
  traps: ActionabilityTrapItem[],
  boundaries: DecisionBoundaryItem[],
  signoff: GovernanceSignoffItem[],
): GovernanceRiskItem[] {
  const risks: GovernanceRiskItem[] = [];

  if (context.openSignoffCount > 0) {
    risks.push({
      id: "AGF_RISK_001",
      label: "Open signoff items",
      lane: "signoff-registry",
      severity: context.openSignoffCount >= 5 ? "critical" : "elevated",
      reason: `${context.openSignoffCount} signoff items remain open.`,
      manualResolution: "Resolve signoff owner notes manually.",
      blocksGovernanceBoard: context.openSignoffCount >= 6,
    });
  }

  if (context.actionabilityTrapCount > 0) {
    risks.push({
      id: "AGF_RISK_002",
      label: "Actionability traps remain",
      lane: "actionability-trap",
      severity: context.actionabilityTrapCount >= 6 ? "critical" : "elevated",
      reason: `${context.actionabilityTrapCount} actionability traps require review.`,
      manualResolution: "Rewrite or hold actionability-prone wording.",
      blocksGovernanceBoard: context.actionabilityTrapCount >= 6,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `AGF_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksGovernanceBoard: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `AGF_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Governance gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksGovernanceBoard: gate.severity === "critical" || gate.score < 60,
      });
    });

  traps
    .filter((item) => item.priority === "urgent")
    .forEach((item, index) => {
      risks.push({
        id: `AGF_TRAP_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "critical",
        reason: item.trapQuestion,
        manualResolution: item.reviewerAction,
        blocksGovernanceBoard: true,
      });
    });

  boundaries
    .filter((item) => item.blocksClosure)
    .forEach((item, index) => {
      risks.push({
        id: `AGF_BOUNDARY_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.boundaryReason,
        manualResolution: item.reviewerAction,
        blocksGovernanceBoard: true,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `AGF_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Governance signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksGovernanceBoard: true,
      });
    });

  return risks;
}

export function buildAiAgronomicGovernanceFreezeReport(
  input: AgronomicGovernanceFreezeInput = {},
): AgronomicGovernanceFreezeReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const governanceFreezeBoard = buildGovernanceFreezeBoard(context);
  const signoffRegistry = buildSignoffRegistry(context);
  const actionabilityTrapBoard = buildActionabilityTrapBoard(context);
  const scenarioClosureMap = buildScenarioClosureMap(context);
  const decisionBoundaryLedger = buildDecisionBoundaryLedger(context);
  const nonExecutionCertificate = buildNonExecutionCertificate();
  const governanceGateMatrix = buildGovernanceGateMatrix(context, sourceNodes);
  const governanceBoardPack = buildGovernanceBoardPack(context);
  const auditReplay = buildAuditReplay(context);
  const governanceSignoff = buildGovernanceSignoff(context, governanceGateMatrix);
  const governanceRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    governanceGateMatrix,
    actionabilityTrapBoard,
    decisionBoundaryLedger,
    governanceSignoff,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const freezeAverage =
    governanceFreezeBoard.reduce((sum, item) => sum + item.freezeScore, 0) /
    Math.max(1, governanceFreezeBoard.length);

  const signoffAverage =
    signoffRegistry.reduce((sum, item) => sum + item.signoffScore, 0) /
    Math.max(1, signoffRegistry.length);

  const gateAverage =
    governanceGateMatrix.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, governanceGateMatrix.length);

  const riskPenalty = governanceRiskRegister.filter((item) => item.blocksGovernanceBoard).length * 10;
  const trapPressure =
    actionabilityTrapBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, actionabilityTrapBoard.length * 3);

  const governanceScore = clampScore(
    sourceAverage / 4 +
      freezeAverage / 4 +
      signoffAverage / 4 +
      gateAverage / 4 +
      trapPressure -
      riskPenalty -
      context.openSignoffCount -
      context.actionabilityTrapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.governanceItemCount * 3 +
        context.openSignoffCount * 8 +
        context.actionabilityTrapCount * 8 +
        context.unresolvedClosureQuestionCount * 7 +
        context.decisionBoundaryGapCount * 8,
    ),
  );

  const governanceStatus = bandFromScore(
    governanceScore,
    governanceRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_GOVERNANCE_FREEZE_READINESS,
    governanceScore,
    governanceStatus,
    overallSeverity,
    sourceNodes,
    governanceFreezeBoard,
    signoffRegistry,
    actionabilityTrapBoard,
    scenarioClosureMap,
    decisionBoundaryLedger,
    nonExecutionCertificate,
    governanceGateMatrix,
    governanceBoardPack,
    auditReplay,
    governanceSignoff,
    governanceRiskRegister,
    redactedExportBundle: {
      exportId: "agronomic_governance_freeze_v14_4_redacted_dry_run",
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
        "governance freeze board",
        "signoff registry",
        "actionability trap board",
        "scenario closure map",
        "decision boundary ledger",
        "non-execution certificate",
        "governance gate matrix",
        "governance board pack",
        "audit replay",
        "governance signoff",
        "governance risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Agronomic governance freeze is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Governance freeze, signoff registry and actionability trap board are review concepts only.",
      "Every governance conclusion remains behind human review, non-execution certificate and manual signoff.",
    ],
  };
}

export const aiAgronomicGovernanceFreezeVersion = "V14.4";
