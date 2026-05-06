export type FollowUpRiskTier = "monitor" | "attention" | "high-priority" | "urgent-human-review";

export type FollowUpZoneInput = {
  zoneId: string;
  label: string;
  riskTier: FollowUpRiskTier;
  riskScore: number;
  trendDirection: "improving" | "stable" | "worsening" | "insufficient-data";
  lastObservedAtLabel: string;
  evidenceCount: number;
  photoCount: number;
  photoGapDays: number;
  requiredPhotoAngles: string[];
  blockingNotes: string[];
  operatorNote: string;
};

export type FollowUpSchedulerInput = {
  caseId: string;
  operatorName: string;
  crop: string;
  fieldName: string;
  locationHint: string;
  heatmapFingerprint: string;
  scoutingPlanFingerprint: string;
  temporalTrendFingerprint: string;
  fieldIntelligenceFingerprint: string;
  zones: FollowUpZoneInput[];
  includeObservationCadence: boolean;
  includeFollowUpWindows: boolean;
  includeReviewQueue: boolean;
  includeManualTaskDrafts: boolean;
  includeEscalationSchedule: boolean;
  includeCalendarLegend: boolean;
  humanReviewRequired: boolean;
};

export type ObservationCadenceItem = {
  cadenceId: string;
  zoneId: string;
  label: string;
  cadenceTier: FollowUpRiskTier;
  recommendedIntervalDays: number;
  nextObservationLabel: string;
  requiredEvidenceBeforeReview: string[];
  minimumPhotoSet: string[];
  stopConditions: string[];
};

export type FollowUpWindow = {
  windowId: string;
  zoneId: string;
  label: string;
  sequence: number;
  windowType: "immediate-review" | "short-follow-up" | "standard-follow-up" | "monitoring";
  dueInDays: number;
  dueLabel: string;
  riskTier: FollowUpRiskTier;
  expectedOutput: string[];
  blockerRules: string[];
};

export type ReviewerQueueItem = {
  reviewId: string;
  zoneId: string;
  label: string;
  priority: FollowUpRiskTier;
  reason: string;
  requiredDecision: "approve-monitoring" | "request-new-photos" | "manual-conversion-review" | "reject-insufficient-evidence";
  reviewChecklist: string[];
};

export type ManualTaskDraft = {
  draftId: string;
  zoneId: string;
  label: string;
  suggestedTitle: string;
  suggestedDescription: string;
  suggestedDueLabel: string;
  conversionAllowed: false;
  requiredBeforeManualConversion: string[];
  prohibitedAutomation: string[];
};

export type EscalationScheduleItem = {
  escalationId: string;
  zoneId: string;
  label: string;
  trigger: string;
  action: string;
  dueInDays: number;
  humanReviewGate: string[];
};

export type FollowUpCalendarLegendItem = {
  tier: FollowUpRiskTier;
  intervalMeaning: string;
  reviewRequirement: string;
  allowedOutput: string;
  prohibitedOutput: string;
};

export type FollowUpSchedulerReport = {
  ok: true;
  mode: "follow-up-scheduler-dry-run";
  schedulerVersion: "agri-ai-follow-up-scheduler-v1";
  scheduleId: string;
  scheduleFingerprint: string;
  scheduleReady: boolean;
  inputSummary: {
    caseId: string;
    operatorName: string;
    crop: string;
    fieldName: string;
    locationHint: string;
    zoneCount: number;
    highPriorityZoneCount: number;
    urgentReviewZoneCount: number;
    totalPhotoCount: number;
    totalEvidenceCount: number;
    humanReviewRequired: true;
  };
  observationCadence: ObservationCadenceItem[];
  followUpWindows: FollowUpWindow[];
  reviewerQueue: ReviewerQueueItem[];
  manualTaskDrafts: ManualTaskDraft[];
  escalationSchedule: EscalationScheduleItem[];
  calendarLegend: FollowUpCalendarLegendItem[];
  calendarSummary: {
    nextCriticalWindow: string;
    soonWindowCount: number;
    reviewerQueueCount: number;
    manualDraftCount: number;
    escalationCount: number;
    dominantRiskTier: FollowUpRiskTier;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    followUpSchedulerReady: boolean;
    observationCadenceReady: boolean;
    calendarWindowReady: boolean;
    reviewerQueueReady: boolean;
    manualTaskDraftReady: boolean;
    escalationScheduleReady: boolean;
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
    manualConversionOnly: true;
    localAnalysisOnly: true;
    redactedOutputOnly: true;
  };
};

