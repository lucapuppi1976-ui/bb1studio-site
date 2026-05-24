import { buildTesterSecondTesterManualUatScenarioPackReport } from "@/lib/ops/testerSecondTesterManualUatScenarioPack";

export default function OperationsTesterSecondTesterManualUatScenarioPack() {
  const report = buildTesterSecondTesterManualUatScenarioPackReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
        Operations · V21.2
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-950">
        Second Tester Manual UAT Scenario Pack
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Checklist scenario/evidenze per secondo tester. Read-only, manual evidence only, no AI live, no execution.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Access</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.accessScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Account write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.accountWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">AI provider</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerCalled ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Evidence write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.evidencePersistenceAllowed ? "YES" : "NO"}
          </p>
        </div>
      </div>
    </section>
  );
}
