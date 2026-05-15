export type PublicComplianceExportPublicationMode = "dry-run" | "publication-board-review";

export type PublicComplianceSeverity = "info" | "watch" | "elevated" | "critical";

export type PublicCompliancePriority = "low" | "medium" | "high" | "urgent";

export type PublicComplianceReadinessBand =
  | "blocked"
  | "publication-gate-design-ready"
  | "manual-board-review-ready"
  | "public-export-plan-ready";

export type PublicComplianceLane =
  | "publication-gate"
  | "legal-final-approval"
  | "privacy-final-approval"
  | "publication-scope"
  | "redaction-attestation"
  | "export-file-boundary"
  | "takedown-rollback"
  | "human-signoff";

export interface PublicComplianceExportPublicationGuardrail {
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
  canaryExecutionAllowed: false;
  canaryExecutionPerformed: false;
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
  manualDispatchActivationAllowed: false;
  manualDispatchActivationPerformed: false;
  incidentHandlingAllowed: false;
  incidentHandlingPerformed: false;
  incidentWriteAllowed: false;
  incidentWritePerformed: false;
  publicComplianceExportPublicationAllowed: false;
  publicComplianceExportPublicationPerformed: false;
  legalFinalApprovalAllowed: false;
  legalFinalApprovalPerformed: false;
  privacyFinalApprovalAllowed: false;
  privacyFinalApprovalPerformed: false;
  publicationPackageWriteAllowed: false;
  publicationPackageWritePerformed: false;
  publicationTakedownAllowed: false;
  publicationTakedownPerformed: false;
  publicComplianceExportPublicationGateReady: true;
  legalPrivacyApprovalLockReady: true;
  publicationNoGoReady: true;
  takedownRollbackPlanReady: true;
}

export interface PublicComplianceExportPublicationInput {
  publicationGateItemCount?: number;
  legalApprovalItemCount?: number;
  privacyApprovalItemCount?: number;
  publicationScopeItemCount?: number;
  redactionAttestationItemCount?: number;
  exportBoundaryItemCount?: number;
  openPublicationGapCount?: number;
  onlineReadinessScore?: number;
  complianceGateScore?: number;
  incidentHandlingScore?: number;
  auditPackageScore?: number;
  legalApprovalScore?: number;
  privacyApprovalScore?: number;
  publicationScopeScore?: number;
  publicationLeadRole?: string;
}

