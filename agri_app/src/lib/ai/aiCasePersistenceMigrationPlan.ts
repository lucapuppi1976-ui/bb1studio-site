export type CasePersistenceMigrationMode = "dry-run" | "storage-board-review";

export type CasePersistenceSeverity = "info" | "watch" | "elevated" | "critical";

export type CasePersistencePriority = "low" | "medium" | "high" | "urgent";

export type CasePersistenceReadinessBand =
  | "blocked"
  | "blueprint-ready"
  | "rehearsal-ready"
  | "migration-plan-ready";

export type CasePersistenceLane =
  | "entity-blueprint"
  | "migration-plan"
  | "backup-restore"
  | "photo-retention"
  | "audit-chain"
  | "review-record"
  | "storage-gate"
  | "human-signoff";

export interface CasePersistenceMigrationGuardrail {
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
  casePersistencePerformed: false;
  migrationExecutionAllowed: false;
  migrationExecutionPerformed: false;
  schemaWriteAllowed: false;
  schemaWritePerformed: false;
  automationActivationAllowed: false;
  casePersistencePlanReady: true;
  storageSafetyBlueprintReady: true;
  migrationRehearsalPlanReady: true;
  backupRestorePlanReady: true;
}

export interface CasePersistenceMigrationInput {
  entityBlueprintItemCount?: number;
  migrationStepCount?: number;
  backupRestoreItemCount?: number;
  photoRetentionItemCount?: number;
  auditChainItemCount?: number;
  reviewRecordItemCount?: number;
  openStorageGapCount?: number;
  onlineReadinessScore?: number;
  providerGatewayScore?: number;
  releaseControlScore?: number;
  reviewMaturityScore?: number;
  privacyReadinessScore?: number;
  storageBlueprintScore?: number;
  rehearsalReadinessScore?: number;
  storageLeadRole?: string;
}

