"use client";

import { useMemo, useState } from "react";

import {
  createPhotoSymptomAnnotationMap,
  formatPhotoSymptomAnnotationMap,
  type AffectedTissue,
  type PhotoSymptomRegion,
  type SymptomDistribution,
  type SymptomSeverity,
} from "../../../lib/ai/photoSymptomAnnotation";

const severityOptions: SymptomSeverity[] = ["low", "medium", "high", "critical"];
const tissueOptions: AffectedTissue[] = [
  "leaf-upper",
  "leaf-underside",
  "stem",
  "fruit",
  "flower",
  "root",
  "whole-plant",
  "unknown",
];
const distributionOptions: SymptomDistribution[] = [
  "localized",
  "scattered",
  "diffuse",
  "progressive",
  "unknown",
];

function createRegion(index: number): PhotoSymptomRegion {
  return {
    id: `region-${index}`,
    label: `Regione sintomo ${index}`,
    tissue: index % 2 === 0 ? "leaf-underside" : "leaf-upper",
    severity: index % 2 === 0 ? "low" : "medium",
    distribution: index % 2 === 0 ? "scattered" : "localized",
    normalizedBox: {
      x: 12 + index * 8,
      y: 18 + index * 6,
      width: 24,
      height: 18,
    },
    visibleSigns: index % 2 === 0 ? ["ingiallimento"] : ["macchie brune", "alone giallo"],
    operatorNote: "Annotazione sintomo da validare in campo.",
  };
}

