export type RuntimeIncidentResponseMode = "dry-run" | "incident-board-review";

export type RuntimeIncidentSeverity = "info" | "watch" | "elevated" | "critical";

export type RuntimeIncidentPriority = "low" | "medium" | "high" | "urgent";

export type RuntimeIncidentReadinessBand =
  | "blocked"
  | "incident-design-ready"
  | "manual-board-review-ready"
  | "incident-drill-ready";

export type RuntimeIncidentLane =
  | "incident-intake"
  | "provider-failure"
  | "response-routing"
  | "rollback-action"
  | "operator-communication"
  | "anomaly-replay"
  | "incident-no-go"
  | "human-signoff";

export interface RuntimeIncidentResponseGuardrail {
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
  controlledBetaAllowed: false;
  controlledBetaPerformed: false;
  productionBetaAllowed: false;
  productionBetaPerformed: false;
  zeroActivationMode: true;
  providerActivationAllowed: false;
  providerActivationPerformed: false;
  providerStagingActivationAllowed: false;
  providerStagingActivationPerformed: false;
  providerRuntimeBetaAllowed: false;
  providerRuntimeBetaPerformed: false;
  explicitActivationApprovalAllowed: false;
  explicitActivationApprovalPerformed: false;
  productionRuntimeAllowed: false;
  productionRuntimePerformed: false;
  providerRegistryWriteAllowed: false;
  providerRegistryWritePerformed: false;
  casePersistenceActivationAllowed: false;
  casePersistencePerformed: false;
  storageActivationAllowed: false;
  storageActivationPerformed: false;
  liveMigrationExecutionAllowed: false;
  liveMigrationExecutionPerformed: false;
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
  complianceExportAllowed: false;
  complianceExportPerformed: false;
  incidentResponseAllowed: false;
  incidentResponsePerformed: false;
  providerFailureDrillAllowed: false;
  providerFailureDrillPerformed: false;
  runtimeIncidentWriteAllowed: false;
  runtimeIncidentWritePerformed: false;
  incidentNotificationAllowed: false;
  incidentNotificationPerformed: false;
  runtimeIncidentResponseReady: true;
  providerFailureDrillReady: true;
  incidentNoGoReady: true;
  rollbackActionCardsReady: true;
}

export interface RuntimeIncidentResponseInput {
  incidentIntakeItemCount?: number;
  providerFailureItemCount?: number;
  responseRoutingItemCount?: number;
  rollbackActionItemCount?: number;
  operatorCommunicationItemCount?: number;
  anomalyReplayItemCount?: number;
  openIncidentGapCount?: number;
  onlineReadinessScore?: number;
  providerRuntimeBetaScore?: number;
  operationsCockpitScore?: number;
  hardeningScore?: number;
  reviewerReadinessScore?: number;
  rollbackScore?: number;
  incidentSignalScore?: number;
  incidentLeadRole?: string;
}

