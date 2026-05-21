export type TesterExtendedSingleTesterUatMode = "dry-run" | "extended-single-tester-uat-coverage";
export type TesterExtendedSingleTesterUatDecision =
  | "EXTENDED_SINGLE_TESTER_UAT_READY"
  | "COVERAGE_INCOMPLETE"
  | "FIX_BEFORE_CONTINUE"
  | "NO_GO";
export type TesterExtendedSingleTesterUatSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterExtendedSingleTesterUatInput {
  email?: string;
  userDetected?: boolean;
  roleValue?: string;
  roleCompatible?: boolean;
  hasPasswordHash?: boolean;
  previousExecutionReportReady?: boolean;
  formValidationScenarioObserved?: boolean;
  sessionPersistenceScenarioObserved?: boolean;
  roleBoundaryScenarioObserved?: boolean;
  photoDiagnosisDryRunEdgeScenarioObserved?: boolean;
  operationsReadOnlyDeepDiveObserved?: boolean;
  responsiveAccessibilityScenarioObserved?: boolean;
  errorStateScenarioObserved?: boolean;
  browserNavigationScenarioObserved?: boolean;
  evidenceScreenshotsCaptured?: boolean;
  evidenceNotesCaptured?: boolean;
  extendedSummaryCaptured?: boolean;
  criticalIssueCount?: number;
  majorIssueCount?: number;
  minorIssueCount?: number;
  usabilityIssueCount?: number;
  localizationIssueCount?: number;
  performanceIssueCount?: number;
  failedScenarioCount?: number;
  blockedScenarioCount?: number;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noAccountWriteConfirmed?: boolean;
  noPasswordWriteConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  secondTesterExpansionCandidate?: boolean;
}

export interface TesterExtendedSingleTesterUatBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterExtendedSingleTesterUatSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterExtendedSingleTesterUatFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterExtendedSingleTesterUatSeverity;
  reason: string;
  manualResolution: string;
  blocksProgression: boolean;
}

