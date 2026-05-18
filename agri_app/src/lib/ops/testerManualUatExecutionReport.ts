export type TesterManualUatExecutionReportMode = "dry-run" | "first-manual-uat-execution-report";
export type TesterManualUatExecutionDecision =
  | "EXPAND_TESTER_POOL_READY"
  | "CONTINUE_SINGLE_TESTER_UAT"
  | "FIX_BEFORE_CONTINUE"
  | "NO_GO";
export type TesterManualUatExecutionSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterManualUatExecutionReportInput {
  email?: string;
  userDetected?: boolean;
  roleValue?: string;
  roleCompatible?: boolean;
  hasPasswordHash?: boolean;
  scenarioPackCompleted?: boolean;
  totalScenarioCount?: number;
  passedScenarioCount?: number;
  failedScenarioCount?: number;
  blockedScenarioCount?: number;
  evidenceScreenshotsCaptured?: boolean;
  evidenceNotesCaptured?: boolean;
  executionSummaryCaptured?: boolean;
  issueTriageCaptured?: boolean;
  criticalIssueCount?: number;
  majorIssueCount?: number;
  minorIssueCount?: number;
  usabilityIssueCount?: number;
  localizationIssueCount?: number;
  performanceIssueCount?: number;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noAccountWriteConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  expandTesterPoolCandidate?: boolean;
}

export interface TesterManualUatExecutionBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterManualUatExecutionSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterManualUatExecutionFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterManualUatExecutionSeverity;
  reason: string;
  manualResolution: string;
  blocksUatProgression: boolean;
}

