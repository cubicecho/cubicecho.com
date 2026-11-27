---
title: mcp-discovery
tagline: Advertise and discover MCP servers — Server Cards, AI Catalogs, and mDNS on the LAN.
category: libs
order: 3
repo: https://github.com/cubicecho/mcp-discovery
npm: https://www.npmjs.com/package/@cubicecho/mcp-discovery
---

A server describes itself with an
[MCP Server Card](https://modelcontextprotocol.io/seps/2127-mcp-server-cards):
its name, version, and the URLs it can be reached at. A host lists its cards in
an AI Catalog at `/.well-known/ai-catalog.json`. A client fetches the catalog,
then each card, and knows where to connect without being configured by hand.

mcp-discovery does both halves — building, validating and serving cards and
catalogs as Express middleware, and discovering them from a client — and on a
LAN it can advertise and find hosts over mDNS. It is how
[mcp-router](/projects/mcp-router/) finds
[mcp-skills-manager](/projects/mcp-skills-manager/) on the network with no
address typed in.

Stack: TypeScript, zod. Published as `@cubicecho/mcp-discovery`.
