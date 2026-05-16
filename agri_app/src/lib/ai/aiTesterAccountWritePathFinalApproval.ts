export type TesterAccountWriteMode = "dry-run" | "tester-account-write-final-approval";
export type TesterAccountWriteSeverity = "info" | "watch" | "elevated" | "critical";
export type TesterAccountWritePriority = "low" | "medium" | "high" | "urgent";
export type TesterAccountWriteStatus =
  | "blocked"
  | "write-path-design-ready"
  | "final-approval-review-ready"
  | "rollback-reversible-plan-ready";

export type TesterAccountWriteLane =
  | "final_approval"
  | "account_write_boundary"
  | "rollback_plan"
  | "manual_creation_checklist"
  | "role_language_confirmation"
  | "audit_packet"
  | "no_go_board"
  | "human_signoff";

export interface TesterAccountWriteInput {
  finalApprovalScore?: number;
  accountWriteBoundaryScore?: number;
  rollbackPlanScore?: number;
  manualChecklistScore?: number;
  roleLanguageConfirmationScore?: number;
  auditPacketScore?: number;
  targetTesterCount?: number;
  approvedTesterCount?: number;
  openCriticalWriteIssueCount?: number;
  openMajorWriteIssueCount?: number;
  unresolvedApprovalFindingCount?: number;
  reviewerRole?: string;
}

