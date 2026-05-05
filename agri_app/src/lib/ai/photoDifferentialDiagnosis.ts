import {
  createIncompletePhotoSymptomAnnotationFixture,
  createPhotoSymptomAnnotationFixture,
  createPhotoSymptomAnnotationMap,
  formatPhotoSymptomAnnotationMap,
  type PhotoSymptomAnnotationInput,
  type PhotoSymptomAnnotationMap,
} from "./photoSymptomAnnotation";

export type DifferentialConfidenceBand = "low" | "medium" | "high";
export type DifferentialRiskBand = "low" | "medium" | "high" | "critical";

export type DifferentialEvidenceFactor = {
  id: string;
  label: string;
  weight: number;
  direction: "supporting" | "against" | "missing";
  explanation: string;
};

export type DifferentialDiagnosisCandidate = {
  id: string;
  label: string;
  category:
    | "fungal"
    | "bacterial"
    | "pest"
    | "nutritional"
    | "water-stress"
    | "abiotic"
    | "unknown";
  score: number;
  confidenceBand: DifferentialConfidenceBand;
  riskBand: DifferentialRiskBand;
  evidenceFor: DifferentialEvidenceFactor[];
  evidenceAgainst: DifferentialEvidenceFactor[];
  evidenceMissing: DifferentialEvidenceFactor[];
  recommendedChecks: string[];
  conservativeActions: string[];
  blockedActions: string[];
};

