"use client";

import { useMemo, useState } from "react";

import {
  createPhotoEvidenceBundle,
  formatPhotoEvidenceBundle,
  type PhotoEvidenceInput,
  type PhotoEvidenceRole,
} from "../../../lib/ai/photoEvidenceBundle";

const roleOptions: Array<{ value: PhotoEvidenceRole; label: string }> = [
  { value: "symptom-close-up", label: "Dettaglio sintomo" },
  { value: "whole-plant", label: "Pianta intera" },
  { value: "leaf-underside", label: "Pagina inferiore foglia" },
  { value: "field-context", label: "Contesto campo/serra" },
  { value: "other", label: "Altro" },
];

function roleFromIndex(index: number): PhotoEvidenceRole {
  return roleOptions[index]?.value || "other";
}

function createPhotoInput(file: File, index: number): PhotoEvidenceInput {
  return {
    id: `photo-${index + 1}`,
    role: roleFromIndex(index),
    caption: roleOptions[index]?.label || `Foto ${index + 1}`,
    fileName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
    widthPx: 0,
    heightPx: 0,
    includesCloseUp: index === 0,
    includesWholePlant: index === 1,
    includesUnderside: index === 2,
    hasPlantContext: index === 1,
    hasSymptoms: index === 0,
    hasLocationHint: index === 3,
    photoCount: 1,
  };
}

export default function PhotoEvidenceBundleBuilder() {
  const [photos, setPhotos] = useState<PhotoEvidenceInput[]>([]);
  const [plantContext, setPlantContext] = useState("");
  const [locationHint, setLocationHint] = useState("");
  const [symptomsText, setSymptomsText] = useState("");
  const [suspectedCrop, setSuspectedCrop] = useState("");
  const [operatorNotes, setOperatorNotes] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const bundle = useMemo(() => {
    return createPhotoEvidenceBundle({
      plantContext,
      locationHint,
      suspectedCrop,
      operatorNotes,
      urgency: "medium",
      symptoms: symptomsText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      photos: photos.map((photo) => ({
        ...photo,
        photoCount: photos.length,
        hasPlantContext: Boolean(plantContext) || photo.hasPlantContext,
        hasSymptoms: symptomsText.trim().length > 0 || photo.hasSymptoms,
        hasLocationHint: Boolean(locationHint) || photo.hasLocationHint,
        operatorNotes,
      })),
    });
  }, [locationHint, operatorNotes, photos, plantContext, suspectedCrop, symptomsText]);

  function handleFiles(files: FileList | null) {
    setCopyState("idle");

    if (!files || files.length === 0) {
      setPhotos([]);
      return;
    }

    const selected = Array.from(files).slice(0, 8).map(createPhotoInput);
    setPhotos(selected);

    selected.forEach((photo, index) => {
      const file = files[index];

      if (!file) {
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      const image = new Image();

      image.onload = () => {
        setPhotos((current) =>
          current.map((item) =>
            item.id === photo.id
              ? {
                  ...item,
                  widthPx: image.naturalWidth || image.width,
                  heightPx: image.naturalHeight || image.height,
                }
              : item,
          ),
        );
        URL.revokeObjectURL(objectUrl);
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
      };

      image.src = objectUrl;
    });
  }

  function updateRole(id: string, role: PhotoEvidenceRole) {
    setPhotos((current) =>
      current.map((photo) => ({
        ...photo,
        role: photo.id === id ? role : photo.role,
        includesCloseUp: photo.id === id ? role === "symptom-close-up" : photo.includesCloseUp,
        includesWholePlant: photo.id === id ? role === "whole-plant" : photo.includesWholePlant,
        includesUnderside: photo.id === id ? role === "leaf-underside" : photo.includesUnderside,
      })),
    );
  }

  async function copyBundle() {
    try {
      await navigator.clipboard.writeText(formatPhotoEvidenceBundle(bundle));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-photo-evidence-bundle="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Photo Evidence Bundle
        </p>
        <h2 className="text-xl font-semibold">Pacchetto evidenze per diagnosi assistita</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Raggruppa più foto, ruoli fotografici, qualità, sintomi e contesto in un bundle pronto per
          la futura pipeline AI. Nessun upload, nessuna chiamata provider e nessun salvataggio vengono
          eseguiti.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <label className="block text-sm font-medium">Foto evidenza</label>
          <input
            className="mt-3 w-full rounded-lg border p-2 text-sm"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(event) => handleFiles(event.target.files)}
          />

          <div className="mt-4 grid gap-3">
            {photos.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Seleziona fino a 8 foto. Idealmente: dettaglio sintomo, pianta intera, pagina inferiore
                foglia e contesto campo/serra.
              </p>
            ) : null}

            {photos.map((photo) => (
              <div key={photo.id} className="rounded-lg border p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{photo.fileName}</p>
                    <p className="text-muted-foreground">
                      {photo.mimeType || "mime non disponibile"} — {photo.widthPx || 0}x
                      {photo.heightPx || 0}px
                    </p>
                  </div>
                  <select
                    className="rounded-lg border p-2 text-sm"
                    value={photo.role}
                    onChange={(event) => updateRole(photo.id || "", event.target.value as PhotoEvidenceRole)}
                  >
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              placeholder="Coltura/contesto pianta"
              value={plantContext}
              onChange={(event) => setPlantContext(event.target.value)}
            />
            <input
              className="rounded-lg border p-2 text-sm"
              placeholder="Area, serra, filare o posizione"
              value={locationHint}
              onChange={(event) => setLocationHint(event.target.value)}
            />
            <input
              className="rounded-lg border p-2 text-sm"
              placeholder="Coltura sospetta, es. vite, agrume, olivo"
              value={suspectedCrop}
              onChange={(event) => setSuspectedCrop(event.target.value)}
            />
            <input
              className="rounded-lg border p-2 text-sm"
              placeholder="Sintomi separati da virgola"
              value={symptomsText}
              onChange={(event) => setSymptomsText(event.target.value)}
            />
            <textarea
              className="min-h-24 rounded-lg border p-2 text-sm"
              placeholder="Note operatore: comparsa sintomi, irrigazione, trattamenti recenti..."
              value={operatorNotes}
              onChange={(event) => setOperatorNotes(event.target.value)}
            />
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Readiness bundle</p>
              <p className="text-lg font-semibold">
                {bundle.readiness} — score {bundle.bundleScore}/100
              </p>
            </div>
            <span className="rounded-full border px-3 py-1 text-sm">
              {bundle.acceptedForAiPipeline
                ? "Pronto per pipeline assistita"
                : "Da completare"}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Evidenze mancanti</h3>
            {bundle.missingEvidence.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {bundle.missingEvidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">Nessuna evidenza obbligatoria mancante.</p>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Foto nel bundle</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {bundle.evidenceItems.map((item) => (
                <li key={item.id} className="rounded-lg border p-3">
                  <p className="font-medium text-foreground">{item.caption}</p>
                  <p>
                    {item.role} — {item.quality.grade} — score {item.quality.score}/100
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Raccomandazioni</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {bundle.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="mt-4 rounded-lg border px-3 py-2 text-sm font-medium"
            onClick={copyBundle}
          >
            Copia evidence bundle
          </button>
          {copyState === "copied" ? (
            <p className="mt-2 text-sm text-muted-foreground">Bundle copiato.</p>
          ) : null}
          {copyState === "error" ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Copia non riuscita. Puoi selezionare manualmente il contenuto.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
