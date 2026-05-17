export type TesterAccountCreationReadinessMode = "dry-run" | "tester-account-creation-final-readiness";
export type TesterAccountCreationReadinessDecision = "GO" | "GO_WITH_LIMITATIONS" | "NO_GO";
export type TesterAccountCreationReadinessSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterAccountCreationReadinessInput {
  schemaExists?: boolean;
  userModelDetected?: boolean;
  accountModelDetected?: boolean;
  sessionModelDetected?: boolean;
  emailFieldDetected?: boolean;
  idFieldDetected?: boolean;
  roleFieldDetected?: boolean;
  languageFieldDetected?: boolean;
  createdAtFieldDetected?: boolean;
  updatedAtFieldDetected?: boolean;
  adminApprovalScore?: number;
  rollbackReadinessScore?: number;
  protectedRouteScore?: number;
  writeLockScore?: number;
  targetTesterCount?: number;
  approvedTesterCount?: number;
  openCriticalIssueCount?: number;
  openMajorIssueCount?: number;
}

export interface TesterAccountCreationReadinessBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterAccountCreationReadinessSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterAccountCreationReadinessFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterAccountCreationReadinessSeverity;
  reason: string;
  manualResolution: string;
  blocksAccountCreation: boolean;
}

export const TESTER_ACCOUNT_CREATION_READINESS_AUDIT_GUARDRAIL = {
  testerAccountCreationReadinessAuditReady: true,
  finalGoNoGoDecisionReady: true,
  schemaDiscoveryReady: true,
  authDiscoveryReady: true,
  adminApprovalReady: true,
  rollbackReadinessReady: true,
  writeLockReady: true,
  protectedRouteReady: true,
  nonAiOpsBoundaryReady: true,
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

export interface TesterAccountCreationReadinessReport {
  generatedAt: string;
  mode: TesterAccountCreationReadinessMode;
  context: Required<TesterAccountCreationReadinessInput>;
  readiness: typeof TESTER_ACCOUNT_CREATION_READINESS_AUDIT_GUARDRAIL;
  readinessScore: number;
  decision: TesterAccountCreationReadinessDecision;
  schemaBoard: TesterAccountCreationReadinessBoardItem[];
  authBoard: TesterAccountCreationReadinessBoardItem[];
  approvalBoard: TesterAccountCreationReadinessBoardItem[];
  writeLockBoard: TesterAccountCreationReadinessBoardItem[];
  noGoBoard: TesterAccountCreationReadinessBoardItem[];
  findings: TesterAccountCreationReadinessFindingItem[];
  nextStep: string;
  safetySummary: string[];
}

const discoveredSchemaDefaults = {"schemaExists":true,"userModelDetected":true,"accountModelDetected":true,"sessionModelDetected":true,"emailFieldDetected":true,"idFieldDetected":true,"roleFieldDetected":true,"languageFieldDetected":false,"createdAtFieldDetected":true,"updatedAtFieldDetected":true} as const;

function normalizeInput(input: TesterAccountCreationReadinessInput): Required<TesterAccountCreationReadinessInput> {
  return {
    schemaExists: input.schemaExists ?? discoveredSchemaDefaults.schemaExists,
    userModelDetected: input.userModelDetected ?? discoveredSchemaDefaults.userModelDetected,
    accountModelDetected: input.accountModelDetected ?? discoveredSchemaDefaults.accountModelDetected,
    sessionModelDetected: input.sessionModelDetected ?? discoveredSchemaDefaults.sessionModelDetected,
    emailFieldDetected: input.emailFieldDetected ?? discoveredSchemaDefaults.emailFieldDetected,
    idFieldDetected: input.idFieldDetected ?? discoveredSchemaDefaults.idFieldDetected,
    roleFieldDetected: input.roleFieldDetected ?? discoveredSchemaDefaults.roleFieldDetected,
    languageFieldDetected: input.languageFieldDetected ?? discoveredSchemaDefaults.languageFieldDetected,
    createdAtFieldDetected: input.createdAtFieldDetected ?? discoveredSchemaDefaults.createdAtFieldDetected,
    updatedAtFieldDetected: input.updatedAtFieldDetected ?? discoveredSchemaDefaults.updatedAtFieldDetected,
    adminApprovalScore: input.adminApprovalScore ?? 84,
    rollbackReadinessScore: input.rollbackReadinessScore ?? 86,
    protectedRouteScore: input.protectedRouteScore ?? 92,
    writeLockScore: input.writeLockScore ?? 100,
    targetTesterCount: input.targetTesterCount ?? 3,
    approvedTesterCount: input.approvedTesterCount ?? 0,
    openCriticalIssueCount: input.openCriticalIssueCount ?? 0,
    openMajorIssueCount: input.openMajorIssueCount ?? 1,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterAccountCreationReadinessSeverity {
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
): TesterAccountCreationReadinessBoardItem {
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

export function buildTesterAccountCreationReadinessAuditReport(
  input: TesterAccountCreationReadinessInput = {},
): TesterAccountCreationReadinessReport {
  const context = normalizeInput(input);

  const schemaCoreScore = clampScore(
    (Number(context.schemaExists) +
      Number(context.userModelDetected) +
      Number(context.emailFieldDetected) +
      Number(context.idFieldDetected)) *
      25,
  );

  const authScore = clampScore(
    (Number(context.userModelDetected) +
      Number(context.accountModelDetected) +
      Number(context.sessionModelDetected)) *
      33.33,
  );

  const roleLanguageScore = clampScore(
    (Number(context.roleFieldDetected) + Number(context.languageFieldDetected)) * 50,
  );

  const approvalCoverageScore = clampScore(
    context.targetTesterCount > 0 ? (context.approvedTesterCount / context.targetTesterCount) * 100 : 0,
  );

  const schemaBoard = [
    boardItem(
      "TACRA_SCHEMA_001",
      "Core user schema readiness",
      "schema",
      schemaCoreScore,
      ["schema file", "user model", "email field", "id field"],
      "Core user schema readiness is audited without schema writes.",
    ),
    boardItem(
      "TACRA_SCHEMA_002",
      "Role and language readiness",
      "schema",
      roleLanguageScore,
      ["role field", "language field"],
      "Missing role/language can be handled only with an approved limitation.",
    ),
  ];

  const authBoard = [
    boardItem(
      "TACRA_AUTH_001",
      "Auth model readiness",
      "auth",
      authScore,
      ["user model", "account model", "session model"],
      "Auth readiness is audited without account writes.",
    ),
  ];

  const approvalBoard = [
    boardItem(
      "TACRA_APPROVAL_001",
      "Tester approval coverage",
      "approval",
      approvalCoverageScore,
      ["target tester count", "approved tester count"],
      "Tester list approval must be complete before a real write release.",
    ),
    boardItem(
      "TACRA_APPROVAL_002",
      "Admin approval readiness",
      "approval",
      context.adminApprovalScore,
      ["admin reviewer", "manual owner", "rollback owner"],
      "Admin approval remains dry-run.",
    ),
  ];

  const writeLockBoard = [
    boardItem(
      "TACRA_WRITE_001",
      "Write lock verification",
      "write_lock",
      context.writeLockScore,
      ["accountWriteAllowed=false", "testerAccountCreateAllowed=false"],
      "Account write path remains locked.",
    ),
    boardItem(
      "TACRA_ROUTE_001",
      "Protected route readiness",
      "write_lock",
      context.protectedRouteScore,
      ["protected endpoint", "manual reviewer"],
      "Protected route readiness is verified without writes.",
    ),
    boardItem(
      "TACRA_ROLLBACK_001",
      "Rollback readiness",
      "write_lock",
      context.rollbackReadinessScore,
      ["rollback branch", "disable account plan", "manual owner"],
      "Rollback is planned but not executed.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TACRA_NOGO_001",
      "Real account creation",
      "no_go",
      0,
      ["separate write release required"],
      "No-go in V19.7: real account creation remains blocked.",
    ),
    boardItem(
      "TACRA_NOGO_002",
      "Real invite sending",
      "no_go",
      0,
      ["separate invite release required"],
      "No-go in V19.7: real invite sending remains blocked.",
    ),
    boardItem(
      "TACRA_NOGO_003",
      "Schema migration",
      "no_go",
      0,
      ["separate schema release required"],
      "No-go in V19.7: schema and migrations remain untouched.",
    ),
  ];

  const findings: TesterAccountCreationReadinessFindingItem[] = [];

  if (!context.schemaExists || !context.userModelDetected || !context.emailFieldDetected || !context.idFieldDetected) {
    findings.push({
      id: "TACRA_FINDING_001",
      label: "Core schema requirements incomplete",
      lane: "schema",
      severity: "critical",
      reason: "Schema, user model, email field or id field is missing.",
      manualResolution: "Do not create tester accounts until core schema readiness is resolved.",
      blocksAccountCreation: true,
    });
  }

  if (!context.accountModelDetected || !context.sessionModelDetected) {
    findings.push({
      id: "TACRA_FINDING_002",
      label: "Auth model incomplete or not confirmed",
      lane: "auth",
      severity: "watch",
      reason: "Account or session model was not confirmed by schema discovery.",
      manualResolution: "Confirm existing auth flow before real account creation.",
      blocksAccountCreation: false,
    });
  }

  if (!context.roleFieldDetected || !context.languageFieldDetected) {
    findings.push({
      id: "TACRA_FINDING_003",
      label: "Role or language field limitation",
      lane: "schema",
      severity: "watch",
      reason: "Role or language field was not confirmed by schema discovery.",
      manualResolution: "Proceed only with an approved limitation or create a dedicated schema release.",
      blocksAccountCreation: false,
    });
  }

  if (context.approvedTesterCount < context.targetTesterCount) {
    findings.push({
      id: "TACRA_FINDING_004",
      label: "Tester approval incomplete",
      lane: "approval",
      severity: "watch",
      reason: "Approved tester count is below target tester count.",
      manualResolution: "Approve tester list before the write pilot.",
      blocksAccountCreation: false,
    });
  }

  if (context.openCriticalIssueCount > 0) {
    findings.push({
      id: "TACRA_FINDING_005",
      label: "Open critical readiness issue",
      lane: "approval",
      severity: "critical",
      reason: String(context.openCriticalIssueCount) + " critical readiness issues remain open.",
      manualResolution: "Resolve critical readiness issues before any write pilot.",
      blocksAccountCreation: true,
    });
  }

  if (context.openMajorIssueCount > 0) {
    findings.push({
      id: "TACRA_FINDING_006",
      label: "Open major readiness issue",
      lane: "approval",
      severity: "watch",
      reason: String(context.openMajorIssueCount) + " major readiness issues remain open.",
      manualResolution: "Track and review before the write pilot.",
      blocksAccountCreation: false,
    });
  }

  const readinessScore = clampScore(
    (schemaCoreScore +
      authScore +
      roleLanguageScore +
      approvalCoverageScore +
      context.adminApprovalScore +
      context.rollbackReadinessScore +
      context.protectedRouteScore +
      context.writeLockScore) /
      8 -
      findings.filter((item) => item.blocksAccountCreation).length * 20,
  );

  const hasBlocking = findings.some((item) => item.blocksAccountCreation);
  const hasLimitations =
    !context.roleFieldDetected ||
    !context.languageFieldDetected ||
    !context.accountModelDetected ||
    !context.sessionModelDetected ||
    context.approvedTesterCount < context.targetTesterCount ||
    context.openMajorIssueCount > 0;

  const decision: TesterAccountCreationReadinessDecision = hasBlocking
    ? "NO_GO"
    : hasLimitations
      ? "GO_WITH_LIMITATIONS"
      : "GO";

  const nextStep =
    decision === "GO"
      ? "Proceed to a protected single-tester write pilot in the next release."
      : decision === "GO_WITH_LIMITATIONS"
        ? "Proceed only after explicitly accepting listed limitations or resolving them."
        : "Do not proceed to account writes; resolve blocking findings first.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: TESTER_ACCOUNT_CREATION_READINESS_AUDIT_GUARDRAIL,
    readinessScore,
    decision,
    schemaBoard,
    authBoard,
    approvalBoard,
    writeLockBoard,
    noGoBoard,
    findings,
    nextStep,
    safetySummary: [
      "Tester account creation readiness audit is dry-run only.",
      "No real account creation, invite sending, role write, language write, schema write or migration execution is performed.",
      "No public signup, provider call, AI persistence, feedback persistence, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V19.7 produces a GO / GO_WITH_LIMITATIONS / NO_GO decision without enabling writes.",
    ],
  };
}

export const testerAccountCreationReadinessAuditVersion = "V19.7";
