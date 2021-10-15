// Sample Config:
//
// {
//   route: "/",
//   method: "GET",
//   authenticate: true,
//   requiredValues: ["id"],
// }

const routeManagerMiddlewareConfigs = [
  {
    route: "/",
    method: "GET",
  },
  {
    route: "/document",
    method: "POST",
    authenticate: true,
    requiredValues: ["document"],
  },
  {
    route: "/document",
    method: "GET",
  },
  {
    route: "/document",
    method: "PUT",
    authenticate: true,
    requiredValues: ["document"],
  },
  {
    route: "/document",
    method: "DELETE",
    authenticate: true,
    requiredValues: ["id"],
  },
  {
    route: "/error",
    method: "POST",
    authenticate: true,
    requiredValues: ["error"],
  },
  {
    route: "/favicon.ico",
    method: "GET",
  },
  {
    route: "/health",
    method: "GET",
  },
];

module.exports = routeManagerMiddlewareConfigs;
