export default function OperationsAiDecisionDossier() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-decision-dossier-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Decision Dossier
        </p>
        <h2 className="text-xl font-semibold">Approval pack e decision gates</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V7.6 aggiunge un pacchetto decisionale locale con gate di approvazione, work package,
          blocchi esecutivi e sign-off umano obbligatorio.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-decision-dossier-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Decision gates</p>
          <p className="mt-1 font-semibold">enabled locally</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Execution</p>
          <p className="mt-1 font-semibold">allowedToExecute=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Review</p>
          <p className="mt-1 font-semibold">humanReviewRequired=true</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-decision-dossier-check</code>
        </pre>
      </div>
    </section>
  );
}
