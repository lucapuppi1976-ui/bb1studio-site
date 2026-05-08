export type HarvestQualityMode = "dry-run" | "harvest-review";

export type HarvestQualityTier = "low" | "watch" | "elevated" | "critical";

export type HarvestReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "harvest-ready";

export type HarvestScenarioImpact = "low" | "medium" | "high" | "severe";

export type HarvestPriority = "low" | "medium" | "high" | "urgent";

export type HarvestSignalType =
  | "maturity-window"
  | "quality-pressure"
  | "storage-readiness"
  | "logistics-readiness"
  | "weather-exposure"
  | "postharvest-handling"
  | "market-window-proxy";

export interface HarvestQualityReadinessGuardrail {
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
  harvestReadinessSimulationReady: true;
  postHarvestQualityReviewReady: true;
  storageWindowSandboxReady: true;
  logisticsReviewReady: true;
}

export interface HarvestQualityReadinessInput {
  cropPortfolio?: string[];
  fieldCount?: number;
  activeCaseCount?: number;
  maturityEvidenceScore?: number;
  harvestWindowScore?: number;
  qualityPressureScore?: number;
  storageReadinessScore?: number;
  logisticsReadinessScore?: number;
  weatherExposureScore?: number;
  pestDiseasePressureScore?: number;
  phenologyScore?: number;
  soilNutrientScore?: number;
  climateWaterScore?: number;
  boardPackScore?: number;
  reviewerRole?: string;
}

export interface HarvestZone {
  id: string;
  cropFamily: string;
  simulatedZoneBand: "small" | "medium" | "large";
  maturityWindowScore: number;
  qualityPressureScore: number;
  storageReadinessScore: number;
  logisticsReadinessScore: number;
  tier: HarvestQualityTier;
  reviewerConcern: string;
  blockers: string[];
}

export interface HarvestQualitySignal {
  id: string;
  signalType: HarvestSignalType;
  label: string;
  signalScore: number;
  confidenceScore: number;
  tier: HarvestQualityTier;
  rationale: string;
  requiredManualEvidence: string[];
  prohibitedOutputs: string[];
}

export interface HarvestReviewLane {
  id: string;
  lane:
    | "maturity-review"
    | "quality-review"
    | "storage-review"
    | "logistics-review"
    | "weather-exposure"
    | "executive-review";
  priority: HarvestPriority;
  readinessScore: number;
  readinessBand: HarvestReadinessBand;
  objective: string;
  manualEvidenceRequired: string[];
  hardStops: string[];
}

export interface HarvestScenario {
  id: string;
  title: string;
  impact: HarvestScenarioImpact;
  priority: HarvestPriority;
  simulatedChange: string;
  expectedQualityProtectionProxy: number;
  expectedDelayExposureProxy: number;
  confidenceScore: number;
  manualReviewDecision: string;
  blockedAutomation: string[];
}

export interface HarvestEvidenceGap {
  id: string;
  label: string;
  severity: "info" | "warning" | "blocking";
  source: string;
  reason: string;
  manualCollectionAction: string;
}

export interface HarvestGovernanceStop {
  id: string;
  stop: string;
  enforced: true;
  reason: string;
  reviewer: string;
}

