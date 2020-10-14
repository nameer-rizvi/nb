const jsontxt = require("jsontxt");

module.exports = (req, res, next) => {
  jsontxt.write({
    ...jsontxt.read(),
    [req.user]: { ...jsontxt.read()[req.user], ...res.locals },
  });
  res.sendStatus(200);
};
