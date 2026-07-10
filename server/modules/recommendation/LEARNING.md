# Recommendation Module Learning

## Purpose Of This Feature

Prepare backend boundaries for AI recommendations without implementing generation, validation or state transitions.

## Relevant Engineering Decisions

- Recommendation variant modelling.
- Runtime validation of incoming DTOs.
- Authorisation boundaries.
- Valid state transitions.
- Audit event creation.

## Questions To Answer Before Implementation

- Which recommendation fields are common?
- Which fields are specific to each variant?
- Which actions can follow each status?
- Which records must be written together?

## Failure Cases To Consider

- Invalid action for current status.
- Missing recommendation.
- Duplicate decision request.
- Audit write fails after decision write.

## Interview Questions I Should Eventually Be Able To Answer

- What is exhaustive type handling?
- Why does a backend still need validation if TypeScript is strict?
- What is idempotency?
- How do transactions protect related writes?

