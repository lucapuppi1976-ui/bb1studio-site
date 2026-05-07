"use client";

import { useMemo, useState } from "react";

import {
  createCaseMemoryGraphFixture,
  createCaseMemoryGraphReport,
  defaultCaseMemoryGraphInput,
  formatCaseMemoryGraphReport,
  type CaseMemoryGraphInput,
} from "../../../lib/ai/aiCaseMemoryGraph";

type BooleanKey =
  | "includeGraphNodes"
  | "includeGraphEdges"
  | "includeSimilarityClusters"
  | "includeRecurrenceSignals"
  | "includeKnowledgeGaps"
  | "includeMemoryRecommendations"
  | "includeCaseLineage"
  | "includeMemoryExportPacket"
  | "humanReviewRequired";

export default function CaseMemoryGraphPanel() {
  const [input, setInput] = useState<CaseMemoryGraphInput>(defaultCaseMemoryGraphInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createCaseMemoryGraphReport(input), [input]);

  function applyReadyFixture() {
    setInput(createCaseMemoryGraphFixture());
  }

  function resetMemory() {
    setInput(defaultCaseMemoryGraphInput);
  }

  function updateField<K extends keyof CaseMemoryGraphInput>(key: K, value: CaseMemoryGraphInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyMemory() {
    try {
      await navigator.clipboard.writeText(formatCaseMemoryGraphReport(report));
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
    { label: "Graph nodes", key: "includeGraphNodes" },
    { label: "Graph edges", key: "includeGraphEdges" },
    { label: "Similarity clusters", key: "includeSimilarityClusters" },
    { label: "Recurrence signals", key: "includeRecurrenceSignals" },
    { label: "Knowledge gaps", key: "includeKnowledgeGaps" },
    { label: "Memory recommendations", key: "includeMemoryRecommendations" },
    { label: "Case lineage", key: "includeCaseLineage" },
    { label: "Memory export packet", key: "includeMemoryExportPacket" },
    { label: "Human review required", key: "humanReviewRequired" },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-memory-graph="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Agronomic Case Memory & Pattern Graph
        </p>
        <h2 className="text-xl font-semibold">Memoria agronomica locale e grafo pattern</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Costruisce un grafo locale tra casi, appezzamenti, colture, sintomi, evidenze,
          fingerprint e limitazioni. Trova cluster simili, segnali ricorrenti, gap conoscitivi
          e raccomandazioni manuali. Dry-run only: nessuna persistenza DB.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input memoria</h3>
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
              value={input.memoryWindowLabel}
              onChange={(event) => updateField("memoryWindowLabel", event.target.value)}
              placeholder="Finestra memoria"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.operatorName}
              onChange={(event) => updateField("operatorName", event.target.value)}
              placeholder="Responsabile"
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
              Simula case memory graph
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetMemory}
            >
              Reset memoria
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Memory status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">caseMemoryReady:</span>{" "}
              <strong>{String(report.caseMemoryReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">memoryStatus:</span>{" "}
              <strong>{report.memorySummary.memoryStatus}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">caseCount:</span>{" "}
              <strong>{report.inputSummary.caseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">graphNodeCount:</span>{" "}
              <strong>{report.memorySummary.graphNodeCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">graphEdgeCount:</span>{" "}
              <strong>{report.memorySummary.graphEdgeCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">clusterCount:</span>{" "}
              <strong>{report.memorySummary.clusterCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">patternRecurrenceCount:</span>{" "}
              <strong>{report.memorySummary.patternRecurrenceCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">knowledgeGapCount:</span>{" "}
              <strong>{report.memorySummary.knowledgeGapCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">topClusterId:</span>{" "}
              <strong>{report.memorySummary.topClusterId || "none"}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">memoryFingerprint:</span>{" "}
              <strong className="break-all">{report.memoryFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Graph nodes</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.graphNodes.slice(0, 10).map((item) => (
            <li key={item.nodeId}>
              {item.nodeId} — type={item.nodeType} — weight={item.weight} — risk={item.riskTier}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Graph edges</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.graphEdges.slice(0, 10).map((item) => (
            <li key={item.edgeId}>
              {item.fromNodeId} → {item.toNodeId} — relation={item.relationType}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Similarity clusters</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.similarityClusters.map((item) => (
            <li key={item.clusterId}>
              {item.clusterId} — cases={item.caseIds.join(", ")} — score={item.similarityScore}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Recurrence signals</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.recurrenceSignals.map((item) => (
            <li key={item.recurrenceId}>
              {item.label} — type={item.recurrenceType} — score={item.recurrenceScore}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Knowledge gaps</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.knowledgeGaps.map((item) => (
            <li key={item.gapId}>
              {item.caseId} — gap={item.gapType} — severity={item.severity} — next={item.recommendedNextObservation}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Memory recommendations</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.memoryRecommendations.map((item) => (
            <li key={item.recommendationId}>
              {item.caseId} — decision={item.decision} — priority={item.priorityScore}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Case lineage</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.caseLineage.map((item) => (
            <li key={item.lineageId}>
              {item.caseId} — lineageReady={String(item.lineageReady)} — edges={item.derivedMemoryEdges.length}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Memory export packet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {report.memoryExportPacket.exportId} — redactedOnly={String(report.memoryExportPacket.redactedOnly)} —
          localMemoryOnly={String(report.memoryExportPacket.localMemoryOnly)}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyMemory}
        >
          Copia case memory graph
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta memory JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Case memory graph copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatCaseMemoryGraphReport(report)}</code>
      </pre>
    </section>
  );
}
