export type TesterDualTesterUatComparativeExpansionMode =
  | "dry-run"
  | "dual-tester-uat-comparative-expansion-gate";

export type TesterDualTesterUatComparativeExpansionDecision =
  | "CONTROLLED_EXPANSION_READY"
  | "CONTINUE_DUAL_TESTER_UAT"
  | "FIX_BEFORE_EXPANSION"
  | "EVIDENCE_INCOMPLETE"
  | "NO_GO";

export type TesterDualTesterUatComparativeExpansionSeverity =
  | "info"
  | "watch"
  | "elevated"
  | "critical";

export interface TesterDualTesterUatComparativeExpansionInput {
  firstTesterEmail?: string;
  secondTesterEmail?: string;
  firstTesterName?: string;
  secondTesterName?: string;
  targetExpansionSize?: number;

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

  firstTesterExecutionReportComplete?: boolean;
  secondTesterExecutionReportComplete?: boolean;
  writePathsClosedConfirmed?: boolean;

  firstTesterScenarioCount?: number;
  firstTesterPassedCount?: number;
  firstTesterFailedCount?: number;
  firstTesterBlockedCount?: number;

  secondTesterScenarioCount?: number;
  secondTesterPassedCount?: number;
  secondTesterFailedCount?: number;
  secondTesterBlockedCount?: number;

  firstTesterCriticalIssueCount?: number;
  firstTesterMajorIssueCount?: number;
  firstTesterMinorIssueCount?: number;

  secondTesterCriticalIssueCount?: number;
  secondTesterMajorIssueCount?: number;
  secondTesterMinorIssueCount?: number;

  sharedCriticalIssueCount?: number;
  sharedMajorIssueCount?: number;
  sharedUsabilityIssueCount?: number;
  sharedLocalizationIssueCount?: number;
  sharedPerformanceIssueCount?: number;

  comparativeSummaryCaptured?: boolean;
  issuePatternReviewCaptured?: boolean;
  expansionRiskReviewCaptured?: boolean;
  supportCapacityConfirmed?: boolean;
  rollbackReadinessConfirmed?: boolean;
  nextTesterRunbookReady?: boolean;
  humanApprovalCaptured?: boolean;

  noAccountWriteConfirmed?: boolean;
  noPasswordWriteConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  noEvidencePersistenceConfirmed?: boolean;
}

export interface TesterDualTesterUatComparativeExpansionBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterDualTesterUatComparativeExpansionSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterDualTesterUatComparativeExpansionFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterDualTesterUatComparativeExpansionSeverity;
  reason: string;
  manualResolution: string;
  blocksExpansion: boolean;
}

