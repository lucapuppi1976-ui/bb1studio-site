"use client";

import { useMemo } from "react";
import { buildAiFieldAutopilotControlRoomReport } from "@/lib/ai/aiFieldAutopilotControlRoom";

export default function FieldAutopilotControlRoomPanel() {
  const report = useMemo(() => buildAiFieldAutopilotControlRoomReport(), []);

  const blockedCommands = report.commandCandidates.filter((item) => item.status === "blocked");
  const reviewReadyCommands = report.commandCandidates.filter((item) => item.status === "review-ready");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V10.1 · AI Field Autopilot Simulation
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Field Autopilot Simulation Control Room
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Control room locale dry-run per coordinare scouting, rischio campo, readiness interventi,
            memoria, governance knowledge vault e command board. Tutto resta simulato, redatto e
            bloccato dietro revisione umana.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Autopilot status: {report.autopilotStatus}</p>
          <p className="mt-1">Score simulativo: {report.autopilotScore}/100</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Moduli</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.modules.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Lane</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.simulationLanes.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Comandi</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.commandCandidates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Review ready</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{reviewReadyCommands.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocked</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockedCommands.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Module state</h3>
          <div className="mt-4 space-y-3">
            {report.modules.map((module) => (
              <div key={module.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{module.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {module.sourceVersion} · {module.status}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {module.readinessScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{module.reviewerFocus}</p>
                {module.blockers.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-700">
                    {module.blockers.map((blocker) => (
                      <li key={blocker}>{blocker}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Command candidates</h3>
          <div className="mt-4 space-y-3">
            {report.commandCandidates.map((candidate) => (
              <div key={candidate.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{candidate.title}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {candidate.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{candidate.rationale}</p>
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  Priority: {candidate.priority} · sources: {candidate.fromModules.join(", ")}
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">Risk guards</h3>
          <div className="mt-4 space-y-3">
            {report.riskGuards.map((guard) => (
              <div key={guard.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{guard.guardrail}</p>
                <p className="mt-1 text-xs text-slate-500">{guard.severity}</p>
                <p className="mt-2 text-xs text-slate-600">{guard.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">Simulation timeline</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.simulationTimeline.map((step) => (
            <div key={step.sequence} className="rounded-xl bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Step {step.sequence}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-950">{step.label}</p>
              <p className="mt-2 text-xs text-slate-600">{step.simulatedDecision}</p>
              <p className="mt-2 text-xs font-medium text-amber-700">{step.humanReviewCheckpoint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
