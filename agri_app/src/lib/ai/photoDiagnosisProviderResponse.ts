export type ProviderDiagnosisSeverity = "low" | "medium" | "high" | "critical";

export type ProviderDiagnosisHypothesis = {
  label: string;
  category: "pest" | "disease" | "nutrition" | "water" | "climate" | "unknown";
  confidence: number;
  evidence: string[];
  uncertainty: string[];
};

export type ProviderDiagnosisAction = {
  title: string;
  priority: "low" | "medium" | "high" | "urgent";
  description: string;
  safetyNote: string;
  requiresHumanReview: true;
};

export type ProviderDiagnosisResponseCandidate = {
  schemaVersion?: string;
  language?: string;
  visualSummary?: string;
  severity?: ProviderDiagnosisSeverity | string;
  confidence?: number;
  hypotheses?: ProviderDiagnosisHypothesis[];
  immediateActions?: ProviderDiagnosisAction[];
  additionalChecks?: string[];
  escalationCriteria?: string[];
  humanReviewRequired?: boolean;
  automaticTaskCreationAllowed?: boolean;
  persistenceAllowed?: boolean;
  providerMetadata?: {
    model?: string;
    mode?: string;
    externalProviderCalled?: boolean;
  };
};

export type ProviderResponseValidation = {
  ok: boolean;
  schemaVersion: string;
  failures: string[];
  warnings: string[];
  acceptedForHumanReview: boolean;
  normalized: {
    visualSummary: string;
    severity: ProviderDiagnosisSeverity;
    confidence: number;
    hypotheses: ProviderDiagnosisHypothesis[];
    immediateActions: ProviderDiagnosisAction[];
    additionalChecks: string[];
    escalationCriteria: string[];
    humanReviewRequired: true;
    automaticTaskCreationAllowed: false;
    persistenceAllowed: false;
  };
};

export const providerResponseSchemaVersion = "agri-ai-diagnosis-response.v1";

