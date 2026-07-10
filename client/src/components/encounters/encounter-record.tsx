import {
  BotIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  FileTextIcon,
  HistoryIcon,
  StethoscopeIcon,
  TestTubeIcon,
} from "lucide-react";

import { RecommendationCard } from "@/components/recommendations/recommendation-card";
import { PriorityBadge } from "@/components/shared/domain-badges";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { INVESTIGATION_STATUS_LABELS } from "@/constants/status";
import type { Encounter } from "@/types/clinical.types";
import { formatDateTime } from "@/utils/time";

export function EncounterRecord({ encounter }: { encounter: Encounter }) {
  return (
    <div className="space-y-4">
      <section className="replay-panel overflow-hidden">
        <div className="replay-panel-header flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                {encounter.status}
              </Badge>
              <PriorityBadge priority={encounter.acuity} />
            </div>
            <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-slate-50">
              {encounter.reasonForAttendance}
            </h3>
            <p className="replay-subtle mt-1">
              Arrived {formatDateTime(encounter.arrivedAt)}
              {encounter.closedAt
                ? ` · Closed ${formatDateTime(encounter.closedAt)}`
                : " · Active encounter"}
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <Metric label="Observations" value={encounter.observations.length} />
            <Metric
              label="Investigations"
              value={encounter.investigations.length}
            />
            <Metric
              label="Recommendations"
              value={encounter.recommendations.length}
            />
          </div>
        </div>
      </section>

      <Tabs defaultValue="evidence" className="space-y-4">
        <TabsList className="grid h-auto grid-cols-2 rounded-lg border border-[var(--replay-border)] bg-[var(--replay-panel-muted)] p-1 md:grid-cols-4">
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="investigations">Investigations</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="evidence" className="space-y-4">
          <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
            <div className="replay-panel">
              <div className="replay-panel-header flex items-center justify-between gap-3">
                <div>
                  <p className="replay-kicker">Vitals and observations</p>
                  <h4 className="replay-section-title mt-1">
                    Recorded clinical state
                  </h4>
                </div>
                <StethoscopeIcon className="size-4 text-slate-500" />
              </div>
              <div className="replay-panel-body grid gap-3 sm:grid-cols-2">
                {encounter.observations.map((observation) => (
                  <div key={observation.id} className="replay-evidence">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">
                          {observation.label}
                        </p>
                        <p className="replay-subtle mt-1">
                          {formatDateTime(observation.recordedAt)}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {observation.interpretation}
                      </Badge>
                    </div>
                    <p className="mt-3 text-lg font-semibold">
                      {observation.value}
                    </p>
                  </div>
                ))}
                {encounter.observations.length === 0 ? (
                  <EmptyPanel icon={<ClipboardListIcon />} label="No observations" />
                ) : null}
              </div>
            </div>

            <div className="replay-panel">
              <div className="replay-panel-header">
                <p className="replay-kicker">Diagnostic picture</p>
                <h4 className="replay-section-title mt-1">
                  Possible and working diagnoses
                </h4>
              </div>
              <div className="replay-panel-body space-y-3">
                {encounter.diagnoses.map((diagnosis) => (
                  <div key={diagnosis.id} className="replay-evidence">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">{diagnosis.label}</p>
                      <Badge variant="outline">{diagnosis.certainty}</Badge>
                    </div>
                    <p className="replay-subtle mt-2">
                      Recorded {formatDateTime(diagnosis.recordedAt)}
                    </p>
                  </div>
                ))}
                {encounter.diagnoses.length === 0 ? (
                  <EmptyPanel icon={<ClipboardListIcon />} label="No diagnoses" />
                ) : null}
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="investigations" className="space-y-3">
          <section className="replay-panel">
            <div className="replay-panel-header flex items-center justify-between gap-3">
              <div>
                <p className="replay-kicker">Investigation timeline</p>
                <h4 className="replay-section-title mt-1">
                  Requests and returned evidence
                </h4>
              </div>
              <TestTubeIcon className="size-4 text-slate-500" />
            </div>
            <div className="replay-panel-body grid gap-3 md:grid-cols-2">
              {encounter.investigations.map((investigation) => (
                <div key={investigation.id} className="replay-evidence">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{investigation.name}</p>
                    <Badge variant="outline">
                      {INVESTIGATION_STATUS_LABELS[investigation.status]}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    {investigation.summary}
                  </p>
                  <p className="replay-subtle mt-3">
                    Requested {formatDateTime(investigation.requestedAt)}
                    {investigation.resultedAt
                      ? ` · Resulted ${formatDateTime(investigation.resultedAt)}`
                      : ""}
                  </p>
                </div>
              ))}
              {encounter.investigations.length === 0 ? (
                <EmptyPanel icon={<TestTubeIcon />} label="No investigations" />
              ) : null}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="notes" className="space-y-3">
          <section className="replay-panel">
            <div className="replay-panel-header flex items-center justify-between gap-3">
              <div>
                <p className="replay-kicker">Clinical narrative</p>
                <h4 className="replay-section-title mt-1">
                  Notes available to the shell
                </h4>
              </div>
              <FileTextIcon className="size-4 text-slate-500" />
            </div>
            <div className="replay-panel-body space-y-3">
              {encounter.notes.map((note) => (
                <div key={note.id} className="replay-evidence">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{note.noteType}</Badge>
                    <span className="replay-subtle">
                      {note.author} · {formatDateTime(note.authoredAt)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6">{note.body}</p>
                </div>
              ))}
              {encounter.notes.length === 0 ? (
                <EmptyPanel icon={<FileTextIcon />} label="No clinical notes" />
              ) : null}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="audit" className="space-y-3">
          <section className="replay-panel">
            <div className="replay-panel-header flex items-center justify-between gap-3">
              <div>
                <p className="replay-kicker">Audit trace</p>
                <h4 className="replay-section-title mt-1">
                  Immutable shell events
                </h4>
              </div>
              <HistoryIcon className="size-4 text-slate-500" />
            </div>
            <div className="replay-panel-body replay-timeline-line space-y-3">
              {encounter.auditEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative grid grid-cols-[38px_1fr] gap-2"
                >
                  <div className="relative z-10 flex justify-center pt-1">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                      {event.type === "AI_RUN_CREATED" ? (
                        <BotIcon className="size-4" />
                      ) : (
                        <ClipboardCheckIcon className="size-4" />
                      )}
                    </span>
                  </div>
                  <div className="replay-evidence">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {event.description}
                    </p>
                    <p className="replay-subtle mt-2">
                      {event.actor} · {formatDateTime(event.occurredAt)}
                    </p>
                  </div>
                </div>
              ))}
              {encounter.auditEvents.length === 0 ? (
                <EmptyPanel icon={<HistoryIcon />} label="No audit events" />
              ) : null}
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {encounter.recommendations.length > 0 ? (
        <div className="space-y-3">
          {encounter.recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      ) : null}

      {encounter.decisions.length > 0 ? (
        <section className="replay-panel">
          <div className="replay-panel-header">
            <p className="replay-kicker">Clinician oversight</p>
            <h4 className="replay-section-title mt-1">Recorded decisions</h4>
          </div>
          <div className="replay-panel-body space-y-3">
            {encounter.decisions.map((decision) => (
              <div key={decision.id} className="replay-evidence">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
                    {decision.decision}
                  </Badge>
                  <span className="replay-subtle">
                    {decision.decidedAt
                      ? formatDateTime(decision.decidedAt)
                      : "Pending"}
                  </span>
                </div>
                <p className="mt-3 text-sm">{decision.rationale}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[var(--replay-border)] bg-white px-3 py-2 text-right dark:bg-slate-900/50">
      <p className="font-mono text-lg font-semibold tabular-nums">{value}</p>
      <p className="replay-subtle">{label}</p>
    </div>
  );
}

function EmptyPanel({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="replay-panel-dashed flex items-center gap-3 p-4 text-sm text-slate-500">
      <span className="[&_svg]:size-4">{icon}</span>
      {label}
    </div>
  );
}

