const jsonwebtoken = require("jsonwebtoken");
const config = require("../config");
const log = require("./log");

exports.iss = new URL(config.urlWebsite || config.urlLocalhost).hostname;

exports.sign = function signJWT(data = {}, expiresIn = 30) {
  data.iss = exports.iss;

  const token = jsonwebtoken.sign(data, config.jwtSecret, { expiresIn });

  log.util("jwt signed");

  return token;
};

exports.verify = function verifyJWT(token) {
  const data = jsonwebtoken.verify(token, config.jwtSecret);

  if (!data || data.iss !== exports.iss) throw new Error("Invalid token.");

  log.util("jwt verified");

  return data;
};

// https://jwt.io/
// https://www.npmjs.com/package/jsonwebtoken
