const express = require("express");
const middlewares = require("../middlewares");
const path = require("path");

const router = express.Router();

router.use("/static", middlewares.static, express.static(path.join(__dirname)));

module.exports = router;
