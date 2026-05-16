import { buildAiOperationalExecutionUatReadinessReport } from "@/lib/ai/aiOperationalExecutionUatReadiness";

export default function OperationsAiOperationalExecutionUatReadiness() {
  const report = buildAiOperationalExecutionUatReadinessReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V18.3
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Operational Execution UAT Readiness
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Board operativo dry-run per human approval proof, emergency stop proof,
            command boundary, scenari execution simulati e rollback decision.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-operational-execution-uat-readiness-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.executionUatStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.executionUatScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Execution</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.operationalExecutionAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Command</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.executionCommandAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Provider</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerCalled ? "YES" : "NO"}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Execution locks
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>Execution allowed: {report.readiness.operationalExecutionAllowed ? "yes" : "no"}</li>
          <li>Command allowed: {report.readiness.executionCommandAllowed ? "yes" : "no"}</li>
          <li>Preflight allowed: {report.readiness.executionPreflightAllowed ? "yes" : "no"}</li>
          <li>Notification allowed: {report.readiness.executionNotificationAllowed ? "yes" : "no"}</li>
          <li>Emergency stop configured: {report.readiness.emergencyStopConfigured ? "yes" : "no"}</li>
          <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
          <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
          <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
          <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "yes" : "no"}</li>
          <li>Dosage advice: {report.readiness.dosageAdviceAllowed ? "yes" : "no"}</li>
          <li>Human review: {report.readiness.humanReviewRequired ? "required" : "not required"}</li>
        </ul>
      </div>
    </section>
  );
}
