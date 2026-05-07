export type ResponsePortfolioRiskTier = "low" | "watch" | "high" | "critical";
export type ResponsePortfolioScenarioKind =
  | "observe"
  | "review"
  | "scouting"
  | "protocol-validation"
  | "manual-intervention-ready"
  | "blocked";
export type ResponsePortfolioDecision = "do-now" | "defer" | "block" | "monitor";
export type ResponsePortfolioConstraintLevel = "none" | "light" | "moderate" | "heavy" | "blocking";

export type ResponsePortfolioCaseInput = {
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  locationHint: string;
  riskTier: ResponsePortfolioRiskTier;
  scenarioKind: ResponsePortfolioScenarioKind;
  commandScore: number;
  roiProxyScore: number;
  impactScore: number;
  riskReductionProxy: number;
  costIndexUnits: number;
  manualEffortUnits: number;
  evidenceScore: number;
  confidenceScore: number;
  constraintLevel: ResponsePortfolioConstraintLevel;
  blocked: boolean;
  manualProtocolReady: boolean;
  scoutingMissionReady: boolean;
  reviewReady: boolean;
  linkedFingerprints: string[];
  openLimitations: string[];
  reviewerNote: string;
};

export type ResponsePortfolioResourceInput = {
  resourceId: string;
  label: string;
  role: "operator" | "reviewer" | "field-visit" | "documentation" | "admin";
  capacityUnits: number;
  reservedUnits: number;
  costIndexPerUnit: number;
  constraints: string[];
};

export type ResponsePortfolioInput = {
  farmId: string;
  farmName: string;
  portfolioWindowLabel: string;
  operatorName: string;
  cases: ResponsePortfolioCaseInput[];
  resources: ResponsePortfolioResourceInput[];
  includePortfolioOptimizer: boolean;
  includePriorityAllocationMatrix: boolean;
  includeResourceAllocationPlan: boolean;
  includeTradeoffMatrix: boolean;
  includeDecisionBoard: boolean;
  includeExecutivePortfolioBriefing: boolean;
  includeCompliancePortfolioGuard: boolean;
  includePortfolioExportPacket: boolean;
  humanReviewRequired: boolean;
};

export type PortfolioScenarioItem = {
  scenarioId: string;
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  scenarioKind: ResponsePortfolioScenarioKind;
  recommendedDecision: ResponsePortfolioDecision;
  priorityScore: number;
  roiProxyScore: number;
  impactScore: number;
  riskAdjustedScore: number;
  costIndexUnits: number;
  manualEffortUnits: number;
  confidenceScore: number;
  decisionReason: string;
  blockedReasons: string[];
  allowedManualActions: string[];
  prohibitedActions: string[];
};

export type PriorityAllocationItem = {
  allocationId: string;
  caseId: string;
  fieldName: string;
  decision: ResponsePortfolioDecision;
  allocationBand: "tier-1-now" | "tier-2-review" | "tier-3-monitor" | "blocked";
  allocationScore: number;
  rationale: string[];
};

export type ResourceAllocationPlanItem = {
  planId: string;
  resourceId: string;
  label: string;
  role: ResponsePortfolioResourceInput["role"];
  capacityUnits: number;
  reservedUnits: number;
  proposedUnits: number;
  totalProjectedUnits: number;
  projectedCostIndexUnits: number;
  allocationStatus: "available" | "loaded" | "near-limit" | "over-limit";
  assignedCaseIds: string[];
  mitigation: string[];
};

export type PortfolioTradeoffItem = {
  tradeoffId: string;
  caseId: string;
  fieldName: string;
  riskReductionProxy: number;
  roiProxyScore: number;
  costIndexUnits: number;
  manualEffortUnits: number;
  confidenceScore: number;
  tradeoffLabel: "high-impact-low-cost" | "high-impact-high-cost" | "watch-low-cost" | "blocked-review";
  tradeoffSummary: string;
};

export type PortfolioDecisionBoardItem = {
  boardId: string;
  decision: ResponsePortfolioDecision;
  caseIds: string[];
  fieldNames: string[];
  nextHumanAction: string;
  forbiddenAutomation: string[];
};

export type ExecutivePortfolioBriefing = {
  briefingId: string;
  title: string;
  headline: string;
  summaryLines: string[];
  portfolioDecisions: string[];
  boardQuestions: string[];
  redactedForOperations: true;
};

export type CompliancePortfolioGuardItem = {
  guardId: string;
  label: string;
  passed: boolean;
  evidence: string[];
  prohibitedActions: string[];
};

export type PortfolioExportPacket = {
  exportId: string;
  artifactNames: string[];
  redactedOnly: true;
  publicShareAllowed: false;
  dbPersistenceAllowed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
};

