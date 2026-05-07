export type ImpactRiskTier = "low" | "watch" | "high" | "critical";
export type ImpactScenarioKind = "observe-only" | "manual-review" | "manual-intervention-ready" | "blocked";
export type ImpactVelocity = "stable" | "rising" | "accelerating" | "blocked";

export type InterventionImpactCaseInput = {
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  locationHint: string;
  riskTier: ImpactRiskTier;
  riskVelocity: ImpactVelocity;
  scenarioKind: ImpactScenarioKind;
  commandScore: number;
  confidenceScore: number;
  affectedAreaIndex: number;
  potentialLossIndex: number;
  interventionReadinessScore: number;
  manualEffortUnits: number;
  resourceLoadUnits: number;
  evidenceCount: number;
  photoCount: number;
  blocked: boolean;
  manualProtocolReady: boolean;
  scoutingMissionReady: boolean;
  linkedFingerprints: string[];
  openLimitations: string[];
  reviewerNote: string;
};

export type InterventionImpactResourceInput = {
  resourceId: string;
  label: string;
  role: "operator" | "reviewer" | "field-visit" | "documentation" | "admin";
  capacityUnits: number;
  allocatedUnits: number;
  costIndexPerUnit: number;
  constraints: string[];
};

export type InterventionImpactInput = {
  farmId: string;
  farmName: string;
  impactWindowLabel: string;
  operatorName: string;
  cases: InterventionImpactCaseInput[];
  resources: InterventionImpactResourceInput[];
  includeScenarioMatrix: boolean;
  includeRiskReductionForecast: boolean;
  includeManualCostEnvelope: boolean;
  includeResourceBudgetImpact: boolean;
  includeOpportunityCostBoard: boolean;
  includeRoiPriorityQueue: boolean;
  includeExecutiveImpactBriefing: boolean;
  includeComplianceEconomicsGuard: boolean;
  humanReviewRequired: boolean;
};

export type ImpactScenarioMatrixItem = {
  scenarioId: string;
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  scenarioKind: ImpactScenarioKind;
  riskTier: ImpactRiskTier;
  riskVelocity: ImpactVelocity;
  impactScore: number;
  riskReductionProxy: number;
  manualEffortUnits: number;
  costIndexUnits: number;
  confidenceScore: number;
  blockedReasons: string[];
  allowedManualActions: string[];
  prohibitedActions: string[];
};

export type RiskReductionForecastItem = {
  forecastId: string;
  caseId: string;
  horizon: "T+1" | "T+3" | "T+7" | "T+14";
  baselineRiskIndex: number;
  manualReviewRiskIndex: number;
  manualProtocolRiskIndex: number;
  expectedDeltaProxy: number;
  forecastConfidence: number;
  limitations: string[];
};

export type ManualCostEnvelopeItem = {
  envelopeId: string;
  caseId: string;
  fieldName: string;
  estimatedManualEffortUnits: number;
  estimatedResourceLoadUnits: number;
  estimatedCostIndexUnits: number;
  envelopeStatus: "low" | "moderate" | "high" | "blocked";
  assumptions: string[];
};

export type ResourceBudgetImpactItem = {
  budgetId: string;
  resourceId: string;
  label: string;
  role: InterventionImpactResourceInput["role"];
  capacityUnits: number;
  allocatedUnits: number;
  projectedAdditionalUnits: number;
  projectedCostIndexUnits: number;
  budgetStatus: "available" | "loaded" | "near-limit" | "over-limit";
  mitigation: string[];
};

export type OpportunityCostItem = {
  opportunityId: string;
  caseId: string;
  fieldName: string;
  delayedReviewCostProxy: number;
  missedEvidenceCostProxy: number;
  blockedAutomationCostProxy: number;
  manualOpportunity: string;
  recommendedDecision: string;
};

export type RoiPriorityItem = {
  roiId: string;
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  roiProxyScore: number;
  impactScore: number;
  costIndexUnits: number;
  riskReductionProxy: number;
  priorityReason: string;
  nextHumanAction: string;
  forbiddenAutomation: string[];
};

export type ExecutiveImpactBriefing = {
  briefingId: string;
  title: string;
  headline: string;
  summaryLines: string[];
  topImpactOpportunities: string[];
  boardDecisions: string[];
  redactedForOperations: true;
};

export type ComplianceEconomicsGuardItem = {
  guardId: string;
  label: string;
  passed: boolean;
  evidence: string[];
  prohibitedActions: string[];
};

