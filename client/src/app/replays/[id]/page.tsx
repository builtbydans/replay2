import { notFound } from "next/navigation";

import { ReplayDetail } from "@/components/replay/replay-detail";
import { getReplayShell } from "@/services/replay.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReplayDetailPage({ params }: Props) {
  const { id } = await params;
  const response = await getReplayShell(id);

  if (!response.replay) {
    notFound();
  }

  return <ReplayDetail replay={response.replay} />;
}

