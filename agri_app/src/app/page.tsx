import Link from "next/link";
import { routes } from "@/lib/app-routes";
import { AppShell } from "@/components/app-shell";

export default function HomePage() {
  return (
    <AppShell
      title="Agri App"
      eyebrow="bb1studio.com/agri_app"
      actions={
        <>
          <Link href={routes.login} className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
            Login
          </Link>
          <Link href={routes.dashboard} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70">
            Dashboard
          </Link>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Piante</h2>
          <p className="mt-2 text-sm text-white/60">Archivio completo con schede, QR e posizione.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Interventi</h2>
          <p className="mt-2 text-sm text-white/60">Irrigazione, potatura, fertilizzazione, fitosanitario e misure.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Task</h2>
          <p className="mt-2 text-sm text-white/60">Agenda giornaliera, approvazioni e notifiche in-app.</p>
        </div>
      </div>
    </AppShell>
  );
}
