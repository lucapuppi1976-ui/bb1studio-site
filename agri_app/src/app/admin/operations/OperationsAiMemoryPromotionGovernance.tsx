export default function OperationsAiMemoryPromotionGovernance() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-memory-promotion-governance-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Memory Promotion Governance & Versioned Knowledge Draft
        </p>
        <h2 className="text-xl font-semibold">Memory Promotion Governance premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V9.8 aggiunge governance di promozione memoria: promotion queue,
          patch draft, decision board, snapshot versione, rollback plan e audit trail.
          Dry-run only, nessuna memoria persistente DB.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-memory-promotion-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Governance</p>
          <p className="mt-1 font-semibold">memoryPromotionGovernanceReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Snapshot</p>
          <p className="mt-1 font-semibold">versionedMemorySnapshotDraftReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Persistenza</p>
          <p className="mt-1 font-semibold">memoryPersistenceReady=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-memory-promotion-check</code>
        </pre>
      </div>
    </section>
  );
}
