import type { ReactNode } from "react";

type Props = {
  title: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AppShell({ title, eyebrow, actions, children }: Props) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(187,247,208,0.16),transparent_34%),linear-gradient(180deg,#132017_0%,#0f1711_48%,#0a0f0c_100%)] px-4 py-8 text-white sm:px-6 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_24px_80px_rgba(28,37,25,0.10)] ring-1 ring-black/5 backdrop-blur md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-3xl">
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/70">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">
                {title}
              </h1>
            </div>
            {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
