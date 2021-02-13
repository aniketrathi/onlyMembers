const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author_name: { type: String, required: true },
  },
  { timestamps: true }
);
//Export model
module.exports = mongoose.model("Message", MessageSchema);
