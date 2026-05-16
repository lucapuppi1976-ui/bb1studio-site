export type UxHardeningMode = "dry-run" | "ux-navigation-hardening";
export type UxHardeningSeverity = "info" | "watch" | "elevated" | "critical";
export type UxHardeningPriority = "low" | "medium" | "high" | "urgent";
export type UxHardeningStatus =
  | "blocked"
  | "ux-design-ready"
  | "journey-review-ready"
  | "tester-friendly-ready";

export type UxHardeningLane =
  | "entry_experience"
  | "navigation_polish"
  | "user_journey"
  | "admin_readability"
  | "mobile_readiness"
  | "state_messages"
  | "dry_run_clarity"
  | "human_signoff";

export interface UxHardeningInput {
  entryClarityScore?: number;
  navigationScore?: number;
  journeyScore?: number;
  adminReadabilityScore?: number;
  mobileReadinessScore?: number;
  stateMessageScore?: number;
  dryRunClarityScore?: number;
  openCriticalUxIssueCount?: number;
  openMajorUxIssueCount?: number;
  unresolvedJourneyFindingCount?: number;
  reviewerRole?: string;
}

export interface UxHardeningBoardItem {
  id: string;
  label: string;
  lane: UxHardeningLane;
  score: number;
  priority: UxHardeningPriority;
  severity: UxHardeningSeverity;
  question: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface UxHardeningFindingItem {
  id: string;
  label: string;
  lane: UxHardeningLane;
  severity: UxHardeningSeverity;
  reason: string;
  manualResolution: string;
  blocksUxReadiness: boolean;
}

export const UX_NAVIGATION_HARDENING_GUARDRAIL = {
  uxNavigationHardeningReady: true,
  entryExperienceReady: true,
  navigationPolishReady: true,
  userJourneyHardeningReady: true,
  adminReadabilityReady: true,
  mobileReadinessReady: true,
  stateMessageReadinessReady: true,
  dryRunClarityReady: true,
  liveUatReady: true,
  onlineControlledGo: true,
  controlledDryRunProductionReady: true,
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

export interface UxHardeningReport {
  generatedAt: string;
  mode: UxHardeningMode;
  context: Required<UxHardeningInput>;
  readiness: typeof UX_NAVIGATION_HARDENING_GUARDRAIL;
  uxReadinessScore: number;
  uxReadinessStatus: UxHardeningStatus;
  overallSeverity: UxHardeningSeverity;
  entryExperienceBoard: UxHardeningBoardItem[];
  navigationPolishBoard: UxHardeningBoardItem[];
  userJourneyBoard: UxHardeningBoardItem[];
  adminReadabilityBoard: UxHardeningBoardItem[];
  mobileReadinessBoard: UxHardeningBoardItem[];
  stateMessageBoard: UxHardeningBoardItem[];
  dryRunClarityBoard: UxHardeningBoardItem[];
  findings: UxHardeningFindingItem[];
  stagedRoadmap: Record<"v186" | "v187" | "v188" | "v189" | "v190", string>;
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

function normalizeInput(input: UxHardeningInput): Required<UxHardeningInput> {
  return {
    entryClarityScore: input.entryClarityScore ?? 82,
    navigationScore: input.navigationScore ?? 84,
    journeyScore: input.journeyScore ?? 80,
    adminReadabilityScore: input.adminReadabilityScore ?? 82,
    mobileReadinessScore: input.mobileReadinessScore ?? 78,
    stateMessageScore: input.stateMessageScore ?? 86,
    dryRunClarityScore: input.dryRunClarityScore ?? 92,
    openCriticalUxIssueCount: input.openCriticalUxIssueCount ?? 0,
    openMajorUxIssueCount: input.openMajorUxIssueCount ?? 1,
    unresolvedJourneyFindingCount: input.unresolvedJourneyFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "UX readiness reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): UxHardeningSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): UxHardeningPriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: UxHardeningLane,
  score: number,
  question: string,
  expectedEvidence: string[],
  safeOutcome: string,
): UxHardeningBoardItem {
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

export function buildAiUxNavigationHardeningReport(input: UxHardeningInput = {}): UxHardeningReport {
  const context = normalizeInput(input);

  const entryExperienceBoard = [
    boardItem(
      "UX_ENTRY_001",
      "Clear live testing entry",
      "entry_experience",
      context.entryClarityScore,
      "Can testers understand where to start?",
      ["clear title", "primary action", "testing mode label"],
      "Tester entry is clear and action-oriented.",
    ),
    boardItem(
      "UX_ENTRY_002",
      "Role-aware intro",
      "entry_experience",
      context.entryClarityScore,
      "Can operators and reviewers see their intended path?",
      ["role label", "reviewer path", "operator path"],
      "Users see the right journey for their role.",
    ),
  ];

  const navigationPolishBoard = [
    boardItem(
      "UX_NAV_001",
      "Simplified navigation",
      "navigation_polish",
      context.navigationScore,
      "Can testers reach core areas without technical noise?",
      ["main path", "admin path", "UAT path"],
      "Navigation prioritizes tester actions.",
    ),
    boardItem(
      "UX_NAV_002",
      "Reduced panel overload",
      "navigation_polish",
      context.navigationScore,
      "Can technical panels be grouped by purpose?",
      ["group labels", "progressive disclosure"],
      "Dense technical content is easier to scan.",
    ),
  ];

  const userJourneyBoard = [
    boardItem(
      "UX_JOURNEY_001",
      "Tester journey map",
      "user_journey",
      context.journeyScore,
      "Can a tester complete a session from entry to feedback?",
      ["start", "dry-run flow", "evidence note", "feedback"],
      "Tester journey is traceable end-to-end.",
    ),
    boardItem(
      "UX_JOURNEY_002",
      "Reviewer journey map",
      "user_journey",
      context.journeyScore,
      "Can a reviewer validate evidence and blockers?",
      ["evidence board", "review note", "pass fail status"],
      "Reviewer journey is readable and controlled.",
    ),
  ];

  const adminReadabilityBoard = [
    boardItem(
      "UX_ADMIN_001",
      "Admin status summary",
      "admin_readability",
      context.adminReadabilityScore,
      "Can admin users see system state quickly?",
      ["online state", "dry-run state", "blocked activations"],
      "Admin view communicates state without ambiguity.",
    ),
    boardItem(
      "UX_ADMIN_002",
      "Operational locks visibility",
      "admin_readability",
      context.adminReadabilityScore,
      "Can admins verify locked actions fast?",
      ["provider locked", "write locked", "execution locked"],
      "Admin view makes no-go status visible.",
    ),
  ];

  const mobileReadinessBoard = [
    boardItem(
      "UX_MOBILE_001",
      "Mobile layout readiness",
      "mobile_readiness",
      context.mobileReadinessScore,
      "Can testers use core screens on mobile?",
      ["single-column cards", "readable buttons", "no clipped actions"],
      "Mobile flow is ready for UAT review.",
    ),
    boardItem(
      "UX_MOBILE_002",
      "Touch target readiness",
      "mobile_readiness",
      context.mobileReadinessScore,
      "Are primary actions easy to tap?",
      ["button size", "spacing", "safe scroll"],
      "Core actions are accessible on touch devices.",
    ),
  ];

  const stateMessageBoard = [
    boardItem(
      "UX_STATE_001",
      "Empty state clarity",
      "state_messages",
      context.stateMessageScore,
      "Do empty states explain what to do next?",
      ["empty message", "next step", "help text"],
      "Users are guided when no data exists.",
    ),
    boardItem(
      "UX_STATE_002",
      "Error and loading clarity",
      "state_messages",
      context.stateMessageScore,
      "Do loading and error states reduce confusion?",
      ["loading message", "retry message", "support note"],
      "Users understand transient states.",
    ),
  ];

  const dryRunClarityBoard = [
    boardItem(
      "UX_DRYRUN_001",
      "Dry-run badge clarity",
      "dry_run_clarity",
      context.dryRunClarityScore,
      "Is it obvious that no real action is executed?",
      ["dry-run badge", "no write label", "human review label"],
      "Users understand that actions are simulated.",
    ),
    boardItem(
      "UX_DRYRUN_002",
      "No-go action copy",
      "dry_run_clarity",
      100,
      "Are blocked actions clearly explained?",
      ["AI live no", "execution no", "write no"],
      "Blocked actions are visible and not confusing.",
    ),
  ];

  const findings: UxHardeningFindingItem[] = [];

  if (context.openCriticalUxIssueCount > 0) {
    findings.push({
      id: "UX_FINDING_001",
      label: "Open critical UX issue",
      lane: "user_journey",
      severity: "critical",
      reason: String(context.openCriticalUxIssueCount) + " critical UX issues remain open.",
      manualResolution: "Resolve critical UX issues before tester expansion.",
      blocksUxReadiness: true,
    });
  }

  if (context.unresolvedJourneyFindingCount > 0) {
    findings.push({
      id: "UX_FINDING_002",
      label: "Unresolved journey finding",
      lane: "user_journey",
      severity: "critical",
      reason: String(context.unresolvedJourneyFindingCount) + " journey findings remain open.",
      manualResolution: "Clarify tester and reviewer paths before external UAT.",
      blocksUxReadiness: true,
    });
  }

  if (context.openMajorUxIssueCount > 0) {
    findings.push({
      id: "UX_FINDING_003",
      label: "Open major UX issue",
      lane: "navigation_polish",
      severity: "watch",
      reason: String(context.openMajorUxIssueCount) + " major UX issues remain open.",
      manualResolution: "Track major UX issues before broader testing.",
      blocksUxReadiness: false,
    });
  }

  const uxReadinessScore = clampScore(
    (context.entryClarityScore +
      context.navigationScore +
      context.journeyScore +
      context.adminReadabilityScore +
      context.mobileReadinessScore +
      context.stateMessageScore +
      context.dryRunClarityScore) /
      7 -
      findings.filter((item) => item.blocksUxReadiness).length * 15,
  );

  const uxReadinessStatus: UxHardeningStatus =
    findings.some((item) => item.blocksUxReadiness)
      ? "blocked"
      : uxReadinessScore >= 88
        ? "tester-friendly-ready"
        : uxReadinessScore >= 80
          ? "journey-review-ready"
          : "ux-design-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: UX_NAVIGATION_HARDENING_GUARDRAIL,
    uxReadinessScore,
    uxReadinessStatus,
    overallSeverity: severityFromConcern(
      context.openCriticalUxIssueCount * 40 +
        context.openMajorUxIssueCount * 20 +
        context.unresolvedJourneyFindingCount * 35,
    ),
    entryExperienceBoard,
    navigationPolishBoard,
    userJourneyBoard,
    adminReadabilityBoard,
    mobileReadinessBoard,
    stateMessageBoard,
    dryRunClarityBoard,
    findings,
    stagedRoadmap: {
      v186: "UX simplification, navigation polish and user journey hardening.",
      v187: "Multilingual UX completion and translation coverage gate.",
      v188: "UAT feedback, bug triage and evidence session board.",
      v189: "Live UAT launch gate and tester readiness audit.",
      v190: "Invite-only tester account activation after access governance approval.",
    },
    redactedExportBundle: {
      exportId: "ux_navigation_hardening_v18_6_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "entry experience",
        "navigation polish",
        "user journey",
        "admin readability",
        "mobile readiness",
        "state messages",
        "dry-run clarity",
        "findings",
        "safety summary",
      ],
    },
    safetySummary: [
      "UX navigation hardening is dry-run only.",
      "No public signup, account write, invite send, provider call, AI persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V18.6 improves usability without expanding activation scope.",
    ],
  };
}

export const aiUxNavigationHardeningVersion = "V18.6";
