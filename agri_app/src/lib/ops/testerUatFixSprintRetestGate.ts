export type TesterUatFixSprintRetestGateMode = "dry-run" | "uat-fix-sprint-retest-gate";
export type TesterUatFixSprintRetestGateDecision =
  | "FIXES_CLEARED_READY_FOR_EXPANSION"
  | "CONTINUE_RETEST"
  | "FIX_SPRINT_REQUIRED"
  | "FIX_BEFORE_CONTINUE"
  | "NO_GO";
export type TesterUatFixSprintRetestSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterUatFixSprintRetestGateInput {
  email?: string;
  userDetected?: boolean;
  roleValue?: string;
  roleCompatible?: boolean;
  hasPasswordHash?: boolean;
  previousExtendedCoverageReady?: boolean;
  fixSprintBoardCaptured?: boolean;
  issueTriageCaptured?: boolean;
  fixOwnersAssigned?: boolean;
  retestPlanReady?: boolean;
  fixesApplied?: boolean;
  retestEvidenceCaptured?: boolean;
  retestSummaryCaptured?: boolean;
  criticalIssueCount?: number;
  majorIssueCount?: number;
  minorIssueCount?: number;
  usabilityIssueCount?: number;
  localizationIssueCount?: number;
  performanceIssueCount?: number;
  failedRetestCount?: number;
  blockedRetestCount?: number;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noAccountWriteConfirmed?: boolean;
  noPasswordWriteConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  readyForSecondTesterCandidate?: boolean;
}

export interface TesterUatFixSprintRetestBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterUatFixSprintRetestSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterUatFixSprintRetestFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterUatFixSprintRetestSeverity;
  reason: string;
  manualResolution: string;
  blocksRetestProgression: boolean;
}

