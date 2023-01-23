// --starterKit-flag [basically everything in this folder... Let's get busy!]
const express = require("express");
const router = express.Router();

router.get("/", require("./root"));
router.all("/document", require("./document"));
router.post("/error", require("./error"));
router.get("/favicon.ico", require("./favicon"));

module.exports = router;
