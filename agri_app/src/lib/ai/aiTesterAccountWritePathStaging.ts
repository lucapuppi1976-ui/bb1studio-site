export type TesterAccountWritePathStagingMode = "dry-run" | "tester-account-write-path-staging";
export type TesterAccountWritePathStagingStatus =
  | "blocked"
  | "adapter-staged"
  | "admin-review-ready"
  | "disabled-write-path-ready";
export type TesterAccountWritePathStagingSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterAccountWritePathStagingInput {
  targetTesterCount?: number;
  preparedRequestCount?: number;
  adapterStagingScore?: number;
  adminChecklistScore?: number;
  rollbackPlanScore?: number;
  writeBoundaryScore?: number;
  openCriticalStagingIssueCount?: number;
  openMajorStagingIssueCount?: number;
}

export interface TesterAccountWritePathStagingBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterAccountWritePathStagingSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterAccountWritePathStagingFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterAccountWritePathStagingSeverity;
  reason: string;
  manualResolution: string;
  blocksWritePathStaging: boolean;
}

export const TESTER_ACCOUNT_WRITE_PATH_STAGING_GUARDRAIL = {
  testerAccountWritePathStagingReady: true,
  disabledByDefaultAdapterReady: true,
  requestPreviewReady: true,
  adminChecklistReady: true,
  rollbackPlanReady: true,
  writeBoundaryReady: true,
  testerAccountCreationCompatibilityReady: true,
  testerAccountWritePathFinalApprovalReady: true,
  testerProvisioningAdapterReady: true,
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
  adapterExecutionAllowed: false,
  adapterExecutionPerformed: false,
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

export interface TesterAccountWritePathStagingReport {
  generatedAt: string;
  mode: TesterAccountWritePathStagingMode;
  context: Required<TesterAccountWritePathStagingInput>;
  readiness: typeof TESTER_ACCOUNT_WRITE_PATH_STAGING_GUARDRAIL;
  stagingScore: number;
  stagingStatus: TesterAccountWritePathStagingStatus;
  requestPreviewBoard: TesterAccountWritePathStagingBoardItem[];
  adminChecklistBoard: TesterAccountWritePathStagingBoardItem[];
  rollbackPlanBoard: TesterAccountWritePathStagingBoardItem[];
  writeBoundaryBoard: TesterAccountWritePathStagingBoardItem[];
  noGoBoard: TesterAccountWritePathStagingBoardItem[];
  findings: TesterAccountWritePathStagingFindingItem[];
  safetySummary: string[];
}

function normalizeInput(input: TesterAccountWritePathStagingInput): Required<TesterAccountWritePathStagingInput> {
  return {
    targetTesterCount: input.targetTesterCount ?? 3,
    preparedRequestCount: input.preparedRequestCount ?? 0,
    adapterStagingScore: input.adapterStagingScore ?? 84,
    adminChecklistScore: input.adminChecklistScore ?? 86,
    rollbackPlanScore: input.rollbackPlanScore ?? 86,
    writeBoundaryScore: input.writeBoundaryScore ?? 100,
    openCriticalStagingIssueCount: input.openCriticalStagingIssueCount ?? 0,
    openMajorStagingIssueCount: input.openMajorStagingIssueCount ?? 1,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterAccountWritePathStagingSeverity {
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
): TesterAccountWritePathStagingBoardItem {
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

export function buildAiTesterAccountWritePathStagingReport(
  input: TesterAccountWritePathStagingInput = {},
): TesterAccountWritePathStagingReport {
  const context = normalizeInput(input);
  const previewCoverageScore = clampScore(
    context.targetTesterCount > 0 ? (context.preparedRequestCount / context.targetTesterCount) * 100 : 0,
  );

  const requestPreviewBoard = [
    boardItem(
      "TAWPS_PREVIEW_001",
      "Tester account request preview",
      "request_preview",
      previewCoverageScore,
      ["target tester count", "prepared request count", "role", "language"],
      "Requests are previewed only; no account write is performed.",
    ),
    boardItem(
      "TAWPS_PREVIEW_002",
      "Disabled-by-default adapter",
      "request_preview",
      context.adapterStagingScore,
      ["adapterExecutionAllowed=false", "accountWriteAllowed=false"],
      "Adapter remains disabled by default.",
    ),
  ];

  const adminChecklistBoard = [
    boardItem(
      "TAWPS_ADMIN_001",
      "Admin creation checklist",
      "admin_checklist",
      context.adminChecklistScore,
      ["reviewer approval", "role", "language", "rollback owner"],
      "Admin checklist is staged for a future explicit write release.",
    ),
  ];

  const rollbackPlanBoard = [
    boardItem(
      "TAWPS_ROLLBACK_001",
      "Rollback plan",
      "rollback_plan",
      context.rollbackPlanScore,
      ["disable account", "disable role", "rollback branch", "manual owner"],
      "Rollback is planned but not executed.",
    ),
  ];

  const writeBoundaryBoard = [
    boardItem(
      "TAWPS_WRITE_001",
      "No-write boundary",
      "write_boundary",
      context.writeBoundaryScore,
      ["accountWriteAllowed=false", "testerAccountCreateAllowed=false", "adapterExecutionAllowed=false"],
      "All account write paths remain blocked.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TAWPS_NOGO_001",
      "Real account creation",
      "no_go_board",
      0,
      ["separate explicit write release required"],
      "No-go: real account creation remains blocked.",
    ),
    boardItem(
      "TAWPS_NOGO_002",
      "Real invite send",
      "no_go_board",
      0,
      ["separate email/invite release required"],
      "No-go: invite sending remains blocked.",
    ),
    boardItem(
      "TAWPS_NOGO_003",
      "Schema migration",
      "no_go_board",
      0,
      ["separate schema release required"],
      "No-go: schema and migrations remain untouched.",
    ),
  ];

  const findings: TesterAccountWritePathStagingFindingItem[] = [];

  if (context.openCriticalStagingIssueCount > 0) {
    findings.push({
      id: "TAWPS_FINDING_001",
      label: "Open critical staging issue",
      lane: "request_preview",
      severity: "critical",
      reason: String(context.openCriticalStagingIssueCount) + " critical staging issues remain open.",
      manualResolution: "Resolve critical staging issues before any account write release.",
      blocksWritePathStaging: true,
    });
  }

  if (context.preparedRequestCount < context.targetTesterCount) {
    findings.push({
      id: "TAWPS_FINDING_002",
      label: "Request preview incomplete",
      lane: "request_preview",
      severity: "watch",
      reason: "Prepared request count is below target tester count.",
      manualResolution: "Complete request previews before account creation.",
      blocksWritePathStaging: false,
    });
  }

  if (context.openMajorStagingIssueCount > 0) {
    findings.push({
      id: "TAWPS_FINDING_003",
      label: "Open major staging issue",
      lane: "admin_checklist",
      severity: "watch",
      reason: String(context.openMajorStagingIssueCount) + " major staging issues remain open.",
      manualResolution: "Track and review before a write release.",
      blocksWritePathStaging: false,
    });
  }

  const stagingScore = clampScore(
    (previewCoverageScore +
      context.adapterStagingScore +
      context.adminChecklistScore +
      context.rollbackPlanScore +
      context.writeBoundaryScore) /
      5 -
      findings.filter((item) => item.blocksWritePathStaging).length * 20,
  );

  const stagingStatus: TesterAccountWritePathStagingStatus =
    findings.some((item) => item.blocksWritePathStaging)
      ? "blocked"
      : stagingScore >= 88
        ? "disabled-write-path-ready"
        : stagingScore >= 80
          ? "admin-review-ready"
          : "adapter-staged";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: TESTER_ACCOUNT_WRITE_PATH_STAGING_GUARDRAIL,
    stagingScore,
    stagingStatus,
    requestPreviewBoard,
    adminChecklistBoard,
    rollbackPlanBoard,
    writeBoundaryBoard,
    noGoBoard,
    findings,
    safetySummary: [
      "Tester account write path staging is dry-run only.",
      "No real account creation, invite sending, role write, language write, schema write or migration execution is performed.",
      "No public signup, provider call, AI persistence, feedback persistence, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V19.5 stages a disabled-by-default adapter without expanding activation scope.",
    ],
  };
}

export const aiTesterAccountWritePathStagingVersion = "V19.5";
