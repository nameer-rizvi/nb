const config = require("../config");
const util = require("../util");
const simpul = require("simpul");
const database = require("../database");

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
      if (!simpul.isFunction(route.getUrls)) {
        const warning = `missing getUrls resolver for route ("${route.pathname}")`;
        util.log.job(warning);
        continue;
      }
      const urlsDynamic = await route.getUrls(database);
      urls.push(...urlsDynamic.map((loc) => ({ loc, ...route.sitemap })));
    }
  }

  const pages = simpul.batchify(urls, MAXIMUM_URLS);

  const count = { urls: urls.length, pages: pages.length };

  const collection = database.collection.sitemap;

  await database.client.cut({ collection });

  await database.client.add({ collection, count, pages });

  if (count.pages >= MAXIMUM_URLS) {
    const warning = `Sitemap url generator is at capacity ("${MAXIMUM_URLS.toLocaleString()}")`;
    util.log.warning(warning);
    // TODO: dynamically nest sitemap pages (e.g. index pages of index pages of urls) based on url count.
  }
}

module.exports = generateSitemapUrls;

// https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
