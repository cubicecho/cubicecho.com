---
title: graphql-casl
tagline: CASL permission rules for GraphQL resolvers.
category: dev
order: 5
repo: https://github.com/cubicecho/graphql-casl
npm: https://www.npmjs.com/package/@vantreeseba/graphql-casl
---

graphql-casl is a toolkit for defining [CASL](https://casl.js.org)
authorization rules on GraphQL resolvers. The runtime is a
`graphql-middleware` plugin for declaring them, with optional scoping and
envelop entry points; a companion codegen plugin emits typed subject bindings
from your schema, so the rules stay in step with the types; and `@can` / `@rule`
SDL directives let you declare a permission next to the field it guards.

Stack: TypeScript, graphql-middleware, CASL, GraphQL Codegen. An npm-workspaces
monorepo published as `@vantreeseba/graphql-casl`.
