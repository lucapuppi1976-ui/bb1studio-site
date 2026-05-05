export default function OperationsAiCaseReport() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-case-report-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Case Report Builder
        </p>
        <h2 className="text-xl font-semibold">Report esportabile e audit trail</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V7.5 consolida intake, diagnosi differenziale, playbook soluzioni, audit trail e
          guardrail in un report operativo esportabile. Il report resta dry-run e richiede
          revisione umana.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-case-report-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Export</p>
          <p className="mt-1 font-semibold">textReportReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">JSON</p>
          <p className="mt-1 font-semibold">jsonReportReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Review</p>
          <p className="mt-1 font-semibold">humanReviewRequired=true</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-case-report-check</code>
        </pre>
      </div>
    </section>
  );
}
