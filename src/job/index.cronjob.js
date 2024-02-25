const job = require("./job");
const constant = require("../constant");
const cron = require("cron");

for (let key of Object.keys(job)) {
  const SCHEDULE_KEY = constant.job_schedule(key);

  const SCHEDULE = process.env[SCHEDULE_KEY];

  if (!SCHEDULE) {
    throw new Error(`Schedule for cronjob is undefined ("${SCHEDULE_KEY}").`);
  }

  new cron.CronJob(SCHEDULE, job[key]).start();
}
