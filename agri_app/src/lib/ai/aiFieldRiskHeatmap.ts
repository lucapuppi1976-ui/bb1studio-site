export type FieldRiskTier = "monitor" | "attention" | "high-priority" | "urgent-human-review";

export type FieldRiskZoneInput = {
  zoneId: string;
  label: string;
  rowRange: string;
  blockHint: string;
  severityScore: number;
  evidenceCount: number;
  photoCount: number;
  trendSignal: "improving" | "stable" | "worsening" | "insufficient-data";
  adjacency: string[];
  suspectedPatterns: string[];
  coverageConfidence: number;
  operatorNote: string;
};

export type FieldRiskHeatmapInput = {
  caseId: string;
  operatorName: string;
  crop: string;
  fieldName: string;
  locationHint: string;
  globalTrendDirection: "improving" | "stable" | "worsening" | "insufficient-data";
  scoutingPlanFingerprint: string;
  temporalTrendFingerprint: string;
  fieldIntelligenceFingerprint: string;
  zones: FieldRiskZoneInput[];
  includeRiskHeatmap: boolean;
  includeSpreadModel: boolean;
  includeWorkQueue: boolean;
  includeSamplingFocus: boolean;
  includeReviewerQueue: boolean;
  includeMapLegend: boolean;
  humanReviewRequired: boolean;
};

export type FieldRiskHeatmapCell = {
  cellId: string;
  zoneId: string;
  label: string;
  rowRange: string;
  blockHint: string;
  riskScore: number;
  riskTier: FieldRiskTier;
  severityScore: number;
  evidenceCount: number;
  photoCount: number;
  trendSignal: string;
  coverageConfidence: number;
  suspectedPatterns: string[];
  adjacency: string[];
  visualToken: "green" | "yellow" | "orange" | "red";
  reasonCodes: string[];
};

export type FieldSpreadModel = {
  modelId: string;
  fromZoneId: string;
  toZoneId: string;
  spreadRiskScore: number;
  spreadRiskTier: FieldRiskTier;
  reasons: string[];
  blockingLimitations: string[];
};

export type FieldWorkQueueItem = {
  itemId: string;
  zoneId: string;
  priority: FieldRiskTier;
  label: string;
  manualAction: string;
  minimumEvidenceBeforeAction: string[];
  humanReviewGate: string[];
  prohibitedAutomation: string[];
};

export type FieldSamplingFocusItem = {
  focusId: string;
  zoneId: string;
  label: string;
  recommendedSamples: string[];
  nextPhotos: string[];
  rejectionCriteria: string[];
};

export type FieldRiskMapLegendItem = {
  tier: FieldRiskTier;
  visualToken: "green" | "yellow" | "orange" | "red";
  meaning: string;
  requiredReview: string;
};

export type FieldRiskHeatmapReport = {
  ok: true;
  mode: "field-risk-heatmap-dry-run";
  heatmapVersion: "agri-ai-field-risk-heatmap-v1";
  heatmapId: string;
  heatmapFingerprint: string;
  heatmapReady: boolean;
  inputSummary: {
    caseId: string;
    operatorName: string;
    crop: string;
    fieldName: string;
    locationHint: string;
    globalTrendDirection: string;
    zoneCount: number;
    totalPhotoCount: number;
    totalEvidenceCount: number;
    humanReviewRequired: true;
  };
  heatmapCells: FieldRiskHeatmapCell[];
  spreadModel: FieldSpreadModel[];
  workQueue: FieldWorkQueueItem[];
  samplingFocus: FieldSamplingFocusItem[];
  reviewerQueue: FieldWorkQueueItem[];
  mapLegend: FieldRiskMapLegendItem[];
  heatmapSummary: {
    dominantRiskTier: FieldRiskTier;
    highestRiskZoneId: string;
    highestRiskScore: number;
    highPriorityZoneCount: number;
    urgentReviewZoneCount: number;
    samplingFocusCount: number;
    reviewerQueueCount: number;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    riskHeatmapReady: boolean;
    zonePrioritizationReady: boolean;
    spreadModelReady: boolean;
    workQueueReady: boolean;
    samplingFocusReady: boolean;
    reviewerQueueReady: boolean;
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
    humanReviewRequired: true;
    localAnalysisOnly: true;
    redactedOutputOnly: true;
  };
};

