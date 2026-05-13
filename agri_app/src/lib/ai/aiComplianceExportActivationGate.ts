export type ComplianceExportActivationMode = "dry-run" | "export-activation-board-review";

export type ComplianceExportSeverity = "info" | "watch" | "elevated" | "critical";

export type ComplianceExportPriority = "low" | "medium" | "high" | "urgent";

export type ComplianceExportReadinessBand =
  | "blocked"
  | "export-gate-design-ready"
  | "manual-board-review-ready"
  | "redacted-export-plan-ready";

export type ComplianceExportLane =
  | "export-activation-gate"
  | "privacy-redaction"
  | "legal-review-lock"
  | "reviewer-attestation"
  | "export-scope"
  | "publication-no-go"
  | "audit-evidence-lock"
  | "human-signoff";

export interface ComplianceExportActivationGuardrail {
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
  complianceExportActivationAllowed: false;
  complianceExportActivationPerformed: false;
  privacyRedactionApprovalAllowed: false;
  privacyRedactionApprovalPerformed: false;
  legalReviewApprovalAllowed: false;
  legalReviewApprovalPerformed: false;
  exportPublicationAllowed: false;
  exportPublicationPerformed: false;
  exportFileWriteAllowed: false;
  exportFileWritePerformed: false;
  complianceExportActivationGateReady: true;
  privacyRedactionApprovalReady: true;
  legalReviewLockReady: true;
  exportNoGoReady: true;
}

export interface ComplianceExportActivationInput {
  exportGateItemCount?: number;
  privacyRedactionItemCount?: number;
  legalReviewItemCount?: number;
  reviewerAttestationItemCount?: number;
  exportScopeItemCount?: number;
  auditEvidenceLockItemCount?: number;
  openExportGapCount?: number;
  onlineReadinessScore?: number;
  auditPackageScore?: number;
  incidentBoardScore?: number;
  privacyRedactionScore?: number;
  legalReviewScore?: number;
  reviewerAttestationScore?: number;
  exportScopeScore?: number;
  exportLeadRole?: string;
}

