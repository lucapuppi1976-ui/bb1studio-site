import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminSystemLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <section
        className="mx-auto w-full max-w-6xl px-4 pt-8"
        data-admin-operations-shortcut="true"
      >
        <div className="rounded-2xl border p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Accesso rapido operativo
              </p>
              <h2 className="mt-1 text-xl font-semibold">Operations Center</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Apri il centro operativo con runbook visuale, quick check, release gate secret-safe
                e gestione CRON_SECRET Render.
              </p>
            </div>
            <Link
              className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
              href="/admin/operations"
            >
              Apri Operations Center
            </Link>
          </div>
        </div>
      </section>

      {children}
    </div>
  );
}
