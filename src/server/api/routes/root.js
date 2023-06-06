// --starterKit-flag [basically everything in this folder... Let's get busy!]
const routes = require("../middlewares/routeManagerConfigs");

function routeRoot(req, res) {
  const name = "Node.js Boilerplate Application API";

  const description = "List of route addresses.";

  const _routes = routes
    .filter((r) => r.method === "GET")
    .map((r) => ({ path: `/api${r.path}`, method: r.method }));

  const payload = { name, description, routes: _routes };

  res.json(payload);
}

module.exports = routeRoot;
