export type StorageRehearsalBoardMode = "dry-run" | "storage-board-review";

export type StorageRehearsalSeverity = "info" | "watch" | "elevated" | "critical";

export type StorageRehearsalPriority = "low" | "medium" | "high" | "urgent";

export type StorageRehearsalReadinessBand =
  | "blocked"
  | "board-design-ready"
  | "staging-review-ready"
  | "storage-rehearsal-ready";

export type StorageRehearsalLane =
  | "storage-blueprint"
  | "staging-rehearsal"
  | "restore-validation"
  | "retention-control"
  | "audit-replay"
  | "live-migration-lock"
  | "storage-safety-board"
  | "human-signoff";

export interface StorageRehearsalBoardGuardrail {
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
  storageRehearsalBoardReady: true;
  liveMigrationLockReady: true;
  restoreValidationReady: true;
  retentionControlReady: true;
}

export interface StorageRehearsalBoardInput {
  blueprintItemCount?: number;
  rehearsalItemCount?: number;
  restoreValidationItemCount?: number;
  retentionControlItemCount?: number;
  auditReplayItemCount?: number;
  migrationLockItemCount?: number;
  openStorageBoardGapCount?: number;
  onlineReadinessScore?: number;
  migrationRehearsalScore?: number;
  providerActivationGateScore?: number;
  humanReviewWorkflowScore?: number;
  manualConversionScore?: number;
  restoreValidationScore?: number;
  retentionControlScore?: number;
  storageLeadRole?: string;
}

