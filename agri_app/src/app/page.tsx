import Link from "next/link";
import { routes } from "@/lib/app-routes";
import { AppShell } from "@/components/app-shell";
import { getTranslations } from "@/lib/i18n/server";
import { getOperationalText } from "@/lib/i18n/operational";

export default async function HomePage() {
  const { t, locale } = await getTranslations();
  const op = getOperationalText(locale);

  return (
    <AppShell
      title={t.common.appName}
      eyebrow="bb1studio.com/agri_app"
      actions={
        <>
          <Link href={routes.login} className="agri-button-primary">{t.nav.login}</Link>
          <Link href={routes.dashboard} className="agri-button-secondary">{op.pages.homeSummary}</Link>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{t.common.plants}</h2>
          <p className="mt-2 text-sm text-stone-600">{t.plantsPage.eyebrow}</p>
        </div>
        <div className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{t.interventionsPage.title}</h2>
          <p className="mt-2 text-sm text-stone-600">{t.interventionsPage.eyebrow}</p>
        </div>
        <div className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{t.common.tasks}</h2>
          <p className="mt-2 text-sm text-stone-600">{op.pages.homeTasksDescription}</p>
        </div>
      </div>
    </AppShell>
  );
}
