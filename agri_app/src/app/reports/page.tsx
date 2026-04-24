import { AppShell } from "@/components/app-shell";
import { getReportStats } from "@/lib/data/reports";
import { requireSuperAdmin } from "@/lib/authz";
import { withBasePath } from "@/lib/app-config";

export default async function ReportsPage() {
  await requireSuperAdmin();
  const stats = await getReportStats();

  return (
    <AppShell title="Report" eyebrow="Super admin">
      <div className="grid gap-4 md:grid-cols-5">
        {[
          ["Piante", stats.plants],
          ["Interventi", stats.interventions],
          ["Task", stats.tasks],
          ["Notifiche", stats.notifications],
          ["Proposte pending", stats.pendingProposals],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/50">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <a href={withBasePath("/api/export/plants")} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Export CSV piante</h2>
        </a>
        <a href={withBasePath("/api/export/interventions")} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Export CSV interventi</h2>
        </a>
        <a href={withBasePath("/api/export/tasks")} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">Export CSV task</h2>
        </a>
      </div>
    </AppShell>
  );
}
