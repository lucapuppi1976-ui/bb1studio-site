"use client";

import { useMemo } from "react";
import { buildAiProviderActivationFirewallReport } from "@/lib/ai/aiProviderActivationFirewall";

export default function ProviderActivationFirewallPanel() {
  const report = useMemo(() => buildAiProviderActivationFirewallReport(), []);
  const failedGates = report.readinessGates.filter((gate) => !gate.passed);
  const criticalRules = report.runtimeFirewallRules.filter((rule) => rule.severity === "critical");
  const urgentQuestions = report.manualApprovalQuestions.filter((question) => question.priority === "urgent");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V12.0 · AI Provider Activation Firewall
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Provider Activation Firewall & Runtime Safety Control Plane
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Control plane locale dry-run per activation gates, payload minimization,
            runtime guard, rollout stages, rollback plan e manual approval board. Nessun
            provider viene chiamato e nessuna automazione viene abilitata.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Firewall status: {report.firewallStatus}</p>
          <p className="mt-1">Score: {report.firewallScore}/100 · severity: {report.overallSeverity}</p>
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
          <p className="text-xs uppercase tracking-wide text-slate-500">Payload items</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.payloadReview.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Critical rules</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{criticalRules.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Urgent Q</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{urgentQuestions.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Readiness gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.readinessGates.map((gate) => (
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
                <p className="mt-2 text-xs text-slate-600">{gate.reason}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{gate.hardStop}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Rollout stages
          </h3>

          <div className="mt-4 space-y-3">
            {report.rolloutStages.map((stage) => (
              <div key={stage.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{stage.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  stage {stage.stageOrder} · {stage.readinessBand} · {stage.priority}
                </p>
                <p className="mt-2 text-sm text-slate-600">{stage.requiredHumanDecision}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{stage.allowedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Runtime firewall rules
          </h3>

          <div className="mt-4 space-y-3">
            {report.runtimeFirewallRules.map((rule) => (
              <div key={rule.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{rule.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {rule.severity} · {rule.reviewer}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{rule.blockedRuntimeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Firewall gaps
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.firewallGaps.map((gap) => (
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
