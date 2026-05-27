export type TesterControlledSmallCohortExpansionPlanningMode =
  | "dry-run"
  | "controlled-small-cohort-expansion-planning-gate";

export type TesterControlledSmallCohortExpansionPlanningDecision =
  | "CONTROLLED_SMALL_COHORT_PLAN_READY"
  | "COHORT_PLANNING_INCOMPLETE"
  | "CONTINUE_DUAL_TESTER_UAT"
  | "FIX_BEFORE_COHORT"
  | "NO_GO";

export type TesterControlledSmallCohortExpansionPlanningSeverity =
  | "info"
  | "watch"
  | "elevated"
  | "critical";

export interface TesterControlledSmallCohortExpansionPlanningInput {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  firstTesterName?: string;
  secondTesterName?: string;

  firstTesterDetected?: boolean;
  firstTesterRoleCompatible?: boolean;
  firstTesterHasPasswordHash?: boolean;
  firstTesterOauthAccountCount?: number;
  firstTesterActiveSessionCount?: number;

  secondTesterDetected?: boolean;
  secondTesterRoleValue?: string;
  secondTesterRoleCompatible?: boolean;
  secondTesterHasPasswordHash?: boolean;
  secondTesterOauthAccountCount?: number;
  secondTesterActiveSessionCount?: number;

  previousComparativeGateCleared?: boolean;
  writePathsClosedConfirmed?: boolean;

  targetCohortSize?: number;
  candidateProfileCount?: number;
  candidateConsentCount?: number;
  candidateContactVerifiedCount?: number;
  candidateLanguageCoverageReviewed?: boolean;
  candidateAccessScopeReviewed?: boolean;

  onboardingPlanReady?: boolean;
  communicationPlanReady?: boolean;
  privacyNoticeReady?: boolean;
  scheduleWindowReady?: boolean;
  supportCapacityConfirmed?: boolean;
  rollbackReadinessConfirmed?: boolean;
  nextTesterRunbookReady?: boolean;
  acceptanceCriteriaReady?: boolean;
  humanApprovalCaptured?: boolean;

  comparativeSummaryCarriedForward?: boolean;
  riskRegisterCaptured?: boolean;
  issuePatternReviewCarriedForward?: boolean;
  expansionDecisionNotesCaptured?: boolean;

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

export interface TesterControlledSmallCohortExpansionPlanningBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterControlledSmallCohortExpansionPlanningSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterControlledSmallCohortExpansionPlanningFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterControlledSmallCohortExpansionPlanningSeverity;
  reason: string;
  manualResolution: string;
  blocksCohortPlanning: boolean;
}

