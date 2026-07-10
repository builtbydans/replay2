import {
  BotIcon,
  CheckCircle2Icon,
  ClipboardCheckIcon,
  DatabaseIcon,
  FileClockIcon,
  KeyRoundIcon,
  SearchCheckIcon,
  ShieldCheckIcon,
  UserCheckIcon,
} from "lucide-react";
import Link from "next/link";

import { RecommendationCard } from "@/components/recommendations/recommendation-card";
import { PageHeader, PageShell } from "@/components/shared/page-shell";
import { SyntheticDataNotice } from "@/components/shared/synthetic-data-notice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AuditEvent, ReplayCase } from "@/types/clinical.types";
import { formatDateTime } from "@/utils/time";

const replaySteps = [
  "Patient context",
  "Evidence available",
  "AI investigation",
  "Recommendation",
  "Clinician action",
  "Receipt",
  "Later review",
];

export function ReplayDetail({ replay }: { replay: ReplayCase }) {
  return (
    <PageShell>
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/replays">Back to replay ledger</Link>
        </Button>
      </div>

      <PageHeader
        eyebrow="Decision replay trace"
        title={replay.title}
        description="A synthetic reconstruction of what was known, what the AI shell produced, what the clinician decided and what would be verified later."
      />

      <SyntheticDataNotice compact />

      <section className="replay-panel overflow-hidden">
        <div className="replay-panel-header">
          <p className="replay-kicker">Trace path</p>
          <h3 className="replay-section-title mt-1">
            Decision reconstruction sequence
          </h3>
        </div>
        <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-7">
          {replaySteps.map((step, index) => (
            <div
              key={step}
              className="rounded-lg border border-[var(--replay-border)] bg-white p-3 dark:bg-slate-900/50"
            >
              <span className="font-mono text-[11px] text-slate-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[390px_1fr]">
        <aside className="space-y-4">
          <InfoPanel
            icon={<FileClockIcon />}
            kicker="Patient and encounter"
            title="Context at decision time"
            detail={replay.patientContext}
          />

          <section className="replay-panel">
            <div className="replay-panel-header flex items-center justify-between gap-3">
              <div>
                <p className="replay-kicker">AI run metadata</p>
                <h3 className="replay-section-title mt-1">
                  Investigation envelope
                </h3>
              </div>
              <BotIcon className="size-4 text-slate-500" />
            </div>
            <div className="replay-panel-body space-y-3 text-sm">
              <MetadataRow label="Run ID" value={replay.aiRun.id} />
              <MetadataRow label="Model" value={replay.aiRun.modelLabel} />
              <MetadataRow label="Status" value={replay.aiRun.status} />
              <MetadataRow label="Requested by" value={replay.aiRun.requestedBy} />
              <MetadataRow
                label="Completed"
                value={
                  replay.aiRun.completedAt
                    ? formatDateTime(replay.aiRun.completedAt)
                    : "Not completed"
                }
              />
              <div className="border-t border-[var(--replay-border)] pt-3">
                <p className="text-sm font-medium">Limitations</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {replay.aiRun.limitations.map((limitation) => (
                    <li key={limitation}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="replay-panel">
            <div className="replay-panel-header flex items-center justify-between gap-3">
              <div>
                <p className="replay-kicker">Verification receipt</p>
                <h3 className="replay-section-title mt-1">
                  Placeholder attestation
                </h3>
              </div>
              <KeyRoundIcon className="size-4 text-slate-500" />
            </div>
            <div className="replay-panel-body space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-600 text-white">
                  {replay.verificationReceipt.status}
                </Badge>
              </div>
              <div>
                <p className="replay-subtle">Receipt hash</p>
                <p className="replay-hash mt-1">
                  {replay.verificationReceipt.receiptHash}
                </p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {replay.verificationReceipt.notes}
              </p>
            </div>
          </section>
        </aside>

        <section className="min-w-0 space-y-4">
          <TracePanel
            title="Evidence available at the time"
            kicker="Evidence timeline"
            events={replay.evidenceTimeline}
          />

          <RecommendationCard recommendation={replay.recommendation} compact />

          <section className="grid gap-4 lg:grid-cols-2">
            <InfoPanel
              icon={<UserCheckIcon />}
              kicker="Clinician action"
              title={replay.decision.decision}
              detail={replay.decisionRationale}
            />
            <InfoPanel
              icon={<CheckCircle2Icon />}
              kicker="Later review outcome"
              title="Review placeholder"
              detail={replay.laterReviewOutcome}
            />
          </section>

          <TracePanel
            title="Audit timeline"
            kicker="Replay event store"
            events={replay.auditTimeline}
          />
        </section>
      </section>
    </PageShell>
  );
}

function InfoPanel({
  icon,
  kicker,
  title,
  detail,
}: {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  detail: string;
}) {
  return (
    <section className="replay-panel p-4">
      <div className="flex gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
          {icon}
        </span>
        <div>
          <p className="replay-kicker">{kicker}</p>
          <h3 className="replay-section-title mt-1">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {detail}
          </p>
        </div>
      </div>
    </section>
  );
}

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="replay-subtle">{label}</p>
      <p className="mt-1 break-words font-medium">{value}</p>
    </div>
  );
}

function TracePanel({
  title,
  kicker,
  events,
}: {
  title: string;
  kicker: string;
  events: AuditEvent[];
}) {
  return (
    <section className="replay-panel">
      <div className="replay-panel-header flex items-center justify-between gap-3">
        <div>
          <p className="replay-kicker">{kicker}</p>
          <h3 className="replay-section-title mt-1">{title}</h3>
        </div>
        <Badge variant="outline" className="bg-white dark:bg-slate-950">
          {events.length} events
        </Badge>
      </div>
      <div className="replay-panel-body replay-timeline-line space-y-3">
        {events.map((event, index) => (
          <div key={event.id} className="relative grid grid-cols-[38px_1fr] gap-2">
            <div className="relative z-10 flex justify-center pt-1">
              <span className="flex size-8 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                {getTraceIcon(event.type)}
              </span>
            </div>
            <div className="replay-evidence">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">{event.title}</p>
                <span className="font-mono text-[11px] text-slate-400">
                  #{index + 1} · {event.id}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {event.description}
              </p>
              <p className="replay-subtle mt-2">
                {event.actor} · {formatDateTime(event.occurredAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function getTraceIcon(type: AuditEvent["type"]) {
  if (type === "AI_RUN_CREATED") {
    return <BotIcon className="size-4" />;
  }

  if (type === "RECEIPT_ATTACHED") {
    return <ShieldCheckIcon className="size-4" />;
  }

  if (type === "RECOMMENDATION_PRESENTED") {
    return <SearchCheckIcon className="size-4" />;
  }

  if (type === "CLINICIAN_DECISION_RECORDED") {
    return <ClipboardCheckIcon className="size-4" />;
  }

  return <DatabaseIcon className="size-4" />;
}

