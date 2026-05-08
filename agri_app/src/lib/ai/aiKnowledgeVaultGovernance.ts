export type KnowledgeVaultGovernanceMode = "dry-run" | "readiness-review";

export type KnowledgeEvidenceLevel = "missing" | "weak" | "moderate" | "strong";

export type KnowledgeConflictSeverity = "low" | "medium" | "high" | "critical";

export type PlaybookApprovalStage =
  | "draft"
  | "technical-review"
  | "agronomist-approval"
  | "operations-signoff"
  | "locked-dry-run";

export type PlaybookApplicabilityBand =
  | "not-applicable"
  | "watchlist"
  | "applicable-with-gaps"
  | "review-ready"
  | "expert-ready";

export interface KnowledgeVaultReadiness {
  providerAiReady: false;
  persistenceReady: false;
  memoryPersistenceReady: false;
  automaticTaskCreationReady: false;
  automaticInterventionCreationReady: false;
  automaticExecutionReady: false;
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
  redactedOutputOnly: true;
  localMemoryOnly: true;
  localLearningOnly: true;
  localPromotionOnly: true;
  localQualityOnly: true;
  memoryPromotionAllowed: false;
  memoryQualityWriteAllowed: false;
  memoryPromotionPerformed: false;
  memoryQualityWritePerformed: false;
}

export interface KnowledgeVaultGovernanceInput {
  cropFamily?: string;
  caseType?: string;
  regionProfile?: string;
  seasonStage?: string;
  fieldEvidenceLevel?: KnowledgeEvidenceLevel;
  reviewerRole?: string;
}

export interface EvidenceThreshold {
  id: string;
  label: string;
  requiredLevel: KnowledgeEvidenceLevel;
  currentLevel: KnowledgeEvidenceLevel;
  blocking: boolean;
  rationale: string;
}

export interface ApplicabilityRule {
  id: string;
  dimension: "crop" | "symptom" | "season" | "region" | "risk" | "evidence" | "compliance";
  rule: string;
  positiveSignal: string;
  rejectionSignal: string;
}

export interface ExpertPlaybook {
  id: string;
  title: string;
  version: string;
  owner: string;
  approvalStage: PlaybookApprovalStage;
  cropFamilies: string[];
  caseFamilies: string[];
  applicabilityRules: ApplicabilityRule[];
  evidenceThresholds: EvidenceThreshold[];
  protocolSummary: string[];
  conflictPolicy: string;
  humanReviewChecklist: string[];
  rollbackTriggers: string[];
}

export interface ApplicabilityScore {
  playbookId: string;
  title: string;
  band: PlaybookApplicabilityBand;
  applicabilityScore: number;
  evidenceScore: number;
  approvalStage: PlaybookApprovalStage;
  blockers: string[];
  matchedSignals: string[];
  missingSignals: string[];
}

export interface KnowledgeConflict {
  id: string;
  severity: KnowledgeConflictSeverity;
  playbookIds: string[];
  finding: string;
  resolution: string;
  requiresHumanDecision: true;
}

export interface ApprovalQueueItem {
  playbookId: string;
  title: string;
  nextStage: PlaybookApprovalStage;
  reason: string;
  requiredReviewer: string;
  manualOnly: true;
}

export interface EvidenceGap {
  playbookId: string;
  thresholdId: string;
  label: string;
  currentLevel: KnowledgeEvidenceLevel;
  requiredLevel: KnowledgeEvidenceLevel;
  blocking: boolean;
  recommendedManualAction: string;
}

export interface KnowledgeVaultSnapshot {
  vaultVersion: string;
  generatedAt: string;
  mode: KnowledgeVaultGovernanceMode;
  totalPlaybooks: number;
  reviewReadyPlaybooks: number;
  blockedPlaybooks: number;
  highSeverityConflicts: number;
  exportRedacted: true;
  snapshotWritePerformed: false;
}

