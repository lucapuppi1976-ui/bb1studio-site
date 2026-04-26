import { prisma } from "@/lib/prisma";
import { TaskStatus, UserRole } from "@prisma/client";

function getTimeWindows() {
  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);

  const endToday = new Date(startToday);
  endToday.setDate(endToday.getDate() + 1);

  const startTomorrow = new Date(endToday);
  const endTomorrow = new Date(startTomorrow);
  endTomorrow.setDate(endTomorrow.getDate() + 1);

  return { startToday, endToday, startTomorrow, endTomorrow };
}

function getTaskBucket(dueDate: Date, startToday: Date, endToday: Date, startTomorrow: Date, endTomorrow: Date) {
  if (dueDate < startToday) return "overdue";
  if (dueDate >= startToday && dueDate < endToday) return "today";
  if (dueDate >= startTomorrow && dueDate < endTomorrow) return "tomorrow";
  return null;
}

function isEnabledForBucket(pref: any, bucket: "today" | "tomorrow" | "overdue") {
  if (!pref || pref.inAppEnabled !== false) {
    if (!pref) return true;
  }

  if (pref && pref.inAppEnabled === false) return false;

  if (bucket === "today") return pref?.taskDueToday !== false;
  if (bucket === "tomorrow") return pref?.taskDueTomorrow !== false;
  return pref?.overdueTasks !== false;
}

function buildTaskNotificationCopy(task: any, bucket: "today" | "tomorrow" | "overdue") {
  const plantLabel = task.plant?.name || task.plant?.species || "Pianta";
  const href = `/tasks/${task.id}`;

  if (bucket === "today") {
    return {
      title: `Task di oggi: ${task.title}`,
      message: `${plantLabel} • scadenza oggi`,
      href,
    };
  }

  if (bucket === "tomorrow") {
    return {
      title: `Task di domani: ${task.title}`,
      message: `${plantLabel} • scadenza domani`,
      href,
    };
  }

  return {
    title: `Task scaduto: ${task.title}`,
    message: `${plantLabel} • task non completato`,
    href,
  };
}

async function notificationExistsToday(userId: string, type: "TASK" | "APPROVAL", title: string, href: string, startToday: Date) {
  const existing = await prisma.appNotification.findFirst({
    where: {
      userId,
      type,
      title,
      href,
      createdAt: {
        gte: startToday,
      },
    },
    select: { id: true },
  });

  return Boolean(existing);
}

export async function createDailyOperationalNotifications() {
  const { startToday, endToday, startTomorrow, endTomorrow } = getTimeWindows();

  const tasks = await prisma.task.findMany({
    where: {
      assignedToUserId: { not: null },
      status: { in: [TaskStatus.SCHEDULED, TaskStatus.NOTIFIED] },
      OR: [
        { dueDate: { lt: startToday } },
        { dueDate: { gte: startToday, lt: endToday } },
        { dueDate: { gte: startTomorrow, lt: endTomorrow } },
      ],
    },
    include: {
      plant: true,
      assignedTo: {
        include: {
          notificationPreference: true,
        },
      },
    },
  });

  let created = 0;
  let skipped = 0;

  for (const task of tasks) {
    const assignedUser = task.assignedTo;
    if (!assignedUser) {
      skipped += 1;
      continue;
    }

    const bucket = getTaskBucket(task.dueDate, startToday, endToday, startTomorrow, endTomorrow);
    if (!bucket) {
      skipped += 1;
      continue;
    }

    if (!isEnabledForBucket(assignedUser.notificationPreference, bucket)) {
      skipped += 1;
      continue;
    }

    const copy = buildTaskNotificationCopy(task, bucket);
    const exists = await notificationExistsToday(
      assignedUser.id,
      "TASK",
      copy.title,
      copy.href,
      startToday,
    );

    if (exists) {
      skipped += 1;
      continue;
    }

    await prisma.appNotification.create({
      data: {
        userId: assignedUser.id,
        type: "TASK",
        title: copy.title,
        message: copy.message,
        href: copy.href,
      },
    });

    await prisma.task.update({
      where: { id: task.id },
      data: { status: TaskStatus.NOTIFIED },
    });

    created += 1;
  }

  const pendingProposalCount = await prisma.taskProposal.count({
    where: { status: "PENDING" },
  });

  if (pendingProposalCount > 0) {
    const admins = await prisma.user.findMany({
      where: { role: UserRole.SUPER_ADMIN },
      include: {
        notificationPreference: true,
      },
    });

    for (const admin of admins) {
      if (admin.notificationPreference?.inAppEnabled === false) continue;
      if (admin.notificationPreference?.proposalUpdates === false) continue;

      const title = "Proposte in attesa di approvazione";
      const href = "/approvals";

      const exists = await notificationExistsToday(admin.id, "APPROVAL", title, href, startToday);
      if (exists) {
        skipped += 1;
        continue;
      }

      await prisma.appNotification.create({
        data: {
          userId: admin.id,
          type: "APPROVAL",
          title,
          message: `Hai ${pendingProposalCount} proposta/e da controllare.`,
          href,
        },
      });

      created += 1;
    }
  }

  return { created, skipped };
}