export interface PublicComplianceSourceNode {
  id: string;
  lane: PublicComplianceLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: PublicComplianceSeverity;
  priority: PublicCompliancePriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface PublicationGateItem {
  id: string;
  label: string;
  lane: PublicComplianceLane;
  gateScore: number;
  severity: PublicComplianceSeverity;
  gatePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface LegalFinalApprovalItem {
  id: string;
  label: string;
  lane: PublicComplianceLane;
  approvalScore: number;
  priority: PublicCompliancePriority;
  approvalQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface PrivacyFinalApprovalItem {
  id: string;
  label: string;
  lane: PublicComplianceLane;
  approvalScore: number;
  severity: PublicComplianceSeverity;
  approvalQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface PublicationScopeItem {
  id: string;
  label: string;
  lane: PublicComplianceLane;
  scopeScore: number;
  priority: PublicCompliancePriority;
  scopeQuestion: string;
  includedSections: string[];
  excludedSections: string[];
}

export interface RedactionAttestationItem {
  id: string;
  label: string;
  lane: PublicComplianceLane;
  attestationScore: number;
  severity: PublicComplianceSeverity;
  attestationQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ExportFileBoundaryItem {
  id: string;
  label: string;
  lane: PublicComplianceLane;
  boundaryScore: number;
  severity: PublicComplianceSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface TakedownRollbackItem {
  id: string;
  label: string;
  lane: PublicComplianceLane;
  rollbackScore: number;
  priority: PublicCompliancePriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface PublicationNoGoItem {
  id: string;
  label: string;
  lane: PublicComplianceLane;
  goNoGoState: "no-go" | "design-only" | "public-export-plan-ready";
  score: number;
  severity: PublicComplianceSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface PublicationGateCheckItem {
  id: string;
  label: string;
  lane: PublicComplianceLane;
  passed: boolean;
  score: number;
  severity: PublicComplianceSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface PublicationBoardPackItem {
  id: string;
  label: string;
  lane: PublicComplianceLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface PublicationFindingItem {
  id: string;
  label: string;
  lane: PublicComplianceLane;
  severity: PublicComplianceSeverity;
  reason: string;
  manualResolution: string;
  blocksPublicationActivation: boolean;
}

export interface PublicComplianceExportPublicationReport {
  generatedAt: string;
  mode: PublicComplianceExportPublicationMode;
  context: Required<PublicComplianceExportPublicationInput>;
  readiness: PublicComplianceExportPublicationGuardrail;
  publicationGateScore: number;
  publicationGateStatus: PublicComplianceReadinessBand;
  overallSeverity: PublicComplianceSeverity;
  sourceNodes: PublicComplianceSourceNode[];
  publicationGate: PublicationGateItem[];
  legalFinalApprovalBoard: LegalFinalApprovalItem[];
  privacyFinalApprovalBoard: PrivacyFinalApprovalItem[];
  publicationScopePlan: PublicationScopeItem[];
  redactionAttestationBoard: RedactionAttestationItem[];
  exportFileBoundary: ExportFileBoundaryItem[];
  takedownRollbackPlan: TakedownRollbackItem[];
  publicationNoGoBoard: PublicationNoGoItem[];
  publicationGateChecks: PublicationGateCheckItem[];
  publicationBoardPack: PublicationBoardPackItem[];
  publicationFindings: PublicationFindingItem[];
  stagedRoadmap: {
    v170: string;
    v171: string;
    v172: string;
    v173: string;
    v174: string;
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

export const PUBLIC_COMPLIANCE_EXPORT_PUBLICATION_GUARDRAIL: PublicComplianceExportPublicationGuardrail = {
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
  canaryExecutionAllowed: false,
  canaryExecutionPerformed: false,
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
  manualDispatchActivationAllowed: false,
  manualDispatchActivationPerformed: false,
  incidentHandlingAllowed: false,
  incidentHandlingPerformed: false,
  incidentWriteAllowed: false,
  incidentWritePerformed: false,
  publicComplianceExportPublicationAllowed: false,
  publicComplianceExportPublicationPerformed: false,
  legalFinalApprovalAllowed: false,
  legalFinalApprovalPerformed: false,
  privacyFinalApprovalAllowed: false,
  privacyFinalApprovalPerformed: false,
  publicationPackageWriteAllowed: false,
  publicationPackageWritePerformed: false,
  publicationTakedownAllowed: false,
  publicationTakedownPerformed: false,
  publicComplianceExportPublicationGateReady: true,
  legalPrivacyApprovalLockReady: true,
  publicationNoGoReady: true,
  takedownRollbackPlanReady: true,
};

const priorityWeight: Record<PublicCompliancePriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: PublicComplianceExportPublicationInput): Required<PublicComplianceExportPublicationInput> {
  return {
    publicationGateItemCount: input.publicationGateItemCount ?? 8,
    legalApprovalItemCount: input.legalApprovalItemCount ?? 8,
    privacyApprovalItemCount: input.privacyApprovalItemCount ?? 8,
    publicationScopeItemCount: input.publicationScopeItemCount ?? 7,
    redactionAttestationItemCount: input.redactionAttestationItemCount ?? 7,
    exportBoundaryItemCount: input.exportBoundaryItemCount ?? 7,
    openPublicationGapCount: input.openPublicationGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    complianceGateScore: input.complianceGateScore ?? 70,
    incidentHandlingScore: input.incidentHandlingScore ?? 70,
    auditPackageScore: input.auditPackageScore ?? 70,
    legalApprovalScore: input.legalApprovalScore ?? 64,
    privacyApprovalScore: input.privacyApprovalScore ?? 66,
    publicationScopeScore: input.publicationScopeScore ?? 66,
    publicationLeadRole: input.publicationLeadRole ?? "public compliance export publication reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): PublicComplianceSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: PublicComplianceSeverity): PublicCompliancePriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): PublicComplianceReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "public-export-plan-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "publication-gate-design-ready";
}

function buildSourceNode(
  id: string,
  lane: PublicComplianceLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): PublicComplianceSourceNode {
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
            "Public compliance export publication gate remains below activation threshold.",
            "Publication board must resolve legal approval, privacy approval, scope, redaction and rollback gaps before any later public export release.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<PublicComplianceExportPublicationInput>): PublicComplianceSourceNode[] {
  const publicationPressure = context.publicationGateItemCount;
  const legalPressure = context.legalApprovalItemCount * 2;
  const privacyPressure = context.privacyApprovalItemCount * 2;
  const scopePressure = context.publicationScopeItemCount * 2;
  const attestationPressure = context.redactionAttestationItemCount;
  const gapPressure = context.openPublicationGapCount * 2;

  return [
    buildSourceNode(
      "PCEG_NODE_001",
      "publication-gate",
      "Compliance export activation gate",
      "V16.6",
      context.complianceGateScore,
      context.auditPackageScore,
      publicationPressure,
      "Connect compliance export gate to public publication design.",
    ),
    buildSourceNode(
      "PCEG_NODE_002",
      "legal-final-approval",
      "Legal final approval lock",
      "V17.0",
      context.legalApprovalScore,
      context.complianceGateScore,
      legalPressure,
      "Keep legal final approval locked until explicit future release.",
    ),
    buildSourceNode(
      "PCEG_NODE_003",
      "privacy-final-approval",
      "Privacy final approval lock",
      "V17.0",
      context.privacyApprovalScore,
      context.complianceGateScore,
      privacyPressure,
      "Keep privacy final approval locked and redacted.",
    ),
    buildSourceNode(
      "PCEG_NODE_004",
      "publication-scope",
      "Publication scope design",
      "V17.0",
      context.publicationScopeScore,
      context.privacyApprovalScore,
      scopePressure,
      "Define public export scope without publishing.",
    ),
    buildSourceNode(
      "PCEG_NODE_005",
      "redaction-attestation",
      "Operational audit package",
      "V16.2",
      context.auditPackageScore,
      context.privacyApprovalScore,
      attestationPressure,
      "Prepare redaction attestation without persistence.",
    ),
    buildSourceNode(
      "PCEG_NODE_006",
      "export-file-boundary",
      "Runtime incident handling gate",
      "V16.9",
      context.incidentHandlingScore,
      context.complianceGateScore,
      context.exportBoundaryItemCount,
      "Keep export file writes and incident data publication blocked.",
    ),
    buildSourceNode(
      "PCEG_NODE_007",
      "takedown-rollback",
      "Publication rollback design",
      "V17.0",
      context.incidentHandlingScore,
      context.publicationScopeScore,
      gapPressure,
      "Prepare takedown rollback plan without publication.",
    ),
    buildSourceNode(
      "PCEG_NODE_008",
      "human-signoff",
      "Public publication human signoff",
      "V17.0",
      context.legalApprovalScore,
      context.privacyApprovalScore,
      gapPressure,
      "Keep public compliance export blocked until a separate explicit legal and privacy approval release.",
    ),
  ];
}

function buildPublicationGate(context: Required<PublicComplianceExportPublicationInput>): PublicationGateItem[] {
  return [
    {
      id: "PCEG_PUBLICATION_001",
      label: "Public compliance export publication lock",
      lane: "publication-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Keep public compliance export publication disabled in V17.0.",
      requiredEvidence: ["publicComplianceExportPublicationAllowed=false", "publicationPackageWriteAllowed=false", "publicShareAllowed=false"],
      blockedOutcome: "No public export publication.",
    },
    {
      id: "PCEG_PUBLICATION_002",
      label: "Public export plan",
      lane: "publication-gate",
      gateScore: clampScore(context.complianceGateScore),
      severity: severityFromConcern(100 - context.complianceGateScore + context.publicationGateItemCount * 4),
      gatePurpose: "Prepare public export plan without writing or publishing.",
      requiredEvidence: ["legal lock", "privacy lock", "scope plan", "redaction attestation"],
      blockedOutcome: "No export package write.",
    },
    {
      id: "PCEG_PUBLICATION_003",
      label: "Publication approval lock",
      lane: "publication-gate",
      gateScore: 100,
      severity: "critical",
      gatePurpose: "Require explicit legal and privacy approval in a separate later release.",
      requiredEvidence: ["legalFinalApprovalAllowed=false", "privacyFinalApprovalAllowed=false"],
      blockedOutcome: "No publication approval.",
    },
  ];
}

function buildLegalFinalApprovalBoard(context: Required<PublicComplianceExportPublicationInput>): LegalFinalApprovalItem[] {
  return [
    {
      id: "PCEG_LEGAL_001",
      label: "Legal final approval design",
      lane: "legal-final-approval",
      approvalScore: clampScore(context.legalApprovalScore),
      priority: context.legalApprovalScore < 70 ? "urgent" : "high",
      approvalQuestion: "Can legal final approval be reviewed without approving publication?",
      requiredEvidence: ["legal review lock", "publication no-go", "scope caveat"],
      blockedOutcome: "No legal final approval.",
    },
    {
      id: "PCEG_LEGAL_002",
      label: "Liability caveat review",
      lane: "legal-final-approval",
      approvalScore: clampScore(context.legalApprovalScore - context.legalApprovalItemCount),
      priority: "urgent",
      approvalQuestion: "Can liability caveats remain under review?",
      requiredEvidence: ["no product advice", "no dosage guidance", "no execution advice"],
      blockedOutcome: "No legal publication clearance.",
    },
    {
      id: "PCEG_LEGAL_003",
      label: "Publication jurisdiction hold",
      lane: "legal-final-approval",
      approvalScore: 100,
      priority: "urgent",
      approvalQuestion: "Can publication remain blocked until jurisdiction review?",
      requiredEvidence: ["publication no-go", "human signoff", "legal final approval lock"],
      blockedOutcome: "No publication.",
    },
  ];
}

function buildPrivacyFinalApprovalBoard(context: Required<PublicComplianceExportPublicationInput>): PrivacyFinalApprovalItem[] {
  return [
    {
      id: "PCEG_PRIVACY_001",
      label: "Field identity privacy approval",
      lane: "privacy-final-approval",
      approvalScore: 100,
      severity: "critical",
      approvalQuestion: "Are field identifiers excluded from publication design?",
      requiredChecks: ["no field identifiers", "no farm identity", "no private notes"],
      manualResolution: "Block publication if identity data appears.",
    },
    {
      id: "PCEG_PRIVACY_002",
      label: "Provider and incident privacy approval",
      lane: "privacy-final-approval",
      approvalScore: 100,
      severity: "critical",
      approvalQuestion: "Are provider payloads and incident records excluded?",
      requiredChecks: ["no provider payloads", "no incident records", "no prompts"],
      manualResolution: "Keep payloads and incident records excluded.",
    },
    {
      id: "PCEG_PRIVACY_003",
      label: "Operational data privacy approval",
      lane: "privacy-final-approval",
      approvalScore: clampScore(context.privacyApprovalScore),
      severity: severityFromConcern(100 - context.privacyApprovalScore + context.privacyApprovalItemCount * 4),
      approvalQuestion: "Are operational internals excluded?",
      requiredChecks: ["no dispatch data", "no internal board notes", "no personal notes"],
      manualResolution: "Block publication if operational internals appear.",
    },
  ];
}

function buildPublicationScopePlan(context: Required<PublicComplianceExportPublicationInput>): PublicationScopeItem[] {
  return [
    {
      id: "PCEG_SCOPE_001",
      label: "Public compliance scope",
      lane: "publication-scope",
      scopeScore: clampScore(context.publicationScopeScore),
      priority: context.publicationScopeScore < 70 ? "urgent" : "high",
      scopeQuestion: "Which sections can be designed for future public export?",
      includedSections: ["redacted safety posture", "release checkpoints", "no-go locks", "compliance summary"],
      excludedSections: ["field identifiers", "private notes", "provider payloads", "incident records"],
    },
    {
      id: "PCEG_SCOPE_002",
      label: "Runtime lock publication scope",
      lane: "publication-scope",
      scopeScore: clampScore(context.incidentHandlingScore),
      priority: "high",
      scopeQuestion: "Can runtime lock posture be summarized publicly?",
      includedSections: ["provider lock", "storage lock", "dispatch lock", "incident write lock"],
      excludedSections: ["incident details", "operator notes", "case files"],
    },
    {
      id: "PCEG_SCOPE_003",
      label: "Agronomic content publication scope",
      lane: "publication-scope",
      scopeScore: 100,
      priority: "urgent",
      scopeQuestion: "Can agronomic operational guidance remain excluded?",
      includedSections: ["high-level readiness statement", "human review statement"],
      excludedSections: ["product recommendations", "dosage guidance", "execution instructions"],
    },
  ];
}

function buildRedactionAttestationBoard(context: Required<PublicComplianceExportPublicationInput>): RedactionAttestationItem[] {
  return [
    {
      id: "PCEG_ATTEST_001",
      label: "Redaction attestation design",
      lane: "redaction-attestation",
      attestationScore: clampScore(context.privacyApprovalScore),
      severity: severityFromConcern(100 - context.privacyApprovalScore + context.redactionAttestationItemCount * 4),
      attestationQuestion: "Can redaction be attested without persistence?",
      requiredEvidence: ["redaction board", "privacy approval lock", "excluded sections"],
      blockedOutcome: "No attestation persistence.",
    },
    {
      id: "PCEG_ATTEST_002",
      label: "Safety attestation design",
      lane: "redaction-attestation",
      attestationScore: 100,
      severity: "critical",
      attestationQuestion: "Can safety exclusions be attested?",
      requiredEvidence: ["no product advice", "no dosage guidance", "no execution instructions"],
      blockedOutcome: "No safety approval activation.",
    },
    {
      id: "PCEG_ATTEST_003",
      label: "Legal privacy attestation design",
      lane: "redaction-attestation",
      attestationScore: clampScore((context.legalApprovalScore + context.privacyApprovalScore) / 2),
      severity: "elevated",
      attestationQuestion: "Can legal and privacy locks be represented together?",
      requiredEvidence: ["legal lock", "privacy lock", "publication no-go"],
      blockedOutcome: "No final approval.",
    },
  ];
}

function buildExportFileBoundary(): ExportFileBoundaryItem[] {
  return [
    {
      id: "PCEG_BOUNDARY_001",
      label: "Publication package write boundary",
      lane: "export-file-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No publication package can be written.",
      blockedOutcome: "publicationPackageWriteAllowed=false",
    },
    {
      id: "PCEG_BOUNDARY_002",
      label: "Public share boundary",
      lane: "export-file-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No public share can occur.",
      blockedOutcome: "publicShareAllowed=false",
    },
    {
      id: "PCEG_BOUNDARY_003",
      label: "Persistent export boundary",
      lane: "export-file-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "No export artifact persistence can occur.",
      blockedOutcome: "persistencePerformed=false",
    },
  ];
}

function buildTakedownRollbackPlan(context: Required<PublicComplianceExportPublicationInput>): TakedownRollbackItem[] {
  return [
    {
      id: "PCEG_TAKEDOWN_001",
      label: "Publication takedown rollback design",
      lane: "takedown-rollback",
      rollbackScore: clampScore(context.incidentHandlingScore),
      priority: context.incidentHandlingScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can future publication return to no-publication state?",
      safeFallback: "Return to local dry-run and publication no-go board.",
    },
    {
      id: "PCEG_TAKEDOWN_002",
      label: "Export package rollback design",
      lane: "takedown-rollback",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can export package write remain blocked?",
      safeFallback: "No export package exists in V17.0.",
    },
    {
      id: "PCEG_TAKEDOWN_003",
      label: "Privacy takedown review design",
      lane: "takedown-rollback",
      rollbackScore: clampScore(context.privacyApprovalScore),
      priority: "urgent",
      rollbackQuestion: "Can privacy issue route to immediate takedown board in a later release?",
      safeFallback: "Keep privacy approval locked and no-publication active.",
    },
  ];
}

function buildPublicationNoGoBoard(): PublicationNoGoItem[] {
  return [
    {
      id: "PCEG_GONOGO_001",
      label: "Public compliance export plan",
      lane: "human-signoff",
      goNoGoState: "public-export-plan-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["legal final approval", "privacy final approval", "redaction attestation"],
      safeOutcome: "Public export plan only.",
    },
    {
      id: "PCEG_GONOGO_002",
      label: "Actual public compliance export",
      lane: "publication-gate",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate publication release", "legal final approval", "privacy final approval"],
      safeOutcome: "Public compliance export remains blocked.",
    },
    {
      id: "PCEG_GONOGO_003",
      label: "Publication package write or share",
      lane: "export-file-boundary",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate write path release", "publication approval", "rollback proof"],
      safeOutcome: "Package write and public share remain blocked.",
    },
  ];
}

function buildPublicationGateChecks(
  context: Required<PublicComplianceExportPublicationInput>,
  sourceNodes: PublicComplianceSourceNode[],
): PublicationGateCheckItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PCEG_CHECK_001",
      label: "Publication gate remains zero-export",
      lane: "publication-gate" as PublicComplianceLane,
      score: 100,
      reviewer: "public compliance export publication reviewer",
      requiredEvidence: ["publicComplianceExportPublicationAllowed=false", "publicationPackageWriteAllowed=false", "publicShareAllowed=false"],
      hardStop: "Do not activate public export publication in V17.0.",
    },
    {
      id: "PCEG_CHECK_002",
      label: "Legal final approval is complete enough",
      lane: "legal-final-approval" as PublicComplianceLane,
      score: context.legalApprovalScore - context.legalApprovalItemCount * 3,
      reviewer: "legal final approval board",
      requiredEvidence: ["legal approval design", "liability caveat", "jurisdiction hold"],
      hardStop: "Do not proceed without legal final approval board.",
    },
    {
      id: "PCEG_CHECK_003",
      label: "Privacy final approval is complete enough",
      lane: "privacy-final-approval" as PublicComplianceLane,
      score: context.privacyApprovalScore - context.privacyApprovalItemCount * 3,
      reviewer: "privacy final approval board",
      requiredEvidence: ["identity redaction", "provider privacy", "operational privacy"],
      hardStop: "Do not proceed without privacy final approval board.",
    },
    {
      id: "PCEG_CHECK_004",
      label: "Publication scope is complete enough",
      lane: "publication-scope" as PublicComplianceLane,
      score: context.publicationScopeScore - context.publicationScopeItemCount * 3,
      reviewer: context.publicationLeadRole,
      requiredEvidence: ["public scope", "runtime lock scope", "agronomic exclusions"],
      hardStop: "Do not proceed without publication scope board.",
    },
    {
      id: "PCEG_CHECK_005",
      label: "Export file boundary is complete",
      lane: "export-file-boundary" as PublicComplianceLane,
      score: 100,
      reviewer: "export file boundary reviewer",
      requiredEvidence: ["package write boundary", "public share boundary", "persistence boundary"],
      hardStop: "Export file boundaries must remain active.",
    },
    {
      id: "PCEG_CHECK_006",
      label: "Source blockers are within publication tolerance",
      lane: "human-signoff" as PublicComplianceLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before public-export-plan-ready state.",
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

function buildBoardPack(context: Required<PublicComplianceExportPublicationInput>): PublicationBoardPackItem[] {
  return [
    {
      id: "PCEG_PACK_001",
      label: "Publication gate packet",
      lane: "publication-gate",
      packReady: context.complianceGateScore >= 60,
      readinessScore: clampScore(context.complianceGateScore),
      reviewerCheck: "Confirm publication remains zero-export and design-only.",
      includedSections: ["publication gate", "publication no-go", "file boundaries"],
      blockedSections: ["publication package write", "public share", "persistent export"],
    },
    {
      id: "PCEG_PACK_002",
      label: "Legal privacy approval packet",
      lane: "legal-final-approval",
      packReady: context.legalApprovalScore >= 60 && context.privacyApprovalScore >= 60,
      readinessScore: clampScore((context.legalApprovalScore + context.privacyApprovalScore) / 2),
      reviewerCheck: "Confirm legal and privacy approvals remain locked.",
      includedSections: ["legal final approval", "privacy final approval", "redaction attestation"],
      blockedSections: ["legal final approval performed", "privacy final approval performed"],
    },
    {
      id: "PCEG_PACK_003",
      label: "Scope and rollback packet",
      lane: "publication-scope",
      packReady: context.publicationScopeScore >= 60,
      readinessScore: clampScore(context.publicationScopeScore),
      reviewerCheck: "Confirm publication scope and takedown rollback are design-only.",
      includedSections: ["publication scope", "takedown rollback", "excluded sections"],
      blockedSections: ["actual takedown", "actual publication", "public artifact"],
    },
  ];
}

function buildFindings(
  context: Required<PublicComplianceExportPublicationInput>,
  sourceNodes: PublicComplianceSourceNode[],
  gates: PublicationGateCheckItem[],
  goNoGo: PublicationNoGoItem[],
): PublicationFindingItem[] {
  const findings: PublicationFindingItem[] = [];

  if (context.openPublicationGapCount > 0) {
    findings.push({
      id: "PCEG_FINDING_001",
      label: "Open publication gaps",
      lane: "human-signoff",
      severity: context.openPublicationGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openPublicationGapCount} publication gaps remain before any later public export release.`,
      manualResolution: "Resolve legal, privacy, scope, redaction and rollback gaps in a later gated release.",
      blocksPublicationActivation: true,
    });
  }

  if (context.legalApprovalScore < 70) {
    findings.push({
      id: "PCEG_FINDING_002",
      label: "Legal final approval below threshold",
      lane: "legal-final-approval",
      severity: "critical",
      reason: "Legal final approval is not mature enough for public export.",
      manualResolution: "Complete legal, liability and jurisdiction review.",
      blocksPublicationActivation: true,
    });
  }

  if (context.privacyApprovalScore < 70) {
    findings.push({
      id: "PCEG_FINDING_003",
      label: "Privacy final approval below threshold",
      lane: "privacy-final-approval",
      severity: "critical",
      reason: "Privacy final approval is not mature enough for public export.",
      manualResolution: "Complete identity, provider and operational privacy review.",
      blocksPublicationActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `PCEG_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksPublicationActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `PCEG_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Publication gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksPublicationActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `PCEG_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksPublicationActivation: true,
      });
    });

  return findings;
}

export function buildAiPublicComplianceExportPublicationGateReport(
  input: PublicComplianceExportPublicationInput = {},
): PublicComplianceExportPublicationReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const publicationGate = buildPublicationGate(context);
  const legalFinalApprovalBoard = buildLegalFinalApprovalBoard(context);
  const privacyFinalApprovalBoard = buildPrivacyFinalApprovalBoard(context);
  const publicationScopePlan = buildPublicationScopePlan(context);
  const redactionAttestationBoard = buildRedactionAttestationBoard(context);
  const exportFileBoundary = buildExportFileBoundary();
  const takedownRollbackPlan = buildTakedownRollbackPlan(context);
  const publicationNoGoBoard = buildPublicationNoGoBoard();
  const publicationGateChecks = buildPublicationGateChecks(context, sourceNodes);
  const publicationBoardPack = buildBoardPack(context);
  const publicationFindings = buildFindings(context, sourceNodes, publicationGateChecks, publicationNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const publicationAverage =
    publicationGate.reduce((sum, item) => sum + item.gateScore, 0) /
    Math.max(1, publicationGate.length);

  const privacyAverage =
    privacyFinalApprovalBoard.reduce((sum, item) => sum + item.approvalScore, 0) /
    Math.max(1, privacyFinalApprovalBoard.length);

  const gateAverage =
    publicationGateChecks.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, publicationGateChecks.length);

  const findingPenalty = publicationFindings.filter((item) => item.blocksPublicationActivation).length * 7;
  const legalPressure =
    legalFinalApprovalBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, legalFinalApprovalBoard.length * 4);

  const publicationGateScore = clampScore(
    sourceAverage / 4 +
      publicationAverage / 4 +
      privacyAverage / 4 +
      gateAverage / 4 +
      legalPressure -
      findingPenalty -
      context.openPublicationGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openPublicationGapCount * 8 +
        context.legalApprovalItemCount * 6 +
        context.privacyApprovalItemCount * 6 +
        context.publicationScopeItemCount * 5 +
        context.redactionAttestationItemCount * 5,
    ),
  );

  const publicationGateStatus = bandFromScore(
    publicationGateScore,
    publicationFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PUBLIC_COMPLIANCE_EXPORT_PUBLICATION_GUARDRAIL,
    publicationGateScore,
    publicationGateStatus,
    overallSeverity,
    sourceNodes,
    publicationGate,
    legalFinalApprovalBoard,
    privacyFinalApprovalBoard,
    publicationScopePlan,
    redactionAttestationBoard,
    exportFileBoundary,
    takedownRollbackPlan,
    publicationNoGoBoard,
    publicationGateChecks,
    publicationBoardPack,
    publicationFindings,
    stagedRoadmap: {
      v170: "Public compliance export publication gate in zero-export dry-run.",
      v171: "Manual dispatch write path only after explicit operational approval.",
      v172: "Provider canary call execution only after explicit provider approval.",
      v173: "Incident handling write path only after explicit incident governance approval.",
      v174: "Public export package write only after explicit legal and privacy approval.",
    },
    redactedExportBundle: {
      exportId: "public_compliance_export_publication_gate_v17_0_redacted_dry_run",
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
        "publication gate",
        "legal final approval board",
        "privacy final approval board",
        "publication scope plan",
        "redaction attestation board",
        "export file boundary",
        "takedown rollback plan",
        "publication no-go board",
        "publication gate checks",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Public compliance export publication gate is local dry-run only.",
      "No public export publication, publication package write, public share, legal final approval, privacy final approval, provider call, storage activation, task creation, intervention creation or execution is performed.",
      "Publication remains zero-export and zero-write.",
      "No product recommendation, dosage advice, formal approval or production forecast is produced.",
      "V17.0 prepares public compliance export publication governance only.",
    ],
  };
}

export const aiPublicComplianceExportPublicationGateVersion = "V17.0";
