import { AppShell } from "@/components/app-shell";
import { requireSuperAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "@/lib/i18n/server";
import { formatRole } from "@/lib/i18n/labels";

export default async function AdminUsersPage() {
  await requireSuperAdmin();
  const { locale, t } = await getTranslations();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AppShell title={t.admin.usersTitle} eyebrow={t.admin.usersEyebrow}>
      <div className="grid gap-4">
        {users.map((user) => (
          <article key={user.id} className="agri-card">
            <h2 className="text-lg font-semibold text-stone-950">{user.name || user.email}</h2>
            <p className="mt-1 text-sm text-stone-600">{user.email}</p>
            <p className="mt-2 text-sm font-medium text-emerald-900">{formatRole(user.role, locale)}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
