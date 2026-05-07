"use client";

import { useMemo, useState } from "react";

import {
  createScoutingMissionFixture,
  createScoutingMissionReport,
  defaultScoutingMissionInput,
  formatScoutingMissionReport,
  type ScoutingMissionInput,
} from "../../../lib/ai/aiScoutingMissionPlanner";

type BooleanKey =
  | "includeMissionRoute"
  | "includePhotoShotList"
  | "includeSafetyGate"
  | "includeResourceAssignments"
  | "includeDebriefPacket"
  | "includeEscalationTriggers"
  | "includeExportPacket"
  | "humanReviewRequired";

export default function ScoutingMissionPlannerPanel() {
  const [input, setInput] = useState<ScoutingMissionInput>(defaultScoutingMissionInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => createScoutingMissionReport(input), [input]);

  function applyReadyFixture() {
    setInput(createScoutingMissionFixture());
  }

  function resetMission() {
    setInput(defaultScoutingMissionInput);
  }

  function updateField<K extends keyof ScoutingMissionInput>(key: K, value: ScoutingMissionInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function copyMission() {
    try {
      await navigator.clipboard.writeText(formatScoutingMissionReport(report));
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
    { label: "Mission route", key: "includeMissionRoute" },
    { label: "Photo shot list", key: "includePhotoShotList" },
    { label: "Safety gate", key: "includeSafetyGate" },
    { label: "Resource assignments", key: "includeResourceAssignments" },
    { label: "Debrief packet", key: "includeDebriefPacket" },
    { label: "Escalation triggers", key: "includeEscalationTriggers" },
    { label: "Export packet", key: "includeExportPacket" },
    { label: "Human review required", key: "humanReviewRequired" },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-scouting-mission-planner="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Scouting Mission Planner & Field Crew Route Sequencer
        </p>
        <h2 className="text-xl font-semibold">Mission planner scouting e shot list campo</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Pianifica una missione manuale multi-caso: route segmentata, shot list fotografica,
          safety gate, assegnazione risorse, debrief, escalation ed export redatto. Tutto resta
          dry-run: nessun provider AI live, nessun DB, nessuna automazione.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input missione</h3>
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
              value={input.missionDateLabel}
              onChange={(event) => updateField("missionDateLabel", event.target.value)}
              placeholder="Data/finestra missione"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.startLocationLabel}
              onChange={(event) => updateField("startLocationLabel", event.target.value)}
              placeholder="Punto partenza"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.operatorName}
              onChange={(event) => updateField("operatorName", event.target.value)}
              placeholder="Operatore"
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
              Simula scouting mission
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetMission}
            >
              Reset missione
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Mission status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">missionReady:</span>{" "}
              <strong>{String(report.missionReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">missionStatus:</span>{" "}
              <strong>{report.missionSummary.missionStatus}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">caseCount:</span>{" "}
              <strong>{report.inputSummary.caseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">fieldCount:</span>{" "}
              <strong>{report.inputSummary.fieldCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">blockedCaseCount:</span>{" "}
              <strong>{report.inputSummary.blockedCaseCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">urgentVisitCount:</span>{" "}
              <strong>{report.inputSummary.urgentVisitCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">estimatedTotalSlots:</span>{" "}
              <strong>{report.missionSummary.estimatedTotalSlots}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">firstCaseId:</span>{" "}
              <strong>{report.missionSummary.firstCaseId || "none"}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">nextManualAction:</span>{" "}
              <strong>{report.missionSummary.nextManualAction}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">missionFingerprint:</span>{" "}
              <strong className="break-all">{report.missionFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Mission route</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.missionRoute.length ? (
            report.missionRoute.map((item) => (
              <li key={item.segmentId}>
                {item.sequence}. {item.fieldName} — {item.caseId} — priority={item.priority} —
                readiness={item.readiness} — slots={item.estimatedSlotUnits}
              </li>
            ))
          ) : (
            <li>Nessuna route: usa “Simula scouting mission”.</li>
          )}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Photo shot list</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.photoShotList.map((item) => (
            <li key={item.shotId}>
              {item.caseId} — {item.label} — type={item.shotType} — required={String(item.required)}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Safety gate</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.safetyGate.map((item) => (
            <li key={item.gateId}>
              {item.caseId} — status={item.gateStatus} — {item.reasons.join(" | ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Resource assignments</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.resourceAssignments.map((item) => (
            <li key={item.assignmentId}>
              {item.label} — assigned={item.assignedCaseIds.join(", ") || "none"} —
              load={item.estimatedLoadSlots}/{item.capacitySlots} — status={item.loadStatus}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Debrief packet</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.debriefPackets.map((item) => (
            <li key={item.packetId}>
              {item.caseId} — notes={item.requiredNotes.length} — upload checklist={item.uploadChecklist.length}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Escalation triggers</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {report.escalationTriggers.map((item) => (
            <li key={item.triggerId}>
              {item.caseId} — level={item.triggerLevel} — response={item.manualResponse}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Export packet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {report.exportPacket.exportId} — redactedOnly={String(report.exportPacket.redactedOnly)} —
          publicShareAllowed={String(report.exportPacket.publicShareAllowed)}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyMission}
        >
          Copia scouting mission
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta mission JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Scouting mission copiata.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatScoutingMissionReport(report)}</code>
      </pre>
    </section>
  );
}
