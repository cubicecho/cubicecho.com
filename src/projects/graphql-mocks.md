---
title: graphql-mocks
tagline: Realistic, graph-connected mock data from a GraphQL schema.
category: dev
order: 7
repo: https://github.com/cubicecho/graphql-mocks
npm: https://www.npmjs.com/package/@vantreeseba/graphql-mocks
---

Generate interconnected mock objects from a `GraphQLSchema` (or SDL) with
faker — connected being the point: a mocked `Post` has a mocked `Author` that
is the same object everywhere it appears, so a UI built against the mocks
behaves the way it will against the server. A codegen plugin emits a
`SchemaTypeMap` for typing the mock pools.

Stack: TypeScript, graphql, faker, GraphQL Codegen. An npm-workspaces monorepo
published as `@vantreeseba/graphql-mocks`.
