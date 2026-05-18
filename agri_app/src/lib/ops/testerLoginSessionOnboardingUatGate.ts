export type TesterLoginSessionOnboardingMode = "dry-run" | "tester-login-session-onboarding-uat-gate";
export type TesterLoginSessionOnboardingDecision =
  | "MANUAL_UAT_READY"
  | "LOGIN_OBSERVATION_REQUIRED"
  | "LOGIN_METHOD_MISSING"
  | "ONBOARDING_REVIEW_REQUIRED"
  | "NO_GO";
export type TesterLoginSessionOnboardingSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterLoginSessionOnboardingInput {
  email?: string;
  userDetected?: boolean;
  roleValue?: string;
  roleCompatible?: boolean;
  hasPasswordHash?: boolean;
  emailVerified?: boolean;
  oauthAccountCount?: number;
  activeSessionCount?: number;
  manualLoginObserved?: boolean;
  onboardingPageObserved?: boolean;
  protectedRouteObserved?: boolean;
  localeFallbackObserved?: boolean;
  logoutObserved?: boolean;
  openCriticalUatIssueCount?: number;
  openMajorUatIssueCount?: number;
}

export interface TesterLoginSessionOnboardingBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterLoginSessionOnboardingSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterLoginSessionOnboardingFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterLoginSessionOnboardingSeverity;
  reason: string;
  manualResolution: string;
  blocksManualUat: boolean;
}

