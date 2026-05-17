export type TesterAccountCompatibilityMode = "dry-run" | "tester-account-creation-compatibility";
export type TesterAccountCompatibilitySeverity = "info" | "watch" | "elevated" | "critical";
export type TesterAccountCompatibilityStatus =
  | "blocked"
  | "schema-discovery-ready"
  | "write-compatibility-review-ready"
  | "tester-account-write-candidate-ready";

export interface TesterAccountCompatibilityInput {
  schemaExists?: boolean;
  userModelDetected?: boolean;
  accountModelDetected?: boolean;
  sessionModelDetected?: boolean;
  roleFieldDetected?: boolean;
  languageFieldDetected?: boolean;
  emailFieldDetected?: boolean;
  idFieldDetected?: boolean;
  authCompatibilityScore?: number;
  writeBoundaryScore?: number;
  rollbackReadinessScore?: number;
  openCriticalCompatibilityIssueCount?: number;
  openMajorCompatibilityIssueCount?: number;
}

export interface TesterAccountCompatibilityBoardItem {
  id: string;
  label: string;
  score: number;
  lane: string;
  severity: TesterAccountCompatibilitySeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterAccountCompatibilityFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterAccountCompatibilitySeverity;
  reason: string;
  manualResolution: string;
  blocksAccountCreation: boolean;
}

