export type FieldScoutingRiskPriority = "monitor" | "attention" | "urgent-human-review";

export type FieldScoutingInput = {
  caseId: string;
  operatorName: string;
  crop: string;
  fieldName: string;
  locationHint: string;
  dominantSeverity: "unknown" | "low" | "medium" | "high" | "critical";
  trendDirection: "improving" | "stable" | "worsening" | "insufficient-data";
  confidenceScore: number;
  observationCount: number;
  photoCount: number;
  evidenceCount: number;
  affectedRows: string[];
  affectedZones: string[];
  suspectedPatterns: string[];
  agronomicContext: string;
  includeScoutingRoute: boolean;
  includeSamplingGrid: boolean;
  includePhotoProtocol: boolean;
  includeEscalationRules: boolean;
  includeHumanReviewChecklist: boolean;
  humanReviewRequired: boolean;
};

export type FieldScoutingZone = {
  zoneId: string;
  label: string;
  priority: FieldScoutingRiskPriority;
  reason: string;
  targetRows: string[];
  targetEvidence: string[];
  minimumPhotoSet: string[];
  safetyNotes: string[];
};

export type FieldScoutingSamplingPoint = {
  pointId: string;
  zoneId: string;
  label: string;
  sequence: number;
  sampleType: "symptomatic" | "borderline" | "healthy-control" | "context";
  target: string;
  requiredPhotos: string[];
  operatorInstruction: string;
  blockingNotes: string[];
};

export type FieldScoutingRouteStep = {
  stepId: string;
  sequence: number;
  actionType:
    | "start-context"
    | "symptomatic-zone"
    | "border-zone"
    | "healthy-control"
    | "review-stop"
    | "return-summary";
  label: string;
  zoneId: string;
  instruction: string;
  expectedOutput: string[];
  stopCondition: string[];
};

export type FieldScoutingPhotoProtocol = {
  protocolId: string;
  label: string;
  requiredAngles: string[];
  requiredDistances: string[];
  lightingRules: string[];
  comparisonRules: string[];
  rejectionCriteria: string[];
};

