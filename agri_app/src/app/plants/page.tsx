import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { requireUser } from "@/lib/authz";
import { getPlants } from "@/lib/data/plants";
import { getTranslations } from "@/lib/i18n/server";
import { formatEnvironment, formatPlantStatus, formatPlantType } from "@/lib/i18n/labels";

export default async function PlantsPage() {
  await requireUser();
  const { locale, t } = await getTranslations();
  const plants = await getPlants();

  return (
    <AppShell title={t.plantsPage.title} eyebrow={t.plantsPage.eyebrow} actions={<Link href="/plants/new" className="agri-button-primary">{t.plantsPage.newPlant}</Link>}>
      {plants.length === 0 ? (
        <div className="agri-card text-stone-600">{t.plantsPage.empty}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {plants.map((plant) => (
            <Link key={plant.id} href={`/plants/${plant.id}`} className="agri-card transition hover:bg-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{plant.code}</p>
                  <h2 className="mt-1 text-xl font-semibold text-stone-950">{plant.name || plant.species}</h2>
                  <p className="mt-1 text-sm text-stone-600">{plant.species}{plant.variety ? ` · ${plant.variety}` : ""}</p>
                </div>
                <span className="rounded-full border border-emerald-900/15 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">{formatEnvironment(plant.environment, locale)}</span>
              </div>
              <div className="mt-4 grid gap-1 text-sm text-stone-600">
                <p>{t.common.type}: {formatPlantType(plant.type, locale)}</p>
                <p>{t.common.state}: {formatPlantStatus(plant.status, locale)}</p>
                <p>{t.common.recentInterventions}: {plant.interventions.length}</p>
                <p>{t.common.recentTasks}: {plant.tasks.length}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
