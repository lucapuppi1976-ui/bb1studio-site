import { AppShell } from "@/components/app-shell";
import { requireSuperAdmin } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  await requireSuperAdmin();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AppShell title="Utenti" eyebrow="Super admin">
      <div className="grid gap-4">
        {users.map((user) => (
          <article key={user.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">{user.name || user.email}</h2>
            <p className="mt-1 text-sm text-white/60">{user.email}</p>
            <p className="mt-2 text-sm text-white/50">{user.role}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
