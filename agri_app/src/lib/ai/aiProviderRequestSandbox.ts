export type ProviderRequestSandboxMode = "dry-run" | "request-contract-review";

export type ProviderRequestSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderRequestPriority = "low" | "medium" | "high" | "urgent";

export type ProviderRequestReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "request-review-ready";

export type ProviderRequestLane =
  | "request-blueprint"
  | "payload-minimization"
  | "redaction-contract"
  | "schema-review"
  | "output-contract"
  | "review-board"
  | "rollback-plan"
  | "runtime-firewall";

export interface ProviderRequestSandboxGuardrail {
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
  providerRequestSandboxReady: true;
  redactionContractReviewReady: true;
  outputSchemaReviewReady: true;
  providerNonCallProofReady: true;
}

export interface ProviderRequestSandboxInput {
  activeCaseCount?: number;
  pendingRequestReviewCount?: number;
  unresolvedPayloadItemCount?: number;
  unresolvedRedactionItemCount?: number;
  providerActivationFirewallScore?: number;
  explainabilityLedgerScore?: number;
  compliancePassportScore?: number;
  decisionAssuranceScore?: number;
  payloadMinimizationScore?: number;
  redactionContractScore?: number;
  outputSchemaScore?: number;
  reviewerConfidenceScore?: number;
  reviewerRole?: string;
}

