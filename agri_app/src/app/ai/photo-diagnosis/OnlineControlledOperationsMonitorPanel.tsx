"use client";

import { useMemo } from "react";
import { buildAiOnlineControlledOperationsMonitorReport } from "@/lib/ai/aiOnlineControlledOperationsMonitor";

export default function OnlineControlledOperationsMonitorPanel() {
  const report = useMemo(() => buildAiOnlineControlledOperationsMonitorReport(), []);
  const blockingFindings = report.onlineControlledFindings.filter((item) => item.blocksOnlineControlledOperations);
  const urgentChecks = report.dailyOpsChecklist.filter((item) => item.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V18.0 · Online Controlled Operations Monitor
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Online Controlled Operations Monitor & Dry-Run Production Watchtower
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Monitor post go-live per osservabilità online controllata, endpoint protetti,
            checklist giornaliera, rollback readiness e guardrail AI. Nessuna attivazione AI live.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Online controlled: {report.onlineControlledStatus}</p>
          <p className="mt-1">Score: {report.onlineControlledScore}/100</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Online GO</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.onlineControlledGo ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">AI live</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.providerAiReady ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking findings</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingFindings.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent checks</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentChecks.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Evidence pack</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.goLiveEvidencePack.length}</p>
        </div>
      </div>
    </section>
  );
}
