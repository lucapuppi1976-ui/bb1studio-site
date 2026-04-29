"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/guards";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, normalizeLocale } from "@/lib/i18n/config";

function asBool(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function asHour(value: FormDataEntryValue | null) {
  const raw = typeof value === "string" ? Number.parseInt(value, 10) : NaN;
  if (Number.isNaN(raw)) return 7;
  if (raw < 0) return 0;
  if (raw > 23) return 23;
  return raw;
}

function asTimezone(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.trim()) return "Europe/Madrid";
  return value.trim();
}

export async function saveNotificationPreferences(formData: FormData) {
  const session = await requireAuth();
  const locale = normalizeLocale(String(formData.get("locale") || ""));
  const data = {
    inAppEnabled: asBool(formData.get("inAppEnabled")),
    emailEnabled: asBool(formData.get("emailEnabled")),
    taskDueToday: asBool(formData.get("taskDueToday")),
    taskDueTomorrow: asBool(formData.get("taskDueTomorrow")),
    overdueTasks: asBool(formData.get("overdueTasks")),
    proposalUpdates: asBool(formData.get("proposalUpdates")),
    systemMessages: asBool(formData.get("systemMessages")),
    dailyDigestHour: asHour(formData.get("dailyDigestHour")),
    timezone: asTimezone(formData.get("timezone")),
    locale,
  };

  await prisma.notificationPreference.upsert({
    where: { userId: session.user.id },
    update: data,
    create: { userId: session.user.id, ...data },
  });

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  revalidatePath("/settings/notifications");
  redirect("/settings/notifications?saved=1");
}
