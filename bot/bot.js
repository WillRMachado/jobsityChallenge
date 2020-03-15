const bot = (stockName, chatChoice) => {
  const getStockInfo = require("./utils/getStockInfo");

  const cbDownload = dataPath => {
    getStockInfo.processData(dataPath, chatChoice);
  };

  getStockInfo.download(String(stockName), cbDownload);
};

exports.bot = bot;
