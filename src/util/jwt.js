// --starterKit-flag [set JWT_SECRET in a ".env" file located in the projects root folder]
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "SECRET123";
const log = require("./log");

exports.sign = function signJWT(data = {}, expiresIn = "5m") {
  // Generate token using jsonwebtoken. Since expiresIn has a default value, data must be an object.

  const token = jsonwebtoken.sign(data, JWT_SECRET, { expiresIn });

  // If there's no valid token, throw error.

  if (!token) throw new Error("Failed to create token.");

  // Return token.

  return token;
};

exports.verify = function verifyJWT(token, validateKey) {
  // Verify token using jsonwebtoken.

  const data = jsonwebtoken.verify(token, JWT_SECRET);

  // If there's an expected key to validate and there's no data/data-with-key, throw error.

  if (validateKey && !data?.[validateKey])
    throw new Error(`Corrupt token detected ("${token}").`);

  // If there's an expected key to validate and data has key or if data exists, return data.

  if (validateKey ? data[validateKey] : data) return data;

  // If data isn't returned, throw error.

  throw new Error("No data.");
};

if (!JWT_SECRET) log.warning("JWT_SECRET is not set.");

// https://jwt.io/
// https://www.npmjs.com/package/jsonwebtoken
