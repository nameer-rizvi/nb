const express = require("express");
const post = require("./post");
const get = require("./get");
const put = require("./put");
const _delete = require("./delete");

const router = express.Router();

router
  .route("/")
  .post(post)
  .get(get)
  .put(put)
  .delete(_delete);

module.exports = router;
