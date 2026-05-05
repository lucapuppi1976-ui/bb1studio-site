"use client";

import { useMemo, useState } from "react";

import {
  assessPhotoQuality,
  formatPhotoQualityAssessment,
  type PhotoQualityInput,
} from "../../../lib/ai/photoQualityGate";

type EvidenceState = Pick<
  PhotoQualityInput,
  | "includesWholePlant"
  | "includesCloseUp"
  | "includesUnderside"
  | "hasPlantContext"
  | "hasSymptoms"
  | "hasLocationHint"
>;

const initialEvidence: Required<EvidenceState> = {
  includesWholePlant: false,
  includesCloseUp: true,
  includesUnderside: false,
  hasPlantContext: false,
  hasSymptoms: true,
  hasLocationHint: false,
};

function bytesToMb(bytes: number) {
  return Math.round((bytes / 1024 / 1024) * 10) / 10;
}

export default function PhotoQualityGatePanel() {
  const [fileInput, setFileInput] = useState<PhotoQualityInput | null>(null);
  const [evidence, setEvidence] = useState<Required<EvidenceState>>(initialEvidence);
  const [operatorNotes, setOperatorNotes] = useState("");
  const [photoCount, setPhotoCount] = useState(1);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const assessment = useMemo(() => {
    if (!fileInput) {
      return null;
    }

    return assessPhotoQuality({
      ...fileInput,
      ...evidence,
      photoCount,
      operatorNotes,
    });
  }, [evidence, fileInput, operatorNotes, photoCount]);

  function updateEvidence(key: keyof EvidenceState, value: boolean) {
    setEvidence((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleFile(file: File | null) {
    setCopyState("idle");

    if (!file) {
      setFileInput(null);
      return;
    }

    const baseInput: PhotoQualityInput = {
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
      widthPx: 0,
      heightPx: 0,
    };

    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      setFileInput({
        ...baseInput,
        widthPx: image.naturalWidth || image.width,
        heightPx: image.naturalHeight || image.height,
      });
      URL.revokeObjectURL(objectUrl);
    };

    image.onerror = () => {
      setFileInput(baseInput);
      URL.revokeObjectURL(objectUrl);
    };

    image.src = objectUrl;
  }

  async function copyAssessment() {
    if (!assessment) {
      return;
    }

    try {
      await navigator.clipboard.writeText(formatPhotoQualityAssessment(assessment));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-photo-quality-gate="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Photo Quality Gate
        </p>
        <h2 className="text-xl font-semibold">Controllo qualità foto prima della pipeline AI</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Valida formato, peso, risoluzione, numero foto e contesto operativo. Nessuna immagine viene
          caricata: il controllo resta locale nel browser e serve solo a preparare materiale migliore
          per la diagnosi assistita.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <label className="block text-sm font-medium">Foto da valutare</label>
          <input
            className="mt-3 w-full rounded-lg border p-2 text-sm"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => handleFile(event.target.files?.[0] || null)}
          />

          {fileInput ? (
            <div className="mt-4 rounded-lg border p-3 text-sm text-muted-foreground">
              <p>
                <strong>File:</strong> {fileInput.fileName}
              </p>
              <p>
                <strong>Formato:</strong> {fileInput.mimeType || "non disponibile"}
              </p>
              <p>
                <strong>Peso:</strong> {bytesToMb(fileInput.sizeBytes || 0)} MB
              </p>
              <p>
                <strong>Risoluzione:</strong> {fileInput.widthPx || 0} x {fileInput.heightPx || 0}px
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Seleziona una foto JPEG, PNG o WEBP. Nessun upload viene eseguito.
            </p>
          )}

          <label className="mt-4 block text-sm font-medium">Numero foto disponibili</label>
          <input
            className="mt-2 w-full rounded-lg border p-2 text-sm"
            type="number"
            min={1}
            max={12}
            value={photoCount}
            onChange={(event) => setPhotoCount(Math.max(1, Number(event.target.value) || 1))}
          />

          <label className="mt-4 block text-sm font-medium">Note operatore</label>
          <textarea
            className="mt-2 min-h-24 w-full rounded-lg border p-2 text-sm"
            placeholder="Esempio: sintomi comparsi da 3 giorni, irrigazione aumentata, nessun trattamento recente."
            value={operatorNotes}
            onChange={(event) => setOperatorNotes(event.target.value)}
          />
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Contesto disponibile</h3>
          <div className="mt-3 space-y-3 text-sm">
            {[
              ["includesCloseUp", "Foto ravvicinata del sintomo"],
              ["includesWholePlant", "Foto della pianta intera"],
              ["includesUnderside", "Foto pagina inferiore foglia"],
              ["hasPlantContext", "Coltura/contesto pianta indicati"],
              ["hasSymptoms", "Sintomi descritti"],
              ["hasLocationHint", "Area, serra, filare o posizione indicata"],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(evidence[key as keyof EvidenceState])}
                  onChange={(event) =>
                    updateEvidence(key as keyof EvidenceState, event.target.checked)
                  }
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          {assessment ? (
            <div className="mt-5 rounded-xl border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Esito qualità</p>
                  <p className="text-lg font-semibold">
                    {assessment.grade} — score {assessment.score}/100
                  </p>
                </div>
                <span className="rounded-full border px-3 py-1 text-sm">
                  {assessment.acceptedForAiPipeline
                    ? "Idonea per pipeline AI"
                    : "Da migliorare prima della pipeline"}
                </span>
              </div>

              {assessment.blockers.length > 0 ? (
                <div className="mt-4">
                  <h4 className="font-medium">Bloccanti</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {assessment.blockers.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-4">
                <h4 className="font-medium">Raccomandazioni</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {assessment.recommendations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {assessment.requiredNextPhotos.length > 0 ? (
                <div className="mt-4">
                  <h4 className="font-medium">Prossime foto richieste</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {assessment.requiredNextPhotos.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <button
                type="button"
                className="mt-4 rounded-lg border px-3 py-2 text-sm font-medium"
                onClick={copyAssessment}
              >
                Copia quality report
              </button>
              {copyState === "copied" ? (
                <p className="mt-2 text-sm text-muted-foreground">Report copiato.</p>
              ) : null}
              {copyState === "error" ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  Copia non riuscita. Puoi selezionare manualmente il testo.
                </p>
              ) : null}
            </div>
          ) : (
            <p className="mt-5 text-sm text-muted-foreground">
              Il quality gate sarà calcolato appena selezioni una foto.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
