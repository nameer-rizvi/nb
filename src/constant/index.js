require("dotenv").config();

const constant = {
  app_name: "Node.js Boilerplate Application",
  job_name: process.env.JOB,
  job_schedule: (key) => `SCHEDULE_${key.toUpperCase()}`,
  jwt_secret: process.env.JWT_SECRET || "secret123",
  jwt_expiration_default: "5m",
  node_env: process.env.NODE_ENV,
  node_port: process.env.PORT || 4000,
};

module.exports = constant;
