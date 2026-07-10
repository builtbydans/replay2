"use client";

import {
  ArrowRightIcon,
  ClockIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import {
  PatientStatusBadge,
  PriorityBadge,
} from "@/components/shared/domain-badges";
import { PageHeader, PageShell } from "@/components/shared/page-shell";
import { SyntheticDataNotice } from "@/components/shared/synthetic-data-notice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PATIENT_PRIORITY_OPTIONS,
  PATIENT_STATUS_OPTIONS,
} from "@/constants/status";
import type {
  Clinician,
  Patient,
  PatientPriority,
  PatientStatus,
} from "@/types/clinical.types";
import { formatClock, formatWaitingTime } from "@/utils/time";

type SelectStatus = PatientStatus | "ALL";
type SelectPriority = PatientPriority | "ALL";

export function PatientQueueShell({
  patients,
  clinicians,
}: {
  patients: Patient[];
  clinicians: Clinician[];
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<SelectStatus>("ALL");
  const [priority, setPriority] = useState<SelectPriority>("ALL");

  function showFilterMessage() {
    toast.info("Queue filtering is a learning task", {
      description:
        "The controls preserve local UI state, but fixture rows are not transformed yet.",
    });
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Operational queue"
        title="Patients requiring clinical attention"
        description="A synthetic queue surface for reviewing urgency, waiting time, outstanding evidence and clinician ownership."
      />

      <SyntheticDataNotice />

      <section className="replay-panel overflow-hidden">
        <div className="replay-panel-header flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="replay-kicker">Queue controls</p>
            <h3 className="replay-section-title mt-1">Shell-only filters</h3>
          </div>
          <div className="grid w-full gap-2 lg:grid-cols-[minmax(260px,1fr)_210px_210px_auto]">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search fictional name, complaint or location"
                className="bg-white pl-9 dark:bg-slate-950"
              />
            </div>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as SelectStatus)}
            >
              <SelectTrigger className="w-full bg-white dark:bg-slate-950">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All statuses</SelectItem>
                {PATIENT_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={priority}
              onValueChange={(value) => setPriority(value as SelectPriority)}
            >
              <SelectTrigger className="w-full bg-white dark:bg-slate-950">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All priorities</SelectItem>
                {PATIENT_PRIORITY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="button" variant="outline" onClick={showFilterMessage}>
              <SlidersHorizontalIcon />
              Apply
            </Button>
          </div>
        </div>
        <div className="border-t border-[var(--replay-border)] bg-slate-50 px-4 py-2 text-xs text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
          Selected controls: search {search || "none"}, status {status},
          priority {priority}. Results remain unfiltered in this shell.
        </div>
      </section>

      <section className="replay-panel overflow-hidden">
        <div className="replay-panel-header">
          <p className="replay-kicker">Current encounters</p>
          <h3 className="replay-section-title mt-1">
            Waiting-time and decision queue
          </h3>
        </div>
        <div className="overflow-x-auto p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient context</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Workflow</TableHead>
                <TableHead>Outstanding work</TableHead>
                <TableHead>Clinician</TableHead>
                <TableHead className="text-right">Next action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} className="align-top">
                  <TableCell className="min-w-72">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-950">
                        {patient.fullName
                          .split(" ")
                          .map((namePart) => namePart[0])
                          .join("")}
                      </div>
                      <div>
                        <Link
                          href={`/patients/${patient.id}`}
                          className="font-semibold underline-offset-4 hover:underline"
                        >
                          {patient.fullName}
                        </Link>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {patient.presentingComplaint}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {patient.location} · Arrived{" "}
                          {formatClock(patient.arrivalTime)}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <PriorityBadge priority={patient.priority} />
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <ClockIcon className="size-3.5" />
                        {formatWaitingTime(patient.waitingMinutes)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <PatientStatusBadge status={patient.status} />
                  </TableCell>
                  <TableCell className="min-w-52">
                    <p className="text-sm font-medium text-slate-950 dark:text-slate-50">
                      {getOutstandingWork(patient.status)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Fixture-only next-work label
                    </p>
                  </TableCell>
                  <TableCell className="min-w-44">
                    {patient.assignedClinicianId
                      ? clinicians.find(
                          (clinician) =>
                            clinician.id === patient.assignedClinicianId,
                        )?.name ?? "Unknown clinician"
                      : "Unassigned"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/patients/${patient.id}`}>
                        Open record
                        <ArrowRightIcon />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </PageShell>
  );
}

function getOutstandingWork(status: PatientStatus): string {
  switch (status) {
    case "WAITING":
      return "Assign clinician";
    case "UNDER_ASSESSMENT":
      return "Complete assessment";
    case "AWAITING_INVESTIGATION":
      return "Request or chase investigation";
    case "AWAITING_RESULTS":
      return "Review returned evidence";
    case "AWAITING_DIAGNOSIS":
      return "Resolve working diagnosis";
    case "AWAITING_DISCHARGE":
      return "Confirm discharge safety";
    case "DISCHARGED":
      return "Record closed";
  }
}
