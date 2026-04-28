import type { ReactNode } from "react";
import { requireSuperAdmin } from "@/lib/auth/guards";

type Props = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  await requireSuperAdmin();
  return <>{children}</>;
}
