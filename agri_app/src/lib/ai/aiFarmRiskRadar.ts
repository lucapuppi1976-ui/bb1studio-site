export type FarmRiskTier = "low" | "watch" | "high" | "critical";
export type FarmRiskVelocity = "stable" | "rising" | "accelerating" | "blocked";

export type FarmRiskRadarCaseInput = {
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  locationHint: string;
  riskTier: FarmRiskTier;
  riskVelocity: FarmRiskVelocity;
  commandScore: number;
  confidenceScore: number;
  evidenceCount: number;
  photoCount: number;
  blocked: boolean;
  manualProtocolReady: boolean;
  scoutingMissionReady: boolean;
  nextReviewWindowLabel: string;
  linkedFingerprints: string[];
  openLimitations: string[];
  reviewerNote: string;
};

export type FarmRiskRadarResourceInput = {
  resourceId: string;
  label: string;
  role: "operator" | "reviewer" | "field-visit" | "documentation" | "admin";
  capacityUnits: number;
  allocatedUnits: number;
  riskConstraints: string[];
};

export type FarmRiskRadarInput = {
  farmId: string;
  farmName: string;
  radarWindowLabel: string;
  operatorName: string;
  cases: FarmRiskRadarCaseInput[];
  resources: FarmRiskRadarResourceInput[];
  includeRiskQuadrants: boolean;
  includePredictivePriority: boolean;
  includeForecastWindows: boolean;
  includeResourceStress: boolean;
  includeCriticalWatchlist: boolean;
  includeExecutiveBriefing: boolean;
  includeComplianceRadar: boolean;
  humanReviewRequired: boolean;
};

export type FieldRiskQuadrant = {
  quadrantId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  quadrant: "stable-low" | "watch-rising" | "high-manual" | "critical-blocked";
  caseCount: number;
  criticalCaseCount: number;
  highCaseCount: number;
  blockedCaseCount: number;
  avgConfidenceScore: number;
  avgCommandScore: number;
  recommendedManualFocus: string;
};

export type PredictivePriorityItem = {
  priorityId: string;
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  riskTier: FarmRiskTier;
  riskVelocity: FarmRiskVelocity;
  predictiveScore: number;
  forecastReason: string;
  nextHumanAction: string;
  prohibitedAutomation: string[];
};

export type ForecastWindow = {
  forecastId: string;
  label: string;
  horizon: "T+1" | "T+3" | "T+7" | "T+14";
  expectedRiskPressure: "low" | "medium" | "high" | "critical";
  caseIds: string[];
  recommendedManualPreparation: string[];
  forbiddenActions: string[];
};

export type ResourceStressItem = {
  stressId: string;
  resourceId: string;
  label: string;
  role: FarmRiskRadarResourceInput["role"];
  capacityUnits: number;
  allocatedUnits: number;
  stressRatio: number;
  stressStatus: "available" | "loaded" | "near-limit" | "over-limit";
  mitigation: string[];
};

export type CriticalWatchlistItem = {
  watchId: string;
  caseId: string;
  fieldName: string;
  watchReason: string;
  riskTier: FarmRiskTier;
  riskVelocity: FarmRiskVelocity;
  blocked: boolean;
  requiredReviewDecision: string;
};

export type ExecutiveRiskBriefing = {
  briefingId: string;
  title: string;
  summaryLines: string[];
  topRisks: string[];
  nextBoardActions: string[];
  redactedForOperations: true;
};

export type ComplianceRadarItem = {
  complianceId: string;
  label: string;
  passed: boolean;
  evidence: string[];
  prohibitedActions: string[];
};

