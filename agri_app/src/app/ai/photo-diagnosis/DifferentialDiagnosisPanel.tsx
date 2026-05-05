"use client";

import { useMemo, useState } from "react";

import {
  createDifferentialDiagnosisMatrix,
  formatDifferentialDiagnosisMatrix,
} from "../../../lib/ai/photoDifferentialDiagnosis";
import {
  createPhotoSymptomAnnotationFixture,
  type SymptomSeverity,
} from "../../../lib/ai/photoSymptomAnnotation";

export default function DifferentialDiagnosisPanel() {
  const [crop, setCrop] = useState("vite");
  const [plantContext, setPlantContext] = useState("vite in filare");
  const [locationHint, setLocationHint] = useState("serra nord");
  const [visibleSignsText, setVisibleSignsText] = useState("macchie brune, alone giallo, ingiallimento");
  const [severity, setSeverity] = useState<SymptomSeverity>("medium");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const matrix = useMemo(() => {
    const fixture = createPhotoSymptomAnnotationFixture();
    const signs = visibleSignsText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    return createDifferentialDiagnosisMatrix({
      ...fixture,
      crop,
      plantContext,
      locationHint,
      regions: fixture.regions.map((region, index) => ({
        ...region,
        severity: index === 0 ? severity : region.severity,
        visibleSigns: signs.length ? signs : region.visibleSigns,
      })),
    });
  }, [crop, locationHint, plantContext, severity, visibleSignsText]);

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(formatDifferentialDiagnosisMatrix(matrix));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(matrix, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-differential-diagnosis="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Differential Diagnosis Matrix
        </p>
        <h2 className="text-xl font-semibold">Diagnosi differenziale spiegabile</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Ordina ipotesi diagnostiche locali usando annotation map, segni visibili e severità.
          Mostra evidenze a favore, contro, mancanti e prossime evidenze da raccogliere. È un
          dry-run senza provider AI e senza azioni automatiche.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input differenziale</h3>
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
            <input
              className="rounded-lg border p-2 text-sm"
              value={visibleSignsText}
              onChange={(event) => setVisibleSignsText(event.target.value)}
              placeholder="Segni visibili separati da virgola"
            />
            <select
              className="rounded-lg border p-2 text-sm"
              value={severity}
              onChange={(event) => setSeverity(event.target.value as SymptomSeverity)}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="critical">critical</option>
            </select>
          </div>

          <div className="mt-4 rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">Matrix fingerprint</p>
            <p className="break-all font-semibold">{matrix.matrixFingerprint}</p>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Top candidate</p>
              <p className="font-semibold">{matrix.topCandidate?.label || "nessuna ipotesi"}</p>
            </div>
            {matrix.topCandidate ? (
              <span className="rounded-full border px-3 py-1 text-sm">
                score {matrix.topCandidate.score}
              </span>
            ) : null}
          </div>

          <div className="mt-4 grid gap-3">
            {matrix.candidates.slice(0, 5).map((candidate) => (
              <div key={candidate.id} className="rounded-xl border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{candidate.label}</p>
                  <span className="rounded-full border px-2 py-1 text-xs">
                    {candidate.confidenceBand} / {candidate.riskBand}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Score {candidate.score} · categoria {candidate.category}
                </p>

                <div className="mt-3 grid gap-2 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      Evidenze a favore
                    </p>
                    <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
                      {candidate.evidenceFor.length ? (
                        candidate.evidenceFor.map((item) => <li key={item.id}>{item.label}</li>)
                      ) : (
                        <li>nessuna</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      Evidenze contro
                    </p>
                    <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
                      {candidate.evidenceAgainst.length ? (
                        candidate.evidenceAgainst.map((item) => <li key={item.id}>{item.label}</li>)
                      ) : (
                        <li>nessuna</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      Mancanti
                    </p>
                    <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
                      {candidate.evidenceMissing.length ? (
                        candidate.evidenceMissing.map((item) => <li key={item.id}>{item.label}</li>)
                      ) : (
                        <li>nessuna</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Evidence gaps</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {matrix.evidenceGaps.length ? (
              matrix.evidenceGaps.map((gap) => <li key={gap}>{gap}</li>)
            ) : (
              <li>Nessun gap principale.</li>
            )}
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
              Copia matrice differenziale
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={copyJson}
            >
              Esporta matrix JSON
            </button>
          </div>
          {copyState === "copied" ? (
            <p className="mt-2 text-sm text-muted-foreground">Matrice copiata.</p>
          ) : null}
          {copyState === "error" ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Copia non riuscita. Puoi selezionare manualmente il contenuto.
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Safety</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>providerCalled=false</li>
          <li>persistencePerformed=false</li>
          <li>automaticTaskCreationPerformed=false</li>
          <li>automaticInterventionCreationPerformed=false</li>
          <li>allowedToExecute=false</li>
          <li>humanReviewRequired=true</li>
        </ul>
      </div>

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatDifferentialDiagnosisMatrix(matrix)}</code>
      </pre>
    </section>
  );
}
