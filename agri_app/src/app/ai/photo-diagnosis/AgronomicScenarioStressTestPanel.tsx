"use client";

import { useMemo } from "react";
import { buildAiAgronomicScenarioStressTestReport } from "@/lib/ai/aiAgronomicScenarioStressTest";

export default function AgronomicScenarioStressTestPanel() {
  const report = useMemo(() => buildAiAgronomicScenarioStressTestReport(), []);
  const blockedScenarios = report.scenarioNodes.filter((node) => node.blockers.length > 0);
  const failedGates = report.resilienceGates.filter((gate) => !gate.passed);
  const urgentDrills = report.warRoomDrills.filter((drill) => drill.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V11.4 · AI Scenario Stress Test
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Agronomic Scenario Stress Test & Resilience War Room
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            War room locale dry-run per stress test multi-scenario, failure modes,
            resilience gates, rollback playbook e reviewer response drills. Il modulo
            prepara solo scenari redatti per revisione umana.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Stress status: {report.stressTestStatus}</p>
          <p className="mt-1">Score: {report.stressTestScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Scenarios</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.scenarioNodes.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocked</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockedScenarios.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentDrills.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Gaps</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.stressTestGaps.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Scenario nodes
          </h3>

          <div className="mt-4 space-y-3">
            {report.scenarioNodes.map((node) => (
              <div key={node.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{node.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {node.sourceVersion} · {node.lane} · {node.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {node.resilienceScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{node.reviewerFocus}</p>
                {node.blockers.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-700">
                    {node.blockers.map((blocker) => (
                      <li key={blocker}>{blocker}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            War room drills
          </h3>

          <div className="mt-4 space-y-3">
            {report.warRoomDrills.map((drill) => (
              <div key={drill.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{drill.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {drill.status} · {drill.priority}
                </p>
                <p className="mt-2 text-sm text-slate-600">{drill.reviewerQuestion}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{drill.allowedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Rollback playbook
          </h3>

          <div className="mt-4 space-y-3">
            {report.rollbackPlaybook.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">{item.priority}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.manualRollbackAction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Stress test gaps
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.stressTestGaps.map((gap) => (
            <div key={gap.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{gap.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {gap.lane} · {gap.severity}
              </p>
              <p className="mt-2 text-xs text-slate-600">{gap.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