export type FarmRiskRadarReport = {
  ok: true;
  mode: "farm-risk-radar-dry-run";
  radarVersion: "agri-ai-farm-risk-radar-v1";
  radarId: string;
  radarFingerprint: string;
  radarReady: boolean;
  inputSummary: {
    farmId: string;
    farmName: string;
    radarWindowLabel: string;
    operatorName: string;
    caseCount: number;
    resourceCount: number;
    fieldCount: number;
    criticalCaseCount: number;
    highCaseCount: number;
    blockedCaseCount: number;
    risingCaseCount: number;
    totalEvidenceCount: number;
    totalPhotoCount: number;
    humanReviewRequired: true;
  };
  fieldRiskQuadrants: FieldRiskQuadrant[];
  predictivePriorityCenter: PredictivePriorityItem[];
  forecastWindows: ForecastWindow[];
  resourceStressForecast: ResourceStressItem[];
  criticalWatchlist: CriticalWatchlistItem[];
  executiveRiskBriefing: ExecutiveRiskBriefing;
  complianceRadar: ComplianceRadarItem[];
  radarSummary: {
    radarStatus: "stable" | "watch" | "high-attention" | "critical";
    topPriorityCaseId: string;
    topPriorityFieldName: string;
    nextHumanAction: string;
    predictedPressure: "low" | "medium" | "high" | "critical";
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    farmRiskRadarReady: boolean;
    predictivePriorityReady: boolean;
    fieldRiskQuadrantsReady: boolean;
    forecastWindowsReady: boolean;
    resourceStressForecastReady: boolean;
    criticalWatchlistReady: boolean;
    executiveBriefingReady: boolean;
    complianceRadarReady: boolean;
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

export const defaultFarmRiskRadarInput: FarmRiskRadarInput = {
  farmId: "",
  farmName: "",
  radarWindowLabel: "",
  operatorName: "",
  cases: [],
  resources: [],
  includeRiskQuadrants: true,
  includePredictivePriority: true,
  includeForecastWindows: true,
  includeResourceStress: true,
  includeCriticalWatchlist: true,
  includeExecutiveBriefing: true,
  includeComplianceRadar: true,
  humanReviewRequired: true,
};

export function createFarmRiskRadarFixture(): FarmRiskRadarInput {
  return {
    farmId: "farm-risk-radar-ready",
    farmName: "Azienda Demo Nord",
    radarWindowLabel: "prossimi 14 giorni",
    operatorName: "Responsabile tecnico",
    cases: [
      {
        caseId: "risk-case-core",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "settore nord fila quattro",
        riskTier: "critical",
        riskVelocity: "blocked",
        commandScore: 95,
        confidenceScore: 0.82,
        evidenceCount: 14,
        photoCount: 9,
        blocked: true,
        manualProtocolReady: false,
        scoutingMissionReady: true,
        nextReviewWindowLabel: "entro T+1 giorno",
        linkedFingerprints: [
          "farm-command-core",
          "scouting-mission-core",
          "intervention-protocol-core",
          "field-risk-heatmap-core",
        ],
        openLimitations: ["review finale mancante", "controllo sano da aggiornare"],
        reviewerNote: "Priorità critica bloccata: review obbligatoria.",
      },
      {
        caseId: "risk-case-border",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "bordo espansione",
        riskTier: "high",
        riskVelocity: "accelerating",
        commandScore: 86,
        confidenceScore: 0.78,
        evidenceCount: 9,
        photoCount: 7,
        blocked: false,
        manualProtocolReady: true,
        scoutingMissionReady: true,
        nextReviewWindowLabel: "entro T+2 giorni",
        linkedFingerprints: [
          "farm-command-border",
          "scouting-mission-border",
          "intervention-protocol-border",
        ],
        openLimitations: [],
        reviewerNote: "Caso manual-ready da tenere in watchlist.",
      },
      {
        caseId: "risk-case-control",
        fieldId: "field-south",
        fieldName: "Appezzamento Sud",
        crop: "vite",
        locationHint: "controllo sano",
        riskTier: "watch",
        riskVelocity: "stable",
        commandScore: 42,
        confidenceScore: 0.61,
        evidenceCount: 4,
        photoCount: 5,
        blocked: false,
        manualProtocolReady: false,
        scoutingMissionReady: false,
        nextReviewWindowLabel: "entro T+7 giorni",
        linkedFingerprints: ["farm-command-control", "scouting-mission-control"],
        openLimitations: ["solo monitoraggio"],
        reviewerNote: "Campo di confronto e watch.",
      },
    ],
    resources: [
      {
        resourceId: "risk-reviewer",
        label: "Revisore agronomico",
        role: "reviewer",
        capacityUnits: 6,
        allocatedUnits: 5,
        riskConstraints: ["review manuale", "no prodotto", "no dosaggio"],
      },
      {
        resourceId: "risk-operator",
        label: "Operatore campo",
        role: "operator",
        capacityUnits: 8,
        allocatedUnits: 6,
        riskConstraints: ["raccolta foto", "missione manuale"],
      },
      {
        resourceId: "risk-doc",
        label: "Documentazione",
        role: "documentation",
        capacityUnits: 4,
        allocatedUnits: 3,
        riskConstraints: ["export redatto", "audit trail"],
      },
    ],
    includeRiskQuadrants: true,
    includePredictivePriority: true,
    includeForecastWindows: true,
    includeResourceStress: true,
    includeCriticalWatchlist: true,
    includeExecutiveBriefing: true,
    includeComplianceRadar: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `farm-risk-radar-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function riskTierRank(tier: FarmRiskTier) {
  return {
    low: 1,
    watch: 2,
    high: 3,
    critical: 4,
  }[tier];
}

function velocityRank(velocity: FarmRiskVelocity) {
  return {
    stable: 1,
    rising: 2,
    accelerating: 3,
    blocked: 4,
  }[velocity];
}

function quadrantForCases(cases: FarmRiskRadarCaseInput[]): FieldRiskQuadrant["quadrant"] {
  if (cases.some((item) => item.blocked || item.riskTier === "critical")) {
    return "critical-blocked";
  }

  if (cases.some((item) => item.riskTier === "high" || item.manualProtocolReady)) {
    return "high-manual";
  }

  if (cases.some((item) => item.riskTier === "watch" || item.riskVelocity === "rising")) {
    return "watch-rising";
  }

  return "stable-low";
}

function radarStatusFromCases(cases: FarmRiskRadarCaseInput[]): FarmRiskRadarReport["radarSummary"]["radarStatus"] {
  if (cases.some((item) => item.blocked || item.riskTier === "critical")) {
    return "critical";
  }

  if (cases.some((item) => item.riskTier === "high" || item.riskVelocity === "accelerating")) {
    return "high-attention";
  }

  if (cases.some((item) => item.riskTier === "watch" || item.riskVelocity === "rising")) {
    return "watch";
  }

  return "stable";
}

function predictedPressureFromCases(cases: FarmRiskRadarCaseInput[]): FarmRiskRadarReport["radarSummary"]["predictedPressure"] {
  const score = cases.reduce((total, item) => {
    return total + riskTierRank(item.riskTier) * 10 + velocityRank(item.riskVelocity) * 6 + (item.blocked ? 18 : 0);
  }, 0);

  if (score >= 90) return "critical";
  if (score >= 60) return "high";
  if (score >= 30) return "medium";
  return "low";
}

function predictiveScore(item: FarmRiskRadarCaseInput) {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        item.commandScore +
          riskTierRank(item.riskTier) * 7 +
          velocityRank(item.riskVelocity) * 5 +
          item.evidenceCount * 0.8 +
          item.photoCount * 0.6 -
          item.openLimitations.length * 7 +
          (item.blocked ? 8 : 0),
      ),
    ),
  );
}

function createFieldRiskQuadrants(input: FarmRiskRadarInput): FieldRiskQuadrant[] {
  const groups = new Map<string, FarmRiskRadarCaseInput[]>();

  for (const item of input.cases) {
    const existing = groups.get(item.fieldId) || [];
    existing.push(item);
    groups.set(item.fieldId, existing);
  }

  return Array.from(groups.entries()).map(([fieldId, cases]) => {
    const first = cases[0];
    const avgConfidenceScore = Number(
      (cases.reduce((total, item) => total + item.confidenceScore, 0) / Math.max(1, cases.length)).toFixed(2),
    );
    const avgCommandScore = Math.round(
      cases.reduce((total, item) => total + item.commandScore, 0) / Math.max(1, cases.length),
    );
    const quadrant = quadrantForCases(cases);

    return {
      quadrantId: `quadrant-${fieldId}`,
      fieldId,
      fieldName: first?.fieldName || fieldId,
      crop: first?.crop || "n/a",
      quadrant,
      caseCount: cases.length,
      criticalCaseCount: cases.filter((item) => item.riskTier === "critical").length,
      highCaseCount: cases.filter((item) => item.riskTier === "high").length,
      blockedCaseCount: cases.filter((item) => item.blocked).length,
      avgConfidenceScore,
      avgCommandScore,
      recommendedManualFocus:
        quadrant === "critical-blocked"
          ? "review urgente e sblocco limitazioni"
          : quadrant === "high-manual"
            ? "validazione protocolli manuali"
            : quadrant === "watch-rising"
              ? "monitoraggio e follow-up"
              : "osservazione ordinaria",
    };
  });
}

function createPredictivePriorityCenter(input: FarmRiskRadarInput): PredictivePriorityItem[] {
  return input.cases
    .map((item) => {
      const score = predictiveScore(item);

      return {
        priorityId: `predictive-priority-${item.caseId}`,
        caseId: item.caseId,
        fieldId: item.fieldId,
        fieldName: item.fieldName,
        crop: item.crop,
        riskTier: item.riskTier,
        riskVelocity: item.riskVelocity,
        predictiveScore: score,
        forecastReason: [
          `riskTier=${item.riskTier}`,
          `riskVelocity=${item.riskVelocity}`,
          `commandScore=${item.commandScore}`,
          `confidenceScore=${item.confidenceScore}`,
          `blocked=${item.blocked}`,
          `openLimitations=${item.openLimitations.length}`,
        ].join(" | "),
        nextHumanAction:
          item.blocked || item.riskTier === "critical"
            ? "review urgente e rimozione blocchi"
            : item.manualProtocolReady
              ? "validare protocollo manuale"
              : item.scoutingMissionReady
                ? "assegnare missione scouting"
                : "mantenere watchlist",
        prohibitedAutomation: [
          "creazione task automatica",
          "creazione intervento automatica",
          "persistenza automatica",
          "esecuzione automatica",
          "share pubblico automatico",
        ],
      };
    })
    .sort((a, b) => b.predictiveScore - a.predictiveScore);
}

function createForecastWindows(input: FarmRiskRadarInput): ForecastWindow[] {
  const critical = input.cases.filter((item) => item.riskTier === "critical" || item.blocked);
  const high = input.cases.filter((item) => item.riskTier === "high" || item.riskVelocity === "accelerating");
  const watch = input.cases.filter((item) => item.riskTier === "watch" || item.riskVelocity === "rising");
  const all = input.cases;

  return [
    {
      forecastId: "forecast-t1",
      label: "T+1 giorno",
      horizon: "T+1",
      expectedRiskPressure: critical.length ? "critical" : high.length ? "high" : "medium",
      caseIds: critical.map((item) => item.caseId),
      recommendedManualPreparation: ["review urgente", "check blocchi", "shot list minima", "debrief obbligatorio"],
      forbiddenActions: ["esecuzione automatica", "prodotto", "dosaggio", "persistenza automatica"],
    },
    {
      forecastId: "forecast-t3",
      label: "T+3 giorni",
      horizon: "T+3",
      expectedRiskPressure: high.length ? "high" : watch.length ? "medium" : "low",
      caseIds: high.map((item) => item.caseId),
      recommendedManualPreparation: ["missione scouting", "foto confronto", "brief operatore"],
      forbiddenActions: ["intervento automatico", "task automatico", "share pubblico automatico"],
    },
    {
      forecastId: "forecast-t7",
      label: "T+7 giorni",
      horizon: "T+7",
      expectedRiskPressure: watch.length ? "medium" : "low",
      caseIds: watch.map((item) => item.caseId),
      recommendedManualPreparation: ["follow-up", "controllo sano", "aggiornamento trend"],
      forbiddenActions: ["prescrizione prodotto", "dosaggio", "DB write automatico"],
    },
    {
      forecastId: "forecast-t14",
      label: "T+14 giorni",
      horizon: "T+14",
      expectedRiskPressure: all.length ? "medium" : "low",
      caseIds: all.map((item) => item.caseId),
      recommendedManualPreparation: ["review board", "sintesi direzionale", "archivio redatto"],
      forbiddenActions: ["automazione non revisionata", "esecuzione automatica"],
    },
  ];
}

function createResourceStressForecast(input: FarmRiskRadarInput): ResourceStressItem[] {
  return input.resources.map((resource) => {
    const stressRatio = Number((resource.allocatedUnits / Math.max(1, resource.capacityUnits)).toFixed(2));
    const stressStatus =
      stressRatio > 1
        ? "over-limit"
        : stressRatio >= 0.9
          ? "near-limit"
          : stressRatio >= 0.55
            ? "loaded"
            : "available";

    return {
      stressId: `resource-stress-${resource.resourceId}`,
      resourceId: resource.resourceId,
      label: resource.label,
      role: resource.role,
      capacityUnits: resource.capacityUnits,
      allocatedUnits: resource.allocatedUnits,
      stressRatio,
      stressStatus,
      mitigation:
        stressStatus === "over-limit" || stressStatus === "near-limit"
          ? ["ridurre missioni non urgenti", "spostare review", "prioritizzare casi critici"]
          : ["mantenere disponibilità", "preparare debrief", "monitorare carico"],
    };
  });
}

function createCriticalWatchlist(input: FarmRiskRadarInput): CriticalWatchlistItem[] {
  return input.cases
    .filter((item) => item.riskTier === "critical" || item.riskTier === "high" || item.blocked || item.riskVelocity === "accelerating")
    .map((item) => ({
      watchId: `watch-${item.caseId}`,
      caseId: item.caseId,
      fieldName: item.fieldName,
      watchReason: [
        `riskTier=${item.riskTier}`,
        `riskVelocity=${item.riskVelocity}`,
        `blocked=${item.blocked}`,
        `manualProtocolReady=${item.manualProtocolReady}`,
      ].join(" | "),
      riskTier: item.riskTier,
      riskVelocity: item.riskVelocity,
      blocked: item.blocked,
      requiredReviewDecision: item.blocked
        ? "sbloccare o respingere caso"
        : item.manualProtocolReady
          ? "validare protocollo manuale"
          : "definire follow-up manuale",
    }));
}

function createExecutiveRiskBriefing(
  input: FarmRiskRadarInput,
  priority: PredictivePriorityItem[],
  pressure: FarmRiskRadarReport["radarSummary"]["predictedPressure"],
): ExecutiveRiskBriefing {
  const top = priority[0];

  return {
    briefingId: `executive-risk-${input.farmId || "draft"}`,
    title: "Executive risk briefing agricolo",
    summaryLines: [
      `farm=${input.farmName || "missing"}`,
      `window=${input.radarWindowLabel || "missing"}`,
      `pressure=${pressure}`,
      `caseCount=${input.cases.length}`,
      `topPriorityCase=${top?.caseId || "none"}`,
    ],
    topRisks: [
      "casi bloccati richiedono review",
      "carico risorse da verificare",
      "foto e controlli sani devono restare aggiornati",
      "nessuna automazione consentita",
    ],
    nextBoardActions: [
      "rivedere watchlist critica",
      "allocare revisore",
      "confermare missioni manuali",
      "preparare export redatto",
    ],
    redactedForOperations: true,
  };
}

function createComplianceRadar(input: FarmRiskRadarInput): ComplianceRadarItem[] {
  return [
    {
      complianceId: "compliance-provider",
      label: "Provider AI live",
      passed: true,
      evidence: ["providerCalled=false", "providerAiReady=false"],
      prohibitedActions: ["chiamata provider live", "chiave AI in UI", "endpoint diagnosis live"],
    },
    {
      complianceId: "compliance-db",
      label: "Persistenza e automazioni",
      passed: true,
      evidence: ["persistencePerformed=false", "taskCreated=false", "interventionCreated=false"],
      prohibitedActions: ["persistenza automatica", "task automatico", "intervento automatico"],
    },
    {
      complianceId: "compliance-execution",
      label: "Esecuzione operativa",
      passed: true,
      evidence: ["automaticExecutionPerformed=false", "manualDispatchOnly=true"],
      prohibitedActions: ["esecuzione automatica", "prodotto", "dosaggio"],
    },
    {
      complianceId: "compliance-review",
      label: "Human review",
      passed: input.humanReviewRequired === true,
      evidence: ["humanReviewRequired=true", "redactedOutputOnly=true"],
      prohibitedActions: ["conversione non revisionata", "share pubblico automatico"],
    },
  ];
}

export function createFarmRiskRadarReport(input: FarmRiskRadarInput = defaultFarmRiskRadarInput): FarmRiskRadarReport {
  const cases = input.cases.map((item) => ({
    ...item,
    linkedFingerprints: normalize(item.linkedFingerprints || []),
    openLimitations: normalize(item.openLimitations || []),
  }));
  const resources = input.resources.map((item) => ({
    ...item,
    riskConstraints: normalize(item.riskConstraints || []),
  }));
  const radarInput = { ...input, cases, resources };
  const fieldRiskQuadrants = input.includeRiskQuadrants ? createFieldRiskQuadrants(radarInput) : [];
  const predictivePriorityCenter = input.includePredictivePriority ? createPredictivePriorityCenter(radarInput) : [];
  const forecastWindows = input.includeForecastWindows ? createForecastWindows(radarInput) : [];
  const resourceStressForecast = input.includeResourceStress ? createResourceStressForecast(radarInput) : [];
  const criticalWatchlist = input.includeCriticalWatchlist ? createCriticalWatchlist(radarInput) : [];
  const complianceRadar = input.includeComplianceRadar ? createComplianceRadar(radarInput) : [];
  const predictedPressure = predictedPressureFromCases(cases);
  const executiveRiskBriefing = createExecutiveRiskBriefing(radarInput, predictivePriorityCenter, predictedPressure);
  const fieldCount = new Set(cases.map((item) => item.fieldId)).size;
  const criticalCaseCount = cases.filter((item) => item.riskTier === "critical").length;
  const highCaseCount = cases.filter((item) => item.riskTier === "high").length;
  const blockedCaseCount = cases.filter((item) => item.blocked).length;
  const risingCaseCount = cases.filter((item) => item.riskVelocity === "rising" || item.riskVelocity === "accelerating").length;
  const totalEvidenceCount = cases.reduce((total, item) => total + item.evidenceCount, 0);
  const totalPhotoCount = cases.reduce((total, item) => total + item.photoCount, 0);
  const radarReady = Boolean(
    input.farmId.trim() &&
      input.farmName.trim() &&
      input.radarWindowLabel.trim() &&
      input.operatorName.trim() &&
      input.humanReviewRequired &&
      cases.length >= 1 &&
      resources.length >= 1,
  );
  const radarId = `farm-risk-radar-${input.farmId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const radarFingerprint = fingerprint(
    [
      radarId,
      input.farmName,
      input.radarWindowLabel,
      input.operatorName,
      cases.map((item) => `${item.caseId}:${item.fieldId}:${item.riskTier}:${item.riskVelocity}:${item.commandScore}`).join("|"),
      resources.map((item) => `${item.resourceId}:${item.role}:${item.allocatedUnits}/${item.capacityUnits}`).join("|"),
      String(radarReady),
    ].join("|"),
  );
  const top = predictivePriorityCenter[0];
  const confidenceScore = Number(
    Math.min(
      0.96,
      0.35 +
        Math.min(cases.length, 30) * 0.02 +
        Math.min(resources.length, 12) * 0.018 +
        Math.min(totalEvidenceCount, 50) * 0.009 +
        Math.min(totalPhotoCount, 50) * 0.006,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "farm-risk-radar-dry-run",
    radarVersion: "agri-ai-farm-risk-radar-v1",
    radarId,
    radarFingerprint,
    radarReady,
    inputSummary: {
      farmId: input.farmId.trim(),
      farmName: input.farmName.trim(),
      radarWindowLabel: input.radarWindowLabel.trim(),
      operatorName: input.operatorName.trim(),
      caseCount: cases.length,
      resourceCount: resources.length,
      fieldCount,
      criticalCaseCount,
      highCaseCount,
      blockedCaseCount,
      risingCaseCount,
      totalEvidenceCount,
      totalPhotoCount,
      humanReviewRequired: true,
    },
    fieldRiskQuadrants,
    predictivePriorityCenter,
    forecastWindows,
    resourceStressForecast,
    criticalWatchlist,
    executiveRiskBriefing: input.includeExecutiveBriefing ? executiveRiskBriefing : {
      briefingId: `executive-risk-${input.farmId || "draft"}`,
      title: "Executive risk briefing agricolo",
      summaryLines: [],
      topRisks: [],
      nextBoardActions: [],
      redactedForOperations: true,
    },
    complianceRadar,
    radarSummary: {
      radarStatus: radarStatusFromCases(cases),
      topPriorityCaseId: top?.caseId || "",
      topPriorityFieldName: top?.fieldName || "",
      nextHumanAction:
        blockedCaseCount > 0
          ? "review urgente dei casi bloccati"
          : criticalCaseCount > 0
            ? "validare watchlist critica"
            : highCaseCount > 0
              ? "preparare missioni e protocolli manuali"
              : "monitorare andamento",
      predictedPressure,
      confidenceScore,
      reasons: [
        `caseCount=${cases.length}`,
        `fieldCount=${fieldCount}`,
        `criticalCaseCount=${criticalCaseCount}`,
        `highCaseCount=${highCaseCount}`,
        `blockedCaseCount=${blockedCaseCount}`,
        `risingCaseCount=${risingCaseCount}`,
        `totalEvidenceCount=${totalEvidenceCount}`,
        `totalPhotoCount=${totalPhotoCount}`,
      ],
      blockingLimitations: [
        "nessuna chiamata provider AI live",
        "radar locale non autorizza esecuzione",
        "nessuna persistenza DB",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
        "human review obbligatoria",
      ],
    },
    premiumSignals: {
      farmRiskRadarReady: radarReady,
      predictivePriorityReady: predictivePriorityCenter.length > 0,
      fieldRiskQuadrantsReady: fieldRiskQuadrants.length > 0,
      forecastWindowsReady: forecastWindows.length > 0,
      resourceStressForecastReady: resourceStressForecast.length > 0,
      criticalWatchlistReady: criticalWatchlist.length > 0,
      executiveBriefingReady: input.includeExecutiveBriefing,
      complianceRadarReady: complianceRadar.length > 0,
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

export function createReadyFarmRiskRadarReport() {
  return createFarmRiskRadarReport(createFarmRiskRadarFixture());
}

export function createBlockedFarmRiskRadarReport() {
  return createFarmRiskRadarReport(defaultFarmRiskRadarInput);
}

export function formatFarmRiskRadarReport(report: FarmRiskRadarReport) {
  return [
    "AI Farm Risk Radar & Predictive Priority Center",
    "",
    `Radar ID: ${report.radarId}`,
    `Radar fingerprint: ${report.radarFingerprint}`,
    `Version: ${report.radarVersion}`,
    `Mode: ${report.mode}`,
    `radarReady=${report.radarReady}`,
    "",
    "Input summary:",
    `- farmId=${report.inputSummary.farmId || "missing"}`,
    `- farmName=${report.inputSummary.farmName || "missing"}`,
    `- radarWindowLabel=${report.inputSummary.radarWindowLabel || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- caseCount=${report.inputSummary.caseCount}`,
    `- resourceCount=${report.inputSummary.resourceCount}`,
    `- fieldCount=${report.inputSummary.fieldCount}`,
    `- criticalCaseCount=${report.inputSummary.criticalCaseCount}`,
    `- highCaseCount=${report.inputSummary.highCaseCount}`,
    `- blockedCaseCount=${report.inputSummary.blockedCaseCount}`,
    `- risingCaseCount=${report.inputSummary.risingCaseCount}`,
    `- totalEvidenceCount=${report.inputSummary.totalEvidenceCount}`,
    `- totalPhotoCount=${report.inputSummary.totalPhotoCount}`,
    "- humanReviewRequired=true",
    "",
    "Radar summary:",
    `- radarStatus=${report.radarSummary.radarStatus}`,
    `- topPriorityCaseId=${report.radarSummary.topPriorityCaseId || "none"}`,
    `- topPriorityFieldName=${report.radarSummary.topPriorityFieldName || "none"}`,
    `- nextHumanAction=${report.radarSummary.nextHumanAction}`,
    `- predictedPressure=${report.radarSummary.predictedPressure}`,
    `- confidenceScore=${report.radarSummary.confidenceScore}`,
    ...report.radarSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Field risk quadrants:",
    ...report.fieldRiskQuadrants.map(
      (item) =>
        `- ${item.fieldId} | quadrant=${item.quadrant} | cases=${item.caseCount} | blocked=${item.blockedCaseCount}`,
    ),
    "",
    "Predictive priority center:",
    ...report.predictivePriorityCenter.map(
      (item) =>
        `- ${item.caseId} | field=${item.fieldName} | tier=${item.riskTier} | velocity=${item.riskVelocity} | predictiveScore=${item.predictiveScore}`,
    ),
    "",
    "Forecast windows:",
    ...report.forecastWindows.map(
      (item) => `- ${item.forecastId} | horizon=${item.horizon} | pressure=${item.expectedRiskPressure} | cases=${item.caseIds.join(", ") || "none"}`,
    ),
    "",
    "Resource stress forecast:",
    ...report.resourceStressForecast.map(
      (item) =>
        `- ${item.resourceId} | load=${item.allocatedUnits}/${item.capacityUnits} | stressRatio=${item.stressRatio} | status=${item.stressStatus}`,
    ),
    "",
    "Critical watchlist:",
    ...report.criticalWatchlist.map(
      (item) => `- ${item.caseId} | tier=${item.riskTier} | velocity=${item.riskVelocity} | blocked=${item.blocked}`,
    ),
    "",
    "Executive risk briefing:",
    `- ${report.executiveRiskBriefing.title}`,
    ...report.executiveRiskBriefing.summaryLines.map((line) => `- ${line}`),
    "",
    "Compliance radar:",
    ...report.complianceRadar.map(
      (item) => `- ${item.complianceId} | passed=${item.passed} | label=${item.label}`,
    ),
    "",
    "Premium signals:",
    `- farmRiskRadarReady=${report.premiumSignals.farmRiskRadarReady}`,
    `- predictivePriorityReady=${report.premiumSignals.predictivePriorityReady}`,
    `- fieldRiskQuadrantsReady=${report.premiumSignals.fieldRiskQuadrantsReady}`,
    `- forecastWindowsReady=${report.premiumSignals.forecastWindowsReady}`,
    `- resourceStressForecastReady=${report.premiumSignals.resourceStressForecastReady}`,
    `- criticalWatchlistReady=${report.premiumSignals.criticalWatchlistReady}`,
    `- executiveBriefingReady=${report.premiumSignals.executiveBriefingReady}`,
    `- complianceRadarReady=${report.premiumSignals.complianceRadarReady}`,
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
