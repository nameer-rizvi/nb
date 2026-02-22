require("dotenv").config({ quiet: true });
const routes = require("./routes");

const config = {
  nanoidSize: +process.env.NANOID_SIZE || 3,
  nodeEnv: process.env.NODE_ENV,
  nodeEnvInDevelopment: process.env.NODE_ENV === "development",
  nodeEnvInMaintenance: process.env.MAINTENANCE_MODE === "true",
  nodeEnvInProduction: process.env.NODE_ENV === "production",
  nodePort: +process.env.PORT || 3000,
  redisConnectRetries: +process.env.REDIS_CONNECT_RETRIES || 5,
  redisConnectTimeout: +process.env.REDIS_CONNECT_TIMEOUT || 10_000,
  redisKey: "nb:db",
  redisUrl: process.env.REDIS_URL,
  route: routes.find,
  routes: routes.configs,
  routesDisallowed: routes.disallow,
  script: (process.env.SCRIPT || "").split(",").filter(Boolean),
};

if (!config.nodeEnv) {
  throw new TypeError("Missing required environment variable: NODE_ENV");
}

module.exports = config;

// https://www.npmjs.com/package/dotenv
