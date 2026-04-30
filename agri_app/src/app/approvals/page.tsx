import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getApprovalProposalCounts, getApprovalProposals } from "@/lib/data/tasks";
import { approveProposal, rejectProposal } from "@/lib/actions/proposals";
import { requireSuperAdmin } from "@/lib/authz";
import { routes } from "@/lib/app-routes";
import { getTranslations } from "@/lib/i18n/server";
import { toDateLocale } from "@/lib/i18n/config";
import { formatInterventionType } from "@/lib/i18n/labels";
import { formatProposalStatus, getApprovalsWorkflowText, type ApprovalStatusFilter } from "@/lib/i18n/approvals-workflow";

type PageProps = {
  searchParams?: Promise<{
    status?: string | string[] | undefined;
  }>;
};

const STATUS_FILTERS: ApprovalStatusFilter[] = ["ALL", "PENDING", "APPROVED", "REJECTED"];

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeStatus(value: string | undefined): ApprovalStatusFilter {
  if (value === "PENDING" || value === "APPROVED" || value === "REJECTED") {
    return value;
  }

  return "ALL";
}

function statusHref(status: ApprovalStatusFilter) {
  return status === "ALL" ? routes.approvals : `${routes.approvals}?status=${status}`;
}

export default async function ApprovalsPage({ searchParams }: PageProps) {
  const session = await requireSuperAdmin();
  const { locale } = await getTranslations();
  const dateLocale = toDateLocale(locale);
  const copy = getApprovalsWorkflowText(locale);
  const params = searchParams ? await searchParams : undefined;
  const activeStatus = normalizeStatus(one(params?.status));

  const [counts, proposals] = await Promise.all([
    getApprovalProposalCounts(),
    getApprovalProposals(activeStatus === "ALL" ? undefined : activeStatus),
  ]);

  const stats = [
    { label: copy.stats.total, value: counts.total, href: statusHref("ALL") },
    { label: copy.stats.pending, value: counts.pending, href: statusHref("PENDING") },
    { label: copy.stats.approved, value: counts.approved, href: statusHref("APPROVED") },
    { label: copy.stats.rejected, value: counts.rejected, href: statusHref("REJECTED") },
  ];

  const emptyMessage = activeStatus === "ALL" ? copy.empty.all : copy.empty[activeStatus.toLowerCase() as "pending" | "approved" | "rejected"];

  return (
    <AppShell title={copy.page.title} eyebrow={copy.page.eyebrow}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Link key={item.label} href={item.href} className="agri-card transition hover:-translate-y-0.5 hover:bg-white">
            <p className="text-sm font-medium text-stone-500">{item.label}</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-emerald-950">{item.value}</p>
          </Link>
        ))}
      </div>

      <section className="mt-6 agri-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-3xl text-sm leading-6 text-stone-600">{copy.page.description}</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {STATUS_FILTERS.map((status) => {
              const active = activeStatus === status;
              return (
                <Link
                  key={status}
                  href={statusHref(status)}
                  className={active ? "whitespace-nowrap rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white" : "whitespace-nowrap rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"}
                >
                  {copy.filters[status]}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {proposals.length === 0 ? (
        <div className="mt-6 agri-card text-stone-600">{emptyMessage}</div>
      ) : (
        <div className="mt-6 grid gap-4">
          {proposals.map((proposal) => {
            const pending = proposal.status === "PENDING";
            const plantLabel = proposal.plant.name || proposal.plant.species || proposal.plant.code;
            const proposedBy = proposal.proposedBy.name || proposal.proposedBy.email;
            const reviewedBy = proposal.reviewedBy?.name || proposal.reviewedBy?.email;

            return (
              <article key={proposal.id} className="agri-card">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">
                      {formatProposalStatus(proposal.status, locale)} · {formatInterventionType(proposal.type, locale)}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-stone-950">{proposal.title}</h2>
                    <div className="mt-3 grid gap-2 text-sm text-stone-600 sm:grid-cols-2 lg:grid-cols-3">
                      <p><span className="font-semibold text-stone-800">{copy.fields.plant}:</span> {plantLabel}</p>
                      <p><span className="font-semibold text-stone-800">{copy.fields.activity}:</span> {proposal.task.title}</p>
                      <p><span className="font-semibold text-stone-800">{copy.fields.proposedBy}:</span> {proposedBy}</p>
                      <p><span className="font-semibold text-stone-800">{copy.fields.proposedFor}:</span> {new Date(proposal.scheduledFor).toLocaleDateString(dateLocale)}</p>
                      <p><span className="font-semibold text-stone-800">{copy.fields.createdAt}:</span> {new Date(proposal.createdAt).toLocaleDateString(dateLocale)}</p>
                      <p><span className="font-semibold text-stone-800">{copy.fields.reviewedBy}:</span> {reviewedBy || "—"}</p>
                    </div>
                  </div>
                  <span className={pending ? "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900" : "rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-700"}>
                    {formatProposalStatus(proposal.status, locale)}
                  </span>
                </div>

                <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-stone-700">
                  <p className="font-semibold text-stone-900">{copy.fields.notes}</p>
                  <p className="mt-1">{proposal.notes || copy.empty.notes}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={`/tasks/${proposal.taskId}`} className="agri-button-secondary">{copy.actions.openActivity}</Link>
                  <Link href={`/plants/${proposal.plantId}`} className="agri-button-secondary">{copy.actions.openPlant}</Link>
                  {pending ? (
                    <>
                      <form action={approveProposal.bind(null, proposal.id, session.user.id)}>
                        <button className="agri-button-primary">{copy.actions.approve}</button>
                      </form>
                      <form action={rejectProposal.bind(null, proposal.id, session.user.id)}>
                        <button className="agri-button-secondary">{copy.actions.reject}</button>
                      </form>
                    </>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
