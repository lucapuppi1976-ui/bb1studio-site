export type TemporalObservationInput = {
  observationId: string;
  observedAtLabel: string;
  dayOffset: number;
  crop: string;
  locationHint: string;
  photoCount: number;
  evidenceCount: number;
  dominantSeverity: "unknown" | "low" | "medium" | "high" | "critical";
  severityScore: number;
  affectedTissues: string[];
  repeatedSigns: string[];
  distributionProfile: string[];
  operatorNote: string;
};

export type TemporalTrendInput = {
  caseId: string;
  operatorName: string;
  crop: string;
  locationHint: string;
  agronomicContext: string;
  observations: TemporalObservationInput[];
  includeTimeline: boolean;
  includeChangeVector: boolean;
  includeSeverityTrend: boolean;
  includeForecast: boolean;
  includeFollowUpSchedule: boolean;
  includeEscalationRules: boolean;
  humanReviewRequired: boolean;
};

export type TemporalChangeVector = {
  fromObservationId: string;
  toObservationId: string;
  dayDelta: number;
  severityDelta: number;
  evidenceDelta: number;
  photoDelta: number;
  newSigns: string[];
  resolvedSigns: string[];
  persistentSigns: string[];
  tissueSpread: string[];
  distributionChange: string[];
  trendDirection: "improving" | "stable" | "worsening" | "insufficient-data";
  changeFingerprint: string;
};

export type TemporalSeverityPoint = {
  observationId: string;
  observedAtLabel: string;
  dayOffset: number;
  severityScore: number;
  dominantSeverity: string;
  evidenceCount: number;
  riskBand: "monitor" | "attention" | "urgent-human-review";
};

export type TemporalFollowUpItem = {
  id: string;
  label: string;
  timing: string;
  reason: string;
  requestedEvidence: string[];
  blockingNotes: string[];
};

