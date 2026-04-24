import { prisma } from "@/lib/prisma";

export async function getNotificationsForUser(userId: string) {
  return prisma.appNotification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUnreadNotificationsCount(userId: string) {
  return prisma.appNotification.count({
    where: { userId, readAt: null },
  });
}
