"use client";

import { useMemo, useState } from "react";

import {
  createInterventionProtocolFixture,
  createInterventionProtocolReport,
  defaultInterventionProtocolInput,
  formatInterventionProtocolReport,
  type InterventionProtocolInput,
} from "../../../lib/ai/aiInterventionProtocol";

type BooleanKey =
  | "includeProtocolSteps"
  | "includeComplianceGuard"
  | "includePreFlightChecklist"
  | "includeManualDispatchPacket"
  | "includeOperatorBriefing"
  | "includeAuditTrail"
  | "humanReviewRequired";

export default function InterventionProtocolPanel() {
  const [input, setInput] = useState<InterventionProtocolInput>(defaultInterventionProtocolInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createInterventionProtocolReport(input), [input]);

  function applyReadyFixture() {
    setInput(createInterventionProtocolFixture());
  }

  function resetProtocol() {
    setInput(defaultInterventionProtocolInput);
  }

  function updateField<K extends keyof InterventionProtocolInput>(key: K, value: InterventionProtocolInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyProtocol() {
    try {
      await navigator.clipboard.writeText(formatInterventionProtocolReport(report));
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
      label: "Protocol steps",
      key: "includeProtocolSteps",
    },
    {
      label: "Compliance guard",
      key: "includeComplianceGuard",
    },
    {
      label: "Pre-flight checklist",
      key: "includePreFlightChecklist",
    },
    {
      label: "Manual dispatch packet",
      key: "includeManualDispatchPacket",
    },
    {
      label: "Operator briefing",
      key: "includeOperatorBriefing",
    },
    {
      label: "Compliance audit trail",
      key: "includeAuditTrail",
    },
    {
      label: "Human review required",
      key: "humanReviewRequired",
    },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-intervention-protocol="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Intervention Protocol Simulator & Compliance Guard
        </p>
        <h2 className="text-xl font-semibold">Protocollo operativo manuale e compliance guard</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Genera un protocollo locale non esecutivo: step revisore/operatore/admin,
          pre-flight, compliance guard, briefing operatore, audit trail e manual dispatch
          bloccato. Nessuna persistenza, nessun intervento automatico, nessun prodotto o dosaggio.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input protocollo</h3>
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
              value={input.interventionReadinessFingerprint}
              onChange={(event) => updateField("interventionReadinessFingerprint", event.target.value)}
              placeholder="Intervention readiness fingerprint"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.followUpSchedulerFingerprint}
              onChange={(event) => updateField("followUpSchedulerFingerprint", event.target.value)}
              placeholder="Follow-up scheduler fingerprint"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.heatmapFingerprint}
              onChange={(event) => updateField("heatmapFingerprint", event.target.value)}
              placeholder="Heatmap fingerprint"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.temporalTrendFingerprint}
              onChange={(event) => updateField("temporalTrendFingerprint", event.target.value)}
              placeholder="Temporal trend fingerprint"
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
              Simula intervention protocol
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetProtocol}
            >
              Reset protocollo
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Protocol status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">protocolReady:</span>{" "}
              <strong>{String(report.protocolReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">dominantPriority:</span>{" "}
              <strong>{report.protocolSummary.dominantPriority}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">readyPacketCount:</span>{" "}
              <strong>{report.protocolSummary.readyPacketCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">blockedPacketCount:</span>{" "}
              <strong>{report.protocolSummary.blockedPacketCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">reviewRequiredCount:</span>{" "}
              <strong>{report.protocolSummary.reviewRequiredCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">nextManualAction:</span>{" "}
              <strong>{report.protocolSummary.nextManualAction}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">providerAiReady:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">protocolFingerprint:</span>{" "}
              <strong className="break-all">{report.protocolFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Protocol steps</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.protocolSteps.length ? (
            report.protocolSteps.map((step) => (
              <li key={step.stepId}>
                {step.sequence}. {step.title} — owner={step.owner} — status={step.status}
              </li>
            ))
          ) : (
            <li>Nessuno step: usa “Simula intervention protocol”.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Compliance guard</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.complianceGuard.map((item) => (
            <li key={item.guardId}>
              {item.label} — status={item.guardStatus} — {item.reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Pre-flight checklist</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.preFlightChecklist.map((item) => (
            <li key={item.checklistId}>
              {item.label} — type={item.checklistType} — passed={String(item.passed)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Manual dispatch packets</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.manualDispatchPackets.map((packet) => (
            <li key={packet.packetId}>
              {packet.dispatchTitle} — dispatchAllowed={String(packet.dispatchAllowed)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Operator briefing</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.operatorBriefing.map((briefing) => (
            <li key={briefing.briefingId}>
              {briefing.label} — {briefing.briefingText}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Compliance audit trail</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.complianceAuditTrail.map((item) => (
            <li key={item.auditId}>
              {item.label} — entries={item.entries.length}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyProtocol}
        >
          Copia intervention protocol
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta protocol JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Intervention protocol copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatInterventionProtocolReport(report)}</code>
      </pre>
    </section>
  );
}
