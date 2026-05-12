export type ProviderStagingActivationGateMode = "dry-run" | "staging-activation-board";

export type ProviderActivationSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderActivationPriority = "low" | "medium" | "high" | "urgent";

export type ProviderActivationReadinessBand =
  | "blocked"
  | "gate-design-ready"
  | "staging-board-review-ready"
  | "activation-plan-ready";

export type ProviderActivationLane =
  | "runtime-boundary"
  | "staging-switch"
  | "provider-registry"
  | "budget-gate"
  | "canary-boundary"
  | "failure-stop"
  | "production-lock"
  | "human-signoff";

export interface ProviderStagingActivationGateGuardrail {
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
  providerActivationPerformed: false;
  providerStagingActivationAllowed: false;
  providerStagingActivationPerformed: false;
  productionRuntimeAllowed: false;
  productionRuntimePerformed: false;
  providerRegistryWriteAllowed: false;
  providerRegistryWritePerformed: false;
  casePersistenceActivationAllowed: false;
  casePersistencePerformed: false;
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
  shadowRunExternalCallAllowed: false;
  shadowRunExternalCallPerformed: false;
  stagingActivationGateReady: true;
  productionRuntimeLockReady: true;
  budgetGateReady: true;
  canaryBoundaryReady: true;
}

export interface ProviderStagingActivationGateInput {
  runtimeBoundaryItemCount?: number;
  stagingSwitchItemCount?: number;
  registryPlanItemCount?: number;
  budgetGateItemCount?: number;
  canaryBoundaryItemCount?: number;
  failureStopItemCount?: number;
  openActivationGapCount?: number;
  onlineReadinessScore?: number;
  providerGatewayScore?: number;
  providerShadowScore?: number;
  manualConversionScore?: number;
  storageRehearsalScore?: number;
  budgetControlScore?: number;
  failureStopScore?: number;
  activationLeadRole?: string;
}

