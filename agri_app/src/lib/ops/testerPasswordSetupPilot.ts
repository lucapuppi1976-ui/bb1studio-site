export type TesterPasswordSetupMode = "dry-run" | "protected-tester-password-setup";
export type TesterPasswordSetupStatus =
  | "blocked"
  | "dry-run-preview-ready"
  | "password-setup-armed"
  | "password-write-candidate";
export type TesterPasswordSetupSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterPasswordSetupInput {
  email?: string;
  userDetected?: boolean;
  roleValue?: string;
  roleCompatible?: boolean;
  hasPasswordHash?: boolean;
  emailVerified?: boolean;
  passwordCandidateProvided?: boolean;
  passwordLengthOk?: boolean;
  dryRun?: boolean;
  confirm?: string;
  serverWriteEnabled?: boolean;
  serverConfirmConfigured?: boolean;
}

export interface TesterPasswordSetupFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterPasswordSetupSeverity;
  reason: string;
  manualResolution: string;
  blocksPasswordSetup: boolean;
}

export interface TesterPasswordSetupBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterPasswordSetupSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export const TESTER_PASSWORD_SETUP_CONFIRM = "CONFIRM_V20_1_TESTER_PASSWORD_SETUP";

export const TESTER_PASSWORD_SETUP_GUARDRAIL = {
  testerPasswordSetupPilotReady: true,
  protectedTesterPasswordSetupRouteReady: true,
  defaultDryRunOnly: true,
  serverWriteEnabledRequired: true,
  serverConfirmRequired: true,
  bodyConfirmRequired: true,
  existingTesterOnly: true,
  passwordHashWriteAllowed: false,
  automaticPasswordWriteAllowed: false,
  accountCreateAllowed: false,
  accountCreatePerformed: false,
  publicSignupAllowed: false,
  publicSignupPerformed: false,
  inviteEmailSendAllowed: false,
  inviteEmailSendPerformed: false,
  oauthLinkWriteAllowed: false,
  oauthLinkWritePerformed: false,
  emailVerifiedWriteAllowed: false,
  emailVerifiedWritePerformed: false,
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
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  humanReviewRequired: true,
  redactedOutputOnly: true,
} as const;

export interface TesterPasswordSetupReport {
  generatedAt: string;
  mode: TesterPasswordSetupMode;
  input: Required<TesterPasswordSetupInput>;
  readiness: typeof TESTER_PASSWORD_SETUP_GUARDRAIL;
  setupScore: number;
  setupStatus: TesterPasswordSetupStatus;
  decision: "DRY_RUN_ONLY" | "WRITE_DISABLED" | "PASSWORD_WRITE_CANDIDATE" | "BLOCKED";
  preflightBoard: TesterPasswordSetupBoardItem[];
  confirmationBoard: TesterPasswordSetupBoardItem[];
  noGoBoard: TesterPasswordSetupBoardItem[];
  findings: TesterPasswordSetupFindingItem[];
  safetySummary: string[];
}

