export type RetrievalRiskTier = "low" | "watch" | "high" | "critical";
export type RetrievalDecision = "reuse-insight" | "collect-evidence" | "human-review" | "monitor" | "block-until-review";
export type RetrievalMatchType = "symptom" | "field" | "crop" | "fingerprint" | "evidence" | "mixed";

export type RetrievalQueryInput = {
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  locationHint: string;
  riskTier: RetrievalRiskTier;
  confidenceScore: number;
  symptomTags: string[];
  evidenceLabels: string[];
  linkedFingerprints: string[];
  openLimitations: string[];
  reviewerQuestion: string;
  humanReviewed: boolean;
  blocked: boolean;
};

export type RetrievalMemoryCaseInput = {
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  locationHint: string;
  riskTier: RetrievalRiskTier;
  confidenceScore: number;
  symptomTags: string[];
  evidenceLabels: string[];
  decisionLabels: string[];
  linkedFingerprints: string[];
  reusableInsights: string[];
  knownLimitations: string[];
  outcomeLabel: "unknown" | "improved" | "stable" | "worsened" | "blocked";
  humanReviewed: boolean;
  blocked: boolean;
};

export type CaseMemoryRetrievalInput = {
  farmId: string;
  farmName: string;
  retrievalWindowLabel: string;
  operatorName: string;
  query: RetrievalQueryInput;
  memoryCases: RetrievalMemoryCaseInput[];
  includeSimilarityMatches: boolean;
  includeInsightCards: boolean;
  includeTransferLearningCandidates: boolean;
  includeGapBridgePlan: boolean;
  includeRetrievalBriefing: boolean;
  includeRetrievalExportPacket: boolean;
  humanReviewRequired: boolean;
};

export type SimilarityMatchItem = {
  matchId: string;
  queryCaseId: string;
  memoryCaseId: string;
  fieldName: string;
  crop: string;
  matchType: RetrievalMatchType;
  similarityScore: number;
  sharedSymptoms: string[];
  sharedEvidence: string[];
  sharedFingerprints: string[];
  riskCompatibilityScore: number;
  confidenceCompatibilityScore: number;
  reusableInsightCount: number;
  matchReason: string;
  blockedReasons: string[];
};

export type ReusableInsightCard = {
  cardId: string;
  sourceCaseId: string;
  title: string;
  insightLines: string[];
  appliesToCurrentCase: boolean;
  confidenceScore: number;
  reviewRequired: true;
  forbiddenUse: string[];
};

export type TransferLearningCandidate = {
  transferId: string;
  sourceCaseId: string;
  targetCaseId: string;
  transferType: "symptom-pattern" | "field-pattern" | "crop-pattern" | "evidence-pattern" | "fingerprint-pattern";
  transferScore: number;
  reusableSignals: string[];
  constraints: string[];
  nextHumanValidation: string;
};

export type GapBridgePlanItem = {
  bridgeId: string;
  gapType: "missing-review" | "missing-control-photo" | "missing-evidence" | "low-confidence" | "blocked-limitation" | "memory-not-enough";
  severity: "low" | "medium" | "high";
  gapLabel: string;
  recommendedObservation: string;
  canUseMemoryHint: boolean;
  relatedMemoryCaseIds: string[];
};

export type RetrievalBriefing = {
  briefingId: string;
  title: string;
  headline: string;
  summaryLines: string[];
  reviewerQuestions: string[];
  nextManualActions: string[];
  redactedForOperations: true;
};

export type RetrievalExportPacket = {
  exportId: string;
  artifactNames: string[];
  redactedOnly: true;
  localRetrievalOnly: true;
  publicShareAllowed: false;
  dbPersistenceAllowed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
};

