export type ProtocolPriority = "observe-only" | "prepare-manual-review" | "manual-protocol-ready" | "blocked";

export type ProtocolZoneInput = {
  zoneId: string;
  label: string;
  priority: ProtocolPriority;
  readinessScore: number;
  reviewerDecision: "not-reviewed" | "approved-cautious-manual" | "needs-evidence" | "rejected";
  followUpWindowLabel: string;
  evidenceCount: number;
  photoCount: number;
  mandatoryChecks: string[];
  missingChecks: string[];
  operatorNote: string;
};

export type InterventionProtocolInput = {
  caseId: string;
  operatorName: string;
  crop: string;
  fieldName: string;
  locationHint: string;
  interventionReadinessFingerprint: string;
  followUpSchedulerFingerprint: string;
  heatmapFingerprint: string;
  temporalTrendFingerprint: string;
  zones: ProtocolZoneInput[];
  includeProtocolSteps: boolean;
  includeComplianceGuard: boolean;
  includePreFlightChecklist: boolean;
  includeManualDispatchPacket: boolean;
  includeOperatorBriefing: boolean;
  includeAuditTrail: boolean;
  humanReviewRequired: boolean;
};

export type ProtocolStep = {
  stepId: string;
  zoneId: string;
  sequence: number;
  title: string;
  owner: "reviewer" | "operator" | "admin";
  status: "manual-only" | "blocked" | "review-required";
  instruction: string;
  requiredBeforeNextStep: string[];
  prohibitedActions: string[];
};

export type ComplianceGuardItem = {
  guardId: string;
  zoneId: string;
  label: string;
  guardStatus: "pass" | "blocked" | "review-required";
  reason: string;
  allowedActions: string[];
  prohibitedActions: string[];
};

export type PreFlightChecklistItem = {
  checklistId: string;
  zoneId: string;
  label: string;
  checklistType: "evidence" | "operator-safety" | "review" | "documentation";
  requiredItems: string[];
  missingItems: string[];
  passed: boolean;
};

export type ManualDispatchPacket = {
  packetId: string;
  zoneId: string;
  label: string;
  dispatchTitle: string;
  dispatchSummary: string;
  dispatchAllowed: false;
  requiredManualApprovals: string[];
  blockedAutomation: string[];
};

export type OperatorBriefingItem = {
  briefingId: string;
  zoneId: string;
  label: string;
  briefingText: string;
  doList: string[];
  doNotList: string[];
};

export type ComplianceAuditTrailItem = {
  auditId: string;
  zoneId: string;
  label: string;
  entries: string[];
  fingerprintParts: string[];
};

