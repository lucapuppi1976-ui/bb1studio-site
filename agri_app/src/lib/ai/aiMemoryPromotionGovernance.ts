export type MemoryPromotionUpdateType =
  | "add-insight"
  | "revise-insight"
  | "flag-limitation"
  | "add-negative-example"
  | "hold";

export type MemoryPromotionDecision =
  | "promote"
  | "revise"
  | "reject"
  | "hold"
  | "blocked";

export type MemoryPromotionQueueStatus =
  | "eligible"
  | "needs-review"
  | "blocked"
  | "hold";

export type MemoryPatchAction =
  | "add"
  | "revise"
  | "flag"
  | "reject";

export type DriftSeverity = "low" | "medium" | "high";

export type MemoryPromotionCandidateInput = {
  candidateId: string;
  sourceCaseId: string;
  sourceLearningId: string;
  sourceRecommendationId: string;
  updateType: MemoryPromotionUpdateType;
  proposedTags: string[];
  proposedInsightLines: string[];
  evidenceLinks: string[];
  reviewerNote: string;
  confidenceScore: number;
  alignmentScore: number;
  driftSeverity: DriftSeverity;
  humanReviewed: boolean;
  blocked: boolean;
  blockedReasons: string[];
};

export type MemoryPromotionInput = {
  farmId: string;
  farmName: string;
  governanceWindowLabel: string;
  operatorName: string;
  currentMemoryVersion: string;
  targetDraftVersion: string;
  governanceMode: "strict-human-review" | "advisory";
  candidates: MemoryPromotionCandidateInput[];
  includePromotionQueue: boolean;
  includeMemoryPatchDrafts: boolean;
  includeGovernanceDecisionBoard: boolean;
  includeVersionedMemorySnapshotDraft: boolean;
  includeRollbackPlan: boolean;
  includePromotionAuditTrail: boolean;
  includePromotionExportPacket: boolean;
  humanReviewRequired: boolean;
};

export type MemoryPromotionQueueItem = {
  queueId: string;
  candidateId: string;
  sourceCaseId: string;
  status: MemoryPromotionQueueStatus;
  priorityScore: number;
  promotionReadinessScore: number;
  reviewRequired: true;
  queueReason: string;
  blockedReasons: string[];
};

export type MemoryPatchDraft = {
  patchId: string;
  candidateId: string;
  patchAction: MemoryPatchAction;
  proposedMemoryKey: string;
  proposedTags: string[];
  proposedInsightLines: string[];
  evidenceLinks: string[];
  localPatchOnly: true;
  applyAutomaticallyAllowed: false;
};

export type GovernanceDecisionBoardItem = {
  decisionId: string;
  candidateId: string;
  governanceDecision: MemoryPromotionDecision;
  decisionReason: string;
  requiredReviewerAction: string;
  evidenceAdequacyScore: number;
  confidenceScore: number;
  auditRequired: true;
};

export type VersionedMemorySnapshotDraft = {
  snapshotId: string;
  sourceMemoryVersion: string;
  targetDraftVersion: string;
  candidateCount: number;
  promotableCandidateCount: number;
  blockedCandidateCount: number;
  patchCount: number;
  snapshotFingerprint: string;
  localSnapshotOnly: true;
  dbPersistenceAllowed: false;
};

export type RollbackPlanItem = {
  rollbackId: string;
  patchId: string;
  rollbackAction: "remove-draft-patch" | "restore-prior-insight" | "keep-blocked";
  rollbackReason: string;
  manualRollbackOnly: true;
};

export type PromotionAuditTrailItem = {
  auditId: string;
  candidateId: string;
  sourceLearningId: string;
  action: string;
  actor: "system-dry-run" | "human-reviewer";
  auditLine: string;
  redacted: true;
};

export type MemoryPromotionExportPacket = {
  exportId: string;
  artifactNames: string[];
  redactedOnly: true;
  localPromotionOnly: true;
  localMemoryOnly: true;
  publicShareAllowed: false;
  dbPersistenceAllowed: false;
  memoryPersistenceAllowed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
};

