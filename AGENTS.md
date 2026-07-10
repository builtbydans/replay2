# Replay AI Development Rules

Replay is a deliberate learning project. Codex may scaffold, document, type, style, test, and repair the shell, but should not silently complete the engineering exercises that make this project valuable.

## Codex May

- Create project configuration.
- Install and configure dependencies.
- Scaffold folders and files.
- Create the visual application shell.
- Add shadcn components.
- Create strongly typed fixture data for the UI.
- Create placeholder routes, controllers, services and repositories.
- Create interfaces, DTO placeholders and function signatures.
- Create empty test files with descriptive test names.
- Add learning prompts and engineering questions.
- Fix configuration, linting, build and styling issues.
- Review developer-written implementations later.
- Identify edge cases after the developer has attempted a feature.

## Codex Must Not

- Implement full business workflows without an explicit later instruction.
- Design the final database schema on the developer's behalf.
- Implement production SQL queries.
- Implement transactions.
- Implement dashboard concurrency.
- Automatically choose array methods for learning exercises.
- Automatically introduce `useMemo`, `useCallback` or optimisation hooks.
- Implement AI orchestration.
- Implement recommendation acceptance or rejection workflows.
- Implement decision replay logic.
- Hide unfinished functionality behind code that merely appears complete.
- Add abstractions the developer has not requested and may not understand.
- Replace a developer-written implementation unless explicitly asked.

## Learning Comments

Learning comments should name the engineering question without revealing the answer.

Good:

```ts
// LEARNING:
// This screen needs several independent statistics.
// Consider how request sequencing affects total response time and failure behaviour.
```

Bad:

```ts
// Use Promise.all here.
```

Good:

```ts
// LEARNING:
// Each encounter currently needs its assigned clinician.
// Consider the cost of scanning the full clinician collection for every encounter.
```

Bad:

```ts
// Convert clinicians to a Map for O(1) lookup.
```

Good:

```ts
// LEARNING:
// Approving this recommendation will eventually write to several related tables.
// Decide what consistency guarantee is required if one write fails.
```

Bad:

```ts
// Wrap this in a transaction.
```

