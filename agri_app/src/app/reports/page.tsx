import { AppShell } from "@/components/app-shell";
import { getReportStats } from "@/lib/data/reports";
import { requireSuperAdmin } from "@/lib/authz";
import { withBasePath } from "@/lib/app-config";
import { getTranslations } from "@/lib/i18n/server";

export default async function ReportsPage() {
  await requireSuperAdmin();
  const { t } = await getTranslations();
  const stats = await getReportStats();

  const cards = [
    [t.common.plants, stats.plants],
    [t.dashboard.interventions, stats.interventions],
    [t.common.tasks, stats.tasks],
    [t.nav.notices, stats.notifications],
    [t.reportsPage.pendingProposals, stats.pendingProposals],
  ] as const;

  return (
    <AppShell title={t.reportsPage.title} eyebrow={t.reportsPage.eyebrow}>
      <div className="grid gap-4 md:grid-cols-5">
        {cards.map(([label, value]) => (
          <div key={label} className="agri-card"><p className="text-sm font-medium text-stone-500">{label}</p><p className="mt-2 text-3xl font-semibold text-emerald-950">{value}</p></div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <a href={withBasePath("/api/export/plants")} className="agri-card transition hover:bg-white"><h2 className="text-lg font-semibold text-stone-950">{t.reportsPage.exportPlants}</h2></a>
        <a href={withBasePath("/api/export/interventions")} className="agri-card transition hover:bg-white"><h2 className="text-lg font-semibold text-stone-950">{t.reportsPage.exportInterventions}</h2></a>
        <a href={withBasePath("/api/export/tasks")} className="agri-card transition hover:bg-white"><h2 className="text-lg font-semibold text-stone-950">{t.reportsPage.exportTasks}</h2></a>
      </div>
    </AppShell>
  );
}
