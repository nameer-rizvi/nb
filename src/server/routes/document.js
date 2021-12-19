const database = require("../../database");

function routeDocument(req, res, next) {
  try {
    // Assign database controllers to appropriate request methods.

    const methodResolver = {
      POST: (values) => database.create(values.document),
      GET: (values) => database.read(values.id),
      PUT: (values) => database.update(values.document),
      DELETE: (values) => database.delete(values.id),
    };

    // Call database controller with request method and save response.

    const response = methodResolver[req.method](res.locals.values);

    // Send client a 200 ("OK") status with the database controller response.

    res.json(response);
  } catch (error) {
    // Send client a 400 ("Bad Request") status with the controller error.

    next("400::" + error.toString());
  }
}

module.exports = routeDocument;