export interface KnowledgeVaultGovernanceReport {
  generatedAt: string;
  mode: KnowledgeVaultGovernanceMode;
  context: Required<KnowledgeVaultGovernanceInput>;
  readiness: KnowledgeVaultReadiness;
  snapshot: KnowledgeVaultSnapshot;
  playbooks: ExpertPlaybook[];
  applicabilityIndex: ApplicabilityScore[];
  conflicts: KnowledgeConflict[];
  approvalQueue: ApprovalQueueItem[];
  evidenceGaps: EvidenceGap[];
  rollbackPlan: string[];
  redactedExportBundle: {
    exportId: string;
    includesFieldIdentifiers: false;
    includesPrivateNotes: false;
    includesProviderPayloads: false;
    sections: string[];
  };
  safetySummary: string[];
}

export const KNOWLEDGE_VAULT_READINESS: KnowledgeVaultReadiness = {
  providerAiReady: false,
  persistenceReady: false,
  memoryPersistenceReady: false,
  automaticTaskCreationReady: false,
  automaticInterventionCreationReady: false,
  automaticExecutionReady: false,
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
  redactedOutputOnly: true,
  localMemoryOnly: true,
  localLearningOnly: true,
  localPromotionOnly: true,
  localQualityOnly: true,
  memoryPromotionAllowed: false,
  memoryQualityWriteAllowed: false,
  memoryPromotionPerformed: false,
  memoryQualityWritePerformed: false,
};

const evidenceRank: Record<KnowledgeEvidenceLevel, number> = {
  missing: 0,
  weak: 1,
  moderate: 2,
  strong: 3,
};

const approvalWeight: Record<PlaybookApprovalStage, number> = {
  draft: 5,
  "technical-review": 14,
  "agronomist-approval": 18,
  "operations-signoff": 20,
  "locked-dry-run": 20,
};

