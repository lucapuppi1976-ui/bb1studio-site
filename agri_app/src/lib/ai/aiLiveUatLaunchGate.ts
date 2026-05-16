export type LiveUatLaunchMode = "dry-run" | "live-uat-launch-readiness";
export type LiveUatLaunchSeverity = "info" | "watch" | "elevated" | "critical";
export type LiveUatLaunchPriority = "low" | "medium" | "high" | "urgent";
export type LiveUatLaunchStatus = "blocked" | "launch-design-ready" | "launch-review-ready" | "controlled-live-uat-launch-ready";
export type LiveUatLaunchLane = "tester_readiness" | "access_gate" | "multilingual_gate" | "ux_gate" | "feedback_board_gate" | "protected_route_gate" | "launch_checklist" | "rollback_gate" | "human_signoff";

export interface LiveUatLaunchInput {
  requiredTesterCount?: number;
  readyTesterCount?: number;
  accessReadinessScore?: number;
  multilingualReadinessScore?: number;
  uxReadinessScore?: number;
  feedbackBoardScore?: number;
  protectedRouteScore?: number;
  launchChecklistScore?: number;
  rollbackReadinessScore?: number;
  openCriticalIssueCount?: number;
  openMajorIssueCount?: number;
  unresolvedLaunchFindingCount?: number;
  reviewerRole?: string;
}

