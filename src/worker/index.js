const config = require("../config");
const job = require("./_job");
const cronjob = require("./_cronjob");

if (config.workerJobs.length) {
  job(...config.workerJobs);
} else if (config.workerCronjobs.length) {
  cronjob(...config.workerCronjobs);
} else {
  cronjob(...config.workers.map((worker) => worker.name));
}
