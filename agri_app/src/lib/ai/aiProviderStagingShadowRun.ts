export type ProviderStagingShadowRunMode = "dry-run" | "shadow-evaluation-board";

export type ProviderShadowSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderShadowPriority = "low" | "medium" | "high" | "urgent";

export type ProviderShadowReadinessBand =
  | "blocked"
  | "shadow-design-ready"
  | "staging-shadow-review-ready"
  | "non-production-drill-ready";

export type ProviderShadowLane =
  | "shadow-scenario"
  | "envelope-simulation"
  | "contract-validation"
  | "budget-simulation"
  | "fallback-drill"
  | "evaluation-matrix"
  | "non-production-boundary"
  | "human-signoff";

export interface ProviderStagingShadowRunGuardrail {
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
  onlineControlledReady: true;
  operationalAiReady: false;
  providerActivationAllowed: false;
  casePersistenceActivationAllowed: false;
  casePersistencePerformed: false;
  migrationExecutionAllowed: false;
  migrationExecutionPerformed: false;
  schemaWriteAllowed: false;
  schemaWritePerformed: false;
  automationActivationAllowed: false;
  reviewPersistenceAllowed: false;
  reviewPersistencePerformed: false;
  manualConversionAllowed: false;
  manualConversionPerformed: false;
  providerCallAllowed: false;
  providerCallPerformed: false;
  shadowRunExternalCallAllowed: false;
  shadowRunExternalCallPerformed: false;
  providerShadowRunPlanReady: true;
  shadowEvaluationReady: true;
  fallbackDrillReady: true;
  nonProductionBoundaryReady: true;
}

export interface ProviderStagingShadowRunInput {
  shadowScenarioCount?: number;
  envelopeSimulationCount?: number;
  contractValidationCount?: number;
  budgetSimulationCount?: number;
  fallbackDrillCount?: number;
  evaluationMatrixItemCount?: number;
  openShadowGapCount?: number;
  onlineReadinessScore?: number;
  providerGatewayScore?: number;
  storageBlueprintScore?: number;
  humanReviewWorkflowScore?: number;
  contractGuardScore?: number;
  budgetGuardScore?: number;
  fallbackDrillScore?: number;
  shadowLeadRole?: string;
}