const severityValues = ["low", "medium", "high", "critical"] as const;
const categoryValues = ["pest", "disease", "nutrition", "water", "climate", "unknown"] as const;
const priorityValues = ["low", "medium", "high", "urgent"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function clampConfidence(value: unknown) {
  const numeric = asNumber(value, 0);
  return Math.max(0, Math.min(1, numeric));
}

function normalizeSeverity(value: unknown): ProviderDiagnosisSeverity {
  return severityValues.includes(value as ProviderDiagnosisSeverity)
    ? (value as ProviderDiagnosisSeverity)
    : "low";
}

function normalizeCategory(value: unknown): ProviderDiagnosisHypothesis["category"] {
  return categoryValues.includes(value as ProviderDiagnosisHypothesis["category"])
    ? (value as ProviderDiagnosisHypothesis["category"])
    : "unknown";
}

function normalizePriority(value: unknown): ProviderDiagnosisAction["priority"] {
  return priorityValues.includes(value as ProviderDiagnosisAction["priority"])
    ? (value as ProviderDiagnosisAction["priority"])
    : "low";
}

function normalizeHypotheses(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((item) => ({
      label: asString(item.label, "Ipotesi non specificata"),
      category: normalizeCategory(item.category),
      confidence: clampConfidence(item.confidence),
      evidence: asStringArray(item.evidence),
      uncertainty: asStringArray(item.uncertainty),
    }))
    .slice(0, 5);
}

function normalizeActions(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((item) => ({
      title: asString(item.title, "Azione non specificata"),
      priority: normalizePriority(item.priority),
      description: asString(item.description, "Descrizione non specificata"),
      safetyNote: asString(item.safetyNote, "Richiede revisione umana prima di procedere."),
      requiresHumanReview: true as const,
    }))
    .slice(0, 8);
}

export function createValidProviderResponseFixture(): ProviderDiagnosisResponseCandidate {
  return {
    schemaVersion: providerResponseSchemaVersion,
    language: "it",
    visualSummary: "Macchie fogliari e ingiallimento localizzato osservati nella foto.",
    severity: "medium",
    confidence: 0.42,
    hypotheses: [
      {
        label: "Stress idrico o nutrizionale",
        category: "water",
        confidence: 0.38,
        evidence: ["ingiallimento", "distribuzione irregolare"],
        uncertainty: ["manca foto dell’intera pianta", "manca cronologia irrigazione"],
      },
      {
        label: "Fitopatia da verificare",
        category: "disease",
        confidence: 0.31,
        evidence: ["macchie fogliari"],
        uncertainty: ["manca dettaglio della pagina inferiore della foglia"],
      },
    ],
    immediateActions: [
      {
        title: "Isolare osservazione e raccogliere foto aggiuntive",
        priority: "medium",
        description: "Acquisire foto ravvicinate e panoramiche prima di qualsiasi intervento.",
        safetyNote: "Non applicare trattamenti senza revisione umana.",
        requiresHumanReview: true,
      },
    ],
    additionalChecks: [
      "verificare irrigazione recente",
      "controllare presenza insetti",
      "fotografare pagina inferiore foglia",
    ],
    escalationCriteria: [
      "estensione sintomi oltre il 30%",
      "rapido peggioramento in 48 ore",
      "sintomi su nuove piante",
    ],
    humanReviewRequired: true,
    automaticTaskCreationAllowed: false,
    persistenceAllowed: false,
    providerMetadata: {
      model: "dry-run-fixture",
      mode: "validation-only",
      externalProviderCalled: false,
    },
  };
}

export function createInvalidProviderResponseFixture(): ProviderDiagnosisResponseCandidate {
  return {
    schemaVersion: "wrong-schema",
    visualSummary: "",
    severity: "extreme",
    confidence: 1.7,
    hypotheses: [],
    immediateActions: [
      {
        title: "Applicare trattamento immediato",
        priority: "urgent",
        description: "Trattamento automatico senza revisione.",
        safetyNote: "",
        requiresHumanReview: true,
      },
    ],
    additionalChecks: [],
    escalationCriteria: [],
    humanReviewRequired: false,
    automaticTaskCreationAllowed: true,
    persistenceAllowed: true,
    providerMetadata: {
      model: "invalid-fixture",
      mode: "unsafe",
      externalProviderCalled: false,
    },
  };
}

export function validateProviderDiagnosisResponse(
  candidate: ProviderDiagnosisResponseCandidate,
): ProviderResponseValidation {
  const failures: string[] = [];
  const warnings: string[] = [];

  if (!isRecord(candidate)) {
    failures.push("La risposta provider non è un oggetto.");
  }

  if (candidate.schemaVersion !== providerResponseSchemaVersion) {
    failures.push(`schemaVersion deve essere ${providerResponseSchemaVersion}.`);
  }

  const visualSummary = asString(candidate.visualSummary);

  if (!visualSummary) {
    failures.push("visualSummary è obbligatorio.");
  }

  const severity = normalizeSeverity(candidate.severity);

  if (candidate.severity !== severity) {
    failures.push("severity non valida.");
  }

  const confidence = clampConfidence(candidate.confidence);

  if (candidate.confidence !== confidence) {
    failures.push("confidence deve essere un numero tra 0 e 1.");
  }

  const hypotheses = normalizeHypotheses(candidate.hypotheses);

  if (hypotheses.length === 0) {
    failures.push("almeno una ipotesi è obbligatoria.");
  }

  for (const hypothesis of hypotheses) {
    if (!hypothesis.label || hypothesis.label === "Ipotesi non specificata") {
      failures.push("ogni ipotesi deve avere label.");
    }

    if (hypothesis.evidence.length === 0) {
      warnings.push(`ipotesi "${hypothesis.label}" senza evidence.`);
    }

    if (hypothesis.uncertainty.length === 0) {
      warnings.push(`ipotesi "${hypothesis.label}" senza uncertainty.`);
    }
  }

  const immediateActions = normalizeActions(candidate.immediateActions);

  if (immediateActions.length === 0) {
    failures.push("almeno una azione immediata prudente è obbligatoria.");
  }

  for (const action of immediateActions) {
    if (!action.safetyNote || action.safetyNote === "Richiede revisione umana prima di procedere.") {
      warnings.push(`azione "${action.title}" con safetyNote generica o mancante.`);
    }

    if (action.requiresHumanReview !== true) {
      failures.push(`azione "${action.title}" deve richiedere revisione umana.`);
    }
  }

  const additionalChecks = asStringArray(candidate.additionalChecks);
  const escalationCriteria = asStringArray(candidate.escalationCriteria);

  if (additionalChecks.length === 0) {
    warnings.push("additionalChecks vuoto.");
  }

  if (escalationCriteria.length === 0) {
    warnings.push("escalationCriteria vuoto.");
  }

  if (candidate.humanReviewRequired !== true) {
    failures.push("humanReviewRequired deve essere true.");
  }

  if (candidate.automaticTaskCreationAllowed !== false) {
    failures.push("automaticTaskCreationAllowed deve essere false.");
  }

  if (candidate.persistenceAllowed !== false) {
    failures.push("persistenceAllowed deve essere false.");
  }

  if (candidate.providerMetadata?.externalProviderCalled !== false) {
    failures.push("providerMetadata.externalProviderCalled deve essere false in dry-run.");
  }

  return {
    ok: failures.length === 0,
    schemaVersion: providerResponseSchemaVersion,
    failures,
    warnings,
    acceptedForHumanReview: failures.length === 0,
    normalized: {
      visualSummary: visualSummary || "Sintesi visiva mancante.",
      severity,
      confidence,
      hypotheses,
      immediateActions,
      additionalChecks,
      escalationCriteria,
      humanReviewRequired: true,
      automaticTaskCreationAllowed: false,
      persistenceAllowed: false,
    },
  };
}

export function formatProviderValidationReport(validation: ProviderResponseValidation) {
  const lines = [
    `Schema: ${validation.schemaVersion}`,
    `Valida: ${validation.ok ? "sì" : "no"}`,
    `Accettata per revisione umana: ${validation.acceptedForHumanReview ? "sì" : "no"}`,
    `Severità: ${validation.normalized.severity}`,
    `Confidenza: ${validation.normalized.confidence}`,
    "",
    "Ipotesi:",
    ...validation.normalized.hypotheses.map(
      (item) => `- ${item.label} (${item.category}, confidence=${item.confidence})`,
    ),
    "",
    "Azioni immediate:",
    ...validation.normalized.immediateActions.map(
      (item) => `- ${item.title} [${item.priority}] — ${item.description}`,
    ),
  ];

  if (validation.failures.length > 0) {
    lines.push("", "Failure:", ...validation.failures.map((item) => `- ${item}`));
  }

  if (validation.warnings.length > 0) {
    lines.push("", "Warning:", ...validation.warnings.map((item) => `- ${item}`));
  }

  return lines.join("\n");
}
