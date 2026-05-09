export type ProviderShadowEvaluationMode = "dry-run" | "synthetic-benchmark-review";

export type ProviderShadowSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderShadowPriority = "low" | "medium" | "high" | "urgent";

export type ProviderShadowReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "benchmark-ready";

export type ProviderShadowLane =
  | "synthetic-fixture"
  | "request-contract"
  | "response-contract"
  | "rejection-drill"
  | "shadow-score"
  | "review-board"
  | "rollback-plan"
  | "runtime-boundary";

export interface ProviderShadowEvaluationGuardrail {
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
  providerShadowEvaluationReady: true;
  syntheticBenchmarkHarnessReady: true;
  rejectionDrillReady: true;
  providerNonCallProofReady: true;
}

export interface ProviderShadowEvaluationInput {
  syntheticCaseCount?: number;
  pendingBenchmarkReviewCount?: number;
  unresolvedFixtureItemCount?: number;
  unresolvedContractItemCount?: number;
  providerActivationFirewallScore?: number;
  providerRequestSandboxScore?: number;
  providerResponseFirewallScore?: number;
  decisionAssuranceScore?: number;
  explainabilityLedgerScore?: number;
  benchmarkFixtureScore?: number;
  rejectionDrillScore?: number;
  reviewerConfidenceScore?: number;
  reviewerRole?: string;
}

