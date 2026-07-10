# Dashboard Module Learning

## Purpose Of This Feature

Provide backend boundaries for operational status, waiting-time and queue summaries.

## Relevant Engineering Decisions

- Whether to return one dashboard DTO or several independently loaded sections.
- Which values are SQL aggregation results.
- How partial failures should be represented.
- What should be cached.

## Questions To Answer Before Implementation

- Which counts depend on encounter status?
- Which counts depend on patient priority?
- Which values should be calculated by SQL?
- How should stale data be labelled?

## Failure Cases To Consider

- One aggregate query fails.
- A status value is unknown.
- A dashboard request is slow.
- Derived values disagree with detail endpoints.

## Interview Questions I Should Eventually Be Able To Answer

- How would you design a dashboard endpoint?
- How do SQL aggregation and application aggregation differ?
- What is the trade-off between one endpoint and several?
- How do you test partial failures?

