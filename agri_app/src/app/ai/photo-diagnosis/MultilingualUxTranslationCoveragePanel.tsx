"use client";

import { useMemo } from "react";
import { buildAiMultilingualUxTranslationCoverageReport } from "@/lib/ai/aiMultilingualUxTranslationCoverage";

export default function MultilingualUxTranslationCoveragePanel() {
  const report = useMemo(() => buildAiMultilingualUxTranslationCoverageReport(), []);
  const blockingFindings = report.findings.filter((item) => item.blocksMultilingualUat);
  const readyLanguages = report.supportedLanguages.filter((item) => item.status === "ready");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            V18.7 · Multilingual UX
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Multilingual UX Completion & Translation Coverage Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Gate dry-run per copertura lingue, dizionario UX, fallback, language switcher,
            onboarding multilingua, admin i18n e audit dei testi hardcoded.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-semibold">Translation status: {report.translationCoverageStatus}</p>
          <p className="mt-1">Score: {report.translationCoverageScore}/100</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Languages</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.supportedLanguages.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Ready</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{readyLanguages.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Keys</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.dictionaryKeys.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{report.findings.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocking</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{blockingFindings.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Language coverage
          </h3>
          <div className="mt-4 space-y-3">
            {report.supportedLanguages.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">
                  {item.nativeLabel} · {item.code}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  fallback {item.fallback} · {item.status}
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  Coverage {item.coveragePercent}% · {item.translatedKeyCount}/{item.expectedKeyCount}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Missing translation gate
          </h3>
          <div className="mt-4 space-y-3">
            {report.missingTranslationBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.priority} · {item.score}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
            {report.hardcodedTextAuditBoard.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.priority} · {item.score}/100
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.safeOutcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
