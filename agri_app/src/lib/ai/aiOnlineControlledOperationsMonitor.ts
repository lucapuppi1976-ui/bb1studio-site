export type OnlineControlledOperationsMode = "dry-run" | "online-controlled-watchtower";
export type OnlineControlledSeverity = "info" | "watch" | "elevated" | "critical";
export type OnlineControlledPriority = "low" | "medium" | "high" | "urgent";
export type OnlineControlledReadinessBand =
  | "blocked"
  | "online-controlled-watch-ready"
  | "daily-ops-review-ready"
  | "controlled-production-dry-run-ready";

export type OnlineControlledLane =
  | "online_controlled_monitor"
  | "dry_run_production_watchtower"
  | "protected_endpoint_board"
  | "daily_ops_checklist"
  | "rollback_readiness"
  | "ai_guardrail_observation"
  | "live_route_observation"
  | "human_signoff";

export interface OnlineControlledOperationsInput {
  liveHealthScore?: number;
  liveReadyScore?: number;
  protectedEndpointScore?: number;
  adminRouteScore?: number;
  dryRunGuardrailScore?: number;
  rollbackReadinessScore?: number;
  openObservationCount?: number;
  openWatchItemCount?: number;
  unresolvedLiveRouteFindingCount?: number;
  unresolvedProtectedEndpointFindingCount?: number;
  unresolvedGuardrailFindingCount?: number;
  operatorRole?: string;
}

export interface OnlineControlledSourceNode {
  id: string;
  lane: OnlineControlledLane;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  confidenceScore: number;
  severity: OnlineControlledSeverity;
  priority: OnlineControlledPriority;
  reviewerFocus: string;
  blockers: string[];
}

