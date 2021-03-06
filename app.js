const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const env = require("dotenv");
const express = require("express");
const flash = require("connect-flash");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

const MongoStore = require("connect-mongo")(session);

// Need to require the entire Passport config module so js knows about it //
require("./config/passport");

const indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog");

env.config();

const app = express();

const mongoDB = process.env.DEV_DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

// -------------- SESSION SETUP ---------------- //
const sessionStore = new MongoStore({
  mongooseConnection: db,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

// -------------- PASSPORT AUTHENTICATION -------app.--------- //
app.use(passport.initialize());
app.use(passport.session());

/// access to the currentUser constiable in all views ///
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
