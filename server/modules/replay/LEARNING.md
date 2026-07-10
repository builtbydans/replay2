# Replay Module Learning

## Purpose Of This Feature

Define the future backend boundary for reconstructing a clinical decision from evidence, AI metadata, clinician decisions, receipts and audit events.

## Relevant Engineering Decisions

- Whether replay views are reconstructed live or stored as snapshots.
- Which historical values must be immutable.
- How verification receipts attach to AI runs.
- How later review outcomes are recorded.

## Questions To Answer Before Implementation

- What evidence was visible at decision time?
- What changed after the decision?
- Which records are required to prove provenance?
- Which joins will reconstruction require?

## Failure Cases To Consider

- A referenced evidence record has changed.
- An AI run exists without a receipt.
- A clinician decision exists without an audit event.
- A replay cannot be reconstructed completely.

## Interview Questions I Should Eventually Be Able To Answer

- What is the difference between event sourcing and audit logging?
- When would you store a snapshot?
- How do immutable records help reviews?
- What makes a replay trustworthy?

