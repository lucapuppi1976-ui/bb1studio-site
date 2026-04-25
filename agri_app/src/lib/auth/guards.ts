import { auth } from "@/auth";
import { redirect } from "next/navigation";

export type AppUserRole = "SUPER_ADMIN" | "OPERATOR";

export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function requireRole(...allowedRoles: AppUserRole[]) {
  const session = await requireAuth();
  const role = session.user.role as AppUserRole | undefined;

  if (!role || !allowedRoles.includes(role)) {
    redirect("/forbidden");
  }

  return session;
}

export async function requireSuperAdmin() {
  return requireRole("SUPER_ADMIN");
}

export async function requireOperatorOrAdmin() {
  return requireRole("SUPER_ADMIN", "OPERATOR");
}
