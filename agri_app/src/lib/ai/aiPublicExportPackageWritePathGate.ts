export type PublicExportPackageWriteMode = "dry-run" | "package-write-board-review";

export type PublicExportPackageSeverity = "info" | "watch" | "elevated" | "critical";

export type PublicExportPackagePriority = "low" | "medium" | "high" | "urgent";

export type PublicExportPackageReadinessBand =
  | "blocked"
  | "package-write-design-ready"
  | "manual-board-review-ready"
  | "zero-write-package-plan-ready";

export type PublicExportPackageLane =
  | "package_write_gate"
  | "legal_privacy_write_approval"
  | "export_artifact_boundary"
  | "publication_package_boundary"
  | "retention_board"
  | "access_control_board"
  | "rollback_package_plan"
  | "human_signoff";

export interface PublicExportPackageWriteGuardrail {
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
  providerRuntimeBetaAllowed: false;
  providerRuntimeBetaPerformed: false;
  providerRuntimeCanaryAllowed: false;
  providerRuntimeCanaryPerformed: false;
  providerCanaryCallAllowed: false;
  providerCanaryCallPerformed: false;
  providerCanaryCallExecutionAllowed: false;
  providerCanaryCallExecutionPerformed: false;
  explicitProviderApprovalAllowed: false;
  explicitProviderApprovalPerformed: false;
  providerRequestSendAllowed: false;
  providerRequestSendPerformed: false;
  providerResultReviewAllowed: false;
  providerResultReviewPerformed: false;
  canaryExecutionAllowed: false;
  canaryExecutionPerformed: false;
  canaryResultPersistenceAllowed: false;
  canaryResultPersistencePerformed: false;
  explicitActivationApprovalAllowed: false;
  explicitActivationApprovalPerformed: false;
  productionRuntimeAllowed: false;
  productionRuntimePerformed: false;
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
  complianceExportActivationAllowed: false;
  complianceExportActivationPerformed: false;
  publicComplianceExportPublicationAllowed: false;
  publicComplianceExportPublicationPerformed: false;
  publicExportPackageWriteAllowed: false;
  publicExportPackageWritePerformed: false;
  publicExportArtifactWriteAllowed: false;
  publicExportArtifactWritePerformed: false;
  publicationPackageWriteAllowed: false;
  publicationPackageWritePerformed: false;
  exportRetentionWriteAllowed: false;
  exportRetentionWritePerformed: false;
  exportAccessControlWriteAllowed: false;
  exportAccessControlWritePerformed: false;
  legalFinalApprovalAllowed: false;
  legalFinalApprovalPerformed: false;
  privacyFinalApprovalAllowed: false;
  privacyFinalApprovalPerformed: false;
  publicExportPackageWritePathGateReady: true;
  legalPrivacyWriteApprovalLockReady: true;
  exportArtifactBoundaryReady: true;
  packageWriteNoGoReady: true;
}

export interface PublicExportPackageWriteInput {
  packageGateItemCount?: number;
  legalPrivacyApprovalItemCount?: number;
  artifactBoundaryItemCount?: number;
  publicationBoundaryItemCount?: number;
  retentionItemCount?: number;
  accessControlItemCount?: number;
  openPackageWriteGapCount?: number;
  onlineReadinessScore?: number;
  publicationGateScore?: number;
  incidentWriteGateScore?: number;
  legalApprovalScore?: number;
  privacyApprovalScore?: number;
  artifactBoundaryScore?: number;
  retentionScore?: number;
  packageWriteLeadRole?: string;
}