export const TESTER_CONTROLLED_SMALL_COHORT_EXPANSION_PLANNING_GUARDRAIL = {
  testerControlledSmallCohortExpansionPlanningGateReady: true,
  controlledSmallCohortPlanningReady: true,
  candidateCohortPlanReady: true,
  onboardingPlanReady: true,
  supportCapacityReviewReady: true,
  rollbackReadinessReviewReady: true,
  expansionHumanApprovalReady: true,
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

export interface TesterControlledSmallCohortExpansionPlanningReport {
  generatedAt: string;
  mode: TesterControlledSmallCohortExpansionPlanningMode;
  input: Required<TesterControlledSmallCohortExpansionPlanningInput>;
  readiness: typeof TESTER_CONTROLLED_SMALL_COHORT_EXPANSION_PLANNING_GUARDRAIL;
  accessScore: number;
  candidatePlanScore: number;
  readinessScore: number;
  evidenceScore: number;
  issueRiskScore: number;
  safetyScore: number;
  totalScore: number;
  decision: TesterControlledSmallCohortExpansionPlanningDecision;
  accessBoard: TesterControlledSmallCohortExpansionPlanningBoardItem[];
  candidateBoard: TesterControlledSmallCohortExpansionPlanningBoardItem[];
  readinessBoard: TesterControlledSmallCohortExpansionPlanningBoardItem[];
  evidenceBoard: TesterControlledSmallCohortExpansionPlanningBoardItem[];
  safetyBoard: TesterControlledSmallCohortExpansionPlanningBoardItem[];
  noGoBoard: TesterControlledSmallCohortExpansionPlanningBoardItem[];
  findings: TesterControlledSmallCohortExpansionPlanningFindingItem[];
  cohortPlanSummary: {
    targetCohortSize: number;
    candidateProfileCount: number;
    candidateConsentCount: number;
    candidateContactVerifiedCount: number;
    openCriticalIssueCount: number;
    openMajorIssueCount: number;
    openMinorIssueCount: number;
  };
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(
  input: TesterControlledSmallCohortExpansionPlanningInput,
): Required<TesterControlledSmallCohortExpansionPlanningInput> {
  return {
    firstTesterEmail: input.firstTesterEmail ?? "",
    secondTesterEmail: input.secondTesterEmail ?? "",
    firstTesterName: input.firstTesterName ?? "",
    secondTesterName: input.secondTesterName ?? "",

    firstTesterDetected: input.firstTesterDetected ?? false,
    firstTesterRoleCompatible: input.firstTesterRoleCompatible ?? false,
    firstTesterHasPasswordHash: input.firstTesterHasPasswordHash ?? false,
    firstTesterOauthAccountCount: input.firstTesterOauthAccountCount ?? 0,
    firstTesterActiveSessionCount: input.firstTesterActiveSessionCount ?? 0,

    secondTesterDetected: input.secondTesterDetected ?? false,
    secondTesterRoleValue: input.secondTesterRoleValue ?? "",
    secondTesterRoleCompatible: input.secondTesterRoleCompatible ?? false,
    secondTesterHasPasswordHash: input.secondTesterHasPasswordHash ?? false,
    secondTesterOauthAccountCount: input.secondTesterOauthAccountCount ?? 0,
    secondTesterActiveSessionCount: input.secondTesterActiveSessionCount ?? 0,

    previousComparativeGateCleared: input.previousComparativeGateCleared ?? false,
    writePathsClosedConfirmed: input.writePathsClosedConfirmed ?? false,

    targetCohortSize: input.targetCohortSize ?? 3,
    candidateProfileCount: input.candidateProfileCount ?? 0,
    candidateConsentCount: input.candidateConsentCount ?? 0,
    candidateContactVerifiedCount: input.candidateContactVerifiedCount ?? 0,
    candidateLanguageCoverageReviewed: input.candidateLanguageCoverageReviewed ?? false,
    candidateAccessScopeReviewed: input.candidateAccessScopeReviewed ?? false,

    onboardingPlanReady: input.onboardingPlanReady ?? false,
    communicationPlanReady: input.communicationPlanReady ?? false,
    privacyNoticeReady: input.privacyNoticeReady ?? false,
    scheduleWindowReady: input.scheduleWindowReady ?? false,
    supportCapacityConfirmed: input.supportCapacityConfirmed ?? false,
    rollbackReadinessConfirmed: input.rollbackReadinessConfirmed ?? false,
    nextTesterRunbookReady: input.nextTesterRunbookReady ?? false,
    acceptanceCriteriaReady: input.acceptanceCriteriaReady ?? false,
    humanApprovalCaptured: input.humanApprovalCaptured ?? false,

    comparativeSummaryCarriedForward: input.comparativeSummaryCarriedForward ?? false,
    riskRegisterCaptured: input.riskRegisterCaptured ?? false,
    issuePatternReviewCarriedForward: input.issuePatternReviewCarriedForward ?? false,
    expansionDecisionNotesCaptured: input.expansionDecisionNotesCaptured ?? false,

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
): TesterControlledSmallCohortExpansionPlanningSeverity {
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
): TesterControlledSmallCohortExpansionPlanningBoardItem {
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

export function buildTesterControlledSmallCohortExpansionPlanningReport(
  input: TesterControlledSmallCohortExpansionPlanningInput = {},
): TesterControlledSmallCohortExpansionPlanningReport {
  const normalized = normalizeInput(input);

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
    normalized.previousComparativeGateCleared &&
    normalized.writePathsClosedConfirmed;

  const targetCohortSize = Math.max(1, normalized.targetCohortSize);
  const targetSizeAcceptable = targetCohortSize >= 3 && targetCohortSize <= 5;

  const candidateCountScore = clampScore(
    (
      ratioScore(normalized.candidateProfileCount, targetCohortSize) +
      ratioScore(normalized.candidateConsentCount, targetCohortSize) +
      ratioScore(normalized.candidateContactVerifiedCount, targetCohortSize)
    ) / 3,
  );

  const candidateFlags = [
    targetSizeAcceptable,
    normalized.candidateLanguageCoverageReviewed,
    normalized.candidateAccessScopeReviewed,
  ];

  const readinessFlags = [
    normalized.onboardingPlanReady,
    normalized.communicationPlanReady,
    normalized.privacyNoticeReady,
    normalized.scheduleWindowReady,
    normalized.supportCapacityConfirmed,
    normalized.rollbackReadinessConfirmed,
    normalized.nextTesterRunbookReady,
    normalized.acceptanceCriteriaReady,
    normalized.humanApprovalCaptured,
  ];

  const evidenceFlags = [
    normalized.comparativeSummaryCarriedForward,
    normalized.riskRegisterCaptured,
    normalized.issuePatternReviewCarriedForward,
    normalized.expansionDecisionNotesCaptured,
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

  const candidatePlanScore = clampScore(
    (candidateCountScore + (candidateFlags.filter(Boolean).length / candidateFlags.length) * 100) / 2,
  );

  const readinessScore = clampScore(
    (readinessFlags.filter(Boolean).length / readinessFlags.length) * 100,
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

  const findings: TesterControlledSmallCohortExpansionPlanningFindingItem[] = [];

  if (!firstTesterReady) {
    findings.push({
      id: "CSCEP_FINDING_001",
      label: "First tester readiness incomplete",
      lane: "access",
      severity: "critical",
      reason: "First tester account, role, passwordHash or email validation is incomplete.",
      manualResolution: "Verify first tester readiness before cohort planning.",
      blocksCohortPlanning: true,
    });
  }

  if (!secondTesterReady) {
    findings.push({
      id: "CSCEP_FINDING_002",
      label: "Second tester readiness incomplete",
      lane: "access",
      severity: "critical",
      reason: "Second tester account, role, passwordHash or email validation is incomplete.",
      manualResolution: "Verify second tester readiness before cohort planning.",
      blocksCohortPlanning: true,
    });
  }

  if (!normalized.previousComparativeGateCleared) {
    findings.push({
      id: "CSCEP_FINDING_003",
      label: "Dual tester comparative gate not cleared",
      lane: "readiness",
      severity: "critical",
      reason: "V21.4 must be completed before small-cohort planning.",
      manualResolution: "Complete V21.4 with CONTROLLED_EXPANSION_READY.",
      blocksCohortPlanning: true,
    });
  }

  if (!normalized.writePathsClosedConfirmed) {
    findings.push({
      id: "CSCEP_FINDING_004",
      label: "Write paths not confirmed closed",
      lane: "safety",
      severity: "critical",
      reason: "Account/password write paths must remain closed during planning.",
      manualResolution: "Confirm Render write flags are disabled.",
      blocksCohortPlanning: true,
    });
  }

  if (targetCohortSize > 5) {
    findings.push({
      id: "CSCEP_FINDING_005",
      label: "Target cohort size too large",
      lane: "candidate",
      severity: "critical",
      reason: "V21.5 only supports a small controlled cohort of up to 5 testers.",
      manualResolution: "Reduce the target cohort size to 3-5 testers.",
      blocksCohortPlanning: true,
    });
  }

  if (targetCohortSize < 3) {
    findings.push({
      id: "CSCEP_FINDING_006",
      label: "Target cohort size too small",
      lane: "candidate",
      severity: "watch",
      reason: "A controlled small cohort should be at least 3 testers to produce useful UAT signal.",
      manualResolution: "Use a target cohort size of 3 or continue dual tester UAT.",
      blocksCohortPlanning: false,
    });
  }

  if (candidatePlanScore < 100) {
    findings.push({
      id: "CSCEP_FINDING_007",
      label: "Candidate cohort plan incomplete",
      lane: "candidate",
      severity: "watch",
      reason: "Candidate profile, consent, contact verification, language coverage or access scope review is incomplete.",
      manualResolution: "Complete candidate cohort planning before expansion.",
      blocksCohortPlanning: false,
    });
  }

  if (readinessScore < 100) {
    findings.push({
      id: "CSCEP_FINDING_008",
      label: "Expansion readiness incomplete",
      lane: "readiness",
      severity: "watch",
      reason: "Onboarding, communications, privacy, schedule, support, rollback, runbook, acceptance criteria or human approval is incomplete.",
      manualResolution: "Complete expansion readiness checklist.",
      blocksCohortPlanning: false,
    });
  }

  if (evidenceScore < 100) {
    findings.push({
      id: "CSCEP_FINDING_009",
      label: "Planning evidence incomplete",
      lane: "evidence",
      severity: "watch",
      reason: "Comparative summary, risk register, issue pattern review or decision notes are incomplete.",
      manualResolution: "Complete planning evidence before moving to candidate readiness.",
      blocksCohortPlanning: false,
    });
  }

  if (safetyScore < 100) {
    findings.push({
      id: "CSCEP_FINDING_010",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-write/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm every safety lock before progressing.",
      blocksCohortPlanning: true,
    });
  }

  if (normalized.openCriticalIssueCount > 0) {
    findings.push({
      id: "CSCEP_FINDING_011",
      label: "Critical issue open",
      lane: "triage",
      severity: "critical",
      reason: "Critical issues remain open.",
      manualResolution: "Resolve critical issues before small-cohort planning.",
      blocksCohortPlanning: true,
    });
  }

  if (normalized.openMajorIssueCount > 0) {
    findings.push({
      id: "CSCEP_FINDING_012",
      label: "Major issue open",
      lane: "triage",
      severity: "elevated",
      reason: "Major issues remain open.",
      manualResolution: "Fix or explicitly defer major issues before moving to candidate readiness.",
      blocksCohortPlanning: false,
    });
  }

  const accessScore = accessReady ? 100 : 0;
  const hasBlocking = findings.some((item) => item.blocksCohortPlanning);
  const hasMajorIssue = normalized.openMajorIssueCount > 0;

  const totalScore = clampScore(
    (accessScore + candidatePlanScore + readinessScore + evidenceScore + issueRiskScore + safetyScore) / 6 -
      findings.filter((item) => item.blocksCohortPlanning).length * 25,
  );

  const decision: TesterControlledSmallCohortExpansionPlanningDecision =
    hasBlocking
      ? "NO_GO"
      : hasMajorIssue
        ? "FIX_BEFORE_COHORT"
        : targetCohortSize < 3
          ? "CONTINUE_DUAL_TESTER_UAT"
          : candidatePlanScore < 100 || readinessScore < 100 || evidenceScore < 100 || safetyScore < 100
            ? "COHORT_PLANNING_INCOMPLETE"
            : "CONTROLLED_SMALL_COHORT_PLAN_READY";

  const recommendedNextStep =
    decision === "CONTROLLED_SMALL_COHORT_PLAN_READY"
      ? "Proceed to V21.6 small-cohort candidate readiness and provisioning gate."
      : decision === "COHORT_PLANNING_INCOMPLETE"
        ? "Complete candidate cohort planning, readiness checklist and planning evidence."
        : decision === "CONTINUE_DUAL_TESTER_UAT"
          ? "Continue dual tester UAT or increase target cohort size to at least 3."
          : decision === "FIX_BEFORE_COHORT"
            ? "Fix or explicitly defer major issues before candidate readiness."
            : "Resolve blocking findings before progressing.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_CONTROLLED_SMALL_COHORT_EXPANSION_PLANNING_GUARDRAIL,
    accessScore,
    candidatePlanScore,
    readinessScore,
    evidenceScore,
    issueRiskScore,
    safetyScore,
    totalScore,
    decision,
    accessBoard: [
      boardItem(
        "CSCEP_ACCESS_001",
        "Dual tester baseline readiness",
        "access",
        accessScore,
        ["first tester ready", "second tester ready", "V21.4 cleared", "write paths closed"],
        "Dual tester baseline is valid for small-cohort planning.",
      ),
    ],
    candidateBoard: [
      boardItem(
        "CSCEP_CANDIDATE_001",
        "Small-cohort candidate plan",
        "candidate",
        candidatePlanScore,
        ["target size", "profiles", "consent", "contact verification", "language coverage", "access scope"],
        "Candidate cohort is planned but not created.",
      ),
    ],
    readinessBoard: [
      boardItem(
        "CSCEP_READY_001",
        "Operational readiness",
        "readiness",
        readinessScore,
        ["onboarding", "communication", "privacy", "schedule", "support", "rollback", "runbook", "acceptance criteria", "approval"],
        "Small-cohort expansion can be prepared manually and safely.",
      ),
    ],
    evidenceBoard: [
      boardItem(
        "CSCEP_EVIDENCE_001",
        "Planning evidence",
        "evidence",
        evidenceScore,
        ["comparative summary", "risk register", "issue pattern review", "decision notes"],
        "Planning evidence is complete and non-persistent.",
      ),
    ],
    safetyBoard: [
      boardItem(
        "CSCEP_SAFETY_001",
        "No-write/no-AI/no-execution safety",
        "safety",
        safetyScore,
        ["no account write", "no password write", "no invite", "no signup", "no migration", "no AI", "no execution", "no evidence persistence"],
        "V21.5 remains read-only and safe.",
      ),
    ],
    noGoBoard: [
      boardItem(
        "CSCEP_NOGO_001",
        "Account/password writes",
        "no_go",
        0,
        ["accountWriteAllowed=false", "passwordWriteAllowed=false"],
        "No-go: V21.5 does not create accounts or write passwords.",
      ),
      boardItem(
        "CSCEP_NOGO_002",
        "Invite/signup",
        "no_go",
        0,
        ["inviteEmailSendAllowed=false", "publicSignupAllowed=false"],
        "No-go: V21.5 does not send invites and does not open public signup.",
      ),
      boardItem(
        "CSCEP_NOGO_003",
        "AI/provider/execution",
        "no_go",
        0,
        ["providerCalled=false", "operationalExecutionAllowed=false"],
        "No-go: AI provider and operational execution remain disabled.",
      ),
    ],
    findings,
    cohortPlanSummary: {
      targetCohortSize,
      candidateProfileCount: normalized.candidateProfileCount,
      candidateConsentCount: normalized.candidateConsentCount,
      candidateContactVerifiedCount: normalized.candidateContactVerifiedCount,
      openCriticalIssueCount: normalized.openCriticalIssueCount,
      openMajorIssueCount: normalized.openMajorIssueCount,
      openMinorIssueCount: normalized.openMinorIssueCount,
    },
    recommendedNextStep,
    safetySummary: [
      "V21.5 plans a controlled small-cohort tester expansion without creating accounts.",
      "No account, password, invite, OAuth, evidence, issue, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Public signup remains closed.",
      "Candidate provisioning, if approved, must happen in a later protected release.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerControlledSmallCohortExpansionPlanningGateVersion = "V21.5";
