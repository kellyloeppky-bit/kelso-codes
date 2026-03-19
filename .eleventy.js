module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Journal collection - sorted by entry number
  eleventyConfig.addCollection("journal", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/journal/*.md")
      .sort((a, b) => {
        return (a.data.entryNumber || 0) - (b.data.entryNumber || 0);
      });
  });

  // Paired shortcode for lesson blocks
  eleventyConfig.addPairedShortcode("lesson", function(content, title) {
    // Remove wrapping <p> tags if markdown processor added them
    const cleanContent = content.trim().replace(/^<p>(.*)<\/p>$/s, '$1');
    return `<div class="lesson">
  <strong>${title}</strong>
  ${cleanContent}
</div>`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
