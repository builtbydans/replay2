# Recommendations Learning

## Purpose Of This Feature

Represent AI-generated clinical recommendations and the clinician decision surface without implementing the workflow.

## Relevant Engineering Decisions

- How recommendation variants should be modelled.
- Which validation belongs at runtime versus compile time.
- Which state transitions are valid.
- Which writes must accompany a clinician decision.

## Questions To Answer Before Implementation

- What makes a recommendation actionable?
- Which roles may accept, reject, modify or escalate?
- Which audit records are mandatory for each action?
- How should duplicate button clicks or repeated requests behave?

## Failure Cases To Consider

- A decision is recorded but the audit record fails.
- A stale recommendation is acted on after new evidence arrives.
- A user is authorised to view but not approve.
- A repeated request reaches the backend.

## Interview Questions I Should Eventually Be Able To Answer

- How do discriminated unions help model workflow variants?
- Why are TypeScript types not enough for API boundaries?
- What is idempotency and why does it matter for clinical actions?
- How would you test invalid state transitions?

