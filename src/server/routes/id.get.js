const database = require("../../database");

function routeIdGet(req, res, next) {
  try {
    const documentWithId = database.read(res.locals.values.id);
    res.json(documentWithId);
  } catch (error) {
    next("400::" + error.toString());
  }
}

module.exports = routeIdGet;
