"use client";

import { useMemo } from "react";
import { buildAiCasePersistenceMigrationPlanReport } from "@/lib/ai/aiCasePersistenceMigrationPlan";

export default function CasePersistenceMigrationPlanPanel() {
  const report = useMemo(() => buildAiCasePersistenceMigrationPlanReport(), []);
  const failedGates = report.storageGates.filter((gate) => !gate.passed);
  const blockingRisks = report.storageRiskRegister.filter((item) => item.blocksStorageActivation);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V15.2 · AI Case Persistence Migration Plan
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Case Persistence Migration Plan & Storage Safety Blueprint
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Blueprint locale dry-run per futura persistenza casi AI: entity plan, migration plan,
            backup/restore, photo retention, audit chain, review records e storage gates. Nessuna
            migrazione viene eseguita e nessun dato AI viene persistito.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Storage status: {report.storageReadinessStatus}</p>
          <p className="mt-1">Score: {report.storageReadinessScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blueprint</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.casePersistencePlanReady ? "READY" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Storage</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.casePersistenceActivationAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking risks</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingRisks.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Entities</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.entityBlueprint.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Entity blueprint
          </h3>

          <div className="mt-4 space-y-3">
            {report.entityBlueprint.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.intendedModel} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.entityScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.requiredFields.join(" · ")}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Migration plan
          </h3>

          <div className="mt-4 space-y-3">
            {report.migrationPlan.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.priority} · {item.planScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.migrationQuestion}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Storage gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.storageGates.map((gate) => (
              <div key={gate.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{gate.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {gate.lane} · {gate.severity} · {gate.passed ? "passed" : "review"}
                </p>
                <p className="mt-2 text-sm text-slate-600">Score {gate.score}/100</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{gate.hardStop}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Backup / restore plan
          </h3>

          <div className="mt-4 space-y-3">
            {report.backupRestorePlan.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.restoreScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.manualResolution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Storage risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.storageRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksStorageActivation ? "blocks activation" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
