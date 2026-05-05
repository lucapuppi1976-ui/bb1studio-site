export type DryRunDiagnosisInput = {
  imageFileName?: string;
  imageMimeType?: string;
  plantContext?: string;
  locationHint?: string;
  observedSymptoms?: string[];
  severity?: "low" | "medium" | "high" | "critical" | string;
  operatorNotes?: string;
};

export type DryRunProviderRequest = {
  mode: "dry-run";
  providerCallsEnabled: false;
  externalProviderCalled: false;
  humanReviewRequired: true;
  modelPurpose: "photo-diagnosis";
  acceptedImageTypes: string[];
  maxImageSizeMb: number;
  promptSections: {
    role: string;
    safety: string;
    imageContext: string;
    requestedOutput: string[];
    forbiddenActions: string[];
  };
  normalizedInput: {
    imageFileName: string;
    imageMimeType: string;
    plantContext: string;
    locationHint: string;
    observedSymptoms: string[];
    severity: string;
    operatorNotes: string;
  };
};

export type DryRunProviderResult = {
  mode: "dry-run";
  ok: true;
  externalProviderCalled: false;
  providerCallsEnabled: false;
  persistenceAllowed: false;
  automaticTaskCreationAllowed: false;
  humanReviewRequired: true;
  simulatedDiagnosis: {
    visualSummary: string;
    likelyProblemFamilies: string[];
    confidence: "low";
    missingData: string[];
    recommendedNextStep: string;
  };
  safetyNotes: string[];
};

export const dryRunAcceptedImageTypes = ["image/jpeg", "image/png", "image/webp"];
export const dryRunMaxImageSizeMb = 8;

function cleanText(value: unknown, fallback: string) {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed || fallback;
}

function normalizeSymptoms(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

export function normalizeDryRunDiagnosisInput(input: DryRunDiagnosisInput = {}) {
  return {
    imageFileName: cleanText(input.imageFileName, "immagine non nominata"),
    imageMimeType: cleanText(input.imageMimeType, "tipo immagine non indicato"),
    plantContext: cleanText(input.plantContext, "contesto pianta non indicato"),
    locationHint: cleanText(input.locationHint, "posizione non indicata"),
    observedSymptoms: normalizeSymptoms(input.observedSymptoms),
    severity: cleanText(input.severity, "non indicata"),
    operatorNotes: cleanText(input.operatorNotes, "nessuna nota operatore"),
  };
}

export function createDryRunProviderRequest(input: DryRunDiagnosisInput = {}): DryRunProviderRequest {
  const normalizedInput = normalizeDryRunDiagnosisInput(input);

  return {
    mode: "dry-run",
    providerCallsEnabled: false,
    externalProviderCalled: false,
    humanReviewRequired: true,
    modelPurpose: "photo-diagnosis",
    acceptedImageTypes: dryRunAcceptedImageTypes,
    maxImageSizeMb: dryRunMaxImageSizeMb,
    normalizedInput,
    promptSections: {
      role:
        "Agisci come assistente agronomico. Produci ipotesi, non diagnosi definitiva, e richiedi revisione umana.",
      safety:
        "Non prescrivere trattamenti definitivi, non creare attività automatiche, non salvare dati, non sostituire un agronomo.",
      imageContext: [
        `File: ${normalizedInput.imageFileName}`,
        `Tipo: ${normalizedInput.imageMimeType}`,
        `Contesto: ${normalizedInput.plantContext}`,
        `Posizione: ${normalizedInput.locationHint}`,
        `Sintomi: ${normalizedInput.observedSymptoms.join(", ") || "non indicati"}`,
        `Gravità: ${normalizedInput.severity}`,
        `Note: ${normalizedInput.operatorNotes}`,
      ].join("\n"),
      requestedOutput: [
        "descrizione visiva",
        "famiglie di problemi possibili",
        "livello confidenza",
        "dati mancanti",
        "azioni immediate prudenti",
        "necessità revisione umana",
      ],
      forbiddenActions: [
        "nessuna diagnosi definitiva",
        "nessuna prescrizione automatica",
        "nessun salvataggio DB",
        "nessuna creazione automatica di attività",
        "nessuna creazione automatica di interventi",
      ],
    },
  };
}

export function createDryRunProviderResult(input: DryRunDiagnosisInput = {}): DryRunProviderResult {
  const request = createDryRunProviderRequest(input);
  const symptoms = request.normalizedInput.observedSymptoms;

  return {
    mode: "dry-run",
    ok: true,
    externalProviderCalled: false,
    providerCallsEnabled: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    humanReviewRequired: true,
    simulatedDiagnosis: {
      visualSummary:
        "Dry-run locale: la foto non è stata inviata a provider AI. Il sistema ha preparato solo una struttura di analisi.",
      likelyProblemFamilies:
        symptoms.length > 0
          ? ["stress idrico o termico", "problema nutrizionale", "fitopatia da verificare"]
          : ["dati insufficienti: indicare sintomi visibili prima dell’analisi reale"],
      confidence: "low",
      missingData: [
        "foto ravvicinata della foglia",
        "foto della pianta intera",
        "data comparsa sintomi",
        "condizioni irrigazione",
        "trattamenti recenti",
      ],
      recommendedNextStep:
        "Completare il contesto, generare bozza locale, produrre piano d’azione e sottoporre tutto a revisione umana.",
    },
    safetyNotes: [
      "Dry-run: nessuna chiamata AI live.",
      "Nessun dato salvato automaticamente.",
      "Nessuna attività o intervento creati automaticamente.",
      "La revisione umana resta obbligatoria.",
    ],
  };
}
