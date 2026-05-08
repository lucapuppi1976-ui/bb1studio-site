export type AgronomicControlTowerMode = "dry-run" | "governance-review";

export type TowerReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "tower-ready";

export type TowerSeverity = "info" | "watch" | "elevated" | "critical";

export type TowerPriority = "low" | "medium" | "high" | "urgent";

export type TowerLane =
  | "knowledge"
  | "field-ops"
  | "crop-protocols"
  | "climate-water"
  | "biosecurity"
  | "soil-health"
  | "phenology"
  | "harvest-quality"
  | "executive-board";

export interface AgronomicControlTowerGuardrail {
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
  controlTowerSimulationReady: true;
  governanceKernelReady: true;
  crossModuleReviewReady: true;
  manualCommandCenterReady: true;
}

export interface AgronomicControlTowerInput {
  activeCaseCount?: number;
  highConcernFieldCount?: number;
  evidenceGapCount?: number;
  knowledgeVaultScore?: number;
  autopilotScore?: number;
  cropProtocolScore?: number;
  boardPackScore?: number;
  digitalTwinScore?: number;
  climateWaterScore?: number;
  outbreakSentinelScore?: number;
  soilNutrientScore?: number;
  phenologyYieldScore?: number;
  harvestQualityScore?: number;
  reviewerRole?: string;
}

export interface TowerModuleNode {
  id: string;
  lane: TowerLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: TowerSeverity;
  priority: TowerPriority;
  blocked: boolean;
  reviewerFocus: string;
  blockers: string[];
}

export interface TowerCommandCard {
  id: string;
  title: string;
  priority: TowerPriority;
  status: "blocked" | "simulation-only" | "review-ready";
  linkedModuleIds: string[];
  decisionQuestion: string;
  manualReviewAction: string;
  evidenceNeeded: string[];
  blockedBecause: string[];
}

export interface TowerGovernanceGate {
  id: string;
  label: string;
  passed: boolean;
  severity: TowerSeverity;
  reviewer: string;
  reason: string;
  hardStop: string;
}

export interface TowerEscalationPath {
  id: string;
  title: string;
  fromLane: TowerLane;
  toReviewer: string;
  priority: TowerPriority;
  rationale: string;
  allowedOutcome: string;
  disallowedOutcome: string;
}

export interface TowerReadinessGap {
  id: string;
  label: string;
  sourceLane: TowerLane;
  severity: TowerSeverity;
  reason: string;
  manualResolution: string;
}

