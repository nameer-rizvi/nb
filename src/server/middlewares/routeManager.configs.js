const apicache = require("apicache");

// --starterKit-flag [set api route configs here]

// The route manager restricts access to only those api routes that are defined
// in the configs store here. It can be shaped any way you like, so long as there's
// a "route" and a "method" value included, and it can be accessed in any proceeding middleware.

// Max apicache time limit: "2,147,483,647 milliseconds" || "35,791 minutes" || "596 hours" || "24 days" || "3.5 weeks"

const CACHE = {
  STALE: "5 minutes",
  MAX: "3 weeks",
};

const routeManagerMiddlewareConfigs = [
  {
    route: "/",
    method: "GET",
    cache: apicache.middleware(CACHE.MAX),
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
    cache: apicache.middleware(CACHE.STALE),
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
    cache: apicache.middleware(CACHE.MAX),
  },
];

module.exports = routeManagerMiddlewareConfigs;
