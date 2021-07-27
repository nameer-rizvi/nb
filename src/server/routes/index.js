const express = require("express");
const router = express.Router();

async function route(req, res, next) {
  try {
    res.sendStatus(418);
  } catch (error) {
    next(error);
  }
}

router.get("*", route);

module.exports = router;
