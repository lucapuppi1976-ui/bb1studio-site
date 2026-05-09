export type ProviderResponseFirewallMode = "dry-run" | "response-contract-review";

export type ProviderResponseSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderResponsePriority = "low" | "medium" | "high" | "urgent";

export type ProviderResponseReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "response-review-ready";

export type ProviderResponseLane =
  | "response-envelope"
  | "output-validation"
  | "safety-rejection"
  | "reviewer-validation"
  | "contract-breach"
  | "schema-conformance"
  | "rollback-plan"
  | "runtime-firewall";

export interface ProviderResponseFirewallGuardrail {
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
  providerResponseFirewallReady: true;
  outputValidationContractReady: true;
  unsafeOutputRejectionReady: true;
  providerNonCallProofReady: true;
}

export interface ProviderResponseFirewallInput {
  activeCaseCount?: number;
  pendingResponseReviewCount?: number;
  unresolvedOutputItemCount?: number;
  unresolvedValidationItemCount?: number;
  providerActivationFirewallScore?: number;
  providerRequestSandboxScore?: number;
  decisionAssuranceScore?: number;
  compliancePassportScore?: number;
  explainabilityLedgerScore?: number;
  responseEnvelopeScore?: number;
  outputValidationScore?: number;
  rejectionRuleScore?: number;
  reviewerConfidenceScore?: number;
  reviewerRole?: string;
}

