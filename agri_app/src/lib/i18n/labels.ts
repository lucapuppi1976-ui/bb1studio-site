import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

function lookup(map: Record<string, string>, value: string | null | undefined) {
  if (!value) return "—";
  return map[value] ?? value;
}

export function formatRole(value: string | null | undefined, locale: Locale) {
  return lookup(getDictionary(locale).labels.roles, value);
}

export function formatTaskPriority(value: string | null | undefined, locale: Locale) {
  return lookup(getDictionary(locale).labels.priorities, value);
}

export function formatTaskStatus(value: string | null | undefined, locale: Locale) {
  return lookup(getDictionary(locale).labels.taskStatuses, value);
}

export function formatRecurrenceType(value: string | null | undefined, locale: Locale, intervalDays?: number | null) {
  const label = lookup(getDictionary(locale).labels.recurrence, value);
  return label.replace("{days}", String(intervalDays ?? 1));
}

export function formatNotificationType(value: string | null | undefined, locale: Locale) {
  return lookup(getDictionary(locale).labels.notificationTypes, value);
}

export function formatPlantType(value: string | null | undefined, locale: Locale) {
  return lookup(getDictionary(locale).labels.plantTypes, value);
}

export function formatEnvironment(value: string | null | undefined, locale: Locale) {
  return lookup(getDictionary(locale).labels.environments, value);
}

export function formatPlantStatus(value: string | null | undefined, locale: Locale) {
  return lookup(getDictionary(locale).labels.plantStatuses, value);
}

export function formatInterventionType(value: string | null | undefined, locale: Locale) {
  return lookup(getDictionary(locale).labels.interventionTypes, value);
}