export interface StorageRehearsalSourceNode {
  id: string;
  lane: StorageRehearsalLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: StorageRehearsalSeverity;
  priority: StorageRehearsalPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface StorageBlueprintItem {
  id: string;
  label: string;
  lane: StorageRehearsalLane;
  blueprintScore: number;
  severity: StorageRehearsalSeverity;
  blueprintPurpose: string;
  requiredBeforeUse: string[];
  blockedOutcome: string;
}

export interface StagingRehearsalItem {
  id: string;
  label: string;
  lane: StorageRehearsalLane;
  rehearsalScore: number;
  priority: StorageRehearsalPriority;
  rehearsalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface RestoreValidationItem {
  id: string;
  label: string;
  lane: StorageRehearsalLane;
  restoreScore: number;
  severity: StorageRehearsalSeverity;
  restoreQuestion: string;
  manualResolution: string;
}

export interface RetentionControlItem {
  id: string;
  label: string;
  lane: StorageRehearsalLane;
  retentionScore: number;
  priority: StorageRehearsalPriority;
  retentionQuestion: string;
  requiredEvidence: string[];
}

export interface AuditReplayItem {
  id: string;
  label: string;
  lane: StorageRehearsalLane;
  replayScore: number;
  severity: StorageRehearsalSeverity;
  replayQuestion: string;
  eventFields: string[];
  blockedOutcome: string;
}

export interface LiveMigrationLockItem {
  id: string;
  label: string;
  lane: StorageRehearsalLane;
  lockScore: number;
  severity: StorageRehearsalSeverity;
  lockRule: string;
  blockedOutcome: string;
}

export interface StorageSafetyBoardItem {
  id: string;
  label: string;
  lane: StorageRehearsalLane;
  boardScore: number;
  severity: StorageRehearsalSeverity;
  boardQuestion: string;
  requiredDecision: string[];
}

export interface StorageRehearsalGoNoGoItem {
  id: string;
  label: string;
  lane: StorageRehearsalLane;
  goNoGoState: "no-go" | "design-only" | "staging-board-ready";
  score: number;
  severity: StorageRehearsalSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface StorageRehearsalGateItem {
  id: string;
  label: string;
  lane: StorageRehearsalLane;
  passed: boolean;
  score: number;
  severity: StorageRehearsalSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface StorageRehearsalBoardPackItem {
  id: string;
  label: string;
  lane: StorageRehearsalLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface StorageRehearsalRiskItem {
  id: string;
  label: string;
  lane: StorageRehearsalLane;
  severity: StorageRehearsalSeverity;
  reason: string;
  manualResolution: string;
  blocksStorageActivation: boolean;
}

export interface StorageRehearsalBoardReport {
  generatedAt: string;
  mode: StorageRehearsalBoardMode;
  context: Required<StorageRehearsalBoardInput>;
  readiness: StorageRehearsalBoardGuardrail;
  storageBoardScore: number;
  storageBoardStatus: StorageRehearsalReadinessBand;
  overallSeverity: StorageRehearsalSeverity;
  sourceNodes: StorageRehearsalSourceNode[];
  storageBlueprint: StorageBlueprintItem[];
  stagingRehearsalPlan: StagingRehearsalItem[];
  restoreValidationPlan: RestoreValidationItem[];
  retentionControlPlan: RetentionControlItem[];
  auditReplayPlan: AuditReplayItem[];
  liveMigrationLock: LiveMigrationLockItem[];
  storageSafetyBoard: StorageSafetyBoardItem[];
  goNoGoBoard: StorageRehearsalGoNoGoItem[];
  storageGates: StorageRehearsalGateItem[];
  storageBoardPack: StorageRehearsalBoardPackItem[];
  storageBoardFindings: StorageRehearsalRiskItem[];
  stagedRoadmap: {
    v158: string;
    v159: string;
    v160: string;
    v161: string;
    v162: string;
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

export const STORAGE_REHEARSAL_BOARD_GUARDRAIL: StorageRehearsalBoardGuardrail = {
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
  storageRehearsalBoardReady: true,
  liveMigrationLockReady: true,
  restoreValidationReady: true,
  retentionControlReady: true,
};

const priorityWeight: Record<StorageRehearsalPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: StorageRehearsalBoardInput): Required<StorageRehearsalBoardInput> {
  return {
    blueprintItemCount: input.blueprintItemCount ?? 7,
    rehearsalItemCount: input.rehearsalItemCount ?? 8,
    restoreValidationItemCount: input.restoreValidationItemCount ?? 7,
    retentionControlItemCount: input.retentionControlItemCount ?? 7,
    auditReplayItemCount: input.auditReplayItemCount ?? 6,
    migrationLockItemCount: input.migrationLockItemCount ?? 6,
    openStorageBoardGapCount: input.openStorageBoardGapCount ?? 8,
    onlineReadinessScore: input.onlineReadinessScore ?? 82,
    migrationRehearsalScore: input.migrationRehearsalScore ?? 70,
    providerActivationGateScore: input.providerActivationGateScore ?? 72,
    humanReviewWorkflowScore: input.humanReviewWorkflowScore ?? 72,
    manualConversionScore: input.manualConversionScore ?? 68,
    restoreValidationScore: input.restoreValidationScore ?? 64,
    retentionControlScore: input.retentionControlScore ?? 64,
    storageLeadRole: input.storageLeadRole ?? "storage rehearsal board reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): StorageRehearsalSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: StorageRehearsalSeverity): StorageRehearsalPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): StorageRehearsalReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "storage-rehearsal-ready";
  if (score >= 74) return "staging-review-ready";
  return "board-design-ready";
}

function buildSourceNode(
  id: string,
  lane: StorageRehearsalLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): StorageRehearsalSourceNode {
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
            "Storage rehearsal board remains below activation threshold.",
            "Storage board must resolve restore, retention, audit replay and live migration lock gaps before any later storage work.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<StorageRehearsalBoardInput>): StorageRehearsalSourceNode[] {
  const blueprintPressure = context.blueprintItemCount;
  const rehearsalPressure = context.rehearsalItemCount;
  const restorePressure = context.restoreValidationItemCount * 2;
  const retentionPressure = context.retentionControlItemCount * 2;
  const lockPressure = context.migrationLockItemCount;
  const gapPressure = context.openStorageBoardGapCount * 2;

  return [
    buildSourceNode(
      "SRB_NODE_001",
      "storage-blueprint",
      "Online readiness baseline",
      "V15.0",
      context.onlineReadinessScore,
      context.humanReviewWorkflowScore,
      blueprintPressure,
      "Keep online dry-run stable while storage remains locked.",
    ),
    buildSourceNode(
      "SRB_NODE_002",
      "staging-rehearsal",
      "Migration rehearsal baseline",
      "V15.5",
      context.migrationRehearsalScore,
      context.restoreValidationScore,
      rehearsalPressure,
      "Carry staging rehearsal design into storage board review.",
    ),
    buildSourceNode(
      "SRB_NODE_003",
      "live-migration-lock",
      "Provider activation gate baseline",
      "V15.7",
      context.providerActivationGateScore,
      context.migrationRehearsalScore,
      lockPressure,
      "Keep storage independent from provider activation and live migration.",
    ),
    buildSourceNode(
      "SRB_NODE_004",
      "audit-replay",
      "Persistent human review baseline",
      "V15.3",
      context.humanReviewWorkflowScore,
      context.migrationRehearsalScore,
      gapPressure,
      "Confirm future audit replay can explain storage decisions.",
    ),
    buildSourceNode(
      "SRB_NODE_005",
      "storage-safety-board",
      "Manual conversion baseline",
      "V15.6",
      context.manualConversionScore,
      context.humanReviewWorkflowScore,
      gapPressure,
      "Keep manual conversion blocked while storage is not active.",
    ),
    buildSourceNode(
      "SRB_NODE_006",
      "restore-validation",
      "Restore validation",
      "V15.8",
      context.restoreValidationScore,
      context.migrationRehearsalScore,
      restorePressure,
      "Require restore validation before any later migration execution.",
    ),
    buildSourceNode(
      "SRB_NODE_007",
      "retention-control",
      "Retention control",
      "V15.8",
      context.retentionControlScore,
      context.humanReviewWorkflowScore,
      retentionPressure,
      "Require photo and evidence retention controls before storage activation.",
    ),
    buildSourceNode(
      "SRB_NODE_008",
      "human-signoff",
      "Storage board signoff",
      "V15.8",
      context.humanReviewWorkflowScore,
      context.restoreValidationScore,
      gapPressure,
      "Keep storage activation blocked until human storage board signoff.",
    ),
  ];
}

function buildStorageBlueprint(context: Required<StorageRehearsalBoardInput>): StorageBlueprintItem[] {
  return [
    {
      id: "SRB_BLUEPRINT_001",
      label: "AI case storage blueprint",
      lane: "storage-blueprint",
      blueprintScore: clampScore(context.migrationRehearsalScore),
      severity: severityFromConcern(100 - context.migrationRehearsalScore + context.blueprintItemCount * 4),
      blueprintPurpose: "Describe future AI case storage shape without schema changes.",
      requiredBeforeUse: ["case record map", "review link map", "audit replay map"],
      blockedOutcome: "No AI case storage in V15.8.",
    },
    {
      id: "SRB_BLUEPRINT_002",
      label: "Review record storage blueprint",
      lane: "storage-blueprint",
      blueprintScore: clampScore(context.humanReviewWorkflowScore),
      severity: "elevated",
      blueprintPurpose: "Describe future review record storage shape without writes.",
      requiredBeforeUse: ["review state", "reviewer role", "reason field"],
      blockedOutcome: "No review storage in V15.8.",
    },
    {
      id: "SRB_BLUEPRINT_003",
      label: "Evidence reference blueprint",
      lane: "storage-blueprint",
      blueprintScore: clampScore(context.retentionControlScore),
      severity: "elevated",
      blueprintPurpose: "Describe photo and evidence reference strategy without storage.",
      requiredBeforeUse: ["retention control", "redacted export", "delete path"],
      blockedOutcome: "No photo or evidence storage in V15.8.",
    },
  ];
}

function buildStagingRehearsalPlan(context: Required<StorageRehearsalBoardInput>): StagingRehearsalItem[] {
  return [
    {
      id: "SRB_REHEARSAL_001",
      label: "Staging storage rehearsal",
      lane: "staging-rehearsal",
      rehearsalScore: clampScore(context.migrationRehearsalScore),
      priority: context.migrationRehearsalScore < 75 ? "urgent" : "high",
      rehearsalQuestion: "Can staging storage rehearsal be designed without execution?",
      requiredEvidence: ["dry plan", "restore proof", "rollback plan", "board note"],
      blockedOutcome: "No staging storage rehearsal execution in V15.8.",
    },
    {
      id: "SRB_REHEARSAL_002",
      label: "Staging review replay rehearsal",
      lane: "staging-rehearsal",
      rehearsalScore: clampScore(context.humanReviewWorkflowScore),
      priority: "high",
      rehearsalQuestion: "Can review decisions be replayed conceptually?",
      requiredEvidence: ["review state", "review reason", "audit replay"],
      blockedOutcome: "No review record write.",
    },
    {
      id: "SRB_REHEARSAL_003",
      label: "Staging conversion isolation rehearsal",
      lane: "staging-rehearsal",
      rehearsalScore: clampScore(context.manualConversionScore),
      priority: "high",
      rehearsalQuestion: "Can storage rehearsal remain isolated from task and intervention creation?",
      requiredEvidence: ["conversion locked", "no execution", "manual dispatch only"],
      blockedOutcome: "No task or intervention creation.",
    },
  ];
}

function buildRestoreValidationPlan(context: Required<StorageRehearsalBoardInput>): RestoreValidationItem[] {
  return [
    {
      id: "SRB_RESTORE_001",
      label: "Restore proof board",
      lane: "restore-validation",
      restoreScore: clampScore(context.restoreValidationScore),
      severity: severityFromConcern(100 - context.restoreValidationScore + context.restoreValidationItemCount * 4),
      restoreQuestion: "Can restore proof be required before later storage work?",
      manualResolution: "Require restore proof before any later migration execution.",
    },
    {
      id: "SRB_RESTORE_002",
      label: "Known-good state return",
      lane: "restore-validation",
      restoreScore: clampScore(context.restoreValidationScore - context.openStorageBoardGapCount),
      severity: "critical",
      restoreQuestion: "Can later storage work return to a known-good state?",
      manualResolution: "Require rollback and restore validation before activation.",
    },
    {
      id: "SRB_RESTORE_003",
      label: "Post-restore board note",
      lane: "restore-validation",
      restoreScore: clampScore(context.humanReviewWorkflowScore),
      severity: "elevated",
      restoreQuestion: "Can restore proof be connected to human board review?",
      manualResolution: "Require board note and reviewer signoff.",
    },
  ];
}

function buildRetentionControlPlan(context: Required<StorageRehearsalBoardInput>): RetentionControlItem[] {
  return [
    {
      id: "SRB_RETENTION_001",
      label: "Photo retention control",
      lane: "retention-control",
      retentionScore: clampScore(context.retentionControlScore),
      priority: context.retentionControlScore < 75 ? "urgent" : "high",
      retentionQuestion: "Can photo retention be controlled before storage?",
      requiredEvidence: ["retention window", "reviewer access", "delete path"],
    },
    {
      id: "SRB_RETENTION_002",
      label: "Evidence redaction control",
      lane: "retention-control",
      retentionScore: clampScore(context.retentionControlScore - context.retentionControlItemCount),
      priority: "high",
      retentionQuestion: "Can evidence remain redacted before export or review?",
      requiredEvidence: ["redaction map", "review caveat", "export lock"],
    },
    {
      id: "SRB_RETENTION_003",
      label: "Archived case control",
      lane: "retention-control",
      retentionScore: clampScore(context.humanReviewWorkflowScore - context.openStorageBoardGapCount),
      priority: "high",
      retentionQuestion: "Can archived AI cases remain controlled later?",
      requiredEvidence: ["archive state", "correction path", "board note"],
    },
  ];
}

function buildAuditReplayPlan(context: Required<StorageRehearsalBoardInput>): AuditReplayItem[] {
  return [
    {
      id: "SRB_REPLAY_001",
      label: "Review event replay",
      lane: "audit-replay",
      replayScore: clampScore(context.humanReviewWorkflowScore),
      severity: severityFromConcern(100 - context.humanReviewWorkflowScore + context.auditReplayItemCount * 4),
      replayQuestion: "Can review state changes be replayed later?",
      eventFields: ["case reference", "review state", "reviewer role", "reason", "created at"],
      blockedOutcome: "No audit event write in V15.8.",
    },
    {
      id: "SRB_REPLAY_002",
      label: "Storage gate replay",
      lane: "audit-replay",
      replayScore: clampScore(context.migrationRehearsalScore),
      severity: "elevated",
      replayQuestion: "Can storage gate pass or fail decisions be replayed later?",
      eventFields: ["gate id", "score", "hard stop", "board note"],
      blockedOutcome: "No storage gate event write.",
    },
    {
      id: "SRB_REPLAY_003",
      label: "Restore validation replay",
      lane: "audit-replay",
      replayScore: clampScore(context.restoreValidationScore),
      severity: "elevated",
      replayQuestion: "Can restore proof be connected to future audit replay?",
      eventFields: ["restore proof", "rollback note", "reviewer signoff"],
      blockedOutcome: "No restore event write.",
    },
  ];
}

function buildLiveMigrationLock(): LiveMigrationLockItem[] {
  return [
    {
      id: "SRB_LOCK_001",
      label: "Live migration execution lock",
      lane: "live-migration-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Live migration execution remains disabled.",
      blockedOutcome: "liveMigrationExecutionAllowed=false",
    },
    {
      id: "SRB_LOCK_002",
      label: "Schema write lock",
      lane: "live-migration-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Schema writes remain disabled.",
      blockedOutcome: "schemaWriteAllowed=false",
    },
    {
      id: "SRB_LOCK_003",
      label: "Storage activation lock",
      lane: "live-migration-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "AI storage activation remains disabled.",
      blockedOutcome: "storageActivationAllowed=false",
    },
  ];
}

function buildStorageSafetyBoard(context: Required<StorageRehearsalBoardInput>): StorageSafetyBoardItem[] {
  return [
    {
      id: "SRB_BOARD_001",
      label: "Storage go/no-go review",
      lane: "storage-safety-board",
      boardScore: clampScore(context.migrationRehearsalScore),
      severity: "elevated",
      boardQuestion: "Can storage readiness be reviewed without activation?",
      requiredDecision: ["keep design-only", "require restore proof", "require retention proof"],
    },
    {
      id: "SRB_BOARD_002",
      label: "Provider separation review",
      lane: "storage-safety-board",
      boardScore: clampScore(context.providerActivationGateScore),
      severity: "elevated",
      boardQuestion: "Can storage rehearsal remain independent from provider activation?",
      requiredDecision: ["provider locked", "storage locked", "review locked"],
    },
    {
      id: "SRB_BOARD_003",
      label: "Conversion separation review",
      lane: "storage-safety-board",
      boardScore: clampScore(context.manualConversionScore),
      severity: "critical",
      boardQuestion: "Can storage rehearsal remain independent from work conversion?",
      requiredDecision: ["no task creation", "no intervention creation", "no execution"],
    },
  ];
}

function buildGoNoGoBoard(context: Required<StorageRehearsalBoardInput>): StorageRehearsalGoNoGoItem[] {
  return [
    {
      id: "SRB_GONOGO_001",
      label: "Storage rehearsal board design",
      lane: "human-signoff",
      goNoGoState: "design-only",
      score: clampScore(context.migrationRehearsalScore),
      severity: "watch",
      requiredBeforeGo: ["restore validation", "retention control", "audit replay", "board signoff"],
      safeOutcome: "Design only in V15.8.",
    },
    {
      id: "SRB_GONOGO_002",
      label: "Live migration execution",
      lane: "live-migration-lock",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate migration release", "backup proof", "restore proof", "staging proof"],
      safeOutcome: "Blocked in V15.8.",
    },
    {
      id: "SRB_GONOGO_003",
      label: "AI case storage activation",
      lane: "storage-safety-board",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["schema migration", "review persistence", "retention controls", "rollback proof"],
      safeOutcome: "Storage activation remains locked.",
    },
  ];
}

function buildStorageGates(
  context: Required<StorageRehearsalBoardInput>,
  sourceNodes: StorageRehearsalSourceNode[],
): StorageRehearsalGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "SRB_GATE_001",
      label: "Storage board remains no-write",
      lane: "live-migration-lock" as StorageRehearsalLane,
      score: 100,
      reviewer: "storage rehearsal reviewer",
      requiredEvidence: ["live migration lock", "schema write lock", "storage activation lock"],
      hardStop: "Do not execute migration or storage activation in V15.8.",
    },
    {
      id: "SRB_GATE_002",
      label: "Restore validation is complete enough",
      lane: "restore-validation" as StorageRehearsalLane,
      score: context.restoreValidationScore - context.restoreValidationItemCount * 3,
      reviewer: context.storageLeadRole,
      requiredEvidence: ["restore proof board", "known-good return", "board note"],
      hardStop: "Do not proceed without restore validation.",
    },
    {
      id: "SRB_GATE_003",
      label: "Retention control is complete enough",
      lane: "retention-control" as StorageRehearsalLane,
      score: context.retentionControlScore - context.retentionControlItemCount * 3,
      reviewer: "retention reviewer",
      requiredEvidence: ["photo retention", "redaction control", "archive control"],
      hardStop: "Do not proceed without retention control.",
    },
    {
      id: "SRB_GATE_004",
      label: "Audit replay is complete enough",
      lane: "audit-replay" as StorageRehearsalLane,
      score: context.humanReviewWorkflowScore - context.auditReplayItemCount * 3,
      reviewer: "audit replay reviewer",
      requiredEvidence: ["review event replay", "storage gate replay", "restore replay"],
      hardStop: "Do not proceed without audit replay design.",
    },
    {
      id: "SRB_GATE_005",
      label: "Provider and conversion separation remain active",
      lane: "storage-safety-board" as StorageRehearsalLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["provider locked", "conversion locked", "execution locked"],
      hardStop: "Keep provider, storage and conversion independent.",
    },
    {
      id: "SRB_GATE_006",
      label: "Source blockers are within storage board tolerance",
      lane: "human-signoff" as StorageRehearsalLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before storage-rehearsal-ready state.",
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

function buildBoardPack(context: Required<StorageRehearsalBoardInput>): StorageRehearsalBoardPackItem[] {
  return [
    {
      id: "SRB_PACK_001",
      label: "Storage board packet",
      lane: "storage-safety-board",
      packReady: context.migrationRehearsalScore >= 65,
      readinessScore: clampScore(context.migrationRehearsalScore),
      reviewerCheck: "Confirm storage board remains design-only and no-write.",
      includedSections: ["blueprint", "rehearsal plan", "storage gates"],
      blockedSections: ["live migration", "schema write", "storage activation"],
    },
    {
      id: "SRB_PACK_002",
      label: "Restore and rollback packet",
      lane: "restore-validation",
      packReady: context.restoreValidationScore >= 60,
      readinessScore: clampScore(context.restoreValidationScore),
      reviewerCheck: "Confirm restore validation is required before later storage work.",
      includedSections: ["restore proof", "known-good return", "board note"],
      blockedSections: ["unverified migration", "unreversible storage changes"],
    },
    {
      id: "SRB_PACK_003",
      label: "Retention and audit packet",
      lane: "retention-control",
      packReady: context.retentionControlScore >= 60,
      readinessScore: clampScore((context.retentionControlScore + context.humanReviewWorkflowScore) / 2),
      reviewerCheck: "Confirm retention and audit replay are required before storage activation.",
      includedSections: ["retention control", "redaction control", "audit replay"],
      blockedSections: ["uncontrolled photo storage", "untraceable review state"],
    },
  ];
}

function buildStorageFindings(
  context: Required<StorageRehearsalBoardInput>,
  sourceNodes: StorageRehearsalSourceNode[],
  gates: StorageRehearsalGateItem[],
  goNoGo: StorageRehearsalGoNoGoItem[],
): StorageRehearsalRiskItem[] {
  const findings: StorageRehearsalRiskItem[] = [];

  if (context.openStorageBoardGapCount > 0) {
    findings.push({
      id: "SRB_FINDING_001",
      label: "Open storage board gaps",
      lane: "storage-safety-board",
      severity: context.openStorageBoardGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openStorageBoardGapCount} storage board gaps remain before later storage activation.`,
      manualResolution: "Resolve through later storage release, restore proof and retention proof.",
      blocksStorageActivation: true,
    });
  }

  if (context.restoreValidationScore < 70) {
    findings.push({
      id: "SRB_FINDING_002",
      label: "Restore validation below threshold",
      lane: "restore-validation",
      severity: "critical",
      reason: "Restore validation is not mature enough for storage activation.",
      manualResolution: "Complete restore proof before any later migration execution.",
      blocksStorageActivation: true,
    });
  }

  if (context.retentionControlScore < 70) {
    findings.push({
      id: "SRB_FINDING_003",
      label: "Retention control below threshold",
      lane: "retention-control",
      severity: "elevated",
      reason: "Retention and redaction controls require more maturity.",
      manualResolution: "Complete retention and redaction proof before later storage activation.",
      blocksStorageActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `SRB_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksStorageActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `SRB_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Storage gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksStorageActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `SRB_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksStorageActivation: true,
      });
    });

  return findings;
}

export function buildAiStorageRehearsalBoardReport(
  input: StorageRehearsalBoardInput = {},
): StorageRehearsalBoardReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const storageBlueprint = buildStorageBlueprint(context);
  const stagingRehearsalPlan = buildStagingRehearsalPlan(context);
  const restoreValidationPlan = buildRestoreValidationPlan(context);
  const retentionControlPlan = buildRetentionControlPlan(context);
  const auditReplayPlan = buildAuditReplayPlan(context);
  const liveMigrationLock = buildLiveMigrationLock();
  const storageSafetyBoard = buildStorageSafetyBoard(context);
  const goNoGoBoard = buildGoNoGoBoard(context);
  const storageGates = buildStorageGates(context, sourceNodes);
  const storageBoardPack = buildBoardPack(context);
  const storageBoardFindings = buildStorageFindings(context, sourceNodes, storageGates, goNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const blueprintAverage =
    storageBlueprint.reduce((sum, item) => sum + item.blueprintScore, 0) /
    Math.max(1, storageBlueprint.length);

  const restoreAverage =
    restoreValidationPlan.reduce((sum, item) => sum + item.restoreScore, 0) /
    Math.max(1, restoreValidationPlan.length);

  const gateAverage =
    storageGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, storageGates.length);

  const findingPenalty = storageBoardFindings.filter((item) => item.blocksStorageActivation).length * 7;
  const rehearsalPressure =
    stagingRehearsalPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, stagingRehearsalPlan.length * 4);

  const storageBoardScore = clampScore(
    sourceAverage / 4 +
      blueprintAverage / 4 +
      restoreAverage / 4 +
      gateAverage / 4 +
      rehearsalPressure -
      findingPenalty -
      context.openStorageBoardGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openStorageBoardGapCount * 8 +
        context.restoreValidationItemCount * 6 +
        context.retentionControlItemCount * 6 +
        context.auditReplayItemCount * 5 +
        context.migrationLockItemCount * 5,
    ),
  );

