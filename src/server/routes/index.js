// --starterKit-flag [basically everything in this folder... Let's get busy!]
const express = require("express");
const router = express.Router();

router.get("/", require("./root"));
router.all("/document", require("./document"));
router.post("/error", require("./error"));

module.exports = router;
