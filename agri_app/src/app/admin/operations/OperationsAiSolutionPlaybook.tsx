export default function OperationsAiSolutionPlaybook() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-solution-playbook-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Solution Playbook
        </p>
        <h2 className="text-xl font-semibold">Soluzioni sicure e non prescrittive</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V7.4 trasforma la matrice differenziale in opzioni di soluzione: raccolta evidenze,
          monitoraggio, misure conservative e revisione professionale. Nessun prodotto, nessuna
          dose, nessuna persistenza e nessuna azione automatica.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-solution-playbook-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Safety</p>
          <p className="mt-1 font-semibold">allowedToExecute=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Prescrizioni</p>
          <p className="mt-1 font-semibold">productPrescriptionAllowed=false</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Review</p>
          <p className="mt-1 font-semibold">humanReviewRequired=true</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-solution-playbook-check</code>
        </pre>
      </div>
    </section>
  );
}
