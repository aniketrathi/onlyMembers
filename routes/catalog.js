const express = require("express");
const router = express.Router();

const passport = require("passport");

const messages_controller = require("../controllers/messages-controller");
const signup_controller = require("../controllers/signup-controller");
const login_controller = require("../controllers/login-controller");

const signup_validator = require("../validators/signup-validator");

/// Messages Route ///
router.get("/", messages_controller.index);

/// SIGNUP ROUTE ///

router.get("/signup", signup_controller.signup_get);

router.post(
  "/signup",
  signup_validator.generateValidator,
  signup_controller.signup_post
);

/// LOGIN ROUTE ///

router.get("/login", login_controller.login_get);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/catalog/login",
    successRedirect: "/",
  }),
  login_controller.login_post
);

module.exports = router;
