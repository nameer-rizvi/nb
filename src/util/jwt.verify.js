const jwt = require("jsonwebtoken");

async function jwtVerify(token, validateKey) {
  if (!process.env.JWT_SECRET)
    throw new Error("Environment variable JWT_SECRET has not been set.");

  const data = await jwt.verify(token, process.env.JWT_SECRET);

  if (validateKey && (!data || !data[validateKey]))
    throw new Error(`Corrupt token detected: "${token}"`);

  return data;
}

module.exports = jwtVerify;

// https://jwt.io/
// https://www.npmjs.com/package/jsonwebtoken
