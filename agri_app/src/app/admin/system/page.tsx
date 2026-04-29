import { AppShell } from "@/components/app-shell";
import { requireSuperAdmin } from "@/lib/authz";
import { getServerEnvValidation, getPublicEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "@/lib/i18n/server";

export default async function AdminSystemPage() {
  await requireSuperAdmin();
  const { t } = await getTranslations();

  let dbOk = true;
  try { await prisma.$queryRawUnsafe("SELECT 1"); } catch { dbOk = false; }

  const serverEnv = getServerEnvValidation();
  const publicEnv = getPublicEnv();

  return (
    <AppShell title={t.admin.systemTitle} eyebrow={t.admin.systemEyebrow}>
      <div className="grid gap-6 md:grid-cols-2">
        <section className="agri-card"><h2 className="text-lg font-semibold text-stone-950">{t.admin.database}</h2><p className="mt-4 text-sm text-stone-600">{dbOk ? "OK" : t.admin.connectionError}</p></section>
        <section className="agri-card"><h2 className="text-lg font-semibold text-stone-950">{t.admin.serverEnv}</h2><p className="mt-4 text-sm text-stone-600">{serverEnv.success ? t.admin.valid : t.admin.invalid}</p></section>
        <section className="agri-card md:col-span-2"><h2 className="text-lg font-semibold text-stone-950">{t.admin.publicConfig}</h2><pre className="mt-4 overflow-auto rounded-2xl bg-stone-950 p-4 text-sm text-white/80">{JSON.stringify(publicEnv, null, 2)}</pre></section>
      </div>
    </AppShell>
  );
}
