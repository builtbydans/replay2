# Patient Queue Learning

## Purpose Of This Feature

Show patients moving through the urgent-care workflow and prepare the surface for search, filtering, sorting and derived queue state.

## Relevant Engineering Decisions

- Which filters belong in the frontend and which belong in the API.
- How to group patients by workflow status.
- How to sort by waiting time, priority and arrival time.
- How to relate assigned clinician identifiers to display names.

## Questions To Answer Before Implementation

- What does the search box search across?
- Should urgent patients be detected from priority, observations or separate escalation records?
- Which task completion checks are persisted?
- How should derived state be tested?

## Failure Cases To Consider

- Status values are unknown or deprecated.
- A clinician record is missing.
- Sorting hides an urgent case below routine work.
- A filter returns no patients.

## Interview Questions I Should Eventually Be Able To Answer

- What is the difference between filtering, grouping and sorting?
- How does repeated lookup affect complexity?
- When should derived state be stored?
- Why might a queue need server-side filtering?

