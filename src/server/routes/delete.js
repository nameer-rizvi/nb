const jsontxt = require("jsontxt");

module.exports = (req, res, next) => {
  try {
    jsontxt.delete();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
