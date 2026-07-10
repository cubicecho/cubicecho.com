---
title: graphql-casl
tagline: CASL permission rules for GraphQL resolvers.
status: alpha
version: v0.2.1
category: dev
order: 1
repo: https://github.com/vantreeseba/graphql-casl
---

graphql-casl is a toolkit for defining [CASL](https://casl.js.org) authorization
rules on GraphQL resolvers. The runtime is a `graphql-middleware` plugin for
declaring permission rules; a companion GraphQL Code Generator plugin emits
typed subject bindings from your schema, so your rules stay in sync with your
types.

Stack: TypeScript, graphql-middleware, CASL, GraphQL Codegen. An npm-workspaces
monorepo published as `@vantreeseba/graphql-casl`.
