export type FieldAutopilotMode = "dry-run" | "simulation-review";

export type FarmRiskPosture = "stable" | "watch" | "elevated" | "critical";

export type AutopilotLanePriority = "low" | "medium" | "high" | "urgent";

export type AutopilotCommandStatus = "blocked" | "simulation-only" | "review-ready";

export interface FieldAutopilotReadiness {
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
  autopilotSimulationReady: true;
  multiModuleCoordinationReady: true;
  dispatchPreviewReady: true;
  emergencyStopReady: true;
}

export interface FieldAutopilotControlRoomInput {
  cropFamily?: string;
  farmRiskPosture?: FarmRiskPosture;
  fieldCount?: number;
  activeCaseCount?: number;
  openScoutingLoops?: number;
  unresolvedEvidenceGaps?: number;
  memoryQualityScore?: number;
  knowledgeVaultCoverage?: number;
  interventionReadinessScore?: number;
  reviewerRole?: string;
}

export interface AutopilotModuleState {
  id: string;
  title: string;
  sourceVersion: string;
  readinessScore: number;
  signalStrength: number;
  status: "available" | "watch" | "blocked";
  blockers: string[];
  reviewerFocus: string;
}

export interface SimulationLane {
  id: string;
  lane: "scouting" | "evidence" | "risk" | "intervention-readiness" | "memory" | "governance";
  priority: AutopilotLanePriority;
  objective: string;
  simulatedOnlyActions: string[];
  requiredEvidence: string[];
  hardStops: string[];
}

export interface AutopilotCommandCandidate {
  id: string;
  title: string;
  status: AutopilotCommandStatus;
  priority: AutopilotLanePriority;
  fromModules: string[];
  rationale: string;
  manualDispatchRequirements: string[];
  blockedBecause: string[];
}

export interface AutopilotRiskGuard {
  id: string;
  severity: "info" | "warning" | "blocking";
  guardrail: string;
  reason: string;
  enforced: true;
}

export interface SimulationTimelineStep {
  sequence: number;
  label: string;
  simulatedDecision: string;
  humanReviewCheckpoint: string;
  noAutomationGuarantee: true;
}

export interface ManualReviewBoardItem {
  id: string;
  decisionTopic: string;
  reviewer: string;
  evidenceNeeded: string[];
  safeOutcome: string;
}

export interface FieldAutopilotControlRoomReport {
  generatedAt: string;
  mode: FieldAutopilotMode;
  context: Required<FieldAutopilotControlRoomInput>;
  readiness: FieldAutopilotReadiness;
  autopilotScore: number;
  autopilotStatus: "blocked" | "simulation-ready" | "review-ready";
  modules: AutopilotModuleState[];
  simulationLanes: SimulationLane[];
  commandCandidates: AutopilotCommandCandidate[];
  riskGuards: AutopilotRiskGuard[];
  simulationTimeline: SimulationTimelineStep[];
  manualReviewBoard: ManualReviewBoardItem[];
  redactedExportBundle: {
    exportId: string;
    includesFieldIdentifiers: false;
    includesPrivateNotes: false;
    includesProviderPayloads: false;
    includesOperationalSecrets: false;
    sections: string[];
  };
  safetySummary: string[];
}

export const FIELD_AUTOPILOT_READINESS: FieldAutopilotReadiness = {
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
  autopilotSimulationReady: true,
  multiModuleCoordinationReady: true,
  dispatchPreviewReady: true,
  emergencyStopReady: true,
};

const priorityWeight: Record<AutopilotLanePriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
  urgent: 4,
};

const postureWeight: Record<FarmRiskPosture, number> = {
  stable: 8,
  watch: 16,
  elevated: 26,
  critical: 34,
};

