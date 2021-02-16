const User = require("../models/signup");
const env = require("dotenv");
env.config();

exports.create_get = function (req, res) {
  res.render("admin-form", { title: "Become a Admin" });
};

exports.create_post = function (req, res, next) {
  const { password } = req.body;
  const { id } = req.user;
  const admin_password = process.env.ADMIN_PASSWORD;
  if (password !== admin_password) {
    const error = "Wrong Password!";
    res.render("admin-form", {
      title: "Create Member",
      error: error,
    });
  } else {
    console.log(id);
    User.findByIdAndUpdate(id, { role: "admin" }).catch((err) => next(err));
    res.redirect("/catalog");
  }
};
