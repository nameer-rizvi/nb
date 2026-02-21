require("dotenv").config({ quiet: true });

const config = {
  nanoidSize: +process.env.NANOID_SIZE || 3,
  nodeEnv: process.env.NODE_ENV,
  nodeEnvInDevelopment: process.env.NODE_ENV === "development",
  nodeEnvInMaintenance: process.env.MAINTENANCE_MODE === "true",
  nodeEnvInProduction: process.env.NODE_ENV === "production",
  redisConnectRetries: +process.env.REDIS_CONNECT_RETRIES || 5,
  redisConnectTimeout: +process.env.REDIS_CONNECT_TIMEOUT || 10000,
  redisKey: "nb:db",
  redisUrl: process.env.REDIS_URL,
  script: (process.env.SCRIPT || "").split(","),
};

module.exports = config;
