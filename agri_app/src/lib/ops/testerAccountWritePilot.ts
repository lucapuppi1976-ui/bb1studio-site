export type TesterAccountWritePilotMode = "dry-run" | "protected-single-tester-write-pilot";
export type TesterAccountWritePilotStatus =
  | "blocked"
  | "dry-run-preview-ready"
  | "write-pilot-armed"
  | "single-tester-write-candidate";
export type TesterAccountWritePilotSeverity = "info" | "watch" | "elevated" | "critical";
export type TesterAccountRole = "uat_observer" | "uat_operator" | "uat_reviewer";
export type TesterAccountLanguage = "it" | "en" | "es" | "fr" | "de" | "pt";

export interface TesterAccountWritePilotInput {
  email?: string;
  displayName?: string;
  role?: TesterAccountRole;
  preferredLanguage?: TesterAccountLanguage;
  dryRun?: boolean;
  acceptLimitations?: boolean;
  confirm?: string;
  schemaHasRoleField?: boolean;
  schemaHasLanguageField?: boolean;
  existingUserDetected?: boolean;
  serverWriteEnabled?: boolean;
  serverConfirmConfigured?: boolean;
}

export interface TesterAccountWritePilotBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterAccountWritePilotSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterAccountWritePilotFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterAccountWritePilotSeverity;
  reason: string;
  manualResolution: string;
  blocksWritePilot: boolean;
}

export const TESTER_ACCOUNT_WRITE_PILOT_GUARDRAIL = {
  testerAccountWritePilotReady: true,
  protectedSingleTesterWriteRouteReady: true,
  defaultDryRunOnly: true,
  serverWriteEnabledRequired: true,
  serverConfirmRequired: true,
  bodyConfirmRequired: true,
  oneTesterPilotOnly: true,
  inviteEmailSendAllowed: false,
  inviteEmailSendPerformed: false,
  publicSignupAllowed: false,
  publicSignupPerformed: false,
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
  feedbackPersistenceAllowed: false,
  feedbackPersistencePerformed: false,
  operationalExecutionAllowed: false,
  operationalExecutionPerformed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  humanReviewRequired: true,
  redactedOutputOnly: true,
} as const;

export interface TesterAccountWritePilotReport {
  generatedAt: string;
  mode: TesterAccountWritePilotMode;
  input: Required<TesterAccountWritePilotInput>;
  readiness: typeof TESTER_ACCOUNT_WRITE_PILOT_GUARDRAIL;
  pilotScore: number;
  pilotStatus: TesterAccountWritePilotStatus;
  decision: "DRY_RUN_ONLY" | "WRITE_DISABLED" | "WRITE_CANDIDATE" | "BLOCKED";
  writePreflightBoard: TesterAccountWritePilotBoardItem[];
  schemaMappingBoard: TesterAccountWritePilotBoardItem[];
  confirmationBoard: TesterAccountWritePilotBoardItem[];
  noGoBoard: TesterAccountWritePilotBoardItem[];
  findings: TesterAccountWritePilotFindingItem[];
  safetySummary: string[];
}

export const TESTER_ACCOUNT_WRITE_CONFIRM = "CONFIRM_V19_8_TESTER_ACCOUNT_WRITE";

