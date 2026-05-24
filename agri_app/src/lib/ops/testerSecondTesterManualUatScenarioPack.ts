export type TesterSecondTesterManualUatScenarioPackMode =
  | "dry-run"
  | "second-tester-manual-uat-scenario-pack";

export type TesterSecondTesterManualUatScenarioPackDecision =
  | "SECOND_TESTER_SCENARIO_PACK_COMPLETE"
  | "EVIDENCE_INCOMPLETE"
  | "SCENARIO_COVERAGE_INCOMPLETE"
  | "FIX_BEFORE_SCENARIO_PACK"
  | "NO_GO";

export type TesterSecondTesterManualUatScenarioPackSeverity =
  | "info"
  | "watch"
  | "elevated"
  | "critical";

export interface TesterSecondTesterManualUatScenarioPackInput {
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

  previousLoginSessionGateCleared?: boolean;
  writePathsClosedConfirmed?: boolean;

  loginLandingScenarioObserved?: boolean;
  navigationScenarioObserved?: boolean;
  photoDiagnosisEntryObserved?: boolean;
  photoQualityGateObserved?: boolean;
  evidenceBundleEntryObserved?: boolean;
  operationsReadOnlyObserved?: boolean;
  mobileUsabilityObserved?: boolean;
  localeFallbackObserved?: boolean;
  logoutObserved?: boolean;

  screenshotsCaptured?: boolean;
  notesCaptured?: boolean;
  issueTriageCaptured?: boolean;
  scenarioChecklistReviewed?: boolean;
  operatorSupportReady?: boolean;

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

export interface TesterSecondTesterManualUatScenarioPackItem {
  id: string;
  title: string;
  objective: string;
  requiredEvidence: string[];
  passCriteria: string[];
  safetyNotes: string[];
}

export interface TesterSecondTesterManualUatScenarioPackBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterSecondTesterManualUatScenarioPackSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterSecondTesterManualUatScenarioPackFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterSecondTesterManualUatScenarioPackSeverity;
  reason: string;
  manualResolution: string;
  blocksScenarioPack: boolean;
}