const expertPlaybooks: ExpertPlaybook[] = [
  {
    id: "KV-PB-001",
    title: "Multi-photo canopy stress triage",
    version: "10.0.0-dry-run",
    owner: "Agronomic Expert Board",
    approvalStage: "technical-review",
    cropFamilies: ["tomato", "pepper", "vineyard", "olive", "citrus"],
    caseFamilies: ["canopy stress", "leaf discoloration", "growth anomaly"],
    applicabilityRules: [
      {
        id: "KV-R-001",
        dimension: "evidence",
        rule: "Use only when at least two independent visual observations are available.",
        positiveSignal: "multi-angle symptom consistency",
        rejectionSignal: "single ambiguous image",
      },
      {
        id: "KV-R-002",
        dimension: "symptom",
        rule: "Prioritize descriptive symptom clustering before any intervention proposal.",
        positiveSignal: "visible canopy pattern",
        rejectionSignal: "no visible symptom cluster",
      },
    ],
    evidenceThresholds: [
      {
        id: "KV-E-001",
        label: "Independent visual evidence",
        requiredLevel: "moderate",
        currentLevel: "moderate",
        blocking: true,
        rationale: "Triage requires repeatable field evidence before escalation.",
      },
      {
        id: "KV-E-002",
        label: "Human scout observation",
        requiredLevel: "weak",
        currentLevel: "weak",
        blocking: false,
        rationale: "Human context improves review quality without authorizing execution.",
      },
    ],
    protocolSummary: [
      "Cluster visual symptoms by canopy zone.",
      "Separate likely biotic, abiotic and management signals.",
      "Escalate uncertain or high-impact cases to human agronomist review.",
    ],
    conflictPolicy: "When symptoms overlap, keep multiple hypotheses open and require manual adjudication.",
    humanReviewChecklist: [
      "Confirm crop and growth stage.",
      "Confirm symptom distribution across the field.",
      "Reject direct prescription requests.",
    ],
    rollbackTriggers: [
      "Evidence later downgraded below moderate.",
      "Human reviewer rejects symptom cluster quality.",
    ],
  },
  {
    id: "KV-PB-002",
    title: "Disease pressure escalation guard",
    version: "10.0.0-dry-run",
    owner: "Plant Health Governance",
    approvalStage: "agronomist-approval",
    cropFamilies: ["tomato", "vineyard", "citrus"],
    caseFamilies: ["disease pressure", "lesion pattern", "humidity-linked risk"],
    applicabilityRules: [
      {
        id: "KV-R-003",
        dimension: "risk",
        rule: "Escalate only when field evidence and environmental indicators agree.",
        positiveSignal: "symptom pattern with humidity risk",
        rejectionSignal: "environmental context absent",
      },
      {
        id: "KV-R-004",
        dimension: "compliance",
        rule: "Never produce product choice or dosage advice in dry-run mode.",
        positiveSignal: "advisory language only",
        rejectionSignal: "product or dosage request",
      },
    ],
    evidenceThresholds: [
      {
        id: "KV-E-003",
        label: "Environmental pressure proxy",
        requiredLevel: "moderate",
        currentLevel: "weak",
        blocking: true,
        rationale: "Disease pressure inference is unsafe without environmental corroboration.",
      },
      {
        id: "KV-E-004",
        label: "Symptom localization",
        requiredLevel: "moderate",
        currentLevel: "moderate",
        blocking: true,
        rationale: "Lesion pattern and localization must be visible enough for review.",
      },
    ],
    protocolSummary: [
      "Flag disease-pressure hypothesis without confirming diagnosis.",
      "Request additional field checks when environmental evidence is incomplete.",
      "Route final action decisions to a qualified human reviewer.",
    ],
    conflictPolicy: "If abiotic stress is plausible, downgrade disease certainty and require field scouting.",
    humanReviewChecklist: [
      "Verify humidity, irrigation and recent weather context.",
      "Compare affected and unaffected plants.",
      "Document uncertainty before any operational decision.",
    ],
    rollbackTriggers: [
      "Environmental pressure proxy remains weak.",
      "Abiotic stress becomes the stronger hypothesis.",
    ],
  },
  {
    id: "KV-PB-003",
    title: "Abiotic stress differentiation protocol",
    version: "10.0.0-dry-run",
    owner: "Field Systems Review",
    approvalStage: "technical-review",
    cropFamilies: ["tomato", "pepper", "olive", "citrus", "cereal"],
    caseFamilies: ["water stress", "nutrient-like symptom", "heat stress", "salinity suspicion"],
    applicabilityRules: [
      {
        id: "KV-R-005",
        dimension: "season",
        rule: "Require season and growth-stage context before ranking abiotic hypotheses.",
        positiveSignal: "season stage known",
        rejectionSignal: "growth stage unknown",
      },
      {
        id: "KV-R-006",
        dimension: "region",
        rule: "Use regional agronomic context as a caution signal, never as a sole cause.",
        positiveSignal: "region profile present",
        rejectionSignal: "region profile absent",
      },
    ],
    evidenceThresholds: [
      {
        id: "KV-E-005",
        label: "Growth-stage context",
        requiredLevel: "moderate",
        currentLevel: "strong",
        blocking: true,
        rationale: "Abiotic symptoms can shift interpretation by phenological stage.",
      },
      {
        id: "KV-E-006",
        label: "Field distribution pattern",
        requiredLevel: "moderate",
        currentLevel: "weak",
        blocking: true,
        rationale: "Localized and field-wide patterns imply different causes.",
      },
    ],
    protocolSummary: [
      "Separate water, heat, nutritional and salinity-like signals.",
      "Force explicit uncertainty when field distribution is incomplete.",
      "Recommend manual measurement collection, not automated action.",
    ],
    conflictPolicy: "If disease and abiotic signals overlap, keep both until manual evidence resolves the conflict.",
    humanReviewChecklist: [
      "Check irrigation uniformity and soil variability.",
      "Confirm whether symptoms follow rows, slopes or irrigation sectors.",
      "Avoid treatment advice without measured evidence.",
    ],
    rollbackTriggers: [
      "Field distribution pattern cannot be verified.",
      "Manual measurements contradict initial stress class.",
    ],
  },
  {
    id: "KV-PB-004",
    title: "Memory-derived similar case governance",
    version: "10.0.0-dry-run",
    owner: "Knowledge Quality Review",
    approvalStage: "operations-signoff",
    cropFamilies: ["tomato", "pepper", "vineyard", "olive", "citrus", "cereal"],
    caseFamilies: ["similar case retrieval", "memory quality", "outcome learning"],
    applicabilityRules: [
      {
        id: "KV-R-007",
        dimension: "evidence",
        rule: "Similar cases may inform review but cannot authorize direct execution.",
        positiveSignal: "validated similar case pattern",
        rejectionSignal: "unreviewed memory pattern",
      },
      {
        id: "KV-R-008",
        dimension: "compliance",
        rule: "Memory promotion remains locked until explicit future enablement.",
        positiveSignal: "promotion draft only",
        rejectionSignal: "write attempt",
      },
    ],
    evidenceThresholds: [
      {
        id: "KV-E-007",
        label: "Memory quality score",
        requiredLevel: "strong",
        currentLevel: "moderate",
        blocking: true,
        rationale: "Memory-derived advice requires high quality and drift control.",
      },
      {
        id: "KV-E-008",
        label: "Outcome traceability",
        requiredLevel: "moderate",
        currentLevel: "moderate",
        blocking: false,
        rationale: "Outcome traceability strengthens review confidence.",
      },
    ],
    protocolSummary: [
      "Surface similar-case rationale as advisory context.",
      "Block memory writes and promotion in local-only mode.",
      "Require quality guard review before any knowledge upgrade.",
    ],
    conflictPolicy: "If current evidence diverges from memory, trust current field evidence and flag drift.",
    humanReviewChecklist: [
      "Review similar case quality and drift notes.",
      "Confirm no memory write has occurred.",
      "Document whether the case can become a future promotion candidate.",
    ],
    rollbackTriggers: [
      "Memory quality score downgraded.",
      "Drift control flags unresolved divergence.",
    ],
  },
  {
    id: "KV-PB-005",
    title: "Executive farm command playbook synthesis",
    version: "10.0.0-dry-run",
    owner: "Operations Governance",
    approvalStage: "locked-dry-run",
    cropFamilies: ["tomato", "pepper", "vineyard", "olive", "citrus", "cereal"],
    caseFamilies: ["portfolio review", "risk radar", "intervention readiness", "scouting mission"],
    applicabilityRules: [
      {
        id: "KV-R-009",
        dimension: "risk",
        rule: "Summarize cross-case risk without dispatching tasks.",
        positiveSignal: "multiple governed modules available",
        rejectionSignal: "single isolated signal",
      },
      {
        id: "KV-R-010",
        dimension: "compliance",
        rule: "Keep all executive recommendations in manual review mode.",
        positiveSignal: "manual dispatch preserved",
        rejectionSignal: "automatic dispatch requested",
      },
    ],
    evidenceThresholds: [
      {
        id: "KV-E-009",
        label: "Cross-module consistency",
        requiredLevel: "moderate",
        currentLevel: "strong",
        blocking: false,
        rationale: "Executive synthesis is useful only when modules agree on risk posture.",
      },
      {
        id: "KV-E-010",
        label: "Operational readiness review",
        requiredLevel: "moderate",
        currentLevel: "moderate",
        blocking: true,
        rationale: "Any operational interpretation requires human governance.",
      },
    ],
    protocolSummary: [
      "Create governance-level synthesis across risk, memory, scouting and readiness.",
      "Rank decision topics by urgency and evidence quality.",
      "Keep every downstream action behind manual approval.",
    ],
    conflictPolicy: "When portfolio risk and case evidence disagree, prioritize the conservative human review path.",
    humanReviewChecklist: [
      "Confirm all source modules are dry-run.",
      "Confirm no dispatch, prescription or execution is present.",
      "Approve only the summary, never automated action.",
    ],
    rollbackTriggers: [
      "Any source module loses safety compliance.",
      "Evidence quality drops below governance threshold.",
    ],
  },
];

