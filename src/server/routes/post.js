const jsontxt = require("jsontxt");

module.exports = (req, res, next) => {
  try {
    jsontxt.write(res.locals);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
