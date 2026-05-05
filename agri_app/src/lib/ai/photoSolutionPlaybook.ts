import {
  createDifferentialDiagnosisMatrix,
  createIncompleteDifferentialDiagnosisMatrix,
  formatDifferentialDiagnosisMatrix,
  type DifferentialDiagnosisCandidate,
  type DifferentialDiagnosisMatrix,
} from "./photoDifferentialDiagnosis";
import type { PhotoSymptomAnnotationInput } from "./photoSymptomAnnotation";

export type SolutionPlaybookCategory =
  | "diagnostic"
  | "monitoring"
  | "cultural"
  | "containment"
  | "professional-review"
  | "no-action";

export type SolutionPlaybookPriority = "low" | "medium" | "high" | "critical";

export type SolutionPlaybookConstraint = {
  nonRegulatedOnly: true;
  productPrescriptionAllowed: false;
  dosageAdviceAllowed: false;
  chemicalTreatmentAllowed: false;
  automaticExecutionAllowed: false;
  automaticTaskCreationAllowed: false;
  automaticInterventionCreationAllowed: false;
  persistenceAllowed: false;
  requiresHumanReview: true;
};

export type SolutionPlaybookOption = {
  id: string;
  candidateId: string;
  candidateLabel: string;
  category: SolutionPlaybookCategory;
  priority: SolutionPlaybookPriority;
  objective: string;
  rationale: string;
  prerequisites: string[];
  steps: string[];
  successCriteria: string[];
  escalationTriggers: string[];
  doNotDo: string[];
  evidenceLinks: string[];
  constraints: SolutionPlaybookConstraint;
};

export type SolutionPlaybook = {
  ok: true;
  mode: "solution-playbook-dry-run";
  playbookVersion: "agri-solution-playbook-v1";
  playbookId: string;
  playbookFingerprint: string;
  differential: {
    matrixId: string;
    matrixFingerprint: string;
    topCandidateId: string | null;
    topCandidateLabel: string | null;
    totalCandidates: number;
  };
  options: SolutionPlaybookOption[];
  topOptions: SolutionPlaybookOption[];
  evidenceRequiredBeforeExecution: string[];
  operatorDecisionChecklist: string[];
  explainability: {
    source: "differential-diagnosis-matrix";
    scoreUsage: string;
    limitation: string;
  };
  safety: {
    providerCalled: false;
    persistencePerformed: false;
    productPrescriptionPerformed: false;
    dosageAdvicePerformed: false;
    automaticTaskCreationPerformed: false;
    automaticInterventionCreationPerformed: false;
    allowedToExecute: false;
    humanReviewRequired: true;
    redactedOutputOnly: true;
  };
  sourceMatrix: DifferentialDiagnosisMatrix;
};

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `solution-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function priorityFromCandidate(candidate: DifferentialDiagnosisCandidate): SolutionPlaybookPriority {
  if (candidate.riskBand === "critical") {
    return "critical";
  }

  if (candidate.riskBand === "high" || candidate.score >= 75) {
    return "high";
  }

  if (candidate.riskBand === "medium" || candidate.score >= 45) {
    return "medium";
  }

  return "low";
}

function optionId(candidate: DifferentialDiagnosisCandidate, category: SolutionPlaybookCategory) {
  return `${candidate.id}-${category}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
}

function baseConstraints(): SolutionPlaybookConstraint {
  return {
    nonRegulatedOnly: true,
    productPrescriptionAllowed: false,
    dosageAdviceAllowed: false,
    chemicalTreatmentAllowed: false,
    automaticExecutionAllowed: false,
    automaticTaskCreationAllowed: false,
    automaticInterventionCreationAllowed: false,
    persistenceAllowed: false,
    requiresHumanReview: true,
  };
}

function evidenceLinks(candidate: DifferentialDiagnosisCandidate) {
  const links = [
    ...candidate.evidenceFor.map((item) => `for:${item.label}`),
    ...candidate.evidenceAgainst.map((item) => `against:${item.label}`),
    ...candidate.evidenceMissing.map((item) => `missing:${item.label}`),
  ];

  return links.length ? links : ["no-direct-evidence"];
}

function noPrescriptionBlockers() {
  return [
    "Non indicare prodotti regolati.",
    "Non indicare dosi.",
    "Non indicare tempi di carenza.",
    "Non creare task automaticamente.",
    "Non creare interventi automaticamente.",
    "Non eseguire azioni senza revisione umana.",
  ];
}

