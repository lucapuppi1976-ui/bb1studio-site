import {
  createDiagnosisOrchestratorDryRun,
  formatDiagnosisOrchestratorDryRun,
  type DiagnosisOrchestratorDryRun,
} from "./photoDiagnosisOrchestratorDryRun";
import type { AiProviderRequestPreviewInput } from "./photoDiagnosisProviderRequest";
import { createValidEvidenceBundleFixture } from "./photoEvidenceBundle";

export type DiagnosisCaseFileStatus =
  | "draft"
  | "ready-for-human-review"
  | "requires-more-evidence"
  | "blocked-for-safety";

export type DiagnosisCaseFileAuditEntry = {
  step: string;
  actor: "system" | "operator" | "reviewer";
  status: "created" | "checked" | "blocked" | "exported";
  note: string;
};

export type DiagnosisCaseFile = {
  ok: true;
  mode: "diagnosis-case-file-dry-run";
  caseFileVersion: "agri-ai-case-file-v1";
  caseFileId: string;
  caseFileFingerprint: string;
  status: DiagnosisCaseFileStatus;
  generatedAtLabel: string;
  source: {
    orchestratorId: string;
    requestId: string;
    evidenceReadiness: string;
    evidenceScore: number;
    responseValid: boolean;
  };
  summary: {
    title: string;
    crop: string;
    locationHint: string;
    symptoms: string[];
    riskLevel: string;
    confidenceScore: number;
  };
  diagnosis: DiagnosisOrchestratorDryRun["syntheticProviderResponse"];
  operationalPlan: {
    proposedActions: string[];
    monitoringPlan: string[];
    escalationRules: string[];
    blockedActions: string[];
  };
  humanReview: {
    required: true;
    decision: "pending-human-review";
    checklist: string[];
    reviewerNotesRequired: true;
  };
  auditTrail: DiagnosisCaseFileAuditEntry[];
  exports: {
    reportText: string;
    jsonReady: true;
    redactedOutputOnly: true;
  };
  safety: {
    providerCalled: false;
    persistencePerformed: false;
    automaticTaskCreationPerformed: false;
    automaticInterventionCreationPerformed: false;
    allowedToExecute: false;
    humanReviewRequired: true;
    redactedOutputOnly: true;
  };
};

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `case-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function statusFromDryRun(dryRun: DiagnosisOrchestratorDryRun): DiagnosisCaseFileStatus {
  if (!dryRun.responseValidation.valid) {
    return "blocked-for-safety";
  }

  if (!dryRun.requestPreview.requestReady) {
    return "requires-more-evidence";
  }

  return "ready-for-human-review";
}

function createAuditTrail(dryRun: DiagnosisOrchestratorDryRun): DiagnosisCaseFileAuditEntry[] {
  return [
    {
      step: "evidence-bundle",
      actor: "system",
      status: dryRun.requestPreview.evidenceBundle.acceptedForAiPipeline ? "checked" : "blocked",
      note: `Bundle ${dryRun.requestPreview.evidenceBundle.readiness}, score ${dryRun.requestPreview.evidenceBundle.bundleScore}.`,
    },
    {
      step: "provider-request-preview",
      actor: "system",
      status: dryRun.requestPreview.requestReady ? "checked" : "blocked",
      note: "Payload provider-ready generato senza chiamata AI live.",
    },
    {
      step: "synthetic-provider-response",
      actor: "system",
      status: "created",
      note: "Risposta sintetica locale creata per dry-run.",
    },
    {
      step: "response-validation",
      actor: "system",
      status: dryRun.responseValidation.valid ? "checked" : "blocked",
      note: dryRun.responseValidation.valid
        ? "Schema minimo validato."
        : `Chiavi mancanti: ${dryRun.responseValidation.missingKeys.join(", ")}.`,
    },
    {
      step: "human-review",
      actor: "reviewer",
      status: "blocked",
      note: "In attesa di revisione umana obbligatoria prima di qualsiasi esecuzione.",
    },
  ];
}

function createReport(caseFile: Omit<DiagnosisCaseFile, "exports">) {
  return [
    "AI Diagnosis Case File",
    "",
    `Case file ID: ${caseFile.caseFileId}`,
    `Fingerprint: ${caseFile.caseFileFingerprint}`,
    `Version: ${caseFile.caseFileVersion}`,
    `Status: ${caseFile.status}`,
    "",
    "Summary:",
    `- Crop: ${caseFile.summary.crop}`,
    `- Location: ${caseFile.summary.locationHint}`,
    `- Symptoms: ${caseFile.summary.symptoms.join(", ") || "non dichiarati"}`,
    `- Risk level: ${caseFile.summary.riskLevel}`,
    `- Confidence score: ${caseFile.summary.confidenceScore}`,
    "",
    "Diagnosis:",
    caseFile.diagnosis.summary,
    "",
    "Proposed actions:",
    ...caseFile.operationalPlan.proposedActions.map((item) => `- ${item}`),
    "",
    "Monitoring plan:",
    ...caseFile.operationalPlan.monitoringPlan.map((item) => `- ${item}`),
    "",
    "Escalation rules:",
    ...caseFile.operationalPlan.escalationRules.map((item) => `- ${item}`),
    "",
    "Blocked actions:",
    ...caseFile.operationalPlan.blockedActions.map((item) => `- ${item}`),
    "",
    "Human review:",
    "- required: true",
    "- decision: pending-human-review",
    ...caseFile.humanReview.checklist.map((item) => `- ${item}`),
    "",
    "Audit trail:",
    ...caseFile.auditTrail.map((entry) => `- ${entry.step}: ${entry.status} — ${entry.note}`),
    "",
    "Safety:",
    "- providerCalled=false",
    "- persistencePerformed=false",
    "- automaticTaskCreationPerformed=false",
    "- automaticInterventionCreationPerformed=false",
    "- allowedToExecute=false",
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}

export function createDiagnosisCaseFile(
  input: AiProviderRequestPreviewInput = createValidEvidenceBundleFixture(),
): DiagnosisCaseFile {
  const dryRun = createDiagnosisOrchestratorDryRun(input);
  const bundle = dryRun.requestPreview.evidenceBundle;
  const diagnosis = dryRun.syntheticProviderResponse;
  const caseFileId = `ai-case-${dryRun.requestPreview.requestId}`;
  const caseFileFingerprint = fingerprint(
    [
      dryRun.orchestratorId,
      dryRun.requestPreview.requestId,
      bundle.bundleScore,
      bundle.readiness,
      diagnosis.summary,
      diagnosis.confidence.score,
    ].join("|"),
  );

  const base: Omit<DiagnosisCaseFile, "exports"> = {
    ok: true,
    mode: "diagnosis-case-file-dry-run",
    caseFileVersion: "agri-ai-case-file-v1",
    caseFileId,
    caseFileFingerprint,
    status: statusFromDryRun(dryRun),
    generatedAtLabel: "dry-run-generated-at-runtime",
    source: {
      orchestratorId: dryRun.orchestratorId,
      requestId: dryRun.requestPreview.requestId,
      evidenceReadiness: bundle.readiness,
      evidenceScore: bundle.bundleScore,
      responseValid: dryRun.responseValidation.valid,
    },
    summary: {
      title: "AI diagnosis case file",
      crop: bundle.context.suspectedCrop || "non dichiarata",
      locationHint: bundle.context.locationHint || "non dichiarata",
      symptoms: bundle.context.symptoms,
      riskLevel: diagnosis.severity.level,
      confidenceScore: diagnosis.confidence.score,
    },
    diagnosis,
    operationalPlan: {
      proposedActions: diagnosis.recommendedActions,
      monitoringPlan: diagnosis.monitoringPlan,
      escalationRules: [
        "Escalare a tecnico se severità alta o peggioramento rapido.",
        "Bloccare qualsiasi intervento regolato senza revisione umana.",
        "Richiedere nuove foto se evidenze incomplete o incoerenti.",
      ],
      blockedActions: [
        "Creazione automatica attività.",
        "Creazione automatica interventi.",
        "Prescrizione automatica prodotti.",
        "Persistenza automatica senza conferma.",
        "Esecuzione operativa senza revisione.",
      ],
    },
    humanReview: {
      required: true,
      decision: "pending-human-review",
      checklist: diagnosis.humanReview.checklist,
      reviewerNotesRequired: true,
    },
    auditTrail: createAuditTrail(dryRun),
    safety: {
      providerCalled: false,
      persistencePerformed: false,
      automaticTaskCreationPerformed: false,
      automaticInterventionCreationPerformed: false,
      allowedToExecute: false,
      humanReviewRequired: true,
      redactedOutputOnly: true,
    },
  };

  return {
    ...base,
    exports: {
      reportText: createReport(base),
      jsonReady: true,
      redactedOutputOnly: true,
    },
  };
}

export function formatDiagnosisCaseFile(caseFile: DiagnosisCaseFile) {
  return caseFile.exports.reportText;
}

export function createDiagnosisCaseFileFromDryRunReport(
  input: AiProviderRequestPreviewInput = createValidEvidenceBundleFixture(),
) {
  const caseFile = createDiagnosisCaseFile(input);
  const dryRun = createDiagnosisOrchestratorDryRun(input);

  return [
    formatDiagnosisOrchestratorDryRun(dryRun),
    "",
    "----- CASE FILE -----",
    "",
    formatDiagnosisCaseFile(caseFile),
  ].join("\n");
}
