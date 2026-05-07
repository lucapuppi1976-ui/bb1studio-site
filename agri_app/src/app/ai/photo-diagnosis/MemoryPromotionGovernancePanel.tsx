"use client";

import { useMemo, useState } from "react";

import {
  createMemoryPromotionFixture,
  createMemoryPromotionGovernanceReport,
  defaultMemoryPromotionInput,
  formatMemoryPromotionGovernanceReport,
  type MemoryPromotionInput,
} from "../../../lib/ai/aiMemoryPromotionGovernance";

type BooleanKey =
  | "includePromotionQueue"
  | "includeMemoryPatchDrafts"
  | "includeGovernanceDecisionBoard"
  | "includeVersionedMemorySnapshotDraft"
  | "includeRollbackPlan"
  | "includePromotionAuditTrail"
  | "includePromotionExportPacket"
  | "humanReviewRequired";

export default function MemoryPromotionGovernancePanel() {
  const [input, setInput] = useState<MemoryPromotionInput>(defaultMemoryPromotionInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createMemoryPromotionGovernanceReport(input), [input]);

  function applyReadyFixture() {
    setInput(createMemoryPromotionFixture());
  }

  function resetPromotion() {
    setInput(defaultMemoryPromotionInput);
  }

  function updateField<K extends keyof MemoryPromotionInput>(key: K, value: MemoryPromotionInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyPromotion() {
    try {
      await navigator.clipboard.writeText(formatMemoryPromotionGovernanceReport(report));
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
    { label: "Promotion queue", key: "includePromotionQueue" },
    { label: "Memory patch drafts", key: "includeMemoryPatchDrafts" },
    { label: "Governance decision board", key: "includeGovernanceDecisionBoard" },
    { label: "Versioned memory snapshot draft", key: "includeVersionedMemorySnapshotDraft" },
    { label: "Rollback plan", key: "includeRollbackPlan" },
    { label: "Promotion audit trail", key: "includePromotionAuditTrail" },
    { label: "Promotion export packet", key: "includePromotionExportPacket" },
    { label: "Human review required", key: "humanReviewRequired" },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-memory-promotion-governance="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Memory Promotion Governance & Versioned Knowledge Draft
        </p>
        <h2 className="text-xl font-semibold">Governance promozione memoria agronomica</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Valuta i memory update draft, genera una promotion queue, patch locali,
          decision board, snapshot versione, rollback plan e audit trail. Dry-run only:
          nessuna promozione memoria persistente.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input governance</h3>
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
              value={input.governanceWindowLabel}
              onChange={(event) => updateField("governanceWindowLabel", event.target.value)}
              placeholder="Finestra governance"
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
              value={input.targetDraftVersion}
              onChange={(event) => updateField("targetDraftVersion", event.target.value)}
              placeholder="Versione draft target"
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
              Simula memory promotion
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetPromotion}
            >
              Reset promotion
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Promotion status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">memoryPromotionGovernanceReady:</span>{" "}
              <strong>{String(report.memoryPromotionGovernanceReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">governanceStatus:</span>{" "}
              <strong>{report.governanceSummary.governanceStatus}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">candidateCount:</span>{" "}
              <strong>{report.inputSummary.candidateCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">eligibleCandidateCount:</span>{" "}
              <strong>{report.inputSummary.eligibleCandidateCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">blockedCandidateCount:</span>{" "}
              <strong>{report.inputSummary.blockedCandidateCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">promotablePatchCount:</span>{" "}
              <strong>{report.inputSummary.promotablePatchCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">promotionReadinessScore:</span>{" "}
              <strong>{report.governanceSummary.promotionReadinessScore}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">targetDraftVersion:</span>{" "}
              <strong>{report.inputSummary.targetDraftVersion || "missing"}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">governanceFingerprint:</span>{" "}
              <strong className="break-all">{report.governanceFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Promotion queue</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.promotionQueue.map((item) => (
            <li key={item.queueId}>
              {item.candidateId} — status={item.status} — readiness={item.promotionReadinessScore}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Memory patch drafts</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.memoryPatchDrafts.map((item) => (
            <li key={item.patchId}>
              {item.patchId} — action={item.patchAction} — localPatchOnly={String(item.localPatchOnly)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Governance decision board</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.governanceDecisionBoard.map((item) => (
            <li key={item.decisionId}>
              {item.candidateId} — decision={item.governanceDecision} — evidence={item.evidenceAdequacyScore}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Versioned memory snapshot draft</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {report.versionedMemorySnapshotDraft.snapshotId} — source={report.versionedMemorySnapshotDraft.sourceMemoryVersion} —
          target={report.versionedMemorySnapshotDraft.targetDraftVersion}
        </p>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Rollback plan</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.rollbackPlan.map((item) => (
            <li key={item.rollbackId}>
              {item.patchId} — rollback={item.rollbackAction} — manual={String(item.manualRollbackOnly)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Promotion audit trail</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.promotionAuditTrail.slice(0, 8).map((item) => (
            <li key={item.auditId}>
              {item.action} — candidate={item.candidateId} — actor={item.actor}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Promotion export packet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {report.promotionExportPacket.exportId} — redactedOnly={String(report.promotionExportPacket.redactedOnly)} —
          localPromotionOnly={String(report.promotionExportPacket.localPromotionOnly)}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyPromotion}
        >
          Copia memory promotion
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta promotion JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Memory promotion copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatMemoryPromotionGovernanceReport(report)}</code>
      </pre>
    </section>
  );
}
