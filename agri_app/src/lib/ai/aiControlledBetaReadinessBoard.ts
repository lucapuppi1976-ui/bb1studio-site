export type ControlledBetaReadinessMode = "dry-run" | "beta-board-review";

export type ControlledBetaSeverity = "info" | "watch" | "elevated" | "critical";

export type ControlledBetaPriority = "low" | "medium" | "high" | "urgent";

export type ControlledBetaReadinessBand =
  | "blocked"
  | "board-design-ready"
  | "manual-gate-review-ready"
  | "beta-plan-ready";

export type ControlledBetaLane =
  | "provider-gate"
  | "storage-gate"
  | "review-gate"
  | "conversion-gate"
  | "observability-gate"
  | "rollback-gate"
  | "manual-only-boundary"
  | "human-signoff";

export interface ControlledBetaReadinessGuardrail {
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
  betaReadinessBoardReady: true;
  manualOnlyOperationalGateReady: true;
  rollbackReadinessReady: true;
  observabilityPlanReady: true;
}

export interface ControlledBetaReadinessInput {
  providerGateItemCount?: number;
  storageGateItemCount?: number;
  reviewGateItemCount?: number;
  conversionGateItemCount?: number;
  observabilityItemCount?: number;
  rollbackItemCount?: number;
  openBetaGapCount?: number;
  onlineReadinessScore?: number;
  providerGateScore?: number;
  storageBoardScore?: number;
  reviewWorkflowScore?: number;
  manualConversionScore?: number;
  observabilityScore?: number;
  rollbackScore?: number;
  betaLeadRole?: string;
}

