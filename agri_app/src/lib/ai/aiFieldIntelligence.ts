import {
  createPhotoSymptomAnnotationFixture,
  type PhotoSymptomAnnotationInput,
} from "./photoSymptomAnnotation";

export type FieldIntelligenceCaseInput = {
  caseId: string;
  operatorName: string;
  crop: string;
  locationHint: string;
  observedAtLabel: string;
  agronomicContext: string;
  photos: PhotoSymptomAnnotationInput[];
  includeEvidenceMatrix: boolean;
  includeSeverityMap: boolean;
  includeRiskForecast: boolean;
  includeDifferentialFocus: boolean;
  includeNextPhotoProtocol: boolean;
  includeHumanReviewChecklist: boolean;
  humanReviewRequired: boolean;
};

export type FieldIntelligenceEvidence = {
  id: string;
  photoId: string;
  photoRole: string;
  regionId: string;
  label: string;
  tissue: string;
  severity: string;
  severityScore: number;
  distribution: string;
  visibleSigns: string[];
  operatorNote: string;
  evidenceFingerprint: string;
};

export type FieldIntelligenceSeverityMap = {
  tissue: string;
  affectedRegions: number;
  maxSeverityScore: number;
  averageSeverityScore: number;
  dominantLabels: string[];
  distributionProfile: string[];
};

export type FieldIntelligenceDifferentialFocus = {
  id: string;
  label: string;
  priority: "low" | "medium" | "high";
  supportingSignals: string[];
  counterEvidence: string[];
  requiredChecks: string[];
  safetyNote: string;
};

export type FieldIntelligenceNextPhoto = {
  id: string;
  label: string;
  reason: string;
  requestedAngle: string;
  requestedDistance: string;
  requiredContext: string[];
};

