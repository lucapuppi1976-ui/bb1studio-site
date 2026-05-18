export type TesterManualUatScenarioPackMode = "dry-run" | "first-manual-uat-scenario-pack";
export type TesterManualUatScenarioPackDecision =
  | "FIRST_UAT_SCENARIOS_READY"
  | "EVIDENCE_INCOMPLETE"
  | "SAFETY_REVIEW_REQUIRED"
  | "NO_GO";
export type TesterManualUatScenarioPackSeverity = "info" | "watch" | "elevated" | "critical";

export interface TesterManualUatScenarioPackInput {
  email?: string;
  userDetected?: boolean;
  roleValue?: string;
  roleCompatible?: boolean;
  hasPasswordHash?: boolean;
  manualLoginObserved?: boolean;
  onboardingGateReady?: boolean;
  loginScenarioObserved?: boolean;
  navigationScenarioObserved?: boolean;
  photoDiagnosisScenarioObserved?: boolean;
  operationsReadOnlyScenarioObserved?: boolean;
  mobileUsabilityObserved?: boolean;
  localeFallbackObserved?: boolean;
  logoutScenarioObserved?: boolean;
  evidenceScreenshotsCaptured?: boolean;
  evidenceNotesCaptured?: boolean;
  noAiProviderCallConfirmed?: boolean;
  noExecutionConfirmed?: boolean;
  noPublicSignupConfirmed?: boolean;
  noAccountWriteConfirmed?: boolean;
  noSchemaMigrationConfirmed?: boolean;
  openCriticalIssueCount?: number;
  openMajorIssueCount?: number;
}

