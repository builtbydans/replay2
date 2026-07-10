import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="replay-page">{children}</main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="replay-panel flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
      <div className="max-w-3xl space-y-2">
        {eyebrow ? (
          <p className="replay-kicker">{eyebrow}</p>
        ) : null}
        <div className="space-y-1">
          <h2 className="replay-title">{title}</h2>
          <p className="replay-copy">
            {description}
          </p>
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </section>
  );
}
