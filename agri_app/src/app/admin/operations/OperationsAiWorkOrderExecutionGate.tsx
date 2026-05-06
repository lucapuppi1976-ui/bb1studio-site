export default function OperationsAiWorkOrderExecutionGate() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-work-order-execution-gate-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Work Order Execution Gate
        </p>
        <h2 className="text-xl font-semibold">Manual conversion gate</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V7.8 introduce un gate finale: approvazione umana, evidenze confermate, safety sign-off,
          blocco prodotto/dosaggio e nessuna automazione.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-work-order-execution-gate-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Manual conversion</p>
          <p className="mt-1 font-semibold">gated only</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Automation</p>
          <p className="mt-1 font-semibold">automaticExecutionAllowed=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Safety</p>
          <p className="mt-1 font-semibold">humanReviewRequired=true</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-work-order-execution-gate-check</code>
        </pre>
      </div>
    </section>
  );
}
