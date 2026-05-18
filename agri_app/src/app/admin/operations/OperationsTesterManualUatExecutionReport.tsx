import { buildTesterManualUatExecutionReport } from "@/lib/ops/testerManualUatExecutionReport";

export default function OperationsTesterManualUatExecutionReport() {
  const report = buildTesterManualUatExecutionReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        Operations · V20.4
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-950">
        First Manual UAT Execution Report
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Triage issue e decisione continue/fix/expand pool per il primo UAT manuale.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Execution</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.executionScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Triage</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.triageScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Safety</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.safetyScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">AI provider</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerCalled ? "YES" : "NO"}
          </p>
        </div>
      </div>
    </section>
  );
}
