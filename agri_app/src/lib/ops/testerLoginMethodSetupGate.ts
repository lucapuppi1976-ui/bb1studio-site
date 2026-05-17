export type TesterLoginMethodSetupMode = "dry-run" | "tester-login-method-setup-gate";
export type TesterLoginMethodDecision =
  | "PASSWORD_SETUP_CANDIDATE"
  | "MAGIC_LINK_CANDIDATE"
  | "OAUTH_LINK_CANDIDATE"
  | "AUTH_IMPLEMENTATION_REVIEW_REQUIRED"
  | "NO_GO";
export type TesterLoginMethodSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterLoginMethodAuthDiscovery {
  nextAuthDetected: boolean;
  credentialsProviderDetected: boolean;
  passwordHashFieldDetected: boolean;
  bcryptDetected: boolean;
  argonDetected: boolean;
  magicLinkDetected: boolean;
  emailProviderDetected: boolean;
  oauthProviderDetected: boolean;
  signInRouteDetected: boolean;
  sessionUsageDetected: boolean;
}

export interface TesterLoginMethodSetupInput {
  email?: string;
  userDetected?: boolean;
  roleValue?: string;
  roleCompatible?: boolean;
  emailVerified?: boolean;
  hasPasswordHash?: boolean;
  oauthAccountCount?: number;
  activeSessionCount?: number;
  authDiscovery?: Partial<TesterLoginMethodAuthDiscovery>;
  openCriticalAuthIssueCount?: number;
  openMajorAuthIssueCount?: number;
}

export interface TesterLoginMethodBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterLoginMethodSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterLoginMethodFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterLoginMethodSeverity;
  reason: string;
  manualResolution: string;
  blocksLoginSetup: boolean;
}

export const TESTER_LOGIN_METHOD_SETUP_GUARDRAIL = {
  testerLoginMethodSetupGateReady: true,
  authMethodDiscoveryReady: true,
  passwordSetupReadinessReady: true,
  magicLinkReadinessReady: true,
  oauthReadinessReady: true,
  onboardingLoginGateReady: true,
  protectedReadOnlyRouteReady: true,
  readOnlyVerificationOnly: true,
  passwordWriteAllowed: false,
  passwordWritePerformed: false,
  emailVerifiedWriteAllowed: false,
  emailVerifiedWritePerformed: false,
  oauthLinkWriteAllowed: false,
  oauthLinkWritePerformed: false,
  magicLinkSendAllowed: false,
  magicLinkSendPerformed: false,
  publicSignupAllowed: false,
  publicSignupPerformed: false,
  accountWriteAllowed: false,
  accountWritePerformed: false,
  testerAccountCreateAllowed: false,
  testerAccountCreatePerformed: false,
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
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  incidentRecordPersistenceAllowed: false,
  incidentRecordWriteAllowed: false,
  humanReviewRequired: true,
  localAnalysisOnly: true,
  redactedOutputOnly: true,
} as const;

export interface TesterLoginMethodSetupReport {
  generatedAt: string;
  mode: TesterLoginMethodSetupMode;
  input: Required<TesterLoginMethodSetupInput>;
  readiness: typeof TESTER_LOGIN_METHOD_SETUP_GUARDRAIL;
  authDiscovery: TesterLoginMethodAuthDiscovery;
  setupScore: number;
  decision: TesterLoginMethodDecision;
  accountStatusBoard: TesterLoginMethodBoardItem[];
  passwordSetupBoard: TesterLoginMethodBoardItem[];
  magicLinkBoard: TesterLoginMethodBoardItem[];
  oauthBoard: TesterLoginMethodBoardItem[];
  onboardingBoard: TesterLoginMethodBoardItem[];
  noGoBoard: TesterLoginMethodBoardItem[];
  findings: TesterLoginMethodFindingItem[];
  recommendedNextRelease: string;
  safetySummary: string[];
}

const discoveredAuthDefaults = {"nextAuthDetected":true,"credentialsProviderDetected":true,"passwordHashFieldDetected":true,"bcryptDetected":true,"argonDetected":false,"magicLinkDetected":true,"emailProviderDetected":true,"oauthProviderDetected":true,"signInRouteDetected":true,"sessionUsageDetected":true} as const;

