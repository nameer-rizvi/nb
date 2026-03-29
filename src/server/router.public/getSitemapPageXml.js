const simpul = require("simpul");
const database = require("../../database");
const ui = require("../../ui");

async function getSitemapPageXml(req, res, next) {
  try {
    const page = +req.params.page;

    if (!simpul.isNumber(page)) {
      throw new TypeError("Page param must be a valid number.");
    }

    const collection = await database.client.get({
      collection: database.collection.sitemap,
    });

    const sitemap = collection?.[0] || {};

    if (!(sitemap.count?.pages > 0) || !sitemap.pages[page - 1]) {
      res.sendStatus(404);
      return;
    }

    const xml = { type: "urlset", list: [] };

    for (const url of sitemap.pages[page - 1]) {
      xml.list.push({ ...url, loc: res.locals.url.origin + url.loc });
    }

    res.type("application/xml").send(ui.document.xml(xml));
  } catch (error) {
    next(error);
  }
}

module.exports = getSitemapPageXml;

// https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
