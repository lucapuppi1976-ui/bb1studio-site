import { buildAiCasePersistenceMigrationPlanReport } from "@/lib/ai/aiCasePersistenceMigrationPlan";

export default function OperationsAiCasePersistenceMigrationPlan() {
  const report = buildAiCasePersistenceMigrationPlanReport({
    entityBlueprintItemCount: 8,
    migrationStepCount: 9,
    backupRestoreItemCount: 7,
    photoRetentionItemCount: 7,
    auditChainItemCount: 7,
    reviewRecordItemCount: 7,
    openStorageGapCount: 10,
    onlineReadinessScore: 78,
    providerGatewayScore: 68,
    releaseControlScore: 88,
    reviewMaturityScore: 76,
    privacyReadinessScore: 64,
    storageBlueprintScore: 62,
    rehearsalReadinessScore: 56,
    storageLeadRole: "operations AI case storage readiness reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V15.2
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Case Persistence Migration Plan
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per entity blueprint, migration plan, backup/restore,
            photo retention, audit chain, review records e storage gates. Nessuna migration o storage AI attiva.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-case-persistence-migration-plan-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.storageReadinessStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.storageReadinessScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Storage</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.casePersistenceActivationAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Migration</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.migrationExecutionAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Risks</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.storageRiskRegister.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Storage board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.storageBoardPack.map((item) => (
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
            <li>Persistence: {report.readiness.persistenceReady ? "ready" : "locked"}</li>
            <li>Case persistence allowed: {report.readiness.casePersistenceActivationAllowed ? "yes" : "no"}</li>
            <li>Case persistence performed: {report.readiness.casePersistencePerformed ? "yes" : "no"}</li>
            <li>Migration execution allowed: {report.readiness.migrationExecutionAllowed ? "yes" : "no"}</li>
            <li>Migration execution performed: {report.readiness.migrationExecutionPerformed ? "yes" : "no"}</li>
            <li>Schema write allowed: {report.readiness.schemaWriteAllowed ? "yes" : "no"}</li>
            <li>Schema write performed: {report.readiness.schemaWritePerformed ? "yes" : "no"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "allowed" : "locked"}</li>
            <li>Dosage advice: {report.readiness.dosageAdviceAllowed ? "allowed" : "locked"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