export interface ProviderShadowSourceNode {
  id: string;
  lane: ProviderShadowLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderShadowSeverity;
  priority: ProviderShadowPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface ShadowScenarioItem {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  scenarioScore: number;
  severity: ProviderShadowSeverity;
  scenarioPurpose: string;
  simulatedResult: string;
  blockedOutcome: string;
}

export interface EnvelopeSimulationItem {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  envelopeScore: number;
  priority: ProviderShadowPriority;
  envelopeQuestion: string;
  requiredFields: string[];
  blockedOutcome: string;
}

export interface ContractValidationItem {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  validationScore: number;
  severity: ProviderShadowSeverity;
  validationQuestion: string;
  simulatedValidation: string;
}

export interface BudgetSimulationItem {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  budgetScore: number;
  priority: ProviderShadowPriority;
  budgetQuestion: string;
  simulatedControl: string;
}

export interface FallbackDrillItem {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  fallbackScore: number;
  severity: ProviderShadowSeverity;
  drillQuestion: string;
  safeFallback: string;
}

export interface ShadowEvaluationItem {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  evaluationScore: number;
  severity: ProviderShadowSeverity;
  evaluationQuestion: string;
  reviewerAction: string;
}

export interface NonProductionBoundaryItem {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  boundaryScore: number;
  severity: ProviderShadowSeverity;
  boundaryRule: string;
  blockedOutcome: string;
}

export interface ProviderShadowGateItem {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  passed: boolean;
  score: number;
  severity: ProviderShadowSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ProviderShadowBoardPackItem {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ProviderShadowRiskItem {
  id: string;
  label: string;
  lane: ProviderShadowLane;
  severity: ProviderShadowSeverity;
  reason: string;
  manualResolution: string;
  blocksShadowActivation: boolean;
}

export interface ProviderStagingShadowRunReport {
  generatedAt: string;
  mode: ProviderStagingShadowRunMode;
  context: Required<ProviderStagingShadowRunInput>;
  readiness: ProviderStagingShadowRunGuardrail;
  shadowRunScore: number;
  shadowRunStatus: ProviderShadowReadinessBand;
  overallSeverity: ProviderShadowSeverity;
  sourceNodes: ProviderShadowSourceNode[];
  shadowScenarios: ShadowScenarioItem[];
  envelopeSimulationPlan: EnvelopeSimulationItem[];
  contractValidationMatrix: ContractValidationItem[];
  budgetSimulationPlan: BudgetSimulationItem[];
  fallbackDrillPlan: FallbackDrillItem[];
  shadowEvaluationMatrix: ShadowEvaluationItem[];
  nonProductionBoundary: NonProductionBoundaryItem[];
  shadowRunGates: ProviderShadowGateItem[];
  shadowRunBoardPack: ProviderShadowBoardPackItem[];
  shadowRunRiskRegister: ProviderShadowRiskItem[];
  stagedRoadmap: {
    v154: string;
    v155: string;
    v156: string;
    v157: string;
    v160: string;
  };
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

export const PROVIDER_STAGING_SHADOW_RUN_GUARDRAIL: ProviderStagingShadowRunGuardrail = {
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
  onlineControlledReady: true,
  operationalAiReady: false,
  providerActivationAllowed: false,
  casePersistenceActivationAllowed: false,
  casePersistencePerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  automationActivationAllowed: false,
  reviewPersistenceAllowed: false,
  reviewPersistencePerformed: false,
  manualConversionAllowed: false,
  manualConversionPerformed: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  shadowRunExternalCallAllowed: false,
  shadowRunExternalCallPerformed: false,
  providerShadowRunPlanReady: true,
  shadowEvaluationReady: true,
  fallbackDrillReady: true,
  nonProductionBoundaryReady: true,
};

const priorityWeight: Record<ProviderShadowPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderStagingShadowRunInput): Required<ProviderStagingShadowRunInput> {
  return {
    shadowScenarioCount: input.shadowScenarioCount ?? 6,
    envelopeSimulationCount: input.envelopeSimulationCount ?? 7,
    contractValidationCount: input.contractValidationCount ?? 7,
    budgetSimulationCount: input.budgetSimulationCount ?? 6,
    fallbackDrillCount: input.fallbackDrillCount ?? 6,
    evaluationMatrixItemCount: input.evaluationMatrixItemCount ?? 7,
    openShadowGapCount: input.openShadowGapCount ?? 8,
    onlineReadinessScore: input.onlineReadinessScore ?? 80,
    providerGatewayScore: input.providerGatewayScore ?? 70,
    storageBlueprintScore: input.storageBlueprintScore ?? 66,
    humanReviewWorkflowScore: input.humanReviewWorkflowScore ?? 68,
    contractGuardScore: input.contractGuardScore ?? 72,
    budgetGuardScore: input.budgetGuardScore ?? 64,
    fallbackDrillScore: input.fallbackDrillScore ?? 66,
    shadowLeadRole: input.shadowLeadRole ?? "provider staging shadow reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderShadowSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderShadowSeverity): ProviderShadowPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderShadowReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "non-production-drill-ready";
  if (score >= 74) return "staging-shadow-review-ready";
  return "shadow-design-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderShadowLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderShadowSourceNode {
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
            "Provider staging shadow run remains below non-production drill threshold.",
            "Shadow board must resolve envelope, contract, budget, fallback and review gaps before any later staging work.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderStagingShadowRunInput>): ProviderShadowSourceNode[] {
  const shadowPressure = context.shadowScenarioCount;
  const envelopePressure = context.envelopeSimulationCount;
  const contractPressure = context.contractValidationCount;
  const budgetPressure = context.budgetSimulationCount * 2;
  const fallbackPressure = context.fallbackDrillCount * 2;
  const gapPressure = context.openShadowGapCount * 2;

  return [
    buildSourceNode(
      "PSSR_NODE_001",
      "shadow-scenario",
      "Online readiness baseline",
      "V15.0",
      context.onlineReadinessScore,
      context.providerGatewayScore,
      shadowPressure,
      "Keep online dry-run stable while evaluating shadow scenarios.",
    ),
    buildSourceNode(
      "PSSR_NODE_002",
      "envelope-simulation",
      "Provider gateway baseline",
      "V15.1",
      context.providerGatewayScore,
      context.contractGuardScore,
      envelopePressure,
      "Simulate request envelopes without any external provider call.",
    ),
    buildSourceNode(
      "PSSR_NODE_003",
      "contract-validation",
      "Response contract baseline",
      "V15.1",
      context.contractGuardScore,
      context.humanReviewWorkflowScore,
      contractPressure,
      "Validate response contract paths in local shadow mode.",
    ),
    buildSourceNode(
      "PSSR_NODE_004",
      "evaluation-matrix",
      "Case persistence blueprint baseline",
      "V15.2",
      context.storageBlueprintScore,
      context.humanReviewWorkflowScore,
      gapPressure,
      "Confirm shadow outputs remain storage-blocked.",
    ),
    buildSourceNode(
      "PSSR_NODE_005",
      "human-signoff",
      "Persistent human review baseline",
      "V15.3",
      context.humanReviewWorkflowScore,
      context.contractGuardScore,
      gapPressure,
      "Confirm every simulated result remains under human review.",
    ),
    buildSourceNode(
      "PSSR_NODE_006",
      "budget-simulation",
      "Budget guard simulation",
      "V15.4",
      context.budgetGuardScore,
      context.providerGatewayScore,
      budgetPressure,
      "Simulate cost ceilings without any external request.",
    ),
    buildSourceNode(
      "PSSR_NODE_007",
      "fallback-drill",
      "Fallback drill baseline",
      "V15.4",
      context.fallbackDrillScore,
      context.providerGatewayScore,
      fallbackPressure,
      "Validate fallback route to local dry-run.",
    ),
    buildSourceNode(
      "PSSR_NODE_008",
      "non-production-boundary",
      "Non-production boundary",
      "V15.4",
      context.contractGuardScore,
      context.humanReviewWorkflowScore,
      gapPressure,
      "Keep provider shadow run non-production and non-operational.",
    ),
  ];
}

function buildShadowScenarios(context: Required<ProviderStagingShadowRunInput>): ShadowScenarioItem[] {
  return [
    {
      id: "PSSR_SCENARIO_001",
      label: "Valid tentative diagnostic context",
      lane: "shadow-scenario",
      scenarioScore: clampScore(context.contractGuardScore),
      severity: "watch",
      scenarioPurpose: "Simulate a contract-valid provider-like result.",
      simulatedResult: "Result remains tentative, redacted and review-required.",
      blockedOutcome: "No provider call, storage or work creation.",
    },
    {
      id: "PSSR_SCENARIO_002",
      label: "Malformed output quarantine",
      lane: "shadow-scenario",
      scenarioScore: clampScore(100 - context.contractValidationCount * 8),
      severity: "critical",
      scenarioPurpose: "Simulate malformed output and quarantine path.",
      simulatedResult: "Invalid result is held for reviewer board only.",
      blockedOutcome: "No downstream operational use.",
    },
    {
      id: "PSSR_SCENARIO_003",
      label: "Prescriptive output block",
      lane: "shadow-scenario",
      scenarioScore: 100,
      severity: "critical",
      scenarioPurpose: "Simulate an unsafe result containing product, dose or action wording.",
      simulatedResult: "Unsafe result is blocked by non-production boundary.",
      blockedOutcome: "No product prescription, dosage advice, task, intervention or execution.",
    },
  ];
}

function buildEnvelopeSimulationPlan(context: Required<ProviderStagingShadowRunInput>): EnvelopeSimulationItem[] {
  return [
    {
      id: "PSSR_ENVELOPE_001",
      label: "Redacted evidence envelope",
      lane: "envelope-simulation",
      envelopeScore: clampScore(context.contractGuardScore - context.envelopeSimulationCount),
      priority: "urgent",
      envelopeQuestion: "Can an evidence-only envelope be simulated without private or operational content?",
      requiredFields: ["redacted evidence", "case context", "expected structure", "human review flag"],
      blockedOutcome: "No private notes or operational commands.",
    },
    {
      id: "PSSR_ENVELOPE_002",
      label: "Non-operational instruction envelope",
      lane: "envelope-simulation",
      envelopeScore: clampScore(context.humanReviewWorkflowScore - context.envelopeSimulationCount),
      priority: "high",
      envelopeQuestion: "Can instructions prohibit actionability in every simulated request?",
      requiredFields: ["no product output", "no dosage output", "no work creation", "review required"],
      blockedOutcome: "No operational output.",
    },
    {
      id: "PSSR_ENVELOPE_003",
      label: "Review-hold envelope",
      lane: "envelope-simulation",
      envelopeScore: clampScore(context.humanReviewWorkflowScore),
      priority: "high",
      envelopeQuestion: "Can every shadow result remain reviewer-held?",
      requiredFields: ["review state", "hold reason", "safety caveat", "manual-only marker"],
      blockedOutcome: "No automatic approval.",
    },
  ];
}

function buildContractValidationMatrix(context: Required<ProviderStagingShadowRunInput>): ContractValidationItem[] {
  return [
    {
      id: "PSSR_CONTRACT_001",
      label: "Shape validation",
      lane: "contract-validation",
      validationScore: clampScore(context.contractGuardScore),
      severity: severityFromConcern(100 - context.contractGuardScore + context.contractValidationCount * 3),
      validationQuestion: "Can the shadow result shape be validated before display?",
      simulatedValidation: "Valid shape passes only to review-only simulation.",
    },
    {
      id: "PSSR_CONTRACT_002",
      label: "Unsafe language validation",
      lane: "contract-validation",
      validationScore: clampScore(context.humanReviewWorkflowScore),
      severity: "critical",
      validationQuestion: "Can unsafe operational language be blocked?",
      simulatedValidation: "Unsafe language is quarantined and cannot be converted.",
    },
    {
      id: "PSSR_CONTRACT_003",
      label: "Review reason validation",
      lane: "contract-validation",
      validationScore: clampScore(context.humanReviewWorkflowScore - context.openShadowGapCount),
      severity: "elevated",
      validationQuestion: "Can the reviewer see the reason for a hold, pass or block?",
      simulatedValidation: "Reviewer reason is required for future workflow activation.",
    },
  ];
}

function buildBudgetSimulationPlan(context: Required<ProviderStagingShadowRunInput>): BudgetSimulationItem[] {
  return [
    {
      id: "PSSR_BUDGET_001",
      label: "Daily ceiling simulation",
      lane: "budget-simulation",
      budgetScore: clampScore(context.budgetGuardScore),
      priority: context.budgetGuardScore < 70 ? "urgent" : "high",
      budgetQuestion: "Can a daily call ceiling be simulated before provider staging?",
      simulatedControl: "Shadow mode records a no-call ceiling evaluation.",
    },
    {
      id: "PSSR_BUDGET_002",
      label: "Per-case ceiling simulation",
      lane: "budget-simulation",
      budgetScore: clampScore(context.budgetGuardScore - context.budgetSimulationCount * 2),
      priority: "high",
      budgetQuestion: "Can per-case attempt ceilings be designed?",
      simulatedControl: "Attempt ceiling remains a reviewer board concept.",
    },
    {
      id: "PSSR_BUDGET_003",
      label: "Cost anomaly simulation",
      lane: "budget-simulation",
      budgetScore: clampScore(context.providerGatewayScore - context.budgetSimulationCount),
      priority: "high",
      budgetQuestion: "Can cost anomalies force fallback?",
      simulatedControl: "Anomaly condition returns to local dry-run fallback.",
    },
  ];
}

function buildFallbackDrillPlan(context: Required<ProviderStagingShadowRunInput>): FallbackDrillItem[] {
  return [
    {
      id: "PSSR_FALLBACK_001",
      label: "Local dry-run fallback drill",
      lane: "fallback-drill",
      fallbackScore: clampScore(context.fallbackDrillScore),
      severity: severityFromConcern(100 - context.fallbackDrillScore + context.fallbackDrillCount * 4),
      drillQuestion: "Can the flow return to local dry-run when shadow conditions fail?",
      safeFallback: "Return local analysis and keep human review required.",
    },
    {
      id: "PSSR_FALLBACK_002",
      label: "Reviewer hold fallback drill",
      lane: "fallback-drill",
      fallbackScore: clampScore(context.humanReviewWorkflowScore),
      severity: "elevated",
      drillQuestion: "Can shadow output be held for a reviewer?",
      safeFallback: "Hold result in review-only board view.",
    },
    {
      id: "PSSR_FALLBACK_003",
      label: "Non-production stop drill",
      lane: "fallback-drill",
      fallbackScore: 100,
      severity: "critical",
      drillQuestion: "Can the non-production boundary stop every operational path?",
      safeFallback: "Block provider activation, storage, conversion and execution.",
    },
  ];
}

function buildShadowEvaluationMatrix(context: Required<ProviderStagingShadowRunInput>): ShadowEvaluationItem[] {
  return [
    {
      id: "PSSR_EVAL_001",
      label: "Contract confidence review",
      lane: "evaluation-matrix",
      evaluationScore: clampScore(context.contractGuardScore),
      severity: "elevated",
      evaluationQuestion: "Is the contract strong enough for a later staging-only shadow drill?",
      reviewerAction: "Strengthen invalid output handling before future staging.",
    },
    {
      id: "PSSR_EVAL_002",
      label: "Review workflow compatibility",
      lane: "evaluation-matrix",
      evaluationScore: clampScore(context.humanReviewWorkflowScore),
      severity: "elevated",
      evaluationQuestion: "Can shadow output map to review workflow states?",
      reviewerAction: "Keep review workflow design-only until persistence gates pass.",
    },
    {
      id: "PSSR_EVAL_003",
      label: "Storage boundary compatibility",
      lane: "evaluation-matrix",
      evaluationScore: clampScore(context.storageBlueprintScore),
      severity: "critical",
      evaluationQuestion: "Can shadow output remain storage-blocked?",
      reviewerAction: "No case storage in V15.4.",
    },
  ];
}

function buildNonProductionBoundary(): NonProductionBoundaryItem[] {
  return [
    {
      id: "PSSR_BOUNDARY_001",
      label: "No external provider call",
      lane: "non-production-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "Shadow run is local simulation only.",
      blockedOutcome: "No provider call.",
    },
    {
      id: "PSSR_BOUNDARY_002",
      label: "No AI storage or conversion",
      lane: "non-production-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "Shadow outputs cannot be stored or converted.",
      blockedOutcome: "No case storage, task creation or intervention creation.",
    },
    {
      id: "PSSR_BOUNDARY_003",
      label: "No operational guidance",
      lane: "non-production-boundary",
      boundaryScore: 100,
      severity: "critical",
      boundaryRule: "Shadow outputs cannot contain product, dose, forecast or execution guidance.",
      blockedOutcome: "No product prescription, dosage advice or execution.",
    },
  ];
}

function buildShadowRunGates(
  context: Required<ProviderStagingShadowRunInput>,
  sourceNodes: ProviderShadowSourceNode[],
): ProviderShadowGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PSSR_GATE_001",
      label: "Shadow run remains no-call",
      lane: "non-production-boundary" as ProviderShadowLane,
      score: 100,
      reviewer: "provider shadow reviewer",
      requiredEvidence: ["non-production boundary", "guardrails", "dry-run cases"],
      hardStop: "Do not call an external provider in V15.4.",
    },
    {
      id: "PSSR_GATE_002",
      label: "Envelope simulation is defined enough",
      lane: "envelope-simulation" as ProviderShadowLane,
      score: context.contractGuardScore - context.envelopeSimulationCount * 3,
      reviewer: "envelope reviewer",
      requiredEvidence: ["envelope simulation", "redaction fields", "review hold marker"],
      hardStop: "Do not proceed to later staging without envelope simulation.",
    },
    {
      id: "PSSR_GATE_003",
      label: "Contract validation is strong enough",
      lane: "contract-validation" as ProviderShadowLane,
      score: context.contractGuardScore - context.contractValidationCount * 3,
      reviewer: context.shadowLeadRole,
      requiredEvidence: ["contract matrix", "unsafe language block", "review reason validation"],
      hardStop: "Do not proceed to later staging without contract validation.",
    },
    {
      id: "PSSR_GATE_004",
      label: "Budget simulation is strong enough",
      lane: "budget-simulation" as ProviderShadowLane,
      score: context.budgetGuardScore - context.budgetSimulationCount * 3,
      reviewer: "budget reviewer",
      requiredEvidence: ["daily ceiling", "per-case ceiling", "cost anomaly simulation"],
      hardStop: "Do not proceed to provider staging without budget guard.",
    },
    {
      id: "PSSR_GATE_005",
      label: "Fallback drill is strong enough",
      lane: "fallback-drill" as ProviderShadowLane,
      score: context.fallbackDrillScore - context.fallbackDrillCount * 2,
      reviewer: "fallback reviewer",
      requiredEvidence: ["local fallback", "review hold fallback", "stop drill"],
      hardStop: "Do not proceed to later staging without fallback drill.",
    },
    {
      id: "PSSR_GATE_006",
      label: "Source blockers are within shadow tolerance",
      lane: "human-signoff" as ProviderShadowLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before non-production-drill-ready state.",
    },
  ];