export type TemporalTrendReport = {
  ok: true;
  mode: "temporal-field-trend-dry-run";
  trendVersion: "agri-ai-temporal-trend-v1";
  reportId: string;
  trendFingerprint: string;
  trendReady: boolean;
  inputSummary: {
    caseId: string;
    operatorName: string;
    crop: string;
    locationHint: string;
    agronomicContext: string;
    observationCount: number;
    totalPhotoCount: number;
    totalEvidenceCount: number;
    humanReviewRequired: true;
  };
  timeline: TemporalObservationInput[];
  changeVectors: TemporalChangeVector[];
  severityTrend: TemporalSeverityPoint[];
  temporalForecast: {
    trendDirection: "improving" | "stable" | "worsening" | "insufficient-data";
    riskTier: "monitor" | "attention" | "urgent-human-review";
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  followUpSchedule: TemporalFollowUpItem[];
  escalationRules: string[];
  premiumSignals: {
    temporalComparisonReady: boolean;
    progressionTrackingReady: boolean;
    trendForecastReady: boolean;
    followUpScheduleReady: boolean;
    escalationWorkflowReady: boolean;
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

export const defaultTemporalTrendInput: TemporalTrendInput = {
  caseId: "",
  operatorName: "",
  crop: "",
  locationHint: "",
  agronomicContext: "",
  observations: [],
  includeTimeline: true,
  includeChangeVector: true,
  includeSeverityTrend: true,
  includeForecast: true,
  includeFollowUpSchedule: true,
  includeEscalationRules: true,
  humanReviewRequired: true,
};

export function createTemporalTrendFixture(): TemporalTrendInput {
  return {
    caseId: "temporal-trend-case-ready",
    operatorName: "Operatore campo",
    crop: "olivo",
    locationHint: "settore nord — fila 4",
    agronomicContext:
      "Confronto tra osservazioni fotografiche su più giorni. Nessuna richiesta prodotto o dosaggio.",
    observations: [
      {
        observationId: "obs-baseline",
        observedAtLabel: "giorno 0",
        dayOffset: 0,
        crop: "olivo",
        locationHint: "settore nord — fila 4",
        photoCount: 2,
        evidenceCount: 3,
        dominantSeverity: "medium",
        severityScore: 2,
        affectedTissues: ["leaf-upper"],
        repeatedSigns: ["macchie", "ingiallimento"],
        distributionProfile: ["localized"],
        operatorNote: "Sintomo iniziale localizzato.",
      },
      {
        observationId: "obs-follow-up-48h",
        observedAtLabel: "giorno 2",
        dayOffset: 2,
        crop: "olivo",
        locationHint: "settore nord — fila 4",
        photoCount: 3,
        evidenceCount: 5,
        dominantSeverity: "high",
        severityScore: 3,
        affectedTissues: ["leaf-upper", "leaf-underside"],
        repeatedSigns: ["macchie", "ingiallimento", "opacità"],
        distributionProfile: ["localized", "scattered"],
        operatorNote: "Aumento evidenza e tessuto coinvolto.",
      },
      {
        observationId: "obs-follow-up-96h",
        observedAtLabel: "giorno 4",
        dayOffset: 4,
        crop: "olivo",
        locationHint: "settore nord — fila 4",
        photoCount: 3,
        evidenceCount: 6,
        dominantSeverity: "high",
        severityScore: 3,
        affectedTissues: ["leaf-upper", "leaf-underside"],
        repeatedSigns: ["macchie", "ingiallimento", "opacità"],
        distributionProfile: ["scattered"],
        operatorNote: "Sintomo persistente, non ancora stabilizzato.",
      },
    ],
    includeTimeline: true,
    includeChangeVector: true,
    includeSeverityTrend: true,
    includeForecast: true,
    includeFollowUpSchedule: true,
    includeEscalationRules: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `temporal-trend-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function unique(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function sortedObservations(input: TemporalTrendInput) {
  return [...(input.observations || [])].sort((left, right) => left.dayOffset - right.dayOffset);
}

function riskBandFromScore(score: number): "monitor" | "attention" | "urgent-human-review" {
  if (score >= 3) return "urgent-human-review";
  if (score >= 2) return "attention";
  return "monitor";
}

function directionFromDelta(severityDelta: number, evidenceDelta: number): TemporalChangeVector["trendDirection"] {
  if (severityDelta > 0 || evidenceDelta >= 2) return "worsening";
  if (severityDelta < 0 || evidenceDelta <= -2) return "improving";
  if (severityDelta === 0 && Math.abs(evidenceDelta) <= 1) return "stable";
  return "insufficient-data";
}

function createChangeVectors(observations: TemporalObservationInput[]): TemporalChangeVector[] {
  const vectors: TemporalChangeVector[] = [];

  for (let index = 1; index < observations.length; index += 1) {
    const previous = observations[index - 1];
    const current = observations[index];
    const previousSigns = unique(previous.repeatedSigns || []);
    const currentSigns = unique(current.repeatedSigns || []);
    const previousTissues = unique(previous.affectedTissues || []);
    const currentTissues = unique(current.affectedTissues || []);
    const previousDistribution = unique(previous.distributionProfile || []);
    const currentDistribution = unique(current.distributionProfile || []);
    const newSigns = currentSigns.filter((sign) => !previousSigns.includes(sign));
    const resolvedSigns = previousSigns.filter((sign) => !currentSigns.includes(sign));
    const persistentSigns = currentSigns.filter((sign) => previousSigns.includes(sign));
    const tissueSpread = currentTissues.filter((tissue) => !previousTissues.includes(tissue));
    const distributionChange = currentDistribution.filter((value) => !previousDistribution.includes(value));
    const severityDelta = current.severityScore - previous.severityScore;
    const evidenceDelta = current.evidenceCount - previous.evidenceCount;
    const dayDelta = current.dayOffset - previous.dayOffset;
    const trendDirection = directionFromDelta(severityDelta, evidenceDelta);
    const seed = [
      previous.observationId,
      current.observationId,
      dayDelta,
      severityDelta,
      evidenceDelta,
      newSigns.join("|"),
      resolvedSigns.join("|"),
      persistentSigns.join("|"),
      tissueSpread.join("|"),
      distributionChange.join("|"),
      trendDirection,
    ].join("|");

    vectors.push({
      fromObservationId: previous.observationId,
      toObservationId: current.observationId,
      dayDelta,
      severityDelta,
      evidenceDelta,
      photoDelta: current.photoCount - previous.photoCount,
      newSigns,
      resolvedSigns,
      persistentSigns,
      tissueSpread,
      distributionChange,
      trendDirection,
      changeFingerprint: fingerprint(seed),
    });
  }

  return vectors;
}

function createSeverityTrend(observations: TemporalObservationInput[]): TemporalSeverityPoint[] {
  return observations.map((observation) => ({
    observationId: observation.observationId,
    observedAtLabel: observation.observedAtLabel,
    dayOffset: observation.dayOffset,
    severityScore: observation.severityScore,
    dominantSeverity: observation.dominantSeverity,
    evidenceCount: observation.evidenceCount,
    riskBand: riskBandFromScore(observation.severityScore),
  }));
}

function overallDirection(vectors: TemporalChangeVector[]): TemporalChangeVector["trendDirection"] {
  if (!vectors.length) return "insufficient-data";

  const worsening = vectors.filter((vector) => vector.trendDirection === "worsening").length;
  const improving = vectors.filter((vector) => vector.trendDirection === "improving").length;
  const stable = vectors.filter((vector) => vector.trendDirection === "stable").length;

  if (worsening > improving && worsening >= stable) return "worsening";
  if (improving > worsening && improving >= stable) return "improving";
  if (stable >= worsening && stable >= improving) return "stable";

  return "insufficient-data";
}

function createForecast(observations: TemporalObservationInput[], vectors: TemporalChangeVector[]) {
  const maxSeverity = Math.max(0, ...observations.map((item) => item.severityScore));
  const totalEvidence = observations.reduce((total, item) => total + item.evidenceCount, 0);
  const direction = overallDirection(vectors);
  const riskTier =
    direction === "worsening" || maxSeverity >= 3
      ? "urgent-human-review"
      : direction === "stable" && maxSeverity >= 2
        ? "attention"
        : "monitor";
  const confidenceScore = Number(
    Math.min(
      0.9,
      0.22 + observations.length * 0.12 + vectors.length * 0.09 + Math.min(totalEvidence, 12) * 0.025,
    ).toFixed(2),
  );

  return {
    trendDirection: direction,
    riskTier,
    confidenceScore,
    reasons: [
      `observationCount=${observations.length}`,
      `changeVectorCount=${vectors.length}`,
      `maxSeverityScore=${maxSeverity}`,
      `totalEvidenceCount=${totalEvidence}`,
      `trendDirection=${direction}`,
    ],
    blockingLimitations: [
      "nessuna chiamata provider AI live",
      "nessuna conferma diagnostica definitiva",
      "mancano eventuali dati meteo, irrigazione e storico interventi",
      "nessuna prescrizione prodotto o dosaggio",
      "human review obbligatoria",
    ],
  } satisfies TemporalTrendReport["temporalForecast"];
}

function createFollowUpSchedule(
  observations: TemporalObservationInput[],
  vectors: TemporalChangeVector[],
): TemporalFollowUpItem[] {
  const direction = overallDirection(vectors);
  const maxSeverity = Math.max(0, ...observations.map((item) => item.severityScore));
  const base: TemporalFollowUpItem[] = [
    {
      id: "same-frame-follow-up",
      label: "Ripetere la stessa inquadratura",
      timing: direction === "worsening" ? "24h" : "48-72h",
      reason: "Serve confronto temporale coerente tra baseline e follow-up.",
      requestedEvidence: ["stesso angolo", "stessa distanza", "stessa pianta o area"],
      blockingNotes: ["non cambiare settore senza annotarlo", "non mescolare foto di piante diverse"],
    },
    {
      id: "healthy-control-trend",
      label: "Aggiungere controllo sano nel tempo",
      timing: "ogni follow-up",
      reason: "Serve distinguere evoluzione reale da variazione di luce o inquadratura.",
      requestedEvidence: ["foglia sana vicina", "pianta vicina apparentemente sana"],
      blockingNotes: ["non usare come prova diagnostica unica"],
    },
    {
      id: "context-metadata",
      label: "Integrare contesto campo",
      timing: "prima della revisione",
      reason: "Serve correlare trend foto con condizioni agronomiche.",
      requestedEvidence: ["meteo recente", "irrigazione", "interventi recenti", "settore/fila"],
      blockingNotes: ["nessuna proposta operativa automatica senza revisione"],
    },
  ];

  if (direction === "worsening" || maxSeverity >= 3) {
    base.push({
      id: "urgent-human-review",
      label: "Revisione umana prioritaria",
      timing: "entro 24h",
      reason: "Trend o severità richiedono controllo tecnico prima di qualsiasi decisione.",
      requestedEvidence: ["foto macro pagina superiore", "foto pagina inferiore", "foto pianta intera"],
      blockingNotes: ["nessun trattamento automatico", "nessun dosaggio automatico"],
    });
  }

  return base;
}

function createEscalationRules(observations: TemporalObservationInput[], vectors: TemporalChangeVector[]) {
  const maxSeverity = Math.max(0, ...observations.map((item) => item.severityScore));
  const direction = overallDirection(vectors);
  const rules = [
    "Escalare se la severità aumenta tra due osservazioni consecutive.",
    "Escalare se compaiono nuovi tessuti coinvolti.",
    "Escalare se la distribuzione passa da localized a scattered o diffusa.",
    "Escalare se il revisore non riesce a confermare la stessa pianta/area.",
    "Bloccare conversioni automatiche in task/interventi.",
    "Bloccare prescrizioni prodotto e dosaggi.",
  ];

  if (direction === "worsening") {
    rules.unshift("Trend worsening: richiedere revisione umana prioritaria.");
  }

  if (maxSeverity >= 3) {
    rules.unshift("Severità alta: non procedere senza tecnico responsabile.");
  }

  return rules;
}

export function createTemporalTrendReport(input: TemporalTrendInput = defaultTemporalTrendInput): TemporalTrendReport {
  const observations = sortedObservations(input);
  const changeVectors = input.includeChangeVector ? createChangeVectors(observations) : [];
  const severityTrend = input.includeSeverityTrend ? createSeverityTrend(observations) : [];
  const temporalForecast = input.includeForecast
    ? createForecast(observations, changeVectors)
    : {
        trendDirection: "insufficient-data" as const,
        riskTier: "monitor" as const,
        confidenceScore: 0,
        reasons: ["forecast disabilitato"],
        blockingLimitations: [],
      };
  const totalPhotoCount = observations.reduce((total, observation) => total + observation.photoCount, 0);
  const totalEvidenceCount = observations.reduce((total, observation) => total + observation.evidenceCount, 0);
  const trendReady = Boolean(
    input.caseId.trim() &&
      input.operatorName.trim() &&
      input.crop.trim() &&
      input.locationHint.trim() &&
      observations.length >= 2 &&
      totalPhotoCount >= 2 &&
      totalEvidenceCount >= 2 &&
      input.humanReviewRequired,
  );
  const reportId = `temporal-trend-${input.caseId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const trendFingerprint = fingerprint(
    [
      reportId,
      input.operatorName,
      input.crop,
      input.locationHint,
      observations.map((item) => `${item.observationId}:${item.dayOffset}:${item.severityScore}:${item.evidenceCount}`).join("|"),
      changeVectors.map((item) => item.changeFingerprint).join("|"),
      temporalForecast.trendDirection,
      temporalForecast.riskTier,
      String(trendReady),
    ].join("|"),
  );

  return {
    ok: true,
    mode: "temporal-field-trend-dry-run",
    trendVersion: "agri-ai-temporal-trend-v1",
    reportId,
    trendFingerprint,
    trendReady,
    inputSummary: {
      caseId: input.caseId.trim(),
      operatorName: input.operatorName.trim(),
      crop: input.crop.trim(),
      locationHint: input.locationHint.trim(),
      agronomicContext: input.agronomicContext.trim(),
      observationCount: observations.length,
      totalPhotoCount,
      totalEvidenceCount,
      humanReviewRequired: true,
    },
    timeline: input.includeTimeline ? observations : [],
    changeVectors,
    severityTrend,
    temporalForecast,
    followUpSchedule: input.includeFollowUpSchedule
      ? createFollowUpSchedule(observations, changeVectors)
      : [],
    escalationRules: input.includeEscalationRules ? createEscalationRules(observations, changeVectors) : [],
    premiumSignals: {
      temporalComparisonReady: observations.length >= 2,
      progressionTrackingReady: changeVectors.length >= 1,
      trendForecastReady: input.includeForecast,
      followUpScheduleReady: input.includeFollowUpSchedule,
      escalationWorkflowReady: input.humanReviewRequired,
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

export function createReadyTemporalTrendReport() {
  return createTemporalTrendReport(createTemporalTrendFixture());
}

export function createBlockedTemporalTrendReport() {
  return createTemporalTrendReport(defaultTemporalTrendInput);
}

export function formatTemporalTrendReport(report: TemporalTrendReport) {
  return [
    "AI Temporal Field Trend Intelligence",
    "",
    `Report ID: ${report.reportId}`,
    `Trend fingerprint: ${report.trendFingerprint}`,
    `Version: ${report.trendVersion}`,
    `Mode: ${report.mode}`,
    `trendReady=${report.trendReady}`,
    "",
    "Input summary:",
    `- caseId=${report.inputSummary.caseId || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- crop=${report.inputSummary.crop || "missing"}`,
    `- locationHint=${report.inputSummary.locationHint || "missing"}`,
    `- observationCount=${report.inputSummary.observationCount}`,
    `- totalPhotoCount=${report.inputSummary.totalPhotoCount}`,
    `- totalEvidenceCount=${report.inputSummary.totalEvidenceCount}`,
    "- humanReviewRequired=true",
    "",
    "Temporal forecast:",
    `- trendDirection=${report.temporalForecast.trendDirection}`,
    `- riskTier=${report.temporalForecast.riskTier}`,
    `- confidenceScore=${report.temporalForecast.confidenceScore}`,
    ...report.temporalForecast.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Timeline:",
    ...report.timeline.map(
      (item) =>
        `- ${item.observationId} | day=${item.dayOffset} | severity=${item.dominantSeverity} | score=${item.severityScore} | evidence=${item.evidenceCount} | signs=${item.repeatedSigns.join(", ")}`,
    ),
    "",
    "Change vectors:",
    ...report.changeVectors.map(
      (item) =>
        `- ${item.fromObservationId} -> ${item.toObservationId} | days=${item.dayDelta} | severityDelta=${item.severityDelta} | evidenceDelta=${item.evidenceDelta} | trend=${item.trendDirection} | fingerprint=${item.changeFingerprint}`,
    ),
    "",
    "Severity trend:",
    ...report.severityTrend.map(
      (item) =>
        `- ${item.observationId} | ${item.observedAtLabel} | score=${item.severityScore} | riskBand=${item.riskBand}`,
    ),
    "",
    "Follow-up schedule:",
    ...report.followUpSchedule.map(
      (item) => `- ${item.label} | timing=${item.timing} | reason=${item.reason}`,
    ),
    "",
    "Escalation rules:",
    ...report.escalationRules.map((item) => `- ${item}`),
    "",
    "Premium signals:",
    `- temporalComparisonReady=${report.premiumSignals.temporalComparisonReady}`,
    `- progressionTrackingReady=${report.premiumSignals.progressionTrackingReady}`,
    `- trendForecastReady=${report.premiumSignals.trendForecastReady}`,
    `- followUpScheduleReady=${report.premiumSignals.followUpScheduleReady}`,
    `- escalationWorkflowReady=${report.premiumSignals.escalationWorkflowReady}`,
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
