require("dotenv").config();

const constant = {
  jwt_secret: process.env.JWT_SECRET || "secret123",
  jwt_expiration_default: "5m",
  node_env: process.env.NODE_ENV,
  node_port: process.env.PORT || 4000,
  process_job: process.env.JOB,
  process_schedule: (key) => `SCHEDULE_${key.toUpperCase()}`,
};

module.exports = constant;
