const simpul = require("simpul");
const util = require("../../../util");
const Bowser = require("bowser");

function errorHandler(error, req, res, next) {
  const { routeConfig = {}, values = {} } = res.locals;

  const payload = {};

  payload.status = simpul.isNumber(error.status) ? error.status : 500;

  payload.source = payload.status === 499 ? "CLIENT" : "SERVER"; // 499 = Custom status code for client error.

  payload.method =
    payload.source === "CLIENT" ? "APP" : routeConfig.method || req.method;

  payload.path = values.error?.pathname || routeConfig.path || req.path;

  payload.message =
    values.error?.message?.split(":")[0].trim() ||
    error.sqlMessage ||
    error.message ||
    error.toString().split("Error:").pop().trim();

  payload.stack = values.error?.stack || error.stack;

  payload.user_id =
    req.session?.user_id ||
    req.session?.uid ||
    req.session?.id ||
    res.locals.user?.user_id ||
    res.locals.user?.uid ||
    res.locals.user?.id ||
    res.locals.token?.user_id ||
    res.locals.token?.uid ||
    res.locals.token?.id;

  payload.ip = req.ip || "";

  util.log.error(payload.message);

  const ua = Bowser.parse(req.headers["user-agent"] || " ");

  const userAgent = simpul.flatten(ua);

  Object.assign(payload, userAgent);

  const payloadStackSplits = simpul.isString(payload.stack)
    ? payload.stack.split(" at ")
    : [];

  for (let trace of payloadStackSplits) {
    let isLocalTrace =
      trace &&
      !trace.startsWith("Error") &&
      !trace.includes("node_modules") &&
      (trace.includes("/lib") || trace.includes("/src"));
    if (isLocalTrace) util.log.at(trace.trim()); // Log trace if it is local.
  }

  // Save error in the database...
  //   database.controller.error.create(payload);

  if (payload.source === "CLIENT") {
    res.sendStatus(201);
  } else if (payload.status !== 500) {
    res.status(payload.status).send(payload.message);
  } else {
    res.sendStatus(payload.status);
  }
}

module.exports = errorHandler;
