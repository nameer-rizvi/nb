const routes = require("../middlewares/routeManager.configs");

// Send client a 200 ("OK") status with a json map of api routes + route config/requirements.

const routeRoot = (req, res) =>
  res.json({
    name: "Application API",
    description: "List of route addresses.",
    routes: routes.map((r) => ({ path: r.path, method: r.method })),
  });

module.exports = routeRoot;
