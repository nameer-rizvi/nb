const config = require("../../config");

function getRobotsTxt(req, res) {
  const settings = [];

  settings.push("User-agent: *");

  if (config.routesDisallowed?.length) {
    const routesDisallowed = config.routesDisallowed.map((path) => {
      return `Disallow: ${path}/`;
    });

    settings.push(...routesDisallowed);
  }

  if (config.routesAllowed?.length) {
    const routesAllowed = config.routesAllowed.map((path) => {
      return `Allow: ${path}/`;
    });

    settings.push(...routesAllowed);
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
