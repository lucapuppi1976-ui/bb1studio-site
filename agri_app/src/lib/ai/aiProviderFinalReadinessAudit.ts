export type ProviderFinalReadinessAuditMode = "dry-run" | "final-readiness-review";

export type ProviderFinalAuditSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderFinalAuditPriority = "low" | "medium" | "high" | "urgent";

export type ProviderFinalAuditBand = "blocked" | "simulation-ready" | "review-ready" | "final-review-ready";

export type ProviderFinalAuditLane =
  | "readiness-audit"
  | "activation-freeze"
  | "executive-board"
  | "non-activation-evidence"
  | "residual-hold"
  | "release-freeze"
  | "rollback-certification"
  | "runtime-boundary";

export interface ProviderFinalReadinessAuditGuardrail {
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
  finalReadinessAuditReady: true;
  activationFreezeLedgerReady: true;
  executiveAuditPackReady: true;
  providerNonCallProofReady: true;
}

export interface ProviderFinalReadinessAuditInput {
  openFinalAuditItemCount?: number;
  pendingExecutiveReviewCount?: number;
  unresolvedResidualHoldCount?: number;
  unresolvedRollbackCertificationCount?: number;
  providerActivationFirewallScore?: number;
  providerRequestSandboxScore?: number;
  providerResponseFirewallScore?: number;
  providerShadowEvaluationScore?: number;
  providerCanaryRolloutScore?: number;
  providerObservabilityScore?: number;
  providerGovernanceReleaseCandidateScore?: number;
  providerSafeEnablementGateScore?: number;
  providerRuntimeAdapterContractScore?: number;
  boardConfidenceScore?: number;
  reviewerRole?: string;
}

