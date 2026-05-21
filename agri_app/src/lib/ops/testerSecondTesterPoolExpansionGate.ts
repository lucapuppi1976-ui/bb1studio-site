export type TesterSecondTesterPoolExpansionMode = "dry-run" | "controlled-second-tester-pool-expansion";
export type TesterSecondTesterPoolExpansionDecision =
  | "SECOND_TESTER_WRITE_PILOT_READY"
  | "SECOND_TESTER_ACCESS_REVIEW_READY"
  | "CANDIDATE_SELECTION_INCOMPLETE"
  | "FIX_BEFORE_EXPANSION"
  | "NO_GO";
export type TesterSecondTesterPoolExpansionSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterSecondTesterPoolExpansionInput {
  firstTesterEmail?: string;
  candidateEmail?: string;
  candidateName?: string;
  candidateRole?: string;
  candidateLanguage?: string;
  firstTesterDetected?: boolean;
  firstTesterRoleCompatible?: boolean;
  firstTesterHasPasswordHash?: boolean;
  candidateExistingUserDetected?: boolean;
  candidateProfileCaptured?: boolean;
  candidateConsentCaptured?: boolean;
  candidateContactVerified?: boolean;
  onboardingPlanReady?: boolean;
  accessScopeReviewed?: boolean;
  languageFallbackAccepted?: boolean;
  previousFixRetestCleared?: boolean;
  secondTesterRunbookReady?: boolean;
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

export interface TesterSecondTesterPoolExpansionBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterSecondTesterPoolExpansionSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterSecondTesterPoolExpansionFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterSecondTesterPoolExpansionSeverity;
  reason: string;
  manualResolution: string;
  blocksExpansion: boolean;
}

