const secret = {
  jwt: process.env.JWT_SECRET || "secret123", // Default value should be removed and defined in a ".env" file.
};

module.exports = secret;
