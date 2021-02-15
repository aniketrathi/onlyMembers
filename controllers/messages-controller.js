const { validationResult } = require("express-validator");
const Messages = require("../models/messages");

exports.index = function (req, res) {
  Messages.find({})
    .populate("author")
    .exec(function (err, results) {
      if (err) return next(err);
      res.render("index", {
        title: "Home",
        messages: results,
      });
    });
};

exports.create_get = function (req, res) {
  res.render("message-form", {
    title: "Create Post",
  });
};

exports.create_post = function (req, res, next) {
  const { title, description } = req.body;
  const { id } = req.user;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("create-form", {
      title: "Create Post",
      message: req.body,
      errors: errors.array(),
    });
    return;
  }
  const msg = new Messages({
    title: title,
    description: description,
    author: id,
  });
  msg.save(function (err) {
    if (err) return next(err);
    res.redirect("/catalog");
  });
};

exports.delete_post = function(req,res) {
  const {id} = req.params;
  Messages.findByIdAndRemove(id , function(err){
    if(err)
    return next(err);
    res.redirect("/catalog");
  })
}
