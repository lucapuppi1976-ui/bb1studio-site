export type UatAccessMode = "dry-run" | "tester-access-readiness";
export type UatAccessSeverity = "info" | "watch" | "elevated" | "critical";
export type UatAccessPriority = "low" | "medium" | "high" | "urgent";
export type UatAccessStatus =
  | "blocked"
  | "access-design-ready"
  | "onboarding-review-ready"
  | "invite-only-uat-ready";

export type UatTesterRole =
  | "admin_internal"
  | "uat_reviewer"
  | "uat_operator"
  | "uat_observer"
  | "disabled";

export type UatPreferredLanguage =
  | "it"
  | "en"
  | "es"
  | "fr"
  | "de"
  | "pt";

export type UatAccessLane =
  | "tester_roster"
  | "role_matrix"
  | "invite_readiness"
  | "language_preference"
  | "onboarding_checklist"
  | "access_policy"
  | "revocation_plan"
  | "human_signoff";

export interface UatTesterAccessInput {
  testerDraftCount?: number;
  reviewerCount?: number;
  operatorCount?: number;
  observerCount?: number;
  missingLanguageCount?: number;
  missingRoleCount?: number;
  onboardingCompletionScore?: number;
  rolePolicyScore?: number;
  inviteReadinessScore?: number;
  revocationReadinessScore?: number;
  openAccessFindingCount?: number;
  reviewerRole?: string;
}

export interface UatTesterDraftItem {
  id: string;
  displayLabel: string;
  role: UatTesterRole;
  preferredLanguage: UatPreferredLanguage;
  accessState: "draft" | "ready" | "blocked";
  canAccessAdmin: boolean;
  canRunDryRunPanels: boolean;
  canViewEvidence: boolean;
  canManageOtherTesters: boolean;
  notes: string[];
}

export interface UatAccessBoardItem {
  id: string;
  label: string;
  lane: UatAccessLane;
  score: number;
  priority: UatAccessPriority;
  severity: UatAccessSeverity;
  question: string;
  expectedEvidence: string[];
  safeOutcome: string;
}

export interface UatAccessFindingItem {
  id: string;
  label: string;
  lane: UatAccessLane;
  severity: UatAccessSeverity;
  reason: string;
  manualResolution: string;
  blocksTesterOnboarding: boolean;
}

