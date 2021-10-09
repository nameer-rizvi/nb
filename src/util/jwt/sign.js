const jwt = require("jsonwebtoken");
const constant = require("../../constant");

async function jwtSign(data, expiresIn = "15m") {
  // Because of expiresIn, data must be an object.

  const token = await jwt.sign(data, constant.secret.jwt, { expiresIn });

  if (!token) throw new Error("Failed to create token.");

  return token;
}

module.exports = jwtSign;