export interface RuntimeIncidentSourceNode {
  id: string;
  lane: RuntimeIncidentLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: RuntimeIncidentSeverity;
  priority: RuntimeIncidentPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface IncidentIntakeItem {
  id: string;
  label: string;
  lane: RuntimeIncidentLane;
  intakeScore: number;
  severity: RuntimeIncidentSeverity;
  intakePurpose: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ProviderFailureDrillItem {
  id: string;
  label: string;
  lane: RuntimeIncidentLane;
  drillScore: number;
  severity: RuntimeIncidentSeverity;
  failureQuestion: string;
  requiredEvidence: string[];
  blockedOutcome: string;
}

export interface ResponseRoutingItem {
  id: string;
  label: string;
  lane: RuntimeIncidentLane;
  routingScore: number;
  priority: RuntimeIncidentPriority;
  routingQuestion: string;
  requiredControls: string[];
  manualResolution: string;
}

export interface RollbackActionCardItem {
  id: string;
  label: string;
  lane: RuntimeIncidentLane;
  rollbackScore: number;
  priority: RuntimeIncidentPriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface OperatorCommunicationItem {
  id: string;
  label: string;
  lane: RuntimeIncidentLane;
  communicationScore: number;
  severity: RuntimeIncidentSeverity;
  communicationQuestion: string;
  messageSections: string[];
  blockedOutcome: string;
}

export interface AnomalyReplayItem {
  id: string;
  label: string;
  lane: RuntimeIncidentLane;
  replayScore: number;
  severity: RuntimeIncidentSeverity;
  replayQuestion: string;
  replayFields: string[];
  manualResolution: string;
}

export interface IncidentNoGoItem {
  id: string;
  label: string;
  lane: RuntimeIncidentLane;
  goNoGoState: "no-go" | "design-only" | "drill-ready";
  score: number;
  severity: RuntimeIncidentSeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface RuntimeIncidentGateItem {
  id: string;
  label: string;
  lane: RuntimeIncidentLane;
  passed: boolean;
  score: number;
  severity: RuntimeIncidentSeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface RuntimeIncidentBoardPackItem {
  id: string;
  label: string;
  lane: RuntimeIncidentLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface RuntimeIncidentFindingItem {
  id: string;
  label: string;
  lane: RuntimeIncidentLane;
  severity: RuntimeIncidentSeverity;
  reason: string;
  manualResolution: string;
  blocksIncidentActivation: boolean;
}

export interface RuntimeIncidentResponseBoardReport {
  generatedAt: string;
  mode: RuntimeIncidentResponseMode;
  context: Required<RuntimeIncidentResponseInput>;
  readiness: RuntimeIncidentResponseGuardrail;
  incidentBoardScore: number;
  incidentBoardStatus: RuntimeIncidentReadinessBand;
  overallSeverity: RuntimeIncidentSeverity;
  sourceNodes: RuntimeIncidentSourceNode[];
  incidentIntakePlan: IncidentIntakeItem[];
  providerFailureDrill: ProviderFailureDrillItem[];
  responseRoutingPlan: ResponseRoutingItem[];
  rollbackActionCards: RollbackActionCardItem[];
  operatorCommunicationPlan: OperatorCommunicationItem[];
  anomalyReplayPlan: AnomalyReplayItem[];
  incidentNoGoBoard: IncidentNoGoItem[];
  incidentGates: RuntimeIncidentGateItem[];
  incidentBoardPack: RuntimeIncidentBoardPackItem[];
  incidentFindings: RuntimeIncidentFindingItem[];
  stagedRoadmap: {
    v165: string;
    v166: string;
    v167: string;
    v168: string;
    v169: string;
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

export const RUNTIME_INCIDENT_RESPONSE_GUARDRAIL: RuntimeIncidentResponseGuardrail = {
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
  controlledBetaAllowed: false,
  controlledBetaPerformed: false,
  productionBetaAllowed: false,
  productionBetaPerformed: false,
  zeroActivationMode: true,
  providerActivationAllowed: false,
  providerActivationPerformed: false,
  providerStagingActivationAllowed: false,
  providerStagingActivationPerformed: false,
  providerRuntimeBetaAllowed: false,
  providerRuntimeBetaPerformed: false,
  explicitActivationApprovalAllowed: false,
  explicitActivationApprovalPerformed: false,
  productionRuntimeAllowed: false,
  productionRuntimePerformed: false,
  providerRegistryWriteAllowed: false,
  providerRegistryWritePerformed: false,
  casePersistenceActivationAllowed: false,
  casePersistencePerformed: false,
  storageActivationAllowed: false,
  storageActivationPerformed: false,
  liveMigrationExecutionAllowed: false,
  liveMigrationExecutionPerformed: false,
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
  complianceExportAllowed: false,
  complianceExportPerformed: false,
  incidentResponseAllowed: false,
  incidentResponsePerformed: false,
  providerFailureDrillAllowed: false,
  providerFailureDrillPerformed: false,
  runtimeIncidentWriteAllowed: false,
  runtimeIncidentWritePerformed: false,
  incidentNotificationAllowed: false,
  incidentNotificationPerformed: false,
  runtimeIncidentResponseReady: true,
  providerFailureDrillReady: true,
  incidentNoGoReady: true,
  rollbackActionCardsReady: true,
};

const priorityWeight: Record<RuntimeIncidentPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: RuntimeIncidentResponseInput): Required<RuntimeIncidentResponseInput> {
  return {
    incidentIntakeItemCount: input.incidentIntakeItemCount ?? 8,
    providerFailureItemCount: input.providerFailureItemCount ?? 8,
    responseRoutingItemCount: input.responseRoutingItemCount ?? 7,
    rollbackActionItemCount: input.rollbackActionItemCount ?? 7,
    operatorCommunicationItemCount: input.operatorCommunicationItemCount ?? 7,
    anomalyReplayItemCount: input.anomalyReplayItemCount ?? 7,
    openIncidentGapCount: input.openIncidentGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    providerRuntimeBetaScore: input.providerRuntimeBetaScore ?? 70,
    operationsCockpitScore: input.operationsCockpitScore ?? 70,
    hardeningScore: input.hardeningScore ?? 70,
    reviewerReadinessScore: input.reviewerReadinessScore ?? 68,
    rollbackScore: input.rollbackScore ?? 66,
    incidentSignalScore: input.incidentSignalScore ?? 64,
    incidentLeadRole: input.incidentLeadRole ?? "runtime incident response reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): RuntimeIncidentSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: RuntimeIncidentSeverity): RuntimeIncidentPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): RuntimeIncidentReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "incident-drill-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "incident-design-ready";
}

function buildSourceNode(
  id: string,
  lane: RuntimeIncidentLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): RuntimeIncidentSourceNode {
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
            "Runtime incident response board remains below activation threshold.",
            "Incident board must resolve intake, provider failure drill, routing, rollback and operator communication gaps before any later runtime work.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<RuntimeIncidentResponseInput>): RuntimeIncidentSourceNode[] {
  const intakePressure = context.incidentIntakeItemCount;
  const providerFailurePressure = context.providerFailureItemCount * 2;
  const routingPressure = context.responseRoutingItemCount * 2;
  const rollbackPressure = context.rollbackActionItemCount * 2;
  const replayPressure = context.anomalyReplayItemCount;
  const gapPressure = context.openIncidentGapCount * 2;

  return [
    buildSourceNode(
      "RIRB_NODE_001",
      "incident-intake",
      "Staged provider runtime beta gate",
      "V16.4",
      context.providerRuntimeBetaScore,
      context.reviewerReadinessScore,
      intakePressure,
      "Connect runtime beta plan to incident intake design.",
    ),
    buildSourceNode(
      "RIRB_NODE_002",
      "provider-failure",
      "Provider failure readiness",
      "V16.5",
      context.incidentSignalScore,
      context.providerRuntimeBetaScore,
      providerFailurePressure,
      "Prepare provider failure taxonomy without provider calls.",
    ),
    buildSourceNode(
      "RIRB_NODE_003",
      "response-routing",
      "Human-supervised operations cockpit",
      "V16.3",
      context.operationsCockpitScore,
      context.reviewerReadinessScore,
      routingPressure,
      "Route future incidents to human operators only.",
    ),
    buildSourceNode(
      "RIRB_NODE_004",
      "rollback-action",
      "Post-beta rollback hardening",
      "V16.1",
      context.rollbackScore,
      context.hardeningScore,
      rollbackPressure,
      "Prepare rollback action cards before any runtime activation.",
    ),
    buildSourceNode(
      "RIRB_NODE_005",
      "operator-communication",
      "Operational audit package",
      "V16.2",
      context.reviewerReadinessScore,
      context.operationsCockpitScore,
      context.operatorCommunicationItemCount,
      "Prepare operator communication without notification send.",
    ),
    buildSourceNode(
      "RIRB_NODE_006",
      "anomaly-replay",
      "Anomaly replay design",
      "V16.5",
      context.incidentSignalScore,
      context.hardeningScore,
      replayPressure,
      "Design incident replay without event writes.",
    ),
    buildSourceNode(
      "RIRB_NODE_007",
      "incident-no-go",
      "Runtime locks",
      "V16.4",
      100,
      context.onlineReadinessScore,
      gapPressure,
      "Keep all runtime and incident actions locked.",
    ),
    buildSourceNode(
      "RIRB_NODE_008",
      "human-signoff",
      "Incident response board signoff",
      "V16.5",
      context.reviewerReadinessScore,
      context.rollbackScore,
      gapPressure,
      "Keep incident response activation blocked until a separate explicit activation release.",
    ),
  ];
}

function buildIncidentIntakePlan(context: Required<RuntimeIncidentResponseInput>): IncidentIntakeItem[] {
  return [
    {
      id: "RIRB_INTAKE_001",
      label: "Runtime incident intake design",
      lane: "incident-intake",
      intakeScore: clampScore(context.incidentSignalScore),
      severity: severityFromConcern(100 - context.incidentSignalScore + context.incidentIntakeItemCount * 4),
      intakePurpose: "Design incident intake without runtime incident writes.",
      requiredEvidence: ["incident class", "manual reviewer", "runtime lock state"],
      blockedOutcome: "No incident record write.",
    },
    {
      id: "RIRB_INTAKE_002",
      label: "Provider failure intake design",
      lane: "incident-intake",
      intakeScore: clampScore(context.providerRuntimeBetaScore),
      severity: "elevated",
      intakePurpose: "Classify possible provider failure modes without provider calls.",
      requiredEvidence: ["contract failure", "unsafe output hold", "fallback path"],
      blockedOutcome: "No provider call.",
    },
    {
      id: "RIRB_INTAKE_003",
      label: "Operator intake hold",
      lane: "incident-intake",
      intakeScore: clampScore(context.operationsCockpitScore),
      severity: "elevated",
      intakePurpose: "Hold incident review for human operator board.",
      requiredEvidence: ["operator note", "review reason", "no-go state"],
      blockedOutcome: "No operator notification send.",
    },
  ];
}

function buildProviderFailureDrill(context: Required<RuntimeIncidentResponseInput>): ProviderFailureDrillItem[] {
  return [
    {
      id: "RIRB_FAILURE_001",
      label: "Provider unavailable drill",
      lane: "provider-failure",
      drillScore: clampScore(context.incidentSignalScore),
      severity: severityFromConcern(100 - context.incidentSignalScore + context.providerFailureItemCount * 4),
      failureQuestion: "Can a future provider outage fall back to local dry-run?",
      requiredEvidence: ["local report", "review hold", "provider stop"],
      blockedOutcome: "No provider runtime.",
    },
    {
      id: "RIRB_FAILURE_002",
      label: "Provider unsafe output drill",
      lane: "provider-failure",
      drillScore: 100,
      severity: "critical",
      failureQuestion: "Can unsafe product, dose or execution output remain blocked?",
      requiredEvidence: ["product block", "dosage block", "execution block"],
      blockedOutcome: "No unsafe guidance.",
    },
    {
      id: "RIRB_FAILURE_003",
      label: "Provider contract failure drill",
      lane: "provider-failure",
      drillScore: clampScore(context.providerRuntimeBetaScore),
      severity: "elevated",
      failureQuestion: "Can malformed future provider output be routed to human review?",
      requiredEvidence: ["schema failure", "review hold", "fallback route"],
      blockedOutcome: "No provider response persistence.",
    },
  ];
}

function buildResponseRoutingPlan(context: Required<RuntimeIncidentResponseInput>): ResponseRoutingItem[] {
  return [
    {
      id: "RIRB_ROUTE_001",
      label: "Human reviewer routing",
      lane: "response-routing",
      routingScore: clampScore(context.reviewerReadinessScore),
      priority: "high",
      routingQuestion: "Can every incident route to a human reviewer?",
      requiredControls: ["human review", "manual note", "no-go outcome"],
      manualResolution: "Keep routing as dry-run design.",
    },
    {
      id: "RIRB_ROUTE_002",
      label: "Operator board routing",
      lane: "response-routing",
      routingScore: clampScore(context.operationsCockpitScore),
      priority: "high",
      routingQuestion: "Can operational incidents route to operator board?",
      requiredControls: ["operator board", "safety boundary", "dispatch no-go"],
      manualResolution: "No notification or dispatch is performed.",
    },
    {
      id: "RIRB_ROUTE_003",
      label: "Escalation fallback routing",
      lane: "response-routing",
      routingScore: clampScore(context.rollbackScore),
      priority: "urgent",
      routingQuestion: "Can unresolved incidents fall back to rollback board?",
      requiredControls: ["rollback action", "runtime stop", "local report"],
      manualResolution: "Hold for human board.",
    },
  ];
}

function buildRollbackActionCards(context: Required<RuntimeIncidentResponseInput>): RollbackActionCardItem[] {
  return [
    {
      id: "RIRB_ROLLBACK_001",
      label: "Provider runtime rollback card",
      lane: "rollback-action",
      rollbackScore: clampScore(context.rollbackScore),
      priority: context.rollbackScore < 70 ? "urgent" : "high",
      rollbackQuestion: "Can provider runtime be stopped in a later activation release?",
      safeFallback: "Return to local dry-run report and human review.",
    },
    {
      id: "RIRB_ROLLBACK_002",
      label: "Storage rollback card",
      lane: "rollback-action",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can storage remain locked during incident drills?",
      safeFallback: "No storage activation exists in V16.5.",
    },
    {
      id: "RIRB_ROLLBACK_003",
      label: "Operational rollback card",
      lane: "rollback-action",
      rollbackScore: 100,
      priority: "urgent",
      rollbackQuestion: "Can task, intervention and execution routes remain blocked?",
      safeFallback: "Keep all work conversion locked.",
    },
  ];
}

function buildOperatorCommunicationPlan(context: Required<RuntimeIncidentResponseInput>): OperatorCommunicationItem[] {
  return [
    {
      id: "RIRB_COMM_001",
      label: "Operator incident briefing",
      lane: "operator-communication",
      communicationScore: clampScore(context.operationsCockpitScore),
      severity: "elevated",
      communicationQuestion: "Can operator briefing be prepared without sending notifications?",
      messageSections: ["incident type", "current lock state", "manual review requirement"],
      blockedOutcome: "No notification send.",
    },
    {
      id: "RIRB_COMM_002",
      label: "Reviewer response note",
      lane: "operator-communication",
      communicationScore: clampScore(context.reviewerReadinessScore),
      severity: severityFromConcern(100 - context.reviewerReadinessScore + context.operatorCommunicationItemCount * 4),
      communicationQuestion: "Can reviewer response notes be drafted locally?",
      messageSections: ["review reason", "blocked action", "fallback instruction"],
      blockedOutcome: "No review persistence.",
    },
    {
      id: "RIRB_COMM_003",
      label: "Safety caveat briefing",
      lane: "operator-communication",
      communicationScore: 100,
      severity: "critical",
      communicationQuestion: "Can safety caveats remain explicit?",
      messageSections: ["no product prescription", "no dosage guidance", "no execution"],
      blockedOutcome: "No operational instruction.",
    },
  ];
}

function buildAnomalyReplayPlan(context: Required<RuntimeIncidentResponseInput>): AnomalyReplayItem[] {
  return [
    {
      id: "RIRB_REPLAY_001",
      label: "Provider anomaly replay",
      lane: "anomaly-replay",
      replayScore: clampScore(context.incidentSignalScore),
      severity: severityFromConcern(100 - context.incidentSignalScore + context.anomalyReplayItemCount * 4),
      replayQuestion: "Can future provider anomalies be replayed conceptually?",
      replayFields: ["failure class", "review hold", "fallback route"],
      manualResolution: "No anomaly event write in V16.5.",
    },
    {
      id: "RIRB_REPLAY_002",
      label: "Operator decision replay",
      lane: "anomaly-replay",
      replayScore: clampScore(context.operationsCockpitScore),
      severity: "elevated",
      replayQuestion: "Can operator decisions be replayed without persistence?",
      replayFields: ["operator role", "decision note", "no-go outcome"],
      manualResolution: "Keep replay local and redacted.",
    },
    {
      id: "RIRB_REPLAY_003",
      label: "Runtime lock replay",
      lane: "anomaly-replay",
      replayScore: 100,
      severity: "critical",
      replayQuestion: "Can runtime lock state be replayed clearly?",
      replayFields: ["provider lock", "storage lock", "execution lock"],
      manualResolution: "Runtime remains locked.",
    },
  ];
}

function buildIncidentNoGoBoard(): IncidentNoGoItem[] {
  return [
    {
      id: "RIRB_GONOGO_001",
      label: "Incident response board design",
      lane: "human-signoff",
      goNoGoState: "drill-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["incident intake", "failure drill", "rollback action cards"],
      safeOutcome: "Incident response design only.",
    },
    {
      id: "RIRB_GONOGO_002",
      label: "Incident response activation",
      lane: "incident-no-go",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate activation release", "incident write approval", "notification approval"],
      safeOutcome: "Incident response activation remains blocked.",
    },
    {
      id: "RIRB_GONOGO_003",
      label: "Provider runtime action",
      lane: "provider-failure",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate provider runtime release", "explicit activation approval"],
      safeOutcome: "Provider runtime remains blocked.",
    },
  ];
}

function buildIncidentGates(
  context: Required<RuntimeIncidentResponseInput>,
  sourceNodes: RuntimeIncidentSourceNode[],
): RuntimeIncidentGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "RIRB_GATE_001",
      label: "Incident board remains no-runtime",
      lane: "incident-no-go" as RuntimeIncidentLane,
      score: 100,
      reviewer: "runtime incident response reviewer",
      requiredEvidence: ["incidentResponseAllowed=false", "providerCalled=false", "runtimeIncidentWriteAllowed=false"],
      hardStop: "Do not activate incident response runtime in V16.5.",
    },
    {
      id: "RIRB_GATE_002",
      label: "Incident intake is complete enough",
      lane: "incident-intake" as RuntimeIncidentLane,
      score: context.incidentSignalScore - context.incidentIntakeItemCount * 3,
      reviewer: context.incidentLeadRole,
      requiredEvidence: ["incident intake", "provider failure intake", "operator hold"],
      hardStop: "Do not proceed without incident intake board.",
    },
    {
      id: "RIRB_GATE_003",
      label: "Provider failure drill is complete enough",
      lane: "provider-failure" as RuntimeIncidentLane,
      score: context.providerRuntimeBetaScore - context.providerFailureItemCount * 3,
      reviewer: "provider failure reviewer",
      requiredEvidence: ["unavailable drill", "unsafe output drill", "contract failure drill"],
      hardStop: "Do not proceed without provider failure drill.",
    },
    {
      id: "RIRB_GATE_004",
      label: "Response routing is complete enough",
      lane: "response-routing" as RuntimeIncidentLane,
      score: context.operationsCockpitScore - context.responseRoutingItemCount * 3,
      reviewer: "response routing reviewer",
      requiredEvidence: ["human routing", "operator routing", "fallback routing"],
      hardStop: "Do not proceed without response routing review.",
    },
    {
      id: "RIRB_GATE_005",
      label: "Rollback cards are complete enough",
      lane: "rollback-action" as RuntimeIncidentLane,
      score: context.rollbackScore - context.rollbackActionItemCount * 3,
      reviewer: "rollback board reviewer",
      requiredEvidence: ["provider rollback", "storage rollback", "operations rollback"],
      hardStop: "Do not proceed without rollback action cards.",
    },
    {
      id: "RIRB_GATE_006",
      label: "Source blockers are within incident board tolerance",
      lane: "human-signoff" as RuntimeIncidentLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before incident-drill-ready state.",
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

function buildBoardPack(context: Required<RuntimeIncidentResponseInput>): RuntimeIncidentBoardPackItem[] {
  return [
    {
      id: "RIRB_PACK_001",
      label: "Incident intake packet",
      lane: "incident-intake",
      packReady: context.incidentSignalScore >= 60,
      readinessScore: clampScore(context.incidentSignalScore),
      reviewerCheck: "Confirm incident intake remains design-only and no-write.",
      includedSections: ["incident intake", "provider failure intake", "operator hold"],
      blockedSections: ["incident write", "runtime action"],
    },
    {
      id: "RIRB_PACK_002",
      label: "Provider failure and routing packet",
      lane: "provider-failure",
      packReady: context.providerRuntimeBetaScore >= 60 && context.operationsCockpitScore >= 60,
      readinessScore: clampScore((context.providerRuntimeBetaScore + context.operationsCockpitScore) / 2),
      reviewerCheck: "Confirm provider failure routes to human review only.",
      includedSections: ["provider failure drill", "response routing", "operator communication"],
      blockedSections: ["provider call", "notification send"],
    },
    {
      id: "RIRB_PACK_003",
      label: "Rollback and anomaly packet",
      lane: "rollback-action",
      packReady: context.rollbackScore >= 60,
      readinessScore: clampScore(context.rollbackScore),
      reviewerCheck: "Confirm rollback and replay remain dry-run only.",
      includedSections: ["rollback action cards", "anomaly replay", "incident no-go"],
      blockedSections: ["persistent incident response", "automatic rollback"],
    },
  ];
}

function buildFindings(
  context: Required<RuntimeIncidentResponseInput>,
  sourceNodes: RuntimeIncidentSourceNode[],
  gates: RuntimeIncidentGateItem[],
  goNoGo: IncidentNoGoItem[],
): RuntimeIncidentFindingItem[] {
  const findings: RuntimeIncidentFindingItem[] = [];

  if (context.openIncidentGapCount > 0) {
    findings.push({
      id: "RIRB_FINDING_001",
      label: "Open incident response gaps",
      lane: "human-signoff",
      severity: context.openIncidentGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openIncidentGapCount} incident response gaps remain before any later activation.`,
      manualResolution: "Resolve intake, routing, rollback, replay and approval gaps in a later gated release.",
      blocksIncidentActivation: true,
    });
  }

  if (context.incidentSignalScore < 70) {
    findings.push({
      id: "RIRB_FINDING_002",
      label: "Incident signal readiness below threshold",
      lane: "incident-intake",
      severity: "critical",
      reason: "Incident signal readiness is not mature enough for activation.",
      manualResolution: "Complete incident intake and anomaly replay review.",
      blocksIncidentActivation: true,
    });
  }

  if (context.rollbackScore < 70) {
    findings.push({
      id: "RIRB_FINDING_003",
      label: "Rollback action cards below threshold",
      lane: "rollback-action",
      severity: "critical",
      reason: "Rollback action cards are not mature enough for incident response activation.",
      manualResolution: "Complete provider, storage and operations rollback cards.",
      blocksIncidentActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `RIRB_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksIncidentActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `RIRB_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Incident gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksIncidentActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `RIRB_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksIncidentActivation: true,
      });
    });

  return findings;
}

export function buildAiRuntimeIncidentResponseBoardReport(
  input: RuntimeIncidentResponseInput = {},
): RuntimeIncidentResponseBoardReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const incidentIntakePlan = buildIncidentIntakePlan(context);
  const providerFailureDrill = buildProviderFailureDrill(context);
  const responseRoutingPlan = buildResponseRoutingPlan(context);
  const rollbackActionCards = buildRollbackActionCards(context);
  const operatorCommunicationPlan = buildOperatorCommunicationPlan(context);
  const anomalyReplayPlan = buildAnomalyReplayPlan(context);
  const incidentNoGoBoard = buildIncidentNoGoBoard();
  const incidentGates = buildIncidentGates(context, sourceNodes);
  const incidentBoardPack = buildBoardPack(context);
  const incidentFindings = buildFindings(context, sourceNodes, incidentGates, incidentNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const intakeAverage =
    incidentIntakePlan.reduce((sum, item) => sum + item.intakeScore, 0) /
    Math.max(1, incidentIntakePlan.length);

  const drillAverage =
    providerFailureDrill.reduce((sum, item) => sum + item.drillScore, 0) /
    Math.max(1, providerFailureDrill.length);

  const gateAverage =
    incidentGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, incidentGates.length);

  const findingPenalty = incidentFindings.filter((item) => item.blocksIncidentActivation).length * 7;
  const routingPressure =
    responseRoutingPlan.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, responseRoutingPlan.length * 4);

  const incidentBoardScore = clampScore(
    sourceAverage / 4 +
      intakeAverage / 4 +
      drillAverage / 4 +
      gateAverage / 4 +
      routingPressure -
      findingPenalty -
      context.openIncidentGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openIncidentGapCount * 8 +
        context.incidentIntakeItemCount * 6 +
        context.providerFailureItemCount * 6 +
        context.responseRoutingItemCount * 5 +
        context.rollbackActionItemCount * 6,
    ),
  );

  const incidentBoardStatus = bandFromScore(
    incidentBoardScore,
    incidentFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: RUNTIME_INCIDENT_RESPONSE_GUARDRAIL,
    incidentBoardScore,
    incidentBoardStatus,
    overallSeverity,
    sourceNodes,
    incidentIntakePlan,
    providerFailureDrill,
    responseRoutingPlan,
    rollbackActionCards,
    operatorCommunicationPlan,
    anomalyReplayPlan,
    incidentNoGoBoard,
    incidentGates,
    incidentBoardPack,
    incidentFindings,
    stagedRoadmap: {
      v165: "Runtime incident response board in zero-activation dry-run.",
      v166: "Compliance export activation only after explicit approval.",
      v167: "Manual dispatch activation only after explicit operational approval.",
      v168: "Provider runtime canary execution only after explicit approval.",
      v169: "Runtime incident handling only after explicit activation approval.",
    },
    redactedExportBundle: {
      exportId: "runtime_incident_response_board_v16_5_redacted_dry_run",
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
        "incident intake plan",
        "provider failure drill",
        "response routing plan",
        "rollback action cards",
        "operator communication plan",
        "anomaly replay plan",
        "incident no-go board",
        "incident gates",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Runtime incident response board is local dry-run only.",
      "No incident response activation, provider call, incident write, notification, storage activation, task creation, intervention creation or execution is performed.",
      "Provider failure drill is design-only.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V16.5 prepares incident response governance only.",
    ],
  };
}

export const aiRuntimeIncidentResponseBoardVersion = "V16.5";
