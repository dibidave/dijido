var express = require("express");
var routes = require("./routes");
var cookie_parser = require("cookie-parser");
var body_parser = require("body-parser");
var path = require("path");

var app = express();

app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", routes);
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

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;