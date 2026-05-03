import Link from "next/link";
import { getServerSession } from "next-auth";
import { AppShell } from "@/components/app-shell";
import { authOptions } from "@/lib/auth";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";
import { formatRole } from "@/lib/i18n/labels";
import { getAccessRolesText } from "@/lib/i18n/access-roles";

export default async function ForbiddenPage() {
  const [{ locale }, session] = await Promise.all([getTranslations(), getServerSession(authOptions)]);
  const copy = getAccessRolesText(locale);

  return (
    <AppShell title={copy.forbidden.title} eyebrow={copy.forbidden.eyebrow}>
      <section className="agri-card max-w-3xl">
        <h2 className="text-xl font-semibold text-stone-950">{copy.forbidden.heading}</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">{copy.forbidden.body}</p>

        {session?.user ? (
          <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
            <p className="font-medium text-stone-950">{session.user.email}</p>
            <p className="mt-1">{formatRole(session.user.role, locale)}</p>
            <p className="mt-3 text-stone-600">{copy.forbidden.sessionHint}</p>
          </div>
        ) : (
          <p className="mt-5 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{copy.forbidden.adminHint}</p>
        )}

        <div className="mt-6 grid gap-3 sm:flex">
          <Link href={routes.dashboard} className="agri-button-primary">{copy.forbidden.dashboard}</Link>
          <Link href={routes.login} className="agri-button-secondary">{copy.forbidden.login}</Link>
        </div>
      </section>
    </AppShell>
  );
}
