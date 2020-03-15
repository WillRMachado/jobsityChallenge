const bot = (stockName, chatChoice) => {
  const getStockInfo = require("./utils/getStockInfo");

  const cbDownload = dataPath => {
    getStockInfo.processData(dataPath);
  };

  getStockInfo.download(String(stockName), cbDownload);
};

exports.bot = bot;
