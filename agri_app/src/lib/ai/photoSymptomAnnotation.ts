export type SymptomSeverity = "low" | "medium" | "high" | "critical";

export type SymptomDistribution =
  | "localized"
  | "scattered"
  | "diffuse"
  | "progressive"
  | "unknown";

export type AffectedTissue =
  | "leaf-upper"
  | "leaf-underside"
  | "stem"
  | "fruit"
  | "flower"
  | "root"
  | "whole-plant"
  | "unknown";

export type PhotoSymptomRegion = {
  id: string;
  label: string;
  tissue: AffectedTissue;
  severity: SymptomSeverity;
  distribution: SymptomDistribution;
  normalizedBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  visibleSigns: string[];
  operatorNote: string;
};

export type PhotoSymptomAnnotationInput = {
  photoId: string;
  photoRole: "symptom-close-up" | "whole-plant" | "leaf-underside" | "context" | "unknown";
  fileName?: string;
  plantContext?: string;
  locationHint?: string;
  crop?: string;
  observedAtLabel?: string;
  regions: PhotoSymptomRegion[];
};

export type PhotoSymptomAnnotationMap = {
  ok: true;
  mode: "photo-symptom-annotation-dry-run";
  annotationVersion: "agri-photo-symptom-map-v1";
  annotationId: string;
  annotationFingerprint: string;
  photoId: string;
  photoRole: PhotoSymptomAnnotationInput["photoRole"];
  fileName: string;
  context: {
    crop: string;
    plantContext: string;
    locationHint: string;
    observedAtLabel: string;
  };
  regions: PhotoSymptomRegion[];
  summary: {
    totalRegions: number;
    highestSeverity: SymptomSeverity;
    affectedTissues: AffectedTissue[];
    visibleSigns: string[];
    distribution: SymptomDistribution[];
    aiEvidenceReadiness: "ready-for-provider-preview" | "needs-more-annotation";
  };
  aiEvidenceMap: {
    providerReady: boolean;
    structuredRegions: number;
    minimumRegionsRequired: number;
    recommendedAdditionalPhotos: string[];
    promptHints: string[];
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
};

const severityWeight: Record<SymptomSeverity, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

function clampPercentage(value: number) {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

function normalizeRegion(region: PhotoSymptomRegion): PhotoSymptomRegion {
  const x = clampPercentage(region.normalizedBox.x);
  const y = clampPercentage(region.normalizedBox.y);
  const width = clampPercentage(region.normalizedBox.width);
  const height = clampPercentage(region.normalizedBox.height);

  return {
    ...region,
    label: region.label.trim() || "Sintomo non etichettato",
    visibleSigns: region.visibleSigns.map((item) => item.trim()).filter(Boolean),
    operatorNote: region.operatorNote.trim(),
    normalizedBox: {
      x,
      y,
      width: Math.max(1, Math.min(width, 100 - x)),
      height: Math.max(1, Math.min(height, 100 - y)),
    },
  };
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function highestSeverity(regions: PhotoSymptomRegion[]): SymptomSeverity {
  if (!regions.length) {
    return "low";
  }

  return regions.reduce<SymptomSeverity>((current, region) => {
    return severityWeight[region.severity] > severityWeight[current] ? region.severity : current;
  }, "low");
}

function fingerprint(value: string) {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return `symptom-map-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function recommendedAdditionalPhotos(input: PhotoSymptomAnnotationInput, regions: PhotoSymptomRegion[]) {
  const recommendations: string[] = [];
  const tissues = new Set(regions.map((region) => region.tissue));

  if (input.photoRole !== "whole-plant" && !tissues.has("whole-plant")) {
    recommendations.push("Aggiungere foto della pianta intera per distribuzione sintomi.");
  }

  if (!tissues.has("leaf-underside")) {
    recommendations.push("Aggiungere foto pagina inferiore foglia.");
  }

  if (regions.length < 2) {
    recommendations.push("Aggiungere almeno una seconda regione sintomatica o sana di confronto.");
  }

  return recommendations;
}

export function createPhotoSymptomAnnotationMap(
  input: PhotoSymptomAnnotationInput,
): PhotoSymptomAnnotationMap {
  const regions = input.regions.map(normalizeRegion);
  const affectedTissues = unique(regions.map((region) => region.tissue));
  const visibleSigns = unique(regions.flatMap((region) => region.visibleSigns));
  const distributions = unique(regions.map((region) => region.distribution));
  const additionalPhotos = recommendedAdditionalPhotos(input, regions);
  const providerReady = regions.length >= 2 && visibleSigns.length >= 1 && additionalPhotos.length <= 1;
  const annotationId = `annotation-${input.photoId || "photo"}`;
  const annotationFingerprint = fingerprint(
    [
      input.photoId,
      input.photoRole,
      input.crop || "",
      input.plantContext || "",
      input.locationHint || "",
      JSON.stringify(regions),
    ].join("|"),
  );

  return {
    ok: true,
    mode: "photo-symptom-annotation-dry-run",
    annotationVersion: "agri-photo-symptom-map-v1",
    annotationId,
    annotationFingerprint,
    photoId: input.photoId,
    photoRole: input.photoRole,
    fileName: input.fileName || "non dichiarato",
    context: {
      crop: input.crop || "non dichiarata",
      plantContext: input.plantContext || "non dichiarato",
      locationHint: input.locationHint || "non dichiarata",
      observedAtLabel: input.observedAtLabel || "runtime-dry-run",
    },
    regions,
    summary: {
      totalRegions: regions.length,
      highestSeverity: highestSeverity(regions),
      affectedTissues,
      visibleSigns,
      distribution: distributions,
      aiEvidenceReadiness: providerReady ? "ready-for-provider-preview" : "needs-more-annotation",
    },
    aiEvidenceMap: {
      providerReady,
      structuredRegions: regions.length,
      minimumRegionsRequired: 2,
      recommendedAdditionalPhotos: additionalPhotos,
      promptHints: [
        `Coltura: ${input.crop || "non dichiarata"}.`,
        `Contesto: ${input.plantContext || "non dichiarato"}.`,
        `Area: ${input.locationHint || "non dichiarata"}.`,
        `Regioni annotate: ${regions.length}.`,
        `Segni visibili: ${visibleSigns.join(", ") || "non dichiarati"}.`,
        "Richiedere diagnosi probabilistica, non prescrittiva.",
        "Mantenere revisione umana obbligatoria.",
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
  };
}

export function createPhotoSymptomAnnotationFixture(): PhotoSymptomAnnotationInput {
  return {
    photoId: "fixture-symptom-photo",
    photoRole: "symptom-close-up",
    fileName: "leaf-symptoms.webp",
    plantContext: "vite in filare",
    locationHint: "serra nord",
    crop: "vite",
    observedAtLabel: "dry-run",
    regions: [
      {
        id: "region-1",
        label: "Macchie fogliari principali",
        tissue: "leaf-upper",
        severity: "medium",
        distribution: "localized",
        normalizedBox: {
          x: 18,
          y: 24,
          width: 28,
          height: 22,
        },
        visibleSigns: ["macchie brune", "alone giallo"],
        operatorNote: "Sintomo evidente sul lembo superiore.",
      },
      {
        id: "region-2",
        label: "Ingiallimento secondario",
        tissue: "leaf-upper",
        severity: "low",
        distribution: "scattered",
        normalizedBox: {
          x: 56,
          y: 38,
          width: 24,
          height: 28,
        },
        visibleSigns: ["ingiallimento", "decolorazione"],
        operatorNote: "Area meno intensa da monitorare.",
      },
    ],
  };
}

export function createIncompletePhotoSymptomAnnotationFixture(): PhotoSymptomAnnotationInput {
  return {
    photoId: "fixture-incomplete-photo",
    photoRole: "unknown",
    fileName: "unclear.webp",
    plantContext: "",
    locationHint: "",
    crop: "",
    observedAtLabel: "dry-run",
    regions: [
      {
        id: "region-1",
        label: "",
        tissue: "unknown",
        severity: "low",
        distribution: "unknown",
        normalizedBox: {
          x: 50,
          y: 50,
          width: 10,
          height: 10,
        },
        visibleSigns: [],
        operatorNote: "",
      },
    ],
  };
}

export function formatPhotoSymptomAnnotationMap(map: PhotoSymptomAnnotationMap) {
  return [
    "AI Photo Symptom Annotation Map",
    "",
    `Annotation ID: ${map.annotationId}`,
    `Fingerprint: ${map.annotationFingerprint}`,
    `Version: ${map.annotationVersion}`,
    `Photo ID: ${map.photoId}`,
    `Photo role: ${map.photoRole}`,
    `Provider ready: ${map.aiEvidenceMap.providerReady ? "yes" : "no"}`,
    "",
    "Summary:",
    `- totalRegions: ${map.summary.totalRegions}`,
    `- highestSeverity: ${map.summary.highestSeverity}`,
    `- affectedTissues: ${map.summary.affectedTissues.join(", ") || "none"}`,
    `- visibleSigns: ${map.summary.visibleSigns.join(", ") || "none"}`,
    `- readiness: ${map.summary.aiEvidenceReadiness}`,
    "",
    "Regions:",
    ...map.regions.map((region) => {
      return [
        `- ${region.id}: ${region.label}`,
        `  tissue=${region.tissue}`,
        `  severity=${region.severity}`,
        `  distribution=${region.distribution}`,
        `  box=${region.normalizedBox.x},${region.normalizedBox.y},${region.normalizedBox.width},${region.normalizedBox.height}`,
        `  signs=${region.visibleSigns.join(", ") || "none"}`,
        `  note=${region.operatorNote || "none"}`,
      ].join("\n");
    }),
    "",
    "Recommended additional photos:",
    ...(map.aiEvidenceMap.recommendedAdditionalPhotos.length
      ? map.aiEvidenceMap.recommendedAdditionalPhotos.map((item) => `- ${item}`)
      : ["- none"]),
    "",
    "Safety:",
    "- providerCalled=false",
    "- persistencePerformed=false",
    "- automaticTaskCreationPerformed=false",
    "- automaticInterventionCreationPerformed=false",
    "- allowedToExecute=false",
    "- humanReviewRequired=true",
    "- redactedOutputOnly=true",
  ].join("\n");
}
