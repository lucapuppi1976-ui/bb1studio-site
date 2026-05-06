export type InterventionPriorityTier = "observe" | "prepare-review" | "manual-review-required" | "blocked-until-review";

export type InterventionReadinessZoneInput = {
  zoneId: string;
  label: string;
  priorityTier: InterventionPriorityTier;
  priorityScore: number;
  followUpWindowLabel: string;
  reviewerDecision: "not-reviewed" | "approve-with-caution" | "needs-more-evidence" | "reject-insufficient-evidence";
  evidenceCount: number;
  photoCount: number;
  requiredChecksCompleted: string[];
  missingChecks: string[];
  operatorNote: string;
};

export type InterventionReadinessInput = {
  caseId: string;
  operatorName: string;
  crop: string;
  fieldName: string;
  locationHint: string;
  followUpSchedulerFingerprint: string;
  fieldMapFingerprint: string;
  temporalTrendFingerprint: string;
  scoutingPlanFingerprint: string;
  zones: InterventionReadinessZoneInput[];
  includeReadinessMatrix: boolean;
  includeApprovalBoard: boolean;
  includeDecisionGates: boolean;
  includeManualConversionPacket: boolean;
  includeMaterialChecklist: boolean;
  includeBlockerSummary: boolean;
  humanReviewRequired: boolean;
};

export type ReadinessDecisionGate = {
  gateId: string;
  zoneId: string;
  label: string;
  gateStatus: "pass" | "blocked" | "needs-review";
  gateReason: string;
  requiredEvidence: string[];
  prohibitedAutomation: string[];
};

export type InterventionReadinessMatrixRow = {
  rowId: string;
  zoneId: string;
  label: string;
  priorityTier: InterventionPriorityTier;
  readinessScore: number;
  conversionReadiness: "not-ready" | "draft-only" | "manual-review-ready" | "blocked";
  reviewerDecision: string;
  evidenceCount: number;
  photoCount: number;
  completedCheckCount: number;
  missingCheckCount: number;
  followUpWindowLabel: string;
  blockingReasons: string[];
};

export type ApprovalBoardItem = {
  approvalId: string;
  zoneId: string;
  label: string;
  priorityTier: InterventionPriorityTier;
  requiredDecision: "request-evidence" | "approve-manual-draft" | "hold-and-review" | "reject";
  reviewerQuestions: string[];
  allowedOutput: string[];
  prohibitedOutput: string[];
};

export type ManualConversionPacket = {
  packetId: string;
  zoneId: string;
  label: string;
  manualTaskTitle: string;
  manualTaskDescription: string;
  manualInterventionNote: string;
  conversionAllowed: false;
  requiredBeforeConversion: string[];
  auditTrail: string[];
};

export type MaterialChecklistItem = {
  checklistId: string;
  zoneId: string;
  label: string;
  requiredMaterial: string[];
  requiredPhotos: string[];
  safetyChecks: string[];
  reviewerNotes: string[];
};

export type InterventionBlockerSummary = {
  blockerId: string;
  zoneId: string;
  label: string;
  blockers: string[];
  resolutionPath: string[];
};

export type InterventionReadinessReport = {
  ok: true;
  mode: "intervention-readiness-dry-run";
  readinessVersion: "agri-ai-intervention-readiness-v1";
  readinessId: string;
  readinessFingerprint: string;
  readinessReady: boolean;
  inputSummary: {
    caseId: string;
    operatorName: string;
    crop: string;
    fieldName: string;
    locationHint: string;
    zoneCount: number;
    blockedZoneCount: number;
    manualReviewZoneCount: number;
    totalPhotoCount: number;
    totalEvidenceCount: number;
    humanReviewRequired: true;
  };
  readinessMatrix: InterventionReadinessMatrixRow[];
  approvalBoard: ApprovalBoardItem[];
  decisionGates: ReadinessDecisionGate[];
  manualConversionPackets: ManualConversionPacket[];
  materialChecklist: MaterialChecklistItem[];
  blockerSummary: InterventionBlockerSummary[];
  readinessSummary: {
    dominantPriorityTier: InterventionPriorityTier;
    manualReviewReadyCount: number;
    blockedCount: number;
    draftOnlyCount: number;
    nextReviewerAction: string;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    interventionReadinessReady: boolean;
    approvalBoardReady: boolean;
    decisionGatesReady: boolean;
    manualConversionPacketReady: boolean;
    materialChecklistReady: boolean;
    blockerSummaryReady: boolean;
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
    humanReviewRequired: true;
    manualConversionOnly: true;
    localAnalysisOnly: true;
    redactedOutputOnly: true;
  };
};