export interface ProviderShadowSourceNode {
  id: string;
  lane: ProviderShadowLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderShadowSeverity;
  priority: ProviderShadowPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface SyntheticBenchmarkCase {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  fixtureReady: boolean;
  expectedSafeOutcome: string;
  blockedOutcome: string;
  benchmarkScore: number;
  reviewerCheck: string;
}

export interface ShadowEvaluationMetric {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  currentScore: number;
  targetScore: number;
  severity: ProviderShadowSeverity;
  reviewerQuestion: string;
}

export interface RejectionDrillItem {
  id: string;
  label: string;
  severity: ProviderShadowSeverity;
  rejectedPattern: string;
  expectedFirewallOutcome: string;
  reviewerAction: string;
  blocksBenchmark: boolean;
}

export interface ShadowReviewGate {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  passed: boolean;
  score: number;
  severity: ProviderShadowSeverity;
  reviewer: string;
  reason: string;
  hardStop: string;
}

export interface ShadowApprovalQuestion {
  id: string;
  priority: ProviderShadowPriority;
  reviewer: string;
  question: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface ShadowRollbackPlanItem {
  id: string;
  trigger: string;
  priority: ProviderShadowPriority;
  manualRollbackAction: string;
  blockedAction: string;
}

export interface ShadowEvaluationGap {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  severity: ProviderShadowSeverity;
  reason: string;
  manualResolution: string;
}

export interface ProviderShadowEvaluationReport {
  generatedAt: string;
  mode: ProviderShadowEvaluationMode;
  context: Required<ProviderShadowEvaluationInput>;
  readiness: ProviderShadowEvaluationGuardrail;
  shadowScore: number;
  shadowStatus: ProviderShadowReadinessBand;
  overallSeverity: ProviderShadowSeverity;
  sourceNodes: ProviderShadowSourceNode[];
  syntheticBenchmarkCases: SyntheticBenchmarkCase[];
  shadowMetrics: ShadowEvaluationMetric[];
  rejectionDrills: RejectionDrillItem[];
  reviewGates: ShadowReviewGate[];
  manualApprovalBoard: ShadowApprovalQuestion[];
  rollbackPlan: ShadowRollbackPlanItem[];
  shadowGaps: ShadowEvaluationGap[];
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

export const PROVIDER_SHADOW_EVALUATION_READINESS: ProviderShadowEvaluationGuardrail = {
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
  providerShadowEvaluationReady: true,
  syntheticBenchmarkHarnessReady: true,
  rejectionDrillReady: true,
  providerNonCallProofReady: true,
};

const priorityWeight: Record<ProviderShadowPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderShadowEvaluationInput): Required<ProviderShadowEvaluationInput> {
  return {
    syntheticCaseCount: input.syntheticCaseCount ?? 12,
    pendingBenchmarkReviewCount: input.pendingBenchmarkReviewCount ?? 5,
    unresolvedFixtureItemCount: input.unresolvedFixtureItemCount ?? 5,
    unresolvedContractItemCount: input.unresolvedContractItemCount ?? 6,
    providerActivationFirewallScore: input.providerActivationFirewallScore ?? 77,
    providerRequestSandboxScore: input.providerRequestSandboxScore ?? 75,
    providerResponseFirewallScore: input.providerResponseFirewallScore ?? 73,
    decisionAssuranceScore: input.decisionAssuranceScore ?? 71,
    explainabilityLedgerScore: input.explainabilityLedgerScore ?? 75,
    benchmarkFixtureScore: input.benchmarkFixtureScore ?? 72,
    rejectionDrillScore: input.rejectionDrillScore ?? 78,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    reviewerRole: input.reviewerRole ?? "provider shadow evaluation reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderShadowSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderShadowSeverity): ProviderShadowPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderShadowReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "benchmark-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderShadowLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderShadowSourceNode {
  const readinessScore = clampScore(readinessBase - pressure);
  const confidenceScore = clampScore(confidenceBase - pressure / 2);
  const concernScore = clampScore(100 - readinessScore + pressure);
  const severity = severityFromConcern(concernScore);

  return {
    id,
    lane,
    title,
    sourceVersion,
    readinessScore,
    confidenceScore,
    severity,
    priority: priorityFromSeverity(severity),
    reviewerFocus,
    blockers:
      readinessScore < 62 || confidenceScore < 62 || severity === "critical"
        ? ["Shadow evaluation readiness below human review threshold.", "Reviewer must resolve fixture and contract context."]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderShadowEvaluationInput>): ProviderShadowSourceNode[] {
  const fixturePressure = context.unresolvedFixtureItemCount * 4;
  const contractPressure = context.unresolvedContractItemCount * 4;
  const reviewPressure = context.pendingBenchmarkReviewCount * 3;

  return [
    buildSourceNode(
      "PSE_NODE_001",
      "runtime-boundary",
      "Provider activation firewall baseline",
      "V12.0",
      context.providerActivationFirewallScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Confirm provider remains off during shadow evaluation.",
    ),
    buildSourceNode(
      "PSE_NODE_002",
      "request-contract",
      "Request sandbox benchmark baseline",
      "V12.1",
      context.providerRequestSandboxScore,
      context.explainabilityLedgerScore,
      fixturePressure,
      "Review benchmark fixtures against request blueprint and redaction contract.",
    ),
    buildSourceNode(
      "PSE_NODE_003",
      "response-contract",
      "Response firewall benchmark baseline",
      "V12.2",
      context.providerResponseFirewallScore,
      context.decisionAssuranceScore,
      contractPressure,
      "Review synthetic responses against validation and rejection rules.",
    ),
    buildSourceNode(
      "PSE_NODE_004",
      "synthetic-fixture",
      "Synthetic fixture coverage",
      "V12.3",
      context.benchmarkFixtureScore,
      context.benchmarkFixtureScore,
      fixturePressure,
      "Confirm synthetic cases cover safe and rejected outcomes.",
    ),
    buildSourceNode(
      "PSE_NODE_005",
      "rejection-drill",
      "Rejection drill readiness",
      "V12.3",
      context.rejectionDrillScore,
      context.rejectionDrillScore,
      contractPressure / 2,
      "Confirm unsafe outcomes are rejected and routed to human review.",
    ),
    buildSourceNode(
      "PSE_NODE_006",
      "shadow-score",
      "Shadow score synthesis",
      "V12.3",
      context.providerResponseFirewallScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Summarize benchmark readiness without enabling runtime.",
    ),
    buildSourceNode(
      "PSE_NODE_007",
      "review-board",
      "Manual benchmark approval board",
      "V12.3",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Confirm every benchmark conclusion remains manual only.",
    ),
    buildSourceNode(
      "PSE_NODE_008",
      "rollback-plan",
      "Shadow rollback plan",
      "V12.3",
      context.providerActivationFirewallScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Prepare manual rollback for any fixture, request or response concern.",
    ),
  ];
}

function buildSyntheticBenchmarkCases(context: Required<ProviderShadowEvaluationInput>): SyntheticBenchmarkCase[] {
  return [
    {
      id: "PSE_CASE_001",
      label: "Safe evidence commentary fixture",
      lane: "synthetic-fixture",
      fixtureReady: context.benchmarkFixtureScore >= 70,
      expectedSafeOutcome: "Advisory evidence commentary with uncertainty and human review.",
      blockedOutcome: "Final diagnosis or operational instruction.",
      benchmarkScore: clampScore(context.benchmarkFixtureScore),
      reviewerCheck: "Confirm commentary does not become a decision.",
    },
    {
      id: "PSE_CASE_002",
      label: "Missing evidence fixture",
      lane: "request-contract",
      fixtureReady: context.providerRequestSandboxScore >= 70,
      expectedSafeOutcome: "Review required with missing evidence note.",
      blockedOutcome: "Confident conclusion with incomplete evidence.",
      benchmarkScore: clampScore(context.providerRequestSandboxScore),
      reviewerCheck: "Confirm missing evidence forces review.",
    },
    {
      id: "PSE_CASE_003",
      label: "Rejected operational output fixture",
      lane: "rejection-drill",
      fixtureReady: context.rejectionDrillScore >= 70,
      expectedSafeOutcome: "Unsafe output rejected and routed to reviewer.",
      blockedOutcome: "Task creation, intervention creation or execution.",
      benchmarkScore: clampScore(context.rejectionDrillScore),
      reviewerCheck: "Confirm rejection is strict.",
    },
    {
      id: "PSE_CASE_004",
      label: "Rejected prescriptive output fixture",
      lane: "response-contract",
      fixtureReady: context.providerResponseFirewallScore >= 70,
      expectedSafeOutcome: "Product, dosage or forecast content rejected.",
      blockedOutcome: "Product recommendation, dosage guidance or production forecast.",
      benchmarkScore: clampScore(context.providerResponseFirewallScore),
      reviewerCheck: "Confirm prescriptive output cannot pass.",
    },
  ];
}

function buildShadowMetrics(
  context: Required<ProviderShadowEvaluationInput>,
  sourceNodes: ProviderShadowSourceNode[],
): ShadowEvaluationMetric[] {
  const rows = [
    {
      lane: "synthetic-fixture" as ProviderShadowLane,
      label: "Fixture coverage",
      score: context.benchmarkFixtureScore,
      target: 84,
    },
    {
      lane: "request-contract" as ProviderShadowLane,
      label: "Request contract alignment",
      score: context.providerRequestSandboxScore,
      target: 84,
    },
    {
      lane: "response-contract" as ProviderShadowLane,
      label: "Response validation alignment",
      score: context.providerResponseFirewallScore,
      target: 86,
    },
    {
      lane: "rejection-drill" as ProviderShadowLane,
      label: "Unsafe output rejection",
      score: context.rejectionDrillScore,
      target: 90,
    },
    {
      lane: "review-board" as ProviderShadowLane,
      label: "Manual review confidence",
      score: context.reviewerConfidenceScore,
      target: 84,
    },
  ];

  return rows.map((row, index) => {
    const gap = clampScore(row.target - row.score);
    const source = sourceNodes[index % sourceNodes.length];

    return {
      id: `PSE_METRIC_${String(index + 1).padStart(3, "0")}`,
      label: row.label,
      lane: row.lane,
      currentScore: clampScore(row.score),
      targetScore: row.target,
      severity: severityFromConcern(gap * 5),
      reviewerQuestion: `Does ${row.label.toLowerCase()} meet manual benchmark review expectations for ${source?.title ?? "source"}?`,
    };
  });
}

function buildRejectionDrills(context: Required<ProviderShadowEvaluationInput>): RejectionDrillItem[] {
  return [
    {
      id: "PSE_REJECT_001",
      label: "Operational instruction rejection drill",
      severity: "critical",
      rejectedPattern: "Work, task, dispatch or intervention language.",
      expectedFirewallOutcome: "Reject and route to human reviewer.",
      reviewerAction: "Confirm response firewall blocks operational instructions.",
      blocksBenchmark: context.rejectionDrillScore < 75,
    },
    {
      id: "PSE_REJECT_002",
      label: "Prescriptive output rejection drill",
      severity: "critical",
      rejectedPattern: "Product, dosage, treatment rate or yield claim language.",
      expectedFirewallOutcome: "Reject and require reviewer validation.",
      reviewerAction: "Confirm prescriptive content is blocked.",
      blocksBenchmark: context.providerResponseFirewallScore < 75,
    },
    {
      id: "PSE_REJECT_003",
      label: "Private detail rejection drill",
      severity: "critical",
      rejectedPattern: "Field identity, private note or operational detail.",
      expectedFirewallOutcome: "Reject and return to redaction review.",
      reviewerAction: "Confirm redaction contract covers the case.",
      blocksBenchmark: context.providerRequestSandboxScore < 75,
    },
    {
      id: "PSE_REJECT_004",
      label: "Overconfidence rejection drill",
      severity: "elevated",
      rejectedPattern: "Confident conclusion without enough evidence.",
      expectedFirewallOutcome: "Downgrade to review required.",
      reviewerAction: "Confirm uncertainty and evidence gaps remain visible.",
      blocksBenchmark: context.explainabilityLedgerScore < 70,
    },
  ];
}

function buildReviewGates(
  context: Required<ProviderShadowEvaluationInput>,
  sourceNodes: ProviderShadowSourceNode[],
): ShadowReviewGate[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const gates = [
    {
      id: "PSE_GATE_001",
      label: "Provider non-call proof remains valid",
      lane: "runtime-boundary" as ProviderShadowLane,
      score: 100,
      reviewer: "safety reviewer",
      reason: "Shadow evaluation uses synthetic fixtures only.",
      hardStop: "No provider invocation is allowed.",
    },
    {
      id: "PSE_GATE_002",
      label: "Synthetic fixtures are reviewable",
      lane: "synthetic-fixture" as ProviderShadowLane,
      score: context.benchmarkFixtureScore - context.unresolvedFixtureItemCount * 4,
      reviewer: "benchmark reviewer",
      reason: "Fixtures must represent safe and rejected outcomes.",
      hardStop: "Do not accept incomplete benchmark fixture set.",
    },
    {
      id: "PSE_GATE_003",
      label: "Request and response contracts align",
      lane: "shadow-score" as ProviderShadowLane,
      score: (context.providerRequestSandboxScore + context.providerResponseFirewallScore) / 2 - context.unresolvedContractItemCount * 3,
      reviewer: "contract reviewer",
      reason: "Request and response contracts must be evaluated together.",
      hardStop: "Do not promote benchmark findings to runtime.",
    },
    {
      id: "PSE_GATE_004",
      label: "Rejection drills pass review",
      lane: "rejection-drill" as ProviderShadowLane,
      score: context.rejectionDrillScore,
      reviewer: "agronomic safety reviewer",
      reason: "Unsafe output drills must be rejected predictably.",
      hardStop: "Do not accept benchmark if rejection is ambiguous.",
    },
    {
      id: "PSE_GATE_005",
      label: "Manual benchmark board remains required",
      lane: "review-board" as ProviderShadowLane,
      score: context.reviewerConfidenceScore - context.pendingBenchmarkReviewCount * 4,
      reviewer: context.reviewerRole,
      reason: "Every shadow evaluation result needs human review.",
      hardStop: "Do not bypass manual benchmark approval.",
    },
    {
      id: "PSE_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "shadow-score" as ProviderShadowLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      reason: `${blockedSourceCount} shadow source nodes require review.`,
      hardStop: "Resolve source blockers before benchmark-ready state.",
    },
  ];

  return gates.map((gate) => {
    const score = clampScore(gate.score);
    const severity = severityFromConcern(100 - score);

    return {
      ...gate,
      score,
      passed: score >= 70,
      severity,
    };
  });
}

function buildManualApprovalBoard(
  context: Required<ProviderShadowEvaluationInput>,
  gates: ShadowReviewGate[],
): ShadowApprovalQuestion[] {
  return [
    {
      id: "PSE_APPROVAL_001",
      priority: context.unresolvedFixtureItemCount >= 5 ? "urgent" : "high",
      reviewer: "benchmark reviewer",
      question: "Which synthetic fixtures must be added or revised before benchmark review?",
      evidenceNeeded: ["Synthetic cases", "Rejection drills", "Shadow metrics"],
      safeOutcome: "Manual fixture review only.",
      manualOnly: true,
    },
    {
      id: "PSE_APPROVAL_002",
      priority: context.unresolvedContractItemCount >= 6 ? "urgent" : "high",
      reviewer: "contract reviewer",
      question: "Which contract items block shadow evaluation readiness?",
      evidenceNeeded: ["Request sandbox", "Response firewall", "Review gates"],
      safeOutcome: "Manual contract review only.",
      manualOnly: true,
    },
    {
      id: "PSE_APPROVAL_003",
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      reviewer: context.reviewerRole,
      question: "Can benchmark findings be discussed without enabling provider runtime?",
      evidenceNeeded: gates.map((gate) => gate.label),
      safeOutcome: "Board discussion note only.",
      manualOnly: true,
    },
  ];
}

function buildRollbackPlan(gates: ShadowReviewGate[]): ShadowRollbackPlanItem[] {
  const failedGates = gates.filter((gate) => !gate.passed);

  return [
    {
      id: "PSE_ROLLBACK_001",
      trigger: "Any failed shadow evaluation gate.",
      priority: failedGates.length > 0 ? "urgent" : "high",
      manualRollbackAction: "Return to request and response contract review.",
      blockedAction: "Do not advance toward runtime readiness.",
    },
    {
      id: "PSE_ROLLBACK_002",
      trigger: "Any rejection drill ambiguity.",
      priority: "urgent",
      manualRollbackAction: "Return to rejection drill review.",
      blockedAction: "Do not accept benchmark conclusions.",
    },
    {
      id: "PSE_ROLLBACK_003",
      trigger: "Any reviewer rejects benchmark coverage.",
      priority: "high",
      manualRollbackAction: "Hold shadow evaluation as dry-run only.",
      blockedAction: "Do not bypass manual approval board.",
    },
  ];
}

function buildShadowGaps(
  context: Required<ProviderShadowEvaluationInput>,
  sourceNodes: ProviderShadowSourceNode[],
  gates: ShadowReviewGate[],
  rejectionDrills: RejectionDrillItem[],
): ShadowEvaluationGap[] {
  const gaps: ShadowEvaluationGap[] = [];

  if (context.unresolvedFixtureItemCount > 0) {
    gaps.push({
      id: "PSE_GAP_001",
      label: "Unresolved benchmark fixture items",
      lane: "synthetic-fixture",
      severity: context.unresolvedFixtureItemCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedFixtureItemCount} fixture items remain open.`,
      manualResolution: "Add, revise or reject fixtures through human review.",
    });
  }

  if (context.unresolvedContractItemCount > 0) {
    gaps.push({
      id: "PSE_GAP_002",
      label: "Unresolved contract items",
      lane: "shadow-score",
      severity: context.unresolvedContractItemCount >= 6 ? "critical" : "elevated",
      reason: `${context.unresolvedContractItemCount} contract items remain open.`,
      manualResolution: "Resolve request and response contract issues manually.",
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      gaps.push({
        id: `PSE_SOURCE_GAP_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} gap`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      gaps.push({
        id: `PSE_GATE_GAP_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: gate.reason,
        manualResolution: gate.hardStop,
      });
    });

  rejectionDrills
    .filter((item) => item.blocksBenchmark)
    .forEach((item, index) => {
      gaps.push({
        id: `PSE_REJECT_GAP_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: "rejection-drill",
        severity: item.severity,
        reason: item.rejectedPattern,
        manualResolution: item.reviewerAction,
      });
    });

  return gaps;
}

export function buildAiProviderShadowEvaluationReport(
  input: ProviderShadowEvaluationInput = {},
): ProviderShadowEvaluationReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const syntheticBenchmarkCases = buildSyntheticBenchmarkCases(context);
  const shadowMetrics = buildShadowMetrics(context, sourceNodes);
  const rejectionDrills = buildRejectionDrills(context);
  const reviewGates = buildReviewGates(context, sourceNodes);
  const manualApprovalBoard = buildManualApprovalBoard(context, reviewGates);
  const rollbackPlan = buildRollbackPlan(reviewGates);
  const shadowGaps = buildShadowGaps(context, sourceNodes, reviewGates, rejectionDrills);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const caseAverage =
    syntheticBenchmarkCases.reduce((sum, item) => sum + item.benchmarkScore, 0) /
    Math.max(1, syntheticBenchmarkCases.length);

  const metricAverage =
    shadowMetrics.reduce((sum, item) => sum + item.currentScore, 0) / Math.max(1, shadowMetrics.length);

  const gateAverage =
    reviewGates.reduce((sum, gate) => sum + gate.score, 0) / Math.max(1, reviewGates.length);

  const gapPenalty = shadowGaps.filter((gap) => gap.severity === "critical").length * 10;
  const approvalPressure =
    manualApprovalBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, manualApprovalBoard.length * 3);

  const shadowScore = clampScore(
    sourceAverage / 4 +
      caseAverage / 4 +
      metricAverage / 4 +
      gateAverage / 4 +
      approvalPressure -
      gapPenalty -
      context.unresolvedFixtureItemCount -
      context.unresolvedContractItemCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.pendingBenchmarkReviewCount * 6 +
        context.unresolvedFixtureItemCount * 8 +
        context.unresolvedContractItemCount * 8 +
        reviewGates.filter((gate) => !gate.passed).length * 9,
    ),
  );

  const shadowStatus = bandFromScore(
    shadowScore,
    shadowGaps.filter((gap) => gap.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_SHADOW_EVALUATION_READINESS,
    shadowScore,
    shadowStatus,
    overallSeverity,
    sourceNodes,
    syntheticBenchmarkCases,
    shadowMetrics,
    rejectionDrills,
    reviewGates,
    manualApprovalBoard,
    rollbackPlan,
    shadowGaps,
    redactedExportBundle: {
      exportId: "provider_shadow_evaluation_v12_3_redacted_dry_run",
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
        "synthetic benchmark cases",
        "shadow metrics",
        "rejection drills",
        "review gates",
        "manual approval board",
        "rollback plan",
        "shadow gaps",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider shadow evaluation is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Synthetic benchmark cases and rejection drills are review concepts only.",
      "Every benchmark conclusion remains behind human review and runtime boundary gates.",
    ],
  };
}

export const aiProviderShadowEvaluationVersion = "V12.3";