export type ResponsePortfolioReport = {
  ok: true;
  mode: "response-portfolio-optimizer-dry-run";
  portfolioVersion: "agri-ai-response-portfolio-v1";
  portfolioId: string;
  portfolioFingerprint: string;
  portfolioReady: boolean;
  inputSummary: {
    farmId: string;
    farmName: string;
    portfolioWindowLabel: string;
    operatorName: string;
    caseCount: number;
    resourceCount: number;
    fieldCount: number;
    blockedCaseCount: number;
    doNowCaseCount: number;
    deferCaseCount: number;
    monitorCaseCount: number;
    totalRoiProxyScore: number;
    totalCostIndexUnits: number;
    totalManualEffortUnits: number;
    humanReviewRequired: true;
  };
  portfolioScenarios: PortfolioScenarioItem[];
  priorityAllocationMatrix: PriorityAllocationItem[];
  resourceAllocationPlan: ResourceAllocationPlanItem[];
  tradeoffMatrix: PortfolioTradeoffItem[];
  decisionBoard: PortfolioDecisionBoardItem[];
  executivePortfolioBriefing: ExecutivePortfolioBriefing;
  compliancePortfolioGuard: CompliancePortfolioGuardItem[];
  portfolioExportPacket: PortfolioExportPacket;
  portfolioSummary: {
    portfolioStatus: "balanced" | "high-attention" | "constrained" | "blocked";
    topDecisionCaseId: string;
    topDecisionFieldName: string;
    nextHumanAction: string;
    portfolioValueProxy: number;
    portfolioCostProxy: number;
    portfolioEfficiencyProxy: number;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    responsePortfolioReady: boolean;
    portfolioOptimizerReady: boolean;
    priorityAllocationReady: boolean;
    resourceAllocationReady: boolean;
    tradeoffMatrixReady: boolean;
    decisionBoardReady: boolean;
    executivePortfolioBriefingReady: boolean;
    compliancePortfolioGuardReady: boolean;
    portfolioExportPacketReady: boolean;
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

export const defaultResponsePortfolioInput: ResponsePortfolioInput = {
  farmId: "",
  farmName: "",
  portfolioWindowLabel: "",
  operatorName: "",
  cases: [],
  resources: [],
  includePortfolioOptimizer: true,
  includePriorityAllocationMatrix: true,
  includeResourceAllocationPlan: true,
  includeTradeoffMatrix: true,
  includeDecisionBoard: true,
  includeExecutivePortfolioBriefing: true,
  includeCompliancePortfolioGuard: true,
  includePortfolioExportPacket: true,
  humanReviewRequired: true,
};

export function createResponsePortfolioFixture(): ResponsePortfolioInput {
  return {
    farmId: "farm-response-portfolio-ready",
    farmName: "Azienda Demo Nord",
    portfolioWindowLabel: "prossimi 14 giorni",
    operatorName: "Responsabile tecnico",
    cases: [
      {
        caseId: "portfolio-case-core",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "settore nord fila quattro",
        riskTier: "critical",
        scenarioKind: "blocked",
        commandScore: 96,
        roiProxyScore: 70,
        impactScore: 92,
        riskReductionProxy: 58,
        costIndexUnits: 54,
        manualEffortUnits: 6,
        evidenceScore: 86,
        confidenceScore: 0.83,
        constraintLevel: "blocking",
        blocked: true,
        manualProtocolReady: false,
        scoutingMissionReady: true,
        reviewReady: false,
        linkedFingerprints: [
          "farm-command-core",
          "farm-risk-radar-core",
          "impact-roi-core",
          "scouting-mission-core",
        ],
        openLimitations: ["review finale mancante", "controllo sano da aggiornare"],
        reviewerNote: "Alto valore potenziale, ma bloccato fino a review.",
      },
      {
        caseId: "portfolio-case-border",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "bordo espansione",
        riskTier: "high",
        scenarioKind: "manual-intervention-ready",
        commandScore: 88,
        roiProxyScore: 82,
        impactScore: 76,
        riskReductionProxy: 64,
        costIndexUnits: 39,
        manualEffortUnits: 5,
        evidenceScore: 78,
        confidenceScore: 0.78,
        constraintLevel: "moderate",
        blocked: false,
        manualProtocolReady: true,
        scoutingMissionReady: true,
        reviewReady: true,
        linkedFingerprints: [
          "farm-command-border",
          "farm-risk-radar-border",
          "impact-roi-border",
          "intervention-protocol-border",
        ],
        openLimitations: [],
        reviewerNote: "Candidato do-now manuale con ROI proxy alto.",
      },
      {
        caseId: "portfolio-case-scouting",
        fieldId: "field-east",
        fieldName: "Appezzamento Est",
        crop: "vite",
        locationHint: "zona testimone",
        riskTier: "watch",
        scenarioKind: "scouting",
        commandScore: 58,
        roiProxyScore: 48,
        impactScore: 47,
        riskReductionProxy: 35,
        costIndexUnits: 22,
        manualEffortUnits: 3,
        evidenceScore: 51,
        confidenceScore: 0.66,
        constraintLevel: "light",
        blocked: false,
        manualProtocolReady: false,
        scoutingMissionReady: true,
        reviewReady: true,
        linkedFingerprints: ["farm-risk-radar-east", "scouting-mission-east"],
        openLimitations: ["foto confronto da acquisire"],
        reviewerNote: "Da assegnare a scouting prima di decisione.",
      },
      {
        caseId: "portfolio-case-control",
        fieldId: "field-south",
        fieldName: "Appezzamento Sud",
        crop: "vite",
        locationHint: "controllo sano",
        riskTier: "low",
        scenarioKind: "observe",
        commandScore: 31,
        roiProxyScore: 20,
        impactScore: 18,
        riskReductionProxy: 12,
        costIndexUnits: 8,
        manualEffortUnits: 1,
        evidenceScore: 46,
        confidenceScore: 0.61,
        constraintLevel: "none",
        blocked: false,
        manualProtocolReady: false,
        scoutingMissionReady: false,
        reviewReady: true,
        linkedFingerprints: ["farm-command-control"],
        openLimitations: ["solo monitoraggio"],
        reviewerNote: "Monitoraggio e controllo sano.",
      },
    ],
    resources: [
      {
        resourceId: "portfolio-reviewer",
        label: "Revisore agronomico",
        role: "reviewer",
        capacityUnits: 7,
        reservedUnits: 5,
        costIndexPerUnit: 8,
        constraints: ["review manuale", "no prodotto", "no dosaggio"],
      },
      {
        resourceId: "portfolio-operator",
        label: "Operatore campo",
        role: "operator",
        capacityUnits: 9,
        reservedUnits: 6,
        costIndexPerUnit: 6,
        constraints: ["scouting", "raccolta evidenza"],
      },
      {
        resourceId: "portfolio-doc",
        label: "Documentazione",
        role: "documentation",
        capacityUnits: 5,
        reservedUnits: 3,
        costIndexPerUnit: 4,
        constraints: ["export redatto", "audit trail"],
      },
    ],
    includePortfolioOptimizer: true,
    includePriorityAllocationMatrix: true,
    includeResourceAllocationPlan: true,
    includeTradeoffMatrix: true,
    includeDecisionBoard: true,
    includeExecutivePortfolioBriefing: true,
    includeCompliancePortfolioGuard: true,
    includePortfolioExportPacket: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `response-portfolio-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function riskRank(tier: ResponsePortfolioRiskTier) {
  return {
    low: 1,
    watch: 2,
    high: 3,
    critical: 4,
  }[tier];
}

function constraintPenalty(level: ResponsePortfolioConstraintLevel) {
  return {
    none: 0,
    light: 4,
    moderate: 9,
    heavy: 16,
    blocking: 30,
  }[level];
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function decisionForCase(item: ResponsePortfolioCaseInput): ResponsePortfolioDecision {
  if (item.blocked || item.scenarioKind === "blocked" || item.constraintLevel === "blocking") {
    return "block";
  }

  if (
    item.scenarioKind === "manual-intervention-ready" &&
    item.manualProtocolReady &&
    item.reviewReady &&
    item.roiProxyScore >= 65
  ) {
    return "do-now";
  }

  if (item.scenarioKind === "scouting" || item.scenarioKind === "review" || item.openLimitations.length > 0) {
    return "defer";
  }

  return "monitor";
}

function priorityScoreForCase(item: ResponsePortfolioCaseInput) {
  const value =
    item.commandScore * 0.22 +
    item.roiProxyScore * 0.22 +
    item.impactScore * 0.2 +
    item.riskReductionProxy * 0.18 +
    item.evidenceScore * 0.08 +
    item.confidenceScore * 14 +
    riskRank(item.riskTier) * 4 -
    item.costIndexUnits * 0.18 -
    constraintPenalty(item.constraintLevel) -
    (item.blocked ? 18 : 0);

  return Math.round(clamp(value));
}

function riskAdjustedScoreForCase(item: ResponsePortfolioCaseInput) {
  const score =
    item.roiProxyScore * 0.4 +
    item.impactScore * 0.25 +
    item.riskReductionProxy * 0.25 +
    riskRank(item.riskTier) * 5 -
    item.costIndexUnits * 0.25 -
    constraintPenalty(item.constraintLevel) * 0.6;

  return Math.round(clamp(score));
}

function createPortfolioScenarios(input: ResponsePortfolioInput): PortfolioScenarioItem[] {
  return input.cases
    .map((item) => {
      const recommendedDecision = decisionForCase(item);
      const priorityScore = priorityScoreForCase(item);
      const riskAdjustedScore = riskAdjustedScoreForCase(item);

      return {
        scenarioId: `portfolio-scenario-${item.caseId}`,
        caseId: item.caseId,
        fieldId: item.fieldId,
        fieldName: item.fieldName,
        crop: item.crop,
        scenarioKind: item.scenarioKind,
        recommendedDecision,
        priorityScore,
        roiProxyScore: item.roiProxyScore,
        impactScore: item.impactScore,
        riskAdjustedScore,
        costIndexUnits: item.costIndexUnits,
        manualEffortUnits: item.manualEffortUnits,
        confidenceScore: item.confidenceScore,
        decisionReason: [
          `riskTier=${item.riskTier}`,
          `scenario=${item.scenarioKind}`,
          `roiProxyScore=${item.roiProxyScore}`,
          `impactScore=${item.impactScore}`,
          `constraintLevel=${item.constraintLevel}`,
          `blocked=${item.blocked}`,
        ].join(" | "),
        blockedReasons: item.blocked || item.openLimitations.length
          ? normalize(item.openLimitations || []).concat(item.blocked ? ["caso bloccato"] : [])
          : ["nessun blocco oltre review obbligatoria"],
        allowedManualActions:
          recommendedDecision === "do-now"
            ? ["review finale", "validazione protocollo manuale", "brief operatore"]
            : recommendedDecision === "defer"
              ? ["scouting", "raccolta evidenza", "review"]
              : recommendedDecision === "block"
                ? ["sblocco limitazioni", "review umana", "aggiornamento evidenza"]
                : ["monitoraggio", "follow-up", "controllo sano"],
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
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

function allocationBand(decision: ResponsePortfolioDecision, score: number): PriorityAllocationItem["allocationBand"] {
  if (decision === "block") return "blocked";
  if (decision === "do-now" && score >= 65) return "tier-1-now";
  if (decision === "defer") return "tier-2-review";
  return "tier-3-monitor";
}

function createPriorityAllocationMatrix(scenarios: PortfolioScenarioItem[]): PriorityAllocationItem[] {
  return scenarios.map((item) => ({
    allocationId: `allocation-${item.caseId}`,
    caseId: item.caseId,
    fieldName: item.fieldName,
    decision: item.recommendedDecision,
    allocationBand: allocationBand(item.recommendedDecision, item.priorityScore),
    allocationScore: item.priorityScore,
    rationale: [
      `priorityScore=${item.priorityScore}`,
      `riskAdjustedScore=${item.riskAdjustedScore}`,
      `roiProxyScore=${item.roiProxyScore}`,
      `costIndexUnits=${item.costIndexUnits}`,
      `decision=${item.recommendedDecision}`,
    ],
  }));
}

function createResourceAllocationPlan(
  input: ResponsePortfolioInput,
  scenarios: PortfolioScenarioItem[],
): ResourceAllocationPlanItem[] {
  const activeCases = scenarios.filter((item) => item.recommendedDecision === "do-now" || item.recommendedDecision === "defer");
  const resourceCount = Math.max(1, input.resources.length);

  return input.resources.map((resource, index) => {
    const assigned = activeCases.filter((_, caseIndex) => caseIndex % resourceCount === index);
    const proposedUnits = assigned.reduce(
      (total, item) => total + Math.max(1, Math.ceil(item.manualEffortUnits / 2)),
      0,
    );
    const totalProjectedUnits = resource.reservedUnits + proposedUnits;
    const ratio = totalProjectedUnits / Math.max(1, resource.capacityUnits);
    const allocationStatus =
      ratio > 1
        ? "over-limit"
        : ratio >= 0.9
          ? "near-limit"
          : ratio >= 0.55
            ? "loaded"
            : "available";

    return {
      planId: `resource-plan-${resource.resourceId}`,
      resourceId: resource.resourceId,
      label: resource.label,
      role: resource.role,
      capacityUnits: resource.capacityUnits,
      reservedUnits: resource.reservedUnits,
      proposedUnits,
      totalProjectedUnits,
      projectedCostIndexUnits: proposedUnits * resource.costIndexPerUnit,
      allocationStatus,
      assignedCaseIds: assigned.map((item) => item.caseId),
      mitigation:
        allocationStatus === "over-limit" || allocationStatus === "near-limit"
          ? ["spostare casi defer", "ridurre scope manuale", "prioritizzare tier-1-now"]
          : ["mantenere capacità", "preparare review", "monitorare carico"],
    };
  });
}

function createTradeoffMatrix(scenarios: PortfolioScenarioItem[]): PortfolioTradeoffItem[] {
  return scenarios.map((item) => {
    const tradeoffLabel: PortfolioTradeoffItem["tradeoffLabel"] =
      item.recommendedDecision === "block"
        ? "blocked-review"
        : item.impactScore >= 65 && item.costIndexUnits <= 35
          ? "high-impact-low-cost"
          : item.impactScore >= 65
            ? "high-impact-high-cost"
            : "watch-low-cost";

    return {
      tradeoffId: `tradeoff-${item.caseId}`,
      caseId: item.caseId,
      fieldName: item.fieldName,
      riskReductionProxy: item.riskAdjustedScore,
      roiProxyScore: item.roiProxyScore,
      costIndexUnits: item.costIndexUnits,
      manualEffortUnits: item.manualEffortUnits,
      confidenceScore: item.confidenceScore,
      tradeoffLabel,
      tradeoffSummary:
        tradeoffLabel === "blocked-review"
          ? "alto vincolo: prima review e sblocco"
          : tradeoffLabel === "high-impact-low-cost"
            ? "ottimo candidato manuale"
            : tradeoffLabel === "high-impact-high-cost"
              ? "richiede budget risorse"
              : "monitoraggio a basso costo",
    };
  });
}

function createDecisionBoard(scenarios: PortfolioScenarioItem[]): PortfolioDecisionBoardItem[] {
  const decisions: ResponsePortfolioDecision[] = ["do-now", "defer", "block", "monitor"];

  return decisions.map((decision) => {
    const items = scenarios.filter((item) => item.recommendedDecision === decision);

    return {
      boardId: `decision-board-${decision}`,
      decision,
      caseIds: items.map((item) => item.caseId),
      fieldNames: Array.from(new Set(items.map((item) => item.fieldName))),
      nextHumanAction:
        decision === "do-now"
          ? "validare manualmente e preparare briefing"
          : decision === "defer"
            ? "completare evidenza o scouting"
            : decision === "block"
              ? "risolvere blocchi con revisore"
              : "mantenere monitoraggio",
      forbiddenAutomation: [
        "task automatico",
        "intervento automatico",
        "persistenza automatica",
        "esecuzione automatica",
        "prescrizione prodotto",
        "dosaggio",
      ],
    };
  });
}

function createExecutivePortfolioBriefing(
  input: ResponsePortfolioInput,
  scenarios: PortfolioScenarioItem[],
  summary: { portfolioValueProxy: number; portfolioCostProxy: number; portfolioEfficiencyProxy: number },
): ExecutivePortfolioBriefing {
  const top = scenarios[0];

  return {
    briefingId: `executive-portfolio-${input.farmId || "draft"}`,
    title: "Executive response portfolio briefing",
    headline: top
      ? `Top portfolio decision: ${top.caseId} su ${top.fieldName}`
      : "Nessun caso nel portafoglio",
    summaryLines: [
      `farm=${input.farmName || "missing"}`,
      `window=${input.portfolioWindowLabel || "missing"}`,
      `caseCount=${input.cases.length}`,
      `portfolioValueProxy=${summary.portfolioValueProxy}`,
      `portfolioCostProxy=${summary.portfolioCostProxy}`,
      `portfolioEfficiencyProxy=${summary.portfolioEfficiencyProxy}`,
    ],
    portfolioDecisions: [
      "approvare solo decisioni manuali revisionate",
      "bloccare casi con constraint blocking",
      "deferire casi con evidenza incompleta",
      "mantenere observe sui controlli sani",
    ],
    boardQuestions: [
      "Quali tier-1-now hanno review completa?",
      "Quali risorse sono near-limit?",
      "Quali casi bloccati impediscono valore portfolio?",
      "Quali export devono restare redatti?",
    ],
    redactedForOperations: true,
  };
}

function createCompliancePortfolioGuard(input: ResponsePortfolioInput): CompliancePortfolioGuardItem[] {
  return [
    {
      guardId: "portfolio-provider",
      label: "Provider AI live",
      passed: true,
      evidence: ["providerCalled=false", "providerAiReady=false"],
      prohibitedActions: ["chiamata provider live", "chiave AI in UI", "endpoint diagnosis live"],
    },
    {
      guardId: "portfolio-db",
      label: "Persistenza e automazioni",
      passed: true,
      evidence: ["persistencePerformed=false", "taskCreated=false", "interventionCreated=false"],
      prohibitedActions: ["persistenza automatica", "task automatico", "intervento automatico"],
    },
    {
      guardId: "portfolio-execution",
      label: "Esecuzione e agronomia",
      passed: true,
      evidence: ["automaticExecutionPerformed=false", "productPrescriptionPerformed=false", "dosageAdvicePerformed=false"],
      prohibitedActions: ["esecuzione automatica", "prodotto", "dosaggio"],
    },
    {
      guardId: "portfolio-review",
      label: "Human review",
      passed: input.humanReviewRequired === true,
      evidence: ["humanReviewRequired=true", "manualDispatchOnly=true", "redactedOutputOnly=true"],
      prohibitedActions: ["conversione non revisionata", "share pubblico automatico"],
    },
  ];
}

function createPortfolioExportPacket(portfolioId: string): PortfolioExportPacket {
  return {
    exportId: `portfolio-export-${portfolioId}`,
    artifactNames: [
      "portfolio-summary.txt",
      "portfolio-scenarios.json",
      "priority-allocation.json",
      "resource-allocation.json",
      "tradeoff-matrix.json",
      "decision-board.json",
      "compliance-guard.json",
    ],
    redactedOnly: true,
    publicShareAllowed: false,
    dbPersistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
  };
}

function portfolioStatusFromScenarios(scenarios: PortfolioScenarioItem[]): ResponsePortfolioReport["portfolioSummary"]["portfolioStatus"] {
  if (scenarios.some((item) => item.recommendedDecision === "block")) {
    return "blocked";
  }

  if (scenarios.filter((item) => item.recommendedDecision === "do-now").length >= 2) {
    return "high-attention";
  }

  if (scenarios.some((item) => item.costIndexUnits >= 50)) {
    return "constrained";
  }

  return "balanced";
}

export function createResponsePortfolioReport(
  input: ResponsePortfolioInput = defaultResponsePortfolioInput,
): ResponsePortfolioReport {
  const cases = input.cases.map((item) => ({
    ...item,
    linkedFingerprints: normalize(item.linkedFingerprints || []),
    openLimitations: normalize(item.openLimitations || []),
  }));
  const resources = input.resources.map((item) => ({
    ...item,
    constraints: normalize(item.constraints || []),
  }));
  const reportInput = { ...input, cases, resources };
  const portfolioScenarios = input.includePortfolioOptimizer ? createPortfolioScenarios(reportInput) : [];
  const priorityAllocationMatrix = input.includePriorityAllocationMatrix
    ? createPriorityAllocationMatrix(portfolioScenarios)
    : [];
  const resourceAllocationPlan = input.includeResourceAllocationPlan
    ? createResourceAllocationPlan(reportInput, portfolioScenarios)
    : [];
  const tradeoffMatrix = input.includeTradeoffMatrix ? createTradeoffMatrix(portfolioScenarios) : [];
  const decisionBoard = input.includeDecisionBoard ? createDecisionBoard(portfolioScenarios) : [];
  const compliancePortfolioGuard = input.includeCompliancePortfolioGuard ? createCompliancePortfolioGuard(reportInput) : [];
  const portfolioValueProxy = portfolioScenarios.reduce((total, item) => total + item.riskAdjustedScore, 0);
  const portfolioCostProxy = portfolioScenarios.reduce((total, item) => total + item.costIndexUnits, 0);
  const portfolioEfficiencyProxy = Number((portfolioValueProxy / Math.max(1, portfolioCostProxy)).toFixed(2));
  const executivePortfolioBriefing = createExecutivePortfolioBriefing(reportInput, portfolioScenarios, {
    portfolioValueProxy,
    portfolioCostProxy,
    portfolioEfficiencyProxy,
  });
  const portfolioId = `response-portfolio-${input.farmId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const portfolioExportPacket = createPortfolioExportPacket(portfolioId);
  const fieldCount = new Set(cases.map((item) => item.fieldId)).size;
  const doNowCaseCount = portfolioScenarios.filter((item) => item.recommendedDecision === "do-now").length;
  const deferCaseCount = portfolioScenarios.filter((item) => item.recommendedDecision === "defer").length;
  const monitorCaseCount = portfolioScenarios.filter((item) => item.recommendedDecision === "monitor").length;
  const blockedCaseCount = portfolioScenarios.filter((item) => item.recommendedDecision === "block").length;
  const totalRoiProxyScore = cases.reduce((total, item) => total + item.roiProxyScore, 0);
  const totalCostIndexUnits = cases.reduce((total, item) => total + item.costIndexUnits, 0);
  const totalManualEffortUnits = cases.reduce((total, item) => total + item.manualEffortUnits, 0);
  const portfolioReady = Boolean(
    input.farmId.trim() &&
      input.farmName.trim() &&
      input.portfolioWindowLabel.trim() &&
      input.operatorName.trim() &&
      input.humanReviewRequired &&
      cases.length >= 1 &&
      resources.length >= 1,
  );
  const portfolioFingerprint = fingerprint(
    [
      portfolioId,
      input.farmName,
      input.portfolioWindowLabel,
      input.operatorName,
      cases.map((item) => `${item.caseId}:${item.fieldId}:${item.scenarioKind}:${item.roiProxyScore}:${item.constraintLevel}`).join("|"),
      resources.map((item) => `${item.resourceId}:${item.role}:${item.reservedUnits}/${item.capacityUnits}`).join("|"),
      String(portfolioReady),
    ].join("|"),
  );
  const top = portfolioScenarios[0];
  const confidenceScore = Number(
    Math.min(
      0.96,
      0.35 +
        Math.min(cases.length, 40) * 0.018 +
        Math.min(resources.length, 16) * 0.016 +
        Math.min(totalRoiProxyScore, 240) * 0.0012 +
        Math.min(totalManualEffortUnits, 80) * 0.002,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "response-portfolio-optimizer-dry-run",
    portfolioVersion: "agri-ai-response-portfolio-v1",
    portfolioId,
    portfolioFingerprint,
    portfolioReady,
    inputSummary: {
      farmId: input.farmId.trim(),
      farmName: input.farmName.trim(),
      portfolioWindowLabel: input.portfolioWindowLabel.trim(),
      operatorName: input.operatorName.trim(),
      caseCount: cases.length,
      resourceCount: resources.length,
      fieldCount,
      blockedCaseCount,
      doNowCaseCount,
      deferCaseCount,
      monitorCaseCount,
      totalRoiProxyScore,
      totalCostIndexUnits,
      totalManualEffortUnits,
      humanReviewRequired: true,
    },
    portfolioScenarios,
    priorityAllocationMatrix,
    resourceAllocationPlan,
    tradeoffMatrix,
    decisionBoard,
    executivePortfolioBriefing: input.includeExecutivePortfolioBriefing ? executivePortfolioBriefing : {
      briefingId: `executive-portfolio-${input.farmId || "draft"}`,
      title: "Executive response portfolio briefing",
      headline: "Briefing disattivato",
      summaryLines: [],
      portfolioDecisions: [],
      boardQuestions: [],
      redactedForOperations: true,
    },
    compliancePortfolioGuard,
    portfolioExportPacket,
    portfolioSummary: {
      portfolioStatus: portfolioStatusFromScenarios(portfolioScenarios),
      topDecisionCaseId: top?.caseId || "",
      topDecisionFieldName: top?.fieldName || "",
      nextHumanAction:
        blockedCaseCount > 0
          ? "sbloccare casi bloccati prima di convertire il portafoglio"
          : doNowCaseCount > 0
            ? "validare manualmente tier-1-now"
            : deferCaseCount > 0
              ? "completare scouting o review"
              : "mantenere monitoraggio",
      portfolioValueProxy,
      portfolioCostProxy,
      portfolioEfficiencyProxy,
      confidenceScore,
      reasons: [
        `caseCount=${cases.length}`,
        `resourceCount=${resources.length}`,
        `fieldCount=${fieldCount}`,
        `blockedCaseCount=${blockedCaseCount}`,
        `doNowCaseCount=${doNowCaseCount}`,
        `deferCaseCount=${deferCaseCount}`,
        `monitorCaseCount=${monitorCaseCount}`,
        `totalRoiProxyScore=${totalRoiProxyScore}`,
        `totalCostIndexUnits=${totalCostIndexUnits}`,
        `totalManualEffortUnits=${totalManualEffortUnits}`,
      ],
      blockingLimitations: [
        "nessuna chiamata provider AI live",
        "portfolio optimizer locale non autorizza esecuzione",
        "nessuna persistenza DB",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
        "human review obbligatoria",
      ],
    },
    premiumSignals: {
      responsePortfolioReady: portfolioReady,
      portfolioOptimizerReady: portfolioScenarios.length > 0,
      priorityAllocationReady: priorityAllocationMatrix.length > 0,
      resourceAllocationReady: resourceAllocationPlan.length > 0,
      tradeoffMatrixReady: tradeoffMatrix.length > 0,
      decisionBoardReady: decisionBoard.length > 0,
      executivePortfolioBriefingReady: input.includeExecutivePortfolioBriefing,
      compliancePortfolioGuardReady: compliancePortfolioGuard.length > 0,
      portfolioExportPacketReady: input.includePortfolioExportPacket,
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

export function createReadyResponsePortfolioReport() {
  return createResponsePortfolioReport(createResponsePortfolioFixture());
}

export function createBlockedResponsePortfolioReport() {
  return createResponsePortfolioReport(defaultResponsePortfolioInput);
}

export function formatResponsePortfolioReport(report: ResponsePortfolioReport) {
  return [
    "AI Strategic Response Portfolio Optimizer",
    "",
    `Portfolio ID: ${report.portfolioId}`,
    `Portfolio fingerprint: ${report.portfolioFingerprint}`,
    `Version: ${report.portfolioVersion}`,
    `Mode: ${report.mode}`,
    `portfolioReady=${report.portfolioReady}`,
    "",
    "Input summary:",
    `- farmId=${report.inputSummary.farmId || "missing"}`,
    `- farmName=${report.inputSummary.farmName || "missing"}`,
    `- portfolioWindowLabel=${report.inputSummary.portfolioWindowLabel || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- caseCount=${report.inputSummary.caseCount}`,
    `- resourceCount=${report.inputSummary.resourceCount}`,
    `- fieldCount=${report.inputSummary.fieldCount}`,
    `- blockedCaseCount=${report.inputSummary.blockedCaseCount}`,
    `- doNowCaseCount=${report.inputSummary.doNowCaseCount}`,
    `- deferCaseCount=${report.inputSummary.deferCaseCount}`,
    `- monitorCaseCount=${report.inputSummary.monitorCaseCount}`,
    `- totalRoiProxyScore=${report.inputSummary.totalRoiProxyScore}`,
    `- totalCostIndexUnits=${report.inputSummary.totalCostIndexUnits}`,
    `- totalManualEffortUnits=${report.inputSummary.totalManualEffortUnits}`,
    "- humanReviewRequired=true",
    "",
    "Portfolio summary:",
    `- portfolioStatus=${report.portfolioSummary.portfolioStatus}`,
    `- topDecisionCaseId=${report.portfolioSummary.topDecisionCaseId || "none"}`,
    `- topDecisionFieldName=${report.portfolioSummary.topDecisionFieldName || "none"}`,
    `- nextHumanAction=${report.portfolioSummary.nextHumanAction}`,
    `- portfolioValueProxy=${report.portfolioSummary.portfolioValueProxy}`,
    `- portfolioCostProxy=${report.portfolioSummary.portfolioCostProxy}`,
    `- portfolioEfficiencyProxy=${report.portfolioSummary.portfolioEfficiencyProxy}`,
    `- confidenceScore=${report.portfolioSummary.confidenceScore}`,
    ...report.portfolioSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Portfolio scenarios:",
    ...report.portfolioScenarios.map(
      (item) =>
        `- ${item.caseId} | decision=${item.recommendedDecision} | priorityScore=${item.priorityScore} | riskAdjustedScore=${item.riskAdjustedScore}`,
    ),
    "",
    "Priority allocation matrix:",
    ...report.priorityAllocationMatrix.map(
      (item) => `- ${item.caseId} | decision=${item.decision} | band=${item.allocationBand} | score=${item.allocationScore}`,
    ),
    "",
    "Resource allocation plan:",
    ...report.resourceAllocationPlan.map(
      (item) =>
        `- ${item.resourceId} | proposed=${item.proposedUnits} | projected=${item.totalProjectedUnits}/${item.capacityUnits} | status=${item.allocationStatus}`,
    ),
    "",
    "Tradeoff matrix:",
    ...report.tradeoffMatrix.map(
      (item) => `- ${item.caseId} | label=${item.tradeoffLabel} | summary=${item.tradeoffSummary}`,
    ),
    "",
    "Decision board:",
    ...report.decisionBoard.map(
      (item) => `- ${item.decision} | cases=${item.caseIds.join(", ") || "none"} | next=${item.nextHumanAction}`,
    ),
    "",
    "Executive portfolio briefing:",
    `- ${report.executivePortfolioBriefing.title}`,
    `- ${report.executivePortfolioBriefing.headline}`,
    ...report.executivePortfolioBriefing.summaryLines.map((line) => `- ${line}`),
    "",
    "Compliance portfolio guard:",
    ...report.compliancePortfolioGuard.map(
      (item) => `- ${item.guardId} | passed=${item.passed} | label=${item.label}`,
    ),
    "",
    "Portfolio export packet:",
    `- exportId=${report.portfolioExportPacket.exportId}`,
    `- artifactNames=${report.portfolioExportPacket.artifactNames.join(", ")}`,
    "- redactedOnly=true",
    "- publicShareAllowed=false",
    "- dbPersistenceAllowed=false",
    "",
    "Premium signals:",
    `- responsePortfolioReady=${report.premiumSignals.responsePortfolioReady}`,
    `- portfolioOptimizerReady=${report.premiumSignals.portfolioOptimizerReady}`,
    `- priorityAllocationReady=${report.premiumSignals.priorityAllocationReady}`,
    `- resourceAllocationReady=${report.premiumSignals.resourceAllocationReady}`,
    `- tradeoffMatrixReady=${report.premiumSignals.tradeoffMatrixReady}`,
    `- decisionBoardReady=${report.premiumSignals.decisionBoardReady}`,
    `- executivePortfolioBriefingReady=${report.premiumSignals.executivePortfolioBriefingReady}`,
    `- compliancePortfolioGuardReady=${report.premiumSignals.compliancePortfolioGuardReady}`,
    `- portfolioExportPacketReady=${report.premiumSignals.portfolioExportPacketReady}`,
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
