export type AgronomicBoardPackMode = "dry-run" | "executive-review";

export type BoardPackUrgency = "low" | "medium" | "high" | "urgent";

export type BoardPackRiskTier = "low" | "watch" | "elevated" | "critical";

export type BoardPackDecisionStatus = "blocked" | "simulation-only" | "review-ready" | "board-ready";

export type BoardPackRoiSensitivity = "conservative" | "balanced" | "opportunity-focused";

export interface AgronomicBoardPackReadiness {
  providerAiReady: false;
  persistenceReady: false;
  memoryPersistenceReady: false;
  automaticTaskCreationReady: false;
  automaticInterventionCreationReady: false;
  automaticExecutionReady: false;
  providerCalled: false;
  persistencePerformed: false;
  memoryPersistencePerformed: false;
  taskCreated: false;
  interventionCreated: false;
  automaticExecutionPerformed: false;
  publicSharePerformed: false;
  productPrescriptionPerformed: false;
  dosageAdvicePerformed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
  automaticExecutionAllowed: false;
  dbPersistenceAllowed: false;
  memoryPersistenceAllowed: false;
  publicShareAllowed: false;
  productPrescriptionAllowed: false;
  dosageAdviceAllowed: false;
  manualDispatchOnly: true;
  humanReviewRequired: true;
  localAnalysisOnly: true;
  redactedOutputOnly: true;
  localMemoryOnly: true;
  localLearningOnly: true;
  localPromotionOnly: true;
  localQualityOnly: true;
  memoryPromotionAllowed: false;
  memoryQualityWriteAllowed: false;
  memoryPromotionPerformed: false;
  memoryQualityWritePerformed: false;
  boardPackReady: true;
  executiveDecisionCenterReady: true;
  roiProxyReady: true;
  governanceBriefReady: true;
}

export interface AgronomicBoardPackInput {
  cropPortfolio?: string[];
  activeCaseCount?: number;
  highRiskFieldCount?: number;
  unresolvedEvidenceGaps?: number;
  interventionReadinessScore?: number;
  memoryQualityScore?: number;
  knowledgeGovernanceScore?: number;
  autopilotSimulationScore?: number;
  protocolCoverageScore?: number;
  roiSensitivity?: BoardPackRoiSensitivity;
  reviewerRole?: string;
}

export interface BoardPackSignalSource {
  id: string;
  title: string;
  sourceVersion: string;
  signalScore: number;
  confidenceScore: number;
  blockers: string[];
  executiveImplication: string;
}

export interface BoardPackDecisionCard {
  id: string;
  title: string;
  urgency: BoardPackUrgency;
  riskTier: BoardPackRiskTier;
  status: BoardPackDecisionStatus;
  decisionQuestion: string;
  recommendedHumanAction: string;
  evidenceRequired: string[];
  blockedBecause: string[];
  linkedSources: string[];
}

export interface BoardPackRiskRegisterItem {
  id: string;
  riskTier: BoardPackRiskTier;
  riskStatement: string;
  exposureProxy: number;
  mitigationReviewTopic: string;
  hardStop: string;
}

export interface BoardPackRoiProxyLine {
  id: string;
  title: string;
  sensitivity: BoardPackRoiSensitivity;
  upsideProxy: number;
  downsideProxy: number;
  confidenceScore: number;
  interpretation: string;
  prohibitedInterpretation: string;
}

export interface BoardPackGovernanceChecklistItem {
  id: string;
  label: string;
  passed: boolean;
  reason: string;
  requiredReviewer: string;
}

export interface BoardPackSection {
  id: string;
  title: string;
  executiveSummary: string;
  evidenceStatus: "complete" | "partial" | "blocked";
  reviewerQuestion: string;
}

