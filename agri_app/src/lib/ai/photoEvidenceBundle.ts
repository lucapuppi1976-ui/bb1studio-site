import {
  assessPhotoQuality,
  createValidPhotoQualityFixture,
  formatPhotoQualityAssessment,
  type PhotoQualityAssessment,
  type PhotoQualityInput,
} from "./photoQualityGate";

export type PhotoEvidenceRole =
  | "symptom-close-up"
  | "whole-plant"
  | "leaf-underside"
  | "field-context"
  | "other";

export type PhotoEvidenceInput = PhotoQualityInput & {
  id?: string;
  role?: PhotoEvidenceRole;
  caption?: string;
  capturedAt?: string;
};

export type PhotoEvidenceBundleInput = {
  plantContext?: string;
  locationHint?: string;
  symptoms?: string[];
  suspectedCrop?: string;
  operatorNotes?: string;
  urgency?: "low" | "medium" | "high" | "critical";
  photos?: PhotoEvidenceInput[];
};

export type PhotoEvidenceItem = {
  id: string;
  role: PhotoEvidenceRole;
  caption: string;
  quality: PhotoQualityAssessment;
};

export type PhotoEvidenceBundle = {
  ok: true;
  mode: "photo-evidence-bundle";
  acceptedForAiPipeline: boolean;
  bundleScore: number;
  readiness: "blocked" | "needs-more-evidence" | "ready-for-assisted-diagnosis";
  missingEvidence: string[];
  evidenceItems: PhotoEvidenceItem[];
  context: {
    plantContext: string;
    locationHint: string;
    symptoms: string[];
    suspectedCrop: string;
    operatorNotes: string;
    urgency: "low" | "medium" | "high" | "critical";
  };
  providerReadyPayload: {
    photos: Array<{
      id: string;
      role: PhotoEvidenceRole;
      fileName: string;
      mimeType: string;
      widthPx: number;
      heightPx: number;
      qualityGrade: string;
      qualityScore: number;
      acceptedForAiPipeline: boolean;
    }>;
    context: PhotoEvidenceBundle["context"];
    constraints: {
      providerCallsEnabled: false;
      externalProviderCalled: false;
      persistenceAllowed: false;
      automaticTaskCreationAllowed: false;
      automaticInterventionCreationAllowed: false;
      humanReviewRequired: true;
    };
  };
  recommendations: string[];
  safety: {
    providerCallsEnabled: false;
    externalProviderCalled: false;
    persistenceAllowed: false;
    automaticTaskCreationAllowed: false;
    automaticInterventionCreationAllowed: false;
    humanReviewRequired: true;
  };
};

const requiredRoles: PhotoEvidenceRole[] = [
  "symptom-close-up",
  "whole-plant",
  "leaf-underside",
];

