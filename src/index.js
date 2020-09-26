require("dotenv").config();
const script = process.env.npm_lifecycle_event;
const server = require("./server");

// Script management: Run a process based on
// the npm lifecycle event. Ex. "npm run
// production" will search for a "production"
// method in the scripts config and call it,
// resorting to default() as a fallback.
// This is useful for services that don't
// require an express server or need to be run
// independently (i.e. on their own schedule,
// through use of a package like CronJob).

const scripts = {
  default: () => server(),
};

scripts[script] ? scripts[script]() : scripts.default();
