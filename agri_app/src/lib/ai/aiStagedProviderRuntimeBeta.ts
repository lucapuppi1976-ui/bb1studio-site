export type StagedProviderRuntimeBetaMode = "dry-run" | "activation-board-review";

export type StagedProviderRuntimeBetaSeverity = "info" | "watch" | "elevated" | "critical";

export type StagedProviderRuntimeBetaPriority = "low" | "medium" | "high" | "urgent";

export type StagedProviderRuntimeBetaReadinessBand =
  | "blocked"
  | "runtime-design-ready"
  | "manual-board-review-ready"
  | "staged-beta-plan-ready";

export type StagedProviderRuntimeBetaLane =
  | "runtime-allowlist"
  | "provider-contract"
  | "budget-window"
  | "canary-scope"
  | "runtime-stop"
  | "reviewer-approval"
  | "production-lock"
  | "human-signoff";

export interface StagedProviderRuntimeBetaGuardrail {
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
  controlledBetaAllowed: false;
  controlledBetaPerformed: false;
  productionBetaAllowed: false;
  productionBetaPerformed: false;
  zeroActivationMode: true;
  providerActivationAllowed: false;
  providerActivationPerformed: false;
  providerStagingActivationAllowed: false;
  providerStagingActivationPerformed: false;
  providerRuntimeBetaAllowed: false;
  providerRuntimeBetaPerformed: false;
  explicitActivationApprovalAllowed: false;
  explicitActivationApprovalPerformed: false;
  productionRuntimeAllowed: false;
  productionRuntimePerformed: false;
  providerRegistryWriteAllowed: false;
  providerRegistryWritePerformed: false;
  casePersistenceActivationAllowed: false;
  casePersistencePerformed: false;
  storageActivationAllowed: false;
  storageActivationPerformed: false;
  liveMigrationExecutionAllowed: false;
  liveMigrationExecutionPerformed: false;
  migrationExecutionAllowed: false;
  migrationExecutionPerformed: false;
  schemaWriteAllowed: false;
  schemaWritePerformed: false;
  automationActivationAllowed: false;
  reviewPersistenceAllowed: false;
  reviewPersistencePerformed: false;
  manualConversionAllowed: false;
  manualConversionPerformed: false;
  providerCallAllowed: false;
  providerCallPerformed: false;
  complianceExportAllowed: false;
  complianceExportPerformed: false;
  stagedProviderRuntimeBetaReady: true;
  explicitActivationApprovalReady: true;
  runtimeBetaDryRunReady: true;
  productionRuntimeLockReady: true;
}

export interface StagedProviderRuntimeBetaInput {
  allowlistItemCount?: number;
  providerContractItemCount?: number;
  budgetWindowItemCount?: number;
  canaryScopeItemCount?: number;
  runtimeStopItemCount?: number;
  reviewerApprovalItemCount?: number;
  openRuntimeGapCount?: number;
  onlineReadinessScore?: number;
  operationsCockpitScore?: number;
  auditPackageScore?: number;
  providerContractScore?: number;
  budgetReadinessScore?: number;
  canaryScopeScore?: number;
  reviewerApprovalScore?: number;
  runtimeLeadRole?: string;
}

