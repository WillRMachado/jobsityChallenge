const Message = require("../model/Message");

const messageHandler = {
  async store(req, res) {
    const { username, message } = req.body;
    const newMessage = await Message.create({ username, message });
    return res.json(newMessage);
  },

  async index(req, res) {
    const allMessages = await Message.find();
    return res.json(allMessages);
  }
};

module.exports = messageHandler;
