export type TesterAccountAccessVerificationMode = "dry-run" | "tester-account-access-verification";
export type TesterAccountAccessVerificationDecision =
  | "ACCESS_CANDIDATE"
  | "AUTH_SETUP_REQUIRED"
  | "ONBOARDING_REVIEW_REQUIRED"
  | "NO_GO";
export type TesterAccountAccessVerificationSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterAccountAccessVerificationInput {
  email?: string;
  userDetected?: boolean;
  roleValue?: string;
  roleCompatible?: boolean;
  emailVerified?: boolean;
  hasPasswordHash?: boolean;
  oauthAccountCount?: number;
  activeSessionCount?: number;
  schemaHasUserModel?: boolean;
  schemaHasEmailField?: boolean;
  schemaHasRoleField?: boolean;
  schemaHasLanguageField?: boolean;
  onboardingRouteReady?: boolean;
  protectedRouteReady?: boolean;
  openCriticalAccessIssueCount?: number;
  openMajorAccessIssueCount?: number;
}

export interface TesterAccountAccessVerificationBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterAccountAccessVerificationSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterAccountAccessVerificationFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterAccountAccessVerificationSeverity;
  reason: string;
  manualResolution: string;
  blocksAccessVerification: boolean;
}

export const TESTER_ACCOUNT_ACCESS_VERIFICATION_GUARDRAIL = {
  testerAccountAccessVerificationReady: true,
  loginReadinessGateReady: true,
  onboardingGateReady: true,
  roleVerificationReady: true,
  authMethodDiscoveryReady: true,
  protectedReadOnlyRouteReady: true,
  readOnlyVerificationOnly: true,
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
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
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
  humanReviewRequired: true,
  localAnalysisOnly: true,
  redactedOutputOnly: true,
} as const;

export interface TesterAccountAccessVerificationReport {
  generatedAt: string;
  mode: TesterAccountAccessVerificationMode;
  input: Required<TesterAccountAccessVerificationInput>;
  readiness: typeof TESTER_ACCOUNT_ACCESS_VERIFICATION_GUARDRAIL;
  accessScore: number;
  decision: TesterAccountAccessVerificationDecision;
  accountPresenceBoard: TesterAccountAccessVerificationBoardItem[];
  authMethodBoard: TesterAccountAccessVerificationBoardItem[];
  roleAccessBoard: TesterAccountAccessVerificationBoardItem[];
  onboardingBoard: TesterAccountAccessVerificationBoardItem[];
  noGoBoard: TesterAccountAccessVerificationBoardItem[];
  findings: TesterAccountAccessVerificationFindingItem[];
  nextStep: string;
  safetySummary: string[];
}

