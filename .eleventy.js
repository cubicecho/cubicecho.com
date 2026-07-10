module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.setServerOptions({ port: 3000 });

  const byOrder = (a, b) => (a.data.order ?? 99) - (b.data.order ?? 99);
  // Every project has a category; the default (unset) is a general "app".
  const categoryOf = (p) => p.data.category || "app";
  const inCategory = (cat) => (api) =>
    api
      .getFilteredByTag("project")
      .filter((p) => categoryOf(p) === cat)
      .sort(byOrder);

  eleventyConfig.addCollection("project", (api) =>
    api.getFilteredByTag("project").sort(byOrder),
  );

  // The home "Projects" list, the "AI Projects" tab, and the "Dev Tools" tab
  // are a partition of the same set, split on the `category` frontmatter field.
  eleventyConfig.addCollection("projectMain", inCategory("app"));
  eleventyConfig.addCollection("projectAi", inCategory("ai"));
  eleventyConfig.addCollection("projectDev", inCategory("dev"));

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
