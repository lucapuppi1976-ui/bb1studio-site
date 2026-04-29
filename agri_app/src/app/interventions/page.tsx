import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getInterventions } from "@/lib/data/interventions";
import { requireUser } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatInterventionType } from "@/lib/i18n/labels";

export default async function InterventionsPage() {
  await requireUser();
  const { locale, t } = await getTranslations();
  const dateLocale = toDateLocale(locale);
  const interventions = await getInterventions();

  return (
    <AppShell title={t.interventionsPage.title} eyebrow={t.interventionsPage.eyebrow}>
      {interventions.length === 0 ? (
        <div className="agri-card text-stone-600">{t.interventionsPage.empty}</div>
      ) : (
        <div className="grid gap-4">
          {interventions.map((intervention) => (
            <Link key={intervention.id} href={`/interventions/${intervention.id}`} className="agri-card transition hover:bg-white">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{formatInterventionType(intervention.type, locale)}</p>
                  <h2 className="mt-1 text-xl font-semibold text-stone-950">{intervention.title}</h2>
                  <p className="mt-1 text-sm text-stone-600">{intervention.plant.name || intervention.plant.species} · {intervention.plant.code}</p>
                </div>
                <div className="text-sm text-stone-500">
                  <p>{t.common.planned}: {intervention.scheduledDate ? new Date(intervention.scheduledDate).toLocaleDateString(dateLocale) : "—"}</p>
                  <p>{t.common.completed}: {intervention.completedAt ? new Date(intervention.completedAt).toLocaleDateString(dateLocale) : "—"}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