function normalizeInput(input: FieldAutopilotControlRoomInput): Required<FieldAutopilotControlRoomInput> {
  return {
    cropFamily: input.cropFamily ?? "tomato",
    farmRiskPosture: input.farmRiskPosture ?? "elevated",
    fieldCount: input.fieldCount ?? 6,
    activeCaseCount: input.activeCaseCount ?? 4,
    openScoutingLoops: input.openScoutingLoops ?? 3,
    unresolvedEvidenceGaps: input.unresolvedEvidenceGaps ?? 2,
    memoryQualityScore: input.memoryQualityScore ?? 78,
    knowledgeVaultCoverage: input.knowledgeVaultCoverage ?? 74,
    interventionReadinessScore: input.interventionReadinessScore ?? 67,
    reviewerRole: input.reviewerRole ?? "senior agronomist",
  };
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function buildModules(context: Required<FieldAutopilotControlRoomInput>): AutopilotModuleState[] {
  const evidencePenalty = context.unresolvedEvidenceGaps * 6;
  const casePressurePenalty = context.activeCaseCount * 3;

  return [
    {
      id: "AF-CR-MOD-001",
      title: "Scouting mission planner",
      sourceVersion: "V9.1",
      readinessScore: clamp(86 - context.openScoutingLoops * 4),
      signalStrength: clamp(70 + context.openScoutingLoops * 5),
      status: context.openScoutingLoops > 4 ? "watch" : "available",
      blockers: context.openScoutingLoops > 4 ? ["Too many open scouting loops for autopilot dispatch."] : [],
      reviewerFocus: "Confirm that every scouting route remains manually assigned.",
    },
    {
      id: "AF-CR-MOD-002",
      title: "Farm risk radar",
      sourceVersion: "V9.2",
      readinessScore: clamp(82 - casePressurePenalty),
      signalStrength: clamp(60 + postureWeight[context.farmRiskPosture]),
      status: context.farmRiskPosture === "critical" ? "watch" : "available",
      blockers: context.farmRiskPosture === "critical" ? ["Critical risk posture requires human command review."] : [],
      reviewerFocus: "Validate risk clustering before any operational interpretation.",
    },
    {
      id: "AF-CR-MOD-003",
      title: "Intervention readiness",
      sourceVersion: "V8.8",
      readinessScore: clamp(context.interventionReadinessScore - evidencePenalty),
      signalStrength: clamp(context.interventionReadinessScore),
      status: context.interventionReadinessScore < 70 ? "blocked" : "watch",
      blockers:
        context.interventionReadinessScore < 70
          ? ["Intervention readiness below review threshold."]
          : ["Readiness remains advisory and cannot dispatch actions."],
      reviewerFocus: "Check readiness blockers and keep any work package manual.",
    },
    {
      id: "AF-CR-MOD-004",
      title: "Memory quality guard",
      sourceVersion: "V9.9",
      readinessScore: clamp(context.memoryQualityScore),
      signalStrength: clamp(context.memoryQualityScore - 5),
      status: context.memoryQualityScore < 75 ? "blocked" : "available",
      blockers: context.memoryQualityScore < 75 ? ["Memory quality score below autopilot simulation threshold."] : [],
      reviewerFocus: "Use memory only as advisory context; do not write or promote memory.",
    },
    {
      id: "AF-CR-MOD-005",
      title: "Knowledge vault governance",
      sourceVersion: "V10.0",
      readinessScore: clamp(context.knowledgeVaultCoverage),
      signalStrength: clamp(context.knowledgeVaultCoverage + 4),
      status: context.knowledgeVaultCoverage < 72 ? "watch" : "available",
      blockers:
        context.knowledgeVaultCoverage < 72
          ? ["Knowledge vault coverage incomplete for fully coordinated simulation."]
          : [],
      reviewerFocus: "Confirm playbook applicability, conflicts and approval queue.",
    },
  ];
}

function buildSimulationLanes(context: Required<FieldAutopilotControlRoomInput>): SimulationLane[] {
  return [
    {
      id: "AF-CR-LANE-001",
      lane: "scouting",
      priority: context.openScoutingLoops >= 3 ? "high" : "medium",
      objective: "Simulate how field scouting should be sequenced before escalation.",
      simulatedOnlyActions: [
        "Rank field visits by risk and evidence gap density.",
        "Preview manual scout assignment order.",
        "Flag fields that need additional photo evidence.",
      ],
      requiredEvidence: [
        "Current symptom distribution",
        "Crop stage confirmation",
        "At least one human scout note",
      ],
      hardStops: [
        "No automatic task creation.",
        "No scout dispatch without reviewer approval.",
      ],
    },
    {
      id: "AF-CR-LANE-002",
      lane: "evidence",
      priority: context.unresolvedEvidenceGaps > 1 ? "urgent" : "medium",
      objective: "Simulate evidence completion before decisions are prepared.",
      simulatedOnlyActions: [
        "Group evidence gaps by crop, case and severity.",
        "Preview missing observation checklist.",
        "Downgrade confidence when evidence remains weak.",
      ],
      requiredEvidence: [
        "Photo evidence bundle",
        "Differential diagnosis matrix",
        "Knowledge vault threshold review",
      ],
      hardStops: [
        "No diagnosis finalization.",
        "No direct treatment or dosage output.",
      ],
    },
    {
      id: "AF-CR-LANE-003",
      lane: "risk",
      priority: context.farmRiskPosture === "critical" ? "urgent" : "high",
      objective: "Simulate farm-level risk posture without creating interventions.",
      simulatedOnlyActions: [
        "Rank active cases by operational risk.",
        "Identify conflicting module signals.",
        "Prepare manual command board topics.",
      ],
      requiredEvidence: [
        "Risk radar summary",
        "Temporal trend signal",
        "Human reviewer confirmation",
      ],
      hardStops: [
        "No automatic escalation.",
        "No public sharing.",
      ],
    },
    {
      id: "AF-CR-LANE-004",
      lane: "intervention-readiness",
      priority: context.interventionReadinessScore < 70 ? "high" : "medium",
      objective: "Simulate readiness review while blocking all execution.",
      simulatedOnlyActions: [
        "Preview readiness blockers.",
        "Suggest manual review topics.",
        "Prepare work-order discussion only.",
      ],
      requiredEvidence: [
        "Intervention readiness report",
        "Execution gate state",
        "Manual reviewer signoff",
      ],
      hardStops: [
        "No task creation.",
        "No intervention creation.",
        "No automatic execution.",
      ],
    },
    {
      id: "AF-CR-LANE-005",
      lane: "governance",
      priority: "high",
      objective: "Simulate governance approval sequencing for expert playbooks.",
      simulatedOnlyActions: [
        "Preview approval board order.",
        "Surface knowledge conflicts.",
        "Prepare rollback topics.",
      ],
      requiredEvidence: [
        "Knowledge vault approval queue",
        "Memory quality guard result",
        "Conflict register review",
      ],
      hardStops: [
        "No memory write.",
        "No memory promotion.",
        "No provider call.",
      ],
    },
  ];
}

function buildCommandCandidates(
  modules: AutopilotModuleState[],
  lanes: SimulationLane[],
): AutopilotCommandCandidate[] {
  const blockedModules = modules.filter((module) => module.status === "blocked");
  const urgentLanes = lanes.filter((lane) => lane.priority === "urgent");

  return [
    {
      id: "AF-CR-CMD-001",
      title: "Manual scouting acceleration preview",
      status: urgentLanes.length > 0 ? "review-ready" : "simulation-only",
      priority: urgentLanes.length > 0 ? "urgent" : "high",
      fromModules: ["V9.1", "V9.2", "V10.0"],
      rationale: "Evidence gaps and risk posture suggest a manual scouting sequence should be reviewed.",
      manualDispatchRequirements: [
        "Human agronomist approves the scout order.",
        "Operator confirms route feasibility.",
        "No automatic assignment is generated.",
      ],
      blockedBecause: [],
    },
    {
      id: "AF-CR-CMD-002",
      title: "Intervention readiness hold",
      status: blockedModules.length > 0 ? "blocked" : "simulation-only",
      priority: "high",
      fromModules: ["V8.8", "V7.8", "V9.9"],
      rationale: "Execution remains blocked until readiness, memory quality and evidence gates are reviewed.",
      manualDispatchRequirements: [
        "Review intervention readiness blockers.",
        "Confirm execution gate remains locked.",
        "Reject product and dosage requests.",
      ],
      blockedBecause: blockedModules.map((module) => module.title),
    },
    {
      id: "AF-CR-CMD-003",
      title: "Governance board pack preview",
      status: "review-ready",
      priority: "medium",
      fromModules: ["V9.0", "V9.9", "V10.0"],
      rationale: "The control room can prepare a redacted human governance board pack.",
      manualDispatchRequirements: [
        "Reviewer accepts redacted export only.",
        "Knowledge conflicts are discussed manually.",
        "No persistence or sharing is performed.",
      ],
      blockedBecause: [],
    },
  ];
}

function buildRiskGuards(context: Required<FieldAutopilotControlRoomInput>): AutopilotRiskGuard[] {
  const guards: AutopilotRiskGuard[] = [
    {
      id: "AF-CR-GUARD-001",
      severity: "blocking",
      guardrail: "Automatic execution disabled",
      reason: "The control room only simulates orchestration and cannot execute actions.",
      enforced: true,
    },
    {
      id: "AF-CR-GUARD-002",
      severity: "blocking",
      guardrail: "Provider calls disabled",
      reason: "All analysis is local and deterministic until provider activation is explicitly approved.",
      enforced: true,
    },
    {
      id: "AF-CR-GUARD-003",
      severity: "blocking",
      guardrail: "No product or dosage advice",
      reason: "Agronomic recommendations remain review topics, not prescriptions.",
      enforced: true,
    },
  ];

  if (context.unresolvedEvidenceGaps > 0) {
    guards.push({
      id: "AF-CR-GUARD-004",
      severity: "warning",
      guardrail: "Evidence gap downgrade",
      reason: "Open evidence gaps downgrade autopilot confidence and require field review.",
      enforced: true,
    });
  }

  return guards;
}

function buildManualReviewBoard(
  context: Required<FieldAutopilotControlRoomInput>,
  modules: AutopilotModuleState[],
): ManualReviewBoardItem[] {
  return [
    {
      id: "AF-CR-BOARD-001",
      decisionTopic: "Should scouting be reprioritized?",
      reviewer: context.reviewerRole,
      evidenceNeeded: ["Field route feasibility", "Open case severity", "Evidence gap map"],
      safeOutcome: "Manual scout order preview only.",
    },
    {
      id: "AF-CR-BOARD-002",
      decisionTopic: "Should intervention planning remain on hold?",
      reviewer: "operations reviewer",
      evidenceNeeded: modules.flatMap((module) => module.blockers).slice(0, 5),
      safeOutcome: "Execution remains blocked until a human gate is passed.",
    },
    {
      id: "AF-CR-BOARD-003",
      decisionTopic: "Can knowledge vault playbooks support the review?",
      reviewer: "knowledge governance reviewer",
      evidenceNeeded: ["Playbook applicability", "Conflict register", "Rollback triggers"],
      safeOutcome: "Advisory governance context only.",
    },
  ];
}

export function buildAiFieldAutopilotControlRoomReport(
  input: FieldAutopilotControlRoomInput = {},
): FieldAutopilotControlRoomReport {
  const context = normalizeInput(input);
  const modules = buildModules(context);
  const simulationLanes = buildSimulationLanes(context);
  const commandCandidates = buildCommandCandidates(modules, simulationLanes);
  const riskGuards = buildRiskGuards(context);
  const manualReviewBoard = buildManualReviewBoard(context, modules);

  const moduleAverage =
    modules.reduce((sum, module) => sum + module.readinessScore, 0) / Math.max(1, modules.length);

  const priorityPressure =
    simulationLanes.reduce((sum, lane) => sum + priorityWeight[lane.priority], 0) * 3;

  const blockerPenalty =
    modules.reduce((sum, module) => sum + module.blockers.length, 0) * 8 +
    context.unresolvedEvidenceGaps * 4;

  const autopilotScore = clamp(moduleAverage + priorityPressure - blockerPenalty);

  const autopilotStatus =
    modules.some((module) => module.status === "blocked") || context.unresolvedEvidenceGaps > 3
      ? "blocked"
      : autopilotScore >= 76
        ? "review-ready"
        : "simulation-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: FIELD_AUTOPILOT_READINESS,
    autopilotScore,
    autopilotStatus,
    modules,
    simulationLanes,
    commandCandidates,
    riskGuards,
    simulationTimeline: [
      {
        sequence: 1,
        label: "Collect local module signals",
        simulatedDecision: "Aggregate dry-run readiness, risk, memory and governance signals.",
        humanReviewCheckpoint: "Confirm that every source module remains advisory.",
        noAutomationGuarantee: true,
      },
      {
        sequence: 2,
        label: "Rank simulation lanes",
        simulatedDecision: "Prioritize scouting, evidence and readiness lanes by risk.",
        humanReviewCheckpoint: "Reviewer accepts or rejects lane priority.",
        noAutomationGuarantee: true,
      },
      {
        sequence: 3,
        label: "Prepare command candidates",
        simulatedDecision: "Create manual command topics without creating tasks or interventions.",
        humanReviewCheckpoint: "Human reviewer controls all downstream dispatch decisions.",
        noAutomationGuarantee: true,
      },
      {
        sequence: 4,
        label: "Lock execution",
        simulatedDecision: "Keep automatic execution, product prescription and dosage advice disabled.",
        humanReviewCheckpoint: "Safety reviewer verifies no prohibited output is present.",
        noAutomationGuarantee: true,
      },
    ],
    manualReviewBoard,
    redactedExportBundle: {
      exportId: "field-autopilot-control-room-v10-1-redacted-dry-run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalSecrets: false,
      sections: [
        "context",
        "module states",
        "simulation lanes",
        "command candidates",
        "risk guards",
        "manual review board",
        "safety summary",
      ],
    },
    safetySummary: [
      "The control room simulates coordination only.",
      "No provider call, persistence, task creation, intervention creation or execution is performed.",
      "No product prescription, dosage advice or public sharing is produced.",
      "Every candidate command is manual-review gated.",
      "Memory and knowledge signals remain local, advisory and redacted.",
    ],
  };
}

export const aiFieldAutopilotControlRoomVersion = "V10.1";
