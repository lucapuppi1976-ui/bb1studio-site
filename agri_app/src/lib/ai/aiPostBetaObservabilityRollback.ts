export type PostBetaObservabilityRollbackMode = "dry-run" | "hardening-board-review";

export type PostBetaObservabilitySeverity = "info" | "watch" | "elevated" | "critical";

export type PostBetaObservabilityPriority = "low" | "medium" | "high" | "urgent";

export type PostBetaObservabilityReadinessBand =
  | "blocked"
  | "hardening-design-ready"
  | "manual-board-review-ready"
  | "observability-rollback-ready";

export type PostBetaObservabilityLane =
  | "incident-signal"
  | "rollback-tower"
  | "kill-switch-drill"
  | "reviewer-audit"
  | "anomaly-board"
  | "fallback-route"
  | "runtime-lock"
  | "human-signoff";

export interface PostBetaObservabilityGuardrail {
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
  postBetaObservabilityReady: true;
  rollbackHardeningReady: true;
  killSwitchDrillReady: true;
  incidentReviewReady: true;
}

export interface PostBetaObservabilityInput {
  incidentSignalItemCount?: number;
  rollbackTowerItemCount?: number;
  killSwitchItemCount?: number;
  reviewerAuditItemCount?: number;
  anomalyBoardItemCount?: number;
  fallbackRouteItemCount?: number;
  openHardeningGapCount?: number;
  onlineReadinessScore?: number;
  launchGateScore?: number;
  betaReadinessScore?: number;
  observabilityScore?: number;
  rollbackScore?: number;
  reviewerAuditScore?: number;
  fallbackScore?: number;
  hardeningLeadRole?: string;
}

