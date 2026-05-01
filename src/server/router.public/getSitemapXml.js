const database = require("../../database");
const ui = require("../../ui");

async function getSitemapXml(req, res, next) {
  try {
    const collection = await database.client.get({
      collection: database.collection.sitemap,
    });

    const sitemap = collection?.[0] || {};

    if (!(sitemap.count?.pages > 0)) {
      res.sendStatus(404);
      return;
    }

    if (sitemap.count.pages === 1) {
      const xml = { type: "urlset", list: [] };

      for (const url of sitemap.pages[0]) {
        xml.list.push({ ...url, loc: res.locals.url.origin + url.loc });
      }

      res.type("application/xml").send(ui.document.xml(xml));

      return;
    }

    const xml = { type: "sitemap", list: [] };

    for (let counter = 1; counter <= sitemap.count.pages; counter++) {
      xml.list.push({ loc: res.locals.url.origin + `/sitemap-${counter}.xml` });
    }

    res.type("application/xml").send(ui.document.xml(xml));
  } catch (error) {
    next(error);
  }
}

module.exports = getSitemapXml;

// https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