export const TESTER_EXTENDED_SINGLE_TESTER_UAT_GUARDRAIL = {
  testerExtendedSingleTesterUatCoverageReady: true,
  extendedSingleTesterScenarioCoverageReady: true,
  secondTesterExpansionDecisionReady: true,
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

export interface TesterExtendedSingleTesterUatReport {
  generatedAt: string;
  mode: TesterExtendedSingleTesterUatMode;
  input: Required<TesterExtendedSingleTesterUatInput>;
  readiness: typeof TESTER_EXTENDED_SINGLE_TESTER_UAT_GUARDRAIL;
  scenarioCoverageScore: number;
  evidenceScore: number;
  triageScore: number;
  safetyScore: number;
  totalScore: number;
  decision: TesterExtendedSingleTesterUatDecision;
  coverageBoard: TesterExtendedSingleTesterUatBoardItem[];
  evidenceBoard: TesterExtendedSingleTesterUatBoardItem[];
  triageBoard: TesterExtendedSingleTesterUatBoardItem[];
  safetyBoard: TesterExtendedSingleTesterUatBoardItem[];
  noGoBoard: TesterExtendedSingleTesterUatBoardItem[];
  findings: TesterExtendedSingleTesterUatFindingItem[];
  scenarioPack: Array<{
    id: string;
    title: string;
    goal: string;
    evidenceRequired: string[];
    passCriteria: string[];
  }>;
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(input: TesterExtendedSingleTesterUatInput): Required<TesterExtendedSingleTesterUatInput> {
  return {
    email: input.email ?? "",
    userDetected: input.userDetected ?? false,
    roleValue: input.roleValue ?? "",
    roleCompatible: input.roleCompatible ?? false,
    hasPasswordHash: input.hasPasswordHash ?? false,
    previousExecutionReportReady: input.previousExecutionReportReady ?? false,
    formValidationScenarioObserved: input.formValidationScenarioObserved ?? false,
    sessionPersistenceScenarioObserved: input.sessionPersistenceScenarioObserved ?? false,
    roleBoundaryScenarioObserved: input.roleBoundaryScenarioObserved ?? false,
    photoDiagnosisDryRunEdgeScenarioObserved: input.photoDiagnosisDryRunEdgeScenarioObserved ?? false,
    operationsReadOnlyDeepDiveObserved: input.operationsReadOnlyDeepDiveObserved ?? false,
    responsiveAccessibilityScenarioObserved: input.responsiveAccessibilityScenarioObserved ?? false,
    errorStateScenarioObserved: input.errorStateScenarioObserved ?? false,
    browserNavigationScenarioObserved: input.browserNavigationScenarioObserved ?? false,
    evidenceScreenshotsCaptured: input.evidenceScreenshotsCaptured ?? false,
    evidenceNotesCaptured: input.evidenceNotesCaptured ?? false,
    extendedSummaryCaptured: input.extendedSummaryCaptured ?? false,
    criticalIssueCount: input.criticalIssueCount ?? 0,
    majorIssueCount: input.majorIssueCount ?? 0,
    minorIssueCount: input.minorIssueCount ?? 0,
    usabilityIssueCount: input.usabilityIssueCount ?? 0,
    localizationIssueCount: input.localizationIssueCount ?? 0,
    performanceIssueCount: input.performanceIssueCount ?? 0,
    failedScenarioCount: input.failedScenarioCount ?? 0,
    blockedScenarioCount: input.blockedScenarioCount ?? 0,
    noAiProviderCallConfirmed: input.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: input.noExecutionConfirmed ?? false,
    noPublicSignupConfirmed: input.noPublicSignupConfirmed ?? false,
    noAccountWriteConfirmed: input.noAccountWriteConfirmed ?? false,
    noPasswordWriteConfirmed: input.noPasswordWriteConfirmed ?? false,
    noSchemaMigrationConfirmed: input.noSchemaMigrationConfirmed ?? false,
    secondTesterExpansionCandidate: input.secondTesterExpansionCandidate ?? false,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterExtendedSingleTesterUatSeverity {
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
): TesterExtendedSingleTesterUatBoardItem {
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

export function buildTesterExtendedSingleTesterUatCoverageReport(
  input: TesterExtendedSingleTesterUatInput = {},
): TesterExtendedSingleTesterUatReport {
  const normalized = normalizeInput(input);
  const scenarioFlags = [
    normalized.formValidationScenarioObserved,
    normalized.sessionPersistenceScenarioObserved,
    normalized.roleBoundaryScenarioObserved,
    normalized.photoDiagnosisDryRunEdgeScenarioObserved,
    normalized.operationsReadOnlyDeepDiveObserved,
    normalized.responsiveAccessibilityScenarioObserved,
    normalized.errorStateScenarioObserved,
    normalized.browserNavigationScenarioObserved,
  ];

  const evidenceFlags = [
    normalized.evidenceScreenshotsCaptured,
    normalized.evidenceNotesCaptured,
    normalized.extendedSummaryCaptured,
  ];

  const safetyFlags = [
    normalized.noAiProviderCallConfirmed,
    normalized.noExecutionConfirmed,
    normalized.noPublicSignupConfirmed,
    normalized.noAccountWriteConfirmed,
    normalized.noPasswordWriteConfirmed,
    normalized.noSchemaMigrationConfirmed,
  ];

  const scenarioCoverageScore = clampScore((scenarioFlags.filter(Boolean).length / scenarioFlags.length) * 100);
  const evidenceScore = clampScore((evidenceFlags.filter(Boolean).length / evidenceFlags.length) * 100);
  const safetyScore = clampScore((safetyFlags.filter(Boolean).length / safetyFlags.length) * 100);

  const issuePenalty =
    normalized.criticalIssueCount * 45 +
    normalized.majorIssueCount * 25 +
    normalized.minorIssueCount * 5 +
    normalized.usabilityIssueCount * 4 +
    normalized.localizationIssueCount * 3 +
    normalized.performanceIssueCount * 4 +
    normalized.failedScenarioCount * 15 +
    normalized.blockedScenarioCount * 35;

  const triageScore = clampScore(100 - issuePenalty);

  const findings: TesterExtendedSingleTesterUatFindingItem[] = [];

  if (!normalized.userDetected) {
    findings.push({
      id: "TESU_FINDING_001",
      label: "Tester account not detected",
      lane: "account",
      severity: "critical",
      reason: "The pilot tester account is not detected.",
      manualResolution: "Verify account before extending UAT coverage.",
      blocksProgression: true,
    });
  }

  if (normalized.userDetected && !normalized.roleCompatible) {
    findings.push({
      id: "TESU_FINDING_002",
      label: "Role not compatible",
      lane: "account",
      severity: "critical",
      reason: "The tester role is not compatible with UAT.",
      manualResolution: "Resolve role mapping before continuing.",
      blocksProgression: true,
    });
  }

  if (normalized.userDetected && !normalized.hasPasswordHash) {
    findings.push({
      id: "TESU_FINDING_003",
      label: "Login method missing",
      lane: "account",
      severity: "critical",
      reason: "Tester has no passwordHash.",
      manualResolution: "Complete login setup before continuing.",
      blocksProgression: true,
    });
  }

  if (!normalized.previousExecutionReportReady) {
    findings.push({
      id: "TESU_FINDING_004",
      label: "Previous UAT execution report not confirmed",
      lane: "coverage",
      severity: "critical",
      reason: "V20.4 execution report readiness is not confirmed.",
      manualResolution: "Complete V20.4 before extending coverage.",
      blocksProgression: true,
    });
  }

  if (scenarioCoverageScore < 100) {
    findings.push({
      id: "TESU_FINDING_005",
      label: "Extended scenario coverage incomplete",
      lane: "coverage",
      severity: "watch",
      reason: "Not all extended UAT scenarios were observed.",
      manualResolution: "Complete missing scenario observations.",
      blocksProgression: false,
    });
  }

  if (evidenceScore < 100) {
    findings.push({
      id: "TESU_FINDING_006",
      label: "Extended evidence incomplete",
      lane: "evidence",
      severity: "watch",
      reason: "Screenshots, notes or extended summary are incomplete.",
      manualResolution: "Capture missing manual evidence.",
      blocksProgression: false,
    });
  }

  if (safetyScore < 100) {
    findings.push({
      id: "TESU_FINDING_007",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-write/no-AI confirmations are missing.",
      manualResolution: "Confirm all safety locks before proceeding.",
      blocksProgression: true,
    });
  }

  if (normalized.criticalIssueCount > 0 || normalized.blockedScenarioCount > 0) {
    findings.push({
      id: "TESU_FINDING_008",
      label: "Critical or blocked issue present",
      lane: "triage",
      severity: "critical",
      reason: "Critical issue count or blocked scenario count is above zero.",
      manualResolution: "Resolve blocking issues before continuing UAT.",
      blocksProgression: true,
    });
  }

  if (normalized.majorIssueCount > 0 || normalized.failedScenarioCount > 0) {
    findings.push({
      id: "TESU_FINDING_009",
      label: "Major issue or failed scenario present",
      lane: "triage",
      severity: "elevated",
      reason: "Major issue count or failed scenario count is above zero.",
      manualResolution: "Fix or explicitly defer before expanding tester pool.",
      blocksProgression: false,
    });
  }

  const coverageBoard = [
    boardItem(
      "TESU_COVERAGE_001",
      "Extended scenario coverage",
      "coverage",
      scenarioCoverageScore,
      ["forms", "session", "role boundary", "photo diagnosis dry-run", "operations", "responsive", "errors", "browser nav"],
      "Extended scenario coverage is manually verified.",
    ),
  ];

  const evidenceBoard = [
    boardItem(
      "TESU_EVIDENCE_001",
      "Manual evidence completeness",
      "evidence",
      evidenceScore,
      ["screenshots", "notes", "summary"],
      "Evidence remains manual and non-persistent.",
    ),
  ];

  const triageBoard = [
    boardItem(
      "TESU_TRIAGE_001",
      "Extended issue triage",
      "triage",
      triageScore,
      ["critical", "major", "minor", "usability", "localization", "performance", "failed", "blocked"],
      "Issue triage remains manual and non-persistent.",
    ),
  ];

  const safetyBoard = [
    boardItem(
      "TESU_SAFETY_001",
      "No-write/no-AI safety",
      "safety",
      safetyScore,
      ["no AI", "no execution", "no signup", "no account write", "no password write", "no migration"],
      "Safety locks remain confirmed.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TESU_NOGO_001",
      "Account/password writes",
      "no_go",
      0,
      ["accountWriteAllowed=false", "passwordWriteAllowed=false"],
      "No-go: V20.5 does not write account or password data.",
    ),
    boardItem(
      "TESU_NOGO_002",
      "Issue/evidence persistence",
      "no_go",
      0,
      ["issuePersistenceAllowed=false", "evidencePersistenceAllowed=false"],
      "No-go: V20.5 does not persist issues or evidence.",
    ),
    boardItem(
      "TESU_NOGO_003",
      "AI/provider/execution",
      "no_go",
      0,
      ["providerCalled=false", "operationalExecutionAllowed=false"],
      "No-go: AI provider and execution remain disabled.",
    ),
  ];

  const blocking = findings.some((item) => item.blocksProgression);
  const complete = scenarioCoverageScore === 100 && evidenceScore === 100 && safetyScore === 100;
  const fixNeeded = normalized.majorIssueCount > 0 || normalized.failedScenarioCount > 0;

  const totalScore = clampScore(
    (scenarioCoverageScore + evidenceScore + triageScore + safetyScore) / 4 -
      findings.filter((item) => item.blocksProgression).length * 25,
  );

  const decision: TesterExtendedSingleTesterUatDecision =
    blocking
      ? "NO_GO"
      : fixNeeded
        ? "FIX_BEFORE_CONTINUE"
        : !complete
          ? "COVERAGE_INCOMPLETE"
          : "EXTENDED_SINGLE_TESTER_UAT_READY";

  const recommendedNextStep =
    decision === "EXTENDED_SINGLE_TESTER_UAT_READY" && normalized.secondTesterExpansionCandidate
      ? "Proceed to controlled second tester pool expansion gate."
      : decision === "EXTENDED_SINGLE_TESTER_UAT_READY"
        ? "Continue with one more single-tester scenario cycle or mark ready for second tester expansion."
        : decision === "COVERAGE_INCOMPLETE"
          ? "Complete missing extended scenario/evidence observations."
          : decision === "FIX_BEFORE_CONTINUE"
            ? "Fix or explicitly defer major issues before continuing."
            : "Resolve blocking findings before continuing UAT.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_EXTENDED_SINGLE_TESTER_UAT_GUARDRAIL,
    scenarioCoverageScore,
    evidenceScore,
    triageScore,
    safetyScore,
    totalScore,
    decision,
    coverageBoard,
    evidenceBoard,
    triageBoard,
    safetyBoard,
    noGoBoard,
    findings,
    scenarioPack: [
      {
        id: "EUAT-001",
        title: "Forms and validation",
        goal: "Verify form input, validation messages, empty states and cancel paths.",
        evidenceRequired: ["form screenshot", "validation notes"],
        passCriteria: ["validation clear", "no unexpected write", "cancel/back path works"],
      },
      {
        id: "EUAT-002",
        title: "Session persistence",
        goal: "Verify session behavior after refresh and browser navigation.",
        evidenceRequired: ["refresh/back notes", "session screenshot"],
        passCriteria: ["session remains usable", "protected routes behave predictably"],
      },
      {
        id: "EUAT-003",
        title: "Role boundary",
        goal: "Verify OPERATOR access does not expose unsafe actions.",
        evidenceRequired: ["role boundary notes"],
        passCriteria: ["no admin-only destructive actions exposed", "read-only expectations respected"],
      },
      {
        id: "EUAT-004",
        title: "Photo diagnosis dry-run edge cases",
        goal: "Verify photo diagnosis entry behaves safely with empty/edge inputs.",
        evidenceRequired: ["photo diagnosis notes", "screen capture"],
        passCriteria: ["no live provider call", "dry-run/local behavior clear"],
      },
      {
        id: "EUAT-005",
        title: "Operations read-only deep dive",
        goal: "Verify operations panels do not trigger execution/write actions.",
        evidenceRequired: ["operations notes", "screen capture"],
        passCriteria: ["no execution", "no persistence", "safe messaging"],
      },
      {
        id: "EUAT-006",
        title: "Responsive/accessibility basics",
        goal: "Verify layout, labels, touch targets and keyboard basics.",
        evidenceRequired: ["mobile/keyboard notes"],
        passCriteria: ["usable on narrow viewport", "basic controls reachable"],
      },
      {
        id: "EUAT-007",
        title: "Error and empty states",
        goal: "Verify user-facing states are understandable.",
        evidenceRequired: ["empty/error state notes"],
        passCriteria: ["clear state", "no broken layout", "recoverable path"],
      },
      {
        id: "EUAT-008",
        title: "Browser navigation",
        goal: "Verify back/forward/refresh do not break the flow.",
        evidenceRequired: ["browser navigation notes"],
        passCriteria: ["navigation stable", "no unexpected logout or unsafe write"],
      },
    ],
    recommendedNextStep,
    safetySummary: [
      "V20.5 extends single-tester UAT coverage before adding more testers.",
      "No account, password, invite, OAuth, issue, evidence, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Evidence and triage remain manual and non-persistent.",
      "Public signup remains closed.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerExtendedSingleTesterUatCoverageVersion = "V20.5";
