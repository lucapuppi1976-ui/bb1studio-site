import type { ReactNode } from "react";

type Props = {
  title: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AppShell({ title, eyebrow, actions, children }: Props) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(187,247,208,0.16),transparent_34%),linear-gradient(180deg,#132017_0%,#0f1711_48%,#0a0f0c_100%)] px-3 pb-28 pt-5 text-white sm:px-6 sm:pb-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-[0_18px_56px_rgba(28,37,25,0.10)] ring-1 ring-black/5 backdrop-blur sm:mb-8 sm:rounded-[2rem] sm:p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="min-w-0 max-w-3xl">
              {eyebrow ? (
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-emerald-800/70 sm:text-xs sm:tracking-[0.18em]">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="mt-2 break-words text-2xl font-semibold leading-tight tracking-tight text-stone-950 sm:text-3xl md:text-4xl">
                {title}
              </h1>
            </div>

            {actions ? (
              <div className="grid w-full gap-2 sm:w-auto sm:auto-cols-max sm:grid-flow-col sm:items-center sm:justify-end [&_a]:w-full [&_button]:w-full sm:[&_a]:w-auto sm:[&_button]:w-auto">
                {actions}
              </div>
            ) : null}
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
