import { prisma } from "@/lib/prisma";

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

async function createUniqueNotification(params: {
  userId: string;
  type: "TASK" | "APPROVAL" | "INFO" | "SYSTEM";
  title: string;
  message: string;
  href?: string;
  dedupeKey: string;
}) {
  const existing = await prisma.appNotification.findUnique({
    where: { dedupeKey: params.dedupeKey },
  });

  if (existing) return false;

  await prisma.appNotification.create({
    data: params,
  });

  return true;
}

export async function runDailyNotificationsJob() {
  const now = new Date();
  const todayStart = startOfDay(now);
  const tomorrowStart = addDays(todayStart, 1);
  const dayAfterTomorrowStart = addDays(todayStart, 2);
  const dateKey = todayStart.toISOString().slice(0, 10);

  let created = 0;

  const usersWithPrefs = await prisma.user.findMany({
    include: {
      notificationPreference: true,
    },
  });

  for (const user of usersWithPrefs) {
    const prefs = user.notificationPreference ?? {
      inAppEnabled: true,
      emailEnabled: false,
      taskDueToday: true,
      taskDueTomorrow: true,
      overdueTasks: true,
      proposalUpdates: true,
      systemMessages: true,
      dailyDigestHour: 7,
      timezone: "Europe/Madrid",
    };

    if (!prefs.inAppEnabled) continue;

    if (prefs.taskDueToday) {
      const tasks = await prisma.task.findMany({
        where: {
          assignedToUserId: user.id,
          dueDate: {
            gte: todayStart,
            lt: tomorrowStart,
          },
          status: {
            in: ["SCHEDULED", "NOTIFIED"],
          },
        },
        include: { plant: true },
        orderBy: { dueDate: "asc" },
      });

      for (const task of tasks) {
        const inserted = await createUniqueNotification({
          userId: user.id,
          type: "TASK",
          title: `Task di oggi: ${task.title}`,
          message: `${task.plant.name || task.plant.species} • scadenza oggi`,
          href: `/tasks/${task.id}`,
          dedupeKey: `task:${task.id}:today:${dateKey}`,
        });

        if (inserted) created += 1;
      }
    }

    if (prefs.taskDueTomorrow) {
      const tasks = await prisma.task.findMany({
        where: {
          assignedToUserId: user.id,
          dueDate: {
            gte: tomorrowStart,
            lt: dayAfterTomorrowStart,
          },
          status: {
            in: ["SCHEDULED", "NOTIFIED"],
          },
        },
        include: { plant: true },
        orderBy: { dueDate: "asc" },
      });

      for (const task of tasks) {
        const inserted = await createUniqueNotification({
          userId: user.id,
          type: "TASK",
          title: `Task di domani: ${task.title}`,
          message: `${task.plant.name || task.plant.species} • scadenza domani`,
          href: `/tasks/${task.id}`,
          dedupeKey: `task:${task.id}:tomorrow:${dateKey}`,
        });

        if (inserted) created += 1;
      }
    }

    if (prefs.overdueTasks) {
      const tasks = await prisma.task.findMany({
        where: {
          assignedToUserId: user.id,
          dueDate: {
            lt: todayStart,
          },
          status: {
            in: ["SCHEDULED", "NOTIFIED", "EXPIRED"],
          },
        },
        include: { plant: true },
        orderBy: { dueDate: "asc" },
      });

      for (const task of tasks) {
        const inserted = await createUniqueNotification({
          userId: user.id,
          type: "TASK",
          title: `Task scaduto: ${task.title}`,
          message: `${task.plant.name || task.plant.species} • attività scaduta non completata`,
          href: `/tasks/${task.id}`,
          dedupeKey: `task:${task.id}:overdue:${dateKey}`,
        });

        if (inserted) created += 1;
      }
    }
  }

  const superAdmins = usersWithPrefs.filter((u) => u.role === "SUPER_ADMIN" && (u.notificationPreference?.inAppEnabled ?? true) && (u.notificationPreference?.proposalUpdates ?? true));

  if (superAdmins.length > 0) {
    const proposals = await prisma.taskProposal.findMany({
      where: { status: "PENDING" },
      include: { plant: true, proposedBy: true },
      orderBy: { createdAt: "asc" },
    });

    for (const admin of superAdmins) {
      for (const proposal of proposals) {
        const inserted = await createUniqueNotification({
          userId: admin.id,
          type: "APPROVAL",
          title: `Proposta da approvare: ${proposal.title}`,
          message: `${proposal.plant.name || proposal.plant.species} • proposta di ${proposal.proposedBy.name || proposal.proposedBy.email}`,
          href: `/approvals`,
          dedupeKey: `proposal:${proposal.id}:pending:${dateKey}:admin:${admin.id}`,
        });

        if (inserted) created += 1;
      }
    }
  }

  return { ok: true, created };
}