export interface ControlledBetaSourceNode {
  id: string;
  lane: ControlledBetaLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ControlledBetaSeverity;
  priority: ControlledBetaPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ProviderBetaGateItem {
  id: string;
  label: string;
  lane: ControlledBetaLane;
  gateScore: number;
  severity: ControlledBetaSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface StorageBetaGateItem {
  id: string;
  label: string;
  lane: ControlledBetaLane;
  gateScore: number;
  severity: ControlledBetaSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ReviewBetaGateItem {
  id: string;
  label: string;
  lane: ControlledBetaLane;
  gateScore: number;
  priority: ControlledBetaPriority;
  reviewQuestion: string;
  requiredEvidence: string[];
  reviewerAction: string;
}

export interface ConversionBetaGateItem {
  id: string;
  label: string;
  lane: ControlledBetaLane;
  gateScore: number;
  severity: ControlledBetaSeverity;
  conversionQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ObservabilityReadinessItem {
  id: string;
  label: string;
  lane: ControlledBetaLane;
  observabilityScore: number;
  severity: ControlledBetaSeverity;
  observabilityQuestion: string;
  requiredSignals: string[];
  manualResolution: string;
}

export interface RollbackReadinessItem {
  id: string;
  label: string;
  lane: ControlledBetaLane;
  rollbackScore: number;
  priority: ControlledBetaPriority;
  rollbackQuestion: string;
  requiredEvidence: string[];
  safeFallback: string;
}

export interface ManualOnlyBoundaryItem {
  id: string;
  label: string;
  lane: ControlledBetaLane;
  boundaryScore: number;
  severity: ControlledBetaSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface ControlledBetaGoNoGoItem {
  id: string;
  label: string;
  lane: ControlledBetaLane;
  goNoGoState: "no-go" | "design-only" | "manual-board-ready";
  score: number;
  severity: ControlledBetaSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface ControlledBetaBoardGateItem {
  id: string;
  label: string;
  lane: ControlledBetaLane;
  passed: boolean;
  score: number;
  severity: ControlledBetaSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ControlledBetaBoardPackItem {
  id: string;
  label: string;
  lane: ControlledBetaLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ControlledBetaFindingItem {
  id: string;
  label: string;
  lane: ControlledBetaLane;
  severity: ControlledBetaSeverity;
  reason: string;
  manualResolution: string;
  blocksBetaActivation: boolean;
}

export interface ControlledBetaReadinessReport {
  generatedAt: string;
  mode: ControlledBetaReadinessMode;
  context: Required<ControlledBetaReadinessInput>;
  readiness: ControlledBetaReadinessGuardrail;
  betaBoardScore: number;
  betaBoardStatus: ControlledBetaReadinessBand;
  overallSeverity: ControlledBetaSeverity;
  sourceNodes: ControlledBetaSourceNode[];
  providerGatePlan: ProviderBetaGateItem[];
  storageGatePlan: StorageBetaGateItem[];
  reviewGatePlan: ReviewBetaGateItem[];
  conversionGatePlan: ConversionBetaGateItem[];
  observabilityPlan: ObservabilityReadinessItem[];
  rollbackPlan: RollbackReadinessItem[];
  manualOnlyBoundary: ManualOnlyBoundaryItem[];
  goNoGoBoard: ControlledBetaGoNoGoItem[];
  betaBoardGates: ControlledBetaBoardGateItem[];
  betaBoardPack: ControlledBetaBoardPackItem[];
  betaBoardFindings: ControlledBetaFindingItem[];
  stagedRoadmap: {
    v159: string;
    v160: string;
    v161: string;
    v162: string;
    v163: string;
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

export const CONTROLLED_BETA_READINESS_GUARDRAIL: ControlledBetaReadinessGuardrail = {
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
  betaReadinessBoardReady: true,
  manualOnlyOperationalGateReady: true,
  rollbackReadinessReady: true,
  observabilityPlanReady: true,
};

const priorityWeight: Record<ControlledBetaPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ControlledBetaReadinessInput): Required<ControlledBetaReadinessInput> {
  return {
    providerGateItemCount: input.providerGateItemCount ?? 8,
    storageGateItemCount: input.storageGateItemCount ?? 8,
    reviewGateItemCount: input.reviewGateItemCount ?? 7,
    conversionGateItemCount: input.conversionGateItemCount ?? 7,
    observabilityItemCount: input.observabilityItemCount ?? 7,
    rollbackItemCount: input.rollbackItemCount ?? 7,
    openBetaGapCount: input.openBetaGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 82,
    providerGateScore: input.providerGateScore ?? 70,
    storageBoardScore: input.storageBoardScore ?? 68,
    reviewWorkflowScore: input.reviewWorkflowScore ?? 72,
    manualConversionScore: input.manualConversionScore ?? 68,
    observabilityScore: input.observabilityScore ?? 62,
    rollbackScore: input.rollbackScore ?? 66,
    betaLeadRole: input.betaLeadRole ?? "controlled beta readiness reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ControlledBetaSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ControlledBetaSeverity): ControlledBetaPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ControlledBetaReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "beta-plan-ready";
  if (score >= 74) return "manual-gate-review-ready";
  return "board-design-ready";
}

function buildSourceNode(
  id: string,
  lane: ControlledBetaLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ControlledBetaSourceNode {
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
            "Controlled beta readiness board remains below activation threshold.",
            "Beta board must resolve provider, storage, review, conversion, observability and rollback gaps before any later beta.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ControlledBetaReadinessInput>): ControlledBetaSourceNode[] {
  const providerPressure = context.providerGateItemCount;
  const storagePressure = context.storageGateItemCount;
  const reviewPressure = context.reviewGateItemCount;
  const conversionPressure = context.conversionGateItemCount;
  const observabilityPressure = context.observabilityItemCount * 2;
  const gapPressure = context.openBetaGapCount * 2;

  return [
    buildSourceNode(
      "CBRB_NODE_001",
      "provider-gate",
      "Provider staging activation gate",
      "V15.7",
      context.providerGateScore,
      context.onlineReadinessScore,
      providerPressure,
      "Confirm provider activation remains locked in beta readiness design.",
    ),
    buildSourceNode(
      "CBRB_NODE_002",
      "storage-gate",
      "Storage rehearsal board",
      "V15.8",
      context.storageBoardScore,
      context.reviewWorkflowScore,
      storagePressure,
      "Confirm storage and live migration remain locked.",
    ),
    buildSourceNode(
      "CBRB_NODE_003",
      "review-gate",
      "Persistent human review workflow",
      "V15.3",
      context.reviewWorkflowScore,
      context.manualConversionScore,
      reviewPressure,
      "Confirm human review stays mandatory and non-persistent in this version.",
    ),
    buildSourceNode(
      "CBRB_NODE_004",
      "conversion-gate",
      "Manual conversion rehearsal",
      "V15.6",
      context.manualConversionScore,
      context.reviewWorkflowScore,
      conversionPressure,
      "Confirm task and intervention creation remain blocked.",
    ),
    buildSourceNode(
      "CBRB_NODE_005",
      "observability-gate",
      "Observability readiness",
      "V15.9",
      context.observabilityScore,
      context.rollbackScore,
      observabilityPressure,
      "Define observability plan before any later beta.",
    ),
    buildSourceNode(
      "CBRB_NODE_006",
      "rollback-gate",
      "Rollback readiness",
      "V15.9",
      context.rollbackScore,
      context.onlineReadinessScore,
      context.rollbackItemCount * 2,
      "Confirm rollback proof is required before any later beta.",
    ),
    buildSourceNode(
      "CBRB_NODE_007",
      "manual-only-boundary",
      "Manual-only boundary",
      "V15.9",
      100,
      context.reviewWorkflowScore,
      gapPressure,
      "Keep all operational routes manual, reviewed and blocked from automation.",
    ),
    buildSourceNode(
      "CBRB_NODE_008",
      "human-signoff",
      "Human beta board signoff",
      "V15.9",
      context.reviewWorkflowScore,
      context.rollbackScore,
      gapPressure,
      "Keep controlled beta activation blocked until board signoff in a separate later release.",
    ),
  ];
}

function buildProviderGatePlan(context: Required<ControlledBetaReadinessInput>): ProviderBetaGateItem[] {
  return [
    {
      id: "CBRB_PROVIDER_001",
      label: "Provider activation lock",
      lane: "provider-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep provider activation disabled in V15.9.",
      requiredEvidence: ["providerActivationAllowed=false", "providerCalled=false", "productionRuntimeAllowed=false"],
      blockedOutcome: "No provider call.",
    },
    {
      id: "CBRB_PROVIDER_002",
      label: "Provider staging plan review",
      lane: "provider-gate",
      gateScore: clampScore(context.providerGateScore),
      severity: severityFromConcern(100 - context.providerGateScore + context.providerGateItemCount * 4),
      gatePurpose: "Review provider staging plan readiness without enabling it.",
      requiredEvidence: ["runtime boundary", "budget gate", "failure stop", "human signoff"],
      blockedOutcome: "No staging runtime.",
    },
    {
      id: "CBRB_PROVIDER_003",
      label: "Provider production lock",
      lane: "provider-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep production AI runtime locked.",
      requiredEvidence: ["productionRuntimeAllowed=false", "productionRuntimePerformed=false"],
      blockedOutcome: "No production runtime.",
    },
  ];
}

function buildStorageGatePlan(context: Required<ControlledBetaReadinessInput>): StorageBetaGateItem[] {
  return [
    {
      id: "CBRB_STORAGE_001",
      label: "Storage activation lock",
      lane: "storage-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep AI storage disabled in V15.9.",
      requiredEvidence: ["storageActivationAllowed=false", "casePersistencePerformed=false", "schemaWritePerformed=false"],
      blockedOutcome: "No storage activation.",
    },
    {
      id: "CBRB_STORAGE_002",
      label: "Live migration lock",
      lane: "storage-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep live migration disabled.",
      requiredEvidence: ["liveMigrationExecutionAllowed=false", "migrationExecutionPerformed=false"],
      blockedOutcome: "No migration execution.",
    },
    {
      id: "CBRB_STORAGE_003",
      label: "Storage board maturity review",
      lane: "storage-gate",
      gateScore: clampScore(context.storageBoardScore),
      severity: "elevated",
      gatePurpose: "Review storage board maturity before any later beta.",
      requiredEvidence: ["restore validation", "retention control", "audit replay"],
      blockedOutcome: "No case or review storage.",
    },
  ];
}

function buildReviewGatePlan(context: Required<ControlledBetaReadinessInput>): ReviewBetaGateItem[] {
  return [
    {
      id: "CBRB_REVIEW_001",
      label: "Human review required",
      lane: "review-gate",
      gateScore: 100,
      priority: "urgent",
      reviewQuestion: "Is human review required before any later operational use?",
      requiredEvidence: ["humanReviewRequired=true", "manualDispatchOnly=true"],
      reviewerAction: "Keep review mandatory.",
    },
    {
      id: "CBRB_REVIEW_002",
      label: "Review persistence lock",
      lane: "review-gate",
      gateScore: 100,
      priority: "urgent",
      reviewQuestion: "Does V15.9 keep review persistence disabled?",
      requiredEvidence: ["reviewPersistenceAllowed=false", "reviewPersistencePerformed=false"],
      reviewerAction: "Keep review persistence locked.",
    },
    {
      id: "CBRB_REVIEW_003",
      label: "Reviewer reason plan",
      lane: "review-gate",
      gateScore: clampScore(context.reviewWorkflowScore),
      priority: "high",
      reviewQuestion: "Is reviewer rationale mature enough for a later beta design?",
      requiredEvidence: ["review state", "reviewer reason", "audit replay"],
      reviewerAction: "Require board signoff before later beta.",
    },
  ];
}

function buildConversionGatePlan(context: Required<ControlledBetaReadinessInput>): ConversionBetaGateItem[] {
  return [
    {
      id: "CBRB_CONVERSION_001",
      label: "Task creation lock",
      lane: "conversion-gate",
      gateScore: 100,
      severity: "critical",
      conversionQuestion: "Can AI output create tasks in V15.9?",
      requiredEvidence: ["taskCreated=false", "automaticTaskCreationAllowed=false"],
      blockedOutcome: "No task creation.",
    },
    {
      id: "CBRB_CONVERSION_002",
      label: "Intervention creation lock",
      lane: "conversion-gate",
      gateScore: 100,
      severity: "critical",
      conversionQuestion: "Can AI output create interventions in V15.9?",
      requiredEvidence: ["interventionCreated=false", "automaticInterventionCreationAllowed=false"],
      blockedOutcome: "No intervention creation.",
    },
    {
      id: "CBRB_CONVERSION_003",
      label: "Manual conversion maturity review",
      lane: "conversion-gate",
      gateScore: clampScore(context.manualConversionScore),
      severity: "elevated",
      conversionQuestion: "Is manual conversion rehearsal mature enough for later board review?",
      requiredEvidence: ["preview only", "non-execution certificate", "correction path"],
      blockedOutcome: "No manual conversion activation.",
    },
  ];
}

function buildObservabilityPlan(context: Required<ControlledBetaReadinessInput>): ObservabilityReadinessItem[] {
  return [
    {
      id: "CBRB_OBS_001",
      label: "Provider event visibility",
      lane: "observability-gate",
      observabilityScore: clampScore(context.observabilityScore),
      severity: severityFromConcern(100 - context.observabilityScore + context.observabilityItemCount * 4),
      observabilityQuestion: "Can provider events be observed before later beta?",
      requiredSignals: ["attempt state", "contract result", "failure stop", "review hold"],
      manualResolution: "Define observability plan before any later beta.",
    },
    {
      id: "CBRB_OBS_002",
      label: "Storage event visibility",
      lane: "observability-gate",
      observabilityScore: clampScore(context.storageBoardScore),
      severity: "elevated",
      observabilityQuestion: "Can future storage events be reviewed and replayed?",
      requiredSignals: ["storage gate", "restore proof", "retention proof"],
      manualResolution: "Keep storage disabled until event visibility is mature.",
    },
    {
      id: "CBRB_OBS_003",
      label: "Conversion event visibility",
      lane: "observability-gate",
      observabilityScore: clampScore(context.manualConversionScore),
      severity: "elevated",
      observabilityQuestion: "Can future conversion previews be audited?",
      requiredSignals: ["preview state", "reviewer reason", "correction path"],
      manualResolution: "Keep conversion disabled until audit visibility is mature.",
    },
  ];
}

function buildRollbackPlan(context: Required<ControlledBetaReadinessInput>): RollbackReadinessItem[] {
  return [
    {
      id: "CBRB_ROLLBACK_001",
      label: "Beta rollback plan",
      lane: "rollback-gate",
      rollbackScore: clampScore(context.rollbackScore),
      priority: context.rollbackScore < 75 ? "urgent" : "high",
      rollbackQuestion: "Can a later controlled beta return to safe dry-run state?",
      requiredEvidence: ["rollback branch", "tag checkpoint", "release gate", "manual board note"],
      safeFallback: "Return to local dry-run and keep all operational locks active.",
    },
    {
      id: "CBRB_ROLLBACK_002",
      label: "Provider rollback path",
      lane: "rollback-gate",
      rollbackScore: clampScore(context.providerGateScore),
      priority: "high",
      rollbackQuestion: "Can provider staging be disabled immediately in a later release?",
      requiredEvidence: ["provider lock", "failure stop", "dry-run fallback"],
      safeFallback: "Disable provider path and return to local reports.",
    },
    {
      id: "CBRB_ROLLBACK_003",
      label: "Storage rollback path",
      lane: "rollback-gate",
      rollbackScore: clampScore(context.storageBoardScore),
      priority: "urgent",
      rollbackQuestion: "Can later storage work be protected by restore proof?",
      requiredEvidence: ["backup proof", "restore proof", "no live migration in V15.9"],
      safeFallback: "Storage remains disabled in this version.",
    },
  ];
}

function buildManualOnlyBoundary(): ManualOnlyBoundaryItem[] {
  return [
    {
      id: "CBRB_BOUNDARY_001",
      label: "No automation boundary",
      lane: "manual-only-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "All automation remains disabled.",
      blockedOutcome: "automationActivationAllowed=false",
    },
    {
      id: "CBRB_BOUNDARY_002",
      label: "No execution boundary",
      lane: "manual-only-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "AI cannot execute work.",
      blockedOutcome: "automaticExecutionPerformed=false",
    },
    {
      id: "CBRB_BOUNDARY_003",
      label: "No product or dose boundary",
      lane: "manual-only-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "AI cannot prescribe products or dosage.",
      blockedOutcome: "productPrescriptionPerformed=false",
    },
  ];
}

function buildGoNoGoBoard(context: Required<ControlledBetaReadinessInput>): ControlledBetaGoNoGoItem[] {
  return [
    {
      id: "CBRB_GONOGO_001",
      label: "Controlled beta readiness design",
      lane: "human-signoff",
      goNoGoState: "design-only",
      score: clampScore(context.onlineReadinessScore),
      severity: "watch",
      requiredBeforeGo: ["provider proof", "storage proof", "review proof", "rollback proof"],
      safeOutcome: "Design only in V15.9.",
    },
    {
      id: "CBRB_GONOGO_002",
      label: "Controlled beta activation",
      lane: "human-signoff",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate beta release", "board signoff", "observability proof", "rollback proof"],
      safeOutcome: "Blocked in V15.9.",
    },
    {
      id: "CBRB_GONOGO_003",
      label: "Production AI runtime",
      lane: "provider-gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["controlled beta proof", "runtime approval", "operational audit"],
      safeOutcome: "Production runtime remains locked.",
    },
  ];
}

function buildBetaBoardGates(
  context: Required<ControlledBetaReadinessInput>,
  sourceNodes: ControlledBetaSourceNode[],
): ControlledBetaBoardGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "CBRB_GATE_001",
      label: "Beta board remains no-activation",
      lane: "manual-only-boundary" as ControlledBetaLane,
      score: 100,
      reviewer: "controlled beta reviewer",
      requiredEvidence: ["controlledBetaAllowed=false", "productionRuntimeAllowed=false", "manualDispatchOnly=true"],
      hardStop: "Do not activate controlled beta in V15.9.",
    },
    {
      id: "CBRB_GATE_002",
      label: "Provider gate is complete enough",
      lane: "provider-gate" as ControlledBetaLane,
      score: context.providerGateScore - context.providerGateItemCount * 3,
      reviewer: "provider gate reviewer",
      requiredEvidence: ["provider lock", "budget gate", "failure stop"],
      hardStop: "Do not proceed without provider gate proof.",
    },
    {
      id: "CBRB_GATE_003",
      label: "Storage gate is complete enough",
      lane: "storage-gate" as ControlledBetaLane,
      score: context.storageBoardScore - context.storageGateItemCount * 3,
      reviewer: "storage gate reviewer",
      requiredEvidence: ["storage lock", "restore validation", "retention control"],
      hardStop: "Do not proceed without storage gate proof.",
    },
    {
      id: "CBRB_GATE_004",
      label: "Review and conversion gates are complete enough",
      lane: "review-gate" as ControlledBetaLane,
      score: ((context.reviewWorkflowScore + context.manualConversionScore) / 2) - context.conversionGateItemCount * 2,
      reviewer: context.betaLeadRole,
      requiredEvidence: ["human review required", "conversion locked", "correction path"],
      hardStop: "Do not proceed without review and conversion gate proof.",
    },
    {
      id: "CBRB_GATE_005",
      label: "Observability and rollback are complete enough",
      lane: "rollback-gate" as ControlledBetaLane,
      score: ((context.observabilityScore + context.rollbackScore) / 2) - context.rollbackItemCount * 3,
      reviewer: "observability rollback reviewer",
      requiredEvidence: ["signals", "rollback branch", "tag checkpoint", "dry-run fallback"],
      hardStop: "Do not proceed without observability and rollback proof.",
    },
    {
      id: "CBRB_GATE_006",
      label: "Source blockers are within beta board tolerance",
      lane: "human-signoff" as ControlledBetaLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before beta-plan-ready state.",
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

function buildBoardPack(context: Required<ControlledBetaReadinessInput>): ControlledBetaBoardPackItem[] {
  return [
    {
      id: "CBRB_PACK_001",
      label: "Provider and storage packet",
      lane: "provider-gate",
      packReady: context.providerGateScore >= 65 && context.storageBoardScore >= 65,
      readinessScore: clampScore((context.providerGateScore + context.storageBoardScore) / 2),
      reviewerCheck: "Confirm provider and storage remain locked.",
      includedSections: ["provider gate", "storage gate", "production lock"],
      blockedSections: ["provider runtime", "AI storage", "live migration"],
    },
    {
      id: "CBRB_PACK_002",
      label: "Review and conversion packet",
      lane: "review-gate",
      packReady: context.reviewWorkflowScore >= 65 && context.manualConversionScore >= 60,
      readinessScore: clampScore((context.reviewWorkflowScore + context.manualConversionScore) / 2),
      reviewerCheck: "Confirm review required and conversion blocked.",
      includedSections: ["review gate", "conversion gate", "manual-only boundary"],
      blockedSections: ["task creation", "intervention creation", "automatic approval"],
    },
    {
      id: "CBRB_PACK_003",
      label: "Observability and rollback packet",
      lane: "rollback-gate",
      packReady: context.observabilityScore >= 60 && context.rollbackScore >= 60,
      readinessScore: clampScore((context.observabilityScore + context.rollbackScore) / 2),
      reviewerCheck: "Confirm observability and rollback plan before any later beta.",
      includedSections: ["signals", "rollback plan", "dry-run fallback"],
      blockedSections: ["unobservable beta", "irreversible activation"],
    },
  ];
}

function buildFindings(
  context: Required<ControlledBetaReadinessInput>,
  sourceNodes: ControlledBetaSourceNode[],
  gates: ControlledBetaBoardGateItem[],
  goNoGo: ControlledBetaGoNoGoItem[],
): ControlledBetaFindingItem[] {
  const findings: ControlledBetaFindingItem[] = [];

  if (context.openBetaGapCount > 0) {
    findings.push({
      id: "CBRB_FINDING_001",
      label: "Open beta readiness gaps",
      lane: "human-signoff",
      severity: context.openBetaGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openBetaGapCount} beta readiness gaps remain before any later beta.`,
      manualResolution: "Resolve provider, storage, observability and rollback gaps in later gated releases.",
      blocksBetaActivation: true,
    });
  }

  if (context.observabilityScore < 70) {
    findings.push({
      id: "CBRB_FINDING_002",
      label: "Observability below threshold",
      lane: "observability-gate",
      severity: "critical",
      reason: "Observability is not mature enough for beta activation.",
      manualResolution: "Complete provider, storage and conversion signal plan before later beta.",
      blocksBetaActivation: true,
    });
  }

  if (context.rollbackScore < 70) {
    findings.push({
      id: "CBRB_FINDING_003",
      label: "Rollback below threshold",
      lane: "rollback-gate",
      severity: "critical",
      reason: "Rollback readiness is not mature enough for beta activation.",
      manualResolution: "Complete rollback branch, tag checkpoint and dry-run fallback proof.",
      blocksBetaActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `CBRB_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksBetaActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `CBRB_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Beta board gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksBetaActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `CBRB_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksBetaActivation: true,
      });
    });

  return findings;
}

export function buildAiControlledBetaReadinessBoardReport(
  input: ControlledBetaReadinessInput = {},
): ControlledBetaReadinessReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const providerGatePlan = buildProviderGatePlan(context);
  const storageGatePlan = buildStorageGatePlan(context);
  const reviewGatePlan = buildReviewGatePlan(context);
  const conversionGatePlan = buildConversionGatePlan(context);
  const observabilityPlan = buildObservabilityPlan(context);
  const rollbackPlan = buildRollbackPlan(context);
  const manualOnlyBoundary = buildManualOnlyBoundary();
  const goNoGoBoard = buildGoNoGoBoard(context);
  const betaBoardGates = buildBetaBoardGates(context, sourceNodes);
  const betaBoardPack = buildBoardPack(context);
  const betaBoardFindings = buildFindings(context, sourceNodes, betaBoardGates, goNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const providerAverage =
    providerGatePlan.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, providerGatePlan.length);

  const storageAverage =
    storageGatePlan.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, storageGatePlan.length);

  const gateAverage =
    betaBoardGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, betaBoardGates.length);

  const findingPenalty = betaBoardFindings.filter((item) => item.blocksBetaActivation).length * 7;
  const rollbackPressure =
    rollbackPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, rollbackPlan.length * 4);

  const betaBoardScore = clampScore(
    sourceAverage / 4 +
      providerAverage / 4 +
      storageAverage / 4 +
      gateAverage / 4 +
      rollbackPressure -
      findingPenalty -
      context.openBetaGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openBetaGapCount * 8 +
        context.providerGateItemCount * 5 +
        context.storageGateItemCount * 5 +
        context.observabilityItemCount * 6 +
        context.rollbackItemCount * 6,
    ),
  );

  const betaBoardStatus = bandFromScore(
    betaBoardScore,
    betaBoardFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: CONTROLLED_BETA_READINESS_GUARDRAIL,
    betaBoardScore,
    betaBoardStatus,
    overallSeverity,
    sourceNodes,
    providerGatePlan,
    storageGatePlan,
    reviewGatePlan,
    conversionGatePlan,
    observabilityPlan,
    rollbackPlan,
    manualOnlyBoundary,
    goNoGoBoard,
    betaBoardGates,
    betaBoardPack,
    betaBoardFindings,
    stagedRoadmap: {
      v159: "Controlled beta readiness board with all operational gates still manual.",
      v160: "Controlled production beta only after provider, storage, review and conversion gates pass.",
      v161: "Post-beta observability and rollback hardening.",
      v162: "Operational audit package and compliance export hardening.",
      v163: "Human-supervised agronomic operations cockpit.",
    },
    redactedExportBundle: {
      exportId: "controlled_beta_readiness_board_v15_9_redacted_dry_run",
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
        "provider gate plan",
        "storage gate plan",
        "review gate plan",
        "conversion gate plan",
        "observability plan",
        "rollback plan",
        "manual-only boundary",
        "go/no-go board",
        "beta board gates",
        "board pack",
        "board findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Controlled beta readiness board is local dry-run only.",
      "No controlled beta activation, provider call, storage activation, review storage, task creation, intervention creation or execution is performed.",
      "All operational gates remain manual, blocked and human-reviewed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V15.9 prepares the beta readiness board only.",
    ],
  };
}

export const aiControlledBetaReadinessBoardVersion = "V15.9";
