import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/authz";
import { AppShell } from "@/components/app-shell";
import { routes } from "@/lib/app-routes";

export default async function DashboardPage() {
  const session = await requireUser();

  const [plants, interventions, tasks, notifications] = await Promise.all([
    prisma.plant.count(),
    prisma.intervention.count(),
    prisma.task.count(),
    prisma.appNotification.count({
      where: {
        userId: session.user.id,
        readAt: null,
      },
    }),
  ]);

  return (
    <AppShell title="Dashboard" eyebrow="Panoramica">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Piante", value: plants, href: routes.plants },
          { label: "Interventi", value: interventions, href: routes.interventions },
          { label: "Task", value: tasks, href: routes.tasks },
          { label: "Notifiche non lette", value: notifications, href: routes.notifications },
        ].map((card) => (
          <Link key={card.label} href={card.href} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-sm text-white/50">{card.label}</p>
            <p className="mt-2 text-3xl font-bold">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link href={routes.today} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Agenda di oggi</h2>
          <p className="mt-2 text-sm text-white/60">Task di oggi e avanzamento operativo.</p>
        </Link>
        <Link href={routes.offlineSync} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Centro offline</h2>
          <p className="mt-2 text-sm text-white/60">Controlla la queue locale e sincronizza quando torna la rete.</p>
        </Link>
      </div>
    </AppShell>
  );
}
