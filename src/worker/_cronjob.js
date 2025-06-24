const config = require("../config");
const util = require("../util");
const cron = require("cron");
const job = require("./_job");
const database = require("../database");

async function cronjob(...cronjobs) {
  for (const name of cronjobs) {
    const worker = config.worker(name);
    if (worker) {
      try {
        util.log.cronjob(`initialized ("${name}")`);
        new cron.CronJob(worker.schedule, async function onSchedule() {
          await job(...worker.jobs);
        }).start();
      } catch (error) {
        util.log.cronjob(`errored ("${name}"): ${error}`, "error");
        await database.error.add(error);
      }
    } else {
      util.log.cronjob(`is undefined ("${name}")`, "warn");
    }
  }
}

module.exports = cronjob;

// https://www.npmjs.com/package/cron