export default function PhotoSymptomAnnotationPanel() {
  const [plantContext, setPlantContext] = useState("vite in filare");
  const [locationHint, setLocationHint] = useState("serra nord");
  const [crop, setCrop] = useState("vite");
  const [regions, setRegions] = useState<PhotoSymptomRegion[]>([
    createRegion(1),
    createRegion(2),
  ]);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const annotationMap = useMemo(() => {
    return createPhotoSymptomAnnotationMap({
      photoId: "operator-photo-runtime",
      photoRole: "symptom-close-up",
      fileName: "foto-operatore.webp",
      plantContext,
      locationHint,
      crop,
      observedAtLabel: "runtime-ui",
      regions,
    });
  }, [crop, locationHint, plantContext, regions]);

  function updateRegion(id: string, patch: Partial<PhotoSymptomRegion>) {
    setRegions((current) =>
      current.map((region) => (region.id === id ? { ...region, ...patch } : region)),
    );
  }

  function updateRegionBox(
    id: string,
    key: keyof PhotoSymptomRegion["normalizedBox"],
    value: number,
  ) {
    setRegions((current) =>
      current.map((region) =>
        region.id === id
          ? {
              ...region,
              normalizedBox: {
                ...region.normalizedBox,
                [key]: Number.isFinite(value) ? value : 0,
              },
            }
          : region,
      ),
    );
  }

  function updateVisibleSigns(id: string, value: string) {
    updateRegion(id, {
      visibleSigns: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  }

  function addRegion() {
    setRegions((current) => [...current, createRegion(current.length + 1)]);
  }

  function removeRegion(id: string) {
    setRegions((current) => current.filter((region) => region.id !== id));
  }

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(formatPhotoSymptomAnnotationMap(annotationMap));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(annotationMap, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-photo-symptom-annotation="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Photo Symptom Annotation
        </p>
        <h2 className="text-xl font-semibold">Mappa sintomi fotografica</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Trasforma una foto in una evidence map strutturata: regioni normalizzate, tessuto colpito,
          severità, distribuzione, segni visibili e note operatore. È un dry-run locale senza provider
          AI, senza persistenza e senza creazione automatica di attività.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Contesto foto</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={crop}
              onChange={(event) => setCrop(event.target.value)}
              placeholder="Coltura"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={plantContext}
              onChange={(event) => setPlantContext(event.target.value)}
              placeholder="Contesto pianta"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={locationHint}
              onChange={(event) => setLocationHint(event.target.value)}
              placeholder="Area, serra, filare"
            />
          </div>

          <div className="mt-5 rounded-xl border p-4">
            <div className="relative h-64 overflow-hidden rounded-xl border bg-muted/30">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-40">
                {Array.from({ length: 16 }).map((_, index) => (
                  <div key={index} className="border" />
                ))}
              </div>
              {annotationMap.regions.map((region) => (
                <div
                  key={region.id}
                  className="absolute rounded-lg border-2 bg-background/70 p-1 text-[10px] shadow-sm"
                  style={{
                    left: `${region.normalizedBox.x}%`,
                    top: `${region.normalizedBox.y}%`,
                    width: `${region.normalizedBox.width}%`,
                    height: `${region.normalizedBox.height}%`,
                  }}
                >
                  {region.label}
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Preview normalizzata: coordinate x/y/w/h in percentuale, non disegna sulla foto reale.
            </p>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Annotation fingerprint</p>
              <p className="break-all font-semibold">{annotationMap.annotationFingerprint}</p>
            </div>
            <span className="rounded-full border px-3 py-1 text-sm">
              {annotationMap.summary.aiEvidenceReadiness}
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {regions.map((region) => (
              <div key={region.id} className="rounded-xl border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <input
                    className="rounded-lg border p-2 text-sm font-medium"
                    value={region.label}
                    onChange={(event) => updateRegion(region.id, { label: event.target.value })}
                  />
                  <button
                    type="button"
                    className="rounded-lg border px-3 py-2 text-sm"
                    onClick={() => removeRegion(region.id)}
                  >
                    Rimuovi
                  </button>
                </div>

                <div className="mt-3 grid gap-2 md:grid-cols-3">
                  <select
                    className="rounded-lg border p-2 text-sm"
                    value={region.tissue}
                    onChange={(event) =>
                      updateRegion(region.id, { tissue: event.target.value as AffectedTissue })
                    }
                  >
                    {tissueOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <select
                    className="rounded-lg border p-2 text-sm"
                    value={region.severity}
                    onChange={(event) =>
                      updateRegion(region.id, { severity: event.target.value as SymptomSeverity })
                    }
                  >
                    {severityOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <select
                    className="rounded-lg border p-2 text-sm"
                    value={region.distribution}
                    onChange={(event) =>
                      updateRegion(region.id, {
                        distribution: event.target.value as SymptomDistribution,
                      })
                    }
                  >
                    {distributionOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-3 grid gap-2 md:grid-cols-4">
                  {(["x", "y", "width", "height"] as const).map((key) => (
                    <label key={key} className="text-xs text-muted-foreground">
                      {key}
                      <input
                        className="mt-1 w-full rounded-lg border p-2 text-sm"
                        type="number"
                        min={0}
                        max={100}
                        value={region.normalizedBox[key]}
                        onChange={(event) =>
                          updateRegionBox(region.id, key, Number(event.target.value))
                        }
                      />
                    </label>
                  ))}
                </div>

                <input
                  className="mt-3 w-full rounded-lg border p-2 text-sm"
                  value={region.visibleSigns.join(", ")}
                  onChange={(event) => updateVisibleSigns(region.id, event.target.value)}
                  placeholder="Segni visibili separati da virgola"
                />

                <textarea
                  className="mt-3 min-h-20 w-full rounded-lg border p-2 text-sm"
                  value={region.operatorNote}
                  onChange={(event) => updateRegion(region.id, { operatorNote: event.target.value })}
                  placeholder="Nota operatore"
                />
              </div>
            ))}
          </div>

          <button type="button" className="mt-4 rounded-lg border px-3 py-2 text-sm" onClick={addRegion}>
            Aggiungi regione sintomo
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Evidence map AI-ready</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>providerReady={String(annotationMap.aiEvidenceMap.providerReady)}</li>
            <li>structuredRegions={annotationMap.aiEvidenceMap.structuredRegions}</li>
            <li>highestSeverity={annotationMap.summary.highestSeverity}</li>
            <li>humanReviewRequired=true</li>
            <li>allowedToExecute=false</li>
          </ul>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Export</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={copyReport}
            >
              Copia mappa sintomi
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={copyJson}
            >
              Esporta annotation JSON
            </button>
          </div>
          {copyState === "copied" ? (
            <p className="mt-2 text-sm text-muted-foreground">Annotation copiata.</p>
          ) : null}
          {copyState === "error" ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Copia non riuscita. Puoi selezionare manualmente il contenuto.
            </p>
          ) : null}
        </div>
      </div>

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatPhotoSymptomAnnotationMap(annotationMap)}</code>
      </pre>
    </section>
  );
}
