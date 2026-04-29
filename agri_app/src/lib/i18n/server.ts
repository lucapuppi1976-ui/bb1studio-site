import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, normalizeLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

function parseAcceptLanguage(value: string | null) {
  if (!value) return DEFAULT_LOCALE;

  const candidates = value
    .split(",")
    .map((part) => part.trim().split(";")[0])
    .filter(Boolean);

  for (const candidate of candidates) {
    const locale = normalizeLocale(candidate);
    if (locale !== DEFAULT_LOCALE || candidate.toLowerCase().startsWith(DEFAULT_LOCALE)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

export async function getRequestLocale() {
  const cookieStore = await cookies();
  const cookieLocale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  if (cookieStore.get(LOCALE_COOKIE)?.value) {
    return cookieLocale;
  }

  const headersList = await headers();
  return parseAcceptLanguage(headersList.get("accept-language"));
}

export async function getTranslations() {
  const locale = await getRequestLocale();

  return {
    locale,
    t: getDictionary(locale),
  };
}
