import {
  ArrowLeftIcon,
  BotIcon,
  FileClockIcon,
  FingerprintIcon,
  HistoryIcon,
  ShieldCheckIcon,
  UserRoundIcon,
} from "lucide-react";
import Link from "next/link";

import { EncounterRecord } from "@/components/encounters/encounter-record";
import {
  PatientStatusBadge,
  PriorityBadge,
} from "@/components/shared/domain-badges";
import { PageHeader, PageShell } from "@/components/shared/page-shell";
import { SyntheticDataNotice } from "@/components/shared/synthetic-data-notice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { PatientRecord as PatientRecordType } from "@/types/clinical.types";
import { formatClock, formatDateTime, formatWaitingTime } from "@/utils/time";

export function PatientRecord({ record }: { record: PatientRecordType }) {
  return (
    <PageShell>
      <div className="flex flex-wrap gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/patients">
            <ArrowLeftIcon />
            Back to queue
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/patients/${record.patient.id}/consult`}>
            <BotIcon />
            Open consult shell
          </Link>
        </Button>
      </div>

      <PageHeader
        eyebrow="Patient case file"
        title={record.patient.fullName}
        description={`${record.patient.presentingComplaint}. This synthetic record shows how Replay separates stable patient context from encounter evidence, AI recommendations and audit events.`}
      />

      <SyntheticDataNotice compact />

      <section className="grid gap-4 xl:grid-cols-[380px_1fr]">
        <aside className="space-y-4">
          <section className="replay-panel overflow-hidden">
            <div className="replay-panel-header flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                <UserRoundIcon className="size-5" />
              </div>
              <div>
                <p className="replay-kicker">Stable patient information</p>
                <h3 className="replay-section-title mt-1">
                  Identity and attendance
                </h3>
              </div>
            </div>
            <div className="replay-panel-body space-y-4">
              <div className="flex flex-wrap gap-2">
                <PatientStatusBadge status={record.patient.status} />
                <PriorityBadge priority={record.patient.priority} />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <SummaryItem label="Age" value={`${record.patient.age}`} />
                <SummaryItem label="Sex" value={record.patient.sex} />
                <SummaryItem label="NHS number" value={record.patient.nhsNumber} />
                <SummaryItem
                  label="Arrived"
                  value={formatClock(record.patient.arrivalTime)}
                />
                <SummaryItem
                  label="Waiting"
                  value={formatWaitingTime(record.patient.waitingMinutes)}
                />
                <SummaryItem label="Location" value={record.patient.location} />
              </div>

              <div className="replay-panel-muted p-3 text-sm">
                <p className="font-medium text-slate-950 dark:text-slate-50">
                  Assigned clinician
                </p>
                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  {record.assignedClinician
                    ? `${record.assignedClinician.name}, ${record.assignedClinician.role}`
                    : "Unassigned"}
                </p>
              </div>
            </div>
          </section>

          <section className="replay-panel">
            <div className="replay-panel-header">
              <p className="replay-kicker">Record structure</p>
              <h3 className="replay-section-title mt-1">
                Relationships implied by fixtures
              </h3>
            </div>
            <div className="replay-panel-body space-y-2">
              <ModelItem label="Patient" value="Many encounters" />
              <ModelItem label="Encounter" value="Observations, notes, investigations" />
              <ModelItem label="Recommendation" value="Belongs to encounter and AI run" />
              <ModelItem label="Decision" value="Belongs to recommendation" />
            </div>
          </section>
        </aside>

        <section className="min-w-0 space-y-4">
          <div className="replay-panel overflow-hidden">
            <div className="replay-panel-header flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="replay-kicker">Current encounter</p>
                <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-50">
                  {record.currentEncounter.reasonForAttendance}
                </h3>
                <p className="replay-subtle mt-1">
                  Encounter {record.currentEncounter.id} · Arrived{" "}
                  {formatDateTime(record.currentEncounter.arrivedAt)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  {record.currentEncounter.observations.length} observations
                </Badge>
                <Badge variant="outline">
                  {record.currentEncounter.investigations.length} investigations
                </Badge>
                <Badge variant="outline">
                  {record.currentEncounter.recommendations.length} recommendations
                </Badge>
              </div>
            </div>
          </div>

          <Tabs defaultValue="current" className="space-y-4">
            <TabsList className="grid h-auto grid-cols-2 rounded-lg border border-[var(--replay-border)] bg-[var(--replay-panel-muted)] p-1 md:grid-cols-3">
              <TabsTrigger value="current">Encounter evidence</TabsTrigger>
              <TabsTrigger value="history">Prior encounters</TabsTrigger>
              <TabsTrigger value="audit">Audit history</TabsTrigger>
            </TabsList>
            <TabsContent value="current">
              <EncounterRecord encounter={record.currentEncounter} />
            </TabsContent>
            <TabsContent value="history">
              <section className="replay-panel">
                <div className="replay-panel-header flex items-center justify-between gap-3">
                  <div>
                    <p className="replay-kicker">Longitudinal context</p>
                    <h3 className="replay-section-title mt-1">
                      Previous encounters
                    </h3>
                  </div>
                  <FileClockIcon className="size-4 text-slate-500" />
                </div>
                <div className="replay-panel-body space-y-3">
                  {record.previousEncounters.map((encounter) => (
                    <div
                      key={encounter.id}
                      className="replay-evidence flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium">
                          {encounter.reasonForAttendance}
                        </p>
                        <p className="replay-subtle mt-1">
                          {formatDateTime(encounter.arrivedAt)} ·{" "}
                          {encounter.status}
                        </p>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/encounters/${encounter.id}`}>Open</Link>
                      </Button>
                    </div>
                  ))}
                  {record.previousEncounters.length === 0 ? (
                    <p className="replay-copy">
                      No previous synthetic encounters are attached to this
                      record.
                    </p>
                  ) : null}
                </div>
              </section>
            </TabsContent>
            <TabsContent value="audit">
              <section className="replay-panel">
                <div className="replay-panel-header flex items-center justify-between gap-3">
                  <div>
                    <p className="replay-kicker">Trace history</p>
                    <h3 className="replay-section-title mt-1">
                      Audit events for this record
                    </h3>
                  </div>
                  <ShieldCheckIcon className="size-4 text-slate-500" />
                </div>
                <div className="replay-panel-body replay-timeline-line space-y-3">
                  {record.currentEncounter.auditEvents.map((event) => (
                    <div
                      key={event.id}
                      className="relative grid grid-cols-[38px_1fr] gap-2"
                    >
                      <div className="relative z-10 flex justify-center pt-1">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                          <HistoryIcon className="size-4" />
                        </span>
                      </div>
                      <div className="replay-evidence">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium">{event.title}</p>
                          <span className="font-mono text-[11px] text-slate-400">
                            {event.id}
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
            </TabsContent>
          </Tabs>
        </section>
      </section>
    </PageShell>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="replay-subtle">{label}</p>
      <p className="font-medium text-slate-950 dark:text-slate-50">{value}</p>
    </div>
  );
}

function ModelItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[var(--replay-border)] bg-white p-3 dark:bg-slate-900/50">
      <FingerprintIcon className="mt-0.5 size-4 text-slate-500" />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="replay-subtle mt-1">{value}</p>
      </div>
    </div>
  );
}

