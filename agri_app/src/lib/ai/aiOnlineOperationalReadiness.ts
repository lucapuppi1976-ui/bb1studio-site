export type OnlineOperationalReadinessMode = "dry-run" | "readiness-board-review";

export type OnlineOperationalReadinessSeverity = "info" | "watch" | "elevated" | "critical";

export type OnlineOperationalReadinessPriority = "low" | "medium" | "high" | "urgent";

export type OnlineOperationalReadinessBand =
  | "blocked"
  | "controlled-online-ready"
  | "staging-design-ready"
  | "activation-plan-ready";

export type OnlineOperationalReadinessLane =
  | "provider-plan"
  | "environment-readiness"
  | "data-migration-plan"
  | "human-review-workflow"
  | "rbac-access-plan"
  | "cost-rate-limit"
  | "rollback-kill-switch"
  | "beta-go-no-go";

export interface OnlineOperationalReadinessGuardrail {
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
  onlineControlledReady: true;
  operationalAiReady: false;
  providerActivationAllowed: false;
  casePersistenceActivationAllowed: false;
  automationActivationAllowed: false;
}

export interface OnlineOperationalReadinessInput {
  providerPlanItemCount?: number;
  migrationPlanItemCount?: number;
  humanReviewPlanItemCount?: number;
  accessPlanItemCount?: number;
  costControlItemCount?: number;
  rollbackPlanItemCount?: number;
  openOperationalGapCount?: number;
  liveStabilityScore?: number;
  dryRunGovernanceScore?: number;
  humanReviewMaturityScore?: number;
  releaseControlScore?: number;
  privacyReadinessScore?: number;
  stagingReadinessScore?: number;
  betaReadinessScore?: number;
  readinessLeadRole?: string;
}

