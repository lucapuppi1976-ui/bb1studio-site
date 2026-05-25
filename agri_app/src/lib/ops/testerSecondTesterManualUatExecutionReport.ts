export type TesterSecondTesterManualUatExecutionReportMode =
  | "dry-run"
  | "second-tester-manual-uat-execution-report";

export type TesterSecondTesterManualUatExecutionReportDecision =
  | "SECOND_TESTER_UAT_EXECUTION_REPORT_COMPLETE"
  | "SECOND_TESTER_RETEST_REQUIRED"
  | "FIX_BEFORE_EXPANSION"
  | "EVIDENCE_INCOMPLETE"
  | "NO_GO";

export type TesterSecondTesterManualUatExecutionReportSeverity =
  | "info"
  | "watch"
  | "elevated"
  | "critical";

export interface TesterSecondTesterManualUatExecutionReportInput {
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

  previousScenarioPackComplete?: boolean;
  writePathsClosedConfirmed?: boolean;

  totalScenarioCount?: number;
  passedScenarioCount?: number;
  failedScenarioCount?: number;
  blockedScenarioCount?: number;

  executionSummaryCaptured?: boolean;
  screenshotsCaptured?: boolean;
  notesCaptured?: boolean;
  issueTriageCaptured?: boolean;
  scenarioEvidenceReviewed?: boolean;
  operatorSupportReady?: boolean;

  criticalIssueCount?: number;
  majorIssueCount?: number;
  minorIssueCount?: number;
  usabilityIssueCount?: number;
  localizationIssueCount?: number;
  performanceIssueCount?: number;

  noAccountWriteConfirmed?: boolean;
  noPasswordWriteConfirmed?: boolean;
  noInviteEmailConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  noEvidencePersistenceConfirmed?: boolean;
}

export interface TesterSecondTesterManualUatExecutionReportBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterSecondTesterManualUatExecutionReportSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterSecondTesterManualUatExecutionReportFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterSecondTesterManualUatExecutionReportSeverity;
  reason: string;
  manualResolution: string;
  blocksExecutionReport: boolean;
}

