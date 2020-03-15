const socketio = appServer => {
  const ioServer = require("http").createServer(appServer);
  const io = require("socket.io")(ioServer);

  io.on("connection", socket => {
    console.log(`socket conectado: ${socket.id}`);

    socket.emit("previousMessages", messages);
    socket.on("sendMessage", data => {
      console.log(data);
      messages.push(data);
      socket.broadcast.emit("receivedMessage", data);
    });
  });
};
module.exports = socketio;
