---
title: agent-core
tagline: The endpoint-agnostic half of an OpenAI-compatible agent loop.
category: ai
order: 10
repo: https://github.com/cubicecho/agent-core
npm: https://www.npmjs.com/package/@cubicecho/agent-core
---

Tool-schema compatibility across endpoints, on-demand tool loading, one-shot
side tasks, run events, and a pooled client — the parts of an agent loop that
have nothing to do with which model is answering.

It was extracted from three servers that had each written it separately —
[kanban-server](/projects/kanban-server/),
[task-server](/projects/task-server/) and
[min-agent](/projects/min-agent/) — after the copies drifted far enough that a
fix in one was a bug still live in another.

Stack: TypeScript. Published as `@cubicecho/agent-core`.
