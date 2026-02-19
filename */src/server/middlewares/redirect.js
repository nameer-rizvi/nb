const express = require("express");
const config = require("../../config");
const util = require("../../util");

const router = express.Router();

for (const route of config.routes) {
  if (util.isRoute.redirect(route)) {
    router[route.method](route.pathname, function handler(req, res) {
      res.redirect(route.redirect);
    });
  }
}

module.exports = router;