export interface PublicExportPackageSourceNode {
  id: string;
  lane: PublicExportPackageLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: PublicExportPackageSeverity;
  priority: PublicExportPackagePriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface PackageWriteGateItem {
  id: string;
  label: string;
  lane: PublicExportPackageLane;
  gateScore: number;
  severity: PublicExportPackageSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface LegalPrivacyWriteApprovalItem {
  id: string;
  label: string;
  lane: PublicExportPackageLane;
  approvalScore: number;
  priority: PublicExportPackagePriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ExportArtifactBoundaryItem {
  id: string;
  label: string;
  lane: PublicExportPackageLane;
  boundaryScore: number;
  severity: PublicExportPackageSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface PublicationPackageBoundaryItem {
  id: string;
  label: string;
  lane: PublicExportPackageLane;
  boundaryScore: number;
  severity: PublicExportPackageSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface RetentionBoardItem {
  id: string;
  label: string;
  lane: PublicExportPackageLane;
  retentionScore: number;
  priority: PublicExportPackagePriority;
  retentionQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface AccessControlBoardItem {
  id: string;
  label: string;
  lane: PublicExportPackageLane;
  accessScore: number;
  severity: PublicExportPackageSeverity;
  accessQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface RollbackPackagePlanItem {
  id: string;
  label: string;
  lane: PublicExportPackageLane;
  rollbackScore: number;
  priority: PublicExportPackagePriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface PackageWriteNoGoItem {
  id: string;
  label: string;
  lane: PublicExportPackageLane;
  goNoGoState: "no-go" | "design-only" | "zero-write-package-plan-ready";
  score: number;
  severity: PublicExportPackageSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface PackageWriteGateCheckItem {
  id: string;
  label: string;
  lane: PublicExportPackageLane;
  passed: boolean;
  score: number;
  severity: PublicExportPackageSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface PackageWriteBoardPackItem {
  id: string;
  label: string;
  lane: PublicExportPackageLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface PackageWriteFindingItem {
  id: string;
  label: string;
  lane: PublicExportPackageLane;
  severity: PublicExportPackageSeverity;
  reason: string;
  manualResolution: string;
  blocksPackageWriteActivation: boolean;
}

export interface PublicExportPackageWritePathReport {
  generatedAt: string;
  mode: PublicExportPackageWriteMode;
  context: Required<PublicExportPackageWriteInput>;
  readiness: PublicExportPackageWriteGuardrail;
  packageWriteScore: number;
  packageWriteStatus: PublicExportPackageReadinessBand;
  overallSeverity: PublicExportPackageSeverity;
  sourceNodes: PublicExportPackageSourceNode[];
  packageWriteGate: PackageWriteGateItem[];
  legalPrivacyWriteApprovalLock: LegalPrivacyWriteApprovalItem[];
  exportArtifactBoundary: ExportArtifactBoundaryItem[];
  publicationPackageBoundary: PublicationPackageBoundaryItem[];
  retentionBoard: RetentionBoardItem[];
  accessControlBoard: AccessControlBoardItem[];
  rollbackPackagePlan: RollbackPackagePlanItem[];
  packageWriteNoGoBoard: PackageWriteNoGoItem[];
  packageWriteGateChecks: PackageWriteGateCheckItem[];
  packageWriteBoardPack: PackageWriteBoardPackItem[];
  packageWriteFindings: PackageWriteFindingItem[];
  stagedRoadmap: {
    v174: string;
    v175: string;
    v176: string;
    v177: string;
    v178: string;
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

export const PUBLIC_EXPORT_PACKAGE_WRITE_GUARDRAIL: PublicExportPackageWriteGuardrail = {
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
  providerRuntimeBetaAllowed: false,
  providerRuntimeBetaPerformed: false,
  providerRuntimeCanaryAllowed: false,
  providerRuntimeCanaryPerformed: false,
  providerCanaryCallAllowed: false,
  providerCanaryCallPerformed: false,
  providerCanaryCallExecutionAllowed: false,
  providerCanaryCallExecutionPerformed: false,
  explicitProviderApprovalAllowed: false,
  explicitProviderApprovalPerformed: false,
  providerRequestSendAllowed: false,
  providerRequestSendPerformed: false,
  providerResultReviewAllowed: false,
  providerResultReviewPerformed: false,
  canaryExecutionAllowed: false,
  canaryExecutionPerformed: false,
  canaryResultPersistenceAllowed: false,
  canaryResultPersistencePerformed: false,
  explicitActivationApprovalAllowed: false,
  explicitActivationApprovalPerformed: false,
  productionRuntimeAllowed: false,
  productionRuntimePerformed: false,
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
  complianceExportActivationAllowed: false,
  complianceExportActivationPerformed: false,
  publicComplianceExportPublicationAllowed: false,
  publicComplianceExportPublicationPerformed: false,
  publicExportPackageWriteAllowed: false,
  publicExportPackageWritePerformed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  publicationPackageWriteAllowed: false,
  publicationPackageWritePerformed: false,
  exportRetentionWriteAllowed: false,
  exportRetentionWritePerformed: false,
  exportAccessControlWriteAllowed: false,
  exportAccessControlWritePerformed: false,
  legalFinalApprovalAllowed: false,
  legalFinalApprovalPerformed: false,
  privacyFinalApprovalAllowed: false,
  privacyFinalApprovalPerformed: false,
  publicExportPackageWritePathGateReady: true,
  legalPrivacyWriteApprovalLockReady: true,
  exportArtifactBoundaryReady: true,
  packageWriteNoGoReady: true,
};

const priorityWeight: Record<PublicExportPackagePriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: PublicExportPackageWriteInput): Required<PublicExportPackageWriteInput> {
  return {
    packageGateItemCount: input.packageGateItemCount ?? 8,
    legalPrivacyApprovalItemCount: input.legalPrivacyApprovalItemCount ?? 8,
    artifactBoundaryItemCount: input.artifactBoundaryItemCount ?? 8,
    publicationBoundaryItemCount: input.publicationBoundaryItemCount ?? 7,
    retentionItemCount: input.retentionItemCount ?? 7,
    accessControlItemCount: input.accessControlItemCount ?? 7,
    openPackageWriteGapCount: input.openPackageWriteGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    publicationGateScore: input.publicationGateScore ?? 70,
    incidentWriteGateScore: input.incidentWriteGateScore ?? 70,
    legalApprovalScore: input.legalApprovalScore ?? 64,
    privacyApprovalScore: input.privacyApprovalScore ?? 66,
    artifactBoundaryScore: input.artifactBoundaryScore ?? 68,
    retentionScore: input.retentionScore ?? 66,
    packageWriteLeadRole: input.packageWriteLeadRole ?? "public export package write reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): PublicExportPackageSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: PublicExportPackageSeverity): PublicExportPackagePriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): PublicExportPackageReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-write-package-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "package-write-design-ready";
}

function buildSourceNode(
  id: string,
  lane: PublicExportPackageLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): PublicExportPackageSourceNode {
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
            "Public export package write gate remains below activation threshold.",
            "Package board must resolve legal, privacy, artifact, retention, access control and rollback gaps before any later package write release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<PublicExportPackageWriteInput>): PublicExportPackageSourceNode[] {
  const packagePressure = context.packageGateItemCount;
  const approvalPressure = context.legalPrivacyApprovalItemCount * 2;
  const artifactPressure = context.artifactBoundaryItemCount;
  const publicationPressure = context.publicationBoundaryItemCount;
  const retentionPressure = context.retentionItemCount * 2;
  const gapPressure = context.openPackageWriteGapCount * 2;

  return [
    buildSourceNode(
      "PEPW_NODE_001",
      "package_write_gate",
      "Public compliance export publication gate",
      "V17.0",
      context.publicationGateScore,
      context.privacyApprovalScore,
      packagePressure,
      "Connect public publication design to future package write governance.",
    ),
    buildSourceNode(
      "PEPW_NODE_002",
      "legal_privacy_write_approval",
      "Legal privacy write approval lock",
      "V17.4",
      Math.min(context.legalApprovalScore, context.privacyApprovalScore),
      context.publicationGateScore,
      approvalPressure,
      "Prepare legal and privacy write approval without package writes.",
    ),
    buildSourceNode(
      "PEPW_NODE_003",
      "export_artifact_boundary",
      "Export artifact boundary",
      "V17.4",
      context.artifactBoundaryScore,
      context.privacyApprovalScore,
      artifactPressure,
      "Keep export artifact, index and checksum writes blocked.",
    ),
    buildSourceNode(
      "PEPW_NODE_004",
      "publication_package_boundary",
      "Publication package boundary",
      "V17.4",
      context.publicationGateScore,
      context.artifactBoundaryScore,
      publicationPressure,
      "Keep publication package and public share blocked.",
    ),
    buildSourceNode(
      "PEPW_NODE_005",
      "retention_board",
      "Retention and lifecycle board",
      "V17.4",
      context.retentionScore,
      context.legalApprovalScore,
      retentionPressure,
      "Prepare retention lifecycle without persistent artifacts.",
    ),
    buildSourceNode(
      "PEPW_NODE_006",
      "access_control_board",
      "Incident handling write path gate",
      "V17.3",
      context.incidentWriteGateScore,
      context.onlineReadinessScore,
      context.accessControlItemCount,
      "Keep incident data and internal records out of public export package.",
    ),
    buildSourceNode(
      "PEPW_NODE_007",
      "rollback_package_plan",
      "Package rollback design",
      "V17.4",
      context.incidentWriteGateScore,
      context.retentionScore,
      gapPressure,
      "Prepare package rollback plan without actual artifact writes.",
    ),
    buildSourceNode(
      "PEPW_NODE_008",
      "human_signoff",
      "Package write human signoff",
      "V17.4",
      context.legalApprovalScore,
      context.privacyApprovalScore,
      gapPressure,
      "Keep package write activation blocked until a separate legal and privacy release.",
    ),
  ];
}

function buildPackageWriteGate(context: Required<PublicExportPackageWriteInput>): PackageWriteGateItem[] {
  return [
    {
      id: "PEPW_GATE_001",
      label: "Public export package write lock",
      lane: "package_write_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep public export package write disabled in V17.4.",
      requiredEvidence: ["publicExportPackageWriteAllowed=false", "publicationPackageWriteAllowed=false", "publicShareAllowed=false"],
      blockedOutcome: "No public export package write.",
    },
    {
      id: "PEPW_GATE_002",
      label: "Zero-write package plan",
      lane: "package_write_gate",
      gateScore: clampScore(context.publicationGateScore),
      severity: severityFromConcern(100 - context.publicationGateScore + context.packageGateItemCount * 4),
      gatePurpose: "Prepare package write flow without creating artifacts.",
      requiredEvidence: ["legal approval lock", "privacy approval lock", "artifact boundary", "retention board"],
      blockedOutcome: "No package artifact write.",
    },
    {
      id: "PEPW_GATE_003",
      label: "Legal privacy package approval lock",
      lane: "package_write_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require a separate future release before any package write approval.",
      requiredEvidence: ["legalFinalApprovalAllowed=false", "privacyFinalApprovalAllowed=false"],
      blockedOutcome: "No final package approval.",
    },
  ];
}

function buildLegalPrivacyWriteApprovalLock(context: Required<PublicExportPackageWriteInput>): LegalPrivacyWriteApprovalItem[] {
  return [
    {
      id: "PEPW_APPROVAL_001",
      label: "Legal package write approval design",
      lane: "legal_privacy_write_approval",
      approvalScore: clampScore(context.legalApprovalScore),
      priority: context.legalApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can legal package write approval be reviewed without writing artifacts?",
      requiredEvidence: ["legal review lock", "package no-go", "scope caveat"],
      blockedOutcome: "No legal package approval.",
    },
    {
      id: "PEPW_APPROVAL_002",
      label: "Privacy package write approval design",
      lane: "legal_privacy_write_approval",
      approvalScore: clampScore(context.privacyApprovalScore),
      priority: context.privacyApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can privacy package write approval be reviewed without writing artifacts?",
      requiredEvidence: ["privacy review lock", "redaction caveat", "identity exclusion"],
      blockedOutcome: "No privacy package approval.",
    },
    {
      id: "PEPW_APPROVAL_003",
      label: "Joint legal privacy hold",
      lane: "legal_privacy_write_approval",
      approvalScore: clampScore((context.legalApprovalScore + context.privacyApprovalScore) / 2),
      priority: "urgent",
      approvalQuestion: "Can joint legal and privacy approval remain blocked?",
      requiredEvidence: ["legalFinalApprovalAllowed=false", "privacyFinalApprovalAllowed=false"],
      blockedOutcome: "No joint approval.",
    },
  ];
}

function buildExportArtifactBoundary(): ExportArtifactBoundaryItem[] {
  return [
    {
      id: "PEPW_ARTIFACT_001",
      label: "Export artifact write boundary",
      lane: "export_artifact_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No export artifact can be written.",
      blockedOutcome: "publicExportArtifactWriteAllowed=false",
    },
    {
      id: "PEPW_ARTIFACT_002",
      label: "Package index write boundary",
      lane: "export_artifact_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No package index can be written.",
      blockedOutcome: "publicationPackageWriteAllowed=false",
    },
    {
      id: "PEPW_ARTIFACT_003",
      label: "Retention record write boundary",
      lane: "export_artifact_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No retention record can be written.",
      blockedOutcome: "exportRetentionWriteAllowed=false",
    },
  ];
}

function buildPublicationPackageBoundary(): PublicationPackageBoundaryItem[] {
  return [
    {
      id: "PEPW_PACKAGE_001",
      label: "Publication package write boundary",
      lane: "publication_package_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No publication package can be written.",
      blockedOutcome: "publicationPackageWriteAllowed=false",
    },
    {
      id: "PEPW_PACKAGE_002",
      label: "Public share boundary",
      lane: "publication_package_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No public share can occur.",
      blockedOutcome: "publicShareAllowed=false",
    },
    {
      id: "PEPW_PACKAGE_003",
      label: "Compliance export boundary",
      lane: "publication_package_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No compliance export can be performed.",
      blockedOutcome: "complianceExportPerformed=false",
    },
  ];
}

function buildRetentionBoard(context: Required<PublicExportPackageWriteInput>): RetentionBoardItem[] {
  return [
    {
      id: "PEPW_RETENTION_001",
      label: "Retention lifecycle design",
      lane: "retention_board",
      retentionScore: clampScore(context.retentionScore),
      priority: context.retentionScore < 70 ? "urgent" : "high",
      retentionQuestion: "Can retention lifecycle be reviewed without artifact persistence?",
      requiredControls: ["lifecycle note", "reviewer hold", "package no-go"],
      manualResolution: "Keep retention lifecycle local and dry-run.",
    },
    {
      id: "PEPW_RETENTION_002",
      label: "Deletion rollback design",
      lane: "retention_board",
      retentionScore: 100,
      priority: "urgent",
      retentionQuestion: "Can deletion rollback remain design-only?",
      requiredControls: ["no artifact", "no deletion", "rollback note"],
      manualResolution: "No artifact exists in V17.4.",
    },
    {
      id: "PEPW_RETENTION_003",
      label: "Retention publication caveat",
      lane: "retention_board",
      retentionScore: clampScore(context.legalApprovalScore),
      priority: "high",
      retentionQuestion: "Can legal retention caveats remain unapproved?",
      requiredControls: ["legal hold", "privacy hold", "no publication"],
      manualResolution: "Hold for legal and privacy board.",
    },
  ];
}

function buildAccessControlBoard(): AccessControlBoardItem[] {
  return [
    {
      id: "PEPW_ACCESS_001",
      label: "Export access control write boundary",
      lane: "access_control_board",
      accessScore: 100,
      severity: "critical",
      accessQuestion: "Can access control writes remain blocked?",
      requiredChecks: ["exportAccessControlWriteAllowed=false", "exportAccessControlWritePerformed=false"],
      manualResolution: "No access control write is performed.",
    },
    {
      id: "PEPW_ACCESS_002",
      label: "Private data exclusion check",
      lane: "access_control_board",
      accessScore: 100,
      severity: "critical",
      accessQuestion: "Can field identity and internal records remain excluded?",
      requiredChecks: ["no field identifiers", "no internal records", "no incident records"],
      manualResolution: "Block package if private data appears.",
    },
    {
      id: "PEPW_ACCESS_003",
      label: "Provider payload exclusion check",
      lane: "access_control_board",
      accessScore: 100,
      severity: "critical",
      accessQuestion: "Can provider payloads remain excluded?",
      requiredChecks: ["no provider payloads", "no request payloads", "no result payloads"],
      manualResolution: "Block package if provider payload appears.",
    },
  ];
}

function buildRollbackPackagePlan(context: Required<PublicExportPackageWriteInput>): RollbackPackagePlanItem[] {
  return [
    {
      id: "PEPW_ROLLBACK_001",
      label: "Package write rollback plan",
      lane: "rollback_package_plan",
      rollbackScore: clampScore(context.incidentWriteGateScore),
      priority: context.incidentWriteGateScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future package write release return to zero-write state?",
      safeFallback: "Return to local dry-run and package no-go board.",
    },
    {
      id: "PEPW_ROLLBACK_002",
      label: "Publication package rollback plan",
      lane: "rollback_package_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can package artifact writes remain blocked?",
      safeFallback: "No package artifact exists in V17.4.",
    },
    {
      id: "PEPW_ROLLBACK_003",
      label: "Public share rollback plan",
      lane: "rollback_package_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can public share remain blocked?",
      safeFallback: "No public share path exists in V17.4.",
    },
  ];
}

function buildPackageWriteNoGoBoard(): PackageWriteNoGoItem[] {
  return [
    {
      id: "PEPW_GONOGO_001",
      label: "Public export package write plan",
      lane: "human_signoff",
      goNoGoState: "zero-write-package-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["legal approval", "privacy approval", "artifact boundary", "retention board"],
      safeOutcome: "Package write plan only.",
    },
    {
      id: "PEPW_GONOGO_002",
      label: "Actual public export package write",
      lane: "package_write_gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate package write release", "legal final approval", "privacy final approval"],
      safeOutcome: "Public export package write remains blocked.",
    },
    {
      id: "PEPW_GONOGO_003",
      label: "Public share or artifact persistence",
      lane: "publication_package_boundary",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate publication release", "artifact proof", "rollback proof"],
      safeOutcome: "Public share and artifact persistence remain blocked.",
    },
  ];
}

function buildPackageWriteGateChecks(
  context: Required<PublicExportPackageWriteInput>,
  sourceNodes: PublicExportPackageSourceNode[],
): PackageWriteGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PEPW_CHECK_001",
      label: "Package write gate remains zero-write",
      lane: "package_write_gate" as PublicExportPackageLane,
      score: 100,
      reviewer: "public export package write reviewer",
      requiredEvidence: ["publicExportPackageWriteAllowed=false", "publicationPackageWriteAllowed=false", "publicShareAllowed=false"],
      hardStop: "Do not activate public export package write in V17.4.",
    },
    {
      id: "PEPW_CHECK_002",
      label: "Legal privacy approval is complete enough",
      lane: "legal_privacy_write_approval" as PublicExportPackageLane,
      score: Math.min(context.legalApprovalScore, context.privacyApprovalScore) - context.legalPrivacyApprovalItemCount * 3,
      reviewer: context.packageWriteLeadRole,
      requiredEvidence: ["legal approval lock", "privacy approval lock", "joint approval hold"],
      hardStop: "Do not proceed without legal and privacy write approval board.",
    },
    {
      id: "PEPW_CHECK_003",
      label: "Export artifact boundary is complete",
      lane: "export_artifact_boundary" as PublicExportPackageLane,
      score: 100,
      reviewer: "export artifact boundary reviewer",
      requiredEvidence: ["artifact boundary", "index boundary", "retention boundary"],
      hardStop: "Export artifact boundaries must remain active.",
    },
    {
      id: "PEPW_CHECK_004",
      label: "Publication package boundary is complete",
      lane: "publication_package_boundary" as PublicExportPackageLane,
      score: 100,
      reviewer: "publication package boundary reviewer",
      requiredEvidence: ["package write boundary", "public share boundary", "compliance export boundary"],
      hardStop: "Publication package boundaries must remain active.",
    },
    {
      id: "PEPW_CHECK_005",
      label: "Retention board is complete enough",
      lane: "retention_board" as PublicExportPackageLane,
      score: context.retentionScore - context.retentionItemCount * 3,
      reviewer: "retention lifecycle reviewer",
      requiredEvidence: ["retention lifecycle", "deletion rollback", "legal caveat"],
      hardStop: "Do not proceed without retention board.",
    },
    {
      id: "PEPW_CHECK_006",
      label: "Source blockers are within package write tolerance",
      lane: "human_signoff" as PublicExportPackageLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before zero-write-package-plan-ready state.",
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

function buildBoardPack(context: Required<PublicExportPackageWriteInput>): PackageWriteBoardPackItem[] {
  return [
    {
      id: "PEPW_PACK_001",
      label: "Package write gate packet",
      lane: "package_write_gate",
      packReady: context.publicationGateScore >= 60,
      readinessScore: clampScore(context.publicationGateScore),
      reviewerCheck: "Confirm package write remains zero-write and design-only.",
      includedSections: ["package gate", "artifact boundary", "package no-go"],
      blockedSections: ["package write", "artifact persistence", "public share"],
    },
    {
      id: "PEPW_PACK_002",
      label: "Legal privacy and access packet",
      lane: "legal_privacy_write_approval",
      packReady: context.legalApprovalScore >= 60 && context.privacyApprovalScore >= 60,
      readinessScore: clampScore((context.legalApprovalScore + context.privacyApprovalScore) / 2),
      reviewerCheck: "Confirm legal, privacy and access approvals remain locked.",
      includedSections: ["legal hold", "privacy hold", "access control board"],
      blockedSections: ["legal approval performed", "privacy approval performed", "access control write"],
    },
    {
      id: "PEPW_PACK_003",
      label: "Retention and rollback packet",
      lane: "retention_board",
      packReady: context.retentionScore >= 60,
      readinessScore: clampScore(context.retentionScore),
      reviewerCheck: "Confirm retention and rollback are dry-run only.",
      includedSections: ["retention lifecycle", "deletion rollback", "package rollback"],
      blockedSections: ["retention record write", "artifact deletion", "public takedown"],
    },
  ];
}

function buildFindings(
  context: Required<PublicExportPackageWriteInput>,
  sourceNodes: PublicExportPackageSourceNode[],
  gates: PackageWriteGateCheckItem[],
  goNoGo: PackageWriteNoGoItem[],
): PackageWriteFindingItem[] {
  const findings: PackageWriteFindingItem[] = [];

  if (context.openPackageWriteGapCount > 0) {
    findings.push({
      id: "PEPW_FINDING_001",
      label: "Open package write gaps",
      lane: "human_signoff",
      severity: context.openPackageWriteGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openPackageWriteGapCount} package write gaps remain before any later activation.`,
      manualResolution: "Resolve legal, privacy, artifact, retention, access control and rollback gaps in a later gated release.",
      blocksPackageWriteActivation: true,
    });
  }

  if (context.legalApprovalScore < 70) {
    findings.push({
      id: "PEPW_FINDING_002",
      label: "Legal approval below threshold",
      lane: "legal_privacy_write_approval",
      severity: "critical",
      reason: "Legal approval is not mature enough for package write activation.",
      manualResolution: "Complete legal package approval review.",
      blocksPackageWriteActivation: true,
    });
  }

  if (context.privacyApprovalScore < 70) {
    findings.push({
      id: "PEPW_FINDING_003",
      label: "Privacy approval below threshold",
      lane: "legal_privacy_write_approval",
      severity: "critical",
      reason: "Privacy approval is not mature enough for package write activation.",
      manualResolution: "Complete privacy package approval review.",
      blocksPackageWriteActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `PEPW_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksPackageWriteActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `PEPW_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Package write gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksPackageWriteActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `PEPW_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksPackageWriteActivation: true,
      });
    });

  return findings;
}

export function buildAiPublicExportPackageWritePathGateReport(
  input: PublicExportPackageWriteInput = {},
): PublicExportPackageWritePathReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const packageWriteGate = buildPackageWriteGate(context);
  const legalPrivacyWriteApprovalLock = buildLegalPrivacyWriteApprovalLock(context);
  const exportArtifactBoundary = buildExportArtifactBoundary();
  const publicationPackageBoundary = buildPublicationPackageBoundary();
  const retentionBoard = buildRetentionBoard(context);
  const accessControlBoard = buildAccessControlBoard();
  const rollbackPackagePlan = buildRollbackPackagePlan(context);
  const packageWriteNoGoBoard = buildPackageWriteNoGoBoard();
  const packageWriteGateChecks = buildPackageWriteGateChecks(context, sourceNodes);
  const packageWriteBoardPack = buildBoardPack(context);
  const packageWriteFindings = buildFindings(context, sourceNodes, packageWriteGateChecks, packageWriteNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    packageWriteGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, packageWriteGate.length);

  const approvalAverage =
    legalPrivacyWriteApprovalLock.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, legalPrivacyWriteApprovalLock.length);

  const gateAverage =
    packageWriteGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, packageWriteGateChecks.length);

  const findingPenalty = packageWriteFindings.filter((item) => item.blocksPackageWriteActivation).length * 7;
  const rollbackPressure =
    rollbackPackagePlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, rollbackPackagePlan.length * 4);

  const packageWriteScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      approvalAverage / 4 +
      gateAverage / 4 +
      rollbackPressure -
      findingPenalty -
      context.openPackageWriteGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openPackageWriteGapCount * 8 +
        context.legalPrivacyApprovalItemCount * 6 +
        context.artifactBoundaryItemCount * 5 +
        context.publicationBoundaryItemCount * 5 +
        context.retentionItemCount * 6,
    ),
  );

  const packageWriteStatus = bandFromScore(
    packageWriteScore,
    packageWriteFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PUBLIC_EXPORT_PACKAGE_WRITE_GUARDRAIL,
    packageWriteScore,
    packageWriteStatus,
    overallSeverity,
    sourceNodes,
    packageWriteGate,
    legalPrivacyWriteApprovalLock,
    exportArtifactBoundary,
    publicationPackageBoundary,
    retentionBoard,
    accessControlBoard,
    rollbackPackagePlan,
    packageWriteNoGoBoard,
    packageWriteGateChecks,
    packageWriteBoardPack,
    packageWriteFindings,
    stagedRoadmap: {
      v174: "Public export package write path gate in zero-write dry-run.",
      v175: "Task and intervention creation only after explicit operational write approval.",
      v176: "Provider call execution only after explicit provider approval.",
      v177: "Incident record write only after explicit incident governance approval.",
      v178: "Public export artifact write only after explicit legal and privacy approval.",
    },
    redactedExportBundle: {
      exportId: "public_export_package_write_path_gate_v17_4_redacted_dry_run",
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
        "package write gate",
        "legal privacy approval lock",
        "export artifact boundary",
        "publication package boundary",
        "retention board",
        "access control board",
        "rollback package plan",
        "package write no-go board",
        "package write gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Public export package write path gate is local dry-run only.",
      "No export artifact write, publication package write, retention record write, access control write, public share, provider call, storage activation, task creation, intervention creation or execution is performed.",
      "Legal and privacy package write approvals remain locked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V17.4 prepares public export package write governance only.",
    ],
  };
}

export const aiPublicExportPackageWritePathGateVersion = "V17.4";
