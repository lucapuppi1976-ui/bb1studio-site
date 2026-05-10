export type ProviderRuntimeAdapterMode = "dry-run" | "adapter-contract-review";

export type ProviderRuntimeAdapterSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderRuntimeAdapterPriority = "low" | "medium" | "high" | "urgent";

export type ProviderRuntimeAdapterReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "adapter-review-ready";

export type ProviderRuntimeAdapterLane =
  | "adapter-contract"
  | "zero-call-proof"
  | "runtime-freeze"
  | "human-loop"
  | "boundary-check"
  | "adapter-stage"
  | "rollback-rehearsal"
  | "go-live-blocker";

export interface ProviderRuntimeAdapterGuardrail {
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
  runtimeAdapterContractReady: true;
  zeroCallHarnessReady: true;
  adapterFreezeReady: true;
  humanLoopAdapterReady: true;
}

export interface ProviderRuntimeAdapterInput {
  openAdapterItemCount?: number;
  pendingHumanLoopReviewCount?: number;
  unresolvedBoundaryCheckCount?: number;
  unresolvedRollbackRehearsalCount?: number;
  providerActivationFirewallScore?: number;
  providerRequestSandboxScore?: number;
  providerResponseFirewallScore?: number;
  providerShadowEvaluationScore?: number;
  providerCanaryRolloutScore?: number;
  providerObservabilityScore?: number;
  providerGovernanceReleaseCandidateScore?: number;
  providerSafeEnablementGateScore?: number;
  adapterContractScore?: number;
  reviewerConfidenceScore?: number;
  reviewerRole?: string;
}

