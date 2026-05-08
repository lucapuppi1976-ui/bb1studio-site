export type DecisionAssuranceMode = "dry-run" | "human-signoff-review";

export type AssuranceSeverity = "info" | "watch" | "elevated" | "critical";

export type AssurancePriority = "low" | "medium" | "high" | "urgent";

export type AssuranceReadinessBand = "blocked" | "simulation-ready" | "review-ready" | "assurance-ready";

export type AssuranceLane =
  | "control-tower"
  | "explainability"
  | "compliance"
  | "evidence-chain"
  | "reviewer-signoff"
  | "dissent-review"
  | "decision-packet"
  | "safety-gates";

export interface AgronomicDecisionAssuranceGuardrail {
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
  decisionAssuranceReady: true;
  humanSignoffKernelReady: true;
  dissentRegisterReady: true;
  safeDecisionPacketReady: true;
}

export interface AgronomicDecisionAssuranceInput {
  activeCaseCount?: number;
  pendingDecisionCount?: number;
  unresolvedEvidenceGapCount?: number;
  unresolvedReviewerQuestionCount?: number;
  controlTowerScore?: number;
  explainabilityLedgerScore?: number;
  compliancePassportScore?: number;
  evidenceChainScore?: number;
  signoffCoverageScore?: number;
  dissentResolutionScore?: number;
  safetyGateScore?: number;
  reviewerConfidenceScore?: number;
  reviewerRole?: string;
}