export interface LiveUatLaunchBoardItem {
  id: string;
  label: string;
  lane: LiveUatLaunchLane;
  score: number;
  priority: LiveUatLaunchPriority;
  severity: LiveUatLaunchSeverity;
  question: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface LiveUatLaunchFindingItem {
  id: string;
  label: string;
  lane: LiveUatLaunchLane;
  severity: LiveUatLaunchSeverity;
  reason: string;
  manualResolution: string;
  blocksLiveUatLaunch: boolean;
}

export const LIVE_UAT_LAUNCH_GATE_GUARDRAIL = {
  liveUatLaunchGateReady: true,
  testerReadinessAuditReady: true,
  accessReadinessGateReady: true,
  multilingualReadinessGateReady: true,
  uxReadinessGateReady: true,
  feedbackBoardGateReady: true,
  protectedRouteGateReady: true,
  launchChecklistReady: true,
  rollbackGateReady: true,
  liveUatReady: true,
  onlineControlledGo: true,
  controlledDryRunProductionReady: true,
  publicSignupAllowed: false,
  accountWriteAllowed: false,
  accountWritePerformed: false,
  testerInviteSendAllowed: false,
  testerInviteSendPerformed: false,
  testerInvitePersistenceAllowed: false,
  testerInvitePersistencePerformed: false,
  testerRoleWriteAllowed: false,
  testerRoleWritePerformed: false,
  testerLanguageWriteAllowed: false,
  testerLanguageWritePerformed: false,
  feedbackWriteAllowed: false,
  feedbackWritePerformed: false,
  feedbackPersistenceAllowed: false,
  feedbackPersistencePerformed: false,
  bugWriteAllowed: false,
  bugWritePerformed: false,
  evidenceWriteAllowed: false,
  evidenceWritePerformed: false,
  sessionWriteAllowed: false,
  sessionWritePerformed: false,
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

export interface LiveUatLaunchReport {
  generatedAt: string;
  mode: LiveUatLaunchMode;
  context: Required<LiveUatLaunchInput>;
  readiness: typeof LIVE_UAT_LAUNCH_GATE_GUARDRAIL;
  launchReadinessScore: number;
  launchReadinessStatus: LiveUatLaunchStatus;
  overallSeverity: LiveUatLaunchSeverity;
  testerReadinessBoard: LiveUatLaunchBoardItem[];
  accessGateBoard: LiveUatLaunchBoardItem[];
  multilingualGateBoard: LiveUatLaunchBoardItem[];
  uxGateBoard: LiveUatLaunchBoardItem[];
  feedbackBoardGate: LiveUatLaunchBoardItem[];
  protectedRouteGateBoard: LiveUatLaunchBoardItem[];
  launchChecklistBoard: LiveUatLaunchBoardItem[];
  rollbackGateBoard: LiveUatLaunchBoardItem[];
  noGoBoard: LiveUatLaunchBoardItem[];
  findings: LiveUatLaunchFindingItem[];
  stagedRoadmap: Record<"v189" | "v190" | "v191" | "v192" | "v193", string>;
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

function normalizeInput(input: LiveUatLaunchInput): Required<LiveUatLaunchInput> {
  return {
    requiredTesterCount: input.requiredTesterCount ?? 3,
    readyTesterCount: input.readyTesterCount ?? 0,
    accessReadinessScore: input.accessReadinessScore ?? 84,
    multilingualReadinessScore: input.multilingualReadinessScore ?? 88,
    uxReadinessScore: input.uxReadinessScore ?? 84,
    feedbackBoardScore: input.feedbackBoardScore ?? 82,
    protectedRouteScore: input.protectedRouteScore ?? 90,
    launchChecklistScore: input.launchChecklistScore ?? 80,
    rollbackReadinessScore: input.rollbackReadinessScore ?? 86,
    openCriticalIssueCount: input.openCriticalIssueCount ?? 0,
    openMajorIssueCount: input.openMajorIssueCount ?? 1,
    unresolvedLaunchFindingCount: input.unresolvedLaunchFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "Live UAT launch reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): LiveUatLaunchSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): LiveUatLaunchPriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: LiveUatLaunchLane,
  score: number,
  question: string,
  expectedEvidence: string[],
  safeOutcome: string,
): LiveUatLaunchBoardItem {
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

export function buildAiLiveUatLaunchGateReport(input: LiveUatLaunchInput = {}): LiveUatLaunchReport {
  const context = normalizeInput(input);
  const testerRatio = context.requiredTesterCount > 0 ? context.readyTesterCount / context.requiredTesterCount : 0;
  const testerReadinessScore = clampScore(testerRatio * 100);

  const testerReadinessBoard = [
    boardItem("LUAT_TESTER_001", "Tester readiness audit", "tester_readiness", testerReadinessScore, "Are enough testers ready for controlled live UAT?", ["ready tester count", "required tester count", "role review"], "Tester readiness is visible before launch."),
    boardItem("LUAT_TESTER_002", "Reviewer availability", "tester_readiness", 84, "Is at least one reviewer available for UAT sessions?", ["reviewer role", "manual review required"], "UAT remains supervised by a reviewer."),
  ];

  const accessGateBoard = [
    boardItem("LUAT_ACCESS_001", "Invite-only access gate", "access_gate", context.accessReadinessScore, "Can tester access remain invite-only?", ["publicSignupAllowed=false", "testerInviteSendAllowed=false"], "Access remains controlled and not public."),
    boardItem("LUAT_ACCESS_002", "No account write launch rule", "access_gate", 100, "Can launch readiness avoid account writes?", ["accountWriteAllowed=false", "testerRoleWriteAllowed=false"], "No tester account write is performed."),
  ];

  const multilingualGateBoard = [
    boardItem("LUAT_I18N_001", "Multilingual readiness gate", "multilingual_gate", context.multilingualReadinessScore, "Are tester languages ready for launch review?", ["it", "en", "es", "fr", "de", "pt"], "Multilingual readiness is visible before external UAT."),
  ];

  const uxGateBoard = [
    boardItem("LUAT_UX_001", "UX readiness gate", "ux_gate", context.uxReadinessScore, "Are entry, navigation and dry-run messages clear enough?", ["entry clarity", "navigation", "dry-run clarity"], "UX is ready for controlled tester sessions."),
  ];

  const feedbackBoardGate = [
    boardItem("LUAT_FEEDBACK_001", "Feedback and evidence board gate", "feedback_board_gate", context.feedbackBoardScore, "Can feedback and evidence be reviewed without writes?", ["feedbackWriteAllowed=false", "evidenceWriteAllowed=false"], "Feedback and evidence remain draft-only."),
  ];

  const protectedRouteGateBoard = [
    boardItem("LUAT_ROUTE_001", "Protected route gate", "protected_route_gate", context.protectedRouteScore, "Do protected routes remain protected during launch?", ["ops route protected", "admin route protected"], "Protected routes remain controlled."),
  ];

  const launchChecklistBoard = [
    boardItem("LUAT_CHECKLIST_001", "Live UAT launch checklist", "launch_checklist", context.launchChecklistScore, "Can launch be reviewed with a clear manual checklist?", ["health ready", "protected checks", "rollback note"], "Launch decision stays human-reviewed."),
    boardItem("LUAT_CHECKLIST_002", "No activation launch rule", "launch_checklist", 100, "Does launch avoid any activation of AI, writes or execution?", ["providerCalled=false", "persistencePerformed=false", "operationalExecutionAllowed=false"], "Launch gate does not activate runtime capabilities."),
  ];

  const rollbackGateBoard = [
    boardItem("LUAT_ROLLBACK_001", "Rollback gate", "rollback_gate", context.rollbackReadinessScore, "Can UAT be stopped or rolled back if risk appears?", ["live tag", "rollback branch", "manual owner"], "Rollback remains available as a manual decision."),
  ];

  const noGoBoard = [
    boardItem("LUAT_NOGO_001", "Real account creation", "launch_checklist", 0, "Can real tester accounts be created in V18.9?", ["separate gate required"], "No-go: account creation remains blocked."),
    boardItem("LUAT_NOGO_002", "Real feedback persistence", "feedback_board_gate", 0, "Can feedback or evidence be persisted in V18.9?", ["separate gate required"], "No-go: feedback and evidence persistence remains blocked."),
    boardItem("LUAT_NOGO_003", "AI live activation", "launch_checklist", 0, "Can AI live or provider call run in V18.9?", ["separate gate required"], "No-go: AI live remains blocked."),
  ];

  const findings: LiveUatLaunchFindingItem[] = [];

  if (context.openCriticalIssueCount > 0) {
    findings.push({
      id: "LUAT_FINDING_001",
      label: "Open critical launch issue",
      lane: "launch_checklist",
      severity: "critical",
      reason: String(context.openCriticalIssueCount) + " critical launch issues remain open.",
      manualResolution: "Resolve critical launch issues before starting tester sessions.",
      blocksLiveUatLaunch: true,
    });
  }

  if (context.unresolvedLaunchFindingCount > 0) {
    findings.push({
      id: "LUAT_FINDING_002",
      label: "Unresolved launch finding",
      lane: "launch_checklist",
      severity: "critical",
      reason: String(context.unresolvedLaunchFindingCount) + " launch findings remain unresolved.",
      manualResolution: "Close launch findings before moving to tester invite activation.",
      blocksLiveUatLaunch: true,
    });
  }

  if (context.readyTesterCount < context.requiredTesterCount) {
    findings.push({
      id: "LUAT_FINDING_003",
      label: "Tester readiness incomplete",
      lane: "tester_readiness",
      severity: "watch",
      reason: "Ready tester count is below required tester count.",
      manualResolution: "Complete tester readiness before external UAT expansion.",
      blocksLiveUatLaunch: false,
    });
  }

  if (context.openMajorIssueCount > 0) {
    findings.push({
      id: "LUAT_FINDING_004",
      label: "Open major launch issue",
      lane: "ux_gate",
      severity: "watch",
      reason: String(context.openMajorIssueCount) + " major launch issues remain open.",
      manualResolution: "Track major issues before broad tester rollout.",
      blocksLiveUatLaunch: false,
    });
  }

  const launchReadinessScore = clampScore(
    (testerReadinessScore +
      context.accessReadinessScore +
      context.multilingualReadinessScore +
      context.uxReadinessScore +
      context.feedbackBoardScore +
      context.protectedRouteScore +
      context.launchChecklistScore +
      context.rollbackReadinessScore) /
      8 -
      findings.filter((item) => item.blocksLiveUatLaunch).length * 20,
  );

  const launchReadinessStatus: LiveUatLaunchStatus =
    findings.some((item) => item.blocksLiveUatLaunch)
      ? "blocked"
      : launchReadinessScore >= 88
        ? "controlled-live-uat-launch-ready"
        : launchReadinessScore >= 80
          ? "launch-review-ready"
          : "launch-design-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: LIVE_UAT_LAUNCH_GATE_GUARDRAIL,
    launchReadinessScore,
    launchReadinessStatus,
    overallSeverity: severityFromConcern(
      context.openCriticalIssueCount * 40 +
        context.openMajorIssueCount * 20 +
        context.unresolvedLaunchFindingCount * 45 +
        Math.max(0, context.requiredTesterCount - context.readyTesterCount) * 10,
    ),
    testerReadinessBoard,
    accessGateBoard,
    multilingualGateBoard,
    uxGateBoard,
    feedbackBoardGate,
    protectedRouteGateBoard,
    launchChecklistBoard,
    rollbackGateBoard,
    noGoBoard,
    findings,
    stagedRoadmap: {
      v189: "Live UAT launch gate and tester readiness audit.",
      v190: "Invite-only tester account activation after access governance approval.",
      v191: "External UAT expansion after translation and UX signoff.",
      v192: "First controlled write path only after explicit persistence approval.",
      v193: "Provider runtime activation only after provider approval and rollback proof.",
    },
    redactedExportBundle: {
      exportId: "live_uat_launch_gate_v18_9_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: ["context", "tester readiness", "access gate", "multilingual gate", "UX gate", "feedback board gate", "protected route gate", "launch checklist", "rollback gate", "no-go board", "findings", "safety summary"],
    },
    safetySummary: [
      "Live UAT launch gate is dry-run only.",
      "No tester invite, account write, feedback persistence, bug persistence, evidence persistence or session persistence is performed.",
      "No provider call, AI persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V18.9 prepares launch readiness without expanding activation scope.",
    ],
  };
}

export const aiLiveUatLaunchGateVersion = "V18.9";
