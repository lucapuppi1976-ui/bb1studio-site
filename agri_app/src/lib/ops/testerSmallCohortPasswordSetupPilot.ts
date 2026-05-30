export type TesterSmallCohortPasswordSetupPilotMode =
  | "dry-run"
  | "protected-small-cohort-password-setup-pilot";

export type TesterSmallCohortPasswordSetupPilotDecision =
  | "DRY_RUN_ONLY"
  | "WRITE_DISABLED"
  | "WRITE_CANDIDATES"
  | "BLOCKED";

export type TesterSmallCohortPasswordSetupPilotStatus =
  | "blocked"
  | "dry-run-preview-ready"
  | "write-pilot-armed"
  | "password-write-candidates"
  | "password-already-configured";

export type TesterSmallCohortPasswordSetupPilotSeverity =
  | "info"
  | "watch"
  | "elevated"
  | "critical";

export interface TesterSmallCohortPasswordSetupPilotInput {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  targetCohortSize?: number;
  candidateEmails?: string[];
  dryRun?: boolean;
  confirm?: string;

  firstTesterDetected?: boolean;
  firstTesterRoleCompatible?: boolean;
  firstTesterHasPasswordHash?: boolean;

  secondTesterDetected?: boolean;
  secondTesterRoleValue?: string;
  secondTesterRoleCompatible?: boolean;
  secondTesterHasPasswordHash?: boolean;

  previousAccountWritePilotClosed?: boolean;
  writePathsClosedConfirmed?: boolean;

  candidateEmailCount?: number;
  duplicateCandidateEmailDetected?: boolean;
  candidateExistingUserCount?: number;
  candidateRoleCompatibleCount?: number;
  candidatePasswordHashCount?: number;
  candidatePasswordCount?: number;
  candidatePasswordLengthOkCount?: number;

  schemaHasPasswordHashField?: boolean;
  serverWriteEnabled?: boolean;
  serverConfirmConfigured?: boolean;

  passwordWriteOnlyConfirmed?: boolean;
  noAccountCreateConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  noEvidencePersistenceConfirmed?: boolean;
}

export interface TesterSmallCohortPasswordSetupPilotBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterSmallCohortPasswordSetupPilotSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterSmallCohortPasswordSetupPilotFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterSmallCohortPasswordSetupPilotSeverity;
  reason: string;
  manualResolution: string;
  blocksPasswordSetup: boolean;
}

export const SMALL_COHORT_PASSWORD_SETUP_CONFIRM =
  "CONFIRM_V21_8_SMALL_COHORT_PASSWORD_SETUP";

