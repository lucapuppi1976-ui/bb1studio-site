export type AgronomicExecutiveDossierMode = "dry-run" | "executive-board-review";

export type AgronomicExecutiveDossierSeverity = "info" | "watch" | "elevated" | "critical";

export type AgronomicExecutiveDossierPriority = "low" | "medium" | "high" | "urgent";

export type AgronomicExecutiveDossierReadinessBand =
  | "blocked"
  | "simulation-ready"
  | "review-ready"
  | "dossier-ready";

export type AgronomicExecutiveDossierLane =
  | "executive-dossier"
  | "strategy-narrative"
  | "board-signal"
  | "decision-boundary"
  | "non-operational"
  | "signoff-agenda"
  | "audit-replay"
  | "human-signoff";

export interface AgronomicExecutiveDossierGuardrail {
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
  executiveDossierReady: true;
  strategyNarrativeFreezeReady: true;
  nonOperationalCertificateReady: true;
  humanExecutiveSignoffReady: true;
}

export interface AgronomicExecutiveDossierInput {
  executiveSectionCount?: number;
  openBoardQuestionCount?: number;
  unresolvedNarrativeGapCount?: number;
  boundaryCaveatCount?: number;
  signoffAgendaItemCount?: number;
  decisionSimulationScore?: number;
  scenarioStressScore?: number;
  portfolioComparatorScore?: number;
  sensitivityRobustnessScore?: number;
  governanceFreezeScore?: number;
  evidenceIntegrityScore?: number;
  qualityAssuranceScore?: number;
  complianceAttestationScore?: number;
  dossierRubricScore?: number;
  reviewerConfidenceScore?: number;
  executiveLeadRole?: string;
}

