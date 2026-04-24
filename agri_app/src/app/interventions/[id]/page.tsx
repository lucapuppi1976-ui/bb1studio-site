import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getInterventionById } from "@/lib/data/interventions";
import { requireUser } from "@/lib/authz";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterventionDetailPage({ params }: Props) {
  await requireUser();
  const { id } = await params;
  const intervention = await getInterventionById(id);

  if (!intervention) notFound();

  return (
    <AppShell
      title={intervention.title}
      eyebrow={intervention.type}
      actions={
        <Link href={`/interventions/${intervention.id}/edit`} className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
          Modifica
        </Link>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Dati principali</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <p>Pianta: {intervention.plant.name || intervention.plant.species} ({intervention.plant.code})</p>
            <p>Operatore: {intervention.operatorName || "—"}</p>
            <p>Prodotto: {intervention.productName || "—"}</p>
            <p>Dosaggio: {intervention.dosage || "—"}</p>
            <p>Litri acqua: {intervention.waterLiters ?? "—"}</p>
            <p>Altezza: {intervention.heightCm ?? "—"}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Descrizione</h2>
          <p className="mt-4 text-sm text-white/70">{intervention.description || "—"}</p>
          <h3 className="mt-6 text-lg font-semibold">Note</h3>
          <p className="mt-4 text-sm text-white/70">{intervention.notes || "—"}</p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
          <h2 className="text-lg font-semibold">Immagini</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm text-white/60">Foto prima</p>
              {intervention.beforeImageUrl ? (
                <img src={intervention.beforeImageUrl} alt="Foto prima" className="w-full rounded-2xl border border-white/10 object-cover" />
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-white/40">Nessuna foto prima</div>
              )}
            </div>
            <div>
              <p className="mb-2 text-sm text-white/60">Foto dopo</p>
              {intervention.afterImageUrl ? (
                <img src={intervention.afterImageUrl} alt="Foto dopo" className="w-full rounded-2xl border border-white/10 object-cover" />
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-white/40">Nessuna foto dopo</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
