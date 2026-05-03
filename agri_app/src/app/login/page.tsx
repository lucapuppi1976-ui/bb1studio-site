import { LoginForm } from "@/components/auth/login-form";
import { AppShell } from "@/components/app-shell";
import { getTranslations } from "@/lib/i18n/server";
import { getLoginProductionText } from "@/lib/i18n/login-production";

type LoginPageProps = { searchParams?: Promise<{ callbackUrl?: string | string[] }> };

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { t, locale } = await getTranslations();
  const loginCopy = getLoginProductionText(locale);
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const callbackParam = resolvedSearchParams?.callbackUrl;
  const callbackUrl = Array.isArray(callbackParam) ? callbackParam[0] : callbackParam || "/dashboard";

  return (
    <AppShell title={t.auth.loginTitle} eyebrow={t.auth.loginEyebrow}>
      <div className="mx-auto grid max-w-md gap-4">
        <LoginForm
          callbackUrl={callbackUrl}
          labels={{
            email: t.common.email,
            password: t.common.password,
            invalidCredentials: t.auth.invalidCredentials,
            signingIn: t.auth.signingIn,
            signIn: t.auth.signIn,
            emailPlaceholder: loginCopy.emailPlaceholder,
            passwordPlaceholder: loginCopy.passwordPlaceholder,
          }}
        />

        <section className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 text-sm leading-6 text-stone-700 shadow-sm ring-1 ring-black/5 backdrop-blur">
          <h2 className="font-semibold text-stone-950">{loginCopy.infoTitle}</h2>
          <p className="mt-2">{loginCopy.infoBody}</p>
          <p className="mt-2 text-stone-500">{loginCopy.contactAdmin}</p>
        </section>
      </div>
    </AppShell>
  );
}
