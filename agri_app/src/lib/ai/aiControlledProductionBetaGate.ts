export type ControlledProductionBetaMode = "dry-run" | "launch-board-review";

export type ControlledProductionBetaSeverity = "info" | "watch" | "elevated" | "critical";

export type ControlledProductionBetaPriority = "low" | "medium" | "high" | "urgent";

export type ControlledProductionBetaReadinessBand =
  | "blocked"
  | "launch-design-ready"
  | "manual-board-review-ready"
  | "zero-activation-plan-ready";

export type ControlledProductionBetaLane =
  | "launch-cutover"
  | "provider-runtime-lock"
  | "storage-runtime-lock"
  | "review-runtime-lock"
  | "conversion-runtime-lock"
  | "observability-tower"
  | "rollback-tower"
  | "human-signoff";

export interface ControlledProductionBetaGuardrail {
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
  productionBetaGateReady: true;
  zeroActivationCutoverReady: true;
  launchRollbackTowerReady: true;
  launchObservabilityTowerReady: true;
}

export interface ControlledProductionBetaInput {
  cutoverItemCount?: number;
  providerLockItemCount?: number;
  storageLockItemCount?: number;
  reviewLockItemCount?: number;
  conversionLockItemCount?: number;
  observabilityItemCount?: number;
  rollbackItemCount?: number;
  openLaunchGapCount?: number;
  onlineReadinessScore?: number;
  betaReadinessScore?: number;
  providerGateScore?: number;
  storageBoardScore?: number;
  reviewWorkflowScore?: number;
  conversionGateScore?: number;
  observabilityScore?: number;
  rollbackScore?: number;
  launchLeadRole?: string;
}