export interface AgronomicBoardPackReport {
  generatedAt: string;
  mode: AgronomicBoardPackMode;
  context: Required<AgronomicBoardPackInput>;
  readiness: AgronomicBoardPackReadiness;
  boardScore: number;
  boardStatus: "blocked" | "review-ready" | "board-ready";
  signalSources: BoardPackSignalSource[];
  decisionCards: BoardPackDecisionCard[];
  riskRegister: BoardPackRiskRegisterItem[];
  roiProxyLines: BoardPackRoiProxyLine[];
  governanceChecklist: BoardPackGovernanceChecklistItem[];
  boardSections: BoardPackSection[];
  redactedExportBundle: {
    exportId: string;
    includesFieldIdentifiers: false;
    includesPrivateNotes: false;
    includesProviderPayloads: false;
    includesOperationalSecrets: false;
    includesFinancialActuals: false;
    sections: string[];
  };
  safetySummary: string[];
}

export const AGRONOMIC_BOARD_PACK_READINESS: AgronomicBoardPackReadiness = {
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
  manualDispatchOnly: true,
  humanReviewRequired: true,
  localAnalysisOnly: true,
  redactedOutputOnly: true,
  localMemoryOnly: true,
  localLearningOnly: true,
  localPromotionOnly: true,
  localQualityOnly: true,
  memoryPromotionAllowed: false,
  memoryQualityWriteAllowed: false,
  memoryPromotionPerformed: false,
  memoryQualityWritePerformed: false,
  boardPackReady: true,
  executiveDecisionCenterReady: true,
  roiProxyReady: true,
  governanceBriefReady: true,
};

const urgencyWeight: Record<BoardPackUrgency, number> = {
  low: 4,
  medium: 8,
  high: 14,
  urgent: 20,
};

const riskWeight: Record<BoardPackRiskTier, number> = {
  low: 4,
  watch: 8,
  elevated: 16,
  critical: 24,
};