  return rows.map((row) => {
    const score = clampScore(row.score);
    const severity = severityFromConcern(100 - score);

    return {
      ...row,
      score,
      severity,
      passed: score >= 60,
    };
  });
}

function buildShadowRunBoardPack(context: Required<ProviderStagingShadowRunInput>): ProviderShadowBoardPackItem[] {
  return [
    {
      id: "PSSR_PACK_001",
      label: "Shadow scenario packet",
      lane: "shadow-scenario",
      packReady: context.contractGuardScore >= 65,
      readinessScore: clampScore(context.contractGuardScore),
      reviewerCheck: "Confirm shadow scenarios remain local and non-production.",
      includedSections: ["valid result", "malformed result", "prescriptive result block"],
      blockedSections: ["external provider call", "production activation"],
    },
    {
      id: "PSSR_PACK_002",
      label: "Envelope and contract packet",
      lane: "contract-validation",
      packReady: context.contractGuardScore >= 70,
      readinessScore: clampScore(context.contractGuardScore),
      reviewerCheck: "Confirm envelope and contract validation are sufficient for later staging design.",
      includedSections: ["envelope simulation", "contract matrix", "review hold"],
      blockedSections: ["automatic approval", "case storage"],
    },
    {
      id: "PSSR_PACK_003",
      label: "Budget and fallback packet",
      lane: "fallback-drill",
      packReady: context.fallbackDrillScore >= 60,
      readinessScore: clampScore((context.budgetGuardScore + context.fallbackDrillScore) / 2),
      reviewerCheck: "Confirm budget and fallback drills remain dry-run only.",
      includedSections: ["budget simulation", "fallback drill", "non-production boundary"],
      blockedSections: ["unbounded runtime", "operational conversion"],
    },
  ];
}

function buildShadowRiskRegister(
  context: Required<ProviderStagingShadowRunInput>,
  sourceNodes: ProviderShadowSourceNode[],
  gates: ProviderShadowGateItem[],
): ProviderShadowRiskItem[] {
  const risks: ProviderShadowRiskItem[] = [];

  if (context.openShadowGapCount > 0) {
    risks.push({
      id: "PSSR_RISK_001",
      label: "Open shadow run gaps",
      lane: "shadow-scenario",
      severity: context.openShadowGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openShadowGapCount} shadow run gaps remain before later provider staging.`,
      manualResolution: "Resolve through V15.x non-production drill and staging rehearsal work.",
      blocksShadowActivation: true,
    });
  }

  if (context.budgetGuardScore < 70) {
    risks.push({
      id: "PSSR_RISK_002",
      label: "Budget simulation below threshold",
      lane: "budget-simulation",
      severity: "critical",
      reason: "Budget guard is not mature enough for later provider staging.",
      manualResolution: "Define daily, per-case and anomaly controls before staging.",
      blocksShadowActivation: true,
    });
  }

  if (context.fallbackDrillScore < 70) {
    risks.push({
      id: "PSSR_RISK_003",
      label: "Fallback drill below threshold",
      lane: "fallback-drill",
      severity: "elevated",
      reason: "Fallback drill needs stronger local dry-run and reviewer hold paths.",
      manualResolution: "Strengthen fallback drill before future staging.",
      blocksShadowActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `PSSR_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksShadowActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `PSSR_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Provider shadow gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksShadowActivation: true,
      });
    });

  return risks;
}

export function buildAiProviderStagingShadowRunReport(
  input: ProviderStagingShadowRunInput = {},
): ProviderStagingShadowRunReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const shadowScenarios = buildShadowScenarios(context);
  const envelopeSimulationPlan = buildEnvelopeSimulationPlan(context);
  const contractValidationMatrix = buildContractValidationMatrix(context);
  const budgetSimulationPlan = buildBudgetSimulationPlan(context);
  const fallbackDrillPlan = buildFallbackDrillPlan(context);
  const shadowEvaluationMatrix = buildShadowEvaluationMatrix(context);
  const nonProductionBoundary = buildNonProductionBoundary();
  const shadowRunGates = buildShadowRunGates(context, sourceNodes);
  const shadowRunBoardPack = buildShadowRunBoardPack(context);
  const shadowRunRiskRegister = buildShadowRiskRegister(context, sourceNodes, shadowRunGates);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const scenarioAverage =
    shadowScenarios.reduce((sum, item) => sum + item.scenarioScore, 0) /
    Math.max(1, shadowScenarios.length);

  const contractAverage =
    contractValidationMatrix.reduce((sum, item) => sum + item.validationScore, 0) /
    Math.max(1, contractValidationMatrix.length);

  const gateAverage =
    shadowRunGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, shadowRunGates.length);

  const riskPenalty = shadowRunRiskRegister.filter((item) => item.blocksShadowActivation).length * 7;
  const envelopePressure =
    envelopeSimulationPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, envelopeSimulationPlan.length * 4);

  const shadowRunScore = clampScore(
    sourceAverage / 4 +
      scenarioAverage / 4 +
      contractAverage / 4 +
      gateAverage / 4 +
      envelopePressure -
      riskPenalty -
      context.openShadowGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openShadowGapCount * 8 +
        context.envelopeSimulationCount * 5 +
        context.contractValidationCount * 5 +
        context.budgetSimulationCount * 6 +
        context.fallbackDrillCount * 6,
    ),
  );

  const shadowRunStatus = bandFromScore(
    shadowRunScore,
    shadowRunRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_STAGING_SHADOW_RUN_GUARDRAIL,
    shadowRunScore,
    shadowRunStatus,
    overallSeverity,
    sourceNodes,
    shadowScenarios,
    envelopeSimulationPlan,
    contractValidationMatrix,
    budgetSimulationPlan,
    fallbackDrillPlan,
    shadowEvaluationMatrix,
    nonProductionBoundary,
    shadowRunGates,
    shadowRunBoardPack,
    shadowRunRiskRegister,
    stagedRoadmap: {
      v154: "Provider staging shadow run and non-production evaluation drill only.",
      v155: "Migration rehearsal and storage gate validation in staging only.",
      v156: "Manual conversion rehearsal with no automatic execution.",
      v157: "Provider staging activation gate with no production runtime.",
      v160: "Controlled production beta only after provider, storage, review and conversion gates pass.",
    },
    redactedExportBundle: {
      exportId: "provider_staging_shadow_run_v15_4_redacted_dry_run",
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
        "shadow scenarios",
        "envelope simulation plan",
        "contract validation matrix",
        "budget simulation plan",
        "fallback drill plan",
        "shadow evaluation matrix",
        "non-production boundary",
        "shadow run gates",
        "shadow run board pack",
        "risk register",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider staging shadow run is local dry-run only.",
      "No external provider call, review persistence, case storage, memory write, task creation, intervention creation or execution is performed.",
      "Shadow run output cannot be persisted, converted, shared publicly or used operationally.",
      "No product recommendation, dosage advice, formal approval or production forecast is produced.",
      "V15.4 prepares non-production evaluation drill only.",
    ],
  };
}

export const aiProviderStagingShadowRunVersion = "V15.4";