export interface ControlledProductionBetaSourceNode {
  id: string;
  lane: ControlledProductionBetaLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ControlledProductionBetaSeverity;
  priority: ControlledProductionBetaPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface LaunchCutoverItem {
  id: string;
  label: string;
  lane: ControlledProductionBetaLane;
  cutoverScore: number;
  severity: ControlledProductionBetaSeverity;
  cutoverPurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface RuntimeLockItem {
  id: string;
  label: string;
  lane: ControlledProductionBetaLane;
  lockScore: number;
  severity: ControlledProductionBetaSeverity;
  lockRule: string;
  blockedOutcome: string;
}

export interface ObservabilityTowerItem {
  id: string;
  label: string;
  lane: ControlledProductionBetaLane;
  signalScore: number;
  priority: ControlledProductionBetaPriority;
  signalQuestion: string;
  requiredSignals: string[];
  manualResolution: string;
}

export interface RollbackTowerItem {
  id: string;
  label: string;
  lane: ControlledProductionBetaLane;
  rollbackScore: number;
  priority: ControlledProductionBetaPriority;
  rollbackQuestion: string;
  requiredEvidence: string[];
  safeFallback: string;
}

export interface LaunchGoNoGoItem {
  id: string;
  label: string;
  lane: ControlledProductionBetaLane;
  goNoGoState: "no-go" | "design-only" | "zero-activation-ready";
  score: number;
  severity: ControlledProductionBetaSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface LaunchGateItem {
  id: string;
  label: string;
  lane: ControlledProductionBetaLane;
  passed: boolean;
  score: number;
  severity: ControlledProductionBetaSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface LaunchBoardPackItem {
  id: string;
  label: string;
  lane: ControlledProductionBetaLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface LaunchFindingItem {
  id: string;
  label: string;
  lane: ControlledProductionBetaLane;
  severity: ControlledProductionBetaSeverity;
  reason: string;
  manualResolution: string;
  blocksLaunchActivation: boolean;
}

export interface ControlledProductionBetaReport {
  generatedAt: string;
  mode: ControlledProductionBetaMode;
  context: Required<ControlledProductionBetaInput>;
  readiness: ControlledProductionBetaGuardrail;
  launchGateScore: number;
  launchGateStatus: ControlledProductionBetaReadinessBand;
  overallSeverity: ControlledProductionBetaSeverity;
  sourceNodes: ControlledProductionBetaSourceNode[];
  launchCutoverPlan: LaunchCutoverItem[];
  providerRuntimeLocks: RuntimeLockItem[];
  storageRuntimeLocks: RuntimeLockItem[];
  reviewRuntimeLocks: RuntimeLockItem[];
  conversionRuntimeLocks: RuntimeLockItem[];
  observabilityTower: ObservabilityTowerItem[];
  rollbackTower: RollbackTowerItem[];
  goNoGoBoard: LaunchGoNoGoItem[];
  launchGates: LaunchGateItem[];
  launchBoardPack: LaunchBoardPackItem[];
  launchBoardFindings: LaunchFindingItem[];
  stagedRoadmap: {
    v160: string;
    v161: string;
    v162: string;
    v163: string;
    v164: string;
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

export const CONTROLLED_PRODUCTION_BETA_GUARDRAIL: ControlledProductionBetaGuardrail = {
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
  productionBetaGateReady: true,
  zeroActivationCutoverReady: true,
  launchRollbackTowerReady: true,
  launchObservabilityTowerReady: true,
};

const priorityWeight: Record<ControlledProductionBetaPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ControlledProductionBetaInput): Required<ControlledProductionBetaInput> {
  return {
    cutoverItemCount: input.cutoverItemCount ?? 8,
    providerLockItemCount: input.providerLockItemCount ?? 8,
    storageLockItemCount: input.storageLockItemCount ?? 8,
    reviewLockItemCount: input.reviewLockItemCount ?? 7,
    conversionLockItemCount: input.conversionLockItemCount ?? 7,
    observabilityItemCount: input.observabilityItemCount ?? 8,
    rollbackItemCount: input.rollbackItemCount ?? 8,
    openLaunchGapCount: input.openLaunchGapCount ?? 10,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    betaReadinessScore: input.betaReadinessScore ?? 70,
    providerGateScore: input.providerGateScore ?? 70,
    storageBoardScore: input.storageBoardScore ?? 68,
    reviewWorkflowScore: input.reviewWorkflowScore ?? 72,
    conversionGateScore: input.conversionGateScore ?? 68,
    observabilityScore: input.observabilityScore ?? 64,
    rollbackScore: input.rollbackScore ?? 66,
    launchLeadRole: input.launchLeadRole ?? "controlled production beta launch reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ControlledProductionBetaSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ControlledProductionBetaSeverity): ControlledProductionBetaPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ControlledProductionBetaReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-activation-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "launch-design-ready";
}

function buildSourceNode(
  id: string,
  lane: ControlledProductionBetaLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ControlledProductionBetaSourceNode {
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
            "Controlled production beta launch gate remains below activation threshold.",
            "Launch board must resolve cutover, runtime locks, observability and rollback gaps before any later activation release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ControlledProductionBetaInput>): ControlledProductionBetaSourceNode[] {
  const cutoverPressure = context.cutoverItemCount;
  const providerPressure = context.providerLockItemCount;
  const storagePressure = context.storageLockItemCount;
  const observabilityPressure = context.observabilityItemCount * 2;
  const rollbackPressure = context.rollbackItemCount * 2;
  const gapPressure = context.openLaunchGapCount * 2;

  return [
    buildSourceNode(
      "CPBG_NODE_001",
      "launch-cutover",
      "Online readiness baseline",
      "V15.0",
      context.onlineReadinessScore,
      context.betaReadinessScore,
      cutoverPressure,
      "Confirm live app remains stable while beta activation stays locked.",
    ),
    buildSourceNode(
      "CPBG_NODE_002",
      "provider-runtime-lock",
      "Provider activation gate",
      "V15.7",
      context.providerGateScore,
      context.betaReadinessScore,
      providerPressure,
      "Confirm provider runtime remains locked.",
    ),
    buildSourceNode(
      "CPBG_NODE_003",
      "storage-runtime-lock",
      "Storage rehearsal board",
      "V15.8",
      context.storageBoardScore,
      context.betaReadinessScore,
      storagePressure,
      "Confirm storage and live migration remain locked.",
    ),
    buildSourceNode(
      "CPBG_NODE_004",
      "review-runtime-lock",
      "Persistent human review workflow",
      "V15.3",
      context.reviewWorkflowScore,
      context.betaReadinessScore,
      gapPressure,
      "Confirm human review remains mandatory and non-persistent in this release.",
    ),
    buildSourceNode(
      "CPBG_NODE_005",
      "conversion-runtime-lock",
      "Manual conversion rehearsal",
      "V15.6",
      context.conversionGateScore,
      context.betaReadinessScore,
      gapPressure,
      "Confirm task and intervention creation remain locked.",
    ),
    buildSourceNode(
      "CPBG_NODE_006",
      "observability-tower",
      "Beta readiness observability",
      "V15.9",
      context.observabilityScore,
      context.rollbackScore,
      observabilityPressure,
      "Confirm observability plan before any later activation.",
    ),
    buildSourceNode(
      "CPBG_NODE_007",
      "rollback-tower",
      "Beta readiness rollback",
      "V15.9",
      context.rollbackScore,
      context.onlineReadinessScore,
      rollbackPressure,
      "Confirm rollback tower before any later activation.",
    ),
    buildSourceNode(
      "CPBG_NODE_008",
      "human-signoff",
      "Launch board signoff",
      "V16.0",
      context.betaReadinessScore,
      context.rollbackScore,
      gapPressure,
      "Keep launch blocked until a separate explicit activation release.",
    ),
  ];
}

function buildLaunchCutoverPlan(context: Required<ControlledProductionBetaInput>): LaunchCutoverItem[] {
  return [
    {
      id: "CPBG_CUTOVER_001",
      label: "Zero-activation cutover plan",
      lane: "launch-cutover",
      cutoverScore: 100,
      severity: "critical",
      cutoverPurpose: "Define a cutover plan that changes no runtime state.",
      requiredEvidence: ["zeroActivationMode=true", "controlledBetaAllowed=false", "productionRuntimeAllowed=false"],
      blockedOutcome: "No beta activation in V16.0.",
    },
    {
      id: "CPBG_CUTOVER_002",
      label: "Manual launch board plan",
      lane: "launch-cutover",
      cutoverScore: clampScore(context.betaReadinessScore),
      severity: severityFromConcern(100 - context.betaReadinessScore + context.cutoverItemCount * 4),
      cutoverPurpose: "Define board review before any later activation.",
      requiredEvidence: ["provider gate", "storage gate", "review gate", "rollback tower"],
      blockedOutcome: "No launch without later explicit approval.",
    },
    {
      id: "CPBG_CUTOVER_003",
      label: "Return to dry-run plan",
      lane: "launch-cutover",
      cutoverScore: clampScore(context.rollbackScore),
      severity: "elevated",
      cutoverPurpose: "Define fallback to existing dry-run posture.",
      requiredEvidence: ["rollback checkpoint", "release gate", "manual note"],
      blockedOutcome: "No automatic cutover action.",
    },
  ];
}

function buildRuntimeLocks(context: Required<ControlledProductionBetaInput>): {
  providerRuntimeLocks: RuntimeLockItem[];
  storageRuntimeLocks: RuntimeLockItem[];
  reviewRuntimeLocks: RuntimeLockItem[];
  conversionRuntimeLocks: RuntimeLockItem[];
} {
  return {
    providerRuntimeLocks: [
      {
        id: "CPBG_PROVIDER_LOCK_001",
        label: "Provider runtime lock",
        lane: "provider-runtime-lock",
        lockScore: 100,
        severity: "critical",
        lockRule: "Provider calls remain disabled.",
        blockedOutcome: "providerCallAllowed=false",
      },
      {
        id: "CPBG_PROVIDER_LOCK_002",
        label: "Production provider lock",
        lane: "provider-runtime-lock",
        lockScore: 100,
        severity: "critical",
        lockRule: "Production AI runtime remains disabled.",
        blockedOutcome: "productionRuntimeAllowed=false",
      },
      {
        id: "CPBG_PROVIDER_LOCK_003",
        label: "Provider registry write lock",
        lane: "provider-runtime-lock",
        lockScore: clampScore(context.providerGateScore),
        severity: "elevated",
        lockRule: "Provider registry changes remain blocked.",
        blockedOutcome: "providerRegistryWriteAllowed=false",
      },
    ],
    storageRuntimeLocks: [
      {
        id: "CPBG_STORAGE_LOCK_001",
        label: "Storage activation lock",
        lane: "storage-runtime-lock",
        lockScore: 100,
        severity: "critical",
        lockRule: "AI storage activation remains disabled.",
        blockedOutcome: "storageActivationAllowed=false",
      },
      {
        id: "CPBG_STORAGE_LOCK_002",
        label: "Live migration lock",
        lane: "storage-runtime-lock",
        lockScore: 100,
        severity: "critical",
        lockRule: "Live migration execution remains disabled.",
        blockedOutcome: "liveMigrationExecutionAllowed=false",
      },
      {
        id: "CPBG_STORAGE_LOCK_003",
        label: "Schema write lock",
        lane: "storage-runtime-lock",
        lockScore: 100,
        severity: "critical",
        lockRule: "Schema writes remain disabled.",
        blockedOutcome: "schemaWriteAllowed=false",
      },
    ],
    reviewRuntimeLocks: [
      {
        id: "CPBG_REVIEW_LOCK_001",
        label: "Review persistence lock",
        lane: "review-runtime-lock",
        lockScore: 100,
        severity: "critical",
        lockRule: "Review persistence remains disabled.",
        blockedOutcome: "reviewPersistenceAllowed=false",
      },
      {
        id: "CPBG_REVIEW_LOCK_002",
        label: "Human review requirement lock",
        lane: "review-runtime-lock",
        lockScore: 100,
        severity: "critical",
        lockRule: "Human review remains mandatory.",
        blockedOutcome: "humanReviewRequired=true",
      },
    ],
    conversionRuntimeLocks: [
      {
        id: "CPBG_CONVERSION_LOCK_001",
        label: "Task creation lock",
        lane: "conversion-runtime-lock",
        lockScore: 100,
        severity: "critical",
        lockRule: "AI cannot create tasks.",
        blockedOutcome: "taskCreated=false",
      },
      {
        id: "CPBG_CONVERSION_LOCK_002",
        label: "Intervention creation lock",
        lane: "conversion-runtime-lock",
        lockScore: 100,
        severity: "critical",
        lockRule: "AI cannot create interventions.",
        blockedOutcome: "interventionCreated=false",
      },
      {
        id: "CPBG_CONVERSION_LOCK_003",
        label: "Execution and prescription lock",
        lane: "conversion-runtime-lock",
        lockScore: 100,
        severity: "critical",
        lockRule: "AI cannot execute, prescribe products or suggest dosage.",
        blockedOutcome: "automaticExecutionAllowed=false",
      },
    ],
  };
}

function buildObservabilityTower(context: Required<ControlledProductionBetaInput>): ObservabilityTowerItem[] {
  return [
    {
      id: "CPBG_OBS_001",
      label: "Provider signal tower",
      lane: "observability-tower",
      signalScore: clampScore(context.observabilityScore),
      priority: context.observabilityScore < 70 ? "urgent" : "high",
      signalQuestion: "Can provider attempts be observed before later activation?",
      requiredSignals: ["attempt state", "contract result", "stop reason", "review hold"],
      manualResolution: "Define provider signals before later activation.",
    },
    {
      id: "CPBG_OBS_002",
      label: "Storage signal tower",
      lane: "observability-tower",
      signalScore: clampScore(context.storageBoardScore),
      priority: "high",
      signalQuestion: "Can storage gates be observed before later activation?",
      requiredSignals: ["storage gate", "restore validation", "retention check"],
      manualResolution: "Keep storage locked until visibility is mature.",
    },
    {
      id: "CPBG_OBS_003",
      label: "Conversion signal tower",
      lane: "observability-tower",
      signalScore: clampScore(context.conversionGateScore),
      priority: "high",
      signalQuestion: "Can future conversion decisions be observed?",
      requiredSignals: ["preview state", "reviewer reason", "correction path"],
      manualResolution: "Keep conversion locked until visibility is mature.",
    },
  ];
}

function buildRollbackTower(context: Required<ControlledProductionBetaInput>): RollbackTowerItem[] {
  return [
    {
      id: "CPBG_ROLLBACK_001",
      label: "Launch rollback tower",
      lane: "rollback-tower",
      rollbackScore: clampScore(context.rollbackScore),
      priority: context.rollbackScore < 75 ? "urgent" : "high",
      rollbackQuestion: "Can a later activation return to the current safe release?",
      requiredEvidence: ["rollback branch", "tag checkpoint", "release gate", "manual board note"],
      safeFallback: "Return to zero-activation dry-run posture.",
    },
    {
      id: "CPBG_ROLLBACK_002",
      label: "Provider rollback tower",
      lane: "rollback-tower",
      rollbackScore: clampScore(context.providerGateScore),
      priority: "high",
      rollbackQuestion: "Can provider paths be disabled in a later activation release?",
      requiredEvidence: ["runtime lock", "failure stop", "dry-run fallback"],
      safeFallback: "Disable provider path and keep local reports only.",
    },
    {
      id: "CPBG_ROLLBACK_003",
      label: "Storage rollback tower",
      lane: "rollback-tower",
      rollbackScore: clampScore(context.storageBoardScore),
      priority: "urgent",
      rollbackQuestion: "Can later storage work be reverted safely?",
      requiredEvidence: ["backup proof", "restore proof", "migration lock"],
      safeFallback: "Storage remains disabled in V16.0.",
    },
  ];
}

function buildGoNoGoBoard(): LaunchGoNoGoItem[] {
  return [
    {
      id: "CPBG_GONOGO_001",
      label: "Zero-activation launch gate",
      lane: "human-signoff",
      goNoGoState: "zero-activation-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["guardrails", "runtime locks", "manual board note"],
      safeOutcome: "Only launch gate design is allowed.",
    },
    {
      id: "CPBG_GONOGO_002",
      label: "Controlled production beta activation",
      lane: "launch-cutover",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate activation release", "provider proof", "storage proof", "rollback proof"],
      safeOutcome: "Activation remains blocked in V16.0.",
    },
    {
      id: "CPBG_GONOGO_003",
      label: "Automatic agronomic operations",
      lane: "conversion-runtime-lock",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate operations release", "human approval", "manual dispatch policy"],
      safeOutcome: "Automation remains blocked.",
    },
  ];
}

function buildLaunchGates(
  context: Required<ControlledProductionBetaInput>,
  sourceNodes: ControlledProductionBetaSourceNode[],
): LaunchGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "CPBG_GATE_001",
      label: "Launch gate remains zero-activation",
      lane: "launch-cutover" as ControlledProductionBetaLane,
      score: 100,
      reviewer: "controlled production beta reviewer",
      requiredEvidence: ["zeroActivationMode=true", "productionBetaAllowed=false", "providerCalled=false"],
      hardStop: "Do not activate beta in V16.0.",
    },
    {
      id: "CPBG_GATE_002",
      label: "Provider runtime locks are complete enough",
      lane: "provider-runtime-lock" as ControlledProductionBetaLane,
      score: context.providerGateScore - context.providerLockItemCount * 3,
      reviewer: "provider runtime reviewer",
      requiredEvidence: ["provider lock", "runtime lock", "registry write lock"],
      hardStop: "Do not proceed without provider runtime lock review.",
    },
    {
      id: "CPBG_GATE_003",
      label: "Storage runtime locks are complete enough",
      lane: "storage-runtime-lock" as ControlledProductionBetaLane,
      score: context.storageBoardScore - context.storageLockItemCount * 3,
      reviewer: "storage runtime reviewer",
      requiredEvidence: ["storage lock", "migration lock", "schema write lock"],
      hardStop: "Do not proceed without storage runtime lock review.",
    },
    {
      id: "CPBG_GATE_004",
      label: "Observability tower is complete enough",
      lane: "observability-tower" as ControlledProductionBetaLane,
      score: context.observabilityScore - context.observabilityItemCount * 3,
      reviewer: "observability reviewer",
      requiredEvidence: ["provider signals", "storage signals", "conversion signals"],
      hardStop: "Do not proceed without observability tower.",
    },
    {
      id: "CPBG_GATE_005",
      label: "Rollback tower is complete enough",
      lane: "rollback-tower" as ControlledProductionBetaLane,
      score: context.rollbackScore - context.rollbackItemCount * 3,
      reviewer: context.launchLeadRole,
      requiredEvidence: ["rollback branch", "tag checkpoint", "dry-run fallback"],
      hardStop: "Do not proceed without rollback tower.",
    },
    {
      id: "CPBG_GATE_006",
      label: "Source blockers are within launch board tolerance",
      lane: "human-signoff" as ControlledProductionBetaLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before zero-activation-plan-ready state.",
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

function buildBoardPack(context: Required<ControlledProductionBetaInput>): LaunchBoardPackItem[] {
  return [
    {
      id: "CPBG_PACK_001",
      label: "Launch cutover packet",
      lane: "launch-cutover",
      packReady: true,
      readinessScore: 100,
      reviewerCheck: "Confirm V16.0 performs no activation.",
      includedSections: ["zero-activation plan", "manual board note", "runtime locks"],
      blockedSections: ["beta activation", "provider runtime", "storage activation"],
    },
    {
      id: "CPBG_PACK_002",
      label: "Runtime lock packet",
      lane: "provider-runtime-lock",
      packReady: context.providerGateScore >= 65 && context.storageBoardScore >= 65,
      readinessScore: clampScore((context.providerGateScore + context.storageBoardScore) / 2),
      reviewerCheck: "Confirm provider and storage remain locked.",
      includedSections: ["provider locks", "storage locks", "review locks", "conversion locks"],
      blockedSections: ["provider call", "case storage", "work creation"],
    },
    {
      id: "CPBG_PACK_003",
      label: "Observability rollback packet",
      lane: "rollback-tower",
      packReady: context.observabilityScore >= 60 && context.rollbackScore >= 60,
      readinessScore: clampScore((context.observabilityScore + context.rollbackScore) / 2),
      reviewerCheck: "Confirm observability and rollback are required before later activation.",
      includedSections: ["signals", "rollback tower", "dry-run fallback"],
      blockedSections: ["unobservable activation", "irreversible cutover"],
    },
  ];
}

function buildFindings(
  context: Required<ControlledProductionBetaInput>,
  sourceNodes: ControlledProductionBetaSourceNode[],
  gates: LaunchGateItem[],
  goNoGo: LaunchGoNoGoItem[],
): LaunchFindingItem[] {
  const findings: LaunchFindingItem[] = [];

  if (context.openLaunchGapCount > 0) {
    findings.push({
      id: "CPBG_FINDING_001",
      label: "Open launch readiness gaps",
      lane: "human-signoff",
      severity: context.openLaunchGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openLaunchGapCount} launch readiness gaps remain before any later activation.`,
      manualResolution: "Resolve runtime, observability and rollback gaps in later gated releases.",
      blocksLaunchActivation: true,
    });
  }

  if (context.observabilityScore < 70) {
    findings.push({
      id: "CPBG_FINDING_002",
      label: "Observability tower below threshold",
      lane: "observability-tower",
      severity: "critical",
      reason: "Observability is not mature enough for production beta activation.",
      manualResolution: "Complete provider, storage and conversion signal plan.",
      blocksLaunchActivation: true,
    });
  }

  if (context.rollbackScore < 70) {
    findings.push({
      id: "CPBG_FINDING_003",
      label: "Rollback tower below threshold",
      lane: "rollback-tower",
      severity: "critical",
      reason: "Rollback readiness is not mature enough for production beta activation.",
      manualResolution: "Complete rollback branch, tag checkpoint and dry-run fallback proof.",
      blocksLaunchActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `CPBG_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksLaunchActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `CPBG_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Launch gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksLaunchActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `CPBG_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksLaunchActivation: true,
      });
    });

  return findings;
}

export function buildAiControlledProductionBetaGateReport(
  input: ControlledProductionBetaInput = {},
): ControlledProductionBetaReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const launchCutoverPlan = buildLaunchCutoverPlan(context);
  const runtimeLocks = buildRuntimeLocks(context);
  const observabilityTower = buildObservabilityTower(context);
  const rollbackTower = buildRollbackTower(context);
  const goNoGoBoard = buildGoNoGoBoard();
  const launchGates = buildLaunchGates(context, sourceNodes);
  const launchBoardPack = buildBoardPack(context);
  const launchBoardFindings = buildFindings(context, sourceNodes, launchGates, goNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const cutoverAverage =
    launchCutoverPlan.reduce((sum, item) => sum + item.cutoverScore, 0) /
    Math.max(1, launchCutoverPlan.length);

  const observabilityAverage =
    observabilityTower.reduce((sum, item) => sum + item.signalScore, 0) /
    Math.max(1, observabilityTower.length);

  const gateAverage =
    launchGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, launchGates.length);

  const findingPenalty = launchBoardFindings.filter((item) => item.blocksLaunchActivation).length * 7;
  const rollbackPressure =
    rollbackTower.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, rollbackTower.length * 4);

  const launchGateScore = clampScore(
    sourceAverage / 4 +
      cutoverAverage / 4 +
      observabilityAverage / 4 +
      gateAverage / 4 +
      rollbackPressure -
      findingPenalty -
      context.openLaunchGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openLaunchGapCount * 8 +
        context.cutoverItemCount * 5 +
        context.observabilityItemCount * 6 +
        context.rollbackItemCount * 6,
    ),
  );

  const launchGateStatus = bandFromScore(
    launchGateScore,
    launchBoardFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: CONTROLLED_PRODUCTION_BETA_GUARDRAIL,
    launchGateScore,
    launchGateStatus,
    overallSeverity,
    sourceNodes,
    launchCutoverPlan,
    providerRuntimeLocks: runtimeLocks.providerRuntimeLocks,
    storageRuntimeLocks: runtimeLocks.storageRuntimeLocks,
    reviewRuntimeLocks: runtimeLocks.reviewRuntimeLocks,
    conversionRuntimeLocks: runtimeLocks.conversionRuntimeLocks,
    observabilityTower,
    rollbackTower,
    goNoGoBoard,
    launchGates,
    launchBoardPack,
    launchBoardFindings,
    stagedRoadmap: {
      v160: "Controlled production beta launch gate with zero activation.",
      v161: "Post-beta observability and rollback hardening, still manual unless explicitly enabled.",
      v162: "Operational audit package and compliance export hardening.",
      v163: "Human-supervised agronomic operations cockpit.",
      v164: "Staged provider runtime beta only after explicit activation approval.",
    },
    redactedExportBundle: {
      exportId: "controlled_production_beta_gate_v16_0_redacted_dry_run",
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
        "launch cutover plan",
        "runtime locks",
        "observability tower",
        "rollback tower",
        "go/no-go board",
        "launch gates",
        "board pack",
        "board findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Controlled production beta gate is local dry-run only.",
      "No beta activation, provider call, storage activation, review storage, task creation, intervention creation or execution is performed.",
      "Zero-activation mode remains true.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V16.0 prepares launch governance only.",
    ],
  };
}

export const aiControlledProductionBetaGateVersion = "V16.0";
