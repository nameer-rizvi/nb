// --starterKit-flag [basically everything in this folder... Let's get busy!]
const routes = require("../middlewares/routeManagerConfigs");

const routeRoot = (req, res) =>
  res.json({
    name: "Application API",
    description: "List of route addresses.",
    routes: routes
      .filter((r) => r.method === "GET")
      .map((r) => ({ path: `/api${r.path}`, method: r.method })),
  });

module.exports = routeRoot;