export const TESTER_MANUAL_UAT_EXECUTION_REPORT_GUARDRAIL = {
  testerManualUatExecutionReportReady: true,
  firstManualUatExecutionReportReady: true,
  issueTriageBoardReady: true,
  executionSummaryReady: true,
  manualEvidenceOnly: true,
  readOnlyVerificationOnly: true,
  issuePersistenceAllowed: false,
  issuePersistencePerformed: false,
  evidencePersistenceAllowed: false,
  evidencePersistencePerformed: false,
  publicSignupAllowed: false,
  publicSignupPerformed: false,
  accountWriteAllowed: false,
  accountWritePerformed: false,
  testerAccountCreateAllowed: false,
  testerAccountCreatePerformed: false,
  passwordWriteAllowed: false,
  passwordWritePerformed: false,
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

export interface TesterManualUatExecutionReport {
  generatedAt: string;
  mode: TesterManualUatExecutionReportMode;
  input: Required<TesterManualUatExecutionReportInput>;
  readiness: typeof TESTER_MANUAL_UAT_EXECUTION_REPORT_GUARDRAIL;
  scenarioPassRate: number;
  executionScore: number;
  evidenceScore: number;
  triageScore: number;
  safetyScore: number;
  totalScore: number;
  decision: TesterManualUatExecutionDecision;
  executionBoard: TesterManualUatExecutionBoardItem[];
  evidenceBoard: TesterManualUatExecutionBoardItem[];
  triageBoard: TesterManualUatExecutionBoardItem[];
  safetyBoard: TesterManualUatExecutionBoardItem[];
  noGoBoard: TesterManualUatExecutionBoardItem[];
  findings: TesterManualUatExecutionFindingItem[];
  triageSummary: {
    critical: number;
    major: number;
    minor: number;
    usability: number;
    localization: number;
    performance: number;
  };
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(input: TesterManualUatExecutionReportInput): Required<TesterManualUatExecutionReportInput> {
  return {
    email: input.email ?? "",
    userDetected: input.userDetected ?? false,
    roleValue: input.roleValue ?? "",
    roleCompatible: input.roleCompatible ?? false,
    hasPasswordHash: input.hasPasswordHash ?? false,
    scenarioPackCompleted: input.scenarioPackCompleted ?? false,
    totalScenarioCount: input.totalScenarioCount ?? 5,
    passedScenarioCount: input.passedScenarioCount ?? 0,
    failedScenarioCount: input.failedScenarioCount ?? 0,
    blockedScenarioCount: input.blockedScenarioCount ?? 0,
    evidenceScreenshotsCaptured: input.evidenceScreenshotsCaptured ?? false,
    evidenceNotesCaptured: input.evidenceNotesCaptured ?? false,
    executionSummaryCaptured: input.executionSummaryCaptured ?? false,
    issueTriageCaptured: input.issueTriageCaptured ?? false,
    criticalIssueCount: input.criticalIssueCount ?? 0,
    majorIssueCount: input.majorIssueCount ?? 0,
    minorIssueCount: input.minorIssueCount ?? 0,
    usabilityIssueCount: input.usabilityIssueCount ?? 0,
    localizationIssueCount: input.localizationIssueCount ?? 0,
    performanceIssueCount: input.performanceIssueCount ?? 0,
    noAiProviderCallConfirmed: input.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: input.noExecutionConfirmed ?? false,
    noPublicSignupConfirmed: input.noPublicSignupConfirmed ?? false,
    noAccountWriteConfirmed: input.noAccountWriteConfirmed ?? false,
    noSchemaMigrationConfirmed: input.noSchemaMigrationConfirmed ?? false,
    expandTesterPoolCandidate: input.expandTesterPoolCandidate ?? false,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterManualUatExecutionSeverity {
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
): TesterManualUatExecutionBoardItem {
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

export function buildTesterManualUatExecutionReport(
  input: TesterManualUatExecutionReportInput = {},
): TesterManualUatExecutionReport {
  const normalized = normalizeInput(input);
  const safeScenarioTotal = Math.max(1, normalized.totalScenarioCount);
  const scenarioPassRate = clampScore((normalized.passedScenarioCount / safeScenarioTotal) * 100);

  const findings: TesterManualUatExecutionFindingItem[] = [];

  if (!normalized.userDetected) {
    findings.push({
      id: "TMUER_FINDING_001",
      label: "Tester account not detected",
      lane: "execution",
      severity: "critical",
      reason: "The tester account is not detected.",
      manualResolution: "Verify tester account before reporting UAT execution.",
      blocksUatProgression: true,
    });
  }

  if (normalized.userDetected && !normalized.roleCompatible) {
    findings.push({
      id: "TMUER_FINDING_002",
      label: "Tester role not compatible",
      lane: "execution",
      severity: "critical",
      reason: "The tester role is not compatible with UAT execution.",
      manualResolution: "Resolve role mapping before proceeding.",
      blocksUatProgression: true,
    });
  }

  if (normalized.userDetected && !normalized.hasPasswordHash) {
    findings.push({
      id: "TMUER_FINDING_003",
      label: "Tester login method missing",
      lane: "execution",
      severity: "critical",
      reason: "The tester account does not have passwordHash.",
      manualResolution: "Complete password setup before UAT execution report.",
      blocksUatProgression: true,
    });
  }

  if (!normalized.scenarioPackCompleted) {
    findings.push({
      id: "TMUER_FINDING_004",
      label: "Scenario pack not completed",
      lane: "execution",
      severity: "critical",
      reason: "V20.3 scenario pack completion was not confirmed.",
      manualResolution: "Complete V20.3 scenario pack before V20.4 report.",
      blocksUatProgression: true,
    });
  }

  if (normalized.blockedScenarioCount > 0) {
    findings.push({
      id: "TMUER_FINDING_005",
      label: "Blocked scenarios present",
      lane: "execution",
      severity: "critical",
      reason: String(normalized.blockedScenarioCount) + " scenario(s) were blocked.",
      manualResolution: "Resolve blocked scenarios before continuing UAT.",
      blocksUatProgression: true,
    });
  }

  if (normalized.failedScenarioCount > 0) {
    findings.push({
      id: "TMUER_FINDING_006",
      label: "Failed scenarios present",
      lane: "execution",
      severity: "elevated",
      reason: String(normalized.failedScenarioCount) + " scenario(s) failed.",
      manualResolution: "Triage failures and fix before expanding tester pool.",
      blocksUatProgression: false,
    });
  }

  if (!normalized.evidenceScreenshotsCaptured || !normalized.evidenceNotesCaptured || !normalized.executionSummaryCaptured) {
    findings.push({
      id: "TMUER_FINDING_007",
      label: "Execution evidence incomplete",
      lane: "evidence",
      severity: "watch",
      reason: "Screenshots, notes or execution summary are incomplete.",
      manualResolution: "Complete manual evidence before closing the report.",
      blocksUatProgression: false,
    });
  }

  if (!normalized.issueTriageCaptured) {
    findings.push({
      id: "TMUER_FINDING_008",
      label: "Issue triage not captured",
      lane: "triage",
      severity: "watch",
      reason: "Issue triage board was not manually captured.",
      manualResolution: "Capture issue counts/severity before decision.",
      blocksUatProgression: false,
    });
  }

  if (normalized.criticalIssueCount > 0) {
    findings.push({
      id: "TMUER_FINDING_009",
      label: "Critical UAT issue open",
      lane: "triage",
      severity: "critical",
      reason: String(normalized.criticalIssueCount) + " critical issue(s) are open.",
      manualResolution: "Resolve critical issues before continuing UAT.",
      blocksUatProgression: true,
    });
  }

  if (normalized.majorIssueCount > 0) {
    findings.push({
      id: "TMUER_FINDING_010",
      label: "Major UAT issue open",
      lane: "triage",
      severity: "elevated",
      reason: String(normalized.majorIssueCount) + " major issue(s) are open.",
      manualResolution: "Fix or explicitly accept before expanding tester pool.",
      blocksUatProgression: false,
    });
  }

  if (
    !normalized.noAiProviderCallConfirmed ||
    !normalized.noExecutionConfirmed ||
    !normalized.noPublicSignupConfirmed ||
    !normalized.noAccountWriteConfirmed ||
    !normalized.noSchemaMigrationConfirmed
  ) {
    findings.push({
      id: "TMUER_FINDING_011",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-write/no-AI safety confirmations are missing.",
      manualResolution: "Confirm all safety locks before closing report.",
      blocksUatProgression: true,
    });
  }

  const evidenceFlags = [
    normalized.evidenceScreenshotsCaptured,
    normalized.evidenceNotesCaptured,
    normalized.executionSummaryCaptured,
  ];
  const evidenceScore = clampScore((evidenceFlags.filter(Boolean).length / evidenceFlags.length) * 100);

  const safetyFlags = [
    normalized.noAiProviderCallConfirmed,
    normalized.noExecutionConfirmed,
    normalized.noPublicSignupConfirmed,
    normalized.noAccountWriteConfirmed,
    normalized.noSchemaMigrationConfirmed,
  ];
  const safetyScore = clampScore((safetyFlags.filter(Boolean).length / safetyFlags.length) * 100);

  const triageComplete = normalized.issueTriageCaptured;
  const issuePenalty =
    normalized.criticalIssueCount * 40 +
    normalized.majorIssueCount * 20 +
    normalized.minorIssueCount * 4 +
    normalized.usabilityIssueCount * 3 +
    normalized.localizationIssueCount * 2 +
    normalized.performanceIssueCount * 3;

  const triageScore = clampScore((triageComplete ? 100 : 50) - issuePenalty);

  const executionScore = clampScore(
    (Number(normalized.scenarioPackCompleted) * 30) +
      (scenarioPassRate * 0.7) -
      normalized.failedScenarioCount * 10 -
      normalized.blockedScenarioCount * 25,
  );

  const totalScore = clampScore(
    (executionScore + evidenceScore + triageScore + safetyScore) / 4 -
      findings.filter((item) => item.blocksUatProgression).length * 25,
  );

  const executionBoard = [
    boardItem(
      "TMUER_EXECUTION_001",
      "Scenario execution summary",
      "execution",
      executionScore,
      ["scenario pack completed", "pass/fail/blocked counts"],
      "Scenario execution is summarized without persistence.",
    ),
  ];

  const evidenceBoard = [
    boardItem(
      "TMUER_EVIDENCE_001",
      "Manual evidence completeness",
      "evidence",
      evidenceScore,
      ["screenshots", "notes", "summary"],
      "Evidence remains manual and non-persistent.",
    ),
  ];

  const triageBoard = [
    boardItem(
      "TMUER_TRIAGE_001",
      "Issue triage board",
      "triage",
      triageScore,
      ["critical", "major", "minor", "usability", "localization", "performance"],
      "Issue triage is captured as a manual report, not persisted.",
    ),
  ];

  const safetyBoard = [
    boardItem(
      "TMUER_SAFETY_001",
      "Safety confirmations",
      "safety",
      safetyScore,
      ["no AI", "no execution", "no signup", "no account write", "no migration"],
      "Safety confirmations are complete before UAT decision.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TMUER_NOGO_001",
      "Issue/evidence persistence",
      "no_go",
      0,
      ["issuePersistenceAllowed=false", "evidencePersistenceAllowed=false"],
      "No-go: V20.4 does not persist report, issues or evidence.",
    ),
    boardItem(
      "TMUER_NOGO_002",
      "Account/password writes",
      "no_go",
      0,
      ["accountWriteAllowed=false", "passwordWriteAllowed=false"],
      "No-go: V20.4 does not write account or password data.",
    ),
    boardItem(
      "TMUER_NOGO_003",
      "AI/provider/execution",
      "no_go",
      0,
      ["providerCalled=false", "operationalExecutionAllowed=false"],
      "No-go: AI provider and execution remain disabled.",
    ),
  ];

  const hasBlocking = findings.some((item) => item.blocksUatProgression);
  const hasMajorOrScenarioFailure = normalized.majorIssueCount > 0 || normalized.failedScenarioCount > 0;
  const reportComplete = evidenceScore === 100 && triageComplete && safetyScore === 100;

  const decision: TesterManualUatExecutionDecision =
    hasBlocking
      ? "NO_GO"
      : hasMajorOrScenarioFailure
        ? "FIX_BEFORE_CONTINUE"
        : normalized.expandTesterPoolCandidate && reportComplete && scenarioPassRate === 100
          ? "EXPAND_TESTER_POOL_READY"
          : "CONTINUE_SINGLE_TESTER_UAT";

  const recommendedNextStep =
    decision === "EXPAND_TESTER_POOL_READY"
      ? "Prepare a controlled second-tester UAT expansion gate."
      : decision === "CONTINUE_SINGLE_TESTER_UAT"
        ? "Continue single-tester UAT with additional scenario coverage."
        : decision === "FIX_BEFORE_CONTINUE"
          ? "Fix failed scenarios or major issues before continuing UAT."
          : "Do not continue UAT until blocking findings are resolved.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_MANUAL_UAT_EXECUTION_REPORT_GUARDRAIL,
    scenarioPassRate,
    executionScore,
    evidenceScore,
    triageScore,
    safetyScore,
    totalScore,
    decision,
    executionBoard,
    evidenceBoard,
    triageBoard,
    safetyBoard,
    noGoBoard,
    findings,
    triageSummary: {
      critical: normalized.criticalIssueCount,
      major: normalized.majorIssueCount,
      minor: normalized.minorIssueCount,
      usability: normalized.usabilityIssueCount,
      localization: normalized.localizationIssueCount,
      performance: normalized.performanceIssueCount,
    },
    recommendedNextStep,
    safetySummary: [
      "V20.4 creates a first manual UAT execution report and issue triage board.",
      "No report, issue, evidence, account, password, invite, OAuth, schema, migration, AI provider, public export, incident or execution write is performed.",
      "All outputs are read-only/dry-run and manually captured.",
      "Public signup remains closed.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerManualUatExecutionReportVersion = "V20.4";
