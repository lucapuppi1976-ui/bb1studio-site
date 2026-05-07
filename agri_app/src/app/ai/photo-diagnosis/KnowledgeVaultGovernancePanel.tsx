"use client";

import { useMemo } from "react";
import { buildAiKnowledgeVaultGovernanceReport } from "@/lib/ai/aiKnowledgeVaultGovernance";

export default function KnowledgeVaultGovernancePanel() {
  const report = useMemo(() => buildAiKnowledgeVaultGovernanceReport(), []);

  const enforcedGuardrails = Object.entries(report.readiness).filter(([, value]) => value === true);
  const lockedCapabilities = Object.entries(report.readiness).filter(([, value]) => value === false);

  return (
    <section className="rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V10.0 · AI Knowledge Vault Governance
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Agronomic Knowledge Vault & Expert Playbook Governance
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Vault locale dry-run per governare playbook agronomici expert, soglie evidenziali,
            conflitti, approvazioni e rollback. Il modulo non chiama provider, non scrive memoria,
            non crea task e non abilita interventi automatici.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Manual review required</p>
          <p className="mt-1">Dispatch manuale · output redatto · analisi locale</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Playbook</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.snapshot.totalPlaybooks}</p>
          <p className="mt-1 text-xs text-slate-500">expert dry-run versionati</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Review ready</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.snapshot.reviewReadyPlaybooks}</p>
          <p className="mt-1 text-xs text-slate-500">richiedono conferma umana</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Evidence gaps</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.evidenceGaps.length}</p>
          <p className="mt-1 text-xs text-slate-500">gap tracciati senza scrittura</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Conflitti</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.conflicts.length}</p>
          <p className="mt-1 text-xs text-slate-500">risoluzione conservativa</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Applicabilità playbook
          </h3>

          <div className="mt-4 space-y-3">
            {report.applicabilityIndex.map((item) => (
              <div key={item.playbookId} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.playbookId} · {item.approvalStage}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.applicabilityScore}/100
                  </span>
                </div>

                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {item.band}
                </p>

                {item.blockers.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-700">
                    {item.blockers.map((blocker) => (
                      <li key={blocker}>{blocker}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-emerald-700">
                    Nessun blocker locale rilevato.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Conflict register
          </h3>

          <div className="mt-4 space-y-3">
            {report.conflicts.map((conflict) => (
              <div key={conflict.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{conflict.id}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {conflict.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{conflict.finding}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{conflict.resolution}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Approval queue
          </h3>

          <div className="mt-4 space-y-3">
            {report.approvalQueue.map((item) => (
              <div key={`${item.playbookId}-${item.nextStage}`} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Next stage: {item.nextStage} · reviewer: {item.requiredReviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Safety guardrail</h3>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-emerald-700">Guardrail attivi</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {enforcedGuardrails.slice(0, 8).map(([key]) => (
                <span key={key} className="rounded-full bg-white px-3 py-1 text-xs text-slate-700">
                  {key}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-amber-700">Capacità bloccate</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {lockedCapabilities.slice(0, 10).map(([key]) => (
                <span key={key} className="rounded-full bg-white px-3 py-1 text-xs text-slate-700">
                  {key}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