export interface RuntimeAdapterSourceNode {
  id: string;
  lane: ProviderRuntimeAdapterLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderRuntimeAdapterSeverity;
  priority: ProviderRuntimeAdapterPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface RuntimeAdapterContractItem {
  id: string;
  label: string;
  lane: ProviderRuntimeAdapterLane;
  ready: boolean;
  readinessScore: number;
  reviewerCheck: string;
  allowedContractContent: string[];
  blockedContractContent: string[];
}

export interface ZeroCallProofItem {
  id: string;
  label: string;
  lane: ProviderRuntimeAdapterLane;
  proofReady: true;
  severity: ProviderRuntimeAdapterSeverity;
  proofStatement: string;
  blockedRuntimeOutcome: string;
  reviewer: string;
}

export interface RuntimeAdapterGateItem {
  id: string;
  label: string;
  lane: ProviderRuntimeAdapterLane;
  passed: boolean;
  score: number;
  severity: ProviderRuntimeAdapterSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface AdapterStageItem {
  id: string;
  label: string;
  stageOrder: number;
  readinessBand: ProviderRuntimeAdapterReadinessBand;
  simulatedScope: string;
  allowedOutcome: string;
  blockedOutcome: string;
  reviewerQuestion: string;
}

export interface HumanLoopHandoffItem {
  id: string;
  priority: ProviderRuntimeAdapterPriority;
  reviewer: string;
  handoffQuestion: string;
  requiredEvidence: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface AdapterRollbackItem {
  id: string;
  trigger: string;
  priority: ProviderRuntimeAdapterPriority;
  rehearsalReady: boolean;
  manualRollbackAction: string;
  blockedAction: string;
}

export interface AdapterRiskItem {
  id: string;
  label: string;
  lane: ProviderRuntimeAdapterLane;
  severity: ProviderRuntimeAdapterSeverity;
  reason: string;
  manualResolution: string;
  blocksAdapterReview: boolean;
}

export interface ProviderRuntimeAdapterReport {
  generatedAt: string;
  mode: ProviderRuntimeAdapterMode;
  context: Required<ProviderRuntimeAdapterInput>;
  readiness: ProviderRuntimeAdapterGuardrail;
  adapterScore: number;
  adapterStatus: ProviderRuntimeAdapterReadinessBand;
  overallSeverity: ProviderRuntimeAdapterSeverity;
  sourceNodes: RuntimeAdapterSourceNode[];
  adapterContract: RuntimeAdapterContractItem[];
  zeroCallProof: ZeroCallProofItem[];
  runtimeAdapterGates: RuntimeAdapterGateItem[];
  adapterStages: AdapterStageItem[];
  humanLoopHandoff: HumanLoopHandoffItem[];
  rollbackRehearsal: AdapterRollbackItem[];
  adapterRiskRegister: AdapterRiskItem[];
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

export const PROVIDER_RUNTIME_ADAPTER_READINESS: ProviderRuntimeAdapterGuardrail = {
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
  runtimeAdapterContractReady: true,
  zeroCallHarnessReady: true,
  adapterFreezeReady: true,
  humanLoopAdapterReady: true,
};

const priorityWeight: Record<ProviderRuntimeAdapterPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderRuntimeAdapterInput): Required<ProviderRuntimeAdapterInput> {
  return {
    openAdapterItemCount: input.openAdapterItemCount ?? 8,
    pendingHumanLoopReviewCount: input.pendingHumanLoopReviewCount ?? 5,
    unresolvedBoundaryCheckCount: input.unresolvedBoundaryCheckCount ?? 4,
    unresolvedRollbackRehearsalCount: input.unresolvedRollbackRehearsalCount ?? 4,
    providerActivationFirewallScore: input.providerActivationFirewallScore ?? 78,
    providerRequestSandboxScore: input.providerRequestSandboxScore ?? 76,
    providerResponseFirewallScore: input.providerResponseFirewallScore ?? 75,
    providerShadowEvaluationScore: input.providerShadowEvaluationScore ?? 74,
    providerCanaryRolloutScore: input.providerCanaryRolloutScore ?? 73,
    providerObservabilityScore: input.providerObservabilityScore ?? 72,
    providerGovernanceReleaseCandidateScore: input.providerGovernanceReleaseCandidateScore ?? 72,
    providerSafeEnablementGateScore: input.providerSafeEnablementGateScore ?? 71,
    adapterContractScore: input.adapterContractScore ?? 70,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    reviewerRole: input.reviewerRole ?? "provider runtime adapter reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderRuntimeAdapterSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderRuntimeAdapterSeverity): ProviderRuntimeAdapterPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderRuntimeAdapterReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "adapter-review-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderRuntimeAdapterLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): RuntimeAdapterSourceNode {
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
        ? ["Runtime adapter review is below zero-call threshold.", "Reviewer must resolve adapter, boundary and rollback context."]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderRuntimeAdapterInput>): RuntimeAdapterSourceNode[] {
  const boundaryPressure = context.unresolvedBoundaryCheckCount * 4;
  const rollbackPressure = context.unresolvedRollbackRehearsalCount * 4;
  const reviewPressure = context.pendingHumanLoopReviewCount * 4;
  const adapterPressure = context.openAdapterItemCount * 2;

  return [
    buildSourceNode(
      "PRAC_NODE_001",
      "runtime-freeze",
      "Activation firewall baseline",
      "V12.0",
      context.providerActivationFirewallScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Confirm provider runtime remains frozen during adapter contract review.",
    ),
    buildSourceNode(
      "PRAC_NODE_002",
      "adapter-contract",
      "Request sandbox contract baseline",
      "V12.1",
      context.providerRequestSandboxScore,
      context.adapterContractScore,
      boundaryPressure,
      "Review request-side contract shape for adapter wiring.",
    ),
    buildSourceNode(
      "PRAC_NODE_003",
      "adapter-contract",
      "Response firewall contract baseline",
      "V12.2",
      context.providerResponseFirewallScore,
      context.adapterContractScore,
      boundaryPressure,
      "Review response-side validation shape for adapter wiring.",
    ),
    buildSourceNode(
      "PRAC_NODE_004",
      "zero-call-proof",
      "Shadow evaluation baseline",
      "V12.3",
      context.providerShadowEvaluationScore,
      context.reviewerConfidenceScore,
      adapterPressure,
      "Review zero-call benchmark evidence.",
    ),
    buildSourceNode(
      "PRAC_NODE_005",
      "rollback-rehearsal",
      "Canary rollout baseline",
      "V12.4",
      context.providerCanaryRolloutScore,
      context.reviewerConfidenceScore,
      rollbackPressure,
      "Review canary stop and rollback rehearsal.",
    ),
    buildSourceNode(
      "PRAC_NODE_006",
      "boundary-check",
      "Observability drill baseline",
      "V12.5",
      context.providerObservabilityScore,
      context.reviewerConfidenceScore,
      rollbackPressure + reviewPressure / 2,
      "Review observability and incident drill readiness.",
    ),
    buildSourceNode(
      "PRAC_NODE_007",
      "human-loop",
      "Governance release candidate baseline",
      "V12.6",
      context.providerGovernanceReleaseCandidateScore,
      context.reviewerConfidenceScore,
      reviewPressure + boundaryPressure / 2,
      "Review model risk and go/no-go context before adapter review.",
    ),
    buildSourceNode(
      "PRAC_NODE_008",
      "go-live-blocker",
      "Safe enablement gate baseline",
      "V12.7",
      context.providerSafeEnablementGateScore,
      context.reviewerConfidenceScore,
      adapterPressure + reviewPressure,
      "Review dual-control and go-live blockers before adapter contract discussion.",
    ),
  ];
}

function buildAdapterContract(context: Required<ProviderRuntimeAdapterInput>): RuntimeAdapterContractItem[] {
  return [
    {
      id: "PRAC_CONTRACT_001",
      label: "Request intake adapter shape",
      lane: "adapter-contract",
      ready: context.providerRequestSandboxScore >= 70,
      readinessScore: clampScore(context.providerRequestSandboxScore),
      reviewerCheck: "Confirm request intake remains redacted and review-only.",
      allowedContractContent: ["Redacted case summary", "Evidence summary", "Human review marker"],
      blockedContractContent: ["Provider-bound payload", "Runtime route", "Live case routing"],
    },
    {
      id: "PRAC_CONTRACT_002",
      label: "Response validation adapter shape",
      lane: "adapter-contract",
      ready: context.providerResponseFirewallScore >= 70,
      readinessScore: clampScore(context.providerResponseFirewallScore),
      reviewerCheck: "Confirm response validation blocks operational content.",
      allowedContractContent: ["Review status", "Evidence commentary", "Uncertainty note"],
      blockedContractContent: ["Task instruction", "Product recommendation", "Dosage guidance", "Production forecast"],
    },
    {
      id: "PRAC_CONTRACT_003",
      label: "Human-loop handoff shape",
      lane: "human-loop",
      ready: context.reviewerConfidenceScore >= 70,
      readinessScore: clampScore(context.reviewerConfidenceScore),
      reviewerCheck: "Confirm all outputs route to manual review.",
      allowedContractContent: ["Reviewer question", "Manual signoff prompt", "Hold reason"],
      blockedContractContent: ["Automatic approval", "Automatic dispatch", "Public share"],
    },
    {
      id: "PRAC_CONTRACT_004",
      label: "Runtime freeze shape",
      lane: "runtime-freeze",
      ready: true,
      readinessScore: 100,
      reviewerCheck: "Confirm adapter contract contains a hard runtime freeze.",
      allowedContractContent: ["Zero-call marker", "Dry-run status", "Runtime freeze"],
      blockedContractContent: ["Runtime switch", "Live provider call", "Storage write"],
    },
  ];
}

function buildZeroCallProof(): ZeroCallProofItem[] {
  return [
    {
      id: "PRAC_ZERO_001",
      label: "Provider call remains absent",
      lane: "zero-call-proof",
      proofReady: true,
      severity: "critical",
      proofStatement: "Adapter contract is a static local review object only.",
      blockedRuntimeOutcome: "No external model call can occur.",
      reviewer: "safety reviewer",
    },
    {
      id: "PRAC_ZERO_002",
      label: "Data write remains absent",
      lane: "runtime-freeze",
      proofReady: true,
      severity: "critical",
      proofStatement: "Adapter output is not written, promoted or stored.",
      blockedRuntimeOutcome: "No storage write or memory update can occur.",
      reviewer: "operations reviewer",
    },
    {
      id: "PRAC_ZERO_003",
      label: "Operational action remains absent",
      lane: "human-loop",
      proofReady: true,
      severity: "critical",
      proofStatement: "Adapter cannot create or execute agronomic work.",
      blockedRuntimeOutcome: "No task, intervention or execution can occur.",
      reviewer: "agronomic reviewer",
    },
    {
      id: "PRAC_ZERO_004",
      label: "Prescriptive output remains absent",
      lane: "boundary-check",
      proofReady: true,
      severity: "critical",
      proofStatement: "Adapter cannot produce product, dosage or forecast outputs.",
      blockedRuntimeOutcome: "No product prescription, dosage advice or production forecast can occur.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildRuntimeAdapterGates(
  context: Required<ProviderRuntimeAdapterInput>,
  sourceNodes: RuntimeAdapterSourceNode[],
): RuntimeAdapterGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PRAC_GATE_001",
      label: "Runtime remains frozen",
      lane: "runtime-freeze" as ProviderRuntimeAdapterLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["Zero-call proof", "Runtime freeze shape", "Activation firewall"],
      hardStop: "No provider invocation is allowed.",
    },
    {
      id: "PRAC_GATE_002",
      label: "Adapter contract is reviewable",
      lane: "adapter-contract" as ProviderRuntimeAdapterLane,
      score: context.adapterContractScore - context.openAdapterItemCount * 3,
      reviewer: "adapter reviewer",
      requiredEvidence: ["Request sandbox", "Response firewall", "Adapter contract"],
      hardStop: "Do not treat adapter contract as runtime code.",
    },
    {
      id: "PRAC_GATE_003",
      label: "Human-loop handoff is complete enough",
      lane: "human-loop" as ProviderRuntimeAdapterLane,
      score: context.reviewerConfidenceScore - context.pendingHumanLoopReviewCount * 4,
      reviewer: context.reviewerRole,
      requiredEvidence: ["Human-loop handoff", "Governance release candidate", "Safe enablement gate"],
      hardStop: "Do not bypass human review.",
    },
    {
      id: "PRAC_GATE_004",
      label: "Boundary checks are resolved",
      lane: "boundary-check" as ProviderRuntimeAdapterLane,
      score: 100 - context.unresolvedBoundaryCheckCount * 12,
      reviewer: "boundary reviewer",
      requiredEvidence: ["Zero-call proof", "Boundary check", "Go-live blockers"],
      hardStop: "Do not proceed with unresolved runtime boundary checks.",
    },
    {
      id: "PRAC_GATE_005",
      label: "Rollback rehearsal is clear",
      lane: "rollback-rehearsal" as ProviderRuntimeAdapterLane,
      score: 100 - context.unresolvedRollbackRehearsalCount * 12,
      reviewer: "operations safety reviewer",
      requiredEvidence: ["Canary rollout", "Observability drill", "Rollback rehearsal"],
      hardStop: "Do not proceed without manual rollback clarity.",
    },
    {
      id: "PRAC_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "go-live-blocker" as ProviderRuntimeAdapterLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before adapter-review-ready state.",
    },
  ];

  return rows.map((row) => {
    const score = clampScore(row.score);
    const severity = severityFromConcern(100 - score);

    return {
      ...row,
      score,
      severity,
      passed: score >= 70,
    };
  });
}

function buildAdapterStages(context: Required<ProviderRuntimeAdapterInput>): AdapterStageItem[] {
  return [
    {
      id: "PRAC_STAGE_001",
      label: "Static adapter review",
      stageOrder: 0,
      readinessBand: "review-ready",
      simulatedScope: "Local TypeScript contract review only.",
      allowedOutcome: "Manual adapter review note.",
      blockedOutcome: "Runtime provider adapter activation.",
      reviewerQuestion: "Can reviewers confirm this is a static contract only?",
    },
    {
      id: "PRAC_STAGE_002",
      label: "Request-response wiring review",
      stageOrder: 1,
      readinessBand: bandFromScore((context.providerRequestSandboxScore + context.providerResponseFirewallScore) / 2, 0),
      simulatedScope: "Contract alignment between request sandbox and response firewall.",
      allowedOutcome: "Wiring review packet.",
      blockedOutcome: "Provider-bound request or accepted provider response.",
      reviewerQuestion: "Do request and response shapes remain non-operational?",
    },
    {
      id: "PRAC_STAGE_003",
      label: "Human-loop handoff review",
      stageOrder: 2,
      readinessBand: bandFromScore(context.reviewerConfidenceScore, context.pendingHumanLoopReviewCount >= 5 ? 1 : 0),
      simulatedScope: "Reviewer handoff and hold status only.",
      allowedOutcome: "Manual reviewer handoff note.",
      blockedOutcome: "Automatic approval or dispatch.",
      reviewerQuestion: "Does every route remain behind human review?",
    },
    {
      id: "PRAC_STAGE_004",
      label: "Freeze and rollback review",
      stageOrder: 3,
      readinessBand: bandFromScore(100 - context.unresolvedRollbackRehearsalCount * 12, context.unresolvedRollbackRehearsalCount >= 4 ? 1 : 0),
      simulatedScope: "Runtime freeze and rollback rehearsal.",
      allowedOutcome: "Rollback rehearsal note.",
      blockedOutcome: "Runtime switch or live provider call.",
      reviewerQuestion: "Can the adapter review be halted manually at any concern?",
    },
  ];
}

function buildHumanLoopHandoff(
  context: Required<ProviderRuntimeAdapterInput>,
  gates: RuntimeAdapterGateItem[],
): HumanLoopHandoffItem[] {
  return [
    {
      id: "PRAC_HANDOFF_001",
      priority: context.pendingHumanLoopReviewCount >= 5 ? "urgent" : "high",
      reviewer: "human-loop reviewer",
      handoffQuestion: "Which manual review items block adapter contract discussion?",
      requiredEvidence: ["Runtime adapter gates", "Human-loop handoff", "Change ticket evidence"],
      safeOutcome: "Manual handoff review only.",
      manualOnly: true,
    },
    {
      id: "PRAC_HANDOFF_002",
      priority: context.unresolvedBoundaryCheckCount >= 4 ? "urgent" : "high",
      reviewer: "boundary reviewer",
      handoffQuestion: "Which boundary checks prevent zero-call adapter readiness?",
      requiredEvidence: ["Zero-call proof", "Boundary check", "Safe enablement gate"],
      safeOutcome: "Manual boundary review only.",
      manualOnly: true,
    },
    {
      id: "PRAC_HANDOFF_003",
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      reviewer: context.reviewerRole,
      handoffQuestion: "Can runtime adapter contract be reviewed without enabling provider runtime?",
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Board discussion note only.",
      manualOnly: true,
    },
  ];
}

function buildRollbackRehearsal(context: Required<ProviderRuntimeAdapterInput>): AdapterRollbackItem[] {
  return [
    {
      id: "PRAC_ROLLBACK_001",
      trigger: "Any provider runtime path appears in review.",
      priority: "urgent",
      rehearsalReady: true,
      manualRollbackAction: "Return to activation firewall and safe enablement gate.",
      blockedAction: "Do not enable provider runtime.",
    },
    {
      id: "PRAC_ROLLBACK_002",
      trigger: "Any adapter contract ambiguity remains.",
      priority: context.openAdapterItemCount >= 8 ? "urgent" : "high",
      rehearsalReady: context.openAdapterItemCount < 9,
      manualRollbackAction: "Return to request sandbox and response firewall contract review.",
      blockedAction: "Do not accept adapter contract as complete.",
    },
    {
      id: "PRAC_ROLLBACK_003",
      trigger: "Any rollback rehearsal item remains unresolved.",
      priority: context.unresolvedRollbackRehearsalCount >= 4 ? "urgent" : "high",
      rehearsalReady: context.unresolvedRollbackRehearsalCount < 4,
      manualRollbackAction: "Return to canary rollout and observability drill review.",
      blockedAction: "Do not proceed to adapter-review-ready state.",
    },
  ];
}

function buildRiskRegister(
  context: Required<ProviderRuntimeAdapterInput>,
  sourceNodes: RuntimeAdapterSourceNode[],
  gates: RuntimeAdapterGateItem[],
  rollback: AdapterRollbackItem[],
): AdapterRiskItem[] {
  const risks: AdapterRiskItem[] = [];

  if (context.pendingHumanLoopReviewCount > 0) {
    risks.push({
      id: "PRAC_RISK_001",
      label: "Pending human-loop review",
      lane: "human-loop",
      severity: context.pendingHumanLoopReviewCount >= 5 ? "elevated" : "watch",
      reason: `${context.pendingHumanLoopReviewCount} human-loop review items remain open.`,
      manualResolution: "Close handoff review items manually.",
      blocksAdapterReview: context.pendingHumanLoopReviewCount >= 6,
    });
  }

  if (context.unresolvedBoundaryCheckCount > 0) {
    risks.push({
      id: "PRAC_RISK_002",
      label: "Unresolved boundary checks",
      lane: "boundary-check",
      severity: context.unresolvedBoundaryCheckCount >= 4 ? "critical" : "elevated",
      reason: `${context.unresolvedBoundaryCheckCount} boundary checks remain open.`,
      manualResolution: "Resolve boundary checks before adapter review.",
      blocksAdapterReview: context.unresolvedBoundaryCheckCount >= 4,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `PRAC_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksAdapterReview: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `PRAC_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksAdapterReview: gate.severity === "critical" || gate.score < 60,
      });
    });

