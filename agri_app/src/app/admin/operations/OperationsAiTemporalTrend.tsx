export default function OperationsAiTemporalTrend() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-temporal-trend-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Temporal Field Trend Intelligence
        </p>
        <h2 className="text-xl font-semibold">Trend temporale del caso foto</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V8.4 aggiunge timeline multi-osservazione, change vector, severity trend,
          follow-up schedule ed escalation rules. Nessuna chiamata provider AI live.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-temporal-trend-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Core premium</p>
          <p className="mt-1 font-semibold">temporalComparisonReady=true</p>
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
          <code>npm run ops:ai-temporal-trend-check</code>
        </pre>
      </div>
    </section>
  );
}
