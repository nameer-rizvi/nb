const database = require("../../database");

const crudResolver = {
  POST: (values) => database.create(values.document), // Create.
  GET: (values) => database.read(values.id), // Read.
  PUT: (values) => database.update(values.document), // Update.
  DELETE: (values) => database.delete(values.id), // Delete.
};

function routeDocument(req, res, next) {
  try {
    const response = crudResolver[req.method](res.locals.values);

    res.json(response);
  } catch (error) {
    next("400::" + error.toString());
  }
}

module.exports = routeDocument;
