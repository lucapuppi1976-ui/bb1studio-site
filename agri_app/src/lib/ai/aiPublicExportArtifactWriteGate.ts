export type PublicExportArtifactWriteMode = "dry-run" | "artifact-board-review";

export type PublicExportArtifactSeverity = "info" | "watch" | "elevated" | "critical";

export type PublicExportArtifactPriority = "low" | "medium" | "high" | "urgent";

export type PublicExportArtifactReadinessBand =
  | "blocked"
  | "artifact-write-design-ready"
  | "manual-board-review-ready"
  | "zero-write-artifact-plan-ready";

export type PublicExportArtifactLane =
  | "artifact_write_gate"
  | "legal_privacy_final_artifact_approval"
  | "manifest_write_boundary"
  | "checksum_write_boundary"
  | "archive_write_boundary"
  | "access_control_boundary"
  | "rollback_artifact_plan"
  | "human_signoff";

export interface PublicExportArtifactWriteGuardrail {
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
  providerCallExecutionAllowed: false;
  providerCallExecutionPerformed: false;
  explicitProviderApprovalAllowed: false;
  explicitProviderApprovalPerformed: false;
  providerRequestDispatchAllowed: false;
  providerRequestDispatchPerformed: false;
  providerResponseIntakeAllowed: false;
  providerResponseIntakePerformed: false;
  providerResponseReviewAllowed: false;
  providerResponseReviewPerformed: false;
  providerResultPersistenceAllowed: false;
  providerResultPersistencePerformed: false;
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
  publicComplianceExportPublicationAllowed: false;
  publicComplianceExportPublicationPerformed: false;
  publicExportPackageWriteAllowed: false;
  publicExportPackageWritePerformed: false;
  publicExportArtifactWriteAllowed: false;
  publicExportArtifactWritePerformed: false;
  publicExportManifestWriteAllowed: false;
  publicExportManifestWritePerformed: false;
  publicExportChecksumWriteAllowed: false;
  publicExportChecksumWritePerformed: false;
  publicExportArchiveWriteAllowed: false;
  publicExportArchiveWritePerformed: false;
  publicExportAccessControlWriteAllowed: false;
  publicExportAccessControlWritePerformed: false;
  publicExportArtifactFinalApprovalAllowed: false;
  publicExportArtifactFinalApprovalPerformed: false;
  legalFinalApprovalAllowed: false;
  legalFinalApprovalPerformed: false;
  privacyFinalApprovalAllowed: false;
  privacyFinalApprovalPerformed: false;
  publicExportArtifactWriteGateReady: true;
  legalPrivacyFinalArtifactApprovalLockReady: true;
  manifestChecksumBoundaryReady: true;
  artifactWriteNoGoReady: true;
}

export interface PublicExportArtifactWriteInput {
  artifactGateItemCount?: number;
  approvalItemCount?: number;
  manifestBoundaryItemCount?: number;
  checksumBoundaryItemCount?: number;
  archiveBoundaryItemCount?: number;
  accessBoundaryItemCount?: number;
  openArtifactWriteGapCount?: number;
  onlineReadinessScore?: number;
  packageWriteScore?: number;
  recordWriteScore?: number;
  providerCallScore?: number;
  legalApprovalScore?: number;
  privacyApprovalScore?: number;
  artifactBoundaryScore?: number;
  artifactWriteLeadRole?: string;
}

