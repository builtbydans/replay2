"use client";

import {
  AlertTriangleIcon,
  BotIcon,
  ClipboardCheckIcon,
  FileSearchIcon,
  LibraryBigIcon,
  Loader2Icon,
  SendIcon,
  ShieldAlertIcon,
  UserRoundIcon,
} from "lucide-react";

import {
  consultSuggestions,
  consultTranscript,
} from "@/data/fixtures/clinical-fixtures";
import { useClinicalConsultShell } from "@/hooks/use-clinical-consult-shell";
import type { PatientRecord } from "@/types/clinical.types";
import { formatDateTime } from "@/utils/time";
import { PageHeader, PageShell } from "@/components/shared/page-shell";
import { SyntheticDataNotice } from "@/components/shared/synthetic-data-notice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ClinicalConsultShell({ record }: { record: PatientRecord }) {
  const { prompt, setPrompt, lastAttemptedPrompt, submitPrompt } =
    useClinicalConsultShell();

  return (
    <PageShell>
      <PageHeader
        eyebrow="Supervised investigation shell"
        title={`Clinical consult for ${record.patient.fullName}`}
        description="A controlled consult workspace for clinician prompts, evidence references, uncertainty and proposed actions. No model or patient-context construction is connected."
      />

      <Alert className="border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
        <AlertTriangleIcon />
        <AlertTitle>Clinician remains in control</AlertTitle>
        <AlertDescription>
          This shell cannot diagnose, prescribe or act autonomously. It is a
          visual placeholder for a future supervised investigation workflow.
        </AlertDescription>
      </Alert>

      <SyntheticDataNotice compact />

      <section className="grid gap-4 xl:grid-cols-[360px_1fr_390px]">
        <aside className="space-y-4">
          <section className="replay-panel">
            <div className="replay-panel-header">
              <p className="replay-kicker">Case context</p>
              <h3 className="replay-section-title mt-1">
                Visible to consult shell
              </h3>
            </div>
            <div className="replay-panel-body space-y-3">
              <ContextRow label="Patient" value={record.patient.fullName} />
              <ContextRow
                label="Encounter"
                value={record.currentEncounter.reasonForAttendance}
              />
              <ContextRow label="Location" value={record.patient.location} />
              <ContextRow
                label="Current status"
                value={record.patient.status.replaceAll("_", " ")}
              />
            </div>
          </section>

          <section className="replay-panel">
            <div className="replay-panel-header flex items-center justify-between gap-3">
              <div>
                <p className="replay-kicker">Evidence gathered</p>
                <h3 className="replay-section-title mt-1">
                  Record references
                </h3>
              </div>
              <FileSearchIcon className="size-4 text-slate-500" />
            </div>
            <div className="replay-panel-body space-y-3">
              {record.currentEncounter.observations.slice(0, 2).map((item) => (
                <EvidenceItem
                  key={item.id}
                  label={item.label}
                  value={`${item.value} · ${item.interpretation}`}
                  source="Observation"
                />
              ))}
              {record.currentEncounter.investigations.slice(0, 2).map((item) => (
                <EvidenceItem
                  key={item.id}
                  label={item.name}
                  value={item.summary}
                  source="Investigation"
                />
              ))}
              {record.currentEncounter.notes.slice(0, 1).map((item) => (
                <EvidenceItem
                  key={item.id}
                  label={item.noteType}
                  value={item.body}
                  source="Clinical note"
                />
              ))}
            </div>
          </section>
        </aside>

        <section className="replay-panel flex min-h-[650px] flex-col overflow-hidden">
          <div className="replay-panel-header flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="replay-kicker">Clinician prompt stream</p>
              <h3 className="replay-section-title mt-1">
                Supervised consult thread
              </h3>
            </div>
            <Badge className="bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
              Model disconnected
            </Badge>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {consultTranscript.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "assistant"
                    ? "mr-8 rounded-lg border border-sky-200 bg-sky-50 p-4 dark:border-sky-800 dark:bg-sky-950/45"
                    : "ml-8 rounded-lg border border-[var(--replay-border)] bg-white p-4 dark:bg-slate-900/50"
                }
              >
                <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium">
                  {message.role === "assistant" ? (
                    <BotIcon className="size-4 text-sky-700 dark:text-sky-200" />
                  ) : (
                    <UserRoundIcon className="size-4 text-slate-500" />
                  )}
                  {message.role === "assistant"
                    ? "Replay investigation assistant"
                    : "Clinician"}
                  <span className="font-mono text-[11px] text-slate-400">
                    {formatDateTime(message.createdAt)}
                  </span>
                </div>
                <p className="text-sm leading-6">{message.content}</p>
                {message.role === "assistant" ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">Evidence-linked</Badge>
                    <Badge variant="outline">Uncertainty required</Badge>
                  </div>
                ) : null}
              </div>
            ))}

            {lastAttemptedPrompt ? (
              <div className="ml-8 rounded-lg border border-dashed border-[var(--replay-border-strong)] bg-white p-4 dark:bg-slate-900/50">
                <p className="text-sm font-medium">Queued prompt preview</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {lastAttemptedPrompt}
                </p>
              </div>
            ) : null}
          </div>

          <div className="border-t border-[var(--replay-border)] bg-[var(--replay-panel-muted)] p-4">
            <div className="mb-3 grid gap-2 sm:grid-cols-2">
              {consultSuggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  variant="outline"
                  className="h-auto justify-start whitespace-normal bg-white text-left dark:bg-slate-950"
                  onClick={() => setPrompt(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Ask about evidence, uncertainty or next clinical decision"
                className="bg-white dark:bg-slate-950"
              />
              <Button type="button" onClick={submitPrompt}>
                <SendIcon />
                Ask
              </Button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="replay-panel">
            <div className="replay-panel-header flex items-center justify-between gap-3">
              <div>
                <p className="replay-kicker">Guidance references</p>
                <h3 className="replay-section-title mt-1">
                  Placeholder source rail
                </h3>
              </div>
              <LibraryBigIcon className="size-4 text-slate-500" />
            </div>
            <div className="replay-panel-body space-y-3">
              <ReferenceItem
                title="Local escalation policy"
                detail="Future guidance retrieval will cite the source and timestamp."
              />
              <ReferenceItem
                title="Relevant history"
                detail="Past encounters and medication context will be linked explicitly."
              />
              <ReferenceItem
                title="Missing evidence"
                detail="The assistant should name gaps before proposing actions."
              />
            </div>
          </section>

          <StateCard
            icon={<Loader2Icon className="size-4 animate-spin" />}
            title="Loading state"
            detail="Future model and context requests need visible pending state."
          />
          <StateCard
            icon={<ShieldAlertIcon className="size-4" />}
            title="Error state"
            detail="Failures must preserve clinician context and avoid silent partial answers."
          />
          <StateCard
            icon={<ClipboardCheckIcon className="size-4" />}
            title="Action state"
            detail="Accept, reject, modify and escalate remain clinician-controlled."
          />
        </aside>
      </section>
    </PageShell>
  );
}

function ContextRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="replay-evidence">
      <p className="replay-subtle">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

function EvidenceItem({
  label,
  value,
  source,
}: {
  label: string;
  value: string;
  source: string;
}) {
  return (
    <div className="replay-evidence">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">{label}</p>
        <Badge variant="outline">{source}</Badge>
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{value}</p>
    </div>
  );
}

function ReferenceItem({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="replay-panel-muted p-3">
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        {detail}
      </p>
    </div>
  );
}

function StateCard({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="replay-panel p-4">
      <div className="flex gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {icon}
        </span>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}

