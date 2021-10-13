const jsonwebtoken = require("jsonwebtoken");
const constant = require("../constant");

async function jwtSign(data, expiresIn = "15m") {
  // Because of expiresIn, data must be an object.

  const token = await jsonwebtoken.sign(data, constant.secret.jwt, {
    expiresIn,
  });

  // If there's no valid token...

  if (!token) throw new Error("Failed to create token.");

  // Return token.

  return token;
}

async function jwtVerify(token, validateKey) {
  const data = await jsonwebtoken.verify(token, constant.secret.jwt);

  // If there's an expected key to validate and there's no data/data with key...

  if (validateKey && (!data || !data[validateKey]))
    throw new Error(`Corrupt token detected: "${token}"`);

  // If there's an expected key to validate and data has key or if data exists...

  if (validateKey ? data && data[validateKey] : data) return data;

  // Invalidate verification. * All tokens should contain data *

  throw new Error("No data.");
}

const jwt = { sign: jwtSign, verify: jwtVerify };

module.exports = jwt;

// https://jwt.io/
// https://www.npmjs.com/package/jsonwebtoken
