const configs = [
  {
    name: "DAILY_AT_MIDNIGHT",
    schedule: "0 0 0 * * *",
    jobs: ["generateSitemapUrls"],
  },
];

function find(name) {
  return configs[configs.findIndex((config) => config.name === name)];
}

const cronjobs = process.env.CRONJOB?.split(",").filter(Boolean) || [];

const jobs = process.env.JOB?.split(",").filter(Boolean) || [];

module.exports = { configs, find, cronjobs, jobs };
