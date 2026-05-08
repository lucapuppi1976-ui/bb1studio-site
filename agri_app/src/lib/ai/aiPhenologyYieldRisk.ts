export type PhenologyYieldRiskMode = "dry-run" | "phenology-review";

export type PhenologyRiskTier = "low" | "watch" | "elevated" | "critical";

export type PhenologyReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "phenology-ready";

export type PhenologyWindowStatus = "early" | "on-window" | "late" | "uncertain";

export type YieldRiskScenarioImpact = "low" | "medium" | "high" | "severe";

export type PhenologyPriority = "low" | "medium" | "high" | "urgent";

export type PhenologySignalType =
  | "flowering-window"
  | "pollination-risk"
  | "fruit-set-risk"
  | "heat-stress"
  | "humidity-stress"
  | "water-stress"
  | "yield-risk_proxy";

export interface PhenologyYieldRiskReadiness {
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
  phenologySimulationReady: true;
  floweringWindowReviewReady: true;
  pollinationRiskReviewReady: true;
  yieldRiskProxyReady: true;
}

export interface PhenologyYieldRiskInput {
  cropPortfolio?: string[];
  fieldCount?: number;
  activeCaseCount?: number;
  floweringWindowCompletenessScore?: number;
  pollinationEvidenceScore?: number;
  fruitSetEvidenceScore?: number;
  heatStressRiskScore?: number;
  humidityRiskScore?: number;
  waterStressRiskScore?: number;
  pestDiseasePressureScore?: number;
  soilNutrientStrategyScore?: number;
  climateWaterStrategyScore?: number;
  digitalTwinScore?: number;
  boardPackScore?: number;
  reviewerRole?: string;
}

export interface PhenologyWindowNode {
  id: string;
  cropFamily: string;
  simulatedZoneBand: "small" | "medium" | "large";
  windowStatus: PhenologyWindowStatus;
  floweringWindowScore: number;
  pollinationEvidenceScore: number;
  fruitSetEvidenceScore: number;
  stressOverlapScore: number;
  riskTier: PhenologyRiskTier;
  reviewerConcern: string;
  blockers: string[];
}

export interface PhenologyRiskSignal {
  id: string;
  signalType: PhenologySignalType;
  label: string;
  signalScore: number;
  confidenceScore: number;
  riskTier: PhenologyRiskTier;
  rationale: string;
  requiredManualEvidence: string[];
  prohibitedOutputs: string[];
}

export interface PhenologyReviewLane {
  id: string;
  lane:
    | "flowering-window"
    | "pollination"
    | "fruit-set"
    | "stress-overlap"
    | "crop-protocol"
    | "executive-review";
  priority: PhenologyPriority;
  readinessScore: number;
  readinessBand: PhenologyReadinessBand;
  objective: string;
  manualEvidenceRequired: string[];
  hardStops: string[];
}

export interface YieldRiskScenario {
  id: string;
  title: string;
  impact: YieldRiskScenarioImpact;
  priority: PhenologyPriority;
  simulatedChange: string;
  expectedStabilityProxy: number;
  expectedYieldRiskProxy: number;
  confidenceScore: number;
  manualReviewDecision: string;
  blockedAutomation: string[];
}

export interface PhenologyEvidenceGap {
  id: string;
  label: string;
  severity: "info" | "warning" | "blocking";
  source: string;
  reason: string;
  manualCollectionAction: string;
}

export interface PhenologyGovernanceStop {
  id: string;
  stop: string;
  enforced: true;
  reason: string;
  reviewer: string;
}

