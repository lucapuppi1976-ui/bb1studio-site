import {
  createAiProviderRequestPreview,
  formatAiProviderRequestPreview,
  type AiProviderRequestPreview,
  type AiProviderRequestPreviewInput,
} from "./photoDiagnosisProviderRequest";
import { createValidEvidenceBundleFixture } from "./photoEvidenceBundle";

export type OrchestratorStepStatus = "ready" | "warning" | "blocked";

export type DiagnosisOrchestratorStep = {
  id: string;
  label: string;
  status: OrchestratorStepStatus;
  detail: string;
};

export type SyntheticProviderDiagnosis = {
  summary: string;
  diagnosisHypotheses: Array<{
    label: string;
    probability: number;
    evidence: string[];
    againstEvidence: string[];
  }>;
  severity: {
    level: "low" | "medium" | "high" | "critical";
    reason: string;
  };
  confidence: {
    score: number;
    reason: string;
  };
  evidenceUsed: string[];
  missingEvidence: string[];
  recommendedActions: string[];
  monitoringPlan: string[];
  humanReview: {
    required: true;
    checklist: string[];
  };
  limitations: string[];
};

export type DiagnosisOrchestratorDryRun = {
  ok: true;
  mode: "diagnosis-orchestrator-dry-run";
  orchestratorId: string;
  completed: boolean;
  providerCalled: false;
  persistencePerformed: false;
  automaticTaskCreationPerformed: false;
  automaticInterventionCreationPerformed: false;
  requestPreview: AiProviderRequestPreview;
  syntheticProviderResponse: SyntheticProviderDiagnosis;
  responseValidation: {
    valid: boolean;
    missingKeys: string[];
    schemaName: "agri-photo-diagnosis-v1";
  };
  operationalDecision: {
    allowedToExecute: false;
    humanReviewRequired: true;
    reason: string;
  };
  steps: DiagnosisOrchestratorStep[];
  safety: {
    providerCallsEnabled: false;
    externalProviderCalled: false;
    clientProviderCallsAllowed: false;
    persistenceAllowed: false;
    automaticTaskCreationAllowed: false;
    automaticInterventionCreationAllowed: false;
    humanReviewRequired: true;
    redactedOutputOnly: true;
  };
};

const requiredProviderResponseKeys = [
  "summary",
  "diagnosisHypotheses",
  "severity",
  "confidence",
  "evidenceUsed",
  "missingEvidence",
  "recommendedActions",
  "monitoringPlan",
  "humanReview",
  "limitations",
];

function probabilityFromScore(score: number) {
  if (score >= 90) {
    return 0.72;
  }

  if (score >= 75) {
    return 0.61;
  }

  if (score >= 60) {
    return 0.46;
  }

  return 0.31;
}

function severityFromUrgency(urgency: string): SyntheticProviderDiagnosis["severity"]["level"] {
  if (urgency === "critical") {
    return "critical";
  }

  if (urgency === "high") {
    return "high";
  }

  if (urgency === "low") {
    return "low";
  }

  return "medium";
}

