import { buildAiLiveUatLaunchGateReport } from "@/lib/ai/aiLiveUatLaunchGate";

export default function OperationsAiLiveUatLaunchGate() {
  const report = buildAiLiveUatLaunchGateReport();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V18.9
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Live UAT Launch Gate
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Gate operativo dry-run per readiness tester, access gate, multilingual gate,
            UX gate, feedback board gate, protected route gate e rollback gate.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-live-uat-launch-gate-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.launchReadinessStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.launchReadinessScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Invite send</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.testerInviteSendAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Account write</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.accountWriteAllowed ? "YES" : "NO"}
          </p>
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
          Launch locks
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>Invite send allowed: {report.readiness.testerInviteSendAllowed ? "yes" : "no"}</li>
          <li>Account write allowed: {report.readiness.accountWriteAllowed ? "yes" : "no"}</li>
          <li>Feedback write allowed: {report.readiness.feedbackWriteAllowed ? "yes" : "no"}</li>
          <li>Evidence write allowed: {report.readiness.evidenceWriteAllowed ? "yes" : "no"}</li>
          <li>Provider called: {report.readiness.providerCalled ? "yes" : "no"}</li>
          <li>AI persistence performed: {report.readiness.persistencePerformed ? "yes" : "no"}</li>
          <li>Execution allowed: {report.readiness.operationalExecutionAllowed ? "yes" : "no"}</li>
          <li>Public export write: {report.readiness.publicExportArtifactWriteAllowed ? "yes" : "no"}</li>
          <li>Human review: {report.readiness.humanReviewRequired ? "required" : "not required"}</li>
        </ul>
      </div>
    </section>
  );
}
