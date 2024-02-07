const routes = require("../middlewares/routeManagerConfigs");

function routeRoot(req, res) {
  const name = `${constant.app_name} API`;

  const description = "List of public route addresses.";

  function routesFilter(r) {
    return (
      !r.environment &&
      !r.authenticate &&
      !r.path.startsWith("/auth") &&
      r.method === "GET"
    );
  }

  function routesMap(r) {
    return {
      path: `/api${r.path}`,
      method: r.method,
    };
  }

  const payload = {
    name,
    description,
    routes: routes.filter(routesFilter).map(routesMap),
  };

  res.json(payload);
}

module.exports = routeRoot;
