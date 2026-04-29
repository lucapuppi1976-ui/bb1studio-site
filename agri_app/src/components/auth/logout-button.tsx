"use client";

import { signOut } from "next-auth/react";

type Props = {
  label: string;
};

export function LogoutButton({ label }: Props) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_APP_BASE_PATH || "/agri_app"}/login` })}
      className="rounded-2xl border border-white/10 px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
    >
      {label}
    </button>
  );
}
