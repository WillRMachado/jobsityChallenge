const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

dotenv.config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

const app = express();

mongoose.connect(mongoUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const callback = function() {
  console.log(`server online, port: ${port}`);
};


// app.use(express.static(path.join(__dirname, "../public")));

// app.set("views", path.join(__dirname, "../public"));

// app.engine("html", require("ejs").renderFile);

// app.set("view engine", "html");

// app.use("/", (req, res) => {
//   res.render("index.html");
// });




const server = http.Server(app);
io = socketio(server);

io.on("connection", socket => {
  console.log(`socket conectado: ${socket.id}`);

  // socket.emit("previousMessages", messages);
  // socket.on("sendMessage", data => {
  //   console.log(data);
  //   messages.push(data);
  //   socket.broadcast.emit("receivedMessage", data);
  // });
});


app.use(cors({ origin: "*", credentials: false }));

app.use(express.json());

app.use(routes);




server.listen(port, callback);

module.exports = server;
