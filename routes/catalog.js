const express = require("express");
const router = express.Router();

const passport = require("passport");

const messages_controller = require("../controllers/messages-controller");
const signup_controller = require("../controllers/signup-controller");
const login_controller = require("../controllers/login-controller");
const logout_controller = require("../controllers/logout-controller");
const member_controller = require("../controllers/member-controller");
const admin_controller = require("../controllers/admin-controller");

const signup_validator = require("../validators/signup-validator");
const message_validator = require("../validators/messages-validator");

/// Messages Route ///
router.get("/", messages_controller.index);

router.get("/create", messages_controller.create_get);

router.post(
  "/create",
  message_validator.generateValidator,
  messages_controller.create_post
);

router.post("/:id/delete",messages_controller.delete_post);

/// SIGNUP ROUTE ///

router.get("/signup", signup_controller.signup_get);

router.post(
  "/signup",
  signup_validator.generateValidator,
  signup_controller.signup_post
);

/// LOGIN ROUTE ///
router.get("/wrong_credentials",login_controller.wrong_credentials)

router.get("/login", login_controller.login_get);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/catalog/wrong_credentials",
    successRedirect: "/",
  }),
  login_controller.login_post
);

/// LOGOUT ///
router.get("/logout", logout_controller.logout_get);

/// BECOME A MEMBER  ///
router.get("/become_member", member_controller.create_get);

router.post("/become_member", member_controller.create_post);

/// BECOME AN ADMIN ///
router.get("/become_admin", admin_controller.create_get);

router.post("/become_admin", admin_controller.create_post);

module.exports = router;