function createSyntheticProviderResponse(
  requestPreview: AiProviderRequestPreview,
): SyntheticProviderDiagnosis {
  const bundle = requestPreview.evidenceBundle;
  const symptoms = bundle.context.symptoms.length
    ? bundle.context.symptoms.join(", ")
    : "sintomi non dichiarati";

  const severityLevel = severityFromUrgency(bundle.context.urgency);
  const probability = probabilityFromScore(bundle.bundleScore);

  return {
    summary:
      bundle.readiness === "ready-for-assisted-diagnosis"
        ? `Bozza dry-run: possibile stress fitosanitario coerente con ${symptoms}.`
        : "Bozza dry-run incompleta: evidenze insufficienti per ipotesi robuste.",
    diagnosisHypotheses: [
      {
        label: "Stress fitosanitario da confermare",
        probability,
        evidence: [
          `Sintomi dichiarati: ${symptoms}.`,
          `Bundle score: ${bundle.bundleScore}/100.`,
          `Foto disponibili: ${bundle.evidenceItems.length}.`,
        ],
        againstEvidence: bundle.missingEvidence.length
          ? bundle.missingEvidence.map((item) => `Evidenza mancante: ${item}.`)
          : ["Nessuna evidenza contraria strutturata nel bundle dry-run."],
      },
      {
        label: "Stress ambientale o nutrizionale alternativo",
        probability: Math.max(0.1, Number((1 - probability).toFixed(2))),
        evidence: [
          "Ipotesi alternativa mantenuta perché la diagnosi da foto richiede sempre contesto agronomico.",
        ],
        againstEvidence: [
          "La pipeline non dispone ancora di analisi AI reale, storico trattamenti, meteo o analisi laboratorio.",
        ],
      },
    ],
    severity: {
      level: severityLevel,
      reason: `Severità derivata da urgenza operatore=${bundle.context.urgency} e score bundle=${bundle.bundleScore}.`,
    },
    confidence: {
      score: Number(Math.min(0.82, Math.max(0.22, probability)).toFixed(2)),
      reason:
        bundle.readiness === "ready-for-assisted-diagnosis"
          ? "Confidenza dry-run moderata: bundle completo ma senza provider AI reale."
          : "Confidenza dry-run bassa: bundle incompleto.",
    },
    evidenceUsed: bundle.evidenceItems.map((item) => `${item.id}:${item.role}:${item.quality.grade}`),
    missingEvidence: bundle.missingEvidence,
    recommendedActions: [
      "Isolare il caso come diagnosi assistita non definitiva.",
      "Confrontare le foto con osservazione in campo.",
      "Evitare interventi irreversibili senza revisione umana.",
      "Documentare evoluzione sintomi nelle prossime 24-72 ore.",
    ],
    monitoringPlan: [
      "Ripetere foto con stesso angolo e luce.",
      "Aggiungere pagina inferiore foglia se non presente.",
      "Annotare irrigazione, concimazione e trattamenti recenti.",
      "Escalare a tecnico se severità alta o peggioramento rapido.",
    ],
    humanReview: {
      required: true,
      checklist: [
        "Verificare che le foto rappresentino la pianta corretta.",
        "Confermare sintomi sul campo.",
        "Valutare possibili cause abiotiche.",
        "Approvare o correggere piano prima di attività operative.",
      ],
    },
    limitations: [
      "Risposta sintetica generata localmente.",
      "Nessuna chiamata provider AI eseguita.",
      "Nessuna diagnosi definitiva.",
      "Nessuna prescrizione di prodotti regolati.",
    ],
  };
}

function validateSyntheticProviderResponse(response: SyntheticProviderDiagnosis) {
  const record = response as unknown as Record<string, unknown>;
  const missingKeys = requiredProviderResponseKeys.filter((key) => !(key in record));

  return {
    valid:
      missingKeys.length === 0 &&
      response.humanReview?.required === true &&
      Array.isArray(response.diagnosisHypotheses) &&
      Array.isArray(response.recommendedActions),
    missingKeys,
    schemaName: "agri-photo-diagnosis-v1" as const,
  };
}

function createSteps(
  requestPreview: AiProviderRequestPreview,
  validation: DiagnosisOrchestratorDryRun["responseValidation"],
): DiagnosisOrchestratorStep[] {
  const bundle = requestPreview.evidenceBundle;

  return [
    {
      id: "evidence-bundle",
      label: "Evidence bundle",
      status: bundle.acceptedForAiPipeline ? "ready" : "warning",
      detail: `Readiness=${bundle.readiness}, score=${bundle.bundleScore}.`,
    },
    {
      id: "provider-request-preview",
      label: "Provider request preview",
      status: requestPreview.requestReady ? "ready" : "warning",
      detail: `Request ready=${requestPreview.requestReady}.`,
    },
    {
      id: "synthetic-provider-response",
      label: "Synthetic provider response",
      status: "ready",
      detail: "Risposta locale simulata. Nessun provider chiamato.",
    },
    {
      id: "response-validation",
      label: "Response validation",
      status: validation.valid ? "ready" : "blocked",
      detail: validation.valid
        ? "Schema minimo rispettato."
        : `Chiavi mancanti: ${validation.missingKeys.join(", ")}.`,
    },
    {
      id: "human-review",
      label: "Human review",
      status: "warning",
      detail: "Revisione umana obbligatoria prima di esecuzione operativa.",
    },
  ];
}

