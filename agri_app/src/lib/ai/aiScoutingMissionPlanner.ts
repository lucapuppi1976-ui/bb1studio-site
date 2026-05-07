export type ScoutingMissionPriority = "routine" | "priority-review" | "urgent-visit" | "blocked";
export type ScoutingMissionReadiness = "ready-manual" | "review-required" | "blocked" | "observe-only";

export type ScoutingMissionCaseInput = {
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  locationHint: string;
  priority: ScoutingMissionPriority;
  readiness: ScoutingMissionReadiness;
  commandScore: number;
  photoNeedCount: number;
  evidenceNeedCount: number;
  followUpWindowLabel: string;
  requiredShots: string[];
  blockers: string[];
  reviewerNote: string;
};

export type ScoutingMissionResourceInput = {
  resourceId: string;
  label: string;
  role: "operator" | "reviewer" | "field-visit" | "documentation";
  availableWindowLabel: string;
  capacitySlots: number;
  constraints: string[];
};

export type ScoutingMissionInput = {
  farmId: string;
  farmName: string;
  missionDateLabel: string;
  startLocationLabel: string;
  operatorName: string;
  cases: ScoutingMissionCaseInput[];
  resources: ScoutingMissionResourceInput[];
  includeMissionRoute: boolean;
  includePhotoShotList: boolean;
  includeSafetyGate: boolean;
  includeResourceAssignments: boolean;
  includeDebriefPacket: boolean;
  includeEscalationTriggers: boolean;
  includeExportPacket: boolean;
  humanReviewRequired: boolean;
};

export type MissionRouteSegment = {
  segmentId: string;
  sequence: number;
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  navigationHint: string;
  priority: ScoutingMissionPriority;
  readiness: ScoutingMissionReadiness;
  estimatedSlotUnits: number;
  requiredShots: string[];
  requiredBeforeStart: string[];
  prohibitedActions: string[];
};

export type MissionPhotoShot = {
  shotId: string;
  caseId: string;
  fieldId: string;
  label: string;
  shotType: "context" | "symptom-close-up" | "comparison" | "follow-up" | "review";
  required: boolean;
  captureGuidance: string;
  qualityGate: string[];
};

export type MissionSafetyGate = {
  gateId: string;
  caseId: string;
  fieldId: string;
  gateStatus: "pass" | "blocked" | "review-required";
  reasons: string[];
  allowedActions: string[];
  prohibitedActions: string[];
};

export type MissionResourceAssignment = {
  assignmentId: string;
  resourceId: string;
  label: string;
  role: ScoutingMissionResourceInput["role"];
  assignedCaseIds: string[];
  assignedSegmentIds: string[];
  estimatedLoadSlots: number;
  capacitySlots: number;
  loadStatus: "within-capacity" | "near-capacity" | "over-capacity";
  constraints: string[];
};

export type MissionDebriefPacket = {
  packetId: string;
  caseId: string;
  fieldName: string;
  requiredNotes: string[];
  uploadChecklist: string[];
  reviewQuestions: string[];
  blockedAutomation: string[];
};

export type MissionEscalationTrigger = {
  triggerId: string;
  caseId: string;
  fieldName: string;
  triggerLevel: "none" | "review" | "urgent-review" | "blocked";
  triggerIf: string[];
  manualResponse: string;
  forbiddenActions: string[];
};

export type MissionExportPacket = {
  exportId: string;
  missionId: string;
  artifactNames: string[];
  redactedOnly: true;
  publicShareAllowed: false;
  dbPersistenceAllowed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
};

