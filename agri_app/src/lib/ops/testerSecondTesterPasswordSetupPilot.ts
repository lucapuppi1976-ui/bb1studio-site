export type TesterSecondTesterPasswordSetupPilotMode =
  | "dry-run"
  | "protected-second-tester-password-setup-pilot";

export type TesterSecondTesterPasswordSetupPilotStatus =
  | "blocked"
  | "dry-run-preview-ready"
  | "write-pilot-armed"
  | "password-write-candidate"
  | "password-already-configured";

export type TesterSecondTesterPasswordSetupPilotSeverity =
  | "info"
  | "watch"
  | "elevated"
  | "critical";

export type TesterSecondTesterPasswordSetupPilotDecision =
  | "DRY_RUN_ONLY"
  | "WRITE_DISABLED"
  | "WRITE_CANDIDATE"
  | "BLOCKED";

export interface TesterSecondTesterPasswordSetupPilotInput {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  dryRun?: boolean;
  confirm?: string;
  previousAccountWriteCleared?: boolean;
  firstTesterDetected?: boolean;
  firstTesterRoleCompatible?: boolean;
  firstTesterHasPasswordHash?: boolean;
  secondTesterDetected?: boolean;
  secondTesterRoleValue?: string;
  secondTesterRoleCompatible?: boolean;
  secondTesterHasPasswordHash?: boolean;
  schemaHasPasswordHashField?: boolean;
  passwordCandidateProvided?: boolean;
  passwordLengthOk?: boolean;
  serverWriteEnabled?: boolean;
  serverConfirmConfigured?: boolean;
  passwordWriteOnlyConfirmed?: boolean;
  noAccountCreateConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
}

export interface TesterSecondTesterPasswordSetupPilotBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterSecondTesterPasswordSetupPilotSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterSecondTesterPasswordSetupPilotFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterSecondTesterPasswordSetupPilotSeverity;
  reason: string;
  manualResolution: string;
  blocksPasswordSetup: boolean;
}

export const SECOND_TESTER_PASSWORD_SETUP_CONFIRM =
  "CONFIRM_V21_0_SECOND_TESTER_PASSWORD_SETUP";

