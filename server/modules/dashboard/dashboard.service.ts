import { getDashboardFixture } from "./dashboard.repository";

export async function getDashboardShellData() {
  // LEARNING:
  // Dashboard counts may come from independent requests, SQL aggregation or cached summaries.
  // Decide how partial failures and derived values should behave before real implementation.
  return getDashboardFixture();
}

