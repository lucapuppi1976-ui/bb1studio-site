import { AppShell } from "@/components/app-shell";

export default function OfflinePage() {
  return (
    <AppShell title="Modalità offline" eyebrow="Fallback">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
        Sei offline. Alcune funzioni restano disponibili, altre verranno sincronizzate appena torna la rete.
      </div>
    </AppShell>
  );
}
