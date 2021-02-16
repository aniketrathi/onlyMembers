const express = require("express");
const passport = require("passport");

const admin_controller = require("../controllers/admin-controller");
const login_controller = require("../controllers/login-controller");
const logout_controller = require("../controllers/logout-controller");
const member_controller = require("../controllers/member-controller");
const messages_controller = require("../controllers/messages-controller");
const signup_controller = require("../controllers/signup-controller");

const message_validator = require("../validators/messages-validator");
const signup_validator = require("../validators/signup-validator");

const admin_middleware = require("../middleware/admin-middleware");
const login_middleware = require("../middleware/login-middleware");

const router = express.Router();

/// Messages Route ///
router.get("/", messages_controller.index);

router.get(
  "/create",
  login_middleware.verify_user,
  messages_controller.create_get
);

router.post(
  "/create",
  message_validator.generateValidator,
  messages_controller.create_post
);

router.post(
  "/:id/delete",
  admin_middleware.verify_admin,
  messages_controller.delete_post
);

/// SIGNUP ROUTE ///

router.get("/signup", signup_controller.signup_get);

router.post(
  "/signup",
  signup_validator.generateValidator,
  signup_controller.signup_post
);

/// LOGIN ROUTE ///
router.get("/wrong_credentials", login_controller.wrong_credentials);

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
router.get(
  "/become_member",
  login_middleware.verify_user,
  member_controller.create_get
);

router.post(
  "/become_member",
  login_middleware.verify_user,
  member_controller.create_post
);

/// BECOME AN ADMIN ///
router.get(
  "/become_admin",
  login_middleware.verify_user,
  admin_controller.create_get
);

router.post(
  "/become_admin",
  login_middleware.verify_user,
  admin_controller.create_post
);

module.exports = router;
