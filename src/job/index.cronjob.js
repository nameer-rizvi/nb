require("dotenv").config();
const job = require("./job");
const cron = require("cron");

for (let key of Object.keys(job)) {
  const SCHEDULE_KEY = `SCHEDULE_${key.toUpperCase()}`;
  const SCHEDULE = process.env[SCHEDULE_KEY];
  if (!SCHEDULE) {
    const error = `Schedule for cronjob is undefined ("${SCHEDULE_KEY}").`;
    console.error(new Error(error));
  } else new cron.CronJob(SCHEDULE, job[key]).start();
}
