import {
  BotIcon,
  CheckCircle2Icon,
  ClipboardCheckIcon,
  FileClockIcon,
  FileSearchIcon,
  GaugeIcon,
  HeartPulseIcon,
  ShieldAlertIcon,
} from "lucide-react";
import Link from "next/link";

import { ThroughputChart } from "@/components/dashboard/throughput-chart";
import {
  PatientStatusBadge,
  PriorityBadge,
} from "@/components/shared/domain-badges";
import { PageHeader, PageShell } from "@/components/shared/page-shell";
import { SyntheticDataNotice } from "@/components/shared/synthetic-data-notice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DashboardShellDto } from "@/types/dashboard.types";
import { formatClock, formatWaitingTime } from "@/utils/time";

export function DashboardShell({ data }: { data: DashboardShellDto }) {
  const attentionItems = [
    {
      title: "Immediate queue pressure",
      detail: `${data.urgentCases} urgent or immediate patients are visible in the synthetic queue.`,
      icon: ShieldAlertIcon,
      tone: "risk",
      href: "/patients",
    },
    {
      title: "Clinician decision required",
      detail: `${data.patientsAwaitingDiagnosis} patient awaiting diagnosis and ${data.patientsAwaitingDischarge} awaiting discharge review.`,
      icon: ClipboardCheckIcon,
      tone: "agent",
      href: "/recommendations",
    },
    {
      title: "Investigation evidence pending",
      detail: `${data.patientsAwaitingInvestigation} patient waiting for investigation workflow progression.`,
      icon: FileSearchIcon,
      tone: "warn",
      href: "/encounters/enc-002",
    },
    {
      title: "Replay review available",
      detail: "A synthetic respiratory escalation decision is ready for trace review.",
      icon: FileClockIcon,
      tone: "verified",
      href: "/replays/replay-001",
    },
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Replay command surface"
        title="Clinical evidence and decision oversight"
        description="A synthetic operational view of workload, recommendations, investigation evidence and replay-ready decisions."
        action={
          <Button asChild>
            <Link href="/patients">
              <HeartPulseIcon />
              Open patient queue
            </Link>
          </Button>
        }
      />

      <SyntheticDataNotice />

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="replay-panel overflow-hidden">
          <div className="replay-panel-header flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="replay-kicker">Requires attention</p>
              <h3 className="replay-section-title mt-1">
                Clinical decision board
              </h3>
            </div>
            <Badge className="bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
              Average wait {formatWaitingTime(data.averageWaitingMinutes)}
            </Badge>
          </div>
          <div className="grid gap-3 p-4 md:grid-cols-2">
            {attentionItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-lg border border-[var(--replay-border)] bg-white p-4 transition-colors hover:border-[var(--replay-border-strong)] hover:bg-slate-50 dark:bg-slate-900/50 dark:hover:bg-slate-900"
              >
                <div className="flex items-start gap-3">
                  <span className={getAttentionTone(item.tone)}>
                    <item.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="replay-panel">
          <div className="replay-panel-header">
            <p className="replay-kicker">Workload signal</p>
            <h3 className="replay-section-title mt-1">Queue composition</h3>
          </div>
          <div className="replay-panel-body space-y-3">
            {data.statusMetrics.map((metric) => (
              <div
                key={metric.status}
                className="flex items-center justify-between gap-3 rounded-lg border border-[var(--replay-border)] bg-white px-3 py-2 dark:bg-slate-900/50"
              >
                <PatientStatusBadge status={metric.status} />
                <span className="font-mono text-sm font-semibold tabular-nums">
                  {metric.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="replay-panel overflow-hidden">
          <div className="replay-panel-header flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="replay-kicker">Operational queue</p>
              <h3 className="replay-section-title mt-1">
                Current patient movement
              </h3>
              <p className="replay-subtle mt-1">
                Rows show the next clinical reason to open the record.
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/patients">
                <HeartPulseIcon />
                Open queue
              </Link>
            </Button>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Wait</TableHead>
                    <TableHead>Clinician</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.currentQueue.map((item) => (
                    <TableRow key={item.patientId}>
                      <TableCell>
                        <Link
                          href={`/patients/${item.patientId}`}
                          className="font-medium underline-offset-4 hover:underline"
                        >
                          {item.patientName}
                        </Link>
                        <p className="text-xs text-slate-500">
                          {item.presentingComplaint}
                        </p>
                      </TableCell>
                      <TableCell>
                        <PatientStatusBadge status={item.status} />
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={item.priority} />
                      </TableCell>
                      <TableCell>
                        {formatWaitingTime(item.waitingMinutes)}
                      </TableCell>
                      <TableCell>{item.assignedClinician}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="replay-panel">
          <div className="replay-panel-header">
            <p className="replay-kicker">AI-assisted investigation</p>
            <h3 className="replay-section-title mt-1">Recent trace events</h3>
          </div>
          <div className="replay-panel-body replay-timeline-line space-y-3">
            {data.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="relative grid grid-cols-[38px_1fr] gap-2"
              >
                <div className="relative z-10 flex justify-center pt-1">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm dark:bg-slate-100 dark:text-slate-950">
                    {activity.title.includes("AI") ? (
                      <BotIcon className="size-4" />
                    ) : activity.title.includes("decision") ? (
                      <ClipboardCheckIcon className="size-4" />
                    ) : (
                      <CheckCircle2Icon className="size-4" />
                    )}
                  </span>
                </div>
                <div className="rounded-lg border border-[var(--replay-border)] bg-white p-3 dark:bg-slate-900/50">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <span className="font-mono text-[11px] text-slate-400">
                      {formatClock(activity.timestamp)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {activity.detail}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {activity.actor}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="replay-panel">
          <div className="replay-panel-header">
            <p className="replay-kicker">Priority mix</p>
            <h3 className="replay-section-title mt-1">Urgency indicators</h3>
          </div>
          <div className="replay-panel-body grid gap-3 sm:grid-cols-2">
            {data.priorityMetrics.map((metric) => (
              <div key={metric.priority} className="replay-metric">
                <PriorityBadge priority={metric.priority} />
                <p className="mt-3 font-mono text-3xl font-semibold tabular-nums">
                  {metric.count}
                </p>
                <p className="replay-subtle mt-1">patients in queue</p>
              </div>
            ))}
          </div>
        </div>

        <div className="replay-panel">
          <div className="replay-panel-header flex items-start justify-between gap-3">
            <div>
              <p className="replay-kicker">Queue movement</p>
              <h3 className="replay-section-title mt-1">
                Arrivals and discharges
              </h3>
            </div>
            <GaugeIcon className="size-4 text-slate-500" />
          </div>
          <div className="replay-panel-body">
            <p className="replay-subtle mb-3">
              Static chart data keeps the shell independent of backend
              aggregation.
            </p>
            <ThroughputChart data={data.throughput} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function getAttentionTone(tone: string) {
  if (tone === "risk") {
    return "flex size-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600 ring-1 ring-rose-100 dark:bg-rose-950 dark:text-rose-200 dark:ring-rose-800";
  }

  if (tone === "warn") {
    return "flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 ring-1 ring-amber-100 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-800";
  }

  if (tone === "verified") {
    return "flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-800";
  }

  return "flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100 dark:bg-sky-950 dark:text-sky-200 dark:ring-sky-800";
}

