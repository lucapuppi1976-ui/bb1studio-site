import { LoginForm } from "@/components/auth/login-form";
import { AppShell } from "@/components/app-shell";
import { showDevSeedHints } from "@/lib/env.server";
import { getTranslations } from "@/lib/i18n/server";

type LoginPageProps = { searchParams?: Promise<{ callbackUrl?: string | string[] }> };

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { t } = await getTranslations();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const callbackParam = resolvedSearchParams?.callbackUrl;
  const callbackUrl = Array.isArray(callbackParam) ? callbackParam[0] : callbackParam || "/dashboard";

  return (
    <AppShell title={t.auth.loginTitle} eyebrow={t.auth.loginEyebrow}>
      <div className="mx-auto max-w-md">
        <LoginForm callbackUrl={callbackUrl} labels={{ email: t.common.email, password: t.common.password, invalidCredentials: t.auth.invalidCredentials, signingIn: t.auth.signingIn, signIn: t.auth.signIn }} />
        {showDevSeedHints ? (
          <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm">
            <p className="font-semibold">{t.auth.devSeedTitle}</p>
            <p>admin@bb1studio.local / Admin123!</p>
            <p>operator@bb1studio.local / Operator123!</p>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
