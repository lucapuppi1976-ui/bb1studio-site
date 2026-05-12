"use client";

import { useMemo } from "react";
import { buildAiOnlineOperationalReadinessReport } from "@/lib/ai/aiOnlineOperationalReadiness";

export default function OnlineOperationalReadinessPanel() {
  const report = useMemo(() => buildAiOnlineOperationalReadinessReport(), []);
  const failedGates = report.operationalReadinessGates.filter((gate) => !gate.passed);
  const blockingRisks = report.readinessRiskRegister.filter((item) => item.blocksOperationalActivation);
  const noGoItems = report.betaGoNoGoBoard.filter((item) => item.goNoGoState === "no-go");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V15.0 · Online Operational Readiness
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Online Operational Readiness & Provider Activation Plan
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Readiness board locale dry-run per passare da AI simulativa a percorso operativo controllato:
            provider plan, staging, migration plan, human review persistence, access control,
            cost/rate limit, rollback e beta go/no-go. Nessun provider viene chiamato e nessuna
            persistenza AI viene eseguita.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Readiness status: {report.readinessStatus}</p>
          <p className="mt-1">Score: {report.readinessScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Online dry-run</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.onlineControlledReady ? "READY" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">AI operativo</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.operationalAiReady ? "READY" : "NO-GO"}
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
          <p className="text-xs uppercase tracking-wide text-slate-500">No-go</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{noGoItems.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Provider activation plan
          </h3>

          <div className="mt-4 space-y-3">
            {report.providerActivationPlan.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.planScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.heldState}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Beta go/no-go board
          </h3>

          <div className="mt-4 space-y-3">
            {report.betaGoNoGoBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.goNoGoState} · {item.severity}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Operational readiness gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.operationalReadinessGates.map((gate) => (
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
            Staged roadmap
          </h3>

          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-700">
            <p><strong>V15.0:</strong> {report.stagedRoadmap.v150}</p>
            <p><strong>V15.1:</strong> {report.stagedRoadmap.v151}</p>
            <p><strong>V15.2:</strong> {report.stagedRoadmap.v152}</p>
            <p><strong>V15.3:</strong> {report.stagedRoadmap.v153}</p>
            <p><strong>V16.0:</strong> {report.stagedRoadmap.v160}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Online readiness risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.readinessRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksOperationalActivation ? "blocks activation" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
