import { buildAiOnlineLiveUatTestMatrixReport } from "@/lib/ai/aiOnlineLiveUatTestMatrix";

export default function OperationsAiOnlineLiveUatTestMatrix() {
  const report = buildAiOnlineLiveUatTestMatrixReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V18.2
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Online Live UAT Test Matrix
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Board operativo per testing live controllato: matrice test, evidenze,
            route coverage, endpoint protetti, bug triage e rollback decision.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-online-live-uat-test-matrix-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.liveUatStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.liveUatScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Test cases</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.context.testCaseCount}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Critical bugs</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.context.openCriticalBugCount}</p>
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
          Live UAT locks
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>Provider AI ready: {report.readiness.providerAiReady ? "yes" : "no"}</li>
          <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
          <li>Persistence performed: {report.readiness.persistencePerformed ? "yes" : "no"}</li>
          <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
          <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
          <li>Operational execution: {report.readiness.operationalExecutionAllowed ? "yes" : "no"}</li>
          <li>Incident persistence: {report.readiness.incidentRecordPersistenceAllowed ? "yes" : "no"}</li>
          <li>Public export write: {report.readiness.publicExportArtifactWriteAllowed ? "yes" : "no"}</li>
          <li>Human review: {report.readiness.humanReviewRequired ? "required" : "not required"}</li>
        </ul>
      </div>
    </section>
  );
}
