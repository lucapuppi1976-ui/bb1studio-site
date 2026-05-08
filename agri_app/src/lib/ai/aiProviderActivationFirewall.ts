export type ProviderActivationFirewallMode = "dry-run" | "activation-review";

export type ProviderFirewallSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderFirewallPriority = "low" | "medium" | "high" | "urgent";

export type ProviderFirewallReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "activation-review-ready";

export type ProviderFirewallLane =
  | "provider-readiness"
  | "payload-minimization"
  | "runtime-guard"
  | "call-budget"
  | "redaction-review"
  | "rollout-stage"
  | "rollback-plan"
  | "manual-approval";

export interface ProviderActivationFirewallGuardrail {
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
  providerActivationFirewallReady: true;
  runtimeSafetyControlPlaneReady: true;
  payloadMinimizationReviewReady: true;
  manualApprovalBoardReady: true;
}

export interface ProviderActivationFirewallInput {
  activeCaseCount?: number;
  pendingProviderReviewCount?: number;
  unresolvedSafetyItemCount?: number;
  unresolvedEvidenceGapCount?: number;
  controlTowerScore?: number;
  explainabilityLedgerScore?: number;
  compliancePassportScore?: number;
  decisionAssuranceScore?: number;
  scenarioStressScore?: number;
  improvementScorecardScore?: number;
  redactionReviewScore?: number;
  payloadMinimizationScore?: number;
  runtimeGuardScore?: number;
  reviewerConfidenceScore?: number;
  reviewerRole?: string;
}

