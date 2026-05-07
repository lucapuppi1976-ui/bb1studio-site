export default function OperationsAiMemoryQualityGuard() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-memory-quality-guard-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Agronomic Memory Quality Guard & Drift Control
        </p>
        <h2 className="text-xl font-semibold">Memory Quality Guard premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V9.9 aggiunge controllo qualità della memoria agronomica: matrice evidenza,
          conflict cluster, stale insight, bias/drift, quarantena e piano miglioramento.
          Dry-run only, nessuna scrittura memoria.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-memory-quality-guard-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Quality</p>
          <p className="mt-1 font-semibold">memoryQualityGuardReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Drift</p>
          <p className="mt-1 font-semibold">biasDriftGuardReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Persistenza</p>
          <p className="mt-1 font-semibold">memoryQualityWriteAllowed=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-memory-quality-guard-check</code>
        </pre>
      </div>
    </section>
  );
}
