var amqp = require("amqplib/callback_api");
const dotenv = require("dotenv");
const Message = require("../../model/Message");

const amqpUri = process.env.AMQP_ADDRESS;
var queue = process.env.QUEUE_NAME;

const postBotMessage = async jsonMsg => {
  const newMessage = await Message.create({
    username: jsonMsg.name,
    message: jsonMsg.message
  });
  console.log(newMessage);
};

amqp.connect(amqpUri, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      function(msg) {
        const jsonMsg = JSON.parse(msg.content.toString());
        postBotMessage(jsonMsg);
      },
      {
        noAck: true
      }
    );
  });
});
