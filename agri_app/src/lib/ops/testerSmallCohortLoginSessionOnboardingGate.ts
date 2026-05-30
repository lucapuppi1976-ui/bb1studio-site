export type TesterSmallCohortLoginSessionOnboardingMode =
  | "dry-run"
  | "small-cohort-login-session-onboarding-gate";

export type TesterSmallCohortLoginSessionOnboardingDecision =
  | "SMALL_COHORT_UAT_READY"
  | "SMALL_COHORT_LOGIN_OBSERVATION_REQUIRED"
  | "SMALL_COHORT_SESSION_REVIEW_REQUIRED"
  | "ONBOARDING_EVIDENCE_INCOMPLETE"
  | "FIX_BEFORE_UAT"
  | "NO_GO";

export type TesterSmallCohortLoginSessionOnboardingSeverity =
  | "info"
  | "watch"
  | "elevated"
  | "critical";

export interface TesterSmallCohortLoginSessionOnboardingInput {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  targetCohortSize?: number;
  candidateEmails?: string[];

  firstTesterDetected?: boolean;
  firstTesterRoleCompatible?: boolean;
  firstTesterHasPasswordHash?: boolean;

  secondTesterDetected?: boolean;
  secondTesterRoleValue?: string;
  secondTesterRoleCompatible?: boolean;
  secondTesterHasPasswordHash?: boolean;

  previousPasswordSetupPilotClosed?: boolean;
  writePathsClosedConfirmed?: boolean;

  candidateEmailCount?: number;
  duplicateCandidateEmailDetected?: boolean;
  candidateExistingUserCount?: number;
  candidateRoleCompatibleCount?: number;
  candidatePasswordHashCount?: number;
  candidateActiveSessionCount?: number;

  manualLoginObservedCount?: number;
  sessionEvidenceObservedCount?: number;
  dashboardLandingObservedCount?: number;
  onboardingLandingObservedCount?: number;
  navigationObservedCount?: number;
  mobileUsabilityObservedCount?: number;
  localeFallbackObservedCount?: number;
  logoutObservedCount?: number;
  evidenceCapturedCount?: number;
  operatorSupportReadyCount?: number;

  noAccountWriteConfirmed?: boolean;
  noPasswordWriteConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  noEvidencePersistenceConfirmed?: boolean;

  openCriticalIssueCount?: number;
  openMajorIssueCount?: number;
  openMinorIssueCount?: number;
  openUsabilityIssueCount?: number;
  openLocalizationIssueCount?: number;
  openPerformanceIssueCount?: number;
}

export interface TesterSmallCohortLoginSessionOnboardingBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterSmallCohortLoginSessionOnboardingSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterSmallCohortLoginSessionOnboardingFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterSmallCohortLoginSessionOnboardingSeverity;
  reason: string;
  manualResolution: string;
  blocksUatProgression: boolean;
}