export interface FinalAuditSourceNode {
  id: string;
  lane: ProviderFinalAuditLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderFinalAuditSeverity;
  priority: ProviderFinalAuditPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface FinalAuditDossierItem {
  id: string;
  label: string;
  lane: ProviderFinalAuditLane;
  sourceVersion: string;
  readinessScore: number;
  included: true;
  redacted: true;
  reviewerCheck: string;
  blockedContent: string[];
}

export interface ActivationFreezeLedgerItem {
  id: string;
  label: string;
  lane: ProviderFinalAuditLane;
  freezeEnforced: true;
  severity: ProviderFinalAuditSeverity;
  freezeStatement: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface ExecutiveBoardChecklistItem {
  id: string;
  priority: ProviderFinalAuditPriority;
  reviewer: string;
  question: string;
  requiredEvidence: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface NonActivationEvidenceItem {
  id: string;
  label: string;
  lane: ProviderFinalAuditLane;
  evidenceReady: true;
  evidenceStatement: string;
  blockedRuntimeOutcome: string;
  reviewer: string;
}

export interface ReleaseFreezeGateItem {
  id: string;
  label: string;
  lane: ProviderFinalAuditLane;
  passed: boolean;
  score: number;
  severity: ProviderFinalAuditSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ResidualHoldItem {
  id: string;
  label: string;
  lane: ProviderFinalAuditLane;
  severity: ProviderFinalAuditSeverity;
  holdReason: string;
  manualDisposition: string;
  blocksFinalReview: boolean;
}

export interface RollbackCertificationItem {
  id: string;
  trigger: string;
  priority: ProviderFinalAuditPriority;
  certificationReady: boolean;
  manualRollbackAction: string;
  blockedAction: string;
}

export interface FinalReadinessRiskItem {
  id: string;
  label: string;
  lane: ProviderFinalAuditLane;
  severity: ProviderFinalAuditSeverity;
  reason: string;
  manualResolution: string;
  blocksFinalReview: boolean;
}

export interface ProviderFinalReadinessAuditReport {
  generatedAt: string;
  mode: ProviderFinalReadinessAuditMode;
  context: Required<ProviderFinalReadinessAuditInput>;
  readiness: ProviderFinalReadinessAuditGuardrail;
  finalAuditScore: number;
  finalAuditStatus: ProviderFinalAuditBand;
  overallSeverity: ProviderFinalAuditSeverity;
  sourceNodes: FinalAuditSourceNode[];
  finalAuditDossier: FinalAuditDossierItem[];
  activationFreezeLedger: ActivationFreezeLedgerItem[];
  executiveBoardChecklist: ExecutiveBoardChecklistItem[];
  nonActivationEvidence: NonActivationEvidenceItem[];
  releaseFreezeGates: ReleaseFreezeGateItem[];
  residualHoldRegister: ResidualHoldItem[];
  rollbackCertification: RollbackCertificationItem[];
  finalRiskRegister: FinalReadinessRiskItem[];
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

export const PROVIDER_FINAL_READINESS_AUDIT_READINESS: ProviderFinalReadinessAuditGuardrail = {
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
  finalReadinessAuditReady: true,
  activationFreezeLedgerReady: true,
  executiveAuditPackReady: true,
  providerNonCallProofReady: true,
};

const priorityWeight: Record<ProviderFinalAuditPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderFinalReadinessAuditInput): Required<ProviderFinalReadinessAuditInput> {
  return {
    openFinalAuditItemCount: input.openFinalAuditItemCount ?? 9,
    pendingExecutiveReviewCount: input.pendingExecutiveReviewCount ?? 6,
    unresolvedResidualHoldCount: input.unresolvedResidualHoldCount ?? 5,
    unresolvedRollbackCertificationCount: input.unresolvedRollbackCertificationCount ?? 4,
    providerActivationFirewallScore: input.providerActivationFirewallScore ?? 78,
    providerRequestSandboxScore: input.providerRequestSandboxScore ?? 76,
    providerResponseFirewallScore: input.providerResponseFirewallScore ?? 75,
    providerShadowEvaluationScore: input.providerShadowEvaluationScore ?? 74,
    providerCanaryRolloutScore: input.providerCanaryRolloutScore ?? 73,
    providerObservabilityScore: input.providerObservabilityScore ?? 72,
    providerGovernanceReleaseCandidateScore: input.providerGovernanceReleaseCandidateScore ?? 72,
    providerSafeEnablementGateScore: input.providerSafeEnablementGateScore ?? 71,
    providerRuntimeAdapterContractScore: input.providerRuntimeAdapterContractScore ?? 70,
    boardConfidenceScore: input.boardConfidenceScore ?? 74,
    reviewerRole: input.reviewerRole ?? "provider final readiness reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderFinalAuditSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderFinalAuditSeverity): ProviderFinalAuditPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderFinalAuditBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "final-review-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderFinalAuditLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): FinalAuditSourceNode {
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
        ? ["Final readiness audit is below board threshold.", "Reviewer must resolve final holds, freeze gates and rollback context."]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderFinalReadinessAuditInput>): FinalAuditSourceNode[] {
  const holdPressure = context.unresolvedResidualHoldCount * 4;
  const rollbackPressure = context.unresolvedRollbackCertificationCount * 4;
  const boardPressure = context.pendingExecutiveReviewCount * 3 + context.openFinalAuditItemCount * 2;

  return [
    buildSourceNode(
      "PFRA_NODE_001",
      "activation-freeze",
      "Activation firewall baseline",
      "V12.0",
      context.providerActivationFirewallScore,
      context.boardConfidenceScore,
      boardPressure,
      "Confirm provider activation remains frozen.",
    ),
    buildSourceNode(
      "PFRA_NODE_002",
      "readiness-audit",
      "Request sandbox baseline",
      "V12.1",
      context.providerRequestSandboxScore,
      context.boardConfidenceScore,
      holdPressure,
      "Review request blueprint and redaction contract in final dossier.",
    ),
    buildSourceNode(
      "PFRA_NODE_003",
      "readiness-audit",
      "Response firewall baseline",
      "V12.2",
      context.providerResponseFirewallScore,
      context.boardConfidenceScore,
      holdPressure,
      "Review output validation and unsafe output rejection in final dossier.",
    ),
    buildSourceNode(
      "PFRA_NODE_004",
      "readiness-audit",
      "Shadow evaluation baseline",
      "V12.3",
      context.providerShadowEvaluationScore,
      context.boardConfidenceScore,
      holdPressure + boardPressure / 2,
      "Review synthetic benchmark and rejection drill evidence.",
    ),
    buildSourceNode(
      "PFRA_NODE_005",
      "rollback-certification",
      "Canary rollout baseline",
      "V12.4",
      context.providerCanaryRolloutScore,
      context.boardConfidenceScore,
      rollbackPressure,
      "Review canary stop, pilot hold and rollback proof.",
    ),
    buildSourceNode(
      "PFRA_NODE_006",
      "rollback-certification",
      "Observability drill baseline",
      "V12.5",
      context.providerObservabilityScore,
      context.boardConfidenceScore,
      rollbackPressure + boardPressure / 2,
      "Review observability and incident response drill proof.",
    ),
    buildSourceNode(
      "PFRA_NODE_007",
      "executive-board",
      "Governance release candidate baseline",
      "V12.6",
      context.providerGovernanceReleaseCandidateScore,
      context.boardConfidenceScore,
      boardPressure + holdPressure / 2,
      "Review model risk board, go/no-go matrix and residual risk state.",
    ),
    buildSourceNode(
      "PFRA_NODE_008",
      "release-freeze",
      "Safe enablement and adapter baseline",
      "V12.7 / V12.8",
      (context.providerSafeEnablementGateScore + context.providerRuntimeAdapterContractScore) / 2,
      context.boardConfidenceScore,
      boardPressure + rollbackPressure,
      "Review dual-control, zero-call adapter and go-live blockers before final phase closure.",
    ),
  ];
}

function buildFinalAuditDossier(context: Required<ProviderFinalReadinessAuditInput>): FinalAuditDossierItem[] {
  return [
    {
      id: "PFRA_DOSSIER_001",
      label: "Provider boundary and freeze record",
      lane: "activation-freeze",
      sourceVersion: "V12.0",
      readinessScore: clampScore(context.providerActivationFirewallScore),
      included: true,
      redacted: true,
      reviewerCheck: "Confirm provider boundary and freeze statements remain visible.",
      blockedContent: ["Provider runtime enablement", "Live routing", "Runtime switch"],
    },
    {
      id: "PFRA_DOSSIER_002",
      label: "Request and response contract record",
      lane: "readiness-audit",
      sourceVersion: "V12.1 / V12.2",
      readinessScore: clampScore((context.providerRequestSandboxScore + context.providerResponseFirewallScore) / 2),
      included: true,
      redacted: true,
      reviewerCheck: "Confirm request and response contracts remain review-only.",
      blockedContent: ["Provider payload", "Accepted provider output", "Operational instruction"],
    },
    {
      id: "PFRA_DOSSIER_003",
      label: "Benchmark and canary record",
      lane: "readiness-audit",
      sourceVersion: "V12.3 / V12.4",
      readinessScore: clampScore((context.providerShadowEvaluationScore + context.providerCanaryRolloutScore) / 2),
      included: true,
      redacted: true,
      reviewerCheck: "Confirm shadow and canary evidence remain synthetic.",
      blockedContent: ["Live user cohort", "Pilot activation", "Operational result"],
    },
    {
      id: "PFRA_DOSSIER_004",
      label: "Observability and governance record",
      lane: "executive-board",
      sourceVersion: "V12.5 / V12.6",
      readinessScore: clampScore((context.providerObservabilityScore + context.providerGovernanceReleaseCandidateScore) / 2),
      included: true,
      redacted: true,
      reviewerCheck: "Confirm incident and model risk evidence remain manual.",
      blockedContent: ["Automatic alerting", "Runtime escalation", "Formal approval"],
    },
    {
      id: "PFRA_DOSSIER_005",
      label: "Safe enablement and adapter record",
      lane: "release-freeze",
      sourceVersion: "V12.7 / V12.8",
      readinessScore: clampScore((context.providerSafeEnablementGateScore + context.providerRuntimeAdapterContractScore) / 2),
      included: true,
      redacted: true,
      reviewerCheck: "Confirm safe enablement gate and runtime adapter remain frozen.",
      blockedContent: ["Runtime adapter activation", "Provider call path", "Data write path"],
    },
  ];
}

function buildActivationFreezeLedger(): ActivationFreezeLedgerItem[] {
  return [
    {
      id: "PFRA_FREEZE_001",
      label: "Provider runtime frozen",
      lane: "activation-freeze",
      freezeEnforced: true,
      severity: "critical",
      freezeStatement: "Provider runtime remains unavailable in this final audit phase.",
      blockedOutcome: "No external model invocation.",
      reviewer: "safety reviewer",
    },
    {
      id: "PFRA_FREEZE_002",
      label: "Storage and memory writes frozen",
      lane: "runtime-boundary",
      freezeEnforced: true,
      severity: "critical",
      freezeStatement: "No output can be written, promoted or persisted.",
      blockedOutcome: "No storage write, memory write or promotion.",
      reviewer: "operations reviewer",
    },
    {
      id: "PFRA_FREEZE_003",
      label: "Operational execution frozen",
      lane: "runtime-boundary",
      freezeEnforced: true,
      severity: "critical",
      freezeStatement: "No work, dispatch or intervention can be created.",
      blockedOutcome: "No task, intervention or execution.",
      reviewer: "agronomic reviewer",
    },
    {
      id: "PFRA_FREEZE_004",
      label: "Prescriptive output frozen",
      lane: "runtime-boundary",
      freezeEnforced: true,
      severity: "critical",
      freezeStatement: "No product, dosage or production output can be produced.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildExecutiveBoardChecklist(
  context: Required<ProviderFinalReadinessAuditInput>,
  sourceNodes: FinalAuditSourceNode[],
): ExecutiveBoardChecklistItem[] {
  return [
    {
      id: "PFRA_BOARD_001",
      priority: context.unresolvedResidualHoldCount >= 5 ? "urgent" : "high",
      reviewer: "model risk board",
      question: "Which residual holds prevent final phase closure?",
      requiredEvidence: ["Residual hold register", "Final audit dossier", "Release freeze gates"],
      safeOutcome: "Manual model risk board note only.",
      manualOnly: true,
    },
    {
      id: "PFRA_BOARD_002",
      priority: context.unresolvedRollbackCertificationCount >= 4 ? "urgent" : "high",
      reviewer: "operations board",
      question: "Which rollback certifications remain incomplete?",
      requiredEvidence: ["Rollback certification", "Canary rollout", "Observability drill"],
      safeOutcome: "Manual rollback board note only.",
      manualOnly: true,
    },
    {
      id: "PFRA_BOARD_003",
      priority: sourceNodes.some((node) => node.blockers.length > 0) ? "urgent" : "medium",
      reviewer: context.reviewerRole,
      question: "Can the V12 provider readiness phase be closed without enabling runtime?",
      requiredEvidence: sourceNodes.map((node) => node.title),
      safeOutcome: "Executive board discussion note only.",
      manualOnly: true,
    },
  ];
}

function buildNonActivationEvidence(): NonActivationEvidenceItem[] {
  return [
    {
      id: "PFRA_EVIDENCE_001",
      label: "No provider call evidence",
      lane: "non-activation-evidence",
      evidenceReady: true,
      evidenceStatement: "All V12.x artifacts are local review objects.",
      blockedRuntimeOutcome: "No model call.",
      reviewer: "safety reviewer",
    },
    {
      id: "PFRA_EVIDENCE_002",
      label: "No persistence evidence",
      lane: "non-activation-evidence",
      evidenceReady: true,
      evidenceStatement: "All outputs remain transient dry-run values.",
      blockedRuntimeOutcome: "No storage or memory write.",
      reviewer: "operations reviewer",
    },
    {
      id: "PFRA_EVIDENCE_003",
      label: "No operational action evidence",
      lane: "non-activation-evidence",
      evidenceReady: true,
      evidenceStatement: "All work, intervention and execution pathways remain blocked.",
      blockedRuntimeOutcome: "No task, intervention or execution.",
      reviewer: "agronomic reviewer",
    },
    {
      id: "PFRA_EVIDENCE_004",
      label: "No prescriptive output evidence",
      lane: "non-activation-evidence",
      evidenceReady: true,
      evidenceStatement: "Product, dosage and production outcomes remain blocked.",
      blockedRuntimeOutcome: "No product, dosage or forecast output.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildReleaseFreezeGates(
  context: Required<ProviderFinalReadinessAuditInput>,
  sourceNodes: FinalAuditSourceNode[],
): ReleaseFreezeGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PFRA_GATE_001",
      label: "Activation freeze is complete",
      lane: "activation-freeze" as ProviderFinalAuditLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["Activation freeze ledger", "Non-activation evidence"],
      hardStop: "No provider runtime can be enabled in this phase.",
    },
    {
      id: "PFRA_GATE_002",
      label: "Final audit dossier is complete enough",
      lane: "readiness-audit" as ProviderFinalAuditLane,
      score: (context.providerActivationFirewallScore +
        context.providerRequestSandboxScore +
        context.providerResponseFirewallScore +
        context.providerShadowEvaluationScore +
        context.providerCanaryRolloutScore +
        context.providerObservabilityScore +
        context.providerGovernanceReleaseCandidateScore +
        context.providerSafeEnablementGateScore +
        context.providerRuntimeAdapterContractScore) / 9 - context.openFinalAuditItemCount * 2,
      reviewer: "final audit reviewer",
      requiredEvidence: ["V12.0 through V12.8 records", "Final audit dossier"],
      hardStop: "Resolve final audit items before final-review-ready state.",
    },
    {
      id: "PFRA_GATE_003",
      label: "Residual holds are controlled",
      lane: "residual-hold" as ProviderFinalAuditLane,
      score: 100 - context.unresolvedResidualHoldCount * 12,
      reviewer: "model risk board",
      requiredEvidence: ["Residual hold register", "Executive board checklist"],
      hardStop: "Do not close readiness phase with unresolved residual holds.",
    },
    {
      id: "PFRA_GATE_004",
      label: "Rollback certification is controlled",
      lane: "rollback-certification" as ProviderFinalAuditLane,
      score: 100 - context.unresolvedRollbackCertificationCount * 12,
      reviewer: "operations board",
      requiredEvidence: ["Rollback certification", "Incident drills", "Canary stop proof"],
      hardStop: "Do not close readiness phase without manual rollback certification.",
    },
    {
      id: "PFRA_GATE_005",
      label: "Executive review has enough confidence",
      lane: "executive-board" as ProviderFinalAuditLane,
      score: context.boardConfidenceScore - context.pendingExecutiveReviewCount * 4,
      reviewer: context.reviewerRole,
      requiredEvidence: ["Executive checklist", "Release freeze gates", "Risk register"],
      hardStop: "Do not bypass executive review.",
    },
    {
      id: "PFRA_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "release-freeze" as ProviderFinalAuditLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before final-review-ready state.",
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

function buildResidualHoldRegister(context: Required<ProviderFinalReadinessAuditInput>): ResidualHoldItem[] {
  const holds: ResidualHoldItem[] = [
    {
      id: "PFRA_HOLD_001",
      label: "Provider activation hold",
      lane: "activation-freeze",
      severity: "critical",
      holdReason: "Provider runtime is intentionally held.",
      manualDisposition: "Keep held until an explicit future activation phase is approved.",
      blocksFinalReview: false,
    },
    {
      id: "PFRA_HOLD_002",
      label: "Operational output hold",
      lane: "runtime-boundary",
      severity: "critical",
      holdReason: "Operational and prescriptive outputs are intentionally held.",
      manualDisposition: "Keep held for all dry-run phases.",
      blocksFinalReview: false,
    },
  ];

  if (context.unresolvedResidualHoldCount > 0) {
    holds.push({
      id: "PFRA_HOLD_003",
      label: "Open residual holds",
      lane: "residual-hold",
      severity: context.unresolvedResidualHoldCount >= 5 ? "critical" : "elevated",
      holdReason: `${context.unresolvedResidualHoldCount} residual hold items require manual board review.`,
      manualDisposition: "Resolve, accept or keep held manually in board notes.",
      blocksFinalReview: context.unresolvedResidualHoldCount >= 5,
    });
  }

  return holds;
}

function buildRollbackCertification(context: Required<ProviderFinalReadinessAuditInput>): RollbackCertificationItem[] {
  return [
    {
      id: "PFRA_ROLLBACK_001",
      trigger: "Any runtime path appears in review.",
      priority: "urgent",
      certificationReady: true,
      manualRollbackAction: "Return to activation firewall and runtime adapter contract review.",
      blockedAction: "Do not enable provider runtime.",
    },
    {
      id: "PFRA_ROLLBACK_002",
      trigger: "Any final audit item remains unresolved.",
      priority: context.openFinalAuditItemCount >= 9 ? "urgent" : "high",
      certificationReady: context.openFinalAuditItemCount < 10,
      manualRollbackAction: "Return to the relevant V12.x readiness module.",
      blockedAction: "Do not close final audit.",
    },
    {
      id: "PFRA_ROLLBACK_003",
      trigger: "Any rollback certification item remains unresolved.",
      priority: context.unresolvedRollbackCertificationCount >= 4 ? "urgent" : "high",
      certificationReady: context.unresolvedRollbackCertificationCount < 4,
      manualRollbackAction: "Return to canary, observability and adapter rollback review.",
      blockedAction: "Do not proceed to final-review-ready state.",
    },
  ];
}

function buildFinalRiskRegister(
  context: Required<ProviderFinalReadinessAuditInput>,
  sourceNodes: FinalAuditSourceNode[],
  gates: ReleaseFreezeGateItem[],
  holds: ResidualHoldItem[],
  rollback: RollbackCertificationItem[],
): FinalReadinessRiskItem[] {
  const risks: FinalReadinessRiskItem[] = [];

  if (context.pendingExecutiveReviewCount > 0) {
    risks.push({
      id: "PFRA_RISK_001",
      label: "Pending executive review",
      lane: "executive-board",
      severity: context.pendingExecutiveReviewCount >= 6 ? "elevated" : "watch",
      reason: `${context.pendingExecutiveReviewCount} executive review items remain open.`,
      manualResolution: "Close executive checklist items manually.",
      blocksFinalReview: context.pendingExecutiveReviewCount >= 7,
    });
  }

  if (context.unresolvedResidualHoldCount > 0) {
    risks.push({
      id: "PFRA_RISK_002",
      label: "Unresolved residual holds",
      lane: "residual-hold",
      severity: context.unresolvedResidualHoldCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedResidualHoldCount} residual holds remain open.`,
      manualResolution: "Resolve residual holds in board review.",
      blocksFinalReview: context.unresolvedResidualHoldCount >= 5,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `PFRA_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksFinalReview: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `PFRA_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksFinalReview: gate.severity === "critical" || gate.score < 60,
      });
    });

  holds
    .filter((item) => item.blocksFinalReview)
    .forEach((item, index) => {
      risks.push({
        id: `PFRA_HOLD_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.holdReason,
        manualResolution: item.manualDisposition,
        blocksFinalReview: true,
      });
    });

  rollback
    .filter((item) => !item.certificationReady)
    .forEach((item, index) => {
      risks.push({
        id: `PFRA_ROLLBACK_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.trigger,
        lane: "rollback-certification",
        severity: item.priority === "urgent" ? "critical" : "elevated",
        reason: item.blockedAction,
        manualResolution: item.manualRollbackAction,
        blocksFinalReview: true,
      });
    });

  return risks;
}

export function buildAiProviderFinalReadinessAuditReport(
  input: ProviderFinalReadinessAuditInput = {},
): ProviderFinalReadinessAuditReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const finalAuditDossier = buildFinalAuditDossier(context);
  const activationFreezeLedger = buildActivationFreezeLedger();
  const executiveBoardChecklist = buildExecutiveBoardChecklist(context, sourceNodes);
  const nonActivationEvidence = buildNonActivationEvidence();
  const releaseFreezeGates = buildReleaseFreezeGates(context, sourceNodes);
  const residualHoldRegister = buildResidualHoldRegister(context);
  const rollbackCertification = buildRollbackCertification(context);
  const finalRiskRegister = buildFinalRiskRegister(
    context,
    sourceNodes,
    releaseFreezeGates,
    residualHoldRegister,
    rollbackCertification,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const dossierAverage =
    finalAuditDossier.reduce((sum, item) => sum + item.readinessScore, 0) /
    Math.max(1, finalAuditDossier.length);

  const gateAverage =
    releaseFreezeGates.reduce((sum, gate) => sum + gate.score, 0) / Math.max(1, releaseFreezeGates.length);

  const riskPenalty = finalRiskRegister.filter((item) => item.blocksFinalReview).length * 10;
  const boardPressure =
    executiveBoardChecklist.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, executiveBoardChecklist.length * 3);

  const finalAuditScore = clampScore(
    sourceAverage / 3 +
      dossierAverage / 3 +
      gateAverage / 3 +
      boardPressure -
      riskPenalty -
      context.unresolvedResidualHoldCount -
      context.unresolvedRollbackCertificationCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openFinalAuditItemCount * 5 +
        context.pendingExecutiveReviewCount * 6 +
        context.unresolvedResidualHoldCount * 8 +
        context.unresolvedRollbackCertificationCount * 8 +
        releaseFreezeGates.filter((gate) => !gate.passed).length * 9,
    ),
  );

  const finalAuditStatus = bandFromScore(
    finalAuditScore,
    finalRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_FINAL_READINESS_AUDIT_READINESS,
    finalAuditScore,
    finalAuditStatus,
    overallSeverity,
    sourceNodes,
    finalAuditDossier,
    activationFreezeLedger,
    executiveBoardChecklist,
    nonActivationEvidence,
    releaseFreezeGates,
    residualHoldRegister,
    rollbackCertification,
    finalRiskRegister,
    redactedExportBundle: {
      exportId: "provider_final_readiness_audit_v12_9_redacted_dry_run",
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
        "final audit dossier",
        "activation freeze ledger",
        "executive board checklist",
        "non activation evidence",
        "release freeze gates",
        "residual hold register",
        "rollback certification",
        "final risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider final readiness audit is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Final audit dossier, executive checklist and freeze gates are review concepts only.",
      "Every final readiness conclusion remains behind human review and activation freeze gates.",
    ],
  };
}

export const aiProviderFinalReadinessAuditVersion = "V12.9";
