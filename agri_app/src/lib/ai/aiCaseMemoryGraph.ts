export type CaseMemoryRiskTier = "low" | "watch" | "high" | "critical";
export type CaseMemoryNodeType =
  | "case"
  | "field"
  | "crop"
  | "symptom"
  | "evidence"
  | "fingerprint"
  | "decision"
  | "limitation";
export type CaseMemoryRelationType =
  | "observed-in"
  | "affects-crop"
  | "shows-symptom"
  | "has-evidence"
  | "linked-fingerprint"
  | "requires-decision"
  | "has-limitation"
  | "similar-to"
  | "recurs-with";

export type CaseMemoryCaseInput = {
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  locationHint: string;
  riskTier: CaseMemoryRiskTier;
  confidenceScore: number;
  commandScore: number;
  roiProxyScore: number;
  evidenceCount: number;
  photoCount: number;
  observedAtLabel: string;
  symptomTags: string[];
  evidenceLabels: string[];
  decisionLabels: string[];
  linkedFingerprints: string[];
  openLimitations: string[];
  reviewerNote: string;
  blocked: boolean;
  humanReviewed: boolean;
};

export type CaseMemoryGraphInput = {
  farmId: string;
  farmName: string;
  memoryWindowLabel: string;
  operatorName: string;
  cases: CaseMemoryCaseInput[];
  includeGraphNodes: boolean;
  includeGraphEdges: boolean;
  includeSimilarityClusters: boolean;
  includeRecurrenceSignals: boolean;
  includeKnowledgeGaps: boolean;
  includeMemoryRecommendations: boolean;
  includeCaseLineage: boolean;
  includeMemoryExportPacket: boolean;
  humanReviewRequired: boolean;
};

export type CaseMemoryGraphNode = {
  nodeId: string;
  nodeType: CaseMemoryNodeType;
  label: string;
  weight: number;
  riskTier: CaseMemoryRiskTier;
  evidenceCount: number;
  redacted: true;
};

export type CaseMemoryGraphEdge = {
  edgeId: string;
  fromNodeId: string;
  toNodeId: string;
  relationType: CaseMemoryRelationType;
  weight: number;
  explanation: string;
};

export type SimilarCaseCluster = {
  clusterId: string;
  clusterLabel: string;
  caseIds: string[];
  sharedFieldIds: string[];
  sharedCrops: string[];
  sharedSymptoms: string[];
  avgConfidenceScore: number;
  maxRiskTier: CaseMemoryRiskTier;
  similarityScore: number;
  nextHumanAction: string;
};

export type PatternRecurrenceSignal = {
  recurrenceId: string;
  label: string;
  caseIds: string[];
  recurrenceType: "field" | "crop" | "symptom" | "fingerprint" | "limitation";
  recurrenceScore: number;
  reason: string;
  recommendedManualCheck: string;
};

export type KnowledgeGapItem = {
  gapId: string;
  caseId: string;
  fieldName: string;
  gapType: "missing-control-photo" | "missing-review" | "low-confidence" | "missing-evidence" | "blocked-limitation";
  severity: "low" | "medium" | "high";
  gapLabel: string;
  recommendedNextObservation: string;
};

export type MemoryRecommendationItem = {
  recommendationId: string;
  caseId: string;
  decision: "link-case" | "collect-evidence" | "human-review" | "keep-monitoring" | "block-until-review";
  priorityScore: number;
  reason: string;
  forbiddenAutomation: string[];
};

export type CaseLineageItem = {
  lineageId: string;
  caseId: string;
  sourceFingerprints: string[];
  derivedMemoryNodes: string[];
  derivedMemoryEdges: string[];
  lineageReady: boolean;
};

export type CaseMemoryExportPacket = {
  exportId: string;
  artifactNames: string[];
  redactedOnly: true;
  localMemoryOnly: true;
  publicShareAllowed: false;
  dbPersistenceAllowed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
};

