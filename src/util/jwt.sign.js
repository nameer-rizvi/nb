const jsonwebtoken = require("jsonwebtoken");
const constant = require("../constant");

async function jwtSign(data, expiresIn = "15m") {
  // Generate token using jsonwebtoken.
  //   * Because of expiresIn, data must be an object.

  const token = await jsonwebtoken.sign(data, constant.secret.jwt, {
    expiresIn,
  });

  // If there's no valid token...

  if (!token) throw new Error("Failed to create token.");

  // Return token.

  return token;
}

module.exports = jwtSign;

// https://jwt.io/
// https://www.npmjs.com/package/jsonwebtoken
