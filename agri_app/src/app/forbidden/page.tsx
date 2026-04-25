import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { routes } from "@/lib/app-routes";

export default function ForbiddenPage() {
  return (
    <AppShell title="Accesso negato" eyebrow="403">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
        Non hai i permessi per accedere a questa sezione.
        <div className="mt-4">
          <Link href={routes.dashboard} className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
            Torna alla dashboard
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
