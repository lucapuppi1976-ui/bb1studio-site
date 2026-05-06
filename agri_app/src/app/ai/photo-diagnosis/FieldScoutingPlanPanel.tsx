"use client";

import { useMemo, useState } from "react";

import {
  createFieldScoutingFixture,
  createFieldScoutingPlan,
  defaultFieldScoutingInput,
  formatFieldScoutingPlan,
  type FieldScoutingInput,
} from "../../../lib/ai/aiFieldScoutingPlan";

type BooleanKey =
  | "includeScoutingRoute"
  | "includeSamplingGrid"
  | "includePhotoProtocol"
  | "includeEscalationRules"
  | "includeHumanReviewChecklist"
  | "humanReviewRequired";

export default function FieldScoutingPlanPanel() {
  const [input, setInput] = useState<FieldScoutingInput>(defaultFieldScoutingInput);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const plan = useMemo(() => createFieldScoutingPlan(input), [input]);

  function applyReadyFixture() {
    setInput(createFieldScoutingFixture());
  }

  function resetPlan() {
    setInput(defaultFieldScoutingInput);
  }

  function updateField<K extends keyof FieldScoutingInput>(key: K, value: FieldScoutingInput[K]) {
    setInput((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateList(key: "affectedRows" | "affectedZones" | "suspectedPatterns", value: string) {
    updateField(
      key,
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    );
  }

  async function copyPlan() {
    try {
      await navigator.clipboard.writeText(formatFieldScoutingPlan(plan));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function exportJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(plan, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  const toggles: Array<{ label: string; key: BooleanKey }> = [
    {
      label: "Scouting route",
      key: "includeScoutingRoute",
    },
    {
      label: "Sampling grid",
      key: "includeSamplingGrid",
    },
    {
      label: "Photo protocol",
      key: "includePhotoProtocol",
    },
    {
      label: "Escalation rules",
      key: "includeEscalationRules",
    },
    {
      label: "Human review checklist",
      key: "includeHumanReviewChecklist",
    },
    {
      label: "Human review required",
      key: "humanReviewRequired",
    },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-field-scouting-plan="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Field Scouting Plan & Sampling Grid
        </p>
        <h2 className="text-xl font-semibold">Piano scouting campo e griglia campionamento</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Genera un piano operativo locale per andare in campo: zone prioritarie, sampling grid,
          route step, protocollo foto, escalation e checklist revisore. Nessun provider AI live,
          nessuna persistenza, nessun task/intervento automatico.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input scouting</h3>
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
            <select
              className="rounded-lg border p-2 text-sm"
              value={input.dominantSeverity}
              onChange={(event) =>
                updateField("dominantSeverity", event.target.value as FieldScoutingInput["dominantSeverity"])
              }
            >
              <option value="unknown">unknown</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="critical">critical</option>
            </select>
            <select
              className="rounded-lg border p-2 text-sm"
              value={input.trendDirection}
              onChange={(event) =>
                updateField("trendDirection", event.target.value as FieldScoutingInput["trendDirection"])
              }
            >
              <option value="insufficient-data">insufficient-data</option>
              <option value="improving">improving</option>
              <option value="stable">stable</option>
              <option value="worsening">worsening</option>
            </select>
            <input
              className="rounded-lg border p-2 text-sm"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={input.confidenceScore}
              onChange={(event) => updateField("confidenceScore", Number(event.target.value))}
              placeholder="Confidence score"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              type="number"
              min="0"
              value={input.observationCount}
              onChange={(event) => updateField("observationCount", Number(event.target.value))}
              placeholder="Observation count"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              type="number"
              min="0"
              value={input.photoCount}
              onChange={(event) => updateField("photoCount", Number(event.target.value))}
              placeholder="Photo count"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              type="number"
              min="0"
              value={input.evidenceCount}
              onChange={(event) => updateField("evidenceCount", Number(event.target.value))}
              placeholder="Evidence count"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.affectedRows.join(", ")}
              onChange={(event) => updateList("affectedRows", event.target.value)}
              placeholder="File/settori coinvolti, separati da virgola"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.affectedZones.join(", ")}
              onChange={(event) => updateList("affectedZones", event.target.value)}
              placeholder="Zone coinvolte, separate da virgola"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={input.suspectedPatterns.join(", ")}
              onChange={(event) => updateList("suspectedPatterns", event.target.value)}
              placeholder="Pattern sospetti, separati da virgola"
            />
            <textarea
              className="min-h-24 rounded-lg border p-2 text-sm"
              value={input.agronomicContext}
              onChange={(event) => updateField("agronomicContext", event.target.value)}
              placeholder="Contesto agronomico"
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
              Simula scouting plan
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetPlan}
            >
              Reset piano
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Scouting status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">planReady:</span>{" "}
              <strong>{String(plan.planReady)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">riskPriority:</span>{" "}
              <strong>{plan.scoutingSummary.riskPriority}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">routeStepCount:</span>{" "}
              <strong>{plan.scoutingSummary.routeStepCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">samplingPointCount:</span>{" "}
              <strong>{plan.scoutingSummary.samplingPointCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">priorityZoneCount:</span>{" "}
              <strong>{plan.scoutingSummary.priorityZoneCount}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">minimumRequiredPhotos:</span>{" "}
              <strong>{plan.scoutingSummary.minimumRequiredPhotos}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">providerAiReady:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">planFingerprint:</span>{" "}
              <strong className="break-all">{plan.planFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Priority zones</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {plan.priorityZones.map((zone) => (
            <li key={zone.zoneId}>
              {zone.label} — priority={zone.priority} — rows={zone.targetRows.join(", ")} —
              evidence={zone.targetEvidence.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Sampling grid</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {plan.samplingGrid.map((point) => (
            <li key={point.pointId}>
              {point.sequence}. {point.label} — type={point.sampleType} — target={point.target}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Scouting route</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {plan.scoutingRoute.map((step) => (
            <li key={step.stepId}>
              {step.sequence}. {step.label} — action={step.actionType} — {step.instruction}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Photo protocol</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {plan.photoProtocol.map((protocol) => (
            <li key={protocol.protocolId}>
              {protocol.label} — angles={protocol.requiredAngles.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Escalation rules</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {plan.escalationRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Human review checklist</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {plan.humanReviewChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyPlan}
        >
          Copia scouting plan
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={exportJson}
        >
          Esporta scouting JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Scouting plan copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatFieldScoutingPlan(plan)}</code>
      </pre>
    </section>
  );
}
