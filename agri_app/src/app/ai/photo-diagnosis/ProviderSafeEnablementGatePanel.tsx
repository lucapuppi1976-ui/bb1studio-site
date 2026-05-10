"use client";

import { useMemo } from "react";
import { buildAiProviderSafeEnablementGateReport } from "@/lib/ai/aiProviderSafeEnablementGate";

export default function ProviderSafeEnablementGatePanel() {
  const report = useMemo(() => buildAiProviderSafeEnablementGateReport(), []);
  const failedGates = report.enablementGates.filter((gate) => !gate.passed);
  const blockingRisks = report.safeEnablementRiskRegister.filter((item) => item.blocksDualControlReview);
  const urgentApprovals = report.dualControlApprovalBoard.filter((item) => item.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V12.7 · AI Provider Safe Enablement Gate
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Provider Safe Enablement Gate & Dual-Control Activation Simulator
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Gate locale dry-run per doppio controllo umano, change ticket simulato,
            readiness ledger, boundary exception register, go-live blockers e rollback rehearsal.
            Nessun provider viene chiamato e nessuna attivazione viene eseguita.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Enablement status: {report.enablementStatus}</p>
          <p className="mt-1">Score: {report.enablementScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.enablementGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Ledger</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.readinessLedger.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking risks</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingRisks.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent approvals</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentApprovals.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Enablement gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.enablementGates.map((gate) => (
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
            Go-live blockers
          </h3>

          <div className="mt-4 space-y-3">
            {report.goLiveBlockers.map((blocker) => (
              <div key={blocker.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{blocker.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {blocker.lane} · {blocker.severity}
                </p>
                <p className="mt-2 text-xs text-slate-600">{blocker.requiredManualResolution}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Dual-control approval board
          </h3>

          <div className="mt-4 space-y-3">
            {report.dualControlApprovalBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.approvalQuestion}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.priority} · {item.primaryReviewer} + {item.secondaryReviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Change ticket draft
          </h3>

          <div className="mt-4 space-y-3">
            {report.changeTicketDraft.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.draftReady ? "ready" : "review"} · {item.readinessScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.reviewerCheck}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Safe enablement risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.safeEnablementRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksDualControlReview ? "blocks" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
