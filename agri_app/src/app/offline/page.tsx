import { AppShell } from "@/components/app-shell";
import { getTranslations } from "@/lib/i18n/server";
import { getOperationalText } from "@/lib/i18n/operational";

export default async function OfflinePage() {
  const { locale } = await getTranslations();
  const op = getOperationalText(locale);

  return (
    <AppShell title={op.pages.offlineTitle} eyebrow={op.pages.offlineEyebrow}>
      <div className="agri-card text-stone-700">
        {op.pages.offlineBody}
      </div>
    </AppShell>
  );
}
