export type TesterSecondTesterAccountWritePilotMode =
  | "dry-run"
  | "protected-second-tester-account-write-pilot";

export type TesterSecondTesterAccountWritePilotStatus =
  | "blocked"
  | "dry-run-preview-ready"
  | "write-pilot-armed"
  | "second-tester-write-candidate";

export type TesterSecondTesterAccountWritePilotSeverity =
  | "info"
  | "watch"
  | "elevated"
  | "critical";

export type TesterSecondTesterAccountWritePilotDecision =
  | "DRY_RUN_ONLY"
  | "WRITE_DISABLED"
  | "WRITE_CANDIDATE"
  | "BLOCKED";

export interface TesterSecondTesterAccountWritePilotInput {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  secondTesterName?: string;
  secondTesterRole?: string;
  secondTesterLanguage?: string;
  dryRun?: boolean;
  acceptLimitations?: boolean;
  confirm?: string;
  previousAccessGateCleared?: boolean;
  firstTesterDetected?: boolean;
  firstTesterRoleCompatible?: boolean;
  firstTesterHasPasswordHash?: boolean;
  secondTesterExistingUserDetected?: boolean;
  schemaHasRoleField?: boolean;
  schemaHasLanguageField?: boolean;
  serverWriteEnabled?: boolean;
  serverConfirmConfigured?: boolean;
  noPublicSignupConfirmed?: boolean;
  noPasswordWriteConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
}

export interface TesterSecondTesterAccountWritePilotBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterSecondTesterAccountWritePilotSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterSecondTesterAccountWritePilotFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterSecondTesterAccountWritePilotSeverity;
  reason: string;
  manualResolution: string;
  blocksWritePilot: boolean;
}

export const SECOND_TESTER_ACCOUNT_WRITE_CONFIRM =
  "CONFIRM_V20_9_SECOND_TESTER_ACCOUNT_WRITE";

export const TESTER_SECOND_TESTER_ACCOUNT_WRITE_PILOT_GUARDRAIL = {
  testerSecondTesterAccountWritePilotReady: true,
  protectedSecondTesterWriteRouteReady: true,
  defaultDryRunOnly: true,
  serverWriteEnabledRequired: true,
  serverConfirmRequired: true,
  bodyConfirmRequired: true,
  oneSecondTesterPilotOnly: true,
  roleMappedToOperatorOnly: true,
  languageFallbackOnly: true,
  publicSignupAllowed: false,
  publicSignupPerformed: false,
  inviteEmailSendAllowed: false,
  inviteEmailSendPerformed: false,
  passwordWriteAllowed: false,
  passwordWritePerformed: false,
  automaticAccountWriteAllowed: false,
  automaticAccountWritePerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  providerAiReady: false,
  providerCalled: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  operationalExecutionAllowed: false,
  operationalExecutionPerformed: false,
  evidencePersistenceAllowed: false,
  evidencePersistencePerformed: false,
  issuePersistenceAllowed: false,
  issuePersistencePerformed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  humanReviewRequired: true,
  redactedOutputOnly: true,
} as const;

export interface TesterSecondTesterAccountWritePilotReport {
  generatedAt: string;
  mode: TesterSecondTesterAccountWritePilotMode;
  input: Required<TesterSecondTesterAccountWritePilotInput>;
  readiness: typeof TESTER_SECOND_TESTER_ACCOUNT_WRITE_PILOT_GUARDRAIL;
  pilotScore: number;
  pilotStatus: TesterSecondTesterAccountWritePilotStatus;
  decision: TesterSecondTesterAccountWritePilotDecision;
  firstTesterBoard: TesterSecondTesterAccountWritePilotBoardItem[];
  secondTesterBoard: TesterSecondTesterAccountWritePilotBoardItem[];
  schemaMappingBoard: TesterSecondTesterAccountWritePilotBoardItem[];
  confirmationBoard: TesterSecondTesterAccountWritePilotBoardItem[];
  safetyBoard: TesterSecondTesterAccountWritePilotBoardItem[];
  noGoBoard: TesterSecondTesterAccountWritePilotBoardItem[];
  findings: TesterSecondTesterAccountWritePilotFindingItem[];
  safetySummary: string[];
}