function diagnosticOption(candidate: DifferentialDiagnosisCandidate): SolutionPlaybookOption {
  return {
    id: optionId(candidate, "diagnostic"),
    candidateId: candidate.id,
    candidateLabel: candidate.label,
    category: "diagnostic",
    priority: priorityFromCandidate(candidate),
    objective: "Ridurre incertezza diagnostica prima di qualunque decisione operativa.",
    rationale: `La matrice assegna score ${candidate.score} a "${candidate.label}", ma richiede validazione umana e nuove evidenze.`,
    prerequisites: [
      "Foto nitida del sintomo principale.",
      "Foto contesto pianta intera.",
      "Confronto con pianta sana o area sana.",
      ...candidate.recommendedChecks.slice(0, 3),
    ],
    steps: [
      "Raccogliere almeno una foto macro del sintomo.",
      "Annotare tessuto colpito, distribuzione e severità.",
      "Verificare le evidenze mancanti indicate dalla matrice.",
      "Preparare pacchetto revisione umana.",
    ],
    successCriteria: [
      "Almeno due evidenze aggiuntive raccolte.",
      "Ipotesi differenziale rivalutata.",
      "Revisore umano in grado di approvare, correggere o rifiutare la bozza.",
    ],
    escalationTriggers: [
      "Severità alta o critica.",
      "Diffusione progressiva.",
      "Evidenze contrastanti tra candidati.",
      "Dubbi su patogeno regolato o rischio economico elevato.",
    ],
    doNotDo: noPrescriptionBlockers(),
    evidenceLinks: evidenceLinks(candidate),
    constraints: baseConstraints(),
  };
}

function monitoringOption(candidate: DifferentialDiagnosisCandidate): SolutionPlaybookOption {
  return {
    id: optionId(candidate, "monitoring"),
    candidateId: candidate.id,
    candidateLabel: candidate.label,
    category: "monitoring",
    priority: priorityFromCandidate(candidate),
    objective: "Monitorare evoluzione del problema senza applicare trattamenti automatici.",
    rationale: "Il monitoraggio crea evidenza temporale e riduce rischio di interventi non necessari.",
    prerequisites: [
      "Punto foto ripetibile.",
      "Data e area di osservazione.",
      "Scala visiva coerente.",
    ],
    steps: [
      "Ripetere foto entro 24-48 ore se il rischio è medio o alto.",
      "Confrontare estensione sintomo con foto precedente.",
      "Segnalare peggioramento, nuove regioni o cambio severità.",
      "Aggiornare la matrice solo dopo nuove evidenze.",
    ],
    successCriteria: [
      "Sintomo stabile o in regressione.",
      "Nessun aumento di severità.",
      "Nessuna nuova area colpita.",
    ],
    escalationTriggers: [
      "Aumento evidente della superficie sintomatica.",
      "Comparsa su nuove piante.",
      "Passaggio a severità alta o critica.",
    ],
    doNotDo: noPrescriptionBlockers(),
    evidenceLinks: evidenceLinks(candidate),
    constraints: baseConstraints(),
  };
}

function culturalOption(candidate: DifferentialDiagnosisCandidate): SolutionPlaybookOption {
  const fungalOrPest = candidate.category === "fungal" || candidate.category === "pest";

  return {
    id: optionId(candidate, "cultural"),
    candidateId: candidate.id,
    candidateLabel: candidate.label,
    category: "cultural",
    priority: priorityFromCandidate(candidate),
    objective: "Applicare solo misure conservative e non regolate compatibili con revisione umana.",
    rationale: fungalOrPest
      ? "Per ipotesi biologiche è utile limitare diffusione e migliorare osservabilità senza prescrivere prodotti."
      : "Per ipotesi non biologiche è utile migliorare raccolta dati e contesto colturale prima di intervenire.",
    prerequisites: [
      "Conferma revisore umano.",
      "Assenza di indicazioni verso patogeni regolati.",
      "Documentazione fotografica sufficiente.",
    ],
    steps: fungalOrPest
      ? [
          "Separare visivamente l’area sintomatica da quella sana se operativamente possibile.",
          "Ridurre manipolazioni inutili della parte colpita.",
          "Registrare nuove aree sintomatiche.",
          "Richiedere revisione tecnica prima di qualunque trattamento.",
        ]
      : [
          "Verificare irrigazione, esposizione e condizioni ambientali.",
          "Confrontare piante nella stessa area.",
          "Registrare eventuali trattamenti o eventi recenti.",
          "Richiedere revisione tecnica se il pattern peggiora.",
        ],
    successCriteria: [
      "Nessuna diffusione evidente.",
      "Evidenze più chiare per il revisore.",
      "Decisione operativa rinviata fino a conferma.",
    ],
    escalationTriggers: [
      "Peggioramento rapido.",
      "Sintomi su più zone.",
      "Rischio operativo alto.",
    ],
    doNotDo: noPrescriptionBlockers(),
    evidenceLinks: evidenceLinks(candidate),
    constraints: baseConstraints(),
  };
}

