export type TesterActivationMode = "dry-run" | "tester-account-activation-readiness";
export type TesterActivationSeverity = "info" | "watch" | "elevated" | "critical";
export type TesterActivationPriority = "low" | "medium" | "high" | "urgent";
export type TesterActivationStatus =
  | "blocked"
  | "activation-design-ready"
  | "manual-provisioning-review-ready"
  | "invite-only-activation-ready";

export type TesterActivationLane =
  | "activation_approval"
  | "role_assignment"
  | "language_assignment"
  | "manual_provisioning"
  | "access_boundary"
  | "revocation_readiness"
  | "no_go_board"
  | "human_signoff";

export interface TesterActivationInput {
  targetTesterCount?: number;
  approvedTesterCount?: number;
  roleAssignmentScore?: number;
  languageAssignmentScore?: number;
  manualProvisioningScore?: number;
  accessBoundaryScore?: number;
  revocationReadinessScore?: number;
  openCriticalAccessIssueCount?: number;
  openMajorAccessIssueCount?: number;
  unresolvedActivationFindingCount?: number;
  reviewerRole?: string;
}

export interface TesterActivationBoardItem {
  id: string;
  label: string;
  lane: TesterActivationLane;
  score: number;
  priority: TesterActivationPriority;
  severity: TesterActivationSeverity;
  question: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterActivationFindingItem {
  id: string;
  label: string;
  lane: TesterActivationLane;
  severity: TesterActivationSeverity;
  reason: string;
  manualResolution: string;
  blocksTesterActivation: boolean;
}

export const TESTER_ACCOUNT_ACTIVATION_GUARDRAIL = {
  testerAccountActivationGateReady: true,
  inviteOnlyActivationReady: true,
  manualProvisioningReadinessReady: true,
  activationApprovalEvidenceReady: true,
  roleAssignmentReadinessReady: true,
  languageAssignmentReadinessReady: true,
  revocationReadinessReady: true,
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

export interface TesterActivationReport {
  generatedAt: string;
  mode: TesterActivationMode;
  context: Required<TesterActivationInput>;
  readiness: typeof TESTER_ACCOUNT_ACTIVATION_GUARDRAIL;
  activationReadinessScore: number;
  activationReadinessStatus: TesterActivationStatus;
  overallSeverity: TesterActivationSeverity;
  activationApprovalBoard: TesterActivationBoardItem[];
  roleAssignmentBoard: TesterActivationBoardItem[];
  languageAssignmentBoard: TesterActivationBoardItem[];
  manualProvisioningBoard: TesterActivationBoardItem[];
  accessBoundaryBoard: TesterActivationBoardItem[];
  revocationReadinessBoard: TesterActivationBoardItem[];
  noGoBoard: TesterActivationBoardItem[];
  findings: TesterActivationFindingItem[];
  stagedRoadmap: Record<"v190" | "v191" | "v192" | "v193" | "v194", string>;
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

function normalizeInput(input: TesterActivationInput): Required<TesterActivationInput> {
  return {
    targetTesterCount: input.targetTesterCount ?? 3,
    approvedTesterCount: input.approvedTesterCount ?? 0,
    roleAssignmentScore: input.roleAssignmentScore ?? 86,
    languageAssignmentScore: input.languageAssignmentScore ?? 88,
    manualProvisioningScore: input.manualProvisioningScore ?? 82,
    accessBoundaryScore: input.accessBoundaryScore ?? 92,
    revocationReadinessScore: input.revocationReadinessScore ?? 84,
    openCriticalAccessIssueCount: input.openCriticalAccessIssueCount ?? 0,
    openMajorAccessIssueCount: input.openMajorAccessIssueCount ?? 1,
    unresolvedActivationFindingCount: input.unresolvedActivationFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "tester activation reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterActivationSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): TesterActivationPriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: TesterActivationLane,
  score: number,
  question: string,
  expectedEvidence: string[],
  safeOutcome: string,
): TesterActivationBoardItem {
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

export function buildAiTesterAccountActivationGateReport(
  input: TesterActivationInput = {},
): TesterActivationReport {
  const context = normalizeInput(input);
  const approvalRatio = context.targetTesterCount > 0 ? context.approvedTesterCount / context.targetTesterCount : 0;
  const activationApprovalScore = clampScore(approvalRatio * 100);

  const activationApprovalBoard = [
    boardItem(
      "TAA_APPROVAL_001",
      "Tester approval readiness",
      "activation_approval",
      activationApprovalScore,
      "Are selected testers approved for invite-only activation?",
      ["approved tester count", "target tester count", "reviewer decision"],
      "Tester approval status is visible before account creation.",
    ),
    boardItem(
      "TAA_APPROVAL_002",
      "Human activation hold",
      "activation_approval",
      100,
      "Can activation remain blocked until explicit approval?",
      ["humanReviewRequired=true", "testerAccountCreateAllowed=false"],
      "No account is created automatically.",
    ),
  ];

  const roleAssignmentBoard = [
    boardItem(
      "TAA_ROLE_001",
      "Tester role assignment readiness",
      "role_assignment",
      context.roleAssignmentScore,
      "Are tester roles ready before account creation?",
      ["uat_reviewer", "uat_operator", "uat_observer"],
      "Roles are reviewed before any future write.",
    ),
  ];

  const languageAssignmentBoard = [
    boardItem(
      "TAA_LANG_001",
      "Preferred language readiness",
      "language_assignment",
      context.languageAssignmentScore,
      "Is each tester mapped to a supported language?",
      ["it", "en", "es", "fr", "de", "pt"],
      "Language assignment is ready for onboarding.",
    ),
  ];

  const manualProvisioningBoard = [
    boardItem(
      "TAA_MANUAL_001",
      "Manual provisioning checklist",
      "manual_provisioning",
      context.manualProvisioningScore,
      "Can admin create testers manually in a future gated release?",
      ["admin owner", "role", "language", "revocation path"],
      "Manual provisioning plan is reviewable.",
    ),
    boardItem(
      "TAA_MANUAL_002",
      "No automatic account creation",
      "manual_provisioning",
      100,
      "Does V19.0 avoid automatic account creation?",
      ["accountWriteAllowed=false", "testerAccountCreatePerformed=false"],
      "No automatic account creation is performed.",
    ),
  ];

  const accessBoundaryBoard = [
    boardItem(
      "TAA_BOUNDARY_001",
      "Invite-only access boundary",
      "access_boundary",
      context.accessBoundaryScore,
      "Does tester access remain invite-only and closed to public signup?",
      ["publicSignupAllowed=false", "testerInviteSendAllowed=false"],
      "Access stays closed until a dedicated activation release.",
    ),
    boardItem(
      "TAA_BOUNDARY_002",
      "No operational capability expansion",
      "access_boundary",
      100,
      "Does tester access avoid AI, write and execution activation?",
      ["providerCalled=false", "persistencePerformed=false", "operationalExecutionAllowed=false"],
      "Tester access does not expand runtime scope.",
    ),
  ];

  const revocationReadinessBoard = [
    boardItem(
      "TAA_REVOKE_001",
      "Tester revocation readiness",
      "revocation_readiness",
      context.revocationReadinessScore,
      "Can access be revoked in a future controlled path?",
      ["disabled role", "manual owner", "reviewer note"],
      "Revocation plan is ready for later implementation.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TAA_NOGO_001",
      "Real account creation",
      "no_go_board",
      0,
      "Can real account creation happen in V19.0?",
      ["separate release required", "auth/schema review required"],
      "No-go: real account creation remains blocked.",
    ),
    boardItem(
      "TAA_NOGO_002",
      "Real invite send",
      "no_go_board",
      0,
      "Can real invites be sent in V19.0?",
      ["separate release required", "email approval required"],
      "No-go: invite sending remains blocked.",
    ),
    boardItem(
      "TAA_NOGO_003",
      "Public registration",
      "no_go_board",
      0,
      "Can public registration open in V19.0?",
      ["never in uncontrolled mode"],
      "No-go: public signup remains closed.",
    ),
  ];

  const findings: TesterActivationFindingItem[] = [];

  if (context.openCriticalAccessIssueCount > 0) {
    findings.push({
      id: "TAA_FINDING_001",
      label: "Open critical access issue",
      lane: "access_boundary",
      severity: "critical",
      reason: String(context.openCriticalAccessIssueCount) + " critical access issues remain open.",
      manualResolution: "Resolve critical access issues before tester account activation.",
      blocksTesterActivation: true,
    });
  }

  if (context.unresolvedActivationFindingCount > 0) {
    findings.push({
      id: "TAA_FINDING_002",
      label: "Unresolved activation finding",
      lane: "activation_approval",
      severity: "critical",
      reason: String(context.unresolvedActivationFindingCount) + " activation findings remain unresolved.",
      manualResolution: "Close activation findings before any account write path.",
      blocksTesterActivation: true,
    });
  }

  if (context.approvedTesterCount < context.targetTesterCount) {
    findings.push({
      id: "TAA_FINDING_003",
      label: "Tester approval incomplete",
      lane: "activation_approval",
      severity: "watch",
      reason: "Approved tester count is below target tester count.",
      manualResolution: "Approve tester list before future account activation.",
      blocksTesterActivation: false,
    });
  }

  if (context.openMajorAccessIssueCount > 0) {
    findings.push({
      id: "TAA_FINDING_004",
      label: "Open major access issue",
      lane: "manual_provisioning",
      severity: "watch",
      reason: String(context.openMajorAccessIssueCount) + " major access issues remain open.",
      manualResolution: "Track and review before enabling real tester accounts.",
      blocksTesterActivation: false,
    });
  }

  const activationReadinessScore = clampScore(
    (activationApprovalScore +
      context.roleAssignmentScore +
      context.languageAssignmentScore +
      context.manualProvisioningScore +
      context.accessBoundaryScore +
      context.revocationReadinessScore) /
      6 -
      findings.filter((item) => item.blocksTesterActivation).length * 20,
  );

  const activationReadinessStatus: TesterActivationStatus =
    findings.some((item) => item.blocksTesterActivation)
      ? "blocked"
      : activationReadinessScore >= 88
        ? "invite-only-activation-ready"
        : activationReadinessScore >= 80
          ? "manual-provisioning-review-ready"
          : "activation-design-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: TESTER_ACCOUNT_ACTIVATION_GUARDRAIL,
    activationReadinessScore,
    activationReadinessStatus,
    overallSeverity: severityFromConcern(
      context.openCriticalAccessIssueCount * 40 +
        context.openMajorAccessIssueCount * 20 +
        context.unresolvedActivationFindingCount * 45 +
        Math.max(0, context.targetTesterCount - context.approvedTesterCount) * 10,
    ),
    activationApprovalBoard,
    roleAssignmentBoard,
    languageAssignmentBoard,
    manualProvisioningBoard,
    accessBoundaryBoard,
    revocationReadinessBoard,
    noGoBoard,
    findings,
    stagedRoadmap: {
      v190: "Invite-only tester account activation gate and manual provisioning readiness.",
      v191: "Actual invite-only tester account creation after schema and auth review.",
      v192: "Controlled UAT feedback persistence after explicit persistence approval.",
      v193: "Provider runtime activation only after provider approval and rollback proof.",
      v194: "Operational execution activation only after human approval and emergency stop proof.",
    },
    redactedExportBundle: {
      exportId: "tester_account_activation_gate_v19_0_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "activation approval",
        "role assignment",
        "language assignment",
        "manual provisioning",
        "access boundary",
        "revocation readiness",
        "no-go board",
        "findings",
        "safety summary",
      ],
    },
    safetySummary: [
      "Tester account activation gate is dry-run only.",
      "No real account creation, invite sending, role write, language write or access revocation is performed.",
      "No public signup, provider call, AI persistence, feedback persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V19.0 prepares tester account activation without expanding activation scope.",
    ],
  };
}

export const aiTesterAccountActivationGateVersion = "V19.0";