export interface ProviderFirewallSourceNode {
  id: string;
  lane: ProviderFirewallLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderFirewallSeverity;
  priority: ProviderFirewallPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ProviderReadinessGate {
  id: string;
  label: string;
  lane: ProviderFirewallLane;
  passed: boolean;
  score: number;
  severity: ProviderFirewallSeverity;
  reviewer: string;
  reason: string;
  hardStop: string;
}

export interface PayloadReviewItem {
  id: string;
  label: string;
  lane: ProviderFirewallLane;
  minimumDataOnly: true;
  redacted: true;
  readinessScore: number;
  reviewerCheck: string;
  blockedContent: string[];
}

export interface ProviderRolloutStage {
  id: string;
  label: string;
  stageOrder: number;
  readinessBand: ProviderFirewallReadinessBand;
  priority: ProviderFirewallPriority;
  requiredHumanDecision: string;
  allowedOutcome: string;
  blockedOutcome: string;
}

export interface RuntimeFirewallRule {
  id: string;
  label: string;
  severity: ProviderFirewallSeverity;
  enforced: true;
  ruleSummary: string;
  reviewer: string;
  blockedRuntimeOutcome: string;
}

export interface ProviderRollbackItem {
  id: string;
  trigger: string;
  priority: ProviderFirewallPriority;
  manualRollbackAction: string;
  blockedAction: string;
}

export interface ProviderApprovalQuestion {
  id: string;
  priority: ProviderFirewallPriority;
  reviewer: string;
  question: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface ProviderFirewallGap {
  id: string;
  label: string;
  lane: ProviderFirewallLane;
  severity: ProviderFirewallSeverity;
  reason: string;
  manualResolution: string;
}

export interface ProviderActivationFirewallReport {
  generatedAt: string;
  mode: ProviderActivationFirewallMode;
  context: Required<ProviderActivationFirewallInput>;
  readiness: ProviderActivationFirewallGuardrail;
  firewallScore: number;
  firewallStatus: ProviderFirewallReadinessBand;
  overallSeverity: ProviderFirewallSeverity;
  sourceNodes: ProviderFirewallSourceNode[];
  readinessGates: ProviderReadinessGate[];
  payloadReview: PayloadReviewItem[];
  rolloutStages: ProviderRolloutStage[];
  runtimeFirewallRules: RuntimeFirewallRule[];
  rollbackPlan: ProviderRollbackItem[];
  manualApprovalQuestions: ProviderApprovalQuestion[];
  firewallGaps: ProviderFirewallGap[];
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

export const PROVIDER_ACTIVATION_FIREWALL_READINESS: ProviderActivationFirewallGuardrail = {
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
  providerActivationFirewallReady: true,
  runtimeSafetyControlPlaneReady: true,
  payloadMinimizationReviewReady: true,
  manualApprovalBoardReady: true,
};

const severityWeight: Record<ProviderFirewallSeverity, number> = {
  info: 4,
  watch: 11,
  elevated: 21,
  critical: 34,
};

const priorityWeight: Record<ProviderFirewallPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderActivationFirewallInput): Required<ProviderActivationFirewallInput> {
  return {
    activeCaseCount: input.activeCaseCount ?? 9,
    pendingProviderReviewCount: input.pendingProviderReviewCount ?? 5,
    unresolvedSafetyItemCount: input.unresolvedSafetyItemCount ?? 6,
    unresolvedEvidenceGapCount: input.unresolvedEvidenceGapCount ?? 6,
    controlTowerScore: input.controlTowerScore ?? 74,
    explainabilityLedgerScore: input.explainabilityLedgerScore ?? 75,
    compliancePassportScore: input.compliancePassportScore ?? 72,
    decisionAssuranceScore: input.decisionAssuranceScore ?? 70,
    scenarioStressScore: input.scenarioStressScore ?? 68,
    improvementScorecardScore: input.improvementScorecardScore ?? 71,
    redactionReviewScore: input.redactionReviewScore ?? 76,
    payloadMinimizationScore: input.payloadMinimizationScore ?? 73,
    runtimeGuardScore: input.runtimeGuardScore ?? 78,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    reviewerRole: input.reviewerRole ?? "provider activation safety reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderFirewallSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderFirewallSeverity): ProviderFirewallPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderFirewallReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "activation-review-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderFirewallLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderFirewallSourceNode {
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
        ? ["Provider activation readiness below human review threshold.", "Reviewer must resolve safety and evidence context."]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderActivationFirewallInput>): ProviderFirewallSourceNode[] {
  const safetyPressure = context.unresolvedSafetyItemCount * 4;
  const evidencePressure = context.unresolvedEvidenceGapCount * 3;
  const reviewPressure = context.pendingProviderReviewCount * 3;

  return [
    buildSourceNode(
      "PAF_NODE_001",
      "provider-readiness",
      "Control tower provider readiness",
      "V11.0",
      context.controlTowerScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Confirm cross module readiness before any activation review.",
    ),
    buildSourceNode(
      "PAF_NODE_002",
      "redaction-review",
      "Explainability redaction trace",
      "V11.1",
      context.explainabilityLedgerScore,
      context.redactionReviewScore,
      evidencePressure,
      "Verify trace and redaction coverage before runtime review.",
    ),
    buildSourceNode(
      "PAF_NODE_003",
      "manual-approval",
      "Compliance and approval readiness",
      "V11.2",
      context.compliancePassportScore,
      context.reviewerConfidenceScore,
      safetyPressure / 2,
      "Confirm compliance packet and manual approval questions.",
    ),
    buildSourceNode(
      "PAF_NODE_004",
      "runtime-guard",
      "Decision assurance runtime locks",
      "V11.3",
      context.decisionAssuranceScore,
      context.runtimeGuardScore,
      safetyPressure,
      "Confirm runtime guardrails remain off for provider, persistence and execution.",
    ),
    buildSourceNode(
      "PAF_NODE_005",
      "rollback-plan",
      "Scenario rollback readiness",
      "V11.4",
      context.scenarioStressScore,
      context.reviewerConfidenceScore,
      reviewPressure + evidencePressure / 2,
      "Review rollback options before any staged provider discussion.",
    ),
    buildSourceNode(
      "PAF_NODE_006",
      "rollout-stage",
      "Improvement roadmap readiness",
      "V11.5",
      context.improvementScorecardScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Connect provider readiness to manual maturity roadmap only.",
    ),
    buildSourceNode(
      "PAF_NODE_007",
      "payload-minimization",
      "Payload minimization review",
      "V12.0",
      context.payloadMinimizationScore,
      context.redactionReviewScore,
      evidencePressure / 2,
      "Confirm minimal redacted request shape without sending anything.",
    ),
    buildSourceNode(
      "PAF_NODE_008",
      "call-budget",
      "Call budget and runtime cost review",
      "V12.0",
      context.runtimeGuardScore,
      context.reviewerConfidenceScore,
      context.activeCaseCount,
      "Review budget and volume as manual control topics only.",
    ),
  ];
}

function buildReadinessGates(
  context: Required<ProviderActivationFirewallInput>,
  sourceNodes: ProviderFirewallSourceNode[],
): ProviderReadinessGate[] {
  const blockedNodeCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const gates = [
    {
      id: "PAF_GATE_001",
      label: "Provider execution remains disabled",
      lane: "provider-readiness" as ProviderFirewallLane,
      score: 100,
      reviewer: "safety reviewer",
      reason: "This module is an activation review simulator only.",
      hardStop: "No external model call is allowed.",
    },
    {
      id: "PAF_GATE_002",
      label: "Persistence and automation remain disabled",
      lane: "runtime-guard" as ProviderFirewallLane,
      score: 100,
      reviewer: context.reviewerRole,
      reason: "Runtime safety control plane does not write data or create work.",
      hardStop: "No storage write, task, intervention or execution is allowed.",
    },
    {
      id: "PAF_GATE_003",
      label: "Payload minimization is reviewable",
      lane: "payload-minimization" as ProviderFirewallLane,
      score: context.payloadMinimizationScore - context.unresolvedEvidenceGapCount * 3,
      reviewer: "payload review lead",
      reason: "Only minimal redacted context may be considered in future planning.",
      hardStop: "Do not send any payload in this phase.",
    },
    {
      id: "PAF_GATE_004",
      label: "Redaction review is strong enough",
      lane: "redaction-review" as ProviderFirewallLane,
      score: context.redactionReviewScore - context.unresolvedSafetyItemCount * 3,
      reviewer: "redaction reviewer",
      reason: "Redaction must be validated before future provider discussion.",
      hardStop: "Do not expose field identifiers, private notes or operational details.",
    },
    {
      id: "PAF_GATE_005",
      label: "Manual approval board is complete",
      lane: "manual-approval" as ProviderFirewallLane,
      score: context.reviewerConfidenceScore - context.pendingProviderReviewCount * 4,
      reviewer: context.reviewerRole,
      reason: "Every activation review must require explicit human approval.",
      hardStop: "Do not enable provider readiness without approval board review.",
    },
    {
      id: "PAF_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "runtime-guard" as ProviderFirewallLane,
      score: 100 - blockedNodeCount * 18,
      reviewer: "operations reviewer",
      reason: `${blockedNodeCount} source nodes require review.`,
      hardStop: "Resolve source blockers before activation review state.",
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

function buildPayloadReview(context: Required<ProviderActivationFirewallInput>): PayloadReviewItem[] {
  return [
    {
      id: "PAF_PAYLOAD_001",
      label: "Crop and case context summary",
      lane: "payload-minimization",
      minimumDataOnly: true,
      redacted: true,
      readinessScore: clampScore(context.payloadMinimizationScore),
      reviewerCheck: "Confirm only generic crop, symptom and evidence summary are considered.",
      blockedContent: ["Field identifiers", "Private notes", "Operator details"],
    },
    {
      id: "PAF_PAYLOAD_002",
      label: "Evidence contribution summary",
      lane: "redaction-review",
      minimumDataOnly: true,
      redacted: true,
      readinessScore: clampScore(context.explainabilityLedgerScore),
      reviewerCheck: "Confirm evidence weights are redacted and review-only.",
      blockedContent: ["Raw images", "Private field notes", "Stored audit state"],
    },
    {
      id: "PAF_PAYLOAD_003",
      label: "Safety and compliance context",
      lane: "manual-approval",
      minimumDataOnly: true,
      redacted: true,
      readinessScore: clampScore(context.compliancePassportScore),
      reviewerCheck: "Confirm compliance context creates no formal claim.",
      blockedContent: ["Certification claims", "Approval records", "Execution instructions"],
    },
    {
      id: "PAF_PAYLOAD_004",
      label: "Runtime guard context",
      lane: "runtime-guard",
      minimumDataOnly: true,
      redacted: true,
      readinessScore: clampScore(context.runtimeGuardScore),
      reviewerCheck: "Confirm runtime locks stay visible and disabled.",
      blockedContent: ["Work orders", "Task drafts", "Intervention instructions"],
    },
  ];
}

function buildRolloutStages(
  context: Required<ProviderActivationFirewallInput>,
  gates: ProviderReadinessGate[],
): ProviderRolloutStage[] {
  const failedGateCount = gates.filter((gate) => !gate.passed).length;

  return [
    {
      id: "PAF_STAGE_001",
      label: "Stage zero dry-run review",
      stageOrder: 0,
      readinessBand: "review-ready",
      priority: "high",
      requiredHumanDecision: "Confirm current phase remains local dry-run only.",
      allowedOutcome: "Manual readiness note only.",
      blockedOutcome: "No provider execution.",
    },
    {
      id: "PAF_STAGE_002",
      label: "Payload review sandbox",
      stageOrder: 1,
      readinessBand: bandFromScore(context.payloadMinimizationScore, context.unresolvedEvidenceGapCount >= 6 ? 1 : 0),
      priority: context.unresolvedEvidenceGapCount >= 6 ? "urgent" : "high",
      requiredHumanDecision: "Approve redacted payload shape for review discussion only.",
      allowedOutcome: "Payload review checklist.",
      blockedOutcome: "No payload transmission.",
    },
    {
      id: "PAF_STAGE_003",
      label: "Runtime guard rehearsal",
      stageOrder: 2,
      readinessBand: bandFromScore(context.runtimeGuardScore, context.unresolvedSafetyItemCount >= 6 ? 1 : 0),
      priority: context.unresolvedSafetyItemCount >= 6 ? "urgent" : "high",
      requiredHumanDecision: "Confirm all locks remain disabled and visible.",
      allowedOutcome: "Runtime guard review packet.",
      blockedOutcome: "No automation enablement.",
    },
    {
      id: "PAF_STAGE_004",
      label: "Activation review board",
      stageOrder: 3,
      readinessBand: bandFromScore(context.reviewerConfidenceScore, failedGateCount),
      priority: failedGateCount > 0 ? "urgent" : "medium",
      requiredHumanDecision: "Review failed gates and source blockers manually.",
      allowedOutcome: "Board discussion topic only.",
      blockedOutcome: "No activation, no public sharing, no data write.",
    },
  ];
}

function buildRuntimeFirewallRules(): RuntimeFirewallRule[] {
  return [
    {
      id: "PAF_RULE_001",
      label: "External model calls disabled",
      severity: "critical",
      enforced: true,
      ruleSummary: "Provider invocation remains unavailable in this phase.",
      reviewer: "safety reviewer",
      blockedRuntimeOutcome: "No model request can be performed.",
    },
    {
      id: "PAF_RULE_002",
      label: "Data writes disabled",
      severity: "critical",
      enforced: true,
      ruleSummary: "No result can be persisted or promoted.",
      reviewer: "operations reviewer",
      blockedRuntimeOutcome: "No storage, memory update or audit write.",
    },
    {
      id: "PAF_RULE_003",
      label: "Operational outputs disabled",
      severity: "critical",
      enforced: true,
      ruleSummary: "Provider review cannot create operational objects.",
      reviewer: "agronomic reviewer",
      blockedRuntimeOutcome: "No task, intervention, dispatch or execution.",
    },
    {
      id: "PAF_RULE_004",
      label: "Prescriptive outputs disabled",
      severity: "critical",
      enforced: true,
      ruleSummary: "No recommendation that implies product or dosage output is allowed.",
      reviewer: "agronomic safety reviewer",
      blockedRuntimeOutcome: "No product prescription, dosage advice or forecast.",
    },
  ];
}

function buildRollbackPlan(gates: ProviderReadinessGate[]): ProviderRollbackItem[] {
  const failedGates = gates.filter((gate) => !gate.passed);

  return [
    {
      id: "PAF_ROLLBACK_001",
      trigger: "Any failed readiness gate.",
      priority: failedGates.length > 0 ? "urgent" : "high",
      manualRollbackAction: "Return to dry-run review and resolve failed gates.",
      blockedAction: "Do not advance rollout stage.",
    },
    {
      id: "PAF_ROLLBACK_002",
      trigger: "Any redaction review concern.",
      priority: "urgent",
      manualRollbackAction: "Return to payload minimization review.",
      blockedAction: "Do not prepare external request material.",
    },
    {
      id: "PAF_ROLLBACK_003",
      trigger: "Any reviewer rejects activation review.",
      priority: "high",
      manualRollbackAction: "Keep provider readiness disabled and document reviewer concern manually.",
      blockedAction: "Do not bypass approval board.",
    },
  ];
}

function buildManualApprovalQuestions(
  context: Required<ProviderActivationFirewallInput>,
  gates: ProviderReadinessGate[],
): ProviderApprovalQuestion[] {
  return [
    {
      id: "PAF_APPROVAL_001",
      priority: context.unresolvedSafetyItemCount >= 6 ? "urgent" : "high",
      reviewer: "safety reviewer",
      question: "Which safety items block provider activation review?",
      evidenceNeeded: ["Runtime firewall rules", "Readiness gates", "Rollback plan"],
      safeOutcome: "Manual safety review topic only.",
      manualOnly: true,
    },
    {
      id: "PAF_APPROVAL_002",
      priority: context.unresolvedEvidenceGapCount >= 6 ? "urgent" : "high",
      reviewer: "payload review lead",
      question: "Which evidence gaps block payload minimization review?",
      evidenceNeeded: ["Payload review items", "Explainability ledger", "Compliance passport"],
      safeOutcome: "Manual payload review topic only.",
      manualOnly: true,
    },
    {
      id: "PAF_APPROVAL_003",
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      reviewer: context.reviewerRole,
      question: "Can the activation board discuss readiness without enabling anything?",
      evidenceNeeded: gates.map((gate) => gate.label),
      safeOutcome: "Board discussion note only.",
      manualOnly: true,
    },
  ];
}

function buildFirewallGaps(
  context: Required<ProviderActivationFirewallInput>,
  sourceNodes: ProviderFirewallSourceNode[],
  gates: ProviderReadinessGate[],
): ProviderFirewallGap[] {
  const gaps: ProviderFirewallGap[] = [];

  if (context.unresolvedSafetyItemCount > 0) {
    gaps.push({
      id: "PAF_GAP_001",
      label: "Unresolved safety items",
      lane: "runtime-guard",
      severity: context.unresolvedSafetyItemCount >= 6 ? "critical" : "elevated",
      reason: `${context.unresolvedSafetyItemCount} safety items require review.`,
      manualResolution: "Resolve or formally defer safety items through human review.",
    });
  }

  if (context.pendingProviderReviewCount > 0) {
    gaps.push({
      id: "PAF_GAP_002",
      label: "Pending provider review items",
      lane: "manual-approval",
      severity: context.pendingProviderReviewCount >= 5 ? "elevated" : "watch",
      reason: `${context.pendingProviderReviewCount} review items remain open.`,
      manualResolution: "Assign reviewers and close approval questions manually.",
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      gaps.push({
        id: `PAF_SOURCE_GAP_${String(index + 1).padStart(3, "0")}`,
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
        id: `PAF_GATE_GAP_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: gate.reason,
        manualResolution: gate.hardStop,
      });
    });

  return gaps;
}

export function buildAiProviderActivationFirewallReport(
  input: ProviderActivationFirewallInput = {},
): ProviderActivationFirewallReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const readinessGates = buildReadinessGates(context, sourceNodes);
  const payloadReview = buildPayloadReview(context);
  const rolloutStages = buildRolloutStages(context, readinessGates);
  const runtimeFirewallRules = buildRuntimeFirewallRules();
  const rollbackPlan = buildRollbackPlan(readinessGates);
  const manualApprovalQuestions = buildManualApprovalQuestions(context, readinessGates);
  const firewallGaps = buildFirewallGaps(context, sourceNodes, readinessGates);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const gateAverage =
    readinessGates.reduce((sum, gate) => sum + gate.score, 0) / Math.max(1, readinessGates.length);

  const payloadAverage =
    payloadReview.reduce((sum, item) => sum + item.readinessScore, 0) / Math.max(1, payloadReview.length);

  const gapPenalty = firewallGaps.filter((gap) => gap.severity === "critical").length * 10;
  const approvalPressure =
    manualApprovalQuestions.reduce((sum, question) => sum + priorityWeight[question.priority], 0) /
    Math.max(1, manualApprovalQuestions.length * 3);

  const firewallScore = clampScore(
    sourceAverage / 3 +
      gateAverage / 3 +
      payloadAverage / 3 +
      approvalPressure -
      gapPenalty -
      context.unresolvedSafetyItemCount -
      context.unresolvedEvidenceGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.pendingProviderReviewCount * 6 +
        context.unresolvedSafetyItemCount * 8 +
        context.unresolvedEvidenceGapCount * 7 +
        readinessGates.filter((gate) => !gate.passed).length * 9,
    ),
  );

  const firewallStatus = bandFromScore(
    firewallScore,
    firewallGaps.filter((gap) => gap.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_ACTIVATION_FIREWALL_READINESS,
    firewallScore,
    firewallStatus,
    overallSeverity,
    sourceNodes,
    readinessGates,
    payloadReview,
    rolloutStages,
    runtimeFirewallRules,
    rollbackPlan,
    manualApprovalQuestions,
    firewallGaps,
    redactedExportBundle: {
      exportId: "provider_activation_firewall_v12_0_redacted_dry_run",
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
        "readiness gates",
        "payload review",
        "rollout stages",
        "runtime firewall rules",
        "rollback plan",
        "manual approval questions",
        "firewall gaps",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider activation firewall is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Rollout stages are review concepts only.",
      "Every future activation discussion remains behind human review and runtime safety gates.",
    ],
  };
}

export const aiProviderActivationFirewallVersion = "V12.0";
