import Link from "next/link";
import type { Session } from "next-auth";
import { routes } from "@/lib/app-routes";
import { LogoutButton } from "@/components/auth/logout-button";

type Props = {
  session: Session | null;
};

const links = [
  { href: routes.dashboard, label: "Dashboard" },
  { href: routes.plants, label: "Piante" },
  { href: routes.interventions, label: "Interventi" },
  { href: routes.tasks, label: "Task" },
  { href: routes.today, label: "Oggi" },
  { href: routes.notifications, label: "Notifiche" },
  { href: routes.reports, label: "Report" },
  { href: routes.scan, label: "Scanner" },
  { href: routes.offlineSync, label: "Offline" },
];

export function MainNav({ session }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-4">
        <Link href={routes.home} className="mr-4 text-lg font-semibold text-white">
          Agri App
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          {session?.user?.role === "SUPER_ADMIN" ? (
            <>
              <Link
                href={routes.approvals}
                className="rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                Approvazioni
              </Link>
              <Link
                href={routes.adminUsers}
                className="rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                Utenti
              </Link>
              <Link
                href={routes.adminSystem}
                className="rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                Sistema
              </Link>
            </>
          ) : null}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a
            href="https://bb1studio.com"
            className="rounded-xl px-3 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            bb1studio.com
          </a>

          {session?.user ? (
            <>
              <span className="hidden text-sm text-white/50 md:inline">
                {session.user.email} • {session.user.role}
              </span>
              <LogoutButton />
            </>
          ) : (
            <Link href={routes.login} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