export function createDiagnosisOrchestratorDryRun(
  input: AiProviderRequestPreviewInput = createValidEvidenceBundleFixture(),
): DiagnosisOrchestratorDryRun {
  const requestPreview = createAiProviderRequestPreview(input);
  const syntheticProviderResponse = createSyntheticProviderResponse(requestPreview);
  const responseValidation = validateSyntheticProviderResponse(syntheticProviderResponse);
  const orchestratorId = `orchestrator-${requestPreview.requestId}`;
  const steps = createSteps(requestPreview, responseValidation);

  return {
    ok: true,
    mode: "diagnosis-orchestrator-dry-run",
    orchestratorId,
    completed: responseValidation.valid,
    providerCalled: false,
    persistencePerformed: false,
    automaticTaskCreationPerformed: false,
    automaticInterventionCreationPerformed: false,
    requestPreview,
    syntheticProviderResponse,
    responseValidation,
    operationalDecision: {
      allowedToExecute: false,
      humanReviewRequired: true,
      reason:
        "Dry-run operativo: output utile per revisione, ma non autorizza task, interventi o trattamenti automatici.",
    },
    steps,
    safety: {
      providerCallsEnabled: false,
      externalProviderCalled: false,
      clientProviderCallsAllowed: false,
      persistenceAllowed: false,
      automaticTaskCreationAllowed: false,
      automaticInterventionCreationAllowed: false,
      humanReviewRequired: true,
      redactedOutputOnly: true,
    },
  };
}

export function formatDiagnosisOrchestratorDryRun(run: DiagnosisOrchestratorDryRun) {
  return [
    "AI Diagnosis Orchestrator Dry Run",
    "",
    `Orchestrator ID: ${run.orchestratorId}`,
    `Completed: ${run.completed ? "yes" : "no"}`,
    `Provider called: ${run.providerCalled ? "yes" : "no"}`,
    `Persistence performed: ${run.persistencePerformed ? "yes" : "no"}`,
    `Automatic task creation performed: ${run.automaticTaskCreationPerformed ? "yes" : "no"}`,
    `Automatic intervention creation performed: ${run.automaticInterventionCreationPerformed ? "yes" : "no"}`,
    "",
    "Steps:",
    ...run.steps.map((step) => `- ${step.label}: ${step.status} — ${step.detail}`),
    "",
    "Request preview:",
    formatAiProviderRequestPreview(run.requestPreview),
    "",
    "Synthetic response summary:",
    run.syntheticProviderResponse.summary,
    "",
    "Validation:",
    `- valid: ${run.responseValidation.valid ? "yes" : "no"}`,
    `- schemaName: ${run.responseValidation.schemaName}`,
    `- missingKeys: ${run.responseValidation.missingKeys.join(", ") || "none"}`,
    "",
    "Operational decision:",
    `- allowedToExecute=false`,
    `- humanReviewRequired=true`,
    `- reason: ${run.operationalDecision.reason}`,
    "",
    "Safety:",
    "- providerCallsEnabled=false",
    "- externalProviderCalled=false",
    "- clientProviderCallsAllowed=false",
    "- persistenceAllowed=false",
    "- automaticTaskCreationAllowed=false",
    "- automaticInterventionCreationAllowed=false",
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
