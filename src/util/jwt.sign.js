const jwt = require("jsonwebtoken");
const log = require("./log");

async function jwtSign(data, options) {
  if (!process.env.JWT_SECRET)
    throw new Error("Environment variable JWT_SECRET has not been set.");

  const token = await jwt.sign(data, process.env.JWT_SECRET, options);

  if (!token) throw new Error("Failed to create token.");

  return token;
}

module.exports = jwtSign;

// https://jwt.io/
// https://www.npmjs.com/package/jsonwebtoken
