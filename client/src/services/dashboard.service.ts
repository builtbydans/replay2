import { dashboardFixture } from "@/data/fixtures/clinical-fixtures";
import type { DashboardResponseDto } from "@/types/dto.types";

export async function getDashboardShell(): Promise<DashboardResponseDto> {
  // LEARNING:
  // This screen eventually needs several independent statistics.
  // Decide how request sequencing, partial failures and derived values should work.
  return dashboardFixture;
}

