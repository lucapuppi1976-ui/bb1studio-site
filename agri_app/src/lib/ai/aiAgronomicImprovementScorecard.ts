export type ImprovementScorecardMode = "dry-run" | "continuous-improvement-review";

export type ImprovementSeverity = "info" | "watch" | "elevated" | "critical";

export type ImprovementPriority = "low" | "medium" | "high" | "urgent";

export type ImprovementReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "improvement-ready";

export type ImprovementLane =
  | "resilience"
  | "evidence"
  | "governance"
  | "field-ops"
  | "quality"
  | "review-cadence"
  | "maturity-model"
  | "roadmap";

export interface AgronomicImprovementScorecardGuardrail {
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
  improvementScorecardReady: true;
  resilienceScorecardReady: true;
  roadmapReviewReady: true;
  maturityModelReady: true;
}

export interface AgronomicImprovementScorecardInput {
  activeCaseCount?: number;
  openImprovementItemCount?: number;
  unresolvedEvidenceGapCount?: number;
  unresolvedReviewItemCount?: number;
  controlTowerScore?: number;
  explainabilityLedgerScore?: number;
  compliancePassportScore?: number;
  decisionAssuranceScore?: number;
  scenarioStressScore?: number;
  evidenceQualityScore?: number;
  governanceScore?: number;
  fieldOpsScore?: number;
  qualityScore?: number;
  reviewerConfidenceScore?: number;
  reviewerRole?: string;
}