export interface PostBetaSourceNode {
  id: string;
  lane: PostBetaObservabilityLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: PostBetaObservabilitySeverity;
  priority: PostBetaObservabilityPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface IncidentSignalItem {
  id: string;
  label: string;
  lane: PostBetaObservabilityLane;
  signalScore: number;
  severity: PostBetaObservabilitySeverity;
  signalPurpose: string;
  requiredSignals: string[];
  blockedOutcome: string;
}

export interface RollbackTowerHardeningItem {
  id: string;
  label: string;
  lane: PostBetaObservabilityLane;
  rollbackScore: number;
  priority: PostBetaObservabilityPriority;
  rollbackQuestion: string;
  requiredEvidence: string[];
  safeFallback: string;
}

export interface KillSwitchDrillItem {
  id: string;
  label: string;
  lane: PostBetaObservabilityLane;
  drillScore: number;
  severity: PostBetaObservabilitySeverity;
  drillQuestion: string;
  manualResolution: string;
}

export interface ReviewerAuditItem {
  id: string;
  label: string;
  lane: PostBetaObservabilityLane;
  auditScore: number;
  severity: PostBetaObservabilitySeverity;
  auditQuestion: string;
  eventFields: string[];
  blockedOutcome: string;
}

export interface AnomalyBoardItem {
  id: string;
  label: string;
  lane: PostBetaObservabilityLane;
  anomalyScore: number;
  priority: PostBetaObservabilityPriority;
  anomalyQuestion: string;
  requiredSignals: string[];
  manualResolution: string;
}

export interface FallbackRouteItem {
  id: string;
  label: string;
  lane: PostBetaObservabilityLane;
  fallbackScore: number;
  severity: PostBetaObservabilitySeverity;
  fallbackQuestion: string;
  safeFallback: string;
}

export interface RuntimeLockHardeningItem {
  id: string;
  label: string;
  lane: PostBetaObservabilityLane;
  lockScore: number;
  severity: PostBetaObservabilitySeverity;
  lockRule: string;
  blockedOutcome: string;
}

export interface PostBetaGoNoGoItem {
  id: string;
  label: string;
  lane: PostBetaObservabilityLane;
  goNoGoState: "no-go" | "design-only" | "hardening-ready";
  score: number;
  severity: PostBetaObservabilitySeverity;
  requiredBeforeGo: string[];
  safeOutcome: string;
}

export interface PostBetaHardeningGateItem {
  id: string;
  label: string;
  lane: PostBetaObservabilityLane;
  passed: boolean;
  score: number;
  severity: PostBetaObservabilitySeverity;
  reviewer: string;
  requiredEvidence: string[];
  hardStop: string;
}

export interface PostBetaBoardPackItem {
  id: string;
  label: string;
  lane: PostBetaObservabilityLane;
  packReady: boolean;
  readinessScore: number;
  reviewerCheck: string;
  includedSections: string[];
  blockedSections: string[];
}

export interface PostBetaFindingItem {
  id: string;
  label: string;
  lane: PostBetaObservabilityLane;
  severity: PostBetaObservabilitySeverity;
  reason: string;
  manualResolution: string;
  blocksRuntimeActivation: boolean;
}

export interface PostBetaObservabilityRollbackReport {
  generatedAt: string;
  mode: PostBetaObservabilityRollbackMode;
  context: Required<PostBetaObservabilityInput>;
  readiness: PostBetaObservabilityGuardrail;
  hardeningScore: number;
  hardeningStatus: PostBetaObservabilityReadinessBand;
  overallSeverity: PostBetaObservabilitySeverity;
  sourceNodes: PostBetaSourceNode[];
  incidentSignalPlan: IncidentSignalItem[];
  rollbackTowerHardening: RollbackTowerHardeningItem[];
  killSwitchDrillPlan: KillSwitchDrillItem[];
  reviewerAuditPlan: ReviewerAuditItem[];
  anomalyBoard: AnomalyBoardItem[];
  fallbackRoutePlan: FallbackRouteItem[];
  runtimeLockHardening: RuntimeLockHardeningItem[];
  goNoGoBoard: PostBetaGoNoGoItem[];
  hardeningGates: PostBetaHardeningGateItem[];
  hardeningBoardPack: PostBetaBoardPackItem[];
  hardeningFindings: PostBetaFindingItem[];
  stagedRoadmap: {
    v161: string;
    v162: string;
    v163: string;
    v164: string;
    v165: string;
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

export const POST_BETA_OBSERVABILITY_GUARDRAIL: PostBetaObservabilityGuardrail = {
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
  postBetaObservabilityReady: true,
  rollbackHardeningReady: true,
  killSwitchDrillReady: true,
  incidentReviewReady: true,
};

const priorityWeight: Record<PostBetaObservabilityPriority, number> = {
  low: 4,
  medium: 9,
  high: 16,
  urgent: 24,
};

function normalizeInput(input: PostBetaObservabilityInput): Required<PostBetaObservabilityInput> {
  return {
    incidentSignalItemCount: input.incidentSignalItemCount ?? 8,
    rollbackTowerItemCount: input.rollbackTowerItemCount ?? 8,
    killSwitchItemCount: input.killSwitchItemCount ?? 7,
    reviewerAuditItemCount: input.reviewerAuditItemCount ?? 7,
    anomalyBoardItemCount: input.anomalyBoardItemCount ?? 7,
    fallbackRouteItemCount: input.fallbackRouteItemCount ?? 7,
    openHardeningGapCount: input.openHardeningGapCount ?? 9,
    onlineReadinessScore: input.onlineReadinessScore ?? 84,
    launchGateScore: input.launchGateScore ?? 70,
    betaReadinessScore: input.betaReadinessScore ?? 70,
    observabilityScore: input.observabilityScore ?? 64,
    rollbackScore: input.rollbackScore ?? 66,
    reviewerAuditScore: input.reviewerAuditScore ?? 68,
    fallbackScore: input.fallbackScore ?? 66,
    hardeningLeadRole: input.hardeningLeadRole ?? "post beta hardening reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): PostBetaObservabilitySeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromSeverity(severity: PostBetaObservabilitySeverity): PostBetaObservabilityPriority {
  if (severity === "critical") return "urgent";
  if (severity === "elevated") return "high";
  if (severity === "watch") return "medium";
  return "low";
}

function bandFromScore(score: number, blockerCount: number): PostBetaObservabilityReadinessBand {
  if (blockerCount > 2 || score < 62) return "blocked";
  if (score >= 84 && blockerCount === 0) return "observability-rollback-ready";
  if (score >= 74) return "manual-board-review-ready";
  return "hardening-design-ready";
}

function buildSourceNode(
  id: string,
  lane: PostBetaObservabilityLane,
  title: string,
  sourceVersion: string,
  readinessBase: number,
  confidenceBase: number,
  pressure: number,
  reviewerFocus: string,
): PostBetaSourceNode {
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
            "Post-beta hardening remains below runtime activation threshold.",
            "Hardening board must resolve signals, rollback, fallback and reviewer audit gaps before any later runtime work.",
          ]
        : [],
  };
}

function buildSourceNodes(context: Required<PostBetaObservabilityInput>): PostBetaSourceNode[] {
  const incidentPressure = context.incidentSignalItemCount;
  const rollbackPressure = context.rollbackTowerItemCount * 2;
  const drillPressure = context.killSwitchItemCount * 2;
  const auditPressure = context.reviewerAuditItemCount;
  const anomalyPressure = context.anomalyBoardItemCount * 2;
  const gapPressure = context.openHardeningGapCount * 2;

  return [
    buildSourceNode(
      "PBOR_NODE_001",
      "incident-signal",
      "Controlled production beta gate",
      "V16.0",
      context.launchGateScore,
      context.onlineReadinessScore,
      incidentPressure,
      "Connect launch gate design to incident signal plan.",
    ),
    buildSourceNode(
      "PBOR_NODE_002",
      "rollback-tower",
      "Controlled beta readiness board",
      "V15.9",
      context.betaReadinessScore,
      context.rollbackScore,
      rollbackPressure,
      "Strengthen rollback tower before any later runtime path.",
    ),
    buildSourceNode(
      "PBOR_NODE_003",
      "kill-switch-drill",
      "Zero activation cutover baseline",
      "V16.0",
      context.launchGateScore,
      context.fallbackScore,
      drillPressure,
      "Keep kill-switch drill design-only and no-runtime.",
    ),
    buildSourceNode(
      "PBOR_NODE_004",
      "reviewer-audit",
      "Persistent human review workflow",
      "V15.3",
      context.reviewerAuditScore,
      context.betaReadinessScore,
      auditPressure,
      "Ensure reviewer audit can explain future decisions.",
    ),
    buildSourceNode(
      "PBOR_NODE_005",
      "anomaly-board",
      "Observability readiness",
      "V15.9",
      context.observabilityScore,
      context.rollbackScore,
      anomalyPressure,
      "Define anomaly board before any later runtime activation.",
    ),
    buildSourceNode(
      "PBOR_NODE_006",
      "fallback-route",
      "Dry-run fallback route",
      "V16.1",
      context.fallbackScore,
      context.onlineReadinessScore,
      gapPressure,
      "Ensure fallback returns to local reports and human review.",
    ),
    buildSourceNode(
      "PBOR_NODE_007",
      "runtime-lock",
      "Runtime locks",
      "V16.0",
      100,
      context.launchGateScore,
      gapPressure,
      "Keep all runtime locks active.",
    ),
    buildSourceNode(
      "PBOR_NODE_008",
      "human-signoff",
      "Hardening board signoff",
      "V16.1",
      context.reviewerAuditScore,
      context.rollbackScore,
      gapPressure,
      "Keep later runtime work blocked until a separate explicit release.",
    ),
  ];
}

function buildIncidentSignalPlan(context: Required<PostBetaObservabilityInput>): IncidentSignalItem[] {
  return [
    {
      id: "PBOR_SIGNAL_001",
      label: "Provider attempt signal design",
      lane: "incident-signal",
      signalScore: clampScore(context.observabilityScore),
      severity: severityFromConcern(100 - context.observabilityScore + context.incidentSignalItemCount * 4),
      signalPurpose: "Define future provider attempt visibility without runtime.",
      requiredSignals: ["attempt state", "contract result", "fallback state", "review hold"],
      blockedOutcome: "No provider runtime in V16.1.",
    },
    {
      id: "PBOR_SIGNAL_002",
      label: "Storage event signal design",
      lane: "incident-signal",
      signalScore: clampScore(context.betaReadinessScore),
      severity: "elevated",
      signalPurpose: "Define future storage event visibility without storage writes.",
      requiredSignals: ["storage gate", "restore marker", "retention marker"],
      blockedOutcome: "No storage activation.",
    },
    {
      id: "PBOR_SIGNAL_003",
      label: "Conversion preview signal design",
      lane: "incident-signal",
      signalScore: clampScore(context.reviewerAuditScore),
      severity: "elevated",
      signalPurpose: "Define future conversion visibility without work creation.",
      requiredSignals: ["preview state", "reviewer reason", "correction state"],
      blockedOutcome: "No task or intervention creation.",
    },
  ];
}

function buildRollbackTowerHardening(context: Required<PostBetaObservabilityInput>): RollbackTowerHardeningItem[] {
  return [
    {
      id: "PBOR_ROLLBACK_001",
      label: "Launch rollback hardening",
      lane: "rollback-tower",
      rollbackScore: clampScore(context.rollbackScore),
      priority: context.rollbackScore < 75 ? "urgent" : "high",
      rollbackQuestion: "Can any later runtime work return to zero-activation state?",
      requiredEvidence: ["rollback branch", "tag checkpoint", "release gate", "manual board note"],
      safeFallback: "Return to zero-activation dry-run posture.",
    },
    {
      id: "PBOR_ROLLBACK_002",
      label: "Provider rollback hardening",
      lane: "rollback-tower",
      rollbackScore: clampScore(context.launchGateScore),
      priority: "high",
      rollbackQuestion: "Can provider path be disabled immediately in a later runtime release?",
      requiredEvidence: ["runtime lock", "fallback route", "board stop"],
      safeFallback: "Disable provider path and keep local dry-run reports.",
    },
    {
      id: "PBOR_ROLLBACK_003",
      label: "Storage rollback hardening",
      lane: "rollback-tower",
      rollbackScore: clampScore(context.betaReadinessScore),
      priority: "urgent",
      rollbackQuestion: "Can future storage work be protected by restore proof?",
      requiredEvidence: ["restore proof", "storage lock", "retention proof"],
      safeFallback: "Storage remains disabled in V16.1.",
    },
  ];
}

function buildKillSwitchDrillPlan(context: Required<PostBetaObservabilityInput>): KillSwitchDrillItem[] {
  return [
    {
      id: "PBOR_DRILL_001",
      label: "Runtime stop drill",
      lane: "kill-switch-drill",
      drillScore: 100,
      severity: "critical",
      drillQuestion: "Can every runtime path remain stopped in V16.1?",
      manualResolution: "Runtime path remains locked and no activation occurs.",
    },
    {
      id: "PBOR_DRILL_002",
      label: "Provider stop drill",
      lane: "kill-switch-drill",
      drillScore: clampScore(context.fallbackScore),
      severity: severityFromConcern(100 - context.fallbackScore + context.killSwitchItemCount * 4),
      drillQuestion: "Can a future provider issue return to local dry-run?",
      manualResolution: "Fallback route returns to local report and human review.",
    },
    {
      id: "PBOR_DRILL_003",
      label: "Conversion stop drill",
      lane: "kill-switch-drill",
      drillScore: 100,
      severity: "critical",
      drillQuestion: "Can future work creation remain blocked?",
      manualResolution: "Task, intervention and execution paths remain locked.",
    },
  ];
}

function buildReviewerAuditPlan(context: Required<PostBetaObservabilityInput>): ReviewerAuditItem[] {
  return [
    {
      id: "PBOR_AUDIT_001",
      label: "Reviewer decision audit",
      lane: "reviewer-audit",
      auditScore: clampScore(context.reviewerAuditScore),
      severity: severityFromConcern(100 - context.reviewerAuditScore + context.reviewerAuditItemCount * 4),
      auditQuestion: "Can reviewer decisions be explained later?",
      eventFields: ["review state", "reviewer role", "reason note", "board decision"],
      blockedOutcome: "No review persistence in V16.1.",
    },
    {
      id: "PBOR_AUDIT_002",
      label: "Hardening board audit",
      lane: "reviewer-audit",
      auditScore: clampScore(context.betaReadinessScore),
      severity: "elevated",
      auditQuestion: "Can hardening board decisions be replayed conceptually?",
      eventFields: ["gate id", "score", "finding", "manual resolution"],
      blockedOutcome: "No audit write.",
    },
    {
      id: "PBOR_AUDIT_003",
      label: "Fallback audit design",
      lane: "reviewer-audit",
      auditScore: clampScore(context.fallbackScore),
      severity: "elevated",
      auditQuestion: "Can fallback route decisions be reviewed by humans?",
      eventFields: ["fallback route", "stop reason", "reviewer note"],
      blockedOutcome: "No fallback event persistence.",
    },
  ];
}

function buildAnomalyBoard(context: Required<PostBetaObservabilityInput>): AnomalyBoardItem[] {
  return [
    {
      id: "PBOR_ANOMALY_001",
      label: "Provider anomaly board",
      lane: "anomaly-board",
      anomalyScore: clampScore(context.observabilityScore),
      priority: "urgent",
      anomalyQuestion: "Can provider anomalies be held before any later runtime?",
      requiredSignals: ["contract failure", "unexpected output", "review hold"],
      manualResolution: "Hold and return to dry-run.",
    },
    {
      id: "PBOR_ANOMALY_002",
      label: "Storage anomaly board",
      lane: "anomaly-board",
      anomalyScore: clampScore(context.betaReadinessScore),
      priority: "high",
      anomalyQuestion: "Can storage anomalies stop future storage work?",
      requiredSignals: ["restore failure", "retention failure", "audit replay gap"],
      manualResolution: "Storage remains locked.",
    },
    {
      id: "PBOR_ANOMALY_003",
      label: "Conversion anomaly board",
      lane: "anomaly-board",
      anomalyScore: clampScore(context.reviewerAuditScore),
      priority: "high",
      anomalyQuestion: "Can unsafe conversion language stay blocked?",
      requiredSignals: ["product wording", "dose wording", "execution wording"],
      manualResolution: "Block conversion and require reviewer board.",
    },
  ];
}

function buildFallbackRoutePlan(context: Required<PostBetaObservabilityInput>): FallbackRouteItem[] {
  return [
    {
      id: "PBOR_FALLBACK_001",
      label: "Local report fallback",
      lane: "fallback-route",
      fallbackScore: clampScore(context.fallbackScore),
      severity: severityFromConcern(100 - context.fallbackScore + context.fallbackRouteItemCount * 4),
      fallbackQuestion: "Can every future issue return to local report mode?",
      safeFallback: "Return local dry-run report and keep human review required.",
    },
    {
      id: "PBOR_FALLBACK_002",
      label: "Manual review fallback",
      lane: "fallback-route",
      fallbackScore: clampScore(context.reviewerAuditScore),
      severity: "elevated",
      fallbackQuestion: "Can unresolved cases fall back to reviewer board?",
      safeFallback: "Hold for reviewer board and block conversion.",
    },
    {
      id: "PBOR_FALLBACK_003",
      label: "Release rollback fallback",
      lane: "fallback-route",
      fallbackScore: clampScore(context.rollbackScore),
      severity: "critical",
      fallbackQuestion: "Can a future release fall back to the latest live checkpoint?",
      safeFallback: "Use checkpoint branch and tag discipline.",
    },
  ];
}

function buildRuntimeLockHardening(): RuntimeLockHardeningItem[] {
  return [
    {
      id: "PBOR_LOCK_001",
      label: "Provider runtime lock",
      lane: "runtime-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Provider runtime remains disabled.",
      blockedOutcome: "providerCallAllowed=false",
    },
    {
      id: "PBOR_LOCK_002",
      label: "Storage runtime lock",
      lane: "runtime-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "AI storage remains disabled.",
      blockedOutcome: "storageActivationAllowed=false",
    },
    {
      id: "PBOR_LOCK_003",
      label: "Operations runtime lock",
      lane: "runtime-lock",
      lockScore: 100,
      severity: "critical",
      lockRule: "Task, intervention and execution automation remain disabled.",
      blockedOutcome: "automaticExecutionAllowed=false",
    },
  ];
}

function buildGoNoGoBoard(): PostBetaGoNoGoItem[] {
  return [
    {
      id: "PBOR_GONOGO_001",
      label: "Post-beta hardening design",
      lane: "human-signoff",
      goNoGoState: "hardening-ready",
      score: 100,
      severity: "watch",
      requiredBeforeGo: ["signals", "rollback tower", "fallback route", "runtime locks"],
      safeOutcome: "Hardening design only.",
    },
    {
      id: "PBOR_GONOGO_002",
      label: "Runtime activation",
      lane: "runtime-lock",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate activation release", "board signoff", "runtime proof"],
      safeOutcome: "Runtime remains locked in V16.1.",
    },
    {
      id: "PBOR_GONOGO_003",
      label: "Automated agronomic operation",
      lane: "runtime-lock",
      goNoGoState: "no-go",
      score: 0,
      severity: "critical",
      requiredBeforeGo: ["separate operations release", "human approval", "manual dispatch policy"],
      safeOutcome: "Automation remains blocked.",
    },
  ];
}

function buildHardeningGates(
  context: Required<PostBetaObservabilityInput>,
  sourceNodes: PostBetaSourceNode[],
): PostBetaHardeningGateItem[] {
  const blockedSourceCount = sourceNodes.filter((node) => node.blockers.length > 0).length;

  const rows = [
    {
      id: "PBOR_GATE_001",
      label: "Hardening remains zero-activation",
      lane: "runtime-lock" as PostBetaObservabilityLane,
      score: 100,
      reviewer: "post beta hardening reviewer",
      requiredEvidence: ["zeroActivationMode=true", "providerCalled=false", "storageActivationAllowed=false"],
      hardStop: "Do not activate runtime in V16.1.",
    },
    {
      id: "PBOR_GATE_002",
      label: "Incident signal plan is complete enough",
      lane: "incident-signal" as PostBetaObservabilityLane,
      score: context.observabilityScore - context.incidentSignalItemCount * 3,
      reviewer: "incident signal reviewer",
      requiredEvidence: ["provider signals", "storage signals", "conversion signals"],
      hardStop: "Do not proceed without incident signal plan.",
    },
    {
      id: "PBOR_GATE_003",
      label: "Rollback tower is complete enough",
      lane: "rollback-tower" as PostBetaObservabilityLane,
      score: context.rollbackScore - context.rollbackTowerItemCount * 3,
      reviewer: context.hardeningLeadRole,
      requiredEvidence: ["rollback branch", "tag checkpoint", "dry-run fallback"],
      hardStop: "Do not proceed without rollback tower.",
    },
    {
      id: "PBOR_GATE_004",
      label: "Kill-switch drill is complete enough",
      lane: "kill-switch-drill" as PostBetaObservabilityLane,
      score: context.fallbackScore - context.killSwitchItemCount * 3,
      reviewer: "fallback drill reviewer",
      requiredEvidence: ["runtime stop", "provider stop", "conversion stop"],
      hardStop: "Do not proceed without stop drill.",
    },
    {
      id: "PBOR_GATE_005",
      label: "Reviewer audit plan is complete enough",
      lane: "reviewer-audit" as PostBetaObservabilityLane,
      score: context.reviewerAuditScore - context.reviewerAuditItemCount * 3,
      reviewer: "reviewer audit board",
      requiredEvidence: ["review decision", "board decision", "fallback audit"],
      hardStop: "Do not proceed without reviewer audit plan.",
    },
    {
      id: "PBOR_GATE_006",
      label: "Source blockers are within hardening tolerance",
      lane: "human-signoff" as PostBetaObservabilityLane,
      score: 100 - blockedSourceCount * 12,
      reviewer: "operations reviewer",
      requiredEvidence: sourceNodes.map((node) => node.title),
      hardStop: "Resolve source blockers before observability-rollback-ready state.",
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

function buildBoardPack(context: Required<PostBetaObservabilityInput>): PostBetaBoardPackItem[] {
  return [
    {
      id: "PBOR_PACK_001",
      label: "Observability hardening packet",
      lane: "incident-signal",
      packReady: context.observabilityScore >= 60,
      readinessScore: clampScore(context.observabilityScore),
      reviewerCheck: "Confirm signals remain dry-run design only.",
      includedSections: ["incident signals", "anomaly board", "fallback route"],
      blockedSections: ["runtime activation", "provider calls"],
    },
    {
      id: "PBOR_PACK_002",
      label: "Rollback hardening packet",
      lane: "rollback-tower",
      packReady: context.rollbackScore >= 60,
      readinessScore: clampScore(context.rollbackScore),
      reviewerCheck: "Confirm rollback proof is required before later runtime work.",
      includedSections: ["rollback tower", "dry-run fallback", "checkpoint discipline"],
      blockedSections: ["irreversible runtime activation", "live storage activation"],
    },
    {
      id: "PBOR_PACK_003",
      label: "Reviewer audit hardening packet",
      lane: "reviewer-audit",
      packReady: context.reviewerAuditScore >= 60,
      readinessScore: clampScore(context.reviewerAuditScore),
      reviewerCheck: "Confirm reviewer audit can explain future decisions.",
      includedSections: ["decision audit", "board audit", "fallback audit"],
      blockedSections: ["unreviewed approval", "automatic dispatch"],
    },
  ];
}

function buildFindings(
  context: Required<PostBetaObservabilityInput>,
  sourceNodes: PostBetaSourceNode[],
  gates: PostBetaHardeningGateItem[],
  goNoGo: PostBetaGoNoGoItem[],
): PostBetaFindingItem[] {
  const findings: PostBetaFindingItem[] = [];

  if (context.openHardeningGapCount > 0) {
    findings.push({
      id: "PBOR_FINDING_001",
      label: "Open hardening gaps",
      lane: "human-signoff",
      severity: context.openHardeningGapCount >= 8 ? "critical" : "elevated",
      reason: `${context.openHardeningGapCount} hardening gaps remain before any later runtime work.`,
      manualResolution: "Resolve incident signal, rollback, stop drill and audit gaps in later gated releases.",
      blocksRuntimeActivation: true,
    });
  }

  if (context.observabilityScore < 70) {
    findings.push({
      id: "PBOR_FINDING_002",
      label: "Observability below threshold",
      lane: "incident-signal",
      severity: "critical",
      reason: "Observability is not mature enough for runtime activation.",
      manualResolution: "Complete incident signal and anomaly board proof.",
      blocksRuntimeActivation: true,
    });
  }

  if (context.rollbackScore < 70) {
    findings.push({
      id: "PBOR_FINDING_003",
      label: "Rollback below threshold",
      lane: "rollback-tower",
      severity: "critical",
      reason: "Rollback hardening is not mature enough for runtime activation.",
      manualResolution: "Complete rollback branch, tag checkpoint and dry-run fallback proof.",
      blocksRuntimeActivation: true,
    });
  }

  sourceNodes
    .filter((node) => node.blockers.length > 0)
    .forEach((node, index) => {
      findings.push({
        id: `PBOR_SOURCE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: `${node.title} blocker`,
        lane: node.lane,
        severity: node.severity,
        reason: node.blockers.join(" "),
        manualResolution: node.reviewerFocus,
        blocksRuntimeActivation: node.severity === "critical",
      });
    });

  gates
    .filter((gate) => !gate.passed)
    .forEach((gate, index) => {
      findings.push({
        id: `PBOR_GATE_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: gate.label,
        lane: gate.lane,
        severity: gate.severity,
        reason: `Hardening gate score is ${gate.score}/100.`,
        manualResolution: gate.hardStop,
        blocksRuntimeActivation: true,
      });
    });

  goNoGo
    .filter((item) => item.goNoGoState === "no-go")
    .forEach((item, index) => {
      findings.push({
        id: `PBOR_GONOGO_FINDING_${String(index + 1).padStart(3, "0")}`,
        label: item.label,
        lane: item.lane,
        severity: item.severity,
        reason: `Go/no-go state is ${item.goNoGoState}.`,
        manualResolution: item.safeOutcome,
        blocksRuntimeActivation: true,
      });
    });

  return findings;
}

export function buildAiPostBetaObservabilityRollbackReport(
  input: PostBetaObservabilityInput = {},
): PostBetaObservabilityRollbackReport {
  const context = normalizeInput(input);
  const sourceNodes = buildSourceNodes(context);
  const incidentSignalPlan = buildIncidentSignalPlan(context);
  const rollbackTowerHardening = buildRollbackTowerHardening(context);
  const killSwitchDrillPlan = buildKillSwitchDrillPlan(context);
  const reviewerAuditPlan = buildReviewerAuditPlan(context);
  const anomalyBoard = buildAnomalyBoard(context);
  const fallbackRoutePlan = buildFallbackRoutePlan(context);
  const runtimeLockHardening = buildRuntimeLockHardening();
  const goNoGoBoard = buildGoNoGoBoard();
  const hardeningGates = buildHardeningGates(context, sourceNodes);
  const hardeningBoardPack = buildBoardPack(context);
  const hardeningFindings = buildFindings(context, sourceNodes, hardeningGates, goNoGoBoard);

  const sourceAverage =
    sourceNodes.reduce((sum, node) => sum + node.readinessScore + node.confidenceScore, 0) /
    Math.max(1, sourceNodes.length * 2);

  const signalAverage =
    incidentSignalPlan.reduce((sum, item) => sum + item.signalScore, 0) /
    Math.max(1, incidentSignalPlan.length);

  const rollbackAverage =
    rollbackTowerHardening.reduce((sum, item) => sum + item.rollbackScore, 0) /
    Math.max(1, rollbackTowerHardening.length);

  const gateAverage =
    hardeningGates.reduce((sum, gate) => sum + gate.score, 0) /
    Math.max(1, hardeningGates.length);

  const findingPenalty = hardeningFindings.filter((item) => item.blocksRuntimeActivation).length * 7;
  const anomalyPressure =
    anomalyBoard.reduce((sum, item) => sum + priorityWeight[item.priority], 0) /
    Math.max(1, anomalyBoard.length * 4);

  const hardeningScore = clampScore(
    sourceAverage / 4 +
      signalAverage / 4 +
      rollbackAverage / 4 +
      gateAverage / 4 +
      anomalyPressure -
      findingPenalty -
      context.openHardeningGapCount,
  );

  const overallSeverity = severityFromConcern(
    clampScore(
      context.openHardeningGapCount * 8 +
        context.incidentSignalItemCount * 5 +
        context.rollbackTowerItemCount * 6 +
        context.killSwitchItemCount * 6 +
        context.anomalyBoardItemCount * 6,
    ),
  );

  const hardeningStatus = bandFromScore(
    hardeningScore,
    hardeningFindings.filter((item) => item.severity === "critical").length,
  );

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: POST_BETA_OBSERVABILITY_GUARDRAIL,
    hardeningScore,
    hardeningStatus,
    overallSeverity,
    sourceNodes,
    incidentSignalPlan,
    rollbackTowerHardening,
    killSwitchDrillPlan,
    reviewerAuditPlan,
    anomalyBoard,
    fallbackRoutePlan,
    runtimeLockHardening,
    goNoGoBoard,
    hardeningGates,
    hardeningBoardPack,
    hardeningFindings,
    stagedRoadmap: {
      v161: "Post-beta observability and rollback hardening in zero-activation dry-run.",
      v162: "Operational audit package and compliance export hardening.",
      v163: "Human-supervised agronomic operations cockpit.",
      v164: "Staged provider runtime beta only after explicit activation approval.",
      v165: "Runtime incident response board after explicit activation approval.",
    },
    redactedExportBundle: {
      exportId: "post_beta_observability_rollback_v16_1_redacted_dry_run",
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
        "incident signal plan",
        "rollback tower hardening",
        "kill-switch drill plan",
        "reviewer audit plan",
        "anomaly board",
        "fallback route plan",
        "runtime lock hardening",
        "go/no-go board",
        "hardening gates",
        "board pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Post-beta observability and rollback hardening is local dry-run only.",
      "No runtime activation, provider call, storage activation, review storage, task creation, intervention creation or execution is performed.",
      "Runtime locks remain active and zero-activation mode remains true.",
      "No product recommendation, dosage advice, public sharing, formal approval or production forecast is produced.",
      "V16.1 prepares hardening governance only.",
    ],
  };
}

export const aiPostBetaObservabilityRollbackVersion = "V16.1";