export interface ReadinessSourceNode {
  id: string;
  lane: OnlineOperationalReadinessLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: OnlineOperationalReadinessSeverity;
  priority: OnlineOperationalReadinessPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ProviderActivationPlanItem {
  id: string;
  label: string;
  lane: OnlineOperationalReadinessLane;
  planScore: number;
  severity: OnlineOperationalReadinessSeverity;
  requiredBeforeEnablement: string[];
  heldState: string;
  blockedOutcome: string;
}

export interface EnvironmentReadinessItem {
  id: string;
  label: string;
  lane: OnlineOperationalReadinessLane;
  readinessScore: number;
  severity: OnlineOperationalReadinessSeverity;
  environmentQuestion: string;
  manualResolution: string;
}

export interface DataMigrationPlanItem {
  id: string;
  label: string;
  lane: OnlineOperationalReadinessLane;
  planScore: number;
  priority: OnlineOperationalReadinessPriority;
  migrationQuestion: string;
  requiredBeforeMigration: string[];
  blockedOutcome: string;
}

export interface HumanReviewWorkflowPlanItem {
  id: string;
  label: string;
  lane: OnlineOperationalReadinessLane;
  workflowScore: number;
  severity: OnlineOperationalReadinessSeverity;
  workflowQuestion: string;
  manualResolution: string;
}

export interface AccessControlPlanItem {
  id: string;
  label: string;
  lane: OnlineOperationalReadinessLane;
  accessScore: number;
  priority: OnlineOperationalReadinessPriority;
  accessQuestion: string;
  requiredBeforeActivation: string[];
}

export interface CostRateLimitPlanItem {
  id: string;
  label: string;
  lane: OnlineOperationalReadinessLane;
  controlScore: number;
  severity: OnlineOperationalReadinessSeverity;
  controlQuestion: string;
  manualResolution: string;
}

export interface RollbackKillSwitchPlanItem {
  id: string;
  label: string;
  lane: OnlineOperationalReadinessLane;
  rollbackScore: number;
  severity: OnlineOperationalReadinessSeverity;
  rollbackQuestion: string;
  manualResolution: string;
}

export interface BetaGoNoGoItem {
  id: string;
  label: string;
  lane: OnlineOperationalReadinessLane;
  goNoGoState: "no-go" | "controlled-online" | "staging-design";
  score: number;
  severity: OnlineOperationalReadinessSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface OnlineOperationalReadinessGateItem {
  id: string;
  label: string;
  lane: OnlineOperationalReadinessLane;
  passed: boolean;
  score: number;
  severity: OnlineOperationalReadinessSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface OnlineOperationalReadinessBoardPackItem {
  id: string;
  label: string;
  lane: OnlineOperationalReadinessLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface OnlineOperationalReadinessRiskItem {
  id: string;
  label: string;
  lane: OnlineOperationalReadinessLane;
  severity: OnlineOperationalReadinessSeverity;
  reason: string;
  manualResolution: string;
  blocksOperationalActivation: boolean;
}

export interface OnlineOperationalReadinessReport {
  generatedAt: string;
  mode: OnlineOperationalReadinessMode;
  context: Required<OnlineOperationalReadinessInput>;
  readiness: OnlineOperationalReadinessGuardrail;
  readinessScore: number;
  readinessStatus: OnlineOperationalReadinessBand;
  overallSeverity: OnlineOperationalReadinessSeverity;
  sourceNodes: ReadinessSourceNode[];
  providerActivationPlan: ProviderActivationPlanItem[];
  environmentReadinessMatrix: EnvironmentReadinessItem[];
  dataMigrationPlan: DataMigrationPlanItem[];
  humanReviewWorkflowPlan: HumanReviewWorkflowPlanItem[];
  accessControlPlan: AccessControlPlanItem[];
  costRateLimitPlan: CostRateLimitPlanItem[];
  rollbackKillSwitchPlan: RollbackKillSwitchPlanItem[];
  betaGoNoGoBoard: BetaGoNoGoItem[];
  operationalReadinessGates: OnlineOperationalReadinessGateItem[];
  readinessBoardPack: OnlineOperationalReadinessBoardPackItem[];
  readinessRiskRegister: OnlineOperationalReadinessRiskItem[];
  stagedRoadmap: {
    v150: string;
    v151: string;
    v152: string;
    v153: string;
    v160: string;
  };
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

export const ONLINE_OPERATIONAL_READINESS_GUARDRAIL: OnlineOperationalReadinessGuardrail = {
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
  onlineControlledReady: true,
  operationalAiReady: false,
  providerActivationAllowed: false,
  casePersistenceActivationAllowed: false,
  automationActivationAllowed: false,
};

const priorityWeight: Record<OnlineOperationalReadinessPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: OnlineOperationalReadinessInput): Required<OnlineOperationalReadinessInput> {
  return {
    providerPlanItemCount: input.providerPlanItemCount ?? 8,
    migrationPlanItemCount: input.migrationPlanItemCount ?? 8,
    humanReviewPlanItemCount: input.humanReviewPlanItemCount ?? 7,
    accessPlanItemCount: input.accessPlanItemCount ?? 6,
    costControlItemCount: input.costControlItemCount ?? 6,
    rollbackPlanItemCount: input.rollbackPlanItemCount ?? 7,
    openOperationalGapCount: input.openOperationalGapCount ?? 10,
    liveStabilityScore: input.liveStabilityScore ?? 86,
    dryRunGovernanceScore: input.dryRunGovernanceScore ?? 91,
    humanReviewMaturityScore: input.humanReviewMaturityScore ?? 78,
    releaseControlScore: input.releaseControlScore ?? 88,
    privacyReadinessScore: input.privacyReadinessScore ?? 66,
    stagingReadinessScore: input.stagingReadinessScore ?? 58,
    betaReadinessScore: input.betaReadinessScore ?? 52,
    readinessLeadRole: input.readinessLeadRole ?? "online readiness board lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): OnlineOperationalReadinessSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: OnlineOperationalReadinessSeverity): OnlineOperationalReadinessPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): OnlineOperationalReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "activation-plan-ready";
  if (score >= 74) return "staging-design-ready";
  return "controlled-online-ready";
}

function buildSourceNode(
  id: string,
  lane: OnlineOperationalReadinessLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ReadinessSourceNode {
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
        ? [
            "Online operational readiness remains below activation threshold.",
            "Readiness board must resolve staging, migration, access and rollback gaps before live AI enablement.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<OnlineOperationalReadinessInput>): ReadinessSourceNode[] {
  const providerPressure = context.providerPlanItemCount;
  const migrationPressure = context.migrationPlanItemCount;
  const accessPressure = context.accessPlanItemCount * 2;
  const costPressure = context.costControlItemCount * 2;
  const rollbackPressure = context.rollbackPlanItemCount;
  const gapPressure = context.openOperationalGapCount * 2;

  return [
    buildSourceNode(
      "OOR_NODE_001",
      "environment-readiness",
      "Live app stability baseline",
      "V14.5",
      context.liveStabilityScore,
      context.releaseControlScore,
      0,
      "Keep public app online with dry-run AI controls.",
    ),
    buildSourceNode(
      "OOR_NODE_002",
      "provider-plan",
      "Provider runtime staging plan",
      "V15.0",
      context.stagingReadinessScore,
      context.releaseControlScore,
      providerPressure,
      "Design backend-only provider gateway before any real call.",
    ),
    buildSourceNode(
      "OOR_NODE_003",
      "data-migration-plan",
      "AI case persistence migration plan",
      "V15.0",
      context.stagingReadinessScore,
      context.releaseControlScore,
      migrationPressure,
      "Design migrations and rollback before any case storage activation.",
    ),
    buildSourceNode(
      "OOR_NODE_004",
      "human-review-workflow",
      "Persistent human review workflow plan",
      "V15.0",
      context.humanReviewMaturityScore,
      context.dryRunGovernanceScore,
      gapPressure,
      "Define review states, reviewer ownership and manual conversion gates.",
    ),
    buildSourceNode(
      "OOR_NODE_005",
      "rbac-access-plan",
      "AI operations access plan",
      "V15.0",
      context.privacyReadinessScore,
      context.releaseControlScore,
      accessPressure,
      "Define role-based access and production exposure rules.",
    ),
    buildSourceNode(
      "OOR_NODE_006",
      "cost-rate-limit",
      "Cost and rate control plan",
      "V15.0",
      context.stagingReadinessScore,
      context.releaseControlScore,
      costPressure,
      "Define daily budget, request throttling and stop conditions.",
    ),
    buildSourceNode(
      "OOR_NODE_007",
      "rollback-kill-switch",
      "Rollback and kill-switch plan",
      "V15.0",
      context.releaseControlScore,
      context.dryRunGovernanceScore,
      rollbackPressure,
      "Prepare reversible activation and immediate shutdown path.",
    ),
    buildSourceNode(
      "OOR_NODE_008",
      "beta-go-no-go",
      "Controlled beta readiness",
      "V15.0",
      context.betaReadinessScore,
      context.humanReviewMaturityScore,
      gapPressure,
      "Keep production beta blocked until staging provider, storage and review gates pass.",
    ),
  ];
}

function buildProviderActivationPlan(context: Required<OnlineOperationalReadinessInput>): ProviderActivationPlanItem[] {
  return [
    {
      id: "OOR_PROVIDER_001",
      label: "Backend-only provider gateway design",
      lane: "provider-plan",
      planScore: clampScore(context.stagingReadinessScore),
      severity: severityFromConcern(100 - context.stagingReadinessScore + context.providerPlanItemCount * 4),
      requiredBeforeEnablement: [
        "server-side gateway",
        "request redaction",
        "response schema validation",
        "timeout and retry policy",
        "cost budget stop",
      ],
      heldState: "Design only. No provider call is allowed in V15.0.",
      blockedOutcome: "No live provider request.",
    },
    {
      id: "OOR_PROVIDER_002",
      label: "Provider response contract hardening",
      lane: "provider-plan",
      planScore: clampScore(context.dryRunGovernanceScore),
      severity: "elevated",
      requiredBeforeEnablement: [
        "schema enforcement",
        "invalid response quarantine",
        "human review requirement",
        "non-prescriptive output guard",
      ],
      heldState: "Contract review only.",
      blockedOutcome: "No autonomous AI conclusion.",
    },
    {
      id: "OOR_PROVIDER_003",
      label: "Provider activation go/no-go board",
      lane: "provider-plan",
      planScore: clampScore(context.betaReadinessScore),
      severity: severityFromConcern(100 - context.betaReadinessScore + context.openOperationalGapCount * 4),
      requiredBeforeEnablement: [
        "staging test",
        "review board signoff",
        "rollback drill",
        "production exposure approval",
      ],
      heldState: "No-go for operational provider activation.",
      blockedOutcome: "No production AI activation.",
    },
  ];
}

function buildEnvironmentReadinessMatrix(context: Required<OnlineOperationalReadinessInput>): EnvironmentReadinessItem[] {
  return [
    {
      id: "OOR_ENV_001",
      label: "Live dry-run baseline",
      lane: "environment-readiness",
      readinessScore: clampScore(context.liveStabilityScore),
      severity: severityFromConcern(100 - context.liveStabilityScore),
      environmentQuestion: "Can the app remain online with all AI modules dry-run?",
      manualResolution: "Yes: keep controlled online mode.",
    },
    {
      id: "OOR_ENV_002",
      label: "Staging runtime boundary",
      lane: "environment-readiness",
      readinessScore: clampScore(context.stagingReadinessScore),
      severity: severityFromConcern(100 - context.stagingReadinessScore + context.openOperationalGapCount * 4),
      environmentQuestion: "Is a staging boundary ready before provider runtime?",
      manualResolution: "No: design staging runtime first.",
    },
    {
      id: "OOR_ENV_003",
      label: "Production activation boundary",
      lane: "environment-readiness",
      readinessScore: clampScore(context.betaReadinessScore),
      severity: "critical",
      environmentQuestion: "Is production AI activation ready?",
      manualResolution: "No: production activation remains blocked.",
    },
  ];
}

function buildDataMigrationPlan(context: Required<OnlineOperationalReadinessInput>): DataMigrationPlanItem[] {
  return [
    {
      id: "OOR_MIGRATION_001",
      label: "AI case schema migration plan",
      lane: "data-migration-plan",
      planScore: clampScore(context.stagingReadinessScore - context.migrationPlanItemCount),
      priority: "urgent",
      migrationQuestion: "Which case, photo, evidence, review and audit entities must be migrated?",
      requiredBeforeMigration: [
        "migration files",
        "dev migration validation",
        "staging migration validation",
        "backup and rollback",
        "no live schema push",
      ],
      blockedOutcome: "No AI case storage in V15.0.",
    },
    {
      id: "OOR_MIGRATION_002",
      label: "AI audit event migration plan",
      lane: "data-migration-plan",
      planScore: clampScore(context.releaseControlScore - context.migrationPlanItemCount),
      priority: "high",
      migrationQuestion: "How will review and provider events be traced?",
      requiredBeforeMigration: [
        "audit event model",
        "reviewer identity",
        "timestamped event chain",
        "redacted export",
      ],
      blockedOutcome: "No audit event writes in V15.0.",
    },
    {
      id: "OOR_MIGRATION_003",
      label: "Photo retention and redaction plan",
      lane: "data-migration-plan",
      planScore: clampScore(context.privacyReadinessScore - context.migrationPlanItemCount),
      priority: "high",
      migrationQuestion: "How will photos, metadata and retention be handled?",
      requiredBeforeMigration: [
        "photo retention policy",
        "redacted evidence bundles",
        "admin deletion workflow",
        "privacy review",
      ],
      blockedOutcome: "No image persistence activation in V15.0.",
    },
  ];
}

function buildHumanReviewWorkflowPlan(context: Required<OnlineOperationalReadinessInput>): HumanReviewWorkflowPlanItem[] {
  return [
    {
      id: "OOR_REVIEW_001",
      label: "Persistent review state machine",
      lane: "human-review-workflow",
      workflowScore: clampScore(context.humanReviewMaturityScore - context.openOperationalGapCount * 2),
      severity: severityFromConcern(100 - context.humanReviewMaturityScore + context.openOperationalGapCount * 4),
      workflowQuestion: "Which states must exist before operational review?",
      manualResolution: "Define draft, provider completed, review required, approved for manual conversion, rejected and archived.",
    },
    {
      id: "OOR_REVIEW_002",
      label: "Reviewer accountability packet",
      lane: "human-review-workflow",
      workflowScore: clampScore(context.dryRunGovernanceScore - context.openOperationalGapCount),
      severity: "elevated",
      workflowQuestion: "How will human reviewer accountability be stored?",
      manualResolution: "Require reviewer identity, timestamp, reason and audit event before conversion.",
    },
    {
      id: "OOR_REVIEW_003",
      label: "Manual conversion gate design",
      lane: "human-review-workflow",
      workflowScore: clampScore(context.humanReviewMaturityScore - context.humanReviewPlanItemCount * 3),
      severity: "critical",
      workflowQuestion: "How will AI review become a task or intervention safely?",
      manualResolution: "Design preview, confirmation, reason, linked case and no automatic execution.",
    },
  ];
}

function buildAccessControlPlan(context: Required<OnlineOperationalReadinessInput>): AccessControlPlanItem[] {
  return [
    {
      id: "OOR_ACCESS_001",
      label: "AI operations role matrix",
      lane: "rbac-access-plan",
      accessScore: clampScore(context.privacyReadinessScore - context.accessPlanItemCount * 3),
      priority: "urgent",
      accessQuestion: "Who can access AI cases, provider runtime, review and conversion screens?",
      requiredBeforeActivation: [
        "admin role matrix",
        "reviewer role matrix",
        "read-only auditor role",
        "restricted provider runtime access",
      ],
    },
    {
      id: "OOR_ACCESS_002",
      label: "Protected ops route exposure plan",
      lane: "rbac-access-plan",
      accessScore: clampScore(context.releaseControlScore - context.accessPlanItemCount),
      priority: "high",
      accessQuestion: "Which protected endpoints can exist during staged activation?",
      requiredBeforeActivation: [
        "protected ops route list",
        "access audit",
        "redacted logs",
        "no public AI provider endpoint",
      ],
    },
    {
      id: "OOR_ACCESS_003",
      label: "Production beta allowlist plan",
      lane: "rbac-access-plan",
      accessScore: clampScore(context.betaReadinessScore),
      priority: "high",
      accessQuestion: "Which users can participate in future controlled beta?",
      requiredBeforeActivation: [
        "allowlist",
        "daily limits",
        "reviewer assignment",
        "manual support path",
      ],
    },
  ];
}

function buildCostRateLimitPlan(context: Required<OnlineOperationalReadinessInput>): CostRateLimitPlanItem[] {
  return [
    {
      id: "OOR_COST_001",
      label: "Daily provider cost ceiling",
      lane: "cost-rate-limit",
      controlScore: clampScore(context.stagingReadinessScore - context.costControlItemCount * 3),
      severity: severityFromConcern(100 - context.stagingReadinessScore + context.costControlItemCount * 6),
      controlQuestion: "What daily provider budget blocks runaway usage?",
      manualResolution: "Define daily budget ceiling and emergency stop before staging provider runtime.",
    },
    {
      id: "OOR_COST_002",
      label: "Request rate limit plan",
      lane: "cost-rate-limit",
      controlScore: clampScore(context.releaseControlScore - context.costControlItemCount * 2),
      severity: "elevated",
      controlQuestion: "How many calls can staging and beta users make?",
      manualResolution: "Define per-user, per-case and per-day limits before provider activation.",
    },
    {
      id: "OOR_COST_003",
      label: "Provider degradation policy",
      lane: "cost-rate-limit",
      controlScore: clampScore(context.stagingReadinessScore),
      severity: "elevated",
      controlQuestion: "What happens when limits, timeouts or provider errors occur?",
      manualResolution: "Fallback to local dry-run and human review hold.",
    },
  ];
}

function buildRollbackKillSwitchPlan(context: Required<OnlineOperationalReadinessInput>): RollbackKillSwitchPlanItem[] {
  return [
    {
      id: "OOR_ROLLBACK_001",
      label: "Provider runtime stop plan",
      lane: "rollback-kill-switch",
      rollbackScore: clampScore(context.releaseControlScore),
      severity: "critical",
      rollbackQuestion: "How can provider runtime be stopped immediately?",
      manualResolution: "Keep production provider activation blocked until stop plan is tested.",
    },
    {
      id: "OOR_ROLLBACK_002",
      label: "AI storage rollback plan",
      lane: "rollback-kill-switch",
      rollbackScore: clampScore(context.releaseControlScore - context.migrationPlanItemCount),
      severity: "elevated",
      rollbackQuestion: "How can AI persistence migration be rolled back safely?",
      manualResolution: "Require backup, migration rollback and staging rehearsal before live migration.",
    },
    {
      id: "OOR_ROLLBACK_003",
      label: "Manual conversion rollback plan",
      lane: "rollback-kill-switch",
      rollbackScore: clampScore(context.humanReviewMaturityScore),
      severity: "elevated",
      rollbackQuestion: "How can a manually converted item be traced and corrected?",
      manualResolution: "Require linked AI case, audit event and manual correction path.",
    },
  ];
}

function buildBetaGoNoGoBoard(context: Required<OnlineOperationalReadinessInput>): BetaGoNoGoItem[] {
  return [
    {
      id: "OOR_BETA_001",
      label: "Controlled online dry-run",
      lane: "beta-go-no-go",
      goNoGoState: "controlled-online",
      score: clampScore(context.liveStabilityScore),
      severity: "info",
      requiredBeforeGo: ["live stability", "dry-run controls", "ops checks"],
      safeOutcome: "Allowed: keep public app online with dry-run AI.",
    },
    {
      id: "OOR_BETA_002",
      label: "Provider staging design",
      lane: "beta-go-no-go",
      goNoGoState: context.stagingReadinessScore >= 70 ? "staging-design" : "no-go",
      score: clampScore(context.stagingReadinessScore),
      severity: severityFromConcern(100 - context.stagingReadinessScore + context.openOperationalGapCount * 3),
      requiredBeforeGo: ["provider gateway design", "schema validation", "cost control", "rollback drill"],
      safeOutcome: "Design only in V15.0.",
    },
    {
      id: "OOR_BETA_003",
      label: "Operational AI production beta",
      lane: "beta-go-no-go",
      goNoGoState: "no-go",
      score: clampScore(context.betaReadinessScore),
      severity: "critical",
      requiredBeforeGo: ["provider staging", "case storage", "persistent review", "manual conversion gate", "beta allowlist"],
      safeOutcome: "Blocked in V15.0.",
    },
  ];
}

function buildOperationalReadinessGates(
  context: Required<OnlineOperationalReadinessInput>,
  sourceNodes: ReadinessSourceNode[],
): OnlineOperationalReadinessGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "OOR_GATE_001",
      label: "Controlled online dry-run can continue",
      lane: "environment-readiness" as OnlineOperationalReadinessLane,
      score: context.liveStabilityScore,
      reviewer: "release reviewer",
      requiredEvidence: ["live status", "quick check", "protected endpoint controls"],
      hardStop: "Do not degrade current live dry-run stability.",
    },
    {
      id: "OOR_GATE_002",
      label: "Provider activation remains blocked",
      lane: "provider-plan" as OnlineOperationalReadinessLane,
      score: 100 - context.providerPlanItemCount * 6,
      reviewer: "provider readiness reviewer",
      requiredEvidence: ["provider activation plan", "cost controls", "schema validation"],
      hardStop: "Do not enable provider runtime in V15.0.",
    },
    {
      id: "OOR_GATE_003",
      label: "AI persistence remains blocked",
      lane: "data-migration-plan" as OnlineOperationalReadinessLane,
      score: 100 - context.migrationPlanItemCount * 5,
      reviewer: "migration reviewer",
      requiredEvidence: ["migration plan", "backup plan", "rollback plan"],
      hardStop: "Do not write AI cases to persistent storage in V15.0.",
    },
    {
      id: "OOR_GATE_004",
      label: "Human review persistence requires design",
      lane: "human-review-workflow" as OnlineOperationalReadinessLane,
      score: context.humanReviewMaturityScore - context.openOperationalGapCount * 2,
      reviewer: context.readinessLeadRole,
      requiredEvidence: ["review state machine", "reviewer accountability", "manual conversion design"],
      hardStop: "Do not convert AI outputs to work without persistent human review.",
    },
    {
      id: "OOR_GATE_005",
      label: "Production beta remains no-go",
      lane: "beta-go-no-go" as OnlineOperationalReadinessLane,
      score: context.betaReadinessScore,
      reviewer: "operations reviewer",
      requiredEvidence: ["staging plan", "access control", "rollback drill", "go/no-go board"],
      hardStop: "Do not start operational AI production beta in V15.0.",
    },
    {
      id: "OOR_GATE_006",
      label: "Source blockers are within controlled online tolerance",
      lane: "rollback-kill-switch" as OnlineOperationalReadinessLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "safety reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before activation-plan-ready state.",
    },
  ];

  return rows.map((row) => {
    const score = clampScore(row.score);
    const severity = severityFromConcern(100 - score);

    return {
      ...row,
      score,
      severity,
      passed: score >= 60,
    };
  });
}

function buildReadinessBoardPack(context: Required<OnlineOperationalReadinessInput>): OnlineOperationalReadinessBoardPackItem[] {
  return [
    {
      id: "OOR_PACK_001",
      label: "Controlled online readiness packet",
      lane: "environment-readiness",
      packReady: context.liveStabilityScore >= 70,
      readinessScore: clampScore(context.liveStabilityScore),
      reviewerCheck: "Confirm app remains online with dry-run AI only.",
      includedSections: ["live stability", "ops checks", "dry-run controls"],
      blockedSections: ["provider enablement", "AI case storage", "automation"],
    },
    {
      id: "OOR_PACK_002",
      label: "Provider activation plan packet",
      lane: "provider-plan",
      packReady: context.stagingReadinessScore >= 55,
      readinessScore: clampScore(context.stagingReadinessScore),
      reviewerCheck: "Confirm provider activation is planning-only.",
      includedSections: ["gateway design", "schema validation", "cost controls", "fallback"],
      blockedSections: ["live provider call", "production activation"],
    },
    {
      id: "OOR_PACK_003",
      label: "Operational go/no-go packet",
      lane: "beta-go-no-go",
      packReady: context.betaReadinessScore >= 50,
      readinessScore: clampScore(context.betaReadinessScore),
      reviewerCheck: "Confirm production AI remains no-go until staged milestones pass.",
      includedSections: ["beta gates", "rollback", "access controls", "human review"],
      blockedSections: ["automatic execution", "product guidance", "dosage guidance"],
    },
  ];
}

function buildRiskRegister(
  context: Required<OnlineOperationalReadinessInput>,
  sourceNodes: ReadinessSourceNode[],
  gates: OnlineOperationalReadinessGateItem[],
  betaBoard: BetaGoNoGoItem[],
): OnlineOperationalReadinessRiskItem[] {
  const risks: OnlineOperationalReadinessRiskItem[] = [];

  if (context.openOperationalGapCount > 0) {
    risks.push({
      id: "OOR_RISK_001",
      label: "Open operational gaps",
      lane: "beta-go-no-go",
      severity: context.openOperationalGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openOperationalGapCount} operational gaps remain open before AI activation.`,
      manualResolution: "Resolve through staged V15.x readiness work.",
      blocksOperationalActivation: true,
    });
  }

  if (context.stagingReadinessScore < 70) {
    risks.push({
      id: "OOR_RISK_002",
      label: "Staging runtime not ready",
      lane: "environment-readiness",
      severity: "critical",
      reason: "Staging runtime design is below activation threshold.",
      manualResolution: "Build provider staging gateway before any live activation.",
      blocksOperationalActivation: true,
    });
  }

  if (context.privacyReadinessScore < 75) {
    risks.push({
      id: "OOR_RISK_003",
      label: "Privacy and retention plan incomplete",
      lane: "rbac-access-plan",
      severity: "elevated",
      reason: "Photo and case retention planning is not mature enough for operational AI.",
      manualResolution: "Complete privacy, retention and access review.",
      blocksOperationalActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `OOR_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksOperationalActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `OOR_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Readiness gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksOperationalActivation: true,
      });
    });

  betaBoard
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      risks.push({
        id: `OOR_BETA_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go board state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksOperationalActivation: true,
      });
    });

  return risks;
}

export function buildAiOnlineOperationalReadinessReport(
  input: OnlineOperationalReadinessInput = {},
): OnlineOperationalReadinessReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const providerActivationPlan = buildProviderActivationPlan(context);
  const environmentReadinessMatrix = buildEnvironmentReadinessMatrix(context);
  const dataMigrationPlan = buildDataMigrationPlan(context);
  const humanReviewWorkflowPlan = buildHumanReviewWorkflowPlan(context);
  const accessControlPlan = buildAccessControlPlan(context);
  const costRateLimitPlan = buildCostRateLimitPlan(context);
  const rollbackKillSwitchPlan = buildRollbackKillSwitchPlan(context);
  const betaGoNoGoBoard = buildBetaGoNoGoBoard(context);
  const operationalReadinessGates = buildOperationalReadinessGates(context, sourceNodes);
  const readinessBoardPack = buildReadinessBoardPack(context);

