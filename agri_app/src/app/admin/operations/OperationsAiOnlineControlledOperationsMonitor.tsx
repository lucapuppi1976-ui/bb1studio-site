import { buildAiOnlineControlledOperationsMonitorReport } from "@/lib/ai/aiOnlineControlledOperationsMonitor";

export default function OperationsAiOnlineControlledOperationsMonitor() {
  const report = buildAiOnlineControlledOperationsMonitorReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V18.0
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Online Controlled Operations Monitor
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Watchtower post go-live per produzione controllata dry-run, endpoint protetti,
            checklist giornaliera, rollback readiness e osservabilità guardrail AI.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-online-controlled-operations-monitor-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.onlineControlledStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.onlineControlledScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Online</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.onlineControlledGo ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">AI live</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerAiReady ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.onlineControlledFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Activation locks
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>Online controlled GO: {report.readiness.onlineControlledGo ? "yes" : "no"}</li>
          <li>Provider AI ready: {report.readiness.providerAiReady ? "yes" : "no"}</li>
          <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
          <li>AI persistence performed: {report.readiness.persistencePerformed ? "yes" : "no"}</li>
          <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
          <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
          <li>Operational execution allowed: {report.readiness.operationalExecutionAllowed ? "yes" : "no"}</li>
          <li>Execution command allowed: {report.readiness.executionCommandAllowed ? "yes" : "no"}</li>
          <li>Public export artifact write: {report.readiness.publicExportArtifactWriteAllowed ? "yes" : "no"}</li>
          <li>Incident record write: {report.readiness.incidentRecordWriteAllowed ? "yes" : "no"}</li>
          <li>Human review: {report.readiness.humanReviewRequired ? "required" : "not required"}</li>
        </ul>
      </div>
    </section>
  );
}
