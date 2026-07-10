# Replay Schema Questions

Do not answer these by copying the fixture shape. Use them to design the first real database schema after you have implemented and tested a small workflow.

## Entity Boundaries

- What makes a patient distinct from an encounter?
- Which information belongs to a current encounter versus longitudinal history?
- Is an AI run an entity, an event, or both?
- Is a verification receipt independent, or always attached to an AI run?

## Primary Keys

- Which tables need generated identifiers?
- Which external identifiers are safe to store?
- Which identifiers must never be exposed in URLs?
- How will synthetic demo identifiers differ from production identifiers?

## Foreign Keys

- Which records must reference a patient?
- Which records must reference an encounter?
- Which records must reference an AI run?
- Which records must reference the clinician who performed an action?

## One-To-Many Relationships

- Can one patient have many encounters?
- Can one encounter have many observations?
- Can one encounter have many investigations?
- Can one encounter have many clinical notes?
- Can one recommendation have many decision attempts or only one final decision?

## Many-To-Many Relationships

- Can one diagnosis be supported by multiple investigations?
- Can one piece of evidence support multiple recommendations?
- Can one audit event relate to multiple entities?
- Should these relationships be modelled directly or through join tables?

## Repeated Data

- Which fields are repeated across patient, encounter and replay views?
- Which repeated fields are harmless labels?
- Which repeated fields could become inconsistent?
- Which values are copied because they must remain historically accurate?

## Derived Fields

- Which dashboard values are derived from records?
- Which waiting-time values should be calculated at read time?
- Which recommendation statuses are derived from decisions?
- Which replay values are reconstructed versus stored as a snapshot?

## Constraints

- Which fields are required for a valid patient?
- Which states are allowed for an encounter?
- Which decision actions are valid for each recommendation state?
- Which uniqueness constraints protect against duplicates?

## Nullability

- Which fields are unknown at arrival?
- Which timestamps are null until a workflow step completes?
- Which relationships are optional in the shell but required later?
- How will null values appear in TypeScript DTOs?

## Historical Records

- Which data must remain immutable after a decision?
- Which clinical notes can be amended?
- How should corrections be represented?
- Should replay records store snapshots of evidence visible at the time?

## Auditability

- Which user actions must create audit events?
- Which AI actions must create audit events?
- Which audit fields are mandatory for later review?
- How will you prove that an audit record belongs to a specific workflow action?

## Normalisation

- Which repeated concepts deserve their own tables?
- Which lookups should use reference tables?
- Which tables represent facts versus workflow events?
- Which joins will common screens require?

## Possible Future Denormalisation

- Which dashboard summaries might be cached?
- Which replay views might need stored snapshots?
- Which denormalised values must be refreshed?
- Which denormalised values should never change after creation?

