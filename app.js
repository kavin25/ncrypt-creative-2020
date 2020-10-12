const dev = process.env.NODE_ENV !== "production";

const express = require("express");
const session = require("express-session");
const winston = require("winston");
const expressWinston = require("express-winston");
const passport = require("passport");
const helmet = require("helmet");
const compression = require("compression");
const crypto = require("crypto");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const eta = require("eta");
const connectRedis = require("connect-redis");
const redis = require("redis");

const RedisStore = connectRedis(session);
const client = redis.createClient(process.env.REDIS_URL);
const app = express();

// Templating and static files
app.engine("eta", eta.renderFile);
app.set("view engine", "eta");
app.set("views", "./views");
app.use("/static", express.static("static"));

// Logger
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      (dev ? winston.format.simple : winston.format.json)()
    ),
    meta: false,
    msg:
      "HTTP {{req.method}} {{req.url}} - {{res.statusCode}} {{res.responseTime}}ms",
  })
);

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(csurf({ cookie: true }));
app.use(
  session({
    store: new RedisStore({ client }),
    secret: process.env.SECRET || crypto.randomBytes(20).toString("hex"),
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

app.use((_, res, next) => {
  res.header(
    "Content-Security-Policy",
    "default-src *;img-src * 'self' data: https:;script-src 'self' 'unsafe-inline' 'unsafe-eval' *;style-src  'self' 'unsafe-inline' *"
  );
  return next();
});

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// Add auth data to locals
app.use((req, res, next) => {
  res.locals.authenticated = !!req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.csrfToken = req.csrfToken();
  res.locals.romans = {
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    11: "XI",
    12: "XII",
  };

  next();
});

app.use("/", require("./routes"));

app.use("*", (_, res) => {
  res.status(404).render("error", { title: "404", error: { code: "404" } });
});

app.use((err, _req, res, _next) => {
  // TODO: replace with winston log
  console.log(err);

  // Set statusCode to 500 if it isn't already there
  err.statusCode = err.statusCode || err.status || 500;
  err.message = err.message || err.name || "Internal Server Error";
  err.code = err.statusCode;

  res.render("error", {
    title: err.statusCode,
    error: { code: err.statusCode, message: err.message },
  });
  return;
});

module.exports = app;
