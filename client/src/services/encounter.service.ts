import { patientRecords } from "@/data/fixtures/clinical-fixtures";
import type { EncounterResponseDto } from "@/types/dto.types";

export async function getEncounterShell(
  encounterId: string,
): Promise<EncounterResponseDto> {
  const currentRecord =
    patientRecords.find(
      (record) => record.currentEncounter.id === encounterId,
    ) ?? null;

  const previousEncounter =
    patientRecords
      .flatMap((record) => record.previousEncounters)
      .find((encounter) => encounter.id === encounterId) ?? null;

  return {
    source: "synthetic-fixture",
    encounter: currentRecord?.currentEncounter ?? previousEncounter,
  };
}

