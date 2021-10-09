const routes = require("../middlewares/routeManager.configs");

// Map of api routes + route config/requirements.

const rootRoute = (req, res) => res.json({ routes });

module.exports = rootRoute;
