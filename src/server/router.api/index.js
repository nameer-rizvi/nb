const express = require("express");
const middlewares = require("../middlewares");
const config = require("../../config");
const util = require("../../util");
const simpul = require("simpul");

const router = express.Router();

if (middlewares.api.length) router.use("/api", middlewares.api);

for (const route of config.routes) {
  if (util.isRoute.api(route)) {
    const pathname = route.pathname.replace("/api", "");
    const filename = route.method + simpul.changecase.pascalCase(pathname);
    router[route.method](route.pathname, require(`./${filename}`));
  }
}

module.exports = router;
