import { AppShell } from "@/components/app-shell";
import { OfflineQueuePanel } from "@/components/offline/offline-queue-panel";
import { requireUser } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { getOperationalText } from "@/lib/i18n/operational";

export default async function OfflineSyncPage() {
  await requireUser();
  const { locale } = await getTranslations();
  const op = getOperationalText(locale);

  return (
    <AppShell title={op.pages.offlineSyncTitle} eyebrow={op.pages.offlineSyncEyebrow}>
      <OfflineQueuePanel locale={locale} />
    </AppShell>
  );
}
