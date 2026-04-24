import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getInterventions } from "@/lib/data/interventions";
import { requireUser } from "@/lib/authz";

export default async function InterventionsPage() {
  await requireUser();
  const interventions = await getInterventions();

  return (
    <AppShell title="Interventi" eyebrow="Storico lavori">
      {interventions.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
          Nessun intervento presente.
        </div>
      ) : (
        <div className="grid gap-4">
          {interventions.map((intervention) => (
            <Link
              key={intervention.id}
              href={`/interventions/${intervention.id}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">{intervention.type}</p>
                  <h2 className="mt-1 text-xl font-semibold">{intervention.title}</h2>
                  <p className="mt-1 text-sm text-white/60">
                    {intervention.plant.name || intervention.plant.species} • {intervention.plant.code}
                  </p>
                </div>
                <div className="text-sm text-white/50">
                  <p>
                    Pianificato:{" "}
                    {intervention.scheduledDate
                      ? new Date(intervention.scheduledDate).toLocaleDateString("it-IT")
                      : "—"}
                  </p>
                  <p>
                    Completato:{" "}
                    {intervention.completedAt
                      ? new Date(intervention.completedAt).toLocaleDateString("it-IT")
                      : "—"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
