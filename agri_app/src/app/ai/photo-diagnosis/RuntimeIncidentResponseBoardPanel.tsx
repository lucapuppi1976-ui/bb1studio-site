"use client";

import { useMemo } from "react";
import { buildAiRuntimeIncidentResponseBoardReport } from "@/lib/ai/aiRuntimeIncidentResponseBoard";

export default function RuntimeIncidentResponseBoardPanel() {
  const report = useMemo(() => buildAiRuntimeIncidentResponseBoardReport(), []);
  const failedGates = report.incidentGates.filter((gate) => !gate.passed);
  const blockingFindings = report.incidentFindings.filter((item) => item.blocksIncidentActivation);
  const noGoItems = report.incidentNoGoBoard.filter((item) => item.goNoGoState === "no-go");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V16.5 · AI Runtime Incident Response Board
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Runtime Incident Response Board & Provider Failure Drill
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Board locale dry-run per incident intake, provider failure drill, response routing,
            rollback action cards, operator communication e anomaly replay. Nessuna risposta runtime viene attivata.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Incident board: {report.incidentBoardStatus}</p>
          <p className="mt-1">Score: {report.incidentBoardScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Board</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.runtimeIncidentResponseReady ? "READY" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Response</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.incidentResponseAllowed ? "YES" : "LOCKED"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking findings</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingFindings.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">No-go</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{noGoItems.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Incident intake
          </h3>

          <div className="mt-4 space-y-3">
            {report.incidentIntakePlan.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.intakeScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.intakePurpose}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Provider failure drill
          </h3>

          <div className="mt-4 space-y-3">
            {report.providerFailureDrill.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.drillScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.failureQuestion}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Incident gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.incidentGates.map((gate) => (
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
            Incident no-go board
          </h3>

          <div className="mt-4 space-y-3">
            {report.incidentNoGoBoard.map((item) => (
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
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Incident findings
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.incidentFindings.map((finding) => (
            <div key={finding.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{finding.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {finding.lane} · {finding.severity} · {finding.blocksIncidentActivation ? "blocks activation" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{finding.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
