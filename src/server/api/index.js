const express = require("express");
const router = express.Router();
const middlewares = require("./middlewares");
const routes = require("./routes");
const errors = require("./errors");

router.use("/api", middlewares, routes, errors);

module.exports = router;
