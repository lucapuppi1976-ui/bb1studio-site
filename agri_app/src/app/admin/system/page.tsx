import { AppShell } from "@/components/app-shell";
import { requireSuperAdmin } from "@/lib/authz";
import { getServerEnvValidation, getPublicEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export default async function AdminSystemPage() {
  await requireSuperAdmin();

  let dbOk = true;
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
  } catch {
    dbOk = false;
  }

  const serverEnv = getServerEnvValidation();
  const publicEnv = getPublicEnv();

  return (
    <AppShell title="Sistema" eyebrow="Diagnostica">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Database</h2>
          <p className="mt-4 text-sm text-white/70">{dbOk ? "OK" : "Errore connessione DB"}</p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Env server</h2>
          <p className="mt-4 text-sm text-white/70">
            {serverEnv.success ? "Valide" : "Mancano o sono invalide"}
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
          <h2 className="text-lg font-semibold">Config pubblica</h2>
          <pre className="mt-4 overflow-auto rounded-xl bg-neutral-900 p-4 text-sm text-white/70">
{JSON.stringify(publicEnv, null, 2)}
          </pre>
        </section>
      </div>
    </AppShell>
  );
}
