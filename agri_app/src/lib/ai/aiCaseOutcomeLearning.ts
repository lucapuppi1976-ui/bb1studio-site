export type OutcomeLearningRiskTier = "low" | "watch" | "high" | "critical";
export type OutcomeLearningOutcome = "improved" | "stable" | "worsened" | "blocked" | "unknown";
export type OutcomeLearningDecision = "keep" | "revise" | "discard" | "needs-more-evidence" | "block-until-review";
export type OutcomeLearningSignalType =
  | "recommendation-confirmed"
  | "recommendation-weak"
  | "recommendation-wrong-context"
  | "missing-evidence"
  | "risk-drift"
  | "memory-candidate";

export type OutcomeLearningRecommendationInput = {
  recommendationId: string;
  sourceCaseId: string;
  recommendationType:
    | "scouting"
    | "review"
    | "monitoring"
    | "manual-protocol"
    | "evidence-collection"
    | "memory-reuse";
  recommendationLabel: string;
  expectedOutcome: OutcomeLearningOutcome;
  priorityScore: number;
  confidenceScore: number;
  linkedFingerprints: string[];
  limitations: string[];
};

export type OutcomeObservationInput = {
  observationId: string;
  observedAtLabel: string;
  outcomeLabel: OutcomeLearningOutcome;
  riskTierAfter: OutcomeLearningRiskTier;
  confidenceScoreAfter: number;
  evidenceLabels: string[];
  symptomTagsAfter: string[];
  reviewerNote: string;
  humanReviewed: boolean;
  blocked: boolean;
};

export type CaseOutcomeLearningInput = {
  farmId: string;
  farmName: string;
  learningWindowLabel: string;
  operatorName: string;
  caseId: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  riskTierBefore: OutcomeLearningRiskTier;
  confidenceScoreBefore: number;
  symptomTagsBefore: string[];
  evidenceLabelsBefore: string[];
  sourceMemoryCaseIds: string[];
  sourceRetrievalFingerprints: string[];
  priorRecommendations: OutcomeLearningRecommendationInput[];
  observations: OutcomeObservationInput[];
  includeOutcomeTimeline: boolean;
  includeRecommendationOutcomeMatrix: boolean;
  includeLessonCards: boolean;
  includeMemoryUpdateDrafts: boolean;
  includeDriftSignals: boolean;
  includeReviewerLearningBriefing: boolean;
  includeLearningExportPacket: boolean;
  humanReviewRequired: boolean;
};

export type OutcomeEvidenceTimelineItem = {
  timelineId: string;
  observationId: string;
  observedAtLabel: string;
  outcomeLabel: OutcomeLearningOutcome;
  riskTierAfter: OutcomeLearningRiskTier;
  confidenceScoreAfter: number;
  evidenceCount: number;
  symptomCount: number;
  reviewStatus: "reviewed" | "needs-review";
};

export type RecommendationOutcomeMatrixItem = {
  matrixId: string;
  recommendationId: string;
  recommendationType: OutcomeLearningRecommendationInput["recommendationType"];
  expectedOutcome: OutcomeLearningOutcome;
  observedOutcome: OutcomeLearningOutcome;
  alignmentScore: number;
  outcomeDecision: OutcomeLearningDecision;
  explanation: string;
  linkedFingerprints: string[];
};

export type OutcomeLessonCard = {
  lessonId: string;
  sourceRecommendationId: string;
  title: string;
  lessonType: OutcomeLearningSignalType;
  lessonLines: string[];
  reusableForMemory: boolean;
  reviewRequired: true;
  confidenceScore: number;
  forbiddenUse: string[];
};

export type MemoryUpdateDraft = {
  draftId: string;
  sourceCaseId: string;
  updateType: "add-insight" | "revise-insight" | "flag-limitation" | "add-negative-example" | "hold";
  updateDecision: OutcomeLearningDecision;
  proposedMemoryTags: string[];
  proposedInsightLines: string[];
  evidenceLinks: string[];
  blockedReasons: string[];
  localDraftOnly: true;
};

export type LearningDriftSignal = {
  driftId: string;
  signalType: OutcomeLearningSignalType;
  severity: "low" | "medium" | "high";
  signalLabel: string;
  affectedRecommendationIds: string[];
  reason: string;
  nextHumanCheck: string;
};

export type ReviewerLearningBriefing = {
  briefingId: string;
  title: string;
  headline: string;
  summaryLines: string[];
  reviewerQuestions: string[];
  nextManualActions: string[];
  redactedForOperations: true;
};

export type LearningExportPacket = {
  exportId: string;
  artifactNames: string[];
  redactedOnly: true;
  localLearningOnly: true;
  localMemoryOnly: true;
  publicShareAllowed: false;
  dbPersistenceAllowed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
};

