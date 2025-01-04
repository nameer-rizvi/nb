const Bowser = require("bowser");
const simpul = require("simpul");
const database = require("../../database");
const util = require("../../util");
const page = require("./page");
const dottpath = require("dottpath");

/* eslint no-unused-vars: 0 */
async function handler(error, req, res, next) {
  const payload = {};

  payload.status = error.status || 500;

  payload.method = req.method || "";

  payload.path = req.path || "";

  payload.message = error.message || error.toString() || "";

  payload.stack = error.stack || "";

  payload.ip = req.ip || "";

  payload.ids = [];

  pushIds(payload.ids, { ...req.session }, "req.session");

  pushIds(payload.ids, { ...res.locals }, "res.locals");

  const ua = Bowser.parse(req.headers["user-agent"] || " ");

  Object.assign(payload, simpul.flatten(ua));

  if (payload.message === "[object Object]") payload.message = "";

  const source = payload.stack.split("\n")[1] || "";

  res.locals.error = simpul.trim(`${payload.message} ${source}`); // This gets logged in the logger middleware.

  await database.errors.add(payload);

  if (util.isRoute.webpage(req)) {
    const message = payload.status < 500 ? payload.message : undefined; // Don't expose internal errors to client.
    res.status(payload.status).send(page(payload.status, message));
  } else {
    res.sendStatus(payload.status);
  }
}

function pushIds(ids, payload, prekey) {
  for (const dotkey of dottpath.map(payload)) {
    const key = dotkey.split(".").pop();
    if (
      key === "id" ||
      key === "uid" ||
      key.endsWith("Id") ||
      key.endsWith("_id")
    ) {
      ids.push(`${prekey}.${dotkey}=${dottpath.extract(payload, dotkey)}`);
    }
  }
}

module.exports = handler;

// https://expressjs.com/en/guide/error-handling.html
