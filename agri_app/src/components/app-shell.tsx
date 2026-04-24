import type { ReactNode } from "react";

type Props = {
  title: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AppShell({ title, eyebrow, actions, children }: Props) {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            {eyebrow ? <p className="text-sm text-white/50">{eyebrow}</p> : null}
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {children}
      </div>
    </main>
  );
}