export const TESTER_ACCOUNT_CREATION_COMPATIBILITY_GUARDRAIL = {
  testerAccountCreationCompatibilityReady: true,
  schemaDiscoveryReady: true,
  authModelDiscoveryReady: true,
  roleLanguageFieldDiscoveryReady: true,
  writeCompatibilityGateReady: true,
  rollbackReadinessReady: true,
  testerAccountWritePathFinalApprovalReady: true,
  testerProvisioningAdapterReady: true,
  authUserSchemaReadinessReady: true,
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

export interface TesterAccountCompatibilityReport {
  generatedAt: string;
  mode: TesterAccountCompatibilityMode;
  context: Required<TesterAccountCompatibilityInput>;
  readiness: typeof TESTER_ACCOUNT_CREATION_COMPATIBILITY_GUARDRAIL;
  compatibilityScore: number;
  compatibilityStatus: TesterAccountCompatibilityStatus;
  schemaDiscoveryBoard: TesterAccountCompatibilityBoardItem[];
  authModelBoard: TesterAccountCompatibilityBoardItem[];
  roleLanguageFieldBoard: TesterAccountCompatibilityBoardItem[];
  writeCompatibilityBoard: TesterAccountCompatibilityBoardItem[];
  noGoBoard: TesterAccountCompatibilityBoardItem[];
  findings: TesterAccountCompatibilityFindingItem[];
  safetySummary: string[];
}

const discoveredSchemaDefaults = {"schemaExists":true,"userModelDetected":true,"accountModelDetected":true,"sessionModelDetected":true,"roleFieldDetected":true,"languageFieldDetected":false,"emailFieldDetected":true,"idFieldDetected":true} as const;

function normalizeInput(input: TesterAccountCompatibilityInput): Required<TesterAccountCompatibilityInput> {
  return {
    schemaExists: input.schemaExists ?? discoveredSchemaDefaults.schemaExists,
    userModelDetected: input.userModelDetected ?? discoveredSchemaDefaults.userModelDetected,
    accountModelDetected: input.accountModelDetected ?? discoveredSchemaDefaults.accountModelDetected,
    sessionModelDetected: input.sessionModelDetected ?? discoveredSchemaDefaults.sessionModelDetected,
    roleFieldDetected: input.roleFieldDetected ?? discoveredSchemaDefaults.roleFieldDetected,
    languageFieldDetected: input.languageFieldDetected ?? discoveredSchemaDefaults.languageFieldDetected,
    emailFieldDetected: input.emailFieldDetected ?? discoveredSchemaDefaults.emailFieldDetected,
    idFieldDetected: input.idFieldDetected ?? discoveredSchemaDefaults.idFieldDetected,
    authCompatibilityScore: input.authCompatibilityScore ?? 78,
    writeBoundaryScore: input.writeBoundaryScore ?? 100,
    rollbackReadinessScore: input.rollbackReadinessScore ?? 84,
    openCriticalCompatibilityIssueCount: input.openCriticalCompatibilityIssueCount ?? 0,
    openMajorCompatibilityIssueCount: input.openMajorCompatibilityIssueCount ?? 1,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterAccountCompatibilitySeverity {
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
): TesterAccountCompatibilityBoardItem {
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

export function buildAiTesterAccountCreationCompatibilityReport(
  input: TesterAccountCompatibilityInput = {},
): TesterAccountCompatibilityReport {
  const context = normalizeInput(input);

  const schemaBaseScore = clampScore(
    (Number(context.schemaExists) +
      Number(context.userModelDetected) +
      Number(context.emailFieldDetected) +
      Number(context.idFieldDetected)) *
      25,
  );

  const roleLanguageScore = clampScore(
    (Number(context.roleFieldDetected) + Number(context.languageFieldDetected)) * 50,
  );

  const authModelScore = clampScore(
    (Number(context.userModelDetected) +
      Number(context.accountModelDetected) +
      Number(context.sessionModelDetected)) *
      33.33,
  );

  const schemaDiscoveryBoard = [
    boardItem(
      "TACC_SCHEMA_001",
      "Schema discovery",
      "schema_discovery",
      schemaBaseScore,
      ["schema file", "user model", "email field", "id field"],
      "Schema discovery is non-destructive.",
    ),
  ];

  const authModelBoard = [
    boardItem(
      "TACC_AUTH_001",
      "Auth model compatibility",
      "auth_model",
      authModelScore,
      ["user model", "account model", "session model"],
      "Auth compatibility remains review-only.",
    ),
  ];

  const roleLanguageFieldBoard = [
    boardItem(
      "TACC_ROLE_LANG_001",
      "Role and language field compatibility",
      "role_language_fields",
      roleLanguageScore,
      ["role field", "language field"],
      "Role and language mapping remains draft-only.",
    ),
  ];

  const writeCompatibilityBoard = [
    boardItem(
      "TACC_WRITE_001",
      "No-write compatibility gate",
      "write_compatibility",
      context.writeBoundaryScore,
      ["accountWriteAllowed=false", "schemaWriteAllowed=false", "migrationExecutionAllowed=false"],
      "No account or schema write is performed.",
    ),
    boardItem(
      "TACC_ROLLBACK_001",
      "Rollback readiness",
      "write_compatibility",
      context.rollbackReadinessScore,
      ["rollback branch", "manual owner", "disabled state"],
      "Rollback plan is reviewed but not executed.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TACC_NOGO_001",
      "Real account creation",
      "no_go_board",
      0,
      ["separate write release required"],
      "No-go: real account creation remains blocked.",
    ),
    boardItem(
      "TACC_NOGO_002",
      "Schema migration",
      "no_go_board",
      0,
      ["separate schema release required"],
      "No-go: schema and migrations remain untouched.",
    ),
    boardItem(
      "TACC_NOGO_003",
      "Public signup",
      "no_go_board",
      0,
      ["publicSignupAllowed=false"],
      "No-go: public signup remains closed.",
    ),
  ];

  const findings: TesterAccountCompatibilityFindingItem[] = [];

  if (!context.schemaExists || !context.userModelDetected || !context.emailFieldDetected || !context.idFieldDetected) {
    findings.push({
      id: "TACC_FINDING_001",
      label: "Required user schema elements incomplete",
      lane: "schema_discovery",
      severity: "critical",
      reason: "Schema, user model, email field or id field is missing from discovery.",
      manualResolution: "Review auth/schema before any real account creation.",
      blocksAccountCreation: true,
    });
  }

  if (!context.roleFieldDetected || !context.languageFieldDetected) {
    findings.push({
      id: "TACC_FINDING_002",
      label: "Role or language field not confirmed",
      lane: "role_language_fields",
      severity: "watch",
      reason: "Role or language field was not confirmed by schema discovery.",
      manualResolution: "Map role/language through existing schema or plan a dedicated schema release.",
      blocksAccountCreation: false,
    });
  }

  if (context.openCriticalCompatibilityIssueCount > 0) {
    findings.push({
      id: "TACC_FINDING_003",
      label: "Open critical compatibility issue",
      lane: "write_compatibility",
      severity: "critical",
      reason: String(context.openCriticalCompatibilityIssueCount) + " critical compatibility issues remain open.",
      manualResolution: "Resolve critical issues before account write activation.",
      blocksAccountCreation: true,
    });
  }

  if (context.openMajorCompatibilityIssueCount > 0) {
    findings.push({
      id: "TACC_FINDING_004",
      label: "Open major compatibility issue",
      lane: "write_compatibility",
      severity: "watch",
      reason: String(context.openMajorCompatibilityIssueCount) + " major compatibility issues remain open.",
      manualResolution: "Track and review before account creation.",
      blocksAccountCreation: false,
    });
  }

  const compatibilityScore = clampScore(
    (schemaBaseScore +
      authModelScore +
      roleLanguageScore +
      context.authCompatibilityScore +
      context.writeBoundaryScore +
      context.rollbackReadinessScore) /
      6 -
      findings.filter((item) => item.blocksAccountCreation).length * 20,
  );

  const compatibilityStatus: TesterAccountCompatibilityStatus =
    findings.some((item) => item.blocksAccountCreation)
      ? "blocked"
      : compatibilityScore >= 88
        ? "tester-account-write-candidate-ready"
        : compatibilityScore >= 80
          ? "write-compatibility-review-ready"
          : "schema-discovery-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: TESTER_ACCOUNT_CREATION_COMPATIBILITY_GUARDRAIL,
    compatibilityScore,
    compatibilityStatus,
    schemaDiscoveryBoard,
    authModelBoard,
    roleLanguageFieldBoard,
    writeCompatibilityBoard,
    noGoBoard,
    findings,
    safetySummary: [
      "Tester account creation compatibility is dry-run only.",
      "No real account creation, invite sending, role write, language write, schema write or migration execution is performed.",
      "No public signup, provider call, AI persistence, feedback persistence, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V19.4 discovers compatibility without expanding activation scope.",
    ],
  };
}

export const aiTesterAccountCreationCompatibilityVersion = "V19.4";
