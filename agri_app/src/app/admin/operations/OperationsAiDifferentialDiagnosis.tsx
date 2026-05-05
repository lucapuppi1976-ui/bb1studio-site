export default function OperationsAiDifferentialDiagnosis() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-differential-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Differential Diagnosis Matrix
        </p>
        <h2 className="text-xl font-semibold">Diagnosi differenziale spiegabile</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V7.3 ordina ipotesi diagnostiche locali partendo dalla mappa sintomi: evidenze a favore,
          evidenze contro, evidenze mancanti, score, risk band e prossime evidenze da raccogliere.
          Nessuna chiamata provider, nessuna persistenza e nessuna azione automatica.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-differential-diagnosis-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Output</p>
          <p className="mt-1 font-semibold">matrixFingerprint</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Explainability</p>
          <p className="mt-1 font-semibold">evidenceFor / against / missing</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Safety</p>
          <p className="mt-1 font-semibold">humanReviewRequired=true</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-differential-diagnosis-check</code>
        </pre>
      </div>
    </section>
  );
}
