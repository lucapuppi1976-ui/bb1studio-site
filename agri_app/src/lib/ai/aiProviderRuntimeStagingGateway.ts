export type ProviderRuntimeStagingMode = "dry-run" | "staging-gateway-review";

export type ProviderRuntimeStagingSeverity = "info" | "watch" | "elevated" | "critical";

export type ProviderRuntimeStagingPriority = "low" | "medium" | "high" | "urgent";

export type ProviderRuntimeStagingReadinessBand =
  | "blocked"
  | "design-ready"
  | "staging-review-ready"
  | "gateway-plan-ready";

export type ProviderRuntimeStagingLane =
  | "gateway-design"
  | "request-envelope"
  | "response-contract"
  | "schema-guard"
  | "budget-guard"
  | "fallback-plan"
  | "dry-run-case"
  | "human-signoff";

export interface ProviderRuntimeStagingGuardrail {
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
  automationActivationAllowed: false;
  providerCallAllowed: false;
  providerCallPerformed: false;
  providerRuntimeStagingReady: true;
  providerContractHardeningReady: true;
  providerBudgetGuardReady: true;
  providerFallbackPlanReady: true;
}

export interface ProviderRuntimeStagingInput {
  gatewayDesignItemCount?: number;
  requestEnvelopeItemCount?: number;
  responseContractItemCount?: number;
  schemaGuardItemCount?: number;
  budgetGuardItemCount?: number;
  fallbackPlanItemCount?: number;
  dryRunCaseCount?: number;
  openRuntimeGapCount?: number;
  onlineReadinessScore?: number;
  releaseControlScore?: number;
  contractHardeningScore?: number;
  reviewMaturityScore?: number;
  budgetControlScore?: number;
  fallbackMaturityScore?: number;
  stagingGatewayScore?: number;
  stagingLeadRole?: string;
}

