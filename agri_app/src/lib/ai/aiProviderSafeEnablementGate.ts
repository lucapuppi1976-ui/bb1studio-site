export type ProviderSafeEnablementGateMode = "dry-run" | "dual-control-review";

export type ProviderSafeEnablementSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderSafeEnablementPriority = "low" | "medium" | "high" | "urgent";

export type ProviderSafeEnablementReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "dual-control-ready";

export type ProviderSafeEnablementLane =
  | "safe-enablement"
  | "dual-control"
  | "change-ticket"
  | "readiness-ledger"
  | "boundary-exception"
  | "go-live-blocker"
  | "rollback-rehearsal"
  | "runtime-boundary";

export interface ProviderSafeEnablementGateGuardrail {
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
  safeEnablementGateReady: true;
  dualControlReviewReady: true;
  changeTicketDraftReady: true;
  providerNonCallProofReady: true;
}

export interface ProviderSafeEnablementGateInput {
  openEnablementItemCount?: number;
  pendingDualControlSignoffCount?: number;
  unresolvedBoundaryExceptionCount?: number;
  unresolvedRollbackRehearsalCount?: number;
  providerActivationFirewallScore?: number;
  providerRequestSandboxScore?: number;
  providerResponseFirewallScore?: number;
  providerShadowEvaluationScore?: number;
  providerCanaryRolloutScore?: number;
  providerObservabilityScore?: number;
  providerGovernanceReleaseCandidateScore?: number;
  changeTicketScore?: number;
  dualControlConfidenceScore?: number;
  reviewerRole?: string;
}

