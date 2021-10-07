const database = require("../../database");

function routeIdPost(req, res, next) {
  try {
    const insert = database.create(res.locals.values.document);
    res.json(insert);
  } catch (error) {
    next("400::" + error.toString());
  }
}

module.exports = routeIdPost;