export interface ExecutiveDossierSourceNode {
  id: string;
  lane: AgronomicExecutiveDossierLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: AgronomicExecutiveDossierSeverity;
  priority: AgronomicExecutiveDossierPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ExecutiveDossierItem {
  id: string;
  label: string;
  lane: AgronomicExecutiveDossierLane;
  dossierScore: number;
  severity: AgronomicExecutiveDossierSeverity;
  boardQuestion: string;
  boardUse: string;
  blockedOutcome: string;
}

export interface StrategyNarrativeFreezeItem {
  id: string;
  label: string;
  lane: AgronomicExecutiveDossierLane;
  freezeScore: number;
  severity: AgronomicExecutiveDossierSeverity;
  narrativeRule: string;
  reviewerAction: string;
  blockedOutcome: string;
}

export interface BoardSignalSummaryItem {
  id: string;
  label: string;
  lane: AgronomicExecutiveDossierLane;
  signalScore: number;
  priority: AgronomicExecutiveDossierPriority;
  signalMeaning: string;
  boardUse: string;
}

export interface DecisionBoundarySummaryItem {
  id: string;
  label: string;
  lane: AgronomicExecutiveDossierLane;
  boundaryScore: number;
  severity: AgronomicExecutiveDossierSeverity;
  boundaryReason: string;
  reviewerAction: string;
  blocksDossierClosure: boolean;
}

export interface HumanSignoffAgendaItem {
  id: string;
  label: string;
  lane: AgronomicExecutiveDossierLane;
  ownerRole: string;
  agendaScore: number;
  severity: AgronomicExecutiveDossierSeverity;
  requiredEvidence: string[];
  manualResolution: string;
}

export interface NonOperationalCertificateItem {
  id: string;
  label: string;
  lane: AgronomicExecutiveDossierLane;
  freezeEnforced: true;
  severity: AgronomicExecutiveDossierSeverity;
  certificateReason: string;
  blockedOutcome: string;
  reviewer: string;
}

export interface ExecutiveDossierGateItem {
  id: string;
  label: string;
  lane: AgronomicExecutiveDossierLane;
  passed: boolean;
  score: number;
  severity: AgronomicExecutiveDossierSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ExecutiveBoardPackItem {
  id: string;
  label: string;
  lane: AgronomicExecutiveDossierLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ExecutiveAuditReplayItem {
  id: string;
  label: string;
  lane: AgronomicExecutiveDossierLane;
  replayReady: boolean;
  replayScore: number;
  severity: AgronomicExecutiveDossierSeverity;
  replayQuestion: string;
  manualResolution: string;
}

export interface ExecutiveSignoffItem {
  id: string;
  label: string;
  lane: AgronomicExecutiveDossierLane;
  signoffReady: boolean;
  reviewer: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface ExecutiveRiskItem {
  id: string;
  label: string;
  lane: AgronomicExecutiveDossierLane;
  severity: AgronomicExecutiveDossierSeverity;
  reason: string;
  manualResolution: string;
  blocksExecutiveDossier: boolean;
}

export interface AgronomicExecutiveDossierReport {
  generatedAt: string;
  mode: AgronomicExecutiveDossierMode;
  context: Required<AgronomicExecutiveDossierInput>;
  readiness: AgronomicExecutiveDossierGuardrail;
  executiveDossierScore: number;
  executiveDossierStatus: AgronomicExecutiveDossierReadinessBand;
  overallSeverity: AgronomicExecutiveDossierSeverity;
  sourceNodes: ExecutiveDossierSourceNode[];
  executiveDossierBoard: ExecutiveDossierItem[];
  strategyNarrativeFreeze: StrategyNarrativeFreezeItem[];
  boardSignalSummary: BoardSignalSummaryItem[];
  decisionBoundarySummary: DecisionBoundarySummaryItem[];
  humanSignoffAgenda: HumanSignoffAgendaItem[];
  nonOperationalCertificate: NonOperationalCertificateItem[];
  executiveGateMatrix: ExecutiveDossierGateItem[];
  executiveBoardPack: ExecutiveBoardPackItem[];
  auditReplay: ExecutiveAuditReplayItem[];
  executiveSignoff: ExecutiveSignoffItem[];
  executiveRiskRegister: ExecutiveRiskItem[];
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

export const AGRONOMIC_EXECUTIVE_DOSSIER_READINESS: AgronomicExecutiveDossierGuardrail = {
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
  executiveDossierReady: true,
  strategyNarrativeFreezeReady: true,
  nonOperationalCertificateReady: true,
  humanExecutiveSignoffReady: true,
};

const priorityWeight: Record<AgronomicExecutiveDossierPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: AgronomicExecutiveDossierInput): Required<AgronomicExecutiveDossierInput> {
  return {
    executiveSectionCount: input.executiveSectionCount ?? 14,
    openBoardQuestionCount: input.openBoardQuestionCount ?? 5,
    unresolvedNarrativeGapCount: input.unresolvedNarrativeGapCount ?? 5,
    boundaryCaveatCount: input.boundaryCaveatCount ?? 5,
    signoffAgendaItemCount: input.signoffAgendaItemCount ?? 6,
    decisionSimulationScore: input.decisionSimulationScore ?? 72,
    scenarioStressScore: input.scenarioStressScore ?? 71,
    portfolioComparatorScore: input.portfolioComparatorScore ?? 71,
    sensitivityRobustnessScore: input.sensitivityRobustnessScore ?? 71,
    governanceFreezeScore: input.governanceFreezeScore ?? 71,
    evidenceIntegrityScore: input.evidenceIntegrityScore ?? 73,
    qualityAssuranceScore: input.qualityAssuranceScore ?? 72,
    complianceAttestationScore: input.complianceAttestationScore ?? 72,
    dossierRubricScore: input.dossierRubricScore ?? 71,
    reviewerConfidenceScore: input.reviewerConfidenceScore ?? 74,
    executiveLeadRole: input.executiveLeadRole ?? "agronomic executive board lead",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): AgronomicExecutiveDossierSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: AgronomicExecutiveDossierSeverity): AgronomicExecutiveDossierPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): AgronomicExecutiveDossierReadinessBand {
  if (blockerCount > 2 || score < 54) return "blocked";
  if (score >= 84 && blockerCount === 0) return "dossier-ready";
  if (score >= 72) return "review-ready";
  return "simulation-ready";
}

function buildSourceNode(
  id: string,
  lane: AgronomicExecutiveDossierLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ExecutiveDossierSourceNode {
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
        ? [
            "Executive board dossier is below board threshold.",
            "Executive board must resolve narrative gaps, boundary caveats and signoff agenda items.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<AgronomicExecutiveDossierInput>): ExecutiveDossierSourceNode[] {
  const boardPressure = context.openBoardQuestionCount * 4;
  const narrativePressure = context.unresolvedNarrativeGapCount * 4;
  const boundaryPressure = context.boundaryCaveatCount * 5;
  const signoffPressure = context.signoffAgendaItemCount * 3;

  return [
    buildSourceNode(
      "AED_NODE_001",
      "executive-dossier",
      "Decision simulation board input",
      "V14.0",
      context.decisionSimulationScore,
      context.reviewerConfidenceScore,
      boardPressure,
      "Summarize decision simulation as executive board context only.",
    ),
    buildSourceNode(
      "AED_NODE_002",
      "board-signal",
      "Scenario stress test input",
      "V14.1",
      context.scenarioStressScore,
      context.reviewerConfidenceScore,
      narrativePressure,
      "Summarize stress and failure mode signals without actionability.",
    ),
    buildSourceNode(
      "AED_NODE_003",
      "board-signal",
      "Portfolio comparator input",
      "V14.2",
      context.portfolioComparatorScore,
      context.reviewerConfidenceScore,
      boardPressure,
      "Summarize portfolio trade-off signals without ranking finality.",
    ),
    buildSourceNode(
      "AED_NODE_004",
      "decision-boundary",
      "Sensitivity robustness input",
      "V14.3",
      context.sensitivityRobustnessScore,
      context.reviewerConfidenceScore,
      boundaryPressure,
      "Summarize robustness boundaries and fragile assumptions.",
    ),
    buildSourceNode(
      "AED_NODE_005",
      "strategy-narrative",
      "Governance freeze input",
      "V14.4",
      context.governanceFreezeScore,
      context.reviewerConfidenceScore,
      narrativePressure + boundaryPressure / 2,
      "Carry governance freeze into executive narrative freeze.",
    ),
    buildSourceNode(
      "AED_NODE_006",
      "audit-replay",
      "Evidence, QA and compliance inputs",
      "V13.2-V13.6",
      (context.evidenceIntegrityScore + context.qualityAssuranceScore + context.complianceAttestationScore) / 3,
      context.dossierRubricScore,
      signoffPressure,
      "Replay V13 controls before executive board packet.",
    ),
    buildSourceNode(
      "AED_NODE_007",
      "non-operational",
      "Non-operational board certificate",
      "V14.5",
      context.complianceAttestationScore,
      context.dossierRubricScore,
      boundaryPressure,
      "Keep executive packet non-operational.",
    ),
    buildSourceNode(
      "AED_NODE_008",
      "human-signoff",
      "Executive board signoff",
      "V14.5",
      context.reviewerConfidenceScore,
      context.reviewerConfidenceScore,
      boardPressure,
      "Confirm executive dossier signoff remains manual.",
    ),
  ];
}

function buildExecutiveDossierBoard(context: Required<AgronomicExecutiveDossierInput>): ExecutiveDossierItem[] {
  return [
    {
      id: "AED_DOSSIER_001",
      label: "Executive situation frame",
      lane: "executive-dossier",
      dossierScore: clampScore(context.decisionSimulationScore - context.openBoardQuestionCount * 3),
      severity: severityFromConcern(context.openBoardQuestionCount * 10),
      boardQuestion: "What can the board understand without converting simulation into action?",
      boardUse: "Executive board context only.",
      blockedOutcome: "No approval, recommendation, task or dispatch.",
    },
    {
      id: "AED_DOSSIER_002",
      label: "Strategic risk frame",
      lane: "executive-dossier",
      dossierScore: clampScore((context.scenarioStressScore + context.sensitivityRobustnessScore) / 2),
      severity: severityFromConcern(context.boundaryCaveatCount * 10),
      boardQuestion: "Which risk signals should remain visible in the dossier?",
      boardUse: "Internal risk framing only.",
      blockedOutcome: "No public share or operational risk order.",
    },
    {
      id: "AED_DOSSIER_003",
      label: "Governance closure frame",
      lane: "executive-dossier",
      dossierScore: clampScore(context.governanceFreezeScore - context.unresolvedNarrativeGapCount * 3),
      severity: severityFromConcern(context.unresolvedNarrativeGapCount * 12),
      boardQuestion: "Is the dossier clearly frozen as review-only?",
      boardUse: "Governance closure narrative only.",
      blockedOutcome: "No formal decision or execution path.",
    },
  ];
}

function buildStrategyNarrativeFreeze(context: Required<AgronomicExecutiveDossierInput>): StrategyNarrativeFreezeItem[] {
  return [
    {
      id: "AED_NARRATIVE_001",
      label: "No recommendation wording",
      lane: "strategy-narrative",
      freezeScore: clampScore(100 - context.unresolvedNarrativeGapCount * 10),
      severity: severityFromConcern(context.unresolvedNarrativeGapCount * 11),
      narrativeRule: "Narrative must avoid language that implies a selected agronomic strategy.",
      reviewerAction: "Keep every strategy phrase provisional and board-only.",
      blockedOutcome: "No formal recommendation.",
    },
    {
      id: "AED_NARRATIVE_002",
      label: "No operational next-step wording",
      lane: "strategy-narrative",
      freezeScore: clampScore(100 - context.signoffAgendaItemCount * 8),
      severity: severityFromConcern(context.signoffAgendaItemCount * 9),
      narrativeRule: "Narrative must not imply a task, intervention or follow-up dispatch.",
      reviewerAction: "Remove operational verbs from the executive packet.",
      blockedOutcome: "No task, intervention or scheduling.",
    },
    {
      id: "AED_NARRATIVE_003",
      label: "No prescriptive wording",
      lane: "strategy-narrative",
      freezeScore: 100,
      severity: "critical",
      narrativeRule: "Narrative must not imply product, dose, treatment or production result.",
      reviewerAction: "Preserve non-operational language.",
      blockedOutcome: "No product, dosage or production forecast.",
    },
  ];
}

function buildBoardSignalSummary(context: Required<AgronomicExecutiveDossierInput>): BoardSignalSummaryItem[] {
  return [
    {
      id: "AED_SIGNAL_001",
      label: "Stress signal",
      lane: "board-signal",
      signalScore: clampScore(context.scenarioStressScore),
      priority: context.scenarioStressScore < 72 ? "high" : "medium",
      signalMeaning: "Stress test shows that caveats must remain visible.",
      boardUse: "Review stress caveats only.",
    },
    {
      id: "AED_SIGNAL_002",
      label: "Portfolio signal",
      lane: "board-signal",
      signalScore: clampScore(context.portfolioComparatorScore),
      priority: context.portfolioComparatorScore < 72 ? "high" : "medium",
      signalMeaning: "Portfolio comparison remains non-final and non-operational.",
      boardUse: "Review trade-off caveats only.",
    },
    {
      id: "AED_SIGNAL_003",
      label: "Governance freeze signal",
      lane: "board-signal",
      signalScore: clampScore(context.governanceFreezeScore),
      priority: "urgent",
      signalMeaning: "Governance freeze blocks actionability across the executive packet.",
      boardUse: "Review non-operational freeze only.",
    },
  ];
}

function buildDecisionBoundarySummary(context: Required<AgronomicExecutiveDossierInput>): DecisionBoundarySummaryItem[] {
  return [
    {
      id: "AED_BOUNDARY_001",
      label: "Simulation-to-decision boundary",
      lane: "decision-boundary",
      boundaryScore: clampScore(context.decisionSimulationScore - context.boundaryCaveatCount * 3),
      severity: severityFromConcern(context.boundaryCaveatCount * 10),
      boundaryReason: "Simulation context cannot become a decision.",
      reviewerAction: "Keep simulation statements caveated.",
      blocksDossierClosure: context.boundaryCaveatCount >= 6,
    },
    {
      id: "AED_BOUNDARY_002",
      label: "Ranking-to-selection boundary",
      lane: "decision-boundary",
      boundaryScore: clampScore(context.portfolioComparatorScore - context.openBoardQuestionCount * 3),
      severity: severityFromConcern(context.openBoardQuestionCount * 10),
      boundaryReason: "Portfolio ranking cannot become option selection.",
      reviewerAction: "Keep all rankings provisional.",
      blocksDossierClosure: context.openBoardQuestionCount >= 6,
    },
    {
      id: "AED_BOUNDARY_003",
      label: "Narrative-to-action boundary",
      lane: "non-operational",
      boundaryScore: 100,
      severity: "critical",
      boundaryReason: "Executive narrative cannot create operational action.",
      reviewerAction: "Maintain non-operational certificate.",
      blocksDossierClosure: false,
    },
  ];
}

function buildHumanSignoffAgenda(context: Required<AgronomicExecutiveDossierInput>): HumanSignoffAgendaItem[] {
  return [
    {
      id: "AED_AGENDA_001",
      label: "Review executive summary wording",
      lane: "signoff-agenda",
      ownerRole: "executive board reviewer",
      agendaScore: clampScore(context.dossierRubricScore - context.unresolvedNarrativeGapCount * 3),
      severity: severityFromConcern(context.unresolvedNarrativeGapCount * 11),
      requiredEvidence: ["executive dossier board", "strategy narrative freeze"],
      manualResolution: "Approve wording manually as board-only context.",
    },
    {
      id: "AED_AGENDA_002",
      label: "Review decision boundary language",
      lane: "signoff-agenda",
      ownerRole: "decision boundary reviewer",
      agendaScore: clampScore(context.governanceFreezeScore - context.boundaryCaveatCount * 3),
      severity: severityFromConcern(context.boundaryCaveatCount * 11),
      requiredEvidence: ["decision boundary summary", "governance freeze board"],
      manualResolution: "Confirm decision boundary manually.",
    },
    {
      id: "AED_AGENDA_003",
      label: "Review final non-operational certificate",
      lane: "signoff-agenda",
      ownerRole: context.executiveLeadRole,
      agendaScore: 100,
      severity: "critical",
      requiredEvidence: ["non-operational certificate", "guardrails", "audit replay"],
      manualResolution: "Confirm non-operational state manually.",
    },
  ];
}

function buildNonOperationalCertificate(): NonOperationalCertificateItem[] {
  return [
    {
      id: "AED_NON_OP_001",
      label: "Provider output block",
      lane: "non-operational",
      freezeEnforced: true,
      severity: "critical",
      certificateReason: "Executive dossier cannot call or use provider output.",
      blockedOutcome: "No provider call or automatic decision.",
      reviewer: "safety reviewer",
    },
    {
      id: "AED_NON_OP_002",
      label: "Operational action block",
      lane: "non-operational",
      freezeEnforced: true,
      severity: "critical",
      certificateReason: "Executive dossier cannot create or dispatch agronomic work.",
      blockedOutcome: "No task, intervention, scheduling or execution.",
      reviewer: "operations reviewer",
    },
    {
      id: "AED_NON_OP_003",
      label: "Prescriptive output block",
      lane: "non-operational",
      freezeEnforced: true,
      severity: "critical",
      certificateReason: "Executive dossier cannot generate product, dosage or production guidance.",
      blockedOutcome: "No product prescription, dosage advice or production forecast.",
      reviewer: "agronomic safety reviewer",
    },
  ];
}

function buildExecutiveGateMatrix(
  context: Required<AgronomicExecutiveDossierInput>,
  sourceNodes: ExecutiveDossierSourceNode[],
): ExecutiveDossierGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "AED_GATE_001",
      label: "Executive dossier wording is controlled",
      lane: "executive-dossier" as AgronomicExecutiveDossierLane,
      score: context.dossierRubricScore - context.unresolvedNarrativeGapCount * 4,
      reviewer: "executive wording reviewer",
      requiredEvidence: ["executive dossier board", "strategy narrative freeze"],
      hardStop: "Do not close dossier while narrative gaps may imply action.",
    },
    {
      id: "AED_GATE_002",
      label: "Board signals are caveated",
      lane: "board-signal" as AgronomicExecutiveDossierLane,
      score: context.reviewerConfidenceScore - context.openBoardQuestionCount * 4,
      reviewer: "board signal reviewer",
      requiredEvidence: ["board signal summary", "stress test", "portfolio comparator"],
      hardStop: "Do not present board signals without caveats.",
    },
    {
      id: "AED_GATE_003",
      label: "Decision boundaries are explicit",
      lane: "decision-boundary" as AgronomicExecutiveDossierLane,
      score: 100 - context.boundaryCaveatCount * 10,
      reviewer: "decision boundary reviewer",
      requiredEvidence: ["decision boundary summary", "governance freeze"],
      hardStop: "Do not close dossier without explicit decision boundaries.",
    },
    {
      id: "AED_GATE_004",
      label: "Signoff agenda is complete enough",
      lane: "signoff-agenda" as AgronomicExecutiveDossierLane,
      score: 100 - context.signoffAgendaItemCount * 7,
      reviewer: context.executiveLeadRole,
      requiredEvidence: ["human signoff agenda", "audit replay"],
      hardStop: "Do not close dossier with unresolved signoff agenda.",
    },
    {
      id: "AED_GATE_005",
      label: "Non-operational certificate is enforced",
      lane: "non-operational" as AgronomicExecutiveDossierLane,
      score: 100,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-operational certificate", "guardrails"],
      hardStop: "No operational output is allowed.",
    },
    {
      id: "AED_GATE_006",
      label: "Source blockers are within tolerance",
      lane: "human-signoff" as AgronomicExecutiveDossierLane,
      score: 100 - blockedSourceCount * 18,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before dossier-ready state.",
    },
  ];

  return rows.map((row) => {
    const score = clampScore(row.score);
    const severity = severityFromConcern(100 - score);

    return {
      ...row,
      score,
      severity,
      passed: score >= 70,
    };
  });
}

function buildExecutiveBoardPack(context: Required<AgronomicExecutiveDossierInput>): ExecutiveBoardPackItem[] {
  return [
    {
      id: "AED_PACK_001",
      label: "Executive dossier packet",
      lane: "executive-dossier",
      packReady: context.dossierRubricScore >= 70,
      readinessScore: clampScore(context.dossierRubricScore),
      reviewerCheck: "Confirm executive packet contains only board review language.",
      includedSections: ["executive dossier", "board signal summary", "decision boundaries"],
      blockedSections: ["operational instruction", "field dispatch", "provider material"],
    },
    {
      id: "AED_PACK_002",
      label: "Narrative freeze packet",
      lane: "strategy-narrative",
      packReady: context.unresolvedNarrativeGapCount <= 5,
      readinessScore: clampScore(100 - context.unresolvedNarrativeGapCount * 10),
      reviewerCheck: "Confirm narrative is frozen as non-operational.",
      includedSections: ["narrative freeze", "blocked wording", "review caveats"],
      blockedSections: ["diagnosis finality", "formal recommendation", "execution path"],
    },
    {
      id: "AED_PACK_003",
      label: "Executive signoff packet",
      lane: "human-signoff",
      packReady: context.signoffAgendaItemCount <= 6,
      readinessScore: clampScore(100 - context.signoffAgendaItemCount * 8),
      reviewerCheck: "Confirm executive signoff remains a manual board note only.",
      includedSections: ["human signoff agenda", "executive gates", "risk register"],
      blockedSections: ["stored approval", "public share", "product or dosage output"],
    },
  ];
}

function buildAuditReplay(context: Required<AgronomicExecutiveDossierInput>): ExecutiveAuditReplayItem[] {
  return [
    {
      id: "AED_REPLAY_001",
      label: "V14 simulation replay",
      lane: "audit-replay",
      replayReady: context.decisionSimulationScore >= 70 && context.scenarioStressScore >= 70,
      replayScore: clampScore((context.decisionSimulationScore + context.scenarioStressScore) / 2),
      severity: severityFromConcern(100 - context.scenarioStressScore + context.openBoardQuestionCount * 4),
      replayQuestion: "Can V14.0 and V14.1 be replayed for executive board context?",
      manualResolution: "Attach simulation and stress replay note.",
    },
    {
      id: "AED_REPLAY_002",
      label: "V14 portfolio and robustness replay",
      lane: "audit-replay",
      replayReady: context.portfolioComparatorScore >= 70 && context.sensitivityRobustnessScore >= 70,
      replayScore: clampScore((context.portfolioComparatorScore + context.sensitivityRobustnessScore) / 2),
      severity: severityFromConcern(100 - context.sensitivityRobustnessScore + context.boundaryCaveatCount * 4),
      replayQuestion: "Can V14.2 and V14.3 be replayed for executive boundary summary?",
      manualResolution: "Attach portfolio and robustness replay note.",
    },
    {
      id: "AED_REPLAY_003",
      label: "Governance and compliance replay",
      lane: "audit-replay",
      replayReady: context.governanceFreezeScore >= 70 && context.complianceAttestationScore >= 70,
      replayScore: clampScore((context.governanceFreezeScore + context.complianceAttestationScore) / 2),
      severity: severityFromConcern(100 - context.complianceAttestationScore + context.unresolvedNarrativeGapCount * 5),
      replayQuestion: "Can governance freeze and compliance be replayed for non-operational assurance?",
      manualResolution: "Attach governance and compliance replay note.",
    },
  ];
}

function buildExecutiveSignoff(
  context: Required<AgronomicExecutiveDossierInput>,
  gates: ExecutiveDossierGateItem[],
): ExecutiveSignoffItem[] {
  return [
    {
      id: "AED_SIGNOFF_001",
      label: "Executive dossier signoff",
      lane: "human-signoff",
      signoffReady: context.openBoardQuestionCount < 6,
      reviewer: "executive board reviewer",
      requiredEvidence: ["executive dossier board", "board signal summary", "decision boundary summary"],
      safeOutcome: "Manual executive dossier signoff only.",
    },
    {
      id: "AED_SIGNOFF_002",
      label: "Non-operational certificate signoff",
      lane: "human-signoff",
      signoffReady: true,
      reviewer: "safety reviewer",
      requiredEvidence: ["non-operational certificate", "executive gates", "guardrails"],
      safeOutcome: "Manual non-operational certificate signoff only.",
    },
    {
      id: "AED_SIGNOFF_003",
      label: "Executive board final signoff",
      lane: "human-signoff",
      signoffReady: gates.every((gate) => gate.passed),
      reviewer: context.executiveLeadRole,
      requiredEvidence: gates.map((gate) => gate.label),
      safeOutcome: "Manual executive board signoff packet only.",
    },
  ];
}

function buildRiskRegister(
  context: Required<AgronomicExecutiveDossierInput>,
  sourceNodes: ExecutiveDossierSourceNode[],
  gates: ExecutiveDossierGateItem[],
  boundaries: DecisionBoundarySummaryItem[],
  signoff: ExecutiveSignoffItem[],
): ExecutiveRiskItem[] {
  const risks: ExecutiveRiskItem[] = [];

  if (context.unresolvedNarrativeGapCount > 0) {
    risks.push({
      id: "AED_RISK_001",
      label: "Narrative gaps require review",
      lane: "strategy-narrative",
      severity: context.unresolvedNarrativeGapCount >= 5 ? "critical" : "elevated",
      reason: `${context.unresolvedNarrativeGapCount} narrative gaps remain open.`,
      manualResolution: "Resolve executive wording manually before dossier closure.",
      blocksExecutiveDossier: context.unresolvedNarrativeGapCount >= 6,
    });
  }

  if (context.boundaryCaveatCount > 0) {
    risks.push({
      id: "AED_RISK_002",
      label: "Decision boundary caveats remain",
      lane: "decision-boundary",
      severity: context.boundaryCaveatCount >= 5 ? "critical" : "elevated",
      reason: `${context.boundaryCaveatCount} decision boundary caveats require board review.`,
      manualResolution: "Keep caveats explicit in the dossier.",
      blocksExecutiveDossier: context.boundaryCaveatCount >= 6,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `AED_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksExecutiveDossier: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `AED_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Executive gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksExecutiveDossier: gate.severity === "critical" || gate.score < 60,
      });
    });

