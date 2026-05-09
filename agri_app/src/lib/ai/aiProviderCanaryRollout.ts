export type ProviderCanaryRolloutMode = "dry-run" | "pilot-readiness-review";

export type ProviderCanarySeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderCanaryPriority = "low" | "medium" | "high" | "urgent";

export type ProviderCanaryReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "pilot-review-ready";

export type ProviderCanaryLane =
  | "pilot-board"
  | "canary-stage"
  | "acceptance-criteria"
  | "kill-switch"
  | "rollback-governance"
  | "shadow-benchmark"
  | "request-response-contract"
  | "runtime-boundary";

export interface ProviderCanaryRolloutGuardrail {
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
  providerPilotReadinessReady: true;
  canaryRolloutSimulatorReady: true;
  killSwitchRehearsalReady: true;
  providerNonCallProofReady: true;
}

export interface ProviderCanaryRolloutInput {
  syntheticCaseCount?: number;
  pendingPilotReviewCount?: number;
  unresolvedAcceptanceItemCount?: number;
  unresolvedRollbackItemCount?: number;
  providerActivationFirewallScore?: number;
  providerRequestSandboxScore?: number;
  providerResponseFirewallScore?: number;
  providerShadowEvaluationScore?: number;
  decisionAssuranceScore?: number;
  compliancePassportScore?: number;
  canaryStageScore?: number;
  killSwitchScore?: number;
  reviewerConfidenceScore?: number;
  reviewerRole?: string;
}