export interface ProviderActivationSourceNode {
  id: string;
  lane: ProviderActivationLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderActivationSeverity;
  priority: ProviderActivationPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface RuntimeBoundaryItem {
  id: string;
  label: string;
  lane: ProviderActivationLane;
  boundaryScore: number;
  severity: ProviderActivationSeverity;
  boundaryPurpose: string;
  requiredBeforeUse: string[];
  blockedOutcome: string;
}

export interface StagingSwitchPlanItem {
  id: string;
  label: string;
  lane: ProviderActivationLane;
  switchScore: number;
  priority: ProviderActivationPriority;
  switchQuestion: string;
  requiredControls: string[];
  blockedOutcome: string;
}

export interface ProviderRegistryPlanItem {
  id: string;
  label: string;
  lane: ProviderActivationLane;
  registryScore: number;
  severity: ProviderActivationSeverity;
  registryQuestion: string;
  requiredControls: string[];
  blockedOutcome: string;
}

export interface BudgetGatePlanItem {
  id: string;
  label: string;
  lane: ProviderActivationLane;
  budgetScore: number;
  priority: ProviderActivationPriority;
  budgetQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface CanaryBoundaryItem {
  id: string;
  label: string;
  lane: ProviderActivationLane;
  canaryScore: number;
  severity: ProviderActivationSeverity;
  canaryQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface FailureStopPlanItem {
  id: string;
  label: string;
  lane: ProviderActivationLane;
  stopScore: number;
  severity: ProviderActivationSeverity;
  stopQuestion: string;
  safeFallback: string;
}

export interface ProductionRuntimeLockItem {
  id: string;
  label: string;
  lane: ProviderActivationLane;
  lockScore: number;
  severity: ProviderActivationSeverity;
  lockRule: string;
  blockedOutcome: string;
}

export interface ProviderActivationGoNoGoItem {
  id: string;
  label: string;
  lane: ProviderActivationLane;
  goNoGoState: "no-go" | "design-only" | "staging-plan-ready";
  score: number;
  severity: ProviderActivationSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface ProviderActivationGateItem {
  id: string;
  label: string;
  lane: ProviderActivationLane;
  passed: boolean;
  score: number;
  severity: ProviderActivationSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ProviderActivationBoardPackItem {
  id: string;
  label: string;
  lane: ProviderActivationLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ProviderActivationRiskItem {
  id: string;
  label: string;
  lane: ProviderActivationLane;
  severity: ProviderActivationSeverity;
  reason: string;
  manualResolution: string;
  blocksProviderActivation: boolean;
}

export interface ProviderStagingActivationGateReport {
  generatedAt: string;
  mode: ProviderStagingActivationGateMode;
  context: Required<ProviderStagingActivationGateInput>;
  readiness: ProviderStagingActivationGateGuardrail;
  activationGateScore: number;
  activationGateStatus: ProviderActivationReadinessBand;
  overallSeverity: ProviderActivationSeverity;
  sourceNodes: ProviderActivationSourceNode[];
  runtimeBoundaryPlan: RuntimeBoundaryItem[];
  stagingSwitchPlan: StagingSwitchPlanItem[];
  providerRegistryPlan: ProviderRegistryPlanItem[];
  budgetGatePlan: BudgetGatePlanItem[];
  canaryBoundaryPlan: CanaryBoundaryItem[];
  failureStopPlan: FailureStopPlanItem[];
  productionRuntimeLock: ProductionRuntimeLockItem[];
  goNoGoBoard: ProviderActivationGoNoGoItem[];
  activationGates: ProviderActivationGateItem[];
  activationBoardPack: ProviderActivationBoardPackItem[];
  activationRiskRegister: ProviderActivationRiskItem[];
  stagedRoadmap: {
    v157: string;
    v158: string;
    v159: string;
    v160: string;
    v161: string;
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

export const PROVIDER_STAGING_ACTIVATION_GATE_GUARDRAIL: ProviderStagingActivationGateGuardrail = {
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
  providerActivationPerformed: false,
  providerStagingActivationAllowed: false,
  providerStagingActivationPerformed: false,
  productionRuntimeAllowed: false,
  productionRuntimePerformed: false,
  providerRegistryWriteAllowed: false,
  providerRegistryWritePerformed: false,
  casePersistenceActivationAllowed: false,
  casePersistencePerformed: false,
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
  shadowRunExternalCallAllowed: false,
  shadowRunExternalCallPerformed: false,
  stagingActivationGateReady: true,
  productionRuntimeLockReady: true,
  budgetGateReady: true,
  canaryBoundaryReady: true,
};

const priorityWeight: Record<ProviderActivationPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderStagingActivationGateInput): Required<ProviderStagingActivationGateInput> {
  return {
    runtimeBoundaryItemCount: input.runtimeBoundaryItemCount ?? 7,
    stagingSwitchItemCount: input.stagingSwitchItemCount ?? 7,
    registryPlanItemCount: input.registryPlanItemCount ?? 6,
    budgetGateItemCount: input.budgetGateItemCount ?? 7,
    canaryBoundaryItemCount: input.canaryBoundaryItemCount ?? 6,
    failureStopItemCount: input.failureStopItemCount ?? 7,
    openActivationGapCount: input.openActivationGapCount ?? 8,
    onlineReadinessScore: input.onlineReadinessScore ?? 82,
    providerGatewayScore: input.providerGatewayScore ?? 72,
    providerShadowScore: input.providerShadowScore ?? 72,
    manualConversionScore: input.manualConversionScore ?? 68,
    storageRehearsalScore: input.storageRehearsalScore ?? 68,
    budgetControlScore: input.budgetControlScore ?? 64,
    failureStopScore: input.failureStopScore ?? 66,
    activationLeadRole: input.activationLeadRole ?? "provider staging activation reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderActivationSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderActivationSeverity): ProviderActivationPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderActivationReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "activation-plan-ready";
  if (score >= 74) return "staging-board-review-ready";
  return "gate-design-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderActivationLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderActivationSourceNode {
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
            "Provider staging activation gate remains below activation threshold.",
            "Activation board must resolve runtime boundary, budget gate, canary boundary and failure stop gaps before any later staging enablement.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderStagingActivationGateInput>): ProviderActivationSourceNode[] {
  const boundaryPressure = context.runtimeBoundaryItemCount;
  const switchPressure = context.stagingSwitchItemCount;
  const registryPressure = context.registryPlanItemCount;
  const budgetPressure = context.budgetGateItemCount * 2;
  const canaryPressure = context.canaryBoundaryItemCount * 2;
  const gapPressure = context.openActivationGapCount * 2;

  return [
    buildSourceNode(
      "PSAG_NODE_001",
      "runtime-boundary",
      "Online readiness baseline",
      "V15.0",
      context.onlineReadinessScore,
      context.providerGatewayScore,
      boundaryPressure,
      "Keep online dry-run stable while staging activation remains locked.",
    ),
    buildSourceNode(
      "PSAG_NODE_002",
      "provider-registry",
      "Provider gateway baseline",
      "V15.1",
      context.providerGatewayScore,
      context.providerShadowScore,
      registryPressure,
      "Prepare provider registry plan without registry write.",
    ),
    buildSourceNode(
      "PSAG_NODE_003",
      "production-lock",
      "Provider shadow run baseline",
      "V15.4",
      context.providerShadowScore,
      context.providerGatewayScore,
      gapPressure,
      "Carry non-production boundary into activation gate.",
    ),
    buildSourceNode(
      "PSAG_NODE_004",
      "staging-switch",
      "Manual conversion baseline",
      "V15.6",
      context.manualConversionScore,
      context.providerShadowScore,
      switchPressure,
      "Keep staging activation separated from work conversion.",
    ),
    buildSourceNode(
      "PSAG_NODE_005",
      "budget-gate",
      "Budget control baseline",
      "V15.7",
      context.budgetControlScore,
      context.providerGatewayScore,
      budgetPressure,
      "Require budget gate before later staging enablement.",
    ),
    buildSourceNode(
      "PSAG_NODE_006",
      "canary-boundary",
      "Canary boundary baseline",
      "V15.7",
      context.storageRehearsalScore,
      context.manualConversionScore,
      canaryPressure,
      "Keep canary plan no-call and no-storage.",
    ),
    buildSourceNode(
      "PSAG_NODE_007",
      "failure-stop",
      "Failure stop baseline",
      "V15.7",
      context.failureStopScore,
      context.providerGatewayScore,
      gapPressure,
      "Define stop and fallback plan before later staging work.",
    ),
    buildSourceNode(
      "PSAG_NODE_008",
      "human-signoff",
      "Human activation signoff",
      "V15.7",
      context.manualConversionScore,
      context.failureStopScore,
      gapPressure,
      "Keep staging activation blocked until board signoff.",
    ),
  ];
}

function buildRuntimeBoundaryPlan(context: Required<ProviderStagingActivationGateInput>): RuntimeBoundaryItem[] {
  return [
    {
      id: "PSAG_BOUNDARY_001",
      label: "Backend staging boundary",
      lane: "runtime-boundary",
      boundaryScore: clampScore(context.providerGatewayScore),
      severity: severityFromConcern(100 - context.providerGatewayScore + context.runtimeBoundaryItemCount * 4),
      boundaryPurpose: "Define a future server-only staging boundary without runtime execution.",
      requiredBeforeUse: ["gateway design", "contract validation", "budget gate", "human signoff"],
      blockedOutcome: "No provider staging activation in V15.7.",
    },
    {
      id: "PSAG_BOUNDARY_002",
      label: "No client runtime boundary",
      lane: "runtime-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryPurpose: "Keep provider access away from client UI.",
      requiredBeforeUse: ["server boundary", "redacted output", "review hold"],
      blockedOutcome: "No client provider runtime.",
    },
    {
      id: "PSAG_BOUNDARY_003",
      label: "No production runtime boundary",
      lane: "runtime-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryPurpose: "Keep production runtime locked.",
      requiredBeforeUse: ["separate later release", "board approval", "rollback plan"],
      blockedOutcome: "No production runtime.",
    },
  ];
}

function buildStagingSwitchPlan(context: Required<ProviderStagingActivationGateInput>): StagingSwitchPlanItem[] {
  return [
    {
      id: "PSAG_SWITCH_001",
      label: "Staging switch plan",
      lane: "staging-switch",
      switchScore: clampScore(context.providerGatewayScore - context.stagingSwitchItemCount),
      priority: "urgent",
      switchQuestion: "Can a future staging switch remain board controlled?",
      requiredControls: ["board signoff", "budget gate", "failure stop", "no production runtime"],
      blockedOutcome: "No staging switch is enabled in V15.7.",
    },
    {
      id: "PSAG_SWITCH_002",
      label: "Board hold condition",
      lane: "staging-switch",
      switchScore: clampScore(context.manualConversionScore),
      priority: "high",
      switchQuestion: "Can staging remain held when review or storage gates are incomplete?",
      requiredControls: ["review gate", "storage gate", "manual conversion blocker"],
      blockedOutcome: "No provider staging when review or storage gates fail.",
    },
    {
      id: "PSAG_SWITCH_003",
      label: "Return to dry-run condition",
      lane: "staging-switch",
      switchScore: clampScore(context.failureStopScore),
      priority: "high",
      switchQuestion: "Can the system return to local dry-run if any future gate fails?",
      requiredControls: ["failure stop", "fallback board", "review hold"],
      blockedOutcome: "No automatic recovery execution.",
    },
  ];
}

function buildProviderRegistryPlan(context: Required<ProviderStagingActivationGateInput>): ProviderRegistryPlanItem[] {
  return [
    {
      id: "PSAG_REGISTRY_001",
      label: "Provider registry design",
      lane: "provider-registry",
      registryScore: clampScore(context.providerGatewayScore),
      severity: "elevated",
      registryQuestion: "Can future provider options be described without enabling runtime?",
      requiredControls: ["provider label", "capability profile", "contract profile", "disabled state"],
      blockedOutcome: "No provider registry write in V15.7.",
    },
    {
      id: "PSAG_REGISTRY_002",
      label: "Contract profile registry design",
      lane: "provider-registry",
      registryScore: clampScore(context.providerShadowScore),
      severity: "elevated",
      registryQuestion: "Can contract expectations be linked to a future provider profile?",
      requiredControls: ["schema profile", "unsafe output block", "review hold"],
      blockedOutcome: "No runtime profile activation.",
    },
    {
      id: "PSAG_REGISTRY_003",
      label: "Registry stop state",
      lane: "provider-registry",
      registryScore: 100,
      severity: "critical",
      registryQuestion: "Can every provider profile remain disabled by default?",
      requiredControls: ["default disabled", "board gate", "failure stop"],
      blockedOutcome: "No provider can run in V15.7.",
    },
  ];
}

function buildBudgetGatePlan(context: Required<ProviderStagingActivationGateInput>): BudgetGatePlanItem[] {
  return [
    {
      id: "PSAG_BUDGET_001",
      label: "Daily budget gate",
      lane: "budget-gate",
      budgetScore: clampScore(context.budgetControlScore),
      priority: context.budgetControlScore < 70 ? "urgent" : "high",
      budgetQuestion: "Can future provider usage be capped before staging?",
      requiredControls: ["daily ceiling", "board review", "failure stop"],
      manualResolution: "Define daily ceiling before any future staging call.",
    },
    {
      id: "PSAG_BUDGET_002",
      label: "Per-case budget gate",
      lane: "budget-gate",
      budgetScore: clampScore(context.budgetControlScore - context.budgetGateItemCount),
      priority: "high",
      budgetQuestion: "Can one case be prevented from repeated provider attempts?",
      requiredControls: ["per-case ceiling", "attempt reason", "review hold"],
      manualResolution: "Define per-case ceiling before any future staging call.",
    },
    {
      id: "PSAG_BUDGET_003",
      label: "Budget anomaly stop",
      lane: "budget-gate",
      budgetScore: clampScore(context.failureStopScore),
      priority: "urgent",
      budgetQuestion: "Can abnormal use return the system to dry-run?",
      requiredControls: ["usage threshold", "stop condition", "dry-run fallback"],
      manualResolution: "Keep fallback to local dry-run.",
    },
  ];
}

function buildCanaryBoundaryPlan(context: Required<ProviderStagingActivationGateInput>): CanaryBoundaryItem[] {
  return [
    {
      id: "PSAG_CANARY_001",
      label: "Canary allowlist design",
      lane: "canary-boundary",
      canaryScore: clampScore(context.storageRehearsalScore),
      severity: severityFromConcern(100 - context.storageRehearsalScore + context.canaryBoundaryItemCount * 4),
      canaryQuestion: "Can later staging be limited to a controlled allowlist?",
      requiredEvidence: ["limited reviewer group", "board approval", "dry-run fallback"],
      blockedOutcome: "No canary activation in V15.7.",
    },
    {
      id: "PSAG_CANARY_002",
      label: "Canary storage lock",
      lane: "canary-boundary",
      canaryScore: 100,
      severity: "critical",
      canaryQuestion: "Can canary design avoid case storage until storage gates pass?",
      requiredEvidence: ["storage locked", "review locked", "manual conversion locked"],
      blockedOutcome: "No canary storage.",
    },
    {
      id: "PSAG_CANARY_003",
      label: "Canary conversion lock",
      lane: "canary-boundary",
      canaryScore: 100,
      severity: "critical",
      canaryQuestion: "Can canary design avoid task or intervention creation?",
      requiredEvidence: ["conversion locked", "no execution", "manual dispatch only"],
      blockedOutcome: "No canary task or intervention.",
    },
  ];
}

function buildFailureStopPlan(context: Required<ProviderStagingActivationGateInput>): FailureStopPlanItem[] {
  return [
    {
      id: "PSAG_STOP_001",
      label: "Contract failure stop",
      lane: "failure-stop",
      stopScore: clampScore(context.providerShadowScore),
      severity: "elevated",
      stopQuestion: "Can invalid future provider output stop staging flow?",
      safeFallback: "Return to local dry-run and reviewer hold.",
    },
    {
      id: "PSAG_STOP_002",
      label: "Budget failure stop",
      lane: "failure-stop",
      stopScore: clampScore(context.budgetControlScore),
      severity: "critical",
      stopQuestion: "Can budget failure stop all future provider flow?",
      safeFallback: "Stop staging and return to local dry-run.",
    },
    {
      id: "PSAG_STOP_003",
      label: "Review failure stop",
      lane: "failure-stop",
      stopScore: clampScore(context.manualConversionScore),
      severity: "critical",
      stopQuestion: "Can missing human review stop future staging?",
      safeFallback: "Hold for human signoff and block conversion.",
    },
  ];
}

function buildProductionRuntimeLock(): ProductionRuntimeLockItem[] {
  return [
    {
      id: "PSAG_LOCK_001",
      label: "Production provider runtime lock",
      lane: "production-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Production provider runtime remains disabled.",
      blockedOutcome: "productionRuntimeAllowed=false",
    },
    {
      id: "PSAG_LOCK_002",
      label: "Production storage lock",
      lane: "production-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Production AI storage remains disabled.",
      blockedOutcome: "casePersistenceActivationAllowed=false",
    },
    {
      id: "PSAG_LOCK_003",
      label: "Production work conversion lock",
      lane: "production-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Production AI-to-work conversion remains disabled.",
      blockedOutcome: "manualConversionAllowed=false",
    },
  ];
}

function buildGoNoGoBoard(context: Required<ProviderStagingActivationGateInput>): ProviderActivationGoNoGoItem[] {
  return [
    {
      id: "PSAG_GONOGO_001",
      label: "Provider staging activation plan",
      lane: "human-signoff",
      goNoGoState: "design-only",
      score: clampScore(context.providerGatewayScore),
      severity: "watch",
      requiredBeforeGo: ["budget gate", "failure stop", "contract validation", "human signoff"],
      safeOutcome: "Design only in V15.7.",
    },
    {
      id: "PSAG_GONOGO_002",
      label: "Actual provider staging runtime",
      lane: "staging-switch",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate staging release", "provider contract", "budget proof", "rollback proof"],
      safeOutcome: "Blocked in V15.7.",
    },
    {
      id: "PSAG_GONOGO_003",
      label: "Production provider runtime",
      lane: "production-lock",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["controlled beta approval", "provider staging proof", "storage proof", "review proof"],
      safeOutcome: "Production runtime remains locked.",
    },
  ];
}

function buildActivationGates(
  context: Required<ProviderStagingActivationGateInput>,
  sourceNodes: ProviderActivationSourceNode[],
): ProviderActivationGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PSAG_GATE_001",
      label: "Activation gate remains no-runtime",
      lane: "production-lock" as ProviderActivationLane,
      score: 100,
      reviewer: "provider activation reviewer",
      requiredEvidence: ["production runtime lock", "guardrails", "go/no-go board"],
      hardStop: "Do not enable provider staging or production runtime in V15.7.",
    },
    {
      id: "PSAG_GATE_002",
      label: "Runtime boundary is complete enough",
      lane: "runtime-boundary" as ProviderActivationLane,
      score: context.providerGatewayScore - context.runtimeBoundaryItemCount * 3,
      reviewer: "runtime boundary reviewer",
      requiredEvidence: ["backend boundary", "no client runtime", "production lock"],
      hardStop: "Do not proceed without runtime boundary review.",
    },
    {
      id: "PSAG_GATE_003",
      label: "Staging switch plan is complete enough",
      lane: "staging-switch" as ProviderActivationLane,
      score: context.providerGatewayScore - context.stagingSwitchItemCount * 3,
      reviewer: context.activationLeadRole,
      requiredEvidence: ["switch plan", "hold conditions", "dry-run return path"],
      hardStop: "Do not proceed without switch plan review.",
    },
    {
      id: "PSAG_GATE_004",
      label: "Budget gate is complete enough",
      lane: "budget-gate" as ProviderActivationLane,
      score: context.budgetControlScore - context.budgetGateItemCount * 3,
      reviewer: "budget gate reviewer",
      requiredEvidence: ["daily ceiling", "per-case ceiling", "anomaly stop"],
      hardStop: "Do not proceed without budget gate.",
    },
    {
      id: "PSAG_GATE_005",
      label: "Failure stop is complete enough",
      lane: "failure-stop" as ProviderActivationLane,
      score: context.failureStopScore - context.failureStopItemCount * 3,
      reviewer: "failure stop reviewer",
      requiredEvidence: ["contract stop", "budget stop", "review stop"],
      hardStop: "Do not proceed without failure stop plan.",
    },
    {
      id: "PSAG_GATE_006",
      label: "Source blockers are within activation design tolerance",
      lane: "human-signoff" as ProviderActivationLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
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

function buildActivationBoardPack(context: Required<ProviderStagingActivationGateInput>): ProviderActivationBoardPackItem[] {
  return [
    {
      id: "PSAG_PACK_001",
      label: "Runtime boundary packet",
      lane: "runtime-boundary",
      packReady: context.providerGatewayScore >= 65,
      readinessScore: clampScore(context.providerGatewayScore),
      reviewerCheck: "Confirm provider runtime remains boundary-only and no-call.",
      includedSections: ["backend boundary", "no client runtime", "production lock"],
      blockedSections: ["provider call", "production runtime"],
    },
    {
      id: "PSAG_PACK_002",
      label: "Budget and stop packet",
      lane: "budget-gate",
      packReady: context.budgetControlScore >= 60,
      readinessScore: clampScore((context.budgetControlScore + context.failureStopScore) / 2),
      reviewerCheck: "Confirm budget and failure stop are required before later staging.",
      includedSections: ["daily ceiling", "per-case ceiling", "failure stop"],
      blockedSections: ["unbounded staging", "automatic recovery execution"],
    },
    {
      id: "PSAG_PACK_003",
      label: "Production lock packet",
      lane: "production-lock",
      packReady: true,
      readinessScore: 100,
      reviewerCheck: "Confirm production runtime lock remains active.",
      includedSections: ["provider lock", "storage lock", "conversion lock"],
      blockedSections: ["production provider runtime", "AI storage activation", "AI-to-work conversion"],
    },
  ];
}

function buildRiskRegister(
  context: Required<ProviderStagingActivationGateInput>,
  sourceNodes: ProviderActivationSourceNode[],
  gates: ProviderActivationGateItem[],
  goNoGo: ProviderActivationGoNoGoItem[],
): ProviderActivationRiskItem[] {
  const risks: ProviderActivationRiskItem[] = [];

  if (context.openActivationGapCount > 0) {
    risks.push({
      id: "PSAG_RISK_001",
      label: "Open activation gaps",
      lane: "human-signoff",
      severity: context.openActivationGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openActivationGapCount} activation gaps remain before later staging enablement.`,
      manualResolution: "Resolve through later staging release, budget proof and failure stop proof.",
      blocksProviderActivation: true,
    });
  }

  if (context.budgetControlScore < 70) {
    risks.push({
      id: "PSAG_RISK_002",
      label: "Budget gate below threshold",
      lane: "budget-gate",
      severity: "critical",
      reason: "Budget gate is not mature enough for staging activation.",
      manualResolution: "Complete daily, per-case and anomaly controls before later staging.",
      blocksProviderActivation: true,
    });
  }

  if (context.failureStopScore < 70) {
    risks.push({
      id: "PSAG_RISK_003",
      label: "Failure stop below threshold",
      lane: "failure-stop",
      severity: "elevated",
      reason: "Failure stop plan requires more maturity before staging.",
      manualResolution: "Strengthen contract stop, budget stop and review stop.",
      blocksProviderActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `PSAG_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksProviderActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `PSAG_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Provider activation gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksProviderActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      risks.push({
        id: `PSAG_GONOGO_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksProviderActivation: true,
      });
    });

  return risks;
}

export function buildAiProviderStagingActivationGateReport(
  input: ProviderStagingActivationGateInput = {},
): ProviderStagingActivationGateReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const runtimeBoundaryPlan = buildRuntimeBoundaryPlan(context);
  const stagingSwitchPlan = buildStagingSwitchPlan(context);
  const providerRegistryPlan = buildProviderRegistryPlan(context);
  const budgetGatePlan = buildBudgetGatePlan(context);
  const canaryBoundaryPlan = buildCanaryBoundaryPlan(context);
  const failureStopPlan = buildFailureStopPlan(context);
  const productionRuntimeLock = buildProductionRuntimeLock();
  const goNoGoBoard = buildGoNoGoBoard(context);
  const activationGates = buildActivationGates(context, sourceNodes);
  const activationBoardPack = buildActivationBoardPack(context);
  const activationRiskRegister = buildRiskRegister(context, sourceNodes, activationGates, goNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const boundaryAverage =
    runtimeBoundaryPlan.reduce((sum, item) => sum + item.boundaryScore, 0) /
    Math.max(1, runtimeBoundaryPlan.length);

  const budgetAverage =
    budgetGatePlan.reduce((sum, item) => sum + item.budgetScore, 0) /
    Math.max(1, budgetGatePlan.length);

  const gateAverage =
    activationGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, activationGates.length);

  const riskPenalty = activationRiskRegister.filter((item) => item.blocksProviderActivation).length * 7;
  const switchPressure =
    stagingSwitchPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, stagingSwitchPlan.length * 4);

  const activationGateScore = clampScore(
    sourceAverage / 4 +
      boundaryAverage / 4 +
      budgetAverage / 4 +
      gateAverage / 4 +
      switchPressure -
      riskPenalty -
      context.openActivationGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openActivationGapCount * 8 +
        context.runtimeBoundaryItemCount * 5 +
        context.stagingSwitchItemCount * 6 +
        context.budgetGateItemCount * 7 +
        context.failureStopItemCount * 6,
    ),
  );

  const activationGateStatus = bandFromScore(
    activationGateScore,
    activationRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_STAGING_ACTIVATION_GATE_GUARDRAIL,
    activationGateScore,
    activationGateStatus,
    overallSeverity,
    sourceNodes,
    runtimeBoundaryPlan,
    stagingSwitchPlan,
    providerRegistryPlan,
    budgetGatePlan,
    canaryBoundaryPlan,
    failureStopPlan,
    productionRuntimeLock,
    goNoGoBoard,
    activationGates,
    activationBoardPack,
    activationRiskRegister,
    stagedRoadmap: {
      v157: "Provider staging activation gate and production runtime lock only.",
      v158: "Storage rehearsal board with no live migration execution.",
      v159: "Controlled beta readiness board with all operational gates still manual.",
      v160: "Controlled production beta only after provider, storage, review and conversion gates pass.",
      v161: "Post-beta observability and rollback hardening.",
    },
    redactedExportBundle: {
      exportId: "provider_staging_activation_gate_v15_7_redacted_dry_run",
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
        "runtime boundary plan",
        "staging switch plan",
        "provider registry plan",
        "budget gate plan",
        "canary boundary plan",
        "failure stop plan",
        "production runtime lock",
        "go/no-go board",
        "activation gates",
        "board pack",
        "risk register",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider staging activation gate is local dry-run only.",
      "No provider runtime, provider call, registry write, case storage, review storage, task creation, intervention creation or execution is performed.",
      "Production runtime remains locked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V15.7 prepares activation gate design only.",
    ],
  };
}

export const aiProviderStagingActivationGateVersion = "V15.7";
