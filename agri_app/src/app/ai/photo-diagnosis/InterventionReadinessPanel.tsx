"use client";

import { useMemo, useState } from "react";

import {
  createInterventionReadinessFixture,
  createInterventionReadinessReport,
  defaultInterventionReadinessInput,
  formatInterventionReadinessReport,
  type InterventionReadinessInput,
} from "../../../lib/ai/aiInterventionReadiness";

type BooleanKey =
  | "includeReadinessMatrix"
  | "includeApprovalBoard"
  | "includeDecisionGates"
  | "includeManualConversionPacket"
  | "includeMaterialChecklist"
  | "includeBlockerSummary"
  | "humanReviewRequired";

export default function InterventionReadinessPanel() {
  const [input, setInput] = useState<InterventionReadinessInput>(defaultInterventionReadinessInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createInterventionReadinessReport(input), [input]);

  function applyReadyFixture() {
    setInput(createInterventionReadinessFixture());
  }

  function resetReadiness() {
    setInput(defaultInterventionReadinessInput);
  }

  function updateField<K extends keyof InterventionReadinessInput>(key: K, value: InterventionReadinessInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyReadiness() {
    try {
      await navigator.clipboard.writeText(formatInterventionReadinessReport(report));
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
    {
      label: "Readiness matrix",
      key: "includeReadinessMatrix",
    },
    {
      label: "Approval board",
      key: "includeApprovalBoard",
    },
    {
      label: "Decision gates",
      key: "includeDecisionGates",
    },
    {
      label: "Manual conversion packet",
      key: "includeManualConversionPacket",
    },
    {
      label: "Material checklist",
      key: "includeMaterialChecklist",
    },
    {
      label: "Blocker summary",
      key: "includeBlockerSummary",
    },
    {
      label: "Human review required",
      key: "humanReviewRequired",
    },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-intervention-readiness="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Intervention Readiness Matrix & Manual Approval Board
        </p>
        <h2 className="text-xl font-semibold">Matrice readiness intervento e board approvazione</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Genera una matrice locale per decidere se un caso fotografico può diventare
          una bozza manuale: readiness score, decision gates, approval board,
          material checklist e blocker summary. Nessun task automatico, nessun intervento,
          nessuna persistenza e nessun provider AI live.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input readiness</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.caseId}
              onChange={(event) => updateField("caseId", event.target.value)}
              placeholder="Case ID"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.operatorName}
              onChange={(event) => updateField("operatorName", event.target.value)}
              placeholder="Operatore"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.crop}
              onChange={(event) => updateField("crop", event.target.value)}
              placeholder="Coltura"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.fieldName}
              onChange={(event) => updateField("fieldName", event.target.value)}
              placeholder="Appezzamento"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.locationHint}
              onChange={(event) => updateField("locationHint", event.target.value)}
              placeholder="Settore / fila"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.followUpSchedulerFingerprint}
              onChange={(event) => updateField("followUpSchedulerFingerprint", event.target.value)}
              placeholder="Follow-up scheduler fingerprint"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.fieldMapFingerprint}
              onChange={(event) => updateField("fieldMapFingerprint", event.target.value)}
              placeholder="Field map fingerprint"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.temporalTrendFingerprint}
              onChange={(event) => updateField("temporalTrendFingerprint", event.target.value)}
              placeholder="Temporal trend fingerprint"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.scoutingPlanFingerprint}
              onChange={(event) => updateField("scoutingPlanFingerprint", event.target.value)}
              placeholder="Scouting plan fingerprint"
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
              Simula intervention readiness
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetReadiness}
            >
              Reset readiness
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Readiness status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">readinessReady:</span>{" "}
              <strong>{String(report.readinessReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">dominantPriorityTier:</span>{" "}
              <strong>{report.readinessSummary.dominantPriorityTier}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">manualReviewReadyCount:</span>{" "}
              <strong>{report.readinessSummary.manualReviewReadyCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">blockedCount:</span>{" "}
              <strong>{report.readinessSummary.blockedCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">draftOnlyCount:</span>{" "}
              <strong>{report.readinessSummary.draftOnlyCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">nextReviewerAction:</span>{" "}
              <strong>{report.readinessSummary.nextReviewerAction}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">providerAiReady:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">readinessFingerprint:</span>{" "}
              <strong className="break-all">{report.readinessFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Readiness matrix</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.readinessMatrix.length ? (
            report.readinessMatrix.map((row) => (
              <li key={row.rowId}>
                {row.label} — score={row.readinessScore} — priority={row.priorityTier} —
                conversionReadiness={row.conversionReadiness} — reviewerDecision={row.reviewerDecision}
              </li>
            ))
          ) : (
            <li>Nessuna matrice: usa “Simula intervention readiness”.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Approval board</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.approvalBoard.map((item) => (
            <li key={item.approvalId}>
              {item.label} — requiredDecision={item.requiredDecision} —
              priority={item.priorityTier}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Decision gates</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.decisionGates.map((gate) => (
            <li key={gate.gateId}>
              {gate.label} — status={gate.gateStatus} — {gate.gateReason}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Manual conversion packets</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.manualConversionPackets.map((packet) => (
            <li key={packet.packetId}>
              {packet.manualTaskTitle} — conversionAllowed={String(packet.conversionAllowed)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Material checklist</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.materialChecklist.map((item) => (
            <li key={item.checklistId}>
              {item.label} — material={item.requiredMaterial.join(", ")} — photos=
              {item.requiredPhotos.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Blocker summary</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.blockerSummary.map((item) => (
            <li key={item.blockerId}>
              {item.label} — blockers={item.blockers.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyReadiness}
        >
          Copia intervention readiness
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta readiness JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Intervention readiness copiata.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatInterventionReadinessReport(report)}</code>
      </pre>
    </section>
  );
}