export interface ComplianceExportSourceNode {
  id: string;
  lane: ComplianceExportLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ComplianceExportSeverity;
  priority: ComplianceExportPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ExportActivationGateItem {
  id: string;
  label: string;
  lane: ComplianceExportLane;
  gateScore: number;
  severity: ComplianceExportSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface PrivacyRedactionApprovalItem {
  id: string;
  label: string;
  lane: ComplianceExportLane;
  redactionScore: number;
  severity: ComplianceExportSeverity;
  redactionQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface LegalReviewLockItem {
  id: string;
  label: string;
  lane: ComplianceExportLane;
  legalScore: number;
  priority: ComplianceExportPriority;
  legalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ReviewerAttestationItem {
  id: string;
  label: string;
  lane: ComplianceExportLane;
  attestationScore: number;
  severity: ComplianceExportSeverity;
  attestationQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ExportScopeItem {
  id: string;
  label: string;
  lane: ComplianceExportLane;
  scopeScore: number;
  priority: ComplianceExportPriority;
  scopeQuestion: string;
  includedSections: string[];
  excludedSections: string[];
}

export interface AuditEvidenceLockItem {
  id: string;
  label: string;
  lane: ComplianceExportLane;
  lockScore: number;
  severity: ComplianceExportSeverity;
  lockRule: string;
  blockedOutcome: string;
}

export interface ExportPublicationNoGoItem {
  id: string;
  label: string;
  lane: ComplianceExportLane;
  goNoGoState: "no-go" | "design-only" | "redacted-plan-ready";
  score: number;
  severity: ComplianceExportSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface ComplianceExportGateCheckItem {
  id: string;
  label: string;
  lane: ComplianceExportLane;
  passed: boolean;
  score: number;
  severity: ComplianceExportSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ComplianceExportBoardPackItem {
  id: string;
  label: string;
  lane: ComplianceExportLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ComplianceExportFindingItem {
  id: string;
  label: string;
  lane: ComplianceExportLane;
  severity: ComplianceExportSeverity;
  reason: string;
  manualResolution: string;
  blocksExportActivation: boolean;
}

export interface ComplianceExportActivationReport {
  generatedAt: string;
  mode: ComplianceExportActivationMode;
  context: Required<ComplianceExportActivationInput>;
  readiness: ComplianceExportActivationGuardrail;
  exportGateScore: number;
  exportGateStatus: ComplianceExportReadinessBand;
  overallSeverity: ComplianceExportSeverity;
  sourceNodes: ComplianceExportSourceNode[];
  exportActivationGate: ExportActivationGateItem[];
  privacyRedactionApproval: PrivacyRedactionApprovalItem[];
  legalReviewLocks: LegalReviewLockItem[];
  reviewerAttestationBoard: ReviewerAttestationItem[];
  exportScopePlan: ExportScopeItem[];
  auditEvidenceLocks: AuditEvidenceLockItem[];
  publicationNoGoBoard: ExportPublicationNoGoItem[];
  exportGateChecks: ComplianceExportGateCheckItem[];
  exportBoardPack: ComplianceExportBoardPackItem[];
  exportFindings: ComplianceExportFindingItem[];
  stagedRoadmap: {
    v166: string;
    v167: string;
    v168: string;
    v169: string;
    v170: string;
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

export const COMPLIANCE_EXPORT_ACTIVATION_GUARDRAIL: ComplianceExportActivationGuardrail = {
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
  complianceExportActivationAllowed: false,
  complianceExportActivationPerformed: false,
  privacyRedactionApprovalAllowed: false,
  privacyRedactionApprovalPerformed: false,
  legalReviewApprovalAllowed: false,
  legalReviewApprovalPerformed: false,
  exportPublicationAllowed: false,
  exportPublicationPerformed: false,
  exportFileWriteAllowed: false,
  exportFileWritePerformed: false,
  complianceExportActivationGateReady: true,
  privacyRedactionApprovalReady: true,
  legalReviewLockReady: true,
  exportNoGoReady: true,
};

const priorityWeight: Record<ComplianceExportPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ComplianceExportActivationInput): Required<ComplianceExportActivationInput> {
  return {
    exportGateItemCount: input.exportGateItemCount ?? 8,
    privacyRedactionItemCount: input.privacyRedactionItemCount ?? 8,
    legalReviewItemCount: input.legalReviewItemCount ?? 7,
    reviewerAttestationItemCount: input.reviewerAttestationItemCount ?? 7,
    exportScopeItemCount: input.exportScopeItemCount ?? 7,
    auditEvidenceLockItemCount: input.auditEvidenceLockItemCount ?? 7,
    openExportGapCount: input.openExportGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    auditPackageScore: input.auditPackageScore ?? 70,
    incidentBoardScore: input.incidentBoardScore ?? 70,
    privacyRedactionScore: input.privacyRedactionScore ?? 66,
    legalReviewScore: input.legalReviewScore ?? 64,
    reviewerAttestationScore: input.reviewerAttestationScore ?? 68,
    exportScopeScore: input.exportScopeScore ?? 66,
    exportLeadRole: input.exportLeadRole ?? "compliance export activation reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ComplianceExportSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ComplianceExportSeverity): ComplianceExportPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ComplianceExportReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "redacted-export-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "export-gate-design-ready";
}

function buildSourceNode(
  id: string,
  lane: ComplianceExportLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ComplianceExportSourceNode {
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
            "Compliance export activation gate remains below activation threshold.",
            "Export board must resolve privacy, legal review, attestation, scope and evidence lock gaps before any later export activation.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ComplianceExportActivationInput>): ComplianceExportSourceNode[] {
  const exportPressure = context.exportGateItemCount;
  const redactionPressure = context.privacyRedactionItemCount * 2;
  const legalPressure = context.legalReviewItemCount * 2;
  const attestationPressure = context.reviewerAttestationItemCount;
  const scopePressure = context.exportScopeItemCount * 2;
  const gapPressure = context.openExportGapCount * 2;

  return [
    buildSourceNode(
      "CEAG_NODE_001",
      "export-activation-gate",
      "Operational audit package",
      "V16.2",
      context.auditPackageScore,
      context.reviewerAttestationScore,
      exportPressure,
      "Connect audit package to export activation gate design.",
    ),
    buildSourceNode(
      "CEAG_NODE_002",
      "privacy-redaction",
      "Privacy redaction board",
      "V16.6",
      context.privacyRedactionScore,
      context.auditPackageScore,
      redactionPressure,
      "Keep all exports redacted and design-only.",
    ),
    buildSourceNode(
      "CEAG_NODE_003",
      "legal-review-lock",
      "Legal review lock",
      "V16.6",
      context.legalReviewScore,
      context.privacyRedactionScore,
      legalPressure,
      "Keep legal approval locked until explicit later release.",
    ),
    buildSourceNode(
      "CEAG_NODE_004",
      "reviewer-attestation",
      "Reviewer attestation baseline",
      "V16.3",
      context.reviewerAttestationScore,
      context.auditPackageScore,
      attestationPressure,
      "Prepare reviewer attestation without persistence.",
    ),
    buildSourceNode(
      "CEAG_NODE_005",
      "export-scope",
      "Export scope design",
      "V16.6",
      context.exportScopeScore,
      context.privacyRedactionScore,
      scopePressure,
      "Limit export scope and exclude private/runtime sections.",
    ),
    buildSourceNode(
      "CEAG_NODE_006",
      "audit-evidence-lock",
      "Runtime incident response board",
      "V16.5",
      context.incidentBoardScore,
      context.auditPackageScore,
      context.auditEvidenceLockItemCount,
      "Use incident board evidence as design-only and no-write.",
    ),
    buildSourceNode(
      "CEAG_NODE_007",
      "publication-no-go",
      "Publication lock",
      "V16.6",
      100,
      context.onlineReadinessScore,
      gapPressure,
      "Keep public sharing and export file writes blocked.",
    ),
    buildSourceNode(
      "CEAG_NODE_008",
      "human-signoff",
      "Compliance export human signoff",
      "V16.6",
      context.reviewerAttestationScore,
      context.legalReviewScore,
      gapPressure,
      "Keep export activation blocked until a separate explicit approval release.",
    ),
  ];
}

function buildExportActivationGate(context: Required<ComplianceExportActivationInput>): ExportActivationGateItem[] {
  return [
    {
      id: "CEAG_GATEPLAN_001",
      label: "Compliance export activation lock",
      lane: "export-activation-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep compliance export activation disabled in V16.6.",
      requiredEvidence: ["complianceExportActivationAllowed=false", "exportFileWriteAllowed=false", "publicShareAllowed=false"],
      blockedOutcome: "No export activation.",
    },
    {
      id: "CEAG_GATEPLAN_002",
      label: "Redacted export plan",
      lane: "export-activation-gate",
      gateScore: clampScore(context.auditPackageScore),
      severity: severityFromConcern(100 - context.auditPackageScore + context.exportGateItemCount * 4),
      gatePurpose: "Prepare export plan without producing files.",
      requiredEvidence: ["redaction board", "scope board", "reviewer attestation"],
      blockedOutcome: "No export file write.",
    },
    {
      id: "CEAG_GATEPLAN_003",
      label: "Activation approval lock",
      lane: "export-activation-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require explicit approval in a separate later release.",
      requiredEvidence: ["explicitActivationApprovalAllowed=false", "legalReviewApprovalAllowed=false"],
      blockedOutcome: "No approval activation.",
    },
  ];
}

function buildPrivacyRedactionApproval(context: Required<ComplianceExportActivationInput>): PrivacyRedactionApprovalItem[] {
  return [
    {
      id: "CEAG_REDACTION_001",
      label: "Field identity redaction approval",
      lane: "privacy-redaction",
      redactionScore: 100,
      severity: "critical",
      redactionQuestion: "Are field identifiers excluded from export activation design?",
      requiredChecks: ["no field identifiers", "no private notes", "no internal operator data"],
      manualResolution: "Block export if field identifiers appear.",
    },
    {
      id: "CEAG_REDACTION_002",
      label: "Provider payload redaction approval",
      lane: "privacy-redaction",
      redactionScore: 100,
      severity: "critical",
      redactionQuestion: "Are provider payloads excluded from export design?",
      requiredChecks: ["no provider payloads", "no prompts", "no runtime data"],
      manualResolution: "Keep payloads excluded.",
    },
    {
      id: "CEAG_REDACTION_003",
      label: "Operational guidance redaction approval",
      lane: "privacy-redaction",
      redactionScore: clampScore(context.privacyRedactionScore),
      severity: severityFromConcern(100 - context.privacyRedactionScore + context.privacyRedactionItemCount * 4),
      redactionQuestion: "Are product, dosage and execution instructions excluded?",
      requiredChecks: ["no product recommendation", "no dosage guidance", "no execution instructions"],
      manualResolution: "Block export if operational guidance appears.",
    },
  ];
}

function buildLegalReviewLocks(context: Required<ComplianceExportActivationInput>): LegalReviewLockItem[] {
  return [
    {
      id: "CEAG_LEGAL_001",
      label: "Legal review approval lock",
      lane: "legal-review-lock",
      legalScore: clampScore(context.legalReviewScore),
      priority: context.legalReviewScore < 70 ? "urgent" : "high",
      legalQuestion: "Can legal review be represented without approving export?",
      requiredEvidence: ["legal review pending", "export no-go", "privacy redaction approval"],
      blockedOutcome: "No legal approval is performed.",
    },
    {
      id: "CEAG_LEGAL_002",
      label: "Publication review lock",
      lane: "legal-review-lock",
      legalScore: 100,
      priority: "urgent",
      legalQuestion: "Can public publication remain blocked?",
      requiredEvidence: ["exportPublicationAllowed=false", "publicShareAllowed=false"],
      blockedOutcome: "No publication.",
    },
    {
      id: "CEAG_LEGAL_003",
      label: "Retention review lock",
      lane: "legal-review-lock",
      legalScore: clampScore(context.auditPackageScore),
      priority: "high",
      legalQuestion: "Can retention requirements be reviewed before export activation?",
      requiredEvidence: ["retention caveat", "redaction caveat", "manual approval caveat"],
      blockedOutcome: "No retained export artifact.",
    },
  ];
}

function buildReviewerAttestationBoard(context: Required<ComplianceExportActivationInput>): ReviewerAttestationItem[] {
  return [
    {
      id: "CEAG_ATTEST_001",
      label: "Reviewer attestation design",
      lane: "reviewer-attestation",
      attestationScore: clampScore(context.reviewerAttestationScore),
      severity: severityFromConcern(100 - context.reviewerAttestationScore + context.reviewerAttestationItemCount * 4),
      attestationQuestion: "Can reviewer attestation be drafted without persistence?",
      requiredEvidence: ["reviewer role", "attestation note", "board status"],
      blockedOutcome: "No attestation persistence.",
    },
    {
      id: "CEAG_ATTEST_002",
      label: "Safety attestation design",
      lane: "reviewer-attestation",
      attestationScore: 100,
      severity: "critical",
      attestationQuestion: "Can safety locks be attested before export activation?",
      requiredEvidence: ["provider locked", "storage locked", "dispatch locked", "export locked"],
      blockedOutcome: "No safety approval activation.",
    },
    {
      id: "CEAG_ATTEST_003",
      label: "Export scope attestation",
      lane: "reviewer-attestation",
      attestationScore: clampScore(context.exportScopeScore),
      severity: "elevated",
      attestationQuestion: "Can export scope be reviewed by humans?",
      requiredEvidence: ["included sections", "excluded sections", "redaction note"],
      blockedOutcome: "No export scope activation.",
    },
  ];
}

function buildExportScopePlan(context: Required<ComplianceExportActivationInput>): ExportScopeItem[] {
  return [
    {
      id: "CEAG_SCOPE_001",
      label: "Redacted compliance scope",
      lane: "export-scope",
      scopeScore: clampScore(context.exportScopeScore),
      priority: context.exportScopeScore < 70 ? "urgent" : "high",
      scopeQuestion: "Which sections can be designed for future redacted export?",
      includedSections: ["audit summary", "runtime locks", "redaction board", "no-go board"],
      excludedSections: ["field identifiers", "private notes", "provider payloads", "operational internals"],
    },
    {
      id: "CEAG_SCOPE_002",
      label: "Incident evidence scope",
      lane: "export-scope",
      scopeScore: clampScore(context.incidentBoardScore),
      priority: "high",
      scopeQuestion: "Can incident evidence be summarized without event writes?",
      includedSections: ["incident class", "fallback route", "lock evidence"],
      excludedSections: ["incident records", "notifications", "provider payloads"],
    },
    {
      id: "CEAG_SCOPE_003",
      label: "Reviewer evidence scope",
      lane: "export-scope",
      scopeScore: clampScore(context.reviewerAttestationScore),
      priority: "high",
      scopeQuestion: "Can reviewer evidence remain local and redacted?",
      includedSections: ["reviewer role", "board status", "manual caveat"],
      excludedSections: ["review persistence", "personal notes", "approvals"],
    },
  ];
}

function buildAuditEvidenceLocks(): AuditEvidenceLockItem[] {
  return [
    {
      id: "CEAG_LOCK_001",
      label: "Export file write lock",
      lane: "audit-evidence-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Export file write remains disabled.",
      blockedOutcome: "exportFileWriteAllowed=false",
    },
    {
      id: "CEAG_LOCK_002",
      label: "Public share lock",
      lane: "audit-evidence-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Public sharing remains disabled.",
      blockedOutcome: "publicShareAllowed=false",
    },
    {
      id: "CEAG_LOCK_003",
      label: "Runtime and provider lock evidence",
      lane: "audit-evidence-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Provider, runtime, storage and dispatch locks remain active.",
      blockedOutcome: "providerCalled=false",
    },
  ];
}

function buildPublicationNoGoBoard(): ExportPublicationNoGoItem[] {
  return [
    {
      id: "CEAG_GONOGO_001",
      label: "Redacted export plan",
      lane: "human-signoff",
      goNoGoState: "redacted-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["redaction approval", "legal review", "reviewer attestation"],
      safeOutcome: "Export plan only.",
    },
    {
      id: "CEAG_GONOGO_002",
      label: "Compliance export activation",
      lane: "publication-no-go",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate export activation release", "legal approval", "privacy approval"],
      safeOutcome: "Export activation remains blocked.",
    },
    {
      id: "CEAG_GONOGO_003",
      label: "Public publication",
      lane: "publication-no-go",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate publication release", "legal approval", "privacy approval"],
      safeOutcome: "Public publication remains blocked.",
    },
  ];
}

function buildExportGateChecks(
  context: Required<ComplianceExportActivationInput>,
  sourceNodes: ComplianceExportSourceNode[],
): ComplianceExportGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "CEAG_CHECK_001",
      label: "Export gate remains no-write",
      lane: "export-activation-gate" as ComplianceExportLane,
      score: 100,
      reviewer: "compliance export activation reviewer",
      requiredEvidence: ["complianceExportActivationAllowed=false", "exportFileWriteAllowed=false", "publicShareAllowed=false"],
      hardStop: "Do not activate export in V16.6.",
    },
    {
      id: "CEAG_CHECK_002",
      label: "Privacy redaction is complete enough",
      lane: "privacy-redaction" as ComplianceExportLane,
      score: context.privacyRedactionScore - context.privacyRedactionItemCount * 3,
      reviewer: "privacy redaction reviewer",
      requiredEvidence: ["field redaction", "payload redaction", "operational wording redaction"],
      hardStop: "Do not proceed without privacy redaction board.",
    },
    {
      id: "CEAG_CHECK_003",
      label: "Legal review lock is complete enough",
      lane: "legal-review-lock" as ComplianceExportLane,
      score: context.legalReviewScore - context.legalReviewItemCount * 3,
      reviewer: "legal review board",
      requiredEvidence: ["legal lock", "publication lock", "retention lock"],
      hardStop: "Do not proceed without legal review lock.",
    },
    {
      id: "CEAG_CHECK_004",
      label: "Reviewer attestation is complete enough",
      lane: "reviewer-attestation" as ComplianceExportLane,
      score: context.reviewerAttestationScore - context.reviewerAttestationItemCount * 3,
      reviewer: context.exportLeadRole,
      requiredEvidence: ["reviewer attestation", "safety attestation", "scope attestation"],
      hardStop: "Do not proceed without reviewer attestation.",
    },
    {
      id: "CEAG_CHECK_005",
      label: "Export scope is complete enough",
      lane: "export-scope" as ComplianceExportLane,
      score: context.exportScopeScore - context.exportScopeItemCount * 3,
      reviewer: "export scope reviewer",
      requiredEvidence: ["redacted scope", "incident scope", "reviewer scope"],
      hardStop: "Do not proceed without export scope review.",
    },
    {
      id: "CEAG_CHECK_006",
      label: "Source blockers are within export tolerance",
      lane: "human-signoff" as ComplianceExportLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before redacted-export-plan-ready state.",
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

function buildBoardPack(context: Required<ComplianceExportActivationInput>): ComplianceExportBoardPackItem[] {
  return [
    {
      id: "CEAG_PACK_001",
      label: "Export activation packet",
      lane: "export-activation-gate",
      packReady: context.auditPackageScore >= 60,
      readinessScore: clampScore(context.auditPackageScore),
      reviewerCheck: "Confirm export activation remains design-only and no-write.",
      includedSections: ["export gate", "redaction board", "publication no-go"],
      blockedSections: ["export file write", "public share", "approval persistence"],
    },
    {
      id: "CEAG_PACK_002",
      label: "Privacy and legal packet",
      lane: "privacy-redaction",
      packReady: context.privacyRedactionScore >= 60 && context.legalReviewScore >= 60,
      readinessScore: clampScore((context.privacyRedactionScore + context.legalReviewScore) / 2),
      reviewerCheck: "Confirm privacy and legal approvals remain locked.",
      includedSections: ["privacy approval design", "legal lock", "retention lock"],
      blockedSections: ["legal approval performed", "privacy approval performed"],
    },
    {
      id: "CEAG_PACK_003",
      label: "Scope and attestation packet",
      lane: "reviewer-attestation",
      packReady: context.reviewerAttestationScore >= 60 && context.exportScopeScore >= 60,
      readinessScore: clampScore((context.reviewerAttestationScore + context.exportScopeScore) / 2),
      reviewerCheck: "Confirm reviewer attestation and scope remain local.",
      includedSections: ["reviewer attestation", "export scope", "audit evidence locks"],
      blockedSections: ["attestation persistence", "export publication"],
    },
  ];
}

function buildFindings(
  context: Required<ComplianceExportActivationInput>,
  sourceNodes: ComplianceExportSourceNode[],
  gates: ComplianceExportGateCheckItem[],
  goNoGo: ExportPublicationNoGoItem[],
): ComplianceExportFindingItem[] {
  const findings: ComplianceExportFindingItem[] = [];

  if (context.openExportGapCount > 0) {
    findings.push({
      id: "CEAG_FINDING_001",
      label: "Open compliance export gaps",
      lane: "human-signoff",
      severity: context.openExportGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openExportGapCount} export activation gaps remain before any later activation.`,
      manualResolution: "Resolve redaction, legal review, attestation and scope gaps in a later gated release.",
      blocksExportActivation: true,
    });
  }

  if (context.privacyRedactionScore < 70) {
    findings.push({
      id: "CEAG_FINDING_002",
      label: "Privacy redaction below threshold",
      lane: "privacy-redaction",
      severity: "critical",
      reason: "Privacy redaction is not mature enough for export activation.",
      manualResolution: "Complete field, payload and operational wording redaction review.",
      blocksExportActivation: true,
    });
  }

  if (context.legalReviewScore < 70) {
    findings.push({
      id: "CEAG_FINDING_003",
      label: "Legal review below threshold",
      lane: "legal-review-lock",
      severity: "critical",
      reason: "Legal review lock is not mature enough for export activation.",
      manualResolution: "Complete legal, publication and retention review locks.",
      blocksExportActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `CEAG_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksExportActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `CEAG_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Export gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksExportActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `CEAG_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksExportActivation: true,
      });
    });

  return findings;
}

export function buildAiComplianceExportActivationGateReport(
  input: ComplianceExportActivationInput = {},
): ComplianceExportActivationReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const exportActivationGate = buildExportActivationGate(context);
  const privacyRedactionApproval = buildPrivacyRedactionApproval(context);
  const legalReviewLocks = buildLegalReviewLocks(context);
  const reviewerAttestationBoard = buildReviewerAttestationBoard(context);
  const exportScopePlan = buildExportScopePlan(context);
  const auditEvidenceLocks = buildAuditEvidenceLocks();
  const publicationNoGoBoard = buildPublicationNoGoBoard();
  const exportGateChecks = buildExportGateChecks(context, sourceNodes);
  const exportBoardPack = buildBoardPack(context);
  const exportFindings = buildFindings(context, sourceNodes, exportGateChecks, publicationNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const activationAverage =
    exportActivationGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, exportActivationGate.length);

  const redactionAverage =
    privacyRedactionApproval.reduce((sum, item) => sum + item.redactionScore, 0) /
    Math.max(1, privacyRedactionApproval.length);

  const gateAverage =
    exportGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, exportGateChecks.length);

  const findingPenalty = exportFindings.filter((item) => item.blocksExportActivation).length * 7;
  const legalPressure =
    legalReviewLocks.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, legalReviewLocks.length * 4);

  const exportGateScore = clampScore(
    sourceAverage / 4 +
      activationAverage / 4 +
      redactionAverage / 4 +
      gateAverage / 4 +
      legalPressure -
      findingPenalty -
      context.openExportGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openExportGapCount * 8 +
        context.privacyRedactionItemCount * 6 +
        context.legalReviewItemCount * 6 +
        context.reviewerAttestationItemCount * 5 +
        context.exportScopeItemCount * 5,
    ),
  );

  const exportGateStatus = bandFromScore(
    exportGateScore,
    exportFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: COMPLIANCE_EXPORT_ACTIVATION_GUARDRAIL,
    exportGateScore,
    exportGateStatus,
    overallSeverity,
    sourceNodes,
    exportActivationGate,
    privacyRedactionApproval,
    legalReviewLocks,
    reviewerAttestationBoard,
    exportScopePlan,
    auditEvidenceLocks,
    publicationNoGoBoard,
    exportGateChecks,
    exportBoardPack,
    exportFindings,
    stagedRoadmap: {
      v166: "Compliance export activation gate in zero-activation dry-run.",
      v167: "Manual dispatch activation only after explicit operational approval.",
      v168: "Provider runtime canary execution only after explicit approval.",
      v169: "Runtime incident handling only after explicit activation approval.",
      v170: "Public compliance export only after explicit legal and privacy approval.",
    },
    redactedExportBundle: {
      exportId: "compliance_export_activation_gate_v16_6_redacted_dry_run",
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
        "export activation gate",
        "privacy redaction approval",
        "legal review locks",
        "reviewer attestation board",
        "export scope plan",
        "audit evidence locks",
        "publication no-go board",
        "export gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Compliance export activation gate is local dry-run only.",
      "No export activation, export file write, public sharing, legal approval, privacy approval, provider call, storage activation, task creation, intervention creation or execution is performed.",
      "Export publication remains blocked.",
      "No product recommendation, dosage advice, formal approval or production forecast is produced.",
      "V16.6 prepares compliance export activation governance only.",
    ],
  };
}

export const aiComplianceExportActivationGateVersion = "V16.6";
