// index, show(uma unica), store, update, destroy

const Message = require("../model/Message");

const messageHandler = {
  async store(req, res) {
    console.log(req.body);
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
