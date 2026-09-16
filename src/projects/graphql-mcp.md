---
title: graphql-mcp
tagline: Turn a GraphQL schema into a Model Context Protocol server.
category: dev
order: 3
repo: https://github.com/cubicecho/graphql-mcp
npm: https://www.npmjs.com/package/@cubicecho/graphql-mcp
---

Point `@cubicecho/graphql-mcp` at a `GraphQLSchema` and every `Query` and
`Mutation` root field becomes an MCP **tool**, described straight from your SDL
— field and argument descriptions, types — so an AI can discover and call your
API without a hand-written tool definition per field.

It is a thin wrapper meant to run side-by-side with your GraphQL server: mount
the returned HTTP handler on a route in the same app, or run it as its own
process forwarding to a remote endpoint.

Stack: TypeScript, `@modelcontextprotocol/sdk`, graphql.
