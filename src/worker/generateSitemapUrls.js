const config = require("../config");
const util = require("../util");
const database = require("../database");
const simpul = require("simpul");

const MAXIMUM_URLS = 50000; // https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#general-guidelines

async function generateSitemapUrls() {
  const urls = [];

  // Push non-dynamic webpage urls first.
  for (const route of config.routes) {
    if (util.isRoute.webpage(route) && !util.isRoute.dynamic(route)) {
      urls.push({ loc: route.pathname, ...route.sitemap });
    }
  }

  // Push dynamic webpage urls second.
  for (const route of config.routes) {
    if (util.isRoute.webpage(route) && util.isRoute.dynamic(route)) {
      // TODO: Handle complex dynamic routes, like "/:collection/:id-:created_at/error-:created_at"
    }
  }

  const collection = database.collection.sitemap;

  const pages = simpul.batchify(urls, MAXIMUM_URLS);

  const pagesCount = pages.length;

  await database.client.cut({ collection });

  await database.client.add({ collection, pagesCount, pages });
}

module.exports = generateSitemapUrls;

// https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
