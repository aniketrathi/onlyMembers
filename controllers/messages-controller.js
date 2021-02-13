const { NotExtended } = require("http-errors");
const Messages = require("../models/messages");

exports.index = function(req,res){
    Messages.find({}).exec(function(err,results){
        if(err)
            return next(err);
        res.render("index",{
            title: "Home",
            messages: results,
        });
    });
}