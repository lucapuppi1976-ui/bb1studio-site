import { AppShell } from "@/components/app-shell";
import { getPendingProposals } from "@/lib/data/tasks";
import { approveProposal, rejectProposal } from "@/lib/actions/proposals";
import { requireSuperAdmin } from "@/lib/authz";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatInterventionType } from "@/lib/i18n/labels";

export default async function ApprovalsPage() {
  const session = await requireSuperAdmin();
  const { locale, t } = await getTranslations();
  const dateLocale = toDateLocale(locale);
  const proposals = await getPendingProposals();

  return (
    <AppShell title={t.approvalsPage.title} eyebrow={t.approvalsPage.eyebrow}>
      {proposals.length === 0 ? (
        <div className="agri-card text-stone-600">{t.approvalsPage.empty}</div>
      ) : (
        <div className="grid gap-4">
          {proposals.map((proposal) => (
            <article key={proposal.id} className="agri-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">{formatInterventionType(proposal.type, locale)}</p>
                  <h2 className="mt-1 text-xl font-semibold text-stone-950">{proposal.title}</h2>
                  <p className="mt-1 text-sm text-stone-600">{proposal.plant.name || proposal.plant.species} · {t.approvalsPage.proposedBy} {proposal.proposedBy.name || proposal.proposedBy.email}</p>
                </div>
                <p className="text-sm text-stone-500">{new Date(proposal.scheduledFor).toLocaleDateString(dateLocale)}</p>
              </div>
              <p className="mt-4 text-sm text-stone-600">{proposal.notes || "—"}</p>
              <div className="mt-4 flex gap-3">
                <form action={approveProposal.bind(null, proposal.id, session.user.id)}><button className="agri-button-primary">{t.approvalsPage.approve}</button></form>
                <form action={rejectProposal.bind(null, proposal.id, session.user.id)}><button className="agri-button-secondary">{t.approvalsPage.reject}</button></form>
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
