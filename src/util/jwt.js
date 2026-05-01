const config = require("../config");
const log = require("./log");
const jsonwebtoken = require("jsonwebtoken");

exports.iss = config.jwtIss;

exports.sign = function signJWT(data = {}, expiresIn = 30) {
  const payload = { ...data, iss: exports.iss };

  const token = jsonwebtoken.sign(payload, config.jwtSecret, { expiresIn });

  log.util(`jwt signed ("${exports.iss}")`);

  return token;
};

exports.verify = function verifyJWT(token) {
  const payload = jsonwebtoken.verify(token, config.jwtSecret);

  if (!payload || payload.iss !== exports.iss) {
    throw new Error("Invalid token.");
  }

  log.util(`jwt verified ("${exports.iss}")`);

  return payload;
};

// https://jwt.io/
// https://www.npmjs.com/package/jsonwebtoken
