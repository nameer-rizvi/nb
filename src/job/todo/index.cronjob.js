// Template for setting up a job as a cronjob.
//   The schedule should come from the .env or the ecosystem.config.js file.

require("dotenv").config();
const { TODO_SCHEDULE } = process.env;
const cron = require("cron");
const todo = require("./todo");

if (!TODO_SCHEDULE) {
  console.error(new Error("TODO_SCHEDULE is undefined."));
} else new cron.CronJob(TODO_SCHEDULE, todo).start();
