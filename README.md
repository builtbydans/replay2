# Replay

Replay is an AI-assisted clinical workflow and decision-replay shell for urgent-care or A&E-style scenarios. It explores how clinicians might inspect patient context, question an AI clinical consultant, review recommendations, record decisions, and later reconstruct how a decision was reached.

All data in this repository is synthetic demonstration data. The application is not a clinical device, does not provide medical advice, and does not connect to real patient systems.

## Problem Explored

Clinical AI recommendations are only useful when their evidence, uncertainty, clinician response and execution trail can be inspected later. Replay is a portfolio project for exploring that auditability problem without hiding unfinished workflow logic behind fake production behaviour.

## Current MVP Scope

- Operational dashboard shell with synthetic urgent-care queue data.
- Patient queue shell with search and filter controls marked as work in progress.
- Patient and encounter record views with observations, investigations, diagnoses, notes, recommendations and audit timeline sections.
- Clinical consultant chat UI shell with warning, empty, loading and error states.
- Recommendation cards with non-mutating action buttons.
- Decision replay list and detail views showing evidence, AI run metadata, clinician decision, review outcome and verification receipt placeholders.
- Express API module scaffolding following route, controller, service and repository boundaries.

## Architecture

```text
Replay/
├── README.md
├── AGENTS.md
├── LEARNING_INDEX.md
├── client/
└── server/
```

The frontend renders from typed fixtures through demo services so no page requires a live backend. The backend compiles and exposes placeholder routes that either return clearly marked fixture responses or raise `501 Not Implemented` for unfinished workflows.

## Technology Stack

- Next.js 16 App Router
- React 19
- TypeScript with strict checking
- Tailwind CSS 4
- shadcn/ui, Radix primitives and Lucide React
- Sonner
- Recharts
- Node.js, Express 5 and TypeScript
- Supabase client placeholder for future PostgreSQL persistence

## Client Structure

```text
client/src/
├── app/
├── components/
├── config/
├── constants/
├── data/fixtures/
├── hooks/
├── lib/
├── services/
├── types/
└── utils/
```

## Server Structure

```text
server/
├── app.ts
├── server.ts
├── config/
├── constants/
├── docs/
├── errors/
├── middleware/
├── modules/
└── types/
```

## Visual Shells Only

These areas are deliberately not implemented yet:

- Real patient search, filtering, grouping and sorting logic.
- Production dashboard statistics fetching.
- Database schema, migrations, SQL joins, SQL aggregation and transactions.
- AI orchestration, streaming or patient-context construction.
- Recommendation accept, reject, modify or escalate workflows.
- Decision replay reconstruction logic.
- Gensyn REE or verification receipt integration.
- Authentication, authorisation and real audit persistence.

## Local Setup

Install and verify the client:

```bash
cd client
npm install
npm run lint
npm run build
npm run dev
```

Install and verify the server:

```bash
cd server
npm install
npm run build
npm run dev
```

Example environment variables:

```bash
PORT=3001
SUPABASE_URL=https://example.supabase.co
SUPABASE_ANON_KEY=replace-with-local-development-key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Do not commit real secrets.

## Learning Purpose

The project is intentionally scaffolded with learning prompts instead of completed business logic. Start by choosing one feature area, answering the questions in the relevant `LEARNING.md` file, then implement that feature in small, testable steps.

# replay2