export const TESTER_SECOND_TESTER_MANUAL_UAT_EXECUTION_REPORT_GUARDRAIL = {
  testerSecondTesterManualUatExecutionReportReady: true,
  secondTesterExecutionSummaryReady: true,
  issueTriageBoardReady: true,
  scenarioOutcomeMatrixReady: true,
  expansionDecisionInputReady: true,
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

export interface TesterSecondTesterManualUatExecutionReport {
  generatedAt: string;
  mode: TesterSecondTesterManualUatExecutionReportMode;
  input: Required<TesterSecondTesterManualUatExecutionReportInput>;
  readiness: typeof TESTER_SECOND_TESTER_MANUAL_UAT_EXECUTION_REPORT_GUARDRAIL;
  accessScore: number;
  executionScore: number;
  evidenceScore: number;
  triageScore: number;
  safetyScore: number;
  totalScore: number;
  scenarioPassRate: number;
  decision: TesterSecondTesterManualUatExecutionReportDecision;
  accessBoard: TesterSecondTesterManualUatExecutionReportBoardItem[];
  executionBoard: TesterSecondTesterManualUatExecutionReportBoardItem[];
  evidenceBoard: TesterSecondTesterManualUatExecutionReportBoardItem[];
  triageBoard: TesterSecondTesterManualUatExecutionReportBoardItem[];
  safetyBoard: TesterSecondTesterManualUatExecutionReportBoardItem[];
  noGoBoard: TesterSecondTesterManualUatExecutionReportBoardItem[];
  findings: TesterSecondTesterManualUatExecutionReportFindingItem[];
  triageSummary: {
    critical: number;
    major: number;
    minor: number;
    usability: number;
    localization: number;
    performance: number;
    failedScenarios: number;
    blockedScenarios: number;
  };
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(
  input: TesterSecondTesterManualUatExecutionReportInput,
): Required<TesterSecondTesterManualUatExecutionReportInput> {
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

    previousScenarioPackComplete: input.previousScenarioPackComplete ?? false,
    writePathsClosedConfirmed: input.writePathsClosedConfirmed ?? false,

    totalScenarioCount: input.totalScenarioCount ?? 6,
    passedScenarioCount: input.passedScenarioCount ?? 0,
    failedScenarioCount: input.failedScenarioCount ?? 0,
    blockedScenarioCount: input.blockedScenarioCount ?? 0,

    executionSummaryCaptured: input.executionSummaryCaptured ?? false,
    screenshotsCaptured: input.screenshotsCaptured ?? false,
    notesCaptured: input.notesCaptured ?? false,
    issueTriageCaptured: input.issueTriageCaptured ?? false,
    scenarioEvidenceReviewed: input.scenarioEvidenceReviewed ?? false,
    operatorSupportReady: input.operatorSupportReady ?? false,

    criticalIssueCount: input.criticalIssueCount ?? 0,
    majorIssueCount: input.majorIssueCount ?? 0,
    minorIssueCount: input.minorIssueCount ?? 0,
    usabilityIssueCount: input.usabilityIssueCount ?? 0,
    localizationIssueCount: input.localizationIssueCount ?? 0,
    performanceIssueCount: input.performanceIssueCount ?? 0,

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

function severityFromConcern(
  score: number,
): TesterSecondTesterManualUatExecutionReportSeverity {
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
): TesterSecondTesterManualUatExecutionReportBoardItem {
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

export function buildTesterSecondTesterManualUatExecutionReport(
  input: TesterSecondTesterManualUatExecutionReportInput = {},
): TesterSecondTesterManualUatExecutionReport {
  const normalized = normalizeInput(input);

  const firstTesterEmailValid = hasValidEmail(normalized.firstTesterEmail);
  const secondTesterEmailValid = hasValidEmail(normalized.secondTesterEmail);
  const safeTotalScenarioCount = Math.max(1, normalized.totalScenarioCount);

  const accessReady =
    firstTesterEmailValid &&
    secondTesterEmailValid &&
    normalized.firstTesterDetected &&
    normalized.firstTesterRoleCompatible &&
    normalized.firstTesterHasPasswordHash &&
    normalized.secondTesterDetected &&
    normalized.secondTesterRoleCompatible &&
    normalized.secondTesterHasPasswordHash &&
    normalized.previousScenarioPackComplete &&
    normalized.writePathsClosedConfirmed;

  const evidenceFlags = [
    normalized.executionSummaryCaptured,
    normalized.screenshotsCaptured,
    normalized.notesCaptured,
    normalized.issueTriageCaptured,
    normalized.scenarioEvidenceReviewed,
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
    normalized.noEvidencePersistenceConfirmed,
  ];

  const scenarioPassRate = clampScore(
    (normalized.passedScenarioCount / safeTotalScenarioCount) * 100,
  );

  const executionScore = clampScore(
    scenarioPassRate -
      normalized.failedScenarioCount * 12 -
      normalized.blockedScenarioCount * 25,
  );

  const evidenceScore = clampScore(
    (evidenceFlags.filter(Boolean).length / evidenceFlags.length) * 100,
  );

  const safetyScore = clampScore(
    (safetyFlags.filter(Boolean).length / safetyFlags.length) * 100,
  );

  const triageScore = clampScore(
    100 -
      normalized.criticalIssueCount * 45 -
      normalized.majorIssueCount * 25 -
      normalized.minorIssueCount * 5 -
      normalized.usabilityIssueCount * 5 -
      normalized.localizationIssueCount * 5 -
      normalized.performanceIssueCount * 5 -
      normalized.failedScenarioCount * 10 -
      normalized.blockedScenarioCount * 25,
  );

  const findings: TesterSecondTesterManualUatExecutionReportFindingItem[] = [];

  if (!firstTesterEmailValid || !normalized.firstTesterDetected) {
    findings.push({
      id: "STUER_FINDING_001",
      label: "First tester not detected",
      lane: "access",
      severity: "critical",
      reason: "The first tester baseline account must remain valid.",
      manualResolution: "Verify first tester access before execution report closure.",
      blocksExecutionReport: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterRoleCompatible) {
    findings.push({
      id: "STUER_FINDING_002",
      label: "First tester role not compatible",
      lane: "access",
      severity: "critical",
      reason: "The first tester role is not compatible.",
      manualResolution: "Resolve first tester role mapping.",
      blocksExecutionReport: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterHasPasswordHash) {
    findings.push({
      id: "STUER_FINDING_003",
      label: "First tester passwordHash missing",
      lane: "access",
      severity: "critical",
      reason: "The first tester must keep a working login method.",
      manualResolution: "Restore first tester login readiness.",
      blocksExecutionReport: true,
    });
  }

  if (!secondTesterEmailValid || !normalized.secondTesterDetected) {
    findings.push({
      id: "STUER_FINDING_004",
      label: "Second tester not detected",
      lane: "access",
      severity: "critical",
      reason: "The second tester account must exist before execution reporting.",
      manualResolution: "Complete second tester account/password setup first.",
      blocksExecutionReport: true,
    });
  }

  if (normalized.secondTesterDetected && !normalized.secondTesterRoleCompatible) {
    findings.push({
      id: "STUER_FINDING_005",
      label: "Second tester role not compatible",
      lane: "access",
      severity: "critical",
      reason: "The second tester role is not compatible with UAT access.",
      manualResolution: "Review and correct role mapping.",
      blocksExecutionReport: true,
    });
  }

  if (normalized.secondTesterDetected && !normalized.secondTesterHasPasswordHash) {
    findings.push({
      id: "STUER_FINDING_006",
      label: "Second tester passwordHash missing",
      lane: "access",
      severity: "critical",
      reason: "The second tester must have a login method before execution reporting.",
      manualResolution: "Complete second tester password setup first.",
      blocksExecutionReport: true,
    });
  }

  if (!normalized.previousScenarioPackComplete) {
    findings.push({
      id: "STUER_FINDING_007",
      label: "Previous scenario pack not complete",
      lane: "readiness",
      severity: "critical",
      reason: "V21.2 must be completed before V21.3 execution report.",
      manualResolution: "Complete V21.2 with SECOND_TESTER_SCENARIO_PACK_COMPLETE.",
      blocksExecutionReport: true,
    });
  }

  if (!normalized.writePathsClosedConfirmed) {
    findings.push({
      id: "STUER_FINDING_008",
      label: "Write paths not confirmed closed",
      lane: "safety",
      severity: "critical",
      reason: "Account/password write paths must remain closed during execution reporting.",
      manualResolution: "Confirm Render write flags are disabled.",
      blocksExecutionReport: true,
    });
  }

  if (!evidenceFlags.every(Boolean)) {
    findings.push({
      id: "STUER_FINDING_009",
      label: "Execution evidence incomplete",
      lane: "evidence",
      severity: "watch",
      reason: "Execution summary, screenshots, notes, triage, scenario evidence review or support evidence is incomplete.",
      manualResolution: "Complete manual evidence before closing V21.3.",
      blocksExecutionReport: false,
    });
  }

  if (!safetyFlags.every(Boolean)) {
    findings.push({
      id: "STUER_FINDING_010",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-write/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm all safety locks before progressing.",
      blocksExecutionReport: true,
    });
  }

  if (normalized.blockedScenarioCount > 0 || normalized.criticalIssueCount > 0) {
    findings.push({
      id: "STUER_FINDING_011",
      label: "Blocked scenario or critical issue open",
      lane: "triage",
      severity: "critical",
      reason: "Blocked scenarios or critical issues remain open.",
      manualResolution: "Resolve blocked/critical items before closing execution report.",
      blocksExecutionReport: true,
    });
  }

  if (normalized.failedScenarioCount > 0 || normalized.majorIssueCount > 0) {
    findings.push({
      id: "STUER_FINDING_012",
      label: "Failed scenario or major issue open",
      lane: "triage",
      severity: "elevated",
      reason: "Failed scenarios or major issues remain open.",
      manualResolution: "Fix or explicitly defer major items before expansion decision.",
      blocksExecutionReport: false,
    });
  }

  const accessScore = accessReady ? 100 : 0;
  const hasBlocking = findings.some((item) => item.blocksExecutionReport);
  const hasMajorOrFailed =
    normalized.failedScenarioCount > 0 || normalized.majorIssueCount > 0;

  const totalScore = clampScore(
    (accessScore + executionScore + evidenceScore + triageScore + safetyScore) / 5 -
      findings.filter((item) => item.blocksExecutionReport).length * 25,
  );

  const decision: TesterSecondTesterManualUatExecutionReportDecision =
    hasBlocking
      ? "NO_GO"
      : hasMajorOrFailed
        ? "FIX_BEFORE_EXPANSION"
        : evidenceScore < 100
          ? "EVIDENCE_INCOMPLETE"
          : normalized.passedScenarioCount < safeTotalScenarioCount
            ? "SECOND_TESTER_RETEST_REQUIRED"
            : "SECOND_TESTER_UAT_EXECUTION_REPORT_COMPLETE";

  const recommendedNextStep =
    decision === "SECOND_TESTER_UAT_EXECUTION_REPORT_COMPLETE"
      ? "Proceed to V21.4 dual tester UAT comparative report and expansion decision gate."
      : decision === "SECOND_TESTER_RETEST_REQUIRED"
        ? "Complete retest for missing scenarios before expansion decision."
        : decision === "FIX_BEFORE_EXPANSION"
          ? "Fix or explicitly defer major/failed items before expansion decision."
          : decision === "EVIDENCE_INCOMPLETE"
            ? "Complete execution evidence, screenshots, notes and triage before closing V21.3."
            : "Resolve blocking findings before progressing.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_SECOND_TESTER_MANUAL_UAT_EXECUTION_REPORT_GUARDRAIL,
    accessScore,
    executionScore,
    evidenceScore,
    triageScore,
    safetyScore,
    totalScore,
    scenarioPassRate,
    decision,
    accessBoard: [
      boardItem(
        "STUER_ACCESS_001",
        "Second tester access readiness",
        "access",
        accessScore,
        ["first tester valid", "second tester detected", "role compatible", "passwordHash", "V21.2 complete"],
        "Second tester access is valid for execution report closure.",
      ),
    ],
    executionBoard: [
      boardItem(
        "STUER_EXECUTION_001",
        "Scenario execution outcome",
        "execution",
        executionScore,
        ["total scenarios", "passed", "failed", "blocked"],
        "Scenario execution outcome is captured manually.",
      ),
    ],
    evidenceBoard: [
      boardItem(
        "STUER_EVIDENCE_001",
        "Execution evidence completeness",
        "evidence",
        evidenceScore,
        ["summary", "screenshots", "notes", "triage", "scenario evidence review", "operator support"],
        "Manual evidence is complete enough for report closure.",
      ),
    ],
    triageBoard: [
      boardItem(
        "STUER_TRIAGE_001",
        "Issue triage board",
        "triage",
        triageScore,
        ["critical", "major", "minor", "usability", "localization", "performance", "failed", "blocked"],
        "Issue triage is manually captured without persistence.",
      ),
    ],
    safetyBoard: [
      boardItem(
        "STUER_SAFETY_001",
        "No-write/no-AI/no-execution safety",
        "safety",
        safetyScore,
        ["no account write", "no password write", "no invite", "no signup", "no migration", "no AI", "no execution", "no evidence persistence"],
        "V21.3 remains read-only and safe.",
      ),
    ],
    noGoBoard: [
      boardItem(
        "STUER_NOGO_001",
        "Account/password writes",
        "no_go",
        0,
        ["accountWriteAllowed=false", "passwordWriteAllowed=false"],
        "No-go: V21.3 does not write account or password data.",
      ),
      boardItem(
        "STUER_NOGO_002",
        "AI/provider/execution",
        "no_go",
        0,
        ["providerCalled=false", "operationalExecutionAllowed=false"],
        "No-go: AI provider and operational execution remain disabled.",
      ),
      boardItem(
        "STUER_NOGO_003",
        "Evidence/issue persistence",
        "no_go",
        0,
        ["evidencePersistenceAllowed=false", "issuePersistenceAllowed=false"],
        "No-go: V21.3 does not persist evidence or issue records.",
      ),
    ],
    findings,
    triageSummary: {
      critical: normalized.criticalIssueCount,
      major: normalized.majorIssueCount,
      minor: normalized.minorIssueCount,
      usability: normalized.usabilityIssueCount,
      localization: normalized.localizationIssueCount,
      performance: normalized.performanceIssueCount,
      failedScenarios: normalized.failedScenarioCount,
      blockedScenarios: normalized.blockedScenarioCount,
    },
    recommendedNextStep,
    safetySummary: [
      "V21.3 validates the second tester manual UAT execution report and issue triage board.",
      "No account, password, invite, OAuth, evidence, issue, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Public signup remains closed.",
      "Manual evidence capture remains outside the app persistence path.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerSecondTesterManualUatExecutionReportVersion = "V21.3";