export type ScoutingMissionReport = {
  ok: true;
  mode: "scouting-mission-dry-run";
  missionVersion: "agri-ai-scouting-mission-v1";
  missionId: string;
  missionFingerprint: string;
  missionReady: boolean;
  inputSummary: {
    farmId: string;
    farmName: string;
    missionDateLabel: string;
    startLocationLabel: string;
    operatorName: string;
    caseCount: number;
    resourceCount: number;
    fieldCount: number;
    blockedCaseCount: number;
    urgentVisitCount: number;
    totalPhotoNeedCount: number;
    totalEvidenceNeedCount: number;
    humanReviewRequired: true;
  };
  missionRoute: MissionRouteSegment[];
  photoShotList: MissionPhotoShot[];
  safetyGate: MissionSafetyGate[];
  resourceAssignments: MissionResourceAssignment[];
  debriefPackets: MissionDebriefPacket[];
  escalationTriggers: MissionEscalationTrigger[];
  exportPacket: MissionExportPacket;
  missionSummary: {
    missionStatus: "ready-manual" | "review-required" | "blocked" | "observe-only";
    firstCaseId: string;
    firstFieldName: string;
    nextManualAction: string;
    estimatedTotalSlots: number;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    scoutingMissionReady: boolean;
    routeSequencingReady: boolean;
    photoShotListReady: boolean;
    safetyGateReady: boolean;
    resourceAssignmentReady: boolean;
    debriefPacketReady: boolean;
    escalationTriggerReady: boolean;
    exportPacketReady: boolean;
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

export const defaultScoutingMissionInput: ScoutingMissionInput = {
  farmId: "",
  farmName: "",
  missionDateLabel: "",
  startLocationLabel: "",
  operatorName: "",
  cases: [],
  resources: [],
  includeMissionRoute: true,
  includePhotoShotList: true,
  includeSafetyGate: true,
  includeResourceAssignments: true,
  includeDebriefPacket: true,
  includeEscalationTriggers: true,
  includeExportPacket: true,
  humanReviewRequired: true,
};

export function createScoutingMissionFixture(): ScoutingMissionInput {
  return {
    farmId: "farm-mission-ready",
    farmName: "Azienda Demo Nord",
    missionDateLabel: "domani mattina",
    startLocationLabel: "magazzino tecnico",
    operatorName: "Operatore scouting",
    cases: [
      {
        caseId: "mission-case-core",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "settore nord fila quattro",
        priority: "blocked",
        readiness: "blocked",
        commandScore: 94,
        photoNeedCount: 6,
        evidenceNeedCount: 5,
        followUpWindowLabel: "entro T+1 giorno",
        requiredShots: ["contesto", "macro sintomo", "controllo sano", "pagina foglia inferiore"],
        blockers: ["review finale mancante", "foto controllo sano da aggiornare"],
        reviewerNote: "Missione urgente ma bloccata fino a review.",
      },
      {
        caseId: "mission-case-border",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "bordo espansione",
        priority: "urgent-visit",
        readiness: "ready-manual",
        commandScore: 83,
        photoNeedCount: 5,
        evidenceNeedCount: 4,
        followUpWindowLabel: "entro T+2 giorni",
        requiredShots: ["contesto bordo", "progressione", "confronto sano"],
        blockers: [],
        reviewerNote: "Missione manuale pronta, senza automazioni.",
      },
      {
        caseId: "mission-case-control",
        fieldId: "field-south",
        fieldName: "Appezzamento Sud",
        crop: "vite",
        locationHint: "controllo sano",
        priority: "routine",
        readiness: "observe-only",
        commandScore: 35,
        photoNeedCount: 3,
        evidenceNeedCount: 2,
        followUpWindowLabel: "entro T+7 giorni",
        requiredShots: ["contesto", "controllo sano"],
        blockers: ["solo monitoraggio"],
        reviewerNote: "Usare per confronto.",
      },
    ],
    resources: [
      {
        resourceId: "mission-reviewer",
        label: "Revisore agronomico",
        role: "reviewer",
        availableWindowLabel: "oggi pomeriggio",
        capacitySlots: 4,
        constraints: ["review manuale", "no prodotto", "no dosaggio"],
      },
      {
        resourceId: "mission-operator",
        label: "Operatore campo",
        role: "operator",
        availableWindowLabel: "domani mattina",
        capacitySlots: 6,
        constraints: ["raccolta foto", "nessuna esecuzione automatica"],
      },
      {
        resourceId: "mission-doc",
        label: "Documentazione",
        role: "documentation",
        availableWindowLabel: "entro fine giornata",
        capacitySlots: 3,
        constraints: ["export redatto", "audit trail"],
      },
    ],
    includeMissionRoute: true,
    includePhotoShotList: true,
    includeSafetyGate: true,
    includeResourceAssignments: true,
    includeDebriefPacket: true,
    includeEscalationTriggers: true,
    includeExportPacket: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `scouting-mission-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function priorityRank(priority: ScoutingMissionPriority) {
  return {
    routine: 1,
    "priority-review": 2,
    "urgent-visit": 3,
    blocked: 4,
  }[priority];
}

function missionStatusFromCases(cases: ScoutingMissionCaseInput[]): ScoutingMissionReport["missionSummary"]["missionStatus"] {
  if (cases.some((item) => item.priority === "blocked" || item.readiness === "blocked")) {
    return "blocked";
  }

  if (cases.some((item) => item.readiness === "review-required")) {
    return "review-required";
  }

  if (cases.some((item) => item.readiness === "ready-manual")) {
    return "ready-manual";
  }

  return "observe-only";
}

function estimatedSlots(item: ScoutingMissionCaseInput) {
  return Math.max(
    1,
    Math.min(
      8,
      Math.ceil(item.photoNeedCount / 2) +
        Math.ceil(item.evidenceNeedCount / 3) +
        (item.blockers.length > 0 ? 1 : 0),
    ),
  );
}

function createMissionRoute(input: ScoutingMissionInput): MissionRouteSegment[] {
  return [...input.cases]
    .sort((a, b) => {
      const priorityDelta = priorityRank(b.priority) - priorityRank(a.priority);

      if (priorityDelta !== 0) {
        return priorityDelta;
      }

      return b.commandScore - a.commandScore;
    })
    .map((item, index) => ({
      segmentId: `mission-segment-${item.caseId}`,
      sequence: index + 1,
      caseId: item.caseId,
      fieldId: item.fieldId,
      fieldName: item.fieldName,
      crop: item.crop,
      navigationHint: `${item.fieldName} — ${item.locationHint}`,
      priority: item.priority,
      readiness: item.readiness,
      estimatedSlotUnits: estimatedSlots(item),
      requiredShots: normalize(item.requiredShots || []),
      requiredBeforeStart: [
        "review umana se caso bloccato",
        "conferma zona",
        "check qualità foto",
        "nessuna prescrizione prodotto",
        "nessun dosaggio",
      ],
      prohibitedActions: [
        "creazione automatica task",
        "creazione automatica intervento",
        "persistenza automatica",
        "esecuzione automatica",
        "share pubblico automatico",
      ],
    }));
}

function createPhotoShotList(input: ScoutingMissionInput): MissionPhotoShot[] {
  return input.cases.flatMap((item) => {
    const requiredShots = normalize(item.requiredShots || []);

    const mapped = requiredShots.map<MissionPhotoShot>((shot, index) => ({
      shotId: `shot-${item.caseId}-${index + 1}`,
      caseId: item.caseId,
      fieldId: item.fieldId,
      label: shot,
      shotType:
        shot.toLowerCase().includes("macro") || shot.toLowerCase().includes("sintomo")
          ? "symptom-close-up"
          : shot.toLowerCase().includes("controllo")
            ? "comparison"
            : shot.toLowerCase().includes("progressione")
              ? "follow-up"
              : "context",
      required: true,
      captureGuidance: `Acquisire ${shot} per ${item.fieldName}, ${item.locationHint}.`,
      qualityGate: [
        "foto nitida",
        "zona leggibile",
        "scala o contesto presenti",
        "non includere dati personali",
      ],
    }));

    return [
      ...mapped,
      {
        shotId: `shot-${item.caseId}-review-note`,
        caseId: item.caseId,
        fieldId: item.fieldId,
        label: "nota revisore e operatore",
        shotType: "review",
        required: true,
        captureGuidance: "Documentare limiti osservativi, meteo, posizione e discrepanze.",
        qualityGate: ["nota testuale", "limiti documentati", "review umana"],
      },
    ];
  });
}

function createSafetyGate(input: ScoutingMissionInput): MissionSafetyGate[] {
  return input.cases.map((item) => {
    const blockers = normalize(item.blockers || []);
    const gateStatus: MissionSafetyGate["gateStatus"] =
      item.readiness === "blocked" || item.priority === "blocked"
        ? "blocked"
        : item.readiness === "review-required"
          ? "review-required"
          : "pass";

    return {
      gateId: `mission-safety-${item.caseId}`,
      caseId: item.caseId,
      fieldId: item.fieldId,
      gateStatus,
      reasons: [
        `priority=${item.priority}`,
        `readiness=${item.readiness}`,
        `commandScore=${item.commandScore}`,
        `blockers=${blockers.length}`,
      ],
      allowedActions:
        gateStatus === "pass"
          ? ["raccolta foto", "brief manuale", "debrief", "export redatto"]
          : ["raccolta evidenza", "review umana", "note limiti"],
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

function createResourceAssignments(input: ScoutingMissionInput, route: MissionRouteSegment[]): MissionResourceAssignment[] {
  const segmentIds = route.map((item) => item.segmentId);

  return input.resources.map((resource, index) => {
    const assignedSegments = route.filter((_, segmentIndex) => segmentIndex % input.resources.length === index);
    const assignedCaseIds = assignedSegments.map((segment) => segment.caseId);
    const estimatedLoadSlots = assignedSegments.reduce((total, segment) => total + segment.estimatedSlotUnits, 0);
    const loadStatus =
      estimatedLoadSlots > resource.capacitySlots
        ? "over-capacity"
        : estimatedLoadSlots === resource.capacitySlots
          ? "near-capacity"
          : "within-capacity";

    return {
      assignmentId: `mission-assignment-${resource.resourceId}`,
      resourceId: resource.resourceId,
      label: resource.label,
      role: resource.role,
      assignedCaseIds,
      assignedSegmentIds: assignedSegments.length ? assignedSegments.map((segment) => segment.segmentId) : segmentIds.slice(0, 0),
      estimatedLoadSlots,
      capacitySlots: resource.capacitySlots,
      loadStatus,
      constraints: normalize(resource.constraints || []),
    };
  });
}

function createDebriefPackets(input: ScoutingMissionInput): MissionDebriefPacket[] {
  return input.cases.map((item) => ({
    packetId: `debrief-${item.caseId}`,
    caseId: item.caseId,
    fieldName: item.fieldName,
    requiredNotes: [
      "meteo osservato",
      "posizione reale",
      "foto acquisite",
      "foto mancanti",
      "limiti osservativi",
      "stato review",
    ],
    uploadChecklist: [
      "foto contesto",
      "foto dettaglio",
      "foto confronto",
      "nota operatore",
      "nessun dato personale",
    ],
    reviewQuestions: [
      "Il caso può passare a protocollo manuale?",
      "Mancano foto obbligatorie?",
      "Ci sono blocchi di sicurezza?",
      "Serve nuovo follow-up?",
    ],
    blockedAutomation: [
      "automaticTaskCreationAllowed=false",
      "automaticInterventionCreationAllowed=false",
      "automaticExecutionAllowed=false",
      "dbPersistenceAllowed=false",
    ],
  }));
}

function createEscalationTriggers(input: ScoutingMissionInput): MissionEscalationTrigger[] {
  return input.cases.map((item) => ({
    triggerId: `mission-escalation-${item.caseId}`,
    caseId: item.caseId,
    fieldName: item.fieldName,
    triggerLevel:
      item.priority === "blocked"
        ? "blocked"
        : item.priority === "urgent-visit"
          ? "urgent-review"
          : item.priority === "priority-review"
            ? "review"
            : "none",
    triggerIf: [
      "nuove foto peggiorano trend",
      "evidenza insufficiente",
      "review non conclusiva",
      "zona non confermata",
    ],
    manualResponse:
      item.priority === "blocked"
        ? "bloccare missione operativa e richiedere review"
        : "aggiornare debrief e inviare a revisione umana",
    forbiddenActions: ["prodotto", "dosaggio", "intervento automatico", "task automatico", "persistenza automatica"],
  }));
}

function createExportPacket(input: ScoutingMissionInput, missionId: string): MissionExportPacket {
  return {
    exportId: `mission-export-${missionId}`,
    missionId,
    artifactNames: [
      "mission-summary.txt",
      "mission-route.json",
      "photo-shot-list.json",
      "safety-gate.json",
      "debrief-packet.json",
      "compliance-snapshot.json",
    ],
    redactedOnly: true,
    publicShareAllowed: false,
    dbPersistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
  };
}

export function createScoutingMissionReport(
  input: ScoutingMissionInput = defaultScoutingMissionInput,
): ScoutingMissionReport {
  const cases = input.cases.map((item) => ({
    ...item,
    requiredShots: normalize(item.requiredShots || []),
    blockers: normalize(item.blockers || []),
  }));
  const resources = input.resources.map((item) => ({
    ...item,
    constraints: normalize(item.constraints || []),
  }));
  const missionInput = { ...input, cases, resources };
  const missionId = `scouting-mission-${input.farmId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const missionRoute = input.includeMissionRoute ? createMissionRoute(missionInput) : [];
  const photoShotList = input.includePhotoShotList ? createPhotoShotList(missionInput) : [];
  const safetyGate = input.includeSafetyGate ? createSafetyGate(missionInput) : [];
  const resourceAssignments = input.includeResourceAssignments ? createResourceAssignments(missionInput, missionRoute) : [];
  const debriefPackets = input.includeDebriefPacket ? createDebriefPackets(missionInput) : [];
  const escalationTriggers = input.includeEscalationTriggers ? createEscalationTriggers(missionInput) : [];
  const exportPacket = createExportPacket(missionInput, missionId);
  const fieldCount = new Set(cases.map((item) => item.fieldId)).size;
  const blockedCaseCount = cases.filter((item) => item.priority === "blocked" || item.readiness === "blocked").length;
  const urgentVisitCount = cases.filter((item) => item.priority === "urgent-visit").length;
  const totalPhotoNeedCount = cases.reduce((total, item) => total + item.photoNeedCount, 0);
  const totalEvidenceNeedCount = cases.reduce((total, item) => total + item.evidenceNeedCount, 0);
  const missionReady = Boolean(
    input.farmId.trim() &&
      input.farmName.trim() &&
      input.missionDateLabel.trim() &&
      input.startLocationLabel.trim() &&
      input.operatorName.trim() &&
      input.humanReviewRequired &&
      cases.length >= 1 &&
      resources.length >= 1,
  );
  const missionFingerprint = fingerprint(
    [
      missionId,
      input.farmName,
      input.missionDateLabel,
      input.startLocationLabel,
      input.operatorName,
      cases.map((item) => `${item.caseId}:${item.fieldId}:${item.priority}:${item.readiness}:${item.commandScore}`).join("|"),
      resources.map((item) => `${item.resourceId}:${item.role}:${item.capacitySlots}`).join("|"),
      String(missionReady),
    ].join("|"),
  );
  const sortedCases = [...cases].sort((a, b) => {
    const priorityDelta = priorityRank(b.priority) - priorityRank(a.priority);

    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    return b.commandScore - a.commandScore;
  });
  const first = sortedCases[0];
  const estimatedTotalSlots = missionRoute.reduce((total, segment) => total + segment.estimatedSlotUnits, 0);
  const missionStatus = missionStatusFromCases(cases);
  const confidenceScore = Number(
    Math.min(
      0.95,
      0.33 +
        Math.min(cases.length, 20) * 0.025 +
        Math.min(resources.length, 10) * 0.025 +
        Math.min(totalPhotoNeedCount, 40) * 0.008 +
        Math.min(totalEvidenceNeedCount, 40) * 0.01,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "scouting-mission-dry-run",
    missionVersion: "agri-ai-scouting-mission-v1",
    missionId,
    missionFingerprint,
    missionReady,
    inputSummary: {
      farmId: input.farmId.trim(),
      farmName: input.farmName.trim(),
      missionDateLabel: input.missionDateLabel.trim(),
      startLocationLabel: input.startLocationLabel.trim(),
      operatorName: input.operatorName.trim(),
      caseCount: cases.length,
      resourceCount: resources.length,
      fieldCount,
      blockedCaseCount,
      urgentVisitCount,
      totalPhotoNeedCount,
      totalEvidenceNeedCount,
      humanReviewRequired: true,
    },
    missionRoute,
    photoShotList,
    safetyGate,
    resourceAssignments,
    debriefPackets,
    escalationTriggers,
    exportPacket,
    missionSummary: {
      missionStatus,
      firstCaseId: first?.caseId || "",
      firstFieldName: first?.fieldName || "",
      nextManualAction:
        missionStatus === "blocked"
          ? "risolvere blocchi prima della missione operativa"
          : missionStatus === "ready-manual"
            ? "assegnare missione manuale e shot list"
            : missionStatus === "review-required"
              ? "richiedere review prima di partire"
              : "monitorare casi routine",
      estimatedTotalSlots,
      confidenceScore,
      reasons: [
        `caseCount=${cases.length}`,
        `resourceCount=${resources.length}`,
        `fieldCount=${fieldCount}`,
        `blockedCaseCount=${blockedCaseCount}`,
        `urgentVisitCount=${urgentVisitCount}`,
        `totalPhotoNeedCount=${totalPhotoNeedCount}`,
        `totalEvidenceNeedCount=${totalEvidenceNeedCount}`,
      ],
      blockingLimitations: [
        "nessuna chiamata provider AI live",
        "missione locale non autorizza esecuzione",
        "nessuna persistenza DB",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
        "human review obbligatoria",
      ],
    },
    premiumSignals: {
      scoutingMissionReady: missionReady,
      routeSequencingReady: missionRoute.length > 0,
      photoShotListReady: photoShotList.length > 0,
      safetyGateReady: safetyGate.length > 0,
      resourceAssignmentReady: resourceAssignments.length > 0,
      debriefPacketReady: debriefPackets.length > 0,
      escalationTriggerReady: escalationTriggers.length > 0,
      exportPacketReady: input.includeExportPacket,
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

export function createReadyScoutingMissionReport() {
  return createScoutingMissionReport(createScoutingMissionFixture());
}

export function createBlockedScoutingMissionReport() {
  return createScoutingMissionReport(defaultScoutingMissionInput);
}

export function formatScoutingMissionReport(report: ScoutingMissionReport) {
  return [
    "AI Scouting Mission Planner & Field Crew Route Sequencer",
    "",
    `Mission ID: ${report.missionId}`,
    `Mission fingerprint: ${report.missionFingerprint}`,
    `Version: ${report.missionVersion}`,
    `Mode: ${report.mode}`,
    `missionReady=${report.missionReady}`,
    "",
    "Input summary:",
    `- farmId=${report.inputSummary.farmId || "missing"}`,
    `- farmName=${report.inputSummary.farmName || "missing"}`,
    `- missionDateLabel=${report.inputSummary.missionDateLabel || "missing"}`,
    `- startLocationLabel=${report.inputSummary.startLocationLabel || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- caseCount=${report.inputSummary.caseCount}`,
    `- resourceCount=${report.inputSummary.resourceCount}`,
    `- fieldCount=${report.inputSummary.fieldCount}`,
    `- blockedCaseCount=${report.inputSummary.blockedCaseCount}`,
    `- urgentVisitCount=${report.inputSummary.urgentVisitCount}`,
    `- totalPhotoNeedCount=${report.inputSummary.totalPhotoNeedCount}`,
    `- totalEvidenceNeedCount=${report.inputSummary.totalEvidenceNeedCount}`,
    "- humanReviewRequired=true",
    "",
    "Mission summary:",
    `- missionStatus=${report.missionSummary.missionStatus}`,
    `- firstCaseId=${report.missionSummary.firstCaseId || "none"}`,
    `- firstFieldName=${report.missionSummary.firstFieldName || "none"}`,
    `- nextManualAction=${report.missionSummary.nextManualAction}`,
    `- estimatedTotalSlots=${report.missionSummary.estimatedTotalSlots}`,
    `- confidenceScore=${report.missionSummary.confidenceScore}`,
    ...report.missionSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Mission route:",
    ...report.missionRoute.map(
      (item) =>
        `- ${item.sequence}. ${item.caseId} | field=${item.fieldName} | priority=${item.priority} | readiness=${item.readiness}`,
    ),
    "",
    "Photo shot list:",
    ...report.photoShotList.map(
      (item) => `- ${item.shotId} | type=${item.shotType} | required=${item.required} | label=${item.label}`,
    ),
    "",
    "Safety gate:",
    ...report.safetyGate.map(
      (item) => `- ${item.gateId} | status=${item.gateStatus} | reasons=${item.reasons.join(", ")}`,
    ),
    "",
    "Resource assignments:",
    ...report.resourceAssignments.map(
      (item) =>
        `- ${item.resourceId} | assigned=${item.assignedCaseIds.join(", ") || "none"} | load=${item.estimatedLoadSlots}/${item.capacitySlots} | status=${item.loadStatus}`,
    ),
    "",
    "Debrief packets:",
    ...report.debriefPackets.map(
      (item) => `- ${item.packetId} | case=${item.caseId} | notes=${item.requiredNotes.length}`,
    ),
    "",
    "Escalation triggers:",
    ...report.escalationTriggers.map(
      (item) => `- ${item.triggerId} | level=${item.triggerLevel} | response=${item.manualResponse}`,
    ),
    "",
    "Export packet:",
    `- exportId=${report.exportPacket.exportId}`,
    `- artifactNames=${report.exportPacket.artifactNames.join(", ")}`,
    "- redactedOnly=true",
    "- publicShareAllowed=false",
    "- dbPersistenceAllowed=false",
    "",
    "Premium signals:",
    `- scoutingMissionReady=${report.premiumSignals.scoutingMissionReady}`,
    `- routeSequencingReady=${report.premiumSignals.routeSequencingReady}`,
    `- photoShotListReady=${report.premiumSignals.photoShotListReady}`,
    `- safetyGateReady=${report.premiumSignals.safetyGateReady}`,
    `- resourceAssignmentReady=${report.premiumSignals.resourceAssignmentReady}`,
    `- debriefPacketReady=${report.premiumSignals.debriefPacketReady}`,
    `- escalationTriggerReady=${report.premiumSignals.escalationTriggerReady}`,
    `- exportPacketReady=${report.premiumSignals.exportPacketReady}`,
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
