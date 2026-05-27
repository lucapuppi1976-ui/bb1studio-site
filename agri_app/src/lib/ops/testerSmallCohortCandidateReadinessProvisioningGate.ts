export type TesterSmallCohortCandidateReadinessProvisioningMode =
  | "dry-run"
  | "small-cohort-candidate-readiness-provisioning-gate";

export type TesterSmallCohortCandidateReadinessProvisioningDecision =
  | "PROTECTED_SMALL_COHORT_ACCOUNT_WRITE_PILOT_READY"
  | "CANDIDATE_ACCESS_REVIEW_REQUIRED"
  | "CANDIDATE_READINESS_INCOMPLETE"
  | "FIX_BEFORE_PROVISIONING"
  | "NO_GO";

export type TesterSmallCohortCandidateReadinessProvisioningSeverity =
  | "info"
  | "watch"
  | "elevated"
  | "critical";

export interface TesterSmallCohortCandidateReadinessProvisioningInput {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  targetCohortSize?: number;

  firstTesterDetected?: boolean;
  firstTesterRoleCompatible?: boolean;
  firstTesterHasPasswordHash?: boolean;

  secondTesterDetected?: boolean;
  secondTesterRoleValue?: string;
  secondTesterRoleCompatible?: boolean;
  secondTesterHasPasswordHash?: boolean;

  previousSmallCohortPlanningCleared?: boolean;
  writePathsClosedConfirmed?: boolean;

  candidateEmailCount?: number;
  candidateProfileCount?: number;
  candidateConsentCount?: number;
  candidateContactVerifiedCount?: number;
  candidateLanguageCoverageReviewed?: boolean;
  candidateAccessScopeReviewed?: boolean;
  duplicateCandidateEmailDetected?: boolean;
  candidateExistingUserCount?: number;

  provisioningRunbookReady?: boolean;
  accountWritePilotPlanReady?: boolean;
  passwordSetupPlanReady?: boolean;
  manualInvitePlanDeferred?: boolean;
  supportCapacityConfirmed?: boolean;
  rollbackReadinessConfirmed?: boolean;
  privacyNoticeReady?: boolean;
  communicationPlanReady?: boolean;
  scheduleWindowReady?: boolean;
  acceptanceCriteriaReady?: boolean;
  humanApprovalCaptured?: boolean;

  candidateReadinessMatrixCaptured?: boolean;
  provisioningRiskReviewCaptured?: boolean;
  issuePatternReviewCarriedForward?: boolean;
  provisioningDecisionNotesCaptured?: boolean;

  openCriticalIssueCount?: number;
  openMajorIssueCount?: number;
  openMinorIssueCount?: number;
  openUsabilityIssueCount?: number;
  openLocalizationIssueCount?: number;
  openPerformanceIssueCount?: number;

  noAccountWriteConfirmed?: boolean;
  noPasswordWriteConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  noEvidencePersistenceConfirmed?: boolean;
}

export interface TesterSmallCohortCandidateReadinessProvisioningBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterSmallCohortCandidateReadinessProvisioningSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterSmallCohortCandidateReadinessProvisioningFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterSmallCohortCandidateReadinessProvisioningSeverity;
  reason: string;
  manualResolution: string;
  blocksProvisioning: boolean;
}

