const element = require("./element");
const util = require("../util");

function xmlDocument(...configs) {
  const xmlElement = element("?xml", {
    version: "1.0",
    encoding: "UTF-8",
  });

  const xmlns = "http://www.sitemaps.org/schemas/sitemap/0.9";

  const sections = [];

  for (const config of configs) {
    if (config.type === "sitemap") {
      const xmlList = getXmlList("sitemap", config.list);
      sections.push(element("sitemapindex", { xmlns, children: xmlList }));
    } else if (config.type === "urlset") {
      const xmlList = getXmlList("url", config.list);
      sections.push(element("urlset", { xmlns, children: xmlList }));
    } else {
      util.log.ui(`xml config type not supported ("${config.type}")`);
    }
  }

  if (!sections.length) return "";

  return [xmlElement, ...sections].join("\n");
}

function getXmlList(name, items) {
  const list = [];
  for (const item of items) {
    const parts = [];
    for (const [tagName, children] of Object.entries(item)) {
      parts.push(element(tagName, { children }));
    }
    list.push(element(name, { children: parts }));
  }
  return list;
}

module.exports = xmlDocument;
