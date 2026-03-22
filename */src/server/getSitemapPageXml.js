const simpul = require("simpul");
const database = require("../../database");
const ui = require("../../ui");

async function getSitemapPageXml(req, res, next) {
  try {
    const page = +req.params.page;

    if (!simpul.isNumber(page)) throw new TypeError("Page is not a number.");

    const sitemap = await database.client.get({
      collection: database.collection.sitemap,
    });

    if (!sitemap[0]?.pages?.[page - 1]) {
      res.sendStatus(404);
      return;
    }

    const xml = { type: "urlset", list: [] };

    for (const url of sitemap[0].pages[page - 1]) {
      xml.list.push({ ...url, loc: res.locals.url.origin + url.loc });
    }

    res.type("application/xml").send(ui.document.xml(xml));
  } catch (error) {
    next(error);
  }
}

module.exports = getSitemapPageXml;

// https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
