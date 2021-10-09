const jwt = require("jsonwebtoken");
const constant = require("../../constant");

async function jwtVerify(token, key) {
  const data = await jwt.verify(token, constant.secret.jwt);

  if (key ? data && data[key] : data) {
    return data;
  } else if (key && (!data || !data[key])) {
    throw new Error(`Corrupt token detected: "${token}"`);
  } else throw new Error("No data.");
}

module.exports = jwtVerify;
