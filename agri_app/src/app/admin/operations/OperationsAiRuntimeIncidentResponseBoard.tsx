import { buildAiRuntimeIncidentResponseBoardReport } from "@/lib/ai/aiRuntimeIncidentResponseBoard";

export default function OperationsAiRuntimeIncidentResponseBoard() {
  const report = buildAiRuntimeIncidentResponseBoardReport({
    incidentIntakeItemCount: 8,
    providerFailureItemCount: 8,
    responseRoutingItemCount: 7,
    rollbackActionItemCount: 7,
    operatorCommunicationItemCount: 7,
    anomalyReplayItemCount: 7,
    openIncidentGapCount: 9,
    onlineReadinessScore: 84,
    providerRuntimeBetaScore: 70,
    operationsCockpitScore: 70,
    hardeningScore: 70,
    reviewerReadinessScore: 68,
    rollbackScore: 66,
    incidentSignalScore: 64,
    incidentLeadRole: "operations runtime incident response reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V16.5
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Runtime Incident Response Board
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per incident intake, provider failure drill, response routing,
            rollback action cards, operator communication e anomaly replay. Nessun incident runtime reale.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-runtime-incident-response-board-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.incidentBoardStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.incidentBoardScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Response</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.incidentResponseAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Provider called</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.providerCalled ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.incidentFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Incident board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.incidentBoardPack.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.lane} · {item.packReady ? "ready" : "review"} · {item.readinessScore}/100
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">
                  {item.reviewerCheck}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Operational locks
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Incident response ready: {report.readiness.runtimeIncidentResponseReady ? "yes" : "no"}</li>
            <li>Incident response allowed: {report.readiness.incidentResponseAllowed ? "yes" : "no"}</li>
            <li>Incident response performed: {report.readiness.incidentResponsePerformed ? "yes" : "no"}</li>
            <li>Provider failure drill allowed: {report.readiness.providerFailureDrillAllowed ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Provider call allowed: {report.readiness.providerCallAllowed ? "yes" : "no"}</li>
            <li>Incident write allowed: {report.readiness.runtimeIncidentWriteAllowed ? "yes" : "no"}</li>
            <li>Incident notification allowed: {report.readiness.incidentNotificationAllowed ? "yes" : "no"}</li>
            <li>Storage activation: {report.readiness.storageActivationAllowed ? "yes" : "no"}</li>
            <li>Review persistence: {report.readiness.reviewPersistenceAllowed ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