export const UAT_TESTER_ACCESS_GUARDRAIL = {
  uatTesterAccessProvisioningReady: true,
  roleBasedOnboardingReady: true,
  inviteOnlyAccessReady: true,
  testerRosterDraftReady: true,
  languagePreferenceReady: true,
  revocationPlanReady: true,
  publicSignupAllowed: false,
  publicSignupPerformed: false,
  accountWriteAllowed: false,
  accountWritePerformed: false,
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
  onlineControlledGo: true,
  liveUatReady: true,
  controlledDryRunProductionReady: true,
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

export interface UatTesterAccessReport {
  generatedAt: string;
  mode: UatAccessMode;
  context: Required<UatTesterAccessInput>;
  readiness: typeof UAT_TESTER_ACCESS_GUARDRAIL;
  accessProvisioningScore: number;
  accessProvisioningStatus: UatAccessStatus;
  overallSeverity: UatAccessSeverity;
  testerRosterDraft: UatTesterDraftItem[];
  roleMatrix: UatAccessBoardItem[];
  inviteReadinessBoard: UatAccessBoardItem[];
  languagePreferenceBoard: UatAccessBoardItem[];
  onboardingChecklist: UatAccessBoardItem[];
  accessPolicyBoard: UatAccessBoardItem[];
  revocationPlanBoard: UatAccessBoardItem[];
  findings: UatAccessFindingItem[];
  stagedRoadmap: Record<"v185" | "v186" | "v187" | "v188" | "v189", string>;
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

function normalizeInput(input: UatTesterAccessInput): Required<UatTesterAccessInput> {
  return {
    testerDraftCount: input.testerDraftCount ?? 6,
    reviewerCount: input.reviewerCount ?? 2,
    operatorCount: input.operatorCount ?? 3,
    observerCount: input.observerCount ?? 1,
    missingLanguageCount: input.missingLanguageCount ?? 0,
    missingRoleCount: input.missingRoleCount ?? 0,
    onboardingCompletionScore: input.onboardingCompletionScore ?? 82,
    rolePolicyScore: input.rolePolicyScore ?? 88,
    inviteReadinessScore: input.inviteReadinessScore ?? 80,
    revocationReadinessScore: input.revocationReadinessScore ?? 86,
    openAccessFindingCount: input.openAccessFindingCount ?? 0,
    reviewerRole: input.reviewerRole ?? "UAT access reviewer",
  };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function severityFromConcern(score: number): UatAccessSeverity {
  if (score >= 82) return "critical";
  if (score >= 64) return "elevated";
  if (score >= 42) return "watch";
  return "info";
}

function priorityFromScore(score: number): UatAccessPriority {
  if (score < 65) return "urgent";
  if (score < 75) return "high";
  if (score < 85) return "medium";
  return "low";
}

function boardItem(
  id: string,
  label: string,
  lane: UatAccessLane,
  score: number,
  question: string,
  expectedEvidence: string[],
  safeOutcome: string,
): UatAccessBoardItem {
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

function buildTesterRosterDraft(context: Required<UatTesterAccessInput>): UatTesterDraftItem[] {
  const roster: UatTesterDraftItem[] = [
    {
      id: "UAT_TESTER_001",
      displayLabel: "Reviewer interno 1",
      role: "uat_reviewer",
      preferredLanguage: "it",
      accessState: "ready",
      canAccessAdmin: false,
      canRunDryRunPanels: true,
      canViewEvidence: true,
      canManageOtherTesters: false,
      notes: ["Può validare evidenze e compilare osservazioni UAT."],
    },
    {
      id: "UAT_TESTER_002",
      displayLabel: "Operatore UAT 1",
      role: "uat_operator",
      preferredLanguage: "it",
      accessState: "ready",
      canAccessAdmin: false,
      canRunDryRunPanels: true,
      canViewEvidence: false,
      canManageOtherTesters: false,
      notes: ["Può eseguire sessioni live UAT controllate."],
    },
    {
      id: "UAT_TESTER_003",
      displayLabel: "Observer UAT 1",
      role: "uat_observer",
      preferredLanguage: "en",
      accessState: "ready",
      canAccessAdmin: false,
      canRunDryRunPanels: false,
      canViewEvidence: true,
      canManageOtherTesters: false,
      notes: ["Può leggere stato e risultati UAT redatti."],
    },
  ];

  if (context.testerDraftCount > roster.length) {
    roster.push({
      id: "UAT_TESTER_DRAFT",
      displayLabel: "Tester draft aggiuntivi",
      role: context.missingRoleCount > 0 ? "disabled" : "uat_operator",
      preferredLanguage: context.missingLanguageCount > 0 ? "it" : "en",
      accessState: context.missingRoleCount > 0 ? "blocked" : "draft",
      canAccessAdmin: false,
      canRunDryRunPanels: true,
      canViewEvidence: false,
      canManageOtherTesters: false,
      notes: ["Segnaposto per tester da completare manualmente."],
    });
  }

  return roster;
}

export function buildAiUatTesterAccessProvisioningReport(
  input: UatTesterAccessInput = {},
): UatTesterAccessReport {
  const context = normalizeInput(input);
  const testerRosterDraft = buildTesterRosterDraft(context);

  const roleMatrix = [
    boardItem(
      "UAT_ROLE_001",
      "Admin interno",
      "role_matrix",
      90,
      "Può gestire tester e controlli senza attivare AI live?",
      ["accesso admin limitato", "human review", "protected operations"],
      "Admin interno resta ruolo controllato.",
    ),
    boardItem(
      "UAT_ROLE_002",
      "Reviewer UAT",
      "role_matrix",
      context.rolePolicyScore,
      "Può validare evidenze senza scrivere dati operativi?",
      ["canViewEvidence=true", "write path bloccati"],
      "Reviewer UAT può validare solo in dry-run.",
    ),
    boardItem(
      "UAT_ROLE_003",
      "Operator UAT",
      "role_matrix",
      context.rolePolicyScore,
      "Può eseguire flussi UAT senza azioni irreversibili?",
      ["dry-run panels", "no execution", "no provider call"],
      "Operator UAT resta dentro flussi controllati.",
    ),
    boardItem(
      "UAT_ROLE_004",
      "Observer UAT",
      "role_matrix",
      90,
      "Può osservare senza modificare?",
      ["read-only", "redacted evidence"],
      "Observer UAT resta solo lettura.",
    ),
  ];

  const inviteReadinessBoard = [
    boardItem(
      "UAT_INVITE_001",
      "Invite-only access plan",
      "invite_readiness",
      context.inviteReadinessScore,
      "Gli inviti possono essere preparati senza invio reale?",
      ["publicSignupAllowed=false", "testerInviteSendAllowed=false"],
      "Gli inviti restano piano controllato.",
    ),
    boardItem(
      "UAT_INVITE_002",
      "No public signup",
      "invite_readiness",
      100,
      "La registrazione pubblica resta chiusa?",
      ["publicSignupAllowed=false", "publicSignupPerformed=false"],
      "Nessuna registrazione pubblica viene aperta.",
    ),
  ];

  const languagePreferenceBoard = [
    boardItem(
      "UAT_LANG_001",
      "Lingua preferita tester",
      "language_preference",
      context.missingLanguageCount === 0 ? 90 : 60,
      "Ogni tester ha una lingua iniziale assegnata?",
      ["preferredLanguage", "i18n readiness"],
      "Lingua preferita pronta per onboarding.",
    ),
  ];

  const onboardingChecklist = [
    boardItem(
      "UAT_ONBOARDING_001",
      "Checklist primo accesso",
      "onboarding_checklist",
      context.onboardingCompletionScore,
      "Il tester capisce cosa può e non può fare?",
      ["messaggio dry-run", "ruolo visibile", "human review"],
      "Onboarding orienta il tester senza ambiguità.",
    ),
    boardItem(
      "UAT_ONBOARDING_002",
      "Dry-run disclaimer",
      "onboarding_checklist",
      100,
      "È chiaro che AI live e write path sono disabilitati?",
      ["providerAiReady=false", "persistencePerformed=false"],
      "Il tester vede perimetro dry-run.",
    ),
  ];

  const accessPolicyBoard = [
    boardItem(
      "UAT_POLICY_001",
      "Access policy no-write",
      "access_policy",
      100,
      "Gli utenti UAT non possono attivare scritture operative?",
      ["accountWriteAllowed=false", "dbPersistenceAllowed=false"],
      "Nessuna scrittura operativa è disponibile.",
    ),
    boardItem(
      "UAT_POLICY_002",
      "Admin separation",
      "access_policy",
      88,
      "I ruoli UAT sono separati dagli admin interni?",
      ["role matrix", "least privilege"],
      "I tester non assumono poteri admin non necessari.",
    ),
  ];

  const revocationPlanBoard = [
    boardItem(
      "UAT_REVOKE_001",
      "Revocation plan",
      "revocation_plan",
      context.revocationReadinessScore,
      "L’accesso tester può essere revocato in una release dedicata?",
      ["disabled role", "manual owner", "audit note"],
      "La revoca è prevista ma non eseguita in questa versione.",
    ),
  ];

  const findings: UatAccessFindingItem[] = [];

  if (context.missingRoleCount > 0) {
    findings.push({
      id: "UAT_FINDING_001",
      label: "Tester senza ruolo",
      lane: "role_matrix",
      severity: "critical",
      reason: String(context.missingRoleCount) + " tester draft non hanno ruolo assegnato.",
      manualResolution: "Assegnare un ruolo UAT prima di invitare tester reali.",
      blocksTesterOnboarding: true,
    });
  }

  if (context.missingLanguageCount > 0) {
    findings.push({
      id: "UAT_FINDING_002",
      label: "Tester senza lingua",
      lane: "language_preference",
      severity: "elevated",
      reason: String(context.missingLanguageCount) + " tester draft non hanno lingua preferita.",
      manualResolution: "Assegnare lingua preferita prima del primo accesso.",
      blocksTesterOnboarding: false,
    });
  }

  if (context.openAccessFindingCount > 0) {
    findings.push({
      id: "UAT_FINDING_003",
      label: "Access finding aperti",
      lane: "access_policy",
      severity: "critical",
      reason: String(context.openAccessFindingCount) + " finding accesso restano aperti.",
      manualResolution: "Chiudere i finding accesso prima di UAT con tester reali.",
      blocksTesterOnboarding: true,
    });
  }

  const accessProvisioningScore = clampScore(
    (context.onboardingCompletionScore +
      context.rolePolicyScore +
      context.inviteReadinessScore +
      context.revocationReadinessScore) /
      4 -
      findings.filter((item) => item.blocksTesterOnboarding).length * 15,
  );

  const accessProvisioningStatus: UatAccessStatus =
    findings.some((item) => item.blocksTesterOnboarding)
      ? "blocked"
      : accessProvisioningScore >= 88
        ? "invite-only-uat-ready"
        : accessProvisioningScore >= 80
          ? "onboarding-review-ready"
          : "access-design-ready";

  return {
    generatedAt: new Date().toISOString(),
    mode: "dry-run",
    context,
    readiness: UAT_TESTER_ACCESS_GUARDRAIL,
    accessProvisioningScore,
    accessProvisioningStatus,
    overallSeverity: severityFromConcern(
      context.missingRoleCount * 35 +
        context.missingLanguageCount * 15 +
        context.openAccessFindingCount * 40,
    ),
    testerRosterDraft,
    roleMatrix,
    inviteReadinessBoard,
    languagePreferenceBoard,
    onboardingChecklist,
    accessPolicyBoard,
    revocationPlanBoard,
    findings,
    stagedRoadmap: {
      v185: "UAT tester access provisioning and role-based onboarding.",
      v186: "Multilingual UX completion and translation coverage gate.",
      v187: "User journey hardening and navigation polish.",
      v188: "UAT session feedback and bug evidence board.",
      v189: "Live UAT launch gate and tester readiness audit.",
    },
    redactedExportBundle: {
      exportId: "uat_tester_access_provisioning_v18_5_redacted_dry_run",
      includesFieldIdentifiers: false,
      includesPrivateNotes: false,
      includesProviderPayloads: false,
      includesOperationalInternalData: false,
      includesProductionForecasts: false,
      includesProductRecommendations: false,
      includesDosageGuidance: false,
      sections: [
        "context",
        "tester roster draft",
        "role matrix",
        "invite readiness",
        "language preferences",
        "onboarding checklist",
        "access policy",
        "revocation plan",
        "findings",
        "safety summary",
      ],
    },
    safetySummary: [
      "UAT tester access provisioning is dry-run only.",
      "No public signup, account write, invite send, role write or access revocation is performed.",
      "No provider call, AI persistence, task creation, intervention creation, public export write, incident write or operational execution is performed.",
      "Human review remains mandatory.",
      "V18.5 prepares tester onboarding without expanding activation scope.",
    ],
  };
}

export const aiUatTesterAccessProvisioningVersion = "V18.5";
