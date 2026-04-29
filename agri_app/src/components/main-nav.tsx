import Link from "next/link";
import type { Session } from "next-auth";
import { routes } from "@/lib/app-routes";
import { LogoutButton } from "@/components/auth/logout-button";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { getTranslations } from "@/lib/i18n/server";
import { formatRole } from "@/lib/i18n/labels";

type Props = {
  session: Session | null;
};

export async function MainNav({ session }: Props) {
  const { locale, t } = await getTranslations();

  const links = [
    { href: routes.dashboard, label: t.nav.summary },
    { href: routes.plants, label: t.nav.plants },
    { href: routes.interventions, label: t.nav.interventions },
    { href: routes.tasks, label: t.nav.tasks },
    { href: routes.today, label: t.nav.today },
    { href: routes.notifications, label: t.nav.notices },
    { href: routes.reports, label: t.nav.reports },
    { href: routes.scan, label: t.nav.scan },
    { href: routes.offlineSync, label: t.nav.offline },
  ];

  const adminLinks = [
    { href: routes.recurringTasks, label: t.nav.scheduledTasks },
    { href: routes.approvals, label: t.nav.approvals },
    { href: routes.adminUsers, label: t.nav.users },
    { href: routes.adminSystem, label: t.nav.system },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
        <Link href={routes.home} className="mr-3 text-lg font-semibold tracking-tight text-white">
          Agri App
        </Link>

        <nav className="flex flex-wrap items-center gap-1.5">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-2xl px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white">
              {link.label}
            </Link>
          ))}

          {session?.user?.role === "SUPER_ADMIN"
            ? adminLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-2xl px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white">
                  {link.label}
                </Link>
              ))
            : null}
        </nav>

        <div className="ml-auto flex flex-wrap items-center gap-3">
          <LanguageSwitcher currentLocale={locale} label={t.common.language} />

          {session?.user ? (
            <>
              <span className="hidden text-sm text-white/50 md:inline">
                {session.user.email} · {formatRole(session.user.role, locale)}
              </span>
              <LogoutButton label={t.nav.logout} />
            </>
          ) : (
            <Link href={routes.login} className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white">
              {t.nav.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
