"use client";

import { useMemo, useState } from "react";

import {
  createDiagnosisCaseReport,
  formatDiagnosisCaseReport,
} from "../../../lib/ai/photoDiagnosisCaseReport";
import { createPhotoSymptomAnnotationFixture, type SymptomSeverity } from "../../../lib/ai/photoSymptomAnnotation";

export default function CaseReportPanel() {
  const [crop, setCrop] = useState("vite");
  const [context, setContext] = useState("foglia con macchie brune e alone giallo");
  const [severity, setSeverity] = useState<SymptomSeverity>("medium");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const report = useMemo(() => {
    const fixture = createPhotoSymptomAnnotationFixture();

    return createDiagnosisCaseReport({
      ...fixture,
      crop,
      plantContext: context,
      regions: fixture.regions.map((region, index) => ({
        ...region,
        severity: index === 0 ? severity : region.severity,
      })),
    });
  }, [crop, context, severity]);

  async function copyTextReport() {
    try {
      await navigator.clipboard.writeText(formatDiagnosisCaseReport(report));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function copyJsonReport() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-report-builder="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Case Report Builder
        </p>
        <h2 className="text-xl font-semibold">Report operativo esportabile</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Consolida intake foto, diagnosi differenziale, playbook soluzioni, audit trail e
          guardrail in un report locale. Nessuna chiamata AI, nessuna persistenza DB e nessuna
          esecuzione automatica.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Input report</h3>
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

          <div className="mt-4 rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">Report fingerprint</p>
            <p className="break-all font-semibold">{report.reportFingerprint}</p>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Executive summary</h3>
          <p className="mt-3 text-sm text-muted-foreground">{report.executiveSummary}</p>

          <div className="mt-4 grid gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">Risk:</span>{" "}
              <strong>{report.risk}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">Confidence:</span>{" "}
              <strong>{report.confidenceLabel}</strong>
            </p>
            <p>
              <span className="text-muted-foreground">Top candidate:</span>{" "}
              <strong>{report.topCandidateLabel || "none"}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {report.sections.map((section) => (
          <div key={section.kind} className="rounded-xl border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">{section.title}</h3>
              <span className="rounded-full border px-2 py-1 text-xs">{section.status}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{section.summary}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
              {section.bullets.slice(0, 6).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Audit trail</h3>
        <div className="mt-3 grid gap-2 text-xs text-muted-foreground md:grid-cols-2">
          {report.auditTrail.map((entry) => (
            <p key={entry.id}>
              <strong>{entry.label}:</strong> {entry.value}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Safety summary</h3>
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
          onClick={copyTextReport}
        >
          Copia report testuale
        </button>
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm font-medium"
          onClick={copyJsonReport}
        >
          Esporta report JSON
        </button>
      </div>

      {copyState === "copied" ? (
        <p className="mt-2 text-sm text-muted-foreground">Report copiato.</p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Copia non riuscita. Puoi selezionare manualmente il contenuto.
        </p>
      ) : null}

      <pre className="mt-5 max-h-96 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
        <code>{formatDiagnosisCaseReport(report)}</code>
      </pre>
    </section>
  );
}
