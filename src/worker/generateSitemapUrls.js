const config = require("../config");
const util = require("../util");
const utilN = require("@nameer/utils");
const database = require("../database");
const MAXIMUM_URLS = 50_000; // https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#general-guidelines

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
      if (!utilN.isFunction(route.getSitemapUrls)) {
        const warning = `missing getSitemapUrls function for route ("${route.pathname}")`;
        util.log.job(warning, "warn");
        continue;
      }
      try {
        const urlsDynamic = await route.getSitemapUrls(database);
        urls.push(...urlsDynamic.map((loc) => ({ loc, ...route.sitemap })));
      } catch (error) {
        const warning = `getSitemapUrls failed for route ("${route.pathname}"): ${error}`;
        util.log.job(warning, "warn");
        continue;
      }
    }
  }

  const pages = utilN.batchify(urls, MAXIMUM_URLS);

  const count = { urls: urls.length, pages: pages.length };

  const collection = database.collection.sitemap;

  await database.client.cut({ collection });

  await database.client.add({ collection, count, pages });

  if (count.pages >= MAXIMUM_URLS) {
    const warning = `sitemap url generator is at capacity ("${MAXIMUM_URLS.toLocaleString()}")`;
    util.log.job(warning, "warn");
    // TODO when pages is at max capacity, create index page for pages, make it recursive to handle it endlesslely.
  }
}

module.exports = generateSitemapUrls;

// https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
