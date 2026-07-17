/* eslint no-unused-vars: 0 */
const dottpath = require("dottpath");
const Bowser = require("bowser");
const utilN = require("@nameer/utils");
const database = require("../../database");
const util = require("../../util");
const page = require("./page");

async function handler(error, req, res, next) {
  const payload = {};

  payload.status = error.status || 500;

  payload.method = req.method || "";

  payload.path = req.path || "";

  payload.message = error.message || String(error) || "";

  payload.stack = error.stack || "";

  payload.ip = req.ip || "";

  payload.ids = [];

  pushIds(payload.ids, { ...req.ctx }, "req.ctx");

  const ua = Bowser.parse(req.headers["user-agent"] || " ");

  Object.assign(payload, utilN.flatten(ua));

  if (payload.message === "[object Object]") payload.message = "";

  const source = payload.stack.split("\n")[1] || "";

  req.ctx.error = utilN.trim(`${payload.message} ${source}`);

  await database.controller.error.add(payload);

  if (util.isRoute.webpage(req)) {
    const message = payload.status < 500 ? payload.message : undefined; // Don't expose internal errors to client.
    res.status(payload.status).send(page(payload.status, message));
  } else {
    res.sendStatus(payload.status);
  }
}

function pushIds(ids, payload, base) {
  for (const path of dottpath.map(payload)) {
    const key = path.split(".").pop();
    if (
      key === "id" ||
      key === "uid" ||
      key.endsWith("Id") ||
      key.endsWith("_id")
    ) {
      ids.push(`${base}.${path}=${dottpath.extract(payload, path)}`);
    }
  }
}

module.exports = handler;

// https://expressjs.com/en/guide/error-handling.html
