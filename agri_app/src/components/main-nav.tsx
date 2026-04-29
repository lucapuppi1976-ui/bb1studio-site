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

  const allLinks = session?.user?.role === "SUPER_ADMIN" ? [...links, ...adminLinks] : links;
  const mobileLinks = [
    { href: routes.dashboard, label: t.nav.summary },
    { href: routes.plants, label: t.nav.plants },
    { href: routes.tasks, label: t.nav.tasks },
    { href: routes.today, label: t.nav.today },
    { href: routes.notifications, label: t.nav.notices },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/90 backdrop-blur supports-[backdrop-filter]:bg-stone-950/80">
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <Link href={session?.user ? routes.dashboard : routes.home} className="shrink-0 text-lg font-semibold tracking-tight text-white">
              Agri App
            </Link>

            <div className="flex min-w-0 items-center justify-end gap-2">
              <LanguageSwitcher currentLocale={locale} label={t.common.language} />

              {session?.user ? (
                <>
                  <span className="hidden max-w-[18rem] truncate text-sm text-white/50 lg:inline">
                    {session.user.email} · {formatRole(session.user.role, locale)}
                  </span>
                  <LogoutButton label={t.nav.logout} />
                </>
              ) : (
                <Link href={routes.login} className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/5 hover:text-white">
                  {t.nav.login}
                </Link>
              )}
            </div>
          </div>

          <nav className="agri-no-scrollbar -mx-3 mt-3 flex gap-1 overflow-x-auto px-3 pb-1 sm:-mx-6 sm:px-6 md:flex-wrap md:overflow-visible md:pb-0" aria-label="Agri App">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-white/72 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {session?.user ? (
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200/70 bg-white/90 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-18px_45px_rgba(28,37,25,0.12)] backdrop-blur md:hidden" aria-label="Mobile">
          <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-12 items-center justify-center rounded-2xl px-1.5 text-center text-[0.72rem] font-semibold leading-tight text-stone-700 transition hover:bg-emerald-50 hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/20"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </>
  );
}
