"use client";

import { useMemo } from "react";
import { buildAiHarvestQualityReadinessReport } from "@/lib/ai/aiHarvestQualityReadiness";

export default function HarvestQualityReadinessPanel() {
  const report = useMemo(() => buildAiHarvestQualityReadinessReport(), []);
  const blockingGaps = report.evidenceGaps.filter((gap) => gap.severity === "blocking");
  const criticalZones = report.harvestZones.filter((zone) => zone.tier === "critical");
  const urgentScenarios = report.harvestScenarios.filter((scenario) => scenario.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V10.9 · AI Harvest Quality Readiness
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Harvest Readiness & Post-Harvest Quality Simulator
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Simulatore locale dry-run per readiness raccolta, qualità post raccolta,
            storage, logistica, pressione qualità e scenari di review manuale. Nessuna
            previsione produttiva, task, intervento, prescrizione o dosaggio viene generato.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Readiness status: {report.readinessStatus}</p>
          <p className="mt-1">Score: {report.readinessScore}/100 · tier: {report.farmHarvestTier}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Zones</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.harvestZones.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Critical</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{criticalZones.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Signals</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.qualitySignals.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentScenarios.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking gaps</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingGaps.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Harvest zones
          </h3>

          <div className="mt-4 space-y-3">
            {report.harvestZones.map((zone) => (
              <div key={zone.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{zone.id}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {zone.cropFamily} · {zone.simulatedZoneBand} · {zone.tier}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    maturity {zone.maturityWindowScore}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{zone.reviewerConcern}</p>
                {zone.blockers.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-700">
                    {zone.blockers.map((blocker) => (
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
            Harvest scenarios
          </h3>

          <div className="mt-4 space-y-3">
            {report.harvestScenarios.map((scenario) => (
              <div key={scenario.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{scenario.title}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {scenario.priority}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{scenario.simulatedChange}</p>
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  quality proxy {scenario.expectedQualityProtectionProxy} · delay exposure proxy {scenario.expectedDelayExposureProxy}
                </p>
                <p className="mt-2 text-xs text-slate-500">{scenario.manualReviewDecision}</p>
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
