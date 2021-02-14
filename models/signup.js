const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SignupSchema = new Schema({
  username: { type: String, required: true },
  hash: { type: String },
  salt: { type: String },
});
//Export model
module.exports = mongoose.model("Signup", SignupSchema);
