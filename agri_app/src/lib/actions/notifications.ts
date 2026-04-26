"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/authz";
import { routes } from "@/lib/app-routes";

export async function markNotificationRead(notificationId: string) {
  const session = await requireUser();

  await prisma.appNotification.updateMany({
    where: {
      id: notificationId,
      userId: session.user.id,
    },
    data: { readAt: new Date() },
  });

  revalidatePath(routes.notifications);
  revalidatePath(routes.today);
}

export async function markAllNotificationsRead() {
  const session = await requireUser();

  await prisma.appNotification.updateMany({
    where: { userId: session.user.id, readAt: null },
    data: { readAt: new Date() },
  });

  revalidatePath(routes.notifications);
  revalidatePath(routes.today);
}