  const readinessRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    operationalReadinessGates,
    betaGoNoGoBoard,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const providerAverage =
    providerActivationPlan.reduce((sum, item) => sum + item.planScore, 0) /
    Math.max(1, providerActivationPlan.length);

  const environmentAverage =
    environmentReadinessMatrix.reduce((sum, item) => sum + item.readinessScore, 0) /
    Math.max(1, environmentReadinessMatrix.length);

  const gateAverage =
    operationalReadinessGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, operationalReadinessGates.length);

  const riskPenalty = readinessRiskRegister.filter((item) => item.blocksOperationalActivation).length * 7;
  const betaPressure =
    betaGoNoGoBoard.reduce((sum, item) => sum + priorityWeight[item.severity === "critical" ? "urgent" : "medium"], 0) /
    Math.max(1, betaGoNoGoBoard.length * 4);

  const readinessScore = clampScore(
    sourceAverage / 4 +
      providerAverage / 4 +
      environmentAverage / 4 +
      gateAverage / 4 +
      betaPressure -
      riskPenalty -
      context.openOperationalGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openOperationalGapCount * 8 +
        context.providerPlanItemCount * 5 +
        context.migrationPlanItemCount * 5 +
        context.accessPlanItemCount * 5 +
        context.costControlItemCount * 5,
    ),
  );

  const readinessStatus = bandFromScore(
    readinessScore,
    readinessRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: ONLINE_OPERATIONAL_READINESS_GUARDRAIL,
    readinessScore,
    readinessStatus,
    overallSeverity,
    sourceNodes,
    providerActivationPlan,
    environmentReadinessMatrix,
    dataMigrationPlan,
    humanReviewWorkflowPlan,
    accessControlPlan,
    costRateLimitPlan,
    rollbackKillSwitchPlan,
    betaGoNoGoBoard,
    operationalReadinessGates,
    readinessBoardPack,
    readinessRiskRegister,
    stagedRoadmap: {
      v150: "Online operational readiness and activation plan only.",
      v151: "Provider runtime staging gateway design and contract hardening.",
      v152: "AI case persistence migration plan with rollback rehearsal.",
      v153: "Persistent human review workflow and manual conversion gate.",
      v160: "Controlled production beta only after staging gates pass.",
    },
    redactedExportBundle: {
      exportId: "online_operational_readiness_v15_0_redacted_dry_run",
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
        "provider activation plan",
        "environment readiness matrix",
        "data migration plan",
        "human review workflow plan",
        "access control plan",
        "cost and rate limit plan",
        "rollback and kill-switch plan",
        "beta go/no-go board",
        "readiness gates",
        "readiness board pack",
        "risk register",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Online operational readiness is planning and dry-run only.",
      "Provider runtime, AI case storage, memory storage, automatic task creation and intervention creation remain disabled.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "The app can continue controlled online dry-run mode while operational AI remains blocked.",
    ],
  };
}

export const aiOnlineOperationalReadinessVersion = "V15.0";
