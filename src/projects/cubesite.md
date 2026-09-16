---
title: cubesite
tagline: One brand, one stylesheet, one Pages workflow — for every cubicecho repo.
category: dev
order: 2
repo: https://github.com/cubicecho/cubesite
homepage: https://cubicecho.github.io/cubesite/
---

cubesite is [cubeui](/projects/cubeui/)'s argument one layer out. Before it,
four repos had a project site and each had written its own stylesheet, its own
layout, its own header — they did not look like the same org, because nothing
made them. Most repos had no site at all, so the only public face of a library
was a README in GitHub's chrome.

So this repo owns the brand — the mark, the tokens, and the shared
`cubesite.css` every project site is built from — and the floor: a one-page
Eleventy scaffold and one canonical Pages workflow, written into a repo by a
script that only ever overwrites the files it owns.

The standard it enforces is simple: every repo under Cubic Echo has a site at
`cubicecho.github.io/<repo>/`, and `npm run audit` says which ones still don't.

Stack: TypeScript-free — Eleventy, plain CSS, and two Node scripts.
