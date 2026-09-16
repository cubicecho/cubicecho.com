---
title: graphql-codegen-field-descriptions
tagline: A codegen plugin that emits SDL field descriptions as a runtime map.
category: dev
order: 8
repo: https://github.com/cubicecho/graphql-codegen-field-descriptions
npm: https://www.npmjs.com/package/@cubicecho/graphql-codegen-field-descriptions
---

SDL `"""..."""` descriptions are normally compile-time only: codegen turns them
into JSDoc on the generated TypeScript types, and they disappear at run time.
This [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) plugin
captures them as data instead.

Which means the app can render the documentation you already wrote — the info
tooltip beside a form label, the help text in an admin UI, the description on
an LLM tool — from the schema, instead of a second copy that goes stale.

Stack: TypeScript, GraphQL Codegen. Published as
`@cubicecho/graphql-codegen-field-descriptions`.