function normalizeInput(input: TesterAccountWritePilotInput): Required<TesterAccountWritePilotInput> {
  return {
    email: input.email ?? "",
    displayName: input.displayName ?? "",
    role: input.role ?? "uat_observer",
    preferredLanguage: input.preferredLanguage ?? "it",
    dryRun: input.dryRun ?? true,
    acceptLimitations: input.acceptLimitations ?? false,
    confirm: input.confirm ?? "",
    schemaHasRoleField: input.schemaHasRoleField ?? false,
    schemaHasLanguageField: input.schemaHasLanguageField ?? false,
    existingUserDetected: input.existingUserDetected ?? false,
    serverWriteEnabled: input.serverWriteEnabled ?? false,
    serverConfirmConfigured: input.serverConfirmConfigured ?? false,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterAccountWritePilotSeverity {
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
): TesterAccountWritePilotBoardItem {
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

export function buildTesterAccountWritePilotReport(
  input: TesterAccountWritePilotInput = {},
): TesterAccountWritePilotReport {
  const normalized = normalizeInput(input);

  const validEmail = hasValidEmail(normalized.email);
  const limitationPresent = !normalized.schemaHasRoleField || !normalized.schemaHasLanguageField;
  const limitationAccepted = !limitationPresent || normalized.acceptLimitations;
  const bodyConfirmOk = normalized.confirm === TESTER_ACCOUNT_WRITE_CONFIRM;
  const writeArmed = normalized.serverWriteEnabled && normalized.serverConfirmConfigured && bodyConfirmOk && !normalized.dryRun;

  const findings: TesterAccountWritePilotFindingItem[] = [];

  if (!validEmail) {
    findings.push({
      id: "TAWP_FINDING_001",
      label: "Tester email missing or invalid",
      lane: "write_preflight",
      severity: "critical",
      reason: "A valid tester email is required for the write pilot.",
      manualResolution: "Provide a single valid tester email.",
      blocksWritePilot: true,
    });
  }

  if (normalized.existingUserDetected) {
    findings.push({
      id: "TAWP_FINDING_002",
      label: "Tester already exists",
      lane: "write_preflight",
      severity: "critical",
      reason: "A user with this email already exists.",
      manualResolution: "Use the existing user or pick another pilot tester.",
      blocksWritePilot: true,
    });
  }

  if (limitationPresent && !normalized.acceptLimitations) {
    findings.push({
      id: "TAWP_FINDING_003",
      label: "Role/language limitation not accepted",
      lane: "schema_mapping",
      severity: "critical",
      reason: "Role or language fields were not confirmed and limitations were not accepted.",
      manualResolution: "Accept limitations explicitly or add a schema release before writing.",
      blocksWritePilot: true,
    });
  }

  if (!normalized.dryRun && !writeArmed) {
    findings.push({
      id: "TAWP_FINDING_004",
      label: "Write pilot not armed",
      lane: "confirmation",
      severity: "critical",
      reason: "Real write requires server enablement, server confirmation and body confirmation.",
      manualResolution: "Set server-side write pilot envs and pass the exact confirmation phrase.",
      blocksWritePilot: true,
    });
  }

  const writePreflightBoard = [
    boardItem(
      "TAWP_PREFLIGHT_001",
      "Single tester email validation",
      "write_preflight",
      validEmail ? 100 : 0,
      ["email"],
      "Only one tester email is accepted for the pilot.",
    ),
    boardItem(
      "TAWP_PREFLIGHT_002",
      "Existing user check",
      "write_preflight",
      normalized.existingUserDetected ? 0 : 100,
      ["existing user lookup"],
      "Duplicate users are blocked.",
    ),
  ];

  const schemaMappingBoard = [
    boardItem(
      "TAWP_SCHEMA_001",
      "Role field mapping",
      "schema_mapping",
      normalized.schemaHasRoleField ? 100 : 60,
      ["role", "userRole", "roles"],
      "If no role field exists, fallback must be explicitly accepted.",
    ),
    boardItem(
      "TAWP_SCHEMA_002",
      "Language field mapping",
      "schema_mapping",
      normalized.schemaHasLanguageField ? 100 : 60,
      ["language", "locale", "preferredLanguage"],
      "If no language field exists, fallback must be explicitly accepted.",
    ),
  ];

  const confirmationBoard = [
    boardItem(
      "TAWP_CONFIRM_001",
      "Default dry-run mode",
      "confirmation",
      normalized.dryRun ? 100 : 70,
      ["dryRun=true by default"],
      "No write happens unless dryRun=false and all confirmations pass.",
    ),
    boardItem(
      "TAWP_CONFIRM_002",
      "Write pilot confirmation",
      "confirmation",
      writeArmed ? 100 : 50,
      ["server env", "body confirm"],
      "Write pilot is armed only with explicit server and request confirmation.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TAWP_NOGO_001",
      "Public signup",
      "no_go",
      0,
      ["publicSignupAllowed=false"],
      "No-go: public signup remains closed.",
    ),
    boardItem(
      "TAWP_NOGO_002",
      "Invite email sending",
      "no_go",
      0,
      ["inviteEmailSendAllowed=false"],
      "No-go: invite email sending remains blocked.",
    ),
    boardItem(
      "TAWP_NOGO_003",
      "AI/provider activation",
      "no_go",
      0,
      ["providerCalled=false"],
      "No-go: AI provider remains disabled.",
    ),
  ];

  const pilotScore = clampScore(
    (writePreflightBoard[0].score +
      writePreflightBoard[1].score +
      schemaMappingBoard[0].score +
      schemaMappingBoard[1].score +
      confirmationBoard[0].score +
      confirmationBoard[1].score) /
      6 -
      findings.filter((item) => item.blocksWritePilot).length * 20,
  );

  const hasBlocking = findings.some((item) => item.blocksWritePilot);
  const pilotStatus: TesterAccountWritePilotStatus = hasBlocking
    ? "blocked"
    : writeArmed
      ? "single-tester-write-candidate"
      : normalized.serverWriteEnabled && normalized.serverConfirmConfigured
        ? "write-pilot-armed"
        : "dry-run-preview-ready";

  const decision =
    hasBlocking
      ? "BLOCKED"
      : normalized.dryRun
        ? "DRY_RUN_ONLY"
        : writeArmed
          ? "WRITE_CANDIDATE"
          : "WRITE_DISABLED";

  return {
    generatedAt: new Date().toISOString(),
    mode: normalized.dryRun ? "dry-run" : "protected-single-tester-write-pilot",
    input: normalized,
    readiness: TESTER_ACCOUNT_WRITE_PILOT_GUARDRAIL,
    pilotScore,
    pilotStatus,
    decision,
    writePreflightBoard,
    schemaMappingBoard,
    confirmationBoard,
    noGoBoard,
    findings,
    safetySummary: [
      "V19.8 introduces a protected single-tester account write pilot route.",
      "The route is dry-run by default and does not create users during deploy or checks.",
      "Real write requires CRON_SECRET, server-side enablement, exact confirmation phrase and dryRun=false.",
      "No invite email, public signup, schema write, migration, AI provider call, feedback persistence or operational execution is enabled.",
    ],
  };
}

export const testerAccountWritePilotVersion = "V19.8";
