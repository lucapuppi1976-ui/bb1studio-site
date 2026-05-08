"use client";

import { useMemo } from "react";
import { buildAiFarmDigitalTwinReadinessReport } from "@/lib/ai/aiFarmDigitalTwinReadiness";

export default function FarmDigitalTwinReadinessPanel() {
  const report = useMemo(() => buildAiFarmDigitalTwinReadinessReport(), []);
  const blockingGaps = report.readinessGaps.filter((gap) => gap.severity === "blocking");
  const highRiskFields = report.fieldNodes.filter(
    (field) => field.riskTier === "critical" || field.riskTier === "elevated",
  );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V10.4 · AI Farm Digital Twin
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Farm Digital Twin Readiness Simulator
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Simulatore locale dry-run per modellare appezzamenti, pressione casi, readiness
            operativa, scenari, evidence gaps e governance stops. Il twin non scrive dati,
            non chiama provider e non abilita automazioni.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Twin status: {report.twinStatus}</p>
          <p className="mt-1">Score: {report.twinScore}/100 · risk: {report.farmRiskTier}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Field nodes</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.fieldNodes.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">High risk</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{highRiskFields.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Scenarios</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.scenarioSimulations.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Gaps</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.readinessGaps.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingGaps.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Field digital twin nodes
          </h3>

          <div className="mt-4 space-y-3">
            {report.fieldNodes.map((field) => (
              <div key={field.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{field.id}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {field.cropFamily} · {field.simulatedAreaBand} · {field.riskTier}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {field.readinessScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{field.reviewerConcern}</p>
                {field.blockedSignals.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-700">
                    {field.blockedSignals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Scenario sandbox
          </h3>

          <div className="mt-4 space-y-3">
            {report.scenarioSimulations.map((scenario) => (
              <div key={scenario.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{scenario.title}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {scenario.impact}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{scenario.simulatedChange}</p>
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  benefit proxy {scenario.expectedBenefitProxy} · risk proxy {scenario.expectedRiskProxy}
                </p>
                <p className="mt-2 text-xs text-slate-500">{scenario.reviewerDecision}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Governance stops
          </h3>

          <div className="mt-4 space-y-3">
            {report.governanceStops.map((stop) => (
              <div key={stop.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{stop.stop}</p>
                <p className="mt-1 text-xs text-slate-500">Reviewer: {stop.reviewer}</p>
                <p className="mt-2 text-xs text-slate-600">{stop.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Manual review board
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.manualReviewBoard.map((item) => (
            <div key={item.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{item.decisionTopic}</p>
              <p className="mt-1 text-xs text-slate-500">Reviewer: {item.reviewer}</p>
              <p className="mt-2 text-xs font-medium text-emerald-700">{item.safeOutcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
