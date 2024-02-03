const express = require("express");

/*
 * Express's parsers are required to parse requests for json values.
 * These json values get validated and sanitized in the validation middleware
 * and stored in res locals for use by proceeding middlewares & routes.
 */

const jsonParser = express.json({ limit: "1mb" });

const urlEncodedParser = express.urlencoded({ extended: true });

module.exports = [jsonParser, urlEncodedParser];

// https://expressjs.com/en/api.html
