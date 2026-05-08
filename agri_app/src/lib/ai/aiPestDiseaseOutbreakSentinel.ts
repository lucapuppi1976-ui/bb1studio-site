export type OutbreakSentinelMode = "dry-run" | "biosecurity-review";

export type OutbreakRiskTier = "low" | "watch" | "elevated" | "critical";

export type OutbreakReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "sentinel-ready";

export type PressureSignalType = "pest" | "disease" | "vector" | "abiotic-lookalike" | "quarantine-watch";

export type SurveillancePriority = "low" | "medium" | "high" | "urgent";

export type OutbreakScenarioImpact = "low" | "medium" | "high" | "severe";

export interface OutbreakSentinelReadiness {
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
  outbreakSentinelReady: true;
  biosecurityReviewReady: true;
  pressureForecastSandboxReady: true;
  surveillancePlanReady: true;
}

export interface OutbreakSentinelInput {
  cropPortfolio?: string[];
  fieldCount?: number;
  activeCaseCount?: number;
  symptomClusterCount?: number;
  humidityRiskScore?: number;
  heatStressRiskScore?: number;
  pestPressureProxy?: number;
  diseasePressureProxy?: number;
  vectorRiskProxy?: number;
  climateWaterRiskScore?: number;
  scoutingCoverageScore?: number;
  evidenceQualityScore?: number;
  protocolCoverageScore?: number;
  memoryQualityScore?: number;
  reviewerRole?: string;
}

export interface OutbreakRiskZone {
  id: string;
  cropFamily: string;
  simulatedZoneBand: "small" | "medium" | "large";
  riskTier: OutbreakRiskTier;
  pestPressureScore: number;
  diseasePressureScore: number;
  vectorRiskScore: number;
  evidenceQualityScore: number;
  reviewerConcern: string;
  blockers: string[];
}

export interface PressureSignal {
  id: string;
  signalType: PressureSignalType;
  label: string;
  pressureScore: number;
  confidenceScore: number;
  riskTier: OutbreakRiskTier;
  rationale: string;
  requiredManualEvidence: string[];
  prohibitedOutputs: string[];
}

export interface SurveillanceLane {
  id: string;
  lane: "field-scouting" | "symptom-evidence" | "vector-watch" | "disease-pressure" | "pest-pressure" | "biosecurity";
  priority: SurveillancePriority;
  readinessScore: number;
  readinessBand: OutbreakReadinessBand;
  objective: string;
  manualEvidenceRequired: string[];
  hardStops: string[];
}

export interface OutbreakScenario {
  id: string;
  title: string;
  impact: OutbreakScenarioImpact;
  priority: SurveillancePriority;
  simulatedChange: string;
  expectedContainmentProxy: number;
  expectedFalsePositiveRiskProxy: number;
  confidenceScore: number;
  manualReviewDecision: string;
  blockedAutomation: string[];
}

export interface OutbreakEvidenceGap {
  id: string;
  label: string;
  severity: "info" | "warning" | "blocking";
  source: string;
  reason: string;
  manualCollectionAction: string;
}

export interface BiosecurityStop {
  id: string;
  stop: string;
  enforced: true;
  reason: string;
  reviewer: string;
}

