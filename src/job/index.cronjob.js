require("dotenv").config();
const job = require("./job");
const cron = require("cron");

for (let key of Object.keys(job)) {
  const SCHEDULE_KEY = `SCHEDULE_${key.toUpperCase()}`;

  const SCHEDULE = process.env[SCHEDULE_KEY];

  if (!SCHEDULE) {
    throw new Error(`Schedule for cronjob is undefined ("${SCHEDULE_KEY}").`);
  }

  new cron.CronJob(SCHEDULE, job[key]).start();
}
