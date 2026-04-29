import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MainNav } from "@/components/main-nav";
import { AuthSessionProvider } from "@/components/auth/auth-session-provider";
import { OfflineSyncProvider } from "@/components/offline/offline-sync-provider";
import { RegisterServiceWorker } from "@/components/pwa/register-service-worker";
import { getTranslations } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Agri App",
  description: "Gestione piante, interventi, attività e workflow agricoli.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [session, { locale }] = await Promise.all([
    getServerSession(authOptions),
    getTranslations(),
  ]);

  return (
    <html lang={locale}>
      <body>
        <AuthSessionProvider>
          <RegisterServiceWorker />
          <OfflineSyncProvider />
          <MainNav session={session} />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