export interface SafeEnablementSourceNode {
  id: string;
  lane: ProviderSafeEnablementLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderSafeEnablementSeverity;
  priority: ProviderSafeEnablementPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface SafeEnablementGateItem {
  id: string;
  label: string;
  lane: ProviderSafeEnablementLane;
  passed: boolean;
  score: number;
  severity: ProviderSafeEnablementSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface DualControlApprovalItem {
  id: string;
  primaryReviewer: string;
  secondaryReviewer: string;
  priority: ProviderSafeEnablementPriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface ChangeTicketDraftItem {
  id: string;
  label: string;
  lane: ProviderSafeEnablementLane;
  draftReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  allowedTicketContent: string[];
  blockedTicketContent: string[];
}

export interface ReadinessLedgerItem {
  id: string;
  label: string;
  sourceVersion: string;
  readinessScore: number;
  evidenceSummary: string;
  reviewerOwner: string;
  unresolvedReason: string;
}

export interface BoundaryExceptionItem {
  id: string;
  label: string;
  severity: ProviderSafeEnablementSeverity;
  exceptionReason: string;
  manualDisposition: string;
  blocksEnablementReview: boolean;
}

export interface GoLiveBlockerItem {
  id: string;
  label: string;
  lane: ProviderSafeEnablementLane;
  severity: ProviderSafeEnablementSeverity;
  blockerReason: string;
  requiredManualResolution: string;
}

export interface RollbackRehearsalItem {
  id: string;
  trigger: string;
  priority: ProviderSafeEnablementPriority;
  rehearsalReady: boolean;
  manualRollbackAction: string;
  blockedAction: string;
}

export interface SafeEnablementRiskItem {
  id: string;
  label: string;
  lane: ProviderSafeEnablementLane;
  severity: ProviderSafeEnablementSeverity;
  reason: string;
  manualResolution: string;
  blocksDualControlReview: boolean;
}

export interface ProviderSafeEnablementGateReport {
  generatedAt: string;
  mode: ProviderSafeEnablementGateMode;
  context: Required<ProviderSafeEnablementGateInput>;
  readiness: ProviderSafeEnablementGateGuardrail;
  enablementScore: number;
  enablementStatus: ProviderSafeEnablementReadinessBand;
  overallSeverity: ProviderSafeEnablementSeverity;
  sourceNodes: SafeEnablementSourceNode[];
  enablementGates: SafeEnablementGateItem[];
  dualControlApprovalBoard: DualControlApprovalItem[];
  changeTicketDraft: ChangeTicketDraftItem[];
  readinessLedger: ReadinessLedgerItem[];
  boundaryExceptionRegister: BoundaryExceptionItem[];
  goLiveBlockers: GoLiveBlockerItem[];
  rollbackRehearsal: RollbackRehearsalItem[];
  safeEnablementRiskRegister: SafeEnablementRiskItem[];
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

export const PROVIDER_SAFE_ENABLEMENT_GATE_READINESS: ProviderSafeEnablementGateGuardrail = {
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
  safeEnablementGateReady: true,
  dualControlReviewReady: true,
  changeTicketDraftReady: true,
  providerNonCallProofReady: true,
};

const priorityWeight: Record<ProviderSafeEnablementPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderSafeEnablementGateInput): Required<ProviderSafeEnablementGateInput> {
  return {
    openEnablementItemCount: input.openEnablementItemCount ?? 8,
    pendingDualControlSignoffCount: input.pendingDualControlSignoffCount ?? 5,
    unresolvedBoundaryExceptionCount: input.unresolvedBoundaryExceptionCount ?? 4,
    unresolvedRollbackRehearsalCount: input.unresolvedRollbackRehearsalCount ?? 4,
    providerActivationFirewallScore: input.providerActivationFirewallScore ?? 78,
    providerRequestSandboxScore: input.providerRequestSandboxScore ?? 76,
    providerResponseFirewallScore: input.providerResponseFirewallScore ?? 75,
    providerShadowEvaluationScore: input.providerShadowEvaluationScore ?? 74,
    providerCanaryRolloutScore: input.providerCanaryRolloutScore ?? 73,
    providerObservabilityScore: input.providerObservabilityScore ?? 72,
    providerGovernanceReleaseCandidateScore: input.providerGovernanceReleaseCandidateScore ?? 71,
    changeTicketScore: input.changeTicketScore ?? 70,
    dualControlConfidenceScore: input.dualControlConfidenceScore ?? 74,
    reviewerRole: input.reviewerRole ?? "provider safe enablement reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderSafeEnablementSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderSafeEnablementSeverity): ProviderSafeEnablementPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderSafeEnablementReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "dual-control-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderSafeEnablementLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): SafeEnablementSourceNode {
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
        ? ["Safe enablement review is below dual-control threshold.", "Reviewer must resolve boundary, signoff and rollback context."]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderSafeEnablementGateInput>): SafeEnablementSourceNode[] {
  const boundaryPressure = context.unresolvedBoundaryExceptionCount * 4;
  const rollbackPressure = context.unresolvedRollbackRehearsalCount * 4;
  const signoffPressure = context.pendingDualControlSignoffCount * 4;
  const enablementPressure = context.openEnablementItemCount * 2;

  return [
    buildSourceNode(
      "PSEG_NODE_001",
      "runtime-boundary",
      "Activation firewall boundary",
      "V12.0",
      context.providerActivationFirewallScore,
      context.dualControlConfidenceScore,
      signoffPressure,
      "Confirm provider boundary remains off and dual-control review is review-only.",
    ),
    buildSourceNode(
      "PSEG_NODE_002",
      "change-ticket",
      "Request sandbox change context",
      "V12.1",
      context.providerRequestSandboxScore,
      context.changeTicketScore,
      boundaryPressure,
      "Review request contract readiness inside the simulated change ticket.",
    ),
    buildSourceNode(
      "PSEG_NODE_003",
      "change-ticket",
      "Response firewall change context",
      "V12.2",
      context.providerResponseFirewallScore,
      context.changeTicketScore,
      boundaryPressure,
      "Review output validation and unsafe output rejection inside the simulated change ticket.",
    ),
    buildSourceNode(
      "PSEG_NODE_004",
      "readiness-ledger",
      "Shadow evaluation ledger",
      "V12.3",
      context.providerShadowEvaluationScore,
      context.dualControlConfidenceScore,
      enablementPressure,
      "Review synthetic benchmark and rejection drill evidence.",
    ),
    buildSourceNode(
      "PSEG_NODE_005",
      "rollback-rehearsal",
      "Canary rollout rollback evidence",
      "V12.4",
      context.providerCanaryRolloutScore,
      context.dualControlConfidenceScore,
      rollbackPressure,
      "Review canary stop and rollback rehearsal.",
    ),
    buildSourceNode(
      "PSEG_NODE_006",
      "rollback-rehearsal",
      "Observability incident evidence",
      "V12.5",
      context.providerObservabilityScore,
      context.dualControlConfidenceScore,
      rollbackPressure + signoffPressure / 2,
      "Review observability and incident response drill coverage.",
    ),
    buildSourceNode(
      "PSEG_NODE_007",
      "dual-control",
      "Governance release candidate packet",
      "V12.6",
      context.providerGovernanceReleaseCandidateScore,
      context.dualControlConfidenceScore,
      signoffPressure + boundaryPressure / 2,
      "Review board package and residual risk register before safe enablement discussion.",
    ),
    buildSourceNode(
      "PSEG_NODE_008",
      "safe-enablement",
      "Safe enablement gate packet",
      "V12.7",
      context.changeTicketScore,
      context.dualControlConfidenceScore,
      enablementPressure + signoffPressure,
      "Prepare dual-control signoff packet without enabling provider runtime.",
    ),
  ];
}

function buildEnablementGates(
  context: Required<ProviderSafeEnablementGateInput>,
  sourceNodes: SafeEnablementSourceNode[],
): SafeEnablementGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PSEG_GATE_001",
      label: "Provider boundary remains disabled",
      lane: "runtime-boundary" as ProviderSafeEnablementLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["Activation firewall", "Provider non-call proof", "Runtime boundary note"],
      hardStop: "No provider invocation is allowed.",
    },
    {
      id: "PSEG_GATE_002",
      label: "Change ticket is reviewable",
      lane: "change-ticket" as ProviderSafeEnablementLane,
      score: context.changeTicketScore - context.openEnablementItemCount * 3,
      reviewer: "change reviewer",
      requiredEvidence: ["Request sandbox", "Response firewall", "Governance release candidate"],
      hardStop: "Do not use this ticket for runtime change.",
    },
    {
      id: "PSEG_GATE_003",
      label: "Dual-control signoff is complete enough",
      lane: "dual-control" as ProviderSafeEnablementLane,
      score: context.dualControlConfidenceScore - context.pendingDualControlSignoffCount * 4,
      reviewer: context.reviewerRole,
      requiredEvidence: ["Primary reviewer note", "Secondary reviewer note", "Boundary review"],
      hardStop: "Do not bypass two-person review.",
    },
    {
      id: "PSEG_GATE_004",
      label: "Boundary exceptions are resolved",
      lane: "boundary-exception" as ProviderSafeEnablementLane,
      score: 100 - context.unresolvedBoundaryExceptionCount * 12,
      reviewer: "boundary reviewer",
      requiredEvidence: ["Boundary exception register", "Operational boundary review"],
      hardStop: "Do not proceed with unresolved boundary exceptions.",
    },
    {
      id: "PSEG_GATE_005",
      label: "Rollback rehearsal is ready",
      lane: "rollback-rehearsal" as ProviderSafeEnablementLane,
      score: 100 - context.unresolvedRollbackRehearsalCount * 12,
      reviewer: "operations safety reviewer",
      requiredEvidence: ["Rollback rehearsal", "Canary stop drill", "Incident response drill"],
      hardStop: "Do not proceed without manual rollback clarity.",
    },
    {
      id: "PSEG_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "go-live-blocker" as ProviderSafeEnablementLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before dual-control-ready state.",
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

function buildDualControlApprovalBoard(
  context: Required<ProviderSafeEnablementGateInput>,
  gates: SafeEnablementGateItem[],
): DualControlApprovalItem[] {
  return [
    {
      id: "PSEG_DUAL_001",
      primaryReviewer: "safety reviewer",
      secondaryReviewer: "operations reviewer",
      priority: context.unresolvedBoundaryExceptionCount >= 4 ? "urgent" : "high",
      approvalQuestion: "Are all provider boundary exceptions closed or held?",
      requiredEvidence: ["Boundary exception register", "Runtime boundary review", "Operational boundary checklist"],
      safeOutcome: "Manual boundary review note only.",
      manualOnly: true,
    },
    {
      id: "PSEG_DUAL_002",
      primaryReviewer: "change reviewer",
      secondaryReviewer: "model risk reviewer",
      priority: context.openEnablementItemCount >= 8 ? "urgent" : "high",
      approvalQuestion: "Is the change ticket suitable for review without runtime enablement?",
      requiredEvidence: ["Change ticket draft", "Readiness ledger", "Go-live blockers"],
      safeOutcome: "Manual change review note only.",
      manualOnly: true,
    },
    {
      id: "PSEG_DUAL_003",
      primaryReviewer: context.reviewerRole,
      secondaryReviewer: "executive reviewer",
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      approvalQuestion: "Can safe enablement be discussed without activating anything?",
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Board discussion note only.",
      manualOnly: true,
    },
  ];
}

function buildChangeTicketDraft(context: Required<ProviderSafeEnablementGateInput>): ChangeTicketDraftItem[] {
  return [
    {
      id: "PSEG_TICKET_001",
      label: "Scope and boundary",
      lane: "change-ticket",
      draftReady: context.changeTicketScore >= 70,
      readinessScore: clampScore(context.changeTicketScore),
      reviewerCheck: "Confirm change scope is review-only and provider runtime stays disabled.",
      allowedTicketContent: ["Dry-run scope", "Manual reviewer list", "Boundary statement"],
      blockedTicketContent: ["Runtime enablement", "Provider call instruction", "Live routing"],
    },
    {
      id: "PSEG_TICKET_002",
      label: "Evidence and readiness ledger",
      lane: "readiness-ledger",
      draftReady: context.providerGovernanceReleaseCandidateScore >= 70,
      readinessScore: clampScore(context.providerGovernanceReleaseCandidateScore),
      reviewerCheck: "Confirm evidence references are redacted and manual.",
      allowedTicketContent: ["Readiness references", "Go/no-go summary", "Residual risk note"],
      blockedTicketContent: ["Provider payload", "Operational internal data", "Stored approval result"],
    },
    {
      id: "PSEG_TICKET_003",
      label: "Rollback rehearsal",
      lane: "rollback-rehearsal",
      draftReady: context.unresolvedRollbackRehearsalCount < 4,
      readinessScore: clampScore(100 - context.unresolvedRollbackRehearsalCount * 12),
      reviewerCheck: "Confirm manual rollback rehearsal is documented.",
      allowedTicketContent: ["Manual rollback steps", "Kill-switch review", "Hold criteria"],
      blockedTicketContent: ["Automatic rollback", "Runtime switch", "Alert creation"],
    },
  ];
}

function buildReadinessLedger(context: Required<ProviderSafeEnablementGateInput>): ReadinessLedgerItem[] {
  return [
    {
      id: "PSEG_LEDGER_001",
      label: "Provider activation firewall",
      sourceVersion: "V12.0",
      readinessScore: clampScore(context.providerActivationFirewallScore),
      evidenceSummary: "Provider boundary, non-call proof and activation gates are represented.",
      reviewerOwner: "safety reviewer",
      unresolvedReason: context.providerActivationFirewallScore < 70 ? "Boundary evidence below threshold." : "No unresolved reason in fixture.",
    },
    {
      id: "PSEG_LEDGER_002",
      label: "Request and response contracts",
      sourceVersion: "V12.1 / V12.2",
      readinessScore: clampScore((context.providerRequestSandboxScore + context.providerResponseFirewallScore) / 2),
      evidenceSummary: "Request sandbox and response firewall are linked in the review ledger.",
      reviewerOwner: "contract reviewer",
      unresolvedReason: "Contract items remain review-only.",
    },
    {
      id: "PSEG_LEDGER_003",
      label: "Shadow, canary and observability",
      sourceVersion: "V12.3 / V12.4 / V12.5",
      readinessScore: clampScore(
        (context.providerShadowEvaluationScore + context.providerCanaryRolloutScore + context.providerObservabilityScore) / 3,
      ),
      evidenceSummary: "Benchmark, canary and incident drills are summarized for board review.",
      reviewerOwner: "operations reviewer",
      unresolvedReason: "No live pilot or runtime signal is enabled.",
    },
    {
      id: "PSEG_LEDGER_004",
      label: "Governance release candidate",
      sourceVersion: "V12.6",
      readinessScore: clampScore(context.providerGovernanceReleaseCandidateScore),
      evidenceSummary: "Go/no-go, residual risk and model risk board evidence are included.",
      reviewerOwner: "model risk reviewer",
      unresolvedReason: "Release candidate remains dry-run.",
    },
  ];
}

function buildBoundaryExceptionRegister(context: Required<ProviderSafeEnablementGateInput>): BoundaryExceptionItem[] {
  const items: BoundaryExceptionItem[] = [
    {
      id: "PSEG_EXCEPTION_001",
      label: "Provider runtime boundary",
      severity: "critical",
      exceptionReason: "Provider runtime must remain disabled in this release.",
      manualDisposition: "No exception accepted.",
      blocksEnablementReview: false,
    },
    {
      id: "PSEG_EXCEPTION_002",
      label: "Storage write boundary",
      severity: "critical",
      exceptionReason: "No output write, memory update or promotion is permitted.",
      manualDisposition: "No exception accepted.",
      blocksEnablementReview: false,
    },
    {
      id: "PSEG_EXCEPTION_003",
      label: "Operational action boundary",
      severity: "critical",
      exceptionReason: "No task, intervention or execution is permitted.",
      manualDisposition: "No exception accepted.",
      blocksEnablementReview: false,
    },
  ];

  if (context.unresolvedBoundaryExceptionCount > 0) {
    items.push({
      id: "PSEG_EXCEPTION_004",
      label: "Open boundary exception review",
      severity: context.unresolvedBoundaryExceptionCount >= 4 ? "critical" : "elevated",
      exceptionReason: `${context.unresolvedBoundaryExceptionCount} boundary exception items require review.`,
      manualDisposition: "Close or explicitly hold each exception manually.",
      blocksEnablementReview: context.unresolvedBoundaryExceptionCount >= 4,
    });
  }

  return items;
}

function buildGoLiveBlockers(
  gates: SafeEnablementGateItem[],
  exceptions: BoundaryExceptionItem[],
): GoLiveBlockerItem[] {
  const blockers: GoLiveBlockerItem[] = [];

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      blockers.push({
        id: `PSEG_GATE_BLOCKER_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        blockerReason: `Gate score is ${gate.score}/100.`,
        requiredManualResolution: gate.hardStop,
      });
    });

  exceptions
    .filter((item) => item.blocksEnablementReview)
    .forEach((item, index) => {
      blockers.push({
        id: `PSEG_EXCEPTION_BLOCKER_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: "boundary-exception",
        severity: item.severity,
        blockerReason: item.exceptionReason,
        requiredManualResolution: item.manualDisposition,
      });
    });

  if (blockers.length === 0) {
    blockers.push({
      id: "PSEG_BLOCKER_001",
      label: "No go-live path exists in dry-run",
      lane: "go-live-blocker",
      severity: "info",
      blockerReason: "The module is intentionally review-only.",
      requiredManualResolution: "Keep provider runtime disabled unless a future explicit phase authorizes activation.",
    });
  }

  return blockers;
}

function buildRollbackRehearsal(context: Required<ProviderSafeEnablementGateInput>): RollbackRehearsalItem[] {
  return [
    {
      id: "PSEG_ROLLBACK_001",
      trigger: "Any provider activity appears in review.",
      priority: "urgent",
      rehearsalReady: true,
      manualRollbackAction: "Return to activation firewall and hold safe enablement review.",
      blockedAction: "Do not enable provider runtime.",
    },
    {
      id: "PSEG_ROLLBACK_002",
      trigger: "Any boundary exception remains unresolved.",
      priority: context.unresolvedBoundaryExceptionCount >= 4 ? "urgent" : "high",
      rehearsalReady: context.unresolvedBoundaryExceptionCount < 4,
      manualRollbackAction: "Return to boundary exception review.",
      blockedAction: "Do not approve change ticket.",
    },
    {
      id: "PSEG_ROLLBACK_003",
      trigger: "Any rollback rehearsal item remains unresolved.",
      priority: context.unresolvedRollbackRehearsalCount >= 4 ? "urgent" : "high",
      rehearsalReady: context.unresolvedRollbackRehearsalCount < 4,
      manualRollbackAction: "Return to rollback governance and canary stop review.",
      blockedAction: "Do not proceed to dual-control-ready state.",
    },
  ];
}

function buildRiskRegister(
  context: Required<ProviderSafeEnablementGateInput>,
  sourceNodes: SafeEnablementSourceNode[],
  gates: SafeEnablementGateItem[],
  exceptions: BoundaryExceptionItem[],
  rollback: RollbackRehearsalItem[],
): SafeEnablementRiskItem[] {
  const risks: SafeEnablementRiskItem[] = [];

  if (context.pendingDualControlSignoffCount > 0) {
    risks.push({
      id: "PSEG_RISK_001",
      label: "Pending dual-control signoff",
      lane: "dual-control",
      severity: context.pendingDualControlSignoffCount >= 5 ? "elevated" : "watch",
      reason: `${context.pendingDualControlSignoffCount} dual-control signoff items remain open.`,
      manualResolution: "Collect primary and secondary reviewer notes manually.",
      blocksDualControlReview: context.pendingDualControlSignoffCount >= 6,
    });
  }

  if (context.unresolvedBoundaryExceptionCount > 0) {
    risks.push({
      id: "PSEG_RISK_002",
      label: "Unresolved boundary exceptions",
      lane: "boundary-exception",
      severity: context.unresolvedBoundaryExceptionCount >= 4 ? "critical" : "elevated",
      reason: `${context.unresolvedBoundaryExceptionCount} boundary exception items remain open.`,
      manualResolution: "Resolve boundary exceptions manually.",
      blocksDualControlReview: context.unresolvedBoundaryExceptionCount >= 4,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `PSEG_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksDualControlReview: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `PSEG_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksDualControlReview: gate.severity === "critical" || gate.score < 60,
      });
    });

  exceptions
    .filter((item) => item.blocksEnablementReview)
    .forEach((item, index) => {
      risks.push({
        id: `PSEG_EXCEPTION_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: "boundary-exception",
        severity: item.severity,
        reason: item.exceptionReason,
        manualResolution: item.manualDisposition,
        blocksDualControlReview: true,
      });
    });

  rollback
    .filter((item) => !item.rehearsalReady)
    .forEach((item, index) => {
      risks.push({
        id: `PSEG_ROLLBACK_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.trigger,
        lane: "rollback-rehearsal",
        severity: item.priority === "urgent" ? "critical" : "elevated",
        reason: item.blockedAction,
        manualResolution: item.manualRollbackAction,
        blocksDualControlReview: true,
      });
    });

  return risks;
}

export function buildAiProviderSafeEnablementGateReport(
  input: ProviderSafeEnablementGateInput = {},
): ProviderSafeEnablementGateReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const enablementGates = buildEnablementGates(context, sourceNodes);
  const dualControlApprovalBoard = buildDualControlApprovalBoard(context, enablementGates);
  const changeTicketDraft = buildChangeTicketDraft(context);
  const readinessLedger = buildReadinessLedger(context);
  const boundaryExceptionRegister = buildBoundaryExceptionRegister(context);
  const goLiveBlockers = buildGoLiveBlockers(enablementGates, boundaryExceptionRegister);
  const rollbackRehearsal = buildRollbackRehearsal(context);
  const safeEnablementRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    enablementGates,
    boundaryExceptionRegister,
    rollbackRehearsal,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const gateAverage =
    enablementGates.reduce((sum, item) => sum + item.score, 0) / Math.max(1, enablementGates.length);

