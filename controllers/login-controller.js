exports.login_get = function (req, res) {
  res.render("login-form", {
    title: "Login",
  });
};

exports.login_post = function (req, res) {};

exports.wrong_credentials = function (req, res) {
  res.render("login-form", {
    title: "Login",
    message: "Invalid username or password",
  });
};
