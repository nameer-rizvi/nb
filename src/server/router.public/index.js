const express = require("express");
const middlewares = require("../middlewares");
const config = require("../../config");
const util = require("../../util");
const utilN = require("@nameer/utils");

const router = express.Router();

if (middlewares.public.length) router.use(middlewares.public);

for (const route of config.routes) {
  if (util.isRoute.public(route)) {
    const pathname = route.pathname;
    const filename = route.method + utilN.changecase.pascalCase(pathname);
    router[route.method](route.pathname, require(`./${filename}`));
  }
}

module.exports = router;
