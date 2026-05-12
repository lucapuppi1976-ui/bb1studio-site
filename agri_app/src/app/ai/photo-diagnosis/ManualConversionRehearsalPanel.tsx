"use client";

import { useMemo } from "react";
import { buildAiManualConversionRehearsalReport } from "@/lib/ai/aiManualConversionRehearsal";

export default function ManualConversionRehearsalPanel() {
  const report = useMemo(() => buildAiManualConversionRehearsalReport(), []);
  const failedGates = report.conversionGates.filter((gate) => !gate.passed);
  const blockingRisks = report.conversionRiskRegister.filter((item) => item.blocksManualConversionActivation);
  const noGoItems = report.goNoGoBoard.filter((item) => item.goNoGoState === "no-go");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V15.6 · AI Manual Conversion Rehearsal
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Manual Conversion Rehearsal & No-Execution Work Preview
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Rehearsal locale dry-run per conversione manuale AI-to-work: task preview,
            intervention preview, reviewer checklist, blockers, correction path e certificato
            no-execution. Nessun task o intervento viene creato.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Conversion status: {report.conversionRehearsalStatus}</p>
          <p className="mt-1">Score: {report.conversionRehearsalScore}/100 · severity: {report.overallSeverity}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Preview</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.workPreviewReady ? "READY" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Conversion</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.readiness.manualConversionAllowed ? "YES" : "NO"}
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
          <p className="text-xs uppercase tracking-wide text-slate-500">No-go</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{noGoItems.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Conversion preview plan
          </h3>

          <div className="mt-4 space-y-3">
            {report.conversionPreviewPlan.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.draftType} · {item.severity}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.previewScore}/100
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{item.previewPurpose}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Work package drafts
          </h3>

          <div className="mt-4 space-y-3">
            {report.workPackageDrafts.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.draftType} · {item.severity} · {item.draftScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.draftContent.join(" · ")}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Conversion gates
          </h3>

          <div className="mt-4 space-y-3">
            {report.conversionGates.map((gate) => (
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
            Non-execution certificate
          </h3>

          <div className="mt-4 space-y-3">
            {report.nonExecutionCertificate.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.severity} · {item.certificateScore}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.certificateRule}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.blockedOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Manual conversion risk register
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.conversionRiskRegister.map((risk) => (
            <div key={risk.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{risk.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {risk.lane} · {risk.severity} · {risk.blocksManualConversionActivation ? "blocks activation" : "review"}
              </p>
              <p className="mt-2 text-xs text-slate-600">{risk.manualResolution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
