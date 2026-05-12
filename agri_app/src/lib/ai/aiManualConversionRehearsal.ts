export type ManualConversionRehearsalMode = "dry-run" | "conversion-board-review";

export type ManualConversionSeverity = "info" | "watch" | "elevated" | "critical";

export type ManualConversionPriority = "low" | "medium" | "high" | "urgent";

export type ManualConversionReadinessBand =
  | "blocked"
  | "preview-design-ready"
  | "manual-gate-review-ready"
  | "rehearsal-board-ready";

export type ManualConversionLane =
  | "conversion-preview"
  | "reviewer-checklist"
  | "conversion-blocker"
  | "work-package-draft"
  | "correction-path"
  | "non-execution-certificate"
  | "go-no-go"
  | "human-signoff";

export type ManualConversionDraftType =
  | "taskPreview"
  | "intervention-preview"
  | "follow-up-preview"
  | "archive-note-preview";

export interface ManualConversionRehearsalGuardrail {
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
  workPreviewReady: true;
  manualConversionRehearsalReady: true;
  noExecutionCertificateReady: true;
  correctionPathReady: true;
}

export interface ManualConversionRehearsalInput {
  previewItemCount?: number;
  checklistItemCount?: number;
  blockerItemCount?: number;
  workPackageDraftCount?: number;
  correctionPathItemCount?: number;
  noExecutionItemCount?: number;
  openConversionGapCount?: number;
  onlineReadinessScore?: number;
  storageRehearsalScore?: number;
  humanReviewWorkflowScore?: number;
  providerShadowScore?: number;
  reviewerChecklistScore?: number;
  workPreviewScore?: number;
  correctionPathScore?: number;
  conversionLeadRole?: string;
}

