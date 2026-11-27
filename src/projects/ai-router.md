---
title: ai-router
tagline: Agents for every app on a network, through one address and one key per app.
category: infra
order: 3
repo: https://github.com/cubicecho/ai-router
status: early
---

An app points an ordinary OpenAI client at ai-router's `/v1` and names an
**agent** as the model. The router runs that agent's whole loop server-side —
its prompt, its models, its MCP tools — and hands back the answer. The app
never learns which model or tools were involved, and changing them is an edit
in one place rather than a redeploy of every app.

It is the agents counterpart of [llm-router](/projects/llm-router/) and
[mcp-router](/projects/mcp-router/), which stay for raw models and raw tools.
The same agents are served as tools at `/mcp`, and worker machines can dial in
to run tools that have to live somewhere else. Sign-in is OIDC — pair it with
[heautou](/projects/heautou/).

Early, 0.x. Stack: TypeScript, GraphQL, Postgres,
[agent-core](/projects/agent-core/).
