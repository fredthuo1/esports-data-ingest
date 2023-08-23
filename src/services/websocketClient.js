const WebSocket = require('ws');
const config = require('../config');
const { isValid } = require('../utils/validation');
const { processData } = require('../utils/transform');

let ws;

function connect() {
    ws = new WebSocket(config.WEBSOCKET_URL);

    ws.on('open', function open() {
        console.log('WebSocket connected');
    });

    ws.on('message', function incoming(data) {
        if (isValid(data)) {
            console.log('Received valid data:', data);
            processData(data);
        } else {
            console.warn('Received invalid data:', data);
        }
    });

    ws.on('error', function error(err) {
        console.error('WebSocket error:', err);
    });

    ws.on('close', function close() {
        console.log('WebSocket disconnected');
        setTimeout(connect, config.RECONNECTION_DELAY);
    });
}

connect();

module.exports = ws;
