const jsontxt = require("jsontxt");

module.exports = (req, res) => {
  jsontxt.write({ ...jsontxt.read(), [req.user]: res.locals });
  res.sendStatus(200);
};
