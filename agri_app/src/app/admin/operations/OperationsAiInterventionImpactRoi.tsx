export default function OperationsAiInterventionImpactRoi() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-intervention-impact-roi-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Intervention Impact & ROI Simulator
        </p>
        <h2 className="text-xl font-semibold">Intervention Impact & ROI simulator premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V9.3 aggiunge simulazione impatto operativo/economico: scenario matrix,
          risk reduction forecast, manual cost envelope, budget risorse, opportunity cost,
          ROI proxy e compliance economics guard. Dry-run only.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-intervention-impact-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Impact</p>
          <p className="mt-1 font-semibold">interventionImpactReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">ROI</p>
          <p className="mt-1 font-semibold">roiPriorityQueueReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Automazioni</p>
          <p className="mt-1 font-semibold">automaticExecutionReady=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-intervention-impact-check</code>
        </pre>
      </div>
    </section>
  );
}