  const ledgerAverage =
    readinessLedger.reduce((sum, item) => sum + item.readinessScore, 0) / Math.max(1, readinessLedger.length);

  const riskPenalty = safeEnablementRiskRegister.filter((item) => item.blocksDualControlReview).length * 10;
  const approvalPressure =
    dualControlApprovalBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, dualControlApprovalBoard.length * 3);

  const enablementScore = clampScore(
    sourceAverage / 3 +
      gateAverage / 3 +
      ledgerAverage / 3 +
      approvalPressure -
      riskPenalty -
      context.unresolvedBoundaryExceptionCount -
      context.unresolvedRollbackRehearsalCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openEnablementItemCount * 5 +
        context.pendingDualControlSignoffCount * 6 +
        context.unresolvedBoundaryExceptionCount * 8 +
        context.unresolvedRollbackRehearsalCount * 8 +
        enablementGates.filter((item) => !item.passed).length * 9,
    ),
  );

  const enablementStatus = bandFromScore(
    enablementScore,
    safeEnablementRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_SAFE_ENABLEMENT_GATE_READINESS,
    enablementScore,
    enablementStatus,
    overallSeverity,
    sourceNodes,
    enablementGates,
    dualControlApprovalBoard,
    changeTicketDraft,
    readinessLedger,
    boundaryExceptionRegister,
    goLiveBlockers,
    rollbackRehearsal,
    safeEnablementRiskRegister,
    redactedExportBundle: {
      exportId: "provider_safe_enablement_gate_v12_7_redacted_dry_run",
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
        "enablement gates",
        "dual control approval board",
        "change ticket draft",
        "readiness ledger",
        "boundary exception register",
        "go live blockers",
        "rollback rehearsal",
        "risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider safe enablement gate is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Change ticket, dual-control approvals and go-live blockers are review concepts only.",
      "Every safe enablement conclusion remains behind human review and runtime boundary gates.",
    ],
  };
}

export const aiProviderSafeEnablementGateVersion = "V12.7";
