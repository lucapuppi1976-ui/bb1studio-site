import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function ForbiddenPage() {
  return (
    <AppShell title="Accesso negato" eyebrow="Permessi insufficienti">
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
        <h2 className="text-2xl font-semibold">Non hai i permessi per entrare qui.</h2>
        <p className="mt-3 text-white/70">
          Se pensi che sia un errore, contatta il super admin.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950"
          >
            Torna alla dashboard
          </Link>

          <Link
            href="/login"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/70"
          >
            Vai al login
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
