export type SoilNutrientStrategyMode = "dry-run" | "soil-health-review";

export type SoilRiskTier = "low" | "watch" | "elevated" | "critical";

export type SoilReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "soil-ready";

export type SoilScenarioImpact = "low" | "medium" | "high" | "severe";

export type SamplingPriority = "low" | "medium" | "high" | "urgent";

export type NutrientSignalType =
  | "nutrient-imbalance"
  | "salinity-risk"
  | "organic-matter"
  | "compaction-risk"
  | "water-soil-interaction"
  | "sampling-gap";

export interface SoilNutrientStrategyReadiness {
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
  soilHealthSimulationReady: true;
  nutrientBalanceSandboxReady: true;
  samplingPlanPreviewReady: true;
  soilEvidenceReviewReady: true;
}

export interface SoilNutrientStrategyInput {
  cropPortfolio?: string[];
  fieldCount?: number;
  activeCaseCount?: number;
  soilEvidenceScore?: number;
  organicMatterProxy?: number;
  nutrientImbalanceRiskScore?: number;
  salinityRiskScore?: number;
  compactionRiskScore?: number;
  irrigationInteractionRiskScore?: number;
  climateWaterRiskScore?: number;
  scoutingCoverageScore?: number;
  protocolCoverageScore?: number;
  digitalTwinScore?: number;
  boardPackScore?: number;
  reviewerRole?: string;
}

export interface SoilZone {
  id: string;
  cropFamily: string;
  simulatedZoneBand: "small" | "medium" | "large";
  soilRiskTier: SoilRiskTier;
  soilEvidenceScore: number;
  organicMatterProxy: number;
  nutrientImbalanceRiskScore: number;
  salinityRiskScore: number;
  compactionRiskScore: number;
  reviewerConcern: string;
  blockers: string[];
}

export interface NutrientBalanceSignal {
  id: string;
  signalType: NutrientSignalType;
  label: string;
  signalScore: number;
  confidenceScore: number;
  riskTier: SoilRiskTier;
  rationale: string;
  requiredManualEvidence: string[];
  prohibitedOutputs: string[];
}

export interface SoilSamplingLane {
  id: string;
  lane:
    | "soil-evidence"
    | "nutrient-balance"
    | "salinity"
    | "compaction"
    | "water-soil"
    | "executive-review";
  priority: SamplingPriority;
  readinessScore: number;
  readinessBand: SoilReadinessBand;
  objective: string;
  manualEvidenceRequired: string[];
  hardStops: string[];
}

export interface SoilStrategyScenario {
  id: string;
  title: string;
  impact: SoilScenarioImpact;
  priority: SamplingPriority;
  simulatedChange: string;
  expectedSoilHealthProxy: number;
  expectedRiskReductionProxy: number;
  confidenceScore: number;
  manualReviewDecision: string;
  blockedAutomation: string[];
}

export interface SoilEvidenceGap {
  id: string;
  label: string;
  severity: "info" | "warning" | "blocking";
  source: string;
  reason: string;
  manualCollectionAction: string;
}

export interface SoilGovernanceStop {
  id: string;
  stop: string;
  enforced: true;
  reason: string;
  reviewer: string;
}

