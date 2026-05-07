export default function OperationsAiScoutingMissionPlanner() {
  return (
    <section className="rounded-2xl border p-5 shadow-sm" data-ai-scouting-mission-admin="true">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI Scouting Mission Planner & Field Crew Route Sequencer
        </p>
        <h2 className="text-xl font-semibold">Scouting mission planner premium</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          V9.1 aggiunge pianificazione missioni manuali: route campo, shot list,
          safety gate, assegnazione risorse, debrief, escalation ed export redatto.
          Dry-run only: nessun provider, nessun DB, nessuna automazione.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Endpoint ops</p>
          <p className="mt-1 font-semibold">/api/ops/ai-scouting-mission-dry-run</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Missione</p>
          <p className="mt-1 font-semibold">scoutingMissionReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Route</p>
          <p className="mt-1 font-semibold">routeSequencingReady=true</p>
        </div>
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Automazioni</p>
          <p className="mt-1 font-semibold">automaticExecutionReady=false</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border p-4">
        <h3 className="font-semibold">Check operativo</h3>
        <pre className="mt-3 overflow-auto rounded-xl border bg-black p-4 text-xs text-white">
          <code>npm run ops:ai-scouting-mission-check</code>
        </pre>
      </div>
    </section>
  );
}
