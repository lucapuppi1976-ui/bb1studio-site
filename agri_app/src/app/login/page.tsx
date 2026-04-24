import { LoginForm } from "@/components/auth/login-form";
import { AppShell } from "@/components/app-shell";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { callbackUrl?: string };
}) {
  return (
    <AppShell title="Login" eyebrow="Accesso protetto">
      <div className="mx-auto max-w-md">
        <LoginForm callbackUrl={searchParams?.callbackUrl || "/dashboard"} />
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
          <p>Seed sviluppo:</p>
          <p>admin@bb1studio.local / Admin123!</p>
          <p>operator@bb1studio.local / Operator123!</p>
        </div>
      </div>
    </AppShell>
  );
}
