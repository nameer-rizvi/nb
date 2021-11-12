const { CronJob } = require("cron");
const { log } = require("../util");

new CronJob("*/2 * * * * *", () => log.cronjob("Do job...")).start();