export interface ImprovementSourceNode {
  id: string;
  lane: ImprovementLane;
  title: string;
  sourceVersion: string;
  currentScore: number;
  maturityScore: number;
  severity: ImprovementSeverity;
  priority: ImprovementPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ResilienceScorecardItem {
  id: string;
  lane: ImprovementLane;
  label: string;
  currentScore: number;
  targetScore: number;
  gapScore: number;
  severity: ImprovementSeverity;
  reviewerQuestion: string;
}

export interface ImprovementBacklogItem {
  id: string;
  title: string;
  lane: ImprovementLane;
  priority: ImprovementPriority;
  status: "blocked" | "review-only" | "ready-for-review";
  linkedSourceIds: string[];
  improvementHypothesis: string;
  manualReviewAction: string;
  blockedAction: string;
  evidenceNeeded: string[];
}

export interface MaturityModelStage {
  id: string;
  label: string;
  lane: ImprovementLane;
  currentLevel: 1 | 2 | 3 | 4 | 5;
  targetLevel: 1 | 2 | 3 | 4 | 5;
  gapExplanation: string;
  reviewerAction: string;
}

export interface ReviewCadenceItem {
  id: string;
  title: string;
  cadence: "weekly" | "biweekly" | "monthly" | "quarterly";
  priority: ImprovementPriority;
  reviewer: string;
  reviewQuestion: string;
  safeOutcome: string;
}

export interface RoadmapScenario {
  id: string;
  title: string;
  horizon: "near" | "mid" | "long";
  priority: ImprovementPriority;
  linkedBacklogIds: string[];
  expectedResilienceProxy: number;
  governanceLoadProxy: number;
  manualDecisionPoint: string;
  blockedOutcome: string;
}

export interface ImprovementGap {
  id: string;
  label: string;
  lane: ImprovementLane;
  severity: ImprovementSeverity;
  reason: string;
  manualResolution: string;
}

export interface AgronomicImprovementScorecardReport {
  generatedAt: string;
  mode: ImprovementScorecardMode;
  context: Required<AgronomicImprovementScorecardInput>;
  readiness: AgronomicImprovementScorecardGuardrail;
  improvementScore: number;
  improvementStatus: ImprovementReadinessBand;
  overallSeverity: ImprovementSeverity;
  sourceNodes: ImprovementSourceNode[];
  resilienceScorecard: ResilienceScorecardItem[];
  improvementBacklog: ImprovementBacklogItem[];
  maturityModel: MaturityModelStage[];
  reviewCadence: ReviewCadenceItem[];
  roadmapScenarios: RoadmapScenario[];
  improvementGaps: ImprovementGap[];
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

export const AGRONOMIC_IMPROVEMENT_SCORECARD_READINESS: AgronomicImprovementScorecardGuardrail = {
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
  improvementScorecardReady: true,
  resilienceScorecardReady: true,
  roadmapReviewReady: true,
  maturityModelReady: true,
};

const severityWeight: Record<ImprovementSeverity, number> = {
  info: 4,
  watch: 11,
  elevated: 21,
  critical: 34,
};

const priorityWeight: Record<ImprovementPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: AgronomicImprovementScorecardInput): Required<AgronomicImprovementScorecardInput> {
  return {
    activeCaseCount: input.activeCaseCount ?? 9,
    openImprovementItemCount: input.openImprovementItemCount ?? 7,
    unresolvedEvidenceGapCount: input.unresolvedEvidenceGapCount ?? 6,
    unresolvedReviewItemCount: input.unresolvedReviewItemCount ?? 5,
    controlTowerScore: input.controlTowerScore ?? 72,
    explainabilityLedgerScore: input.explainabilityLedgerScore ?? 74,
    compliancePassportScore: input.compliancePassportScore ?? 70,
    decisionAssuranceScore: input.decisionAssuranceScore ?? 68,
    scenarioStressScore: input.scenarioStressScore ?? 67,
    evidenceQualityScore: input.evidenceQualityScore ?? 69,
    governanceScore: input.governanceScore ?? 73,
    fieldOpsScore: input.fieldOpsScore ?? 71,
    qualityScore: input.qualityScore ?? 72,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 73,
    reviewerRole: input.reviewerRole ?? "continuous improvement reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ImprovementSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ImprovementSeverity): ImprovementPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ImprovementReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "improvement-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function levelFromScore(score: number): 1 | 2 | 3 | 4 | 5 {
  if (score >= 86) return 5;
  if (score >= 74) return 4;
  if (score >= 62) return 3;
  if (score >= 46) return 2;
  return 1;
}

function buildSourceNode(
  id: string,
  lane: ImprovementLane,
  title: string,
  sourceVersion: string,
  currentBase: number,
  maturityBase: number,
  pressure: number,
  reviewerFocus: string,
): ImprovementSourceNode {
  const currentScore = clampScore(currentBase - pressure);
  const maturityScore = clampScore(maturityBase - pressure / 2);
  const concernScore = clampScore(100 - currentScore + pressure);
  const severity = severityFromConcern(concernScore);

  return {
    id,
    lane,
    title,
    sourceVersion,
    currentScore,
    maturityScore,
    severity,
    priority: priorityFromSeverity(severity),
    reviewerFocus,
    blockers:
      currentScore < 62 || maturityScore < 62 || severity === "critical"
        ? ["Improvement readiness below review threshold.", "Human reviewer must validate roadmap and evidence context."]
        : [],
  };
}

function buildSourceNodes(context: Required<AgronomicImprovementScorecardInput>): ImprovementSourceNode[] {
  const evidencePressure = context.unresolvedEvidenceGapCount * 3;
  const reviewPressure = context.unresolvedReviewItemCount * 3;
  const backlogPressure = context.openImprovementItemCount * 2;

  return [
    buildSourceNode(
      "AIS_NODE_001",
      "governance",
      "Control tower governance maturity",
      "V11.0",
      context.controlTowerScore,
      context.governanceScore,
      reviewPressure,
      "Review tower blockers and command cards before roadmap planning.",
    ),
    buildSourceNode(
      "AIS_NODE_002",
      "evidence",
      "Explainability and evidence maturity",
      "V11.1",
      context.explainabilityLedgerScore,
      context.evidenceQualityScore,
      evidencePressure,
      "Review contribution map, uncertainty and evidence chain gaps.",
    ),
    buildSourceNode(
      "AIS_NODE_003",
      "quality",
      "Compliance passport maturity",
      "V11.2",
      context.compliancePassportScore,
      context.qualityScore,
      evidencePressure / 2,
      "Review compliance packet and traceability before improvement claims.",
    ),
    buildSourceNode(
      "AIS_NODE_004",
      "review-cadence",
      "Decision assurance maturity",
      "V11.3",
      context.decisionAssuranceScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Review signoff coverage and dissent register before cadence planning.",
    ),
    buildSourceNode(
      "AIS_NODE_005",
      "resilience",
      "Scenario stress test maturity",
      "V11.4",
      context.scenarioStressScore,
      context.scenarioStressScore,
      backlogPressure + evidencePressure / 2,
      "Review failure modes and rollback playbook as improvement inputs.",
    ),
    buildSourceNode(
      "AIS_NODE_006",
      "field-ops",
      "Field operations improvement maturity",
      "V11.5",
      context.fieldOpsScore,
      context.fieldOpsScore,
      backlogPressure,
      "Review field operations gaps without creating work items.",
    ),
    buildSourceNode(
      "AIS_NODE_007",
      "maturity-model",
      "Maturity model synthesis",
      "V11.5",
      context.governanceScore,
      context.reviewerConfidenceScore,
      reviewPressure / 2,
      "Summarize maturity gaps as manual review topics only.",
    ),
    buildSourceNode(
      "AIS_NODE_008",
      "roadmap",
      "Improvement roadmap synthesis",
      "V11.5",
      context.qualityScore,
      context.reviewerConfidenceScore,
      backlogPressure + context.openImprovementItemCount,
      "Prepare a redacted roadmap packet without task creation.",
    ),
  ];
}

function buildResilienceScorecard(sourceNodes: ImprovementSourceNode[]): ResilienceScorecardItem[] {
  return sourceNodes.map((node, index) => {
    const targetScore = clampScore(Math.max(78, node.currentScore + 12));
    const gapScore = clampScore(targetScore - node.currentScore);
    const severity = severityFromConcern(gapScore * 5);

    return {
      id: `AIS_SCORE_${String(index + 1).padStart(3, "0")}`,
      lane: node.lane,
      label: node.title,
      currentScore: node.currentScore,
      targetScore,
      gapScore,
      severity,
      reviewerQuestion: `Which manual improvement would raise ${node.title.toLowerCase()} without automation?`,
    };
  });
}

function buildImprovementBacklog(
  context: Required<AgronomicImprovementScorecardInput>,
  sourceNodes: ImprovementSourceNode[],
): ImprovementBacklogItem[] {
  const blockedNodes = sourceNodes.filter((node) => node.blockers.length > 0);

  return [
    {
      id: "AIS_BACKLOG_001",
      title: "Close evidence quality gaps",
      lane: "evidence",
      priority: context.unresolvedEvidenceGapCount >= 6 ? "urgent" : "high",
      status: context.unresolvedEvidenceGapCount >= 6 ? "blocked" : "ready-for-review",
      linkedSourceIds: ["AIS_NODE_002"],
      improvementHypothesis: "Reducing evidence gaps improves explainability, compliance and scenario confidence.",
      manualReviewAction: "Create a human evidence review agenda only.",
      blockedAction: "No task creation, persistence or field dispatch.",
      evidenceNeeded: ["Evidence gap register", "Explainability ledger", "Reviewer confidence note"],
    },
    {
      id: "AIS_BACKLOG_002",
      title: "Strengthen decision signoff cadence",
      lane: "review-cadence",
      priority: context.unresolvedReviewItemCount >= 5 ? "urgent" : "high",
      status: context.unresolvedReviewItemCount >= 5 ? "blocked" : "review-only",
      linkedSourceIds: ["AIS_NODE_004"],
      improvementHypothesis: "A clearer signoff rhythm reduces dissent and unresolved reviewer questions.",
      manualReviewAction: "Define reviewer cadence as a manual governance topic.",
      blockedAction: "No automatic approval or assignment.",
      evidenceNeeded: ["Decision assurance report", "Dissent register", "Reviewer question log"],
    },
    {
      id: "AIS_BACKLOG_003",
      title: "Convert stress drills into review playbooks",
      lane: "resilience",
      priority: context.scenarioStressScore < 70 ? "high" : "medium",
      status: "review-only",
      linkedSourceIds: ["AIS_NODE_005"],
      improvementHypothesis: "War room drills can become repeatable review exercises without operational execution.",
      manualReviewAction: "Review rollback playbook and resilience gates manually.",
      blockedAction: "No work order, intervention or dispatch.",
      evidenceNeeded: ["Scenario stress test", "Rollback playbook", "Resilience gates"],
    },
    {
      id: "AIS_BACKLOG_004",
      title: "Prepare redacted roadmap review packet",
      lane: "roadmap",
      priority: blockedNodes.length > 2 ? "urgent" : "high",
      status: blockedNodes.length > 2 ? "blocked" : "ready-for-review",
      linkedSourceIds: sourceNodes.map((node) => node.id),
      improvementHypothesis: "A redacted roadmap can align reviewers without revealing private or operational data.",
      manualReviewAction: "Prepare roadmap questions only.",
      blockedAction: "No roadmap persistence, public sharing or action creation.",
      evidenceNeeded: ["Source node maturity", "Scorecard gaps", "Review cadence"],
    },
  ];
}

function buildMaturityModel(sourceNodes: ImprovementSourceNode[]): MaturityModelStage[] {
  return sourceNodes.map((node, index) => {
    const currentLevel = levelFromScore(node.maturityScore);
    const targetLevel = Math.min(5, currentLevel + 1) as 1 | 2 | 3 | 4 | 5;

    return {
      id: `AIS_MATURITY_${String(index + 1).padStart(3, "0")}`,
      label: node.title,
      lane: node.lane,
      currentLevel,
      targetLevel,
      gapExplanation: "Maturity level is a local review proxy and not an operational claim.",
      reviewerAction: node.reviewerFocus,
    };
  });
}

function buildReviewCadence(
  context: Required<AgronomicImprovementScorecardInput>,
): ReviewCadenceItem[] {
  return [
    {
      id: "AIS_CADENCE_001",
      title: "Evidence improvement review",
      cadence: context.unresolvedEvidenceGapCount >= 6 ? "weekly" : "biweekly",
      priority: context.unresolvedEvidenceGapCount >= 6 ? "urgent" : "high",
      reviewer: "evidence quality reviewer",
      reviewQuestion: "Which evidence gaps can be closed or downgraded manually?",
      safeOutcome: "Manual review agenda only.",
    },
    {
      id: "AIS_CADENCE_002",
      title: "Governance and signoff review",
      cadence: context.unresolvedReviewItemCount >= 5 ? "weekly" : "monthly",
      priority: context.unresolvedReviewItemCount >= 5 ? "urgent" : "high",
      reviewer: context.reviewerRole,
      reviewQuestion: "Which signoff and dissent items block improvement readiness?",
      safeOutcome: "Manual governance discussion only.",
    },
    {
      id: "AIS_CADENCE_003",
      title: "Resilience drill review",
      cadence: "monthly",
      priority: context.scenarioStressScore < 70 ? "high" : "medium",
      reviewer: "scenario review lead",
      reviewQuestion: "Which war room drills need repeat review?",
      safeOutcome: "Review drill schedule suggestion only.",
    },
    {
      id: "AIS_CADENCE_004",
      title: "Executive roadmap review",
      cadence: "quarterly",
      priority: "medium",
      reviewer: "executive agronomic reviewer",
      reviewQuestion: "Can the redacted roadmap be reviewed safely?",
      safeOutcome: "Board review topic only.",
    },
  ];
}

function buildRoadmapScenarios(
  backlog: ImprovementBacklogItem[],
  context: Required<AgronomicImprovementScorecardInput>,
): RoadmapScenario[] {
  return [
    {
      id: "AIS_ROADMAP_001",
      title: "Near horizon evidence stabilization",
      horizon: "near",
      priority: context.unresolvedEvidenceGapCount >= 6 ? "urgent" : "high",
      linkedBacklogIds: ["AIS_BACKLOG_001"],
      expectedResilienceProxy: clampScore(context.evidenceQualityScore + 8),
      governanceLoadProxy: clampScore(context.unresolvedEvidenceGapCount * 9),
      manualDecisionPoint: "Reviewer confirms evidence closure strategy.",
      blockedOutcome: "No automatic data write or task creation.",
    },
    {
      id: "AIS_ROADMAP_002",
      title: "Mid horizon governance cadence",
      horizon: "mid",
      priority: context.unresolvedReviewItemCount >= 5 ? "high" : "medium",
      linkedBacklogIds: ["AIS_BACKLOG_002"],
      expectedResilienceProxy: clampScore(context.governanceScore + 6),
      governanceLoadProxy: clampScore(context.unresolvedReviewItemCount * 8),
      manualDecisionPoint: "Reviewer confirms signoff rhythm.",
      blockedOutcome: "No automatic approval.",
    },
    {
      id: "AIS_ROADMAP_003",
      title: "Long horizon resilience drills",
      horizon: "long",
      priority: context.scenarioStressScore < 70 ? "high" : "medium",
      linkedBacklogIds: ["AIS_BACKLOG_003", "AIS_BACKLOG_004"],
      expectedResilienceProxy: clampScore(context.scenarioStressScore + 12),
      governanceLoadProxy: clampScore(backlog.filter((item) => item.status === "blocked").length * 15),
      manualDecisionPoint: "Reviewer confirms which drills enter the review calendar.",
      blockedOutcome: "No operational drill execution.",
    },
  ];
}

function buildImprovementGaps(
  context: Required<AgronomicImprovementScorecardInput>,
  sourceNodes: ImprovementSourceNode[],
  backlog: ImprovementBacklogItem[],
): ImprovementGap[] {
  const gaps: ImprovementGap[] = [];

  if (context.unresolvedEvidenceGapCount > 0) {
    gaps.push({
      id: "AIS_GAP_001",
      label: "Evidence improvement backlog",
      lane: "evidence",
      severity: context.unresolvedEvidenceGapCount >= 6 ? "critical" : "elevated",
      reason: `${context.unresolvedEvidenceGapCount} evidence gaps remain unresolved.`,
      manualResolution: "Human reviewer must close, downgrade or accept evidence gaps.",
    });
  }

  if (context.openImprovementItemCount > 0) {
    gaps.push({
      id: "AIS_GAP_002",
      label: "Open improvement items",
      lane: "roadmap",
      severity: context.openImprovementItemCount >= 7 ? "elevated" : "watch",
      reason: `${context.openImprovementItemCount} improvement items remain open.`,
      manualResolution: "Prioritize items manually before roadmap review.",
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      gaps.push({
        id: `AIS_SOURCE_GAP_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} gap`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
      });
    });

  backlog
    .filter((item) => item.status === "blocked")
    .forEach((item, index) => {
      gaps.push({
        id: `AIS_BACKLOG_GAP_${String(index + 1).padStart(3, "0")}`,
        label: item.title,
        lane: item.lane,
        severity: item.priority === "urgent" ? "critical" : "elevated",
        reason: item.improvementHypothesis,
        manualResolution: item.manualReviewAction,
      });
    });

  return gaps;
}

export function buildAiAgronomicImprovementScorecardReport(
  input: AgronomicImprovementScorecardInput = {},
): AgronomicImprovementScorecardReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const resilienceScorecard = buildResilienceScorecard(sourceNodes);
  const improvementBacklog = buildImprovementBacklog(context, sourceNodes);
  const maturityModel = buildMaturityModel(sourceNodes);
  const reviewCadence = buildReviewCadence(context);
  const roadmapScenarios = buildRoadmapScenarios(improvementBacklog, context);
  const improvementGaps = buildImprovementGaps(context, sourceNodes, improvementBacklog);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.currentScore + node.maturityScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const scorecardAverage =
    resilienceScorecard.reduce((sum, item) => sum + item.currentScore, 0) /
    Math.max(1, resilienceScorecard.length);

  const maturityAverage =
    maturityModel.reduce((sum, item) => sum + item.currentLevel * 20, 0) /
    Math.max(1, maturityModel.length);

  const gapPenalty = improvementGaps.filter((gap) => gap.severity === "critical").length * 10;
  const backlogPressure =
    improvementBacklog.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, improvementBacklog.length * 3);

  const improvementScore = clampScore(
    sourceAverage / 3 +
      scorecardAverage / 3 +
      maturityAverage / 3 +
      backlogPressure -
      gapPenalty -
      context.unresolvedEvidenceGapCount -
      context.unresolvedReviewItemCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openImprovementItemCount * 5 +
        context.unresolvedEvidenceGapCount * 7 +
        context.unresolvedReviewItemCount * 6 +
        sourceNodes.filter((node) => node.blockers.length > 0).length * 8,
    ),
  );

  const improvementStatus = bandFromScore(
    improvementScore,
    improvementGaps.filter((gap) => gap.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_IMPROVEMENT_SCORECARD_READINESS,
    improvementScore,
    improvementStatus,
    overallSeverity,
    sourceNodes,
    resilienceScorecard,
    improvementBacklog,
    maturityModel,
    reviewCadence,
    roadmapScenarios,
    improvementGaps,
    redactedExportBundle: {
      exportId: "agronomic_improvement_scorecard_v11_5_redacted_dry_run",
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
        "resilience scorecard",
        "improvement backlog",
        "maturity model",
        "review cadence",
        "roadmap scenarios",
        "improvement gaps",
        "safety summary",
      ],
    },
    safetySummary: [
      "Improvement scorecard is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Backlog and roadmap items are manual review aids only.",
      "Every improvement item remains behind human review and governance locks.",
    ],
  };
}

export const aiAgronomicImprovementScorecardVersion = "V11.5";
