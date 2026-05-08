export type FarmDigitalTwinMode = "dry-run" | "readiness-review";

export type TwinRiskTier = "low" | "watch" | "elevated" | "critical";

export type TwinReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "executive-ready";

export type TwinScenarioImpact = "low" | "medium" | "high" | "severe";

export interface FarmDigitalTwinReadinessGuardrail {
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
  digitalTwinSimulationReady: true;
  fieldStateModelReady: true;
  scenarioSandboxReady: true;
  operationalReadinessModelReady: true;
}

export interface FarmDigitalTwinReadinessInput {
  cropPortfolio?: string[];
  fieldCount?: number;
  activeCaseCount?: number;
  highRiskFieldCount?: number;
  evidenceGapCount?: number;
  scoutingCoverageScore?: number;
  protocolCoverageScore?: number;
  memoryQualityScore?: number;
  boardPackScore?: number;
  weatherVolatilityProxy?: number;
  reviewerRole?: string;
}

export interface FieldDigitalTwinNode {
  id: string;
  cropFamily: string;
  simulatedAreaBand: "small" | "medium" | "large";
  riskTier: TwinRiskTier;
  readinessScore: number;
  openCasePressure: number;
  evidenceCompletenessScore: number;
  reviewerConcern: string;
  blockedSignals: string[];
}

export interface TwinCasePressureNode {
  id: string;
  fieldNodeId: string;
  caseFamily: string;
  pressureScore: number;
  evidenceGapScore: number;
  riskTier: TwinRiskTier;
  manualReviewReason: string;
}

export interface TwinOperationalReadinessNode {
  id: string;
  lane: "scouting" | "evidence" | "protocol" | "intervention-readiness" | "governance" | "executive-board";
  readinessScore: number;
  readinessBand: TwinReadinessBand;
  requiredManualEvidence: string[];
  hardStops: string[];
}

export interface TwinScenarioSimulation {
  id: string;
  title: string;
  impact: TwinScenarioImpact;
  simulatedChange: string;
  expectedBenefitProxy: number;
  expectedRiskProxy: number;
  confidenceScore: number;
  reviewerDecision: string;
  blockedAutomation: string[];
}

export interface TwinReadinessGap {
  id: string;
  label: string;
  severity: "info" | "warning" | "blocking";
  source: string;
  reason: string;
  manualResolution: string;
}

export interface TwinGovernanceStop {
  id: string;
  stop: string;
  enforced: true;
  reason: string;
  reviewer: string;
}

