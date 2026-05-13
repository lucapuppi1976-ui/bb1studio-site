export type OperationalAuditPackageMode = "dry-run" | "audit-board-review";

export type OperationalAuditSeverity = "info" | "watch" | "elevated" | "critical";

export type OperationalAuditPriority = "low" | "medium" | "high" | "urgent";

export type OperationalAuditReadinessBand =
  | "blocked"
  | "audit-design-ready"
  | "manual-board-review-ready"
  | "compliance-export-ready";

export type OperationalAuditLane =
  | "audit-trail"
  | "compliance-export"
  | "redaction-board"
  | "reviewer-evidence"
  | "immutable-evidence"
  | "runtime-lock-evidence"
  | "export-no-go"
  | "human-signoff";

export interface OperationalAuditGuardrail {
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
  complianceExportAllowed: false;
  complianceExportPerformed: false;
  operationalAuditPackageReady: true;
  complianceExportHardeningReady: true;
  auditExportBundleReady: true;
  runtimeLockEvidenceReady: true;
}

export interface OperationalAuditInput {
  auditTrailItemCount?: number;
  complianceExportItemCount?: number;
  redactionBoardItemCount?: number;
  reviewerEvidenceItemCount?: number;
  immutableEvidenceItemCount?: number;
  runtimeLockEvidenceItemCount?: number;
  openAuditGapCount?: number;
  onlineReadinessScore?: number;
  hardeningScore?: number;
  launchGateScore?: number;
  reviewerAuditScore?: number;
  redactionScore?: number;
  complianceScore?: number;
  evidenceIntegrityScore?: number;
  auditLeadRole?: string;
}

