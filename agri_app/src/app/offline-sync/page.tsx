import { AppShell } from "@/components/app-shell";
import { OfflineQueuePanel } from "@/components/offline/offline-queue-panel";
import { requireUser } from "@/lib/authz";

export default async function OfflineSyncPage() {
  await requireUser();

  return (
    <AppShell title="Centro sync offline" eyebrow="Queue locale">
      <OfflineQueuePanel />
    </AppShell>
  );
}
