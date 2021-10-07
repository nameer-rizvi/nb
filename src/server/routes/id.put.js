const database = require("../../database");

function routeIdPut(req, res, next) {
  try {
    console.log(res.locals.values.document);
    const update = database.update(res.locals.values.document);
    res.json(update);
  } catch (error) {
    next("400::" + error.toString());
  }
}

module.exports = routeIdPut;