function normalizeInput(
  input: TesterSecondTesterAccountWritePilotInput,
): Required<TesterSecondTesterAccountWritePilotInput> {
  return {
    firstTesterEmail: input.firstTesterEmail ?? "",
    secondTesterEmail: input.secondTesterEmail ?? "",
    secondTesterName: input.secondTesterName ?? "",
    secondTesterRole: input.secondTesterRole ?? "OPERATOR",
    secondTesterLanguage: input.secondTesterLanguage ?? "it",
    dryRun: input.dryRun ?? true,
    acceptLimitations: input.acceptLimitations ?? false,
    confirm: input.confirm ?? "",
    previousAccessGateCleared: input.previousAccessGateCleared ?? false,
    firstTesterDetected: input.firstTesterDetected ?? false,
    firstTesterRoleCompatible: input.firstTesterRoleCompatible ?? false,
    firstTesterHasPasswordHash: input.firstTesterHasPasswordHash ?? false,
    secondTesterExistingUserDetected:
      input.secondTesterExistingUserDetected ?? false,
    schemaHasRoleField: input.schemaHasRoleField ?? false,
    schemaHasLanguageField: input.schemaHasLanguageField ?? false,
    serverWriteEnabled: input.serverWriteEnabled ?? false,
    serverConfirmConfigured: input.serverConfirmConfigured ?? false,
    noPublicSignupConfirmed: input.noPublicSignupConfirmed ?? false,
    noPasswordWriteConfirmed: input.noPasswordWriteConfirmed ?? false,
    noInviteEmailConfirmed: input.noInviteEmailConfirmed ?? false,
    noSchemaMigrationConfirmed: input.noSchemaMigrationConfirmed ?? false,
    noAiProviderCallConfirmed: input.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: input.noExecutionConfirmed ?? false,
  };
}

function hasValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(
  score: number,
): TesterSecondTesterAccountWritePilotSeverity {
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
): TesterSecondTesterAccountWritePilotBoardItem {
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

export function buildTesterSecondTesterAccountWritePilotReport(
  input: TesterSecondTesterAccountWritePilotInput = {},
): TesterSecondTesterAccountWritePilotReport {
  const normalized = normalizeInput(input);

  const firstTesterEmailValid = hasValidEmail(normalized.firstTesterEmail);
  const secondTesterEmailValid = hasValidEmail(normalized.secondTesterEmail);
  const requestedRoleOk = normalized.secondTesterRole === "OPERATOR";
  const languageFallbackRequired = !normalized.schemaHasLanguageField;
  const languageLimitationAccepted =
    !languageFallbackRequired || normalized.acceptLimitations;
  const bodyConfirmOk =
    normalized.confirm === SECOND_TESTER_ACCOUNT_WRITE_CONFIRM;

  const safetyConfirmed =
    normalized.noPublicSignupConfirmed &&
    normalized.noPasswordWriteConfirmed &&
    normalized.noInviteEmailConfirmed &&
    normalized.noSchemaMigrationConfirmed &&
    normalized.noAiProviderCallConfirmed &&
    normalized.noExecutionConfirmed;

  const writeArmed =
    normalized.serverWriteEnabled &&
    normalized.serverConfirmConfigured &&
    bodyConfirmOk &&
    !normalized.dryRun;

  const findings: TesterSecondTesterAccountWritePilotFindingItem[] = [];

  if (!firstTesterEmailValid || !normalized.firstTesterDetected) {
    findings.push({
      id: "STAWP_FINDING_001",
      label: "First tester not detected",
      lane: "first_tester",
      severity: "critical",
      reason:
        "The existing first tester must be detected before writing a second tester account.",
      manualResolution: "Verify the first tester account and email.",
      blocksWritePilot: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterRoleCompatible) {
    findings.push({
      id: "STAWP_FINDING_002",
      label: "First tester role not compatible",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester role is not compatible.",
      manualResolution: "Resolve role mapping before second tester write.",
      blocksWritePilot: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterHasPasswordHash) {
    findings.push({
      id: "STAWP_FINDING_003",
      label: "First tester login method missing",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester has no passwordHash.",
      manualResolution: "Restore first tester login readiness before proceeding.",
      blocksWritePilot: true,
    });
  }

  if (!secondTesterEmailValid) {
    findings.push({
      id: "STAWP_FINDING_004",
      label: "Second tester email missing or invalid",
      lane: "second_tester",
      severity: "critical",
      reason: "A valid second tester email is required.",
      manualResolution: "Provide a single valid second tester email.",
      blocksWritePilot: true,
    });
  }

  if (normalized.secondTesterExistingUserDetected) {
    findings.push({
      id: "STAWP_FINDING_005",
      label: "Second tester already exists",
      lane: "second_tester",
      severity: "critical",
      reason: "A user with this second tester email already exists.",
      manualResolution:
        "Use the existing user and move to access/login verification instead of account write.",
      blocksWritePilot: true,
    });
  }

  if (!normalized.previousAccessGateCleared) {
    findings.push({
      id: "STAWP_FINDING_006",
      label: "Previous access/login gate not cleared",
      lane: "readiness",
      severity: "critical",
      reason:
        "V20.8 must decide that second tester account write is required before V20.9.",
      manualResolution: "Complete V20.8 and confirm account write requirement.",
      blocksWritePilot: true,
    });
  }

  if (!normalized.schemaHasRoleField) {
    findings.push({
      id: "STAWP_FINDING_007",
      label: "Role field not available",
      lane: "schema_mapping",
      severity: "critical",
      reason:
        "The User schema must support a role field so the second tester can be OPERATOR.",
      manualResolution: "Do not write the user until role mapping is confirmed.",
      blocksWritePilot: true,
    });
  }

  if (!requestedRoleOk) {
    findings.push({
      id: "STAWP_FINDING_008",
      label: "Requested role not allowed",
      lane: "schema_mapping",
      severity: "critical",
      reason: "V20.9 only allows OPERATOR for second tester account creation.",
      manualResolution: "Use role OPERATOR only.",
      blocksWritePilot: true,
    });
  }

  if (languageFallbackRequired && !languageLimitationAccepted) {
    findings.push({
      id: "STAWP_FINDING_009",
      label: "Language fallback not accepted",
      lane: "schema_mapping",
      severity: "critical",
      reason:
        "The User schema does not expose a persistent language field and fallback was not accepted.",
      manualResolution:
        "Accept app-level language fallback or add a dedicated schema release first.",
      blocksWritePilot: true,
    });
  }

  if (!safetyConfirmed) {
    findings.push({
      id: "STAWP_FINDING_010",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason:
        "One or more no-signup/no-password/no-invite/no-migration/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm every safety lock before the write pilot.",
      blocksWritePilot: true,
    });
  }

  if (!normalized.dryRun && !writeArmed) {
    findings.push({
      id: "STAWP_FINDING_011",
      label: "Write pilot not armed",
      lane: "confirmation",
      severity: "critical",
      reason:
        "Real write requires server enablement, server confirmation, body confirmation and dryRun=false.",
      manualResolution:
        "Set server-side write pilot envs and pass the exact confirmation phrase.",
      blocksWritePilot: true,
    });
  }

  const firstTesterBoard = [
    boardItem(
      "STAWP_FIRST_001",
      "First tester validation",
      "first_tester",
      normalized.firstTesterDetected &&
        normalized.firstTesterRoleCompatible &&
        normalized.firstTesterHasPasswordHash
        ? 100
        : 0,
      ["firstTesterDetected", "firstTesterRoleCompatible", "firstTesterHasPasswordHash"],
      "The first tester remains valid before second tester write.",
    ),
  ];

  const secondTesterBoard = [
    boardItem(
      "STAWP_SECOND_001",
      "Second tester email and duplicate check",
      "second_tester",
      secondTesterEmailValid && !normalized.secondTesterExistingUserDetected
        ? 100
        : 0,
      ["secondTesterEmail", "existing user lookup"],
      "Only one new second tester account can be written.",
    ),
  ];

  const schemaMappingBoard = [
    boardItem(
      "STAWP_SCHEMA_001",
      "Role mapping",
      "schema_mapping",
      normalized.schemaHasRoleField && requestedRoleOk ? 100 : 0,
      ["User.role", "OPERATOR"],
      "Second tester is mapped to OPERATOR only.",
    ),
    boardItem(
      "STAWP_SCHEMA_002",
      "Language fallback",
      "schema_mapping",
      languageLimitationAccepted ? 100 : 0,
      ["language fallback", "app-level locale"],
      "Language remains app-level/manual because no persistent language field exists.",
    ),
  ];

  const confirmationBoard = [
    boardItem(
      "STAWP_CONFIRM_001",
      "Default dry-run mode",
      "confirmation",
      normalized.dryRun ? 100 : 70,
      ["dryRun=true default"],
      "No write happens unless dryRun=false and all confirmations pass.",
    ),
    boardItem(
      "STAWP_CONFIRM_002",
      "Write pilot confirmation",
      "confirmation",
      writeArmed ? 100 : 50,
      ["server env", "body confirm", "dryRun=false"],
      "Write pilot is armed only with explicit server and request confirmation.",
    ),
  ];

  const safetyBoard = [
    boardItem(
      "STAWP_SAFETY_001",
      "No-write side effects",
      "safety",
      safetyConfirmed ? 100 : 0,
      ["no public signup", "no password write", "no invite", "no migration", "no AI", "no execution"],
      "Only the protected User create path is eligible; all other side effects stay blocked.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "STAWP_NOGO_001",
      "Public signup",
      "no_go",
      0,
      ["publicSignupAllowed=false"],
      "No-go: public signup remains closed.",
    ),
    boardItem(
      "STAWP_NOGO_002",
      "Password and invite",
      "no_go",
      0,
      ["passwordWriteAllowed=false", "inviteEmailSendAllowed=false"],
      "No-go: V20.9 does not set passwords or send invite emails.",
    ),
    boardItem(
      "STAWP_NOGO_003",
      "AI/provider/execution",
      "no_go",
      0,
      ["providerCalled=false", "operationalExecutionAllowed=false"],
      "No-go: AI provider and operational execution remain disabled.",
    ),
  ];

  const pilotScore = clampScore(
    (firstTesterBoard[0].score +
      secondTesterBoard[0].score +
      schemaMappingBoard[0].score +
      schemaMappingBoard[1].score +
      confirmationBoard[0].score +
      confirmationBoard[1].score +
      safetyBoard[0].score) /
      7 -
      findings.filter((item) => item.blocksWritePilot).length * 20,
  );

  const hasBlocking = findings.some((item) => item.blocksWritePilot);

  const pilotStatus: TesterSecondTesterAccountWritePilotStatus = hasBlocking
    ? "blocked"
    : writeArmed
      ? "second-tester-write-candidate"
      : normalized.serverWriteEnabled && normalized.serverConfirmConfigured
        ? "write-pilot-armed"
        : "dry-run-preview-ready";

  const decision: TesterSecondTesterAccountWritePilotDecision = hasBlocking
    ? "BLOCKED"
    : normalized.dryRun
      ? "DRY_RUN_ONLY"
      : writeArmed
        ? "WRITE_CANDIDATE"
        : "WRITE_DISABLED";

  return {
    generatedAt: new Date().toISOString(),
    mode: normalized.dryRun
      ? "dry-run"
      : "protected-second-tester-account-write-pilot",
    input: normalized,
    readiness: TESTER_SECOND_TESTER_ACCOUNT_WRITE_PILOT_GUARDRAIL,
    pilotScore,
    pilotStatus,
    decision,
    firstTesterBoard,
    secondTesterBoard,
    schemaMappingBoard,
    confirmationBoard,
    safetyBoard,
    noGoBoard,
    findings,
    safetySummary: [
      "V20.9 introduces a protected second tester account write pilot route.",
      "The route is dry-run by default and does not create users during deploy or checks.",
      "Real write requires CRON_SECRET, server-side enablement, exact confirmation phrase and dryRun=false.",
      "Only a User record with role OPERATOR is eligible; no passwordHash, invite email, public signup, schema write, migration, AI provider call or operational execution is enabled.",
      "Language is handled as app-level/manual fallback because the current User schema has no persistent language field.",
    ],
  };
}

export const testerSecondTesterAccountWritePilotVersion = "V20.9";
