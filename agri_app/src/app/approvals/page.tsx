import { AppShell } from "@/components/app-shell";
import { getPendingProposals } from "@/lib/data/tasks";
import { approveProposal, rejectProposal } from "@/lib/actions/proposals";
import { requireSuperAdmin } from "@/lib/authz";

export default async function ApprovalsPage() {
  const session = await requireSuperAdmin();
  const proposals = await getPendingProposals();

  return (
    <AppShell title="Approvazioni" eyebrow="Super admin">
      {proposals.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">Nessuna proposta in attesa.</div>
      ) : (
        <div className="grid gap-4">
          {proposals.map((proposal) => (
            <article key={proposal.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">{proposal.type}</p>
                  <h2 className="mt-1 text-xl font-semibold">{proposal.title}</h2>
                  <p className="mt-1 text-sm text-white/60">
                    {proposal.plant.name || proposal.plant.species} • proposta di {proposal.proposedBy.name || proposal.proposedBy.email}
                  </p>
                </div>
                <p className="text-sm text-white/50">{new Date(proposal.scheduledFor).toLocaleDateString("it-IT")}</p>
              </div>

              <p className="mt-4 text-sm text-white/70">{proposal.notes || "—"}</p>

              <div className="mt-4 flex gap-3">
                <form action={approveProposal.bind(null, proposal.id, session.user.id)}>
                  <button className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
                    Approva
                  </button>
                </form>
                <form action={rejectProposal.bind(null, proposal.id, session.user.id)}>
                  <button className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70">
                    Rifiuta
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
