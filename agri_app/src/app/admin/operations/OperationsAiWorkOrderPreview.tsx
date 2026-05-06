export default function OperationsAiWorkOrderPreview() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-work-order-preview-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Work Order Preview
        </p>
        <h2 className="text-xl font-semibold">Execution-safe package</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V7.7 aggiunge una preview operativa con task draft, intervention draft, vincoli di
          esecuzione e blocchi espliciti contro automazioni non autorizzate.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-work-order-preview-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Tasks</p>
          <p className="mt-1 font-semibold">draft only</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Interventions</p>
          <p className="mt-1 font-semibold">draft only</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Execution</p>
          <p className="mt-1 font-semibold">allowedToExecute=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-work-order-preview-check</code>
        </pre>
      </div>
    </section>
  );
}
