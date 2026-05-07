export default function OperationsAiCaseMemoryRetrieval() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-memory-retrieval-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Case Memory Retrieval & Similar Case Advisor
        </p>
        <h2 className="text-xl font-semibold">Case Memory Retrieval premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V9.6 aggiunge recupero intelligente da memoria locale: casi simili,
          insight riutilizzabili, transfer learning candidate, gap bridge plan e briefing.
          Dry-run only, nessuna persistenza DB.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-case-memory-retrieval-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Retrieval</p>
          <p className="mt-1 font-semibold">caseMemoryRetrievalReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Similar cases</p>
          <p className="mt-1 font-semibold">similarityMatchesReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Persistenza</p>
          <p className="mt-1 font-semibold">persistenceReady=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-case-memory-retrieval-check</code>
        </pre>
      </div>
    </section>
  );
}
