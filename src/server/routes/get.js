const jsontxt = require("jsontxt");

module.exports = (req, res) => res.json(jsontxt.read());
