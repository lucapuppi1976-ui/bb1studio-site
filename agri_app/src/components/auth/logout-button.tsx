"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  const basePath = process.env.NEXT_PUBLIC_APP_BASE_PATH || "/agri_app";

  return (
    <button
      onClick={() => signOut({ callbackUrl: `${basePath}/login` })}
      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/5"
    >
      Logout
    </button>
  );
}