export const TESTER_SECOND_TESTER_MANUAL_UAT_SCENARIO_PACK_GUARDRAIL = {
  testerSecondTesterManualUatScenarioPackReady: true,
  secondTesterManualScenarioPackReady: true,
  scenarioChecklistReady: true,
  evidenceChecklistReady: true,
  issueTriageReady: true,
  secondTesterUatExpansionReady: true,
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

export interface TesterSecondTesterManualUatScenarioPackReport {
  generatedAt: string;
  mode: TesterSecondTesterManualUatScenarioPackMode;
  input: Required<TesterSecondTesterManualUatScenarioPackInput>;
  readiness: typeof TESTER_SECOND_TESTER_MANUAL_UAT_SCENARIO_PACK_GUARDRAIL;
  accessScore: number;
  scenarioScore: number;
  evidenceScore: number;
  safetyScore: number;
  triageScore: number;
  totalScore: number;
  decision: TesterSecondTesterManualUatScenarioPackDecision;
  scenarioPack: TesterSecondTesterManualUatScenarioPackItem[];
  accessBoard: TesterSecondTesterManualUatScenarioPackBoardItem[];
  scenarioBoard: TesterSecondTesterManualUatScenarioPackBoardItem[];
  evidenceBoard: TesterSecondTesterManualUatScenarioPackBoardItem[];
  safetyBoard: TesterSecondTesterManualUatScenarioPackBoardItem[];
  noGoBoard: TesterSecondTesterManualUatScenarioPackBoardItem[];
  findings: TesterSecondTesterManualUatScenarioPackFindingItem[];
  recommendedNextStep: string;
  safetySummary: string[];
}

function normalizeInput(
  input: TesterSecondTesterManualUatScenarioPackInput,
): Required<TesterSecondTesterManualUatScenarioPackInput> {
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

    previousLoginSessionGateCleared: input.previousLoginSessionGateCleared ?? false,
    writePathsClosedConfirmed: input.writePathsClosedConfirmed ?? false,

    loginLandingScenarioObserved: input.loginLandingScenarioObserved ?? false,
    navigationScenarioObserved: input.navigationScenarioObserved ?? false,
    photoDiagnosisEntryObserved: input.photoDiagnosisEntryObserved ?? false,
    photoQualityGateObserved: input.photoQualityGateObserved ?? false,
    evidenceBundleEntryObserved: input.evidenceBundleEntryObserved ?? false,
    operationsReadOnlyObserved: input.operationsReadOnlyObserved ?? false,
    mobileUsabilityObserved: input.mobileUsabilityObserved ?? false,
    localeFallbackObserved: input.localeFallbackObserved ?? false,
    logoutObserved: input.logoutObserved ?? false,

    screenshotsCaptured: input.screenshotsCaptured ?? false,
    notesCaptured: input.notesCaptured ?? false,
    issueTriageCaptured: input.issueTriageCaptured ?? false,
    scenarioChecklistReviewed: input.scenarioChecklistReviewed ?? false,
    operatorSupportReady: input.operatorSupportReady ?? false,

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

function severityFromConcern(
  score: number,
): TesterSecondTesterManualUatScenarioPackSeverity {
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
): TesterSecondTesterManualUatScenarioPackBoardItem {
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

export function buildTesterSecondTesterManualUatScenarioPackReport(
  input: TesterSecondTesterManualUatScenarioPackInput = {},
): TesterSecondTesterManualUatScenarioPackReport {
  const normalized = normalizeInput(input);

  const firstTesterEmailValid = hasValidEmail(normalized.firstTesterEmail);
  const secondTesterEmailValid = hasValidEmail(normalized.secondTesterEmail);

  const accessReady =
    firstTesterEmailValid &&
    secondTesterEmailValid &&
    normalized.firstTesterDetected &&
    normalized.firstTesterRoleCompatible &&
    normalized.firstTesterHasPasswordHash &&
    normalized.secondTesterDetected &&
    normalized.secondTesterRoleCompatible &&
    normalized.secondTesterHasPasswordHash &&
    normalized.previousLoginSessionGateCleared &&
    normalized.writePathsClosedConfirmed;

  const scenarioFlags = [
    normalized.loginLandingScenarioObserved,
    normalized.navigationScenarioObserved,
    normalized.photoDiagnosisEntryObserved,
    normalized.photoQualityGateObserved,
    normalized.evidenceBundleEntryObserved,
    normalized.operationsReadOnlyObserved,
    normalized.mobileUsabilityObserved,
    normalized.localeFallbackObserved,
    normalized.logoutObserved,
  ];

  const evidenceFlags = [
    normalized.screenshotsCaptured,
    normalized.notesCaptured,
    normalized.issueTriageCaptured,
    normalized.scenarioChecklistReviewed,
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

  const scenarioComplete = scenarioFlags.every(Boolean);
  const evidenceComplete = evidenceFlags.every(Boolean);
  const safetyConfirmed = safetyFlags.every(Boolean);

  const findings: TesterSecondTesterManualUatScenarioPackFindingItem[] = [];

  if (!firstTesterEmailValid || !normalized.firstTesterDetected) {
    findings.push({
      id: "STMUAT_FINDING_001",
      label: "First tester not detected",
      lane: "access",
      severity: "critical",
      reason: "The first tester baseline account must remain valid.",
      manualResolution: "Verify first tester access before the second tester scenario pack.",
      blocksScenarioPack: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterRoleCompatible) {
    findings.push({
      id: "STMUAT_FINDING_002",
      label: "First tester role not compatible",
      lane: "access",
      severity: "critical",
      reason: "The first tester role is not compatible.",
      manualResolution: "Resolve first tester role mapping.",
      blocksScenarioPack: true,
    });
  }

  if (normalized.firstTesterDetected && !normalized.firstTesterHasPasswordHash) {
    findings.push({
      id: "STMUAT_FINDING_003",
      label: "First tester passwordHash missing",
      lane: "access",
      severity: "critical",
      reason: "The first tester must keep a working login method.",
      manualResolution: "Restore first tester login readiness.",
      blocksScenarioPack: true,
    });
  }

  if (!secondTesterEmailValid || !normalized.secondTesterDetected) {
    findings.push({
      id: "STMUAT_FINDING_004",
      label: "Second tester not detected",
      lane: "access",
      severity: "critical",
      reason: "The second tester account must exist before scenario testing.",
      manualResolution: "Complete second tester account/password setup first.",
      blocksScenarioPack: true,
    });
  }

  if (normalized.secondTesterDetected && !normalized.secondTesterRoleCompatible) {
    findings.push({
      id: "STMUAT_FINDING_005",
      label: "Second tester role not compatible",
      lane: "access",
      severity: "critical",
      reason: "The second tester role is not compatible with UAT access.",
      manualResolution: "Review and correct role mapping.",
      blocksScenarioPack: true,
    });
  }

  if (normalized.secondTesterDetected && !normalized.secondTesterHasPasswordHash) {
    findings.push({
      id: "STMUAT_FINDING_006",
      label: "Second tester passwordHash missing",
      lane: "access",
      severity: "critical",
      reason: "The second tester must have a login method before manual scenario testing.",
      manualResolution: "Complete V21.0 password setup first.",
      blocksScenarioPack: true,
    });
  }

  if (!normalized.previousLoginSessionGateCleared) {
    findings.push({
      id: "STMUAT_FINDING_007",
      label: "Previous login/session gate not cleared",
      lane: "readiness",
      severity: "critical",
      reason: "V21.1 must be completed before V21.2 scenario pack.",
      manualResolution: "Complete V21.1 C with SECOND_TESTER_UAT_READY.",
      blocksScenarioPack: true,
    });
  }

  if (!normalized.writePathsClosedConfirmed) {
    findings.push({
      id: "STMUAT_FINDING_008",
      label: "Write paths not confirmed closed",
      lane: "safety",
      severity: "critical",
      reason: "Account/password write paths must remain closed during manual UAT.",
      manualResolution: "Confirm Render write flags are disabled.",
      blocksScenarioPack: true,
    });
  }

  if (!scenarioComplete) {
    findings.push({
      id: "STMUAT_FINDING_009",
      label: "Scenario coverage incomplete",
      lane: "scenario",
      severity: "watch",
      reason: "One or more required second tester scenarios were not observed.",
      manualResolution: "Complete the missing scenario observations and rerun the gate.",
      blocksScenarioPack: false,
    });
  }

  if (!evidenceComplete) {
    findings.push({
      id: "STMUAT_FINDING_010",
      label: "Evidence checklist incomplete",
      lane: "evidence",
      severity: "watch",
      reason: "Screenshots, notes, triage, checklist review or operator support evidence is incomplete.",
      manualResolution: "Complete the evidence checklist before closing the scenario pack.",
      blocksScenarioPack: false,
    });
  }

  if (!safetyConfirmed) {
    findings.push({
      id: "STMUAT_FINDING_011",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "critical",
      reason: "One or more no-write/no-AI/no-execution confirmations are missing.",
      manualResolution: "Confirm all safety locks before progressing.",
      blocksScenarioPack: true,
    });
  }

  if (normalized.openCriticalIssueCount > 0) {
    findings.push({
      id: "STMUAT_FINDING_012",
      label: "Critical issue open",
      lane: "triage",
      severity: "critical",
      reason: String(normalized.openCriticalIssueCount) + " critical issue(s) remain open.",
      manualResolution: "Resolve critical issues before closing the scenario pack.",
      blocksScenarioPack: true,
    });
  }

  if (normalized.openMajorIssueCount > 0) {
    findings.push({
      id: "STMUAT_FINDING_013",
      label: "Major issue open",
      lane: "triage",
      severity: "elevated",
      reason: String(normalized.openMajorIssueCount) + " major issue(s) remain open.",
      manualResolution: "Fix or explicitly defer major issues before continuing.",
      blocksScenarioPack: false,
    });
  }

  const accessScore = accessReady ? 100 : 0;
  const scenarioScore = clampScore((scenarioFlags.filter(Boolean).length / scenarioFlags.length) * 100);
  const evidenceScore = clampScore((evidenceFlags.filter(Boolean).length / evidenceFlags.length) * 100);
  const safetyScore = clampScore((safetyFlags.filter(Boolean).length / safetyFlags.length) * 100);
  const triageScore = clampScore(
    100 -
      normalized.openCriticalIssueCount * 45 -
      normalized.openMajorIssueCount * 25 -
      normalized.openMinorIssueCount * 5 -
      normalized.openUsabilityIssueCount * 5 -
      normalized.openLocalizationIssueCount * 5 -
      normalized.openPerformanceIssueCount * 5,
  );

  const hasBlocking = findings.some((item) => item.blocksScenarioPack);
  const hasMajorIssue = normalized.openMajorIssueCount > 0;
  const totalScore = clampScore(
    (accessScore + scenarioScore + evidenceScore + safetyScore + triageScore) / 5 -
      findings.filter((item) => item.blocksScenarioPack).length * 25,
  );

  const decision: TesterSecondTesterManualUatScenarioPackDecision =
    hasBlocking
      ? "NO_GO"
      : hasMajorIssue
        ? "FIX_BEFORE_SCENARIO_PACK"
        : !scenarioComplete
          ? "SCENARIO_COVERAGE_INCOMPLETE"
          : !evidenceComplete
            ? "EVIDENCE_INCOMPLETE"
            : "SECOND_TESTER_SCENARIO_PACK_COMPLETE";

  const recommendedNextStep =
    decision === "SECOND_TESTER_SCENARIO_PACK_COMPLETE"
      ? "Proceed to V21.3 second tester UAT execution report and issue triage board."
      : decision === "EVIDENCE_INCOMPLETE"
        ? "Complete screenshots, notes, triage and checklist evidence before closing V21.2."
        : decision === "SCENARIO_COVERAGE_INCOMPLETE"
          ? "Complete missing second tester scenario observations and rerun V21.2 C."
          : decision === "FIX_BEFORE_SCENARIO_PACK"
            ? "Fix or explicitly defer major issues before continuing UAT."
            : "Resolve blocking findings before progressing.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_SECOND_TESTER_MANUAL_UAT_SCENARIO_PACK_GUARDRAIL,
    accessScore,
    scenarioScore,
    evidenceScore,
    safetyScore,
    triageScore,
    totalScore,
    decision,
    scenarioPack: [
      {
        id: "ST-UAT-001",
        title: "Login and first landing",
        objective: "Second tester can log in and reach the first usable screen.",
        requiredEvidence: ["login result", "landing screenshot or notes", "tester identity redacted"],
        passCriteria: ["manual login observed", "dashboard or onboarding landing observed"],
        safetyNotes: ["No account/password write in this scenario."],
      },
      {
        id: "ST-UAT-002",
        title: "Navigation and mobile usability",
        objective: "Second tester can navigate primary areas on desktop/mobile.",
        requiredEvidence: ["navigation path", "mobile or responsive observation", "usability notes"],
        passCriteria: ["navigation observed", "mobile usability observed"],
        safetyNotes: ["No persistence of evidence in V21.2."],
      },
      {
        id: "ST-UAT-003",
        title: "Photo diagnosis entry point",
        objective: "Second tester can reach photo diagnosis entry points without AI provider execution.",
        requiredEvidence: ["photo diagnosis entry observation", "quality gate entry observation"],
        passCriteria: ["photo diagnosis entry observed", "photo quality gate observed", "no AI provider call confirmed"],
        safetyNotes: ["Provider AI remains disabled."],
      },
      {
        id: "ST-UAT-004",
        title: "Evidence bundle entry point",
        objective: "Second tester can reach evidence bundle workflow without storing evidence.",
        requiredEvidence: ["evidence bundle entry observation", "manual notes"],
        passCriteria: ["evidence bundle entry observed", "no evidence persistence confirmed"],
        safetyNotes: ["No evidence persistence in V21.2."],
      },
      {
        id: "ST-UAT-005",
        title: "Operations read-only visibility",
        objective: "Operations/admin route remains safe and read-only for UAT observation.",
        requiredEvidence: ["operations read-only observation", "no execution confirmation"],
        passCriteria: ["operations read-only observed", "no operational execution confirmed"],
        safetyNotes: ["No execution and no operational writes."],
      },
      {
        id: "ST-UAT-006",
        title: "Locale fallback and logout",
        objective: "Second tester can use acceptable language fallback and end the session cleanly.",
        requiredEvidence: ["locale fallback observation", "logout observation"],
        passCriteria: ["locale fallback observed", "logout observed"],
        safetyNotes: ["No account/session mutation is performed by the ops gate."],
      },
    ],
    accessBoard: [
      boardItem(
        "STMUAT_ACCESS_001",
        "Second tester access readiness",
        "access",
        accessScore,
        ["first tester valid", "second tester detected", "role compatible", "passwordHash", "V21.1 cleared"],
        "Second tester is eligible for manual scenario testing.",
      ),
    ],
    scenarioBoard: [
      boardItem(
        "STMUAT_SCENARIO_001",
        "Manual scenario coverage",
        "scenario",
        scenarioScore,
        ["login", "navigation", "photo diagnosis", "quality gate", "evidence bundle", "ops read-only", "mobile", "locale", "logout"],
        "All required second tester scenarios were observed.",
      ),
    ],
    evidenceBoard: [
      boardItem(
        "STMUAT_EVIDENCE_001",
        "Evidence checklist",
        "evidence",
        evidenceScore,
        ["screenshots", "notes", "issue triage", "checklist review", "operator support"],
        "Evidence is complete enough to close the scenario pack.",
      ),
    ],
    safetyBoard: [
      boardItem(
        "STMUAT_SAFETY_001",
        "No-write/no-AI/no-execution safety",
        "safety",
        safetyScore,
        ["no account write", "no password write", "no invite", "no signup", "no migration", "no AI", "no execution", "no evidence persistence"],
        "V21.2 remains read-only and safe.",
      ),
    ],
    noGoBoard: [
      boardItem(
        "STMUAT_NOGO_001",
        "Account/password writes",
        "no_go",
        0,
        ["accountWriteAllowed=false", "passwordWriteAllowed=false"],
        "No-go: V21.2 does not write account or password data.",
      ),
      boardItem(
        "STMUAT_NOGO_002",
        "AI/provider/execution",
        "no_go",
        0,
        ["providerCalled=false", "operationalExecutionAllowed=false"],
        "No-go: AI provider and operational execution remain disabled.",
      ),
      boardItem(
        "STMUAT_NOGO_003",
        "Evidence persistence",
        "no_go",
        0,
        ["evidencePersistenceAllowed=false"],
        "No-go: V21.2 does not persist evidence or issue records.",
      ),
    ],
    findings,
    recommendedNextStep,
    safetySummary: [
      "V21.2 validates the second tester manual UAT scenario pack and evidence checklist.",
      "No account, password, invite, OAuth, evidence, issue, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Public signup remains closed.",
      "Manual evidence capture remains outside the app persistence path.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerSecondTesterManualUatScenarioPackVersion = "V21.2";
