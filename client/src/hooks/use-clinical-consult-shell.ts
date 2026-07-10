"use client";

import { useState } from "react";
import { toast } from "sonner";

export function useClinicalConsultShell() {
  const [prompt, setPrompt] = useState("");
  const [lastAttemptedPrompt, setLastAttemptedPrompt] = useState<string | null>(
    null,
  );

  function submitPrompt() {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      toast.info("Add a prompt before asking the consultant shell.");
      return;
    }

    // LEARNING:
    // A real chat will coordinate input state, pending work, stale responses,
    // cleanup and values that may or may not need to trigger rendering.
    setLastAttemptedPrompt(trimmedPrompt);
    setPrompt("");
    toast.warning("Clinical consultant is not connected", {
      description:
        "No AI model, streaming or patient-context construction exists in this shell.",
    });
  }

  return {
    prompt,
    setPrompt,
    lastAttemptedPrompt,
    submitPrompt,
  };
}

