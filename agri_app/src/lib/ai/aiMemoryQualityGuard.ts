export type MemoryQualityRiskTier = "low" | "watch" | "high" | "critical";
export type MemoryQualityFindingSeverity = "low" | "medium" | "high";
export type MemoryQualityDecision = "keep" | "revise" | "quarantine" | "reject" | "needs-review";
export type MemoryQualityFindingType =
  | "evidence-weak"
  | "conflict"
  | "stale"
  | "bias-drift"
  | "review-gap"
  | "blocked"
  | "quality-ok";

export type MemoryQualityCandidateInput = {
  candidateId: string;
  sourceCaseId: string;
  sourceLearningId: string;
  sourceMemoryVersion: string;
  crop: string;
  fieldName: string;
  tags: string[];
  insightLines: string[];
  evidenceLinks: string[];
  outcomeLabels: string[];
  reviewerNotes: string[];
  confidenceScore: number;
  alignmentScore: number;
  reviewerCoverageScore: number;
  ageDays: number;
  reuseCount: number;
  conflictTags: string[];
  driftSignals: string[];
  humanReviewed: boolean;
  blocked: boolean;
  blockedReasons: string[];
};

export type MemoryQualityGuardInput = {
  farmId: string;
  farmName: string;
  qualityWindowLabel: string;
  operatorName: string;
  currentMemoryVersion: string;
  targetQualityVersion: string;
  candidates: MemoryQualityCandidateInput[];
  includeEvidenceAdequacyMatrix: boolean;
  includeConflictClusters: boolean;
  includeStaleInsightDetector: boolean;
  includeBiasDriftFindings: boolean;
  includeQuarantineRecommendations: boolean;
  includeQualityImprovementPlan: boolean;
  includeReviewerQualityBriefing: boolean;
  includeQualityExportPacket: boolean;
  humanReviewRequired: boolean;
};

export type EvidenceAdequacyMatrixItem = {
  matrixId: string;
  candidateId: string;
  sourceCaseId: string;
  evidenceCount: number;
  reviewerCoverageScore: number;
  alignmentScore: number;
  adequacyScore: number;
  adequacyLabel: "strong" | "usable" | "weak" | "blocked";
  missingEvidenceHints: string[];
};

export type MemoryConflictCluster = {
  clusterId: string;
  candidateIds: string[];
  conflictTags: string[];
  conflictSeverity: MemoryQualityFindingSeverity;
  conflictReason: string;
  requiredHumanResolution: string;
};

export type StaleInsightFinding = {
  staleId: string;
  candidateId: string;
  ageDays: number;
  staleSeverity: MemoryQualityFindingSeverity;
  staleReason: string;
  refreshRecommendation: string;
};

export type BiasDriftFinding = {
  driftId: string;
  candidateId: string;
  driftSeverity: MemoryQualityFindingSeverity;
  driftSignals: string[];
  biasRiskLabel: string;
  requiredHumanCheck: string;
};

export type QuarantineRecommendation = {
  quarantineId: string;
  candidateId: string;
  qualityDecision: MemoryQualityDecision;
  quarantineReason: string;
  releaseConditions: string[];
  manualOnly: true;
};

export type QualityImprovementPlanItem = {
  planId: string;
  candidateId: string;
  findingType: MemoryQualityFindingType;
  priorityScore: number;
  improvementAction: string;
  expectedQualityGain: number;
  automaticFixAllowed: false;
};

export type ReviewerQualityBriefing = {
  briefingId: string;
  title: string;
  headline: string;
  summaryLines: string[];
  reviewerQuestions: string[];
  nextManualActions: string[];
  redactedForOperations: true;
};

export type MemoryQualityExportPacket = {
  exportId: string;
  artifactNames: string[];
  redactedOnly: true;
  localQualityOnly: true;
  localMemoryOnly: true;
  publicShareAllowed: false;
  dbPersistenceAllowed: false;
  memoryPersistenceAllowed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
};

