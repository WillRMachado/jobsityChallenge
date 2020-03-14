const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  username: String,
  message: String
});

module.exports = mongoose.model("Message", MessageSchema);
