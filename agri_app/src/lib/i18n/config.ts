export const LOCALES = ["it", "es", "en", "sk", "fr", "de", "ru", "hu"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "it";

export const LOCALE_COOKIE = "agri_locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  it: "Italiano",
  es: "Español",
  en: "English",
  sk: "Slovenčina",
  fr: "Français",
  de: "Deutsch",
  ru: "Русский",
  hu: "Magyar",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function normalizeLocale(value: string | undefined | null): Locale {
  if (!value) return DEFAULT_LOCALE;

  const short = value.toLowerCase().split("-")[0];

  return isLocale(short) ? short : DEFAULT_LOCALE;
}

export function toDateLocale(locale: Locale) {
  const map: Record<Locale, string> = {
    it: "it-IT",
    es: "es-ES",
    en: "en-GB",
    sk: "sk-SK",
    fr: "fr-FR",
    de: "de-DE",
    ru: "ru-RU",
    hu: "hu-HU",
  };

  return map[locale] ?? map[DEFAULT_LOCALE];
}
