const routes = require("../middlewares/routeManagerConfigs");

function routeRoot(req, res) {
  const name = "Node.js Boilerplate Application API";

  const description = "List of public route addresses.";

  function filter(r) {
    return !r.authenticate && !r.path.startsWith("/auth") && r.method === "GET";
  }

  function map(r) {
    return { path: `/api${r.path}`, method: r.method };
  }

  const payload = { name, description, routes: routes.filter(filter).map(map) };

  res.json(payload);
}

module.exports = routeRoot;
