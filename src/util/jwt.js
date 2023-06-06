// --starterKit-flag [set JWT_SECRET in a ".env" file located in the projects root folder]
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "SECRET123";
const log = require("./log");

exports.sign = function signJWT(data = {}, expiresIn = "5m") {
  const token = jsonwebtoken.sign(data, JWT_SECRET, { expiresIn });
  if (!token) throw new Error("Failed to create token.");
  return token;
};

exports.verify = function verifyJWT(token, vKey) {
  const data = jsonwebtoken.verify(token, JWT_SECRET);
  if (!data) throw new Error("Invalid token.");
  if (vKey && !data[vKey]) throw new Error(`Corrupt token ("${token}").`);
  return data;
};

if (!JWT_SECRET) log.warning("JWT_SECRET is not set.");

// https://jwt.io/
// https://www.npmjs.com/package/jsonwebtoken
