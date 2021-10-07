const routeManagerMiddlewareConfigs = [
  {
    route: "/",
    method: "POST",
    authenticate: true,
    requiredValues: ["document"],
  },
  {
    route: "/",
    method: "GET",
  },
  {
    route: "/",
    method: "PUT",
    authenticate: true,
    requiredValues: ["document"],
  },
  {
    route: "/",
    method: "DELETE",
    authenticate: true,
    requiredValues: ["id"],
  },
  {
    route: "/error",
    method: "POST",
    requiredValues: ["error"],
  },
  {
    route: "/health",
    method: "GET",
  },
];

module.exports = routeManagerMiddlewareConfigs;
