"use client";

import { useMemo, useState } from "react";

import {
  approvedExecutionGateInput,
  createAiWorkOrderExecutionGate,
  defaultExecutionGateInput,
  formatAiWorkOrderExecutionGate,
  type ExecutionGateInput,
  type ExecutionReviewDecision,
} from "../../../lib/ai/aiWorkOrderExecutionGate";
import { createAiWorkOrderPreview } from "../../../lib/ai/aiWorkOrderPreview";

export default function WorkOrderExecutionGatePanel() {
  const [reviewDecision, setReviewDecision] = useState<ExecutionReviewDecision>("pending");
  const [evidenceConfirmed, setEvidenceConfirmed] = useState(false);
  const [reviewerAssigned, setReviewerAssigned] = useState(false);
  const [safetySignoff, setSafetySignoff] = useState(false);
  const [operatorAcknowledged, setOperatorAcknowledged] = useState(false);
  const [noProductRequest, setNoProductRequest] = useState(true);
  const [noDosageRequest, setNoDosageRequest] = useState(true);
  const [manualConversionRequested, setManualConversionRequested] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const gateInput: ExecutionGateInput = {
    reviewDecision,
    evidenceConfirmed,
    reviewerAssigned,
    safetySignoff,
    operatorAcknowledged,
    noProductRequest,
    noDosageRequest,
    manualConversionRequested,
  };

  const gate = useMemo(
    () => createAiWorkOrderExecutionGate(createAiWorkOrderPreview(), gateInput),
    [
      reviewDecision,
      evidenceConfirmed,
      reviewerAssigned,
      safetySignoff,
      operatorAcknowledged,
      noProductRequest,
      noDosageRequest,
      manualConversionRequested,
    ],
  );

  function applyApprovedFixture() {
    setReviewDecision(approvedExecutionGateInput.reviewDecision);
    setEvidenceConfirmed(approvedExecutionGateInput.evidenceConfirmed);
    setReviewerAssigned(approvedExecutionGateInput.reviewerAssigned);
    setSafetySignoff(approvedExecutionGateInput.safetySignoff);
    setOperatorAcknowledged(approvedExecutionGateInput.operatorAcknowledged);
    setNoProductRequest(approvedExecutionGateInput.noProductRequest);
    setNoDosageRequest(approvedExecutionGateInput.noDosageRequest);
    setManualConversionRequested(approvedExecutionGateInput.manualConversionRequested);
  }

  function resetGate() {
    setReviewDecision(defaultExecutionGateInput.reviewDecision);
    setEvidenceConfirmed(defaultExecutionGateInput.evidenceConfirmed);
    setReviewerAssigned(defaultExecutionGateInput.reviewerAssigned);
    setSafetySignoff(defaultExecutionGateInput.safetySignoff);
    setOperatorAcknowledged(defaultExecutionGateInput.operatorAcknowledged);
    setNoProductRequest(defaultExecutionGateInput.noProductRequest);
    setNoDosageRequest(defaultExecutionGateInput.noDosageRequest);
    setManualConversionRequested(defaultExecutionGateInput.manualConversionRequested);
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(formatAiWorkOrderExecutionGate(gate));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(gate, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  const checkboxItems = [
    {
      label: "Evidenze fotografiche confermate",
      checked: evidenceConfirmed,
      onChange: setEvidenceConfirmed,
    },
    {
      label: "Reviewer assegnato",
      checked: reviewerAssigned,
      onChange: setReviewerAssigned,
    },
    {
      label: "Safety sign-off completato",
      checked: safetySignoff,
      onChange: setSafetySignoff,
    },
    {
      label: "Operatore informato",
      checked: operatorAcknowledged,
      onChange: setOperatorAcknowledged,
    },
    {
      label: "Nessuna richiesta prodotto",
      checked: noProductRequest,
      onChange: setNoProductRequest,
    },
    {
      label: "Nessuna richiesta dosaggio",
      checked: noDosageRequest,
      onChange: setNoDosageRequest,
    },
    {
      label: "Conversione manuale richiesta",
      checked: manualConversionRequested,
      onChange: setManualConversionRequested,
    },
  ];

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-work-order-execution-gate="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Work Order Execution Gate
        </p>
        <h2 className="text-xl font-semibold">Gate di conversione manuale</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Valida se una preview operativa può essere convertita manualmente dopo review umana.
          Il gate non crea task, non crea interventi e non consente esecuzione automatica.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Controlli revisione</h3>

          <label className="mt-3 block text-sm">
            Decisione revisore
            <select
              className="mt-1 w-full rounded-lg border p-2 text-sm"
              value={reviewDecision}
              onChange={(event) => setReviewDecision(event.target.value as ExecutionReviewDecision)}
            >
              <option value="pending">pending</option>
              <option value="approve-with-caution">approve-with-caution</option>
              <option value="requires-corrections">requires-corrections</option>
              <option value="reject">reject</option>
            </select>
          </label>

          <div className="mt-4 grid gap-2">
            {checkboxItems.map((item) => (
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
              onClick={applyApprovedFixture}
            >
              Simula approvazione
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetGate}
            >
              Reset gate
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Gate status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">Status:</span>{" "}
              <strong>{gate.status}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">manualConversionAllowed:</span>{" "}
              <strong>{String(gate.manualConversionAllowed)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">automaticExecutionAllowed:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">automaticTaskCreationAllowed:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">automaticInterventionCreationAllowed:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">Gate fingerprint:</span>{" "}
              <strong className="break-all">{gate.gateFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Checklist gate</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {gate.checklist.map((item) => (
            <li key={item.id}>
              {item.passed ? "✓" : "✗"} {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Blockers</h3>
        {gate.blockers.length ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {gate.blockers.map((blocker) => (
              <li key={blocker}>{blocker}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Nessun blocker.</p>
        )}
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Prohibited instructions</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {gate.executionInstructions.prohibited.map((item) => (
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
          Copia gate
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyJson}
        >
          Esporta gate JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Gate copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatAiWorkOrderExecutionGate(gate)}</code>
      </pre>
    </section>
  );
}
