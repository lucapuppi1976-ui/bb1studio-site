import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { routes } from "@/lib/app-routes";

export async function getCurrentSession() {
  return getServerSession(authOptions);
}

export async function requireUser() {
  const session = await getCurrentSession();
  if (!session?.user) {
    redirect(routes.login);
  }
  return session;
}

export async function requireSuperAdmin() {
  const session = await requireUser();
  if (session.user.role !== UserRole.SUPER_ADMIN) {
    redirect(routes.forbidden);
  }
  return session;
}

export function isSuperAdmin(role?: UserRole | null) {
  return role === UserRole.SUPER_ADMIN;
}
