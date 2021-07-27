const { timelog } = require("simpul");

function handleServerError(err, res) {
  timelog("⚠️  " + (err.sqlMessage || err.message || err.toString()));

  let traces = [];

  const errStackSplit = err.stack && err.stack.split("at ");

  for (let i = 0; i < errStackSplit.length; i++) {
    let trace = errStackSplit[i];
    if (trace && trace.includes("/src")) traces.push(trace.trim());
  }

  if (traces && traces.length) {
    for (let i = 0; i < traces.length; i++) {
      timelog("➡️  " + traces[i]);
    }
  }

  res.sendStatus(500);
}

module.exports = handleServerError;
