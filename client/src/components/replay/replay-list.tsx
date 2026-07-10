import { ArrowRightIcon, DatabaseIcon, FileClockIcon } from "lucide-react";
import Link from "next/link";

import { PageHeader, PageShell } from "@/components/shared/page-shell";
import { SyntheticDataNotice } from "@/components/shared/synthetic-data-notice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ReplayCase } from "@/types/clinical.types";
import { formatDateTime } from "@/utils/time";

export function ReplayList({ replays }: { replays: ReplayCase[] }) {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Decision provenance"
        title="Decision replay ledger"
        description="Synthetic replay cases showing how patient context, evidence, AI metadata, clinician decision and receipt placeholders will be inspected later."
      />
      <SyntheticDataNotice />

      <section className="replay-panel overflow-hidden">
        <div className="replay-panel-header flex items-center justify-between gap-3">
          <div>
            <p className="replay-kicker">Replay records</p>
            <h3 className="replay-section-title mt-1">
              Reviewable decision traces
            </h3>
          </div>
          <Badge variant="outline" className="bg-white dark:bg-slate-950">
            {replays.length} replay{replays.length === 1 ? "" : "s"}
          </Badge>
        </div>
        <div className="divide-y divide-[var(--replay-border)]">
          {replays.map((replay) => (
            <div
              key={replay.id}
              className="grid gap-4 p-4 lg:grid-cols-[1fr_260px_180px]"
            >
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                  <DatabaseIcon className="size-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-950 dark:text-slate-50">
                      {replay.title}
                    </h3>
                    <span className="font-mono text-[11px] text-slate-400">
                      {replay.id}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {replay.patientContext}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-[var(--replay-border)] bg-white p-3 text-sm dark:bg-slate-900/50">
                <p className="replay-subtle">Clinician decision</p>
                <p className="mt-1 font-medium">{replay.decision.decision}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {replay.decision.decidedAt
                    ? formatDateTime(replay.decision.decidedAt)
                    : "Pending"}
                </p>
              </div>

              <div className="flex items-center justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/replays/${replay.id}`}>
                    Open trace
                    <ArrowRightIcon />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="replay-panel-dashed p-4">
        <div className="flex items-start gap-3">
          <FileClockIcon className="mt-0.5 size-4 text-slate-500" />
          <div>
            <p className="text-sm font-medium">Replay reconstruction is not implemented</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              This ledger displays fixture traces only. Real event-store
              reconstruction, immutable snapshots and receipt verification are
              future learning tasks.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

