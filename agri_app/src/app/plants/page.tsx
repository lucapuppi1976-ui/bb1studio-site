import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { requireUser } from "@/lib/authz";
import { getPlants } from "@/lib/data/plants";

export default async function PlantsPage() {
  await requireUser();
  const plants = await getPlants();

  return (
    <AppShell
      title="Piante e alberi"
      eyebrow="Archivio"
      actions={
        <Link href="/plants/new" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
          Nuova pianta
        </Link>
      }
    >
      {plants.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
          Nessuna pianta presente nel database.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {plants.map((plant) => (
            <Link
              key={plant.id}
              href={`/plants/${plant.id}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">{plant.code}</p>
                  <h2 className="mt-1 text-xl font-semibold">{plant.name || plant.species}</h2>
                  <p className="mt-1 text-sm text-white/60">
                    {plant.species}
                    {plant.variety ? ` • ${plant.variety}` : ""}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                  {plant.environment}
                </span>
              </div>
              <div className="mt-4 grid gap-1 text-sm text-white/60">
                <p>Tipo: {plant.type}</p>
                <p>Stato: {plant.status}</p>
                <p>Interventi recenti: {plant.interventions.length}</p>
                <p>Task recenti: {plant.tasks.length}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
