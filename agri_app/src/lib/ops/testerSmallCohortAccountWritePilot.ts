export type TesterSmallCohortAccountWritePilotMode =
  | "dry-run"
  | "protected-small-cohort-account-write-pilot";

export type TesterSmallCohortAccountWritePilotDecision =
  | "DRY_RUN_ONLY"
  | "WRITE_DISABLED"
  | "WRITE_CANDIDATES"
  | "BLOCKED";

export type TesterSmallCohortAccountWritePilotStatus =
  | "blocked"
  | "dry-run-preview-ready"
  | "write-pilot-armed"
  | "small-cohort-write-candidates";

export type TesterSmallCohortAccountWritePilotSeverity =
  | "info"
  | "watch"
  | "elevated"
  | "critical";

export interface TesterSmallCohortAccountWritePilotInput {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  targetCohortSize?: number;
  candidateEmails?: string[];
  candidateNames?: string[];
  dryRun?: boolean;
  acceptLimitations?: boolean;
  confirm?: string;

  firstTesterDetected?: boolean;
  firstTesterRoleCompatible?: boolean;
  firstTesterHasPasswordHash?: boolean;

  secondTesterDetected?: boolean;
  secondTesterRoleValue?: string;
  secondTesterRoleCompatible?: boolean;
  secondTesterHasPasswordHash?: boolean;

  previousCandidateReadinessCleared?: boolean;
  writePathsClosedConfirmed?: boolean;

  candidateEmailCount?: number;
  candidateNameCount?: number;
  duplicateCandidateEmailDetected?: boolean;
  candidateExistingUserCount?: number;

  schemaHasNameField?: boolean;
  schemaHasRoleField?: boolean;
  schemaHasLanguageField?: boolean;

  serverWriteEnabled?: boolean;
  serverConfirmConfigured?: boolean;

  noPasswordWriteConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  noEvidencePersistenceConfirmed?: boolean;
}

export interface TesterSmallCohortAccountWritePilotBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterSmallCohortAccountWritePilotSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterSmallCohortAccountWritePilotFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterSmallCohortAccountWritePilotSeverity;
  reason: string;
  manualResolution: string;
  blocksWritePilot: boolean;
}

export const SMALL_COHORT_ACCOUNT_WRITE_CONFIRM =
  "CONFIRM_V21_7_SMALL_COHORT_ACCOUNT_WRITE";