export const defaultInterventionReadinessInput: InterventionReadinessInput = {
  caseId: "",
  operatorName: "",
  crop: "",
  fieldName: "",
  locationHint: "",
  followUpSchedulerFingerprint: "",
  fieldMapFingerprint: "",
  temporalTrendFingerprint: "",
  scoutingPlanFingerprint: "",
  zones: [],
  includeReadinessMatrix: true,
  includeApprovalBoard: true,
  includeDecisionGates: true,
  includeManualConversionPacket: true,
  includeMaterialChecklist: true,
  includeBlockerSummary: true,
  humanReviewRequired: true,
};

export function createInterventionReadinessFixture(): InterventionReadinessInput {
  return {
    caseId: "intervention-readiness-case-ready",
    operatorName: "Operatore campo",
    crop: "olivo",
    fieldName: "appezzamento nord",
    locationHint: "settore nord — fila 4",
    followUpSchedulerFingerprint: "followup-scheduler-ready-fingerprint",
    fieldMapFingerprint: "fieldmap-ready-fingerprint",
    temporalTrendFingerprint: "temporal-trend-ready-fingerprint",
    scoutingPlanFingerprint: "field-scouting-ready-fingerprint",
    zones: [
      {
        zoneId: "zone-core",
        label: "Zona core sintomatica",
        priorityTier: "blocked-until-review",
        priorityScore: 91,
        followUpWindowLabel: "entro T+1 giorno",
        reviewerDecision: "needs-more-evidence",
        evidenceCount: 8,
        photoCount: 5,
        requiredChecksCompleted: ["foto contesto", "foto pianta intera", "macro sintomo"],
        missingChecks: ["controllo sano aggiornato", "review agronomica finale"],
        operatorNote: "Zona critica: conversione bloccata fino a review.",
      },
      {
        zoneId: "zone-border",
        label: "Bordo espansione",
        priorityTier: "manual-review-required",
        priorityScore: 72,
        followUpWindowLabel: "entro T+2 giorni",
        reviewerDecision: "approve-with-caution",
        evidenceCount: 5,
        photoCount: 4,
        requiredChecksCompleted: ["foto bordo", "foto contesto", "nota operatore"],
        missingChecks: ["conferma confronto sano"],
        operatorNote: "Possibile bozza manuale, non convertire automaticamente.",
      },
      {
        zoneId: "zone-control",
        label: "Controllo sano",
        priorityTier: "observe",
        priorityScore: 24,
        followUpWindowLabel: "entro T+7 giorni",
        reviewerDecision: "not-reviewed",
        evidenceCount: 2,
        photoCount: 3,
        requiredChecksCompleted: ["foto controllo sano"],
        missingChecks: ["nessuna review richiesta immediata"],
        operatorNote: "Solo confronto.",
      },
    ],
    includeReadinessMatrix: true,
    includeApprovalBoard: true,
    includeDecisionGates: true,
    includeManualConversionPacket: true,
    includeMaterialChecklist: true,
    includeBlockerSummary: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `intervention-readiness-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function conversionReadiness(
  zone: InterventionReadinessZoneInput,
): InterventionReadinessMatrixRow["conversionReadiness"] {
  if (zone.priorityTier === "blocked-until-review") return "blocked";
  if (zone.reviewerDecision === "reject-insufficient-evidence") return "blocked";
  if (zone.reviewerDecision === "needs-more-evidence") return "not-ready";
  if (zone.reviewerDecision === "approve-with-caution" && zone.missingChecks.length <= 1) {
    return "manual-review-ready";
  }
  if (zone.evidenceCount >= 3 && zone.photoCount >= 3) return "draft-only";
  return "not-ready";
}

function dominantPriority(zones: InterventionReadinessZoneInput[]): InterventionPriorityTier {
  const rank: Record<InterventionPriorityTier, number> = {
    observe: 1,
    "prepare-review": 2,
    "manual-review-required": 3,
    "blocked-until-review": 4,
  };

  return zones.reduce<InterventionPriorityTier>(
    (current, zone) => (rank[zone.priorityTier] > rank[current] ? zone.priorityTier : current),
    "observe",
  );
}

function createReadinessMatrix(input: InterventionReadinessInput): InterventionReadinessMatrixRow[] {
  return input.zones.map((zone) => {
    const completed = normalize(zone.requiredChecksCompleted || []);
    const missing = normalize(zone.missingChecks || []);
    const score = clamp(
      zone.priorityScore +
        completed.length * 5 -
        missing.length * 10 +
        zone.evidenceCount * 2 +
        zone.photoCount * 2,
      0,
      100,
    );
    const readiness = conversionReadiness({
      ...zone,
      requiredChecksCompleted: completed,
      missingChecks: missing,
    });
    const blockingReasons = [
      ...missing.map((item) => `missing=${item}`),
      zone.reviewerDecision === "not-reviewed" ? "reviewerDecision=not-reviewed" : "",
      zone.priorityTier === "blocked-until-review" ? "priorityTier=blocked-until-review" : "",
      "automatic-conversion-disabled",
    ].filter(Boolean);

    return {
      rowId: `readiness-row-${zone.zoneId}`,
      zoneId: zone.zoneId,
      label: zone.label,
      priorityTier: zone.priorityTier,
      readinessScore: score,
      conversionReadiness: readiness,
      reviewerDecision: zone.reviewerDecision,
      evidenceCount: zone.evidenceCount,
      photoCount: zone.photoCount,
      completedCheckCount: completed.length,
      missingCheckCount: missing.length,
      followUpWindowLabel: zone.followUpWindowLabel,
      blockingReasons,
    };
  });
}

function createDecisionGates(rows: InterventionReadinessMatrixRow[]): ReadinessDecisionGate[] {
  return rows.flatMap((row) => [
    {
      gateId: `gate-evidence-${row.zoneId}`,
      zoneId: row.zoneId,
      label: `Evidence gate — ${row.label}`,
      gateStatus: row.evidenceCount >= 3 && row.photoCount >= 3 ? "pass" : "blocked",
      gateReason: `evidenceCount=${row.evidenceCount}, photoCount=${row.photoCount}`,
      requiredEvidence: ["foto contesto", "foto dettaglio", "controllo sano", "nota operatore"],
      prohibitedAutomation: ["creazione task automatica", "creazione intervento automatica", "esecuzione automatica"],
    },
    {
      gateId: `gate-review-${row.zoneId}`,
      zoneId: row.zoneId,
      label: `Human review gate — ${row.label}`,
      gateStatus:
        row.reviewerDecision === "approve-with-caution"
          ? "needs-review"
          : row.reviewerDecision === "not-reviewed"
            ? "blocked"
            : "needs-review",
      gateReason: `reviewerDecision=${row.reviewerDecision}`,
      requiredEvidence: ["decisione revisore", "check qualità", "check limiti"],
      prohibitedAutomation: ["conversione automatica", "persistenza automatica", "prescrizione prodotto"],
    },
  ]);
}

function createApprovalBoard(rows: InterventionReadinessMatrixRow[]): ApprovalBoardItem[] {
  return rows.map((row) => ({
    approvalId: `approval-${row.zoneId}`,
    zoneId: row.zoneId,
    label: `Approval board — ${row.label}`,
    priorityTier: row.priorityTier,
    requiredDecision:
      row.conversionReadiness === "blocked"
        ? "hold-and-review"
        : row.conversionReadiness === "manual-review-ready"
          ? "approve-manual-draft"
          : row.conversionReadiness === "not-ready"
            ? "request-evidence"
            : "request-evidence",
    reviewerQuestions: [
      "Le foto sono sufficienti?",
      "Il controllo sano è comparabile?",
      "Il follow-up è coerente con la finestra?",
      "La bozza può restare solo manuale?",
      "Ci sono limiti o incertezze da evidenziare?",
    ],
    allowedOutput: ["bozza manuale", "review packet", "checklist operatore", "note revisore"],
    prohibitedOutput: [
      "task automatico",
      "intervento automatico",
      "esecuzione automatica",
      "prodotto",
      "dosaggio",
    ],
  }));
}

function createManualConversionPackets(rows: InterventionReadinessMatrixRow[]): ManualConversionPacket[] {
  return rows.map((row) => ({
    packetId: `manual-conversion-packet-${row.zoneId}`,
    zoneId: row.zoneId,
    label: `Manual conversion packet — ${row.label}`,
    manualTaskTitle: `Bozza follow-up manuale — ${row.label}`,
    manualTaskDescription:
      `Bozza generata localmente per ${row.label}. Conversione non consentita automaticamente. ` +
      `Readiness=${row.conversionReadiness}.`,
    manualInterventionNote:
      "Intervento non creato. Usare solo come traccia per revisione umana e compilazione manuale.",
    conversionAllowed: false,
    requiredBeforeConversion: [
      "review umana conclusa",
      "evidenza minima completa",
      "controllo sano presente",
      "limiti documentati",
      "nessuna prescrizione prodotto",
      "nessun dosaggio",
    ],
    auditTrail: [
      `readinessScore=${row.readinessScore}`,
      `conversionReadiness=${row.conversionReadiness}`,
      `reviewerDecision=${row.reviewerDecision}`,
      "automaticTaskCreationAllowed=false",
      "automaticInterventionCreationAllowed=false",
    ],
  }));
}

function createMaterialChecklist(rows: InterventionReadinessMatrixRow[]): MaterialChecklistItem[] {
  return rows.map((row) => ({
    checklistId: `material-checklist-${row.zoneId}`,
    zoneId: row.zoneId,
    label: `Material checklist — ${row.label}`,
    requiredMaterial: ["telefono/camera", "riferimento zona/fila", "scheda note", "guanti se necessari"],
    requiredPhotos: ["contesto", "pianta intera", "dettaglio sintomo", "pagina inferiore", "controllo sano"],
    safetyChecks: [
      "non indicare prodotto",
      "non indicare dosaggio",
      "non trasformare in intervento automatico",
      "non salvare in DB automaticamente",
    ],
    reviewerNotes: row.blockingReasons,
  }));
}

function createBlockerSummary(rows: InterventionReadinessMatrixRow[]): InterventionBlockerSummary[] {
  return rows.map((row) => ({
    blockerId: `blocker-summary-${row.zoneId}`,
    zoneId: row.zoneId,
    label: `Blocker summary — ${row.label}`,
    blockers: row.blockingReasons.length ? row.blockingReasons : ["nessun blocco operativo oltre review obbligatoria"],
    resolutionPath: [
      "completare foto minime",
      "ottenere decisione revisore",
      "mantenere conversione manuale",
      "non attivare automazioni",
    ],
  }));
}

export function createInterventionReadinessReport(
  input: InterventionReadinessInput = defaultInterventionReadinessInput,
): InterventionReadinessReport {
  const zones = input.zones.map((zone) => ({
    ...zone,
    requiredChecksCompleted: normalize(zone.requiredChecksCompleted || []),
    missingChecks: normalize(zone.missingChecks || []),
  }));
  const matrix = input.includeReadinessMatrix
    ? createReadinessMatrix({
        ...input,
        zones,
      })
    : [];
  const decisionGates = input.includeDecisionGates ? createDecisionGates(matrix) : [];
  const approvalBoard = input.includeApprovalBoard ? createApprovalBoard(matrix) : [];
  const manualConversionPackets = input.includeManualConversionPacket ? createManualConversionPackets(matrix) : [];
  const materialChecklist = input.includeMaterialChecklist ? createMaterialChecklist(matrix) : [];
  const blockerSummary = input.includeBlockerSummary ? createBlockerSummary(matrix) : [];
  const totalPhotoCount = zones.reduce((total, zone) => total + zone.photoCount, 0);
  const totalEvidenceCount = zones.reduce((total, zone) => total + zone.evidenceCount, 0);
  const blockedZoneCount = matrix.filter((row) => row.conversionReadiness === "blocked").length;
  const manualReviewReadyCount = matrix.filter((row) => row.conversionReadiness === "manual-review-ready").length;
  const draftOnlyCount = matrix.filter((row) => row.conversionReadiness === "draft-only").length;
  const manualReviewZoneCount = zones.filter(
    (zone) => zone.priorityTier === "manual-review-required" || zone.priorityTier === "blocked-until-review",
  ).length;
  const readinessReady = Boolean(
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
  const readinessId = `intervention-readiness-${input.caseId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const readinessFingerprint = fingerprint(
    [
      readinessId,
      input.operatorName,
      input.crop,
      input.fieldName,
      input.locationHint,
      input.followUpSchedulerFingerprint,
      input.fieldMapFingerprint,
      input.temporalTrendFingerprint,
      input.scoutingPlanFingerprint,
      zones.map((zone) => `${zone.zoneId}:${zone.priorityTier}:${zone.priorityScore}:${zone.reviewerDecision}`).join("|"),
      String(readinessReady),
    ].join("|"),
  );
  const confidenceScore = Number(
    Math.min(
      0.94,
      0.3 +
        Math.min(zones.length, 8) * 0.05 +
        Math.min(totalEvidenceCount, 20) * 0.018 +
        Math.min(totalPhotoCount, 20) * 0.012,
    ).toFixed(2),
  );
  const dominant = dominantPriority(zones);

  return {
    ok: true,
    mode: "intervention-readiness-dry-run",
    readinessVersion: "agri-ai-intervention-readiness-v1",
    readinessId,
    readinessFingerprint,
    readinessReady,
    inputSummary: {
      caseId: input.caseId.trim(),
      operatorName: input.operatorName.trim(),
      crop: input.crop.trim(),
      fieldName: input.fieldName.trim(),
      locationHint: input.locationHint.trim(),
      zoneCount: zones.length,
      blockedZoneCount,
      manualReviewZoneCount,
      totalPhotoCount,
      totalEvidenceCount,
      humanReviewRequired: true,
    },
    readinessMatrix: matrix,
    approvalBoard,
    decisionGates,
    manualConversionPackets,
    materialChecklist,
    blockerSummary,
    readinessSummary: {
      dominantPriorityTier: dominant,
      manualReviewReadyCount,
      blockedCount: blockedZoneCount,
      draftOnlyCount,
      nextReviewerAction:
        blockedZoneCount > 0
          ? "risolvere blocchi prima di qualunque conversione manuale"
          : manualReviewReadyCount > 0
            ? "valutare bozza manuale con cautela"
            : "richiedere nuova evidenza",
      confidenceScore,
      reasons: [
        `zoneCount=${zones.length}`,
        `blockedZoneCount=${blockedZoneCount}`,
        `manualReviewReadyCount=${manualReviewReadyCount}`,
        `draftOnlyCount=${draftOnlyCount}`,
        `totalPhotoCount=${totalPhotoCount}`,
        `totalEvidenceCount=${totalEvidenceCount}`,
      ],
      blockingLimitations: [
        "nessuna chiamata provider AI live",
        "readiness locale non è autorizzazione operativa",
        "nessuna persistenza DB",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
        "human review obbligatoria",
      ],
    },
    premiumSignals: {
      interventionReadinessReady: readinessReady,
      approvalBoardReady: approvalBoard.length > 0,
      decisionGatesReady: decisionGates.length > 0,
      manualConversionPacketReady: manualConversionPackets.length > 0,
      materialChecklistReady: materialChecklist.length > 0,
      blockerSummaryReady: blockerSummary.length > 0,
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
      humanReviewRequired: true,
      manualConversionOnly: true,
      localAnalysisOnly: true,
      redactedOutputOnly: true,
    },
  };
}

export function createReadyInterventionReadinessReport() {
  return createInterventionReadinessReport(createInterventionReadinessFixture());
}

export function createBlockedInterventionReadinessReport() {
  return createInterventionReadinessReport(defaultInterventionReadinessInput);
}

export function formatInterventionReadinessReport(report: InterventionReadinessReport) {
  return [
    "AI Intervention Readiness Matrix & Manual Approval Board",
    "",
    `Readiness ID: ${report.readinessId}`,
    `Readiness fingerprint: ${report.readinessFingerprint}`,
    `Version: ${report.readinessVersion}`,
    `Mode: ${report.mode}`,
    `readinessReady=${report.readinessReady}`,
    "",
    "Input summary:",
    `- caseId=${report.inputSummary.caseId || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- crop=${report.inputSummary.crop || "missing"}`,
    `- fieldName=${report.inputSummary.fieldName || "missing"}`,
    `- locationHint=${report.inputSummary.locationHint || "missing"}`,
    `- zoneCount=${report.inputSummary.zoneCount}`,
    `- blockedZoneCount=${report.inputSummary.blockedZoneCount}`,
    `- manualReviewZoneCount=${report.inputSummary.manualReviewZoneCount}`,
    `- totalPhotoCount=${report.inputSummary.totalPhotoCount}`,
    `- totalEvidenceCount=${report.inputSummary.totalEvidenceCount}`,
    "- humanReviewRequired=true",
    "",
    "Readiness summary:",
    `- dominantPriorityTier=${report.readinessSummary.dominantPriorityTier}`,
    `- manualReviewReadyCount=${report.readinessSummary.manualReviewReadyCount}`,
    `- blockedCount=${report.readinessSummary.blockedCount}`,
    `- draftOnlyCount=${report.readinessSummary.draftOnlyCount}`,
    `- nextReviewerAction=${report.readinessSummary.nextReviewerAction}`,
    `- confidenceScore=${report.readinessSummary.confidenceScore}`,
    ...report.readinessSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Readiness matrix:",
    ...report.readinessMatrix.map(
      (row) =>
        `- ${row.zoneId} | score=${row.readinessScore} | priority=${row.priorityTier} | conversion=${row.conversionReadiness} | reviewerDecision=${row.reviewerDecision}`,
    ),
    "",
    "Approval board:",
    ...report.approvalBoard.map(
      (item) => `- ${item.approvalId} | requiredDecision=${item.requiredDecision} | priority=${item.priorityTier}`,
    ),
    "",
    "Decision gates:",
    ...report.decisionGates.map(
      (gate) => `- ${gate.gateId} | status=${gate.gateStatus} | reason=${gate.gateReason}`,
    ),
    "",
    "Manual conversion packets:",
    ...report.manualConversionPackets.map(
      (packet) => `- ${packet.packetId} | title=${packet.manualTaskTitle} | conversionAllowed=false`,
    ),
    "",
    "Material checklist:",
    ...report.materialChecklist.map(
      (item) => `- ${item.checklistId} | material=${item.requiredMaterial.join(", ")} | photos=${item.requiredPhotos.join(", ")}`,
    ),
    "",
    "Blocker summary:",
    ...report.blockerSummary.map(
      (item) => `- ${item.blockerId} | blockers=${item.blockers.join(", ")}`,
    ),
    "",
    "Premium signals:",
    `- interventionReadinessReady=${report.premiumSignals.interventionReadinessReady}`,
    `- approvalBoardReady=${report.premiumSignals.approvalBoardReady}`,
    `- decisionGatesReady=${report.premiumSignals.decisionGatesReady}`,
    `- manualConversionPacketReady=${report.premiumSignals.manualConversionPacketReady}`,
    `- materialChecklistReady=${report.premiumSignals.materialChecklistReady}`,
    `- blockerSummaryReady=${report.premiumSignals.blockerSummaryReady}`,
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
    "- humanReviewRequired=true",
    "- manualConversionOnly=true",
    "- localAnalysisOnly=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
