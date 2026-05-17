export type TesterAccountProvisioningWriteIntentMode = "dry-run" | "tester-account-provisioning-write-intent";
export type TesterAccountProvisioningWriteIntentStatus =
  | "blocked"
  | "intent-drafted"
  | "admin-approval-review-ready"
  | "write-intent-locked-ready";
export type TesterAccountProvisioningWriteIntentSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterAccountProvisioningWriteIntentInput {
  targetTesterCount?: number;
  preparedIntentCount?: number;
  adminApprovalScore?: number;
  nonAiBoundaryScore?: number;
  requestPreviewScore?: number;
  rollbackChecklistScore?: number;
  writeLockScore?: number;
  openCriticalIntentIssueCount?: number;
  openMajorIntentIssueCount?: number;
}

export interface TesterAccountProvisioningWriteIntentBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterAccountProvisioningWriteIntentSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterAccountProvisioningWriteIntentFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterAccountProvisioningWriteIntentSeverity;
  reason: string;
  manualResolution: string;
  blocksWriteIntent: boolean;
}

export const TESTER_ACCOUNT_PROVISIONING_WRITE_INTENT_GUARDRAIL = {
  testerAccountProvisioningWriteIntentReady: true,
  nonAiOpsBoundaryReady: true,
  writeIntentLockReady: true,
  requestPreviewReady: true,
  adminApprovalReady: true,
  rollbackChecklistReady: true,
  noGoBoardReady: true,
  testerAccountWritePathStagingReady: true,
  testerAccountCreationCompatibilityReady: true,
  testerAccountWritePathFinalApprovalReady: true,
  publicSignupAllowed: false,
  publicSignupPerformed: false,
  accountWriteAllowed: false,
  accountWritePerformed: false,
  testerAccountCreateAllowed: false,
  testerAccountCreatePerformed: false,
  testerInviteSendAllowed: false,
  testerInviteSendPerformed: false,
  testerRoleWriteAllowed: false,
  testerRoleWritePerformed: false,
  testerLanguageWriteAllowed: false,
  testerLanguageWritePerformed: false,
  testerAccessRevocationAllowed: false,
  testerAccessRevocationPerformed: false,
  writeIntentExecutionAllowed: false,
  writeIntentExecutionPerformed: false,
  nonAiOpsWriteAllowed: false,
  nonAiOpsWritePerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  userSchemaWriteAllowed: false,
  userSchemaWritePerformed: false,
  providerAiReady: false,
  providerCalled: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  persistenceReady: false,
  persistencePerformed: false,
  dbPersistenceAllowed: false,
  taskCreated: false,
  interventionCreated: false,
  automaticExecutionPerformed: false,
  operationalExecutionAllowed: false,
  operationalExecutionPerformed: false,
  executionCommandAllowed: false,
  executionCommandPerformed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  incidentRecordPersistenceAllowed: false,
  incidentRecordWriteAllowed: false,
  productPrescriptionAllowed: false,
  productPrescriptionPerformed: false,
  dosageAdviceAllowed: false,
  dosageAdvicePerformed: false,
  manualDispatchOnly: true,
  humanReviewRequired: true,
  localAnalysisOnly: true,
  redactedOutputOnly: true,
} as const;

export interface TesterAccountProvisioningWriteIntentReport {
  generatedAt: string;
  mode: TesterAccountProvisioningWriteIntentMode;
  context: Required<TesterAccountProvisioningWriteIntentInput>;
  readiness: typeof TESTER_ACCOUNT_PROVISIONING_WRITE_INTENT_GUARDRAIL;
  writeIntentScore: number;
  writeIntentStatus: TesterAccountProvisioningWriteIntentStatus;
  writeIntentBoard: TesterAccountProvisioningWriteIntentBoardItem[];
  nonAiBoundaryBoard: TesterAccountProvisioningWriteIntentBoardItem[];
  requestPreviewBoard: TesterAccountProvisioningWriteIntentBoardItem[];
  adminApprovalBoard: TesterAccountProvisioningWriteIntentBoardItem[];
  rollbackChecklistBoard: TesterAccountProvisioningWriteIntentBoardItem[];
  noGoBoard: TesterAccountProvisioningWriteIntentBoardItem[];
  findings: TesterAccountProvisioningWriteIntentFindingItem[];
  safetySummary: string[];
}

