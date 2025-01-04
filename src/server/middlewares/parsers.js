const express = require("express");

const jsonParser = express.json({ limit: "1mb" }); // https://expressjs.com/en/5x/api.html#express.json

const urlEncodedParser = express.urlencoded({ extended: true }); // https://expressjs.com/en/5x/api.html#express.urlencoded

module.exports = [jsonParser, urlEncodedParser];