export interface OperationalAuditSourceNode {
  id: string;
  lane: OperationalAuditLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: OperationalAuditSeverity;
  priority: OperationalAuditPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface AuditTrailPackageItem {
  id: string;
  label: string;
  lane: OperationalAuditLane;
  auditScore: number;
  severity: OperationalAuditSeverity;
  auditPurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ComplianceExportItem {
  id: string;
  label: string;
  lane: OperationalAuditLane;
  exportScore: number;
  priority: OperationalAuditPriority;
  exportQuestion: string;
  includedSections: string[];
  blockedOutcome: string;
}

export interface RedactionBoardItem {
  id: string;
  label: string;
  lane: OperationalAuditLane;
  redactionScore: number;
  severity: OperationalAuditSeverity;
  redactionQuestion: string;
  requiredChecks: string[];
  manualResolution: string;
}

export interface ReviewerEvidenceItem {
  id: string;
  label: string;
  lane: OperationalAuditLane;
  evidenceScore: number;
  severity: OperationalAuditSeverity;
  evidenceQuestion: string;
  evidenceFields: string[];
  blockedOutcome: string;
}

export interface ImmutableEvidenceItem {
  id: string;
  label: string;
  lane: OperationalAuditLane;
  integrityScore: number;
  priority: OperationalAuditPriority;
  integrityQuestion: string;
  requiredEvidence: string[];
  manualResolution: string;
}

export interface RuntimeLockEvidenceItem {
  id: string;
  label: string;
  lane: OperationalAuditLane;
  lockScore: number;
  severity: OperationalAuditSeverity;
  lockRule: string;
  blockedOutcome: string;
}

export interface ExportNoGoItem {
  id: string;
  label: string;
  lane: OperationalAuditLane;
  goNoGoState: "no-go" | "design-only" | "audit-ready";
  score: number;
  severity: OperationalAuditSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface OperationalAuditGateItem {
  id: string;
  label: string;
  lane: OperationalAuditLane;
  passed: boolean;
  score: number;
  severity: OperationalAuditSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface OperationalAuditBoardPackItem {
  id: string;
  label: string;
  lane: OperationalAuditLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface OperationalAuditFindingItem {
  id: string;
  label: string;
  lane: OperationalAuditLane;
  severity: OperationalAuditSeverity;
  reason: string;
  manualResolution: string;
  blocksAuditExportActivation: boolean;
}

export interface OperationalAuditPackageReport {
  generatedAt: string;
  mode: OperationalAuditPackageMode;
  context: Required<OperationalAuditInput>;
  readiness: OperationalAuditGuardrail;
  auditPackageScore: number;
  auditPackageStatus: OperationalAuditReadinessBand;
  overallSeverity: OperationalAuditSeverity;
  sourceNodes: OperationalAuditSourceNode[];
  auditTrailPackage: AuditTrailPackageItem[];
  complianceExportPacket: ComplianceExportItem[];
  redactionBoard: RedactionBoardItem[];
  reviewerEvidencePack: ReviewerEvidenceItem[];
  immutableEvidenceDesign: ImmutableEvidenceItem[];
  runtimeLockEvidence: RuntimeLockEvidenceItem[];
  exportNoGoBoard: ExportNoGoItem[];
  auditPackageGates: OperationalAuditGateItem[];
  auditBoardPack: OperationalAuditBoardPackItem[];
  auditFindings: OperationalAuditFindingItem[];
  stagedRoadmap: {
    v162: string;
    v163: string;
    v164: string;
    v165: string;
    v166: string;
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

export const OPERATIONAL_AUDIT_GUARDRAIL: OperationalAuditGuardrail = {
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
  complianceExportAllowed: false,
  complianceExportPerformed: false,
  operationalAuditPackageReady: true,
  complianceExportHardeningReady: true,
  auditExportBundleReady: true,
  runtimeLockEvidenceReady: true,
};

const priorityWeight: Record<OperationalAuditPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: OperationalAuditInput): Required<OperationalAuditInput> {
  return {
    auditTrailItemCount: input.auditTrailItemCount ?? 8,
    complianceExportItemCount: input.complianceExportItemCount ?? 8,
    redactionBoardItemCount: input.redactionBoardItemCount ?? 7,
    reviewerEvidenceItemCount: input.reviewerEvidenceItemCount ?? 7,
    immutableEvidenceItemCount: input.immutableEvidenceItemCount ?? 7,
    runtimeLockEvidenceItemCount: input.runtimeLockEvidenceItemCount ?? 7,
    openAuditGapCount: input.openAuditGapCount ?? 8,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    hardeningScore: input.hardeningScore ?? 70,
    launchGateScore: input.launchGateScore ?? 70,
    reviewerAuditScore: input.reviewerAuditScore ?? 68,
    redactionScore: input.redactionScore ?? 66,
    complianceScore: input.complianceScore ?? 64,
    evidenceIntegrityScore: input.evidenceIntegrityScore ?? 66,
    auditLeadRole: input.auditLeadRole ?? "operational audit package reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): OperationalAuditSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: OperationalAuditSeverity): OperationalAuditPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): OperationalAuditReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "compliance-export-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "audit-design-ready";
}

function buildSourceNode(
  id: string,
  lane: OperationalAuditLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): OperationalAuditSourceNode {
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
            "Operational audit package remains below export-readiness threshold.",
            "Audit board must resolve redaction, reviewer evidence, integrity and runtime lock evidence gaps before later export activation.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<OperationalAuditInput>): OperationalAuditSourceNode[] {
  const auditPressure = context.auditTrailItemCount;
  const exportPressure = context.complianceExportItemCount * 2;
  const redactionPressure = context.redactionBoardItemCount * 2;
  const evidencePressure = context.reviewerEvidenceItemCount;
  const lockPressure = context.runtimeLockEvidenceItemCount;
  const gapPressure = context.openAuditGapCount * 2;

  return [
    buildSourceNode(
      "OAP_NODE_001",
      "audit-trail",
      "Post-beta hardening baseline",
      "V16.1",
      context.hardeningScore,
      context.reviewerAuditScore,
      auditPressure,
      "Translate hardening evidence into audit package design.",
    ),
    buildSourceNode(
      "OAP_NODE_002",
      "compliance-export",
      "Controlled production beta gate",
      "V16.0",
      context.launchGateScore,
      context.complianceScore,
      exportPressure,
      "Prepare compliance export packet without export activation.",
    ),
    buildSourceNode(
      "OAP_NODE_003",
      "redaction-board",
      "Redaction readiness",
      "V16.2",
      context.redactionScore,
      context.complianceScore,
      redactionPressure,
      "Confirm redaction board before later export use.",
    ),
    buildSourceNode(
      "OAP_NODE_004",
      "reviewer-evidence",
      "Reviewer audit readiness",
      "V16.1",
      context.reviewerAuditScore,
      context.hardeningScore,
      evidencePressure,
      "Prepare reviewer evidence package without persistence.",
    ),
    buildSourceNode(
      "OAP_NODE_005",
      "immutable-evidence",
      "Evidence integrity readiness",
      "V16.2",
      context.evidenceIntegrityScore,
      context.reviewerAuditScore,
      context.immutableEvidenceItemCount * 2,
      "Design immutable evidence posture without storage writes.",
    ),
    buildSourceNode(
      "OAP_NODE_006",
      "runtime-lock-evidence",
      "Runtime lock evidence",
      "V16.0",
      100,
      context.launchGateScore,
      lockPressure,
      "Prove runtime locks remain active.",
    ),
    buildSourceNode(
      "OAP_NODE_007",
      "export-no-go",
      "Export no-go board",
      "V16.2",
      context.complianceScore,
      context.redactionScore,
      gapPressure,
      "Keep export activation blocked in this release.",
    ),
    buildSourceNode(
      "OAP_NODE_008",
      "human-signoff",
      "Human audit board signoff",
      "V16.2",
      context.reviewerAuditScore,
      context.evidenceIntegrityScore,
      gapPressure,
      "Keep later compliance export activation blocked until explicit release.",
    ),
  ];
}

function buildAuditTrailPackage(context: Required<OperationalAuditInput>): AuditTrailPackageItem[] {
  return [
    {
      id: "OAP_AUDIT_001",
      label: "Runtime lock audit trail",
      lane: "audit-trail",
      auditScore: 100,
      severity: "critical",
      auditPurpose: "Document that provider, storage, review and conversion runtime paths remain locked.",
      requiredEvidence: ["providerCalled=false", "storageActivationAllowed=false", "taskCreated=false"],
      blockedOutcome: "No runtime activation.",
    },
    {
      id: "OAP_AUDIT_002",
      label: "Reviewer decision trail design",
      lane: "audit-trail",
      auditScore: clampScore(context.reviewerAuditScore),
      severity: severityFromConcern(100 - context.reviewerAuditScore + context.auditTrailItemCount * 4),
      auditPurpose: "Design reviewer decision evidence without persistence.",
      requiredEvidence: ["review state", "reviewer role", "reason note", "board note"],
      blockedOutcome: "No review persistence.",
    },
    {
      id: "OAP_AUDIT_003",
      label: "Fallback trail design",
      lane: "audit-trail",
      auditScore: clampScore(context.hardeningScore),
      severity: "elevated",
      auditPurpose: "Document future fallback route evidence.",
      requiredEvidence: ["fallback route", "stop reason", "dry-run return"],
      blockedOutcome: "No fallback event write.",
    },
  ];
}

function buildComplianceExportPacket(context: Required<OperationalAuditInput>): ComplianceExportItem[] {
  return [
    {
      id: "OAP_EXPORT_001",
      label: "Compliance export packet",
      lane: "compliance-export",
      exportScore: clampScore(context.complianceScore),
      priority: context.complianceScore < 70 ? "urgent" : "high",
      exportQuestion: "Can a future compliance export be assembled without activating export?",
      includedSections: ["audit trail", "reviewer evidence", "runtime locks", "redaction board"],
      blockedOutcome: "No compliance export activation.",
    },
    {
      id: "OAP_EXPORT_002",
      label: "Redacted executive packet",
      lane: "compliance-export",
      exportScore: clampScore(context.redactionScore),
      priority: "high",
      exportQuestion: "Can executive evidence stay redacted?",
      includedSections: ["redacted summary", "safety posture", "no-go findings"],
      blockedOutcome: "No public share.",
    },
    {
      id: "OAP_EXPORT_003",
      label: "Runtime lock evidence packet",
      lane: "compliance-export",
      exportScore: 100,
      priority: "urgent",
      exportQuestion: "Can runtime locks be represented clearly?",
      includedSections: ["provider lock", "storage lock", "conversion lock"],
      blockedOutcome: "No runtime release.",
    },
  ];
}

function buildRedactionBoard(context: Required<OperationalAuditInput>): RedactionBoardItem[] {
  return [
    {
      id: "OAP_REDACTION_001",
      label: "Field identity redaction",
      lane: "redaction-board",
      redactionScore: 100,
      severity: "critical",
      redactionQuestion: "Are field identifiers excluded from export design?",
      requiredChecks: ["no field identifiers", "no private notes", "no operational internals"],
      manualResolution: "Keep redacted export only.",
    },
    {
      id: "OAP_REDACTION_002",
      label: "Provider payload redaction",
      lane: "redaction-board",
      redactionScore: 100,
      severity: "critical",
      redactionQuestion: "Are provider payloads excluded from export design?",
      requiredChecks: ["no provider payloads", "no runtime data", "no private prompts"],
      manualResolution: "Keep payloads excluded.",
    },
    {
      id: "OAP_REDACTION_003",
      label: "Operational guidance redaction",
      lane: "redaction-board",
      redactionScore: clampScore(context.redactionScore),
      severity: severityFromConcern(100 - context.redactionScore + context.redactionBoardItemCount * 4),
      redactionQuestion: "Are product, dosage and execution details excluded?",
      requiredChecks: ["no product recommendation", "no dosage guidance", "no execution instruction"],
      manualResolution: "Block export if operational wording appears.",
    },
  ];
}

function buildReviewerEvidencePack(context: Required<OperationalAuditInput>): ReviewerEvidenceItem[] {
  return [
    {
      id: "OAP_EVIDENCE_001",
      label: "Reviewer rationale evidence",
      lane: "reviewer-evidence",
      evidenceScore: clampScore(context.reviewerAuditScore),
      severity: severityFromConcern(100 - context.reviewerAuditScore + context.reviewerEvidenceItemCount * 4),
      evidenceQuestion: "Can reviewer rationale be represented without persistence?",
      evidenceFields: ["review state", "rationale summary", "board decision", "manual note"],
      blockedOutcome: "No review record write.",
    },
    {
      id: "OAP_EVIDENCE_002",
      label: "No-go evidence",
      lane: "reviewer-evidence",
      evidenceScore: 100,
      severity: "critical",
      evidenceQuestion: "Can no-go posture be proven?",
      evidenceFields: ["provider locked", "storage locked", "conversion locked", "zero activation"],
      blockedOutcome: "No activation.",
    },
    {
      id: "OAP_EVIDENCE_003",
      label: "Human signoff evidence design",
      lane: "reviewer-evidence",
      evidenceScore: clampScore(context.hardeningScore),
      severity: "elevated",
      evidenceQuestion: "Can human signoff be represented for later review?",
      evidenceFields: ["reviewer role", "board note", "manual decision"],
      blockedOutcome: "No signoff persistence.",
    },
  ];
}

function buildImmutableEvidenceDesign(context: Required<OperationalAuditInput>): ImmutableEvidenceItem[] {
  return [
    {
      id: "OAP_INTEGRITY_001",
      label: "Evidence fingerprint design",
      lane: "immutable-evidence",
      integrityScore: clampScore(context.evidenceIntegrityScore),
      priority: context.evidenceIntegrityScore < 70 ? "urgent" : "high",
      integrityQuestion: "Can evidence snapshots be fingerprinted later?",
      requiredEvidence: ["version label", "report id", "section list", "review note"],
      manualResolution: "Keep fingerprint design local only.",
    },
    {
      id: "OAP_INTEGRITY_002",
      label: "Export section integrity",
      lane: "immutable-evidence",
      integrityScore: clampScore(context.complianceScore),
      priority: "high",
      integrityQuestion: "Can export sections be tracked without storage?",
      requiredEvidence: ["section names", "redaction state", "no-go state"],
      manualResolution: "No immutable storage in V16.2.",
    },
    {
      id: "OAP_INTEGRITY_003",
      label: "Runtime lock integrity",
      lane: "immutable-evidence",
      integrityScore: 100,
      priority: "urgent",
      integrityQuestion: "Can runtime lock evidence be preserved conceptually?",
      requiredEvidence: ["provider lock", "storage lock", "conversion lock"],
      manualResolution: "Keep runtime locked and export design-only.",
    },
  ];
}

function buildRuntimeLockEvidence(): RuntimeLockEvidenceItem[] {
  return [
    {
      id: "OAP_LOCK_001",
      label: "Provider lock evidence",
      lane: "runtime-lock-evidence",
      lockScore: 100,
      severity: "critical",
      lockRule: "Provider runtime remains disabled.",
      blockedOutcome: "providerCallAllowed=false",
    },
    {
      id: "OAP_LOCK_002",
      label: "Storage lock evidence",
      lane: "runtime-lock-evidence",
      lockScore: 100,
      severity: "critical",
      lockRule: "Storage and migration remain disabled.",
      blockedOutcome: "storageActivationAllowed=false",
    },
    {
      id: "OAP_LOCK_003",
      label: "Work conversion lock evidence",
      lane: "runtime-lock-evidence",
      lockScore: 100,
      severity: "critical",
      lockRule: "Task, intervention and execution automation remain disabled.",
      blockedOutcome: "automaticExecutionAllowed=false",
    },
  ];
}

function buildExportNoGoBoard(): ExportNoGoItem[] {
  return [
    {
      id: "OAP_GONOGO_001",
      label: "Audit package design",
      lane: "human-signoff",
      goNoGoState: "audit-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["redaction board", "runtime lock evidence", "reviewer evidence"],
      safeOutcome: "Audit package design only.",
    },
    {
      id: "OAP_GONOGO_002",
      label: "Compliance export activation",
      lane: "export-no-go",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate export release", "board approval", "retention proof"],
      safeOutcome: "Export activation remains blocked.",
    },
    {
      id: "OAP_GONOGO_003",
      label: "Public audit publication",
      lane: "export-no-go",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate publication release", "privacy review", "legal review"],
      safeOutcome: "Public sharing remains blocked.",
    },
  ];
}

function buildAuditPackageGates(
  context: Required<OperationalAuditInput>,
  sourceNodes: OperationalAuditSourceNode[],
): OperationalAuditGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "OAP_GATE_001",
      label: "Audit package remains no-export",
      lane: "export-no-go" as OperationalAuditLane,
      score: 100,
      reviewer: "operational audit reviewer",
      requiredEvidence: ["complianceExportAllowed=false", "publicShareAllowed=false", "zeroActivationMode=true"],
      hardStop: "Do not activate compliance export in V16.2.",
    },
    {
      id: "OAP_GATE_002",
      label: "Audit trail package is complete enough",
      lane: "audit-trail" as OperationalAuditLane,
      score: context.reviewerAuditScore - context.auditTrailItemCount * 3,
      reviewer: context.auditLeadRole,
      requiredEvidence: ["runtime lock audit", "reviewer trail", "fallback trail"],
      hardStop: "Do not proceed without audit trail package.",
    },
    {
      id: "OAP_GATE_003",
      label: "Redaction board is complete enough",
      lane: "redaction-board" as OperationalAuditLane,
      score: context.redactionScore - context.redactionBoardItemCount * 3,
      reviewer: "redaction reviewer",
      requiredEvidence: ["field redaction", "payload redaction", "operational wording redaction"],
      hardStop: "Do not proceed without redaction board.",
    },
    {
      id: "OAP_GATE_004",
      label: "Evidence integrity is complete enough",
      lane: "immutable-evidence" as OperationalAuditLane,
      score: context.evidenceIntegrityScore - context.immutableEvidenceItemCount * 3,
      reviewer: "evidence integrity reviewer",
      requiredEvidence: ["fingerprint design", "section integrity", "runtime lock integrity"],
      hardStop: "Do not proceed without evidence integrity review.",
    },
    {
      id: "OAP_GATE_005",
      label: "Runtime lock evidence remains complete",
      lane: "runtime-lock-evidence" as OperationalAuditLane,
      score: 100,
      reviewer: "runtime lock reviewer",
      requiredEvidence: ["provider lock", "storage lock", "conversion lock"],
      hardStop: "Runtime locks must remain active.",
    },
    {
      id: "OAP_GATE_006",
      label: "Source blockers are within audit tolerance",
      lane: "human-signoff" as OperationalAuditLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before compliance-export-ready state.",
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

function buildAuditBoardPack(context: Required<OperationalAuditInput>): OperationalAuditBoardPackItem[] {
  return [
    {
      id: "OAP_PACK_001",
      label: "Audit trail packet",
      lane: "audit-trail",
      packReady: context.reviewerAuditScore >= 60,
      readinessScore: clampScore(context.reviewerAuditScore),
      reviewerCheck: "Confirm audit trail remains design-only and no-write.",
      includedSections: ["runtime lock audit", "reviewer trail", "fallback trail"],
      blockedSections: ["review persistence", "public share"],
    },
    {
      id: "OAP_PACK_002",
      label: "Compliance export packet",
      lane: "compliance-export",
      packReady: context.complianceScore >= 60 && context.redactionScore >= 60,
      readinessScore: clampScore((context.complianceScore + context.redactionScore) / 2),
      reviewerCheck: "Confirm export stays redacted and no-go.",
      includedSections: ["redaction board", "runtime locks", "no-go board"],
      blockedSections: ["activated export", "field identity", "private notes"],
    },
    {
      id: "OAP_PACK_003",
      label: "Evidence integrity packet",
      lane: "immutable-evidence",
      packReady: context.evidenceIntegrityScore >= 60,
      readinessScore: clampScore(context.evidenceIntegrityScore),
      reviewerCheck: "Confirm integrity design without immutable storage.",
      includedSections: ["fingerprint design", "section list", "runtime lock evidence"],
      blockedSections: ["storage write", "schema change"],
    },
  ];
}

function buildFindings(
  context: Required<OperationalAuditInput>,
  sourceNodes: OperationalAuditSourceNode[],
  gates: OperationalAuditGateItem[],
  goNoGo: ExportNoGoItem[],
): OperationalAuditFindingItem[] {
  const findings: OperationalAuditFindingItem[] = [];

  if (context.openAuditGapCount > 0) {
    findings.push({
      id: "OAP_FINDING_001",
      label: "Open audit package gaps",
      lane: "human-signoff",
      severity: context.openAuditGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openAuditGapCount} audit package gaps remain before later compliance export activation.`,
      manualResolution: "Resolve redaction, evidence integrity and reviewer evidence gaps in a later gated release.",
      blocksAuditExportActivation: true,
    });
  }

  if (context.redactionScore < 70) {
    findings.push({
      id: "OAP_FINDING_002",
      label: "Redaction board below threshold",
      lane: "redaction-board",
      severity: "critical",
      reason: "Redaction board is not mature enough for export activation.",
      manualResolution: "Complete redaction review before any later export release.",
      blocksAuditExportActivation: true,
    });
  }

  if (context.complianceScore < 70) {
    findings.push({
      id: "OAP_FINDING_003",
      label: "Compliance export below threshold",
      lane: "compliance-export",
      severity: "critical",
      reason: "Compliance export packet is not mature enough for activation.",
      manualResolution: "Complete export review and no-go board before activation.",
      blocksAuditExportActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `OAP_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksAuditExportActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `OAP_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Audit package gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksAuditExportActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `OAP_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksAuditExportActivation: true,
      });
    });

  return findings;
}

export function buildAiOperationalAuditPackageReport(
  input: OperationalAuditInput = {},
): OperationalAuditPackageReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const auditTrailPackage = buildAuditTrailPackage(context);
  const complianceExportPacket = buildComplianceExportPacket(context);
  const redactionBoard = buildRedactionBoard(context);
  const reviewerEvidencePack = buildReviewerEvidencePack(context);
  const immutableEvidenceDesign = buildImmutableEvidenceDesign(context);
  const runtimeLockEvidence = buildRuntimeLockEvidence();
  const exportNoGoBoard = buildExportNoGoBoard();
  const auditPackageGates = buildAuditPackageGates(context, sourceNodes);
  const auditBoardPack = buildAuditBoardPack(context);
  const auditFindings = buildFindings(context, sourceNodes, auditPackageGates, exportNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const auditAverage =
    auditTrailPackage.reduce((sum, item) => sum + item.auditScore, 0) /
    Math.max(1, auditTrailPackage.length);

  const redactionAverage =
    redactionBoard.reduce((sum, item) => sum + item.redactionScore, 0) /
    Math.max(1, redactionBoard.length);

  const gateAverage =
    auditPackageGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, auditPackageGates.length);

  const findingPenalty = auditFindings.filter((item) => item.blocksAuditExportActivation).length * 7;
  const exportPressure =
    complianceExportPacket.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, complianceExportPacket.length * 4);

  const auditPackageScore = clampScore(
    sourceAverage / 4 +
      auditAverage / 4 +
      redactionAverage / 4 +
      gateAverage / 4 +
      exportPressure -
      findingPenalty -
      context.openAuditGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openAuditGapCount * 8 +
        context.complianceExportItemCount * 6 +
        context.redactionBoardItemCount * 6 +
        context.immutableEvidenceItemCount * 5 +
        context.runtimeLockEvidenceItemCount * 5,
    ),
  );

  const auditPackageStatus = bandFromScore(
    auditPackageScore,
    auditFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: OPERATIONAL_AUDIT_GUARDRAIL,
    auditPackageScore,
    auditPackageStatus,
    overallSeverity,
    sourceNodes,
    auditTrailPackage,
    complianceExportPacket,
    redactionBoard,
    reviewerEvidencePack,
    immutableEvidenceDesign,
    runtimeLockEvidence,
    exportNoGoBoard,
    auditPackageGates,
    auditBoardPack,
    auditFindings,
    stagedRoadmap: {
      v162: "Operational audit package and compliance export hardening in zero-activation dry-run.",
      v163: "Human-supervised agronomic operations cockpit.",
      v164: "Staged provider runtime beta only after explicit activation approval.",
      v165: "Runtime incident response board after explicit activation approval.",
      v166: "Compliance export activation only after explicit approval.",
    },
    redactedExportBundle: {
      exportId: "operational_audit_package_v16_2_redacted_dry_run",
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
        "audit trail package",
        "compliance export packet",
        "redaction board",
        "reviewer evidence pack",
        "immutable evidence design",
        "runtime lock evidence",
        "export no-go board",
        "audit package gates",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Operational audit package is local dry-run only.",
      "No compliance export activation, provider call, storage activation, review storage, task creation, intervention creation or execution is performed.",
      "Runtime locks remain active and zero-activation mode remains true.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V16.2 prepares audit and compliance export governance only.",
    ],
  };
}

export const aiOperationalAuditPackageVersion = "V16.2";