export const TESTER_SMALL_COHORT_PASSWORD_SETUP_PILOT_GUARDRAIL = {
  testerSmallCohortPasswordSetupPilotReady: true,
  protectedSmallCohortPasswordWriteRouteReady: true,
  defaultDryRunOnly: true,
  serverWriteEnabledRequired: true,
  serverConfirmRequired: true,
  bodyConfirmRequired: true,
  smallCohortLimitReady: true,
  minCohortSize: 3,
  maxCohortSize: 5,
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

export interface TesterSmallCohortPasswordSetupPilotReport {
  generatedAt: string;
  mode: TesterSmallCohortPasswordSetupPilotMode;
  input: Required<TesterSmallCohortPasswordSetupPilotInput>;
  readiness: typeof TESTER_SMALL_COHORT_PASSWORD_SETUP_PILOT_GUARDRAIL;
  baselineScore: number;
  candidateScore: number;
  passwordScore: number;
  confirmationScore: number;
  safetyScore: number;
  pilotScore: number;
  pilotStatus: TesterSmallCohortPasswordSetupPilotStatus;
  decision: TesterSmallCohortPasswordSetupPilotDecision;
  baselineBoard: TesterSmallCohortPasswordSetupPilotBoardItem[];
  candidateBoard: TesterSmallCohortPasswordSetupPilotBoardItem[];
  passwordBoard: TesterSmallCohortPasswordSetupPilotBoardItem[];
  confirmationBoard: TesterSmallCohortPasswordSetupPilotBoardItem[];
  safetyBoard: TesterSmallCohortPasswordSetupPilotBoardItem[];
  noGoBoard: TesterSmallCohortPasswordSetupPilotBoardItem[];
  findings: TesterSmallCohortPasswordSetupPilotFindingItem[];
  safetySummary: string[];
}

function normalizeInput(
  input: TesterSmallCohortPasswordSetupPilotInput,
): Required<TesterSmallCohortPasswordSetupPilotInput> {
  return {
    firstTesterEmail: input.firstTesterEmail ?? "",
    secondTesterEmail: input.secondTesterEmail ?? "",
    targetCohortSize: input.targetCohortSize ?? 3,
    candidateEmails: input.candidateEmails ?? [],
    dryRun: input.dryRun ?? true,
    confirm: input.confirm ?? "",

    firstTesterDetected: input.firstTesterDetected ?? false,
    firstTesterRoleCompatible: input.firstTesterRoleCompatible ?? false,
    firstTesterHasPasswordHash: input.firstTesterHasPasswordHash ?? false,

    secondTesterDetected: input.secondTesterDetected ?? false,
    secondTesterRoleValue: input.secondTesterRoleValue ?? "",
    secondTesterRoleCompatible: input.secondTesterRoleCompatible ?? false,
    secondTesterHasPasswordHash: input.secondTesterHasPasswordHash ?? false,

    previousAccountWritePilotClosed: input.previousAccountWritePilotClosed ?? false,
    writePathsClosedConfirmed: input.writePathsClosedConfirmed ?? false,

    candidateEmailCount: input.candidateEmailCount ?? 0,
    duplicateCandidateEmailDetected: input.duplicateCandidateEmailDetected ?? false,
    candidateExistingUserCount: input.candidateExistingUserCount ?? 0,
    candidateRoleCompatibleCount: input.candidateRoleCompatibleCount ?? 0,
    candidatePasswordHashCount: input.candidatePasswordHashCount ?? 0,
    candidatePasswordCount: input.candidatePasswordCount ?? 0,
    candidatePasswordLengthOkCount: input.candidatePasswordLengthOkCount ?? 0,

    schemaHasPasswordHashField: input.schemaHasPasswordHashField ?? false,
    serverWriteEnabled: input.serverWriteEnabled ?? false,
    serverConfirmConfigured: input.serverConfirmConfigured ?? false,

    passwordWriteOnlyConfirmed: input.passwordWriteOnlyConfirmed ?? false,
    noAccountCreateConfirmed: input.noAccountCreateConfirmed ?? false,
    noInviteEmailConfirmed: input.noInviteEmailConfirmed ?? false,
    noPublicSignupConfirmed: input.noPublicSignupConfirmed ?? false,
    noSchemaMigrationConfirmed: input.noSchemaMigrationConfirmed ?? false,
    noAiProviderCallConfirmed: input.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: input.noExecutionConfirmed ?? false,
    noEvidencePersistenceConfirmed: input.noEvidencePersistenceConfirmed ?? false,
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
): TesterSmallCohortPasswordSetupPilotSeverity {
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
): TesterSmallCohortPasswordSetupPilotBoardItem {
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

export function buildTesterSmallCohortPasswordSetupPilotReport(
  input: TesterSmallCohortPasswordSetupPilotInput = {},
): TesterSmallCohortPasswordSetupPilotReport {
  const normalized = normalizeInput(input);
  const targetCohortSize = Math.max(1, normalized.targetCohortSize);

  const allCandidateEmailsValid =
    normalized.candidateEmails.length > 0 &&
    normalized.candidateEmails.every((email) => hasValidEmail(email));

  const bodyConfirmOk = normalized.confirm === SMALL_COHORT_PASSWORD_SETUP_CONFIRM;
  const writeArmed =
    normalized.serverWriteEnabled &&
    normalized.serverConfirmConfigured &&
    bodyConfirmOk &&
    !normalized.dryRun;

  const baselineReady =
    hasValidEmail(normalized.firstTesterEmail) &&
    normalized.firstTesterDetected &&
    normalized.firstTesterRoleCompatible &&
    normalized.firstTesterHasPasswordHash &&
    hasValidEmail(normalized.secondTesterEmail) &&
    normalized.secondTesterDetected &&
    normalized.secondTesterRoleCompatible &&
    normalized.secondTesterHasPasswordHash &&
    normalized.previousAccountWritePilotClosed &&
    normalized.writePathsClosedConfirmed;

  const candidateReady =
    targetCohortSize >= 3 &&
    targetCohortSize <= 5 &&
    normalized.candidateEmailCount === targetCohortSize &&
    allCandidateEmailsValid &&
    !normalized.duplicateCandidateEmailDetected &&
    normalized.candidateExistingUserCount === targetCohortSize &&
    normalized.candidateRoleCompatibleCount === targetCohortSize;

  const passwordReady =
    normalized.schemaHasPasswordHashField &&
    normalized.candidatePasswordCount === targetCohortSize &&
    normalized.candidatePasswordLengthOkCount === targetCohortSize;

  const safetyReady =
    normalized.passwordWriteOnlyConfirmed &&
    normalized.noAccountCreateConfirmed &&
    normalized.noInviteEmailConfirmed &&
    normalized.noPublicSignupConfirmed &&
    normalized.noSchemaMigrationConfirmed &&
    normalized.noAiProviderCallConfirmed &&
    normalized.noExecutionConfirmed &&
    normalized.noEvidencePersistenceConfirmed;

  const findings: TesterSmallCohortPasswordSetupPilotFindingItem[] = [];

  if (!baselineReady) {
    findings.push({
      id: "SCPWD_FINDING_001",
      label: "Baseline readiness incomplete",
      lane: "baseline",
      severity: "critical",
      reason: "First/second tester readiness, V21.7 closure or write-path closure is incomplete.",
      manualResolution: "Complete V21.7 D2 and confirm baseline testers plus write-path closure.",
      blocksPasswordSetup: true,
    });
  }

  if (targetCohortSize < 3 || targetCohortSize > 5) {
    findings.push({
      id: "SCPWD_FINDING_002",
      label: "Target cohort size out of range",
      lane: "candidate",
      severity: "critical",
      reason: "V21.8 supports only 3 to 5 candidate password updates.",
      manualResolution: "Use a target cohort size between 3 and 5.",
      blocksPasswordSetup: true,
    });
  }

  if (!allCandidateEmailsValid || normalized.candidateEmailCount !== targetCohortSize) {
    findings.push({
      id: "SCPWD_FINDING_003",
      label: "Candidate email set invalid",
      lane: "candidate",
      severity: "critical",
      reason: "Candidate email count or email format is invalid.",
      manualResolution: "Provide exactly the target cohort size of valid candidate emails.",
      blocksPasswordSetup: true,
    });
  }

  if (normalized.duplicateCandidateEmailDetected) {
    findings.push({
      id: "SCPWD_FINDING_004",
      label: "Duplicate candidate email",
      lane: "candidate",
      severity: "critical",
      reason: "Duplicate candidate emails would make password setup unsafe.",
      manualResolution: "Deduplicate candidate list before password setup.",
      blocksPasswordSetup: true,
    });
  }

  if (normalized.candidateExistingUserCount !== targetCohortSize) {
    findings.push({
      id: "SCPWD_FINDING_005",
      label: "Candidate account missing",
      lane: "candidate",
      severity: "critical",
      reason: "Every candidate must already exist as a user before password setup.",
      manualResolution: "Complete V21.7 account write/verification first.",
      blocksPasswordSetup: true,
    });
  }

  if (normalized.candidateRoleCompatibleCount !== targetCohortSize) {
    findings.push({
      id: "SCPWD_FINDING_006",
      label: "Candidate role not compatible",
      lane: "candidate",
      severity: "critical",
      reason: "Every candidate must have OPERATOR-compatible role before password setup.",
      manualResolution: "Review candidate roles before password setup.",
      blocksPasswordSetup: true,
    });
  }

  if (!normalized.schemaHasPasswordHashField) {
    findings.push({
      id: "SCPWD_FINDING_007",
      label: "PasswordHash field unavailable",
      lane: "password",
      severity: "critical",
      reason: "User.passwordHash must be available for password setup.",
      manualResolution: "Do not write passwordHash until schema compatibility is confirmed.",
      blocksPasswordSetup: true,
    });
  }

  if (normalized.candidatePasswordCount !== targetCohortSize || normalized.candidatePasswordLengthOkCount !== targetCohortSize) {
    findings.push({
      id: "SCPWD_FINDING_008",
      label: "Temporary passwords invalid",
      lane: "password",
      severity: "critical",
      reason: "Every candidate needs one temporary password of at least 12 characters.",
      manualResolution: "Provide one strong temporary password per candidate.",
      blocksPasswordSetup: true,
    });
  }

  if (!normalized.dryRun && normalized.candidatePasswordHashCount > 0) {
    findings.push({
      id: "SCPWD_FINDING_009",
      label: "Candidate passwordHash already configured",
      lane: "password",
      severity: "critical",
      reason: "The password setup pilot does not overwrite existing passwordHash values.",
      manualResolution: "Use existing login path or create a separate reset-flow release.",
      blocksPasswordSetup: true,
    });
  }

  if (!safetyReady) {
    findings.push({
      id: "SCPWD_FINDING_010",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more password-only/no-account/no-invite/no-signup/no-migration/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm all safety locks before password setup.",
      blocksPasswordSetup: true,
    });
  }

  if (!normalized.dryRun && !writeArmed) {
    findings.push({
      id: "SCPWD_FINDING_011",
      label: "Password setup pilot not armed",
      lane: "confirmation",
      severity: "critical",
      reason: "Real password write requires server enablement, server confirmation, body confirmation and dryRun=false.",
      manualResolution: "Set server-side envs and pass exact confirmation phrase.",
      blocksPasswordSetup: true,
    });
  }

  const baselineScore = baselineReady ? 100 : 0;
  const candidateScore = candidateReady ? 100 : 0;
  const passwordScore = passwordReady ? 100 : 0;
  const confirmationScore = writeArmed ? 100 : normalized.dryRun ? 75 : 0;
  const safetyScore = safetyReady ? 100 : 0;

  const hasBlocking = findings.some((item) => item.blocksPasswordSetup);

  const pilotScore = clampScore(
    (baselineScore + candidateScore + passwordScore + confirmationScore + safetyScore) / 5 -
      findings.filter((item) => item.blocksPasswordSetup).length * 20,
  );

  const pilotStatus: TesterSmallCohortPasswordSetupPilotStatus = hasBlocking
    ? "blocked"
    : normalized.dryRun && normalized.candidatePasswordHashCount === targetCohortSize
      ? "password-already-configured"
      : writeArmed
        ? "password-write-candidates"
        : normalized.serverWriteEnabled && normalized.serverConfirmConfigured
          ? "write-pilot-armed"
          : "dry-run-preview-ready";

  const decision: TesterSmallCohortPasswordSetupPilotDecision = hasBlocking
    ? "BLOCKED"
    : normalized.dryRun
      ? "DRY_RUN_ONLY"
      : writeArmed
        ? "WRITE_CANDIDATES"
        : "WRITE_DISABLED";

  return {
    generatedAt: new Date().toISOString(),
    mode: normalized.dryRun
      ? "dry-run"
      : "protected-small-cohort-password-setup-pilot",
    input: normalized,
    readiness: TESTER_SMALL_COHORT_PASSWORD_SETUP_PILOT_GUARDRAIL,
    baselineScore,
    candidateScore,
    passwordScore,
    confirmationScore,
    safetyScore,
    pilotScore,
    pilotStatus,
    decision,
    baselineBoard: [
      boardItem(
        "SCPWD_BASE_001",
        "Baseline tester readiness",
        "baseline",
        baselineScore,
        ["first tester", "second tester", "V21.7 closed", "write paths closed"],
        "Baseline testers remain valid before small-cohort password setup.",
      ),
    ],
    candidateBoard: [
      boardItem(
        "SCPWD_CAND_001",
        "Candidate account readiness",
        "candidate",
        candidateScore,
        ["candidate emails", "existing users", "role compatible", "duplicates", "target size"],
        "Candidate accounts are eligible for protected password setup.",
      ),
    ],
    passwordBoard: [
      boardItem(
        "SCPWD_PASS_001",
        "Temporary password readiness",
        "password",
        passwordScore,
        ["passwordHash schema", "one password per candidate", "min length 12"],
        "Temporary passwords are accepted only for hashing and are never returned.",
      ),
    ],
    confirmationBoard: [
      boardItem(
        "SCPWD_CONFIRM_001",
        "Password setup confirmation",
        "confirmation",
        confirmationScore,
        ["server env", "body confirm", "dryRun=false"],
        "Password setup occurs only when all confirmations pass.",
      ),
    ],
    safetyBoard: [
      boardItem(
        "SCPWD_SAFETY_001",
        "Password-only safety",
        "safety",
        safetyScore,
        ["password write only", "no account create", "no invite", "no signup", "no migration", "no AI", "no execution", "no evidence persistence"],
        "Only protected User.passwordHash update is eligible.",
      ),
    ],
    noGoBoard: [
      boardItem(
        "SCPWD_NOGO_001",
        "Account create and invite",
        "no_go",
        0,
        ["accountCreateAllowed=false", "inviteEmailSendAllowed=false"],
        "No-go: V21.8 does not create accounts or send invites.",
      ),
      boardItem(
        "SCPWD_NOGO_002",
        "Public signup and migration",
        "no_go",
        0,
        ["publicSignupAllowed=false", "migrationExecutionAllowed=false"],
        "No-go: public signup remains closed and no migration runs.",
      ),
      boardItem(
        "SCPWD_NOGO_003",
        "AI/provider/execution",
        "no_go",
        0,
        ["providerCalled=false", "operationalExecutionAllowed=false"],
        "No-go: AI provider and operational execution remain disabled.",
      ),
    ],
    findings,
    safetySummary: [
      "V21.8 introduces a protected small-cohort password setup pilot route.",
      "The route is dry-run by default and does not write passwordHash during deploy/checks.",
      "Real password setup requires CRON_SECRET, server-side enablement, exact confirmation phrase and dryRun=false.",
      "Only User.passwordHash update is eligible; no user creation, invite email, public signup, schema write, migration, AI provider call or operational execution is enabled.",
      "Temporary passwords are never returned in API responses.",
    ],
  };
}

export const testerSmallCohortPasswordSetupPilotVersion = "V21.8";