function normalizeInput(input: AgronomicBoardPackInput): Required<AgronomicBoardPackInput> {
  return {
    cropPortfolio: input.cropPortfolio ?? ["tomato", "vineyard", "citrus", "olive"],
    activeCaseCount: input.activeCaseCount ?? 7,
    highRiskFieldCount: input.highRiskFieldCount ?? 3,
    unresolvedEvidenceGaps: input.unresolvedEvidenceGaps ?? 4,
    interventionReadinessScore: input.interventionReadinessScore ?? 68,
    memoryQualityScore: input.memoryQualityScore ?? 82,
    knowledgeGovernanceScore: input.knowledgeGovernanceScore ?? 76,
    autopilotSimulationScore: input.autopilotSimulationScore ?? 73,
    protocolCoverageScore: input.protocolCoverageScore ?? 79,
    roiSensitivity: input.roiSensitivity ?? "balanced",
    reviewerRole: input.reviewerRole ?? "executive agronomic reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function inferRiskTier(context: Required<AgronomicBoardPackInput>): BoardPackRiskTier {
  if (context.highRiskFieldCount >= 5 || context.unresolvedEvidenceGaps >= 7) {
    return "critical";
  }

  if (context.highRiskFieldCount >= 3 || context.activeCaseCount >= 7) {
    return "elevated";
  }

  if (context.activeCaseCount >= 4) {
    return "watch";
  }

  return "low";
}

function buildSignalSources(context: Required<AgronomicBoardPackInput>): BoardPackSignalSource[] {
  return [
    {
      id: "ABP-SRC-001",
      title: "Farm risk radar",
      sourceVersion: "V9.2",
      signalScore: clampScore(62 + context.highRiskFieldCount * 8),
      confidenceScore: clampScore(74 - context.unresolvedEvidenceGaps * 3),
      blockers: context.unresolvedEvidenceGaps > 3 ? ["Risk posture depends on unresolved evidence gaps."] : [],
      executiveImplication: "Risk clustering should be reviewed before any operational prioritization.",
    },
    {
      id: "ABP-SRC-002",
      title: "Intervention readiness and execution gate",
      sourceVersion: "V8.8 + V7.8",
      signalScore: clampScore(context.interventionReadinessScore),
      confidenceScore: clampScore(context.interventionReadinessScore - context.unresolvedEvidenceGaps * 2),
      blockers:
        context.interventionReadinessScore < 72
          ? ["Intervention readiness below executive review threshold."]
          : ["Execution remains locked even when readiness improves."],
      executiveImplication: "Operational action topics must remain manual and gated.",
    },
    {
      id: "ABP-SRC-003",
      title: "Memory quality guard",
      sourceVersion: "V9.9",
      signalScore: clampScore(context.memoryQualityScore),
      confidenceScore: clampScore(context.memoryQualityScore - 4),
      blockers: context.memoryQualityScore < 78 ? ["Memory quality should be reviewed before board-level reuse."] : [],
      executiveImplication: "Memory context can support the board only as advisory evidence.",
    },
    {
      id: "ABP-SRC-004",
      title: "Knowledge vault governance",
      sourceVersion: "V10.0",
      signalScore: clampScore(context.knowledgeGovernanceScore),
      confidenceScore: clampScore(context.knowledgeGovernanceScore - 2),
      blockers:
        context.knowledgeGovernanceScore < 74
          ? ["Expert playbook governance is incomplete for board-ready synthesis."]
          : [],
      executiveImplication: "Expert playbooks can frame decisions but cannot authorize execution.",
    },
    {
      id: "ABP-SRC-005",
      title: "Field autopilot simulation control room",
      sourceVersion: "V10.1",
      signalScore: clampScore(context.autopilotSimulationScore),
      confidenceScore: clampScore(context.autopilotSimulationScore - 5),
      blockers:
        context.autopilotSimulationScore < 70
          ? ["Autopilot simulation needs additional human review."]
          : ["Autopilot remains simulation-only."],
      executiveImplication: "Simulation lanes can inform sequencing but never dispatch work.",
    },
    {
      id: "ABP-SRC-006",
      title: "Crop-specific protocol builder",
      sourceVersion: "V10.2",
      signalScore: clampScore(context.protocolCoverageScore),
      confidenceScore: clampScore(context.protocolCoverageScore - context.unresolvedEvidenceGaps),
      blockers:
        context.protocolCoverageScore < 76
          ? ["Crop-specific protocol coverage needs reviewer validation."]
          : [],
      executiveImplication: "Crop-specific protocols can structure board questions and evidence gates.",
    },
  ];
}

function buildDecisionCards(
  context: Required<AgronomicBoardPackInput>,
  sources: BoardPackSignalSource[],
): BoardPackDecisionCard[] {
  const riskTier = inferRiskTier(context);
  const readinessBlocked = context.interventionReadinessScore < 72;
  const evidenceBlocked = context.unresolvedEvidenceGaps > 4;

  return [
    {
      id: "ABP-DEC-001",
      title: "Board review of elevated farm risk",
      urgency: riskTier === "critical" ? "urgent" : "high",
      riskTier,
      status: evidenceBlocked ? "blocked" : "review-ready",
      decisionQuestion: "Which fields and cases should receive manual executive attention first?",
      recommendedHumanAction: "Review risk cluster, evidence gaps and scouting priority without dispatching tasks.",
      evidenceRequired: ["Farm risk radar summary", "Open evidence gap list", "Human reviewer confirmation"],
      blockedBecause: evidenceBlocked ? ["Evidence backlog too large for board-ready synthesis."] : [],
      linkedSources: ["ABP-SRC-001", "ABP-SRC-006"],
    },
    {
      id: "ABP-DEC-002",
      title: "Intervention readiness hold or review",
      urgency: readinessBlocked ? "high" : "medium",
      riskTier: readinessBlocked ? "elevated" : "watch",
      status: readinessBlocked ? "blocked" : "simulation-only",
      decisionQuestion: "Should intervention planning remain on hold until readiness improves?",
      recommendedHumanAction: "Keep execution locked and review readiness blockers manually.",
      evidenceRequired: ["Intervention readiness score", "Execution gate state", "Protocol evidence gates"],
      blockedBecause: readinessBlocked ? ["Intervention readiness below threshold."] : [],
      linkedSources: ["ABP-SRC-002", "ABP-SRC-005"],
    },
    {
      id: "ABP-DEC-003",
      title: "Knowledge and memory advisory package",
      urgency: "medium",
      riskTier: "watch",
      status: context.memoryQualityScore >= 80 && context.knowledgeGovernanceScore >= 74 ? "board-ready" : "review-ready",
      decisionQuestion: "Can memory and expert playbooks support board-level context?",
      recommendedHumanAction: "Use only redacted advisory context; do not promote or write memory.",
      evidenceRequired: ["Memory quality guard", "Knowledge vault conflicts", "Reviewer governance notes"],
      blockedBecause: [],
      linkedSources: ["ABP-SRC-003", "ABP-SRC-004"],
    },
    {
      id: "ABP-DEC-004",
      title: "Crop protocol coverage review",
      urgency: context.protocolCoverageScore < 76 ? "high" : "medium",
      riskTier: context.protocolCoverageScore < 76 ? "elevated" : "watch",
      status: context.protocolCoverageScore < 70 ? "blocked" : "review-ready",
      decisionQuestion: "Are crop-specific protocols sufficient for the current portfolio?",
      recommendedHumanAction: "Review crop protocol coverage and evidence gates by crop family.",
      evidenceRequired: ["Protocol applicability index", "Crop portfolio", "Conflict register"],
      blockedBecause: context.protocolCoverageScore < 70 ? ["Protocol coverage too weak for board pack."] : [],
      linkedSources: ["ABP-SRC-006"],
    },
  ];
}

function buildRiskRegister(
  context: Required<AgronomicBoardPackInput>,
  decisions: BoardPackDecisionCard[],
): BoardPackRiskRegisterItem[] {
  return decisions.map((decision, index) => ({
    id: `ABP-RISK-${String(index + 1).padStart(3, "0")}`,
    riskTier: decision.riskTier,
    riskStatement: `${decision.title}: ${decision.decisionQuestion}`,
    exposureProxy: clampScore(riskWeight[decision.riskTier] + urgencyWeight[decision.urgency] + context.activeCaseCount * 2),
    mitigationReviewTopic: decision.recommendedHumanAction,
    hardStop: "No automatic task, intervention, execution, product prescription or dosage advice.",
  }));
}

function buildRoiProxyLines(
  context: Required<AgronomicBoardPackInput>,
  decisions: BoardPackDecisionCard[],
): BoardPackRoiProxyLine[] {
  const sensitivityBoost: Record<BoardPackRoiSensitivity, number> = {
    conservative: -6,
    balanced: 0,
    "opportunity-focused": 8,
  };

  return decisions.map((decision, index) => {
    const base = urgencyWeight[decision.urgency] + riskWeight[decision.riskTier] + sensitivityBoost[context.roiSensitivity];

    return {
      id: `ABP-ROI-${String(index + 1).padStart(3, "0")}`,
      title: decision.title,
      sensitivity: context.roiSensitivity,
      upsideProxy: clampScore(base + context.protocolCoverageScore / 4),
      downsideProxy: clampScore(base + context.unresolvedEvidenceGaps * 4),
      confidenceScore: clampScore(88 - decision.blockedBecause.length * 18 - context.unresolvedEvidenceGaps * 3),
      interpretation: "Proxy only: supports executive prioritization, not financial forecasting.",
      prohibitedInterpretation: "Do not treat this as accounting, investment advice or automated intervention ROI.",
    };
  });
}

function buildGovernanceChecklist(
  context: Required<AgronomicBoardPackInput>,
  sources: BoardPackSignalSource[],
): BoardPackGovernanceChecklistItem[] {
  const blockedSourceCount = sources.filter((source) => source.blockers.length > 0).length;

  return [
    {
      id: "ABP-GOV-001",
      label: "Provider calls disabled",
      passed: true,
      reason: "Board pack is generated locally in dry-run mode.",
      requiredReviewer: "safety reviewer",
    },
    {
      id: "ABP-GOV-002",
      label: "No persistence or memory write",
      passed: true,
      reason: "All memory and governance signals remain advisory and local.",
      requiredReviewer: "knowledge governance reviewer",
    },
    {
      id: "ABP-GOV-003",
      label: "Manual dispatch only",
      passed: true,
      reason: "Decision cards never create task or intervention records.",
      requiredReviewer: context.reviewerRole,
    },
    {
      id: "ABP-GOV-004",
      label: "Evidence gap visibility",
      passed: context.unresolvedEvidenceGaps <= 4,
      reason:
        context.unresolvedEvidenceGaps <= 4
          ? "Evidence gaps are visible and within review tolerance."
          : "Evidence backlog is too large for board-ready state.",
      requiredReviewer: "senior agronomist",
    },
    {
      id: "ABP-GOV-005",
      label: "Source blocker review",
      passed: blockedSourceCount <= 4,
      reason: `${blockedSourceCount} source modules have advisory blockers.`,
      requiredReviewer: "operations reviewer",
    },
  ];
}

function buildBoardSections(
  context: Required<AgronomicBoardPackInput>,
  decisions: BoardPackDecisionCard[],
): BoardPackSection[] {
  const blockedDecisionCount = decisions.filter((decision) => decision.status === "blocked").length;

  return [
    {
      id: "ABP-SEC-001",
      title: "Executive risk posture",
      executiveSummary: `${context.activeCaseCount} active cases and ${context.highRiskFieldCount} high-risk fields require human prioritization.`,
      evidenceStatus: context.unresolvedEvidenceGaps > 4 ? "blocked" : "partial",
      reviewerQuestion: "Which cases should be discussed first at board level?",
    },
    {
      id: "ABP-SEC-002",
      title: "Decision cards",
      executiveSummary: `${decisions.length} decision cards prepared; ${blockedDecisionCount} currently blocked.`,
      evidenceStatus: blockedDecisionCount > 0 ? "partial" : "complete",
      reviewerQuestion: "Which cards can move from review-ready to board-ready?",
    },
    {
      id: "ABP-SEC-003",
      title: "ROI proxy and operational sensitivity",
      executiveSummary: "ROI proxy lines estimate prioritization pressure only and are not financial forecasts.",
      evidenceStatus: "partial",
      reviewerQuestion: "Does the selected sensitivity fit current operational priorities?",
    },
    {
      id: "ABP-SEC-004",
      title: "Governance and safety",
      executiveSummary: "All provider, persistence, automation, prescription and dosage paths remain locked.",
      evidenceStatus: "complete",
      reviewerQuestion: "Can the pack be reviewed without enabling any automated action?",
    },
  ];
}

export function buildAiAgronomicBoardPackReport(
  input: AgronomicBoardPackInput = {},
): AgronomicBoardPackReport {
  const context = normalizeInput(input);
  const signalSources = buildSignalSources(context);
  const decisionCards = buildDecisionCards(context, signalSources);
  const riskRegister = buildRiskRegister(context, decisionCards);
  const roiProxyLines = buildRoiProxyLines(context, decisionCards);
  const governanceChecklist = buildGovernanceChecklist(context, signalSources);
  const boardSections = buildBoardSections(context, decisionCards);

  const sourceAverage =
    signalSources.reduce((sum, source) => sum + source.signalScore + source.confidenceScore, 0) /
    Math.max(1, signalSources.length * 2);

  const blockedDecisionPenalty = decisionCards.filter((decision) => decision.status === "blocked").length * 10;
  const failedGovernancePenalty = governanceChecklist.filter((item) => !item.passed).length * 8;
  const riskPressure = riskWeight[inferRiskTier(context)];

  const boardScore = clampScore(sourceAverage + riskPressure - blockedDecisionPenalty - failedGovernancePenalty);

  const boardStatus =
    decisionCards.some((decision) => decision.status === "blocked") || governanceChecklist.some((item) => !item.passed)
      ? "blocked"
      : boardScore >= 78
        ? "board-ready"
        : "review-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_BOARD_PACK_READINESS,
    boardScore,
    boardStatus,
    signalSources,
    decisionCards,
    riskRegister,
    roiProxyLines,
    governanceChecklist,
    boardSections,
    redactedExportBundle: {
      exportId: "agronomic-board-pack-v10-3-redacted-dry-run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalSecrets: false,
      includesFinancialActuals: false,
      sections: [
        "executive context",
        "signal sources",
        "decision cards",
        "risk register",
        "ROI proxy lines",
        "governance checklist",
        "board sections",
        "safety summary",
      ],
    },
    safetySummary: [
      "Board pack is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product prescription, dosage advice, public sharing or financial actuals are produced.",
      "ROI lines are prioritization proxies only and not financial forecasts.",
      "All decisions remain behind human review and manual dispatch.",
    ],
  };
}

export const aiAgronomicBoardPackVersion = "V10.3";
