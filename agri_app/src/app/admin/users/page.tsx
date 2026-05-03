import { UserRole } from "@prisma/client";
import { AppShell } from "@/components/app-shell";
import { requireSuperAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "@/lib/i18n/server";
import { formatRole } from "@/lib/i18n/labels";
import { getAccessRolesText } from "@/lib/i18n/access-roles";

function toDateLocale(locale: string) {
  return {
    it: "it-IT",
    es: "es-ES",
    en: "en-US",
    sk: "sk-SK",
    fr: "fr-FR",
    de: "de-DE",
    ru: "ru-RU",
    hu: "hu-HU",
  }[locale] ?? "it-IT";
}

function badgeClass(role: UserRole) {
  if (role === UserRole.SUPER_ADMIN) return "border-emerald-200 bg-emerald-50 text-emerald-900";
  return "border-stone-200 bg-stone-50 text-stone-700";
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <section className="agri-card">
      <p className="text-sm font-medium text-stone-500">{label}</p>
      <p className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950">{value}</p>
    </section>
  );
}

export default async function AdminUsersPage() {
  const session = await requireSuperAdmin();
  const { locale } = await getTranslations();
  const copy = getAccessRolesText(locale);
  const dateLocale = toDateLocale(locale);

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
  });

  const adminCount = users.filter((user) => user.role === UserRole.SUPER_ADMIN).length;
  const operatorCount = users.filter((user) => user.role === UserRole.OPERATOR).length;

  return (
    <AppShell title={copy.users.title} eyebrow={copy.users.eyebrow}>
      <p className="mb-6 max-w-3xl text-sm leading-6 text-stone-600">{copy.users.description}</p>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label={copy.users.total} value={users.length} />
        <StatCard label={copy.users.admins} value={adminCount} />
        <StatCard label={copy.users.operators} value={operatorCount} />
      </div>

      <section className="agri-card mt-6 border-amber-200 bg-amber-50/95">
        <h2 className="text-lg font-semibold text-amber-950">{copy.roles.superAdmin}</h2>
        <p className="mt-2 text-sm leading-6 text-amber-900">{copy.roles.superAdminWarning}</p>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{copy.users.userList}</h2>
          <div className="mt-4 grid gap-3">
            {users.map((user) => {
              const isCurrentUser = user.id === session.user.id;
              return (
                <article key={user.id} className="rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="break-words text-base font-semibold text-stone-950">
                        {user.name || copy.fields.noName}
                        {isCurrentUser ? <span className="ml-2 text-xs font-medium text-emerald-800">({copy.fields.currentUser})</span> : null}
                      </h3>
                      <p className="mt-1 break-all text-sm text-stone-600">{user.email}</p>
                    </div>
                    <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass(user.role)}`}>{formatRole(user.role, locale)}</span>
                  </div>

                  <dl className="mt-4 grid gap-2 text-sm text-stone-600 sm:grid-cols-2">
                    <div><dt className="font-medium text-stone-500">{copy.fields.createdAt}</dt><dd>{user.createdAt.toLocaleDateString(dateLocale)}</dd></div>
                    <div><dt className="font-medium text-stone-500">{copy.fields.updatedAt}</dt><dd>{user.updatedAt.toLocaleDateString(dateLocale)}</dd></div>
                  </dl>
                </article>
              );
            })}
          </div>
        </section>

        <section className="agri-card">
          <h2 className="text-lg font-semibold text-stone-950">{copy.users.roleMatrix}</h2>
          <div className="mt-4 grid gap-4">
            <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4">
              <p className="font-semibold text-emerald-950">{copy.roles.superAdmin}</p>
              <p className="mt-2 text-sm leading-6 text-emerald-900">{copy.roles.superAdminDescription}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">{copy.permissions.adminOnly}</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
              <p className="font-semibold text-stone-950">{copy.roles.operator}</p>
              <p className="mt-2 text-sm leading-6 text-stone-700">{copy.roles.operatorDescription}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{copy.permissions.operatorAllowed}</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-white p-4 text-sm leading-6 text-stone-700">
              <p><span className="font-semibold text-stone-950">{copy.permissions.adminOnly}:</span> {copy.permissions.superAdminAreas}</p>
              <p className="mt-2"><span className="font-semibold text-stone-950">{copy.permissions.operatorAllowed}:</span> {copy.permissions.operatorAreas}</p>
              <p className="mt-2"><span className="font-semibold text-stone-950">API:</span> {copy.permissions.apiProtection}</p>
              <p className="mt-2"><span className="font-semibold text-stone-950">Cron:</span> {copy.permissions.cronProtection}</p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
