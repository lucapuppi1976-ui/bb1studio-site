"use client";

import { useMemo } from "react";
import { buildAiAgronomicBoardPackReport } from "@/lib/ai/aiAgronomicBoardPack";

export default function AgronomicBoardPackPanel() {
  const report = useMemo(() => buildAiAgronomicBoardPackReport(), []);
  const blockedCards = report.decisionCards.filter((card) => card.status === "blocked");
  const boardReadyCards = report.decisionCards.filter((card) => card.status === "board-ready");
  const failedGovernance = report.governanceChecklist.filter((item) => !item.passed);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V10.3 · AI Agronomic Board Pack
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Agronomic Board Pack & Executive Decision Center
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Executive decision center locale dry-run per sintetizzare rischio, evidence gaps,
            ROI proxy, readiness interventi, memory quality, knowledge governance, crop protocols
            e autopilot simulation in un board pack redatto per revisione umana.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Board status: {report.boardStatus}</p>
          <p className="mt-1">Score: {report.boardScore}/100</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Sources</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.signalSources.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision cards</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.decisionCards.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Board ready</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{boardReadyCards.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocked</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockedCards.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Gov gaps</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{failedGovernance.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Executive decision cards
          </h3>

          <div className="mt-4 space-y-3">
            {report.decisionCards.map((card) => (
              <div key={card.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{card.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {card.urgency} · {card.riskTier} · {card.status}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {card.linkedSources.length} sources
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-600">{card.decisionQuestion}</p>
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  {card.recommendedHumanAction}
                </p>

                {card.blockedBecause.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-700">
                    {card.blockedBecause.map((blocker) => (
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
            Signal sources
          </h3>

          <div className="mt-4 space-y-3">
            {report.signalSources.map((source) => (
              <div key={source.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{source.title}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {source.sourceVersion}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{source.executiveImplication}</p>
                <p className="mt-2 text-xs font-medium text-emerald-700">
                  Signal {source.signalScore}/100 · confidence {source.confidenceScore}/100
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            ROI proxy
          </h3>

          <div className="mt-4 space-y-3">
            {report.roiProxyLines.map((line) => (
              <div key={line.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{line.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  upside proxy {line.upsideProxy} · downside proxy {line.downsideProxy}
                </p>
                <p className="mt-2 text-xs text-slate-600">{line.interpretation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Governance checklist
        </h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.governanceChecklist.map((item) => (
            <div key={item.id} className="rounded-xl bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">{item.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {item.passed ? "passed" : "requires review"} · {item.requiredReviewer}
              </p>
              <p className="mt-2 text-xs text-slate-600">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
