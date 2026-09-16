---
title: philotes
tagline: A personal CRM for the people who matter — not your pipeline.
category: cloud
order: 5
repo: https://github.com/cubicecho/philotes
---

philotes is a personal CRM for life, not work. Log interactions, jot notes with
`@`-mentions to link people together, track important dates, and let a weekly
review surface the relationships you said you'd reconnect with.

It runs entirely locally with an embedded Postgres (PGlite) — no account, no
cloud, no environment variables for local dev. Built on the premise that the
strength of your relationships is one of the more reliable predictors of
long-term wellbeing, and that they drift mostly for lack of system support, not
lack of care.

Stack: React 19 + Vite + TanStack Router, Apollo Server + GraphQL + Drizzle,
PGlite or standalone Postgres. Optional Docker deployment with persistent
volumes.
