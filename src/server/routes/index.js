const express = require("express");
const router = express.Router();

router.post("/error", require("./error"));

router.get("/health", require("./health"));

router
  .route("/")
  .post(require("./id.post"))
  .get(require("./id.get"))
  .put(require("./id.put"))
  .delete(require("./id.delete"));

module.exports = router;