  boundaries
    .filter((item) => item.blocksDossierClosure)
    .forEach((item, index) => {
      risks.push({
        id: `AED_BOUNDARY_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: item.boundaryReason,
        manualResolution: item.reviewerAction,
        blocksExecutiveDossier: true,
      });
    });

  signoff
    .filter((item) => !item.signoffReady)
    .forEach((item, index) => {
      risks.push({
        id: `AED_SIGNOFF_RISK_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: "elevated",
        reason: "Executive signoff is not ready in fixture.",
        manualResolution: item.safeOutcome,
        blocksExecutiveDossier: true,
      });
    });

  return risks;
}

export function buildAiAgronomicExecutiveDossierReport(
  input: AgronomicExecutiveDossierInput = {},
): AgronomicExecutiveDossierReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const executiveDossierBoard = buildExecutiveDossierBoard(context);
  const strategyNarrativeFreeze = buildStrategyNarrativeFreeze(context);
  const boardSignalSummary = buildBoardSignalSummary(context);
  const decisionBoundarySummary = buildDecisionBoundarySummary(context);
  const humanSignoffAgenda = buildHumanSignoffAgenda(context);
  const nonOperationalCertificate = buildNonOperationalCertificate();
  const executiveGateMatrix = buildExecutiveGateMatrix(context, sourceNodes);
  const executiveBoardPack = buildExecutiveBoardPack(context);
  const auditReplay = buildAuditReplay(context);
  const executiveSignoff = buildExecutiveSignoff(context, executiveGateMatrix);
  const executiveRiskRegister = buildRiskRegister(
    context,
    sourceNodes,
    executiveGateMatrix,
    decisionBoundarySummary,
    executiveSignoff,
  );

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const dossierAverage =
    executiveDossierBoard.reduce((sum, item) => sum + item.dossierScore, 0) /
    Math.max(1, executiveDossierBoard.length);

