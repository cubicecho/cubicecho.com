const fs = require("node:fs");
const path = require("node:path");
const categories = require("./src/_data/categories.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  // Mermaid, self-hosted, for ```mermaid blocks in guides (see guide.njk). The
  // ESM entry imports its chunks by relative path, so they keep their layout
  // under assets/mermaid/. Source maps are left out.
  eleventyConfig.addPassthroughCopy({
    "node_modules/mermaid/dist/mermaid.esm.min.mjs": "assets/mermaid/mermaid.esm.min.mjs",
    "node_modules/mermaid/dist/chunks/mermaid.esm.min/*.mjs":
      "assets/mermaid/chunks/mermaid.esm.min",
  });
  // The stacks' compose files live in templates/<slug>/docker-compose.yml, so a
  // stack manager can deploy them straight from this repo. They are served at
  // /templates/<slug>/docker-compose.yml, and a guide shows one with
  // {% composeFile "<slug>" %}.
  eleventyConfig.addPassthroughCopy("templates");
  eleventyConfig.addShortcode("composeFile", (slug) =>
    fs.readFileSync(path.join(__dirname, "templates", slug, "docker-compose.yml"), "utf8").trimEnd(),
  );

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // A project's group, from its `category`. Done here rather than by searching
  // `categories` in the template: a `{% set %}` inside a Nunjucks `for` does not
  // escape the loop, so the template version silently returns nothing.
  eleventyConfig.addFilter(
    "group",
    (slug) => categories.find((c) => c.slug === (slug || "apps")) || null,
  );

  // Projects by slug, in the order given — for a guide's `projects` list.
  // An unknown slug fails the build rather than silently dropping a card.
  eleventyConfig.addFilter("bySlugs", (projects, slugs) =>
    (slugs || []).map((slug) => {
      const found = projects.find((p) => p.fileSlug === slug);
      if (!found) throw new Error(`guide lists unknown project "${slug}"`);
      return found;
    }),
  );

  // A guide's rendered HTML, with an id and a `#` link on every h2/h3, plus
  // the list of those headings for the section nav: `{ html, toc }`, where
  // `toc` is `[{ id, text, children: [{ id, text }] }]`. Done over the
  // rendered HTML rather than with a markdown-it plugin, so it needs no new
  // dependency. markdown-it emits headings as bare `<h2>…</h2>`, and code
  // blocks escape `<`, so a regex over the output only ever sees real headings.
  eleventyConfig.addFilter("guideSections", (html) => {
    const plain = (s) =>
      s
        .replace(/<[^>]+>/g, "")
        .replace(/&(amp|lt|gt|quot|#39);/g, (_, e) =>
          ({ amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'" })[e],
        )
        .trim();
    const escape = (s) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const used = new Map();
    const toc = [];
    const out = (html || "").replace(
      /<h([23])>([\s\S]*?)<\/h\1>/g,
      (_, level, inner) => {
        const text = plain(inner);
        const base =
          text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "section";
        const n = used.get(base) || 0;
        used.set(base, n + 1);
        const id = n ? `${base}-${n + 1}` : base;
        const entry = { id, text: escape(text), children: [] };
        if (level === "2" || !toc.length) toc.push(entry);
        else toc[toc.length - 1].children.push(entry);
        return (
          `<h${level} id="${id}">${inner}` +
          ` <a class="heading-anchor" href="#${id}" aria-label="Link to this section">#</a>` +
          `</h${level}>`
        );
      },
    );
    return { html: out, toc };
  });

  eleventyConfig.setServerOptions({
    host: "0.0.0.0",
    port: 3000 
  });

  const byOrder = (a, b) => (a.data.order ?? 99) - (b.data.order ?? 99);
  // Every project has a category; the default (unset) is a standalone "apps".
  const categoryOf = (p) => p.data.category || "apps";

  eleventyConfig.addCollection("project", (api) =>
    api.getFilteredByTag("project").sort(byOrder),
  );

  eleventyConfig.addCollection("guide", (api) =>
    api.getFilteredByTag("guide").sort(byOrder),
  );

  // The home page and the group pages are views of the same set, split on
  // the `category` frontmatter field. One collection per entry in
  // src/_data/categories.js — `projectMcp`, `projectCloud`, and so on — so a new
  // group needs no change here.
  for (const { slug } of categories) {
    const name = `project${slug[0].toUpperCase()}${slug.slice(1)}`;
    eleventyConfig.addCollection(name, (api) =>
      api
        .getFilteredByTag("project")
        .filter((p) => categoryOf(p) === slug)
        .sort(byOrder),
    );
  }

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