export type MemoryQualityGuardReport = {
  ok: true;
  mode: "memory-quality-guard-dry-run";
  qualityVersion: "agri-ai-memory-quality-guard-v1";
  qualityId: string;
  qualityFingerprint: string;
  memoryQualityGuardReady: boolean;
  inputSummary: {
    farmId: string;
    farmName: string;
    qualityWindowLabel: string;
    operatorName: string;
    currentMemoryVersion: string;
    targetQualityVersion: string;
    candidateCount: number;
    strongCandidateCount: number;
    weakCandidateCount: number;
    conflictClusterCount: number;
    staleFindingCount: number;
    driftFindingCount: number;
    quarantineRecommendationCount: number;
    humanReviewRequired: true;
  };
  evidenceAdequacyMatrix: EvidenceAdequacyMatrixItem[];
  conflictClusters: MemoryConflictCluster[];
  staleInsightFindings: StaleInsightFinding[];
  biasDriftFindings: BiasDriftFinding[];
  quarantineRecommendations: QuarantineRecommendation[];
  qualityImprovementPlan: QualityImprovementPlanItem[];
  reviewerQualityBriefing: ReviewerQualityBriefing;
  qualityExportPacket: MemoryQualityExportPacket;
  qualitySummary: {
    qualityStatus: "empty" | "usable" | "quality-ready" | "blocked-review";
    memoryQualityScore: number;
    topQualityCandidateId: string;
    highestRiskCandidateId: string;
    nextHumanAction: string;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    memoryQualityGuardReady: boolean;
    evidenceAdequacyMatrixReady: boolean;
    conflictDetectionReady: boolean;
    staleInsightDetectorReady: boolean;
    biasDriftGuardReady: boolean;
    quarantineRecommendationsReady: boolean;
    qualityImprovementPlanReady: boolean;
    reviewerQualityBriefingReady: boolean;
    qualityExportPacketReady: boolean;
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
    memoryPromotionPerformed: false;
    memoryQualityWritePerformed: false;
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
    memoryPromotionAllowed: false;
    memoryQualityWriteAllowed: false;
    publicShareAllowed: false;
    productPrescriptionAllowed: false;
    dosageAdviceAllowed: false;
    manualDispatchOnly: true;
    humanReviewRequired: true;
    localAnalysisOnly: true;
    localQualityOnly: true;
    localMemoryOnly: true;
    redactedOutputOnly: true;
  };
};

export const defaultMemoryQualityGuardInput: MemoryQualityGuardInput = {
  farmId: "",
  farmName: "",
  qualityWindowLabel: "",
  operatorName: "",
  currentMemoryVersion: "",
  targetQualityVersion: "",
  candidates: [],
  includeEvidenceAdequacyMatrix: true,
  includeConflictClusters: true,
  includeStaleInsightDetector: true,
  includeBiasDriftFindings: true,
  includeQuarantineRecommendations: true,
  includeQualityImprovementPlan: true,
  includeReviewerQualityBriefing: true,
  includeQualityExportPacket: true,
  humanReviewRequired: true,
};

