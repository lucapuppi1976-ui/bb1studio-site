export type TesterProvisioningMode = "dry-run" | "tester-provisioning-adapter-readiness";
export type TesterProvisioningSeverity = "info" | "watch" | "elevated" | "critical";
export type TesterProvisioningPriority = "low" | "medium" | "high" | "urgent";
export type TesterProvisioningStatus =
  | "blocked"
  | "adapter-design-ready"
  | "manual-creation-review-ready"
  | "provisioning-adapter-ready";

export type TesterProvisioningLane =
  | "adapter_contract"
  | "schema_mapping_draft"
  | "manual_creation_rehearsal"
  | "role_language_assignment"
  | "admin_checklist"
  | "no_write_verification"
  | "no_go_board"
  | "human_signoff";

export interface TesterProvisioningInput {
  adapterContractScore?: number;
  schemaMappingScore?: number;
  manualCreationScore?: number;
  roleLanguageScore?: number;
  adminChecklistScore?: number;
  noWriteVerificationScore?: number;
  targetTesterCount?: number;
  rehearsalTesterCount?: number;
  openCriticalProvisioningIssueCount?: number;
  openMajorProvisioningIssueCount?: number;
  unresolvedAdapterFindingCount?: number;
  reviewerRole?: string;
}

export interface TesterProvisioningBoardItem {
  id: string;
  label: string;
  lane: TesterProvisioningLane;
  score: number;
  priority: TesterProvisioningPriority;
  severity: TesterProvisioningSeverity;
  question: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterProvisioningFindingItem {
  id: string;
  label: string;
  lane: TesterProvisioningLane;
  severity: TesterProvisioningSeverity;
  reason: string;
  manualResolution: string;
  blocksProvisioningAdapter: boolean;
}

export const TESTER_PROVISIONING_ADAPTER_GUARDRAIL = {
  testerProvisioningAdapterReady: true,
  inviteOnlyProvisioningContractReady: true,
  schemaMappingDraftReady: true,
  manualCreationRehearsalReady: true,
  roleLanguageAssignmentReady: true,
  adminChecklistReady: true,
  noWriteVerificationReady: true,
  authUserSchemaReadinessReady: true,
  testerAccountActivationGateReady: true,
  liveUatLaunchGateReady: true,
  liveUatReady: true,
  onlineControlledGo: true,
  controlledDryRunProductionReady: true,
  publicSignupAllowed: false,
  publicSignupPerformed: false,
  accountWriteAllowed: false,
  accountWritePerformed: false,
  testerAccountCreateAllowed: false,
  testerAccountCreatePerformed: false,
  testerInviteSendAllowed: false,
  testerInviteSendPerformed: false,
  testerInvitePersistenceAllowed: false,
  testerInvitePersistencePerformed: false,
  testerRoleWriteAllowed: false,
  testerRoleWritePerformed: false,
  testerLanguageWriteAllowed: false,
  testerLanguageWritePerformed: false,
  testerAccessRevocationAllowed: false,
  testerAccessRevocationPerformed: false,
  userSchemaWriteAllowed: false,
  userSchemaWritePerformed: false,
  authConfigWriteAllowed: false,
  authConfigWritePerformed: false,
  adapterWriteAllowed: false,
  adapterWritePerformed: false,
  provisioningRehearsalWriteAllowed: false,
  provisioningRehearsalWritePerformed: false,
  feedbackWriteAllowed: false,
  feedbackWritePerformed: false,
  bugWriteAllowed: false,
  bugWritePerformed: false,
  evidenceWriteAllowed: false,
  evidenceWritePerformed: false,
  sessionWriteAllowed: false,
  sessionWritePerformed: false,
  providerAiReady: false,
  providerCalled: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  providerRequestDispatchAllowed: false,
  providerResponseIntakeAllowed: false,
  providerResultPersistenceAllowed: false,
  persistenceReady: false,
  memoryPersistenceReady: false,
  persistencePerformed: false,
  memoryPersistencePerformed: false,
  dbPersistenceAllowed: false,
  memoryPersistenceAllowed: false,
  taskCreated: false,
  interventionCreated: false,
  automaticExecutionPerformed: false,
  automaticTaskCreationAllowed: false,
  automaticInterventionCreationAllowed: false,
  automaticExecutionAllowed: false,
  publicShareAllowed: false,
  publicSharePerformed: false,
  productPrescriptionAllowed: false,
  productPrescriptionPerformed: false,
  dosageAdviceAllowed: false,
  dosageAdvicePerformed: false,
  incidentRecordPersistenceAllowed: false,
  incidentRecordWriteAllowed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  operationalExecutionAllowed: false,
  operationalExecutionPerformed: false,
  executionCommandAllowed: false,
  executionCommandPerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  storageActivationAllowed: false,
  storageActivationPerformed: false,
  manualDispatchOnly: true,
  humanReviewRequired: true,
  localAnalysisOnly: true,
  redactedOutputOnly: true,
  localMemoryOnly: true,
  localLearningOnly: true,
  localPromotionOnly: true,
  localQualityOnly: true,
} as const;

export interface TesterProvisioningReport {
  generatedAt: string;
  mode: TesterProvisioningMode;
  context: Required<TesterProvisioningInput>;
  readiness: typeof TESTER_PROVISIONING_ADAPTER_GUARDRAIL;
  provisioningAdapterScore: number;
  provisioningAdapterStatus: TesterProvisioningStatus;
  overallSeverity: TesterProvisioningSeverity;
  adapterContractBoard: TesterProvisioningBoardItem[];
  schemaMappingDraftBoard: TesterProvisioningBoardItem[];
  manualCreationRehearsalBoard: TesterProvisioningBoardItem[];
  roleLanguageAssignmentBoard: TesterProvisioningBoardItem[];
  adminChecklistBoard: TesterProvisioningBoardItem[];
  noWriteVerificationBoard: TesterProvisioningBoardItem[];
  noGoBoard: TesterProvisioningBoardItem[];
  findings: TesterProvisioningFindingItem[];
  stagedRoadmap: Record<"v192" | "v193" | "v194" | "v195" | "v196", string>;
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

function normalizeInput(input: TesterProvisioningInput): Required<TesterProvisioningInput> {
  return {
    adapterContractScore: input.adapterContractScore ?? 84,
    schemaMappingScore: input.schemaMappingScore ?? 82,
    manualCreationScore: input.manualCreationScore ?? 80,
    roleLanguageScore: input.roleLanguageScore ?? 88,
    adminChecklistScore: input.adminChecklistScore ?? 84,
    noWriteVerificationScore: input.noWriteVerificationScore ?? 100,
    targetTesterCount: input.targetTesterCount ?? 3,
    rehearsalTesterCount: input.rehearsalTesterCount ?? 0,
    openCriticalProvisioningIssueCount: input.openCriticalProvisioningIssueCount ?? 0,
    openMajorProvisioningIssueCount: input.openMajorProvisioningIssueCount ?? 1,
    unresolvedAdapterFindingCount: input.unresolvedAdapterFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "tester provisioning adapter reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterProvisioningSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): TesterProvisioningPriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: TesterProvisioningLane,
  score: number,
  question: string,
  expectedEvidence: string[],
  safeOutcome: string,
): TesterProvisioningBoardItem {
  const normalized = clampScore(score);

  return {
    id,
    label,
    lane,
    score: normalized,
    priority: priorityFromScore(normalized),
    severity: severityFromConcern(100 - normalized),
    question,
    expectedEvidence,
    safeOutcome,
  };
}

export function buildAiTesterProvisioningAdapterReport(
  input: TesterProvisioningInput = {},
): TesterProvisioningReport {
  const context = normalizeInput(input);
  const rehearsalRatio = context.targetTesterCount > 0 ? context.rehearsalTesterCount / context.targetTesterCount : 0;
  const rehearsalCoverageScore = clampScore(rehearsalRatio * 100);

  const adapterContractBoard = [
    boardItem(
      "TPA_CONTRACT_001",
      "Invite-only provisioning adapter contract",
      "adapter_contract",
      context.adapterContractScore,
      "Can a future adapter describe tester creation without writing now?",
      ["input shape", "role mapping", "language mapping", "reviewer approval"],
      "Adapter contract is reviewable without account writes.",
    ),
    boardItem(
      "TPA_CONTRACT_002",
      "No public signup contract",
      "adapter_contract",
      100,
      "Does adapter contract keep public signup closed?",
      ["publicSignupAllowed=false", "accountWriteAllowed=false"],
      "Public registration remains closed.",
    ),
  ];

  const schemaMappingDraftBoard = [
    boardItem(
      "TPA_SCHEMA_001",
      "User schema mapping draft",
      "schema_mapping_draft",
      context.schemaMappingScore,
      "Can the tester fields be mapped without schema change?",
      ["email", "display label", "role", "language", "state"],
      "Schema mapping remains draft-only.",
    ),
    boardItem(
      "TPA_SCHEMA_002",
      "No schema change rule",
      "schema_mapping_draft",
      100,
      "Can schema and migrations remain untouched in V19.2?",
      ["schemaWriteAllowed=false", "migrationExecutionAllowed=false"],
      "No schema or migration change is performed.",
    ),
  ];

  const manualCreationRehearsalBoard = [
    boardItem(
      "TPA_REHEARSAL_001",
      "Manual creation rehearsal",
      "manual_creation_rehearsal",
      rehearsalCoverageScore,
      "Can admin rehearse tester setup without creating accounts?",
      ["target tester count", "rehearsal count", "manual owner"],
      "Manual creation remains rehearsal-only.",
    ),
    boardItem(
      "TPA_REHEARSAL_002",
      "No account creation rehearsal rule",
      "manual_creation_rehearsal",
      100,
      "Does rehearsal avoid any account write?",
      ["testerAccountCreateAllowed=false", "testerAccountCreatePerformed=false"],
      "No tester account is created.",
    ),
  ];

  const roleLanguageAssignmentBoard = [
    boardItem(
      "TPA_ROLE_LANG_001",
      "Role and language assignment",
      "role_language_assignment",
      context.roleLanguageScore,
      "Can role and language be selected before future activation?",
      ["uat_reviewer", "uat_operator", "uat_observer", "it/en/es/fr/de/pt"],
      "Role and language assignment is ready for review.",
    ),
  ];

  const adminChecklistBoard = [
    boardItem(
      "TPA_ADMIN_001",
      "Admin provisioning checklist",
      "admin_checklist",
      context.adminChecklistScore,
      "Can admin follow a clear checklist in a future write release?",
      ["reviewer approval", "role", "language", "revocation note"],
      "Admin checklist is ready for review.",
    ),
  ];

  const noWriteVerificationBoard = [
    boardItem(
      "TPA_NOWRITE_001",
      "No-write verification",
      "no_write_verification",
      context.noWriteVerificationScore,
      "Can every write path remain blocked in V19.2?",
      ["accountWriteAllowed=false", "adapterWriteAllowed=false", "dbPersistenceAllowed=false"],
      "No write path is enabled.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TPA_NOGO_001",
      "Real account creation",
      "no_go_board",
      0,
      "Can real tester accounts be created in V19.2?",
      ["separate release required", "manual approval required"],
      "No-go: real account creation remains blocked.",
    ),
    boardItem(
      "TPA_NOGO_002",
      "Real invite send",
      "no_go_board",
      0,
      "Can real invites be sent in V19.2?",
      ["separate release required"],
      "No-go: invite sending remains blocked.",
    ),
    boardItem(
      "TPA_NOGO_003",
      "Schema migration",
      "no_go_board",
      0,
      "Can schema migration run in V19.2?",
      ["separate release required"],
      "No-go: schema and migrations remain untouched.",
    ),
  ];

  const findings: TesterProvisioningFindingItem[] = [];

  if (context.openCriticalProvisioningIssueCount > 0) {
    findings.push({
      id: "TPA_FINDING_001",
      label: "Open critical provisioning issue",
      lane: "adapter_contract",
      severity: "critical",
      reason: String(context.openCriticalProvisioningIssueCount) + " critical provisioning issues remain open.",
      manualResolution: "Resolve critical provisioning issues before real account creation.",
      blocksProvisioningAdapter: true,
    });
  }

  if (context.unresolvedAdapterFindingCount > 0) {
    findings.push({
      id: "TPA_FINDING_002",
      label: "Unresolved adapter finding",
      lane: "adapter_contract",
      severity: "critical",
      reason: String(context.unresolvedAdapterFindingCount) + " adapter findings remain unresolved.",
      manualResolution: "Close adapter findings before any account write path.",
      blocksProvisioningAdapter: true,
    });
  }

  if (context.rehearsalTesterCount < context.targetTesterCount) {
    findings.push({
      id: "TPA_FINDING_003",
      label: "Rehearsal tester coverage incomplete",
      lane: "manual_creation_rehearsal",
      severity: "watch",
      reason: "Rehearsal tester count is below target tester count.",
      manualResolution: "Complete rehearsal coverage before real tester account creation.",
      blocksProvisioningAdapter: false,
    });
  }

  if (context.openMajorProvisioningIssueCount > 0) {
    findings.push({
      id: "TPA_FINDING_004",
      label: "Open major provisioning issue",
      lane: "admin_checklist",
      severity: "watch",
      reason: String(context.openMajorProvisioningIssueCount) + " major provisioning issues remain open.",
      manualResolution: "Track and review before account activation.",
      blocksProvisioningAdapter: false,
    });
  }

  const provisioningAdapterScore = clampScore(
    (context.adapterContractScore +
      context.schemaMappingScore +
      context.manualCreationScore +
      context.roleLanguageScore +
      context.adminChecklistScore +
      context.noWriteVerificationScore +
      rehearsalCoverageScore) /
      7 -
      findings.filter((item) => item.blocksProvisioningAdapter).length * 20,
  );

  const provisioningAdapterStatus: TesterProvisioningStatus =
    findings.some((item) => item.blocksProvisioningAdapter)
      ? "blocked"
      : provisioningAdapterScore >= 88
        ? "provisioning-adapter-ready"
        : provisioningAdapterScore >= 80
          ? "manual-creation-review-ready"
          : "adapter-design-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: TESTER_PROVISIONING_ADAPTER_GUARDRAIL,
    provisioningAdapterScore,
    provisioningAdapterStatus,
    overallSeverity: severityFromConcern(
      context.openCriticalProvisioningIssueCount * 40 +
        context.openMajorProvisioningIssueCount * 20 +
        context.unresolvedAdapterFindingCount * 45 +
        Math.max(0, context.targetTesterCount - context.rehearsalTesterCount) * 10,
    ),
    adapterContractBoard,
    schemaMappingDraftBoard,
    manualCreationRehearsalBoard,
    roleLanguageAssignmentBoard,
    adminChecklistBoard,
    noWriteVerificationBoard,
    noGoBoard,
    findings,
    stagedRoadmap: {
      v192: "Invite-only tester provisioning adapter contract and dry-run creation rehearsal.",
      v193: "Actual invite-only tester account creation only after final account write approval.",
      v194: "Controlled UAT feedback persistence after explicit persistence approval.",
      v195: "Provider runtime activation only after provider approval and rollback proof.",
      v196: "Operational execution activation only after human approval and emergency stop proof.",
    },
    redactedExportBundle: {
      exportId: "tester_provisioning_adapter_v19_2_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "adapter contract",
        "schema mapping draft",
        "manual creation rehearsal",
        "role language assignment",
        "admin checklist",
        "no-write verification",
        "no-go board",
        "findings",
        "safety summary",
      ],
    },
    safetySummary: [
      "Tester provisioning adapter is dry-run only.",
      "No real account creation, invite sending, role write, language write, access revocation, schema write or migration execution is performed.",
      "No public signup, provider call, AI persistence, feedback persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V19.2 prepares the provisioning adapter without expanding activation scope.",
    ],
  };
}

export const aiTesterProvisioningAdapterVersion = "V19.2";