function professionalReviewOption(candidate: DifferentialDiagnosisCandidate): SolutionPlaybookOption {
  return {
    id: optionId(candidate, "professional-review"),
    candidateId: candidate.id,
    candidateLabel: candidate.label,
    category: "professional-review",
    priority: priorityFromCandidate(candidate),
    objective: "Portare la bozza a revisione umana con pacchetto completo e limiti espliciti.",
    rationale: "La matrice è spiegabile ma non è diagnosi definitiva; la decisione resta umana.",
    prerequisites: [
      "Matrice differenziale esportata.",
      "Action plan locale esportato.",
      "Foto originali disponibili.",
      "Contesto agronomico disponibile.",
    ],
    steps: [
      "Inviare pacchetto al revisore.",
      "Richiedere approvazione, correzione o rifiuto.",
      "Conservare nota sulla decisione.",
      "Procedere solo dopo conferma umana.",
    ],
    successCriteria: [
      "Decisione revisore tracciata.",
      "Limiti del sistema dichiarati.",
      "Azioni non automatiche e non prescrittive.",
    ],
    escalationTriggers: [
      "Rischio critical.",
      "Possibile patogeno regolato.",
      "Decisione economica o sanitaria rilevante.",
      "Richiesta di prodotto o dose.",
    ],
    doNotDo: noPrescriptionBlockers(),
    evidenceLinks: evidenceLinks(candidate),
    constraints: baseConstraints(),
  };
}

function noActionOption(candidate: DifferentialDiagnosisCandidate): SolutionPlaybookOption {
  return {
    id: optionId(candidate, "no-action"),
    candidateId: candidate.id,
    candidateLabel: candidate.label,
    category: "no-action",
    priority: "low",
    objective: "Evitare interventi se evidenze insufficienti o rischio basso.",
    rationale: "Quando evidenze e rischio sono limitati, la scelta più sicura può essere osservare e acquisire dati.",
    prerequisites: [
      "Rischio basso o medio-basso.",
      "Nessun peggioramento osservato.",
      "Revisore umano informato.",
    ],
    steps: [
      "Non eseguire interventi.",
      "Raccogliere nuove foto se il sintomo evolve.",
      "Rivalutare se aumenta severità o diffusione.",
    ],
    successCriteria: [
      "Sintomo stabile.",
      "Nessuna nuova evidenza critica.",
      "Nessuna azione non necessaria.",
    ],
    escalationTriggers: [
      "Peggioramento.",
      "Nuove aree sintomatiche.",
      "Nuove evidenze biologiche.",
    ],
    doNotDo: noPrescriptionBlockers(),
    evidenceLinks: evidenceLinks(candidate),
    constraints: baseConstraints(),
  };
}

function optionsForCandidate(candidate: DifferentialDiagnosisCandidate): SolutionPlaybookOption[] {
  const options = [
    diagnosticOption(candidate),
    monitoringOption(candidate),
    culturalOption(candidate),
    professionalReviewOption(candidate),
  ];

  if (candidate.score < 45 && candidate.riskBand !== "high" && candidate.riskBand !== "critical") {
    options.push(noActionOption(candidate));
  }

  return options;
}

function evidenceRequiredBeforeExecution(matrix: DifferentialDiagnosisMatrix) {
  const required = new Set<string>();

  for (const gap of matrix.evidenceGaps) {
    required.add(gap);
  }

  required.add("Revisione umana esplicita.");
  required.add("Conferma che non siano richiesti prodotti regolati o dosaggi.");
  required.add("Conferma che non venga creato alcun task/intervento automaticamente.");

  return Array.from(required);
}

function operatorDecisionChecklist(matrix: DifferentialDiagnosisMatrix) {
  return [
    `Confermare top candidate: ${matrix.topCandidate?.label || "nessuna ipotesi"}.`,
    "Verificare evidenze a favore e contro.",
    "Verificare evidenze mancanti.",
    "Confermare che la soluzione resti non prescrittiva.",
    "Confermare che humanReviewRequired=true.",
    "Bloccare esecuzione automatica.",
  ];
}

