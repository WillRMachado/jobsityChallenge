const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: Number
});

module.exports = {
  MainChat: mongoose.model("MainChatMessage", MessageSchema),
  SecondaryChat: mongoose.model("SecondaryChatMessage", MessageSchema)
};