export interface AgronomicControlTowerReport {
  generatedAt: string;
  mode: AgronomicControlTowerMode;
  context: Required<AgronomicControlTowerInput>;
  readiness: AgronomicControlTowerGuardrail;
  towerScore: number;
  towerStatus: TowerReadinessBand;
  overallSeverity: TowerSeverity;
  moduleNodes: TowerModuleNode[];
  commandCards: TowerCommandCard[];
  governanceGates: TowerGovernanceGate[];
  escalationPaths: TowerEscalationPath[];
  readinessGaps: TowerReadinessGap[];
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

export const AGRONOMIC_CONTROL_TOWER_READINESS: AgronomicControlTowerGuardrail = {
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
  controlTowerSimulationReady: true,
  governanceKernelReady: true,
  crossModuleReviewReady: true,
  manualCommandCenterReady: true,
};

const priorityWeight: Record<TowerPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

const severityWeight: Record<TowerSeverity, number> = {
  info: 4,
  watch: 11,
  elevated: 21,
  critical: 34,
};

function normalizeInput(input: AgronomicControlTowerInput): Required<AgronomicControlTowerInput> {
  return {
    activeCaseCount: input.activeCaseCount ?? 9,
    highConcernFieldCount: input.highConcernFieldCount ?? 4,
    evidenceGapCount: input.evidenceGapCount ?? 6,
    knowledgeVaultScore: input.knowledgeVaultScore ?? 78,
    autopilotScore: input.autopilotScore ?? 74,
    cropProtocolScore: input.cropProtocolScore ?? 79,
    boardPackScore: input.boardPackScore ?? 77,
    digitalTwinScore: input.digitalTwinScore ?? 75,
    climateWaterScore: input.climateWaterScore ?? 73,
    outbreakSentinelScore: input.outbreakSentinelScore ?? 76,
    soilNutrientScore: input.soilNutrientScore ?? 72,
    phenologyYieldScore: input.phenologyYieldScore ?? 69,
    harvestQualityScore: input.harvestQualityScore ?? 71,
    reviewerRole: input.reviewerRole ?? "chief agronomic reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromScore(score: number): TowerSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: TowerSeverity): TowerPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): TowerReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "tower-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function makeModuleNode(
  id: string,
  lane: TowerLane,
  title: string,
  sourceVersion: string,
  rawScore: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): TowerModuleNode {
  const readinessScore = clampScore(rawScore - pressure);
  const confidenceScore = clampScore(confidenceBase - pressure / 2);
  const concernScore = clampScore(100 - readinessScore + pressure);
  const severity = severityFromScore(concernScore);
  const blocked = readinessScore < 62 || severity === "critical";

  return {
    id,
    lane,
    title,
    sourceVersion,
    readinessScore,
    confidenceScore,
    severity,
    priority: priorityFromSeverity(severity),
    blocked,
    reviewerFocus,
    blockers: blocked
      ? [
          "Readiness or confidence below tower review threshold.",
          "Human reviewer must resolve evidence and governance context.",
        ]
      : [],
  };
}

function buildModuleNodes(context: Required<AgronomicControlTowerInput>): TowerModuleNode[] {
  const pressure = context.evidenceGapCount * 3 + context.highConcernFieldCount * 2;

  return [
    makeModuleNode(
      "ACT_NODE_001",
      "knowledge",
      "Knowledge vault governance",
      "V10.0",
      context.knowledgeVaultScore,
      82,
      context.evidenceGapCount,
      "Review expert playbook coverage, conflict register and approval queue.",
    ),
    makeModuleNode(
      "ACT_NODE_002",
      "field-ops",
      "Field autopilot control room",
      "V10.1",
      context.autopilotScore,
      78,
      pressure / 2,
      "Keep all sequencing simulation-only and manual-review gated.",
    ),
    makeModuleNode(
      "ACT_NODE_003",
      "crop-protocols",
      "Crop protocol builder",
      "V10.2",
      context.cropProtocolScore,
      80,
      context.evidenceGapCount,
      "Review crop-specific applicability, phenology and evidence gates.",
    ),
    makeModuleNode(
      "ACT_NODE_004",
      "executive-board",
      "Agronomic board pack",
      "V10.3",
      context.boardPackScore,
      79,
      context.highConcernFieldCount,
      "Validate board cards, governance checklist and proxy caveats.",
    ),
    makeModuleNode(
      "ACT_NODE_005",
      "field-ops",
      "Farm digital twin readiness",
      "V10.4",
      context.digitalTwinScore,
      77,
      pressure / 2,
      "Review simulated field nodes, scenario sandbox and governance stops.",
    ),
    makeModuleNode(
      "ACT_NODE_006",
      "climate-water",
      "Climate water strategy",
      "V10.5",
      context.climateWaterScore,
      76,
      context.highConcernFieldCount * 3,
      "Review heat, water, irrigation and evidence backlog together.",
    ),
    makeModuleNode(
      "ACT_NODE_007",
      "biosecurity",
      "Pest and disease sentinel",
      "V10.6",
      context.outbreakSentinelScore,
      76,
      context.activeCaseCount,
      "Review biosecurity signals and avoid public or regulated instructions.",
    ),
    makeModuleNode(
      "ACT_NODE_008",
      "soil-health",
      "Soil nutrient strategy",
      "V10.7",
      context.soilNutrientScore,
      74,
      context.evidenceGapCount,
      "Review soil evidence, nutrient balance and sampling preview.",
    ),
    makeModuleNode(
      "ACT_NODE_009",
      "phenology",
      "Phenology yield proxy review",
      "V10.8",
      context.phenologyYieldScore,
      72,
      context.evidenceGapCount + context.highConcernFieldCount,
      "Review flowering, pollination and proxy caveats without forecasting production.",
    ),
    makeModuleNode(
      "ACT_NODE_010",
      "harvest-quality",
      "Harvest quality readiness",
      "V10.9",
      context.harvestQualityScore,
      73,
      context.highConcernFieldCount * 2,
      "Review maturity, storage, logistics and quality pressure before any planning.",
    ),
  ];
}

function buildCommandCards(
  context: Required<AgronomicControlTowerInput>,
  moduleNodes: TowerModuleNode[],
): TowerCommandCard[] {
  const blockedNodes = moduleNodes.filter((node) => node.blocked);
  const urgentNodes = moduleNodes.filter((node) => node.priority === "urgent");

  return [
    {
      id: "ACT_CMD_001",
      title: "Resolve evidence backlog before tower decisions",
      priority: context.evidenceGapCount >= 6 ? "urgent" : "high",
      status: context.evidenceGapCount >= 6 ? "blocked" : "review-ready",
      linkedModuleIds: ["ACT_NODE_001", "ACT_NODE_003", "ACT_NODE_008", "ACT_NODE_009"],
      decisionQuestion: "Which evidence gaps block reliable cross-module interpretation?",
      manualReviewAction: "Create a human review agenda only; do not create tasks or write data.",
      evidenceNeeded: ["Evidence gap register", "Crop protocol gates", "Soil and phenology review notes"],
      blockedBecause: context.evidenceGapCount >= 6 ? ["Evidence backlog exceeds tower threshold."] : [],
    },
    {
      id: "ACT_CMD_002",
      title: "Prioritize high concern fields for manual review",
      priority: context.highConcernFieldCount >= 4 ? "urgent" : "high",
      status: "review-ready",
      linkedModuleIds: ["ACT_NODE_002", "ACT_NODE_005", "ACT_NODE_006", "ACT_NODE_007"],
      decisionQuestion: "Which high concern fields require human review first?",
      manualReviewAction: "Prepare manual review sequence only; no dispatch and no work assignment.",
      evidenceNeeded: ["Digital twin nodes", "Climate water lanes", "Biosecurity signals", "Autopilot sandbox"],
      blockedBecause: [],
    },
    {
      id: "ACT_CMD_003",
      title: "Lock operational execution until governance is passed",
      priority: blockedNodes.length > 0 ? "urgent" : "high",
      status: blockedNodes.length > 0 ? "blocked" : "simulation-only",
      linkedModuleIds: blockedNodes.map((node) => node.id),
      decisionQuestion: "Which modules prevent operational readiness?",
      manualReviewAction: "Hold every downstream operation until human governance review closes blockers.",
      evidenceNeeded: blockedNodes.map((node) => `${node.title}: ${node.reviewerFocus}`),
      blockedBecause: blockedNodes.map((node) => node.title),
    },
    {
      id: "ACT_CMD_004",
      title: "Prepare redacted executive control tower packet",
      priority: urgentNodes.length > 0 ? "high" : "medium",
      status: "review-ready",
      linkedModuleIds: moduleNodes.map((node) => node.id),
      decisionQuestion: "Can the current farm situation be summarized safely for executive review?",
      manualReviewAction: "Export a redacted decision packet only.",
      evidenceNeeded: ["Module readiness", "Command card blockers", "Governance gates", "Proxy caveats"],
      blockedBecause: [],
    },
  ];
}

function buildGovernanceGates(
  context: Required<AgronomicControlTowerInput>,
  moduleNodes: TowerModuleNode[],
): TowerGovernanceGate[] {
  const blockedCount = moduleNodes.filter((node) => node.blocked).length;

  return [
    {
      id: "ACT_GATE_001",
      label: "Provider calls locked",
      passed: true,
      severity: "info",
      reviewer: "safety reviewer",
      reason: "Control tower is local and deterministic.",
      hardStop: "No external model call is allowed.",
    },
    {
      id: "ACT_GATE_002",
      label: "Persistence and memory writes locked",
      passed: true,
      severity: "info",
      reviewer: "knowledge governance reviewer",
      reason: "All outputs are generated as transient dry-run state.",
      hardStop: "No storage, memory update or memory promotion is allowed.",
    },
    {
      id: "ACT_GATE_003",
      label: "Operational automation locked",
      passed: true,
      severity: "info",
      reviewer: context.reviewerRole,
      reason: "Command cards are review prompts only.",
      hardStop: "No task, work order, intervention or execution is allowed.",
    },
    {
      id: "ACT_GATE_004",
      label: "Product, dosage and production forecast outputs locked",
      passed: true,
      severity: "info",
      reviewer: "agronomic safety reviewer",
      reason: "Control tower never emits prescriptive or forecast outputs.",
      hardStop: "No product, dosage, treatment or production forecast is allowed.",
    },
    {
      id: "ACT_GATE_005",
      label: "Evidence backlog within review tolerance",
      passed: context.evidenceGapCount < 6,
      severity: context.evidenceGapCount >= 6 ? "critical" : "watch",
      reviewer: "evidence quality reviewer",
      reason:
        context.evidenceGapCount >= 6
          ? "Evidence backlog is too large for tower-ready synthesis."
          : "Evidence backlog is visible and reviewable.",
      hardStop: "Do not escalate to tower-ready while evidence backlog is excessive.",
    },
    {
      id: "ACT_GATE_006",
      label: "Module blockers within review tolerance",
      passed: blockedCount <= 2,
      severity: blockedCount > 2 ? "critical" : blockedCount > 0 ? "elevated" : "info",
      reviewer: "operations reviewer",
      reason: `${blockedCount} module nodes are blocked.`,
      hardStop: "Resolve blocked modules before any board-ready interpretation.",
    },
  ];
}

function buildEscalationPaths(moduleNodes: TowerModuleNode[]): TowerEscalationPath[] {
  return moduleNodes
    .filter((node) => node.priority === "urgent" || node.priority === "high")
    .slice(0, 6)
    .map((node, index) => ({
      id: `ACT_ESC_${String(index + 1).padStart(3, "0")}`,
      title: `Escalate ${node.title}`,
      fromLane: node.lane,
      toReviewer:
        node.lane === "biosecurity"
          ? "biosecurity reviewer"
          : node.lane === "executive-board"
            ? "executive agronomic reviewer"
            : "senior agronomist",
      priority: node.priority,
      rationale: node.reviewerFocus,
      allowedOutcome: "Manual review topic and redacted packet only.",
      disallowedOutcome: "No task, intervention, alert, prescription, dosage, forecast or data write.",
    }));
}

function buildReadinessGaps(
  context: Required<AgronomicControlTowerInput>,
  moduleNodes: TowerModuleNode[],
  gates: TowerGovernanceGate[],
): TowerReadinessGap[] {
  const gaps: TowerReadinessGap[] = [];

  if (context.evidenceGapCount > 0) {
    gaps.push({
      id: "ACT_GAP_001",
      label: "Evidence backlog",
      sourceLane: "knowledge",
      severity: context.evidenceGapCount >= 6 ? "critical" : "elevated",
      reason: `${context.evidenceGapCount} evidence gaps remain open.`,
      manualResolution: "Close or downgrade evidence gaps through human review before tower-ready status.",
    });
  }

  moduleNodes
    .filter((node) => node.blocked)
    .forEach((node, index) => {
      gaps.push({
        id: `ACT_GAP_${String(index + 2).padStart(3, "0")}`,
        label: `${node.title} blocked`,
        sourceLane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      gaps.push({
        id: `ACT_GOV_GAP_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        sourceLane: "executive-board",
        severity: gate.severity,
        reason: gate.reason,
        manualResolution: gate.hardStop,
      });
    });

  return gaps;
}

export function buildAiAgronomicControlTowerReport(
  input: AgronomicControlTowerInput = {},
): AgronomicControlTowerReport {
  const context = normalizeInput(input);
  const moduleNodes = buildModuleNodes(context);
  const commandCards = buildCommandCards(context, moduleNodes);
  const governanceGates = buildGovernanceGates(context, moduleNodes);
  const escalationPaths = buildEscalationPaths(moduleNodes);
  const readinessGaps = buildReadinessGaps(context, moduleNodes, governanceGates);

  const moduleAverage =
    moduleNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, moduleNodes.length * 2);

  const blockedPenalty = moduleNodes.filter((node) => node.blocked).length * 8;
  const gatePenalty = governanceGates.filter((gate) => !gate.passed).length * 10;
  const commandPressure =
    commandCards.reduce((sum, card) => sum + priorityWeight[card.priority], 0) / Math.max(1, commandCards.length * 3);

  const towerScore = clampScore(
    moduleAverage +
      commandPressure +
      context.boardPackScore / 10 -
      context.evidenceGapCount * 2 -
      blockedPenalty -
      gatePenalty,
  );

  const overallSeverity = severityFromScore(
    clampScore(
      context.activeCaseCount * 5 +
        context.highConcernFieldCount * 8 +
        context.evidenceGapCount * 5 +
        moduleNodes.filter((node) => node.blocked).length * 8,
    ),
  );

  const towerStatus = bandFromScore(
    towerScore,
    readinessGaps.filter((gap) => gap.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_CONTROL_TOWER_READINESS,
    towerScore,
    towerStatus,
    overallSeverity,
    moduleNodes,
    commandCards,
    governanceGates,
    escalationPaths,
    readinessGaps,
    redactedExportBundle: {
      exportId: "agronomic_control_tower_v11_0_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "module nodes",
        "command cards",
        "governance gates",
        "escalation paths",
        "readiness gaps",
        "safety summary",
      ],
    },
    safetySummary: [
      "Agronomic control tower is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, alerting or production forecast is produced.",
      "Command cards are manual review prompts only.",
      "Every cross-module decision remains behind human review and governance gates.",
    ],
  };
}

export const aiAgronomicControlTowerVersion = "V11.0";
