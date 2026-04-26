import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/guards";

export async function getMyNotificationPreferences() {
  const session = await requireAuth();
  const userId = session.user.id;

  const preference = await prisma.notificationPreference.findUnique({
    where: { userId },
  });

  if (preference) {
    return preference;
  }

  return {
    id: "local-default",
    userId,
    inAppEnabled: true,
    emailEnabled: false,
    taskDueToday: true,
    taskDueTomorrow: true,
    overdueTasks: true,
    proposalUpdates: true,
    systemMessages: true,
    dailyDigestHour: 7,
    timezone: "Europe/Madrid",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
