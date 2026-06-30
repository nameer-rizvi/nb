const utilN = require("@nameer/utils");

const cache = {
  week: utilN.date.MS_PER_WEEK / 1000,
};

const configs = [
  // get routes
  {
    method: "get",
    pathname: "/favicon.ico",
    redirect: "/static/img/favicon.ico",
  },
  {
    method: "get",
    pathname: "/manifest.json",
    cacheMaxAge: cache.week,
  },
  {
    method: "get",
    pathname: "/robots.txt",
    cacheMaxAge: cache.week,
  },
  {
    method: "get",
    pathname: "/sitemap.xml",
    cacheMaxAge: cache.week,
  },
  {
    method: "get",
    pathname: "/sitemap-:page.xml",
    cacheMaxAge: cache.week,
  },
  // post routes
  {
    method: "post",
    pathname: "/api/error",
    requiredKeys: ["error"],
  },
].map((config) => ({
  ...config,
  pathnameR: new RegExp(`^${config.pathname.replace(/:([^/]+)/g, "([^/]+)")}$`),
}));

function find(method, pathname) {
  const methodL = method.toLowerCase();
  const pathnameL = pathname.toLowerCase();
  for (const config of configs) {
    if (config.method !== methodL) continue;
    if (config.pathnameR.test(pathnameL)) return config;
  }
}

const disallow = ["/api"];

module.exports = { configs, find, disallow };

// https://expressjs.com/en/guide/routing.html
