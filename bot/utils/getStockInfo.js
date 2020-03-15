//save csv file to a path in bot
const download = (stockName, cb) => {
  const https = require("https");
  const fs = require("fs");
  const uuid = require("uuid");

  const url = `https://stooq.com/q/l/?s=${stockName}&f=sd2t2ohlcv&h&e=csv`;
  const fileName = uuid.v4();
  const dest = `${__dirname}/../stocks/${fileName}.csv`;

  var file = fs.createWriteStream(dest);
  https
    .get(url, function(response) {
      response.pipe(file);
      file.on("finish", function() {
        file.close(() => (cb ? cb(dest) : null)); // close() is async, call cb after close completes.
      });
    })
    .on("error", function(err) {
      // Handle errors
      fs.unlink(dest, err => {
        if (err) throw err;
      });
      console.log(err.message);
    });
};

//forwards csv file data to rabbitMQ
const processData = (dataPath, chatChoice) => {
  const messageSender = require("./messageSender.js");
  const csv = require("csvtojson");
  const fs = require("fs");

  csv()
    .fromFile(dataPath)
    .then(jsonObj => {
      const jsonData = jsonObj;
      console.log(dataPath);
      let stockName = "";
      let stockValue = "";
      if (jsonData[0]) {
        stockName = jsonData[0].Symbol;
        stockValue = jsonData[0].Close;
      }else{
        stockName = 'Invalid Request';
        stockValue = '';
      }
      messageSender.send(stockName, stockValue, chatChoice);
      fs.unlink(dataPath, err => {
        if (err) throw err;
      });
    });
};

exports.download = download;
exports.processData = processData;