export interface TesterManualUatScenarioPackBoardItem {
  id: string;
  label: string;
  lane: string;
  score: number;
  severity: TesterManualUatScenarioPackSeverity;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface TesterManualUatScenarioPackFindingItem {
  id: string;
  label: string;
  lane: string;
  severity: TesterManualUatScenarioPackSeverity;
  reason: string;
  manualResolution: string;
  blocksFirstUat: boolean;
}

export const TESTER_MANUAL_UAT_SCENARIO_PACK_GUARDRAIL = {
  testerManualUatScenarioPackReady: true,
  firstManualUatScenarioPackReady: true,
  evidenceChecklistReady: true,
  manualEvidenceOnly: true,
  readOnlyVerificationOnly: true,
  loginScenarioReady: true,
  navigationScenarioReady: true,
  photoDiagnosisScenarioReady: true,
  operationsReadOnlyScenarioReady: true,
  mobileUsabilityScenarioReady: true,
  localeFallbackScenarioReady: true,
  logoutScenarioReady: true,
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
  evidencePersistenceAllowed: false,
  evidencePersistencePerformed: false,
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

export interface TesterManualUatScenarioPackReport {
  generatedAt: string;
  mode: TesterManualUatScenarioPackMode;
  input: Required<TesterManualUatScenarioPackInput>;
  readiness: typeof TESTER_MANUAL_UAT_SCENARIO_PACK_GUARDRAIL;
  scenarioScore: number;
  evidenceScore: number;
  safetyScore: number;
  totalScore: number;
  decision: TesterManualUatScenarioPackDecision;
  accountBoard: TesterManualUatScenarioPackBoardItem[];
  scenarioBoard: TesterManualUatScenarioPackBoardItem[];
  evidenceBoard: TesterManualUatScenarioPackBoardItem[];
  safetyBoard: TesterManualUatScenarioPackBoardItem[];
  noGoBoard: TesterManualUatScenarioPackBoardItem[];
  findings: TesterManualUatScenarioPackFindingItem[];
  scenarioPack: Array<{
    id: string;
    title: string;
    goal: string;
    evidenceRequired: string[];
    passCriteria: string[];
  }>;
  nextStep: string;
  safetySummary: string[];
}

function normalizeInput(input: TesterManualUatScenarioPackInput): Required<TesterManualUatScenarioPackInput> {
  return {
    email: input.email ?? "",
    userDetected: input.userDetected ?? false,
    roleValue: input.roleValue ?? "",
    roleCompatible: input.roleCompatible ?? false,
    hasPasswordHash: input.hasPasswordHash ?? false,
    manualLoginObserved: input.manualLoginObserved ?? false,
    onboardingGateReady: input.onboardingGateReady ?? false,
    loginScenarioObserved: input.loginScenarioObserved ?? false,
    navigationScenarioObserved: input.navigationScenarioObserved ?? false,
    photoDiagnosisScenarioObserved: input.photoDiagnosisScenarioObserved ?? false,
    operationsReadOnlyScenarioObserved: input.operationsReadOnlyScenarioObserved ?? false,
    mobileUsabilityObserved: input.mobileUsabilityObserved ?? false,
    localeFallbackObserved: input.localeFallbackObserved ?? false,
    logoutScenarioObserved: input.logoutScenarioObserved ?? false,
    evidenceScreenshotsCaptured: input.evidenceScreenshotsCaptured ?? false,
    evidenceNotesCaptured: input.evidenceNotesCaptured ?? false,
    noAiProviderCallConfirmed: input.noAiProviderCallConfirmed ?? false,
    noExecutionConfirmed: input.noExecutionConfirmed ?? false,
    noPublicSignupConfirmed: input.noPublicSignupConfirmed ?? false,
    noAccountWriteConfirmed: input.noAccountWriteConfirmed ?? false,
    noSchemaMigrationConfirmed: input.noSchemaMigrationConfirmed ?? false,
    openCriticalIssueCount: input.openCriticalIssueCount ?? 0,
    openMajorIssueCount: input.openMajorIssueCount ?? 0,
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): TesterManualUatScenarioPackSeverity {
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
): TesterManualUatScenarioPackBoardItem {
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

export function buildTesterManualUatScenarioPackReport(
  input: TesterManualUatScenarioPackInput = {},
): TesterManualUatScenarioPackReport {
  const normalized = normalizeInput(input);

  const findings: TesterManualUatScenarioPackFindingItem[] = [];

  if (!normalized.userDetected) {
    findings.push({
      id: "TMUAT_FINDING_001",
      label: "Tester account not detected",
      lane: "account",
      severity: "critical",
      reason: "The tester account is not detected.",
      manualResolution: "Verify the pilot tester account before UAT.",
      blocksFirstUat: true,
    });
  }

  if (normalized.userDetected && !normalized.roleCompatible) {
    findings.push({
      id: "TMUAT_FINDING_002",
      label: "Tester role not compatible",
      lane: "account",
      severity: "critical",
      reason: "The tester role is not compatible with manual UAT.",
      manualResolution: "Resolve role mapping before first scenario execution.",
      blocksFirstUat: true,
    });
  }

  if (normalized.userDetected && !normalized.hasPasswordHash) {
    findings.push({
      id: "TMUAT_FINDING_003",
      label: "Login method missing",
      lane: "account",
      severity: "critical",
      reason: "The tester account does not have a passwordHash.",
      manualResolution: "Complete password setup before UAT.",
      blocksFirstUat: true,
    });
  }

  if (!normalized.manualLoginObserved) {
    findings.push({
      id: "TMUAT_FINDING_004",
      label: "Manual login not confirmed",
      lane: "scenario",
      severity: "watch",
      reason: "Manual login was not confirmed in the UAT scenario checklist.",
      manualResolution: "Confirm login as pilot tester.",
      blocksFirstUat: false,
    });
  }

  if (!normalized.onboardingGateReady) {
    findings.push({
      id: "TMUAT_FINDING_005",
      label: "Onboarding gate not confirmed",
      lane: "scenario",
      severity: "watch",
      reason: "Onboarding or landing route was not confirmed.",
      manualResolution: "Confirm first landing/onboarding after login.",
      blocksFirstUat: false,
    });
  }

  if (!normalized.evidenceScreenshotsCaptured || !normalized.evidenceNotesCaptured) {
    findings.push({
      id: "TMUAT_FINDING_006",
      label: "Evidence incomplete",
      lane: "evidence",
      severity: "watch",
      reason: "Screenshots or notes were not fully captured.",
      manualResolution: "Capture screenshots and notes before closing UAT.",
      blocksFirstUat: false,
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
      id: "TMUAT_FINDING_007",
      label: "Safety confirmations incomplete",
      lane: "safety",
      severity: "elevated",
      reason: "One or more safety confirmations are missing.",
      manualResolution: "Confirm no AI provider, no execution, no public signup, no account write and no schema migration.",
      blocksFirstUat: true,
    });
  }

  if (normalized.openCriticalIssueCount > 0) {
    findings.push({
      id: "TMUAT_FINDING_008",
      label: "Open critical UAT issue",
      lane: "uat",
      severity: "critical",
      reason: String(normalized.openCriticalIssueCount) + " critical UAT issues remain open.",
      manualResolution: "Resolve critical issue before proceeding.",
      blocksFirstUat: true,
    });
  }

  if (normalized.openMajorIssueCount > 0) {
    findings.push({
      id: "TMUAT_FINDING_009",
      label: "Open major UAT issue",
      lane: "uat",
      severity: "watch",
      reason: String(normalized.openMajorIssueCount) + " major UAT issues remain open.",
      manualResolution: "Track major issues before expanding UAT.",
      blocksFirstUat: false,
    });
  }

  const accountBoard = [
    boardItem(
      "TMUAT_ACCOUNT_001",
      "Tester account and login method",
      "account",
      normalized.userDetected && normalized.roleCompatible && normalized.hasPasswordHash ? 100 : 0,
      ["userDetected", "roleCompatible", "hasPasswordHash"],
      "Pilot tester account is ready for manual UAT.",
    ),
  ];

  const scenarioObservations = [
    normalized.manualLoginObserved,
    normalized.onboardingGateReady,
    normalized.loginScenarioObserved,
    normalized.navigationScenarioObserved,
    normalized.photoDiagnosisScenarioObserved,
    normalized.operationsReadOnlyScenarioObserved,
    normalized.mobileUsabilityObserved,
    normalized.localeFallbackObserved,
    normalized.logoutScenarioObserved,
  ];

  const scenarioScore = clampScore(
    (scenarioObservations.filter(Boolean).length / scenarioObservations.length) * 100,
  );

  const evidenceObservations = [
    normalized.evidenceScreenshotsCaptured,
    normalized.evidenceNotesCaptured,
  ];

  const evidenceScore = clampScore(
    (evidenceObservations.filter(Boolean).length / evidenceObservations.length) * 100,
  );

  const safetyObservations = [
    normalized.noAiProviderCallConfirmed,
    normalized.noExecutionConfirmed,
    normalized.noPublicSignupConfirmed,
    normalized.noAccountWriteConfirmed,
    normalized.noSchemaMigrationConfirmed,
  ];

  const safetyScore = clampScore(
    (safetyObservations.filter(Boolean).length / safetyObservations.length) * 100,
  );

  const scenarioBoard = [
    boardItem(
      "TMUAT_SCENARIO_001",
      "First manual UAT scenario pack",
      "scenario",
      scenarioScore,
      ["login", "navigation", "photo diagnosis", "operations read-only", "mobile", "locale", "logout"],
      "Scenario pack is manually observed and ready for evidence review.",
    ),
  ];

  const evidenceBoard = [
    boardItem(
      "TMUAT_EVIDENCE_001",
      "Evidence checklist",
      "evidence",
      evidenceScore,
      ["screenshots", "notes"],
      "Evidence is captured manually and not persisted by this gate.",
    ),
  ];

  const safetyBoard = [
    boardItem(
      "TMUAT_SAFETY_001",
      "No-write/no-AI safety confirmations",
      "safety",
      safetyScore,
      ["no AI", "no execution", "no public signup", "no account write", "no schema migration"],
      "Safety confirmations are complete before first UAT closure.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "TMUAT_NOGO_001",
      "Evidence persistence",
      "no_go",
      0,
      ["evidencePersistenceAllowed=false"],
      "No-go: V20.3 does not persist evidence.",
    ),
    boardItem(
      "TMUAT_NOGO_002",
      "Account/password writes",
      "no_go",
      0,
      ["accountWriteAllowed=false", "passwordWriteAllowed=false"],
      "No-go: V20.3 does not write account or password data.",
    ),
    boardItem(
      "TMUAT_NOGO_003",
      "AI/provider/execution",
      "no_go",
      0,
      ["providerCalled=false", "operationalExecutionAllowed=false"],
      "No-go: AI provider and execution remain disabled.",
    ),
  ];

  const blocking = findings.some((item) => item.blocksFirstUat);
  const allScenariosObserved = scenarioScore === 100;
  const allEvidenceComplete = evidenceScore === 100;
  const allSafetyConfirmed = safetyScore === 100;

  const totalScore = clampScore(
    (accountBoard[0].score + scenarioScore + evidenceScore + safetyScore) / 4 -
      findings.filter((item) => item.blocksFirstUat).length * 25,
  );

  const decision: TesterManualUatScenarioPackDecision =
    blocking
      ? "NO_GO"
      : !allSafetyConfirmed
        ? "SAFETY_REVIEW_REQUIRED"
        : !allEvidenceComplete || !allScenariosObserved
          ? "EVIDENCE_INCOMPLETE"
          : "FIRST_UAT_SCENARIOS_READY";

  const nextStep =
    decision === "FIRST_UAT_SCENARIOS_READY"
      ? "Proceed to first structured UAT execution report."
      : decision === "EVIDENCE_INCOMPLETE"
        ? "Complete missing scenario observations and evidence before closing UAT."
        : decision === "SAFETY_REVIEW_REQUIRED"
          ? "Complete safety confirmations before proceeding."
          : "Resolve blocking findings before first UAT scenario execution.";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    input: normalized,
    readiness: TESTER_MANUAL_UAT_SCENARIO_PACK_GUARDRAIL,
    scenarioScore,
    evidenceScore,
    safetyScore,
    totalScore,
    decision,
    accountBoard,
    scenarioBoard,
    evidenceBoard,
    safetyBoard,
    noGoBoard,
    findings,
    scenarioPack: [
      {
        id: "UAT-001",
        title: "Login and landing",
        goal: "Tester can log in and reach the first usable screen.",
        evidenceRequired: ["login screenshot", "landing screenshot", "notes"],
        passCriteria: ["login succeeds", "landing screen is usable", "no public signup required"],
      },
      {
        id: "UAT-002",
        title: "Navigation and mobile usability",
        goal: "Tester can navigate primary areas on desktop/mobile.",
        evidenceRequired: ["navigation screenshot", "mobile screenshot", "notes"],
        passCriteria: ["navigation clear", "no broken primary route", "mobile layout acceptable"],
      },
      {
        id: "UAT-003",
        title: "Photo diagnosis entry point",
        goal: "Tester can reach the photo diagnosis area without AI live provider execution.",
        evidenceRequired: ["photo diagnosis page screenshot", "notes"],
        passCriteria: ["page accessible", "no provider call required", "dry-run/local mode clear"],
      },
      {
        id: "UAT-004",
        title: "Operations read-only visibility",
        goal: "Admin/operator route remains safe and read-only for UAT observations.",
        evidenceRequired: ["operations panel screenshot", "notes"],
        passCriteria: ["safe panels visible", "no write/AI/execution actions triggered"],
      },
      {
        id: "UAT-005",
        title: "Logout",
        goal: "Tester can end the session cleanly.",
        evidenceRequired: ["logout observation", "notes"],
        passCriteria: ["logout works", "protected area no longer accessible without login"],
      },
    ],
    nextStep,
    safetySummary: [
      "V20.3 defines the first manual UAT scenario pack and evidence checklist.",
      "No account, password, invite, OAuth, evidence, schema, migration, AI provider, public export, incident or execution write is performed.",
      "Evidence remains manual and non-persistent.",
      "Public signup remains closed.",
      "Human review remains mandatory.",
    ],
  };
}

export const testerManualUatScenarioPackVersion = "V20.3";
