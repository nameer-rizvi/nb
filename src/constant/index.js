require("dotenv").config();

const constant = {
  ignoreNonCriticalLogs: process.env.IGNORE_NON_CRITICAL_LOGS === "true",
  origin: process.env.ORIGIN,
  port: process.env.PORT || 4000,
  secret: {
    jwt: process.env.JWT_SECRET || "secret123", // Default value should be removed and defined in a ".env" file.
  },
};

module.exports = constant;
