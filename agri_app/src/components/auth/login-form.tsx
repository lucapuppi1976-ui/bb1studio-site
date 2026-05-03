"use client";

import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type LoginLabels = {
  email: string;
  password: string;
  invalidCredentials: string;
  signingIn: string;
  signIn: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
};

type Props = {
  callbackUrl?: string;
  labels: LoginLabels;
};

export function LoginForm({ callbackUrl = "/dashboard", labels }: Props) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const basePath = process.env.NEXT_PUBLIC_APP_BASE_PATH || "/agri_app";
  const finalCallbackUrl = useMemo(() => {
    if (callbackUrl.startsWith("http")) return callbackUrl;
    return `${basePath}${callbackUrl}`;
  }, [basePath, callbackUrl]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: finalCallbackUrl,
    });

    if (result?.error) {
      setError(labels.invalidCredentials);
      setLoading(false);
      return;
    }

    router.push(result?.url || finalCallbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="agri-card grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-stone-700">{labels.email}</span>
        <input type="email" name="email" required autoComplete="email" className="agri-input" placeholder={labels.emailPlaceholder} />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-stone-700">{labels.password}</span>
        <input type="password" name="password" required autoComplete="current-password" className="agri-input" placeholder={labels.passwordPlaceholder} />
      </label>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-900">
          {error}
        </div>
      ) : null}

      <button type="submit" disabled={loading} className="agri-button-primary px-5 py-3">
        {loading ? labels.signingIn : labels.signIn}
      </button>
    </form>
  );
}
