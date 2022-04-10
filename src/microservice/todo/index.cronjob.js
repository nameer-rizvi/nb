// Template for setting up a microservice as a cronjob.
//   The schedule would come from the .env or the ecosystem.config.js.

require("dotenv").config();
const { TODO_SCHEDULE } = process.env;
const { CronJob } = require("cron");
const todo = require("./todo");

if (!TODO_SCHEDULE) {
  console.error(new Error("TODO_SCHEDULE is undefined."));
} else new CronJob(TODO_SCHEDULE, todo).start();