export interface ProviderRequestSourceNode {
  id: string;
  lane: ProviderRequestLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderRequestSeverity;
  priority: ProviderRequestPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface RequestBlueprintSection {
  id: string;
  label: string;
  included: true;
  readinessScore: number;
  redacted: true;
  minimumDataOnly: true;
  reviewerCheck: string;
  blockedContent: string[];
}

export interface RedactionContractRule {
  id: string;
  label: string;
  lane: ProviderRequestLane;
  enforced: true;
  severity: ProviderRequestSeverity;
  ruleSummary: string;
  blockedContent: string[];
  reviewer: string;
}

export interface OutputContractItem {
  id: string;
  label: string;
  readinessScore: number;
  allowedOutput: string;
  blockedOutput: string;
  reviewerQuestion: string;
}

export interface RequestReviewGate {
  id: string;
  label: string;
  lane: ProviderRequestLane;
  passed: boolean;
  score: number;
  severity: ProviderRequestSeverity;
  reviewer: string;
  reason: string;
  hardStop: string;
}

export interface ProviderRequestApprovalItem {
  id: string;
  priority: ProviderRequestPriority;
  reviewer: string;
  question: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface RequestRollbackPlanItem {
  id: string;
  trigger: string;
  priority: ProviderRequestPriority;
  manualRollbackAction: string;
  blockedAction: string;
}

export interface ProviderRequestGap {
  id: string;
  label: string;
  lane: ProviderRequestLane;
  severity: ProviderRequestSeverity;
  reason: string;
  manualResolution: string;
}

export interface ProviderRequestSandboxReport {
  generatedAt: string;
  mode: ProviderRequestSandboxMode;
  context: Required<ProviderRequestSandboxInput>;
  readiness: ProviderRequestSandboxGuardrail;
  requestSandboxScore: number;
  requestSandboxStatus: ProviderRequestReadinessBand;
  overallSeverity: ProviderRequestSeverity;
  sourceNodes: ProviderRequestSourceNode[];
  requestBlueprint: RequestBlueprintSection[];
  redactionContract: RedactionContractRule[];
  outputContract: OutputContractItem[];
  reviewGates: RequestReviewGate[];
  manualApprovalBoard: ProviderRequestApprovalItem[];
  rollbackPlan: RequestRollbackPlanItem[];
  requestGaps: ProviderRequestGap[];
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

export const PROVIDER_REQUEST_SANDBOX_READINESS: ProviderRequestSandboxGuardrail = {
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
  providerRequestSandboxReady: true,
  redactionContractReviewReady: true,
  outputSchemaReviewReady: true,
  providerNonCallProofReady: true,
};

const severityWeight: Record<ProviderRequestSeverity, number> = {
  info: 4,
  watch: 11,
  elevated: 21,
  critical: 34,
};

const priorityWeight: Record<ProviderRequestPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderRequestSandboxInput): Required<ProviderRequestSandboxInput> {
  return {
    activeCaseCount: input.activeCaseCount ?? 9,
    pendingRequestReviewCount: input.pendingRequestReviewCount ?? 5,
    unresolvedPayloadItemCount: input.unresolvedPayloadItemCount ?? 5,
    unresolvedRedactionItemCount: input.unresolvedRedactionItemCount ?? 6,
    providerActivationFirewallScore: input.providerActivationFirewallScore ?? 76,
    explainabilityLedgerScore: input.explainabilityLedgerScore ?? 75,
    compliancePassportScore: input.compliancePassportScore ?? 72,
    decisionAssuranceScore: input.decisionAssuranceScore ?? 70,
    payloadMinimizationScore: input.payloadMinimizationScore ?? 73,
    redactionContractScore: input.redactionContractScore ?? 74,
    outputSchemaScore: input.outputSchemaScore ?? 71,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    reviewerRole: input.reviewerRole ?? "provider request sandbox reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderRequestSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderRequestSeverity): ProviderRequestPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderRequestReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "request-review-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderRequestLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderRequestSourceNode {
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
        ? ["Request sandbox readiness below human review threshold.", "Reviewer must resolve request contract and redaction context."]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderRequestSandboxInput>): ProviderRequestSourceNode[] {
  const payloadPressure = context.unresolvedPayloadItemCount * 4;
  const redactionPressure = context.unresolvedRedactionItemCount * 4;
  const reviewPressure = context.pendingRequestReviewCount * 3;

  return [
    buildSourceNode(
      "PRS_NODE_001",
      "runtime-firewall",
      "Provider activation firewall context",
      "V12.0",
      context.providerActivationFirewallScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Confirm provider activation firewall remains dry-run and provider non-call proof is visible.",
    ),
    buildSourceNode(
      "PRS_NODE_002",
      "request-blueprint",
      "Request blueprint readiness",
      "V12.1",
      context.payloadMinimizationScore,
      context.reviewerConfidenceScore,
      payloadPressure,
      "Review request blueprint as a static contract only.",
    ),
    buildSourceNode(
      "PRS_NODE_003",
      "payload-minimization",
      "Payload minimization readiness",
      "V12.1",
      context.payloadMinimizationScore,
      context.explainabilityLedgerScore,
      payloadPressure,
      "Confirm only minimal agronomic context is represented.",
    ),
    buildSourceNode(
      "PRS_NODE_004",
      "redaction-contract",
      "Redaction contract readiness",
      "V12.1",
      context.redactionContractScore,
      context.redactionContractScore,
      redactionPressure,
      "Confirm field identifiers, private notes and operational details are blocked.",
    ),
    buildSourceNode(
      "PRS_NODE_005",
      "schema-review",
      "Output schema review",
      "V12.1",
      context.outputSchemaScore,
      context.decisionAssuranceScore,
      reviewPressure,
      "Review future response shape without accepting any provider output.",
    ),
    buildSourceNode(
      "PRS_NODE_006",
      "review-board",
      "Compliance and approval context",
      "V11.2",
      context.compliancePassportScore,
      context.reviewerConfidenceScore,
      redactionPressure / 2,
      "Confirm manual review board owns every future request change.",
    ),
    buildSourceNode(
      "PRS_NODE_007",
      "output-contract",
      "Safe output contract",
      "V12.1",
      context.outputSchemaScore,
      context.decisionAssuranceScore,
      payloadPressure / 2,
      "Ensure future output cannot become work, prescription, dosage or forecast.",
    ),
    buildSourceNode(
      "PRS_NODE_008",
      "rollback-plan",
      "Request sandbox rollback plan",
      "V12.1",
      context.providerActivationFirewallScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Prepare manual rollback steps for any review concern.",
    ),
  ];
}

function buildRequestBlueprint(context: Required<ProviderRequestSandboxInput>): RequestBlueprintSection[] {
  return [
    {
      id: "PRS_BLUEPRINT_001",
      label: "Case summary section",
      included: true,
      readinessScore: clampScore(context.payloadMinimizationScore),
      redacted: true,
      minimumDataOnly: true,
      reviewerCheck: "Confirm case summary contains only generic crop, symptom and review context.",
      blockedContent: ["Field identifiers", "Private notes", "Operator names"],
    },
    {
      id: "PRS_BLUEPRINT_002",
      label: "Evidence summary section",
      included: true,
      readinessScore: clampScore(context.explainabilityLedgerScore),
      redacted: true,
      minimumDataOnly: true,
      reviewerCheck: "Confirm evidence summary is aggregated and review-only.",
      blockedContent: ["Raw images", "Private field notes", "Stored audit state"],
    },
    {
      id: "PRS_BLUEPRINT_003",
      label: "Safety constraints section",
      included: true,
      readinessScore: clampScore(context.providerActivationFirewallScore),
      redacted: true,
      minimumDataOnly: true,
      reviewerCheck: "Confirm hard stops are always included.",
      blockedContent: ["Execution instructions", "Work order text", "Dispatch context"],
    },
    {
      id: "PRS_BLUEPRINT_004",
      label: "Expected output shape section",
      included: true,
      readinessScore: clampScore(context.outputSchemaScore),
      redacted: true,
      minimumDataOnly: true,
      reviewerCheck: "Confirm output shape is advisory and non-operational.",
      blockedContent: ["Product recommendation", "Dosage guidance", "Production forecast"],
    },
  ];
}

function buildRedactionContract(): RedactionContractRule[] {
  return [
    {
      id: "PRS_REDACTION_001",
      label: "Field identity removal",
      lane: "redaction-contract",
      enforced: true,
      severity: "critical",
      ruleSummary: "Field names, coordinates and owner details are excluded from request review.",
      blockedContent: ["Field identifiers", "Coordinates", "Owner details"],
      reviewer: "redaction reviewer",
    },
    {
      id: "PRS_REDACTION_002",
      label: "Private note removal",
      lane: "redaction-contract",
      enforced: true,
      severity: "critical",
      ruleSummary: "Private notes and operator comments are excluded.",
      blockedContent: ["Private notes", "Operator comments", "Internal observations"],
      reviewer: "privacy reviewer",
    },
    {
      id: "PRS_REDACTION_003",
      label: "Operational instruction removal",
      lane: "runtime-firewall",
      enforced: true,
      severity: "critical",
      ruleSummary: "Request sandbox cannot include work or execution language.",
      blockedContent: ["Task instructions", "Intervention instructions", "Dispatch steps"],
      reviewer: "operations reviewer",
    },
    {
      id: "PRS_REDACTION_004",
      label: "Prescriptive output removal",
      lane: "output-contract",
      enforced: true,
      severity: "critical",
      ruleSummary: "Output contract blocks product, dosage and forecast content.",
      blockedContent: ["Product prescription", "Dosage advice", "Production forecast"],
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildOutputContract(context: Required<ProviderRequestSandboxInput>): OutputContractItem[] {
  return [
    {
      id: "PRS_OUTPUT_001",
      label: "Evidence commentary",
      readinessScore: clampScore(context.outputSchemaScore),
      allowedOutput: "Advisory evidence commentary for human review.",
      blockedOutput: "No diagnosis finalization, prescription, dosage or task.",
      reviewerQuestion: "Is evidence commentary clearly non-operational?",
    },
    {
      id: "PRS_OUTPUT_002",
      label: "Uncertainty statement",
      readinessScore: clampScore(context.explainabilityLedgerScore),
      allowedOutput: "Uncertainty and missing evidence notes.",
      blockedOutput: "No certainty claim or final decision.",
      reviewerQuestion: "Are uncertainty notes mandatory and visible?",
    },
    {
      id: "PRS_OUTPUT_003",
      label: "Human review checklist",
      readinessScore: clampScore(context.decisionAssuranceScore),
      allowedOutput: "Reviewer questions and manual signoff prompts.",
      blockedOutput: "No automatic approval or dispatch.",
      reviewerQuestion: "Does every output remain behind human review?",
    },
    {
      id: "PRS_OUTPUT_004",
      label: "Safety refusal channel",
      readinessScore: clampScore(context.providerActivationFirewallScore),
      allowedOutput: "Safe refusal or review-required status.",
      blockedOutput: "No operational bypass.",
      reviewerQuestion: "Can unsafe or incomplete context force review-required status?",
    },
  ];
}

function buildReviewGates(
  context: Required<ProviderRequestSandboxInput>,
  sourceNodes: ProviderRequestSourceNode[],
): RequestReviewGate[] {
  const blockedNodeCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const gates = [
    {
      id: "PRS_GATE_001",
      label: "Provider non-call proof",
      lane: "runtime-firewall" as ProviderRequestLane,
      score: 100,
      reviewer: "safety reviewer",
      reason: "Request sandbox only prepares a review contract.",
      hardStop: "No provider invocation is allowed.",
    },
    {
      id: "PRS_GATE_002",
      label: "Payload minimization passes review",
      lane: "payload-minimization" as ProviderRequestLane,
      score: context.payloadMinimizationScore - context.unresolvedPayloadItemCount * 4,
      reviewer: "payload review lead",
      reason: "Minimal data rule must pass before future provider discussion.",
      hardStop: "Do not transmit any payload.",
    },
    {
      id: "PRS_GATE_003",
      label: "Redaction contract passes review",
      lane: "redaction-contract" as ProviderRequestLane,
      score: context.redactionContractScore - context.unresolvedRedactionItemCount * 4,
      reviewer: "redaction reviewer",
      reason: "Redaction contract must be complete before future request discussion.",
      hardStop: "Do not include private or operational context.",
    },
    {
      id: "PRS_GATE_004",
      label: "Output contract blocks operational content",
      lane: "output-contract" as ProviderRequestLane,
      score: context.outputSchemaScore,
      reviewer: "agronomic safety reviewer",
      reason: "Output schema must block work, prescription, dosage and forecast content.",
      hardStop: "Do not accept operational output.",
    },
    {
      id: "PRS_GATE_005",
      label: "Manual board review remains required",
      lane: "review-board" as ProviderRequestLane,
      score: context.reviewerConfidenceScore - context.pendingRequestReviewCount * 4,
      reviewer: context.reviewerRole,
      reason: "Every future request change requires human review.",
      hardStop: "Do not promote request sandbox to runtime.",
    },
    {
      id: "PRS_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "request-blueprint" as ProviderRequestLane,
      score: 100 - blockedNodeCount * 18,
      reviewer: "operations reviewer",
      reason: `${blockedNodeCount} request sandbox source nodes require review.`,
      hardStop: "Resolve source blockers before request-review-ready state.",
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
  context: Required<ProviderRequestSandboxInput>,
  gates: RequestReviewGate[],
): ProviderRequestApprovalItem[] {
  return [
    {
      id: "PRS_APPROVAL_001",
      priority: context.unresolvedPayloadItemCount >= 5 ? "urgent" : "high",
      reviewer: "payload review lead",
      question: "Which payload items must be removed or rewritten before review?",
      evidenceNeeded: ["Request blueprint", "Payload review checklist", "Output contract"],
      safeOutcome: "Manual payload review only.",
      manualOnly: true,
    },
    {
      id: "PRS_APPROVAL_002",
      priority: context.unresolvedRedactionItemCount >= 6 ? "urgent" : "high",
      reviewer: "redaction reviewer",
      question: "Which redaction requirements block request readiness?",
      evidenceNeeded: ["Redaction contract", "Explainability ledger", "Compliance passport"],
      safeOutcome: "Manual redaction review only.",
      manualOnly: true,
    },
    {
      id: "PRS_APPROVAL_003",
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      reviewer: context.reviewerRole,
      question: "Can the request sandbox be discussed without enabling provider runtime?",
      evidenceNeeded: gates.map((gate) => gate.label),
      safeOutcome: "Board discussion note only.",
      manualOnly: true,
    },
  ];
}

function buildRollbackPlan(gates: RequestReviewGate[]): RequestRollbackPlanItem[] {
  const failedGates = gates.filter((gate) => !gate.passed);

  return [
    {
      id: "PRS_ROLLBACK_001",
      trigger: "Any failed request review gate.",
      priority: failedGates.length > 0 ? "urgent" : "high",
      manualRollbackAction: "Return to firewall review and resolve failed gates.",
      blockedAction: "Do not advance toward runtime.",
    },
    {
      id: "PRS_ROLLBACK_002",
      trigger: "Any redaction concern.",
      priority: "urgent",
      manualRollbackAction: "Return to redaction contract review.",
      blockedAction: "Do not prepare provider-bound materials.",
    },
    {
      id: "PRS_ROLLBACK_003",
      trigger: "Any output contract ambiguity.",
      priority: "high",
      manualRollbackAction: "Return to output contract review.",
      blockedAction: "Do not accept or simulate operational outputs.",
    },
  ];
}

function buildRequestGaps(
  context: Required<ProviderRequestSandboxInput>,
  sourceNodes: ProviderRequestSourceNode[],
  gates: RequestReviewGate[],
): ProviderRequestGap[] {
  const gaps: ProviderRequestGap[] = [];

  if (context.unresolvedPayloadItemCount > 0) {
    gaps.push({
      id: "PRS_GAP_001",
      label: "Unresolved payload review items",
      lane: "payload-minimization",
      severity: context.unresolvedPayloadItemCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedPayloadItemCount} payload review items remain open.`,
      manualResolution: "Remove, rewrite or explicitly reject payload items through human review.",
    });
  }

  if (context.unresolvedRedactionItemCount > 0) {
    gaps.push({
      id: "PRS_GAP_002",
      label: "Unresolved redaction review items",
      lane: "redaction-contract",
      severity: context.unresolvedRedactionItemCount >= 6 ? "critical" : "elevated",
      reason: `${context.unresolvedRedactionItemCount} redaction items remain open.`,
      manualResolution: "Resolve redaction contract manually before review-ready state.",
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      gaps.push({
        id: `PRS_SOURCE_GAP_${String(index + 1).padStart(3, "0")}`,
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
        id: `PRS_GATE_GAP_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: gate.reason,
        manualResolution: gate.hardStop,
      });
    });

  return gaps;
}

export function buildAiProviderRequestSandboxReport(
  input: ProviderRequestSandboxInput = {},
): ProviderRequestSandboxReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const requestBlueprint = buildRequestBlueprint(context);
  const redactionContract = buildRedactionContract();
  const outputContract = buildOutputContract(context);
  const reviewGates = buildReviewGates(context, sourceNodes);
  const manualApprovalBoard = buildManualApprovalBoard(context, reviewGates);
  const rollbackPlan = buildRollbackPlan(reviewGates);
  const requestGaps = buildRequestGaps(context, sourceNodes, reviewGates);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const blueprintAverage =
    requestBlueprint.reduce((sum, item) => sum + item.readinessScore, 0) / Math.max(1, requestBlueprint.length);

  const outputAverage =
    outputContract.reduce((sum, item) => sum + item.readinessScore, 0) / Math.max(1, outputContract.length);

  const gateAverage =
    reviewGates.reduce((sum, gate) => sum + gate.score, 0) / Math.max(1, reviewGates.length);

  const gapPenalty = requestGaps.filter((gap) => gap.severity === "critical").length * 10;
  const approvalPressure =
    manualApprovalBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, manualApprovalBoard.length * 3);

  const requestSandboxScore = clampScore(
    sourceAverage / 4 +
      blueprintAverage / 4 +
      outputAverage / 4 +
      gateAverage / 4 +
      approvalPressure -
      gapPenalty -
      context.unresolvedPayloadItemCount -
      context.unresolvedRedactionItemCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.pendingRequestReviewCount * 6 +
        context.unresolvedPayloadItemCount * 8 +
        context.unresolvedRedactionItemCount * 8 +
        reviewGates.filter((gate) => !gate.passed).length * 9,
    ),
  );

  const requestSandboxStatus = bandFromScore(
    requestSandboxScore,
    requestGaps.filter((gap) => gap.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_REQUEST_SANDBOX_READINESS,
    requestSandboxScore,
    requestSandboxStatus,
    overallSeverity,
    sourceNodes,
    requestBlueprint,
    redactionContract,
    outputContract,
    reviewGates,
    manualApprovalBoard,
    rollbackPlan,
    requestGaps,
    redactedExportBundle: {
      exportId: "provider_request_sandbox_v12_1_redacted_dry_run",
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
        "request blueprint",
        "redaction contract",
        "output contract",
        "review gates",
        "manual approval board",
        "rollback plan",
        "request gaps",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider request sandbox is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Request blueprint and output contract are review concepts only.",
      "Every future request change remains behind human review and runtime firewall gates.",
    ],
  };
}

export const aiProviderRequestSandboxVersion = "V12.1";
