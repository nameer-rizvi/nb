const routeManagerMiddlewareConfigs = [
  {
    route: "/",
    method: "GET",
  },
  {
    route: "/document",
    method: "POST",
    authenticate: "bearerToken",
    requiredValues: ["document"],
  },
  {
    route: "/document",
    method: "GET",
  },
  {
    route: "/document",
    method: "PUT",
    authenticate: "bearerToken",
    requiredValues: ["document"],
  },
  {
    route: "/document",
    method: "DELETE",
    authenticate: "bearerToken",
    requiredValues: ["id"],
  },
  {
    route: "/error",
    method: "POST",
    authenticate: "bearerToken",
    requiredValues: ["error"],
  },
  {
    route: "/favicon.ico",
    method: "GET",
  },
];

module.exports = routeManagerMiddlewareConfigs;
