export type LiveUatMode = "dry-run" | "online-live-uat";
export type LiveUatSeverity = "info" | "watch" | "elevated" | "critical";
export type LiveUatPriority = "low" | "medium" | "high" | "urgent";
export type LiveUatStatus =
  | "blocked"
  | "uat-design-ready"
  | "live-uat-session-ready"
  | "controlled-live-uat-ready";

export type LiveUatLane =
  | "uat_test_matrix"
  | "evidence_capture"
  | "route_coverage"
  | "protected_endpoint_coverage"
  | "bug_triage"
  | "pass_fail_criteria"
  | "rollback_decision"
  | "human_signoff";

export interface LiveUatInput {
  testCaseCount?: number;
  completedCaseCount?: number;
  evidenceItemCount?: number;
  routeCoverageScore?: number;
  protectedEndpointScore?: number;
  operatorFeedbackScore?: number;
  bugTriageScore?: number;
  rollbackReadinessScore?: number;
  openCriticalBugCount?: number;
  openMajorBugCount?: number;
  unresolvedGuardrailFindingCount?: number;
  reviewerRole?: string;
}

export interface LiveUatMatrixItem {
  id: string;
  label: string;
  lane: LiveUatLane;
  priority: LiveUatPriority;
  status: "planned" | "ready" | "passed" | "review";
  score: number;
  testGoal: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface LiveUatEvidenceItem {
  id: string;
  label: string;
  lane: LiveUatLane;
  evidenceType: "route" | "screenshot" | "operator-note" | "protected-check" | "rollback-note";
  captured: boolean;
  severity: LiveUatSeverity;
  redacted: true;
  safeOutcome: string;
}

export interface LiveUatFindingItem {
  id: string;
  label: string;
  lane: LiveUatLane;
  severity: LiveUatSeverity;
  reason: string;
  manualResolution: string;
  blocksLiveUat: boolean;
}

export const ONLINE_LIVE_UAT_GUARDRAIL = {
  liveUatReady: true,
  onlineControlledGo: true,
  controlledDryRunProductionReady: true,
  evidenceCaptureReady: true,
  routeCoverageReady: true,
  protectedEndpointCoverageReady: true,
  bugTriageReady: true,
  rollbackDecisionReady: true,
  providerAiReady: false,
  persistenceReady: false,
  memoryPersistenceReady: false,
  automaticTaskCreationReady: false,
  automaticInterventionCreationReady: false,
  automaticExecutionReady: false,
  providerCalled: false,
  persistencePerformed: false,
  memoryPersistencePerformed: false,
  taskCreated: false,
  interventionCreated: false,
  automaticExecutionPerformed: false,
  publicSharePerformed: false,
  productPrescriptionPerformed: false,
  dosageAdvicePerformed: false,
  automaticTaskCreationAllowed: false,
  automaticInterventionCreationAllowed: false,
  automaticExecutionAllowed: false,
  dbPersistenceAllowed: false,
  memoryPersistenceAllowed: false,
  publicShareAllowed: false,
  productPrescriptionAllowed: false,
  dosageAdviceAllowed: false,
  incidentRecordPersistenceAllowed: false,
  incidentRecordPersistencePerformed: false,
  incidentRecordWriteAllowed: false,
  incidentRecordWritePerformed: false,
  reviewPersistenceAllowed: false,
  reviewPersistencePerformed: false,
  providerCallExecutionAllowed: false,
  providerCallExecutionPerformed: false,
  providerRequestDispatchAllowed: false,
  providerRequestDispatchPerformed: false,
  providerResponseIntakeAllowed: false,
  providerResponseIntakePerformed: false,
  providerResultPersistenceAllowed: false,
  providerResultPersistencePerformed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  operationalExecutionAllowed: false,
  operationalExecutionPerformed: false,
  executionCommandAllowed: false,
  executionCommandPerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  storageActivationAllowed: false,
  storageActivationPerformed: false,
  manualDispatchOnly: true,
  humanReviewRequired: true,
  localAnalysisOnly: true,
  redactedOutputOnly: true,
  localMemoryOnly: true,
  localLearningOnly: true,
  localPromotionOnly: true,
  localQualityOnly: true,
} as const;

export interface LiveUatReport {
  generatedAt: string;
  mode: LiveUatMode;
  context: Required<LiveUatInput>;
  readiness: typeof ONLINE_LIVE_UAT_GUARDRAIL;
  liveUatScore: number;
  liveUatStatus: LiveUatStatus;
  overallSeverity: LiveUatSeverity;
  testMatrix: LiveUatMatrixItem[];
  evidenceCaptureBoard: LiveUatEvidenceItem[];
  routeCoverageBoard: LiveUatMatrixItem[];
  protectedEndpointCoverageBoard: LiveUatMatrixItem[];
  bugTriageBoard: LiveUatMatrixItem[];
  passFailCriteriaBoard: LiveUatMatrixItem[];
  rollbackDecisionBoard: LiveUatMatrixItem[];
  findings: LiveUatFindingItem[];
  stagedRoadmap: Record<"v182" | "v183" | "v184" | "v185" | "v186", string>;
  redactedExportBundle: {
    exportId: string;
    includesFieldIdentifiers: false;
    includesPrivateNotes: false;
    includesProviderPayloads: false;
    includesOperationalInternalData: false;
    includesProductionForecasts: false;
    includesProductRecommendations: false;
    includesDosageGuidance: false;
    sections: string[];
  };
  safetySummary: string[];
}

function normalizeInput(input: LiveUatInput): Required<LiveUatInput> {
  return {
    testCaseCount: input.testCaseCount ?? 18,
    completedCaseCount: input.completedCaseCount ?? 0,
    evidenceItemCount: input.evidenceItemCount ?? 12,
    routeCoverageScore: input.routeCoverageScore ?? 86,
    protectedEndpointScore: input.protectedEndpointScore ?? 90,
    operatorFeedbackScore: input.operatorFeedbackScore ?? 82,
    bugTriageScore: input.bugTriageScore ?? 84,
    rollbackReadinessScore: input.rollbackReadinessScore ?? 86,
    openCriticalBugCount: input.openCriticalBugCount ?? 0,
    openMajorBugCount: input.openMajorBugCount ?? 0,
    unresolvedGuardrailFindingCount: input.unresolvedGuardrailFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "online live UAT reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): LiveUatSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): LiveUatPriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function matrixItem(
  id: string,
  label: string,
  lane: LiveUatLane,
  score: number,
  testGoal: string,
  expectedEvidence: string[],
  safeOutcome: string,
): LiveUatMatrixItem {
  const normalized = clampScore(score);

  return {
    id,
    label,
    lane,
    priority: priorityFromScore(normalized),
    status: normalized >= 85 ? "ready" : "review",
    score: normalized,
    testGoal,
    expectedEvidence,
    safeOutcome,
  };
}

export function buildAiOnlineLiveUatTestMatrixReport(input: LiveUatInput = {}): LiveUatReport {
  const context = normalizeInput(input);

  const testMatrix = [
    matrixItem(
      "UAT_MATRIX_001",
      "Live navigation smoke test",
      "uat_test_matrix",
      context.routeCoverageScore,
      "Verify live navigation across main pages.",
      ["health route", "ready route", "photo diagnosis route"],
      "Live navigation can be tested without AI activation.",
    ),
    matrixItem(
      "UAT_MATRIX_002",
      "Admin operations smoke test",
      "uat_test_matrix",
      context.operatorFeedbackScore,
      "Verify admin operations panels are reachable by authorized operators.",
      ["admin route observation", "operations panel evidence"],
      "Admin UAT remains human-reviewed.",
    ),
    matrixItem(
      "UAT_MATRIX_003",
      "Dry-run panel review",
      "uat_test_matrix",
      100,
      "Verify all AI panels remain dry-run and local.",
      ["providerAiReady=false", "providerCalled=false", "persistencePerformed=false"],
      "No AI live call is triggered.",
    ),
  ];

  const evidenceCaptureBoard: LiveUatEvidenceItem[] = [
    {
      id: "UAT_EVIDENCE_001",
      label: "Route screenshot evidence",
      lane: "evidence_capture",
      evidenceType: "screenshot",
      captured: false,
      severity: "watch",
      redacted: true,
      safeOutcome: "Screenshots must avoid private field or operator data.",
    },
    {
      id: "UAT_EVIDENCE_002",
      label: "Protected endpoint evidence",
      lane: "evidence_capture",
      evidenceType: "protected-check",
      captured: false,
      severity: "critical",
      redacted: true,
      safeOutcome: "Protected endpoint evidence proves no public ops exposure.",
    },
    {
      id: "UAT_EVIDENCE_003",
      label: "Operator feedback evidence",
      lane: "evidence_capture",
      evidenceType: "operator-note",
      captured: false,
      severity: "info",
      redacted: true,
      safeOutcome: "Feedback remains redacted and non-private.",
    },
  ];

  const routeCoverageBoard = [
    matrixItem(
      "UAT_ROUTE_001",
      "Health and ready coverage",
      "route_coverage",
      context.routeCoverageScore,
      "Verify health and ready routes during UAT.",
      ["health reachable", "ready reachable"],
      "Route coverage is observed only.",
    ),
    matrixItem(
      "UAT_ROUTE_002",
      "Photo diagnosis coverage",
      "route_coverage",
      context.routeCoverageScore,
      "Verify photo diagnosis page renders in dry-run mode.",
      ["page loads", "dry-run panels visible"],
      "No diagnosis provider call is triggered.",
    ),
  ];

  const protectedEndpointCoverageBoard = [
    matrixItem(
      "UAT_PROTECTED_001",
      "Ops endpoint without access proof",
      "protected_endpoint_coverage",
      context.protectedEndpointScore,
      "Verify ops endpoint rejects unauthenticated requests.",
      ["401 or 403 response"],
      "Ops endpoints remain protected.",
    ),
    matrixItem(
      "UAT_PROTECTED_002",
      "Forbidden AI endpoint absence",
      "protected_endpoint_coverage",
      100,
      "Verify public AI endpoint is absent or blocked.",
      ["404, 405, 401 or 403 response"],
      "No public AI endpoint is exposed.",
    ),
  ];

  const bugTriageBoard = [
    matrixItem(
      "UAT_BUG_001",
      "Critical bug triage",
      "bug_triage",
      context.openCriticalBugCount === 0 ? 100 : 40,
      "Track critical UAT bugs.",
      ["critical bug count", "manual owner"],
      "Critical bugs block UAT progression.",
    ),
    matrixItem(
      "UAT_BUG_002",
      "Major bug triage",
      "bug_triage",
      context.openMajorBugCount === 0 ? context.bugTriageScore : 65,
      "Track major UAT bugs.",
      ["major bug count", "manual owner"],
      "Major bugs require review before expansion.",
    ),
  ];

  const passFailCriteriaBoard = [
    matrixItem(
      "UAT_PASSFAIL_001",
      "No AI live pass criterion",
      "pass_fail_criteria",
      100,
      "Confirm AI live remains disabled.",
      ["providerAiReady=false", "providerCalled=false"],
      "Pass requires no provider call.",
    ),
    matrixItem(
      "UAT_PASSFAIL_002",
      "No write path pass criterion",
      "pass_fail_criteria",
      100,
      "Confirm write paths remain disabled.",
      ["persistencePerformed=false", "taskCreated=false", "interventionCreated=false"],
      "Pass requires no write path activation.",
    ),
  ];

  const rollbackDecisionBoard = [
    matrixItem(
      "UAT_ROLLBACK_001",
      "Rollback decision readiness",
      "rollback_decision",
      context.rollbackReadinessScore,
      "Confirm rollback can be selected if UAT degrades.",
      ["latest live tag", "working tree clean", "rollback checkpoint"],
      "Rollback remains available.",
    ),
  ];

  const findings: LiveUatFindingItem[] = [];

  if (context.openCriticalBugCount > 0) {
    findings.push({
      id: "UAT_FINDING_001",
      label: "Open critical live UAT bug",
      lane: "bug_triage",
      severity: "critical",
      reason: String(context.openCriticalBugCount) + " critical UAT bugs remain open.",
      manualResolution: "Resolve critical bugs before extending live testing.",
      blocksLiveUat: true,
    });
  }

  if (context.unresolvedGuardrailFindingCount > 0) {
    findings.push({
      id: "UAT_FINDING_002",
      label: "Unresolved dry-run guardrail finding",
      lane: "pass_fail_criteria",
      severity: "critical",
      reason: String(context.unresolvedGuardrailFindingCount) + " guardrail findings remain open.",
      manualResolution: "Keep AI provider, persistence, execution and public export paths locked.",
      blocksLiveUat: true,
    });
  }

  const completionRatio = context.testCaseCount > 0 ? context.completedCaseCount / context.testCaseCount : 0;

  const liveUatScore = clampScore(
    (context.routeCoverageScore +
      context.protectedEndpointScore +
      context.operatorFeedbackScore +
      context.bugTriageScore +
      context.rollbackReadinessScore) /
      5 +
      completionRatio * 10 -
      findings.length * 15,
  );

  const liveUatStatus: LiveUatStatus =
    findings.length > 0
      ? "blocked"
      : liveUatScore >= 88
        ? "controlled-live-uat-ready"
        : liveUatScore >= 80
          ? "live-uat-session-ready"
          : "uat-design-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: ONLINE_LIVE_UAT_GUARDRAIL,
    liveUatScore,
    liveUatStatus,
    overallSeverity: severityFromConcern(
      context.openCriticalBugCount * 40 +
        context.openMajorBugCount * 20 +
        context.unresolvedGuardrailFindingCount * 45,
    ),
    testMatrix,
    evidenceCaptureBoard,
    routeCoverageBoard,
    protectedEndpointCoverageBoard,
    bugTriageBoard,
    passFailCriteriaBoard,
    rollbackDecisionBoard,
    findings,
    stagedRoadmap: {
      v182: "Online live UAT test matrix and evidence capture board.",
      v183: "Operational execution only after explicit human approval and emergency stop proof.",
      v184: "Provider runtime activation only after explicit provider approval and rollback proof.",
      v185: "Data persistence activation only after schema and rollback governance proof.",
      v186: "Live UAT expansion only after pass/fail evidence review.",
    },
    redactedExportBundle: {
      exportId: "online_live_uat_test_matrix_v18_2_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "test matrix",
        "evidence capture",
        "route coverage",
        "protected endpoint coverage",
        "bug triage",
        "pass fail criteria",
        "rollback decision",
        "findings",
        "safety summary",
      ],
    },
    safetySummary: [
      "Online live UAT test matrix is dry-run only.",
      "No provider call, AI persistence, memory persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Live UAT may use real browser sessions and live routes, but no irreversible action is enabled.",
      "Human review remains mandatory.",
      "V18.2 makes live testing traceable without expanding activation scope.",
    ],
  };
}

export const aiOnlineLiveUatTestMatrixVersion = "V18.2";
