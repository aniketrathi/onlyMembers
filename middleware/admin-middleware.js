exports.verify_admin = function (req, res, next) {
  if (req.isAuthenticated()) {
    const { role } = req.user;
    if (role === "admin") next();
  } else res.redirect("/catalog/become_admin");
};