  rollback
    .filter((item) => !item.rehearsalReady)
    .forEach((item, index) => {
      risks.push({
        id: `PRAC_ROLLBACK_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.trigger,
        lane: "rollback-rehearsal",
        severity: item.priority === "urgent" ? "critical" : "elevated",
        reason: item.blockedAction,
        manualResolution: item.manualRollbackAction,
        blocksAdapterReview: true,
      });
    });

  return risks;
}

export function buildAiProviderRuntimeAdapterReport(
  input: ProviderRuntimeAdapterInput = {},
): ProviderRuntimeAdapterReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const adapterContract = buildAdapterContract(context);
  const zeroCallProof = buildZeroCallProof();
  const runtimeAdapterGates = buildRuntimeAdapterGates(context, sourceNodes);
  const adapterStages = buildAdapterStages(context);
  const humanLoopHandoff = buildHumanLoopHandoff(context, runtimeAdapterGates);
  const rollbackRehearsal = buildRollbackRehearsal(context);
  const adapterRiskRegister = buildRiskRegister(context, sourceNodes, runtimeAdapterGates, rollbackRehearsal);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const contractAverage =
    adapterContract.reduce((sum, item) => sum + item.readinessScore, 0) / Math.max(1, adapterContract.length);

  const gateAverage =
    runtimeAdapterGates.reduce((sum, gate) => sum + gate.score, 0) / Math.max(1, runtimeAdapterGates.length);

  const riskPenalty = adapterRiskRegister.filter((item) => item.blocksAdapterReview).length * 10;
  const handoffPressure =
    humanLoopHandoff.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, humanLoopHandoff.length * 3);

  const adapterScore = clampScore(
    sourceAverage / 3 +
      contractAverage / 3 +
      gateAverage / 3 +
      handoffPressure -
      riskPenalty -
      context.unresolvedBoundaryCheckCount -
      context.unresolvedRollbackRehearsalCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openAdapterItemCount * 5 +
        context.pendingHumanLoopReviewCount * 6 +
        context.unresolvedBoundaryCheckCount * 8 +
        context.unresolvedRollbackRehearsalCount * 8 +
        runtimeAdapterGates.filter((gate) => !gate.passed).length * 9,
    ),
  );

  const adapterStatus = bandFromScore(
    adapterScore,
    adapterRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_RUNTIME_ADAPTER_READINESS,
    adapterScore,
    adapterStatus,
    overallSeverity,
    sourceNodes,
    adapterContract,
    zeroCallProof,
    runtimeAdapterGates,
    adapterStages,
    humanLoopHandoff,
    rollbackRehearsal,
    adapterRiskRegister,
    redactedExportBundle: {
      exportId: "provider_runtime_adapter_contract_v12_8_redacted_dry_run",
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
        "adapter contract",
        "zero call proof",
        "runtime adapter gates",
        "adapter stages",
        "human loop handoff",
        "rollback rehearsal",
        "adapter risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider runtime adapter contract is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Adapter stages and human-loop handoff are review concepts only.",
      "Every adapter conclusion remains behind human review and runtime freeze gates.",
    ],
  };
}

export const aiProviderRuntimeAdapterVersion = "V12.8";
