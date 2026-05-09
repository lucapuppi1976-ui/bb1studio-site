export type ProviderObservabilityDrillMode = "dry-run" | "incident-response-review";

export type ProviderObservabilitySeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderObservabilityPriority = "low" | "medium" | "high" | "urgent";

export type ProviderObservabilityReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "incident-review-ready";

export type ProviderObservabilityLane =
  | "runtime-boundary"
  | "signal-monitor"
  | "incident-drill"
  | "kill-switch"
  | "latency-budget"
  | "quality-drift"
  | "review-board"
  | "rollback-plan";

export interface ProviderObservabilityDrillGuardrail {
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
  providerObservabilityReady: true;
  incidentDrillCenterReady: true;
  killSwitchReviewReady: true;
  providerNonCallProofReady: true;
}

export interface ProviderObservabilityDrillInput {
  simulatedSignalCount?: number;
  pendingIncidentReviewCount?: number;
  unresolvedMonitoringItemCount?: number;
  unresolvedRollbackItemCount?: number;
  providerActivationFirewallScore?: number;
  providerRequestSandboxScore?: number;
  providerResponseFirewallScore?: number;
  providerShadowEvaluationScore?: number;
  providerCanaryRolloutScore?: number;
  signalQualityScore?: number;
  incidentDrillScore?: number;
  killSwitchScore?: number;
  reviewerConfidenceScore?: number;
  reviewerRole?: string;
}

