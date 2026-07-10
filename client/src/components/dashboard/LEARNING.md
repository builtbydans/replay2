# Dashboard Learning

## Purpose Of This Feature

Show a calm operational overview of current patient flow, urgent cases, waiting times, recent clinical activity and queue pressure.

## Relevant Engineering Decisions

- Which dashboard values are persisted, derived in SQL, or derived in application code.
- Whether independent dashboard sections should load together or separately.
- How partial failures should affect the visible screen.
- Where demo fixtures stop and real API DTOs begin.

## Questions To Answer Before Implementation

- Which numbers require aggregation across encounters?
- Which numbers are status counts and which are clinical safety signals?
- How should the dashboard behave if one data source fails?
- Which values should be fresh and which may be cached?

## Failure Cases To Consider

- One section times out while other data is available.
- Status labels drift between frontend and backend.
- A derived value disagrees with underlying patient records.
- A slow query blocks critical queue visibility.

## Interview Questions I Should Eventually Be Able To Answer

- How do you choose between multiple API calls and an aggregate endpoint?
- What makes a dashboard query expensive?
- How would you test partial failure behaviour?
- How would you explain the difference between stored and derived state?