export const TESTER_LOGIN_SESSION_ONBOARDING_UAT_GUARDRAIL = {
  testerLoginSessionOnboardingUatGateReady: true,
  manualLoginVerificationReady: true,
  sessionVerificationReady: true,
  onboardingVerificationReady: true,
  protectedRouteVerificationReady: true,
  localeFallbackVerificationReady: true,
  logoutVerificationReady: true,
  readOnlyVerificationOnly: true,
  publicSignupAllowed: false,
  publicSignupPerformed: false,
  accountWriteAllowed: false,
  accountWritePerformed: false,
  testerAccountCreateAllowed: false,
  testerAccountCreatePerformed: false,
  passwordWriteAllowed: false,
  passwordWritePerformed: false,
  emailVerifiedWriteAllowed: false,
  emailVerifiedWritePerformed: false,
  inviteEmailSendAllowed: false,
  inviteEmailSendPerformed: false,
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

export interface TesterLoginSessionOnboardingReport {
  generatedAt: string;
  mode: TesterLoginSessionOnboardingMode;
  input: Required<TesterLoginSessionOnboardingInput>;
  readiness: typeof TESTER_LOGIN_SESSION_ONBOARDING_UAT_GUARDRAIL;
  uatScore: number;
  decision: TesterLoginSessionOnboardingDecision;
  accountBoard: TesterLoginSessionOnboardingBoardItem[];
  loginBoard: TesterLoginSessionOnboardingBoardItem[];
  onboardingBoard: TesterLoginSessionOnboardingBoardItem[];
  routeBoard: TesterLoginSessionOnboardingBoardItem[];
  noGoBoard: TesterLoginSessionOnboardingBoardItem[];
  findings: TesterLoginSessionOnboardingFindingItem[];
  nextStep: string;
  safetySummary: string[];
}

function normalizeInput(input: TesterLoginSessionOnboardingInput): Required<TesterLoginSessionOnboardingInput> {
  return {
    email: input.email ?? "",
    userDetected: input.userDetected ?? false,
    roleValue: input.roleValue ?? "",
    roleCompatible: input.roleCompatible ?? false,
    hasPasswordHash: input.hasPasswordHash ?? false,
    emailVerified: input.emailVerified ?? false,
    oauthAccountCount: input.oauthAccountCount ?? 0,
    activeSessionCount: input.activeSessionCount ?? 0,
    manualLoginObserved: input.manualLoginObserved ?? false,
    onboardingPageObserved: input.onboardingPageObserved ?? false,
    protectedRouteObserved: input.protectedRouteObserved ?? false,
    localeFallbackObserved: input.localeFallbackObserved ?? false,
    logoutObserved: input.logoutObserved ?? false,
    openCriticalUatIssueCount: input.openCriticalUatIssueCount ?? 0,
    openMajorUatIssueCount: input.openMajorUatIssueCount ?? 0,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterLoginSessionOnboardingSeverity {
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
): TesterLoginSessionOnboardingBoardItem {
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

export function buildTesterLoginSessionOnboardingUatReport(
  input: TesterLoginSessionOnboardingInput = {},
): TesterLoginSessionOnboardingReport {
  const normalized = normalizeInput(input);
  const hasLoginMethod = normalized.hasPasswordHash || normalized.oauthAccountCount > 0;
  const hasSessionEvidence = normalized.activeSessionCount > 0 || normalized.manualLoginObserved;

  const findings: TesterLoginSessionOnboardingFindingItem[] = [];

  if (!normalized.userDetected) {
    findings.push({
      id: "TLSO_FINDING_001",
      label: "Tester account not detected",
      lane: "account",
      severity: "critical",
      reason: "The tester account is not detected.",
      manualResolution: "Verify the tester account before UAT.",
      blocksManualUat: true,
    });
  }

  if (normalized.userDetected && !normalized.roleCompatible) {
    findings.push({
      id: "TLSO_FINDING_002",
      label: "Role not compatible",
      lane: "account",
      severity: "critical",
      reason: "The tester role is not compatible with UAT access.",
      manualResolution: "Resolve role mapping before UAT.",
      blocksManualUat: true,
    });
  }

  if (normalized.userDetected && !hasLoginMethod) {
    findings.push({
      id: "TLSO_FINDING_003",
      label: "Login method missing",
      lane: "login",
      severity: "critical",
      reason: "No passwordHash or OAuth account is detected.",
      manualResolution: "Complete login method setup before UAT.",
      blocksManualUat: true,
    });
  }

  if (hasLoginMethod && !normalized.manualLoginObserved) {
    findings.push({
      id: "TLSO_FINDING_004",
      label: "Manual login observation missing",
      lane: "login",
      severity: "watch",
      reason: "The tester login has not been manually confirmed in this gate.",
      manualResolution: "Perform manual login and rerun the gate with manualLoginObserved=true.",
      blocksManualUat: false,
    });
  }

  if (hasLoginMethod && !hasSessionEvidence) {
    findings.push({
      id: "TLSO_FINDING_005",
      label: "Session evidence not confirmed",
      lane: "session",
      severity: "watch",
      reason: "No active DB session or manual login evidence is available.",
      manualResolution: "Confirm session or accept manual login evidence if JWT sessions are used.",
      blocksManualUat: false,
    });
  }

  if (!normalized.onboardingPageObserved) {
    findings.push({
      id: "TLSO_FINDING_006",
      label: "Onboarding page not observed",
      lane: "onboarding",
      severity: "watch",
      reason: "The onboarding page or landing area was not manually confirmed.",
      manualResolution: "Open the app as tester and confirm the first landing page.",
      blocksManualUat: false,
    });
  }

  if (!normalized.protectedRouteObserved) {
    findings.push({
      id: "TLSO_FINDING_007",
      label: "Protected route not observed",
      lane: "protected_route",
      severity: "watch",
      reason: "A protected tester-accessible route was not manually confirmed.",
      manualResolution: "Confirm access to the expected protected route after login.",
      blocksManualUat: false,
    });
  }

  if (!normalized.localeFallbackObserved) {
    findings.push({
      id: "TLSO_FINDING_008",
      label: "Locale fallback not observed",
      lane: "onboarding",
      severity: "watch",
      reason: "Language fallback was not manually confirmed.",
      manualResolution: "Confirm that the app displays an acceptable default language.",
      blocksManualUat: false,
    });
  }

  if (!normalized.logoutObserved) {
    findings.push({
      id: "TLSO_FINDING_009",
      label: "Logout not observed",
      lane: "session",
      severity: "watch",
      reason: "Logout was not manually confirmed.",
      manualResolution: "Confirm logout before expanding UAT.",
      blocksManualUat: false,
    });
  }

  if (normalized.openCriticalUatIssueCount > 0) {
    findings.push({
      id: "TLSO_FINDING_010",
      label: "Open critical UAT issue",
      lane: "uat",
      severity: "critical",
      reason: String(normalized.openCriticalUatIssueCount) + " critical UAT issues remain open.",
      manualResolution: "Resolve critical UAT issues before proceeding.",
      blocksManualUat: true,
    });
  }

  if (normalized.openMajorUatIssueCount > 0) {
    findings.push({
      id: "TLSO_FINDING_011",
      label: "Open major UAT issue",
      lane: "uat",
      severity: "watch",
      reason: String(normalized.openMajorUatIssueCount) + " major UAT issues remain open.",
      manualResolution: "Track major issues before broader tester rollout.",
      blocksManualUat: false,
    });
  }

  const accountBoard = [
    boardItem(
      "TLSO_ACCOUNT_001",
      "Account and role",
      "account",
      normalized.userDetected && normalized.roleCompatible ? 100 : 0,
      ["userDetected", "roleCompatible"],
      "Tester account and OPERATOR role are verified read-only.",
    ),
  ];

  const loginBoard = [
    boardItem(
      "TLSO_LOGIN_001",
      "Login method",
      "login",
      hasLoginMethod ? 100 : 0,
      ["passwordHash or OAuth account"],
      "Login method exists before UAT.",
    ),
    boardItem(
      "TLSO_LOGIN_002",
      "Manual login observation",
      "login",
      normalized.manualLoginObserved ? 100 : 60,
      ["manual login confirmation"],
      "Manual login is confirmed by the operator.",
    ),
  ];

  const onboardingBoard = [
    boardItem(
      "TLSO_ONBOARDING_001",
      "Manual onboarding observation",
      "onboarding",
      normalized.onboardingPageObserved && normalized.localeFallbackObserved ? 100 : 65,
      ["landing page", "language fallback"],
      "Tester onboarding is manually verified.",
    ),
  ];

  const routeBoard = [
    boardItem(
      "TLSO_ROUTE_001",
      "Protected route and logout",
      "protected_route",
      normalized.protectedRouteObserved && normalized.logoutObserved ? 100 : 65,
      ["protected route", "logout"],
      "Tester can access protected route and logout.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TLSO_NOGO_001",
      "Account writes",
      "no_go",
      0,
      ["accountWriteAllowed=false"],
      "No-go: V20.2 does not write accounts.",
    ),
    boardItem(
      "TLSO_NOGO_002",
      "Password writes",
      "no_go",
      0,
      ["passwordWriteAllowed=false"],
      "No-go: V20.2 does not write passwordHash.",
    ),
    boardItem(
      "TLSO_NOGO_003",
      "AI/provider activation",
      "no_go",
      0,
      ["providerCalled=false"],
      "No-go: AI provider remains disabled.",
    ),
  ];

  const hasBlocking = findings.some((item) => item.blocksManualUat);
  const observationComplete =
    normalized.manualLoginObserved &&
    normalized.onboardingPageObserved &&
    normalized.protectedRouteObserved &&
    normalized.localeFallbackObserved &&
    normalized.logoutObserved;

  const uatScore = clampScore(
    (accountBoard[0].score +
      loginBoard[0].score +
      loginBoard[1].score +
      onboardingBoard[0].score +
      routeBoard[0].score) /
      5 -
      findings.filter((item) => item.blocksManualUat).length * 25,
  );

  const decision: TesterLoginSessionOnboardingDecision =
    hasBlocking
      ? "NO_GO"
      : !hasLoginMethod
        ? "LOGIN_METHOD_MISSING"
        : !normalized.manualLoginObserved
          ? "LOGIN_OBSERVATION_REQUIRED"
          : !observationComplete
            ? "ONBOARDING_REVIEW_REQUIRED"
            : "MANUAL_UAT_READY";

  const nextStep =
    decision === "MANUAL_UAT_READY"
      ? "Proceed to first manual UAT scenario execution with the pilot tester."
      : decision === "LOGIN_OBSERVATION_REQUIRED"
        ? "Perform manual login and rerun this gate with login observation enabled."
        : decision === "ONBOARDING_REVIEW_REQUIRED"
          ? "Complete onboarding/protected route/logout observations before UAT scenario execution."
          : decision === "LOGIN_METHOD_MISSING"
            ? "Return to login method setup before UAT."
            : "Resolve blocking findings before UAT.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_LOGIN_SESSION_ONBOARDING_UAT_GUARDRAIL,
    uatScore,
    decision,
    accountBoard,
    loginBoard,
    onboardingBoard,
    routeBoard,
    noGoBoard,
    findings,
    nextStep,
    safetySummary: [
      "V20.2 verifies manual login, session evidence and onboarding readiness for the existing tester.",
      "No account, password, invite, OAuth, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Public signup remains closed.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerLoginSessionOnboardingUatGateVersion = "V20.2";
