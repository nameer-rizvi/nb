const { CronJob } = require("cron");

new CronJob("*/2 * * * * *", () => console.log("Do job...")).start();
