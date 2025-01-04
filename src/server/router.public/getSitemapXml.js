const database = require("../../database");
const ui = require("../../ui");

async function getSitemapXml(req, res, next) {
  try {
    const sitemap = await database.client.get({
      collection: res.locals.collection,
    });

    if (!sitemap[0]?.pagesCount) {
      res.sendStatus(404);
      return;
    }

    let counter = 0;

    const xml = { type: "sitemap", list: [] };

    while (counter < sitemap[0].pagesCount) {
      counter++;
      xml.list.push({ loc: res.locals.url.origin + `/sitemap-${counter}.xml` });
    }

    res.type("application/xml").send(ui.document.xml(xml));
  } catch (error) {
    next(error);
  }
}

module.exports = getSitemapXml;

// https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
