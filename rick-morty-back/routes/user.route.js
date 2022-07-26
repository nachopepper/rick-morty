const express = require("express");
const app = express();
const passport = require("passport");

const { signIn, login, checkUser } = require("../controllers/user.controller");

app.post("/signIn", signIn);
app.post("/login", login);
app.get(
  "/checkUser",
  passport.authenticate("jwt", { session: false }),
  checkUser
);

module.exports = app;