export interface CasePersistenceSourceNode {
  id: string;
  lane: CasePersistenceLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: CasePersistenceSeverity;
  priority: CasePersistencePriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface EntityBlueprintItem {
  id: string;
  label: string;
  lane: CasePersistenceLane;
  entityScore: number;
  severity: CasePersistenceSeverity;
  intendedModel: string;
  requiredFields: string[];
  blockedOutcome: string;
}

export interface MigrationPlanItem {
  id: string;
  label: string;
  lane: CasePersistenceLane;
  planScore: number;
  priority: CasePersistencePriority;
  migrationQuestion: string;
  requiredBeforeExecution: string[];
  blockedOutcome: string;
}

export interface BackupRestorePlanItem {
  id: string;
  label: string;
  lane: CasePersistenceLane;
  restoreScore: number;
  severity: CasePersistenceSeverity;
  restoreQuestion: string;
  manualResolution: string;
}

export interface PhotoRetentionPlanItem {
  id: string;
  label: string;
  lane: CasePersistenceLane;
  retentionScore: number;
  priority: CasePersistencePriority;
  retentionQuestion: string;
  requiredBeforeStorage: string[];
}

export interface AuditChainPlanItem {
  id: string;
  label: string;
  lane: CasePersistenceLane;
  chainScore: number;
  severity: CasePersistenceSeverity;
  chainQuestion: string;
  manualResolution: string;
}

export interface ReviewRecordPlanItem {
  id: string;
  label: string;
  lane: CasePersistenceLane;
  recordScore: number;
  severity: CasePersistenceSeverity;
  recordQuestion: string;
  requiredBeforeStorage: string[];
}

export interface StorageGateItem {
  id: string;
  label: string;
  lane: CasePersistenceLane;
  passed: boolean;
  score: number;
  severity: CasePersistenceSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface StorageBoardPackItem {
  id: string;
  label: string;
  lane: CasePersistenceLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface StorageRiskItem {
  id: string;
  label: string;
  lane: CasePersistenceLane;
  severity: CasePersistenceSeverity;
  reason: string;
  manualResolution: string;
  blocksStorageActivation: boolean;
}

export interface CasePersistenceMigrationReport {
  generatedAt: string;
  mode: CasePersistenceMigrationMode;
  context: Required<CasePersistenceMigrationInput>;
  readiness: CasePersistenceMigrationGuardrail;
  storageReadinessScore: number;
  storageReadinessStatus: CasePersistenceReadinessBand;
  overallSeverity: CasePersistenceSeverity;
  sourceNodes: CasePersistenceSourceNode[];
  entityBlueprint: EntityBlueprintItem[];
  migrationPlan: MigrationPlanItem[];
  backupRestorePlan: BackupRestorePlanItem[];
  photoRetentionPlan: PhotoRetentionPlanItem[];
  auditChainPlan: AuditChainPlanItem[];
  reviewRecordPlan: ReviewRecordPlanItem[];
  storageGates: StorageGateItem[];
  storageBoardPack: StorageBoardPackItem[];
  storageRiskRegister: StorageRiskItem[];
  stagedRoadmap: {
    v152: string;
    v153: string;
    v154: string;
    v155: string;
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

export const CASE_PERSISTENCE_MIGRATION_GUARDRAIL: CasePersistenceMigrationGuardrail = {
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
  casePersistencePerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  automationActivationAllowed: false,
  casePersistencePlanReady: true,
  storageSafetyBlueprintReady: true,
  migrationRehearsalPlanReady: true,
  backupRestorePlanReady: true,
};

const priorityWeight: Record<CasePersistencePriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: CasePersistenceMigrationInput): Required<CasePersistenceMigrationInput> {
  return {
    entityBlueprintItemCount: input.entityBlueprintItemCount ?? 8,
    migrationStepCount: input.migrationStepCount ?? 9,
    backupRestoreItemCount: input.backupRestoreItemCount ?? 7,
    photoRetentionItemCount: input.photoRetentionItemCount ?? 7,
    auditChainItemCount: input.auditChainItemCount ?? 7,
    reviewRecordItemCount: input.reviewRecordItemCount ?? 7,
    openStorageGapCount: input.openStorageGapCount ?? 10,
    onlineReadinessScore: input.onlineReadinessScore ?? 78,
    providerGatewayScore: input.providerGatewayScore ?? 68,
    releaseControlScore: input.releaseControlScore ?? 88,
    reviewMaturityScore: input.reviewMaturityScore ?? 76,
    privacyReadinessScore: input.privacyReadinessScore ?? 64,
    storageBlueprintScore: input.storageBlueprintScore ?? 62,
    rehearsalReadinessScore: input.rehearsalReadinessScore ?? 56,
    storageLeadRole: input.storageLeadRole ?? "AI case storage readiness reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): CasePersistenceSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: CasePersistenceSeverity): CasePersistencePriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): CasePersistenceReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "migration-plan-ready";
  if (score >= 74) return "rehearsal-ready";
  return "blueprint-ready";
}

function buildSourceNode(
  id: string,
  lane: CasePersistenceLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): CasePersistenceSourceNode {
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
            "AI case storage readiness remains below activation threshold.",
            "Storage board must resolve migration, backup, retention, audit and review record gaps before any storage activation.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<CasePersistenceMigrationInput>): CasePersistenceSourceNode[] {
  const blueprintPressure = context.entityBlueprintItemCount;
  const migrationPressure = context.migrationStepCount;
  const backupPressure = context.backupRestoreItemCount * 2;
  const retentionPressure = context.photoRetentionItemCount * 2;
  const auditPressure = context.auditChainItemCount;
  const gapPressure = context.openStorageGapCount * 2;

  return [
    buildSourceNode(
      "CPMP_NODE_001",
      "entity-blueprint",
      "Online operational readiness baseline",
      "V15.0",
      context.onlineReadinessScore,
      context.releaseControlScore,
      blueprintPressure,
      "Carry online readiness into AI case storage blueprint.",
    ),
    buildSourceNode(
      "CPMP_NODE_002",
      "migration-plan",
      "Provider runtime staging baseline",
      "V15.1",
      context.providerGatewayScore,
      context.releaseControlScore,
      migrationPressure,
      "Prepare storage only after provider gateway boundaries are stable.",
    ),
    buildSourceNode(
      "CPMP_NODE_003",
      "backup-restore",
      "Migration rehearsal plan",
      "V15.2",
      context.rehearsalReadinessScore,
      context.releaseControlScore,
      backupPressure,
      "Define backup and restore rehearsal before any schema execution.",
    ),
    buildSourceNode(
      "CPMP_NODE_004",
      "photo-retention",
      "Photo and evidence retention plan",
      "V15.2",
      context.privacyReadinessScore,
      context.reviewMaturityScore,
      retentionPressure,
      "Define photo, evidence and redaction lifecycle before storage activation.",
    ),
    buildSourceNode(
      "CPMP_NODE_005",
      "audit-chain",
      "AI audit chain plan",
      "V15.2",
      context.storageBlueprintScore,
      context.reviewMaturityScore,
      auditPressure,
      "Define case event chain before persistent AI review.",
    ),
    buildSourceNode(
      "CPMP_NODE_006",
      "review-record",
      "Human review record plan",
      "V15.2",
      context.reviewMaturityScore,
      context.releaseControlScore,
      gapPressure,
      "Define reviewer state, reason and manual conversion links.",
    ),
    buildSourceNode(
      "CPMP_NODE_007",
      "storage-gate",
      "Storage activation gate",
      "V15.2",
      context.storageBlueprintScore,
      context.releaseControlScore,
      gapPressure,
      "Keep AI case storage blocked until rehearsal, backup and review gates pass.",
    ),
    buildSourceNode(
      "CPMP_NODE_008",
      "human-signoff",
      "Storage board signoff",
      "V15.2",
      context.reviewMaturityScore,
      context.releaseControlScore,
      gapPressure,
      "Keep persistence activation blocked until human storage signoff.",
    ),
  ];
}

function buildEntityBlueprint(context: Required<CasePersistenceMigrationInput>): EntityBlueprintItem[] {
  return [
    {
      id: "CPMP_ENTITY_001",
      label: "AI case record",
      lane: "entity-blueprint",
      entityScore: clampScore(context.storageBlueprintScore),
      severity: severityFromConcern(100 - context.storageBlueprintScore + context.entityBlueprintItemCount * 4),
      intendedModel: "AiCase",
      requiredFields: ["case status", "crop context", "created by", "human review marker", "redaction state"],
      blockedOutcome: "No case record is created in V15.2.",
    },
    {
      id: "CPMP_ENTITY_002",
      label: "AI evidence bundle record",
      lane: "entity-blueprint",
      entityScore: clampScore(context.privacyReadinessScore),
      severity: severityFromConcern(100 - context.privacyReadinessScore + context.photoRetentionItemCount * 4),
      intendedModel: "AiEvidenceBundle",
      requiredFields: ["redacted summary", "photo references", "quality gate", "review status"],
      blockedOutcome: "No evidence bundle is stored in V15.2.",
    },
    {
      id: "CPMP_ENTITY_003",
      label: "AI review and audit record",
      lane: "entity-blueprint",
      entityScore: clampScore(context.reviewMaturityScore),
      severity: "elevated",
      intendedModel: "AiReviewEvent",
      requiredFields: ["reviewer", "state", "reason", "timestamp", "linked case"],
      blockedOutcome: "No review event is persisted in V15.2.",
    },
  ];
}

function buildMigrationPlan(context: Required<CasePersistenceMigrationInput>): MigrationPlanItem[] {
  return [
    {
      id: "CPMP_MIGRATION_001",
      label: "AI case schema migration draft",
      lane: "migration-plan",
      planScore: clampScore(context.storageBlueprintScore - context.migrationStepCount),
      priority: "urgent",
      migrationQuestion: "Which AI case entities must be introduced first?",
      requiredBeforeExecution: [
        "dev migration draft",
        "schema review",
        "rollback script",
        "staging rehearsal",
        "production freeze window",
      ],
      blockedOutcome: "No migration execution in V15.2.",
    },
    {
      id: "CPMP_MIGRATION_002",
      label: "AI evidence and photo reference migration draft",
      lane: "migration-plan",
      planScore: clampScore(context.privacyReadinessScore - context.migrationStepCount),
      priority: "urgent",
      migrationQuestion: "How should photos and evidence be referenced without unsafe retention?",
      requiredBeforeExecution: [
        "retention plan",
        "redaction plan",
        "delete workflow",
        "storage review",
      ],
      blockedOutcome: "No photo storage activation in V15.2.",
    },
    {
      id: "CPMP_MIGRATION_003",
      label: "AI audit event migration draft",
      lane: "migration-plan",
      planScore: clampScore(context.reviewMaturityScore - context.auditChainItemCount),
      priority: "high",
      migrationQuestion: "How will review and future provider events be replayed?",
      requiredBeforeExecution: [
        "event taxonomy",
        "review state model",
        "manual conversion link",
        "export redaction",
      ],
      blockedOutcome: "No audit event writes in V15.2.",
    },
  ];
}

function buildBackupRestorePlan(context: Required<CasePersistenceMigrationInput>): BackupRestorePlanItem[] {
  return [
    {
      id: "CPMP_BACKUP_001",
      label: "Pre-migration backup rehearsal",
      lane: "backup-restore",
      restoreScore: clampScore(context.rehearsalReadinessScore),
      severity: severityFromConcern(100 - context.rehearsalReadinessScore + context.backupRestoreItemCount * 5),
      restoreQuestion: "Can a backup be rehearsed before any storage migration?",
      manualResolution: "Require dev and staging backup rehearsal before migration execution.",
    },
    {
      id: "CPMP_BACKUP_002",
      label: "Restore validation rehearsal",
      lane: "backup-restore",
      restoreScore: clampScore(context.rehearsalReadinessScore - context.openStorageGapCount),
      severity: "critical",
      restoreQuestion: "Can restore be validated after a rehearsal migration?",
      manualResolution: "Require restore validation before any live migration plan.",
    },
    {
      id: "CPMP_BACKUP_003",
      label: "Rollback checkpoint plan",
      lane: "backup-restore",
      restoreScore: clampScore(context.releaseControlScore - context.backupRestoreItemCount),
      severity: "elevated",
      restoreQuestion: "Can live rollback branch and tag checkpoints protect migration work?",
      manualResolution: "Use rollback branch, release tag and manual verification before live activation.",
    },
  ];
}

function buildPhotoRetentionPlan(context: Required<CasePersistenceMigrationInput>): PhotoRetentionPlanItem[] {
  return [
    {
      id: "CPMP_RETENTION_001",
      label: "Photo retention window",
      lane: "photo-retention",
      retentionScore: clampScore(context.privacyReadinessScore),
      priority: context.privacyReadinessScore < 75 ? "urgent" : "high",
      retentionQuestion: "How long can AI case photos remain available?",
      requiredBeforeStorage: ["retention policy", "review visibility rules", "manual delete workflow"],
    },
    {
      id: "CPMP_RETENTION_002",
      label: "Evidence redaction lifecycle",
      lane: "photo-retention",
      retentionScore: clampScore(context.privacyReadinessScore - context.photoRetentionItemCount),
      priority: "high",
      retentionQuestion: "How are evidence summaries redacted before storage?",
      requiredBeforeStorage: ["redaction rules", "reviewed summary", "export controls"],
    },
    {
      id: "CPMP_RETENTION_003",
      label: "Photo access control",
      lane: "photo-retention",
      retentionScore: clampScore(context.reviewMaturityScore - context.openStorageGapCount),
      priority: "high",
      retentionQuestion: "Who can access AI case photo references?",
      requiredBeforeStorage: ["role matrix", "reviewer access", "admin audit view"],
    },
  ];
}

function buildAuditChainPlan(context: Required<CasePersistenceMigrationInput>): AuditChainPlanItem[] {
  return [
    {
      id: "CPMP_AUDIT_001",
      label: "Case event chain",
      lane: "audit-chain",
      chainScore: clampScore(context.storageBlueprintScore),
      severity: severityFromConcern(100 - context.storageBlueprintScore + context.auditChainItemCount * 4),
      chainQuestion: "Can every case state transition be replayed?",
      manualResolution: "Define state transition events before persistent case storage.",
    },
    {
      id: "CPMP_AUDIT_002",
      label: "Review accountability event",
      lane: "audit-chain",
      chainScore: clampScore(context.reviewMaturityScore),
      severity: "elevated",
      chainQuestion: "Can each human review action be attributed and replayed?",
      manualResolution: "Require reviewer, state, reason and timestamp before storage activation.",
    },
    {
      id: "CPMP_AUDIT_003",
      label: "Manual conversion trace",
      lane: "audit-chain",
      chainScore: clampScore(context.reviewMaturityScore - context.openStorageGapCount),
      severity: "critical",
      chainQuestion: "Can future manual task or intervention conversion link back to AI case review?",
      manualResolution: "Define linked case, preview, confirmation and correction event before conversion.",
    },
  ];
}

function buildReviewRecordPlan(context: Required<CasePersistenceMigrationInput>): ReviewRecordPlanItem[] {
  return [
    {
      id: "CPMP_REVIEW_001",
      label: "Review state record",
      lane: "review-record",
      recordScore: clampScore(context.reviewMaturityScore),
      severity: severityFromConcern(100 - context.reviewMaturityScore + context.reviewRecordItemCount * 4),
      recordQuestion: "Which review states must exist before AI case persistence?",
      requiredBeforeStorage: ["draft", "review required", "review in progress", "approved for manual conversion", "rejected", "archived"],
    },
    {
      id: "CPMP_REVIEW_002",
      label: "Reviewer reason record",
      lane: "review-record",
      recordScore: clampScore(context.reviewMaturityScore - context.openStorageGapCount),
      severity: "elevated",
      recordQuestion: "How will reviewer rationale be captured?",
      requiredBeforeStorage: ["review reason", "reviewer", "timestamp", "case link"],
    },
    {
      id: "CPMP_REVIEW_003",
      label: "Manual conversion readiness record",
      lane: "review-record",
      recordScore: clampScore(context.reviewMaturityScore - context.reviewRecordItemCount * 2),
      severity: "critical",
      recordQuestion: "What must be true before AI output can become a manual work item?",
      requiredBeforeStorage: ["human approval", "preview", "confirmation", "no automatic execution"],
    },
  ];
}

function buildStorageGates(
  context: Required<CasePersistenceMigrationInput>,
  sourceNodes: CasePersistenceSourceNode[],
): StorageGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "CPMP_GATE_001",
      label: "Storage remains blueprint-only",
      lane: "storage-gate" as CasePersistenceLane,
      score: 100,
      reviewer: "storage safety reviewer",
      requiredEvidence: ["storage blueprint", "guardrails", "no migration execution"],
      hardStop: "Do not execute schema or storage changes in V15.2.",
    },
    {
      id: "CPMP_GATE_002",
      label: "Entity blueprint is complete enough",
      lane: "entity-blueprint" as CasePersistenceLane,
      score: context.storageBlueprintScore - context.entityBlueprintItemCount * 3,
      reviewer: "entity blueprint reviewer",
      requiredEvidence: ["entity blueprint", "review record plan", "audit chain plan"],
      hardStop: "Do not plan migration execution until entity blueprint is complete.",
    },
    {
      id: "CPMP_GATE_003",
      label: "Backup and restore rehearsal is ready enough",
      lane: "backup-restore" as CasePersistenceLane,
      score: context.rehearsalReadinessScore - context.backupRestoreItemCount * 3,
      reviewer: "migration rehearsal reviewer",
      requiredEvidence: ["backup rehearsal", "restore validation", "rollback checkpoint"],
      hardStop: "Do not execute migration without restore rehearsal.",
    },
    {
      id: "CPMP_GATE_004",
      label: "Photo retention plan is ready enough",
      lane: "photo-retention" as CasePersistenceLane,
      score: context.privacyReadinessScore - context.photoRetentionItemCount * 3,
      reviewer: "privacy retention reviewer",
      requiredEvidence: ["retention policy", "redaction lifecycle", "access control"],
      hardStop: "Do not store photos before retention and access controls are approved.",
    },
    {
      id: "CPMP_GATE_005",
      label: "Review record plan is ready enough",
      lane: "review-record" as CasePersistenceLane,
      score: context.reviewMaturityScore - context.reviewRecordItemCount * 2,
      reviewer: context.storageLeadRole,
      requiredEvidence: ["review state record", "review reason record", "manual conversion readiness"],
      hardStop: "Do not persist AI cases without persistent human review plan.",
    },
    {
      id: "CPMP_GATE_006",
      label: "Source blockers are within storage blueprint tolerance",
      lane: "human-signoff" as CasePersistenceLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before migration-plan-ready state.",
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

function buildStorageBoardPack(context: Required<CasePersistenceMigrationInput>): StorageBoardPackItem[] {
  return [
    {
      id: "CPMP_PACK_001",
      label: "Entity blueprint packet",
      lane: "entity-blueprint",
      packReady: context.storageBlueprintScore >= 60,
      readinessScore: clampScore(context.storageBlueprintScore),
      reviewerCheck: "Confirm entity blueprint remains planning-only in V15.2.",
      includedSections: ["AI case record", "evidence bundle record", "review event record"],
      blockedSections: ["schema execution", "case storage activation"],
    },
    {
      id: "CPMP_PACK_002",
      label: "Migration rehearsal packet",
      lane: "migration-plan",
      packReady: context.rehearsalReadinessScore >= 55,
      readinessScore: clampScore(context.rehearsalReadinessScore),
      reviewerCheck: "Confirm migration rehearsal and restore validation are planned.",
      includedSections: ["migration draft", "backup rehearsal", "restore validation"],
      blockedSections: ["live migration", "schema write"],
    },
    {
      id: "CPMP_PACK_003",
      label: "Retention and audit packet",
      lane: "audit-chain",
      packReady: context.privacyReadinessScore >= 60,
      readinessScore: clampScore((context.privacyReadinessScore + context.reviewMaturityScore) / 2),
      reviewerCheck: "Confirm retention, audit chain and review state are defined before storage activation.",
      includedSections: ["photo retention", "audit chain", "review state"],
      blockedSections: ["unreviewed photo storage", "automatic conversion"],
    },
  ];
}

function buildStorageRiskRegister(
  context: Required<CasePersistenceMigrationInput>,
  sourceNodes: CasePersistenceSourceNode[],
  gates: StorageGateItem[],
): StorageRiskItem[] {
  const risks: StorageRiskItem[] = [];

  if (context.openStorageGapCount > 0) {
    risks.push({
      id: "CPMP_RISK_001",
      label: "Open storage gaps",
      lane: "storage-gate",
      severity: context.openStorageGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openStorageGapCount} storage gaps remain before AI case persistence activation.`,
      manualResolution: "Resolve through V15.x migration rehearsal, review workflow and retention work.",
      blocksStorageActivation: true,
    });
  }

  if (context.rehearsalReadinessScore < 70) {
    risks.push({
      id: "CPMP_RISK_002",
      label: "Migration rehearsal not ready",
      lane: "backup-restore",
      severity: "critical",
      reason: "Migration rehearsal readiness is below activation threshold.",
      manualResolution: "Complete backup and restore rehearsal before any schema execution.",
      blocksStorageActivation: true,
    });
  }

  if (context.privacyReadinessScore < 75) {
    risks.push({
      id: "CPMP_RISK_003",
      label: "Photo retention plan incomplete",
      lane: "photo-retention",
      severity: "elevated",
      reason: "Photo and evidence retention policy is not mature enough for AI storage activation.",
      manualResolution: "Complete retention, redaction and access review.",
      blocksStorageActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `CPMP_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
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
      risks.push({
        id: `CPMP_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Storage gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksStorageActivation: true,
      });
    });

  return risks;
}

export function buildAiCasePersistenceMigrationPlanReport(
  input: CasePersistenceMigrationInput = {},
): CasePersistenceMigrationReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const entityBlueprint = buildEntityBlueprint(context);
  const migrationPlan = buildMigrationPlan(context);
  const backupRestorePlan = buildBackupRestorePlan(context);
  const photoRetentionPlan = buildPhotoRetentionPlan(context);
  const auditChainPlan = buildAuditChainPlan(context);
  const reviewRecordPlan = buildReviewRecordPlan(context);
  const storageGates = buildStorageGates(context, sourceNodes);
  const storageBoardPack = buildStorageBoardPack(context);
  const storageRiskRegister = buildStorageRiskRegister(context, sourceNodes, storageGates);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const blueprintAverage =
    entityBlueprint.reduce((sum, item) => sum + item.entityScore, 0) /
    Math.max(1, entityBlueprint.length);

  const migrationAverage =
    migrationPlan.reduce((sum, item) => sum + item.planScore, 0) /
    Math.max(1, migrationPlan.length);

  const gateAverage =
    storageGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, storageGates.length);

  const riskPenalty = storageRiskRegister.filter((item) => item.blocksStorageActivation).length * 7;
  const migrationPressure =
    migrationPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, migrationPlan.length * 4);

  const storageReadinessScore = clampScore(
    sourceAverage / 4 +
      blueprintAverage / 4 +
      migrationAverage / 4 +
      gateAverage / 4 +
      migrationPressure -
      riskPenalty -
      context.openStorageGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openStorageGapCount * 8 +
        context.entityBlueprintItemCount * 4 +
        context.migrationStepCount * 6 +
        context.backupRestoreItemCount * 6 +
        context.photoRetentionItemCount * 6,
    ),
  );

  const storageReadinessStatus = bandFromScore(
    storageReadinessScore,
    storageRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: CASE_PERSISTENCE_MIGRATION_GUARDRAIL,
    storageReadinessScore,
    storageReadinessStatus,
    overallSeverity,
    sourceNodes,
    entityBlueprint,
    migrationPlan,
    backupRestorePlan,
    photoRetentionPlan,
    auditChainPlan,
    reviewRecordPlan,
    storageGates,
    storageBoardPack,
    storageRiskRegister,
    stagedRoadmap: {
      v152: "AI case persistence migration plan and storage safety blueprint only.",
      v153: "Persistent human review workflow and manual conversion gate design.",
      v154: "Provider staging shadow run with no production activation.",
      v155: "Migration rehearsal and storage gate validation in staging only.",
      v160: "Controlled production beta only after staging, migration and review gates pass.",
    },
    redactedExportBundle: {
      exportId: "ai_case_persistence_migration_plan_v15_2_redacted_dry_run",
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
        "entity blueprint",
        "migration plan",
        "backup restore plan",
        "photo retention plan",
        "audit chain plan",
        "review record plan",
        "storage gates",
        "storage board pack",
        "risk register",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "AI case persistence migration plan is local dry-run only.",
      "No schema write, migration execution, case storage, memory write, task creation, intervention creation or execution is performed.",
      "Provider activation, case persistence activation and automation activation remain blocked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V15.2 prepares storage blueprint and migration rehearsal plan only.",
    ],
  };
}

export const aiCasePersistenceMigrationPlanVersion = "V15.2";
