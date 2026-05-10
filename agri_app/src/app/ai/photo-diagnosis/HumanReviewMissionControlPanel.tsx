"use client";

import { useMemo } from "react";
import { buildAiHumanReviewMissionControlReport } from "@/lib/ai/aiHumanReviewMissionControl";

export default function HumanReviewMissionControlPanel() {
  const report = useMemo(() => buildAiHumanReviewMissionControlReport(), []);
  const urgentQueue = report.reviewQueue.filter((item) => item.priority === "urgent");
  const blockingRisks = report.missionRiskRegister.filter((item) => item.blocksMissionControl);
  const blockedSignoffs = report.humanSignoff.filter((item) => !item.signoffReady);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V13.0 · AI Human Reviewer Mission Control
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Human Reviewer Mission Control & Evidence Arbitration Board
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Console locale dry-run per review queue, arbitraggio evidenze, gestione disaccordi,
            confidence calibration, escalation board, decision locks, audit packet e signoff umano.
            Nessun provider viene chiamato e nessuna decisione automatica viene prodotta.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Mission status: {report.missionControlStatus}</p>
          <p className="mt-1">Score: {report.missionControlScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Queue</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.reviewQueue.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentQueue.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Arbitration</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.evidenceArbitration.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking risks</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingRisks.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocked signoff</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockedSignoffs.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Review queue
          </h3>

          <div className="mt-4 space-y-3">
            {report.reviewQueue.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.priority} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    manual
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.reviewReason}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.safeOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Decision locks
          </h3>

          <div className="mt-4 space-y-3">
            {report.decisionLocks.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.reviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.lockStatement}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Evidence arbitration
          </h3>

          <div className="mt-4 space-y-3">
            {report.evidenceArbitration.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.evidenceScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.arbitrationQuestion}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Human signoff
          </h3>

          <div className="mt-4 space-y-3">
            {report.humanSignoff.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.signoffReady ? "ready" : "blocked"} · {item.reviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Mission risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.missionRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksMissionControl ? "blocks" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
