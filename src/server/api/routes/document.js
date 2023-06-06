const database = require("../../../database");

function routeDocument(req, res, next) {
  try {
    const methodResolver = {
      POST: (values) => database.controller.document.create(values.document),
      GET: (values) => database.controller.document.read(values.id),
      PUT: (values) => database.controller.document.update(values.document),
      DELETE: (values) => database.controller.document.delete(values.id),
    };

    const response = methodResolver[req.method](res.locals.values);

    res.json(response);
  } catch (error) {
    error.status = 400;
    next(error);
  }
}

module.exports = routeDocument;