function stringOrFallback(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeSymptoms(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item) => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function normalizeUrgency(value: unknown): PhotoEvidenceBundle["context"]["urgency"] {
  if (value === "critical" || value === "high" || value === "medium" || value === "low") {
    return value;
  }

  return "medium";
}

function normalizeRole(value: unknown): PhotoEvidenceRole {
  if (
    value === "symptom-close-up" ||
    value === "whole-plant" ||
    value === "leaf-underside" ||
    value === "field-context" ||
    value === "other"
  ) {
    return value;
  }

  return "other";
}

function defaultPhotos(): PhotoEvidenceInput[] {
  const base = createValidPhotoQualityFixture();

  return [
    {
      ...base,
      id: "photo-close-up",
      role: "symptom-close-up",
      caption: "Dettaglio foglia con sintomo visibile",
      includesCloseUp: true,
      includesWholePlant: false,
      includesUnderside: false,
    },
    {
      ...base,
      id: "photo-whole-plant",
      role: "whole-plant",
      caption: "Pianta intera e contesto",
      includesCloseUp: false,
      includesWholePlant: true,
      includesUnderside: false,
    },
    {
      ...base,
      id: "photo-underside",
      role: "leaf-underside",
      caption: "Pagina inferiore foglia",
      includesCloseUp: true,
      includesWholePlant: false,
      includesUnderside: true,
    },
  ];
}

function scoreBundle(items: PhotoEvidenceItem[], missingEvidence: string[]) {
  if (items.length === 0) {
    return 0;
  }

  const average =
    items.reduce((total, item) => total + item.quality.score, 0) / Math.max(1, items.length);

  const acceptedBonus = items.filter((item) => item.quality.acceptedForAiPipeline).length * 3;
  const missingPenalty = missingEvidence.length * 9;

  return Math.max(0, Math.min(100, Math.round(average + acceptedBonus - missingPenalty)));
}

function readinessFrom(score: number, missingEvidence: string[], hardBlocked: boolean): PhotoEvidenceBundle["readiness"] {
  if (hardBlocked) {
    return "blocked";
  }

  if (missingEvidence.length > 0 || score < 70) {
    return "needs-more-evidence";
  }

  return "ready-for-assisted-diagnosis";
}

export function createValidEvidenceBundleFixture(): PhotoEvidenceBundleInput {
  return {
    plantContext: "vite in filare",
    locationHint: "serra nord",
    symptoms: ["macchie fogliari", "ingiallimento", "riduzione vigore"],
    suspectedCrop: "vite",
    operatorNotes: "Sintomi osservati da 3 giorni. Disponibili foto di dettaglio, pianta intera e pagina inferiore.",
    urgency: "medium",
    photos: defaultPhotos(),
  };
}

export function createIncompleteEvidenceBundleFixture(): PhotoEvidenceBundleInput {
  return {
    plantContext: "",
    locationHint: "",
    symptoms: [],
    suspectedCrop: "",
    operatorNotes: "",
    urgency: "medium",
    photos: [
      {
        id: "single-low-context-photo",
        role: "symptom-close-up",
        caption: "Una sola foto senza contesto",
        fileName: "single.webp",
        mimeType: "image/webp",
        sizeBytes: 900000,
        widthPx: 900,
        heightPx: 900,
        photoCount: 1,
        includesCloseUp: true,
        includesWholePlant: false,
        includesUnderside: false,
        hasPlantContext: false,
        hasSymptoms: false,
        hasLocationHint: false,
        operatorNotes: "",
      },
    ],
  };
}

export function createPhotoEvidenceBundle(
  input: PhotoEvidenceBundleInput = createValidEvidenceBundleFixture(),
): PhotoEvidenceBundle {
  const photos = Array.isArray(input.photos) && input.photos.length > 0 ? input.photos : defaultPhotos();

  const context = {
    plantContext: stringOrFallback(input.plantContext, ""),
    locationHint: stringOrFallback(input.locationHint, ""),
    symptoms: normalizeSymptoms(input.symptoms),
    suspectedCrop: stringOrFallback(input.suspectedCrop, ""),
    operatorNotes: stringOrFallback(input.operatorNotes, ""),
    urgency: normalizeUrgency(input.urgency),
  };

  const evidenceItems: PhotoEvidenceItem[] = photos.slice(0, 8).map((photo, index) => {
    const role = normalizeRole(photo.role);
    const caption = stringOrFallback(photo.caption, `Foto ${index + 1}`);

    const quality = assessPhotoQuality({
      ...photo,
      includesCloseUp: photo.includesCloseUp ?? role === "symptom-close-up",
      includesWholePlant: photo.includesWholePlant ?? role === "whole-plant",
      includesUnderside: photo.includesUnderside ?? role === "leaf-underside",
      hasPlantContext: photo.hasPlantContext ?? Boolean(context.plantContext),
      hasSymptoms: photo.hasSymptoms ?? context.symptoms.length > 0,
      hasLocationHint: photo.hasLocationHint ?? Boolean(context.locationHint),
      operatorNotes: photo.operatorNotes || context.operatorNotes,
      photoCount: photos.length,
    });

    return {
      id: stringOrFallback(photo.id, `photo-${index + 1}`),
      role,
      caption,
      quality,
    };
  });

  const roles = new Set(evidenceItems.map((item) => item.role));
  const missingEvidence: string[] = [];

  for (const role of requiredRoles) {
    if (!roles.has(role)) {
      missingEvidence.push(role);
    }
  }

  if (!context.plantContext) {
    missingEvidence.push("plant-context");
  }

  if (!context.locationHint) {
    missingEvidence.push("location-hint");
  }

  if (context.symptoms.length === 0) {
    missingEvidence.push("symptom-description");
  }

  const hardBlocked = evidenceItems.some((item) => item.quality.blockers.length > 0);
  const bundleScore = scoreBundle(evidenceItems, missingEvidence);
  const readiness = readinessFrom(bundleScore, missingEvidence, hardBlocked);
  const acceptedForAiPipeline = readiness === "ready-for-assisted-diagnosis";

  const recommendations = [
    acceptedForAiPipeline
      ? "Bundle pronto per diagnosi assistita con revisione umana."
      : "Bundle da completare prima della diagnosi assistita.",
    ...missingEvidence.map((item) => `Aggiungere evidenza mancante: ${item}.`),
    "Mantenere revisione umana obbligatoria prima di interventi reali.",
  ];

  return {
    ok: true,
    mode: "photo-evidence-bundle",
    acceptedForAiPipeline,
    bundleScore,
    readiness,
    missingEvidence: Array.from(new Set(missingEvidence)),
    evidenceItems,
    context,
    providerReadyPayload: {
      photos: evidenceItems.map((item) => ({
        id: item.id,
        role: item.role,
        fileName: item.quality.normalized.fileName,
        mimeType: item.quality.normalized.mimeType,
        widthPx: item.quality.normalized.widthPx,
        heightPx: item.quality.normalized.heightPx,
        qualityGrade: item.quality.grade,
        qualityScore: item.quality.score,
        acceptedForAiPipeline: item.quality.acceptedForAiPipeline,
      })),
      context,
      constraints: {
        providerCallsEnabled: false,
        externalProviderCalled: false,
        persistenceAllowed: false,
        automaticTaskCreationAllowed: false,
        automaticInterventionCreationAllowed: false,
        humanReviewRequired: true,
      },
    },
    recommendations,
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

export function formatPhotoEvidenceBundle(bundle: PhotoEvidenceBundle) {
  const lines = [
    "AI Photo Evidence Bundle",
    "",
    `Accepted for AI pipeline: ${bundle.acceptedForAiPipeline ? "yes" : "no"}`,
    `Readiness: ${bundle.readiness}`,
    `Bundle score: ${bundle.bundleScore}`,
    `Photos: ${bundle.evidenceItems.length}`,
    "",
    "Context:",
    `- plantContext: ${bundle.context.plantContext || "missing"}`,
    `- locationHint: ${bundle.context.locationHint || "missing"}`,
    `- suspectedCrop: ${bundle.context.suspectedCrop || "missing"}`,
    `- urgency: ${bundle.context.urgency}`,
    `- symptoms: ${bundle.context.symptoms.join(", ") || "missing"}`,
    "",
    "Missing evidence:",
    ...(bundle.missingEvidence.length ? bundle.missingEvidence.map((item) => `- ${item}`) : ["- none"]),
    "",
    "Photo evidence:",
    ...bundle.evidenceItems.flatMap((item) => [
      `- ${item.id} | ${item.role} | ${item.quality.grade} | score=${item.quality.score}`,
      ...formatPhotoQualityAssessment(item.quality)
        .split("\n")
        .slice(0, 5)
        .map((line) => `  ${line}`),
    ]),
    "",
    "Recommendations:",
    ...bundle.recommendations.map((item) => `- ${item}`),
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
