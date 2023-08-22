const WebSocket = require('ws');
const config = require('../config');
const { pushToQueue } = require('./messageQueue'); // Import the function to push messages to the MQ

const ws = new WebSocket(config.WEBSOCKET_URL);

ws.on('open', function open() {
    console.log('WebSocket connected');
});

ws.on('message', function incoming(data) {
    // Convert data to string
    const message = data.toString('utf8');

    // TODO: Validate and possibly transform the message

    // Push the message to the message queue
    pushToQueue(message);
});

ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
});

ws.on('close', function close() {
    console.log('WebSocket disconnected');
    // TODO: Implement reconnection logic
    setTimeout(() => {
        // Try to reconnect after a delay
        ws.connect(config.WEBSOCKET_URL);
    }, 5000);  // Try to reconnect every 5 seconds
});

module.exports = ws;