export type DifferentialDiagnosisMatrix = {
  ok: true;
  mode: "differential-diagnosis-dry-run";
  matrixVersion: "agri-differential-diagnosis-v1";
  matrixId: string;
  matrixFingerprint: string;
  annotation: {
    annotationId: string;
    annotationFingerprint: string;
    totalRegions: number;
    highestSeverity: string;
    providerReady: boolean;
  };
  candidates: DifferentialDiagnosisCandidate[];
  topCandidate: DifferentialDiagnosisCandidate | null;
  evidenceGaps: string[];
  nextBestEvidence: string[];
  explainability: {
    scoringModel: "local-rule-based-dry-run";
    scoringScale: "0-100";
    scoreMeaning: string;
    limitations: string[];
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
  sourceMap: PhotoSymptomAnnotationMap;
};

function clampScore(score: number) {
  return Math.min(100, Math.max(0, Math.round(score)));
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `differential-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function confidenceBand(score: number): DifferentialConfidenceBand {
  if (score >= 70) {
    return "high";
  }

  if (score >= 45) {
    return "medium";
  }

  return "low";
}

function riskBand(score: number, highestSeverity: string): DifferentialRiskBand {
  if (highestSeverity === "critical") {
    return "critical";
  }

  if (highestSeverity === "high" || score >= 75) {
    return "high";
  }

  if (highestSeverity === "medium" || score >= 45) {
    return "medium";
  }

  return "low";
}

function lowerText(map: PhotoSymptomAnnotationMap) {
  return [
    map.context.crop,
    map.context.plantContext,
    map.context.locationHint,
    ...map.summary.visibleSigns,
    ...map.summary.affectedTissues,
    ...map.summary.distribution,
    ...map.regions.flatMap((region) => [
      region.label,
      region.tissue,
      region.severity,
      region.distribution,
      region.operatorNote,
      ...region.visibleSigns,
    ]),
  ]
    .join(" ")
    .toLowerCase();
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term.toLowerCase()));
}

function factor(
  id: string,
  label: string,
  weight: number,
  direction: DifferentialEvidenceFactor["direction"],
  explanation: string,
): DifferentialEvidenceFactor {
  return {
    id,
    label,
    weight,
    direction,
    explanation,
  };
}

function candidateFromEvidence(params: {
  id: string;
  label: string;
  category: DifferentialDiagnosisCandidate["category"];
  baseScore: number;
  highestSeverity: string;
  evidenceFor: DifferentialEvidenceFactor[];
  evidenceAgainst: DifferentialEvidenceFactor[];
  evidenceMissing: DifferentialEvidenceFactor[];
  recommendedChecks: string[];
  conservativeActions: string[];
}) {
  const forScore = params.evidenceFor.reduce((total, item) => total + item.weight, 0);
  const againstScore = params.evidenceAgainst.reduce((total, item) => total + item.weight, 0);
  const missingPenalty = params.evidenceMissing.reduce((total, item) => total + Math.min(item.weight, 8), 0);
  const score = clampScore(params.baseScore + forScore - againstScore - missingPenalty);

  return {
    id: params.id,
    label: params.label,
    category: params.category,
    score,
    confidenceBand: confidenceBand(score),
    riskBand: riskBand(score, params.highestSeverity),
    evidenceFor: params.evidenceFor,
    evidenceAgainst: params.evidenceAgainst,
    evidenceMissing: params.evidenceMissing,
    recommendedChecks: params.recommendedChecks,
    conservativeActions: params.conservativeActions,
    blockedActions: [
      "Nessun trattamento regolato senza revisione umana.",
      "Nessuna prescrizione automatica prodotto.",
      "Nessuna creazione automatica attività.",
      "Nessuna creazione automatica intervento.",
      "Nessuna esecuzione senza conferma operatore.",
    ],
  } satisfies DifferentialDiagnosisCandidate;
}

function buildCandidates(map: PhotoSymptomAnnotationMap) {
  const text = lowerText(map);
  const regionCount = map.summary.totalRegions;
  const hasLeafUpper = map.summary.affectedTissues.includes("leaf-upper");
  const hasLeafUnderside = map.summary.affectedTissues.includes("leaf-underside");
  const hasWholePlant = map.summary.affectedTissues.includes("whole-plant");
  const hasLocalized = map.summary.distribution.includes("localized");
  const hasScattered = map.summary.distribution.includes("scattered");
  const hasDiffuse = map.summary.distribution.includes("diffuse");
  const hasProgressive = map.summary.distribution.includes("progressive");

  const fungalFor: DifferentialEvidenceFactor[] = [];
  const fungalAgainst: DifferentialEvidenceFactor[] = [];
  const fungalMissing: DifferentialEvidenceFactor[] = [];

  if (hasAny(text, ["macchie", "brune", "alone", "necrosi", "lesione"])) {
    fungalFor.push(factor("fungal-spots", "Macchie/lesioni fogliari visibili", 24, "supporting", "Le macchie fogliari sono compatibili con problemi fungini o fogliari."));
  }

  if (hasLeafUpper || hasLeafUnderside) {
    fungalFor.push(factor("fungal-leaf-tissue", "Tessuto fogliare colpito", 12, "supporting", "Molte patologie fungine emergono inizialmente sulle foglie."));
  }

  if (hasLocalized || hasScattered) {
    fungalFor.push(factor("fungal-distribution", "Distribuzione localizzata/scattered", 8, "supporting", "Pattern non uniforme compatibile con focolai."));
  }

  if (hasDiffuse && !hasAny(text, ["macchie", "necrosi"])) {
    fungalAgainst.push(factor("fungal-diffuse-no-spots", "Diffusione senza macchie chiare", 12, "against", "Diffusione uniforme può indicare stress o nutrizione."));
  }

  if (!hasLeafUnderside) {
    fungalMissing.push(factor("fungal-missing-underside", "Foto pagina inferiore mancante", 8, "missing", "Serve pagina inferiore foglia per distinguere spore, acari o residui."));
  }

  const pestFor: DifferentialEvidenceFactor[] = [];
  const pestAgainst: DifferentialEvidenceFactor[] = [];
  const pestMissing: DifferentialEvidenceFactor[] = [];

  if (hasAny(text, ["puntini", "fori", "morsi", "ragnatele", "acari", "insetti", "deformazione"])) {
    pestFor.push(factor("pest-visible-signs", "Segni compatibili con insetti/acari", 26, "supporting", "Fori, puntinature o deformazioni orientano verso fitofagi."));
  }

  if (hasLeafUnderside) {
    pestFor.push(factor("pest-underside", "Pagina inferiore documentata", 12, "supporting", "La pagina inferiore è rilevante per acari e uova."));
  } else {
    pestMissing.push(factor("pest-missing-underside", "Pagina inferiore non documentata", 12, "missing", "Manca una prova chiave per insetti/acari."));
  }

  if (hasAny(text, ["alone giallo", "macchie brune"]) && !hasAny(text, ["fori", "puntini", "morsi"])) {
    pestAgainst.push(factor("pest-no-feeding-sign", "Assenza di segni di rosura", 9, "against", "Le evidenze disponibili non mostrano rosure o puntinature tipiche."));
  }

  const nutritionFor: DifferentialEvidenceFactor[] = [];
  const nutritionAgainst: DifferentialEvidenceFactor[] = [];
  const nutritionMissing: DifferentialEvidenceFactor[] = [];

  if (hasAny(text, ["ingiallimento", "decolorazione", "clorosi", "margini"])) {
    nutritionFor.push(factor("nutrition-yellowing", "Ingiallimento/decolorazione", 24, "supporting", "Clorosi e decolorazioni possono indicare carenze o squilibri."));
  }

  if (hasDiffuse || hasScattered) {
    nutritionFor.push(factor("nutrition-distribution", "Distribuzione diffusa o scattered", 10, "supporting", "Le carenze spesso hanno distribuzione ampia o ripetitiva."));
  }

  if (hasAny(text, ["macchie brune", "necrosi"]) && hasLocalized) {
    nutritionAgainst.push(factor("nutrition-necrotic-localized", "Necrosi localizzata", 8, "against", "Necrosi localizzate possono orientare più verso lesione o patogeno."));
  }

  if (!hasWholePlant) {
    nutritionMissing.push(factor("nutrition-missing-whole", "Foto pianta intera mancante", 10, "missing", "Serve vista complessiva per pattern di carenza."));
  }

  const waterFor: DifferentialEvidenceFactor[] = [];
  const waterAgainst: DifferentialEvidenceFactor[] = [];
  const waterMissing: DifferentialEvidenceFactor[] = [];

  if (hasAny(text, ["appassimento", "seccume", "bordo secco", "stress", "arricciamento"])) {
    waterFor.push(factor("water-stress-signs", "Segni compatibili con stress idrico/termico", 24, "supporting", "Seccumi e arricciamenti sono compatibili con stress ambientale."));
  }

  if (hasDiffuse || hasProgressive) {
    waterFor.push(factor("water-distribution", "Pattern diffuso/progressivo", 10, "supporting", "Stress idrico o termico può presentarsi su più parti."));
  }

  if (hasAny(text, ["alone giallo", "macchie brune"]) && hasLocalized) {
    waterAgainst.push(factor("water-local-spots", "Macchie localizzate", 8, "against", "Lesioni localizzate possono indicare patogeno o danno puntuale."));
  }

  if (!hasWholePlant) {
    waterMissing.push(factor("water-missing-whole", "Vista pianta intera mancante", 8, "missing", "Serve foto intera per stress idrico/termico."));
  }

  const abioticFor: DifferentialEvidenceFactor[] = [];
  const abioticAgainst: DifferentialEvidenceFactor[] = [];
  const abioticMissing: DifferentialEvidenceFactor[] = [];

  if (hasAny(text, ["bruciatura", "fitotossicità", "trattamento", "residuo", "ustione", "bordo"])) {
    abioticFor.push(factor("abiotic-treatment-signs", "Possibile danno abiotico o fitotossicità", 24, "supporting", "Bruciature o residui possono indicare stress non biologico."));
  }

  if (hasLocalized) {
    abioticFor.push(factor("abiotic-localized", "Danno localizzato", 8, "supporting", "Danni abiotici possono seguire esposizione o applicazione puntuale."));
  }

  if (hasAny(text, ["ragnatele", "uova", "insetti"])) {
    abioticAgainst.push(factor("abiotic-biological-sign", "Segni biologici visibili", 10, "against", "Presenza di insetti/acari riduce probabilità abiotica."));
  }

  if (regionCount < 2) {
    abioticMissing.push(factor("abiotic-few-regions", "Poche regioni annotate", 8, "missing", "Servono più regioni per separare danno puntuale da pattern diffuso."));
  }

  return [
    candidateFromEvidence({
      id: "fungal-leaf-spot",
      label: "Patologia fogliare fungina / maculatura",
      category: "fungal",
      baseScore: 28,
      highestSeverity: map.summary.highestSeverity,
      evidenceFor: fungalFor,
      evidenceAgainst: fungalAgainst,
      evidenceMissing: fungalMissing,
      recommendedChecks: [
        "Fotografare pagina inferiore foglia.",
        "Verificare presenza polvere, muffa, fruttificazioni o alone.",
        "Confrontare foglie sane e foglie sintomatiche.",
      ],
      conservativeActions: [
        "Isolare visivamente l’area sintomatica e monitorare evoluzione.",
        "Evitare interventi regolati prima della revisione.",
        "Raccogliere foto aggiuntive con buona luce.",
      ],
    }),
    candidateFromEvidence({
      id: "pest-or-mite-pressure",
      label: "Pressione insetti/acari",
      category: "pest",
      baseScore: 22,
      highestSeverity: map.summary.highestSeverity,
      evidenceFor: pestFor,
      evidenceAgainst: pestAgainst,
      evidenceMissing: pestMissing,
      recommendedChecks: [
        "Controllare pagina inferiore foglie con lente.",
        "Cercare uova, acari, ragnatele, rosure o puntinature.",
        "Fotografare dettaglio macro di eventuali insetti.",
      ],
      conservativeActions: [
        "Documentare eventuale presenza visibile di fitofagi.",
        "Non suggerire prodotti senza conferma tecnica.",
        "Rivalutare dopo nuove foto macro.",
      ],
    }),
    candidateFromEvidence({
      id: "nutritional-imbalance",
      label: "Carenza o squilibrio nutrizionale",
      category: "nutritional",
      baseScore: 20,
      highestSeverity: map.summary.highestSeverity,
      evidenceFor: nutritionFor,
      evidenceAgainst: nutritionAgainst,
      evidenceMissing: nutritionMissing,
      recommendedChecks: [
        "Fotografare pianta intera.",
        "Verificare pattern su foglie giovani vs vecchie.",
        "Confrontare più piante nello stesso settore.",
      ],
      conservativeActions: [
        "Registrare pattern di diffusione prima di intervenire.",
        "Evitare correzioni nutrizionali automatiche.",
        "Richiedere revisione tecnica se pattern diffuso.",
      ],
    }),
    candidateFromEvidence({
      id: "water-or-heat-stress",
      label: "Stress idrico o termico",
      category: "water-stress",
      baseScore: 18,
      highestSeverity: map.summary.highestSeverity,
      evidenceFor: waterFor,
      evidenceAgainst: waterAgainst,
      evidenceMissing: waterMissing,
      recommendedChecks: [
        "Verificare umidità substrato o terreno.",
        "Controllare esposizione a caldo, vento o irrigazione irregolare.",
        "Fotografare pianta intera e area circostante.",
      ],
      conservativeActions: [
        "Controllare condizioni ambientali prima di trattare.",
        "Monitorare evoluzione entro 24-48 ore.",
        "Non confondere stress ambientale con patogeno senza nuove evidenze.",
      ],
    }),
    candidateFromEvidence({
      id: "abiotic-or-phytotoxicity",
      label: "Danno abiotico / fitotossicità",
      category: "abiotic",
      baseScore: 16,
      highestSeverity: map.summary.highestSeverity,
      evidenceFor: abioticFor,
      evidenceAgainst: abioticAgainst,
      evidenceMissing: abioticMissing,
      recommendedChecks: [
        "Verificare trattamenti recenti.",
        "Controllare pattern lungo bordo foglia o zona esposta.",
        "Confrontare zone trattate e non trattate.",
      ],
      conservativeActions: [
        "Sospendere conclusioni fino a revisione umana.",
        "Registrare cronologia trattamenti.",
        "Richiedere evidenze ambientali e operative.",
      ],
    }),
  ].sort((a, b) => b.score - a.score);
}

function evidenceGaps(map: PhotoSymptomAnnotationMap, candidates: DifferentialDiagnosisCandidate[]) {
  const gaps = new Set<string>();

  if (!map.summary.affectedTissues.includes("leaf-underside")) {
    gaps.add("Manca foto pagina inferiore foglia.");
  }

  if (!map.summary.affectedTissues.includes("whole-plant")) {
    gaps.add("Manca vista pianta intera.");
  }

  if (map.summary.totalRegions < 2) {
    gaps.add("Servono almeno due regioni annotate.");
  }

  for (const candidate of candidates.slice(0, 3)) {
    for (const item of candidate.evidenceMissing) {
      gaps.add(item.label);
    }
  }

  return Array.from(gaps);
}

function nextBestEvidence(gaps: string[]) {
  if (!gaps.length) {
    return [
      "Procedere a revisione umana della matrice differenziale.",
      "Confrontare la matrice con osservazioni di campo.",
    ];
  }

  return gaps.map((gap) => `Acquisire evidenza: ${gap}`);
}

export function createDifferentialDiagnosisMatrix(
  input: PhotoSymptomAnnotationInput = createPhotoSymptomAnnotationFixture(),
): DifferentialDiagnosisMatrix {
  const sourceMap = createPhotoSymptomAnnotationMap(input);
  const candidates = buildCandidates(sourceMap);
  const gaps = evidenceGaps(sourceMap, candidates);
  const topCandidate = candidates[0] || null;
  const matrixId = `matrix-${sourceMap.annotationId}`;
  const matrixFingerprint = fingerprint(
    [
      sourceMap.annotationFingerprint,
      sourceMap.summary.totalRegions,
      sourceMap.summary.highestSeverity,
      JSON.stringify(candidates.map((candidate) => [candidate.id, candidate.score])),
    ].join("|"),
  );

  return {
    ok: true,
    mode: "differential-diagnosis-dry-run",
    matrixVersion: "agri-differential-diagnosis-v1",
    matrixId,
    matrixFingerprint,
    annotation: {
      annotationId: sourceMap.annotationId,
      annotationFingerprint: sourceMap.annotationFingerprint,
      totalRegions: sourceMap.summary.totalRegions,
      highestSeverity: sourceMap.summary.highestSeverity,
      providerReady: sourceMap.aiEvidenceMap.providerReady,
    },
    candidates,
    topCandidate,
    evidenceGaps: gaps,
    nextBestEvidence: nextBestEvidence(gaps),
    explainability: {
      scoringModel: "local-rule-based-dry-run",
      scoringScale: "0-100",
      scoreMeaning:
        "Score locale euristico per ordinare ipotesi, non diagnosi definitiva e non prescrizione.",
      limitations: [
        "Non sostituisce diagnosi professionale.",
        "Non usa modello AI live.",
        "Dipende dalla qualità delle foto e dalle annotazioni.",
        "Richiede revisione umana obbligatoria.",
      ],
    },
    safety: {
      providerCalled: false,
      persistencePerformed: false,
      automaticTaskCreationPerformed: false,
      automaticInterventionCreationPerformed: false,
      allowedToExecute: false,
      humanReviewRequired: true,
      redactedOutputOnly: true,
    },
    sourceMap,
  };
}

export function createIncompleteDifferentialDiagnosisMatrix() {
  return createDifferentialDiagnosisMatrix(createIncompletePhotoSymptomAnnotationFixture());
}

export function formatDifferentialDiagnosisMatrix(matrix: DifferentialDiagnosisMatrix) {
  return [
    "AI Differential Diagnosis Matrix",
    "",
    `Matrix ID: ${matrix.matrixId}`,
    `Fingerprint: ${matrix.matrixFingerprint}`,
    `Version: ${matrix.matrixVersion}`,
    `Annotation: ${matrix.annotation.annotationId}`,
    `Annotation fingerprint: ${matrix.annotation.annotationFingerprint}`,
    "",
    "Top candidate:",
    matrix.topCandidate
      ? `- ${matrix.topCandidate.label} | score=${matrix.topCandidate.score} | confidence=${matrix.topCandidate.confidenceBand} | risk=${matrix.topCandidate.riskBand}`
      : "- none",
    "",
    "Candidates:",
    ...matrix.candidates.map((candidate) => {
      return [
        `- ${candidate.label}`,
        `  id=${candidate.id}`,
        `  category=${candidate.category}`,
        `  score=${candidate.score}`,
        `  confidence=${candidate.confidenceBand}`,
        `  risk=${candidate.riskBand}`,
        `  evidenceFor=${candidate.evidenceFor.map((item) => item.label).join("; ") || "none"}`,
        `  evidenceAgainst=${candidate.evidenceAgainst.map((item) => item.label).join("; ") || "none"}`,
        `  evidenceMissing=${candidate.evidenceMissing.map((item) => item.label).join("; ") || "none"}`,
      ].join("\n");
    }),
    "",
    "Evidence gaps:",
    ...(matrix.evidenceGaps.length ? matrix.evidenceGaps.map((item) => `- ${item}`) : ["- none"]),
    "",
    "Next best evidence:",
    ...matrix.nextBestEvidence.map((item) => `- ${item}`),
    "",
    "Explainability:",
    `- scoringModel=${matrix.explainability.scoringModel}`,
    `- scoringScale=${matrix.explainability.scoringScale}`,
    `- scoreMeaning=${matrix.explainability.scoreMeaning}`,
    "",
    "Safety:",
    "- providerCalled=false",
    "- persistencePerformed=false",
    "- automaticTaskCreationPerformed=false",
    "- automaticInterventionCreationPerformed=false",
    "- allowedToExecute=false",
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
    "",
    "Source annotation map:",
    formatPhotoSymptomAnnotationMap(matrix.sourceMap),
  ].join("\n");
}