export interface AssuranceSourceNode {
  id: string;
  lane: AssuranceLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: AssuranceSeverity;
  priority: AssurancePriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface AssuranceGate {
  id: string;
  label: string;
  lane: AssuranceLane;
  passed: boolean;
  severity: AssuranceSeverity;
  score: number;
  reviewer: string;
  reason: string;
  hardStop: string;
}

export interface HumanSignoffItem {
  id: string;
  reviewer: string;
  topic: string;
  required: true;
  readinessScore: number;
  priority: AssurancePriority;
  evidenceNeeded: string[];
  allowedOutcome: string;
  disallowedOutcome: string;
}

export interface ReviewerDissentItem {
  id: string;
  topic: string;
  severity: AssuranceSeverity;
  dissentReason: string;
  reviewerQuestion: string;
  manualResolution: string;
  blocksAssurance: boolean;
}

export interface DecisionPacketCard {
  id: string;
  title: string;
  status: "blocked" | "signoff-required" | "review-ready";
  priority: AssurancePriority;
  linkedSourceIds: string[];
  assuranceStatement: string;
  requiredHumanAction: string;
  prohibitedAction: string;
}

export interface EvidenceChainItem {
  id: string;
  sequence: number;
  label: string;
  sourceNodeIds: string[];
  chainConfidenceScore: number;
  reviewerCheck: string;
  missingEvidence: string[];
}

export interface AssuranceGap {
  id: string;
  label: string;
  lane: AssuranceLane;
  severity: AssuranceSeverity;
  reason: string;
  manualResolution: string;
}

export interface AgronomicDecisionAssuranceReport {
  generatedAt: string;
  mode: DecisionAssuranceMode;
  context: Required<AgronomicDecisionAssuranceInput>;
  readiness: AgronomicDecisionAssuranceGuardrail;
  assuranceScore: number;
  assuranceStatus: AssuranceReadinessBand;
  overallSeverity: AssuranceSeverity;
  sourceNodes: AssuranceSourceNode[];
  assuranceGates: AssuranceGate[];
  humanSignoffBoard: HumanSignoffItem[];
  dissentRegister: ReviewerDissentItem[];
  decisionPacket: DecisionPacketCard[];
  evidenceChain: EvidenceChainItem[];
  assuranceGaps: AssuranceGap[];
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

export const AGRONOMIC_DECISION_ASSURANCE_READINESS: AgronomicDecisionAssuranceGuardrail = {
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
  decisionAssuranceReady: true,
  humanSignoffKernelReady: true,
  dissentRegisterReady: true,
  safeDecisionPacketReady: true,
};

const severityWeight: Record<AssuranceSeverity, number> = {
  info: 4,
  watch: 11,
  elevated: 21,
  critical: 34,
};

const priorityWeight: Record<AssurancePriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: AgronomicDecisionAssuranceInput): Required<AgronomicDecisionAssuranceInput> {
  return {
    activeCaseCount: input.activeCaseCount ?? 9,
    pendingDecisionCount: input.pendingDecisionCount ?? 5,
    unresolvedEvidenceGapCount: input.unresolvedEvidenceGapCount ?? 6,
    unresolvedReviewerQuestionCount: input.unresolvedReviewerQuestionCount ?? 4,
    controlTowerScore: input.controlTowerScore ?? 72,
    explainabilityLedgerScore: input.explainabilityLedgerScore ?? 74,
    compliancePassportScore: input.compliancePassportScore ?? 70,
    evidenceChainScore: input.evidenceChainScore ?? 69,
    signoffCoverageScore: input.signoffCoverageScore ?? 66,
    dissentResolutionScore: input.dissentResolutionScore ?? 62,
    safetyGateScore: input.safetyGateScore ?? 78,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 73,
    reviewerRole: input.reviewerRole ?? "decision assurance reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): AssuranceSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: AssuranceSeverity): AssurancePriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): AssuranceReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "assurance-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: AssuranceLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): AssuranceSourceNode {
  const readinessScore = clampScore(readinessBase - pressure);
  const confidenceScore = clampScore(confidenceBase - pressure / 2);
  const concernScore = clampScore(100 - readinessScore + pressure);
  const severity = severityFromConcern(concernScore);

  return {
    id,
    lane,
    title,
    sourceVersion,
    readinessScore,
    confidenceScore,
    severity,
    priority: priorityFromSeverity(severity),
    reviewerFocus,
    blockers:
      readinessScore < 62 || confidenceScore < 62 || severity === "critical"
        ? ["Assurance readiness below human signoff threshold.", "Reviewer must resolve evidence and signoff context."]
        : [],
  };
}

function buildSourceNodes(context: Required<AgronomicDecisionAssuranceInput>): AssuranceSourceNode[] {
  const evidencePressure = context.unresolvedEvidenceGapCount * 3;
  const questionPressure = context.unresolvedReviewerQuestionCount * 3;
  const decisionPressure = context.pendingDecisionCount * 2;

  return [
    buildSourceNode(
      "ADA_NODE_001",
      "control-tower",
      "Control tower decision context",
      "V11.0",
      context.controlTowerScore,
      context.reviewerConfidenceScore,
      decisionPressure,
      "Confirm that command cards are review prompts only.",
    ),
    buildSourceNode(
      "ADA_NODE_002",
      "explainability",
      "Explainability trace",
      "V11.1",
      context.explainabilityLedgerScore,
      context.explainabilityLedgerScore,
      evidencePressure / 2,
      "Verify source contribution and uncertainty items before signoff.",
    ),
    buildSourceNode(
      "ADA_NODE_003",
      "compliance",
      "Compliance passport context",
      "V11.2",
      context.compliancePassportScore,
      context.compliancePassportScore,
      evidencePressure / 2,
      "Check audit readiness and compliance requirements before release review.",
    ),
    buildSourceNode(
      "ADA_NODE_004",
      "evidence-chain",
      "Evidence chain",
      "V11.3",
      context.evidenceChainScore,
      context.evidenceChainScore,
      evidencePressure,
      "Review whether evidence chain can support the decision packet.",
    ),
    buildSourceNode(
      "ADA_NODE_005",
      "reviewer-signoff",
      "Human signoff board",
      "V11.3",
      context.signoffCoverageScore,
      context.reviewerConfidenceScore,
      questionPressure,
      "Confirm all required reviewers have a manual signoff topic.",
    ),
    buildSourceNode(
      "ADA_NODE_006",
      "dissent-review",
      "Reviewer dissent register",
      "V11.3",
      context.dissentResolutionScore,
      context.reviewerConfidenceScore,
      questionPressure,
      "Resolve dissent items before assurance-ready state.",
    ),
    buildSourceNode(
      "ADA_NODE_007",
      "safety-gates",
      "Safety gate kernel",
      "V11.3",
      context.safetyGateScore,
      context.safetyGateScore,
      decisionPressure / 2,
      "Confirm provider, persistence, automation and prescription locks remain active.",
    ),
    buildSourceNode(
      "ADA_NODE_008",
      "decision-packet",
      "Safe decision packet",
      "V11.3",
      context.compliancePassportScore,
      context.explainabilityLedgerScore,
      evidencePressure / 2,
      "Prepare redacted assurance packet only.",
    ),
  ];
}

function buildAssuranceGates(
  context: Required<AgronomicDecisionAssuranceInput>,
  sourceNodes: AssuranceSourceNode[],
): AssuranceGate[] {
  const blockedNodeCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const gates = [
    {
      id: "ADA_GATE_001",
      label: "Provider and persistence remain locked",
      lane: "safety-gates" as AssuranceLane,
      score: 100,
      reviewer: "safety reviewer",
      reason: "All assurance outputs remain local dry-run.",
      hardStop: "No provider call, storage write or memory update is allowed.",
    },
    {
      id: "ADA_GATE_002",
      label: "Operational automation remains locked",
      lane: "safety-gates" as AssuranceLane,
      score: 100,
      reviewer: context.reviewerRole,
      reason: "Decision packet is not a dispatch object.",
      hardStop: "No task, work order, intervention or execution is allowed.",
    },
    {
      id: "ADA_GATE_003",
      label: "Evidence chain is reviewable",
      lane: "evidence-chain" as AssuranceLane,
      score: context.evidenceChainScore - context.unresolvedEvidenceGapCount * 4,
      reviewer: "evidence quality reviewer",
      reason: "Evidence chain must be human reviewable before signoff.",
      hardStop: "Do not mark assurance-ready while evidence chain is incomplete.",
    },
    {
      id: "ADA_GATE_004",
      label: "Human signoff coverage is sufficient",
      lane: "reviewer-signoff" as AssuranceLane,
      score: context.signoffCoverageScore - context.unresolvedReviewerQuestionCount * 3,
      reviewer: "senior agronomist",
      reason: "All relevant reviewers must have a manual acceptance topic.",
      hardStop: "Do not approve any decision without human signoff.",
    },
    {
      id: "ADA_GATE_005",
      label: "Dissent items are resolved",
      lane: "dissent-review" as AssuranceLane,
      score: context.dissentResolutionScore,
      reviewer: "review board lead",
      reason: "Reviewer dissent must be visible and manually resolved.",
      hardStop: "Do not move to assurance-ready with unresolved dissent.",
    },
    {
      id: "ADA_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "decision-packet" as AssuranceLane,
      score: 100 - blockedNodeCount * 18,
      reviewer: "operations reviewer",
      reason: `${blockedNodeCount} source nodes currently require review.`,
      hardStop: "Resolve source node blockers before decision packet acceptance.",
    },
  ];

  return gates.map((gate) => {
    const score = clampScore(gate.score);
    const severity = severityFromConcern(100 - score);

    return {
      ...gate,
      score,
      passed: score >= 70,
      severity,
    };
  });
}

function buildHumanSignoffBoard(
  context: Required<AgronomicDecisionAssuranceInput>,
  gates: AssuranceGate[],
): HumanSignoffItem[] {
  return [
    {
      id: "ADA_SIGNOFF_001",
      reviewer: "senior agronomist",
      topic: "Agronomic interpretation review",
      required: true,
      readinessScore: clampScore(context.reviewerConfidenceScore - context.unresolvedEvidenceGapCount * 2),
      priority: context.unresolvedEvidenceGapCount >= 6 ? "urgent" : "high",
      evidenceNeeded: ["Evidence chain", "Explainability trace", "Control tower command cards"],
      allowedOutcome: "Manual interpretation note only.",
      disallowedOutcome: "No task, intervention, prescription, dosage or forecast.",
    },
    {
      id: "ADA_SIGNOFF_002",
      reviewer: "safety reviewer",
      topic: "Safety lock review",
      required: true,
      readinessScore: context.safetyGateScore,
      priority: "high",
      evidenceNeeded: ["Assurance gates", "Guardrail flags", "Redacted packet"],
      allowedOutcome: "Manual safety acceptance note only.",
      disallowedOutcome: "No provider, persistence or automation enablement.",
    },
    {
      id: "ADA_SIGNOFF_003",
      reviewer: "compliance reviewer",
      topic: "Compliance and audit readiness",
      required: true,
      readinessScore: context.compliancePassportScore,
      priority: context.compliancePassportScore < 70 ? "urgent" : "high",
      evidenceNeeded: ["Compliance passport", "Audit trail", "Requirement matrix"],
      allowedOutcome: "Manual compliance readiness note only.",
      disallowedOutcome: "No formal certification claim.",
    },
    {
      id: "ADA_SIGNOFF_004",
      reviewer: context.reviewerRole,
      topic: "Final review board acceptance",
      required: true,
      readinessScore: clampScore(
        gates.reduce((sum, gate) => sum + gate.score, 0) / Math.max(1, gates.length),
      ),
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      evidenceNeeded: gates.map((gate) => gate.label),
      allowedOutcome: "Manual board agenda item only.",
      disallowedOutcome: "No operational decision execution.",
    },
  ];
}

function buildDissentRegister(
  context: Required<AgronomicDecisionAssuranceInput>,
  gates: AssuranceGate[],
): ReviewerDissentItem[] {
  const dissentItems = gates
    .filter((gate) => !gate.passed)
    .map((gate, index) => ({
      id: `ADA_DISSENT_${String(index + 1).padStart(3, "0")}`,
      topic: gate.label,
      severity: gate.severity,
      dissentReason: gate.reason,
      reviewerQuestion: `What must be resolved before ${gate.label.toLowerCase()} can pass?`,
      manualResolution: gate.hardStop,
      blocksAssurance: true,
    }));

  if (dissentItems.length === 0) {
    return [
      {
        id: "ADA_DISSENT_001",
        topic: "No blocking dissent",
        severity: "info",
        dissentReason: "No failed assurance gate in the current dry-run fixture.",
        reviewerQuestion: "Does the reviewer accept the current assurance packet?",
        manualResolution: "Record manual acceptance outside this dry-run packet.",
        blocksAssurance: false,
      },
    ];
  }

  if (context.unresolvedReviewerQuestionCount > 0) {
    dissentItems.push({
      id: `ADA_DISSENT_${String(dissentItems.length + 1).padStart(3, "0")}`,
      topic: "Open reviewer questions",
      severity: context.unresolvedReviewerQuestionCount >= 4 ? "elevated" : "watch",
      dissentReason: `${context.unresolvedReviewerQuestionCount} reviewer questions remain open.`,
      reviewerQuestion: "Which reviewer questions must be closed before assurance review?",
      manualResolution: "Close reviewer questions manually before accepting the packet.",
      blocksAssurance: context.unresolvedReviewerQuestionCount >= 4,
    });
  }

  return dissentItems;
}

function buildDecisionPacket(
  context: Required<AgronomicDecisionAssuranceInput>,
  sourceNodes: AssuranceSourceNode[],
  gates: AssuranceGate[],
): DecisionPacketCard[] {
  const failedGateIds = gates.filter((gate) => !gate.passed).map((gate) => gate.id);
  const blockedSourceIds = sourceNodes.filter((node) => node.blockers.length > 0).map((node) => node.id);

  return [
    {
      id: "ADA_PACKET_001",
      title: "Evidence chain assurance",
      status: failedGateIds.length > 0 || context.unresolvedEvidenceGapCount >= 6 ? "blocked" : "review-ready",
      priority: context.unresolvedEvidenceGapCount >= 6 ? "urgent" : "high",
      linkedSourceIds: ["ADA_NODE_002", "ADA_NODE_004"],
      assuranceStatement: "Evidence chain can be reviewed only by a human.",
      requiredHumanAction: "Resolve evidence gaps and confirm contribution map.",
      prohibitedAction: "Do not write evidence, create tasks or infer a final decision.",
    },
    {
      id: "ADA_PACKET_002",
      title: "Reviewer signoff assurance",
      status: context.signoffCoverageScore < 70 ? "signoff-required" : "review-ready",
      priority: context.signoffCoverageScore < 70 ? "urgent" : "high",
      linkedSourceIds: ["ADA_NODE_005", "ADA_NODE_006"],
      assuranceStatement: "Signoff topics are prepared as manual review prompts.",
      requiredHumanAction: "Collect explicit reviewer acceptance notes outside dry-run state.",
      prohibitedAction: "Do not approve or execute any operation automatically.",
    },
    {
      id: "ADA_PACKET_003",
      title: "Compliance and safety assurance",
      status: gates.some((gate) => !gate.passed) ? "blocked" : "review-ready",
      priority: gates.some((gate) => !gate.passed) ? "urgent" : "medium",
      linkedSourceIds: ["ADA_NODE_003", "ADA_NODE_007", "ADA_NODE_008"],
      assuranceStatement: "Compliance and safety are visible but not self-approving.",
      requiredHumanAction: "Review failed gates and confirm all hard stops remain active.",
      prohibitedAction: "Do not create formal claims, public outputs or execution instructions.",
    },
    {
      id: "ADA_PACKET_004",
      title: "Cross-source blocker review",
      status: blockedSourceIds.length > 0 ? "blocked" : "review-ready",
      priority: blockedSourceIds.length > 0 ? "high" : "medium",
      linkedSourceIds: blockedSourceIds,
      assuranceStatement: "Blocked source nodes require manual review before packet acceptance.",
      requiredHumanAction: "Resolve source blockers and dissent register items.",
      prohibitedAction: "Do not bypass reviewer questions.",
    },
  ];
}

function buildEvidenceChain(
  context: Required<AgronomicDecisionAssuranceInput>,
  sourceNodes: AssuranceSourceNode[],
): EvidenceChainItem[] {
  return [
    {
      id: "ADA_CHAIN_001",
      sequence: 1,
      label: "Control tower context",
      sourceNodeIds: ["ADA_NODE_001"],
      chainConfidenceScore: context.controlTowerScore,
      reviewerCheck: "Confirm command cards are review prompts only.",
      missingEvidence: context.unresolvedEvidenceGapCount > 4 ? ["Evidence gap closure note"] : [],
    },
    {
      id: "ADA_CHAIN_002",
      sequence: 2,
      label: "Explainability contribution",
      sourceNodeIds: ["ADA_NODE_002"],
      chainConfidenceScore: context.explainabilityLedgerScore,
      reviewerCheck: "Confirm trace and uncertainty items are accepted.",
      missingEvidence: context.unresolvedReviewerQuestionCount > 0 ? ["Reviewer question closure"] : [],
    },
    {
      id: "ADA_CHAIN_003",
      sequence: 3,
      label: "Compliance passport context",
      sourceNodeIds: ["ADA_NODE_003"],
      chainConfidenceScore: context.compliancePassportScore,
      reviewerCheck: "Confirm audit readiness and compliance packet state.",
      missingEvidence: context.compliancePassportScore < 70 ? ["Compliance readiness acceptance"] : [],
    },
    {
      id: "ADA_CHAIN_004",
      sequence: 4,
      label: "Human signoff board",
      sourceNodeIds: ["ADA_NODE_005", "ADA_NODE_006", "ADA_NODE_007"],
      chainConfidenceScore: clampScore((context.signoffCoverageScore + context.safetyGateScore) / 2),
      reviewerCheck: "Confirm all signoff topics are manual and complete.",
      missingEvidence: context.signoffCoverageScore < 70 ? ["Manual signoff note"] : [],
    },
  ].map((item) => ({
    ...item,
    chainConfidenceScore: clampScore(item.chainConfidenceScore),
  }));
}

function buildAssuranceGaps(
  context: Required<AgronomicDecisionAssuranceInput>,
  sourceNodes: AssuranceSourceNode[],
  gates: AssuranceGate[],
  dissentRegister: ReviewerDissentItem[],
): AssuranceGap[] {
  const gaps: AssuranceGap[] = [];

  if (context.unresolvedEvidenceGapCount > 0) {
    gaps.push({
      id: "ADA_GAP_001",
      label: "Unresolved evidence gaps",
      lane: "evidence-chain",
      severity: context.unresolvedEvidenceGapCount >= 6 ? "critical" : "elevated",
      reason: `${context.unresolvedEvidenceGapCount} evidence gaps remain open.`,
      manualResolution: "Close, downgrade or explicitly accept evidence gaps through human review.",
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      gaps.push({
        id: `ADA_SOURCE_GAP_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      gaps.push({
        id: `ADA_GATE_GAP_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: gate.reason,
        manualResolution: gate.hardStop,
      });
    });

  dissentRegister
    .filter((item) => item.blocksAssurance)
    .forEach((item, index) => {
      gaps.push({
        id: `ADA_DISSENT_GAP_${String(index + 1).padStart(3, "0")}`,
        label: item.topic,
        lane: "dissent-review",
        severity: item.severity,
        reason: item.dissentReason,
        manualResolution: item.manualResolution,
      });
    });

  return gaps;
}

export function buildAiAgronomicDecisionAssuranceReport(
  input: AgronomicDecisionAssuranceInput = {},
): AgronomicDecisionAssuranceReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const assuranceGates = buildAssuranceGates(context, sourceNodes);
  const humanSignoffBoard = buildHumanSignoffBoard(context, assuranceGates);
  const dissentRegister = buildDissentRegister(context, assuranceGates);
  const decisionPacket = buildDecisionPacket(context, sourceNodes, assuranceGates);
  const evidenceChain = buildEvidenceChain(context, sourceNodes);
  const assuranceGaps = buildAssuranceGaps(context, sourceNodes, assuranceGates, dissentRegister);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const gateAverage =
    assuranceGates.reduce((sum, gate) => sum + gate.score, 0) / Math.max(1, assuranceGates.length);

  const signoffAverage =
    humanSignoffBoard.reduce((sum, item) => sum + item.readinessScore, 0) / Math.max(1, humanSignoffBoard.length);

  const gapPenalty = assuranceGaps.filter((gap) => gap.severity === "critical").length * 10;
  const dissentPenalty = dissentRegister.filter((item) => item.blocksAssurance).length * 8;
  const packetPressure =
    decisionPacket.reduce((sum, card) => sum + priorityWeight[card.priority], 0) /
    Math.max(1, decisionPacket.length * 3);

  const assuranceScore = clampScore(
    sourceAverage / 3 +
      gateAverage / 3 +
      signoffAverage / 3 +
      packetPressure -
      gapPenalty -
      dissentPenalty -
      context.unresolvedEvidenceGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.pendingDecisionCount * 6 +
        context.unresolvedEvidenceGapCount * 7 +
        context.unresolvedReviewerQuestionCount * 5 +
        assuranceGates.filter((gate) => !gate.passed).length * 10,
    ),
  );

  const assuranceStatus = bandFromScore(
    assuranceScore,
    assuranceGaps.filter((gap) => gap.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_DECISION_ASSURANCE_READINESS,
    assuranceScore,
    assuranceStatus,
    overallSeverity,
    sourceNodes,
    assuranceGates,
    humanSignoffBoard,
    dissentRegister,
    decisionPacket,
    evidenceChain,
    assuranceGaps,
    redactedExportBundle: {
      exportId: "agronomic_decision_assurance_v11_3_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "source nodes",
        "assurance gates",
        "human signoff board",
        "dissent register",
        "decision packet",
        "evidence chain",
        "assurance gaps",
        "safety summary",
      ],
    },
    safetySummary: [
      "Decision assurance is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Signoff board and decision packet are review aids only.",
      "Every assurance statement remains behind human review and safety gates.",
    ],
  };
}

export const aiAgronomicDecisionAssuranceVersion = "V11.3";