export type CaseMemoryRetrievalReport = {
  ok: true;
  mode: "case-memory-retrieval-dry-run";
  retrievalVersion: "agri-ai-case-memory-retrieval-v1";
  retrievalId: string;
  retrievalFingerprint: string;
  caseMemoryRetrievalReady: boolean;
  inputSummary: {
    farmId: string;
    farmName: string;
    retrievalWindowLabel: string;
    operatorName: string;
    queryCaseId: string;
    memoryCaseCount: number;
    candidateMatchCount: number;
    reusableInsightCount: number;
    transferCandidateCount: number;
    gapBridgeCount: number;
    topMatchId: string;
    humanReviewRequired: true;
  };
  similarityMatches: SimilarityMatchItem[];
  insightCards: ReusableInsightCard[];
  transferLearningCandidates: TransferLearningCandidate[];
  gapBridgePlan: GapBridgePlanItem[];
  retrievalBriefing: RetrievalBriefing;
  retrievalExportPacket: RetrievalExportPacket;
  retrievalSummary: {
    retrievalStatus: "empty" | "usable" | "strong-match" | "blocked-review";
    topMemoryCaseId: string;
    topSimilarityScore: number;
    nextHumanAction: string;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    caseMemoryRetrievalReady: boolean;
    similarityMatchesReady: boolean;
    insightCardsReady: boolean;
    transferLearningReady: boolean;
    gapBridgePlanReady: boolean;
    retrievalBriefingReady: boolean;
    retrievalExportPacketReady: boolean;
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
    localRetrievalOnly: true;
    redactedOutputOnly: true;
  };
};

export const defaultCaseMemoryRetrievalInput: CaseMemoryRetrievalInput = {
  farmId: "",
  farmName: "",
  retrievalWindowLabel: "",
  operatorName: "",
  query: {
    caseId: "",
    fieldId: "",
    fieldName: "",
    crop: "",
    locationHint: "",
    riskTier: "watch",
    confidenceScore: 0,
    symptomTags: [],
    evidenceLabels: [],
    linkedFingerprints: [],
    openLimitations: [],
    reviewerQuestion: "",
    humanReviewed: false,
    blocked: false,
  },
  memoryCases: [],
  includeSimilarityMatches: true,
  includeInsightCards: true,
  includeTransferLearningCandidates: true,
  includeGapBridgePlan: true,
  includeRetrievalBriefing: true,
  includeRetrievalExportPacket: true,
  humanReviewRequired: true,
};

