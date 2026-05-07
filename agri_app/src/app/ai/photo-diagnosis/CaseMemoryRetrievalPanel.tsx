"use client";

import { useMemo, useState } from "react";

import {
  createCaseMemoryRetrievalFixture,
  createCaseMemoryRetrievalReport,
  defaultCaseMemoryRetrievalInput,
  formatCaseMemoryRetrievalReport,
  type CaseMemoryRetrievalInput,
} from "../../../lib/ai/aiCaseMemoryRetrieval";

type BooleanKey =
  | "includeSimilarityMatches"
  | "includeInsightCards"
  | "includeTransferLearningCandidates"
  | "includeGapBridgePlan"
  | "includeRetrievalBriefing"
  | "includeRetrievalExportPacket"
  | "humanReviewRequired";

export default function CaseMemoryRetrievalPanel() {
  const [input, setInput] = useState<CaseMemoryRetrievalInput>(defaultCaseMemoryRetrievalInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createCaseMemoryRetrievalReport(input), [input]);

  function applyReadyFixture() {
    setInput(createCaseMemoryRetrievalFixture());
  }

  function resetRetrieval() {
    setInput(defaultCaseMemoryRetrievalInput);
  }

  function updateField<K extends keyof CaseMemoryRetrievalInput>(key: K, value: CaseMemoryRetrievalInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyRetrieval() {
    try {
      await navigator.clipboard.writeText(formatCaseMemoryRetrievalReport(report));
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
    { label: "Similarity matches", key: "includeSimilarityMatches" },
    { label: "Insight cards", key: "includeInsightCards" },
    { label: "Transfer learning candidates", key: "includeTransferLearningCandidates" },
    { label: "Gap bridge plan", key: "includeGapBridgePlan" },
    { label: "Retrieval briefing", key: "includeRetrievalBriefing" },
    { label: "Retrieval export packet", key: "includeRetrievalExportPacket" },
    { label: "Human review required", key: "humanReviewRequired" },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-memory-retrieval="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Case Memory Retrieval & Similar Case Advisor
        </p>
        <h2 className="text-xl font-semibold">Ricerca casi simili e insight riutilizzabili</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Confronta il caso corrente con memoria locale dry-run, recupera casi simili,
          costruisce insight card, candidati di transfer learning, gap bridge plan e briefing
          per revisione umana. Nessuna memoria persistente DB.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input retrieval</h3>
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
              value={input.retrievalWindowLabel}
              onChange={(event) => updateField("retrievalWindowLabel", event.target.value)}
              placeholder="Finestra retrieval"
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
              Simula memory retrieval
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetRetrieval}
            >
              Reset retrieval
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Retrieval status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">caseMemoryRetrievalReady:</span>{" "}
              <strong>{String(report.caseMemoryRetrievalReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">retrievalStatus:</span>{" "}
              <strong>{report.retrievalSummary.retrievalStatus}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">queryCaseId:</span>{" "}
              <strong>{report.inputSummary.queryCaseId || "missing"}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">memoryCaseCount:</span>{" "}
              <strong>{report.inputSummary.memoryCaseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">candidateMatchCount:</span>{" "}
              <strong>{report.inputSummary.candidateMatchCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">reusableInsightCount:</span>{" "}
              <strong>{report.inputSummary.reusableInsightCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">transferCandidateCount:</span>{" "}
              <strong>{report.inputSummary.transferCandidateCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">topMemoryCaseId:</span>{" "}
              <strong>{report.retrievalSummary.topMemoryCaseId || "none"}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">topSimilarityScore:</span>{" "}
              <strong>{report.retrievalSummary.topSimilarityScore}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">retrievalFingerprint:</span>{" "}
              <strong className="break-all">{report.retrievalFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Similarity matches</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.similarityMatches.map((item) => (
            <li key={item.matchId}>
              {item.memoryCaseId} — score={item.similarityScore} — type={item.matchType} — {item.matchReason}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Insight cards</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.insightCards.slice(0, 10).map((item) => (
            <li key={item.cardId}>
              {item.title} — applies={String(item.appliesToCurrentCase)} — confidence={item.confidenceScore}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Transfer learning candidates</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.transferLearningCandidates.map((item) => (
            <li key={item.transferId}>
              {item.transferType} — source={item.sourceCaseId} — score={item.transferScore}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Gap bridge plan</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.gapBridgePlan.map((item) => (
            <li key={item.bridgeId}>
              {item.gapType} — severity={item.severity} — next={item.recommendedObservation}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Retrieval briefing</h3>
        <p className="mt-2 text-sm text-muted-foreground">{report.retrievalBriefing.headline}</p>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Retrieval export packet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {report.retrievalExportPacket.exportId} — redactedOnly={String(report.retrievalExportPacket.redactedOnly)} —
          localRetrievalOnly={String(report.retrievalExportPacket.localRetrievalOnly)}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyRetrieval}
        >
          Copia memory retrieval
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta retrieval JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Memory retrieval copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatCaseMemoryRetrievalReport(report)}</code>
      </pre>
    </section>
  );
}