export const defaultFieldRiskHeatmapInput: FieldRiskHeatmapInput = {
  caseId: "",
  operatorName: "",
  crop: "",
  fieldName: "",
  locationHint: "",
  globalTrendDirection: "insufficient-data",
  scoutingPlanFingerprint: "",
  temporalTrendFingerprint: "",
  fieldIntelligenceFingerprint: "",
  zones: [],
  includeRiskHeatmap: true,
  includeSpreadModel: true,
  includeWorkQueue: true,
  includeSamplingFocus: true,
  includeReviewerQueue: true,
  includeMapLegend: true,
  humanReviewRequired: true,
};

export function createFieldRiskHeatmapFixture(): FieldRiskHeatmapInput {
  return {
    caseId: "field-risk-heatmap-case-ready",
    operatorName: "Operatore campo",
    crop: "olivo",
    fieldName: "appezzamento nord",
    locationHint: "settore nord — fila 4",
    globalTrendDirection: "worsening",
    scoutingPlanFingerprint: "field-scouting-ready-fingerprint",
    temporalTrendFingerprint: "temporal-trend-ready-fingerprint",
    fieldIntelligenceFingerprint: "field-intelligence-ready-fingerprint",
    zones: [
      {
        zoneId: "zone-core",
        label: "Zona core sintomatica",
        rowRange: "fila 4-5",
        blockHint: "settore nord",
        severityScore: 4,
        evidenceCount: 8,
        photoCount: 5,
        trendSignal: "worsening",
        adjacency: ["zone-border", "zone-control"],
        suspectedPatterns: ["macchie persistenti", "ingiallimento progressivo", "opacità pagina inferiore"],
        coverageConfidence: 0.82,
        operatorNote: "Evidenza maggiore e pattern ripetuto.",
      },
      {
        zoneId: "zone-border",
        label: "Bordo espansione",
        rowRange: "fila 6",
        blockHint: "bordo nord-est",
        severityScore: 2,
        evidenceCount: 4,
        photoCount: 3,
        trendSignal: "stable",
        adjacency: ["zone-core", "zone-control"],
        suspectedPatterns: ["macchie isolate", "ingiallimento leggero"],
        coverageConfidence: 0.64,
        operatorNote: "Possibile bordo del fenomeno.",
      },
      {
        zoneId: "zone-control",
        label: "Controllo sano",
        rowRange: "fila 8",
        blockHint: "settore nord controllo",
        severityScore: 1,
        evidenceCount: 2,
        photoCount: 3,
        trendSignal: "stable",
        adjacency: ["zone-border"],
        suspectedPatterns: ["nessun sintomo dominante"],
        coverageConfidence: 0.7,
        operatorNote: "Confronto sano utile per luce e variabilità.",
      },
    ],
    includeRiskHeatmap: true,
    includeSpreadModel: true,
    includeWorkQueue: true,
    includeSamplingFocus: true,
    includeReviewerQueue: true,
    includeMapLegend: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `field-risk-heatmap-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function riskTierFromScore(score: number): FieldRiskTier {
  if (score >= 80) return "urgent-human-review";
  if (score >= 60) return "high-priority";
  if (score >= 35) return "attention";
  return "monitor";
}

function visualTokenFromTier(tier: FieldRiskTier): FieldRiskHeatmapCell["visualToken"] {
  if (tier === "urgent-human-review") return "red";
  if (tier === "high-priority") return "orange";
  if (tier === "attention") return "yellow";
  return "green";
}

function trendWeight(trend: FieldRiskZoneInput["trendSignal"]) {
  if (trend === "worsening") return 22;
  if (trend === "stable") return 8;
  if (trend === "improving") return -8;
  return 0;
}

function createReasonCodes(zone: FieldRiskZoneInput, score: number) {
  const reasons = [
    `severityScore=${zone.severityScore}`,
    `evidenceCount=${zone.evidenceCount}`,
    `photoCount=${zone.photoCount}`,
    `trendSignal=${zone.trendSignal}`,
    `coverageConfidence=${zone.coverageConfidence}`,
    `riskScore=${score}`,
  ];

  if (zone.trendSignal === "worsening") {
    reasons.push("trend-worsening");
  }

  if (zone.coverageConfidence < 0.55) {
    reasons.push("coverage-low");
  }

  if (zone.severityScore >= 3) {
    reasons.push("severity-high");
  }

  if (zone.adjacency.length) {
    reasons.push(`adjacency=${zone.adjacency.length}`);
  }

  return reasons;
}

function createHeatmapCells(input: FieldRiskHeatmapInput): FieldRiskHeatmapCell[] {
  return input.zones.map((zone) => {
    const patterns = normalize(zone.suspectedPatterns || []);
    const adjacency = normalize(zone.adjacency || []);
    const score = clampScore(
      zone.severityScore * 16 +
        zone.evidenceCount * 4 +
        zone.photoCount * 2 +
        trendWeight(zone.trendSignal) +
        adjacency.length * 3 +
        zone.coverageConfidence * 12,
    );
    const tier = riskTierFromScore(score);

    return {
      cellId: `risk-cell-${zone.zoneId}`,
      zoneId: zone.zoneId,
      label: zone.label,
      rowRange: zone.rowRange,
      blockHint: zone.blockHint,
      riskScore: score,
      riskTier: tier,
      severityScore: zone.severityScore,
      evidenceCount: zone.evidenceCount,
      photoCount: zone.photoCount,
      trendSignal: zone.trendSignal,
      coverageConfidence: zone.coverageConfidence,
      suspectedPatterns: patterns,
      adjacency,
      visualToken: visualTokenFromTier(tier),
      reasonCodes: createReasonCodes(
        {
          ...zone,
          suspectedPatterns: patterns,
          adjacency,
        },
        score,
      ),
    };
  });
}

function createSpreadModel(cells: FieldRiskHeatmapCell[]): FieldSpreadModel[] {
  const byId = new Map(cells.map((cell) => [cell.zoneId, cell]));
  const models: FieldSpreadModel[] = [];

  for (const cell of cells) {
    for (const adjacentId of cell.adjacency) {
      const adjacent = byId.get(adjacentId);

      if (!adjacent) {
        continue;
      }

      const averageScore = clampScore((cell.riskScore + adjacent.riskScore) / 2);
      const spreadBonus = cell.trendSignal === "worsening" || adjacent.trendSignal === "worsening" ? 12 : 0;
      const spreadRiskScore = clampScore(averageScore + spreadBonus);
      const spreadRiskTier = riskTierFromScore(spreadRiskScore);
      const modelId = fingerprint(`${cell.zoneId}->${adjacent.zoneId}:${spreadRiskScore}`);

      models.push({
        modelId,
        fromZoneId: cell.zoneId,
        toZoneId: adjacent.zoneId,
        spreadRiskScore,
        spreadRiskTier,
        reasons: [
          `fromScore=${cell.riskScore}`,
          `toScore=${adjacent.riskScore}`,
          `fromTrend=${cell.trendSignal}`,
          `toTrend=${adjacent.trendSignal}`,
          `adjacency=${cell.zoneId}->${adjacent.zoneId}`,
        ],
        blockingLimitations: [
          "modello locale non epidemiologico",
          "richiede conferma in campo",
          "nessuna previsione definitiva",
          "nessuna prescrizione prodotto o dosaggio",
        ],
      });
    }
  }

  return models;
}

function createWorkQueue(cells: FieldRiskHeatmapCell[]): FieldWorkQueueItem[] {
  return [...cells]
    .sort((left, right) => right.riskScore - left.riskScore)
    .map((cell, index) => ({
      itemId: `work-queue-${cell.zoneId}`,
      zoneId: cell.zoneId,
      priority: cell.riskTier,
      label: `${index + 1}. ${cell.label}`,
      manualAction:
        cell.riskTier === "urgent-human-review"
          ? "Revisione tecnica prioritaria e nuova acquisizione foto completa"
          : cell.riskTier === "high-priority"
            ? "Completare sampling e confronto con bordo"
            : cell.riskTier === "attention"
              ? "Monitorare con foto follow-up e controllo sano"
              : "Tenere in osservazione",
      minimumEvidenceBeforeAction: [
        "foto contesto",
        "foto pianta intera",
        "foto tessuto sintomatico",
        "foto controllo sano",
        "nota operatore",
      ],
      humanReviewGate: [
        "conferma zona",
        "conferma qualità immagini",
        "conferma nessuna prescrizione automatica",
        "decisione revisore",
      ],
      prohibitedAutomation: [
        "nessuna creazione automatica task",
        "nessuna creazione automatica intervento",
        "nessuna esecuzione automatica",
        "nessun prodotto",
        "nessun dosaggio",
      ],
    }));
}

function createSamplingFocus(cells: FieldRiskHeatmapCell[]): FieldSamplingFocusItem[] {
  return cells.map((cell) => ({
    focusId: `sampling-focus-${cell.zoneId}`,
    zoneId: cell.zoneId,
    label: `Sampling focus — ${cell.label}`,
    recommendedSamples:
      cell.riskTier === "urgent-human-review" || cell.riskTier === "high-priority"
        ? ["sintomatico core", "bordo", "controllo sano", "macro pagina inferiore"]
        : ["contesto", "controllo sano", "foto follow-up"],
    nextPhotos: [
      "pianta intera",
      "foglia pagina superiore",
      "foglia pagina inferiore",
      "macro sintomo",
      "controllo sano vicino",
    ],
    rejectionCriteria: [
      "foto sfocata",
      "luce non comparabile",
      "zona non identificabile",
      "assenza controllo sano",
      "singola foto senza contesto",
    ],
  }));
}

function createLegend(): FieldRiskMapLegendItem[] {
  return [
    {
      tier: "monitor",
      visualToken: "green",
      meaning: "Area da osservare senza urgenza.",
      requiredReview: "review ordinaria",
    },
    {
      tier: "attention",
      visualToken: "yellow",
      meaning: "Area con segnali da completare con evidenza aggiuntiva.",
      requiredReview: "review prima di conversioni manuali",
    },
    {
      tier: "high-priority",
      visualToken: "orange",
      meaning: "Area prioritaria per scouting e follow-up.",
      requiredReview: "review tecnica necessaria",
    },
    {
      tier: "urgent-human-review",
      visualToken: "red",
      meaning: "Area critica da bloccare fino a revisione umana.",
      requiredReview: "review urgente obbligatoria",
    },
  ];
}

function dominantTier(cells: FieldRiskHeatmapCell[]): FieldRiskTier {
  const rank: Record<FieldRiskTier, number> = {
    monitor: 1,
    attention: 2,
    "high-priority": 3,
    "urgent-human-review": 4,
  };

  return cells.reduce<FieldRiskTier>(
    (current, cell) => (rank[cell.riskTier] > rank[current] ? cell.riskTier : current),
    "monitor",
  );
}

export function createFieldRiskHeatmapReport(
  input: FieldRiskHeatmapInput = defaultFieldRiskHeatmapInput,
): FieldRiskHeatmapReport {
  const heatmapCells = input.includeRiskHeatmap ? createHeatmapCells(input) : [];
  const spreadModel = input.includeSpreadModel ? createSpreadModel(heatmapCells) : [];
  const workQueue = input.includeWorkQueue ? createWorkQueue(heatmapCells) : [];
  const samplingFocus = input.includeSamplingFocus ? createSamplingFocus(heatmapCells) : [];
  const reviewerQueue = input.includeReviewerQueue
    ? workQueue.filter((item) => item.priority === "urgent-human-review" || item.priority === "high-priority")
    : [];
  const mapLegend = input.includeMapLegend ? createLegend() : [];
  const totalPhotoCount = input.zones.reduce((total, zone) => total + zone.photoCount, 0);
  const totalEvidenceCount = input.zones.reduce((total, zone) => total + zone.evidenceCount, 0);
  const highest = heatmapCells.reduce<FieldRiskHeatmapCell | null>(
    (current, cell) => (!current || cell.riskScore > current.riskScore ? cell : current),
    null,
  );
  const heatmapReady = Boolean(
    input.caseId.trim() &&
      input.operatorName.trim() &&
      input.crop.trim() &&
      input.fieldName.trim() &&
      input.locationHint.trim() &&
      input.humanReviewRequired &&
      input.zones.length >= 2 &&
      totalPhotoCount >= 2 &&
      totalEvidenceCount >= 2,
  );
  const heatmapId = `field-risk-heatmap-${input.caseId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const heatmapFingerprint = fingerprint(
    [
      heatmapId,
      input.operatorName,
      input.crop,
      input.fieldName,
      input.locationHint,
      input.globalTrendDirection,
      input.scoutingPlanFingerprint,
      input.temporalTrendFingerprint,
      input.fieldIntelligenceFingerprint,
      heatmapCells.map((cell) => `${cell.zoneId}:${cell.riskScore}:${cell.riskTier}`).join("|"),
      String(heatmapReady),
    ].join("|"),
  );
  const highPriorityZoneCount = heatmapCells.filter(
    (cell) => cell.riskTier === "high-priority" || cell.riskTier === "urgent-human-review",
  ).length;
  const urgentReviewZoneCount = heatmapCells.filter((cell) => cell.riskTier === "urgent-human-review").length;
  const confidenceScore = Number(
    Math.min(
      0.92,
      0.24 +
        heatmapCells.length * 0.08 +
        Math.min(totalEvidenceCount, 20) * 0.018 +
        Math.min(totalPhotoCount, 20) * 0.012,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "field-risk-heatmap-dry-run",
    heatmapVersion: "agri-ai-field-risk-heatmap-v1",
    heatmapId,
    heatmapFingerprint,
    heatmapReady,
    inputSummary: {
      caseId: input.caseId.trim(),
      operatorName: input.operatorName.trim(),
      crop: input.crop.trim(),
      fieldName: input.fieldName.trim(),
      locationHint: input.locationHint.trim(),
      globalTrendDirection: input.globalTrendDirection,
      zoneCount: input.zones.length,
      totalPhotoCount,
      totalEvidenceCount,
      humanReviewRequired: true,
    },
    heatmapCells,
    spreadModel,
    workQueue,
    samplingFocus,
    reviewerQueue,
    mapLegend,
    heatmapSummary: {
      dominantRiskTier: dominantTier(heatmapCells),
      highestRiskZoneId: highest?.zoneId || "",
      highestRiskScore: highest?.riskScore || 0,
      highPriorityZoneCount,
      urgentReviewZoneCount,
      samplingFocusCount: samplingFocus.length,
      reviewerQueueCount: reviewerQueue.length,
      confidenceScore,
      reasons: [
        `zoneCount=${input.zones.length}`,
        `totalPhotoCount=${totalPhotoCount}`,
        `totalEvidenceCount=${totalEvidenceCount}`,
        `globalTrendDirection=${input.globalTrendDirection}`,
        `highPriorityZoneCount=${highPriorityZoneCount}`,
        `urgentReviewZoneCount=${urgentReviewZoneCount}`,
      ],
      blockingLimitations: [
        "nessuna chiamata provider AI live",
        "mappa rischio locale non diagnostica definitiva",
        "nessuna persistenza DB",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
        "human review obbligatoria",
      ],
    },
    premiumSignals: {
      riskHeatmapReady: heatmapReady,
      zonePrioritizationReady: heatmapCells.length > 0,
      spreadModelReady: spreadModel.length > 0,
      workQueueReady: workQueue.length > 0,
      samplingFocusReady: samplingFocus.length > 0,
      reviewerQueueReady: reviewerQueue.length > 0,
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
      humanReviewRequired: true,
      localAnalysisOnly: true,
      redactedOutputOnly: true,
    },
  };
}

export function createReadyFieldRiskHeatmapReport() {
  return createFieldRiskHeatmapReport(createFieldRiskHeatmapFixture());
}

export function createBlockedFieldRiskHeatmapReport() {
  return createFieldRiskHeatmapReport(defaultFieldRiskHeatmapInput);
}

export function formatFieldRiskHeatmapReport(report: FieldRiskHeatmapReport) {
  return [
    "AI Field Risk Heatmap & Zone Prioritization",
    "",
    `Heatmap ID: ${report.heatmapId}`,
    `Heatmap fingerprint: ${report.heatmapFingerprint}`,
    `Version: ${report.heatmapVersion}`,
    `Mode: ${report.mode}`,
    `heatmapReady=${report.heatmapReady}`,
    "",
    "Input summary:",
    `- caseId=${report.inputSummary.caseId || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- crop=${report.inputSummary.crop || "missing"}`,
    `- fieldName=${report.inputSummary.fieldName || "missing"}`,
    `- locationHint=${report.inputSummary.locationHint || "missing"}`,
    `- globalTrendDirection=${report.inputSummary.globalTrendDirection}`,
    `- zoneCount=${report.inputSummary.zoneCount}`,
    `- totalPhotoCount=${report.inputSummary.totalPhotoCount}`,
    `- totalEvidenceCount=${report.inputSummary.totalEvidenceCount}`,
    "- humanReviewRequired=true",
    "",
    "Heatmap summary:",
    `- dominantRiskTier=${report.heatmapSummary.dominantRiskTier}`,
    `- highestRiskZoneId=${report.heatmapSummary.highestRiskZoneId}`,
    `- highestRiskScore=${report.heatmapSummary.highestRiskScore}`,
    `- highPriorityZoneCount=${report.heatmapSummary.highPriorityZoneCount}`,
    `- urgentReviewZoneCount=${report.heatmapSummary.urgentReviewZoneCount}`,
    `- samplingFocusCount=${report.heatmapSummary.samplingFocusCount}`,
    `- reviewerQueueCount=${report.heatmapSummary.reviewerQueueCount}`,
    `- confidenceScore=${report.heatmapSummary.confidenceScore}`,
    ...report.heatmapSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Heatmap cells:",
    ...report.heatmapCells.map(
      (cell) =>
        `- ${cell.zoneId} | ${cell.label} | score=${cell.riskScore} | tier=${cell.riskTier} | token=${cell.visualToken} | reasons=${cell.reasonCodes.join(", ")}`,
    ),
    "",
    "Spread model:",
    ...report.spreadModel.map(
      (model) =>
        `- ${model.fromZoneId} -> ${model.toZoneId} | score=${model.spreadRiskScore} | tier=${model.spreadRiskTier}`,
    ),
    "",
    "Work queue:",
    ...report.workQueue.map(
      (item) => `- ${item.itemId} | priority=${item.priority} | action=${item.manualAction}`,
    ),
    "",
    "Sampling focus:",
    ...report.samplingFocus.map(
      (item) => `- ${item.focusId} | samples=${item.recommendedSamples.join(", ")} | nextPhotos=${item.nextPhotos.join(", ")}`,
    ),
    "",
    "Reviewer queue:",
    ...report.reviewerQueue.map((item) => `- ${item.itemId} | priority=${item.priority}`),
    "",
    "Map legend:",
    ...report.mapLegend.map(
      (item) => `- ${item.tier} | token=${item.visualToken} | review=${item.requiredReview}`,
    ),
    "",
    "Premium signals:",
    `- riskHeatmapReady=${report.premiumSignals.riskHeatmapReady}`,
    `- zonePrioritizationReady=${report.premiumSignals.zonePrioritizationReady}`,
    `- spreadModelReady=${report.premiumSignals.spreadModelReady}`,
    `- workQueueReady=${report.premiumSignals.workQueueReady}`,
    `- samplingFocusReady=${report.premiumSignals.samplingFocusReady}`,
    `- reviewerQueueReady=${report.premiumSignals.reviewerQueueReady}`,
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
    "- humanReviewRequired=true",
    "- localAnalysisOnly=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