export type InterventionImpactReport = {
  ok: true;
  mode: "intervention-impact-roi-dry-run";
  impactVersion: "agri-ai-intervention-impact-roi-v1";
  impactId: string;
  impactFingerprint: string;
  impactReady: boolean;
  inputSummary: {
    farmId: string;
    farmName: string;
    impactWindowLabel: string;
    operatorName: string;
    caseCount: number;
    resourceCount: number;
    fieldCount: number;
    criticalCaseCount: number;
    highCaseCount: number;
    blockedCaseCount: number;
    manualReadyCaseCount: number;
    totalAffectedAreaIndex: number;
    totalPotentialLossIndex: number;
    totalManualEffortUnits: number;
    humanReviewRequired: true;
  };
  scenarioMatrix: ImpactScenarioMatrixItem[];
  riskReductionForecast: RiskReductionForecastItem[];
  manualCostEnvelope: ManualCostEnvelopeItem[];
  resourceBudgetImpact: ResourceBudgetImpactItem[];
  opportunityCostBoard: OpportunityCostItem[];
  roiPriorityQueue: RoiPriorityItem[];
  executiveImpactBriefing: ExecutiveImpactBriefing;
  complianceEconomicsGuard: ComplianceEconomicsGuardItem[];
  impactSummary: {
    impactStatus: "low" | "watch" | "high-value-review" | "blocked";
    topRoiCaseId: string;
    topRoiFieldName: string;
    nextHumanAction: string;
    projectedRiskReductionProxy: number;
    projectedCostIndexUnits: number;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    interventionImpactReady: boolean;
    scenarioMatrixReady: boolean;
    riskReductionForecastReady: boolean;
    manualCostEnvelopeReady: boolean;
    resourceBudgetImpactReady: boolean;
    opportunityCostBoardReady: boolean;
    roiPriorityQueueReady: boolean;
    executiveImpactBriefingReady: boolean;
    complianceEconomicsGuardReady: boolean;
    providerAiReady: false;
    persistenceReady: false;
    automaticTaskCreationReady: false;
    automaticInterventionCreationReady: false;
    automaticExecutionReady: false;
  };
  safety: {
    providerCalled: false;
    persistencePerformed: false;
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
    publicShareAllowed: false;
    productPrescriptionAllowed: false;
    dosageAdviceAllowed: false;
    manualDispatchOnly: true;
    humanReviewRequired: true;
    localAnalysisOnly: true;
    redactedOutputOnly: true;
  };
};

export const defaultInterventionImpactInput: InterventionImpactInput = {
  farmId: "",
  farmName: "",
  impactWindowLabel: "",
  operatorName: "",
  cases: [],
  resources: [],
  includeScenarioMatrix: true,
  includeRiskReductionForecast: true,
  includeManualCostEnvelope: true,
  includeResourceBudgetImpact: true,
  includeOpportunityCostBoard: true,
  includeRoiPriorityQueue: true,
  includeExecutiveImpactBriefing: true,
  includeComplianceEconomicsGuard: true,
  humanReviewRequired: true,
};