  const agendaAverage =
    humanSignoffAgenda.reduce((sum, item) => sum + item.agendaScore, 0) /
    Math.max(1, humanSignoffAgenda.length);

  const gateAverage =
    executiveGateMatrix.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, executiveGateMatrix.length);

  const riskPenalty = executiveRiskRegister.filter((item) => item.blocksExecutiveDossier).length * 10;
  const signalPressure =
    boardSignalSummary.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, boardSignalSummary.length * 3);

  const executiveDossierScore = clampScore(
    sourceAverage / 4 +
      dossierAverage / 4 +
      agendaAverage / 4 +
      gateAverage / 4 +
      signalPressure -
      riskPenalty -
      context.openBoardQuestionCount -
      context.unresolvedNarrativeGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.executiveSectionCount * 3 +
        context.openBoardQuestionCount * 8 +
        context.unresolvedNarrativeGapCount * 8 +
        context.boundaryCaveatCount * 8 +
        context.signoffAgendaItemCount * 6,
    ),
  );

  const executiveDossierStatus = bandFromScore(
    executiveDossierScore,
    executiveRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AGRONOMIC_EXECUTIVE_DOSSIER_READINESS,
    executiveDossierScore,
    executiveDossierStatus,
    overallSeverity,
    sourceNodes,
    executiveDossierBoard,
    strategyNarrativeFreeze,
    boardSignalSummary,
    decisionBoundarySummary,
    humanSignoffAgenda,
    nonOperationalCertificate,
    executiveGateMatrix,
    executiveBoardPack,
    auditReplay,
    executiveSignoff,
    executiveRiskRegister,
    redactedExportBundle: {
      exportId: "agronomic_executive_dossier_v14_5_redacted_dry_run",
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
        "executive dossier board",
        "strategy narrative freeze",
        "board signal summary",
        "decision boundary summary",
        "human signoff agenda",
        "non-operational certificate",
        "executive gate matrix",
        "executive board pack",
        "audit replay",
        "executive signoff",
        "executive risk register",
        "safety summary",
      ],
    },
    safetySummary: [
      "Agronomic executive board dossier is local dry-run only.",
      "No provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "Executive dossier, board signals and narrative freeze are review concepts only.",
      "Every executive conclusion remains behind human review, non-operational certificate and manual signoff.",
    ],
  };
}

export const aiAgronomicExecutiveDossierVersion = "V14.5";
