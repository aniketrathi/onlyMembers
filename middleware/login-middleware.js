exports.verify_user = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else res.redirect("/catalog/login");
};
