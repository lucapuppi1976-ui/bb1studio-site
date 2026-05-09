"use client";

import { useMemo } from "react";
import { buildAiProviderResponseFirewallReport } from "@/lib/ai/aiProviderResponseFirewall";

export default function ProviderResponseFirewallPanel() {
  const report = useMemo(() => buildAiProviderResponseFirewallReport(), []);
  const failedGates = report.outputValidationGates.filter((gate) => !gate.passed);
  const blockingBreaches = report.contractBreachRegister.filter((item) => item.blocksResponseUse);
  const urgentQuestions = report.reviewerValidationBoard.filter((question) => question.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V12.2 · AI Provider Response Firewall
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Provider Response Firewall & Output Validation Contract
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Firewall locale dry-run per validare response envelope, output gates,
            unsafe output rejection, breach register e reviewer validation board.
            Nessuna risposta provider viene ricevuta, accettata o usata operativamente.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Firewall status: {report.responseFirewallStatus}</p>
          <p className="mt-1">Score: {report.responseFirewallScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Sources</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.sourceNodes.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Failed gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Envelope</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.responseEnvelope.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Breaches</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingBreaches.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent Q</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentQuestions.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Response envelope
          </h3>

          <div className="mt-4 space-y-3">
            {report.responseEnvelope.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">required · review only</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.readinessScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.reviewerCheck}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Unsafe output rules
          </h3>

          <div className="mt-4 space-y-3">
            {report.unsafeOutputRules.map((rule) => (
              <div key={rule.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{rule.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {rule.severity} · {rule.reviewer}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{rule.ruleSummary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Output validation gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.outputValidationGates.map((gate) => (
              <div key={gate.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{gate.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {gate.lane} · {gate.severity} · {gate.passed ? "passed" : "review"}
                </p>
                <p className="mt-2 text-sm text-slate-600">{gate.reason}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{gate.hardStop}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Contract breach register
          </h3>

          <div className="mt-4 space-y-3">
            {report.contractBreachRegister.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.severity} · {item.blocksResponseUse ? "blocks use" : "review note"}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.manualResolution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Response gaps
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.responseGaps.map((gap) => (
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