export const TESTER_SMALL_COHORT_LOGIN_SESSION_ONBOARDING_GUARDRAIL = {
  testerSmallCohortLoginSessionOnboardingGateReady: true,
  smallCohortLoginSessionVerificationReady: true,
  smallCohortManualOnboardingGateReady: true,
  candidateAccountReadinessCheckReady: true,
  candidatePasswordHashCheckReady: true,
  candidateSessionObservationReady: true,
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

export interface TesterSmallCohortLoginSessionOnboardingReport {
  generatedAt: string;
  mode: TesterSmallCohortLoginSessionOnboardingMode;
  input: Required<TesterSmallCohortLoginSessionOnboardingInput>;
  readiness: typeof TESTER_SMALL_COHORT_LOGIN_SESSION_ONBOARDING_GUARDRAIL;
  baselineScore: number;
  candidateAccessScore: number;
  loginSessionScore: number;
  onboardingScore: number;
  safetyScore: number;
  triageScore: number;
  totalScore: number;
  decision: TesterSmallCohortLoginSessionOnboardingDecision;
  baselineBoard: TesterSmallCohortLoginSessionOnboardingBoardItem[];
  candidateBoard: TesterSmallCohortLoginSessionOnboardingBoardItem[];
  loginSessionBoard: TesterSmallCohortLoginSessionOnboardingBoardItem[];
  onboardingBoard: TesterSmallCohortLoginSessionOnboardingBoardItem[];
  safetyBoard: TesterSmallCohortLoginSessionOnboardingBoardItem[];
  noGoBoard: TesterSmallCohortLoginSessionOnboardingBoardItem[];
  findings: TesterSmallCohortLoginSessionOnboardingFindingItem[];
  cohortSummary: {
    targetCohortSize: number;
    candidateEmailCount: number;
    candidateExistingUserCount: number;
    candidateRoleCompatibleCount: number;
    candidatePasswordHashCount: number;
    candidateActiveSessionCount: number;
  };
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(
  input: TesterSmallCohortLoginSessionOnboardingInput,
): Required<TesterSmallCohortLoginSessionOnboardingInput> {
  return {
    firstTesterEmail: input.firstTesterEmail ?? "",
    secondTesterEmail: input.secondTesterEmail ?? "",
    targetCohortSize: input.targetCohortSize ?? 3,
    candidateEmails: input.candidateEmails ?? [],

    firstTesterDetected: input.firstTesterDetected ?? false,
    firstTesterRoleCompatible: input.firstTesterRoleCompatible ?? false,
    firstTesterHasPasswordHash: input.firstTesterHasPasswordHash ?? false,

    secondTesterDetected: input.secondTesterDetected ?? false,
    secondTesterRoleValue: input.secondTesterRoleValue ?? "",
    secondTesterRoleCompatible: input.secondTesterRoleCompatible ?? false,
    secondTesterHasPasswordHash: input.secondTesterHasPasswordHash ?? false,

    previousPasswordSetupPilotClosed: input.previousPasswordSetupPilotClosed ?? false,
    writePathsClosedConfirmed: input.writePathsClosedConfirmed ?? false,

    candidateEmailCount: input.candidateEmailCount ?? 0,
    duplicateCandidateEmailDetected: input.duplicateCandidateEmailDetected ?? false,
    candidateExistingUserCount: input.candidateExistingUserCount ?? 0,
    candidateRoleCompatibleCount: input.candidateRoleCompatibleCount ?? 0,
    candidatePasswordHashCount: input.candidatePasswordHashCount ?? 0,
    candidateActiveSessionCount: input.candidateActiveSessionCount ?? 0,

    manualLoginObservedCount: input.manualLoginObservedCount ?? 0,
    sessionEvidenceObservedCount: input.sessionEvidenceObservedCount ?? 0,
    dashboardLandingObservedCount: input.dashboardLandingObservedCount ?? 0,
    onboardingLandingObservedCount: input.onboardingLandingObservedCount ?? 0,
    navigationObservedCount: input.navigationObservedCount ?? 0,
    mobileUsabilityObservedCount: input.mobileUsabilityObservedCount ?? 0,
    localeFallbackObservedCount: input.localeFallbackObservedCount ?? 0,
    logoutObservedCount: input.logoutObservedCount ?? 0,
    evidenceCapturedCount: input.evidenceCapturedCount ?? 0,
    operatorSupportReadyCount: input.operatorSupportReadyCount ?? 0,

    noAccountWriteConfirmed: input.noAccountWriteConfirmed ?? false,
    noPasswordWriteConfirmed: input.noPasswordWriteConfirmed ?? false,
    noInviteEmailConfirmed: input.noInviteEmailConfirmed ?? false,
    noPublicSignupConfirmed: input.noPublicSignupConfirmed ?? false,
    noSchemaMigrationConfirmed: input.noSchemaMigrationConfirmed ?? false,
    noAiProviderCallConfirmed: input.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: input.noExecutionConfirmed ?? false,
    noEvidencePersistenceConfirmed: input.noEvidencePersistenceConfirmed ?? false,

    openCriticalIssueCount: input.openCriticalIssueCount ?? 0,
    openMajorIssueCount: input.openMajorIssueCount ?? 0,
    openMinorIssueCount: input.openMinorIssueCount ?? 0,
    openUsabilityIssueCount: input.openUsabilityIssueCount ?? 0,
    openLocalizationIssueCount: input.openLocalizationIssueCount ?? 0,
    openPerformanceIssueCount: input.openPerformanceIssueCount ?? 0,
  };
}

function hasValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function countScore(value: number, target: number): number {
  return clampScore((Math.min(value, target) / Math.max(1, target)) * 100);
}

function severityFromConcern(
  score: number,
): TesterSmallCohortLoginSessionOnboardingSeverity {
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
): TesterSmallCohortLoginSessionOnboardingBoardItem {
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

export function buildTesterSmallCohortLoginSessionOnboardingReport(
  input: TesterSmallCohortLoginSessionOnboardingInput = {},
): TesterSmallCohortLoginSessionOnboardingReport {
  const normalized = normalizeInput(input);
  const targetCohortSize = Math.max(1, normalized.targetCohortSize);

  const baselineReady =
    hasValidEmail(normalized.firstTesterEmail) &&
    normalized.firstTesterDetected &&
    normalized.firstTesterRoleCompatible &&
    normalized.firstTesterHasPasswordHash &&
    hasValidEmail(normalized.secondTesterEmail) &&
    normalized.secondTesterDetected &&
    normalized.secondTesterRoleCompatible &&
    normalized.secondTesterHasPasswordHash &&
    normalized.previousPasswordSetupPilotClosed &&
    normalized.writePathsClosedConfirmed;

  const candidateReady =
    targetCohortSize >= 3 &&
    targetCohortSize <= 5 &&
    normalized.candidateEmailCount === targetCohortSize &&
    normalized.candidateEmails.every((email) => hasValidEmail(email)) &&
    !normalized.duplicateCandidateEmailDetected &&
    normalized.candidateExistingUserCount === targetCohortSize &&
    normalized.candidateRoleCompatibleCount === targetCohortSize &&
    normalized.candidatePasswordHashCount === targetCohortSize;

  const loginSessionScore = clampScore(
    (
      countScore(normalized.manualLoginObservedCount, targetCohortSize) +
      countScore(normalized.sessionEvidenceObservedCount, targetCohortSize) +
      countScore(normalized.dashboardLandingObservedCount, targetCohortSize) +
      countScore(normalized.logoutObservedCount, targetCohortSize)
    ) / 4,
  );

  const onboardingScore = clampScore(
    (
      countScore(normalized.onboardingLandingObservedCount, targetCohortSize) +
      countScore(normalized.navigationObservedCount, targetCohortSize) +
      countScore(normalized.mobileUsabilityObservedCount, targetCohortSize) +
      countScore(normalized.localeFallbackObservedCount, targetCohortSize) +
      countScore(normalized.evidenceCapturedCount, targetCohortSize) +
      countScore(normalized.operatorSupportReadyCount, targetCohortSize)
    ) / 6,
  );

  const safetyFlags = [
    normalized.noAccountWriteConfirmed,
    normalized.noPasswordWriteConfirmed,
    normalized.noInviteEmailConfirmed,
    normalized.noPublicSignupConfirmed,
    normalized.noSchemaMigrationConfirmed,
    normalized.noAiProviderCallConfirmed,
    normalized.noExecutionConfirmed,
    normalized.noEvidencePersistenceConfirmed,
  ];

  const safetyScore = clampScore(
    (safetyFlags.filter(Boolean).length / safetyFlags.length) * 100,
  );

  const triageScore = clampScore(
    100 -
      normalized.openCriticalIssueCount * 45 -
      normalized.openMajorIssueCount * 25 -
      normalized.openMinorIssueCount * 5 -
      normalized.openUsabilityIssueCount * 5 -
      normalized.openLocalizationIssueCount * 5 -
      normalized.openPerformanceIssueCount * 5,
  );

  const findings: TesterSmallCohortLoginSessionOnboardingFindingItem[] = [];

  if (!baselineReady) {
    findings.push({
      id: "SCLSOG_FINDING_001",
      label: "Baseline readiness incomplete",
      lane: "baseline",
      severity: "critical",
      reason: "First/second tester readiness, V21.8 closure or write-path closure is incomplete.",
      manualResolution: "Complete V21.8 D2 and confirm baseline testers plus write-path closure.",
      blocksUatProgression: true,
    });
  }

  if (targetCohortSize < 3 || targetCohortSize > 5) {
    findings.push({
      id: "SCLSOG_FINDING_002",
      label: "Target cohort size out of range",
      lane: "candidate",
      severity: "critical",
      reason: "V21.9 supports only a 3-5 tester small cohort.",
      manualResolution: "Use a target cohort size between 3 and 5.",
      blocksUatProgression: true,
    });
  }

  if (!candidateReady) {
    findings.push({
      id: "SCLSOG_FINDING_003",
      label: "Candidate access readiness incomplete",
      lane: "candidate",
      severity: "critical",
      reason: "Every candidate must exist, have compatible role and have passwordHash before login verification.",
      manualResolution: "Complete V21.7/V21.8 account and password setup first.",
      blocksUatProgression: true,
    });
  }

  if (normalized.duplicateCandidateEmailDetected) {
    findings.push({
      id: "SCLSOG_FINDING_004",
      label: "Duplicate candidate email",
      lane: "candidate",
      severity: "critical",
      reason: "Duplicate candidate emails make cohort verification unsafe.",
      manualResolution: "Deduplicate candidate list.",
      blocksUatProgression: true,
    });
  }

  if (safetyScore < 100) {
    findings.push({
      id: "SCLSOG_FINDING_005",
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
      id: "SCLSOG_FINDING_006",
      label: "Critical issue open",
      lane: "triage",
      severity: "critical",
      reason: "Critical issues remain open.",
      manualResolution: "Resolve critical issues before small-cohort UAT.",
      blocksUatProgression: true,
    });
  }

  if (normalized.openMajorIssueCount > 0) {
    findings.push({
      id: "SCLSOG_FINDING_007",
      label: "Major issue open",
      lane: "triage",
      severity: "elevated",
      reason: "Major issues remain open.",
      manualResolution: "Fix or explicitly defer major issues before small-cohort UAT.",
      blocksUatProgression: false,
    });
  }

  if (normalized.manualLoginObservedCount < targetCohortSize) {
    findings.push({
      id: "SCLSOG_FINDING_008",
      label: "Manual login not fully observed",
      lane: "login_session",
      severity: "watch",
      reason: "Not every candidate was observed logging in manually.",
      manualResolution: "Perform manual login with every cohort candidate and rerun this gate.",
      blocksUatProgression: false,
    });
  }

  if (normalized.sessionEvidenceObservedCount < targetCohortSize) {
    findings.push({
      id: "SCLSOG_FINDING_009",
      label: "Session evidence incomplete",
      lane: "login_session",
      severity: "watch",
      reason: "Not every candidate has captured session/cookie/manual session evidence.",
      manualResolution: "Capture session evidence for every candidate or document the manual session observation.",
      blocksUatProgression: false,
    });
  }

  if (onboardingScore < 100) {
    findings.push({
      id: "SCLSOG_FINDING_010",
      label: "Manual onboarding evidence incomplete",
      lane: "onboarding",
      severity: "watch",
      reason: "Landing, navigation, mobile, locale, evidence or operator support observations are incomplete.",
      manualResolution: "Complete onboarding observations for every candidate.",
      blocksUatProgression: false,
    });
  }

  const baselineScore = baselineReady ? 100 : 0;
  const candidateAccessScore = candidateReady ? 100 : 0;
  const hasBlocking = findings.some((item) => item.blocksUatProgression);
  const hasMajorIssue = normalized.openMajorIssueCount > 0;

  const totalScore = clampScore(
    (baselineScore +
      candidateAccessScore +
      loginSessionScore +
      onboardingScore +
      safetyScore +
      triageScore) /
      6 -
      findings.filter((item) => item.blocksUatProgression).length * 25,
  );

  const decision: TesterSmallCohortLoginSessionOnboardingDecision =
    hasBlocking
      ? "NO_GO"
      : hasMajorIssue
        ? "FIX_BEFORE_UAT"
        : normalized.manualLoginObservedCount < targetCohortSize
          ? "SMALL_COHORT_LOGIN_OBSERVATION_REQUIRED"
          : normalized.sessionEvidenceObservedCount < targetCohortSize
            ? "SMALL_COHORT_SESSION_REVIEW_REQUIRED"
            : onboardingScore < 100
              ? "ONBOARDING_EVIDENCE_INCOMPLETE"
              : "SMALL_COHORT_UAT_READY";

  const recommendedNextStep =
    decision === "SMALL_COHORT_UAT_READY"
      ? "Proceed to V22.0 small-cohort manual UAT scenario pack and evidence checklist."
      : decision === "SMALL_COHORT_LOGIN_OBSERVATION_REQUIRED"
        ? "Complete manual login observations for every cohort candidate."
        : decision === "SMALL_COHORT_SESSION_REVIEW_REQUIRED"
          ? "Capture session evidence for every cohort candidate."
          : decision === "ONBOARDING_EVIDENCE_INCOMPLETE"
            ? "Complete landing, navigation, locale, logout, evidence and support observations."
            : decision === "FIX_BEFORE_UAT"
              ? "Fix or explicitly defer major issues before small-cohort UAT."
              : "Resolve blocking findings before progressing.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_SMALL_COHORT_LOGIN_SESSION_ONBOARDING_GUARDRAIL,
    baselineScore,
    candidateAccessScore,
    loginSessionScore,
    onboardingScore,
    safetyScore,
    triageScore,
    totalScore,
    decision,
    baselineBoard: [
      boardItem(
        "SCLSOG_BASE_001",
        "Baseline tester readiness",
        "baseline",
        baselineScore,
        ["first tester", "second tester", "V21.8 closed", "write paths closed"],
        "Baseline testers remain valid before small-cohort login gate.",
      ),
    ],
    candidateBoard: [
      boardItem(
        "SCLSOG_CAND_001",
        "Candidate account and password readiness",
        "candidate",
        candidateAccessScore,
        ["candidate accounts", "role compatibility", "passwordHash", "no duplicates"],
        "Every cohort candidate is ready for manual login observation.",
      ),
    ],
    loginSessionBoard: [
      boardItem(
        "SCLSOG_LOGIN_001",
        "Small-cohort login/session observations",
        "login_session",
        loginSessionScore,
        ["manual login", "session evidence", "dashboard landing", "logout"],
        "Every candidate can enter and exit the application manually.",
      ),
    ],
    onboardingBoard: [
      boardItem(
        "SCLSOG_ONBOARDING_001",
        "Small-cohort onboarding evidence",
        "onboarding",
        onboardingScore,
        ["onboarding landing", "navigation", "mobile", "locale fallback", "evidence", "operator support"],
        "Every candidate has sufficient manual onboarding evidence.",
      ),
    ],
    safetyBoard: [
      boardItem(
        "SCLSOG_SAFETY_001",
        "No-write/no-AI/no-execution safety",
        "safety",
        safetyScore,
        ["no account write", "no password write", "no invite", "no signup", "no migration", "no AI", "no execution", "no evidence persistence"],
        "V21.9 remains read-only and safe.",
      ),
    ],
    noGoBoard: [
      boardItem(
        "SCLSOG_NOGO_001",
        "Account/password writes",
        "no_go",
        0,
        ["accountWriteAllowed=false", "passwordWriteAllowed=false"],
        "No-go: V21.9 does not write accounts or passwords.",
      ),
      boardItem(
        "SCLSOG_NOGO_002",
        "Invite/signup/migration",
        "no_go",
        0,
        ["inviteEmailSendAllowed=false", "publicSignupAllowed=false", "migrationExecutionAllowed=false"],
        "No-go: no invite email, no public signup and no migration.",
      ),
      boardItem(
        "SCLSOG_NOGO_003",
        "AI/provider/execution",
        "no_go",
        0,
        ["providerCalled=false", "operationalExecutionAllowed=false"],
        "No-go: AI provider and operational execution remain disabled.",
      ),
    ],
    findings,
    cohortSummary: {
      targetCohortSize,
      candidateEmailCount: normalized.candidateEmailCount,
      candidateExistingUserCount: normalized.candidateExistingUserCount,
      candidateRoleCompatibleCount: normalized.candidateRoleCompatibleCount,
      candidatePasswordHashCount: normalized.candidatePasswordHashCount,
      candidateActiveSessionCount: normalized.candidateActiveSessionCount,
    },
    recommendedNextStep,
    safetySummary: [
      "V21.9 verifies small-cohort login/session and manual onboarding readiness.",
      "No account, password, invite, OAuth, evidence, issue, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Public signup remains closed.",
      "Manual login/onboarding observation is required before the small-cohort scenario pack.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerSmallCohortLoginSessionOnboardingGateVersion = "V21.9";
