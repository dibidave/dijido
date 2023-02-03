var express = require("express");
var routes = require("./routes");
var cookie_parser = require("cookie-parser");
var body_parser = require("body-parser");
var path = require("path");
var config = require("./config/config")
var passport = require("passport");
var Passport_Strategy = require("passport-local").Strategy;
var User = require("sqit/authentication/User");
var express_session = require("express-session");
var logger = require("sqit/logging/Logger").get_logger("app");
var globalPackageVersion = require('global-package-version');

var app = express();

app.use(express_session({
  secret: config.express_secret,
  saveUninitialized: true,
  resave: true
}));

passport.use(new Passport_Strategy(
  function(username, password, callback) {

    User.get_user_by_credentials(username, password)
    .then(function(user) {
      if(user === null) {
        return callback(null);
      }
      else {
        return callback(null, user);
      }
    });
  })
);

passport.serializeUser(function(user, callback) {
  callback(null, user._id);
});

passport.deserializeUser(function(user_id, callback) {
  User.get_user_by_id(user_id)
  .then(function(user) {
    callback(null, user);
  });
});

app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));
app.use("/external/flatpickr",
  express.static(path.join(__dirname, "node_modules", "flatpickr", "dist")));
app.use("/external/moment",
  express.static(path.join(__dirname, "node_modules", "moment", "min")));
app.use("/external/select2",
  express.static(path.join(__dirname, "node_modules", "select2", "dist")));
app.use("/external/bootswatch",
  express.static(path.join(__dirname, "node_modules", "bootswatch", "dist")));
app.use("/external/bootstrap",
  express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));
app.use("/external/jquery",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist")));
app.use("/external/popper.js",
  express.static(path.join(__dirname, "node_modules", "popper.js", "dist",
    "umd")));
  
app.post("/login", 
  passport.authenticate("local", { failureRedirect: "/" }),
  function(req, res) {
    return res.json({
      session: req.session
    });
});

app.get("/logout",
  function(req, res){
    req.logout();
    res.redirect('/');
});

app.use("/", routes);

app.use(function(req, res, next) {
  logger.info("Attempted to access invalid URL, '" + req.url + "'");
  res.status(404).send("Not Found");
});

module.exports = app;