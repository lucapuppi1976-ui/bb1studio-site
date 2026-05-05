import {
  createDryRunProviderRequest,
  type DryRunDiagnosisInput,
} from "./photoDiagnosisDryRun";
import {
  createValidProviderResponseFixture,
  formatProviderValidationReport,
  validateProviderDiagnosisResponse,
  type ProviderResponseValidation,
} from "./photoDiagnosisProviderResponse";

export type AiDiagnosisPipelineInput = DryRunDiagnosisInput & {
  requestedBy?: string;
  reviewMode?: "human-review-required";
};

export type AiDiagnosisPipelineStep = {
  key: string;
  label: string;
  ok: boolean;
  detail: string;
};

export type AiDiagnosisPipelineDryRun = {
  mode: "pipeline-dry-run";
  ok: true;
  externalProviderCalled: false;
  providerCallsEnabled: false;
  persistenceAllowed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
  humanReviewRequired: true;
  input: AiDiagnosisPipelineInput;
  providerRequest: ReturnType<typeof createDryRunProviderRequest>;
  providerValidation: ProviderResponseValidation;
  diagnosisDraft: {
    summary: string;
    risk: "low" | "medium" | "high" | "critical";
    hypotheses: string[];
    immediateActions: string[];
    limitations: string[];
  };
  actionPlan: {
    priority: "low" | "medium" | "high" | "urgent";
    proposedTasks: string[];
    suggestedInterventions: string[];
    monitoringPlan: string[];
    escalationRules: string[];
  };
  reviewPacket: {
    reviewRequired: true;
    decisionOptions: string[];
    checklist: string[];
    safetyNotes: string[];
    nextSteps: string[];
  };
  steps: AiDiagnosisPipelineStep[];
  report: string;
};

function riskFromSeverity(severity: string): AiDiagnosisPipelineDryRun["diagnosisDraft"]["risk"] {
  if (severity === "critical") {
    return "critical";
  }

  if (severity === "high") {
    return "high";
  }

  if (severity === "medium") {
    return "medium";
  }

  return "low";
}

function priorityFromRisk(
  risk: AiDiagnosisPipelineDryRun["diagnosisDraft"]["risk"],
): AiDiagnosisPipelineDryRun["actionPlan"]["priority"] {
  if (risk === "critical") {
    return "urgent";
  }

  if (risk === "high") {
    return "high";
  }

  if (risk === "medium") {
    return "medium";
  }

  return "low";
}

function formatList(items: string[]) {
  return items.length > 0 ? items : ["dato non disponibile nel dry-run"];
}

export function createAiDiagnosisPipelineDryRun(
  input: AiDiagnosisPipelineInput = {},
): AiDiagnosisPipelineDryRun {
  const providerRequest = createDryRunProviderRequest(input);
  const providerCandidate = createValidProviderResponseFixture();
  const providerValidation = validateProviderDiagnosisResponse(providerCandidate);
  const normalized = providerValidation.normalized;
  const risk = riskFromSeverity(normalized.severity);
  const priority = priorityFromRisk(risk);

  const diagnosisDraft = {
    summary: normalized.visualSummary,
    risk,
    hypotheses: normalized.hypotheses.map(
      (item) => `${item.label} (${item.category}, confidence=${item.confidence})`,
    ),
    immediateActions: normalized.immediateActions.map(
      (item) => `${item.title}: ${item.description}`,
    ),
    limitations: [
      "Dry-run: nessuna foto è stata inviata a provider AI.",
      "La diagnosi resta ipotesi assistita.",
      "Revisione umana obbligatoria prima di interventi reali.",
    ],
  };

  const actionPlan = {
    priority,
    proposedTasks: [
      "Raccogliere foto aggiuntive della pianta intera.",
      "Raccogliere foto ravvicinate della pagina superiore e inferiore della foglia.",
      "Registrare condizioni irrigazione e trattamenti recenti.",
    ],
    suggestedInterventions: [
      "Nessun intervento automatico.",
      "Valutare interventi solo dopo revisione umana.",
    ],
    monitoringPlan: formatList(normalized.additionalChecks),
    escalationRules: formatList(normalized.escalationCriteria),
  };

  const reviewPacket = {
    reviewRequired: true as const,
    decisionOptions: [
      "approva con cautela",
      "richiede correzioni",
      "rifiuta bozza",
    ],
    checklist: [
      "verificare qualità foto",
      "verificare contesto pianta",
      "verificare ipotesi e confidenza",
      "verificare azioni immediate",
      "bloccare ogni automazione non revisionata",
    ],
    safetyNotes: [
      "Human review required.",
      "Non generare task automatici.",
      "Non generare interventi automatici.",
      "Non salvare risultati senza consenso esplicito.",
    ],
    nextSteps: [
      "completare intake",
      "validare risposta provider",
      "revisionare pacchetto",
      "solo dopo revisione creare eventuali attività manuali",
    ],
  };

  const steps = [
    {
      key: "intake",
      label: "Input diagnosi foto normalizzato",
      ok: true,
      detail: providerRequest.normalizedInput.imageFileName,
    },
    {
      key: "provider-request",
      label: "Provider request dry-run preparata",
      ok: providerRequest.externalProviderCalled === false,
      detail: "externalProviderCalled=false",
    },
    {
      key: "response-contract",
      label: "Risposta provider validata",
      ok: providerValidation.ok,
      detail: `failures=${providerValidation.failures.length}`,
    },
    {
      key: "diagnosis-draft",
      label: "Bozza diagnosi creata",
      ok: diagnosisDraft.hypotheses.length > 0,
      detail: `risk=${diagnosisDraft.risk}`,
    },
    {
      key: "action-plan",
      label: "Piano azione creato",
      ok: actionPlan.proposedTasks.length > 0,
      detail: `priority=${actionPlan.priority}`,
    },
    {
      key: "human-review",
      label: "Pacchetto revisione umana creato",
      ok: reviewPacket.reviewRequired === true,
      detail: "humanReviewRequired=true",
    },
  ];

  const report = [
    "AI Diagnosis Pipeline Dry-Run",
    "",
    `Provider called: false`,
    `Provider calls enabled: false`,
    `Persistence allowed: false`,
    `Automatic task creation allowed: false`,
    `Human review required: true`,
    "",
    "Provider validation:",
    formatProviderValidationReport(providerValidation),
    "",
    "Pipeline steps:",
    ...steps.map((step) => `- ${step.ok ? "OK" : "FAIL"} ${step.label}: ${step.detail}`),
  ].join("\n");

  return {
    mode: "pipeline-dry-run",
    ok: true,
    externalProviderCalled: false,
    providerCallsEnabled: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    humanReviewRequired: true,
    input,
    providerRequest,
    providerValidation,
    diagnosisDraft,
    actionPlan,
    reviewPacket,
    steps,
    report,
  };
}
