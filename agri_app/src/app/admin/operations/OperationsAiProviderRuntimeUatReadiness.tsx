import { buildAiProviderRuntimeUatReadinessReport } from "@/lib/ai/aiProviderRuntimeUatReadiness";

export default function OperationsAiProviderRuntimeUatReadiness() {
  const report = buildAiProviderRuntimeUatReadinessReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V18.4
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Provider Runtime UAT Readiness
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Board operativo dry-run per explicit provider approval proof, request boundary,
            response boundary, rollback proof e provider no-go.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-provider-runtime-uat-readiness-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.providerUatStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.providerUatScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Provider call</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerCalled ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Request dispatch</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerRequestDispatchAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Result write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerResultPersistenceAllowed ? "YES" : "NO"}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Provider runtime locks
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>Provider AI ready: {report.readiness.providerAiReady ? "yes" : "no"}</li>
          <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
          <li>Provider approval allowed: {report.readiness.explicitProviderApprovalAllowed ? "yes" : "no"}</li>
          <li>Request dispatch allowed: {report.readiness.providerRequestDispatchAllowed ? "yes" : "no"}</li>
          <li>Response intake allowed: {report.readiness.providerResponseIntakeAllowed ? "yes" : "no"}</li>
          <li>Result persistence allowed: {report.readiness.providerResultPersistenceAllowed ? "yes" : "no"}</li>
          <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
          <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
          <li>Operational execution: {report.readiness.operationalExecutionAllowed ? "yes" : "no"}</li>
          <li>Human review: {report.readiness.humanReviewRequired ? "required" : "not required"}</li>
        </ul>
      </div>
    </section>
  );
}