export interface ManualConversionSourceNode {
  id: string;
  lane: ManualConversionLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ManualConversionSeverity;
  priority: ManualConversionPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ConversionPreviewItem {
  id: string;
  label: string;
  lane: ManualConversionLane;
  draftType: ManualConversionDraftType;
  previewScore: number;
  severity: ManualConversionSeverity;
  previewPurpose: string;
  requiredBeforeRealUse: string[];
  blockedOutcome: string;
}

export interface ReviewerChecklistItem {
  id: string;
  label: string;
  lane: ManualConversionLane;
  checklistScore: number;
  priority: ManualConversionPriority;
  checklistQuestion: string;
  requiredEvidence: string[];
  reviewerAction: string;
}

export interface ConversionBlockerItem {
  id: string;
  label: string;
  lane: ManualConversionLane;
  blockerScore: number;
  severity: ManualConversionSeverity;
  blockerReason: string;
  manualResolution: string;
  blocksConversion: boolean;
}

export interface WorkPackageDraftItem {
  id: string;
  label: string;
  lane: ManualConversionLane;
  draftType: ManualConversionDraftType;
  draftScore: number;
  severity: ManualConversionSeverity;
  draftContent: string[];
  blockedOutcome: string;
}

export interface ConversionCorrectionPathItem {
  id: string;
  label: string;
  lane: ManualConversionLane;
  correctionScore: number;
  severity: ManualConversionSeverity;
  correctionQuestion: string;
  manualResolution: string;
}

export interface NonExecutionCertificateItem {
  id: string;
  label: string;
  lane: ManualConversionLane;
  certificateScore: number;
  severity: ManualConversionSeverity;
  certificateRule: string;
  blockedOutcome: string;
}

export interface ManualConversionGoNoGoItem {
  id: string;
  label: string;
  lane: ManualConversionLane;
  goNoGoState: "no-go" | "design-only" | "manual-preview-ready";
  score: number;
  severity: ManualConversionSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface ManualConversionGateItem {
  id: string;
  label: string;
  lane: ManualConversionLane;
  passed: boolean;
  score: number;
  severity: ManualConversionSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ManualConversionBoardPackItem {
  id: string;
  label: string;
  lane: ManualConversionLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ManualConversionRiskItem {
  id: string;
  label: string;
  lane: ManualConversionLane;
  severity: ManualConversionSeverity;
  reason: string;
  manualResolution: string;
  blocksManualConversionActivation: boolean;
}

export interface ManualConversionRehearsalReport {
  generatedAt: string;
  mode: ManualConversionRehearsalMode;
  context: Required<ManualConversionRehearsalInput>;
  readiness: ManualConversionRehearsalGuardrail;
  conversionRehearsalScore: number;
  conversionRehearsalStatus: ManualConversionReadinessBand;
  overallSeverity: ManualConversionSeverity;
  sourceNodes: ManualConversionSourceNode[];
  conversionPreviewPlan: ConversionPreviewItem[];
  reviewerChecklist: ReviewerChecklistItem[];
  conversionBlockers: ConversionBlockerItem[];
  workPackageDrafts: WorkPackageDraftItem[];
  correctionPathPlan: ConversionCorrectionPathItem[];
  nonExecutionCertificate: NonExecutionCertificateItem[];
  goNoGoBoard: ManualConversionGoNoGoItem[];
  conversionGates: ManualConversionGateItem[];
  conversionBoardPack: ManualConversionBoardPackItem[];
  conversionRiskRegister: ManualConversionRiskItem[];
  stagedRoadmap: {
    v156: string;
    v157: string;
    v158: string;
    v159: string;
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

export const MANUAL_CONVERSION_REHEARSAL_GUARDRAIL: ManualConversionRehearsalGuardrail = {
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
  workPreviewReady: true,
  manualConversionRehearsalReady: true,
  noExecutionCertificateReady: true,
  correctionPathReady: true,
};

const priorityWeight: Record<ManualConversionPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ManualConversionRehearsalInput): Required<ManualConversionRehearsalInput> {
  return {
    previewItemCount: input.previewItemCount ?? 7,
    checklistItemCount: input.checklistItemCount ?? 8,
    blockerItemCount: input.blockerItemCount ?? 7,
    workPackageDraftCount: input.workPackageDraftCount ?? 6,
    correctionPathItemCount: input.correctionPathItemCount ?? 6,
    noExecutionItemCount: input.noExecutionItemCount ?? 5,
    openConversionGapCount: input.openConversionGapCount ?? 8,
    onlineReadinessScore: input.onlineReadinessScore ?? 80,
    storageRehearsalScore: input.storageRehearsalScore ?? 70,
    humanReviewWorkflowScore: input.humanReviewWorkflowScore ?? 72,
    providerShadowScore: input.providerShadowScore ?? 70,
    reviewerChecklistScore: input.reviewerChecklistScore ?? 68,
    workPreviewScore: input.workPreviewScore ?? 62,
    correctionPathScore: input.correctionPathScore ?? 60,
    conversionLeadRole: input.conversionLeadRole ?? "manual conversion rehearsal reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ManualConversionSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ManualConversionSeverity): ManualConversionPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ManualConversionReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "rehearsal-board-ready";
  if (score >= 74) return "manual-gate-review-ready";
  return "preview-design-ready";
}

function buildSourceNode(
  id: string,
  lane: ManualConversionLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ManualConversionSourceNode {
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
            "Manual conversion rehearsal remains below safe preview threshold.",
            "Conversion board must resolve reviewer checklist, blockers, correction path and no-execution gates before later activation.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ManualConversionRehearsalInput>): ManualConversionSourceNode[] {
  const previewPressure = context.previewItemCount;
  const checklistPressure = context.checklistItemCount;
  const blockerPressure = context.blockerItemCount * 2;
  const draftPressure = context.workPackageDraftCount;
  const correctionPressure = context.correctionPathItemCount * 2;
  const gapPressure = context.openConversionGapCount * 2;

  return [
    buildSourceNode(
      "MCR_NODE_001",
      "conversion-preview",
      "Online readiness baseline",
      "V15.0",
      context.onlineReadinessScore,
      context.humanReviewWorkflowScore,
      previewPressure,
      "Keep online dry-run stable while designing conversion preview.",
    ),
    buildSourceNode(
      "MCR_NODE_002",
      "conversion-blocker",
      "Provider shadow boundary",
      "V15.4",
      context.providerShadowScore,
      context.humanReviewWorkflowScore,
      blockerPressure,
      "Ensure shadow output cannot become operational work.",
    ),
    buildSourceNode(
      "MCR_NODE_003",
      "reviewer-checklist",
      "Persistent review workflow baseline",
      "V15.3",
      context.humanReviewWorkflowScore,
      context.reviewerChecklistScore,
      checklistPressure,
      "Require reviewer checklist before any future conversion.",
    ),
    buildSourceNode(
      "MCR_NODE_004",
      "work-package-draft",
      "Storage rehearsal baseline",
      "V15.5",
      context.storageRehearsalScore,
      context.workPreviewScore,
      draftPressure,
      "Keep work package drafts non-persistent and non-executed.",
    ),
    buildSourceNode(
      "MCR_NODE_005",
      "correction-path",
      "Correction readiness",
      "V15.6",
      context.correctionPathScore,
      context.reviewerChecklistScore,
      correctionPressure,
      "Define correction path before later manual conversion activation.",
    ),
    buildSourceNode(
      "MCR_NODE_006",
      "non-execution-certificate",
      "No-execution certificate",
      "V15.6",
      100,
      context.humanReviewWorkflowScore,
      gapPressure,
      "Hard-stop every execution, product and dosage route.",
    ),
    buildSourceNode(
      "MCR_NODE_007",
      "go-no-go",
      "Conversion go/no-go",
      "V15.6",
      context.workPreviewScore,
      context.reviewerChecklistScore,
      gapPressure,
      "Keep real conversion no-go in this version.",
    ),
    buildSourceNode(
      "MCR_NODE_008",
      "human-signoff",
      "Human conversion signoff",
      "V15.6",
      context.humanReviewWorkflowScore,
      context.reviewerChecklistScore,
      gapPressure,
      "Keep activation blocked until human board signoff.",
    ),
  ];
}

function buildConversionPreviewPlan(context: Required<ManualConversionRehearsalInput>): ConversionPreviewItem[] {
  return [
    {
      id: "MCR_PREVIEW_001",
      label: "Manual task preview",
      lane: "conversion-preview",
      draftType: "taskPreview",
      previewScore: clampScore(context.workPreviewScore),
      severity: severityFromConcern(100 - context.workPreviewScore + context.previewItemCount * 4),
      previewPurpose: "Preview how an approved AI case might later become a manually created task.",
      requiredBeforeRealUse: ["persistent review", "case storage", "reviewer reason", "manual confirmation"],
      blockedOutcome: "No task creation in V15.6.",
    },
    {
      id: "MCR_PREVIEW_002",
      label: "Manual intervention preview",
      lane: "conversion-preview",
      draftType: "intervention-preview",
      previewScore: clampScore(context.workPreviewScore - context.openConversionGapCount),
      severity: "critical",
      previewPurpose: "Preview how an approved AI case might later become a manually created intervention.",
      requiredBeforeRealUse: ["persistent review", "case storage", "safety caveat", "manual confirmation"],
      blockedOutcome: "No intervention creation in V15.6.",
    },
    {
      id: "MCR_PREVIEW_003",
      label: "Follow-up preview",
      lane: "conversion-preview",
      draftType: "follow-up-preview",
      previewScore: clampScore(context.humanReviewWorkflowScore),
      severity: "elevated",
      previewPurpose: "Preview a non-operational follow-up note.",
      requiredBeforeRealUse: ["reviewer checklist", "reason requirement", "archive option"],
      blockedOutcome: "No scheduling or dispatch.",
    },
  ];
}

function buildReviewerChecklist(context: Required<ManualConversionRehearsalInput>): ReviewerChecklistItem[] {
  return [
    {
      id: "MCR_CHECK_001",
      label: "Evidence sufficiency checklist",
      lane: "reviewer-checklist",
      checklistScore: clampScore(context.reviewerChecklistScore),
      priority: context.reviewerChecklistScore < 75 ? "urgent" : "high",
      checklistQuestion: "Has the reviewer confirmed evidence sufficiency for preview only?",
      requiredEvidence: ["case summary", "evidence caveat", "review reason"],
      reviewerAction: "Hold conversion if evidence is insufficient.",
    },
    {
      id: "MCR_CHECK_002",
      label: "Safety and non-prescriptive checklist",
      lane: "reviewer-checklist",
      checklistScore: clampScore(context.reviewerChecklistScore - context.checklistItemCount),
      priority: "urgent",
      checklistQuestion: "Does the draft avoid product, dose, forecast and execution content?",
      requiredEvidence: ["no product content", "no dosage content", "no execution content"],
      reviewerAction: "Block preview if unsafe language is present.",
    },
    {
      id: "MCR_CHECK_003",
      label: "Manual confirmation checklist",
      lane: "reviewer-checklist",
      checklistScore: clampScore(context.humanReviewWorkflowScore - context.openConversionGapCount),
      priority: "high",
      checklistQuestion: "Would a future reviewer need explicit manual confirmation?",
      requiredEvidence: ["reviewer role", "confirmation step", "correction path"],
      reviewerAction: "Keep conversion no-go in V15.6.",
    },
  ];
}

function buildConversionBlockers(context: Required<ManualConversionRehearsalInput>): ConversionBlockerItem[] {
  return [
    {
      id: "MCR_BLOCKER_001",
      label: "No persistent review record",
      lane: "conversion-blocker",
      blockerScore: 100,
      severity: "critical",
      blockerReason: "Review persistence remains disabled.",
      manualResolution: "Activate persistent review only in later gated phase.",
      blocksConversion: true,
    },
    {
      id: "MCR_BLOCKER_002",
      label: "No case storage",
      lane: "conversion-blocker",
      blockerScore: 100,
      severity: "critical",
      blockerReason: "Case persistence remains disabled.",
      manualResolution: "Complete storage gate and migration rehearsal before conversion activation.",
      blocksConversion: true,
    },
    {
      id: "MCR_BLOCKER_003",
      label: "No execution route",
      lane: "conversion-blocker",
      blockerScore: 100,
      severity: "critical",
      blockerReason: "Execution, product guidance and dosage guidance are forbidden.",
      manualResolution: "Keep non-execution certificate active.",
      blocksConversion: true,
    },
    {
      id: "MCR_BLOCKER_004",
      label: "Correction path below threshold",
      lane: "conversion-blocker",
      blockerScore: clampScore(100 - context.correctionPathScore),
      severity: severityFromConcern(100 - context.correctionPathScore + context.openConversionGapCount * 4),
      blockerReason: "Correction path is not mature enough for real conversion.",
      manualResolution: "Complete correction path rehearsal before later activation.",
      blocksConversion: true,
    },
  ];
}

function buildWorkPackageDrafts(context: Required<ManualConversionRehearsalInput>): WorkPackageDraftItem[] {
  return [
    {
      id: "MCR_WORK_001",
      label: "Task work package draft",
      lane: "work-package-draft",
      draftType: "taskPreview",
      draftScore: clampScore(context.workPreviewScore),
      severity: "elevated",
      draftContent: ["task title placeholder", "evidence caveat", "manual reviewer note", "no dispatch"],
      blockedOutcome: "No task is created.",
    },
    {
      id: "MCR_WORK_002",
      label: "Intervention work package draft",
      lane: "work-package-draft",
      draftType: "intervention-preview",
      draftScore: clampScore(context.workPreviewScore - context.workPackageDraftCount),
      severity: "critical",
      draftContent: ["intervention context placeholder", "safety caveat", "manual reviewer note", "no execution"],
      blockedOutcome: "No intervention is created.",
    },
    {
      id: "MCR_WORK_003",
      label: "Archive note draft",
      lane: "work-package-draft",
      draftType: "archive-note-preview",
      draftScore: clampScore(context.humanReviewWorkflowScore),
      severity: "watch",
      draftContent: ["archive rationale", "reviewer caveat", "future correction note"],
      blockedOutcome: "No archive persistence.",
    },
  ];
}

function buildCorrectionPathPlan(context: Required<ManualConversionRehearsalInput>): ConversionCorrectionPathItem[] {
  return [
    {
      id: "MCR_CORRECTION_001",
      label: "Preview correction path",
      lane: "correction-path",
      correctionScore: clampScore(context.correctionPathScore),
      severity: severityFromConcern(100 - context.correctionPathScore + context.correctionPathItemCount * 4),
      correctionQuestion: "Can a reviewer correct a preview before real conversion exists?",
      manualResolution: "Require correction reason, reviewer note and board hold.",
    },
    {
      id: "MCR_CORRECTION_002",
      label: "Future work correction path",
      lane: "correction-path",
      correctionScore: clampScore(context.correctionPathScore - context.openConversionGapCount),
      severity: "critical",
      correctionQuestion: "How would a future manual work item be corrected?",
      manualResolution: "Require linked AI case, review event and correction reason before activation.",
    },
    {
      id: "MCR_CORRECTION_003",
      label: "Reject and archive path",
      lane: "correction-path",
      correctionScore: clampScore(context.humanReviewWorkflowScore - context.correctionPathItemCount),
      severity: "elevated",
      correctionQuestion: "Can unsafe previews be rejected and archived?",
      manualResolution: "Keep reject/archive flow as dry-run design.",
    },
  ];
}

function buildNonExecutionCertificate(): NonExecutionCertificateItem[] {
  return [
    {
      id: "MCR_NOEXEC_001",
      label: "No automatic task creation",
      lane: "non-execution-certificate",
      certificateScore: 100,
      severity: "critical",
      certificateRule: "AI preview cannot create tasks.",
      blockedOutcome: "taskCreated=false",
    },
    {
      id: "MCR_NOEXEC_002",
      label: "No automatic intervention creation",
      lane: "non-execution-certificate",
      certificateScore: 100,
      severity: "critical",
      certificateRule: "AI preview cannot create interventions.",
      blockedOutcome: "interventionCreated=false",
    },
    {
      id: "MCR_NOEXEC_003",
      label: "No execution or prescriptive guidance",
      lane: "non-execution-certificate",
      certificateScore: 100,
      severity: "critical",
      certificateRule: "AI preview cannot execute, prescribe product, suggest dosage or forecast production.",
      blockedOutcome: "automaticExecutionPerformed=false",
    },
  ];
}

function buildGoNoGoBoard(context: Required<ManualConversionRehearsalInput>): ManualConversionGoNoGoItem[] {
  return [
    {
      id: "MCR_GONOGO_001",
      label: "Manual conversion preview design",
      lane: "go-no-go",
      goNoGoState: "design-only",
      score: clampScore(context.workPreviewScore),
      severity: "watch",
      requiredBeforeGo: ["review checklist", "work preview", "correction path", "non-execution certificate"],
      safeOutcome: "Design only in V15.6.",
    },
    {
      id: "MCR_GONOGO_002",
      label: "Real task or intervention creation",
      lane: "go-no-go",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["persistent review", "case storage", "manual conversion rehearsal", "role controls"],
      safeOutcome: "Blocked in V15.6.",
    },
    {
      id: "MCR_GONOGO_003",
      label: "Operational execution",
      lane: "go-no-go",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["human approval", "manual dispatch", "separate operational release"],
      safeOutcome: "Blocked in V15.6 and not part of AI preview.",
    },
  ];
}

function buildConversionGates(
  context: Required<ManualConversionRehearsalInput>,
  sourceNodes: ManualConversionSourceNode[],
): ManualConversionGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "MCR_GATE_001",
      label: "Conversion rehearsal remains no-creation",
      lane: "non-execution-certificate" as ManualConversionLane,
      score: 100,
      reviewer: "manual conversion reviewer",
      requiredEvidence: ["non-execution certificate", "guardrails", "work drafts"],
      hardStop: "Do not create tasks or interventions in V15.6.",
    },
    {
      id: "MCR_GATE_002",
      label: "Reviewer checklist is complete enough",
      lane: "reviewer-checklist" as ManualConversionLane,
      score: context.reviewerChecklistScore - context.checklistItemCount * 3,
      reviewer: context.conversionLeadRole,
      requiredEvidence: ["evidence checklist", "safety checklist", "manual confirmation checklist"],
      hardStop: "Do not activate conversion without reviewer checklist.",
    },
    {
      id: "MCR_GATE_003",
      label: "Work package preview is complete enough",
      lane: "work-package-draft" as ManualConversionLane,
      score: context.workPreviewScore - context.workPackageDraftCount * 3,
      reviewer: "work preview reviewer",
      requiredEvidence: ["task preview", "intervention preview", "archive note preview"],
      hardStop: "Do not activate conversion without work preview.",
    },
    {
      id: "MCR_GATE_004",
      label: "Correction path is complete enough",
      lane: "correction-path" as ManualConversionLane,
      score: context.correctionPathScore - context.correctionPathItemCount * 3,
      reviewer: "correction reviewer",
      requiredEvidence: ["preview correction", "future work correction", "reject/archive path"],
      hardStop: "Do not activate conversion without correction path.",
    },
    {
      id: "MCR_GATE_005",
      label: "Conversion blockers remain active",
      lane: "conversion-blocker" as ManualConversionLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["no persistent review", "no case storage", "no execution route"],
      hardStop: "Keep conversion blocked in V15.6.",
    },
    {
      id: "MCR_GATE_006",
      label: "Source blockers are within conversion preview tolerance",
      lane: "human-signoff" as ManualConversionLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before rehearsal-board-ready state.",
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

function buildBoardPack(context: Required<ManualConversionRehearsalInput>): ManualConversionBoardPackItem[] {
  return [
    {
      id: "MCR_PACK_001",
      label: "Conversion preview packet",
      lane: "conversion-preview",
      packReady: context.workPreviewScore >= 55,
      readinessScore: clampScore(context.workPreviewScore),
      reviewerCheck: "Confirm previews remain no-create and no-execute.",
      includedSections: ["task preview", "intervention preview", "follow-up preview"],
      blockedSections: ["task creation", "intervention creation", "dispatch"],
    },
    {
      id: "MCR_PACK_002",
      label: "Reviewer checklist packet",
      lane: "reviewer-checklist",
      packReady: context.reviewerChecklistScore >= 60,
      readinessScore: clampScore(context.reviewerChecklistScore),
      reviewerCheck: "Confirm checklist blocks unsafe conversion.",
      includedSections: ["evidence checklist", "safety checklist", "manual confirmation"],
      blockedSections: ["anonymous approval", "automatic approval"],
    },
    {
      id: "MCR_PACK_003",
      label: "Correction and no-execution packet",
      lane: "non-execution-certificate",
      packReady: true,
      readinessScore: clampScore((context.correctionPathScore + 100) / 2),
      reviewerCheck: "Confirm correction path and non-execution certificate stay active.",
      includedSections: ["correction path", "blockers", "non-execution certificate"],
      blockedSections: ["product guidance", "dosage guidance", "automatic execution"],
    },
  ];
}

function buildRiskRegister(
  context: Required<ManualConversionRehearsalInput>,
  sourceNodes: ManualConversionSourceNode[],
  gates: ManualConversionGateItem[],
  blockers: ConversionBlockerItem[],
  goNoGo: ManualConversionGoNoGoItem[],
): ManualConversionRiskItem[] {
  const risks: ManualConversionRiskItem[] = [];

  if (context.openConversionGapCount > 0) {
    risks.push({
      id: "MCR_RISK_001",
      label: "Open conversion gaps",
      lane: "go-no-go",
      severity: context.openConversionGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openConversionGapCount} conversion gaps remain before later activation.`,
      manualResolution: "Resolve through later manual conversion rehearsal and role-control work.",
      blocksManualConversionActivation: true,
    });
  }

  if (context.workPreviewScore < 70) {
    risks.push({
      id: "MCR_RISK_002",
      label: "Work preview below threshold",
      lane: "work-package-draft",
      severity: "critical",
      reason: "Work package preview is not mature enough for activation.",
      manualResolution: "Complete preview structure, reviewer checklist and correction path.",
      blocksManualConversionActivation: true,
    });
  }

  blockers
    .filter((item) => item.blocksConversion)
    .forEach((item, index) => {
      risks.push({
        id: `MCR_BLOCKER_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.blockerReason,
        manualResolution: item.manualResolution,
        blocksManualConversionActivation: true,
      });
    });

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `MCR_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksManualConversionActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `MCR_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Manual conversion gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksManualConversionActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      risks.push({
        id: `MCR_GONOGO_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksManualConversionActivation: true,
      });
    });

  return risks;
}

export function buildAiManualConversionRehearsalReport(
  input: ManualConversionRehearsalInput = {},
): ManualConversionRehearsalReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const conversionPreviewPlan = buildConversionPreviewPlan(context);
  const reviewerChecklist = buildReviewerChecklist(context);
  const conversionBlockers = buildConversionBlockers(context);
  const workPackageDrafts = buildWorkPackageDrafts(context);
  const correctionPathPlan = buildCorrectionPathPlan(context);
  const nonExecutionCertificate = buildNonExecutionCertificate();
  const goNoGoBoard = buildGoNoGoBoard(context);
  const conversionGates = buildConversionGates(context, sourceNodes);
  const conversionBoardPack = buildBoardPack(context);
  const conversionRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    conversionGates,
    conversionBlockers,
    goNoGoBoard,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const previewAverage =
    conversionPreviewPlan.reduce((sum, item) => sum + item.previewScore, 0) /
    Math.max(1, conversionPreviewPlan.length);

  const checklistAverage =
    reviewerChecklist.reduce((sum, item) => sum + item.checklistScore, 0) /
    Math.max(1, reviewerChecklist.length);

  const gateAverage =
    conversionGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, conversionGates.length);

  const riskPenalty = conversionRiskRegister.filter((item) => item.blocksManualConversionActivation).length * 7;
  const checklistPressure =
    reviewerChecklist.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, reviewerChecklist.length * 4);

  const conversionRehearsalScore = clampScore(
    sourceAverage / 4 +
      previewAverage / 4 +
      checklistAverage / 4 +
      gateAverage / 4 +
      checklistPressure -
      riskPenalty -
      context.openConversionGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openConversionGapCount * 8 +
        context.checklistItemCount * 5 +
        context.blockerItemCount * 6 +
        context.workPackageDraftCount * 5 +
        context.correctionPathItemCount * 6,
    ),
  );

  const conversionRehearsalStatus = bandFromScore(
    conversionRehearsalScore,
    conversionRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: MANUAL_CONVERSION_REHEARSAL_GUARDRAIL,
    conversionRehearsalScore,
    conversionRehearsalStatus,
    overallSeverity,
    sourceNodes,
    conversionPreviewPlan,
    reviewerChecklist,
    conversionBlockers,
    workPackageDrafts,
    correctionPathPlan,
    nonExecutionCertificate,
    goNoGoBoard,
    conversionGates,
    conversionBoardPack,
    conversionRiskRegister,
    stagedRoadmap: {
      v156: "Manual conversion rehearsal and no-execution work preview only.",
      v157: "Provider staging activation gate with no production runtime.",
      v158: "Storage rehearsal board with no live migration execution.",
      v159: "Controlled beta readiness board with all operational gates still manual.",
      v160: "Controlled production beta only after provider, storage, review and conversion gates pass.",
    },
    redactedExportBundle: {
      exportId: "manual_conversion_rehearsal_v15_6_redacted_dry_run",
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
        "conversion preview plan",
        "reviewer checklist",
        "conversion blockers",
        "work package drafts",
        "correction path plan",
        "non-execution certificate",
        "go/no-go board",
        "conversion gates",
        "board pack",
        "risk register",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Manual conversion rehearsal is local dry-run only.",
      "No task, intervention, review record, case storage, memory write, provider call or execution is performed.",
      "Manual conversion is designed but remains blocked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V15.6 prepares no-execution work preview only.",
    ],
  };
}

export const aiManualConversionRehearsalVersion = "V15.6";
