---
title: engrafo
tagline: A minimal self-hostable document archive — the short path through Paperless-ngx.
category: cloud
order: 8
repo: https://github.com/cubicecho/engrafo
---

Upload a file. It goes straight into an S3-compatible bucket, a small pipeline
runs over it, the text it found lands in a second bucket, and what came out is
on the document's page. Postgres holds the metadata and nothing bulky. That is
the whole product.

Everything Paperless-ngx does that you were not going to use is the part that
is missing on purpose.

Stack: TypeScript, Postgres, S3-compatible storage.
