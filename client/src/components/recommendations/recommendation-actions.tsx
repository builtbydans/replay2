"use client";

import {
  ArrowUpRightIcon,
  CheckIcon,
  PencilIcon,
  XIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { Recommendation } from "@/types/clinical.types";

const actions = [
  { label: "Accept", icon: CheckIcon },
  { label: "Reject", icon: XIcon },
  { label: "Modify", icon: PencilIcon },
  { label: "Escalate", icon: ArrowUpRightIcon },
];

export function RecommendationActions({
  recommendation,
}: {
  recommendation: Recommendation;
}) {
  function showWorkInProgress(action: string) {
    toast.warning(`${action} is not implemented`, {
      description:
        "This shell does not mutate recommendation, decision or audit records.",
    });
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
      {actions.map((action) => (
        <Button
          key={action.label}
          type="button"
          variant={action.label === "Accept" ? "default" : "outline"}
          size="sm"
          className={action.label === "Escalate" ? "border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-200 dark:hover:bg-rose-950" : undefined}
          onClick={() =>
            showWorkInProgress(`${action.label} ${recommendation.id}`)
          }
        >
          <action.icon />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
