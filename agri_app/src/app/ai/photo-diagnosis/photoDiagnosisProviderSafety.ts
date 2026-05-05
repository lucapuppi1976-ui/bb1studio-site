export type ProviderSafetyContract = {
  name: string;
  mode: "local-safety-harness";
  providerCallsEnabled: false;
  clientProviderCallsAllowed: false;
  persistenceAllowed: false;
  automaticTaskCreationAllowed: false;
  humanReviewRequired: true;
  acceptedImageTypes: string[];
  maxImageSizeMb: number;
  expectedInput: string[];
  expectedOutput: string[];
  prohibitedOutput: string[];
  backendRequirements: string[];
  rolloutStages: string[];
};

export const providerSafetyCapabilities = [
  "image intake controlled",
  "provider request contract",
  "human review required",
  "no external call",
  "no automatic treatment",
  "no automatic task creation",
];

export function createProviderSafetyContract(): ProviderSafetyContract {
  return {
    name: "AI Provider Safety Harness",
    mode: "local-safety-harness",
    providerCallsEnabled: false,
    clientProviderCallsAllowed: false,
    persistenceAllowed: false,
    automaticTaskCreationAllowed: false,
    humanReviewRequired: true,
    acceptedImageTypes: ["image/jpeg", "image/png", "image/webp"],
    maxImageSizeMb: 8,
    expectedInput: [
      "immagine validata lato client",
      "contesto pianta o coltura",
      "area o posizione",
      "sintomi selezionati",
      "gravità percepita",
      "note operatore",
    ],
    expectedOutput: [
      "descrizione visiva",
      "ipotesi problema",
      "confidenza",
      "dati mancanti",
      "azioni immediate",
      "piano follow-up",
      "limiti della diagnosi",
    ],
    prohibitedOutput: [
      "prescrizione automatica senza revisione",
      "creazione automatica di attività",
      "creazione automatica di interventi",
      "salvataggio automatico nel database",
      "trattamento fitosanitario non verificato",
    ],
    backendRequirements: [
      "credenziale provider solo server-side",
      "feature flag esplicito prima di attivare analisi reale",
      "rate limit e dimensione massima immagine",
      "log redatti senza contenuti sensibili",
      "output JSON validato prima di mostrarlo",
      "errore sicuro se il provider non risponde",
    ],
    rolloutStages: [
      "V6.1 safety harness locale",
      "provider adapter server-side disabilitato",
      "endpoint protetto in dry-run",
      "test DEV con provider reale",
      "human review obbligatoria",
      "abilitazione controllata live",
    ],
  };
}

export function formatProviderSafetyContract(contract: ProviderSafetyContract) {
  return [
    contract.name,
    "",
    `Mode: ${contract.mode}`,
    `Provider calls enabled: ${contract.providerCallsEnabled ? "yes" : "no"}`,
    `Client provider calls allowed: ${contract.clientProviderCallsAllowed ? "yes" : "no"}`,
    `Persistence allowed: ${contract.persistenceAllowed ? "yes" : "no"}`,
    `Automatic task creation allowed: ${contract.automaticTaskCreationAllowed ? "yes" : "no"}`,
    `Human review required: ${contract.humanReviewRequired ? "yes" : "no"}`,
    "",
    "Accepted image types",
    ...contract.acceptedImageTypes.map((item) => `- ${item}`),
    "",
    `Max image size: ${contract.maxImageSizeMb} MB`,
    "",
    "Expected input",
    ...contract.expectedInput.map((item) => `- ${item}`),
    "",
    "Expected output",
    ...contract.expectedOutput.map((item) => `- ${item}`),
    "",
    "Prohibited output",
    ...contract.prohibitedOutput.map((item) => `- ${item}`),
    "",
    "Backend requirements",
    ...contract.backendRequirements.map((item) => `- ${item}`),
    "",
    "Rollout stages",
    ...contract.rolloutStages.map((item) => `- ${item}`),
  ].join("\n");
}