export type CaseMemoryGraphReport = {
  ok: true;
  mode: "case-memory-graph-dry-run";
  memoryVersion: "agri-ai-case-memory-graph-v1";
  memoryId: string;
  memoryFingerprint: string;
  caseMemoryReady: boolean;
  inputSummary: {
    farmId: string;
    farmName: string;
    memoryWindowLabel: string;
    operatorName: string;
    caseCount: number;
    fieldCount: number;
    cropCount: number;
    symptomCount: number;
    evidenceTotal: number;
    photoTotal: number;
    blockedCaseCount: number;
    reviewedCaseCount: number;
    humanReviewRequired: true;
  };
  graphNodes: CaseMemoryGraphNode[];
  graphEdges: CaseMemoryGraphEdge[];
  similarityClusters: SimilarCaseCluster[];
  recurrenceSignals: PatternRecurrenceSignal[];
  knowledgeGaps: KnowledgeGapItem[];
  memoryRecommendations: MemoryRecommendationItem[];
  caseLineage: CaseLineageItem[];
  memoryExportPacket: CaseMemoryExportPacket;
  memorySummary: {
    memoryStatus: "empty" | "usable" | "rich" | "blocked-review";
    graphNodeCount: number;
    graphEdgeCount: number;
    clusterCount: number;
    patternRecurrenceCount: number;
    knowledgeGapCount: number;
    topClusterId: string;
    nextHumanAction: string;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    caseMemoryReady: boolean;
    graphNodesReady: boolean;
    graphEdgesReady: boolean;
    similarityClustersReady: boolean;
    recurrenceSignalsReady: boolean;
    knowledgeGapDetectorReady: boolean;
    memoryRecommendationsReady: boolean;
    caseLineageReady: boolean;
    memoryExportPacketReady: boolean;
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
    localMemoryOnly: true;
    redactedOutputOnly: true;
  };
};

export const defaultCaseMemoryGraphInput: CaseMemoryGraphInput = {
  farmId: "",
  farmName: "",
  memoryWindowLabel: "",
  operatorName: "",
  cases: [],
  includeGraphNodes: true,
  includeGraphEdges: true,
  includeSimilarityClusters: true,
  includeRecurrenceSignals: true,
  includeKnowledgeGaps: true,
  includeMemoryRecommendations: true,
  includeCaseLineage: true,
  includeMemoryExportPacket: true,
  humanReviewRequired: true,
};