export type InterventionProtocolReport = {
  ok: true;
  mode: "intervention-protocol-dry-run";
  protocolVersion: "agri-ai-intervention-protocol-v1";
  protocolId: string;
  protocolFingerprint: string;
  protocolReady: boolean;
  inputSummary: {
    caseId: string;
    operatorName: string;
    crop: string;
    fieldName: string;
    locationHint: string;
    zoneCount: number;
    protocolReadyZoneCount: number;
    blockedZoneCount: number;
    reviewRequiredZoneCount: number;
    totalPhotoCount: number;
    totalEvidenceCount: number;
    humanReviewRequired: true;
  };
  protocolSteps: ProtocolStep[];
  complianceGuard: ComplianceGuardItem[];
  preFlightChecklist: PreFlightChecklistItem[];
  manualDispatchPackets: ManualDispatchPacket[];
  operatorBriefing: OperatorBriefingItem[];
  complianceAuditTrail: ComplianceAuditTrailItem[];
  protocolSummary: {
    dominantPriority: ProtocolPriority;
    readyPacketCount: number;
    blockedPacketCount: number;
    reviewRequiredCount: number;
    nextManualAction: string;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    interventionProtocolReady: boolean;
    complianceGuardReady: boolean;
    preFlightChecklistReady: boolean;
    manualDispatchPacketReady: boolean;
    operatorBriefingReady: boolean;
    auditTrailReady: boolean;
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

export const defaultInterventionProtocolInput: InterventionProtocolInput = {
  caseId: "",
  operatorName: "",
  crop: "",
  fieldName: "",
  locationHint: "",
  interventionReadinessFingerprint: "",
  followUpSchedulerFingerprint: "",
  heatmapFingerprint: "",
  temporalTrendFingerprint: "",
  zones: [],
  includeProtocolSteps: true,
  includeComplianceGuard: true,
  includePreFlightChecklist: true,
  includeManualDispatchPacket: true,
  includeOperatorBriefing: true,
  includeAuditTrail: true,
  humanReviewRequired: true,
};

export function createInterventionProtocolFixture(): InterventionProtocolInput {
  return {
    caseId: "intervention-protocol-case-ready",
    operatorName: "Operatore campo",
    crop: "olivo",
    fieldName: "appezzamento nord",
    locationHint: "settore nord fila quattro",
    interventionReadinessFingerprint: "intervention-readiness-ready-fingerprint",
    followUpSchedulerFingerprint: "followup-scheduler-ready-fingerprint",
    heatmapFingerprint: "fieldmap-ready-fingerprint",
    temporalTrendFingerprint: "temporal-trend-ready-fingerprint",
    zones: [
      {
        zoneId: "zone-core",
        label: "Zona core sintomatica",
        priority: "blocked",
        readinessScore: 42,
        reviewerDecision: "needs-evidence",
        followUpWindowLabel: "entro T+1 giorno",
        evidenceCount: 8,
        photoCount: 5,
        mandatoryChecks: ["foto contesto", "macro sintomo", "nota operatore"],
        missingChecks: ["review finale", "controllo sano aggiornato"],
        operatorNote: "Protocollo bloccato: completare evidenza.",
      },
      {
        zoneId: "zone-border",
        label: "Bordo espansione",
        priority: "manual-protocol-ready",
        readinessScore: 79,
        reviewerDecision: "approved-cautious-manual",
        followUpWindowLabel: "entro T+2 giorni",
        evidenceCount: 5,
        photoCount: 4,
        mandatoryChecks: ["foto bordo", "contesto", "nota operatore", "review cautelativa"],
        missingChecks: [],
        operatorNote: "Protocollo manuale pronto, senza automazioni.",
      },
      {
        zoneId: "zone-control",
        label: "Controllo sano",
        priority: "observe-only",
        readinessScore: 31,
        reviewerDecision: "not-reviewed",
        followUpWindowLabel: "entro T+7 giorni",
        evidenceCount: 2,
        photoCount: 3,
        mandatoryChecks: ["foto controllo"],
        missingChecks: ["review non necessaria immediata"],
        operatorNote: "Zona solo osservazione.",
      },
    ],
    includeProtocolSteps: true,
    includeComplianceGuard: true,
    includePreFlightChecklist: true,
    includeManualDispatchPacket: true,
    includeOperatorBriefing: true,
    includeAuditTrail: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `intervention-protocol-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function dominantPriority(zones: ProtocolZoneInput[]): ProtocolPriority {
  const rank: Record<ProtocolPriority, number> = {
    "observe-only": 1,
    "prepare-manual-review": 2,
    "manual-protocol-ready": 3,
    blocked: 4,
  };

  return zones.reduce<ProtocolPriority>(
    (current, zone) => (rank[zone.priority] > rank[current] ? zone.priority : current),
    "observe-only",
  );
}

function protocolStatus(zone: ProtocolZoneInput): ProtocolStep["status"] {
  if (zone.priority === "blocked" || zone.reviewerDecision === "needs-evidence" || zone.reviewerDecision === "rejected") {
    return "blocked";
  }

  if (zone.reviewerDecision === "approved-cautious-manual") {
    return "manual-only";
  }

  return "review-required";
}

function guardStatus(zone: ProtocolZoneInput): ComplianceGuardItem["guardStatus"] {
  if (zone.priority === "blocked" || zone.missingChecks.length > 0 || zone.reviewerDecision === "rejected") {
    return "blocked";
  }

  if (zone.reviewerDecision === "not-reviewed" || zone.priority === "prepare-manual-review") {
    return "review-required";
  }

  return "pass";
}

function createProtocolSteps(input: InterventionProtocolInput): ProtocolStep[] {
  return input.zones.flatMap((zone) => {
    const status = protocolStatus(zone);

    return [
      {
        stepId: `protocolstep-${zone.zoneId}-review`,
        zoneId: zone.zoneId,
        sequence: 1,
        title: `Review evidenza — ${zone.label}`,
        owner: "reviewer",
        status,
        instruction:
          status === "blocked"
            ? "Bloccare qualunque conversione finché revisore e nuove evidenze non chiudono i gap."
            : "Validare evidenza e limiti prima di preparare qualsiasi bozza manuale.",
        requiredBeforeNextStep: [
          "decisione revisore registrata",
          "foto minime presenti",
          "limiti documentati",
          "assenza prodotto e dosaggio",
        ],
        prohibitedActions: [
          "creazione automatica task",
          "creazione automatica intervento",
          "persistenza automatica",
          "esecuzione automatica",
        ],
      },
      {
        stepId: `protocolstep-${zone.zoneId}-operator`,
        zoneId: zone.zoneId,
        sequence: 2,
        title: `Brief operatore — ${zone.label}`,
        owner: "operator",
        status,
        instruction:
          status === "manual-only"
            ? "Preparare solo attività manuale descrittiva, senza prescrizione prodotto o dose."
            : "Raccogliere evidenza o attendere decisione revisore.",
        requiredBeforeNextStep: [
          "conferma zona",
          "foto confronto",
          "nota campo",
          "review umana completata",
        ],
        prohibitedActions: [
          "prodotto",
          "dosaggio",
          "share pubblico automatico",
          "esecuzione operativa automatica",
        ],
      },
      {
        stepId: `protocolstep-${zone.zoneId}-admin`,
        zoneId: zone.zoneId,
        sequence: 3,
        title: `Gate admin — ${zone.label}`,
        owner: "admin",
        status,
        instruction: "Verificare che il protocollo resti manuale, redatto e non persistito automaticamente.",
        requiredBeforeNextStep: [
          "audit trail presente",
          "manual dispatch bloccato",
          "nessuna scrittura DB automatica",
          "nessun provider live",
        ],
        prohibitedActions: [
          "abilitare automazioni",
          "scrivere DB automaticamente",
          "invocare provider AI live",
          "convertire senza revisione",
        ],
      },
    ];
  });
}

function createComplianceGuard(input: InterventionProtocolInput): ComplianceGuardItem[] {
  return input.zones.map((zone) => {
    const status = guardStatus(zone);

    return {
      guardId: `compliance-${zone.zoneId}`,
      zoneId: zone.zoneId,
      label: `Compliance guard — ${zone.label}`,
      guardStatus: status,
      reason: [
        `priority=${zone.priority}`,
        `reviewerDecision=${zone.reviewerDecision}`,
        `missingChecks=${zone.missingChecks.length}`,
        `readinessScore=${zone.readinessScore}`,
      ].join(" | "),
      allowedActions:
        status === "pass"
          ? ["bozza manuale", "brief operatore", "audit trail", "checklist sicurezza"]
          : ["raccolta nuova evidenza", "review umana", "note limiti"],
      prohibitedActions: [
        "task automatico",
        "intervento automatico",
        "persistenza automatica",
        "esecuzione automatica",
        "prodotto",
        "dosaggio",
      ],
    };
  });
}

function createPreFlightChecklist(input: InterventionProtocolInput): PreFlightChecklistItem[] {
  return input.zones.flatMap((zone) => {
    const missing = normalize(zone.missingChecks || []);

    return [
      {
        checklistId: `preflight-evidence-${zone.zoneId}`,
        zoneId: zone.zoneId,
        label: `Pre-flight evidenza — ${zone.label}`,
        checklistType: "evidence",
        requiredItems: ["foto contesto", "foto dettaglio", "controllo sano", "nota operatore"],
        missingItems: missing,
        passed: zone.evidenceCount >= 3 && zone.photoCount >= 3 && missing.length === 0,
      },
      {
        checklistId: `preflight-review-${zone.zoneId}`,
        zoneId: zone.zoneId,
        label: `Pre-flight review — ${zone.label}`,
        checklistType: "review",
        requiredItems: ["decisione revisore", "limiti documentati", "no prodotto", "no dosaggio"],
        missingItems: zone.reviewerDecision === "approved-cautious-manual" ? [] : ["decisione revisore non conclusiva"],
        passed: zone.reviewerDecision === "approved-cautious-manual",
      },
      {
        checklistId: `preflight-safety-${zone.zoneId}`,
        zoneId: zone.zoneId,
        label: `Pre-flight sicurezza — ${zone.label}`,
        checklistType: "operator-safety",
        requiredItems: ["DPI se necessari", "zona identificata", "nessuna automazione", "solo bozza manuale"],
        missingItems: [],
        passed: true,
      },
    ];
  });
}

function createManualDispatchPackets(input: InterventionProtocolInput): ManualDispatchPacket[] {
  return input.zones.map((zone) => {
    const ready = zone.priority === "manual-protocol-ready" && zone.reviewerDecision === "approved-cautious-manual";

    return {
      packetId: `manualdispatch-${zone.zoneId}`,
      zoneId: zone.zoneId,
      label: `Manual dispatch packet — ${zone.label}`,
      dispatchTitle: `Protocollo manuale — ${zone.label}`,
      dispatchSummary: ready
        ? "Pacchetto pronto solo per valutazione manuale. Nessuna conversione automatica."
        : "Pacchetto non pronto. Restano blocchi o review mancanti.",
      dispatchAllowed: false,
      requiredManualApprovals: [
        "approvazione revisore",
        "conferma operatore",
        "check admin",
        "conferma no prodotto",
        "conferma no dosaggio",
      ],
      blockedAutomation: [
        "automaticTaskCreationAllowed=false",
        "automaticInterventionCreationAllowed=false",
        "automaticExecutionAllowed=false",
        "dbPersistenceAllowed=false",
      ],
    };
  });
}

function createOperatorBriefing(input: InterventionProtocolInput): OperatorBriefingItem[] {
  return input.zones.map((zone) => ({
    briefingId: `briefing-${zone.zoneId}`,
    zoneId: zone.zoneId,
    label: `Briefing — ${zone.label}`,
    briefingText:
      zone.priority === "blocked"
        ? "Non procedere: raccogliere nuova evidenza e attendere revisione."
        : "Seguire solo le attività descrittive e manuali approvate dal revisore.",
    doList: [
      "fotografare contesto",
      "annotare zona e fila",
      "documentare limiti",
      "richiedere revisione se dubbio",
    ],
    doNotList: [
      "non applicare prodotto",
      "non indicare dosaggio",
      "non convertire automaticamente",
      "non salvare automaticamente",
    ],
  }));
}

function createComplianceAuditTrail(input: InterventionProtocolInput): ComplianceAuditTrailItem[] {
  return input.zones.map((zone) => ({
    auditId: `audit-${zone.zoneId}`,
    zoneId: zone.zoneId,
    label: `Audit trail — ${zone.label}`,
    entries: [
      `priority=${zone.priority}`,
      `reviewerDecision=${zone.reviewerDecision}`,
      `readinessScore=${zone.readinessScore}`,
      `evidenceCount=${zone.evidenceCount}`,
      `photoCount=${zone.photoCount}`,
      "providerCalled=false",
      "persistencePerformed=false",
      "taskCreated=false",
      "interventionCreated=false",
      "automaticExecutionPerformed=false",
      "manualDispatchOnly=true",
    ],
    fingerprintParts: [
      zone.zoneId,
      zone.priority,
      zone.reviewerDecision,
      String(zone.readinessScore),
      String(zone.evidenceCount),
      String(zone.photoCount),
    ],
  }));
}

export function createInterventionProtocolReport(
  input: InterventionProtocolInput = defaultInterventionProtocolInput,
): InterventionProtocolReport {
  const zones = input.zones.map((zone) => ({
    ...zone,
    mandatoryChecks: normalize(zone.mandatoryChecks || []),
    missingChecks: normalize(zone.missingChecks || []),
  }));
  const protocolSteps = input.includeProtocolSteps ? createProtocolSteps({ ...input, zones }) : [];
  const complianceGuard = input.includeComplianceGuard ? createComplianceGuard({ ...input, zones }) : [];
  const preFlightChecklist = input.includePreFlightChecklist ? createPreFlightChecklist({ ...input, zones }) : [];
  const manualDispatchPackets = input.includeManualDispatchPacket ? createManualDispatchPackets({ ...input, zones }) : [];
  const operatorBriefing = input.includeOperatorBriefing ? createOperatorBriefing({ ...input, zones }) : [];
  const complianceAuditTrail = input.includeAuditTrail ? createComplianceAuditTrail({ ...input, zones }) : [];
  const totalPhotoCount = zones.reduce((total, zone) => total + zone.photoCount, 0);
  const totalEvidenceCount = zones.reduce((total, zone) => total + zone.evidenceCount, 0);
  const protocolReadyZoneCount = zones.filter(
    (zone) => zone.priority === "manual-protocol-ready" && zone.reviewerDecision === "approved-cautious-manual",
  ).length;
  const blockedZoneCount = zones.filter(
    (zone) => zone.priority === "blocked" || zone.reviewerDecision === "rejected" || zone.reviewerDecision === "needs-evidence",
  ).length;
  const reviewRequiredZoneCount = zones.filter(
    (zone) => zone.reviewerDecision === "not-reviewed" || zone.reviewerDecision === "needs-evidence",
  ).length;
  const protocolReady = Boolean(
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
  const protocolId = `intervention-protocol-${input.caseId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const protocolFingerprint = fingerprint(
    [
      protocolId,
      input.operatorName,
      input.crop,
      input.fieldName,
      input.locationHint,
      input.interventionReadinessFingerprint,
      input.followUpSchedulerFingerprint,
      input.heatmapFingerprint,
      input.temporalTrendFingerprint,
      zones.map((zone) => `${zone.zoneId}:${zone.priority}:${zone.readinessScore}:${zone.reviewerDecision}`).join("|"),
      String(protocolReady),
    ].join("|"),
  );
  const readyPacketCount = zones.filter(
    (zone) => zone.priority === "manual-protocol-ready" && zone.reviewerDecision === "approved-cautious-manual",
  ).length;
  const blockedPacketCount = zones.filter((zone) => zone.priority === "blocked").length;
  const confidenceScore = Number(
    Math.min(
      0.94,
      0.31 +
        Math.min(zones.length, 8) * 0.05 +
        Math.min(totalEvidenceCount, 20) * 0.018 +
        Math.min(totalPhotoCount, 20) * 0.012,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "intervention-protocol-dry-run",
    protocolVersion: "agri-ai-intervention-protocol-v1",
    protocolId,
    protocolFingerprint,
    protocolReady,
    inputSummary: {
      caseId: input.caseId.trim(),
      operatorName: input.operatorName.trim(),
      crop: input.crop.trim(),
      fieldName: input.fieldName.trim(),
      locationHint: input.locationHint.trim(),
      zoneCount: zones.length,
      protocolReadyZoneCount,
      blockedZoneCount,
      reviewRequiredZoneCount,
      totalPhotoCount,
      totalEvidenceCount,
      humanReviewRequired: true,
    },
    protocolSteps,
    complianceGuard,
    preFlightChecklist,
    manualDispatchPackets,
    operatorBriefing,
    complianceAuditTrail,
    protocolSummary: {
      dominantPriority: dominantPriority(zones),
      readyPacketCount,
      blockedPacketCount,
      reviewRequiredCount: reviewRequiredZoneCount,
      nextManualAction:
        blockedPacketCount > 0
          ? "risolvere blocchi e completare review"
          : readyPacketCount > 0
            ? "preparare solo protocollo manuale non persistito"
            : "raccogliere nuova evidenza",
      confidenceScore,
      reasons: [
        `zoneCount=${zones.length}`,
        `protocolReadyZoneCount=${protocolReadyZoneCount}`,
        `blockedZoneCount=${blockedZoneCount}`,
        `reviewRequiredZoneCount=${reviewRequiredZoneCount}`,
        `totalPhotoCount=${totalPhotoCount}`,
        `totalEvidenceCount=${totalEvidenceCount}`,
      ],
      blockingLimitations: [
        "nessuna chiamata provider AI live",
        "protocollo locale non autorizza esecuzione",
        "nessuna persistenza DB",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
        "human review obbligatoria",
      ],
    },
    premiumSignals: {
      interventionProtocolReady: protocolReady,
      complianceGuardReady: complianceGuard.length > 0,
      preFlightChecklistReady: preFlightChecklist.length > 0,
      manualDispatchPacketReady: manualDispatchPackets.length > 0,
      operatorBriefingReady: operatorBriefing.length > 0,
      auditTrailReady: complianceAuditTrail.length > 0,
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

export function createReadyInterventionProtocolReport() {
  return createInterventionProtocolReport(createInterventionProtocolFixture());
}

export function createBlockedInterventionProtocolReport() {
  return createInterventionProtocolReport(defaultInterventionProtocolInput);
}

export function formatInterventionProtocolReport(report: InterventionProtocolReport) {
  return [
    "AI Intervention Protocol Simulator & Compliance Guard",
    "",
    `Protocol ID: ${report.protocolId}`,
    `Protocol fingerprint: ${report.protocolFingerprint}`,
    `Version: ${report.protocolVersion}`,
    `Mode: ${report.mode}`,
    `protocolReady=${report.protocolReady}`,
    "",
    "Input summary:",
    `- caseId=${report.inputSummary.caseId || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- crop=${report.inputSummary.crop || "missing"}`,
    `- fieldName=${report.inputSummary.fieldName || "missing"}`,
    `- locationHint=${report.inputSummary.locationHint || "missing"}`,
    `- zoneCount=${report.inputSummary.zoneCount}`,
    `- protocolReadyZoneCount=${report.inputSummary.protocolReadyZoneCount}`,
    `- blockedZoneCount=${report.inputSummary.blockedZoneCount}`,
    `- reviewRequiredZoneCount=${report.inputSummary.reviewRequiredZoneCount}`,
    `- totalPhotoCount=${report.inputSummary.totalPhotoCount}`,
    `- totalEvidenceCount=${report.inputSummary.totalEvidenceCount}`,
    "- humanReviewRequired=true",
    "",
    "Protocol summary:",
    `- dominantPriority=${report.protocolSummary.dominantPriority}`,
    `- readyPacketCount=${report.protocolSummary.readyPacketCount}`,
    `- blockedPacketCount=${report.protocolSummary.blockedPacketCount}`,
    `- reviewRequiredCount=${report.protocolSummary.reviewRequiredCount}`,
    `- nextManualAction=${report.protocolSummary.nextManualAction}`,
    `- confidenceScore=${report.protocolSummary.confidenceScore}`,
    ...report.protocolSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Protocol steps:",
    ...report.protocolSteps.map(
      (step) => `- ${step.stepId} | owner=${step.owner} | status=${step.status} | title=${step.title}`,
    ),
    "",
    "Compliance guard:",
    ...report.complianceGuard.map(
      (guard) => `- ${guard.guardId} | status=${guard.guardStatus} | reason=${guard.reason}`,
    ),
    "",
    "Pre-flight checklist:",
    ...report.preFlightChecklist.map(
      (item) => `- ${item.checklistId} | type=${item.checklistType} | passed=${item.passed}`,
    ),
    "",
    "Manual dispatch packets:",
    ...report.manualDispatchPackets.map(
      (packet) => `- ${packet.packetId} | title=${packet.dispatchTitle} | dispatchAllowed=false`,
    ),
    "",
    "Operator briefing:",
    ...report.operatorBriefing.map(
      (briefing) => `- ${briefing.briefingId} | text=${briefing.briefingText}`,
    ),
    "",
    "Compliance audit trail:",
    ...report.complianceAuditTrail.map(
      (item) => `- ${item.auditId} | entries=${item.entries.join(", ")}`,
    ),
    "",
    "Premium signals:",
    `- interventionProtocolReady=${report.premiumSignals.interventionProtocolReady}`,
    `- complianceGuardReady=${report.premiumSignals.complianceGuardReady}`,
    `- preFlightChecklistReady=${report.premiumSignals.preFlightChecklistReady}`,
    `- manualDispatchPacketReady=${report.premiumSignals.manualDispatchPacketReady}`,
    `- operatorBriefingReady=${report.premiumSignals.operatorBriefingReady}`,
    `- auditTrailReady=${report.premiumSignals.auditTrailReady}`,
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
