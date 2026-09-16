---
title: cubeui
tagline: A shadcn component registry for the cubicecho apps.
category: dev
order: 1
repo: https://github.com/cubicecho/cubeui
homepage: https://cubicecho.github.io/cubeui/
---

cubeui is a custom [shadcn registry](https://ui.shadcn.com/docs/registry) of
layout and form shells, installed with the shadcn CLI:

```sh
npx shadcn@latest add @cubeui/dialog-layout
```

It exists for code reduction. Every app here reaches the same handful of
shapes — a page with chrome above and below a scrolling body, a card with a
title and a footer of buttons, a dialog with a form in it — and writes each one
out again. The cost is not the typing; it is that ten hand-written copies of a
shape are ten places for it to drift, and the drift stays invisible until
someone reads them side by side. A component earns its place here by
**deleting** call sites, not by existing.

Stack: TypeScript, React, shadcn/ui, Storybook, Vite.
