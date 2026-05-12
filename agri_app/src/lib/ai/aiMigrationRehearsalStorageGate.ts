export type MigrationRehearsalStorageGateMode = "dry-run" | "staging-rehearsal-board";

export type MigrationRehearsalSeverity = "info" | "watch" | "elevated" | "critical";

export type MigrationRehearsalPriority = "low" | "medium" | "high" | "urgent";

export type MigrationRehearsalReadinessBand =
  | "blocked"
  | "rehearsal-design-ready"
  | "storage-gate-review-ready"
  | "staging-rehearsal-ready";

export type MigrationRehearsalLane =
  | "rehearsal-plan"
  | "schema-diff-review"
  | "backup-restore-drill"
  | "storage-gate-validation"
  | "retention-validation"
  | "audit-event-rehearsal"
  | "rollback-board"
  | "human-signoff";

export interface MigrationRehearsalStorageGateGuardrail {
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
  reviewPersistenceAllowed: false;
  reviewPersistencePerformed: false;
  manualConversionAllowed: false;
  manualConversionPerformed: false;
  providerCallAllowed: false;
  providerCallPerformed: false;
  shadowRunExternalCallAllowed: false;
  shadowRunExternalCallPerformed: false;
  stagingRehearsalPlanReady: true;
  storageGateValidationReady: true;
  rollbackDrillPlanReady: true;
  retentionValidationReady: true;
}

export interface MigrationRehearsalStorageGateInput {
  rehearsalStepCount?: number;
  schemaReviewItemCount?: number;
  backupRestoreItemCount?: number;
  storageGateItemCount?: number;
  retentionValidationItemCount?: number;
  auditEventItemCount?: number;
  openRehearsalGapCount?: number;
  onlineReadinessScore?: number;
  providerShadowScore?: number;
  storageBlueprintScore?: number;
  humanReviewWorkflowScore?: number;
  backupRestoreScore?: number;
  retentionControlScore?: number;
  rollbackReadinessScore?: number;
  rehearsalLeadRole?: string;
}

