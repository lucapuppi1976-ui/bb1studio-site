import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getPlantById } from "@/lib/data/plants";
import { requireUser, isSuperAdmin } from "@/lib/authz";
import { buildPlantPublicUrlByCode } from "@/lib/qr/build-plant-url";
import { routes } from "@/lib/app-routes";

type Props = {
  params: Promise<{ id: string }>;
};

function formatDate(value: Date) {
  return new Date(value).toLocaleDateString("it-IT");
}

export default async function PlantDetailPage({ params }: Props) {
  const session = await requireUser();
  const { id } = await params;
  const plant = await getPlantById(id);

  if (!plant) notFound();

  const publicUrl = buildPlantPublicUrlByCode(plant.code);

  return (
    <AppShell
      title={plant.name || plant.species}
      eyebrow={plant.code}
      actions={
        <>
          <Link href={`/plants/${plant.id}/interventions/new`} className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
            Nuovo intervento
          </Link>
          <Link href={`/plants/${plant.id}/interventions/new-offline`} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70">
            Intervento offline
          </Link>
          <Link href={`/plants/${plant.id}/tasks/new`} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70">
            Nuovo task
          </Link>
          {isSuperAdmin(session.user.role) ? (
            <Link href={`/plants/${plant.id}/recurring-tasks/new`} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70">
              Task ricorrente
            </Link>
          ) : null}
          <Link href={`/plants/${plant.id}/qr`} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70">
            QR
          </Link>
          {isSuperAdmin(session.user.role) ? (
            <Link href={`/plants/${plant.id}/edit`} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70">
              Modifica
            </Link>
          ) : null}
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Anagrafica</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <p>Specie: {plant.species}</p>
            <p>Varietà: {plant.variety || "—"}</p>
            <p>Tipo: {plant.type}</p>
            <p>Ambiente: {plant.environment}</p>
            <p>Stato: {plant.status}</p>
            <p>Zona: {plant.zoneName || "—"}</p>
            <p>Altezza: {plant.heightCm ?? "—"}</p>
            <p>Diametro: {plant.diameterMm ?? "—"}</p>
            <p>URL pubblico QR: <span className="break-all">{publicUrl}</span></p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Note</h2>
          <p className="mt-4 text-sm text-white/70">{plant.notes || "Nessuna nota."}</p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Interventi</h2>
            <Link href={routes.interventions} className="text-sm text-white/60">Vedi tutti</Link>
          </div>
          {plant.interventions.length === 0 ? (
            <p className="text-sm text-white/50">Nessun intervento registrato.</p>
          ) : (
            <div className="grid gap-3">
              {plant.interventions.map((item) => (
                <Link key={item.id} href={`/interventions/${item.id}`} className="rounded-xl border border-white/10 p-4 transition hover:bg-white/5">
                  <p className="text-xs uppercase tracking-wide text-white/40">{item.type}</p>
                  <p className="mt-1 font-semibold">{item.title}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Task</h2>
            <Link href={routes.tasks} className="text-sm text-white/60">Vedi tutti</Link>
          </div>
          {plant.tasks.length === 0 ? (
            <p className="text-sm text-white/50">Nessun task per questa pianta.</p>
          ) : (
            <div className="grid gap-3">
              {plant.tasks.map((task) => (
                <Link key={task.id} href={`/tasks/${task.id}`} className="rounded-xl border border-white/10 p-4 transition hover:bg-white/5">
                  <p className="text-xs uppercase tracking-wide text-white/40">{task.status}</p>
                  <p className="mt-1 font-semibold">{task.title}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Task ricorrenti</h2>
            {isSuperAdmin(session.user.role) ? (
              <Link href={`/plants/${plant.id}/recurring-tasks/new`} className="text-sm text-white/60">
                Nuovo template
              </Link>
            ) : null}
          </div>
          {plant.recurringTemplates.length === 0 ? (
            <p className="text-sm text-white/50">Nessun template ricorrente per questa pianta.</p>
          ) : (
            <div className="grid gap-3">
              {plant.recurringTemplates.map((template) => (
                <Link key={template.id} href={routes.recurringTasks} className="rounded-xl border border-white/10 p-4 transition hover:bg-white/5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/40">
                        {template.active ? "ATTIVO" : "PAUSA"} • {template.recurrenceType}
                      </p>
                      <p className="mt-1 font-semibold">{template.title}</p>
                      <p className="mt-1 text-sm text-white/60">
                        Prossima data: {formatDate(template.nextDueDate)}
                      </p>
                    </div>
                    <div className="text-sm text-white/50">
                      {template.assignedTo?.name || template.assignedTo?.email || "Non assegnato"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
