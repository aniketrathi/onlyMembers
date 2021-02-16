exports.verify_member = function (req, res, next) {
  if (req.isAuthenticated()) {
    const { role } = req.user;
    if (role === "member") next();
  } else res.redirect("/catalog/become_member");
};
