import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getDashboardShell } from "@/services/dashboard.service";

export default async function DashboardPage() {
  const data = await getDashboardShell();

  return <DashboardShell data={data} />;
}

