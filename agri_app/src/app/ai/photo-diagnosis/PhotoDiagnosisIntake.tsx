"use client";

import { useEffect, useMemo, useState } from "react";

const maxImageSizeMb = 8;
const maxImageSizeBytes = maxImageSizeMb * 1024 * 1024;

const symptomOptions = [
  "Macchie fogliari",
  "Ingiallimento",
  "Appassimento",
  "Secchezza",
  "Muffa o patina",
  "Fori o rosure",
  "Deformazioni",
  "Crescita rallentata",
  "Radici compromesse",
  "Altro sintomo visibile",
];

const severityOptions = [
  "Bassa",
  "Media",
  "Alta",
  "Critica",
];

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes)) {
    return "—";
  }

  const mb = bytes / 1024 / 1024;
  return `${mb.toFixed(2)} MB`;
}

export default function PhotoDiagnosisIntake() {
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileType, setFileType] = useState("");
  const [error, setError] = useState("");
  const [plantName, setPlantName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState("Media");
  const [notes, setNotes] = useState("");
  const [briefReady, setBriefReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const diagnosisBrief = useMemo(() => {
    return [
      "Brief diagnosi fotografica AI — bozza locale",
      "",
      `File immagine: ${fileName || "non selezionato"}`,
      `Tipo file: ${fileType || "non disponibile"}`,
      `Dimensione: ${fileSize ? formatBytes(fileSize) : "non disponibile"}`,
      `Pianta/coltura: ${plantName || "non indicata"}`,
      `Area/posizione: ${location || "non indicata"}`,
      `Sintomi visibili: ${selectedSymptoms.length ? selectedSymptoms.join(", ") : "non indicati"}`,
      `Gravità percepita: ${severity}`,
      `Note operatore: ${notes || "nessuna nota"}`,
      "",
      "Istruzioni future per AI:",
      "- descrivere ciò che è visibile nella foto;",
      "- identificare possibili problemi agricoli o fitosanitari;",
      "- indicare confidenza e dati mancanti;",
      "- proporre azioni operative, priorità e follow-up;",
      "- distinguere ipotesi, raccomandazioni e azioni confermate.",
      "",
      "Stato attuale: Analisi AI non ancora attiva in questa release.",
    ].join("\n");
  }, [fileName, fileSize, fileType, location, notes, plantName, selectedSymptoms, severity]);

  function toggleSymptom(symptom: string) {
    setSelectedSymptoms((current) =>
      current.includes(symptom)
        ? current.filter((item) => item !== symptom)
        : [...current, symptom],
    );
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    setError("");
    setBriefReady(false);
    setCopyStatus("");

    if (!file) {
      setPreviewUrl("");
      setFileName("");
      setFileSize(0);
      setFileType("");
      return;
    }

    const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

    if (!allowedTypes.has(file.type)) {
      setError("Formato non supportato. Usa JPG, PNG o WEBP.");
      setPreviewUrl("");
      setFileName("");
      setFileSize(0);
      setFileType("");
      return;
    }

    if (file.size > maxImageSizeBytes) {
      setError(`Immagine troppo grande. Limite massimo: ${maxImageSizeMb} MB.`);
      setPreviewUrl("");
      setFileName("");
      setFileSize(0);
      setFileType("");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
    setFileName(file.name);
    setFileSize(file.size);
    setFileType(file.type);
  }

  function prepareBrief() {
    if (!fileName) {
      setError("Seleziona prima una foto valida.");
      return;
    }

    setError("");
    setBriefReady(true);
    setCopyStatus("");
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(diagnosisBrief);
      setCopyStatus("Brief copiato negli appunti.");
    } catch {
      setCopyStatus("Copia non riuscita. Copia manualmente il testo.");
    }
  }

  return (
    <section className="grid gap-6" data-ai-photo-diagnosis-intake="true">
      <article className="rounded-2xl border p-5 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            AI Photo Diagnosis Intake
          </p>
          <h2 className="text-xl font-semibold">Carica una foto e prepara il brief diagnosi</h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Questa schermata prepara il flusso premium di riconoscimento foto e diagnosi assistita.
            L’analisi AI non è ancora attiva: nessuna immagine viene inviata a provider esterni.
          </p>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-xl border p-4">
            <label className="block">
              <span className="text-sm font-medium">Foto pianta o problema visibile</span>
              <input
                accept="image/jpeg,image/png,image/webp"
                className="mt-2 w-full rounded-xl border px-3 py-2 text-sm"
                type="file"
                onChange={handleFileChange}
              />
            </label>

            <p className="mt-2 text-xs text-muted-foreground">
              Formati ammessi: JPG, PNG, WEBP. Dimensione massima: {maxImageSizeMb} MB.
            </p>

            {error ? (
              <p className="mt-3 rounded-xl border p-3 text-sm text-muted-foreground">
                {error}
              </p>
            ) : null}

            {previewUrl ? (
              <div className="mt-4 overflow-hidden rounded-xl border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Preview diagnosi fotografica" className="h-auto w-full" src={previewUrl} />
              </div>
            ) : (
              <div className="mt-4 rounded-xl border p-6 text-center text-sm text-muted-foreground">
                Nessuna immagine selezionata.
              </div>
            )}

            {fileName ? (
              <dl className="mt-4 grid gap-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">File</dt>
                  <dd className="text-right font-medium">{fileName}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Tipo</dt>
                  <dd className="font-medium">{fileType}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Dimensione</dt>
                  <dd className="font-medium">{formatBytes(fileSize)}</dd>
                </div>
              </dl>
            ) : null}
          </div>

          <div className="rounded-xl border p-4">
            <div className="grid gap-4">
              <label className="block">
                <span className="text-sm font-medium">Pianta o coltura</span>
                <input
                  className="mt-2 w-full rounded-xl border bg-background px-4 py-2 text-sm"
                  placeholder="Esempio: vite, pomodoro, olivo…"
                  value={plantName}
                  onChange={(event) => setPlantName(event.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Area o posizione</span>
                <input
                  className="mt-2 w-full rounded-xl border bg-background px-4 py-2 text-sm"
                  placeholder="Serra nord, filare 3, vaso balcone…"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </label>

              <div>
                <p className="text-sm font-medium">Sintomi visibili</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {symptomOptions.map((symptom) => (
                    <label key={symptom} className="flex items-center gap-2 rounded-xl border p-3 text-sm">
                      <input
                        checked={selectedSymptoms.includes(symptom)}
                        type="checkbox"
                        onChange={() => toggleSymptom(symptom)}
                      />
                      {symptom}
                    </label>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-sm font-medium">Gravità percepita</span>
                <select
                  className="mt-2 w-full rounded-xl border bg-background px-4 py-2 text-sm"
                  value={severity}
                  onChange={(event) => setSeverity(event.target.value)}
                >
                  {severityOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium">Note utili</span>
                <textarea
                  className="mt-2 min-h-28 w-full rounded-xl border bg-background px-4 py-2 text-sm"
                  placeholder="Quando è comparso il problema? Irrigazione? Trattamenti recenti? Meteo?"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </label>

              <button
                className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
                type="button"
                onClick={prepareBrief}
              >
                Prepara richiesta AI
              </button>
            </div>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Brief diagnosi locale</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Testo generato localmente per preparare la futura analisi AI. Non contiene chiamate live.
            </p>
          </div>
          <button
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
            disabled={!briefReady}
            type="button"
            onClick={copyBrief}
          >
            Copia brief
          </button>
        </div>

        {copyStatus ? (
          <p className="mt-3 rounded-xl border p-3 text-sm text-muted-foreground">{copyStatus}</p>
        ) : null}

        <pre className="mt-4 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>{briefReady ? diagnosisBrief : "Prepara il brief dopo aver selezionato una foto valida."}</code>
        </pre>
      </article>
    </section>
  );
}
