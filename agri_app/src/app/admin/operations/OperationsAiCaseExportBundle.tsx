export default function OperationsAiCaseExportBundle() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-export-bundle-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Case Export Bundle
        </p>
        <h2 className="text-xl font-semibold">Case export bundle</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V8.0 consolida la pipeline AI in un bundle esportabile, redatto e tracciato tramite
          fingerprint, senza persistenza DB e senza automazioni.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-case-export-bundle-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Bundle mode</p>
          <p className="mt-1 font-semibold">dry-run only</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Public share</p>
          <p className="mt-1 font-semibold">publicShareAllowed=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">DB persistence</p>
          <p className="mt-1 font-semibold">dbPersistenceAllowed=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-case-export-bundle-check</code>
        </pre>
      </div>
    </section>
  );
}
