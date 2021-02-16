const env = require("dotenv");

const User = require("../models/signup");

env.config();

exports.create_get = function (req, res) {
  res.render("member-form", { title: "Become a Member" });
};

exports.create_post = function (req, res, next) {
  const { password } = req.body;
  const { id } = req.user;
  const member_password = process.env.MEMBER_PASSWORD;
  if (password !== member_password) {
    const error = "Wrong Password!";
    res.render("member-form", {
      title: "Create Member",
      error: error,
    });
  } else {
    User.findByIdAndUpdate(id, { role: "member" }).catch((err) => next(err));
    res.redirect("/catalog");
  }
};
