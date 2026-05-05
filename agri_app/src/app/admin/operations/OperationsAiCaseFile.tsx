export default function OperationsAiCaseFile() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-file-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Diagnosis Case File
        </p>
        <h2 className="text-xl font-semibold">Case file diagnostico e audit trail</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V7.1 crea il fascicolo dry-run esportabile della diagnosi: fingerprint, audit trail,
          report, JSON e blocco operativo. Nessuna persistenza DB, nessuna chiamata AI live e
          revisione umana obbligatoria.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-diagnosis-case-file-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Export</p>
          <p className="mt-1 font-semibold">reportText + JSON</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Audit</p>
          <p className="mt-1 font-semibold">auditTrail</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Safety</p>
          <p className="mt-1 font-semibold">allowedToExecute=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-case-file-check</code>
        </pre>
      </div>
    </section>
  );
}