export function createCaseMemoryRetrievalFixture(): CaseMemoryRetrievalInput {
  return {
    farmId: "farm-case-memory-retrieval-ready",
    farmName: "Azienda Demo Nord",
    retrievalWindowLabel: "ultimi 60 giorni",
    operatorName: "Responsabile tecnico",
    query: {
      caseId: "query-case-north-active",
      fieldId: "field-north",
      fieldName: "Appezzamento Nord",
      crop: "olivo",
      locationHint: "settore nord fila cinque",
      riskTier: "critical",
      confidenceScore: 0.79,
      symptomTags: ["macchie fogliari", "diffusione bordo", "ingiallimento"],
      evidenceLabels: ["close-up foglia", "contesto pianta"],
      linkedFingerprints: ["farm-command-active", "risk-radar-active", "case-memory-active"],
      openLimitations: ["review finale mancante", "controllo sano da aggiornare"],
      reviewerQuestion: "Quali casi precedenti aiutano a decidere il prossimo rilievo?",
      humanReviewed: false,
      blocked: true,
    },
    memoryCases: [
      {
        caseId: "memory-case-core",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "settore nord fila quattro",
        riskTier: "critical",
        confidenceScore: 0.83,
        symptomTags: ["macchie fogliari", "diffusione bordo", "ingiallimento"],
        evidenceLabels: ["close-up foglia", "contesto pianta", "controllo sano mancante"],
        decisionLabels: ["review urgente", "scouting supplementare"],
        linkedFingerprints: ["farm-command-core", "risk-radar-core", "impact-roi-core"],
        reusableInsights: [
          "pattern simile su bordo appezzamento nord",
          "serve controllo sano aggiornato",
          "review finale prima di qualsiasi conversione",
        ],
        knownLimitations: ["review finale mancante"],
        outcomeLabel: "blocked",
        humanReviewed: false,
        blocked: true,
      },
      {
        caseId: "memory-case-border",
        fieldId: "field-north",
        fieldName: "Appezzamento Nord",
        crop: "olivo",
        locationHint: "bordo espansione",
        riskTier: "high",
        confidenceScore: 0.78,
        symptomTags: ["macchie fogliari", "diffusione bordo"],
        evidenceLabels: ["sequenza temporale", "vista bordo", "close-up foglia"],
        decisionLabels: ["protocol validation", "manual-ready"],
        linkedFingerprints: ["farm-command-border", "risk-radar-border", "response-portfolio-border"],
        reusableInsights: [
          "la sequenza temporale ha aumentato la qualità della review",
          "il bordo espansione richiede foto contesto e close-up",
        ],
        knownLimitations: [],
        outcomeLabel: "improved",
        humanReviewed: true,
        blocked: false,
      },
      {
        caseId: "memory-case-east",
        fieldId: "field-east",
        fieldName: "Appezzamento Est",
        crop: "vite",
        locationHint: "zona testimone",
        riskTier: "watch",
        confidenceScore: 0.66,
        symptomTags: ["ingiallimento", "stress idrico sospetto"],
        evidenceLabels: ["foto contesto", "controllo sano parziale"],
        decisionLabels: ["scouting"],
        linkedFingerprints: ["scouting-east", "risk-radar-east"],
        reusableInsights: [
          "ingiallimento senza close-up comparabile richiede controllo sano",
          "il caso watch è utile come confronto differenziale",
        ],
        knownLimitations: ["foto confronto da acquisire"],
        outcomeLabel: "stable",
        humanReviewed: true,
        blocked: false,
      },
    ],
    includeSimilarityMatches: true,
    includeInsightCards: true,
    includeTransferLearningCandidates: true,
    includeGapBridgePlan: true,
    includeRetrievalBriefing: true,
    includeRetrievalExportPacket: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `case-retrieval-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function riskRank(tier: RetrievalRiskTier) {
  return {
    low: 1,
    watch: 2,
    high: 3,
    critical: 4,
  }[tier];
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function overlap(left: string[], right: string[]) {
  const rightSet = new Set(right.map((value) => value.toLowerCase()));
  return left.filter((value) => rightSet.has(value.toLowerCase()));
}

function matchTypeFor(sharedSymptoms: string[], sameField: boolean, sameCrop: boolean, sharedFingerprints: string[], sharedEvidence: string[]): RetrievalMatchType {
  const categories = [
    sharedSymptoms.length > 0,
    sameField,
    sameCrop,
    sharedFingerprints.length > 0,
    sharedEvidence.length > 0,
  ].filter(Boolean).length;

  if (categories >= 2) return "mixed";
  if (sharedSymptoms.length) return "symptom";
  if (sameField) return "field";
  if (sameCrop) return "crop";
  if (sharedFingerprints.length) return "fingerprint";
  return "evidence";
}

function createSimilarityMatches(input: CaseMemoryRetrievalInput): SimilarityMatchItem[] {
  const query = input.query;

  return input.memoryCases
    .map((item): SimilarityMatchItem => {
      const sharedSymptoms = overlap(query.symptomTags, item.symptomTags);
      const sharedEvidence = overlap(query.evidenceLabels, item.evidenceLabels);
      const sharedFingerprints = overlap(query.linkedFingerprints, item.linkedFingerprints);
      const sameField = query.fieldId && query.fieldId === item.fieldId;
      const sameCrop = query.crop && query.crop === item.crop;
      const riskCompatibilityScore = Math.max(0, 100 - Math.abs(riskRank(query.riskTier) - riskRank(item.riskTier)) * 22);
      const confidenceCompatibilityScore = Math.round(clamp(100 - Math.abs(query.confidenceScore - item.confidenceScore) * 100));
      const similarityScore = Math.round(
        clamp(
          sharedSymptoms.length * 20 +
            sharedEvidence.length * 10 +
            sharedFingerprints.length * 8 +
            (sameField ? 18 : 0) +
            (sameCrop ? 10 : 0) +
            riskCompatibilityScore * 0.12 +
            confidenceCompatibilityScore * 0.08 +
            item.reusableInsights.length * 3 -
            (item.blocked ? 4 : 0),
        ),
      );

      return {
        matchId: `retrieval-match-${item.caseId}`,
        queryCaseId: query.caseId,
        memoryCaseId: item.caseId,
        fieldName: item.fieldName,
        crop: item.crop,
        matchType: matchTypeFor(sharedSymptoms, Boolean(sameField), Boolean(sameCrop), sharedFingerprints, sharedEvidence),
        similarityScore,
        sharedSymptoms,
        sharedEvidence,
        sharedFingerprints,
        riskCompatibilityScore,
        confidenceCompatibilityScore,
        reusableInsightCount: item.reusableInsights.length,
        matchReason: [
          sameField ? "stesso appezzamento" : "",
          sameCrop ? "stessa coltura" : "",
          sharedSymptoms.length ? `sintomi=${sharedSymptoms.join(", ")}` : "",
          sharedEvidence.length ? `evidenze=${sharedEvidence.join(", ")}` : "",
          sharedFingerprints.length ? `fingerprint=${sharedFingerprints.length}` : "",
        ].filter(Boolean).join(" | ") || "similarità debole",
        blockedReasons: normalize([...item.knownLimitations, ...(item.blocked ? ["caso memoria bloccato"] : [])]),
      };
    })
    .filter((item) => item.similarityScore > 0)
    .sort((a, b) => b.similarityScore - a.similarityScore);
}

function createInsightCards(input: CaseMemoryRetrievalInput, matches: SimilarityMatchItem[]): ReusableInsightCard[] {
  return matches.flatMap((match) => {
    const memoryCase = input.memoryCases.find((item) => item.caseId === match.memoryCaseId);

    if (!memoryCase) {
      return [];
    }

    return memoryCase.reusableInsights.map((line, index): ReusableInsightCard => ({
      cardId: `insight-${match.memoryCaseId}-${index + 1}`,
      sourceCaseId: match.memoryCaseId,
      title: `Insight riutilizzabile da ${match.memoryCaseId}`,
      insightLines: [
        line,
        `matchScore=${match.similarityScore}`,
        `matchType=${match.matchType}`,
        `reviewRequired=true`,
      ],
      appliesToCurrentCase: match.similarityScore >= 45,
      confidenceScore: Number(Math.min(0.92, match.similarityScore / 100 + 0.12).toFixed(2)),
      reviewRequired: true,
      forbiddenUse: [
        "nessuna prescrizione prodotto",
        "nessun dosaggio",
        "nessuna esecuzione automatica",
        "nessuna creazione automatica",
      ],
    }));
  });
}

function createTransferLearningCandidates(input: CaseMemoryRetrievalInput, matches: SimilarityMatchItem[]): TransferLearningCandidate[] {
  return matches.slice(0, 8).map((match): TransferLearningCandidate => {
    const transferType: TransferLearningCandidate["transferType"] =
      match.sharedSymptoms.length
        ? "symptom-pattern"
        : match.sharedEvidence.length
          ? "evidence-pattern"
          : match.sharedFingerprints.length
            ? "fingerprint-pattern"
            : match.crop === input.query.crop
              ? "crop-pattern"
              : "field-pattern";

    return {
      transferId: `transfer-${match.memoryCaseId}-to-${input.query.caseId || "query"}`,
      sourceCaseId: match.memoryCaseId,
      targetCaseId: input.query.caseId,
      transferType,
      transferScore: Math.round(clamp(match.similarityScore * 0.82 + match.reusableInsightCount * 4)),
      reusableSignals: [
        ...match.sharedSymptoms.map((item) => `symptom:${item}`),
        ...match.sharedEvidence.map((item) => `evidence:${item}`),
        ...match.sharedFingerprints.map((item) => `fingerprint:${item}`),
      ],
      constraints: [
        "solo supporto review",
        "nessuna persistenza automatica",
        "nessuna azione automatica",
        ...match.blockedReasons,
      ],
      nextHumanValidation:
        match.similarityScore >= 65
          ? "validare insight nel contesto corrente"
          : "raccogliere evidenza prima di riusare insight",
    };
  });
}

function createGapBridgePlan(input: CaseMemoryRetrievalInput, matches: SimilarityMatchItem[]): GapBridgePlanItem[] {
  const query = input.query;
  const gaps: GapBridgePlanItem[] = [];

  if (!query.humanReviewed) {
    gaps.push({
      bridgeId: "bridge-missing-review",
      gapType: "missing-review",
      severity: query.riskTier === "critical" ? "high" : "medium",
      gapLabel: "Review umana mancante",
      recommendedObservation: "assegnare revisore e confrontare i top match",
      canUseMemoryHint: matches.length > 0,
      relatedMemoryCaseIds: matches.slice(0, 3).map((item) => item.memoryCaseId),
    });
  }

  if (!query.evidenceLabels.some((item) => item.toLowerCase().includes("sano"))) {
    gaps.push({
      bridgeId: "bridge-missing-control-photo",
      gapType: "missing-control-photo",
      severity: "medium",
      gapLabel: "Controllo sano mancante",
      recommendedObservation: "aggiungere foto comparabile di controllo sano",
      canUseMemoryHint: matches.some((item) => item.sharedEvidence.length > 0),
      relatedMemoryCaseIds: matches.slice(0, 3).map((item) => item.memoryCaseId),
    });
  }

  if (query.evidenceLabels.length < 3) {
    gaps.push({
      bridgeId: "bridge-missing-evidence",
      gapType: "missing-evidence",
      severity: "medium",
      gapLabel: "Evidenze insufficienti",
      recommendedObservation: "aggiungere close-up, contesto, underside e controllo sano",
      canUseMemoryHint: matches.length > 0,
      relatedMemoryCaseIds: matches.slice(0, 3).map((item) => item.memoryCaseId),
    });
  }

  if (query.confidenceScore < 0.7) {
    gaps.push({
      bridgeId: "bridge-low-confidence",
      gapType: "low-confidence",
      severity: "medium",
      gapLabel: "Confidence bassa",
      recommendedObservation: "ripetere acquisizione foto con protocollo guidato",
      canUseMemoryHint: matches.length > 0,
      relatedMemoryCaseIds: matches.slice(0, 3).map((item) => item.memoryCaseId),
    });
  }

  if (query.blocked || query.openLimitations.length) {
    gaps.push({
      bridgeId: "bridge-blocked-limitation",
      gapType: "blocked-limitation",
      severity: query.blocked ? "high" : "medium",
      gapLabel: "Limitazioni aperte",
      recommendedObservation: "risolvere blocchi prima di convertire qualunque insight",
      canUseMemoryHint: true,
      relatedMemoryCaseIds: matches.slice(0, 3).map((item) => item.memoryCaseId),
    });
  }

  if (!matches.length) {
    gaps.push({
      bridgeId: "bridge-memory-not-enough",
      gapType: "memory-not-enough",
      severity: "medium",
      gapLabel: "Memoria locale insufficiente",
      recommendedObservation: "creare nuovo caso base con evidenza completa",
      canUseMemoryHint: false,
      relatedMemoryCaseIds: [],
    });
  }

  return gaps;
}

function createRetrievalBriefing(
  input: CaseMemoryRetrievalInput,
  matches: SimilarityMatchItem[],
  gaps: GapBridgePlanItem[],
): RetrievalBriefing {
  const top = matches[0];

  return {
    briefingId: `retrieval-briefing-${input.query.caseId || "query"}`,
    title: "Case memory retrieval briefing",
    headline: top
      ? `Top match: ${top.memoryCaseId} con score ${top.similarityScore}`
      : "Nessun match utile nella memoria locale",
    summaryLines: [
      `farm=${input.farmName || "missing"}`,
      `queryCase=${input.query.caseId || "missing"}`,
      `memoryCaseCount=${input.memoryCases.length}`,
      `matchCount=${matches.length}`,
      `gapCount=${gaps.length}`,
      `localRetrievalOnly=true`,
    ],
    reviewerQuestions: [
      input.query.reviewerQuestion || "Quale insight locale è realmente trasferibile?",
      "I top match hanno evidenza comparabile?",
      "Ci sono limiti aperti o review mancanti?",
      "Serve nuova foto di controllo sano?",
    ],
    nextManualActions:
      gaps.length > 0
        ? gaps.slice(0, 4).map((item) => item.recommendedObservation)
        : ["validare insight top match", "aggiornare case memory export", "continuare monitoraggio"],
    redactedForOperations: true,
  };
}

function createRetrievalExportPacket(retrievalId: string): RetrievalExportPacket {
  return {
    exportId: `case-memory-retrieval-export-${retrievalId}`,
    artifactNames: [
      "retrieval-summary.txt",
      "similarity-matches.json",
      "insight-cards.json",
      "transfer-candidates.json",
      "gap-bridge-plan.json",
      "retrieval-briefing.json",
      "safety-guard.json",
    ],
    redactedOnly: true,
    localRetrievalOnly: true,
    publicShareAllowed: false,
    dbPersistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
  };
}

function statusFrom(matches: SimilarityMatchItem[], gaps: GapBridgePlanItem[]): CaseMemoryRetrievalReport["retrievalSummary"]["retrievalStatus"] {
  if (!matches.length) return "empty";
  if (gaps.some((item) => item.severity === "high")) return "blocked-review";
  if ((matches[0]?.similarityScore || 0) >= 70) return "strong-match";
  return "usable";
}

export function createCaseMemoryRetrievalReport(
  input: CaseMemoryRetrievalInput = defaultCaseMemoryRetrievalInput,
): CaseMemoryRetrievalReport {
  const query: RetrievalQueryInput = {
    ...input.query,
    symptomTags: normalize(input.query.symptomTags || []),
    evidenceLabels: normalize(input.query.evidenceLabels || []),
    linkedFingerprints: normalize(input.query.linkedFingerprints || []),
    openLimitations: normalize(input.query.openLimitations || []),
  };
  const memoryCases = input.memoryCases.map((item): RetrievalMemoryCaseInput => ({
    ...item,
    symptomTags: normalize(item.symptomTags || []),
    evidenceLabels: normalize(item.evidenceLabels || []),
    decisionLabels: normalize(item.decisionLabels || []),
    linkedFingerprints: normalize(item.linkedFingerprints || []),
    reusableInsights: normalize(item.reusableInsights || []),
    knownLimitations: normalize(item.knownLimitations || []),
  }));
  const reportInput = { ...input, query, memoryCases };
  const similarityMatches = input.includeSimilarityMatches ? createSimilarityMatches(reportInput) : [];
  const insightCards = input.includeInsightCards ? createInsightCards(reportInput, similarityMatches) : [];
  const transferLearningCandidates = input.includeTransferLearningCandidates
    ? createTransferLearningCandidates(reportInput, similarityMatches)
    : [];
  const gapBridgePlan = input.includeGapBridgePlan ? createGapBridgePlan(reportInput, similarityMatches) : [];
  const retrievalBriefing = createRetrievalBriefing(reportInput, similarityMatches, gapBridgePlan);
  const candidateMatchCount = similarityMatches.length;
  const reusableInsightCount = insightCards.length;
  const transferCandidateCount = transferLearningCandidates.length;
  const gapBridgeCount = gapBridgePlan.length;
  const top = similarityMatches[0];
  const caseMemoryRetrievalReady = Boolean(
    input.farmId.trim() &&
      input.farmName.trim() &&
      input.retrievalWindowLabel.trim() &&
      input.operatorName.trim() &&
      query.caseId.trim() &&
      input.humanReviewRequired &&
      memoryCases.length >= 1,
  );
  const retrievalId = `case-memory-retrieval-${input.farmId || "draft"}-${query.caseId || "query"}`
    .replace(/[^a-z0-9-]/gi, "-")
    .toLowerCase();
  const retrievalFingerprint = fingerprint(
    [
      retrievalId,
      input.farmName,
      input.retrievalWindowLabel,
      input.operatorName,
      query.caseId,
      query.symptomTags.join("+"),
      query.evidenceLabels.join("+"),
      memoryCases.map((item) => `${item.caseId}:${item.fieldId}:${item.crop}:${item.symptomTags.join("+")}`).join("|"),
      similarityMatches.map((item) => `${item.memoryCaseId}:${item.similarityScore}`).join("|"),
      String(caseMemoryRetrievalReady),
    ].join("|"),
  );
  const confidenceScore = Number(
    Math.min(
      0.96,
      0.32 +
        Math.min(memoryCases.length, 50) * 0.015 +
        Math.min(candidateMatchCount, 20) * 0.025 +
        Math.min(reusableInsightCount, 40) * 0.008 +
        Math.min((top?.similarityScore || 0), 100) * 0.0025,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "case-memory-retrieval-dry-run",
    retrievalVersion: "agri-ai-case-memory-retrieval-v1",
    retrievalId,
    retrievalFingerprint,
    caseMemoryRetrievalReady,
    inputSummary: {
      farmId: input.farmId.trim(),
      farmName: input.farmName.trim(),
      retrievalWindowLabel: input.retrievalWindowLabel.trim(),
      operatorName: input.operatorName.trim(),
      queryCaseId: query.caseId.trim(),
      memoryCaseCount: memoryCases.length,
      candidateMatchCount,
      reusableInsightCount,
      transferCandidateCount,
      gapBridgeCount,
      topMatchId: top?.matchId || "",
      humanReviewRequired: true,
    },
    similarityMatches,
    insightCards,
    transferLearningCandidates,
    gapBridgePlan,
    retrievalBriefing: input.includeRetrievalBriefing
      ? retrievalBriefing
      : {
          briefingId: `retrieval-briefing-${query.caseId || "query"}`,
          title: "Case memory retrieval briefing",
          headline: "Briefing disattivato",
          summaryLines: [],
          reviewerQuestions: [],
          nextManualActions: [],
          redactedForOperations: true,
        },
    retrievalExportPacket: input.includeRetrievalExportPacket
      ? createRetrievalExportPacket(retrievalId)
      : createRetrievalExportPacket("disabled"),
    retrievalSummary: {
      retrievalStatus: statusFrom(similarityMatches, gapBridgePlan),
      topMemoryCaseId: top?.memoryCaseId || "",
      topSimilarityScore: top?.similarityScore || 0,
      nextHumanAction:
        query.blocked || gapBridgePlan.some((item) => item.severity === "high")
          ? "review e sblocco prima di riusare insight"
          : top && top.similarityScore >= 70
            ? "validare insight top match nel contesto corrente"
            : top
              ? "raccogliere evidenza aggiuntiva prima del riuso"
              : "creare nuovo caso base con evidenza completa",
      confidenceScore,
      reasons: [
        `memoryCaseCount=${memoryCases.length}`,
        `candidateMatchCount=${candidateMatchCount}`,
        `reusableInsightCount=${reusableInsightCount}`,
        `transferCandidateCount=${transferCandidateCount}`,
        `gapBridgeCount=${gapBridgeCount}`,
        `topSimilarityScore=${top?.similarityScore || 0}`,
      ],
      blockingLimitations: [
        "nessuna memoria persistente DB",
        "nessuna chiamata provider AI live",
        "nessun riuso automatico senza revisione",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
      ],
    },
    premiumSignals: {
      caseMemoryRetrievalReady,
      similarityMatchesReady: similarityMatches.length > 0,
      insightCardsReady: insightCards.length > 0,
      transferLearningReady: transferLearningCandidates.length > 0,
      gapBridgePlanReady: gapBridgePlan.length >= 0,
      retrievalBriefingReady: input.includeRetrievalBriefing,
      retrievalExportPacketReady: input.includeRetrievalExportPacket,
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
      localRetrievalOnly: true,
      redactedOutputOnly: true,
    },
  };
}

export function createReadyCaseMemoryRetrievalReport() {
  return createCaseMemoryRetrievalReport(createCaseMemoryRetrievalFixture());
}

export function createBlockedCaseMemoryRetrievalReport() {
  return createCaseMemoryRetrievalReport(defaultCaseMemoryRetrievalInput);
}

export function formatCaseMemoryRetrievalReport(report: CaseMemoryRetrievalReport) {
  return [
    "AI Case Memory Retrieval & Similar Case Advisor",
    "",
    `Retrieval ID: ${report.retrievalId}`,
    `Retrieval fingerprint: ${report.retrievalFingerprint}`,
    `Version: ${report.retrievalVersion}`,
    `Mode: ${report.mode}`,
    `caseMemoryRetrievalReady=${report.caseMemoryRetrievalReady}`,
    "",
    "Input summary:",
    `- farmId=${report.inputSummary.farmId || "missing"}`,
    `- farmName=${report.inputSummary.farmName || "missing"}`,
    `- retrievalWindowLabel=${report.inputSummary.retrievalWindowLabel || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- queryCaseId=${report.inputSummary.queryCaseId || "missing"}`,
    `- memoryCaseCount=${report.inputSummary.memoryCaseCount}`,
    `- candidateMatchCount=${report.inputSummary.candidateMatchCount}`,
    `- reusableInsightCount=${report.inputSummary.reusableInsightCount}`,
    `- transferCandidateCount=${report.inputSummary.transferCandidateCount}`,
    `- gapBridgeCount=${report.inputSummary.gapBridgeCount}`,
    `- topMatchId=${report.inputSummary.topMatchId || "none"}`,
    "- humanReviewRequired=true",
    "",
    "Retrieval summary:",
    `- retrievalStatus=${report.retrievalSummary.retrievalStatus}`,
    `- topMemoryCaseId=${report.retrievalSummary.topMemoryCaseId || "none"}`,
    `- topSimilarityScore=${report.retrievalSummary.topSimilarityScore}`,
    `- nextHumanAction=${report.retrievalSummary.nextHumanAction}`,
    `- confidenceScore=${report.retrievalSummary.confidenceScore}`,
    ...report.retrievalSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Similarity matches:",
    ...report.similarityMatches.map(
      (item) =>
        `- ${item.memoryCaseId} | score=${item.similarityScore} | type=${item.matchType} | reason=${item.matchReason}`,
    ),
    "",
    "Insight cards:",
    ...report.insightCards.map(
      (item) =>
        `- ${item.cardId} | source=${item.sourceCaseId} | applies=${item.appliesToCurrentCase} | confidence=${item.confidenceScore}`,
    ),
    "",
    "Transfer learning candidates:",
    ...report.transferLearningCandidates.map(
      (item) =>
        `- ${item.transferId} | type=${item.transferType} | score=${item.transferScore} | next=${item.nextHumanValidation}`,
    ),
    "",
    "Gap bridge plan:",
    ...report.gapBridgePlan.map(
      (item) =>
        `- ${item.gapType} | severity=${item.severity} | next=${item.recommendedObservation} | memoryHint=${item.canUseMemoryHint}`,
    ),
    "",
    "Retrieval briefing:",
    `- ${report.retrievalBriefing.title}`,
    `- ${report.retrievalBriefing.headline}`,
    ...report.retrievalBriefing.summaryLines.map((line) => `- ${line}`),
    "",
    "Retrieval export packet:",
    `- exportId=${report.retrievalExportPacket.exportId}`,
    `- artifactNames=${report.retrievalExportPacket.artifactNames.join(", ")}`,
    "- redactedOnly=true",
    "- localRetrievalOnly=true",
    "- publicShareAllowed=false",
    "- dbPersistenceAllowed=false",
    "",
    "Premium signals:",
    `- caseMemoryRetrievalReady=${report.premiumSignals.caseMemoryRetrievalReady}`,
    `- similarityMatchesReady=${report.premiumSignals.similarityMatchesReady}`,
    `- insightCardsReady=${report.premiumSignals.insightCardsReady}`,
    `- transferLearningReady=${report.premiumSignals.transferLearningReady}`,
    `- gapBridgePlanReady=${report.premiumSignals.gapBridgePlanReady}`,
    `- retrievalBriefingReady=${report.premiumSignals.retrievalBriefingReady}`,
    `- retrievalExportPacketReady=${report.premiumSignals.retrievalExportPacketReady}`,
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
    "- localRetrievalOnly=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
