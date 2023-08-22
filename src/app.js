const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const websocket = require('./services/websocket');
const config = require('./config');

const app = express();
const PORT = config.SERVER_PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', routes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Gracefully shutting down');
    websocket.close();
    process.exit();
});