export function createMemoryQualityGuardFixture(): MemoryQualityGuardInput {
  return {
    farmId: "farm-memory-quality-ready",
    farmName: "Azienda Demo Nord",
    qualityWindowLabel: "quality review 90 giorni",
    operatorName: "Responsabile tecnico",
    currentMemoryVersion: "memory-local-v1-draft",
    targetQualityVersion: "memory-quality-v1",
    candidates: [
      {
        candidateId: "quality-candidate-control-photo",
        sourceCaseId: "learning-case-north-active",
        sourceLearningId: "case-outcome-learning-core",
        sourceMemoryVersion: "memory-local-v1-draft",
        crop: "olivo",
        fieldName: "Appezzamento Nord",
        tags: ["olivo", "controllo sano", "macchie fogliari", "appezzamento nord"],
        insightLines: [
          "il controllo sano comparabile aumenta qualità review",
          "pattern bordo nord richiede sequenza temporale",
        ],
        evidenceLinks: ["case-memory-core", "case-retrieval-core", "learning-obs-t2"],
        outcomeLabels: ["stable", "improved"],
        reviewerNotes: ["review confermata", "insight utile ma da validare su casi futuri"],
        confidenceScore: 0.86,
        alignmentScore: 91,
        reviewerCoverageScore: 88,
        ageDays: 18,
        reuseCount: 2,
        conflictTags: [],
        driftSignals: [],
        humanReviewed: true,
        blocked: false,
        blockedReasons: [],
      },
      {
        candidateId: "quality-candidate-review-rule",
        sourceCaseId: "learning-case-north-active",
        sourceLearningId: "case-outcome-learning-core",
        sourceMemoryVersion: "memory-local-v1-draft",
        crop: "olivo",
        fieldName: "Appezzamento Nord",
        tags: ["review", "manual-ready", "olivo"],
        insightLines: [
          "manual-ready non equivale a esecuzione automatica",
          "la review finale va mantenuta prima di qualunque conversione",
        ],
        evidenceLinks: ["case-memory-border", "learning-obs-t1"],
        outcomeLabels: ["stable"],
        reviewerNotes: ["regola governance utile"],
        confidenceScore: 0.77,
        alignmentScore: 73,
        reviewerCoverageScore: 71,
        ageDays: 44,
        reuseCount: 1,
        conflictTags: ["manual-ready"],
        driftSignals: ["policy-review-needed"],
        humanReviewed: true,
        blocked: false,
        blockedReasons: [],
      },
      {
        candidateId: "quality-candidate-negative-example",
        sourceCaseId: "learning-case-east",
        sourceLearningId: "case-outcome-learning-east",
        sourceMemoryVersion: "memory-local-v1-draft",
        crop: "vite",
        fieldName: "Appezzamento Est",
        tags: ["vite", "stress idrico sospetto", "evidenza parziale"],
        insightLines: [
          "non promuovere insight con evidenza parziale senza controllo sano",
        ],
        evidenceLinks: ["case-memory-east"],
        outcomeLabels: ["unknown"],
        reviewerNotes: ["da bloccare fino a nuova evidenza"],
        confidenceScore: 0.51,
        alignmentScore: 38,
        reviewerCoverageScore: 42,
        ageDays: 122,
        reuseCount: 0,
        conflictTags: ["evidenza parziale", "controllo sano mancante"],
        driftSignals: ["low-confidence", "stale-context"],
        humanReviewed: false,
        blocked: true,
        blockedReasons: ["review mancante", "evidenza insufficiente"],
      },
    ],
    includeEvidenceAdequacyMatrix: true,
    includeConflictClusters: true,
    includeStaleInsightDetector: true,
    includeBiasDriftFindings: true,
    includeQuarantineRecommendations: true,
    includeQualityImprovementPlan: true,
    includeReviewerQualityBriefing: true,
    includeQualityExportPacket: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `memory-quality-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function slug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "unknown";
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function severityFromScore(score: number): MemoryQualityFindingSeverity {
  if (score >= 75) return "low";
  if (score >= 50) return "medium";
  return "high";
}

function adequacyScore(candidate: MemoryQualityCandidateInput) {
  return Math.round(
    clamp(
      candidate.evidenceLinks.length * 14 +
        candidate.reviewerCoverageScore * 0.28 +
        candidate.alignmentScore * 0.24 +
        candidate.confidenceScore * 28 -
        (candidate.blocked ? 35 : 0) -
        candidate.blockedReasons.length * 6,
    ),
  );
}

function adequacyLabel(score: number, candidate: MemoryQualityCandidateInput): EvidenceAdequacyMatrixItem["adequacyLabel"] {
  if (candidate.blocked) return "blocked";
  if (score >= 78) return "strong";
  if (score >= 58) return "usable";
  return "weak";
}

function createEvidenceAdequacyMatrix(input: MemoryQualityGuardInput): EvidenceAdequacyMatrixItem[] {
  return input.candidates.map((candidate): EvidenceAdequacyMatrixItem => {
    const score = adequacyScore(candidate);
    const missingEvidenceHints: string[] = [];

    if (candidate.evidenceLinks.length < 2) {
      missingEvidenceHints.push("aggiungere almeno due evidenze collegate");
    }

    if (!candidate.humanReviewed) {
      missingEvidenceHints.push("aggiungere review umana");
    }

    if (candidate.reviewerCoverageScore < 60) {
      missingEvidenceHints.push("migliorare copertura revisore");
    }

    if (candidate.alignmentScore < 60) {
      missingEvidenceHints.push("rivedere allineamento outcome");
    }

    return {
      matrixId: `evidence-adequacy-${candidate.candidateId}`,
      candidateId: candidate.candidateId,
      sourceCaseId: candidate.sourceCaseId,
      evidenceCount: candidate.evidenceLinks.length,
      reviewerCoverageScore: candidate.reviewerCoverageScore,
      alignmentScore: candidate.alignmentScore,
      adequacyScore: score,
      adequacyLabel: adequacyLabel(score, candidate),
      missingEvidenceHints,
    };
  });
}

function createConflictClusters(input: MemoryQualityGuardInput): MemoryConflictCluster[] {
  const conflictMap = new Map<string, MemoryQualityCandidateInput[]>();

  for (const candidate of input.candidates) {
    for (const tag of candidate.conflictTags) {
      const existing = conflictMap.get(tag) || [];
      existing.push(candidate);
      conflictMap.set(tag, existing);
    }
  }

  return Array.from(conflictMap.entries()).map(([tag, candidates]): MemoryConflictCluster => {
    const blockedCount = candidates.filter((item) => item.blocked).length;
    const severity: MemoryQualityFindingSeverity =
      blockedCount > 0 || candidates.some((item) => item.driftSignals.length > 1)
        ? "high"
        : candidates.length > 1
          ? "medium"
          : "low";

    return {
      clusterId: `conflict-cluster-${slug(tag)}`,
      candidateIds: candidates.map((item) => item.candidateId),
      conflictTags: [tag],
      conflictSeverity: severity,
      conflictReason: `tag conflittuale=${tag}; candidates=${candidates.length}; blocked=${blockedCount}`,
      requiredHumanResolution:
        severity === "high"
          ? "risolvere conflitto prima di promuovere"
          : "validare conflitto con revisore",
    };
  });
}

function createStaleInsightFindings(input: MemoryQualityGuardInput): StaleInsightFinding[] {
  return input.candidates
    .filter((candidate) => candidate.ageDays >= 30)
    .map((candidate): StaleInsightFinding => ({
      staleId: `stale-${candidate.candidateId}`,
      candidateId: candidate.candidateId,
      ageDays: candidate.ageDays,
      staleSeverity:
        candidate.ageDays >= 120
          ? "high"
          : candidate.ageDays >= 60
            ? "medium"
            : "low",
      staleReason: `candidate ageDays=${candidate.ageDays}`,
      refreshRecommendation:
        candidate.ageDays >= 120
          ? "raccogliere nuova evidenza prima di qualunque riuso"
          : "validare freshness con follow-up",
    }));
}

function createBiasDriftFindings(input: MemoryQualityGuardInput): BiasDriftFinding[] {
  return input.candidates
    .filter((candidate) => candidate.driftSignals.length > 0 || candidate.confidenceScore < 0.62)
    .map((candidate): BiasDriftFinding => ({
      driftId: `bias-drift-${candidate.candidateId}`,
      candidateId: candidate.candidateId,
      driftSeverity:
        candidate.driftSignals.length >= 2 || candidate.confidenceScore < 0.55
          ? "high"
          : candidate.driftSignals.length === 1
            ? "medium"
            : "low",
      driftSignals: candidate.driftSignals,
      biasRiskLabel:
        candidate.confidenceScore < 0.55
          ? "low-confidence-memory-risk"
          : candidate.driftSignals.length
            ? "context-drift-risk"
            : "minor-bias-risk",
      requiredHumanCheck: "verificare contesto, coltura, evidenza e outcome prima di riuso",
    }));
}

function qualityDecision(
  candidate: MemoryQualityCandidateInput,
  matrix?: EvidenceAdequacyMatrixItem,
  hasDrift?: boolean,
): MemoryQualityDecision {
  if (candidate.blocked) return "quarantine";
  if (!candidate.humanReviewed) return "needs-review";
  if (hasDrift && candidate.confidenceScore < 0.65) return "quarantine";
  if ((matrix?.adequacyScore || 0) >= 78 && candidate.alignmentScore >= 75) return "keep";
  if ((matrix?.adequacyScore || 0) >= 55) return "revise";
  return "reject";
}

function createQuarantineRecommendations(
  input: MemoryQualityGuardInput,
  matrix: EvidenceAdequacyMatrixItem[],
  driftFindings: BiasDriftFinding[],
): QuarantineRecommendation[] {
  return input.candidates
    .map((candidate): QuarantineRecommendation => {
      const matrixItem = matrix.find((item) => item.candidateId === candidate.candidateId);
      const drift = driftFindings.find((item) => item.candidateId === candidate.candidateId);
      const decision = qualityDecision(candidate, matrixItem, Boolean(drift));

      return {
        quarantineId: `quarantine-${candidate.candidateId}`,
        candidateId: candidate.candidateId,
        qualityDecision: decision,
        quarantineReason: [
          `blocked=${candidate.blocked}`,
          `humanReviewed=${candidate.humanReviewed}`,
          `adequacy=${matrixItem?.adequacyScore || 0}`,
          `drift=${Boolean(drift)}`,
        ].join(" | "),
        releaseConditions:
          decision === "quarantine" || decision === "needs-review" || decision === "reject"
            ? [
                "review umana completata",
                "evidenza sufficiente",
                "conflitti risolti",
                "drift rivalutato",
              ]
            : ["nessuna release automatica; mantenere audit manuale"],
        manualOnly: true,
      };
    })
    .filter((item) => item.qualityDecision !== "keep");
}

function createQualityImprovementPlan(
  input: MemoryQualityGuardInput,
  matrix: EvidenceAdequacyMatrixItem[],
  conflicts: MemoryConflictCluster[],
  stale: StaleInsightFinding[],
  drift: BiasDriftFinding[],
): QualityImprovementPlanItem[] {
  return input.candidates.map((candidate): QualityImprovementPlanItem => {
    const matrixItem = matrix.find((item) => item.candidateId === candidate.candidateId);
    const conflict = conflicts.find((item) => item.candidateIds.includes(candidate.candidateId));
    const staleItem = stale.find((item) => item.candidateId === candidate.candidateId);
    const driftItem = drift.find((item) => item.candidateId === candidate.candidateId);
    const findingType: MemoryQualityFindingType =
      candidate.blocked
        ? "blocked"
        : conflict
          ? "conflict"
          : driftItem
            ? "bias-drift"
            : staleItem
              ? "stale"
              : !candidate.humanReviewed
                ? "review-gap"
                : (matrixItem?.adequacyScore || 0) < 58
                  ? "evidence-weak"
                  : "quality-ok";

    return {
      planId: `quality-plan-${candidate.candidateId}`,
      candidateId: candidate.candidateId,
      findingType,
      priorityScore: Math.round(
        clamp(
          100 -
            (matrixItem?.adequacyScore || 0) +
            (conflict ? 18 : 0) +
            (staleItem ? 12 : 0) +
            (driftItem ? 20 : 0) +
            (candidate.blocked ? 25 : 0),
        ),
      ),
      improvementAction:
        findingType === "quality-ok"
          ? "mantenere audit periodico"
          : findingType === "blocked"
            ? "risolvere blocchi e review"
            : findingType === "conflict"
              ? "risolvere cluster conflittuale"
              : findingType === "bias-drift"
                ? "rivalutare drift e contesto"
                : findingType === "stale"
                  ? "aggiornare evidenza e freshness"
                  : findingType === "review-gap"
                    ? "completare review umana"
                    : "rafforzare evidenza collegata",
      expectedQualityGain:
        findingType === "quality-ok" ? 5 : findingType === "blocked" ? 35 : findingType === "evidence-weak" ? 25 : 18,
      automaticFixAllowed: false,
    };
  }).sort((a, b) => b.priorityScore - a.priorityScore);
}

function createReviewerBriefing(
  input: MemoryQualityGuardInput,
  matrix: EvidenceAdequacyMatrixItem[],
  conflicts: MemoryConflictCluster[],
  stale: StaleInsightFinding[],
  drift: BiasDriftFinding[],
  quarantine: QuarantineRecommendation[],
): ReviewerQualityBriefing {
  return {
    briefingId: `quality-briefing-${input.farmId || "draft"}`,
    title: "Memory quality reviewer briefing",
    headline: `Candidati=${input.candidates.length}; quarantena=${quarantine.length}; conflitti=${conflicts.length}`,
    summaryLines: [
      `farm=${input.farmName || "missing"}`,
      `currentMemoryVersion=${input.currentMemoryVersion || "missing"}`,
      `targetQualityVersion=${input.targetQualityVersion || "missing"}`,
      `strong=${matrix.filter((item) => item.adequacyLabel === "strong").length}`,
      `weak=${matrix.filter((item) => item.adequacyLabel === "weak").length}`,
      `stale=${stale.length}`,
      `drift=${drift.length}`,
      "localQualityOnly=true",
    ],
    reviewerQuestions: [
      "Quali insight sono sufficientemente robusti?",
      "Quali candidati vanno messi in quarantena?",
      "I conflitti sono reali o solo tag simili?",
      "Gli insight sono ancora freschi per coltura e contesto?",
    ],
    nextManualActions:
      quarantine.length > 0
        ? ["review candidati in quarantena", "risolvere conflitti", "aggiornare evidenza debole"]
        : ["validare matrice qualità", "preparare snapshot quality", "archiviare export redatto"],
    redactedForOperations: true,
  };
}

function createQualityExportPacket(qualityId: string): MemoryQualityExportPacket {
  return {
    exportId: `memory-quality-export-${qualityId}`,
    artifactNames: [
      "memory-quality-summary.txt",
      "evidence-adequacy-matrix.json",
      "conflict-clusters.json",
      "stale-insight-findings.json",
      "bias-drift-findings.json",
      "quarantine-recommendations.json",
      "quality-improvement-plan.json",
      "reviewer-quality-briefing.json",
      "safety-guard.json",
    ],
    redactedOnly: true,
    localQualityOnly: true,
    localMemoryOnly: true,
    publicShareAllowed: false,
    dbPersistenceAllowed: false,
    memoryPersistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
  };
}

function qualityStatus(
  input: MemoryQualityGuardInput,
  matrix: EvidenceAdequacyMatrixItem[],
  quarantine: QuarantineRecommendation[],
): MemoryQualityGuardReport["qualitySummary"]["qualityStatus"] {
  if (!input.candidates.length) return "empty";
  if (quarantine.some((item) => item.qualityDecision === "quarantine")) return "blocked-review";
  if (matrix.filter((item) => item.adequacyLabel === "strong").length >= 1 && quarantine.length === 0) return "quality-ready";
  return "usable";
}

export function createMemoryQualityGuardReport(
  input: MemoryQualityGuardInput = defaultMemoryQualityGuardInput,
): MemoryQualityGuardReport {
  const normalizedInput: MemoryQualityGuardInput = {
    ...input,
    candidates: input.candidates.map((candidate): MemoryQualityCandidateInput => ({
      ...candidate,
      tags: normalize(candidate.tags || []),
      insightLines: normalize(candidate.insightLines || []),
      evidenceLinks: normalize(candidate.evidenceLinks || []),
      outcomeLabels: normalize(candidate.outcomeLabels || []),
      reviewerNotes: normalize(candidate.reviewerNotes || []),
      conflictTags: normalize(candidate.conflictTags || []),
      driftSignals: normalize(candidate.driftSignals || []),
      blockedReasons: normalize(candidate.blockedReasons || []),
    })),
  };
  const evidenceAdequacyMatrix = input.includeEvidenceAdequacyMatrix
    ? createEvidenceAdequacyMatrix(normalizedInput)
    : [];
  const conflictClusters = input.includeConflictClusters ? createConflictClusters(normalizedInput) : [];
  const staleInsightFindings = input.includeStaleInsightDetector ? createStaleInsightFindings(normalizedInput) : [];
  const biasDriftFindings = input.includeBiasDriftFindings ? createBiasDriftFindings(normalizedInput) : [];
  const quarantineRecommendations = input.includeQuarantineRecommendations
    ? createQuarantineRecommendations(normalizedInput, evidenceAdequacyMatrix, biasDriftFindings)
    : [];
  const qualityImprovementPlan = input.includeQualityImprovementPlan
    ? createQualityImprovementPlan(
        normalizedInput,
        evidenceAdequacyMatrix,
        conflictClusters,
        staleInsightFindings,
        biasDriftFindings,
      )
    : [];
  const reviewerQualityBriefing = createReviewerBriefing(
    normalizedInput,
    evidenceAdequacyMatrix,
    conflictClusters,
    staleInsightFindings,
    biasDriftFindings,
    quarantineRecommendations,
  );
  const strongCandidateCount = evidenceAdequacyMatrix.filter((item) => item.adequacyLabel === "strong").length;
  const weakCandidateCount = evidenceAdequacyMatrix.filter((item) => item.adequacyLabel === "weak" || item.adequacyLabel === "blocked").length;
  const highestRisk = qualityImprovementPlan[0];
  const topQuality = evidenceAdequacyMatrix
    .slice()
    .sort((a, b) => b.adequacyScore - a.adequacyScore)[0];
  const memoryQualityGuardReady = Boolean(
    input.farmId.trim() &&
      input.farmName.trim() &&
      input.qualityWindowLabel.trim() &&
      input.operatorName.trim() &&
      input.currentMemoryVersion.trim() &&
      input.targetQualityVersion.trim() &&
      input.humanReviewRequired &&
      normalizedInput.candidates.length >= 1,
  );
  const qualityId = `memory-quality-${input.farmId || "draft"}-${input.targetQualityVersion || "version"}`
    .replace(/[^a-z0-9-]/gi, "-")
    .toLowerCase();
  const qualityFingerprint = fingerprint(
    [
      qualityId,
      input.currentMemoryVersion,
      input.targetQualityVersion,
      normalizedInput.candidates.map((item) => `${item.candidateId}:${item.alignmentScore}:${item.confidenceScore}:${item.ageDays}:${item.blocked}`).join("|"),
      evidenceAdequacyMatrix.map((item) => `${item.candidateId}:${item.adequacyScore}`).join("|"),
      quarantineRecommendations.map((item) => `${item.candidateId}:${item.qualityDecision}`).join("|"),
      String(memoryQualityGuardReady),
    ].join("|"),
  );
  const memoryQualityScore = Math.round(
    clamp(
      evidenceAdequacyMatrix.reduce((total, item) => total + item.adequacyScore, 0) /
        Math.max(1, evidenceAdequacyMatrix.length) -
        conflictClusters.length * 5 -
        staleInsightFindings.filter((item) => item.staleSeverity === "high").length * 8 -
        biasDriftFindings.filter((item) => item.driftSeverity === "high").length * 10 -
        quarantineRecommendations.filter((item) => item.qualityDecision === "quarantine").length * 10,
    ),
  );
  const confidenceScore = Number(
    Math.min(
      0.96,
      0.32 +
        Math.min(normalizedInput.candidates.length, 40) * 0.014 +
        strongCandidateCount * 0.045 +
        Math.max(0, memoryQualityScore) * 0.0025,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "memory-quality-guard-dry-run",
    qualityVersion: "agri-ai-memory-quality-guard-v1",
    qualityId,
    qualityFingerprint,
    memoryQualityGuardReady,
    inputSummary: {
      farmId: input.farmId.trim(),
      farmName: input.farmName.trim(),
      qualityWindowLabel: input.qualityWindowLabel.trim(),
      operatorName: input.operatorName.trim(),
      currentMemoryVersion: input.currentMemoryVersion.trim(),
      targetQualityVersion: input.targetQualityVersion.trim(),
      candidateCount: normalizedInput.candidates.length,
      strongCandidateCount,
      weakCandidateCount,
      conflictClusterCount: conflictClusters.length,
      staleFindingCount: staleInsightFindings.length,
      driftFindingCount: biasDriftFindings.length,
      quarantineRecommendationCount: quarantineRecommendations.length,
      humanReviewRequired: true,
    },
    evidenceAdequacyMatrix,
    conflictClusters,
    staleInsightFindings,
    biasDriftFindings,
    quarantineRecommendations,
    qualityImprovementPlan,
    reviewerQualityBriefing: input.includeReviewerQualityBriefing
      ? reviewerQualityBriefing
      : {
          briefingId: `quality-briefing-${input.farmId || "draft"}`,
          title: "Memory quality reviewer briefing",
          headline: "Briefing disattivato",
          summaryLines: [],
          reviewerQuestions: [],
          nextManualActions: [],
          redactedForOperations: true,
        },
    qualityExportPacket: input.includeQualityExportPacket
      ? createQualityExportPacket(qualityId)
      : createQualityExportPacket("disabled"),
    qualitySummary: {
      qualityStatus: qualityStatus(normalizedInput, evidenceAdequacyMatrix, quarantineRecommendations),
      memoryQualityScore,
      topQualityCandidateId: topQuality?.candidateId || "",
      highestRiskCandidateId: highestRisk?.candidateId || "",
      nextHumanAction:
        quarantineRecommendations.length > 0
          ? "review candidati in quarantena prima di ogni futura persistenza"
          : weakCandidateCount > 0
            ? "rafforzare candidati deboli"
            : conflictClusters.length > 0
              ? "risolvere conflitti memoria"
              : "validare quality export redatto",
      confidenceScore,
      reasons: [
        `candidateCount=${normalizedInput.candidates.length}`,
        `strongCandidateCount=${strongCandidateCount}`,
        `weakCandidateCount=${weakCandidateCount}`,
        `conflictClusterCount=${conflictClusters.length}`,
        `staleFindingCount=${staleInsightFindings.length}`,
        `driftFindingCount=${biasDriftFindings.length}`,
        `quarantineRecommendationCount=${quarantineRecommendations.length}`,
        `memoryQualityScore=${memoryQualityScore}`,
      ],
      blockingLimitations: [
        "nessuna memoria persistente DB",
        "nessuna scrittura qualità memoria",
        "nessuna promozione memoria automatica",
        "nessuna chiamata provider AI live",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
      ],
    },
    premiumSignals: {
      memoryQualityGuardReady,
      evidenceAdequacyMatrixReady: evidenceAdequacyMatrix.length > 0,
      conflictDetectionReady: input.includeConflictClusters,
      staleInsightDetectorReady: input.includeStaleInsightDetector,
      biasDriftGuardReady: input.includeBiasDriftFindings,
      quarantineRecommendationsReady: input.includeQuarantineRecommendations,
      qualityImprovementPlanReady: qualityImprovementPlan.length > 0,
      reviewerQualityBriefingReady: input.includeReviewerQualityBriefing,
      qualityExportPacketReady: input.includeQualityExportPacket,
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
      memoryPromotionPerformed: false,
      memoryQualityWritePerformed: false,
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
      memoryPromotionAllowed: false,
      memoryQualityWriteAllowed: false,
      publicShareAllowed: false,
      productPrescriptionAllowed: false,
      dosageAdviceAllowed: false,
      manualDispatchOnly: true,
      humanReviewRequired: true,
      localAnalysisOnly: true,
      localQualityOnly: true,
      localMemoryOnly: true,
      redactedOutputOnly: true,
    },
  };
}

export function createReadyMemoryQualityGuardReport() {
  return createMemoryQualityGuardReport(createMemoryQualityGuardFixture());
}

export function createBlockedMemoryQualityGuardReport() {
  return createMemoryQualityGuardReport(defaultMemoryQualityGuardInput);
}

export function formatMemoryQualityGuardReport(report: MemoryQualityGuardReport) {
  return [
    "AI Agronomic Memory Quality Guard & Drift Control",
    "",
    `Quality ID: ${report.qualityId}`,
    `Quality fingerprint: ${report.qualityFingerprint}`,
    `Version: ${report.qualityVersion}`,
    `Mode: ${report.mode}`,
    `memoryQualityGuardReady=${report.memoryQualityGuardReady}`,
    "",
    "Input summary:",
    `- farmId=${report.inputSummary.farmId || "missing"}`,
    `- farmName=${report.inputSummary.farmName || "missing"}`,
    `- qualityWindowLabel=${report.inputSummary.qualityWindowLabel || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- currentMemoryVersion=${report.inputSummary.currentMemoryVersion || "missing"}`,
    `- targetQualityVersion=${report.inputSummary.targetQualityVersion || "missing"}`,
    `- candidateCount=${report.inputSummary.candidateCount}`,
    `- strongCandidateCount=${report.inputSummary.strongCandidateCount}`,
    `- weakCandidateCount=${report.inputSummary.weakCandidateCount}`,
    `- conflictClusterCount=${report.inputSummary.conflictClusterCount}`,
    `- staleFindingCount=${report.inputSummary.staleFindingCount}`,
    `- driftFindingCount=${report.inputSummary.driftFindingCount}`,
    `- quarantineRecommendationCount=${report.inputSummary.quarantineRecommendationCount}`,
    "- humanReviewRequired=true",
    "",
    "Quality summary:",
    `- qualityStatus=${report.qualitySummary.qualityStatus}`,
    `- memoryQualityScore=${report.qualitySummary.memoryQualityScore}`,
    `- topQualityCandidateId=${report.qualitySummary.topQualityCandidateId || "none"}`,
    `- highestRiskCandidateId=${report.qualitySummary.highestRiskCandidateId || "none"}`,
    `- nextHumanAction=${report.qualitySummary.nextHumanAction}`,
    `- confidenceScore=${report.qualitySummary.confidenceScore}`,
    ...report.qualitySummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Evidence adequacy matrix:",
    ...report.evidenceAdequacyMatrix.map(
      (item) =>
        `- ${item.candidateId} | adequacy=${item.adequacyScore} | label=${item.adequacyLabel} | evidence=${item.evidenceCount}`,
    ),
    "",
    "Conflict clusters:",
    ...report.conflictClusters.map(
      (item) =>
        `- ${item.clusterId} | severity=${item.conflictSeverity} | candidates=${item.candidateIds.join(", ")}`,
    ),
    "",
    "Stale insight findings:",
    ...report.staleInsightFindings.map(
      (item) =>
        `- ${item.candidateId} | ageDays=${item.ageDays} | severity=${item.staleSeverity}`,
    ),
    "",
    "Bias drift findings:",
    ...report.biasDriftFindings.map(
      (item) =>
        `- ${item.candidateId} | severity=${item.driftSeverity} | risk=${item.biasRiskLabel}`,
    ),
    "",
    "Quarantine recommendations:",
    ...report.quarantineRecommendations.map(
      (item) =>
        `- ${item.candidateId} | decision=${item.qualityDecision} | manualOnly=${item.manualOnly}`,
    ),
    "",
    "Quality improvement plan:",
    ...report.qualityImprovementPlan.map(
      (item) =>
        `- ${item.candidateId} | finding=${item.findingType} | priority=${item.priorityScore} | action=${item.improvementAction}`,
    ),
    "",
    "Reviewer quality briefing:",
    `- ${report.reviewerQualityBriefing.title}`,
    `- ${report.reviewerQualityBriefing.headline}`,
    ...report.reviewerQualityBriefing.summaryLines.map((line) => `- ${line}`),
    "",
    "Quality export packet:",
    `- exportId=${report.qualityExportPacket.exportId}`,
    `- artifactNames=${report.qualityExportPacket.artifactNames.join(", ")}`,
    "- redactedOnly=true",
    "- localQualityOnly=true",
    "- localMemoryOnly=true",
    "- publicShareAllowed=false",
    "- dbPersistenceAllowed=false",
    "- memoryPersistenceAllowed=false",
    "",
    "Premium signals:",
    `- memoryQualityGuardReady=${report.premiumSignals.memoryQualityGuardReady}`,
    `- evidenceAdequacyMatrixReady=${report.premiumSignals.evidenceAdequacyMatrixReady}`,
    `- conflictDetectionReady=${report.premiumSignals.conflictDetectionReady}`,
    `- staleInsightDetectorReady=${report.premiumSignals.staleInsightDetectorReady}`,
    `- biasDriftGuardReady=${report.premiumSignals.biasDriftGuardReady}`,
    `- quarantineRecommendationsReady=${report.premiumSignals.quarantineRecommendationsReady}`,
    `- qualityImprovementPlanReady=${report.premiumSignals.qualityImprovementPlanReady}`,
    `- reviewerQualityBriefingReady=${report.premiumSignals.reviewerQualityBriefingReady}`,
    `- qualityExportPacketReady=${report.premiumSignals.qualityExportPacketReady}`,
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
    "- memoryPromotionPerformed=false",
    "- memoryQualityWritePerformed=false",
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
    "- memoryPromotionAllowed=false",
    "- memoryQualityWriteAllowed=false",
    "- publicShareAllowed=false",
    "- productPrescriptionAllowed=false",
    "- dosageAdviceAllowed=false",
    "- manualDispatchOnly=true",
    "- humanReviewRequired=true",
    "- localAnalysisOnly=true",
    "- localQualityOnly=true",
    "- localMemoryOnly=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
