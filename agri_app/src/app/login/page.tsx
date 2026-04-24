import { LoginForm } from "@/components/auth/login-form";
import { AppShell } from "@/components/app-shell";

type LoginPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string | string[] | undefined;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const callbackParam = resolvedSearchParams?.callbackUrl;

  const callbackUrl = Array.isArray(callbackParam)
    ? callbackParam[0]
    : callbackParam || "/dashboard";

  return (
    <AppShell title="Login" eyebrow="Accesso protetto">
      <div className="mx-auto max-w-md">
        <LoginForm callbackUrl={callbackUrl} />
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
          <p>Seed sviluppo:</p>
          <p>admin@bb1studio.local / Admin123!</p>
          <p>operator@bb1studio.local / Operator123!</p>
        </div>
      </div>
    </AppShell>
  );
}