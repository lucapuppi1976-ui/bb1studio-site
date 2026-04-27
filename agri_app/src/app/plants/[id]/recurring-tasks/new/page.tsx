import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { createRecurringTaskTemplate } from "@/lib/actions/recurring-tasks";
import { getOperators, getPlantForRecurringTemplate } from "@/lib/data/recurring-tasks";
import { requireSuperAdmin } from "@/lib/authz";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewRecurringTaskTemplatePage({ params }: Props) {
  await requireSuperAdmin();
  const { id } = await params;

  const [plant, operators] = await Promise.all([
    getPlantForRecurringTemplate(id),
    getOperators(),
  ]);

  if (!plant) notFound();

  return (
    <AppShell title="Nuovo task ricorrente" eyebrow={plant.name || plant.species}>
      <form action={createRecurringTaskTemplate} className="grid gap-6">
        <input type="hidden" name="plantId" value={plant.id} />

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Dati base</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm text-white/70">Titolo</span>
              <input
                name="title"
                required
                className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-white/70">Priorità</span>
              <select
                name="priority"
                defaultValue="RECOMMENDED"
                className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
              >
                <option value="RECOMMENDED">RECOMMENDED</option>
                <option value="MANDATORY">MANDATORY</option>
              </select>
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-sm text-white/70">Descrizione</span>
              <textarea
                name="description"
                rows={4}
                className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
              />
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-sm text-white/70">Note</span>
              <textarea
                name="notes"
                rows={3}
                className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Ricorrenza</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-sm text-white/70">Tipo ricorrenza</span>
              <select
                name="recurrenceType"
                defaultValue="WEEKLY"
                className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
              >
                <option value="DAILY">DAILY</option>
                <option value="WEEKLY">WEEKLY</option>
                <option value="EVERY_X_DAYS">EVERY_X_DAYS</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-white/70">Ogni X giorni</span>
              <input
                type="number"
                min={1}
                name="intervalDays"
                placeholder="Usato solo per EVERY_X_DAYS"
                className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-white/70">Prima data</span>
              <input
                type="date"
                name="nextDueDate"
                required
                className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Assegnazione</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm text-white/70">Operatore</span>
              <select
                name="assignedToUserId"
                defaultValue=""
                className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
              >
                <option value="">Non assegnato</option>
                {operators.map((operator) => (
                  <option key={operator.id} value={operator.id}>
                    {operator.name || operator.email}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:opacity-90"
          >
            Crea template
          </button>
        </div>
      </form>
    </AppShell>
  );
}
