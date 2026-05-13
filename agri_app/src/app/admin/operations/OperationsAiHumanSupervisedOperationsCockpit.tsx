import { buildAiHumanSupervisedOperationsCockpitReport } from "@/lib/ai/aiHumanSupervisedOperationsCockpit";

export default function OperationsAiHumanSupervisedOperationsCockpit() {
  const report = buildAiHumanSupervisedOperationsCockpitReport({
    operatorBoardItemCount: 8,
    manualDispatchItemCount: 8,
    reviewerQueueItemCount: 7,
    escalationPathItemCount: 7,
    safetyBoundaryItemCount: 7,
    operationalEvidenceItemCount: 7,
    openOperationsGapCount: 8,
    onlineReadinessScore: 84,
    auditPackageScore: 70,
    hardeningScore: 70,
    reviewerReadinessScore: 70,
    dispatchDesignScore: 64,
    escalationScore: 66,
    safetyBoundaryScore: 68,
    operationsLeadRole: "operations human supervised cockpit reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V16.3
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Human-Supervised Operations Cockpit
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per operator board, manual dispatch readiness, reviewer queue,
            escalation path, safety boundary e operational evidence pack. Nessuna attivazione runtime.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-human-supervised-operations-cockpit-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.cockpitStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.cockpitScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Dispatch</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.manualConversionAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Runtime</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.productionRuntimeAllowed ? "YES" : "LOCKED"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.cockpitFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Cockpit board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.cockpitBoardPack.map((item) => (
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
            <li>Human cockpit ready: {report.readiness.humanSupervisedCockpitReady ? "yes" : "no"}</li>
            <li>Manual dispatch design ready: {report.readiness.manualDispatchReadinessReady ? "yes" : "no"}</li>
            <li>Manual conversion allowed: {report.readiness.manualConversionAllowed ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Production runtime: {report.readiness.productionRuntimeAllowed ? "yes" : "locked"}</li>
            <li>Storage activation: {report.readiness.storageActivationAllowed ? "yes" : "no"}</li>
            <li>Review persistence: {report.readiness.reviewPersistenceAllowed ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "allowed" : "locked"}</li>
            <li>Dosage advice: {report.readiness.dosageAdviceAllowed ? "allowed" : "locked"}</li>
            <li>Public share: {report.readiness.publicShareAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
