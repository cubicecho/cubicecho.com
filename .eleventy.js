const categories = require("./src/_data/categories.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // A project's group, from its `category`. Done here rather than by searching
  // `categories` in the template: a `{% set %}` inside a Nunjucks `for` does not
  // escape the loop, so the template version silently returns nothing.
  eleventyConfig.addFilter(
    "group",
    (slug) => categories.find((c) => c.slug === (slug || "apps")) || null,
  );

  eleventyConfig.setServerOptions({ port: 3000 });

  const byOrder = (a, b) => (a.data.order ?? 99) - (b.data.order ?? 99);
  // Every project has a category; the default (unset) is a standalone "apps".
  const categoryOf = (p) => p.data.category || "apps";

  eleventyConfig.addCollection("project", (api) =>
    api.getFilteredByTag("project").sort(byOrder),
  );

  // The home page and the four group pages are views of the same set, split on
  // the `category` frontmatter field. One collection per entry in
  // src/_data/categories.js — `projectAi`, `projectCloud`, and so on — so a new
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
