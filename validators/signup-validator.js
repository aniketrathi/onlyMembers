const { body, check } = require("express-validator");

exports.generateValidator = [
  body("username", "username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body(
    "password",
    "Password must include one lowercase character, one uppercase character, a number, and a special character."
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password Confirmation does not match password");
    }
    return true;
  }),
];
