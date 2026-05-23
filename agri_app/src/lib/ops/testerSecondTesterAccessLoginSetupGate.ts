export type TesterSecondTesterAccessLoginSetupMode = "dry-run" | "second-tester-access-login-setup-gate";
export type TesterSecondTesterAccessLoginSetupDecision =
  | "SECOND_TESTER_LOGIN_READY"
  | "SECOND_TESTER_LOGIN_OBSERVATION_REQUIRED"
  | "SECOND_TESTER_PASSWORD_SETUP_REQUIRED"
  | "SECOND_TESTER_ACCOUNT_WRITE_REQUIRED"
  | "FIX_BEFORE_LOGIN_SETUP"
  | "NO_GO";
export type TesterSecondTesterAccessLoginSetupSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterSecondTesterAccessLoginSetupInput {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  secondTesterName?: string;
  secondTesterRole?: string;
  secondTesterLanguage?: string;
  firstTesterDetected?: boolean;
  firstTesterRoleCompatible?: boolean;
  firstTesterHasPasswordHash?: boolean;
  secondTesterDetected?: boolean;
  secondTesterRoleValue?: string;
  secondTesterRoleCompatible?: boolean;
  secondTesterEmailVerified?: boolean;
  secondTesterHasPasswordHash?: boolean;
  secondTesterOauthAccountCount?: number;
  secondTesterActiveSessionCount?: number;
  previousExpansionGateCleared?: boolean;
  candidateProfileCaptured?: boolean;
  accessScopeReviewed?: boolean;
  onboardingPlanReady?: boolean;
  languageFallbackAccepted?: boolean;
  manualLoginObserved?: boolean;
  passwordSetupPlanReady?: boolean;
  operatorSupportReady?: boolean;
  noPublicSignupConfirmed?: boolean;
  noAccountWriteConfirmed?: boolean;
  noPasswordWriteConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  openCriticalIssueCount?: number;
  openMajorIssueCount?: number;
  openMinorIssueCount?: number;
}

export interface TesterSecondTesterAccessLoginSetupBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterSecondTesterAccessLoginSetupSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterSecondTesterAccessLoginSetupFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterSecondTesterAccessLoginSetupSeverity;
  reason: string;
  manualResolution: string;
  blocksLoginSetup: boolean;
}

export const TESTER_SECOND_TESTER_ACCESS_LOGIN_SETUP_GUARDRAIL = {
  testerSecondTesterAccessLoginSetupGateReady: true,
  secondTesterAccessVerificationReady: true,
  secondTesterLoginSetupDecisionReady: true,
  accountExistenceCheckReady: true,
  roleCompatibilityCheckReady: true,
  loginMethodCheckReady: true,
  manualLoginObservationReady: true,
  manualEvidenceOnly: true,
  readOnlyVerificationOnly: true,
  candidatePersistenceAllowed: false,
  candidatePersistencePerformed: false,
  accountWriteAllowed: false,
  accountWritePerformed: false,
  testerAccountCreateAllowed: false,
  testerAccountCreatePerformed: false,
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
  humanReviewRequired: true,
  localAnalysisOnly: true,
  redactedOutputOnly: true,
} as const;