export const TESTER_SECOND_TESTER_POOL_EXPANSION_GUARDRAIL = {
  testerSecondTesterPoolExpansionGateReady: true,
  controlledSecondTesterPoolExpansionReady: true,
  candidateReadinessBoardReady: true,
  accessScopeReviewReady: true,
  onboardingPlanReady: true,
  secondTesterWritePilotDecisionReady: true,
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

export interface TesterSecondTesterPoolExpansionReport {
  generatedAt: string;
  mode: TesterSecondTesterPoolExpansionMode;
  input: Required<TesterSecondTesterPoolExpansionInput>;
  readiness: typeof TESTER_SECOND_TESTER_POOL_EXPANSION_GUARDRAIL;
  candidateScore: number;
  onboardingScore: number;
  safetyScore: number;
  triageScore: number;
  totalScore: number;
  decision: TesterSecondTesterPoolExpansionDecision;
  firstTesterBoard: TesterSecondTesterPoolExpansionBoardItem[];
  candidateBoard: TesterSecondTesterPoolExpansionBoardItem[];
  onboardingBoard: TesterSecondTesterPoolExpansionBoardItem[];
  safetyBoard: TesterSecondTesterPoolExpansionBoardItem[];
  noGoBoard: TesterSecondTesterPoolExpansionBoardItem[];
  findings: TesterSecondTesterPoolExpansionFindingItem[];
  expansionChecklist: Array<{
    id: string;
    title: string;
    requiredEvidence: string[];
    passCriteria: string[];
  }>;
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(input: TesterSecondTesterPoolExpansionInput): Required<TesterSecondTesterPoolExpansionInput> {
  return {
    firstTesterEmail: input.firstTesterEmail ?? "",
    candidateEmail: input.candidateEmail ?? "",
    candidateName: input.candidateName ?? "",
    candidateRole: input.candidateRole ?? "OPERATOR",
    candidateLanguage: input.candidateLanguage ?? "it",
    firstTesterDetected: input.firstTesterDetected ?? false,
    firstTesterRoleCompatible: input.firstTesterRoleCompatible ?? false,
    firstTesterHasPasswordHash: input.firstTesterHasPasswordHash ?? false,
    candidateExistingUserDetected: input.candidateExistingUserDetected ?? false,
    candidateProfileCaptured: input.candidateProfileCaptured ?? false,
    candidateConsentCaptured: input.candidateConsentCaptured ?? false,
    candidateContactVerified: input.candidateContactVerified ?? false,
    onboardingPlanReady: input.onboardingPlanReady ?? false,
    accessScopeReviewed: input.accessScopeReviewed ?? false,
    languageFallbackAccepted: input.languageFallbackAccepted ?? false,
    previousFixRetestCleared: input.previousFixRetestCleared ?? false,
    secondTesterRunbookReady: input.secondTesterRunbookReady ?? false,
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

function severityFromConcern(score: number): TesterSecondTesterPoolExpansionSeverity {
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
): TesterSecondTesterPoolExpansionBoardItem {
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

export function buildTesterSecondTesterPoolExpansionReport(
  input: TesterSecondTesterPoolExpansionInput = {},
): TesterSecondTesterPoolExpansionReport {
  const normalized = normalizeInput(input);
  const candidateEmailValid = hasValidEmail(normalized.candidateEmail);

  const findings: TesterSecondTesterPoolExpansionFindingItem[] = [];

  if (!normalized.firstTesterDetected) {
    findings.push({
      id: "TSTPE_FINDING_001",
      label: "First tester not detected",
      lane: "first_tester",
      severity: "critical",
      reason: "The existing pilot tester must be detected before expanding the tester pool.",
      manualResolution: "Verify the first tester account before adding a second tester.",
      blocksExpansion: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterRoleCompatible) {
    findings.push({
      id: "TSTPE_FINDING_002",
      label: "First tester role not compatible",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester role is not compatible with the UAT access model.",
      manualResolution: "Resolve role mapping before expanding UAT.",
      blocksExpansion: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterHasPasswordHash) {
    findings.push({
      id: "TSTPE_FINDING_003",
      label: "First tester login method missing",
      lane: "first_tester",
      severity: "critical",
      reason: "The first tester does not have passwordHash available.",
      manualResolution: "Complete login setup before expanding UAT.",
      blocksExpansion: true,
    });
  }

  if (!candidateEmailValid) {
    findings.push({
      id: "TSTPE_FINDING_004",
      label: "Second tester candidate email invalid",
      lane: "candidate",
      severity: "critical",
      reason: "A valid second tester candidate email is required.",
      manualResolution: "Provide a valid candidate email before the write pilot.",
      blocksExpansion: true,
    });
  }

  if (!normalized.candidateProfileCaptured || !normalized.candidateConsentCaptured || !normalized.candidateContactVerified) {
    findings.push({
      id: "TSTPE_FINDING_005",
      label: "Candidate profile incomplete",
      lane: "candidate",
      severity: "watch",
      reason: "Candidate profile, consent or contact verification is incomplete.",
      manualResolution: "Capture candidate profile, consent and contact verification.",
      blocksExpansion: false,
    });
  }

  if (!normalized.previousFixRetestCleared) {
    findings.push({
      id: "TSTPE_FINDING_006",
      label: "Previous fix/retest gate not cleared",
      lane: "readiness",
      severity: "critical",
      reason: "V20.6 fix/retest gate must be cleared before expanding the tester pool.",
      manualResolution: "Complete V20.6 before V20.7 expansion.",
      blocksExpansion: true,
    });
  }

  if (!normalized.onboardingPlanReady || !normalized.secondTesterRunbookReady || !normalized.operatorSupportReady) {
    findings.push({
      id: "TSTPE_FINDING_007",
      label: "Second tester onboarding plan incomplete",
      lane: "onboarding",
      severity: "watch",
      reason: "Onboarding plan, runbook or operator support is incomplete.",
      manualResolution: "Prepare onboarding/runbook/support before account write pilot.",
      blocksExpansion: false,
    });
  }

  if (!normalized.accessScopeReviewed || !normalized.languageFallbackAccepted) {
    findings.push({
      id: "TSTPE_FINDING_008",
      label: "Access scope or language fallback incomplete",
      lane: "access_scope",
      severity: "watch",
      reason: "Access scope review or language fallback acceptance is incomplete.",
      manualResolution: "Confirm OPERATOR scope and app-level language fallback.",
      blocksExpansion: false,
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
      id: "TSTPE_FINDING_009",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-write/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm all safety locks before expansion.",
      blocksExpansion: true,
    });
  }

  if (normalized.openCriticalIssueCount > 0) {
    findings.push({
      id: "TSTPE_FINDING_010",
      label: "Critical issue open",
      lane: "triage",
      severity: "critical",
      reason: String(normalized.openCriticalIssueCount) + " critical issue(s) remain open.",
      manualResolution: "Resolve critical issues before expanding the tester pool.",
      blocksExpansion: true,
    });
  }

  if (normalized.openMajorIssueCount > 0) {
    findings.push({
      id: "TSTPE_FINDING_011",
      label: "Major issue open",
      lane: "triage",
      severity: "elevated",
      reason: String(normalized.openMajorIssueCount) + " major issue(s) remain open.",
      manualResolution: "Fix or explicitly defer before expanding the tester pool.",
      blocksExpansion: false,
    });
  }

  const candidateFlags = [
    candidateEmailValid,
    normalized.candidateProfileCaptured,
    normalized.candidateConsentCaptured,
    normalized.candidateContactVerified,
  ];

  const onboardingFlags = [
    normalized.previousFixRetestCleared,
    normalized.onboardingPlanReady,
    normalized.accessScopeReviewed,
    normalized.languageFallbackAccepted,
    normalized.secondTesterRunbookReady,
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

  const candidateScore = clampScore((candidateFlags.filter(Boolean).length / candidateFlags.length) * 100);
  const onboardingScore = clampScore((onboardingFlags.filter(Boolean).length / onboardingFlags.length) * 100);
  const safetyScore = clampScore((safetyFlags.filter(Boolean).length / safetyFlags.length) * 100);
  const triageScore = clampScore(
    100 - normalized.openCriticalIssueCount * 45 - normalized.openMajorIssueCount * 25 - normalized.openMinorIssueCount * 5,
  );

  const firstTesterBoard = [
    boardItem(
      "TSTPE_FIRST_001",
      "Existing first tester readiness",
      "first_tester",
      normalized.firstTesterDetected && normalized.firstTesterRoleCompatible && normalized.firstTesterHasPasswordHash ? 100 : 0,
      ["first tester detected", "role compatible", "passwordHash"],
      "The first tester remains valid before expanding the pool.",
    ),
  ];

  const candidateBoard = [
    boardItem(
      "TSTPE_CANDIDATE_001",
      "Second tester candidate readiness",
      "candidate",
      candidateScore,
      ["valid email", "profile", "consent", "contact verification"],
      "Candidate is ready for a future protected account write pilot.",
    ),
  ];

  const onboardingBoard = [
    boardItem(
      "TSTPE_ONBOARDING_001",
      "Second tester onboarding plan",
      "onboarding",
      onboardingScore,
      ["V20.6 cleared", "onboarding", "access scope", "language fallback", "runbook", "support"],
      "Second tester onboarding is prepared without account creation.",
    ),
  ];

  const safetyBoard = [
    boardItem(
      "TSTPE_SAFETY_001",
      "No-write/no-AI expansion safety",
      "safety",
      safetyScore,
      ["no signup", "no account write", "no password write", "no invite", "no migration", "no AI", "no execution"],
      "V20.7 remains read-only and safe.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TSTPE_NOGO_001",
      "Account/password/invite writes",
      "no_go",
      0,
      ["accountWriteAllowed=false", "passwordWriteAllowed=false", "inviteEmailSendAllowed=false"],
      "No-go: V20.7 does not create accounts, write passwords or send invites.",
    ),
    boardItem(
      "TSTPE_NOGO_002",
      "Candidate/evidence persistence",
      "no_go",
      0,
      ["candidatePersistenceAllowed=false", "evidencePersistenceAllowed=false"],
      "No-go: V20.7 does not persist candidate data or evidence.",
    ),
    boardItem(
      "TSTPE_NOGO_003",
      "AI/provider/execution",
      "no_go",
      0,
      ["providerCalled=false", "operationalExecutionAllowed=false"],
      "No-go: AI provider and operational execution remain disabled.",
    ),
  ];

  const blocking = findings.some((item) => item.blocksExpansion);
  const allPrepared = candidateScore === 100 && onboardingScore === 100 && safetyScore === 100;
  const hasMajorIssue = normalized.openMajorIssueCount > 0;

  const totalScore = clampScore(
    (firstTesterBoard[0].score + candidateScore + onboardingScore + safetyScore + triageScore) / 5 -
      findings.filter((item) => item.blocksExpansion).length * 25,
  );

  const decision: TesterSecondTesterPoolExpansionDecision =
    blocking
      ? "NO_GO"
      : hasMajorIssue
        ? "FIX_BEFORE_EXPANSION"
        : !allPrepared
          ? "CANDIDATE_SELECTION_INCOMPLETE"
          : normalized.candidateExistingUserDetected
            ? "SECOND_TESTER_ACCESS_REVIEW_READY"
            : "SECOND_TESTER_WRITE_PILOT_READY";

  const recommendedNextStep =
    decision === "SECOND_TESTER_WRITE_PILOT_READY"
      ? "Proceed to V20.8 protected second tester account write pilot."
      : decision === "SECOND_TESTER_ACCESS_REVIEW_READY"
        ? "Proceed to V20.8 second tester access verification because the candidate already exists."
        : decision === "CANDIDATE_SELECTION_INCOMPLETE"
          ? "Complete candidate profile, onboarding plan and safety confirmations before V20.8."
          : decision === "FIX_BEFORE_EXPANSION"
            ? "Fix or explicitly defer major issues before expanding the tester pool."
            : "Resolve blocking findings before expanding the tester pool.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_SECOND_TESTER_POOL_EXPANSION_GUARDRAIL,
    candidateScore,
    onboardingScore,
    safetyScore,
    triageScore,
    totalScore,
    decision,
    firstTesterBoard,
    candidateBoard,
    onboardingBoard,
    safetyBoard,
    noGoBoard,
    findings,
    expansionChecklist: [
      {
        id: "EXP-001",
        title: "Candidate identity and contact",
        requiredEvidence: ["candidate email", "candidate display name", "contact verified"],
        passCriteria: ["email valid", "profile captured", "candidate consent captured"],
      },
      {
        id: "EXP-002",
        title: "Access scope and language fallback",
        requiredEvidence: ["OPERATOR scope", "language fallback accepted"],
        passCriteria: ["no SUPER_ADMIN grant", "app-level language fallback accepted"],
      },
      {
        id: "EXP-003",
        title: "Onboarding and support",
        requiredEvidence: ["runbook", "operator support contact", "manual onboarding path"],
        passCriteria: ["runbook ready", "support ready", "public signup remains closed"],
      },
      {
        id: "EXP-004",
        title: "Safety locks",
        requiredEvidence: ["no write", "no invite", "no AI", "no execution", "no migration"],
        passCriteria: ["all safety confirmations true", "critical issues zero"],
      },
    ],
    recommendedNextStep,
    safetySummary: [
      "V20.7 prepares controlled second tester pool expansion without creating accounts.",
      "No account, password, invite, OAuth, candidate, evidence, issue, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Public signup remains closed.",
      "Second tester write, if approved, must happen in a separate protected write pilot release.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerSecondTesterPoolExpansionGateVersion = "V20.7";
