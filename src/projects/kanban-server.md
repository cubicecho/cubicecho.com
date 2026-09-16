---
title: kanban-server
tagline: A kanban board worked by agents — the lanes of the board are the pipeline.
category: ai
order: 9
repo: https://github.com/cubicecho/kanban-server
---

Describe what you want; it goes on the board as one card. The first lane holds
a decomposer that breaks that card into the cards which carry the work out, and
the agents named on the later lanes do it — so the board is not a view of the
work, it *is* the pipeline.

It is the shape of [task-server](/projects/task-server/) with the clock taken
out: nothing fires on a schedule, and what moves work along is a card arriving
in a lane that has an agent on it. GraphQL for the board, MCP for the tools.

Stack: TypeScript, GraphQL, Postgres, MCP.