export interface ProviderResponseSourceNode {
  id: string;
  lane: ProviderResponseLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderResponseSeverity;
  priority: ProviderResponsePriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ResponseEnvelopeSection {
  id: string;
  label: string;
  required: true;
  readinessScore: number;
  reviewerCheck: string;
  allowedContent: string[];
  blockedContent: string[];
}

export interface OutputValidationGate {
  id: string;
  label: string;
  lane: ProviderResponseLane;
  passed: boolean;
  score: number;
  severity: ProviderResponseSeverity;
  reviewer: string;
  reason: string;
  hardStop: string;
}

export interface UnsafeOutputRule {
  id: string;
  label: string;
  severity: ProviderResponseSeverity;
  enforced: true;
  ruleSummary: string;
  rejectedOutputs: string[];
  reviewer: string;
}

export interface ContractBreachItem {
  id: string;
  label: string;
  severity: ProviderResponseSeverity;
  breachReason: string;
  reviewerQuestion: string;
  manualResolution: string;
  blocksResponseUse: boolean;
}

export interface ReviewerValidationItem {
  id: string;
  priority: ProviderResponsePriority;
  reviewer: string;
  question: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface ResponseRollbackItem {
  id: string;
  trigger: string;
  priority: ProviderResponsePriority;
  manualRollbackAction: string;
  blockedAction: string;
}

export interface ProviderResponseGap {
  id: string;
  label: string;
  lane: ProviderResponseLane;
  severity: ProviderResponseSeverity;
  reason: string;
  manualResolution: string;
}

export interface ProviderResponseFirewallReport {
  generatedAt: string;
  mode: ProviderResponseFirewallMode;
  context: Required<ProviderResponseFirewallInput>;
  readiness: ProviderResponseFirewallGuardrail;
  responseFirewallScore: number;
  responseFirewallStatus: ProviderResponseReadinessBand;
  overallSeverity: ProviderResponseSeverity;
  sourceNodes: ProviderResponseSourceNode[];
  responseEnvelope: ResponseEnvelopeSection[];
  outputValidationGates: OutputValidationGate[];
  unsafeOutputRules: UnsafeOutputRule[];
  contractBreachRegister: ContractBreachItem[];
  reviewerValidationBoard: ReviewerValidationItem[];
  rollbackPlan: ResponseRollbackItem[];
  responseGaps: ProviderResponseGap[];
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

export const PROVIDER_RESPONSE_FIREWALL_READINESS: ProviderResponseFirewallGuardrail = {
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
  providerResponseFirewallReady: true,
  outputValidationContractReady: true,
  unsafeOutputRejectionReady: true,
  providerNonCallProofReady: true,
};

const priorityWeight: Record<ProviderResponsePriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderResponseFirewallInput): Required<ProviderResponseFirewallInput> {
  return {
    activeCaseCount: input.activeCaseCount ?? 9,
    pendingResponseReviewCount: input.pendingResponseReviewCount ?? 5,
    unresolvedOutputItemCount: input.unresolvedOutputItemCount ?? 5,
    unresolvedValidationItemCount: input.unresolvedValidationItemCount ?? 6,
    providerActivationFirewallScore: input.providerActivationFirewallScore ?? 76,
    providerRequestSandboxScore: input.providerRequestSandboxScore ?? 74,
    decisionAssuranceScore: input.decisionAssuranceScore ?? 70,
    compliancePassportScore: input.compliancePassportScore ?? 72,
    explainabilityLedgerScore: input.explainabilityLedgerScore ?? 75,
    responseEnvelopeScore: input.responseEnvelopeScore ?? 73,
    outputValidationScore: input.outputValidationScore ?? 71,
    rejectionRuleScore: input.rejectionRuleScore ?? 78,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    reviewerRole: input.reviewerRole ?? "provider response firewall reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderResponseSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderResponseSeverity): ProviderResponsePriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderResponseReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "response-review-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderResponseLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderResponseSourceNode {
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
        ? ["Response firewall readiness below human review threshold.", "Reviewer must resolve validation and rejection context."]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderResponseFirewallInput>): ProviderResponseSourceNode[] {
  const outputPressure = context.unresolvedOutputItemCount * 4;
  const validationPressure = context.unresolvedValidationItemCount * 4;
  const reviewPressure = context.pendingResponseReviewCount * 3;

  return [
    buildSourceNode(
      "PRF_NODE_001",
      "runtime-firewall",
      "Provider activation firewall context",
      "V12.0",
      context.providerActivationFirewallScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Confirm provider remains off and runtime firewall remains active.",
    ),
    buildSourceNode(
      "PRF_NODE_002",
      "response-envelope",
      "Request sandbox response envelope",
      "V12.1",
      context.providerRequestSandboxScore,
      context.responseEnvelopeScore,
      outputPressure,
      "Review response envelope shape without accepting any provider output.",
    ),
    buildSourceNode(
      "PRF_NODE_003",
      "output-validation",
      "Output validation contract",
      "V12.2",
      context.outputValidationScore,
      context.decisionAssuranceScore,
      validationPressure,
      "Confirm future output cannot become operational instruction.",
    ),
    buildSourceNode(
      "PRF_NODE_004",
      "safety-rejection",
      "Unsafe output rejection rules",
      "V12.2",
      context.rejectionRuleScore,
      context.rejectionRuleScore,
      outputPressure / 2,
      "Confirm unsafe or incomplete output is rejected for human review.",
    ),
    buildSourceNode(
      "PRF_NODE_005",
      "reviewer-validation",
      "Reviewer validation board",
      "V12.2",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Confirm all response use remains behind human reviewer validation.",
    ),
    buildSourceNode(
      "PRF_NODE_006",
      "contract-breach",
      "Contract breach register",
      "V12.2",
      context.outputValidationScore,
      context.compliancePassportScore,
      validationPressure / 2,
      "Track breach reasons as manual review topics only.",
    ),
    buildSourceNode(
      "PRF_NODE_007",
      "schema-conformance",
      "Response shape conformance",
      "V12.2",
      context.responseEnvelopeScore,
      context.explainabilityLedgerScore,
      outputPressure / 2,
      "Confirm response shape can be reviewed without becoming final diagnosis.",
    ),
    buildSourceNode(
      "PRF_NODE_008",
      "rollback-plan",
      "Response firewall rollback plan",
      "V12.2",
      context.providerActivationFirewallScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Prepare manual rollback when any output contract issue appears.",
    ),
  ];
}

function buildResponseEnvelope(context: Required<ProviderResponseFirewallInput>): ResponseEnvelopeSection[] {
  return [
    {
      id: "PRF_ENVELOPE_001",
      label: "Evidence commentary",
      required: true,
      readinessScore: clampScore(context.explainabilityLedgerScore),
      reviewerCheck: "Confirm commentary remains advisory and uncertainty-aware.",
      allowedContent: ["Evidence summary", "Confidence caveat", "Missing evidence note"],
      blockedContent: ["Final diagnosis", "Task instruction", "Intervention instruction"],
    },
    {
      id: "PRF_ENVELOPE_002",
      label: "Safety status",
      required: true,
      readinessScore: clampScore(context.rejectionRuleScore),
      reviewerCheck: "Confirm unsafe or incomplete content can force review-required status.",
      allowedContent: ["Review required", "Insufficient evidence", "Human reviewer needed"],
      blockedContent: ["Automatic approval", "Execution approval", "Public alert"],
    },
    {
      id: "PRF_ENVELOPE_003",
      label: "Reviewer checklist",
      required: true,
      readinessScore: clampScore(context.decisionAssuranceScore),
      reviewerCheck: "Confirm checklist prompts human review only.",
      allowedContent: ["Reviewer question", "Manual signoff prompt", "Evidence gap prompt"],
      blockedContent: ["Dispatch instruction", "Work order", "Stored review result"],
    },
    {
      id: "PRF_ENVELOPE_004",
      label: "Non-operational boundary",
      required: true,
      readinessScore: clampScore(context.providerActivationFirewallScore),
      reviewerCheck: "Confirm boundary blocks prescription, dosage and forecast output.",
      allowedContent: ["Boundary statement", "Dry-run caveat", "Manual review caveat"],
      blockedContent: ["Product recommendation", "Dosage guidance", "Production forecast"],
    },
  ];
}

function buildUnsafeOutputRules(): UnsafeOutputRule[] {
  return [
    {
      id: "PRF_REJECT_001",
      label: "Operational instruction rejection",
      severity: "critical",
      enforced: true,
      ruleSummary: "Any work, task, dispatch or intervention output is rejected.",
      rejectedOutputs: ["Task instruction", "Work order", "Intervention step", "Execution approval"],
      reviewer: "operations reviewer",
    },
    {
      id: "PRF_REJECT_002",
      label: "Prescriptive content rejection",
      severity: "critical",
      enforced: true,
      ruleSummary: "Any product, dosage or treatment prescription is rejected.",
      rejectedOutputs: ["Product recommendation", "Dosage guidance", "Treatment rate", "Mixture instruction"],
      reviewer: "agronomic safety reviewer",
    },
    {
      id: "PRF_REJECT_003",
      label: "Forecast claim rejection",
      severity: "critical",
      enforced: true,
      ruleSummary: "Any production, yield or guaranteed outcome claim is rejected.",
      rejectedOutputs: ["Production forecast", "Yield claim", "Guaranteed result", "Certification claim"],
      reviewer: "compliance reviewer",
    },
    {
      id: "PRF_REJECT_004",
      label: "Private detail rejection",
      severity: "critical",
      enforced: true,
      ruleSummary: "Any field identity, private note or operational detail is rejected.",
      rejectedOutputs: ["Field identifier", "Private note", "Operator detail", "Operational internal data"],
      reviewer: "redaction reviewer",
    },
  ];
}

function buildOutputValidationGates(
  context: Required<ProviderResponseFirewallInput>,
  sourceNodes: ProviderResponseSourceNode[],
): OutputValidationGate[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const gates = [
    {
      id: "PRF_GATE_001",
      label: "Provider non-call proof remains valid",
      lane: "runtime-firewall" as ProviderResponseLane,
      score: 100,
      reviewer: "safety reviewer",
      reason: "Response firewall validates hypothetical response contracts only.",
      hardStop: "No provider invocation is allowed.",
    },
    {
      id: "PRF_GATE_002",
      label: "Response envelope is reviewable",
      lane: "response-envelope" as ProviderResponseLane,
      score: context.responseEnvelopeScore - context.unresolvedOutputItemCount * 4,
      reviewer: "response contract reviewer",
      reason: "Response envelope must be complete and non-operational.",
      hardStop: "Do not accept incomplete response shapes.",
    },
    {
      id: "PRF_GATE_003",
      label: "Output validation is strong enough",
      lane: "output-validation" as ProviderResponseLane,
      score: context.outputValidationScore - context.unresolvedValidationItemCount * 4,
      reviewer: "output validation reviewer",
      reason: "Validation must block operational and prescriptive content.",
      hardStop: "Do not promote output contract to runtime.",
    },
    {
      id: "PRF_GATE_004",
      label: "Unsafe output rejection is enforced",
      lane: "safety-rejection" as ProviderResponseLane,
      score: context.rejectionRuleScore,
      reviewer: "agronomic safety reviewer",
      reason: "Rejection rules must remain visible and strict.",
      hardStop: "Do not accept unsafe output.",
    },
    {
      id: "PRF_GATE_005",
      label: "Reviewer validation remains required",
      lane: "reviewer-validation" as ProviderResponseLane,
      score: context.reviewerConfidenceScore - context.pendingResponseReviewCount * 4,
      reviewer: context.reviewerRole,
      reason: "Every future response must remain behind human validation.",
      hardStop: "Do not bypass reviewer validation.",
    },
    {
      id: "PRF_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "schema-conformance" as ProviderResponseLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      reason: `${blockedSourceCount} source nodes require review.`,
      hardStop: "Resolve source blockers before response-review-ready state.",
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

function buildContractBreachRegister(
  context: Required<ProviderResponseFirewallInput>,
  gates: OutputValidationGate[],
): ContractBreachItem[] {
  const failedItems = gates
    .filter((gate) => !gate.passed)
    .map((gate, index) => ({
      id: `PRF_BREACH_${String(index + 1).padStart(3, "0")}`,
      label: gate.label,
      severity: gate.severity,
      breachReason: gate.reason,
      reviewerQuestion: `What must be fixed before ${gate.label.toLowerCase()} can pass?`,
      manualResolution: gate.hardStop,
      blocksResponseUse: true,
    }));

  if (failedItems.length > 0) {
    return failedItems;
  }

  return [
    {
      id: "PRF_BREACH_001",
      label: "No blocking breach in fixture",
      severity: context.unresolvedOutputItemCount > 0 ? "watch" : "info",
      breachReason: "Current dry-run fixture has no failed validation gate.",
      reviewerQuestion: "Does the reviewer accept the response contract as review-only?",
      manualResolution: "Record human acceptance outside this dry-run packet.",
      blocksResponseUse: false,
    },
  ];
}

function buildReviewerValidationBoard(
  context: Required<ProviderResponseFirewallInput>,
  gates: OutputValidationGate[],
): ReviewerValidationItem[] {
  return [
    {
      id: "PRF_REVIEW_001",
      priority: context.unresolvedOutputItemCount >= 5 ? "urgent" : "high",
      reviewer: "response contract reviewer",
      question: "Which output items must be removed or constrained before review?",
      evidenceNeeded: ["Response envelope", "Output validation gates", "Unsafe output rules"],
      safeOutcome: "Manual response contract review only.",
      manualOnly: true,
    },
    {
      id: "PRF_REVIEW_002",
      priority: context.unresolvedValidationItemCount >= 6 ? "urgent" : "high",
      reviewer: "agronomic safety reviewer",
      question: "Which validation items block response review readiness?",
      evidenceNeeded: ["Rejection rules", "Output contract", "Decision assurance packet"],
      safeOutcome: "Manual validation review only.",
      manualOnly: true,
    },
    {
      id: "PRF_REVIEW_003",
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      reviewer: context.reviewerRole,
      question: "Can the response firewall be discussed without enabling provider runtime?",
      evidenceNeeded: gates.map((gate) => gate.label),
      safeOutcome: "Board discussion note only.",
      manualOnly: true,
    },
  ];
}

function buildRollbackPlan(gates: OutputValidationGate[]): ResponseRollbackItem[] {
  const failedGates = gates.filter((gate) => !gate.passed);

  return [
    {
      id: "PRF_ROLLBACK_001",
      trigger: "Any failed response validation gate.",
      priority: failedGates.length > 0 ? "urgent" : "high",
      manualRollbackAction: "Return to request sandbox and output contract review.",
      blockedAction: "Do not advance toward runtime acceptance.",
    },
    {
      id: "PRF_ROLLBACK_002",
      trigger: "Any unsafe output pattern appears.",
      priority: "urgent",
      manualRollbackAction: "Return to unsafe output rejection review.",
      blockedAction: "Do not accept, store or display operational output.",
    },
    {
      id: "PRF_ROLLBACK_003",
      trigger: "Any reviewer rejects the response contract.",
      priority: "high",
      manualRollbackAction: "Hold response firewall as dry-run only.",
      blockedAction: "Do not bypass manual validation board.",
    },
  ];
}

function buildResponseGaps(
  context: Required<ProviderResponseFirewallInput>,
  sourceNodes: ProviderResponseSourceNode[],
  gates: OutputValidationGate[],
  breaches: ContractBreachItem[],
): ProviderResponseGap[] {
  const gaps: ProviderResponseGap[] = [];

  if (context.unresolvedOutputItemCount > 0) {
    gaps.push({
      id: "PRF_GAP_001",
      label: "Unresolved output review items",
      lane: "output-validation",
      severity: context.unresolvedOutputItemCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedOutputItemCount} output review items remain open.`,
      manualResolution: "Remove, constrain or reject output items through human review.",
    });
  }

  if (context.unresolvedValidationItemCount > 0) {
    gaps.push({
      id: "PRF_GAP_002",
      label: "Unresolved validation items",
      lane: "schema-conformance",
      severity: context.unresolvedValidationItemCount >= 6 ? "critical" : "elevated",
      reason: `${context.unresolvedValidationItemCount} validation items remain open.`,
      manualResolution: "Resolve validation contract manually before review-ready state.",
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      gaps.push({
        id: `PRF_SOURCE_GAP_${String(index + 1).padStart(3, "0")}`,
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
        id: `PRF_GATE_GAP_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: gate.reason,
        manualResolution: gate.hardStop,
      });
    });

  breaches
    .filter((item) => item.blocksResponseUse)
    .forEach((item, index) => {
      gaps.push({
        id: `PRF_BREACH_GAP_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: "contract-breach",
        severity: item.severity,
        reason: item.breachReason,
        manualResolution: item.manualResolution,
      });
    });

  return gaps;
}

export function buildAiProviderResponseFirewallReport(
  input: ProviderResponseFirewallInput = {},
): ProviderResponseFirewallReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const responseEnvelope = buildResponseEnvelope(context);
  const outputValidationGates = buildOutputValidationGates(context, sourceNodes);
  const unsafeOutputRules = buildUnsafeOutputRules();
  const contractBreachRegister = buildContractBreachRegister(context, outputValidationGates);
  const reviewerValidationBoard = buildReviewerValidationBoard(context, outputValidationGates);
  const rollbackPlan = buildRollbackPlan(outputValidationGates);
  const responseGaps = buildResponseGaps(context, sourceNodes, outputValidationGates, contractBreachRegister);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const envelopeAverage =
    responseEnvelope.reduce((sum, item) => sum + item.readinessScore, 0) / Math.max(1, responseEnvelope.length);

  const gateAverage =
    outputValidationGates.reduce((sum, gate) => sum + gate.score, 0) / Math.max(1, outputValidationGates.length);

  const gapPenalty = responseGaps.filter((gap) => gap.severity === "critical").length * 10;
  const reviewPressure =
    reviewerValidationBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, reviewerValidationBoard.length * 3);

  const responseFirewallScore = clampScore(
    sourceAverage / 3 +
      envelopeAverage / 3 +
      gateAverage / 3 +
      reviewPressure -
      gapPenalty -
      context.unresolvedOutputItemCount -
      context.unresolvedValidationItemCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.pendingResponseReviewCount * 6 +
        context.unresolvedOutputItemCount * 8 +
        context.unresolvedValidationItemCount * 8 +
        outputValidationGates.filter((gate) => !gate.passed).length * 9,
    ),
  );

  const responseFirewallStatus = bandFromScore(
    responseFirewallScore,
    responseGaps.filter((gap) => gap.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_RESPONSE_FIREWALL_READINESS,
    responseFirewallScore,
    responseFirewallStatus,
    overallSeverity,
    sourceNodes,
    responseEnvelope,
    outputValidationGates,
    unsafeOutputRules,
    contractBreachRegister,
    reviewerValidationBoard,
    rollbackPlan,
    responseGaps,
    redactedExportBundle: {
      exportId: "provider_response_firewall_v12_2_redacted_dry_run",
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
        "response envelope",
        "output validation gates",
        "unsafe output rules",
        "contract breach register",
        "reviewer validation board",
        "rollback plan",
        "response gaps",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider response firewall is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Response envelope and validation gates are review concepts only.",
      "Every future response remains behind human validation and runtime firewall gates.",
    ],
  };
}

export const aiProviderResponseFirewallVersion = "V12.2";
