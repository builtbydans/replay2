# Clinical Consultant Learning

## Purpose Of This Feature

Provide the future interface for clinician prompts, assistant responses, evidence references and safe failure states.

## Relevant Engineering Decisions

- Which values are component state and which belong in the backend.
- How external model requests synchronise with the UI.
- How to handle stale asynchronous responses.
- What must be preserved when a component renders again.

## Questions To Answer Before Implementation

- What record context should be sent to an AI service?
- What should happen if the clinician changes patient before a response returns?
- How should loading, empty and error states differ?
- Which values should trigger a render?

## Failure Cases To Consider

- A slow response returns after the user navigates away.
- A model response references evidence that is no longer visible.
- A prompt is submitted twice.
- Context construction fails before the model request starts.

## Interview Questions I Should Eventually Be Able To Answer

- How do hooks preserve values between renders?
- Why does cleanup matter for async UI?
- When should a value be stored in state?
- What is the difference between UI state and server state?