export interface ProviderObservabilitySourceNode {
  id: string;
  lane: ProviderObservabilityLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderObservabilitySeverity;
  priority: ProviderObservabilityPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface RuntimeSignalCard {
  id: string;
  label: string;
  lane: ProviderObservabilityLane;
  signalScore: number;
  severity: ProviderObservabilitySeverity;
  reviewerCheck: string;
  healthyPattern: string;
  blockedPattern: string;
}

export interface IncidentDrillCard {
  id: string;
  label: string;
  priority: ProviderObservabilityPriority;
  severity: ProviderObservabilitySeverity;
  trigger: string;
  expectedManualAction: string;
  blockedAction: string;
  drillReady: boolean;
}

export interface ObservabilityReviewGate {
  id: string;
  label: string;
  lane: ProviderObservabilityLane;
  passed: boolean;
  score: number;
  severity: ProviderObservabilitySeverity;
  reviewer: string;
  reason: string;
  hardStop: string;
}

export interface QualityDriftWatchItem {
  id: string;
  label: string;
  lane: ProviderObservabilityLane;
  driftScore: number;
  severity: ProviderObservabilitySeverity;
  reviewerQuestion: string;
  manualResolution: string;
}

export interface LatencyBudgetReviewItem {
  id: string;
  label: string;
  lane: ProviderObservabilityLane;
  simulatedBudgetScore: number;
  severity: ProviderObservabilitySeverity;
  reviewerQuestion: string;
  blockedOutcome: string;
}

export interface ObservabilityApprovalQuestion {
  id: string;
  priority: ProviderObservabilityPriority;
  reviewer: string;
  question: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface ObservabilityRollbackItem {
  id: string;
  trigger: string;
  priority: ProviderObservabilityPriority;
  manualRollbackAction: string;
  blockedAction: string;
}

export interface ObservabilityRiskItem {
  id: string;
  label: string;
  lane: ProviderObservabilityLane;
  severity: ProviderObservabilitySeverity;
  reason: string;
  manualResolution: string;
  blocksIncidentReview: boolean;
}

export interface ProviderObservabilityDrillReport {
  generatedAt: string;
  mode: ProviderObservabilityDrillMode;
  context: Required<ProviderObservabilityDrillInput>;
  readiness: ProviderObservabilityDrillGuardrail;
  observabilityScore: number;
  observabilityStatus: ProviderObservabilityReadinessBand;
  overallSeverity: ProviderObservabilitySeverity;
  sourceNodes: ProviderObservabilitySourceNode[];
  runtimeSignals: RuntimeSignalCard[];
  incidentDrills: IncidentDrillCard[];
  reviewGates: ObservabilityReviewGate[];
  qualityDriftWatch: QualityDriftWatchItem[];
  latencyBudgetReview: LatencyBudgetReviewItem[];
  approvalBoard: ObservabilityApprovalQuestion[];
  rollbackPlan: ObservabilityRollbackItem[];
  riskRegister: ObservabilityRiskItem[];
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

export const PROVIDER_OBSERVABILITY_DRILL_READINESS: ProviderObservabilityDrillGuardrail = {
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
  providerObservabilityReady: true,
  incidentDrillCenterReady: true,
  killSwitchReviewReady: true,
  providerNonCallProofReady: true,
};

const priorityWeight: Record<ProviderObservabilityPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderObservabilityDrillInput): Required<ProviderObservabilityDrillInput> {
  return {
    simulatedSignalCount: input.simulatedSignalCount ?? 14,
    pendingIncidentReviewCount: input.pendingIncidentReviewCount ?? 6,
    unresolvedMonitoringItemCount: input.unresolvedMonitoringItemCount ?? 5,
    unresolvedRollbackItemCount: input.unresolvedRollbackItemCount ?? 4,
    providerActivationFirewallScore: input.providerActivationFirewallScore ?? 77,
    providerRequestSandboxScore: input.providerRequestSandboxScore ?? 75,
    providerResponseFirewallScore: input.providerResponseFirewallScore ?? 74,
    providerShadowEvaluationScore: input.providerShadowEvaluationScore ?? 73,
    providerCanaryRolloutScore: input.providerCanaryRolloutScore ?? 72,
    signalQualityScore: input.signalQualityScore ?? 71,
    incidentDrillScore: input.incidentDrillScore ?? 70,
    killSwitchScore: input.killSwitchScore ?? 78,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    reviewerRole: input.reviewerRole ?? "provider observability reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderObservabilitySeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderObservabilitySeverity): ProviderObservabilityPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderObservabilityReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "incident-review-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderObservabilityLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderObservabilitySourceNode {
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
        ? ["Observability readiness below human review threshold.", "Reviewer must resolve monitoring and rollback context."]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderObservabilityDrillInput>): ProviderObservabilitySourceNode[] {
  const monitorPressure = context.unresolvedMonitoringItemCount * 4;
  const rollbackPressure = context.unresolvedRollbackItemCount * 4;
  const reviewPressure = context.pendingIncidentReviewCount * 3;

  return [
    buildSourceNode(
      "POD_NODE_001",
      "runtime-boundary",
      "Activation firewall baseline",
      "V12.0",
      context.providerActivationFirewallScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Confirm provider remains off while observability is reviewed.",
    ),
    buildSourceNode(
      "POD_NODE_002",
      "signal-monitor",
      "Request sandbox signal baseline",
      "V12.1",
      context.providerRequestSandboxScore,
      context.signalQualityScore,
      monitorPressure,
      "Review request-side dry-run signal shape.",
    ),
    buildSourceNode(
      "POD_NODE_003",
      "quality-drift",
      "Response firewall quality baseline",
      "V12.2",
      context.providerResponseFirewallScore,
      context.signalQualityScore,
      monitorPressure,
      "Review output validation drift patterns.",
    ),
    buildSourceNode(
      "POD_NODE_004",
      "incident-drill",
      "Shadow benchmark incident baseline",
      "V12.3",
      context.providerShadowEvaluationScore,
      context.incidentDrillScore,
      reviewPressure + monitorPressure / 2,
      "Review synthetic benchmark failure drills.",
    ),
    buildSourceNode(
      "POD_NODE_005",
      "kill-switch",
      "Canary rollout stop baseline",
      "V12.4",
      context.providerCanaryRolloutScore,
      context.killSwitchScore,
      rollbackPressure,
      "Review canary stop and rollback rehearsal.",
    ),
    buildSourceNode(
      "POD_NODE_006",
      "latency-budget",
      "Simulated budget review",
      "V12.5",
      context.signalQualityScore,
      context.reviewerConfidenceScore,
      context.simulatedSignalCount,
      "Review signal volume and response time budget as manual topics.",
    ),
    buildSourceNode(
      "POD_NODE_007",
      "review-board",
      "Incident approval board",
      "V12.5",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Confirm every incident drill conclusion remains manual only.",
    ),
    buildSourceNode(
      "POD_NODE_008",
      "rollback-plan",
      "Incident rollback governance",
      "V12.5",
      context.killSwitchScore,
      context.reviewerConfidenceScore,
      rollbackPressure,
      "Prepare manual rollback for any observability concern.",
    ),
  ];
}

function buildRuntimeSignals(context: Required<ProviderObservabilityDrillInput>): RuntimeSignalCard[] {
  return [
    {
      id: "POD_SIGNAL_001",
      label: "Provider boundary signal",
      lane: "runtime-boundary",
      signalScore: 100,
      severity: "info",
      reviewerCheck: "Confirm the simulated signal proves provider stays off.",
      healthyPattern: "Provider non-call proof stays visible.",
      blockedPattern: "Any provider runtime activity.",
    },
    {
      id: "POD_SIGNAL_002",
      label: "Request contract signal",
      lane: "signal-monitor",
      signalScore: clampScore(context.providerRequestSandboxScore),
      severity: severityFromConcern(100 - context.providerRequestSandboxScore),
      reviewerCheck: "Confirm request sandbox signal stays redacted and review-only.",
      healthyPattern: "Blueprint and redaction contract remain reviewable.",
      blockedPattern: "Any provider-bound request material.",
    },
    {
      id: "POD_SIGNAL_003",
      label: "Response validation signal",
      lane: "quality-drift",
      signalScore: clampScore(context.providerResponseFirewallScore),
      severity: severityFromConcern(100 - context.providerResponseFirewallScore),
      reviewerCheck: "Confirm unsafe output rejection remains strict.",
      healthyPattern: "Unsafe output is rejected in review.",
      blockedPattern: "Operational or prescriptive output acceptance.",
    },
    {
      id: "POD_SIGNAL_004",
      label: "Canary stop signal",
      lane: "kill-switch",
      signalScore: clampScore(context.killSwitchScore),
      severity: severityFromConcern(100 - context.killSwitchScore),
      reviewerCheck: "Confirm manual stop drill is clear.",
      healthyPattern: "Manual hold and rollback path are visible.",
      blockedPattern: "Bypass of review board or rollback governance.",
    },
  ];
}

function buildIncidentDrills(context: Required<ProviderObservabilityDrillInput>): IncidentDrillCard[] {
  return [
    {
      id: "POD_DRILL_001",
      label: "Unexpected provider activity drill",
      priority: "urgent",
      severity: "critical",
      trigger: "Any runtime signal implies provider activity.",
      expectedManualAction: "Stop review and return to activation firewall.",
      blockedAction: "Do not call provider or route live cases.",
      drillReady: true,
    },
    {
      id: "POD_DRILL_002",
      label: "Unsafe response drift drill",
      priority: context.providerResponseFirewallScore < 75 ? "urgent" : "high",
      severity: "critical",
      trigger: "Any operational, prescriptive or forecast-like output appears.",
      expectedManualAction: "Reject output and return to response firewall review.",
      blockedAction: "Do not display as actionable guidance.",
      drillReady: context.providerResponseFirewallScore >= 70,
    },
    {
      id: "POD_DRILL_003",
      label: "Benchmark regression drill",
      priority: context.providerShadowEvaluationScore < 75 ? "high" : "medium",
      severity: "elevated",
      trigger: "Synthetic benchmark score drops below manual threshold.",
      expectedManualAction: "Return to shadow evaluation fixtures.",
      blockedAction: "Do not advance readiness board.",
      drillReady: context.providerShadowEvaluationScore >= 70,
    },
    {
      id: "POD_DRILL_004",
      label: "Canary rollback drill",
      priority: context.unresolvedRollbackItemCount >= 4 ? "urgent" : "high",
      severity: "elevated",
      trigger: "Rollback governance remains unclear.",
      expectedManualAction: "Hold pilot review and resolve rollback plan.",
      blockedAction: "Do not advance canary simulator stage.",
      drillReady: context.killSwitchScore >= 70 && context.unresolvedRollbackItemCount < 4,
    },
  ];
}

function buildReviewGates(
  context: Required<ProviderObservabilityDrillInput>,
  sourceNodes: ProviderObservabilitySourceNode[],
): ObservabilityReviewGate[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const gates = [
    {
      id: "POD_GATE_001",
      label: "Provider non-call proof remains valid",
      lane: "runtime-boundary" as ProviderObservabilityLane,
      score: 100,
      reviewer: "safety reviewer",
      reason: "Observability drill uses simulated signals only.",
      hardStop: "No provider invocation is allowed.",
    },
    {
      id: "POD_GATE_002",
      label: "Runtime signals are reviewable",
      lane: "signal-monitor" as ProviderObservabilityLane,
      score: context.signalQualityScore - context.unresolvedMonitoringItemCount * 4,
      reviewer: "observability reviewer",
      reason: "Signals must stay local, redacted and review-only.",
      hardStop: "Do not promote signals to runtime monitoring.",
    },
    {
      id: "POD_GATE_003",
      label: "Incident drills are ready",
      lane: "incident-drill" as ProviderObservabilityLane,
      score: context.incidentDrillScore - context.pendingIncidentReviewCount * 3,
      reviewer: "incident response reviewer",
      reason: "Incident drills must have manual stop and review actions.",
      hardStop: "Do not accept incomplete incident drill coverage.",
    },
    {
      id: "POD_GATE_004",
      label: "Kill-switch review is clear",
      lane: "kill-switch" as ProviderObservabilityLane,
      score: context.killSwitchScore - context.unresolvedRollbackItemCount * 4,
      reviewer: "operations safety reviewer",
      reason: "Manual stop and rollback path must be unambiguous.",
      hardStop: "Do not discuss pilot observability without rollback clarity.",
    },
    {
      id: "POD_GATE_005",
      label: "Manual board remains required",
      lane: "review-board" as ProviderObservabilityLane,
      score: context.reviewerConfidenceScore - context.pendingIncidentReviewCount * 4,
      reviewer: context.reviewerRole,
      reason: "Every incident drill result needs human review.",
      hardStop: "Do not bypass observability approval board.",
    },
    {
      id: "POD_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "rollback-plan" as ProviderObservabilityLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      reason: `${blockedSourceCount} observability source nodes require review.`,
      hardStop: "Resolve source blockers before incident-review-ready state.",
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

function buildQualityDriftWatch(context: Required<ProviderObservabilityDrillInput>): QualityDriftWatchItem[] {
  return [
    {
      id: "POD_DRIFT_001",
      label: "Request redaction drift",
      lane: "signal-monitor",
      driftScore: clampScore(100 - context.providerRequestSandboxScore),
      severity: severityFromConcern(100 - context.providerRequestSandboxScore),
      reviewerQuestion: "Do request-side review signals still prove redaction and minimal context?",
      manualResolution: "Return to provider request sandbox review.",
    },
    {
      id: "POD_DRIFT_002",
      label: "Response rejection drift",
      lane: "quality-drift",
      driftScore: clampScore(100 - context.providerResponseFirewallScore),
      severity: severityFromConcern(100 - context.providerResponseFirewallScore),
      reviewerQuestion: "Do response-side review signals still reject unsafe output?",
      manualResolution: "Return to provider response firewall review.",
    },
    {
      id: "POD_DRIFT_003",
      label: "Shadow benchmark drift",
      lane: "incident-drill",
      driftScore: clampScore(100 - context.providerShadowEvaluationScore),
      severity: severityFromConcern(100 - context.providerShadowEvaluationScore),
      reviewerQuestion: "Do synthetic benchmarks still cover safe and rejected cases?",
      manualResolution: "Return to shadow evaluation review.",
    },
  ];
}

function buildLatencyBudgetReview(context: Required<ProviderObservabilityDrillInput>): LatencyBudgetReviewItem[] {
  return [
    {
      id: "POD_BUDGET_001",
      label: "Synthetic signal volume budget",
      lane: "latency-budget",
      simulatedBudgetScore: clampScore(100 - context.simulatedSignalCount * 2),
      severity: severityFromConcern(context.simulatedSignalCount * 5),
      reviewerQuestion: "Is the simulated signal count manageable for manual incident review?",
      blockedOutcome: "No runtime monitoring or alerting is enabled.",
    },
    {
      id: "POD_BUDGET_002",
      label: "Manual review load budget",
      lane: "review-board",
      simulatedBudgetScore: clampScore(100 - context.pendingIncidentReviewCount * 8),
      severity: severityFromConcern(context.pendingIncidentReviewCount * 9),
      reviewerQuestion: "Can the reviewer board handle the open incident review load?",
      blockedOutcome: "No automatic escalation or notification is created.",
    },
    {
      id: "POD_BUDGET_003",
      label: "Rollback rehearsal budget",
      lane: "rollback-plan",
      simulatedBudgetScore: clampScore(context.killSwitchScore - context.unresolvedRollbackItemCount * 6),
      severity: severityFromConcern(context.unresolvedRollbackItemCount * 13),
      reviewerQuestion: "Is rollback rehearsal complete enough for review?",
      blockedOutcome: "No pilot or runtime change is made.",
    },
  ];
}

function buildApprovalBoard(
  context: Required<ProviderObservabilityDrillInput>,
  gates: ObservabilityReviewGate[],
): ObservabilityApprovalQuestion[] {
  return [
    {
      id: "POD_APPROVAL_001",
      priority: context.unresolvedMonitoringItemCount >= 5 ? "urgent" : "high",
      reviewer: "observability reviewer",
      question: "Which monitoring items block incident drill readiness?",
      evidenceNeeded: ["Runtime signals", "Quality drift watch", "Review gates"],
      safeOutcome: "Manual monitoring review only.",
      manualOnly: true,
    },
    {
      id: "POD_APPROVAL_002",
      priority: context.unresolvedRollbackItemCount >= 4 ? "urgent" : "high",
      reviewer: "operations safety reviewer",
      question: "Which rollback items block incident response review?",
      evidenceNeeded: ["Kill-switch drills", "Rollback plan", "Risk register"],
      safeOutcome: "Manual rollback review only.",
      manualOnly: true,
    },
    {
      id: "POD_APPROVAL_003",
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      reviewer: context.reviewerRole,
      question: "Can incident drills be discussed without enabling provider runtime?",
      evidenceNeeded: gates.map((gate) => gate.label),
      safeOutcome: "Board discussion note only.",
      manualOnly: true,
    },
  ];
}

function buildRollbackPlan(gates: ObservabilityReviewGate[]): ObservabilityRollbackItem[] {
  const failedGates = gates.filter((gate) => !gate.passed);

  return [
    {
      id: "POD_ROLLBACK_001",
      trigger: "Any failed observability review gate.",
      priority: failedGates.length > 0 ? "urgent" : "high",
      manualRollbackAction: "Return to firewall, request, response and canary review.",
      blockedAction: "Do not advance observability readiness.",
    },
    {
      id: "POD_ROLLBACK_002",
      trigger: "Any runtime boundary concern.",
      priority: "urgent",
      manualRollbackAction: "Return to activation firewall review.",
      blockedAction: "Do not enable provider monitoring.",
    },
    {
      id: "POD_ROLLBACK_003",
      trigger: "Any incident reviewer rejects drill coverage.",
      priority: "high",
      manualRollbackAction: "Hold incident response review and document reviewer concern manually.",
      blockedAction: "Do not bypass approval board.",
    },
  ];
}

function buildRiskRegister(
  context: Required<ProviderObservabilityDrillInput>,
  sourceNodes: ProviderObservabilitySourceNode[],
  gates: ObservabilityReviewGate[],
  drills: IncidentDrillCard[],
): ObservabilityRiskItem[] {
  const risks: ObservabilityRiskItem[] = [];

  if (context.unresolvedMonitoringItemCount > 0) {
    risks.push({
      id: "POD_RISK_001",
      label: "Unresolved monitoring items",
      lane: "signal-monitor",
      severity: context.unresolvedMonitoringItemCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedMonitoringItemCount} monitoring items remain open.`,
      manualResolution: "Resolve signal review issues through human review.",
      blocksIncidentReview: context.unresolvedMonitoringItemCount >= 5,
    });
  }

  if (context.unresolvedRollbackItemCount > 0) {
    risks.push({
      id: "POD_RISK_002",
      label: "Unresolved rollback items",
      lane: "rollback-plan",
      severity: context.unresolvedRollbackItemCount >= 4 ? "critical" : "elevated",
      reason: `${context.unresolvedRollbackItemCount} rollback items remain open.`,
      manualResolution: "Resolve kill-switch and rollback rehearsal topics manually.",
      blocksIncidentReview: context.unresolvedRollbackItemCount >= 4,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `POD_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksIncidentReview: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `POD_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: gate.reason,
        manualResolution: gate.hardStop,
        blocksIncidentReview: gate.severity === "critical" || gate.score < 60,
      });
    });

  drills
    .filter((drill) => !drill.drillReady)
    .forEach((drill, index) => {
      risks.push({
        id: `POD_DRILL_RISK_${String(index + 1).padStart(3, "0")}`,
        label: drill.label,
        lane: "incident-drill",
        severity: drill.severity,
        reason: drill.trigger,
        manualResolution: drill.expectedManualAction,
        blocksIncidentReview: true,
      });
    });

  return risks;
}

export function buildAiProviderObservabilityDrillReport(
  input: ProviderObservabilityDrillInput = {},
): ProviderObservabilityDrillReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const runtimeSignals = buildRuntimeSignals(context);
  const incidentDrills = buildIncidentDrills(context);
  const reviewGates = buildReviewGates(context, sourceNodes);
  const qualityDriftWatch = buildQualityDriftWatch(context);
  const latencyBudgetReview = buildLatencyBudgetReview(context);
  const approvalBoard = buildApprovalBoard(context, reviewGates);
  const rollbackPlan = buildRollbackPlan(reviewGates);
  const riskRegister = buildRiskRegister(context, sourceNodes, reviewGates, incidentDrills);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const signalAverage =
    runtimeSignals.reduce((sum, item) => sum + item.signalScore, 0) / Math.max(1, runtimeSignals.length);

  const gateAverage =
    reviewGates.reduce((sum, gate) => sum + gate.score, 0) / Math.max(1, reviewGates.length);

  const budgetAverage =
    latencyBudgetReview.reduce((sum, item) => sum + item.simulatedBudgetScore, 0) /
    Math.max(1, latencyBudgetReview.length);

  const riskPenalty = riskRegister.filter((item) => item.blocksIncidentReview).length * 10;
  const approvalPressure =
    approvalBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, approvalBoard.length * 3);

  const observabilityScore = clampScore(
    sourceAverage / 4 +
      signalAverage / 4 +
      gateAverage / 4 +
      budgetAverage / 4 +
      approvalPressure -
      riskPenalty -
      context.unresolvedMonitoringItemCount -
      context.unresolvedRollbackItemCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.pendingIncidentReviewCount * 6 +
        context.unresolvedMonitoringItemCount * 8 +
        context.unresolvedRollbackItemCount * 8 +
        reviewGates.filter((gate) => !gate.passed).length * 9,
    ),
  );

  const observabilityStatus = bandFromScore(
    observabilityScore,
    riskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_OBSERVABILITY_DRILL_READINESS,
    observabilityScore,
    observabilityStatus,
    overallSeverity,
    sourceNodes,
    runtimeSignals,
    incidentDrills,
    reviewGates,
    qualityDriftWatch,
    latencyBudgetReview,
    approvalBoard,
    rollbackPlan,
    riskRegister,
    redactedExportBundle: {
      exportId: "provider_observability_drill_v12_5_redacted_dry_run",
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
        "runtime signals",
        "incident drills",
        "review gates",
        "quality drift watch",
        "latency budget review",
        "approval board",
        "rollback plan",
        "risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider observability drill center is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Runtime signals, incident drills and budget reviews are review concepts only.",
      "Every incident response conclusion remains behind human review and runtime boundary gates.",
    ],
  };
}

export const aiProviderObservabilityDrillVersion = "V12.5";