export interface OutbreakManualReviewItem {
  id: string;
  decisionTopic: string;
  reviewer: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface PestDiseaseOutbreakSentinelReport {
  generatedAt: string;
  mode: OutbreakSentinelMode;
  context: Required<OutbreakSentinelInput>;
  readiness: OutbreakSentinelReadiness;
  sentinelScore: number;
  sentinelStatus: OutbreakReadinessBand;
  farmOutbreakRiskTier: OutbreakRiskTier;
  riskZones: OutbreakRiskZone[];
  pressureSignals: PressureSignal[];
  surveillanceLanes: SurveillanceLane[];
  outbreakScenarios: OutbreakScenario[];
  evidenceGaps: OutbreakEvidenceGap[];
  biosecurityStops: BiosecurityStop[];
  manualReviewBoard: OutbreakManualReviewItem[];
  redactedExportBundle: {
    exportId: string;
    includesFieldIdentifiers: false;
    includesPrivateNotes: false;
    includesProviderPayloads: false;
    includesOperationalSecrets: false;
    includesRegulatedInstructions: false;
    sections: string[];
  };
  safetySummary: string[];
}

export const OUTBREAK_SENTINEL_READINESS: OutbreakSentinelReadiness = {
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
  outbreakSentinelReady: true,
  biosecurityReviewReady: true,
  pressureForecastSandboxReady: true,
  surveillancePlanReady: true,
};

const priorityWeight: Record<SurveillancePriority, number> = {
  low: 5,
  medium: 10,
  high: 17,
  urgent: 25,
};

const impactWeight: Record<OutbreakScenarioImpact, number> = {
  low: 5,
  medium: 12,
  high: 21,
  severe: 32,
};

const riskWeight: Record<OutbreakRiskTier, number> = {
  low: 5,
  watch: 12,
  elevated: 22,
  critical: 36,
};

function normalizeInput(input: OutbreakSentinelInput): Required<OutbreakSentinelInput> {
  return {
    cropPortfolio: input.cropPortfolio ?? ["tomato", "vineyard", "citrus", "olive"],
    fieldCount: input.fieldCount ?? 8,
    activeCaseCount: input.activeCaseCount ?? 7,
    symptomClusterCount: input.symptomClusterCount ?? 5,
    humidityRiskScore: input.humidityRiskScore ?? 74,
    heatStressRiskScore: input.heatStressRiskScore ?? 68,
    pestPressureProxy: input.pestPressureProxy ?? 71,
    diseasePressureProxy: input.diseasePressureProxy ?? 78,
    vectorRiskProxy: input.vectorRiskProxy ?? 62,
    climateWaterRiskScore: input.climateWaterRiskScore ?? 76,
    scoutingCoverageScore: input.scoutingCoverageScore ?? 72,
    evidenceQualityScore: input.evidenceQualityScore ?? 66,
    protocolCoverageScore: input.protocolCoverageScore ?? 79,
    memoryQualityScore: input.memoryQualityScore ?? 82,
    reviewerRole: input.reviewerRole ?? "biosecurity agronomic reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function riskFromScore(score: number): OutbreakRiskTier {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "low";
}

function bandFromScore(score: number, blockingCount: number): OutbreakReadinessBand {
  if (blockingCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockingCount === 0) return "sentinel-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function priorityFromRisk(riskTier: OutbreakRiskTier): SurveillancePriority {
  if (riskTier === "critical") return "urgent";
  if (riskTier === "elevated") return "high";
  if (riskTier === "watch") return "medium";
  return "low";
}

function buildRiskZones(context: Required<OutbreakSentinelInput>): OutbreakRiskZone[] {
  const crops = context.cropPortfolio.length > 0 ? context.cropPortfolio : ["mixed"];
  const zoneCount = Math.max(3, Math.min(8, context.fieldCount));

  return Array.from({ length: zoneCount }, (_, index) => {
    const cropFamily = crops[index % crops.length] ?? "mixed";
    const pestPressureScore = clampScore(context.pestPressureProxy + index * 2 - context.scoutingCoverageScore / 10);
    const diseasePressureScore = clampScore(context.diseasePressureProxy + context.humidityRiskScore / 6 - index * 2);
    const vectorRiskScore = clampScore(context.vectorRiskProxy + context.heatStressRiskScore / 8 - index * 3);
    const evidenceQualityScore = clampScore(context.evidenceQualityScore + context.scoutingCoverageScore / 4 - index * 4);
    const riskScore = clampScore(
      (pestPressureScore + diseasePressureScore + vectorRiskScore) / 3 +
        context.symptomClusterCount * 4 -
        evidenceQualityScore / 5,
    );
    const riskTier = riskFromScore(riskScore);

    return {
      id: `PDS-ZONE-${String(index + 1).padStart(3, "0")}`,
      cropFamily,
      simulatedZoneBand: index % 3 === 0 ? "large" : index % 3 === 1 ? "medium" : "small",
      riskTier,
      pestPressureScore,
      diseasePressureScore,
      vectorRiskScore,
      evidenceQualityScore,
      reviewerConcern:
        riskTier === "critical"
          ? "Critical simulated pest-disease risk requires immediate human biosecurity review."
          : riskTier === "elevated"
            ? "Elevated pest-disease pressure should be routed to manual surveillance review."
            : "Keep under periodic sentinel monitoring.",
      blockers:
        evidenceQualityScore < 60 || riskTier === "critical"
          ? ["Evidence quality or critical risk requires manual review before any interpretation."]
          : [],
    };
  });
}

function buildPressureSignals(context: Required<OutbreakSentinelInput>): PressureSignal[] {
  const pressureTypes: PressureSignalType[] = ["pest", "disease", "vector", "abiotic-lookalike", "quarantine-watch"];

  return pressureTypes.map((signalType, index) => {
    const baseScore =
      signalType === "pest"
        ? context.pestPressureProxy
        : signalType === "disease"
          ? context.diseasePressureProxy
          : signalType === "vector"
            ? context.vectorRiskProxy
            : signalType === "abiotic-lookalike"
              ? context.heatStressRiskScore
              : Math.max(context.pestPressureProxy, context.diseasePressureProxy) - 5;

    const pressureScore = clampScore(baseScore + context.symptomClusterCount * 3 - index * 2);
    const confidenceScore = clampScore(context.evidenceQualityScore + context.protocolCoverageScore / 5 - index * 3);
    const riskTier = riskFromScore(clampScore(pressureScore + (100 - confidenceScore) / 4));

    return {
      id: `PDS-SIGNAL-${String(index + 1).padStart(3, "0")}`,
      signalType,
      label:
        signalType === "abiotic-lookalike"
          ? "Abiotic lookalike guard"
          : signalType === "quarantine-watch"
            ? "Biosecurity quarantine watch"
            : `${signalType} pressure signal`,
      pressureScore,
      confidenceScore,
      riskTier,
      rationale: "Signal is advisory and must be verified by human field evidence before escalation.",
      requiredManualEvidence: [
        "Symptom distribution notes",
        "Affected and unaffected comparison",
        "Crop stage confirmation",
        "Human scout observation",
      ],
      prohibitedOutputs: [
        "Product prescription",
        "Dosage advice",
        "Automatic task creation",
        "Automatic intervention",
      ],
    };
  });
}

function buildSurveillanceLanes(context: Required<OutbreakSentinelInput>): SurveillanceLane[] {
  const lanes: SurveillanceLane[] = [
    {
      id: "PDS-LANE-001",
      lane: "field-scouting",
      priority: context.scoutingCoverageScore < 70 ? "urgent" : "high",
      readinessScore: clampScore(context.scoutingCoverageScore - context.symptomClusterCount * 2),
      readinessBand: "simulation-ready",
      objective: "Prioritize manual surveillance of zones with overlapping pest and disease pressure.",
      manualEvidenceRequired: ["Manual scout route", "Current access status", "Wide and close visual evidence"],
      hardStops: ["No scout dispatch", "No task creation"],
    },
    {
      id: "PDS-LANE-002",
      lane: "symptom-evidence",
      priority: context.evidenceQualityScore < 65 ? "urgent" : "high",
      readinessScore: clampScore(context.evidenceQualityScore - context.symptomClusterCount),
      readinessBand: "simulation-ready",
      objective: "Close symptom evidence gaps before early warning interpretation.",
      manualEvidenceRequired: ["Symptom cluster photos", "Affected versus unaffected comparison", "Field notes"],
      hardStops: ["No diagnosis finalization", "No treatment recommendation"],
    },
    {
      id: "PDS-LANE-003",
      lane: "vector-watch",
      priority: context.vectorRiskProxy >= 70 ? "high" : "medium",
      readinessScore: clampScore(100 - context.vectorRiskProxy + context.evidenceQualityScore / 2),
      readinessBand: "simulation-ready",
      objective: "Simulate vector-risk watch without triggering public or operational alerts.",
      manualEvidenceRequired: ["Vector observation notes", "Trap or scouting context if available", "Human reviewer confirmation"],
      hardStops: ["No public sharing", "No automatic alert"],
    },
    {
      id: "PDS-LANE-004",
      lane: "disease-pressure",
      priority: context.diseasePressureProxy >= 78 ? "urgent" : "high",
      readinessScore: clampScore(100 - context.diseasePressureProxy + context.humidityRiskScore / 4 + context.protocolCoverageScore / 4),
      readinessBand: "simulation-ready",
      objective: "Review humidity-linked disease pressure conservatively.",
      manualEvidenceRequired: ["Humidity context", "Lesion localization", "Temporal symptom change"],
      hardStops: ["No product advice", "No dosage"],
    },
    {
      id: "PDS-LANE-005",
      lane: "pest-pressure",
      priority: context.pestPressureProxy >= 75 ? "high" : "medium",
      readinessScore: clampScore(100 - context.pestPressureProxy + context.scoutingCoverageScore / 3),
      readinessBand: "simulation-ready",
      objective: "Simulate pest pressure watch and evidence requirements.",
      manualEvidenceRequired: ["Pest-like symptom notes", "Crop-specific protocol review", "Human field validation"],
      hardStops: ["No pesticide recommendation", "No automatic work order"],
    },
    {
      id: "PDS-LANE-006",
      lane: "biosecurity",
      priority: "high",
      readinessScore: clampScore((context.memoryQualityScore + context.protocolCoverageScore + context.evidenceQualityScore) / 3),
      readinessBand: "simulation-ready",
      objective: "Prepare biosecurity review topics without alerting or sharing externally.",
      manualEvidenceRequired: ["Biosecurity reviewer signoff", "Evidence quality score", "Protocol conflict review"],
      hardStops: ["No public share", "No quarantine instruction", "No regulated instruction"],
    },
  ];

  return lanes.map((lane) => ({
    ...lane,
    readinessBand: bandFromScore(lane.readinessScore, lane.readinessScore < 58 ? 1 : 0),
  }));
}

function buildOutbreakScenarios(context: Required<OutbreakSentinelInput>): OutbreakScenario[] {
  const diseaseImpact: OutbreakScenarioImpact = context.diseasePressureProxy >= 82 ? "severe" : context.diseasePressureProxy >= 70 ? "high" : "medium";
  const pestImpact: OutbreakScenarioImpact = context.pestPressureProxy >= 78 ? "high" : "medium";
  const vectorImpact: OutbreakScenarioImpact = context.vectorRiskProxy >= 72 ? "high" : "medium";
  const biosecurityImpact: OutbreakScenarioImpact =
    Math.max(context.pestPressureProxy, context.diseasePressureProxy, context.vectorRiskProxy) >= 84 ? "severe" : "high";

  return [
    {
      id: "PDS-SCENARIO-001",
      title: "Disease pressure early warning review",
      impact: diseaseImpact,
      priority: context.diseasePressureProxy >= 82 ? "urgent" : "high",
      simulatedChange: "Simulate escalation of disease-pressure evidence to human review before operational action.",
      expectedContainmentProxy: clampScore(impactWeight[diseaseImpact] + context.protocolCoverageScore / 3),
      expectedFalsePositiveRiskProxy: clampScore(100 - context.evidenceQualityScore + context.humidityRiskScore / 5),
      confidenceScore: clampScore(context.evidenceQualityScore + context.protocolCoverageScore / 5),
      manualReviewDecision: "Approve manual disease-pressure review only.",
      blockedAutomation: ["No treatment plan", "No product prescription", "No dosage"],
    },
    {
      id: "PDS-SCENARIO-002",
      title: "Pest pressure surveillance prioritization",
      impact: pestImpact,
      priority: context.pestPressureProxy >= 78 ? "high" : "medium",
      simulatedChange: "Simulate prioritizing pest-like symptom clusters for field scouting.",
      expectedContainmentProxy: clampScore(impactWeight[pestImpact] + context.scoutingCoverageScore / 3),
      expectedFalsePositiveRiskProxy: clampScore(100 - context.evidenceQualityScore + context.heatStressRiskScore / 6),
      confidenceScore: clampScore(context.scoutingCoverageScore - context.symptomClusterCount * 2),
      manualReviewDecision: "Review pest pressure manually; no pesticide or operation is generated.",
      blockedAutomation: ["No scouting task", "No pesticide suggestion", "No intervention"],
    },
    {
      id: "PDS-SCENARIO-003",
      title: "Vector watch sandbox",
      impact: vectorImpact,
      priority: context.vectorRiskProxy >= 72 ? "high" : "medium",
      simulatedChange: "Simulate vector watch topics without public alerts or automatic notifications.",
      expectedContainmentProxy: clampScore(impactWeight[vectorImpact] + context.memoryQualityScore / 4),
      expectedFalsePositiveRiskProxy: clampScore(100 - context.evidenceQualityScore + context.vectorRiskProxy / 5),
      confidenceScore: clampScore(context.evidenceQualityScore - context.symptomClusterCount),
      manualReviewDecision: "Route vector watch to biosecurity reviewer only.",
      blockedAutomation: ["No public alert", "No external sharing", "No automatic execution"],
    },
    {
      id: "PDS-SCENARIO-004",
      title: "Biosecurity board topic",
      impact: biosecurityImpact,
      priority: "high",
      simulatedChange: "Simulate adding pest-disease sentinel topics to executive board review.",
      expectedContainmentProxy: clampScore(context.protocolCoverageScore / 2 + context.memoryQualityScore / 3),
      expectedFalsePositiveRiskProxy: clampScore(100 - context.evidenceQualityScore + context.symptomClusterCount * 4),
      confidenceScore: clampScore((context.evidenceQualityScore + context.protocolCoverageScore + context.memoryQualityScore) / 3),
      manualReviewDecision: "Prepare redacted biosecurity board topic only.",
      blockedAutomation: ["No public share", "No quarantine instruction", "No regulated instruction"],
    },
  ];
}

function buildEvidenceGaps(
  context: Required<OutbreakSentinelInput>,
  zones: OutbreakRiskZone[],
  lanes: SurveillanceLane[],
): OutbreakEvidenceGap[] {
  const gaps: OutbreakEvidenceGap[] = [];

  if (context.evidenceQualityScore < 70) {
    gaps.push({
      id: "PDS-GAP-001",
      label: "Evidence quality below sentinel threshold",
      severity: context.evidenceQualityScore < 58 ? "blocking" : "warning",
      source: "evidence quality score",
      reason: `Evidence quality score is ${context.evidenceQualityScore}/100.`,
      manualCollectionAction: "Collect additional affected and unaffected observations before sentinel escalation.",
    });
  }

  if (context.symptomClusterCount > 4) {
    gaps.push({
      id: "PDS-GAP-002",
      label: "Multiple symptom clusters require differentiation",
      severity: context.symptomClusterCount > 6 ? "blocking" : "warning",
      source: "symptom cluster pressure",
      reason: `${context.symptomClusterCount} symptom clusters are active in the simulation.`,
      manualCollectionAction: "Group symptom clusters by crop, field zone and visual pattern before review.",
    });
  }

  if (context.protocolCoverageScore < 76) {
    gaps.push({
      id: "PDS-GAP-003",
      label: "Crop protocol coverage gap",
      severity: context.protocolCoverageScore < 68 ? "blocking" : "warning",
      source: "crop protocol builder",
      reason: `Protocol coverage score is ${context.protocolCoverageScore}/100.`,
      manualCollectionAction: "Review crop-specific protocol applicability and conflict register.",
    });
  }

  const criticalZones = zones.filter((zone) => zone.riskTier === "critical");

  if (criticalZones.length > 0) {
    gaps.push({
      id: "PDS-GAP-004",
      label: "Critical outbreak risk concentration",
      severity: criticalZones.length > 2 ? "blocking" : "warning",
      source: "risk zones",
      reason: `${criticalZones.length} simulated zones show critical outbreak risk.`,
      manualCollectionAction: "Route zones to human biosecurity review without public alerts or automatic action.",
    });
  }

  const blockedLanes = lanes.filter((lane) => lane.readinessBand === "blocked");

  blockedLanes.forEach((lane, index) => {
    gaps.push({
      id: `PDS-GAP-${String(index + 5).padStart(3, "0")}`,
      label: `${lane.lane} lane blocked`,
      severity: "blocking",
      source: lane.id,
      reason: `Readiness score is ${lane.readinessScore}/100.`,
      manualCollectionAction: "Resolve lane evidence requirements and hard stops before review.",
    });
  });

  return gaps;
}

function buildBiosecurityStops(context: Required<OutbreakSentinelInput>): BiosecurityStop[] {
  return [
    {
      id: "PDS-STOP-001",
      stop: "Provider execution locked",
      enforced: true,
      reason: "Outbreak sentinel is deterministic and local until explicit provider activation.",
      reviewer: "safety reviewer",
    },
    {
      id: "PDS-STOP-002",
      stop: "Persistence locked",
      enforced: true,
      reason: "No pressure signal, scenario or evidence state is written to storage.",
      reviewer: "operations reviewer",
    },
    {
      id: "PDS-STOP-003",
      stop: "Operational automation locked",
      enforced: true,
      reason: "No scouting task, intervention, alert or execution can be created.",
      reviewer: context.reviewerRole,
    },
    {
      id: "PDS-STOP-004",
      stop: "Prescriptive and regulated outputs locked",
      enforced: true,
      reason: "No product prescription, dosage advice, quarantine instruction or regulated instruction is produced.",
      reviewer: "biosecurity safety reviewer",
    },
  ];
}

function buildManualReviewBoard(
  context: Required<OutbreakSentinelInput>,
  scenarios: OutbreakScenario[],
  gaps: OutbreakEvidenceGap[],
): OutbreakManualReviewItem[] {
  return [
    {
      id: "PDS-REVIEW-001",
      decisionTopic: "Should disease-pressure signals be escalated to human review?",
      reviewer: context.reviewerRole,
      evidenceNeeded: ["Humidity context", "Lesion localization", "Affected and unaffected comparison"],
      safeOutcome: "Manual disease-pressure review only; no product or dosage output.",
      manualOnly: true,
    },
    {
      id: "PDS-REVIEW-002",
      decisionTopic: "Which pest-like symptom clusters require field scouting first?",
      reviewer: "senior agronomist",
      evidenceNeeded: ["Symptom cluster map", "Crop stage", "Abiotic lookalike guard"],
      safeOutcome: "Manual scouting discussion only; no task is created.",
      manualOnly: true,
    },
    {
      id: "PDS-REVIEW-003",
      decisionTopic: "Can vector watch be included in biosecurity board review?",
      reviewer: "biosecurity reviewer",
      evidenceNeeded: scenarios.map((scenario) => scenario.title),
      safeOutcome: "Redacted biosecurity topic only; no public alert.",
      manualOnly: true,
    },
    {
      id: "PDS-REVIEW-004",
      decisionTopic: "Which evidence gaps block sentinel-ready status?",
      reviewer: "evidence quality reviewer",
      evidenceNeeded: gaps.map((gap) => gap.label).slice(0, 6),
      safeOutcome: "Manual evidence completion plan only.",
      manualOnly: true,
    },
  ];
}

export function buildAiPestDiseaseOutbreakSentinelReport(
  input: OutbreakSentinelInput = {},
): PestDiseaseOutbreakSentinelReport {
  const context = normalizeInput(input);
  const riskZones = buildRiskZones(context);
  const pressureSignals = buildPressureSignals(context);
  const surveillanceLanes = buildSurveillanceLanes(context);
  const outbreakScenarios = buildOutbreakScenarios(context);
  const evidenceGaps = buildEvidenceGaps(context, riskZones, surveillanceLanes);
  const biosecurityStops = buildBiosecurityStops(context);
  const manualReviewBoard = buildManualReviewBoard(context, outbreakScenarios, evidenceGaps);

  const zoneAverage =
    riskZones.reduce(
      (sum, zone) =>
        sum +
        zone.evidenceQualityScore +
        zone.pestPressureScore / 4 +
        zone.diseasePressureScore / 4 -
        riskWeight[zone.riskTier] / 2,
      0,
    ) / Math.max(1, riskZones.length);

  const laneAverage =
    surveillanceLanes.reduce((sum, lane) => sum + lane.readinessScore, 0) / Math.max(1, surveillanceLanes.length);

  const signalAverage =
    pressureSignals.reduce((sum, signal) => sum + signal.confidenceScore - riskWeight[signal.riskTier] / 3, 0) /
    Math.max(1, pressureSignals.length);

  const blockingPenalty = evidenceGaps.filter((gap) => gap.severity === "blocking").length * 10;
  const scenarioPressure =
    outbreakScenarios.reduce(
      (sum, scenario) => sum + priorityWeight[scenario.priority] + impactWeight[scenario.impact],
      0,
    ) / Math.max(1, outbreakScenarios.length * 4);

  const sentinelScore = clampScore(
    zoneAverage / 3 +
      laneAverage / 3 +
      signalAverage / 3 +
      context.memoryQualityScore / 8 +
      context.protocolCoverageScore / 8 +
      scenarioPressure -
      blockingPenalty,
  );

  const farmOutbreakRiskTier = riskFromScore(
    clampScore(
      (context.pestPressureProxy + context.diseasePressureProxy + context.vectorRiskProxy) / 3 +
        context.symptomClusterCount * 5 +
        context.humidityRiskScore / 6 -
        context.evidenceQualityScore / 5,
    ),
  );

  const sentinelStatus = bandFromScore(
    sentinelScore,
    evidenceGaps.filter((gap) => gap.severity === "blocking").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: OUTBREAK_SENTINEL_READINESS,
    sentinelScore,
    sentinelStatus,
    farmOutbreakRiskTier,
    riskZones,
    pressureSignals,
    surveillanceLanes,
    outbreakScenarios,
    evidenceGaps,
    biosecurityStops,
    manualReviewBoard,
    redactedExportBundle: {
      exportId: "pest-disease-outbreak-sentinel-v10-6-redacted-dry-run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalSecrets: false,
      includesRegulatedInstructions: false,
      sections: [
        "context",
        "risk zones",
        "pressure signals",
        "surveillance lanes",
        "outbreak scenarios",
        "evidence gaps",
        "biosecurity stops",
        "manual review board",
        "safety summary",
      ],
    },
    safetySummary: [
      "Pest-disease outbreak sentinel is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product prescription, dosage advice, public alert, quarantine instruction or regulated instruction is produced.",
      "Scenarios are manual-review topics, not operational instructions.",
      "Every pest-disease decision remains behind human review and manual dispatch.",
    ],
  };
}

export const aiPestDiseaseOutbreakSentinelVersion = "V10.6";
