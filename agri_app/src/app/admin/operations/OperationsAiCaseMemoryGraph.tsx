export default function OperationsAiCaseMemoryGraph() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-memory-graph-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Agronomic Case Memory & Pattern Graph
        </p>
        <h2 className="text-xl font-semibold">Case Memory Graph premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V9.5 aggiunge memoria agronomica locale: grafo casi, sintomi, evidenze,
          fingerprint, cluster simili, ricorrenze, knowledge gap e raccomandazioni manuali.
          Dry-run only, nessuna persistenza DB.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-case-memory-graph-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Memory</p>
          <p className="mt-1 font-semibold">caseMemoryReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Graph</p>
          <p className="mt-1 font-semibold">graphNodesReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Persistenza</p>
          <p className="mt-1 font-semibold">persistenceReady=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-case-memory-graph-check</code>
        </pre>
      </div>
    </section>
  );
}
