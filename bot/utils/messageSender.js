const send = (stock, price, chatChoice) => {
  const amqp = require("amqplib/callback_api");
  const text = `${stock} quote is ${price} per share`;

  amqp.connect("amqp://localhost", function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }

      var queue = "BOT";

      var msg = "";
      if (price === "N/D") {
        msg = {
          name: "BOT",
          chatChoice: chatChoice,
          message: `Invalid Request for stock: ${stock}`
        };
        // msg = JSON.stringify(msg);
      } else if (stock === "Invalid Request") {
        msg = {
          name: "BOT",
          chatChoice: chatChoice,
          message: "Invalid Request Call"
        };
      } else {
        msg = {
          name: "BOT",
          chatChoice: chatChoice,
          message: text
        };
      }
      msg = JSON.stringify(msg);

      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(msg));

      console.log("Sent message from bot: ", msg);
    });
  });
};
exports.send = send;
