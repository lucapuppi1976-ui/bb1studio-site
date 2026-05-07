import { buildAiKnowledgeVaultGovernanceReport } from "@/lib/ai/aiKnowledgeVaultGovernance";

export default function OperationsAiKnowledgeVaultGovernance() {
  const report = buildAiKnowledgeVaultGovernanceReport({
    cropFamily: "tomato",
    caseType: "canopy stress disease pressure",
    fieldEvidenceLevel: "moderate",
    reviewerRole: "operations agronomist",
  });

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Operations · V10.0
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            AI Agronomic Knowledge Vault Governance
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Pannello operativo per controllare snapshot vault, playbook expert, conflitti,
            approval queue e stato dry-run dell’endpoint protetto.
          </p>
        </div>

        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-sm text-white">
          <p className="font-semibold">Endpoint protetto</p>
          <p className="mt-1 text-xs text-slate-300">/api/ops/ai-knowledge-vault-dry-run</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Vault</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.snapshot.vaultVersion}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Playbook</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.snapshot.totalPlaybooks}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocked</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.snapshot.blockedPlaybooks}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Conflicts</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{report.snapshot.highSeverityConflicts}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Write</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">
            {report.snapshot.snapshotWritePerformed ? "ON" : "OFF"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Governance queue
          </h3>

          <div className="mt-3 space-y-3">
            {report.approvalQueue.map((item) => (
              <div key={`${item.playbookId}-${item.nextStage}`} className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.playbookId} · {item.nextStage} · {item.requiredReviewer}
                </p>
                <p className="mt-2 text-xs text-slate-600">{item.reason}</p>
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
            <li>Persistence: {report.readiness.persistenceReady ? "ready" : "locked"}</li>
            <li>Memory write: {report.readiness.memoryPersistenceAllowed ? "allowed" : "locked"}</li>
            <li>Automatic execution: {report.readiness.automaticExecutionAllowed ? "allowed" : "locked"}</li>
            <li>Product prescription: {report.readiness.productPrescriptionAllowed ? "allowed" : "locked"}</li>
            <li>Dosage advice: {report.readiness.dosageAdviceAllowed ? "allowed" : "locked"}</li>
          </ul>

          <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-slate-700">
            Rollback plan
          </h3>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {report.rollbackPlan.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