export interface PhenologyManualReviewItem {
  id: string;
  decisionTopic: string;
  reviewer: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface PhenologyYieldRiskReport {
  generatedAt: string;
  mode: PhenologyYieldRiskMode;
  context: Required<PhenologyYieldRiskInput>;
  readiness: PhenologyYieldRiskReadiness;
  strategyScore: number;
  strategyStatus: PhenologyReadinessBand;
  farmPhenologyRiskTier: PhenologyRiskTier;
  phenologyWindows: PhenologyWindowNode[];
  riskSignals: PhenologyRiskSignal[];
  reviewLanes: PhenologyReviewLane[];
  yieldScenarios: YieldRiskScenario[];
  evidenceGaps: PhenologyEvidenceGap[];
  governanceStops: PhenologyGovernanceStop[];
  manualReviewBoard: PhenologyManualReviewItem[];
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

export const PHENOLOGY_YIELD_RISK_READINESS: PhenologyYieldRiskReadiness = {
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
  phenologySimulationReady: true,
  floweringWindowReviewReady: true,
  pollinationRiskReviewReady: true,
  yieldRiskProxyReady: true,
};

const priorityWeight: Record<PhenologyPriority, number> = {
  low: 5,
  medium: 10,
  high: 17,
  urgent: 25,
};

const impactWeight: Record<YieldRiskScenarioImpact, number> = {
  low: 5,
  medium: 12,
  high: 21,
  severe: 32,
};

const riskWeight: Record<PhenologyRiskTier, number> = {
  low: 5,
  watch: 12,
  elevated: 22,
  critical: 36,
};

function normalizeInput(input: PhenologyYieldRiskInput): Required<PhenologyYieldRiskInput> {
  return {
    cropPortfolio: input.cropPortfolio ?? ["tomato", "vineyard", "citrus", "olive"],
    fieldCount: input.fieldCount ?? 8,
    activeCaseCount: input.activeCaseCount ?? 6,
    floweringWindowCompletenessScore: input.floweringWindowCompletenessScore ?? 67,
    pollinationEvidenceScore: input.pollinationEvidenceScore ?? 61,
    fruitSetEvidenceScore: input.fruitSetEvidenceScore ?? 64,
    heatStressRiskScore: input.heatStressRiskScore ?? 74,
    humidityRiskScore: input.humidityRiskScore ?? 69,
    waterStressRiskScore: input.waterStressRiskScore ?? 76,
    pestDiseasePressureScore: input.pestDiseasePressureScore ?? 71,
    soilNutrientStrategyScore: input.soilNutrientStrategyScore ?? 74,
    climateWaterStrategyScore: input.climateWaterStrategyScore ?? 76,
    digitalTwinScore: input.digitalTwinScore ?? 75,
    boardPackScore: input.boardPackScore ?? 77,
    reviewerRole: input.reviewerRole ?? "phenology agronomic reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function riskFromScore(score: number): PhenologyRiskTier {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "low";
}

function bandFromScore(score: number, blockingCount: number): PhenologyReadinessBand {
  if (blockingCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockingCount === 0) return "phenology-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function windowStatusFromScore(score: number, index: number): PhenologyWindowStatus {
  if (score < 55) return "uncertain";
  if (index % 4 === 0) return "early";
  if (index % 4 === 1) return "on-window";
  if (index % 4 === 2) return "late";
  return "uncertain";
}

function buildPhenologyWindows(context: Required<PhenologyYieldRiskInput>): PhenologyWindowNode[] {
  const crops = context.cropPortfolio.length > 0 ? context.cropPortfolio : ["mixed"];
  const nodeCount = Math.max(3, Math.min(8, context.fieldCount));

  return Array.from({ length: nodeCount }, (_, index) => {
    const cropFamily = crops[index % crops.length] ?? "mixed";
    const floweringWindowScore = clampScore(context.floweringWindowCompletenessScore + context.boardPackScore / 8 - index * 3);
    const pollinationEvidenceScore = clampScore(context.pollinationEvidenceScore + context.digitalTwinScore / 10 - index * 2);
    const fruitSetEvidenceScore = clampScore(context.fruitSetEvidenceScore + context.soilNutrientStrategyScore / 12 - index * 2);
    const stressOverlapScore = clampScore(
      (context.heatStressRiskScore + context.humidityRiskScore + context.waterStressRiskScore + context.pestDiseasePressureScore) / 4 +
        index * 2,
    );
    const riskScore = clampScore(
      stressOverlapScore +
        context.activeCaseCount * 3 -
        floweringWindowScore / 5 -
        pollinationEvidenceScore / 6 -
        fruitSetEvidenceScore / 8,
    );
    const riskTier = riskFromScore(riskScore);
    const windowStatus = windowStatusFromScore(floweringWindowScore, index);

    return {
      id: `PYR-WINDOW-${String(index + 1).padStart(3, "0")}`,
      cropFamily,
      simulatedZoneBand: index % 3 === 0 ? "large" : index % 3 === 1 ? "medium" : "small",
      windowStatus,
      floweringWindowScore,
      pollinationEvidenceScore,
      fruitSetEvidenceScore,
      stressOverlapScore,
      riskTier,
      reviewerConcern:
        riskTier === "critical"
          ? "Critical phenology-yield risk requires immediate human review."
          : riskTier === "elevated"
            ? "Elevated flowering or fruit-set risk should be reviewed before any operational planning."
            : "Keep under periodic phenology review.",
      blockers:
        floweringWindowScore < 60 || pollinationEvidenceScore < 58 || riskTier === "critical"
          ? ["Flowering or pollination evidence is below safe review threshold."]
          : [],
    };
  });
}

function buildRiskSignals(context: Required<PhenologyYieldRiskInput>): PhenologyRiskSignal[] {
  const signalTypes: PhenologySignalType[] = [
    "flowering-window",
    "pollination-risk",
    "fruit-set-risk",
    "heat-stress",
    "humidity-stress",
    "water-stress",
    "yield-risk_proxy",
  ];

  return signalTypes.map((signalType, index) => {
    const baseScore =
      signalType === "flowering-window"
        ? 100 - context.floweringWindowCompletenessScore
        : signalType === "pollination-risk"
          ? 100 - context.pollinationEvidenceScore
          : signalType === "fruit-set-risk"
            ? 100 - context.fruitSetEvidenceScore
            : signalType === "heat-stress"
              ? context.heatStressRiskScore
              : signalType === "humidity-stress"
                ? context.humidityRiskScore
                : signalType === "water-stress"
                  ? context.waterStressRiskScore
                  : (context.heatStressRiskScore + context.waterStressRiskScore + context.pestDiseasePressureScore) / 3;

    const signalScore = clampScore(baseScore + context.activeCaseCount * 2 - index);
    const confidenceScore = clampScore(
      (context.floweringWindowCompletenessScore + context.pollinationEvidenceScore + context.fruitSetEvidenceScore) / 3 -
        index * 2,
    );
    const riskTier = riskFromScore(clampScore(signalScore + (100 - confidenceScore) / 4));

    return {
      id: `PYR-SIGNAL-${String(index + 1).padStart(3, "0")}`,
      signalType,
      label:
        signalType === "yield-risk_proxy"
          ? "Yield risk proxy"
          : signalType === "fruit-set-risk"
            ? "Fruit-set evidence risk"
            : `${signalType} signal`,
      signalScore,
      confidenceScore,
      riskTier,
      rationale: "Signal is advisory and must be verified by human phenology evidence before interpretation.",
      requiredManualEvidence: [
        "Growth stage confirmation",
        "Flowering window observation",
        "Pollination or fruit-set note",
        "Human agronomist review",
      ],
      prohibitedOutputs: [
        "Production forecast",
        "Product recommendation",
        "Dosage advice",
        "Automatic intervention",
      ],
    };
  });
}

function buildReviewLanes(context: Required<PhenologyYieldRiskInput>): PhenologyReviewLane[] {
  const lanes: PhenologyReviewLane[] = [
    {
      id: "PYR-LANE-001",
      lane: "flowering-window",
      priority: context.floweringWindowCompletenessScore < 62 ? "urgent" : "high",
      readinessScore: clampScore(context.floweringWindowCompletenessScore - context.activeCaseCount * 2),
      readinessBand: "simulation-ready",
      objective: "Validate flowering window completeness before yield-risk interpretation.",
      manualEvidenceRequired: ["Flowering stage note", "Crop-specific protocol", "Human field observation"],
      hardStops: ["No production forecast", "No task creation"],
    },
    {
      id: "PYR-LANE-002",
      lane: "pollination",
      priority: context.pollinationEvidenceScore < 62 ? "urgent" : "high",
      readinessScore: clampScore(context.pollinationEvidenceScore - context.heatStressRiskScore / 8),
      readinessBand: "simulation-ready",
      objective: "Review pollination evidence and stress overlap before escalation.",
      manualEvidenceRequired: ["Pollination evidence", "Weather-stress context", "Human reviewer signoff"],
      hardStops: ["No automatic action", "No intervention creation"],
    },
    {
      id: "PYR-LANE-003",
      lane: "fruit-set",
      priority: context.fruitSetEvidenceScore < 65 ? "high" : "medium",
      readinessScore: clampScore(context.fruitSetEvidenceScore - context.waterStressRiskScore / 10),
      readinessBand: "simulation-ready",
      objective: "Simulate fruit-set risk review without forecasting production.",
      manualEvidenceRequired: ["Fruit-set observation", "Phenology window context", "Evidence quality review"],
      hardStops: ["No production estimate", "No product advice"],
    },
    {
      id: "PYR-LANE-004",
      lane: "stress-overlap",
      priority: context.heatStressRiskScore >= 76 || context.waterStressRiskScore >= 76 ? "high" : "medium",
      readinessScore: clampScore(100 - (context.heatStressRiskScore + context.waterStressRiskScore + context.humidityRiskScore) / 3),
      readinessBand: "simulation-ready",
      objective: "Review climate-water-pest stress overlap during critical phenology windows.",
      manualEvidenceRequired: ["Climate-water strategy", "Pest-disease sentinel context", "Human agronomist note"],
      hardStops: ["No prescription", "No dosage"],
    },
    {
      id: "PYR-LANE-005",
      lane: "crop-protocol",
      priority: context.soilNutrientStrategyScore < 72 ? "high" : "medium",
      readinessScore: clampScore((context.soilNutrientStrategyScore + context.climateWaterStrategyScore) / 2),
      readinessBand: "simulation-ready",
      objective: "Connect crop protocols, soil health and water strategy to phenology review.",
      manualEvidenceRequired: ["Crop protocol evidence gates", "Soil-nutrient strategy", "Climate-water strategy"],
      hardStops: ["No fertilizer recommendation", "No product selection"],
    },
    {
      id: "PYR-LANE-006",
      lane: "executive-review",
      priority: "high",
      readinessScore: clampScore((context.digitalTwinScore + context.boardPackScore) / 2),
      readinessBand: "simulation-ready",
      objective: "Prepare redacted phenology-yield risk topic for executive review.",
      manualEvidenceRequired: ["Digital twin summary", "Board pack context", "Yield proxy caveat"],
      hardStops: ["No public sharing", "No automated decision"],
    },
  ];

  return lanes.map((lane) => ({
    ...lane,
    readinessBand: bandFromScore(lane.readinessScore, lane.readinessScore < 58 ? 1 : 0),
  }));
}

function buildYieldScenarios(context: Required<PhenologyYieldRiskInput>): YieldRiskScenario[] {
  const floweringImpact: YieldRiskScenarioImpact =
    context.floweringWindowCompletenessScore < 58 ? "severe" : context.floweringWindowCompletenessScore < 68 ? "high" : "medium";
  const pollinationImpact: YieldRiskScenarioImpact =
    context.pollinationEvidenceScore < 58 ? "severe" : context.pollinationEvidenceScore < 68 ? "high" : "medium";
  const stressImpact: YieldRiskScenarioImpact =
    Math.max(context.heatStressRiskScore, context.waterStressRiskScore, context.pestDiseasePressureScore) >= 82 ? "severe" : "high";
  const fruitSetImpact: YieldRiskScenarioImpact = context.fruitSetEvidenceScore < 62 ? "high" : "medium";

  return [
    {
      id: "PYR-SCENARIO-001",
      title: "Flowering window evidence completion",
      impact: floweringImpact,
      priority: context.floweringWindowCompletenessScore < 62 ? "urgent" : "high",
      simulatedChange: "Simulate collecting missing flowering-window evidence before yield-risk review.",
      expectedStabilityProxy: clampScore(impactWeight[floweringImpact] + context.floweringWindowCompletenessScore / 2),
      expectedYieldRiskProxy: clampScore(100 - context.floweringWindowCompletenessScore + context.activeCaseCount * 3),
      confidenceScore: clampScore(context.floweringWindowCompletenessScore),
      manualReviewDecision: "Approve manual flowering evidence collection only.",
      blockedAutomation: ["No scouting task", "No persistence write", "No production forecast"],
    },
    {
      id: "PYR-SCENARIO-002",
      title: "Pollination risk review",
      impact: pollinationImpact,
      priority: context.pollinationEvidenceScore < 62 ? "urgent" : "high",
      simulatedChange: "Simulate pollination-risk review topics without operational instructions.",
      expectedStabilityProxy: clampScore(impactWeight[pollinationImpact] + context.pollinationEvidenceScore / 2),
      expectedYieldRiskProxy: clampScore(100 - context.pollinationEvidenceScore + context.heatStressRiskScore / 5),
      confidenceScore: clampScore((context.pollinationEvidenceScore + context.floweringWindowCompletenessScore) / 2),
      manualReviewDecision: "Route to agronomist review only; no intervention or product output.",
      blockedAutomation: ["No product recommendation", "No dosage advice", "No intervention"],
    },
    {
      id: "PYR-SCENARIO-003",
      title: "Stress overlap during critical phenology",
      impact: stressImpact,
      priority: "high",
      simulatedChange: "Simulate heat-water-humidity-pest overlap during flowering and fruit-set windows.",
      expectedStabilityProxy: clampScore(100 - Math.max(context.heatStressRiskScore, context.waterStressRiskScore) + context.climateWaterStrategyScore / 3),
      expectedYieldRiskProxy: clampScore((context.heatStressRiskScore + context.waterStressRiskScore + context.pestDiseasePressureScore) / 3),
      confidenceScore: clampScore((context.climateWaterStrategyScore + context.digitalTwinScore) / 2),
      manualReviewDecision: "Prepare manual stress-overlap topic only.",
      blockedAutomation: ["No automatic action", "No treatment recommendation"],
    },
    {
      id: "PYR-SCENARIO-004",
      title: "Fruit-set evidence review",
      impact: fruitSetImpact,
      priority: context.fruitSetEvidenceScore < 62 ? "high" : "medium",
      simulatedChange: "Simulate fruit-set evidence review and uncertainty briefing.",
      expectedStabilityProxy: clampScore(impactWeight[fruitSetImpact] + context.fruitSetEvidenceScore / 2),
      expectedYieldRiskProxy: clampScore(100 - context.fruitSetEvidenceScore + context.waterStressRiskScore / 6),
      confidenceScore: clampScore(context.fruitSetEvidenceScore - context.activeCaseCount),
      manualReviewDecision: "Manual fruit-set review only; no yield forecast.",
      blockedAutomation: ["No production forecast", "No public sharing"],
    },
  ];
}

function buildEvidenceGaps(
  context: Required<PhenologyYieldRiskInput>,
  windows: PhenologyWindowNode[],
  lanes: PhenologyReviewLane[],
): PhenologyEvidenceGap[] {
  const gaps: PhenologyEvidenceGap[] = [];

  if (context.floweringWindowCompletenessScore < 68) {
    gaps.push({
      id: "PYR-GAP-001",
      label: "Flowering window evidence below threshold",
      severity: context.floweringWindowCompletenessScore < 58 ? "blocking" : "warning",
      source: "flowering window score",
      reason: `Flowering window completeness score is ${context.floweringWindowCompletenessScore}/100.`,
      manualCollectionAction: "Collect manual flowering-stage observations before yield-risk interpretation.",
    });
  }

  if (context.pollinationEvidenceScore < 66) {
    gaps.push({
      id: "PYR-GAP-002",
      label: "Pollination evidence below threshold",
      severity: context.pollinationEvidenceScore < 56 ? "blocking" : "warning",
      source: "pollination evidence score",
      reason: `Pollination evidence score is ${context.pollinationEvidenceScore}/100.`,
      manualCollectionAction: "Ask reviewer to validate pollination context and stress overlap manually.",
    });
  }

  if (context.fruitSetEvidenceScore < 66) {
    gaps.push({
      id: "PYR-GAP-003",
      label: "Fruit-set evidence requires review",
      severity: context.fruitSetEvidenceScore < 56 ? "blocking" : "warning",
      source: "fruit-set evidence",
      reason: `Fruit-set evidence score is ${context.fruitSetEvidenceScore}/100.`,
      manualCollectionAction: "Route to agronomist review without production forecast or intervention output.",
    });
  }

  const criticalWindows = windows.filter((window) => window.riskTier === "critical");

  if (criticalWindows.length > 0) {
    gaps.push({
      id: "PYR-GAP-004",
      label: "Critical phenology-risk concentration",
      severity: criticalWindows.length > 2 ? "blocking" : "warning",
      source: "phenology windows",
      reason: `${criticalWindows.length} simulated windows show critical phenology risk.`,
      manualCollectionAction: "Route windows to human review without automated work.",
    });
  }

  const blockedLanes = lanes.filter((lane) => lane.readinessBand === "blocked");

  blockedLanes.forEach((lane, index) => {
    gaps.push({
      id: `PYR-GAP-${String(index + 5).padStart(3, "0")}`,
      label: `${lane.lane} lane blocked`,
      severity: "blocking",
      source: lane.id,
      reason: `Readiness score is ${lane.readinessScore}/100.`,
      manualCollectionAction: "Resolve evidence requirements and hard stops before review.",
    });
  });

  return gaps;
}

function buildGovernanceStops(context: Required<PhenologyYieldRiskInput>): PhenologyGovernanceStop[] {
  return [
    {
      id: "PYR-STOP-001",
      stop: "Provider execution locked",
      enforced: true,
      reason: "Phenology-yield risk strategy is deterministic and local until explicit provider activation.",
      reviewer: "safety reviewer",
    },
    {
      id: "PYR-STOP-002",
      stop: "Persistence locked",
      enforced: true,
      reason: "No phenology scenario, evidence or readiness state is written to storage.",
      reviewer: "operations reviewer",
    },
    {
      id: "PYR-STOP-003",
      stop: "Operational automation locked",
      enforced: true,
      reason: "No scouting task, intervention, schedule or execution can be created.",
      reviewer: context.reviewerRole,
    },
    {
      id: "PYR-STOP-004",
      stop: "Production forecast and prescription locked",
      enforced: true,
      reason: "No production forecast, product recommendation or dosage guidance is produced.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildManualReviewBoard(
  context: Required<PhenologyYieldRiskInput>,
  scenarios: YieldRiskScenario[],
  gaps: PhenologyEvidenceGap[],
): PhenologyManualReviewItem[] {
  return [
    {
      id: "PYR-REVIEW-001",
      decisionTopic: "Should flowering-window evidence be prioritized?",
      reviewer: context.reviewerRole,
      evidenceNeeded: ["Flowering stage note", "Crop family", "Field observation"],
      safeOutcome: "Manual evidence collection discussion only; no task is created.",
      manualOnly: true,
    },
    {
      id: "PYR-REVIEW-002",
      decisionTopic: "Which pollination signals need agronomist review?",
      reviewer: "senior agronomist",
      evidenceNeeded: ["Pollination evidence", "Heat stress context", "Fruit-set notes"],
      safeOutcome: "Review topic only; no product, intervention or rate output.",
      manualOnly: true,
    },
    {
      id: "PYR-REVIEW-003",
      decisionTopic: "Can yield-risk proxy topics enter board review?",
      reviewer: "executive agronomic reviewer",
      evidenceNeeded: scenarios.map((scenario) => scenario.title),
      safeOutcome: "Redacted board topic only; no production forecast.",
      manualOnly: true,
    },
    {
      id: "PYR-REVIEW-004",
      decisionTopic: "Which evidence gaps block phenology-ready status?",
      reviewer: "evidence quality reviewer",
      evidenceNeeded: gaps.map((gap) => gap.label).slice(0, 6),
      safeOutcome: "Manual evidence resolution plan only.",
      manualOnly: true,
    },
  ];
}

export function buildAiPhenologyYieldRiskReport(
  input: PhenologyYieldRiskInput = {},
): PhenologyYieldRiskReport {
  const context = normalizeInput(input);
  const phenologyWindows = buildPhenologyWindows(context);
  const riskSignals = buildRiskSignals(context);
  const reviewLanes = buildReviewLanes(context);
  const yieldScenarios = buildYieldScenarios(context);
  const evidenceGaps = buildEvidenceGaps(context, phenologyWindows, reviewLanes);
  const governanceStops = buildGovernanceStops(context);
  const manualReviewBoard = buildManualReviewBoard(context, yieldScenarios, evidenceGaps);

  const windowAverage =
    phenologyWindows.reduce(
      (sum, window) =>
        sum +
        window.floweringWindowScore +
        window.pollinationEvidenceScore +
        window.fruitSetEvidenceScore -
        riskWeight[window.riskTier] / 2,
      0,
    ) / Math.max(1, phenologyWindows.length * 3);

  const laneAverage =
    reviewLanes.reduce((sum, lane) => sum + lane.readinessScore, 0) / Math.max(1, reviewLanes.length);

  const signalAverage =
    riskSignals.reduce((sum, signal) => sum + signal.confidenceScore - riskWeight[signal.riskTier] / 3, 0) /
    Math.max(1, riskSignals.length);

  const blockingPenalty = evidenceGaps.filter((gap) => gap.severity === "blocking").length * 10;
  const scenarioPressure =
    yieldScenarios.reduce(
      (sum, scenario) => sum + priorityWeight[scenario.priority] + impactWeight[scenario.impact],
      0,
    ) / Math.max(1, yieldScenarios.length * 4);

  const strategyScore = clampScore(
    windowAverage / 3 +
      laneAverage / 3 +
      signalAverage / 3 +
      context.soilNutrientStrategyScore / 8 +
      context.climateWaterStrategyScore / 8 +
      context.digitalTwinScore / 10 +
      scenarioPressure -
      blockingPenalty,
  );

  const farmPhenologyRiskTier = riskFromScore(
    clampScore(
      (100 - context.floweringWindowCompletenessScore) / 2 +
        (100 - context.pollinationEvidenceScore) / 2 +
        context.heatStressRiskScore / 3 +
        context.waterStressRiskScore / 3 +
        context.pestDiseasePressureScore / 4 +
        context.activeCaseCount * 3,
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
    readiness: PHENOLOGY_YIELD_RISK_READINESS,
    strategyScore,
    strategyStatus,
    farmPhenologyRiskTier,
    phenologyWindows,
    riskSignals,
    reviewLanes,
    yieldScenarios,
    evidenceGaps,
    governanceStops,
    manualReviewBoard,
    redactedExportBundle: {
      exportId: "phenology-yield-risk_v10-8-redacted-dry-run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "phenology windows",
        "risk signals",
        "review lanes",
        "yield risk scenarios",
        "evidence gaps",
        "governance stops",
        "manual review board",
        "safety summary",
      ],
    },
    safetySummary: [
      "Phenology-yield risk strategy is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No production forecast, product recommendation, dosage advice, public sharing or operational schedule is produced.",
      "Scenarios are manual-review topics, not yield forecasts or agronomic prescriptions.",
      "Every phenology decision remains behind human review and manual dispatch.",
    ],
  };
}

export const aiPhenologyYieldRiskVersion = "V10.8";
