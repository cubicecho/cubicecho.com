---
title: graphql-mcp
tagline: Turn a GraphQL schema into a Model Context Protocol server.
status: alpha
version: v0.1.1
category: dev
order: 3
repo: https://github.com/cubicecho/graphql-mcp
npm: https://www.npmjs.com/package/@cubicecho/graphql-mcp
---

Point `@cubicecho/graphql-mcp` at a `GraphQLSchema` and every `Query` and
`Mutation` root field becomes an MCP **tool**, described straight from your SDL
— field and argument descriptions, types — so an AI can discover and call your
API.

It's a thin wrapper meant to run side-by-side with your GraphQL server: mount
the returned HTTP handler on a route in the same app, or run it as its own
process forwarding to a remote GraphQL endpoint.

Stack: TypeScript, `@modelcontextprotocol/sdk`, graphql. Published to npm as
`@cubicecho/graphql-mcp`.
