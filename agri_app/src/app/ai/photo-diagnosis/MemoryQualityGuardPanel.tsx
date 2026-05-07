"use client";

import { useMemo, useState } from "react";

import {
  createMemoryQualityGuardFixture,
  createMemoryQualityGuardReport,
  defaultMemoryQualityGuardInput,
  formatMemoryQualityGuardReport,
  type MemoryQualityGuardInput,
} from "../../../lib/ai/aiMemoryQualityGuard";

type BooleanKey =
  | "includeEvidenceAdequacyMatrix"
  | "includeConflictClusters"
  | "includeStaleInsightDetector"
  | "includeBiasDriftFindings"
  | "includeQuarantineRecommendations"
  | "includeQualityImprovementPlan"
  | "includeReviewerQualityBriefing"
  | "includeQualityExportPacket"
  | "humanReviewRequired";

export default function MemoryQualityGuardPanel() {
  const [input, setInput] = useState<MemoryQualityGuardInput>(defaultMemoryQualityGuardInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createMemoryQualityGuardReport(input), [input]);

  function applyReadyFixture() {
    setInput(createMemoryQualityGuardFixture());
  }

  function resetQuality() {
    setInput(defaultMemoryQualityGuardInput);
  }

  function updateField<K extends keyof MemoryQualityGuardInput>(key: K, value: MemoryQualityGuardInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyQuality() {
    try {
      await navigator.clipboard.writeText(formatMemoryQualityGuardReport(report));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function exportJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  const toggles: Array<{ label: string; key: BooleanKey }> = [
    { label: "Evidence adequacy matrix", key: "includeEvidenceAdequacyMatrix" },
    { label: "Conflict clusters", key: "includeConflictClusters" },
    { label: "Stale insight detector", key: "includeStaleInsightDetector" },
    { label: "Bias drift findings", key: "includeBiasDriftFindings" },
    { label: "Quarantine recommendations", key: "includeQuarantineRecommendations" },
    { label: "Quality improvement plan", key: "includeQualityImprovementPlan" },
    { label: "Reviewer quality briefing", key: "includeReviewerQualityBriefing" },
    { label: "Quality export packet", key: "includeQualityExportPacket" },
    { label: "Human review required", key: "humanReviewRequired" },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-memory-quality-guard="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Agronomic Memory Quality Guard & Drift Control
        </p>
        <h2 className="text-xl font-semibold">Quality guard della memoria agronomica</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Analizza candidati memoria e produce matrice evidenza, conflitti, stale insight,
          bias/drift, quarantena e piano miglioramento. Dry-run only: nessuna scrittura qualità memoria.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input quality guard</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.farmId}
              onChange={(event) => updateField("farmId", event.target.value)}
              placeholder="Farm ID"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.farmName}
              onChange={(event) => updateField("farmName", event.target.value)}
              placeholder="Nome azienda"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.qualityWindowLabel}
              onChange={(event) => updateField("qualityWindowLabel", event.target.value)}
              placeholder="Finestra qualità"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.operatorName}
              onChange={(event) => updateField("operatorName", event.target.value)}
              placeholder="Responsabile"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.currentMemoryVersion}
              onChange={(event) => updateField("currentMemoryVersion", event.target.value)}
              placeholder="Versione memoria corrente"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.targetQualityVersion}
              onChange={(event) => updateField("targetQualityVersion", event.target.value)}
              placeholder="Versione quality target"
            />
          </div>

          <div className="mt-4 grid gap-2">
            {toggles.map((item) => (
              <label key={item.key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={Boolean(input[item.key])}
                  onChange={(event) => updateField(item.key, event.target.checked)}
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
              Simula memory quality
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetQuality}
            >
              Reset quality
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Quality status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">memoryQualityGuardReady:</span>{" "}
              <strong>{String(report.memoryQualityGuardReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">qualityStatus:</span>{" "}
              <strong>{report.qualitySummary.qualityStatus}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">memoryQualityScore:</span>{" "}
              <strong>{report.qualitySummary.memoryQualityScore}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">candidateCount:</span>{" "}
              <strong>{report.inputSummary.candidateCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">strongCandidateCount:</span>{" "}
              <strong>{report.inputSummary.strongCandidateCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">weakCandidateCount:</span>{" "}
              <strong>{report.inputSummary.weakCandidateCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">quarantineRecommendationCount:</span>{" "}
              <strong>{report.inputSummary.quarantineRecommendationCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">highestRiskCandidateId:</span>{" "}
              <strong>{report.qualitySummary.highestRiskCandidateId || "none"}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">qualityFingerprint:</span>{" "}
              <strong className="break-all">{report.qualityFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Evidence adequacy matrix</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.evidenceAdequacyMatrix.map((item) => (
            <li key={item.matrixId}>
              {item.candidateId} — score={item.adequacyScore} — label={item.adequacyLabel} — evidence={item.evidenceCount}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Conflict clusters</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.conflictClusters.map((item) => (
            <li key={item.clusterId}>
              {item.clusterId} — severity={item.conflictSeverity} — candidates={item.candidateIds.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Stale insight detector</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.staleInsightFindings.map((item) => (
            <li key={item.staleId}>
              {item.candidateId} — ageDays={item.ageDays} — severity={item.staleSeverity}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Bias / drift findings</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.biasDriftFindings.map((item) => (
            <li key={item.driftId}>
              {item.candidateId} — severity={item.driftSeverity} — risk={item.biasRiskLabel}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Quarantine recommendations</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.quarantineRecommendations.map((item) => (
            <li key={item.quarantineId}>
              {item.candidateId} — decision={item.qualityDecision} — manualOnly={String(item.manualOnly)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Quality improvement plan</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.qualityImprovementPlan.map((item) => (
            <li key={item.planId}>
              {item.candidateId} — finding={item.findingType} — priority={item.priorityScore} — {item.improvementAction}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Reviewer quality briefing</h3>
        <p className="mt-2 text-sm text-muted-foreground">{report.reviewerQualityBriefing.headline}</p>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Quality export packet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {report.qualityExportPacket.exportId} — redactedOnly={String(report.qualityExportPacket.redactedOnly)} —
          localQualityOnly={String(report.qualityExportPacket.localQualityOnly)}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyQuality}
        >
          Copia memory quality
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta quality JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Memory quality copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatMemoryQualityGuardReport(report)}</code>
      </pre>
    </section>
  );
}
