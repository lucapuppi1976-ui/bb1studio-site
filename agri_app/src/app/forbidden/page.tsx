import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getTranslations } from "@/lib/i18n/server";
import { routes } from "@/lib/app-routes";

export default async function ForbiddenPage() {
  const { t } = await getTranslations();

  return (
    <AppShell title={t.auth.forbiddenTitle} eyebrow={t.auth.forbiddenEyebrow}>
      <div className="mx-auto max-w-xl agri-card">
        <h2 className="text-2xl font-semibold text-stone-950">{t.auth.forbiddenHeading}</h2>
        <p className="mt-3 leading-6 text-stone-600">{t.auth.forbiddenBody}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={routes.dashboard} className="agri-button-primary px-5 py-3">{t.auth.backToSummary}</Link>
          <Link href={routes.login} className="agri-button-secondary px-5 py-3">{t.auth.goToLogin}</Link>
        </div>
      </div>
    </AppShell>
  );
}
