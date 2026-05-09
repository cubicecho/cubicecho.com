---
title: philotes
tagline: A personal CRM for the people who matter — not your pipeline.
status: alpha
order: 4
repo: https://github.com/vantreeseba/philotes
---

philotes is a personal CRM for life, not work. Log interactions, jot notes
with `@`-mentions to link people together, track important dates, and let a
weekly review surface the relationships you said you'd reconnect with.

The app runs entirely locally with an embedded Postgres (PGlite) — no
account, no cloud, no environment variables for local dev. Built on the
premise that the strength of your relationships is one of the most reliable
predictors of long-term wellbeing, and that those relationships drift mostly
for lack of system support, not lack of care.

Stack: React 19 + Vite + TanStack Router on the frontend, Apollo Server +
GraphQL + Drizzle on the backend, PGlite (or standalone Postgres) for
storage. Optional Docker deployment with persistent volumes.
