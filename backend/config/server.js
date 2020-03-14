const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

const server = express();

mongoose.connect(mongoUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const callback = function() {
  console.log(`server online, port: ${port}`);
};

server.use(cors());

server.use(express.json());

server.use(routes);

server.listen(port, callback);

module.exports = server;
