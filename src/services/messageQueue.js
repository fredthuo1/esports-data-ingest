const amqp = require('amqplib/callback_api');
const config = require('../config');

// Connect to RabbitMQ server
amqp.connect(`amqp://${config.MQ_HOST}:${config.MQ_PORT}`, (error0, connection) => {
    if (error0) {
        throw error0;
    }

    // Create a channel
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const queue = config.MQ_QUEUE_NAME;

        // Assert a queue into existence. This is idempotent.
        channel.assertQueue(queue, {
            durable: false
        });

        function pushToQueue(message) {
            channel.sendToQueue(queue, Buffer.from(message));
            console.log(" [x] Sent %s", message);
        }

        module.exports = {
            pushToQueue
        };
    });
});
