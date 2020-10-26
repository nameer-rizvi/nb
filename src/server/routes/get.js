const jsontxt = require("jsontxt");

module.exports = (req, res, next) => {
  try {
    res.status(200).send(jsontxt.read());
  } catch (error) {
    next(error);
  }
};
