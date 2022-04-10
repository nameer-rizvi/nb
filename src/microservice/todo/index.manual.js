// Template for setting up a microservice as a manual job that exits upon completion.

require("dotenv").config();

const todo = require("./todo");

todo(() => process.exit());
