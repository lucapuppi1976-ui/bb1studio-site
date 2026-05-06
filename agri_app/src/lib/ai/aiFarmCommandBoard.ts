export type FarmCasePriority = "observe" | "review-soon" | "manual-protocol" | "blocked-critical";
export type FarmCaseStatus = "new" | "reviewing" | "manual-ready" | "blocked";

export type FarmCommandCaseInput = {
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  locationHint: string;
  priority: FarmCasePriority;
  status: FarmCaseStatus;
  readinessScore: number;
  protocolFingerprint: string;
  interventionReadinessFingerprint: string;
  temporalTrendFingerprint: string;
  fieldMapFingerprint: string;
  followUpWindowLabel: string;
  evidenceCount: number;
  photoCount: number;
  openBlockers: string[];
  reviewerNote: string;
};

export type FarmCommandResourceInput = {
  resourceId: string;
  label: string;
  resourceType: "operator" | "reviewer" | "field-visit" | "documentation";
  availableWindowLabel: string;
  capacityUnits: number;
  constraints: string[];
};

export type FarmCommandBoardInput = {
  farmId: string;
  farmName: string;
  commandWindowLabel: string;
  operatorName: string;
  cases: FarmCommandCaseInput[];
  resources: FarmCommandResourceInput[];
  includeCasePriorityQueue: boolean;
  includeCrossFieldOverview: boolean;
  includeOperationalWindows: boolean;
  includeResourceLoadPlan: boolean;
  includeEscalationBoard: boolean;
  includeExecutiveSummary: boolean;
  includeComplianceSnapshot: boolean;
  humanReviewRequired: boolean;
};

export type FarmCasePriorityQueueItem = {
  queueId: string;
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  priority: FarmCasePriority;
  status: FarmCaseStatus;
  commandScore: number;
  recommendedManualAction: string;
  blockers: string[];
  requiredReview: string[];
  prohibitedAutomation: string[];
};

export type FarmFieldOverview = {
  fieldId: string;
  fieldName: string;
  crop: string;
  caseCount: number;
  blockedCaseCount: number;
  manualReadyCaseCount: number;
  totalEvidenceCount: number;
  totalPhotoCount: number;
  dominantPriority: FarmCasePriority;
  fieldCommandStatus: "stable" | "watch" | "manual-review" | "blocked";
};

export type FarmOperationalWindow = {
  windowId: string;
  caseId: string;
  fieldId: string;
  label: string;
  windowType: "follow-up" | "review" | "field-visit" | "documentation";
  owner: "operator" | "reviewer" | "admin";
  readiness: "ready-manual" | "blocked" | "watch";
  requiredBeforeStart: string[];
};

export type FarmResourceLoadItem = {
  loadId: string;
  resourceId: string;
  label: string;
  resourceType: FarmCommandResourceInput["resourceType"];
  assignedCaseIds: string[];
  estimatedLoadUnits: number;
  capacityUnits: number;
  loadStatus: "within-capacity" | "near-capacity" | "over-capacity";
  constraints: string[];
};

export type FarmEscalationItem = {
  escalationId: string;
  caseId: string;
  fieldName: string;
  escalationLevel: "none" | "review" | "urgent-review" | "blocked-critical";
  reason: string;
  requiredHumanDecision: string;
  forbiddenActions: string[];
};

export type FarmComplianceSnapshot = {
  snapshotId: string;
  title: string;
  passed: boolean;
  evidence: string[];
  prohibitedActions: string[];
};

