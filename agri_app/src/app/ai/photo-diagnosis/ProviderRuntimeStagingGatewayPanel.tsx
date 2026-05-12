"use client";

import { useMemo } from "react";
import { buildAiProviderRuntimeStagingGatewayReport } from "@/lib/ai/aiProviderRuntimeStagingGateway";

export default function ProviderRuntimeStagingGatewayPanel() {
  const report = useMemo(() => buildAiProviderRuntimeStagingGatewayReport(), []);
  const failedGates = report.stagingGatewayGates.filter((gate) => !gate.passed);
  const blockingRisks = report.stagingGatewayRiskRegister.filter((item) => item.blocksProviderActivation);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V15.1 · AI Provider Runtime Staging Gateway
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Provider Runtime Staging Gateway & Contract Hardening
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Gateway provider di staging in modalità locale dry-run: design server-only, request envelope,
            response contract, schema guard, budget guard, fallback plan e dry-run cases. Nessun provider
            viene chiamato e nessuna persistenza AI viene eseguita.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Gateway status: {report.gatewayReadinessStatus}</p>
          <p className="mt-1">Score: {report.gatewayReadinessScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Gateway</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.providerRuntimeStagingReady ? "READY" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Provider call</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.providerCallAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking risks</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingRisks.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Dry-run cases</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.dryRunCaseMatrix.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Gateway design plan
          </h3>

          <div className="mt-4 space-y-3">
            {report.gatewayDesignPlan.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.lane} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.designScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.designQuestion}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Dry-run case matrix
          </h3>

          <div className="mt-4 space-y-3">
            {report.dryRunCaseMatrix.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.dryRunScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.simulatedOutcome}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Staging gateway gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.stagingGatewayGates.map((gate) => (
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
            Provider fallback plan
          </h3>

          <div className="mt-4 space-y-3">
            {report.providerFallbackPlan.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.fallbackScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeFallback}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Provider staging risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.stagingGatewayRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksProviderActivation ? "blocks activation" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
