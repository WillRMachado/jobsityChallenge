const bot = stockName => {
  const getStockInfo = require("./utils/getStockInfo");

  const cbDownload = dataPath => {
    getStockInfo.processData(dataPath);
  };

  getStockInfo.download(String(stockName), cbDownload);
  // return null
};

// bot("aapl.us");
exports.bot = bot;
