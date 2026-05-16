import { buildAiMultilingualUxTranslationCoverageReport } from "@/lib/ai/aiMultilingualUxTranslationCoverage";

export default function OperationsAiMultilingualUxTranslationCoverage() {
  const report = buildAiMultilingualUxTranslationCoverageReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V18.7
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Multilingual UX Translation Coverage
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Board operativo per lingue UAT, dizionario UX, fallback policy,
            language switcher readiness, onboarding i18n, admin i18n e audit hardcoded text.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-multilingual-ux-translation-coverage-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.translationCoverageStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.translationCoverageScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Default</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.defaultLanguage}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Languages</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.supportedLanguages.length}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">AI live</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerAiReady ? "YES" : "NO"}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Multilingual readiness locks
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>Translation dictionary ready: {report.readiness.translationDictionaryReady ? "yes" : "no"}</li>
          <li>Missing translation gate ready: {report.readiness.missingTranslationGateReady ? "yes" : "no"}</li>
          <li>Language switcher readiness: {report.readiness.languageSwitcherReadinessReady ? "yes" : "no"}</li>
          <li>Public signup allowed: {report.readiness.publicSignupAllowed ? "yes" : "no"}</li>
          <li>Account write allowed: {report.readiness.accountWriteAllowed ? "yes" : "no"}</li>
          <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
          <li>AI persistence performed: {report.readiness.persistencePerformed ? "yes" : "no"}</li>
          <li>Execution allowed: {report.readiness.operationalExecutionAllowed ? "yes" : "no"}</li>
          <li>Human review: {report.readiness.humanReviewRequired ? "required" : "not required"}</li>
        </ul>
      </div>
    </section>
  );
}
