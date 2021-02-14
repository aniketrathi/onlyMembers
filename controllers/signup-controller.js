const User = require("../models/signup");
const { validationResult } = require("express-validator");
const generatePassword = require("../lib/password-util").generatePassword;

exports.signup_get = function (req, res) {
  res.render("signup-form", {
    title: "Signup",
  });
};

exports.signup_post = function (req, res) {
  const { username, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("signup-form", {
      title: "Signup",
      username: username,
      errors: errors.array(),
    });
  } else {
    User.findOne({ username: username }).exec(function (err, user) {
      if (err) return next(err);
      if (user) {
        console.log("User ",user);
        const msg = "Oops! username exits";
        res.render("signup-form", {
          title: "Signup",
          message: msg,
        });
      } else {
        const salthash = generatePassword(password);
        const user = new User({
          username: username,
          salt: salthash.salt,
          hash: salthash.hash,
        });
        user.save(function (err) {
          if (err) return next(err);
          res.redirect("/catalog/login");
        });
      }
    });
  }
};
