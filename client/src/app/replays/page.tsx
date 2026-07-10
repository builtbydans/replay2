import { ReplayList } from "@/components/replay/replay-list";
import { getReplayListShell } from "@/services/replay.service";

export default async function ReplaysPage() {
  const response = await getReplayListShell();

  return <ReplayList replays={response.replays} />;
}

