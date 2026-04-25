"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/authz";

function asBool(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function asInt(value: FormDataEntryValue | null, fallback: number) {
  if (!value || typeof value !== "string" || !value.trim()) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export async function updateNotificationPreferences(formData: FormData) {
  const session = await requireUser();

  await prisma.notificationPreference.upsert({
    where: { userId: session.user.id },
    update: {
      inAppEnabled: asBool(formData.get("inAppEnabled")),
      emailEnabled: asBool(formData.get("emailEnabled")),
      taskDueToday: asBool(formData.get("taskDueToday")),
      taskDueTomorrow: asBool(formData.get("taskDueTomorrow")),
      overdueTasks: asBool(formData.get("overdueTasks")),
      proposalUpdates: asBool(formData.get("proposalUpdates")),
      systemMessages: asBool(formData.get("systemMessages")),
      dailyDigestHour: asInt(formData.get("dailyDigestHour"), 7),
      timezone: String(formData.get("timezone") || "Europe/Madrid").trim() || "Europe/Madrid",
    },
    create: {
      userId: session.user.id,
      inAppEnabled: asBool(formData.get("inAppEnabled")),
      emailEnabled: asBool(formData.get("emailEnabled")),
      taskDueToday: asBool(formData.get("taskDueToday")),
      taskDueTomorrow: asBool(formData.get("taskDueTomorrow")),
      overdueTasks: asBool(formData.get("overdueTasks")),
      proposalUpdates: asBool(formData.get("proposalUpdates")),
      systemMessages: asBool(formData.get("systemMessages")),
      dailyDigestHour: asInt(formData.get("dailyDigestHour"), 7),
      timezone: String(formData.get("timezone") || "Europe/Madrid").trim() || "Europe/Madrid",
    },
  });

  revalidatePath("/settings/notifications");
  revalidatePath("/notifications");
  revalidatePath("/today");
}
