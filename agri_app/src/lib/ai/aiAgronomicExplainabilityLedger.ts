export type ExplainabilityLedgerMode = "dry-run" | "review-ledger";

export type ExplanationSeverity = "info" | "watch" | "elevated" | "critical";

export type ExplanationPriority = "low" | "medium" | "high" | "urgent";

export type ExplanationReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "ledger-ready";

export type ExplanationLane =
  | "evidence"
  | "module-trace"
  | "uncertainty"
  | "governance"
  | "counterfactual"
  | "review-board"
  | "export";

export interface AgronomicExplainabilityGuardrail {
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
  explainabilityLedgerReady: true;
  traceabilityKernelReady: true;
  uncertaintyRegisterReady: true;
  reviewerQuestionBuilderReady: true;
}

export interface AgronomicExplainabilityLedgerInput {
  activeCaseCount?: number;
  moduleNodeCount?: number;
  commandCardCount?: number;
  evidenceGapCount?: number;
  blockedModuleCount?: number;
  failedGateCount?: number;
  reviewerConfidenceScore?: number;
  controlTowerScore?: number;
  knowledgeTraceScore?: number;
  evidenceContributionScore?: number;
  uncertaintyScore?: number;
  governanceClarityScore?: number;
  reviewerRole?: string;
}

