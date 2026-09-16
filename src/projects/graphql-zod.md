---
title: graphql-zod
tagline: Build Zod validation schemas from GraphQL typed documents.
category: dev
order: 6
repo: https://github.com/cubicecho/graphql-zod
---

graphql-zod builds [Zod](https://zod.dev) validation schemas from your GraphQL
operations. The runtime's `inferZodSchema` derives a Zod schema for an
operation's variables from a `TypedDocumentNode`, and a graphql-codegen plugin
emits `Variables` and `Result` schemas for every named operation — so inputs
and outputs are validated against the same types the queries already use,
rather than a second hand-written copy of them.

Stack: TypeScript, Zod, graphql-codegen. An npm-workspaces monorepo.
