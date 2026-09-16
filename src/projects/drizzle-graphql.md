---
title: drizzle-graphql
tagline: Generate a GraphQL schema, or just its fields, from a Drizzle ORM schema.
category: dev
order: 4
repo: https://github.com/cubicecho/drizzle-graphql
npm: https://www.npmjs.com/package/@vantreeseba/drizzle-graphql
---

Pass your Drizzle database instance and schema to the builder and get back
`{ schema, entities }`. Use `schema` directly with any server that consumes a
`GraphQLSchema` — GraphQL Yoga, Apollo Server — or take `entities` and assemble
the fields you want into a schema of your own, which is the usual case once
authorization and custom resolvers are in play.

Stack: TypeScript, Drizzle ORM, graphql. Published as
`@vantreeseba/drizzle-graphql`.