export type MemoryPromotionGovernanceReport = {
  ok: true;
  mode: "memory-promotion-governance-dry-run";
  governanceVersion: "agri-ai-memory-promotion-governance-v1";
  governanceId: string;
  governanceFingerprint: string;
  memoryPromotionGovernanceReady: boolean;
  inputSummary: {
    farmId: string;
    farmName: string;
    governanceWindowLabel: string;
    operatorName: string;
    currentMemoryVersion: string;
    targetDraftVersion: string;
    governanceMode: MemoryPromotionInput["governanceMode"];
    candidateCount: number;
    eligibleCandidateCount: number;
    needsReviewCandidateCount: number;
    blockedCandidateCount: number;
    promotablePatchCount: number;
    rejectedPatchCount: number;
    auditTrailCount: number;
    humanReviewRequired: true;
  };
  promotionQueue: MemoryPromotionQueueItem[];
  memoryPatchDrafts: MemoryPatchDraft[];
  governanceDecisionBoard: GovernanceDecisionBoardItem[];
  versionedMemorySnapshotDraft: VersionedMemorySnapshotDraft;
  rollbackPlan: RollbackPlanItem[];
  promotionAuditTrail: PromotionAuditTrailItem[];
  promotionExportPacket: MemoryPromotionExportPacket;
  governanceSummary: {
    governanceStatus: "empty" | "usable" | "promotion-ready" | "blocked-review";
    promotionReadinessScore: number;
    topCandidateId: string;
    nextHumanAction: string;
    confidenceScore: number;
    reasons: string[];
    blockingLimitations: string[];
  };
  premiumSignals: {
    memoryPromotionGovernanceReady: boolean;
    promotionQueueReady: boolean;
    memoryPatchDraftsReady: boolean;
    governanceDecisionBoardReady: boolean;
    versionedMemorySnapshotDraftReady: boolean;
    rollbackPlanReady: boolean;
    promotionAuditTrailReady: boolean;
    promotionExportPacketReady: boolean;
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
    publicShareAllowed: false;
    productPrescriptionAllowed: false;
    dosageAdviceAllowed: false;
    manualDispatchOnly: true;
    humanReviewRequired: true;
    localAnalysisOnly: true;
    localPromotionOnly: true;
    localMemoryOnly: true;
    redactedOutputOnly: true;
  };
};

export const defaultMemoryPromotionInput: MemoryPromotionInput = {
  farmId: "",
  farmName: "",
  governanceWindowLabel: "",
  operatorName: "",
  currentMemoryVersion: "",
  targetDraftVersion: "",
  governanceMode: "strict-human-review",
  candidates: [],
  includePromotionQueue: true,
  includeMemoryPatchDrafts: true,
  includeGovernanceDecisionBoard: true,
  includeVersionedMemorySnapshotDraft: true,
  includeRollbackPlan: true,
  includePromotionAuditTrail: true,
  includePromotionExportPacket: true,
  humanReviewRequired: true,
};

