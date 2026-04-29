import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/authz";
import { AppShell } from "@/components/app-shell";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";

export default async function DashboardPage() {
  const session = await requireUser();
  const { t } = await getTranslations();

  const [plants, interventions, tasks, notifications] = await Promise.all([
    prisma.plant.count(),
    prisma.intervention.count(),
    prisma.task.count(),
    prisma.appNotification.count({ where: { userId: session.user.id, readAt: null } }),
  ]);

  const cards = [
    { label: t.dashboard.plants, value: plants, href: routes.plants },
    { label: t.dashboard.interventions, value: interventions, href: routes.interventions },
    { label: t.dashboard.tasks, value: tasks, href: routes.tasks },
    { label: t.dashboard.unreadNotices, value: notifications, href: routes.notifications },
  ];

  return (
    <AppShell title={t.dashboard.title} eyebrow={t.dashboard.eyebrow}>
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="agri-card transition hover:-translate-y-0.5 hover:bg-white">
            <p className="text-sm font-medium text-stone-500">{card.label}</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-emerald-950">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link href={routes.today} className="agri-card transition hover:-translate-y-0.5 hover:bg-white">
          <h2 className="text-xl font-semibold text-stone-950">{t.dashboard.todayTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">{t.dashboard.todayDescription}</p>
        </Link>
        <Link href={routes.offlineSync} className="agri-card transition hover:-translate-y-0.5 hover:bg-white">
          <h2 className="text-xl font-semibold text-stone-950">{t.dashboard.offlineTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">{t.dashboard.offlineDescription}</p>
        </Link>
      </div>
    </AppShell>
  );
}
