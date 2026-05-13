import { buildAiPostBetaObservabilityRollbackReport } from "@/lib/ai/aiPostBetaObservabilityRollback";

export default function OperationsAiPostBetaObservabilityRollback() {
  const report = buildAiPostBetaObservabilityRollbackReport({
    incidentSignalItemCount: 8,
    rollbackTowerItemCount: 8,
    killSwitchItemCount: 7,
    reviewerAuditItemCount: 7,
    anomalyBoardItemCount: 7,
    fallbackRouteItemCount: 7,
    openHardeningGapCount: 9,
    onlineReadinessScore: 84,
    launchGateScore: 70,
    betaReadinessScore: 70,
    observabilityScore: 64,
    rollbackScore: 66,
    reviewerAuditScore: 68,
    fallbackScore: 66,
    hardeningLeadRole: "operations post beta hardening reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V16.1
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Post-Beta Observability & Rollback
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per incident signals, rollback tower, kill-switch drill,
            reviewer audit, anomaly board e fallback routes. Runtime reale ancora bloccato.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-post-beta-observability-rollback-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.hardeningStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.hardeningScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Runtime</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.productionRuntimeAllowed ? "YES" : "LOCKED"}
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
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.hardeningFindings.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Hardening board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.hardeningBoardPack.map((item) => (
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
            <li>Provider AI: {report.readiness.providerAiReady ? "ready" : "locked"}</li>
            <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
            <li>Production runtime: {report.readiness.productionRuntimeAllowed ? "yes" : "locked"}</li>
            <li>Controlled beta: {report.readiness.controlledBetaAllowed ? "yes" : "no"}</li>
            <li>Production beta: {report.readiness.productionBetaAllowed ? "yes" : "no"}</li>
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
