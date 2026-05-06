"use client";

import { useMemo, useState } from "react";

import {
  createAiDecisionDossier,
  formatAiDecisionDossier,
} from "../../../lib/ai/aiDecisionDossier";
import { createDiagnosisCaseReport } from "../../../lib/ai/photoDiagnosisCaseReport";
import {
  createPhotoSymptomAnnotationFixture,
  type SymptomSeverity,
} from "../../../lib/ai/photoSymptomAnnotation";

export default function DecisionDossierPanel() {
  const [crop, setCrop] = useState("vite");
  const [context, setContext] = useState("macchie brune localizzate con alone giallo");
  const [severity, setSeverity] = useState<SymptomSeverity>("medium");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const dossier = useMemo(() => {
    const fixture = createPhotoSymptomAnnotationFixture();
    const caseReport = createDiagnosisCaseReport({
      ...fixture,
      crop,
      plantContext: context,
      regions: fixture.regions.map((region, index) => ({
        ...region,
        severity: index === 0 ? severity : region.severity,
      })),
    });

    return createAiDecisionDossier(caseReport);
  }, [crop, context, severity]);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(formatAiDecisionDossier(dossier));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(dossier, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-decision-dossier="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Decision Dossier
        </p>
        <h2 className="text-xl font-semibold">Approval pack operativo</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Crea un dossier decisionale locale con gate di approvazione, work package, blocchi
          operativi e sign-off umano. Nessuna chiamata AI, nessuna persistenza DB e nessuna
          esecuzione automatica.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input decisionale</h3>
          <div className="mt-3 grid gap-3">
            <input
              className="rounded-lg border p-2 text-sm"
              value={crop}
              onChange={(event) => setCrop(event.target.value)}
              placeholder="Coltura"
            />
            <input
              className="rounded-lg border p-2 text-sm"
              value={context}
              onChange={(event) => setContext(event.target.value)}
              placeholder="Contesto osservato"
            />
            <select
              className="rounded-lg border p-2 text-sm"
              value={severity}
              onChange={(event) => setSeverity(event.target.value as SymptomSeverity)}
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="critical">critical</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Decision summary</h3>
          <p className="mt-3 text-sm text-muted-foreground">{dossier.executiveDecision}</p>
          <div className="mt-4 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">Status:</span>{" "}
              <strong>{dossier.decisionStatus}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">Risk:</span>{" "}
              <strong>{dossier.risk}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">Fingerprint:</span>{" "}
              <strong className="break-all">{dossier.dossierFingerprint}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {dossier.gates.map((gate) => (
          <div key={gate.id} className="rounded-xl border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">{gate.title}</h3>
              <span className="rounded-full border px-2 py-1 text-xs">{gate.status}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{gate.rationale}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Required checks
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
              {gate.requiredChecks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {dossier.workPackages.map((pack) => (
          <div key={pack.id} className="rounded-xl border p-4">
            <h3 className="font-semibold">{pack.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              ownerRole={pack.ownerRole} · priority={pack.priority}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{pack.deliverable}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Disallowed actions
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
              {pack.disallowedActions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Safety sign-off</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>providerCalled=false</li>
          <li>persistencePerformed=false</li>
          <li>productPrescriptionPerformed=false</li>
          <li>dosageAdvicePerformed=false</li>
          <li>automaticTaskCreationPerformed=false</li>
          <li>automaticInterventionCreationPerformed=false</li>
          <li>allowedToExecute=false</li>
          <li>humanReviewRequired=true</li>
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyText}
        >
          Copia dossier testuale
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyJson}
        >
          Esporta dossier JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Dossier copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatAiDecisionDossier(dossier)}</code>
      </pre>
    </section>
  );
}
