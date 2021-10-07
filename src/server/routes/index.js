const express = require("express");
const router = express.Router();

router.use("/", require("./document"));
router.post("/error", require("./error"));
router.get("/health", require("./health"));

module.exports = router;
