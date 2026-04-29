import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getInterventionById } from "@/lib/data/interventions";
import { requireUser } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { formatInterventionType } from "@/lib/i18n/labels";
import { getOperationalText } from "@/lib/i18n/operational";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function InterventionDetailPage({ params }: Props) {
  await requireUser();
  const { locale } = await getTranslations();
  const op = getOperationalText(locale);
  const { id } = await params;
  const intervention = await getInterventionById(id);

  if (!intervention) notFound();

  return (
    <AppShell
      title={intervention.title}
      eyebrow={formatInterventionType(intervention.type, locale)}
      actions={<Link href={`/interventions/${intervention.id}/edit`} className="agri-button-primary">{op.actions.edit}</Link>}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{op.pages.interventionDetails}</h2>
          <div className="mt-4 grid gap-2 text-sm text-stone-700">
            <p><span className="font-semibold">{op.fields.type}:</span> {formatInterventionType(intervention.type, locale)}</p>
            <p><span className="font-semibold">{op.fields.operator}:</span> {intervention.operatorName || op.messages.none}</p>
            <p><span className="font-semibold">{op.fields.productName}:</span> {intervention.productName || op.messages.none}</p>
            <p><span className="font-semibold">{op.fields.dosage}:</span> {intervention.dosage || op.messages.none}</p>
            <p><span className="font-semibold">{op.fields.waterLiters}:</span> {intervention.waterLiters ?? op.messages.none}</p>
            <p><span className="font-semibold">{op.fields.height}:</span> {intervention.heightCm ?? op.messages.none}</p>
          </div>
        </section>

        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{op.fields.description}</h2>
          <p className="mt-4 text-sm text-stone-700">{intervention.description || op.messages.none}</p>
          <h3 className="mt-6 text-lg font-semibold text-stone-950">{op.fields.notes}</h3>
          <p className="mt-4 text-sm text-stone-700">{intervention.notes || op.messages.none}</p>
        </section>

        <section className="agri-card md:col-span-2">
          <h2 className="text-lg font-semibold text-stone-950">{op.sections.images}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-stone-700">{op.fields.beforePhoto}</p>
              {intervention.beforeImageUrl ? (
                <img src={intervention.beforeImageUrl} alt={op.fields.beforePhoto} className="w-full rounded-2xl border border-stone-200 object-cover" />
              ) : (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-white/70 p-6 text-sm text-stone-500">{op.messages.noBeforePhoto}</div>
              )}
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-stone-700">{op.fields.afterPhoto}</p>
              {intervention.afterImageUrl ? (
                <img src={intervention.afterImageUrl} alt={op.fields.afterPhoto} className="w-full rounded-2xl border border-stone-200 object-cover" />
              ) : (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-white/70 p-6 text-sm text-stone-500">{op.messages.noAfterPhoto}</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