export interface TwinManualReviewItem {
  id: string;
  decisionTopic: string;
  reviewer: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface FarmDigitalTwinReadinessReport {
  generatedAt: string;
  mode: FarmDigitalTwinMode;
  context: Required<FarmDigitalTwinReadinessInput>;
  readiness: FarmDigitalTwinReadinessGuardrail;
  twinScore: number;
  twinStatus: TwinReadinessBand;
  farmRiskTier: TwinRiskTier;
  fieldNodes: FieldDigitalTwinNode[];
  casePressureNodes: TwinCasePressureNode[];
  operationalReadiness: TwinOperationalReadinessNode[];
  scenarioSimulations: TwinScenarioSimulation[];
  readinessGaps: TwinReadinessGap[];
  governanceStops: TwinGovernanceStop[];
  manualReviewBoard: TwinManualReviewItem[];
  redactedExportBundle: {
    exportId: string;
    includesFieldIdentifiers: false;
    includesPrivateNotes: false;
    includesProviderPayloads: false;
    includesOperationalSecrets: false;
    includesFinancialActuals: false;
    sections: string[];
  };
  safetySummary: string[];
}

export const FARM_DIGITAL_TWIN_READINESS: FarmDigitalTwinReadinessGuardrail = {
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
  digitalTwinSimulationReady: true,
  fieldStateModelReady: true,
  scenarioSandboxReady: true,
  operationalReadinessModelReady: true,
};

const riskWeight: Record<TwinRiskTier, number> = {
  low: 6,
  watch: 12,
  elevated: 22,
  critical: 34,
};

const impactWeight: Record<TwinScenarioImpact, number> = {
  low: 6,
  medium: 12,
  high: 20,
  severe: 30,
};

function normalizeInput(input: FarmDigitalTwinReadinessInput): Required<FarmDigitalTwinReadinessInput> {
  return {
    cropPortfolio: input.cropPortfolio ?? ["tomato", "vineyard", "citrus", "olive"],
    fieldCount: input.fieldCount ?? 8,
    activeCaseCount: input.activeCaseCount ?? 7,
    highRiskFieldCount: input.highRiskFieldCount ?? 3,
    evidenceGapCount: input.evidenceGapCount ?? 5,
    scoutingCoverageScore: input.scoutingCoverageScore ?? 72,
    protocolCoverageScore: input.protocolCoverageScore ?? 79,
    memoryQualityScore: input.memoryQualityScore ?? 82,
    boardPackScore: input.boardPackScore ?? 76,
    weatherVolatilityProxy: input.weatherVolatilityProxy ?? 58,
    reviewerRole: input.reviewerRole ?? "digital twin agronomic reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function riskFromScore(score: number): TwinRiskTier {
  if (score >= 82) return "critical";
  if (score >= 65) return "elevated";
  if (score >= 42) return "watch";
  return "low";
}

function bandFromScore(score: number, blockingCount: number): TwinReadinessBand {
  if (blockingCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockingCount === 0) return "executive-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildFieldNodes(context: Required<FarmDigitalTwinReadinessInput>): FieldDigitalTwinNode[] {
  const crops = context.cropPortfolio.length > 0 ? context.cropPortfolio : ["mixed"];
  const nodeCount = Math.max(3, Math.min(8, context.fieldCount));

  return Array.from({ length: nodeCount }, (_, index) => {
    const cropFamily = crops[index % crops.length] ?? "mixed";
    const pressure = Math.max(0, context.activeCaseCount - index);
    const evidencePenalty = Math.max(0, context.evidenceGapCount - index) * 4;
    const riskScore =
      pressure * 8 +
      context.highRiskFieldCount * 7 +
      context.weatherVolatilityProxy / 3 -
      index * 4;

    const readinessScore = clampScore(
      context.scoutingCoverageScore +
        context.protocolCoverageScore / 4 +
        context.memoryQualityScore / 5 -
        evidencePenalty -
        pressure * 3,
    );

    const riskTier = riskFromScore(clampScore(riskScore));

    return {
      id: `FDT-FIELD-${String(index + 1).padStart(3, "0")}`,
      cropFamily,
      simulatedAreaBand: index % 3 === 0 ? "large" : index % 3 === 1 ? "medium" : "small",
      riskTier,
      readinessScore,
      openCasePressure: clampScore(pressure * 12),
      evidenceCompletenessScore: clampScore(100 - evidencePenalty),
      reviewerConcern:
        riskTier === "critical"
          ? "Critical simulated risk requires manual executive review."
          : riskTier === "elevated"
            ? "Elevated risk should be prioritized for manual scouting review."
            : "Keep under periodic review.",
      blockedSignals:
        readinessScore < 65
          ? ["Readiness below safe review threshold.", "Evidence completeness needs manual verification."]
          : [],
    };
  });
}

function buildCasePressureNodes(
  context: Required<FarmDigitalTwinReadinessInput>,
  fields: FieldDigitalTwinNode[],
): TwinCasePressureNode[] {
  const families = ["canopy stress", "disease pressure", "abiotic stress", "evidence gap", "protocol mismatch"];

  return fields.slice(0, Math.min(fields.length, context.activeCaseCount)).map((field, index) => {
    const pressureScore = clampScore(field.openCasePressure + context.weatherVolatilityProxy / 2 + index * 3);
    const evidenceGapScore = clampScore(context.evidenceGapCount * 10 - index * 5);

    return {
      id: `FDT-CASE-${String(index + 1).padStart(3, "0")}`,
      fieldNodeId: field.id,
      caseFamily: families[index % families.length] ?? "field review",
      pressureScore,
      evidenceGapScore,
      riskTier: riskFromScore(clampScore(pressureScore + evidenceGapScore / 3)),
      manualReviewReason: "Case pressure remains advisory and must be reviewed before any operational decision.",
    };
  });
}

function buildOperationalReadiness(
  context: Required<FarmDigitalTwinReadinessInput>,
): TwinOperationalReadinessNode[] {
  const lanes: TwinOperationalReadinessNode[] = [
    {
      id: "FDT-READY-001",
      lane: "scouting",
      readinessScore: clampScore(context.scoutingCoverageScore - context.evidenceGapCount * 2),
      readinessBand: "simulation-ready",
      requiredManualEvidence: ["Manual scout route confirmation", "Current field access status"],
      hardStops: ["No automatic scout dispatch", "No task creation"],
    },
    {
      id: "FDT-READY-002",
      lane: "evidence",
      readinessScore: clampScore(86 - context.evidenceGapCount * 7),
      readinessBand: "simulation-ready",
      requiredManualEvidence: ["Photo bundle completeness", "Human observation note", "Evidence gap closure"],
      hardStops: ["No diagnosis finalization", "No treatment recommendation"],
    },
    {
      id: "FDT-READY-003",
      lane: "protocol",
      readinessScore: clampScore(context.protocolCoverageScore),
      readinessBand: "simulation-ready",
      requiredManualEvidence: ["Crop protocol coverage", "Phenology confirmation", "Conflict register review"],
      hardStops: ["No product prescription", "No dosage advice"],
    },
    {
      id: "FDT-READY-004",
      lane: "intervention-readiness",
      readinessScore: clampScore(context.boardPackScore - context.highRiskFieldCount * 5),
      readinessBand: "simulation-ready",
      requiredManualEvidence: ["Execution gate state", "Readiness blockers", "Reviewer signoff"],
      hardStops: ["No intervention creation", "No automatic execution"],
    },
    {
      id: "FDT-READY-005",
      lane: "governance",
      readinessScore: clampScore((context.memoryQualityScore + context.protocolCoverageScore) / 2),
      readinessBand: "simulation-ready",
      requiredManualEvidence: ["Memory quality guard", "Knowledge governance notes", "Rollback triggers"],
      hardStops: ["No memory write", "No memory promotion"],
    },
    {
      id: "FDT-READY-006",
      lane: "executive-board",
      readinessScore: clampScore(context.boardPackScore - context.evidenceGapCount * 3),
      readinessBand: "simulation-ready",
      requiredManualEvidence: ["Board pack review", "Decision cards", "Risk register"],
      hardStops: ["No public sharing", "No automated decision"],
    },
  ];

  return lanes.map((lane) => ({
    ...lane,
    readinessBand: bandFromScore(lane.readinessScore, lane.readinessScore < 60 ? 1 : 0),
  }));
}

function buildScenarioSimulations(
  context: Required<FarmDigitalTwinReadinessInput>,
): TwinScenarioSimulation[] {
  const evidenceImpact: TwinScenarioImpact = context.evidenceGapCount >= 6 ? "severe" : context.evidenceGapCount >= 3 ? "high" : "medium";
  const riskImpact: TwinScenarioImpact = context.highRiskFieldCount >= 4 ? "severe" : context.highRiskFieldCount >= 2 ? "high" : "medium";

  return [
    {
      id: "FDT-SCENARIO-001",
      title: "Evidence completion scenario",
      impact: evidenceImpact,
      simulatedChange: "Simulate closing the highest-priority evidence gaps before board review.",
      expectedBenefitProxy: clampScore(impactWeight[evidenceImpact] + context.protocolCoverageScore / 3),
      expectedRiskProxy: clampScore(context.evidenceGapCount * 7),
      confidenceScore: clampScore(88 - context.evidenceGapCount * 4),
      reviewerDecision: "Approve manual evidence collection priority only.",
      blockedAutomation: ["No automatic task", "No automatic evidence write"],
    },
    {
      id: "FDT-SCENARIO-002",
      title: "High-risk field containment scenario",
      impact: riskImpact,
      simulatedChange: "Simulate prioritizing high-risk fields for manual scouting and governance review.",
      expectedBenefitProxy: clampScore(impactWeight[riskImpact] + context.scoutingCoverageScore / 4),
      expectedRiskProxy: clampScore(context.highRiskFieldCount * 12 + context.weatherVolatilityProxy / 3),
      confidenceScore: clampScore(82 - context.highRiskFieldCount * 4),
      reviewerDecision: "Review containment priorities without dispatching interventions.",
      blockedAutomation: ["No intervention creation", "No automatic execution"],
    },
    {
      id: "FDT-SCENARIO-003",
      title: "Protocol coverage improvement scenario",
      impact: context.protocolCoverageScore < 76 ? "high" : "medium",
      simulatedChange: "Simulate improving crop-specific protocol coverage before executive synthesis.",
      expectedBenefitProxy: clampScore(context.protocolCoverageScore / 2 + 20),
      expectedRiskProxy: clampScore(100 - context.protocolCoverageScore),
      confidenceScore: clampScore(context.protocolCoverageScore),
      reviewerDecision: "Review protocol gaps and conflicts manually.",
      blockedAutomation: ["No product prescription", "No dosage advice"],
    },
    {
      id: "FDT-SCENARIO-004",
      title: "Memory quality advisory scenario",
      impact: context.memoryQualityScore < 78 ? "high" : "low",
      simulatedChange: "Simulate using memory only as redacted advisory context.",
      expectedBenefitProxy: clampScore(context.memoryQualityScore / 2),
      expectedRiskProxy: clampScore(100 - context.memoryQualityScore),
      confidenceScore: clampScore(context.memoryQualityScore - 5),
      reviewerDecision: "Approve advisory context only; no memory write.",
      blockedAutomation: ["No memory persistence", "No memory promotion"],
    },
  ];
}

function buildReadinessGaps(
  context: Required<FarmDigitalTwinReadinessInput>,
  fields: FieldDigitalTwinNode[],
  readiness: TwinOperationalReadinessNode[],
): TwinReadinessGap[] {
  const gaps: TwinReadinessGap[] = [];

  if (context.evidenceGapCount > 0) {
    gaps.push({
      id: "FDT-GAP-001",
      label: "Evidence backlog",
      severity: context.evidenceGapCount > 4 ? "blocking" : "warning",
      source: "evidence lane",
      reason: `${context.evidenceGapCount} simulated evidence gaps remain open.`,
      manualResolution: "Prioritize manual evidence collection before reviewing operational scenarios.",
    });
  }

  const lowReadinessLanes = readiness.filter((lane) => lane.readinessScore < 65);

  lowReadinessLanes.forEach((lane, index) => {
    gaps.push({
      id: `FDT-GAP-${String(index + 2).padStart(3, "0")}`,
      label: `${lane.lane} readiness gap`,
      severity: lane.readinessScore < 55 ? "blocking" : "warning",
      source: lane.id,
      reason: `Readiness score is ${lane.readinessScore}/100.`,
      manualResolution: "Review required evidence and hard-stop list before any decision.",
    });
  });

  const highRiskNodes = fields.filter((field) => field.riskTier === "critical" || field.riskTier === "elevated");

  if (highRiskNodes.length > 0) {
    gaps.push({
      id: "FDT-GAP-009",
      label: "High-risk field concentration",
      severity: highRiskNodes.length > 3 ? "blocking" : "warning",
      source: "field digital twin nodes",
      reason: `${highRiskNodes.length} field nodes show elevated or critical simulated risk.`,
      manualResolution: "Send the field list to human review only; do not dispatch automated actions.",
    });
  }

  return gaps;
}

function buildGovernanceStops(context: Required<FarmDigitalTwinReadinessInput>): TwinGovernanceStop[] {
  return [
    {
      id: "FDT-STOP-001",
      stop: "Provider execution is locked",
      enforced: true,
      reason: "The digital twin is deterministic and local until explicit provider enablement.",
      reviewer: "safety reviewer",
    },
    {
      id: "FDT-STOP-002",
      stop: "Persistence is locked",
      enforced: true,
      reason: "No simulated twin state is written to storage or memory.",
      reviewer: "operations reviewer",
    },
    {
      id: "FDT-STOP-003",
      stop: "Operational automation is locked",
      enforced: true,
      reason: "No task, intervention, public sharing or execution is permitted.",
      reviewer: context.reviewerRole,
    },
    {
      id: "FDT-STOP-004",
      stop: "Prescriptive outputs are locked",
      enforced: true,
      reason: "No product selection, product prescription or dosage guidance is produced.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildManualReviewBoard(
  context: Required<FarmDigitalTwinReadinessInput>,
  scenarios: TwinScenarioSimulation[],
  gaps: TwinReadinessGap[],
): TwinManualReviewItem[] {
  return [
    {
      id: "FDT-REVIEW-001",
      decisionTopic: "Should evidence completion be prioritized before board review?",
      reviewer: context.reviewerRole,
      evidenceNeeded: ["Evidence backlog", "Photo bundle status", "Human observation notes"],
      safeOutcome: "Manual evidence collection priority only.",
      manualOnly: true,
    },
    {
      id: "FDT-REVIEW-002",
      decisionTopic: "Which simulated high-risk fields need human scouting first?",
      reviewer: "senior agronomist",
      evidenceNeeded: ["Field node risk tier", "Weather volatility proxy", "Open case pressure"],
      safeOutcome: "Manual scouting discussion only; no dispatch.",
      manualOnly: true,
    },
    {
      id: "FDT-REVIEW-003",
      decisionTopic: "Can scenarios be added to an executive board pack?",
      reviewer: "executive agronomic reviewer",
      evidenceNeeded: scenarios.map((scenario) => scenario.title),
      safeOutcome: "Redacted board context only.",
      manualOnly: true,
    },
    {
      id: "FDT-REVIEW-004",
      decisionTopic: "Which readiness gaps block executive-ready status?",
      reviewer: "operations reviewer",
      evidenceNeeded: gaps.map((gap) => gap.label).slice(0, 6),
      safeOutcome: "Manual gap resolution plan only.",
      manualOnly: true,
    },
  ];
}

export function buildAiFarmDigitalTwinReadinessReport(
  input: FarmDigitalTwinReadinessInput = {},
): FarmDigitalTwinReadinessReport {
  const context = normalizeInput(input);
  const fieldNodes = buildFieldNodes(context);
  const casePressureNodes = buildCasePressureNodes(context, fieldNodes);
  const operationalReadiness = buildOperationalReadiness(context);
  const scenarioSimulations = buildScenarioSimulations(context);
  const readinessGaps = buildReadinessGaps(context, fieldNodes, operationalReadiness);
  const governanceStops = buildGovernanceStops(context);
  const manualReviewBoard = buildManualReviewBoard(context, scenarioSimulations, readinessGaps);

  const fieldAverage =
    fieldNodes.reduce((sum, field) => sum + field.readinessScore + field.evidenceCompletenessScore, 0) /
    Math.max(1, fieldNodes.length * 2);

  const readinessAverage =
    operationalReadiness.reduce((sum, node) => sum + node.readinessScore, 0) /
    Math.max(1, operationalReadiness.length);

  const blockingGapPenalty = readinessGaps.filter((gap) => gap.severity === "blocking").length * 9;
  const riskPressure = riskWeight[riskFromScore(context.highRiskFieldCount * 20 + context.weatherVolatilityProxy / 2)];

  const twinScore = clampScore(
    fieldAverage / 2 +
      readinessAverage / 2 +
      context.memoryQualityScore / 6 +
      context.boardPackScore / 6 -
      blockingGapPenalty -
      riskPressure / 3,
  );

  const farmRiskTier = riskFromScore(
    clampScore(context.highRiskFieldCount * 18 + context.evidenceGapCount * 6 + context.weatherVolatilityProxy / 2),
  );

  const twinStatus = bandFromScore(twinScore, readinessGaps.filter((gap) => gap.severity === "blocking").length);

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: FARM_DIGITAL_TWIN_READINESS,
    twinScore,
    twinStatus,
    farmRiskTier,
    fieldNodes,
    casePressureNodes,
    operationalReadiness,
    scenarioSimulations,
    readinessGaps,
    governanceStops,
    manualReviewBoard,
    redactedExportBundle: {
      exportId: "farm-digital-twin-readiness-v10-4-redacted-dry-run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalSecrets: false,
      includesFinancialActuals: false,
      sections: [
        "context",
        "field digital twin nodes",
        "case pressure nodes",
        "operational readiness",
        "scenario simulations",
        "readiness gaps",
        "governance stops",
        "manual review board",
        "safety summary",
      ],
    },
    safetySummary: [
      "Farm digital twin is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product prescription, dosage advice, public sharing or financial actuals are produced.",
      "Scenarios are simulations only and must be reviewed by humans.",
      "Every operational interpretation remains behind manual dispatch and governance stops.",
    ],
  };
}

export const aiFarmDigitalTwinReadinessVersion = "V10.4";