export interface HarvestManualReviewItem {
  id: string;
  decisionTopic: string;
  reviewer: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface HarvestQualityReadinessReport {
  generatedAt: string;
  mode: HarvestQualityMode;
  context: Required<HarvestQualityReadinessInput>;
  readiness: HarvestQualityReadinessGuardrail;
  readinessScore: number;
  readinessStatus: HarvestReadinessBand;
  farmHarvestTier: HarvestQualityTier;
  harvestZones: HarvestZone[];
  qualitySignals: HarvestQualitySignal[];
  reviewLanes: HarvestReviewLane[];
  harvestScenarios: HarvestScenario[];
  evidenceGaps: HarvestEvidenceGap[];
  governanceStops: HarvestGovernanceStop[];
  manualReviewBoard: HarvestManualReviewItem[];
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

export const HARVEST_QUALITY_READINESS: HarvestQualityReadinessGuardrail = {
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
  harvestReadinessSimulationReady: true,
  postHarvestQualityReviewReady: true,
  storageWindowSandboxReady: true,
  logisticsReviewReady: true,
};

const priorityWeight: Record<HarvestPriority, number> = {
  low: 5,
  medium: 10,
  high: 17,
  urgent: 25,
};

const impactWeight: Record<HarvestScenarioImpact, number> = {
  low: 5,
  medium: 12,
  high: 21,
  severe: 32,
};

const tierWeight: Record<HarvestQualityTier, number> = {
  low: 5,
  watch: 12,
  elevated: 22,
  critical: 36,
};

function normalizeInput(input: HarvestQualityReadinessInput): Required<HarvestQualityReadinessInput> {
  return {
    cropPortfolio: input.cropPortfolio ?? ["tomato", "vineyard", "citrus", "olive"],
    fieldCount: input.fieldCount ?? 8,
    activeCaseCount: input.activeCaseCount ?? 6,
    maturityEvidenceScore: input.maturityEvidenceScore ?? 69,
    harvestWindowScore: input.harvestWindowScore ?? 66,
    qualityPressureScore: input.qualityPressureScore ?? 74,
    storageReadinessScore: input.storageReadinessScore ?? 63,
    logisticsReadinessScore: input.logisticsReadinessScore ?? 68,
    weatherExposureScore: input.weatherExposureScore ?? 72,
    pestDiseasePressureScore: input.pestDiseasePressureScore ?? 69,
    phenologyScore: input.phenologyScore ?? 75,
    soilNutrientScore: input.soilNutrientScore ?? 73,
    climateWaterScore: input.climateWaterScore ?? 76,
    boardPackScore: input.boardPackScore ?? 78,
    reviewerRole: input.reviewerRole ?? "harvest quality agronomic reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function tierFromScore(score: number): HarvestQualityTier {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "low";
}

function bandFromScore(score: number, blockingCount: number): HarvestReadinessBand {
  if (blockingCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockingCount === 0) return "harvest-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildHarvestZones(context: Required<HarvestQualityReadinessInput>): HarvestZone[] {
  const crops = context.cropPortfolio.length > 0 ? context.cropPortfolio : ["mixed"];
  const zoneCount = Math.max(3, Math.min(8, context.fieldCount));

  return Array.from({ length: zoneCount }, (_, index) => {
    const cropFamily = crops[index % crops.length] ?? "mixed";
    const maturityWindowScore = clampScore(context.maturityEvidenceScore + context.phenologyScore / 10 - index * 3);
    const qualityPressureScore = clampScore(context.qualityPressureScore + context.pestDiseasePressureScore / 8 + index * 2);
    const storageReadinessScore = clampScore(context.storageReadinessScore + context.logisticsReadinessScore / 10 - index * 2);
    const logisticsReadinessScore = clampScore(context.logisticsReadinessScore - index * 2 + context.boardPackScore / 12);
    const pressureScore = clampScore(
      qualityPressureScore +
        context.weatherExposureScore / 4 +
        context.activeCaseCount * 3 -
        maturityWindowScore / 5 -
        storageReadinessScore / 6,
    );
    const tier = tierFromScore(pressureScore);

    return {
      id: `HQR_ZONE_${String(index + 1).padStart(3, "0")}`,
      cropFamily,
      simulatedZoneBand: index % 3 === 0 ? "large" : index % 3 === 1 ? "medium" : "small",
      maturityWindowScore,
      qualityPressureScore,
      storageReadinessScore,
      logisticsReadinessScore,
      tier,
      reviewerConcern:
        tier === "critical"
          ? "Critical harvest quality pressure requires immediate human review."
          : tier === "elevated"
            ? "Elevated harvest pressure should be reviewed before operational planning."
            : "Keep under periodic harvest readiness review.",
      blockers:
        maturityWindowScore < 60 || storageReadinessScore < 58 || tier === "critical"
          ? ["Harvest maturity or storage readiness is below safe review threshold."]
          : [],
    };
  });
}

function buildQualitySignals(context: Required<HarvestQualityReadinessInput>): HarvestQualitySignal[] {
  const signalTypes: HarvestSignalType[] = [
    "maturity-window",
    "quality-pressure",
    "storage-readiness",
    "logistics-readiness",
    "weather-exposure",
    "postharvest-handling",
    "market-window-proxy",
  ];

  return signalTypes.map((signalType, index) => {
    const baseScore =
      signalType === "maturity-window"
        ? 100 - context.harvestWindowScore
        : signalType === "quality-pressure"
          ? context.qualityPressureScore
          : signalType === "storage-readiness"
            ? 100 - context.storageReadinessScore
            : signalType === "logistics-readiness"
              ? 100 - context.logisticsReadinessScore
              : signalType === "weather-exposure"
                ? context.weatherExposureScore
                : signalType === "postharvest-handling"
                  ? 100 - Math.min(context.storageReadinessScore, context.logisticsReadinessScore)
                  : (context.weatherExposureScore + context.qualityPressureScore) / 2;

    const signalScore = clampScore(baseScore + context.activeCaseCount * 2 - index);
    const confidenceScore = clampScore(
      (context.maturityEvidenceScore + context.harvestWindowScore + context.phenologyScore) / 3 -
        index * 2,
    );
    const tier = tierFromScore(clampScore(signalScore + (100 - confidenceScore) / 4));

    return {
      id: `HQR_SIGNAL_${String(index + 1).padStart(3, "0")}`,
      signalType,
      label:
        signalType === "market-window-proxy"
          ? "Market window proxy"
          : signalType === "postharvest-handling"
            ? "Post harvest handling review"
            : `${signalType} signal`,
      signalScore,
      confidenceScore,
      tier,
      rationale: "Signal is advisory and must be reviewed by a human before harvest or post harvest decisions.",
      requiredManualEvidence: [
        "Crop maturity observation",
        "Harvest window note",
        "Storage and logistics context",
        "Human agronomist review",
      ],
      prohibitedOutputs: [
        "Production forecast",
        "Automatic work assignment",
        "Product recommendation",
        "Dosage advice",
      ],
    };
  });
}

function buildReviewLanes(context: Required<HarvestQualityReadinessInput>): HarvestReviewLane[] {
  const lanes: HarvestReviewLane[] = [
    {
      id: "HQR_LANE_001",
      lane: "maturity-review",
      priority: context.maturityEvidenceScore < 62 ? "urgent" : "high",
      readinessScore: clampScore(context.maturityEvidenceScore - context.activeCaseCount * 2),
      readinessBand: "simulation-ready",
      objective: "Validate crop maturity evidence before harvest readiness interpretation.",
      manualEvidenceRequired: ["Maturity observation", "Crop family", "Field review note"],
      hardStops: ["No harvest task creation", "No automatic schedule"],
    },
    {
      id: "HQR_LANE_002",
      lane: "quality-review",
      priority: context.qualityPressureScore >= 76 ? "urgent" : "high",
      readinessScore: clampScore(100 - context.qualityPressureScore + context.maturityEvidenceScore / 2),
      readinessBand: "simulation-ready",
      objective: "Review quality pressure and defect likelihood without forecasting production.",
      manualEvidenceRequired: ["Quality observation", "Pest and disease context", "Human reviewer signoff"],
      hardStops: ["No product advice", "No dosage"],
    },
    {
      id: "HQR_LANE_003",
      lane: "storage-review",
      priority: context.storageReadinessScore < 65 ? "high" : "medium",
      readinessScore: clampScore(context.storageReadinessScore - context.weatherExposureScore / 10),
      readinessBand: "simulation-ready",
      objective: "Simulate storage readiness review without creating operational records.",
      manualEvidenceRequired: ["Storage capacity note", "Handling readiness", "Quality protection context"],
      hardStops: ["No storage instruction", "No automatic dispatch"],
    },
    {
      id: "HQR_LANE_004",
      lane: "logistics-review",
      priority: context.logisticsReadinessScore < 68 ? "high" : "medium",
      readinessScore: clampScore(context.logisticsReadinessScore - context.activeCaseCount * 2),
      readinessBand: "simulation-ready",
      objective: "Review harvest logistics feasibility as a manual planning topic.",
      manualEvidenceRequired: ["Labor availability context", "Access status", "Manual operations review"],
      hardStops: ["No work order creation", "No task creation"],
    },
    {
      id: "HQR_LANE_005",
      lane: "weather-exposure",
      priority: context.weatherExposureScore >= 76 ? "high" : "medium",
      readinessScore: clampScore(100 - context.weatherExposureScore + context.climateWaterScore / 4),
      readinessBand: "simulation-ready",
      objective: "Connect climate water exposure to harvest and post harvest review.",
      manualEvidenceRequired: ["Weather exposure context", "Climate water strategy", "Maturity window evidence"],
      hardStops: ["No automated decision", "No public sharing"],
    },
    {
      id: "HQR_LANE_006",
      lane: "executive-review",
      priority: "high",
      readinessScore: clampScore((context.boardPackScore + context.phenologyScore + context.soilNutrientScore) / 3),
      readinessBand: "simulation-ready",
      objective: "Prepare redacted harvest readiness topic for executive review.",
      manualEvidenceRequired: ["Board pack summary", "Phenology context", "Quality pressure review"],
      hardStops: ["No production forecast", "No automatic execution"],
    },
  ];

  return lanes.map((lane) => ({
    ...lane,
    readinessBand: bandFromScore(lane.readinessScore, lane.readinessScore < 58 ? 1 : 0),
  }));
}

function buildHarvestScenarios(context: Required<HarvestQualityReadinessInput>): HarvestScenario[] {
  const maturityImpact: HarvestScenarioImpact =
    context.maturityEvidenceScore < 58 ? "severe" : context.maturityEvidenceScore < 68 ? "high" : "medium";
  const qualityImpact: HarvestScenarioImpact =
    context.qualityPressureScore >= 82 ? "severe" : context.qualityPressureScore >= 70 ? "high" : "medium";
  const storageImpact: HarvestScenarioImpact =
    context.storageReadinessScore < 58 ? "severe" : context.storageReadinessScore < 68 ? "high" : "medium";
  const weatherImpact: HarvestScenarioImpact = context.weatherExposureScore >= 78 ? "high" : "medium";

  return [
    {
      id: "HQR_SCENARIO_001",
      title: "Maturity evidence completion",
      impact: maturityImpact,
      priority: context.maturityEvidenceScore < 62 ? "urgent" : "high",
      simulatedChange: "Simulate collecting missing maturity observations before harvest readiness review.",
      expectedQualityProtectionProxy: clampScore(impactWeight[maturityImpact] + context.maturityEvidenceScore / 2),
      expectedDelayExposureProxy: clampScore(100 - context.maturityEvidenceScore + context.weatherExposureScore / 5),
      confidenceScore: clampScore(context.maturityEvidenceScore),
      manualReviewDecision: "Approve manual maturity evidence collection only.",
      blockedAutomation: ["No harvest task", "No schedule write", "No production forecast"],
    },
    {
      id: "HQR_SCENARIO_002",
      title: "Quality pressure review",
      impact: qualityImpact,
      priority: context.qualityPressureScore >= 82 ? "urgent" : "high",
      simulatedChange: "Simulate quality pressure review topics without product or operational instructions.",
      expectedQualityProtectionProxy: clampScore(impactWeight[qualityImpact] + context.phenologyScore / 3),
      expectedDelayExposureProxy: clampScore(context.qualityPressureScore + context.weatherExposureScore / 6),
      confidenceScore: clampScore((context.maturityEvidenceScore + context.phenologyScore) / 2),
      manualReviewDecision: "Route to agronomist review only; no intervention or product output.",
      blockedAutomation: ["No product recommendation", "No dosage advice", "No intervention"],
    },
    {
      id: "HQR_SCENARIO_003",
      title: "Storage readiness review",
      impact: storageImpact,
      priority: context.storageReadinessScore < 62 ? "urgent" : "high",
      simulatedChange: "Simulate storage readiness and handling questions before harvest planning.",
      expectedQualityProtectionProxy: clampScore(context.storageReadinessScore / 2 + context.logisticsReadinessScore / 3),
      expectedDelayExposureProxy: clampScore(100 - context.storageReadinessScore + context.qualityPressureScore / 6),
      confidenceScore: clampScore((context.storageReadinessScore + context.logisticsReadinessScore) / 2),
      manualReviewDecision: "Manual storage readiness review only.",
      blockedAutomation: ["No storage instruction", "No work order"],
    },
    {
      id: "HQR_SCENARIO_004",
      title: "Weather exposure and logistics window",
      impact: weatherImpact,
      priority: context.weatherExposureScore >= 78 ? "high" : "medium",
      simulatedChange: "Simulate weather exposure and logistics feasibility during harvest windows.",
      expectedQualityProtectionProxy: clampScore(100 - context.weatherExposureScore + context.climateWaterScore / 3),
      expectedDelayExposureProxy: clampScore((context.weatherExposureScore + context.qualityPressureScore) / 2),
      confidenceScore: clampScore((context.climateWaterScore + context.boardPackScore) / 2),
      manualReviewDecision: "Manual executive topic only; no forecast or dispatch.",
      blockedAutomation: ["No production forecast", "No automatic action"],
    },
  ];
}

function buildEvidenceGaps(
  context: Required<HarvestQualityReadinessInput>,
  zones: HarvestZone[],
  lanes: HarvestReviewLane[],
): HarvestEvidenceGap[] {
  const gaps: HarvestEvidenceGap[] = [];

  if (context.maturityEvidenceScore < 68) {
    gaps.push({
      id: "HQR_GAP_001",
      label: "Maturity evidence below harvest threshold",
      severity: context.maturityEvidenceScore < 58 ? "blocking" : "warning",
      source: "maturity evidence score",
      reason: `Maturity evidence score is ${context.maturityEvidenceScore}/100.`,
      manualCollectionAction: "Collect crop maturity observations before harvest readiness interpretation.",
    });
  }

  if (context.storageReadinessScore < 66) {
    gaps.push({
      id: "HQR_GAP_002",
      label: "Storage readiness below review threshold",
      severity: context.storageReadinessScore < 56 ? "blocking" : "warning",
      source: "storage readiness score",
      reason: `Storage readiness score is ${context.storageReadinessScore}/100.`,
      manualCollectionAction: "Ask reviewer to validate storage and handling context manually.",
    });
  }

  if (context.logisticsReadinessScore < 66) {
    gaps.push({
      id: "HQR_GAP_003",
      label: "Logistics readiness requires review",
      severity: context.logisticsReadinessScore < 56 ? "blocking" : "warning",
      source: "logistics readiness",
      reason: `Logistics readiness score is ${context.logisticsReadinessScore}/100.`,
      manualCollectionAction: "Route logistics feasibility to manual operations review.",
    });
  }

  const criticalZones = zones.filter((zone) => zone.tier === "critical");

  if (criticalZones.length > 0) {
    gaps.push({
      id: "HQR_GAP_004",
      label: "Critical harvest pressure concentration",
      severity: criticalZones.length > 2 ? "blocking" : "warning",
      source: "harvest zones",
      reason: `${criticalZones.length} simulated zones show critical harvest quality pressure.`,
      manualCollectionAction: "Route zones to human review without automated work.",
    });
  }

  const blockedLanes = lanes.filter((lane) => lane.readinessBand === "blocked");

  blockedLanes.forEach((lane, index) => {
    gaps.push({
      id: `HQR_GAP_${String(index + 5).padStart(3, "0")}`,
      label: `${lane.lane} lane blocked`,
      severity: "blocking",
      source: lane.id,
      reason: `Readiness score is ${lane.readinessScore}/100.`,
      manualCollectionAction: "Resolve evidence requirements and hard stops before review.",
    });
  });

  return gaps;
}

function buildGovernanceStops(context: Required<HarvestQualityReadinessInput>): HarvestGovernanceStop[] {
  return [
    {
      id: "HQR_STOP_001",
      stop: "Provider execution locked",
      enforced: true,
      reason: "Harvest quality readiness is deterministic and local until explicit provider activation.",
      reviewer: "safety reviewer",
    },
    {
      id: "HQR_STOP_002",
      stop: "Persistence locked",
      enforced: true,
      reason: "No harvest scenario, evidence or readiness state is written to storage.",
      reviewer: "operations reviewer",
    },
    {
      id: "HQR_STOP_003",
      stop: "Operational automation locked",
      enforced: true,
      reason: "No harvest task, work order, schedule or execution can be created.",
      reviewer: context.reviewerRole,
    },
    {
      id: "HQR_STOP_004",
      stop: "Forecast and prescription outputs locked",
      enforced: true,
      reason: "No production forecast, product recommendation or dosage guidance is produced.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildManualReviewBoard(
  context: Required<HarvestQualityReadinessInput>,
  scenarios: HarvestScenario[],
  gaps: HarvestEvidenceGap[],
): HarvestManualReviewItem[] {
  return [
    {
      id: "HQR_REVIEW_001",
      decisionTopic: "Should maturity evidence be prioritized before harvest review?",
      reviewer: context.reviewerRole,
      evidenceNeeded: ["Maturity observation", "Crop family", "Field review note"],
      safeOutcome: "Manual evidence collection discussion only; no task is created.",
      manualOnly: true,
    },
    {
      id: "HQR_REVIEW_002",
      decisionTopic: "Which quality pressure signals need agronomist review?",
      reviewer: "senior agronomist",
      evidenceNeeded: ["Quality signal", "Phenology context", "Pest and disease pressure"],
      safeOutcome: "Review topic only; no product, intervention or forecast output.",
      manualOnly: true,
    },
    {
      id: "HQR_REVIEW_003",
      decisionTopic: "Can harvest readiness topics enter board review?",
      reviewer: "executive agronomic reviewer",
      evidenceNeeded: scenarios.map((scenario) => scenario.title),
      safeOutcome: "Redacted board topic only; no production forecast.",
      manualOnly: true,
    },
    {
      id: "HQR_REVIEW_004",
      decisionTopic: "Which evidence gaps block harvest-ready status?",
      reviewer: "evidence quality reviewer",
      evidenceNeeded: gaps.map((gap) => gap.label).slice(0, 6),
      safeOutcome: "Manual evidence resolution plan only.",
      manualOnly: true,
    },
  ];
}

export function buildAiHarvestQualityReadinessReport(
  input: HarvestQualityReadinessInput = {},
): HarvestQualityReadinessReport {
  const context = normalizeInput(input);
  const harvestZones = buildHarvestZones(context);
  const qualitySignals = buildQualitySignals(context);
  const reviewLanes = buildReviewLanes(context);
  const harvestScenarios = buildHarvestScenarios(context);
  const evidenceGaps = buildEvidenceGaps(context, harvestZones, reviewLanes);
  const governanceStops = buildGovernanceStops(context);
  const manualReviewBoard = buildManualReviewBoard(context, harvestScenarios, evidenceGaps);

  const zoneAverage =
    harvestZones.reduce(
      (sum, zone) =>
        sum +
        zone.maturityWindowScore +
        zone.storageReadinessScore +
        zone.logisticsReadinessScore -
        tierWeight[zone.tier] / 2,
      0,
    ) / Math.max(1, harvestZones.length * 3);

  const laneAverage =
    reviewLanes.reduce((sum, lane) => sum + lane.readinessScore, 0) / Math.max(1, reviewLanes.length);

  const signalAverage =
    qualitySignals.reduce((sum, signal) => sum + signal.confidenceScore - tierWeight[signal.tier] / 3, 0) /
    Math.max(1, qualitySignals.length);

  const blockingPenalty = evidenceGaps.filter((gap) => gap.severity === "blocking").length * 10;
  const scenarioPressure =
    harvestScenarios.reduce(
      (sum, scenario) => sum + priorityWeight[scenario.priority] + impactWeight[scenario.impact],
      0,
    ) / Math.max(1, harvestScenarios.length * 4);

  const readinessScore = clampScore(
    zoneAverage / 3 +
      laneAverage / 3 +
      signalAverage / 3 +
      context.phenologyScore / 8 +
      context.climateWaterScore / 8 +
      context.boardPackScore / 10 +
      scenarioPressure -
      blockingPenalty,
  );

  const farmHarvestTier = tierFromScore(
    clampScore(
      (100 - context.harvestWindowScore) / 2 +
        context.qualityPressureScore / 2 +
        context.weatherExposureScore / 3 +
        context.pestDiseasePressureScore / 4 +
        context.activeCaseCount * 3 -
        context.storageReadinessScore / 6,
    ),
  );

  const readinessStatus = bandFromScore(
    readinessScore,
    evidenceGaps.filter((gap) => gap.severity === "blocking").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: HARVEST_QUALITY_READINESS,
    readinessScore,
    readinessStatus,
    farmHarvestTier,
    harvestZones,
    qualitySignals,
    reviewLanes,
    harvestScenarios,
    evidenceGaps,
    governanceStops,
    manualReviewBoard,
    redactedExportBundle: {
      exportId: "harvest_quality_readiness_v10_9_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "harvest zones",
        "quality signals",
        "review lanes",
        "harvest scenarios",
        "evidence gaps",
        "governance stops",
        "manual review board",
        "safety summary",
      ],
    },
    safetySummary: [
      "Harvest quality readiness is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No production forecast, product recommendation, dosage advice, public sharing or operational schedule is produced.",
      "Scenarios are manual review topics, not harvest instructions or production forecasts.",
      "Every harvest and post harvest decision remains behind human review and manual dispatch.",
    ],
  };
}

export const aiHarvestQualityReadinessVersion = "V10.9";