export interface ProviderRuntimeSourceNode {
  id: string;
  lane: ProviderRuntimeStagingLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: ProviderRuntimeStagingSeverity;
  priority: ProviderRuntimeStagingPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface GatewayDesignItem {
  id: string;
  label: string;
  lane: ProviderRuntimeStagingLane;
  designScore: number;
  severity: ProviderRuntimeStagingSeverity;
  designQuestion: string;
  requiredBeforeEnablement: string[];
  blockedOutcome: string;
}

export interface RequestEnvelopePlanItem {
  id: string;
  label: string;
  lane: ProviderRuntimeStagingLane;
  envelopeScore: number;
  priority: ProviderRuntimeStagingPriority;
  envelopeQuestion: string;
  requiredFields: string[];
  blockedOutcome: string;
}

export interface ResponseContractHardeningItem {
  id: string;
  label: string;
  lane: ProviderRuntimeStagingLane;
  contractScore: number;
  severity: ProviderRuntimeStagingSeverity;
  contractQuestion: string;
  manualResolution: string;
}

export interface SchemaGuardItem {
  id: string;
  label: string;
  lane: ProviderRuntimeStagingLane;
  guardScore: number;
  severity: ProviderRuntimeStagingSeverity;
  guardQuestion: string;
  blockedOutcome: string;
}

export interface ProviderBudgetGuardItem {
  id: string;
  label: string;
  lane: ProviderRuntimeStagingLane;
  controlScore: number;
  priority: ProviderRuntimeStagingPriority;
  controlQuestion: string;
  manualResolution: string;
}

export interface ProviderFallbackPlanItem {
  id: string;
  label: string;
  lane: ProviderRuntimeStagingLane;
  fallbackScore: number;
  severity: ProviderRuntimeStagingSeverity;
  fallbackQuestion: string;
  safeFallback: string;
}

export interface ProviderDryRunCaseItem {
  id: string;
  label: string;
  lane: ProviderRuntimeStagingLane;
  dryRunScore: number;
  severity: ProviderRuntimeStagingSeverity;
  simulatedOutcome: string;
  blockedOutcome: string;
}

export interface ProviderRuntimeGateItem {
  id: string;
  label: string;
  lane: ProviderRuntimeStagingLane;
  passed: boolean;
  score: number;
  severity: ProviderRuntimeStagingSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface ProviderRuntimeBoardPackItem {
  id: string;
  label: string;
  lane: ProviderRuntimeStagingLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface ProviderRuntimeRiskItem {
  id: string;
  label: string;
  lane: ProviderRuntimeStagingLane;
  severity: ProviderRuntimeStagingSeverity;
  reason: string;
  manualResolution: string;
  blocksProviderActivation: boolean;
}

export interface ProviderRuntimeStagingReport {
  generatedAt: string;
  mode: ProviderRuntimeStagingMode;
  context: Required<ProviderRuntimeStagingInput>;
  readiness: ProviderRuntimeStagingGuardrail;
  gatewayReadinessScore: number;
  gatewayReadinessStatus: ProviderRuntimeStagingReadinessBand;
  overallSeverity: ProviderRuntimeStagingSeverity;
  sourceNodes: ProviderRuntimeSourceNode[];
  gatewayDesignPlan: GatewayDesignItem[];
  requestEnvelopePlan: RequestEnvelopePlanItem[];
  responseContractHardening: ResponseContractHardeningItem[];
  schemaGuardPlan: SchemaGuardItem[];
  providerBudgetGuard: ProviderBudgetGuardItem[];
  providerFallbackPlan: ProviderFallbackPlanItem[];
  dryRunCaseMatrix: ProviderDryRunCaseItem[];
  stagingGatewayGates: ProviderRuntimeGateItem[];
  stagingGatewayBoardPack: ProviderRuntimeBoardPackItem[];
  stagingGatewayRiskRegister: ProviderRuntimeRiskItem[];
  stagedRoadmap: {
    v151: string;
    v152: string;
    v153: string;
    v154: string;
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

export const PROVIDER_RUNTIME_STAGING_GUARDRAIL: ProviderRuntimeStagingGuardrail = {
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
  automationActivationAllowed: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  providerRuntimeStagingReady: true,
  providerContractHardeningReady: true,
  providerBudgetGuardReady: true,
  providerFallbackPlanReady: true,
};

const priorityWeight: Record<ProviderRuntimeStagingPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: ProviderRuntimeStagingInput): Required<ProviderRuntimeStagingInput> {
  return {
    gatewayDesignItemCount: input.gatewayDesignItemCount ?? 8,
    requestEnvelopeItemCount: input.requestEnvelopeItemCount ?? 7,
    responseContractItemCount: input.responseContractItemCount ?? 8,
    schemaGuardItemCount: input.schemaGuardItemCount ?? 6,
    budgetGuardItemCount: input.budgetGuardItemCount ?? 6,
    fallbackPlanItemCount: input.fallbackPlanItemCount ?? 6,
    dryRunCaseCount: input.dryRunCaseCount ?? 6,
    openRuntimeGapCount: input.openRuntimeGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 78,
    releaseControlScore: input.releaseControlScore ?? 88,
    contractHardeningScore: input.contractHardeningScore ?? 70,
    reviewMaturityScore: input.reviewMaturityScore ?? 76,
    budgetControlScore: input.budgetControlScore ?? 62,
    fallbackMaturityScore: input.fallbackMaturityScore ?? 66,
    stagingGatewayScore: input.stagingGatewayScore ?? 60,
    stagingLeadRole: input.stagingLeadRole ?? "provider staging gateway reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ProviderRuntimeStagingSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: ProviderRuntimeStagingSeverity): ProviderRuntimeStagingPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): ProviderRuntimeStagingReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "gateway-plan-ready";
  if (score >= 74) return "staging-review-ready";
  return "design-ready";
}

function buildSourceNode(
  id: string,
  lane: ProviderRuntimeStagingLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): ProviderRuntimeSourceNode {
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
            "Provider runtime staging gateway remains below activation threshold.",
            "Gateway board must resolve envelope, contract, budget, fallback and review gaps before provider enablement.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<ProviderRuntimeStagingInput>): ProviderRuntimeSourceNode[] {
  const gatewayPressure = context.gatewayDesignItemCount;
  const envelopePressure = context.requestEnvelopeItemCount;
  const contractPressure = context.responseContractItemCount;
  const budgetPressure = context.budgetGuardItemCount * 2;
  const fallbackPressure = context.fallbackPlanItemCount * 2;
  const gapPressure = context.openRuntimeGapCount * 2;

  return [
    buildSourceNode(
      "PRSG_NODE_001",
      "gateway-design",
      "Online readiness baseline",
      "V15.0",
      context.onlineReadinessScore,
      context.releaseControlScore,
      gatewayPressure,
      "Carry V15.0 readiness into provider gateway design.",
    ),
    buildSourceNode(
      "PRSG_NODE_002",
      "request-envelope",
      "Provider request envelope plan",
      "V15.1",
      context.stagingGatewayScore,
      context.releaseControlScore,
      envelopePressure,
      "Define backend request envelope without making a network call.",
    ),
    buildSourceNode(
      "PRSG_NODE_003",
      "response-contract",
      "Provider response contract hardening",
      "V15.1",
      context.contractHardeningScore,
      context.reviewMaturityScore,
      contractPressure,
      "Harden schema, invalid-output handling and human review gates.",
    ),
    buildSourceNode(
      "PRSG_NODE_004",
      "schema-guard",
      "Schema guard and quarantine plan",
      "V15.1",
      context.contractHardeningScore,
      context.reviewMaturityScore,
      gapPressure,
      "Define invalid output quarantine before provider staging.",
    ),
    buildSourceNode(
      "PRSG_NODE_005",
      "budget-guard",
      "Budget and rate guard plan",
      "V15.1",
      context.budgetControlScore,
      context.releaseControlScore,
      budgetPressure,
      "Define call budget and throttle rules before provider staging.",
    ),
    buildSourceNode(
      "PRSG_NODE_006",
      "fallback-plan",
      "Fallback and degradation plan",
      "V15.1",
      context.fallbackMaturityScore,
      context.releaseControlScore,
      fallbackPressure,
      "Return to local dry-run and human hold on failures.",
    ),
    buildSourceNode(
      "PRSG_NODE_007",
      "dry-run-case",
      "Provider dry-run case matrix",
      "V15.1",
      context.reviewMaturityScore,
      context.contractHardeningScore,
      context.dryRunCaseCount,
      "Test simulated cases without provider calls.",
    ),
    buildSourceNode(
      "PRSG_NODE_008",
      "human-signoff",
      "Provider staging signoff",
      "V15.1",
      context.reviewMaturityScore,
      context.releaseControlScore,
      gapPressure,
      "Keep provider activation blocked until human staging signoff.",
    ),
  ];
}

function buildGatewayDesignPlan(context: Required<ProviderRuntimeStagingInput>): GatewayDesignItem[] {
  return [
    {
      id: "PRSG_GATEWAY_001",
      label: "Backend-only provider gateway",
      lane: "gateway-design",
      designScore: clampScore(context.stagingGatewayScore),
      severity: severityFromConcern(100 - context.stagingGatewayScore + context.gatewayDesignItemCount * 4),
      designQuestion: "Can a server-only provider gateway be described before any external call exists?",
      requiredBeforeEnablement: [
        "server-only route",
        "request envelope validation",
        "response contract guard",
        "fallback path",
        "human review hold",
      ],
      blockedOutcome: "No provider call in V15.1.",
    },
    {
      id: "PRSG_GATEWAY_002",
      label: "Provider adapter boundary",
      lane: "gateway-design",
      designScore: clampScore(context.contractHardeningScore),
      severity: "elevated",
      designQuestion: "Can adapter responsibilities be isolated from UI and storage?",
      requiredBeforeEnablement: [
        "no client provider access",
        "no direct UI call",
        "no automatic storage",
        "no operational conversion",
      ],
      blockedOutcome: "No client-side provider runtime.",
    },
    {
      id: "PRSG_GATEWAY_003",
      label: "Gateway stop condition board",
      lane: "gateway-design",
      designScore: clampScore(context.budgetControlScore),
      severity: "critical",
      designQuestion: "Can the gateway stop immediately when budget, schema or review gates fail?",
      requiredBeforeEnablement: [
        "daily budget ceiling",
        "schema failure hold",
        "reviewer hold",
        "manual shutdown path",
      ],
      blockedOutcome: "No staged enablement before stop conditions exist.",
    },
  ];
}

function buildRequestEnvelopePlan(context: Required<ProviderRuntimeStagingInput>): RequestEnvelopePlanItem[] {
  return [
    {
      id: "PRSG_ENVELOPE_001",
      label: "Evidence-only request envelope",
      lane: "request-envelope",
      envelopeScore: clampScore(context.contractHardeningScore - context.requestEnvelopeItemCount),
      priority: "urgent",
      envelopeQuestion: "Which fields can be passed without private or operational content?",
      requiredFields: [
        "case summary",
        "redacted evidence bundle",
        "expected output schema",
        "human review marker",
        "non-operational constraints",
      ],
      blockedOutcome: "No private notes or operational instructions in provider envelope.",
    },
    {
      id: "PRSG_ENVELOPE_002",
      label: "Non-prescriptive instruction envelope",
      lane: "request-envelope",
      envelopeScore: clampScore(context.reviewMaturityScore - context.requestEnvelopeItemCount),
      priority: "high",
      envelopeQuestion: "How does the request prohibit product, dose and execution content?",
      requiredFields: [
        "no product guidance",
        "no dosage guidance",
        "no task generation",
        "no automatic execution",
      ],
      blockedOutcome: "No prescriptive output.",
    },
    {
      id: "PRSG_ENVELOPE_003",
      label: "Human review envelope marker",
      lane: "request-envelope",
      envelopeScore: clampScore(context.reviewMaturityScore),
      priority: "high",
      envelopeQuestion: "How is human review required in every future provider response?",
      requiredFields: [
        "review required",
        "review reason",
        "invalid response hold",
        "manual conversion only",
      ],
      blockedOutcome: "No automatic approval.",
    },
  ];
}

function buildResponseContractHardening(context: Required<ProviderRuntimeStagingInput>): ResponseContractHardeningItem[] {
  return [
    {
      id: "PRSG_CONTRACT_001",
      label: "Structured response schema",
      lane: "response-contract",
      contractScore: clampScore(context.contractHardeningScore),
      severity: severityFromConcern(100 - context.contractHardeningScore + context.responseContractItemCount * 3),
      contractQuestion: "Can the provider output be validated before any review screen uses it?",
      manualResolution: "Require schema validation and invalid-output quarantine before staging calls.",
    },
    {
      id: "PRSG_CONTRACT_002",
      label: "Unsafe output quarantine",
      lane: "response-contract",
      contractScore: clampScore(context.reviewMaturityScore - context.openRuntimeGapCount),
      severity: "critical",
      contractQuestion: "What happens if provider output contains operational or prescriptive content?",
      manualResolution: "Hold response for human review and block conversion.",
    },
    {
      id: "PRSG_CONTRACT_003",
      label: "Reviewer-facing explanation requirement",
      lane: "response-contract",
      contractScore: clampScore(context.reviewMaturityScore),
      severity: "elevated",
      contractQuestion: "Can reviewers see why each output is tentative?",
      manualResolution: "Require reviewer explanation fields before future staging runtime.",
    },
  ];
}

function buildSchemaGuardPlan(context: Required<ProviderRuntimeStagingInput>): SchemaGuardItem[] {
  return [
    {
      id: "PRSG_SCHEMA_001",
      label: "Schema mismatch guard",
      lane: "schema-guard",
      guardScore: clampScore(context.contractHardeningScore - context.schemaGuardItemCount * 2),
      severity: severityFromConcern(100 - context.contractHardeningScore + context.schemaGuardItemCount * 5),
      guardQuestion: "Can malformed output be blocked before any downstream display?",
      blockedOutcome: "No malformed response passes into review.",
    },
    {
      id: "PRSG_SCHEMA_002",
      label: "Actionability content guard",
      lane: "schema-guard",
      guardScore: clampScore(context.reviewMaturityScore - context.openRuntimeGapCount),
      severity: "critical",
      guardQuestion: "Can task, intervention, product or dose content be caught?",
      blockedOutcome: "No actionable output passes.",
    },
    {
      id: "PRSG_SCHEMA_003",
      label: "Redacted output guard",
      lane: "schema-guard",
      guardScore: clampScore(context.releaseControlScore - context.schemaGuardItemCount),
      severity: "elevated",
      guardQuestion: "Can reviewer output remain redacted by default?",
      blockedOutcome: "No unredacted provider packet.",
    },
  ];
}

function buildProviderBudgetGuard(context: Required<ProviderRuntimeStagingInput>): ProviderBudgetGuardItem[] {
  return [
    {
      id: "PRSG_BUDGET_001",
      label: "Daily call ceiling",
      lane: "budget-guard",
      controlScore: clampScore(context.budgetControlScore),
      priority: context.budgetControlScore < 70 ? "urgent" : "high",
      controlQuestion: "What daily call ceiling prevents runaway provider usage?",
      manualResolution: "Define daily ceiling before any staging provider call.",
    },
    {
      id: "PRSG_BUDGET_002",
      label: "Per-case call ceiling",
      lane: "budget-guard",
      controlScore: clampScore(context.budgetControlScore - context.budgetGuardItemCount * 2),
      priority: "high",
      controlQuestion: "How many provider attempts can one case use?",
      manualResolution: "Define per-case attempt ceiling and stop reasons.",
    },
    {
      id: "PRSG_BUDGET_003",
      label: "Cost anomaly hold",
      lane: "budget-guard",
      controlScore: clampScore(context.releaseControlScore - context.budgetGuardItemCount),
      priority: "high",
      controlQuestion: "What happens when usage exceeds expected cost?",
      manualResolution: "Hold gateway and return to local dry-run mode.",
    },
  ];
}

function buildProviderFallbackPlan(context: Required<ProviderRuntimeStagingInput>): ProviderFallbackPlanItem[] {
  return [
    {
      id: "PRSG_FALLBACK_001",
      label: "Local dry-run fallback",
      lane: "fallback-plan",
      fallbackScore: clampScore(context.fallbackMaturityScore),
      severity: severityFromConcern(100 - context.fallbackMaturityScore + context.fallbackPlanItemCount * 4),
      fallbackQuestion: "Can the system return to local dry-run when provider runtime is unavailable?",
      safeFallback: "Show local dry-run report and keep human review required.",
    },
    {
      id: "PRSG_FALLBACK_002",
      label: "Human review hold fallback",
      lane: "fallback-plan",
      fallbackScore: clampScore(context.reviewMaturityScore),
      severity: "elevated",
      fallbackQuestion: "Can unresolved provider cases be held for reviewers?",
      safeFallback: "Hold for human review without storage or conversion in V15.1.",
    },
    {
      id: "PRSG_FALLBACK_003",
      label: "Provider failure board note",
      lane: "fallback-plan",
      fallbackScore: clampScore(context.releaseControlScore - context.openRuntimeGapCount),
      severity: "elevated",
      fallbackQuestion: "Can provider runtime failures be converted into a reviewer note?",
      safeFallback: "Return redacted failure summary only.",
    },
  ];
}

function buildDryRunCaseMatrix(context: Required<ProviderRuntimeStagingInput>): ProviderDryRunCaseItem[] {
  return [
    {
      id: "PRSG_CASE_001",
      label: "Valid response simulation",
      lane: "dry-run-case",
      dryRunScore: clampScore(context.contractHardeningScore),
      severity: "watch",
      simulatedOutcome: "Schema-valid tentative diagnostic context with human review required.",
      blockedOutcome: "No case storage or work creation.",
    },
    {
      id: "PRSG_CASE_002",
      label: "Invalid response simulation",
      lane: "dry-run-case",
      dryRunScore: clampScore(100 - context.responseContractItemCount * 8),
      severity: "critical",
      simulatedOutcome: "Invalid structure is quarantined.",
      blockedOutcome: "No reviewer-facing operational result.",
    },
    {
      id: "PRSG_CASE_003",
      label: "Prescriptive response simulation",
      lane: "dry-run-case",
      dryRunScore: 100,
      severity: "critical",
      simulatedOutcome: "Product, dose or execution content is blocked.",
      blockedOutcome: "No product prescription, dosage advice or execution.",
    },
  ];
}

function buildStagingGatewayGates(
  context: Required<ProviderRuntimeStagingInput>,
  sourceNodes: ProviderRuntimeSourceNode[],
): ProviderRuntimeGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PRSG_GATE_001",
      label: "Gateway remains dry-run only",
      lane: "gateway-design" as ProviderRuntimeStagingLane,
      score: 100,
      reviewer: "provider runtime reviewer",
      requiredEvidence: ["gateway design", "guardrails", "no provider call"],
      hardStop: "Do not call an external provider in V15.1.",
    },
    {
      id: "PRSG_GATE_002",
      label: "Request envelope is defined",
      lane: "request-envelope" as ProviderRuntimeStagingLane,
      score: context.contractHardeningScore - context.requestEnvelopeItemCount * 3,
      reviewer: "request envelope reviewer",
      requiredEvidence: ["request envelope plan", "redaction rules", "non-prescriptive constraints"],
      hardStop: "Do not enable provider runtime without envelope validation.",
    },
    {
      id: "PRSG_GATE_003",
      label: "Response contract is hardened",
      lane: "response-contract" as ProviderRuntimeStagingLane,
      score: context.contractHardeningScore - context.responseContractItemCount * 3,
      reviewer: context.stagingLeadRole,
      requiredEvidence: ["response contract", "schema guard", "quarantine rules"],
      hardStop: "Do not enable provider runtime without response contract hardening.",
    },
    {
      id: "PRSG_GATE_004",
      label: "Budget guard is ready enough",
      lane: "budget-guard" as ProviderRuntimeStagingLane,
      score: context.budgetControlScore - context.budgetGuardItemCount * 3,
      reviewer: "cost control reviewer",
      requiredEvidence: ["daily ceiling", "per-case ceiling", "anomaly hold"],
      hardStop: "Do not enable provider runtime without budget controls.",
    },
    {
      id: "PRSG_GATE_005",
      label: "Fallback plan is ready enough",
      lane: "fallback-plan" as ProviderRuntimeStagingLane,
      score: context.fallbackMaturityScore - context.fallbackPlanItemCount * 2,
      reviewer: "fallback reviewer",
      requiredEvidence: ["local dry-run fallback", "human review hold", "failure note"],
      hardStop: "Do not enable provider runtime without fallback path.",
    },
    {
      id: "PRSG_GATE_006",
      label: "Source blockers are within staging tolerance",
      lane: "human-signoff" as ProviderRuntimeStagingLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "safety reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before gateway-plan-ready state.",
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

function buildStagingGatewayBoardPack(context: Required<ProviderRuntimeStagingInput>): ProviderRuntimeBoardPackItem[] {
  return [
    {
      id: "PRSG_PACK_001",
      label: "Gateway design packet",
      lane: "gateway-design",
      packReady: context.stagingGatewayScore >= 55,
      readinessScore: clampScore(context.stagingGatewayScore),
      reviewerCheck: "Confirm gateway remains design-only in V15.1.",
      includedSections: ["gateway boundary", "adapter boundary", "stop conditions"],
      blockedSections: ["external provider call", "client runtime provider access"],
    },
    {
      id: "PRSG_PACK_002",
      label: "Contract hardening packet",
      lane: "response-contract",
      packReady: context.contractHardeningScore >= 65,
      readinessScore: clampScore(context.contractHardeningScore),
      reviewerCheck: "Confirm contract and schema guard before future staging.",
      includedSections: ["response schema", "invalid response hold", "actionability guard"],
      blockedSections: ["automatic approval", "work conversion"],
    },
    {
      id: "PRSG_PACK_003",
      label: "Budget and fallback packet",
      lane: "fallback-plan",
      packReady: context.fallbackMaturityScore >= 60,
      readinessScore: clampScore((context.budgetControlScore + context.fallbackMaturityScore) / 2),
      reviewerCheck: "Confirm cost controls and fallback are planned before provider staging.",
      includedSections: ["daily ceiling", "per-case ceiling", "local dry-run fallback"],
      blockedSections: ["unbounded runtime", "production activation"],
    },
  ];
}

function buildRiskRegister(
  context: Required<ProviderRuntimeStagingInput>,
  sourceNodes: ProviderRuntimeSourceNode[],
  gates: ProviderRuntimeGateItem[],
): ProviderRuntimeRiskItem[] {
  const risks: ProviderRuntimeRiskItem[] = [];

  if (context.openRuntimeGapCount > 0) {
    risks.push({
      id: "PRSG_RISK_001",
      label: "Open provider runtime gaps",
      lane: "gateway-design",
      severity: context.openRuntimeGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openRuntimeGapCount} runtime gaps remain before provider staging.`,
      manualResolution: "Resolve through staged V15.x gateway and contract work.",
      blocksProviderActivation: true,
    });
  }

  if (context.budgetControlScore < 70) {
    risks.push({
      id: "PRSG_RISK_002",
      label: "Budget guard not ready",
      lane: "budget-guard",
      severity: "critical",
      reason: "Budget guard is below provider staging threshold.",
      manualResolution: "Define cost ceilings and anomaly holds before any provider call.",
      blocksProviderActivation: true,
    });
  }

  if (context.contractHardeningScore < 75) {
    risks.push({
      id: "PRSG_RISK_003",
      label: "Response contract still needs hardening",
      lane: "response-contract",
      severity: "elevated",
      reason: "Response schema and quarantine workflow need more maturity.",
      manualResolution: "Harden schema, invalid response handling and human review hold.",
      blocksProviderActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      risks.push({
        id: `PRSG_SOURCE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksProviderActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      risks.push({
        id: `PRSG_GATE_RISK_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Provider staging gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksProviderActivation: true,
      });
    });

  return risks;
}

export function buildAiProviderRuntimeStagingGatewayReport(
  input: ProviderRuntimeStagingInput = {},
): ProviderRuntimeStagingReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const gatewayDesignPlan = buildGatewayDesignPlan(context);
  const requestEnvelopePlan = buildRequestEnvelopePlan(context);
  const responseContractHardening = buildResponseContractHardening(context);
  const schemaGuardPlan = buildSchemaGuardPlan(context);
  const providerBudgetGuard = buildProviderBudgetGuard(context);
  const providerFallbackPlan = buildProviderFallbackPlan(context);
  const dryRunCaseMatrix = buildDryRunCaseMatrix(context);
  const stagingGatewayGates = buildStagingGatewayGates(context, sourceNodes);
  const stagingGatewayBoardPack = buildStagingGatewayBoardPack(context);

  const stagingGatewayRiskRegister = buildRiskRegister(context, sourceNodes, stagingGatewayGates);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const designAverage =
    gatewayDesignPlan.reduce((sum, item) => sum + item.designScore, 0) /
    Math.max(1, gatewayDesignPlan.length);

  const contractAverage =
    responseContractHardening.reduce((sum, item) => sum + item.contractScore, 0) /
    Math.max(1, responseContractHardening.length);

  const gateAverage =
    stagingGatewayGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, stagingGatewayGates.length);

  const riskPenalty = stagingGatewayRiskRegister.filter((item) => item.blocksProviderActivation).length * 7;
  const envelopePressure =
    requestEnvelopePlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, requestEnvelopePlan.length * 4);

  const gatewayReadinessScore = clampScore(
    sourceAverage / 4 +
      designAverage / 4 +
      contractAverage / 4 +
      gateAverage / 4 +
      envelopePressure -
      riskPenalty -
      context.openRuntimeGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openRuntimeGapCount * 8 +
        context.gatewayDesignItemCount * 4 +
        context.responseContractItemCount * 5 +
        context.budgetGuardItemCount * 6 +
        context.fallbackPlanItemCount * 5,
    ),
  );

  const gatewayReadinessStatus = bandFromScore(
    gatewayReadinessScore,
    stagingGatewayRiskRegister.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: PROVIDER_RUNTIME_STAGING_GUARDRAIL,
    gatewayReadinessScore,
    gatewayReadinessStatus,
    overallSeverity,
    sourceNodes,
    gatewayDesignPlan,
    requestEnvelopePlan,
    responseContractHardening,
    schemaGuardPlan,
    providerBudgetGuard,
    providerFallbackPlan,
    dryRunCaseMatrix,
    stagingGatewayGates,
    stagingGatewayBoardPack,
    stagingGatewayRiskRegister,
    stagedRoadmap: {
      v151: "Provider runtime staging gateway design and contract hardening only.",
      v152: "AI case persistence migration plan with backup and rollback rehearsal.",
      v153: "Persistent human review workflow and manual conversion gate.",
      v154: "Provider staging shadow run with no production activation.",
      v160: "Controlled production beta only after staging gates pass.",
    },
    redactedExportBundle: {
      exportId: "provider_runtime_staging_gateway_v15_1_redacted_dry_run",
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
        "gateway design plan",
        "request envelope plan",
        "response contract hardening",
        "schema guard plan",
        "provider budget guard",
        "provider fallback plan",
        "dry-run case matrix",
        "staging gateway gates",
        "staging gateway board pack",
        "risk register",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Provider runtime staging gateway is local dry-run only.",
      "No external provider call, persistence, memory write, task creation, intervention creation or execution is performed.",
      "Provider activation, case persistence and automation remain blocked.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V15.1 prepares gateway design and contract hardening for future staging only.",
    ],
  };
}

export const aiProviderRuntimeStagingGatewayVersion = "V15.1";