export type CaseOutcomeLearningReport = {
  ok: true;
  mode: "case-outcome-learning-dry-run";
  learningVersion: "agri-ai-case-outcome-learning-v1";
  learningId: string;
  learningFingerprint: string;
  caseOutcomeLearningReady: boolean;
  inputSummary: {
    farmId: string;
    farmName: string;
    learningWindowLabel: string;
    operatorName: string;
    caseId: string;
    fieldId: string;
    crop: string;
    recommendationCount: number;
    observationCount: number;
    sourceMemoryCaseCount: number;
    sourceRetrievalFingerprintCount: number;
    alignedRecommendationCount: number;
    revisedRecommendationCount: number;
    blockedRecommendationCount: number;
    lessonCardCount: number;
    memoryUpdateDraftCount: number;
    driftSignalCount: number;
    humanReviewRequired: true;
  };
  outcomeTimeline: OutcomeEvidenceTimelineItem[];
  recommendationOutcomeMatrix: RecommendationOutcomeMatrixItem[];
  lessonCards: OutcomeLessonCard[];
  memoryUpdateDrafts: MemoryUpdateDraft[];
  driftSignals: LearningDriftSignal[];
  reviewerLearningBriefing: ReviewerLearningBriefing;
  learningExportPacket: LearningExportPacket;
  learningSummary: {
    learningStatus: "empty" | "usable" | "strong-learning" | "blocked-review";
    latestOutcomeLabel: OutcomeLearningOutcome;
    confidenceDelta: number;
    riskDeltaLabel: string;
    topLearningSignal: string;
    nextHumanAction: string;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    caseOutcomeLearningReady: boolean;
    outcomeTimelineReady: boolean;
    recommendationOutcomeMatrixReady: boolean;
    lessonCardsReady: boolean;
    memoryUpdateDraftsReady: boolean;
    driftSignalsReady: boolean;
    reviewerLearningBriefingReady: boolean;
    learningExportPacketReady: boolean;
    providerAiReady: false;
    persistenceReady: false;
    memoryPersistenceReady: false;
    automaticTaskCreationReady: false;
    automaticInterventionCreationReady: false;
    automaticExecutionReady: false;
  };
  safety: {
    providerCalled: false;
    persistencePerformed: false;
    memoryPersistencePerformed: false;
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
    memoryPersistenceAllowed: false;
    publicShareAllowed: false;
    productPrescriptionAllowed: false;
    dosageAdviceAllowed: false;
    manualDispatchOnly: true;
    humanReviewRequired: true;
    localAnalysisOnly: true;
    localLearningOnly: true;
    localMemoryOnly: true;
    redactedOutputOnly: true;
  };
};

export const defaultCaseOutcomeLearningInput: CaseOutcomeLearningInput = {
  farmId: "",
  farmName: "",
  learningWindowLabel: "",
  operatorName: "",
  caseId: "",
  fieldId: "",
  fieldName: "",
  crop: "",
  riskTierBefore: "watch",
  confidenceScoreBefore: 0,
  symptomTagsBefore: [],
  evidenceLabelsBefore: [],
  sourceMemoryCaseIds: [],
  sourceRetrievalFingerprints: [],
  priorRecommendations: [],
  observations: [],
  includeOutcomeTimeline: true,
  includeRecommendationOutcomeMatrix: true,
  includeLessonCards: true,
  includeMemoryUpdateDrafts: true,
  includeDriftSignals: true,
  includeReviewerLearningBriefing: true,
  includeLearningExportPacket: true,
  humanReviewRequired: true,
};

