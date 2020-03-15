const express = require("express");
const bot = require("./bot");

const app = express();

const callBot = (req, res) => {
  const stockName = req.query.stockName;
  bot.bot(stockName);
  return res.status(200).json({ bot: "called", stockName: stockName });
};
app.get("/getStock", callBot);

app.listen(8302);