function normalizeAuthDiscovery(input?: Partial<TesterLoginMethodAuthDiscovery>): TesterLoginMethodAuthDiscovery {
  return {
    nextAuthDetected: input?.nextAuthDetected ?? discoveredAuthDefaults.nextAuthDetected,
    credentialsProviderDetected: input?.credentialsProviderDetected ?? discoveredAuthDefaults.credentialsProviderDetected,
    passwordHashFieldDetected: input?.passwordHashFieldDetected ?? discoveredAuthDefaults.passwordHashFieldDetected,
    bcryptDetected: input?.bcryptDetected ?? discoveredAuthDefaults.bcryptDetected,
    argonDetected: input?.argonDetected ?? discoveredAuthDefaults.argonDetected,
    magicLinkDetected: input?.magicLinkDetected ?? discoveredAuthDefaults.magicLinkDetected,
    emailProviderDetected: input?.emailProviderDetected ?? discoveredAuthDefaults.emailProviderDetected,
    oauthProviderDetected: input?.oauthProviderDetected ?? discoveredAuthDefaults.oauthProviderDetected,
    signInRouteDetected: input?.signInRouteDetected ?? discoveredAuthDefaults.signInRouteDetected,
    sessionUsageDetected: input?.sessionUsageDetected ?? discoveredAuthDefaults.sessionUsageDetected,
  };
}

