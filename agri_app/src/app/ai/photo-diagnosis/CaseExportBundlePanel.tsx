"use client";

import { useMemo, useState } from "react";

import {
  createAiCaseExportBundle,
  formatAiCaseExportBundle,
  readyCaseExportBundleInput,
  type CaseExportShareMode,
} from "../../../lib/ai/aiCaseExportBundle";
import {
  createReadyAiManualConversionAudit,
  createBlockedAiManualConversionAudit,
} from "../../../lib/ai/aiManualConversionAudit";

export default function CaseExportBundlePanel() {
  const [readyMode, setReadyMode] = useState(false);
  const [exporterName, setExporterName] = useState("");
  const [exportLabel, setExportLabel] = useState("");
  const [shareMode, setShareMode] = useState<CaseExportShareMode>("private-internal");
  const [includeJson, setIncludeJson] = useState(true);
  const [includeText, setIncludeText] = useState(true);
  const [includeReviewerPacket, setIncludeReviewerPacket] = useState(true);
  const [includeSafetySummary, setIncludeSafetySummary] = useState(true);
  const [includeSourceFingerprints, setIncludeSourceFingerprints] = useState(true);
  const [reviewerVisibleOnly, setReviewerVisibleOnly] = useState(true);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const bundle = useMemo(() => {
    const audit = readyMode
      ? createReadyAiManualConversionAudit()
      : createBlockedAiManualConversionAudit();

    return createAiCaseExportBundle(audit, {
      exporterName,
      exportReason: readyMode ? "manual-conversion" : "human-review",
      exportLabel,
      shareMode,
      includeJson,
      includeText,
      includeReviewerPacket,
      includeSafetySummary,
      includeSourceFingerprints,
      reviewerVisibleOnly,
    });
  }, [
    readyMode,
    exporterName,
    exportLabel,
    shareMode,
    includeJson,
    includeText,
    includeReviewerPacket,
    includeSafetySummary,
    includeSourceFingerprints,
    reviewerVisibleOnly,
  ]);

  function applyReadyFixture() {
    setReadyMode(true);
    setExporterName(readyCaseExportBundleInput.exporterName);
    setExportLabel(readyCaseExportBundleInput.exportLabel);
    setShareMode(readyCaseExportBundleInput.shareMode);
    setIncludeJson(readyCaseExportBundleInput.includeJson);
    setIncludeText(readyCaseExportBundleInput.includeText);
    setIncludeReviewerPacket(readyCaseExportBundleInput.includeReviewerPacket);
    setIncludeSafetySummary(readyCaseExportBundleInput.includeSafetySummary);
    setIncludeSourceFingerprints(readyCaseExportBundleInput.includeSourceFingerprints);
    setReviewerVisibleOnly(readyCaseExportBundleInput.reviewerVisibleOnly);
  }

  function resetBundle() {
    setReadyMode(false);
    setExporterName("");
    setExportLabel("");
    setShareMode("private-internal");
    setIncludeJson(true);
    setIncludeText(true);
    setIncludeReviewerPacket(true);
    setIncludeSafetySummary(true);
    setIncludeSourceFingerprints(true);
    setReviewerVisibleOnly(true);
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(formatAiCaseExportBundle(bundle));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(bundle, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  const toggles = [
    {
      label: "Includi JSON export",
      checked: includeJson,
      onChange: setIncludeJson,
    },
    {
      label: "Includi text export",
      checked: includeText,
      onChange: setIncludeText,
    },
    {
      label: "Includi reviewer packet",
      checked: includeReviewerPacket,
      onChange: setIncludeReviewerPacket,
    },
    {
      label: "Includi safety summary",
      checked: includeSafetySummary,
      onChange: setIncludeSafetySummary,
    },
    {
      label: "Includi source fingerprints",
      checked: includeSourceFingerprints,
      onChange: setIncludeSourceFingerprints,
    },
    {
      label: "Reviewer visible only",
      checked: reviewerVisibleOnly,
      onChange: setReviewerVisibleOnly,
    },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-export-bundle="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Case Export Bundle
        </p>
        <h2 className="text-xl font-semibold">Bundle esportabile del caso AI</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Crea un pacchetto unico con manifest, audit, gate, preview, dossier, safety summary e
          fingerprint. Il bundle resta dry-run: nessun DB, nessuna automazione, nessuna condivisione pubblica.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Export metadata</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={exporterName}
              onChange={(event) => setExporterName(event.target.value)}
              placeholder="Exporter name"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={exportLabel}
              onChange={(event) => setExportLabel(event.target.value)}
              placeholder="Export label"
            />
            <label className="text-sm">
              Share mode
              <select
                className="mt-1 w-full rounded-lg border p-2 text-sm"
                value={shareMode}
                onChange={(event) => setShareMode(event.target.value as CaseExportShareMode)}
              >
                <option value="private-internal">private-internal</option>
                <option value="review-only">review-only</option>
                <option value="external-redacted">external-redacted</option>
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
              Simula bundle pronto
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetBundle}
            >
              Reset bundle
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Bundle status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">bundleReady:</span>{" "}
              <strong>{String(bundle.bundleReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">shareMode:</span>{" "}
              <strong>{bundle.shareMode}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">artifactCount:</span>{" "}
              <strong>{bundle.bundleManifest.artifactCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">readyArtifactCount:</span>{" "}
              <strong>{bundle.bundleManifest.readyArtifactCount}</strong>
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
              <span className="text-muted-foreground">automaticExecutionAllowed:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">bundleFingerprint:</span>{" "}
              <strong className="break-all">{bundle.bundleFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Artifacts</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {bundle.artifacts.map((artifact) => (
            <li key={artifact.id}>
              {artifact.ready ? "✓" : "•"} {artifact.label} — {artifact.fingerprint}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Redaction rules</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {bundle.redactionRules.map((rule) => (
            <li key={rule.id}>
              {rule.applied ? "Applicata" : "Non applicata"} — {rule.label}: {rule.reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Prohibited export actions</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {bundle.exportInstructions.prohibited.map((item) => (
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
          Copia bundle
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyJson}
        >
          Esporta bundle JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Bundle copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatAiCaseExportBundle(bundle)}</code>
      </pre>
    </section>
  );
}