export interface TesterSecondTesterAccessLoginSetupReport {
  generatedAt: string;
  mode: TesterSecondTesterAccessLoginSetupMode;
  input: Required<TesterSecondTesterAccessLoginSetupInput>;
  readiness: typeof TESTER_SECOND_TESTER_ACCESS_LOGIN_SETUP_GUARDRAIL;
  firstTesterScore: number;
  secondTesterAccessScore: number;
  loginMethodScore: number;
  onboardingScore: number;
  safetyScore: number;
  triageScore: number;
  totalScore: number;
  decision: TesterSecondTesterAccessLoginSetupDecision;
  firstTesterBoard: TesterSecondTesterAccessLoginSetupBoardItem[];
  secondTesterBoard: TesterSecondTesterAccessLoginSetupBoardItem[];
  loginMethodBoard: TesterSecondTesterAccessLoginSetupBoardItem[];
  onboardingBoard: TesterSecondTesterAccessLoginSetupBoardItem[];
  safetyBoard: TesterSecondTesterAccessLoginSetupBoardItem[];
  noGoBoard: TesterSecondTesterAccessLoginSetupBoardItem[];
  findings: TesterSecondTesterAccessLoginSetupFindingItem[];
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(input: TesterSecondTesterAccessLoginSetupInput): Required<TesterSecondTesterAccessLoginSetupInput> {
  return {
    firstTesterEmail: input.firstTesterEmail ?? "",
    secondTesterEmail: input.secondTesterEmail ?? "",
    secondTesterName: input.secondTesterName ?? "",
    secondTesterRole: input.secondTesterRole ?? "OPERATOR",
    secondTesterLanguage: input.secondTesterLanguage ?? "it",
    firstTesterDetected: input.firstTesterDetected ?? false,
    firstTesterRoleCompatible: input.firstTesterRoleCompatible ?? false,
    firstTesterHasPasswordHash: input.firstTesterHasPasswordHash ?? false,
    secondTesterDetected: input.secondTesterDetected ?? false,
    secondTesterRoleValue: input.secondTesterRoleValue ?? "",
    secondTesterRoleCompatible: input.secondTesterRoleCompatible ?? false,
    secondTesterEmailVerified: input.secondTesterEmailVerified ?? false,
    secondTesterHasPasswordHash: input.secondTesterHasPasswordHash ?? false,
    secondTesterOauthAccountCount: input.secondTesterOauthAccountCount ?? 0,
    secondTesterActiveSessionCount: input.secondTesterActiveSessionCount ?? 0,
    previousExpansionGateCleared: input.previousExpansionGateCleared ?? false,
    candidateProfileCaptured: input.candidateProfileCaptured ?? false,
    accessScopeReviewed: input.accessScopeReviewed ?? false,
    onboardingPlanReady: input.onboardingPlanReady ?? false,
    languageFallbackAccepted: input.languageFallbackAccepted ?? false,
    manualLoginObserved: input.manualLoginObserved ?? false,
    passwordSetupPlanReady: input.passwordSetupPlanReady ?? false,
    operatorSupportReady: input.operatorSupportReady ?? false,
    noPublicSignupConfirmed: input.noPublicSignupConfirmed ?? false,
    noAccountWriteConfirmed: input.noAccountWriteConfirmed ?? false,
    noPasswordWriteConfirmed: input.noPasswordWriteConfirmed ?? false,
    noInviteEmailConfirmed: input.noInviteEmailConfirmed ?? false,
    noSchemaMigrationConfirmed: input.noSchemaMigrationConfirmed ?? false,
    noAiProviderCallConfirmed: input.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: input.noExecutionConfirmed ?? false,
    openCriticalIssueCount: input.openCriticalIssueCount ?? 0,
    openMajorIssueCount: input.openMajorIssueCount ?? 0,
    openMinorIssueCount: input.openMinorIssueCount ?? 0,
  };
}

function hasValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterSecondTesterAccessLoginSetupSeverity {
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
): TesterSecondTesterAccessLoginSetupBoardItem {
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

export function buildTesterSecondTesterAccessLoginSetupReport(
  input: TesterSecondTesterAccessLoginSetupInput = {},
): TesterSecondTesterAccessLoginSetupReport {
  const normalized = normalizeInput(input);
  const firstTesterEmailValid = hasValidEmail(normalized.firstTesterEmail);
  const secondTesterEmailValid = hasValidEmail(normalized.secondTesterEmail);
  const secondTesterHasLoginMethod =
    normalized.secondTesterHasPasswordHash ||
    normalized.secondTesterOauthAccountCount > 0 ||
    normalized.secondTesterActiveSessionCount > 0;

  const findings: TesterSecondTesterAccessLoginSetupFindingItem[] = [];

  if (!firstTesterEmailValid || !normalized.firstTesterDetected) {
    findings.push({
      id: "STALG_FINDING_001",
      label: "First tester not detected",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester must remain valid before second tester setup.",
      manualResolution: "Verify the first tester account and email.",
      blocksLoginSetup: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterRoleCompatible) {
    findings.push({
      id: "STALG_FINDING_002",
      label: "First tester role not compatible",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester role is not compatible.",
      manualResolution: "Resolve first tester role mapping.",
      blocksLoginSetup: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterHasPasswordHash) {
    findings.push({
      id: "STALG_FINDING_003",
      label: "First tester login method missing",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester has no passwordHash.",
      manualResolution: "Restore first tester login readiness before proceeding.",
      blocksLoginSetup: true,
    });
  }

  if (!secondTesterEmailValid) {
    findings.push({
      id: "STALG_FINDING_004",
      label: "Second tester email invalid",
      lane: "second_tester",
      severity: "critical",
      reason: "A valid second tester email is required.",
      manualResolution: "Provide a valid second tester email.",
      blocksLoginSetup: true,
    });
  }

  if (!normalized.previousExpansionGateCleared) {
    findings.push({
      id: "STALG_FINDING_005",
      label: "V20.7 expansion gate not cleared",
      lane: "readiness",
      severity: "critical",
      reason: "The second tester expansion gate must be cleared first.",
      manualResolution: "Complete V20.7 before V20.8.",
      blocksLoginSetup: true,
    });
  }

  if (normalized.secondTesterDetected && !normalized.secondTesterRoleCompatible) {
    findings.push({
      id: "STALG_FINDING_006",
      label: "Second tester role not compatible",
      lane: "second_tester",
      severity: "critical",
      reason: "The existing second tester account has an incompatible role.",
      manualResolution: "Review and correct role mapping before login setup.",
      blocksLoginSetup: true,
    });
  }

  if (!normalized.candidateProfileCaptured || !normalized.accessScopeReviewed) {
    findings.push({
      id: "STALG_FINDING_007",
      label: "Candidate/access profile incomplete",
      lane: "onboarding",
      severity: "watch",
      reason: "Candidate profile or access scope review is incomplete.",
      manualResolution: "Complete profile and OPERATOR access scope review.",
      blocksLoginSetup: false,
    });
  }

  if (!normalized.onboardingPlanReady || !normalized.languageFallbackAccepted || !normalized.operatorSupportReady) {
    findings.push({
      id: "STALG_FINDING_008",
      label: "Onboarding plan incomplete",
      lane: "onboarding",
      severity: "watch",
      reason: "Onboarding plan, language fallback or support readiness is incomplete.",
      manualResolution: "Prepare onboarding plan and support notes.",
      blocksLoginSetup: false,
    });
  }

  if (
    !normalized.noPublicSignupConfirmed ||
    !normalized.noAccountWriteConfirmed ||
    !normalized.noPasswordWriteConfirmed ||
    !normalized.noInviteEmailConfirmed ||
    !normalized.noSchemaMigrationConfirmed ||
    !normalized.noAiProviderCallConfirmed ||
    !normalized.noExecutionConfirmed
  ) {
    findings.push({
      id: "STALG_FINDING_009",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-write/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm all safety locks before proceeding.",
      blocksLoginSetup: true,
    });
  }

  if (normalized.openCriticalIssueCount > 0) {
    findings.push({
      id: "STALG_FINDING_010",
      label: "Critical issue open",
      lane: "triage",
      severity: "critical",
      reason: String(normalized.openCriticalIssueCount) + " critical issue(s) remain open.",
      manualResolution: "Resolve critical issues before login setup.",
      blocksLoginSetup: true,
    });
  }

  if (normalized.openMajorIssueCount > 0) {
    findings.push({
      id: "STALG_FINDING_011",
      label: "Major issue open",
      lane: "triage",
      severity: "elevated",
      reason: String(normalized.openMajorIssueCount) + " major issue(s) remain open.",
      manualResolution: "Fix or explicitly defer major issues before proceeding.",
      blocksLoginSetup: false,
    });
  }

  if (normalized.secondTesterDetected && !secondTesterHasLoginMethod && !normalized.passwordSetupPlanReady) {
    findings.push({
      id: "STALG_FINDING_012",
      label: "Password setup plan missing",
      lane: "login_method",
      severity: "watch",
      reason: "The second tester exists but no login method or password setup plan is present.",
      manualResolution: "Prepare protected password setup pilot or alternate auth method.",
      blocksLoginSetup: false,
    });
  }

  if (normalized.secondTesterDetected && secondTesterHasLoginMethod && !normalized.manualLoginObserved) {
    findings.push({
      id: "STALG_FINDING_013",
      label: "Manual login not observed",
      lane: "login_method",
      severity: "watch",
      reason: "The second tester has a login method but manual login has not been observed.",
      manualResolution: "Ask the second tester to log in and rerun this gate.",
      blocksLoginSetup: false,
    });
  }

  const firstTesterScore = normalized.firstTesterDetected && normalized.firstTesterRoleCompatible && normalized.firstTesterHasPasswordHash ? 100 : 0;
  const secondTesterAccessScore = normalized.secondTesterDetected
    ? normalized.secondTesterRoleCompatible ? 100 : 20
    : secondTesterEmailValid ? 60 : 0;

  const loginMethodScore = normalized.secondTesterDetected
    ? secondTesterHasLoginMethod
      ? normalized.manualLoginObserved ? 100 : 75
      : normalized.passwordSetupPlanReady ? 65 : 40
    : 50;

  const onboardingFlags = [
    normalized.previousExpansionGateCleared,
    normalized.candidateProfileCaptured,
    normalized.accessScopeReviewed,
    normalized.onboardingPlanReady,
    normalized.languageFallbackAccepted,
    normalized.operatorSupportReady,
  ];

  const safetyFlags = [
    normalized.noPublicSignupConfirmed,
    normalized.noAccountWriteConfirmed,
    normalized.noPasswordWriteConfirmed,
    normalized.noInviteEmailConfirmed,
    normalized.noSchemaMigrationConfirmed,
    normalized.noAiProviderCallConfirmed,
    normalized.noExecutionConfirmed,
  ];

  const onboardingScore = clampScore((onboardingFlags.filter(Boolean).length / onboardingFlags.length) * 100);
  const safetyScore = clampScore((safetyFlags.filter(Boolean).length / safetyFlags.length) * 100);
  const triageScore = clampScore(
    100 - normalized.openCriticalIssueCount * 45 - normalized.openMajorIssueCount * 25 - normalized.openMinorIssueCount * 5,
  );

  const firstTesterBoard = [
    boardItem(
      "STALG_FIRST_001",
      "First tester readiness",
      "first_tester",
      firstTesterScore,
      ["first tester detected", "role compatible", "passwordHash"],
      "First tester remains valid before second tester access setup.",
    ),
  ];

  const secondTesterBoard = [
    boardItem(
      "STALG_SECOND_001",
      "Second tester account/access",
      "second_tester",
      secondTesterAccessScore,
      ["second tester email", "existing user lookup", "role compatibility"],
      "Second tester account state is known before any write pilot.",
    ),
  ];

  const loginMethodBoard = [
    boardItem(
      "STALG_LOGIN_001",
      "Second tester login method",
      "login_method",
      loginMethodScore,
      ["passwordHash", "OAuth account", "active session", "manual login observation"],
      "Login method readiness is verified without writing password data.",
    ),
  ];

  const onboardingBoard = [
    boardItem(
      "STALG_ONBOARDING_001",
      "Second tester onboarding readiness",
      "onboarding",
      onboardingScore,
      ["V20.7 cleared", "profile", "scope", "plan", "language fallback", "support"],
      "Onboarding is prepared using app-level language fallback.",
    ),
  ];

  const safetyBoard = [
    boardItem(
      "STALG_SAFETY_001",
      "No-write/no-AI login setup safety",
      "safety",
      safetyScore,
      ["no signup", "no account write", "no password write", "no invite", "no migration", "no AI", "no execution"],
      "V20.8 remains read-only and safe.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "STALG_NOGO_001",
      "Account/password/invite writes",
      "no_go",
      0,
      ["accountWriteAllowed=false", "passwordWriteAllowed=false", "inviteEmailSendAllowed=false"],
      "No-go: V20.8 does not create accounts, write passwords or send invites.",
    ),
    boardItem(
      "STALG_NOGO_002",
      "Candidate/evidence persistence",
      "no_go",
      0,
      ["candidatePersistenceAllowed=false", "evidencePersistenceAllowed=false"],
      "No-go: V20.8 does not persist candidate data or evidence.",
    ),
    boardItem(
      "STALG_NOGO_003",
      "AI/provider/execution",
      "no_go",
      0,
      ["providerCalled=false", "operationalExecutionAllowed=false"],
      "No-go: AI provider and operational execution remain disabled.",
    ),
  ];

  const blocking = findings.some((item) => item.blocksLoginSetup);
  const hasMajorIssue = normalized.openMajorIssueCount > 0;

  const totalScore = clampScore(
    (firstTesterScore + secondTesterAccessScore + loginMethodScore + onboardingScore + safetyScore + triageScore) / 6 -
      findings.filter((item) => item.blocksLoginSetup).length * 25,
  );

  const decision: TesterSecondTesterAccessLoginSetupDecision =
    blocking
      ? "NO_GO"
      : hasMajorIssue
        ? "FIX_BEFORE_LOGIN_SETUP"
        : !normalized.secondTesterDetected
          ? "SECOND_TESTER_ACCOUNT_WRITE_REQUIRED"
          : !secondTesterHasLoginMethod
            ? "SECOND_TESTER_PASSWORD_SETUP_REQUIRED"
            : !normalized.manualLoginObserved
              ? "SECOND_TESTER_LOGIN_OBSERVATION_REQUIRED"
              : "SECOND_TESTER_LOGIN_READY";

  const recommendedNextStep =
    decision === "SECOND_TESTER_LOGIN_READY"
      ? "Proceed to V20.9 second tester manual UAT scenario pack."
      : decision === "SECOND_TESTER_LOGIN_OBSERVATION_REQUIRED"
        ? "Perform manual login with the second tester and rerun V20.8 C."
        : decision === "SECOND_TESTER_PASSWORD_SETUP_REQUIRED"
          ? "Proceed to protected second tester password setup pilot."
          : decision === "SECOND_TESTER_ACCOUNT_WRITE_REQUIRED"
            ? "Proceed to protected second tester account write pilot."
            : decision === "FIX_BEFORE_LOGIN_SETUP"
              ? "Fix or explicitly defer major issues before login setup."
              : "Resolve blocking findings before second tester login setup.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_SECOND_TESTER_ACCESS_LOGIN_SETUP_GUARDRAIL,
    firstTesterScore,
    secondTesterAccessScore,
    loginMethodScore,
    onboardingScore,
    safetyScore,
    triageScore,
    totalScore,
    decision,
    firstTesterBoard,
    secondTesterBoard,
    loginMethodBoard,
    onboardingBoard,
    safetyBoard,
    noGoBoard,
    findings,
    recommendedNextStep,
    safetySummary: [
      "V20.8 verifies second tester access and login setup readiness without writing data.",
      "No account, password, invite, OAuth, candidate, evidence, issue, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Public signup remains closed.",
      "Second tester account/password writes, if required, must happen in a separate protected write pilot release.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerSecondTesterAccessLoginSetupGateVersion = "V20.8";
