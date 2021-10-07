const database = require("../../database");

function routeIdDelete(req, res, next) {
  try {
    const deleteStatus = database.delete(res.locals.values.id);
    res.json(deleteStatus);
  } catch (error) {
    next("400::" + error.toString());
  }
}

module.exports = routeIdDelete;
