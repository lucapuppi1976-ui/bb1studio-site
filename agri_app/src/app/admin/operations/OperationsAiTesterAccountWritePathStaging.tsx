import { buildAiTesterAccountWritePathStagingReport } from "@/lib/ai/aiTesterAccountWritePathStaging";

export default function OperationsAiTesterAccountWritePathStaging() {
  const report = buildAiTesterAccountWritePathStagingReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V19.5
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Tester Account Write Path Staging
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Adapter admin disattivato per default, request preview, rollback plan e no-go board.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-tester-account-write-path-staging-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.stagingStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.stagingScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Account write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.accountWriteAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Invite send</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.testerInviteSendAllowed ? "YES" : "NO"}
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