export type FarmCommandBoardReport = {
  ok: true;
  mode: "farm-command-board-dry-run";
  boardVersion: "agri-ai-farm-command-board-v1";
  boardId: string;
  boardFingerprint: string;
  boardReady: boolean;
  inputSummary: {
    farmId: string;
    farmName: string;
    commandWindowLabel: string;
    operatorName: string;
    caseCount: number;
    resourceCount: number;
    fieldCount: number;
    blockedCaseCount: number;
    manualReadyCaseCount: number;
    totalEvidenceCount: number;
    totalPhotoCount: number;
    humanReviewRequired: true;
  };
  casePriorityQueue: FarmCasePriorityQueueItem[];
  crossFieldOverview: FarmFieldOverview[];
  operationalWindows: FarmOperationalWindow[];
  resourceLoadPlan: FarmResourceLoadItem[];
  escalationBoard: FarmEscalationItem[];
  complianceSnapshot: FarmComplianceSnapshot[];
  executiveSummary: {
    commandStatus: "stable" | "watch" | "manual-review" | "blocked";
    topPriorityCaseId: string;
    topPriorityFieldName: string;
    nextHumanAction: string;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    farmCommandBoardReady: boolean;
    crossCasePrioritizationReady: boolean;
    crossFieldOverviewReady: boolean;
    operationalWindowsReady: boolean;
    resourceLoadPlanReady: boolean;
    escalationBoardReady: boolean;
    complianceSnapshotReady: boolean;
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

export const defaultFarmCommandBoardInput: FarmCommandBoardInput = {
  farmId: "",
  farmName: "",
  commandWindowLabel: "",
  operatorName: "",
  cases: [],
  resources: [],
  includeCasePriorityQueue: true,
  includeCrossFieldOverview: true,
  includeOperationalWindows: true,
  includeResourceLoadPlan: true,
  includeEscalationBoard: true,
  includeExecutiveSummary: true,
  includeComplianceSnapshot: true,
  humanReviewRequired: true,
};

export function createFarmCommandBoardFixture(): FarmCommandBoardInput {
  return {
    farmId: "farm-command-ready",
    farmName: "Azienda Demo Nord",
    commandWindowLabel: "settimana operativa corrente",
    operatorName: "Responsabile campo",
    cases: [
      {
        caseId: "case-core-olive",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "settore nord fila quattro",
        priority: "blocked-critical",
        status: "blocked",
        readinessScore: 91,
        protocolFingerprint: "protocol-ready-fingerprint-core",
        interventionReadinessFingerprint: "readiness-ready-fingerprint-core",
        temporalTrendFingerprint: "temporal-ready-fingerprint-core",
        fieldMapFingerprint: "fieldmap-ready-fingerprint-core",
        followUpWindowLabel: "entro T+1 giorno",
        evidenceCount: 12,
        photoCount: 8,
        openBlockers: ["review finale mancante", "controllo sano da aggiornare"],
        reviewerNote: "Caso bloccato: richiede review urgente.",
      },
      {
        caseId: "case-border-olive",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "bordo espansione",
        priority: "manual-protocol",
        status: "manual-ready",
        readinessScore: 80,
        protocolFingerprint: "protocol-ready-fingerprint-border",
        interventionReadinessFingerprint: "readiness-ready-fingerprint-border",
        temporalTrendFingerprint: "temporal-ready-fingerprint-border",
        fieldMapFingerprint: "fieldmap-ready-fingerprint-border",
        followUpWindowLabel: "entro T+2 giorni",
        evidenceCount: 7,
        photoCount: 5,
        openBlockers: [],
        reviewerNote: "Protocollo manuale pronto, senza automazioni.",
      },
      {
        caseId: "case-control-vine",
        fieldId: "field-south",
        fieldName: "Appezzamento Sud",
        crop: "vite",
        locationHint: "controllo sano",
        priority: "observe",
        status: "reviewing",
        readinessScore: 38,
        protocolFingerprint: "protocol-watch-fingerprint-control",
        interventionReadinessFingerprint: "readiness-watch-fingerprint-control",
        temporalTrendFingerprint: "temporal-watch-fingerprint-control",
        fieldMapFingerprint: "fieldmap-watch-fingerprint-control",
        followUpWindowLabel: "entro T+7 giorni",
        evidenceCount: 3,
        photoCount: 4,
        openBlockers: ["solo monitoraggio"],
        reviewerNote: "Usare come confronto.",
      },
    ],
    resources: [
      {
        resourceId: "resource-reviewer",
        label: "Revisore agronomico",
        resourceType: "reviewer",
        availableWindowLabel: "oggi pomeriggio",
        capacityUnits: 4,
        constraints: ["solo review manuale", "nessuna prescrizione prodotto"],
      },
      {
        resourceId: "resource-operator",
        label: "Operatore campo",
        resourceType: "operator",
        availableWindowLabel: "domani mattina",
        capacityUnits: 5,
        constraints: ["raccolta evidenza", "nessuna esecuzione automatica"],
      },
      {
        resourceId: "resource-doc",
        label: "Documentazione caso",
        resourceType: "documentation",
        availableWindowLabel: "entro fine giornata",
        capacityUnits: 3,
        constraints: ["redazione pacchetto", "output redatto"],
      },
    ],
    includeCasePriorityQueue: true,
    includeCrossFieldOverview: true,
    includeOperationalWindows: true,
    includeResourceLoadPlan: true,
    includeEscalationBoard: true,
    includeExecutiveSummary: true,
    includeComplianceSnapshot: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `farm-command-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function priorityRank(priority: FarmCasePriority) {
  return {
    observe: 1,
    "review-soon": 2,
    "manual-protocol": 3,
    "blocked-critical": 4,
  }[priority];
}

function dominantPriority(cases: FarmCommandCaseInput[]): FarmCasePriority {
  return cases.reduce<FarmCasePriority>(
    (current, item) => (priorityRank(item.priority) > priorityRank(current) ? item.priority : current),
    "observe",
  );
}

function commandStatusFromPriority(priority: FarmCasePriority): FarmFieldOverview["fieldCommandStatus"] {
  if (priority === "blocked-critical") return "blocked";
  if (priority === "manual-protocol") return "manual-review";
  if (priority === "review-soon") return "watch";
  return "stable";
}

function caseScore(item: FarmCommandCaseInput) {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        item.readinessScore +
          priorityRank(item.priority) * 8 +
          item.evidenceCount * 1.5 +
          item.photoCount -
          item.openBlockers.length * 12,
      ),
    ),
  );
}

function createCasePriorityQueue(input: FarmCommandBoardInput): FarmCasePriorityQueueItem[] {
  return input.cases
    .map((item) => {
      const blockers = normalize(item.openBlockers || []);
      const score = caseScore({ ...item, openBlockers: blockers });

      return {
        queueId: `queue-${item.caseId}`,
        caseId: item.caseId,
        fieldId: item.fieldId,
        fieldName: item.fieldName,
        crop: item.crop,
        priority: item.priority,
        status: item.status,
        commandScore: score,
        recommendedManualAction:
          item.priority === "blocked-critical"
            ? "review urgente e raccolta evidenza mancante"
            : item.priority === "manual-protocol"
              ? "preparare protocollo manuale non persistito"
              : item.priority === "review-soon"
                ? "programmare review"
                : "osservare e confrontare",
        blockers: blockers.length ? blockers : ["nessun blocco oltre review obbligatoria"],
        requiredReview: [
          "verifica evidenza",
          "conferma limiti",
          "check no prodotto",
          "check no dosaggio",
          "decisione umana",
        ],
        prohibitedAutomation: [
          "creazione task automatica",
          "creazione intervento automatica",
          "esecuzione automatica",
          "persistenza automatica",
          "share pubblico automatico",
        ],
      };
    })
    .sort((a, b) => b.commandScore - a.commandScore);
}

function createCrossFieldOverview(input: FarmCommandBoardInput): FarmFieldOverview[] {
  const groups = new Map<string, FarmCommandCaseInput[]>();

  for (const item of input.cases) {
    const existing = groups.get(item.fieldId) || [];
    existing.push(item);
    groups.set(item.fieldId, existing);
  }

  return Array.from(groups.entries()).map(([fieldId, items]) => {
    const dominant = dominantPriority(items);
    const first = items[0];

    return {
      fieldId,
      fieldName: first?.fieldName || fieldId,
      crop: first?.crop || "n/a",
      caseCount: items.length,
      blockedCaseCount: items.filter((item) => item.priority === "blocked-critical" || item.status === "blocked").length,
      manualReadyCaseCount: items.filter((item) => item.status === "manual-ready").length,
      totalEvidenceCount: items.reduce((total, item) => total + item.evidenceCount, 0),
      totalPhotoCount: items.reduce((total, item) => total + item.photoCount, 0),
      dominantPriority: dominant,
      fieldCommandStatus: commandStatusFromPriority(dominant),
    };
  });
}

function createOperationalWindows(input: FarmCommandBoardInput): FarmOperationalWindow[] {
  return input.cases.flatMap((item) => [
    {
      windowId: `window-review-${item.caseId}`,
      caseId: item.caseId,
      fieldId: item.fieldId,
      label: `Review — ${item.followUpWindowLabel}`,
      windowType: "review",
      owner: "reviewer",
      readiness: item.status === "blocked" ? "blocked" : item.status === "manual-ready" ? "ready-manual" : "watch",
      requiredBeforeStart: ["human review", "foto minime", "limiti documentati", "no prodotto", "no dosaggio"],
    },
    {
      windowId: `window-followup-${item.caseId}`,
      caseId: item.caseId,
      fieldId: item.fieldId,
      label: `Follow-up — ${item.followUpWindowLabel}`,
      windowType: "follow-up",
      owner: "operator",
      readiness: item.priority === "observe" ? "watch" : item.status === "blocked" ? "blocked" : "ready-manual",
      requiredBeforeStart: ["brief operatore", "check zona", "nessuna automazione", "manual dispatch only"],
    },
  ]);
}

function createResourceLoadPlan(input: FarmCommandBoardInput): FarmResourceLoadItem[] {
  const caseIds = input.cases.map((item) => item.caseId);

  return input.resources.map((resource, index) => {
    const assignedCaseIds = caseIds.filter((_, caseIndex) => caseIndex % input.resources.length === index);
    const estimatedLoadUnits = Math.max(1, assignedCaseIds.length * 2);
    const loadStatus =
      estimatedLoadUnits > resource.capacityUnits
        ? "over-capacity"
        : estimatedLoadUnits === resource.capacityUnits
          ? "near-capacity"
          : "within-capacity";

    return {
      loadId: `resource-load-${resource.resourceId}`,
      resourceId: resource.resourceId,
      label: resource.label,
      resourceType: resource.resourceType,
      assignedCaseIds,
      estimatedLoadUnits,
      capacityUnits: resource.capacityUnits,
      loadStatus,
      constraints: normalize(resource.constraints || []),
    };
  });
}

function createEscalationBoard(input: FarmCommandBoardInput): FarmEscalationItem[] {
  return input.cases.map((item) => ({
    escalationId: `escalation-${item.caseId}`,
    caseId: item.caseId,
    fieldName: item.fieldName,
    escalationLevel:
      item.priority === "blocked-critical"
        ? "blocked-critical"
        : item.priority === "manual-protocol"
          ? "urgent-review"
          : item.priority === "review-soon"
            ? "review"
            : "none",
    reason: [
      `priority=${item.priority}`,
      `status=${item.status}`,
      `readinessScore=${item.readinessScore}`,
      `openBlockers=${item.openBlockers.length}`,
    ].join(" | "),
    requiredHumanDecision:
      item.priority === "blocked-critical"
        ? "sbloccare o respingere caso"
        : item.priority === "manual-protocol"
          ? "validare protocollo manuale"
          : "valutare follow-up",
    forbiddenActions: ["prodotto", "dosaggio", "intervento automatico", "task automatico", "persistenza automatica"],
  }));
}

function createComplianceSnapshot(input: FarmCommandBoardInput): FarmComplianceSnapshot[] {
  return [
    {
      snapshotId: "compliance-provider",
      title: "Provider AI live",
      passed: true,
      evidence: ["providerCalled=false", "providerAiReady=false"],
      prohibitedActions: ["chiamata provider live", "chiave AI in UI", "endpoint diagnosis live"],
    },
    {
      snapshotId: "compliance-db",
      title: "Persistenza e automazioni",
      passed: true,
      evidence: ["persistencePerformed=false", "taskCreated=false", "interventionCreated=false"],
      prohibitedActions: ["persistenza automatica", "task automatico", "intervento automatico"],
    },
    {
      snapshotId: "compliance-agronomic",
      title: "Sicurezza agronomica",
      passed: true,
      evidence: ["humanReviewRequired=true", "productPrescriptionPerformed=false", "dosageAdvicePerformed=false"],
      prohibitedActions: ["prodotto", "dosaggio", "esecuzione automatica"],
    },
    {
      snapshotId: "compliance-share",
      title: "Condivisione e redazione",
      passed: true,
      evidence: ["publicSharePerformed=false", "redactedOutputOnly=true"],
      prohibitedActions: ["share pubblico automatico", "export non redatto"],
    },
  ];
}

export function createFarmCommandBoardReport(
  input: FarmCommandBoardInput = defaultFarmCommandBoardInput,
): FarmCommandBoardReport {
  const cases = input.cases.map((item) => ({
    ...item,
    openBlockers: normalize(item.openBlockers || []),
  }));
  const resources = input.resources.map((item) => ({
    ...item,
    constraints: normalize(item.constraints || []),
  }));
  const boardInput = { ...input, cases, resources };
  const casePriorityQueue = input.includeCasePriorityQueue ? createCasePriorityQueue(boardInput) : [];
  const crossFieldOverview = input.includeCrossFieldOverview ? createCrossFieldOverview(boardInput) : [];
  const operationalWindows = input.includeOperationalWindows ? createOperationalWindows(boardInput) : [];
  const resourceLoadPlan = input.includeResourceLoadPlan ? createResourceLoadPlan(boardInput) : [];
  const escalationBoard = input.includeEscalationBoard ? createEscalationBoard(boardInput) : [];
  const complianceSnapshot = input.includeComplianceSnapshot ? createComplianceSnapshot(boardInput) : [];
  const fieldCount = new Set(cases.map((item) => item.fieldId)).size;
  const blockedCaseCount = cases.filter((item) => item.priority === "blocked-critical" || item.status === "blocked").length;
  const manualReadyCaseCount = cases.filter((item) => item.status === "manual-ready").length;
  const totalEvidenceCount = cases.reduce((total, item) => total + item.evidenceCount, 0);
  const totalPhotoCount = cases.reduce((total, item) => total + item.photoCount, 0);
  const boardReady = Boolean(
    input.farmId.trim() &&
      input.farmName.trim() &&
      input.commandWindowLabel.trim() &&
      input.operatorName.trim() &&
      input.humanReviewRequired &&
      cases.length >= 1 &&
      resources.length >= 1,
  );
  const boardId = `farm-command-board-${input.farmId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const boardFingerprint = fingerprint(
    [
      boardId,
      input.farmName,
      input.commandWindowLabel,
      input.operatorName,
      cases.map((item) => `${item.caseId}:${item.fieldId}:${item.priority}:${item.status}:${item.readinessScore}`).join("|"),
      resources.map((item) => `${item.resourceId}:${item.resourceType}:${item.capacityUnits}`).join("|"),
      String(boardReady),
    ].join("|"),
  );
  const top = casePriorityQueue[0];
  const dominant = dominantPriority(cases);
  const commandStatus =
    blockedCaseCount > 0
      ? "blocked"
      : manualReadyCaseCount > 0
        ? "manual-review"
        : dominant === "review-soon"
          ? "watch"
          : "stable";
  const confidenceScore = Number(
    Math.min(
      0.95,
      0.34 +
        Math.min(cases.length, 20) * 0.025 +
        Math.min(resources.length, 10) * 0.025 +
        Math.min(totalEvidenceCount, 40) * 0.01 +
        Math.min(totalPhotoCount, 40) * 0.006,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "farm-command-board-dry-run",
    boardVersion: "agri-ai-farm-command-board-v1",
    boardId,
    boardFingerprint,
    boardReady,
    inputSummary: {
      farmId: input.farmId.trim(),
      farmName: input.farmName.trim(),
      commandWindowLabel: input.commandWindowLabel.trim(),
      operatorName: input.operatorName.trim(),
      caseCount: cases.length,
      resourceCount: resources.length,
      fieldCount,
      blockedCaseCount,
      manualReadyCaseCount,
      totalEvidenceCount,
      totalPhotoCount,
      humanReviewRequired: true,
    },
    casePriorityQueue,
    crossFieldOverview,
    operationalWindows,
    resourceLoadPlan,
    escalationBoard,
    complianceSnapshot,
    executiveSummary: {
      commandStatus,
      topPriorityCaseId: top?.caseId || "",
      topPriorityFieldName: top?.fieldName || "",
      nextHumanAction:
        blockedCaseCount > 0
          ? "risolvere casi bloccati con review urgente"
          : manualReadyCaseCount > 0
            ? "validare protocolli manuali senza automazioni"
            : "monitorare casi in osservazione",
      confidenceScore,
      reasons: [
        `caseCount=${cases.length}`,
        `fieldCount=${fieldCount}`,
        `resourceCount=${resources.length}`,
        `blockedCaseCount=${blockedCaseCount}`,
        `manualReadyCaseCount=${manualReadyCaseCount}`,
        `totalEvidenceCount=${totalEvidenceCount}`,
        `totalPhotoCount=${totalPhotoCount}`,
      ],
      blockingLimitations: [
        "nessuna chiamata provider AI live",
        "board locale non autorizza esecuzione",
        "nessuna persistenza DB",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
        "human review obbligatoria",
      ],
    },
    premiumSignals: {
      farmCommandBoardReady: boardReady,
      crossCasePrioritizationReady: casePriorityQueue.length > 0,
      crossFieldOverviewReady: crossFieldOverview.length > 0,
      operationalWindowsReady: operationalWindows.length > 0,
      resourceLoadPlanReady: resourceLoadPlan.length > 0,
      escalationBoardReady: escalationBoard.length > 0,
      complianceSnapshotReady: complianceSnapshot.length > 0,
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

export function createReadyFarmCommandBoardReport() {
  return createFarmCommandBoardReport(createFarmCommandBoardFixture());
}

export function createBlockedFarmCommandBoardReport() {
  return createFarmCommandBoardReport(defaultFarmCommandBoardInput);
}

export function formatFarmCommandBoardReport(report: FarmCommandBoardReport) {
  return [
    "AI Farm Command Board & Cross-Case Priority Orchestrator",
    "",
    `Board ID: ${report.boardId}`,
    `Board fingerprint: ${report.boardFingerprint}`,
    `Version: ${report.boardVersion}`,
    `Mode: ${report.mode}`,
    `boardReady=${report.boardReady}`,
    "",
    "Input summary:",
    `- farmId=${report.inputSummary.farmId || "missing"}`,
    `- farmName=${report.inputSummary.farmName || "missing"}`,
    `- commandWindowLabel=${report.inputSummary.commandWindowLabel || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- caseCount=${report.inputSummary.caseCount}`,
    `- resourceCount=${report.inputSummary.resourceCount}`,
    `- fieldCount=${report.inputSummary.fieldCount}`,
    `- blockedCaseCount=${report.inputSummary.blockedCaseCount}`,
    `- manualReadyCaseCount=${report.inputSummary.manualReadyCaseCount}`,
    `- totalEvidenceCount=${report.inputSummary.totalEvidenceCount}`,
    `- totalPhotoCount=${report.inputSummary.totalPhotoCount}`,
    "- humanReviewRequired=true",
    "",
    "Executive summary:",
    `- commandStatus=${report.executiveSummary.commandStatus}`,
    `- topPriorityCaseId=${report.executiveSummary.topPriorityCaseId || "none"}`,
    `- topPriorityFieldName=${report.executiveSummary.topPriorityFieldName || "none"}`,
    `- nextHumanAction=${report.executiveSummary.nextHumanAction}`,
    `- confidenceScore=${report.executiveSummary.confidenceScore}`,
    ...report.executiveSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Case priority queue:",
    ...report.casePriorityQueue.map(
      (item) =>
        `- ${item.caseId} | field=${item.fieldName} | priority=${item.priority} | status=${item.status} | commandScore=${item.commandScore}`,
    ),
    "",
    "Cross-field overview:",
    ...report.crossFieldOverview.map(
      (item) =>
        `- ${item.fieldId} | cases=${item.caseCount} | blocked=${item.blockedCaseCount} | status=${item.fieldCommandStatus}`,
    ),
    "",
    "Operational windows:",
    ...report.operationalWindows.map(
      (item) => `- ${item.windowId} | owner=${item.owner} | readiness=${item.readiness} | label=${item.label}`,
    ),
    "",
    "Resource load plan:",
    ...report.resourceLoadPlan.map(
      (item) =>
        `- ${item.resourceId} | assigned=${item.assignedCaseIds.join(", ") || "none"} | load=${item.estimatedLoadUnits}/${item.capacityUnits} | status=${item.loadStatus}`,
    ),
    "",
    "Escalation board:",
    ...report.escalationBoard.map(
      (item) => `- ${item.escalationId} | level=${item.escalationLevel} | decision=${item.requiredHumanDecision}`,
    ),
    "",
    "Compliance snapshot:",
    ...report.complianceSnapshot.map(
      (item) => `- ${item.snapshotId} | passed=${item.passed} | title=${item.title}`,
    ),
    "",
    "Premium signals:",
    `- farmCommandBoardReady=${report.premiumSignals.farmCommandBoardReady}`,
    `- crossCasePrioritizationReady=${report.premiumSignals.crossCasePrioritizationReady}`,
    `- crossFieldOverviewReady=${report.premiumSignals.crossFieldOverviewReady}`,
    `- operationalWindowsReady=${report.premiumSignals.operationalWindowsReady}`,
    `- resourceLoadPlanReady=${report.premiumSignals.resourceLoadPlanReady}`,
    `- escalationBoardReady=${report.premiumSignals.escalationBoardReady}`,
    `- complianceSnapshotReady=${report.premiumSignals.complianceSnapshotReady}`,
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