  const storageBoardStatus = bandFromScore(
    storageBoardScore,
    storageBoardFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: STORAGE_REHEARSAL_BOARD_GUARDRAIL,
    storageBoardScore,
    storageBoardStatus,
    overallSeverity,
    sourceNodes,
    storageBlueprint,
    stagingRehearsalPlan,
    restoreValidationPlan,
    retentionControlPlan,
    auditReplayPlan,
    liveMigrationLock,
    storageSafetyBoard,
    goNoGoBoard,
    storageGates,
    storageBoardPack,
    storageBoardFindings,
    stagedRoadmap: {
      v158: "Storage rehearsal board with live migration execution lock only.",
      v159: "Controlled beta readiness board with all operational gates still manual.",
      v160: "Controlled production beta only after provider, storage, review and conversion gates pass.",
      v161: "Post-beta observability and rollback hardening.",
      v162: "Operational audit package and compliance export hardening.",
    },
    redactedExportBundle: {
      exportId: "storage_rehearsal_board_v15_8_redacted_dry_run",
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
        "storage blueprint",
        "staging rehearsal plan",
        "restore validation plan",
        "retention control plan",
        "audit replay plan",
        "live migration lock",
        "storage safety board",
        "go/no-go board",
        "storage gates",
        "board pack",
        "board findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Storage rehearsal board is local dry-run only.",
      "No schema write, live migration execution, storage activation, case storage, review storage, memory write, task creation, intervention creation or execution is performed.",
      "Provider activation, storage activation and automation activation remain blocked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V15.8 prepares storage board review and live migration lock only.",
    ],
  };
}

export const aiStorageRehearsalBoardVersion = "V15.8";
