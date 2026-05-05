import {
  createPhotoEvidenceBundle,
  createValidEvidenceBundleFixture,
  formatPhotoEvidenceBundle,
  type PhotoEvidenceBundle,
  type PhotoEvidenceBundleInput,
} from "./photoEvidenceBundle";

export type AiProviderRequestPreviewInput = PhotoEvidenceBundleInput & {
  locale?: "it-IT" | "en-US";
  requestedOutputs?: Array<
    | "diagnosis"
    | "severity"
    | "evidence"
    | "action-plan"
    | "monitoring"
    | "human-review"
  >;
};

export type AiProviderRequestPreview = {
  ok: true;
  mode: "provider-request-preview";
  requestId: string;
  locale: "it-IT" | "en-US";
  requestReady: boolean;
  evidenceBundle: PhotoEvidenceBundle;
  providerPayload: {
    systemInstruction: string;
    userInstruction: string;
    evidenceSummary: string;
    expectedJsonSchema: Record<string, unknown>;
    input: {
      photos: PhotoEvidenceBundle["providerReadyPayload"]["photos"];
      context: PhotoEvidenceBundle["context"];
      missingEvidence: string[];
      bundleScore: number;
      readiness: PhotoEvidenceBundle["readiness"];
      requestedOutputs: AiProviderRequestPreviewInput["requestedOutputs"];
    };
    constraints: {
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
  blockedCapabilities: string[];
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

function normalizeLocale(value: unknown): AiProviderRequestPreview["locale"] {
  return value === "en-US" ? "en-US" : "it-IT";
}

function normalizeRequestedOutputs(
  value: unknown,
): NonNullable<AiProviderRequestPreviewInput["requestedOutputs"]> {
  const fallback: NonNullable<AiProviderRequestPreviewInput["requestedOutputs"]> = [
    "diagnosis",
    "severity",
    "evidence",
    "action-plan",
    "monitoring",
    "human-review",
  ];

  if (!Array.isArray(value)) {
    return fallback;
  }

  const allowed = new Set(fallback);
  const clean = value.filter((item): item is typeof fallback[number] => allowed.has(item));

  return clean.length ? clean : fallback;
}

function createRequestId(bundle: PhotoEvidenceBundle) {
  const base = [
    bundle.context.suspectedCrop || "unknown-crop",
    bundle.context.urgency,
    bundle.bundleScore,
    bundle.evidenceItems.length,
    bundle.missingEvidence.length,
  ]
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `ai-provider-request-${base || "preview"}`;
}

function expectedJsonSchema() {
  return {
    type: "object",
    required: [
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
    ],
    properties: {
      summary: {
        type: "string",
        description: "Sintesi breve e non definitiva.",
      },
      diagnosisHypotheses: {
        type: "array",
        items: {
          type: "object",
          required: ["label", "probability", "evidence", "againstEvidence"],
          properties: {
            label: { type: "string" },
            probability: { type: "number", minimum: 0, maximum: 1 },
            evidence: { type: "array", items: { type: "string" } },
            againstEvidence: { type: "array", items: { type: "string" } },
          },
        },
      },
      severity: {
        type: "object",
        required: ["level", "reason"],
        properties: {
          level: { type: "string", enum: ["low", "medium", "high", "critical"] },
          reason: { type: "string" },
        },
      },
      confidence: {
        type: "object",
        required: ["score", "reason"],
        properties: {
          score: { type: "number", minimum: 0, maximum: 1 },
          reason: { type: "string" },
        },
      },
      evidenceUsed: { type: "array", items: { type: "string" } },
      missingEvidence: { type: "array", items: { type: "string" } },
      recommendedActions: { type: "array", items: { type: "string" } },
      monitoringPlan: { type: "array", items: { type: "string" } },
      humanReview: {
        type: "object",
        required: ["required", "checklist"],
        properties: {
          required: { type: "boolean", const: true },
          checklist: { type: "array", items: { type: "string" } },
        },
      },
      limitations: { type: "array", items: { type: "string" } },
    },
  };
}

function systemInstruction(locale: AiProviderRequestPreview["locale"]) {
  if (locale === "en-US") {
    return [
      "You are an agricultural photo diagnosis assistant.",
      "Return only a structured JSON object matching the expected schema.",
      "Never claim certainty from images alone.",
      "Do not prescribe regulated products or irreversible interventions without human review.",
      "Human review is mandatory before operational execution.",
    ].join(" ");
  }

  return [
    "Sei un assistente di diagnosi fotografica agricola.",
    "Rispondi solo con un oggetto JSON strutturato conforme allo schema richiesto.",
    "Non dichiarare mai certezza assoluta basandoti solo su immagini.",
    "Non prescrivere prodotti regolati o interventi irreversibili senza revisione umana.",
    "La revisione umana è obbligatoria prima dell'esecuzione operativa.",
  ].join(" ");
}

function userInstruction(bundle: PhotoEvidenceBundle, locale: AiProviderRequestPreview["locale"]) {
  const symptoms = bundle.context.symptoms.join(", ") || "non dichiarati";

  if (locale === "en-US") {
    return [
      "Analyze the photographic evidence bundle.",
      `Crop or plant context: ${bundle.context.plantContext || "missing"}.`,
      `Suspected crop: ${bundle.context.suspectedCrop || "missing"}.`,
      `Location hint: ${bundle.context.locationHint || "missing"}.`,
      `Symptoms: ${symptoms}.`,
      `Urgency: ${bundle.context.urgency}.`,
      "Produce diagnosis hypotheses, evidence, missing data, safe immediate actions, monitoring plan, and human review checklist.",
    ].join("\n");
  }

  return [
    "Analizza il bundle evidenze fotografiche.",
    `Contesto pianta: ${bundle.context.plantContext || "mancante"}.`,
    `Coltura sospetta: ${bundle.context.suspectedCrop || "mancante"}.`,
    `Posizione/area: ${bundle.context.locationHint || "mancante"}.`,
    `Sintomi: ${symptoms}.`,
    `Urgenza: ${bundle.context.urgency}.`,
    "Produci ipotesi diagnostiche, evidenze, dati mancanti, azioni immediate sicure, piano di monitoraggio e checklist di revisione umana.",
  ].join("\n");
}

export function createAiProviderRequestPreview(
  input: AiProviderRequestPreviewInput = createValidEvidenceBundleFixture(),
): AiProviderRequestPreview {
  const locale = normalizeLocale(input.locale);
  const requestedOutputs = normalizeRequestedOutputs(input.requestedOutputs);
  const evidenceBundle = createPhotoEvidenceBundle(input);
  const requestId = createRequestId(evidenceBundle);
  const evidenceSummary = formatPhotoEvidenceBundle(evidenceBundle);

  const requestReady =
    evidenceBundle.acceptedForAiPipeline &&
    evidenceBundle.providerReadyPayload.constraints.humanReviewRequired === true;

  return {
    ok: true,
    mode: "provider-request-preview",
    requestId,
    locale,
    requestReady,
    evidenceBundle,
    providerPayload: {
      systemInstruction: systemInstruction(locale),
      userInstruction: userInstruction(evidenceBundle, locale),
      evidenceSummary,
      expectedJsonSchema: expectedJsonSchema(),
      input: {
        photos: evidenceBundle.providerReadyPayload.photos,
        context: evidenceBundle.context,
        missingEvidence: evidenceBundle.missingEvidence,
        bundleScore: evidenceBundle.bundleScore,
        readiness: evidenceBundle.readiness,
        requestedOutputs,
      },
      constraints: {
        providerCallsEnabled: false,
        externalProviderCalled: false,
        clientProviderCallsAllowed: false,
        persistenceAllowed: false,
        automaticTaskCreationAllowed: false,
        automaticInterventionCreationAllowed: false,
        humanReviewRequired: true,
        redactedOutputOnly: true,
      },
    },
    blockedCapabilities: [
      "live-provider-call",
      "client-provider-call",
      "database-persistence",
      "automatic-task-creation",
      "automatic-intervention-creation",
      "unreviewed-operational-decision",
    ],
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

export function formatAiProviderRequestPreview(preview: AiProviderRequestPreview) {
  return [
    "AI Provider Request Preview",
    "",
    `Request ID: ${preview.requestId}`,
    `Locale: ${preview.locale}`,
    `Request ready: ${preview.requestReady ? "yes" : "no"}`,
    `Readiness: ${preview.evidenceBundle.readiness}`,
    `Bundle score: ${preview.evidenceBundle.bundleScore}`,
    "",
    "System instruction:",
    preview.providerPayload.systemInstruction,
    "",
    "User instruction:",
    preview.providerPayload.userInstruction,
    "",
    "Expected JSON schema keys:",
    Object.keys(preview.providerPayload.expectedJsonSchema.properties || {})
      .map((key) => `- ${key}`)
      .join("\n"),
    "",
    "Constraints:",
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