export const TESTER_UAT_FIX_SPRINT_RETEST_GATE_GUARDRAIL = {
  testerUatFixSprintRetestGateReady: true,
  uatFixSprintBoardReady: true,
  retestGateReady: true,
  issueTriageReady: true,
  manualEvidenceOnly: true,
  readOnlyVerificationOnly: true,
  issuePersistenceAllowed: false,
  issuePersistencePerformed: false,
  evidencePersistenceAllowed: false,
  evidencePersistencePerformed: false,
  fixPersistenceAllowed: false,
  fixPersistencePerformed: false,
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

export interface TesterUatFixSprintRetestGateReport {
  generatedAt: string;
  mode: TesterUatFixSprintRetestGateMode;
  input: Required<TesterUatFixSprintRetestGateInput>;
  readiness: typeof TESTER_UAT_FIX_SPRINT_RETEST_GATE_GUARDRAIL;
  fixSprintScore: number;
  retestScore: number;
  triageScore: number;
  safetyScore: number;
  totalScore: number;
  decision: TesterUatFixSprintRetestGateDecision;
  fixSprintBoard: TesterUatFixSprintRetestBoardItem[];
  retestBoard: TesterUatFixSprintRetestBoardItem[];
  triageBoard: TesterUatFixSprintRetestBoardItem[];
  safetyBoard: TesterUatFixSprintRetestBoardItem[];
  noGoBoard: TesterUatFixSprintRetestBoardItem[];
  findings: TesterUatFixSprintRetestFindingItem[];
  fixSprintChecklist: Array<{
    id: string;
    title: string;
    requiredEvidence: string[];
    passCriteria: string[];
  }>;
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(input: TesterUatFixSprintRetestGateInput): Required<TesterUatFixSprintRetestGateInput> {
  return {
    email: input.email ?? "",
    userDetected: input.userDetected ?? false,
    roleValue: input.roleValue ?? "",
    roleCompatible: input.roleCompatible ?? false,
    hasPasswordHash: input.hasPasswordHash ?? false,
    previousExtendedCoverageReady: input.previousExtendedCoverageReady ?? false,
    fixSprintBoardCaptured: input.fixSprintBoardCaptured ?? false,
    issueTriageCaptured: input.issueTriageCaptured ?? false,
    fixOwnersAssigned: input.fixOwnersAssigned ?? false,
    retestPlanReady: input.retestPlanReady ?? false,
    fixesApplied: input.fixesApplied ?? false,
    retestEvidenceCaptured: input.retestEvidenceCaptured ?? false,
    retestSummaryCaptured: input.retestSummaryCaptured ?? false,
    criticalIssueCount: input.criticalIssueCount ?? 0,
    majorIssueCount: input.majorIssueCount ?? 0,
    minorIssueCount: input.minorIssueCount ?? 0,
    usabilityIssueCount: input.usabilityIssueCount ?? 0,
    localizationIssueCount: input.localizationIssueCount ?? 0,
    performanceIssueCount: input.performanceIssueCount ?? 0,
    failedRetestCount: input.failedRetestCount ?? 0,
    blockedRetestCount: input.blockedRetestCount ?? 0,
    noAiProviderCallConfirmed: input.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: input.noExecutionConfirmed ?? false,
    noPublicSignupConfirmed: input.noPublicSignupConfirmed ?? false,
    noAccountWriteConfirmed: input.noAccountWriteConfirmed ?? false,
    noPasswordWriteConfirmed: input.noPasswordWriteConfirmed ?? false,
    noSchemaMigrationConfirmed: input.noSchemaMigrationConfirmed ?? false,
    readyForSecondTesterCandidate: input.readyForSecondTesterCandidate ?? false,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterUatFixSprintRetestSeverity {
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
): TesterUatFixSprintRetestBoardItem {
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

export function buildTesterUatFixSprintRetestGateReport(
  input: TesterUatFixSprintRetestGateInput = {},
): TesterUatFixSprintRetestGateReport {
  const normalized = normalizeInput(input);

  const fixFlags = [
    normalized.fixSprintBoardCaptured,
    normalized.issueTriageCaptured,
    normalized.fixOwnersAssigned,
    normalized.retestPlanReady,
    normalized.fixesApplied,
  ];

  const retestFlags = [
    normalized.retestEvidenceCaptured,
    normalized.retestSummaryCaptured,
  ];

  const safetyFlags = [
    normalized.noAiProviderCallConfirmed,
    normalized.noExecutionConfirmed,
    normalized.noPublicSignupConfirmed,
    normalized.noAccountWriteConfirmed,
    normalized.noPasswordWriteConfirmed,
    normalized.noSchemaMigrationConfirmed,
  ];

  const fixSprintScore = clampScore((fixFlags.filter(Boolean).length / fixFlags.length) * 100);
  const retestScore = clampScore((retestFlags.filter(Boolean).length / retestFlags.length) * 100);
  const safetyScore = clampScore((safetyFlags.filter(Boolean).length / safetyFlags.length) * 100);

  const issuePenalty =
    normalized.criticalIssueCount * 45 +
    normalized.majorIssueCount * 25 +
    normalized.minorIssueCount * 5 +
    normalized.usabilityIssueCount * 4 +
    normalized.localizationIssueCount * 3 +
    normalized.performanceIssueCount * 4 +
    normalized.failedRetestCount * 20 +
    normalized.blockedRetestCount * 40;

  const triageScore = clampScore((normalized.issueTriageCaptured ? 100 : 50) - issuePenalty);

  const findings: TesterUatFixSprintRetestFindingItem[] = [];

  if (!normalized.userDetected) {
    findings.push({
      id: "UFSR_FINDING_001",
      label: "Tester account not detected",
      lane: "account",
      severity: "critical",
      reason: "The pilot tester account is not detected.",
      manualResolution: "Verify account before fix sprint/retest.",
      blocksRetestProgression: true,
    });
  }

  if (normalized.userDetected && !normalized.roleCompatible) {
    findings.push({
      id: "UFSR_FINDING_002",
      label: "Role not compatible",
      lane: "account",
      severity: "critical",
      reason: "The tester role is not compatible.",
      manualResolution: "Resolve role mapping before retest.",
      blocksRetestProgression: true,
    });
  }

  if (normalized.userDetected && !normalized.hasPasswordHash) {
    findings.push({
      id: "UFSR_FINDING_003",
      label: "Login method missing",
      lane: "account",
      severity: "critical",
      reason: "Tester has no passwordHash.",
      manualResolution: "Complete login setup before retest.",
      blocksRetestProgression: true,
    });
  }

  if (!normalized.previousExtendedCoverageReady) {
    findings.push({
      id: "UFSR_FINDING_004",
      label: "Previous extended coverage not confirmed",
      lane: "fix_sprint",
      severity: "critical",
      reason: "V20.5 extended coverage readiness is not confirmed.",
      manualResolution: "Complete V20.5 before opening fix sprint/retest gate.",
      blocksRetestProgression: true,
    });
  }

  if (!normalized.fixSprintBoardCaptured || !normalized.issueTriageCaptured) {
    findings.push({
      id: "UFSR_FINDING_005",
      label: "Fix sprint board or triage incomplete",
      lane: "fix_sprint",
      severity: "watch",
      reason: "Fix sprint board or issue triage was not captured.",
      manualResolution: "Capture fix sprint board, issue triage and owners.",
      blocksRetestProgression: false,
    });
  }

  if (!normalized.fixOwnersAssigned || !normalized.retestPlanReady) {
    findings.push({
      id: "UFSR_FINDING_006",
      label: "Owners or retest plan missing",
      lane: "fix_sprint",
      severity: "watch",
      reason: "Fix owners or retest plan are missing.",
      manualResolution: "Assign owners and prepare retest plan.",
      blocksRetestProgression: false,
    });
  }

  if (!normalized.fixesApplied) {
    findings.push({
      id: "UFSR_FINDING_007",
      label: "Fixes not applied",
      lane: "fix_sprint",
      severity: "watch",
      reason: "Fixes were not marked as applied or no-fix-required.",
      manualResolution: "Apply fixes or document that no fixes are required.",
      blocksRetestProgression: false,
    });
  }

  if (!normalized.retestEvidenceCaptured || !normalized.retestSummaryCaptured) {
    findings.push({
      id: "UFSR_FINDING_008",
      label: "Retest evidence incomplete",
      lane: "retest",
      severity: "watch",
      reason: "Retest evidence or summary is incomplete.",
      manualResolution: "Capture retest evidence and summary.",
      blocksRetestProgression: false,
    });
  }

  if (safetyScore < 100) {
    findings.push({
      id: "UFSR_FINDING_009",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-write/no-AI confirmations are missing.",
      manualResolution: "Confirm all safety locks before retest decision.",
      blocksRetestProgression: true,
    });
  }

  if (normalized.criticalIssueCount > 0 || normalized.blockedRetestCount > 0) {
    findings.push({
      id: "UFSR_FINDING_010",
      label: "Critical or blocked retest issue present",
      lane: "triage",
      severity: "critical",
      reason: "Critical issue count or blocked retest count is above zero.",
      manualResolution: "Resolve blocking issues before progressing.",
      blocksRetestProgression: true,
    });
  }

  if (normalized.majorIssueCount > 0 || normalized.failedRetestCount > 0) {
    findings.push({
      id: "UFSR_FINDING_011",
      label: "Major or failed retest issue present",
      lane: "triage",
      severity: "elevated",
      reason: "Major issue count or failed retest count is above zero.",
      manualResolution: "Fix or explicitly defer before expanding tester pool.",
      blocksRetestProgression: false,
    });
  }

  const fixSprintBoard = [
    boardItem(
      "UFSR_FIX_001",
      "Fix sprint board",
      "fix_sprint",
      fixSprintScore,
      ["issue triage", "owners", "fix status", "retest plan"],
      "Fix sprint state is manually captured and not persisted.",
    ),
  ];

  const retestBoard = [
    boardItem(
      "UFSR_RETEST_001",
      "Retest evidence",
      "retest",
      retestScore,
      ["retest screenshots", "retest summary"],
      "Retest evidence remains manual and non-persistent.",
    ),
  ];

  const triageBoard = [
    boardItem(
      "UFSR_TRIAGE_001",
      "Issue triage after retest",
      "triage",
      triageScore,
      ["critical", "major", "minor", "usability", "localization", "performance", "failed retest", "blocked retest"],
      "Triage remains manual and non-persistent.",
    ),
  ];

  const safetyBoard = [
    boardItem(
      "UFSR_SAFETY_001",
      "Safety confirmations",
      "safety",
      safetyScore,
      ["no AI", "no execution", "no signup", "no account write", "no password write", "no migration"],
      "Safety locks remain confirmed.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "UFSR_NOGO_001",
      "Issue/evidence/fix persistence",
      "no_go",
      0,
      ["issuePersistenceAllowed=false", "evidencePersistenceAllowed=false", "fixPersistenceAllowed=false"],
      "No-go: V20.6 does not persist issue, evidence or fix data.",
    ),
    boardItem(
      "UFSR_NOGO_002",
      "Account/password writes",
      "no_go",
      0,
      ["accountWriteAllowed=false", "passwordWriteAllowed=false"],
      "No-go: V20.6 does not write account or password data.",
    ),
    boardItem(
      "UFSR_NOGO_003",
      "AI/provider/execution",
      "no_go",
      0,
      ["providerCalled=false", "operationalExecutionAllowed=false"],
      "No-go: AI provider and execution remain disabled.",
    ),
  ];

  const blocking = findings.some((item) => item.blocksRetestProgression);
  const fixSprintComplete = fixSprintScore === 100;
  const retestComplete = retestScore === 100;
  const fixBeforeContinueNeeded = normalized.majorIssueCount > 0 || normalized.failedRetestCount > 0;

  const totalScore = clampScore(
    (fixSprintScore + retestScore + triageScore + safetyScore) / 4 -
      findings.filter((item) => item.blocksRetestProgression).length * 25,
  );

  const decision: TesterUatFixSprintRetestGateDecision =
    blocking
      ? "NO_GO"
      : fixBeforeContinueNeeded
        ? "FIX_BEFORE_CONTINUE"
        : !fixSprintComplete
          ? "FIX_SPRINT_REQUIRED"
          : !retestComplete
            ? "CONTINUE_RETEST"
            : "FIXES_CLEARED_READY_FOR_EXPANSION";

  const recommendedNextStep =
    decision === "FIXES_CLEARED_READY_FOR_EXPANSION" && normalized.readyForSecondTesterCandidate
      ? "Proceed to controlled second tester pool expansion gate."
      : decision === "FIXES_CLEARED_READY_FOR_EXPANSION"
        ? "Mark fixes/retest cleared and decide whether to expand tester pool."
        : decision === "CONTINUE_RETEST"
          ? "Complete retest evidence and summary."
          : decision === "FIX_SPRINT_REQUIRED"
            ? "Complete fix sprint board, owners and retest plan."
            : decision === "FIX_BEFORE_CONTINUE"
              ? "Fix or explicitly defer major/failed retest issues before continuing."
              : "Resolve blocking findings before continuing.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_UAT_FIX_SPRINT_RETEST_GATE_GUARDRAIL,
    fixSprintScore,
    retestScore,
    triageScore,
    safetyScore,
    totalScore,
    decision,
    fixSprintBoard,
    retestBoard,
    triageBoard,
    safetyBoard,
    noGoBoard,
    findings,
    fixSprintChecklist: [
      {
        id: "FIX-001",
        title: "Issue triage captured",
        requiredEvidence: ["issue counts", "severity classification", "defer/fix decision"],
        passCriteria: ["critical=0", "blocked retest=0", "major accepted or fixed"],
      },
      {
        id: "FIX-002",
        title: "Fix owners and retest plan",
        requiredEvidence: ["owner notes", "retest scope", "expected result"],
        passCriteria: ["owner assigned", "retest path clear", "no unsafe writes"],
      },
      {
        id: "FIX-003",
        title: "Retest execution",
        requiredEvidence: ["retest screenshot/notes", "summary"],
        passCriteria: ["failed retest=0", "blocked retest=0", "safety confirmations complete"],
      },
    ],
    recommendedNextStep,
    safetySummary: [
      "V20.6 defines the UAT fix sprint board and retest gate.",
      "No account, password, invite, OAuth, issue, evidence, fix, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Fixes, triage and retest remain manual and non-persistent.",
      "Public signup remains closed.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerUatFixSprintRetestGateVersion = "V20.6";
