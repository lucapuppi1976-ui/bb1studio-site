"use client";

import { useMemo } from "react";
import { buildAiReviewerRationaleLedgerReport } from "@/lib/ai/aiReviewerRationaleLedger";

export default function ReviewerRationaleLedgerPanel() {
  const report = useMemo(() => buildAiReviewerRationaleLedgerReport(), []);
  const failedGates = report.traceabilityGates.filter((gate) => !gate.passed);
  const blockingRisks = report.rationaleRiskRegister.filter((item) => item.blocksRationaleBoard);
  const blockedSignoffs = report.rationaleSignoff.filter((item) => !item.signoffReady);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V13.3 · AI Reviewer Rationale Ledger
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Reviewer Rationale Ledger & Evidence-to-Decision Traceability Matrix
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Ledger locale dry-run per motivazioni reviewer, tracciabilità evidenza-rationale,
            decision hold reasons, dissent links, audit replay, escalation board e signoff umano.
            Nessun provider viene chiamato e nessun output operativo viene prodotto.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Rationale status: {report.rationaleStatus}</p>
          <p className="mt-1">Score: {report.rationaleScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Trace</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.evidenceDecisionTrace.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Ledger</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.reviewerRationaleLedger.length}</p>
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
            Evidence-to-decision trace
          </h3>

          <div className="mt-4 space-y-3">
            {report.evidenceDecisionTrace.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.traceScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.traceQuestion}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.manualResolution}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Decision hold reasons
          </h3>

          <div className="mt-4 space-y-3">
            {report.decisionHoldReasons.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.reviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.holdReason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Traceability gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.traceabilityGates.map((gate) => (
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
            Rationale signoff
          </h3>

          <div className="mt-4 space-y-3">
            {report.rationaleSignoff.map((item) => (
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
          Rationale risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.rationaleRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksRationaleBoard ? "blocks" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
