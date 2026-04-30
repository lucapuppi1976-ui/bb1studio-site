import { prisma } from "@/lib/prisma";

function startOfToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start;
}

export async function getNotificationsForUser(userId: string) {
  return prisma.appNotification.findMany({
    where: { userId },
    orderBy: [{ readAt: "asc" }, { createdAt: "desc" }],
    take: 50,
  });
}

export async function getUnreadNotificationsCount(userId: string) {
  return prisma.appNotification.count({
    where: { userId, readAt: null },
  });
}

export async function getNotificationsCreatedTodayCount(userId: string) {
  return prisma.appNotification.count({
    where: {
      userId,
      createdAt: {
        gte: startOfToday(),
      },
    },
  });
}

export async function getNotificationCenterData(userId: string) {
  const [notifications, totalCount, unreadCount, todayCount, taskCount, approvalCount] = await prisma.$transaction([
    prisma.appNotification.findMany({
      where: { userId },
      orderBy: [{ readAt: "asc" }, { createdAt: "desc" }],
      take: 100,
    }),
    prisma.appNotification.count({
      where: { userId },
    }),
    prisma.appNotification.count({
      where: { userId, readAt: null },
    }),
    prisma.appNotification.count({
      where: {
        userId,
        createdAt: {
          gte: startOfToday(),
        },
      },
    }),
    prisma.appNotification.count({
      where: { userId, type: "TASK" },
    }),
    prisma.appNotification.count({
      where: { userId, type: "APPROVAL" },
    }),
  ]);

  return {
    notifications,
    totalCount,
    unreadCount,
    todayCount,
    taskCount,
    approvalCount,
  };
}