export type FieldScoutingPlan = {
  ok: true;
  mode: "field-scouting-plan-dry-run";
  planVersion: "agri-ai-field-scouting-plan-v1";
  planId: string;
  planFingerprint: string;
  planReady: boolean;
  inputSummary: {
    caseId: string;
    operatorName: string;
    crop: string;
    fieldName: string;
    locationHint: string;
    dominantSeverity: string;
    trendDirection: string;
    observationCount: number;
    photoCount: number;
    evidenceCount: number;
    humanReviewRequired: true;
  };
  priorityZones: FieldScoutingZone[];
  samplingGrid: FieldScoutingSamplingPoint[];
  scoutingRoute: FieldScoutingRouteStep[];
  photoProtocol: FieldScoutingPhotoProtocol[];
  escalationRules: string[];
  humanReviewChecklist: string[];
  scoutingSummary: {
    riskPriority: FieldScoutingRiskPriority;
    routeStepCount: number;
    samplingPointCount: number;
    priorityZoneCount: number;
    minimumRequiredPhotos: number;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    scoutingPlanReady: boolean;
    samplingGridReady: boolean;
    routeOptimizationReady: boolean;
    photoProtocolReady: boolean;
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

export const defaultFieldScoutingInput: FieldScoutingInput = {
  caseId: "",
  operatorName: "",
  crop: "",
  fieldName: "",
  locationHint: "",
  dominantSeverity: "unknown",
  trendDirection: "insufficient-data",
  confidenceScore: 0,
  observationCount: 0,
  photoCount: 0,
  evidenceCount: 0,
  affectedRows: [],
  affectedZones: [],
  suspectedPatterns: [],
  agronomicContext: "",
  includeScoutingRoute: true,
  includeSamplingGrid: true,
  includePhotoProtocol: true,
  includeEscalationRules: true,
  includeHumanReviewChecklist: true,
  humanReviewRequired: true,
};

export function createFieldScoutingFixture(): FieldScoutingInput {
  return {
    caseId: "field-scouting-case-ready",
    operatorName: "Operatore campo",
    crop: "olivo",
    fieldName: "appezzamento nord",
    locationHint: "settore nord — fila 4",
    dominantSeverity: "high",
    trendDirection: "worsening",
    confidenceScore: 0.78,
    observationCount: 3,
    photoCount: 8,
    evidenceCount: 12,
    affectedRows: ["fila 4", "fila 5", "bordo nord"],
    affectedZones: ["zona sintomatica", "zona bordo", "controllo sano"],
    suspectedPatterns: ["macchie persistenti", "ingiallimento progressivo", "opacità pagina inferiore"],
    agronomicContext:
      "Caso fotografico multi-osservazione. Serve scouting campo prima di qualsiasi decisione operativa.",
    includeScoutingRoute: true,
    includeSamplingGrid: true,
    includePhotoProtocol: true,
    includeEscalationRules: true,
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

  return `field-scouting-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalizeList(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function riskPriorityFromInput(input: FieldScoutingInput): FieldScoutingRiskPriority {
  if (input.dominantSeverity === "critical" || input.dominantSeverity === "high") {
    return "urgent-human-review";
  }

  if (input.trendDirection === "worsening" || input.evidenceCount >= 8 || input.confidenceScore >= 0.65) {
    return "attention";
  }

  return "monitor";
}

function createPriorityZones(input: FieldScoutingInput): FieldScoutingZone[] {
  const affectedRows = normalizeList(input.affectedRows);
  const affectedZones = normalizeList(input.affectedZones);
  const suspectedPatterns = normalizeList(input.suspectedPatterns);
  const mainPriority = riskPriorityFromInput(input);

  const zones: FieldScoutingZone[] = [
    {
      zoneId: "zone-symptomatic-core",
      label: affectedZones[0] || "zona sintomatica principale",
      priority: mainPriority,
      reason: "Concentra le evidenze più forti e guida la revisione tecnica.",
      targetRows: affectedRows.length ? affectedRows.slice(0, 2) : ["fila o settore segnalato"],
      targetEvidence: suspectedPatterns.length ? suspectedPatterns : ["sintomi visibili", "pattern ripetuti"],
      minimumPhotoSet: [
        "pianta intera",
        "foglia pagina superiore",
        "foglia pagina inferiore",
        "macro sintomo",
        "contesto fila",
      ],
      safetyNotes: [
        "non proporre trattamento automatico",
        "non indicare prodotto o dosaggio",
        "richiedere revisione umana",
      ],
    },
    {
      zoneId: "zone-border-expansion",
      label: affectedZones[1] || "zona bordo / possibile espansione",
      priority: input.trendDirection === "worsening" ? "attention" : "monitor",
      reason: "Verifica se il pattern resta confinato o si sta espandendo.",
      targetRows: affectedRows.length ? affectedRows.slice(1, 3) : ["fila adiacente"],
      targetEvidence: ["stessi segni della zona core", "assenza/presenza su bordo", "distribuzione"],
      minimumPhotoSet: ["pianta intera", "foglia sospetta", "contesto bordo"],
      safetyNotes: ["annotare differenze rispetto alla zona core", "evitare conclusioni su singola foto"],
    },
    {
      zoneId: "zone-healthy-control",
      label: affectedZones[2] || "controllo sano",
      priority: "monitor",
      reason: "Serve confronto visivo per ridurre falsi positivi e variabilità di luce.",
      targetRows: ["fila vicina apparentemente sana"],
      targetEvidence: ["foglia sana", "pianta sana", "contesto equivalente"],
      minimumPhotoSet: ["pianta intera sana", "foglia sana superiore", "foglia sana inferiore"],
      safetyNotes: ["non usare il controllo sano come conferma diagnostica definitiva"],
    },
  ];

  return zones;
}

function createSamplingGrid(zones: FieldScoutingZone[]): FieldScoutingSamplingPoint[] {
  return zones.flatMap((zone, zoneIndex) => {
    const baseSequence = zoneIndex * 3;

    return [
      {
        pointId: `${zone.zoneId}-point-context`,
        zoneId: zone.zoneId,
        label: `${zone.label} — contesto`,
        sequence: baseSequence + 1,
        sampleType: zone.zoneId === "zone-healthy-control" ? "healthy-control" : "context",
        target: "contesto area e fila",
        requiredPhotos: ["contesto fila", "pianta intera"],
        operatorInstruction: "Fotografare orientamento e contesto prima dei dettagli.",
        blockingNotes: ["non saltare il contesto", "non cambiare settore senza nota"],
      },
      {
        pointId: `${zone.zoneId}-point-detail`,
        zoneId: zone.zoneId,
        label: `${zone.label} — dettaglio`,
        sequence: baseSequence + 2,
        sampleType: zone.zoneId === "zone-healthy-control" ? "healthy-control" : "symptomatic",
        target: "dettaglio tessuto o sintomo",
        requiredPhotos: zone.minimumPhotoSet,
        operatorInstruction: "Acquisire foto ripetibili, nitide, senza controluce.",
        blockingNotes: ["scartare foto mosse", "richiedere pagina inferiore se presente foglia"],
      },
      {
        pointId: `${zone.zoneId}-point-border`,
        zoneId: zone.zoneId,
        label: `${zone.label} — bordo/comparazione`,
        sequence: baseSequence + 3,
        sampleType: zone.zoneId === "zone-healthy-control" ? "healthy-control" : "borderline",
        target: "confronto con area adiacente",
        requiredPhotos: ["confronto bordo", "foto a distanza media"],
        operatorInstruction: "Verificare continuità del pattern tra zona target e zona vicina.",
        blockingNotes: ["non unire evidenze di piante diverse senza nota"],
      },
    ];
  });
}

function createScoutingRoute(zones: FieldScoutingZone[]): FieldScoutingRouteStep[] {
  const steps: FieldScoutingRouteStep[] = [
    {
      stepId: "route-start-context",
      sequence: 1,
      actionType: "start-context",
      label: "Avvio contesto campo",
      zoneId: "global",
      instruction: "Fotografare ingresso settore, orientamento fila e condizioni generali.",
      expectedOutput: ["foto contesto", "nota settore", "nota luce"],
      stopCondition: ["settore non identificabile", "foto non ripetibile"],
    },
  ];

  zones.forEach((zone, index) => {
    steps.push({
      stepId: `route-zone-${index + 1}`,
      sequence: steps.length + 1,
      actionType:
        zone.zoneId === "zone-healthy-control"
          ? "healthy-control"
          : zone.zoneId === "zone-border-expansion"
            ? "border-zone"
            : "symptomatic-zone",
      label: zone.label,
      zoneId: zone.zoneId,
      instruction: `Acquisire set minimo foto per ${zone.label}.`,
      expectedOutput: zone.minimumPhotoSet,
      stopCondition: zone.safetyNotes,
    });
  });

  steps.push({
    stepId: "route-human-review-stop",
    sequence: steps.length + 1,
    actionType: "review-stop",
    label: "Stop revisione umana",
    zoneId: "global",
    instruction: "Rivedere il pacchetto prima di qualunque conversione manuale.",
    expectedOutput: ["checklist revisore", "decisione revisore", "note limiti"],
    stopCondition: ["mancano foto chiave", "trend non coerente", "rischio alto"],
  });

  steps.push({
    stepId: "route-return-summary",
    sequence: steps.length + 1,
    actionType: "return-summary",
    label: "Riepilogo rientro",
    zoneId: "global",
    instruction: "Riepilogare evidenze, foto mancanti e decisione di escalation.",
    expectedOutput: ["riepilogo testuale", "JSON manuale", "next photo protocol"],
    stopCondition: ["nessuna creazione automatica", "nessun trattamento automatico"],
  });

  return steps;
}

function createPhotoProtocol(input: FieldScoutingInput, zones: FieldScoutingZone[]): FieldScoutingPhotoProtocol[] {
  return zones.map((zone) => ({
    protocolId: `${zone.zoneId}-photo-protocol`,
    label: `Protocollo foto — ${zone.label}`,
    requiredAngles: [
      "pianta intera",
      "foglia pagina superiore",
      "foglia pagina inferiore",
      "macro sintomo",
      "confronto con controllo",
    ],
    requiredDistances: ["contesto 2-3m", "pianta 1m", "foglia 20-40cm", "macro ravvicinata"],
    lightingRules: [
      "evitare controluce",
      "ripetere se immagine mossa",
      "includere una foto di controllo con luce simile",
    ],
    comparisonRules: [
      `coltura=${input.crop || "non specificata"}`,
      `campo=${input.fieldName || "non specificato"}`,
      "usare stesso settore quando possibile",
      "annotare se cambia la pianta",
    ],
    rejectionCriteria: [
      "foto sfocata",
      "assenza contesto",
      "foglia non identificabile",
      "metadati campo mancanti",
      "singola foto senza controllo",
    ],
  }));
}

function createEscalationRules(input: FieldScoutingInput, riskPriority: FieldScoutingRiskPriority) {
  const rules = [
    "Escalare se mancano foto di contesto o controllo sano.",
    "Escalare se il trend è worsening.",
    "Escalare se la severità dominante è high o critical.",
    "Escalare se il pattern appare su più file o zone.",
    "Bloccare creazione automatica task/interventi.",
    "Bloccare esecuzione automatica.",
    "Bloccare prescrizione prodotto e dosaggio.",
  ];

  if (riskPriority === "urgent-human-review") {
    rules.unshift("Priorità urgente: richiedere revisione tecnica prima di qualunque conversione manuale.");
  }

  if (input.confidenceScore < 0.55) {
    rules.unshift("Confidence sotto soglia: richiedere nuove foto prima della decisione.");
  }

  return rules;
}

function createHumanReviewChecklist(input: FieldScoutingInput) {
  return [
    "Confermare coltura, settore e fila.",
    "Verificare che le foto appartengano allo stesso caso.",
    "Confermare presenza di foto sane di controllo.",
    "Confermare qualità minima delle immagini.",
    "Verificare coerenza tra trend temporale e osservazioni campo.",
    "Verificare che non siano presenti indicazioni automatiche di prodotto o dosaggio.",
    "Registrare eventuale decisione manuale solo dopo revisione.",
    `Contesto agronomico: ${input.agronomicContext || "da completare"}`,
  ];
}

export function createFieldScoutingPlan(input: FieldScoutingInput = defaultFieldScoutingInput): FieldScoutingPlan {
  const affectedRows = normalizeList(input.affectedRows);
  const affectedZones = normalizeList(input.affectedZones);
  const suspectedPatterns = normalizeList(input.suspectedPatterns);
  const riskPriority = riskPriorityFromInput(input);
  const priorityZones = createPriorityZones({
    ...input,
    affectedRows,
    affectedZones,
    suspectedPatterns,
  });
  const samplingGrid = input.includeSamplingGrid ? createSamplingGrid(priorityZones) : [];
  const scoutingRoute = input.includeScoutingRoute ? createScoutingRoute(priorityZones) : [];
  const photoProtocol = input.includePhotoProtocol ? createPhotoProtocol(input, priorityZones) : [];
  const escalationRules = input.includeEscalationRules ? createEscalationRules(input, riskPriority) : [];
  const humanReviewChecklist = input.includeHumanReviewChecklist ? createHumanReviewChecklist(input) : [];
  const minimumRequiredPhotos = photoProtocol.reduce(
    (total, protocol) => total + Math.max(1, protocol.requiredAngles.length),
    0,
  );
  const planReady = Boolean(
    input.caseId.trim() &&
      input.operatorName.trim() &&
      input.crop.trim() &&
      input.fieldName.trim() &&
      input.locationHint.trim() &&
      input.humanReviewRequired &&
      input.observationCount >= 1 &&
      input.photoCount >= 2 &&
      input.evidenceCount >= 2,
  );
  const planId = `field-scouting-${input.caseId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const planFingerprint = fingerprint(
    [
      planId,
      input.operatorName,
      input.crop,
      input.fieldName,
      input.locationHint,
      input.dominantSeverity,
      input.trendDirection,
      String(input.confidenceScore),
      affectedRows.join("|"),
      affectedZones.join("|"),
      suspectedPatterns.join("|"),
      riskPriority,
      String(planReady),
    ].join("|"),
  );

  return {
    ok: true,
    mode: "field-scouting-plan-dry-run",
    planVersion: "agri-ai-field-scouting-plan-v1",
    planId,
    planFingerprint,
    planReady,
    inputSummary: {
      caseId: input.caseId.trim(),
      operatorName: input.operatorName.trim(),
      crop: input.crop.trim(),
      fieldName: input.fieldName.trim(),
      locationHint: input.locationHint.trim(),
      dominantSeverity: input.dominantSeverity,
      trendDirection: input.trendDirection,
      observationCount: input.observationCount,
      photoCount: input.photoCount,
      evidenceCount: input.evidenceCount,
      humanReviewRequired: true,
    },
    priorityZones,
    samplingGrid,
    scoutingRoute,
    photoProtocol,
    escalationRules,
    humanReviewChecklist,
    scoutingSummary: {
      riskPriority,
      routeStepCount: scoutingRoute.length,
      samplingPointCount: samplingGrid.length,
      priorityZoneCount: priorityZones.length,
      minimumRequiredPhotos,
      confidenceScore: input.confidenceScore,
      reasons: [
        `dominantSeverity=${input.dominantSeverity}`,
        `trendDirection=${input.trendDirection}`,
        `observationCount=${input.observationCount}`,
        `photoCount=${input.photoCount}`,
        `evidenceCount=${input.evidenceCount}`,
        `affectedRows=${affectedRows.length}`,
        `affectedZones=${affectedZones.length}`,
      ],
      blockingLimitations: [
        "nessuna chiamata provider AI live",
        "nessuna persistenza DB",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
        "human review obbligatoria",
      ],
    },
    premiumSignals: {
      scoutingPlanReady: planReady,
      samplingGridReady: samplingGrid.length > 0,
      routeOptimizationReady: scoutingRoute.length > 0,
      photoProtocolReady: photoProtocol.length > 0,
      escalationWorkflowReady: escalationRules.length > 0 && input.humanReviewRequired,
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

export function createReadyFieldScoutingPlan() {
  return createFieldScoutingPlan(createFieldScoutingFixture());
}

export function createBlockedFieldScoutingPlan() {
  return createFieldScoutingPlan(defaultFieldScoutingInput);
}

export function formatFieldScoutingPlan(plan: FieldScoutingPlan) {
  return [
    "AI Field Scouting Plan & Sampling Grid",
    "",
    `Plan ID: ${plan.planId}`,
    `Plan fingerprint: ${plan.planFingerprint}`,
    `Version: ${plan.planVersion}`,
    `Mode: ${plan.mode}`,
    `planReady=${plan.planReady}`,
    "",
    "Input summary:",
    `- caseId=${plan.inputSummary.caseId || "missing"}`,
    `- operatorName=${plan.inputSummary.operatorName || "missing"}`,
    `- crop=${plan.inputSummary.crop || "missing"}`,
    `- fieldName=${plan.inputSummary.fieldName || "missing"}`,
    `- locationHint=${plan.inputSummary.locationHint || "missing"}`,
    `- dominantSeverity=${plan.inputSummary.dominantSeverity}`,
    `- trendDirection=${plan.inputSummary.trendDirection}`,
    `- observationCount=${plan.inputSummary.observationCount}`,
    `- photoCount=${plan.inputSummary.photoCount}`,
    `- evidenceCount=${plan.inputSummary.evidenceCount}`,
    "- humanReviewRequired=true",
    "",
    "Scouting summary:",
    `- riskPriority=${plan.scoutingSummary.riskPriority}`,
    `- routeStepCount=${plan.scoutingSummary.routeStepCount}`,
    `- samplingPointCount=${plan.scoutingSummary.samplingPointCount}`,
    `- priorityZoneCount=${plan.scoutingSummary.priorityZoneCount}`,
    `- minimumRequiredPhotos=${plan.scoutingSummary.minimumRequiredPhotos}`,
    `- confidenceScore=${plan.scoutingSummary.confidenceScore}`,
    ...plan.scoutingSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Priority zones:",
    ...plan.priorityZones.map(
      (zone) =>
        `- ${zone.zoneId} | ${zone.label} | priority=${zone.priority} | rows=${zone.targetRows.join(", ")} | evidence=${zone.targetEvidence.join(", ")}`,
    ),
    "",
    "Sampling grid:",
    ...plan.samplingGrid.map(
      (point) =>
        `- ${point.sequence}. ${point.pointId} | zone=${point.zoneId} | type=${point.sampleType} | target=${point.target}`,
    ),
    "",
    "Scouting route:",
    ...plan.scoutingRoute.map(
      (step) => `- ${step.sequence}. ${step.label} | action=${step.actionType} | zone=${step.zoneId}`,
    ),
    "",
    "Photo protocol:",
    ...plan.photoProtocol.map(
      (protocol) =>
        `- ${protocol.label} | angles=${protocol.requiredAngles.join(", ")} | rejection=${protocol.rejectionCriteria.join(", ")}`,
    ),
    "",
    "Escalation rules:",
    ...plan.escalationRules.map((item) => `- ${item}`),
    "",
    "Human review checklist:",
    ...plan.humanReviewChecklist.map((item) => `- ${item}`),
    "",
    "Premium signals:",
    `- scoutingPlanReady=${plan.premiumSignals.scoutingPlanReady}`,
    `- samplingGridReady=${plan.premiumSignals.samplingGridReady}`,
    `- routeOptimizationReady=${plan.premiumSignals.routeOptimizationReady}`,
    `- photoProtocolReady=${plan.premiumSignals.photoProtocolReady}`,
    `- escalationWorkflowReady=${plan.premiumSignals.escalationWorkflowReady}`,
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
