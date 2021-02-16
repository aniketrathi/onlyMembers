exports.verify_user = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/catalog/signup");
};
