"use client";

import { useMemo, useState } from "react";

import {
  createCaseOutcomeLearningFixture,
  createCaseOutcomeLearningReport,
  defaultCaseOutcomeLearningInput,
  formatCaseOutcomeLearningReport,
  type CaseOutcomeLearningInput,
} from "../../../lib/ai/aiCaseOutcomeLearning";

type BooleanKey =
  | "includeOutcomeTimeline"
  | "includeRecommendationOutcomeMatrix"
  | "includeLessonCards"
  | "includeMemoryUpdateDrafts"
  | "includeDriftSignals"
  | "includeReviewerLearningBriefing"
  | "includeLearningExportPacket"
  | "humanReviewRequired";

export default function CaseOutcomeLearningPanel() {
  const [input, setInput] = useState<CaseOutcomeLearningInput>(defaultCaseOutcomeLearningInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createCaseOutcomeLearningReport(input), [input]);

  function applyReadyFixture() {
    setInput(createCaseOutcomeLearningFixture());
  }

  function resetLearning() {
    setInput(defaultCaseOutcomeLearningInput);
  }

  function updateField<K extends keyof CaseOutcomeLearningInput>(key: K, value: CaseOutcomeLearningInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyLearning() {
    try {
      await navigator.clipboard.writeText(formatCaseOutcomeLearningReport(report));
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
    { label: "Outcome timeline", key: "includeOutcomeTimeline" },
    { label: "Recommendation outcome matrix", key: "includeRecommendationOutcomeMatrix" },
    { label: "Lesson cards", key: "includeLessonCards" },
    { label: "Memory update drafts", key: "includeMemoryUpdateDrafts" },
    { label: "Drift signals", key: "includeDriftSignals" },
    { label: "Reviewer learning briefing", key: "includeReviewerLearningBriefing" },
    { label: "Learning export packet", key: "includeLearningExportPacket" },
    { label: "Human review required", key: "humanReviewRequired" },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-outcome-learning="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Case Outcome Learning Loop & Memory Update Draft
        </p>
        <h2 className="text-xl font-semibold">Learning loop locale da outcome osservato</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Confronta raccomandazioni precedenti ed esiti osservati, genera lesson cards,
          memory update draft, drift signals, briefing revisore e export redatto.
          Dry-run only: nessun aggiornamento memoria persistente.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input learning</h3>
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
              value={input.learningWindowLabel}
              onChange={(event) => updateField("learningWindowLabel", event.target.value)}
              placeholder="Finestra learning"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.operatorName}
              onChange={(event) => updateField("operatorName", event.target.value)}
              placeholder="Responsabile"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.caseId}
              onChange={(event) => updateField("caseId", event.target.value)}
              placeholder="Case ID"
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
              Simula outcome learning
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetLearning}
            >
              Reset learning
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Learning status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">caseOutcomeLearningReady:</span>{" "}
              <strong>{String(report.caseOutcomeLearningReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">learningStatus:</span>{" "}
              <strong>{report.learningSummary.learningStatus}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">latestOutcomeLabel:</span>{" "}
              <strong>{report.learningSummary.latestOutcomeLabel}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">confidenceDelta:</span>{" "}
              <strong>{report.learningSummary.confidenceDelta}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">riskDeltaLabel:</span>{" "}
              <strong>{report.learningSummary.riskDeltaLabel}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">alignedRecommendationCount:</span>{" "}
              <strong>{report.inputSummary.alignedRecommendationCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">memoryUpdateDraftCount:</span>{" "}
              <strong>{report.inputSummary.memoryUpdateDraftCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">driftSignalCount:</span>{" "}
              <strong>{report.inputSummary.driftSignalCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">learningFingerprint:</span>{" "}
              <strong className="break-all">{report.learningFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Outcome evidence timeline</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.outcomeTimeline.map((item) => (
            <li key={item.timelineId}>
              {item.observationId} — outcome={item.outcomeLabel} — riskAfter={item.riskTierAfter} — review={item.reviewStatus}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Recommendation outcome matrix</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.recommendationOutcomeMatrix.map((item) => (
            <li key={item.matrixId}>
              {item.recommendationId} — expected={item.expectedOutcome} — observed={item.observedOutcome} —
              alignment={item.alignmentScore} — decision={item.outcomeDecision}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Lesson cards</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.lessonCards.map((item) => (
            <li key={item.lessonId}>
              {item.lessonType} — reusable={String(item.reusableForMemory)} — confidence={item.confidenceScore}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Memory update drafts</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.memoryUpdateDrafts.map((item) => (
            <li key={item.draftId}>
              {item.updateType} — decision={item.updateDecision} — localDraftOnly={String(item.localDraftOnly)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Drift signals</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.driftSignals.map((item) => (
            <li key={item.driftId}>
              {item.signalLabel} — severity={item.severity} — next={item.nextHumanCheck}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Reviewer learning briefing</h3>
        <p className="mt-2 text-sm text-muted-foreground">{report.reviewerLearningBriefing.headline}</p>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Learning export packet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {report.learningExportPacket.exportId} — redactedOnly={String(report.learningExportPacket.redactedOnly)} —
          localLearningOnly={String(report.learningExportPacket.localLearningOnly)}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyLearning}
        >
          Copia outcome learning
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta learning JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Outcome learning copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatCaseOutcomeLearningReport(report)}</code>
      </pre>
    </section>
  );
}
