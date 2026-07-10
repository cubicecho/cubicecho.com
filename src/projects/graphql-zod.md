---
title: graphql-zod
tagline: Build Zod validation schemas from GraphQL typed documents.
status: alpha
category: dev
order: 2
repo: https://github.com/vantreeseba/graphql-zod
---

graphql-zod builds [Zod](https://zod.dev) validation schemas from your GraphQL
operations. The runtime's `inferZodSchema` derives a Zod schema for an
operation's variables from a `TypedDocumentNode`, and a graphql-codegen plugin
emits `Variables` and `Result` schemas for every named operation — so you
validate inputs and outputs against the same types your queries already use.

Stack: TypeScript, Zod, graphql-codegen. An npm-workspaces monorepo published as
`@vantreeseba/graphql-zod`.