function normalizeInput(input: TesterAccountProvisioningWriteIntentInput): Required<TesterAccountProvisioningWriteIntentInput> {
  return {
    targetTesterCount: input.targetTesterCount ?? 3,
    preparedIntentCount: input.preparedIntentCount ?? 0,
    adminApprovalScore: input.adminApprovalScore ?? 82,
    nonAiBoundaryScore: input.nonAiBoundaryScore ?? 100,
    requestPreviewScore: input.requestPreviewScore ?? 84,
    rollbackChecklistScore: input.rollbackChecklistScore ?? 86,
    writeLockScore: input.writeLockScore ?? 100,
    openCriticalIntentIssueCount: input.openCriticalIntentIssueCount ?? 0,
    openMajorIntentIssueCount: input.openMajorIntentIssueCount ?? 1,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterAccountProvisioningWriteIntentSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function boardItem(
  id: string,
  label: string,
  lane: string,
  score: number,
  expectedEvidence: string[],
  safeOutcome: string,
): TesterAccountProvisioningWriteIntentBoardItem {
  const normalized = clampScore(score);

  return {
    id,
    label,
    lane,
    score: normalized,
    severity: severityFromConcern(100 - normalized),
    expectedEvidence,
    safeOutcome,
  };
}

export function buildTesterAccountProvisioningWriteIntentReport(
  input: TesterAccountProvisioningWriteIntentInput = {},
): TesterAccountProvisioningWriteIntentReport {
  const context = normalizeInput(input);
  const intentCoverageScore = clampScore(
    context.targetTesterCount > 0 ? (context.preparedIntentCount / context.targetTesterCount) * 100 : 0,
  );

  const writeIntentBoard = [
    boardItem(
      "TAPWI_INTENT_001",
      "Tester provisioning write intent draft",
      "write_intent",
      intentCoverageScore,
      ["target tester count", "prepared intent count", "role", "language"],
      "Write intent is drafted only; no account write is performed.",
    ),
    boardItem(
      "TAPWI_INTENT_002",
      "Write intent lock",
      "write_intent",
      context.writeLockScore,
      ["writeIntentExecutionAllowed=false", "accountWriteAllowed=false"],
      "Write intent remains locked.",
    ),
  ];

  const nonAiBoundaryBoard = [
    boardItem(
      "TAPWI_BOUNDARY_001",
      "Non-AI ops boundary",
      "non_ai_ops_boundary",
      context.nonAiBoundaryScore,
      ["providerCalled=false", "providerAiReady=false", "nonAiOpsWriteAllowed=false"],
      "Tester provisioning is isolated from AI runtime.",
    ),
  ];

  const requestPreviewBoard = [
    boardItem(
      "TAPWI_PREVIEW_001",
      "Provisioning request preview",
      "request_preview",
      context.requestPreviewScore,
      ["tester label", "role", "language", "disabled fallback"],
      "Request preview is review-only.",
    ),
  ];

  const adminApprovalBoard = [
    boardItem(
      "TAPWI_APPROVAL_001",
      "Admin approval checklist",
      "admin_approval",
      context.adminApprovalScore,
      ["admin reviewer", "manual approval", "rollback owner"],
      "Admin approval remains dry-run.",
    ),
  ];

  const rollbackChecklistBoard = [
    boardItem(
      "TAPWI_ROLLBACK_001",
      "Rollback checklist",
      "rollback_checklist",
      context.rollbackChecklistScore,
      ["disable account", "disable role", "manual owner"],
      "Rollback checklist is prepared but not executed.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TAPWI_NOGO_001",
      "Real account creation",
      "no_go_board",
      0,
      ["separate explicit write release required"],
      "No-go: real account creation remains blocked.",
    ),
    boardItem(
      "TAPWI_NOGO_002",
      "Real invite send",
      "no_go_board",
      0,
      ["separate invite release required"],
      "No-go: invite sending remains blocked.",
    ),
    boardItem(
      "TAPWI_NOGO_003",
      "Public signup",
      "no_go_board",
      0,
      ["publicSignupAllowed=false"],
      "No-go: public signup remains closed.",
    ),
  ];

  const findings: TesterAccountProvisioningWriteIntentFindingItem[] = [];

  if (context.openCriticalIntentIssueCount > 0) {
    findings.push({
      id: "TAPWI_FINDING_001",
      label: "Open critical write intent issue",
      lane: "write_intent",
      severity: "critical",
      reason: String(context.openCriticalIntentIssueCount) + " critical write intent issues remain open.",
      manualResolution: "Resolve critical issues before any write release.",
      blocksWriteIntent: true,
    });
  }

  if (context.preparedIntentCount < context.targetTesterCount) {
    findings.push({
      id: "TAPWI_FINDING_002",
      label: "Write intent coverage incomplete",
      lane: "write_intent",
      severity: "watch",
      reason: "Prepared intent count is below target tester count.",
      manualResolution: "Complete request intents before account creation.",
      blocksWriteIntent: false,
    });
  }

  if (context.openMajorIntentIssueCount > 0) {
    findings.push({
      id: "TAPWI_FINDING_003",
      label: "Open major write intent issue",
      lane: "admin_approval",
      severity: "watch",
      reason: String(context.openMajorIntentIssueCount) + " major write intent issues remain open.",
      manualResolution: "Track and review before a write release.",
      blocksWriteIntent: false,
    });
  }

  const writeIntentScore = clampScore(
    (intentCoverageScore +
      context.adminApprovalScore +
      context.nonAiBoundaryScore +
      context.requestPreviewScore +
      context.rollbackChecklistScore +
      context.writeLockScore) /
      6 -
      findings.filter((item) => item.blocksWriteIntent).length * 20,
  );

  const writeIntentStatus: TesterAccountProvisioningWriteIntentStatus =
    findings.some((item) => item.blocksWriteIntent)
      ? "blocked"
      : writeIntentScore >= 88
        ? "write-intent-locked-ready"
        : writeIntentScore >= 80
          ? "admin-approval-review-ready"
          : "intent-drafted";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: TESTER_ACCOUNT_PROVISIONING_WRITE_INTENT_GUARDRAIL,
    writeIntentScore,
    writeIntentStatus,
    writeIntentBoard,
    nonAiBoundaryBoard,
    requestPreviewBoard,
    adminApprovalBoard,
    rollbackChecklistBoard,
    noGoBoard,
    findings,
    safetySummary: [
      "Tester account provisioning write intent is dry-run only.",
      "No real account creation, invite sending, role write, language write, schema write or migration execution is performed.",
      "No public signup, provider call, AI persistence, feedback persistence, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V19.6 isolates tester provisioning from AI scope without enabling writes.",
    ],
  };
}

export const testerAccountProvisioningWriteIntentVersion = "V19.6";