export interface TesterAccountWriteBoardItem {
  id: string;
  label: string;
  lane: TesterAccountWriteLane;
  score: number;
  priority: TesterAccountWritePriority;
  severity: TesterAccountWriteSeverity;
  question: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterAccountWriteFindingItem {
  id: string;
  label: string;
  lane: TesterAccountWriteLane;
  severity: TesterAccountWriteSeverity;
  reason: string;
  manualResolution: string;
  blocksAccountWritePath: boolean;
}

export const TESTER_ACCOUNT_WRITE_FINAL_APPROVAL_GUARDRAIL = {
  testerAccountWritePathFinalApprovalReady: true,
  finalApprovalGateReady: true,
  accountWriteBoundaryReady: true,
  rollbackReversiblePlanReady: true,
  manualCreationChecklistReady: true,
  roleLanguageConfirmationReady: true,
  auditPacketReady: true,
  noGoBoardReady: true,
  testerProvisioningAdapterReady: true,
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
  rollbackExecutionAllowed: false,
  rollbackExecutionPerformed: false,
  userSchemaWriteAllowed: false,
  userSchemaWritePerformed: false,
  authConfigWriteAllowed: false,
  authConfigWritePerformed: false,
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

export interface TesterAccountWriteReport {
  generatedAt: string;
  mode: TesterAccountWriteMode;
  context: Required<TesterAccountWriteInput>;
  readiness: typeof TESTER_ACCOUNT_WRITE_FINAL_APPROVAL_GUARDRAIL;
  finalWritePathScore: number;
  finalWritePathStatus: TesterAccountWriteStatus;
  overallSeverity: TesterAccountWriteSeverity;
  finalApprovalBoard: TesterAccountWriteBoardItem[];
  accountWriteBoundaryBoard: TesterAccountWriteBoardItem[];
  rollbackPlanBoard: TesterAccountWriteBoardItem[];
  manualCreationChecklistBoard: TesterAccountWriteBoardItem[];
  roleLanguageConfirmationBoard: TesterAccountWriteBoardItem[];
  auditPacketBoard: TesterAccountWriteBoardItem[];
  noGoBoard: TesterAccountWriteBoardItem[];
  findings: TesterAccountWriteFindingItem[];
  stagedRoadmap: Record<"v193" | "v194" | "v195" | "v196" | "v197", string>;
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

function normalizeInput(input: TesterAccountWriteInput): Required<TesterAccountWriteInput> {
  return {
    finalApprovalScore: input.finalApprovalScore ?? 82,
    accountWriteBoundaryScore: input.accountWriteBoundaryScore ?? 94,
    rollbackPlanScore: input.rollbackPlanScore ?? 86,
    manualChecklistScore: input.manualChecklistScore ?? 84,
    roleLanguageConfirmationScore: input.roleLanguageConfirmationScore ?? 88,
    auditPacketScore: input.auditPacketScore ?? 84,
    targetTesterCount: input.targetTesterCount ?? 3,
    approvedTesterCount: input.approvedTesterCount ?? 0,
    openCriticalWriteIssueCount: input.openCriticalWriteIssueCount ?? 0,
    openMajorWriteIssueCount: input.openMajorWriteIssueCount ?? 1,
    unresolvedApprovalFindingCount: input.unresolvedApprovalFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "tester account write path reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterAccountWriteSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): TesterAccountWritePriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: TesterAccountWriteLane,
  score: number,
  question: string,
  expectedEvidence: string[],
  safeOutcome: string,
): TesterAccountWriteBoardItem {
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

export function buildAiTesterAccountWritePathFinalApprovalReport(
  input: TesterAccountWriteInput = {},
): TesterAccountWriteReport {
  const context = normalizeInput(input);
  const approvalRatio = context.targetTesterCount > 0 ? context.approvedTesterCount / context.targetTesterCount : 0;
  const testerApprovalCoverageScore = clampScore(approvalRatio * 100);

  const finalApprovalBoard = [
    boardItem(
      "TAW_APPROVAL_001",
      "Final human approval gate",
      "final_approval",
      context.finalApprovalScore,
      "Is final human approval complete enough for a future write release?",
      ["reviewer role", "tester list", "manual decision"],
      "Final approval remains review-only.",
    ),
    boardItem(
      "TAW_APPROVAL_002",
      "Tester approval coverage",
      "final_approval",
      testerApprovalCoverageScore,
      "Are target testers approved before any future write?",
      ["approved tester count", "target tester count"],
      "Tester approval coverage is visible.",
    ),
  ];

  const accountWriteBoundaryBoard = [
    boardItem(
      "TAW_BOUNDARY_001",
      "Account write boundary",
      "account_write_boundary",
      context.accountWriteBoundaryScore,
      "Can account writes remain blocked in V19.3?",
      ["accountWriteAllowed=false", "testerAccountCreateAllowed=false"],
      "No account write is enabled.",
    ),
    boardItem(
      "TAW_BOUNDARY_002",
      "No public signup boundary",
      "account_write_boundary",
      100,
      "Can public registration remain closed?",
      ["publicSignupAllowed=false", "publicSignupPerformed=false"],
      "Public signup remains closed.",
    ),
  ];

  const rollbackPlanBoard = [
    boardItem(
      "TAW_ROLLBACK_001",
      "Rollback-reversible creation plan",
      "rollback_plan",
      context.rollbackPlanScore,
      "Can a future account write release be rolled back manually?",
      ["rollback branch", "disable role", "manual owner"],
      "Rollback plan is ready for review, not execution.",
    ),
  ];

  const manualCreationChecklistBoard = [
    boardItem(
      "TAW_MANUAL_001",
      "Manual creation checklist",
      "manual_creation_checklist",
      context.manualChecklistScore,
      "Can admin follow a safe manual creation checklist later?",
      ["tester label", "role", "language", "reviewer approval"],
      "Checklist is ready for a later write release.",
    ),
  ];

  const roleLanguageConfirmationBoard = [
    boardItem(
      "TAW_ROLE_LANG_001",
      "Role and language confirmation",
      "role_language_confirmation",
      context.roleLanguageConfirmationScore,
      "Are tester roles and languages confirmed before write?",
      ["role", "language", "disabled fallback"],
      "Role and language confirmation remains dry-run.",
    ),
  ];

  const auditPacketBoard = [
    boardItem(
      "TAW_AUDIT_001",
      "Account creation audit packet",
      "audit_packet",
      context.auditPacketScore,
      "Can a future write release include an audit packet?",
      ["reviewer note", "redacted output", "rollback note"],
      "Audit packet remains redacted and local.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TAW_NOGO_001",
      "Real account creation",
      "no_go_board",
      0,
      "Can real tester accounts be created in V19.3?",
      ["separate write release required"],
      "No-go: real account creation remains blocked.",
    ),
    boardItem(
      "TAW_NOGO_002",
      "Real invite send",
      "no_go_board",
      0,
      "Can real invites be sent in V19.3?",
      ["separate write release required"],
      "No-go: invite sending remains blocked.",
    ),
    boardItem(
      "TAW_NOGO_003",
      "Schema migration",
      "no_go_board",
      0,
      "Can schema migration run in V19.3?",
      ["separate schema release required"],
      "No-go: schema and migrations remain untouched.",
    ),
  ];

  const findings: TesterAccountWriteFindingItem[] = [];

  if (context.openCriticalWriteIssueCount > 0) {
    findings.push({
      id: "TAW_FINDING_001",
      label: "Open critical write issue",
      lane: "account_write_boundary",
      severity: "critical",
      reason: String(context.openCriticalWriteIssueCount) + " critical write issues remain open.",
      manualResolution: "Resolve critical write issues before real account creation.",
      blocksAccountWritePath: true,
    });
  }

  if (context.unresolvedApprovalFindingCount > 0) {
    findings.push({
      id: "TAW_FINDING_002",
      label: "Unresolved approval finding",
      lane: "final_approval",
      severity: "critical",
      reason: String(context.unresolvedApprovalFindingCount) + " approval findings remain unresolved.",
      manualResolution: "Close approval findings before any account write path.",
      blocksAccountWritePath: true,
    });
  }

  if (context.approvedTesterCount < context.targetTesterCount) {
    findings.push({
      id: "TAW_FINDING_003",
      label: "Tester approval incomplete",
      lane: "final_approval",
      severity: "watch",
      reason: "Approved tester count is below target tester count.",
      manualResolution: "Complete tester approval before real account creation.",
      blocksAccountWritePath: false,
    });
  }

  if (context.openMajorWriteIssueCount > 0) {
    findings.push({
      id: "TAW_FINDING_004",
      label: "Open major write issue",
      lane: "manual_creation_checklist",
      severity: "watch",
      reason: String(context.openMajorWriteIssueCount) + " major write issues remain open.",
      manualResolution: "Track and review before account activation.",
      blocksAccountWritePath: false,
    });
  }

  const finalWritePathScore = clampScore(
    (context.finalApprovalScore +
      testerApprovalCoverageScore +
      context.accountWriteBoundaryScore +
      context.rollbackPlanScore +
      context.manualChecklistScore +
      context.roleLanguageConfirmationScore +
      context.auditPacketScore) /
      7 -
      findings.filter((item) => item.blocksAccountWritePath).length * 20,
  );

  const finalWritePathStatus: TesterAccountWriteStatus =
    findings.some((item) => item.blocksAccountWritePath)
      ? "blocked"
      : finalWritePathScore >= 88
        ? "rollback-reversible-plan-ready"
        : finalWritePathScore >= 80
          ? "final-approval-review-ready"
          : "write-path-design-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: TESTER_ACCOUNT_WRITE_FINAL_APPROVAL_GUARDRAIL,
    finalWritePathScore,
    finalWritePathStatus,
    overallSeverity: severityFromConcern(
      context.openCriticalWriteIssueCount * 40 +
        context.openMajorWriteIssueCount * 20 +
        context.unresolvedApprovalFindingCount * 45 +
        Math.max(0, context.targetTesterCount - context.approvedTesterCount) * 10,
    ),
    finalApprovalBoard,
    accountWriteBoundaryBoard,
    rollbackPlanBoard,
    manualCreationChecklistBoard,
    roleLanguageConfirmationBoard,
    auditPacketBoard,
    noGoBoard,
    findings,
    stagedRoadmap: {
      v193: "Tester account write path final approval gate and rollback-reversible creation plan.",
      v194: "Actual invite-only tester account creation only after explicit write approval.",
      v195: "Controlled UAT feedback persistence after explicit persistence approval.",
      v196: "Provider runtime activation only after provider approval and rollback proof.",
      v197: "Operational execution activation only after human approval and emergency stop proof.",
    },
    redactedExportBundle: {
      exportId: "tester_account_write_path_final_approval_v19_3_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "final approval",
        "account write boundary",
        "rollback plan",
        "manual creation checklist",
        "role language confirmation",
        "audit packet",
        "no-go board",
        "findings",
        "safety summary",
      ],
    },
    safetySummary: [
      "Tester account write path final approval is dry-run only.",
      "No real account creation, invite sending, role write, language write, access revocation, schema write or migration execution is performed.",
      "No public signup, provider call, AI persistence, feedback persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V19.3 prepares final write approval without expanding activation scope.",
    ],
  };
}

export const aiTesterAccountWritePathFinalApprovalVersion = "V19.3";
