---
title: telos
tagline: A self-hostable todo board, and agents to work it if you want them.
category: cloud
order: 4
repo: https://github.com/cubicecho/telos
homepage: https://cubicecho.github.io/telos/
---

Projects hold todos, laid out as a board of lanes. Todos can depend on
other todos, and a todo you are waiting on is one you cannot tick off yet —
telos knows that and says so. Labels attach to projects and todos alike.

Give a lane an agent, a model and its instructions, and it works each todo
that arrives there: a run passes or fails and the todo moves on. AI is off
unless you turn it on, and your own tools can reach the board over MCP.

Runs as one container plus Postgres.

Stack: TypeScript, GraphQL, Drizzle, Postgres, Docker.
