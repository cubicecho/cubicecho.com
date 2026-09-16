---
title: min-agent
tagline: "A very small self-hosted agent: chat over any OpenAI-compatible server, with MCP tools."
category: ai
order: 7
repo: https://github.com/cubicecho/min-agent
---

min-agent is a chat agent you host yourself, pointed at whatever
OpenAI-compatible server you already run — Ollama, llama.cpp, a hosted
endpoint. Replies render as markdown with syntax-highlighted code, MCP servers
attach their tools to the loop, and every turn reports what it cost in tokens,
time, and throughput.

Everything it knows — settings, MCP servers, sessions, and every message —
lives in Postgres, reached over a GraphQL API generated from the schema. It
runs on web, Android, and desktop from one Expo/React codebase.

Stack: TypeScript, Expo + React, GraphQL, Postgres. Shares its agent loop with
[agent-core](/projects/agent-core/) and its tool pool with
[agent-mcp-pool](/projects/agent-mcp-pool/).
