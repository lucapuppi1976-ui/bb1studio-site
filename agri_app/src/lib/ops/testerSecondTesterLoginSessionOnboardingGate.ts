export type TesterSecondTesterLoginSessionOnboardingMode =
  | "dry-run"
  | "second-tester-login-session-onboarding-gate";

export type TesterSecondTesterLoginSessionOnboardingDecision =
  | "SECOND_TESTER_UAT_READY"
  | "SECOND_TESTER_LOGIN_OBSERVATION_REQUIRED"
  | "SECOND_TESTER_SESSION_REVIEW_REQUIRED"
  | "ONBOARDING_EVIDENCE_INCOMPLETE"
  | "FIX_BEFORE_UAT"
  | "NO_GO";

export type TesterSecondTesterLoginSessionOnboardingSeverity =
  | "info"
  | "watch"
  | "elevated"
  | "critical";

export interface TesterSecondTesterLoginSessionOnboardingInput {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  secondTesterName?: string;
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

  previousPasswordSetupCleared?: boolean;
  writePathsClosedConfirmed?: boolean;

  manualLoginObserved?: boolean;
  sessionCookieObserved?: boolean;
  dashboardLandingObserved?: boolean;
  onboardingLandingObserved?: boolean;
  navigationObserved?: boolean;
  localeFallbackObserved?: boolean;
  logoutObserved?: boolean;
  evidenceCaptured?: boolean;
  operatorSupportReady?: boolean;

  noAccountWriteConfirmed?: boolean;
  noPasswordWriteConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;

  openCriticalIssueCount?: number;
  openMajorIssueCount?: number;
  openMinorIssueCount?: number;
}

export interface TesterSecondTesterLoginSessionOnboardingBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterSecondTesterLoginSessionOnboardingSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterSecondTesterLoginSessionOnboardingFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterSecondTesterLoginSessionOnboardingSeverity;
  reason: string;
  manualResolution: string;
  blocksUatProgression: boolean;
}

export const TESTER_SECOND_TESTER_LOGIN_SESSION_ONBOARDING_GUARDRAIL = {
  testerSecondTesterLoginSessionOnboardingGateReady: true,
  secondTesterLoginSessionVerificationReady: true,
  secondTesterManualOnboardingGateReady: true,
  accountExistenceCheckReady: true,
  roleCompatibilityCheckReady: true,
  passwordHashCheckReady: true,
  sessionObservationReady: true,
  manualLoginObservationReady: true,
  onboardingEvidenceReady: true,
  manualEvidenceOnly: true,
  readOnlyVerificationOnly: true,

  accountWriteAllowed: false,
  accountWritePerformed: false,
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
  localAnalysisOnly: true,
  redactedOutputOnly: true,
} as const;