export interface MigrationRehearsalSourceNode {
  id: string;
  lane: MigrationRehearsalLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: MigrationRehearsalSeverity;
  priority: MigrationRehearsalPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface RehearsalPlanItem {
  id: string;
  label: string;
  lane: MigrationRehearsalLane;
  rehearsalScore: number;
  severity: MigrationRehearsalSeverity;
  rehearsalPurpose: string;
  requiredBeforeExecution: string[];
  blockedOutcome: string;
}

export interface SchemaDiffReviewItem {
  id: string;
  label: string;
  lane: MigrationRehearsalLane;
  reviewScore: number;
  priority: MigrationRehearsalPriority;
  reviewQuestion: string;
  expectedArtifact: string;
  blockedOutcome: string;
}

export interface BackupRestoreDrillItem {
  id: string;
  label: string;
  lane: MigrationRehearsalLane;
  drillScore: number;
  severity: MigrationRehearsalSeverity;
  drillQuestion: string;
  manualResolution: string;
}

export interface StorageGateValidationItem {
  id: string;
  label: string;
  lane: MigrationRehearsalLane;
  validationScore: number;
  severity: MigrationRehearsalSeverity;
  validationQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface RetentionValidationItem {
  id: string;
  label: string;
  lane: MigrationRehearsalLane;
  retentionScore: number;
  priority: MigrationRehearsalPriority;
  retentionQuestion: string;
  requiredEvidence: string[];
}

export interface AuditEventRehearsalItem {
  id: string;
  label: string;
  lane: MigrationRehearsalLane;
  eventScore: number;
  severity: MigrationRehearsalSeverity;
  eventQuestion: string;
  eventFields: string[];
  blockedOutcome: string;
}

export interface RollbackBoardItem {
  id: string;
  label: string;
  lane: MigrationRehearsalLane;
  rollbackScore: number;
  severity: MigrationRehearsalSeverity;
  rollbackQuestion: string;
  manualResolution: string;
}

export interface MigrationRehearsalGateItem {
  id: string;
  label: string;
  lane: MigrationRehearsalLane;
  passed: boolean;
  score: number;
  severity: MigrationRehearsalSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface MigrationRehearsalBoardPackItem {
  id: string;
  label: string;
  lane: MigrationRehearsalLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface MigrationRehearsalRiskItem {
  id: string;
  label: string;
  lane: MigrationRehearsalLane;
  severity: MigrationRehearsalSeverity;
  reason: string;
  manualResolution: string;
  blocksRehearsalActivation: boolean;
}

export interface MigrationRehearsalStorageGateReport {
  generatedAt: string;
  mode: MigrationRehearsalStorageGateMode;
  context: Required<MigrationRehearsalStorageGateInput>;
  readiness: MigrationRehearsalStorageGateGuardrail;
  rehearsalScore: number;
  rehearsalStatus: MigrationRehearsalReadinessBand;
  overallSeverity: MigrationRehearsalSeverity;
  sourceNodes: MigrationRehearsalSourceNode[];
  rehearsalPlan: RehearsalPlanItem[];
  schemaDiffReview: SchemaDiffReviewItem[];
  backupRestoreDrill: BackupRestoreDrillItem[];
  storageGateValidation: StorageGateValidationItem[];
  retentionValidation: RetentionValidationItem[];
  auditEventRehearsal: AuditEventRehearsalItem[];
  rollbackBoard: RollbackBoardItem[];
  rehearsalGates: MigrationRehearsalGateItem[];
  rehearsalBoardPack: MigrationRehearsalBoardPackItem[];
  rehearsalRiskRegister: MigrationRehearsalRiskItem[];
  stagedRoadmap: {
    v155: string;
    v156: string;
    v157: string;
    v158: string;
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

export const MIGRATION_REHEARSAL_STORAGE_GATE_GUARDRAIL: MigrationRehearsalStorageGateGuardrail = {
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
  reviewPersistenceAllowed: false,
  reviewPersistencePerformed: false,
  manualConversionAllowed: false,
  manualConversionPerformed: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  shadowRunExternalCallAllowed: false,
  shadowRunExternalCallPerformed: false,
  stagingRehearsalPlanReady: true,
  storageGateValidationReady: true,
  rollbackDrillPlanReady: true,
  retentionValidationReady: true,
};

const priorityWeight: Record<MigrationRehearsalPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: MigrationRehearsalStorageGateInput): Required<MigrationRehearsalStorageGateInput> {
  return {
    rehearsalStepCount: input.rehearsalStepCount ?? 8,
    schemaReviewItemCount: input.schemaReviewItemCount ?? 7,
    backupRestoreItemCount: input.backupRestoreItemCount ?? 7,
    storageGateItemCount: input.storageGateItemCount ?? 8,
    retentionValidationItemCount: input.retentionValidationItemCount ?? 6,
    auditEventItemCount: input.auditEventItemCount ?? 6,
    openRehearsalGapCount: input.openRehearsalGapCount ?? 8,
    onlineReadinessScore: input.onlineReadinessScore ?? 80,
    providerShadowScore: input.providerShadowScore ?? 70,
    storageBlueprintScore: input.storageBlueprintScore ?? 68,
    humanReviewWorkflowScore: input.humanReviewWorkflowScore ?? 70,
    backupRestoreScore: input.backupRestoreScore ?? 60,
    retentionControlScore: input.retentionControlScore ?? 62,
    rollbackReadinessScore: input.rollbackReadinessScore ?? 64,
    rehearsalLeadRole: input.rehearsalLeadRole ?? "migration rehearsal storage reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): MigrationRehearsalSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: MigrationRehearsalSeverity): MigrationRehearsalPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): MigrationRehearsalReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "staging-rehearsal-ready";
  if (score >= 74) return "storage-gate-review-ready";
  return "rehearsal-design-ready";
}

function buildSourceNode(
  id: string,
  lane: MigrationRehearsalLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): MigrationRehearsalSourceNode {
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
            "Migration rehearsal storage gate remains below staging rehearsal threshold.",
            "Rehearsal board must resolve schema review, backup, retention, audit and rollback gaps before later staging execution.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<MigrationRehearsalStorageGateInput>): MigrationRehearsalSourceNode[] {
  const rehearsalPressure = context.rehearsalStepCount;
  const schemaPressure = context.schemaReviewItemCount;
  const backupPressure = context.backupRestoreItemCount * 2;
  const gatePressure = context.storageGateItemCount;
  const retentionPressure = context.retentionValidationItemCount * 2;
  const gapPressure = context.openRehearsalGapCount * 2;

  return [
    buildSourceNode(
      "MRSG_NODE_001",
      "rehearsal-plan",
      "Online readiness baseline",
      "V15.0",
      context.onlineReadinessScore,
      context.rollbackReadinessScore,
      rehearsalPressure,
      "Keep online dry-run stable while designing migration rehearsal.",
    ),
    buildSourceNode(
      "MRSG_NODE_002",
      "storage-gate-validation",
      "Case persistence blueprint baseline",
      "V15.2",
      context.storageBlueprintScore,
      context.humanReviewWorkflowScore,
      gatePressure,
      "Validate storage gates before any later storage activation.",
    ),
    buildSourceNode(
      "MRSG_NODE_003",
      "audit-event-rehearsal",
      "Persistent human review baseline",
      "V15.3",
      context.humanReviewWorkflowScore,
      context.storageBlueprintScore,
      gapPressure,
      "Confirm future review event chain can be rehearsed.",
    ),
    buildSourceNode(
      "MRSG_NODE_004",
      "schema-diff-review",
      "Provider shadow run baseline",
      "V15.4",
      context.providerShadowScore,
      context.storageBlueprintScore,
      schemaPressure,
      "Keep schema diff review conceptual and non-executed.",
    ),
    buildSourceNode(
      "MRSG_NODE_005",
      "backup-restore-drill",
      "Backup and restore rehearsal",
      "V15.5",
      context.backupRestoreScore,
      context.rollbackReadinessScore,
      backupPressure,
      "Require backup and restore proof before later migration execution.",
    ),
    buildSourceNode(
      "MRSG_NODE_006",
      "retention-validation",
      "Retention validation",
      "V15.5",
      context.retentionControlScore,
      context.humanReviewWorkflowScore,
      retentionPressure,
      "Validate photo and evidence retention before future storage activation.",
    ),
    buildSourceNode(
      "MRSG_NODE_007",
      "rollback-board",
      "Rollback board",
      "V15.5",
      context.rollbackReadinessScore,
      context.onlineReadinessScore,
      gapPressure,
      "Keep rollback board ready before staging migration rehearsal.",
    ),
    buildSourceNode(
      "MRSG_NODE_008",
      "human-signoff",
      "Storage rehearsal signoff",
      "V15.5",
      context.humanReviewWorkflowScore,
      context.rollbackReadinessScore,
      gapPressure,
      "Keep migration execution blocked until human rehearsal signoff.",
    ),
  ];
}

function buildRehearsalPlan(context: Required<MigrationRehearsalStorageGateInput>): RehearsalPlanItem[] {
  return [
    {
      id: "MRSG_PLAN_001",
      label: "Dry rehearsal sequence",
      lane: "rehearsal-plan",
      rehearsalScore: clampScore(context.storageBlueprintScore),
      severity: severityFromConcern(100 - context.storageBlueprintScore + context.rehearsalStepCount * 4),
      rehearsalPurpose: "Define a full migration rehearsal sequence without execution.",
      requiredBeforeExecution: ["dev rehearsal", "staging rehearsal", "backup check", "restore check", "go/no-go board"],
      blockedOutcome: "No migration execution in V15.5.",
    },
    {
      id: "MRSG_PLAN_002",
      label: "Preflight checklist rehearsal",
      lane: "rehearsal-plan",
      rehearsalScore: clampScore(context.onlineReadinessScore - context.openRehearsalGapCount),
      severity: "elevated",
      rehearsalPurpose: "Define preflight gates before any later staging migration.",
      requiredBeforeExecution: ["clean branch", "release gate", "storage gates", "rollback branch"],
      blockedOutcome: "No schema write in V15.5.",
    },
    {
      id: "MRSG_PLAN_003",
      label: "Post-rehearsal validation",
      lane: "rehearsal-plan",
      rehearsalScore: clampScore(context.rollbackReadinessScore),
      severity: "elevated",
      rehearsalPurpose: "Define validation after a future staging rehearsal.",
      requiredBeforeExecution: ["review record check", "audit chain check", "retention check", "rollback check"],
      blockedOutcome: "No storage activation in V15.5.",
    },
  ];
}

function buildSchemaDiffReview(context: Required<MigrationRehearsalStorageGateInput>): SchemaDiffReviewItem[] {
  return [
    {
      id: "MRSG_SCHEMA_001",
      label: "Conceptual AI case schema diff",
      lane: "schema-diff-review",
      reviewScore: clampScore(context.storageBlueprintScore - context.schemaReviewItemCount),
      priority: "urgent",
      reviewQuestion: "Can the intended AI case entities be reviewed without changing schema?",
      expectedArtifact: "Blueprint-only diff note.",
      blockedOutcome: "No Prisma schema modification.",
    },
    {
      id: "MRSG_SCHEMA_002",
      label: "Review event model diff",
      lane: "schema-diff-review",
      reviewScore: clampScore(context.humanReviewWorkflowScore - context.schemaReviewItemCount),
      priority: "high",
      reviewQuestion: "Can review event requirements be mapped before schema work?",
      expectedArtifact: "Review event field map.",
      blockedOutcome: "No review event table creation.",
    },
    {
      id: "MRSG_SCHEMA_003",
      label: "Retention reference diff",
      lane: "schema-diff-review",
      reviewScore: clampScore(context.retentionControlScore),
      priority: "high",
      reviewQuestion: "Can photo and evidence retention references be mapped safely?",
      expectedArtifact: "Retention field checklist.",
      blockedOutcome: "No photo storage schema change.",
    },
  ];
}

function buildBackupRestoreDrill(context: Required<MigrationRehearsalStorageGateInput>): BackupRestoreDrillItem[] {
  return [
    {
      id: "MRSG_BACKUP_001",
      label: "Backup rehearsal proof",
      lane: "backup-restore-drill",
      drillScore: clampScore(context.backupRestoreScore),
      severity: severityFromConcern(100 - context.backupRestoreScore + context.backupRestoreItemCount * 4),
      drillQuestion: "Can backup rehearsal be documented before any migration execution?",
      manualResolution: "Require backup proof before future staging migration execution.",
    },
    {
      id: "MRSG_BACKUP_002",
      label: "Restore rehearsal proof",
      lane: "backup-restore-drill",
      drillScore: clampScore(context.backupRestoreScore - context.openRehearsalGapCount),
      severity: "critical",
      drillQuestion: "Can restore rehearsal prove rollback viability?",
      manualResolution: "Require restore validation before any staging execution.",
    },
    {
      id: "MRSG_BACKUP_003",
      label: "Rollback branch rehearsal",
      lane: "backup-restore-drill",
      drillScore: clampScore(context.rollbackReadinessScore),
      severity: "elevated",
      drillQuestion: "Can branch/tag rollback be rehearsed around migration work?",
      manualResolution: "Require rollback branch, tag, and release gate before migration rehearsal.",
    },
  ];
}

function buildStorageGateValidation(context: Required<MigrationRehearsalStorageGateInput>): StorageGateValidationItem[] {
  return [
    {
      id: "MRSG_GATEVAL_001",
      label: "No-write storage gate",
      lane: "storage-gate-validation",
      validationScore: 100,
      severity: "critical",
      validationQuestion: "Can the storage gate prove no data write occurs in V15.5?",
      requiredEvidence: ["casePersistencePerformed=false", "schemaWritePerformed=false", "migrationExecutionPerformed=false"],
      blockedOutcome: "No storage write.",
    },
    {
      id: "MRSG_GATEVAL_002",
      label: "Human review linkage gate",
      lane: "storage-gate-validation",
      validationScore: clampScore(context.humanReviewWorkflowScore),
      severity: "elevated",
      validationQuestion: "Can future case storage require human review linkage?",
      requiredEvidence: ["review state", "reviewer role", "review reason", "audit chain"],
      blockedOutcome: "No unreviewed case storage.",
    },
    {
      id: "MRSG_GATEVAL_003",
      label: "Provider shadow isolation gate",
      lane: "storage-gate-validation",
      validationScore: clampScore(context.providerShadowScore),
      severity: "elevated",
      validationQuestion: "Can provider shadow output remain storage-blocked?",
      requiredEvidence: ["no provider call", "no case storage", "review hold marker"],
      blockedOutcome: "No shadow output persistence.",
    },
  ];
}

function buildRetentionValidation(context: Required<MigrationRehearsalStorageGateInput>): RetentionValidationItem[] {
  return [
    {
      id: "MRSG_RETENTION_001",
      label: "Photo retention proof",
      lane: "retention-validation",
      retentionScore: clampScore(context.retentionControlScore),
      priority: context.retentionControlScore < 70 ? "urgent" : "high",
      retentionQuestion: "Can photo retention be validated before storage activation?",
      requiredEvidence: ["retention window", "access role", "delete workflow"],
    },
    {
      id: "MRSG_RETENTION_002",
      label: "Evidence redaction proof",
      lane: "retention-validation",
      retentionScore: clampScore(context.retentionControlScore - context.retentionValidationItemCount),
      priority: "high",
      retentionQuestion: "Can evidence summaries remain redacted before storage?",
      requiredEvidence: ["redaction map", "export control", "reviewer caveat"],
    },
    {
      id: "MRSG_RETENTION_003",
      label: "Archive lifecycle proof",
      lane: "retention-validation",
      retentionScore: clampScore(context.humanReviewWorkflowScore - context.openRehearsalGapCount),
      priority: "high",
      retentionQuestion: "Can archived AI cases be managed safely later?",
      requiredEvidence: ["archive state", "review reason", "correction path"],
    },
  ];
}

function buildAuditEventRehearsal(context: Required<MigrationRehearsalStorageGateInput>): AuditEventRehearsalItem[] {
  return [
    {
      id: "MRSG_AUDIT_001",
      label: "Review state event rehearsal",
      lane: "audit-event-rehearsal",
      eventScore: clampScore(context.humanReviewWorkflowScore),
      severity: severityFromConcern(100 - context.humanReviewWorkflowScore + context.auditEventItemCount * 4),
      eventQuestion: "Can review state transitions be rehearsed conceptually?",
      eventFields: ["case reference", "from state", "to state", "reviewer", "reason"],
      blockedOutcome: "No event persistence in V15.5.",
    },
    {
      id: "MRSG_AUDIT_002",
      label: "Storage gate event rehearsal",
      lane: "audit-event-rehearsal",
      eventScore: clampScore(context.storageBlueprintScore),
      severity: "elevated",
      eventQuestion: "Can storage gate pass/fail reasons be rehearsed?",
      eventFields: ["gate id", "score", "reviewer", "hard stop", "board note"],
      blockedOutcome: "No storage gate event write.",
    },
    {
      id: "MRSG_AUDIT_003",
      label: "Rollback event rehearsal",
      lane: "audit-event-rehearsal",
      eventScore: clampScore(context.rollbackReadinessScore),
      severity: "elevated",
      eventQuestion: "Can rollback steps be tied to audit evidence later?",
      eventFields: ["rollback branch", "tag", "reason", "validation result"],
      blockedOutcome: "No rollback event persistence.",
    },
  ];
}

function buildRollbackBoard(context: Required<MigrationRehearsalStorageGateInput>): RollbackBoardItem[] {
  return [
    {
      id: "MRSG_ROLLBACK_001",
      label: "Staging rollback checklist",
      lane: "rollback-board",
      rollbackScore: clampScore(context.rollbackReadinessScore),
      severity: severityFromConcern(100 - context.rollbackReadinessScore + context.openRehearsalGapCount * 4),
      rollbackQuestion: "Can every future staging migration step be reversed?",
      manualResolution: "Require branch, backup, restore, validation and owner signoff.",
    },
    {
      id: "MRSG_ROLLBACK_002",
      label: "Storage gate failure rollback",
      lane: "rollback-board",
      rollbackScore: clampScore(context.backupRestoreScore),
      severity: "critical",
      rollbackQuestion: "What happens if storage gate validation fails?",
      manualResolution: "Stop migration rehearsal and restore known-good state.",
    },
    {
      id: "MRSG_ROLLBACK_003",
      label: "Retention failure rollback",
      lane: "rollback-board",
      rollbackScore: clampScore(context.retentionControlScore),
      severity: "elevated",
      rollbackQuestion: "What happens if retention validation fails?",
      manualResolution: "Block storage activation and return to blueprint review.",
    },
  ];
}

function buildRehearsalGates(
  context: Required<MigrationRehearsalStorageGateInput>,
  sourceNodes: MigrationRehearsalSourceNode[],
): MigrationRehearsalGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "MRSG_GATE_001",
      label: "Rehearsal remains no-execution",
      lane: "rehearsal-plan" as MigrationRehearsalLane,
      score: 100,
      reviewer: "migration rehearsal reviewer",
      requiredEvidence: ["guardrails", "no schema write", "no migration execution"],
      hardStop: "Do not execute schema or migration work in V15.5.",
    },
    {
      id: "MRSG_GATE_002",
      label: "Schema diff review is complete enough",
      lane: "schema-diff-review" as MigrationRehearsalLane,
      score: context.storageBlueprintScore - context.schemaReviewItemCount * 3,
      reviewer: "schema review board",
      requiredEvidence: ["entity map", "review event map", "retention map"],
      hardStop: "Do not proceed to staging rehearsal without schema diff review.",
    },
    {
      id: "MRSG_GATE_003",
      label: "Backup restore drill is complete enough",
      lane: "backup-restore-drill" as MigrationRehearsalLane,
      score: context.backupRestoreScore - context.backupRestoreItemCount * 3,
      reviewer: context.rehearsalLeadRole,
      requiredEvidence: ["backup proof", "restore proof", "rollback branch"],
      hardStop: "Do not proceed to staging rehearsal without backup and restore drill.",
    },
    {
      id: "MRSG_GATE_004",
      label: "Retention validation is complete enough",
      lane: "retention-validation" as MigrationRehearsalLane,
      score: context.retentionControlScore - context.retentionValidationItemCount * 3,
      reviewer: "retention reviewer",
      requiredEvidence: ["photo retention", "redaction lifecycle", "archive lifecycle"],
      hardStop: "Do not activate storage without retention validation.",
    },
    {
      id: "MRSG_GATE_005",
      label: "Audit event rehearsal is complete enough",
      lane: "audit-event-rehearsal" as MigrationRehearsalLane,
      score: context.humanReviewWorkflowScore - context.auditEventItemCount * 2,
      reviewer: "audit reviewer",
      requiredEvidence: ["review events", "storage gate events", "rollback events"],
      hardStop: "Do not activate storage without audit event rehearsal.",
    },
    {
      id: "MRSG_GATE_006",
      label: "Source blockers are within rehearsal tolerance",
      lane: "human-signoff" as MigrationRehearsalLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before staging-rehearsal-ready state.",
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

function buildRehearsalBoardPack(context: Required<MigrationRehearsalStorageGateInput>): MigrationRehearsalBoardPackItem[] {
  return [
    {
      id: "MRSG_PACK_001",
      label: "Migration rehearsal packet",
      lane: "rehearsal-plan",
      packReady: context.storageBlueprintScore >= 60,
      readinessScore: clampScore(context.storageBlueprintScore),
      reviewerCheck: "Confirm rehearsal remains dry-run and no-execution.",
      includedSections: ["rehearsal sequence", "preflight", "post-rehearsal validation"],
      blockedSections: ["schema execution", "live migration"],
    },
    {
      id: "MRSG_PACK_002",
      label: "Backup restore packet",
      lane: "backup-restore-drill",
      packReady: context.backupRestoreScore >= 55,
      readinessScore: clampScore(context.backupRestoreScore),
      reviewerCheck: "Confirm backup and restore evidence is required before later staging migration.",
      includedSections: ["backup proof", "restore proof", "rollback branch"],
      blockedSections: ["unrehearsed migration", "irreversible storage change"],
    },
    {
      id: "MRSG_PACK_003",
      label: "Retention and audit packet",
      lane: "retention-validation",
      packReady: context.retentionControlScore >= 55,
      readinessScore: clampScore((context.retentionControlScore + context.humanReviewWorkflowScore) / 2),
      reviewerCheck: "Confirm retention and audit event rehearsal before storage activation.",
      includedSections: ["retention proof", "redaction proof", "audit event rehearsal"],
      blockedSections: ["unreviewed photo storage", "untraceable review changes"],
    },
  ];
}

function buildRehearsalRiskRegister(
  context: Required<MigrationRehearsalStorageGateInput>,
  sourceNodes: MigrationRehearsalSourceNode[],
  gates: MigrationRehearsalGateItem[],
): MigrationRehearsalRiskItem[] {
  const risks: MigrationRehearsalRiskItem[] = [];

  if (context.openRehearsalGapCount > 0) {
    risks.push({
      id: "MRSG_RISK_001",
      label: "Open rehearsal gaps",
      lane: "rehearsal-plan",
      severity: context.openRehearsalGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openRehearsalGapCount} rehearsal gaps remain before later staging migration work.`,
      manualResolution: "Resolve through V15.x rehearsal, review and rollback work.",
      blocksRehearsalActivation: true,
    });
  }

  if (context.backupRestoreScore < 70) {
    risks.push({
      id: "MRSG_RISK_002",
      label: "Backup restore drill below threshold",
      lane: "backup-restore-drill",
      severity: "critical",
      reason: "Backup and restore drill is not mature enough for staging migration rehearsal.",
      manualResolution: "Complete backup proof and restore proof before staging work.",
      blocksRehearsalActivation: true,
    });
  }

  if (context.retentionControlScore < 70) {
    risks.push({
      id: "MRSG_RISK_003",
      label: "Retention validation below threshold",
      lane: "retention-validation",
      severity: "elevated",
      reason: "Photo and evidence retention validation is not mature enough.",
      manualResolution: "Complete retention, redaction and archive lifecycle proof.",
      blocksRehearsalActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `MRSG_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksRehearsalActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `MRSG_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Migration rehearsal gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksRehearsalActivation: true,
      });
    });

  return risks;
}

export function buildAiMigrationRehearsalStorageGateReport(
  input: MigrationRehearsalStorageGateInput = {},
): MigrationRehearsalStorageGateReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const rehearsalPlan = buildRehearsalPlan(context);
  const schemaDiffReview = buildSchemaDiffReview(context);
  const backupRestoreDrill = buildBackupRestoreDrill(context);
  const storageGateValidation = buildStorageGateValidation(context);
  const retentionValidation = buildRetentionValidation(context);
  const auditEventRehearsal = buildAuditEventRehearsal(context);
  const rollbackBoard = buildRollbackBoard(context);
  const rehearsalGates = buildRehearsalGates(context, sourceNodes);
  const rehearsalBoardPack = buildRehearsalBoardPack(context);
  const rehearsalRiskRegister = buildRehearsalRiskRegister(context, sourceNodes, rehearsalGates);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const rehearsalAverage =
    rehearsalPlan.reduce((sum, item) => sum + item.rehearsalScore, 0) /
    Math.max(1, rehearsalPlan.length);

  const storageGateAverage =
    storageGateValidation.reduce((sum, item) => sum + item.validationScore, 0) /
    Math.max(1, storageGateValidation.length);

  const gateAverage =
    rehearsalGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, rehearsalGates.length);

  const riskPenalty = rehearsalRiskRegister.filter((item) => item.blocksRehearsalActivation).length * 7;
  const schemaPressure =
    schemaDiffReview.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, schemaDiffReview.length * 4);

  const rehearsalScore = clampScore(
    sourceAverage / 4 +
      rehearsalAverage / 4 +
      storageGateAverage / 4 +
      gateAverage / 4 +
      schemaPressure -
      riskPenalty -
      context.openRehearsalGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openRehearsalGapCount * 8 +
        context.schemaReviewItemCount * 5 +
        context.backupRestoreItemCount * 6 +
        context.storageGateItemCount * 5 +
        context.retentionValidationItemCount * 6,
    ),
  );

  const rehearsalStatus = bandFromScore(
    rehearsalScore,
    rehearsalRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: MIGRATION_REHEARSAL_STORAGE_GATE_GUARDRAIL,
    rehearsalScore,
    rehearsalStatus,
    overallSeverity,
    sourceNodes,
    rehearsalPlan,
    schemaDiffReview,
    backupRestoreDrill,
    storageGateValidation,
    retentionValidation,
    auditEventRehearsal,
    rollbackBoard,
    rehearsalGates,
    rehearsalBoardPack,
    rehearsalRiskRegister,
    stagedRoadmap: {
      v155: "Migration rehearsal and storage gate validation in staging design only.",
      v156: "Manual conversion rehearsal with no automatic execution.",
      v157: "Provider staging activation gate with no production runtime.",
      v158: "Storage rehearsal board with no live migration execution.",
      v160: "Controlled production beta only after provider, storage, review and conversion gates pass.",
    },
    redactedExportBundle: {
      exportId: "migration_rehearsal_storage_gate_v15_5_redacted_dry_run",
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
        "rehearsal plan",
        "schema diff review",
        "backup restore drill",
        "storage gate validation",
        "retention validation",
        "audit event rehearsal",
        "rollback board",
        "rehearsal gates",
        "rehearsal board pack",
        "risk register",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Migration rehearsal storage gate is local dry-run only.",
      "No schema write, migration execution, case storage, review storage, memory write, task creation, intervention creation or execution is performed.",
      "Provider activation, storage activation and automation activation remain blocked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V15.5 prepares staging rehearsal design and storage gate validation only.",
    ],
  };
}

export const aiMigrationRehearsalStorageGateVersion = "V15.5";