export const TESTER_DUAL_TESTER_UAT_COMPARATIVE_EXPANSION_GUARDRAIL = {
  testerDualTesterUatComparativeExpansionGateReady: true,
  dualTesterComparativeReportReady: true,
  controlledExpansionDecisionReady: true,
  issuePatternReviewReady: true,
  expansionRiskReviewReady: true,
  rollbackReadinessReviewReady: true,
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

export interface TesterDualTesterUatComparativeExpansionReport {
  generatedAt: string;
  mode: TesterDualTesterUatComparativeExpansionMode;
  input: Required<TesterDualTesterUatComparativeExpansionInput>;
  readiness: typeof TESTER_DUAL_TESTER_UAT_COMPARATIVE_EXPANSION_GUARDRAIL;
  accessScore: number;
  firstTesterPassRate: number;
  secondTesterPassRate: number;
  comparativeExecutionScore: number;
  evidenceScore: number;
  issueRiskScore: number;
  expansionReadinessScore: number;
  safetyScore: number;
  totalScore: number;
  decision: TesterDualTesterUatComparativeExpansionDecision;
  accessBoard: TesterDualTesterUatComparativeExpansionBoardItem[];
  comparativeBoard: TesterDualTesterUatComparativeExpansionBoardItem[];
  issueRiskBoard: TesterDualTesterUatComparativeExpansionBoardItem[];
  expansionBoard: TesterDualTesterUatComparativeExpansionBoardItem[];
  safetyBoard: TesterDualTesterUatComparativeExpansionBoardItem[];
  noGoBoard: TesterDualTesterUatComparativeExpansionBoardItem[];
  findings: TesterDualTesterUatComparativeExpansionFindingItem[];
  comparativeSummary: {
    firstTesterPassRate: number;
    secondTesterPassRate: number;
    passRateDelta: number;
    totalCriticalIssues: number;
    totalMajorIssues: number;
    totalMinorIssues: number;
    sharedIssueCount: number;
    targetExpansionSize: number;
  };
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(
  input: TesterDualTesterUatComparativeExpansionInput,
): Required<TesterDualTesterUatComparativeExpansionInput> {
  return {
    firstTesterEmail: input.firstTesterEmail ?? "",
    secondTesterEmail: input.secondTesterEmail ?? "",
    firstTesterName: input.firstTesterName ?? "",
    secondTesterName: input.secondTesterName ?? "",
    targetExpansionSize: input.targetExpansionSize ?? 3,

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

    firstTesterExecutionReportComplete: input.firstTesterExecutionReportComplete ?? false,
    secondTesterExecutionReportComplete: input.secondTesterExecutionReportComplete ?? false,
    writePathsClosedConfirmed: input.writePathsClosedConfirmed ?? false,

    firstTesterScenarioCount: input.firstTesterScenarioCount ?? 6,
    firstTesterPassedCount: input.firstTesterPassedCount ?? 0,
    firstTesterFailedCount: input.firstTesterFailedCount ?? 0,
    firstTesterBlockedCount: input.firstTesterBlockedCount ?? 0,

    secondTesterScenarioCount: input.secondTesterScenarioCount ?? 6,
    secondTesterPassedCount: input.secondTesterPassedCount ?? 0,
    secondTesterFailedCount: input.secondTesterFailedCount ?? 0,
    secondTesterBlockedCount: input.secondTesterBlockedCount ?? 0,

    firstTesterCriticalIssueCount: input.firstTesterCriticalIssueCount ?? 0,
    firstTesterMajorIssueCount: input.firstTesterMajorIssueCount ?? 0,
    firstTesterMinorIssueCount: input.firstTesterMinorIssueCount ?? 0,

    secondTesterCriticalIssueCount: input.secondTesterCriticalIssueCount ?? 0,
    secondTesterMajorIssueCount: input.secondTesterMajorIssueCount ?? 0,
    secondTesterMinorIssueCount: input.secondTesterMinorIssueCount ?? 0,

    sharedCriticalIssueCount: input.sharedCriticalIssueCount ?? 0,
    sharedMajorIssueCount: input.sharedMajorIssueCount ?? 0,
    sharedUsabilityIssueCount: input.sharedUsabilityIssueCount ?? 0,
    sharedLocalizationIssueCount: input.sharedLocalizationIssueCount ?? 0,
    sharedPerformanceIssueCount: input.sharedPerformanceIssueCount ?? 0,

    comparativeSummaryCaptured: input.comparativeSummaryCaptured ?? false,
    issuePatternReviewCaptured: input.issuePatternReviewCaptured ?? false,
    expansionRiskReviewCaptured: input.expansionRiskReviewCaptured ?? false,
    supportCapacityConfirmed: input.supportCapacityConfirmed ?? false,
    rollbackReadinessConfirmed: input.rollbackReadinessConfirmed ?? false,
    nextTesterRunbookReady: input.nextTesterRunbookReady ?? false,
    humanApprovalCaptured: input.humanApprovalCaptured ?? false,

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

function passRate(passed: number, total: number): number {
  return clampScore((passed / Math.max(1, total)) * 100);
}

function severityFromConcern(
  score: number,
): TesterDualTesterUatComparativeExpansionSeverity {
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
): TesterDualTesterUatComparativeExpansionBoardItem {
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

export function buildTesterDualTesterUatComparativeExpansionReport(
  input: TesterDualTesterUatComparativeExpansionInput = {},
): TesterDualTesterUatComparativeExpansionReport {
  const normalized = normalizeInput(input);

  const firstTesterEmailValid = hasValidEmail(normalized.firstTesterEmail);
  const secondTesterEmailValid = hasValidEmail(normalized.secondTesterEmail);

  const firstTesterReady =
    firstTesterEmailValid &&
    normalized.firstTesterDetected &&
    normalized.firstTesterRoleCompatible &&
    normalized.firstTesterHasPasswordHash &&
    normalized.firstTesterExecutionReportComplete;

  const secondTesterReady =
    secondTesterEmailValid &&
    normalized.secondTesterDetected &&
    normalized.secondTesterRoleCompatible &&
    normalized.secondTesterHasPasswordHash &&
    normalized.secondTesterExecutionReportComplete;

  const accessReady =
    firstTesterReady &&
    secondTesterReady &&
    normalized.writePathsClosedConfirmed;

  const firstTesterPassRate = passRate(
    normalized.firstTesterPassedCount,
    normalized.firstTesterScenarioCount,
  );

  const secondTesterPassRate = passRate(
    normalized.secondTesterPassedCount,
    normalized.secondTesterScenarioCount,
  );

  const passRateDelta = Math.abs(firstTesterPassRate - secondTesterPassRate);

  const comparativeExecutionScore = clampScore(
    (firstTesterPassRate + secondTesterPassRate) / 2 -
      normalized.firstTesterFailedCount * 8 -
      normalized.secondTesterFailedCount * 8 -
      normalized.firstTesterBlockedCount * 20 -
      normalized.secondTesterBlockedCount * 20 -
      passRateDelta * 0.2,
  );

  const evidenceFlags = [
    normalized.comparativeSummaryCaptured,
    normalized.issuePatternReviewCaptured,
    normalized.expansionRiskReviewCaptured,
    normalized.supportCapacityConfirmed,
    normalized.rollbackReadinessConfirmed,
    normalized.nextTesterRunbookReady,
    normalized.humanApprovalCaptured,
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

  const totalCriticalIssues =
    normalized.firstTesterCriticalIssueCount +
    normalized.secondTesterCriticalIssueCount +
    normalized.sharedCriticalIssueCount;

  const totalMajorIssues =
    normalized.firstTesterMajorIssueCount +
    normalized.secondTesterMajorIssueCount +
    normalized.sharedMajorIssueCount;

  const totalMinorIssues =
    normalized.firstTesterMinorIssueCount +
    normalized.secondTesterMinorIssueCount;

  const sharedIssueCount =
    normalized.sharedCriticalIssueCount +
    normalized.sharedMajorIssueCount +
    normalized.sharedUsabilityIssueCount +
    normalized.sharedLocalizationIssueCount +
    normalized.sharedPerformanceIssueCount;

  const evidenceScore = clampScore(
    (evidenceFlags.filter(Boolean).length / evidenceFlags.length) * 100,
  );

  const safetyScore = clampScore(
    (safetyFlags.filter(Boolean).length / safetyFlags.length) * 100,
  );

  const issueRiskScore = clampScore(
    100 -
      totalCriticalIssues * 45 -
      totalMajorIssues * 25 -
      totalMinorIssues * 5 -
      normalized.sharedUsabilityIssueCount * 5 -
      normalized.sharedLocalizationIssueCount * 5 -
      normalized.sharedPerformanceIssueCount * 5 -
      normalized.firstTesterFailedCount * 8 -
      normalized.secondTesterFailedCount * 8 -
      normalized.firstTesterBlockedCount * 25 -
      normalized.secondTesterBlockedCount * 25,
  );

  const expansionReadinessScore = clampScore(
    (Number(normalized.supportCapacityConfirmed) * 20) +
      (Number(normalized.rollbackReadinessConfirmed) * 20) +
      (Number(normalized.nextTesterRunbookReady) * 20) +
      (Number(normalized.humanApprovalCaptured) * 20) +
      (Number(normalized.expansionRiskReviewCaptured) * 20) -
      Math.max(0, normalized.targetExpansionSize - 3) * 5,
  );

  const findings: TesterDualTesterUatComparativeExpansionFindingItem[] = [];

  if (!firstTesterReady) {
    findings.push({
      id: "DTUAT_FINDING_001",
      label: "First tester readiness incomplete",
      lane: "access",
      severity: "critical",
      reason: "First tester access or execution report is incomplete.",
      manualResolution: "Verify first tester account, passwordHash and execution report closure.",
      blocksExpansion: true,
    });
  }

  if (!secondTesterReady) {
    findings.push({
      id: "DTUAT_FINDING_002",
      label: "Second tester readiness incomplete",
      lane: "access",
      severity: "critical",
      reason: "Second tester access or execution report is incomplete.",
      manualResolution: "Verify second tester account, passwordHash and execution report closure.",
      blocksExpansion: true,
    });
  }

  if (!normalized.writePathsClosedConfirmed) {
    findings.push({
      id: "DTUAT_FINDING_003",
      label: "Write paths not confirmed closed",
      lane: "safety",
      severity: "critical",
      reason: "Account/password write paths must remain closed before expansion decision.",
      manualResolution: "Confirm Render write flags are disabled.",
      blocksExpansion: true,
    });
  }

  if (normalized.firstTesterBlockedCount > 0 || normalized.secondTesterBlockedCount > 0 || totalCriticalIssues > 0) {
    findings.push({
      id: "DTUAT_FINDING_004",
      label: "Critical issue or blocked scenario present",
      lane: "triage",
      severity: "critical",
      reason: "Blocked scenarios or critical issues remain open across testers.",
      manualResolution: "Resolve blocked/critical items before expansion.",
      blocksExpansion: true,
    });
  }

  if (normalized.firstTesterFailedCount > 0 || normalized.secondTesterFailedCount > 0 || totalMajorIssues > 0) {
    findings.push({
      id: "DTUAT_FINDING_005",
      label: "Major issue or failed scenario present",
      lane: "triage",
      severity: "elevated",
      reason: "Failed scenarios or major issues remain open across testers.",
      manualResolution: "Fix or explicitly defer major/failed items before expansion.",
      blocksExpansion: false,
    });
  }

  if (passRateDelta > 20) {
    findings.push({
      id: "DTUAT_FINDING_006",
      label: "Tester pass-rate delta high",
      lane: "comparative",
      severity: "watch",
      reason: "The pass-rate difference between testers is above 20 points.",
      manualResolution: "Review whether test instructions, device, language or onboarding caused inconsistent results.",
      blocksExpansion: false,
    });
  }

  if (!evidenceFlags.every(Boolean)) {
    findings.push({
      id: "DTUAT_FINDING_007",
      label: "Comparative evidence incomplete",
      lane: "evidence",
      severity: "watch",
      reason: "Comparative summary, risk review, runbook, approval or support evidence is incomplete.",
      manualResolution: "Complete the comparative evidence checklist before expansion decision.",
      blocksExpansion: false,
    });
  }

  if (!safetyFlags.every(Boolean)) {
    findings.push({
      id: "DTUAT_FINDING_008",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-write/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm all safety locks before progressing.",
      blocksExpansion: true,
    });
  }

  if (normalized.targetExpansionSize < 3) {
    findings.push({
      id: "DTUAT_FINDING_009",
      label: "Target expansion size too small",
      lane: "expansion",
      severity: "watch",
      reason: "A controlled expansion should define at least a small next cohort.",
      manualResolution: "Set a target expansion size of at least 3 or continue dual tester UAT.",
      blocksExpansion: false,
    });
  }

  const accessScore = accessReady ? 100 : 0;
  const hasBlocking = findings.some((item) => item.blocksExpansion);
  const hasMajorOrFailed =
    totalMajorIssues > 0 ||
    normalized.firstTesterFailedCount > 0 ||
    normalized.secondTesterFailedCount > 0;

  const totalScore = clampScore(
    (accessScore +
      comparativeExecutionScore +
      evidenceScore +
      issueRiskScore +
      expansionReadinessScore +
      safetyScore) /
      6 -
      findings.filter((item) => item.blocksExpansion).length * 25,
  );

  const decision: TesterDualTesterUatComparativeExpansionDecision =
    hasBlocking
      ? "NO_GO"
      : hasMajorOrFailed
        ? "FIX_BEFORE_EXPANSION"
        : evidenceScore < 100
          ? "EVIDENCE_INCOMPLETE"
          : expansionReadinessScore < 100
            ? "CONTINUE_DUAL_TESTER_UAT"
            : "CONTROLLED_EXPANSION_READY";

  const recommendedNextStep =
    decision === "CONTROLLED_EXPANSION_READY"
      ? "Proceed to V21.5 controlled small-cohort tester expansion planning gate."
      : decision === "CONTINUE_DUAL_TESTER_UAT"
        ? "Continue dual tester UAT until support, rollback, runbook and human approval are complete."
        : decision === "FIX_BEFORE_EXPANSION"
          ? "Fix or explicitly defer major/failed items before expansion planning."
          : decision === "EVIDENCE_INCOMPLETE"
            ? "Complete comparative summary, risk review, runbook, support and approval evidence."
            : "Resolve blocking findings before progressing.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_DUAL_TESTER_UAT_COMPARATIVE_EXPANSION_GUARDRAIL,
    accessScore,
    firstTesterPassRate,
    secondTesterPassRate,
    comparativeExecutionScore,
    evidenceScore,
    issueRiskScore,
    expansionReadinessScore,
    safetyScore,
    totalScore,
    decision,
    accessBoard: [
      boardItem(
        "DTUAT_ACCESS_001",
        "Dual tester access readiness",
        "access",
        accessScore,
        ["first tester ready", "second tester ready", "execution reports complete", "write paths closed"],
        "Both testers are valid inputs for expansion decision.",
      ),
    ],
    comparativeBoard: [
      boardItem(
        "DTUAT_COMPARE_001",
        "Dual tester scenario comparison",
        "comparative",
        comparativeExecutionScore,
        ["first pass rate", "second pass rate", "pass-rate delta", "failed/blocked scenarios"],
        "Scenario outcomes are comparable enough for expansion decision.",
      ),
    ],
    issueRiskBoard: [
      boardItem(
        "DTUAT_RISK_001",
        "Cross-tester issue risk",
        "triage",
        issueRiskScore,
        ["critical", "major", "shared issues", "usability", "localization", "performance"],
        "Cross-tester issue risk is acceptable for controlled expansion.",
      ),
    ],
    expansionBoard: [
      boardItem(
        "DTUAT_EXPANSION_001",
        "Controlled expansion readiness",
        "expansion",
        expansionReadinessScore,
        ["support capacity", "rollback readiness", "runbook", "human approval", "target cohort size"],
        "Controlled expansion plan is ready without automatic execution.",
      ),
    ],
    safetyBoard: [
      boardItem(
        "DTUAT_SAFETY_001",
        "No-write/no-AI/no-execution safety",
        "safety",
        safetyScore,
        ["no account write", "no password write", "no invite", "no signup", "no migration", "no AI", "no execution", "no evidence persistence"],
        "V21.4 remains read-only and safe.",
      ),
    ],
    noGoBoard: [
      boardItem(
        "DTUAT_NOGO_001",
        "Account/password writes",
        "no_go",
        0,
        ["accountWriteAllowed=false", "passwordWriteAllowed=false"],
        "No-go: V21.4 does not write account or password data.",
      ),
      boardItem(
        "DTUAT_NOGO_002",
        "AI/provider/execution",
        "no_go",
        0,
        ["providerCalled=false", "operationalExecutionAllowed=false"],
        "No-go: AI provider and operational execution remain disabled.",
      ),
      boardItem(
        "DTUAT_NOGO_003",
        "Evidence/issue persistence",
        "no_go",
        0,
        ["evidencePersistenceAllowed=false", "issuePersistenceAllowed=false"],
        "No-go: V21.4 does not persist evidence or issue records.",
      ),
    ],
    findings,
    comparativeSummary: {
      firstTesterPassRate,
      secondTesterPassRate,
      passRateDelta,
      totalCriticalIssues,
      totalMajorIssues,
      totalMinorIssues,
      sharedIssueCount,
      targetExpansionSize: normalized.targetExpansionSize,
    },
    recommendedNextStep,
    safetySummary: [
      "V21.4 compares first and second tester UAT outcomes and produces a controlled expansion decision.",
      "No account, password, invite, OAuth, evidence, issue, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Public signup remains closed.",
      "Controlled expansion is a planning decision only; no automatic tester creation or execution is triggered.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerDualTesterUatComparativeExpansionGateVersion = "V21.4";