function normalizeInput(input: TesterAccountAccessVerificationInput): Required<TesterAccountAccessVerificationInput> {
  return {
    email: input.email ?? "",
    userDetected: input.userDetected ?? false,
    roleValue: input.roleValue ?? "",
    roleCompatible: input.roleCompatible ?? false,
    emailVerified: input.emailVerified ?? false,
    hasPasswordHash: input.hasPasswordHash ?? false,
    oauthAccountCount: input.oauthAccountCount ?? 0,
    activeSessionCount: input.activeSessionCount ?? 0,
    schemaHasUserModel: input.schemaHasUserModel ?? false,
    schemaHasEmailField: input.schemaHasEmailField ?? false,
    schemaHasRoleField: input.schemaHasRoleField ?? false,
    schemaHasLanguageField: input.schemaHasLanguageField ?? false,
    onboardingRouteReady: input.onboardingRouteReady ?? true,
    protectedRouteReady: input.protectedRouteReady ?? true,
    openCriticalAccessIssueCount: input.openCriticalAccessIssueCount ?? 0,
    openMajorAccessIssueCount: input.openMajorAccessIssueCount ?? 0,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterAccountAccessVerificationSeverity {
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
): TesterAccountAccessVerificationBoardItem {
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

export function buildTesterAccountAccessVerificationReport(
  input: TesterAccountAccessVerificationInput = {},
): TesterAccountAccessVerificationReport {
  const normalized = normalizeInput(input);

  const authMethodDetected = normalized.hasPasswordHash || normalized.oauthAccountCount > 0;
  const accountPresenceScore = normalized.userDetected ? 100 : 0;
  const authScore = authMethodDetected ? 100 : 45;
  const roleScore = normalized.roleCompatible ? 100 : 50;
  const onboardingScore = normalized.onboardingRouteReady && normalized.protectedRouteReady ? 90 : 55;

  const findings: TesterAccountAccessVerificationFindingItem[] = [];

  if (!normalized.userDetected) {
    findings.push({
      id: "TAAV_FINDING_001",
      label: "Tester account not detected",
      lane: "account_presence",
      severity: "critical",
      reason: "The tester account was not found by protected read-only verification.",
      manualResolution: "Do not proceed to UAT login; verify account creation first.",
      blocksAccessVerification: true,
    });
  }

  if (normalized.userDetected && !authMethodDetected) {
    findings.push({
      id: "TAAV_FINDING_002",
      label: "Authentication method not configured",
      lane: "auth_method",
      severity: "elevated",
      reason: "No password hash or linked OAuth account was detected.",
      manualResolution: "Define login method: password setup, magic link, or OAuth account linkage.",
      blocksAccessVerification: false,
    });
  }

  if (normalized.userDetected && !normalized.emailVerified) {
    findings.push({
      id: "TAAV_FINDING_003",
      label: "Email not verified",
      lane: "auth_method",
      severity: "watch",
      reason: "emailVerified is not set.",
      manualResolution: "Confirm whether the current auth flow requires email verification.",
      blocksAccessVerification: false,
    });
  }

  if (normalized.userDetected && !normalized.roleCompatible) {
    findings.push({
      id: "TAAV_FINDING_004",
      label: "Role not compatible with UAT access",
      lane: "role_access",
      severity: "critical",
      reason: "The tester role does not map to an accepted UAT access role.",
      manualResolution: "Verify role mapping before tester login.",
      blocksAccessVerification: true,
    });
  }

  if (!normalized.schemaHasLanguageField) {
    findings.push({
      id: "TAAV_FINDING_005",
      label: "Preferred language not persisted",
      lane: "onboarding",
      severity: "watch",
      reason: "The schema does not expose a dedicated language field.",
      manualResolution: "Use UI/default-language fallback until a schema release adds preferred language.",
      blocksAccessVerification: false,
    });
  }

  if (normalized.openCriticalAccessIssueCount > 0) {
    findings.push({
      id: "TAAV_FINDING_006",
      label: "Open critical access issue",
      lane: "access_gate",
      severity: "critical",
      reason: String(normalized.openCriticalAccessIssueCount) + " critical access issues remain open.",
      manualResolution: "Resolve critical access issues before UAT login.",
      blocksAccessVerification: true,
    });
  }

  if (normalized.openMajorAccessIssueCount > 0) {
    findings.push({
      id: "TAAV_FINDING_007",
      label: "Open major access issue",
      lane: "access_gate",
      severity: "watch",
      reason: String(normalized.openMajorAccessIssueCount) + " major access issues remain open.",
      manualResolution: "Track and review before broad tester rollout.",
      blocksAccessVerification: false,
    });
  }

  const accountPresenceBoard = [
    boardItem(
      "TAAV_ACCOUNT_001",
      "Tester account presence",
      "account_presence",
      accountPresenceScore,
      ["user email", "user id"],
      "Tester account is verified through a protected read-only route.",
    ),
  ];

  const authMethodBoard = [
    boardItem(
      "TAAV_AUTH_001",
      "Password/OAuth readiness",
      "auth_method",
      authScore,
      ["passwordHash", "OAuth account count"],
      "Authentication method is discovered without writing sessions.",
    ),
    boardItem(
      "TAAV_AUTH_002",
      "Email verification status",
      "auth_method",
      normalized.emailVerified ? 100 : 70,
      ["emailVerified"],
      "Email verification state is visible for onboarding decisions.",
    ),
  ];

  const roleAccessBoard = [
    boardItem(
      "TAAV_ROLE_001",
      "Role compatibility",
      "role_access",
      roleScore,
      ["role value", "OPERATOR/SUPER_ADMIN mapping"],
      "Role is verified for UAT access without role writes.",
    ),
  ];

  const onboardingBoard = [
    boardItem(
      "TAAV_ONBOARDING_001",
      "Onboarding route readiness",
      "onboarding",
      onboardingScore,
      ["protected route", "language fallback", "human review"],
      "Tester onboarding is assessed without modifying user data.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TAAV_NOGO_001",
      "Additional account writes",
      "no_go",
      0,
      ["accountWriteAllowed=false"],
      "No-go: V19.9 does not create or modify accounts.",
    ),
    boardItem(
      "TAAV_NOGO_002",
      "Invite email sending",
      "no_go",
      0,
      ["testerInviteSendAllowed=false"],
      "No-go: V19.9 does not send invite email.",
    ),
    boardItem(
      "TAAV_NOGO_003",
      "AI/provider activation",
      "no_go",
      0,
      ["providerCalled=false"],
      "No-go: AI provider remains disabled.",
    ),
  ];

  const hasBlocking = findings.some((item) => item.blocksAccessVerification);
  const accessScore = clampScore(
    (accountPresenceScore + authScore + roleScore + onboardingScore) / 4 -
      findings.filter((item) => item.blocksAccessVerification).length * 25,
  );

  const decision: TesterAccountAccessVerificationDecision = hasBlocking
    ? "NO_GO"
    : authMethodDetected
      ? "ACCESS_CANDIDATE"
      : "AUTH_SETUP_REQUIRED";

  const nextStep =
    decision === "ACCESS_CANDIDATE"
      ? "Proceed to manual login/onboarding test for the pilot tester."
      : decision === "AUTH_SETUP_REQUIRED"
        ? "Configure or choose the tester authentication method before UAT login."
        : "Do not proceed to login; resolve blocking access findings first.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_ACCOUNT_ACCESS_VERIFICATION_GUARDRAIL,
    accessScore,
    decision,
    accountPresenceBoard,
    authMethodBoard,
    roleAccessBoard,
    onboardingBoard,
    noGoBoard,
    findings,
    nextStep,
    safetySummary: [
      "V19.9 verifies tester account access readiness through protected read-only checks.",
      "No account creation, invite sending, role write, language write, schema write or migration execution is performed.",
      "No public signup, provider call, AI persistence, feedback persistence, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerAccountAccessVerificationVersion = "V19.9";
