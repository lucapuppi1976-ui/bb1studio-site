import type { ReactNode } from "react";
import { requireSuperAdmin } from "@/lib/authz";

type Props = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  await requireSuperAdmin();
  return <>{children}</>;
}
