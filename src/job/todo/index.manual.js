// Template for setting up a job that exits upon completion.

require("dotenv").config();

const todo = require("./todo");

todo(() => process.exit());