export function createCaseOutcomeLearningFixture(): CaseOutcomeLearningInput {
  return {
    farmId: "farm-case-outcome-learning-ready",
    farmName: "Azienda Demo Nord",
    learningWindowLabel: "follow-up 14 giorni",
    operatorName: "Responsabile tecnico",
    caseId: "learning-case-north-active",
    fieldId: "field-north",
    fieldName: "Appezzamento Nord",
    crop: "olivo",
    riskTierBefore: "critical",
    confidenceScoreBefore: 0.74,
    symptomTagsBefore: ["macchie fogliari", "diffusione bordo", "ingiallimento"],
    evidenceLabelsBefore: ["close-up foglia", "contesto pianta"],
    sourceMemoryCaseIds: ["memory-case-core", "memory-case-border"],
    sourceRetrievalFingerprints: ["case-retrieval-core", "case-memory-core", "response-portfolio-core"],
    priorRecommendations: [
      {
        recommendationId: "learning-rec-control-photo",
        sourceCaseId: "memory-case-core",
        recommendationType: "evidence-collection",
        recommendationLabel: "Aggiungere controllo sano comparabile",
        expectedOutcome: "improved",
        priorityScore: 86,
        confidenceScore: 0.8,
        linkedFingerprints: ["case-retrieval-core", "case-memory-core"],
        limitations: [],
      },
      {
        recommendationId: "learning-rec-review",
        sourceCaseId: "memory-case-border",
        recommendationType: "review",
        recommendationLabel: "Review manuale prima di riuso insight",
        expectedOutcome: "stable",
        priorityScore: 78,
        confidenceScore: 0.76,
        linkedFingerprints: ["case-memory-border"],
        limitations: ["review richiesta"],
      },
      {
        recommendationId: "learning-rec-monitor",
        sourceCaseId: "memory-case-east",
        recommendationType: "monitoring",
        recommendationLabel: "Monitorare evoluzione bordo",
        expectedOutcome: "stable",
        priorityScore: 58,
        confidenceScore: 0.62,
        linkedFingerprints: ["risk-radar-east"],
        limitations: ["evidenza parziale"],
      },
    ],
    observations: [
      {
        observationId: "learning-obs-t1",
        observedAtLabel: "T+3",
        outcomeLabel: "stable",
        riskTierAfter: "high",
        confidenceScoreAfter: 0.8,
        evidenceLabels: ["close-up foglia", "controllo sano", "vista bordo"],
        symptomTagsAfter: ["macchie fogliari", "diffusione bordo"],
        reviewerNote: "Controllo sano aggiunto, rischio ridotto da critical a high.",
        humanReviewed: true,
        blocked: false,
      },
      {
        observationId: "learning-obs-t2",
        observedAtLabel: "T+7",
        outcomeLabel: "improved",
        riskTierAfter: "watch",
        confidenceScoreAfter: 0.84,
        evidenceLabels: ["sequenza temporale", "contesto pianta", "close-up foglia"],
        symptomTagsAfter: ["macchie fogliari"],
        reviewerNote: "Trend migliorativo e insight bordo confermato.",
        humanReviewed: true,
        blocked: false,
      },
    ],
    includeOutcomeTimeline: true,
    includeRecommendationOutcomeMatrix: true,
    includeLessonCards: true,
    includeMemoryUpdateDrafts: true,
    includeDriftSignals: true,
    includeReviewerLearningBriefing: true,
    includeLearningExportPacket: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `case-learning-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function riskRank(tier: OutcomeLearningRiskTier) {
  return {
    low: 1,
    watch: 2,
    high: 3,
    critical: 4,
  }[tier];
}

function outcomeRank(outcome: OutcomeLearningOutcome) {
  return {
    unknown: 0,
    blocked: 1,
    worsened: 1,
    stable: 2,
    improved: 3,
  }[outcome];
}

function latestObservation(input: CaseOutcomeLearningInput) {
  return input.observations[input.observations.length - 1];
}

function alignmentScore(expected: OutcomeLearningOutcome, observed: OutcomeLearningOutcome) {
  if (expected === observed) return 100;
  if (expected === "improved" && observed === "stable") return 72;
  if (expected === "stable" && observed === "improved") return 86;
  if (observed === "blocked" || observed === "worsened") return 22;
  if (observed === "unknown") return 38;
  return Math.max(15, 100 - Math.abs(outcomeRank(expected) - outcomeRank(observed)) * 28);
}

function decisionForAlignment(
  recommendation: OutcomeLearningRecommendationInput,
  observedOutcome: OutcomeLearningOutcome,
  score: number,
  hasReview: boolean,
): OutcomeLearningDecision {
  if (!hasReview) return "block-until-review";
  if (observedOutcome === "blocked") return "block-until-review";
  if (score >= 80) return "keep";
  if (score >= 55) return "revise";
  if (observedOutcome === "unknown") return "needs-more-evidence";
  return "discard";
}

function createOutcomeTimeline(input: CaseOutcomeLearningInput): OutcomeEvidenceTimelineItem[] {
  return input.observations.map((item): OutcomeEvidenceTimelineItem => ({
    timelineId: `timeline-${item.observationId}`,
    observationId: item.observationId,
    observedAtLabel: item.observedAtLabel,
    outcomeLabel: item.outcomeLabel,
    riskTierAfter: item.riskTierAfter,
    confidenceScoreAfter: item.confidenceScoreAfter,
    evidenceCount: item.evidenceLabels.length,
    symptomCount: item.symptomTagsAfter.length,
    reviewStatus: item.humanReviewed ? "reviewed" : "needs-review",
  }));
}

function createRecommendationOutcomeMatrix(input: CaseOutcomeLearningInput): RecommendationOutcomeMatrixItem[] {
  const latest = latestObservation(input);
  const observedOutcome = latest?.outcomeLabel || "unknown";
  const hasReview = input.observations.some((item) => item.humanReviewed);

  return input.priorRecommendations.map((item): RecommendationOutcomeMatrixItem => {
    const score = alignmentScore(item.expectedOutcome, observedOutcome);
    const outcomeDecision = decisionForAlignment(item, observedOutcome, score, hasReview);

    return {
      matrixId: `matrix-${item.recommendationId}`,
      recommendationId: item.recommendationId,
      recommendationType: item.recommendationType,
      expectedOutcome: item.expectedOutcome,
      observedOutcome,
      alignmentScore: score,
      outcomeDecision,
      explanation: [
        `expected=${item.expectedOutcome}`,
        `observed=${observedOutcome}`,
        `priority=${item.priorityScore}`,
        `confidence=${item.confidenceScore}`,
        `review=${hasReview}`,
      ].join(" | "),
      linkedFingerprints: item.linkedFingerprints,
    };
  });
}

function lessonTypeFromMatrix(item: RecommendationOutcomeMatrixItem): OutcomeLearningSignalType {
  if (item.outcomeDecision === "keep") return "recommendation-confirmed";
  if (item.outcomeDecision === "revise") return "recommendation-weak";
  if (item.outcomeDecision === "discard") return "recommendation-wrong-context";
  if (item.outcomeDecision === "needs-more-evidence") return "missing-evidence";
  return "risk-drift";
}

function createLessonCards(
  input: CaseOutcomeLearningInput,
  matrix: RecommendationOutcomeMatrixItem[],
): OutcomeLessonCard[] {
  return matrix.map((item): OutcomeLessonCard => {
    const recommendation = input.priorRecommendations.find((entry) => entry.recommendationId === item.recommendationId);
    const lessonType = lessonTypeFromMatrix(item);

    return {
      lessonId: `lesson-${item.recommendationId}`,
      sourceRecommendationId: item.recommendationId,
      title: `Lesson da ${item.recommendationType}`,
      lessonType,
      lessonLines: [
        recommendation?.recommendationLabel || "Raccomandazione non trovata",
        `expected=${item.expectedOutcome}`,
        `observed=${item.observedOutcome}`,
        `alignmentScore=${item.alignmentScore}`,
        `decision=${item.outcomeDecision}`,
      ],
      reusableForMemory: item.outcomeDecision === "keep" || item.outcomeDecision === "revise",
      reviewRequired: true,
      confidenceScore: Number(Math.min(0.94, item.alignmentScore / 100 + 0.12).toFixed(2)),
      forbiddenUse: [
        "nessuna persistenza automatica",
        "nessuna creazione automatica",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto",
        "nessun dosaggio",
      ],
    };
  });
}

function createMemoryUpdateDrafts(
  input: CaseOutcomeLearningInput,
  matrix: RecommendationOutcomeMatrixItem[],
  lessons: OutcomeLessonCard[],
): MemoryUpdateDraft[] {
  return matrix.map((item): MemoryUpdateDraft => {
    const recommendation = input.priorRecommendations.find((entry) => entry.recommendationId === item.recommendationId);
    const lesson = lessons.find((entry) => entry.sourceRecommendationId === item.recommendationId);
    const updateType: MemoryUpdateDraft["updateType"] =
      item.outcomeDecision === "keep"
        ? "add-insight"
        : item.outcomeDecision === "revise"
          ? "revise-insight"
          : item.outcomeDecision === "discard"
            ? "add-negative-example"
            : item.outcomeDecision === "block-until-review"
              ? "flag-limitation"
              : "hold";

    return {
      draftId: `memory-update-${item.recommendationId}`,
      sourceCaseId: input.caseId,
      updateType,
      updateDecision: item.outcomeDecision,
      proposedMemoryTags: normalize([
        input.crop,
        input.fieldName,
        ...input.symptomTagsBefore,
        item.recommendationType,
        item.observedOutcome,
      ]),
      proposedInsightLines: [
        `recommendation=${recommendation?.recommendationLabel || item.recommendationId}`,
        `lessonType=${lesson?.lessonType || "unknown"}`,
        `alignmentScore=${item.alignmentScore}`,
        `observedOutcome=${item.observedOutcome}`,
        "localDraftOnly=true",
      ],
      evidenceLinks: normalize([
        ...input.sourceMemoryCaseIds,
        ...input.sourceRetrievalFingerprints,
        ...item.linkedFingerprints,
      ]),
      blockedReasons:
        item.outcomeDecision === "block-until-review"
          ? ["review mancante o outcome bloccato"]
          : recommendation?.limitations || [],
      localDraftOnly: true,
    };
  });
}

function createDriftSignals(
  input: CaseOutcomeLearningInput,
  matrix: RecommendationOutcomeMatrixItem[],
): LearningDriftSignal[] {
  const latest = latestObservation(input);
  const signals: LearningDriftSignal[] = [];

  if (!latest) {
    signals.push({
      driftId: "drift-missing-outcome",
      signalType: "missing-evidence",
      severity: "high",
      signalLabel: "Nessun outcome osservato",
      affectedRecommendationIds: input.priorRecommendations.map((item) => item.recommendationId),
      reason: "Non è possibile apprendere senza osservazione follow-up.",
      nextHumanCheck: "registrare outcome osservato e review",
    });
    return signals;
  }

  const beforeRank = riskRank(input.riskTierBefore);
  const afterRank = riskRank(latest.riskTierAfter);

  if (afterRank > beforeRank) {
    signals.push({
      driftId: "drift-risk-worsened",
      signalType: "risk-drift",
      severity: "high",
      signalLabel: "Rischio peggiorato rispetto al baseline",
      affectedRecommendationIds: matrix.map((item) => item.recommendationId),
      reason: `riskBefore=${input.riskTierBefore} riskAfter=${latest.riskTierAfter}`,
      nextHumanCheck: "rivedere contesto, evidenza e ipotesi differenziale",
    });
  }

  const weak = matrix.filter((item) => item.alignmentScore < 55);

  if (weak.length) {
    signals.push({
      driftId: "drift-weak-recommendations",
      signalType: "recommendation-weak",
      severity: weak.some((item) => item.alignmentScore < 30) ? "high" : "medium",
      signalLabel: "Raccomandazioni deboli o fuori contesto",
      affectedRecommendationIds: weak.map((item) => item.recommendationId),
      reason: `${weak.length} raccomandazioni con alignmentScore basso`,
      nextHumanCheck: "marcare come revise o negative example nella memoria locale",
    });
  }

  if (!latest.humanReviewed) {
    signals.push({
      driftId: "drift-review-missing",
      signalType: "missing-evidence",
      severity: "high",
      signalLabel: "Outcome non revisionato",
      affectedRecommendationIds: matrix.map((item) => item.recommendationId),
      reason: "L'outcome richiede review umana.",
      nextHumanCheck: "assegnare revisore e validare lesson cards",
    });
  }

  if (signals.length === 0) {
    signals.push({
      driftId: "drift-confirmed-learning",
      signalType: "recommendation-confirmed",
      severity: "low",
      signalLabel: "Learning coerente con outcome osservato",
      affectedRecommendationIds: matrix.map((item) => item.recommendationId),
      reason: "Nessun drift critico rilevato.",
      nextHumanCheck: "validare update draft prima di qualsiasi memoria persistente futura",
    });
  }

  return signals;
}

function createReviewerLearningBriefing(
  input: CaseOutcomeLearningInput,
  matrix: RecommendationOutcomeMatrixItem[],
  driftSignals: LearningDriftSignal[],
): ReviewerLearningBriefing {
  const latest = latestObservation(input);
  const keepCount = matrix.filter((item) => item.outcomeDecision === "keep").length;
  const reviseCount = matrix.filter((item) => item.outcomeDecision === "revise").length;
  const discardCount = matrix.filter((item) => item.outcomeDecision === "discard").length;

  return {
    briefingId: `learning-briefing-${input.caseId || "draft"}`,
    title: "Case outcome learning briefing",
    headline: latest
      ? `Outcome latest=${latest.outcomeLabel}, riskAfter=${latest.riskTierAfter}`
      : "Outcome non disponibile",
    summaryLines: [
      `case=${input.caseId || "missing"}`,
      `field=${input.fieldName || "missing"}`,
      `crop=${input.crop || "missing"}`,
      `keepCount=${keepCount}`,
      `reviseCount=${reviseCount}`,
      `discardCount=${discardCount}`,
      `driftSignalCount=${driftSignals.length}`,
      "localLearningOnly=true",
    ],
    reviewerQuestions: [
      "Quali lesson cards sono davvero riutilizzabili?",
      "Quali recommendation vanno revisionate o scartate?",
      "Ci sono evidenze sufficienti per aggiornare la memoria futura?",
      "Il rischio osservato è coerente con il contesto?",
    ],
    nextManualActions:
      driftSignals.some((item) => item.severity === "high")
        ? ["review urgente del drift", "bloccare update memory", "raccogliere evidenza follow-up"]
        : ["validare lesson cards", "preparare memory update draft", "archiviare export redatto"],
    redactedForOperations: true,
  };
}

function createLearningExportPacket(learningId: string): LearningExportPacket {
  return {
    exportId: `case-outcome-learning-export-${learningId}`,
    artifactNames: [
      "learning-summary.txt",
      "outcome-timeline.json",
      "recommendation-outcome-matrix.json",
      "lesson-cards.json",
      "memory-update-drafts.json",
      "drift-signals.json",
      "reviewer-learning-briefing.json",
      "safety-guard.json",
    ],
    redactedOnly: true,
    localLearningOnly: true,
    localMemoryOnly: true,
    publicShareAllowed: false,
    dbPersistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
  };
}

function learningStatus(
  input: CaseOutcomeLearningInput,
  matrix: RecommendationOutcomeMatrixItem[],
  driftSignals: LearningDriftSignal[],
): CaseOutcomeLearningReport["learningSummary"]["learningStatus"] {
  if (!input.priorRecommendations.length || !input.observations.length) return "empty";
  if (input.observations.some((item) => item.blocked) || driftSignals.some((item) => item.severity === "high")) return "blocked-review";
  if (matrix.filter((item) => item.outcomeDecision === "keep").length >= 2) return "strong-learning";
  return "usable";
}

function riskDeltaLabel(before: OutcomeLearningRiskTier, latest?: OutcomeObservationInput) {
  if (!latest) return "unknown";
  const delta = riskRank(latest.riskTierAfter) - riskRank(before);

  if (delta < 0) return "risk-reduced";
  if (delta > 0) return "risk-increased";
  return "risk-stable";
}

export function createCaseOutcomeLearningReport(
  input: CaseOutcomeLearningInput = defaultCaseOutcomeLearningInput,
): CaseOutcomeLearningReport {
  const normalizedInput: CaseOutcomeLearningInput = {
    ...input,
    symptomTagsBefore: normalize(input.symptomTagsBefore || []),
    evidenceLabelsBefore: normalize(input.evidenceLabelsBefore || []),
    sourceMemoryCaseIds: normalize(input.sourceMemoryCaseIds || []),
    sourceRetrievalFingerprints: normalize(input.sourceRetrievalFingerprints || []),
    priorRecommendations: input.priorRecommendations.map((item): OutcomeLearningRecommendationInput => ({
      ...item,
      linkedFingerprints: normalize(item.linkedFingerprints || []),
      limitations: normalize(item.limitations || []),
    })),
    observations: input.observations.map((item): OutcomeObservationInput => ({
      ...item,
      evidenceLabels: normalize(item.evidenceLabels || []),
      symptomTagsAfter: normalize(item.symptomTagsAfter || []),
    })),
  };
  const outcomeTimeline = input.includeOutcomeTimeline ? createOutcomeTimeline(normalizedInput) : [];
  const recommendationOutcomeMatrix = input.includeRecommendationOutcomeMatrix
    ? createRecommendationOutcomeMatrix(normalizedInput)
    : [];
  const lessonCards = input.includeLessonCards
    ? createLessonCards(normalizedInput, recommendationOutcomeMatrix)
    : [];
  const memoryUpdateDrafts = input.includeMemoryUpdateDrafts
    ? createMemoryUpdateDrafts(normalizedInput, recommendationOutcomeMatrix, lessonCards)
    : [];
  const driftSignals = input.includeDriftSignals
    ? createDriftSignals(normalizedInput, recommendationOutcomeMatrix)
    : [];
  const reviewerLearningBriefing = createReviewerLearningBriefing(
    normalizedInput,
    recommendationOutcomeMatrix,
    driftSignals,
  );
  const latest = latestObservation(normalizedInput);
  const alignedRecommendationCount = recommendationOutcomeMatrix.filter((item) => item.outcomeDecision === "keep").length;
  const revisedRecommendationCount = recommendationOutcomeMatrix.filter((item) => item.outcomeDecision === "revise").length;
  const blockedRecommendationCount = recommendationOutcomeMatrix.filter((item) => item.outcomeDecision === "block-until-review").length;
  const caseOutcomeLearningReady = Boolean(
    input.farmId.trim() &&
      input.farmName.trim() &&
      input.learningWindowLabel.trim() &&
      input.operatorName.trim() &&
      input.caseId.trim() &&
      input.humanReviewRequired &&
      normalizedInput.priorRecommendations.length >= 1 &&
      normalizedInput.observations.length >= 1,
  );
  const learningId = `case-outcome-learning-${input.farmId || "draft"}-${input.caseId || "case"}`
    .replace(/[^a-z0-9-]/gi, "-")
    .toLowerCase();
  const learningFingerprint = fingerprint(
    [
      learningId,
      input.farmName,
      input.learningWindowLabel,
      input.operatorName,
      input.caseId,
      normalizedInput.priorRecommendations.map((item) => `${item.recommendationId}:${item.expectedOutcome}`).join("|"),
      normalizedInput.observations.map((item) => `${item.observationId}:${item.outcomeLabel}:${item.riskTierAfter}`).join("|"),
      String(caseOutcomeLearningReady),
    ].join("|"),
  );
  const confidenceDelta = Number(((latest?.confidenceScoreAfter || 0) - normalizedInput.confidenceScoreBefore).toFixed(2));
  const confidenceScore = Number(
    Math.min(
      0.96,
      0.32 +
        Math.min(normalizedInput.priorRecommendations.length, 20) * 0.018 +
        Math.min(normalizedInput.observations.length, 20) * 0.03 +
        alignedRecommendationCount * 0.035 +
        Math.max(0, confidenceDelta) * 0.12,
    ).toFixed(2),
  );
  const topSignal = driftSignals[0];

  return {
    ok: true,
    mode: "case-outcome-learning-dry-run",
    learningVersion: "agri-ai-case-outcome-learning-v1",
    learningId,
    learningFingerprint,
    caseOutcomeLearningReady,
    inputSummary: {
      farmId: input.farmId.trim(),
      farmName: input.farmName.trim(),
      learningWindowLabel: input.learningWindowLabel.trim(),
      operatorName: input.operatorName.trim(),
      caseId: input.caseId.trim(),
      fieldId: input.fieldId.trim(),
      crop: input.crop.trim(),
      recommendationCount: normalizedInput.priorRecommendations.length,
      observationCount: normalizedInput.observations.length,
      sourceMemoryCaseCount: normalizedInput.sourceMemoryCaseIds.length,
      sourceRetrievalFingerprintCount: normalizedInput.sourceRetrievalFingerprints.length,
      alignedRecommendationCount,
      revisedRecommendationCount,
      blockedRecommendationCount,
      lessonCardCount: lessonCards.length,
      memoryUpdateDraftCount: memoryUpdateDrafts.length,
      driftSignalCount: driftSignals.length,
      humanReviewRequired: true,
    },
    outcomeTimeline,
    recommendationOutcomeMatrix,
    lessonCards,
    memoryUpdateDrafts,
    driftSignals,
    reviewerLearningBriefing: input.includeReviewerLearningBriefing
      ? reviewerLearningBriefing
      : {
          briefingId: `learning-briefing-${input.caseId || "draft"}`,
          title: "Case outcome learning briefing",
          headline: "Briefing disattivato",
          summaryLines: [],
          reviewerQuestions: [],
          nextManualActions: [],
          redactedForOperations: true,
        },
    learningExportPacket: input.includeLearningExportPacket
      ? createLearningExportPacket(learningId)
      : createLearningExportPacket("disabled"),
    learningSummary: {
      learningStatus: learningStatus(normalizedInput, recommendationOutcomeMatrix, driftSignals),
      latestOutcomeLabel: latest?.outcomeLabel || "unknown",
      confidenceDelta,
      riskDeltaLabel: riskDeltaLabel(input.riskTierBefore, latest),
      topLearningSignal: topSignal?.signalLabel || "none",
      nextHumanAction:
        blockedRecommendationCount > 0 || driftSignals.some((item) => item.severity === "high")
          ? "review e blocco update memory"
          : alignedRecommendationCount > 0
            ? "validare lesson cards e memory update draft"
            : "raccogliere evidenza outcome aggiuntiva",
      confidenceScore,
      reasons: [
        `recommendationCount=${normalizedInput.priorRecommendations.length}`,
        `observationCount=${normalizedInput.observations.length}`,
        `alignedRecommendationCount=${alignedRecommendationCount}`,
        `revisedRecommendationCount=${revisedRecommendationCount}`,
        `blockedRecommendationCount=${blockedRecommendationCount}`,
        `lessonCardCount=${lessonCards.length}`,
        `memoryUpdateDraftCount=${memoryUpdateDrafts.length}`,
        `driftSignalCount=${driftSignals.length}`,
        `confidenceDelta=${confidenceDelta}`,
      ],
      blockingLimitations: [
        "nessuna memoria persistente DB",
        "nessuna chiamata provider AI live",
        "nessun aggiornamento memoria automatico",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
      ],
    },
    premiumSignals: {
      caseOutcomeLearningReady,
      outcomeTimelineReady: outcomeTimeline.length > 0,
      recommendationOutcomeMatrixReady: recommendationOutcomeMatrix.length > 0,
      lessonCardsReady: lessonCards.length > 0,
      memoryUpdateDraftsReady: memoryUpdateDrafts.length > 0,
      driftSignalsReady: driftSignals.length > 0,
      reviewerLearningBriefingReady: input.includeReviewerLearningBriefing,
      learningExportPacketReady: input.includeLearningExportPacket,
      providerAiReady: false,
      persistenceReady: false,
      memoryPersistenceReady: false,
      automaticTaskCreationReady: false,
      automaticInterventionCreationReady: false,
      automaticExecutionReady: false,
    },
    safety: {
      providerCalled: false,
      persistencePerformed: false,
      memoryPersistencePerformed: false,
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
      memoryPersistenceAllowed: false,
      publicShareAllowed: false,
      productPrescriptionAllowed: false,
      dosageAdviceAllowed: false,
      manualDispatchOnly: true,
      humanReviewRequired: true,
      localAnalysisOnly: true,
      localLearningOnly: true,
      localMemoryOnly: true,
      redactedOutputOnly: true,
    },
  };
}

export function createReadyCaseOutcomeLearningReport() {
  return createCaseOutcomeLearningReport(createCaseOutcomeLearningFixture());
}

export function createBlockedCaseOutcomeLearningReport() {
  return createCaseOutcomeLearningReport(defaultCaseOutcomeLearningInput);
}

export function formatCaseOutcomeLearningReport(report: CaseOutcomeLearningReport) {
  return [
    "AI Case Outcome Learning Loop & Memory Update Draft",
    "",
    `Learning ID: ${report.learningId}`,
    `Learning fingerprint: ${report.learningFingerprint}`,
    `Version: ${report.learningVersion}`,
    `Mode: ${report.mode}`,
    `caseOutcomeLearningReady=${report.caseOutcomeLearningReady}`,
    "",
    "Input summary:",
    `- farmId=${report.inputSummary.farmId || "missing"}`,
    `- farmName=${report.inputSummary.farmName || "missing"}`,
    `- learningWindowLabel=${report.inputSummary.learningWindowLabel || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- caseId=${report.inputSummary.caseId || "missing"}`,
    `- fieldId=${report.inputSummary.fieldId || "missing"}`,
    `- crop=${report.inputSummary.crop || "missing"}`,
    `- recommendationCount=${report.inputSummary.recommendationCount}`,
    `- observationCount=${report.inputSummary.observationCount}`,
    `- sourceMemoryCaseCount=${report.inputSummary.sourceMemoryCaseCount}`,
    `- sourceRetrievalFingerprintCount=${report.inputSummary.sourceRetrievalFingerprintCount}`,
    `- alignedRecommendationCount=${report.inputSummary.alignedRecommendationCount}`,
    `- revisedRecommendationCount=${report.inputSummary.revisedRecommendationCount}`,
    `- blockedRecommendationCount=${report.inputSummary.blockedRecommendationCount}`,
    `- lessonCardCount=${report.inputSummary.lessonCardCount}`,
    `- memoryUpdateDraftCount=${report.inputSummary.memoryUpdateDraftCount}`,
    `- driftSignalCount=${report.inputSummary.driftSignalCount}`,
    "- humanReviewRequired=true",
    "",
    "Learning summary:",
    `- learningStatus=${report.learningSummary.learningStatus}`,
    `- latestOutcomeLabel=${report.learningSummary.latestOutcomeLabel}`,
    `- confidenceDelta=${report.learningSummary.confidenceDelta}`,
    `- riskDeltaLabel=${report.learningSummary.riskDeltaLabel}`,
    `- topLearningSignal=${report.learningSummary.topLearningSignal}`,
    `- nextHumanAction=${report.learningSummary.nextHumanAction}`,
    `- confidenceScore=${report.learningSummary.confidenceScore}`,
    ...report.learningSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Outcome evidence timeline:",
    ...report.outcomeTimeline.map(
      (item) =>
        `- ${item.observationId} | outcome=${item.outcomeLabel} | riskAfter=${item.riskTierAfter} | review=${item.reviewStatus}`,
    ),
    "",
    "Recommendation outcome matrix:",
    ...report.recommendationOutcomeMatrix.map(
      (item) =>
        `- ${item.recommendationId} | expected=${item.expectedOutcome} | observed=${item.observedOutcome} | alignment=${item.alignmentScore} | decision=${item.outcomeDecision}`,
    ),
    "",
    "Lesson cards:",
    ...report.lessonCards.map(
      (item) =>
        `- ${item.lessonId} | type=${item.lessonType} | reusable=${item.reusableForMemory} | confidence=${item.confidenceScore}`,
    ),
    "",
    "Memory update drafts:",
    ...report.memoryUpdateDrafts.map(
      (item) =>
        `- ${item.draftId} | type=${item.updateType} | decision=${item.updateDecision} | localDraftOnly=${item.localDraftOnly}`,
    ),
    "",
    "Drift signals:",
    ...report.driftSignals.map(
      (item) =>
        `- ${item.driftId} | type=${item.signalType} | severity=${item.severity} | next=${item.nextHumanCheck}`,
    ),
    "",
    "Reviewer learning briefing:",
    `- ${report.reviewerLearningBriefing.title}`,
    `- ${report.reviewerLearningBriefing.headline}`,
    ...report.reviewerLearningBriefing.summaryLines.map((line) => `- ${line}`),
    "",
    "Learning export packet:",
    `- exportId=${report.learningExportPacket.exportId}`,
    `- artifactNames=${report.learningExportPacket.artifactNames.join(", ")}`,
    "- redactedOnly=true",
    "- localLearningOnly=true",
    "- localMemoryOnly=true",
    "- publicShareAllowed=false",
    "- dbPersistenceAllowed=false",
    "",
    "Premium signals:",
    `- caseOutcomeLearningReady=${report.premiumSignals.caseOutcomeLearningReady}`,
    `- outcomeTimelineReady=${report.premiumSignals.outcomeTimelineReady}`,
    `- recommendationOutcomeMatrixReady=${report.premiumSignals.recommendationOutcomeMatrixReady}`,
    `- lessonCardsReady=${report.premiumSignals.lessonCardsReady}`,
    `- memoryUpdateDraftsReady=${report.premiumSignals.memoryUpdateDraftsReady}`,
    `- driftSignalsReady=${report.premiumSignals.driftSignalsReady}`,
    `- reviewerLearningBriefingReady=${report.premiumSignals.reviewerLearningBriefingReady}`,
    `- learningExportPacketReady=${report.premiumSignals.learningExportPacketReady}`,
    "- providerAiReady=false",
    "- persistenceReady=false",
    "- memoryPersistenceReady=false",
    "- automaticTaskCreationReady=false",
    "- automaticInterventionCreationReady=false",
    "- automaticExecutionReady=false",
    "",
    "Safety:",
    "- providerCalled=false",
    "- persistencePerformed=false",
    "- memoryPersistencePerformed=false",
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
    "- memoryPersistenceAllowed=false",
    "- publicShareAllowed=false",
    "- productPrescriptionAllowed=false",
    "- dosageAdviceAllowed=false",
    "- manualDispatchOnly=true",
    "- humanReviewRequired=true",
    "- localAnalysisOnly=true",
    "- localLearningOnly=true",
    "- localMemoryOnly=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
