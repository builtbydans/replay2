# Replay Learning Index

This index maps future learning topics to places in Replay. It is intentionally question-led and does not include worked solutions.

## Array Methods

Potential locations:
- Patient queue
- Encounter timeline
- Investigation results
- Dashboard summaries

Questions:
- Is the output a transformed list, a subset, a grouped object or a single value?
- Does the operation preserve all original information?
- Is repeated scanning occurring?

## Data Transformation

Potential locations:
- Dashboard view models
- Patient record sections
- Audit timeline display

Questions:
- Which fields come from persisted records?
- Which fields are derived for the UI?
- Where should formatting happen?

## Lookup Structures

Potential locations:
- Assigned clinician display
- Linking recommendations to AI runs
- Relating decisions to recommendations

Questions:
- How often is the lookup performed?
- What should happen when a related record is missing?
- Does the lookup strategy still make sense as data grows?

## Complexity

Potential locations:
- Patient queue filtering and sorting
- Encounter timeline assembly
- Evidence-reference rendering

Questions:
- How many records are scanned for each render or request?
- Which operations grow with patients, encounters, notes or investigations?
- What changes if the dataset is ten times larger?

## Concurrency

Potential locations:
- Dashboard
- Patient record aggregation
- AI context preparation

Questions:
- Which operations depend on one another?
- Which operations are independent?
- What should happen if one operation fails?
- Is one database query preferable to several application requests?

## React Hooks

Potential locations:
- Patient queue controls
- Clinical consultant chat
- Recommendation action shell

Questions:
- Which values must trigger a render?
- Which values only need to persist between events?
- What cleanup is required when async work outlives the visible UI?

## Database Normalisation

Potential locations:
- Patients and encounters
- Recommendations and decisions
- AI runs and receipts

Questions:
- What entity does each table represent?
- Which values are repeated?
- Which values are derived?
- What must remain historically immutable?

## Denormalisation

Potential locations:
- Dashboard summaries
- Replay snapshots
- Audit views

Questions:
- Which values might be duplicated for read speed?
- How will duplicated values be kept consistent?
- Which historical values should not change when source records change?

## SQL

Potential locations:
- Dashboard counts
- Encounter evidence retrieval
- Audit timeline ordering

Questions:
- Which relationships need joins?
- Which summaries belong in aggregation queries?
- Which filters must be backed by indexes?

## Transactions

Potential locations:
- Clinician decisions
- Recommendation status changes
- Audit and receipt creation

Questions:
- Which writes must succeed or fail together?
- What is the recovery path for a partial failure?
- What should be idempotent?

## TypeScript

Potential locations:
- Recommendation variants
- API DTOs
- Encounter status modelling

Questions:
- Which states are valid?
- Which fields are shared?
- What should force exhaustive handling?

## Validation

Potential locations:
- Recommendation decisions
- Chat prompts
- API request DTOs

Questions:
- Which checks belong at runtime?
- Which checks are only compile-time hints?
- What should be rejected before persistence?

## Error Handling

Potential locations:
- API controllers
- Dashboard partial data
- Clinical consultant shell

Questions:
- What should users see when one section fails?
- Which errors should be logged?
- Which errors should be safe to expose?

## Testing

Potential locations:
- Service boundaries
- Queue filters
- Recommendation transitions

Questions:
- Which behaviours are pure enough for unit tests?
- Which flows need integration tests?
- Which edge cases are clinically or legally important?

## Security

Potential locations:
- Patient data access
- AI context preparation
- Decision actions

Questions:
- Who is allowed to view each record?
- Who is allowed to approve or escalate?
- What data must never be sent to a model without review?

## Auditability

Potential locations:
- Clinician decisions
- Replay timelines
- Verification receipts

Questions:
- Which events need immutable audit records?
- What evidence was visible at decision time?
- How will later review distinguish facts from interpretations?

