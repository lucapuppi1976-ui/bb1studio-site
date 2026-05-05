export type PhotoQualityGrade = "blocked" | "poor" | "fair" | "good" | "excellent";

export type PhotoQualityInput = {
  fileName?: string;
  mimeType?: string;
  sizeBytes?: number;
  widthPx?: number;
  heightPx?: number;
  photoCount?: number;
  includesWholePlant?: boolean;
  includesCloseUp?: boolean;
  includesUnderside?: boolean;
  hasPlantContext?: boolean;
  hasSymptoms?: boolean;
  hasLocationHint?: boolean;
  operatorNotes?: string;
};

export type PhotoQualityAssessment = {
  ok: true;
  acceptedForAiPipeline: boolean;
  grade: PhotoQualityGrade;
  score: number;
  blockers: string[];
  warnings: string[];
  recommendations: string[];
  requiredNextPhotos: string[];
  normalized: Required<Omit<PhotoQualityInput, "operatorNotes">> & {
    operatorNotes: string;
    maxImageSizeMb: number;
    supportedMimeTypes: string[];
    minRecommendedWidthPx: number;
    minRecommendedHeightPx: number;
  };
  safety: {
    providerCallsEnabled: false;
    externalProviderCalled: false;
    persistenceAllowed: false;
    automaticTaskCreationAllowed: false;
    automaticInterventionCreationAllowed: false;
    humanReviewRequired: true;
  };
};

const supportedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSizeMb = 10;
const minRecommendedWidthPx = 900;
const minRecommendedHeightPx = 900;
const hardMinWidthPx = 640;
const hardMinHeightPx = 640;

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function numberOrZero(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function booleanOrFalse(value: unknown) {
  return value === true;
}

function stringOrEmpty(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function gradeFromScore(score: number, blockers: string[]): PhotoQualityGrade {
  if (blockers.length > 0) {
    return "blocked";
  }

  if (score >= 85) {
    return "excellent";
  }

  if (score >= 72) {
    return "good";
  }

  if (score >= 58) {
    return "fair";
  }

  return "poor";
}

export function createValidPhotoQualityFixture(): PhotoQualityInput {
  return {
    fileName: "dry-run-quality-leaf.webp",
    mimeType: "image/webp",
    sizeBytes: 1_250_000,
    widthPx: 1600,
    heightPx: 1200,
    photoCount: 3,
    includesWholePlant: true,
    includesCloseUp: true,
    includesUnderside: true,
    hasPlantContext: true,
    hasSymptoms: true,
    hasLocationHint: true,
    operatorNotes: "Foto ravvicinata e contesto pianta disponibili.",
  };
}

export function createInvalidPhotoQualityFixture(): PhotoQualityInput {
  return {
    fileName: "small.txt",
    mimeType: "text/plain",
    sizeBytes: 19_000_000,
    widthPx: 320,
    heightPx: 240,
    photoCount: 1,
    includesWholePlant: false,
    includesCloseUp: false,
    includesUnderside: false,
    hasPlantContext: false,
    hasSymptoms: false,
    hasLocationHint: false,
    operatorNotes: "",
  };
}

export function assessPhotoQuality(input: PhotoQualityInput = {}): PhotoQualityAssessment {
  const normalized = {
    fileName: stringOrEmpty(input.fileName) || "foto-non-specificata",
    mimeType: stringOrEmpty(input.mimeType),
    sizeBytes: numberOrZero(input.sizeBytes),
    widthPx: numberOrZero(input.widthPx),
    heightPx: numberOrZero(input.heightPx),
    photoCount: Math.max(0, Math.round(numberOrZero(input.photoCount))),
    includesWholePlant: booleanOrFalse(input.includesWholePlant),
    includesCloseUp: booleanOrFalse(input.includesCloseUp),
    includesUnderside: booleanOrFalse(input.includesUnderside),
    hasPlantContext: booleanOrFalse(input.hasPlantContext),
    hasSymptoms: booleanOrFalse(input.hasSymptoms),
    hasLocationHint: booleanOrFalse(input.hasLocationHint),
    operatorNotes: stringOrEmpty(input.operatorNotes),
    maxImageSizeMb,
    supportedMimeTypes,
    minRecommendedWidthPx,
    minRecommendedHeightPx,
  };

  const blockers: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];
  const requiredNextPhotos: string[] = [];
  let score = 100;

  if (!supportedMimeTypes.includes(normalized.mimeType)) {
    blockers.push("Formato immagine non supportato. Usare JPEG, PNG o WEBP.");
    score -= 35;
  }

  if (normalized.sizeBytes <= 0) {
    blockers.push("Dimensione file mancante o non valida.");
    score -= 30;
  }

  if (normalized.sizeBytes > maxImageSizeMb * 1024 * 1024) {
    blockers.push(`File troppo grande. Limite consigliato: ${maxImageSizeMb} MB.`);
    score -= 25;
  }

  if (normalized.widthPx < hardMinWidthPx || normalized.heightPx < hardMinHeightPx) {
    blockers.push(`Risoluzione troppo bassa. Minimo operativo: ${hardMinWidthPx}x${hardMinHeightPx}px.`);
    score -= 30;
  } else if (
    normalized.widthPx < minRecommendedWidthPx ||
    normalized.heightPx < minRecommendedHeightPx
  ) {
    warnings.push(`Risoluzione sotto il target consigliato: ${minRecommendedWidthPx}x${minRecommendedHeightPx}px.`);
    score -= 12;
  }

  if (!normalized.includesCloseUp) {
    warnings.push("Manca foto ravvicinata del sintomo.");
    recommendations.push("Aggiungere una foto ravvicinata nitida della zona sintomatica.");
    requiredNextPhotos.push("foto ravvicinata del sintomo");
    score -= 15;
  }

  if (!normalized.includesWholePlant) {
    warnings.push("Manca foto della pianta intera o del contesto.");
    recommendations.push("Aggiungere una foto panoramica della pianta completa.");
    requiredNextPhotos.push("foto pianta intera");
    score -= 12;
  }

  if (!normalized.includesUnderside) {
    warnings.push("Manca foto della pagina inferiore della foglia.");
    recommendations.push("Aggiungere foto della pagina inferiore della foglia per insetti, uova o muffe.");
    requiredNextPhotos.push("pagina inferiore foglia");
    score -= 10;
  }

  if (!normalized.hasPlantContext) {
    warnings.push("Contesto pianta non dichiarato.");
    recommendations.push("Indicare coltura, varietà se nota, fase fenologica e ambiente.");
    score -= 8;
  }

  if (!normalized.hasSymptoms) {
    warnings.push("Sintomi non descritti.");
    recommendations.push("Descrivere sintomi visibili, distribuzione e velocità di peggioramento.");
    score -= 10;
  }

  if (!normalized.hasLocationHint) {
    warnings.push("Posizione o area non indicata.");
    recommendations.push("Indicare area, serra, filare, campo o zona della pianta.");
    score -= 5;
  }

  if (normalized.photoCount < 2) {
    warnings.push("Una sola foto riduce l’affidabilità della diagnosi.");
    recommendations.push("Usare almeno due foto: contesto + dettaglio.");
    score -= 8;
  }

  if (normalized.operatorNotes.length < 12) {
    warnings.push("Note operatore assenti o troppo brevi.");
    recommendations.push("Aggiungere note su irrigazione, trattamenti recenti e andamento dei sintomi.");
    score -= 5;
  }

  const finalScore = clampScore(score);
  const grade = gradeFromScore(finalScore, blockers);
  const acceptedForAiPipeline = blockers.length === 0 && finalScore >= 58;

  if (acceptedForAiPipeline) {
    recommendations.unshift("Materiale idoneo per pipeline AI assistita con revisione umana.");
  } else {
    recommendations.unshift("Migliorare il materiale fotografico prima della pipeline AI.");
  }

  return {
    ok: true,
    acceptedForAiPipeline,
    grade,
    score: finalScore,
    blockers,
    warnings,
    recommendations,
    requiredNextPhotos: Array.from(new Set(requiredNextPhotos)),
    normalized,
    safety: {
      providerCallsEnabled: false,
      externalProviderCalled: false,
      persistenceAllowed: false,
      automaticTaskCreationAllowed: false,
      automaticInterventionCreationAllowed: false,
      humanReviewRequired: true,
    },
  };
}

export function formatPhotoQualityAssessment(assessment: PhotoQualityAssessment) {
  const lines = [
    "AI Photo Quality Gate",
    "",
    `Accepted for AI pipeline: ${assessment.acceptedForAiPipeline ? "yes" : "no"}`,
    `Grade: ${assessment.grade}`,
    `Score: ${assessment.score}`,
    `File: ${assessment.normalized.fileName}`,
    `Mime: ${assessment.normalized.mimeType}`,
    `Size bytes: ${assessment.normalized.sizeBytes}`,
    `Resolution: ${assessment.normalized.widthPx}x${assessment.normalized.heightPx}`,
    "",
    "Blockers:",
    ...(assessment.blockers.length ? assessment.blockers.map((item) => `- ${item}`) : ["- none"]),
    "",
    "Warnings:",
    ...(assessment.warnings.length ? assessment.warnings.map((item) => `- ${item}`) : ["- none"]),
    "",
    "Recommendations:",
    ...assessment.recommendations.map((item) => `- ${item}`),
    "",
    "Required next photos:",
    ...(assessment.requiredNextPhotos.length
      ? assessment.requiredNextPhotos.map((item) => `- ${item}`)
      : ["- none"]),
    "",
    "Safety:",
    "- providerCallsEnabled=false",
    "- externalProviderCalled=false",
    "- persistenceAllowed=false",
    "- automaticTaskCreationAllowed=false",
    "- automaticInterventionCreationAllowed=false",
    "- humanReviewRequired=true",
  ];

  return lines.join("\n");
}