export function createCaseMemoryGraphFixture(): CaseMemoryGraphInput {
  return {
    farmId: "farm-case-memory-ready",
    farmName: "Azienda Demo Nord",
    memoryWindowLabel: "ultimi 30 giorni",
    operatorName: "Responsabile tecnico",
    cases: [
      {
        caseId: "memory-case-core",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "settore nord fila quattro",
        riskTier: "critical",
        confidenceScore: 0.83,
        commandScore: 96,
        roiProxyScore: 70,
        evidenceCount: 14,
        photoCount: 9,
        observedAtLabel: "T-1",
        symptomTags: ["ingiallimento", "macchie fogliari", "diffusione bordo"],
        evidenceLabels: ["close-up foglia", "contesto pianta", "controllo sano mancante"],
        decisionLabels: ["review urgente", "scouting supplementare"],
        linkedFingerprints: [
          "farm-command-core",
          "risk-radar-core",
          "impact-roi-core",
          "response-portfolio-core",
        ],
        openLimitations: ["review finale mancante", "controllo sano da aggiornare"],
        reviewerNote: "Caso critico da collegare a ricorrenze Nord.",
        blocked: true,
        humanReviewed: false,
      },
      {
        caseId: "memory-case-border",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "bordo espansione",
        riskTier: "high",
        confidenceScore: 0.78,
        commandScore: 88,
        roiProxyScore: 82,
        evidenceCount: 9,
        photoCount: 7,
        observedAtLabel: "T-3",
        symptomTags: ["macchie fogliari", "diffusione bordo"],
        evidenceLabels: ["sequenza temporale", "vista bordo", "close-up foglia"],
        decisionLabels: ["protocol validation", "manual-ready"],
        linkedFingerprints: [
          "farm-command-border",
          "risk-radar-border",
          "impact-roi-border",
          "response-portfolio-border",
        ],
        openLimitations: [],
        reviewerNote: "Caso simile e manual-ready.",
        blocked: false,
        humanReviewed: true,
      },
      {
        caseId: "memory-case-east",
        fieldId: "field-east",
        fieldName: "Appezzamento Est",
        crop: "vite",
        locationHint: "zona testimone",
        riskTier: "watch",
        confidenceScore: 0.66,
        commandScore: 58,
        roiProxyScore: 48,
        evidenceCount: 4,
        photoCount: 5,
        observedAtLabel: "T-5",
        symptomTags: ["ingiallimento", "stress idrico sospetto"],
        evidenceLabels: ["foto contesto", "controllo sano parziale"],
        decisionLabels: ["scouting"],
        linkedFingerprints: ["scouting-east", "risk-radar-east"],
        openLimitations: ["foto confronto da acquisire"],
        reviewerNote: "Watch: utile per pattern differenziale.",
        blocked: false,
        humanReviewed: true,
      },
      {
        caseId: "memory-case-control",
        fieldId: "field-south",
        fieldName: "Appezzamento Sud",
        crop: "vite",
        locationHint: "controllo sano",
        riskTier: "low",
        confidenceScore: 0.61,
        commandScore: 31,
        roiProxyScore: 20,
        evidenceCount: 3,
        photoCount: 4,
        observedAtLabel: "T-7",
        symptomTags: ["controllo sano"],
        evidenceLabels: ["vista pianta", "foglia sana"],
        decisionLabels: ["monitor"],
        linkedFingerprints: ["control-south"],
        openLimitations: ["solo monitoraggio"],
        reviewerNote: "Nodo controllo sano.",
        blocked: false,
        humanReviewed: true,
      },
    ],
    includeGraphNodes: true,
    includeGraphEdges: true,
    includeSimilarityClusters: true,
    includeRecurrenceSignals: true,
    includeKnowledgeGaps: true,
    includeMemoryRecommendations: true,
    includeCaseLineage: true,
    includeMemoryExportPacket: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `case-memory-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function slug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "unknown";
}

function riskRank(tier: CaseMemoryRiskTier) {
  return {
    low: 1,
    watch: 2,
    high: 3,
    critical: 4,
  }[tier];
}

function maxRiskTier(values: CaseMemoryRiskTier[]): CaseMemoryRiskTier {
  return values.sort((a, b) => riskRank(b) - riskRank(a))[0] || "low";
}

function nodeWeight(caseItem: CaseMemoryCaseInput) {
  return Math.max(
    1,
    Math.round(caseItem.commandScore * 0.25 + caseItem.roiProxyScore * 0.15 + caseItem.evidenceCount * 2 + caseItem.photoCount),
  );
}

function createNodes(input: CaseMemoryGraphInput): CaseMemoryGraphNode[] {
  const nodes = new Map<string, CaseMemoryGraphNode>();

  function upsert(node: CaseMemoryGraphNode) {
    const existing = nodes.get(node.nodeId);

    if (!existing) {
      nodes.set(node.nodeId, node);
      return;
    }

    nodes.set(node.nodeId, {
      ...existing,
      weight: existing.weight + node.weight,
      evidenceCount: existing.evidenceCount + node.evidenceCount,
      riskTier: maxRiskTier([existing.riskTier, node.riskTier]),
    });
  }

  for (const item of input.cases) {
    upsert({
      nodeId: `case-${slug(item.caseId)}`,
      nodeType: "case",
      label: item.caseId,
      weight: nodeWeight(item),
      riskTier: item.riskTier,
      evidenceCount: item.evidenceCount,
      redacted: true,
    });
    upsert({
      nodeId: `field-${slug(item.fieldId)}`,
      nodeType: "field",
      label: item.fieldName,
      weight: 8,
      riskTier: item.riskTier,
      evidenceCount: item.evidenceCount,
      redacted: true,
    });
    upsert({
      nodeId: `crop-${slug(item.crop)}`,
      nodeType: "crop",
      label: item.crop,
      weight: 5,
      riskTier: item.riskTier,
      evidenceCount: 1,
      redacted: true,
    });

    for (const symptom of item.symptomTags) {
      upsert({
        nodeId: `symptom-${slug(symptom)}`,
        nodeType: "symptom",
        label: symptom,
        weight: 6,
        riskTier: item.riskTier,
        evidenceCount: 1,
        redacted: true,
      });
    }

    for (const evidence of item.evidenceLabels) {
      upsert({
        nodeId: `evidence-${slug(evidence)}`,
        nodeType: "evidence",
        label: evidence,
        weight: 4,
        riskTier: item.riskTier,
        evidenceCount: 1,
        redacted: true,
      });
    }

    for (const decision of item.decisionLabels) {
      upsert({
        nodeId: `decision-${slug(decision)}`,
        nodeType: "decision",
        label: decision,
        weight: 3,
        riskTier: item.riskTier,
        evidenceCount: 1,
        redacted: true,
      });
    }

    for (const linkedFingerprint of item.linkedFingerprints) {
      upsert({
        nodeId: `fingerprint-${slug(linkedFingerprint)}`,
        nodeType: "fingerprint",
        label: linkedFingerprint,
        weight: 2,
        riskTier: item.riskTier,
        evidenceCount: 1,
        redacted: true,
      });
    }

    for (const limitation of item.openLimitations) {
      upsert({
        nodeId: `limitation-${slug(limitation)}`,
        nodeType: "limitation",
        label: limitation,
        weight: 3,
        riskTier: item.riskTier,
        evidenceCount: 1,
        redacted: true,
      });
    }
  }

  return Array.from(nodes.values()).sort((a, b) => b.weight - a.weight);
}

function createEdges(input: CaseMemoryGraphInput): CaseMemoryGraphEdge[] {
  const edges: CaseMemoryGraphEdge[] = [];

  function add(
    fromNodeId: string,
    toNodeId: string,
    relationType: CaseMemoryRelationType,
    weight: number,
    explanation: string,
  ) {
    edges.push({
      edgeId: `edge-${slug(fromNodeId)}-${slug(toNodeId)}-${relationType}`,
      fromNodeId,
      toNodeId,
      relationType,
      weight,
      explanation,
    });
  }

  for (const item of input.cases) {
    const caseNode = `case-${slug(item.caseId)}`;

    add(caseNode, `field-${slug(item.fieldId)}`, "observed-in", 8, "Caso osservato in appezzamento");
    add(caseNode, `crop-${slug(item.crop)}`, "affects-crop", 6, "Caso associato a coltura");

    for (const symptom of item.symptomTags) {
      add(caseNode, `symptom-${slug(symptom)}`, "shows-symptom", 6, "Sintomo osservato nel caso");
    }

    for (const evidence of item.evidenceLabels) {
      add(caseNode, `evidence-${slug(evidence)}`, "has-evidence", 4, "Evidenza collegata al caso");
    }

    for (const decision of item.decisionLabels) {
      add(caseNode, `decision-${slug(decision)}`, "requires-decision", 3, "Decisione manuale collegata");
    }

    for (const linkedFingerprint of item.linkedFingerprints) {
      add(caseNode, `fingerprint-${slug(linkedFingerprint)}`, "linked-fingerprint", 2, "Fingerprint operativo collegato");
    }

    for (const limitation of item.openLimitations) {
      add(caseNode, `limitation-${slug(limitation)}`, "has-limitation", 3, "Limitazione aperta");
    }
  }

  for (let i = 0; i < input.cases.length; i += 1) {
    for (let j = i + 1; j < input.cases.length; j += 1) {
      const left = input.cases[i];
      const right = input.cases[j];
      const sharedSymptoms = left.symptomTags.filter((tag) => right.symptomTags.includes(tag));
      const sameField = left.fieldId === right.fieldId;
      const sameCrop = left.crop === right.crop;

      if (sharedSymptoms.length || sameField || sameCrop) {
        add(
          `case-${slug(left.caseId)}`,
          `case-${slug(right.caseId)}`,
          sharedSymptoms.length ? "similar-to" : "recurs-with",
          5 + sharedSymptoms.length * 2 + (sameField ? 2 : 0) + (sameCrop ? 1 : 0),
          [
            sameField ? "stesso appezzamento" : "",
            sameCrop ? "stessa coltura" : "",
            sharedSymptoms.length ? `sintomi condivisi=${sharedSymptoms.join(", ")}` : "",
          ].filter(Boolean).join(" | "),
        );
      }
    }
  }

  return edges;
}

function createSimilarityClusters(input: CaseMemoryGraphInput): SimilarCaseCluster[] {
  const groups = new Map<string, CaseMemoryCaseInput[]>();

  for (const item of input.cases) {
    const symptomKey = item.symptomTags.slice().sort().join("+") || "no-symptom";
    const key = `${item.crop}:${item.fieldId}:${symptomKey.split("+")[0] || "none"}`;
    const existing = groups.get(key) || [];
    existing.push(item);
    groups.set(key, existing);
  }

  return Array.from(groups.entries())
    .filter(([, cases]) => cases.length >= 1)
    .map(([key, cases]) => {
      const sharedSymptoms = Array.from(
        new Set(cases.flatMap((item) => item.symptomTags)),
      );
      const avgConfidenceScore = Number(
        (cases.reduce((total, item) => total + item.confidenceScore, 0) / Math.max(1, cases.length)).toFixed(2),
      );
      const similarityScore = Math.round(
        Math.min(100, cases.length * 18 + sharedSymptoms.length * 8 + avgConfidenceScore * 25),
      );

      return {
        clusterId: `cluster-${slug(key)}`,
        clusterLabel: key,
        caseIds: cases.map((item) => item.caseId),
        sharedFieldIds: Array.from(new Set(cases.map((item) => item.fieldId))),
        sharedCrops: Array.from(new Set(cases.map((item) => item.crop))),
        sharedSymptoms,
        avgConfidenceScore,
        maxRiskTier: maxRiskTier(cases.map((item) => item.riskTier)),
        similarityScore,
        nextHumanAction:
          cases.some((item) => item.blocked)
            ? "rivedere blocchi e limitazioni"
            : sharedSymptoms.length >= 2
              ? "validare pattern ricorrente"
              : "monitorare cluster",
      };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore);
}

function countBy(values: string[]) {
  const map = new Map<string, number>();

  for (const value of values) {
    map.set(value, (map.get(value) || 0) + 1);
  }

  return map;
}

function createRecurrenceSignals(input: CaseMemoryGraphInput): PatternRecurrenceSignal[] {
  const signals: PatternRecurrenceSignal[] = [];
  const byField = countBy(input.cases.map((item) => item.fieldId));
  const byCrop = countBy(input.cases.map((item) => item.crop));
  const bySymptom = countBy(input.cases.flatMap((item) => item.symptomTags));
  const byFingerprint = countBy(input.cases.flatMap((item) => item.linkedFingerprints));
  const byLimitation = countBy(input.cases.flatMap((item) => item.openLimitations));

  function addFromMap(
    map: Map<string, number>,
    recurrenceType: PatternRecurrenceSignal["recurrenceType"],
    threshold: number,
    labelPrefix: string,
  ) {
    for (const [value, count] of map.entries()) {
      if (count >= threshold) {
        const caseIds = input.cases
          .filter((item) =>
            recurrenceType === "field"
              ? item.fieldId === value
              : recurrenceType === "crop"
                ? item.crop === value
                : recurrenceType === "symptom"
                  ? item.symptomTags.includes(value)
                  : recurrenceType === "fingerprint"
                    ? item.linkedFingerprints.includes(value)
                    : item.openLimitations.includes(value),
          )
          .map((item) => item.caseId);

        signals.push({
          recurrenceId: `recurrence-${recurrenceType}-${slug(value)}`,
          label: `${labelPrefix}: ${value}`,
          caseIds,
          recurrenceType,
          recurrenceScore: Math.min(100, count * 22),
          reason: `${count} casi collegati a ${value}`,
          recommendedManualCheck:
            recurrenceType === "limitation"
              ? "risolvere limite ricorrente"
              : recurrenceType === "symptom"
                ? "validare pattern sintomo"
                : "confermare contesto e confronto sano",
        });
      }
    }
  }

  addFromMap(byField, "field", 2, "Appezzamento ricorrente");
  addFromMap(byCrop, "crop", 2, "Coltura ricorrente");
  addFromMap(bySymptom, "symptom", 2, "Sintomo ricorrente");
  addFromMap(byFingerprint, "fingerprint", 2, "Fingerprint ricorrente");
  addFromMap(byLimitation, "limitation", 1, "Limitazione aperta");

  return signals.sort((a, b) => b.recurrenceScore - a.recurrenceScore);
}

function createKnowledgeGaps(input: CaseMemoryGraphInput): KnowledgeGapItem[] {
  const gaps: KnowledgeGapItem[] = [];

  for (const item of input.cases) {
    if (!item.humanReviewed) {
      gaps.push({
        gapId: `gap-review-${item.caseId}`,
        caseId: item.caseId,
        fieldName: item.fieldName,
        gapType: "missing-review",
        severity: item.riskTier === "critical" ? "high" : "medium",
        gapLabel: "Review umana mancante",
        recommendedNextObservation: "assegnare revisore e validare output",
      });
    }

    if (item.confidenceScore < 0.68) {
      gaps.push({
        gapId: `gap-confidence-${item.caseId}`,
        caseId: item.caseId,
        fieldName: item.fieldName,
        gapType: "low-confidence",
        severity: "medium",
        gapLabel: "Confidence bassa",
        recommendedNextObservation: "raccogliere foto aggiuntive e confronto sano",
      });
    }

    if (item.evidenceCount < 5) {
      gaps.push({
        gapId: `gap-evidence-${item.caseId}`,
        caseId: item.caseId,
        fieldName: item.fieldName,
        gapType: "missing-evidence",
        severity: "medium",
        gapLabel: "Evidenza insufficiente",
        recommendedNextObservation: "aggiungere close-up, contesto e foglia sana",
      });
    }

    if (!item.evidenceLabels.some((label) => label.toLowerCase().includes("sano"))) {
      gaps.push({
        gapId: `gap-control-${item.caseId}`,
        caseId: item.caseId,
        fieldName: item.fieldName,
        gapType: "missing-control-photo",
        severity: "medium",
        gapLabel: "Controllo sano mancante",
        recommendedNextObservation: "aggiungere foto di controllo sano comparabile",
      });
    }

    if (item.blocked || item.openLimitations.length > 0) {
      gaps.push({
        gapId: `gap-blocked-${item.caseId}`,
        caseId: item.caseId,
        fieldName: item.fieldName,
        gapType: "blocked-limitation",
        severity: item.blocked ? "high" : "medium",
        gapLabel: "Limitazione aperta",
        recommendedNextObservation: "risolvere blocchi prima di qualsiasi conversione manuale",
      });
    }
  }

  return gaps;
}

function createMemoryRecommendations(input: CaseMemoryGraphInput, clusters: SimilarCaseCluster[]): MemoryRecommendationItem[] {
  return input.cases
    .map((item): MemoryRecommendationItem => {
      const cluster = clusters.find((entry) => entry.caseIds.includes(item.caseId));
      const priorityScore = Math.round(
        Math.min(
          100,
          item.commandScore * 0.25 +
            item.roiProxyScore * 0.2 +
            item.evidenceCount * 2 +
            item.photoCount +
            (cluster?.similarityScore || 0) * 0.25 -
            (item.blocked ? 12 : 0) -
            item.openLimitations.length * 5,
        ),
      );
      const decision: MemoryRecommendationItem["decision"] =
        item.blocked
          ? "block-until-review"
          : !item.humanReviewed
            ? "human-review"
            : item.evidenceCount < 5
              ? "collect-evidence"
              : cluster && cluster.caseIds.length > 1
                ? "link-case"
                : "keep-monitoring";

      return {
        recommendationId: `memory-rec-${item.caseId}`,
        caseId: item.caseId,
        decision,
        priorityScore,
        reason: [
          `riskTier=${item.riskTier}`,
          `cluster=${cluster?.clusterId || "none"}`,
          `evidenceCount=${item.evidenceCount}`,
          `humanReviewed=${item.humanReviewed}`,
          `blocked=${item.blocked}`,
        ].join(" | "),
        forbiddenAutomation: [
          "provider AI live",
          "persistenza automatica",
          "task automatico",
          "intervento automatico",
          "esecuzione automatica",
          "prescrizione prodotto",
          "dosaggio",
        ],
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

function createCaseLineage(input: CaseMemoryGraphInput, edges: CaseMemoryGraphEdge[]): CaseLineageItem[] {
  return input.cases.map((item) => {
    const caseNode = `case-${slug(item.caseId)}`;
    const derivedEdges = edges
      .filter((edge) => edge.fromNodeId === caseNode || edge.toNodeId === caseNode)
      .map((edge) => edge.edgeId);

    return {
      lineageId: `lineage-${item.caseId}`,
      caseId: item.caseId,
      sourceFingerprints: item.linkedFingerprints,
      derivedMemoryNodes: [
        caseNode,
        `field-${slug(item.fieldId)}`,
        `crop-${slug(item.crop)}`,
        ...item.symptomTags.map((tag) => `symptom-${slug(tag)}`),
      ],
      derivedMemoryEdges: derivedEdges,
      lineageReady: item.linkedFingerprints.length > 0 && derivedEdges.length > 0,
    };
  });
}

function createExportPacket(memoryId: string): CaseMemoryExportPacket {
  return {
    exportId: `case-memory-export-${memoryId}`,
    artifactNames: [
      "case-memory-summary.txt",
      "case-memory-graph.json",
      "similarity-clusters.json",
      "recurrence-signals.json",
      "knowledge-gaps.json",
      "case-lineage.json",
      "safety-guard.json",
    ],
    redactedOnly: true,
    localMemoryOnly: true,
    publicShareAllowed: false,
    dbPersistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
  };
}

function memoryStatus(
  input: CaseMemoryGraphInput,
  gaps: KnowledgeGapItem[],
): CaseMemoryGraphReport["memorySummary"]["memoryStatus"] {
  if (!input.cases.length) return "empty";
  if (input.cases.some((item) => item.blocked) || gaps.some((item) => item.severity === "high")) return "blocked-review";
  if (input.cases.length >= 3) return "rich";
  return "usable";
}

export function createCaseMemoryGraphReport(
  input: CaseMemoryGraphInput = defaultCaseMemoryGraphInput,
): CaseMemoryGraphReport {
  const cases = input.cases.map((item) => ({
    ...item,
    symptomTags: normalize(item.symptomTags || []),
    evidenceLabels: normalize(item.evidenceLabels || []),
    decisionLabels: normalize(item.decisionLabels || []),
    linkedFingerprints: normalize(item.linkedFingerprints || []),
    openLimitations: normalize(item.openLimitations || []),
  }));
  const reportInput = { ...input, cases };
  const graphNodes = input.includeGraphNodes ? createNodes(reportInput) : [];
  const graphEdges = input.includeGraphEdges ? createEdges(reportInput) : [];
  const similarityClusters = input.includeSimilarityClusters ? createSimilarityClusters(reportInput) : [];
  const recurrenceSignals = input.includeRecurrenceSignals ? createRecurrenceSignals(reportInput) : [];
  const knowledgeGaps = input.includeKnowledgeGaps ? createKnowledgeGaps(reportInput) : [];
  const memoryRecommendations = input.includeMemoryRecommendations
    ? createMemoryRecommendations(reportInput, similarityClusters)
    : [];
  const caseLineage = input.includeCaseLineage ? createCaseLineage(reportInput, graphEdges) : [];
  const fieldCount = new Set(cases.map((item) => item.fieldId)).size;
  const cropCount = new Set(cases.map((item) => item.crop)).size;
  const symptomCount = new Set(cases.flatMap((item) => item.symptomTags)).size;
  const evidenceTotal = cases.reduce((total, item) => total + item.evidenceCount, 0);
  const photoTotal = cases.reduce((total, item) => total + item.photoCount, 0);
  const blockedCaseCount = cases.filter((item) => item.blocked).length;
  const reviewedCaseCount = cases.filter((item) => item.humanReviewed).length;
  const caseMemoryReady = Boolean(
    input.farmId.trim() &&
      input.farmName.trim() &&
      input.memoryWindowLabel.trim() &&
      input.operatorName.trim() &&
      input.humanReviewRequired &&
      cases.length >= 1,
  );
  const memoryId = `case-memory-${input.farmId || "draft"}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const memoryFingerprint = fingerprint(
    [
      memoryId,
      input.farmName,
      input.memoryWindowLabel,
      input.operatorName,
      cases.map((item) => `${item.caseId}:${item.fieldId}:${item.crop}:${item.symptomTags.join("+")}:${item.evidenceCount}`).join("|"),
      graphNodes.length,
      graphEdges.length,
      String(caseMemoryReady),
    ].join("|"),
  );
  const topCluster = similarityClusters[0];
  const confidenceScore = Number(
    Math.min(
      0.96,
      0.35 +
        Math.min(cases.length, 50) * 0.018 +
        Math.min(graphNodes.length, 200) * 0.002 +
        Math.min(graphEdges.length, 250) * 0.0015 +
        Math.min(evidenceTotal, 120) * 0.003,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "case-memory-graph-dry-run",
    memoryVersion: "agri-ai-case-memory-graph-v1",
    memoryId,
    memoryFingerprint,
    caseMemoryReady,
    inputSummary: {
      farmId: input.farmId.trim(),
      farmName: input.farmName.trim(),
      memoryWindowLabel: input.memoryWindowLabel.trim(),
      operatorName: input.operatorName.trim(),
      caseCount: cases.length,
      fieldCount,
      cropCount,
      symptomCount,
      evidenceTotal,
      photoTotal,
      blockedCaseCount,
      reviewedCaseCount,
      humanReviewRequired: true,
    },
    graphNodes,
    graphEdges,
    similarityClusters,
    recurrenceSignals,
    knowledgeGaps,
    memoryRecommendations,
    caseLineage,
    memoryExportPacket: input.includeMemoryExportPacket ? createExportPacket(memoryId) : createExportPacket("disabled"),
    memorySummary: {
      memoryStatus: memoryStatus(reportInput, knowledgeGaps),
      graphNodeCount: graphNodes.length,
      graphEdgeCount: graphEdges.length,
      clusterCount: similarityClusters.length,
      patternRecurrenceCount: recurrenceSignals.length,
      knowledgeGapCount: knowledgeGaps.length,
      topClusterId: topCluster?.clusterId || "",
      nextHumanAction:
        blockedCaseCount > 0
          ? "review e sblocco casi prima di memorizzare operativamente"
          : knowledgeGaps.length > 0
            ? "chiudere gap evidenziali"
            : similarityClusters.length > 0
              ? "validare pattern ricorrenti"
              : "continuare raccolta casi",
      confidenceScore,
      reasons: [
        `caseCount=${cases.length}`,
        `fieldCount=${fieldCount}`,
        `cropCount=${cropCount}`,
        `symptomCount=${symptomCount}`,
        `graphNodeCount=${graphNodes.length}`,
        `graphEdgeCount=${graphEdges.length}`,
        `clusterCount=${similarityClusters.length}`,
        `knowledgeGapCount=${knowledgeGaps.length}`,
      ],
      blockingLimitations: [
        "nessuna memoria persistente DB",
        "nessuna chiamata provider AI live",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
        "human review obbligatoria",
      ],
    },
    premiumSignals: {
      caseMemoryReady,
      graphNodesReady: graphNodes.length > 0,
      graphEdgesReady: graphEdges.length > 0,
      similarityClustersReady: similarityClusters.length > 0,
      recurrenceSignalsReady: recurrenceSignals.length > 0,
      knowledgeGapDetectorReady: knowledgeGaps.length >= 0,
      memoryRecommendationsReady: memoryRecommendations.length > 0,
      caseLineageReady: caseLineage.length > 0,
      memoryExportPacketReady: input.includeMemoryExportPacket,
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
      localMemoryOnly: true,
      redactedOutputOnly: true,
    },
  };
}

export function createReadyCaseMemoryGraphReport() {
  return createCaseMemoryGraphReport(createCaseMemoryGraphFixture());
}

export function createBlockedCaseMemoryGraphReport() {
  return createCaseMemoryGraphReport(defaultCaseMemoryGraphInput);
}

export function formatCaseMemoryGraphReport(report: CaseMemoryGraphReport) {
  return [
    "AI Agronomic Case Memory & Pattern Graph",
    "",
    `Memory ID: ${report.memoryId}`,
    `Memory fingerprint: ${report.memoryFingerprint}`,
    `Version: ${report.memoryVersion}`,
    `Mode: ${report.mode}`,
    `caseMemoryReady=${report.caseMemoryReady}`,
    "",
    "Input summary:",
    `- farmId=${report.inputSummary.farmId || "missing"}`,
    `- farmName=${report.inputSummary.farmName || "missing"}`,
    `- memoryWindowLabel=${report.inputSummary.memoryWindowLabel || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- caseCount=${report.inputSummary.caseCount}`,
    `- fieldCount=${report.inputSummary.fieldCount}`,
    `- cropCount=${report.inputSummary.cropCount}`,
    `- symptomCount=${report.inputSummary.symptomCount}`,
    `- evidenceTotal=${report.inputSummary.evidenceTotal}`,
    `- photoTotal=${report.inputSummary.photoTotal}`,
    `- blockedCaseCount=${report.inputSummary.blockedCaseCount}`,
    `- reviewedCaseCount=${report.inputSummary.reviewedCaseCount}`,
    "- humanReviewRequired=true",
    "",
    "Memory summary:",
    `- memoryStatus=${report.memorySummary.memoryStatus}`,
    `- graphNodeCount=${report.memorySummary.graphNodeCount}`,
    `- graphEdgeCount=${report.memorySummary.graphEdgeCount}`,
    `- clusterCount=${report.memorySummary.clusterCount}`,
    `- patternRecurrenceCount=${report.memorySummary.patternRecurrenceCount}`,
    `- knowledgeGapCount=${report.memorySummary.knowledgeGapCount}`,
    `- topClusterId=${report.memorySummary.topClusterId || "none"}`,
    `- nextHumanAction=${report.memorySummary.nextHumanAction}`,
    `- confidenceScore=${report.memorySummary.confidenceScore}`,
    ...report.memorySummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Graph nodes:",
    ...report.graphNodes.slice(0, 20).map(
      (item) => `- ${item.nodeId} | type=${item.nodeType} | label=${item.label} | weight=${item.weight}`,
    ),
    "",
    "Graph edges:",
    ...report.graphEdges.slice(0, 20).map(
      (item) => `- ${item.fromNodeId} -> ${item.toNodeId} | relation=${item.relationType} | weight=${item.weight}`,
    ),
    "",
    "Similarity clusters:",
    ...report.similarityClusters.map(
      (item) =>
        `- ${item.clusterId} | cases=${item.caseIds.join(", ")} | score=${item.similarityScore} | maxRiskTier=${item.maxRiskTier}`,
    ),
    "",
    "Recurrence signals:",
    ...report.recurrenceSignals.map(
      (item) => `- ${item.recurrenceId} | type=${item.recurrenceType} | score=${item.recurrenceScore} | cases=${item.caseIds.join(", ")}`,
    ),
    "",
    "Knowledge gaps:",
    ...report.knowledgeGaps.map(
      (item) => `- ${item.caseId} | gap=${item.gapType} | severity=${item.severity} | next=${item.recommendedNextObservation}`,
    ),
    "",
    "Memory recommendations:",
    ...report.memoryRecommendations.map(
      (item) => `- ${item.caseId} | decision=${item.decision} | priorityScore=${item.priorityScore}`,
    ),
    "",
    "Case lineage:",
    ...report.caseLineage.map(
      (item) => `- ${item.caseId} | lineageReady=${item.lineageReady} | edges=${item.derivedMemoryEdges.length}`,
    ),
    "",
    "Memory export packet:",
    `- exportId=${report.memoryExportPacket.exportId}`,
    `- artifactNames=${report.memoryExportPacket.artifactNames.join(", ")}`,
    "- redactedOnly=true",
    "- localMemoryOnly=true",
    "- publicShareAllowed=false",
    "- dbPersistenceAllowed=false",
    "",
    "Premium signals:",
    `- caseMemoryReady=${report.premiumSignals.caseMemoryReady}`,
    `- graphNodesReady=${report.premiumSignals.graphNodesReady}`,
    `- graphEdgesReady=${report.premiumSignals.graphEdgesReady}`,
    `- similarityClustersReady=${report.premiumSignals.similarityClustersReady}`,
    `- recurrenceSignalsReady=${report.premiumSignals.recurrenceSignalsReady}`,
    `- knowledgeGapDetectorReady=${report.premiumSignals.knowledgeGapDetectorReady}`,
    `- memoryRecommendationsReady=${report.premiumSignals.memoryRecommendationsReady}`,
    `- caseLineageReady=${report.premiumSignals.caseLineageReady}`,
    `- memoryExportPacketReady=${report.premiumSignals.memoryExportPacketReady}`,
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
    "- localMemoryOnly=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