export type FieldIntelligenceReport = {
  ok: true;
  mode: "field-intelligence-dry-run";
  intelligenceVersion: "agri-ai-field-intelligence-v1";
  reportId: string;
  reportFingerprint: string;
  reportReady: boolean;
  inputSummary: {
    caseId: string;
    operatorName: string;
    crop: string;
    locationHint: string;
    observedAtLabel: string;
    agronomicContext: string;
    photoCount: number;
    evidenceCount: number;
    humanReviewRequired: boolean;
  };
  evidenceMatrix: FieldIntelligenceEvidence[];
  severityMap: FieldIntelligenceSeverityMap[];
  crossPhotoPatterns: {
    repeatedSigns: string[];
    affectedTissues: string[];
    dominantSeverity: string;
    distributionProfile: string[];
    evidenceDensity: number;
    consistencyScore: number;
  };
  riskForecast: {
    riskTier: "monitor" | "attention" | "urgent-human-review";
    confidenceScore: number;
    reasons: string[];
    expectedProgression: string[];
    blockingLimitations: string[];
  };
  differentialFocus: FieldIntelligenceDifferentialFocus[];
  nextPhotoProtocol: FieldIntelligenceNextPhoto[];
  humanReviewChecklist: string[];
  premiumSignals: {
    multiPhotoCorrelation: boolean;
    temporalComparisonReady: boolean;
    fieldScoutingProtocolReady: boolean;
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

export const defaultFieldIntelligenceInput: FieldIntelligenceCaseInput = {
  caseId: "",
  operatorName: "",
  crop: "",
  locationHint: "",
  observedAtLabel: "",
  agronomicContext: "",
  photos: [],
  includeEvidenceMatrix: true,
  includeSeverityMap: true,
  includeRiskForecast: true,
  includeDifferentialFocus: true,
  includeNextPhotoProtocol: true,
  includeHumanReviewChecklist: true,
  humanReviewRequired: true,
};

export function createFieldIntelligenceFixture(): FieldIntelligenceCaseInput {
  const first = createPhotoSymptomAnnotationFixture();
  const second: PhotoSymptomAnnotationInput = {
    ...first,
    photoId: "field-intelligence-photo-context",
    photoRole: "plant-context",
    fileName: "field-intelligence-context.webp",
    observedAtLabel: "follow-up-context",
    locationHint: "settore nord — fila 4",
    plantContext: "olivo adulto, chioma parziale, confronto con foglie sane vicine",
    regions: [
      {
        id: "context-r1",
        label: "Ingiallimento diffuso da confermare",
        tissue: "leaf-upper",
        severity: "medium",
        distribution: "scattered",
        normalizedBox: {
          x: 15,
          y: 25,
          width: 40,
          height: 32,
        },
        visibleSigns: ["ingiallimento", "macchie", "foglie opache"],
        operatorNote: "Sintomi visibili anche su area più ampia.",
      },
      {
        id: "context-r2",
        label: "Confronto foglie sane",
        tissue: "leaf-upper",
        severity: "low",
        distribution: "localized",
        normalizedBox: {
          x: 62,
          y: 20,
          width: 18,
          height: 25,
        },
        visibleSigns: ["controllo sano"],
        operatorNote: "Area da usare come confronto visivo.",
      },
    ],
  };

  return {
    caseId: "field-intelligence-case-ready",
    operatorName: "Operatore campo",
    crop: "olivo",
    locationHint: "settore nord — fila 4",
    observedAtLabel: "ispezione mattina",
    agronomicContext:
      "Osservazione multi-foto dopo segnalazione macchie e ingiallimenti. Nessuna richiesta prodotto o dosaggio.",
    photos: [first, second],
    includeEvidenceMatrix: true,
    includeSeverityMap: true,
    includeRiskForecast: true,
    includeDifferentialFocus: true,
    includeNextPhotoProtocol: true,
    includeHumanReviewChecklist: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `field-intelligence-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function severityScore(severity: string | undefined) {
  const normalized = String(severity || "").toLowerCase();

  if (normalized.includes("critical")) return 4;
  if (normalized.includes("high")) return 3;
  if (normalized.includes("medium")) return 2;
  if (normalized.includes("low")) return 1;

  return 1;
}

function unique(values: string[]) {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  );
}

function average(values: number[]) {
  if (!values.length) return 0;
  return Number((values.reduce((total, value) => total + value, 0) / values.length).toFixed(2));
}

function dominantSeverity(evidence: FieldIntelligenceEvidence[]) {
  const max = Math.max(0, ...evidence.map((item) => item.severityScore));

  if (max >= 4) return "critical";
  if (max >= 3) return "high";
  if (max >= 2) return "medium";
  if (max >= 1) return "low";

  return "unknown";
}

function createEvidenceMatrix(input: FieldIntelligenceCaseInput): FieldIntelligenceEvidence[] {
  return input.photos.flatMap((photo) =>
    photo.regions.map((region) => {
      const signs = unique(region.visibleSigns || []);
      const seed = [
        input.caseId,
        photo.photoId,
        photo.photoRole,
        region.id,
        region.label,
        region.tissue,
        region.severity,
        region.distribution,
        signs.join("|"),
      ].join("|");

      return {
        id: `${photo.photoId}-${region.id}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase(),
        photoId: photo.photoId,
        photoRole: photo.photoRole,
        regionId: region.id,
        label: region.label,
        tissue: region.tissue,
        severity: region.severity,
        severityScore: severityScore(region.severity),
        distribution: region.distribution,
        visibleSigns: signs,
        operatorNote: region.operatorNote || "",
        evidenceFingerprint: fingerprint(seed),
      };
    }),
  );
}

function createSeverityMap(evidence: FieldIntelligenceEvidence[]): FieldIntelligenceSeverityMap[] {
  const tissues = unique(evidence.map((item) => item.tissue));

  return tissues.map((tissue) => {
    const scoped = evidence.filter((item) => item.tissue === tissue);
    const labelCounts = new Map<string, number>();

    for (const item of scoped) {
      labelCounts.set(item.label, (labelCounts.get(item.label) || 0) + 1);
    }

    return {
      tissue,
      affectedRegions: scoped.length,
      maxSeverityScore: Math.max(0, ...scoped.map((item) => item.severityScore)),
      averageSeverityScore: average(scoped.map((item) => item.severityScore)),
      dominantLabels: Array.from(labelCounts.entries())
        .sort((left, right) => right[1] - left[1])
        .slice(0, 5)
        .map(([label]) => label),
      distributionProfile: unique(scoped.map((item) => item.distribution)),
    };
  });
}