export interface StagedProviderSourceNode {
  id: string;
  lane: StagedProviderRuntimeBetaLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: StagedProviderRuntimeBetaSeverity;
  priority: StagedProviderRuntimeBetaPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface RuntimeAllowlistItem {
  id: string;
  label: string;
  lane: StagedProviderRuntimeBetaLane;
  allowlistScore: number;
  severity: StagedProviderRuntimeBetaSeverity;
  allowlistPurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ProviderContractItem {
  id: string;
  label: string;
  lane: StagedProviderRuntimeBetaLane;
  contractScore: number;
  severity: StagedProviderRuntimeBetaSeverity;
  contractQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface BudgetWindowItem {
  id: string;
  label: string;
  lane: StagedProviderRuntimeBetaLane;
  budgetScore: number;
  priority: StagedProviderRuntimeBetaPriority;
  budgetQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface CanaryScopeItem {
  id: string;
  label: string;
  lane: StagedProviderRuntimeBetaLane;
  canaryScore: number;
  severity: StagedProviderRuntimeBetaSeverity;
  canaryQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface RuntimeStopItem {
  id: string;
  label: string;
  lane: StagedProviderRuntimeBetaLane;
  stopScore: number;
  severity: StagedProviderRuntimeBetaSeverity;
  stopRule: string;
  safeFallback: string;
}

export interface ReviewerApprovalItem {
  id: string;
  label: string;
  lane: StagedProviderRuntimeBetaLane;
  approvalScore: number;
  priority: StagedProviderRuntimeBetaPriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ProductionLockItem {
  id: string;
  label: string;
  lane: StagedProviderRuntimeBetaLane;
  lockScore: number;
  severity: StagedProviderRuntimeBetaSeverity;
  lockRule: string;
  blockedOutcome: string;
}

export interface RuntimeBetaGoNoGoItem {
  id: string;
  label: string;
  lane: StagedProviderRuntimeBetaLane;
  goNoGoState: "no-go" | "design-only" | "runtime-plan-ready";
  score: number;
  severity: StagedProviderRuntimeBetaSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface RuntimeBetaGateItem {
  id: string;
  label: string;
  lane: StagedProviderRuntimeBetaLane;
  passed: boolean;
  score: number;
  severity: StagedProviderRuntimeBetaSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface RuntimeBetaBoardPackItem {
  id: string;
  label: string;
  lane: StagedProviderRuntimeBetaLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface RuntimeBetaFindingItem {
  id: string;
  label: string;
  lane: StagedProviderRuntimeBetaLane;
  severity: StagedProviderRuntimeBetaSeverity;
  reason: string;
  manualResolution: string;
  blocksRuntimeBetaActivation: boolean;
}

export interface StagedProviderRuntimeBetaReport {
  generatedAt: string;
  mode: StagedProviderRuntimeBetaMode;
  context: Required<StagedProviderRuntimeBetaInput>;
  readiness: StagedProviderRuntimeBetaGuardrail;
  runtimeBetaScore: number;
  runtimeBetaStatus: StagedProviderRuntimeBetaReadinessBand;
  overallSeverity: StagedProviderRuntimeBetaSeverity;
  sourceNodes: StagedProviderSourceNode[];
  runtimeAllowlist: RuntimeAllowlistItem[];
  providerContractPlan: ProviderContractItem[];
  budgetWindowPlan: BudgetWindowItem[];
  canaryScopePlan: CanaryScopeItem[];
  runtimeStopPlan: RuntimeStopItem[];
  reviewerApprovalBoard: ReviewerApprovalItem[];
  productionRuntimeLocks: ProductionLockItem[];
  goNoGoBoard: RuntimeBetaGoNoGoItem[];
  runtimeBetaGates: RuntimeBetaGateItem[];
  runtimeBetaBoardPack: RuntimeBetaBoardPackItem[];
  runtimeBetaFindings: RuntimeBetaFindingItem[];
  stagedRoadmap: {
    v164: string;
    v165: string;
    v166: string;
    v167: string;
    v168: string;
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

export const STAGED_PROVIDER_RUNTIME_BETA_GUARDRAIL: StagedProviderRuntimeBetaGuardrail = {
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
  controlledBetaAllowed: false,
  controlledBetaPerformed: false,
  productionBetaAllowed: false,
  productionBetaPerformed: false,
  zeroActivationMode: true,
  providerActivationAllowed: false,
  providerActivationPerformed: false,
  providerStagingActivationAllowed: false,
  providerStagingActivationPerformed: false,
  providerRuntimeBetaAllowed: false,
  providerRuntimeBetaPerformed: false,
  explicitActivationApprovalAllowed: false,
  explicitActivationApprovalPerformed: false,
  productionRuntimeAllowed: false,
  productionRuntimePerformed: false,
  providerRegistryWriteAllowed: false,
  providerRegistryWritePerformed: false,
  casePersistenceActivationAllowed: false,
  casePersistencePerformed: false,
  storageActivationAllowed: false,
  storageActivationPerformed: false,
  liveMigrationExecutionAllowed: false,
  liveMigrationExecutionPerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  automationActivationAllowed: false,
  reviewPersistenceAllowed: false,
  reviewPersistencePerformed: false,
  manualConversionAllowed: false,
  manualConversionPerformed: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  complianceExportAllowed: false,
  complianceExportPerformed: false,
  stagedProviderRuntimeBetaReady: true,
  explicitActivationApprovalReady: true,
  runtimeBetaDryRunReady: true,
  productionRuntimeLockReady: true,
};

const priorityWeight: Record<StagedProviderRuntimeBetaPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: StagedProviderRuntimeBetaInput): Required<StagedProviderRuntimeBetaInput> {
  return {
    allowlistItemCount: input.allowlistItemCount ?? 8,
    providerContractItemCount: input.providerContractItemCount ?? 8,
    budgetWindowItemCount: input.budgetWindowItemCount ?? 7,
    canaryScopeItemCount: input.canaryScopeItemCount ?? 7,
    runtimeStopItemCount: input.runtimeStopItemCount ?? 7,
    reviewerApprovalItemCount: input.reviewerApprovalItemCount ?? 7,
    openRuntimeGapCount: input.openRuntimeGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    operationsCockpitScore: input.operationsCockpitScore ?? 70,
    auditPackageScore: input.auditPackageScore ?? 70,
    providerContractScore: input.providerContractScore ?? 66,
    budgetReadinessScore: input.budgetReadinessScore ?? 64,
    canaryScopeScore: input.canaryScopeScore ?? 66,
    reviewerApprovalScore: input.reviewerApprovalScore ?? 68,
    runtimeLeadRole: input.runtimeLeadRole ?? "staged provider runtime beta reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): StagedProviderRuntimeBetaSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: StagedProviderRuntimeBetaSeverity): StagedProviderRuntimeBetaPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): StagedProviderRuntimeBetaReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "staged-beta-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "runtime-design-ready";
}

function buildSourceNode(
  id: string,
  lane: StagedProviderRuntimeBetaLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): StagedProviderSourceNode {
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
            "Staged provider runtime beta remains below activation threshold.",
            "Runtime board must resolve allowlist, contract, budget, canary and stop gaps before any later activation release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<StagedProviderRuntimeBetaInput>): StagedProviderSourceNode[] {
  const allowlistPressure = context.allowlistItemCount;
  const contractPressure = context.providerContractItemCount * 2;
  const budgetPressure = context.budgetWindowItemCount * 2;
  const canaryPressure = context.canaryScopeItemCount * 2;
  const stopPressure = context.runtimeStopItemCount;
  const gapPressure = context.openRuntimeGapCount * 2;

  return [
    buildSourceNode(
      "SPRB_NODE_001",
      "runtime-allowlist",
      "Human-supervised operations cockpit",
      "V16.3",
      context.operationsCockpitScore,
      context.reviewerApprovalScore,
      allowlistPressure,
      "Connect operations cockpit to runtime allowlist design.",
    ),
    buildSourceNode(
      "SPRB_NODE_002",
      "provider-contract",
      "Operational audit package",
      "V16.2",
      context.auditPackageScore,
      context.providerContractScore,
      contractPressure,
      "Review provider contract readiness without runtime.",
    ),
    buildSourceNode(
      "SPRB_NODE_003",
      "budget-window",
      "Budget window readiness",
      "V16.4",
      context.budgetReadinessScore,
      context.providerContractScore,
      budgetPressure,
      "Define budget boundaries before any later provider call.",
    ),
    buildSourceNode(
      "SPRB_NODE_004",
      "canary-scope",
      "Canary scope readiness",
      "V16.4",
      context.canaryScopeScore,
      context.reviewerApprovalScore,
      canaryPressure,
      "Define canary boundaries without activation.",
    ),
    buildSourceNode(
      "SPRB_NODE_005",
      "runtime-stop",
      "Runtime stop readiness",
      "V16.1",
      context.operationsCockpitScore,
      context.budgetReadinessScore,
      stopPressure,
      "Keep stop path available before any future runtime.",
    ),
    buildSourceNode(
      "SPRB_NODE_006",
      "reviewer-approval",
      "Reviewer approval readiness",
      "V16.3",
      context.reviewerApprovalScore,
      context.operationsCockpitScore,
      context.reviewerApprovalItemCount,
      "Require explicit human approval for later activation.",
    ),
    buildSourceNode(
      "SPRB_NODE_007",
      "production-lock",
      "Production runtime lock",
      "V16.0",
      100,
      context.onlineReadinessScore,
      gapPressure,
      "Keep production runtime locked.",
    ),
    buildSourceNode(
      "SPRB_NODE_008",
      "human-signoff",
      "Runtime beta board signoff",
      "V16.4",
      context.reviewerApprovalScore,
      context.canaryScopeScore,
      gapPressure,
      "Keep runtime beta activation blocked until a separate explicit activation release.",
    ),
  ];
}

function buildRuntimeAllowlist(context: Required<StagedProviderRuntimeBetaInput>): RuntimeAllowlistItem[] {
  return [
    {
      id: "SPRB_ALLOW_001",
      label: "Reviewer allowlist design",
      lane: "runtime-allowlist",
      allowlistScore: clampScore(context.reviewerApprovalScore),
      severity: severityFromConcern(100 - context.reviewerApprovalScore + context.allowlistItemCount * 4),
      allowlistPurpose: "Define who could review a future staged runtime beta without activating it.",
      requiredEvidence: ["reviewer role", "manual board note", "explicit approval gate"],
      blockedOutcome: "No runtime allowlist activation.",
    },
    {
      id: "SPRB_ALLOW_002",
      label: "Case allowlist design",
      lane: "runtime-allowlist",
      allowlistScore: clampScore(context.canaryScopeScore),
      severity: "elevated",
      allowlistPurpose: "Define eligible future cases without storing or calling providers.",
      requiredEvidence: ["case caveat", "human review", "canary scope"],
      blockedOutcome: "No case storage or provider call.",
    },
    {
      id: "SPRB_ALLOW_003",
      label: "Runtime boundary allowlist",
      lane: "runtime-allowlist",
      allowlistScore: 100,
      severity: "critical",
      allowlistPurpose: "Keep every runtime route blocked until explicit activation release.",
      requiredEvidence: ["providerCallAllowed=false", "productionRuntimeAllowed=false"],
      blockedOutcome: "No runtime activation.",
    },
  ];
}

function buildProviderContractPlan(context: Required<StagedProviderRuntimeBetaInput>): ProviderContractItem[] {
  return [
    {
      id: "SPRB_CONTRACT_001",
      label: "Provider response contract review",
      lane: "provider-contract",
      contractScore: clampScore(context.providerContractScore),
      severity: severityFromConcern(100 - context.providerContractScore + context.providerContractItemCount * 4),
      contractQuestion: "Is the future provider response contract ready for board review?",
      requiredEvidence: ["expected schema", "unsafe output hold", "human review lock"],
      blockedOutcome: "No provider runtime.",
    },
    {
      id: "SPRB_CONTRACT_002",
      label: "Provider request boundary review",
      lane: "provider-contract",
      contractScore: clampScore(context.auditPackageScore),
      severity: "elevated",
      contractQuestion: "Can future request boundaries remain redacted and safe?",
      requiredEvidence: ["redacted request", "no field identity", "no private notes"],
      blockedOutcome: "No provider request is sent.",
    },
    {
      id: "SPRB_CONTRACT_003",
      label: "Provider fallback contract",
      lane: "provider-contract",
      contractScore: clampScore(context.operationsCockpitScore),
      severity: "elevated",
      contractQuestion: "Can future provider issues fall back to local dry-run?",
      requiredEvidence: ["fallback route", "reviewer hold", "runtime stop"],
      blockedOutcome: "No external runtime.",
    },
  ];
}

function buildBudgetWindowPlan(context: Required<StagedProviderRuntimeBetaInput>): BudgetWindowItem[] {
  return [
    {
      id: "SPRB_BUDGET_001",
      label: "Daily budget window design",
      lane: "budget-window",
      budgetScore: clampScore(context.budgetReadinessScore),
      priority: context.budgetReadinessScore < 70 ? "urgent" : "high",
      budgetQuestion: "Can a future staged runtime be capped before activation?",
      requiredControls: ["daily ceiling", "manual board approval", "runtime stop"],
      manualResolution: "Keep budget window as dry-run design.",
    },
    {
      id: "SPRB_BUDGET_002",
      label: "Per-case budget window design",
      lane: "budget-window",
      budgetScore: clampScore(context.budgetReadinessScore - context.budgetWindowItemCount),
      priority: "urgent",
      budgetQuestion: "Can individual future cases be capped?",
      requiredControls: ["case ceiling", "attempt reason", "review hold"],
      manualResolution: "No provider attempt in V16.4.",
    },
    {
      id: "SPRB_BUDGET_003",
      label: "Budget stop window",
      lane: "budget-window",
      budgetScore: clampScore(context.operationsCockpitScore),
      priority: "high",
      budgetQuestion: "Can abnormal future cost return to dry-run?",
      requiredControls: ["budget anomaly", "runtime stop", "fallback route"],
      manualResolution: "Return to local dry-run report.",
    },
  ];
}

function buildCanaryScopePlan(context: Required<StagedProviderRuntimeBetaInput>): CanaryScopeItem[] {
  return [
    {
      id: "SPRB_CANARY_001",
      label: "Canary reviewer scope",
      lane: "canary-scope",
      canaryScore: clampScore(context.canaryScopeScore),
      severity: severityFromConcern(100 - context.canaryScopeScore + context.canaryScopeItemCount * 4),
      canaryQuestion: "Can a future runtime beta be limited to approved reviewers?",
      requiredEvidence: ["reviewer board", "manual approval", "runtime lock"],
      blockedOutcome: "No canary runtime.",
    },
    {
      id: "SPRB_CANARY_002",
      label: "Canary case scope",
      lane: "canary-scope",
      canaryScore: clampScore(context.canaryScopeScore - context.openRuntimeGapCount),
      severity: "critical",
      canaryQuestion: "Can future canary cases remain non-operational?",
      requiredEvidence: ["no dispatch", "no product guidance", "no dosage guidance"],
      blockedOutcome: "No operational canary.",
    },
    {
      id: "SPRB_CANARY_003",
      label: "Canary rollback scope",
      lane: "canary-scope",
      canaryScore: clampScore(context.operationsCockpitScore),
      severity: "elevated",
      canaryQuestion: "Can future canary runtime fall back immediately?",
      requiredEvidence: ["fallback route", "runtime stop", "manual board note"],
      blockedOutcome: "No runtime fallback is needed because runtime is not active.",
    },
  ];
}

function buildRuntimeStopPlan(): RuntimeStopItem[] {
  return [
    {
      id: "SPRB_STOP_001",
      label: "Provider runtime stop",
      lane: "runtime-stop",
      stopScore: 100,
      severity: "critical",
      stopRule: "Provider runtime remains stopped.",
      safeFallback: "Use local dry-run report.",
    },
    {
      id: "SPRB_STOP_002",
      label: "Storage runtime stop",
      lane: "runtime-stop",
      stopScore: 100,
      severity: "critical",
      stopRule: "Storage and migration remain stopped.",
      safeFallback: "Keep evidence local and redacted.",
    },
    {
      id: "SPRB_STOP_003",
      label: "Operational runtime stop",
      lane: "runtime-stop",
      stopScore: 100,
      severity: "critical",
      stopRule: "Task, intervention, product and dosage routes remain stopped.",
      safeFallback: "Require human review only.",
    },
  ];
}

function buildReviewerApprovalBoard(context: Required<StagedProviderRuntimeBetaInput>): ReviewerApprovalItem[] {
  return [
    {
      id: "SPRB_APPROVAL_001",
      label: "Explicit activation approval board",
      lane: "reviewer-approval",
      approvalScore: clampScore(context.reviewerApprovalScore),
      priority: "urgent",
      approvalQuestion: "Can any later runtime beta require explicit human board approval?",
      requiredEvidence: ["board note", "reviewer role", "go/no-go result"],
      blockedOutcome: "No approval activation in V16.4.",
    },
    {
      id: "SPRB_APPROVAL_002",
      label: "Safety approval board",
      lane: "reviewer-approval",
      approvalScore: 100,
      priority: "urgent",
      approvalQuestion: "Can unsafe guidance remain blocked?",
      requiredEvidence: ["no product guidance", "no dosage guidance", "no execution"],
      blockedOutcome: "No unsafe output approval.",
    },
    {
      id: "SPRB_APPROVAL_003",
      label: "Fallback approval board",
      lane: "reviewer-approval",
      approvalScore: clampScore(context.operationsCockpitScore),
      priority: "high",
      approvalQuestion: "Can future fallback decisions require human approval?",
      requiredEvidence: ["fallback reason", "board note", "local report"],
      blockedOutcome: "No fallback persistence.",
    },
  ];
}

function buildProductionRuntimeLocks(): ProductionLockItem[] {
  return [
    {
      id: "SPRB_LOCK_001",
      label: "Production provider runtime lock",
      lane: "production-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Production provider runtime remains disabled.",
      blockedOutcome: "productionRuntimeAllowed=false",
    },
    {
      id: "SPRB_LOCK_002",
      label: "Production storage lock",
      lane: "production-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Production AI storage remains disabled.",
      blockedOutcome: "storageActivationAllowed=false",
    },
    {
      id: "SPRB_LOCK_003",
      label: "Production operations lock",
      lane: "production-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Production work creation and execution remain disabled.",
      blockedOutcome: "automaticExecutionAllowed=false",
    },
  ];
}

function buildGoNoGoBoard(): RuntimeBetaGoNoGoItem[] {
  return [
    {
      id: "SPRB_GONOGO_001",
      label: "Staged provider runtime beta design",
      lane: "human-signoff",
      goNoGoState: "runtime-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["allowlist", "contract", "budget", "canary", "runtime stop"],
      safeOutcome: "Runtime beta plan only.",
    },
    {
      id: "SPRB_GONOGO_002",
      label: "Actual provider runtime beta",
      lane: "runtime-allowlist",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate activation release", "explicit board approval", "runtime proof"],
      safeOutcome: "Provider runtime beta remains blocked.",
    },
    {
      id: "SPRB_GONOGO_003",
      label: "Production AI runtime",
      lane: "production-lock",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate production release", "provider proof", "storage proof"],
      safeOutcome: "Production AI remains locked.",
    },
  ];
}

function buildRuntimeBetaGates(
  context: Required<StagedProviderRuntimeBetaInput>,
  sourceNodes: StagedProviderSourceNode[],
): RuntimeBetaGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "SPRB_GATE_001",
      label: "Runtime beta remains no-call",
      lane: "runtime-stop" as StagedProviderRuntimeBetaLane,
      score: 100,
      reviewer: "staged provider runtime beta reviewer",
      requiredEvidence: ["providerCalled=false", "providerCallAllowed=false", "zeroActivationMode=true"],
      hardStop: "Do not activate provider runtime in V16.4.",
    },
    {
      id: "SPRB_GATE_002",
      label: "Runtime allowlist is complete enough",
      lane: "runtime-allowlist" as StagedProviderRuntimeBetaLane,
      score: context.reviewerApprovalScore - context.allowlistItemCount * 3,
      reviewer: context.runtimeLeadRole,
      requiredEvidence: ["reviewer allowlist", "case allowlist", "runtime boundary"],
      hardStop: "Do not proceed without allowlist board.",
    },
    {
      id: "SPRB_GATE_003",
      label: "Provider contract is complete enough",
      lane: "provider-contract" as StagedProviderRuntimeBetaLane,
      score: context.providerContractScore - context.providerContractItemCount * 3,
      reviewer: "provider contract reviewer",
      requiredEvidence: ["response contract", "request boundary", "fallback contract"],
      hardStop: "Do not proceed without provider contract review.",
    },
    {
      id: "SPRB_GATE_004",
      label: "Budget window is complete enough",
      lane: "budget-window" as StagedProviderRuntimeBetaLane,
      score: context.budgetReadinessScore - context.budgetWindowItemCount * 3,
      reviewer: "budget reviewer",
      requiredEvidence: ["daily window", "case window", "budget stop"],
      hardStop: "Do not proceed without budget window review.",
    },
    {
      id: "SPRB_GATE_005",
      label: "Canary scope is complete enough",
      lane: "canary-scope" as StagedProviderRuntimeBetaLane,
      score: context.canaryScopeScore - context.canaryScopeItemCount * 3,
      reviewer: "canary scope reviewer",
      requiredEvidence: ["reviewer scope", "case scope", "rollback scope"],
      hardStop: "Do not proceed without canary scope review.",
    },
    {
      id: "SPRB_GATE_006",
      label: "Source blockers are within runtime beta tolerance",
      lane: "human-signoff" as StagedProviderRuntimeBetaLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before staged-beta-plan-ready state.",
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

function buildBoardPack(context: Required<StagedProviderRuntimeBetaInput>): RuntimeBetaBoardPackItem[] {
  return [
    {
      id: "SPRB_PACK_001",
      label: "Runtime allowlist packet",
      lane: "runtime-allowlist",
      packReady: context.reviewerApprovalScore >= 60,
      readinessScore: clampScore(context.reviewerApprovalScore),
      reviewerCheck: "Confirm allowlist remains design-only and no-call.",
      includedSections: ["reviewer allowlist", "case allowlist", "runtime boundary"],
      blockedSections: ["runtime activation", "provider call"],
    },
    {
      id: "SPRB_PACK_002",
      label: "Provider contract and budget packet",
      lane: "provider-contract",
      packReady: context.providerContractScore >= 60 && context.budgetReadinessScore >= 60,
      readinessScore: clampScore((context.providerContractScore + context.budgetReadinessScore) / 2),
      reviewerCheck: "Confirm contract and budget window before any later activation.",
      includedSections: ["contract plan", "budget window", "runtime stop"],
      blockedSections: ["unbounded runtime", "provider request send"],
    },
    {
      id: "SPRB_PACK_003",
      label: "Canary and approval packet",
      lane: "canary-scope",
      packReady: context.canaryScopeScore >= 60 && context.reviewerApprovalScore >= 60,
      readinessScore: clampScore((context.canaryScopeScore + context.reviewerApprovalScore) / 2),
      reviewerCheck: "Confirm canary and approval board remain no-go.",
      includedSections: ["canary scope", "approval board", "production locks"],
      blockedSections: ["canary runtime", "production runtime"],
    },
  ];
}

function buildFindings(
  context: Required<StagedProviderRuntimeBetaInput>,
  sourceNodes: StagedProviderSourceNode[],
  gates: RuntimeBetaGateItem[],
  goNoGo: RuntimeBetaGoNoGoItem[],
): RuntimeBetaFindingItem[] {
  const findings: RuntimeBetaFindingItem[] = [];

  if (context.openRuntimeGapCount > 0) {
    findings.push({
      id: "SPRB_FINDING_001",
      label: "Open runtime beta gaps",
      lane: "human-signoff",
      severity: context.openRuntimeGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openRuntimeGapCount} runtime beta gaps remain before any later activation.`,
      manualResolution: "Resolve allowlist, contract, budget, canary and approval gaps in a later gated release.",
      blocksRuntimeBetaActivation: true,
    });
  }

  if (context.providerContractScore < 70) {
    findings.push({
      id: "SPRB_FINDING_002",
      label: "Provider contract below threshold",
      lane: "provider-contract",
      severity: "critical",
      reason: "Provider contract readiness is not mature enough for runtime activation.",
      manualResolution: "Complete response contract, request boundary and fallback contract review.",
      blocksRuntimeBetaActivation: true,
    });
  }

  if (context.budgetReadinessScore < 70) {
    findings.push({
      id: "SPRB_FINDING_003",
      label: "Budget readiness below threshold",
      lane: "budget-window",
      severity: "critical",
      reason: "Budget window is not mature enough for runtime activation.",
      manualResolution: "Complete daily, per-case and anomaly budget controls.",
      blocksRuntimeBetaActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `SPRB_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksRuntimeBetaActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `SPRB_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Runtime beta gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksRuntimeBetaActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `SPRB_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksRuntimeBetaActivation: true,
      });
    });

  return findings;
}

export function buildAiStagedProviderRuntimeBetaReport(
  input: StagedProviderRuntimeBetaInput = {},
): StagedProviderRuntimeBetaReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const runtimeAllowlist = buildRuntimeAllowlist(context);
  const providerContractPlan = buildProviderContractPlan(context);
  const budgetWindowPlan = buildBudgetWindowPlan(context);
  const canaryScopePlan = buildCanaryScopePlan(context);
  const runtimeStopPlan = buildRuntimeStopPlan();
  const reviewerApprovalBoard = buildReviewerApprovalBoard(context);
  const productionRuntimeLocks = buildProductionRuntimeLocks();
  const goNoGoBoard = buildGoNoGoBoard();
  const runtimeBetaGates = buildRuntimeBetaGates(context, sourceNodes);
  const runtimeBetaBoardPack = buildBoardPack(context);
  const runtimeBetaFindings = buildFindings(context, sourceNodes, runtimeBetaGates, goNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const allowlistAverage =
    runtimeAllowlist.reduce((sum, item) => sum + item.allowlistScore, 0) /
    Math.max(1, runtimeAllowlist.length);

  const contractAverage =
    providerContractPlan.reduce((sum, item) => sum + item.contractScore, 0) /
    Math.max(1, providerContractPlan.length);

  const gateAverage =
    runtimeBetaGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, runtimeBetaGates.length);

  const findingPenalty = runtimeBetaFindings.filter((item) => item.blocksRuntimeBetaActivation).length * 7;
  const budgetPressure =
    budgetWindowPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, budgetWindowPlan.length * 4);

  const runtimeBetaScore = clampScore(
    sourceAverage / 4 +
      allowlistAverage / 4 +
      contractAverage / 4 +
      gateAverage / 4 +
      budgetPressure -
      findingPenalty -
      context.openRuntimeGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openRuntimeGapCount * 8 +
        context.providerContractItemCount * 6 +
        context.budgetWindowItemCount * 6 +
        context.canaryScopeItemCount * 6 +
        context.reviewerApprovalItemCount * 5,
    ),
  );

  const runtimeBetaStatus = bandFromScore(
    runtimeBetaScore,
    runtimeBetaFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: STAGED_PROVIDER_RUNTIME_BETA_GUARDRAIL,
    runtimeBetaScore,
    runtimeBetaStatus,
    overallSeverity,
    sourceNodes,
    runtimeAllowlist,
    providerContractPlan,
    budgetWindowPlan,
    canaryScopePlan,
    runtimeStopPlan,
    reviewerApprovalBoard,
    productionRuntimeLocks,
    goNoGoBoard,
    runtimeBetaGates,
    runtimeBetaBoardPack,
    runtimeBetaFindings,
    stagedRoadmap: {
      v164: "Staged provider runtime beta gate in zero-activation dry-run.",
      v165: "Runtime incident response board after explicit activation approval.",
      v166: "Compliance export activation only after explicit approval.",
      v167: "Manual dispatch activation only after explicit operational approval.",
      v168: "Provider runtime canary execution only after explicit approval.",
    },
    redactedExportBundle: {
      exportId: "staged_provider_runtime_beta_v16_4_redacted_dry_run",
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
        "runtime allowlist",
        "provider contract plan",
        "budget window plan",
        "canary scope plan",
        "runtime stop plan",
        "reviewer approval board",
        "production runtime locks",
        "go/no-go board",
        "runtime beta gates",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Staged provider runtime beta gate is local dry-run only.",
      "No provider runtime, provider call, storage activation, review storage, task creation, intervention creation or execution is performed.",
      "Explicit activation approval remains blocked in this release.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V16.4 prepares provider runtime beta governance only.",
    ],
  };
}

export const aiStagedProviderRuntimeBetaVersion = "V16.4";
