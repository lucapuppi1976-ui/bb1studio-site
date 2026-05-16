export type AgriAppLanguageCode = "it" | "en" | "es" | "fr" | "de" | "pt";

export interface AgriAppLanguageDefinition {
  code: AgriAppLanguageCode;
  label: string;
  nativeLabel: string;
  enabledForUat: boolean;
  fallback: AgriAppLanguageCode;
}

export const AGRI_APP_SUPPORTED_LANGUAGES: AgriAppLanguageDefinition[] = [
  {
    code: "it",
    label: "Italian",
    nativeLabel: "Italiano",
    enabledForUat: true,
    fallback: "en",
  },
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    enabledForUat: true,
    fallback: "it",
  },
  {
    code: "es",
    label: "Spanish",
    nativeLabel: "Español",
    enabledForUat: true,
    fallback: "en",
  },
  {
    code: "fr",
    label: "French",
    nativeLabel: "Français",
    enabledForUat: true,
    fallback: "en",
  },
  {
    code: "de",
    label: "German",
    nativeLabel: "Deutsch",
    enabledForUat: true,
    fallback: "en",
  },
  {
    code: "pt",
    label: "Portuguese",
    nativeLabel: "Português",
    enabledForUat: true,
    fallback: "en",
  },
];

export const AGRI_APP_DEFAULT_LANGUAGE: AgriAppLanguageCode = "it";

export function getAgriAppLanguageCodes(): AgriAppLanguageCode[] {
  return AGRI_APP_SUPPORTED_LANGUAGES.map((language) => language.code);
}
