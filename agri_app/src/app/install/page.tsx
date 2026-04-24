import { AppShell } from "@/components/app-shell";
import { InstallPrompt } from "@/components/pwa/install-prompt";

export default function InstallPage() {
  return (
    <AppShell title="Installa l'app" eyebrow="PWA">
      <InstallPrompt />
    </AppShell>
  );
}
