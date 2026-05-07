export default function OperationsAiFarmRiskRadar() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-farm-risk-radar-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Farm Risk Radar & Predictive Priority Center
        </p>
        <h2 className="text-xl font-semibold">Farm Risk Radar premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V9.2 aggiunge radar rischio aziendale: quadranti per appezzamento,
          priorità predittive, forecast operativo, stress risorse, watchlist critica,
          briefing direzionale e compliance radar. Dry-run only.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-farm-risk-radar-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Radar</p>
          <p className="mt-1 font-semibold">farmRiskRadarReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Forecast</p>
          <p className="mt-1 font-semibold">forecastWindowsReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Automazioni</p>
          <p className="mt-1 font-semibold">automaticExecutionReady=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-farm-risk-radar-check</code>
        </pre>
      </div>
    </section>
  );
}
