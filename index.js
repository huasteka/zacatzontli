const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const passport = require("passport");
const cors = require("cors");

const config = require("./app/config");
const authRouter = require("./app/auth/auth.router");
const usersRouter = require("./app/users/users.router");
const responseFormatter = require("./app/response.formatter");

mongoose.connect(config.mongoConnectionURL, {useMongoClient: true});
mongoose.Promise = bluebird;

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json());

app.use("/", express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.all("/api/*", function (req, res) {
  const error = responseFormatter.formatError(405, "method_not_allowed", "Method Not Allowed");
  res.json(responseFormatter.formatErrors(error))
});

app.all("/*", function (req, res) {
  const error = responseFormatter.formatError(404, "not_found", "Not Found");
  res.json(responseFormatter.formatErrors(error));
});

const server = app.listen(config.serverPort, function () {
  console.info("Listening server at port " + config.serverPort);
});

module.exports = server; // Testing application
