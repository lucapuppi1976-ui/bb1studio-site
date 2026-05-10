"use client";

import { useMemo } from "react";
import { buildAiProviderFinalReadinessAuditReport } from "@/lib/ai/aiProviderFinalReadinessAudit";

export default function ProviderFinalReadinessAuditPanel() {
  const report = useMemo(() => buildAiProviderFinalReadinessAuditReport(), []);
  const failedGates = report.releaseFreezeGates.filter((gate) => !gate.passed);
  const blockingRisks = report.finalRiskRegister.filter((item) => item.blocksFinalReview);
  const urgentBoardItems = report.executiveBoardChecklist.filter((item) => item.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V12.9 · AI Provider Final Readiness Audit
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Provider Final Readiness Audit Pack & Activation Freeze Ledger
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Audit pack locale dry-run per chiudere la fase provider readiness:
            final dossier, activation freeze ledger, release freeze gates, executive board
            checklist, non-activation evidence e rollback certification. Nessun provider viene chiamato.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Final audit status: {report.finalAuditStatus}</p>
          <p className="mt-1">Score: {report.finalAuditScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Dossier</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.finalAuditDossier.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Freeze items</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.activationFreezeLedger.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking risks</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingRisks.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent board</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentBoardItems.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Release freeze gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.releaseFreezeGates.map((gate) => (
              <div key={gate.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{gate.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {gate.lane} · {gate.severity} · {gate.passed ? "passed" : "review"}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {gate.score}/100
                  </span>
                </div>
                <p className="mt-2 text-xs font-medium text-emerald-700">{gate.hardStop}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Activation freeze ledger
          </h3>

          <div className="mt-4 space-y-3">
            {report.activationFreezeLedger.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.reviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.freezeStatement}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Final audit dossier
          </h3>

          <div className="mt-4 space-y-3">
            {report.finalAuditDossier.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.sourceVersion} · {item.lane} · {item.readinessScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.reviewerCheck}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Executive board checklist
          </h3>

          <div className="mt-4 space-y-3">
            {report.executiveBoardChecklist.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.question}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.priority} · {item.reviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Final risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.finalRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksFinalReview ? "blocks" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
