const express = require("express");

// Express's json middleware is required to parse requests for json values.
// These json values get validated and sanitized in the validation middleware
// and stored in res locals for use in route functions.

const expressJSONMiddleware = express.json({ limit: "1mb" });

// Express's urlencoded middleware is required to parse requests
// for json values that are present in urlencoded form.

const expressURLEncodedMiddleware = express.urlencoded({ extended: true });

module.exports = [expressJSONMiddleware, expressURLEncodedMiddleware];

// https://expressjs.com/en/api.html
