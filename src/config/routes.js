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
    cacheMaxAge: 60 * 60 * 24 * 7,
  },
  {
    method: "get",
    pathname: "/manifest.json",
    cacheMaxAge: 60 * 60 * 24 * 7,
  },
  {
    method: "get",
    pathname: "/robots.txt",
    cacheMaxAge: 60 * 60 * 24 * 7,
  },
  {
    method: "get",
    pathname: "/sitemap.xml",
    cacheMaxAge: 60 * 60 * 24 * 7,
  },
  {
    method: "get",
    pathname: "/sitemap-:page.xml",
    cacheMaxAge: 60 * 60 * 24 * 7,
  },
];

function find(method, pathname) {
  const methodL = method.toLowerCase();
  const pathnameL = pathname.toLowerCase();
  for (const config of configs) {
    if (config.method !== methodL) continue;
    const pathnameR = config.pathname.replace(/:([^/]+)/g, "([^/]+)");
    if (new RegExp(`^${pathnameR}$`).test(pathnameL)) return config;
  }
}

const disallow = ["/api", "/static"];

module.exports = { configs, find, disallow };

// https://expressjs.com/en/guide/routing.html