function normalizeInput(input: KnowledgeVaultGovernanceInput): Required<KnowledgeVaultGovernanceInput> {
  return {
    cropFamily: input.cropFamily ?? "tomato",
    caseType: input.caseType ?? "canopy stress",
    regionProfile: input.regionProfile ?? "Mediterranean protected and open-field mixed context",
    seasonStage: input.seasonStage ?? "active growth",
    fieldEvidenceLevel: input.fieldEvidenceLevel ?? "moderate",
    reviewerRole: input.reviewerRole ?? "human agronomist",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function scorePlaybook(
  playbook: ExpertPlaybook,
  context: Required<KnowledgeVaultGovernanceInput>,
): ApplicabilityScore {
  const normalizedCrop = context.cropFamily.toLowerCase();
  const normalizedCaseType = context.caseType.toLowerCase();

  const cropMatch = playbook.cropFamilies.includes(normalizedCrop) ? 24 : 0;

  const caseMatch = playbook.caseFamilies.some((caseFamily) => {
    const normalizedFamily = caseFamily.toLowerCase();
    const firstToken = normalizedFamily.split(" ")[0] ?? normalizedFamily;
    return normalizedCaseType.includes(normalizedFamily) || normalizedCaseType.includes(firstToken);
  })
    ? 24
    : 0;

  const evidenceScores = playbook.evidenceThresholds.map((threshold) => {
    const currentRank = Math.max(evidenceRank[threshold.currentLevel], evidenceRank[context.fieldEvidenceLevel]);
    const requiredRank = evidenceRank[threshold.requiredLevel];

    if (currentRank >= requiredRank) {
      return 10;
    }

    return threshold.blocking ? -12 : 2;
  });

  const evidenceScore = Math.max(
    0,
    Math.min(
      30,
      evidenceScores.reduce((sum, score) => sum + score, 0),
    ),
  );

  const applicabilityScore = clampScore(cropMatch + caseMatch + approvalWeight[playbook.approvalStage] + evidenceScore);

  const blockers = playbook.evidenceThresholds
    .filter((threshold) => {
      const currentRank = Math.max(evidenceRank[threshold.currentLevel], evidenceRank[context.fieldEvidenceLevel]);
      return threshold.blocking && currentRank < evidenceRank[threshold.requiredLevel];
    })
    .map((threshold) => `${threshold.label}: evidence ${threshold.currentLevel}, required ${threshold.requiredLevel}`);

  const matchedSignals = playbook.applicabilityRules.map((rule) => rule.positiveSignal);
  const missingSignals = blockers.length > 0 ? blockers : ["No blocking gap detected in local dry-run review."];

  let band: PlaybookApplicabilityBand = "not-applicable";
  if (applicabilityScore >= 85 && blockers.length === 0) {
    band = "expert-ready";
  } else if (applicabilityScore >= 72 && blockers.length === 0) {
    band = "review-ready";
  } else if (applicabilityScore >= 58) {
    band = "applicable-with-gaps";
  } else if (applicabilityScore >= 35) {
    band = "watchlist";
  }

  return {
    playbookId: playbook.id,
    title: playbook.title,
    band,
    applicabilityScore,
    evidenceScore,
    approvalStage: playbook.approvalStage,
    blockers,
    matchedSignals,
    missingSignals,
  };
}

function buildConflictRegister(applicabilityIndex: ApplicabilityScore[]): KnowledgeConflict[] {
  const applicableIds = new Set(
    applicabilityIndex
      .filter((item) => item.band !== "not-applicable" && item.band !== "watchlist")
      .map((item) => item.playbookId),
  );

  const conflicts: KnowledgeConflict[] = [];

  if (applicableIds.has("KV-PB-002") && applicableIds.has("KV-PB-003")) {
    conflicts.push({
      id: "KV-C-001",
      severity: "high",
      playbookIds: ["KV-PB-002", "KV-PB-003"],
      finding: "Disease-pressure escalation and abiotic-stress differentiation can both explain canopy symptoms.",
      resolution: "Keep both hypotheses open, request manual field distribution evidence and block direct intervention advice.",
      requiresHumanDecision: true,
    });
  }

  if (applicableIds.has("KV-PB-004") && applicableIds.has("KV-PB-001")) {
    conflicts.push({
      id: "KV-C-002",
      severity: "medium",
      playbookIds: ["KV-PB-004", "KV-PB-001"],
      finding: "Similar-case memory can bias symptom triage when current visual evidence is incomplete.",
      resolution: "Prefer current field evidence and label memory context as advisory only.",
      requiresHumanDecision: true,
    });
  }

  if (applicableIds.has("KV-PB-005")) {
    conflicts.push({
      id: "KV-C-003",
      severity: "low",
      playbookIds: ["KV-PB-005"],
      finding: "Executive synthesis may compress uncertainty across modules.",
      resolution: "Expose evidence bands, blockers and human review state in every summary.",
      requiresHumanDecision: true,
    });
  }

  return conflicts;
}

function nextApprovalStage(stage: PlaybookApprovalStage): PlaybookApprovalStage {
  if (stage === "draft") return "technical-review";
  if (stage === "technical-review") return "agronomist-approval";
  if (stage === "agronomist-approval") return "operations-signoff";
  return "locked-dry-run";
}

function buildApprovalQueue(applicabilityIndex: ApplicabilityScore[]): ApprovalQueueItem[] {
  return applicabilityIndex
    .filter((item) => item.band === "applicable-with-gaps" || item.band === "review-ready" || item.band === "expert-ready")
    .map((item) => ({
      playbookId: item.playbookId,
      title: item.title,
      nextStage: nextApprovalStage(item.approvalStage),
      reason:
        item.blockers.length > 0
          ? "Evidence gaps must be resolved before the playbook can be promoted."
          : "Playbook is ready for manual governance review in dry-run mode.",
      requiredReviewer: item.approvalStage === "technical-review" ? "senior agronomist" : "operations reviewer",
      manualOnly: true,
    }));
}

function buildEvidenceGaps(playbooks: ExpertPlaybook[]): EvidenceGap[] {
  return playbooks.flatMap((playbook) =>
    playbook.evidenceThresholds
      .filter((threshold) => evidenceRank[threshold.currentLevel] < evidenceRank[threshold.requiredLevel])
      .map((threshold) => ({
        playbookId: playbook.id,
        thresholdId: threshold.id,
        label: threshold.label,
        currentLevel: threshold.currentLevel,
        requiredLevel: threshold.requiredLevel,
        blocking: threshold.blocking,
        recommendedManualAction: threshold.blocking
          ? "Collect additional field evidence and repeat human review."
          : "Document the gap as advisory context for the reviewer.",
      })),
  );
}

export function buildAiKnowledgeVaultGovernanceReport(
  input: KnowledgeVaultGovernanceInput = {},
): KnowledgeVaultGovernanceReport {
  const context = normalizeInput(input);
  const generatedAt = new Date().toISOString();
  const applicabilityIndex = expertPlaybooks.map((playbook) => scorePlaybook(playbook, context));
  const conflicts = buildConflictRegister(applicabilityIndex);
  const approvalQueue = buildApprovalQueue(applicabilityIndex);
  const evidenceGaps = buildEvidenceGaps(expertPlaybooks);

  const reviewReadyPlaybooks = applicabilityIndex.filter(
    (item) => item.band === "review-ready" || item.band === "expert-ready",
  ).length;

  const blockedPlaybooks = applicabilityIndex.filter((item) => item.blockers.length > 0).length;
  const highSeverityConflicts = conflicts.filter(
    (conflict) => conflict.severity === "high" || conflict.severity === "critical",
  ).length;

  return {
    generatedAt,
    mode: "dry-run",
    context,
    readiness: KNOWLEDGE_VAULT_READINESS,
    snapshot: {
      vaultVersion: "10.0.0-dry-run",
      generatedAt,
      mode: "dry-run",
      totalPlaybooks: expertPlaybooks.length,
      reviewReadyPlaybooks,
      blockedPlaybooks,
      highSeverityConflicts,
      exportRedacted: true,
      snapshotWritePerformed: false,
    },
    playbooks: expertPlaybooks,
    applicabilityIndex,
    conflicts,
    approvalQueue,
    evidenceGaps,
    rollbackPlan: [
      "Keep V10.0 vault output advisory and redacted.",
      "Disable the UI panels by removing their page integrations if any regression appears.",
      "Keep endpoint protected by CRON_SECRET and return only dry-run JSON.",
      "Revert to the pre-merge rollback branch if build or live checks fail after merge.",
    ],
    redactedExportBundle: {
      exportId: "kv-governance-v10-0-redacted-dry-run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      sections: [
        "vault snapshot",
        "expert playbook index",
        "applicability scores",
        "conflict register",
        "approval queue",
        "evidence gaps",
        "rollback plan",
        "safety summary",
      ],
    },
    safetySummary: [
      "Local analysis only: no provider call is performed.",
      "No persistence or memory write is performed.",
      "No task, intervention, public share, product prescription or dosage advice is produced.",
      "Every playbook remains behind human review and manual dispatch.",
      "Conflict resolution is conservative and blocks direct execution.",
    ],
  };
}

export const aiKnowledgeVaultGovernanceVersion = "V10.0";
