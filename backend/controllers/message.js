const Message = require("../model/Message");
const socketio = require("socket.io");
const request = require("request");
const dotenv = require("dotenv").config();

const botPort = process.env.BOT_PORT;
const botHost = process.env.BOT_ADDRESS;

const messageHandler = {
  async store(req, res) {
    const { username, message } = req.body;
    const chatChoice = req.headers.chat;
    if (message.charAt(0) === "/") {
      //Chat commands
      switch (true) {
        case message.startsWith("/stock="):
          const stockName = message.slice(7);
          request(
            `${botHost}:${botPort}/getStock?stockName=${stockName}&chatChoice=${chatChoice}`,
            function(error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log("bot called with body: ", body);
              }
            }
          );
          break;
        default:
          console.log("invalid command");
          break;
      }
      if (res) {
        return res.json({ commandStatus: "sent to bot" });
      }
    } else {
      //standard chat
      if (chatChoice === "secondaryChat") {
        const newMessage = await Message.SecondaryChat.create({
          username,
          message,
          timestamp: Date.now()
        });
        io.sockets.emit("newMessageSecondaryChat", {
          username,
          message,
          timestamp: Date.now()
        });
        if (res) {
          return res.json(newMessage);
        }
      } else {
        const newMessage = await Message.MainChat.create({
          username,
          message,
          timestamp: Date.now()
        });
        io.sockets.emit("newMessage", {
          username,
          message,
          timestamp: Date.now()
        });
        if (res) {
          return res.json(newMessage);
        }
      }
    }
  },

  async index(req, res) {
    const chatChoice = req.headers.chat;
    if (chatChoice === "secondaryChat") {
      const lastFiftyMessages = await Message.SecondaryChat.find()
        .sort({ timestamp: 1 })
        .limit(50);
      return res.json(lastFiftyMessages);
    } else {
      const lastFiftyMessages = await Message.MainChat.find()
        .sort({ timestamp: 1 })
        .limit(50);
      return res.json(lastFiftyMessages);
    }
  }
};

module.exports = messageHandler;
