import { buildAiPersistentHumanReviewWorkflowReport } from "@/lib/ai/aiPersistentHumanReviewWorkflow";

export default function OperationsAiPersistentHumanReviewWorkflow() {
  const report = buildAiPersistentHumanReviewWorkflowReport({
    reviewStateCount: 7,
    reviewerOwnershipItemCount: 7,
    reasonRequirementItemCount: 6,
    auditTrailItemCount: 7,
    conversionGateItemCount: 7,
    correctionPathItemCount: 6,
    openReviewGapCount: 9,
    onlineReadinessScore: 78,
    providerGatewayScore: 68,
    storageBlueprintScore: 66,
    reviewMaturityScore: 74,
    reviewerAccountabilityScore: 68,
    manualGateDesignScore: 60,
    correctionReadinessScore: 58,
    reviewLeadRole: "operations AI human review workflow reviewer",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V15.3
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Persistent Human Review Workflow
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per review state machine, reviewer ownership, reason requirement,
            audit trail design, manual conversion gate, correction path e go/no-go. Nessuna persistenza review attiva.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">
            /api/ops/ai-persistent-human-review-workflow-dry-run
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-2 text-xl font-bold text-slate-950">{report.reviewWorkflowStatus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Score</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.reviewWorkflowScore}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Persistence</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.reviewPersistenceAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Conversion</p>
          <p className="mt-2 text-xl font-bold text-slate-950">
            {report.readiness.manualConversionAllowed ? "YES" : "NO"}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Risks</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.reviewRiskRegister.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Review board pack
          </h3>
          <div className="mt-3 space-y-3">
            {report.reviewBoardPack.map((item) => (
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
            <li>Case persistence allowed: {report.readiness.casePersistenceActivationAllowed ? "yes" : "no"}</li>
            <li>Case persistence performed: {report.readiness.casePersistencePerformed ? "yes" : "no"}</li>
            <li>Review persistence allowed: {report.readiness.reviewPersistenceAllowed ? "yes" : "no"}</li>
            <li>Review persistence performed: {report.readiness.reviewPersistencePerformed ? "yes" : "no"}</li>
            <li>Manual conversion allowed: {report.readiness.manualConversionAllowed ? "yes" : "no"}</li>
            <li>Manual conversion performed: {report.readiness.manualConversionPerformed ? "yes" : "no"}</li>
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