export interface ProviderCanarySourceNode {
  id: string;
  lane: ProviderCanaryLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderCanarySeverity;
  priority: ProviderCanaryPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface CanaryStageCard {
  id: string;
  label: string;
  stageOrder: number;
  lane: ProviderCanaryLane;
  readinessBand: ProviderCanaryReadinessBand;
  simulatedCohort: string;
  allowedOutcome: string;
  blockedOutcome: string;
  reviewerQuestion: string;
}

export interface AcceptanceCriterion {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  passed: boolean;
  score: number;
  severity: ProviderCanarySeverity;
  reviewer: string;
  evidenceNeeded: string[];
  hardStop: string;
}

export interface KillSwitchDrill {
  id: string;
  label: string;
  severity: ProviderCanarySeverity;
  trigger: string;
  expectedManualAction: string;
  blockedAction: string;
  drillReady: boolean;
}

export interface PilotApprovalItem {
  id: string;
  priority: ProviderCanaryPriority;
  reviewer: string;
  question: string;
  evidenceNeeded: string[];
  safeOutcome: string;
  manualOnly: true;
}

export interface RollbackGovernanceItem {
  id: string;
  trigger: string;
  priority: ProviderCanaryPriority;
  manualRollbackAction: string;
  blockedAction: string;
}

export interface CanaryRiskRegisterItem {
  id: string;
  label: string;
  lane: ProviderCanaryLane;
  severity: ProviderCanarySeverity;
  reason: string;
  manualResolution: string;
  blocksPilotReview: boolean;
}

export interface ProviderCanaryRolloutReport {
  generatedAt: string;
  mode: ProviderCanaryRolloutMode;
  context: Required<ProviderCanaryRolloutInput>;
  readiness: ProviderCanaryRolloutGuardrail;
  canaryScore: number;
  canaryStatus: ProviderCanaryReadinessBand;
  overallSeverity: ProviderCanarySeverity;
  sourceNodes: ProviderCanarySourceNode[];
  canaryStages: CanaryStageCard[];
  acceptanceCriteria: AcceptanceCriterion[];
  killSwitchDrills: KillSwitchDrill[];
  pilotApprovalBoard: PilotApprovalItem[];
  rollbackGovernance: RollbackGovernanceItem[];
  canaryRiskRegister: CanaryRiskRegisterItem[];
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

export const PROVIDER_CANARY_ROLLOUT_READINESS: ProviderCanaryRolloutGuardrail = {
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
  providerPilotReadinessReady: true,
  canaryRolloutSimulatorReady: true,
  killSwitchRehearsalReady: true,
  providerNonCallProofReady: true,
};

const priorityWeight: Record<ProviderCanaryPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderCanaryRolloutInput): Required<ProviderCanaryRolloutInput> {
  return {
    syntheticCaseCount: input.syntheticCaseCount ?? 12,
    pendingPilotReviewCount: input.pendingPilotReviewCount ?? 6,
    unresolvedAcceptanceItemCount: input.unresolvedAcceptanceItemCount ?? 5,
    unresolvedRollbackItemCount: input.unresolvedRollbackItemCount ?? 4,
    providerActivationFirewallScore: input.providerActivationFirewallScore ?? 77,
    providerRequestSandboxScore: input.providerRequestSandboxScore ?? 75,
    providerResponseFirewallScore: input.providerResponseFirewallScore ?? 74,
    providerShadowEvaluationScore: input.providerShadowEvaluationScore ?? 72,
    decisionAssuranceScore: input.decisionAssuranceScore ?? 71,
    compliancePassportScore: input.compliancePassportScore ?? 72,
    canaryStageScore: input.canaryStageScore ?? 70,
    killSwitchScore: input.killSwitchScore ?? 78,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    reviewerRole: input.reviewerRole ?? "provider pilot readiness reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderCanarySeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderCanarySeverity): ProviderCanaryPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderCanaryReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "pilot-review-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderCanaryLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderCanarySourceNode {
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
        ? ["Pilot readiness below human review threshold.", "Reviewer must resolve rollout, acceptance and rollback context."]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderCanaryRolloutInput>): ProviderCanarySourceNode[] {
  const acceptancePressure = context.unresolvedAcceptanceItemCount * 4;
  const rollbackPressure = context.unresolvedRollbackItemCount * 4;
  const reviewPressure = context.pendingPilotReviewCount * 3;

  return [
    buildSourceNode(
      "PCR_NODE_001",
      "runtime-boundary",
      "Activation firewall baseline",
      "V12.0",
      context.providerActivationFirewallScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Confirm provider remains off and pilot readiness is review-only.",
    ),
    buildSourceNode(
      "PCR_NODE_002",
      "request-response-contract",
      "Request sandbox baseline",
      "V12.1",
      context.providerRequestSandboxScore,
      context.providerRequestSandboxScore,
      acceptancePressure,
      "Review request contract readiness before any pilot discussion.",
    ),
    buildSourceNode(
      "PCR_NODE_003",
      "request-response-contract",
      "Response firewall baseline",
      "V12.2",
      context.providerResponseFirewallScore,
      context.providerResponseFirewallScore,
      acceptancePressure,
      "Review output validation and unsafe output rejection coverage.",
    ),
    buildSourceNode(
      "PCR_NODE_004",
      "shadow-benchmark",
      "Shadow evaluation baseline",
      "V12.3",
      context.providerShadowEvaluationScore,
      context.providerShadowEvaluationScore,
      acceptancePressure + rollbackPressure / 2,
      "Review synthetic benchmark results without enabling runtime.",
    ),
    buildSourceNode(
      "PCR_NODE_005",
      "canary-stage",
      "Canary stage simulator",
      "V12.4",
      context.canaryStageScore,
      context.reviewerConfidenceScore,
      reviewPressure,
      "Simulate rollout stage readiness only.",
    ),
    buildSourceNode(
      "PCR_NODE_006",
      "kill-switch",
      "Kill-switch rehearsal",
      "V12.4",
      context.killSwitchScore,
      context.killSwitchScore,
      rollbackPressure,
      "Confirm manual stop and rollback rehearsal is clear.",
    ),
    buildSourceNode(
      "PCR_NODE_007",
      "pilot-board",
      "Pilot approval board",
      "V12.4",
      context.reviewerConfidenceScore,
      context.compliancePassportScore,
      reviewPressure,
      "Confirm every pilot decision remains behind human review.",
    ),
    buildSourceNode(
      "PCR_NODE_008",
      "rollback-governance",
      "Rollback governance",
      "V12.4",
      context.killSwitchScore,
      context.decisionAssuranceScore,
      rollbackPressure,
      "Prepare manual rollback governance for any pilot concern.",
    ),
  ];
}

function buildCanaryStages(context: Required<ProviderCanaryRolloutInput>): CanaryStageCard[] {
  return [
    {
      id: "PCR_STAGE_001",
      label: "Stage zero local review",
      stageOrder: 0,
      lane: "runtime-boundary",
      readinessBand: "review-ready",
      simulatedCohort: "No live users, local fixture review only.",
      allowedOutcome: "Manual readiness note.",
      blockedOutcome: "Provider runtime activation.",
      reviewerQuestion: "Can reviewers confirm this remains local dry-run?",
    },
    {
      id: "PCR_STAGE_002",
      label: "Synthetic fixture canary",
      stageOrder: 1,
      lane: "shadow-benchmark",
      readinessBand: bandFromScore(context.providerShadowEvaluationScore, context.unresolvedAcceptanceItemCount >= 5 ? 1 : 0),
      simulatedCohort: "Synthetic benchmark cases only.",
      allowedOutcome: "Benchmark review note.",
      blockedOutcome: "Live provider call or live case routing.",
      reviewerQuestion: "Do synthetic cases cover safe and rejected outcomes?",
    },
    {
      id: "PCR_STAGE_003",
      label: "Contract rehearsal canary",
      stageOrder: 2,
      lane: "request-response-contract",
      readinessBand: bandFromScore((context.providerRequestSandboxScore + context.providerResponseFirewallScore) / 2, 0),
      simulatedCohort: "Request and response contract rehearsal only.",
      allowedOutcome: "Contract review packet.",
      blockedOutcome: "Provider-bound request or accepted response.",
      reviewerQuestion: "Do request and response contracts remain non-operational?",
    },
    {
      id: "PCR_STAGE_004",
      label: "Pilot board rehearsal",
      stageOrder: 3,
      lane: "pilot-board",
      readinessBand: bandFromScore(context.reviewerConfidenceScore, context.pendingPilotReviewCount >= 6 ? 1 : 0),
      simulatedCohort: "Reviewer board rehearsal only.",
      allowedOutcome: "Board agenda item.",
      blockedOutcome: "Pilot activation.",
      reviewerQuestion: "Can the board discuss readiness without enabling runtime?",
    },
  ];
}

function buildAcceptanceCriteria(
  context: Required<ProviderCanaryRolloutInput>,
  sourceNodes: ProviderCanarySourceNode[],
): AcceptanceCriterion[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PCR_CRITERION_001",
      label: "Provider non-call proof remains visible",
      lane: "runtime-boundary" as ProviderCanaryLane,
      score: 100,
      reviewer: "safety reviewer",
      evidenceNeeded: ["Guardrail flags", "Runtime boundary node", "Dry-run report"],
      hardStop: "No provider invocation is allowed.",
    },
    {
      id: "PCR_CRITERION_002",
      label: "Request and response contracts meet review threshold",
      lane: "request-response-contract" as ProviderCanaryLane,
      score: (context.providerRequestSandboxScore + context.providerResponseFirewallScore) / 2 - context.unresolvedAcceptanceItemCount * 3,
      reviewer: "contract reviewer",
      evidenceNeeded: ["Request sandbox", "Response firewall", "Output rejection rules"],
      hardStop: "Do not simulate pilot readiness with unresolved contract issues.",
    },
    {
      id: "PCR_CRITERION_003",
      label: "Shadow benchmark is reviewable",
      lane: "shadow-benchmark" as ProviderCanaryLane,
      score: context.providerShadowEvaluationScore - context.unresolvedAcceptanceItemCount * 3,
      reviewer: "benchmark reviewer",
      evidenceNeeded: ["Synthetic cases", "Rejection drills", "Shadow metrics"],
      hardStop: "Do not advance with incomplete benchmark coverage.",
    },
    {
      id: "PCR_CRITERION_004",
      label: "Kill-switch rehearsal is ready",
      lane: "kill-switch" as ProviderCanaryLane,
      score: context.killSwitchScore - context.unresolvedRollbackItemCount * 3,
      reviewer: "operations safety reviewer",
      evidenceNeeded: ["Kill-switch drills", "Rollback governance", "Manual stop procedure"],
      hardStop: "Do not discuss pilot without manual rollback clarity.",
    },
    {
      id: "PCR_CRITERION_005",
      label: "Manual board has sufficient confidence",
      lane: "pilot-board" as ProviderCanaryLane,
      score: context.reviewerConfidenceScore - context.pendingPilotReviewCount * 4,
      reviewer: context.reviewerRole,
      evidenceNeeded: ["Pilot approval board", "Acceptance criteria", "Risk register"],
      hardStop: "Do not bypass human pilot review.",
    },
    {
      id: "PCR_CRITERION_006",
      label: "Source blockers remain within tolerance",
      lane: "acceptance-criteria" as ProviderCanaryLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      evidenceNeeded: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before pilot-review-ready state.",
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

function buildKillSwitchDrills(context: Required<ProviderCanaryRolloutInput>): KillSwitchDrill[] {
  return [
    {
      id: "PCR_KILL_001",
      label: "Provider boundary stop drill",
      severity: "critical",
      trigger: "Any attempt to call provider during dry-run.",
      expectedManualAction: "Hold rollout discussion and return to activation firewall review.",
      blockedAction: "Do not execute runtime request.",
      drillReady: true,
    },
    {
      id: "PCR_KILL_002",
      label: "Unsafe output stop drill",
      severity: "critical",
      trigger: "Any operational, prescriptive or forecast output appears in review.",
      expectedManualAction: "Reject output and return to response firewall review.",
      blockedAction: "Do not display as actionable guidance.",
      drillReady: context.providerResponseFirewallScore >= 70,
    },
    {
      id: "PCR_KILL_003",
      label: "Contract ambiguity stop drill",
      severity: "elevated",
      trigger: "Request or response contract interpretation is unclear.",
      expectedManualAction: "Return to request sandbox and response firewall review.",
      blockedAction: "Do not advance rollout stage.",
      drillReady: context.providerRequestSandboxScore >= 70,
    },
    {
      id: "PCR_KILL_004",
      label: "Reviewer dissent stop drill",
      severity: "elevated",
      trigger: "Any reviewer rejects pilot readiness.",
      expectedManualAction: "Hold pilot board and document manual concern.",
      blockedAction: "Do not override reviewer dissent.",
      drillReady: context.reviewerConfidenceScore >= 70,
    },
  ];
}

function buildPilotApprovalBoard(
  context: Required<ProviderCanaryRolloutInput>,
  criteria: AcceptanceCriterion[],
): PilotApprovalItem[] {
  return [
    {
      id: "PCR_APPROVAL_001",
      priority: context.unresolvedAcceptanceItemCount >= 5 ? "urgent" : "high",
      reviewer: "contract reviewer",
      question: "Which acceptance items block pilot readiness discussion?",
      evidenceNeeded: ["Acceptance criteria", "Request sandbox", "Response firewall"],
      safeOutcome: "Manual acceptance review only.",
      manualOnly: true,
    },
    {
      id: "PCR_APPROVAL_002",
      priority: context.unresolvedRollbackItemCount >= 4 ? "urgent" : "high",
      reviewer: "operations safety reviewer",
      question: "Which rollback items block pilot board rehearsal?",
      evidenceNeeded: ["Kill-switch drills", "Rollback governance", "Risk register"],
      safeOutcome: "Manual rollback review only.",
      manualOnly: true,
    },
    {
      id: "PCR_APPROVAL_003",
      priority: criteria.some((item) => !item.passed) ? "urgent" : "medium",
      reviewer: context.reviewerRole,
      question: "Can pilot readiness be discussed without enabling any provider runtime?",
      evidenceNeeded: criteria.map((item) => item.label),
      safeOutcome: "Board discussion note only.",
      manualOnly: true,
    },
  ];
}

function buildRollbackGovernance(criteria: AcceptanceCriterion[]): RollbackGovernanceItem[] {
  const failedCriteria = criteria.filter((item) => !item.passed);

  return [
    {
      id: "PCR_ROLLBACK_001",
      trigger: "Any failed acceptance criterion.",
      priority: failedCriteria.length > 0 ? "urgent" : "high",
      manualRollbackAction: "Return to contract, benchmark and firewall review.",
      blockedAction: "Do not advance canary stage.",
    },
    {
      id: "PCR_ROLLBACK_002",
      trigger: "Any kill-switch ambiguity.",
      priority: "urgent",
      manualRollbackAction: "Return to kill-switch rehearsal.",
      blockedAction: "Do not discuss pilot readiness.",
    },
    {
      id: "PCR_ROLLBACK_003",
      trigger: "Any board dissent.",
      priority: "high",
      manualRollbackAction: "Hold pilot review and document dissent manually.",
      blockedAction: "Do not bypass approval board.",
    },
  ];
}

function buildRiskRegister(
  context: Required<ProviderCanaryRolloutInput>,
  sourceNodes: ProviderCanarySourceNode[],
  criteria: AcceptanceCriterion[],
  drills: KillSwitchDrill[],
): CanaryRiskRegisterItem[] {
  const risks: CanaryRiskRegisterItem[] = [];

  if (context.unresolvedAcceptanceItemCount > 0) {
    risks.push({
      id: "PCR_RISK_001",
      label: "Unresolved acceptance items",
      lane: "acceptance-criteria",
      severity: context.unresolvedAcceptanceItemCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedAcceptanceItemCount} acceptance items remain open.`,
      manualResolution: "Resolve acceptance criteria through human review.",
      blocksPilotReview: context.unresolvedAcceptanceItemCount >= 5,
    });
  }

  if (context.unresolvedRollbackItemCount > 0) {
    risks.push({
      id: "PCR_RISK_002",
      label: "Unresolved rollback items",
      lane: "rollback-governance",
      severity: context.unresolvedRollbackItemCount >= 4 ? "critical" : "elevated",
      reason: `${context.unresolvedRollbackItemCount} rollback items remain open.`,
      manualResolution: "Resolve rollback and kill-switch rehearsal topics manually.",
      blocksPilotReview: context.unresolvedRollbackItemCount >= 4,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `PCR_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksPilotReview: node.severity === "critical",
      });
    });

  criteria
    .filter((item) => !item.passed)
    .forEach((item, index) => {
      risks.push({
        id: `PCR_CRITERION_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Acceptance score is ${item.score}/100.`,
        manualResolution: item.hardStop,
        blocksPilotReview: item.severity === "critical" || item.score < 60,
      });
    });

  drills
    .filter((item) => !item.drillReady)
    .forEach((item, index) => {
      risks.push({
        id: `PCR_KILL_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: "kill-switch",
        severity: item.severity,
        reason: item.trigger,
        manualResolution: item.expectedManualAction,
        blocksPilotReview: true,
      });
    });

  return risks;
}

export function buildAiProviderCanaryRolloutReport(
  input: ProviderCanaryRolloutInput = {},
): ProviderCanaryRolloutReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const canaryStages = buildCanaryStages(context);
  const acceptanceCriteria = buildAcceptanceCriteria(context, sourceNodes);
  const killSwitchDrills = buildKillSwitchDrills(context);
  const pilotApprovalBoard = buildPilotApprovalBoard(context, acceptanceCriteria);
  const rollbackGovernance = buildRollbackGovernance(acceptanceCriteria);
  const canaryRiskRegister = buildRiskRegister(context, sourceNodes, acceptanceCriteria, killSwitchDrills);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const criterionAverage =
    acceptanceCriteria.reduce((sum, item) => sum + item.score, 0) / Math.max(1, acceptanceCriteria.length);

  const stageAverage =
    canaryStages.reduce((sum, item) => {
      const value =
        item.readinessBand === "pilot-review-ready"
          ? 90
          : item.readinessBand === "review-ready"
            ? 76
            : item.readinessBand === "simulation-ready"
              ? 64
              : 44;

      return sum + value;
    }, 0) / Math.max(1, canaryStages.length);

  const riskPenalty = canaryRiskRegister.filter((item) => item.blocksPilotReview).length * 10;
  const approvalPressure =
    pilotApprovalBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, pilotApprovalBoard.length * 3);

  const canaryScore = clampScore(
    sourceAverage / 3 +
      criterionAverage / 3 +
      stageAverage / 3 +
      approvalPressure -
      riskPenalty -
      context.unresolvedAcceptanceItemCount -
      context.unresolvedRollbackItemCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.pendingPilotReviewCount * 6 +
        context.unresolvedAcceptanceItemCount * 8 +
        context.unresolvedRollbackItemCount * 8 +
        acceptanceCriteria.filter((item) => !item.passed).length * 9,
    ),
  );

  const canaryStatus = bandFromScore(
    canaryScore,
    canaryRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_CANARY_ROLLOUT_READINESS,
    canaryScore,
    canaryStatus,
    overallSeverity,
    sourceNodes,
    canaryStages,
    acceptanceCriteria,
    killSwitchDrills,
    pilotApprovalBoard,
    rollbackGovernance,
    canaryRiskRegister,
    redactedExportBundle: {
      exportId: "provider_canary_rollout_v12_4_redacted_dry_run",
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
        "canary stages",
        "acceptance criteria",
        "kill-switch drills",
        "pilot approval board",
        "rollback governance",
        "risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider canary rollout simulator is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Canary stages, kill-switch drills and pilot board items are review concepts only.",
      "Every pilot readiness discussion remains behind human review and runtime boundary gates.",
    ],
  };
}

export const aiProviderCanaryRolloutVersion = "V12.4";
