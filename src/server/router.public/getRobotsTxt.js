const config = require("../../config");

function getRobotsTxt(req, res) {
  const settings = [];

  settings.push("User-agent: *");

  if (config.routesDisallowed?.length) {
    for (const path of config.routesDisallowed) {
      settings.push(`Disallow: ${path}/`);
    }
  }

  if (config.routesAllowed?.length) {
    for (const path of config.routesAllowed) {
      settings.push(`Allow: ${path}/`);
    }
  }

  settings.push(""); // line break

  const url = config.urlWebsite || config.urlLocalhost || "";

  settings.push(`Sitemap: ${url}/sitemap.xml`);

  res.type("text/plain").send(settings.join("\n"));
}

module.exports = getRobotsTxt;

// https://developer.mozilla.org/en-US/docs/Glossary/Robots.txt
// https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/Robots_txt
// https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
