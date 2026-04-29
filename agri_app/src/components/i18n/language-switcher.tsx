"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, LOCALE_LABELS, LOCALES, type Locale } from "@/lib/i18n/config";

type Props = {
  currentLocale: Locale;
  label: string;
};

export function LanguageSwitcher({ currentLocale, label }: Props) {
  const router = useRouter();

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <label className="flex min-h-11 min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-2 text-sm text-white/75 sm:px-3">
      <span className="sr-only">{label}</span>
      <select
        value={currentLocale}
        onChange={onChange}
        className="max-w-[7.5rem] truncate bg-transparent text-sm font-medium text-white outline-none sm:max-w-[11rem] [&_option]:bg-stone-950 [&_option]:text-white"
        aria-label={label}
      >
        {LOCALES.map((locale) => (
          <option key={locale} value={locale}>
            {LOCALE_LABELS[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}
