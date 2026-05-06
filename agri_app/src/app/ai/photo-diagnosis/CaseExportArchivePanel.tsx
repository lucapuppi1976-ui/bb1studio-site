"use client";

import { useMemo, useState } from "react";

import {
  createAiCaseExportArchive,
  formatAiCaseExportArchive,
  readyCaseExportArchiveInput,
  type CaseExportArchiveMode,
} from "../../../lib/ai/aiCaseExportArchive";
import {
  createReadyAiCaseExportBundle,
  createBlockedAiCaseExportBundle,
} from "../../../lib/ai/aiCaseExportBundle";

export default function CaseExportArchivePanel() {
  const [readyMode, setReadyMode] = useState(false);
  const [archiveName, setArchiveName] = useState("");
  const [preparedBy, setPreparedBy] = useState("");
  const [archiveMode, setArchiveMode] = useState<CaseExportArchiveMode>("review-archive");
  const [includeTextBundle, setIncludeTextBundle] = useState(true);
  const [includeJsonBundle, setIncludeJsonBundle] = useState(true);
  const [includeSafetySummary, setIncludeSafetySummary] = useState(true);
  const [includeRedactionManifest, setIncludeRedactionManifest] = useState(true);
  const [includeFingerprints, setIncludeFingerprints] = useState(true);
  const [includeHumanReviewNotes, setIncludeHumanReviewNotes] = useState(true);
  const [reviewerOnlyAccess, setReviewerOnlyAccess] = useState(true);
  const [downloadPrepared, setDownloadPrepared] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "downloaded" | "copied" | "error">("idle");

  const archive = useMemo(() => {
    const bundle = readyMode
      ? createReadyAiCaseExportBundle()
      : createBlockedAiCaseExportBundle();

    return createAiCaseExportArchive(bundle, {
      archiveName,
      preparedBy,
      archiveMode,
      includeTextBundle,
      includeJsonBundle,
      includeSafetySummary,
      includeRedactionManifest,
      includeFingerprints,
      includeHumanReviewNotes,
      reviewerOnlyAccess,
      downloadPrepared,
    });
  }, [
    readyMode,
    archiveName,
    preparedBy,
    archiveMode,
    includeTextBundle,
    includeJsonBundle,
    includeSafetySummary,
    includeRedactionManifest,
    includeFingerprints,
    includeHumanReviewNotes,
    reviewerOnlyAccess,
    downloadPrepared,
  ]);

  function applyReadyFixture() {
    setReadyMode(true);
    setArchiveName(readyCaseExportArchiveInput.archiveName);
    setPreparedBy(readyCaseExportArchiveInput.preparedBy);
    setArchiveMode(readyCaseExportArchiveInput.archiveMode);
    setIncludeTextBundle(readyCaseExportArchiveInput.includeTextBundle);
    setIncludeJsonBundle(readyCaseExportArchiveInput.includeJsonBundle);
    setIncludeSafetySummary(readyCaseExportArchiveInput.includeSafetySummary);
    setIncludeRedactionManifest(readyCaseExportArchiveInput.includeRedactionManifest);
    setIncludeFingerprints(readyCaseExportArchiveInput.includeFingerprints);
    setIncludeHumanReviewNotes(readyCaseExportArchiveInput.includeHumanReviewNotes);
    setReviewerOnlyAccess(readyCaseExportArchiveInput.reviewerOnlyAccess);
    setDownloadPrepared(readyCaseExportArchiveInput.downloadPrepared);
  }

  function resetArchive() {
    setReadyMode(false);
    setArchiveName("");
    setPreparedBy("");
    setArchiveMode("review-archive");
    setIncludeTextBundle(true);
    setIncludeJsonBundle(true);
    setIncludeSafetySummary(true);
    setIncludeRedactionManifest(true);
    setIncludeFingerprints(true);
    setIncludeHumanReviewNotes(true);
    setReviewerOnlyAccess(true);
    setDownloadPrepared(false);
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(formatAiCaseExportArchive(archive));
      setDownloadState("copied");
    } catch {
      setDownloadState("error");
    }
  }

  function downloadBlob(fileName: string, value: string, mimeType: string) {
    try {
      const blob = new Blob([value], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      URL.revokeObjectURL(url);
      setDownloadState("downloaded");
    } catch {
      setDownloadState("error");
    }
  }

  function downloadTextArchive() {
    downloadBlob(`${archive.archiveId}.txt`, archive.textArchive, "text/plain");
  }

  function downloadJsonArchive() {
    downloadBlob(`${archive.archiveId}.json`, archive.jsonArchive, "application/json");
  }

  const toggles = [
    {
      label: "Includi bundle TXT",
      checked: includeTextBundle,
      onChange: setIncludeTextBundle,
    },
    {
      label: "Includi bundle JSON",
      checked: includeJsonBundle,
      onChange: setIncludeJsonBundle,
    },
    {
      label: "Includi safety summary",
      checked: includeSafetySummary,
      onChange: setIncludeSafetySummary,
    },
    {
      label: "Includi redaction manifest",
      checked: includeRedactionManifest,
      onChange: setIncludeRedactionManifest,
    },
    {
      label: "Includi fingerprints",
      checked: includeFingerprints,
      onChange: setIncludeFingerprints,
    },
    {
      label: "Includi note review umana",
      checked: includeHumanReviewNotes,
      onChange: setIncludeHumanReviewNotes,
    },
    {
      label: "Reviewer only access",
      checked: reviewerOnlyAccess,
      onChange: setReviewerOnlyAccess,
    },
    {
      label: "Download prepared",
      checked: downloadPrepared,
      onChange: setDownloadPrepared,
    },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-export-archive="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Case Export Archive Pack
        </p>
        <h2 className="text-xl font-semibold">Archivio scaricabile del caso AI</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Prepara un archive pack manuale con manifest, file logici, bundle TXT/JSON, redaction
          manifest e fingerprint sorgenti. Nessuna persistenza, nessuna automazione, nessuna
          condivisione pubblica.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Archive metadata</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={archiveName}
              onChange={(event) => setArchiveName(event.target.value)}
              placeholder="Archive name"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={preparedBy}
              onChange={(event) => setPreparedBy(event.target.value)}
              placeholder="Prepared by"
            />
            <label className="text-sm">
              Archive mode
              <select
                className="mt-1 w-full rounded-lg border p-2 text-sm"
                value={archiveMode}
                onChange={(event) => setArchiveMode(event.target.value as CaseExportArchiveMode)}
              >
                <option value="review-archive">review-archive</option>
                <option value="manual-conversion-archive">manual-conversion-archive</option>
                <option value="external-redacted-archive">external-redacted-archive</option>
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-2">
            {toggles.map((item) => (
              <label key={item.label} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(event) => item.onChange(event.target.checked)}
                />
                {item.label}
              </label>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={applyReadyFixture}
            >
              Simula archivio pronto
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetArchive}
            >
              Reset archivio
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Archive status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">archiveReady:</span>{" "}
              <strong>{String(archive.archiveReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">fileCount:</span>{" "}
              <strong>{archive.manifest.fileCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">readyFileCount:</span>{" "}
              <strong>{archive.manifest.readyFileCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">downloadableFileCount:</span>{" "}
              <strong>{archive.manifest.downloadableFileCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">manualDownloadOnly:</span>{" "}
              <strong>true</strong>
            </p>
            <p>
              <span className="text-muted-foreground">publicShareAllowed:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">dbPersistenceAllowed:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">archiveFingerprint:</span>{" "}
              <strong className="break-all">{archive.archiveFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Archive files</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {archive.files.map((file) => (
            <li key={file.id}>
              {file.ready ? "✓" : "•"} {file.fileName} — {file.fileType} — {file.fingerprint}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Prohibited archive actions</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {archive.downloadInstructions.prohibited.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyText}
        >
          Copia archivio
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={downloadTextArchive}
        >
          Download TXT
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={downloadJsonArchive}
        >
          Download JSON
        </button>
      </div>

      {downloadState === "downloaded" ? (
        <p className="mt-2 text-sm text-muted-foreground">Download preparato localmente.</p>
      ) : null}
      {downloadState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Archivio copiato.</p>
      ) : null}
      {downloadState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Operazione non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatAiCaseExportArchive(archive)}</code>
      </pre>
    </section>
  );
}