export function createInterventionImpactFixture(): InterventionImpactInput {
  return {
    farmId: "farm-impact-ready",
    farmName: "Azienda Demo Nord",
    impactWindowLabel: "prossimi 14 giorni",
    operatorName: "Responsabile tecnico",
    cases: [
      {
        caseId: "impact-case-core",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "settore nord fila quattro",
        riskTier: "critical",
        riskVelocity: "blocked",
        scenarioKind: "blocked",
        commandScore: 96,
        confidenceScore: 0.83,
        affectedAreaIndex: 78,
        potentialLossIndex: 86,
        interventionReadinessScore: 44,
        manualEffortUnits: 6,
        resourceLoadUnits: 5,
        evidenceCount: 14,
        photoCount: 9,
        blocked: true,
        manualProtocolReady: false,
        scoutingMissionReady: true,
        linkedFingerprints: [
          "farm-command-core",
          "scouting-mission-core",
          "farm-risk-radar-core",
          "intervention-protocol-core",
        ],
        openLimitations: ["review finale mancante", "controllo sano da aggiornare"],
        reviewerNote: "Alto impatto potenziale, ma bloccato fino a review.",
      },
      {
        caseId: "impact-case-border",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "bordo espansione",
        riskTier: "high",
        riskVelocity: "accelerating",
        scenarioKind: "manual-intervention-ready",
        commandScore: 87,
        confidenceScore: 0.78,
        affectedAreaIndex: 55,
        potentialLossIndex: 63,
        interventionReadinessScore: 82,
        manualEffortUnits: 5,
        resourceLoadUnits: 4,
        evidenceCount: 9,
        photoCount: 7,
        blocked: false,
        manualProtocolReady: true,
        scoutingMissionReady: true,
        linkedFingerprints: ["farm-command-border", "scouting-mission-border", "farm-risk-radar-border"],
        openLimitations: [],
        reviewerNote: "Manual-ready: buon candidato ROI proxy.",
      },
      {
        caseId: "impact-case-control",
        fieldId: "field-south",
        fieldName: "Appezzamento Sud",
        crop: "vite",
        locationHint: "controllo sano",
        riskTier: "watch",
        riskVelocity: "stable",
        scenarioKind: "observe-only",
        commandScore: 41,
        confidenceScore: 0.62,
        affectedAreaIndex: 21,
        potentialLossIndex: 24,
        interventionReadinessScore: 35,
        manualEffortUnits: 2,
        resourceLoadUnits: 2,
        evidenceCount: 4,
        photoCount: 5,
        blocked: false,
        manualProtocolReady: false,
        scoutingMissionReady: false,
        linkedFingerprints: ["farm-command-control", "risk-radar-control"],
        openLimitations: ["solo monitoraggio"],
        reviewerNote: "Caso di confronto.",
      },
    ],
    resources: [
      {
        resourceId: "impact-reviewer",
        label: "Revisore agronomico",
        role: "reviewer",
        capacityUnits: 6,
        allocatedUnits: 5,
        costIndexPerUnit: 8,
        constraints: ["review manuale", "no prodotto", "no dosaggio"],
      },
      {
        resourceId: "impact-operator",
        label: "Operatore campo",
        role: "operator",
        capacityUnits: 8,
        allocatedUnits: 6,
        costIndexPerUnit: 6,
        constraints: ["missione manuale", "raccolta evidenza"],
      },
      {
        resourceId: "impact-doc",
        label: "Documentazione",
        role: "documentation",
        capacityUnits: 4,
        allocatedUnits: 3,
        costIndexPerUnit: 4,
        constraints: ["export redatto", "audit trail"],
      },
    ],
    includeScenarioMatrix: true,
    includeRiskReductionForecast: true,
    includeManualCostEnvelope: true,
    includeResourceBudgetImpact: true,
    includeOpportunityCostBoard: true,
    includeRoiPriorityQueue: true,
    includeExecutiveImpactBriefing: true,
    includeComplianceEconomicsGuard: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `intervention-impact-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function riskTierRank(tier: ImpactRiskTier) {
  return {
    low: 1,
    watch: 2,
    high: 3,
    critical: 4,
  }[tier];
}

function velocityRank(velocity: ImpactVelocity) {
  return {
    stable: 1,
    rising: 2,
    accelerating: 3,
    blocked: 4,
  }[velocity];
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function costIndexForCase(item: InterventionImpactCaseInput) {
  return Math.max(1, Math.round(item.manualEffortUnits * 6 + item.resourceLoadUnits * 5 + item.openLimitations.length * 3));
}

function riskReductionProxyForCase(item: InterventionImpactCaseInput) {
  const base =
    riskTierRank(item.riskTier) * 12 +
    velocityRank(item.riskVelocity) * 8 +
    item.interventionReadinessScore * 0.35 +
    item.confidenceScore * 18;

  return Math.round(clamp(base - (item.blocked ? 18 : 0) - item.openLimitations.length * 4));
}

function impactScoreForCase(item: InterventionImpactCaseInput) {
  const value =
    item.potentialLossIndex * 0.44 +
    item.affectedAreaIndex * 0.28 +
    item.commandScore * 0.22 +
    riskTierRank(item.riskTier) * 7 +
    velocityRank(item.riskVelocity) * 5 -
    item.openLimitations.length * 6 +
    (item.manualProtocolReady ? 8 : 0) -
    (item.blocked ? 8 : 0);

  return Math.round(clamp(value));
}

function createScenarioMatrix(input: InterventionImpactInput): ImpactScenarioMatrixItem[] {
  return input.cases.map((item) => {
    const blockedReasons = normalize(item.openLimitations || []);
    const riskReductionProxy = riskReductionProxyForCase(item);
    const costIndexUnits = costIndexForCase(item);
    const impactScore = impactScoreForCase(item);

    return {
      scenarioId: `impact-scenario-${item.caseId}`,
      caseId: item.caseId,
      fieldId: item.fieldId,
      fieldName: item.fieldName,
      crop: item.crop,
      scenarioKind: item.scenarioKind,
      riskTier: item.riskTier,
      riskVelocity: item.riskVelocity,
      impactScore,
      riskReductionProxy,
      manualEffortUnits: item.manualEffortUnits,
      costIndexUnits,
      confidenceScore: item.confidenceScore,
      blockedReasons: blockedReasons.length ? blockedReasons : ["nessun blocco oltre review obbligatoria"],
      allowedManualActions:
        item.blocked || item.scenarioKind === "blocked"
          ? ["review umana", "raccolta evidenza", "aggiornamento limiti"]
          : ["review umana", "brief manuale", "preparazione protocollo non persistito"],
      prohibitedActions: [
        "provider AI live",
        "persistenza automatica",
        "task automatico",
        "intervento automatico",
        "esecuzione automatica",
        "prodotto",
        "dosaggio",
      ],
    };
  });
}

function createRiskReductionForecast(input: InterventionImpactInput): RiskReductionForecastItem[] {
  return input.cases.flatMap((item) => {
    const baselineRiskIndex = clamp(item.potentialLossIndex + riskTierRank(item.riskTier) * 8 + velocityRank(item.riskVelocity) * 6);
    const manualReviewRiskIndex = Math.round(clamp(baselineRiskIndex - (item.blocked ? 10 : 15)));
    const manualProtocolRiskIndex = Math.round(
      clamp(baselineRiskIndex - (item.manualProtocolReady ? 28 : item.scenarioKind === "manual-review" ? 18 : 8)),
    );

    const horizons: Array<RiskReductionForecastItem["horizon"]> = ["T+1", "T+3", "T+7", "T+14"];

    return horizons.map((horizon, index) => ({
      forecastId: `risk-reduction-${item.caseId}-${horizon.toLowerCase().replace("+", "")}`,
      caseId: item.caseId,
      horizon,
      baselineRiskIndex: Math.round(clamp(baselineRiskIndex + index * 2)),
      manualReviewRiskIndex: Math.round(clamp(manualReviewRiskIndex + index)),
      manualProtocolRiskIndex: Math.round(clamp(manualProtocolRiskIndex + index)),
      expectedDeltaProxy: Math.round(clamp(baselineRiskIndex - manualProtocolRiskIndex)),
      forecastConfidence: Number(Math.max(0.25, Math.min(0.92, item.confidenceScore - index * 0.03)).toFixed(2)),
      limitations: [
        "proxy non economico reale",
        "nessuna prescrizione prodotto",
        "nessun dosaggio",
        "human review obbligatoria",
        ...normalize(item.openLimitations || []),
      ],
    }));
  });
}

function createManualCostEnvelope(input: InterventionImpactInput): ManualCostEnvelopeItem[] {
  return input.cases.map((item) => {
    const estimatedCostIndexUnits = costIndexForCase(item);
    const envelopeStatus =
      item.blocked || item.scenarioKind === "blocked"
        ? "blocked"
        : estimatedCostIndexUnits >= 55
          ? "high"
          : estimatedCostIndexUnits >= 28
            ? "moderate"
            : "low";

    return {
      envelopeId: `manual-cost-${item.caseId}`,
      caseId: item.caseId,
      fieldName: item.fieldName,
      estimatedManualEffortUnits: item.manualEffortUnits,
      estimatedResourceLoadUnits: item.resourceLoadUnits,
      estimatedCostIndexUnits,
      envelopeStatus,
      assumptions: [
        "indice costo non monetario",
        "include effort manuale",
        "include review",
        "non include prodotto",
        "non include dosaggio",
      ],
    };
  });
}

function createResourceBudgetImpact(input: InterventionImpactInput): ResourceBudgetImpactItem[] {
  const additionalUnits = input.cases.reduce((total, item) => total + Math.max(1, Math.ceil(item.resourceLoadUnits / 2)), 0);
  const resourceCount = Math.max(1, input.resources.length);

  return input.resources.map((resource, index) => {
    const projectedAdditionalUnits = Math.ceil(additionalUnits / resourceCount) + (index === 0 ? 1 : 0);
    const projectedAllocated = resource.allocatedUnits + projectedAdditionalUnits;
    const ratio = projectedAllocated / Math.max(1, resource.capacityUnits);
    const budgetStatus =
      ratio > 1
        ? "over-limit"
        : ratio >= 0.9
          ? "near-limit"
          : ratio >= 0.55
            ? "loaded"
            : "available";

    return {
      budgetId: `resource-budget-${resource.resourceId}`,
      resourceId: resource.resourceId,
      label: resource.label,
      role: resource.role,
      capacityUnits: resource.capacityUnits,
      allocatedUnits: resource.allocatedUnits,
      projectedAdditionalUnits,
      projectedCostIndexUnits: projectedAdditionalUnits * resource.costIndexPerUnit,
      budgetStatus,
      mitigation:
        budgetStatus === "over-limit" || budgetStatus === "near-limit"
          ? ["spostare casi non critici", "ridurre scope missione", "prioritizzare review bloccanti"]
          : ["mantenere capacità", "preparare debrief", "monitorare saturazione"],
    };
  });
}

function createOpportunityCostBoard(input: InterventionImpactInput): OpportunityCostItem[] {
  return input.cases.map((item) => {
    const delayedReviewCostProxy = Math.round(clamp(item.potentialLossIndex * 0.35 + velocityRank(item.riskVelocity) * 7));
    const missedEvidenceCostProxy = Math.round(clamp(item.evidenceCount < 6 ? 30 - item.evidenceCount * 3 : 8));
    const blockedAutomationCostProxy = Math.round(clamp((item.blocked ? 18 : 6) + item.openLimitations.length * 5));

    return {
      opportunityId: `opportunity-${item.caseId}`,
      caseId: item.caseId,
      fieldName: item.fieldName,
      delayedReviewCostProxy,
      missedEvidenceCostProxy,
      blockedAutomationCostProxy,
      manualOpportunity:
        item.blocked || item.scenarioKind === "blocked"
          ? "ridurre incertezza con review ed evidenza"
          : item.manualProtocolReady
            ? "validare protocollo manuale ad alto impatto"
            : "migliorare base evidenziale",
      recommendedDecision:
        item.blocked || item.scenarioKind === "blocked"
          ? "review prima di qualsiasi azione"
          : item.manualProtocolReady
            ? "prioritizzare validazione manuale"
            : "mantenere osservazione e follow-up",
    };
  });
}

function createRoiPriorityQueue(
  input: InterventionImpactInput,
  scenarioMatrix: ImpactScenarioMatrixItem[],
): RoiPriorityItem[] {
  return scenarioMatrix
    .map((scenario) => {
      const roiProxyScore = Math.round(clamp(scenario.impactScore + scenario.riskReductionProxy - scenario.costIndexUnits * 0.55));
      const source = input.cases.find((item) => item.caseId === scenario.caseId);

      return {
        roiId: `roi-priority-${scenario.caseId}`,
        caseId: scenario.caseId,
        fieldId: scenario.fieldId,
        fieldName: scenario.fieldName,
        crop: scenario.crop,
        roiProxyScore,
        impactScore: scenario.impactScore,
        costIndexUnits: scenario.costIndexUnits,
        riskReductionProxy: scenario.riskReductionProxy,
        priorityReason: [
          `impactScore=${scenario.impactScore}`,
          `riskReductionProxy=${scenario.riskReductionProxy}`,
          `costIndexUnits=${scenario.costIndexUnits}`,
          `blocked=${Boolean(source?.blocked)}`,
          `manualProtocolReady=${Boolean(source?.manualProtocolReady)}`,
        ].join(" | "),
        nextHumanAction:
          source?.blocked || scenario.scenarioKind === "blocked"
            ? "sbloccare con review umana"
            : source?.manualProtocolReady
              ? "validare protocollo manuale"
              : "completare evidenza e rivalutare",
        forbiddenAutomation: [
          "task automatico",
          "intervento automatico",
          "persistenza automatica",
          "esecuzione automatica",
          "prescrizione prodotto",
          "dosaggio",
        ],
      };
    })
    .sort((a, b) => b.roiProxyScore - a.roiProxyScore);
}

function createExecutiveImpactBriefing(
  input: InterventionImpactInput,
  roiQueue: RoiPriorityItem[],
  totalCostIndex: number,
): ExecutiveImpactBriefing {
  const top = roiQueue[0];

  return {
    briefingId: `executive-impact-${input.farmId || "draft"}`,
    title: "Executive intervention impact briefing",
    headline: top
      ? `Top ROI proxy: ${top.caseId} su ${top.fieldName}`
      : "Nessun caso pronto per simulazione impatto",
    summaryLines: [
      `farm=${input.farmName || "missing"}`,
      `window=${input.impactWindowLabel || "missing"}`,
      `caseCount=${input.cases.length}`,
      `totalCostIndex=${totalCostIndex}`,
      `topRoiCase=${top?.caseId || "none"}`,
    ],
    topImpactOpportunities: roiQueue.slice(0, 3).map((item) => `${item.caseId}: roiProxyScore=${item.roiProxyScore}`),
    boardDecisions: [
      "approvare solo analisi manuale",
      "non creare task/interventi automatici",
      "non prescrivere prodotti o dosaggi",
      "validare blocchi prima di qualsiasi conversione",
    ],
    redactedForOperations: true,
  };
}

function createComplianceEconomicsGuard(input: InterventionImpactInput): ComplianceEconomicsGuardItem[] {
  return [
    {
      guardId: "economics-provider",
      label: "Provider AI live",
      passed: true,
      evidence: ["providerCalled=false", "providerAiReady=false"],
      prohibitedActions: ["chiamata provider live", "chiave AI in UI", "endpoint diagnosis live"],
    },
    {
      guardId: "economics-db",
      label: "Persistenza e automazioni",
      passed: true,
      evidence: ["persistencePerformed=false", "taskCreated=false", "interventionCreated=false"],
      prohibitedActions: ["persistenza automatica", "task automatico", "intervento automatico"],
    },
    {
      guardId: "economics-agronomy",
      label: "No prodotto / no dosaggio",
      passed: true,
      evidence: ["productPrescriptionPerformed=false", "dosageAdvicePerformed=false"],
      prohibitedActions: ["prescrizione prodotto", "dosaggio", "esecuzione automatica"],
    },
    {
      guardId: "economics-review",
      label: "Human review",
      passed: input.humanReviewRequired === true,
      evidence: ["humanReviewRequired=true", "manualDispatchOnly=true", "redactedOutputOnly=true"],
      prohibitedActions: ["conversione non revisionata", "share pubblico automatico"],
    },
  ];
}

function impactStatusFromCases(cases: InterventionImpactCaseInput[]): InterventionImpactReport["impactSummary"]["impactStatus"] {
  if (cases.some((item) => item.blocked || item.scenarioKind === "blocked")) {
    return "blocked";
  }

  if (cases.some((item) => item.manualProtocolReady && item.riskTier === "high")) {
    return "high-value-review";
  }

  if (cases.some((item) => item.riskTier === "watch" || item.riskTier === "high")) {
    return "watch";
  }

  return "low";
}

export function createInterventionImpactReport(
  input: InterventionImpactInput = defaultInterventionImpactInput,
): InterventionImpactReport {
  const cases = input.cases.map((item) => ({
    ...item,
    linkedFingerprints: normalize(item.linkedFingerprints || []),
    openLimitations: normalize(item.openLimitations || []),
  }));
  const resources = input.resources.map((item) => ({
    ...item,
    constraints: normalize(item.constraints || []),
  }));
  const reportInput = { ...input, cases, resources };
  const scenarioMatrix = input.includeScenarioMatrix ? createScenarioMatrix(reportInput) : [];
  const riskReductionForecast = input.includeRiskReductionForecast ? createRiskReductionForecast(reportInput) : [];
  const manualCostEnvelope = input.includeManualCostEnvelope ? createManualCostEnvelope(reportInput) : [];
  const resourceBudgetImpact = input.includeResourceBudgetImpact ? createResourceBudgetImpact(reportInput) : [];
  const opportunityCostBoard = input.includeOpportunityCostBoard ? createOpportunityCostBoard(reportInput) : [];
  const roiPriorityQueue = input.includeRoiPriorityQueue ? createRoiPriorityQueue(reportInput, scenarioMatrix) : [];
  const complianceEconomicsGuard = input.includeComplianceEconomicsGuard ? createComplianceEconomicsGuard(reportInput) : [];
  const totalCostIndex = manualCostEnvelope.reduce((total, item) => total + item.estimatedCostIndexUnits, 0);
  const executiveImpactBriefing = createExecutiveImpactBriefing(reportInput, roiPriorityQueue, totalCostIndex);
  const fieldCount = new Set(cases.map((item) => item.fieldId)).size;
  const criticalCaseCount = cases.filter((item) => item.riskTier === "critical").length;
  const highCaseCount = cases.filter((item) => item.riskTier === "high").length;
  const blockedCaseCount = cases.filter((item) => item.blocked || item.scenarioKind === "blocked").length;
  const manualReadyCaseCount = cases.filter((item) => item.manualProtocolReady).length;
  const totalAffectedAreaIndex = cases.reduce((total, item) => total + item.affectedAreaIndex, 0);
  const totalPotentialLossIndex = cases.reduce((total, item) => total + item.potentialLossIndex, 0);
  const totalManualEffortUnits = cases.reduce((total, item) => total + item.manualEffortUnits, 0);
  const impactReady = Boolean(
    input.farmId.trim() &&
      input.farmName.trim() &&
      input.impactWindowLabel.trim() &&
      input.operatorName.trim() &&
      input.humanReviewRequired &&
      cases.length >= 1 &&
      resources.length >= 1,
  );
  const impactId = `intervention-impact-${input.farmId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const impactFingerprint = fingerprint(
    [
      impactId,
      input.farmName,
      input.impactWindowLabel,
      input.operatorName,
      cases.map((item) => `${item.caseId}:${item.fieldId}:${item.riskTier}:${item.scenarioKind}:${item.potentialLossIndex}`).join("|"),
      resources.map((item) => `${item.resourceId}:${item.role}:${item.costIndexPerUnit}`).join("|"),
      String(impactReady),
    ].join("|"),
  );
  const top = roiPriorityQueue[0];
  const projectedRiskReductionProxy = Math.round(
    scenarioMatrix.reduce((total, item) => total + item.riskReductionProxy, 0) / Math.max(1, scenarioMatrix.length),
  );
  const confidenceScore = Number(
    Math.min(
      0.96,
      0.35 +
        Math.min(cases.length, 30) * 0.02 +
        Math.min(resources.length, 12) * 0.018 +
        Math.min(totalAffectedAreaIndex, 180) * 0.0015 +
        Math.min(totalPotentialLossIndex, 180) * 0.0015,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "intervention-impact-roi-dry-run",
    impactVersion: "agri-ai-intervention-impact-roi-v1",
    impactId,
    impactFingerprint,
    impactReady,
    inputSummary: {
      farmId: input.farmId.trim(),
      farmName: input.farmName.trim(),
      impactWindowLabel: input.impactWindowLabel.trim(),
      operatorName: input.operatorName.trim(),
      caseCount: cases.length,
      resourceCount: resources.length,
      fieldCount,
      criticalCaseCount,
      highCaseCount,
      blockedCaseCount,
      manualReadyCaseCount,
      totalAffectedAreaIndex,
      totalPotentialLossIndex,
      totalManualEffortUnits,
      humanReviewRequired: true,
    },
    scenarioMatrix,
    riskReductionForecast,
    manualCostEnvelope,
    resourceBudgetImpact,
    opportunityCostBoard,
    roiPriorityQueue,
    executiveImpactBriefing: input.includeExecutiveImpactBriefing ? executiveImpactBriefing : {
      briefingId: `executive-impact-${input.farmId || "draft"}`,
      title: "Executive intervention impact briefing",
      headline: "Briefing disattivato",
      summaryLines: [],
      topImpactOpportunities: [],
      boardDecisions: [],
      redactedForOperations: true,
    },
    complianceEconomicsGuard,
    impactSummary: {
      impactStatus: impactStatusFromCases(cases),
      topRoiCaseId: top?.caseId || "",
      topRoiFieldName: top?.fieldName || "",
      nextHumanAction:
        blockedCaseCount > 0
          ? "sbloccare casi con review umana prima di qualunque conversione"
          : manualReadyCaseCount > 0
            ? "validare priorità ROI proxy e protocollo manuale"
            : "migliorare evidenza e rivalutare",
      projectedRiskReductionProxy,
      projectedCostIndexUnits: totalCostIndex,
      confidenceScore,
      reasons: [
        `caseCount=${cases.length}`,
        `fieldCount=${fieldCount}`,
        `criticalCaseCount=${criticalCaseCount}`,
        `highCaseCount=${highCaseCount}`,
        `blockedCaseCount=${blockedCaseCount}`,
        `manualReadyCaseCount=${manualReadyCaseCount}`,
        `totalAffectedAreaIndex=${totalAffectedAreaIndex}`,
        `totalPotentialLossIndex=${totalPotentialLossIndex}`,
        `totalManualEffortUnits=${totalManualEffortUnits}`,
      ],
      blockingLimitations: [
        "nessuna chiamata provider AI live",
        "ROI proxy non è dato finanziario reale",
        "nessuna persistenza DB",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
        "human review obbligatoria",
      ],
    },
    premiumSignals: {
      interventionImpactReady: impactReady,
      scenarioMatrixReady: scenarioMatrix.length > 0,
      riskReductionForecastReady: riskReductionForecast.length > 0,
      manualCostEnvelopeReady: manualCostEnvelope.length > 0,
      resourceBudgetImpactReady: resourceBudgetImpact.length > 0,
      opportunityCostBoardReady: opportunityCostBoard.length > 0,
      roiPriorityQueueReady: roiPriorityQueue.length > 0,
      executiveImpactBriefingReady: input.includeExecutiveImpactBriefing,
      complianceEconomicsGuardReady: complianceEconomicsGuard.length > 0,
      providerAiReady: false,
      persistenceReady: false,
      automaticTaskCreationReady: false,
      automaticInterventionCreationReady: false,
      automaticExecutionReady: false,
    },
    safety: {
      providerCalled: false,
      persistencePerformed: false,
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
      publicShareAllowed: false,
      productPrescriptionAllowed: false,
      dosageAdviceAllowed: false,
      manualDispatchOnly: true,
      humanReviewRequired: true,
      localAnalysisOnly: true,
      redactedOutputOnly: true,
    },
  };
}

export function createReadyInterventionImpactReport() {
  return createInterventionImpactReport(createInterventionImpactFixture());
}

export function createBlockedInterventionImpactReport() {
  return createInterventionImpactReport(defaultInterventionImpactInput);
}

export function formatInterventionImpactReport(report: InterventionImpactReport) {
  return [
    "AI Intervention Impact & ROI Simulator",
    "",
    `Impact ID: ${report.impactId}`,
    `Impact fingerprint: ${report.impactFingerprint}`,
    `Version: ${report.impactVersion}`,
    `Mode: ${report.mode}`,
    `impactReady=${report.impactReady}`,
    "",
    "Input summary:",
    `- farmId=${report.inputSummary.farmId || "missing"}`,
    `- farmName=${report.inputSummary.farmName || "missing"}`,
    `- impactWindowLabel=${report.inputSummary.impactWindowLabel || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- caseCount=${report.inputSummary.caseCount}`,
    `- resourceCount=${report.inputSummary.resourceCount}`,
    `- fieldCount=${report.inputSummary.fieldCount}`,
    `- criticalCaseCount=${report.inputSummary.criticalCaseCount}`,
    `- highCaseCount=${report.inputSummary.highCaseCount}`,
    `- blockedCaseCount=${report.inputSummary.blockedCaseCount}`,
    `- manualReadyCaseCount=${report.inputSummary.manualReadyCaseCount}`,
    `- totalAffectedAreaIndex=${report.inputSummary.totalAffectedAreaIndex}`,
    `- totalPotentialLossIndex=${report.inputSummary.totalPotentialLossIndex}`,
    `- totalManualEffortUnits=${report.inputSummary.totalManualEffortUnits}`,
    "- humanReviewRequired=true",
    "",
    "Impact summary:",
    `- impactStatus=${report.impactSummary.impactStatus}`,
    `- topRoiCaseId=${report.impactSummary.topRoiCaseId || "none"}`,
    `- topRoiFieldName=${report.impactSummary.topRoiFieldName || "none"}`,
    `- nextHumanAction=${report.impactSummary.nextHumanAction}`,
    `- projectedRiskReductionProxy=${report.impactSummary.projectedRiskReductionProxy}`,
    `- projectedCostIndexUnits=${report.impactSummary.projectedCostIndexUnits}`,
    `- confidenceScore=${report.impactSummary.confidenceScore}`,
    ...report.impactSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Scenario matrix:",
    ...report.scenarioMatrix.map(
      (item) =>
        `- ${item.caseId} | scenario=${item.scenarioKind} | impactScore=${item.impactScore} | riskReductionProxy=${item.riskReductionProxy} | costIndexUnits=${item.costIndexUnits}`,
    ),
    "",
    "Risk reduction forecast:",
    ...report.riskReductionForecast.map(
      (item) =>
        `- ${item.caseId} | horizon=${item.horizon} | delta=${item.expectedDeltaProxy} | confidence=${item.forecastConfidence}`,
    ),
    "",
    "Manual cost envelope:",
    ...report.manualCostEnvelope.map(
      (item) =>
        `- ${item.caseId} | effort=${item.estimatedManualEffortUnits} | load=${item.estimatedResourceLoadUnits} | costIndex=${item.estimatedCostIndexUnits} | status=${item.envelopeStatus}`,
    ),
    "",
    "Resource budget impact:",
    ...report.resourceBudgetImpact.map(
      (item) =>
        `- ${item.resourceId} | projectedAdditionalUnits=${item.projectedAdditionalUnits} | projectedCostIndexUnits=${item.projectedCostIndexUnits} | status=${item.budgetStatus}`,
    ),
    "",
    "Opportunity cost board:",
    ...report.opportunityCostBoard.map(
      (item) =>
        `- ${item.caseId} | delayedReview=${item.delayedReviewCostProxy} | missedEvidence=${item.missedEvidenceCostProxy} | decision=${item.recommendedDecision}`,
    ),
    "",
    "ROI priority queue:",
    ...report.roiPriorityQueue.map(
      (item) =>
        `- ${item.caseId} | roiProxyScore=${item.roiProxyScore} | impactScore=${item.impactScore} | costIndex=${item.costIndexUnits}`,
    ),
    "",
    "Executive impact briefing:",
    `- ${report.executiveImpactBriefing.title}`,
    `- ${report.executiveImpactBriefing.headline}`,
    ...report.executiveImpactBriefing.summaryLines.map((line) => `- ${line}`),
    "",
    "Compliance economics guard:",
    ...report.complianceEconomicsGuard.map(
      (item) => `- ${item.guardId} | passed=${item.passed} | label=${item.label}`,
    ),
    "",
    "Premium signals:",
    `- interventionImpactReady=${report.premiumSignals.interventionImpactReady}`,
    `- scenarioMatrixReady=${report.premiumSignals.scenarioMatrixReady}`,
    `- riskReductionForecastReady=${report.premiumSignals.riskReductionForecastReady}`,
    `- manualCostEnvelopeReady=${report.premiumSignals.manualCostEnvelopeReady}`,
    `- resourceBudgetImpactReady=${report.premiumSignals.resourceBudgetImpactReady}`,
    `- opportunityCostBoardReady=${report.premiumSignals.opportunityCostBoardReady}`,
    `- roiPriorityQueueReady=${report.premiumSignals.roiPriorityQueueReady}`,
    `- executiveImpactBriefingReady=${report.premiumSignals.executiveImpactBriefingReady}`,
    `- complianceEconomicsGuardReady=${report.premiumSignals.complianceEconomicsGuardReady}`,
    "- providerAiReady=false",
    "- persistenceReady=false",
    "- automaticTaskCreationReady=false",
    "- automaticInterventionCreationReady=false",
    "- automaticExecutionReady=false",
    "",
    "Safety:",
    "- providerCalled=false",
    "- persistencePerformed=false",
    "- taskCreated=false",
    "- interventionCreated=false",
    "- automaticExecutionPerformed=false",
    "- publicSharePerformed=false",
    "- productPrescriptionPerformed=false",
    "- dosageAdvicePerformed=false",
    "- automaticTaskCreationAllowed=false",
    "- automaticInterventionCreationAllowed=false",
    "- automaticExecutionAllowed=false",
    "- dbPersistenceAllowed=false",
    "- publicShareAllowed=false",
    "- productPrescriptionAllowed=false",
    "- dosageAdviceAllowed=false",
    "- manualDispatchOnly=true",
    "- humanReviewRequired=true",
    "- localAnalysisOnly=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