export const TESTER_SMALL_COHORT_ACCOUNT_WRITE_PILOT_GUARDRAIL = {
  testerSmallCohortAccountWritePilotReady: true,
  protectedSmallCohortAccountWriteRouteReady: true,
  defaultDryRunOnly: true,
  serverWriteEnabledRequired: true,
  serverConfirmRequired: true,
  bodyConfirmRequired: true,
  smallCohortLimitReady: true,
  minCohortSize: 3,
  maxCohortSize: 5,
  roleMappedToOperatorOnly: true,
  languageFallbackOnly: true,

  automaticAccountWriteAllowed: false,
  automaticAccountWritePerformed: false,
  passwordWriteAllowed: false,
  passwordWritePerformed: false,
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

export interface TesterSmallCohortAccountWritePilotReport {
  generatedAt: string;
  mode: TesterSmallCohortAccountWritePilotMode;
  input: Required<TesterSmallCohortAccountWritePilotInput>;
  readiness: typeof TESTER_SMALL_COHORT_ACCOUNT_WRITE_PILOT_GUARDRAIL;
  baselineScore: number;
  candidateScore: number;
  schemaScore: number;
  confirmationScore: number;
  safetyScore: number;
  pilotScore: number;
  pilotStatus: TesterSmallCohortAccountWritePilotStatus;
  decision: TesterSmallCohortAccountWritePilotDecision;
  baselineBoard: TesterSmallCohortAccountWritePilotBoardItem[];
  candidateBoard: TesterSmallCohortAccountWritePilotBoardItem[];
  schemaBoard: TesterSmallCohortAccountWritePilotBoardItem[];
  confirmationBoard: TesterSmallCohortAccountWritePilotBoardItem[];
  safetyBoard: TesterSmallCohortAccountWritePilotBoardItem[];
  noGoBoard: TesterSmallCohortAccountWritePilotBoardItem[];
  findings: TesterSmallCohortAccountWritePilotFindingItem[];
  safetySummary: string[];
}

function normalizeInput(
  input: TesterSmallCohortAccountWritePilotInput,
): Required<TesterSmallCohortAccountWritePilotInput> {
  return {
    firstTesterEmail: input.firstTesterEmail ?? "",
    secondTesterEmail: input.secondTesterEmail ?? "",
    targetCohortSize: input.targetCohortSize ?? 3,
    candidateEmails: input.candidateEmails ?? [],
    candidateNames: input.candidateNames ?? [],
    dryRun: input.dryRun ?? true,
    acceptLimitations: input.acceptLimitations ?? false,
    confirm: input.confirm ?? "",

    firstTesterDetected: input.firstTesterDetected ?? false,
    firstTesterRoleCompatible: input.firstTesterRoleCompatible ?? false,
    firstTesterHasPasswordHash: input.firstTesterHasPasswordHash ?? false,

    secondTesterDetected: input.secondTesterDetected ?? false,
    secondTesterRoleValue: input.secondTesterRoleValue ?? "",
    secondTesterRoleCompatible: input.secondTesterRoleCompatible ?? false,
    secondTesterHasPasswordHash: input.secondTesterHasPasswordHash ?? false,

    previousCandidateReadinessCleared: input.previousCandidateReadinessCleared ?? false,
    writePathsClosedConfirmed: input.writePathsClosedConfirmed ?? false,

    candidateEmailCount: input.candidateEmailCount ?? 0,
    candidateNameCount: input.candidateNameCount ?? 0,
    duplicateCandidateEmailDetected: input.duplicateCandidateEmailDetected ?? false,
    candidateExistingUserCount: input.candidateExistingUserCount ?? 0,

    schemaHasNameField: input.schemaHasNameField ?? false,
    schemaHasRoleField: input.schemaHasRoleField ?? false,
    schemaHasLanguageField: input.schemaHasLanguageField ?? false,

    serverWriteEnabled: input.serverWriteEnabled ?? false,
    serverConfirmConfigured: input.serverConfirmConfigured ?? false,

    noPasswordWriteConfirmed: input.noPasswordWriteConfirmed ?? false,
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
): TesterSmallCohortAccountWritePilotSeverity {
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
): TesterSmallCohortAccountWritePilotBoardItem {
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

export function buildTesterSmallCohortAccountWritePilotReport(
  input: TesterSmallCohortAccountWritePilotInput = {},
): TesterSmallCohortAccountWritePilotReport {
  const normalized = normalizeInput(input);
  const targetCohortSize = Math.max(1, normalized.targetCohortSize);
  const allCandidateEmailsValid =
    normalized.candidateEmails.length > 0 &&
    normalized.candidateEmails.every((email) => hasValidEmail(email));

  const bodyConfirmOk = normalized.confirm === SMALL_COHORT_ACCOUNT_WRITE_CONFIRM;
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
    normalized.previousCandidateReadinessCleared &&
    normalized.writePathsClosedConfirmed;

  const candidateReady =
    targetCohortSize >= 3 &&
    targetCohortSize <= 5 &&
    normalized.candidateEmailCount === targetCohortSize &&
    normalized.candidateNameCount >= targetCohortSize &&
    allCandidateEmailsValid &&
    !normalized.duplicateCandidateEmailDetected &&
    normalized.candidateExistingUserCount === 0;

  const schemaReady =
    normalized.schemaHasNameField &&
    normalized.schemaHasRoleField &&
    (!normalized.schemaHasLanguageField || normalized.acceptLimitations) &&
    normalized.acceptLimitations;

  const safetyReady =
    normalized.noPasswordWriteConfirmed &&
    normalized.noInviteEmailConfirmed &&
    normalized.noPublicSignupConfirmed &&
    normalized.noSchemaMigrationConfirmed &&
    normalized.noAiProviderCallConfirmed &&
    normalized.noExecutionConfirmed &&
    normalized.noEvidencePersistenceConfirmed;

  const findings: TesterSmallCohortAccountWritePilotFindingItem[] = [];

  if (!baselineReady) {
    findings.push({
      id: "SCACCT_FINDING_001",
      label: "Baseline readiness incomplete",
      lane: "baseline",
      severity: "critical",
      reason: "First/second tester readiness, V21.6 closure or write-path closure is incomplete.",
      manualResolution: "Complete V21.6 and confirm both baseline testers plus write-path closure.",
      blocksWritePilot: true,
    });
  }

  if (targetCohortSize < 3 || targetCohortSize > 5) {
    findings.push({
      id: "SCACCT_FINDING_002",
      label: "Target cohort size out of range",
      lane: "candidate",
      severity: "critical",
      reason: "V21.7 supports only 3 to 5 candidate account writes.",
      manualResolution: "Use a target cohort size between 3 and 5.",
      blocksWritePilot: true,
    });
  }

  if (!allCandidateEmailsValid || normalized.candidateEmailCount !== targetCohortSize) {
    findings.push({
      id: "SCACCT_FINDING_003",
      label: "Candidate email set invalid",
      lane: "candidate",
      severity: "critical",
      reason: "Candidate email count or email format is invalid.",
      manualResolution: "Provide exactly the target cohort size of valid candidate emails.",
      blocksWritePilot: true,
    });
  }

  if (normalized.candidateNameCount < targetCohortSize) {
    findings.push({
      id: "SCACCT_FINDING_004",
      label: "Candidate names incomplete",
      lane: "candidate",
      severity: "critical",
      reason: "Every candidate must have a display name before account write.",
      manualResolution: "Provide one display name per candidate email.",
      blocksWritePilot: true,
    });
  }

  if (normalized.duplicateCandidateEmailDetected) {
    findings.push({
      id: "SCACCT_FINDING_005",
      label: "Duplicate candidate email",
      lane: "candidate",
      severity: "critical",
      reason: "Duplicate candidate emails would make account creation unsafe.",
      manualResolution: "Deduplicate candidate list before write pilot.",
      blocksWritePilot: true,
    });
  }

  if (normalized.candidateExistingUserCount > 0) {
    findings.push({
      id: "SCACCT_FINDING_006",
      label: "Candidate user already exists",
      lane: "candidate",
      severity: "critical",
      reason: "One or more candidate emails already exist as users.",
      manualResolution: "Use access review instead of account creation for existing users.",
      blocksWritePilot: true,
    });
  }

  if (!normalized.schemaHasNameField || !normalized.schemaHasRoleField) {
    findings.push({
      id: "SCACCT_FINDING_007",
      label: "User schema mapping incomplete",
      lane: "schema",
      severity: "critical",
      reason: "The User schema must expose name/email/role for OPERATOR account creation.",
      manualResolution: "Do not write accounts until schema mapping is confirmed.",
      blocksWritePilot: true,
    });
  }

  if (!normalized.acceptLimitations) {
    findings.push({
      id: "SCACCT_FINDING_008",
      label: "Language fallback limitations not accepted",
      lane: "schema",
      severity: "critical",
      reason: "The current schema may not include persistent language; app-level language fallback must be accepted.",
      manualResolution: "Accept app-level language fallback or add a schema release first.",
      blocksWritePilot: true,
    });
  }

  if (!safetyReady) {
    findings.push({
      id: "SCACCT_FINDING_009",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-password/no-invite/no-signup/no-migration/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm all safety locks before write pilot.",
      blocksWritePilot: true,
    });
  }

  if (!normalized.dryRun && !writeArmed) {
    findings.push({
      id: "SCACCT_FINDING_010",
      label: "Write pilot not armed",
      lane: "confirmation",
      severity: "critical",
      reason: "Real write requires server enablement, server confirmation, body confirmation and dryRun=false.",
      manualResolution: "Set server-side envs and pass exact confirmation phrase.",
      blocksWritePilot: true,
    });
  }

  const baselineScore = baselineReady ? 100 : 0;
  const candidateScore = candidateReady ? 100 : 0;
  const schemaScore = schemaReady ? 100 : 0;
  const confirmationScore = writeArmed ? 100 : normalized.dryRun ? 75 : 0;
  const safetyScore = safetyReady ? 100 : 0;

  const hasBlocking = findings.some((item) => item.blocksWritePilot);

  const pilotScore = clampScore(
    (baselineScore + candidateScore + schemaScore + confirmationScore + safetyScore) / 5 -
      findings.filter((item) => item.blocksWritePilot).length * 20,
  );

  const pilotStatus: TesterSmallCohortAccountWritePilotStatus = hasBlocking
    ? "blocked"
    : writeArmed
      ? "small-cohort-write-candidates"
      : normalized.serverWriteEnabled && normalized.serverConfirmConfigured
        ? "write-pilot-armed"
        : "dry-run-preview-ready";

  const decision: TesterSmallCohortAccountWritePilotDecision = hasBlocking
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
      : "protected-small-cohort-account-write-pilot",
    input: normalized,
    readiness: TESTER_SMALL_COHORT_ACCOUNT_WRITE_PILOT_GUARDRAIL,
    baselineScore,
    candidateScore,
    schemaScore,
    confirmationScore,
    safetyScore,
    pilotScore,
    pilotStatus,
    decision,
    baselineBoard: [
      boardItem(
        "SCACCT_BASE_001",
        "Baseline tester readiness",
        "baseline",
        baselineScore,
        ["first tester", "second tester", "V21.6 cleared", "write paths closed"],
        "Baseline testers remain valid before account write pilot.",
      ),
    ],
    candidateBoard: [
      boardItem(
        "SCACCT_CAND_001",
        "Candidate account write set",
        "candidate",
        candidateScore,
        ["candidate emails", "candidate names", "duplicates", "existing users", "target size"],
        "Candidate set is eligible for protected account write.",
      ),
    ],
    schemaBoard: [
      boardItem(
        "SCACCT_SCHEMA_001",
        "User schema mapping",
        "schema",
        schemaScore,
        ["email", "name", "role OPERATOR", "language fallback"],
        "Only User records with role OPERATOR are eligible.",
      ),
    ],
    confirmationBoard: [
      boardItem(
        "SCACCT_CONFIRM_001",
        "Write pilot confirmation",
        "confirmation",
        confirmationScore,
        ["server env", "body confirm", "dryRun=false"],
        "Write occurs only when all confirmations pass.",
      ),
    ],
    safetyBoard: [
      boardItem(
        "SCACCT_SAFETY_001",
        "No side effects beyond account create",
        "safety",
        safetyScore,
        ["no password", "no invite", "no signup", "no migration", "no AI", "no execution", "no evidence persistence"],
        "Only protected User create is eligible; every other side effect remains blocked.",
      ),
    ],
    noGoBoard: [
      boardItem(
        "SCACCT_NOGO_001",
        "Password and invite",
        "no_go",
        0,
        ["passwordWriteAllowed=false", "inviteEmailSendAllowed=false"],
        "No-go: V21.7 does not set passwords or send invites.",
      ),
      boardItem(
        "SCACCT_NOGO_002",
        "Public signup and migration",
        "no_go",
        0,
        ["publicSignupAllowed=false", "migrationExecutionAllowed=false"],
        "No-go: public signup remains closed and no migration runs.",
      ),
      boardItem(
        "SCACCT_NOGO_003",
        "AI/provider/execution",
        "no_go",
        0,
        ["providerCalled=false", "operationalExecutionAllowed=false"],
        "No-go: AI provider and operational execution remain disabled.",
      ),
    ],
    findings,
    safetySummary: [
      "V21.7 introduces a protected small-cohort account write pilot route.",
      "The route is dry-run by default and does not create users during deploy/checks.",
      "Real write requires CRON_SECRET, server-side enablement, exact confirmation phrase and dryRun=false.",
      "Only User records with role OPERATOR are eligible; no passwordHash, invite email, public signup, schema write, migration, AI provider call or operational execution is enabled.",
      "Language is handled as app-level/manual fallback when the User schema has no persistent language field.",
    ],
  };
}

export const testerSmallCohortAccountWritePilotVersion = "V21.7";
