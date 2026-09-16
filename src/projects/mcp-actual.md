---
title: mcp-actual
tagline: An MCP server for Actual Budget — accounts, balances and transactions, over MCP.
category: ai
order: 5
repo: https://github.com/cubicecho/mcp-actual
---

mcp-actual connects to your [Actual Budget](https://actualbudget.org) sync
server, opens one budget file, and exposes it to MCP clients over streamable
HTTP (`/mcp`) or stdio — so an agent can answer questions about your budget
without a screen-scrape or a CSV export.

Read-only tools are always served. Tools that modify the budget are served only
when writes are enabled, and turning `ACTUAL_ENABLE_WRITES` off removes them
from the tool list entirely rather than failing the call — an agent cannot
misuse a tool it was never offered.

Stack: TypeScript, `@modelcontextprotocol/sdk`, the Actual API.
