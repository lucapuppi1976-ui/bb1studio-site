import { prisma } from "@/lib/prisma";

export async function getNotificationsForUser(userId: string, filter: "all" | "unread" = "all") {
  return prisma.appNotification.findMany({
    where: {
      userId,
      ...(filter === "unread" ? { readAt: null } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUnreadNotificationsCount(userId: string) {
  return prisma.appNotification.count({
    where: { userId, readAt: null },
  });
}

export async function getNotificationPreferenceForUser(userId: string) {
  return prisma.notificationPreference.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
}
