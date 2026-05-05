export default function OperationsAiProviderRequestPreview() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-provider-request-preview-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Provider Request Preview
        </p>
        <h2 className="text-xl font-semibold">Request preview per futuro provider AI</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V6.8 genera un payload provider-ready con prompt, schema JSON e vincoli operativi. È un
          dry-run protetto: nessuna chiamata AI live, nessuna persistenza e revisione umana obbligatoria.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-provider-request-preview</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Provider call</p>
          <p className="mt-1 font-semibold">externalProviderCalled=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Client provider call</p>
          <p className="mt-1 font-semibold">clientProviderCallsAllowed=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Review</p>
          <p className="mt-1 font-semibold">humanReviewRequired=true</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-provider-request-check</code>
        </pre>
      </div>
    </section>
  );
}
