import { buildAiControlledProductionBetaGateReport } from "@/lib/ai/aiControlledProductionBetaGate";

export default function OperationsAiControlledProductionBetaGate() {
  const report = buildAiControlledProductionBetaGateReport({
    cutoverItemCount: 8,
    providerLockItemCount: 8,
    storageLockItemCount: 8,
    reviewLockItemCount: 7,
    conversionLockItemCount: 7,
    observabilityItemCount: 8,
    rollbackItemCount: 8,
    openLaunchGapCount: 10,
    onlineReadinessScore: 84,
    betaReadinessScore: 70,
    providerGateScore: 70,
    storageBoardScore: 68,
    reviewWorkflowScore: 72,
    conversionGateScore: 68,
    observabilityScore: 64,
    rollbackScore: 66,
    launchLeadRole: "operations controlled production beta launch reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V16.0
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Controlled Production Beta Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per launch cutover, runtime locks, observability tower, rollback tower
            e zero-activation go/no-go. Nessuna attivazione beta reale.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-controlled-production-beta-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.launchGateStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.launchGateScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Beta</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.productionBetaAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Zero activation</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.zeroActivationMode ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.launchBoardFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Launch board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.launchBoardPack.map((item) => (
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
            <li>Production beta allowed: {report.readiness.productionBetaAllowed ? "yes" : "no"}</li>
            <li>Production beta performed: {report.readiness.productionBetaPerformed ? "yes" : "no"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Provider call allowed: {report.readiness.providerCallAllowed ? "yes" : "no"}</li>
            <li>Production runtime: {report.readiness.productionRuntimeAllowed ? "yes" : "locked"}</li>
            <li>Storage activation: {report.readiness.storageActivationAllowed ? "yes" : "no"}</li>
            <li>Review persistence: {report.readiness.reviewPersistenceAllowed ? "yes" : "no"}</li>
            <li>Manual conversion: {report.readiness.manualConversionAllowed ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "allowed" : "locked"}</li>
            <li>Dosage advice: {report.readiness.dosageAdviceAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
