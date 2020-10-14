const jsontxt = require("jsontxt");

module.exports = (req, res, next) => {
  jsontxt.write({ ...jsontxt.read(), [req.user]: {} });
  res.sendStatus(200);
};