export const TESTER_SMALL_COHORT_CANDIDATE_READINESS_PROVISIONING_GUARDRAIL = {
  testerSmallCohortCandidateReadinessProvisioningGateReady: true,
  smallCohortCandidateReadinessReady: true,
  provisioningDecisionReady: true,
  duplicateCandidateCheckReady: true,
  existingUserReviewReady: true,
  accountWritePilotPlanningReady: true,
  passwordSetupPlanningReady: true,
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

export interface TesterSmallCohortCandidateReadinessProvisioningReport {
  generatedAt: string;
  mode: TesterSmallCohortCandidateReadinessProvisioningMode;
  input: Required<TesterSmallCohortCandidateReadinessProvisioningInput>;
  readiness: typeof TESTER_SMALL_COHORT_CANDIDATE_READINESS_PROVISIONING_GUARDRAIL;
  accessScore: number;
  candidateScore: number;
  provisioningScore: number;
  evidenceScore: number;
  issueRiskScore: number;
  safetyScore: number;
  totalScore: number;
  decision: TesterSmallCohortCandidateReadinessProvisioningDecision;
  accessBoard: TesterSmallCohortCandidateReadinessProvisioningBoardItem[];
  candidateBoard: TesterSmallCohortCandidateReadinessProvisioningBoardItem[];
  provisioningBoard: TesterSmallCohortCandidateReadinessProvisioningBoardItem[];
  evidenceBoard: TesterSmallCohortCandidateReadinessProvisioningBoardItem[];
  safetyBoard: TesterSmallCohortCandidateReadinessProvisioningBoardItem[];
  noGoBoard: TesterSmallCohortCandidateReadinessProvisioningBoardItem[];
  findings: TesterSmallCohortCandidateReadinessProvisioningFindingItem[];
  candidateSummary: {
    targetCohortSize: number;
    candidateEmailCount: number;
    candidateProfileCount: number;
    candidateConsentCount: number;
    candidateContactVerifiedCount: number;
    candidateExistingUserCount: number;
    duplicateCandidateEmailDetected: boolean;
  };
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(
  input: TesterSmallCohortCandidateReadinessProvisioningInput,
): Required<TesterSmallCohortCandidateReadinessProvisioningInput> {
  return {
    firstTesterEmail: input.firstTesterEmail ?? "",
    secondTesterEmail: input.secondTesterEmail ?? "",
    targetCohortSize: input.targetCohortSize ?? 3,

    firstTesterDetected: input.firstTesterDetected ?? false,
    firstTesterRoleCompatible: input.firstTesterRoleCompatible ?? false,
    firstTesterHasPasswordHash: input.firstTesterHasPasswordHash ?? false,

    secondTesterDetected: input.secondTesterDetected ?? false,
    secondTesterRoleValue: input.secondTesterRoleValue ?? "",
    secondTesterRoleCompatible: input.secondTesterRoleCompatible ?? false,
    secondTesterHasPasswordHash: input.secondTesterHasPasswordHash ?? false,

    previousSmallCohortPlanningCleared: input.previousSmallCohortPlanningCleared ?? false,
    writePathsClosedConfirmed: input.writePathsClosedConfirmed ?? false,

    candidateEmailCount: input.candidateEmailCount ?? 0,
    candidateProfileCount: input.candidateProfileCount ?? 0,
    candidateConsentCount: input.candidateConsentCount ?? 0,
    candidateContactVerifiedCount: input.candidateContactVerifiedCount ?? 0,
    candidateLanguageCoverageReviewed: input.candidateLanguageCoverageReviewed ?? false,
    candidateAccessScopeReviewed: input.candidateAccessScopeReviewed ?? false,
    duplicateCandidateEmailDetected: input.duplicateCandidateEmailDetected ?? false,
    candidateExistingUserCount: input.candidateExistingUserCount ?? 0,

    provisioningRunbookReady: input.provisioningRunbookReady ?? false,
    accountWritePilotPlanReady: input.accountWritePilotPlanReady ?? false,
    passwordSetupPlanReady: input.passwordSetupPlanReady ?? false,
    manualInvitePlanDeferred: input.manualInvitePlanDeferred ?? false,
    supportCapacityConfirmed: input.supportCapacityConfirmed ?? false,
    rollbackReadinessConfirmed: input.rollbackReadinessConfirmed ?? false,
    privacyNoticeReady: input.privacyNoticeReady ?? false,
    communicationPlanReady: input.communicationPlanReady ?? false,
    scheduleWindowReady: input.scheduleWindowReady ?? false,
    acceptanceCriteriaReady: input.acceptanceCriteriaReady ?? false,
    humanApprovalCaptured: input.humanApprovalCaptured ?? false,

    candidateReadinessMatrixCaptured: input.candidateReadinessMatrixCaptured ?? false,
    provisioningRiskReviewCaptured: input.provisioningRiskReviewCaptured ?? false,
    issuePatternReviewCarriedForward: input.issuePatternReviewCarriedForward ?? false,
    provisioningDecisionNotesCaptured: input.provisioningDecisionNotesCaptured ?? false,

    openCriticalIssueCount: input.openCriticalIssueCount ?? 0,
    openMajorIssueCount: input.openMajorIssueCount ?? 0,
    openMinorIssueCount: input.openMinorIssueCount ?? 0,
    openUsabilityIssueCount: input.openUsabilityIssueCount ?? 0,
    openLocalizationIssueCount: input.openLocalizationIssueCount ?? 0,
    openPerformanceIssueCount: input.openPerformanceIssueCount ?? 0,

    noAccountWriteConfirmed: input.noAccountWriteConfirmed ?? false,
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

function ratioScore(value: number, total: number): number {
  return clampScore((Math.min(value, Math.max(1, total)) / Math.max(1, total)) * 100);
}

function severityFromConcern(
  score: number,
): TesterSmallCohortCandidateReadinessProvisioningSeverity {
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
): TesterSmallCohortCandidateReadinessProvisioningBoardItem {
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

export function buildTesterSmallCohortCandidateReadinessProvisioningReport(
  input: TesterSmallCohortCandidateReadinessProvisioningInput = {},
): TesterSmallCohortCandidateReadinessProvisioningReport {
  const normalized = normalizeInput(input);
  const targetCohortSize = Math.max(1, normalized.targetCohortSize);

  const firstTesterReady =
    hasValidEmail(normalized.firstTesterEmail) &&
    normalized.firstTesterDetected &&
    normalized.firstTesterRoleCompatible &&
    normalized.firstTesterHasPasswordHash;

  const secondTesterReady =
    hasValidEmail(normalized.secondTesterEmail) &&
    normalized.secondTesterDetected &&
    normalized.secondTesterRoleCompatible &&
    normalized.secondTesterHasPasswordHash;

  const accessReady =
    firstTesterReady &&
    secondTesterReady &&
    normalized.previousSmallCohortPlanningCleared &&
    normalized.writePathsClosedConfirmed;

  const candidateCountScore = clampScore(
    (
      ratioScore(normalized.candidateEmailCount, targetCohortSize) +
      ratioScore(normalized.candidateProfileCount, targetCohortSize) +
      ratioScore(normalized.candidateConsentCount, targetCohortSize) +
      ratioScore(normalized.candidateContactVerifiedCount, targetCohortSize)
    ) / 4,
  );

  const candidateBooleanFlags = [
    normalized.candidateLanguageCoverageReviewed,
    normalized.candidateAccessScopeReviewed,
    !normalized.duplicateCandidateEmailDetected,
  ];

  const candidateScore = clampScore(
    (candidateCountScore + (candidateBooleanFlags.filter(Boolean).length / candidateBooleanFlags.length) * 100) / 2,
  );

  const provisioningFlags = [
    normalized.provisioningRunbookReady,
    normalized.accountWritePilotPlanReady,
    normalized.passwordSetupPlanReady,
    normalized.manualInvitePlanDeferred,
    normalized.supportCapacityConfirmed,
    normalized.rollbackReadinessConfirmed,
    normalized.privacyNoticeReady,
    normalized.communicationPlanReady,
    normalized.scheduleWindowReady,
    normalized.acceptanceCriteriaReady,
    normalized.humanApprovalCaptured,
  ];

  const evidenceFlags = [
    normalized.candidateReadinessMatrixCaptured,
    normalized.provisioningRiskReviewCaptured,
    normalized.issuePatternReviewCarriedForward,
    normalized.provisioningDecisionNotesCaptured,
  ];

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

  const provisioningScore = clampScore(
    (provisioningFlags.filter(Boolean).length / provisioningFlags.length) * 100,
  );

  const evidenceScore = clampScore(
    (evidenceFlags.filter(Boolean).length / evidenceFlags.length) * 100,
  );

  const safetyScore = clampScore(
    (safetyFlags.filter(Boolean).length / safetyFlags.length) * 100,
  );

  const issueRiskScore = clampScore(
    100 -
      normalized.openCriticalIssueCount * 45 -
      normalized.openMajorIssueCount * 25 -
      normalized.openMinorIssueCount * 5 -
      normalized.openUsabilityIssueCount * 5 -
      normalized.openLocalizationIssueCount * 5 -
      normalized.openPerformanceIssueCount * 5,
  );

  const findings: TesterSmallCohortCandidateReadinessProvisioningFindingItem[] = [];

  if (!firstTesterReady) {
    findings.push({
      id: "SCCRP_FINDING_001",
      label: "First tester readiness incomplete",
      lane: "access",
      severity: "critical",
      reason: "First tester account, role, passwordHash or email validation is incomplete.",
      manualResolution: "Verify first tester readiness.",
      blocksProvisioning: true,
    });
  }

  if (!secondTesterReady) {
    findings.push({
      id: "SCCRP_FINDING_002",
      label: "Second tester readiness incomplete",
      lane: "access",
      severity: "critical",
      reason: "Second tester account, role, passwordHash or email validation is incomplete.",
      manualResolution: "Verify second tester readiness.",
      blocksProvisioning: true,
    });
  }

  if (!normalized.previousSmallCohortPlanningCleared) {
    findings.push({
      id: "SCCRP_FINDING_003",
      label: "Small-cohort planning not cleared",
      lane: "readiness",
      severity: "critical",
      reason: "V21.5 must be completed before V21.6 candidate provisioning readiness.",
      manualResolution: "Complete V21.5 with CONTROLLED_SMALL_COHORT_PLAN_READY.",
      blocksProvisioning: true,
    });
  }

  if (!normalized.writePathsClosedConfirmed) {
    findings.push({
      id: "SCCRP_FINDING_004",
      label: "Write paths not confirmed closed",
      lane: "safety",
      severity: "critical",
      reason: "Account/password write paths must remain closed during readiness validation.",
      manualResolution: "Confirm Render write flags are disabled.",
      blocksProvisioning: true,
    });
  }

  if (targetCohortSize < 3 || targetCohortSize > 5) {
    findings.push({
      id: "SCCRP_FINDING_005",
      label: "Target cohort size out of range",
      lane: "candidate",
      severity: "critical",
      reason: "V21.6 supports a small controlled cohort of 3 to 5 candidates.",
      manualResolution: "Set target cohort size between 3 and 5.",
      blocksProvisioning: true,
    });
  }

  if (normalized.duplicateCandidateEmailDetected) {
    findings.push({
      id: "SCCRP_FINDING_006",
      label: "Duplicate candidate emails detected",
      lane: "candidate",
      severity: "critical",
      reason: "Duplicate emails in the candidate list would make provisioning unsafe.",
      manualResolution: "Deduplicate candidate emails before provisioning.",
      blocksProvisioning: true,
    });
  }

  if (normalized.candidateExistingUserCount > 0) {
    findings.push({
      id: "SCCRP_FINDING_007",
      label: "Existing candidate user detected",
      lane: "candidate",
      severity: "watch",
      reason: "One or more candidate emails already exist as users.",
      manualResolution: "Review existing access before account write pilot.",
      blocksProvisioning: false,
    });
  }

  if (candidateScore < 100) {
    findings.push({
      id: "SCCRP_FINDING_008",
      label: "Candidate readiness incomplete",
      lane: "candidate",
      severity: "watch",
      reason: "Candidate emails, profiles, consent, contact verification, language coverage or access scope are incomplete.",
      manualResolution: "Complete candidate readiness matrix.",
      blocksProvisioning: false,
    });
  }

  if (provisioningScore < 100) {
    findings.push({
      id: "SCCRP_FINDING_009",
      label: "Provisioning plan incomplete",
      lane: "provisioning",
      severity: "watch",
      reason: "Runbook, write pilot plan, password setup plan, support, rollback, communication, schedule, privacy, acceptance criteria or approval are incomplete.",
      manualResolution: "Complete provisioning readiness checklist.",
      blocksProvisioning: false,
    });
  }

  if (evidenceScore < 100) {
    findings.push({
      id: "SCCRP_FINDING_010",
      label: "Readiness evidence incomplete",
      lane: "evidence",
      severity: "watch",
      reason: "Candidate readiness matrix, risk review, issue pattern review or provisioning decision notes are incomplete.",
      manualResolution: "Complete readiness evidence before protected write pilot.",
      blocksProvisioning: false,
    });
  }

  if (safetyScore < 100) {
    findings.push({
      id: "SCCRP_FINDING_011",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-write/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm every safety lock.",
      blocksProvisioning: true,
    });
  }

  if (normalized.openCriticalIssueCount > 0) {
    findings.push({
      id: "SCCRP_FINDING_012",
      label: "Critical issue open",
      lane: "triage",
      severity: "critical",
      reason: "Critical issues remain open.",
      manualResolution: "Resolve critical issues before candidate provisioning.",
      blocksProvisioning: true,
    });
  }

  if (normalized.openMajorIssueCount > 0) {
    findings.push({
      id: "SCCRP_FINDING_013",
      label: "Major issue open",
      lane: "triage",
      severity: "elevated",
      reason: "Major issues remain open.",
      manualResolution: "Fix or explicitly defer major issues before provisioning.",
      blocksProvisioning: false,
    });
  }

  const accessScore = accessReady ? 100 : 0;
  const hasBlocking = findings.some((item) => item.blocksProvisioning);
  const hasMajorIssue = normalized.openMajorIssueCount > 0;

  const totalScore = clampScore(
    (accessScore + candidateScore + provisioningScore + evidenceScore + issueRiskScore + safetyScore) / 6 -
      findings.filter((item) => item.blocksProvisioning).length * 25,
  );

  const decision: TesterSmallCohortCandidateReadinessProvisioningDecision =
    hasBlocking
      ? "NO_GO"
      : hasMajorIssue
        ? "FIX_BEFORE_PROVISIONING"
        : normalized.candidateExistingUserCount > 0
          ? "CANDIDATE_ACCESS_REVIEW_REQUIRED"
          : candidateScore < 100 || provisioningScore < 100 || evidenceScore < 100 || safetyScore < 100
            ? "CANDIDATE_READINESS_INCOMPLETE"
            : "PROTECTED_SMALL_COHORT_ACCOUNT_WRITE_PILOT_READY";

  const recommendedNextStep =
    decision === "PROTECTED_SMALL_COHORT_ACCOUNT_WRITE_PILOT_READY"
      ? "Proceed to V21.7 protected small-cohort account write pilot."
      : decision === "CANDIDATE_ACCESS_REVIEW_REQUIRED"
        ? "Review existing candidate users before protected account write pilot."
        : decision === "CANDIDATE_READINESS_INCOMPLETE"
          ? "Complete candidate readiness, provisioning plan and evidence."
          : decision === "FIX_BEFORE_PROVISIONING"
            ? "Fix or explicitly defer major issues before provisioning."
            : "Resolve blocking findings before progressing.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_SMALL_COHORT_CANDIDATE_READINESS_PROVISIONING_GUARDRAIL,
    accessScore,
    candidateScore,
    provisioningScore,
    evidenceScore,
    issueRiskScore,
    safetyScore,
    totalScore,
    decision,
    accessBoard: [
      boardItem(
        "SCCRP_ACCESS_001",
        "Dual tester baseline readiness",
        "access",
        accessScore,
        ["first tester ready", "second tester ready", "V21.5 cleared", "write paths closed"],
        "Baseline testers remain valid before small-cohort provisioning readiness.",
      ),
    ],
    candidateBoard: [
      boardItem(
        "SCCRP_CANDIDATE_001",
        "Candidate readiness matrix",
        "candidate",
        candidateScore,
        ["candidate emails", "profiles", "consent", "contact verification", "language coverage", "access scope", "duplicate check"],
        "Candidate cohort is ready for a future protected write pilot.",
      ),
    ],
    provisioningBoard: [
      boardItem(
        "SCCRP_PROVISIONING_001",
        "Provisioning plan",
        "provisioning",
        provisioningScore,
        ["runbook", "account write pilot plan", "password setup plan", "support", "rollback", "privacy", "communication", "schedule", "approval"],
        "Provisioning is planned without writing accounts.",
      ),
    ],
    evidenceBoard: [
      boardItem(
        "SCCRP_EVIDENCE_001",
        "Readiness evidence",
        "evidence",
        evidenceScore,
        ["readiness matrix", "risk review", "issue pattern review", "decision notes"],
        "Readiness evidence is complete and non-persistent.",
      ),
    ],
    safetyBoard: [
      boardItem(
        "SCCRP_SAFETY_001",
        "No-write/no-AI/no-execution safety",
        "safety",
        safetyScore,
        ["no account write", "no password write", "no invite", "no signup", "no migration", "no AI", "no execution", "no evidence persistence"],
        "V21.6 remains read-only and safe.",
      ),
    ],
    noGoBoard: [
      boardItem(
        "SCCRP_NOGO_001",
        "Account/password writes",
        "no_go",
        0,
        ["accountWriteAllowed=false", "passwordWriteAllowed=false"],
        "No-go: V21.6 does not create accounts or write passwords.",
      ),
      boardItem(
        "SCCRP_NOGO_002",
        "Invite/signup",
        "no_go",
        0,
        ["inviteEmailSendAllowed=false", "publicSignupAllowed=false"],
        "No-go: V21.6 does not send invites and does not open public signup.",
      ),
      boardItem(
        "SCCRP_NOGO_003",
        "AI/provider/execution",
        "no_go",
        0,
        ["providerCalled=false", "operationalExecutionAllowed=false"],
        "No-go: AI provider and operational execution remain disabled.",
      ),
    ],
    findings,
    candidateSummary: {
      targetCohortSize,
      candidateEmailCount: normalized.candidateEmailCount,
      candidateProfileCount: normalized.candidateProfileCount,
      candidateConsentCount: normalized.candidateConsentCount,
      candidateContactVerifiedCount: normalized.candidateContactVerifiedCount,
      candidateExistingUserCount: normalized.candidateExistingUserCount,
      duplicateCandidateEmailDetected: normalized.duplicateCandidateEmailDetected,
    },
    recommendedNextStep,
    safetySummary: [
      "V21.6 validates small-cohort candidate readiness and provisioning plan without creating accounts.",
      "No account, password, invite, OAuth, evidence, issue, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Public signup remains closed.",
      "Protected account provisioning, if approved, must happen in a later write-pilot release.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerSmallCohortCandidateReadinessProvisioningGateVersion = "V21.6";
