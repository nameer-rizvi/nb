// --starterKit-flag [set api route configs here]
const apicacheMiddleware = require("./apicache");

/*
 * The route manager restricts access to only those api routes that are defined
 * in the configs store here. It can be shaped any way you like and be accessed
 * by any proceeding middleware, so long as there's a "path" and a "method" value.
 */

const routeManagerMiddlewareConfigs = [
  {
    path: "/",
    method: "GET",
    cache: apicacheMiddleware.CACHE.MAX,
  },
  {
    path: "/document",
    method: "DELETE",
    authenticate: "bearerToken",
    requiredParams: ["id"],
  },
  {
    path: "/document",
    method: "GET",
    // ignoreValidationMiddleware: true,
  },
  {
    path: "/document",
    method: "POST",
    authenticate: "bearerToken",
    requiredParams: ["document"],
  },
  {
    path: "/document",
    method: "PUT",
    authenticate: "bearerToken",
    requiredParams: ["document"],
  },
  {
    path: "/error",
    method: "POST",
    requiredParams: ["error"],
  },
].filter(Boolean);

module.exports = routeManagerMiddlewareConfigs;