export const TESTER_SECOND_TESTER_PASSWORD_SETUP_PILOT_GUARDRAIL = {
  testerSecondTesterPasswordSetupPilotReady: true,
  protectedSecondTesterPasswordWriteRouteReady: true,
  defaultDryRunOnly: true,
  serverWriteEnabledRequired: true,
  serverConfirmRequired: true,
  bodyConfirmRequired: true,
  oneSecondTesterPasswordPilotOnly: true,
  passwordHashWriteOnly: true,
  accountCreateAllowed: false,
  accountCreatePerformed: false,
  inviteEmailSendAllowed: false,
  inviteEmailSendPerformed: false,
  publicSignupAllowed: false,
  publicSignupPerformed: false,
  oauthLinkWriteAllowed: false,
  oauthLinkWritePerformed: false,
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

export interface TesterSecondTesterPasswordSetupPilotReport {
  generatedAt: string;
  mode: TesterSecondTesterPasswordSetupPilotMode;
  input: Required<TesterSecondTesterPasswordSetupPilotInput>;
  readiness: typeof TESTER_SECOND_TESTER_PASSWORD_SETUP_PILOT_GUARDRAIL;
  pilotScore: number;
  pilotStatus: TesterSecondTesterPasswordSetupPilotStatus;
  decision: TesterSecondTesterPasswordSetupPilotDecision;
  firstTesterBoard: TesterSecondTesterPasswordSetupPilotBoardItem[];
  secondTesterBoard: TesterSecondTesterPasswordSetupPilotBoardItem[];
  passwordBoard: TesterSecondTesterPasswordSetupPilotBoardItem[];
  confirmationBoard: TesterSecondTesterPasswordSetupPilotBoardItem[];
  safetyBoard: TesterSecondTesterPasswordSetupPilotBoardItem[];
  noGoBoard: TesterSecondTesterPasswordSetupPilotBoardItem[];
  findings: TesterSecondTesterPasswordSetupPilotFindingItem[];
  safetySummary: string[];
}

function normalizeInput(
  input: TesterSecondTesterPasswordSetupPilotInput,
): Required<TesterSecondTesterPasswordSetupPilotInput> {
  return {
    firstTesterEmail: input.firstTesterEmail ?? "",
    secondTesterEmail: input.secondTesterEmail ?? "",
    dryRun: input.dryRun ?? true,
    confirm: input.confirm ?? "",
    previousAccountWriteCleared: input.previousAccountWriteCleared ?? false,
    firstTesterDetected: input.firstTesterDetected ?? false,
    firstTesterRoleCompatible: input.firstTesterRoleCompatible ?? false,
    firstTesterHasPasswordHash: input.firstTesterHasPasswordHash ?? false,
    secondTesterDetected: input.secondTesterDetected ?? false,
    secondTesterRoleValue: input.secondTesterRoleValue ?? "",
    secondTesterRoleCompatible: input.secondTesterRoleCompatible ?? false,
    secondTesterHasPasswordHash: input.secondTesterHasPasswordHash ?? false,
    schemaHasPasswordHashField: input.schemaHasPasswordHashField ?? false,
    passwordCandidateProvided: input.passwordCandidateProvided ?? false,
    passwordLengthOk: input.passwordLengthOk ?? false,
    serverWriteEnabled: input.serverWriteEnabled ?? false,
    serverConfirmConfigured: input.serverConfirmConfigured ?? false,
    passwordWriteOnlyConfirmed: input.passwordWriteOnlyConfirmed ?? false,
    noAccountCreateConfirmed: input.noAccountCreateConfirmed ?? false,
    noInviteEmailConfirmed: input.noInviteEmailConfirmed ?? false,
    noPublicSignupConfirmed: input.noPublicSignupConfirmed ?? false,
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
): TesterSecondTesterPasswordSetupPilotSeverity {
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
): TesterSecondTesterPasswordSetupPilotBoardItem {
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

export function buildTesterSecondTesterPasswordSetupPilotReport(
  input: TesterSecondTesterPasswordSetupPilotInput = {},
): TesterSecondTesterPasswordSetupPilotReport {
  const normalized = normalizeInput(input);

  const firstTesterEmailValid = hasValidEmail(normalized.firstTesterEmail);
  const secondTesterEmailValid = hasValidEmail(normalized.secondTesterEmail);
  const bodyConfirmOk =
    normalized.confirm === SECOND_TESTER_PASSWORD_SETUP_CONFIRM;

  const safetyConfirmed =
    normalized.passwordWriteOnlyConfirmed &&
    normalized.noAccountCreateConfirmed &&
    normalized.noInviteEmailConfirmed &&
    normalized.noPublicSignupConfirmed &&
    normalized.noSchemaMigrationConfirmed &&
    normalized.noAiProviderCallConfirmed &&
    normalized.noExecutionConfirmed;

  const writeArmed =
    normalized.serverWriteEnabled &&
    normalized.serverConfirmConfigured &&
    bodyConfirmOk &&
    !normalized.dryRun;

  const findings: TesterSecondTesterPasswordSetupPilotFindingItem[] = [];

  if (!firstTesterEmailValid || !normalized.firstTesterDetected) {
    findings.push({
      id: "STPSP_FINDING_001",
      label: "First tester not detected",
      lane: "first_tester",
      severity: "critical",
      reason:
        "The existing first tester must be detected before second tester password setup.",
      manualResolution: "Verify the first tester account and email.",
      blocksPasswordSetup: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterRoleCompatible) {
    findings.push({
      id: "STPSP_FINDING_002",
      label: "First tester role not compatible",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester role is not compatible.",
      manualResolution: "Resolve first tester role mapping.",
      blocksPasswordSetup: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterHasPasswordHash) {
    findings.push({
      id: "STPSP_FINDING_003",
      label: "First tester login method missing",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester has no passwordHash.",
      manualResolution:
        "Restore first tester login readiness before proceeding.",
      blocksPasswordSetup: true,
    });
  }

  if (!secondTesterEmailValid || !normalized.secondTesterDetected) {
    findings.push({
      id: "STPSP_FINDING_004",
      label: "Second tester not detected",
      lane: "second_tester",
      severity: "critical",
      reason:
        "The second tester account must already exist before password setup.",
      manualResolution: "Complete V20.9 account write and verification first.",
      blocksPasswordSetup: true,
    });
  }

  if (normalized.secondTesterDetected && !normalized.secondTesterRoleCompatible) {
    findings.push({
      id: "STPSP_FINDING_005",
      label: "Second tester role not compatible",
      lane: "second_tester",
      severity: "critical",
      reason: "The second tester role is not compatible with UAT.",
      manualResolution: "Review second tester role before password setup.",
      blocksPasswordSetup: true,
    });
  }

  if (!normalized.previousAccountWriteCleared) {
    findings.push({
      id: "STPSP_FINDING_006",
      label: "Previous account write not cleared",
      lane: "readiness",
      severity: "critical",
      reason:
        "V20.9 account write/verification must be completed before V21.0.",
      manualResolution: "Complete V20.9 D2 before password setup.",
      blocksPasswordSetup: true,
    });
  }

  if (!normalized.schemaHasPasswordHashField) {
    findings.push({
      id: "STPSP_FINDING_007",
      label: "PasswordHash field not available",
      lane: "schema",
      severity: "critical",
      reason:
        "The User schema must expose passwordHash before password setup.",
      manualResolution:
        "Do not write the password until schema compatibility is confirmed.",
      blocksPasswordSetup: true,
    });
  }

  if (!normalized.passwordCandidateProvided || !normalized.passwordLengthOk) {
    findings.push({
      id: "STPSP_FINDING_008",
      label: "Temporary password invalid",
      lane: "password",
      severity: "critical",
      reason:
        "A temporary password of at least 12 characters is required.",
      manualResolution:
        "Provide a strong temporary password and transmit it manually to the tester.",
      blocksPasswordSetup: true,
    });
  }

  if (normalized.secondTesterHasPasswordHash && !normalized.dryRun) {
    findings.push({
      id: "STPSP_FINDING_009",
      label: "Second tester already has passwordHash",
      lane: "password",
      severity: "critical",
      reason:
        "The password setup pilot does not overwrite an existing passwordHash.",
      manualResolution:
        "Use the existing login path or create a separate reset-flow release.",
      blocksPasswordSetup: true,
    });
  }

  if (!safetyConfirmed) {
    findings.push({
      id: "STPSP_FINDING_010",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason:
        "One or more password-only/no-account/no-invite/no-signup/no-migration/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm every safety lock before password setup.",
      blocksPasswordSetup: true,
    });
  }

  if (!normalized.dryRun && !writeArmed) {
    findings.push({
      id: "STPSP_FINDING_011",
      label: "Password setup pilot not armed",
      lane: "confirmation",
      severity: "critical",
      reason:
        "Real password write requires server enablement, server confirmation, body confirmation and dryRun=false.",
      manualResolution:
        "Set server-side password setup envs and pass the exact confirmation phrase.",
      blocksPasswordSetup: true,
    });
  }

  const firstTesterBoard = [
    boardItem(
      "STPSP_FIRST_001",
      "First tester validation",
      "first_tester",
      normalized.firstTesterDetected &&
        normalized.firstTesterRoleCompatible &&
        normalized.firstTesterHasPasswordHash
        ? 100
        : 0,
      [
        "firstTesterDetected",
        "firstTesterRoleCompatible",
        "firstTesterHasPasswordHash",
      ],
      "The first tester remains valid before second tester password setup.",
    ),
  ];

  const secondTesterBoard = [
    boardItem(
      "STPSP_SECOND_001",
      "Second tester account validation",
      "second_tester",
      normalized.secondTesterDetected && normalized.secondTesterRoleCompatible
        ? 100
        : 0,
      ["secondTesterDetected", "secondTesterRoleCompatible"],
      "The second tester account exists and has OPERATOR-compatible access.",
    ),
    boardItem(
      "STPSP_SECOND_002",
      "Existing passwordHash state",
      "second_tester",
      normalized.secondTesterHasPasswordHash ? 75 : 100,
      ["secondTesterHasPasswordHash"],
      "PasswordHash state is detected before any write.",
    ),
  ];

  const passwordBoard = [
    boardItem(
      "STPSP_PASSWORD_001",
      "Password candidate",
      "password",
      normalized.passwordCandidateProvided && normalized.passwordLengthOk
        ? 100
        : 0,
      ["temporaryPassword", "min length 12"],
      "Temporary password is accepted only for hashing; it is never returned.",
    ),
    boardItem(
      "STPSP_PASSWORD_002",
      "Schema passwordHash mapping",
      "password",
      normalized.schemaHasPasswordHashField ? 100 : 0,
      ["User.passwordHash"],
      "Only passwordHash is eligible for update.",
    ),
  ];

  const confirmationBoard = [
    boardItem(
      "STPSP_CONFIRM_001",
      "Default dry-run mode",
      "confirmation",
      normalized.dryRun ? 100 : 70,
      ["dryRun=true default"],
      "No write happens unless dryRun=false and all confirmations pass.",
    ),
    boardItem(
      "STPSP_CONFIRM_002",
      "Password write confirmation",
      "confirmation",
      writeArmed ? 100 : 50,
      ["server env", "body confirm", "dryRun=false"],
      "Password setup is armed only with explicit server and request confirmation.",
    ),
  ];

  const safetyBoard = [
    boardItem(
      "STPSP_SAFETY_001",
      "Password-only safety",
      "safety",
      safetyConfirmed ? 100 : 0,
      [
        "password write only",
        "no account create",
        "no invite email",
        "no signup",
        "no migration",
        "no AI",
        "no execution",
      ],
      "Only passwordHash update is eligible; every other side effect stays blocked.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "STPSP_NOGO_001",
      "Account creation",
      "no_go",
      0,
      ["accountCreateAllowed=false"],
      "No-go: V21.0 does not create users.",
    ),
    boardItem(
      "STPSP_NOGO_002",
      "Invite email and public signup",
      "no_go",
      0,
      ["inviteEmailSendAllowed=false", "publicSignupAllowed=false"],
      "No-go: no invite email and no public signup.",
    ),
    boardItem(
      "STPSP_NOGO_003",
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
      secondTesterBoard[1].score +
      passwordBoard[0].score +
      passwordBoard[1].score +
      confirmationBoard[0].score +
      confirmationBoard[1].score +
      safetyBoard[0].score) /
      8 -
      findings.filter((item) => item.blocksPasswordSetup).length * 20,
  );

  const hasBlocking = findings.some((item) => item.blocksPasswordSetup);

  const pilotStatus: TesterSecondTesterPasswordSetupPilotStatus = hasBlocking
    ? "blocked"
    : normalized.secondTesterHasPasswordHash && normalized.dryRun
      ? "password-already-configured"
      : writeArmed
        ? "password-write-candidate"
        : normalized.serverWriteEnabled && normalized.serverConfirmConfigured
          ? "write-pilot-armed"
          : "dry-run-preview-ready";

  const decision: TesterSecondTesterPasswordSetupPilotDecision = hasBlocking
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
      : "protected-second-tester-password-setup-pilot",
    input: normalized,
    readiness: TESTER_SECOND_TESTER_PASSWORD_SETUP_PILOT_GUARDRAIL,
    pilotScore,
    pilotStatus,
    decision,
    firstTesterBoard,
    secondTesterBoard,
    passwordBoard,
    confirmationBoard,
    safetyBoard,
    noGoBoard,
    findings,
    safetySummary: [
      "V21.0 introduces a protected second tester password setup pilot route.",
      "The route is dry-run by default and does not write passwordHash during deploy or checks.",
      "Real password setup requires CRON_SECRET, server-side enablement, exact confirmation phrase and dryRun=false.",
      "Only passwordHash update is eligible; no user creation, invite email, public signup, schema write, migration, AI provider call or operational execution is enabled.",
      "The temporary password is never returned in the API response.",
    ],
  };
}

export const testerSecondTesterPasswordSetupPilotVersion = "V21.0";
