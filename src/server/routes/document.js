const database = require("../../database");

function routeDocument(req, res, next) {
  try {
    const methodResolver = {
      POST: (values) => database.create(values.document),
      GET: (values) => database.read(values.id),
      PUT: (values) => database.update(values.document),
      DELETE: (values) => database.delete(values.id),
    };

    const response = methodResolver[req.method](res.locals.values);

    res.json(response);
  } catch (error) {
    next("400::" + error.toString());
  }
}

module.exports = routeDocument;
