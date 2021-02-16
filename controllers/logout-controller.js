exports.logout_get = function (req, res) {
  req.logout();
  res.redirect("/");
};