export interface PublicExportArtifactSourceNode {
  id: string;
  lane: PublicExportArtifactLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: PublicExportArtifactSeverity;
  priority: PublicExportArtifactPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ArtifactWriteGateItem {
  id: string;
  label: string;
  lane: PublicExportArtifactLane;
  gateScore: number;
  severity: PublicExportArtifactSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface LegalPrivacyFinalArtifactApprovalItem {
  id: string;
  label: string;
  lane: PublicExportArtifactLane;
  approvalScore: number;
  priority: PublicExportArtifactPriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ManifestWriteBoundaryItem {
  id: string;
  label: string;
  lane: PublicExportArtifactLane;
  boundaryScore: number;
  severity: PublicExportArtifactSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface ChecksumWriteBoundaryItem {
  id: string;
  label: string;
  lane: PublicExportArtifactLane;
  boundaryScore: number;
  severity: PublicExportArtifactSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface ArchiveWriteBoundaryItem {
  id: string;
  label: string;
  lane: PublicExportArtifactLane;
  archiveScore: number;
  priority: PublicExportArtifactPriority;
  archiveQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface AccessControlBoundaryItem {
  id: string;
  label: string;
  lane: PublicExportArtifactLane;
  accessScore: number;
  severity: PublicExportArtifactSeverity;
  accessQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface RollbackArtifactPlanItem {
  id: string;
  label: string;
  lane: PublicExportArtifactLane;
  rollbackScore: number;
  priority: PublicExportArtifactPriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface ArtifactWriteNoGoItem {
  id: string;
  label: string;
  lane: PublicExportArtifactLane;
  goNoGoState: "no-go" | "design-only" | "zero-write-artifact-plan-ready";
  score: number;
  severity: PublicExportArtifactSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface ArtifactWriteGateCheckItem {
  id: string;
  label: string;
  lane: PublicExportArtifactLane;
  passed: boolean;
  score: number;
  severity: PublicExportArtifactSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ArtifactWriteBoardPackItem {
  id: string;
  label: string;
  lane: PublicExportArtifactLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ArtifactWriteFindingItem {
  id: string;
  label: string;
  lane: PublicExportArtifactLane;
  severity: PublicExportArtifactSeverity;
  reason: string;
  manualResolution: string;
  blocksArtifactWriteActivation: boolean;
}

export interface PublicExportArtifactWriteReport {
  generatedAt: string;
  mode: PublicExportArtifactWriteMode;
  context: Required<PublicExportArtifactWriteInput>;
  readiness: PublicExportArtifactWriteGuardrail;
  artifactWriteScore: number;
  artifactWriteStatus: PublicExportArtifactReadinessBand;
  overallSeverity: PublicExportArtifactSeverity;
  sourceNodes: PublicExportArtifactSourceNode[];
  artifactWriteGate: ArtifactWriteGateItem[];
  legalPrivacyFinalArtifactApprovalLock: LegalPrivacyFinalArtifactApprovalItem[];
  manifestWriteBoundary: ManifestWriteBoundaryItem[];
  checksumWriteBoundary: ChecksumWriteBoundaryItem[];
  archiveWriteBoundary: ArchiveWriteBoundaryItem[];
  accessControlBoundary: AccessControlBoundaryItem[];
  rollbackArtifactPlan: RollbackArtifactPlanItem[];
  artifactWriteNoGoBoard: ArtifactWriteNoGoItem[];
  artifactWriteGateChecks: ArtifactWriteGateCheckItem[];
  artifactWriteBoardPack: ArtifactWriteBoardPackItem[];
  artifactWriteFindings: ArtifactWriteFindingItem[];
  stagedRoadmap: {
    v178: string;
    v179: string;
    v180: string;
    v181: string;
    v182: string;
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

export const PUBLIC_EXPORT_ARTIFACT_WRITE_GUARDRAIL: PublicExportArtifactWriteGuardrail = {
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
  providerCallExecutionAllowed: false,
  providerCallExecutionPerformed: false,
  explicitProviderApprovalAllowed: false,
  explicitProviderApprovalPerformed: false,
  providerRequestDispatchAllowed: false,
  providerRequestDispatchPerformed: false,
  providerResponseIntakeAllowed: false,
  providerResponseIntakePerformed: false,
  providerResponseReviewAllowed: false,
  providerResponseReviewPerformed: false,
  providerResultPersistenceAllowed: false,
  providerResultPersistencePerformed: false,
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
  publicComplianceExportPublicationAllowed: false,
  publicComplianceExportPublicationPerformed: false,
  publicExportPackageWriteAllowed: false,
  publicExportPackageWritePerformed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  publicExportManifestWriteAllowed: false,
  publicExportManifestWritePerformed: false,
  publicExportChecksumWriteAllowed: false,
  publicExportChecksumWritePerformed: false,
  publicExportArchiveWriteAllowed: false,
  publicExportArchiveWritePerformed: false,
  publicExportAccessControlWriteAllowed: false,
  publicExportAccessControlWritePerformed: false,
  publicExportArtifactFinalApprovalAllowed: false,
  publicExportArtifactFinalApprovalPerformed: false,
  legalFinalApprovalAllowed: false,
  legalFinalApprovalPerformed: false,
  privacyFinalApprovalAllowed: false,
  privacyFinalApprovalPerformed: false,
  publicExportArtifactWriteGateReady: true,
  legalPrivacyFinalArtifactApprovalLockReady: true,
  manifestChecksumBoundaryReady: true,
  artifactWriteNoGoReady: true,
};

const priorityWeight: Record<PublicExportArtifactPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: PublicExportArtifactWriteInput): Required<PublicExportArtifactWriteInput> {
  return {
    artifactGateItemCount: input.artifactGateItemCount ?? 8,
    approvalItemCount: input.approvalItemCount ?? 8,
    manifestBoundaryItemCount: input.manifestBoundaryItemCount ?? 8,
    checksumBoundaryItemCount: input.checksumBoundaryItemCount ?? 8,
    archiveBoundaryItemCount: input.archiveBoundaryItemCount ?? 7,
    accessBoundaryItemCount: input.accessBoundaryItemCount ?? 7,
    openArtifactWriteGapCount: input.openArtifactWriteGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    packageWriteScore: input.packageWriteScore ?? 70,
    recordWriteScore: input.recordWriteScore ?? 70,
    providerCallScore: input.providerCallScore ?? 70,
    legalApprovalScore: input.legalApprovalScore ?? 64,
    privacyApprovalScore: input.privacyApprovalScore ?? 66,
    artifactBoundaryScore: input.artifactBoundaryScore ?? 68,
    artifactWriteLeadRole: input.artifactWriteLeadRole ?? "public export artifact write reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): PublicExportArtifactSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: PublicExportArtifactSeverity): PublicExportArtifactPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): PublicExportArtifactReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "zero-write-artifact-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "artifact-write-design-ready";
}

function buildSourceNode(
  id: string,
  lane: PublicExportArtifactLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): PublicExportArtifactSourceNode {
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
            "Public export artifact write gate remains below activation threshold.",
            "Artifact board must resolve final approval, manifest, checksum, archive, access and rollback gaps before any later artifact write release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<PublicExportArtifactWriteInput>): PublicExportArtifactSourceNode[] {
  const artifactPressure = context.artifactGateItemCount;
  const approvalPressure = context.approvalItemCount * 2;
  const manifestPressure = context.manifestBoundaryItemCount;
  const checksumPressure = context.checksumBoundaryItemCount * 2;
  const archivePressure = context.archiveBoundaryItemCount;
  const gapPressure = context.openArtifactWriteGapCount * 2;

  return [
    buildSourceNode(
      "PEAW_NODE_001",
      "artifact_write_gate",
      "Public export package write path gate",
      "V17.4",
      context.packageWriteScore,
      context.privacyApprovalScore,
      artifactPressure,
      "Connect package write design to future artifact write governance.",
    ),
    buildSourceNode(
      "PEAW_NODE_002",
      "legal_privacy_final_artifact_approval",
      "Legal privacy final artifact approval lock",
      "V17.8",
      Math.min(context.legalApprovalScore, context.privacyApprovalScore),
      context.packageWriteScore,
      approvalPressure,
      "Prepare final artifact approval without artifact writes.",
    ),
    buildSourceNode(
      "PEAW_NODE_003",
      "manifest_write_boundary",
      "Manifest write boundary",
      "V17.8",
      context.artifactBoundaryScore,
      context.privacyApprovalScore,
      manifestPressure,
      "Keep manifest writes blocked.",
    ),
    buildSourceNode(
      "PEAW_NODE_004",
      "checksum_write_boundary",
      "Checksum write boundary",
      "V17.8",
      context.artifactBoundaryScore,
      context.legalApprovalScore,
      checksumPressure,
      "Keep checksum and integrity writes blocked.",
    ),
    buildSourceNode(
      "PEAW_NODE_005",
      "archive_write_boundary",
      "Archive write boundary",
      "V17.8",
      context.artifactBoundaryScore,
      context.packageWriteScore,
      archivePressure,
      "Keep archive and export file writes blocked.",
    ),
    buildSourceNode(
      "PEAW_NODE_006",
      "access_control_boundary",
      "Incident record write gate",
      "V17.7",
      context.recordWriteScore,
      context.onlineReadinessScore,
      context.accessBoundaryItemCount,
      "Keep incident records and internal data out of artifact design.",
    ),
    buildSourceNode(
      "PEAW_NODE_007",
      "rollback_artifact_plan",
      "Provider call execution gate",
      "V17.6",
      context.providerCallScore,
      context.artifactBoundaryScore,
      gapPressure,
      "Prepare artifact rollback without provider calls or storage activation.",
    ),
    buildSourceNode(
      "PEAW_NODE_008",
      "human_signoff",
      "Artifact write human signoff",
      "V17.8",
      context.legalApprovalScore,
      context.privacyApprovalScore,
      gapPressure,
      "Keep artifact write activation blocked until a separate legal and privacy release.",
    ),
  ];
}

function buildArtifactWriteGate(context: Required<PublicExportArtifactWriteInput>): ArtifactWriteGateItem[] {
  return [
    {
      id: "PEAW_GATE_001",
      label: "Public export artifact write lock",
      lane: "artifact_write_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep public export artifact writes disabled in V17.8.",
      requiredEvidence: ["publicExportArtifactWriteAllowed=false", "publicExportManifestWriteAllowed=false", "publicExportChecksumWriteAllowed=false"],
      blockedOutcome: "No public export artifact write.",
    },
    {
      id: "PEAW_GATE_002",
      label: "Zero-write artifact plan",
      lane: "artifact_write_gate",
      gateScore: clampScore(context.packageWriteScore),
      severity: severityFromConcern(100 - context.packageWriteScore + context.artifactGateItemCount * 4),
      gatePurpose: "Prepare artifact write flow without writing files.",
      requiredEvidence: ["approval lock", "manifest boundary", "checksum boundary", "archive boundary"],
      blockedOutcome: "No artifact file write.",
    },
    {
      id: "PEAW_GATE_003",
      label: "Final artifact approval lock",
      lane: "artifact_write_gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require a separate future release before final artifact approval.",
      requiredEvidence: ["publicExportArtifactFinalApprovalAllowed=false", "legalFinalApprovalAllowed=false", "privacyFinalApprovalAllowed=false"],
      blockedOutcome: "No final artifact approval.",
    },
  ];
}

function buildLegalPrivacyFinalArtifactApprovalLock(
  context: Required<PublicExportArtifactWriteInput>,
): LegalPrivacyFinalArtifactApprovalItem[] {
  return [
    {
      id: "PEAW_APPROVAL_001",
      label: "Legal final artifact approval design",
      lane: "legal_privacy_final_artifact_approval",
      approvalScore: clampScore(context.legalApprovalScore),
      priority: context.legalApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can legal final artifact approval be reviewed without writes?",
      requiredEvidence: ["legal review hold", "artifact no-go", "package caveat"],
      blockedOutcome: "No legal final artifact approval.",
    },
    {
      id: "PEAW_APPROVAL_002",
      label: "Privacy final artifact approval design",
      lane: "legal_privacy_final_artifact_approval",
      approvalScore: clampScore(context.privacyApprovalScore),
      priority: context.privacyApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can privacy final artifact approval be reviewed without writes?",
      requiredEvidence: ["privacy review hold", "redaction caveat", "identity exclusion"],
      blockedOutcome: "No privacy final artifact approval.",
    },
    {
      id: "PEAW_APPROVAL_003",
      label: "Joint artifact release hold",
      lane: "legal_privacy_final_artifact_approval",
      approvalScore: clampScore((context.legalApprovalScore + context.privacyApprovalScore) / 2),
      priority: "urgent",
      approvalQuestion: "Can final artifact release remain blocked?",
      requiredEvidence: ["publicExportArtifactFinalApprovalAllowed=false", "publicShareAllowed=false"],
      blockedOutcome: "No artifact release approval.",
    },
  ];
}

function buildManifestWriteBoundary(): ManifestWriteBoundaryItem[] {
  return [
    {
      id: "PEAW_MANIFEST_001",
      label: "Export manifest write boundary",
      lane: "manifest_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No export manifest can be written.",
      blockedOutcome: "publicExportManifestWriteAllowed=false",
    },
    {
      id: "PEAW_MANIFEST_002",
      label: "Manifest index write boundary",
      lane: "manifest_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No manifest index can be written.",
      blockedOutcome: "publicExportManifestWritePerformed=false",
    },
    {
      id: "PEAW_MANIFEST_003",
      label: "Package manifest boundary",
      lane: "manifest_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No publication package manifest can be written.",
      blockedOutcome: "publicExportPackageWriteAllowed=false",
    },
  ];
}

function buildChecksumWriteBoundary(): ChecksumWriteBoundaryItem[] {
  return [
    {
      id: "PEAW_CHECKSUM_001",
      label: "Checksum write boundary",
      lane: "checksum_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No checksum artifact can be written.",
      blockedOutcome: "publicExportChecksumWriteAllowed=false",
    },
    {
      id: "PEAW_CHECKSUM_002",
      label: "Integrity signature boundary",
      lane: "checksum_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No integrity signature can be written.",
      blockedOutcome: "publicExportChecksumWritePerformed=false",
    },
    {
      id: "PEAW_CHECKSUM_003",
      label: "Artifact final approval checksum boundary",
      lane: "checksum_write_boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No checksum can imply final approval.",
      blockedOutcome: "publicExportArtifactFinalApprovalAllowed=false",
    },
  ];
}

function buildArchiveWriteBoundary(context: Required<PublicExportArtifactWriteInput>): ArchiveWriteBoundaryItem[] {
  return [
    {
      id: "PEAW_ARCHIVE_001",
      label: "Archive artifact boundary",
      lane: "archive_write_boundary",
      archiveScore: 100,
      priority: "urgent",
      archiveQuestion: "Can archive artifact writes remain blocked?",
      requiredControls: ["publicExportArchiveWriteAllowed=false", "publicExportArchiveWritePerformed=false"],
      manualResolution: "Keep archive write path locked.",
    },
    {
      id: "PEAW_ARCHIVE_002",
      label: "Artifact storage activation boundary",
      lane: "archive_write_boundary",
      archiveScore: 100,
      priority: "urgent",
      archiveQuestion: "Can storage activation remain blocked?",
      requiredControls: ["storageActivationAllowed=false", "persistencePerformed=false"],
      manualResolution: "No artifact storage activation.",
    },
    {
      id: "PEAW_ARCHIVE_003",
      label: "Artifact lifecycle design",
      lane: "archive_write_boundary",
      archiveScore: clampScore(context.artifactBoundaryScore),
      priority: "high",
      archiveQuestion: "Can artifact lifecycle be reviewed without archive writes?",
      requiredControls: ["lifecycle note", "rollback note", "approval hold"],
      manualResolution: "Hold for artifact board.",
    },
  ];
}

function buildAccessControlBoundary(): AccessControlBoundaryItem[] {
  return [
    {
      id: "PEAW_ACCESS_001",
      label: "Artifact access-control write boundary",
      lane: "access_control_boundary",
      accessScore: 100,
      severity: "critical",
      accessQuestion: "Can artifact access-control writes remain blocked?",
      requiredChecks: ["publicExportAccessControlWriteAllowed=false", "publicExportAccessControlWritePerformed=false"],
      manualResolution: "No access-control artifact is written.",
    },
    {
      id: "PEAW_ACCESS_002",
      label: "Private data exclusion",
      lane: "access_control_boundary",
      accessScore: 100,
      severity: "critical",
      accessQuestion: "Can field identity and private notes remain excluded?",
      requiredChecks: ["no field identifiers", "no private notes", "redacted output"],
      manualResolution: "Block artifact if private data appears.",
    },
    {
      id: "PEAW_ACCESS_003",
      label: "Provider and incident data exclusion",
      lane: "access_control_boundary",
      accessScore: 100,
      severity: "critical",
      accessQuestion: "Can provider payloads and incident records remain excluded?",
      requiredChecks: ["no provider payloads", "no incident records", "no internal records"],
      manualResolution: "Block artifact if internal data appears.",
    },
  ];
}

function buildRollbackArtifactPlan(context: Required<PublicExportArtifactWriteInput>): RollbackArtifactPlanItem[] {
  return [
    {
      id: "PEAW_ROLLBACK_001",
      label: "Artifact write rollback plan",
      lane: "rollback_artifact_plan",
      rollbackScore: clampScore(context.packageWriteScore),
      priority: context.packageWriteScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future artifact write release return to zero-write state?",
      safeFallback: "Return to local dry-run and artifact no-go board.",
    },
    {
      id: "PEAW_ROLLBACK_002",
      label: "Manifest rollback plan",
      lane: "rollback_artifact_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can manifest writes remain blocked?",
      safeFallback: "No manifest write path exists in V17.8.",
    },
    {
      id: "PEAW_ROLLBACK_003",
      label: "Archive rollback plan",
      lane: "rollback_artifact_plan",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can archive writes remain blocked?",
      safeFallback: "No archive write path exists in V17.8.",
    },
  ];
}

function buildArtifactWriteNoGoBoard(): ArtifactWriteNoGoItem[] {
  return [
    {
      id: "PEAW_GONOGO_001",
      label: "Public export artifact write plan",
      lane: "human_signoff",
      goNoGoState: "zero-write-artifact-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["legal final approval", "privacy final approval", "manifest boundary", "checksum boundary"],
      safeOutcome: "Artifact write plan only.",
    },
    {
      id: "PEAW_GONOGO_002",
      label: "Actual public export artifact write",
      lane: "artifact_write_gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate artifact write release", "final legal approval", "final privacy approval"],
      safeOutcome: "Public export artifact write remains blocked.",
    },
    {
      id: "PEAW_GONOGO_003",
      label: "Manifest, checksum or archive write",
      lane: "checksum_write_boundary",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate artifact release", "integrity proof", "rollback proof"],
      safeOutcome: "Manifest, checksum and archive writes remain blocked.",
    },
  ];
}

function buildArtifactWriteGateChecks(
  context: Required<PublicExportArtifactWriteInput>,
  sourceNodes: PublicExportArtifactSourceNode[],
): ArtifactWriteGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PEAW_CHECK_001",
      label: "Artifact write gate remains zero-write",
      lane: "artifact_write_gate" as PublicExportArtifactLane,
      score: 100,
      reviewer: "public export artifact write reviewer",
      requiredEvidence: ["publicExportArtifactWriteAllowed=false", "publicExportManifestWriteAllowed=false", "publicExportChecksumWriteAllowed=false"],
      hardStop: "Do not activate public export artifact write in V17.8.",
    },
    {
      id: "PEAW_CHECK_002",
      label: "Legal privacy final artifact approval is complete enough",
      lane: "legal_privacy_final_artifact_approval" as PublicExportArtifactLane,
      score: Math.min(context.legalApprovalScore, context.privacyApprovalScore) - context.approvalItemCount * 3,
      reviewer: context.artifactWriteLeadRole,
      requiredEvidence: ["legal final approval hold", "privacy final approval hold", "joint artifact release hold"],
      hardStop: "Do not proceed without legal and privacy artifact approval board.",
    },
    {
      id: "PEAW_CHECK_003",
      label: "Manifest boundary is complete",
      lane: "manifest_write_boundary" as PublicExportArtifactLane,
      score: 100,
      reviewer: "manifest boundary reviewer",
      requiredEvidence: ["manifest write boundary", "index boundary", "package manifest boundary"],
      hardStop: "Manifest boundaries must remain active.",
    },
    {
      id: "PEAW_CHECK_004",
      label: "Checksum boundary is complete",
      lane: "checksum_write_boundary" as PublicExportArtifactLane,
      score: 100,
      reviewer: "checksum boundary reviewer",
      requiredEvidence: ["checksum boundary", "integrity boundary", "final approval checksum boundary"],
      hardStop: "Checksum boundaries must remain active.",
    },
    {
      id: "PEAW_CHECK_005",
      label: "Archive boundary is complete enough",
      lane: "archive_write_boundary" as PublicExportArtifactLane,
      score: context.artifactBoundaryScore - context.archiveBoundaryItemCount * 3,
      reviewer: "archive boundary reviewer",
      requiredEvidence: ["archive boundary", "storage activation boundary", "artifact lifecycle"],
      hardStop: "Do not proceed without archive boundary board.",
    },
    {
      id: "PEAW_CHECK_006",
      label: "Source blockers are within artifact write tolerance",
      lane: "human_signoff" as PublicExportArtifactLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before zero-write-artifact-plan-ready state.",
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

function buildBoardPack(context: Required<PublicExportArtifactWriteInput>): ArtifactWriteBoardPackItem[] {
  return [
    {
      id: "PEAW_PACK_001",
      label: "Artifact write packet",
      lane: "artifact_write_gate",
      packReady: context.packageWriteScore >= 60,
      readinessScore: clampScore(context.packageWriteScore),
      reviewerCheck: "Confirm artifact write remains zero-write and design-only.",
      includedSections: ["artifact gate", "manifest boundary", "artifact no-go"],
      blockedSections: ["artifact write", "manifest write", "checksum write"],
    },
    {
      id: "PEAW_PACK_002",
      label: "Legal privacy and access packet",
      lane: "legal_privacy_final_artifact_approval",
      packReady: context.legalApprovalScore >= 60 && context.privacyApprovalScore >= 60,
      readinessScore: clampScore((context.legalApprovalScore + context.privacyApprovalScore) / 2),
      reviewerCheck: "Confirm legal, privacy and access-control approvals remain locked.",
      includedSections: ["legal final hold", "privacy final hold", "access-control boundary"],
      blockedSections: ["final approval performed", "access-control write", "public share"],
    },
    {
      id: "PEAW_PACK_003",
      label: "Archive and rollback packet",
      lane: "archive_write_boundary",
      packReady: context.artifactBoundaryScore >= 60,
      readinessScore: clampScore(context.artifactBoundaryScore),
      reviewerCheck: "Confirm archive and rollback are dry-run only.",
      includedSections: ["archive boundary", "lifecycle design", "artifact rollback"],
      blockedSections: ["archive write", "storage activation", "runtime rollback"],
    },
  ];
}

function buildFindings(
  context: Required<PublicExportArtifactWriteInput>,
  sourceNodes: PublicExportArtifactSourceNode[],
  gates: ArtifactWriteGateCheckItem[],
  goNoGo: ArtifactWriteNoGoItem[],
): ArtifactWriteFindingItem[] {
  const findings: ArtifactWriteFindingItem[] = [];

  if (context.openArtifactWriteGapCount > 0) {
    findings.push({
      id: "PEAW_FINDING_001",
      label: "Open artifact write gaps",
      lane: "human_signoff",
      severity: context.openArtifactWriteGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openArtifactWriteGapCount} artifact write gaps remain before any later activation.`,
      manualResolution: "Resolve final approval, manifest, checksum, archive, access and rollback gaps in a later gated release.",
      blocksArtifactWriteActivation: true,
    });
  }

  if (context.legalApprovalScore < 70) {
    findings.push({
      id: "PEAW_FINDING_002",
      label: "Legal final artifact approval below threshold",
      lane: "legal_privacy_final_artifact_approval",
      severity: "critical",
      reason: "Legal final approval is not mature enough for artifact write activation.",
      manualResolution: "Complete legal artifact approval review.",
      blocksArtifactWriteActivation: true,
    });
  }

  if (context.privacyApprovalScore < 70) {
    findings.push({
      id: "PEAW_FINDING_003",
      label: "Privacy final artifact approval below threshold",
      lane: "legal_privacy_final_artifact_approval",
      severity: "critical",
      reason: "Privacy final approval is not mature enough for artifact write activation.",
      manualResolution: "Complete privacy artifact approval review.",
      blocksArtifactWriteActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `PEAW_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksArtifactWriteActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `PEAW_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Artifact write gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksArtifactWriteActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `PEAW_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksArtifactWriteActivation: true,
      });
    });

  return findings;
}

export function buildAiPublicExportArtifactWriteGateReport(
  input: PublicExportArtifactWriteInput = {},
): PublicExportArtifactWriteReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const artifactWriteGate = buildArtifactWriteGate(context);
  const legalPrivacyFinalArtifactApprovalLock = buildLegalPrivacyFinalArtifactApprovalLock(context);
  const manifestWriteBoundary = buildManifestWriteBoundary();
  const checksumWriteBoundary = buildChecksumWriteBoundary();
  const archiveWriteBoundary = buildArchiveWriteBoundary(context);
  const accessControlBoundary = buildAccessControlBoundary();
  const rollbackArtifactPlan = buildRollbackArtifactPlan(context);
  const artifactWriteNoGoBoard = buildArtifactWriteNoGoBoard();
  const artifactWriteGateChecks = buildArtifactWriteGateChecks(context, sourceNodes);
  const artifactWriteBoardPack = buildBoardPack(context);
  const artifactWriteFindings = buildFindings(context, sourceNodes, artifactWriteGateChecks, artifactWriteNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    artifactWriteGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, artifactWriteGate.length);

  const approvalAverage =
    legalPrivacyFinalArtifactApprovalLock.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, legalPrivacyFinalArtifactApprovalLock.length);

  const gateAverage =
    artifactWriteGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, artifactWriteGateChecks.length);

  const findingPenalty = artifactWriteFindings.filter((item) => item.blocksArtifactWriteActivation).length * 7;
  const rollbackPressure =
    rollbackArtifactPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, rollbackArtifactPlan.length * 4);

  const artifactWriteScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      approvalAverage / 4 +
      gateAverage / 4 +
      rollbackPressure -
      findingPenalty -
      context.openArtifactWriteGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openArtifactWriteGapCount * 8 +
        context.approvalItemCount * 6 +
        context.manifestBoundaryItemCount * 5 +
        context.checksumBoundaryItemCount * 6 +
        context.archiveBoundaryItemCount * 5,
    ),
  );

  const artifactWriteStatus = bandFromScore(
    artifactWriteScore,
    artifactWriteFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PUBLIC_EXPORT_ARTIFACT_WRITE_GUARDRAIL,
    artifactWriteScore,
    artifactWriteStatus,
    overallSeverity,
    sourceNodes,
    artifactWriteGate,
    legalPrivacyFinalArtifactApprovalLock,
    manifestWriteBoundary,
    checksumWriteBoundary,
    archiveWriteBoundary,
    accessControlBoundary,
    rollbackArtifactPlan,
    artifactWriteNoGoBoard,
    artifactWriteGateChecks,
    artifactWriteBoardPack,
    artifactWriteFindings,
    stagedRoadmap: {
      v178: "Public export artifact write gate in zero-write dry-run.",
      v179: "Operational execution only after explicit human approval.",
      v180: "Provider runtime activation only after explicit provider approval and rollback proof.",
      v181: "Incident record persistence only after explicit governance final approval.",
      v182: "Public export artifact write only after explicit legal and privacy final approval.",
    },
    redactedExportBundle: {
      exportId: "public_export_artifact_write_gate_v17_8_redacted_dry_run",
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
        "artifact write gate",
        "legal privacy final artifact approval lock",
        "manifest boundary",
        "checksum boundary",
        "archive boundary",
        "access-control boundary",
        "rollback artifact plan",
        "artifact no-go board",
        "artifact gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Public export artifact write gate is local dry-run only.",
      "No artifact write, manifest write, checksum write, archive write, access-control write, public share, provider call, storage activation, task creation, intervention creation or execution is performed.",
      "Legal and privacy final artifact approvals remain locked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V17.8 prepares public export artifact write governance only.",
    ],
  };
}

export const aiPublicExportArtifactWriteGateVersion = "V17.8";