export interface TesterSecondTesterLoginSessionOnboardingReport {
  generatedAt: string;
  mode: TesterSecondTesterLoginSessionOnboardingMode;
  input: Required<TesterSecondTesterLoginSessionOnboardingInput>;
  readiness: typeof TESTER_SECOND_TESTER_LOGIN_SESSION_ONBOARDING_GUARDRAIL;
  firstTesterScore: number;
  secondTesterAccessScore: number;
  loginSessionScore: number;
  onboardingScore: number;
  safetyScore: number;
  triageScore: number;
  totalScore: number;
  decision: TesterSecondTesterLoginSessionOnboardingDecision;
  firstTesterBoard: TesterSecondTesterLoginSessionOnboardingBoardItem[];
  secondTesterBoard: TesterSecondTesterLoginSessionOnboardingBoardItem[];
  loginSessionBoard: TesterSecondTesterLoginSessionOnboardingBoardItem[];
  onboardingBoard: TesterSecondTesterLoginSessionOnboardingBoardItem[];
  safetyBoard: TesterSecondTesterLoginSessionOnboardingBoardItem[];
  noGoBoard: TesterSecondTesterLoginSessionOnboardingBoardItem[];
  findings: TesterSecondTesterLoginSessionOnboardingFindingItem[];
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(
  input: TesterSecondTesterLoginSessionOnboardingInput,
): Required<TesterSecondTesterLoginSessionOnboardingInput> {
  return {
    firstTesterEmail: input.firstTesterEmail ?? "",
    secondTesterEmail: input.secondTesterEmail ?? "",
    secondTesterName: input.secondTesterName ?? "",
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

    previousPasswordSetupCleared: input.previousPasswordSetupCleared ?? false,
    writePathsClosedConfirmed: input.writePathsClosedConfirmed ?? false,

    manualLoginObserved: input.manualLoginObserved ?? false,
    sessionCookieObserved: input.sessionCookieObserved ?? false,
    dashboardLandingObserved: input.dashboardLandingObserved ?? false,
    onboardingLandingObserved: input.onboardingLandingObserved ?? false,
    navigationObserved: input.navigationObserved ?? false,
    localeFallbackObserved: input.localeFallbackObserved ?? false,
    logoutObserved: input.logoutObserved ?? false,
    evidenceCaptured: input.evidenceCaptured ?? false,
    operatorSupportReady: input.operatorSupportReady ?? false,

    noAccountWriteConfirmed: input.noAccountWriteConfirmed ?? false,
    noPasswordWriteConfirmed: input.noPasswordWriteConfirmed ?? false,
    noInviteEmailConfirmed: input.noInviteEmailConfirmed ?? false,
    noPublicSignupConfirmed: input.noPublicSignupConfirmed ?? false,
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

function severityFromConcern(
  score: number,
): TesterSecondTesterLoginSessionOnboardingSeverity {
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
): TesterSecondTesterLoginSessionOnboardingBoardItem {
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

export function buildTesterSecondTesterLoginSessionOnboardingReport(
  input: TesterSecondTesterLoginSessionOnboardingInput = {},
): TesterSecondTesterLoginSessionOnboardingReport {
  const normalized = normalizeInput(input);

  const firstTesterEmailValid = hasValidEmail(normalized.firstTesterEmail);
  const secondTesterEmailValid = hasValidEmail(normalized.secondTesterEmail);
  const sessionEvidencePresent =
    normalized.sessionCookieObserved || normalized.secondTesterActiveSessionCount > 0;

  const safetyConfirmed =
    normalized.noAccountWriteConfirmed &&
    normalized.noPasswordWriteConfirmed &&
    normalized.noInviteEmailConfirmed &&
    normalized.noPublicSignupConfirmed &&
    normalized.noSchemaMigrationConfirmed &&
    normalized.noAiProviderCallConfirmed &&
    normalized.noExecutionConfirmed;

  const findings: TesterSecondTesterLoginSessionOnboardingFindingItem[] = [];

  if (!firstTesterEmailValid || !normalized.firstTesterDetected) {
    findings.push({
      id: "STLSO_FINDING_001",
      label: "First tester not detected",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester must remain valid before second tester UAT.",
      manualResolution: "Verify the first tester account and email.",
      blocksUatProgression: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterRoleCompatible) {
    findings.push({
      id: "STLSO_FINDING_002",
      label: "First tester role not compatible",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester role is not compatible.",
      manualResolution: "Resolve first tester role mapping.",
      blocksUatProgression: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterHasPasswordHash) {
    findings.push({
      id: "STLSO_FINDING_003",
      label: "First tester login method missing",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester has no passwordHash.",
      manualResolution: "Restore first tester login readiness.",
      blocksUatProgression: true,
    });
  }

  if (!secondTesterEmailValid || !normalized.secondTesterDetected) {
    findings.push({
      id: "STLSO_FINDING_004",
      label: "Second tester not detected",
      lane: "second_tester",
      severity: "critical",
      reason: "The second tester account must exist before session verification.",
      manualResolution: "Complete second tester account write and verification first.",
      blocksUatProgression: true,
    });
  }

  if (normalized.secondTesterDetected && !normalized.secondTesterRoleCompatible) {
    findings.push({
      id: "STLSO_FINDING_005",
      label: "Second tester role not compatible",
      lane: "second_tester",
      severity: "critical",
      reason: "The second tester role is not compatible with UAT access.",
      manualResolution: "Review and correct second tester role mapping.",
      blocksUatProgression: true,
    });
  }

  if (normalized.secondTesterDetected && !normalized.secondTesterHasPasswordHash) {
    findings.push({
      id: "STLSO_FINDING_006",
      label: "Second tester passwordHash missing",
      lane: "second_tester",
      severity: "critical",
      reason: "The second tester does not have a passwordHash.",
      manualResolution: "Complete V21.0 password setup before login verification.",
      blocksUatProgression: true,
    });
  }

  if (!normalized.previousPasswordSetupCleared) {
    findings.push({
      id: "STLSO_FINDING_007",
      label: "Previous password setup not cleared",
      lane: "readiness",
      severity: "critical",
      reason: "V21.0 password setup closure must be confirmed before V21.1.",
      manualResolution: "Complete V21.0 D2 before second tester login/session gate.",
      blocksUatProgression: true,
    });
  }

  if (!normalized.writePathsClosedConfirmed) {
    findings.push({
      id: "STLSO_FINDING_008",
      label: "Write paths not confirmed closed",
      lane: "safety",
      severity: "critical",
      reason: "Account/password write paths must be closed after V21.0.",
      manualResolution: "Confirm Render write flags are disabled before UAT.",
      blocksUatProgression: true,
    });
  }

  if (!safetyConfirmed) {
    findings.push({
      id: "STLSO_FINDING_009",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-write/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm all safety locks before progressing.",
      blocksUatProgression: true,
    });
  }

  if (normalized.openCriticalIssueCount > 0) {
    findings.push({
      id: "STLSO_FINDING_010",
      label: "Critical issue open",
      lane: "triage",
      severity: "critical",
      reason: String(normalized.openCriticalIssueCount) + " critical issue(s) remain open.",
      manualResolution: "Resolve critical issues before second tester UAT.",
      blocksUatProgression: true,
    });
  }

  if (normalized.openMajorIssueCount > 0) {
    findings.push({
      id: "STLSO_FINDING_011",
      label: "Major issue open",
      lane: "triage",
      severity: "elevated",
      reason: String(normalized.openMajorIssueCount) + " major issue(s) remain open.",
      manualResolution: "Fix or explicitly defer before UAT scenario pack.",
      blocksUatProgression: false,
    });
  }

  if (!normalized.manualLoginObserved) {
    findings.push({
      id: "STLSO_FINDING_012",
      label: "Manual login not observed",
      lane: "login_session",
      severity: "watch",
      reason: "The second tester has not been observed logging in manually.",
      manualResolution: "Perform manual login with the second tester and rerun this gate.",
      blocksUatProgression: false,
    });
  }

  if (normalized.manualLoginObserved && !sessionEvidencePresent) {
    findings.push({
      id: "STLSO_FINDING_013",
      label: "Session evidence missing",
      lane: "login_session",
      severity: "watch",
      reason: "Manual login was observed but no session cookie/DB session evidence was confirmed.",
      manualResolution: "Capture session evidence or confirm session behaviour manually.",
      blocksUatProgression: false,
    });
  }

  if (
    !normalized.dashboardLandingObserved ||
    !normalized.onboardingLandingObserved ||
    !normalized.navigationObserved ||
    !normalized.localeFallbackObserved ||
    !normalized.logoutObserved ||
    !normalized.evidenceCaptured ||
    !normalized.operatorSupportReady
  ) {
    findings.push({
      id: "STLSO_FINDING_014",
      label: "Manual onboarding evidence incomplete",
      lane: "onboarding",
      severity: "watch",
      reason: "One or more onboarding/manual evidence items are incomplete.",
      manualResolution: "Complete onboarding observations, screenshots/notes and support readiness.",
      blocksUatProgression: false,
    });
  }

  const firstTesterScore =
    normalized.firstTesterDetected &&
    normalized.firstTesterRoleCompatible &&
    normalized.firstTesterHasPasswordHash
      ? 100
      : 0;

  const secondTesterAccessScore =
    normalized.secondTesterDetected &&
    normalized.secondTesterRoleCompatible &&
    normalized.secondTesterHasPasswordHash
      ? 100
      : normalized.secondTesterDetected
        ? 50
        : 0;

  const loginSessionFlags = [
    normalized.manualLoginObserved,
    sessionEvidencePresent,
    normalized.dashboardLandingObserved,
    normalized.logoutObserved,
  ];

  const onboardingFlags = [
    normalized.previousPasswordSetupCleared,
    normalized.writePathsClosedConfirmed,
    normalized.onboardingLandingObserved,
    normalized.navigationObserved,
    normalized.localeFallbackObserved,
    normalized.evidenceCaptured,
    normalized.operatorSupportReady,
  ];

  const safetyFlags = [
    normalized.noAccountWriteConfirmed,
    normalized.noPasswordWriteConfirmed,
    normalized.noInviteEmailConfirmed,
    normalized.noPublicSignupConfirmed,
    normalized.noSchemaMigrationConfirmed,
    normalized.noAiProviderCallConfirmed,
    normalized.noExecutionConfirmed,
  ];

  const loginSessionScore = clampScore(
    (loginSessionFlags.filter(Boolean).length / loginSessionFlags.length) * 100,
  );

  const onboardingScore = clampScore(
    (onboardingFlags.filter(Boolean).length / onboardingFlags.length) * 100,
  );

  const safetyScore = clampScore(
    (safetyFlags.filter(Boolean).length / safetyFlags.length) * 100,
  );

  const triageScore = clampScore(
    100 -
      normalized.openCriticalIssueCount * 45 -
      normalized.openMajorIssueCount * 25 -
      normalized.openMinorIssueCount * 5,
  );

  const firstTesterBoard = [
    boardItem(
      "STLSO_FIRST_001",
      "First tester readiness",
      "first_tester",
      firstTesterScore,
      ["first tester detected", "role compatible", "passwordHash"],
      "First tester remains valid as baseline UAT account.",
    ),
  ];

  const secondTesterBoard = [
    boardItem(
      "STLSO_SECOND_001",
      "Second tester account readiness",
      "second_tester",
      secondTesterAccessScore,
      ["second tester detected", "role compatible", "passwordHash"],
      "Second tester account is ready for manual session verification.",
    ),
    boardItem(
      "STLSO_SECOND_002",
      "Second tester session state",
      "second_tester",
      sessionEvidencePresent ? 100 : 50,
      ["session cookie observed", "active session count"],
      "Session evidence is used as supporting signal; manual observation remains required.",
    ),
  ];

  const loginSessionBoard = [
    boardItem(
      "STLSO_LOGIN_001",
      "Manual login and logout",
      "login_session",
      loginSessionScore,
      ["manual login", "session evidence", "dashboard landing", "logout"],
      "Second tester can enter and exit the application manually.",
    ),
  ];

  const onboardingBoard = [
    boardItem(
      "STLSO_ONBOARDING_001",
      "Manual onboarding evidence",
      "onboarding",
      onboardingScore,
      ["landing", "navigation", "locale fallback", "evidence", "support readiness"],
      "Second tester onboarding observations are ready for scenario pack.",
    ),
  ];

  const safetyBoard = [
    boardItem(
      "STLSO_SAFETY_001",
      "No-write/no-AI UAT safety",
      "safety",
      safetyScore,
      ["no account write", "no password write", "no invite", "no signup", "no migration", "no AI", "no execution"],
      "V21.1 remains read-only and safe.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "STLSO_NOGO_001",
      "Account/password writes",
      "no_go",
      0,
      ["accountWriteAllowed=false", "passwordWriteAllowed=false"],
      "No-go: V21.1 does not write account or password data.",
    ),
    boardItem(
      "STLSO_NOGO_002",
      "Invite/signup/migration",
      "no_go",
      0,
      ["inviteEmailSendAllowed=false", "publicSignupAllowed=false", "migrationExecutionAllowed=false"],
      "No-go: no invite email, no public signup and no migration.",
    ),
    boardItem(
      "STLSO_NOGO_003",
      "AI/provider/execution",
      "no_go",
      0,
      ["providerCalled=false", "operationalExecutionAllowed=false"],
      "No-go: AI provider and operational execution remain disabled.",
    ),
  ];

  const hasBlocking = findings.some((item) => item.blocksUatProgression);
  const hasMajorIssue = normalized.openMajorIssueCount > 0;
  const totalScore = clampScore(
    (firstTesterScore +
      secondTesterAccessScore +
      loginSessionScore +
      onboardingScore +
      safetyScore +
      triageScore) /
      6 -
      findings.filter((item) => item.blocksUatProgression).length * 25,
  );

  const decision: TesterSecondTesterLoginSessionOnboardingDecision =
    hasBlocking
      ? "NO_GO"
      : hasMajorIssue
        ? "FIX_BEFORE_UAT"
        : !normalized.manualLoginObserved
          ? "SECOND_TESTER_LOGIN_OBSERVATION_REQUIRED"
          : !sessionEvidencePresent
            ? "SECOND_TESTER_SESSION_REVIEW_REQUIRED"
            : onboardingScore < 100
              ? "ONBOARDING_EVIDENCE_INCOMPLETE"
              : "SECOND_TESTER_UAT_READY";

  const recommendedNextStep =
    decision === "SECOND_TESTER_UAT_READY"
      ? "Proceed to V21.2 second tester manual UAT scenario pack."
      : decision === "SECOND_TESTER_LOGIN_OBSERVATION_REQUIRED"
        ? "Ask the second tester to log in manually and rerun V21.1 C."
        : decision === "SECOND_TESTER_SESSION_REVIEW_REQUIRED"
          ? "Capture session evidence or confirm cookie/session behaviour before scenario pack."
          : decision === "ONBOARDING_EVIDENCE_INCOMPLETE"
            ? "Complete onboarding evidence, support notes and logout observation."
            : decision === "FIX_BEFORE_UAT"
              ? "Fix or explicitly defer major issues before second tester UAT."
              : "Resolve blocking findings before progressing.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_SECOND_TESTER_LOGIN_SESSION_ONBOARDING_GUARDRAIL,
    firstTesterScore,
    secondTesterAccessScore,
    loginSessionScore,
    onboardingScore,
    safetyScore,
    triageScore,
    totalScore,
    decision,
    firstTesterBoard,
    secondTesterBoard,
    loginSessionBoard,
    onboardingBoard,
    safetyBoard,
    noGoBoard,
    findings,
    recommendedNextStep,
    safetySummary: [
      "V21.1 verifies second tester login session and manual onboarding readiness.",
      "No account, password, invite, OAuth, evidence, issue, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Public signup remains closed.",
      "Manual login/onboarding observation is required before the second tester scenario pack.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerSecondTesterLoginSessionOnboardingGateVersion = "V21.1";
