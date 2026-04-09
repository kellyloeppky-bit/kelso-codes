module.exports = {
  eleventyComputed: {
    permalink: data => {
      // Don't generate pages for drafts
      if (data.draft) {
        return false;
      }
      // Otherwise use default permalink
      return data.permalink;
    }
  }
};
