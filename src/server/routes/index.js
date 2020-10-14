const express = require("express");
const post = require("./post");
const get = require("./get");
const put = require("./put");
const _delete = require("./delete");
const { basicAuth } = require("../middleware");

const router = express.Router();

router
  .route("/")
  .post(basicAuth, post)
  .get(get)
  .put(basicAuth, put)
  .delete(basicAuth, _delete);

module.exports = router;