export interface WatchtowerSignalItem {
  id: string;
  label: string;
  lane: OnlineControlledLane;
  signalScore: number;
  severity: OnlineControlledSeverity;
  signalMeaning: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface ProtectedEndpointBoardItem {
  id: string;
  label: string;
  lane: OnlineControlledLane;
  protected: boolean;
  boundaryScore: number;
  severity: OnlineControlledSeverity;
  endpointClass: string;
  expectedUnauthenticatedStatus: string;
  safeOutcome: string;
}

export interface DailyOpsChecklistItem {
  id: string;
  label: string;
  lane: OnlineControlledLane;
  checklistScore: number;
  priority: OnlineControlledPriority;
  manualCheck: string;
  requiredEvidence: string[];
  safeOutcome: string;
}

export interface RollbackReadinessItem {
  id: string;
  label: string;
  lane: OnlineControlledLane;
  rollbackScore: number;
  priority: OnlineControlledPriority;
  rollbackQuestion: string;
  safeFallback: string;
}

export interface AiGuardrailObservationItem {
  id: string;
  label: string;
  lane: OnlineControlledLane;
  observedState: "locked" | "dry-run-only" | "human-review-required";
  score: number;
  severity: OnlineControlledSeverity;
  expectedFalseFlags: string[];
  safeOutcome: string;
}

export interface LiveRouteObservationItem {
  id: string;
  label: string;
  lane: OnlineControlledLane;
  routeClass: string;
  expectedStatus: string;
  score: number;
  severity: OnlineControlledSeverity;
  observationRule: string;
}

export interface OnlineControlledFindingItem {
  id: string;
  label: string;
  lane: OnlineControlledLane;
  severity: OnlineControlledSeverity;
  reason: string;
  manualResolution: string;
  blocksOnlineControlledOperations: boolean;
}

export interface GoLiveEvidencePackItem {
  id: string;
  label: string;
  lane: OnlineControlledLane;
  packReady: boolean;
  readinessScore: number;
  evidenceSections: string[];
  blockedSections: string[];
}

export const ONLINE_CONTROLLED_OPERATIONS_GUARDRAIL = {
  onlineControlledGo: true,
  controlledDryRunProductionReady: true,
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
  operationalAiReady: false,
  providerActivationAllowed: false,
  providerActivationPerformed: false,
  providerRuntimeBetaAllowed: false,
  providerRuntimeBetaPerformed: false,
  providerRuntimeCanaryAllowed: false,
  providerRuntimeCanaryPerformed: false,
  providerCallExecutionAllowed: false,
  providerCallExecutionPerformed: false,
  explicitProviderApprovalAllowed: false,
  explicitProviderApprovalPerformed: false,
  providerRequestDispatchAllowed: false,
  providerRequestDispatchPerformed: false,
  providerResponseIntakeAllowed: false,
  providerResponseIntakePerformed: false,
  providerResponseReviewAllowed: false,
  providerResponseReviewPerformed: false,
  providerResultPersistenceAllowed: false,
  providerResultPersistencePerformed: false,
  productionRuntimeAllowed: false,
  productionRuntimePerformed: false,
  storageActivationAllowed: false,
  storageActivationPerformed: false,
  liveMigrationExecutionAllowed: false,
  liveMigrationExecutionPerformed: false,
  migrationExecutionAllowed: false,
  migrationExecutionPerformed: false,
  schemaWriteAllowed: false,
  schemaWritePerformed: false,
  reviewPersistenceAllowed: false,
  reviewPersistencePerformed: false,
  manualConversionAllowed: false,
  manualConversionPerformed: false,
  complianceExportAllowed: false,
  complianceExportPerformed: false,
  publicComplianceExportPublicationAllowed: false,
  publicComplianceExportPublicationPerformed: false,
  publicExportPackageWriteAllowed: false,
  publicExportPackageWritePerformed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  taskInterventionCreationAllowed: false,
  taskInterventionCreationPerformed: false,
  incidentHandlingAllowed: false,
  incidentHandlingPerformed: false,
  incidentWriteAllowed: false,
  incidentWritePerformed: false,
  incidentRecordWriteAllowed: false,
  incidentRecordWritePerformed: false,
  operationalExecutionAllowed: false,
  operationalExecutionPerformed: false,
  executionPreflightAllowed: false,
  executionPreflightPerformed: false,
  executionCommandAllowed: false,
  executionCommandPerformed: false,
  executionNotificationAllowed: false,
  executionNotificationPerformed: false,
  emergencyStopConfigured: false,
  emergencyStopPerformed: false,
  humanExecutionApprovalAllowed: false,
  humanExecutionApprovalPerformed: false,
  onlineControlledOperationsMonitorReady: true,
  dryRunProductionWatchtowerReady: true,
  protectedEndpointBoardReady: true,
  dailyOpsChecklistReady: true,
  rollbackReadinessReady: true,
} as const;

export interface OnlineControlledOperationsReport {
  generatedAt: string;
  mode: OnlineControlledOperationsMode;
  context: Required<OnlineControlledOperationsInput>;
  readiness: typeof ONLINE_CONTROLLED_OPERATIONS_GUARDRAIL;
  onlineControlledScore: number;
  onlineControlledStatus: OnlineControlledReadinessBand;
  overallSeverity: OnlineControlledSeverity;
  sourceNodes: OnlineControlledSourceNode[];
  watchtowerSignals: WatchtowerSignalItem[];
  protectedEndpointBoard: ProtectedEndpointBoardItem[];
  dailyOpsChecklist: DailyOpsChecklistItem[];
  rollbackReadinessBoard: RollbackReadinessItem[];
  aiGuardrailObservations: AiGuardrailObservationItem[];
  liveRouteObservations: LiveRouteObservationItem[];
  goLiveEvidencePack: GoLiveEvidencePackItem[];
  onlineControlledFindings: OnlineControlledFindingItem[];
  stagedRoadmap: Record<"v180" | "v181" | "v182" | "v183" | "v184", string>;
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

function normalizeInput(input: OnlineControlledOperationsInput): Required<OnlineControlledOperationsInput> {
  return {
    liveHealthScore: input.liveHealthScore ?? 92,
    liveReadyScore: input.liveReadyScore ?? 90,
    protectedEndpointScore: input.protectedEndpointScore ?? 88,
    adminRouteScore: input.adminRouteScore ?? 86,
    dryRunGuardrailScore: input.dryRunGuardrailScore ?? 94,
    rollbackReadinessScore: input.rollbackReadinessScore ?? 84,
    openObservationCount: input.openObservationCount ?? 3,
    openWatchItemCount: input.openWatchItemCount ?? 6,
    unresolvedLiveRouteFindingCount: input.unresolvedLiveRouteFindingCount ?? 0,
    unresolvedProtectedEndpointFindingCount: input.unresolvedProtectedEndpointFindingCount ?? 0,
    unresolvedGuardrailFindingCount: input.unresolvedGuardrailFindingCount ?? 0,
    operatorRole: input.operatorRole ?? "online controlled operations reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): OnlineControlledSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

export function buildAiOnlineControlledOperationsMonitorReport(
  input: OnlineControlledOperationsInput = {},
): OnlineControlledOperationsReport {
  const context = normalizeInput(input);

  const sourceNodes: OnlineControlledSourceNode[] = [
    {
      id: "OCOM_NODE_001",
      lane: "online_controlled_monitor",
      title: "Online controlled dry-run checkpoint",
      sourceVersion: "V18.0",
      readinessScore: context.liveReadyScore,
      confidenceScore: context.liveHealthScore,
      severity: severityFromConcern(100 - context.liveReadyScore),
      priority: "high",
      reviewerFocus: "Watch health, ready and live page continuity after go-live.",
      blockers: context.unresolvedLiveRouteFindingCount > 0 ? ["Resolve live route findings before extending online scope."] : [],
    },
    {
      id: "OCOM_NODE_002",
      lane: "dry_run_production_watchtower",
      title: "Dry-run production watchtower",
      sourceVersion: "V18.0",
      readinessScore: context.dryRunGuardrailScore,
      confidenceScore: context.rollbackReadinessScore,
      severity: severityFromConcern(100 - context.dryRunGuardrailScore),
      priority: "urgent",
      reviewerFocus: "Track no-call, no-write, no-execution state during production dry-run.",
      blockers: context.unresolvedGuardrailFindingCount > 0 ? ["Resolve AI guardrail findings before extending scope."] : [],
    },
  ];

  const watchtowerSignals: WatchtowerSignalItem[] = [
    {
      id: "OCOM_SIGNAL_001",
      label: "Live health observation",
      lane: "online_controlled_monitor",
      signalScore: context.liveHealthScore,
      severity: severityFromConcern(100 - context.liveHealthScore),
      signalMeaning: "Health endpoint should remain reachable in online controlled mode.",
      expectedEvidence: ["health route available", "ready route available", "photo diagnosis page available"],
      safeOutcome: "Online route observation continues.",
    },
    {
      id: "OCOM_SIGNAL_002",
      label: "Dry-run production guardrail",
      lane: "dry_run_production_watchtower",
      signalScore: context.dryRunGuardrailScore,
      severity: severityFromConcern(100 - context.dryRunGuardrailScore),
      signalMeaning: "AI modules remain dry-run only after go-live.",
      expectedEvidence: ["providerAiReady=false", "providerCalled=false", "persistencePerformed=false"],
      safeOutcome: "No AI live activation.",
    },
  ];

  const protectedEndpointBoard: ProtectedEndpointBoardItem[] = [
    {
      id: "OCOM_ENDPOINT_001",
      label: "Ops operational endpoint",
      lane: "protected_endpoint_board",
      protected: true,
      boundaryScore: 100,
      severity: "watch",
      endpointClass: "ops dry-run",
      expectedUnauthenticatedStatus: "401 or 403",
      safeOutcome: "Protected endpoint remains non-public.",
    },
    {
      id: "OCOM_ENDPOINT_002",
      label: "AI live endpoint absence",
      lane: "protected_endpoint_board",
      protected: true,
      boundaryScore: 100,
      severity: "critical",
      endpointClass: "forbidden public AI endpoint",
      expectedUnauthenticatedStatus: "404, 405, 401 or 403",
      safeOutcome: "No public AI live endpoint is available.",
    },
  ];

  const dailyOpsChecklist: DailyOpsChecklistItem[] = [
    {
      id: "OCOM_DAILY_001",
      label: "Morning health and readiness check",
      lane: "daily_ops_checklist",
      checklistScore: context.liveHealthScore,
      priority: "high",
      manualCheck: "Verify health, ready, photo diagnosis and admin operations routes.",
      requiredEvidence: ["health ok", "ready ok", "admin route monitored"],
      safeOutcome: "Daily live observation starts with known route status.",
    },
    {
      id: "OCOM_DAILY_002",
      label: "Dry-run guardrail review",
      lane: "daily_ops_checklist",
      checklistScore: context.dryRunGuardrailScore,
      priority: "urgent",
      manualCheck: "Confirm no provider call, no DB write, no execution and no automatic task creation.",
      requiredEvidence: ["ops quick check", "AI readiness check", "protected checks"],
      safeOutcome: "AI remains no-call/no-write.",
    },
  ];

  const rollbackReadinessBoard: RollbackReadinessItem[] = [
    {
      id: "OCOM_ROLLBACK_001",
      label: "Live checkpoint rollback posture",
      lane: "rollback_readiness",
      rollbackScore: context.rollbackReadinessScore,
      priority: context.rollbackReadinessScore < 80 ? "urgent" : "high",
      rollbackQuestion: "Can online controlled mode return to the previous live checkpoint?",
      safeFallback: "Use latest rollback branch or previous live tag.",
    },
  ];

  const aiGuardrailObservations: AiGuardrailObservationItem[] = [
    {
      id: "OCOM_GUARDRAIL_001",
      label: "Provider AI locked",
      lane: "ai_guardrail_observation",
      observedState: "locked",
      score: 100,
      severity: "critical",
      expectedFalseFlags: ["providerAiReady", "providerCalled", "providerCallExecutionAllowed"],
      safeOutcome: "No provider AI live call.",
    },
    {
      id: "OCOM_GUARDRAIL_002",
      label: "Write paths locked",
      lane: "ai_guardrail_observation",
      observedState: "locked",
      score: 100,
      severity: "critical",
      expectedFalseFlags: ["persistencePerformed", "taskCreated", "interventionCreated"],
      safeOutcome: "No AI DB write and no task/intervention creation.",
    },
    {
      id: "OCOM_GUARDRAIL_003",
      label: "Human review required",
      lane: "ai_guardrail_observation",
      observedState: "human-review-required",
      score: 100,
      severity: "watch",
      expectedFalseFlags: ["productPrescriptionAllowed", "dosageAdviceAllowed", "publicShareAllowed"],
      safeOutcome: "Human review remains mandatory.",
    },
  ];

  const liveRouteObservations: LiveRouteObservationItem[] = [
    {
      id: "OCOM_ROUTE_001",
      label: "Health route",
      lane: "live_route_observation",
      routeClass: "public health",
      expectedStatus: "2xx reachable",
      score: context.liveHealthScore,
      severity: severityFromConcern(100 - context.liveHealthScore),
      observationRule: "Health endpoint should remain available after go-live controlled tag.",
    },
    {
      id: "OCOM_ROUTE_002",
      label: "Ready route",
      lane: "live_route_observation",
      routeClass: "public readiness",
      expectedStatus: "2xx reachable",
      score: context.liveReadyScore,
      severity: severityFromConcern(100 - context.liveReadyScore),
      observationRule: "Ready endpoint should remain available after go-live controlled tag.",
    },
  ];

  const goLiveEvidencePack: GoLiveEvidencePackItem[] = [
    {
      id: "OCOM_PACK_001",
      label: "Online controlled evidence pack",
      lane: "online_controlled_monitor",
      packReady: context.liveHealthScore >= 80 && context.liveReadyScore >= 80,
      readinessScore: clampScore((context.liveHealthScore + context.liveReadyScore) / 2),
      evidenceSections: ["health route", "ready route", "photo diagnosis route", "admin route monitoring"],
      blockedSections: ["provider live", "write activation", "execution activation"],
    },
    {
      id: "OCOM_PACK_002",
      label: "Dry-run guardrail evidence pack",
      lane: "dry_run_production_watchtower",
      packReady: context.dryRunGuardrailScore >= 90,
      readinessScore: context.dryRunGuardrailScore,
      evidenceSections: ["AI readiness", "quick check", "protected checks", "no live AI endpoints"],
      blockedSections: ["provider call", "AI persistence", "task creation"],
    },
  ];

  const onlineControlledFindings: OnlineControlledFindingItem[] = [];

  if (context.unresolvedLiveRouteFindingCount > 0) {
    onlineControlledFindings.push({
      id: "OCOM_FINDING_001",
      label: "Unresolved live route findings",
      lane: "live_route_observation",
      severity: "critical",
      reason: String(context.unresolvedLiveRouteFindingCount) + " live route findings remain unresolved.",
      manualResolution: "Resolve live route health, ready or page availability before expanding scope.",
      blocksOnlineControlledOperations: true,
    });
  }

  if (context.unresolvedProtectedEndpointFindingCount > 0) {
    onlineControlledFindings.push({
      id: "OCOM_FINDING_002",
      label: "Unresolved protected endpoint findings",
      lane: "protected_endpoint_board",
      severity: "critical",
      reason: String(context.unresolvedProtectedEndpointFindingCount) + " protected endpoint findings remain unresolved.",
      manualResolution: "Confirm ops endpoints reject unauthenticated access.",
      blocksOnlineControlledOperations: true,
    });
  }

  if (context.unresolvedGuardrailFindingCount > 0) {
    onlineControlledFindings.push({
      id: "OCOM_FINDING_003",
      label: "Unresolved AI guardrail findings",
      lane: "ai_guardrail_observation",
      severity: "critical",
      reason: String(context.unresolvedGuardrailFindingCount) + " AI guardrail findings remain unresolved.",
      manualResolution: "Keep provider, write, execution and public export routes locked.",
      blocksOnlineControlledOperations: true,
    });
  }

  const onlineControlledScore = clampScore(
    (context.liveHealthScore +
      context.liveReadyScore +
      context.protectedEndpointScore +
      context.dryRunGuardrailScore +
      context.rollbackReadinessScore) /
      5 -
      onlineControlledFindings.length * 12 -
      context.openObservationCount,
  );

  const onlineControlledStatus: OnlineControlledReadinessBand =
    onlineControlledFindings.length > 0
      ? "blocked"
      : onlineControlledScore >= 88
        ? "controlled-production-dry-run-ready"
        : onlineControlledScore >= 80
          ? "daily-ops-review-ready"
          : "online-controlled-watch-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: ONLINE_CONTROLLED_OPERATIONS_GUARDRAIL,
    onlineControlledScore,
    onlineControlledStatus,
    overallSeverity: severityFromConcern(
      context.openWatchItemCount * 6 +
        context.openObservationCount * 8 +
        context.unresolvedLiveRouteFindingCount * 25 +
        context.unresolvedProtectedEndpointFindingCount * 30 +
        context.unresolvedGuardrailFindingCount * 35,
    ),
    sourceNodes,
    watchtowerSignals,
    protectedEndpointBoard,
    dailyOpsChecklist,
    rollbackReadinessBoard,
    aiGuardrailObservations,
    liveRouteObservations,
    goLiveEvidencePack,
    onlineControlledFindings,
    stagedRoadmap: {
      v180: "Online controlled operations monitor and dry-run production watchtower.",
      v181: "Incident record persistence only after explicit governance final approval.",
      v182: "Public export artifact write only after explicit legal and privacy final approval.",
      v183: "Operational execution only after explicit human approval and emergency stop proof.",
      v184: "Provider runtime activation only after explicit provider approval and rollback proof.",
    },
    redactedExportBundle: {
      exportId: "online_controlled_operations_monitor_v18_0_redacted_dry_run",
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
        "watchtower signals",
        "protected endpoint board",
        "daily ops checklist",
        "rollback readiness board",
        "AI guardrail observations",
        "live route observations",
        "go-live evidence pack",
        "findings",
        "staged roadmap",
        "safety summary",
      ],
    },
    safetySummary: [
      "Online controlled operations monitor is dry-run only.",
      "No provider call, AI persistence, memory persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory for operational use.",
      "Protected ops endpoints remain protected.",
      "V18.0 monitors the online controlled state without expanding activation scope.",
    ],
  };
}

export const aiOnlineControlledOperationsMonitorVersion = "V18.0";
