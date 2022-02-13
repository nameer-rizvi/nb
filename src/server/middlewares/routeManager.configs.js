const { CACHE } = require("./apicache");

// --starterKit-flag [set api route configs here]

// The route manager restricts access to only those api routes that are defined
// in the configs store here. It can be shaped any way you like, so long as there's
// a "route" and a "method" value included, and it can be accessed in any proceeding middleware.

const routeManagerMiddlewareConfigs = [
  {
    route: "/",
    method: "GET",
    cache: CACHE.MAX,
  },
  {
    route: "/document",
    method: "DELETE",
    authenticate: "bearerToken",
    requiredParams: ["id"],
  },
  {
    route: "/document",
    method: "GET",
    // ignoreValidation: true,
    cache: CACHE.STALE,
  },
  {
    route: "/document",
    method: "POST",
    authenticate: "bearerToken",
    requiredParams: ["document"],
  },
  {
    route: "/document",
    method: "PUT",
    authenticate: "bearerToken",
    requiredParams: ["document"],
  },
  {
    route: "/error",
    method: "POST",
    requiredParams: ["error"],
  },
  {
    route: "/favicon.ico",
    method: "GET",
    cache: CACHE.MAX,
  },
];

module.exports = routeManagerMiddlewareConfigs;