export function createMemoryPromotionFixture(): MemoryPromotionInput {
  return {
    farmId: "farm-memory-promotion-ready",
    farmName: "Azienda Demo Nord",
    governanceWindowLabel: "learning window 30 giorni",
    operatorName: "Responsabile tecnico",
    currentMemoryVersion: "memory-local-v0",
    targetDraftVersion: "memory-local-v1-draft",
    governanceMode: "strict-human-review",
    candidates: [
      {
        candidateId: "promotion-candidate-control-photo",
        sourceCaseId: "learning-case-north-active",
        sourceLearningId: "case-outcome-learning-core",
        sourceRecommendationId: "learning-rec-control-photo",
        updateType: "add-insight",
        proposedTags: ["olivo", "appezzamento nord", "controllo sano", "macchie fogliari"],
        proposedInsightLines: [
          "il controllo sano comparabile aumenta qualità review",
          "pattern bordo nord richiede sequenza temporale",
          "human review obbligatoria prima di riuso operativo",
        ],
        evidenceLinks: ["case-memory-core", "case-retrieval-core", "learning-obs-t2"],
        reviewerNote: "Candidato forte ma da validare manualmente.",
        confidenceScore: 0.84,
        alignmentScore: 92,
        driftSeverity: "low",
        humanReviewed: true,
        blocked: false,
        blockedReasons: [],
      },
      {
        candidateId: "promotion-candidate-review-rule",
        sourceCaseId: "learning-case-north-active",
        sourceLearningId: "case-outcome-learning-core",
        sourceRecommendationId: "learning-rec-review",
        updateType: "revise-insight",
        proposedTags: ["review", "manual-ready", "olivo"],
        proposedInsightLines: [
          "la review finale va mantenuta prima di qualunque conversione",
          "manual-ready non equivale a esecuzione automatica",
        ],
        evidenceLinks: ["case-memory-border", "learning-obs-t1"],
        reviewerNote: "Buona regola governance.",
        confidenceScore: 0.78,
        alignmentScore: 74,
        driftSeverity: "medium",
        humanReviewed: true,
        blocked: false,
        blockedReasons: ["richiede revisione compliance"],
      },
      {
        candidateId: "promotion-candidate-negative-example",
        sourceCaseId: "learning-case-east",
        sourceLearningId: "case-outcome-learning-east",
        sourceRecommendationId: "learning-rec-monitor",
        updateType: "add-negative-example",
        proposedTags: ["vite", "stress idrico sospetto", "evidenza parziale"],
        proposedInsightLines: [
          "non promuovere insight con evidenza parziale senza controllo sano",
          "caso utile solo come negative example",
        ],
        evidenceLinks: ["case-memory-east"],
        reviewerNote: "Da bloccare fino a nuova evidenza.",
        confidenceScore: 0.52,
        alignmentScore: 38,
        driftSeverity: "high",
        humanReviewed: false,
        blocked: true,
        blockedReasons: ["review mancante", "evidenza insufficiente"],
      },
    ],
    includePromotionQueue: true,
    includeMemoryPatchDrafts: true,
    includeGovernanceDecisionBoard: true,
    includeVersionedMemorySnapshotDraft: true,
    includeRollbackPlan: true,
    includePromotionAuditTrail: true,
    includePromotionExportPacket: true,
    humanReviewRequired: true,
  };
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `memory-promotion-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalize(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function slug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "unknown";
}

function driftPenalty(severity: DriftSeverity) {
  return {
    low: 0,
    medium: 10,
    high: 30,
  }[severity];
}

function readinessScore(candidate: MemoryPromotionCandidateInput) {
  return Math.round(
    Math.max(
      0,
      Math.min(
        100,
        candidate.alignmentScore * 0.48 +
          candidate.confidenceScore * 38 +
          (candidate.humanReviewed ? 12 : -18) -
          (candidate.blocked ? 35 : 0) -
          driftPenalty(candidate.driftSeverity) -
          candidate.blockedReasons.length * 5,
      ),
    ),
  );
}

function queueStatus(candidate: MemoryPromotionCandidateInput, score: number): MemoryPromotionQueueStatus {
  if (candidate.blocked || candidate.driftSeverity === "high") return "blocked";
  if (!candidate.humanReviewed) return "needs-review";
  if (score >= 75 && candidate.driftSeverity === "low") return "eligible";
  if (score >= 55) return "needs-review";
  return "hold";
}

function patchAction(candidate: MemoryPromotionCandidateInput): MemoryPatchAction {
  if (candidate.blocked || candidate.driftSeverity === "high") return "reject";
  if (candidate.updateType === "add-insight") return "add";
  if (candidate.updateType === "revise-insight") return "revise";
  if (candidate.updateType === "flag-limitation" || candidate.updateType === "add-negative-example") return "flag";
  return "reject";
}

function governanceDecision(candidate: MemoryPromotionCandidateInput, status: MemoryPromotionQueueStatus): MemoryPromotionDecision {
  if (status === "blocked") return "blocked";
  if (status === "eligible") return "promote";
  if (status === "needs-review") return "revise";
  if (candidate.updateType === "hold") return "hold";
  return "hold";
}

function createPromotionQueue(input: MemoryPromotionInput): MemoryPromotionQueueItem[] {
  return input.candidates
    .map((candidate): MemoryPromotionQueueItem => {
      const promotionReadinessScore = readinessScore(candidate);
      const status = queueStatus(candidate, promotionReadinessScore);

      return {
        queueId: `promotion-queue-${candidate.candidateId}`,
        candidateId: candidate.candidateId,
        sourceCaseId: candidate.sourceCaseId,
        status,
        priorityScore: Math.round(
          Math.max(0, promotionReadinessScore + candidate.proposedInsightLines.length * 2 + candidate.evidenceLinks.length),
        ),
        promotionReadinessScore,
        reviewRequired: true,
        queueReason: [
          `alignmentScore=${candidate.alignmentScore}`,
          `confidenceScore=${candidate.confidenceScore}`,
          `driftSeverity=${candidate.driftSeverity}`,
          `humanReviewed=${candidate.humanReviewed}`,
          `blocked=${candidate.blocked}`,
        ].join(" | "),
        blockedReasons: normalize(candidate.blockedReasons),
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

function createMemoryPatchDrafts(input: MemoryPromotionInput, queue: MemoryPromotionQueueItem[]): MemoryPatchDraft[] {
  return input.candidates.map((candidate): MemoryPatchDraft => {
    const status = queue.find((item) => item.candidateId === candidate.candidateId)?.status || "hold";
    const action = status === "eligible" || status === "needs-review" ? patchAction(candidate) : "reject";

    return {
      patchId: `memory-patch-${candidate.candidateId}`,
      candidateId: candidate.candidateId,
      patchAction: action,
      proposedMemoryKey: `memory/${slug(input.farmId)}/${slug(candidate.sourceCaseId)}/${slug(candidate.candidateId)}`,
      proposedTags: normalize(candidate.proposedTags),
      proposedInsightLines: normalize(candidate.proposedInsightLines),
      evidenceLinks: normalize(candidate.evidenceLinks),
      localPatchOnly: true,
      applyAutomaticallyAllowed: false,
    };
  });
}

function createGovernanceDecisionBoard(
  input: MemoryPromotionInput,
  queue: MemoryPromotionQueueItem[],
): GovernanceDecisionBoardItem[] {
  return input.candidates.map((candidate): GovernanceDecisionBoardItem => {
    const queueItem = queue.find((item) => item.candidateId === candidate.candidateId);
    const status = queueItem?.status || "hold";
    const decision = governanceDecision(candidate, status);
    const evidenceAdequacyScore = Math.round(
      Math.min(100, candidate.evidenceLinks.length * 18 + candidate.proposedInsightLines.length * 10 + (candidate.humanReviewed ? 20 : 0)),
    );

    return {
      decisionId: `governance-decision-${candidate.candidateId}`,
      candidateId: candidate.candidateId,
      governanceDecision: decision,
      decisionReason: [
        `status=${status}`,
        `readiness=${queueItem?.promotionReadinessScore || 0}`,
        `evidenceAdequacyScore=${evidenceAdequacyScore}`,
        `governanceMode=${input.governanceMode}`,
      ].join(" | "),
      requiredReviewerAction:
        decision === "promote"
          ? "validare promozione manuale in memoria futura"
          : decision === "revise"
            ? "rivedere tag, insight ed evidenza"
            : decision === "blocked"
              ? "risolvere blocchi prima di qualsiasi promozione"
              : "tenere in sospeso",
      evidenceAdequacyScore,
      confidenceScore: candidate.confidenceScore,
      auditRequired: true,
    };
  });
}

function createVersionedSnapshot(
  input: MemoryPromotionInput,
  patches: MemoryPatchDraft[],
  decisions: GovernanceDecisionBoardItem[],
): VersionedMemorySnapshotDraft {
  const promotableCandidateCount = decisions.filter((item) => item.governanceDecision === "promote").length;
  const blockedCandidateCount = decisions.filter((item) => item.governanceDecision === "blocked").length;
  const snapshotFingerprint = fingerprint(
    [
      input.farmId,
      input.currentMemoryVersion,
      input.targetDraftVersion,
      patches.map((item) => `${item.patchId}:${item.patchAction}:${item.proposedMemoryKey}`).join("|"),
      decisions.map((item) => `${item.candidateId}:${item.governanceDecision}`).join("|"),
    ].join("|"),
  );

  return {
    snapshotId: `memory-snapshot-draft-${slug(input.targetDraftVersion || "draft")}`,
    sourceMemoryVersion: input.currentMemoryVersion,
    targetDraftVersion: input.targetDraftVersion,
    candidateCount: input.candidates.length,
    promotableCandidateCount,
    blockedCandidateCount,
    patchCount: patches.length,
    snapshotFingerprint,
    localSnapshotOnly: true,
    dbPersistenceAllowed: false,
  };
}

function createRollbackPlan(patches: MemoryPatchDraft[]): RollbackPlanItem[] {
  return patches.map((patch): RollbackPlanItem => ({
    rollbackId: `rollback-${patch.patchId}`,
    patchId: patch.patchId,
    rollbackAction:
      patch.patchAction === "add"
        ? "remove-draft-patch"
        : patch.patchAction === "revise"
          ? "restore-prior-insight"
          : "keep-blocked",
    rollbackReason:
      patch.patchAction === "reject"
        ? "patch non applicabile"
        : "rollback manuale disponibile prima di promozione persistente futura",
    manualRollbackOnly: true,
  }));
}

function createAuditTrail(
  input: MemoryPromotionInput,
  queue: MemoryPromotionQueueItem[],
  decisions: GovernanceDecisionBoardItem[],
): PromotionAuditTrailItem[] {
  const entries: PromotionAuditTrailItem[] = [];

  for (const candidate of input.candidates) {
    const queueItem = queue.find((item) => item.candidateId === candidate.candidateId);
    const decision = decisions.find((item) => item.candidateId === candidate.candidateId);

    entries.push({
      auditId: `audit-queue-${candidate.candidateId}`,
      candidateId: candidate.candidateId,
      sourceLearningId: candidate.sourceLearningId,
      action: "queue-evaluated",
      actor: "system-dry-run",
      auditLine: `candidate=${candidate.candidateId} status=${queueItem?.status || "unknown"} readiness=${queueItem?.promotionReadinessScore || 0}`,
      redacted: true,
    });

    entries.push({
      auditId: `audit-decision-${candidate.candidateId}`,
      candidateId: candidate.candidateId,
      sourceLearningId: candidate.sourceLearningId,
      action: "governance-decision-drafted",
      actor: "system-dry-run",
      auditLine: `candidate=${candidate.candidateId} decision=${decision?.governanceDecision || "unknown"} humanReviewRequired=true`,
      redacted: true,
    });
  }

  return entries;
}

function createExportPacket(governanceId: string): MemoryPromotionExportPacket {
  return {
    exportId: `memory-promotion-export-${governanceId}`,
    artifactNames: [
      "promotion-summary.txt",
      "promotion-queue.json",
      "memory-patch-drafts.json",
      "governance-decision-board.json",
      "versioned-memory-snapshot-draft.json",
      "rollback-plan.json",
      "promotion-audit-trail.json",
      "safety-guard.json",
    ],
    redactedOnly: true,
    localPromotionOnly: true,
    localMemoryOnly: true,
    publicShareAllowed: false,
    dbPersistenceAllowed: false,
    memoryPersistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
  };
}

function governanceStatus(
  input: MemoryPromotionInput,
  queue: MemoryPromotionQueueItem[],
  decisions: GovernanceDecisionBoardItem[],
): MemoryPromotionGovernanceReport["governanceSummary"]["governanceStatus"] {
  if (!input.candidates.length) return "empty";
  if (queue.some((item) => item.status === "blocked")) return "blocked-review";
  if (decisions.some((item) => item.governanceDecision === "promote")) return "promotion-ready";
  return "usable";
}

export function createMemoryPromotionGovernanceReport(
  input: MemoryPromotionInput = defaultMemoryPromotionInput,
): MemoryPromotionGovernanceReport {
  const normalizedInput: MemoryPromotionInput = {
    ...input,
    candidates: input.candidates.map((candidate): MemoryPromotionCandidateInput => ({
      ...candidate,
      proposedTags: normalize(candidate.proposedTags || []),
      proposedInsightLines: normalize(candidate.proposedInsightLines || []),
      evidenceLinks: normalize(candidate.evidenceLinks || []),
      blockedReasons: normalize(candidate.blockedReasons || []),
    })),
  };
  const promotionQueue = input.includePromotionQueue ? createPromotionQueue(normalizedInput) : [];
  const memoryPatchDrafts = input.includeMemoryPatchDrafts
    ? createMemoryPatchDrafts(normalizedInput, promotionQueue)
    : [];
  const governanceDecisionBoard = input.includeGovernanceDecisionBoard
    ? createGovernanceDecisionBoard(normalizedInput, promotionQueue)
    : [];
  const versionedMemorySnapshotDraft = createVersionedSnapshot(
    normalizedInput,
    memoryPatchDrafts,
    governanceDecisionBoard,
  );
  const rollbackPlan = input.includeRollbackPlan ? createRollbackPlan(memoryPatchDrafts) : [];
  const promotionAuditTrail = input.includePromotionAuditTrail
    ? createAuditTrail(normalizedInput, promotionQueue, governanceDecisionBoard)
    : [];
  const eligibleCandidateCount = promotionQueue.filter((item) => item.status === "eligible").length;
  const needsReviewCandidateCount = promotionQueue.filter((item) => item.status === "needs-review").length;
  const blockedCandidateCount = promotionQueue.filter((item) => item.status === "blocked").length;
  const promotablePatchCount = governanceDecisionBoard.filter((item) => item.governanceDecision === "promote").length;
  const rejectedPatchCount = governanceDecisionBoard.filter((item) => item.governanceDecision === "reject" || item.governanceDecision === "blocked").length;
  const topCandidate = promotionQueue[0];
  const memoryPromotionGovernanceReady = Boolean(
    input.farmId.trim() &&
      input.farmName.trim() &&
      input.governanceWindowLabel.trim() &&
      input.operatorName.trim() &&
      input.currentMemoryVersion.trim() &&
      input.targetDraftVersion.trim() &&
      input.humanReviewRequired &&
      normalizedInput.candidates.length >= 1,
  );
  const governanceId = `memory-promotion-${input.farmId || "draft"}-${input.targetDraftVersion || "version"}`
    .replace(/[^a-z0-9-]/gi, "-")
    .toLowerCase();
  const governanceFingerprint = fingerprint(
    [
      governanceId,
      input.currentMemoryVersion,
      input.targetDraftVersion,
      normalizedInput.candidates.map((item) => `${item.candidateId}:${item.updateType}:${item.alignmentScore}:${item.confidenceScore}`).join("|"),
      governanceDecisionBoard.map((item) => `${item.candidateId}:${item.governanceDecision}`).join("|"),
      String(memoryPromotionGovernanceReady),
    ].join("|"),
  );
  const promotionReadinessScore = Math.round(
    Math.min(
      100,
      Math.max(
        0,
        promotionQueue.reduce((total, item) => total + item.promotionReadinessScore, 0) / Math.max(1, promotionQueue.length),
      ),
    ),
  );
  const confidenceScore = Number(
    Math.min(
      0.96,
      0.32 +
        Math.min(normalizedInput.candidates.length, 40) * 0.016 +
        eligibleCandidateCount * 0.04 +
        promotablePatchCount * 0.04 +
        promotionReadinessScore * 0.002,
    ).toFixed(2),
  );

  return {
    ok: true,
    mode: "memory-promotion-governance-dry-run",
    governanceVersion: "agri-ai-memory-promotion-governance-v1",
    governanceId,
    governanceFingerprint,
    memoryPromotionGovernanceReady,
    inputSummary: {
      farmId: input.farmId.trim(),
      farmName: input.farmName.trim(),
      governanceWindowLabel: input.governanceWindowLabel.trim(),
      operatorName: input.operatorName.trim(),
      currentMemoryVersion: input.currentMemoryVersion.trim(),
      targetDraftVersion: input.targetDraftVersion.trim(),
      governanceMode: input.governanceMode,
      candidateCount: normalizedInput.candidates.length,
      eligibleCandidateCount,
      needsReviewCandidateCount,
      blockedCandidateCount,
      promotablePatchCount,
      rejectedPatchCount,
      auditTrailCount: promotionAuditTrail.length,
      humanReviewRequired: true,
    },
    promotionQueue,
    memoryPatchDrafts,
    governanceDecisionBoard,
    versionedMemorySnapshotDraft: input.includeVersionedMemorySnapshotDraft
      ? versionedMemorySnapshotDraft
      : {
          ...versionedMemorySnapshotDraft,
          snapshotId: "memory-snapshot-draft-disabled",
          patchCount: 0,
        },
    rollbackPlan,
    promotionAuditTrail,
    promotionExportPacket: input.includePromotionExportPacket
      ? createExportPacket(governanceId)
      : createExportPacket("disabled"),
    governanceSummary: {
      governanceStatus: governanceStatus(normalizedInput, promotionQueue, governanceDecisionBoard),
      promotionReadinessScore,
      topCandidateId: topCandidate?.candidateId || "",
      nextHumanAction:
        blockedCandidateCount > 0
          ? "risolvere blocchi prima della promozione memoria"
          : promotablePatchCount > 0
            ? "validare patch draft e snapshot prima della persistenza futura"
            : needsReviewCandidateCount > 0
              ? "rivedere candidati in needs-review"
              : "mantenere hold e raccogliere evidenza",
      confidenceScore,
      reasons: [
        `candidateCount=${normalizedInput.candidates.length}`,
        `eligibleCandidateCount=${eligibleCandidateCount}`,
        `needsReviewCandidateCount=${needsReviewCandidateCount}`,
        `blockedCandidateCount=${blockedCandidateCount}`,
        `promotablePatchCount=${promotablePatchCount}`,
        `rejectedPatchCount=${rejectedPatchCount}`,
        `promotionReadinessScore=${promotionReadinessScore}`,
      ],
      blockingLimitations: [
        "nessuna memoria persistente DB",
        "nessuna promozione memoria automatica",
        "nessuna chiamata provider AI live",
        "nessuna creazione automatica task/interventi",
        "nessuna esecuzione automatica",
        "nessuna prescrizione prodotto o dosaggio",
      ],
    },
    premiumSignals: {
      memoryPromotionGovernanceReady,
      promotionQueueReady: promotionQueue.length > 0,
      memoryPatchDraftsReady: memoryPatchDrafts.length > 0,
      governanceDecisionBoardReady: governanceDecisionBoard.length > 0,
      versionedMemorySnapshotDraftReady: input.includeVersionedMemorySnapshotDraft,
      rollbackPlanReady: rollbackPlan.length > 0,
      promotionAuditTrailReady: promotionAuditTrail.length > 0,
      promotionExportPacketReady: input.includePromotionExportPacket,
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
      publicShareAllowed: false,
      productPrescriptionAllowed: false,
      dosageAdviceAllowed: false,
      manualDispatchOnly: true,
      humanReviewRequired: true,
      localAnalysisOnly: true,
      localPromotionOnly: true,
      localMemoryOnly: true,
      redactedOutputOnly: true,
    },
  };
}

export function createReadyMemoryPromotionGovernanceReport() {
  return createMemoryPromotionGovernanceReport(createMemoryPromotionFixture());
}

export function createBlockedMemoryPromotionGovernanceReport() {
  return createMemoryPromotionGovernanceReport(defaultMemoryPromotionInput);
}

export function formatMemoryPromotionGovernanceReport(report: MemoryPromotionGovernanceReport) {
  return [
    "AI Memory Promotion Governance & Versioned Knowledge Draft",
    "",
    `Governance ID: ${report.governanceId}`,
    `Governance fingerprint: ${report.governanceFingerprint}`,
    `Version: ${report.governanceVersion}`,
    `Mode: ${report.mode}`,
    `memoryPromotionGovernanceReady=${report.memoryPromotionGovernanceReady}`,
    "",
    "Input summary:",
    `- farmId=${report.inputSummary.farmId || "missing"}`,
    `- farmName=${report.inputSummary.farmName || "missing"}`,
    `- governanceWindowLabel=${report.inputSummary.governanceWindowLabel || "missing"}`,
    `- operatorName=${report.inputSummary.operatorName || "missing"}`,
    `- currentMemoryVersion=${report.inputSummary.currentMemoryVersion || "missing"}`,
    `- targetDraftVersion=${report.inputSummary.targetDraftVersion || "missing"}`,
    `- governanceMode=${report.inputSummary.governanceMode}`,
    `- candidateCount=${report.inputSummary.candidateCount}`,
    `- eligibleCandidateCount=${report.inputSummary.eligibleCandidateCount}`,
    `- needsReviewCandidateCount=${report.inputSummary.needsReviewCandidateCount}`,
    `- blockedCandidateCount=${report.inputSummary.blockedCandidateCount}`,
    `- promotablePatchCount=${report.inputSummary.promotablePatchCount}`,
    `- rejectedPatchCount=${report.inputSummary.rejectedPatchCount}`,
    `- auditTrailCount=${report.inputSummary.auditTrailCount}`,
    "- humanReviewRequired=true",
    "",
    "Governance summary:",
    `- governanceStatus=${report.governanceSummary.governanceStatus}`,
    `- promotionReadinessScore=${report.governanceSummary.promotionReadinessScore}`,
    `- topCandidateId=${report.governanceSummary.topCandidateId || "none"}`,
    `- nextHumanAction=${report.governanceSummary.nextHumanAction}`,
    `- confidenceScore=${report.governanceSummary.confidenceScore}`,
    ...report.governanceSummary.reasons.map((reason) => `- reason=${reason}`),
    "",
    "Promotion queue:",
    ...report.promotionQueue.map(
      (item) =>
        `- ${item.candidateId} | status=${item.status} | readiness=${item.promotionReadinessScore} | priority=${item.priorityScore}`,
    ),
    "",
    "Memory patch drafts:",
    ...report.memoryPatchDrafts.map(
      (item) =>
        `- ${item.patchId} | action=${item.patchAction} | key=${item.proposedMemoryKey} | localPatchOnly=${item.localPatchOnly}`,
    ),
    "",
    "Governance decision board:",
    ...report.governanceDecisionBoard.map(
      (item) =>
        `- ${item.candidateId} | decision=${item.governanceDecision} | evidenceAdequacyScore=${item.evidenceAdequacyScore}`,
    ),
    "",
    "Versioned memory snapshot draft:",
    `- snapshotId=${report.versionedMemorySnapshotDraft.snapshotId}`,
    `- sourceMemoryVersion=${report.versionedMemorySnapshotDraft.sourceMemoryVersion}`,
    `- targetDraftVersion=${report.versionedMemorySnapshotDraft.targetDraftVersion}`,
    `- snapshotFingerprint=${report.versionedMemorySnapshotDraft.snapshotFingerprint}`,
    "- localSnapshotOnly=true",
    "- dbPersistenceAllowed=false",
    "",
    "Rollback plan:",
    ...report.rollbackPlan.map(
      (item) =>
        `- ${item.rollbackId} | patch=${item.patchId} | action=${item.rollbackAction} | manualRollbackOnly=${item.manualRollbackOnly}`,
    ),
    "",
    "Promotion audit trail:",
    ...report.promotionAuditTrail.map(
      (item) =>
        `- ${item.auditId} | action=${item.action} | actor=${item.actor} | redacted=${item.redacted}`,
    ),
    "",
    "Promotion export packet:",
    `- exportId=${report.promotionExportPacket.exportId}`,
    `- artifactNames=${report.promotionExportPacket.artifactNames.join(", ")}`,
    "- redactedOnly=true",
    "- localPromotionOnly=true",
    "- localMemoryOnly=true",
    "- publicShareAllowed=false",
    "- dbPersistenceAllowed=false",
    "- memoryPersistenceAllowed=false",
    "",
    "Premium signals:",
    `- memoryPromotionGovernanceReady=${report.premiumSignals.memoryPromotionGovernanceReady}`,
    `- promotionQueueReady=${report.premiumSignals.promotionQueueReady}`,
    `- memoryPatchDraftsReady=${report.premiumSignals.memoryPatchDraftsReady}`,
    `- governanceDecisionBoardReady=${report.premiumSignals.governanceDecisionBoardReady}`,
    `- versionedMemorySnapshotDraftReady=${report.premiumSignals.versionedMemorySnapshotDraftReady}`,
    `- rollbackPlanReady=${report.premiumSignals.rollbackPlanReady}`,
    `- promotionAuditTrailReady=${report.premiumSignals.promotionAuditTrailReady}`,
    `- promotionExportPacketReady=${report.premiumSignals.promotionExportPacketReady}`,
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
    "- publicShareAllowed=false",
    "- productPrescriptionAllowed=false",
    "- dosageAdviceAllowed=false",
    "- manualDispatchOnly=true",
    "- humanReviewRequired=true",
    "- localAnalysisOnly=true",
    "- localPromotionOnly=true",
    "- localMemoryOnly=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
