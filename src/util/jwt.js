// --starterKit-flag [set JWT_SECRET in a ".env" file located in the projects root folder]
const constant = require("../constant");
const jsonwebtoken = require("jsonwebtoken");
const log = require("./log");

exports.sign = function signJWT(data = {}, expiresIn) {
  if (!expiresIn && constant.jwt_expiration_default) {
    expiresIn = constant.jwt_expiration_default;
  }

  const token = jsonwebtoken.sign(data, constant.jwt_secret, { expiresIn });

  if (!token) throw new Error("Failed to create token.");

  return token;
};

exports.verify = function verifyJWT(token, vKey) {
  const data = jsonwebtoken.verify(token, constant.jwt_secret);

  if (!data) {
    throw new Error("Invalid token.");
  }

  if (vKey && !data[vKey]) {
    throw new Error(`Corrupt token ("${token}").`);
  }

  return data;
};

if (!constant.jwt_secret?.length) {
  log.warning("JWT secret is not set.");
}

// https://jwt.io/
// https://www.npmjs.com/package/jsonwebtoken
