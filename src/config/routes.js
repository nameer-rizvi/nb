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
  },
  {
    method: "get",
    pathname: "/robots.txt",
  },
  {
    method: "get",
    pathname: "/sitemap.xml",
    collection: "sitemap",
  },
  {
    method: "get",
    pathname: "/sitemap-:page.xml",
    collection: "sitemap",
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