export interface ExplanationSourceNode {
  id: string;
  lane: ExplanationLane;
  title: string;
  sourceVersion: string;
  contributionScore: number;
  confidenceScore: number;
  severity: ExplanationSeverity;
  priority: ExplanationPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface EvidenceContributionItem {
  id: string;
  sourceNodeId: string;
  evidenceLabel: string;
  contributionWeight: number;
  confidenceScore: number;
  explanation: string;
  missingEvidence: string[];
}

export interface ReasoningTraceStep {
  id: string;
  sequence: number;
  title: string;
  sourceNodeIds: string[];
  explanation: string;
  reviewerCheck: string;
  allowedOutput: string;
  disallowedOutput: string;
}

export interface UncertaintyRegisterItem {
  id: string;
  label: string;
  severity: ExplanationSeverity;
  uncertaintyScore: number;
  reason: string;
  manualResolution: string;
}

export interface CounterfactualReviewItem {
  id: string;
  question: string;
  expectedChange: string;
  affectedSources: string[];
  reviewerUse: string;
  blockedUse: string;
}

export interface ReviewerQuestion {
  id: string;
  priority: ExplanationPriority;
  question: string;
  reviewer: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface LedgerAuditItem {
  id: string;
  event: string;
  lane: ExplanationLane;
  severity: ExplanationSeverity;
  explanation: string;
  reviewer: string;
  noWriteGuarantee: true;
}

export interface AgronomicExplainabilityLedgerReport {
  generatedAt: string;
  mode: ExplainabilityLedgerMode;
  context: Required<AgronomicExplainabilityLedgerInput>;
  readiness: AgronomicExplainabilityGuardrail;
  ledgerScore: number;
  ledgerStatus: ExplanationReadinessBand;
  overallSeverity: ExplanationSeverity;
  sourceNodes: ExplanationSourceNode[];
  evidenceContributionMap: EvidenceContributionItem[];
  reasoningTrace: ReasoningTraceStep[];
  uncertaintyRegister: UncertaintyRegisterItem[];
  counterfactualReview: CounterfactualReviewItem[];
  reviewerQuestions: ReviewerQuestion[];
  auditLedger: LedgerAuditItem[];
  redactedExportBundle: {
    exportId: string;
    includesFieldIdentifiers: false;
    includesPrivateNotes: false;
    includesProviderPayloads: false;
    includesOperationalInternalData: false;
    includesProductionForecasts: false;
    includesProductRecommendations: false;
    includesDosageGuidance: false;
    sections: string[];
  };
  safetySummary: string[];
}

export const AGRONOMIC_EXPLAINABILITY_LEDGER_READINESS: AgronomicExplainabilityGuardrail = {
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
  explainabilityLedgerReady: true,
  traceabilityKernelReady: true,
  uncertaintyRegisterReady: true,
  reviewerQuestionBuilderReady: true,
};

const priorityWeight: Record<ExplanationPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

const severityWeight: Record<ExplanationSeverity, number> = {
  info: 4,
  watch: 11,
  elevated: 21,
  critical: 34,
};

function normalizeInput(input: AgronomicExplainabilityLedgerInput): Required<AgronomicExplainabilityLedgerInput> {
  return {
    activeCaseCount: input.activeCaseCount ?? 9,
    moduleNodeCount: input.moduleNodeCount ?? 10,
    commandCardCount: input.commandCardCount ?? 4,
    evidenceGapCount: input.evidenceGapCount ?? 6,
    blockedModuleCount: input.blockedModuleCount ?? 3,
    failedGateCount: input.failedGateCount ?? 2,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 72,
    controlTowerScore: input.controlTowerScore ?? 69,
    knowledgeTraceScore: input.knowledgeTraceScore ?? 76,
    evidenceContributionScore: input.evidenceContributionScore ?? 70,
    uncertaintyScore: input.uncertaintyScore ?? 68,
    governanceClarityScore: input.governanceClarityScore ?? 74,
    reviewerRole: input.reviewerRole ?? "explainability reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ExplanationSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ExplanationSeverity): ExplanationPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ExplanationReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "ledger-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ExplanationLane,
  title: string,
  sourceVersion: string,
  baseContribution: number,
  baseConfidence: number,
  pressure: number,
  reviewerFocus: string,
): ExplanationSourceNode {
  const contributionScore = clampScore(baseContribution - pressure / 2);
  const confidenceScore = clampScore(baseConfidence - pressure);
  const concernScore = clampScore(100 - confidenceScore + pressure);
  const severity = severityFromConcern(concernScore);

  return {
    id,
    lane,
    title,
    sourceVersion,
    contributionScore,
    confidenceScore,
    severity,
    priority: priorityFromSeverity(severity),
    reviewerFocus,
    blockers:
      confidenceScore < 62 || severity === "critical"
        ? ["Trace confidence below review threshold.", "Human reviewer must verify source contribution."]
        : [],
  };
}

function buildSourceNodes(context: Required<AgronomicExplainabilityLedgerInput>): ExplanationSourceNode[] {
  const evidencePressure = context.evidenceGapCount * 3;
  const governancePressure = context.failedGateCount * 5;
  const modulePressure = context.blockedModuleCount * 4;

  return [
    buildSourceNode(
      "AEL_NODE_001",
      "module-trace",
      "Control tower module trace",
      "V11.0",
      context.controlTowerScore,
      context.reviewerConfidenceScore,
      modulePressure,
      "Verify how module nodes and command cards influence the final review state.",
    ),
    buildSourceNode(
      "AEL_NODE_002",
      "evidence",
      "Evidence contribution map",
      "V11.1",
      context.evidenceContributionScore,
      context.evidenceContributionScore,
      evidencePressure,
      "Check which evidence gaps dominate the explanation.",
    ),
    buildSourceNode(
      "AEL_NODE_003",
      "uncertainty",
      "Uncertainty register",
      "V11.1",
      100 - context.uncertaintyScore,
      context.reviewerConfidenceScore,
      context.uncertaintyScore / 3,
      "Review uncertainty drivers before accepting any board summary.",
    ),
    buildSourceNode(
      "AEL_NODE_004",
      "governance",
      "Governance clarity",
      "V11.1",
      context.governanceClarityScore,
      context.governanceClarityScore,
      governancePressure,
      "Confirm provider, persistence and automation locks remain visible.",
    ),
    buildSourceNode(
      "AEL_NODE_005",
      "counterfactual",
      "Counterfactual review builder",
      "V11.1",
      context.knowledgeTraceScore,
      context.reviewerConfidenceScore,
      context.evidenceGapCount,
      "Use counterfactual questions only to guide human review.",
    ),
    buildSourceNode(
      "AEL_NODE_006",
      "review-board",
      "Reviewer question builder",
      "V11.1",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      modulePressure / 2,
      "Generate reviewer questions without creating decisions or work.",
    ),
    buildSourceNode(
      "AEL_NODE_007",
      "export",
      "Redacted ledger export",
      "V11.1",
      context.governanceClarityScore,
      context.governanceClarityScore,
      governancePressure / 2,
      "Prepare a redacted review bundle only.",
    ),
  ];
}

function buildEvidenceContributionMap(
  context: Required<AgronomicExplainabilityLedgerInput>,
  sourceNodes: ExplanationSourceNode[],
): EvidenceContributionItem[] {
  const labels = [
    "Open evidence gaps",
    "Blocked module count",
    "Failed governance gates",
    "Reviewer confidence",
    "Knowledge trace coverage",
    "Control tower score",
  ];

  return labels.map((label, index) => {
    const source = sourceNodes[index % sourceNodes.length];
    const pressure =
      label === "Open evidence gaps"
        ? context.evidenceGapCount * 7
        : label === "Blocked module count"
          ? context.blockedModuleCount * 9
          : label === "Failed governance gates"
            ? context.failedGateCount * 11
            : 100 - context.reviewerConfidenceScore;

    return {
      id: `AEL_EVIDENCE_${String(index + 1).padStart(3, "0")}`,
      sourceNodeId: source?.id ?? "AEL_NODE_001",
      evidenceLabel: label,
      contributionWeight: clampScore(pressure),
      confidenceScore: clampScore((source?.confidenceScore ?? 70) - index * 2),
      explanation: "Contribution is advisory and used only to structure human review.",
      missingEvidence:
        pressure > 45
          ? ["Reviewer note", "Source confirmation", "Cross module check"]
          : [],
    };
  });
}

function buildReasoningTrace(sourceNodes: ExplanationSourceNode[]): ReasoningTraceStep[] {
  return [
    {
      id: "AEL_TRACE_001",
      sequence: 1,
      title: "Collect local module state",
      sourceNodeIds: sourceNodes.slice(0, 3).map((node) => node.id),
      explanation: "The ledger reads dry-run module signals and prepares an explanation map.",
      reviewerCheck: "Confirm that every module signal remains advisory.",
      allowedOutput: "Review explanation only.",
      disallowedOutput: "No operational command, provider call or data write.",
    },
    {
      id: "AEL_TRACE_002",
      sequence: 2,
      title: "Weight evidence contribution",
      sourceNodeIds: ["AEL_NODE_002"],
      explanation: "Evidence gaps and confidence levels are converted into reviewer topics.",
      reviewerCheck: "Confirm that evidence weights do not create decisions.",
      allowedOutput: "Evidence review packet.",
      disallowedOutput: "No task creation or intervention creation.",
    },
    {
      id: "AEL_TRACE_003",
      sequence: 3,
      title: "Register uncertainty",
      sourceNodeIds: ["AEL_NODE_003", "AEL_NODE_005"],
      explanation: "The system lists uncertainty drivers and counterfactual questions.",
      reviewerCheck: "Reviewer decides which uncertainty items are acceptable.",
      allowedOutput: "Human review questions.",
      disallowedOutput: "No forecast, prescription or dosage.",
    },
    {
      id: "AEL_TRACE_004",
      sequence: 4,
      title: "Apply governance locks",
      sourceNodeIds: ["AEL_NODE_004", "AEL_NODE_007"],
      explanation: "Governance locks keep the ledger redacted and manual-only.",
      reviewerCheck: "Safety reviewer verifies all locks remain visible.",
      allowedOutput: "Redacted ledger export.",
      disallowedOutput: "No public sharing or persistence.",
    },
  ];
}

function buildUncertaintyRegister(
  context: Required<AgronomicExplainabilityLedgerInput>,
): UncertaintyRegisterItem[] {
  return [
    {
      id: "AEL_UNCERTAINTY_001",
      label: "Evidence gap load",
      severity: context.evidenceGapCount >= 6 ? "critical" : "elevated",
      uncertaintyScore: clampScore(context.evidenceGapCount * 12),
      reason: `${context.evidenceGapCount} evidence gaps remain open.`,
      manualResolution: "Close, downgrade or explicitly accept gaps through human review.",
    },
    {
      id: "AEL_UNCERTAINTY_002",
      label: "Blocked module influence",
      severity: context.blockedModuleCount > 2 ? "critical" : "elevated",
      uncertaintyScore: clampScore(context.blockedModuleCount * 18),
      reason: `${context.blockedModuleCount} control modules are blocked.`,
      manualResolution: "Review blocked module rationale before board summary.",
    },
    {
      id: "AEL_UNCERTAINTY_003",
      label: "Governance gate clarity",
      severity: context.failedGateCount > 1 ? "critical" : "watch",
      uncertaintyScore: clampScore(context.failedGateCount * 20),
      reason: `${context.failedGateCount} governance gates require review.`,
      manualResolution: "Confirm governance locks and reviewer ownership.",
    },
    {
      id: "AEL_UNCERTAINTY_004",
      label: "Reviewer confidence",
      severity: context.reviewerConfidenceScore < 68 ? "elevated" : "watch",
      uncertaintyScore: clampScore(100 - context.reviewerConfidenceScore),
      reason: `Reviewer confidence score is ${context.reviewerConfidenceScore}/100.`,
      manualResolution: "Add reviewer notes before ledger-ready state.",
    },
  ];
}

function buildCounterfactualReview(sourceNodes: ExplanationSourceNode[]): CounterfactualReviewItem[] {
  return [
    {
      id: "AEL_COUNTER_001",
      question: "What changes if open evidence gaps are closed?",
      expectedChange: "Ledger confidence should improve and blocked command cards may downgrade to review state.",
      affectedSources: ["AEL_NODE_001", "AEL_NODE_002", "AEL_NODE_003"],
      reviewerUse: "Guide manual evidence completion.",
      blockedUse: "Do not create evidence collection work automatically.",
    },
    {
      id: "AEL_COUNTER_002",
      question: "What changes if governance gates pass?",
      expectedChange: "Export readiness may improve, but operational locks still remain disabled.",
      affectedSources: ["AEL_NODE_004", "AEL_NODE_007"],
      reviewerUse: "Guide safety and governance review.",
      blockedUse: "Do not enable provider, persistence or automation.",
    },
    {
      id: "AEL_COUNTER_003",
      question: "What changes if blocked modules are resolved?",
      expectedChange: "Control tower confidence may improve and escalation paths may be simplified.",
      affectedSources: sourceNodes.filter((node) => node.blockers.length > 0).map((node) => node.id),
      reviewerUse: "Guide cross module review.",
      blockedUse: "Do not turn simulations into dispatch instructions.",
    },
  ];
}

function buildReviewerQuestions(
  context: Required<AgronomicExplainabilityLedgerInput>,
  uncertaintyRegister: UncertaintyRegisterItem[],
): ReviewerQuestion[] {
  return [
    {
      id: "AEL_QUESTION_001",
      priority: context.evidenceGapCount >= 6 ? "urgent" : "high",
      question: "Which evidence gaps prevent a trustworthy board summary?",
      reviewer: "evidence quality reviewer",
      evidenceNeeded: ["Evidence gap register", "Contribution map", "Reviewer notes"],
      safeOutcome: "Manual evidence review agenda only.",
      manualOnly: true,
    },
    {
      id: "AEL_QUESTION_002",
      priority: context.blockedModuleCount > 2 ? "urgent" : "high",
      question: "Which blocked modules dominate the explanation?",
      reviewer: context.reviewerRole,
      evidenceNeeded: ["Module nodes", "Command cards", "Escalation paths"],
      safeOutcome: "Manual cross module review only.",
      manualOnly: true,
    },
    {
      id: "AEL_QUESTION_003",
      priority: context.failedGateCount > 1 ? "urgent" : "medium",
      question: "Which governance gate needs safety review first?",
      reviewer: "safety reviewer",
      evidenceNeeded: ["Governance locks", "Export constraints", "Audit ledger"],
      safeOutcome: "Manual governance review only.",
      manualOnly: true,
    },
    {
      id: "AEL_QUESTION_004",
      priority: "medium",
      question: "Which uncertainty items can be accepted by the reviewer?",
      reviewer: "senior agronomist",
      evidenceNeeded: uncertaintyRegister.map((item) => item.label),
      safeOutcome: "Reviewer acceptance note only.",
      manualOnly: true,
    },
  ];
}

function buildAuditLedger(sourceNodes: ExplanationSourceNode[]): LedgerAuditItem[] {
  return sourceNodes.map((node, index) => ({
    id: `AEL_AUDIT_${String(index + 1).padStart(3, "0")}`,
    event: `Trace source ${node.title}`,
    lane: node.lane,
    severity: node.severity,
    explanation: node.reviewerFocus,
    reviewer:
      node.lane === "governance"
        ? "safety reviewer"
        : node.lane === "evidence"
          ? "evidence quality reviewer"
          : "senior agronomist",
    noWriteGuarantee: true,
  }));
}

export function buildAiAgronomicExplainabilityLedgerReport(
  input: AgronomicExplainabilityLedgerInput = {},
): AgronomicExplainabilityLedgerReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const evidenceContributionMap = buildEvidenceContributionMap(context, sourceNodes);
  const reasoningTrace = buildReasoningTrace(sourceNodes);
  const uncertaintyRegister = buildUncertaintyRegister(context);
  const counterfactualReview = buildCounterfactualReview(sourceNodes);
  const reviewerQuestions = buildReviewerQuestions(context, uncertaintyRegister);
  const auditLedger = buildAuditLedger(sourceNodes);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.contributionScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const uncertaintyPenalty =
    uncertaintyRegister.reduce((sum, item) => sum + severityWeight[item.severity], 0) /
    Math.max(1, uncertaintyRegister.length);

  const blockerPenalty = sourceNodes.filter((node) => node.blockers.length > 0).length * 8;
  const questionPressure =
    reviewerQuestions.reduce((sum, question) => sum + priorityWeight[question.priority], 0) /
    Math.max(1, reviewerQuestions.length * 3);

  const ledgerScore = clampScore(
    sourceAverage +
      context.governanceClarityScore / 10 +
      questionPressure -
      uncertaintyPenalty / 2 -
      blockerPenalty -
      context.failedGateCount * 4,
  );

  const criticalCount = [
    ...sourceNodes.map((node) => node.severity),
    ...uncertaintyRegister.map((item) => item.severity),
  ].filter((severity) => severity === "critical").length;

  const overallSeverity = severityFromConcern(
    clampScore(
      context.evidenceGapCount * 6 +
        context.blockedModuleCount * 9 +
        context.failedGateCount * 11 +
        criticalCount * 10,
    ),
  );

  const ledgerStatus = bandFromScore(ledgerScore, criticalCount);

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_EXPLAINABILITY_LEDGER_READINESS,
    ledgerScore,
    ledgerStatus,
    overallSeverity,
    sourceNodes,
    evidenceContributionMap,
    reasoningTrace,
    uncertaintyRegister,
    counterfactualReview,
    reviewerQuestions,
    auditLedger,
    redactedExportBundle: {
      exportId: "agronomic_explainability_ledger_v11_1_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "source nodes",
        "evidence contribution map",
        "reasoning trace",
        "uncertainty register",
        "counterfactual review",
        "reviewer questions",
        "audit ledger",
        "safety summary",
      ],
    },
    safetySummary: [
      "Explainability ledger is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, alerting or production forecast is produced.",
      "Reasoning trace and counterfactual items are review aids only.",
      "Every explanation remains behind human review and governance locks.",
    ],
  };
}

export const aiAgronomicExplainabilityLedgerVersion = "V11.1";
