import { buildAiIncidentRecordPersistenceGovernanceReport } from "@/lib/ai/aiIncidentRecordPersistenceGovernance";

export default function OperationsAiIncidentRecordPersistenceGovernance() {
  const report = buildAiIncidentRecordPersistenceGovernanceReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V18.1
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Incident Record Persistence Governance
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Monitor dry-run per approval evidence, persistence boundary, evidence vault,
            rollback readiness e no-go board. Nessuna persistenza reale.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-incident-record-persistence-governance-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.persistenceGovernanceStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.persistenceGovernanceScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Persistence</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.incidentRecordPersistenceAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Provider</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerCalled ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Execution</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.operationalExecutionAllowed ? "YES" : "NO"}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Persistence locks
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>Incident persistence allowed: {report.readiness.incidentRecordPersistenceAllowed ? "yes" : "no"}</li>
          <li>Incident record write allowed: {report.readiness.incidentRecordWriteAllowed ? "yes" : "no"}</li>
          <li>Timeline write allowed: {report.readiness.incidentTimelineWriteAllowed ? "yes" : "no"}</li>
          <li>Audit write allowed: {report.readiness.incidentAuditWriteAllowed ? "yes" : "no"}</li>
          <li>Review persistence allowed: {report.readiness.reviewPersistenceAllowed ? "yes" : "no"}</li>
          <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
          <li>Public export write: {report.readiness.publicExportArtifactWriteAllowed ? "yes" : "no"}</li>
          <li>Operational execution: {report.readiness.operationalExecutionAllowed ? "yes" : "no"}</li>
          <li>Human review: {report.readiness.humanReviewRequired ? "required" : "not required"}</li>
        </ul>
      </div>
    </section>
  );
}