export const defaultFollowUpSchedulerInput: FollowUpSchedulerInput = {
  caseId: "",
  operatorName: "",
  crop: "",
  fieldName: "",
  locationHint: "",
  heatmapFingerprint: "",
  scoutingPlanFingerprint: "",
  temporalTrendFingerprint: "",
  fieldIntelligenceFingerprint: "",
  zones: [],
  includeObservationCadence: true,
  includeFollowUpWindows: true,
  includeReviewQueue: true,
  includeManualTaskDrafts: true,
  includeEscalationSchedule: true,
  includeCalendarLegend: true,
  humanReviewRequired: true,
};

export function createFollowUpSchedulerFixture(): FollowUpSchedulerInput {
  return {
    caseId: "follow-up-scheduler-case-ready",
    operatorName: "Operatore campo",
    crop: "olivo",
    fieldName: "appezzamento nord",
    locationHint: "settore nord — fila 4",
    heatmapFingerprint: "field-riskmap-ready-fingerprint",
    scoutingPlanFingerprint: "field-scouting-ready-fingerprint",
    temporalTrendFingerprint: "temporal-trend-ready-fingerprint",
    fieldIntelligenceFingerprint: "field-intelligence-ready-fingerprint",
    zones: [
      {
        zoneId: "zone-core",
        label: "Zona core sintomatica",
        riskTier: "urgent-human-review",
        riskScore: 88,
        trendDirection: "worsening",
        lastObservedAtLabel: "T0",
        evidenceCount: 8,
        photoCount: 5,
        photoGapDays: 0,
        requiredPhotoAngles: ["pianta intera", "foglia superiore", "foglia inferiore", "macro sintomo"],
        blockingNotes: ["rischio alto", "trend peggiorativo", "review urgente"],
        operatorNote: "Zona da rivalutare rapidamente.",
      },
      {
        zoneId: "zone-border",
        label: "Bordo espansione",
        riskTier: "high-priority",
        riskScore: 68,
        trendDirection: "stable",
        lastObservedAtLabel: "T0",
        evidenceCount: 4,
        photoCount: 3,
        photoGapDays: 1,
        requiredPhotoAngles: ["contesto bordo", "pianta intera", "foglia sospetta"],
        blockingNotes: ["controllare espansione", "serve confronto sano"],
        operatorNote: "Zona bordo da seguire.",
      },
      {
        zoneId: "zone-control",
        label: "Controllo sano",
        riskTier: "monitor",
        riskScore: 22,
        trendDirection: "stable",
        lastObservedAtLabel: "T0",
        evidenceCount: 2,
        photoCount: 3,
        photoGapDays: 2,
        requiredPhotoAngles: ["pianta intera sana", "foglia sana superiore", "foglia sana inferiore"],
        blockingNotes: ["usare solo come confronto", "non confermare diagnosi da solo"],
        operatorNote: "Controllo sano per luce e variabilità.",
      },
    ],
    includeObservationCadence: true,
    includeFollowUpWindows: true,
    includeReviewQueue: true,
    includeManualTaskDrafts: true,
    includeEscalationSchedule: true,
    includeCalendarLegend: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `follow-up-scheduler-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function normalizeList(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function intervalForTier(tier: FollowUpRiskTier, trendDirection: FollowUpZoneInput["trendDirection"]) {
  if (tier === "urgent-human-review") return trendDirection === "worsening" ? 1 : 2;
  if (tier === "high-priority") return trendDirection === "worsening" ? 2 : 3;
  if (tier === "attention") return trendDirection === "worsening" ? 3 : 5;
  return trendDirection === "worsening" ? 5 : 7;
}

function dominantRiskTier(zones: FollowUpZoneInput[]): FollowUpRiskTier {
  const rank: Record<FollowUpRiskTier, number> = {
    monitor: 1,
    attention: 2,
    "high-priority": 3,
    "urgent-human-review": 4,
  };

  return zones.reduce<FollowUpRiskTier>(
    (current, zone) => (rank[zone.riskTier] > rank[current] ? zone.riskTier : current),
    "monitor",
  );
}

function createObservationCadence(input: FollowUpSchedulerInput): ObservationCadenceItem[] {
  return input.zones.map((zone) => {
    const interval = intervalForTier(zone.riskTier, zone.trendDirection);
    const minimumPhotoSet = normalizeList(zone.requiredPhotoAngles);

    return {
      cadenceId: `cadence-${zone.zoneId}`,
      zoneId: zone.zoneId,
      label: `Cadence — ${zone.label}`,
      cadenceTier: zone.riskTier,
      recommendedIntervalDays: interval,
      nextObservationLabel: `T+${interval} giorni`,
      requiredEvidenceBeforeReview: [
        "foto contesto",
        "foto pianta intera",
        "foto dettaglio tessuto",
        "foto controllo comparabile",
        "nota operatore",
      ],
      minimumPhotoSet: minimumPhotoSet.length
        ? minimumPhotoSet
        : ["pianta intera", "foglia superiore", "foglia inferiore", "contesto"],
      stopConditions: [
        "foto insufficienti",
        "zona non identificabile",
        "assenza controllo sano",
        "review umana non completata",
      ],
    };
  });
}

function windowTypeForTier(tier: FollowUpRiskTier): FollowUpWindow["windowType"] {
  if (tier === "urgent-human-review") return "immediate-review";
  if (tier === "high-priority") return "short-follow-up";
  if (tier === "attention") return "standard-follow-up";
  return "monitoring";
}

function createFollowUpWindows(input: FollowUpSchedulerInput, cadence: ObservationCadenceItem[]): FollowUpWindow[] {
  return cadence.map((item, index) => {
    const zone = input.zones.find((candidate) => candidate.zoneId === item.zoneId);
    const tier = zone?.riskTier || item.cadenceTier;
    const dueInDays = item.recommendedIntervalDays;

    return {
      windowId: `window-${item.zoneId}`,
      zoneId: item.zoneId,
      label: `Finestra follow-up — ${zone?.label || item.zoneId}`,
      sequence: index + 1,
      windowType: windowTypeForTier(tier),
      dueInDays,
      dueLabel: `entro T+${dueInDays} giorni`,
      riskTier: tier,
      expectedOutput: [
        "nuovo set foto",
        "confronto con osservazione precedente",
        "decisione revisore",
        "note limiti",
      ],
      blockerRules: [
        "non creare task automaticamente",
        "non creare interventi automaticamente",
        "non eseguire azioni automatiche",
        "non indicare prodotto o dosaggio",
      ],
    };
  });
}

function createReviewerQueue(input: FollowUpSchedulerInput): ReviewerQueueItem[] {
  return input.zones
    .filter((zone) => zone.riskTier === "urgent-human-review" || zone.riskTier === "high-priority")
    .sort((left, right) => right.riskScore - left.riskScore)
    .map((zone) => ({
      reviewId: `review-${zone.zoneId}`,
      zoneId: zone.zoneId,
      label: `Review — ${zone.label}`,
      priority: zone.riskTier,
      reason: [
        `riskScore=${zone.riskScore}`,
        `trendDirection=${zone.trendDirection}`,
        `evidenceCount=${zone.evidenceCount}`,
        `photoGapDays=${zone.photoGapDays}`,
      ].join(" | "),
      requiredDecision:
        zone.riskTier === "urgent-human-review" ? "request-new-photos" : "manual-conversion-review",
      reviewChecklist: [
        "confermare qualità foto",
        "confermare zona e fila",
        "confrontare con controllo sano",
        "verificare trend temporale",
        "bloccare automazioni",
        "registrare decisione umana",
      ],
    }));
}

function createManualTaskDrafts(input: FollowUpSchedulerInput, windows: FollowUpWindow[]): ManualTaskDraft[] {
  return windows.map((window) => {
    const zone = input.zones.find((candidate) => candidate.zoneId === window.zoneId);

    return {
      draftId: `manual-task-draft-${window.zoneId}`,
      zoneId: window.zoneId,
      label: `Bozza manuale — ${zone?.label || window.zoneId}`,
      suggestedTitle: `Follow-up fotografico ${zone?.label || window.zoneId}`,
      suggestedDescription:
        `Raccogliere nuovo set foto per ${zone?.label || window.zoneId}. ` +
        "Bozza non salvata automaticamente. Conversione solo manuale dopo revisione.",
      suggestedDueLabel: window.dueLabel,
      conversionAllowed: false,
      requiredBeforeManualConversion: [
        "review umana completata",
        "foto minime presenti",
        "controllo sano disponibile",
        "nessuna prescrizione prodotto",
        "nessun dosaggio",
      ],
      prohibitedAutomation: [
        "nessuna creazione automatica task",
        "nessuna creazione automatica intervento",
        "nessuna persistenza DB automatica",
        "nessuna esecuzione automatica",
      ],
    };
  });
}

function createEscalationSchedule(input: FollowUpSchedulerInput, windows: FollowUpWindow[]): EscalationScheduleItem[] {
  return windows.map((window) => {
    const zone = input.zones.find((candidate) => candidate.zoneId === window.zoneId);
    const dueInDays = clamp(window.dueInDays - 1, 0, 30);

    return {
      escalationId: `escalation-${window.zoneId}`,
      zoneId: window.zoneId,
      label: `Escalation — ${zone?.label || window.zoneId}`,
      trigger:
        window.riskTier === "urgent-human-review"
          ? "review non completata o foto mancanti"
          : "follow-up non completato entro finestra",
      action:
        window.riskTier === "urgent-human-review"
          ? "bloccare conversione manuale finché revisore non decide"
          : "richiedere nuovo set foto o conferma revisore",
      dueInDays,
      humanReviewGate: [
        "conferma revisore",
        "check qualità foto",
        "check no prodotto/dosaggio",
        "check no automazioni",
      ],
    };
  });
}

function createCalendarLegend(): FollowUpCalendarLegendItem[] {
  return [
    {
      tier: "monitor",
      intervalMeaning: "follow-up ordinario",
      reviewRequirement: "review prima di conversioni manuali",
      allowedOutput: "promemoria manuale",
      prohibitedOutput: "task/intervento automatico",
    },
    {
      tier: "attention",
      intervalMeaning: "follow-up ravvicinato",
      reviewRequirement: "review consigliata",
      allowedOutput: "bozza manuale",
      prohibitedOutput: "prescrizione prodotto o dosaggio",
    },
    {
      tier: "high-priority",
      intervalMeaning: "finestra breve",
      reviewRequirement: "review necessaria",
      allowedOutput: "queue revisore",
      prohibitedOutput: "esecuzione automatica",
    },
    {
      tier: "urgent-human-review",
      intervalMeaning: "review immediata",
      reviewRequirement: "review obbligatoria urgente",
      allowedOutput: "blocco operativo e richiesta foto",
      prohibitedOutput: "qualunque automazione",
    },
  ];
}

export function createFollowUpSchedulerReport(
  input: FollowUpSchedulerInput = defaultFollowUpSchedulerInput,
): FollowUpSchedulerReport {
  const zones = input.zones.map((zone) => ({
    ...zone,
    requiredPhotoAngles: normalizeList(zone.requiredPhotoAngles || []),
    blockingNotes: normalizeList(zone.blockingNotes || []),
  }));
  const cadence = input.includeObservationCadence
    ? createObservationCadence({
        ...input,
        zones,
      })
    : [];
  const windows = input.includeFollowUpWindows
    ? createFollowUpWindows(
        {
          ...input,
          zones,
        },
        cadence,
      )
    : [];
  const reviewerQueue = input.includeReviewQueue
    ? createReviewerQueue({
        ...input,
        zones,
      })
    : [];
  const manualTaskDrafts = input.includeManualTaskDrafts
    ? createManualTaskDrafts(
        {
          ...input,
          zones,
        },
        windows,
      )
    : [];
  const escalationSchedule = input.includeEscalationSchedule
    ? createEscalationSchedule(
        {
          ...input,
          zones,
        },
        windows,
      )
    : [];
  const calendarLegend = input.includeCalendarLegend ? createCalendarLegend() : [];
  const totalPhotoCount = zones.reduce((total, zone) => total + zone.photoCount, 0);
  const totalEvidenceCount = zones.reduce((total, zone) => total + zone.evidenceCount, 0);
  const highPriorityZoneCount = zones.filter(
    (zone) => zone.riskTier === "high-priority" || zone.riskTier === "urgent-human-review",
  ).length;
  const urgentReviewZoneCount = zones.filter((zone) => zone.riskTier === "urgent-human-review").length;
  const scheduleReady = Boolean(
    input.caseId.trim() &&
      input.operatorName.trim() &&
      input.crop.trim() &&
      input.fieldName.trim() &&
      input.locationHint.trim() &&
      input.humanReviewRequired &&
      zones.length >= 1 &&
      totalPhotoCount >= 1 &&
      totalEvidenceCount >= 1,
  );
  const scheduleId = `follow-up-scheduler-${input.caseId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const scheduleFingerprint = fingerprint(
    [
      scheduleId,
      input.operatorName,
      input.crop,
      input.fieldName,
      input.locationHint,
      input.heatmapFingerprint,
      input.scoutingPlanFingerprint,
      input.temporalTrendFingerprint,
      input.fieldIntelligenceFingerprint,
      zones.map((zone) => `${zone.zoneId}:${zone.riskTier}:${zone.riskScore}:${zone.trendDirection}`).join("|"),
      String(scheduleReady),
    ].join("|"),
  );
  const soonWindowCount = windows.filter((window) => window.dueInDays <= 2).length;
  const nextCriticalWindow =
    windows
      .filter((window) => window.riskTier === "urgent-human-review" || window.riskTier === "high-priority")
      .sort((left, right) => left.dueInDays - right.dueInDays)[0]?.dueLabel || "";
  const confidenceScore = Number(
    Math.min(
      0.93,
      0.28 +
        Math.min(zones.length, 8) * 0.05 +
        Math.min(totalEvidenceCount, 20) * 0.018 +
        Math.min(totalPhotoCount, 20) * 0.011,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "follow-up-scheduler-dry-run",
    schedulerVersion: "agri-ai-follow-up-scheduler-v1",
    scheduleId,
    scheduleFingerprint,
    scheduleReady,
    inputSummary: {
      caseId: input.caseId.trim(),
      operatorName: input.operatorName.trim(),
      crop: input.crop.trim(),
      fieldName: input.fieldName.trim(),
      locationHint: input.locationHint.trim(),
      zoneCount: zones.length,
      highPriorityZoneCount,
      urgentReviewZoneCount,
      totalPhotoCount,
      totalEvidenceCount,
      humanReviewRequired: true,
    },
    observationCadence: cadence,
    followUpWindows: windows,
    reviewerQueue,
    manualTaskDrafts,
    escalationSchedule,
    calendarLegend,
    calendarSummary: {
      nextCriticalWindow,
      soonWindowCount,
      reviewerQueueCount: reviewerQueue.length,
      manualDraftCount: manualTaskDrafts.length,
      escalationCount: escalationSchedule.length,
      dominantRiskTier: dominantRiskTier(zones),
      confidenceScore,
      reasons: [
        `zoneCount=${zones.length}`,
        `highPriorityZoneCount=${highPriorityZoneCount}`,
        `urgentReviewZoneCount=${urgentReviewZoneCount}`,
        `totalPhotoCount=${totalPhotoCount}`,
        `totalEvidenceCount=${totalEvidenceCount}`,
        `soonWindowCount=${soonWindowCount}`,
      ],
      blockingLimitations: [
        "nessuna chiamata provider AI live",
        "scheduler locale non crea task",
        "nessuna persistenza DB",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
        "human review obbligatoria",
      ],
    },
    premiumSignals: {
      followUpSchedulerReady: scheduleReady,
      observationCadenceReady: cadence.length > 0,
      calendarWindowReady: windows.length > 0,
      reviewerQueueReady: reviewerQueue.length > 0,
      manualTaskDraftReady: manualTaskDrafts.length > 0,
      escalationScheduleReady: escalationSchedule.length > 0,
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
      manualConversionOnly: true,
      localAnalysisOnly: true,
      redactedOutputOnly: true,
    },
  };
}

export function createReadyFollowUpSchedulerReport() {
  return createFollowUpSchedulerReport(createFollowUpSchedulerFixture());
}

export function createBlockedFollowUpSchedulerReport() {
  return createFollowUpSchedulerReport(defaultFollowUpSchedulerInput);
}

export function formatFollowUpSchedulerReport(report: FollowUpSchedulerReport) {
  return [
    "AI Follow-Up Scheduler & Observation Cadence",
    "",
    `Schedule ID: ${report.scheduleId}`,
    `Schedule fingerprint: ${report.scheduleFingerprint}`,
    `Version: ${report.schedulerVersion}`,
    `Mode: ${report.mode}`,
    `scheduleReady=${report.scheduleReady}`,
    "",
    "Input summary:",
    `- caseId=${report.inputSummary.caseId || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- crop=${report.inputSummary.crop || "missing"}`,
    `- fieldName=${report.inputSummary.fieldName || "missing"}`,
    `- locationHint=${report.inputSummary.locationHint || "missing"}`,
    `- zoneCount=${report.inputSummary.zoneCount}`,
    `- highPriorityZoneCount=${report.inputSummary.highPriorityZoneCount}`,
    `- urgentReviewZoneCount=${report.inputSummary.urgentReviewZoneCount}`,
    `- totalPhotoCount=${report.inputSummary.totalPhotoCount}`,
    `- totalEvidenceCount=${report.inputSummary.totalEvidenceCount}`,
    "- humanReviewRequired=true",
    "",
    "Calendar summary:",
    `- nextCriticalWindow=${report.calendarSummary.nextCriticalWindow || "none"}`,
    `- soonWindowCount=${report.calendarSummary.soonWindowCount}`,
    `- reviewerQueueCount=${report.calendarSummary.reviewerQueueCount}`,
    `- manualDraftCount=${report.calendarSummary.manualDraftCount}`,
    `- escalationCount=${report.calendarSummary.escalationCount}`,
    `- dominantRiskTier=${report.calendarSummary.dominantRiskTier}`,
    `- confidenceScore=${report.calendarSummary.confidenceScore}`,
    ...report.calendarSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Observation cadence:",
    ...report.observationCadence.map(
      (item) =>
        `- ${item.zoneId} | interval=${item.recommendedIntervalDays}d | tier=${item.cadenceTier} | next=${item.nextObservationLabel}`,
    ),
    "",
    "Follow-up windows:",
    ...report.followUpWindows.map(
      (item) =>
        `- ${item.sequence}. ${item.zoneId} | ${item.windowType} | due=${item.dueLabel} | tier=${item.riskTier}`,
    ),
    "",
    "Reviewer queue:",
    ...report.reviewerQueue.map(
      (item) => `- ${item.reviewId} | priority=${item.priority} | decision=${item.requiredDecision}`,
    ),
    "",
    "Manual task drafts:",
    ...report.manualTaskDrafts.map(
      (item) =>
        `- ${item.draftId} | title=${item.suggestedTitle} | due=${item.suggestedDueLabel} | conversionAllowed=false`,
    ),
    "",
    "Escalation schedule:",
    ...report.escalationSchedule.map(
      (item) => `- ${item.escalationId} | trigger=${item.trigger} | action=${item.action} | dueInDays=${item.dueInDays}`,
    ),
    "",
    "Calendar legend:",
    ...report.calendarLegend.map(
      (item) => `- ${item.tier} | ${item.intervalMeaning} | ${item.reviewRequirement}`,
    ),
    "",
    "Premium signals:",
    `- followUpSchedulerReady=${report.premiumSignals.followUpSchedulerReady}`,
    `- observationCadenceReady=${report.premiumSignals.observationCadenceReady}`,
    `- calendarWindowReady=${report.premiumSignals.calendarWindowReady}`,
    `- reviewerQueueReady=${report.premiumSignals.reviewerQueueReady}`,
    `- manualTaskDraftReady=${report.premiumSignals.manualTaskDraftReady}`,
    `- escalationScheduleReady=${report.premiumSignals.escalationScheduleReady}`,
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
    "- manualConversionOnly=true",
    "- localAnalysisOnly=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
