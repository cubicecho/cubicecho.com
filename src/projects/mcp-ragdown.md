---
title: mcp-ragdown
tagline: Hybrid RAG search over a folder of Markdown files, as an MCP server and an agent hook.
category: ai
order: 4
repo: https://github.com/cubicecho/mcp-ragdown
---

Point mcp-ragdown at a folder of Markdown and it embeds every section into a
local LanceDB index, then keeps that index in sync as the files change. Agents
get search tools over it, and a hook that calls `ragdown_context` before each
turn quietly adds the related notes to the prompt.

The tool layout follows [mcp-zeromem](/projects/mcp-zeromem/), but the memory
here is your own Markdown rather than conversation turns. Everything an agent
or a hook does goes through MCP — there is no hook command and no hook HTTP
route; the only other routes feed the web UI.

Stack: TypeScript, LanceDB, MCP.