function normalizeInput(input: TesterPasswordSetupInput): Required<TesterPasswordSetupInput> {
  return {
    email: input.email ?? "",
    userDetected: input.userDetected ?? false,
    roleValue: input.roleValue ?? "",
    roleCompatible: input.roleCompatible ?? false,
    hasPasswordHash: input.hasPasswordHash ?? false,
    emailVerified: input.emailVerified ?? false,
    passwordCandidateProvided: input.passwordCandidateProvided ?? false,
    passwordLengthOk: input.passwordLengthOk ?? false,
    dryRun: input.dryRun ?? true,
    confirm: input.confirm ?? "",
    serverWriteEnabled: input.serverWriteEnabled ?? false,
    serverConfirmConfigured: input.serverConfirmConfigured ?? false,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterPasswordSetupSeverity {
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
): TesterPasswordSetupBoardItem {
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

function hasValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

export function buildTesterPasswordSetupReport(input: TesterPasswordSetupInput = {}): TesterPasswordSetupReport {
  const normalized = normalizeInput(input);
  const validEmail = hasValidEmail(normalized.email);
  const bodyConfirmOk = normalized.confirm === TESTER_PASSWORD_SETUP_CONFIRM;
  const writeArmed =
    normalized.serverWriteEnabled &&
    normalized.serverConfirmConfigured &&
    bodyConfirmOk &&
    !normalized.dryRun;

  const findings: TesterPasswordSetupFindingItem[] = [];

  if (!validEmail) {
    findings.push({
      id: "TPS_FINDING_001",
      label: "Tester email missing or invalid",
      lane: "preflight",
      severity: "critical",
      reason: "A valid tester email is required.",
      manualResolution: "Provide the existing tester email.",
      blocksPasswordSetup: true,
    });
  }

  if (!normalized.userDetected) {
    findings.push({
      id: "TPS_FINDING_002",
      label: "Tester account not detected",
      lane: "preflight",
      severity: "critical",
      reason: "The tester account must already exist before password setup.",
      manualResolution: "Do not create users here; verify the existing tester account first.",
      blocksPasswordSetup: true,
    });
  }

  if (normalized.userDetected && !normalized.roleCompatible) {
    findings.push({
      id: "TPS_FINDING_003",
      label: "Tester role not compatible",
      lane: "preflight",
      severity: "critical",
      reason: "The tester role is not compatible with UAT access.",
      manualResolution: "Resolve role mapping before password setup.",
      blocksPasswordSetup: true,
    });
  }

  if (normalized.hasPasswordHash) {
    findings.push({
      id: "TPS_FINDING_004",
      label: "Password already configured",
      lane: "preflight",
      severity: "critical",
      reason: "The tester already has a passwordHash.",
      manualResolution: "Do not overwrite password in this pilot; use a reset flow.",
      blocksPasswordSetup: true,
    });
  }

  if (!normalized.passwordCandidateProvided) {
    findings.push({
      id: "TPS_FINDING_005",
      label: "Password candidate missing",
      lane: "preflight",
      severity: "critical",
      reason: "A temporary password candidate is required for setup.",
      manualResolution: "Provide a temporary password with at least 12 characters.",
      blocksPasswordSetup: true,
    });
  }

  if (normalized.passwordCandidateProvided && !normalized.passwordLengthOk) {
    findings.push({
      id: "TPS_FINDING_006",
      label: "Password candidate too short",
      lane: "preflight",
      severity: "critical",
      reason: "Temporary password must be at least 12 characters.",
      manualResolution: "Use a stronger temporary password.",
      blocksPasswordSetup: true,
    });
  }

  if (!normalized.dryRun && !writeArmed) {
    findings.push({
      id: "TPS_FINDING_007",
      label: "Password write not armed",
      lane: "confirmation",
      severity: "critical",
      reason: "Real password setup requires server enablement, server confirmation and body confirmation.",
      manualResolution: "Set server-side envs and pass the exact confirmation phrase.",
      blocksPasswordSetup: true,
    });
  }

  const preflightBoard = [
    boardItem(
      "TPS_PREFLIGHT_001",
      "Existing tester account",
      "preflight",
      normalized.userDetected && validEmail ? 100 : 0,
      ["email", "user id"],
      "Password setup only targets an existing tester.",
    ),
    boardItem(
      "TPS_PREFLIGHT_002",
      "Role compatibility",
      "preflight",
      normalized.roleCompatible ? 100 : 0,
      ["OPERATOR", "SUPER_ADMIN"],
      "Role must be compatible before login setup.",
    ),
    boardItem(
      "TPS_PREFLIGHT_003",
      "Password candidate",
      "preflight",
      normalized.passwordCandidateProvided && normalized.passwordLengthOk ? 100 : 0,
      ["temporary password length >= 12"],
      "Password candidate is validated without logging it.",
    ),
  ];

  const confirmationBoard = [
    boardItem(
      "TPS_CONFIRM_001",
      "Default dry-run mode",
      "confirmation",
      normalized.dryRun ? 100 : 70,
      ["dryRun=true by default"],
      "No password write happens unless dryRun=false and all confirmations pass.",
    ),
    boardItem(
      "TPS_CONFIRM_002",
      "Server and body confirmation",
      "confirmation",
      writeArmed ? 100 : 50,
      ["server env", "body confirm"],
      "Password write is armed only with explicit server and request confirmation.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TPS_NOGO_001",
      "Account creation",
      "no_go",
      0,
      ["accountCreateAllowed=false"],
      "No-go: V20.1 does not create accounts.",
    ),
    boardItem(
      "TPS_NOGO_002",
      "Public signup",
      "no_go",
      0,
      ["publicSignupAllowed=false"],
      "No-go: public signup remains closed.",
    ),
    boardItem(
      "TPS_NOGO_003",
      "Email invite",
      "no_go",
      0,
      ["inviteEmailSendAllowed=false"],
      "No-go: no invite email is sent.",
    ),
  ];

  const setupScore = clampScore(
    (preflightBoard[0].score +
      preflightBoard[1].score +
      preflightBoard[2].score +
      confirmationBoard[0].score +
      confirmationBoard[1].score) /
      5 -
      findings.filter((item) => item.blocksPasswordSetup).length * 20,
  );

  const hasBlocking = findings.some((item) => item.blocksPasswordSetup);
  const setupStatus: TesterPasswordSetupStatus = hasBlocking
    ? "blocked"
    : writeArmed
      ? "password-write-candidate"
      : normalized.serverWriteEnabled && normalized.serverConfirmConfigured
        ? "password-setup-armed"
        : "dry-run-preview-ready";

  const decision =
    hasBlocking
      ? "BLOCKED"
      : normalized.dryRun
        ? "DRY_RUN_ONLY"
        : writeArmed
          ? "PASSWORD_WRITE_CANDIDATE"
          : "WRITE_DISABLED";

  return {
    generatedAt: new Date().toISOString(),
    mode: normalized.dryRun ? "dry-run" : "protected-tester-password-setup",
    input: normalized,
    readiness: TESTER_PASSWORD_SETUP_GUARDRAIL,
    setupScore,
    setupStatus,
    decision,
    preflightBoard,
    confirmationBoard,
    noGoBoard,
    findings,
    safetySummary: [
      "V20.1 introduces a protected password setup pilot for an existing tester only.",
      "The route is dry-run by default and does not write passwordHash during deploy or checks.",
      "Real write requires CRON_SECRET, server-side enablement, exact confirmation phrase and dryRun=false.",
      "No account creation, invite email, public signup, schema write, migration, AI provider call or operational execution is enabled.",
    ],
  };
}

export const testerPasswordSetupPilotVersion = "V20.1";
