"use client";

import { useMemo, useState } from "react";

import {
  createAiManualConversionAudit,
  formatAiManualConversionAudit,
  readyManualConversionAuditInput,
  type ManualConversionAuditInput,
} from "../../../lib/ai/aiManualConversionAudit";
import {
  createApprovedAiWorkOrderExecutionGate,
  createBlockedAiWorkOrderExecutionGate,
} from "../../../lib/ai/aiWorkOrderExecutionGate";

export default function ManualConversionAuditPanel() {
  const [readyMode, setReadyMode] = useState(false);
  const [reviewerName, setReviewerName] = useState("");
  const [convertedBy, setConvertedBy] = useState("");
  const [signedAtLabel, setSignedAtLabel] = useState("");
  const [reviewerNotes, setReviewerNotes] = useState("Review umana richiesta.");
  const [conversionNotes, setConversionNotes] = useState("Conversione manuale solo dopo conferma finale.");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const auditInput: ManualConversionAuditInput = readyMode
    ? {
        ...readyManualConversionAuditInput,
        reviewerName: reviewerName || readyManualConversionAuditInput.reviewerName,
        convertedBy: convertedBy || readyManualConversionAuditInput.convertedBy,
        signedAtLabel: signedAtLabel || readyManualConversionAuditInput.signedAtLabel,
        reviewerNotes: reviewerNotes
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        conversionNotes: conversionNotes
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      }
    : {
        ...readyManualConversionAuditInput,
        reviewerName,
        convertedBy,
        signedAtLabel,
        reviewerNotes: reviewerNotes
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        conversionNotes: conversionNotes
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        finalDecision: "pending",
      };

  const audit = useMemo(() => {
    const gate = readyMode
      ? createApprovedAiWorkOrderExecutionGate()
      : createBlockedAiWorkOrderExecutionGate();

    return createAiManualConversionAudit(gate, auditInput);
  }, [readyMode, reviewerName, convertedBy, signedAtLabel, reviewerNotes, conversionNotes]);

  function applyReadyFixture() {
    setReadyMode(true);
    setReviewerName(readyManualConversionAuditInput.reviewerName);
    setConvertedBy(readyManualConversionAuditInput.convertedBy);
    setSignedAtLabel(readyManualConversionAuditInput.signedAtLabel);
    setReviewerNotes(readyManualConversionAuditInput.reviewerNotes.join("\n"));
    setConversionNotes(readyManualConversionAuditInput.conversionNotes.join("\n"));
  }

  function resetAudit() {
    setReadyMode(false);
    setReviewerName("");
    setConvertedBy("");
    setSignedAtLabel("");
    setReviewerNotes("Review umana richiesta.");
    setConversionNotes("Conversione manuale solo dopo conferma finale.");
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(formatAiManualConversionAudit(audit));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(audit, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-manual-conversion-audit="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Manual Conversion Audit
        </p>
        <h2 className="text-xl font-semibold">Audit trail conversione manuale</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Crea un pacchetto audit esportabile per dimostrare che la conversione resta manuale:
          nessun DB write, nessuna creazione automatica, nessuna esecuzione automatica.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Record umano</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={reviewerName}
              onChange={(event) => setReviewerName(event.target.value)}
              placeholder="Reviewer name"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={convertedBy}
              onChange={(event) => setConvertedBy(event.target.value)}
              placeholder="Converted by"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={signedAtLabel}
              onChange={(event) => setSignedAtLabel(event.target.value)}
              placeholder="Signed at label"
            />
            <textarea
              className="min-h-24 rounded-lg border p-2 text-sm"
              value={reviewerNotes}
              onChange={(event) => setReviewerNotes(event.target.value)}
              placeholder="Reviewer notes"
            />
            <textarea
              className="min-h-24 rounded-lg border p-2 text-sm"
              value={conversionNotes}
              onChange={(event) => setConversionNotes(event.target.value)}
              placeholder="Conversion notes"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={applyReadyFixture}
            >
              Simula audit pronto
            </button>
            <button
              type="button"
              className="rounded-lg border px-3 py-2 text-sm font-medium"
              onClick={resetAudit}
            >
              Reset audit
            </button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Audit status</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">Decision:</span>{" "}
              <strong>{audit.decision}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">conversionAllowed:</span>{" "}
              <strong>{String(audit.conversionAllowed)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">manualTaskConversionAllowed:</span>{" "}
              <strong>{String(audit.manualTaskConversionAllowed)}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">manualInterventionConversionAllowed:</span>{" "}
              <strong>{String(audit.manualInterventionConversionAllowed)}</strong>
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
              <span className="text-muted-foreground">automaticExecutionAllowed:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">dbPersistenceAllowed:</span>{" "}
              <strong>false</strong>
            </p>
            <p>
              <span className="text-muted-foreground">auditFingerprint:</span>{" "}
              <strong className="break-all">{audit.auditFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Audit events</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
          {audit.events.map((event) => (
            <li key={event.id}>
              {event.safetyRelevant ? "✓" : "•"} {event.summary}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Unresolved blockers</h3>
        {audit.unresolvedBlockers.length ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {audit.unresolvedBlockers.map((blocker) => (
              <li key={blocker}>{blocker}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Nessun blocker.</p>
        )}
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Prohibited conversion actions</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {audit.conversionInstructions.prohibited.map((item) => (
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
          Copia audit
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyJson}
        >
          Esporta audit JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Audit copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatAiManualConversionAudit(audit)}</code>
      </pre>
    </section>
  );
}
