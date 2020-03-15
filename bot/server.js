const express = require("express");
const bot = require("./bot");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.BOT_PORT;

const callBot = (req, res) => {
  const stockName = req.query.stockName;
  const chatChoice = req.query.stockName;
  bot.bot(stockName, chatChoice);
  return res.status(200).json({ bot: "called", stockName: stockName });
};
app.get("/getStock", callBot);

app.listen(port);
