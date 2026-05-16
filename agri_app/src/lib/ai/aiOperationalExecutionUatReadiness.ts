export type ExecutionUatMode = "dry-run" | "execution-uat-readiness";
export type ExecutionUatSeverity = "info" | "watch" | "elevated" | "critical";
export type ExecutionUatPriority = "low" | "medium" | "high" | "urgent";
export type ExecutionUatStatus =
  | "blocked"
  | "readiness-design-ready"
  | "human-approval-review-ready"
  | "zero-execution-uat-ready";

export type ExecutionUatLane =
  | "execution_uat_readiness"
  | "human_approval_proof"
  | "emergency_stop_proof"
  | "command_boundary"
  | "dry_run_execution_scenario"
  | "rollback_decision"
  | "no_go_board"
  | "human_signoff";

export interface ExecutionUatInput {
  approvalProofScore?: number;
  emergencyStopProofScore?: number;
  commandBoundaryScore?: number;
  dryRunScenarioScore?: number;
  rollbackReadinessScore?: number;
  scenarioCount?: number;
  reviewedScenarioCount?: number;
  openCriticalIssueCount?: number;
  openMajorIssueCount?: number;
  unresolvedGuardrailFindingCount?: number;
  reviewerRole?: string;
}

export interface ExecutionUatBoardItem {
  id: string;
  label: string;
  lane: ExecutionUatLane;
  score: number;
  priority: ExecutionUatPriority;
  severity: ExecutionUatSeverity;
  question: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface ExecutionUatFindingItem {
  id: string;
  label: string;
  lane: ExecutionUatLane;
  severity: ExecutionUatSeverity;
  reason: string;
  manualResolution: string;
  blocksExecutionUat: boolean;
}

export const OPERATIONAL_EXECUTION_UAT_GUARDRAIL = {
  executionUatReadinessReady: true,
  humanApprovalProofReady: true,
  emergencyStopProofReady: true,
  commandBoundaryReady: true,
  dryRunExecutionScenarioReady: true,
  rollbackDecisionReady: true,
  liveUatReady: true,
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
  incidentRecordPersistenceAllowed: false,
  incidentRecordPersistencePerformed: false,
  incidentRecordWriteAllowed: false,
  incidentRecordWritePerformed: false,
  reviewPersistenceAllowed: false,
  reviewPersistencePerformed: false,
  providerCallExecutionAllowed: false,
  providerCallExecutionPerformed: false,
  providerRequestDispatchAllowed: false,
  providerRequestDispatchPerformed: false,
  providerResponseIntakeAllowed: false,
  providerResponseIntakePerformed: false,
  providerResultPersistenceAllowed: false,
  providerResultPersistencePerformed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
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

export interface ExecutionUatReport {
  generatedAt: string;
  mode: ExecutionUatMode;
  context: Required<ExecutionUatInput>;
  readiness: typeof OPERATIONAL_EXECUTION_UAT_GUARDRAIL;
  executionUatScore: number;
  executionUatStatus: ExecutionUatStatus;
  overallSeverity: ExecutionUatSeverity;
  humanApprovalProofBoard: ExecutionUatBoardItem[];
  emergencyStopProofBoard: ExecutionUatBoardItem[];
  commandBoundaryBoard: ExecutionUatBoardItem[];
  dryRunExecutionScenarioBoard: ExecutionUatBoardItem[];
  rollbackDecisionBoard: ExecutionUatBoardItem[];
  noGoBoard: ExecutionUatBoardItem[];
  findings: ExecutionUatFindingItem[];
  stagedRoadmap: Record<"v183" | "v184" | "v185" | "v186" | "v187", string>;
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

function normalizeInput(input: ExecutionUatInput): Required<ExecutionUatInput> {
  return {
    approvalProofScore: input.approvalProofScore ?? 84,
    emergencyStopProofScore: input.emergencyStopProofScore ?? 82,
    commandBoundaryScore: input.commandBoundaryScore ?? 92,
    dryRunScenarioScore: input.dryRunScenarioScore ?? 86,
    rollbackReadinessScore: input.rollbackReadinessScore ?? 84,
    scenarioCount: input.scenarioCount ?? 10,
    reviewedScenarioCount: input.reviewedScenarioCount ?? 0,
    openCriticalIssueCount: input.openCriticalIssueCount ?? 0,
    openMajorIssueCount: input.openMajorIssueCount ?? 0,
    unresolvedGuardrailFindingCount: input.unresolvedGuardrailFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "operational execution UAT reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): ExecutionUatSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): ExecutionUatPriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: ExecutionUatLane,
  score: number,
  question: string,
  expectedEvidence: string[],
  safeOutcome: string,
): ExecutionUatBoardItem {
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

export function buildAiOperationalExecutionUatReadinessReport(
  input: ExecutionUatInput = {},
): ExecutionUatReport {
  const context = normalizeInput(input);

  const humanApprovalProofBoard = [
    boardItem(
      "OEU_APPROVAL_001",
      "Human approval proof draft",
      "human_approval_proof",
      context.approvalProofScore,
      "Can human approval proof be reviewed without enabling execution?",
      ["humanReviewRequired=true", "humanExecutionApprovalAllowed=false", "manual approval note"],
      "Approval proof remains local and dry-run.",
    ),
    boardItem(
      "OEU_APPROVAL_002",
      "Final execution approval hold",
      "human_approval_proof",
      100,
      "Can final approval remain blocked?",
      ["operationalExecutionAllowed=false", "executionCommandAllowed=false"],
      "No execution approval is performed.",
    ),
  ];

  const emergencyStopProofBoard = [
    boardItem(
      "OEU_STOP_001",
      "Emergency stop proof draft",
      "emergency_stop_proof",
      context.emergencyStopProofScore,
      "Can emergency stop be reviewed without runtime configuration?",
      ["emergencyStopConfigured=false", "emergencyStopPerformed=false"],
      "Emergency stop remains proof-only.",
    ),
    boardItem(
      "OEU_STOP_002",
      "Unsafe output stop rule",
      "emergency_stop_proof",
      100,
      "Can product and dosage outputs remain blocked?",
      ["productPrescriptionAllowed=false", "dosageAdviceAllowed=false"],
      "Unsafe output classes remain blocked.",
    ),
  ];

  const commandBoundaryBoard = [
    boardItem(
      "OEU_COMMAND_001",
      "Execution command boundary",
      "command_boundary",
      100,
      "Can execution commands remain blocked?",
      ["executionCommandAllowed=false", "executionCommandPerformed=false"],
      "No command is issued.",
    ),
    boardItem(
      "OEU_COMMAND_002",
      "Notification boundary",
      "command_boundary",
      context.commandBoundaryScore,
      "Can execution notifications remain blocked?",
      ["executionNotificationAllowed=false", "executionNotificationPerformed=false"],
      "No execution notification is sent.",
    ),
  ];

  const dryRunExecutionScenarioBoard = [
    boardItem(
      "OEU_SCENARIO_001",
      "Dry-run scenario checklist",
      "dry_run_execution_scenario",
      context.dryRunScenarioScore,
      "Can scenarios be reviewed without execution?",
      ["scenario list", "manual reviewer", "no command state"],
      "Scenarios remain dry-run only.",
    ),
    boardItem(
      "OEU_SCENARIO_002",
      "No provider-derived execution",
      "dry_run_execution_scenario",
      100,
      "Can provider output avoid execution?",
      ["providerCalled=false", "providerResponseIntakeAllowed=false"],
      "No provider-derived execution is possible.",
    ),
  ];

  const rollbackDecisionBoard = [
    boardItem(
      "OEU_ROLLBACK_001",
      "Execution rollback readiness",
      "rollback_decision",
      context.rollbackReadinessScore,
      "Can future execution release return to zero-execution state?",
      ["rollback checkpoint", "live tag", "command blocked"],
      "Rollback remains available.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "OEU_NOGO_001",
      "Actual operational execution",
      "no_go_board",
      0,
      "Can actual execution run in V18.3?",
      ["separate release required", "human approval required", "emergency stop proof required"],
      "No-go: actual execution remains blocked.",
    ),
    boardItem(
      "OEU_NOGO_002",
      "Execution command dispatch",
      "no_go_board",
      0,
      "Can command dispatch run in V18.3?",
      ["executionCommandAllowed=false", "automaticExecutionAllowed=false"],
      "No-go: command dispatch remains blocked.",
    ),
  ];

  const findings: ExecutionUatFindingItem[] = [];

  if (context.openCriticalIssueCount > 0) {
    findings.push({
      id: "OEU_FINDING_001",
      label: "Open critical execution UAT issue",
      lane: "dry_run_execution_scenario",
      severity: "critical",
      reason: String(context.openCriticalIssueCount) + " critical execution UAT issues remain open.",
      manualResolution: "Resolve critical issues before expanding execution readiness testing.",
      blocksExecutionUat: true,
    });
  }

  if (context.unresolvedGuardrailFindingCount > 0) {
    findings.push({
      id: "OEU_FINDING_002",
      label: "Unresolved execution guardrail finding",
      lane: "command_boundary",
      severity: "critical",
      reason: String(context.unresolvedGuardrailFindingCount) + " guardrail findings remain open.",
      manualResolution: "Keep command, provider, persistence and execution paths locked.",
      blocksExecutionUat: true,
    });
  }

  const scenarioRatio = context.scenarioCount > 0 ? context.reviewedScenarioCount / context.scenarioCount : 0;

  const executionUatScore = clampScore(
    (context.approvalProofScore +
      context.emergencyStopProofScore +
      context.commandBoundaryScore +
      context.dryRunScenarioScore +
      context.rollbackReadinessScore) /
      5 +
      scenarioRatio * 10 -
      findings.length * 15,
  );

  const executionUatStatus: ExecutionUatStatus =
    findings.length > 0
      ? "blocked"
      : executionUatScore >= 88
        ? "zero-execution-uat-ready"
        : executionUatScore >= 80
          ? "human-approval-review-ready"
          : "readiness-design-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: OPERATIONAL_EXECUTION_UAT_GUARDRAIL,
    executionUatScore,
    executionUatStatus,
    overallSeverity: severityFromConcern(
      context.openCriticalIssueCount * 40 +
        context.openMajorIssueCount * 20 +
        context.unresolvedGuardrailFindingCount * 45,
    ),
    humanApprovalProofBoard,
    emergencyStopProofBoard,
    commandBoundaryBoard,
    dryRunExecutionScenarioBoard,
    rollbackDecisionBoard,
    noGoBoard,
    findings,
    stagedRoadmap: {
      v183: "Operational execution UAT readiness and emergency stop proof board.",
      v184: "Provider runtime activation only after explicit provider approval and rollback proof.",
      v185: "Data persistence activation only after schema and rollback governance proof.",
      v186: "Live UAT expansion only after pass/fail evidence review.",
      v187: "Execution activation only after human approval, emergency stop and command audit proof.",
    },
    redactedExportBundle: {
      exportId: "operational_execution_uat_readiness_v18_3_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "human approval proof",
        "emergency stop proof",
        "command boundary",
        "dry-run execution scenarios",
        "rollback decision",
        "no-go board",
        "findings",
        "safety summary",
      ],
    },
    safetySummary: [
      "Operational execution UAT readiness is dry-run only.",
      "No command, notification, provider call, AI persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Human approval and emergency stop are proof-only in V18.3.",
      "Human review remains mandatory.",
      "V18.3 tests execution readiness without expanding activation scope.",
    ],
  };
}

export const aiOperationalExecutionUatReadinessVersion = "V18.3";
