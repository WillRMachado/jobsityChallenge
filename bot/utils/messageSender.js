const send = (stock, price) => {
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
          message: `Invalid Request for stock: ${stock}`
        };
        msg = JSON.stringify(msg);
      } else {
        msg = {
          name: "BOT",
          message: text
        };
        msg = JSON.stringify(msg);
      }

      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(msg));

      console.log("Sent message from bot: ", msg);
    });
  });
};
exports.send = send;
