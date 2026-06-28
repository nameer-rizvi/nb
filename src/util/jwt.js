const config = require("../config");
const log = require("./log");
const jsonwebtoken = require("jsonwebtoken");
const defaultExpiration = config.fetchTimeout / 1_000; // milliseconds -> seconds

exports.iss = config.jwtIss || config.website;

exports.sign = function signJwt(data = {}, expiresIn = defaultExpiration) {
  const payload = { ...data, iss: exports.iss };
  const token = jsonwebtoken.sign(payload, config.jwtSecret, { expiresIn });
  log.util(`jwt signed ("${exports.iss}")`);
  return token;
};

exports.verify = function verifyJwt(token) {
  const payload = jsonwebtoken.verify(token, config.jwtSecret);
  if (!payload || payload.iss !== exports.iss)
    throw new Error("Invalid token.");
  log.util(`jwt verified ("${exports.iss}")`);
  return payload;
};

// https://jwt.io/
// https://www.npmjs.com/package/jsonwebtoken
