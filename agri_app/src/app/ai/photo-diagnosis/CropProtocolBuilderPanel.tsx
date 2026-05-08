"use client";

import { useMemo } from "react";
import { buildAiCropProtocolBuilderReport } from "@/lib/ai/aiCropProtocolBuilder";

export default function CropProtocolBuilderPanel() {
  const report = useMemo(() => buildAiCropProtocolBuilderReport(), []);
  const reviewReady = report.applicabilityIndex.filter(
    (item) => item.band === "review-ready" || item.band === "expert-ready",
  );
  const blockedGates = report.evidenceBacklog.filter((gate) => gate.blocking);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V10.2 · AI Crop Protocol Builder
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Crop-Specific Expert Protocol Builder
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Builder locale dry-run per protocolli expert specifici per coltura, fenologia,
            sintomi, contesto climatico, soglie evidenziali e conflitti. Nessun protocollo
            produce prescrizioni, dosaggi, task o interventi automatici.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Protocol status: {report.protocolStatus}</p>
          <p className="mt-1">Score: {report.protocolScore}/100</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Protocolli</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.protocolVariants.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Review ready</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{reviewReady.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Evidence gaps</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.evidenceBacklog.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking gates</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockedGates.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Conflitti</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.conflicts.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Applicability index
          </h3>

          <div className="mt-4 space-y-3">
            {report.applicabilityIndex.map((item) => (
              <div key={item.protocolId} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.protocolId} · {item.approvalStage} · {item.riskTier}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                    {item.score}/100
                  </span>
                </div>

                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {item.band}
                </p>

                {item.blockers.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-700">
                    {item.blockers.map((blocker) => (
                      <li key={blocker}>{blocker}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-emerald-700">
                    Nessun blocker locale rilevato.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Conflict register
          </h3>

          <div className="mt-4 space-y-3">
            {report.conflicts.map((conflict) => (
              <div key={conflict.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">{conflict.id}</p>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {conflict.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{conflict.finding}</p>
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  {conflict.conservativeResolution}
                </p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-700">
            Manual review board
          </h3>

          <div className="mt-4 space-y-3">
            {report.reviewBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.decisionTopic}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.protocolId} · reviewer: {item.reviewer}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Safety summary
        </h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.safetySummary.map((item) => (
            <div key={item} className="rounded-xl bg-white p-4 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
