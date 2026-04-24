"use client";

import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  callbackUrl?: string;
};

export function LoginForm({ callbackUrl = "/dashboard" }: Props) {
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
      setError("Credenziali non valide.");
      setLoading(false);
      return;
    }

    router.push(result?.url || finalCallbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      <label className="grid gap-2">
        <span className="text-sm text-white/70">Email</span>
        <input
          type="email"
          name="email"
          required
          className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          placeholder="admin@bb1studio.local"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-white/70">Password</span>
        <input
          type="password"
          name="password"
          required
          className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none"
          placeholder="••••••••"
        />
      </label>

      {error ? (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Accesso..." : "Entra"}
      </button>
    </form>
  );
}
