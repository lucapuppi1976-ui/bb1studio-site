"use client";

import { useMemo } from "react";
import { buildAiAgronomicDecisionSimulationBoardReport } from "@/lib/ai/aiAgronomicDecisionSimulationBoard";

export default function AgronomicDecisionSimulationBoardPanel() {
  const report = useMemo(() => buildAiAgronomicDecisionSimulationBoardReport(), []);
  const failedGates = report.strategyGateMatrix.filter((gate) => !gate.passed);
  const blockingRisks = report.strategyRiskRegister.filter((item) => item.blocksStrategyBoard);
  const blockedSignoffs = report.strategySignoff.filter((item) => !item.signoffReady);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V14.0 · AI Agronomic Decision Simulation
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Agronomic Decision Simulation Board & Non-Execution Strategy Pack
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Board locale dry-run per simulazione decisionale agronomica post-review:
            scenari strategici, option matrix, uncertainty map, non-execution certificate,
            strategy gates e signoff umano. Nessun provider viene chiamato e nessun output operativo viene prodotto.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Strategy status: {report.strategySimulationStatus}</p>
          <p className="mt-1">Score: {report.strategySimulationScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Scenarios</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.decisionSimulationBoard.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Uncertainty</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.agronomicUncertaintyMap.length}</p>
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
            Decision simulation board
          </h3>

          <div className="mt-4 space-y-3">
            {report.decisionSimulationBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.simulationScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.scenarioQuestion}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.safeInterpretation}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Non-execution certificate
          </h3>

          <div className="mt-4 space-y-3">
            {report.nonExecutionCertificate.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.reviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.certificateReason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Strategy gate matrix
          </h3>

          <div className="mt-4 space-y-3">
            {report.strategyGateMatrix.map((gate) => (
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
            Strategy signoff
          </h3>

          <div className="mt-4 space-y-3">
            {report.strategySignoff.map((item) => (
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
          Strategy risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.strategyRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksStrategyBoard ? "blocks" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
