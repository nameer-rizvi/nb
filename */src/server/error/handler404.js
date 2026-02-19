const util = require("../../util");
const page = require("./page");

function handler404(req, res) {
  if (util.isRoute.webpage(req)) {
    res.status(404).send(page(404, "Page does not exist"));
  } else {
    res.sendStatus(404);
  }
}

module.exports = handler404;
