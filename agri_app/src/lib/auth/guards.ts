import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { routes } from "@/lib/app-routes";

export type AppUserRole = "SUPER_ADMIN" | "OPERATOR";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(routes.login);
  }

  return session;
}

export async function requireRole(...allowedRoles: AppUserRole[]) {
  const session = await requireAuth();
  const role = session.user.role as AppUserRole | undefined;

  if (!role || !allowedRoles.includes(role)) {
    redirect(routes.forbidden);
  }

  return session;
}

export async function requireSuperAdmin() {
  return requireRole("SUPER_ADMIN");
}

export async function requireOperatorOrAdmin() {
  return requireRole("SUPER_ADMIN", "OPERATOR");
}
