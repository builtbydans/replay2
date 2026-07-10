import { FingerprintIcon, InfoIcon } from "lucide-react";

export function SyntheticDataNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className="replay-panel-dashed flex items-start gap-3 p-4 text-sm">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700 ring-1 ring-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:ring-slate-800">
        {compact ? (
          <FingerprintIcon className="size-4" />
        ) : (
          <InfoIcon className="size-4" />
        )}
      </div>
      <div>
        <p className="replay-section-title">Fictional demonstration data</p>
        {!compact ? (
          <p className="replay-copy mt-1">
            Names, observations, investigations, recommendations and audit events
            are synthetic. They exist to show the product concept and learning
            architecture only.
          </p>
        ) : null}
      </div>
    </div>
  );
}