function normalizeInput(input: TesterLoginMethodSetupInput): Required<TesterLoginMethodSetupInput> {
  return {
    email: input.email ?? "",
    userDetected: input.userDetected ?? false,
    roleValue: input.roleValue ?? "",
    roleCompatible: input.roleCompatible ?? false,
    emailVerified: input.emailVerified ?? false,
    hasPasswordHash: input.hasPasswordHash ?? false,
    oauthAccountCount: input.oauthAccountCount ?? 0,
    activeSessionCount: input.activeSessionCount ?? 0,
    authDiscovery: normalizeAuthDiscovery(input.authDiscovery),
    openCriticalAuthIssueCount: input.openCriticalAuthIssueCount ?? 0,
    openMajorAuthIssueCount: input.openMajorAuthIssueCount ?? 0,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterLoginMethodSeverity {
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
): TesterLoginMethodBoardItem {
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

export function buildTesterLoginMethodSetupReport(input: TesterLoginMethodSetupInput = {}): TesterLoginMethodSetupReport {
  const normalized = normalizeInput(input);
  const authDiscovery = normalizeAuthDiscovery(normalized.authDiscovery);

  const passwordSetupCandidate =
    normalized.userDetected &&
    normalized.roleCompatible &&
    authDiscovery.passwordHashFieldDetected &&
    authDiscovery.credentialsProviderDetected &&
    (authDiscovery.bcryptDetected || authDiscovery.argonDetected);

  const magicLinkCandidate =
    normalized.userDetected &&
    normalized.roleCompatible &&
    authDiscovery.magicLinkDetected &&
    authDiscovery.emailProviderDetected;

  const oauthCandidate =
    normalized.userDetected &&
    normalized.roleCompatible &&
    authDiscovery.oauthProviderDetected;

  const hasLoginMethod =
    normalized.hasPasswordHash ||
    normalized.oauthAccountCount > 0 ||
    normalized.activeSessionCount > 0;

  const findings: TesterLoginMethodFindingItem[] = [];

  if (!normalized.userDetected) {
    findings.push({
      id: "TLM_FINDING_001",
      label: "Tester account not detected",
      lane: "account_status",
      severity: "critical",
      reason: "Tester account is not available for login setup.",
      manualResolution: "Verify account creation before login method setup.",
      blocksLoginSetup: true,
    });
  }

  if (normalized.userDetected && !normalized.roleCompatible) {
    findings.push({
      id: "TLM_FINDING_002",
      label: "Tester role is not compatible",
      lane: "account_status",
      severity: "critical",
      reason: "Tester role is not mapped to an accepted access role.",
      manualResolution: "Resolve role mapping before login setup.",
      blocksLoginSetup: true,
    });
  }

  if (normalized.userDetected && !hasLoginMethod) {
    findings.push({
      id: "TLM_FINDING_003",
      label: "No active login method",
      lane: "auth_method",
      severity: "elevated",
      reason: "No password hash, OAuth account, or active session was detected.",
      manualResolution: "Choose one login setup method for the tester.",
      blocksLoginSetup: false,
    });
  }

  if (normalized.openCriticalAuthIssueCount > 0) {
    findings.push({
      id: "TLM_FINDING_004",
      label: "Open critical auth issue",
      lane: "auth_method",
      severity: "critical",
      reason: String(normalized.openCriticalAuthIssueCount) + " critical auth issues remain open.",
      manualResolution: "Resolve critical auth issues before login setup.",
      blocksLoginSetup: true,
    });
  }

  if (normalized.openMajorAuthIssueCount > 0) {
    findings.push({
      id: "TLM_FINDING_005",
      label: "Open major auth issue",
      lane: "auth_method",
      severity: "watch",
      reason: String(normalized.openMajorAuthIssueCount) + " major auth issues remain open.",
      manualResolution: "Track and review before onboarding tester.",
      blocksLoginSetup: false,
    });
  }

  const accountStatusBoard = [
    boardItem(
      "TLM_ACCOUNT_001",
      "Tester account and role",
      "account_status",
      normalized.userDetected && normalized.roleCompatible ? 100 : 0,
      ["userDetected", "roleCompatible"],
      "Tester account and role are verified read-only.",
    ),
  ];

  const passwordSetupBoard = [
    boardItem(
      "TLM_PASSWORD_001",
      "Password setup readiness",
      "password_setup",
      passwordSetupCandidate ? 100 : 45,
      ["passwordHash", "CredentialsProvider", "bcrypt/argon"],
      "Password setup is only a candidate; no password is written in V20.0.",
    ),
  ];

  const magicLinkBoard = [
    boardItem(
      "TLM_MAGIC_001",
      "Magic link readiness",
      "magic_link",
      magicLinkCandidate ? 100 : 45,
      ["magic link", "email provider"],
      "Magic link is only a candidate; no email is sent in V20.0.",
    ),
  ];

  const oauthBoard = [
    boardItem(
      "TLM_OAUTH_001",
      "OAuth readiness",
      "oauth",
      oauthCandidate ? 100 : 45,
      ["OAuth provider", "Account relation"],
      "OAuth is only a candidate; no provider link is written in V20.0.",
    ),
  ];

  const onboardingBoard = [
    boardItem(
      "TLM_ONBOARDING_001",
      "Onboarding route readiness",
      "onboarding",
      authDiscovery.signInRouteDetected || authDiscovery.sessionUsageDetected ? 85 : 55,
      ["sign in route", "session usage"],
      "Onboarding route readiness is assessed without starting sessions.",
    ),
  ];

  const noGoBoard = [
    boardItem("TLM_NOGO_001", "Password write", "no_go", 0, ["passwordWriteAllowed=false"], "No-go: V20.0 does not write passwordHash."),
    boardItem("TLM_NOGO_002", "Magic link send", "no_go", 0, ["magicLinkSendAllowed=false"], "No-go: V20.0 does not send email."),
    boardItem("TLM_NOGO_003", "OAuth link write", "no_go", 0, ["oauthLinkWriteAllowed=false"], "No-go: V20.0 does not create OAuth account links."),
  ];

  const hasBlocking = findings.some((item) => item.blocksLoginSetup);
  const setupScore = clampScore(
    (accountStatusBoard[0].score +
      passwordSetupBoard[0].score +
      magicLinkBoard[0].score +
      oauthBoard[0].score +
      onboardingBoard[0].score) /
      5 -
      findings.filter((item) => item.blocksLoginSetup).length * 25,
  );

  const decision: TesterLoginMethodDecision =
    hasBlocking
      ? "NO_GO"
      : passwordSetupCandidate
        ? "PASSWORD_SETUP_CANDIDATE"
        : magicLinkCandidate
          ? "MAGIC_LINK_CANDIDATE"
          : oauthCandidate
            ? "OAUTH_LINK_CANDIDATE"
            : "AUTH_IMPLEMENTATION_REVIEW_REQUIRED";

  const recommendedNextRelease =
    decision === "PASSWORD_SETUP_CANDIDATE"
      ? "V20.1 — Protected Tester Password Setup Pilot"
      : decision === "MAGIC_LINK_CANDIDATE"
        ? "V20.1 — Protected Tester Magic Link Setup Pilot"
        : decision === "OAUTH_LINK_CANDIDATE"
          ? "V20.1 — Protected Tester OAuth Link Setup Pilot"
          : decision === "AUTH_IMPLEMENTATION_REVIEW_REQUIRED"
            ? "V20.1 — Auth Implementation Review and Login Method Selection"
            : "Resolve blocking login findings before V20.1.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_LOGIN_METHOD_SETUP_GUARDRAIL,
    authDiscovery,
    setupScore,
    decision,
    accountStatusBoard,
    passwordSetupBoard,
    magicLinkBoard,
    oauthBoard,
    onboardingBoard,
    noGoBoard,
    findings,
    recommendedNextRelease,
    safetySummary: [
      "V20.0 discovers login method candidates for the existing pilot tester.",
      "No password, email verification, OAuth link, account, invite, schema, migration, AI provider, or execution write is performed.",
      "Public signup remains closed.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerLoginMethodSetupGateVersion = "V20.0";
