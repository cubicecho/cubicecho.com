const fs = require("node:fs");
const path = require("node:path");
const categories = require("./src/_data/categories.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
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
