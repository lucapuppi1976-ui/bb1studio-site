export default function OperationsAiFieldIntelligence() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-field-intelligence-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Multi-Photo Field Intelligence
        </p>
        <h2 className="text-xl font-semibold">Field intelligence multi-foto</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V8.3 introduce correlazione multi-foto, evidence matrix, severity map, risk forecast e
          protocollo foto successive. Nessuna chiamata provider AI live.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-field-intelligence-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Core premium</p>
          <p className="mt-1 font-semibold">multiPhotoCorrelation=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Provider AI</p>
          <p className="mt-1 font-semibold">providerAiReady=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Human review</p>
          <p className="mt-1 font-semibold">humanReviewRequired=true</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-field-intelligence-check</code>
        </pre>
      </div>
    </section>
  );
}