export function createSolutionPlaybook(
  matrix: DifferentialDiagnosisMatrix = createDifferentialDiagnosisMatrix(),
): SolutionPlaybook {
  const candidateOptions = matrix.candidates.flatMap(optionsForCandidate);
  const topOptions = candidateOptions
    .filter((option) => option.candidateId === matrix.topCandidate?.id)
    .slice(0, 4);

  const playbookId = `solution-playbook-${matrix.matrixId}`;
  const playbookFingerprint = fingerprint(
    [
      matrix.matrixFingerprint,
      matrix.topCandidate?.id || "none",
      JSON.stringify(candidateOptions.map((option) => [option.id, option.priority])),
    ].join("|"),
  );

  return {
    ok: true,
    mode: "solution-playbook-dry-run",
    playbookVersion: "agri-solution-playbook-v1",
    playbookId,
    playbookFingerprint,
    differential: {
      matrixId: matrix.matrixId,
      matrixFingerprint: matrix.matrixFingerprint,
      topCandidateId: matrix.topCandidate?.id || null,
      topCandidateLabel: matrix.topCandidate?.label || null,
      totalCandidates: matrix.candidates.length,
    },
    options: candidateOptions,
    topOptions,
    evidenceRequiredBeforeExecution: evidenceRequiredBeforeExecution(matrix),
    operatorDecisionChecklist: operatorDecisionChecklist(matrix),
    explainability: {
      source: "differential-diagnosis-matrix",
      scoreUsage:
        "Lo score ordina priorità di revisione e raccolta evidenze; non autorizza trattamenti.",
      limitation:
        "Il playbook è locale, non prescrittivo e richiede revisione umana prima di qualunque azione.",
    },
    safety: {
      providerCalled: false,
      persistencePerformed: false,
      productPrescriptionPerformed: false,
      dosageAdvicePerformed: false,
      automaticTaskCreationPerformed: false,
      automaticInterventionCreationPerformed: false,
      allowedToExecute: false,
      humanReviewRequired: true,
      redactedOutputOnly: true,
    },
    sourceMatrix: matrix,
  };
}

export function createIncompleteSolutionPlaybook() {
  return createSolutionPlaybook(createIncompleteDifferentialDiagnosisMatrix());
}

export function createSolutionPlaybookFromInput(input: PhotoSymptomAnnotationInput) {
  return createSolutionPlaybook(createDifferentialDiagnosisMatrix(input));
}

export function formatSolutionPlaybook(playbook: SolutionPlaybook) {
  return [
    "AI Solution Playbook",
    "",
    `Playbook ID: ${playbook.playbookId}`,
    `Fingerprint: ${playbook.playbookFingerprint}`,
    `Version: ${playbook.playbookVersion}`,
    `Differential matrix: ${playbook.differential.matrixId}`,
    `Differential fingerprint: ${playbook.differential.matrixFingerprint}`,
    `Top candidate: ${playbook.differential.topCandidateLabel || "none"}`,
    "",
    "Top options:",
    ...(playbook.topOptions.length
      ? playbook.topOptions.map((option) => {
          return [
            `- ${option.objective}`,
            `  option=${option.id}`,
            `  candidate=${option.candidateLabel}`,
            `  category=${option.category}`,
            `  priority=${option.priority}`,
            `  rationale=${option.rationale}`,
            `  steps=${option.steps.join("; ")}`,
            `  escalation=${option.escalationTriggers.join("; ")}`,
            `  doNotDo=${option.doNotDo.join("; ")}`,
          ].join("\n");
        })
      : ["- none"]),
    "",
    "Evidence required before execution:",
    ...playbook.evidenceRequiredBeforeExecution.map((item) => `- ${item}`),
    "",
    "Operator decision checklist:",
    ...playbook.operatorDecisionChecklist.map((item) => `- ${item}`),
    "",
    "Safety:",
    "- providerCalled=false",
    "- persistencePerformed=false",
    "- productPrescriptionPerformed=false",
    "- dosageAdvicePerformed=false",
    "- automaticTaskCreationPerformed=false",
    "- automaticInterventionCreationPerformed=false",
    "- allowedToExecute=false",
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
    "",
    "Source differential matrix:",
    formatDifferentialDiagnosisMatrix(playbook.sourceMatrix),
  ].join("\n");
}