export interface SoilManualReviewItem {
  id: string;
  decisionTopic: string;
  reviewer: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface SoilNutrientStrategyReport {
  generatedAt: string;
  mode: SoilNutrientStrategyMode;
  context: Required<SoilNutrientStrategyInput>;
  readiness: SoilNutrientStrategyReadiness;
  strategyScore: number;
  strategyStatus: SoilReadinessBand;
  farmSoilRiskTier: SoilRiskTier;
  soilZones: SoilZone[];
  nutrientSignals: NutrientBalanceSignal[];
  samplingLanes: SoilSamplingLane[];
  soilScenarios: SoilStrategyScenario[];
  evidenceGaps: SoilEvidenceGap[];
  governanceStops: SoilGovernanceStop[];
  manualReviewBoard: SoilManualReviewItem[];
  redactedExportBundle: {
    exportId: string;
    includesFieldIdentifiers: false;
    includesPrivateNotes: false;
    includesProviderPayloads: false;
    includesOperationalSecrets: false;
    includesProductRecommendations: false;
    includesDosageGuidance: false;
    sections: string[];
  };
  safetySummary: string[];
}

export const SOIL_NUTRIENT_STRATEGY_READINESS: SoilNutrientStrategyReadiness = {
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
  soilHealthSimulationReady: true,
  nutrientBalanceSandboxReady: true,
  samplingPlanPreviewReady: true,
  soilEvidenceReviewReady: true,
};

const priorityWeight: Record<SamplingPriority, number> = {
  low: 5,
  medium: 10,
  high: 17,
  urgent: 25,
};

const impactWeight: Record<SoilScenarioImpact, number> = {
  low: 5,
  medium: 12,
  high: 21,
  severe: 32,
};

const riskWeight: Record<SoilRiskTier, number> = {
  low: 5,
  watch: 12,
  elevated: 22,
  critical: 36,
};

function normalizeInput(input: SoilNutrientStrategyInput): Required<SoilNutrientStrategyInput> {
  return {
    cropPortfolio: input.cropPortfolio ?? ["tomato", "vineyard", "citrus", "olive"],
    fieldCount: input.fieldCount ?? 8,
    activeCaseCount: input.activeCaseCount ?? 7,
    soilEvidenceScore: input.soilEvidenceScore ?? 64,
    organicMatterProxy: input.organicMatterProxy ?? 58,
    nutrientImbalanceRiskScore: input.nutrientImbalanceRiskScore ?? 77,
    salinityRiskScore: input.salinityRiskScore ?? 69,
    compactionRiskScore: input.compactionRiskScore ?? 63,
    irrigationInteractionRiskScore: input.irrigationInteractionRiskScore ?? 72,
    climateWaterRiskScore: input.climateWaterRiskScore ?? 76,
    scoutingCoverageScore: input.scoutingCoverageScore ?? 72,
    protocolCoverageScore: input.protocolCoverageScore ?? 79,
    digitalTwinScore: input.digitalTwinScore ?? 74,
    boardPackScore: input.boardPackScore ?? 76,
    reviewerRole: input.reviewerRole ?? "soil health agronomic reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function riskFromScore(score: number): SoilRiskTier {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "low";
}

function bandFromScore(score: number, blockingCount: number): SoilReadinessBand {
  if (blockingCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockingCount === 0) return "soil-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSoilZones(context: Required<SoilNutrientStrategyInput>): SoilZone[] {
  const crops = context.cropPortfolio.length > 0 ? context.cropPortfolio : ["mixed"];
  const zoneCount = Math.max(3, Math.min(8, context.fieldCount));

  return Array.from({ length: zoneCount }, (_, index) => {
    const cropFamily = crops[index % crops.length] ?? "mixed";
    const soilEvidenceScore = clampScore(context.soilEvidenceScore + context.scoutingCoverageScore / 5 - index * 3);
    const organicMatterProxy = clampScore(context.organicMatterProxy - index * 2 + context.protocolCoverageScore / 12);
    const nutrientImbalanceRiskScore = clampScore(context.nutrientImbalanceRiskScore + context.activeCaseCount * 2 - index * 3);
    const salinityRiskScore = clampScore(context.salinityRiskScore + context.irrigationInteractionRiskScore / 8 - index * 2);
    const compactionRiskScore = clampScore(context.compactionRiskScore + index * 2);
    const riskScore = clampScore(
      (nutrientImbalanceRiskScore + salinityRiskScore + compactionRiskScore) / 3 +
        context.climateWaterRiskScore / 6 -
        soilEvidenceScore / 5 -
        organicMatterProxy / 8,
    );
    const soilRiskTier = riskFromScore(riskScore);

    return {
      id: `SNS-ZONE-${String(index + 1).padStart(3, "0")}`,
      cropFamily,
      simulatedZoneBand: index % 3 === 0 ? "large" : index % 3 === 1 ? "medium" : "small",
      soilRiskTier,
      soilEvidenceScore,
      organicMatterProxy,
      nutrientImbalanceRiskScore,
      salinityRiskScore,
      compactionRiskScore,
      reviewerConcern:
        soilRiskTier === "critical"
          ? "Critical simulated soil-nutrient risk requires immediate human review."
          : soilRiskTier === "elevated"
            ? "Elevated soil-nutrient risk should be routed to manual sampling review."
            : "Keep under periodic soil health review.",
      blockers:
        soilEvidenceScore < 60 || soilRiskTier === "critical"
          ? ["Soil evidence quality or critical soil risk requires manual review before interpretation."]
          : [],
    };
  });
}

function buildNutrientSignals(context: Required<SoilNutrientStrategyInput>): NutrientBalanceSignal[] {
  const signalTypes: NutrientSignalType[] = [
    "nutrient-imbalance",
    "salinity-risk",
    "organic-matter",
    "compaction-risk",
    "water-soil-interaction",
    "sampling-gap",
  ];

  return signalTypes.map((signalType, index) => {
    const baseScore =
      signalType === "nutrient-imbalance"
        ? context.nutrientImbalanceRiskScore
        : signalType === "salinity-risk"
          ? context.salinityRiskScore
          : signalType === "organic-matter"
            ? 100 - context.organicMatterProxy
            : signalType === "compaction-risk"
              ? context.compactionRiskScore
              : signalType === "water-soil-interaction"
                ? context.irrigationInteractionRiskScore
                : 100 - context.soilEvidenceScore;

    const signalScore = clampScore(baseScore + context.activeCaseCount * 2 - index * 2);
    const confidenceScore = clampScore(context.soilEvidenceScore + context.protocolCoverageScore / 5 - index * 3);
    const riskTier = riskFromScore(clampScore(signalScore + (100 - confidenceScore) / 4));

    return {
      id: `SNS-SIGNAL-${String(index + 1).padStart(3, "0")}`,
      signalType,
      label:
        signalType === "organic-matter"
          ? "Organic matter proxy watch"
          : signalType === "water-soil-interaction"
            ? "Water-soil interaction risk"
            : signalType === "sampling-gap"
              ? "Sampling evidence gap"
              : `${signalType} signal`,
      signalScore,
      confidenceScore,
      riskTier,
      rationale: "Signal is advisory and must be verified by manual soil evidence before any agronomic interpretation.",
      requiredManualEvidence: [
        "Recent soil observation",
        "Zone-level crop context",
        "Sampling history if available",
        "Human agronomist review",
      ],
      prohibitedOutputs: [
        "Product recommendation",
        "Fertilizer prescription",
        "Dosage advice",
        "Automatic intervention",
      ],
    };
  });
}

function buildSamplingLanes(context: Required<SoilNutrientStrategyInput>): SoilSamplingLane[] {
  const lanes: SoilSamplingLane[] = [
    {
      id: "SNS-LANE-001",
      lane: "soil-evidence",
      priority: context.soilEvidenceScore < 62 ? "urgent" : "high",
      readinessScore: clampScore(context.soilEvidenceScore - context.activeCaseCount * 2),
      readinessBand: "simulation-ready",
      objective: "Prioritize manual soil evidence collection before nutrient interpretation.",
      manualEvidenceRequired: ["Soil observation note", "Zone context", "Sampling history"],
      hardStops: ["No sampling task creation", "No persistence write"],
    },
    {
      id: "SNS-LANE-002",
      lane: "nutrient-balance",
      priority: context.nutrientImbalanceRiskScore >= 78 ? "urgent" : "high",
      readinessScore: clampScore(100 - context.nutrientImbalanceRiskScore + context.soilEvidenceScore / 2),
      readinessBand: "simulation-ready",
      objective: "Simulate nutrient balance review without recommending products or rates.",
      manualEvidenceRequired: ["Soil evidence score", "Crop stage", "Protocol review"],
      hardStops: ["No fertilizer prescription", "No dosage advice"],
    },
    {
      id: "SNS-LANE-003",
      lane: "salinity",
      priority: context.salinityRiskScore >= 72 ? "high" : "medium",
      readinessScore: clampScore(100 - context.salinityRiskScore + context.irrigationInteractionRiskScore / 4),
      readinessBand: "simulation-ready",
      objective: "Simulate salinity risk review and required manual evidence.",
      manualEvidenceRequired: ["Irrigation interaction context", "Visible stress pattern", "Manual soil review"],
      hardStops: ["No treatment recommendation", "No automatic action"],
    },
    {
      id: "SNS-LANE-004",
      lane: "compaction",
      priority: context.compactionRiskScore >= 70 ? "high" : "medium",
      readinessScore: clampScore(100 - context.compactionRiskScore + context.scoutingCoverageScore / 3),
      readinessBand: "simulation-ready",
      objective: "Simulate compaction risk triage and scouting questions.",
      manualEvidenceRequired: ["Field access pattern", "Root-zone observation", "Human field note"],
      hardStops: ["No machinery instruction", "No task creation"],
    },
    {
      id: "SNS-LANE-005",
      lane: "water-soil",
      priority: context.irrigationInteractionRiskScore >= 72 ? "high" : "medium",
      readinessScore: clampScore(100 - context.irrigationInteractionRiskScore + context.climateWaterRiskScore / 5),
      readinessBand: "simulation-ready",
      objective: "Connect climate-water risk with soil health evidence.",
      manualEvidenceRequired: ["Irrigation sector context", "Climate-water strategy review", "Evidence gaps"],
      hardStops: ["No irrigation schedule write", "No intervention creation"],
    },
    {
      id: "SNS-LANE-006",
      lane: "executive-review",
      priority: "high",
      readinessScore: clampScore((context.digitalTwinScore + context.boardPackScore + context.protocolCoverageScore) / 3),
      readinessBand: "simulation-ready",
      objective: "Prepare redacted soil-health topic for executive review.",
      manualEvidenceRequired: ["Digital twin summary", "Board pack context", "Protocol evidence gates"],
      hardStops: ["No public sharing", "No automated decision"],
    },
  ];

  return lanes.map((lane) => ({
    ...lane,
    readinessBand: bandFromScore(lane.readinessScore, lane.readinessScore < 58 ? 1 : 0),
  }));
}

function buildSoilScenarios(context: Required<SoilNutrientStrategyInput>): SoilStrategyScenario[] {
  const nutrientImpact: SoilScenarioImpact =
    context.nutrientImbalanceRiskScore >= 82 ? "severe" : context.nutrientImbalanceRiskScore >= 68 ? "high" : "medium";
  const salinityImpact: SoilScenarioImpact = context.salinityRiskScore >= 76 ? "high" : "medium";
  const evidenceImpact: SoilScenarioImpact = context.soilEvidenceScore < 58 ? "high" : "medium";
  const compactionImpact: SoilScenarioImpact = context.compactionRiskScore >= 72 ? "high" : "medium";

  return [
    {
      id: "SNS-SCENARIO-001",
      title: "Soil evidence completion scenario",
      impact: evidenceImpact,
      priority: context.soilEvidenceScore < 62 ? "urgent" : "high",
      simulatedChange: "Simulate closing soil evidence gaps before nutrient balance review.",
      expectedSoilHealthProxy: clampScore(impactWeight[evidenceImpact] + context.soilEvidenceScore / 2),
      expectedRiskReductionProxy: clampScore(100 - context.soilEvidenceScore + context.activeCaseCount * 3),
      confidenceScore: clampScore(context.soilEvidenceScore),
      manualReviewDecision: "Approve manual evidence completion priority only.",
      blockedAutomation: ["No sampling task", "No evidence persistence"],
    },
    {
      id: "SNS-SCENARIO-002",
      title: "Nutrient balance review scenario",
      impact: nutrientImpact,
      priority: context.nutrientImbalanceRiskScore >= 82 ? "urgent" : "high",
      simulatedChange: "Simulate nutrient balance review topics without product or rate recommendations.",
      expectedSoilHealthProxy: clampScore(impactWeight[nutrientImpact] + context.protocolCoverageScore / 3),
      expectedRiskReductionProxy: clampScore(context.nutrientImbalanceRiskScore - context.soilEvidenceScore / 5),
      confidenceScore: clampScore(context.soilEvidenceScore + context.protocolCoverageScore / 6),
      manualReviewDecision: "Route to agronomist review only; no prescription or dosage.",
      blockedAutomation: ["No fertilizer recommendation", "No dosage advice", "No intervention"],
    },
    {
      id: "SNS-SCENARIO-003",
      title: "Salinity and water-soil interaction review",
      impact: salinityImpact,
      priority: context.salinityRiskScore >= 76 ? "high" : "medium",
      simulatedChange: "Simulate salinity interaction with irrigation and climate-water risk.",
      expectedSoilHealthProxy: clampScore(100 - context.salinityRiskScore + context.climateWaterRiskScore / 3),
      expectedRiskReductionProxy: clampScore(context.salinityRiskScore + context.irrigationInteractionRiskScore / 4),
      confidenceScore: clampScore((context.soilEvidenceScore + context.climateWaterRiskScore) / 2),
      manualReviewDecision: "Prepare manual water-soil review topic only.",
      blockedAutomation: ["No irrigation schedule", "No treatment recommendation"],
    },
    {
      id: "SNS-SCENARIO-004",
      title: "Compaction scouting review",
      impact: compactionImpact,
      priority: context.compactionRiskScore >= 72 ? "high" : "medium",
      simulatedChange: "Simulate compaction-related scouting questions and evidence needs.",
      expectedSoilHealthProxy: clampScore(100 - context.compactionRiskScore + context.scoutingCoverageScore / 3),
      expectedRiskReductionProxy: clampScore(context.compactionRiskScore + context.activeCaseCount * 2),
      confidenceScore: clampScore(context.scoutingCoverageScore - context.activeCaseCount),
      manualReviewDecision: "Manual scouting discussion only; no machinery or task instruction.",
      blockedAutomation: ["No machinery instruction", "No automatic task"],
    },
  ];
}

function buildEvidenceGaps(
  context: Required<SoilNutrientStrategyInput>,
  zones: SoilZone[],
  lanes: SoilSamplingLane[],
): SoilEvidenceGap[] {
  const gaps: SoilEvidenceGap[] = [];

  if (context.soilEvidenceScore < 68) {
    gaps.push({
      id: "SNS-GAP-001",
      label: "Soil evidence below strategy threshold",
      severity: context.soilEvidenceScore < 58 ? "blocking" : "warning",
      source: "soil evidence score",
      reason: `Soil evidence score is ${context.soilEvidenceScore}/100.`,
      manualCollectionAction: "Collect manual soil evidence before nutrient balance interpretation.",
    });
  }

  if (context.organicMatterProxy < 60) {
    gaps.push({
      id: "SNS-GAP-002",
      label: "Organic matter proxy watch",
      severity: context.organicMatterProxy < 52 ? "blocking" : "warning",
      source: "organic matter proxy",
      reason: `Organic matter proxy is ${context.organicMatterProxy}/100.`,
      manualCollectionAction: "Ask reviewer to validate soil structure and organic matter context manually.",
    });
  }

  if (context.nutrientImbalanceRiskScore > 74) {
    gaps.push({
      id: "SNS-GAP-003",
      label: "Nutrient imbalance risk requires review",
      severity: context.nutrientImbalanceRiskScore > 84 ? "blocking" : "warning",
      source: "nutrient imbalance risk",
      reason: `Nutrient imbalance risk is ${context.nutrientImbalanceRiskScore}/100.`,
      manualCollectionAction: "Route to agronomist review without product or rate output.",
    });
  }

  const criticalZones = zones.filter((zone) => zone.soilRiskTier === "critical");

  if (criticalZones.length > 0) {
    gaps.push({
      id: "SNS-GAP-004",
      label: "Critical soil-risk concentration",
      severity: criticalZones.length > 2 ? "blocking" : "warning",
      source: "soil zones",
      reason: `${criticalZones.length} simulated zones show critical soil risk.`,
      manualCollectionAction: "Route zones to human review without automated work.",
    });
  }

  const blockedLanes = lanes.filter((lane) => lane.readinessBand === "blocked");

  blockedLanes.forEach((lane, index) => {
    gaps.push({
      id: `SNS-GAP-${String(index + 5).padStart(3, "0")}`,
      label: `${lane.lane} lane blocked`,
      severity: "blocking",
      source: lane.id,
      reason: `Readiness score is ${lane.readinessScore}/100.`,
      manualCollectionAction: "Resolve evidence requirements and hard stops before review.",
    });
  });

  return gaps;
}

function buildGovernanceStops(context: Required<SoilNutrientStrategyInput>): SoilGovernanceStop[] {
  return [
    {
      id: "SNS-STOP-001",
      stop: "Provider execution locked",
      enforced: true,
      reason: "Soil nutrient strategy is deterministic and local until explicit provider activation.",
      reviewer: "safety reviewer",
    },
    {
      id: "SNS-STOP-002",
      stop: "Persistence locked",
      enforced: true,
      reason: "No soil scenario, evidence or readiness state is written to storage.",
      reviewer: "operations reviewer",
    },
    {
      id: "SNS-STOP-003",
      stop: "Operational automation locked",
      enforced: true,
      reason: "No sampling task, intervention, schedule or execution can be created.",
      reviewer: context.reviewerRole,
    },
    {
      id: "SNS-STOP-004",
      stop: "Nutrient prescription locked",
      enforced: true,
      reason: "No product recommendation, fertilizer prescription or dosage guidance is produced.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildManualReviewBoard(
  context: Required<SoilNutrientStrategyInput>,
  scenarios: SoilStrategyScenario[],
  gaps: SoilEvidenceGap[],
): SoilManualReviewItem[] {
  return [
    {
      id: "SNS-REVIEW-001",
      decisionTopic: "Should soil evidence collection be prioritized?",
      reviewer: context.reviewerRole,
      evidenceNeeded: ["Soil evidence score", "Zone context", "Crop portfolio"],
      safeOutcome: "Manual evidence collection discussion only; no task is created.",
      manualOnly: true,
    },
    {
      id: "SNS-REVIEW-002",
      decisionTopic: "Which nutrient balance signals require agronomist review?",
      reviewer: "senior agronomist",
      evidenceNeeded: ["Nutrient imbalance signal", "Soil evidence", "Protocol coverage"],
      safeOutcome: "Review topic only; no product, fertilizer or rate output.",
      manualOnly: true,
    },
    {
      id: "SNS-REVIEW-003",
      decisionTopic: "Can salinity and compaction risks enter board review?",
      reviewer: "executive agronomic reviewer",
      evidenceNeeded: scenarios.map((scenario) => scenario.title),
      safeOutcome: "Redacted board topic only.",
      manualOnly: true,
    },
    {
      id: "SNS-REVIEW-004",
      decisionTopic: "Which evidence gaps block soil-ready status?",
      reviewer: "evidence quality reviewer",
      evidenceNeeded: gaps.map((gap) => gap.label).slice(0, 6),
      safeOutcome: "Manual evidence resolution plan only.",
      manualOnly: true,
    },
  ];
}

export function buildAiSoilNutrientStrategyReport(
  input: SoilNutrientStrategyInput = {},
): SoilNutrientStrategyReport {
  const context = normalizeInput(input);
  const soilZones = buildSoilZones(context);
  const nutrientSignals = buildNutrientSignals(context);
  const samplingLanes = buildSamplingLanes(context);
  const soilScenarios = buildSoilScenarios(context);
  const evidenceGaps = buildEvidenceGaps(context, soilZones, samplingLanes);
  const governanceStops = buildGovernanceStops(context);
  const manualReviewBoard = buildManualReviewBoard(context, soilScenarios, evidenceGaps);

  const zoneAverage =
    soilZones.reduce(
      (sum, zone) =>
        sum +
        zone.soilEvidenceScore +
        zone.organicMatterProxy -
        riskWeight[zone.soilRiskTier] / 2,
      0,
    ) / Math.max(1, soilZones.length * 2);

  const laneAverage =
    samplingLanes.reduce((sum, lane) => sum + lane.readinessScore, 0) / Math.max(1, samplingLanes.length);

  const signalAverage =
    nutrientSignals.reduce((sum, signal) => sum + signal.confidenceScore - riskWeight[signal.riskTier] / 3, 0) /
    Math.max(1, nutrientSignals.length);

  const blockingPenalty = evidenceGaps.filter((gap) => gap.severity === "blocking").length * 10;
  const scenarioPressure =
    soilScenarios.reduce(
      (sum, scenario) => sum + priorityWeight[scenario.priority] + impactWeight[scenario.impact],
      0,
    ) / Math.max(1, soilScenarios.length * 4);

  const strategyScore = clampScore(
    zoneAverage / 3 +
      laneAverage / 3 +
      signalAverage / 3 +
      context.protocolCoverageScore / 8 +
      context.digitalTwinScore / 8 +
      scenarioPressure -
      blockingPenalty,
  );

  const farmSoilRiskTier = riskFromScore(
    clampScore(
      (context.nutrientImbalanceRiskScore + context.salinityRiskScore + context.compactionRiskScore) / 3 +
        context.irrigationInteractionRiskScore / 6 +
        context.activeCaseCount * 3 -
        context.soilEvidenceScore / 5,
    ),
  );

  const strategyStatus = bandFromScore(
    strategyScore,
    evidenceGaps.filter((gap) => gap.severity === "blocking").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: SOIL_NUTRIENT_STRATEGY_READINESS,
    strategyScore,
    strategyStatus,
    farmSoilRiskTier,
    soilZones,
    nutrientSignals,
    samplingLanes,
    soilScenarios,
    evidenceGaps,
    governanceStops,
    manualReviewBoard,
    redactedExportBundle: {
      exportId: "soil-nutrient-strategy-v10-7-redacted-dry-run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalSecrets: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "soil zones",
        "nutrient signals",
        "sampling lanes",
        "soil scenarios",
        "evidence gaps",
        "governance stops",
        "manual review board",
        "safety summary",
      ],
    },
    safetySummary: [
      "Soil nutrient strategy is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, fertilizer prescription, dosage advice, public sharing or operational schedule is produced.",
      "Scenarios are manual-review topics, not agronomic prescriptions.",
      "Every soil-health decision remains behind human review and manual dispatch.",
    ],
  };
}

export const aiSoilNutrientStrategyVersion = "V10.7";