function repeatedSigns(evidence: FieldIntelligenceEvidence[]) {
  const counts = new Map<string, number>();

  for (const item of evidence) {
    for (const sign of item.visibleSigns) {
      counts.set(sign, (counts.get(sign) || 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .sort((left, right) => right[1] - left[1])
    .map(([sign]) => sign);
}

function createDifferentialFocus(evidence: FieldIntelligenceEvidence[]): FieldIntelligenceDifferentialFocus[] {
  const allSigns = unique(evidence.flatMap((item) => item.visibleSigns)).join(" ").toLowerCase();
  const tissues = unique(evidence.map((item) => item.tissue));
  const maxSeverity = Math.max(0, ...evidence.map((item) => item.severityScore));

  const focus: FieldIntelligenceDifferentialFocus[] = [];

  if (allSigns.includes("macch") || allSigns.includes("spot")) {
    focus.push({
      id: "foliar-pathology-check",
      label: "Possibile patologia fogliare da confermare",
      priority: maxSeverity >= 3 ? "high" : "medium",
      supportingSignals: ["macchie rilevate", `tessuti coinvolti: ${tissues.join(", ") || "n/d"}`],
      counterEvidence: ["manca verifica pagina inferiore foglia", "manca confronto progressione temporale"],
      requiredChecks: ["foto dettaglio pagina inferiore", "foto foglia sana vicina", "controllo distribuzione nella chioma"],
      safetyNote: "Ipotesi non diagnostica. Nessun prodotto o dosaggio suggerito.",
    });
  }

  if (allSigns.includes("ingiall") || allSigns.includes("clorosi") || allSigns.includes("opache")) {
    focus.push({
      id: "abiotic-or-nutritional-check",
      label: "Possibile stress abiotico o nutrizionale da distinguere",
      priority: maxSeverity >= 3 ? "high" : "medium",
      supportingSignals: ["ingiallimento/opacita", "segnali compatibili con stress non specifico"],
      counterEvidence: ["mancano informazioni su irrigazione", "mancano foto suolo e drenaggio"],
      requiredChecks: ["foto suolo", "nota irrigazione recente", "confronto con piante limitrofe"],
      safetyNote: "Richiede revisione agronomica e dati campo. Nessun dosaggio suggerito.",
    });
  }

  if (allSigns.includes("rosur") || allSigns.includes("insett") || allSigns.includes("larv")) {
    focus.push({
      id: "insect-pressure-check",
      label: "Possibile pressione insetti o fitofagi",
      priority: "medium",
      supportingSignals: ["segni compatibili con danno meccanico/insetti"],
      counterEvidence: ["manca foto organismo o tracce recenti"],
      requiredChecks: ["foto pagina inferiore", "foto trappole o residui", "ispezione manuale foglie"],
      safetyNote: "Non prescrivere trattamento senza conferma del tecnico.",
    });
  }

  if (!focus.length) {
    focus.push({
      id: "insufficient-differential-evidence",
      label: "Evidenza differenziale insufficiente",
      priority: "low",
      supportingSignals: ["input fotografico non sufficiente per priorita differenziale"],
      counterEvidence: ["servono foto aggiuntive e contesto campo"],
      requiredChecks: ["aggiungere foto contesto", "aggiungere close-up", "aggiungere confronto sano"],
      safetyNote: "Nessuna diagnosi conclusiva.",
    });
  }

  return focus;
}

function createNextPhotoProtocol(evidence: FieldIntelligenceEvidence[]): FieldIntelligenceNextPhoto[] {
  const tissues = unique(evidence.map((item) => item.tissue));
  const signs = unique(evidence.flatMap((item) => item.visibleSigns)).join(" ").toLowerCase();

  const protocol: FieldIntelligenceNextPhoto[] = [
    {
      id: "whole-plant-context",
      label: "Foto pianta intera",
      reason: "Serve distribuzione sintomi nella chioma e confronto con vigore generale.",
      requestedAngle: "frontale e laterale",
      requestedDistance: "2-4 metri",
      requiredContext: ["fila", "settore", "piante vicine"],
    },
    {
      id: "healthy-control",
      label: "Foto controllo sano",
      reason: "Serve confronto visivo con tessuto apparentemente sano.",
      requestedAngle: "stessa luce e stesso lato della pianta",
      requestedDistance: "close-up",
      requiredContext: ["stessa coltura", "stessa area", "foglia sana vicina"],
    },
    {
      id: "progression-follow-up",
      label: "Foto follow-up 48-72h",
      reason: "Serve valutare progressione o stabilita del sintomo.",
      requestedAngle: "stessa inquadratura del close-up iniziale",
      requestedDistance: "close-up",
      requiredContext: ["data", "ora", "meteo recente"],
    },
  ];

  if (tissues.some((tissue) => tissue.includes("leaf"))) {
    protocol.push({
      id: "leaf-underside",
      label: "Pagina inferiore foglia",
      reason: "Molti segnali utili non sono visibili dalla pagina superiore.",
      requestedAngle: "macro ravvicinata",
      requestedDistance: "10-25 cm",
      requiredContext: ["foglia sintomatica", "foglia sana", "illuminazione naturale"],
    });
  }

  if (signs.includes("ingiall") || signs.includes("opache")) {
    protocol.push({
      id: "soil-and-irrigation-context",
      label: "Suolo e area irrigazione",
      reason: "Serve distinguere stress idrico/nutrizionale da altre ipotesi.",
      requestedAngle: "suolo vicino al colletto e area gocciolatore",
      requestedDistance: "30-80 cm",
      requiredContext: ["umidita apparente", "pacciamatura", "drenaggio"],
    });
  }

  return protocol;
}

function createRiskForecast(evidence: FieldIntelligenceEvidence[], photoCount: number) {
  const maxSeverity = Math.max(0, ...evidence.map((item) => item.severityScore));
  const density = evidence.length;
  const repeated = repeatedSigns(evidence);
  const consistencyScore = Number(Math.min(0.95, Math.max(0.1, repeated.length / Math.max(1, density))).toFixed(2));

  let riskTier: "monitor" | "attention" | "urgent-human-review" = "monitor";

  if (maxSeverity >= 3 || density >= 5) {
    riskTier = "urgent-human-review";
  } else if (maxSeverity >= 2 || density >= 2) {
    riskTier = "attention";
  }

  const confidenceScore = Number(
    Math.min(0.88, 0.25 + photoCount * 0.12 + density * 0.04 + consistencyScore * 0.2).toFixed(2),
  );

  return {
    riskTier,
    confidenceScore,
    reasons: [
      `photoCount=${photoCount}`,
      `evidenceCount=${density}`,
      `maxSeverityScore=${maxSeverity}`,
      `repeatedSigns=${repeated.join(", ") || "none"}`,
    ],
    expectedProgression: [
      "monitorare variazione estensione sintomo",
      "confrontare stessa area dopo 48-72h",
      "verificare se i sintomi compaiono su nuove foglie o nuove piante",
    ],
    blockingLimitations: [
      "nessuna chiamata provider AI live",
      "nessuna conferma diagnostica definitiva",
      "mancano eventuali dati meteo, irrigazione e storico interventi",
      "nessuna prescrizione prodotto o dosaggio",
    ],
  };
}

export function createAiFieldIntelligenceReport(
  input: FieldIntelligenceCaseInput = defaultFieldIntelligenceInput,
): FieldIntelligenceReport {
  const cleanInput = {
    ...input,
    caseId: input.caseId.trim(),
    operatorName: input.operatorName.trim(),
    crop: input.crop.trim(),
    locationHint: input.locationHint.trim(),
    observedAtLabel: input.observedAtLabel.trim(),
    agronomicContext: input.agronomicContext.trim(),
    photos: input.photos || [],
  };

  const evidenceMatrix = cleanInput.includeEvidenceMatrix ? createEvidenceMatrix(cleanInput) : [];
  const severityMap = cleanInput.includeSeverityMap ? createSeverityMap(evidenceMatrix) : [];
  const repeated = repeatedSigns(evidenceMatrix);
  const affectedTissues = unique(evidenceMatrix.map((item) => item.tissue));
  const distributions = unique(evidenceMatrix.map((item) => item.distribution));
  const maxSeverity = dominantSeverity(evidenceMatrix);
  const riskForecast = cleanInput.includeRiskForecast
    ? createRiskForecast(evidenceMatrix, cleanInput.photos.length)
    : {
        riskTier: "monitor" as const,
        confidenceScore: 0,
        reasons: ["risk forecast disabilitato"],
        expectedProgression: [],
        blockingLimitations: [],
      };

  const reportReady = Boolean(
    cleanInput.caseId &&
      cleanInput.operatorName &&
      cleanInput.crop &&
      cleanInput.locationHint &&
      cleanInput.photos.length >= 2 &&
      evidenceMatrix.length >= 2 &&
      cleanInput.humanReviewRequired,
  );

  const reportId = `field-intelligence-${cleanInput.caseId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const reportFingerprint = fingerprint(
    [
      reportId,
      cleanInput.operatorName,
      cleanInput.crop,
      cleanInput.locationHint,
      cleanInput.observedAtLabel,
      cleanInput.photos.map((photo) => photo.photoId).join("|"),
      evidenceMatrix.map((item) => item.evidenceFingerprint).join("|"),
      severityMap.map((item) => `${item.tissue}:${item.maxSeverityScore}:${item.affectedRegions}`).join("|"),
      riskForecast.riskTier,
      String(reportReady),
    ].join("|"),
  );

  const consistencyScore = Number(
    Math.min(1, repeated.length / Math.max(1, evidenceMatrix.length)).toFixed(2),
  );

  return {
    ok: true,
    mode: "field-intelligence-dry-run",
    intelligenceVersion: "agri-ai-field-intelligence-v1",
    reportId,
    reportFingerprint,
    reportReady,
    inputSummary: {
      caseId: cleanInput.caseId,
      operatorName: cleanInput.operatorName,
      crop: cleanInput.crop,
      locationHint: cleanInput.locationHint,
      observedAtLabel: cleanInput.observedAtLabel,
      agronomicContext: cleanInput.agronomicContext,
      photoCount: cleanInput.photos.length,
      evidenceCount: evidenceMatrix.length,
      humanReviewRequired: true,
    },
    evidenceMatrix,
    severityMap,
    crossPhotoPatterns: {
      repeatedSigns: repeated,
      affectedTissues,
      dominantSeverity: maxSeverity,
      distributionProfile: distributions,
      evidenceDensity: evidenceMatrix.length,
      consistencyScore,
    },
    riskForecast,
    differentialFocus: cleanInput.includeDifferentialFocus
      ? createDifferentialFocus(evidenceMatrix)
      : [],
    nextPhotoProtocol: cleanInput.includeNextPhotoProtocol
      ? createNextPhotoProtocol(evidenceMatrix)
      : [],
    humanReviewChecklist: cleanInput.includeHumanReviewChecklist
      ? [
          "Verificare che le foto rappresentino la stessa pianta o lo stesso settore.",
          "Confermare che il confronto sano sia realmente sano.",
          "Confermare severita con ispezione diretta.",
          "Valutare meteo, irrigazione, storico interventi e fertilizzazione.",
          "Non prescrivere prodotti o dosaggi senza tecnico responsabile.",
          "Non creare task o interventi automaticamente.",
        ]
      : [],
    premiumSignals: {
      multiPhotoCorrelation: evidenceMatrix.length >= 2,
      temporalComparisonReady: cleanInput.photos.length >= 2,
      fieldScoutingProtocolReady: cleanInput.includeNextPhotoProtocol,
      escalationWorkflowReady: cleanInput.humanReviewRequired,
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

export function createReadyAiFieldIntelligenceReport() {
  return createAiFieldIntelligenceReport(createFieldIntelligenceFixture());
}

export function createBlockedAiFieldIntelligenceReport() {
  return createAiFieldIntelligenceReport(defaultFieldIntelligenceInput);
}

export function formatAiFieldIntelligenceReport(report: FieldIntelligenceReport) {
  return [
    "AI Multi-Photo Field Intelligence",
    "",
    `Report ID: ${report.reportId}`,
    `Report fingerprint: ${report.reportFingerprint}`,
    `Version: ${report.intelligenceVersion}`,
    `Mode: ${report.mode}`,
    `reportReady=${report.reportReady}`,
    "",
    "Input summary:",
    `- caseId=${report.inputSummary.caseId || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- crop=${report.inputSummary.crop || "missing"}`,
    `- locationHint=${report.inputSummary.locationHint || "missing"}`,
    `- observedAtLabel=${report.inputSummary.observedAtLabel || "missing"}`,
    `- photoCount=${report.inputSummary.photoCount}`,
    `- evidenceCount=${report.inputSummary.evidenceCount}`,
    "- humanReviewRequired=true",
    "",
    "Cross-photo patterns:",
    `- repeatedSigns=${report.crossPhotoPatterns.repeatedSigns.join(", ") || "none"}`,
    `- affectedTissues=${report.crossPhotoPatterns.affectedTissues.join(", ") || "none"}`,
    `- dominantSeverity=${report.crossPhotoPatterns.dominantSeverity}`,
    `- distributionProfile=${report.crossPhotoPatterns.distributionProfile.join(", ") || "none"}`,
    `- evidenceDensity=${report.crossPhotoPatterns.evidenceDensity}`,
    `- consistencyScore=${report.crossPhotoPatterns.consistencyScore}`,
    "",
    "Risk forecast:",
    `- riskTier=${report.riskForecast.riskTier}`,
    `- confidenceScore=${report.riskForecast.confidenceScore}`,
    ...report.riskForecast.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Evidence matrix:",
    ...report.evidenceMatrix.map(
      (item) =>
        `- ${item.photoId}/${item.regionId} | ${item.label} | tissue=${item.tissue} | severity=${item.severity} | score=${item.severityScore} | fingerprint=${item.evidenceFingerprint}`,
    ),
    "",
    "Severity map:",
    ...report.severityMap.map(
      (item) =>
        `- ${item.tissue} | regions=${item.affectedRegions} | max=${item.maxSeverityScore} | avg=${item.averageSeverityScore} | labels=${item.dominantLabels.join(", ")}`,
    ),
    "",
    "Differential focus:",
    ...report.differentialFocus.map(
      (item) =>
        `- ${item.priority.toUpperCase()} ${item.label} | checks=${item.requiredChecks.join("; ")} | safety=${item.safetyNote}`,
    ),
    "",
    "Next photo protocol:",
    ...report.nextPhotoProtocol.map(
      (item) =>
        `- ${item.label} | reason=${item.reason} | angle=${item.requestedAngle} | distance=${item.requestedDistance}`,
    ),
    "",
    "Human review checklist:",
    ...report.humanReviewChecklist.map((item) => `- ${item}`),
    "",
    "Premium signals:",
    `- multiPhotoCorrelation=${report.premiumSignals.multiPhotoCorrelation}`,
    `- temporalComparisonReady=${report.premiumSignals.temporalComparisonReady}`,
    `- fieldScoutingProtocolReady=${report.premiumSignals.fieldScoutingProtocolReady}`,
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
