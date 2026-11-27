---
title: symphony
tagline: One UI for the cubicecho apps — GraphQL to each server, MCP to their agents.
category: other
order: 1
repo: https://github.com/cubicecho/symphony
status: early
---

The personal-cloud apps are each their own server with their own GraphQL API.
symphony is a single UI over all of them: register each API as an
**upstream**, and modules — small React components written against those
schemas — are checked and placed on pages.

The modules can be written by you or by an agent. symphony serves its own MCP
endpoint with the tools an agent needs to do it: read the module contract,
search an upstream's schema, run a query against real data, and submit a module
until it checks out.

Early: no sign-in yet. Stack: TypeScript, React, GraphQL, MCP, Docker.
