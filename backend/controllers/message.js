const Message = require("../model/Message");
const socketio = require("socket.io");
const request = require("request");
const dotenv = require("dotenv").config();

const botPort = process.env.BOT_PORT;
const botHost = process.env.BOT_ADDRESS;

const messageHandler = {
  async store(req, res) {
    const { username, message } = req.body;
    if (message.charAt(0) === "/") {
      //Chat commands
      switch (true) {
        case message.startsWith("/stock="): //ANCHOR
          const stockName = message.slice(7);
          request(
            `${botHost}:${botPort}/getStock?stockName=${stockName}`,
            function(error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log(body);
              }
            }
          );
          break;
        default:
          console.log("invalid command");
          break;
      }
      return null;
    } else {
      const newMessage = await Message.create({
        username,
        message,
        timestamp: Date.now()
      });
      io.sockets.emit("newMessage", {
        username,
        message,
        timestamp: Date.now()
      });
      return null;
    }
  },

  async index(req, res) {
    const lastFiftyMessages = await Message.find()
      .sort({ timestamp: 1 })
      .limit(50);
    return res.json(lastFiftyMessages);
  }
};

module.exports = messageHandler;
