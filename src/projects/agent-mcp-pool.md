---
title: agent-mcp-pool
tagline: A pool of long-lived MCP clients, exposing every server's tools to an agent loop.
category: ai
order: 11
repo: https://github.com/cubicecho/agent-mcp-pool
npm: https://www.npmjs.com/package/@cubicecho/agent-mcp-pool
---

agent-mcp-pool keeps a set of Model Context Protocol clients connected and
hands their combined tools to an OpenAI-compatible agent loop, namespaced as
`<slug>__<tool name>` so two servers can both ship a `search` without
colliding.

Connections are long-lived and shared across runs on purpose: a stdio server is
a child process, and spawning one per run would cost more than the run.

Stack: TypeScript, `@modelcontextprotocol/sdk`. Published as
`@cubicecho/agent-mcp-pool`, and the tool half of
[agent-core](/projects/agent-core/).
