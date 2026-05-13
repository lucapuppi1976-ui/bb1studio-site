import { buildAiStorageRehearsalBoardReport } from "@/lib/ai/aiStorageRehearsalBoard";

export default function OperationsAiStorageRehearsalBoard() {
  const report = buildAiStorageRehearsalBoardReport({
    blueprintItemCount: 7,
    rehearsalItemCount: 8,
    restoreValidationItemCount: 7,
    retentionControlItemCount: 7,
    auditReplayItemCount: 6,
    migrationLockItemCount: 6,
    openStorageBoardGapCount: 8,
    onlineReadinessScore: 82,
    migrationRehearsalScore: 70,
    providerActivationGateScore: 72,
    humanReviewWorkflowScore: 72,
    manualConversionScore: 68,
    restoreValidationScore: 64,
    retentionControlScore: 64,
    storageLeadRole: "operations storage rehearsal board reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V15.8
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Storage Rehearsal Board
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per storage blueprint, staging rehearsal, restore validation,
            retention control, audit replay, live migration lock e storage safety board.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-storage-rehearsal-board-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.storageBoardStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.storageBoardScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Storage</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.storageActivationAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Live migration</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.liveMigrationExecutionAllowed ? "YES" : "LOCKED"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Findings</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.storageBoardFindings.length}</p>
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
            <li>Storage activation allowed: {report.readiness.storageActivationAllowed ? "yes" : "no"}</li>
            <li>Storage activation performed: {report.readiness.storageActivationPerformed ? "yes" : "no"}</li>
            <li>Live migration allowed: {report.readiness.liveMigrationExecutionAllowed ? "yes" : "no"}</li>
            <li>Live migration performed: {report.readiness.liveMigrationExecutionPerformed ? "yes" : "no"}</li>
            <li>Schema write allowed: {report.readiness.schemaWriteAllowed ? "yes" : "no"}</li>
            <li>Schema write performed: {report.readiness.schemaWritePerformed ? "yes" : "no"}</li>
            <li>Case persistence allowed: {report.readiness.casePersistenceActivationAllowed ? "yes" : "no"}</li>
            <li>Review persistence allowed: {report.readiness.reviewPersistenceAllowed ? "yes" : "no"}</li>
            <li>Manual conversion allowed: {report.readiness.manualConversionAllowed ? "yes" : "no"}</li>
            <li>Task created: {report.readiness.taskCreated ? "yes" : "no"}</li>
            <li>Intervention created: {report.readiness.interventionCreated ? "yes" : "no"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
