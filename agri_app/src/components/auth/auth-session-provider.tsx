"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function AuthSessionProvider({ children }: Props) {
  const basePath = process.env.NEXT_PUBLIC_APP_BASE_PATH || "/agri_app";
  return <SessionProvider basePath={`${basePath}/api/auth`}>{children}</SessionProvider>;
}
