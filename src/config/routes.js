const cache = {
  week1: 60 * 60 * 24 * 7,
};

const configs = [
  // api routes
  {
    method: "post",
    pathname: "/api/error",
    requiredKeys: ["error"],
  },
  // public routes
  {
    method: "get",
    pathname: "/favicon.ico",
    redirect: "/static/img/favicon.ico",
  },
  {
    method: "get",
    pathname: "/manifest.json",
    cacheMaxAge: cache.week1,
  },
  {
    method: "get",
    pathname: "/robots.txt",
    cacheMaxAge: cache.week1,
  },
  {
    method: "get",
    pathname: "/sitemap.xml",
    cacheMaxAge: cache.week1,
  },
  {
    method: "get",
    pathname: "/sitemap-:page.xml",
    cacheMaxAge: cache.week1,
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
