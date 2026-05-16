export type AuthUserSchemaMode = "dry-run" | "auth-user-schema-readiness";
export type AuthUserSchemaSeverity = "info" | "watch" | "elevated" | "critical";
export type AuthUserSchemaPriority = "low" | "medium" | "high" | "urgent";
export type AuthUserSchemaStatus =
  | "blocked"
  | "schema-review-ready"
  | "auth-review-ready"
  | "account-creation-plan-ready";

export type AuthUserSchemaLane =
  | "auth_readiness"
  | "user_schema_readiness"
  | "role_language_fields"
  | "invite_creation_plan"
  | "revocation_plan"
  | "audit_boundary"
  | "no_go_board"
  | "human_signoff";

export interface AuthUserSchemaInput {
  authReadinessScore?: number;
  userSchemaReadinessScore?: number;
  roleFieldReadinessScore?: number;
  languageFieldReadinessScore?: number;
  invitePlanScore?: number;
  revocationPlanScore?: number;
  auditBoundaryScore?: number;
  openCriticalAuthIssueCount?: number;
  openMajorAuthIssueCount?: number;
  unresolvedSchemaFindingCount?: number;
  reviewerRole?: string;
}

export interface AuthUserSchemaBoardItem {
  id: string;
  label: string;
  lane: AuthUserSchemaLane;
  score: number;
  priority: AuthUserSchemaPriority;
  severity: AuthUserSchemaSeverity;
  question: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface AuthUserSchemaFindingItem {
  id: string;
  label: string;
  lane: AuthUserSchemaLane;
  severity: AuthUserSchemaSeverity;
  reason: string;
  manualResolution: string;
  blocksAccountCreation: boolean;
}

export const AUTH_USER_SCHEMA_READINESS_GUARDRAIL = {
  authUserSchemaReadinessReady: true,
  authReadinessAuditReady: true,
  userSchemaReadinessAuditReady: true,
  roleLanguageFieldReadinessReady: true,
  inviteCreationPlanReady: true,
  revocationPlanReady: true,
  auditBoundaryReady: true,
  liveUatLaunchGateReady: true,
  testerAccountActivationGateReady: true,
  liveUatReady: true,
  onlineControlledGo: true,
  controlledDryRunProductionReady: true,
  publicSignupAllowed: false,
  publicSignupPerformed: false,
  accountWriteAllowed: false,
  accountWritePerformed: false,
  testerAccountCreateAllowed: false,
  testerAccountCreatePerformed: false,
  testerInviteSendAllowed: false,
  testerInviteSendPerformed: false,
  testerInvitePersistenceAllowed: false,
  testerInvitePersistencePerformed: false,
  testerRoleWriteAllowed: false,
  testerRoleWritePerformed: false,
  testerLanguageWriteAllowed: false,
  testerLanguageWritePerformed: false,
  testerAccessRevocationAllowed: false,
  testerAccessRevocationPerformed: false,
  userSchemaWriteAllowed: false,
  userSchemaWritePerformed: false,
  authConfigWriteAllowed: false,
  authConfigWritePerformed: false,
  feedbackWriteAllowed: false,
  feedbackWritePerformed: false,
  bugWriteAllowed: false,
  bugWritePerformed: false,
  evidenceWriteAllowed: false,
  evidenceWritePerformed: false,
  sessionWriteAllowed: false,
  sessionWritePerformed: false,
  providerAiReady: false,
  providerCalled: false,
  providerCallAllowed: false,
  providerCallPerformed: false,
  providerRequestDispatchAllowed: false,
  providerResponseIntakeAllowed: false,
  providerResultPersistenceAllowed: false,
  persistenceReady: false,
  memoryPersistenceReady: false,
  persistencePerformed: false,
  memoryPersistencePerformed: false,
  dbPersistenceAllowed: false,
  memoryPersistenceAllowed: false,
  taskCreated: false,
  interventionCreated: false,
  automaticExecutionPerformed: false,
  automaticTaskCreationAllowed: false,
  automaticInterventionCreationAllowed: false,
  automaticExecutionAllowed: false,
  publicShareAllowed: false,
  publicSharePerformed: false,
  productPrescriptionAllowed: false,
  productPrescriptionPerformed: false,
  dosageAdviceAllowed: false,
  dosageAdvicePerformed: false,
  incidentRecordPersistenceAllowed: false,
  incidentRecordWriteAllowed: false,
  publicExportArtifactWriteAllowed: false,
  publicExportArtifactWritePerformed: false,
  operationalExecutionAllowed: false,
  operationalExecutionPerformed: false,
  executionCommandAllowed: false,
  executionCommandPerformed: false,
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

export interface AuthUserSchemaReport {
  generatedAt: string;
  mode: AuthUserSchemaMode;
  context: Required<AuthUserSchemaInput>;
  readiness: typeof AUTH_USER_SCHEMA_READINESS_GUARDRAIL;
  accountCreationPlanScore: number;
  accountCreationPlanStatus: AuthUserSchemaStatus;
  overallSeverity: AuthUserSchemaSeverity;
  authReadinessBoard: AuthUserSchemaBoardItem[];
  userSchemaReadinessBoard: AuthUserSchemaBoardItem[];
  roleLanguageFieldBoard: AuthUserSchemaBoardItem[];
  inviteCreationPlanBoard: AuthUserSchemaBoardItem[];
  revocationPlanBoard: AuthUserSchemaBoardItem[];
  auditBoundaryBoard: AuthUserSchemaBoardItem[];
  noGoBoard: AuthUserSchemaBoardItem[];
  findings: AuthUserSchemaFindingItem[];
  stagedRoadmap: Record<"v191" | "v192" | "v193" | "v194" | "v195", string>;
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

function normalizeInput(input: AuthUserSchemaInput): Required<AuthUserSchemaInput> {
  return {
    authReadinessScore: input.authReadinessScore ?? 78,
    userSchemaReadinessScore: input.userSchemaReadinessScore ?? 76,
    roleFieldReadinessScore: input.roleFieldReadinessScore ?? 82,
    languageFieldReadinessScore: input.languageFieldReadinessScore ?? 84,
    invitePlanScore: input.invitePlanScore ?? 80,
    revocationPlanScore: input.revocationPlanScore ?? 82,
    auditBoundaryScore: input.auditBoundaryScore ?? 90,
    openCriticalAuthIssueCount: input.openCriticalAuthIssueCount ?? 0,
    openMajorAuthIssueCount: input.openMajorAuthIssueCount ?? 1,
    unresolvedSchemaFindingCount: input.unresolvedSchemaFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "auth and user schema reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): AuthUserSchemaSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): AuthUserSchemaPriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: AuthUserSchemaLane,
  score: number,
  question: string,
  expectedEvidence: string[],
  safeOutcome: string,
): AuthUserSchemaBoardItem {
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

export function buildAiAuthUserSchemaReadinessReport(input: AuthUserSchemaInput = {}): AuthUserSchemaReport {
  const context = normalizeInput(input);

  const authReadinessBoard = [
    boardItem(
      "AUSR_AUTH_001",
      "Authentication flow readiness",
      "auth_readiness",
      context.authReadinessScore,
      "Is the existing auth flow ready to support invite-only testers?",
      ["protected admin", "session boundary", "manual reviewer"],
      "Auth flow requires review before real accounts.",
    ),
    boardItem(
      "AUSR_AUTH_002",
      "Public signup remains closed",
      "auth_readiness",
      100,
      "Can public registration remain disabled?",
      ["publicSignupAllowed=false", "accountWriteAllowed=false"],
      "No public signup is opened.",
    ),
  ];

  const userSchemaReadinessBoard = [
    boardItem(
      "AUSR_SCHEMA_001",
      "User schema readiness",
      "user_schema_readiness",
      context.userSchemaReadinessScore,
      "Is the user model ready for tester accounts without schema changes in this release?",
      ["schema review", "no migration", "no write"],
      "Schema is reviewed without changes.",
    ),
    boardItem(
      "AUSR_SCHEMA_002",
      "No schema mutation rule",
      "user_schema_readiness",
      100,
      "Can schema and migrations remain untouched?",
      ["schemaWriteAllowed=false", "migrationExecutionAllowed=false"],
      "No schema or migration write is performed.",
    ),
  ];

  const roleLanguageFieldBoard = [
    boardItem(
      "AUSR_ROLE_001",
      "Role field readiness",
      "role_language_fields",
      context.roleFieldReadinessScore,
      "Can tester roles be represented safely?",
      ["uat_reviewer", "uat_operator", "uat_observer", "disabled"],
      "Role assignment is reviewed before any write.",
    ),
    boardItem(
      "AUSR_LANG_001",
      "Preferred language field readiness",
      "role_language_fields",
      context.languageFieldReadinessScore,
      "Can tester language preference be represented safely?",
      ["it", "en", "es", "fr", "de", "pt"],
      "Language assignment is reviewed before any write.",
    ),
  ];

  const inviteCreationPlanBoard = [
    boardItem(
      "AUSR_INVITE_001",
      "Invite-only creation plan",
      "invite_creation_plan",
      context.invitePlanScore,
      "Can future tester creation remain invite-only and manual?",
      ["reviewer approval", "manual provisioning", "revocation path"],
      "Invite-only creation plan is ready for review.",
    ),
    boardItem(
      "AUSR_INVITE_002",
      "No invite send rule",
      "invite_creation_plan",
      100,
      "Can invite sending remain blocked in V19.1?",
      ["testerInviteSendAllowed=false", "testerInviteSendPerformed=false"],
      "No invite is sent.",
    ),
  ];

  const revocationPlanBoard = [
    boardItem(
      "AUSR_REVOKE_001",
      "Revocation plan readiness",
      "revocation_plan",
      context.revocationPlanScore,
      "Can tester access be disabled if needed?",
      ["disabled role", "manual reviewer", "admin owner"],
      "Revocation plan is reviewed before activation.",
    ),
  ];

  const auditBoundaryBoard = [
    boardItem(
      "AUSR_AUDIT_001",
      "Audit boundary no-write",
      "audit_boundary",
      context.auditBoundaryScore,
      "Can the audit stay dry-run and redacted?",
      ["redactedOutputOnly=true", "accountWriteAllowed=false"],
      "Audit remains dry-run only.",
    ),
  ];

  const noGoBoard = [
    boardItem(
      "AUSR_NOGO_001",
      "Real account creation",
      "no_go_board",
      0,
      "Can real account creation happen in V19.1?",
      ["separate release required", "schema/auth review required"],
      "No-go: real account creation remains blocked.",
    ),
    boardItem(
      "AUSR_NOGO_002",
      "Schema migration",
      "no_go_board",
      0,
      "Can schema migration run in V19.1?",
      ["separate release required"],
      "No-go: schema and migrations remain untouched.",
    ),
    boardItem(
      "AUSR_NOGO_003",
      "Invite sending",
      "no_go_board",
      0,
      "Can tester invites be sent in V19.1?",
      ["separate release required"],
      "No-go: invite sending remains blocked.",
    ),
  ];

  const findings: AuthUserSchemaFindingItem[] = [];

  if (context.openCriticalAuthIssueCount > 0) {
    findings.push({
      id: "AUSR_FINDING_001",
      label: "Open critical auth issue",
      lane: "auth_readiness",
      severity: "critical",
      reason: String(context.openCriticalAuthIssueCount) + " critical auth issues remain open.",
      manualResolution: "Resolve critical auth issues before real tester account creation.",
      blocksAccountCreation: true,
    });
  }

  if (context.unresolvedSchemaFindingCount > 0) {
    findings.push({
      id: "AUSR_FINDING_002",
      label: "Unresolved schema finding",
      lane: "user_schema_readiness",
      severity: "critical",
      reason: String(context.unresolvedSchemaFindingCount) + " schema findings remain unresolved.",
      manualResolution: "Resolve schema findings before any account write path.",
      blocksAccountCreation: true,
    });
  }

  if (context.openMajorAuthIssueCount > 0) {
    findings.push({
      id: "AUSR_FINDING_003",
      label: "Open major auth issue",
      lane: "auth_readiness",
      severity: "watch",
      reason: String(context.openMajorAuthIssueCount) + " major auth issues remain open.",
      manualResolution: "Track and review before account activation.",
      blocksAccountCreation: false,
    });
  }

  const accountCreationPlanScore = clampScore(
    (context.authReadinessScore +
      context.userSchemaReadinessScore +
      context.roleFieldReadinessScore +
      context.languageFieldReadinessScore +
      context.invitePlanScore +
      context.revocationPlanScore +
      context.auditBoundaryScore) /
      7 -
      findings.filter((item) => item.blocksAccountCreation).length * 20,
  );

  const accountCreationPlanStatus: AuthUserSchemaStatus =
    findings.some((item) => item.blocksAccountCreation)
      ? "blocked"
      : accountCreationPlanScore >= 88
        ? "account-creation-plan-ready"
        : accountCreationPlanScore >= 80
          ? "auth-review-ready"
          : "schema-review-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: AUTH_USER_SCHEMA_READINESS_GUARDRAIL,
    accountCreationPlanScore,
    accountCreationPlanStatus,
    overallSeverity: severityFromConcern(
      context.openCriticalAuthIssueCount * 40 +
        context.openMajorAuthIssueCount * 20 +
        context.unresolvedSchemaFindingCount * 45,
    ),
    authReadinessBoard,
    userSchemaReadinessBoard,
    roleLanguageFieldBoard,
    inviteCreationPlanBoard,
    revocationPlanBoard,
    auditBoundaryBoard,
    noGoBoard,
    findings,
    stagedRoadmap: {
      v191: "Auth and user schema readiness audit for invite-only tester accounts.",
      v192: "Actual invite-only tester account creation only after schema and auth signoff.",
      v193: "Controlled UAT feedback persistence after explicit persistence approval.",
      v194: "Provider runtime activation only after provider approval and rollback proof.",
      v195: "Operational execution activation only after human approval and emergency stop proof.",
    },
    redactedExportBundle: {
      exportId: "auth_user_schema_readiness_v19_1_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "auth readiness",
        "user schema readiness",
        "role language fields",
        "invite creation plan",
        "revocation plan",
        "audit boundary",
        "no-go board",
        "findings",
        "safety summary",
      ],
    },
    safetySummary: [
      "Auth and user schema readiness audit is dry-run only.",
      "No real account creation, invite sending, role write, language write, access revocation, schema write or migration execution is performed.",
      "No public signup, provider call, AI persistence, feedback persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V19.1 prepares account creation planning without expanding activation scope.",
    ],
  };
}

export const aiAuthUserSchemaReadinessVersion = "V19.1";
