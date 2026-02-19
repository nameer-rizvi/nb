// Not-in-use.
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const database = require("../../database");
const config = require("../../config");
const simpul = require("simpul");

const sessionMiddleware = session({
  store: new RedisStore({
    client: database.redis,
    prefix: `${config.redisKey}:session:`,
    disableTouch: true,
  }),
  name: config.sessionName,
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: simpul.isEnv.live,
    sameSite: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // ms * s * m * h * d * w = 2 weeks.
  },
});

module.exports = sessionMiddleware;

// https://www.npmjs.com/package/express-session
