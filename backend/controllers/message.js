const Message = require("../model/Message");
// const io = require("../config/server");
const socketio = require("socket.io");

const messageHandler = {
  async store(req, res) {
    const { username, message } = req.body;
    const newMessage = await Message.create({
      username,
      message,
      timestamp: Date.now()
    });
    io.sockets.emit("newMessage", { username, message, timestamp: Date.now() });
    return res.json(newMessage);
  },

  async index(req, res) {
    const allMessages = await Message.find();
    return res.json(allMessages);
  }
};

module.exports = messageHandler;
