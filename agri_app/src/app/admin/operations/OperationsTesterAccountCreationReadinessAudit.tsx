import { buildTesterAccountCreationReadinessAuditReport } from "@/lib/ops/testerAccountCreationReadinessAudit";

export default function OperationsTesterAccountCreationReadinessAudit() {
  const report = buildTesterAccountCreationReadinessAuditReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V19.7
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Final Tester Account Creation Readiness Audit
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Decisione GO / GO_WITH_LIMITATIONS / NO_GO prima del primo write pilot tester.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/tester-account-creation-readiness-audit-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Decision</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.decision}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.readinessScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Role field</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.context.roleFieldDetected ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Language field</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.context.languageFieldDetected ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Migration</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.migrationExecutionAllowed ? "YES" : "NO"}
          </p>
        </div>
      </div>
    </section>
  );
}
