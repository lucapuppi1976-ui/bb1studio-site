export type UatSessionMode = "dry-run" | "uat-feedback-evidence-session";
export type UatSessionSeverity = "info" | "watch" | "elevated" | "critical";
export type UatSessionPriority = "low" | "medium" | "high" | "urgent";
export type UatSessionStatus = "blocked" | "feedback-design-ready" | "session-review-ready" | "uat-feedback-ready";
export type UatSessionLane = "session_feedback" | "bug_triage" | "evidence_capture" | "pass_fail_review" | "reviewer_decision" | "rollback_gate" | "dry_run_scope" | "human_signoff";

export interface UatSessionInput {
  sessionDraftCount?: number;
  feedbackDraftCount?: number;
  evidenceDraftCount?: number;
  openCriticalBugCount?: number;
  openMajorBugCount?: number;
  openMinorBugCount?: number;
  passFailScore?: number;
  reviewerDecisionScore?: number;
  evidenceCompletenessScore?: number;
  rollbackGateScore?: number;
  unresolvedScopeFindingCount?: number;
  reviewerRole?: string;
}

export interface UatSessionBoardItem {
  id: string;
  label: string;
  lane: UatSessionLane;
  score: number;
  priority: UatSessionPriority;
  severity: UatSessionSeverity;
  question: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface UatSessionFindingItem {
  id: string;
  label: string;
  lane: UatSessionLane;
  severity: UatSessionSeverity;
  reason: string;
  manualResolution: string;
  blocksUatProgression: boolean;
}

export const UAT_FEEDBACK_BUG_EVIDENCE_GUARDRAIL = {
  uatFeedbackBugEvidenceSessionReady: true,
  sessionFeedbackBoardReady: true,
  bugTriageBoardReady: true,
  evidenceCaptureBoardReady: true,
  passFailReviewBoardReady: true,
  reviewerDecisionBoardReady: true,
  rollbackGateReady: true,
  liveUatReady: true,
  onlineControlledGo: true,
  controlledDryRunProductionReady: true,
  feedbackWriteAllowed: false,
  feedbackWritePerformed: false,
  feedbackPersistenceAllowed: false,
  feedbackPersistencePerformed: false,
  bugWriteAllowed: false,
  bugWritePerformed: false,
  bugPersistenceAllowed: false,
  bugPersistencePerformed: false,
  evidenceWriteAllowed: false,
  evidenceWritePerformed: false,
  evidencePersistenceAllowed: false,
  evidencePersistencePerformed: false,
  sessionWriteAllowed: false,
  sessionWritePerformed: false,
  sessionPersistenceAllowed: false,
  sessionPersistencePerformed: false,
  publicSignupAllowed: false,
  accountWriteAllowed: false,
  testerInviteSendAllowed: false,
  testerInvitePersistenceAllowed: false,
  providerAiReady: false,
  providerCalled: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  providerRequestDispatchAllowed: false,
  providerResponseIntakeAllowed: false,
  providerResultPersistenceAllowed: false,
  persistenceReady: false,
  memoryPersistenceReady: false,
  persistencePerformed: false,
  memoryPersistencePerformed: false,
  dbPersistenceAllowed: false,
  memoryPersistenceAllowed: false,
  taskCreated: false,
  interventionCreated: false,
  automaticExecutionPerformed: false,
  automaticTaskCreationAllowed: false,
  automaticInterventionCreationAllowed: false,
  automaticExecutionAllowed: false,
  publicShareAllowed: false,
  publicSharePerformed: false,
  productPrescriptionAllowed: false,
  productPrescriptionPerformed: false,
  dosageAdviceAllowed: false,
  dosageAdvicePerformed: false,
  incidentRecordPersistenceAllowed: false,
  incidentRecordWriteAllowed: false,
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

export interface UatSessionReport {
  generatedAt: string;
  mode: UatSessionMode;
  context: Required<UatSessionInput>;
  readiness: typeof UAT_FEEDBACK_BUG_EVIDENCE_GUARDRAIL;
  sessionReadinessScore: number;
  sessionReadinessStatus: UatSessionStatus;
  overallSeverity: UatSessionSeverity;
  sessionFeedbackBoard: UatSessionBoardItem[];
  bugTriageBoard: UatSessionBoardItem[];
  evidenceCaptureBoard: UatSessionBoardItem[];
  passFailReviewBoard: UatSessionBoardItem[];
  reviewerDecisionBoard: UatSessionBoardItem[];
  rollbackGateBoard: UatSessionBoardItem[];
  dryRunScopeBoard: UatSessionBoardItem[];
  findings: UatSessionFindingItem[];
  stagedRoadmap: Record<"v188" | "v189" | "v190" | "v191" | "v192", string>;
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

function normalizeInput(input: UatSessionInput): Required<UatSessionInput> {
  return {
    sessionDraftCount: input.sessionDraftCount ?? 4,
    feedbackDraftCount: input.feedbackDraftCount ?? 10,
    evidenceDraftCount: input.evidenceDraftCount ?? 8,
    openCriticalBugCount: input.openCriticalBugCount ?? 0,
    openMajorBugCount: input.openMajorBugCount ?? 1,
    openMinorBugCount: input.openMinorBugCount ?? 3,
    passFailScore: input.passFailScore ?? 82,
    reviewerDecisionScore: input.reviewerDecisionScore ?? 84,
    evidenceCompletenessScore: input.evidenceCompletenessScore ?? 80,
    rollbackGateScore: input.rollbackGateScore ?? 86,
    unresolvedScopeFindingCount: input.unresolvedScopeFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "UAT session reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): UatSessionSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): UatSessionPriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: UatSessionLane,
  score: number,
  question: string,
  expectedEvidence: string[],
  safeOutcome: string,
): UatSessionBoardItem {
  const normalized = clampScore(score);

  return {
    id,
    label,
    lane,
    score: normalized,
    priority: priorityFromScore(normalized),
    severity: severityFromConcern(100 - normalized),
    question,
    expectedEvidence,
    safeOutcome,
  };
}

export function buildAiUatFeedbackBugEvidenceSessionReport(input: UatSessionInput = {}): UatSessionReport {
  const context = normalizeInput(input);

  const sessionFeedbackBoard = [
    boardItem("UAT_SESSION_001", "Session feedback draft board", "session_feedback", context.feedbackDraftCount > 0 ? 88 : 60, "Can tester feedback be structured without persistence?", ["feedback draft", "reviewer label", "redacted output"], "Feedback remains draft-only and locally reviewed."),
    boardItem("UAT_SESSION_002", "Session note clarity", "session_feedback", 84, "Can testers describe issues in a simple way?", ["short note", "role label", "page context"], "Tester notes are easy to review."),
  ];

  const bugTriageBoard = [
    boardItem("UAT_BUG_001", "Critical bug triage", "bug_triage", context.openCriticalBugCount === 0 ? 100 : 40, "Are critical bugs blocking progression?", ["critical count", "manual owner", "next review"], "Critical bugs block broader UAT."),
    boardItem("UAT_BUG_002", "Major and minor bug triage", "bug_triage", context.openMajorBugCount === 0 ? 88 : 72, "Are non-critical bugs visible and triaged?", ["major count", "minor count", "manual owner"], "Non-critical bugs are tracked before expansion."),
  ];

  const evidenceCaptureBoard = [
    boardItem("UAT_EVIDENCE_001", "Evidence completeness", "evidence_capture", context.evidenceCompletenessScore, "Can session evidence be reviewed without storing real artifacts?", ["route name", "screen context", "redacted note"], "Evidence remains draft-only and redacted."),
    boardItem("UAT_EVIDENCE_002", "Evidence no-write boundary", "evidence_capture", 100, "Can evidence capture remain no-write?", ["evidenceWriteAllowed=false", "evidencePersistencePerformed=false"], "No evidence artifact is persisted."),
  ];

  const passFailReviewBoard = [
    boardItem("UAT_PASSFAIL_001", "Pass fail review criteria", "pass_fail_review", context.passFailScore, "Can a reviewer decide pass, review or block?", ["pass criterion", "review criterion", "block criterion"], "Pass fail review remains human-reviewed."),
    boardItem("UAT_PASSFAIL_002", "No activation pass criterion", "pass_fail_review", 100, "Does passing UAT avoid any activation?", ["providerCalled=false", "persistencePerformed=false", "operationalExecutionAllowed=false"], "Pass does not activate AI, writes or execution."),
  ];

  const reviewerDecisionBoard = [
    boardItem("UAT_REVIEW_001", "Reviewer decision board", "reviewer_decision", context.reviewerDecisionScore, "Can reviewers summarize session outcome?", ["session outcome", "manual decision", "next step"], "Reviewer decisions remain dry-run and non-binding."),
  ];

  const rollbackGateBoard = [
    boardItem("UAT_ROLLBACK_001", "Rollback gate", "rollback_gate", context.rollbackGateScore, "Can UAT stop or roll back if feedback reveals risk?", ["rollback note", "live tag", "manual owner"], "Rollback remains available as a decision, not an automatic action."),
  ];

  const dryRunScopeBoard = [
    boardItem("UAT_SCOPE_001", "Dry-run UAT scope", "dry_run_scope", 100, "Are all UAT actions inside no-write scope?", ["no provider", "no account write", "no execution", "no persistence"], "UAT sessions stay within controlled dry-run scope."),
  ];

  const findings: UatSessionFindingItem[] = [];

  if (context.openCriticalBugCount > 0) {
    findings.push({
      id: "UAT_SESSION_FINDING_001",
      label: "Open critical UAT bug",
      lane: "bug_triage",
      severity: "critical",
      reason: String(context.openCriticalBugCount) + " critical UAT bugs remain open.",
      manualResolution: "Resolve critical bugs before expanding tester sessions.",
      blocksUatProgression: true,
    });
  }

  if (context.unresolvedScopeFindingCount > 0) {
    findings.push({
      id: "UAT_SESSION_FINDING_002",
      label: "Unresolved dry-run scope finding",
      lane: "dry_run_scope",
      severity: "critical",
      reason: String(context.unresolvedScopeFindingCount) + " dry-run scope findings remain open.",
      manualResolution: "Keep feedback, evidence, bug, account, provider and execution writes blocked.",
      blocksUatProgression: true,
    });
  }

  if (context.openMajorBugCount > 0) {
    findings.push({
      id: "UAT_SESSION_FINDING_003",
      label: "Open major UAT bug",
      lane: "bug_triage",
      severity: "watch",
      reason: String(context.openMajorBugCount) + " major UAT bugs remain open.",
      manualResolution: "Track and assign owner before broad tester rollout.",
      blocksUatProgression: false,
    });
  }

  const sessionReadinessScore = clampScore(
    (context.passFailScore + context.reviewerDecisionScore + context.evidenceCompletenessScore + context.rollbackGateScore) /
      4 -
      findings.filter((item) => item.blocksUatProgression).length * 20,
  );

  const sessionReadinessStatus: UatSessionStatus =
    findings.some((item) => item.blocksUatProgression)
      ? "blocked"
      : sessionReadinessScore >= 88
        ? "uat-feedback-ready"
        : sessionReadinessScore >= 80
          ? "session-review-ready"
          : "feedback-design-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: UAT_FEEDBACK_BUG_EVIDENCE_GUARDRAIL,
    sessionReadinessScore,
    sessionReadinessStatus,
    overallSeverity: severityFromConcern(
      context.openCriticalBugCount * 40 +
        context.openMajorBugCount * 20 +
        context.openMinorBugCount * 5 +
        context.unresolvedScopeFindingCount * 45,
    ),
    sessionFeedbackBoard,
    bugTriageBoard,
    evidenceCaptureBoard,
    passFailReviewBoard,
    reviewerDecisionBoard,
    rollbackGateBoard,
    dryRunScopeBoard,
    findings,
    stagedRoadmap: {
      v188: "UAT feedback, bug triage and evidence session board.",
      v189: "Live UAT launch gate and tester readiness audit.",
      v190: "Invite-only tester account activation after access governance approval.",
      v191: "External UAT expansion after translation and UX signoff.",
      v192: "First controlled write path only after explicit persistence approval.",
    },
    redactedExportBundle: {
      exportId: "uat_feedback_bug_evidence_session_v18_8_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: ["context", "session feedback", "bug triage", "evidence capture", "pass fail review", "reviewer decision", "rollback gate", "dry-run scope", "findings", "safety summary"],
    },
    safetySummary: [
      "UAT feedback, bug triage and evidence session board is dry-run only.",
      "No feedback, bug, evidence or session record is persisted.",
      "No public signup, account write, invite send, provider call, AI persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V18.8 makes UAT sessions reviewable without expanding activation scope.",
    ],
  };
}

export const aiUatFeedbackBugEvidenceSessionVersion = "V18.8";
